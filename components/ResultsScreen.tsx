import React, { useRef, useState, useMemo, useEffect } from 'react';
import { TestData, UserAnswers, Question, QuestionOption } from '../types';
import { CheckCircleIcon, XCircleIcon } from './icons';
import AddVocabPopup from './AddVocabPopup';
import { useWordSelection } from './useWordSelection';
import QuestionPalette from './QuestionPalette';

interface ResultsScreenProps {
  testData: TestData;
  userAnswers: UserAnswers;
  onGoHome: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ testData, userAnswers, onGoHome }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const { selectionPopup, toastMessage, handleMouseUp, handleSaveWord } = useWordSelection(contentRef);
  
  const score = testData.questions.reduce((acc, q) => {
    return userAnswers[q.id] === q.correctAnswer ? acc + 1 : acc;
  }, 0);
  const totalQuestions = testData.questions.length;
  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

  const getOptionClasses = (question: Question, option: QuestionOption) => {
    const isCorrect = option === question.correctAnswer;
    const isSelected = userAnswers[question.id] === option;

    if (isCorrect) return 'bg-green-200 dark:bg-green-800/60 border-green-600 dark:border-green-500';
    if (isSelected && !isCorrect) return 'bg-red-200 dark:bg-red-800/60 border-red-600 dark:border-red-500';
    return 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600';
  };

  const questionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const allQuestions = useMemo(() => testData.questions, [testData.questions]);

  const [currentQuestionIdInView, setCurrentQuestionIdInView] = useState<string | null>(
    allQuestions.length > 0 ? String(allQuestions[0].id) : null
  );

  const handleQuestionSelect = (index: number) => {
    const questionId = allQuestions[index]?.id;
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
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    setCurrentQuestionIdInView(entry.target.id);
                    return;
                }
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
  }, [allQuestions]);

  const currentQuestionIndex = useMemo(() => {
    return allQuestions.findIndex(q => String(q.id) === currentQuestionIdInView);
  }, [currentQuestionIdInView, allQuestions]);


  return (
    <div className="container mx-auto p-4 lg:p-8">
      {toastMessage && (
          <div className="fixed bottom-5 right-5 bg-slate-800 text-white px-6 py-3 rounded-lg shadow-xl z-50 animate-bounce">
              {toastMessage}
          </div>
      )}
      {selectionPopup && <AddVocabPopup top={selectionPopup.top} left={selectionPopup.left} onSave={handleSaveWord} />}
      
      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700" ref={contentRef} onMouseUp={handleMouseUp}>
            <h2 className="text-3xl font-bold text-center mb-2 text-slate-900 dark:text-slate-100">Test Results</h2>
            <p className="text-center text-lg text-slate-600 dark:text-slate-400 mb-8">{testData.testTitle}</p>
            
            <h3 className="text-2xl font-bold mb-6 border-b pb-3 dark:border-slate-600 dark:text-slate-200">Detailed Review</h3>
            
            <div className="space-y-8">
              {allQuestions.map((q, index) => (
                <div 
                    key={q.id}
                    id={String(q.id)}
                    ref={el => { if (el) questionRefs.current[String(q.id)] = el; }}
                    className={`scroll-mt-24 ${index > 0 ? 'border-t border-slate-200 dark:border-slate-700 pt-8' : ''}`}
                >
                  <h4 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-200">Question {index + 1}</h4>
                  {q.image && <img src={q.image} alt={`Question ${index+1}`} className="rounded-lg mb-4 max-w-sm"/>}
                  <p className="text-lg text-slate-800 dark:text-slate-300 mb-4" dangerouslySetInnerHTML={{ __html: q.questionText }} />
                  <div className="space-y-3 mb-4">
                    {(Object.keys(q.options) as QuestionOption[]).map(optionKey => (
                       q.options[optionKey] && (
                         <div key={optionKey} className={`flex items-start p-3 border rounded-lg ${getOptionClasses(q, optionKey)}`}>
                            <div className="flex-shrink-0 mt-1">
                              {userAnswers[q.id] === optionKey && userAnswers[q.id] !== q.correctAnswer && <XCircleIcon className="h-5 w-5 text-red-600"/>}
                              {optionKey === q.correctAnswer && <CheckCircleIcon className="h-5 w-5 text-green-600"/>}
                            </div>
                            <span className="ml-3 text-base text-slate-700 dark:text-slate-300"><span className="font-bold">{optionKey}.</span> {q.options[optionKey]}</span>
                         </div>
                       )
                    ))}
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg">
                    <h5 className="font-bold text-slate-800 dark:text-slate-200">Explanation:</h5>
                    <p className="text-slate-600 dark:text-slate-300 mt-1">{q.explanation}</p>
                  </div>
                </div>
              ))}
            </div>
        </div>

        {/* Right Sidebar */}
        <div className="mt-8 lg:mt-0 space-y-8 lg:sticky lg:top-24 lg:self-start">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
                <div className="text-center">
                    <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200">Your Score</h3>
                    <p className="text-6xl font-bold text-blue-600 dark:text-blue-400 my-2">{percentage}%</p>
                    <p className="text-lg text-slate-600 dark:text-slate-300">You answered <span className="font-bold">{score}</span> out of <span className="font-bold">{totalQuestions}</span> questions correctly.</p>
                </div>
                <button onClick={onGoHome} className="w-full mt-6 px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors duration-200">
                    Back to Home
                </button>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-bold mb-4 dark:text-slate-200">Question Palette</h3>
                <QuestionPalette 
                    questions={allQuestions}
                    answers={userAnswers} 
                    currentQuestionIndex={currentQuestionIndex > -1 ? currentQuestionIndex : 0}
                    onQuestionSelect={handleQuestionSelect}
                    isSubmitted={true}
                />
            </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsScreen;