import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaChartLine, FaCalendarAlt, FaExclamationTriangle, FaBullseye, FaPercent } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = 'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook';

const handleRequest = async (endpoint: string, formData: FormData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/${endpoint}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error triggering sales forecasting workflow for ${endpoint}:`, error);
    throw error;
  }
};

export const generateSalesForecast = (pipelineFile?: File, historicalFile?: File) => {
  const formData = new FormData();
  if (pipelineFile) {
    formData.append('pipeline', pipelineFile);
  }
  if (historicalFile) {
    formData.append('historical', historicalFile);
  }
  return handleRequest('leads', formData);
};

interface SalesForecastingProps {
  compact?: boolean;
}

const SalesForecasting: React.FC<SalesForecastingProps> = ({ compact = false }) => {
  const navigate = useNavigate();
  const [pipelineFile, setPipelineFile] = useState<File | null>(null);
  const [historicalFile, setHistoricalFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  const handlePipelineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPipelineFile(e.target.files?.[0] || null);
  };
  const handleHistoricalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHistoricalFile(e.target.files?.[0] || null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    if (!pipelineFile || !historicalFile) {
      setError('Please upload both Pipeline and Historical CSV files.');
      return;
    }
    setLoading(true);
    try {
      const response = await generateSalesForecast(pipelineFile, historicalFile);
      setResult(response);
    } catch (err: any) {
      setError(err.message || 'Failed to generate forecast.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 shadow-md max-w-4xl mx-auto mt-8 rounded-2xl p-8">
      <form onSubmit={handleSubmit} className="w-full flex flex-col md:flex-row items-end gap-4 mb-8">
        <div className="flex flex-col w-full md:w-1/2">
          <label className="block text-sm font-medium mb-1 text-black">Pipeline Data (CSV)</label>
          <input type="file" accept=".csv" onChange={handlePipelineChange} className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400" />
        </div>
        <div className="flex flex-col w-full md:w-1/2">
          <label className="block text-sm font-medium mb-1 text-black">Historical Data (CSV)</label>
          <input type="file" accept=".csv" onChange={handleHistoricalChange} className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400" />
        </div>
        <button
          type="submit"
          className="w-full md:w-[160px] h-[42px] text-white font-bold rounded-lg bg-[#FF620A] shadow hover:shadow-md transition-all"
          disabled={loading}
        >
          {loading ? 'Generating Forecast...' : 'Generate Sales Forecast'}
        </button>
      </form>
      {result && (
        <div>
          <h2 className="text-xl font-bold text-black mb-6">Sales Forecast Summary</h2>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-2xl mb-8">
            {/* Render summary, analytics, and top deals as in original, but inside this card */}
            <div className="mb-4">
              <div className="flex items-center mb-4">
                <FaChartLine className="text-blue-500 w-6 h-6 mr-2" />
                <span className="font-poppins text-black">Sales Forecast Summary</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-blue-100 rounded-lg p-4 text-center flex flex-col items-center">
                  <span className="text-black mb-1">Expected Revenue Range</span>
                  <span className="text-blue-900">{result.expectedRevenueRange || '₹9,796 – ₹13,061'}</span>
                </div>
                <div className="bg-red-100 rounded-lg p-4 text-center flex flex-col items-center">
                  <span className="flex items-center text-black mb-1 text-red-700"><FaExclamationTriangle className="mr-1" />Risk of Shortfall</span>
                  <span className="text-red-700">{result.riskOfShortfall || '90%'}</span>
                </div>
                <div className="bg-green-100 rounded-lg p-4 text-center flex flex-col items-center">
                  <span className="flex items-center mb-1 text-green-700"><FaCalendarAlt className="mr-1" />This Week</span>
                  <span className="text-green-700">{result.thisWeek || '₹0'}</span>
                </div>
                <div className="bg-purple-100 rounded-lg p-4 text-center flex flex-col items-center">
                  <span className="flex items-center mb-1 text-purple-700"><FaCalendarAlt className="mr-1" />This Month</span>
                  <span className="text-purple-700">{result.thisMonth || '₹3,658'}</span>
                </div>
                <div className="bg-indigo-100 rounded-lg p-4 text-center flex flex-col items-center">
                  <span className="flex items-center mb-1 text-indigo-700"><FaCalendarAlt className="mr-1" />This Quarter</span>
                  <span className="text-indigo-700">{result.thisQuarter || '₹10,286'}</span>
                </div>
                <div className="bg-gray-100 rounded-lg p-4 text-center flex flex-col items-center">
                  <span className="mb-1">Generated</span>
                  <span className="text-black text-gray-700">{result.generatedAt || '18/7/2025, 11:36:05 am'}</span>
                </div>
              </div>
            </div>
            {/* Top 5 High-Confidence Deals */}
            {result.topDeals && (
              <div className="bg-blue-50 rounded-xl shadow p-6 mb-4">
                <div className="font-poppins text-black mb-4 flex items-center text-blue-700"><FaChartLine className="mr-2" />Top 5 High-Confidence Deals</div>
                {result.topDeals.map((deal: any, idx: number) => (
                  <div key={deal.id || idx} className="flex items-center justify-between p-3 mb-2 bg-blue-100 rounded-lg">
                    <div className="flex items-center">
                      <span className="bg-blue-500 text-white rounded-full w-7 h-7 flex items-center justify-center mr-3">{idx + 1}</span>
                      <div>
                        <span className="text-black">Lead #{deal.leadId}</span>
                        <div className="text-gray-500">Rep: {deal.rep} | Stage: {deal.stage}</div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-green-600">₹{deal.amount}</span>
                      <span className="text-gray-500">Confidence: {deal.confidence}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {/* Forecast Analytics */}
            <div className="bg-purple-50 rounded-xl shadow p-6">
              <div className="font-poppins text-purple-900 mb-2">Forecast Analytics</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-blue-100 rounded-lg p-4 flex flex-col justify-between">
                  <div className="flex items-center mb-2"><FaBullseye className="mr-2 text-blue-700" />
                  <span className="text-black text-blue-900">Forecast vs Target</span></div>
                  <div className="flex items-center justify-between">
                    <span>Forecast:</span>
                    <span className="text-black">₹{result.forecast || '10,885'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Target:</span>
                    <span className="text-black">₹{result.target || '1,10,000'}</span>
                  </div>
                  <div className="w-full rounded-full h-2 mt-2 bg-[#c7d2fe]">
                    <div
                      className={`bg-blue-500 h-2 rounded-full ${result.target && result.forecast ? `w-[${Math.min(100, (result.forecast / result.target) * 100)}%]` : 'w-[9.9%]'}`}
                    />
                  </div>
                  <div className="text-gray-500 mt-1">{result.target && result.forecast ? `${((result.forecast / result.target) * 100).toFixed(1)}% of target` : '9.9% of target'}</div>
                </div>
                <div className="bg-green-100 rounded-lg p-4 flex flex-col justify-between">
                  <div className="flex items-center mb-2"><FaPercent className="mr-2 text-green-700" /><span className="text-green-900">Sales Stage Funnel</span></div>
                  <div>Proposal Sent: <span className="text-black">{result.proposalSent || '1'}</span></div>
                </div>
              </div>
              <div className="bg-purple-100 rounded-lg p-4 mt-4">
                <div className="font-poppins text-purple-900 mb-2">Region & Product Distribution</div>
                <div className="flex flex-wrap gap-2">
                  {(result.regionProductDistributionList || [{ region: 'Unknown', product: 'Unknown', count: 1 }]).map((item: any, idx: number) => (
                    <div key={idx} className="bg-white rounded-lg p-3 min-w-[100px] text-center shadow text-purple-900">
                      <div className="text-black">{item.region}</div>
                      <div className="text-gray-500">{item.product}</div>
                      <div className="text-black">{item.count}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {!result && !loading && (
        <p className="text-center text-gray-700">No forecast data to display.</p>
      )}
      {error && (
        <div className="mt-4 text-red-600 text-center font-medium">{error}</div>
      )}
    </div>
  );
};

export default SalesForecasting; 