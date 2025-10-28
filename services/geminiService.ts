import { GoogleGenAI, Type } from "@google/genai";
import { 
    DictationExercise, 
    TestData, 
    SpeakingPart1EvaluationResult, 
    SpeakingPart2EvaluationResult, 
    SpeakingPart3EvaluationResult, 
    SpeakingPart4Task, 
    SpeakingPart4EvaluationResult, 
    SpeakingPart5Scenario, 
    SpeakingPart5EvaluationResult, 
    WritingPart1Task, 
    WritingPart1EvaluationResult, 
    WritingPart2Task, 
    WritingPart2EvaluationResult, 
    WritingPart3Task, 
    WritingPart3EvaluationResult, 
    DeterminerExercise,
    WrittenTranslationEvaluationResult,
    SpokenTranslationEvaluationResult,
    VocabItem,
    ContextMeaningSentence,
    PhoneticWord,
    SingleWordEvaluationResult
} from '../types';
import { getRandomVocabularyWords } from './vocabularyLibrary';
import { commonWords } from './pronunciationLibrary';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

// Interface for the structured response from the speaking evaluation AI
export interface SpeakingEvaluationResult {
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

const dictationSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING, description: 'A short, engaging title for the dictation exercise.' },
        fullText: { type: Type.STRING, description: 'A complete paragraph of about 3-5 sentences, suitable for intermediate English learners.' },
        textWithBlanks: { type: Type.STRING, description: "The same paragraph but with 5-7 key words replaced by '____'." },
        missingWords: {
            type: Type.ARRAY,
            description: 'An array of strings containing the words that were replaced by blanks, in the order they appear.',
            items: { type: Type.STRING }
        }
    },
    required: ['title', 'fullText', 'textWithBlanks', 'missingWords']
};

export const generateDictationExercise = async (): Promise<DictationExercise | null> => {
    try {
        const prompt = `
            You are an English teacher creating a dictation exercise. Generate one exercise in JSON format according to the provided schema.

            Instructions:
            1. Create a short, interesting title.
            2. Write a paragraph of 3-5 sentences on a common topic (e.g., travel, technology, daily life). The language should be clear and at an intermediate level.
            3. From that paragraph, create a version where you replace 5 to 7 important words (nouns, verbs, adjectives) with '____'.
            4. Create a list of the missing words in the exact order they appear in the paragraph.
            5. Ensure the number of '____' placeholders in 'textWithBlanks' exactly matches the number of words in the 'missingWords' array.
        `;
        
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: dictationSchema,
            },
        });

        const jsonStr = response.text.trim();
        const data = JSON.parse(jsonStr);

        if (data && data.fullText && data.missingWords && data.missingWords.length > 0) {
            return data as DictationExercise;
        }
        return null;
    } catch (error) {
        console.error("Error generating dictation exercise:", error);
        throw new Error("Failed to generate dictation from API.");
    }
};

export const generateDictationFromUserInput = async (topic: string): Promise<DictationExercise | null> => {
    try {
        const prompt = `
            You are an English teacher creating a dictation exercise based on a user's topic.
            The topic is: "${topic}".
            Generate a short, original text of about 100-150 words related to this topic.
            The language should be clear and at an intermediate level, suitable for a dictation exercise.
            Based on this text, generate the exercise in JSON format according to the provided schema.

            Instructions:
            1. Create a short, engaging title related to the topic.
            2. Write the full text (100-150 words).
            3. Create a version of the text with 15-20% of the important words (nouns, verbs, adjectives) replaced by '____'.
            4. Create a list of the missing words in the exact order they appear.
            5. Ensure the number of '____' placeholders exactly matches the number of words in the 'missingWords' array.
        `;
        
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: dictationSchema,
            },
        });

        const jsonStr = response.text.trim();
        const data = JSON.parse(jsonStr);

        if (data && data.fullText && data.missingWords && data.missingWords.length > 0) {
            return data as DictationExercise;
        }
        return null;
    } catch (error) {
        console.error("Error generating custom dictation exercise:", error);
        throw new Error("Failed to generate custom dictation from API.");
    }
};

const grammarTestSchema = {
    type: Type.OBJECT,
    properties: {
        testTitle: { type: Type.STRING, description: 'A creative title for this mini-test, e.g., "TOEIC Mini-Test: Business Scenarios".' },
        duration: { type: Type.INTEGER, description: 'The total test duration in seconds. Assume 75 seconds per question.' },
        category: { type: Type.STRING, description: "The category of the test. Use 'miniTest' for TOEIC tests or 'grammar' for grammar quizzes." },
        questions: {
            type: Type.ARRAY,
            description: 'An array of question objects.',
            items: {
                type: Type.OBJECT,
                properties: {
                    id: { type: Type.INTEGER, description: 'A unique integer ID for the question, starting from 101.' },
                    part: { type: Type.INTEGER, description: 'The TOEIC part number (e.g., 1, 2, 5, 6, 7).' },
                    questionText: { type: Type.STRING, description: 'The main text of the question. For fill-in-the-blanks, use "____".' },
                    options: {
                        type: Type.OBJECT,
                        properties: {
                            A: { type: Type.STRING },
                            B: { type: Type.STRING },
                            C: { type: Type.STRING },
                            D: { type: Type.STRING },
                        },
                        required: ['A', 'B', 'C', 'D']
                    },
                    correctAnswer: { type: Type.STRING, description: "The correct option key ('A', 'B', 'C', or 'D')." },
                    explanation: { type: Type.STRING, description: 'A brief explanation of why the correct answer is right.' },
                },
                required: ['id', 'part', 'questionText', 'options', 'correctAnswer', 'explanation']
            }
        }
    },
    required: ['testTitle', 'duration', 'category', 'questions']
};

export const generateTOEICMiniTest = async (): Promise<TestData | null> => {
    try {
        const prompt = `
            You are an expert TOEIC test creator. Generate a mini-test in JSON format according to the provided schema.

            Instructions:
            1.  Create a test with exactly 10 multiple-choice questions.
            2.  The questions must be original and should be similar to TOEIC Part 5 (Incomplete Sentences), testing a mix of grammar and vocabulary.
            3.  The questions must be contextual sentences with a blank (____).
            4.  For each question, provide a unique integer ID, starting from 101.
            5.  For the 'part' property of each question, use the number 5.
            6.  Ensure all fields in the schema are filled correctly.
            7.  Provide a clear and concise explanation for each correct answer.
            8.  Set the 'testTitle' to "AI-Generated TOEIC Mini-Test".
            9.  Set the 'duration' to 750 seconds (10 questions * 75 seconds).
            10. Set the 'category' field to "miniTest".
        `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: grammarTestSchema,
            },
        });

        const jsonStr = response.text.trim();
        const data = JSON.parse(jsonStr);

        if (data && data.questions && data.questions.length > 0) {
            return data as TestData;
        }
        return null;
    } catch (error) {
        console.error("Error generating TOEIC mini-test:", error);
        throw new Error("Failed to generate mini-test from API.");
    }
};


