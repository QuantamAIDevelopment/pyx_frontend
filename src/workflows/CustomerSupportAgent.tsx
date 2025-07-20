import React, { useState, FormEvent, ChangeEvent } from 'react';


const API_URL = 'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/Customer%20support';

const CustomerSupportAgent: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse('');
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: input,
      });

      if (!res.ok) throw new Error(`Server responded with ${res.status}`);

      const contentType = res.headers.get('Content-Type') || '';
      const text = contentType.includes('application/json')
        ? JSON.stringify(await res.json(), null, 2)
        : await res.text();

      setResponse(text);
    } catch (err: any) {
      setError(err.message || 'Unexpected error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 shadow-md max-w-4xl mx-auto mt-8 rounded-2xl p-8">
      <form onSubmit={handleSubmit} className="w-full flex flex-col md:flex-row items-end gap-4 mb-8">
        <div className="flex flex-col w-full md:w-2/3">
          <textarea
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400 min-h-[80px]"
            placeholder="Enter your name, order ID, and query (e.g. order tracking)"
            value={input}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full md:w-[160px] h-[42px] text-white font-bold rounded-lg bg-[#FF620A] shadow hover:shadow-md transition-all"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Ask Support Agent'}
        </button>
      </form>
      {error && <div className="mt-4 text-red-600 text-center font-medium">{error}</div>}
      {response && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-2xl mb-8 whitespace-pre-wrap text-base text-black">
          {response}
        </div>
      )}
    </div>
  );
};

export default CustomerSupportAgent; 