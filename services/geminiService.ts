import { GoogleGenAI, Type } from "@google/genai";
import { TestData, DictationExercise } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
      testTitle: { type: Type.STRING },
      duration: { type: Type.NUMBER, description: "Test duration in seconds. For 10 questions, make it 600 seconds." },
      questions: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.NUMBER },
            part: { type: Type.NUMBER, description: 'TOEIC Part number (1 or 5)' },
            image: { type: Type.STRING, nullable: true, description: 'URL of an image for Part 1 questions. Empty for others.' },
            audioScript: { type: Type.STRING, nullable: true, description: 'The script of the audio for listening questions.' },
            questionText: { type: Type.STRING, description: 'The main text of the question (e.g., incomplete sentence for Part 5). For Part 1, this should be "Listen to four statements about a picture, then select the one that best describes the picture."' },
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
            correctAnswer: { type: Type.STRING, description: 'The key of the correct option (A, B, C, or D).' },
            explanation: { type: Type.STRING, description: 'Detailed explanation of the correct answer.' },
          },
          required: ['id', 'part', 'questionText', 'options', 'correctAnswer', 'explanation']
        }
      }
    },
    required: ['testTitle', 'duration', 'questions']
};


export const generateTOEICMiniTest = async (): Promise<TestData | null> => {
  try {
    const prompt = `
      You are an expert TOEIC test creator. Generate a 10-question mini-test for English learners in JSON format according to the provided schema.

      Instructions:
      1. Create a test with the title "AI-Generated Mini TOEIC Test".
      2. Set the duration to 600 seconds.
      3. The test must contain exactly 10 questions.
      4. The first 3 questions must be for Part 1 (Photographs).
      5. The next 7 questions must be for Part 5 (Incomplete Sentences).
      6. For Part 1 questions:
         - Provide a relevant public image URL from \`https://picsum.photos/800/500?random=SEED\` where SEED is a unique random integer for each image.
         - The 'questionText' should be "Listen to four statements about a picture, then select the one that best describes the picture.".
         - Create four descriptive options (A, B, C, D), where only one is correct.
         - Provide a concise 'audioScript' that includes all four statements. For example: "(A) They're looking at the screen. (B) They're reading a book. (C) They're sitting on a bench. (D) They're walking in a park."
      7. For Part 5 questions:
         - The 'image' and 'audioScript' fields should be null.
         - The 'questionText' should be a single sentence with a blank indicated by '____'.
         - Provide four word or phrase options (A, B, C, D) to fill the blank.
      8. For every question, provide a 'correctAnswer' (A, B, C, or D) and a detailed 'explanation' for why that answer is correct and the others are incorrect.
      9. Ensure question IDs are sequential from 1 to 10.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });
    
    const jsonStr = response.text.trim();
    const data = JSON.parse(jsonStr);

    // Basic validation to ensure the response is usable
    if (data && data.questions && Array.isArray(data.questions) && data.questions.length > 0) {
      return data as TestData;
    }
    return null;
  } catch (error) {
    console.error("Error generating TOEIC test:", error);
    throw new Error("Failed to generate test from API.");
  }
};

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
