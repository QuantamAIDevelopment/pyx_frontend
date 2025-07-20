import React, { useState, ChangeEvent, FormEvent } from 'react';
import { FaFileUpload, FaExclamationTriangle } from 'react-icons/fa';
import axios from 'axios';

const RISK_COLORS: Record<string, string> = {
  High: 'bg-red-100 text-red-700 border-red-400',
  Medium: 'bg-yellow-100 text-yellow-700 border-yellow-400',
  Low: 'bg-green-100 text-green-700 border-green-400',
};

type FraudResultRow = {
  'ORDER ID': string;
  'USER ID': string;
  email?: string;
  EMAIL?: string;
  ip?: string;
  IP?: string;
  'ORDER value': number | string;
  finalRiskLevel: 'High' | 'Medium' | 'Low' | string;
  aiRiskScore: number | string;
  triggeredRules: string[];
  aiNotes: string;
};

const API_URL = 'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/fraud3';

const uploadFraudDataAndGetResults = async (file: File): Promise<any> => {
  const formData = new FormData();
  formData.append('fraud data', file);
  const response = await axios.post(API_URL, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

const FraudDetectionSystem: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [results, setResults] = useState<FraudResultRow[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    } else {
      setFile(null);
    }
    setResults([]);
    setError('');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }
    setLoading(true);
    setError('');
    setResults([]);
    try {
      const data = await uploadFraudDataAndGetResults(file);
      setResults(Array.isArray(data) ? (data as FraudResultRow[]) : []);
    } catch (err) {
      setError('Failed to process file. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 shadow-md max-w-4xl mx-auto mt-8 rounded-2xl p-8">
      <form onSubmit={handleSubmit} className="w-full flex flex-col md:flex-row items-end gap-4 mb-8">
        <div className="flex flex-col w-full md:w-2/3">
          <label className="font-semibold text-black mb-2">Upload Transaction Data (CSV/Excel/JSON):</label>
          <input
            type="file"
            accept=".csv,.xlsx,.xls,.json"
            onChange={handleFileChange}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400"
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          className="w-full md:w-[160px] h-[42px] text-white font-bold rounded-lg bg-[#FF620A] shadow hover:shadow-md transition-all"
          disabled={loading || !file}
        >
          {loading ? 'Analyzing...' : 'Upload & Analyze'}
        </button>
      </form>
      {error && (
        <div className="mt-4 text-red-600 text-center font-medium">{error}</div>
      )}
      {results.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-2xl mb-8 mt-8">
          <h3 className="text-xl font-bold mb-4 text-center">Fraud Analysis Results</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border text-base">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-4 py-2">Order ID</th>
                  <th className="border px-4 py-2">User ID</th>
                  <th className="border px-4 py-2">Email</th>
                  <th className="border px-4 py-2">IP</th>
                  <th className="border px-4 py-2">Order Value</th>
                  <th className="border px-4 py-2">Risk Level</th>
                  <th className="border px-4 py-2">AI Risk Score</th>
                  <th className="border px-4 py-2">Triggered Rules</th>
                  <th className="border px-4 py-2">AI Notes</th>
                </tr>
              </thead>
              <tbody>
                {results.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">{row['ORDER ID']}</td>
                    <td className="border px-4 py-2">{row['USER ID']}</td>
                    <td className="border px-4 py-2">{row.email || row['EMAIL']}</td>
                    <td className="border px-4 py-2">{row.ip || row['IP']}</td>
                    <td className="border px-4 py-2">₹{row['ORDER value']}</td>
                    <td className={`border px-4 py-2 font-bold ${RISK_COLORS[row.finalRiskLevel] || ''}`}>{row.finalRiskLevel}</td>
                    <td className="border px-4 py-2">{row.aiRiskScore}</td>
                    <td className="border px-4 py-2">
                      {Array.isArray(row.triggeredRules) && row.triggeredRules.length > 0
                        ? row.triggeredRules.map((rule, i) => <div key={i} className="text-xs">{rule}</div>)
                        : 'None'}
                    </td>
                    <td className="border px-4 py-2 text-xs">{row.aiNotes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default FraudDetectionSystem; 