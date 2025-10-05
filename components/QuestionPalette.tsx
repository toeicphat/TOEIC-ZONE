import React, { useMemo } from 'react';
import { UserAnswers } from '../types';

interface QuestionPaletteProps {
  questions: { id: number | string }[];
  answers: UserAnswers;
  currentQuestionIndex: number;
  onQuestionSelect: (index: number) => void;
}

const QuestionPalette: React.FC<QuestionPaletteProps> = ({ questions, answers, currentQuestionIndex, onQuestionSelect }) => {
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

  return (
    <div className="grid grid-cols-6 gap-1.5">
      {questions.map((q, i) => {
        const questionId = q.id;
        const isAnswered = answers[questionId] != null;
        const isActive = i === currentQuestionIndex;
        const label = useIdAsLabel ? q.id : i + 1;

        let buttonClasses = 'w-full h-8 flex items-center justify-center rounded-md font-semibold border text-sm transition-colors duration-200 ';
        if (isActive) {
          buttonClasses += 'bg-blue-500 text-white border-blue-600 ring-2 ring-blue-300';
        } else if (isAnswered) {
          buttonClasses += 'bg-slate-700 text-white border-slate-800';
        } else {
          buttonClasses += 'bg-white text-slate-600 border-slate-300 hover:bg-slate-100';
        }

        return (
          <button
            key={i}
            className={buttonClasses}
            onClick={() => onQuestionSelect(i)}
            aria-label={`Go to question ${label}`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default QuestionPalette;