import React, {
  useState,
  ChangeEvent,
  FormEvent,
} from 'react';
import {

  FaExclamationCircle,
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { BUTTON_CLASSES } from '../utils/colors';

const API_URL =
  'https://PYX-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/invoice%20summary';

const SmartInvoiceAI: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    } else {
      setFile(null);
    }
    setResult('');
    setError('');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      setError('Please select an invoice file to upload.');
      return;
    }
    setLoading(true);
    setError('');
    setResult('');
    try {
      const formData = new FormData();
      formData.append('invoice', file);
      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData,
      });
      const text = await response.text();
      if (!response.ok) throw new Error(text || 'Failed to process invoice.');
      setResult(text);
    } catch (err: any) {
      setError(err.message || 'Failed to process invoice.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 shadow-md max-w-4xl mx-auto mt-8 rounded-2xl p-8">
      <form onSubmit={handleSubmit} className="w-full flex flex-col md:flex-row items-end gap-4 mb-8">
        <div className="flex flex-col w-full md:w-2/3">
          <label className="block text-sm font-medium mb-1 text-black">Upload Invoice (PDF/Image/Doc):</label>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            onChange={handleFileChange}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400"
            disabled={loading}
          />
        </div>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className={`w-full md:w-[160px] h-[42px] ${BUTTON_CLASSES.PRIMARY}`}
          disabled={loading}
        >
          {loading ? "Loading..." : "Upload & Analyze"}
        </motion.button>
      </form>

      {result && (
        <div>
          <h2 className="text-xl font-bold text-black mb-6">Invoice Result</h2>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-2xl mb-8">
            <div className="text-black text-base whitespace-pre-line">{result}</div>
          </div>
        </div>
      )}

      {!result && !loading && (
        <p className="text-center text-gray-700">No invoice data to display.</p>
      )}

      {error && (
        <div className="mt-4 text-red-600 text-center font-medium flex items-center justify-center">
          <FaExclamationCircle className="mr-2" /> {error}
        </div>
      )}
    </div>
  );
};

export default SmartInvoiceAI;
