import React, { useState, useEffect, useCallback, useRef } from 'react';
import { SpokenTranslationEvaluationResult, User } from '../types';
import { transcribeVietnameseAudio, evaluateSpokenTranslation } from '../services/geminiService';
import { getListeningTranslationTest } from '../services/listeningTranslationLibrary';
import { LoadingIcon, ArrowLeftIcon, RefreshIcon, TrophyIcon, MicrophoneIcon, StopIcon } from './icons';
import AudioPlayer from './AudioPlayer';
import Timer from './Timer';
import { addTestResult } from '../services/progressService';

const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader.result === 'string') {
                const base64Data = reader.result.split(',')[1];
                resolve(base64Data);
            } else {
                reject(new Error("Failed to read blob as a base64 string."));
            }
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
};

type PracticeState = 'loading' | 'practice' | 'recording' | 'processing' | 'summary';

interface Result {
    sourceText: string;
    transcribedText: string | null;
    evaluation: SpokenTranslationEvaluationResult | null;
}

interface ListeningTranslationScreenProps {
    testId: number;
    onBack: () => void;
    timeLimit: number;
    currentUser: User;
}

const shuffleArray = <T,>(array: T[]): T[] => {
    return [...array].sort(() => Math.random() - 0.5);
};

const ListeningTranslationScreen: React.FC<ListeningTranslationScreenProps> = ({ testId, onBack, timeLimit, currentUser }) => {
    const [practiceState, setPracticeState] = useState<PracticeState>('loading');
    const [error, setError] = useState<string | null>(null);
    const [practiceSentences, setPracticeSentences] = useState<string[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [results, setResults] = useState<Result[]>([]);
    const [recordings, setRecordings] = useState<(Blob | null)[]>([]);
    
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const recordTimeoutRef = useRef<number | null>(null);

    const cleanupOnUnmount = useCallback(() => {
        if (recordTimeoutRef.current) clearTimeout(recordTimeoutRef.current);
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop();
        }
    }, []);

    const loadSentences = useCallback(() => {
        cleanupOnUnmount();
        setPracticeState('loading');
        const testData = getListeningTranslationTest(testId);
        if (testData && testData.sentences.length > 0) {
            const randomSentences = shuffleArray(testData.sentences).slice(0, 5);
            setPracticeSentences(randomSentences);
            setCurrentIndex(0);
            setResults([]);
            setRecordings([]);
            setError(null);
            setPracticeState('practice');
        } else {
            setError("Could not load sentences for this test.");
            setPracticeState('practice');
        }
    }, [testId, cleanupOnUnmount]);

    useEffect(() => {
        loadSentences();
        return () => cleanupOnUnmount();
    }, []);

    const stopRecording = useCallback(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop(); 
        }
        if (recordTimeoutRef.current) {
            clearTimeout(recordTimeoutRef.current);
            recordTimeoutRef.current = null;
        }
    }, []);

    const startRecording = useCallback((stream: MediaStream) => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) audioChunksRef.current.push(event.data);
        };

        mediaRecorder.onstop = () => {
            // Immediately stop the tracks to release the microphone after each recording.
            stream.getTracks().forEach(track => track.stop());

            const audioBlob = new Blob(audioChunksRef.current, { type: mediaRecorder.mimeType });
            setRecordings(prev => [...prev, audioBlob.size > 0 ? audioBlob : null]);
        };
        
        mediaRecorder.start();
        setPracticeState('recording');

        recordTimeoutRef.current = window.setTimeout(stopRecording, timeLimit * 1000);

    }, [stopRecording, timeLimit]);

    // Effect to advance to the next state after a recording is saved.
    useEffect(() => {
        // This check ensures we only transition state after a new recording has been added.
        if (recordings.length > 0 && recordings.length === currentIndex + 1) {
             if (currentIndex < practiceSentences.length - 1) {
                setCurrentIndex(prev => prev + 1);
                setPracticeState('practice');
            } else {
                setPracticeState('processing');
            }
        }
    }, [recordings, currentIndex, practiceSentences.length]);

    const handleAudioEnd = useCallback(async () => {
        if (practiceState === 'practice') {
            try {
                // Request a fresh media stream for each recording.
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                startRecording(stream);
            } catch (err) {
                 console.error("Microphone access error on demand:", err);
                 setError("Microphone access is required. Please enable it in your browser and try again.");
                 // Record a failure (null) and move to the next question automatically.
                 setRecordings(prev => [...prev, null]);
            }
        }
    }, [practiceState, startRecording]);

    useEffect(() => {
        const processAllRecordings = async () => {
            if (practiceState === 'processing' && recordings.length === practiceSentences.length) {
                const finalResults: Result[] = [];
                for (let i = 0; i < practiceSentences.length; i++) {
                    const sourceText = practiceSentences[i];
                    const recording = recordings[i];
                    let transcribedText: string | null = "No audio recorded or transcribed.";
                    let evaluation: SpokenTranslationEvaluationResult | null = null;

                    if (recording) {
                        try {
                            const audioBase64 = await blobToBase64(recording);
                            const transcription = await transcribeVietnameseAudio(audioBase64, recording.type);
                             if (transcription) {
                                transcribedText = transcription;
                                evaluation = await evaluateSpokenTranslation(sourceText, transcribedText);
                            } else {
                                transcribedText = "Transcription failed.";
                            }
                        } catch (e) {
                            console.error(`Error processing sentence ${i}:`, e);
                            transcribedText = "Error during processing.";
                        }
                    }
                    finalResults.push({ sourceText, transcribedText, evaluation });
                }
                
                setResults(finalResults);
                
                const validResults = finalResults.filter(r => r.evaluation?.estimated_accuracy_percent !== undefined);
                if (validResults.length > 0 && currentUser) {
                     const avgScore = Math.round(validResults.reduce((acc, res) => acc + (res.evaluation?.estimated_accuracy_percent || 0), 0) / validResults.length);
                     addTestResult(currentUser.username, 'speaking', {
                        id: `spoken-translation-test-${testId}-${Date.now()}`,
                        title: `Listening & Translation Test ${testId}`,
                        score: avgScore,
                        total: 100,
                        date: Date.now()
                    });
                }
                
                setPracticeState('summary');
            }
        };

        processAllRecordings();
    }, [practiceState, recordings, practiceSentences, currentUser, testId]);
    
    const getScoreColor = (score: number) => {
        if (score >= 85) return 'text-green-500';
        if (score >= 70) return 'text-blue-500';
        if (score >= 50) return 'text-yellow-500';
        return 'text-red-500';
    };
    
    const ResultItem: React.FC<{result: Result; index: number}> = ({ result, index }) => (
        <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
            <p className="font-semibold text-slate-500 dark:text-slate-400 mb-2">Sentence {index + 1}</p>
            <p className="mb-2"><span className='font-bold'>Original:</span> {result.sourceText}</p>
            <p className="mb-3"><span className='font-bold'>Your translation:</span> <span className="italic">{result.transcribedText}</span></p>
            {result.evaluation ? (
                <div className='flex items-center gap-4 bg-slate-100 dark:bg-slate-700 p-3 rounded-md'>
                    <div className='text-center'>
                         <p className={`text-3xl font-bold ${getScoreColor(result.evaluation.estimated_accuracy_percent)}`}>{result.evaluation.estimated_accuracy_percent}%</p>
                         <p className='text-xs text-slate-500 dark:text-slate-400'>Accuracy</p>
                    </div>
                    <p className='text-sm text-slate-600 dark:text-slate-300 border-l-2 border-slate-300 dark:border-slate-600 pl-4'>{result.evaluation.feedback_vi}</p>
                </div>
            ) : (
                <p className="text-sm text-red-500">Evaluation was not available for this sentence.</p>
            )}
        </div>
    );

    const renderContent = () => {
        const currentSentence = practiceSentences[currentIndex];

        if (practiceState === 'loading' || (!currentSentence && practiceState !== 'summary' && practiceState !== 'processing')) {
             return (
                <div className="text-center p-8 min-h-[300px] flex flex-col justify-center">
                    <LoadingIcon className="h-12 w-12 text-blue-600 mx-auto animate-spin" />
                    <h3 className="mt-4 text-xl font-semibold">
                        Loading Test...
                    </h3>
                </div>
            );
        }
        
        if (error) {
            return (
                 <div className="text-center p-8 min-h-[300px] flex flex-col justify-center">
                    <p className="text-red-500 font-bold mb-4">{error}</p>
                    <button onClick={loadSentences} className="px-6 py-2 bg-blue-600 text-white rounded-lg">Try Again</button>
                </div>
            )
        }

        switch(practiceState) {
            case 'practice':
                return (
                    <div>
                        <h2 className="text-2xl font-bold text-center mb-2">Listen &amp; Translate ({currentIndex + 1} / {practiceSentences.length})</h2>
                        <p className="text-center text-slate-600 dark:text-slate-400 mb-6">Listen to the sentence. Recording will start automatically.</p>
                        <AudioPlayer audioScript={currentSentence} autoPlay={true} onPlaybackEnd={handleAudioEnd} />
                        <div className="text-center mt-6 text-slate-500">
                            <p>Get ready to speak...</p>
                        </div>
                    </div>
                );
            case 'recording':
                return (
                     <div>
                        <h2 className="text-2xl font-bold text-center mb-2">Listen &amp; Translate ({currentIndex + 1} / {practiceSentences.length})</h2>
                        <p className="text-center text-slate-600 dark:text-slate-400 mb-6">Recording your Vietnamese translation...</p>
                         <div className="mt-8 flex flex-col items-center gap-4">
                             <div className="flex items-center gap-4">
                                <Timer initialTime={timeLimit} onTimeUp={stopRecording} />
                                <div className="flex items-center gap-2 text-red-500 animate-pulse">
                                    <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                                    <span className="font-semibold">RECORDING</span>
                                </div>
                            </div>
                            <button onClick={stopRecording} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700">
                                <StopIcon className="h-6 w-6" /> Stop Now
                            </button>
                        </div>
                    </div>
                );
            case 'processing':
                 return (
                    <div className="text-center p-8 min-h-[300px] flex flex-col justify-center">
                        <LoadingIcon className="h-12 w-12 text-blue-600 mx-auto animate-spin" />
                        <h3 className="mt-4 text-xl font-semibold">Hệ thống đang chấm điểm cho bạn...</h3>
                        <p className="mt-2 text-slate-500">Bạn hãy đợi một chút nhé.</p>
                    </div>
                );
            
            case 'summary':
                const successfulResults = results.filter(r => r.evaluation);
                const avgScore = successfulResults.length > 0 
                    ? Math.round(successfulResults.reduce((acc, res) => acc + (res.evaluation?.estimated_accuracy_percent || 0), 0) / successfulResults.length) 
                    : 0;

                 return (
                    <div>
                        <div className="text-center border-b dark:border-slate-700 pb-6 mb-6">
                            <TrophyIcon className="h-16 w-16 text-yellow-500 mx-auto" />
                            <h2 className="text-3xl font-bold mt-4">Practice Complete!</h2>
                             <div className="text-center bg-slate-100 dark:bg-slate-800 p-4 rounded-lg mt-4 max-w-sm mx-auto">
                                <p className="text-md font-semibold">Overall Average Accuracy</p>
                                <p className={`text-5xl font-bold my-1 ${getScoreColor(avgScore)}`}>{avgScore}%</p>
                            </div>
                        </div>

                        <div className='space-y-4 max-h-[50vh] overflow-y-auto pr-2'>
                           {results.map((result, index) => (
                               <ResultItem key={index} result={result} index={index} />
                           ))}
                        </div>

                        <div className="mt-8 flex justify-center gap-4">
                            <button onClick={loadSentences} className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700">
                                <RefreshIcon className="h-5 w-5" />
                                Practice Again
                            </button>
                        </div>
                    </div>
                );
        }
    };
    
     return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-3xl mx-auto">
                 <button onClick={onBack} className="mb-6 inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-semibold transition-colors disabled:opacity-50" disabled={practiceState === 'recording' || practiceState === 'processing'}>
                    <ArrowLeftIcon className="h-5 w-5 mr-2" />
                    Back to Setup
                </button>
                 <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl shadow-xl">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default ListeningTranslationScreen;