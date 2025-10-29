import React from 'react';
import SelectionCard from './SelectionCard';
import { allListeningTranslationOriginalTests, allListeningTranslation2022Tests } from '../services/listeningTranslationLibrary';


interface ListeningTranslationHomeScreenProps {
    onSelectTest: (testId: number) => void;
}

const ListeningTranslationHomeScreen: React.FC<ListeningTranslationHomeScreenProps> = ({ onSelectTest }) => {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-slate-900 dark:text-slate-100 sm:text-5xl">Phản xạ Nghe-Dịch</h2>
                    <p className="mt-4 text-lg text-red-600 dark:text-slate-400">
                        Lưu ý: Trước khi luyện tập chế độ này, bạn cần học kĩ TẤT CẢ từ vựng của Part 2 để luyện tập phản ứng nhanh.
                    </p>
                </div>
                
                <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6 text-center border-b border-slate-200 dark:border-slate-700 pb-4">
                        Part 2 2024
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {allListeningTranslationOriginalTests.map(test => (
                            <SelectionCard 
                                key={test.id}
                                title={test.title}
                                description={test.description}
                                onClick={() => onSelectTest(test.id)}
                            />
                        ))}
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 mt-12">
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6 text-center border-b border-slate-200 dark:border-slate-700 pb-4">
                        Part 2 2022
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {allListeningTranslation2022Tests.map(test => (
                            <SelectionCard 
                                key={test.id}
                                title={test.title}
                                description={test.description}
                                onClick={() => onSelectTest(test.id)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListeningTranslationHomeScreen;