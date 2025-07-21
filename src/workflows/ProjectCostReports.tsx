import React, { useState, ChangeEvent, FormEvent } from 'react';
// import { FaFileUpload, FaTable } from 'react-icons/fa';
import axios from 'axios';

const API_URL = 'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/Auto';

// Define the type for each report row
interface ReportRow {
  project_name: string;
  team_member: string;
  category: string;
  report_date: string;
  hours: number;
  rate: number;
  notes: string;
  total_cost: number;
}

const ProjectCoastReports: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [report, setReport] = useState<ReportRow[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setReport([]);
    try {
      const formData = new FormData();
      if (file) {
        formData.append('datas', file);
      }
      const response = await axios.post<ReportRow[]>(API_URL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setReport(response.data);
    } catch (err) {
      setError('Failed to generate project cost report.');
    } finally {
      setLoading(false);
    }
  };

  const totalCost = Array.isArray(report) ? report.reduce((sum, row) => sum + (row.total_cost || 0), 0) : 0;

  return (
    <div
      className="max-w-2xl mx-auto p-6 bg-gray-50 rounded-2xl shadow-md mt-8"
      style={{ fontFamily: 'poppins', fontSize: '15.75px' }}
    >
      <div className="flex items-center space-x-3 mb-4">
        {/* Removed the logo icon (FaTable) */}
        <h2
          className="font-bold w-full text-center"
          style={{ fontSize: '42px', color: 'black', fontFamily: 'ui-sans-serif' }}
        >
          AI Project Coast Reports
        </h2>
      </div>
      <p className="text-lg text-gray-700 mb-8 text-center">
        Upload your project data file to generate a detailed weekly project cost report. The AI will parse, calculate, and summarize costs for each project and team member.
      </p>
      
      
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <label className="font-semibold">Upload Project Data File:</label>
        <div className="flex items-center space-x-2">
          <input
            type="file"
            onChange={handleFileChange}
            className="border p-3 rounded flex-1 text-base placeholder-gray-500"
            style={{ fontSize: '18px', fontFamily: 'Poppins' }}
            placeholder="Choose File"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !file}
            className="flex items-center px-5 py-3 rounded font-bold text-white shadow-md transition-colors duration-200"
            style={{
              background: 'linear-gradient(90deg, #FF620A 0%, #993B06 100%)',
              fontFamily: 'Poppins',
              fontSize: '15.75px',
            }}
          >
            {loading ? 'Generating...' : 'Generate Report'}
          </button>
        </div>
      </form>
      {error && <div className="text-red-500 mt-4">{error}</div>}
      {Array.isArray(report) && report.length > 0 && (
        <div className="overflow-x-auto mt-6">
          <table className="min-w-full border rounded-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-3 py-2 border">Project Name</th>
                <th className="px-3 py-2 border">Team Member</th>
                <th className="px-3 py-2 border">Category</th>
                <th className="px-3 py-2 border">Report Date</th>
                <th className="px-3 py-2 border">Hours</th>
                <th className="px-3 py-2 border">Rate</th>
                <th className="px-3 py-2 border">Notes</th>
                <th className="px-3 py-2 border">Total Cost</th>
              </tr>
            </thead>
            <tbody>
              {report.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-3 py-2 border">{row.project_name}</td>
                  <td className="px-3 py-2 border">{row.team_member}</td>
                  <td className="px-3 py-2 border">{row.category}</td>
                  <td className="px-3 py-2 border">{row.report_date}</td>
                  <td className="px-3 py-2 border">{row.hours}</td>
                  <td className="px-3 py-2 border">₹{row.rate}</td>
                  <td className="px-3 py-2 border">{row.notes}</td>
                  <td className="px-3 py-2 border font-semibold text-blue-700">₹{row.total_cost}</td>
                </tr>
              ))}
              <tr className="bg-blue-50 font-bold">
                <td colSpan={7} className="px-3 py-2 border text-right">Total Cost</td>
                <td className="px-3 py-2 border text-blue-800">₹{totalCost}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProjectCoastReports;