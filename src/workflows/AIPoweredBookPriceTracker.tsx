import React, { useState, ChangeEvent, FormEvent } from 'react';
import { FaSearch, FaHistory } from 'react-icons/fa';
import axios from 'axios';
import { BUTTON_CLASSES } from '../utils/colors';
 
// Updated API URL to match working endpoint
const API_URL = 'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/book_price';
 
interface BookPriceResult {
  imageurl: string;
  Title: string;
  Price: string;
  avaliabilty: string;
  producturl: string;
}
 
/**
 * A React component that displays a form to input a message to trigger the book price tracking workflow.
 * The form will post to the API URL with the message, and display the result if the API call is successful.
 * @returns {JSX.Element} The rendered component.
 */
const AIPoweredBookPriceTracker: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'track' | 'history'>('track');
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<BookPriceResult | null>(null);
  const [error, setError] = useState<string>('');
 
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const response = await axios.post(
        API_URL,
        {
          triggeredBy: 'user',
          message: message || 'Hello from UI!'
        },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
      setResult(response.data);
    } catch (err) {
      setError('Failed to fetch book price.');
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div className="max-w-2xl mx-auto p-9 bg-gray-50 rounded-2xl mt-8 shadow-md space-y-8">
      <div className="flex items-center space-x-3 mb-4">
        <h2 className="text-[42px] font-sans text-center font-bold text-black m-0">
          AI-Powered Book Price Tracker
        </h2>
      </div>
      
      <div className="flex justify-center border-b mb-6 gap-2">
        <button
          onClick={() => setActiveTab('track')}
          className={`w-full md:w-[160px] h-[42px] flex items-center justify-center gap-2 rounded-lg font-bold font-poppins text-base transition-colors ${activeTab === 'track' ? 'bg-[#FF620A] text-white' : 'bg-[#993B06] text-white hover:bg-[#FF620A]'}`}
        >
          <FaSearch /> <span>Track Price</span>
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`w-full md:w-[160px] h-[42px] flex items-center justify-center gap-2 rounded-lg font-bold font-poppins text-base transition-colors ${activeTab === 'history' ? 'bg-[#FF620A] text-white' : 'bg-[#993B06] text-white hover:bg-[#FF620A]'}`}
        >
          <FaHistory /> <span>Price History</span>
        </button>
      </div>
      
      {activeTab === 'track' && (
        <div className="bg-gray-50 shadow-md max-w-4xl mx-auto rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="w-full flex flex-col md:flex-row items-end gap-4 mb-8">
            <div className="flex flex-col w-full md:w-2/3">
              <label className="block text-sm font-medium mb-1 text-black">Message (optional):</label>
              <input
                type="text"
                value={message}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
                placeholder="Enter a message to trigger the workflow"
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400"
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              className={`w-full md:w-[160px] h-[42px] ${BUTTON_CLASSES.PRIMARY}`}
              disabled={loading}
            >
              {loading ? 'Fetching...' : 'Track Price'}
            </button>
          </form>
          
          {error && <div className="mt-4 text-red-600 text-center font-medium">{error}</div>}
          
          {result && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-2xl mb-8 flex flex-col md:flex-row items-center gap-6">
              <img
                src={result.imageurl}
                alt={result.Title}
                className="w-24 h-32 object-cover rounded shadow border"
              />
              <div className="flex-1 space-y-2">
                <div className="font-bold text-lg text-black">{result.Title}</div>
                <div className="text-blue-700 font-semibold">{result.Price}</div>
                <div className="text-green-700">{result.avaliabilty}</div>
                <a
                  href={result.producturl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline text-sm"
                >
                  View Product
                </a>
              </div>
            </div>
          )}
        </div>
      )}
      
      {activeTab === 'history' && (
        <div className="bg-gray-50 shadow-md max-w-4xl mx-auto rounded-2xl p-8">
          <div className="flex flex-col items-center justify-center min-h-[200px] text-gray-500">
            <FaHistory className="w-10 h-10 mb-2" />
            <div className="text-lg font-semibold">Price History & Analytics coming soon!</div>
            <div className="text-sm">Track price changes, view trends, and compare books in future updates.</div>
          </div>
        </div>
      )}
    </div>
  );
};
 
export default AIPoweredBookPriceTracker;