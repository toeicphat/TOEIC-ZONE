import React, { useState, useEffect, useCallback } from 'react';
import { VocabularyTest, VocabItem, VocabularyWord } from '../types';
import { updateWordSrsLevel } from '../services/vocabularyService';
import { BookOpenIcon, BrainIcon, ShuffleIcon, ArrowLeftIcon, ArrowRightIcon, CheckCircleIcon, XCircleIcon, GridIcon, PuzzleIcon, TypeIcon, LightBulbIcon, HeadphoneIcon, TargetIcon, LinkIcon } from './icons';
import AudioPlayer from './AudioPlayer';

type StudyMode = 'flashcards' | 'quiz' | 'matching_game' | 'scrambler' | 'spelling_recall' | 'audio_dictation' | 'hangman' | 'definition_match';

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

interface HangmanQuestion {
    original: VocabItem;
    letters: string[];
    guessedCorrectly: Set<string>;
    guessedIncorrectly: Set<string>;
    status: 'playing' | 'won' | 'lost';
}


const shuffleArray = <T,>(array: T[]): T[] => {
    return [...array].sort(() => Math.random() - 0.5);
};

const WORDS_PER_MATCHING_TURN = 6;

type MatchingItem = { item: VocabItem; type: 'word' | 'definition' };

// New Definition Match types
const WORDS_PER_DMATCH_TURN = 8;
type DMatchItemType = { item: VocabItem; type: 'word' | 'definition' };


