import React, { useState, ChangeEvent, FormEvent } from 'react';
// import { FaEnvelopeOpenText, FaPaperPlane } from 'react-icons/fa';
import axios from 'axios';
 
const API_URL = 'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/incoming-email';
 
interface FormState {
  category: string;
  description: string;
}
 
const GmailCategorization: React.FC = () => {
  const [form, setForm] = useState<FormState>({ category: '', description: '' });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string>('');
 
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
 
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult('');
    try {
      const formData = new FormData();
      formData.append('category', form.category);
      formData.append('description', form.description);
      const response = await axios.post(API_URL, formData);
      setResult(typeof response.data === 'string' ? response.data : JSON.stringify(response.data));
    } catch (err) {
      setError('Failed to categorize email.');
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div className="bg-gray-50 shadow-md max-w-4xl mx-auto mt-8 rounded-2xl p-8">
      <form onSubmit={handleSubmit} className="w-full flex flex-col md:flex-row items-end gap-4 mb-8">
        <div className="flex flex-col w-full md:w-1/2">
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category"
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div className="flex flex-col w-full md:w-1/2">
          <input
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full md:w-[160px] h-[42px] text-white font-bold rounded-lg bg-[#FF620A] shadow hover:shadow-md transition-all"
          disabled={loading}
        >
          {loading ? 'Categorizing...' : 'Categorize Email'}
        </button>
      </form>
      {error && <div className="mt-4 text-red-600 text-center font-medium">{error}</div>}
      {result && (
        <div className="bg-white border border-blue-200 rounded-2xl p-6 shadow-2xl mb-8 whitespace-pre-line text-gray-800">
          {result}
        </div>
      )}
    </div>
  );
};
 
export default GmailCategorization;