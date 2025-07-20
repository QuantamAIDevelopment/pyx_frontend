import React, { useState } from 'react';


interface PolicyStats {
  totalPolicies: number;
  acknowledgedPolicies: number;
  pendingAcknowledgments: number;
}

interface Notification {
  email: string;
  userName: string;
  policyId: string;
  pendingAck: number;
  status: string;
}

interface ResponseData {
  stats: PolicyStats;
  recentNotifications: Notification[];
}

const PolicyUploadStats: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<ResponseData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setData(null);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      setError('Please upload a policy PDF first.');
      return;
    }

    setLoading(true);
    setError(null);

    // Simulated API response (replace with real API call)
    setTimeout(() => {
      setData({
        stats: {
          totalPolicies: 42,
          acknowledgedPolicies: 30,
          pendingAcknowledgments: 12,
        },
        recentNotifications: [
          {
            email: 'john@example.com',
            userName: 'John Doe',
            policyId: 'POL123',
            pendingAck: 1,
            status: 'Pending',
          },
          {
            email: 'jane@example.com',
            userName: 'Jane Smith',
            policyId: 'POL456',
            pendingAck: 0,
            status: 'Acknowledged',
          },
          {
            email: 'sam@example.com',
            userName: 'Sam Wilson',
            policyId: 'POL789',
            pendingAck: 2,
            status: 'Pending',
          },
          {
            email: 'amy@example.com',
            userName: 'Amy Adams',
            policyId: 'POL321',
            pendingAck: 0,
            status: 'Acknowledged',
          },
          {
            email: 'dave@example.com',
            userName: 'Dave Lee',
            policyId: 'POL654',
            pendingAck: 1,
            status: 'Pending',
          },
        ],
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="bg-gray-50 shadow-md max-w-4xl mx-auto mt-8 rounded-2xl p-8">
      <form onSubmit={handleSubmit} className="w-full flex flex-col md:flex-row items-end gap-4 mb-8">
        <div className="flex flex-col w-full md:w-2/3">
          <input
            id="policy-upload-input"
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          type="submit"
          className="w-full md:w-[160px] h-[42px] text-white font-bold rounded-lg bg-[#FF620A] shadow hover:shadow-md transition-all"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Get Policy Stats'}
        </button>
      </form>
      {error && <div className="mt-4 text-red-600 text-center font-medium">{error}</div>}
      {data && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-2xl mb-8">
          <h3 className="font-semibold text-lg text-black mb-3">Policy Stats</h3>
          <ul className="space-y-1 text-base text-black">
            <li>Total Policies: <b>{data.stats.totalPolicies}</b></li>
            <li>Acknowledged: <b>{data.stats.acknowledgedPolicies}</b></li>
            <li>Pending Acknowledgments: <b>{data.stats.pendingAcknowledgments}</b></li>
          </ul>
          <h3 className="font-semibold text-lg text-black mb-3 mt-6">Recent Notifications</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border text-base text-black">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-3 border">Email</th>
                  <th className="py-2 px-3 border">User Name</th>
                  <th className="py-2 px-3 border">Policy ID</th>
                  <th className="py-2 px-3 border">Pending Ack</th>
                  <th className="py-2 px-3 border">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.recentNotifications.slice(0, 5).map((n, idx) => (
                  <tr key={idx} className="hover:bg-blue-50">
                    <td className="py-2 px-3 border">{n.email}</td>
                    <td className="py-2 px-3 border">{n.userName}</td>
                    <td className="py-2 px-3 border">{n.policyId}</td>
                    <td className="py-2 px-3 border">{n.pendingAck}</td>
                    <td className="py-2 px-3 border">{n.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default PolicyUploadStats;
