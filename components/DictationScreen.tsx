import React, { useState, useCallback, useRef, useEffect } from 'react';
import { generateDictationExercise } from '../services/geminiService';
import { dictationData } from '../services/dictationLibrary';
import { DictationExercise, LibraryDictationExercise, DictationPart, DictationTest, UserAnswers } from '../types';
import { LoadingIcon } from './icons';
import AudioPlayer from './AudioPlayer';
import SelectionCard from './SelectionCard';
import QuestionPalette from './QuestionPalette';

const Breadcrumbs: React.FC<{
    part: DictationPart | null;
    test: DictationTest | null;
    onNavigate: (level: 'home' | 'part') => void;
}> = ({ part, test, onNavigate }) => (
  <div className="mb-6 text-sm text-slate-600">
    <span className="cursor-pointer hover:underline" onClick={() => onNavigate('home')}>Dictation</span>
    {part && (
      <>
        <span className="mx-2">/</span>
        <span 
          className={test ? "cursor-pointer hover:underline" : "font-semibold text-slate-800"} 
          onClick={() => onNavigate('part')}
        >
          {part.title}
        </span>
      </>
    )}
    {test && (
      <>
        <span className="mx-2">/</span>
        <span className="font-semibold text-slate-800">{test.title}</span>
      </>
    )}
  </div>
);

