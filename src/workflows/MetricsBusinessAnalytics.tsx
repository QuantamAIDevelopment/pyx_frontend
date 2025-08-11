import React, { useState } from 'react';
import { motion } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface MetricsBusinessAnalyticsProps {
  compact?: boolean;
}

const API_URL = 'https://PYX-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/bi-insights';

const triggerMetricsBusinessAnalyticsWorkflow = async (files: File[]): Promise<any> => {
  const formData = new FormData();
  files.forEach(file => {
    formData.append('quarterly', file);
  });

  try {
    const response = await axios.post(API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error triggering metrics business analytics workflow:', error);
    throw error;
  }
};

const MetricsBusinessAnalytics: React.FC<MetricsBusinessAnalyticsProps> = ({ compact = false }) => {
  // const navigate = useNavigate();
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setResult(null);
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleGetSummary = async () => {
    setError(null);
    setResult(null);
    if (files.length !== 5) {
      setError('Please select exactly 5 CSV files.');
      return;
    }
    setLoading(true);
    try {
      const data = await triggerMetricsBusinessAnalyticsWorkflow(files);
      setResult(data);
    } catch (err: any) {
      setError('Failed to get summary. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-gray-50 rounded-2xl shadow-md px-8 py-10 w-full max-w-6xl mx-auto mt-10'>
      <div className={compact ? "flex items-center space-x-2 mb-1" : "flex justify-center items-center space-x-4 mb-2"}></div>

      {/* <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Metrics Business Analytics</h2> */}

      {/* <p className="text-center text-gray-700 text-lg mb-6 max-w-2xl mx-auto">
        Upload quarterly CSVs (orders, inventory, traffic, marketing, customers) to get a professional business summary.
      </p> */}

      <div className="flex flex-col items-center gap-2 mb-8">
        <input
          id="csv-upload"
          type="file"
          multiple
          accept=".csv"
          className="block w-72 p-2 border border-gray-300 rounded-md shadow-sm text-sm"
          onChange={handleFileChange}
          disabled={loading}
        />
        <span className="text-sm text-gray-600">Select all 5 required CSVs at once for best results.</span>
      </div>

      <motion.button
        whileHover={{ scale: 1.05, boxShadow: '0 8px 32px 0 #9810FA33' }}
        whileTap={{ scale: 0.97, boxShadow: '0 4px 16px 0 #9810FA33' }}
        onClick={handleGetSummary}
        className="mx-auto block w-72 py-3 text-white font-semibold rounded-lg shadow-md bg-[#FF620A] transition-all"
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Get Quarterly Summary'}
      </motion.button>

      {error && (
        <div className="mt-4 text-center text-red-600 text-sm font-medium">{error}</div>
      )}

      {result && (
        <div className="mt-8 p-6 bg-white rounded-xl shadow-md overflow-x-auto text-sm text-gray-800">
          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{typeof result === 'object' ? JSON.stringify(result, null, 2) : String(result)}</pre>
        </div>
      )}
    </div>
  );
};

export default MetricsBusinessAnalytics;
