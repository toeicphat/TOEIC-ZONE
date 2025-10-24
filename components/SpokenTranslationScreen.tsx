import React, { useState, useEffect, useRef, useCallback } from 'react';
import { VocabItem, SpokenTranslationEvaluationResult } from '../types';
import { generateSpokenTranslationText, transcribeVietnameseAudio, evaluateSpokenTranslation } from '../services/geminiService';
import { ArrowLeftIcon, LoadingIcon, MicrophoneIcon, StopIcon, RefreshIcon, TrophyIcon } from './icons';
import Timer from './Timer';

const RECORD_TIME_SECONDS = 60;

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

type PracticeState = 'generating_text' | 'practice' | 'recording' | 'evaluating' | 'results';

interface SpokenTranslationScreenProps {
    currentVocabularyList: VocabItem[];
    onBack: () => void;
}

const SpokenTranslationScreen: React.FC<SpokenTranslationScreenProps> = ({ currentVocabularyList, onBack }) => {
    const [practiceState, setPracticeState] = useState<PracticeState>('generating_text');
    const [sourceText, setSourceText] = useState<string>('');
    const [transcribedText, setTranscribedText] = useState<string>('');
    const [evaluation, setEvaluation] = useState<SpokenTranslationEvaluationResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isRecording, setIsRecording] = useState(false);
    
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const audioStreamRef = useRef<MediaStream | null>(null);
    const recordTimeoutRef = useRef<number | null>(null);

    const cleanupMedia = useCallback(() => {
        if (recordTimeoutRef.current) clearTimeout(recordTimeoutRef.current);
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop();
        }
        if (audioStreamRef.current) {
            audioStreamRef.current.getTracks().forEach(track => track.stop());
            audioStreamRef.current = null;
        }
    }, []);
    
    useEffect(() => {
        // Cleanup on unmount
        return () => cleanupMedia();
    }, [cleanupMedia]);

    const generateNewText = useCallback(async () => {
        setPracticeState('generating_text');
        setError(null);
        setSourceText('');
        setTranscribedText('');
        setEvaluation(null);

        try {
            const text = await generateSpokenTranslationText(currentVocabularyList);
            if (text) {
                setSourceText(text);
                setPracticeState('practice');
            } else {
                throw new Error("AI failed to generate text.");
            }
        } catch (err: any) {
            setError(err.message || "Could not generate exercise. Please try again.");
            setPracticeState('practice'); // Go to practice state to show error and retry button
        }
    }, [currentVocabularyList]);

    useEffect(() => {
        generateNewText();
    }, [generateNewText]);
    
    const startRecording = async () => {
        try {
            setError(null);
            audioStreamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(audioStreamRef.current);
            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) audioChunksRef.current.push(event.data);
            };

            mediaRecorder.onstop = async () => {
                setIsRecording(false);
                setPracticeState('evaluating');
                const audioBlob = new Blob(audioChunksRef.current, { type: mediaRecorder.mimeType });

                if (audioBlob.size === 0) {
                    setError("No audio was recorded. Please try again.");
                    setPracticeState('practice');
                    return;
                }
                
                try {
                    const audioBase64 = await blobToBase64(audioBlob);
                    const transcription = await transcribeVietnameseAudio(audioBase64, mediaRecorder.mimeType);
                    
                    if (!transcription) {
                        throw new Error("Could not transcribe audio. Please speak clearly and try again.");
                    }
                    setTranscribedText(transcription);

                    const evalResult = await evaluateSpokenTranslation(sourceText, transcription);
                    if (evalResult) {
                        setEvaluation(evalResult);
                        setPracticeState('results');
                    } else {
                        throw new Error("AI failed to evaluate your translation.");
                    }

                } catch(apiError: any) {
                    setError(apiError.message || "An error occurred during evaluation.");
                    setPracticeState('practice');
                }
            };
            
            mediaRecorder.start();
            setIsRecording(true);
            setPracticeState('recording');

            recordTimeoutRef.current = window.setTimeout(() => {
                stopRecording();
            }, RECORD_TIME_SECONDS * 1000);

        } catch (err) {
            console.error("Microphone access error:", err);
            setError("Microphone access denied. Please enable microphone permissions in your browser settings and try again.");
            setPracticeState('practice');
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop();
            cleanupMedia();
        }
    };

    const renderContent = () => {
        switch (practiceState) {
            case 'generating_text':
                return (
                    <div className="text-center p-8">
                        <LoadingIcon className="h-12 w-12 text-blue-600 mx-auto animate-spin" />
                        <h3 className="mt-4 text-xl font-semibold">Generating exercise...</h3>
                    </div>
                );
            
            case 'practice':
            case 'recording':
                return (
                    <div>
                         <h2 className="text-2xl font-bold text-center mb-4">Spoken Translation</h2>
                         <p className="text-center text-slate-600 dark:text-slate-400 mb-6">Read the English text below, then record your spoken Vietnamese translation.</p>
                        
                        <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-lg mb-6">
                            <p className="text-lg leading-relaxed">{sourceText}</p>
                        </div>

                        {error && <p className="text-red-500 text-center font-bold mb-4">{error}</p>}
                        
                        <div className="text-center mb-4">
                           <p style={{ color: 'red', fontSize: '1.25rem', fontWeight: 'bold' }}>
                                Lưu ý: Cố gắng dịch cả đoạn nhé, từ nào không biết thì lướt qua
                           </p>
                        </div>
                        
                        <div className="flex flex-col items-center gap-4">
                            {!isRecording ? (
                                <button onClick={startRecording} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
                                    <MicrophoneIcon className="h-6 w-6" />
                                    Bắt đầu Ghi Âm
                                </button>
                            ) : (
                                <>
                                    <div className="flex items-center gap-4">
                                        <Timer isStopwatch isRunning={true} onTimeUpdate={(time) => { if (time >= RECORD_TIME_SECONDS) stopRecording(); }} />
                                        <div className="flex items-center gap-2 text-red-500 animate-pulse">
                                            <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                                            <span className="font-semibold">RECORDING</span>
                                        </div>
                                    </div>
                                    <button onClick={stopRecording} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors">
                                        <StopIcon className="h-6 w-6" />
                                        Dừng Ghi Âm
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                );
            
            case 'evaluating':
                 return (
                    <div className="text-center p-8">
                        <LoadingIcon className="h-12 w-12 text-blue-600 mx-auto animate-spin" />
                        <h3 className="mt-4 text-xl font-semibold">Evaluating your translation...</h3>
                        <p className="mt-2 text-slate-500">Transcribing audio and analyzing meaning.</p>
                    </div>
                );
            
            case 'results':
                if (!evaluation) return null;
                const getScoreColor = (score: number) => {
                    if (score >= 85) return 'text-green-500';
                    if (score >= 70) return 'text-blue-500';
                    if (score >= 50) return 'text-yellow-500';
                    return 'text-red-500';
                };
                return (
                    <div>
                        <div className="text-center border-b pb-6 mb-6">
                            <TrophyIcon className="h-16 w-16 text-yellow-500 mx-auto" />
                            <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mt-4">Evaluation Complete</h2>
                        </div>
                        
                        <div className="text-center bg-slate-100 dark:bg-slate-800 p-6 rounded-lg mb-6">
                            <p className="text-lg font-semibold text-slate-700 dark:text-slate-300">Estimated Accuracy</p>
                            <p className={`text-7xl font-bold my-2 ${getScoreColor(evaluation.estimated_accuracy_percent)}`}>
                                {evaluation.estimated_accuracy_percent}%
                            </p>
                        </div>

                         <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mb-6">
                            <h4 className="font-bold text-slate-800 dark:text-slate-200">AI Feedback:</h4>
                            <p className="text-slate-600 dark:text-slate-300 mt-1 italic">{evaluation.feedback_vi}</p>
                        </div>

                        <div className="space-y-4">
                             <div>
                                <h4 className="font-semibold text-slate-500 dark:text-slate-400">Original English Text:</h4>
                                <p className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-md">{sourceText}</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-slate-500 dark:text-slate-400">Your Transcribed Translation (Vietnamese):</h4>
                                <p className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-md">{transcribedText}</p>
                            </div>
                        </div>

                        <div className="mt-8 flex justify-center gap-4">
                            <button onClick={generateNewText} className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700">
                                <RefreshIcon className="h-5 w-5" />
                                Try Another
                            </button>
                        </div>
                    </div>
                );
        }
    };

    return (
         <div className="container mx-auto px-4 py-8">
            <div className="max-w-3xl mx-auto">
                 <button onClick={onBack} className="mb-6 inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-semibold transition-colors disabled:opacity-50" disabled={isRecording}>
                    <ArrowLeftIcon className="h-5 w-5 mr-2" />
                    Back to Vocabulary Practice
                </button>
                 <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl shadow-xl">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default SpokenTranslationScreen;
