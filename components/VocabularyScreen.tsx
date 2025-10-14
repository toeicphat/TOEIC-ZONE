import React from 'react';
import { VocabularyPart } from '../types';
import SelectionCard from './SelectionCard';
import { listeningPart1VocabularyData } from '../services/vocabulary/listeningPart1Vocabulary';
import { listeningComprehensiveVocabularyData } from '../services/vocabulary/listeningComprehensiveVocabulary';
import { readingPart7VocabularyData } from '../services/vocabulary/readingPart7Vocabulary';
import { readingComprehensiveVocabularyData } from '../services/vocabulary/readingComprehensiveVocabulary';

const vocabularyData: VocabularyPart[] = [
    listeningPart1VocabularyData,
    listeningComprehensiveVocabularyData,
    readingPart7VocabularyData,
    readingComprehensiveVocabularyData,
];

interface VocabularyScreenProps {
    onSelectPart: (partId: number) => void;
}

const VocabularyScreen: React.FC<VocabularyScreenProps> = ({ onSelectPart }) => {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-slate-900 sm:text-5xl">Vocabulary</h2>
                    <p className="mt-4 text-lg text-slate-600">
                        Choose a pre-defined list to begin your vocabulary practice.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {vocabularyData.map(part => (
                        <SelectionCard
                            key={part.id}
                            title={part.title}
                            description={part.description}
                            onClick={() => onSelectPart(part.id)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VocabularyScreen;
