import React, { useState, ChangeEvent, FormEvent } from 'react';
// import { FaFilePdf, FaSpinner } from 'react-icons/fa';
import axios from 'axios';

interface PdfSummaryResult {
  text: string;
  [key: string]: any;
}

const API_BASE_URL = 'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook';

const uploadPdfAndGetSummary = async (file: File, email: string): Promise<{ text: string }[]> => {
  const formData = new FormData();
  formData.append('pdf', file);
  if (email) {
    formData.append('email', email);
  }
  const response = await axios.post(`${API_BASE_URL}/document_upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

const PdfSummarizer: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [email, setEmail] = useState<string>('');
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    setSummary(null);
    setError(null);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a PDF file.');
      return;
    }
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setLoading(true);
    setError(null);
    setSummary(null);
    try {
      const result: PdfSummaryResult[] = await uploadPdfAndGetSummary(file, email);
      setSummary(result[0]?.text || 'No summary found.');
    } catch (err) {
      setError('Failed to summarize PDF. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 shadow-md max-w-4xl mx-auto mt-8 rounded-2xl p-8">
      <form onSubmit={handleSubmit} className="w-full flex flex-col md:flex-row items-end gap-4 mb-8">
        <div className="flex flex-col w-full md:w-1/3">
          <label className="block text-sm font-medium mb-1 text-black">Upload PDF</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div className="flex flex-col w-full md:w-1/3">
          <label className="block text-sm font-medium mb-1 text-black">Email</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email to receive the summary"
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full md:w-[160px] h-[42px] text-white font-bold rounded-lg bg-[#FF620A] shadow hover:shadow-md transition-all"
        >
          {loading ? "Loading..." : "Summarize PDF"}
        </button>
      </form>

      {summary && (
        <div>
          <h2 className="text-xl font-bold text-black mb-6">PDF Summary</h2>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-2xl mb-8">
            <div className="text-black text-base whitespace-pre-line">{summary}</div>
          </div>
        </div>
      )}

      {!summary && !loading && (
        <p className="text-center text-gray-700">No summary to display.</p>
      )}

      {error && (
        <div className="mt-4 text-red-600 text-center font-medium">{error}</div>
      )}
    </div>
  );
};

export default PdfSummarizer;
