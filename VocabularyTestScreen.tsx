import React, { useState, useEffect, useCallback } from 'react';
import { VocabularyTest, VocabItem, VocabularyWord } from '../types';
import { updateWordSrsLevel } from '../services/vocabularyService';
import { BookOpenIcon, BrainIcon, ShuffleIcon, ArrowLeftIcon, ArrowRightIcon, CheckCircleIcon, XCircleIcon } from './icons';

type StudyMode = 'flashcards' | 'quiz';

interface QuizQuestion {
    questionText: string; // The definition
    options: string[]; // Array of words
    correctAnswer: string; // The correct word
    userAnswer: string | null;
    isCorrect: boolean | null;
}

const shuffleArray = <T,>(array: T[]): T[] => {
    return [...array].sort(() => Math.random() - 0.5);
};

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

    useEffect(() => {
        setDeck(testData.words);
        setCurrentCardIndex(0);
        setIsFlipped(false);
        generateQuizQuestions();
        setCurrentQuizIndex(0);
        setScore(0);
        setIsQuizSessionFinished(false);
    }, [testData, generateQuizQuestions]);
    
    const handleWordPractice = useCallback((word: VocabItem, performance: 'good' | 'hard') => {
        const wordId = word.word.toLowerCase();
        // This service function now handles both adding new words and updating existing ones.
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
        if (quizQuestions[currentQuizIndex].userAnswer !== null) return; // Already answered

        const currentQuestion = quizQuestions[currentQuizIndex];
        const isCorrect = selectedOption === currentQuestion.correctAnswer;

        if (isCorrect) {
            setScore(prev => prev + 1);
        }
        
        // Find the full vocab item to save to SRS
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
        }, 1500); // Wait 1.5 seconds before moving to the next question
    };

    const restartQuizSession = () => {
        generateQuizQuestions();
        setCurrentQuizIndex(0);
        setScore(0);
        setIsQuizSessionFinished(false);
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
                        {/* Front of Card - Show English word */}
                        <div className="absolute w-full h-full backface-hidden bg-white rounded-xl shadow-2xl border border-slate-200 flex items-center justify-center p-6 cursor-pointer">
                             <h2 className="text-4xl md:text-5xl font-bold text-slate-800 text-center">{currentCard.word}</h2>
                        </div>
                        {/* Back of Card - Show English and Vietnamese meaning */}
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

    return (
        <div className="container mx-auto px-4 py-12">
             {toastMessage && (
                <div className="fixed bottom-5 right-5 bg-slate-800 text-white px-6 py-3 rounded-lg shadow-xl z-50 animate-bounce">
                    {toastMessage}
                </div>
            )}
            <div className="max-w-3xl mx-auto">
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

                <div className="flex justify-center items-center gap-4 bg-slate-200 p-1 rounded-full mb-8">
                    <button 
                        onClick={() => setMode('flashcards')} 
                        className={`px-6 py-2 rounded-full font-semibold flex items-center gap-2 transition-colors ${mode === 'flashcards' ? 'bg-white text-blue-600 shadow' : 'bg-transparent text-slate-600'}`}>
                        <BookOpenIcon className="h-5 w-5" /> Flashcards
                    </button>
                    <button 
                        onClick={() => setMode('quiz')} 
                        className={`px-6 py-2 rounded-full font-semibold flex items-center gap-2 transition-colors ${mode === 'quiz' ? 'bg-white text-blue-600 shadow' : 'bg-transparent text-slate-600'}`}>
                        <BrainIcon className="h-5 w-5" /> Quiz
                    </button>
                </div>

                <div>
                    {mode === 'flashcards' && renderFlashcards()}
                    {mode === 'quiz' && renderQuiz()}
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