export const generateRandomGrammarQuiz = async (): Promise<TestData | null> => {
    const grammarTopics = [
        "Nouns & Noun Phrases",
        "Verbs (Tenses, Voice, Mood)",
        "Adjectives",
        "Adverbs",
        "Prepositions & Conjunctions",
        "Determiners",
        "Pronouns",
        "Relative Clauses",
        "Noun Clauses",
        "Inversions",
        "Comparisons",
        "Conditionals"
    ];

    try {
        const prompt = `
            You are an expert English grammar teacher creating a quiz for TOEIC students. Generate a random grammar quiz in JSON format according to the provided schema.

            Instructions:
            1.  Create a test with exactly 20 multiple-choice questions.
            2.  The questions must be original and should NOT be simple definitions. They must be contextual sentences with a blank, testing the student's ability to choose the correct grammatical form.
            3.  The questions must cover a wide and random variety of grammar topics relevant to the TOEIC test, such as: ${grammarTopics.join(', ')}.
            4.  For each question, provide a unique integer ID, starting from 1.
            5.  For the 'part' property of each question, use the number 5.
            6.  Ensure all fields in the schema are filled correctly.
            7.  Provide a clear and concise explanation for each correct answer, explaining the grammar rule.
            8.  Set the 'testTitle' to "Random Grammar Review Quiz".
            9.  Set the 'duration' to 1500 seconds (20 questions * 75 seconds).
            10. Set the 'category' field to "grammar".
        `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: grammarTestSchema,
            },
        });

        const jsonStr = response.text.trim();
        const data = JSON.parse(jsonStr);

        if (data && data.questions && data.questions.length === 20) {
            return data as TestData;
        }
        return null;
    } catch (error) {
        console.error("Error generating random grammar quiz:", error);
        throw new Error("Failed to generate grammar quiz from API.");
    }
};

const determinerExerciseSchema = {
    type: Type.OBJECT,
    properties: {
        paragraph: { type: Type.STRING, description: "A short English paragraph of about 50-70 words on a simple, common topic." },
        determiners: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "An array of all the determiner words found in the paragraph, in lowercase."
        }
    },
    required: ['paragraph', 'determiners']
};


export const generateDeterminerExercise = async (): Promise<DeterminerExercise | null> => {
    try {
        const prompt = `Generate a short English paragraph (about 50-70 words) on a simple topic like daily routines, hobbies, or work. Identify ALL determiners in the paragraph. Determiners include articles (a, an, the), demonstratives (this, that, these, those), possessives (my, your, his, her, its, our, their), quantifiers (some, any, many, few, several, all), and numbers (one, two). Return a JSON object with two keys: "paragraph" containing the text, and "determiners" containing an array of all the identified determiner words in lowercase.`;
        
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: determinerExerciseSchema,
            },
        });

        const jsonStr = response.text.trim();
        const data = JSON.parse(jsonStr);

        if (data && data.paragraph && Array.isArray(data.determiners)) {
            data.determiners = [...new Set(data.determiners)];
            return data as DeterminerExercise;
        }
        return null;
    } catch (error) {
        console.error("Error generating determiner exercise:", error);
        throw new Error("Failed to generate exercise from API.");
    }
};

const writtenTranslationEvaluationSchema = {
    type: Type.OBJECT,
    properties: {
        score: { 
            type: Type.INTEGER,
            description: "A score from 0 to 100 evaluating the translation's accuracy, grammar, and naturalness. 100 is a perfect translation."
        },
        feedback_vi: { 
            type: Type.STRING,
            description: "Concise feedback in Vietnamese explaining what is good about the translation and what could be improved. Mention grammar, vocabulary choice, and natural phrasing."
        }
    },
    required: ['score', 'feedback_vi']
};

export const evaluateWrittenTranslation = async (originalSentence: string, userTranslation: string): Promise<WrittenTranslationEvaluationResult | null> => {
    try {
        const prompt = `
            You are an expert English to Vietnamese translator and teacher.
            The user was given the following English sentence to translate: "${originalSentence}"
            The user provided this Vietnamese translation: "${userTranslation}"

            Please evaluate the user's translation.
            1.  Assign a score from 0 to 100 based on accuracy, grammar, and naturalness.
            2.  Provide brief, constructive feedback in Vietnamese. Point out strengths and areas for improvement.

            Return the evaluation in JSON format according to the schema.
        `;
        
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: writtenTranslationEvaluationSchema,
            },
        });

        const jsonStr = response.text.trim();
        const data = JSON.parse(jsonStr);

        if (data && typeof data.score === 'number' && typeof data.feedback_vi === 'string') {
            return data as WrittenTranslationEvaluationResult;
        }
        return null;
    } catch (error) {
        console.error("Error evaluating translation:", error);
        throw new Error("Failed to get translation evaluation from API.");
    }
};

export const generateSentenceForTranslation = async (vocabList?: VocabItem[]): Promise<string | null> => {
    try {
        let vocabPrompt = '';
        if (vocabList && vocabList.length > 0) {
            const words = vocabList.map(v => v.word).join(', ');
            vocabPrompt = `The sentence MUST include at least one of the following words: ${words}.`;
        }

        const prompt = `
            You are an English teacher creating a practice sentence for an intermediate-level student to translate into Vietnamese.
            Generate a single, clear, and natural-sounding English sentence.
            The sentence should be between 10 and 20 words long.
            The topic should be about business, daily life, or technology.
            ${vocabPrompt}
            Provide only the sentence itself, without any quotation marks or introductory phrases.
        `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        const text = response.text.trim();
        return text || null;

    } catch (error) {
        console.error("Error generating sentence for translation:", error);
        throw new Error("Failed to generate sentence from API.");
    }
};

const contextSentencesSchema = {
    type: Type.ARRAY,
    description: "An array of objects, each containing a word and a sentence that provides context for that word.",
    items: {
        type: Type.OBJECT,
        properties: {
            word: { type: Type.STRING, description: "The vocabulary word." },
            sentence: { type: Type.STRING, description: "A sentence where the vocabulary word is used and bolded with markdown (e.g., **word**). The context of the sentence should make the meaning of the word clear." }
        },
        required: ['word', 'sentence']
    }
};

export const generateContextSentences = async (vocabList: VocabItem[]): Promise<ContextMeaningSentence[] | null> => {
    try {
        const words = vocabList.map(v => `"${v.word}" (meaning: ${v.definition})`).join(', ');
        const prompt = `
            You are an English teacher creating a vocabulary exercise. For each of the following words, create a clear, context-rich sentence that helps an intermediate English learner guess the meaning of the word.
            The vocabulary words are: ${words}.

            Instructions:
            1. For each word, write one unique sentence.
            2. In each sentence, the vocabulary word MUST be bolded using markdown (e.g., "The phone is **ubiquitous**.").
            3. The context of the sentence should strongly hint at the word's meaning. For example, for "ubiquitous", a good sentence is "From city streets to remote villages, the **ubiquitous** smartphone can now be seen everywhere."
            4. Return the result as a JSON array of objects, where each object has a "word" and a "sentence" key, according to the provided schema. Ensure you generate a sentence for every word provided.
        `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: contextSentencesSchema,
            },
        });

        const jsonStr = response.text.trim();
        const data = JSON.parse(jsonStr);

        if (Array.isArray(data) && data.length > 0 && data[0].sentence) {
            return data as ContextMeaningSentence[];
        }
        return null;
    } catch (error) {
        console.error("Error generating context sentences:", error);
        throw new Error("Failed to generate context sentences from API.");
    }
};

