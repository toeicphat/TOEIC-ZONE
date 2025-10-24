import React, { useMemo } from 'react';
import { UserAnswers, QuestionOption } from '../types';

interface QuestionPaletteProps {
  questions: { id: number | string; correctAnswer?: QuestionOption }[];
  answers: UserAnswers;
  currentQuestionIndex: number;
  onQuestionSelect: (index: number) => void;
  markedForReview?: Set<string>;
  columns?: number;
  isSubmitted?: boolean;
}

const QuestionPalette: React.FC<QuestionPaletteProps> = ({ questions, answers, currentQuestionIndex, onQuestionSelect, markedForReview, columns = 6, isSubmitted = false }) => {
  const useIdAsLabel = useMemo(() => {
    if (!questions || questions.length === 0) return false;
    const firstId = questions[0].id;
    // Use index for grammar quizzes (e.g., 'verb-400-1')
    if (typeof firstId === 'string' && firstId.includes('-')) {
      return false;
    }
    // Use index for dictation exercises (e.g., 5101)
    if (typeof firstId === 'number' && firstId > 1000) {
      return false;
    }
    // Use ID for TOEIC Reading/Test questions (e.g., 147, 101)
    return true; 
  }, [questions]);

  const gridClass = columns === 8 ? "grid grid-cols-8 gap-1.5" : "grid grid-cols-6 gap-1.5";

  return (
    <div className={gridClass}>
      {questions.map((q, i) => {
        const questionId = q.id;
        const isAnswered = answers[questionId] != null;
        const isActive = i === currentQuestionIndex;
        const isMarked = markedForReview?.has(String(questionId));
        const label = useIdAsLabel ? q.id : i + 1;

        let buttonClasses = 'w-full h-8 flex items-center justify-center rounded-md font-semibold border text-sm transition-colors duration-200 relative ';
        
        if (isSubmitted && q.correctAnswer) {
            const userAnswer = answers[questionId];
            const isCorrect = userAnswer === q.correctAnswer;
            if (isAnswered) {
                buttonClasses += isCorrect 
                    ? 'bg-green-600 text-white border-green-700' 
                    : 'bg-red-600 text-white border-red-700';
            } else {
                buttonClasses += 'bg-slate-200 text-slate-500 border-slate-300 dark:bg-slate-700 dark:text-slate-400';
            }
        } else {
            if (isActive) {
                buttonClasses += 'bg-blue-500 text-white border-blue-600 ring-2 ring-blue-300 dark:bg-blue-600 dark:border-blue-700 dark:ring-blue-400';
            } else if (isAnswered) {
                buttonClasses += 'bg-slate-200 text-slate-800 border-slate-300 dark:bg-slate-600 dark:text-slate-100 dark:border-slate-500';
            } else {
                buttonClasses += 'bg-white text-slate-600 border-slate-300 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-600 dark:hover:bg-slate-700';
            }
        }

        return (
          <button
            key={i}
            className={buttonClasses}
            onClick={() => onQuestionSelect(i)}
            aria-label={`Go to question ${label}`}
          >
            {label}
            {isMarked && !isSubmitted && (
              <span className="absolute -top-1 -right-1 block h-2.5 w-2.5 rounded-full bg-yellow-400 ring-2 ring-white" aria-label="Marked for review" />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default QuestionPalette;
