import React, { useState, ChangeEvent, FormEvent, MouseEvent } from 'react';
import { FaUserTie, FaExclamationCircle, FaCopy, FaDownload } from 'react-icons/fa';
// import PageRevealWrapper from './PageRevealWrapper';
 
const API_URL = 'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/fetch-data';
 
type ErrorMessageProps = {
  error: string;
};
 
function ErrorMessage({ error }: ErrorMessageProps) {
  if (!error) return null;
  return (
    <div className="text-red-500 mt-4 flex items-center">
      <FaExclamationCircle className="mr-2" />{error}
    </div>
  );
}
 
type ResponseResultProps = {
  result: string;
  showMenu: boolean;
  onContextMenu: (e: MouseEvent<HTMLDivElement>) => void;
  onCopy: () => void;
  onDownload: () => void;
};
 
function ResponseResult({ result, showMenu, onContextMenu, onCopy, onDownload }: ResponseResultProps) {
  if (!result) return null;
  return (
    <div
      className="mt-6 p-4 border rounded-lg shadow-md relative cursor-pointer group"
      style={{ background: '#f3f4f6' }}
      onContextMenu={onContextMenu}
      tabIndex={0}
    >
      <div className="flex items-center mb-2 text-green-700 font-semibold" style={{ fontFamily: 'sans-serif' }}>
        <FaUserTie className="mr-2" /> Fetch Leads Result
      </div>
      <pre className="whitespace-pre-wrap text-gray-800 text-sm" style={{ fontFamily: 'poppins' }}>{result}</pre>
      {showMenu && (
        <div className="absolute right-2 top-2 bg-white border rounded shadow z-10">
          <button onClick={onCopy} className="flex items-center px-4 py-2 hover:bg-gray-100 w-full" style={{ fontFamily: 'sans-serif' }}><FaCopy className="mr-2" />Copy</button>
          <button onClick={onDownload} className="flex items-center px-4 py-2 hover:bg-gray-100 w-full" style={{ fontFamily: 'sans-serif' }}><FaDownload className="mr-2" />Download as TXT</button>
        </div>
      )}
      <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-gray-400" style={{ fontFamily: 'sans-serif' }}>Right-click for options</div>
    </div>
  );
}
 
type InputState = {
  triggeredBy: string;
  message: string;
};
 
const FetchLeads: React.FC = () => {
  const [input, setInput] = useState<InputState>({
    triggeredBy: '',
    message: ''
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [showMenu, setShowMenu] = useState<boolean>(false);
 
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setResult('');
    setError('');
  };
 
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submitting:', input); // Debug log
    setLoading(true);
    setError('');
    setResult('');
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input)
      });
      const text = await response.text();
      console.log('Status:', response.status, 'Response:', text); // Debug log
      if (!response.ok) throw new Error(text || 'Failed to fetch leads.');
      setResult(text);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch leads.');
      console.error('Error:', err); // Debug log
    } finally {
      setLoading(false);
    }
  };
 
  const handleContextMenu = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setShowMenu(true);
    const clickHandler = () => setShowMenu(false);
    document.addEventListener('click', clickHandler, { once: true });
  };
 
  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setShowMenu(false);
  };
 
  const handleDownload = () => {
    const blob = new Blob([result], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'fetch-leads-response.txt';
    a.click();
    URL.revokeObjectURL(url);
    setShowMenu(false);
  };
 
  return (
    <div className="bg-gray-50 shadow-md max-w-4xl mx-auto mt-8 rounded-2xl p-8">
      <form onSubmit={handleSubmit} className="w-full flex flex-col md:flex-row items-end gap-4 mb-8">
        <div className="flex flex-col w-full md:w-1/2">
          <label className="block text-sm font-medium mb-1 text-black">Triggered By</label>
          <input
            type="text"
            name="triggeredBy"
            value={input.triggeredBy}
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400"
            placeholder="e.g. postman-test"
            required
          />
        </div>
        <div className="flex flex-col w-full md:w-1/2">
          <label className="block text-sm font-medium mb-1 text-black">Message</label>
          <textarea
            name="message"
            value={input.message}
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your message"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full md:w-[160px] h-[42px] text-white font-bold rounded-lg bg-[#FF620A] shadow hover:shadow-md transition-all"
        >
          {loading ? "Loading..." : "Run Workflow"}
        </button>
      </form>

      {result && (
        <div>
          <h2 className="text-xl font-bold text-black mb-6">Fetch Leads Result</h2>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-2xl mb-8">
            <div className="text-black text-base whitespace-pre-line">{result}</div>
          </div>
        </div>
      )}

      {!result && !loading && (
        <p className="text-center text-gray-700">No leads data to display.</p>
      )}

      {error && (
        <div className="mt-4 text-red-600 text-center font-medium">{error}</div>
      )}
    </div>
  );
};
 
export default FetchLeads;