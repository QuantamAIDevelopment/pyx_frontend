import React from 'react';
import { motion } from 'framer-motion';
import { FaExclamationTriangle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
 
interface ContractRedFlagDetectorCardProps {
  compact?: boolean;
}
 
const ContractRedFlagDetectorCard: React.FC<ContractRedFlagDetectorCardProps> = ({ compact = false }) => {
  const navigate = useNavigate();
 
  return (
    <div className='bg-gray-100 shadow-md rounded-lg p-6'>
      <div className={compact ? 'space-y-4 w-full overflow-hidden' : 'space-y-8 w-full'}>
        <div className={compact ? 'flex items-center space-x-2 mb-1' : 'flex items-center space-x-4 mb-2'}>
          <div className={compact ? 'bg-red-500 p-3 rounded-lg shadow' : 'bg-red-500 p-4 rounded-lg shadow-md'}>
            <FaExclamationTriangle className={compact ? 'w-7 h-7 text-white' : 'w-8 h-8 text-white'} />
          </div>
          <h2
            className="text-[42px] font-bold font-sans text-black m-0 p-0 leading-tight"
            >
            Contract Red Flag Detector
          </h2>
        </div>
        <p
          className={compact
            ? 'text-[16px] text-gray-700 font-sans'
            : 'text-[18px] text-gray-800 font-sans'}
        >
          Upload a contract to detect red flags, assess risk, and get suggestions to fix issues.
        </p>
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 8px 32px 0 #9810FA33' }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/contract-red-flag-detector')}
          className="w-full bg-gradient-to-r from-[#155DFC] to-[#9810FA] text-white py-4 rounded-xl font-bold text-[15.75px] shadow-md font-sans transition-colors placeholder:text-[15.75px] placeholder:py-3 placeholder:px-4"
          >
          View Details
        </motion.button>
        {/* Example status button for demonstration */}
        <button
         className="w-full mt-4 bg-gradient-to-r from-[#9810FA] to-[#155DFC] text-white py-3 rounded-xl font-bold text-[15.75px] shadow-md font-sans transition-colors"
         >
          Status
        </button>
      </div>
    </div>
  );
};
 
export default ContractRedFlagDetectorCard;