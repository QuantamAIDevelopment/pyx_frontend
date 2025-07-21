import React from 'react';
import { motion } from 'framer-motion';
import { FaUserAlt, FaCheckCircle, FaSpinner, FaFileAlt } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BASEURL = 'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/upload-resume';

interface ExtractedProfile {
  name: string;
  email: string;
  phone: string;
  skills: string[];
  education: string[];
  work_experience: string[];
  projects: string[];
  resume_link: string;
  status: string;
  last_updated_at: string;
}

interface UploadResponse {
  resumeId: string;
  status: string;
  message: string;
}

// Remove local axios instance and use BASEURL directly

const uploadResume = async (file: File): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('resume', file); // Changed from 'file' to 'resume'
  const response = await axios.post(BASEURL, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  // Adjust response mapping as per your backend's response
  return response.data;
};

const getExtractedProfile = async (resumeId: string): Promise<ExtractedProfile> => {
  // Adjust the endpoint as per your backend's API for fetching extracted profile
  // Example: `${BASEURL}/profile/${resumeId}`
  const response = await axios.post(`${BASEURL}/profile/${resumeId}`);
  return response.data;
};

const ResumeToProfileExtractor: React.FC = () => {
  // const navigate = useNavigate();
  
  // File upload state
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [uploadMessage, setUploadMessage] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  const [extractedProfile, setExtractedProfile] = React.useState<ExtractedProfile | null>(null);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      setUploadMessage("");
      setExtractedProfile(null);
      setError("");
    }
  };

  // Handle upload button click
  const handleExtractProfile = async () => {
    if (!selectedFile) {
      setUploadMessage("Please select a file to upload.");
      return;
    }
    setLoading(true);
    setUploadMessage("");
    setError("");
    setExtractedProfile(null);
    try {
      const uploadRes = await uploadResume(selectedFile);
      setUploadMessage(uploadRes.message);
      const profile = await getExtractedProfile(uploadRes.resumeId);
      setExtractedProfile(profile);
    } catch (err: any) {
      setError("Failed to extract profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 flex flex-col items-center   round-2xl show-md pd-14 w-full max-w-3xl mt-8 ">
      {/* <h2 className="text-[42px] font-bold text-black mb-8 mt-2  font-ui-sans-serif text-center">
        Resume to Profile Auto Extractor
      </h2> */}
      <div className="bg-gray rounded-2xl justify-center text-black text-[16.41px] font-poppins shadow-md p-8 max-w-xl mb-8">
        <div className="font-bold text-black text-[16.41px] font-poppins mb-4">Upload Resume</div>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <label className="relative cursor-pointer">
            <input
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
            <span   className="w-[110%] mt-4 h-[31.5px] px-[14px] py-[21px] text-black text-[16.41px] font-bold font-poppins text-center rounded-lg shadow-[0_4px_12px_rgba(152,16,250,0.12)] bg-gradient-to-r from-[#FF620A] to-[#993B06] transition-all flex items-center justify-center">
              Choose File
            </span>
          </label>
          <span className="text-black text-[16.41px] font-poppins">
            {selectedFile ? selectedFile.name : "No file chosen"}
          </span>
          <button
            className="w-[40%] mt-4 h-[31.5px] px-[14px] py-[21px] text-[16.41px] font-bold text-white text-center rounded-lg shadow-[0_4px_12px_rgba(152,16,250,0.12)] bg-gradient-to-r from-[#FF620A] to-[#993B06] transition-all font-poppins flex items-center justify-center"
            onClick={handleExtractProfile}
            disabled={loading}
          >
            {loading ? <FaSpinner className="animate-spin mr-2" /> : null}
            Extract Profile
          </button>
        </div>
        {uploadMessage && (
          <div className={uploadMessage.includes('successfully') ? "text-green-600 mt-2 text-sm font-poppins" : "text-red-600 mt-2 text-sm font-poppins"}>
            {uploadMessage}
          </div>
        )}
        {error && (
          <div className="text-red-600 mt-2 text-sm font-poppins">{error}</div>
        )}
      </div>
      <div className="bg-gray rounded-2xl shadow-md p-8 max-w-xl mb-8">
        <div className="font-bold text-black text-[16.41px] font-poppins mb-4">Workflow Steps</div>
        <div className="flex flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center">
            <div className="bg-blue-500 rounded-full p-4 mb-2">
              <FaFileAlt className="w-8 h-8 text-white" />
            </div>
            <span className="text-black text-[16.41px] font-bold font-poppins">Upload Resume</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-yellow-400 rounded-full p-4 mb-2">
              <FaSpinner className="w-8 h-8 text-white" />
            </div>
            <span className="text-black text-[16.41px] font-bold font-poppins">Extract Data</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-green-500 rounded-full p-4 mb-2">
              <FaCheckCircle className="w-8 h-8 text-white" />
            </div>
            <span className="text-black text-[16.41px] font-bold font-poppins">Create Profile</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-purple-500 rounded-full p-4 mb-2">
              <FaUserAlt className="w-8 h-8 text-white" />
            </div>
            <span className="text-black text-[16.41px] font-bold font-poppins">Store Data</span>
          </div>
        </div>
      </div>
      {extractedProfile && (
        <motion.div 
          className="bg-white rounded-2xl shadow-md p-8 max-w-xl mb-8 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
          <div className="font-bold text-black text-[22px] font-poppins mb-6 flex items-center gap-2">
            <FaUserAlt className="text-purple-600 w-6 h-6" /> Extracted Profile
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 rounded-xl p-4 flex flex-col gap-2 shadow">
              <div className="flex items-center gap-2 font-bold text-black text-[16.41px] font-poppins"><FaUserAlt className="text-blue-500" /> Name</div>
              <div className="text-black text-[15px] font-poppins">{extractedProfile.name}</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 flex flex-col gap-2 shadow">
              <div className="flex items-center gap-2 font-bold text-black text-[16.41px] font-poppins"><FaCheckCircle className="text-green-500" /> Email</div>
              <div className="text-black text-[15px] font-poppins">{extractedProfile.email}</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 flex flex-col gap-2 shadow">
              <div className="flex items-center gap-2 font-bold text-black text-[16.41px] font-poppins"><FaFileAlt className="text-yellow-500" /> Phone</div>
              <div className="text-black text-[15px] font-poppins">{extractedProfile.phone}</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 flex flex-col gap-2 shadow">
              <div className="flex items-center gap-2 font-bold text-black text-[16.41px] font-poppins"><FaSpinner className="text-pink-500" /> Status</div>
              <div className="text-black text-[15px] font-poppins">{extractedProfile.status}</div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 rounded-xl p-4 shadow">
              <div className="font-bold text-black text-[16.41px] font-poppins mb-2 flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Skills</div>
              <ul className="list-disc ml-6 text-black text-[15px] font-poppins">
                {extractedProfile.skills.map((skill, i) => <li key={i}>{skill}</li>)}
              </ul>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 shadow">
              <div className="font-bold text-black text-[16.41px] font-poppins mb-2 flex items-center gap-2"><FaFileAlt className="text-blue-500" /> Education</div>
              <ul className="list-disc ml-6 text-black text-[15px] font-poppins">
                {extractedProfile.education.map((ed, i) => <li key={i}>{ed}</li>)}
              </ul>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 shadow">
              <div className="font-bold text-black text-[16.41px] font-poppins mb-2 flex items-center gap-2"><FaSpinner className="text-yellow-500" /> Work Experience</div>
              <ul className="list-disc ml-6 text-black text-[15px] font-poppins">
                {extractedProfile.work_experience.map((exp, i) => <li key={i}>{exp}</li>)}
              </ul>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 shadow">
              <div className="font-bold text-black text-[16.41px] font-poppins mb-2 flex items-center gap-2"><FaUserAlt className="text-purple-500" /> Projects</div>
              <ul className="list-disc ml-6 text-black text-[15px] font-poppins">
                {extractedProfile.projects.map((proj, i) => <li key={i}>{proj}</li>)}
              </ul>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 items-center mb-4">
            <div className="font-bold text-black text-[16.41px] font-poppins flex items-center gap-2"><FaFileAlt className="text-blue-600" /> Resume Link:</div>
            <a href={extractedProfile.resume_link} className="text-blue-600 underline text-[15px] font-poppins" target="_blank" rel="noopener noreferrer">View Resume</a>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="font-bold text-black text-[16.41px] font-poppins flex items-center gap-2"><FaSpinner className="text-yellow-600" /> Last Updated:</div>
            <div className="text-black text-[15px] font-poppins">{new Date(extractedProfile.last_updated_at).toLocaleString()}</div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ResumeToProfileExtractor; 