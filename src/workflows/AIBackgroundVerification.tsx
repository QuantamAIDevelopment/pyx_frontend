import React, { useState, ChangeEvent, FormEvent } from 'react';

import axios from 'axios';

// --- Merged API logic ---
const API_BASE_URL = 'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook';

const handleRequest = async (endpoint: string, formData: FormData): Promise<any> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/${endpoint}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error triggering workflow for ${endpoint}:`, error);
    throw error;
  }
};

const uploadCandidateFileAndGetBGV = (file: File | null): Promise<any> => {
  const formData = new FormData();
  if (file) {
    formData.append('candidate', file);
  }
  return handleRequest('ai fraud', formData);
};
// --- End merged API logic ---

const riskColors: Record<string, string> = {
  Low: 'text-green-600',
  Medium: 'text-yellow-600',
  High: 'text-red-600',
};

interface Result {
  name: string;
  riskRating: 'Low' | 'Medium' | 'High' | string;
  score: number | string;
  flags?: string[];
  summary: string;
}

interface AIBackroundVerificationCardProps {
  compact?: boolean;
}

const AIBackroundVerificationCard: React.FC<AIBackroundVerificationCardProps> = () => {
  const [file, setFile] = useState<File | null>(null);
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResults([]);
    try {
      const data: Result[] = await uploadCandidateFileAndGetBGV(file);
      setResults(data);
    } catch (err) {
      setError('Failed to process background verification. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 shadow-md max-w-4xl mx-auto mt-8 rounded-2xl p-8">
      <form onSubmit={handleSubmit} className="w-full flex flex-col md:flex-row items-end gap-4 mb-8">
        <div className="flex flex-col w-full md:w-2/3">
          <input
            type="file"
            onChange={handleFileChange}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          type="submit"
          className="w-full md:w-[160px] h-[42px] text-white font-bold rounded-lg bg-[#FF620A] shadow hover:shadow-md transition-all"
          disabled={loading}
        >
          {loading ? 'Verifying...' : 'Run Background Verification'}
        </button>
      </form>
      {error && <div className="mt-4 text-red-600 text-center font-medium">{error}</div>}
      <div className="mt-6">
        {results && results.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-md">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-lg font-bold text-gray-700 border-b">Name</th>
                  <th className="px-6 py-3 text-lg font-bold text-gray-700 border-b">Risk Rating</th>
                  <th className="px-6 py-3 text-lg font-bold text-gray-700 border-b">Score</th>
                  <th className="px-6 py-3 text-lg font-bold text-gray-700 border-b">Flags</th>
                  <th className="px-6 py-3 text-lg font-bold text-gray-700 border-b">Summary</th>
                </tr>
              </thead>
              <tbody>
                {results.map((res, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-base font-semibold text-gray-900 border-b">{res.name}</td>
                    <td className={`px-6 py-4 text-base font-semibold border-b ${riskColors[res.riskRating] || 'text-gray-700'}`}>{res.riskRating} Risk</td>
                    <td className="px-6 py-4 text-base border-b">{res.score}</td>
                    <td className="px-6 py-4 text-base border-b">
                      {res.flags && res.flags.length > 0 ? (
                        <ul className="list-disc list-inside text-red-600">
                          {res.flags.map((flag, i) => (
                            <li key={i}>{flag}</li>
                          ))}
                        </ul>
                      ) : (
                        <span className="text-green-600">No red flags</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-base text-gray-700 border-b">{res.summary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIBackroundVerificationCard; 