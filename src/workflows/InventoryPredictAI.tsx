// import React, { useState, ChangeEvent, FormEvent } from 'react';
// import { motion } from 'framer-motion';
// import { FaChartLine, FaFileUpload } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// // import { uploadInventoryAndGetForecast } from '../../services/workflows/inventoryPredictAI';
 
// interface InventoryPredictAIProps {
//   compact?: boolean;
// }
 
// interface Forecast {
//   [key: string]: string | undefined;
//   "\ud83d\udce6 Inventory Forecast Summary"?: string;
//   SKU?: string;
//   "Predicted Sales"?: string;
//   "Overstock Risk"?: string;
//   "Suggested Action"?: string;
// }
 
// const InventoryPredictAI: React.FC<InventoryPredictAIProps> = ({ compact = false }) => {
//   const navigate = useNavigate();
//   const [file, setFile] = useState<File | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const [forecast, setForecast] = useState<Forecast | null>(null);
 
//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setFile(e.target.files[0]);
//     }
//   };
 
//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError(null);
//     setForecast(null);
//     if (!file) {
//       setError('Please upload an inventory file.');
//       return;
//     }
//     setLoading(true);
//     try {
//       const response = await uploadInventoryAndGetForecast(file);
//       setForecast(response);
//     } catch (err: any) {
//       setError('Failed to get forecast. ' + (err?.message || ''));
//       console.error('Forecast error:', err);
//     } finally {
//       setLoading(false);
//     }
//   };
 
//   return (
//     <div className='bg-white shadow-lg rounded-lg p-4'>
//     <div className={compact ? 'space-y-4 w-full overflow-hidden font-sans' : 'space-y-8 w-full font-sans'}>
//       <div className={compact ? 'flex items-center space-x-2 mb-1' : 'flex items-center space-x-4 mb-2'}>
//         <div className={compact ? 'bg-indigo-500 p-2 rounded-lg shadow' : 'bg-indigo-500 p-3 rounded-lg shadow-lg'}>
//           <FaChartLine className={compact ? 'w-5 h-5 text-white' : 'w-6 h-6 text-white'} />
//         </div>
//         <h2
//           className="font-bold"
//           style={{
//             fontSize: '42px',
//             color: 'black',
//             fontFamily: 'ui-sans-serif, sans-serif',
//             margin: 0,
//             lineHeight: 1.1
//           }}
//         >
//           Inventory Forecasting AI
//         </h2>
//       </div>
//       <p style={{ fontSize: '15.75px', color: 'black', fontFamily: 'ui-sans-serif, sans-serif' }}>
//         Upload your inventory file to get AI-powered sales forecasts, stockout/overstock risks, and actionable suggestions.
//       </p>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <label className="flex items-center space-x-2 cursor-pointer" style={{ fontSize: '15.75px', fontFamily: 'ui-sans-serif, sans-serif', color: 'black' }}>
//           <FaFileUpload className="text-gray-500" />
//           <input type="file" onChange={handleFileChange} className="hidden" />
//           <span
//             className="placeholder-text"
//             style={{
//               fontSize: '17px',
//               padding: '8px 16px',
//               color: 'black',
//               fontFamily: 'ui-sans-serif, sans-serif',
//               background: '#f3f4f6',
//               borderRadius: '8px',
//               minWidth: '220px',
//               display: 'inline-block',
//               fontWeight: 500
//             }}
//           >
//             {file ? file.name : 'Choose inventory file...'}
//           </span>
//         </label>
//         <motion.button
//           whileHover={{ scale: 1.02 }}
//           whileTap={{ scale: 0.98 }}
//           type="submit"
//           disabled={loading}
//           className={`w-full bg-gradient-to-r from-[#155DFC] to-[#9810FA] text-white
//             px-6 py-3 rounded-[12px] font-bold text-[15.75px] font-sans
//             shadow-[0_4px_16px_0_#9810FA33] border-none
//             mt-2 mb-2 transition-colors
//             ${loading ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
//         >
//           {loading ? 'Analyzing...' : 'Get Forecast'}
//         </motion.button>
//       </form>
//       {error && <div className="text-red-500 mt-4" style={{ fontSize: '15.75px', fontFamily: 'ui-sans-serif, sans-serif' }}>{error}</div>}
//       <div className="mt-6 space-y-4">
//         {forecast && (
//           <motion.div
//             className="rounded-lg shadow-md border"
//             style={{ background: '#f3f4f6', fontFamily: 'ui-sans-serif, sans-serif', fontSize: '15.75px', color: 'black' }}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.05 }}
//           >
//             {forecast["\ud83d\udce6 Inventory Forecast Summary"] && (
//               <div className="mb-2 text-[17px] text-[#155DFC] font-semibold whitespace-pre-line font-sans">
//                 {forecast["\ud83d\udce6 Inventory Forecast Summary"]}
//               </div>
//             )}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[15.75px] text-black font-sans">
//               {forecast.SKU && <div><b>SKU:</b> {forecast.SKU}</div>}
//               {forecast["Predicted Sales"] && <div><b>Predicted Sales:</b> {forecast["Predicted Sales"]}</div>}
//               {forecast["Overstock Risk"] && <div><b>Overstock Risk:</b> {forecast["Overstock Risk"]}</div>}
//               {forecast["Suggested Action"] && <div style={{ color: 'green' }}><b>Suggested Action:</b> {forecast["Suggested Action"]}</div>}
//             </div>
//           </motion.div>
//         )}
//       </div>
//       <motion.button
//         whileHover={{ scale: 1.05, boxShadow: '0 8px 32px 0 #61868d33' }}
//         whileTap={{ scale: 0.97 }}
//         onClick={() => navigate('/inventory-predict-ai')}
//         className="w-full bg-gradient-to-r from-[#155DFC] to-[#9810FA] text-white
//            py-[15px] px-6 rounded-[16px] font-bold text-[17px] font-sans
//            shadow-[0_4px_16px_0_#9810FA33] mt-4 mb-2 text-center
//            transition-colors"
//       >
//         View Details
//       </motion.button>
//     </div>
//     </div>
//   );
// };
 
// export default InventoryPredictAI;