export const getWordDefinition = async (word: string, contextSentence: string = ''): Promise<string | null> => {
    try {
        const prompt = `
            Provide a simple, clear definition for the English word "${word}". 
            If a context sentence is provided, use it to determine the most relevant definition.
            Context sentence: "${contextSentence}"
            
            The definition should be concise and easy for an intermediate English learner to understand. 
            Do not include the word itself in the definition.
            Provide only the definition as a single string, without any introductory phrases like "The definition is:".
        `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        const definition = response.text.trim();
        return definition || null;

    } catch (error) {
        console.error(`Error generating definition for "${word}":`, error);
        return "Could not retrieve definition at this time.";
    }
};

export const generateSpokenTranslationText = async (vocabList: VocabItem[]): Promise<string | null> => {
    try {
        const words = vocabList.map(v => v.word).join(', ');
        const prompt = `
            You are an English teacher creating a practice exercise for a "Spoken Translation" task from English to Vietnamese.
            Generate a short, cohesive English paragraph with a context similar to what is found in TOEIC Reading Part 7 (e.g., an email, a notice, an advertisement, a memo).
            
            Constraints:
            1.  The paragraph MUST be between 40 and 70 words long.
            2.  The paragraph's vocabulary MUST heavily prioritize words from the following list: ${words}.
            3.  You MUST use at least 3-5 words from the provided list.
            4.  AVOID using difficult or obscure English words that are NOT in the provided list. The exercise must be at an appropriate level for an intermediate learner familiar with these words.
            5.  Return ONLY the generated English paragraph as a plain string, without any title, introduction, or quotation marks.
        `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        const text = response.text.trim();
        return text || null;

    } catch (error) {
        console.error("Error generating spoken translation text:", error);
        throw new Error("Failed to generate text from API.");
    }
};

export const transcribeVietnameseAudio = async (audioBase64: string, mimeType: string): Promise<string | null> => {
    try {
        const prompt = "Transcribe the following audio recording from Vietnamese into Vietnamese text. Provide only the transcription.";
        
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: {
                parts: [
                    { text: prompt },
                    { inlineData: { mimeType: mimeType, data: audioBase64 } }
                ]
            },
        });
        
        if (response && response.text) {
            const transcription = response.text.trim();
            return transcription || null;
        }
        console.error("Error transcribing audio: API response did not contain text.");
        return null;
    } catch (error) {
        console.error("Error transcribing audio:", error);
        throw new Error("Failed to get transcription from API.");
    }
};

// FIX: Update schema to include `feedback_vi` to provide feedback for spoken translations.
const spokenTranslationEvaluationSchema = {
    type: Type.OBJECT,
    properties: {
        estimated_accuracy_percent: {
            type: Type.NUMBER,
            description: "A numerical estimation (0-100) of how well the user's Vietnamese translation conveyed the meaning and intent of the original English text. This is not a formal score, but an estimate of semantic accuracy."
        },
        feedback_vi: { 
            type: Type.STRING,
            description: "Brief, constructive feedback in Vietnamese on the spoken translation. Focus on how well the meaning was conveyed and suggest improvements in phrasing or vocabulary choice."
        }
    },
    required: ['estimated_accuracy_percent', 'feedback_vi']
};

export const evaluateSpokenTranslation = async (originalText: string, translatedText: string): Promise<SpokenTranslationEvaluationResult | null> => {
     try {
        // FIX: Update system instruction to request feedback in addition to a score.
        const systemInstruction = `
            You are an expert AI evaluator for English to Vietnamese interpretation exercises. Your task is to compare an original English text with a user's spoken translation (provided as transcribed text) and evaluate how well the user conveyed the original meaning and intent.
            
            Do NOT evaluate based on a literal, word-for-word translation. Focus on semantic equivalence.
            - High accuracy means the core message, key details, and tone are correctly conveyed.
            - Lower accuracy means key information was missed, misinterpreted, or significant parts were omitted.
            
            Provide both a score and brief, constructive feedback in Vietnamese.
            Your response MUST be a JSON object that adheres to the provided schema. Do not add any extra text or explanations.
        `;

        // FIX: Update prompt to explicitly request `feedback_vi`.
        const prompt = `
            Original English Text: "${originalText}"
            
            User's Transcribed Vietnamese Translation: "${translatedText}"
            
            Please evaluate the user's translation and provide the JSON output with 'estimated_accuracy_percent' and 'feedback_vi'.
        `;
        
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: spokenTranslationEvaluationSchema,
            },
        });

        const jsonStr = response.text.trim();
        const data = JSON.parse(jsonStr);

        // FIX: Update result validation to check for `feedback_vi` property.
        if (data && typeof data.estimated_accuracy_percent === 'number' && typeof data.feedback_vi === 'string') {
            return data as SpokenTranslationEvaluationResult;
        }
        return null;

    } catch (error) {
        console.error("Error evaluating spoken translation:", error);
        throw new Error("Failed to get translation evaluation from API.");
    }
};


const speakingEvaluationSchema = {
    type: Type.OBJECT,
    properties: {
        taskScore: { type: Type.INTEGER, description: "The raw score from 0 to 3." },
        estimatedScoreBand: { type: Type.STRING, description: "The estimated TOEIC Scale Score Range (e.g., '160-180')." },
        proficiencyLevel: { type: Type.STRING, description: "The corresponding TOEIC Proficiency Level (e.g., 'Level 7')." },
        pronunciationFeedback: {
            type: Type.OBJECT,
            properties: {
                summary: { type: Type.STRING, description: "A summary of strengths and weaknesses for Pronunciation." },
                examples: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Specific examples of words/phrases with accurate or inaccurate pronunciation." }
            },
            required: ['summary', 'examples']
        },
        intonationAndStressFeedback: {
            type: Type.OBJECT,
            properties: {
                summary: { type: Type.STRING, description: "A summary of strengths and weaknesses for Intonation and Stress." },
                examples: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Specific examples of words/phrases with accurate or inaccurate intonation/stress." }
            },
            required: ['summary', 'examples']
        }
    },
    required: ['taskScore', 'estimatedScoreBand', 'proficiencyLevel', 'pronunciationFeedback', 'intonationAndStressFeedback']
};


