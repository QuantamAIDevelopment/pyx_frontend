import React, { useState, ChangeEvent, FormEvent } from 'react';

import axios from 'axios';

const API_URL = 'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/testmonial';

type TestimonialResult = {
  testimonial: string;
  sentiment: string;
  tags: string[];
  product: string;
};

function parseTestmonialResponse(text: string): TestimonialResult {
  // Example response:
  // 🎉 *New Positive Testimonial Received!* 🗣️ "*I absolutely love the way this app works...*" ✅ *Sentiment: Positive 🏷️ *Tags: app functionality,user experience,ease of use 📦 *Product: App X 📝 *
  const testimonialMatch = text.match(/🗣️\s*"\*(.*?)\*"/);
  const sentimentMatch = text.match(/Sentiment:\s*([A-Za-z]+)/);
  const tagsMatch = text.match(/Tags:\s*([\w ,]+)/);
  const productMatch = text.match(/Product:\s*([\w\s]+)/);
  return {
    testimonial: testimonialMatch ? testimonialMatch[1].trim() : '',
    sentiment: sentimentMatch ? sentimentMatch[1].trim() : '',
    tags: tagsMatch ? tagsMatch[1].split(',').map(t => t.trim()) : [],
    product: productMatch ? productMatch[1].trim() : '',
  };
}

const TestmonialExtractor: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<TestimonialResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      setError('Please upload a file.');
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const formData = new FormData();
      formData.append('testmonial', file);
      const response = await axios.post(API_URL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const parsed = parseTestmonialResponse(response.data);
      setResult(parsed);
    } catch (err) {
      setError('Failed to extract testimonial. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 shadow-md max-w-4xl mx-auto mt-8 rounded-2xl p-8">
      <form onSubmit={handleSubmit} className="w-full flex flex-col md:flex-row items-end gap-4 mb-8">
        <div className="flex flex-col w-full md:w-2/3">
          <label className="block text-sm font-medium mb-1 text-black">Upload Feedback File</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400"
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
          <h3 className="text-xl font-bold mb-2 text-blue-700">Extracted Testimonial</h3>
          <blockquote className="italic text-2xl text-gray-800 border-l-4 border-blue-400 pl-4 mb-4">“{result.testimonial}”</blockquote>
          <div className="flex flex-wrap gap-4 mb-2">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-base font-semibold">Sentiment: {result.sentiment}</span>
            {result.product && <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-base font-semibold">Product: {result.product}</span>}
          </div>
          {result.tags.length > 0 && (
            <div className="mt-2">
              <span className="font-semibold text-gray-700">Tags:</span>
              {result.tags.map((tag, i) => (
                <span key={i} className="ml-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-base font-medium">{tag}</span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TestmonialExtractor;
