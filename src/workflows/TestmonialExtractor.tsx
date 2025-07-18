import React, { useState, ChangeEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { FaFileUpload} from 'react-icons/fa';
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
    <div className="max-w-2xl mx-auto bg-gray-200 rounded-3xl shadow-md p-8 mt-8">
      <div className="flex items-center space-x-3 mb-4">
        <h2 className="text-[42px] font-sans font-bold text-black m-0">
  AI Testimonial Extractor
</h2>
 
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <label
          className="block cursor-pointer"
        >
          <div
            className={`flex flex-col items-center justify-center border-1 border-dashed rounded-lg p-3 transition-colors duration-200 ${file ? 'border-blue-400 bg-blue-50' : 'border-gray-400 bg-white hover:bg-gray-100'}`}
            onClick={() => document.getElementById('testimonial-file-input')?.click()}
            style={{ minHeight: '80px' }}
          >
            <FaFileUpload className="mb-2 text-blue-600" size={36} />
            {file ? (
              <span className="text-base text-gray-700 font-semibold">{file.name}</span>
            ) : (
              <span className="text-lg text-gray-500 font-medium">Drag & drop your feedback file here, or <span className="text-blue-600 underline">click to select</span></span>
            )}
          </div>
          <input
            id="testimonial-file-input"
            type="file"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className={`
              h-[31.5px] min-h-[31.5px]
              px-[14px] py-[21px]
              text-[16.41px] text-white font-bold font-[poppins]
              flex items-center justify-center gap-2
              rounded shadow-[0_2px_8px_rgba(0,0,0,0.12)]
              transition-opacity duration-200 ease-in-out
              ${loading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
            `}
            style={{
              background: 'linear-gradient(90deg, #FF620A 0%, #993B06 100%)',
            }}
          >
            {loading ? 'Selecting...' : 'Run Workflow'}
          </motion.button>
        </div>
      </form>
      {error && <div className="text-red-500 mt-4 text-lg">{error}</div>}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-10 bg-gradient-to-br from-gray-100 to-gray-300 rounded-lg p-8 shadow-md border"
          // fontFamily already set on parent
        >
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
        </motion.div>
      )}
    </div>
  );
};
 
export default TestmonialExtractor;