import { GoogleGenAI, Type } from "@google/genai";
// FIX: Import TestData type
import { DictationExercise, TestData, SpeakingPart1EvaluationResult, SpeakingPart2EvaluationResult, SpeakingPart3EvaluationResult, SpeakingPart4Task, SpeakingPart4EvaluationResult, SpeakingPart5Scenario, SpeakingPart5EvaluationResult, WritingPart1Task, WritingPart1EvaluationResult, WritingPart2Task, WritingPart2EvaluationResult, WritingPart3Task, WritingPart3EvaluationResult, DeterminerExercise } from '../types';

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY});
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
            // Remove duplicates from the determiners array to be safe
            data.determiners = [...new Set(data.determiners)];
            return data as DeterminerExercise;
        }
        return null;
    } catch (error) {
        console.error("Error generating determiner exercise:", error);
        throw new Error("Failed to generate exercise from API.");
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
            It should be a formal announcement, like one you might hear at an airport, a train station, a store, an office, or a museum.
            The topic should be common and easy to understand.
            Provide only the text itself, without any introductory phrases, titles, or quotation marks.
        `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        const text = response.text.trim();
        return text || null;

    } catch (error) {
        console.error("Error generating speaking practice text:", error);
        throw new Error("Failed to generate text from API.");
    }
};

const speakingPart2Schema = {
    type: Type.OBJECT,
    properties: {
      taskScore: { type: Type.INTEGER, description: "The raw score from 0 to 3 based on the overall quality of the description." },
      estimatedScoreBand: { type: Type.STRING, description: "The estimated TOEIC Speaking Scale Score Range (e.g., '110-120')." },
      proficiencyLevel: { type: Type.STRING, description: "The corresponding TOEIC Proficiency Level (e.g., 'Level 5')." },
      grammar: {
        type: Type.OBJECT,
        properties: {
          english: { type: Type.STRING, description: "Feedback on grammar in English. Comment on accuracy, range, and complexity of sentences." },
          vietnamese: { type: Type.STRING, description: "Feedback on grammar in Vietnamese (Ngữ pháp)." }
        },
        required: ['english', 'vietnamese']
      },
      vocabulary: {
        type: Type.OBJECT,
        properties: {
          english: { type: Type.STRING, description: "Feedback on vocabulary in English. Comment on appropriate, accurate, and varied word choice." },
          vietnamese: { type: Type.STRING, description: "Feedback on vocabulary in Vietnamese (Từ vựng)." }
        },
        required: ['english', 'vietnamese']
      },
      cohesion: {
        type: Type.OBJECT,
        properties: {
          english: { type: Type.STRING, description: "Feedback on cohesion in English. Comment on logical organization and flow." },
          vietnamese: { type: Type.STRING, description: "Feedback on cohesion in Vietnamese (Tính mạch lạc)." }
        },
        required: ['english', 'vietnamese']
      },
      delivery: {
        type: Type.OBJECT,
        properties: {
          english: { type: Type.STRING, description: "Feedback on delivery (pronunciation, intonation, and stress) in English." },
          vietnamese: { type: Type.STRING, description: "Feedback on delivery in Vietnamese (Phát âm, Ngữ điệu và Trọng âm)." }
        },
        required: ['english', 'vietnamese']
      }
    },
    required: ['taskScore', 'estimatedScoreBand', 'proficiencyLevel', 'grammar', 'vocabulary', 'cohesion', 'delivery']
};

export const generateImageForSpeakingPart2 = async (): Promise<string | null> => {
    try {
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: `A high-quality, realistic photograph suitable for a TOEIC Speaking Test Part 2 (Describe a picture). 
            The image should depict a common scene in a work, daily life, or public setting. 
            Examples: people working in an office, a person shopping at an outdoor market, a family having a meal, people waiting at an airport terminal. 
            The image must have a clear central action and various background details to allow for a detailed description. 
            Avoid text, logos, or abstract elements.`,
            config: {
              numberOfImages: 1,
              outputMimeType: 'image/jpeg',
              aspectRatio: '4:3',
            },
        });
        
        const base64ImageBytes: string | undefined = response.generatedImages?.[0]?.image?.imageBytes;
        
        if (base64ImageBytes) {
            return `data:image/jpeg;base64,${base64ImageBytes}`;
        }
        return null;
    } catch (error) {
        console.error("Error generating image for Speaking Part 2:", error);
        throw new Error("Failed to generate image from API.");
    }
};

export const evaluateSpeakingPart2 = async (audioBase64: string, mimeType: string): Promise<SpeakingPart2EvaluationResult | null> => {
    try {
        const systemInstruction = `You are a certified rater for the TOEIC Speaking Test, specializing in "Part 2: Describe a Picture". Your task is to evaluate a user's spoken audio description of a picture. You will receive only the user's audio recording.

Your evaluation must be based on the official criteria for this task:
1.  **Grammar:** Accuracy, range, and complexity of sentence structures.
2.  **Vocabulary:** Appropriate, accurate, and varied word choice to describe the scene, objects, and actions.
3.  **Cohesion:** Logical organization, smooth transitions between sentences, and the overall flow of the description.
4.  **Delivery:** Pronunciation (clarity, intelligibility), Intonation, and Stress (appropriate use of pitch, emphasis, and pausing).

Based on your evaluation, you must provide a structured JSON response.

**Step 1: Assign a Task Score (0-3 Scale)**
- **3 (Highest):** The description is relevant, clear, and coherent. It uses accurate and varied grammar and vocabulary. Delivery is generally clear and fluid.
- **2 (Medium):** The description is relevant but may have some inaccuracies or limitations in grammar and vocabulary. Delivery may have some noticeable issues.
- **1 (Low):** The description is limited and difficult to understand due to significant errors in grammar, vocabulary, or delivery.
- **0:** No intelligible speech or no attempt.

**Step 2: Estimate Overall Score Band and Proficiency Level**
Use the Task Score to estimate an overall TOEIC Speaking Scale Score and Proficiency Level.
- Task Score 3 -> Level 7-8 (160-200)
- Task Score 2 -> Level 5-6 (110-150)
- Task Score 1 -> Level 3-4 (60-100)
- Task Score 0 -> Level 1-2 (0-50)

**Step 3: Provide Detailed, Bilingual Feedback**
For each criterion (Grammar, Vocabulary, Cohesion, Delivery), provide a concise summary of strengths and weaknesses. **Your feedback for each section must be provided in both English and Vietnamese.**

Your final output must be a JSON object adhering to the provided schema. Do not add any extra text or explanations outside the JSON structure.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: {
                parts: [
                    { text: `Evaluate my speech for the TOEIC Speaking Part 2 task.` },
                    { inlineData: { mimeType: mimeType, data: audioBase64 } }
                ]
            },
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: speakingPart2Schema,
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
}

