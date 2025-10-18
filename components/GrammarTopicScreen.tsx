import React, { useEffect, useState, useMemo, useRef, useCallback } from 'react';
// FIX: Moved generateDeterminerExercise to import from geminiService as it is not exported from grammarLibrary
import { getGrammarTopicContent, getGrammarQuizQuestions, getGrammarQuizLevels } from '../services/grammarLibrary';
import { generateDeterminerExercise } from '../services/geminiService';
import { GrammarTopicContent, GrammarQuestion, QuestionOption, DeterminerExercise, User } from '../types';
import SelectionCard from './SelectionCard';
import QuestionPalette from './QuestionPalette';
import { CheckCircleIcon, XCircleIcon, ArrowLeftIcon, SparklesIcon, LoadingIcon, RefreshIcon } from './icons';
import { addTestResult } from '../services/progressService';

interface UserAnswers {
    [questionId: string]: QuestionOption | null;
}

interface GrammarTopicScreenProps {
  topic: string;
  onBack: () => void;
  currentUser: User;
  onSelectTopic: (topic: string) => void;
}

// --- START: Drag-and-Drop Classification Quiz Component ---

const shuffleArray = <T,>(array: T[]): T[] => {
    return [...array].sort(() => Math.random() - 0.5);
};

const allWordData = [
  // Giới từ
  { word: 'despite', type: 'Giới từ' },
  { word: 'during', type: 'Giới từ' },
  { word: 'regarding', type: 'Giới từ' },
  { word: 'in spite of', type: 'Giới từ' },
  { word: 'because of', type: 'Giới từ' },
  { word: 'according to', type: 'Giới từ' },
  { word: 'within', type: 'Giới từ' },
  { word: 'following', type: 'Giới từ' },
  { word: 'aboard', type: 'Giới từ' },
  { word: 'across', type: 'Giới từ' },
  { word: 'above', type: 'Giới từ' },
  { word: 'beneath', type: 'Giới từ' },
  { word: 'due to', type: 'Giới từ' },
  { word: 'owing to', type: 'Giới từ' },
  { word: 'prior to', type: 'Giới từ' },
  { word: 'without', type: 'Giới từ' },
  { word: 'in case of', type: 'Giới từ' },

  // Liên từ
  { word: 'because', type: 'Liên từ' },
  { word: 'although', type: 'Liên từ' },
  { word: 'unless', type: 'Liên từ' },
  { word: 'so that', type: 'Liên từ' },
  { word: 'whereas', type: 'Liên từ' },
  { word: 'if', type: 'Liên từ' },
  { word: 'while', type: 'Liên từ' },
  { word: 'as soon as', type: 'Liên từ' },
  { word: 'since', type: 'Liên từ' },
  { word: 'even though', type: 'Liên từ' },
  { word: 'provided that', type: 'Liên từ' },
  { word: 'in order that', type: 'Liên từ' },
  { word: 'as if', type: 'Liên từ' },
  { word: 'whether', type: 'Liên từ' },
  { word: 'now that', type: 'Liên từ' },
  { word: 'until', type: 'Liên từ' },
  { word: 'after', type: 'Liên từ' },
];

const getWordType = (word: string) => {
    return allWordData.find(item => item.word === word)?.type || '';
};

const generateNewTurn = () => {
    const randomWordsData = shuffleArray(allWordData).slice(0, 15);
    const words = randomWordsData.map(w => w.word);
    return {
        wordDataForTurn: randomWordsData,
        columns: {
            source: shuffleArray(words),
            'Giới từ': [],
            'Liên từ': [],
        }
    };
};

