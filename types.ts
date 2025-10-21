






export interface User {
    username: string;
    password: string;
}

export interface UserSettings {
    name: string;
    email: string;
    scoreTarget: number | string;
    examDate: string;
    darkMode: boolean;
}

export enum AppState {
    PracticeHub = 'PRACTICE_HUB',
    DictationPracticeHome = 'DICTATION_PRACTICE_HOME',
    DictationPracticeSetup = 'DICTATION_PRACTICE_SETUP',
    DictationTest = 'DICTATION_TEST',
    ReadingPracticeHome = 'READING_PRACTICE_HOME',
    ReadingPracticeSetup = 'READING_PRACTICE_SETUP',
    ReadingTest = 'READING_TEST',
    GrammarHome = 'GRAMMAR_HOME',
    GrammarTopic = 'GRAMMAR_TOPIC',
    VocabularyHome = 'VOCABULARY_HOME',
    VocabularyPartHome = 'VOCABULARY_PART_HOME',
    VocabularyTest = 'VOCABULARY_TEST',
    SpeakingHome = 'SPEAKING_HOME',
    SpeakingPart1 = 'SPEAKING_PART_1',
    SpeakingPart2 = 'SPEAKING_PART_2',
    SpeakingPart3 = 'SPEAKING_PART_3',
    SpeakingPart4 = 'SPEAKING_PART_4',
    SpeakingPart5 = 'SPEAKING_PART_5',
    WritingPracticeHome = 'WRITING_PRACTICE_HOME',
    WritingPart1 = 'WRITING_PART_1',
    WritingPart2 = 'WRITING_PART_2',
    WritingPart3 = 'WRITING_PART_3',
    MyProgress = 'MY_PROGRESS',
    MiniTest = 'MINI_TEST',
    MiniTestResults = 'MINI_TEST_RESULTS',
    StudentManagement = 'STUDENT_MANAGEMENT',
    Settings = 'SETTINGS',
}

export type QuestionOption = 'A' | 'B' | 'C' | 'D';

// FIX: Add TestData and Question interfaces for the TOEIC Mini Test feature.
export interface Question {
    id: number | string;
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
    category: ProgressCategory;
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
    audioSrc?: string;
}

// FIX: Added missing DictationTest and DictationPart interfaces.
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