const speakingPart3QuestionsSchema = {
    type: Type.OBJECT,
    properties: {
        topic: { type: Type.STRING, description: "The general topic for the set of questions (e.g., 'Shopping for clothes')." },
        question5: { type: Type.STRING, description: "Question 5: A simple, factual, or frequency question." },
        question6: { type: Type.STRING, description: "Question 6: A 'wh-' question asking for reasons, opinions, or specific details." },
        question7: { type: Type.STRING, description: "Question 7: A hypothetical, comparison, or detailed opinion question requiring an extended answer." },
    },
    required: ['topic', 'question5', 'question6', 'question7'],
};

export const generateSpeakingPart3Questions = async (): Promise<{ topic: string, question5: string, question6: string, question7: string } | null> => {
    try {
        const prompt = `Generate a set of three interconnected, spoken questions typical of TOEIC Speaking Part 3 (Questions 5-7).
        1. First, select a common everyday topic (e.g., shopping, transportation, movies, or dining out).
        2. Create Question 5: A simple, factual, or frequency question (e.g., "How often do you go shopping for clothes?").
        3. Create Question 6: A "wh-" question asking for reasons or details, related to Q5 (e.g., "What kind of clothing stores do you prefer, and why?").
        4. Create Question 7: A hypothetical, comparison, or detailed opinion question requiring a more extended answer, related to the topic (e.g., "If you had to choose between shopping online or in a physical store, which would you choose and why?").
        Return the result as a JSON object.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: speakingPart3QuestionsSchema,
            },
        });

        const data = JSON.parse(response.text.trim());
        if (data && data.question5 && data.question6 && data.question7) {
            return data;
        }
        return null;
    } catch (error) {
        console.error("Error generating Speaking Part 3 questions:", error);
        throw new Error("Failed to generate questions from API.");
    }
};

const speakingPart3EvaluationSchema = {
    type: Type.OBJECT,
    properties: {
        taskScore: { type: Type.INTEGER, description: "The raw score from 0 to 5 for the set of three responses." },
        estimatedScoreBand: { type: Type.STRING, description: "The estimated TOEIC Speaking Scale Score Range (e.g., '130-150')." },
        proficiencyLevel: { type: Type.STRING, description: "The corresponding TOEIC Proficiency Level (e.g., 'Level 6')." },
        generalSummary: {
            type: Type.OBJECT,
            properties: {
                english: { type: Type.STRING, description: "A general summary of the performance in English, noting relevance and completeness." },
                vietnamese: { type: Type.STRING, description: "A general summary in Vietnamese (Tóm tắt chung)." },
            },
            required: ['english', 'vietnamese'],
        },
        grammarAndVocab: {
            type: Type.OBJECT,
            properties: {
                english: { type: Type.STRING, description: "Feedback on grammar and vocabulary in English." },
                vietnamese: { type: Type.STRING, description: "Feedback on grammar and vocabulary in Vietnamese (Ngữ pháp & Từ vựng)." },
            },
            required: ['english', 'vietnamese'],
        },
        fluencyAndCohesion: {
            type: Type.OBJECT,
            properties: {
                english: { type: Type.STRING, description: "Feedback on fluency and cohesion in English." },
                vietnamese: { type: Type.STRING, description: "Feedback on fluency and cohesion in Vietnamese (Độ trôi chảy & Mạch lạc)." },
            },
            required: ['english', 'vietnamese'],
        },
        pronunciation: {
            type: Type.OBJECT,
            properties: {
                english: { type: Type.STRING, description: "Feedback on pronunciation in English." },
                vietnamese: { type: Type.STRING, description: "Feedback on pronunciation in Vietnamese (Phát âm)." },
            },
            required: ['english', 'vietnamese'],
        },
        responseToQ7: {
            type: Type.OBJECT,
            properties: {
                english: { type: Type.STRING, description: "Specific feedback on the content and development of the answer to Question 7." },
                vietnamese: { type: Type.STRING, description: "Specific feedback on the content for Question 7 in Vietnamese (Phản hồi cho Câu 7)." },
            },
            required: ['english', 'vietnamese'],
        },
    },
    required: ['taskScore', 'estimatedScoreBand', 'proficiencyLevel', 'generalSummary', 'grammarAndVocab', 'fluencyAndCohesion', 'pronunciation', 'responseToQ7'],
};

export const evaluateSpeakingPart3 = async (
    questions: { question5: string; question6: string; question7: string; }, 
    audioBase64s: (string | null)[], 
    mimeTypes: string[]
): Promise<SpeakingPart3EvaluationResult | null> => {
    try {
        const systemInstruction = `You are a certified rater for the TOEIC Speaking Test, specializing in "Part 3: Respond to Questions" (Questions 5-7). Evaluate the user's cumulative performance across three spoken audio responses to a set of related questions.

**Evaluation Criteria:**
- **Relevance & Completeness:** Did the user directly answer all three questions?
- **Language Use:** Assess grammar accuracy/range and vocabulary appropriateness/variety.
- **Cohesion & Fluency:** Evaluate the flow, pacing, and use of connecting words.
- **Delivery:** Rate overall pronunciation, intonation, and stress.

**Step 1: Assign a Task Score (0-5 Scale)**
Based on the overall communicative effectiveness across all three responses, assign a score:
- **5 (Highest):** Responses are appropriate, fluent, and coherent. Excellent grammar/vocab. Delivery is highly intelligible.
- **4:** Responses are mostly appropriate and clear. Good control of grammar/vocab. Intelligible delivery.
- **3 (Medium):** Responses are generally appropriate but may have limitations. Some errors in grammar/vocab. Delivery is generally intelligible but may have noticeable issues.
- **2:** Responses are limited. Significant errors in grammar, vocabulary, or delivery make them difficult to understand.
- **1 (Low):** Responses are mostly unintelligible or irrelevant.
- **0:** No intelligible speech.

**Step 2: Estimate Overall Score Band and Proficiency Level**
Use the Task Score to estimate an overall TOEIC Speaking Scale Score and Proficiency Level.
- Task Score 5 -> Level 8 (190-200)
- Task Score 4 -> Level 6-7 (130-180)
- Task Score 3 -> Level 5 (110-120)
- Task Score 2 -> Level 4 (80-100)
- Task Score 1 -> Level 3 (60-70)
- Task Score 0 -> Level 1-2 (0-50)

**Step 3: Provide Detailed, Bilingual Feedback**
Provide concise feedback for each category in **both English and Vietnamese**. Specifically comment on the longest answer (Q7) in its own section.

Your final output must be a JSON object adhering to the provided schema.`;

        const parts: any[] = [{ text: `Evaluate my three responses to these questions:
        Q5: "${questions.question5}"
        Q6: "${questions.question6}"
        Q7: "${questions.question7}"
        Here are my audio responses.` }];
        
        audioBase64s.forEach((audio, index) => {
            if (audio) {
                parts.push({ text: `Audio for Q${index + 5}:` });
                parts.push({ inlineData: { mimeType: mimeTypes[index], data: audio } });
            } else {
                parts.push({ text: `No audio was provided for Q${index + 5}.` });
            }
        });

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: { parts: parts },
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: speakingPart3EvaluationSchema,
            },
        });

        const data = JSON.parse(response.text.trim());
        if (data && typeof data.taskScore === 'number') {
            return data as SpeakingPart3EvaluationResult;
        }
        return null;

    } catch (error) {
        console.error("Error evaluating Speaking Part 3 performance:", error);
        throw new Error("Failed to get evaluation from API.");
    }
};

const speakingPart4TaskSchema = {
    type: Type.OBJECT,
    properties: {
        documentTitle: { type: Type.STRING, description: "A professional title for the document, e.g., 'Weekly Project Status Meeting Agenda'." },
        documentContent: { type: Type.STRING, description: "A multi-line text representing the schedule or document. Use markdown for simple formatting like lists or bolding. CRITICAL: This document MUST contain a conflict or error, such as a scheduling conflict, a cancelled session, or incorrect information that can be corrected by referencing other parts of the document." },
        question8: { type: Type.STRING, description: "Question 8: A simple, fact-finding question about basic information from the document (e.g., 'What time does the conference start?')." },
        question9: { type: Type.STRING, description: "Question 9: A specific, detailed question requiring extraction of multiple related facts (e.g., 'Can you list the times and speakers for the marketing sessions?')." },
        question10: { type: Type.STRING, description: "Question 10: A complex question that requires the user to correct a misunderstanding based on the conflict in the document (e.g., 'I was told the keynote is on Friday morning. Is that correct?')." },
    },
    required: ['documentTitle', 'documentContent', 'question8', 'question9', 'question10'],
};


export const generateSpeakingPart4Task = async (): Promise<SpeakingPart4Task | null> => {
    try {
        const prompt = `
            You are a TOEIC test creator. Generate a complete practice task for TOEIC Speaking Part 4 (Questions 8-10).
            The task consists of a document (like a schedule, agenda, or itinerary) and three related questions.

            Instructions:
            1.  **Create a Document:** Design a realistic business document. It must contain a clear conflict, error, or change. For example, a session is cancelled but a question refers to it, two events are scheduled at the same time, or an announcement contradicts a listed item.
            2.  **Create Question 8:** Ask a simple, direct question about one piece of information from the document.
            3.  **Create Question 9:** Ask a more detailed question that requires finding two or three pieces of related information.
            4.  **Create Question 10:** Create a question based on a misunderstanding that can be corrected using the conflict/error you placed in the document.
            5.  Return the result as a single JSON object adhering to the provided schema.
        `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: speakingPart4TaskSchema,
            },
        });

        const data = JSON.parse(response.text.trim());
        if (data && data.documentTitle && data.question8) {
            return data as SpeakingPart4Task;
        }
        return null;
    } catch (error) {
        console.error("Error generating Speaking Part 4 task:", error);
        throw new Error("Failed to generate task from API.");
    }
};

const speakingPart4EvaluationSchema = {
    type: Type.OBJECT,
    properties: {
        taskScore: { type: Type.INTEGER, description: "The raw score from 0 to 5 for the set of three responses." },
        estimatedScoreBand: { type: Type.STRING, description: "The estimated TOEIC Speaking Scale Score Range (e.g., '130-150')." },
        proficiencyLevel: { type: Type.STRING, description: "The corresponding TOEIC Proficiency Level (e.g., 'Level 6')." },
        generalSummary: {
            type: Type.OBJECT,
            properties: {
                english: { type: Type.STRING },
                vietnamese: { type: Type.STRING },
            },
            required: ['english', 'vietnamese'],
        },
        accuracy: {
            type: Type.OBJECT,
            properties: {
                english: { type: Type.STRING, description: "Feedback on factual correctness for Q8 and Q9." },
                vietnamese: { type: Type.STRING, description: "Feedback on factual correctness for Q8 and Q9 in Vietnamese (Độ chính xác)." },
            },
            required: ['english', 'vietnamese'],
        },
        responseToQ10: {
            type: Type.OBJECT,
            properties: {
                english: { type: Type.STRING, description: "Specific feedback on synthesizing/correcting the complex question 10." },
                vietnamese: { type: Type.STRING, description: "Specific feedback for Question 10 in Vietnamese (Phản hồi Q10)." },
            },
            required: ['english', 'vietnamese'],
        },
        languageUse: {
            type: Type.OBJECT,
            properties: {
                english: { type: Type.STRING },
                vietnamese: { type: Type.STRING, description: "Feedback in Vietnamese (Sử dụng ngôn ngữ)." },
            },
            required: ['english', 'vietnamese'],
        },
        delivery: {
            type: Type.OBJECT,
            properties: {
                english: { type: Type.STRING },
                vietnamese: { type: Type.STRING, description: "Feedback in Vietnamese (Cách trình bày)." },
            },
            required: ['english', 'vietnamese'],
        },
    },
    required: ['taskScore', 'estimatedScoreBand', 'proficiencyLevel', 'generalSummary', 'accuracy', 'responseToQ10', 'languageUse', 'delivery'],
};

export const evaluateSpeakingPart4 = async (
    taskData: SpeakingPart4Task, 
    audioBase64s: (string | null)[], 
    mimeTypes: string[]
): Promise<SpeakingPart4EvaluationResult | null> => {
    try {
        const systemInstruction = `You are a certified rater for the TOEIC Speaking Test, specializing in "Part 4: Respond to Questions using Information Provided" (Questions 8-10). Evaluate the user's cumulative performance across three spoken audio responses based on a provided document.

**Evaluation Criteria:**
- **Relevance & Accuracy:** Did the user provide the correct information from the document for all three questions? Critically, did they correctly identify and explain the conflict/correction for Q10? This is the most important factor.
- **Completeness:** Did they answer all parts of the questions?
- **Language Use:** Assess grammar, vocabulary, and cohesion.
- **Delivery:** Rate overall pronunciation, intonation, and pacing.

**Step 1: Assign a Task Score (0-5 Scale)**
- **5 (Highest):** All information is conveyed accurately and completely. High-level language use and clear delivery.
- **4:** All information is conveyed accurately. Minor issues with language or delivery.
- **3 (Medium):** The gist of the information is conveyed, but there may be some significant inaccuracies (especially in Q10) or limitations in language/delivery.
- **2:** Only conveys some information accurately. Significant errors make the response difficult to understand.
- **1 (Low):** Mostly unintelligible or irrelevant.
- **0:** No intelligible speech.

**Step 2: Estimate Score Band and Proficiency Level**
Use the Task Score to estimate an overall TOEIC Speaking Scale Score and Proficiency Level.
- Task Score 5 -> Level 7-8 (160-200)
- Task Score 4 -> Level 6 (130-150)
- Task Score 3 -> Level 5 (110-120)
- Task Score 2 -> Level 4 (80-100)
- Task Score 1 -> Level 3 (60-70)
- Task Score 0 -> Level 1-2 (0-50)

**Step 3: Provide Detailed, Bilingual Feedback**
Provide concise feedback for each category in **both English and Vietnamese**.

Your final output must be a JSON object adhering to the provided schema.`;

        const parts: any[] = [{ text: `Evaluate my three responses based on this document:
        Title: ${taskData.documentTitle}
        Content: ${taskData.documentContent}
        
        The questions were:
        Q8: "${taskData.question8}"
        Q9: "${taskData.question9}"
        Q10: "${taskData.question10}"
        
        Here are my audio responses.` }];
        
        audioBase64s.forEach((audio, index) => {
            if (audio) {
                parts.push({ text: `Audio for Q${index + 8}:` });
                parts.push({ inlineData: { mimeType: mimeTypes[index], data: audio } });
            } else {
                parts.push({ text: `No audio was provided for Q${index + 8}.` });
            }
        });

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: { parts: parts },
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: speakingPart4EvaluationSchema,
            },
        });

        const data = JSON.parse(response.text.trim());
        if (data && typeof data.taskScore === 'number') {
            return data as SpeakingPart4EvaluationResult;
        }
        return null;

    } catch (error) {
        console.error("Error evaluating Speaking Part 4 performance:", error);
        throw new Error("Failed to get evaluation from API.");
    }
};

const speakingPart5ScenarioSchema = {
    type: Type.OBJECT,
    properties: {
        callerName: { type: Type.STRING, description: "The name of the person leaving the voicemail (e.g., 'Sarah from Accounting')." },
        problem: { type: Type.STRING, description: "A detailed voicemail message, about 4-6 sentences long, describing a common workplace problem that requires a solution. The tone should be slightly concerned or urgent. Examples: a scheduling conflict for an important meeting, a delayed shipment affecting a deadline, a technical issue with equipment before a presentation, or a customer complaint that needs to be addressed." },
    },
    required: ['callerName', 'problem'],
};

export const generateSpeakingPart5Scenario = async (): Promise<SpeakingPart5Scenario | null> => {
    try {
        const prompt = `Generate a scenario for a TOEIC Speaking Test Question 11 (Propose a Solution).
        The scenario should be in the form of a voicemail message from a colleague or client.
        It must describe a clear, common workplace problem and imply that a solution is needed.
        The message should be about 4-6 sentences long.
        Return the result as a single JSON object adhering to the provided schema.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: speakingPart5ScenarioSchema,
            },
        });

        const data = JSON.parse(response.text.trim());
        if (data && data.callerName && data.problem) {
            return data as SpeakingPart5Scenario;
        }
        return null;
    } catch (error) {
        console.error("Error generating Speaking Part 5 scenario:", error);
        throw new Error("Failed to generate scenario from API.");
    }
};


