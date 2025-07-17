import React, { useEffect, useState } from 'react';
// import PageHeading from '../components/PageHeading.tsx';
 
const SENTIMENT_API_URL = 'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/Sentiment agent';
 
const SentimentAgentPage: React.FC = () => {
  const [report, setReport] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
 
  useEffect(() => {
    const fetchReport = async (): Promise<void> => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(SENTIMENT_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch sentiment report');
        }
        const text = await response.text();
        setReport(text);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, []);
 
  return (
    <div className="min-h-screen bg-white w-full flex items-center justify-center text-[15.75px] font-sans">
      <div className="w-full max-w-2xl mx-auto p-6 bg-gray-100 rounded shadow-md mt-8">
        <h2
          className="font-sans font-extrabold mb-4 text-black text-center"
          style={{ fontFamily: 'ui-sans-serif, sans-serif', fontSize: '42px' }}
        >
          Sentiment Agent Report
        </h2>
        {loading && (
          <div className="text-[#155dfc]">Loading...</div>
        )}
        {error && (
          <div className="text-red-600">{error}</div>
        )}
        {!loading && !error && (
          <pre className="bg-white p-4 rounded text-[15.75px] font-sans overflow-x-auto text-black">
            {report}
          </pre>
        )}
      </div>
    </div>
  );
};
 
export default SentimentAgentPage;
 