export const evaluateSpeakingPart1 = async (textToRead: string, audioBase64: string, mimeType: string): Promise<SpeakingPart1EvaluationResult | null> => {
    try {
        const systemInstruction = `You are a certified rater for the TOEIC Speaking Test, specializing in "Part 1: Read a Text Aloud". Your task is to evaluate a user's spoken audio based on the provided text. You will receive the original text and the user's audio recording.

Your evaluation must focus *exclusively* on these two criteria:
1.  **Pronunciation:** Clarity, intelligibility, and accuracy of individual words and sounds.
2.  **Intonation and Stress:** Appropriate use of pitch, emphasis (stress), and pausing to convey meaning (e.g., rising and falling pitch).

Based on your evaluation, you must provide a structured JSON response.

**Step 1: Assign a Task Score (0-3 Scale)**
Rate the performance based on the degree of intelligibility and effectiveness:
- **3 (Highest):** Speech is highly intelligible. Pronunciation and intonation/stress are highly effective.
- **2 (Medium):** Speech is generally intelligible with some lapses. Intonation and stress are generally effective.
- **1 (Low):** Speech is not generally intelligible. Use of intonation and stress is generally not effective.
- **0:** No intelligible speech or no attempt.

**Step 2: Estimate Overall Score Band and Proficiency Level**
Use the Task Score from Step 1 and the detailed rubric below to estimate an overall TOEIC Speaking Scale Score and Proficiency Level. Your estimation should reflect how a performance on this single task might correlate to an overall proficiency.

- **Level 8 (190-200):** Pronunciation, intonation, and stress are at all times highly intelligible. (Correlates with a strong Task Score of 3).
- **Level 7 (160-180):** When reading aloud, test takers are highly intelligible. (Correlates with a solid Task Score of 3).
- **Level 6 (130-150):** When reading aloud, test takers are intelligible. (Correlates with a strong Task Score of 2).
- **Level 5 (110-120):** When reading aloud, test takers are generally intelligible. (Correlates with a standard Task Score of 2).
- **Level 4 (80-100):** When reading aloud, test takers vary in intelligibility. (Correlates with a Task Score of 1).
- **Level 3 (60-70):** When reading aloud, speakers may be difficult to understand. (Correlates with a low Task Score of 1).
- **Levels 1-2 (0-50):** Correlates with a Task Score of 0.

**Step 3: Provide Detailed Feedback**
- For **Pronunciation**, provide a summary of strengths and weaknesses. Include specific examples of words or phrases that were pronounced well or poorly.
- For **Intonation and Stress**, provide a summary of strengths and weaknesses. Include specific examples of where stress or pausing was effective or ineffective.

Your final output must be a JSON object adhering to the provided schema. Do not add any extra text or explanations outside the JSON structure.
`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: {
                parts: [
                    { text: `Evaluate my speech. Here is the text I was supposed to read: "${textToRead}"` },
                    { inlineData: { mimeType: mimeType, data: audioBase64 } }
                ]
            },
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: speakingEvaluationSchema,
            },
        });

        const jsonStr = response.text.trim();
        const data = JSON.parse(jsonStr);

        if (data && typeof data.taskScore === 'number') {
            return data as SpeakingPart1EvaluationResult;
        }

        return null;

    } catch (error) {
        console.error("Error evaluating speaking performance:", error);
        throw new Error("Failed to get evaluation from API.");
    }
}

export const generateSpeakingPart1Text = async (): Promise<string | null> => {
    try {
        const prompt = `
            Generate a short text suitable for a TOEIC Speaking Test Part 1 (Read a Text Aloud) practice.
            The text should be between 40 and 60 words.
            It should be a formal announcement, like a weather forecast, a news report, or a radio advertisement.
            Provide only the text itself, without any quotation marks or introductory phrases.
        `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        const text = response.text.trim();
        return text || null;

    } catch (error) {
        console.error("Error generating speaking part 1 text:", error);
        throw new Error("Failed to generate text from API.");
    }
};

export const generateImageForSpeakingPart2 = async (): Promise<string | null> => {
    try {
        const prompt = "Generate a realistic photograph suitable for a TOEIC Speaking Test Part 2 (Describe a picture). The image should depict a common scene, like an office, a park, a street market, a restaurant, or people interacting in a public space. It should have several details to describe.";
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [{ text: prompt }],
            },
            config: {
                responseModalities: ['IMAGE'],
            },
        });

        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                const base64ImageBytes: string = part.inlineData.data;
                return `data:image/png;base64,${base64ImageBytes}`;
            }
        }

        return null;
    } catch (error) {
        console.error("Error generating image for speaking part 2:", error);
        throw new Error("Failed to generate image from API.");
    }
};

const speakingPart2EvaluationSchema = {
    type: Type.OBJECT,
    properties: {
        taskScore: { type: Type.INTEGER, description: "The raw score from 0 to 3 for relevance, accuracy, and detail in describing the picture." },
        estimatedScoreBand: { type: Type.STRING, description: "The estimated TOEIC Scale Score Range (e.g., '160-180')." },
        proficiencyLevel: { type: Type.STRING, description: "The corresponding TOEIC Proficiency Level (e.g., 'Level 7')." },
        grammar: {
            type: Type.OBJECT,
            properties: {
                english: { type: Type.STRING, description: "Feedback on grammar in English." },
                vietnamese: { type: Type.STRING, description: "Feedback on grammar in Vietnamese." }
            },
            required: ['english', 'vietnamese']
        },
        vocabulary: {
            type: Type.OBJECT,
            properties: {
                english: { type: Type.STRING, description: "Feedback on vocabulary in English." },
                vietnamese: { type: Type.STRING, description: "Feedback on vocabulary in Vietnamese." }
            },
            required: ['english', 'vietnamese']
        },
        cohesion: {
            type: Type.OBJECT,
            properties: {
                english: { type: Type.STRING, description: "Feedback on cohesion in English." },
                vietnamese: { type: Type.STRING, description: "Feedback on cohesion in Vietnamese." }
            },
            required: ['english', 'vietnamese']
        },
        delivery: {
            type: Type.OBJECT,
            properties: {
                english: { type: Type.STRING, description: "Feedback on delivery (pronunciation, intonation, fluency) in English." },
                vietnamese: { type: Type.STRING, description: "Feedback on delivery in Vietnamese." }
            },
            required: ['english', 'vietnamese']
        }
    },
    required: ['taskScore', 'estimatedScoreBand', 'proficiencyLevel', 'grammar', 'vocabulary', 'cohesion', 'delivery']
};

