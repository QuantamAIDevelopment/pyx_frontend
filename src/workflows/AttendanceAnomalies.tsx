import React, { useState, ChangeEvent, FormEvent, MouseEvent } from 'react';
import { FaFileCsv,  FaExclamationCircle, FaCopy, FaDownload } from 'react-icons/fa';
import PageRevealWrapper from './PageRevealWrapper';
 
interface ErrorMessageProps {
  error: string;
}
 
function ErrorMessage({ error }: ErrorMessageProps) {
  if (!error) return null;
  return (
    <div className="text-red-500 mt-4 flex items-center">
      <FaExclamationCircle className="mr-2" />{error}
    </div>
  );
}
 
interface ResponseResultProps {
  result: string;
  showMenu: boolean;
  onContextMenu: (e: MouseEvent<HTMLDivElement>) => void;
  onCopy: () => void;
  onDownload: () => void;
}
 
function ResponseResult({ result, showMenu, onContextMenu, onCopy, onDownload }: ResponseResultProps) {
  if (!result) return null;
  return (
    <div
      className="mt-6 p-4 border rounded-lg bg-gray-50 relative cursor-pointer group"
      onContextMenu={onContextMenu}
      tabIndex={0}
    >
      <div className="flex items-center mb-2 text-green-700 font-semibold">
        <FaFileCsv className="mr-2" /> Attendance Anomalies Result
      </div>
      <pre className="whitespace-pre-wrap text-gray-800 text-sm" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '15.75px' }}>{result}</pre>
      {showMenu && (
        <div className="absolute right-2 top-2 bg-white border rounded shadow z-10">
          <button onClick={onCopy} className="flex items-center px-4 py-2 hover:bg-gray-100 w-full"><FaCopy className="mr-2" />Copy</button>
          <button onClick={onDownload} className="flex items-center px-4 py-2 hover:bg-gray-100 w-full"><FaDownload className="mr-2" />Download as TXT</button>
        </div>
      )}
      <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-gray-400">Right-click for options</div>
    </div>
  );
}
 
// Updated endpoint to match your cURL command, URL-encoded
const API_URL ='https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/attandance%20anomiles%20-%20Sheet1%20(1).csv';
const AttendanceAnomalies: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [result, setResult] = useState<string>('');
 
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    } else {
      setFile(null);
    }
    setResult('');
    setError('');
  };
 
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult('');
    if (!file) {
      setError('Please upload a CSV file.');
      setLoading(false);
      return;
    }
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/csv',
          'attendace-path': 'application/json',
        },
        body: file,
      });
      const text = await response.text();
      if (!response.ok) throw new Error(text || 'Failed to process attendance anomalies.');
      setResult(text);
    } catch (err: any) {
      setError(err.message || 'Failed to process attendance anomalies.');
    } finally {
      setLoading(false);
    }
  };
 
  const handleContextMenu = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    // setShowMenu(true); // This line was removed as per the edit hint
    const clickHandler = () => {
      // setShowMenu(false); // This line was removed as per the edit hint
    };
    document.addEventListener('click', clickHandler, { once: true });
  };
 
  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result);
    }
    // setShowMenu(false); // This line was removed as per the edit hint
  };
 
  const handleDownload = () => {
    if (result) {
      const blob = new Blob([result], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'attendance-anomalies-response.txt';
      a.click();
      URL.revokeObjectURL(url);
    }
    // setShowMenu(false); // This line was removed as per the edit hint
  };
 
  return (
    <PageRevealWrapper
      heading="Attendance Anomalies Detection"
      description="Upload your attendance CSV to detect anomalies and escalate feedback to HR."
      details=""
      coverImage=""
    >
      <div className="max-w-2xl mx-auto p-10 bg-gray-200 mt-8 rounded-3xl shadow-md space-y-8">
        <div className="flex items-center space-x-3 mb-4 justify-center">
          <h2 className="text-[42px] font-sans font-bold text-black m-0 p-0 text-center">
  Attendance Anomalies
</h2>
 
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 items-center">
          <label className="font-semibold" style={{ fontSize: '20px' }}>Upload Attendance CSV:</label>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="border p-2 rounded text-lg bg-white"
            style={{ fontSize: '18px' }}
            required
          />
   <button
  type="submit"
  disabled={loading}
  className={`
    flex items-center justify-center
    text-white font-bold font-[poppins] text-[16.41px]
    h-[31.5px] px-[14px] py-[21px]
    rounded-[8px] shadow-[0_2px_8px_rgba(0,0,0,0.10)]
    transition-opacity duration-200 ease-in-out
    ${loading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
  `}
  style={{
    background: 'linear-gradient(90deg, #FF620A 0%, #993B06 100%)',
  }}
>
  {loading ? 'Submitting...' : 'Run Workflow'}
</button>
 
 
        </form>
        <ErrorMessage error={error} />
        <ResponseResult
          result={result}
          showMenu={false} // This prop is now hardcoded to false as per the edit hint
          onContextMenu={handleContextMenu}
          onCopy={handleCopy}
          onDownload={handleDownload}
        />
      </div>
    </PageRevealWrapper>
  );
};
 
export default AttendanceAnomalies;
 