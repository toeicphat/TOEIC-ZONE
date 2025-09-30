import React from 'react';
import { UserAnswers } from '../types';

interface QuestionPaletteProps {
  questions: { id: number | string }[];
  answers: UserAnswers;
  currentQuestionIndex: number;
  onQuestionSelect: (index: number) => void;
}

const QuestionPalette: React.FC<QuestionPaletteProps> = ({ questions, answers, currentQuestionIndex, onQuestionSelect }) => {
  return (
    <div className="grid grid-cols-5 gap-2">
      {questions.map((q, i) => {
        const questionId = q.id;
        const isAnswered = answers[questionId] != null;
        const isActive = i === currentQuestionIndex;

        let buttonClasses = 'w-full h-10 flex items-center justify-center rounded-md font-semibold border-2 transition-colors duration-200 ';
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
            aria-label={`Go to question ${i + 1}`}
          >
            {i + 1}
          </button>
        );
      })}
    </div>
  );
};

export default QuestionPalette;