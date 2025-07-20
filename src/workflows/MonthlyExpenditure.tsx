import React, { useState, ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRupeeSign, FaFileUpload, FaRobot, FaCheckCircle } from 'react-icons/fa';
import axios from 'axios';

const BASE_URL = 'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook';

// Chat Expenditure (input: text)
const chatExpenditure = async (message: string): Promise<any> => {
  const response = await axios.post(`${BASE_URL}/chat`, message, {
    headers: { 'Content-Type': 'text/plain' },
  });
  return response.data;
};

// Manual Bill Entry (input: Amount, Paid to, Date)
const submitManualBill = async ({ amount, merchant, transaction }: { amount: string; merchant: string; transaction: string; }): Promise<any> => {
  const formData = new FormData();
  formData.append('Amount', amount);
  formData.append('Paid to', merchant);
  formData.append('Date', transaction);
  const response = await axios.post(`${BASE_URL}/bill`, formData);
  return response.data;
};

// Upload Bill File (input: file)
const uploadBillFile = async (file: File): Promise<any> => {
  const formData = new FormData();
  formData.append('', file); // API expects the file as an unnamed form field
  const response = await axios.post(`${BASE_URL}/upload-bill`, formData);
  return response.data;
};

const tabs = [
  { label: 'Manual Bill Entry', icon: FaRupeeSign },
  { label: 'Upload Bill File', icon: FaFileUpload },
  { label: 'Chatbot', icon: FaRobot },
];