export const evaluateSpeakingPart2 = async (audioBase64: string, mimeType: string): Promise<SpeakingPart2EvaluationResult | null> => {
    try {
        const systemInstruction = `You are a certified rater for the TOEIC Speaking Test, specializing in "Part 2: Describe a Picture". Evaluate the user's spoken audio description. The user was shown a picture and had 30 seconds to describe it.

Your evaluation must focus on:
1.  **Relevance and Accuracy:** How well the description relates to a typical picture scene.
2.  **Grammar and Vocabulary:** Correctness and range of grammar and vocabulary.
3.  **Cohesion:** How well the ideas are connected.
4.  **Delivery:** Pronunciation, intonation, and fluency.

Provide a structured JSON response in both English and Vietnamese.

**Step 1: Assign a Task Score (0-3 Scale)**
- **3:** Highly intelligible, relevant, and detailed description.
- **2:** Generally intelligible, relevant description with some inaccuracies or lack of detail.
- **1:** Mostly unintelligible, irrelevant, or very limited description.
- **0:** No intelligible speech.

**Step 2: Estimate Score Band and Proficiency Level** based on the 0-3 score.

**Step 3: Provide Detailed Feedback** in English and Vietnamese for Grammar, Vocabulary, Cohesion, and Delivery. Feedback should be constructive.

Your final output must be a JSON object adhering to the provided schema. Do not add any extra text or explanations outside the JSON structure.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: {
                parts: [
                    { text: `Evaluate my spoken description of a picture.` },
                    { inlineData: { mimeType: mimeType, data: audioBase64 } }
                ]
            },
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: speakingPart2EvaluationSchema,
            },
        });

        const jsonStr = response.text.trim();
        const data = JSON.parse(jsonStr);

        if (data && typeof data.taskScore === 'number') {
            return data as SpeakingPart2EvaluationResult;
        }
        return null;

    } catch (error) {
        console.error("Error evaluating speaking part 2 performance:", error);
        throw new Error("Failed to get evaluation from API.");
    }
};

const speakingPart3QuestionsSchema = {
    type: Type.OBJECT,
    properties: {
        topic: { type: Type.STRING, description: "A familiar topic for the questions, e.g., 'Shopping for clothes'." },
        question5: { type: Type.STRING, description: "Question 5 (simple 'wh-' question)." },
        question6: { type: Type.STRING, description: "Question 6 (simple 'wh-' question related to Q5)." },
        question7: { type: Type.STRING, description: "Question 7 (more complex, asks for opinion/preference)." }
    },
    required: ['topic', 'question5', 'question6', 'question7']
};

export const generateSpeakingPart3Questions = async (): Promise<{ topic: string; question5: string; question6: string; question7: string; } | null> => {
    try {
        const prompt = `Generate a set of questions for TOEIC Speaking Test Part 3 (Respond to Questions).
        The questions should be about a single, familiar topic (like hobbies, work, shopping, travel).
        Provide a topic, Question 5, Question 6, and Question 7.
        - Q5 and Q6 should be simple 'wh-' questions.
        - Q7 should be a more complex question asking for an opinion, preference, or description.
        Return the result in JSON format according to the schema.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: speakingPart3QuestionsSchema,
            },
        });

        const jsonStr = response.text.trim();
        const data = JSON.parse(jsonStr);

        if (data && data.topic && data.question5) {
            return data;
        }
        return null;
    } catch (error) {
        console.error("Error generating speaking part 3 questions:", error);
        throw new Error("Failed to generate questions from API.");
    }
};

const speakingPart3EvaluationSchema = {
    type: Type.OBJECT,
    properties: {
        taskScore: { type: Type.INTEGER, description: "The raw score from 0 to 5." },
        estimatedScoreBand: { type: Type.STRING, description: "The estimated TOEIC Scale Score Range (e.g., '160-180')." },
        proficiencyLevel: { type: Type.STRING, description: "The corresponding TOEIC Proficiency Level (e.g., 'Level 7')." },
        generalSummary: {
            type: Type.OBJECT,
            properties: {
                english: { type: Type.STRING },
                vietnamese: { type: Type.STRING }
            },
            required: ['english', 'vietnamese']
        },
        grammarAndVocab: {
            type: Type.OBJECT,
            properties: {
                english: { type: Type.STRING },
                vietnamese: { type: Type.STRING }
            },
            required: ['english', 'vietnamese']
        },
        fluencyAndCohesion: {
            type: Type.OBJECT,
            properties: {
                english: { type: Type.STRING },
                vietnamese: { type: Type.STRING }
            },
            required: ['english', 'vietnamese']
        },
        pronunciation: {
            type: Type.OBJECT,
            properties: {
                english: { type: Type.STRING },
                vietnamese: { type: Type.STRING }
            },
            required: ['english', 'vietnamese']
        },
        responseToQ7: {
            type: Type.OBJECT,
            properties: {
                english: { type: Type.STRING, description: "Specific feedback on the more developed response to Question 7." },
                vietnamese: { type: Type.STRING }
            },
            required: ['english', 'vietnamese']
        }
    },
    required: ['taskScore', 'estimatedScoreBand', 'proficiencyLevel', 'generalSummary', 'grammarAndVocab', 'fluencyAndCohesion', 'pronunciation', 'responseToQ7']
};

export const evaluateSpeakingPart3 = async (
    questions: { topic: string; question5: string; question6: string; question7: string; },
    audioBase64: (string | null)[],
    mimeTypes: string[]
): Promise<SpeakingPart3EvaluationResult | null> => {
    try {
        const systemInstruction = `You are a certified rater for the TOEIC Speaking Test, specializing in "Part 3: Respond to Questions". Evaluate the user's three spoken audio responses to the provided questions.

Your evaluation must focus on pronunciation, intonation, stress, grammar, vocabulary, and cohesion. Pay special attention to the relevance and development of the answers.

Provide a structured JSON response in both English and Vietnamese.

**Step 1: Assign a Task Score (0-5 Scale)**
- **5:** Responses are highly intelligible and sustained. They are relevant and convey the required information.
- **3:** Responses are generally intelligible. They are mostly relevant, but with some inaccuracies or limitations.
- **1:** Responses are mostly unintelligible and/or irrelevant.
- **0:** No intelligible speech.

**Step 2: Estimate Score Band and Proficiency Level.**

**Step 3: Provide Detailed Feedback** in English and Vietnamese for different criteria, with specific feedback for the more complex response to Question 7.

Your final output must be a JSON object adhering to the provided schema.`;

        const parts: any[] = [
            { text: `Evaluate my three spoken responses. The topic was "${questions.topic}".
            Question 5: "${questions.question5}"
            Question 6: "${questions.question6}"
            Question 7: "${questions.question7}"` }
        ];

        if (audioBase64[0]) {
            parts.push({ text: "Audio for Question 5:" });
            parts.push({ inlineData: { mimeType: mimeTypes[0], data: audioBase64[0] } });
        }
        if (audioBase64[1]) {
            parts.push({ text: "Audio for Question 6:" });
            parts.push({ inlineData: { mimeType: mimeTypes[1], data: audioBase64[1] } });
        }
        if (audioBase64[2]) {
            parts.push({ text: "Audio for Question 7:" });
            parts.push({ inlineData: { mimeType: mimeTypes[2], data: audioBase64[2] } });
        }

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: { parts },
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: speakingPart3EvaluationSchema,
            },
        });
        
        const jsonStr = response.text.trim();
        const data = JSON.parse(jsonStr);

        if (data && typeof data.taskScore === 'number') {
            return data as SpeakingPart3EvaluationResult;
        }
        return null;
    } catch (error) {
        console.error("Error evaluating speaking part 3 performance:", error);
        throw new Error("Failed to get evaluation from API.");
    }
};

const speakingPart4TaskSchema = {
    type: Type.OBJECT,
    properties: {
        documentTitle: { type: Type.STRING, description: "The title of the provided document (e.g., 'Conference Schedule')." },
        documentContent: { type: Type.STRING, description: "The text content of the document, formatted as a markdown string. This should resemble a schedule, agenda, or similar informational document." },
        question8: { type: Type.STRING, description: "Question 8, which can be answered directly from the text." },
        question9: { type: Type.STRING, description: "Question 9, which can be answered directly from the text." },
        question10: { type: Type.STRING, description: "Question 10, which requires summarizing or combining information from the text." }
    },
    required: ['documentTitle', 'documentContent', 'question8', 'question9', 'question10']
};

