import React, { useState } from 'react';
import { uploadOnBoardingODS } from '../../services/workflows/onBoardingQ';
import { motion } from 'framer-motion';
import { FaFileUpload, FaPaperPlane } from 'react-icons/fa';
 
interface OnBoardingQProps {}
 
interface OnBoardingQResult {
  emailBody?: string;
  checklist?: string[] | string;
  [key: string]: any;
}
 
const OnBoardingQ: React.FC<OnBoardingQProps> = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<OnBoardingQResult | null>(null);
 
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
    setError(null);
    setResult(null);
  };
 
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      setError('Please select an ODS file to upload.');
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await uploadOnBoardingODS(file);
      setResult(response);
    } catch (err) {
      setError('Failed to process onboarding file. Please try again.');
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div className="bg-gray-200 rounded-xl shadow-md p-8 w-full max-w-2xl mx-auto font-sans">
      <motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        className="text-[42px] font-bold text-black mb-2 font-sans">
        OnBoarding Q Email Generator
      </motion.h2>
      <p className="mb-4 text-gray-700 text-base font-sans">Upload a client onboarding ODS file to generate a personalized onboarding email and checklist for your client.</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 mb-8 font-sans">
        <input
          type="file"
          accept=".ods"
          onChange={handleFileChange}
          className="p-4 text-[17px] border rounded font-sans bg-white placeholder-gray-500"
        />
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#155DFC] to-[#9810FA] text-white font-semibold py-3 px-6 rounded shadow text-[15.75px] font-sans hover:from-blue-700 hover:to-purple-700 disabled:bg-purple-300"
        >
          <FaFileUpload /> {loading ? 'Generating...' : 'Generate Onboarding Email'}
        </motion.button>
      </form>
      {error && <div className="text-red-500 mb-4 font-semibold font-sans">{error}</div>}
      {result && (
        <div className="mt-8 font-sans">
          <h3 className="text-xl font-bold mb-4 text-gray-800 font-sans">Generated Onboarding Email</h3>
          <div className="bg-gray-50 border rounded-lg p-4 whitespace-pre-line text-gray-900 mb-4 font-sans">
            {result.emailBody ? result.emailBody : typeof result === 'string' ? result : JSON.stringify(result)}
          </div>
          {result.checklist && (
            <div className="bg-blue-50 border rounded-lg p-4 font-sans">
              <h4 className="font-semibold mb-2 text-blue-700 font-sans">Checklist</h4>
              <ul className="list-disc list-inside text-gray-700 font-sans">
                {Array.isArray(result.checklist)
                  ? result.checklist.map((item: string, idx: number) => <li key={idx}>{item}</li>)
                  : <li>{result.checklist}</li>}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
 
export default OnBoardingQ;