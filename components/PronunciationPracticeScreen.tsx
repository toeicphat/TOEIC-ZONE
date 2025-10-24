import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowLeftIcon, LoadingIcon, RefreshIcon, MicrophoneIcon, TrophyIcon } from './icons';
import { generateWordsWithPhonetics, evaluateSingleWordPronunciation } from '../services/geminiService';
import { PhoneticWord, SingleWordEvaluationResult, User } from '../types';
import { addTestResult } from '../services/progressService';

const RECORD_TIME = 5;
const WORDS_PER_TURN = 5;

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

type PracticeState = 'generating' | 'practicing' | 'recording' | 'evaluating' | 'results';

interface PronunciationPracticeScreenProps {
  onBack: () => void;
  currentUser: User;
}

const PronunciationPracticeScreen: React.FC<PronunciationPracticeScreenProps> = ({ onBack, currentUser }) => {
    const [practiceState, setPracticeState] = useState<PracticeState>('generating');
    const [words, setWords] = useState<PhoneticWord[]>([]);
    const [results, setResults] = useState<(SingleWordEvaluationResult | null)[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [countdown, setCountdown] = useState(RECORD_TIME);

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const recordingsRef = useRef<(Blob | null)[]>([]);
    const audioStreamRef = useRef<MediaStream | null>(null);
    const timerIntervalRef = useRef<number | null>(null);

    const cleanup = useCallback(() => {
        if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
        if (mediaRecorderRef.current?.state === 'recording') mediaRecorderRef.current.stop();
        if (audioStreamRef.current) audioStreamRef.current.getTracks().forEach(track => track.stop());
        timerIntervalRef.current = null;
        mediaRecorderRef.current = null;
        audioStreamRef.current = null;
    }, []);
    
    useEffect(() => () => cleanup(), [cleanup]);

    const startNewTurn = useCallback(async () => {
        setPracticeState('generating');
        setError(null);
        setResults([]);
        setWords([]);
        setCurrentIndex(0);
        recordingsRef.current = [];
        try {
            const generatedWords = await generateWordsWithPhonetics(WORDS_PER_TURN);
            if (generatedWords && generatedWords.length === WORDS_PER_TURN) {
                setWords(generatedWords);
                setPracticeState('practicing');
            } else {
                throw new Error("Failed to generate a full set of words.");
            }
        } catch (err) {
            console.error(err);
            setError("Could not generate words. Please try again later.");
            setPracticeState('practicing'); // Allow retry
        }
    }, []);

    useEffect(() => {
        startNewTurn();
    }, [startNewTurn]);

    const handleEvaluation = useCallback(async () => {
        setPracticeState('evaluating');
        const evaluations: (SingleWordEvaluationResult | null)[] = [];
        for (let i = 0; i < WORDS_PER_TURN; i++) {
            const word = words[i];
            const recording = recordingsRef.current[i];
            if (word && recording) {
                try {
                    const audioBase64 = await blobToBase64(recording);
                    const result = await evaluateSingleWordPronunciation(word.word, word.phonetic, audioBase64, recording.type);
                    evaluations.push(result);
                    
                    if (result && currentUser) {
                        addTestResult(currentUser.username, 'pronunciation', {
                            id: `pronunciation-${word.word}-${Date.now()}`,
                            title: `Pronunciation: ${word.word}`,
                            score: result.overallScore,
                            total: 100,
                            date: Date.now()
                        });
                    }
                } catch (err) {
                    console.error(`Evaluation failed for word: ${word.word}`, err);
                    evaluations.push(null);
                }
            } else {
                evaluations.push(null);
            }
        }
        setResults(evaluations);
        setPracticeState('results');
    }, [words, currentUser]);

    const startRecording = async () => {
        try {
            audioStreamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(audioStreamRef.current);
            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];
            
            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) audioChunksRef.current.push(event.data);
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: mediaRecorder.mimeType });
                recordingsRef.current.push(audioBlob.size > 0 ? audioBlob : null);
                if (currentIndex < WORDS_PER_TURN - 1) {
                    setCurrentIndex(prev => prev + 1);
                    setPracticeState('practicing');
                } else {
                    handleEvaluation();
                }
            };
            
            mediaRecorder.start();
            setPracticeState('recording');
        } catch (err) {
            console.error("Microphone access denied:", err);
            setError("Microphone access is required for this practice.");
            setPracticeState('practicing');
        }
    };

    useEffect(() => {
        if (practiceState === 'recording') {
            setCountdown(RECORD_TIME);
            timerIntervalRef.current = window.setInterval(() => {
                setCountdown(c => c - 1);
            }, 1000);
            
            const recordTimeout = setTimeout(() => {
                if (mediaRecorderRef.current?.state === 'recording') {
                    mediaRecorderRef.current.stop();
                }
            }, RECORD_TIME * 1000);

            return () => {
                if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
                clearTimeout(recordTimeout);
            };
        }
    }, [practiceState]);

    const renderContent = () => {
        if (practiceState === 'generating' || words.length === 0) {
            return (
                <div className="text-center">
                    <LoadingIcon className="h-12 w-12 text-blue-600 mx-auto animate-spin" />
                    <h2 className="text-xl font-semibold mt-4">Generating Words...</h2>
                </div>
            );
        }

        if (practiceState === 'practicing' || practiceState === 'recording') {
            const currentWord = words[currentIndex];
            return (
                <div className="text-center">
                    <p className="text-slate-500 dark:text-slate-400 mb-4">Word {currentIndex + 1} of {WORDS_PER_TURN}</p>
                    <div className="bg-slate-100 dark:bg-slate-800 p-8 rounded-xl min-h-[150px] flex items-center justify-center">
                        <p className="text-4xl md:text-6xl font-serif text-slate-800 dark:text-slate-200 tracking-wider">{currentWord.phonetic}</p>
                    </div>
                    {practiceState === 'recording' ? (
                        <div className="mt-8 flex flex-col items-center">
                            <div className="relative w-24 h-24 flex items-center justify-center">
                                <svg className="transform -rotate-90" width="96" height="96" viewBox="0 0 96 96">
                                    <circle cx="48" cy="48" r="44" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-slate-200 dark:text-slate-700" />
                                    <circle cx="48" cy="48" r="44" stroke="currentColor" strokeWidth="4" fill="transparent"
                                        className="text-red-500"
                                        strokeDasharray={2 * Math.PI * 44}
                                        strokeDashoffset={ (2 * Math.PI * 44) - (countdown / RECORD_TIME) * (2 * Math.PI * 44) }
                                        style={{ transition: 'stroke-dashoffset 1s linear' }}
                                    />
                                </svg>
                                <span className="absolute text-3xl font-bold text-red-500">{countdown}</span>
                            </div>
                            <p className="text-red-500 font-semibold mt-4 animate-pulse">RECORDING</p>
                        </div>
                    ) : (
                        <div className="mt-8">
                            <button onClick={startRecording} className="px-8 py-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-colors inline-flex items-center gap-3">
                                <MicrophoneIcon className="h-6 w-6" />
                                Start Recording
                            </button>
                            {error && <p className="text-red-500 mt-4">{error}</p>}
                        </div>
                    )}
                </div>
            );
        }
        
        if (practiceState === 'evaluating') {
            return (
                <div className="text-center">
                    <LoadingIcon className="h-12 w-12 text-blue-600 mx-auto animate-spin" />
                    <h2 className="text-xl font-semibold mt-4">Evaluating your pronunciation...</h2>
                </div>
            );
        }

        if (practiceState === 'results') {
            return (
                <div>
                    <div className="text-center border-b dark:border-slate-700 pb-6 mb-6">
                        <TrophyIcon className="h-16 w-16 text-yellow-500 mx-auto" />
                        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mt-4">Results</h2>
                    </div>
                    <div className="space-y-6">
                        {words.map((word, index) => {
                            const result = results[index];
                            if (!result) {
                                return <div key={index} className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">Error evaluating "{word.word}".</div>;
                            }
                            return (
                                <div key={index} className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl border dark:border-slate-700">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-3xl font-bold text-slate-800 dark:text-slate-100">{word.word}</p>
                                            <p className="font-serif text-lg text-slate-500 dark:text-slate-400">
                                                {word.phonetic}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{result.overallScore}%</p>
                                            <p className="text-sm text-slate-500 dark:text-slate-400">Accuracy</p>
                                        </div>
                                    </div>
                                    <div className="mt-4 bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
                                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">💡 Feedback: <span className="font-normal italic">{result.feedback_vi}</span></p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                     <div className="mt-8 text-center">
                        <button onClick={startNewTurn} className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2">
                             <RefreshIcon className="h-5 w-5" />
                            Practice Again
                        </button>
                    </div>
                </div>
            );
        }

        return null;
    };


    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-3xl mx-auto">
                 <button onClick={onBack} className="mb-8 inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-semibold transition-colors disabled:opacity-50" disabled={practiceState !== 'practicing' && practiceState !== 'results'}>
                    <ArrowLeftIcon className="h-5 w-5 mr-2" />
                    Back to Pronunciation Hub
                </button>
                <div className="bg-white dark:bg-slate-900 p-6 sm:p-10 rounded-2xl shadow-xl">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default PronunciationPracticeScreen;