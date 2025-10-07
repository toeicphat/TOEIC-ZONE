import React, { useState, useEffect } from 'react';
import { User, UserProgress, TestResult, ProgressCategory } from '../types';
import { getProgress, clearProgress } from '../services/progressService';
import { BookOpenIcon, BrainIcon, HeadphoneIcon, PuzzleIcon, TypeIcon, TrophyIcon, TrashIcon, ArrowLeftIcon } from './icons';
import { LoadingIcon } from './icons';

interface MyProgressScreenProps {
    viewingUser: User;
    onBack: () => void;
    isOwnProgress: boolean;
}

const categoryInfo: Record<ProgressCategory, { name: string; icon: React.FC<any> }> = {
    miniTest: { name: 'AI Mini-Test', icon: TrophyIcon },
    reading: { name: 'Reading', icon: BookOpenIcon },
    grammar: { name: 'Grammar', icon: BrainIcon },
    vocabulary: { name: 'Vocabulary', icon: PuzzleIcon },
    dictation: { name: 'Dictation', icon: HeadphoneIcon },
    speaking: { name: 'Speaking', icon: HeadphoneIcon },
    writing: { name: 'Writing', icon: TypeIcon },
};

const ResultRow: React.FC<{ result: TestResult }> = ({ result }) => {
    const percentage = result.total > 0 ? Math.round((result.score / result.total) * 100) : 0;
    const date = new Date(result.date).toLocaleDateString();

    return (
        <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50">
            <td className="p-3 text-slate-700 dark:text-slate-300">{result.title}</td>
            <td className="p-3 text-center font-semibold text-slate-800 dark:text-slate-200">{result.score} / {result.total}</td>
            <td className="p-3 text-center font-bold text-blue-600 dark:text-blue-400">{percentage}%</td>
            <td className="p-3 text-right text-sm text-slate-500 dark:text-slate-400">{date}</td>
        </tr>
    );
};

const ProgressCategoryCard: React.FC<{ category: ProgressCategory; results: TestResult[] }> = ({ category, results }) => {
    const info = categoryInfo[category];
    const averageScore = results.length > 0
        ? Math.round(results.reduce((acc, r) => acc + (r.score / (r.total || 1)), 0) / results.length * 100)
        : null;

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="flex items-center mb-4">
                <info.icon className="h-8 w-8 text-blue-600" />
                <h3 className="ml-3 text-2xl font-bold text-slate-800 dark:text-slate-100">{info.name}</h3>
                {averageScore !== null && (
                    <div className="ml-auto text-right">
                        <p className="font-bold text-2xl text-blue-600 dark:text-blue-400">{averageScore}%</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Average Score</p>
                    </div>
                )}
            </div>
            {results.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-slate-100 dark:bg-slate-700">
                                <th className="p-3 text-left text-sm font-semibold text-slate-600 dark:text-slate-300">Test</th>
                                <th className="p-3 text-center text-sm font-semibold text-slate-600 dark:text-slate-300">Score</th>
                                <th className="p-3 text-center text-sm font-semibold text-slate-600 dark:text-slate-300">Percentage</th>
                                <th className="p-3 text-right text-sm font-semibold text-slate-600 dark:text-slate-300">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map(result => <ResultRow key={result.id} result={result} />)}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center text-slate-500 dark:text-slate-400 py-8">No results recorded for this category yet.</p>
            )}
        </div>
    );
};


const MyProgressScreen: React.FC<MyProgressScreenProps> = ({ viewingUser, onBack, isOwnProgress }) => {
    const [progress, setProgress] = useState<UserProgress | null>(null);

    useEffect(() => {
        setProgress(getProgress(viewingUser.username));
    }, [viewingUser.username]);

    const handleClearProgress = () => {
        if (window.confirm(`Are you sure you want to delete all progress for ${viewingUser.username}? This action cannot be undone.`)) {
            clearProgress(viewingUser.username);
            setProgress(getProgress(viewingUser.username)); // Re-fetch to show empty state
        }
    };

    if (!progress) {
        return (
            <div className="flex justify-center items-center p-12">
                <LoadingIcon className="animate-spin h-10 w-10 text-blue-600" />
            </div>
        );
    }

    const allCategories: ProgressCategory[] = ['miniTest', 'reading', 'grammar', 'vocabulary', 'dictation', 'speaking', 'writing'];

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-6xl mx-auto">
                <button onClick={onBack} className="mb-8 inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors">
                    <ArrowLeftIcon className="h-5 w-5 mr-2" />
                    Back
                </button>
                <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
                    <div className="text-center sm:text-left mb-4 sm:mb-0">
                        <h2 className="text-4xl font-extrabold text-slate-900 sm:text-5xl dark:text-white">
                            {isOwnProgress ? 'Kết quả học của tôi' : `Progress for ${viewingUser.username}`}
                        </h2>
                        <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
                            Reviewing performance for <span className="font-bold text-blue-600">{viewingUser.username}</span>.
                        </p>
                    </div>
                    <button
                        onClick={handleClearProgress}
                        className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 font-semibold rounded-lg hover:bg-red-200 transition-colors text-sm"
                    >
                        <TrashIcon className="h-4 w-4" />
                        Clear All Progress for this User
                    </button>
                </div>
                
                <div className="space-y-8">
                    {allCategories.map(category => (
                        progress[category] && progress[category].length > 0 && <ProgressCategoryCard key={category} category={category} results={progress[category]} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyProgressScreen;