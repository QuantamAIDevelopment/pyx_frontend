import React, { useState, useRef, ChangeEvent, FormEvent, MouseEvent, RefObject } from 'react';
import { FaFileUpload, FaCheckCircle, FaExclamationCircle, FaCopy, FaDownload } from 'react-icons/fa';
 
const API_URL = 'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/invoice%20summary';
 
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
 
interface InvoiceResultProps {
  result: string;
  showMenu: boolean;
  onContextMenu: (e: MouseEvent<HTMLDivElement>) => void;
  onCopy: () => void;
  onDownload: () => void;
  menuRef: RefObject<HTMLDivElement>;
}
 
function InvoiceResult({ result, showMenu, onContextMenu, onCopy, onDownload, menuRef }: InvoiceResultProps) {
  if (!result) return null;
  return (
    <div
      className="mt-6 p-6 rounded-lg relative cursor-pointer group shadow-md"
      style={{ background: '#f3f4f6' }}
      onContextMenu={onContextMenu}
      tabIndex={0}
    >
      <div className="flex items-center mb-2 text-green-700 font-semibold">
        <FaCheckCircle className="mr-2" /> Invoice Processed Successfully
      </div>
      <pre className="whitespace-pre-wrap text-gray-800 text-lg" style={{ fontFamily: 'sans-serif' }}>{result}</pre>
      {showMenu && (
        <div ref={menuRef} className="absolute right-2 top-2 bg-white border rounded shadow z-10">
          <button onClick={onCopy} className="flex items-center px-4 py-2 hover:bg-gray-100 w-full" style={{ fontFamily: 'sans-serif', fontSize: '15.75px' }}><FaCopy className="mr-2" />Copy</button>
          <button onClick={onDownload} className="flex items-center px-4 py-2 hover:bg-gray-100 w-full" style={{ fontFamily: 'sans-serif', fontSize: '15.75px' }}><FaDownload className="mr-2" />Download as TXT</button>
        </div>
      )}
      <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-gray-400">Right-click for options</div>
    </div>
  );
}
 
interface FileUploadFormProps {
  loading: boolean;
  file: File | null;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}
 
function FileUploadForm({ loading, file, onFileChange, onSubmit }: FileUploadFormProps) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col space-y-4">
      <label className="font-semibold" style={{ fontFamily: 'sans-serif', fontSize: '20px' }}>Upload Invoice (PDF/Image/Doc):</label>
      <input
        type="file"
        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
        onChange={onFileChange}
        className="border p-6 rounded text-base placeholder-gray-400"
        style={{ fontFamily: 'sans-serif', fontSize: '20px' }}
        disabled={loading}
        placeholder="Choose a file..."
      />
      <button
  type="submit"
  disabled={loading || !file}
  className={`
    flex items-center justify-center w-full
    px-6 py-3 rounded shadow-md
    text-white text-[15.75px] font-sans font-semibold
    bg-gradient-to-r from-[#155DFC] to-[#9810FA]
    transition-opacity
    ${loading || !file ? 'opacity-60 cursor-not-allowed' : 'opacity-100 cursor-pointer'}
  `}
>
  <FaFileUpload className="mr-2" /> {loading ? 'Processing...' : 'Upload & Analyze'}
</button>
 
    </form>
  );
}
 
const SmartInvoiceAI: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
 
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
    if (!file) {
      setError('Please select an invoice file to upload.');
      return;
    }
    setLoading(true);
    setError('');
    setResult('');
    try {
      const formData = new FormData();
      formData.append('invoice', file);
      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData,
      });
      const text = await response.text();
      if (!response.ok) throw new Error(text || 'Failed to process invoice.');
      setResult(text);
    } catch (err: any) {
      setError(err.message || 'Failed to process invoice.');
    } finally {
      setLoading(false);
    }
  };
 
  const handleContextMenu = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setShowMenu(true);
    const clickHandler = () => setShowMenu(false);
    document.addEventListener('click', clickHandler, { once: true });
  };
 
  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result);
    }
    setShowMenu(false);
  };
 
  const handleDownload = () => {
    if (!result) return;
    const blob = new Blob([result], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'invoice-summary.txt';
    a.click();
    URL.revokeObjectURL(url);
    setShowMenu(false);
  };
 
  return (
    <div className="max-w-xl mx-auto p-6 rounded-xl shadow-md space-y-8" style={{ background: '#f3f4f6' }}>
      <div className="flex items-center space-x-3 mb-4">
        <div className="bg-blue-500 p-3 rounded-full shadow">
          <FaFileUpload className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-[42px] font-sans text-black m-0 p-0 font-bold">
  SmartInvoice AI
</h2>
 
      </div>
      <FileUploadForm loading={loading} file={file} onFileChange={handleFileChange} onSubmit={handleSubmit} />
      <ErrorMessage error={error} />
      <InvoiceResult
        result={result}
        showMenu={showMenu}
        onContextMenu={handleContextMenu}
        onCopy={handleCopy}
        onDownload={handleDownload}
        menuRef={menuRef}
      />
    </div>
  );
};
 
export default SmartInvoiceAI;