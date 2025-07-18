// import React, { useState, ChangeEvent, FormEvent } from 'react';
// import { FaFilePdf, FaSpinner } from 'react-icons/fa';
// // import { uploadPdfAndGetSummary } from '../../services/workflows/pdfSummarizer';
 
// interface PdfSummaryResult {
//   text: string;
//   [key: string]: any;
// }
 
// const PdfSummarizer: React.FC = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [email, setEmail] = useState<string>('');
//   const [summary, setSummary] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
 
//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = e.target.files?.[0] || null;
//     setFile(selectedFile);
//     setSummary(null);
//     setError(null);
//   };
 
//   const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setEmail(e.target.value);
//   };
 
//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!file) {
//       setError('Please select a PDF file.');
//       return;
//     }
//     if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
//       setError('Please enter a valid email address.');
//       return;
//     }
//     setLoading(true);
//     setError(null);
//     setSummary(null);
//     try {
//       const result: PdfSummaryResult[] = await uploadPdfAndGetSummary(file, email);
//       setSummary(result[0]?.text || 'No summary found.');
//     } catch (err) {
//       setError('Failed to summarize PDF. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };
 
//   return (
//     <div className="max-w-xl mx-auto bg-gray-100 rounded-lg shadow-md p-8 mt-8 text-[15.75px] font-sans">
//       {/* Header */}
//       <div className="flex items-center space-x-3 mb-4">
//         <FaFilePdf className="w-10 h-10 text-red-500" />
//         <h2 className="text-[42px] font-bold leading-tight text-black">PDF Summarizer</h2>
//       </div>
 
//       {/* Form */}
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <input
//           type="file"
//           accept="application/pdf"
//           onChange={handleFileChange}
//           className="block w-full text-[15.75px] text-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 py-3 px-4"
//         />
 
//         <input
//           type="email"
//           value={email}
//           onChange={handleEmailChange}
//           placeholder="Enter your email to receive the summary"
//           className="block w-full text-[15.75px] text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 py-3 px-4"
//         />
 
//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full py-3 rounded-lg font-semibold flex items-center justify-center text-white text-[15.75px] shadow-md bg-gradient-to-r from-[#155dfc] to-[#9810fa] disabled:opacity-60"
//         >
//           {loading && <FaSpinner className="animate-spin mr-2" />}
//           Summarize PDF
//         </button>
//       </form>
 
//       {/* Error Message */}
//       {error && (
//         <div className="mt-4 text-red-600 text-[15.75px]">{error}</div>
//       )}
 
//       {/* Summary Output */}
//       {summary && (
//         <div className="mt-6 bg-gray-50 p-4 rounded-lg border text-gray-800 whitespace-pre-line text-[15.75px]">
//           {summary}
//         </div>
//       )}
//     </div>
//   );
// };
 
// export default PdfSummarizer;