

import React, { useState, useEffect } from 'react';

const StatsFooter: React.FC = () => {
    const [deployTime, setDeployTime] = useState<string>('');

    useEffect(() => {
        // Set the deploy time once when the component mounts.
        const now = new Date();
        const formattedTime = now.toLocaleString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
        });
        setDeployTime(formattedTime);
    }, []);

    return (
        <footer className="bg-blue-50/80 dark:bg-slate-900/80 backdrop-blur-sm text-slate-700 dark:text-slate-300 py-4 border-t border-blue-200 dark:border-slate-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
                <div className="flex justify-center items-center space-x-2">
                    <span className="font-semibold text-slate-600 dark:text-slate-400">Bản cập nhật:</span>
                    <span className="font-mono text-slate-800 dark:text-slate-200">{deployTime}</span>
                </div>
                <div className="mt-4 text-slate-500 dark:text-slate-400">
                    © {new Date().getFullYear()} <a href="https://www.facebook.com/phattruong.english" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">Mr.Phat TOEIC</a>. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default StatsFooter;