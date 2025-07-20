import React, { useState} from 'react';
// import { motion } from 'framer-motion';
import { FaSync, FaCheckCircle, FaExclamationTriangle, FaClock, FaDownload } from 'react-icons/fa';
 
const API_URL = 'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/details-sync';
 
type Candidate = {
  'Candidate ID': string;
  Name: string;
  Email?: string;
  'ATS Status'?: string;
  hrmsStatus?: string;
  Notes?: string;
  processedAt?: string;
  action?: string;
  reason?: string;
};
 
type SyncStatusRow = {
  profileId: string;
  status: string;
  message: string;
  type: string;
};
 
type MainResult = {
  stats: {
    syncedProfiles: number;
    skippedRecords: number;
    pendingSync: number;
    failedSync: number;
  };
  syncStatus: SyncStatusRow[];
};
 
type SummaryCounts = {
  synced?: number;
  skipped?: number;
  review?: number;
  pending?: number;
  error?: number;
};
 
const statusColor = (status?: string) => {
  if (!status) return '';
  if (status.toLowerCase().includes('onboarding')) return 'bg-green-100 text-green-800';
  if (status.toLowerCase().includes('pending')) return 'bg-yellow-100 text-yellow-800';
  if (status.toLowerCase().includes('disqualified') || status.toLowerCase().includes('unknown')) return 'bg-red-100 text-red-800';
  if (status.toLowerCase().includes('interview')) return 'bg-blue-100 text-blue-800';
  return 'bg-gray-100 text-gray-800';
};
 
