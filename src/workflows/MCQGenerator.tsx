import React, { useState, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBook, FaBrain } from 'react-icons/fa';
import CoverScreen from './CoverScreen';
import axios from 'axios';
import { BUTTON_CLASSES } from '../utils/colors';

type PageRevealWrapperProps = {
  children: ReactNode;
  heading: string;
  description: string;
  details?: ReactNode;
  coverImage?: string;
  workflowSVG?: React.FC<React.SVGProps<SVGSVGElement>>;
};

const PageRevealWrapper = ({ children, heading, description, details, coverImage, workflowSVG }: PageRevealWrapperProps) => {
  const [isCoverVisible, setCoverVisible] = useState(true);

  const handleStart = () => {
    setCoverVisible(false);
  };

  return (
    <AnimatePresence mode="wait">
      {isCoverVisible ? (
        <motion.div
          key="cover"
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <CoverScreen
            onStart={handleStart}
            heading={heading}
            description={description}
            details={details}
            workflowSVG={workflowSVG}
            coverImage={coverImage}
          />
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// API logic from mcqGenerator.js, converted to TypeScript
const API_BASE_URL = 'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook';

const handleRequest = async (endpoint: string, formData: FormData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/${endpoint}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error(`Error triggering workflow for ${endpoint}:`, error);
        throw error;
    }
};

const uploadFileAndGetMCQs = (topic: string, file?: File) => {
    const formData = new FormData();
    formData.append('topic', topic);
    if (file) {
        formData.append('file', file);
    }
    return handleRequest('upload-file', formData);
};

const getWebMCQs = (topic: string) => {
    const formData = new FormData();
    formData.append('topic', topic);
    return handleRequest('web-mcq', formData);
};

const startQuiz = (topic: string) => {
    const formData = new FormData();
    formData.append('topic', topic);
    return handleRequest('start-quiz', formData);
};

const submitAnswer = (id: string, user_answer: string) => {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('user_answer', user_answer);
    return handleRequest('submit-answer', formData);
};

const getTopics = async (): Promise<{ topic: string }[]> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/topics`);
        return response.data;
    } catch (error) {
        console.error('Error fetching topics:', error);
        throw error;
    }
};

// Sub-components for different functionalities
const MCQGenerator = ({ topics }: { topics: string[] }) => {
    const [topic, setTopic] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [mcqs, setMcqs] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [mode, setMode] = useState<'file' | 'web'>('file'); // 'file' or 'web'

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.files?.[0] || null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!topic) {
            setError('Topic is required.');
            return;
        }
        if (mode === 'file' && !file) {
            // Making file optional as per user request
        }

        setLoading(true);
        setError(null);
        setMcqs([]);

        try {
            let result;
            if (mode === 'file') {
                result = await uploadFileAndGetMCQs(topic, file || undefined);
            } else {
                result = await getWebMCQs(topic);
            }
            setMcqs(result);
        } catch (err) {
            setError('Failed to generate MCQs. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-50 shadow-md max-w-4xl mx-auto mt-8 rounded-2xl p-8">
            {/* Mode Selection */}
            <div className="flex justify-center mb-6 gap-2">
                <button
                    type="button"
                    onClick={() => setMode('file')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        mode === 'file' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                    File Upload Mode
                </button>
                <button
                    type="button"
                    onClick={() => setMode('web')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        mode === 'web' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                    Web Topic Mode
                </button>
            </div>
            <form onSubmit={handleSubmit} className="w-full flex flex-col md:flex-row items-end gap-4 mb-8">
                <div className="flex flex-col w-full md:w-2/3">
                    <label className="block text-sm font-medium mb-1 text-black">Topic</label>
                    {mode === 'web' ? (
                        <select value={topic} onChange={(e) => setTopic(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400">
                            <option value="">Select a Topic</option>
                            {topics.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                    ) : (
                        <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Enter Topic" className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400" />
                    )}
                </div>
                {mode === 'file' && (
                    <div className="flex flex-col w-full md:w-1/3">
                        <label className="block text-sm font-medium mb-1 text-black">Upload File</label>
                        <input type="file" onChange={handleFileChange} className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400" />
                    </div>
                )}
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full md:w-[160px] h-[42px] ${BUTTON_CLASSES.PRIMARY}`}
                >
                    {loading ? 'Generating...' : 'Generate MCQs'}
                </button>
            </form>
            {error && <div className="mt-4 text-red-600 text-center font-medium">{error}</div>}
            <div className="mt-6 space-y-4">
                {mcqs.map((mcq, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-2xl mb-4">
                        <p className="font-bold text-black">{index + 1}. {mcq.scrapedQuestion?.question || mcq.question}</p>
                        <div className="mt-2 space-y-1">
                            {(mcq.scrapedQuestion?.options || mcq.options)?.map((opt: string | { option: string }, i: number) => (
                                <div key={i} className="text-sm text-black">{typeof opt === 'string' ? opt : opt.option}</div>
                            ))}
                        </div>
                        {mcq.answer && <p className="text-sm mt-2 text-green-600"><b>Answer:</b> {mcq.answer}</p>}
                        {mcq.explanation && <p className="text-sm mt-1 text-gray-600"><b>Explanation:</b> {mcq.explanation}</p>}
                        {mcq.tag && <p className="text-sm mt-2"><span className="font-semibold">Tag:</span> <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">{mcq.tag}</span></p>}
                    </div>
                ))}
            </div>
            {!mcqs.length && !loading && (
                <p className="text-center text-gray-700">No MCQs to display.</p>
            )}
        </div>
    );
};

const RevisionTrainer = ({ topics }: { topics: string[] }) => {
    const [topic, setTopic] = useState('');
    const [questions, setQuestions] = useState<any[]>([]);
    const [answers, setAnswers] = useState<{ [key: string]: string }>({});
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [quizInProgress, setQuizInProgress] = useState(false);

    const handleStartQuiz = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!topic) {
            setError('Topic is required to start the quiz.');
            return;
        }
        setLoading(true);
        setError(null);
        setQuestions([]);
        setAnswers({});
        setResults([]);
        try {
            const quizQuestions = await startQuiz(topic);
            setQuestions(quizQuestions);
            setQuizInProgress(true);
        } catch (err) {
            setError('Failed to fetch quiz questions.');
        } finally {
            setLoading(false);
        }
    };
    
    const handleAnswerChange = (questionId: string, answer: string) => {
        setAnswers(prev => ({ ...prev, [questionId]: answer }));
    };

    const handleSubmitQuiz = async () => {
        setLoading(true);
        setError(null);
        try {
            const submittedResults = await Promise.all(
                Object.entries(answers).map(([questionId, userAnswer]) => 
                    submitAnswer(questionId, userAnswer)
                )
            );
            setResults(submittedResults);
            setQuizInProgress(false);
        } catch (err) {
            setError('Failed to submit answers.');
        } finally {
            setLoading(false);
        }
    };

    if (!quizInProgress) {
        return (
            <div>
                <form onSubmit={handleStartQuiz} className="space-y-4">
                    <select value={topic} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTopic(e.target.value)} className="w-full p-2 border rounded">
                        <option value="">Select a Topic for the Quiz</option>
                        {topics.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={loading || !topic} className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 disabled:bg-gray-400">
                        {loading ? 'Starting...' : 'Start Quiz'}
                    </motion.button>
                </form>
                {error && <div className="text-red-500 mt-4">{error}</div>}
                {results.length > 0 && (
                    <div className="mt-6 space-y-4">
                        <h3 className="text-xl font-bold">Quiz Results</h3>
                        {results.map((result, index) => (
                             <div key={index} className={`p-4 rounded-lg shadow border ${result.is_correct ? 'border-green-500' : 'border-red-500'}`}>
                                <p><b>Your answer:</b> {result.user_answer}</p>
                                <p><b>Correctness:</b> {result.is_correct ? 'Correct' : 'Incorrect'}</p>
                                <p><b>Explanation:</b> {result.explanation}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    return (
        <div>
            <h3 className="text-xl font-bold mb-4">Quiz on {topic}</h3>
            <div className="space-y-6">
                {questions.map((q, index) => (
                    <div key={q.id}>
                        <p className="font-semibold">{index + 1}. {q.question}</p>
                        <div className="mt-2 space-y-2">
                            {Object.entries(q.options as Record<string, string>).map(([key, value], i) => (
                                <label key={i} className="flex items-center space-x-2">
                                    <input type="radio" name={`question-${q.id}`} value={key} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAnswerChange(q.id, e.target.value)} className="form-radio" />
                                    <span>{key}. {String(value)}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <motion.button onClick={handleSubmitQuiz} disabled={loading} className="mt-6 w-full bg-purple-500 text-white p-2 rounded hover:bg-purple-600 disabled:bg-purple-300">
                {loading ? 'Submitting...' : 'Submit Quiz'}
            </motion.button>
        </div>
    );
};

const MCQGeneratorPageContent = () => {
    const [activeTab, setActiveTab] = useState<'generator' | 'trainer'>('generator');
    const [topics, setTopics] = useState<string[]>([]);

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const fetchedTopics = await getTopics();
                // Filter out empty or "Unknown Topic" and get unique topics
                const uniqueTopics = [...new Set(
                    fetchedTopics
                        .map(t => t.topic)
                        .filter(t => t && t.toLowerCase() !== 'unknown topic')
                )];
                setTopics(uniqueTopics as string[]);
            } catch (error) {
                console.error("Could not fetch topics", error);
            }
        };
        fetchTopics();
    }, []);

    return (
        <div className="w-full max-w-2xl mx-auto mt-8 bg-gray-50 shadow-md rounded-2xl p-8"> {/* Card wrapper */}
            <div className="flex justify-center border-b mb-6">
                <button
                    onClick={() => setActiveTab('generator')}
                    style={{ fontFamily: 'poppins', fontSize: 18.75 }}
                    className={`flex items-center space-x-2 px-6 py-3 font-semibold ${activeTab === 'generator' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                >
                    <FaBook /><span>Generate MCQs</span>
                </button>
                <button
                    onClick={() => setActiveTab('trainer')}
                    style={{ fontFamily: 'poppins', fontSize: 18.75 }}
                    className={`flex items-center space-x-2 px-6 py-3 font-semibold ${activeTab === 'trainer' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                >
                    <FaBrain /><span>Revision Trainer</span>
                </button>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {activeTab === 'generator' && <MCQGenerator topics={topics} />}
                    {activeTab === 'trainer' && <RevisionTrainer topics={topics} />}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

const MCQGeneratorPage = () => {
    return (
        <PageRevealWrapper
            heading="Smart Study Assistant: MCQ Generator & Revision Trainer"
            description="Transform textbooks and topics into exam-ready questions—automatically and intelligently. This AI-powered Study Assistant ingests uploaded PDFs or user-specified topics, understands the content using LLMs and vector search, and outputs structured MCQs with correct answers, explanations, and predicted future questions. Built for students, educators, and edtech platforms, this system reduces manual effort in quiz creation, improves retention through revision modes, and adapts to curriculum changes dynamically. It's not just a generator—it's your always-on learning coach."
            details={
                <div className="space-y-6">
                    <div>
                        <h2 className="font-semibold text-blue-700 mb-2">Features</h2>
                        <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                            <li>Multi-source Input: Accepts both uploaded files and typed topics via webhooks.</li>
                            <li>LLM-Powered Understanding: Uses Pinecone + Cohere/Groq/OpenRouter to extract deep context.</li>
                            <li>Auto MCQ Generation: Outputs 5 semantically correct, non-duplicate questions per topic.</li>
                            <li>Web Scraping Integration: Finds past questions from Byjus, Unacademy, Quora using SerpAPI.</li>
                            <li>PostgreSQL Storage: Saves and fetches all question data for later tracking and filtering.</li>
                            <li>PDF + Email Reporting: Converts results into downloadable PDFs and sends via Gmail.</li>
                            <li>Quiz Mode & Feedback Loop: Tracks quiz attempts, checks correctness, and stores analytics.</li>
                            <li>Future Prediction Engine: Suggests 3 likely questions for upcoming exams using trend analysis.</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="font-semibold text-purple-700 mb-2">Example Use Cases</h2>
                        <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                            <li>EdTech Platforms: Auto-generate quizzes and revision material from course PDFs or live web content.</li>
                            <li>Teachers & Trainers: Instantly convert syllabus topics into ready-to-use question sets.</li>
                            <li>Students: Self-quiz on specific chapters with instant feedback and future prediction questions.</li>
                            <li>Academic Publishers: Enhance eBooks with interactive MCQ layers and smart assessments.</li>
                            <li>Coaching Centers: Automate generation of practice sets and track student performance.</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="font-semibold text-blue-700 mb-2">⚡ Why This Stands Out</h2>
                        <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                            <li>Multi-source Input: Accepts both uploaded files and typed topics via webhooks.</li>
                            <li>LLM-Powered Understanding: Uses Pinecone + Cohere/Groq/OpenRouter to extract deep context.</li>
                            <li>Auto MCQ Generation: Outputs 5 semantically correct, non-duplicate questions per topic.</li>
                            <li>Web Scraping Integration: Finds past questions from Byjus, Unacademy, Quora using SerpAPI.</li>
                            <li>PostgreSQL Storage: Saves and fetches all question data for later tracking and filtering.</li>
                            <li>PDF + Email Reporting: Converts results into downloadable PDFs and sends via Gmail.</li>
                            <li>Quiz Mode & Feedback Loop: Tracks quiz attempts, checks correctness, and stores analytics.</li>
                            <li>Future Prediction Engine: Suggests 3 likely questions for upcoming exams using trend analysis.</li>
                        </ul>
                    </div>
                </div>
            }
            coverImage="https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=800&q=80"
        >
            <MCQGeneratorPageContent />
        </PageRevealWrapper>
    );
};

export default MCQGeneratorPage;