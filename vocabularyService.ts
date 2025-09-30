import { VocabularyWord, VocabItem } from '../types';

const VOCAB_STORAGE_KEY = 'toeicAppVocabulary';

// SRS intervals in days. Level 0 is immediate review.
const srsIntervals = [0, 1, 3, 7, 14, 30, 90, 180, 365];

const calculateNextReviewDate = (level: number): number => {
    const intervalDays = srsIntervals[level] || srsIntervals[srsIntervals.length - 1];
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + intervalDays);
    nextDate.setHours(2, 0, 0, 0); // Set to 2 AM to avoid timezone issues with 'today'
    return nextDate.getTime();
};

export const getVocabularyList = (): VocabularyWord[] => {
    try {
        const storedVocab = localStorage.getItem(VOCAB_STORAGE_KEY);
        return storedVocab ? JSON.parse(storedVocab) : [];
    } catch (error) {
        console.error("Error reading vocabulary from localStorage", error);
        return [];
    }
};

const saveVocabularyList = (words: VocabularyWord[]): void => {
    try {
        localStorage.setItem(VOCAB_STORAGE_KEY, JSON.stringify(words));
    } catch (error) {
        console.error("Error saving vocabulary to localStorage", error);
    }
};

export const addOrUpdateVocabularyWord = (word: VocabularyWord): void => {
    const words = getVocabularyList();
    const existingIndex = words.findIndex(w => w.id === word.id);
    if (existingIndex > -1) {
        words[existingIndex] = { ...words[existingIndex], ...word };
    } else {
        words.push(word);
    }
    saveVocabularyList(words.sort((a, b) => a.word.localeCompare(b.word)));
};

export const deleteVocabularyWord = (wordId: string): void => {
    let words = getVocabularyList();
    words = words.filter(w => w.id !== wordId);
    saveVocabularyList(words);
};

export const getWordsForReview = (): VocabularyWord[] => {
    const words = getVocabularyList();
    const now = new Date();
    now.setHours(23, 59, 59, 999); // End of today
    return words.filter(w => w.nextReviewDate <= now.getTime());
};

export const updateWordSrsLevel = (wordId: string, performance: 'hard' | 'good' | 'easy', wordDetails?: VocabItem, source?: string): VocabularyWord | null => {
    const words = getVocabularyList();
    const existingWord = words.find(w => w.id === wordId);

    if (!existingWord) {
        // Word not found, create it if details are provided
        if (!wordDetails) return null;

        let newLevel = 0;
        if (performance === 'good') newLevel = 1;
        if (performance === 'easy') newLevel = 2;

        const newWord: VocabularyWord = {
            id: wordId,
            word: wordDetails.word,
            definition: wordDetails.definition,
            srsLevel: newLevel,
            nextReviewDate: calculateNextReviewDate(newLevel),
            lastReviewedDate: Date.now(),
            sourceText: wordDetails.example || source,
        };
        addOrUpdateVocabularyWord(newWord);
        return newWord;
    }

    // Word found, update it
    let newLevel = existingWord.srsLevel;

    switch (performance) {
        case 'hard':
            newLevel = 0;
            break;
        case 'good':
            newLevel = Math.min(srsIntervals.length - 1, newLevel + 1);
            break;
        case 'easy':
            newLevel = Math.min(srsIntervals.length - 1, newLevel + 2);
            break;
    }
    
    const updatedWord: VocabularyWord = {
        ...existingWord,
        srsLevel: newLevel,
        lastReviewedDate: Date.now(),
        nextReviewDate: calculateNextReviewDate(newLevel),
    };
    
    addOrUpdateVocabularyWord(updatedWord);
    return updatedWord;
};