
import React, { useState, useEffect, useMemo } from 'react';
import { User, UserProgress, TestResult, ProgressCategory, UserSettings } from '../types';
import { getProgress, clearProgress } from '../services/progressService';
import { getSettings } from '../services/settingsService';
import { BookOpenIcon, BrainIcon, HeadphoneIcon, PuzzleIcon, TypeIcon, TrophyIcon, TrashIcon, ArrowLeftIcon, TargetIcon, CalendarIcon } from './icons';
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
            <td className="p-3 text-slate-700 dark:text-slate-300">
                {result.title}
            </td>
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

    const sortedResults = useMemo(() => [...results].sort((a: TestResult, b: TestResult) => b.date - a.date), [results]);

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
                            {sortedResults.map(result => <ResultRow key={result.id} result={result} />)}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center text-slate-500 dark:text-slate-400 py-8">No results recorded for this category yet.</p>
            )}
        </div>
    );
};

const CircularProgressBar: React.FC<{ percentage: number, size?: number, strokeWidth?: number }> = ({ percentage, size = 160, strokeWidth = 12 }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
            <svg className="w-full h-full transform -rotate-90">
                <circle
                    className="text-slate-200 dark:text-slate-700"
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
                <circle
                    className="text-blue-600 dark:text-blue-500"
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                    style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
                />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
                 <span className="text-4xl font-bold text-slate-800 dark:text-slate-100">{`${Math.round(percentage)}%`}</span>
                 <span className="text-sm text-slate-500 dark:text-slate-400">Overall</span>
            </div>
        </div>
    );
};

