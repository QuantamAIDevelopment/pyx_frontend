import React, { useState, ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaGithub,
  FaExternalLinkAlt,
  FaUserCircle,
} from 'react-icons/fa';

const PR_SUMMARY_API_URL =
  'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/pr-config';

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
  user?: { login?: string };
}

const PRSummaryAgent: React.FC = () => {
  const [form, setForm] = useState({
    owner: '',
    repo: '',
    githubToken: '',
    gmail: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
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
    <div className="bg-gray-50 shadow-md max-w-4xl mx-auto mt-8 rounded-2xl p-8">
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col md:flex-row items-end gap-4 mb-8"
      >
        <div className="flex flex-col w-full md:w-1/3">
          <input
            type="text"
            name="owner"
            value={form.owner}
            onChange={handleInputChange}
            placeholder="GitHub Owner"
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div className="flex flex-col w-full md:w-1/3">
          <input
            type="text"
            name="repo"
            value={form.repo}
            onChange={handleInputChange}
            placeholder="Repository Name"
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div className="flex flex-col w-full md:w-1/3">
          <input
            type="text"
            name="githubToken"
            value={form.githubToken}
            onChange={handleInputChange}
            placeholder="GitHub Token"
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div className="flex flex-col w-full md:w-1/3">
          <input
            type="email"
            name="gmail"
            value={form.gmail}
            onChange={handleInputChange}
            placeholder="Notification Email"
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full md:w-[160px] h-[42px] text-white font-bold rounded-lg bg-[#FF620A] shadow hover:shadow-md transition-all"
          disabled={isSubmitting}
        >
          {isSubmitting ? <span>Processing...</span> : <span>Run PR Summary Agent</span>}
        </button>
        {error && (
          <div className="mt-4 text-red-600 text-center font-medium w-full">{error}</div>
        )}
      </form>
      <AnimatePresence>
        {response && !isSubmitting && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-2xl mb-8 mt-10"
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
            {response.user?.login && (
              <div className="flex items-center gap-2 mb-2">
                <FaUserCircle className="text-gray-500" />
                <span className="font-semibold">{response.user.login}</span>
              </div>
            )}
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
            <div className="mb-4 whitespace-pre-line text-gray-800 text-base border-l-4 border-blue-400 pl-4 bg-blue-50 font-poppins rounded">
              {response.body || response.summary || 'No summary available.'}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PRSummaryAgent;