const DictationScreen: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    // Navigation state
    const [currentPart, setCurrentPart] = useState<DictationPart | null>(null);
    const [currentTest, setCurrentTest] = useState<DictationTest | null>(null);

    // AI/Single Exercise state
    const [currentExercise, setCurrentExercise] = useState<DictationExercise | LibraryDictationExercise | null>(null);
    const [userAnswers, setUserAnswers] = useState<string[]>([]);
    const [isChecked, setIsChecked] = useState(false);

    // Test session state
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const [allUserAnswers, setAllUserAnswers] = useState<{ [exerciseId: number]: string[] }>({});
    const [checkedExercises, setCheckedExercises] = useState<{ [exerciseId: number]: boolean }>({});
    const exerciseRefs = useRef<Record<number, HTMLDivElement | null>>({});

    // Effect for scroll-based navigation highlighting
    useEffect(() => {
        if (!currentTest) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const intersectingEntry = entries.find(entry => entry.isIntersecting);
                if (intersectingEntry) {
                    const index = parseInt(intersectingEntry.target.getAttribute('data-index') || '0', 10);
                    setCurrentExerciseIndex(index);
                }
            },
            { 
                rootMargin: '-40% 0px -60% 0px', // Trigger when element is near the vertical center
                threshold: 0 
            }
        );

        const refs = exerciseRefs.current;
        const validRefs = Object.values(refs).filter(ref => ref !== null) as HTMLDivElement[];
        validRefs.forEach(ref => observer.observe(ref));

        return () => {
            validRefs.forEach(ref => observer.unobserve(ref));
        };
    }, [currentTest]);


    const startExercise = (data: DictationExercise | LibraryDictationExercise) => {
        setCurrentExercise(data);
        setUserAnswers(new Array(data.missingWords.length).fill(''));
        setIsChecked(false);
        setError(null);
        setCurrentPart(null);
        setCurrentTest(null);
    };
    
    const handleSelectTest = (test: DictationTest) => {
        setCurrentTest(test);
        setCurrentExerciseIndex(0);
        const initialAnswers: { [exerciseId: number]: string[] } = {};
        const initialChecked: { [exerciseId: number]: boolean } = {};
        test.exercises.forEach(ex => {
            initialAnswers[ex.id] = new Array(ex.missingWords.length).fill('');
            initialChecked[ex.id] = false;
        });
        setAllUserAnswers(initialAnswers);
        setCheckedExercises(initialChecked);
        setCurrentExercise(null);
        // Reset refs
        exerciseRefs.current = {};
    };

    const handleGenerate = useCallback(async () => {
        setIsLoading(true);
        setCurrentExercise(null);
        window.speechSynthesis.cancel();
        try {
            const data = await generateDictationExercise();
            if (data) {
                startExercise(data);
            } else {
                setError('Failed to generate a dictation exercise. Please try again.');
            }
        } catch (err) {
            console.error(err);
            setError('An error occurred. Please check your API key and try again.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleBreadcrumbNavigate = (level: 'home' | 'part') => {
        if (level === 'home') {
            setCurrentPart(null);
            setCurrentTest(null);
            setCurrentExercise(null);
        } else if (level === 'part') {
            setCurrentTest(null);
            setCurrentExercise(null);
        }
    };
    
    const handleInputChange = (index: number, value: string) => {
        const newAnswers = [...userAnswers];
        newAnswers[index] = value;
        setUserAnswers(newAnswers);
    };

    const handleCheckAnswers = () => {
        window.speechSynthesis.cancel();
        setIsChecked(true);
    };

    const handleTryAgain = () => {
        setIsChecked(false);
        setUserAnswers(new Array(currentExercise!.missingWords.length).fill(''));
    };
    
    const renderTextWithInputs = () => {
        if (!currentExercise) return null;

        const parts = currentExercise.textWithBlanks.split(/_{2,}/);
        return (
            <p className="text-lg md:text-xl leading-[3.5rem] text-slate-700">
                {parts.map((part, index) => {
                    const isLastPart = index === parts.length - 1;
                    const missingWord = currentExercise.missingWords[index] || '';
                    const userAnswer = userAnswers[index] || '';
                    const isCorrect = userAnswer.trim().toLowerCase() === missingWord.trim().toLowerCase();
                    
                    let inputClassName = "mx-1 px-2 py-1 border-b-2 bg-slate-100 focus:bg-white focus:outline-none focus:border-blue-500 transition-colors duration-200 rounded-t-md";
                    if (isChecked) {
                        inputClassName += isCorrect ? ' border-green-500 text-green-700' : ' border-red-500 text-red-700';
                    } else {
                        inputClassName += ' border-slate-300';
                    }

                    return (
                        <React.Fragment key={index}>
                            {part}
                            {!isLastPart && (
                                <span className="inline-block relative mx-1">
                                    <input 
                                        type="text"
                                        value={userAnswer}
                                        onChange={(e) => handleInputChange(index, e.target.value)}
                                        disabled={isChecked}
                                        className={inputClassName}
                                        style={{ width: `${Math.max(missingWord.length, 8)}ch` }}
                                        aria-label={`Blank number ${index + 1}`}
                                    />
                                    {isChecked && !isCorrect && (
                                        <span className="absolute left-1 -bottom-6 text-sm text-green-600 font-semibold">{missingWord}</span>
                                    )}
                                </span>
                            )}
                        </React.Fragment>
                    );
                })}
            </p>
        );
    };

    // RENDER PRACTICE VIEW (for AI exercise)
    if (currentExercise) {
        const score = userAnswers.reduce((acc, answer, index) => {
            const correctAnswer = currentExercise.missingWords[index] || '';
            const userAnswer = answer || '';
            return userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase() ? acc + 1 : acc;
        }, 0);
        const isLibraryExercise = 'audioSrc' in currentExercise;
        return (
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    <Breadcrumbs part={currentPart} test={currentTest} onNavigate={handleBreadcrumbNavigate} />
                    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-slate-200">
                        <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">{currentExercise.title}</h3>
                        
                        <div className="mb-8">
                            <AudioPlayer 
                                audioSrc={isLibraryExercise ? (currentExercise as LibraryDictationExercise).audioSrc : undefined}
                                audioScript={currentExercise.fullText} 
                            />
                        </div>

                        <div className="mb-12 p-4 bg-slate-50 rounded-lg min-h-[10rem]">
                           {renderTextWithInputs()}
                        </div>
                        
                        {isChecked && (
                            <div className="text-center bg-blue-50 p-6 rounded-lg mb-8">
                                <h4 className="text-xl font-semibold text-slate-800">Your Score</h4>
                                <p className="text-5xl font-bold text-blue-600 my-2">
                                    {score} / {currentExercise.missingWords.length}
                                </p>
                            </div>
                        )}

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            {!isChecked ? (
                                <button onClick={handleCheckAnswers} className="w-full sm:w-auto px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors duration-200">
                                    Check Answers
                                </button>
                            ) : (
                                <button onClick={handleTryAgain} className="w-full sm:w-auto px-8 py-3 bg-slate-600 text-white font-bold rounded-lg hover:bg-slate-700 transition-colors duration-200">
                                    Try Again
                                </button>
                            )}
                             <button onClick={handleGenerate} disabled={isLoading} className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:bg-blue-300">
                                {isLoading ? 'Generating...' : 'New AI Dictation'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
    // RENDER TEST VIEW
    if (currentTest) {
        const handleTestInputChange = (exerciseId: number, index: number, value: string) => {
            const newAnswers = [...allUserAnswers[exerciseId]];
            newAnswers[index] = value;
            setAllUserAnswers(prev => ({ ...prev, [exerciseId]: newAnswers }));
        };

        const handleCheckTestAnswers = (exerciseId: number) => {
            window.speechSynthesis.cancel();
            setCheckedExercises(prev => ({ ...prev, [exerciseId]: true }));
        };

        const handleTryAgainTest = (exerciseId: number) => {
            const exercise = currentTest.exercises.find(e => e.id === exerciseId);
            if (!exercise) return;
            setCheckedExercises(prev => ({ ...prev, [exerciseId]: false }));
            setAllUserAnswers(prev => ({ ...prev, [exerciseId]: new Array(exercise.missingWords.length).fill('') }));
        };
        
        const goToExercise = (index: number) => {
             if (index >= 0 && index < currentTest.exercises.length) {
                exerciseRefs.current[index]?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                })
            }
        };

        const goToNext = () => {
            if (currentExerciseIndex < currentTest.exercises.length - 1) {
                goToExercise(currentExerciseIndex + 1);
            }
        };

        const goToPrev = () => {
            if (currentExerciseIndex > 0) {
                goToExercise(currentExerciseIndex - 1);
            }
        };

        const renderTextWithInputsForTest = (exercise: LibraryDictationExercise) => {
            const parts = exercise.textWithBlanks.split(/_{2,}/);
            const currentAnswers = allUserAnswers[exercise.id] || [];
            const isCurrentlyChecked = checkedExercises[exercise.id] || false;
            
            return (
                <p className="text-lg md:text-xl leading-[3.5rem] text-slate-700">
                    {parts.map((part, index) => {
                        const isLastPart = index === parts.length - 1;
                        const missingWord = exercise.missingWords[index] || '';
                        const userAnswer = currentAnswers[index] || '';
                        const isCorrect = userAnswer.trim().toLowerCase() === missingWord.trim().toLowerCase();
                        
                        let inputClassName = "mx-1 px-2 py-1 border-b-2 bg-slate-100 focus:bg-white focus:outline-none focus:border-blue-500 transition-colors duration-200 rounded-t-md";
                        if (isCurrentlyChecked) {
                            inputClassName += isCorrect ? ' border-green-500 text-green-700' : ' border-red-500 text-red-700';
                        } else {
                            inputClassName += ' border-slate-300';
                        }

                        return (
                            <React.Fragment key={index}>
                                {part}
                                {!isLastPart && (
                                    <span className="inline-block relative mx-1">
                                        <input 
                                            type="text"
                                            value={userAnswer}
                                            onChange={(e) => handleTestInputChange(exercise.id, index, e.target.value)}
                                            disabled={isCurrentlyChecked}
                                            className={inputClassName}
                                            style={{ width: `${Math.max(missingWord.length, 8)}ch` }}
                                            aria-label={`Blank number ${index + 1}`}
                                        />
                                        {isCurrentlyChecked && !isCorrect && (
                                            <span className="absolute left-1 -bottom-6 text-sm text-green-600 font-semibold">{missingWord}</span>
                                        )}
                                    </span>
                                )}
                            </React.Fragment>
                        );
                    })}
                </p>
            );
        };
        
        const paletteAnswers: UserAnswers = Object.entries(checkedExercises).reduce((acc, [key, value]) => {
            acc[key] = value ? 'A' : null; // 'A' as a truthy value for answered
            return acc;
        }, {} as UserAnswers);

        return (
            <div className="container mx-auto p-4 lg:p-8">
                 <div className="max-w-7xl mx-auto">
                    <Breadcrumbs part={currentPart} test={currentTest} onNavigate={handleBreadcrumbNavigate} />
                    <div className="lg:grid lg:grid-cols-3 lg:gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                             {currentTest.exercises.map((exercise, index) => {
                                const isExerciseChecked = checkedExercises[exercise.id];
                                const userAnswersForExercise = allUserAnswers[exercise.id] || [];
                                const score = userAnswersForExercise.reduce((acc, answer, idx) => {
                                    const correctAnswer = exercise.missingWords[idx] || '';
                                    return answer.trim().toLowerCase() === correctAnswer.trim().toLowerCase() ? acc + 1 : acc;
                                }, 0);

                                return (
                                    <div 
                                        key={exercise.id}
                                        ref={el => { exerciseRefs.current[index] = el; }}
                                        data-index={index}
                                        className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-slate-200 scroll-mt-24"
                                    >
                                        <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">{exercise.title} (Exercise {index + 1} of {currentTest.exercises.length})</h3>
                                        <div className="mb-8">
                                            <AudioPlayer 
                                                audioSrc={exercise.audioSrc}
                                                audioScript={exercise.fullText} 
                                            />
                                        </div>
                                        <div className="mb-12 p-4 bg-slate-50 rounded-lg min-h-[10rem]">
                                           {renderTextWithInputsForTest(exercise)}
                                        </div>
                                        
                                        {isExerciseChecked && (
                                            <div className="text-center bg-blue-50 p-6 rounded-lg mb-8">
                                                <h4 className="text-xl font-semibold text-slate-800">Your Score for this Exercise</h4>
                                                <p className="text-5xl font-bold text-blue-600 my-2">
                                                    {score} / {exercise.missingWords.length}
                                                </p>
                                            </div>
                                        )}

                                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                            {!isExerciseChecked ? (
                                                <button onClick={() => handleCheckTestAnswers(exercise.id)} className="w-full sm:w-auto px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors duration-200">
                                                    Check Answers
                                                </button>
                                            ) : (
                                                <button onClick={() => handleTryAgainTest(exercise.id)} className="w-full sm:w-auto px-8 py-3 bg-slate-600 text-white font-bold rounded-lg hover:bg-slate-700 transition-colors duration-200">
                                                    Try Again
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        {/* Right Sidebar */}
                        <div className="mt-8 lg:mt-0 space-y-8 lg:sticky lg:top-24 lg:self-start">
                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                <h3 className="text-lg font-bold mb-4">Exercise Palette</h3>
                                <QuestionPalette 
                                    questions={currentTest.exercises}
                                    answers={paletteAnswers} 
                                    currentQuestionIndex={currentExerciseIndex}
                                    onQuestionSelect={goToExercise}
                                />
                                 <div className="flex justify-between mt-6">
                                    <button onClick={goToPrev} disabled={currentExerciseIndex === 0} className="px-4 py-2 bg-slate-200 rounded-md font-semibold text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-300">Previous</button>
                                    <button onClick={goToNext} disabled={currentExerciseIndex === currentTest.exercises.length - 1} className="px-4 py-2 bg-blue-600 text-white rounded-md font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700">Next</button>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                                <h3 className="text-xl font-bold text-slate-800 mb-2">Feeling Adventurous?</h3>
                                <p className="text-slate-600 text-sm mb-4">Generate a brand new dictation exercise using AI.</p>
                                <button onClick={handleGenerate} disabled={isLoading} className="w-full px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:bg-blue-300">
                                    {isLoading ? 'Generating...' : 'New AI Dictation'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
    // RENDER TEST LIST
    if (currentPart) {
         return (
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    <Breadcrumbs part={currentPart} test={null} onNavigate={handleBreadcrumbNavigate} />
                     <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-slate-900">{currentPart.title}</h2>
                        <p className="mt-2 text-lg text-slate-600">{currentPart.description}</p>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentPart.tests.map(test => (
                            <SelectionCard 
                                key={test.id}
                                title={test.title}
                                description={`Contains ${test.exercises.length} exercise(s).`}
                                onClick={() => handleSelectTest(test)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }


    // RENDER PART LIST (HUB)
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-slate-900 sm:text-5xl">Dictation Practice</h2>
                    <p className="mt-4 text-lg text-slate-600">
                      Choose a part to begin your practice.
                    </p>
                </div>

                {isLoading && (
                    <div className="flex justify-center items-center p-12">
                         <LoadingIcon className="animate-spin h-10 w-10 text-blue-600" />
                         <span className="ml-4 text-lg font-semibold text-slate-700">Generating AI Exercise...</span>
                    </div>
                )}
                
                {error && <p className="mt-6 text-center text-red-500 font-semibold">{error}</p>}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {dictationData.map(part => (
                        <SelectionCard 
                            key={part.id}
                            title={part.title}
                            description={part.description}
                            onClick={() => setCurrentPart(part)}
                        />
                    ))}
                </div>
                 <div className="mt-12 text-center">
                     <div className="bg-blue-50 p-6 rounded-xl shadow-lg border border-blue-200 inline-block">
                         <h3 className="text-xl font-bold text-slate-800 mb-2">Feeling Adventurous?</h3>
                         <p className="text-slate-600 text-sm mb-4">Generate a brand new dictation exercise using AI.</p>
                         <button
                            onClick={handleGenerate}
                            disabled={isLoading}
                            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300"
                        >
                            {isLoading ? 'Generating...' : 'Generate AI Dictation'}
                        </button>
                     </div>
                </div>
            </div>
        </div>
    );
};

export default DictationScreen;
