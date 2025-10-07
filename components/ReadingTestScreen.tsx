import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { ReadingTestData, QuestionOption, ReadingQuestion, User } from '../types';
import { CheckCircleIcon, XCircleIcon } from './icons';
import Timer from './Timer';
import QuestionPalette from './QuestionPalette';
import AddVocabPopup from './AddVocabPopup';
import { useWordSelection } from './useWordSelection';
import { addTestResult } from '../services/progressService';

interface ReadingTestScreenProps {
  testData: ReadingTestData;
  onBack: () => void;
  currentUser: User;
}

interface UserAnswers {
    [questionId: string]: QuestionOption | null;
}

const ReadingTestScreen: React.FC<ReadingTestScreenProps> = ({ testData, onBack, currentUser }) => {
    const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [currentQuestionIdInView, setCurrentQuestionIdInView] = useState<string | null>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const { selectionPopup, toastMessage, handleMouseUp, handleSaveWord } = useWordSelection(contentRef);

    const allQuestions = useMemo(() => testData.passages.flatMap(p => p.questions), [testData.passages]);
    const questionRefs = useRef<Record<string, HTMLDivElement | null>>({});

    const DURATION_PER_QUESTION = 75; // 75 seconds per question
    const testDuration = useMemo(() => {
        const totalQuestions = allQuestions.length;
        return totalQuestions * DURATION_PER_QUESTION;
    }, [allQuestions]);

    const handleSubmit = useCallback(() => {
        setIsSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        if (currentUser) {
            const score = allQuestions.reduce((acc, q) => {
                return userAnswers[q.id] === q.correctAnswer ? acc + 1 : acc;
            }, 0);
            addTestResult(currentUser.username, 'reading', {
                id: `reading-p${testData.part}-t${testData.id}-${Date.now()}`,
                title: testData.title,
                score,
                total: allQuestions.length,
                date: Date.now()
            });
        }
    }, [allQuestions, userAnswers, currentUser, testData, setIsSubmitted]);

    const handleTimeUp = useCallback(() => {
        handleSubmit();
    }, [handleSubmit]);
    
    const handleTryAgain = () => {
        setIsSubmitted(false);
        setUserAnswers({});
    };
    
    const handleAnswerSelect = (questionId: string, option: QuestionOption) => {
        if (isSubmitted) return;
        setUserAnswers(prev => ({ ...prev, [questionId]: option }));
    };

    const getOptionClasses = (question: ReadingQuestion, option: QuestionOption) => {
        if (!isSubmitted) return 'bg-white border-slate-300 hover:border-blue-400';

        const isCorrect = option === question.correctAnswer;
        const isSelected = userAnswers[question.id] === option;

        if (isCorrect) return 'bg-green-100 border-green-500';
        if (isSelected && !isCorrect) return 'bg-red-100 border-red-500';
        return 'bg-white border-slate-300';
    };
    
    const handleQuestionSelect = (index: number) => {
        const questionId = allQuestions[index]?.id;
        if (questionId && questionRefs.current[questionId]) {
            questionRefs.current[questionId]?.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }
    };

    useEffect(() => {
        if (allQuestions.length > 0) {
            setCurrentQuestionIdInView(allQuestions[0].id);
        }
        
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
    }, [allQuestions]);

    if (testData.passages.length === 0) {
        return (
             <div className="container mx-auto px-4 py-12 text-center">
                 <button onClick={onBack} className="mb-8 inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Back to Test List
                </button>
                <h2 className="text-2xl font-bold text-slate-700">{testData.title}</h2>
                <p className="mt-4 text-slate-600">This test is currently empty. Content will be added soon!</p>
            </div>
        )
    }

    const currentQuestionIndex = allQuestions.findIndex(q => q.id === currentQuestionIdInView);

    return (
        <div className="container mx-auto px-4 py-8">
            {toastMessage && (
                <div className="fixed bottom-5 right-5 bg-slate-800 text-white px-6 py-3 rounded-lg shadow-xl z-50 animate-bounce">
                    {toastMessage}
                </div>
            )}
            {selectionPopup && <AddVocabPopup top={selectionPopup.top} left={selectionPopup.left} onSave={handleSaveWord} />}
             <div className="lg:grid lg:grid-cols-3 lg:gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2">
                    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-slate-200" ref={contentRef} onMouseUp={handleMouseUp}>
                        <h2 className="text-3xl font-extrabold text-slate-900 mb-6 text-center">{testData.title}</h2>
                        {testData.passages.map((passage, pIndex) => (
                            <div key={passage.id} className={pIndex > 0 ? 'mt-12 pt-8 border-t-2 border-slate-200' : ''}>
                                <div className="mb-8 p-6 bg-slate-50 rounded-lg border border-slate-200">
                                    <h3 className="text-lg font-semibold text-slate-800 mb-3">
                                        Questions {passage.questions[0].id}-{passage.questions[passage.questions.length - 1].id} refer to the following text.
                                    </h3>
                                    <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{passage.text}</p>
                                </div>
                                <div className="space-y-8">
                                    {passage.questions.map((q) => (
                                        <div key={q.id} id={q.id} ref={el => { if (el) questionRefs.current[q.id] = el; }} className="scroll-mt-24">
                                            <p className="text-lg text-slate-800 mb-4 font-semibold">
                                            {q.id}. {q.questionText}
                                            </p>
                                            <div className="space-y-3">
                                                {(Object.keys(q.options) as QuestionOption[]).map(optionKey => (
                                                    <label key={optionKey} className={`flex items-start p-4 border rounded-lg transition-all duration-200 ${!isSubmitted ? 'cursor-pointer' : ''} ${getOptionClasses(q, optionKey)}`}>
                                                        <div className="flex-shrink-0 mt-1">
                                                            {isSubmitted && userAnswers[q.id] === optionKey && userAnswers[q.id] !== q.correctAnswer && <XCircleIcon className="h-5 w-5 text-red-600"/>}
                                                            {isSubmitted && optionKey === q.correctAnswer && <CheckCircleIcon className="h-5 w-5 text-green-600"/>}
                                                            {!isSubmitted && (
                                                                <input 
                                                                    type="radio" 
                                                                    name={`question-${q.id}`} 
                                                                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                                                                    checked={userAnswers[q.id] === optionKey}
                                                                    onChange={() => handleAnswerSelect(q.id, optionKey)}
                                                                />
                                                            )}
                                                        </div>
                                                        <span className="ml-4 text-base text-slate-700"><span className="font-bold">{optionKey}.</span> {q.options[optionKey]}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                 {/* Right Sidebar */}
                <div className="mt-8 lg:mt-0 space-y-8 sticky top-8 self-start">
                     <div className="bg-white p-6 rounded-lg shadow-lg">
                         <button onClick={onBack} className="mb-4 w-full text-left inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Back to Test List
                        </button>
                        <Timer initialTime={testDuration} onTimeUp={handleTimeUp} />
                        <div className="text-center mt-4">
                            {!isSubmitted ? (
                                <button onClick={() => { if(window.confirm('Are you sure you want to submit?')) handleSubmit(); }} className="w-full px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors duration-200">
                                    Check Answers
                                </button>
                            ) : (
                                <button onClick={handleTryAgain} className="w-full px-8 py-3 bg-slate-600 text-white font-bold rounded-lg hover:bg-slate-700 transition-colors duration-200">
                                    Try Again
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-lg font-bold mb-4">Question Palette</h3>
                        <QuestionPalette 
                            questions={allQuestions}
                            answers={userAnswers}
                            currentQuestionIndex={currentQuestionIndex > -1 ? currentQuestionIndex : 0}
                            onQuestionSelect={handleQuestionSelect}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReadingTestScreen;