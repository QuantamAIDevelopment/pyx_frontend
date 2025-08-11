import React, { useState, ChangeEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { BUTTON_CLASSES } from '../utils/colors';

const API_URL = 'https://PYX-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/candidate-accepted';

const AutomateCandidateAcceptance: React.FC = () => {
  const [form, setForm] = useState<{
    'Candidate ID': string;
    Name: string;
    Email: string;
    STATUS: string;
    'UPDATED DATE': string;
  }>({
    'Candidate ID': '',
    Name: '',
    Email: '',
    STATUS: 'accepted',
    'UPDATED DATE': ''
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
        body: JSON.stringify(form)
      });
      const text = await response.text();
      if (!response.ok) throw new Error(text || 'Failed to process candidate acceptance.');
      setResult(text);
    } catch (err: any) {
      setError(err.message || 'Failed to process candidate acceptance.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 shadow-md max-w-4xl mx-auto mt-8 rounded-2xl p-8">
      <form onSubmit={handleSubmit} className="w-full flex flex-col md:flex-row md:flex-wrap gap-4 mb-8">
        <div className="flex flex-col w-full md:w-[30%]">
          <label className="block text-sm font-medium mb-1 text-black">Candidate ID</label>
          <input
            type="text"
            name="Candidate ID"
            value={form['Candidate ID']}
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400"
            required
            placeholder="Enter Candidate ID"
          />
        </div>
        <div className="flex flex-col w-full md:w-[30%]">
          <label className="block text-sm font-medium mb-1 text-black">Name</label>
          <input
            type="text"
            name="Name"
            value={form.Name}
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400"
            required
            placeholder="Enter Name"
          />
        </div>
        <div className="flex flex-col w-full md:w-[30%]">
          <label className="block text-sm font-medium mb-1 text-black">Email</label>
          <input
            type="email"
            name="Email"
            value={form.Email}
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400"
            required
            placeholder="Enter Email"
          />
        </div>
        <div className="flex flex-col w-full md:w-[30%]">
          <label className="block text-sm font-medium mb-1 text-black">Status</label>
          <input
            type="text"
            name="STATUS"
            value={form.STATUS}
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400"
            required
            placeholder="Enter Status"
          />
        </div>
        <div className="flex flex-col w-full md:w-[30%]">
          <label className="block text-sm font-medium mb-1 text-black">Updated Date</label>
          <input
            type="date"
            name="UPDATED DATE"
            value={form['UPDATED DATE']}
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400"
            required
            placeholder="Select Date"
          />
        </div>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className={`w-full mt-6 md:w-[160px] h-[42px] ${BUTTON_CLASSES.PRIMARY}`}
          disabled={loading}
        >
          {loading ? "Loading..." : "Run Workflow"}
        </motion.button>
      </form>

      {result && (
        <div>
          <h2 className="text-xl font-bold text-black mb-6">Candidate Acceptance Result</h2>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-2xl mb-8">
            <div className="text-black text-base whitespace-pre-line">{result}</div>
          </div>
        </div>
      )}

      {!result && !loading && (
        <p className="text-center text-gray-700">No candidate acceptance data to display.</p>
      )}

      {error && (
        <div className="mt-4 text-red-600 text-center font-medium">{error}</div>
      )}
    </div>
  );
};

export default AutomateCandidateAcceptance;