const speakingPart5EvaluationSchema = {
    type: Type.OBJECT,
    properties: {
        taskScore: { type: Type.INTEGER, description: "The raw score from 0 to 5 for the response." },
        estimatedScoreBand: { type: Type.STRING, description: "The estimated TOEIC Speaking Scale Score Range (e.g., '160-180')." },
        proficiencyLevel: { type: Type.STRING, description: "The corresponding TOEIC Proficiency Level (e.g., 'Level 7')." },
        generalSummary: {
            type: Type.OBJECT, properties: {
                english: { type: Type.STRING, description: "A general summary of the performance in English, noting if the user identified the problem and provided a solution." },
                vietnamese: { type: Type.STRING, description: "A general summary in Vietnamese (Tóm tắt chung)." },
            }, required: ['english', 'vietnamese'],
        },
        solutionStructure: {
            type: Type.OBJECT, properties: {
                english: { type: Type.STRING, description: "Feedback on the structure: greeting, acknowledging the problem, proposing a clear solution, and closing." },
                vietnamese: { type: Type.STRING, description: "Feedback on structure in Vietnamese (Cấu trúc giải pháp)." },
            }, required: ['english', 'vietnamese'],
        },
        languageUse: {
            type: Type.OBJECT, properties: {
                english: { type: Type.STRING, description: "Feedback on grammar, vocabulary, and professional language." },
                vietnamese: { type: Type.STRING, description: "Feedback on language use in Vietnamese (Sử dụng ngôn ngữ)." },
            }, required: ['english', 'vietnamese'],
        },
        fluencyAndCohesion: {
            type: Type.OBJECT, properties: {
                english: { type: Type.STRING, description: "Feedback on fluency, pacing, and use of transition phrases." },
                vietnamese: { type: Type.STRING, description: "Feedback on fluency and cohesion in Vietnamese (Độ trôi chảy & Mạch lạc)." },
            }, required: ['english', 'vietnamese'],
        },
        intonationAndTone: {
            type: Type.OBJECT, properties: {
                english: { type: Type.STRING, description: "Feedback on professional, helpful, and reassuring tone and intonation." },
                vietnamese: { type: Type.STRING, description: "Feedback on intonation and tone in Vietnamese (Ngữ điệu & Giọng điệu)." },
            }, required: ['english', 'vietnamese'],
        },
    },
    required: ['taskScore', 'estimatedScoreBand', 'proficiencyLevel', 'generalSummary', 'solutionStructure', 'languageUse', 'fluencyAndCohesion', 'intonationAndTone'],
};