const VocabularyTestScreen: React.FC<{ testData: VocabularyTest, onBack: () => void }> = ({ testData, onBack }) => {
    const [mode, setMode] = useState<StudyMode>('flashcards');
    const [deck, setDeck] = useState<VocabItem[]>(testData.words);
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

    // State for Hangman
    const [hangmanQuestions, setHangmanQuestions] = useState<HangmanQuestion[]>([]);
    const [currentHangmanIndex, setCurrentHangmanIndex] = useState(0);
    const [isHangmanSessionFinished, setIsHangmanSessionFinished] = useState(false);
    const [hangmanScore, setHangmanScore] = useState(0);
    const MAX_INCORRECT_GUESSES = 6;

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


    const generateQuizQuestions = useCallback(() => {
        const shuffledWords = shuffleArray(testData.words);
        const questions = shuffledWords.map((correctItem: VocabItem) => {
            const distractors = shuffleArray(testData.words.filter((w: VocabItem) => w.word !== correctItem.word)).slice(0, 3).map((d: VocabItem) => d.word);
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
    }, [testData.words]);
    
    const restartQuizSession = useCallback(() => {
        generateQuizQuestions();
        setCurrentQuizIndex(0);
        setScore(0);
        setIsQuizSessionFinished(false);
    }, [generateQuizQuestions]);

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
        const shuffledDeck = shuffleArray(testData.words);
        setFullMatchingDeck(shuffledDeck);
        setupMatchingTurn(shuffledDeck, 0);
    }, [testData.words, setupMatchingTurn]);
    
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
        const shuffledWords = shuffleArray(testData.words);
        const questions = shuffledWords.map((item: VocabItem) => ({
            scrambled: scrambleWord(item.word),
            original: item,
            userAnswer: '',
            isCorrect: null,
        }));
        setScramblerQuestions(questions);
    }, [testData.words]);

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
        const shuffledWords = shuffleArray(testData.words);
        const questions = shuffledWords.map((item: VocabItem) => ({
            original: item,
            userAnswer: '',
            isCorrect: null,
            revealedCount: 0,
        }));
        setSpellingQuestions(questions);
    }, [testData.words]);

    const startSpellingGame = useCallback(() => {
        generateSpellingQuestions();
        setCurrentSpellingIndex(0);
        setSpellingScore(0);
        setIsSpellingSessionFinished(false);
    }, [generateSpellingQuestions]);
    
    const generateAudioDictationQuestions = useCallback(() => {
        const shuffledWords = shuffleArray(testData.words);
        const questions = shuffledWords.map((item: VocabItem) => ({
            original: item,
            userAnswer: '',
            isCorrect: null,
            meaningRevealed: false,
        }));
        setAudioDictationQuestions(questions);
    }, [testData.words]);

    const startAudioDictationGame = useCallback(() => {
        generateAudioDictationQuestions();
        setCurrentAudioDictationIndex(0);
        setAudioDictationScore(0);
        setIsAudioDictationSessionFinished(false);
    }, [generateAudioDictationQuestions]);

    const generateHangmanQuestions = useCallback(() => {
        const questions = shuffleArray(testData.words).map((item: VocabItem) => ({
            original: item,
            letters: item.word.toLowerCase().replace(/[^a-z]/g, '').split(''),
            guessedCorrectly: new Set<string>(),
            guessedIncorrectly: new Set<string>(),
            status: 'playing' as 'playing' | 'won' | 'lost',
        }));
        setHangmanQuestions(questions);
    }, [testData.words]);

    const startHangmanGame = useCallback(() => {
        generateHangmanQuestions();
        setCurrentHangmanIndex(0);
        setIsHangmanSessionFinished(false);
        setHangmanScore(0);
    }, [generateHangmanQuestions]);

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
        const shuffledDeck = shuffleArray(testData.words);
        setupDMatchTurn(shuffledDeck, 0);
    }, [testData.words, setupDMatchTurn]);


    useEffect(() => {
        // Reset all modes when a new test is loaded
        setDeck(testData.words);
        setCurrentCardIndex(0);
        setIsFlipped(false);
        restartQuizSession();
        startMatchingGame();
        startScramblerGame();
        startSpellingGame();
        startAudioDictationGame();
        startHangmanGame();
        startDMatchGame();
    }, [testData, restartQuizSession, startMatchingGame, startScramblerGame, startSpellingGame, startAudioDictationGame, startHangmanGame, startDMatchGame]);
    
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

    const handleSaveToSrs = (word: VocabItem, remembered: boolean) => {
        handleWordPractice(word, remembered ? 'good' : 'hard');
        setToastMessage(`"${word.word}" saved to My Flashcards!`);
        setTimeout(() => {
            setToastMessage(null);
        }, 3000);
    };
    
    const handleQuizAnswer = (selectedOption: string) => {
        if (quizQuestions[currentQuizIndex].userAnswer !== null) return;

        const currentQuestion = quizQuestions[currentQuizIndex];
        const isCorrect = selectedOption === currentQuestion.correctAnswer;

        if (isCorrect) {
            setScore(prev => prev + 1);
        }
        
        const vocabItem = testData.words.find(w => w.word === currentQuestion.correctAnswer);
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
        if (matchedPairs.includes(clickedItem.item.word)) return;
        setIncorrectPairItems(null);

        if (!selectedMatchingItem) {
            // First item selected
            setSelectedMatchingItem(clickedItem);
        } else {
            // Second item selected, check for match
            if (selectedMatchingItem.type !== clickedItem.type && selectedMatchingItem.item.word === clickedItem.item.word) {
                // Correct match
                const newMatchedPairs = [...matchedPairs, clickedItem.item.word];
                setMatchedPairs(newMatchedPairs);
                setSelectedMatchingItem(null);
                handleWordPractice(clickedItem.item, 'good');

                if (newMatchedPairs.length === currentTurnItems.length) {
                    const isMoreWords = (matchingTurn + 1) * WORDS_PER_MATCHING_TURN < fullMatchingDeck.length;
                    if(isMoreWords) {
                        setIsTurnFinished(true);
                    } else {
                        setIsGameFinished(true);
                    }
                }
            } else {
                // Incorrect match or same type selected
                setIncorrectPairItems({ item1: selectedMatchingItem, item2: clickedItem });
                setSelectedMatchingItem(null);
                // Only penalize if they selected one of each type and it was wrong.
                if (selectedMatchingItem.type !== clickedItem.type) {
                    handleWordPractice(selectedMatchingItem.item, 'hard');
                }
                setTimeout(() => {
                    setIncorrectPairItems(null);
                }, 1000);
            }
        }
    };

    const handleNextTurn = () => {
        setupMatchingTurn(fullMatchingDeck, matchingTurn + 1);
    };
    
    const handleModeChange = (newMode: StudyMode) => {
        if (newMode === 'quiz' && mode !== 'quiz') restartQuizSession();
        if (newMode === 'matching_game' && mode !== 'matching_game') startMatchingGame();
        if (newMode === 'scrambler' && mode !== 'scrambler') startScramblerGame();
        if (newMode === 'spelling_recall' && mode !== 'spelling_recall') startSpellingGame();
        if (newMode === 'audio_dictation' && mode !== 'audio_dictation') startAudioDictationGame();
        if (newMode === 'flashcards' && mode !== 'flashcards') {
            setCurrentCardIndex(0);
            setIsFlipped(false);
        }
        if (newMode === 'hangman' && mode !== 'hangman') startHangmanGame();
        if (newMode === 'definition_match' && mode !== 'definition_match') startDMatchGame();
        setMode(newMode);
    };

    const renderFlashcards = () => {
        const currentCard = deck[currentCardIndex];
        if (!currentCard) return null;

        return (
            <div>
                <div className="perspective-1000">
                     <div 
                        className={`relative w-full h-80 transition-transform duration-700 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}
                        onClick={() => setIsFlipped(!isFlipped)}
                     >
                        <div className="absolute w-full h-full backface-hidden bg-white rounded-xl shadow-2xl border border-slate-200 flex items-center justify-center p-6 cursor-pointer">
                             <h2 className="text-4xl md:text-5xl font-bold text-slate-800 text-center">{currentCard.word}</h2>
                        </div>
                         <div className="absolute w-full h-full backface-hidden bg-blue-50 rounded-xl shadow-2xl border border-blue-200 flex flex-col items-center justify-center p-6 cursor-pointer rotate-y-180">
                             <div className="flex-grow flex flex-col items-center justify-center w-full">
                                <p className="text-2xl md:text-3xl text-slate-800 text-center font-semibold">{`${currentCard.word} - ${currentCard.definition}`}</p>
                                {currentCard.example && <p className="text-base text-slate-500 italic mt-4 text-center">"{currentCard.example}"</p>}
                            </div>
                             <div className="flex-shrink-0 w-full mt-4 flex justify-center gap-4 border-t border-blue-200 pt-4">
                                <button 
                                    onClick={(e) => { e.stopPropagation(); handleSaveToSrs(currentCard, false); }}
                                    className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 font-semibold rounded-lg hover:bg-red-200 transition-colors"
                                    title="Add to My Flashcards for review"
                                >
                                    <XCircleIcon className="h-6 w-6" />
                                    Didn't Remember
                                </button>
                                <button 
                                    onClick={(e) => { e.stopPropagation(); handleSaveToSrs(currentCard, true); }}
                                    className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 font-semibold rounded-lg hover:bg-green-200 transition-colors"
                                    title="Add to My Flashcards as learned"
                                >
                                    <CheckCircleIcon className="h-6 w-6" />
                                    Remembered
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center mt-6">
                    <button onClick={handlePrevCard} className="p-3 rounded-full hover:bg-slate-200 transition-colors"><ArrowLeftIcon className="h-6 w-6 text-slate-600" /></button>
                    <span className="font-semibold text-slate-600">{currentCardIndex + 1} / {deck.length}</span>
                    <button onClick={handleNextCard} className="p-3 rounded-full hover:bg-slate-200 transition-colors"><ArrowRightIcon className="h-6 w-6 text-slate-600" /></button>
                </div>
            </div>
        );
    };

    const renderMatchingGame = () => {
        if (isGameFinished) {
            return (
                <div className="text-center bg-white p-8 rounded-xl shadow-lg">
                    <h3 className="text-2xl font-bold text-slate-800">Congratulations!</h3>
                    <p className="text-lg text-slate-600 mt-2">You matched all the words.</p>
                    <button onClick={startMatchingGame} className="mt-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                        Play Again
                    </button>
                </div>
            );
        }
        
        if (isTurnFinished) {
            return (
                <div className="text-center bg-white p-8 rounded-xl shadow-lg">
                    <h3 className="text-2xl font-bold text-slate-800">Round {matchingTurn + 1} Complete!</h3>
                    <p className="text-lg text-slate-600 mt-2">Ready for the next set?</p>
                    <button onClick={handleNextTurn} className="mt-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                        Next Round
                    </button>
                </div>
            );
        }

        const getGridItemClasses = (gridItem: MatchingItem) => {
            const isMatched = matchedPairs.includes(gridItem.item.word);
            const isSelected = selectedMatchingItem?.item.word === gridItem.item.word && selectedMatchingItem?.type === gridItem.type;
            const isIncorrect = (incorrectPairItems?.item1.item.word === gridItem.item.word && incorrectPairItems?.item1.type === gridItem.type) || (incorrectPairItems?.item2.item.word === gridItem.item.word && incorrectPairItems?.item2.type === gridItem.type);
        
            let baseClasses = 'w-full h-28 p-3 border rounded-xl text-center font-medium text-slate-700 flex items-center justify-center transition-all duration-200 shadow-sm';
        
            if (isMatched) {
                return `${baseClasses} bg-green-100 border-green-300 text-green-800 cursor-default shadow-inner opacity-60`;
            }
            if (isIncorrect) {
                return `${baseClasses} bg-red-100 border-red-400 animate-shake`;
            }
            if (isSelected) {
                return `${baseClasses} bg-slate-200 border-slate-400 shadow-md`;
            }
            return `${baseClasses} bg-white hover:bg-slate-50 border-slate-200 hover:shadow-md hover:-translate-y-0.5`;
        };

        return (
            <div>
                <p className="text-center text-slate-600 mb-6">Match the word with its correct definition. <strong>Round {matchingTurn + 1} of {Math.ceil(fullMatchingDeck.length / WORDS_PER_MATCHING_TURN)}</strong></p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {matchingGridItems.map((gridItem, index) => (
                        <button
                            key={`${gridItem.item.word}-${gridItem.type}-${index}`}
                            onClick={() => handleMatchingItemSelect(gridItem)}
                            disabled={matchedPairs.includes(gridItem.item.word)}
                            className={getGridItemClasses(gridItem)}
                        >
                           <span className="text-sm md:text-base">{gridItem.type === 'word' ? gridItem.item.word : gridItem.item.definition}</span>
                        </button>
                    ))}
                </div>
                 <div className="mt-8 flex justify-end">
                    <button onClick={startMatchingGame} className="p-2 rounded-full hover:bg-slate-200 transition-colors" title="Restart Game">
                       <ShuffleIcon className="h-6 w-6 text-slate-600" />
                    </button>
                </div>
            </div>
        );
    };

    const renderQuiz = () => {
        if (isQuizSessionFinished) {
            return (
                <div className="text-center bg-white p-8 rounded-xl shadow-lg">
                    <h3 className="text-2xl font-bold text-slate-800">Session Complete!</h3>
                    <p className="text-6xl font-bold text-blue-600 my-4">{Math.round((score / quizQuestions.length) * 100)}%</p>
                    <p className="text-lg text-slate-600">You got <span className="font-bold">{score}</span> out of <span className="font-bold">{quizQuestions.length}</span> correct.</p>
                    <button onClick={restartQuizSession} className="mt-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                        Restart Quiz
                    </button>
                </div>
            )
        }
        
        const currentQuestion = quizQuestions[currentQuizIndex];
        if (!currentQuestion) return null;

        const getOptionClasses = (option: string) => {
             if (currentQuestion.userAnswer === null) {
                return 'bg-white hover:bg-slate-100 border-slate-300';
             }
             if (option === currentQuestion.correctAnswer) {
                return 'bg-green-100 border-green-500 text-green-800 font-bold';
             }
             if (option === currentQuestion.userAnswer) {
                return 'bg-red-100 border-red-500 text-red-800';
             }
             return 'bg-slate-50 border-slate-200 text-slate-500';
        }

        return (
            <div>
                 <div className="text-right text-sm font-semibold text-slate-600 mb-2">
                    <span>Progress: {currentQuizIndex + 1} / {quizQuestions.length}</span>
                    <span className="mx-2">|</span>
                    <span>Score: {score}</span>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200 min-h-[150px] flex items-center justify-center">
                    <p className="text-xl text-center text-slate-800">{currentQuestion.questionText}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    {currentQuestion.options.map((option, index) => (
                        <button 
                            key={index} 
                            onClick={() => handleQuizAnswer(option)}
                            disabled={currentQuestion.userAnswer !== null}
                            className={`p-4 border rounded-lg text-left transition-colors duration-300 ${getOptionClasses(option)}`}
                        >
                            <span className="font-bold mr-2">{String.fromCharCode(65 + index)}.</span>
                            {option}
                        </button>
                    ))}
                </div>
            </div>
        );
    };
    
    const renderScrambler = () => {
        if (isScramblerSessionFinished) {
            return (
                <div className="text-center bg-white p-8 rounded-xl shadow-lg">
                    <h3 className="text-2xl font-bold text-slate-800">Session Complete!</h3>
                    <p className="text-6xl font-bold text-blue-600 my-4">{Math.round((scramblerScore / scramblerQuestions.length) * 100)}%</p>
                    <p className="text-lg text-slate-600">You got <span className="font-bold">{scramblerScore}</span> out of <span className="font-bold">{scramblerQuestions.length}</span> correct.</p>
                    <button onClick={startScramblerGame} className="mt-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                        Play Again
                    </button>
                </div>
            )
        }

        const currentQuestion = scramblerQuestions[currentScramblerIndex];
        if (!currentQuestion) return null;

        const handleScramblerInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const newQuestions = [...scramblerQuestions];
            newQuestions[currentScramblerIndex] = {
                ...newQuestions[currentScramblerIndex],
                userAnswer: e.target.value,
            };
            setScramblerQuestions(newQuestions);
        };
    
        const handleCheckAnswer = (e: React.FormEvent) => {
            e.preventDefault();
            if (currentQuestion.isCorrect !== null) return;
    
            const userAnswer = currentQuestion.userAnswer.trim().toLowerCase();
            const correctAnswer = currentQuestion.original.word.toLowerCase();
            const isCorrect = userAnswer === correctAnswer;
            
            if (isCorrect) {
                setScramblerScore(prev => prev + 1);
            }
            
            handleWordPractice(currentQuestion.original, isCorrect ? 'good' : 'hard');
    
            const newQuestions = [...scramblerQuestions];
            newQuestions[currentScramblerIndex] = {
                ...newQuestions[currentScramblerIndex],
                isCorrect: isCorrect,
            };
            setScramblerQuestions(newQuestions);
        };
    
        const handleNextQuestion = () => {
            if (currentScramblerIndex + 1 < scramblerQuestions.length) {
                setCurrentScramblerIndex(prev => prev + 1);
            } else {
                setIsScramblerSessionFinished(true);
            }
        };

        let inputClasses = 'border-slate-300 focus:border-blue-500 focus:ring-blue-500';
        if (currentQuestion.isCorrect === true) {
            inputClasses = 'border-green-500 ring-green-500 bg-green-50';
        } else if (currentQuestion.isCorrect === false) {
            inputClasses = 'border-red-500 ring-red-500 bg-red-50 animate-shake';
        }

        return (
             <div>
                 <div className="text-right text-sm font-semibold text-slate-600 mb-2">
                    <span>Progress: {currentScramblerIndex + 1} / {scramblerQuestions.length}</span>
                    <span className="mx-2">|</span>
                    <span>Score: {scramblerScore}</span>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200">
                    <p className="text-xl text-center text-slate-700 mb-6">{currentQuestion.original.definition}</p>

                    <div className="bg-blue-50 p-4 rounded-lg text-center mb-6">
                        <p className="text-3xl font-bold tracking-[0.2em] text-blue-700 uppercase">
                            {currentQuestion.scrambled}
                        </p>
                    </div>
                    
                    <form onSubmit={handleCheckAnswer} className="flex flex-col sm:flex-row gap-2">
                        <input
                            type="text"
                            value={currentQuestion.userAnswer}
                            onChange={handleScramblerInputChange}
                            disabled={currentQuestion.isCorrect !== null}
                            className={`flex-grow p-3 border-2 rounded-lg text-lg focus:outline-none focus:ring-2 transition-colors ${inputClasses}`}
                            placeholder="Type the unscrambled word"
                            autoFocus
                            autoComplete="off"
                        />
                         {currentQuestion.isCorrect === null && (
                            <div className="flex gap-2 shrink-0">
                                <button type="submit" className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors flex-grow sm:flex-grow-0">
                                    Check
                                </button>
                                <button 
                                    type="button" 
                                    onClick={handleShuffleScrambler}
                                    className="p-3 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
                                    title="Get a different word"
                                    disabled={scramblerQuestions.slice(currentScramblerIndex).filter(q => q.isCorrect === null).length < 2}
                                    aria-label="Shuffle word"
                                >
                                    <ShuffleIcon className="h-6 w-6" />
                                </button>
                            </div>
                        )}
                    </form>

                    {currentQuestion.isCorrect !== null && (
                        <div className="mt-4 text-center">
                             {currentQuestion.isCorrect === false && (
                                <p className="text-red-600 mb-2">
                                    The correct answer is: <strong className="font-bold text-red-700">{currentQuestion.original.word}</strong>
                                </p>
                            )}
                             {currentQuestion.isCorrect === true && (
                                <p className="text-green-600 font-semibold mb-2">Correct!</p>
                             )}
                            <button 
                                onClick={handleNextQuestion} 
                                className="w-full sm:w-auto sm:px-12 py-3 bg-slate-700 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors"
                            >
                                {currentScramblerIndex + 1 < scramblerQuestions.length ? 'Next' : 'Finish Session'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    const renderSpellingRecall = () => {
        if (isSpellingSessionFinished) {
            const totalPossibleScore = spellingQuestions.reduce((sum, q) => sum + q.original.word.length, 0);
            return (
                <div className="text-center bg-white p-8 rounded-xl shadow-lg">
                    <h3 className="text-2xl font-bold text-slate-800">Session Complete!</h3>
                    <p className="text-6xl font-bold text-blue-600 my-4">{spellingScore}</p>
                    <p className="text-lg text-slate-600">You scored <span className="font-bold">{spellingScore}</span> out of a possible <span className="font-bold">{totalPossibleScore}</span> points.</p>
                    <button onClick={startSpellingGame} className="mt-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                        Play Again
                    </button>
                </div>
            );
        }
    
        const currentQuestion = spellingQuestions[currentSpellingIndex];
        if (!currentQuestion) return null;
    
        const handleSpellingInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (currentQuestion.isCorrect !== null) return;
            const newQuestions = [...spellingQuestions];
            newQuestions[currentSpellingIndex].userAnswer = e.target.value;
            setSpellingQuestions(newQuestions);
        };
    
        const handleCheckSpellingAnswer = (e: React.FormEvent) => {
            e.preventDefault();
            if (currentQuestion.isCorrect !== null) return;
    
            const isCorrect = currentQuestion.userAnswer.trim().toLowerCase() === currentQuestion.original.word.toLowerCase();
    
            if (isCorrect) {
                const maxPoints = currentQuestion.original.word.length;
                const points = Math.max(0, maxPoints - currentQuestion.revealedCount);
                setSpellingScore(prev => prev + points);
                handleWordPractice(currentQuestion.original, 'good');
                
                const newQuestions = [...spellingQuestions];
                newQuestions[currentSpellingIndex].isCorrect = true;
                setSpellingQuestions(newQuestions);
            } else {
                setToastMessage("Incorrect. A hint has been revealed.");
                setTimeout(() => setToastMessage(null), 2000);
                
                const wordLength = currentQuestion.original.word.length;
                if (currentQuestion.revealedCount < wordLength) {
                    const newQuestions = [...spellingQuestions];
                    newQuestions[currentSpellingIndex].revealedCount++;
                    setSpellingQuestions(newQuestions);
                }
            }
        };
    
        const handleRevealLetter = () => {
            if (currentQuestion.isCorrect !== null) return;
            const wordLength = currentQuestion.original.word.length;
            if (currentQuestion.revealedCount < wordLength) {
                const newQuestions = [...spellingQuestions];
                newQuestions[currentSpellingIndex].revealedCount++;
                setSpellingQuestions(newQuestions);
            }
        };

        const handleGiveUp = () => {
            if (currentQuestion.isCorrect !== null) return;
            handleWordPractice(currentQuestion.original, 'hard');
            const newQuestions = [...spellingQuestions];
            newQuestions[currentSpellingIndex].isCorrect = false;
            setSpellingQuestions(newQuestions);
        };
    
        const handleNextSpellingQuestion = () => {
            if (currentSpellingIndex + 1 < spellingQuestions.length) {
                setCurrentSpellingIndex(prev => prev + 1);
            } else {
                setIsSpellingSessionFinished(true);
            }
        };
    
        const wordDisplay = currentQuestion.original.word
            .split('')
            .map((char, i) => (currentQuestion.isCorrect === false || i < currentQuestion.revealedCount) ? char : '_')
            .join(' ');
    
        let inputClasses = 'border-slate-300 focus:border-blue-500 focus:ring-blue-500';
        if (currentQuestion.isCorrect === true) {
            inputClasses = 'border-green-500 ring-green-500 bg-green-50 text-green-800 font-bold';
        } else if (currentQuestion.isCorrect === false) {
            inputClasses = 'border-red-500 ring-red-500 bg-red-50 text-red-800 font-semibold';
        }
    
        return (
            <div>
                <div className="text-right text-sm font-semibold text-slate-600 mb-2">
                    <span>Progress: {currentSpellingIndex + 1} / {spellingQuestions.length}</span>
                    <span className="mx-2">|</span>
                    <span>Score: {spellingScore}</span>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200">
                    <p className="text-xl text-center text-slate-700 mb-6">{currentQuestion.original.definition}</p>
    
                    <div className="bg-blue-50 p-4 rounded-lg text-center mb-6 min-h-[64px] flex items-center justify-center">
                        <p className="text-3xl font-bold tracking-[0.2em] text-blue-700 uppercase">
                            {wordDisplay}
                        </p>
                    </div>
                    
                    {currentQuestion.isCorrect !== null ? (
                         <div className="mt-4 text-center">
                            {currentQuestion.isCorrect ? (
                               <p className="text-green-600 font-semibold mb-2 text-xl">Correct!</p>
                            ) : (
                               <p className="text-red-600 mb-2">The correct answer was: <strong className="font-bold text-red-700">{currentQuestion.original.word}</strong></p>
                            )}
                           <button 
                               onClick={handleNextSpellingQuestion} 
                               className="w-full sm:w-auto sm:px-12 py-3 bg-slate-700 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors"
                           >
                               {currentSpellingIndex + 1 < spellingQuestions.length ? 'Next' : 'Finish Session'}
                           </button>
                       </div>
                    ) : (
                        <form onSubmit={handleCheckSpellingAnswer}>
                             <input
                                type="text"
                                value={currentQuestion.userAnswer}
                                onChange={handleSpellingInputChange}
                                className={`w-full p-3 border-2 rounded-lg text-lg text-center focus:outline-none focus:ring-2 transition-colors ${inputClasses}`}
                                placeholder="Type the English word"
                                autoFocus
                                autoComplete="off"
                            />
                            <div className="mt-4 flex flex-col sm:flex-row gap-2 justify-center">
                                <button type="button" onClick={handleRevealLetter} className="px-5 py-2 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition-colors flex-1">
                                    Reveal Letter
                                </button>
                                <button type="submit" className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors flex-[2]">
                                    Check Answer
                                </button>
                                <button type="button" onClick={handleGiveUp} className="px-5 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors flex-1">
                                    I give up
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        );
    };

    const renderAudioDictationChallenge = () => {
        if (isAudioDictationSessionFinished) {
            const totalPossibleScore = audioDictationQuestions.length * 2;
            return (
                <div className="text-center bg-white p-8 rounded-xl shadow-lg">
                    <h3 className="text-2xl font-bold text-slate-800">Session Complete!</h3>
                    <p className="text-6xl font-bold text-blue-600 my-4">{audioDictationScore}</p>
                    <p className="text-lg text-slate-600">You scored <span className="font-bold">{audioDictationScore}</span> out of a possible <span className="font-bold">{totalPossibleScore}</span> points.</p>
                    <button onClick={startAudioDictationGame} className="mt-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                        Play Again
                    </button>
                </div>
            );
        }

        const currentQuestion = audioDictationQuestions[currentAudioDictationIndex];
        if (!currentQuestion) return null;

        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (currentQuestion.isCorrect !== null) return;
            const newQuestions = [...audioDictationQuestions];
            newQuestions[currentAudioDictationIndex].userAnswer = e.target.value;
            setAudioDictationQuestions(newQuestions);
        };

        const handleCheckAnswer = (e: React.FormEvent) => {
            e.preventDefault();
            if (currentQuestion.isCorrect !== null) return;

            const isCorrect = currentQuestion.userAnswer.trim().toLowerCase() === currentQuestion.original.word.toLowerCase();
            
            if (isCorrect) {
                const points = currentQuestion.meaningRevealed ? 1 : 2;
                setAudioDictationScore(prev => prev + points);
                handleWordPractice(currentQuestion.original, 'good');
            } else {
                handleWordPractice(currentQuestion.original, 'hard');
            }

            const newQuestions = [...audioDictationQuestions];
            newQuestions[currentAudioDictationIndex].isCorrect = isCorrect;
            setAudioDictationQuestions(newQuestions);
        };
        
        const handleRevealMeaning = () => {
            if (currentQuestion.isCorrect !== null || currentQuestion.meaningRevealed) return;
            const newQuestions = [...audioDictationQuestions];
            newQuestions[currentAudioDictationIndex].meaningRevealed = true;
            setAudioDictationQuestions(newQuestions);
        };

        const handleGiveUp = () => {
            if (currentQuestion.isCorrect !== null) return;
            handleWordPractice(currentQuestion.original, 'hard');
            const newQuestions = [...audioDictationQuestions];
            newQuestions[currentAudioDictationIndex].isCorrect = false;
            setAudioDictationQuestions(newQuestions);
        };

        const handleNextQuestion = () => {
            if (currentAudioDictationIndex + 1 < audioDictationQuestions.length) {
                setCurrentAudioDictationIndex(prev => prev + 1);
            } else {
                setIsAudioDictationSessionFinished(true);
            }
        };

        let inputClasses = 'border-slate-300 focus:border-blue-500 focus:ring-blue-500';
        if (currentQuestion.isCorrect === true) {
            inputClasses = 'border-green-500 ring-green-500 bg-green-50 text-green-800 font-bold';
        } else if (currentQuestion.isCorrect === false) {
            inputClasses = 'border-red-500 ring-red-500 bg-red-50 text-red-800 font-semibold';
        }
        
        return (
            <div>
                <div className="text-right text-sm font-semibold text-slate-600 mb-2">
                    <span>Progress: {currentAudioDictationIndex + 1} / {audioDictationQuestions.length}</span>
                    <span className="mx-2">|</span>
                    <span>Score: {audioDictationScore}</span>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200">
                    <div className="mb-6">
                        <AudioPlayer audioScript={currentQuestion.original.word} />
                    </div>

                    <div className="text-center text-slate-700 mb-6 min-h-[3rem] flex items-center justify-center">
                        {currentQuestion.meaningRevealed && (
                            <p className="text-xl font-semibold animate-fade-in">{currentQuestion.original.definition}</p>
                        )}
                    </div>
                    
                    {currentQuestion.isCorrect !== null ? (
                         <div className="mt-4 text-center">
                            {currentQuestion.isCorrect ? (
                               <p className="text-green-600 font-semibold mb-2 text-xl">Correct!</p>
                            ) : (
                               <p className="text-red-600 mb-2">The correct answer was: <strong className="font-bold text-red-700">{currentQuestion.original.word}</strong></p>
                            )}
                           <button 
                               onClick={handleNextQuestion} 
                               className="w-full sm:w-auto sm:px-12 py-3 bg-slate-700 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors"
                           >
                               {currentAudioDictationIndex + 1 < audioDictationQuestions.length ? 'Next' : 'Finish Session'}
                           </button>
                       </div>
                    ) : (
                        <form onSubmit={handleCheckAnswer}>
                             <input
                                type="text"
                                value={currentQuestion.userAnswer}
                                onChange={handleInputChange}
                                className={`w-full p-3 border-2 rounded-lg text-lg text-center focus:outline-none focus:ring-2 transition-colors ${inputClasses}`}
                                placeholder="Type what you hear..."
                                autoFocus
                                autoComplete="off"
                            />
                            <div className="mt-4 flex flex-col sm:flex-row gap-2 justify-center">
                                <button type="button" onClick={handleRevealMeaning} className="px-5 py-2 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition-colors flex-1" disabled={currentQuestion.meaningRevealed}>
                                    Reveal Meaning
                                </button>
                                <button type="submit" className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors flex-[2]">
                                    Check Answer
                                </button>
                                <button type="button" onClick={handleGiveUp} className="px-5 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors flex-1">
                                    I give up
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        );
    }

    const HangmanDrawing = ({ incorrectGuesses }: { incorrectGuesses: number }) => {
        const head = <circle cx="125" cy="70" r="20" stroke="currentColor" strokeWidth="4" fill="none" />;
        const body = <line x1="125" y1="90" x2="125" y2="150" stroke="currentColor" strokeWidth="4" />;
        const rightArm = <line x1="125" y1="110" x2="155" y2="140" stroke="currentColor" strokeWidth="4" />;
        const leftArm = <line x1="125" y1="110" x2="95" y2="140" stroke="currentColor" strokeWidth="4" />;
        const rightLeg = <line x1="125" y1="150" x2="155" y2="180" stroke="currentColor" strokeWidth="4" />;
        const leftLeg = <line x1="125" y1="150" x2="95" y2="180" stroke="currentColor" strokeWidth="4" />;
    
        const bodyParts = [head, body, rightArm, leftArm, rightLeg, leftLeg];
    
        return (
            <svg height="250" width="200" className="mx-auto stroke-slate-700">
                <line x1="20" y1="230" x2="100" y2="230" strokeWidth="4" />
                <line x1="60" y1="230" x2="60" y2="30" strokeWidth="4" />
                <line x1="60" y1="30" x2="125" y2="30" strokeWidth="4" />
                <line x1="125" y1="30" x2="125" y2="50" strokeWidth="4" />
                {bodyParts.slice(0, incorrectGuesses).map((part, index) => React.cloneElement(part, { key: index }))}
            </svg>
        );
    };

    const renderHangman = () => {
        if (isHangmanSessionFinished) {
            return (
                 <div className="text-center bg-white p-8 rounded-xl shadow-lg">
                    <h3 className="text-2xl font-bold text-slate-800">Session Complete!</h3>
                    <p className="text-6xl font-bold text-blue-600 my-4">{Math.round((hangmanScore / hangmanQuestions.length) * 100)}%</p>
                    <p className="text-lg text-slate-600">You guessed <span className="font-bold">{hangmanScore}</span> out of <span className="font-bold">{hangmanQuestions.length}</span> words correctly.</p>
                    <button onClick={startHangmanGame} className="mt-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                        Play Again
                    </button>
                </div>
            )
        }
        
        const currentQuestion = hangmanQuestions[currentHangmanIndex];
        if (!currentQuestion) return null;

        const handleGuess = (letter: string) => {
            if (currentQuestion.status !== 'playing') return;

            const newQuestions = [...hangmanQuestions];
            const q = newQuestions[currentHangmanIndex];

            if (q.letters.includes(letter)) {
                q.guessedCorrectly.add(letter);
            } else {
                q.guessedIncorrectly.add(letter);
            }
            
            const isWon = q.letters.every(l => q.guessedCorrectly.has(l));
            const isLost = q.guessedIncorrectly.size >= MAX_INCORRECT_GUESSES;

            if(isWon) {
                q.status = 'won';
                setHangmanScore(prev => prev + 1);
                handleWordPractice(q.original, 'good');
            } else if (isLost) {
                q.status = 'lost';
                handleWordPractice(q.original, 'hard');
            }

            setHangmanQuestions(newQuestions);
        };

        const handleNextHangman = () => {
            if (currentHangmanIndex + 1 < hangmanQuestions.length) {
                setCurrentHangmanIndex(prev => prev + 1);
            } else {
                setIsHangmanSessionFinished(true);
            }
        }
        
        const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

        return (
            <div>
                 <div className="text-right text-sm font-semibold text-slate-600 mb-2">
                    <span>Word: {currentHangmanIndex + 1} / {hangmanQuestions.length}</span>
                    <span className="mx-2">|</span>
                    <span>Score: {hangmanScore}</span>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                        <HangmanDrawing incorrectGuesses={currentQuestion.guessedIncorrectly.size} />
                        <div className="text-center md:text-left">
                            <p className="text-lg text-slate-600 mb-4">Clue: <span className="font-semibold">{currentQuestion.original.definition}</span></p>
                            <div className="flex justify-center md:justify-start gap-2 flex-wrap mb-4">
                                {currentQuestion.letters.map((letter, index) => (
                                    <span key={index} className="w-10 h-10 bg-slate-200 rounded-md flex items-center justify-center text-2xl font-bold uppercase">
                                        {currentQuestion.guessedCorrectly.has(letter) || currentQuestion.status === 'lost' ? letter : ''}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                     {currentQuestion.status !== 'playing' ? (
                        <div className="text-center mt-4">
                            {currentQuestion.status === 'won' && <p className="text-2xl font-bold text-green-600">You won!</p>}
                            {currentQuestion.status === 'lost' && <p className="text-2xl font-bold text-red-600">You lost! The word was: {currentQuestion.original.word}</p>}
                            <button onClick={handleNextHangman} className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg">
                                {currentHangmanIndex < hangmanQuestions.length - 1 ? 'Next Word' : 'Finish'}
                            </button>
                        </div>
                    ) : (
                         <div className="mt-6 flex flex-wrap gap-2 justify-center">
                            {alphabet.map(letter => {
                                const isGuessed = currentQuestion.guessedCorrectly.has(letter) || currentQuestion.guessedIncorrectly.has(letter);
                                return (
                                <button
                                    key={letter}
                                    onClick={() => handleGuess(letter)}
                                    disabled={isGuessed}
                                    className="w-10 h-10 font-bold uppercase rounded-md bg-slate-200 hover:bg-slate-300 disabled:bg-slate-400 disabled:text-white disabled:cursor-not-allowed transition-colors"
                                >
                                    {letter}
                                </button>
                            )})}
                        </div>
                    )}
                </div>
            </div>
        )
    };
    
    const renderDefinitionMatch = () => {
         if (isDMatchGameFinished) {
            return (
                <div className="text-center bg-white p-8 rounded-xl shadow-lg">
                    <h3 className="text-2xl font-bold text-slate-800">Congratulations!</h3>
                    <p className="text-lg text-slate-600 mt-2">You matched all the words.</p>
                    <button onClick={startDMatchGame} className="mt-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                        Play Again
                    </button>
                </div>
            );
        }
        
        if (isDMatchTurnFinished) {
            return (
                <div className="text-center bg-white p-8 rounded-xl shadow-lg">
                    <h3 className="text-2xl font-bold text-slate-800">Round {dMatchTurn + 1} Complete!</h3>
                    <p className="text-lg text-slate-600 mt-2">Ready for the next set?</p>
                    <button onClick={() => setupDMatchTurn(fullDMatchDeck, dMatchTurn + 1)} className="mt-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                        Next Round
                    </button>
                </div>
            );
        }

        const handleDMatchSelect = (item: DMatchItemType) => {
            setIncorrectDMatchPair(null);
            if (correctDMatches.includes(item.item.word)) return;
    
            if (item.type === 'word') {
                setSelectedDMatchWord(item);
            } else if (item.type === 'definition' && selectedDMatchWord) {
                if (item.item.word === selectedDMatchWord.item.word) {
                    // Correct match
                    setCorrectDMatches(prev => [...prev, item.item.word]);
                    handleWordPractice(item.item, 'good');
                    setSelectedDMatchWord(null);

                    if (correctDMatches.length + 1 === dMatchWords.length) {
                         const isMoreWords = (dMatchTurn + 1) * WORDS_PER_DMATCH_TURN < fullDMatchDeck.length;
                        if(isMoreWords) setIsDMatchTurnFinished(true);
                        else setIsDMatchGameFinished(true);
                    }

                } else {
                    // Incorrect match
                    setIncorrectDMatchPair([selectedDMatchWord.item.word, item.item.definition]);
                    handleWordPractice(selectedDMatchWord.item, 'hard');
                    setSelectedDMatchWord(null);
                    setTimeout(() => setIncorrectDMatchPair(null), 1000);
                }
            }
        };

        const getItemClasses = (item: DMatchItemType) => {
            const base = "w-full p-4 border rounded-lg text-left transition-all duration-200";
            if (correctDMatches.includes(item.item.word)) return `${base} bg-green-100 border-green-300 text-green-800 cursor-not-allowed`;
            if (incorrectDMatchPair && (incorrectDMatchPair[0] === item.item.word || incorrectDMatchPair[1] === item.item.definition)) return `${base} bg-red-100 border-red-400 animate-shake`;
            if (selectedDMatchWord?.item.word === item.item.word && item.type === 'word') return `${base} bg-blue-100 border-blue-400 ring-2 ring-blue-300`;
            return `${base} bg-white hover:bg-slate-50 border-slate-300`;
        };

        return (
            <div>
                 <p className="text-center text-slate-600 mb-6">Click a word, then click its matching definition. <strong>Round {dMatchTurn + 1} of {Math.ceil(fullDMatchDeck.length / WORDS_PER_DMATCH_TURN)}</strong></p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    <div className="space-y-3">
                        {dMatchWords.map(wordItem => (
                            <button key={wordItem.item.word} onClick={() => handleDMatchSelect(wordItem)} className={getItemClasses(wordItem)}>
                                <span className="font-bold">{wordItem.item.word}</span>
                            </button>
                        ))}
                    </div>
                     <div className="space-y-3">
                        {dMatchDefinitions.map(defItem => (
                            <button key={defItem.item.word} onClick={() => handleDMatchSelect(defItem)} className={getItemClasses(defItem)}>
                                {defItem.item.definition}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
             {toastMessage && (
                <div className="fixed bottom-5 right-5 bg-slate-800 text-white px-6 py-3 rounded-lg shadow-xl z-50 animate-bounce">
                    {toastMessage}
                </div>
            )}
            <div className="max-w-4xl mx-auto">
                <button onClick={onBack} className="mb-8 inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Back to Test List
                </button>
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">{testData.title}</h2>
                    <p className="text-slate-600">{testData.words.length} terms</p>
                </div>

                <div className="flex justify-center items-center gap-1 sm:gap-2 bg-slate-200 p-1 rounded-full mb-8 flex-wrap">
                    <button 
                        onClick={() => handleModeChange('flashcards')} 
                        className={`px-3 sm:px-4 py-2 rounded-full font-semibold flex items-center gap-2 transition-colors text-sm sm:text-base ${mode === 'flashcards' ? 'bg-white text-blue-600 shadow' : 'bg-transparent text-slate-600'}`}>
                        <BookOpenIcon className="h-5 w-5" /> Flashcards
                    </button>
                    <button 
                        onClick={() => handleModeChange('quiz')} 
                        className={`px-3 sm:px-4 py-2 rounded-full font-semibold flex items-center gap-2 transition-colors text-sm sm:text-base ${mode === 'quiz' ? 'bg-white text-blue-600 shadow' : 'bg-transparent text-slate-600'}`}>
                        <BrainIcon className="h-5 w-5" /> Quiz
                    </button>
                     <button 
                        onClick={() => handleModeChange('definition_match')} 
                        className={`px-3 sm:px-4 py-2 rounded-full font-semibold flex items-center gap-2 transition-colors text-sm sm:text-base ${mode === 'definition_match' ? 'bg-white text-blue-600 shadow' : 'bg-transparent text-slate-600'}`}>
                        <LinkIcon className="h-5 w-5" /> Definition Match
                    </button>
                    <button 
                        onClick={() => handleModeChange('matching_game')} 
                        className={`px-3 sm:px-4 py-2 rounded-full font-semibold flex items-center gap-2 transition-colors text-sm sm:text-base ${mode === 'matching_game' ? 'bg-white text-blue-600 shadow' : 'bg-transparent text-slate-600'}`}>
                        <GridIcon className="h-5 w-5" /> Card Match
                    </button>
                     <button 
                        onClick={() => handleModeChange('scrambler')} 
                        className={`px-3 sm:px-4 py-2 rounded-full font-semibold flex items-center gap-2 transition-colors text-sm sm:text-base ${mode === 'scrambler' ? 'bg-white text-blue-600 shadow' : 'bg-transparent text-slate-600'}`}>
                        <PuzzleIcon className="h-5 w-5" /> Scrambler
                    </button>
                    <button 
                        onClick={() => handleModeChange('spelling_recall')} 
                        className={`px-3 sm:px-4 py-2 rounded-full font-semibold flex items-center gap-2 transition-colors text-sm sm:text-base ${mode === 'spelling_recall' ? 'bg-white text-blue-600 shadow' : 'bg-transparent text-slate-600'}`}>
                        <TypeIcon className="h-5 w-5" /> Spelling
                    </button>
                    <button 
                        onClick={() => handleModeChange('audio_dictation')} 
                        className={`px-3 sm:px-4 py-2 rounded-full font-semibold flex items-center gap-2 transition-colors text-sm sm:text-base ${mode === 'audio_dictation' ? 'bg-white text-blue-600 shadow' : 'bg-transparent text-slate-600'}`}>
                        <HeadphoneIcon className="h-5 w-5" /> Audio
                    </button>
                     <button 
                        onClick={() => handleModeChange('hangman')} 
                        className={`px-3 sm:px-4 py-2 rounded-full font-semibold flex items-center gap-2 transition-colors text-sm sm:text-base ${mode === 'hangman' ? 'bg-white text-blue-600 shadow' : 'bg-transparent text-slate-600'}`}>
                        <TargetIcon className="h-5 w-5" /> Hangman
                    </button>
                </div>

                <div>
                    {mode === 'flashcards' && renderFlashcards()}
                    {mode === 'quiz' && renderQuiz()}
                    {mode === 'matching_game' && renderMatchingGame()}
                    {mode === 'scrambler' && renderScrambler()}
                    {mode === 'spelling_recall' && renderSpellingRecall()}
                    {mode === 'audio_dictation' && renderAudioDictationChallenge()}
                    {mode === 'hangman' && renderHangman()}
                    {mode === 'definition_match' && renderDefinitionMatch()}
                </div>

                {mode === 'flashcards' && (
                    <div className="mt-8 flex justify-end">
                        <button onClick={handleShuffle} className="p-2 rounded-full hover:bg-slate-200 transition-colors" title="Shuffle Deck">
                           <ShuffleIcon className="h-6 w-6 text-slate-600" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VocabularyTestScreen;