export const generateSpeakingPart4Task = async (): Promise<SpeakingPart4Task | null> => {
    try {
        const prompt = `Generate a task for TOEIC Speaking Test Part 4 (Respond to questions using provided information).
        Create a realistic informational document (like an agenda, schedule, or notice) and three related questions.
        - The document should have a title and text content. Use markdown for simple formatting.
        - Questions 8 and 9 should be simple information-retrieval questions.
        - Question 10 should require the test-taker to summarize or combine information from the document.
        Return the result in JSON format according to the schema.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: speakingPart4TaskSchema,
            },
        });
        const jsonStr = response.text.trim();
        const data = JSON.parse(jsonStr);

        if (data && data.documentTitle) {
            return data as SpeakingPart4Task;
        }
        return null;
    } catch (error) {
        console.error("Error generating speaking part 4 task:", error);
        throw new Error("Failed to generate task from API.");
    }
};

const speakingPart4EvaluationSchema = {
    type: Type.OBJECT,
    properties: {
        taskScore: { type: Type.INTEGER, description: "The raw score from 0 to 5." },
        estimatedScoreBand: { type: Type.STRING, description: "The estimated TOEIC Scale Score Range." },
        proficiencyLevel: { type: Type.STRING, description: "The corresponding TOEIC Proficiency Level." },
        generalSummary: { type: Type.OBJECT, properties: { english: { type: Type.STRING }, vietnamese: { type: Type.STRING } }, required: ['english', 'vietnamese'] },
        accuracy: { type: Type.OBJECT, properties: { english: { type: Type.STRING, description: "Feedback on the accuracy of information provided for Q8 and Q9." }, vietnamese: { type: Type.STRING } }, required: ['english', 'vietnamese'] },
        responseToQ10: { type: Type.OBJECT, properties: { english: { type: Type.STRING, description: "Specific feedback on the summarized response to Question 10." }, vietnamese: { type: Type.STRING } }, required: ['english', 'vietnamese'] },
        languageUse: { type: Type.OBJECT, properties: { english: { type: Type.STRING }, vietnamese: { type: Type.STRING } }, required: ['english', 'vietnamese'] },
        delivery: { type: Type.OBJECT, properties: { english: { type: Type.STRING }, vietnamese: { type: Type.STRING } }, required: ['english', 'vietnamese'] }
    },
    required: ['taskScore', 'estimatedScoreBand', 'proficiencyLevel', 'generalSummary', 'accuracy', 'responseToQ10', 'languageUse', 'delivery']
};

export const evaluateSpeakingPart4 = async (
    task: SpeakingPart4Task,
    audioBase64: (string | null)[],
    mimeTypes: string[]
): Promise<SpeakingPart4EvaluationResult | null> => {
    try {
        const systemInstruction = `You are a certified rater for the TOEIC Speaking Test, "Part 4: Respond to Questions using Provided Information". Evaluate three spoken audio responses based on a provided document and questions.

Your evaluation must focus on accuracy of information, pronunciation, intonation, stress, grammar, and vocabulary.

Provide a structured JSON response in English and Vietnamese.

**Step 1: Assign a Task Score (0-5 Scale)**
- **5:** Responses are highly intelligible and accurately convey all requested information.
- **3:** Responses are generally intelligible and convey most information, with some inaccuracies.
- **1:** Responses are mostly unintelligible or inaccurate.
- **0:** No intelligible speech.

**Step 2 & 3: Estimate Score Band, Proficiency Level, and provide detailed feedback** on accuracy (especially for Q10's summary), language use, and delivery.

Your final output must be a JSON object adhering to the schema.`;

        const parts: any[] = [
            { text: `Evaluate my three spoken responses based on this document and questions.
            Document Title: "${task.documentTitle}"
            Document Content: "${task.documentContent}"
            Question 8: "${task.question8}"
            Question 9: "${task.question9}"
            Question 10: "${task.question10}"` }
        ];

        if (audioBase64[0]) {
            parts.push({ text: "Audio for Question 8:" });
            parts.push({ inlineData: { mimeType: mimeTypes[0], data: audioBase64[0] } });
        }
        if (audioBase64[1]) {
            parts.push({ text: "Audio for Question 9:" });
            parts.push({ inlineData: { mimeType: mimeTypes[1], data: audioBase64[1] } });
        }
        if (audioBase64[2]) {
            parts.push({ text: "Audio for Question 10:" });
            parts.push({ inlineData: { mimeType: mimeTypes[2], data: audioBase64[2] } });
        }
        
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: { parts },
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: speakingPart4EvaluationSchema,
            },
        });

        const jsonStr = response.text.trim();
        const data = JSON.parse(jsonStr);

        if (data && typeof data.taskScore === 'number') {
            return data as SpeakingPart4EvaluationResult;
        }
        return null;
    } catch (error) {
        console.error("Error evaluating speaking part 4:", error);
        throw new Error("Failed to get evaluation from API.");
    }
};

const speakingPart5ScenarioSchema = {
    type: Type.OBJECT,
    properties: {
        callerName: { type: Type.STRING, description: "The name of the person leaving the voicemail." },
        problem: { type: Type.STRING, description: "The text of the voicemail message describing a problem." }
    },
    required: ['callerName', 'problem']
};

export const generateSpeakingPart5Scenario = async (): Promise<SpeakingPart5Scenario | null> => {
    try {
        const prompt = `Generate a scenario for TOEIC Speaking Test Part 5 (Propose a solution).
        Create a short voicemail message (40-60 words) where a person describes a problem or makes a request.
        The scenario should be a common business or customer service situation.
        Provide the caller's name and the problem text.
        Return the result in JSON format according to the schema.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: speakingPart5ScenarioSchema,
            },
        });

        const jsonStr = response.text.trim();
        const data = JSON.parse(jsonStr);

        if (data && data.problem) {
            return data as SpeakingPart5Scenario;
        }
        return null;
    } catch (error) {
        console.error("Error generating speaking part 5 scenario:", error);
        throw new Error("Failed to generate scenario from API.");
    }
};

const speakingPart5EvaluationSchema = {
    type: Type.OBJECT,
    properties: {
        taskScore: { type: Type.INTEGER, description: "The raw score from 0 to 5." },
        estimatedScoreBand: { type: Type.STRING, description: "The estimated TOEIC Scale Score Range." },
        proficiencyLevel: { type: Type.STRING, description: "The corresponding TOEIC Proficiency Level." },
        generalSummary: { type: Type.OBJECT, properties: { english: { type: Type.STRING }, vietnamese: { type: Type.STRING } }, required: ['english', 'vietnamese'] },
        solutionStructure: { type: Type.OBJECT, properties: { english: { type: Type.STRING }, vietnamese: { type: Type.STRING } }, required: ['english', 'vietnamese'] },
        languageUse: { type: Type.OBJECT, properties: { english: { type: Type.STRING }, vietnamese: { type: Type.STRING } }, required: ['english', 'vietnamese'] },
        fluencyAndCohesion: { type: Type.OBJECT, properties: { english: { type: Type.STRING }, vietnamese: { type: Type.STRING } }, required: ['english', 'vietnamese'] },
        intonationAndTone: { type: Type.OBJECT, properties: { english: { type: Type.STRING }, vietnamese: { type: Type.STRING } }, required: ['english', 'vietnamese'] }
    },
    required: ['taskScore', 'estimatedScoreBand', 'proficiencyLevel', 'generalSummary', 'solutionStructure', 'languageUse', 'fluencyAndCohesion', 'intonationAndTone']
};

