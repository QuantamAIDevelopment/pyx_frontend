import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCommentDots, FaChartBar, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface Product {
  productid: string;
  praises: string[];
  complaints: string[];
  sentimentBreakdown: {
    positive: number;
    neutral: number;
    negative: number;
  };
}

interface DummyStats {
  totalProducts: number;
  averageSentiment: number;
  recent: Product[];
}

const initialDummyStats: DummyStats = {
  totalProducts: 4,
  averageSentiment: 58.5,
  recent: [
    {
      productid: 'ZX100',
      praises: ['Easy to use', 'Sleek design'],
      complaints: ['Short lifespan', 'Breaks easily'],
      sentimentBreakdown: { positive: 50, neutral: 0, negative: 50 }
    },
    {
      productid: 'ZX200',
      praises: ['Good connectivity'],
      complaints: ['Weak battery life'],
      sentimentBreakdown: { positive: 50, neutral: 0, negative: 50 }
    },
    {
      productid: 'ZX300',
      praises: ['Easy to use', 'Great price'],
      complaints: ['Not intuitive'],
      sentimentBreakdown: { positive: 66.67, neutral: 0, negative: 33.33 }
    }
  ],
};

interface Stat {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const getStatList = (dummyStats: DummyStats): Stat[] => [
  { title: 'Products Analyzed', value: dummyStats.totalProducts, icon: FaCommentDots, color: 'bg-green-500' },
  { title: 'Avg Sentiment', value: `${dummyStats.averageSentiment}%`, icon: FaChartBar, color: 'bg-blue-500' },
];

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  compact: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color, compact }) => (
  <motion.div
    className={compact ? "bg-gray-100 border border-gray-200 rounded-xl p-3 shadow-md flex flex-col gap-2 min-w-[120px]" : "bg-gray-100 border border-gray-200 rounded-2xl p-6 shadow-md flex flex-col gap-2 min-w-[160px] w-full max-w-xs mx-auto"}
    whileHover={compact ? { scale: 1.03, boxShadow: '0 2px 8px 0 #61868d22' } : { scale: 1.05, boxShadow: '0 8px 32px 0 #61868d33' }}
    whileTap={{ scale: 0.97 }}
    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
  >
    <div className="flex items-center gap-3 mb-2">
      <div className={compact ? `p-2 rounded-lg ${color}` : `p-3 rounded-lg ${color}`}>
        <Icon className={compact ? "w-5 h-5 text-white" : "w-6 h-6 text-white"} />
      </div>
      <div className={compact ? "font-bold text-base text-anthropic-dark truncate" : "font-bold text-lg text-anthropic-dark truncate"}>{title}</div>
    </div>
    <div className={compact ? "text-lg font-bold text-anthropic-dark" : "text-2xl font-bold text-anthropic-dark"}>{value}</div>
  </motion.div>
);

interface ProductFeedbackSummarizerProps {
  compact?: boolean;
}

const ProductFeedbackSummarizer: React.FC<ProductFeedbackSummarizerProps> = ({ compact = false }) => {
  const navigate = useNavigate();
  const [dummyStats, setDummyStats] = useState<DummyStats>(initialDummyStats);

  const [date, setDate] = useState("");
  const [productId, setProductId] = useState("");
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState("");
  const [showSummary, setShowSummary] = useState(false);

  const extractPraisesAndComplaints = (feedback: string): { praises: string[]; complaints: string[] } => {
    const praiseKeywords = ["good", "great", "easy", "love", "excellent", "amazing", "best"];
    const complaintKeywords = ["bad", "poor", "not", "hate", "difficult", "worst", "problem"];
    const sentences = feedback.split(/[.!?]/).map(s => s.trim()).filter(Boolean);
    const praises: string[] = [];
    const complaints: string[] = [];
    sentences.forEach(sentence => {
      const lower = sentence.toLowerCase();
      if (praiseKeywords.some(k => lower.includes(k))) praises.push(sentence);
      if (complaintKeywords.some(k => lower.includes(k))) complaints.push(sentence);
    });
    return { praises, complaints };
  };

  const getSentimentBreakdown = (rating: string): { positive: number; neutral: number; negative: number } => {
    const r = parseInt(rating, 10);
    if (r >= 4) return { positive: 100, neutral: 0, negative: 0 };
    if (r === 3) return { positive: 0, neutral: 100, negative: 0 };
    return { positive: 0, neutral: 0, negative: 100 };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { praises, complaints } = extractPraisesAndComplaints(feedback);
    const sentimentBreakdown = getSentimentBreakdown(rating);
    const newProduct: Product = {
      productid: productId,
      praises: praises.length ? praises : ["No praises detected"],
      complaints: complaints.length ? complaints : ["No complaints detected"],
      sentimentBreakdown,
    };
    const updatedRecent = [newProduct, ...dummyStats.recent];
    const updatedTotal = dummyStats.totalProducts + 1;
    const avgSentiment =
      updatedRecent.reduce((sum, p) => sum + p.sentimentBreakdown.positive, 0) / updatedRecent.length;
    setDummyStats({
      totalProducts: updatedTotal,
      averageSentiment: Math.round(avgSentiment * 100) / 100,
      recent: updatedRecent,
    });
    setDate("");
    setProductId("");
    setFeedback("");
    setRating("");
    setShowSummary(true);
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
          className="w-full md:w-[160px] h-[42px] text-white font-bold rounded-lg bg-[#FF620A] shadow hover:shadow-md transition-all"
        >
          Summarize Feedback
        </button>
      </form>
      {showSummary && (
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {dummyStats.recent.map((product, idx) => (
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
              </div>
              <div className="text-gray-700 text-sm mb-2">
                <FaThumbsDown className="inline w-4 h-4 text-red-500 mr-1" />
                {product.complaints.length} complaints
              </div>
              <div className="text-sm text-gray-600">Sentiment: <b>{product.sentimentBreakdown.positive}% positive</b></div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductFeedbackSummarizer;
