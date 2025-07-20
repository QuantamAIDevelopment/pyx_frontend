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
  fileType?: string;
  startTime?: string;
  endTime?: string;
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
      let data: ApiResponse;
      try {
        data = await res.json();
      } catch (e) {
        setError('Invalid JSON response from server');
        return;
      }
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
    <div className="bg-gray-50 shadow-md max-w-4xl mx-auto mt-8 rounded-2xl p-8">
      <form onSubmit={handleSubmit} className="w-full flex flex-col md:flex-row md:flex-wrap gap-4 mb-8">
        <div className="flex flex-col w-full md:w-1/3">
          <label className="block text-sm font-medium mb-1 text-black">Email</label>
          <input type="email" name="email" value={form.email} onChange={handleInputChange} className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400" required />
        </div>
        <div className="flex flex-col w-full md:w-1/3">
          <label className="block text-sm font-medium mb-1 text-black">Name</label>
          <input type="text" name="Name" value={form.Name} onChange={handleInputChange} className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400" required />
        </div>
        <div className="flex flex-col w-full md:w-1/3">
          <label className="block text-sm font-medium mb-1 text-black">Subject</label>
          <input type="text" name="Subject" value={form.Subject} onChange={handleInputChange} className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400" required />
        </div>
        <div className="flex flex-col w-full md:w-1/3">
          <label className="block text-sm font-medium mb-1 text-black">Message ID</label>
          <input type="text" name="messageId" value={form.messageId} onChange={handleInputChange} className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400" />
        </div>
        <div className="flex flex-col w-full md:w-1/3">
          <label className="block text-sm font-medium mb-1 text-black">ID (Optional)</label>
          <input type="text" name="id" value={form.id} onChange={handleInputChange} className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400" />
        </div>
        <div className="flex flex-col w-full md:w-1/3">
          <label className="block text-sm font-medium mb-1 text-black">Files</label>
          <input type="file" name="files" multiple onChange={handleFileChange} className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400" required />
        </div>
        <button
          type="submit"
          className="w-full md:w-[160px] h-[42px] text-white font-bold rounded-lg bg-[#FF620A] shadow hover:shadow-md transition-all"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Processing...' : 'Submit'}
        </button>
        {error && <div className="mt-4 text-red-600 text-center font-medium w-full">{error}</div>}
      </form>
      {response && (
        <div className="bg-white rounded-2xl shadow-xl p-8 mt-8">
          <h2 className="text-xl font-bold text-center mb-8 tracking-tight">Processing Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="font-bold text-lg text-black mb-2">Submission Details</div>
              <div className="text-base text-black mb-1">Name: <span>{response?.Name || form.Name}</span></div>
              <div className="text-base text-black mb-1">Email: <span>{response?.SenderEmail || form.email}</span></div>
              <div className="text-base text-black">Subject: <span>{response?.Subject || form.Subject}</span></div>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="font-bold text-lg text-black mb-2">Processing Stats</div>
              <div className="flex gap-6 flex-wrap">
                <div className="text-green-700 text-base">Processed: <span>{response?.stats?.processedAttachments || 0}</span></div>
                <div className="text-blue-700 text-base">In Progress: <span>{response?.stats?.processingAttachments || 0}</span></div>
                <div className="text-red-700 text-base">Failed: <span>{response?.stats?.failedAttachments || 0}</span></div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="font-bold text-lg text-black mb-2">Expected Documents</div>
              <ul className="list-disc list-inside text-base text-black">
                {(response?.expected || []).map((doc, i) => (
                  <li key={i}>{doc}</li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="font-bold text-lg text-black mb-2">Received Files</div>
              <ul className="list-disc list-inside text-base text-black">
                {(response?.received_files || []).map((file, i) => (
                  <li key={i}>{file}</li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="font-bold text-lg text-black mb-2">Missing Documents</div>
              <ul className="list-disc list-inside text-base text-red-600">
                {(response?.missing || []).map((doc, i) => (
                  <li key={i}>{doc}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-8">
            <div className="font-bold text-lg text-black mb-2">Attachment Processing Status</div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-black border border-gray-200 rounded-xl overflow-hidden">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left text-black">File Name</th>
                    <th className="px-4 py-2 text-left text-black">File Type</th>
                    <th className="px-4 py-2 text-left text-black">Status</th>
                    <th className="px-4 py-2 text-left text-black">Start Time</th>
                    <th className="px-4 py-2 text-left text-black">End Time</th>
                  </tr>
                </thead>
                <tbody>
                  {(response?.processingStatus || []).map((item, i) => (
                    <tr key={i} className="border-t border-gray-200">
                      <td className="px-4 py-2 text-black">{item.fileName}</td>
                      <td className="px-4 py-2 text-black">{item.fileType || '-'}</td>
                      <td className="px-4 py-2 text-black">{item.status}</td>
                      <td className="px-4 py-2 text-black">{item.startTime || '-'}</td>
                      <td className="px-4 py-2 text-black">{item.endTime || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full mt-4">
              <div
                className="h-2 bg-purple-500 rounded-full"
                style={{
                  width: `${
                    ((response?.stats?.processedAttachments || 0) /
                      ((response?.stats?.processedAttachments || 0) +
                        (response?.stats?.processingAttachments || 0) +
                        (response?.stats?.failedAttachments || 0) || 1)) * 100
                  }%`
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailAttachmentProcessing; 