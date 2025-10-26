

import { VocabularyPart, VocabularyTest, VocabItem } from '../types';
import { listeningPart1VocabularyData } from './vocabulary/listeningPart1Vocabulary';
import { listeningComprehensiveVocabularyData } from './vocabulary/listeningComprehensiveVocabulary';
import { readingPart7VocabularyData } from './vocabulary/readingPart7Vocabulary';
import { readingComprehensiveVocabularyData } from './vocabulary/readingComprehensiveVocabulary';
import { readingPart7IntenseVocabularyData } from './vocabulary/readingPart7intense';

export const allVocabularyParts: VocabularyPart[] = [
    listeningPart1VocabularyData,
    listeningComprehensiveVocabularyData,
    readingPart7VocabularyData,
    readingPart7IntenseVocabularyData,
    readingComprehensiveVocabularyData,
];

export const getVocabularyPart = (partId: number): VocabularyPart | null => {
    return allVocabularyParts.find(p => p.id === partId) || null;
};

export const getVocabularyTest = (partId: number, testId: number): VocabularyTest | null => {
    const part = getVocabularyPart(partId);
    return part?.tests.find(t => t.id === testId) || null;
};

export const getRandomVocabularyWords = (count: number): VocabItem[] => {
    const allWords = allVocabularyParts.flatMap(part => part.tests.flatMap(test => test.words));
    const shuffled = [...allWords].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};