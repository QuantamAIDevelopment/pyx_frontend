import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';


interface OnBoardingQProps {}

interface OnBoardingQResult {
  emailBody?: string;
  checklist?: string[] | string;
  [key: string]: any;
}

const API_BASE_URL = 'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook';

const uploadOnBoardingODS = (file: File): Promise<any> => {
  const formData = new FormData();
  formData.append('ods', file);
  return axios.post(`${API_BASE_URL}/d4c5fd15-5d71-4a4c-9b84-14e0949a75c5`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }).then(res => res.data);
};

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
  
    <div className="bg-gray-50 round-2xl show-md p-14 w-full mt-8 max-w-3xl mx-auto ">
      <motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} 
        className="text-[42px] font-bold text-black mb-2 font-ui-sans-serif text-center">
        OnBoarding Q Email Generator
      </motion.h2>
      <p className="mb-6 text-black text-center text-[16.41px] font-poppins">Upload a client onboarding ODS file to generate a personalized onboarding email and checklist for your client.</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 mb-8 font-poppins">
        <input
          type="file"
          accept=".ods"
          onChange={handleFileChange}
          className="p-4 text-[16.41px] border rounded font-poppins bg-white placeholder-gray-500"
        />
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          disabled={loading}
           
          
          className="w-[50%] mt-[16%] ml-[25%] h-[31.5px] px-[14px] py-[21px] text-[16.41px] font-bold text-white text-center rounded-lg shadow-[0_4px_12px_rgba(152,16,250,0.12)] bg-gradient-to-r from-[#FF620A] to-[#993B06] transition-all font-poppins flex items-center justify-center"     
       >
           {loading ? 'Generating...' : 'Generate Onboarding Email'}
        </motion.button>
      </form>
      {error && <div className="text-red-500 mb-4 font-semibold font-poppins">{error}</div>}
      {result && (
        <div className="mt-8 font-poppins">
          <h3 className="text-[16.41px] font-bold mb-4 text-gray-800 font-poppins">Generated Onboarding Email</h3>
          <div className="bg-gray-50 border rounded-lg p-4 whitespace-pre-line text-[16.41px] text-gray-900 mb-4 font-poppins">
            {result.emailBody ? result.emailBody : typeof result === 'string' ? result : JSON.stringify(result)}
          </div>
          {result.checklist && (
            <div className="bg-blue-50 border rounded-lg p-4 text-[16.41px] font-poppins">
              <h4 className="font-poppins mb-2 text-blue-700 text-[16.41px]">Checklist</h4>
              <ul className="list-disc list-inside text-gray-700 text-[16.41px] font-poppins">
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