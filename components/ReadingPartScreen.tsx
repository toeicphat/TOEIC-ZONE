import React from 'react';
import SelectionCard from './SelectionCard';

interface ReadingPartScreenProps {
    part: number;
    onSelectTest: (part: number, testId: number) => void;
    onBack: () => void;
}

const ReadingPartScreen: React.FC<ReadingPartScreenProps> = ({ part, onSelectTest, onBack }) => {
    const tests = [1, 2, 3, 4, 5];

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
                <button onClick={onBack} className="mb-8 inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Back to Reading Practice
                </button>
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-slate-900 sm:text-5xl">Reading Part {part}</h2>
                    <p className="mt-4 text-lg text-slate-600">
                        Select a test to begin.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {tests.map(testId => (
                        <SelectionCard 
                            key={testId}
                            title={`Test ${testId}`}
                            description={`Practice Test ${testId} for Part ${part}.`}
                            onClick={() => onSelectTest(part, testId)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ReadingPartScreen;
