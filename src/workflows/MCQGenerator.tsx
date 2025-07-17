import React from 'react';
import { motion } from 'framer-motion';
import { FaBrain } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
 
interface MCQGeneratorProps {
  compact?: boolean;
}
 
const MCQGenerator: React.FC<MCQGeneratorProps> = ({ compact = false }) => {
  const navigate = useNavigate();
 
  return (
    <div
      className={
        (compact
          ? 'space-y-4 w-full overflow-hidden'
          : 'space-y-8 w-full') +
        ' bg-gray-200 shadow-md p-6 rounded-xl'
      }
    >
      <div className={compact ? 'flex items-center space-x-2 mb-1' : 'flex items-center space-x-4 mb-2'}>
        <div className={compact ? 'bg-green-500 p-2 rounded-lg shadow' : 'bg-green-500 p-3 rounded-lg shadow'}>
          <FaBrain className={compact ? 'w-5 h-5 text-white' : 'w-6 h-6 text-white'} />
        </div>
        <h2 className="text-[42px] font-sans text-black m-0 font-bold">
  MCQ Generator & Trainer
</h2>
 
      </div>
      <p
        className={compact ? 'text-base text-gray-700' : 'text-lg text-gray-800'}
        style={{ fontFamily: 'sans-serif' }}
      >
        Generate MCQs from topics or files, and test your knowledge with the revision trainer.
      </p>
      <motion.button
  whileHover={{ scale: 1.05, boxShadow: '0 8px 32px 0 #61868d33' }}
  whileTap={{ scale: 0.97 }}
  onClick={() => navigate('/mcq-generator')}
  className={`
    w-full
    ${compact ? 'py-3 rounded-lg' : 'py-4 rounded-xl'}
    font-bold
    text-white
    text-[15.75px]
    font-sans
    shadow-[0_4px_12px_rgba(0,0,0,0.15)]
    bg-gradient-to-r from-[#155DFC] to-[#9810FA]
    transition-colors
  `}
>
  View Details
</motion.button>
 
    </div>
  );
};
 
export default MCQGenerator;