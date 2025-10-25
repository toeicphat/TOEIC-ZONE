

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { VocabularyTest, VocabItem, User, TranslationEvaluationResult, ContextMeaningSentence } from '../types';
import { updateWordSrsLevel } from '../services/vocabularyService';
import { generateSentenceForTranslation, evaluateTranslation, generateContextSentences } from '../services/geminiService';
import { BookOpenIcon, BrainIcon, ShuffleIcon, ArrowLeftIcon, ArrowRightIcon, CheckCircleIcon, XCircleIcon, GridIcon, PuzzleIcon, TypeIcon, LightBulbIcon, HeadphoneIcon, TargetIcon, LinkIcon, FlipIcon, SparklesIcon, LoadingIcon, RefreshIcon, QuestionMarkCircleIcon, TranslateIcon } from './icons';
import AudioPlayer from './AudioPlayer';
import { addTestResult } from '../services/progressService';

type StudyMode = 'flashcards' | 'listening_words' | 'quiz' | 'matching_game' | 'scrambler' | 'spelling_recall' | 'audio_dictation' | 'definition_match' | 'listening_translation' | 'context_meaning' | 'spoken_translation';

interface VocabularyTestScreenProps {
    testData: VocabularyTest;
    onBack: () => void;
    currentUser: User;
    onStartSpokenTranslationPractice: (test: VocabularyTest) => void;
}


interface QuizQuestion {
    questionText: string; // The definition
    options: string[]; // Array of words
    correctAnswer: string; // The correct word
    userAnswer: string | null;
    isCorrect: boolean | null;
}

interface ScramblerQuestion {
    scrambled: string;
    original: VocabItem;
    userAnswer: string;
    isCorrect: boolean | null;
}

interface SpellingQuestion {
    original: VocabItem;
    userAnswer: string;
    isCorrect: boolean | null;
    revealedCount: number;
}

interface AudioDictationQuestion {
    original: VocabItem;
    userAnswer: string;
    isCorrect: boolean | null;
    meaningRevealed: boolean;
}

interface ContextQuestion {
    original: VocabItem;
    sentence: string;
    userAnswer: string;
    isChecked: boolean;
}

// For Listening Words
type ListeningWordQuestion = {
    correctWord: VocabItem;
    options: VocabItem[];
    userAnswer: VocabItem | null;
};

const shuffleArray = <T,>(array: T[]): T[] => {
    return [...array].sort(() => Math.random() - 0.5);
};

const WORDS_PER_MATCHING_TURN = 6;
type MatchingItem = { item: VocabItem; type: 'word' | 'definition' };

const WORDS_PER_DMATCH_TURN = 8;
type DMatchItemType = { item: VocabItem; type: 'word' | 'definition' };

const HintBox: React.FC<{onClose: () => void}> = ({onClose}) => (
    <div className="bg-blue-50 dark:bg-slate-800/50 border-l-4 border-blue-500 text-blue-800 dark:text-blue-300 p-4 rounded-r-lg mb-6 relative">
        <div className="flex">
            <div className="flex-shrink-0">
                <LightBulbIcon className="h-6 w-6 text-blue-500" />
            </div>
            <div className="ml-3">
                <h3 className="text-lg font-bold">Pro Tip: Listen & Translate</h3>
                <p className="text-sm mt-1">Listen to the sentence multiple times to catch the rhythm and key words. Translate the meaning, not just word-for-word. It's okay if your translation isn't perfect; the AI will give you feedback on grammar and vocabulary choice.</p>
            </div>
        </div>
        <button onClick={onClose} className="absolute top-2 right-2 p-1 rounded-full hover:bg-blue-100 dark:hover:bg-slate-700" aria-label="Close hint">
            <XCircleIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </button>
    </div>
);

const WordCountModal: React.FC<{
  maxWords: number;
  onStart: (count: number) => void;
}> = ({ maxWords, onStart }) => {
  const [inputValue, setInputValue] = useState('20');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleStartClick = () => {
    let count = parseInt(inputValue, 10);
    if (isNaN(count) || count <= 0) {
      count = 20; // Default if invalid
    }
    onStart(Math.min(count, maxWords));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleStartClick();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-xl w-full max-w-sm text-center">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
          Xin hãy nhập số lượng từ bạn muốn học cho lượt này
        </h3>
        <input
          ref={inputRef}
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full text-center text-3xl font-bold p-3 border-2 border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
          placeholder={`Tối đa ${maxWords}`}
          min="1"
          max={maxWords}
        />
        <button
          onClick={handleStartClick}
          className="mt-6 w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Bắt đầu
        </button>
      </div>
    </div>
  );
};