const ClassificationQuizScreen: React.FC<{onBack: () => void; currentUser: User;}> = ({ onBack, currentUser }) => {
    const [quizTurn, setQuizTurn] = useState(generateNewTurn);
    const [draggedWord, setDraggedWord] = useState<string | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    
    const { columns, wordDataForTurn } = quizTurn;

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, word: string) => {
        setDraggedWord(word);
        e.dataTransfer.setData("text/plain", word);
        e.currentTarget.classList.add('opacity-50');
    };
    
    const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
        e.currentTarget.classList.remove('opacity-50');
        setDraggedWord(null);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (e.currentTarget.dataset.droptarget) {
            e.currentTarget.classList.add('bg-blue-100');
        }
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        if (e.currentTarget.dataset.droptarget) {
            e.currentTarget.classList.remove('bg-blue-100');
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetColumn: string) => {
        e.preventDefault();
        e.currentTarget.classList.remove('bg-blue-100');
        const word = e.dataTransfer.getData("text/plain");
        if (!word || columns[targetColumn].includes(word)) return;

        setQuizTurn(prev => {
            const newColumns = {...prev.columns};
            // Remove from all columns first
            for (const key in newColumns) {
                newColumns[key] = newColumns[key].filter(w => w !== word);
            }
            // Add to the target column
            newColumns[targetColumn] = [...newColumns[targetColumn], word].sort();
            return { ...prev, columns: newColumns };
        });
    };

    const handleCheckAnswers = () => {
        let correctCount = 0;
        const totalWords = wordDataForTurn.length;

        for (const word of columns['Giới từ']) {
            if (getWordType(word) === 'Giới từ') {
                correctCount++;
            }
        }
        for (const word of columns['Liên từ']) {
            if (getWordType(word) === 'Liên từ') {
                correctCount++;
            }
        }
        setScore(correctCount);
        setIsSubmitted(true);
        addTestResult(currentUser.username, 'grammar', {
            id: `grammar-classification-${Date.now()}`,
            title: `Phân loại Giới từ & Liên từ`,
            score: correctCount,
            total: totalWords,
            date: Date.now()
        });
    };

    const handleTryAgain = () => {
        setQuizTurn(generateNewTurn());
        setIsSubmitted(false);
        setScore(0);
    };

    const getWordStyle = (word: string, columnType: 'Giới từ' | 'Liên từ') => {
        if (!isSubmitted) return 'bg-white hover:bg-slate-100 cursor-grab';
        
        const correctType = getWordType(word);
        if (correctType === columnType) {
            return 'bg-green-100 border-green-500 text-green-800';
        } else {
            return 'bg-red-100 border-red-500 text-red-800';
        }
    };

    const dropZoneBaseClass = "p-4 rounded-lg min-h-[300px] transition-colors border-2 border-dashed";
    
    return (
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-slate-200">
            <h2 className="text-2xl font-bold text-center mb-4">Phân loại Giới từ & Liên từ</h2>
            <p className="text-center text-slate-600 mb-6">Drag each word into the correct category below.</p>
            
            <div 
                className={`${dropZoneBaseClass} bg-slate-100 mb-6 border-slate-300`}
                data-droptarget="true"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, 'source')}
            >
                <h3 className="font-bold text-lg mb-4 text-center">Words to Classify</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                    {columns.source.map(word => (
                        <div key={word} draggable={!isSubmitted} onDragStart={(e) => handleDragStart(e, word)} onDragEnd={handleDragEnd} className="px-3 py-1.5 border rounded-md shadow-sm bg-white hover:bg-slate-100 cursor-grab">
                            {word}
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Giới từ Column */}
                <div 
                    className={`${dropZoneBaseClass} bg-blue-50 border-blue-200`}
                    data-droptarget="true"
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, 'Giới từ')}
                >
                    <h3 className="font-bold text-lg mb-4 text-center text-blue-800">Giới từ (Prepositions)</h3>
                    <div className="space-y-2">
                        {columns['Giới từ'].map(word => (
                            <div key={word} draggable={!isSubmitted} onDragStart={(e) => handleDragStart(e, word)} onDragEnd={handleDragEnd} className={`px-3 py-1.5 border rounded-md shadow-sm ${getWordStyle(word, 'Giới từ')}`}>
                                {word}
                                {isSubmitted && getWordType(word) !== 'Giới từ' && <span className="text-red-600 text-xs ml-2 font-semibold">(Liên từ)</span>}
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Liên từ Column */}
                <div 
                    className={`${dropZoneBaseClass} bg-green-50 border-green-200`}
                    data-droptarget="true"
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, 'Liên từ')}
                >
                     <h3 className="font-bold text-lg mb-4 text-center text-green-800">Liên từ (Conjunctions)</h3>
                    <div className="space-y-2">
                        {columns['Liên từ'].map(word => (
                            <div key={word} draggable={!isSubmitted} onDragStart={(e) => handleDragStart(e, word)} onDragEnd={handleDragEnd} className={`px-3 py-1.5 border rounded-md shadow-sm ${getWordStyle(word, 'Liên từ')}`}>
                                {word}
                                {isSubmitted && getWordType(word) !== 'Liên từ' && <span className="text-red-600 text-xs ml-2 font-semibold">(Giới từ)</span>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {isSubmitted && (
                 <div className="text-center bg-slate-100 p-4 rounded-lg mt-8">
                    <h3 className="text-xl font-semibold text-slate-800">Your Score</h3>
                    <p className="text-4xl font-bold text-blue-600 my-1">{score} / {wordDataForTurn.length}</p>
                 </div>
            )}
            
            <div className="flex justify-center items-center gap-4 mt-8">
                <button onClick={onBack} className="px-6 py-2 bg-slate-200 text-slate-800 font-semibold rounded-lg hover:bg-slate-300">Back</button>
                {!isSubmitted ? (
                    <button onClick={handleCheckAnswers} className="px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700">Check Answers</button>
                ) : (
                    <button onClick={handleTryAgain} className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 flex items-center gap-2">
                        <RefreshIcon className="h-5 w-5" />
                        Try Again
                    </button>
                )}
            </div>
        </div>
    );
};
// --- END: Drag-and-Drop Classification Quiz Component ---


const GrammarTopicScreen: React.FC<GrammarTopicScreenProps> = ({ topic, onBack, currentUser, onSelectTopic }) => {
    const [content, setContent] = useState<GrammarTopicContent | null>(null);
    const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
    const [questions, setQuestions] = useState<GrammarQuestion[]>([]);
    const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [currentQuestionIdInView, setCurrentQuestionIdInView] = useState<string | null>(null);
    
    // State for interactive determiner exercise
    const [interactiveExercise, setInteractiveExercise] = useState<DeterminerExercise | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [clickedWords, setClickedWords] = useState<Record<number, 'correct' | 'incorrect'>>({});
    const [isExerciseSubmitted, setIsExerciseSubmitted] = useState(false);
    const [exerciseError, setExerciseError] = useState<string | null>(null);

    const questionRefs = useRef<Record<string, HTMLDivElement | null>>({});
    const quizLevels = useMemo(() => getGrammarQuizLevels(topic), [topic]);

    useEffect(() => {
        setContent(getGrammarTopicContent(topic));
        setSelectedLevel(null);
        setQuestions([]);
        setUserAnswers({});
        setIsSubmitted(false);
        setInteractiveExercise(null);
        setIsGenerating(false);
        setClickedWords({});
        setIsExerciseSubmitted(false);
        setExerciseError(null);
    }, [topic]);

    // Handlers for standard quiz
    const handleLevelSelect = (level: string) => {
        const quizQuestions = getGrammarQuizQuestions(topic, level);
        setQuestions(quizQuestions);
        setSelectedLevel(level);
        setIsSubmitted(false);
        setUserAnswers({});
        questionRefs.current = {};
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubmit = () => {
        setIsSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        if (currentUser && selectedLevel) {
            const score = questions.reduce((acc, q) => {
                return userAnswers[q.id] === q.correctAnswer ? acc + 1 : acc;
            }, 0);
            addTestResult(currentUser.username, 'grammar', {
                id: `grammar-${topic}-${selectedLevel}-${Date.now()}`,
                title: `${topic} - ${selectedLevel}`,
                score,
                total: questions.length,
                date: Date.now()
            });
        }
    };
    
    const handleTryAgain = () => {
        setIsSubmitted(false);
        setUserAnswers({});
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    const handleAnswerSelect = (questionId: string, option: QuestionOption) => {
        if (isSubmitted) return;
        setUserAnswers(prev => ({ ...prev, [questionId]: option }));
    };

    const handleQuestionSelect = (index: number) => {
        const questionId = questions[index]?.id;
        if (questionId && questionRefs.current[questionId]) {
            questionRefs.current[questionId]?.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }
    };
    
    const handleBackToLevelSelect = useCallback(() => {
        setSelectedLevel(null);
        setQuestions([]);
    }, []);
    
    // Handlers for new interactive exercise
    const handleStartDeterminerExercise = useCallback(async () => {
        setIsGenerating(true);
        setInteractiveExercise(null);
        setClickedWords({});
        setIsExerciseSubmitted(false);
        setExerciseError(null);
        try {
            const data = await generateDeterminerExercise();
            if (data) {
                setInteractiveExercise(data);
            } else {
                setExerciseError("Failed to generate exercise. Please try again.");
            }
        } catch (e) {
            console.error(e);
            setExerciseError("An error occurred while fetching the exercise.");
        } finally {
            setIsGenerating(false);
        }
    }, []);

    const handleWordClick = (word: string, index: number) => {
        if (isExerciseSubmitted || clickedWords[index]) return;
        
        const cleanedWord = word.toLowerCase().replace(/[^a-z0-9]/gi, '');
        if (!cleanedWord) return;

        const isDeterminer = interactiveExercise?.determiners.includes(cleanedWord);
        setClickedWords(prev => ({ ...prev, [index]: isDeterminer ? 'correct' : 'incorrect' }));
    };
    
    const renderDeterminerClicker = () => {
        const paragraphWords = interactiveExercise?.paragraph.split(/\s+/) || [];
        
        const getWordClasses = (word: string, index: number) => {
            const cleanedWord = word.toLowerCase().replace(/[^a-z0-9]/gi, '');
            const isDeterminer = interactiveExercise?.determiners.includes(cleanedWord);
            
            let classes = "cursor-pointer transition-all duration-200 rounded px-1 py-0.5";
            
            if (isExerciseSubmitted) {
                if (isDeterminer) return `${classes} bg-blue-200 text-blue-800 font-bold`;
                return classes;
            }

            if (clickedWords[index] === 'correct') {
                return `${classes} bg-green-200 text-green-800 font-bold`;
            }
            if (clickedWords[index] === 'incorrect') {
                return `${classes} bg-red-200 text-red-800 line-through`;
            }
            
            return `${classes} hover:bg-yellow-100`;
        };

        const correctCount = Object.values(clickedWords).filter(v => v === 'correct').length;
        const totalDeterminers = interactiveExercise?.determiners.length || 0;

        return (
            <div className="mt-8">
                <h3 className="text-xl font-bold text-slate-800 mb-3">Interactive Exercise</h3>
                <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
                    {isGenerating && (
                        <div className="flex justify-center items-center p-8">
                            <LoadingIcon className="h-8 w-8 text-blue-600 animate-spin" />
                            <span className="ml-4 text-slate-600">Generating paragraph...</span>
                        </div>
                    )}
                    {exerciseError && <p className="text-red-500 text-center">{exerciseError}</p>}

                    {!isGenerating && !interactiveExercise && (
                        <div className="text-center">
                            <p className="text-slate-600 mb-4">Test your knowledge! Click the button to generate a paragraph and identify the determiners.</p>
                            <button onClick={handleStartDeterminerExercise} className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700">
                                <SparklesIcon className="h-5 w-5" />
                                Start AI Exercise
                            </button>
                        </div>
                    )}

                    {interactiveExercise && (
                        <div>
                             <p className="text-lg leading-loose text-slate-700 p-4 bg-slate-50 rounded-md">
                                {paragraphWords.map((word, index) => (
                                    <span key={index} onClick={() => handleWordClick(word, index)} className={getWordClasses(word, index)}>
                                        {word}{' '}
                                    </span>
                                ))}
                            </p>
                            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <p className="font-semibold text-slate-700">
                                    Found: {correctCount} / {totalDeterminers}
                                </p>
                                <div className="flex gap-2">
                                     <button onClick={() => setIsExerciseSubmitted(true)} disabled={isExerciseSubmitted} className="px-5 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:bg-slate-400">
                                        Check Answers
                                    </button>
                                    <button onClick={handleStartDeterminerExercise} className="px-5 py-2 bg-slate-600 text-white font-semibold rounded-lg hover:bg-slate-700">
                                        New Paragraph
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    const renderQuizView = () => {
        const getOptionClasses = (question: GrammarQuestion, option: QuestionOption) => {
            if (!isSubmitted) return 'bg-white border-slate-300 hover:border-blue-400';

            const isCorrect = option === question.correctAnswer;
            const isSelected = userAnswers[question.id] === option;

            if (isCorrect) return 'bg-green-100 border-green-500';
            if (isSelected && !isCorrect) return 'bg-red-100 border-red-500';
            return 'bg-white border-slate-300';
        };

        const currentQuestionIndex = questions.findIndex(q => q.id === currentQuestionIdInView);
        const currentIndex = currentQuestionIndex > -1 ? currentQuestionIndex : 0;
        
        const goToNext = () => {
            if (currentIndex < questions.length - 1) {
                handleQuestionSelect(currentIndex + 1);
            }
        };

        const goToPrev = () => {
            if (currentIndex > 0) {
                handleQuestionSelect(currentIndex - 1);
            }
        };


        return (
            <div className="lg:grid lg:grid-cols-3 lg:gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2">
                     <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-slate-200">
                        <h2 className="text-3xl font-extrabold text-slate-900 mb-6 text-center">{topic} - {selectedLevel}</h2>
                         <div className="space-y-10">
                            {questions.map((q, index) => (
                                <div key={q.id} id={q.id} ref={el => { if (el) questionRefs.current[q.id] = el; }} className="scroll-mt-24 border-b border-slate-200 pb-8 last:border-b-0">
                                    <p className="text-lg text-slate-800 mb-4 font-semibold">
                                        {index + 1}. {q.questionText}
                                    </p>
                                    <div className="space-y-3">
                                        {(Object.keys(q.options) as QuestionOption[]).map(optionKey => (
                                            q.options[optionKey as QuestionOption] && (
                                                <label key={optionKey} className={`flex items-start p-4 border rounded-lg transition-all duration-200 ${!isSubmitted ? 'cursor-pointer' : ''} ${getOptionClasses(q, optionKey)}`}>
                                                    <div className="flex-shrink-0 mt-1">
                                                        {!isSubmitted && (
                                                            <input 
                                                                type="radio" 
                                                                name={`question-${q.id}`} 
                                                                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                                                                checked={userAnswers[q.id] === optionKey}
                                                                onChange={() => handleAnswerSelect(q.id, optionKey as QuestionOption)}
                                                            />
                                                        )}
                                                         {isSubmitted && userAnswers[q.id] === optionKey && userAnswers[q.id] !== q.correctAnswer && <XCircleIcon className="h-5 w-5 text-red-600"/>}
                                                         {isSubmitted && optionKey === q.correctAnswer && <CheckCircleIcon className="h-5 w-5 text-green-600"/>}
                                                    </div>
                                                    <span className="ml-4 text-base text-slate-700"><span className="font-bold">{optionKey}.</span> {q.options[optionKey as QuestionOption]}</span>
                                                </label>
                                            )
                                        ))}
                                    </div>
                                    {isSubmitted && (
                                        <div className="mt-4 bg-slate-50 p-4 rounded-lg border-l-4 border-blue-500">
                                            <h5 className="font-bold text-slate-800">Explanation:</h5>
                                            <p className="text-slate-600 mt-1 whitespace-pre-wrap">{q.explanation}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                         </div>
                     </div>
                </div>
                {/* Right Sidebar */}
                <div className="mt-8 lg:mt-0 space-y-8 sticky top-24 self-start">
                     <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-lg font-bold mb-4">Question Palette</h3>
                        <QuestionPalette 
                            questions={questions.map(q => ({ id: q.id }))}
                            answers={userAnswers}
                            currentQuestionIndex={currentIndex}
                            onQuestionSelect={handleQuestionSelect}
                        />
                         <div className="flex justify-between mt-6">
                            <button onClick={goToPrev} disabled={currentIndex === 0} className="px-4 py-2 bg-slate-200 rounded-md font-semibold text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-300">Previous</button>
                            <button onClick={goToNext} disabled={currentIndex === questions.length - 1} className="px-4 py-2 bg-blue-600 text-white rounded-md font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700">Next</button>
                        </div>
                         <div className="text-center mt-6">
                            {!isSubmitted ? (
                                <button onClick={handleSubmit} className="w-full px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors duration-200">
                                    Check Answers
                                </button>
                            ) : (
                                <button onClick={handleTryAgain} className="w-full px-8 py-3 bg-slate-600 text-white font-bold rounded-lg hover:bg-slate-700 transition-colors duration-200">
                                    Try Again
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderLevelSelection = () => (
        <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {quizLevels.map(level => {
                    const isExercise = level.startsWith('Bài tập') || level.startsWith('Exercise') || level === 'Phân loại GIới từ & Liên từ';
                    const title = isExercise ? level : `Level ${level}`;
                    const description = isExercise ? `Practice questions for ${topic}` : `Multiple-choice questions for the ${level} target score.`;
    
                    return (
                        <SelectionCard 
                            key={level}
                            title={title}
                            description={description}
                            onClick={() => handleLevelSelect(level)}
                        />
                    );
                })}
            </div>
        </div>
    );
    
    const renderSubTopics = () => (
        <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {content?.subTopics?.map(subTopicTitle => {
                    return (
                        <SelectionCard 
                            key={subTopicTitle}
                            title={subTopicTitle}
                            description={`Click to learn more about ${subTopicTitle}.`}
                            onClick={() => onSelectTopic(subTopicTitle)}
                        />
                    );
                })}
            </div>
        </div>
    );

    const renderOriginalContent = () => {
         if (!content) {
            return (
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-slate-700">Topic Not Found</h2>
                    <p className="mt-4 text-slate-600">The requested grammar topic could not be found.</p>
                </div>
            );
        }
        return (
             <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200">
                <h2 className="text-3xl font-extrabold text-slate-900 mb-6 border-b pb-4">{content.title}</h2>
                
                <div className="mb-8">
                    <h3 className="text-xl font-bold text-slate-800 mb-3">Explanation</h3>
                    <div className="space-y-4 text-slate-700 leading-relaxed">
                        {content.explanation.map((paragraph, index) => (
                            <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-4">Examples</h3>
                    <div className="space-y-5">
                        {content.examples.map((example, index) => (
                            <div key={index} className="p-4 bg-slate-50 border-l-4 border-blue-500 rounded-r-lg">
                                <p className="font-mono text-slate-800" dangerouslySetInnerHTML={{ __html: example.sentence }} />
                                <p className="text-sm text-slate-500 italic mt-1">{example.translation}</p>
                            </div>
                        ))}
                    </div>
                </div>
                {content.interactiveExercise === 'determiner_clicker' && renderDeterminerClicker()}
            </div>
        )
    };
    
     useEffect(() => {
        if (questions.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const intersectingEntry = entries.find(entry => entry.isIntersecting);
                if (intersectingEntry) {
                    setCurrentQuestionIdInView(intersectingEntry.target.id);
                }
            },
            { 
                rootMargin: '0px 0px -80% 0px',
                threshold: 0.1
            }
        );

        const refs = questionRefs.current;
        const validRefs = Object.values(refs).filter(ref => ref !== null) as HTMLDivElement[];
        validRefs.forEach((ref) => observer.observe(ref));

        return () => {
            validRefs.forEach((ref) => observer.unobserve(ref));
        };
    }, [questions]);
    
    const hasQuizzes = quizLevels.length > 0;
    const hasSubTopics = content?.subTopics && content.subTopics.length > 0;
    const isClassificationQuiz = topic === 'Giới từ & Liên từ' && selectedLevel === 'Phân loại GIới từ & Liên từ';

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-6xl mx-auto">
                <button onClick={selectedLevel ? handleBackToLevelSelect : onBack} className="mb-8 inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-semibold transition-colors">
                    <ArrowLeftIcon className="h-5 w-5 mr-2" />
                    {selectedLevel ? `Back to ${topic}` : 'Back to All Topics'}
                </button>
                
                {selectedLevel ? (
                    isClassificationQuiz ? (
                        <ClassificationQuizScreen onBack={handleBackToLevelSelect} currentUser={currentUser} />
                    ) : (
                       questions.length > 0 ? renderQuizView() : <p className="text-center text-slate-500">Loading quiz...</p>
                    )
                ) : (
                    <>
                        {renderOriginalContent()}
                        
                        {hasSubTopics && (
                            <div className="mt-12">
                                <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mb-8 border-t dark:border-slate-700 pt-8 text-center">
                                    Related Topics
                                </h2>
                                {renderSubTopics()}
                            </div>
                        )}

                        {hasQuizzes && (
                            <div className="mt-12">
                                <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mb-8 border-t dark:border-slate-700 pt-8 text-center">
                                    Practice Quizzes
                                </h2>
                                {renderLevelSelection()}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default GrammarTopicScreen;