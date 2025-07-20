import React, { useState, ChangeEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { FaCommentDots } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface ComplaintHandlerAgentProps {
  compact?: boolean;
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  complaint: string;
}

const ComplaintHandlerAgent: React.FC<ComplaintHandlerAgentProps> = ({ compact = false }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>({ name: '', email: '', phone: '', complaint: '' });
  const [submitted, setSubmitted] = useState<FormState | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(form);
    setForm({ name: '', email: '', phone: '', complaint: '' });
  };

  return (
    <div className="bg-gray-50 shadow-md max-w-4xl mx-auto mt-8 rounded-2xl p-8">
      <form className="w-full flex flex-col md:flex-row md:flex-wrap gap-4 mb-8" onSubmit={handleSubmit}>
        <div className="flex flex-col w-full md:w-1/3">
          <label className="block text-sm font-medium mb-1 text-black">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="flex flex-col w-full md:w-1/3">
          <label className="block text-sm font-medium mb-1 text-black">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="flex flex-col w-full md:w-1/3">
          <label className="block text-sm font-medium mb-1 text-black">Phone</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your phone"
            required
          />
        </div>
        <div className="flex flex-col w-full md:w-full">
          <label className="block text-sm font-medium mb-1 text-black">Complaint</label>
          <textarea
            name="complaint"
            value={form.complaint}
            onChange={handleChange}
            rows={4}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400 resize-none"
            placeholder="Describe your complaint"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full md:w-[160px] h-[42px] text-white font-bold rounded-lg bg-[#FF620A] shadow hover:shadow-md transition-all"
        >
          Submit Complaint
        </button>
      </form>
      {submitted && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-2xl mb-8">
          <h3 className="text-lg font-bold mb-2 text-gray-800">Submitted Complaint Details</h3>
          <p><span className="font-semibold">Name:</span> {submitted.name}</p>
          <p><span className="font-semibold">Email:</span> {submitted.email}</p>
          <p><span className="font-semibold">Phone:</span> {submitted.phone}</p>
          <p><span className="font-semibold">Complaint:</span> {submitted.complaint}</p>
        </div>
      )}
    </div>
  );
};

export default ComplaintHandlerAgent; 