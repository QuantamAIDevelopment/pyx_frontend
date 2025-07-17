import React, { useState, ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaCheckCircle, FaExclamationTriangle, FaRobot } from 'react-icons/fa';
 
const PR_SUMMARY_API_URL = 'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/pr-config';
 
interface PRSummaryResponse {
  html_url?: string;
  _links?: {
    html?: { href?: string };
    pull_request?: { href?: string };
  };
  pull_request_url?: string;
  status?: string;
  state?: string;
  submitted_at?: string;
  timestamp?: string;
  body?: string;
  summary?: string;
}
 
interface FormState {
  owner: string;
  repo: string;
  githubToken: string;
  gmail: string;
}
 
const PRSummaryAgent: React.FC = () => {
  const [form, setForm] = useState<FormState>({
    owner: '',
    repo: '',
    githubToken: '',
    gmail: '',
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [response, setResponse] = useState<PRSummaryResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
 
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
 
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    setResponse(null);
    try {
      const res = await fetch(PR_SUMMARY_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to fetch PR summary');
      const text = await res.text();
      if (!text) throw new Error('No response received from server.');
      let data: any;
      try {
        data = JSON.parse(text);
      } catch (jsonErr) {
        throw new Error('Server response was not valid JSON.');
      }
      setResponse(Array.isArray(data) ? data[0] : data);
    } catch (err: any) {
      setError(err.message || 'Unknown error');
    } finally {
      setIsSubmitting(false);
    }
  };
 
  return (
    <div className="flex items-center justify-center min-h-[70vh] font-ui-sans-serif">
      <div className="bg-gray-100 rounded-xl shadow-md p-6 w-full max-w-3xl mx-auto">
        <div className="relative z-10 w-full max-w-2xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[42px] font-extrabold text-center mb-8 text-black drop-shadow-lg flex items-center justify-center gap-3 font-ui-sans-serif"
            style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}
          >
            <FaRobot className="inline-block text-blue-500 mb-1" /> PR Summary Agent
          </motion.h2>
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl p-4 md:p-8 space-y-6 border border-gray-200 w-full font-ui-sans-serif">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" name="owner" value={form.owner} onChange={handleInputChange} placeholder="GitHub Owner" className="bg-gray-100 rounded-lg px-4 py-3 w-full text-lg font-ui-sans-serif" required style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif', fontSize: '18px' }} />
              <input type="text" name="repo" value={form.repo} onChange={handleInputChange} placeholder="Repository Name" className="bg-gray-100 rounded-lg px-4 py-3 w-full text-lg font-ui-sans-serif" required style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif', fontSize: '18px' }} />
              <input type="text" name="githubToken" value={form.githubToken} onChange={handleInputChange} placeholder="GitHub Token" className="bg-gray-100 rounded-lg px-4 py-3 w-full text-lg font-ui-sans-serif" required style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif', fontSize: '18px' }} />
              <input type="email" name="gmail" value={form.gmail} onChange={handleInputChange} placeholder="Notification Email" className="bg-gray-100 rounded-lg px-4 py-3 w-full text-lg font-ui-sans-serif" required style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif', fontSize: '18px' }} />
            </div>
            {error && <div className="bg-red-500 text-white p-3 rounded-lg flex items-center gap-2 font-ui-sans-serif"><FaExclamationTriangle /> {error}</div>}
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 8px 32px 0 #61868d33' }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full font-bold text-white py-3 rounded-xl text-[15.75px] shadow-lg transition-colors disabled:opacity-50 font-ui-sans-serif"
              style={{
                background: 'linear-gradient(90deg, rgb(21,93,252) 0%, rgb(152,16,250) 100%)',
                fontFamily: 'ui-sans-serif, system-ui, sans-serif',
                fontSize: '15.75px',
              }}
            >
              {isSubmitting ? 'Processing...' : 'Run PR Summary Agent'}
            </motion.button>
          </form>
 
          <AnimatePresence>
            {response && !isSubmitting && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                className="mt-10 bg-gray-50 rounded-2xl p-8 shadow-inner border border-gray-200 font-ui-sans-serif"
                style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}
              >
                <h3 className="text-xl font-bold mb-4 text-center flex items-center gap-2"><FaGithub className="text-black" /> PR # Summary</h3>
                {/* GitHub Review Link */}
                {(response.html_url || (response._links && response._links.html && response._links.html.href)) && (
                  <div className="flex items-center gap-3 mb-2">
                    <FaGithub className="text-black text-2xl" />
                    <a href={response.html_url || response._links?.html?.href} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline flex items-center gap-1">
                      View Review <span className="sr-only">(opens in new tab)</span>
                    </a>
                  </div>
                )}
                {/* PR Open Link */}
                {(response.pull_request_url || (response._links && response._links.pull_request && response._links.pull_request.href)) && (
                  <div className="mb-2">
                    <b>PR Link:</b> <a href={response.pull_request_url ? response.pull_request_url.replace('api.github.com/repos', 'github.com').replace('/pulls/', '/pull/') : response._links?.pull_request?.href} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Open PR</a>
                  </div>
                )}
                <div className="mb-2"><b>Status:</b> <span className={response.status === 'success' || response.state === 'COMMENTED' ? 'text-green-600' : 'text-red-600'}>{response.status || response.state}</span></div>
                <div className="mb-2"><b>Timestamp:</b> {response.submitted_at && !isNaN(Date.parse(response.submitted_at)) ? new Date(response.submitted_at).toLocaleString() : (response.timestamp && !isNaN(Date.parse(response.timestamp)) ? new Date(response.timestamp).toLocaleString() : 'N/A')}</div>
                <div className="mb-4 whitespace-pre-line text-gray-800 text-base border-l-4 border-blue-400 pl-4 bg-blue-50 rounded">
                  {response.body || response.summary || 'No summary available.'}
                </div>
                {/* Example: Summarize PDF Button (if needed) */}
                <button
                  className="mt-4 font-bold text-white py-3 rounded-xl text-[15.75px] w-full font-ui-sans-serif"
                  style={{
                    background: 'linear-gradient(90deg, rgb(21,93,252) 0%, rgb(152,16,250) 100%)',
                    fontFamily: 'ui-sans-serif, system-ui, sans-serif',
                    fontSize: '15.75px',
                  }}
                >
                  Summarize PDF
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
 
export default PRSummaryAgent;