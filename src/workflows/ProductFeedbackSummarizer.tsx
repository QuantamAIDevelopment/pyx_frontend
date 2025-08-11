import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCommentDots,  FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { BUTTON_CLASSES } from '../utils/colors';

const API_URL = 'https://PYX-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/product-feedback-trigger';

interface Product {
  productid: string;
  praises: string[];
  complaints: string[];
  sentimentBreakdown: {
    positive: number;
    neutral: number;
    negative: number;
  };
  keywords?: string[];
  timestamp?: string;
}

interface ProductFeedbackSummarizerProps {
  compact?: boolean;
}

const ProductFeedbackSummarizer: React.FC<ProductFeedbackSummarizerProps> = () => {
  const [date, setDate] = useState("");
  const [productId, setProductId] = useState("");
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState("");
  const [showSummary, setShowSummary] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setShowSummary(false);
    setProducts([]);
    try {
      const payload = [
        {
          "Timestamp (Date)": date,
          "Product ID": productId,
          "Feedback": feedback,
          "Rating": Number(rating),
        },
      ];
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      const data = await response.json();
      // Parse JSON string fields
      const parsedProducts: Product[] = data.map((item: any) => ({
        productid: item.productid,
        praises: typeof item.praises === 'string' ? JSON.parse(item.praises) : item.praises,
        complaints: typeof item.complaints === 'string' ? JSON.parse(item.complaints) : item.complaints,
        sentimentBreakdown: typeof item.sentimentBreakdown === 'string' ? JSON.parse(item.sentimentBreakdown) : item.sentimentBreakdown,
        keywords: item.keywords ? (typeof item.keywords === 'string' ? JSON.parse(item.keywords) : item.keywords) : [],
        timestamp: item.timestamp,
      }));
      setProducts(parsedProducts);
      setShowSummary(true);
      setDate("");
      setProductId("");
      setFeedback("");
      setRating("");
    } catch (err: any) {
      setError(err.message || "Failed to summarize feedback. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 shadow-md max-w-4xl mx-auto mt-8 rounded-2xl p-8">
      <form className="w-full flex flex-col md:flex-row md:flex-wrap gap-4 mb-8" onSubmit={handleSubmit}>
        <div className="flex flex-col w-full md:w-1/3">
          <label className="block text-sm font-medium mb-1 text-black">Timestamp (Date)</label>
          <input
            type="date"
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400"
            value={date}
            onChange={e => setDate(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col w-full md:w-1/3">
          <label className="block text-sm font-medium mb-1 text-black">Product ID</label>
          <input
            type="text"
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400"
            value={productId}
            onChange={e => setProductId(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col w-full md:w-1/3">
          <label className="block text-sm font-medium mb-1 text-black">Rating</label>
          <input
            type="number"
            min="1"
            max="5"
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400"
            value={rating}
            onChange={e => setRating(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col w-full md:w-full">
          <label className="block text-sm font-medium mb-1 text-black">Feedback</label>
          <textarea
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400"
            rows={2}
            value={feedback}
            onChange={e => setFeedback(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className={`w-full md:w-[160px] h-[42px] ${BUTTON_CLASSES.PRIMARY}`}
          disabled={loading}
        >
          {loading ? "Summarizing..." : "Summarize Feedback"}
        </button>
      </form>
      {error && <div className="text-red-600 text-center mb-4 font-medium">{error}</div>}
      {showSummary && products.length > 0 && (
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product, idx) => (
            <motion.div
              key={idx}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-2xl"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <FaCommentDots className="w-6 h-6 text-green-600" />
                <span className="text-lg font-semibold text-gray-800">{product.productid}</span>
              </div>
              <div className="text-gray-700 text-sm mb-2">
                <FaThumbsUp className="inline w-4 h-4 text-green-500 mr-1" />
                {product.praises.length} praises
                <ul className="ml-6 list-disc text-xs text-gray-600 mt-1">
                  {product.praises.map((praise, i) => <li key={i}>{praise}</li>)}
                </ul>
              </div>
              <div className="text-gray-700 text-sm mb-2">
                <FaThumbsDown className="inline w-4 h-4 text-red-500 mr-1" />
                {product.complaints.length} complaints
                <ul className="ml-6 list-disc text-xs text-gray-600 mt-1">
                  {product.complaints.map((complaint, i) => <li key={i}>{complaint}</li>)}
                </ul>
              </div>
              <div className="text-sm text-gray-600 mb-1">Sentiment: <b>{product.sentimentBreakdown.positive}% positive</b></div>
              {product.timestamp && <div className="text-xs text-gray-400">{new Date(product.timestamp).toLocaleString()}</div>}
              {product.keywords && product.keywords.length > 0 && (
                <div className="text-xs text-gray-500 mt-2">Keywords: {product.keywords.join(', ')}</div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductFeedbackSummarizer;
