import React, { useState, ChangeEvent, FormEvent } from 'react';
import { BUTTON_CLASSES } from '../utils/colors';

const API_URL = 'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/fetch-data';

type InputState = {
  triggeredBy: string;
  message: string;
};

const FetchLeads: React.FC = () => {
  const [input, setInput] = useState<InputState>({
    triggeredBy: '',
    message: ''
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setResult('');
    setError('');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult('');
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input)
      });
      const text = await response.text();
      if (!response.ok) throw new Error(text || 'Failed to fetch leads.');
      setResult(text);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch leads.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 shadow-md max-w-4xl mx-auto mt-8 rounded-2xl p-8">
      <form onSubmit={handleSubmit} className="w-full flex flex-col md:flex-row items-end gap-4 mb-8">
        <div className="flex flex-col w-full md:w-1/2">
          <label className="block text-sm font-medium mb-1 text-black">Triggered By</label>
          <input
            type="text"
            name="triggeredBy"
            value={input.triggeredBy}
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400"
            placeholder="e.g. postman-test"
            required
          />
        </div>
        <div className="flex flex-col w-full md:w-1/2">
          <label className="block text-sm font-medium mb-1 text-black">Message</label>
          <textarea
            name="message"
            value={input.message}
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your message"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full md:w-[160px] h-[42px] ${BUTTON_CLASSES.PRIMARY}`}
        >
          {loading ? "Loading..." : "Run Workflow"}
        </button>
      </form>

      {result && (
        <div>
          <h2 className="text-xl font-bold text-black mb-6">Fetch Leads Result</h2>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-2xl mb-8">
            <div className="text-black text-base whitespace-pre-line">{result}</div>
          </div>
        </div>
      )}

      {!result && !loading && (
        <p className="text-center text-gray-700">No leads data to display.</p>
      )}

      {error && (
        <div className="mt-4 text-red-600 text-center font-medium">{error}</div>
      )}
    </div>
  );
};

export default FetchLeads;