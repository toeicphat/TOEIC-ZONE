import React, { useState, useEffect, useCallback } from 'react';
import { User, TestResult } from '../types';
import { getLatestActivityForAllCategories } from '../services/progressService';
import { LoadingIcon, RefreshIcon } from './icons';

interface StudentManagementScreenProps {
    users: User[];
    onViewStudentProgress: (user: User) => void;
}

interface UserActivity extends User {
    latestActivity: TestResult | null;
}

const StudentManagementScreen: React.FC<StudentManagementScreenProps> = ({ users, onViewStudentProgress }) => {
    const [studentData, setStudentData] = useState<UserActivity[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const fetchActivities = useCallback(() => {
        const standardUsers = users.filter(u => u.username !== 'admin');
        const data = standardUsers.map(user => {
            const latestActivity = getLatestActivityForAllCategories(user.username);
            return { ...user, latestActivity };
        });

        // Sort data to show most recent activity at the top
        data.sort((a, b) => {
            if (!a.latestActivity) return 1; // users with no activity go to the bottom
            if (!b.latestActivity) return -1;
            return b.latestActivity.date - a.latestActivity.date;
        });

        setStudentData(data);
    }, [users]);

    const handleRefresh = useCallback(() => {
        // Don't show the main loading screen for a refresh, just the button spinner
        setIsRefreshing(true);
        fetchActivities();
        // Use a short timeout to provide visual feedback, as localStorage access is very fast
        setTimeout(() => {
            setIsRefreshing(false);
        }, 500);
    }, [fetchActivities]);

    useEffect(() => {
        setIsLoading(true);
        fetchActivities();
        setIsLoading(false);
    }, [fetchActivities]);
    
    // Auto-refresh when the tab becomes visible or focused
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                handleRefresh();
            }
        };

        window.addEventListener('focus', handleRefresh);
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            window.removeEventListener('focus', handleRefresh);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [handleRefresh]);


    if (isLoading) {
        return (
            <div className="flex justify-center items-center p-12">
                <LoadingIcon className="animate-spin h-10 w-10 text-blue-600" />
                <span className="ml-4 text-lg">Loading Student Data...</span>
            </div>
        );
    }
    
    const formatResult = (result: TestResult) => {
        const percentage = result.total > 0 ? Math.round((result.score / result.total) * 100) : 0;
        return `${result.score}/${result.total} (${percentage}%)`;
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-6xl mx-auto">
                 <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 gap-4">
                    <h2 className="text-4xl font-extrabold text-slate-900 sm:text-5xl">Quản lý học viên</h2>
                    <button
                        onClick={handleRefresh}
                        disabled={isRefreshing}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 font-semibold rounded-lg hover:bg-blue-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isRefreshing ? (
                            <LoadingIcon className="h-5 w-5 animate-spin" />
                        ) : (
                            <RefreshIcon className="h-5 w-5" />
                        )}
                        Sync Latest Activities
                    </button>
                </div>
                <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-x-auto">
                    <table className="w-full text-sm text-left text-slate-500">
                        <thead className="text-xs text-slate-700 uppercase bg-slate-100">
                            <tr>
                                <th scope="col" className="px-6 py-3">Học viên</th>
                                <th scope="col" className="px-6 py-3">Hoạt động gần nhất</th>
                                <th scope="col" className="px-6 py-3">Thời gian</th>
                                <th scope="col" className="px-6 py-3">Kết quả</th>
                                <th scope="col" className="px-6 py-3 text-center">Chi tiết</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentData.length > 0 ? studentData.map(student => (
                                <tr key={student.username} className="bg-white border-b hover:bg-slate-50">
                                    <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">
                                        {student.username}
                                    </th>
                                    <td className="px-6 py-4">
                                        {student.latestActivity ? student.latestActivity.title : 'No activity'}
                                    </td>
                                    <td className="px-6 py-4">
                                        {student.latestActivity ? new Date(student.latestActivity.date).toLocaleString() : 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 font-semibold">
                                        {student.latestActivity ? formatResult(student.latestActivity) : 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <button
                                            onClick={() => onViewStudentProgress(student)}
                                            className="font-medium text-blue-600 hover:underline disabled:text-slate-400 disabled:no-underline"
                                            disabled={!student.latestActivity}
                                        >
                                            Details
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={5} className="text-center py-10 text-slate-500">No student data to display.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default StudentManagementScreen;