export const evaluateSpeakingPart5 = async (
    problemText: string,
    audioBase64: string, 
    mimeType: string
): Promise<SpeakingPart5EvaluationResult | null> => {
    try {
        const systemInstruction = `You are a certified rater for the TOEIC Speaking Test, specializing in Question 11, "Propose a Solution". Evaluate the user's spoken audio response to a voicemail message problem.

**Evaluation Criteria:**
1.  **Solution Effectiveness:** Did the user clearly state the problem and propose a logical, appropriate, and detailed solution?
2.  **Completeness & Structure:** Did the response follow a professional structure: greeting, acknowledging the problem, presenting a clear solution (with steps/details), and closing the message?
3.  **Language Use:** Assess grammar accuracy, range of vocabulary, and professional tone.
4.  **Cohesion & Fluency:** Evaluate the flow, pacing, and use of functional language (e.g., "First, I suggest...", "To address your concern...").
5.  **Pronunciation & Intonation:** Rate overall clarity and professional, helpful, and reassuring tone.

**Step 1: Assign a Task Score (0-5 Scale)**
- **5 (Highest):** Response is highly effective, relevant, and well-developed. Excellent language and clear delivery.
- **4:** Response is effective and clear. Good control of language and mostly clear delivery.
- **3 (Medium):** Response addresses the task but with limitations. Some language errors or delivery issues may be present.
- **2:** Response is limited. Significant errors in content, language, or delivery.
- **1 (Low):** Mostly unintelligible or irrelevant.
- **0:** No intelligible speech.

**Step 2: Estimate Score Band and Proficiency Level**
Use the Task Score to estimate an overall TOEIC Speaking Scale Score and Proficiency Level.
- Task Score 5 -> Level 8 (190-200)
- Task Score 4 -> Level 7 (160-180)
- Task Score 3 -> Level 5-6 (110-150)
- Task Score 1-2 -> Level 3-4 (60-100)
- Task Score 0 -> Level 1-2 (0-50)

**Step 3: Provide Detailed, Bilingual Feedback**
Provide concise feedback for each category in **both English and Vietnamese**.

Your final output must be a JSON object adhering to the provided schema.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: {
                parts: [
                    { text: `The user was responding to this problem: "${problemText}". Here is their audio response. Evaluate it.` },
                    { inlineData: { mimeType: mimeType, data: audioBase64 } }
                ]
            },
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: speakingPart5EvaluationSchema,
            },
        });

        const data = JSON.parse(response.text.trim());
        if (data && typeof data.taskScore === 'number') {
            return data as SpeakingPart5EvaluationResult;
        }
        return null;

    } catch (error) {
        console.error("Error evaluating Speaking Part 5 performance:", error);
        throw new Error("Failed to get evaluation from API.");
    }
};

// Writing Part 1
const writingPart1TaskPromptsSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            picturePrompt: { type: Type.STRING, description: "A detailed prompt to generate a realistic image for TOEIC Writing Part 1." },
            keywords: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "An array of exactly two keywords related to the picture."
            }
        },
        required: ['picturePrompt', 'keywords']
    }
};

export const generateWritingPart1Tasks = async (): Promise<WritingPart1Task[] | null> => {
    try {
        const prompt = `You are a TOEIC test creator. Generate a set of 5 distinct tasks for "Part 1: Write a Sentence Based on a Picture".
        For each of the 5 tasks, provide:
        1.  A detailed prompt for an image generator to create a realistic, high-quality photograph of a common, everyday scene (e.g., people in an office, an outdoor market, a street view). The prompt should describe a clear central action.
        2.  Two relevant keywords (single words or short phrases) that a test-taker would use to describe the main action or objects in the image.

        Return the result as a JSON array of 5 objects, where each object has a 'picturePrompt' and a 'keywords' array with exactly two strings.`;
        
        const promptResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: writingPart1TaskPromptsSchema,
            },
        });
        
        const taskPrompts = JSON.parse(promptResponse.text.trim());
        if (!taskPrompts || taskPrompts.length !== 5) {
            throw new Error("Failed to generate the correct number of task prompts.");
        }

        const tasks: WritingPart1Task[] = [];

        for (const task of taskPrompts) {
            const imageResponse = await ai.models.generateImages({
                model: 'imagen-4.0-generate-001',
                prompt: task.picturePrompt,
                config: {
                    numberOfImages: 1,
                    outputMimeType: 'image/jpeg',
                    aspectRatio: '4:3',
                },
            });

            const base64ImageBytes = imageResponse.generatedImages?.[0]?.image?.imageBytes;
            if (base64ImageBytes) {
                tasks.push({
                    picture: `data:image/jpeg;base64,${base64ImageBytes}`,
                    keywords: task.keywords as [string, string],
                });
            } else {
                // If an image fails, we might want to skip it or throw an error.
                // For simplicity, we'll continue, but this could be handled more robustly.
                console.warn(`Failed to generate image for prompt: ${task.picturePrompt}`);
            }
        }
        
        if (tasks.length < 5) {
             throw new Error("Failed to generate all 5 required images.");
        }

        return tasks;

    } catch (error) {
        console.error("Error generating Writing Part 1 tasks:", error);
        throw new Error("Failed to generate tasks from API.");
    }
};

const writingPart1EvaluationSchema = {
    type: Type.OBJECT,
    properties: {
        totalRawScore: { type: Type.INTEGER },
        estimatedScoreBand: { type: Type.STRING },
        proficiencyLevel: { type: Type.STRING },
        overallSummary: {
            type: Type.OBJECT,
            properties: {
                english: { type: Type.STRING },
                vietnamese: { type: Type.STRING }
            },
            required: ['english', 'vietnamese']
        },
        questionFeedback: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    score: { type: Type.INTEGER },
                    grammar: {
                        type: Type.OBJECT,
                        properties: {
                            english: { type: Type.STRING },
                            vietnamese: { type: Type.STRING }
                        },
                        required: ['english', 'vietnamese']
                    },
                    relevance: {
                        type: Type.OBJECT,
                        properties: {
                            english: { type: Type.STRING },
                            vietnamese: { type: Type.STRING }
                        },
                        required: ['english', 'vietnamese']
                    }
                },
                required: ['score', 'grammar', 'relevance']
            }
        }
    },
    required: ['totalRawScore', 'estimatedScoreBand', 'proficiencyLevel', 'overallSummary', 'questionFeedback']
};


export const evaluateWritingPart1 = async (tasks: WritingPart1Task[], userSentences: string[]): Promise<WritingPart1EvaluationResult | null> => {
    try {
        const systemInstruction = `You are a certified rater for the TOEIC Writing Test, specializing in "Part 1: Write a Sentence Based on a Picture". Evaluate a set of 5 sentences written by a user.

**Evaluation Criteria (for each sentence):**
1.  **Grammar (0-3 scale):** Evaluate accuracy in sentence structure, verb tense, subject-verb agreement, punctuation, etc.
2.  **Relevance (0-3 scale):** Evaluate if the sentence accurately describes the picture and correctly uses both provided keywords.

**Step 1: Assign a Score for Each of the 5 Sentences (0-3 Scale)**
- **3 (High):** The sentence is grammatically correct and highly relevant.
- **2 (Medium):** The sentence has minor grammatical errors or is only partially relevant.
- **1 (Low):** The sentence has significant grammatical errors or is largely irrelevant.
- **0 (None):** The response is blank, incomprehensible, or completely irrelevant.

**Step 2: Calculate Total Raw Score**
Sum the scores from the 5 questions to get a total raw score out of 15.

**Step 3: Estimate Overall Score Band and Proficiency Level**
Use the total raw score to estimate an overall TOEIC Writing Scale Score (0-200) and Proficiency Level (1-9) based on this mapping:
- Raw Score 14-15 -> 190-200 (Level 9)
- Raw Score 12-13 -> 170-180 (Level 8)
- Raw Score 10-11 -> 140-160 (Level 7)
- Raw Score 8-9   -> 110-130 (Level 6)
- Raw Score 6-7   -> 90-100 (Level 5)
- Raw Score 4-5   -> 70-80 (Level 4)
- Raw Score 0-3   -> 0-60 (Levels 1-3)

**Step 4: Provide Detailed, Bilingual Feedback**
For each of the 5 questions, provide feedback on Grammar and Relevance in **both English and Vietnamese**. Also provide an overall summary.

Your final output must be a single JSON object adhering to the provided schema.`;

        const parts: any[] = [{ text: "Evaluate these 5 written responses for the TOEIC Writing Part 1 task. For each question, I'll provide the keywords and the user's sentence, followed by the image." }];
        
        tasks.forEach((task, index) => {
            parts.push({
                text: `Question ${index + 1}:
                Keywords: [${task.keywords.join(', ')}]
                User Sentence: "${userSentences[index] || '(No answer provided)'}"
                Image for Question ${index + 1}:`
            });
            parts.push({
                inlineData: {
                    mimeType: 'image/jpeg',
                    data: task.picture.split(',')[1] // remove 'data:image/jpeg;base64,'
                }
            });
        });

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: { parts },
            config: {
                systemInstruction,
                responseMimeType: "application/json",
                responseSchema: writingPart1EvaluationSchema,
            },
        });
        
        const data = JSON.parse(response.text.trim());
        if (data && data.questionFeedback?.length === 5) {
            return data as WritingPart1EvaluationResult;
        }
        return null;

    } catch (error) {
        console.error("Error evaluating Writing Part 1:", error);
        throw new Error("Failed to get evaluation from API.");
    }
};

// --- Writing Part 2 ---

const writingPart2TaskSchema = {
    type: Type.OBJECT,
    properties: {
        question6: {
            type: Type.OBJECT,
            properties: {
                title: { type: Type.STRING, description: "Title for the request (e.g., 'Request for Information')." },
                requestText: { type: Type.STRING, description: "The full text of a simple, straightforward email/memo request for Question 6." }
            },
            required: ['title', 'requestText']
        },
        question7: {
            type: Type.OBJECT,
            properties: {
                title: { type: Type.STRING, description: "Title for the request (e.g., 'Problem with Schedule')." },
                requestText: { type: Type.STRING, description: "The full text of a more complex email/memo for Question 7, requiring a solution or justification." }
            },
            required: ['title', 'requestText']
        }
    },
    required: ['question6', 'question7']
};

export const generateWritingPart2Tasks = async (): Promise<WritingPart2Task | null> => {
    try {
        const prompt = `You are a TOEIC test creator. Generate a set of 2 tasks for "Part 2: Respond to a Written Request".
        1. For Question 6, create a simple, straightforward request email that requires providing information or confirming details.
        2. For Question 7, create a more complex request email that requires resolving a conflict, proposing a solution, or offering an opinion/justification.
        Return the result as a single JSON object.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: writingPart2TaskSchema,
            },
        });

        const data = JSON.parse(response.text.trim());
        if (data && data.question6 && data.question7) {
            return data as WritingPart2Task;
        }
        return null;

    } catch (error) {
        console.error("Error generating Writing Part 2 tasks:", error);
        throw new Error("Failed to generate tasks from API.");
    }
};