const ATS_TO_HRMS_CANDIDATE_StatusSync: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [syncData, setSyncData] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showLoader, setShowLoader] = useState<boolean>(false);
 
  const handleSync = async () => {
    if (!selectedFile) {
      setError('Please select a CSV file to upload.');
      return;
    }
    setLoading(true);
    setShowLoader(true);
    setError(null);
    setSyncData(null);
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      const data = await response.json();
      setSyncData(data);
    } catch (err: any) {
      setError(err.message || 'Failed to sync.');
    } finally {
      setLoading(false);
      setShowLoader(false);
    }
  };
 
  // Find the main result and candidates flexibly
  let mainResult: MainResult | null = null;
  let candidates: Candidate[] = [];
  let summaryCounts: SummaryCounts | null = null;
 
  if (Array.isArray(syncData)) {
    // Try to find stats/syncStatus or fallback to data object
    mainResult = syncData.find((item: any) => item.stats && item.syncStatus) || null;
    candidates = syncData.filter((item: any) => item['Candidate ID'] && item.Name);
    if (!mainResult && syncData.length > 0 && syncData[0].data) {
      summaryCounts = syncData[0].data;
    }
  } else if (syncData && typeof syncData === 'object') {
    if (syncData.stats && syncData.syncStatus) {
      mainResult = syncData as MainResult;
    } else if (syncData.data) {
      summaryCounts = syncData.data;
    }
    if (Array.isArray(syncData.candidates)) {
      candidates = syncData.candidates;
    } else if (Array.isArray(syncData.data)) {
      candidates = syncData.data;
    }
  }
 
  // Download results as CSV
  const handleDownload = () => {
    if (!candidates.length) return;
    const headers = [
      'Candidate ID', 'Name', 'Email', 'ATS Status', 'HRMS Status', 'Notes', 'Processed At', 'Action', 'Reason'
    ];
    const rows = candidates.map(c => [
      c['Candidate ID'], c.Name, c.Email, c['ATS Status'], c.hrmsStatus, c.Notes, c.processedAt, c.action, c.reason
    ]);
    const csv = [headers.join(','), ...rows.map(r => r.map(x => '"' + (x || '') + '"').join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sync_results.csv';
    a.click();
    URL.revokeObjectURL(url);
  };
 
  return (
    <div className="bg-gray-50 shadow-md max-w-4xl mx-auto mt-8 rounded-2xl p-8">
      <form onSubmit={e => { e.preventDefault(); handleSync(); }} className="w-full flex flex-col md:flex-row items-end gap-4 mb-8">
        <div className="flex flex-col w-full md:w-2/3">
          <label className="block text-sm font-medium mb-1 text-black">Candidate Data (CSV)</label>
          <input
            type="file"
            accept=".csv"
            onChange={e => setSelectedFile(e.target.files ? e.target.files[0] : null)}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full md:w-[160px] h-[42px] text-white font-bold rounded-lg bg-[#FF620A] shadow hover:shadow-md transition-all"
          disabled={loading}
        >
          {loading ? 'Syncing...' : 'Run Sync'}
        </button>
      </form>
      {showLoader && (
        <div className="absolute inset-0 bg-white bg-opacity-70 flex flex-col items-center justify-center z-10">
          <FaSync className="animate-spin text-4xl text-blue-600 mb-2" />
          <div className="text-blue-700 font-semibold">Syncing...</div>
        </div>
      )}
      {(mainResult && mainResult.stats) || summaryCounts ? (
        <div className="flex gap-4 mb-6 flex-wrap justify-center">
          <button className="bg-purple-600 text-white font-bold px-4 py-2 rounded flex items-center gap-2 shadow-md">
            <FaCheckCircle /> Synced: {(mainResult && mainResult.stats ? mainResult.stats.syncedProfiles : summaryCounts?.synced) || 0}
          </button>
          <button className="bg-purple-600 text-white font-bold px-4 py-2 rounded flex items-center gap-2 shadow-md">
            Skipped: {(mainResult && mainResult.stats ? mainResult.stats.skippedRecords : summaryCounts?.skipped) || 0}
          </button>
          <button className="bg-purple-600 text-white font-bold px-4 py-2 rounded flex items-center gap-2 shadow-md">
            <FaClock /> Review: {(mainResult && mainResult.stats ? mainResult.stats.pendingSync : summaryCounts?.review || summaryCounts?.pending) || 0}
          </button>
          <button className="bg-purple-600 text-white font-bold px-4 py-2 rounded flex items-center gap-2 shadow-md">
            <FaExclamationTriangle /> Error: {(mainResult && mainResult.stats ? mainResult.stats.failedSync : summaryCounts?.error) || 0}
          </button>
        </div>
      ) : null}
      {mainResult && (
        <div className="mb-6">
          <div className="flex gap-4 mb-6 flex-wrap justify-center">
            <button className="bg-yellow-100 text-yellow-800 font-bold px-4 py-2 rounded flex items-center gap-2">
              <FaClock /> Pending: {mainResult.stats.pendingSync}
            </button>
            <button className="bg-red-100 text-red-800 font-bold px-4 py-2 rounded flex items-center gap-2">
              <FaExclamationTriangle /> Failed: {mainResult.stats.failedSync}
            </button>
          </div>
          <h2 className="text-lg font-semibold mb-2">Sync Stats</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{mainResult.stats.syncedProfiles}</div>
              <div className="text-sm text-gray-600">Synced</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{mainResult.stats.pendingSync}</div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{mainResult.stats.failedSync}</div>
              <div className="text-sm text-gray-600">Failed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600">{mainResult.stats.skippedRecords}</div>
              <div className="text-sm text-gray-600">Skipped</div>
            </div>
          </div>
          <div className="flex justify-end mb-2">
            <button
              onClick={handleDownload}
              disabled={!candidates.length}
              className="flex items-center gap-2 px-4 py-2 rounded shadow-md bg-purple-600 text-white font-bold text-base disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FaDownload /> Download Results
            </button>
          </div>
        </div>
      )}
      {mainResult && mainResult.syncStatus && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Sync Status</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border">Profile ID</th>
                  <th className="p-2 border">Status</th>
                  <th className="p-2 border">Message</th>
                  <th className="p-2 border">Type</th>
                </tr>
              </thead>
              <tbody>
                {mainResult.syncStatus.map((row, i) => (
                  <tr key={i}>
                    <td className="p-2 border font-mono">{row.profileId}</td>
                    <td className={`p-2 border font-semibold ${statusColor(row.status)}`}>{row.status}</td>
                    <td className="p-2 border">{row.message}</td>
                    <td className="p-2 border">{row.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {candidates.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-2">Candidate Details</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border">Candidate ID</th>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Email</th>
                  <th className="p-2 border">ATS Status</th>
                  <th className="p-2 border">HRMS Status</th>
                  <th className="p-2 border">Notes</th>
                  <th className="p-2 border">Processed At</th>
                  <th className="p-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {candidates.map((c, i) => (
                  <tr key={i}>
                    <td className="p-2 border font-mono">{c['Candidate ID']}</td>
                    <td className="p-2 border">{c.Name}</td>
                    <td className="p-2 border">{c.Email}</td>
                    <td className="p-2 border">{c['ATS Status']}</td>
                    <td className={`p-2 border ${statusColor(c.hrmsStatus)}`}>{c.hrmsStatus}</td>
                    <td className="p-2 border">{c.Notes}</td>
                    <td className="p-2 border">{c.processedAt ? new Date(c.processedAt).toLocaleString() : ''}</td>
                    <td className="p-2 border">{c.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {!loading && !syncData && (
        <div className="text-gray-500 text-center mt-8">No sync data yet. Upload a CSV file and click "Run Sync" to start.</div>
      )}
      {(!loading && syncData && !mainResult && !summaryCounts) && (
        <div className="text-red-500 text-center mt-8">
          No valid sync results found in the response.
        </div>
      )}
      {error && (
        <div className="text-red-500 mb-4 flex items-center gap-2"><FaExclamationTriangle /> {error}</div>
      )}
    </div>
  );
};
 
export default ATS_TO_HRMS_CANDIDATE_StatusSync;