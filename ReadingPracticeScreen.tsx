import React from 'react';
import SelectionCard from './SelectionCard';

interface ReadingPracticeScreenProps {
    onSelectPart: (part: number) => void;
}

const ReadingPracticeScreen: React.FC<ReadingPracticeScreenProps> = ({ onSelectPart }) => {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-slate-900 sm:text-5xl">Luyện tập Reading</h2>
                    <p className="mt-4 text-lg text-slate-600">
                        Choose a part to begin your reading comprehension practice.
                    </p>
                </div>
                
                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-slate-200">
                    <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center border-b pb-4">
                        TEST 2024
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <SelectionCard 
                            title="Part 5: Incomplete Sentences"
                            description="Choose the best word or phrase to complete the sentence."
                            onClick={() => onSelectPart(5)}
                        />
                        <SelectionCard 
                            title="Part 6: Text Completion"
                            description="Read texts with blanks and choose the best sentences or words to complete them."
                            onClick={() => onSelectPart(6)}
                        />
                        <SelectionCard 
                            title="Part 7: Reading Comprehension"
                            description="Read a variety of texts and answer questions about them."
                            onClick={() => onSelectPart(7)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReadingPracticeScreen;