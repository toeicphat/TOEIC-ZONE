import { UserProgress, TestResult, ProgressCategory } from '../types';

const getProgressStorageKey = (username: string): string => `toeicAppProgress_${username}`;

const initialProgress: UserProgress = {
    miniTest: [],
    reading: [],
    grammar: [],
    vocabulary: [],
    dictation: [],
    speaking: [],
    writing: [],
};

export const getProgress = (username: string): UserProgress => {
    try {
        const storedProgress = localStorage.getItem(getProgressStorageKey(username));
        if (storedProgress) {
            const parsed = JSON.parse(storedProgress);
            // Ensure all categories exist to prevent errors if the data structure changes
            return { ...initialProgress, ...parsed };
        }
        return { ...initialProgress };
    } catch (error) {
        console.error("Error reading progress from localStorage", error);
        return { ...initialProgress };
    }
};

export const saveProgress = (username: string, progress: UserProgress): void => {
    try {
        localStorage.setItem(getProgressStorageKey(username), JSON.stringify(progress));
    } catch (error) {
        console.error("Error saving progress to localStorage", error);
    }
};

export const addTestResult = (username: string, category: ProgressCategory, result: TestResult): void => {
    const userProgress = getProgress(username);
    
    // Keep only the last 20 results per category to prevent localStorage from getting too big
    const updatedCategoryResults = [result, ...userProgress[category]].slice(0, 20);
    
    const updatedProgress: UserProgress = {
        ...userProgress,
        [category]: updatedCategoryResults,
    };
    
    saveProgress(username, updatedProgress);
};

export const clearProgress = (username: string): void => {
    try {
        localStorage.removeItem(getProgressStorageKey(username));
    } catch (error) {
        console.error("Error clearing progress from localStorage", error);
    }
}

export const getLatestActivityForAllCategories = (username: string): TestResult | null => {
    const userProgress = getProgress(username);
    if (!userProgress) {
        return null;
    }

    const allResults: TestResult[] = Object.values(userProgress).flat();

    if (allResults.length === 0) {
        return null;
    }

    // Sort by date descending to find the latest activity
    allResults.sort((a, b) => b.date - a.date);

    return allResults[0];
};