export const evaluateSpeakingPart5 = async (
    problemText: string,
    audioBase64: string,
    mimeType: string
): Promise<SpeakingPart5EvaluationResult | null> => {
    try {
        const systemInstruction = `You are a certified rater for the TOEIC Speaking Test, "Part 5: Propose a Solution". Evaluate a spoken audio response to a voicemail message.

Your evaluation must assess how well the user acknowledges the problem, proposes a clear and appropriate solution, and maintains a professional tone. Also evaluate pronunciation, grammar, and vocabulary.

Provide a structured JSON response in English and Vietnamese.

**Step 1: Assign a Task Score (0-5 Scale)**
- **5:** Response is highly effective, well-structured, and demonstrates strong language skills.
- **3:** Response addresses the task but may have limitations in structure, clarity, or language.
- **1:** Response is mostly unintelligible or fails to address the problem.
- **0:** No intelligible speech.

**Step 2 & 3: Estimate Score Band, Proficiency Level, and provide detailed feedback.**

Your final output must be a JSON object adhering to the schema.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: {
                parts: [
                    { text: `Evaluate my spoken response to this voicemail: "${problemText}"` },
                    { inlineData: { mimeType: mimeType, data: audioBase64 } }
                ]
            },
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: speakingPart5EvaluationSchema,
            },
        });
        
        const jsonStr = response.text.trim();
        const data = JSON.parse(jsonStr);

        if (data && typeof data.taskScore === 'number') {
            return data as SpeakingPart5EvaluationResult;
        }
        return null;
    } catch (error) {
        console.error("Error evaluating speaking part 5:", error);
        throw new Error("Failed to get evaluation from API.");
    }
};

const writingPart1TaskSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            picture: { type: Type.STRING, description: 'Base64 encoded image data string.' },
            keywords: { type: Type.ARRAY, items: { type: Type.STRING }, description: 'An array of two strings: [noun, verb].' }
        },
        required: ['picture', 'keywords']
    }
};

export const generateWritingPart1Tasks = async (): Promise<WritingPart1Task[] | null> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: `Generate 5 tasks for a TOEIC Writing Test Part 1. Each task needs an image and two keywords (a noun and a verb).
            Create 5 distinct, common scenes (e.g., people in an office, a family in a park, a busy street market, someone cooking, a person reading in a library).
            For each scene:
            1. Generate a realistic photograph.
            2. Provide two simple keywords (one noun, one verb) that are clearly depicted in the image.
            Return the output as a JSON array of 5 objects. Each object must have a "picture" key containing the base64 string of the image, and a "keywords" key with an array of two strings.
            Example: [{"picture": "base64data", "keywords": ["woman", "talk"]}, ...]`,
            config: {
                responseMimeType: "application/json",
                responseSchema: writingPart1TaskSchema
            }
        });
        
        const jsonStr = response.text.trim();
        const data = JSON.parse(jsonStr);

        if (Array.isArray(data) && data.length > 0) {
            const tasks: WritingPart1Task[] = data.map((item: any) => ({
                picture: item.picture, // The model should return base64 string directly
                keywords: item.keywords
            }));
            return tasks;
        }
        return null;
    } catch (error) {
        console.error("Error generating writing part 1 tasks:", error);
        throw new Error("Failed to generate tasks from API.");
    }
};

const writingPart1EvaluationSchema = {
    type: Type.OBJECT,
    properties: {
        totalRawScore: { type: Type.INTEGER },
        estimatedScoreBand: { type: Type.STRING },
        proficiencyLevel: { type: Type.STRING },
        overallSummary: { type: Type.OBJECT, properties: { english: { type: Type.STRING }, vietnamese: { type: Type.STRING } }, required: ['english', 'vietnamese'] },
        questionFeedback: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    score: { type: Type.INTEGER },
                    grammar: { type: Type.OBJECT, properties: { english: { type: Type.STRING }, vietnamese: { type: Type.STRING } }, required: ['english', 'vietnamese'] },
                    relevance: { type: Type.OBJECT, properties: { english: { type: Type.STRING }, vietnamese: { type: Type.STRING } }, required: ['english', 'vietnamese'] },
                },
                required: ['score', 'grammar', 'relevance']
            }
        }
    },
    required: ['totalRawScore', 'estimatedScoreBand', 'proficiencyLevel', 'overallSummary', 'questionFeedback']
};

export const evaluateWritingPart1 = async (tasks: WritingPart1Task[], userAnswers: string[]): Promise<WritingPart1EvaluationResult | null> => {
    try {
        const systemInstruction = `You are a TOEIC Writing Test rater for Part 1. Evaluate 5 sentences written by a user based on 5 pictures and 2 keywords per picture.
        For each sentence, provide a score from 0-3 based on grammar and relevance to the picture and keywords.
        Also provide an overall summary and an estimated TOEIC score band.
        Return the evaluation in both English and Vietnamese in the specified JSON format.`;

        const prompt = `Evaluate these 5 sentences:\n` + tasks.map((task, index) => 
            `Task ${index + 1}: Keywords are "${task.keywords[0]}" and "${task.keywords[1]}". User's sentence: "${userAnswers[index]}"`
        ).join('\n');

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: writingPart1EvaluationSchema,
            },
        });
        
        const jsonStr = response.text.trim();
        const data = JSON.parse(jsonStr);

        if (data && data.questionFeedback) {
            return data as WritingPart1EvaluationResult;
        }
        return null;
    } catch (error) {
        console.error("Error evaluating writing part 1:", error);
        throw new Error("Failed to evaluate writing from API.");
    }
};

const writingPart2TaskSchema = {
    type: Type.OBJECT,
    properties: {
        question6: {
            type: Type.OBJECT,
            properties: {
                title: { type: Type.STRING },
                requestText: { type: Type.STRING }
            },
            required: ['title', 'requestText']
        },
        question7: {
            type: Type.OBJECT,
            properties: {
                title: { type: Type.STRING },
                requestText: { type: Type.STRING }
            },
            required: ['title', 'requestText']
        }
    },
    required: ['question6', 'question7']
};

export const generateWritingPart2Tasks = async (): Promise<WritingPart2Task | null> => {
    try {
        const prompt = `Generate a task for TOEIC Writing Test Part 2. Create two emails.
        Question 6: A simple request email.
        Question 7: A complaint or more complex request email.
        Return the result in JSON format according to the schema.`;
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: writingPart2TaskSchema,
            }
        });
        const jsonStr = response.text.trim();
        const data = JSON.parse(jsonStr);
        if (data && data.question6) {
            return data as WritingPart2Task;
        }
        return null;
    } catch (error) {
        console.error("Error generating writing part 2 tasks:", error);
        return null;
    }
};

