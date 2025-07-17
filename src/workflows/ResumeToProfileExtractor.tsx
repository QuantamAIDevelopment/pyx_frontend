import React from 'react';
import { motion } from 'framer-motion';
import { FaUserAlt, FaFileAlt, FaCheckCircle, FaSpinner } from 'react-icons/fa';
import { IconBaseProps } from 'react-icons';
import { useNavigate } from 'react-router-dom';
 
interface ResumeToProfileExtractorProps {
  compact?: boolean;
}
 
interface Stat {
  title: string;
  value: number;
  icon: React.ComponentType<IconBaseProps>;
  color: string;
}
 
const ResumeToProfileExtractor: React.FC<ResumeToProfileExtractorProps> = ({ compact = false }) => {
  const navigate = useNavigate();
  const [stats] = React.useState({
    extractedProfiles: 28,
    processingResumes: 2,
    failedExtractions: 1,
  });
 
  const statList: Stat[] = [
    { title: 'Extracted Profiles', value: stats.extractedProfiles, icon: FaCheckCircle, color: 'bg-green-500' },
    { title: 'Processing', value: stats.processingResumes, icon: FaSpinner, color: 'bg-yellow-500' },
    { title: 'Failed Extractions', value: stats.failedExtractions, icon: FaUserAlt, color: 'bg-red-500' },
  ];
 
  const StatCard: React.FC<Stat> = ({ title, value, icon: Icon, color }) => (
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
        <div className={compact ? "font-bold text-base text-anthropic-dark truncate" : "font-bold text-lg text-anthropic-dark truncate"}>{title}</div>
      </div>
      <div className={compact ? "text-lg font-bold text-anthropic-dark" : "text-2xl font-bold text-anthropic-dark"}>{value}</div>
    </motion.div>
  );
 
  return (
    <div className='bg-white shadow-lg rounded-lg p-4'>
    <div className={compact ? "space-y-4 w-full overflow-hidden font-ui-sans text-[15.75px]" : "space-y-8 w-full font-ui-sans text-[15.75px]"}>
      <div className={compact ? "flex items-center space-x-2 mb-1" : "flex items-center space-x-4 mb-2"}>
        <div className={compact ? "bg-[#155DFC] p-2 rounded-lg shadow-md" : "bg-[#155DFC] p-3 rounded-lg shadow-md"}>
          <FaUserAlt className={compact ? "w-5 h-5 text-white" : "w-6 h-6 text-white"} />
        </div>
        <h2 className={compact ? "text-[32px] font-bold text-black font-ui-sans" : "text-[42px] font-bold text-black font-ui-sans"} style={{ fontFamily: 'ui-sans-serif', fontSize: compact ? '32px' : '42px', color: '#000' }}>Resume to Profile Auto Extractor</h2>
      </div>
      <div className={compact ? "flex gap-2 w-full overflow-x-auto" : "grid grid-cols-2 gap-4 w-full"}>
        {statList.map((stat, idx) => (
        <motion.div
        key={idx}
        className={
          compact
            ? "bg-gray-100 border border-gray-200 rounded-xl p-4 shadow-md flex flex-col gap-2 min-w-[140px] font-sans"
            : "bg-gray-100 border border-gray-200 rounded-2xl p-8 shadow-md flex flex-col gap-2 min-w-[180px] w-full max-w-xs mx-auto font-sans"
        }
        whileHover={
          compact
            ? { scale: 1.03, boxShadow: '0 2px 8px 0 #61868d22' }
            : { scale: 1.05, boxShadow: '0 8px 32px 0 #61868d33' }
        }
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div
            className={`${
              compact ? 'p-3 rounded-lg' : 'p-4 rounded-lg'
            } ${idx === 0 ? 'bg-[#155DFC]' : idx === statList.length - 1 ? 'bg-[#9810FA]' : stat.color}`}
          >
            <stat.icon className={compact ? "w-6 h-6 text-white" : "w-8 h-8 text-white"} />
          </div>
     
          <div className={compact
            ? "font-bold text-base text-black truncate font-sans"
            : "font-bold text-lg text-black truncate font-sans"
          }>
            {stat.title}
          </div>
        </div>
     
        <div className={compact
          ? "text-lg font-bold text-black font-sans"
          : "text-2xl font-bold text-black font-sans"
        }>
          {stat.value}
        </div>
      </motion.div>
        ))}
      </div>
      <motion.button
        whileHover={{ scale: 1.05, boxShadow: '0 8px 32px 0 #61868d33' }}
        whileTap={{ scale: 0.97 }}
        onClick={() => navigate('/workflows/resume-extractor')}
        className={
          compact
            ? "w-full bg-gradient-to-r from-[#155DFC] to-[#9810FA] text-white py-3 rounded-lg font-bold text-[15.75px] shadow-md font-sans"
            : "w-full bg-gradient-to-r from-[#155DFC] to-[#9810FA] text-white py-4 rounded-xl font-bold text-[17px] shadow-md font-sans"
        }
      >
        View Details
      </motion.button>
    </div>
    </div>
  );
};
 
export default ResumeToProfileExtractor;