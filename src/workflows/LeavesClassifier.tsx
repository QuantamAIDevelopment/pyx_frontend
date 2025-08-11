import React, { useState } from "react";
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaUserAlt, FaClock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { BUTTON_CLASSES } from '../utils/colors';

const API_URL =
  "https://PYX-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/leaves-classifier";

interface LeaveRecord {
  id: string;
  employeeName: string;
  leaveType: string;
  status: string;
  timestamp: string;
}

interface LeaveSummary {
  casualLeaves: number;
  sickLeaves: number;
  totalEmployees: number;
  activeRequests: number;
  recentActivity: Array<LeaveRecord>;
}

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  compact?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color, compact = false }) => (
  <motion.div
    className={compact ? "bg-white border border-gray-200 rounded-xl p-3 shadow flex flex-col gap-2 min-w-[120px]" : "bg-white border border-gray-200 rounded-2xl p-6 shadow-2xl flex flex-col gap-2 min-w-[160px] w-full max-w-xs mx-auto"}
    whileHover={compact ? { scale: 1.03, boxShadow: '0 2px 8px 0 #61868d22' } : { scale: 1.05, boxShadow: '0 8px 32px 0 #61868d33' }}
    whileTap={{ scale: 0.97 }}
    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
  >
    <div className="flex items-center gap-3 mb-2">
      <div className={compact ? `p-2 rounded-lg ${color}` : `p-3 rounded-lg ${color}`}>
        <Icon className={compact ? "w-5 h-5 text-white" : "w-6 h-6 text-white"} />
      </div>
      <div className={compact ? "font-bold text-base text-black truncate" : "font-bold text-lg text-black truncate"}>{title}</div>
    </div>
    <div className={compact ? "text-lg font-bold text-black" : "text-2xl font-bold text-black"}>{value}</div>
  </motion.div>
);

interface LeavesClassifierProps {
  compact?: boolean;
}

export default function LeavesClassifier({ compact = false }: LeavesClassifierProps) {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [summary, setSummary] = useState<LeaveSummary | null>(null);
  const [error, setError] = useState<string>("");

  const [defaultStats] = useState({
    casualLeaves: 12,
    sickLeaves: 5,
    totalEmployees: 50,
    activeRequests: 3,
  });

  const statList = [
    { title: 'Casual Leaves', value: summary?.casualLeaves || defaultStats.casualLeaves, icon: FaCalendarAlt, color: 'bg-blue-500' },
    { title: 'Sick Leaves', value: summary?.sickLeaves || defaultStats.sickLeaves, icon: FaUserAlt, color: 'bg-red-500' },
    { title: 'Total Employees', value: summary?.totalEmployees || defaultStats.totalEmployees, icon: FaUserAlt, color: 'bg-green-500' },
    { title: 'Active Requests', value: summary?.activeRequests || defaultStats.activeRequests, icon: FaClock, color: 'bg-yellow-500' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSummary(null);

    try {
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify({ start_date: startDate, end_date: endDate }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const leaveRecords: LeaveRecord[] = await response.json();

      if (!Array.isArray(leaveRecords)) {
        throw new Error("Invalid response format from API - expected array");
      }

      const casualLeaves = leaveRecords.filter(r => r.leaveType.toUpperCase().includes('CASUAL')).length;
      const sickLeaves = leaveRecords.filter(r => r.leaveType.toUpperCase().includes('SICK')).length;
      const totalEmployees = new Set(leaveRecords.map(r => r.employeeName)).size;
      const activeRequests = leaveRecords.filter(r => r.status.toUpperCase() === 'PENDING').length;

      setSummary({ casualLeaves, sickLeaves, totalEmployees, activeRequests, recentActivity: leaveRecords });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch leave data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (compact) {
    return (
      <div className="space-y-4 w-full overflow-hidden">
        <h3 className="text-lg font-display text-black font-bold mb-1">Leaves Classifier</h3>
        <div className="flex gap-2 w-full overflow-x-auto">
          {statList.map((stat, idx) => <StatCard key={idx} {...stat} compact={true} />)}
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/leaves-classifier')}
          className="w-full bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 text-white py-2 rounded-lg font-bold text-base shadow hover:from-blue-600 hover:to-purple-600 transition-colors"
        >
          View Details
        </motion.button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 shadow-md max-w-4xl mx-auto mt-8 rounded-2xl p-8">
      <form onSubmit={handleSubmit} className="w-full flex flex-col md:flex-row items-end gap-4 mb-8">
        <div className="flex flex-col w-full md:w-1/3">
          <label className="block text-sm font-medium mb-1 text-black">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex flex-col w-full md:w-1/3">
          <label className="block text-sm font-medium mb-1 text-black">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className={`w-full md:w-[160px] h-[42px] ${BUTTON_CLASSES.PRIMARY}`}
          disabled={loading}
        >
          {loading ? "Loading..." : "Classify"}
        </motion.button>
      </form>

      {summary && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
          <h2 className="text-2xl font-bold text-black mb-6 flex items-center gap-2">
            <FaCalendarAlt className="text-blue-600 w-6 h-6" /> Leave Classification Results
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {statList.map((stat, idx) => (
              <div key={idx} className="bg-gray-50 rounded-xl p-4 flex flex-col gap-2 shadow items-center">
                <div className="flex items-center gap-2 font-bold text-black text-lg mb-2">
                  <stat.icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} /> {stat.title}
                </div>
                <div className="text-2xl font-bold text-black">{stat.value}</div>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
            <h3 className="font-semibold mb-4 text-black text-xl flex items-center gap-2"><FaUserAlt className="text-purple-600 w-5 h-5" /> Recent Activity</h3>
            <div className="grid grid-cols-1 gap-4">
              {summary.recentActivity.map((item, idx) => (
                <motion.div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-50 rounded-lg shadow p-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <div className="flex items-center gap-2 text-black font-medium mb-2 sm:mb-0"><FaUserAlt className="text-blue-500" /> {item.employeeName}</div>
                  <div className="flex items-center gap-2 text-black text-sm mb-2 sm:mb-0"><FaCalendarAlt className="text-green-500" /> {item.leaveType}</div>
                  <div className={`font-semibold flex items-center gap-2 ${item.status === 'APPROVED' ? 'text-green-600' : item.status === 'REJECTED' ? 'text-red-600' : 'text-yellow-600'}`}>
                    <FaClock /> {item.status}
                  </div>
                  <div className="text-sm text-gray-600 flex items-center gap-2"><FaClock className="text-yellow-500" /> {new Date(item.timestamp).toLocaleDateString()}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {!summary && !loading && (
        <p className="text-center text-gray-700">No leave data to display.</p>
      )}

      {error && (
        <div className="mt-4 text-red-600 text-center font-medium">{error}</div>
      )}
    </div>
  );
}
