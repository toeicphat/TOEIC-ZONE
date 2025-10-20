import React, { useState } from 'react';
import { 
    TargetIcon, 
    SparklesIcon, 
    TrophyIcon,
    HeadphoneIcon,
    BookOpenIcon,
    BrainIcon,
    PuzzleIcon,
    MicrophoneIcon,
    TypeIcon,
    PlayIcon
} from './icons';


interface PracticeHubProps {
  onNavigateToDictation: () => void;
  onNavigateToReadingPractice: () => void;
  onNavigateToGrammar: () => void;
  onNavigateToVocabulary: () => void;
  onNavigateToSpeaking: () => void;
  onNavigateToWritingPractice: () => void;
}

const PracticeCard: React.FC<{
    title: string;
    description: string;
    onClick: () => void;
    icon: React.ElementType;
    colorClass: string;
}> = ({ title, description, onClick, icon: Icon, colorClass }) => (
    <button 
        onClick={onClick}
        className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-slate-200 dark:border-slate-700 text-left w-full h-full flex flex-col"
    >
        <Icon className={`h-10 w-10 mb-4 ${colorClass}`} />
        <h3 className={`text-2xl font-bold mb-2 ${colorClass}`}>{title}</h3>
        <p className="text-slate-600 dark:text-slate-400 flex-grow">{description}</p>
    </button>
);


const PracticeHub: React.FC<PracticeHubProps> = ({ 
    onNavigateToDictation, 
    onNavigateToReadingPractice, 
    onNavigateToGrammar, 
    onNavigateToVocabulary, 
    onNavigateToSpeaking, 
    onNavigateToWritingPractice 
}) => {
    // The Google Drive audio player is now integrated directly.
    // States for manual input are no longer needed.

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Main Content */}
      <div>
          <div className="text-center mb-12">
              <div className="relative inline-block mb-6">
                  <TargetIcon className="h-40 w-40 text-slate-200 dark:text-slate-700 animate-pulse" />
                  <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight" style={{textShadow: '0 2px 4px rgba(0,0,0,0.1)'}}>990</span>
                  </div>
              </div>
              <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white sm:text-5xl">TOEIC không khó, học CHẮC bao ĐẬU</h2>
              <p className="mt-4 text-lg text-red-600 font-bold">
                Vì đây là sản phẩm đang phát triển. Nếu có sai sót, xin vui lòng nhắn tin cho thầy Phát qua Facebook cá nhân ở cuối trang.
              </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              <PracticeCard 
                  title="Nghe chép chính tả"
                  description="Listen to sentences and type what you hear to improve your listening and spelling."
                  onClick={onNavigateToDictation}
                  icon={HeadphoneIcon}
                  colorClass="text-blue-500 dark:text-blue-400"
              />
              <PracticeCard 
                  title="Luyện tập Reading"
                  description="Practice with TOEIC Reading questions for Part 5, 6, and 7."
                  onClick={onNavigateToReadingPractice}
                  icon={BookOpenIcon}
                  colorClass="text-emerald-500 dark:text-emerald-400"
              />
              <PracticeCard 
                  title="Ngữ pháp"
                  description="Review and practice key English grammar topics relevant to the TOEIC test."
                  onClick={onNavigateToGrammar}
                  icon={BrainIcon}
                  colorClass="text-purple-500 dark:text-purple-400"
              />
              <PracticeCard 
                  title="Từ vựng"
                  description="Review saved vocabulary using a spaced repetition system to build your word bank."
                  onClick={onNavigateToVocabulary}
                  icon={PuzzleIcon}
                  colorClass="text-amber-500 dark:text-amber-400"
              />
              <PracticeCard 
                  title="Luyện tập Speaking"
                  description="Practice for the TOEIC Speaking test with various question types."
                  onClick={onNavigateToSpeaking}
                  icon={MicrophoneIcon}
                  colorClass="text-rose-500 dark:text-rose-400"
              />
               <PracticeCard 
                  title="Luyện tập Writing"
                  description="Practice for TOEIC Writing questions for all parts."
                  onClick={onNavigateToWritingPractice}
                  icon={TypeIcon}
                  colorClass="text-indigo-500 dark:text-indigo-400"
              />
          </div>
      </div>
      
      {/* Reward Info moved to bottom */}
      <div className="mt-16 max-w-3xl mx-auto">
          <div className="relative bg-gradient-to-br from-yellow-100 to-amber-200 dark:from-yellow-900/50 dark:to-amber-800/50 p-6 rounded-xl shadow-lg border border-yellow-200 dark:border-yellow-700 overflow-hidden">
              <SparklesIcon className="absolute -top-2 -left-3 h-10 w-10 text-yellow-400 opacity-30 transform rotate-12" />
              <SparklesIcon className="absolute -bottom-4 -right-2 h-12 w-12 text-yellow-400 opacity-40 transform -rotate-12" />
              <div className="relative z-10 text-center">
                  <div className="flex items-center justify-center gap-2 mb-4">
                      <TrophyIcon className="h-8 w-8 text-amber-500 dark:text-amber-400 flex-shrink-0"/>
                      <h3 className="text-xl font-bold bg-gradient-to-r from-blue-700 to-sky-500 dark:from-blue-400 dark:to-sky-300 bg-clip-text text-transparent">
                          Hoạt động đổi thưởng
                      </h3>
                  </div>
                  <p className="font-semibold bg-gradient-to-r from-blue-600 to-sky-400 dark:from-blue-300 dark:to-sky-200 bg-clip-text text-transparent">
                      Khi thi đậu mục tiêu đã đặt ra, các bạn vui lòng báo điểm về cho thầy Phát để đổi thưởng tiền mặt $$$ nhé
                  </p>
                  <a 
                      href="https://www.facebook.com/phattruong.english" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mt-4 inline-block bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
                  >
                      BÁO ĐIỂM THẦY PHÁT
                  </a>
              </div>
          </div>
      </div>
    </div>
  );
};

export default PracticeHub;