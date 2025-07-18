import React, { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
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
   
      <div className="bg-gray-200 shadow-md rounded-2xl p-12 w-full max-w-3xl mt-8">
        <div className="space-y-8 w-full">
          <div className="mb-2">
            <h2
              style={{ fontSize: 42, fontFamily: 'sans-serif', color: 'black' }}
              className="font-display text-center font-bold w-full"
            >
              Test Case Generator
            </h2>
          </div>
 
          <p className="text-base font-poppins text-gray-700 mb-4">
            Generate structured test cases from your feature specification document. Enter the document title, author, and Google Doc ID.
          </p>
 
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={docTitle}
              onChange={e => setDocTitle(e.target.value)}
              placeholder="Document Title"
              className="w-full p-4 border rounded text-base"
              style={{ fontFamily: 'poppins', fontSize: 15.75 }}
              required
            />
            <input
              type="text"
              value={author}
              onChange={e => setAuthor(e.target.value)}
              placeholder="Author"
              className="w-full p-4 border rounded text-base"
              style={{ fontFamily: 'poppins', fontSize: 15.75 }}
              required
            />
            <input
              type="text"
              value={docId}
              onChange={e => setDocId(e.target.value)}
              placeholder="Google Doc ID"
              className="w-full p-4 border rounded text-base"
              style={{ fontFamily: 'poppins', fontSize: 15.75 }}
              required
            />
            <div className="flex justify-center">
           <motion.button
  whileHover={{
    scale: 1.05,
    boxShadow: '0 8px 32px 0 #993B0633',
    background: '#993B06', // Override gradient on hover
  }}
  whileTap={{ scale: 0.97 }}
  type="submit"
  disabled={loading}
  className={`h-[31.5px] px-[14px] py-[21px] text-[16.41px] font-medium text-white rounded-[8px] shadow-md flex items-center justify-center transition-opacity duration-200 ${
    loading ? 'opacity-60 cursor-not-allowed' : 'opacity-100 cursor-pointer'
  }`}
  style={{
    background: 'linear-gradient(90deg, #FF620A 0%, #993B06 100%)',
    fontFamily: 'poppins',
    boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
  }}
>
  {loading ? 'Generating...' : 'Run Workflow'}
</motion.button>
</div>
 
          </form>
 
          {error && <div className="text-red-500 mt-4">{error}</div>}
          {apiCalled && !result && !error && (
            <div className="text-gray-500 mt-4">No test case generated. Please check your input or try again.</div>
          )}
 
          {result && (
            <div className="mt-8">
              <h4 className="text-xl font-bold mb-4 text-center">Test Case Result</h4>
              <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
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
            </div>
          )}
        </div>
      </div>
   
  );
};
 
export default TestGenerator;