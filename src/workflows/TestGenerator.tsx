import React, { useState, FormEvent } from 'react';
// import { motion } from 'framer-motion';
// import { FaVial } from 'react-icons/fa';
import axios from 'axios';
 
interface TestCaseResult {
  'test id': string;
  title: string;
  type: string;
  steps: string[] | string;
  'expected results': string;
}
 
const API_BASE_URL = 'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook';
 
const generateTestCases = async (
  docTitle: string,
  author: string,
  docId: string
): Promise<TestCaseResult> => {
  const formData = new FormData();
  formData.append('doc title', docTitle);
  formData.append('author', author);
  formData.append('doc id', docId);
  const response = await axios.post(`${API_BASE_URL}/doc-input`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
 
const TestGenerator: React.FC = () => {
  const [docTitle, setDocTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [docId, setDocId] = useState<string>('');
  const [result, setResult] = useState<TestCaseResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [apiCalled, setApiCalled] = useState<boolean>(false);
 
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    setApiCalled(false);
 
    try {
      console.log('Calling generateTestCases API with:', docTitle, author, docId);
      const response: TestCaseResult = await generateTestCases(docTitle, author, docId);
 
      setApiCalled(true);
      if (response && response['test id']) {
        setResult(response);
      } else {
        setResult(null);
        setError('No valid test case returned. Please check your input or try again.');
      }
    } catch (err: unknown) {
      setError('Failed to generate test cases. Please check your input and try again.');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div className="bg-gray-50 shadow-md max-w-4xl mx-auto mt-8 rounded-2xl p-8">
      <form onSubmit={handleSubmit} className="w-full flex flex-col md:flex-row md:flex-wrap gap-4 mb-8">
        <div className="flex flex-col w-full md:w-1/3">
          <input
            type="text"
            value={docTitle}
            onChange={e => setDocTitle(e.target.value)}
            placeholder="Document Title"
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div className="flex flex-col w-full md:w-1/3">
          <input
            type="text"
            value={author}
            onChange={e => setAuthor(e.target.value)}
            placeholder="Author"
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div className="flex flex-col w-full md:w-1/3">
          <input
            type="text"
            value={docId}
            onChange={e => setDocId(e.target.value)}
            placeholder="Google Doc ID"
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full md:w-[160px] h-[42px] text-white font-bold rounded-lg bg-[#FF620A] shadow hover:shadow-md transition-all"
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Run Workflow'}
        </button>
      </form>
      {error && <div className="mt-4 text-red-600 text-center font-medium">{error}</div>}
      {apiCalled && !result && !error && (
        <div className="text-gray-500 text-center mt-4">No test case generated. Please check your input or try again.</div>
      )}
      {result && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-2xl mb-8">
          <h4 className="text-xl font-bold mb-4 text-center">Test Case Result</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Test ID</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Title</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Type</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Steps</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Expected Results</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-900 font-medium">{result['test id']}</td>
                  <td className="px-4 py-3 text-gray-900">{result.title}</td>
                  <td className="px-4 py-3 text-gray-900">{result.type}</td>
                  <td className="px-4 py-3 text-gray-900 max-w-xs">
                    {Array.isArray(result.steps) ? (
                      <ol className="list-decimal pl-4 space-y-1">
                        {result.steps.map((step, idx) => (
                          <li key={idx} className="text-sm">{step}</li>
                        ))}
                      </ol>
                    ) : (
                      <span className="text-sm">{result.steps}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-900 max-w-xs">
                    <span className="text-sm">{result['expected results']}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
 
export default TestGenerator;