// For Listening & Translation
export interface TranslationEvaluationResult {
    score: number;
    feedback_vi: string;
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
    // FIX: Add optional explanation property to support questions that have an explanation.
    // This resolves type errors in `services/reading/reading2023/test1.ts` where questions
    // included an `explanation` field not present in this interface.
    explanation?: string;
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

// For Grammar
export interface GrammarTopicContent {
    title: string;
    explanation: string[]; // array of paragraphs
    examples: {
        sentence: string;
        translation: string;
    }[];
    interactiveExercise?: 'determiner_clicker';
    subTopics?: string[];
}

export interface GrammarQuestion {
    id: string;
    questionText: string;
    options: { A: string; B: string; C: string; D: string; };
    correctAnswer: 'A' | 'B' | 'C' | 'D';
    explanation: string;
}

export interface DeterminerExercise {
    paragraph: string;
    determiners: string[];
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

export interface ContextMeaningSentence {
    word: string;
    sentence: string;
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

// For Speaking Evaluation
export interface SpeakingPart1EvaluationResult {
    taskScore: number;
    estimatedScoreBand: string;
    proficiencyLevel: string;
    pronunciationFeedback: {
        summary: string;
        examples: string[];
    };
    intonationAndStressFeedback: {
        summary: string;
        examples: string[];
    };
}

export interface SpeakingPart2EvaluationResult {
    taskScore: number;
    estimatedScoreBand: string;
    proficiencyLevel: string;
    grammar: {
        english: string;
        vietnamese: string;
    };
    vocabulary: {
        english: string;
        vietnamese: string;
    };
    cohesion: {
        english: string;
        vietnamese: string;
    };
    delivery: {
        english: string;
        vietnamese: string;
    };
}

export interface SpeakingPart3Feedback {
    english: string;
    vietnamese: string;
}

export interface SpeakingPart3EvaluationResult {
    taskScore: number;
    estimatedScoreBand: string;
    proficiencyLevel: string;
    generalSummary: SpeakingPart3Feedback;
    grammarAndVocab: SpeakingPart3Feedback;
    fluencyAndCohesion: SpeakingPart3Feedback;
    pronunciation: SpeakingPart3Feedback;
    responseToQ7: SpeakingPart3Feedback;
}

export interface SpeakingPart4Task {
    documentTitle: string;
    documentContent: string; // Markdown formatted string
    question8: string;
    question9: string;
    question10: string;
}

export interface SpeakingPart4Feedback {
    english: string;
    vietnamese: string;
}

export interface SpeakingPart4EvaluationResult {
    taskScore: number;
    estimatedScoreBand: string;
    proficiencyLevel: string;
    generalSummary: SpeakingPart4Feedback;
    accuracy: SpeakingPart4Feedback;
    responseToQ10: SpeakingPart4Feedback;
    languageUse: SpeakingPart4Feedback;
    delivery: SpeakingPart4Feedback;
}

export interface SpeakingPart5Scenario {
    callerName: string;
    problem: string; // The text of the voicemail
}

export interface SpeakingPart5Feedback {
    english: string;
    vietnamese: string;
}

export interface SpeakingPart5EvaluationResult {
    taskScore: number; // 0-5
    estimatedScoreBand: string;
    proficiencyLevel: string;
    generalSummary: SpeakingPart5Feedback;
    solutionStructure: SpeakingPart5Feedback;
    languageUse: SpeakingPart5Feedback;
    fluencyAndCohesion: SpeakingPart5Feedback;
    intonationAndTone: SpeakingPart5Feedback;
}

// For Writing Evaluation
export interface WritingPart1Task {
    picture: string; // base64 image data URL
    keywords: [string, string];
}

export interface WritingPart1SingleEvaluation {
    score: number; // 0-3
    grammar: {
        english: string;
        vietnamese: string;
    };
    relevance: {
        english: string;
        vietnamese: string;
    };
}

export interface WritingPart1EvaluationResult {
    totalRawScore: number; // 0-15
    estimatedScoreBand: string; // "170-190"
    proficiencyLevel: string; // "Level 8"
    overallSummary: {
        english: string;
        vietnamese: string;
    };
    questionFeedback: WritingPart1SingleEvaluation[]; // Array of 5
}

// For Writing Part 2
export interface WritingPart2Request {
    title: string;
    requestText: string;
}

export interface WritingPart2Task {
    question6: WritingPart2Request;
    question7: WritingPart2Request;
}

export interface WritingPart2FeedbackDetail {
    english: string;
    vietnamese: string;
}

export interface WritingPart2SingleEvaluation {
    score: number; // 0-4
    requestSummary: string;
    completeness: WritingPart2FeedbackDetail;
    languageUse: WritingPart2FeedbackDetail;
    organization?: WritingPart2FeedbackDetail; // Optional for Q6
    tone?: WritingPart2FeedbackDetail; // Optional for Q6
}

export interface WritingPart2EvaluationResult {
    totalRawScore: number; // 0-8
    estimatedScoreBand: string; // e.g., "180-200"
    overallSummary: WritingPart2FeedbackDetail;
    question6Feedback: WritingPart2SingleEvaluation;
    question7Feedback: WritingPart2SingleEvaluation;
}

// For Writing Part 3
export interface WritingPart3Task {
    question: string;
}

export interface WritingPart3FeedbackDetail {
    english: string;
    vietnamese: string;
}

export interface WritingPart3EvaluationResult {
    taskScore: number; // 0-5
    estimatedScoreBand: string;
    overallSummary: WritingPart3FeedbackDetail;
    ideaDevelopment: WritingPart3FeedbackDetail;
    organization: WritingPart3FeedbackDetail;
    grammarAndSyntax: WritingPart3FeedbackDetail;
    vocabulary: WritingPart3FeedbackDetail;
}

// For user progress
export interface TestResult {
    id: string; // e.g., 'reading-part5-test1' or a timestamp
    title: string;
    score: number;
    total: number;
    date: number; // timestamp
}

export type ProgressCategory = 'miniTest' | 'reading' | 'grammar' | 'vocabulary' | 'dictation' | 'speaking' | 'writing';

export interface UserProgress {
    miniTest: TestResult[];
    reading: TestResult[];
    grammar: TestResult[];
    vocabulary: TestResult[];
    dictation: TestResult[];
    speaking: TestResult[];
    writing: TestResult[];
}

// --- Unified API Configuration ---
const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

// In a real-world scenario, this would be set by environment variables during the build process.
// For this simulation, we'll use the hostname to decide the correct API endpoint.
export const API_BASE_URL = isDevelopment 
    ? 'http://localhost:3001' // Assumes a local backend server for development
    : 'https://your-production-api-domain.com'; // **IMPORTANT**: Replace with your actual production API domain
