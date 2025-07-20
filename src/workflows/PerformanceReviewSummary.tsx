import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import {
  FaUserCheck, FaPlus, FaTrash, FaStar, FaChartLine,
  FaBuilding, FaUser, FaClipboardList
} from 'react-icons/fa';

interface PerformanceReviewRow {
  employee_id: string;
  employee_name: string;
  department: string;
  manager_feedback: string;
  peer_feedback: string;
  kpi_score: number;
  review_status: 'completed' | 'pending' | 'cancelled';
  timestamp: string;
}

interface PerformanceReviewSummary {
  employee_id: string;
  employee_name: string;
  department: string;
  summary: string;
  strengths: string[];
  improvements: string[];
  ai_rating: string;
  kpi_score: number;
  applied_rating: string;
  manager_sentiment: string;
  timestamp: string;
}

const defaultRow: PerformanceReviewRow = {
  employee_id: '',
  employee_name: '',
  department: '',
  manager_feedback: '',
  peer_feedback: '',
  kpi_score: 0,
  review_status: 'completed',
  timestamp: ''
};

const API_URL =
  'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/performance-summary';

async function triggerPerformanceReviewSummary(reviewsArray: PerformanceReviewRow[]): Promise<PerformanceReviewSummary[]> {
  try {
    const response = await axios.post(API_URL, { reviews: reviewsArray }, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    console.error('Error triggering performance review summary workflow:', error);
    throw error;
  }
}

const PerformanceReviewSummaryPageContent: React.FC = () => {
  const [rows, setRows] = useState<PerformanceReviewRow[]>([defaultRow]);
  const [results, setResults] = useState<PerformanceReviewSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const handleRowChange = (idx: number, field: keyof PerformanceReviewRow, value: string) => {
    setRows(prev => prev.map((row, i) => i === idx ? { ...row, [field]: value } : row));
  };

  const handleAddRow = () => {
    setRows(prev => [...prev, defaultRow]);
  };

  const handleRemoveRow = (idx: number) => {
    setRows(prev => prev.length === 1 ? prev : prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResults([]);

    for (let row of rows) {
      if (!row.employee_id || !row.employee_name || !row.department || !row.manager_feedback || !row.peer_feedback || !row.kpi_score || !row.timestamp) {
        setError('Please fill all fields in every row.');
        return;
      }
    }

    setLoading(true);
    try {
      let result = await triggerPerformanceReviewSummary(rows);
      result = result.map((emp, idx) => ({
        ...emp,
        kpi_score: rows[idx].kpi_score
      }));
      setResults(result);
    } catch (err) {
      setError('Failed to process performance reviews. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const renderEmployeeSummary = (emp: PerformanceReviewSummary, index: number) => (
    <motion.div
      key={index}
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 font-poppins">
          <FaUser className="text-blue-500" />
          {emp.employee_name} <span className="text-sm text-gray-500">({emp.employee_id})</span>
        </h3>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FaBuilding className="text-gray-400" />
          {emp.department}
        </div>
      </div>
      <div className="text-gray-700">
        <FaClipboardList className="inline mr-1 text-green-500" /> <b>Summary:</b> {emp.summary}
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <h4 className="flex items-center gap-2 font-semibold text-green-800 text-sm"><FaStar className="text-yellow-500" /> Strengths</h4>
          <ul className="mt-2 space-y-1 list-disc list-inside text-green-700 text-sm">
            {emp.strengths?.length ? emp.strengths.map((s, i) => <li key={i}>{s}</li>) : <li>No strengths found</li>}
          </ul>
        </div>
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <h4 className="flex items-center gap-2 font-semibold text-red-800 text-sm"><FaStar className="text-red-500" /> Improvements</h4>
          <ul className="mt-2 space-y-1 list-disc list-inside text-red-700 text-sm">
            {emp.improvements?.length ? emp.improvements.map((s, i) => <li key={i}>{s}</li>) : <li>No improvements found</li>}
          </ul>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-center text-sm">
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
          <div className="text-gray-500">AI Rating</div>
          <div className="text-lg font-bold text-blue-600">{emp.ai_rating ?? '-'}</div>
        </div>
        <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
          <div className="text-gray-500">KPI Score</div>
          <div className="text-lg font-bold text-yellow-600">{emp.kpi_score ?? '-'}</div>
        </div>
        <div className="bg-green-50 p-3 rounded-lg border border-green-200">
          <div className="text-gray-500">Final Rating</div>
          <div className="text-lg font-bold text-green-600">{emp.applied_rating ?? '-'}</div>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
          <div className="text-gray-500">Manager Sentiment</div>
          <div className="text-lg font-bold text-gray-700">{emp.manager_sentiment ?? '-'}</div>
        </div>
      </div>
      <div className="text-xs text-gray-500">{emp.timestamp ? new Date(emp.timestamp).toLocaleString() : ''}</div>
    </motion.div>
  );

  return (
    <div className="bg-gray-50 shadow-md max-w-4xl mx-auto mt-8 rounded-2xl p-8">
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 mb-8 overflow-x-auto">
        <table className="w-full table-auto border-collapse bg-white shadow-sm rounded-md text-sm">
          <thead className="bg-gray-100">
            <tr>
              {['Employee ID', 'Name', 'Department', 'Manager Feedback', 'Peer Feedback', 'KPI Score', 'Timestamp', 'Remove'].map((head, i) => (
                <th key={i} className="px-3 py-2 border text-left">{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={idx} className="border-t">
                {(['employee_id', 'employee_name', 'department', 'manager_feedback', 'peer_feedback', 'kpi_score', 'timestamp'] as (keyof PerformanceReviewRow)[]).map((field, i) => (
                  <td key={i} className="px-2 py-1">
                    <input
                      type={field === 'timestamp' ? 'datetime-local' : field === 'kpi_score' ? 'number' : 'text'}
                      value={row[field] as string | number}
                      onChange={e => handleRowChange(idx, field, e.target.value)}
                      className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400"
                      required
                    />
                  </td>
                ))}
                <td className="text-center">
                  <button type="button" onClick={() => handleRemoveRow(idx)} className="text-red-500 hover:text-red-700">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-4">
          <button
            type="button"
            onClick={handleAddRow}
            className="flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded hover:bg-orange-200 transition"
          >
            <FaPlus /> Add Employee
          </button>
          <button
            type="submit"
            className="w-full md:w-[160px] h-[42px] text-white font-bold rounded-lg bg-[#FF620A] shadow hover:shadow-md transition-all"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Generate Summary'}
          </button>
        </div>
      </form>
      {error && <div className="mt-4 text-red-600 text-center font-medium">{error}</div>}
      <div className="space-y-6">
        {results.map((emp, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-2xl mb-8"
          >
            {renderEmployeeSummary(emp, index)}
          </div>
        ))}
      </div>
    </div>
  );
};

const PerformanceReviewSummaryPage: React.FC = () => (
  <PerformanceReviewSummaryPageContent />
);

export default PerformanceReviewSummaryPage;
