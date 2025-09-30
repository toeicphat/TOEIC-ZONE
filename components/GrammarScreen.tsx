import React from 'react';
import SelectionCard from './SelectionCard';

const grammarTopics = [
    { title: "Danh từ & Cụm danh từ", description: "Nouns & Noun Phrases" },
    { title: "Động từ", description: "Verbs" },
    { title: "Tính từ", description: "Adjectives" },
    { title: "Trạng từ", description: "Adverbs" },
    { title: "Giới từ & Liên từ", description: "Prepositions & Conjunctions" },
    { title: "Hạn định từ", description: "Determiners" },
    { title: "Đại từ", description: "Pronouns" },
    { title: "Mệnh đề quan hệ", description: "Relative Clauses" },
    { title: "Mệnh đề danh từ", description: "Noun Clauses" },
    { title: "Đảo ngữ", description: "Inversions" },
    { title: "So sánh", description: "Comparisons" },
    { title: "Các loại khác", description: "Other Topics" }
];

interface GrammarScreenProps {
    onSelectTopic: (topic: string) => void;
}

const GrammarScreen: React.FC<GrammarScreenProps> = ({ onSelectTopic }) => {

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-slate-900 sm:text-5xl">Ngữ pháp</h2>
                    <p className="mt-4 text-lg text-slate-600">
                        Review key grammar concepts for the TOEIC test.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {grammarTopics.map(topic => (
                        <SelectionCard 
                            key={topic.title}
                            title={topic.title}
                            description={topic.description}
                            onClick={() => onSelectTopic(topic.title)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GrammarScreen;