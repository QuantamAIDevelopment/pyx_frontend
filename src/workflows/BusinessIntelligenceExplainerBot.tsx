import React, { useState, ChangeEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const parseSummary = (summary: string): React.ReactNode => {
  try {
    const parsed = JSON.parse(summary);
    if (typeof parsed === 'object') {
      return Object.entries(parsed).map(([key, value]) => (
        <div key={key} className="text-xs text-gray-700"><b>{key}:</b> {String(value)}</div>
      ));
    }
  } catch {
    // Not JSON, return as string
  }
  return <div className="text-xs text-gray-700">{summary}</div>;
};

interface InsightResult {
  [key: string]: any;
  'Time Stamp'?: string;
  'Summary'?: string;
  'Error'?: string;
  'Suggestion'?: string;
}

// API logic merged from businessIntelligenceBot.js
const API_BASE_URL = 'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook';

const handleRequest = async (endpoint: string, formData: FormData): Promise<any> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/${endpoint}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error triggering workflow for ${endpoint}:`, error);
    throw error;
  }
};

const uploadSalesFileAndGetInsights = (file: File): Promise<any> => {
  const formData = new FormData();
  if (file) {
    formData.append('Sales', file);
  }
  return handleRequest('Sales', formData);
};

const BusinessIntelligenceBOT: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [results, setResults] = useState<InsightResult[]>([]);
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
      setError('Please select a file to upload.');
      return;
    }
    setLoading(true);
    setError(null);
    setResults([]);
    try {
      const response = await uploadSalesFileAndGetInsights(file);
      setResults(response);
    } catch (err) {
      setError('Failed to process file. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 shadow-md max-w-4xl mx-auto mt-8 rounded-2xl p-8">
      {/* <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-black mb-2">Business Intelligence Explainer Bot</h2>
        <p className="text-gray-700 text-base">Upload your sales data file (CSV/Excel) to get instant business insights, error detection, and actionable suggestions powered by AI.</p>
      </div> */}
      <form onSubmit={handleSubmit} className="w-full flex flex-col md:flex-row items-end gap-4 mb-8 justify-center">
        <input
          type="file"
          className="w-full md:w-1/2 border border-gray-300 rounded-md text-base bg-white p-3"
          onChange={handleFileChange}
          required
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="w-full md:w-[160px] h-[42px] text-white font-bold rounded-lg bg-[#FF620A] shadow hover:shadow-md transition-all"
          disabled={loading}
        >
          {loading ? "Loading..." : "Upload & Analyze"}
        </motion.button>
      </form>

      {results.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-black mb-6">Business Insights</h2>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-2xl mb-8">
            <div className="text-black text-base whitespace-pre-line">{parseSummary(results[0]['Summary'] || '')}</div>
            {results[0]['Error'] && <div className="text-sm text-red-600 mt-2"><b>Error:</b> {results[0]['Error']}</div>}
            {results[0]['Suggestion'] && <div className="text-sm text-green-700 mt-2"><b>Suggestion:</b> {results[0]['Suggestion']}</div>}
            <div className="text-xs text-gray-500 mt-2">{results[0]['Time Stamp'] && new Date(results[0]['Time Stamp']).toLocaleString()}</div>
          </div>
        </div>
      )}

      {!results.length && !loading && (
        <p className="text-center text-gray-700">No business insights to display.</p>
      )}

      {error && (
        <div className="mt-4 text-red-600 text-center font-medium">{error}</div>
      )}
    </div>
  );
};

export default BusinessIntelligenceBOT;