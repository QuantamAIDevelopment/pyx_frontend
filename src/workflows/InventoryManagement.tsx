import React from 'react';
import { motion } from 'framer-motion';
import { FaWarehouse } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
 
interface InventoryManagementProps {
  compact?: boolean;
}
 
const InventoryManagement: React.FC<InventoryManagementProps> = ({ compact = false }) => {
  const navigate = useNavigate();
 
  return (
    <div
      className={
        (compact
          ? 'space-y-4 w-full overflow-hidden'
          : 'space-y-8 w-full') +
        ' bg-gray-200 shadow-md p-6 rounded-xl'
      }
      style={{ fontFamily: 'ui-sans-serif' }}
    >
      <div className={compact ? 'flex items-center space-x-2 mb-1' : 'flex items-center space-x-4 mb-2'}>
        <div className={compact ? 'bg-blue-500 p-4 rounded-lg shadow-md' : 'bg-blue-500 p-6 rounded-lg shadow-md'}>
          <FaWarehouse className={compact ? 'w-10 h-10 text-white' : 'w-14 h-14 text-white'} />
        </div>
        <h2 className="text-[42px] font-sans text-black m-0 font-bold">
  Inventory Management
</h2><br></br>
<p className="text-base text-gray-600 mt-1">Enter the return product details below or continue with workflow</p>
 
      </div>
      <p
        className={compact ? 'text-base text-gray-700' : 'text-lg text-gray-800'}
        style={{ fontFamily: 'ui-sans-serif' }}
      >
        Manage stock levels, track inventory, and automate reordering processes.
      </p>
      <motion.button
  whileHover={{ scale: 1.05, boxShadow: '0 8px 32px 0 #61868d33' }}
  whileTap={{ scale: 0.97 }}
  onClick={() => navigate('/inventory-management')}
  className="
    w-full
    py-3
    rounded-xl
    font-bold
    shadow-md
    transition-colors
    text-white
    text-[15.75px]
    font-sans
    bg-gradient-to-r from-[#155DFC] to-[#9810FA]
  "
>
  View Details
</motion.button>
 
    </div>
  );
};
 
export default InventoryManagement;