import React, { useEffect, useState } from 'react';
import { getGrammarTopicContent, GrammarTopicContent } from '../services/grammarLibrary';

interface GrammarTopicScreenProps {
  topic: string;
  onBack: () => void;
}

const GrammarTopicScreen: React.FC<GrammarTopicScreenProps> = ({ topic, onBack }) => {
    const [content, setContent] = useState<GrammarTopicContent | null>(null);

    useEffect(() => {
        setContent(getGrammarTopicContent(topic));
    }, [topic]);

    if (!content) {
        return (
            <div className="container mx-auto px-4 py-12 text-center">
                <h2 className="text-2xl font-bold text-slate-700">Topic Not Found</h2>
                <p className="mt-4 text-slate-600">The requested grammar topic could not be found.</p>
                <button onClick={onBack} className="mt-8 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                    Back to Grammar List
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
                <button onClick={onBack} className="mb-8 inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Back to All Topics
                </button>
                <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200">
                    <h2 className="text-3xl font-extrabold text-slate-900 mb-6 border-b pb-4">{content.title}</h2>
                    
                    <div className="mb-8">
                        <h3 className="text-xl font-bold text-slate-800 mb-3">Explanation</h3>
                        <div className="space-y-4 text-slate-700 leading-relaxed">
                            {content.explanation.map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
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
                </div>
            </div>
        </div>
    );
};

export default GrammarTopicScreen;
