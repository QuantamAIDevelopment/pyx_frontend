import React, { useState, ChangeEvent, FormEvent } from 'react';
import {  FaExclamationCircle } from 'react-icons/fa';
import { BUTTON_CLASSES } from '../utils/colors';
 
interface ErrorMessageProps {
  error: string;
}
 
function ErrorMessage({ error }: ErrorMessageProps) {
  if (!error) return null;
  return (
    <div className="text-red-500 mt-4 flex items-center">
      <FaExclamationCircle className="mr-2" />{error}
    </div>
  );
}
 
// Updated endpoint to match your cURL command, URL-encoded
const API_URL ='https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/attandance%20anomiles%20-%20Sheet1%20(1).csv';

const AttendanceAnomalies: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [result, setResult] = useState<string>('');
 
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    } else {
      setFile(null);
    }
    setResult('');
    setError('');
  };
 
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult('');
    if (!file) {
      setError('Please upload a CSV file.');
      setLoading(false);
      return;
    }
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/csv',
          'attendace-path': 'application/json',
        },
        body: file,
      });
      const text = await response.text();
      if (!response.ok) throw new Error(text || 'Failed to process attendance anomalies.');
      setResult(text);
    } catch (err: any) {
      setError(err.message || 'Failed to process attendance anomalies.');
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div className="bg-gray-50 shadow-md max-w-4xl mx-auto mt-8 rounded-2xl p-8">
      <form onSubmit={handleSubmit} className="w-full flex flex-col md:flex-row items-end gap-4 mb-8">
        <div className="flex flex-col w-full md:w-2/3">
          <label className="block text-sm font-medium mb-1 text-black">Upload Attendance CSV:</label>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full md:w-[160px] h-[42px] ${BUTTON_CLASSES.PRIMARY}`}
        >
          {loading ? "Loading..." : "Run Workflow"}
        </button>
      </form>

      {result && (
        <div>
          <h2 className="text-xl font-bold text-black mb-6">Attendance Anomalies Result</h2>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-2xl mb-8">
            <div className="text-black text-base whitespace-pre-line">{result}</div>
          </div>
        </div>
      )}

      {!result && !loading && (
        <p className="text-center text-gray-700">No attendance anomalies data to display.</p>
      )}

      <ErrorMessage error={error} />
    </div>
  );
};
 
export default AttendanceAnomalies;
 