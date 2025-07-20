import React, {
  useState,
  useRef,
  ChangeEvent,
  FormEvent,
  MouseEvent,
  RefObject,
} from 'react';
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaCopy,
  FaDownload,
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const API_URL =
  'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/invoice%20summary';

interface ErrorMessageProps {
  error: string;
}

function ErrorMessage({ error }: ErrorMessageProps) {
  if (!error) return null;
  return (
    <div className="text-red-600 mt-4 flex items-center text-sm font-medium">
      <FaExclamationCircle className="mr-2" /> {error}
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

function InvoiceResult({
  result,
  showMenu,
  onContextMenu,
  onCopy,
  onDownload,
  menuRef,
}: InvoiceResultProps) {
  if (!result) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div
        className="mt-6 p-6 rounded-xl relative cursor-pointer group shadow-md bg-gray-50 border border-gray-200 font-sans"
        onContextMenu={onContextMenu}
        tabIndex={0}
      >
        <div className="flex items-center mb-2 text-green-700 font-semibold">
          <FaCheckCircle className="mr-2 text-green-600" />
          Invoice Processed Successfully
        </div>
        <pre className="whitespace-pre-wrap text-gray-800 text-[15px] leading-relaxed font-mono max-h-[400px] overflow-auto">
          {result}
        </pre>
        {showMenu && (
          <div
            ref={menuRef}
            className="absolute right-2 top-2 bg-white border rounded shadow z-10"
          >
            <button
              onClick={onCopy}
              className="flex items-center px-4 py-2 hover:bg-gray-100 w-full text-sm"
            >
              <FaCopy className="mr-2" /> Copy
            </button>
            <button
              onClick={onDownload}
              className="flex items-center px-4 py-2 hover:bg-gray-100 w-full text-sm"
            >
              <FaDownload className="mr-2" /> Download as TXT
            </button>
          </div>
        )}
        <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-gray-400">
          Right-click for options
        </div>
      </div>
    </motion.div>
  );
}

interface FileUploadFormProps {
  loading: boolean;
  file: File | null;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

function FileUploadForm({
  loading,
  onFileChange,
  onSubmit,
}: FileUploadFormProps) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col space-y-6">
      <label
        className="font-semibold text-[18px] text-gray-800"
        style={{ fontFamily: 'Poppins' }}
      >
        Upload Invoice (PDF/Image/Doc):
      </label>
      <input
        type="file"
        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
        onChange={onFileChange}
        className="border border-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-orange-500 file:to-red-600 file:text-white hover:file:opacity-90 rounded-md p-2 transition-all cursor-pointer text-sm"
        disabled={loading}
      />

      <button
        type="submit"
        disabled={loading}
        className={`
          w-full sm:w-1/2 mx-auto py-3 px-6
          text-white font-semibold text-lg rounded-lg
          bg-gradient-to-r from-orange-500 to-red-600
          shadow-md hover:brightness-110 transition-all
          disabled:opacity-60 disabled:cursor-not-allowed
        `}
      >
        {loading ? 'Processing...' : 'Upload & Analyze'}
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
      alert('Copied to clipboard');
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
    <div className="bg-gray-50 shadow-md max-w-4xl mx-auto mt-8 rounded-2xl p-8">
      <form onSubmit={handleSubmit} className="w-full flex flex-col md:flex-row items-end gap-4 mb-8">
        <div className="flex flex-col w-full md:w-2/3">
          <label className="block text-sm font-medium mb-1 text-black">Upload Invoice (PDF/Image/Doc):</label>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            onChange={handleFileChange}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400"
            disabled={loading}
          />
        </div>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="w-full md:w-[160px] h-[42px] text-white font-bold rounded-lg bg-[#FF620A] shadow hover:shadow-md transition-all"
          disabled={loading}
        >
          {loading ? "Loading..." : "Upload & Analyze"}
        </motion.button>
      </form>

      {result && (
        <div>
          <h2 className="text-xl font-bold text-black mb-6">Invoice Result</h2>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-2xl mb-8">
            <div className="text-black text-base whitespace-pre-line">{result}</div>
          </div>
        </div>
      )}

      {!result && !loading && (
        <p className="text-center text-gray-700">No invoice data to display.</p>
      )}

      {error && (
        <div className="mt-4 text-red-600 text-center font-medium">{error}</div>
      )}
    </div>
  );
};

export default SmartInvoiceAI;