const writingPart2EvaluationSchema = {
    type: Type.OBJECT,
    properties: {
        totalRawScore: { type: Type.INTEGER },
        estimatedScoreBand: { type: Type.STRING },
        overallSummary: {
            type: Type.OBJECT,
            properties: {
                english: { type: Type.STRING },
                vietnamese: { type: Type.STRING }
            },
            required: ['english', 'vietnamese']
        },
        question6Feedback: {
            type: Type.OBJECT,
            properties: {
                score: { type: Type.INTEGER },
                requestSummary: { type: Type.STRING },
                completeness: {
                    type: Type.OBJECT, properties: { english: { type: Type.STRING }, vietnamese: { type: Type.STRING }}, required: ['english', 'vietnamese']
                },
                languageUse: {
                    type: Type.OBJECT, properties: { english: { type: Type.STRING }, vietnamese: { type: Type.STRING }}, required: ['english', 'vietnamese']
                }
            },
            required: ['score', 'requestSummary', 'completeness', 'languageUse']
        },
        question7Feedback: {
            type: Type.OBJECT,
            properties: {
                score: { type: Type.INTEGER },
                requestSummary: { type: Type.STRING },
                completeness: {
                    type: Type.OBJECT, properties: { english: { type: Type.STRING }, vietnamese: { type: Type.STRING }}, required: ['english', 'vietnamese']
                },
                languageUse: {
                    type: Type.OBJECT, properties: { english: { type: Type.STRING }, vietnamese: { type: Type.STRING }}, required: ['english', 'vietnamese']
                },
                organization: {
                    type: Type.OBJECT, properties: { english: { type: Type.STRING }, vietnamese: { type: Type.STRING }}, required: ['english', 'vietnamese']
                },
                tone: {
                    type: Type.OBJECT, properties: { english: { type: Type.STRING }, vietnamese: { type: Type.STRING }}, required: ['english', 'vietnamese']
                }
            },
            required: ['score', 'requestSummary', 'completeness', 'languageUse', 'organization', 'tone']
        }
    },
    required: ['totalRawScore', 'estimatedScoreBand', 'overallSummary', 'question6Feedback', 'question7Feedback']
};


