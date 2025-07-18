import React, { useState, ChangeEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPaperclip, FaCheckCircle, FaExclamationCircle, FaFileAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
 
const EMAIL_ATTACHMENT_API_URL = 'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/upload-files';
 
interface EmailAttachmentProcessingProps {
  compact?: boolean;
}
 
interface Stats {
  processedAttachments: number;
  processingAttachments: number;
  failedAttachments: number;
  totalDocuments: number;
}
 
interface ProcessingStatusItem {
  fileName: string;
  status: string;
  error?: string;
}
 
interface ApiResponse {
  Name?: string;
  Subject?: string;
  SenderEmail?: string;
  messageId?: string;
  stats?: {
    processedAttachments?: number;
    processingAttachments?: number;
    failedAttachments?: number;
  };
  expected?: string[];
  received_files?: string[];
  missing?: string[];
  processingStatus?: ProcessingStatusItem[];
}
 
interface FormState {
  email: string;
  Name: string;
  Subject: string;
  messageId: string;
  id: string;
  files: File[];
}
 
const EmailAttachmentProcessing: React.FC<EmailAttachmentProcessingProps> = ({ compact = false }) => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<Stats>({
    processedAttachments: 0,
    processingAttachments: 0,
    failedAttachments: 0,
    totalDocuments: 0,
  });
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>({
    email: '',
    Name: '',
    Subject: '',
    messageId: '',
    id: '',
    files: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
 
  const statList = [
    { title: 'Processed Attachments', value: stats.processedAttachments, icon: FaCheckCircle, color: 'bg-green-500' },
    { title: 'Processing', value: stats.processingAttachments, icon: FaPaperclip, color: 'bg-yellow-500' },
    { title: 'Failed', value: stats.failedAttachments, icon: FaExclamationCircle, color: 'bg-red-500' },
    { title: 'Total Documents', value: stats.totalDocuments, icon: FaFileAlt, color: 'bg-blue-500' },
  ];
 
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
 
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setForm((prev) => ({ ...prev, files: Array.from(e.target.files!) }));
    }
  };
 
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    setResponse(null);
    try {
      const formData = new FormData();
      form.files.forEach((file) => formData.append('files', file));
      formData.append('email', form.email);
      formData.append('Name', form.Name);
      formData.append('Subject', form.Subject);
      formData.append('messageId', form.messageId);
      formData.append('id', form.id);
      const res = await fetch(EMAIL_ATTACHMENT_API_URL, {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Failed to process attachments');
      const data: ApiResponse = await res.json();
      setResponse(data);
      setStats({
        processedAttachments: data.stats?.processedAttachments || 0,
        processingAttachments: data.stats?.processingAttachments || 0,
        failedAttachments: data.stats?.failedAttachments || 0,
        totalDocuments: (data.stats?.processedAttachments || 0) + (data.stats?.processingAttachments || 0) + (data.stats?.failedAttachments || 0),
      });
    } catch (err: any) {
      setError(err.message || 'Unknown error');
    } finally {
      setIsSubmitting(false);
    }
  };
 
  interface StatCardProps {
    title: string;
    value: number;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
  }
 
  const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color }) => (
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
    <div style={{ fontFamily: 'ui-sans-serif', fontSize: '15.75px' }} className={compact ? "space-y-4 w-full overflow-hidden" : "space-y-8 w-full"}>
      <div className={compact ? "flex items-center space-x-2 mb-1" : "flex items-center space-x-4 mb-2"}>
        <div className={compact ? "bg-blue-500 p-2 rounded-lg shadow-md" : "bg-blue-500 p-3 rounded-lg shadow-md"}>
          <FaEnvelope className={compact ? "w-5 h-5 text-white" : "w-6 h-6 text-white"} />
        </div>
        <h2  className="font-display font-bold text-[42px] text-black font-sans leading-[1.1]"
        >
       
          Email Attachment Processing
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="bg-gray-100 border border-gray-200 rounded-2xl p-4 shadow-md space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="email" name="email" value={form.email} onChange={handleInputChange} placeholder="Sender Email" className="bg-gray-200 rounded-lg px-6 py-4 w-full placeholder:text-base placeholder:font-medium placeholder:text-gray-500" style={{ fontSize: '17px', fontFamily: 'ui-sans-serif' }} required />
          <input type="text" name="Name" value={form.Name} onChange={handleInputChange} placeholder="Sender Name" className="bg-gray-200 rounded-lg px-6 py-4 w-full placeholder:text-base placeholder:font-medium placeholder:text-gray-500" style={{ fontSize: '17px', fontFamily: 'ui-sans-serif' }} required />
          <input type="text" name="Subject" value={form.Subject} onChange={handleInputChange} placeholder="Subject" className="bg-gray-200 rounded-lg px-6 py-4 w-full placeholder:text-base placeholder:font-medium placeholder:text-gray-500" style={{ fontSize: '17px', fontFamily: 'ui-sans-serif' }} required />
          <input type="text" name="messageId" value={form.messageId} onChange={handleInputChange} placeholder="Message ID" className="bg-gray-200 rounded-lg px-6 py-4 w-full placeholder:text-base placeholder:font-medium placeholder:text-gray-500" style={{ fontSize: '17px', fontFamily: 'ui-sans-serif' }} />
          <input type="text" name="id" value={form.id} onChange={handleInputChange} placeholder="ID (optional)" className="bg-gray-200 rounded-lg px-6 py-4 w-full placeholder:text-base placeholder:font-medium placeholder:text-gray-500" style={{ fontSize: '17px', fontFamily: 'ui-sans-serif' }} />
          <input type="file" name="files" multiple onChange={handleFileChange} className="w-full" style={{ fontSize: '17px', fontFamily: 'ui-sans-serif' }} required />
        </div>
        {error && <div className="bg-red-500 text-white p-2 rounded-lg">{error}</div>}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 rounded-xl font-bold text-[15.75px] text-white font-sans shadow-md bg-gradient-to-r from-[#155DFC] to-[#9810FA]"
        >
          {isSubmitting ? 'Processing...' : 'Upload & Process'}
        </motion.button>
      </form>
      <div className={compact ? "flex gap-2 w-full overflow-x-auto" : "grid grid-cols-2 gap-4 w-full mt-6"}>
        {statList.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>
      {response && (
        <div className="mt-6 bg-gray-50 rounded-2xl p-4 shadow-md border border-gray-200 font-sans">
          <h4 className="font-bold mb-2">Processing Result</h4>
          <div className="mb-2"><b>Name:</b> {response.Name}</div>
          <div className="mb-2"><b>Subject:</b> {response.Subject}</div>
          <div className="mb-2"><b>Sender Email:</b> {response.SenderEmail}</div>
          <div className="mb-2"><b>Message ID:</b> {response.messageId}</div>
          <div className="mb-2"><b>Processed Attachments:</b> {response.stats?.processedAttachments}</div>
          <div className="mb-2"><b>Failed Attachments:</b> {response.stats?.failedAttachments}</div>
          <div className="mb-2"><b>Expected Files:</b> {response.expected?.join(', ')}</div>
          <div className="mb-2"><b>Received Files:</b> {response.received_files?.join(', ')}</div>
          <div className="mb-2"><b>Missing Files:</b> {response.missing?.join(', ')}</div>
          <div className="mb-2"><b>Processing Status:</b></div>
          <ul className="list-disc ml-6">
            {response.processingStatus?.map((item, idx) => (
              <li key={idx} className="mb-1">
                <b>{item.fileName}</b> - {item.status} {item.error && <span className="text-red-500">({item.error})</span>}
              </li>
            ))}
          </ul>
        </div>
      )}
      { <motion.button
        whileHover={{ scale: 1.05, boxShadow: '0 8px 32px 0 #61868d33' }}
        whileTap={{ scale: 0.97 }}
        onClick={() => navigate('/workflows/email-attachment')}
        className={`w-full font-bold text-white font-sans shadow-md transition-colors
            bg-gradient-to-r from-[#155DFC] to-[#9810FA]
            hover:from-blue-600 hover:to-yellow-600
            ${compact ? 'py-2 rounded-lg text-[17px]' : 'py-3 rounded-xl text-[17px] mt-4'}`}
      >
        View Details
      </motion.button> }
    </div>
    </div>
  );
};
 
export default EmailAttachmentProcessing;