import React from 'react';
import PageRevealWrapper from '../components/workflows/PageRevealWrapper';
import ProjectCoastReports from '../components/workflows/ProjectCoastReports.tsx';
 
const ProjectCoastReportsPage: React.FC = () => {
  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center"
      style={{
        fontFamily: 'ui-sans-serif',
        fontSize: '15.75px',
        background: 'linear-gradient(135deg, rgb(21,93,252) 0%, rgb(152,16,250) 100%)',
      }}
    >
      <h2
        className="font-bold text-center mb-6"
        style={{
          fontSize: '42px',
          color: 'black',
          fontFamily: 'ui-sans-serif',
        }}
      >
        AI Project Coast Reports
      </h2>
      <p className="text-lg text-center text-gray-700 mb-8" style={{ fontFamily: 'ui-sans-serif' }}>
        Upload your project data file to generate a detailed weekly project cost report. The AI will parse, calculate, and summarize costs for each project and team member.
      </p>
      <div className="w-full max-w-2xl bg-gray-100 border border-gray-300 rounded-lg p-6 mb-6 shadow-md" style={{ fontFamily: 'ui-sans-serif' }}>
        <h3 className="text-xl font-semibold text-blue-700 mb-2">Example Use Cases</h3>
        <ul className="list-disc list-inside text-blue-900 space-y-1">
          <li>Project Managers: Instantly generate weekly cost reports for all ongoing projects.</li>
          <li>Finance Teams: Track project expenses, team member costs, and budget utilization.</li>
          <li>Consulting Firms: Provide clients with transparent, itemized project cost breakdowns.</li>
          <li>Agencies: Automate reporting for multiple clients and projects with a single upload.</li>
        </ul>
      </div>
      <div className="w-full max-w-2xl bg-gray-100 border border-gray-300 rounded-lg p-6 mb-8 shadow-md" style={{ fontFamily: 'ui-sans-serif' }}>
        <h3 className="text-xl font-semibold text-green-700 mb-2">Why This Stands Out</h3>
        <ul className="list-disc list-inside text-green-900 space-y-1">
          <li>Automated Parsing: No manual data entry—just upload your file and get instant results.</li>
          <li>Detailed Breakdown: See costs by project, team member, category, and date.</li>
          <li>Accurate Calculations: AI computes total costs, rates, and summaries for you.</li>
          <li>Professional Output: Share or export reports for stakeholders and clients.</li>
        </ul>
      </div>
      <div className="w-full max-w-md bg-gray-100 rounded-lg p-6 shadow-md flex flex-col items-center" style={{ fontFamily: 'ui-sans-serif' }}>
        <div className="flex items-center mb-4">
          <span className="text-2xl mr-2" role="img" aria-label="spreadsheet">📊</span>
          <span className="font-semibold text-lg">AI Project Coast Reports</span>
        </div>
        <label className="block mb-2 font-medium">Upload Project Data File:</label>
        <div className="flex w-full items-center">
          <input
            type="file"
            className="flex-1 border border-gray-300 rounded px-3 py-2 mr-2 placeholder-gray-500 text-base"
            style={{ fontSize: '18px', fontFamily: 'ui-sans-serif' }}
            placeholder="Choose File"
          />
          <button
            className="px-4 py-2 rounded text-white font-semibold shadow-md"
            style={{ backgroundColor: '#9810FA', fontFamily: 'ui-sans-serif', fontSize: '15.75px' }}
          >
            Generate Report
          </button>
        </div>
      </div>
    </div>
  );
};
 
export default ProjectCoastReportsPage;