export const evaluateWritingPart2 = async (tasks: WritingPart2Task, userResponses: string[]): Promise<WritingPart2EvaluationResult | null> => {
     try {
        const systemInstruction = `You are a certified rater for the TOEIC Writing Test, specializing in "Part 2: Respond to a Written Request". Evaluate two user-written emails based on two provided request prompts.

**Evaluation Criteria (for each response):**
1.  **Completeness & Organization:** Does the response address all parts of the request? Is it logically organized with a clear greeting, main points, and closing?
2.  **Language Use (Grammar & Vocabulary):** Is the grammar accurate? Is the vocabulary appropriate, varied, and precise for a business context?
3.  **Tone & Register:** Is the tone suitable for a professional communication?
4.  **Sentence Quality:** Is there a variety of clear, effective sentence structures?

**Step 1: Assign a Score for Each of the 2 Responses (0-4 Scale)**
- **4 (High):** Clearly and effectively addresses the task. Well-organized, good control of grammar and vocabulary.
- **3 (Good):** Addresses the task. Generally organized, good grammar/vocab with some minor errors.
- **2 (Fair):** Addresses the task, but with limitations. May have issues with organization, grammar, or vocabulary that obscure meaning.
- **1 (Limited):** Attempts to address the task, but is very limited and difficult to understand.
- **0 (None):** Blank, incomprehensible, or completely irrelevant.

**Step 2: Calculate Total Raw Score**
Sum the scores from the 2 questions to get a total raw score out of 8.

**Step 3: Estimate Overall Score Band**
Use the total raw score to estimate an overall TOEIC Writing Scale Score (0-200) and Proficiency Level.
- Raw Score 7-8 -> 180-200 (Level 9)
- Raw Score 6   -> 150-170 (Level 8)
- Raw Score 5   -> 120-140 (Level 7)
- Raw Score 4   -> 90-110 (Level 6)
- Raw Score 3   -> 70-80 (Level 5)
- Raw Score 0-2 -> 0-60 (Levels 1-4)

**Step 4: Provide Detailed, Bilingual Feedback**
For each question, provide a short summary of the original request, and then provide feedback on Completeness, Language Use, Organization, and Tone in **both English and Vietnamese**. Also provide an overall summary.

Your final output must be a single JSON object.`;
        
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Evaluate these two written responses for the TOEIC Writing Part 2 task.

---
**Question 6 Request:**
Title: ${tasks.question6.title}
Text: ${tasks.question6.requestText}

**User Response for Question 6:**
"${userResponses[0] || '(No answer provided)'}"
---
**Question 7 Request:**
Title: ${tasks.question7.title}
Text: ${tasks.question7.requestText}

**User Response for Question 7:**
"${userResponses[1] || '(No answer provided)'}"
---
`,
            config: {
                systemInstruction,
                responseMimeType: "application/json",
                responseSchema: writingPart2EvaluationSchema,
            },
        });
        
        const data = JSON.parse(response.text.trim());
        if (data && data.question6Feedback && data.question7Feedback) {
            return data as WritingPart2EvaluationResult;
        }
        return null;

    } catch (error) {
        console.error("Error evaluating Writing Part 2:", error);
        throw new Error("Failed to get evaluation from API.");
    }
};

// --- Writing Part 3 ---
const writingPart3TaskSchema = {
    type: Type.OBJECT,
    properties: {
        question: {
            type: Type.STRING,
            description: "The full text of an opinion essay prompt for TOEIC Writing Question 8. It should present a debatable statement and ask for the user's opinion with reasons and examples."
        }
    },
    required: ['question']
};

export const generateWritingPart3Task = async (): Promise<WritingPart3Task | null> => {
    try {
        const prompt = `Generate an opinion essay prompt for the TOEIC Writing test (Question 8). 
        The prompt should present a debatable statement on a common social, professional, or general interest topic. 
        It must ask the test-taker to state, support, and explain their opinion, using specific reasons and examples.
        Example topic areas: technology in the workplace, urban vs. rural living, education policies, environmental issues.
        Return the result as a single JSON object.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: writingPart3TaskSchema,
            },
        });

        const data = JSON.parse(response.text.trim());
        if (data && data.question) {
            return data as WritingPart3Task;
        }
        return null;

    } catch (error) {
        console.error("Error generating Writing Part 3 task:", error);
        throw new Error("Failed to generate task from API.");
    }
};


