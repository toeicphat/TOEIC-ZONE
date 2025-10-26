import React from 'react';
import SelectionCard from './SelectionCard';

interface ListeningTranslationHomeScreenProps {
    onSelectTest: (testId: number) => void;
}

const listeningTranslationTests = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    title: `Test ${i + 1}`,
    description: `Practice with sentences from ETS Part 2.`,
}));

const ListeningTranslationHomeScreen: React.FC<ListeningTranslationHomeScreenProps> = ({ onSelectTest }) => {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-slate-900 dark:text-slate-100 sm:text-5xl">Phản xạ Nghe-Dịch</h2>
                    <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
                        Choose a test to begin your listening & translation practice.
                    </p>
                </div>
                
                <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6 text-center border-b border-slate-200 dark:border-slate-700 pb-4">
                        Part 2 Practice
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {listeningTranslationTests.map(test => (
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