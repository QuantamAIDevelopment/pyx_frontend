import React, { useState, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { FaFileInvoiceDollar, FaLock, FaClock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5678/webhook/payslip-upload';

interface PayslipAutoEncryptedProps {
  compact?: boolean;
}

interface Stats {
  encryptedPayslips: number;
  pendingEncryption: number;
  totalPayslips: number;
}

interface RecentActivityItem {
  employeeName: string;
  payslipMonth: string;
  status: string;
  encryptionDate?: string;
  fileSize: string;
}

const PayslipAutoEncrypted: React.FC<PayslipAutoEncryptedProps> = ({ compact = false }) => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<Stats>({ encryptedPayslips: 0, pendingEncryption: 0, totalPayslips: 0 });
  const [recentActivity, setRecentActivity] = useState<RecentActivityItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setError('');
    setSuccessMsg('');
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('data', file);
    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setStats(data.stats || {});
        setRecentActivity(data.recentActivity || []);
        setSuccessMsg(data.message || 'Upload successful!');
      } else {
        setError(data.message || 'Upload failed.');
      }
    } catch (err) {
      setError('API error.');
    } finally {
      setLoading(false);
    }
  };

  const statList = [
    { title: 'Encrypted Payslips', value: stats.encryptedPayslips, icon: FaLock, color: 'bg-green-500' },
    { title: 'Pending Encryption', value: stats.pendingEncryption, icon: FaClock, color: 'bg-yellow-500' },
    { title: 'Total Payslips', value: stats.totalPayslips, icon: FaFileInvoiceDollar, color: 'bg-blue-500' },
  ];

  return (
    <div className="bg-gray-50 shadow-md max-w-4xl mx-auto mt-8 rounded-2xl p-8">
      <form className="w-full flex flex-col md:flex-row items-end gap-4 mb-8">
        <div className="flex flex-col w-full md:w-2/3">
          <label className="block text-sm font-medium mb-1 text-black">Upload Payslip</label>
          <input type="file" className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400" onChange={handleFileChange} disabled={loading} />
        </div>
      </form>
      <div className="mb-4 flex flex-wrap gap-4">
        {loading && <span className="text-blue-600 font-medium font-poppins">Uploading...</span>}
        {error && <span className="text-red-500 font-medium font-poppins">{error}</span>}
        {successMsg && <span className="text-green-600 font-medium font-poppins">{successMsg}</span>}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {statList.map((stat, idx) => (
          <motion.div
            key={idx}
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-2xl flex flex-col gap-4"
            whileHover={{ scale: 1.04, boxShadow: '0 10px 25px rgba(0,0,0,0.08)' }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <div className="flex items-center gap-4">
              <div className={`p-4 rounded-xl ${stat.color}`}><stat.icon className="w-6 h-6 text-white" /></div>
              <div className="font-semibold text-lg text-gray-800">{stat.title}</div>
            </div>
            <div className="text-xl font-bold text-gray-700">{stat.value}</div>
          </motion.div>
        ))}
      </div>
      <div>
        <h4 className="text-xl font-semibold text-black mb-4">Recent Activity</h4>
        <div className="overflow-x-auto rounded-xl shadow">
          <table className="min-w-full bg-white border border-gray-200 text-base text-gray-700">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="px-6 py-4 text-left">Employee Name</th>
                <th className="px-6 py-4 text-left">Payslip Month</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-left">Encryption Date</th>
                <th className="px-6 py-4 text-left">File Size</th>
              </tr>
            </thead>
            <tbody>
              {recentActivity.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-gray-400">No activity yet.</td>
                </tr>
              ) : (
                recentActivity.map((item, idx) => (
                  <tr key={idx} className="border-t hover:bg-gray-50 transition-all">
                    <td className="px-6 py-4">{item.employeeName}</td>
                    <td className="px-6 py-4">{item.payslipMonth}</td>
                    <td className="px-6 py-4">{item.status}</td>
                    <td className="px-6 py-4">{item.encryptionDate ? new Date(item.encryptionDate).toLocaleString() : '-'}</td>
                    <td className="px-6 py-4">{item.fileSize}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PayslipAutoEncrypted;