const writingPart3EvaluationSchema = {
    type: Type.OBJECT,
    properties: {
        taskScore: { type: Type.INTEGER },
        estimatedScoreBand: { type: Type.STRING },
        overallSummary: {
            type: Type.OBJECT, properties: { english: { type: Type.STRING }, vietnamese: { type: Type.STRING } }, required: ['english', 'vietnamese']
        },
        ideaDevelopment: {
            type: Type.OBJECT, properties: { english: { type: Type.STRING }, vietnamese: { type: Type.STRING } }, required: ['english', 'vietnamese']
        },
        organization: {
            type: Type.OBJECT, properties: { english: { type: Type.STRING }, vietnamese: { type: Type.STRING } }, required: ['english', 'vietnamese']
        },
        grammarAndSyntax: {
            type: Type.OBJECT, properties: { english: { type: Type.STRING }, vietnamese: { type: Type.STRING } }, required: ['english', 'vietnamese']
        },
        vocabulary: {
            type: Type.OBJECT, properties: { english: { type: Type.STRING }, vietnamese: { type: Type.STRING } }, required: ['english', 'vietnamese']
        }
    },
    required: ['taskScore', 'estimatedScoreBand', 'overallSummary', 'ideaDevelopment', 'organization', 'grammarAndSyntax', 'vocabulary']
};

