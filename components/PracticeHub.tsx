import React from 'react';

interface PracticeHubProps {
  onNavigateToPracticeTest: () => void;
  onNavigateToDictation: () => void;
  onNavigateToReadingPractice: () => void;
  onNavigateToGrammar: () => void;
  onNavigateToVocabulary: () => void;
  onNavigateToSpeaking: () => void;
  onNavigateToWritingPractice: () => void;
}

const PracticeCard: React.FC<{title: string, description: string, onClick: () => void}> = ({ title, description, onClick }) => (
    <button 
        onClick={onClick}
        className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-slate-200 text-left w-full h-full flex flex-col"
    >
        <h3 className="text-2xl font-bold text-slate-800 mb-2">{title}</h3>
        <p className="text-slate-600 flex-grow">{description}</p>
    </button>
);


const PracticeHub: React.FC<PracticeHubProps> = ({ onNavigateToPracticeTest, onNavigateToDictation, onNavigateToReadingPractice, onNavigateToGrammar, onNavigateToVocabulary, onNavigateToSpeaking, onNavigateToWritingPractice }) => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-extrabold text-slate-900 sm:text-5xl">TOEIC không khó, học CHẮC bao ĐẬU</h2>
        <p className="mt-4 text-lg text-red-600 font-bold">
          Vì đây là sản phẩm đang phát triển. Nếu có sai sót, xin vui lòng nhắn tin cho thầy Phát qua Facebook cá nhân ở cuối trang.
        </p>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <PracticeCard 
            title="Luyện tập Test (AI)"
            description="Take a mini-TOEIC test with AI-generated questions covering various parts of the exam."
            onClick={onNavigateToPracticeTest}
        />
        <PracticeCard 
            title="Nghe chép chính tả"
            description="Listen to sentences and type what you hear to improve your listening and spelling."
            onClick={onNavigateToDictation}
        />
        <PracticeCard 
            title="Luyện tập Reading"
            description="Practice with TOEIC Reading questions for Part 5, 6, and 7."
            onClick={onNavigateToReadingPractice}
        />
        <PracticeCard 
            title="Ngữ pháp"
            description="Review and practice key English grammar topics relevant to the TOEIC test."
            onClick={onNavigateToGrammar}
        />
        <PracticeCard 
            title="Từ vựng"
            description="Review saved vocabulary using a spaced repetition system to build your word bank."
            onClick={onNavigateToVocabulary}
        />
        <PracticeCard 
            title="Luyện tập Speaking"
            description="Practice for the TOEIC Speaking test with various question types."
            onClick={onNavigateToSpeaking}
        />
         <PracticeCard 
            title="Luyện tập Writing"
            description="Practice for TOEIC Writing questions for all parts."
            onClick={onNavigateToWritingPractice}
        />
      </div>
    </div>
  );
};

export default PracticeHub;
