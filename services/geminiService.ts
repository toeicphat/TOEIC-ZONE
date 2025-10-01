import { GoogleGenAI, Type } from "@google/genai";
// FIX: Import TestData type
import { DictationExercise, TestData } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

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

// FIX: Add generateTOEICMiniTest function and associated schemas.
const questionSchema = {
    type: Type.OBJECT,
    properties: {
        id: { type: Type.INTEGER, description: 'A unique integer ID for the question, starting from 101.' },
        part: { type: Type.INTEGER, description: 'The TOEIC part number (e.g., 1, 2, 5, 6, 7).' },
        questionText: { type: Type.STRING, description: 'The main text of the question. For fill-in-the-blanks, use "____". For Part 7, this contains the passage for the first question in a set.' },
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
        image: { type: Type.STRING, description: 'Optional. For Part 1, a URL to a relevant image. Use a placeholder like https://placehold.co/600x400.' },
        audioScript: { type: Type.STRING, description: 'Optional. For listening parts (1-4), the script for the audio.' },
    },
    required: ['id', 'part', 'questionText', 'options', 'correctAnswer', 'explanation']
};

const testSchema = {
    type: Type.OBJECT,
    properties: {
        testTitle: { type: Type.STRING, description: 'A creative title for this mini-test, e.g., "TOEIC Mini-Test: Business Scenarios".' },
        duration: { type: Type.INTEGER, description: 'The total test duration in seconds. Assume 75 seconds per question.' },
        questions: {
            type: Type.ARRAY,
            description: 'An array of question objects.',
            items: questionSchema
        }
    },
    required: ['testTitle', 'duration', 'questions']
};

export const generateTOEICMiniTest = async (): Promise<TestData | null> => {
    try {
        const prompt = `
            You are an expert TOEIC test creator. Generate a complete mini-TOEIC test in JSON format according to the provided schema.

            Instructions:
            1.  Create a test with exactly 5 questions.
            2.  Include a mix of questions from different TOEIC parts (e.g., Part 5 Incomplete Sentences, Part 7 Reading Comprehension). Do not include listening parts (1-4) or Part 6. Focus on reading comprehension.
            3.  For each question, provide a unique ID starting from 101.
            4.  For Part 7, write a short passage (email, notice, article) in the 'questionText' for the first question of the set, and then for subsequent questions related to that passage, write "Refer to the previous passage." in their 'questionText'. All questions for a passage should be grouped together.
            5.  Ensure all fields in the schema are filled correctly.
            6.  Set the duration to 375 seconds (5 questions * 75 seconds).
            7.  Provide a clear and concise explanation for each correct answer.
        `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: testSchema,
            },
        });

        const jsonStr = response.text.trim();
        const data = JSON.parse(jsonStr);

        // Basic validation
        if (data && data.questions && data.questions.length > 0) {
            return data as TestData;
        }
        return null;
    } catch (error) {
        console.error("Error generating TOEIC mini-test:", error);
        throw new Error("Failed to generate test from API.");
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