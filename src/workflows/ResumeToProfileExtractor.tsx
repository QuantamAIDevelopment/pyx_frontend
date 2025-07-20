import React from 'react';
import { motion } from 'framer-motion';
import { FaUserAlt, FaCheckCircle, FaSpinner, FaFileAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface ResumeToProfileExtractorProps {
  compact?: boolean;
}

interface Stat {
  title: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const ResumeToProfileExtractor: React.FC<ResumeToProfileExtractorProps> = ({ compact = false }) => {
  const navigate = useNavigate();
  const [stats] = React.useState({
    extractedProfiles: 28,
    processingResumes: 2,
    failedExtractions: 1,
  });

  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [uploadMessage, setUploadMessage] = React.useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      setUploadMessage("");
    }
  };

  const handleExtractProfile = () => {
    if (!selectedFile) {
      setUploadMessage("Please select a file to upload.");
      return;
    }
    setUploadMessage(`"${selectedFile.name}" uploaded successfully!`);
  };

  return (
    <div className="bg-gray-50 shadow-md max-w-4xl mx-auto mt-8 rounded-2xl p-8">
      <form className="w-full flex flex-col md:flex-row items-end gap-4 mb-8">
        <div className="flex flex-col w-full md:w-2/3">
          <label className="block text-sm font-medium mb-1 text-black">Upload Resume</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          type="button"
          onClick={handleExtractProfile}
          className="w-full md:w-[160px] h-[42px] text-white font-bold rounded-lg bg-[#FF620A] shadow hover:shadow-md transition-all"
        >
          Extract Profile
        </button>
      </form>
      {uploadMessage && (
        <div className={`mt-4 text-sm text-center ${uploadMessage.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>{uploadMessage}</div>
      )}
      <div className="mt-8">
        <h3 className="text-xl font-bold text-black mb-6">Workflow Steps</h3>
        <div className="grid grid-cols-2 gap-6">
          {[
            { icon: FaFileAlt, label: "Upload Resume", color: "bg-blue-500" },
            { icon: FaSpinner, label: "Extract Data", color: "bg-yellow-500" },
            { icon: FaCheckCircle, label: "Create Profile", color: "bg-green-500" },
            { icon: FaUserAlt, label: "Store Data", color: "bg-purple-500" },
          ].map(({ icon: Icon, label, color }, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className={`${color} rounded-full p-4 mb-2`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-semibold text-center text-gray-700">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResumeToProfileExtractor;
