import React, { useEffect, useState } from 'react';

const SENTIMENT_API_URL =
  'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/Sentiment agent';

// PageHeading component with merged styling
interface PageHeadingProps {
  children: React.ReactNode;
}

const PageHeading: React.FC<PageHeadingProps> = ({ children }) => (
  <h2
    className="text-[42px] font-sans font-extrabold mb-4 text-black text-center"
    style={{ fontFamily: 'ui-sans-serif, sans-serif', fontSize: '42px' }}
  >
    {children}
  </h2>
);

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
    <div className="bg-gray-50 shadow-md max-w-4xl mx-auto mt-8 rounded-2xl p-8">
      {/* <h2 className="text-xl font-bold text-black mb-6 text-center">Sentiment Agent Report</h2> */}
      {loading && <div className="text-blue-600 text-center">Loading...</div>}
      {error && <div className="mt-4 text-red-600 text-center font-medium">{error}</div>}
      {!loading && !error && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-2xl mb-8">
          <pre className="text-black text-base whitespace-pre-line">{report}</pre>
        </div>
      )}
    </div>
  );
};

export default SentimentAgentPage;