const writingPart2EvaluationSchema = {
    type: Type.OBJECT,
    properties: {
        totalRawScore: { type: Type.INTEGER },
        estimatedScoreBand: { type: Type.STRING },
        overallSummary: { type: Type.OBJECT, properties: { english: { type: Type.STRING }, vietnamese: { type: Type.STRING } }, required: ['english', 'vietnamese'] },
        question6Feedback: {
            type: Type.OBJECT,
            properties: {
                score: { type: Type.INTEGER },
                requestSummary: { type: Type.STRING },
                completeness: { type: Type.OBJECT, properties: { english: { type: Type.STRING }, vietnamese: { type: Type.STRING } }, required: ['english', 'vietnamese'] },
                languageUse: { type: Type.OBJECT, properties: { english: { type: Type.STRING }, vietnamese: { type: Type.STRING } }, required: ['english', 'vietnamese'] },
            },
            required: ['score', 'requestSummary', 'completeness', 'languageUse']
        },
        question7Feedback: {
            type: Type.OBJECT,
            properties: {
                score: { type: Type.INTEGER },
                requestSummary: { type: Type.STRING },
                completeness: { type: Type.OBJECT, properties: { english: { type: Type.STRING }, vietnamese: { type: Type.STRING } }, required: ['english', 'vietnamese'] },
                languageUse: { type: Type.OBJECT, properties: { english: { type: Type.STRING }, vietnamese: { type: Type.STRING } }, required: ['english', 'vietnamese'] },
            },
            required: ['score', 'requestSummary', 'completeness', 'languageUse']
        }
    },
    required: ['totalRawScore', 'estimatedScoreBand', 'overallSummary', 'question6Feedback', 'question7Feedback']
};

export const evaluateWritingPart2 = async (tasks: WritingPart2Task, userAnswers: string[]): Promise<WritingPart2EvaluationResult | null> => {
    try {
        const systemInstruction = `You are a TOEIC Writing Test rater for Part 2. Evaluate 2 emails written by a user in response to 2 prompts.
        For each email, provide a score from 0-4.
        Also provide an overall summary and an estimated TOEIC score band.
        Return the evaluation in both English and Vietnamese in the specified JSON format.`;

        const prompt = `Evaluate these 2 emails:\nQ6 Prompt: "${tasks.question6.requestText}"\nUser Answer 6: "${userAnswers[0]}"\n\nQ7 Prompt: "${tasks.question7.requestText}"\nUser Answer 7: "${userAnswers[1]}"`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: writingPart2EvaluationSchema,
            },
        });
        
        const jsonStr = response.text.trim();
        const data = JSON.parse(jsonStr);

        if (data && data.question6Feedback) {
            return data as WritingPart2EvaluationResult;
        }
        return null;
    } catch (error) {
        console.error("Error evaluating writing part 2:", error);
        return null;
    }
};

const writingPart3TaskSchema = {
    type: Type.OBJECT,
    properties: {
        question: { type: Type.STRING }
    },
    required: ['question']
};
export const generateWritingPart3Task = async (): Promise<WritingPart3Task | null> => {
    try {
        const prompt = `Generate a prompt for a TOEIC Writing Test Part 3 opinion essay. The prompt should ask for the user's opinion on a common business or workplace topic. Return the result in JSON format according to the schema.`;
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: writingPart3TaskSchema,
            }
        });
        const jsonStr = response.text.trim();
        const data = JSON.parse(jsonStr);
        if (data && data.question) {
            return data as WritingPart3Task;
        }
        return null;
    } catch (error) {
         console.error("Error generating writing part 3 task:", error);
         return null;
    }
};
const writingPart3EvaluationSchema = {
    type: Type.OBJECT,
    properties: {
        taskScore: { type: Type.INTEGER },
        estimatedScoreBand: { type: Type.STRING },
        overallSummary: { type: Type.OBJECT, properties: { english: { type: Type.STRING }, vietnamese: { type: Type.STRING } }, required: ['english', 'vietnamese'] },
        ideaDevelopment: { type: Type.OBJECT, properties: { english: { type: Type.STRING }, vietnamese: { type: Type.STRING } }, required: ['english', 'vietnamese'] },
        organization: { type: Type.OBJECT, properties: { english: { type: Type.STRING }, vietnamese: { type: Type.STRING } }, required: ['english', 'vietnamese'] },
        grammarAndSyntax: { type: Type.OBJECT, properties: { english: { type: Type.STRING }, vietnamese: { type: Type.STRING } }, required: ['english', 'vietnamese'] },
        vocabulary: { type: Type.OBJECT, properties: { english: { type: Type.STRING }, vietnamese: { type: Type.STRING } }, required: ['english', 'vietnamese'] },
    },
    required: ['taskScore', 'estimatedScoreBand', 'overallSummary', 'ideaDevelopment', 'organization', 'grammarAndSyntax', 'vocabulary']
};
export const evaluateWritingPart3 = async (question: string, userAnswer: string): Promise<WritingPart3EvaluationResult | null> => {
    try {
        const systemInstruction = `You are a TOEIC Writing Test rater for Part 3. Evaluate an opinion essay written in response to a prompt. Provide a score from 0-5 and detailed feedback on different criteria. Return the evaluation in both English and Vietnamese in the specified JSON format.`;
        const prompt = `Evaluate this essay:\nPrompt: "${question}"\nUser's Essay: "${userAnswer}"`;
        
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                systemInstruction,
                responseMimeType: "application/json",
                responseSchema: writingPart3EvaluationSchema,
            }
        });
        const jsonStr = response.text.trim();
        const data = JSON.parse(jsonStr);
        if(data && data.overallSummary) {
            return data as WritingPart3EvaluationResult;
        }
        return null;
    } catch (error) {
        console.error("Error evaluating writing part 3:", error);
        return null;
    }
};

const shuffleArray = <T,>(array: T[]): T[] => {
    return [...array].sort(() => Math.random() - 0.5);
};

export const generateWordsWithPhonetics = async (count: number): Promise<PhoneticWord[] | null> => {
    try {
        const randomWords = shuffleArray(commonWords).slice(0, count);
        return randomWords;
    } catch (error) {
        console.error("Error generating words with phonetics:", error);
        throw new Error("Failed to generate words.");
    }
};

const singleWordEvaluationSchema = {
    type: Type.OBJECT,
    properties: {
        overallScore: { type: Type.NUMBER, description: "An overall pronunciation score from 0 to 100." },
        feedback_vi: { type: Type.STRING, description: "Concise feedback in Vietnamese about the pronunciation." },
    },
    required: ['overallScore', 'feedback_vi']
};


export const evaluateSingleWordPronunciation = async (word: string, phonetic: string, audioBase64: string, mimeType: string): Promise<SingleWordEvaluationResult | null> => {
    try {
        const systemInstruction = `You are an expert English pronunciation coach. Evaluate the user's pronunciation of a single word based on its IPA transcription. Provide an overall score and concise feedback in Vietnamese.`;
        const prompt = `Evaluate the pronunciation of the word "${word}" (IPA: ${phonetic}).`;
        
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: {
                parts: [
                    { text: prompt },
                    { inlineData: { mimeType: mimeType, data: audioBase64 } }
                ]
            },
            config: {
                systemInstruction,
                responseMimeType: "application/json",
                responseSchema: singleWordEvaluationSchema
            }
        });
        
        const jsonStr = response.text.trim();
        const data = JSON.parse(jsonStr);

        if (data && typeof data.overallScore === 'number') {
            return data as SingleWordEvaluationResult;
        }
        return null;
    } catch (error) {
        console.error(`Error evaluating pronunciation for "${word}":`, error);
        throw new Error("Failed to get pronunciation evaluation from API.");
    }
};
