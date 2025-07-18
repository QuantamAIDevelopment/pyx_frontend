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
    <div
      className="bg-gray-200 rounded-2xl shadow-md p-10 w-full max-w-2xl mx-auto mt-8"
      style={{ fontFamily: 'Poppins, sans-serif' }}
    >
     <h2 className="text-center mb-6 flex items-center justify-center gap-2 text-[42px] font-sans text-black font-bold">
  Gmail Categorization
</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full p-3 border rounded"
          required
          style={{ fontSize: 18, fontFamily: 'poppins' }}
        />
        <input
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-3 border rounded"
          required
          style={{ fontSize: 18, fontFamily: 'poppins' }}
        />
        <div className="flex justify-center">
 <button
  type="submit"
  disabled={loading}
  className={`h-[31.5px] px-[14px] py-[21px] text-[16.41px] font-medium text-white rounded-[8px] shadow-md flex items-center justify-center transition-opacity duration-200 ${
    loading ? 'opacity-60 cursor-not-allowed' : 'opacity-100 cursor-pointer'
  }`}
  style={{
    background: 'linear-gradient(90deg, #FF620A 0%, #993B06 100%)',
    fontFamily: 'poppins',
    boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
  }}
>
  {loading ? 'Categorizing...' : 'Categorize Email'}
</button>
</div>
 
 
      </form>
      {error && <div className="text-red-500 mt-4">{error}</div>}
      {result && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded whitespace-pre-line text-gray-800">
          {result}
        </div>
      )}
    </div>
  );
};
 
export default GmailCategorization;