import React, { useState, useMemo } from 'react';
import { allDictationTests } from '../services/dictationLibrary';
import { ArrowLeftIcon } from './icons';

interface DictationPracticeSetupScreenProps {
    testId: number;
    onStartPractice: (parts: number[]) => void;
    onBack: () => void;
}

const DictationPracticeSetupScreen: React.FC<DictationPracticeSetupScreenProps> = ({ testId, onStartPractice, onBack }) => {
    const [selectedParts, setSelectedParts] = useState<Record<number, boolean>>({ 1: false, 2: false, 3: false, 4: false });

    const testSet = useMemo(() => allDictationTests.find(t => t.id === testId), [testId]);

    const handlePartToggle = (part: number) => {
        setSelectedParts(prev => ({ ...prev, [part]: !prev[part] }));
    };

    const handleStartClick = () => {
        const partsToPractice = Object.entries(selectedParts)
            .filter(([, isSelected]) => isSelected)
            .map(([part]) => Number(part));
        
        if (partsToPractice.length > 0) {
            onStartPractice(partsToPractice);
        }
    };

    const anyPartSelected = Object.values(selectedParts).some(isSelected => isSelected);

    if (!testSet) {
        return (
            <div className="container mx-auto px-4 py-12 text-center">
                <p>Test not found.</p>
                <button onClick={onBack} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md">Go Back</button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
                <button onClick={onBack} className="mb-8 inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors">
                    <ArrowLeftIcon className="h-5 w-5 mr-2" />
                    Back to Test Selection
                </button>
                <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200">
                    <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">{testSet.title} - Practice Setup</h2>
                    <div className="space-y-6">
                        {([1, 2, 3, 4] as const).map(partNum => (
                            <div key={partNum} className="p-4 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors">
                                <label className="flex items-center space-x-4 cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        checked={selectedParts[partNum]} 
                                        onChange={() => handlePartToggle(partNum)} 
                                        className="h-6 w-6 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <span className="text-xl font-bold text-slate-800">Part {partNum}</span>
                                </label>
                            </div>
                        ))}
                    </div>
                    
                    <div className="mt-8 text-center">
                        <button 
                            onClick={handleStartClick} 
                            disabled={!anyPartSelected} 
                            className="w-full sm:w-auto px-10 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
                        >
                            Start Practice
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DictationPracticeSetupScreen;