import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { ReadingTestData, QuestionOption, ReadingQuestion, User, ReadingPassage } from '../types';
import { CheckCircleIcon, XCircleIcon, ArrowLeftIcon } from './icons';
import Timer from './Timer';
import QuestionPalette from './QuestionPalette';
import AddVocabPopup from './AddVocabPopup';
import { useWordSelection } from './useWordSelection';
import { addTestResult } from '../services/progressService';

interface ReadingTestScreenProps {
  testData: ReadingTestData;
  onBack: () => void;
  currentUser: User;
  durationInSeconds?: number | null;
}

interface UserAnswers {
    [questionId: string]: QuestionOption | null;
}

const ReadingTestScreen: React.FC<ReadingTestScreenProps> = ({ testData, onBack, currentUser, durationInSeconds }) => {
    const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [currentQuestionIdInView, setCurrentQuestionIdInView] = useState<string | null>(null);
    const [markedForReview, setMarkedForReview] = useState<Set<string>>(new Set());
    const contentRef = useRef<HTMLDivElement>(null);
    const { selectionPopup, toastMessage, handleMouseUp, handleSaveWord } = useWordSelection(contentRef);
    const isSubmittedRef = useRef(false);
    const questionRefs = useRef<Record<string, HTMLDivElement | null>>({});

    const { part5Passages, part6Passages, part7Passages } = useMemo(() => {
        const p5: ReadingPassage[] = [];
        const p6: ReadingPassage[] = [];
        const p7: ReadingPassage[] = [];
        if (!testData?.passages) return { part5Passages: p5, part6Passages: p6, part7Passages: p7 };

        testData.passages.forEach(passage => {
            if (!passage.questions || passage.questions.length === 0) return;
            const firstQId = parseInt(passage.questions[0].id, 10);
            if (firstQId >= 101 && firstQId <= 130) {
                p5.push(passage);
            } else if (firstQId >= 131 && firstQId <= 146) {
                p6.push(passage);
            } else if (firstQId >= 147 && firstQId <= 200) {
                p7.push(passage);
            }
        });
        return { part5Passages: p5, part6Passages: p6, part7Passages: p7 };
    }, [testData.passages]);

    const availableParts = useMemo(() => {
        const parts = [];
        if (part5Passages.length > 0) parts.push(5);
        if (part6Passages.length > 0) parts.push(6);
        if (part7Passages.length > 0) parts.push(7);
        return parts;
    }, [part5Passages, part6Passages, part7Passages]);
    
    const [activePart, setActivePart] = useState<number>(availableParts[0] || 0);

    useEffect(() => {
        if (availableParts.length > 0 && !availableParts.includes(activePart)) {
            setActivePart(availableParts[0]);
        }
    }, [availableParts, activePart]);
    
    useEffect(() => {
        questionRefs.current = {};
        setCurrentQuestionIdInView(null);
    }, [activePart]);

    const activePartPassages = useMemo(() => {
        switch (activePart) {
            case 5: return part5Passages;
            case 6: return part6Passages;
            case 7: return part7Passages;
            default: return [];
        }
    }, [activePart, part5Passages, part6Passages, part7Passages]);
    
    const activePartQuestions = useMemo(() => activePartPassages.flatMap(p => p.questions), [activePartPassages]);
    
    const allQuestions = useMemo(() => [...part5Passages, ...part6Passages, ...part7Passages].flatMap(p => p.questions), [part5Passages, part6Passages, part7Passages]);


    const handleSubmit = useCallback(() => {
        if (isSubmittedRef.current) return;
        isSubmittedRef.current = true;
        setIsSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        if (currentUser) {
            const score = allQuestions.reduce((acc, q) => {
                return userAnswers[q.id] === q.correctAnswer ? acc + 1 : acc;
            }, 0);
            addTestResult(currentUser.username, 'reading', {
                id: `reading-${testData.title.replace(/\s+/g, '-')}-${Date.now()}`,
                title: testData.title,
                score,
                total: allQuestions.length,
                date: Date.now()
            });
        }
    }, [allQuestions, userAnswers, currentUser, testData]);

    const handleTimeUp = useCallback(() => {
        if (!isSubmittedRef.current) {
            alert("Time's up! Your answers will be submitted automatically.");
            handleSubmit();
        }
    }, [handleSubmit]);
    
    const handleTryAgain = () => {
        setIsSubmitted(false);
        isSubmittedRef.current = false;
        setUserAnswers({});
        setMarkedForReview(new Set());
    };
    
    const handleAnswerSelect = (questionId: string, option: QuestionOption) => {
        if (isSubmitted) return;
        setUserAnswers(prev => ({ ...prev, [questionId]: option }));
    };
    
     const handleMarkForReview = (questionId: string) => {
        if (isSubmitted) return;
        setMarkedForReview(prev => {
            const newSet = new Set(prev);
            if (newSet.has(questionId)) {
                newSet.delete(questionId);
            } else {
                newSet.add(questionId);
            }
            return newSet;
        });
    };

    const getOptionClasses = (question: ReadingQuestion, option: QuestionOption) => {
        if (!isSubmitted) return 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500';

        const isCorrect = option === question.correctAnswer;
        const isSelected = userAnswers[question.id] === option;

        if (isCorrect) return 'bg-green-100 dark:bg-green-900/50 border-green-500';
        if (isSelected && !isCorrect) return 'bg-red-100 dark:bg-red-900/50 border-red-500';
        return 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600';
    };
    
    const handleQuestionSelect = (index: number) => {
        const questionId = activePartQuestions[index]?.id;
        if (questionId && questionRefs.current[questionId]) {
            questionRefs.current[questionId]?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    };
    
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const intersectingEntry = entries.find(entry => entry.isIntersecting);
                if (intersectingEntry) {
                    setCurrentQuestionIdInView(intersectingEntry.target.id);
                }
            },
            { 
                rootMargin: '-40% 0px -60% 0px',
                threshold: 0.1
            }
        );

        const refs = questionRefs.current;
        const validRefs = Object.values(refs).filter(ref => ref !== null) as HTMLDivElement[];
        validRefs.forEach((ref) => observer.observe(ref));

        return () => {
            validRefs.forEach((ref) => observer.unobserve(ref));
        };
    }, [activePartQuestions]);
    
    const currentQuestionIndex = useMemo(() => {
        return activePartQuestions.findIndex(q => q.id === currentQuestionIdInView);
    }, [currentQuestionIdInView, activePartQuestions]);


    const renderQuestion = (q: ReadingQuestion) => (
        <div key={q.id} id={q.id} ref={el => { if (el) questionRefs.current[q.id] = el; }} className="scroll-mt-24">
            <p className="text-lg text-slate-800 dark:text-slate-200 mb-4 font-semibold flex items-baseline">
                <button
                    onClick={() => handleMarkForReview(q.id)}
                    className={`font-semibold rounded-md px-2 py-0.5 transition-colors mr-2 ${
                        markedForReview.has(q.id)
                        ? 'bg-yellow-200 text-yellow-800 hover:bg-yellow-300 dark:bg-yellow-800 dark:text-yellow-200 dark:hover:bg-yellow-700'
                        : isSubmitted ? 'bg-transparent' : 'bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600'
                    }`}
                    aria-label={`Mark question ${q.id} for review`}
                    disabled={isSubmitted}
                >
                    {markedForReview.has(q.id) ? 'Unmark' : 'Mark'}
                </button>
                Question {q.id}
            </p>
            <p className="text-lg text-slate-800 dark:text-slate-300 mb-6 space-y-2" dangerouslySetInnerHTML={{ __html: q.questionText.replace(/____/g, '<span class="font-bold text-blue-600">____</span>') }} />
            <div className="space-y-3">
                {(Object.keys(q.options) as QuestionOption[]).map(optionKey => (
                  q.options[optionKey] && (
                     <label key={optionKey} className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200 ${userAnswers[q.id] === optionKey && !isSubmitted ? 'bg-blue-100 dark:bg-blue-900/50 border-blue-500 shadow-sm' : getOptionClasses(q, optionKey)}`}>
                        <input 
                            type="radio" 
                            name={`question-${q.id}`} 
                            className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 dark:bg-slate-700 dark:border-slate-500"
                            checked={userAnswers[q.id] === optionKey}
                            onChange={() => handleAnswerSelect(q.id, optionKey)}
                            disabled={isSubmitted}
                        />
                        <span className="ml-4 text-base text-slate-700 dark:text-slate-300"><span className="font-bold">{optionKey}.</span> {q.options[optionKey]}</span>
                     </label>
                  )
                ))}
            </div>
            {isSubmitted && q.explanation && (
                <div className="mt-6 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border-l-4 border-blue-500">
                    <h5 className="font-bold text-slate-800 dark:text-slate-200">Explanation:</h5>
                    <p className="text-slate-600 dark:text-slate-300 mt-1">{q.explanation}</p>
                </div>
            )}
        </div>
    );

    const formatPassageText = (text: string, questions: ReadingQuestion[]) => {
        let formattedText = text;
        const questionNumbers = questions.map(q => q.id);
        
        questionNumbers.forEach(num => {
            const regex = new RegExp(`\\(${num}\\)`);
            if (regex.test(formattedText)) {
                 formattedText = formattedText.replace(regex, `<strong class="text-blue-600 dark:text-blue-400 font-bold">[${num}]</strong>`);
            } else {
                 const blankRegex = /____/;
                 if(blankRegex.test(formattedText)) {
                    formattedText = formattedText.replace(blankRegex, `<strong class="text-blue-600 dark:text-blue-400 font-bold">[${num}]</strong>`);
                 }
            }
        });
        return formattedText;
    };

    const renderPart5 = () => {
        return part5Passages.flatMap(passage => passage.questions.map(q => (
            <div key={q.id} className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
                {renderQuestion(q)}
            </div>
        )));
    };

    const renderPart6 = () => {
        return part6Passages.map(passage => (
            <div key={passage.id} className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="prose prose-lg max-w-none text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed lg:border-r lg:pr-8 border-slate-200 dark:border-slate-700" dangerouslySetInnerHTML={{ __html: formatPassageText(passage.text, passage.questions) }} />
                    <div className="space-y-8">
                        {passage.questions.map(q => renderQuestion(q))}
                    </div>
                </div>
            </div>
        ));
    };

    const renderPart7 = () => {
        return part7Passages.map(passage => (
            <div key={passage.id} className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                     <div className="prose prose-lg max-w-none text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed lg:border-r lg:pr-8 border-slate-200 dark:border-slate-700" dangerouslySetInnerHTML={{ __html: passage.text }} />
                    <div className="space-y-8">
                        {passage.questions.map(q => renderQuestion(q))}
                    </div>
                </div>
            </div>
        ));
    };
    
    const renderSummary = () => {
        const score = allQuestions.reduce((acc, q) => {
            return userAnswers[q.id] === q.correctAnswer ? acc + 1 : acc;
        }, 0);
        const totalQuestions = allQuestions.length;
        const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
    
        return (
            <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
                <h2 className="text-3xl font-bold text-center mb-2 text-slate-900 dark:text-slate-100">Test Submitted</h2>
                <p className="text-center text-lg text-slate-600 dark:text-slate-400 mb-8">{testData.title}</p>
                <div className="text-center bg-slate-100 dark:bg-slate-900 p-6 rounded-lg mb-10">
                    <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200">Your Score</h3>
                    <p className="text-6xl font-bold text-blue-600 dark:text-blue-400 my-2">{percentage}%</p>
                    <p className="text-lg text-slate-600 dark:text-slate-300">You answered <span className="font-bold">{score}</span> out of <span className="font-bold">{totalQuestions}</span> questions correctly.</p>
                </div>
                <div className="flex justify-center gap-4">
                    <button onClick={handleTryAgain} className="px-6 py-3 bg-slate-600 text-white font-bold rounded-lg hover:bg-slate-700 transition-colors">Try Again</button>
                    <button onClick={onBack} className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">Back to Setup</button>
                </div>
                 <p className="text-center mt-6 text-slate-500 dark:text-slate-400">Scroll down to review the questions and explanations.</p>
            </div>
        )
    };

    const renderContent = () => (
      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        <div className="lg:col-span-2 space-y-12" ref={contentRef} onMouseUp={handleMouseUp}>
            {isSubmitted && <div className="mb-12">{renderSummary()}</div>}
            
            {activePart === 5 && renderPart5()}
            {activePart === 6 && renderPart6()}
            {activePart === 7 && renderPart7()}
        </div>

        <div className="mt-8 lg:mt-0 lg:sticky lg:top-24 lg:self-start space-y-8">
             <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
                 {durationInSeconds ? <Timer initialTime={durationInSeconds} onTimeUp={handleTimeUp} /> : <div className="text-center p-2 text-slate-500 dark:text-slate-400 font-semibold">Untimed Practice</div>}
                 <button 
                    onClick={() => { if(!isSubmitted && window.confirm('Are you sure you want to submit?')) handleSubmit(); }}
                    disabled={isSubmitted}
                    className="w-full mt-4 bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 disabled:bg-green-300 dark:disabled:bg-green-800 disabled:cursor-not-allowed"
                >
                    {isSubmitted ? 'Submitted' : 'Submit Answers'}
                </button>
             </div>
             <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
                <h3 className="text-xl font-bold mb-4 dark:text-slate-200">Part Navigation</h3>
                <div className="flex gap-2">
                    {availableParts.map(partNum => (
                        <button 
                            key={`nav-${partNum}`}
                            onClick={() => setActivePart(partNum)}
                            className={`flex-1 py-2 font-semibold rounded-lg transition-colors ${activePart === partNum ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600'}`}
                        >
                            Part {partNum}
                        </button>
                    ))}
                </div>
             </div>
             <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
                <h3 className="text-xl font-bold mb-4 dark:text-slate-200">Part {activePart} Questions</h3>
                 <QuestionPalette 
                    questions={activePartQuestions}
                    answers={userAnswers} 
                    currentQuestionIndex={currentQuestionIndex > -1 ? currentQuestionIndex : 0}
                    onQuestionSelect={handleQuestionSelect}
                    markedForReview={markedForReview}
                    columns={8}
                />
             </div>
        </div>
      </div>
    );
    

    return (
        <div className="container mx-auto p-4 lg:p-8">
            {toastMessage && (
              <div className="fixed bottom-5 right-5 bg-slate-800 text-white px-6 py-3 rounded-lg shadow-xl z-50 animate-bounce">
                  {toastMessage}
              </div>
            )}
            {selectionPopup && <AddVocabPopup top={selectionPopup.top} left={selectionPopup.left} onSave={handleSaveWord} />}
             <div className="flex justify-between items-center mb-8">
                <div>
                     <button onClick={onBack} className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-semibold transition-colors">
                        <ArrowLeftIcon className="h-5 w-5 mr-2" />
                        Back to Setup
                    </button>
                     <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">{testData.title}</h2>
                </div>
                {isSubmitted && (
                    <div className="text-right">
                        <span className="text-sm font-bold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/50 px-3 py-1 rounded-full">REVIEW MODE</span>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Scroll down to see explanations.</p>
                    </div>
                )}
            </div>

            {renderContent()}
        </div>
    );
};

export default ReadingTestScreen;
