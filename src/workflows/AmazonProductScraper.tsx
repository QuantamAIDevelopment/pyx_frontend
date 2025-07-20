 import React, { useState, FormEvent, ChangeEvent } from 'react';


const API_URL =
  'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/amazon';

interface AmazonWebScrapeProps {
  compact?: boolean;
}

interface ResultData {
  name?: string;
  descrption?: string;
  rating?: string;
  review?: string;
  price?: string;
  [key: string]: string | undefined;
}

const AmazonWebScrape: React.FC<AmazonWebScrapeProps> = () => {
  const [url, setUrl] = useState<string>('');
  const [result, setResult] = useState<ResultData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('url', url);

      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('API error');

      const text = await response.text();
      const data: ResultData = {};

      text.split(/\r?\n/).forEach(line => {
        const [key, ...rest] = line.split(':');
        if (key && rest.length > 0) {
          data[key.trim()] = rest.join(':').trim();
        }
      });

      setResult(data);
    } catch {
      setError('Failed to fetch product details. Please check the URL and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 shadow-md max-w-4xl mx-auto mt-8 rounded-2xl p-8">
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col md:flex-row items-end gap-4 mb-8"
      >
        <div className="flex flex-col w-full md:w-2/3">
          <input
            type="text"
            value={url}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)}
            placeholder="Paste Amazon product/search URL here"
            required
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          type="submit"
          className="w-full md:w-[160px] h-[42px] text-white font-bold rounded-lg bg-[#FF620A] shadow hover:shadow-md transition-all"
          disabled={loading}
        >
          {loading ? 'Scraping...' : 'Scrape Product'}
        </button>
      </form>
      {error && (
        <div className="mt-4 text-red-600 text-center font-medium">{error}</div>
      )}
      {result && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-2xl mb-8">
          <h4 className="text-xl font-bold mb-4 text-center">{result.name || 'No Name Found'}</h4>
          <p className="mb-2"><span className="font-semibold">Description:</span> {result.descrption || 'N/A'}</p>
          <p className="mb-2"><span className="font-semibold">Rating:</span> {result.rating || 'N/A'}</p>
          <p className="mb-2"><span className="font-semibold">Reviews:</span> {result.review || 'N/A'}</p>
          <p className="mb-2"><span className="font-semibold">Price:</span> {result.price || 'N/A'}</p>
        </div>
      )}
    </div>
  );
};

export default AmazonWebScrape;
