import React, { useState } from 'react';
import { FaBoxOpen } from 'react-icons/fa';

interface Recommendation {
  product_name: string;
  price: string;
  product_url: string;
}

const dummyStats = {
  recent: [
    {
      product_name: 'Honorable',
      price: '8.78',
      product_url: 'https://businessinsider.com/sociis/natoque/penatibus/et.png',
    },
    {
      product_name: 'TechGadget',
      price: '26.76',
      product_url: 'https://example.com/product/techgadget',
    },
    {
      product_name: 'SmartWidget',
      price: '19.99',
      product_url: 'https://example.com/product/smartwidget',
    },
  ] as Recommendation[],
};

const ProductRecommendation: React.FC = () => {
  const [showResults, setShowResults] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
  };

  return (
    <div className="bg-gray-50 shadow-md max-w-4xl mx-auto mt-8 rounded-2xl p-8">
      <form className="w-full flex flex-col md:flex-row md:flex-wrap gap-4 mb-8" onSubmit={handleSubmit}>
        <div className="flex flex-col w-full md:w-[30%]">
          <label className="block text-sm font-medium mb-1 text-black">Product Name / Query</label>
          <input
            type="text"
            placeholder="e.g. Honorable"
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex flex-col w-full md:w-[30%]">
          <label className="block text-sm font-medium mb-1 text-black">Category</label>
          <input
            type="text"
            placeholder="e.g. Electronics"
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex flex-col w-full md:w-[30%]">
          <label className="block text-sm font-medium mb-1 text-black">Price</label>
          <input
            type="text"
            placeholder="e.g. 26.76"
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          type="submit"
          className="w-full md:w-[160px] h-[42px] text-white font-bold rounded-lg bg-[#FF620A] shadow hover:shadow-md transition-all"
        >
          Get Recommendations
        </button>
      </form>
      {showResults && (
        <div>
          <h2 className="text-xl font-bold text-black mb-6">Product Recommendations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {dummyStats.recent.map((rec, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-2xl flex flex-col gap-2 min-w-[160px] w-full max-w-xs mx-auto"
              >
                <div className="flex items-center gap-3 mb-2">
                  <FaBoxOpen className="w-6 h-6 text-blue-500" />
                  <div className="font-bold text-black truncate">{rec.product_name}</div>
                </div>
                <div className="text-base text-gray-700 truncate">Price: <b>₹{rec.price}</b></div>
                <a href={rec.product_url} target="_blank" rel="noopener noreferrer" className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs hover:underline mt-2">View Product</a>
              </div>
            ))}
          </div>
        </div>
      )}
      {!showResults && (
        <p className="text-center text-gray-700">No recommendations to display.</p>
      )}
    </div>
  );
};

export default ProductRecommendation; 