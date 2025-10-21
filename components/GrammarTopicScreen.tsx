
import React, { useEffect, useState, useMemo, useCallback } from 'react';
// FIX: Moved generateDeterminerExercise to import from geminiService as it is not exported from grammarLibrary
import { getGrammarTopicContent, getGrammarQuizQuestions, getGrammarQuizLevels } from '../services/grammarLibrary';
import { generateDeterminerExercise } from '../services/geminiService';
import { GrammarTopicContent, DeterminerExercise, User } from '../types';
import SelectionCard from './SelectionCard';
import { ArrowLeftIcon, SparklesIcon, LoadingIcon, RefreshIcon } from './icons';
import { addTestResult } from '../services/progressService';

interface GrammarTopicScreenProps {
  topic: string;
  onBack: () => void;
  currentUser: User;
  onSelectTopic: (topic: string) => void;
  onStartQuiz: (topic: string, level: string) => void;
}

const GrammarTopicScreen: React.FC<GrammarTopicScreenProps> = ({ topic, onBack, currentUser, onSelectTopic, onStartQuiz }) => {
    const [content, setContent] = useState<GrammarTopicContent | null>(null);
    
    // State for interactive determiner exercise
    const [interactiveExercise, setInteractiveExercise] = useState<DeterminerExercise | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [clickedWords, setClickedWords] = useState<Record<number, 'correct' | 'incorrect'>>({});
    const [isExerciseSubmitted, setIsExerciseSubmitted] = useState(false);
    const [exerciseError, setExerciseError] = useState<string | null>(null);

    const quizLevels = useMemo(() => getGrammarQuizLevels(topic), [topic]);

    useEffect(() => {
        setContent(getGrammarTopicContent(topic));
        setInteractiveExercise(null);
        setIsGenerating(false);
        setClickedWords({});
        setIsExerciseSubmitted(false);
        setExerciseError(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [topic]);

    // Handlers for new interactive exercise
    const handleStartDeterminerExercise = useCallback(async () => {
        setIsGenerating(true);
        setInteractiveExercise(null);
        setClickedWords({});
        setIsExerciseSubmitted(false);
        setExerciseError(null);
        try {
            const data = await generateDeterminerExercise();
            if (data) {
                setInteractiveExercise(data);
            } else {
                setExerciseError("Failed to generate exercise. Please try again.");
            }
        } catch (e) {
            console.error(e);
            setExerciseError("An error occurred while fetching the exercise.");
        } finally {
            setIsGenerating(false);
        }
    }, []);

    const handleWordClick = (word: string, index: number) => {
        if (isExerciseSubmitted || clickedWords[index]) return;
        
        const cleanedWord = word.toLowerCase().replace(/[^a-z0-9]/gi, '');
        if (!cleanedWord) return;

        const isDeterminer = interactiveExercise?.determiners.includes(cleanedWord);
        setClickedWords(prev => ({ ...prev, [index]: isDeterminer ? 'correct' : 'incorrect' }));
    };
    
    const renderDeterminerClicker = () => {
        const paragraphWords = interactiveExercise?.paragraph.split(/\s+/) || [];
        
        const getWordClasses = (word: string, index: number) => {
            const cleanedWord = word.toLowerCase().replace(/[^a-z0-9]/gi, '');
            const isDeterminer = interactiveExercise?.determiners.includes(cleanedWord);
            
            let classes = "cursor-pointer transition-all duration-200 rounded px-1 py-0.5";
            
            if (isExerciseSubmitted) {
                if (isDeterminer) return `${classes} bg-blue-200 text-blue-800 font-bold`;
                return classes;
            }

            if (clickedWords[index] === 'correct') {
                return `${classes} bg-green-200 text-green-800 font-bold`;
            }
            if (clickedWords[index] === 'incorrect') {
                return `${classes} bg-red-200 text-red-800 line-through`;
            }
            
            return `${classes} hover:bg-yellow-100`;
        };

        const correctCount = Object.values(clickedWords).filter(v => v === 'correct').length;
        const totalDeterminers = interactiveExercise?.determiners.length || 0;

        return (
            <div className="mt-8">
                <h3 className="text-xl font-bold text-slate-800 mb-3">Interactive Exercise</h3>
                <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
                    {isGenerating && (
                        <div className="flex justify-center items-center p-8">
                            <LoadingIcon className="h-8 w-8 text-blue-600 animate-spin" />
                            <span className="ml-4 text-slate-600">Generating paragraph...</span>
                        </div>
                    )}
                    {exerciseError && <p className="text-red-500 text-center">{exerciseError}</p>}

                    {!isGenerating && !interactiveExercise && (
                        <div className="text-center">
                            <p className="text-slate-600 mb-4">Test your knowledge! Click the button to generate a paragraph and identify the determiners.</p>
                            <button onClick={handleStartDeterminerExercise} className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700">
                                <SparklesIcon className="h-5 w-5" />
                                Start AI Exercise
                            </button>
                        </div>
                    )}

                    {interactiveExercise && (
                        <div>
                             <p className="text-lg leading-loose text-slate-700 p-4 bg-slate-50 rounded-md">
                                {paragraphWords.map((word, index) => (
                                    <span key={index} onClick={() => handleWordClick(word, index)} className={getWordClasses(word, index)}>
                                        {word}{' '}
                                    </span>
                                ))}
                            </p>
                            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <p className="font-semibold text-slate-700">
                                    Found: {correctCount} / {totalDeterminers}
                                </p>
                                <div className="flex gap-2">
                                     <button onClick={() => setIsExerciseSubmitted(true)} disabled={isExerciseSubmitted} className="px-5 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:bg-slate-400">
                                        Check Answers
                                    </button>
                                    <button onClick={handleStartDeterminerExercise} className="px-5 py-2 bg-slate-600 text-white font-semibold rounded-lg hover:bg-slate-700">
                                        New Paragraph
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    const renderLevelSelection = () => (
        <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {quizLevels.map(level => {
                    const isExercise = level.startsWith('Bài tập') || level.startsWith('Exercise') || level === 'Phân loại GIới từ & Liên từ';
                    const title = isExercise ? level : `Level ${level}`;
                    const description = isExercise ? `Practice questions for ${topic}` : `Multiple-choice questions for the ${level} target score.`;
    
                    return (
                        <SelectionCard 
                            key={level}
                            title={title}
                            description={description}
                            onClick={() => onStartQuiz(topic, level)}
                        />
                    );
                })}
            </div>
        </div>
    );
    
    const renderSubTopics = () => (
        <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {content?.subTopics?.map(subTopicTitle => {
                    return (
                        <SelectionCard 
                            key={subTopicTitle}
                            title={subTopicTitle}
                            description={`Click to learn more about ${subTopicTitle}.`}
                            onClick={() => onSelectTopic(subTopicTitle)}
                        />
                    );
                })}
            </div>
        </div>
    );

    const renderOriginalContent = () => {
         if (!content) {
            return (
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-slate-700">Topic Not Found</h2>
                    <p className="mt-4 text-slate-600">The requested grammar topic could not be found.</p>
                </div>
            );
        }
        return (
             <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200">
                <h2 className="text-3xl font-extrabold text-slate-900 mb-6 border-b pb-4">{content.title}</h2>
                
                <div className="mb-8">
                    <h3 className="text-xl font-bold text-slate-800 mb-3">Explanation</h3>
                    <div className="space-y-4 text-slate-700 leading-relaxed">
                        {content.explanation.map((paragraph, index) => (
                            <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-4">Examples</h3>
                    <div className="space-y-5">
                        {content.examples.map((example, index) => (
                            <div key={index} className="p-4 bg-slate-50 border-l-4 border-blue-500 rounded-r-lg">
                                <p className="font-mono text-slate-800" dangerouslySetInnerHTML={{ __html: example.sentence }} />
                                <p className="text-sm text-slate-500 italic mt-1">{example.translation}</p>
                            </div>
                        ))}
                    </div>
                </div>
                {content.interactiveExercise === 'determiner_clicker' && renderDeterminerClicker()}
            </div>
        )
    };
    
    const hasQuizzes = quizLevels.length > 0;
    const hasSubTopics = content?.subTopics && content.subTopics.length > 0;

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-6xl mx-auto">
                <button onClick={onBack} className="mb-8 inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-semibold transition-colors">
                    <ArrowLeftIcon className="h-5 w-5 mr-2" />
                    Back to All Topics
                </button>
                
                <>
                    {renderOriginalContent()}
                    
                    {hasSubTopics && (
                        <div className="mt-12">
                            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mb-8 border-t dark:border-slate-700 pt-8 text-center">
                                Related Topics
                            </h2>
                            {renderSubTopics()}
                        </div>
                    )}

                    {hasQuizzes && (
                        <div className="mt-12">
                            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mb-8 border-t dark:border-slate-700 pt-8 text-center">
                                Practice Quizzes
                            </h2>
                            {renderLevelSelection()}
                        </div>
                    )}
                </>
            </div>
        </div>
    );
};

export default GrammarTopicScreen;
