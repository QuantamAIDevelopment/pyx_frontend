import React, { useState, ChangeEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';
import {
  FaCalendarAlt, FaUser, FaEnvelope, FaPhone, FaClock, FaClipboardList
} from 'react-icons/fa';
import axios from 'axios';

interface AppointmentForm {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  request: string;
}

const API_URL = 'http://localhost:5678/webhook/appointment';

const bookAppointment = async (data: AppointmentForm): Promise<{ output: string }> => {
  try {
    const response = await axios.post(API_URL, data, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  } catch (error) {
    console.error('Error booking appointment:', error);
    throw error;
  }
};

const AppointmentSchedulerPage: React.FC = () => {
  const [form, setForm] = useState<AppointmentForm>({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    request: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await bookAppointment(form);
      setResult(response.output);
    } catch {
      setError('Failed to book appointment. Please check your details and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 shadow-md max-w-4xl mx-auto mt-8 rounded-2xl p-8">
      <form onSubmit={handleSubmit} className="w-full flex flex-col md:flex-row md:flex-wrap gap-4 mb-8">
        {[
          { label: 'Name', icon: <FaUser />, name: 'name', type: 'text' },
          { label: 'Email', icon: <FaEnvelope />, name: 'email', type: 'email' },
          { label: 'Phone', icon: <FaPhone />, name: 'phone', type: 'tel' },
          { label: 'Date', icon: <FaCalendarAlt />, name: 'date', type: 'date' },
          { label: 'Time (24h, IST)', icon: <FaClock />, name: 'time', type: 'time' },
          { label: 'Request', icon: <FaClipboardList />, name: 'request', type: 'text' }
        ].map(({ label, icon, name, type }) => (
          <div key={name} className="flex flex-col w-full md:w-[30%]">
            <label className="block text-sm font-medium mb-1 text-black flex items-center gap-2">{icon} {label}</label>
            <input
              type={type}
              name={name}
              value={(form as any)[name]}
              onChange={handleChange}
              placeholder={`Enter your ${name}`}
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
        ))}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="w-full md:w-[160px] h-[42px] text-white font-bold rounded-lg bg-[#FF620A] shadow hover:shadow-md transition-all"
          disabled={loading}
        >
          {loading ? "Loading..." : "Book Appointment"}
        </motion.button>
      </form>

      {result && (
        <div>
          <h2 className="text-xl font-bold text-black mb-6">Appointment Result</h2>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-2xl mb-8">
            <div className="text-black text-base whitespace-pre-line">{result}</div>
          </div>
        </div>
      )}

      {!result && !loading && (
        <p className="text-center text-gray-700">No appointment data to display.</p>
      )}

      {error && (
        <div className="mt-4 text-red-600 text-center font-medium">{error}</div>
      )}
    </div>
  );
};

export default AppointmentSchedulerPage;
