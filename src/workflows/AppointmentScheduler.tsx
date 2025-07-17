import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
 
interface AppointmentSchedulerProps {
  compact?: boolean;
}
 
const AppointmentScheduler: React.FC<AppointmentSchedulerProps> = ({ compact = false }) => {
  const navigate = useNavigate();
 
  return (
    <div
      className={
        (compact ? 'space-y-4 w-full overflow-hidden' : 'space-y-8 w-full') +
        ' bg-gray-200 shadow-md p-6 rounded-xl'
      }
    >
      <div className={compact ? 'flex items-center space-x-2 mb-1' : 'flex items-center space-x-4 mb-2'}>
        <div className={compact ? 'bg-blue-500 p-3 rounded-lg shadow-md' : 'bg-blue-500 p-4 rounded-lg shadow-md'}>
          <FaCalendarAlt className={compact ? 'w-8 h-8 text-white' : 'w-10 h-10 text-white'} />
        </div>
        <h2 className="text-[42px] font-sans text-black m-0 font-bold">
  Appointment Scheduler
</h2>
 
      </div>
      <p
        className={compact ? 'text-base text-gray-700' : 'text-lg text-gray-800'}
        style={{ fontFamily: 'sans-serif' }}
      >
        Book and manage appointments with ease. Get instant confirmation and details.
      </p>
      <motion.button
  whileHover={{ scale: 1.05, boxShadow: '0 8px 32px 0 #61868d33' }}
  whileTap={{ scale: 0.97 }}
  onClick={() => navigate('/appointment-scheduler')}
  className={`
    w-full
    ${compact ? 'py-[12px] rounded-[12px]' : 'py-[18px] rounded-[18px]'}
    mt-[12px]
    text-white text-[15.75px] font-sans font-bold
    bg-gradient-to-r from-[#155DFC] to-[#9810FA]
    shadow-[0_4px_12px_#9810fa33]
    transition-colors
  `}
>
  Run Workflow
</motion.button>
 
    </div>
  );
};
 
export default AppointmentScheduler;