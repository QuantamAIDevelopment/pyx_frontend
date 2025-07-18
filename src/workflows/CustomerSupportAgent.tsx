import React, { useState, FormEvent, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { FaRobot } from 'react-icons/fa';
 
const API_URL = 'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/Customer support';
 
const CustomerSupportAgent: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
 
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse('');
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: input,
      });
      if (!res.ok) throw new Error('Failed to get response');
      const text = await res.text();
      setResponse(text);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-8">
      <div className="flex items-center space-x-3 mb-4">
        <div className="bg-blue-500 p-3 rounded-lg">
          <FaRobot className="w-6 h-6 text-white" />
        </div>
        <h2
          className="font-bold"
          style={{
            fontSize: '15.75px',
            fontFamily: 'ui-sans-serif, sans-serif',
            color: 'black',
            margin: 0
          }}
        >
          Customer Support Agent
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          className="w-full border rounded p-2 min-h-[80px]"
          placeholder="Enter your name, order ID, and query (e.g. order tracking)"
          value={input}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value)}
          required
          style={{ fontFamily: 'ui-sans-serif, sans-serif', fontSize: '15.75px' }}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          className="w-full text-white py-2 rounded-xl font-bold text-base shadow-lg transition-colors"
          style={{
            background: 'linear-gradient(90deg, rgb(21,93,252) 0%, rgb(152,16,250) 100%)',
            fontFamily: 'ui-sans-serif, sans-serif',
            fontSize: '15.75px'
          }}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Ask Support Agent'}
        </motion.button>
      </form>
      {error && <div className="text-red-500 mt-4">{error}</div>}
      {response && (
        <div className="mt-6 bg-gray-50 rounded-xl shadow-md border border-gray-200 p-6 font-sans whitespace-pre-wrap text-sm">
          {response}
        </div>
      )}
    </div>
  );
};
 
export default CustomerSupportAgent;