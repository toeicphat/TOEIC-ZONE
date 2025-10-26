import React from 'react';
import { ArrowLeftIcon } from './icons';

interface ListeningTranslationSetupScreenProps {
    onStartPractice: (timeLimit: number) => void;
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

const ListeningTranslationSetupScreen: React.FC<ListeningTranslationSetupScreenProps> = ({ onStartPractice, onBack }) => {
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
                            onClick={() => onStartPractice(15)}
                        />
                        <DifficultyCard
                            title="Trung bình"
                            time="(10 giây)"
                            colorClasses="bg-yellow-500 hover:bg-yellow-600"
                            onClick={() => onStartPractice(10)}
                        />
                        <DifficultyCard
                            title="Khó"
                            time="(5 giây)"
                            colorClasses="bg-red-500 hover:bg-red-600"
                            onClick={() => onStartPractice(5)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListeningTranslationSetupScreen;