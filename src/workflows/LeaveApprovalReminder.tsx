import React, { useState, ChangeEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';
import {  FaBell } from 'react-icons/fa';

const API_URL = 'https://PYX-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/c21ff5b7-64e9-465c-aa20-77a5501a67f3';

const LeaveApprovalRemainder: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      setError('Please upload an XLSX file.');
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const formData = new FormData();
      formData.append('xlsx', file);
      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Failed to process leave approval reminder.');
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError('Failed to process leave approval reminder. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 p-6 rounded-3xl shadow-lg w-full max-w-2xl mt-8 mx-auto">
      {/* <div className="flex items-center justify-center space-x-3 mb-4">
        <h2 className="text-42 font-sans serif font-bold text-black-300 text-center w-full">Leave Approval Reminder</h2>
      </div> */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-black-300 font-poppins font-[18.75px]">Upload XLSX File</span>
          <div className="flex items-center mt-2">
            <input type="file" accept=".xlsx" onChange={handleFileChange} className="border font-poppins p-2 rounded w-full" />
          </div>
        </label>
        <div className="flex justify-center w-full">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className={`
              flex items-center justify-center font-poppins font-bold gap-2 text-white rounded-[8px] mt-4
              h-[31.5px] px-[14px] py-[21px] text-[16.41px] border-0
              shadow-[0_4px_12px_rgba(152,16,250,0.12)]
              ${loading ? 'cursor-not-allowed' : 'cursor-pointer'}
              bg-[#FF620A]
            `}
          >
            {loading ? 'Processing...' : 'Process Leave Reminder'}
          </motion.button>
        </div>
      </form>
      {error && <div className="text-red-500 mt-4">{error}</div>}
      {result && (
        <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-yellow-100">
          <h3 className="text-lg font-bold mb-2 text-yellow-800 flex items-center"><FaBell className="mr-2" />Reminder Details</h3>
          <div className="prose max-w-none">
            <p><b>Candidate Name:</b> {result["Candidate Name"]}</p>
            <p><b>Leave ID:</b> {result["Leave ID"]}</p>
            <p><b>Leave Start Date:</b> {result["Leave Start Date"]}</p>
            <p><b>Reminder Sent Date:</b> {result["Reminder Sent Date"]}</p>
            <p><b>Leave Reason:</b> {result["Leave Reason"]}</p>
            <p><b>Status:</b> {result["STAUS"]}</p>
            <p><b>Timestamp:</b> {result["Timstamp"]}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveApprovalRemainder; 