const VocabularyTestScreen: React.FC<VocabularyTestScreenProps> = ({ testData, onBack, currentUser, onStartSpokenTranslationPractice }) => {
    const [wordCount, setWordCount] = useState<number | null>(() => testData.words.length <= 30 ? testData.words.length : null);

    const wordsForSession = useMemo(() => {
        if (!wordCount) return [];
        const words = testData.words;
        return shuffleArray(words).slice(0, wordCount);
    }, [testData.words, wordCount]);

    const [mode, setMode] = useState<StudyMode>('flashcards');
    const [deck, setDeck] = useState<VocabItem[]>(wordsForSession);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
    const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [isQuizSessionFinished, setIsQuizSessionFinished] = useState(false);

    // State for matching game
    const [fullMatchingDeck, setFullMatchingDeck] = useState<VocabItem[]>([]);
    const [matchingTurn, setMatchingTurn] = useState(0);
    const [currentTurnItems, setCurrentTurnItems] = useState<VocabItem[]>([]);
    const [matchingGridItems, setMatchingGridItems] = useState<MatchingItem[]>([]);
    const [selectedMatchingItem, setSelectedMatchingItem] = useState<MatchingItem | null>(null);
    const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
    const [incorrectPairItems, setIncorrectPairItems] = useState<{ item1: MatchingItem, item2: MatchingItem } | null>(null);
    const [isGameFinished, setIsGameFinished] = useState(false);
    const [isTurnFinished, setIsTurnFinished] = useState(false);

    // State for scrambler game
    const [scramblerQuestions, setScramblerQuestions] = useState<ScramblerQuestion[]>([]);
    const [currentScramblerIndex, setCurrentScramblerIndex] = useState(0);
    const [scramblerScore, setScramblerScore] = useState(0);
    const [isScramblerSessionFinished, setIsScramblerSessionFinished] = useState(false);

    // State for spelling recall game
    const [spellingQuestions, setSpellingQuestions] = useState<SpellingQuestion[]>([]);
    const [currentSpellingIndex, setCurrentSpellingIndex] = useState(0);
    const [spellingScore, setSpellingScore] = useState(0);
    const [isSpellingSessionFinished, setIsSpellingSessionFinished] = useState(false);

    // State for audio dictation game
    const [audioDictationQuestions, setAudioDictationQuestions] = useState<AudioDictationQuestion[]>([]);
    const [currentAudioDictationIndex, setCurrentAudioDictationIndex] = useState(0);
    const [audioDictationScore, setAudioDictationScore] = useState(0);
    const [isAudioDictationSessionFinished, setIsAudioDictationSessionFinished] = useState(false);
    
    // State for Listening Words mode
    const [listeningWordsQuestions, setListeningWordsQuestions] = useState<ListeningWordQuestion[]>([]);
    const [currentListeningWordIndex, setCurrentListeningWordIndex] = useState(0);
    const [isListeningWordsSessionFinished, setIsListeningWordsSessionFinished] = useState(false);
    const [autoAdvance, setAutoAdvance] = useState(false);

    // State for Definition Match
    const [fullDMatchDeck, setFullDMatchDeck] = useState<VocabItem[]>([]);
    const [dMatchTurn, setDMatchTurn] = useState(0);
    const [dMatchWords, setDMatchWords] = useState<DMatchItemType[]>([]);
    const [dMatchDefinitions, setDMatchDefinitions] = useState<DMatchItemType[]>([]);
    const [selectedDMatchWord, setSelectedDMatchWord] = useState<DMatchItemType | null>(null);
    const [correctDMatches, setCorrectDMatches] = useState<string[]>([]); // array of word strings
    const [incorrectDMatchPair, setIncorrectDMatchPair] = useState<string[] | null>(null); // [word, definition]
    const [isDMatchGameFinished, setIsDMatchGameFinished] = useState(false);
    const [isDMatchTurnFinished, setIsDMatchTurnFinished] = useState(false);

    // State for Listening & Translation
    type ListeningTranslationState = 'generating' | 'answering' | 'evaluating' | 'result';
    const [ltState, setLtState] = useState<ListeningTranslationState>('generating');
    const [ltError, setLtError] = useState<string | null>(null);
    const [originalSentence, setOriginalSentence] = useState<string>('');
    const [userTranslation, setUserTranslation] = useState<string>('');
    const [ltEvaluation, setLtEvaluation] = useState<TranslationEvaluationResult | null>(null);
    const [showHint, setShowHint] = useState(true);

    const [contextQuestions, setContextQuestions] = useState<ContextQuestion[]>([]);
    const [currentContextIndex, setCurrentContextIndex] = useState(0);
    const [isContextGenerating, setIsContextGenerating] = useState(false);
    const [contextError, setContextError] = useState<string | null>(null);
    const [autoAdvanceContext, setAutoAdvanceContext] = useState(false);

    const handleStartSession = useCallback((count: number) => {
        setWordCount(count);
    }, []);

    const generateQuizQuestions = useCallback(() => {
        const shuffledWords = shuffleArray(wordsForSession);
        const questions = shuffledWords.map((correctItem: VocabItem) => {
            const distractors = shuffleArray(wordsForSession.filter((w: VocabItem) => w.word !== correctItem.word)).slice(0, 3).map((d: VocabItem) => d.word);
            const options = shuffleArray([correctItem.word, ...distractors]);
            return {
                questionText: correctItem.definition,
                options: options,
                correctAnswer: correctItem.word,
                userAnswer: null,
                isCorrect: null,
            };
        });
        setQuizQuestions(questions);
    }, [wordsForSession]);
    
    const startQuizSession = useCallback(() => {
        generateQuizQuestions();
        setCurrentQuizIndex(0);
        setScore(0);
        setIsQuizSessionFinished(false);
    }, [generateQuizQuestions]);
    
    const generateListeningWordsQuestions = useCallback(() => {
        const shuffledWords = shuffleArray(wordsForSession);
        const questions = shuffledWords.map((correctItem: VocabItem) => {
            const distractors = shuffleArray(wordsForSession.filter((w: VocabItem) => w.word !== correctItem.word)).slice(0, 8);
            const options = shuffleArray([correctItem, ...distractors]);
            return {
                correctWord: correctItem,
                // FIX: Removed redundant ternary as `options` will always have at least one item. This fixes a type inference issue.
                options: options,
                userAnswer: null,
            };
        });
        setListeningWordsQuestions(questions);
    }, [wordsForSession]);

    const startListeningWordsSession = useCallback(() => {
        generateListeningWordsQuestions();
        setCurrentListeningWordIndex(0);
        setIsListeningWordsSessionFinished(false);
    }, [generateListeningWordsQuestions]);


    const setupMatchingTurn = useCallback((deck: VocabItem[], turn: number) => {
        const startIndex = turn * WORDS_PER_MATCHING_TURN;
        const turnItems = deck.slice(startIndex, startIndex + WORDS_PER_MATCHING_TURN);

        if (turnItems.length === 0) {
            setIsGameFinished(true);
            return;
        }

        const wordsForGrid = turnItems.map(item => ({ item, type: 'word' as const }));
        const defsForGrid = turnItems.map(item => ({ item, type: 'definition' as const }));
        
        setMatchingGridItems(shuffleArray([...wordsForGrid, ...defsForGrid]));
        setCurrentTurnItems(turnItems);
        
        setMatchingTurn(turn);
        setSelectedMatchingItem(null);
        setMatchedPairs([]);
        setIncorrectPairItems(null);
        setIsGameFinished(false);
        setIsTurnFinished(false);
    }, []);

    const startMatchingGame = useCallback(() => {
        const shuffledDeck = shuffleArray(wordsForSession);
        setFullMatchingDeck(shuffledDeck);
        setupMatchingTurn(shuffledDeck, 0);
    }, [wordsForSession, setupMatchingTurn]);
    
    const scrambleWord = (word: string): string => {
        if (word.length <= 1) return word;
        let scrambled: string;
        let attempts = 0;
        do {
            scrambled = word.split('').sort(() => Math.random() - 0.5).join('');
            attempts++;
        } while (scrambled === word && attempts < 10); // Prevent infinite loop on short words
        return scrambled;
    };

    const generateScramblerQuestions = useCallback(() => {
        const shuffledWords = shuffleArray(wordsForSession);
        const questions = shuffledWords.map((item: VocabItem) => ({
            scrambled: scrambleWord(item.word),
            original: item,
            userAnswer: '',
            isCorrect: null,
        }));
        setScramblerQuestions(questions);
    }, [wordsForSession]);

    const startScramblerGame = useCallback(() => {
        generateScramblerQuestions();
        setCurrentScramblerIndex(0);
        setScramblerScore(0);
        setIsScramblerSessionFinished(false);
    }, [generateScramblerQuestions]);

    const handleShuffleScrambler = useCallback(() => {
        const unansweredQuestions = scramblerQuestions.slice(currentScramblerIndex).filter(q => q.isCorrect === null);
        if (unansweredQuestions.length < 2) {
            setToastMessage("Not enough words left to shuffle!");
            setTimeout(() => setToastMessage(null), 2000);
            return;
        }
    
        setScramblerQuestions(prev => {
            const currentItem = prev[currentScramblerIndex];
            const remainingItems = [
                ...prev.slice(0, currentScramblerIndex),
                ...prev.slice(currentScramblerIndex + 1)
            ];
            return [...remainingItems, currentItem];
        });
    }, [scramblerQuestions, currentScramblerIndex]);

    const generateSpellingQuestions = useCallback(() => {
        const shuffledWords = shuffleArray(wordsForSession);
        const questions = shuffledWords.map((item: VocabItem) => ({
            original: item,
            userAnswer: '',
            isCorrect: null,
            revealedCount: 0,
        }));
        setSpellingQuestions(questions);
    }, [wordsForSession]);

    const startSpellingGame = useCallback(() => {
        generateSpellingQuestions();
        setCurrentSpellingIndex(0);
        setSpellingScore(0);
        setIsSpellingSessionFinished(false);
    }, [generateSpellingQuestions]);
    
    const generateAudioDictationQuestions = useCallback(() => {
        const shuffledWords = shuffleArray(wordsForSession);
        const questions = shuffledWords.map((item: VocabItem) => ({
            original: item,
            userAnswer: '',
            isCorrect: null,
            meaningRevealed: false,
        }));
        setAudioDictationQuestions(questions);
    }, [wordsForSession]);

    const startAudioDictationGame = useCallback(() => {
        generateAudioDictationQuestions();
        setCurrentAudioDictationIndex(0);
        setAudioDictationScore(0);
        setIsAudioDictationSessionFinished(false);
    }, [generateAudioDictationQuestions]);

    const setupDMatchTurn = useCallback((deck: VocabItem[], turn: number) => {
        const startIndex = turn * WORDS_PER_DMATCH_TURN;
        const turnItems = deck.slice(startIndex, startIndex + WORDS_PER_DMATCH_TURN);

        if (turnItems.length === 0) {
            setIsDMatchGameFinished(true);
            return;
        }
        
        setDMatchWords(turnItems.map(item => ({ item, type: 'word' as const })));
        setDMatchDefinitions(shuffleArray(turnItems).map(item => ({ item, type: 'definition' as const })));
        
        setFullDMatchDeck(deck);
        setDMatchTurn(turn);
        setSelectedDMatchWord(null);
        setCorrectDMatches([]);
        setIncorrectDMatchPair(null);
        setIsDMatchGameFinished(false);
        setIsDMatchTurnFinished(false);
    }, []);

    const startDMatchGame = useCallback(() => {
        const shuffledDeck = shuffleArray(wordsForSession);
        setupDMatchTurn(shuffledDeck, 0);
    }, [wordsForSession, setupDMatchTurn]);
    
    const generateNewLtExercise = useCallback(async () => {
        setLtState('generating');
        setLtError(null);
        setUserTranslation('');
        setLtEvaluation(null);
        setShowHint(true);
        try {
            const sentence = await generateSentenceForTranslation(wordsForSession);
            if (sentence) {
                setOriginalSentence(sentence);
                setLtState('answering');
            } else {
                throw new Error("Failed to generate a sentence.");
            }
        } catch (err) {
            console.error(err);
            setLtError("Could not generate a new exercise. Please try again.");
            setLtState('answering');
        }
    }, [wordsForSession]);

    const generateContextMeaningExercise = useCallback(async () => {
        if (wordsForSession.length === 0) return;
        setIsContextGenerating(true);
        setContextError(null);
        setContextQuestions([]);
        try {
            const sentences = await generateContextSentences(wordsForSession);
            if (sentences && sentences.length > 0) {
                const questions: ContextQuestion[] = wordsForSession.map(wordItem => {
                    const foundSentence = sentences.find(s => s.word.toLowerCase() === wordItem.word.toLowerCase());
                    return {
                        original: wordItem,
                        sentence: foundSentence ? foundSentence.sentence : `Could not generate a sentence for **${wordItem.word}**.`,
                        userAnswer: '',
                        isChecked: false
                    };
                });
                setContextQuestions(shuffleArray(questions));
                setCurrentContextIndex(0);
            } else {
                throw new Error("AI did not return valid sentences.");
            }
        } catch (err) {
            console.error(err);
            setContextError("An error occurred while generating the AI exercise. Please try again.");
        } finally {
            setIsContextGenerating(false);
        }
    }, [wordsForSession]);

    useEffect(() => {
        setDeck(wordsForSession);
        setCurrentCardIndex(0);
        setIsFlipped(false);
        if (mode === 'quiz') startQuizSession();
        if (mode === 'listening_words') startListeningWordsSession();
        if (mode === 'matching_game') startMatchingGame();
        if (mode === 'scrambler') startScramblerGame();
        if (mode === 'spelling_recall') startSpellingGame();
        if (mode === 'audio_dictation') startAudioDictationGame();
        if (mode === 'definition_match') startDMatchGame();
        if (mode === 'listening_translation') generateNewLtExercise();
        if (mode === 'context_meaning') generateContextMeaningExercise();
    }, [mode, wordsForSession, startQuizSession, startListeningWordsSession, startMatchingGame, startScramblerGame, startSpellingGame, startAudioDictationGame, startDMatchGame, generateNewLtExercise, generateContextMeaningExercise]);
    
    useEffect(() => {
        if (isQuizSessionFinished && currentUser && quizQuestions.length > 0) {
            addTestResult(currentUser.username, 'vocabulary', {
                id: `vocab-quiz-${testData.id}-${Date.now()}`,
                title: `${testData.title} (Quiz)`,
                score,
                total: quizQuestions.length,
                date: Date.now()
            });
        }
    }, [isQuizSessionFinished, currentUser, testData.id, testData.title, score, quizQuestions.length]);

    useEffect(() => {
        if (isScramblerSessionFinished && currentUser && scramblerQuestions.length > 0) {
            addTestResult(currentUser.username, 'vocabulary', {
                id: `vocab-scrambler-${testData.id}-${Date.now()}`,
                title: `${testData.title} (Scrambler)`,
                score: scramblerScore,
                total: scramblerQuestions.length,
                date: Date.now()
            });
        }
    }, [isScramblerSessionFinished, currentUser, testData.id, testData.title, scramblerScore, scramblerQuestions.length]);
    
    useEffect(() => {
        if (isSpellingSessionFinished && currentUser && spellingQuestions.length > 0) {
             const totalPossibleScore = spellingQuestions.reduce((sum, q) => sum + q.original.word.length, 0);
            addTestResult(currentUser.username, 'vocabulary', {
                id: `vocab-spelling-${testData.id}-${Date.now()}`,
                title: `${testData.title} (Spelling)`,
                score: spellingScore,
                total: totalPossibleScore,
                date: Date.now()
            });
        }
    }, [isSpellingSessionFinished, currentUser, testData.id, testData.title, spellingScore, spellingQuestions]);

    useEffect(() => {
        if (isAudioDictationSessionFinished && currentUser && audioDictationQuestions.length > 0) {
            const totalPossibleScore = audioDictationQuestions.length * 2;
            addTestResult(currentUser.username, 'vocabulary', {
                id: `vocab-audio-${testData.id}-${Date.now()}`,
                title: `${testData.title} (Audio Dictation)`,
                score: audioDictationScore,
                total: totalPossibleScore,
                date: Date.now()
            });
        }
    }, [isAudioDictationSessionFinished, currentUser, testData.id, testData.title, audioDictationScore, audioDictationQuestions.length]);

    const handleWordPractice = useCallback((word: VocabItem, performance: 'good' | 'hard') => {
        const wordId = word.word.toLowerCase();
        updateWordSrsLevel(wordId, performance, word, `From '${testData.title}' list.`);
    }, [testData.title]);
    
    const handleNextCard = () => {
        setIsFlipped(false);
        setCurrentCardIndex(prev => (prev + 1) % deck.length);
    };

    const handlePrevCard = () => {
        setIsFlipped(false);
        setCurrentCardIndex(prev => (prev - 1 + deck.length) % deck.length);
    };

    const handleShuffle = () => {
        setDeck(shuffleArray(deck));
        setCurrentCardIndex(0);
        setIsFlipped(false);
    };
    
    const handleQuizAnswer = (selectedOption: string) => {
        if (quizQuestions[currentQuizIndex].userAnswer !== null) return;

        const currentQuestion = quizQuestions[currentQuizIndex];
        const isCorrect = selectedOption === currentQuestion.correctAnswer;

        if (isCorrect) {
            setScore(prev => prev + 1);
        }
        
        const vocabItem = wordsForSession.find(w => w.word === currentQuestion.correctAnswer);
        if (vocabItem) {
            handleWordPractice(vocabItem, isCorrect ? 'good' : 'hard');
        }

        const updatedQuestions = [...quizQuestions];
        updatedQuestions[currentQuizIndex] = { ...currentQuestion, userAnswer: selectedOption, isCorrect };
        setQuizQuestions(updatedQuestions);

        setTimeout(() => {
            if (currentQuizIndex + 1 < quizQuestions.length) {
                setCurrentQuizIndex(prev => prev + 1);
            } else {
                setIsQuizSessionFinished(true);
            }
        }, 1500);
    };
    
    const handleMatchingItemSelect = (clickedItem: MatchingItem) => {
        if (matchedPairs.includes(clickedItem.item.word) || incorrectPairItems) return;

        if (!selectedMatchingItem) {
            setSelectedMatchingItem(clickedItem);
        } else {
            if (selectedMatchingItem.item.word === clickedItem.item.word && selectedMatchingItem.type !== clickedItem.type) {
                // Match
                const newMatchedPairs = [...matchedPairs, clickedItem.item.word];
                setMatchedPairs(newMatchedPairs);
                setSelectedMatchingItem(null);
                if (newMatchedPairs.length === currentTurnItems.length) {
                    setIsTurnFinished(true);
                }
            } else {
                // Mismatch
                setIncorrectPairItems({ item1: selectedMatchingItem, item2: clickedItem });
                setSelectedMatchingItem(null);
                setTimeout(() => {
                    setIncorrectPairItems(null);
                }, 1000);
            }
        }
    };

    // Scrambler handlers
    const handleScramblerInputChange = (index: number, value: string) => {
        const newQuestions = [...scramblerQuestions];
        newQuestions[index].userAnswer = value;
        setScramblerQuestions(newQuestions);
    };

    const handleScramblerSubmit = (index: number) => {
        const question = scramblerQuestions[index];
        const isCorrect = question.userAnswer.trim().toLowerCase() === question.original.word.toLowerCase();
        
        const newQuestions = [...scramblerQuestions];
        newQuestions[index].isCorrect = isCorrect;
        setScramblerQuestions(newQuestions);
        
        if(isCorrect) setScramblerScore(s => s + 1);

        setTimeout(() => {
            if (currentScramblerIndex + 1 < scramblerQuestions.length) {
                setCurrentScramblerIndex(prev => prev + 1);
            } else {
                setIsScramblerSessionFinished(true);
            }
        }, 1000);
    };
    
    // Spelling Recall handlers
    const handleSpellingInputChange = (index: number, value: string) => {
        const newQuestions = [...spellingQuestions];
        newQuestions[index].userAnswer = value;
        setSpellingQuestions(newQuestions);
    };

    const handleSpellingSubmit = (index: number) => {
        const question = spellingQuestions[index];
        const isCorrect = question.userAnswer.trim().toLowerCase() === question.original.word.toLowerCase();
        
        const newQuestions = [...spellingQuestions];
        newQuestions[index].isCorrect = isCorrect;
        setSpellingQuestions(newQuestions);
        
        if (isCorrect) {
            const points = question.original.word.length - question.revealedCount;
            setSpellingScore(s => s + Math.max(0, points));
        }

        setTimeout(() => {
             if (currentSpellingIndex + 1 < spellingQuestions.length) {
                setCurrentSpellingIndex(prev => prev + 1);
            } else {
                setIsSpellingSessionFinished(true);
            }
        }, 1200);
    };
    
    const handleRevealLetter = (index: number) => {
        setSpellingQuestions(prev => {
            const newQuestions = [...prev];
            const q = newQuestions[index];
            if (q.revealedCount < q.original.word.length) {
                q.revealedCount++;
                q.userAnswer = q.original.word.substring(0, q.revealedCount);
            }
            return newQuestions;
        });
    };

    const handleAudioDictationInputChange = (index: number, value: string) => {
        const newQuestions = [...audioDictationQuestions];
        newQuestions[index].userAnswer = value;
        setAudioDictationQuestions(newQuestions);
    };

    const handleAudioDictationSubmit = (index: number) => {
        const question = audioDictationQuestions[index];
        const isCorrect = question.userAnswer.trim().toLowerCase() === question.original.word.toLowerCase();
        
        const newQuestions = [...audioDictationQuestions];
        newQuestions[index].isCorrect = isCorrect;
        setAudioDictationQuestions(newQuestions);

        let points = 0;
        if (isCorrect) {
            points = question.meaningRevealed ? 1 : 2;
        }
        setAudioDictationScore(s => s + points);

        setTimeout(() => {
             if (currentAudioDictationIndex + 1 < audioDictationQuestions.length) {
                setCurrentAudioDictationIndex(prev => prev + 1);
            } else {
                setIsAudioDictationSessionFinished(true);
            }
        }, 1200);
    };

    const handleToggleMeaning = (index: number) => {
        setAudioDictationQuestions(prev => {
            const newQuestions = [...prev];
            newQuestions[index].meaningRevealed = !newQuestions[index].meaningRevealed;
            return newQuestions;
        })
    };
    
    // Listening Words handlers
    const handleNextListeningWord = useCallback(() => {
        if (currentListeningWordIndex < listeningWordsQuestions.length - 1) {
            setCurrentListeningWordIndex(prev => prev + 1);
        } else {
            setIsListeningWordsSessionFinished(true);
        }
    }, [currentListeningWordIndex, listeningWordsQuestions.length]);

    const handleListeningWordSelect = useCallback((selectedOption: VocabItem) => {
        const currentQuestionIndex = currentListeningWordIndex;
        const question = listeningWordsQuestions[currentQuestionIndex];
        if (question.userAnswer) return; // Already answered

        const updatedQuestions = [...listeningWordsQuestions];
        updatedQuestions[currentQuestionIndex] = {
            ...question,
            userAnswer: selectedOption,
        };
        setListeningWordsQuestions(updatedQuestions);

        const isCorrect = selectedOption.word === question.correctWord.word;
        if (isCorrect && autoAdvance) {
            setTimeout(() => {
                handleNextListeningWord();
            }, 1500); // 1.5 second delay
        }
    }, [currentListeningWordIndex, listeningWordsQuestions, autoAdvance, handleNextListeningWord]);

    const handlePrevListeningWord = () => {
        if (currentListeningWordIndex > 0) {
            setCurrentListeningWordIndex(prev => prev - 1);
        }
    };


    // Definition Match handlers
    const handleDMatchWordSelect = (wordItem: DMatchItemType) => {
        if(correctDMatches.includes(wordItem.item.word)) return;
        setIncorrectDMatchPair(null);
        setSelectedDMatchWord(wordItem);
    };

    const handleDMatchDefinitionSelect = (defItem: DMatchItemType) => {
        if (!selectedDMatchWord || correctDMatches.includes(defItem.item.word)) return;

        if (selectedDMatchWord.item.word === defItem.item.word) {
            const newCorrect = [...correctDMatches, defItem.item.word];
            setCorrectDMatches(newCorrect);
            setSelectedDMatchWord(null);
            if (newCorrect.length === dMatchWords.length) {
                setIsDMatchTurnFinished(true);
            }
        } else {
            setIncorrectDMatchPair([selectedDMatchWord.item.word, defItem.item.definition]);
            setSelectedDMatchWord(null);
            setTimeout(() => setIncorrectDMatchPair(null), 1200);
        }
    };

    const handleLtSubmit = async () => {
        if (!userTranslation.trim()) {
            setLtError("Please enter your translation.");
            return;
        }
        setLtState('evaluating');
        setLtError(null);
        try {
            const result = await evaluateTranslation(originalSentence, userTranslation);
            if (result) {
                setLtEvaluation(result);
                setLtState('result');
            } else {
                throw new Error("Received an invalid evaluation from the AI.");
            }
        } catch (err) {
             console.error(err);
             setLtError("Sorry, an error occurred during evaluation. Please try again.");
             setLtState('answering');
        }
    };

    const handleContextInputChange = (value: string) => {
        const newQuestions = [...contextQuestions];
        newQuestions[currentContextIndex].userAnswer = value;
        setContextQuestions(newQuestions);
    };

    const handleCheckContextAnswer = () => {
        const newQuestions = [...contextQuestions];
        newQuestions[currentContextIndex].isChecked = true;
        setContextQuestions(newQuestions);

        if (autoAdvanceContext && currentContextIndex < contextQuestions.length - 1) {
            setTimeout(() => {
                setCurrentContextIndex(prev => prev + 1);
            }, 2500);
        }
    };

    const handleNextContext = () => {
        if (currentContextIndex < contextQuestions.length - 1) {
            setCurrentContextIndex(prev => prev + 1);
        }
    };
    
    const handlePrevContext = () => {
        if (currentContextIndex > 0) {
            setCurrentContextIndex(prev => prev + 1);
        }
    };
    
    
    // RENDER FUNCTIONS FOR EACH MODE
    
    const renderFlashcards = () => {
        const currentCard = deck[currentCardIndex];
        if (!currentCard) {
            return (
                <div className="text-center p-8 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
                    <p className="text-slate-600 dark:text-slate-400">No words selected for this session. Please go back and choose a different set or number of words.</p>
                </div>
            );
        }
        return (
            <div>
                <div 
                    className={`w-full h-80 flex flex-col items-center justify-center p-8 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 transition-transform duration-500 cursor-pointer [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
                    onClick={() => setIsFlipped(!isFlipped)}
                >
                    {/* Front */}
                    <div className="absolute w-full h-full flex flex-col items-center justify-center p-8 [backface-visibility:hidden]">
                        <span className="text-sm text-slate-500 dark:text-slate-400">Word</span>
                        <h3 className="text-5xl font-bold text-slate-800 dark:text-slate-100 tracking-tight text-center">{currentCard.word}</h3>
                    </div>
                    {/* Back */}
                    <div className="absolute w-full h-full flex flex-col items-center justify-center p-8 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                         <span className="text-sm text-slate-500 dark:text-slate-400">Definition</span>
                        <p className="text-xl text-slate-700 dark:text-slate-200 text-center">{currentCard.definition}</p>
                    </div>
                </div>
                
                <div className="flex justify-between items-center mb-6">
                    <button onClick={handlePrevCard} className="p-4 rounded-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors" aria-label="Previous card"><ArrowLeftIcon className="h-6 w-6" /></button>
                    <span className="font-semibold text-lg">{currentCardIndex + 1} / {deck.length}</span>
                    <button onClick={handleNextCard} className="p-4 rounded-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors" aria-label="Next card"><ArrowRightIcon className="h-6 w-6" /></button>
                </div>

                 <div className="flex justify-center items-center gap-4 mt-8">
                     <button onClick={() => setIsFlipped(!isFlipped)} className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 font-semibold rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600">
                        <FlipIcon className="h-5 w-5"/> Flip
                     </button>
                     <button onClick={handleShuffle} className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 font-semibold rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600">
                        <ShuffleIcon className="h-5 w-5"/> Shuffle
                     </button>
                 </div>
            </div>
        );
    };
    
    const renderListeningWords = () => {
        if (isListeningWordsSessionFinished) {
            const correctCount = listeningWordsQuestions.filter(q => q.userAnswer?.word === q.correctWord.word).length;
            return (
                <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg">
                    <div className="text-center border-b dark:border-slate-700 pb-4 mb-6">
                        <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Practice Complete!</h3>
                        <p className="text-6xl font-bold text-blue-600 dark:text-blue-400 my-4">{Math.round((correctCount / listeningWordsQuestions.length) * 100)}%</p>
                        <p className="text-lg text-slate-600 dark:text-slate-400">You got {correctCount} out of {listeningWordsQuestions.length} correct.</p>
                    </div>
                    <h4 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">Review</h4>
                    <div className="space-y-3 max-h-[60vh] overflow-y-auto p-1">
                        {listeningWordsQuestions.map((q, index) => {
                            const isCorrect = q.userAnswer?.word === q.correctWord.word;
                            return (
                                <div key={index} className="flex items-start p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                                    {isCorrect ? (
                                        <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
                                    ) : (
                                        <XCircleIcon className="h-5 w-5 text-red-500 flex-shrink-0 mt-1" />
                                    )}
                                    <div className="ml-3">
                                        <p className="font-bold text-slate-800 dark:text-slate-100">{q.correctWord.word}</p>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">{q.correctWord.definition}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <button onClick={startListeningWordsSession} className="mt-8 w-full px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
                        Practice Again
                    </button>
                </div>
            );
        }

        const currentQuestion = listeningWordsQuestions[currentListeningWordIndex];
        if (!currentQuestion) {
            return (
                <div className="text-center p-8">
                    <LoadingIcon className="h-8 w-8 animate-spin text-blue-500 mx-auto" />
                    <p className="mt-4 text-slate-600">Loading questions...</p>
                </div>
            );
        }

        const { correctWord, options, userAnswer } = currentQuestion;
        const isAnswered = userAnswer !== null;

        return (
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
                <div className="mb-6">
                    <AudioPlayer audioScript={correctWord.word} />
                </div>

                <div className="grid grid-cols-3 gap-3">
                    {options.map((option, index) => {
                        const isSelected = isAnswered && userAnswer?.word === option.word;
                        const isCorrectOption = option.word === correctWord.word;

                        let cardClass = "h-28 flex flex-col items-center justify-center p-3 text-center rounded-lg border-2 font-semibold transition-all duration-300 text-sm ";

                        if (isAnswered) {
                            if (isCorrectOption) {
                                cardClass += "bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-300 scale-105 shadow-lg";
                            } else if (isSelected) {
                                cardClass += "bg-red-100 dark:bg-red-900/50 border-red-500 text-red-800 dark:text-red-300 transform motion-safe:-translate-x-1";
                            } else {
                                cardClass += "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 opacity-50 cursor-default";
                            }
                        } else {
                            cardClass += "bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-slate-50 dark:hover:bg-slate-600/50 cursor-pointer";
                        }

                        return (
                            <button key={`${option.word}-${index}`} onClick={() => handleListeningWordSelect(option)} className={cardClass} disabled={isAnswered}>
                                <span className="text-base">{option.word}</span>
                                <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">({option.definition})</span>
                            </button>
                        );
                    })}
                </div>

                <div className="flex justify-between items-center mt-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg shadow-inner">
                    <button onClick={handlePrevListeningWord} disabled={currentListeningWordIndex === 0} className="px-4 py-2 bg-slate-200 dark:bg-slate-700 rounded-md font-semibold text-slate-700 dark:text-slate-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-300 dark:hover:bg-slate-600">
                        ⟨ Câu trước
                    </button>
                    
                    <label className="flex items-center cursor-pointer">
                        <div className="relative">
                            <input type="checkbox" className="sr-only" checked={autoAdvance} onChange={() => setAutoAdvance(!autoAdvance)} />
                            <div className={`block w-12 h-6 rounded-full transition-colors ${autoAdvance ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-600'}`}></div>
                            <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${autoAdvance ? 'transform translate-x-6' : ''}`}></div>
                        </div>
                        <span className="ml-3 text-slate-700 dark:text-slate-300 font-medium">Tự động chuyển câu</span>
                    </label>

                    <button onClick={handleNextListeningWord} disabled={currentListeningWordIndex >= listeningWordsQuestions.length - 1} className="px-4 py-2 bg-blue-600 text-white rounded-md font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700">
                        Câu sau ⟩
                    </button>
                </div>
            </div>
        );
    };

    const renderQuiz = () => {
        if (isQuizSessionFinished) {
            return (
                <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg">
                    <div className="text-center border-b dark:border-slate-700 pb-4 mb-6">
                        <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Quiz Complete!</h3>
                        <p className="text-6xl font-bold text-blue-600 dark:text-blue-400 my-4">{Math.round((score / quizQuestions.length) * 100)}%</p>
                        <p className="text-lg text-slate-600 dark:text-slate-400">You got {score} out of {quizQuestions.length} correct.</p>
                    </div>
                    <h4 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">Review</h4>
                    <div className="space-y-3 max-h-[60vh] overflow-y-auto p-1">
                        {quizQuestions.map((q, index) => (
                            <div key={index} className="flex items-start p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                                {q.isCorrect ? (
                                    <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
                                ) : (
                                    <XCircleIcon className="h-5 w-5 text-red-500 flex-shrink-0 mt-1" />
                                )}
                                <div className="ml-3">
                                    <p className="font-bold text-slate-800 dark:text-slate-100">{q.correctAnswer}</p>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">{q.questionText}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button onClick={startQuizSession} className="mt-8 w-full px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
                        Try Again
                    </button>
                </div>
            );
        }

        const currentQuestion = quizQuestions[currentQuizIndex];
        if (!currentQuestion) return null;

        return (
            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Quiz</h3>
                    <span className="font-semibold text-slate-500 dark:text-slate-400">{currentQuizIndex + 1} / {quizQuestions.length}</span>
                </div>
                <div className="mb-8 text-center bg-slate-50 dark:bg-slate-700/50 p-6 rounded-lg min-h-[120px] flex items-center justify-center">
                    <p className="text-2xl font-semibold text-slate-700 dark:text-slate-200">{currentQuestion.questionText}</p>
                </div>
                <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => {
                        let buttonClass = "w-full text-left p-4 rounded-lg border-2 transition-all font-semibold ";
                        if (currentQuestion.userAnswer) {
                            if (option === currentQuestion.correctAnswer) {
                                buttonClass += "bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-300";
                            } else if (option === currentQuestion.userAnswer) {
                                buttonClass += "bg-red-100 dark:bg-red-900/50 border-red-500 text-red-800 dark:text-red-300";
                            } else {
                                buttonClass += "bg-slate-100 dark:bg-slate-700 border-slate-200 dark:border-slate-600 opacity-60";
                            }
                        } else {
                             buttonClass += "bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30";
                        }
                        return (
                            <button key={index} onClick={() => handleQuizAnswer(option)} disabled={!!currentQuestion.userAnswer} className={buttonClass}>
                                {option}
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    };

    const renderMatchingGame = () => {
         if (isGameFinished) {
            const totalTurns = Math.ceil(fullMatchingDeck.length / WORDS_PER_MATCHING_TURN);
            return (
                <div className="text-center bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg">
                    <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Matching Game Complete!</h3>
                    <p className="text-lg text-slate-600 dark:text-slate-400 mt-2">You matched all {fullMatchingDeck.length} pairs in {totalTurns} turn{totalTurns > 1 ? 's' : ''}.</p>
                    <div className="mt-6 text-left max-h-[50vh] overflow-y-auto p-4 border rounded-lg bg-slate-50 dark:bg-slate-700">
                        <h4 className="text-xl font-bold text-slate-700 dark:text-slate-200 mb-2">Review Words</h4>
                        <ul className="space-y-2">
                            {fullMatchingDeck.map(item => (
                                <li key={item.word} className="p-2 border-b dark:border-slate-600">
                                    <span className="font-bold text-blue-600 dark:text-blue-400">{item.word}:</span>
                                    <span className="ml-2 text-slate-600 dark:text-slate-300">{item.definition}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <button onClick={startMatchingGame} className="mt-8 px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
                        Play Again
                    </button>
                </div>
            );
        }

        return (
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
                 <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Matching Game</h3>
                    <span className="font-semibold text-slate-500 dark:text-slate-400">Turn {matchingTurn + 1} / {Math.ceil(fullMatchingDeck.length / WORDS_PER_MATCHING_TURN)}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {matchingGridItems.map((gridItem, index) => {
                        const isSelected = selectedMatchingItem?.item.word === gridItem.item.word && selectedMatchingItem.type === gridItem.type;
                        const isMatched = matchedPairs.includes(gridItem.item.word);
                        const isIncorrect = (incorrectPairItems?.item1.item.word === gridItem.item.word && incorrectPairItems?.item1.type === gridItem.type) || (incorrectPairItems?.item2.item.word === gridItem.item.word && incorrectPairItems?.item2.type === gridItem.type);

                        let cardClass = "h-28 flex items-center justify-center p-3 text-center rounded-lg border-2 font-semibold transition-all duration-300 text-sm ";
                        if (isMatched) {
                            cardClass += "bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-300 opacity-50 cursor-default";
                        } else if (isIncorrect) {
                            cardClass += "bg-red-100 dark:bg-red-900/50 border-red-500 text-red-800 dark:text-red-300 transform -translate-x-1";
                        } else if (isSelected) {
                            cardClass += "bg-blue-100 dark:bg-blue-900/50 border-blue-500 text-blue-800 dark:text-blue-300 scale-105 shadow-lg";
                        } else {
                            cardClass += "bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-slate-50 dark:hover:bg-slate-600 cursor-pointer";
                        }

                        return (
                            <button key={index} onClick={() => handleMatchingItemSelect(gridItem)} className={cardClass} disabled={isMatched}>
                                {gridItem.type === 'word' ? gridItem.item.word : gridItem.item.definition}
                            </button>
                        );
                    })}
                </div>
                {isTurnFinished && (
                     <div className="text-center mt-6">
                        <button onClick={() => setupMatchingTurn(fullMatchingDeck, matchingTurn + 1)} className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
                            Next Turn
                        </button>
                    </div>
                )}
            </div>
        );
    };

    const renderScrambler = () => {
        if (isScramblerSessionFinished) {
            return (
                <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg">
                    <div className="text-center border-b dark:border-slate-700 pb-4 mb-6">
                        <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Game Over!</h3>
                        <p className="text-6xl font-bold text-blue-600 dark:text-blue-400 my-4">{Math.round((scramblerScore / scramblerQuestions.length) * 100)}%</p>
                        <p className="text-lg text-slate-600 dark:text-slate-400">You unscrambled {scramblerScore} out of {scramblerQuestions.length} words correctly.</p>
                    </div>
                    <h4 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">Review</h4>
                    <div className="space-y-3 max-h-[60vh] overflow-y-auto p-1">
                        {scramblerQuestions.map((q, index) => (
                            <div key={index} className="flex items-start p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                                {q.isCorrect ? (
                                    <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
                                ) : (
                                    <XCircleIcon className="h-5 w-5 text-red-500 flex-shrink-0 mt-1" />
                                )}
                                <div className="ml-3">
                                    <p className="font-bold text-slate-800 dark:text-slate-100">{q.original.word}</p>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">{q.original.definition}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button onClick={startScramblerGame} className="mt-8 w-full px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
                        Play Again
                    </button>
                </div>
            );
        }

        const currentQuestion = scramblerQuestions[currentScramblerIndex];
        if (!currentQuestion) return null;

        let inputClass = "w-full text-center text-2xl font-bold tracking-widest uppercase p-4 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 dark:bg-slate-700 dark:text-white ";
        if (currentQuestion.isCorrect === true) {
            inputClass += "bg-green-100 dark:bg-green-900/50 border-green-500 text-green-700";
        } else if (currentQuestion.isCorrect === false) {
            inputClass += "bg-red-100 dark:bg-red-900/50 border-red-500 text-red-700";
        } else {
            inputClass += "border-slate-300 dark:border-slate-600";
        }

        return (
            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Unscramble the Word</h3>
                    <span className="font-semibold text-slate-500 dark:text-slate-400">{currentScramblerIndex + 1} / {scramblerQuestions.length}</span>
                </div>
                <div className="mb-6 text-center bg-slate-100 dark:bg-slate-700/50 p-4 rounded-lg">
                    <p className="text-sm text-slate-500 dark:text-slate-400">Definition:</p>
                    <p className="text-lg font-medium text-slate-700 dark:text-slate-200">{currentQuestion.original.definition}</p>
                </div>
                <p className="text-center text-4xl font-bold tracking-[0.5em] my-6 p-4 bg-yellow-100 dark:bg-yellow-900/50 rounded-lg text-yellow-800 dark:text-yellow-200">{currentQuestion.scrambled}</p>
                <form onSubmit={(e) => { e.preventDefault(); handleScramblerSubmit(currentScramblerIndex); }}>
                    <input
                        type="text"
                        value={currentQuestion.userAnswer}
                        onChange={(e) => handleScramblerInputChange(currentScramblerIndex, e.target.value)}
                        className={inputClass}
                        autoComplete="off"
                        autoCapitalize="off"
                        disabled={currentQuestion.isCorrect !== null}
                    />
                    {currentQuestion.isCorrect === false && (
                        <p className="text-center text-green-600 font-bold mt-2">Correct answer: {currentQuestion.original.word}</p>
                    )}
                    <div className="mt-6 flex justify-between items-center">
                         <button type="button" onClick={handleShuffleScrambler} className="px-4 py-2 bg-slate-200 dark:bg-slate-600 font-semibold rounded-lg hover:bg-slate-300 dark:hover:bg-slate-500 transition-colors">
                            Shuffle
                        </button>
                        <button type="submit" className="px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50" disabled={currentQuestion.isCorrect !== null}>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        );
    };
    
    const renderSpellingRecall = () => {
        if (isSpellingSessionFinished) {
            const correctCount = spellingQuestions.filter(q => q.isCorrect).length;
            return (
                <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg">
                    <div className="text-center border-b dark:border-slate-700 pb-4 mb-6">
                        <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Spelling Practice Complete!</h3>
                        <p className="text-6xl font-bold text-blue-600 dark:text-blue-400 my-4">{Math.round((correctCount / spellingQuestions.length) * 100)}%</p>
                        <p className="text-lg text-slate-600 dark:text-slate-400">You got {correctCount} out of {spellingQuestions.length} correct.</p>
                    </div>
                    <h4 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">Review</h4>
                    <div className="space-y-3 max-h-[60vh] overflow-y-auto p-1">
                        {spellingQuestions.map((q, index) => (
                            <div key={index} className="flex items-start p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                                {q.isCorrect ? (
                                    <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
                                ) : (
                                    <XCircleIcon className="h-5 w-5 text-red-500 flex-shrink-0 mt-1" />
                                )}
                                <div className="ml-3">
                                    <p className="font-bold text-slate-800 dark:text-slate-100">{q.original.word}</p>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">{q.original.definition}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button onClick={startSpellingGame} className="mt-8 w-full px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
                        Play Again
                    </button>
                </div>
            );
        }
        const currentQuestion = spellingQuestions[currentSpellingIndex];
        if (!currentQuestion) return null;
    
        let inputClass = "w-full text-lg p-4 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 dark:bg-slate-700 dark:text-white ";
        if (currentQuestion.isCorrect === true) {
            inputClass += "bg-green-100 dark:bg-green-900/50 border-green-500 text-green-700";
        } else if (currentQuestion.isCorrect === false) {
            inputClass += "bg-red-100 dark:bg-red-900/50 border-red-500 text-red-700";
        } else {
            inputClass += "border-slate-300 dark:border-slate-600";
        }
    
        return (
            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Spelling Recall</h3>
                    <span className="font-semibold text-slate-500 dark:text-slate-400">{currentSpellingIndex + 1} / {spellingQuestions.length}</span>
                </div>
                <div className="mb-6 text-center bg-slate-100 dark:bg-slate-700/50 p-4 rounded-lg">
                    <p className="text-sm text-slate-500 dark:text-slate-400">Definition:</p>
                    <p className="text-lg font-medium text-slate-700 dark:text-slate-200">{currentQuestion.original.definition}</p>
                </div>
                <form onSubmit={(e) => { e.preventDefault(); handleSpellingSubmit(currentSpellingIndex); }}>
                     <input
                        type="text"
                        value={currentQuestion.userAnswer}
                        onChange={(e) => handleSpellingInputChange(currentSpellingIndex, e.target.value)}
                        className={inputClass}
                        autoComplete="off"
                        autoCapitalize="off"
                        disabled={currentQuestion.isCorrect !== null}
                        placeholder="Type the word..."
                    />
                     {currentQuestion.isCorrect === false && (
                        <p className="text-center text-green-600 font-bold mt-2">Correct spelling: {currentQuestion.original.word}</p>
                    )}
                     <div className="mt-6 flex justify-between items-center">
                        <button type="button" onClick={() => handleRevealLetter(currentSpellingIndex)} className="px-4 py-2 bg-yellow-400 text-yellow-900 font-semibold rounded-lg hover:bg-yellow-500 disabled:opacity-50" disabled={currentQuestion.isCorrect !== null || currentQuestion.revealedCount >= currentQuestion.original.word.length -1}>
                            Reveal Letter
                        </button>
                        <button type="submit" className="px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50" disabled={currentQuestion.isCorrect !== null}>
                            Check Spelling
                        </button>
                    </div>
                </form>
            </div>
        );
    };
    
    const renderAudioDictation = () => {
        if (isAudioDictationSessionFinished) {
            const correctCount = audioDictationQuestions.filter(q => q.isCorrect).length;
            return (
                <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg">
                    <div className="text-center border-b dark:border-slate-700 pb-4 mb-6">
                        <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Audio Dictation Complete!</h3>
                        <p className="text-6xl font-bold text-blue-600 dark:text-blue-400 my-4">{Math.round((correctCount / audioDictationQuestions.length) * 100)}%</p>
                        <p className="text-lg text-slate-600 dark:text-slate-400">You got {correctCount} out of {audioDictationQuestions.length} correct.</p>
                    </div>
                    <h4 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">Review</h4>
                    <div className="space-y-3 max-h-[60vh] overflow-y-auto p-1">
                        {audioDictationQuestions.map((q, index) => (
                            <div key={index} className="flex items-start p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                                {q.isCorrect ? (
                                    <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
                                ) : (
                                    <XCircleIcon className="h-5 w-5 text-red-500 flex-shrink-0 mt-1" />
                                )}
                                <div className="ml-3">
                                    <p className="font-bold text-slate-800 dark:text-slate-100">{q.original.word}</p>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">{q.original.definition}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button onClick={startAudioDictationGame} className="mt-8 w-full px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
                        Play Again
                    </button>
                </div>
            );
        }
        const currentQuestion = audioDictationQuestions[currentAudioDictationIndex];
        if (!currentQuestion) return null;
    
        let inputClass = "w-full text-lg p-4 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 dark:bg-slate-700 dark:text-white ";
        if (currentQuestion.isCorrect === true) {
            inputClass += "bg-green-100 dark:bg-green-900/50 border-green-500 text-green-700";
        } else if (currentQuestion.isCorrect === false) {
            inputClass += "bg-red-100 dark:bg-red-900/50 border-red-500 text-red-700";
        } else {
            inputClass += "border-slate-300 dark:border-slate-600";
        }
        
        return (
             <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Audio Dictation</h3>
                    <span className="font-semibold text-slate-500 dark:text-slate-400">{currentAudioDictationIndex + 1} / {audioDictationQuestions.length}</span>
                </div>
                <p className="text-center text-slate-600 dark:text-slate-400 mb-4">Listen to the word and type what you hear.</p>
                <div className="mb-6">
                    <AudioPlayer audioScript={currentQuestion.original.word} />
                </div>
                {currentQuestion.meaningRevealed && (
                    <div className="mb-4 text-center bg-yellow-100 dark:bg-yellow-900/50 p-3 rounded-lg">
                        <p className="text-sm text-yellow-800 dark:text-yellow-200">Hint: {currentQuestion.original.definition}</p>
                    </div>
                )}
                 <form onSubmit={(e) => { e.preventDefault(); handleAudioDictationSubmit(currentAudioDictationIndex); }}>
                     <input
                        type="text"
                        value={currentQuestion.userAnswer}
                        onChange={(e) => handleAudioDictationInputChange(currentAudioDictationIndex, e.target.value)}
                        className={inputClass}
                        autoComplete="off"
                        autoCapitalize="off"
                        disabled={currentQuestion.isCorrect !== null}
                        placeholder="Type the word you hear..."
                    />
                    {currentQuestion.isCorrect === false && (
                        <p className="text-center text-green-600 font-bold mt-2">Correct word: {currentQuestion.original.word}</p>
                    )}
                    <div className="mt-6 flex justify-between items-center">
                         <button type="button" onClick={() => handleToggleMeaning(currentAudioDictationIndex)} className="px-4 py-2 bg-slate-200 dark:bg-slate-600 font-semibold rounded-lg hover:bg-slate-300 dark:hover:bg-slate-500 transition-colors disabled:opacity-50" disabled={currentQuestion.isCorrect !== null}>
                            {currentQuestion.meaningRevealed ? 'Hide' : 'Show'} Hint
                        </button>
                        <button type="submit" className="px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50" disabled={currentQuestion.isCorrect !== null}>
                            Check Word
                        </button>
                    </div>
                </form>
            </div>
        );
    };

    const renderDefinitionMatch = () => {
        if (isDMatchGameFinished) {
            return (
                <div className="text-center bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg">
                    <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Well Done!</h3>
                    <p className="text-lg text-slate-600 dark:text-slate-400 mt-2">You've matched all the words and definitions.</p>
                     <div className="mt-6 text-left max-h-[50vh] overflow-y-auto p-4 border rounded-lg bg-slate-50 dark:bg-slate-700">
                        <h4 className="text-xl font-bold text-slate-700 dark:text-slate-200 mb-2">Review Words</h4>
                        <ul className="space-y-2">
                            {fullDMatchDeck.map(item => (
                                <li key={item.word} className="p-2 border-b dark:border-slate-600">
                                    <span className="font-bold text-blue-600 dark:text-blue-400">{item.word}:</span>
                                    <span className="ml-2 text-slate-600 dark:text-slate-300">{item.definition}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <button onClick={startDMatchGame} className="mt-8 px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
                        Play Again
                    </button>
                </div>
            );
        }
        
        return (
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
                 <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Definition Match</h3>
                    <span className="font-semibold text-slate-500 dark:text-slate-400">Turn {dMatchTurn + 1} / {Math.ceil(fullDMatchDeck.length / WORDS_PER_DMATCH_TURN)}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Words Column */}
                    <div className="space-y-2">
                        {dMatchWords.map((wordItem, index) => {
                            const isSelected = selectedDMatchWord?.item.word === wordItem.item.word;
                            const isCorrect = correctDMatches.includes(wordItem.item.word);
                            const isIncorrect = incorrectDMatchPair?.[0] === wordItem.item.word;
                            let btnClass = "w-full text-left p-3 rounded-lg border-2 font-semibold transition-all duration-200 ";
    
                            if (isCorrect) btnClass += "bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-300 opacity-50 cursor-default";
                            else if (isIncorrect) btnClass += "bg-red-100 dark:bg-red-900/50 border-red-500 text-red-800 dark:text-red-300";
                            else if (isSelected) btnClass += "bg-blue-100 dark:bg-blue-900/50 border-blue-500 text-blue-800 dark:text-blue-300 ring-2 ring-blue-300";
                            else btnClass += "bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 hover:border-blue-400 cursor-pointer";
    
                            return <button key={`word-${index}`} onClick={() => handleDMatchWordSelect(wordItem)} className={btnClass} disabled={isCorrect}>{wordItem.item.word}</button>;
                        })}
                    </div>
                    {/* Definitions Column */}
                    <div className="space-y-2">
                        {dMatchDefinitions.map((defItem, index) => {
                             const isCorrect = correctDMatches.includes(defItem.item.word);
                             const isIncorrect = incorrectDMatchPair?.[1] === defItem.item.definition;
                             let btnClass = "w-full text-left p-3 rounded-lg border-2 text-sm transition-all duration-200 truncate ";
    
                             if (isCorrect) btnClass += "bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-300 opacity-50 cursor-default";
                             else if (isIncorrect) btnClass += "bg-red-100 dark:bg-red-900/50 border-red-500 text-red-800 dark:text-red-300";
                             else btnClass += "bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 hover:border-blue-400 cursor-pointer";
    
                             return <button key={`def-${index}`} onClick={() => handleDMatchDefinitionSelect(defItem)} className={btnClass} disabled={isCorrect} title={defItem.item.definition}>{defItem.item.definition}</button>
                        })}
                    </div>
                </div>
                 {isDMatchTurnFinished && (
                     <div className="text-center mt-6">
                        <button onClick={() => setupDMatchTurn(fullDMatchDeck, dMatchTurn + 1)} className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
                            Next Set
                        </button>
                    </div>
                )}
            </div>
        );
    };
    
    const renderListeningTranslation = () => {
        switch (ltState) {
            case 'generating':
                return (
                    <div className="flex flex-col items-center justify-center p-12 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
                        <LoadingIcon className="h-12 w-12 text-blue-600 animate-spin" />
                        <h3 className="mt-6 text-xl font-semibold text-slate-700 dark:text-slate-200">Generating New Exercise...</h3>
                        <p className="mt-2 text-slate-500 dark:text-slate-400">The AI is creating a sentence using words from this set.</p>
                    </div>
                );

            case 'answering':
            case 'evaluating':
                return (
                    <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
                        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 text-center mb-2">Listen and Translate</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-center mb-6">Listen to the English sentence, then type your Vietnamese translation below.</p>
                        {showHint && <HintBox onClose={() => setShowHint(false)} />}
                        <div className="mb-6">
                            <AudioPlayer audioScript={originalSentence} />
                        </div>
                        <textarea
                            value={userTranslation}
                            onChange={(e) => setUserTranslation(e.target.value)}
                            className="w-full h-40 p-4 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 dark:bg-slate-700 dark:text-white"
                            placeholder="Nhập bản dịch tiếng Việt của bạn ở đây..."
                            disabled={ltState === 'evaluating'}
                        />
                        {ltError && <p className="text-red-500 text-center mt-4 font-semibold">{ltError}</p>}
                        <div className="mt-6 flex flex-col-reverse sm:flex-row gap-4">
                            <button
                                onClick={generateNewLtExercise}
                                className="w-full sm:w-auto flex items-center justify-center gap-2 py-3 px-5 bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-200 font-semibold rounded-lg hover:bg-slate-300 dark:hover:bg-slate-500 transition-colors disabled:opacity-50"
                                disabled={ltState === 'evaluating'}
                                aria-label="Get a new sentence"
                            >
                                <RefreshIcon className="h-5 w-5" />
                                <span>New Sentence</span>
                            </button>
                            <button
                                onClick={handleLtSubmit}
                                className="w-full flex-grow flex items-center justify-center gap-2 py-4 px-6 bg-blue-600 text-white font-bold text-lg rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
                                disabled={ltState === 'evaluating'}
                            >
                                {ltState === 'evaluating' ? (
                                    <><LoadingIcon className="h-6 w-6 animate-spin" /><span>Evaluating...</span></>
                                ) : (
                                    "Submit for AI Evaluation"
                                )}
                            </button>
                        </div>
                    </div>
                );

            case 'result':
                if (!ltEvaluation) return null;
                const getScoreColor = (score: number) => {
                    if (score >= 90) return 'text-green-500';
                    if (score >= 70) return 'text-blue-500';
                    if (score >= 50) return 'text-yellow-500';
                    return 'text-red-500';
                };
                return (
                    <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
                        <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-100 text-center mb-6">Kết quả đánh giá</h3>
                        <div className="text-center bg-slate-100 dark:bg-slate-700/50 p-6 rounded-lg mb-6">
                            <p className="text-lg font-semibold text-slate-700 dark:text-slate-300">Điểm của bạn</p>
                            <p className={`text-7xl font-bold my-2 ${getScoreColor(ltEvaluation.score)}`}>{ltEvaluation.score}%</p>
                        </div>
                        <div className="bg-slate-100 dark:bg-slate-700/50 p-4 rounded-lg mb-6">
                            <h4 className="font-bold text-slate-800 dark:text-slate-200">Nhận xét từ AI:</h4>
                            <p className="text-slate-600 dark:text-slate-300 mt-1 italic">{ltEvaluation.feedback_vi}</p>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-semibold text-slate-500 dark:text-slate-400">Câu gốc (Tiếng Anh):</h4>
                                <p className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-md text-slate-800 dark:text-slate-200">{originalSentence}</p>
                            </div>
                             <div>
                                <h4 className="font-semibold text-slate-500 dark:text-slate-400">Bản dịch của bạn (Tiếng Việt):</h4>
                                <p className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-md text-slate-800 dark:text-slate-200">{userTranslation}</p>
                            </div>
                        </div>
                        <div className="mt-8">
                             <button
                                onClick={generateNewLtExercise}
                                className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-blue-600 text-white font-bold text-lg rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <RefreshIcon className="h-6 w-6" />
                                Next Exercise
                            </button>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    const renderContextMeaning = () => {
        if (isContextGenerating) {
            return (
                <div className="flex flex-col items-center justify-center p-12 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
                    <LoadingIcon className="h-12 w-12 text-blue-600 animate-spin" />
                    <h3 className="mt-6 text-xl font-semibold text-slate-700 dark:text-slate-200">Generating AI Context Exercise...</h3>
                </div>
            );
        }

        if (contextError) {
             return (
                <div className="text-center bg-red-100 dark:bg-red-900/50 p-8 rounded-xl shadow-lg">
                    <h3 className="text-xl font-bold text-red-700 dark:text-red-300">Error</h3>
                    <p className="text-slate-600 dark:text-slate-400 mt-2">{contextError}</p>
                    <button onClick={generateContextMeaningExercise} className="mt-6 px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700">
                        Try Again
                    </button>
                </div>
            );
        }

        if (contextQuestions.length === 0) {
            return <div className="text-center p-8 text-slate-500 dark:text-slate-400">Select this mode to generate an exercise.</div>;
        }

        const currentQuestion = contextQuestions[currentContextIndex];
        const isFinished = currentContextIndex >= contextQuestions.length - 1 && currentQuestion.isChecked;
        
        if (isFinished) {
            return (
                <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg">
                    <div className="text-center border-b dark:border-slate-700 pb-4 mb-6">
                        <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Context Practice Complete!</h3>
                        <p className="text-lg text-slate-600 dark:text-slate-400 mt-2">Review the words and meanings below.</p>
                    </div>
                    <h4 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">Review</h4>
                    <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-4">
                        {contextQuestions.map((q, index) => (
                            <div key={index} className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                                <p 
                                    className="text-lg text-slate-800 dark:text-slate-200 leading-relaxed mb-2" 
                                    dangerouslySetInnerHTML={{ __html: q.sentence.replace(/\*\*(.*?)\*\*/g, '<strong class="text-blue-600 dark:text-blue-400">$1</strong>') }}
                                />
                                <p className="text-slate-700 dark:text-slate-300"><span className="font-semibold">Your guess:</span> {q.userAnswer || <span className="italic text-slate-500">No answer</span>}</p>
                                <p className="text-slate-700 dark:text-slate-300"><span className="font-semibold text-green-700 dark:text-green-400">Correct meaning:</span> {q.original.definition}</p>
                            </div>
                        ))}
                    </div>
                    <button onClick={generateContextMeaningExercise} className="mt-8 w-full px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
                        Practice Again
                    </button>
                </div>
            );
        }


        return (
            <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-xl shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Context Meaning (AI)</h3>
                    <span className="font-semibold text-slate-500 dark:text-slate-400">{currentContextIndex + 1} / {contextQuestions.length}</span>
                </div>

                <div className="p-6 bg-slate-50 dark:bg-slate-700/50 rounded-lg min-h-[100px] flex items-center justify-center mb-6">
                     <p 
                        className="text-xl text-center text-slate-800 dark:text-slate-200 leading-relaxed" 
                        dangerouslySetInnerHTML={{ __html: currentQuestion.sentence.replace(/\*\*(.*?)\*\*/g, '<strong class="text-blue-600 dark:text-blue-400">$1</strong>') }}
                     />
                </div>

                <div className="space-y-4">
                    <input
                        type="text"
                        value={currentQuestion.userAnswer}
                        onChange={(e) => handleContextInputChange(e.target.value)}
                        disabled={currentQuestion.isChecked}
                        placeholder="Type your guess for the meaning in Vietnamese..."
                        className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-900 dark:text-white disabled:bg-slate-100 dark:disabled:bg-slate-700"
                    />

                    {currentQuestion.isChecked && (
                        <div className="p-4 bg-green-50 dark:bg-green-900/50 border-l-4 border-green-500 rounded-r-lg">
                            <p className="font-semibold text-slate-700 dark:text-slate-200">Correct Meaning:</p>
                            <p className="text-green-800 dark:text-green-300 font-bold">{currentQuestion.original.definition}</p>
                        </div>
                    )}
                </div>

                 <div className="mt-6 flex flex-col items-center space-y-4">
                    {!currentQuestion.isChecked ? (
                        <button onClick={handleCheckContextAnswer} className="w-full sm:w-1/2 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700">
                            Check Answer
                        </button>
                    ) : null }

                    <div className="w-full flex justify-between items-center">
                        <button onClick={handlePrevContext} disabled={currentContextIndex === 0} className="px-5 py-2 bg-slate-200 dark:bg-slate-700 rounded-md font-semibold text-slate-700 dark:text-slate-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-300 dark:hover:bg-slate-600">
                            ⟨ Move Backward
                        </button>
                        <label className="flex items-center cursor-pointer">
                            <div className="relative">
                                <input type="checkbox" className="sr-only" checked={autoAdvanceContext} onChange={() => setAutoAdvanceContext(!autoAdvanceContext)} />
                                <div className={`block w-12 h-6 rounded-full transition-colors ${autoAdvanceContext ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-600'}`}></div>
                                <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${autoAdvanceContext ? 'transform translate-x-6' : ''}`}></div>
                            </div>
                            <span className="ml-3 text-sm text-slate-700 dark:text-slate-300 font-medium">Auto-Advance</span>
                        </label>
                        <button onClick={handleNextContext} disabled={currentContextIndex >= contextQuestions.length - 1} className="px-5 py-2 bg-slate-200 dark:bg-slate-700 rounded-md font-semibold text-slate-700 dark:text-slate-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-300 dark:hover:bg-slate-600">
                            Move On ⟩
                        </button>
                    </div>
                </div>
            </div>
        );
    };


    const renderContent = () => {
        switch (mode) {
            case 'flashcards': return renderFlashcards();
            case 'listening_words': return renderListeningWords();
            case 'quiz': return renderQuiz();
            case 'matching_game': return renderMatchingGame();
            case 'definition_match': return renderDefinitionMatch();
            case 'scrambler': return renderScrambler();
            case 'spelling_recall': return renderSpellingRecall();
            case 'audio_dictation': return renderAudioDictation();
            case 'listening_translation': return renderListeningTranslation();
            case 'context_meaning': return renderContextMeaning();
            case 'spoken_translation':
                onStartSpokenTranslationPractice(testData);
                return null;
            default:
                return renderFlashcards();
        }
    };
    
     const studyModes: { id: StudyMode; name: string; icon: React.FC<any>, isNew?: boolean, isPremium?: boolean }[] = [
        { id: 'flashcards', name: 'Flashcards', icon: BookOpenIcon },
        { id: 'listening_words', name: 'Nghe & chọn từ', icon: HeadphoneIcon, isPremium: true },
        { id: 'quiz', name: 'Quiz', icon: BrainIcon },
        { id: 'matching_game', name: 'Matching Game', icon: GridIcon },
        { id: 'definition_match', name: 'Ghép từ & nghĩa', icon: LinkIcon },
        { id: 'scrambler', name: 'Scrambler', icon: PuzzleIcon },
        { id: 'spelling_recall', name: 'Spelling Recall', icon: TypeIcon },
        { id: 'audio_dictation', name: 'Nghe & Điền từ lẻ', icon: HeadphoneIcon },
        { id: 'listening_translation', name: 'Nghe & Dịch câu', icon: SparklesIcon, isPremium: true },
        { id: 'spoken_translation', name: 'Dịch nói đoạn văn', icon: TranslateIcon, isNew: true },
        { id: 'context_meaning', name: 'Đoán từ ngữ cảnh', icon: SparklesIcon, isPremium: true },
    ];

    if (!wordCount) {
        return <WordCountModal maxWords={testData.words.length} onStart={handleStartSession} />;
    }

    return (
        <div className="container mx-auto px-4 py-8">
             {toastMessage && (
                <div className="fixed bottom-5 right-5 bg-slate-800 text-white px-6 py-3 rounded-lg shadow-xl z-50 animate-bounce">
                    {toastMessage}
                </div>
            )}
             {!showHint && mode === 'listening_translation' && (ltState === 'answering' || ltState === 'evaluating') && (
                <button onClick={() => setShowHint(true)} className="fixed top-24 right-4 z-50 p-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700" aria-label="Show hint">
                    <QuestionMarkCircleIcon className="h-6 w-6" />
                </button>
            )}
            <div className="max-w-5xl mx-auto">
                <button onClick={onBack} className="mb-6 inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-semibold transition-colors">
                    <ArrowLeftIcon className="h-5 w-5 mr-2" />
                    Back to Test Selection
                </button>

                <div className="text-center mb-8">
                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">{testData.title}</h2>
                    <p className="mt-2 text-lg text-slate-500 dark:text-slate-400">{wordsForSession.length} words</p>
                </div>
                
                <div className="mb-8">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-2">
                         {studyModes.map(m => (
                            <button 
                                key={m.id}
                                onClick={() => setMode(m.id)}
                                className={`relative flex flex-col sm:flex-row items-center justify-center gap-2 px-3 py-2 rounded-lg font-semibold transition-colors text-xs sm:text-sm ${mode === m.id ? 'bg-blue-600 text-white' : 'bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'}`}
                            >
                                {m.isNew && (
                                    <span className="absolute -top-2 -right-2 bg-yellow-300 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full border border-yellow-400 transform rotate-12">
                                        NEW
                                    </span>
                                )}
                                {m.isPremium && (
                                    <span className="absolute -top-2 -right-2 bg-amber-200 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full border-2 border-amber-400 transform rotate-12 bling-bling">
                                        PREMIUM
                                    </span>
                                )}
                                <m.icon className="h-5 w-5"/>
                                <span className="mt-1 sm:mt-0">{m.name}</span>
                            </button>
                         ))}
                    </div>
                </div>
                
                <div>
                     {renderContent()}
                </div>
            </div>
             <style>{`
                @keyframes shimmer {
                  0% {
                    transform: translateX(-100%);
                  }
                  100% {
                    transform: translateX(100%);
                  }
                }

                .bling-bling {
                  overflow: hidden;
                  -webkit-mask-image: -webkit-radial-gradient(white, black);
                }

                .bling-bling::after {
                  content: '';
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                  background: linear-gradient(100deg, rgba(255,255,255,0) 20%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0) 80%);
                  animation: shimmer 2.5s infinite;
                }
            `}</style>
        </div>
    );
};

export default VocabularyTestScreen;