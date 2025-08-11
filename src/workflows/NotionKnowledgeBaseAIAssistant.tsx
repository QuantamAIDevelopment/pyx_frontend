import React, { useState, ChangeEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';
// import { FaPaperPlane, FaBook } from 'react-icons/fa';
 
const NOTION_API_URL = 'https://PYX-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/notion';
 
const parseMarkdownLink = (text: string): React.ReactNode => {
    // Matches [text](url)
    const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = regex.exec(text)) !== null) {
        if (match.index > lastIndex) {
            parts.push(text.substring(lastIndex, match.index));
        }
        parts.push(
            <a key={match[2]} href={match[2]} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{match[1]}</a>
        );
        lastIndex = regex.lastIndex;
    }
    if (lastIndex < text.length) {
        parts.push(text.substring(lastIndex));
    }
    return parts.length ? parts : text;
};
 
const NotionKnowledgeBaseAIAssistant: React.FC = () => {
    const [question, setQuestion] = useState<string>('');
    const [answer, setAnswer] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
 
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setAnswer('');
        try {
            const formData = new FormData();
            formData.append('question', question);
            const response = await fetch(NOTION_API_URL, {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }
            const text = await response.text();
            setAnswer(text);
        } catch (err: any) {
            setError('Failed to get answer. ' + (err.message || ''));
        } finally {
            setLoading(false);
        }
    };
 
    return (
        <div className="bg-gray-50 shadow-md max-w-4xl mx-auto mt-8 rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="w-full flex flex-col md:flex-row items-end gap-4 mb-8">
                <div className="flex flex-col w-full md:w-2/3">
                    <input
                        type="text"
                        value={question}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setQuestion(e.target.value)}
                        placeholder="Ask a question about your Notion workspace..."
                        className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    className="w-full md:w-[160px] h-[42px] text-white font-bold rounded-lg bg-[#FF620A] shadow hover:shadow-md transition-all"
                    disabled={loading}
                >
                    {loading ? 'Loading...' : 'Run Workflow'}
                </motion.button>
            </form>
            {answer && (
                <div>
                    <h2 className="text-xl font-bold text-black mb-6">Notion Knowledge Base Result</h2>
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-2xl mb-8">
                        <div className="text-black text-base leading-relaxed">{parseMarkdownLink(answer)}</div>
                    </div>
                </div>
            )}
            {!answer && !loading && (
                <p className="text-center text-gray-700">No answer to display.</p>
            )}
            {error && (
                <div className="mt-4 text-red-600 text-center font-medium">{error}</div>
            )}
        </div>
    );
};
 
export default NotionKnowledgeBaseAIAssistant;