
import { UserProgress, UserSettings, VocabularyWord, TestResult, ProgressCategory, VocabItem, API_BASE_URL } from '../types';

// Helper to create a successful JSON response
const createJsonResponse = (data: any, status = 200) => {
    return new Response(JSON.stringify(data), {
        status,
        headers: { 'Content-Type': 'application/json' },
    });
};

// Use localStorage as a simple key-value database
const db = {
    getItem: (key: string) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error(`[API MOCK] Error reading from localStorage key "${key}":`, error);
            return null;
        }
    },
    setItem: (key: string, value: any) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(`[API MOCK] Error writing to localStorage key "${key}":`, error);
        }
    },
    removeItem: (key: string) => {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error(`[API MOCK] Error removing from localStorage key "${key}":`, error);
        }
    }
};

const initialProgress: UserProgress = {
    miniTest: [], reading: [], grammar: [], vocabulary: [], dictation: [], speaking: [], writing: [], pronunciation: []
};

export const mockFetch = async (url: RequestInfo | URL, config?: RequestInit): Promise<Response> => {
    const urlString = url.toString();
    const method = config?.method?.toUpperCase() || 'GET';
    const body = config?.body ? JSON.parse(config.body.toString()) : {};

    // --- PROGRESS API ---
    if (urlString.startsWith(`${API_BASE_URL}/api/progress/`) && method === 'GET' && !urlString.includes('/result')) {
        const urlUsername = urlString.split('/').pop()!;
        console.log(`[API MOCK] GET /api/progress/${urlUsername}`);
        const progress = db.getItem(`progress_${urlUsername}`) || initialProgress;
        return createJsonResponse(progress);
    }
    
    if (urlString === `${API_BASE_URL}/api/progress/result` && method === 'POST') {
        const { username, category, result } = body;
        console.log(`[API MOCK] POST /api/progress/result for ${username}`);
        const progress: UserProgress = db.getItem(`progress_${username}`) || { ...initialProgress };
        if (!progress[category]) {
            progress[category] = [];
        }
        progress[category].push(result);
        db.setItem(`progress_${username}`, progress);
        return createJsonResponse({ success: true });
    }

    if (urlString.startsWith(`${API_BASE_URL}/api/progress/`) && method === 'DELETE') {
        const urlUsername = urlString.split('/').pop()!;
        console.log(`[API MOCK] DELETE /api/progress/${urlUsername}`);
        db.removeItem(`progress_${urlUsername}`);
        return createJsonResponse({ success: true });
    }

    // --- SETTINGS API ---
    if (urlString.startsWith(`${API_BASE_URL}/api/settings/`) && method === 'GET') {
        const urlUsername = urlString.split('/').pop()!;
        console.log(`[API MOCK] GET /api/settings/${urlUsername}`);
        const settings = db.getItem(`settings_${urlUsername}`) || {};
        return createJsonResponse(settings);
    }

    if (urlString === `${API_BASE_URL}/api/settings` && method === 'POST') {
        const { username, settings } = body;
        console.log(`[API MOCK] POST /api/settings for ${username}`);
        db.setItem(`settings_${username}`, settings);
        return createJsonResponse({ success: true });
    }

    // --- VOCABULARY API ---
    if (urlString.startsWith(`${API_BASE_URL}/api/vocabulary/`) && !urlString.includes('/word/') && !urlString.includes('/srs') && method === 'GET') {
        const urlUsername = urlString.split('/').pop()!;
        console.log(`[API MOCK] GET /api/vocabulary/${urlUsername}`);
        const vocabList = db.getItem(`vocab_${urlUsername}`) || [];
        return createJsonResponse(vocabList);
    }
    
    if (urlString === `${API_BASE_URL}/api/vocabulary/word` && method === 'POST') {
        const { username, word } = body;
        console.log(`[API MOCK] POST /api/vocabulary/word for ${username}`);
        let vocabList: VocabularyWord[] = db.getItem(`vocab_${username}`) || [];
        const existingIndex = vocabList.findIndex(w => w.id === word.id);
        if (existingIndex > -1) {
            vocabList[existingIndex] = word;
        } else {
            vocabList.push(word);
        }
        db.setItem(`vocab_${username}`, vocabList);
        return createJsonResponse({ success: true });
    }

    if (urlString.startsWith(`${API_BASE_URL}/api/vocabulary/word/`) && method === 'DELETE') {
        const wordId = decodeURIComponent(urlString.split('/').pop()!);
        const { username } = body;
        console.log(`[API MOCK] DELETE /api/vocabulary/word/${wordId} for ${username}`);
        let vocabList: VocabularyWord[] = db.getItem(`vocab_${username}`) || [];
        vocabList = vocabList.filter(w => w.id !== wordId);
        db.setItem(`vocab_${username}`, vocabList);
        return createJsonResponse({ success: true });
    }

    if (urlString === `${API_BASE_URL}/api/vocabulary/srs` && method === 'POST') {
        const { username, wordId, performance, wordDetails, source } = body;
        console.log(`[API MOCK] POST /api/vocabulary/srs for ${username}`);
        let vocabList: VocabularyWord[] = db.getItem(`vocab_${username}`) || [];
        let word = vocabList.find(w => w.id === wordId);

        const now = Date.now();
        const intervals = [1, 2, 4, 8, 16, 32, 64, 128, 256]; // days
        const dayInMillis = 24 * 60 * 60 * 1000;

        if (!word) {
             word = {
                id: wordId,
                word: wordDetails.word,
                definition: wordDetails.definition,
                srsLevel: 0,
                nextReviewDate: now,
                lastReviewedDate: null,
                sourceText: source,
            };
            vocabList.push(word);
        }
        
        word.lastReviewedDate = now;

        if (performance === 'easy') {
            word.srsLevel = Math.min(word.srsLevel + 2, intervals.length - 1);
        } else if (performance === 'good') {
            word.srsLevel = Math.min(word.srsLevel + 1, intervals.length - 1);
        } else { // 'hard'
            word.srsLevel = Math.max(0, word.srsLevel - 2);
        }
        
        word.nextReviewDate = now + intervals[word.srsLevel] * dayInMillis;
        
        const existingIndex = vocabList.findIndex(w => w.id === wordId);
        if (existingIndex > -1) {
            vocabList[existingIndex] = word;
        }

        db.setItem(`vocab_${username}`, vocabList);
        return createJsonResponse(word);
    }

    console.warn(`[API MOCK] Unhandled request: ${method} ${urlString}`);
    return new Response(JSON.stringify({ error: 'Not Found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
    });
};
