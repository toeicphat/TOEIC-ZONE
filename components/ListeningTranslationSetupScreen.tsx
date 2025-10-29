
import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeftIcon } from './icons';
import { getListeningTranslationTest } from '../services/listeningTranslationLibrary';

// Modal component for sentence count
const SentenceCountModal: React.FC<{
    maxWords: number;
    onStart: (count: number) => void;
    onBack: () => void;
}> = ({ maxWords, onStart, onBack }) => {
    const [inputValue, setInputValue] = useState('10');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleStartClick = () => {
        let count = parseInt(inputValue, 10);
        if (isNaN(count) || count <= 0) {
            count = 10; // Default if invalid
        }
        onStart(Math.min(count, maxWords));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleStartClick();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-xl w-full max-w-sm text-center">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
                    Hãy nhập số lượng câu bạn muốn luyện tập (Tối đa 100 câu)
                </h3>
                <input
                    ref={inputRef}
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full text-center text-3xl font-bold p-3 border-2 border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                    placeholder={`Tối đa ${maxWords}`}
                    min="1"
                    max={maxWords}
                />
                <div className="mt-6 flex flex-col gap-3">
                    <button
                        onClick={handleStartClick}
                        className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Bắt đầu
                    </button>
                    <button
                        onClick={onBack}
                        className="w-full bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold py-2 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-500 transition-colors"
                    >
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
};


interface ListeningTranslationSetupScreenProps {
    testId: number;
    onStartPractice: (sentenceCount: number, timeLimit: number) => void;
    onBack: () => void;
}

const DifficultyCard: React.FC<{
    title: string;
    time: string;
    colorClasses: string;
    onClick: () => void;
}> = ({ title, time, colorClasses, onClick }) => (
    <button
        onClick={onClick}
        className={`w-full p-8 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-white ${colorClasses}`}
    >
        <p className="text-2xl font-bold">{title}</p>
        <p className="text-lg">{time}</p>
    </button>
);

const ListeningTranslationSetupScreen: React.FC<ListeningTranslationSetupScreenProps> = ({ testId, onStartPractice, onBack }) => {
    const [sentenceCount, setSentenceCount] = useState<number | null>(null);

    const testData = getListeningTranslationTest(testId);
    const maxSentences = testData?.sentences.length || 20;

    if (!sentenceCount) {
        return <SentenceCountModal maxWords={maxSentences} onStart={setSentenceCount} onBack={onBack} />
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-2xl mx-auto">
                <button onClick={onBack} className="mb-8 inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-semibold transition-colors">
                    <ArrowLeftIcon className="h-5 w-5 mr-2" />
                    Back to Listening & Translation Home
                </button>
                <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6 text-center">Practice Setup</h2>
                    <p className="text-center text-slate-600 dark:text-slate-400 mb-8">Choose a difficulty level. This will set the time you have to record your spoken translation after hearing the sentence.</p>
                    <div className="space-y-6">
                        <DifficultyCard
                            title="Dễ"
                            time="(15 giây)"
                            colorClasses="bg-green-500 hover:bg-green-600"
                            onClick={() => onStartPractice(sentenceCount, 15)}
                        />
                        <DifficultyCard
                            title="Trung bình"
                            time="(10 giây)"
                            colorClasses="bg-yellow-500 hover:bg-yellow-600"
                            onClick={() => onStartPractice(sentenceCount, 10)}
                        />
                        <DifficultyCard
                            title="Khó"
                            time="(5 giây)"
                            colorClasses="bg-red-500 hover:bg-red-600"
                            onClick={() => onStartPractice(sentenceCount, 5)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListeningTranslationSetupScreen;
