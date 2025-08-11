import React, { useState } from 'react';
import { motion} from 'framer-motion';
import {  FaUserTie, FaCheckCircle } from 'react-icons/fa';
import axios from 'axios';

const API_BASE_URL = 'https://PYX-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook';

interface CandidateData {
  'Candidate Name': string;
  'Role': string;
  'Department': string;
  'Preferred Time': string;
}

interface FormData extends CandidateData {}

interface Interviewer {
  Id?: string;
  name?: string;
  'Candidate Name'?: string;
  role?: string;
  'Role'?: string;
  department?: string;
  'Department'?: string;
  'Availability time'?: string;
  availability?: string;
  email?: string;
  'Interviewers Assigned'?: string;
  status?: string;
}

const assignInterview = async (candidateData: CandidateData): Promise<any[]> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/assign-interview`, candidateData, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    console.error('Error assigning interview:', error);
    throw error;
  }
};

const InterviewPanelAssignmentPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    'Candidate Name': '',
    'Role': '',
    'Department': '',
    'Preferred Time': ''
  });
  const [assignedInterviewers, setAssignedInterviewers] = useState<Interviewer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  // const formRef = useRef<HTMLFormElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData['Candidate Name'] || !formData['Role'] || !formData['Department'] || !formData['Preferred Time']) {
      setError('All fields are required.');
      return;
    }
    setLoading(true);
    setError(null);
    setSuccess(false);
    setAssignedInterviewers([]);
    try {
      const dateTime = new Date(formData['Preferred Time']);
      const formattedDateTime = dateTime.toLocaleString('en-US', {
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', hour12: true
      });
      const result = await assignInterview({ ...formData, 'Preferred Time': formattedDateTime });
      setAssignedInterviewers(result);
      setSuccess(true);
    } catch {
      setError('Failed to assign interviewers. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderInterviewer = (interviewer: Interviewer, index: number) => (
    <motion.div 
      key={interviewer.Id || index}
      className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 font-poppins"
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ delay: index * 0.1 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-purple-100 p-2 rounded-full">
            <FaUserTie className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 font-poppins">{interviewer.name || interviewer['Candidate Name']}</h3>
            <p className="text-sm text-gray-600 font-poppins">{interviewer.role || interviewer['Role']}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <FaCheckCircle className="w-5 h-5 text-green-500" />
          <span className="text-sm font-medium text-green-600 font-poppins">{interviewer.status || 'Available'}</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm font-poppins">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-2 px-2 font-semibold text-gray-700">Department</th>
              <th className="text-left py-2 px-2 font-semibold text-gray-700">Available</th>
              <th className="text-left py-2 px-2 font-semibold text-gray-700">Email</th>
              <th className="text-left py-2 px-2 font-semibold text-gray-700">Assigned To</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-2 text-gray-800">{interviewer.department || interviewer['Department']}</td>
              <td className="py-2 px-2 text-gray-800">{interviewer['Availability time'] || interviewer.availability}</td>
              <td className="py-2 px-2 text-gray-800">{interviewer.email}</td>
              <td className="py-2 px-2 text-gray-800">{interviewer['Interviewers Assigned'] || formData['Candidate Name']}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {interviewer.Id && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <span className="text-xs text-gray-500 font-poppins">ID: {interviewer.Id}</span>
        </div>
      )}
    </motion.div>
  );

  return (
    <div className="bg-gray-50 shadow-md max-w-4xl mx-auto mt-8 rounded-2xl p-8">
      <form onSubmit={handleSubmit} className="w-full flex flex-col md:flex-row md:flex-wrap gap-4 mb-8">
        <div className="flex flex-col w-full md:w-1/2">
          <label className="block text-sm font-medium text-black mb-2">Candidate Name *</label>
          <input
            type="text"
            name="Candidate Name"
            value={formData['Candidate Name']}
            onChange={handleInputChange}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400"
            placeholder="Enter candidate name"
            required
          />
        </div>
        <div className="flex flex-col w-full md:w-1/2">
          <label className="block text-sm font-medium text-black mb-2">Role *</label>
          <input
            type="text"
            name="Role"
            value={formData['Role']}
            onChange={handleInputChange}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400"
            placeholder="Enter role"
            required
          />
        </div>
        <div className="flex flex-col w-full md:w-1/2">
          <label className="block text-sm font-medium text-black mb-2">Department *</label>
          <input
            type="text"
            name="Department"
            value={formData['Department']}
            onChange={handleInputChange}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400"
            placeholder="Enter department"
            required
          />
        </div>
        <div className="flex flex-col w-full md:w-1/2">
          <label className="block text-sm font-medium text-black mb-2">Preferred Time *</label>
          <input
            type="datetime-local"
            name="Preferred Time"
            value={formData['Preferred Time']}
            onChange={handleInputChange}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full md:w-[160px] h-[42px] text-white font-bold rounded-lg bg-[#FF620A] shadow hover:shadow-md transition-all"
          disabled={loading}
        >
          {loading ? 'Assigning...' : 'Assign Interview Panel'}
        </button>
      </form>
      {error && (
        <div className="mt-4 text-red-600 text-center font-medium">{error}</div>
      )}
      {success && (
        <div className="mt-4 text-green-600 text-center font-medium">Interviewers assigned successfully!</div>
      )}
      {assignedInterviewers.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-2xl mb-8 mt-8">
          <h3 className="text-xl font-bold mb-4 text-center">Assigned Interviewers</h3>
          <div className="space-y-4">
            {assignedInterviewers.map(renderInterviewer)}
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewPanelAssignmentPage;
