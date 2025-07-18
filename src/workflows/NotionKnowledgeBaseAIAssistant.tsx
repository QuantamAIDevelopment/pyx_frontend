import React, { useState, ChangeEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';
// import { FaPaperPlane, FaBook } from 'react-icons/fa';
 
const NOTION_API_URL = 'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/notion';
 
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
        <div className="bg-gray-200 rounded-2xl shadow-md p-12 w-full max-w-3xl mx-auto mt-8">
            <motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
                className="text-[42px] font-bold text-center mb-6 flex items-center justify-center gap-2"
                style={{ fontFamily: 'sans-serif', color: 'black' }}>
                Notion Knowledge Base AI Assistant
            </motion.h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    value={question}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setQuestion(e.target.value)}
                    placeholder="Ask a question about your Notion workspace..."
                    className="w-full p-4 border rounded text-lg placeholder:text-lg placeholder-gray-500"
                    required
                    style={{ fontFamily: 'poppins' }}
                />
                <div className="flex justify-center w-full">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className={`
                            min-h-[31.5px] h-[31.5px]
                            px-[14px] py-[21px]
                            text-[16.41px] text-white font-bold font-poppins
                            flex items-center justify-center gap-2
                            rounded shadow-[0_2px_8px_rgba(0,0,0,0.12)]
                            transition-opacity duration-200
                            ${loading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
                        `}
                        style={{
                            background: 'linear-gradient(90deg, #FF620A 0%, #993B06 100%)',
                        }}
                    >
                        {loading ? 'Asking...' : 'Run Workflow'}
                    </motion.button>
                </div>
 
 
            </form>
            {error && <div className="text-red-500 mt-4">{error}</div>}
            {answer && (
                <div className="mt-6 bg-gray-100 p-4 rounded shadow-inner border">
                    <div className="text-gray-800 text-base leading-relaxed">
                        {parseMarkdownLink(answer)}
                    </div>
                </div>
            )}
        </div>
    );
};
 
export default NotionKnowledgeBaseAIAssistant;