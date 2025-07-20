import React, { useState, FormEvent, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
// import { FaRobot, FaPaperPlane } from 'react-icons/fa';
 
const API_URL = 'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/dynamic routing agent';
 
const modelLabels: Record<string, string> = {
  'perplexity/sonar': 'Perplexity Sonar (Web Search)',
  'openai/gpt-4o-mini': 'OpenAI GPT-4o Mini',
  'anthropic/claude-3.7-sonnet': 'Anthropic Claude 3.7 Sonnet',
  'meta-llama/llama-3-70b-instruct': 'Meta Llama 3 70B Instruct',
  'google/gemini-2.5-pro-preview': 'Google Gemini 2.5 Pro',
  'qwen/qwen-qwq-32b': 'Qwen QWQ 32B',
  'openai/codex-mini': 'OpenAI Codex Mini',
  'openai/o1-pro': 'OpenAI O1 Pro',
};
 
interface ModelResult {
  model: string | null;
  prompt: string;
  answer: string;
}
 
const DynamicModelSelector: React.FC = () => {
  const [question, setQuestion] = useState<string>('');
  const [result, setResult] = useState<ModelResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
 
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const formData = new FormData();
      formData.append('question', question);
      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Server error: ' + response.status);
      }
      let text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
        setResult(data);
      } catch {
        setResult({
          model: null,
          prompt: question,
          answer: text
        });
      }
    } catch (err: any) {
      if (err.name === 'TypeError' && err.message.includes('Failed to fetch')) {
        setError('Network error: Unable to reach the server. Please check your connection or try again later.');
      } else {
        setError('Failed to get model selection. ' + (err.message || ''));
      }
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
            placeholder="Ask your question (e.g. What’s the latest news about AI regulation in the EU?)"
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full md:w-[160px] h-[42px] text-white font-bold rounded-lg bg-[#FF620A] shadow hover:shadow-md transition-all"
          disabled={loading}
        >
          {loading ? 'Selecting...' : 'Run Workflow'}
        </button>
      </form>
      {error && <div className="mt-4 text-red-600 text-center font-medium">{error}</div>}
      {result && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-2xl mb-8">
          {result.model && (
            <>
              <div className="font-semibold mb-2 text-gray-700">Model Selection Result:</div>
              <div className="mb-2">
                <span className="font-semibold">Selected Model:</span>{' '}
                <span className="inline-block bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {modelLabels[result.model] || result.model}
                </span>
              </div>
              <div>
                <span className="font-semibold">Prompt Sent:</span>{' '}
                <span className="text-gray-800">{result.prompt}</span>
              </div>
            </>
          )}
          {result.answer && (
            <div className="mt-4">
              <div className="font-semibold mb-2 text-gray-700">AI Response:</div>
              <div className="whitespace-pre-line text-gray-900 text-base bg-gray-50 p-3 rounded border">
                {result.answer}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
 
export default DynamicModelSelector;