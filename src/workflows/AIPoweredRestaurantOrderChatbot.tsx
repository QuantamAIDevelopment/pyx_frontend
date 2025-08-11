import React, { useState, ChangeEvent, FormEvent } from 'react';

import axios from 'axios';

const API_URL =
  'https://PYX-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/03855d19-fadb-4ded-8aaa-07566948c44d';

const AIPoweredRestaurantOrderChatbot: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<Array<{ user: string; bot: string }>>([]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) {
      setError('Please enter your order or question.');
      return;
    }
    setLoading(true);
    setError(null);
    setResponse(null);
    try {
      const res = await axios.post(API_URL, input, {
        headers: { 'Content-Type': 'text/plain' }
      });
      setResponse(res.data);
      setHistory((prev) => [...prev, { user: input, bot: res.data }]);
      setInput('');
    } catch (err) {
      setError('Failed to get response from the AI. Please try again.');
      setResponse(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 shadow-md max-w-4xl mx-auto mt-8 rounded-2xl p-8">
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col md:flex-row items-end gap-4 mb-8"
      >
        <div className="flex flex-col w-full md:w-2/3">
          <input
            type="text"
            value={input}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
            placeholder="e.g. 2 butter chicken, 1 naan, table 4"
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400"
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          className="w-full md:w-[160px] h-[42px] text-white font-bold rounded-lg bg-[#FF620A] shadow hover:shadow-md transition-all"
          disabled={loading || !input.trim()}
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </form>
      {error && (
        <div className="mt-4 text-red-600 text-center font-medium">{error}</div>
      )}
      {history.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-2xl mb-8 mt-8">
          <h3 className="text-xl font-bold mb-4 text-center">Conversation</h3>
          <div className="space-y-6">
            {history.map((msg, idx) => (
              <div key={idx}>
                <div className="mb-1 text-sm text-gray-500">You:</div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-2 text-gray-900 whitespace-pre-line">
                  {msg.user}
                </div>
                <div className="mb-1 text-sm text-gray-500">AI:</div>
                <div className="bg-pink-50 border border-pink-200 rounded-lg p-3 text-gray-900 whitespace-pre-line">
                  {msg.bot}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {response && (
        <div className="bg-white border border-green-200 rounded-2xl p-6 shadow-2xl mb-8 mt-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold text-green-700">AI Response</span>
          </div>
          <div className="whitespace-pre-line text-gray-800 text-base">
            {response}
          </div>
        </div>
      )}
    </div>
  );
};

export default AIPoweredRestaurantOrderChatbot;
