import React, { useState, ChangeEvent, FormEvent } from 'react'; 
import { motion, AnimatePresence } from 'framer-motion';
import { FaRupeeSign, FaFileUpload, FaRobot } from 'react-icons/fa';
import axios from 'axios';

const BASE_URL = 'https://PYX-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook';

const chatExpenditure = async (message: string): Promise<any> => {
  const response = await axios.post(`${BASE_URL}/chat`, message, {
    headers: { 'Content-Type': 'text/plain' },
  });
  return response.data;
};

const submitManualBill = async ({ amount, merchant, transaction }: { amount: string; merchant: string; transaction: string; }): Promise<any> => {
  const formData = new FormData();
  formData.append('Amount', amount);
  formData.append('Paid to', merchant);
  formData.append('Date', transaction);
  const response = await axios.post(`${BASE_URL}/bill`, formData);
  return response.data;
};

const uploadBillFile = async (file: File): Promise<any> => {
  const formData = new FormData();
  formData.append('', file);
  const response = await axios.post(`${BASE_URL}/upload-bill`, formData);
  return response.data;
};

const tabs = [
  { label: 'Manual Bill Entry', icon: FaRupeeSign },
  { label: 'Upload Bill File', icon: FaFileUpload },
  { label: 'Chatbot', icon: FaRobot },
];

interface ManualForm {
  amount: string;
  merchant: string;
  transaction: string;
}

interface ResponseType {
  output?: string;
  Amount?: string;
  'Paid to'?: string;
  Date?: string;
  [key: string]: any;
}

const MonthlyExpenditure: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [manualForm, setManualForm] = useState<ManualForm>({ amount: '', merchant: '', transaction: '' });
  const [billFile, setBillFile] = useState<File | null>(null);
  const [chatInput, setChatInput] = useState<string>('');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [response, setResponse] = useState<ResponseType | null>(null);
  const [error, setError] = useState<string | null>(null);

  const inputClass = "w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all";
  const buttonClass = "w-full md:w-[180px] mt-6 h-[42px] text-white font-semibold rounded-md bg-[#FF620A] hover:bg-[#e25a09] shadow-lg transition-all";

  const handleManualChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setManualForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleManualSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsExecuting(true);
    setResponse(null);
    if (!manualForm.amount || !manualForm.merchant || !manualForm.transaction) {
      setError('All fields are required.');
      setIsExecuting(false);
      return;
    }
    try {
      const result = await submitManualBill(manualForm);
      setResponse(result);
    } catch (err) {
      setError('Failed to submit bill. Check the console for more details.');
    } finally {
      setIsExecuting(false);
    }
  };

  const handleBillFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBillFile(e.target.files[0]);
    }
  };

  const handleBillFileSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsExecuting(true);
    setResponse(null);
    if (!billFile) {
      setError('Please select a bill file to upload.');
      setIsExecuting(false);
      return;
    }
    try {
      const result = await uploadBillFile(billFile);
      setResponse(result);
    } catch (err) {
      setError('Failed to upload bill file. Check the console for more details.');
    } finally {
      setIsExecuting(false);
    }
  };

  const handleChatSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsExecuting(true);
    setResponse(null);
    if (!chatInput) {
      setError('Please enter a message.');
      setIsExecuting(false);
      return;
    }
    try {
      const result = await chatExpenditure(chatInput);
      setResponse(result);
    } catch (err) {
      setError('Failed to chat with expenditure bot. Check the console for more details.');
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="bg-white shadow-xl max-w-5xl mx-auto mt-10 rounded-3xl p-10 space-y-8 border border-gray-200">
      <div className="flex gap-4 mb-6 justify-center flex-wrap">
        {tabs.map((tab, idx) => (
          <button
            key={tab.label}
            onClick={() => { setActiveTab(idx); setResponse(null); setError(null); }}
            className={`flex items-center gap-2 px-5 py-2 rounded-md font-semibold shadow transition-all text-sm md:text-base ${
              activeTab === idx
                ? 'bg-[#FF620A] text-white ring-2 ring-offset-2 ring-[#FF620A]'
                : 'bg-[#FFF1E7] text-[#FF620A] hover:bg-[#FF620A] hover:text-white'
            }`}
          >
            <tab.icon className="w-5 h-5" />
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 0 && (
          <motion.form key="manual" onSubmit={handleManualSubmit} className="w-full flex flex-col md:flex-row md:flex-wrap gap-4 mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <input type="number" name="amount" value={manualForm.amount} onChange={handleManualChange} className={inputClass} placeholder="Amount (₹)" required />
            <input type="text" name="merchant" value={manualForm.merchant} onChange={handleManualChange} className={inputClass} placeholder="Merchant / Paid To" required />
            <input type="date" name="transaction" value={manualForm.transaction} onChange={handleManualChange} className={inputClass} required />
            <button type="submit" className={buttonClass} disabled={isExecuting}>{isExecuting ? 'Processing...' : 'Submit Bill'}</button>
            {error && <div className="mt-4 text-red-600 text-center font-medium w-full">{error}</div>}
          </motion.form>
        )}

        {activeTab === 1 && (
          <motion.form key="file" onSubmit={handleBillFileSubmit} className="w-full flex flex-col md:flex-row md:flex-wrap gap-4 mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <input type="file" accept="image/*,application/pdf" onChange={handleBillFileChange} className={inputClass} required />
            <button type="submit" className={buttonClass} disabled={isExecuting}>{isExecuting ? 'Processing...' : 'Upload Bill'}</button>
            {error && <div className="mt-4 text-red-600 text-center font-medium w-full">{error}</div>}
          </motion.form>
        )}

        {activeTab === 2 && (
          <motion.form key="chat" onSubmit={handleChatSubmit} className="w-full flex flex-col md:flex-row md:flex-wrap gap-4 mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <input type="text" value={chatInput} onChange={e => setChatInput(e.target.value)} className={inputClass} placeholder="Ask a question..." required />
            <button type="submit" className={buttonClass} disabled={isExecuting}>{isExecuting ? 'Processing...' : 'Ask'}</button>
            {error && <div className="mt-4 text-red-600 text-center font-medium w-full">{error}</div>}
          </motion.form>
        )}
      </AnimatePresence>

      {isExecuting && (
        <div className="flex justify-center items-center gap-2 text-orange-600 font-medium">
          <svg className="animate-spin w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z" />
          </svg>
          Processing...
        </div>
      )}

      {response && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#FFF8F2] border border-orange-200 rounded-xl shadow-md p-6 text-black">
            <h4 className="flex items-center gap-2 font-bold text-lg mb-4 text-orange-600">
              <FaRupeeSign /> Bill Details
            </h4>
            <p><b>Amount:</b> ₹{response.Amount}</p>
            <p><b>Paid to:</b> {response['Paid to']}</p>
            <p><b>Date:</b> {response.Date}</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6 text-black">
            <h4 className="text-lg font-semibold mb-4 text-gray-800">Raw Response</h4>
            <pre className="text-sm text-gray-600">{JSON.stringify(response, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonthlyExpenditure;
