import React, { useState, ChangeEvent, FormEvent } from 'react';


import { BUTTON_CLASSES } from '../utils/colors';

const EMAIL_ATTACHMENT_API_URL = 'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/upload-files';

interface EmailAttachmentProcessingProps {
  compact?: boolean;
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

const EmailAttachmentProcessing: React.FC<EmailAttachmentProcessingProps> = ({ }) => {
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
    } catch (err: any) {
      setError(err.message || 'Unknown error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 shadow-md max-w-4xl mx-auto mt-8 rounded-2xl p-8">
     <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
  <div>
    <label className="block text-sm font-medium mb-1 text-black">Email</label>
    <input
      type="email"
      name="email"
      value={form.email}
      onChange={handleInputChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400"
      required
    />
  </div>
  <div>
    <label className="block text-sm font-medium mb-1 text-black">Name</label>
    <input
      type="text"
      name="Name"
      value={form.Name}
      onChange={handleInputChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400"
      required
    />
  </div>
  <div>
    <label className="block text-sm font-medium mb-1 text-black">Subject</label>
    <input
      type="text"
      name="Subject"
      value={form.Subject}
      onChange={handleInputChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400"
      required
    />
  </div>
  <div>
    <label className="block text-sm font-medium mb-1 text-black">Message ID</label>
    <input
      type="text"
      name="messageId"
      value={form.messageId}
      onChange={handleInputChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400"
    />
  </div>
  <div>
    <label className="block text-sm font-medium mb-1 text-black">ID (Optional)</label>
    <input
      type="text"
      name="id"
      value={form.id}
      onChange={handleInputChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400"
    />
  </div>
  <div>
    <label className="block text-sm font-medium mb-1 text-black">Files</label>
    <input
      type="file"
      name="files"
      multiple
      onChange={handleFileChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400"
      required
    />
  </div>
  <div className="md:col-span-2 flex justify-end">
    <button
      type="submit"
      className={`w-full md:w-[200px] h-[44px] ${BUTTON_CLASSES.PRIMARY}`}
      disabled={isSubmitting}
    >
      {isSubmitting ? 'Processing...' : 'Submit'}
    </button>
  </div>
  {error && (
    <div className="md:col-span-2 text-red-600 text-center font-medium">{error}</div>
  )}
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