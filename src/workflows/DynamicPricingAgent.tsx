import React, { useState, ChangeEvent, FormEvent } from 'react';

import axios from 'axios';

interface PricingResult {
  "Product Id": string;
  "Product Name": string;
  "Old Price": number;
  "New Price": number;
  "Reason": string;
}

const API_BASE_URL = 'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/Dynamic_Post';

const uploadDynamicPricingCSV = (file: File | null): Promise<any> => {
  const formData = new FormData();
  if (file) {
    formData.append('dynamic', file);
  }
  return axios.post(API_BASE_URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }).then(res => res.data).catch(error => {
    console.error('Error uploading dynamic pricing CSV:', error);
    throw error;
  });
};

const DynamicPricingAgent: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [results, setResults] = useState<PricingResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResults([]);
    try {
      if (!file) {
        setError('Please select a CSV file to upload.');
        setLoading(false);
        return;
      }
      const response: PricingResult[] = await uploadDynamicPricingCSV(file);
      setResults(response);
    } catch (err) {
      setError('Failed to process the file. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 shadow-md max-w-4xl mx-auto mt-8 rounded-2xl p-8">
      <form onSubmit={handleSubmit} className="w-full flex flex-col md:flex-row items-end gap-4 mb-8">
        <div className="flex flex-col w-full md:w-2/3">
          <label className="block text-sm font-medium mb-1 text-black">Upload Product Inventory CSV</label>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400"
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          className="w-full md:w-[160px] h-[42px] text-white font-bold rounded-lg bg-[#FF620A] shadow hover:shadow-md transition-all"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Run Pricing Agent'}
        </button>
      </form>
      {error && (
        <div className="mt-4 text-red-600 text-center font-medium">{error}</div>
      )}
      {results.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-2xl flex flex-col items-center justify-center text-center">
              <div className="text-green-600 text-4xl mb-2">🛒</div>
              <div className="font-semibold text-lg">Products Processed</div>
              <div className="text-2xl font-bold text-black">{results.length}</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-2xl flex flex-col items-center justify-center text-center">
              <div className="text-yellow-500 text-4xl mb-2">📉</div>
              <div className="font-semibold text-lg">Price Reduced</div>
              <div className="text-2xl font-bold text-black">
                {results.filter(row => parseFloat(row["New Price"].toString()) < parseFloat(row["Old Price"].toString())).length}
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-2xl flex flex-col items-center justify-center text-center">
              <div className="text-blue-600 text-4xl mb-2">📈</div>
              <div className="font-semibold text-lg">Price Increased</div>
              <div className="text-2xl font-bold text-black">
                {results.filter(row => parseFloat(row["New Price"].toString()) > parseFloat(row["Old Price"].toString())).length}
              </div>
            </div>
          </div>
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full border border-gray-200 text-black text-base rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 border text-left">Product Id</th>
                  <th className="px-4 py-3 border text-left">Product Name</th>
                  <th className="px-4 py-3 border text-right">Old Price</th>
                  <th className="px-4 py-3 border text-right">New Price</th>
                  <th className="px-4 py-3 border text-left">Reason</th>
                </tr>
              </thead>
              <tbody>
                {results.map((row, idx) => (
                  <tr key={idx} className="hover:bg-blue-50">
                    <td className="px-4 py-2 border">{row["Product Id"]}</td>
                    <td className="px-4 py-2 border">{row["Product Name"]}</td>
                    <td className="px-4 py-2 border text-right">₹{row["Old Price"]}</td>
                    <td className="px-4 py-2 border text-right font-semibold text-green-700">₹{row["New Price"]}</td>
                    <td className="px-4 py-2 border">{row["Reason"]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      {results.length === 0 && !loading && (
        <p className="text-center text-gray-700">No pricing data to display.</p>
      )}
    </div>
  );
};

export default DynamicPricingAgent; 