import React, { useState } from 'react';
import { FaFileAlt, FaClock, FaExclamationCircle, FaCheckCircle } from 'react-icons/fa';

const workflowSteps = [
  {
    label: 'Check Documents',
    icon: <FaFileAlt className="w-8 h-8 text-white" />,
    color: 'bg-blue-500',
  },
  {
    label: 'Check Due Date',
    icon: <FaClock className="w-8 h-8 text-white" />,
    color: 'bg-yellow-400',
  },
  {
    label: 'Process Reminders',
    icon: <FaExclamationCircle className="w-8 h-8 text-white" />,
    color: 'bg-red-400',
  },
  {
    label: 'Send Notifications',
    icon: <FaCheckCircle className="w-8 h-8 text-white" />,
    color: 'bg-green-400',
  },
];

const DocumentUploadReminder: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setStatus(null);
    }
  };

  const handleCheckStatus = () => {
    if (!selectedFile) {
      setStatus('Please upload a document first.');
      return;
    }
    setStatus('Document is valid and uploaded successfully!');
  };

  return (
    <div className="bg-gray-50 shadow-md max-w-4xl mx-auto mt-8 rounded-2xl p-8">
      <form className="w-full flex flex-col md:flex-row items-end gap-4 mb-8">
        <div className="flex flex-col w-full md:w-2/3">
          <label className="block text-sm font-medium mb-1 text-black">Upload Document</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          type="button"
          onClick={handleCheckStatus}
          className="w-full md:w-[160px] h-[42px] text-white font-bold rounded-lg bg-[#FF620A] shadow hover:shadow-md transition-all"
        >
          Check Status
        </button>
      </form>
      {status && (
        <div className="text-blue-600 text-center font-medium mb-4">{status}</div>
      )}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-center text-lg font-semibold text-black mb-6">Workflow Steps</h2>
        <div className="flex flex-wrap gap-8 justify-center">
          {workflowSteps.map((step, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => setActiveStep(idx)}
            >
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center shadow-md transition-transform duration-200 ${step.color} ${activeStep === idx ? 'ring-4 ring-orange-400 scale-110' : ''}`}
              >
                {step.icon}
              </div>
              <p className="text-sm text-black font-medium mt-2 text-center">{step.label}</p>
              {activeStep === idx && (
                <p className="text-xs text-gray-500 mt-1 text-center">Step {idx + 1} is active!</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DocumentUploadReminder;