const BarChart: React.FC<{ data: { label: string; value: number; icon: React.FC<any> }[] }> = ({ data }) => {
    return (
        <div className="w-full h-64 bg-slate-50 dark:bg-slate-800 p-4 rounded-lg flex flex-col">
            <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4">Performance by Category</h4>
            <div className="flex-grow flex items-end justify-around gap-2">
                {data.map(({ label, value, icon: Icon }) => (
                    <div key={label} className="w-full flex flex-col items-center group relative">
                        <div className="absolute -top-8 bg-slate-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            {label}: {Math.round(value)}%
                        </div>
                        <div 
                            className="w-4/5 bg-blue-500 rounded-t-md hover:bg-blue-600 transition-colors"
                            style={{ height: `${value}%` }}
                        ></div>
                        <div className="w-full text-center mt-2">
                           <Icon className="h-6 w-6 mx-auto text-slate-500 dark:text-slate-400" title={label} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const LineChart: React.FC<{ data: TestResult[] }> = ({ data }) => {
    if (data.length < 2) {
        return (
             <div className="w-full h-64 bg-slate-50 dark:bg-slate-800 p-4 rounded-lg flex flex-col justify-center items-center">
                 <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-2">Progress Over Time</h4>
                 <p className="text-slate-500 dark:text-slate-400">Complete more tests to see your progress trend.</p>
            </div>
        );
    }
    const width = 500;
    const height = 200;
    const padding = 30;

    const minDate = data[0].date;
    const maxDate = data[data.length - 1].date;
    
    const pointsData = data.map(d => {
        const x = ((d.date - minDate) / (maxDate - minDate || 1)) * (width - 2 * padding) + padding;
        const y = height - padding - (((d.score / d.total) * 100) / 100) * (height - 2 * padding);
        return { x, y };
    });

    const points = pointsData.map(p => `${p.x},${p.y}`).join(' ');
    
     const circles = data.map((d, i) => {
        const { x, y } = pointsData[i];
        const percentage = Math.round((d.score / d.total) * 100);
        return (
            <g key={i} className="group">
                <circle cx={x} cy={y} r="4" className="fill-blue-600 dark:fill-blue-500" />
                <circle cx={x} cy={y} r="8" className="fill-transparent" />
                 <g className="opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <rect x={x - 40} y={y - 45} width="80" height="35" rx="5" fill="rgba(30, 41, 59, 0.8)" />
                    <text x={x} y={y - 30} textAnchor="middle" fill="white" fontSize="12px" fontWeight="bold">{percentage}%</text>
                    <text x={x} y={y - 15} textAnchor="middle" fill="white" fontSize="10px">{new Date(d.date).toLocaleDateString()}</text>
                </g>
            </g>
        );
    });

    return (
        <div className="w-full bg-slate-50 dark:bg-slate-800 p-4 rounded-lg flex flex-col">
            <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4">Progress Over Time (Last 15)</h4>
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
                {/* Y-Axis */}
                <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="currentColor" className="text-slate-300 dark:text-slate-600" />
                <text x={padding - 10} y={padding + 5} textAnchor="end" fontSize="10" className="fill-slate-500 dark:fill-slate-400">100%</text>
                <text x={padding - 10} y={height - padding} textAnchor="end" fontSize="10" className="fill-slate-500 dark:fill-slate-400">0%</text>

                {/* X-Axis */}
                <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="currentColor" className="text-slate-300 dark:text-slate-600" />
                <text x={padding} y={height - padding + 15} textAnchor="start" fontSize="10" className="fill-slate-500 dark:fill-slate-400">{new Date(minDate).toLocaleDateString()}</text>
                <text x={width-padding} y={height - padding + 15} textAnchor="end" fontSize="10" className="fill-slate-500 dark:fill-slate-400">{new Date(maxDate).toLocaleDateString()}</text>

                <polyline
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-blue-600 dark:text-blue-500"
                    points={points}
                />
                {circles}
            </svg>
        </div>
    );
};


export const MyProgressScreen: React.FC<MyProgressScreenProps> = ({ viewingUser, onBack, isOwnProgress }) => {
    const [progress, setProgress] = useState<UserProgress | null>(null);
    const [settings, setSettings] = useState<UserSettings | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            const progressData = await getProgress(viewingUser.username);
            const settingsData = await getSettings(viewingUser.username);
            setProgress(progressData);
            setSettings(settingsData);
            setIsLoading(false);
        };
        loadData();
    }, [viewingUser.username]);
    
    const allResults = useMemo(() => {
        if (!progress) return [];
        // FIX: Explicitly type the arguments of the sort function to avoid type inference issues where they can be inferred as 'unknown'.
        return Object.values(progress).flat().sort((a: TestResult, b: TestResult) => a.date - b.date);
    }, [progress]);

    const overallAverage = useMemo(() => {
        if (allResults.length === 0) return 0;
        const totalPercentage = allResults.reduce((sum, result) => {
            return sum + (result.total > 0 ? (result.score / result.total) * 100 : 0);
        }, 0);
        return totalPercentage / allResults.length;
    }, [allResults]);

    const categoryAverages = useMemo(() => {
        if (!progress) return [];
        const categoriesWithData = (Object.keys(categoryInfo) as ProgressCategory[]).filter(cat => progress[cat] && progress[cat].length > 0);

        return categoriesWithData.map(category => {
            const results = progress[category];
            const avg = results.reduce((sum, r) => sum + (r.total > 0 ? (r.score / r.total) * 100 : 0), 0) / results.length;
            return {
                label: categoryInfo[category].name,
                value: avg,
                icon: categoryInfo[category].icon,
            };
        });
    }, [progress]);

    const recentActivityForLineChart = useMemo(() => {
        return allResults.slice(-15); // Get last 15 activities
    }, [allResults]);


    const handleClearProgress = async () => {
        if (window.confirm(`Are you sure you want to delete all progress for ${viewingUser.username}? This action cannot be undone.`)) {
            setIsLoading(true);
            await clearProgress(viewingUser.username);
            const data = await getProgress(viewingUser.username);
            setProgress(data);
            setIsLoading(false);
        }
    };

    if (isLoading || !progress || !settings) {
        return (
            <div className="flex justify-center items-center p-12">
                <LoadingIcon className="animate-spin h-10 w-10 text-blue-600" />
            </div>
        );
    }

    const allCategories: ProgressCategory[] = ['miniTest', 'reading', 'grammar', 'vocabulary', 'dictation', 'speaking', 'writing'];
    
    const formatDate = (dateString: string | undefined) => {
        if (!dateString) return 'Not Set';
        // Add time to avoid timezone issues. The input is YYYY-MM-DD.
        const date = new Date(dateString + 'T00:00:00');
        return date.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };
    
    const renderDashboard = () => (
        <div className="mb-12">
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Progress Dashboard</h3>
            {allResults.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 flex justify-center lg:col-span-1">
                        <CircularProgressBar percentage={overallAverage} />
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 lg:col-span-2">
                        <BarChart data={categoryAverages} />
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 lg:col-span-3">
                         <LineChart data={recentActivityForLineChart} />
                    </div>
                </div>
            ) : (
                <div className="text-center bg-white dark:bg-slate-800 p-12 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
                    <TrophyIcon className="h-16 w-16 text-slate-400 mx-auto" />
                    <h4 className="text-xl font-bold text-slate-700 dark:text-slate-200 mt-4">No Data to Display</h4>
                    <p className="text-slate-500 dark:text-slate-400 mt-2">Complete some exercises to see your progress chart here!</p>
                </div>
            )}
        </div>
    );

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

                {(settings.scoreTarget || settings.examDate) && (
                    <div className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {settings.scoreTarget && (
                            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 flex items-center space-x-4">
                                <TargetIcon className="h-10 w-10 text-green-500" />
                                <div>
                                    <p className="text-slate-500 dark:text-slate-400 font-semibold">Mục tiêu điểm số</p>
                                    <p className="text-3xl font-bold text-slate-800 dark:text-slate-100">{settings.scoreTarget}</p>
                                </div>
                            </div>
                        )}
                        {settings.examDate && (
                             <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 flex items-center space-x-4">
                                <CalendarIcon className="h-10 w-10 text-purple-500" />
                                <div>
                                    <p className="text-slate-500 dark:text-slate-400 font-semibold">Ngày thi dự kiến</p>
                                    <p className="text-3xl font-bold text-slate-800 dark:text-slate-100">{formatDate(settings.examDate)}</p>
                                </div>
                            </div>
                        )}
                    </div>
                )}
                
                {renderDashboard()}

                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 mt-12">Detailed Results</h3>
                <div className="space-y-8">
                    {allCategories.map(category => {
                        const hasResults = progress[category] && progress[category].length > 0;
                        return hasResults ? <ProgressCategoryCard key={category} category={category} results={progress[category]} /> : null;
                    })}
                </div>
            </div>
        </div>
    );
};
