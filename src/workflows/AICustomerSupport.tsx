import React from 'react';
import { motion } from 'framer-motion';
import { FaRobot, FaComments, FaChartLine, FaClock } from 'react-icons/fa';
import { IconBaseProps } from 'react-icons';
// import { useNavigate } from 'react-router-dom';
 
interface AICustomerSupportProps {
  compact?: boolean;
}
 
interface Stat {
  title: string;
  value: number | string;
  icon: React.ComponentType<IconBaseProps>;
  color: string;
}
 
const AICustomerSupport: React.FC<AICustomerSupportProps> = ({ compact = false }) => {
  // const navigate = useNavigate();
  const [stats] = React.useState({
    totalQueries: 156,
    resolvedQueries: 142,
    averageResponseTime: '2.5s',
    activeUsers: 23
  });
 
  const statList: Stat[] = [
    { title: 'Total Queries', value: stats.totalQueries, icon: FaComments, color: 'bg-blue-500' },
    { title: 'Resolved', value: stats.resolvedQueries, icon: FaRobot, color: 'bg-green-500' },
    { title: 'Avg Response Time', value: stats.averageResponseTime, icon: FaClock, color: 'bg-yellow-500' },
    { title: 'Active Users', value: stats.activeUsers, icon: FaChartLine, color: 'bg-purple-500' },
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
    <div className={compact ? "space-y-4 w-full overflow-hidden" : "space-y-8 w-full"} style={{ fontFamily: 'ui-sans-serif', fontSize: '15.75px' }}>
      <div className={compact ? "flex items-center space-x-2 mb-1" : "flex items-center space-x-4 mb-2"}>
        <div className={compact ? "bg-blue-500 p-2 rounded-lg shadow" : "bg-blue-500 p-3 rounded-lg shadow-lg"}>
          <FaRobot className={compact ? "w-5 h-5 text-white" : "w-6 h-6 text-white"} />
        </div>
        <h2 className="text-[42px] text-black font-sans font-bold">
          AI Customer Support
        </h2>
      </div>
      <div className={compact ? "flex gap-2 w-full overflow-x-auto" : "grid grid-cols-2 gap-4 w-full"}>
        {statList.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <input
          type="text"
          placeholder="Type your message..."
          className="text-[18px] font-sans px-6 py-4 rounded-xl border border-gray-300 mr-4 flex-1"
        />
        <button
         className="bg-gradient-to-r from-[#9810FA] to-[#155DFC] text-white font-sans text-[18px] font-bold
         rounded-[12px] px-8 py-4 shadow-[0_4px_16px_0_rgba(0,0,0,0.10)] border-none
         cursor-pointer transition-shadow"
        >
          Send
        </button>
      </div>
    </div>
    </div>
  );
};
 
export default AICustomerSupport;