export enum AppState {
    PracticeHub = 'PRACTICE_HUB',
    DictationHome = 'DICTATION_HOME',
    ReadingPracticeHome = 'READING_PRACTICE_HOME',
    ReadingPartHome = 'READING_PART_HOME',
    ReadingTest = 'READING_TEST',
    GrammarHome = 'GRAMMAR_HOME',
    GrammarTopic = 'GRAMMAR_TOPIC',
    VocabularyHome = 'VOCABULARY_HOME',
    VocabularyPartHome = 'VOCABULARY_PART_HOME',
    VocabularyTest = 'VOCABULARY_TEST',
    ChangePassword = 'CHANGE_PASSWORD',
}

export type QuestionOption = 'A' | 'B' | 'C' | 'D';

// FIX: Add TestData and Question interfaces for the TOEIC Mini Test feature.
export interface Question {
    id: number;
    part: number;
    questionText: string;
    options: {
        A: string;
        B: string;
        C: string;
        D: string;
    };
    correctAnswer: QuestionOption;
    explanation: string;
    image?: string;
    audioScript?: string;
}

export interface TestData {
    testTitle: string;
    duration: number;
    questions: Question[];
}


export interface UserAnswers {
    [questionId: string | number]: QuestionOption | null;
}

// For AI-generated exercises
export interface DictationExercise {
    title: string;
    fullText: string;
    textWithBlanks: string;
    missingWords: string[];
}

// For library exercises
export interface LibraryDictationExercise extends DictationExercise {
    id: number;
    audioSrc: string;
}

export interface DictationTest {
    id: number;
    title: string;
    exercises: LibraryDictationExercise[];
}

export interface DictationPart {
    id: number;
    title: string;
    description: string;
    tests: DictationTest[];
}

// For Reading Practice
export interface ReadingQuestion {
    id: string; // e.g., '147'
    questionText: string;
    options: {
        A: string;
        B: string;
        C: string;
        D: string;
    };
    correctAnswer: QuestionOption;
}

export interface ReadingPassage {
    id: string;
    text: string;
    questions: ReadingQuestion[];
}

export interface ReadingTestData {
    id: number;
    title: string;
    part: number;
    passages: ReadingPassage[];
}

// For Vocabulary Review (SRS)
export interface VocabularyWord {
    id: string; // The word in lowercase
    word: string; // The original word casing
    definition: string;
    srsLevel: number; // 0-8, where 0 is new
    nextReviewDate: number; // timestamp
    lastReviewedDate: number | null; // timestamp
    sourceText?: string; // a sentence where the word was found
}

// For Pre-defined Vocabulary Lists
export interface VocabItem {
    word: string;
    definition: string;
    example: string;
}

export interface VocabularyTest {
    id: number;
    title: string;
    words: VocabItem[];
}

export interface VocabularyPart {
    id: number;
    title: string;
    description: string;
    tests: VocabularyTest[];
}