import React, { useState, ChangeEvent, FormEvent } from 'react';
// import { motion } from 'framer-motion';
// import { FaEnvelope, FaUser, FaClock, FaCheckCircle } from 'react-icons/fa';
import axios from 'axios';
import { BUTTON_CLASSES } from '../utils/colors';

const API_BASE_URL = 'https://PYX-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook';

const getLeaveBalance = async ({ Subject, snippet, From, Date }: { Subject: string; snippet: string; From: string; Date: string; }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/leaves_Post`, {
      Subject,
      snippet,
      From,
      Date
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    });
    return response.data;
  } catch (error: any) {
    console.error('Error fetching leave balance:', error);
    if (error.response?.status === 404) {
      throw new Error('Leave balance not found for this employee. Please check the email address.');
    } else if (error.response?.status >= 500) {
      throw new Error('Server error. Please try again later.');
    } else {
      throw new Error('Failed to fetch leave balance. Please check your input and try again.');
    }
  }
};

const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const formatDate = (date: Date | string) => new Date(date).toLocaleDateString('en-GB');

interface LeaveBalanceFormData {
  Subject: string;
  snippet: string;
  From: string;
  Date: string;
}

interface LeaveBalanceResult {
  Employee_id: string;
  'Email ': string;
  timestamp: string;
  'Remaining Causal leaves': number | string;
  'Remaining Sick Leaves': number | string;
  'Total leaves used': number | string;
  'Remaining Leaves': number | string;
  [key: string]: any;
}

const LeaveBalanceChatbotPage: React.FC = () => {
  const [formData, setFormData] = useState<LeaveBalanceFormData>({
    Subject: 'Leave Balance Inquiry',
    snippet: '',
    From: '',
    Date: formatDate(new Date())
  });
  const [result, setResult] = useState<LeaveBalanceResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.From.trim()) return setError('Email address is required.');
    if (!validateEmail(formData.From)) return setError('Please enter a valid email address.');
    if (!formData.snippet.trim()) return setError('Please provide a message or inquiry.');

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await getLeaveBalance(formData);
      setResult(response);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch leave balance. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 shadow-md max-w-4xl mx-auto mt-8 rounded-2xl p-8">
      <form onSubmit={handleSubmit} className="w-full flex flex-col md:flex-row md:flex-wrap gap-4 mb-8">
        <div className="flex flex-col w-full md:w-1/2">
          <label className="block mb-2">Employee Email *</label>
          <input type="email" name="From" value={formData.From} onChange={handleInputChange} placeholder="employee@company.com" className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400" required />
        </div>
        <div className="flex flex-col w-full md:w-1/2">
          <label className="block mb-2">Date</label>
          <input type="date" name="Date" value={formData.Date} onChange={handleInputChange} className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400" />
        </div>
        <div className="flex flex-col w-full md:w-1/2">
          <label className="block mb-2">Subject</label>
          <input type="text" name="Subject" value={formData.Subject} onChange={handleInputChange} className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400" />
        </div>
        <div className="flex flex-col w-full md:w-full">
          <label className="block mb-2">Message/Inquiry *</label>
          <textarea name="snippet" value={formData.snippet} onChange={handleInputChange} rows={4} className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400" required></textarea>
        </div>
        <button
          type="submit"
          className={`w-full md:w-[160px] h-[42px] ${BUTTON_CLASSES.PRIMARY}`}
          disabled={loading}
        >
          {loading ? 'Fetching...' : 'Get Leave Balance'}
        </button>
      </form>
      {error && (
        <div className="mt-4 text-red-600 text-center font-medium">{error}</div>
      )}
      {result && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-2xl mb-8">
          <h3 className="text-xl font-bold mb-4 text-center">Leave Balance Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <p><b>Employee ID:</b> {result.Employee_id}</p>
              <p><b>Email:</b> {result['Email ']}</p>
              <p><b>Last Updated:</b> {result.timestamp}</p>
            </div>
            <div className="space-y-3">
              <p className="text-green-800 font-semibold">Casual: <span className="text-2xl font-bold text-green-600">{result['Remaining Causal leaves']}</span></p>
              <p className="text-yellow-800 font-semibold">Sick: <span className="text-2xl font-bold text-yellow-600">{result['Remaining Sick Leaves']}</span></p>
              <p className="text-blue-800 font-semibold">Used: <span className="text-2xl font-bold text-blue-600">{result['Total leaves used']}</span></p>
              <p className="text-purple-800 font-semibold">Remaining: <span className="text-2xl font-bold text-purple-600">{result['Remaining Leaves']}</span></p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveBalanceChatbotPage;