const workflowSteps = [
  { icon: FaRupeeSign, label: 'Input', color: 'bg-teal-500' },
  { icon: FaCheckCircle, label: 'Processing', color: 'bg-blue-500' },
  { icon: FaCheckCircle, label: 'Complete', color: 'bg-green-500' },
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
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [response, setResponse] = useState<ResponseType | null>(null);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isExecuting) {
      interval = setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % workflowSteps.length);
      }, 900);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isExecuting]);

  const handleManualChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setManualForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleManualSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsExecuting(true);
    setCurrentStep(0);
    setResponse(null);
    if (!manualForm.amount || !manualForm.merchant || !manualForm.transaction) {
      setError('All fields are required.');
      setIsExecuting(false);
      return;
    }
    try {
      const result = await submitManualBill(manualForm);
      console.log('Manual Bill API result:', result);
      setResponse(result);
    } catch (err) {
      setError('Failed to submit bill. Check the console for more details.');
      setResponse(null);
    } finally {
      setIsExecuting(false);
      setCurrentStep(0);
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
    setCurrentStep(0);
    setResponse(null);
    if (!billFile) {
      setError('Please select a bill file to upload.');
      setIsExecuting(false);
      return;
    }
    try {
      const result = await uploadBillFile(billFile);
      console.log('Upload Bill API result:', result);
      setResponse(result);
    } catch (err) {
      setError('Failed to upload bill file. Check the console for more details.');
      setResponse(null);
    } finally {
      setIsExecuting(false);
      setCurrentStep(0);
    }
  };

  const handleChatSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsExecuting(true);
    setCurrentStep(0);
    setResponse(null);
    if (!chatInput) {
      setError('Please enter a message.');
      setIsExecuting(false);
      return;
    }
    try {
      const result = await chatExpenditure(chatInput);
      console.log('Chat Expenditure API result:', result);
      setResponse(result);
    } catch (err) {
      setError('Failed to chat with expenditure bot. Check the console for more details.');
      setResponse(null);
    } finally {
      setIsExecuting(false);
      setCurrentStep(0);
    }
  };

  return (
    <div className="bg-gray-50 shadow-md max-w-4xl mx-auto mt-8 rounded-2xl p-8">
      <div className="flex gap-2 mb-6 justify-center">
        {tabs.map((tab, idx) => (
          <button
            key={tab.label}
            onClick={() => { setActiveTab(idx); setResponse(null); setError(null); }}
            className={`w-full md:w-[160px] h-[42px] flex items-center justify-center gap-2 rounded-lg font-bold font-poppins text-base transition-colors ${
              activeTab === idx
                ? 'bg-[#FF620A] text-white'
                : 'bg-[#993B06] text-white hover:bg-[#FF620A]'
            }`}
          >
            <tab.icon className="w-5 h-5" /> {tab.label}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        {activeTab === 0 && (
          <motion.form
            key="manual"
            onSubmit={handleManualSubmit}
            className="w-full flex flex-col md:flex-row md:flex-wrap gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="flex flex-col w-full md:w-1/3">
              <label className="block text-sm font-medium mb-1 text-black">Amount (₹)</label>
              <input
                type="number"
                name="amount"
                value={manualForm.amount}
                onChange={handleManualChange}
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400"
                required
                placeholder="Enter amount"
              />
            </div>
            <div className="flex flex-col w-full md:w-1/3">
              <label className="block text-sm font-medium mb-1 text-black">Merchant / Paid To</label>
              <input
                type="text"
                name="merchant"
                value={manualForm.merchant}
                onChange={handleManualChange}
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400"
                required
                placeholder="Enter merchant name"
              />
            </div>
            <div className="flex flex-col w-full md:w-1/3">
              <label className="block text-sm font-medium mb-1 text-black">Transaction Date</label>
              <input
                type="date"
                name="transaction"
                value={manualForm.transaction}
                onChange={handleManualChange}
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400"
                required
                placeholder="dd-mm-yyyy"
              />
            </div>
            <button
              type="submit"
              className="w-full md:w-[160px] h-[42px] text-white font-bold rounded-lg bg-[#FF620A] shadow hover:shadow-md transition-all"
              disabled={isExecuting}
            >
              {isExecuting ? 'Processing...' : 'Submit Bill'}
            </button>
            {error && <div className="mt-4 text-red-600 text-center font-medium w-full">{error}</div>}
          </motion.form>
        )}
        {activeTab === 1 && (
          <motion.form
            key="file"
            onSubmit={handleBillFileSubmit}
            className="w-full flex flex-col md:flex-row md:flex-wrap gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="flex flex-col w-full md:w-2/3">
              <label className="block text-sm font-medium mb-1 text-black">Upload Bill File (Image/PDF)</label>
              <input
                type="file"
                accept="image/*,application/pdf"
                onChange={handleBillFileChange}
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full md:w-[160px] h-[42px] text-white font-bold rounded-lg bg-[#FF620A] shadow hover:shadow-md transition-all"
              disabled={isExecuting}
            >
              {isExecuting ? 'Processing...' : 'Upload Bill'}
            </button>
            {error && <div className="mt-4 text-red-600 text-center font-medium w-full">{error}</div>}
          </motion.form>
        )}
        {activeTab === 2 && (
          <motion.form
            key="chat"
            onSubmit={handleChatSubmit}
            className="w-full flex flex-col md:flex-row md:flex-wrap gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="flex flex-col w-full md:w-2/3">
              <label className="block text-sm font-medium mb-1 text-black">Ask a Question</label>
              <input
                type="text"
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <button
              type="submit"
              className="w-full md:w-[160px] h-[42px] text-white font-bold rounded-lg bg-[#FF620A] shadow hover:shadow-md transition-all"
              disabled={isExecuting}
            >
              {isExecuting ? 'Processing...' : 'Ask'}
            </button>
            {error && <div className="mt-4 text-red-600 text-center font-medium w-full">{error}</div>}
          </motion.form>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isExecuting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-8 bg-white rounded-2xl p-6 shadow-2xl flex flex-col items-center border border-gray-200"
          >
            <h2 className="md:text-2xl font-bold mb-6 text-center">Executing Workflow...</h2>
            <div className="flex flex-wrap justify-center items-center w-full gap-4">
              {workflowSteps.map((step, idx) => (
                <motion.div
                  key={idx}
                  animate={{
                    scale: currentStep === idx ? 1.2 : 0.95,
                    opacity: currentStep === idx ? 1 : 0.5
                  }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center space-y-2"
                >
                  <div className={`p-4 rounded-full shadow-xl border-4 border-gray-200 ${step.color} ${currentStep === idx ? 'ring-4 ring-teal-400' : ''}`}>
                    <step.icon className="w-8 h-8 text-white drop-shadow-lg" />
                  </div>
                  <span className="text-xs md:text-sm text-black font-semibold">{step.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {response && !isExecuting && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="mt-10 bg-white rounded-2xl p-8 shadow-2xl border border-gray-200"
          >
            <h3 className="text-xl font-bold mb-4 text-center">Response</h3>
            <div className="mt-4 p-4 bg-gray-100 rounded text-black">
              {response.output && <div>{response.output}</div>}
              {response.Amount && (
                <div>
                  <div><b>Amount:</b> {response.Amount}</div>
                  <div><b>Paid to:</b> {response['Paid to']}</div>
                  <div><b>Date:</b> {response.Date}</div>
                </div>
              )}
              {!response.output && !response.Amount && (
                <pre className="text-xs text-black bg-gray-200 p-2 rounded mt-2 overflow-x-auto">{JSON.stringify(response, null, 2)}</pre>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MonthlyExpenditure; 