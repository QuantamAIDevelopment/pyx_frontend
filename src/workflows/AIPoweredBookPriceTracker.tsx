import React, { useState, ChangeEvent, FormEvent } from 'react';
import { FaSearch, FaHistory } from 'react-icons/fa';
import axios from 'axios';
 
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
/*******  ada00fed-fdb4-4f0f-9e25-85ee072d68ef  *******/const TrackPriceTab: React.FC = () => {
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
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <label className="font-semibold" style={{ fontFamily: 'poppins' }}>Message (optional):</label>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
            placeholder="Enter a message to trigger the workflow"
            className="border p-1 rounded flex-1 placeholder:text-lg placeholder:font-medium"
            style={{ fontSize: 20, fontFamily: 'poppins' }}
            disabled={loading}
          />
  <button
  type="submit"
  disabled={loading}
  className={`
    flex items-center justify-center
    h-[31.5px]
    px-[14px] py-[21px]
    text-[16.41px] font-[poppins] font-medium text-white
    rounded-[8px] shadow-[0_2px_8px_rgba(0,0,0,0.10)]
    transition-opacity duration-200 ease-in-out
    bg-gradient-to-r from-[#FF620A] to-[#993B06]
    ml-auto
    ${loading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
  `}
>
  {loading ? 'Fetching...' : 'Track Price'}
</button>
 
 
        </div>
      </form>
      {error && <div className="text-red-500 mt-4">{error}</div>}
      {result && (
        <div className="mt-6 p-4 rounded-xl bg-gray-50 shadow-md border border-gray-200 font-sans flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
          <img
            src={result.imageurl}
            alt={result.Title}
            className="w-24 h-32 object-cover rounded shadow border"
          />
          <div className="flex-1 space-y-2">
            <div className="font-bold text-lg" style={{ fontFamily: 'sans-serif' }}>{result.Title}</div>
            <div className="text-blue-700 font-semibold" style={{ fontFamily: 'sans-serif' }}>{result.Price}</div>
            <div className="text-green-700" style={{ fontFamily: 'sans-serif' }}>{result.avaliabilty}</div>
            <a
              href={result.producturl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline text-sm"
              style={{ fontFamily: 'sans-serif' }}
            >
              View Product
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
 
const PriceHistoryTab: React.FC = () => {
  // Placeholder for future price history/analytics features
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] text-gray-500">
      <FaHistory className="w-10 h-10 mb-2" />
      <div className="text-lg font-semibold">Price History & Analytics coming soon!</div>
      <div className="text-sm">Track price changes, view trends, and compare books in future updates.</div>
    </div>
  );
};
 
const AIPoweredBookPriceTracker: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'track' | 'history'>('track');
 
  return (
    <div className="max-w-2xl mx-auto p-9 bg-gray-200 rounded-2xl mt-8 shadow-md space-y-8">
      <div className="flex items-center space-x-3 mb-4">
        <h2 className="text-[42px] font-sans text-center font-bold text-black m-0">
  AI-Powered Book Price Tracker
</h2>
 
      </div>
      <div className="flex justify-center border-b mb-6">
        <button
          onClick={() => setActiveTab('track')}
          className={`flex items-center space-x-2 px-6 py-3 font-semibold ${activeTab === 'track' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          style={{ fontFamily: 'poppins', fontSize: 16.75 }}
        >
          <FaSearch /> <span>Track Price</span>
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex items-center space-x-2 px-6 py-3 font-semibold ${activeTab === 'history' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          style={{ fontFamily: 'poppins', fontSize: 16.75 }}
        >
          <FaHistory /> <span>Price History</span>
        </button>
      </div>
      {activeTab === 'track' && <TrackPriceTab />}
      {activeTab === 'history' && <PriceHistoryTab />}
    </div>
  );
};
 
export default AIPoweredBookPriceTracker;