export const evaluateWritingPart3 = async (prompt: string, userEssay: string): Promise<WritingPart3EvaluationResult | null> => {
    try {
        const systemInstruction = `You are a certified rater for the TOEIC Writing Test, specializing in "Question 8: Write an Opinion Essay". Evaluate the user's essay based on the provided prompt.

**Evaluation Criteria:**
1.  **Idea Development & Relevance:** Does the essay address the prompt? Is the opinion clear and well-supported with relevant reasons and examples?
2.  **Organization:** Is there a clear introduction, body, and conclusion? Are ideas logically connected with transitions?
3.  **Grammar & Syntax:** Assess accuracy, range, and complexity of grammatical structures.
4.  **Vocabulary:** Assess the appropriateness, accuracy, and variety of word choice.

**Step 1: Assign a Task Score (0-5 Scale)**
- **5:** Well-organized and developed, clear opinion, strong support, varied sentence structures, rich vocabulary.
- **4:** Generally well-organized and developed, opinion is clear, support is adequate, some minor errors in grammar/vocab.
- **3:** Addresses the topic, opinion is stated, some development, but may have organization issues or noticeable errors.
- **2:** Limited development, weak organization, frequent errors obscure meaning.
- **1:** Fails to address topic, disorganized, severe errors.
- **0:** Blank, irrelevant, or incomprehensible.

**Step 2: Estimate Overall Score Band (0-200 Scale)**
Use the Task Score to estimate an overall TOEIC Writing Scale Score and Proficiency Level.
- Score 5 -> 170-200 (Level 8-9)
- Score 4 -> 140-160 (Level 7)
- Score 3 -> 110-130 (Level 6)
- Score 2 -> 90-100 (Level 5)
- Score 1 -> 70-80 (Level 4)
- Score 0 -> 0-60 (Levels 1-3)

**Step 3: Provide Detailed, Bilingual Feedback**
For each category (Overall, Idea Development, Organization, Grammar/Syntax, Vocabulary), provide a concise critique in **both English and Vietnamese**.

Your final output must be a single JSON object.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Evaluate this essay based on the provided prompt.
            ---
            **Prompt:** ${prompt}
            ---
            **User's Essay:**
            "${userEssay || '(No answer provided)'}"
            ---`,
            config: {
                systemInstruction,
                responseMimeType: "application/json",
                responseSchema: writingPart3EvaluationSchema,
            },
        });

        const data = JSON.parse(response.text.trim());
        if (data && typeof data.taskScore === 'number') {
            return data as WritingPart3EvaluationResult;
        }
        return null;

    } catch (error) {
        console.error("Error evaluating Writing Part 3:", error);
        throw new Error("Failed to get evaluation from API.");
    }
};
