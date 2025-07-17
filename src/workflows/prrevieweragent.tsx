import React, { useState, ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaGithub,
  FaExclamationTriangle,
  FaRobot,
  FaUserCircle,
  FaExternalLinkAlt,
} from 'react-icons/fa';
 
const PR_REVIEWER_API_URL =
  'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/PR_rewiewer';
 
// Define a type for the response if possible
interface PRReviewResponse {
  html_url?: string;
  _links?: {
    html?: { href: string };
    pull_request?: { href: string };
  };
  user?: { login?: string };
  state?: string;
  status?: string;
  submitted_at?: string;
  timestamp?: string;
  pull_request_url?: string;
  body?: string;
  summary?: string;
}
 
const PRReviewerAIAgent: React.FC = () => {
  const [form, setForm] = useState<{
    owner: string;
    repo: string;
    githubToken: string;
    gmail: string;
  }>({
    owner: '',
    repo: '',
    githubToken: '',
    gmail: '',
  });
 
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [response, setResponse] = useState<PRReviewResponse | null>(null);
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
      const res = await fetch(PR_REVIEWER_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
 
      if (!res.ok) throw new Error('Failed to fetch PR review');
 
      const text = await res.text();
      if (!text) throw new Error('No response received from server.');
 
      let data;
      try {
        data = JSON.parse(text);
      } catch {
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
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="bg-gray-100 rounded-xl shadow-md p-6 w-full max-w-3xl mx-auto">
        <div className="w-full max-w-2xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[42px] font-extrabold text-center mb-8 flex items-center justify-center gap-3 font-sans text-black"
            style={{ fontFamily: 'ui-sans-serif', color: 'black' }}
          >
            <FaRobot className="text-blue-500 mb-1" />
            PR Reviewer AI Agent
          </motion.h2>
 
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-2xl p-4 md:p-8 space-y-6 border border-gray-200 w-full"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="owner"
                value={form.owner}
                onChange={handleInputChange}
                placeholder="GitHub Owner"
                className="bg-gray-100 rounded-lg px-6 py-4 w-full text-[18px] font-sans placeholder:text-[18px] placeholder:font-sans"
                style={{ fontFamily: 'ui-sans-serif' }}
                required
              />
              <input
                type="text"
                name="repo"
                value={form.repo}
                onChange={handleInputChange}
                placeholder="Repository Name"
                className="bg-gray-100 rounded-lg px-6 py-4 w-full text-[18px] font-sans placeholder:text-[18px] placeholder:font-sans"
                style={{ fontFamily: 'ui-sans-serif' }}
                required
              />
              <input
                type="text"
                name="githubToken"
                value={form.githubToken}
                onChange={handleInputChange}
                placeholder="GitHub Token"
                className="bg-gray-100 rounded-lg px-6 py-4 w-full text-[18px] font-sans placeholder:text-[18px] placeholder:font-sans"
                style={{ fontFamily: 'ui-sans-serif' }}
                required
              />
              <input
                type="email"
                name="gmail"
                value={form.gmail}
                onChange={handleInputChange}
                placeholder="Notification Email"
                className="bg-gray-100 rounded-lg px-6 py-4 w-full text-[18px] font-sans placeholder:text-[18px] placeholder:font-sans"
                style={{ fontFamily: 'ui-sans-serif' }}
                required
              />
            </div>
 
            {error && (
              <div className="bg-red-500 text-white p-3 rounded-lg flex items-center gap-2">
                <FaExclamationTriangle />
                {error}
              </div>
            )}
 
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full font-bold text-lg shadow-lg transition-colors disabled:opacity-50 font-sans text-white py-3 rounded-xl"
              style={{
                background: 'linear-gradient(90deg, rgb(21,93,252) 0%, rgb(152,16,250) 100%)',
                fontFamily: 'ui-sans-serif',
                fontSize: '15.75px',
              }}
            >
              {isSubmitting ? (
                <span>Processing...</span>
              ) : (
                <span>Run PR Reviewer Agent</span>
              )}
            </motion.button>
          </form>
 
          <AnimatePresence>
            {response && !isSubmitting && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                className="mt-10 bg-gray-50 rounded-2xl p-8 shadow-inner border border-gray-200"
              >
                <div className="flex items-center gap-3 mb-4">
                  <FaGithub className="text-black text-2xl" />
                  <a
                    href={response.html_url || response._links?.html?.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline flex items-center gap-1"
                  >
                    View Review <FaExternalLinkAlt className="inline-block text-xs" />
                  </a>
                </div>
 
                <div className="flex items-center gap-2 mb-2">
                  <FaUserCircle className="text-gray-500" />
                  <span className="font-semibold">{response.user?.login}</span>
                </div>
 
                <div className="mb-2">
                  <b>Status:</b>{' '}
                  <span
                    className={
                      response.state === 'COMMENTED' || response.status === 'success'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }
                  >
                    {response.state || response.status}
                  </span>
                </div>
 
                <div className="mb-2">
                  <b>Submitted At:</b>{' '}
                  {response.submitted_at && !isNaN(Date.parse(response.submitted_at))
                    ? new Date(response.submitted_at).toLocaleString()
                    : response.timestamp && !isNaN(Date.parse(response.timestamp))
                    ? new Date(response.timestamp).toLocaleString()
                    : 'N/A'}
                </div>
 
                <div className="mb-2">
                  <b>PR Link:</b>{' '}
                  <a
                    href={
                      response.pull_request_url
                        ? response.pull_request_url
                            .replace('api.github.com/repos', 'github.com')
                            .replace('/pulls/', '/pull/')
                        : response._links?.pull_request?.href || '#'
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Open PR
                  </a>
                </div>
 
                <div className="mb-4 whitespace-pre-line text-gray-800 text-base border-l-4 border-blue-400 pl-4 bg-blue-50 rounded">
                  {response.body || response.summary || 'No summary available.'}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
 
export default PRReviewerAIAgent;