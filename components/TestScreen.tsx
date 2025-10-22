import React, { useState, useCallback, useRef, useMemo, useEffect } from 'react';
import { TestData, UserAnswers, QuestionOption, Question } from '../types';
import Timer from './Timer';
import QuestionPalette from './QuestionPalette';
import AudioPlayer from './AudioPlayer';
import AddVocabPopup from './AddVocabPopup';
import { useWordSelection } from './useWordSelection';

interface TestScreenProps {
  testData: TestData;
  userAnswers: UserAnswers;
  onSubmit: (answers: UserAnswers) => void;
}

const TestScreen: React.FC<TestScreenProps> = ({ testData, userAnswers: initialAnswers, onSubmit }) => {
  const [answers, setAnswers] = useState<UserAnswers>(initialAnswers);
  const contentRef = useRef<HTMLDivElement>(null);
  const { selectionPopup, toastMessage, handleMouseUp, handleSaveWord } = useWordSelection(contentRef);
  
  const handleAnswerSelect = (questionId: number | string, option: QuestionOption) => {
    setAnswers(prev => ({ ...prev, [questionId]: option }));
  };
  
  // Renders a single, scrollable page for all grammar questions, now with a question palette
  if (testData.category === 'grammar') {
    const questionRefs = useRef<Record<string, HTMLDivElement | null>>({});
    const allQuestions = useMemo(() => testData.questions, [testData.questions]);

    useEffect(() => {
        questionRefs.current = {};
    }, [allQuestions]);

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
            <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700" ref={contentRef} onMouseUp={handleMouseUp}>
                <h2 className="text-3xl font-bold text-center mb-2 text-slate-900 dark:text-slate-100">{testData.testTitle}</h2>
                <p className="text-center text-lg text-slate-600 dark:text-slate-400 mb-8">{testData.questions.length} questions</p>

                <div className="space-y-8">
                {testData.questions.map((q, index) => (
                    <div 
                        key={q.id}
                        id={String(q.id)}
                        ref={el => { if (el) questionRefs.current[String(q.id)] = el; }}
                        className={`scroll-mt-24 ${index > 0 ? 'border-t border-slate-200 dark:border-slate-700 pt-8' : ''}`}
                    >
                    <h4 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-200">Question {index + 1}</h4>
                    <div className="text-lg text-slate-800 dark:text-slate-300 mb-6 space-y-2">
                        <p dangerouslySetInnerHTML={{ __html: q.questionText.replace(/____/g, '<span class="font-bold text-blue-600">____</span>') }} />
                    </div>
                    <div className="space-y-3">
                        {(Object.keys(q.options) as QuestionOption[]).map(optionKey => (
                        q.options[optionKey] && (
                            <label key={optionKey} className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200 ${answers[q.id] === optionKey ? 'bg-blue-100 dark:bg-blue-900/50 border-blue-500 shadow-sm' : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500'}`}>
                                <input 
                                    type="radio" 
                                    name={`question-${q.id}`} 
                                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 dark:bg-slate-700 dark:border-slate-500"
                                    checked={answers[q.id] === optionKey}
                                    onChange={() => handleAnswerSelect(q.id, optionKey)}
                                />
                                <span className="ml-4 text-base text-slate-700 dark:text-slate-300"><span className="font-bold">{optionKey}.</span> {q.options[optionKey]}</span>
                            </label>
                        )
                        ))}
                    </div>
                    </div>
                ))}
                </div>
            </div>

            <div className="mt-8 lg:mt-0 space-y-8">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
                    <div className="text-center p-2 text-slate-500 dark:text-slate-400 font-semibold">Untimed Practice</div>
                    <button 
                        onClick={() => { if(window.confirm('Are you sure you want to submit your answers?')) onSubmit(answers); }}
                        className="w-full mt-4 bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-colors duration-200"
                    >
                        Submit Answers
                    </button>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
                    <h3 className="text-lg font-bold mb-4 dark:text-slate-200">Question Palette</h3>
                    <QuestionPalette 
                        questions={allQuestions}
                        answers={answers} 
                        currentQuestionIndex={currentQuestionIndex > -1 ? currentQuestionIndex : 0}
                        onQuestionSelect={handleQuestionSelect}
                    />
                </div>
            </div>
        </div>
      </div>
    );
  }

  // --- EXISTING LOGIC FOR SINGLE QUESTION VIEW (for TOEIC Mini Test etc.) ---
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [time, setTime] = useState(testData.duration);
  const currentQuestion = testData.questions[currentQuestionIndex];

  const handleTimeUp = useCallback(() => {
    onSubmit(answers);
  }, [onSubmit, answers]);

  const goToQuestion = (index: number) => {
    if (index >= 0 && index < testData.questions.length) {
      setCurrentQuestionIndex(index);
    }
  };

  const goToNext = () => {
    if (currentQuestionIndex < testData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

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
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700" ref={contentRef} onMouseUp={handleMouseUp}>
          <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-200">Question {currentQuestionIndex + 1} of {testData.questions.length}</h2>
          
          {currentQuestion.part === 1 && currentQuestion.image && (
            <div className="mb-4 rounded-lg overflow-hidden">
                <img src={currentQuestion.image} alt="TOEIC Part 1" className="w-full object-cover"/>
            </div>
          )}

          {currentQuestion.audioScript && (
            <div className="mb-6">
                <p className="font-semibold text-slate-700 dark:text-slate-300 mb-2">Listen to the audio:</p>
                <AudioPlayer audioScript={currentQuestion.audioScript} />
            </div>
          )}

          <div className="text-lg text-slate-800 dark:text-slate-300 mb-6 space-y-2">
             <p dangerouslySetInnerHTML={{ __html: currentQuestion.questionText.replace(/____/g, '<span class="font-bold text-blue-600">____</span>') }} />
          </div>

          <div className="space-y-3">
            {(Object.keys(currentQuestion.options) as QuestionOption[]).map(optionKey => (
              currentQuestion.options[optionKey] && (
                 <label key={optionKey} className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200 ${answers[currentQuestion.id] === optionKey ? 'bg-blue-100 dark:bg-blue-900/50 border-blue-500 shadow-sm' : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500'}`}>
                    <input 
                        type="radio" 
                        name={`question-${currentQuestion.id}`} 
                        className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 dark:bg-slate-700 dark:border-slate-500"
                        checked={answers[currentQuestion.id] === optionKey}
                        onChange={() => handleAnswerSelect(currentQuestion.id, optionKey)}
                    />
                    <span className="ml-4 text-base text-slate-700 dark:text-slate-300"><span className="font-bold">{optionKey}.</span> {currentQuestion.options[optionKey]}</span>
                 </label>
              )
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="mt-8 lg:mt-0 space-y-8">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
                {time > 0 ? <Timer initialTime={time} onTimeUp={handleTimeUp} /> : <div className="text-center p-2 text-slate-500 dark:text-slate-400 font-semibold">Untimed Practice</div>}
                <button 
                    onClick={() => { if(window.confirm('Are you sure you want to submit your answers?')) onSubmit(answers); }}
                    className="w-full mt-4 bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-colors duration-200"
                >
                    Submit Test
                </button>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-bold mb-4 dark:text-slate-200">Question Palette</h3>
                <QuestionPalette 
                    questions={testData.questions}
                    answers={answers} 
                    currentQuestionIndex={currentQuestionIndex}
                    onQuestionSelect={goToQuestion}
                />
                 <div className="flex justify-between mt-6">
                    <button onClick={goToPrev} disabled={currentQuestionIndex === 0} className="px-4 py-2 bg-slate-200 rounded-md font-semibold text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600">Previous</button>
                    <button onClick={goToNext} disabled={currentQuestionIndex === testData.questions.length - 1} className="px-4 py-2 bg-blue-600 text-white rounded-md font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700">Next</button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default TestScreen;