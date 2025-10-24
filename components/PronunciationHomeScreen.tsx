import React from 'react';
import { SparklesIcon } from './icons';
import SelectionCard from './SelectionCard';

interface PronunciationHomeScreenProps {
    onStartSingleWordPractice: () => void;
}

const PronunciationHomeScreen: React.FC<PronunciationHomeScreenProps> = ({ onStartSingleWordPractice }) => {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-slate-900 dark:text-slate-100 sm:text-5xl">Luyện tập Phát âm</h2>
                    <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
                        Chọn một chế độ để bắt đầu luyện tập. Các bài tập này yêu cầu quyền truy cập micro.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <button 
                        onClick={onStartSingleWordPractice}
                        className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-slate-200 dark:border-slate-700 text-left w-full h-full flex flex-col items-center text-center"
                    >
                        <SparklesIcon className="h-10 w-10 mb-4 text-teal-500" />
                        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">Từ lẻ</h3>
                        <p className="text-slate-600 dark:text-slate-400 flex-grow">Luyện phát âm từng từ riêng lẻ dựa trên phiên âm.</p>
                    </button>
                    <div className="bg-slate-100 dark:bg-slate-800/50 p-8 rounded-xl border border-slate-200 dark:border-slate-700 text-left w-full h-full flex flex-col items-center text-center opacity-60">
                        <h3 className="text-2xl font-bold text-slate-500 dark:text-slate-400 mb-2">Câu</h3>
                        <p className="text-slate-500 dark:text-slate-400 flex-grow">Luyện phát âm cả câu hoàn chỉnh.</p>
                        <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 mt-4">Sắp ra mắt</span>
                    </div>
                     <div className="bg-slate-100 dark:bg-slate-800/50 p-8 rounded-xl border border-slate-200 dark:border-slate-700 text-left w-full h-full flex flex-col items-center text-center opacity-60">
                        <h3 className="text-2xl font-bold text-slate-500 dark:text-slate-400 mb-2">Đoạn</h3>
                        <p className="text-slate-500 dark:text-slate-400 flex-grow">Luyện phát âm một đoạn văn ngắn.</p>
                        <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 mt-4">Sắp ra mắt</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PronunciationHomeScreen;
