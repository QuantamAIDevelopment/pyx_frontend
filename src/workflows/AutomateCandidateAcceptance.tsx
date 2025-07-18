import React, { useState, ChangeEvent, FormEvent } from 'react';
// import { FaUserCheck, FaPaperPlane } from 'react-icons/fa';
import PageRevealWrapper from './PageRevealWrapper';
 
const API_URL = 'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/candidate-accepted';
 
const AutomateCandidateAcceptance: React.FC = () => {
  const [form, setForm] = useState<{
    'Candidate ID': string;
    Name: string;
    Email: string;
    STATUS: string;
    'UPDATED DATE': string;
  }>({
    'Candidate ID': '',
    Name: '',
    Email: '',
    STATUS: 'accepted',
    'UPDATED DATE': ''
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [result, setResult] = useState<string>('');
 
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setResult('');
    setError('');
  };
 
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult('');
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const text = await response.text();
      if (!response.ok) throw new Error(text || 'Failed to process candidate acceptance.');
      setResult(text);
    } catch (err: any) {
      setError(err.message || 'Failed to process candidate acceptance.');
    } finally {
      setLoading(false);
    }
  };
 
  const handleDownload = () => {
    const blob = new Blob([result], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'candidate-acceptance.txt';
    a.click();
    URL.revokeObjectURL(url);
  };
 
  return (
    <PageRevealWrapper
      heading="Automate Candidate Acceptance"
      description="Automate candidate acceptance and onboarding notifications. Fill the form to notify the team and update the tracker."
      details=""
      coverImage=""
    >
      <div className="max-w-xl mx-auto p-6 rounded-3xl mt-8 shadow-md space-y-8" style={{ background: '#f3f4f6' }}>
        <div className="flex items-center space-x-3 mb-4">
          <h2 className="text-[42px] font-sans text-black m-0 text-center">
            Automate Candidate Acceptance
          </h2>
 
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <label className="font-semibold">Candidate ID:</label>
          <input
            type="text"
            name="Candidate ID"
            value={form['Candidate ID']}
            onChange={handleChange}
            className="border p-2 rounded text-base"
            required
            placeholder="Enter Candidate ID"
            style={{ fontSize: '15.75px', fontFamily: 'poppins' }}
          />
          <label className="font-semibold">Name:</label>
          <input
            type="text"
            name="Name"
            value={form.Name}
            onChange={handleChange}
            className="border p-2 rounded text-base"
            required
            placeholder="Enter Name"
            style={{ fontSize: '15.75px', fontFamily: 'poppins' }}
          />
          <label className="font-semibold">Email:</label>
          <input
            type="email"
            name="Email"
            value={form.Email}
            onChange={handleChange}
            className="border p-2 rounded text-base"
            required
            placeholder="Enter Email"
            style={{ fontSize: '15.75px', fontFamily: 'poppins' }}
          />
          <label className="font-semibold">Status:</label>
          <input
            type="text"
            name="STATUS"
            value={form.STATUS}
            onChange={handleChange}
            className="border p-2 rounded text-base"
            required
            placeholder="Enter Status"
            style={{ fontSize: '15.75px', fontFamily: 'poppins' }}
          />
          <label className="font-semibold">Updated Date:</label>
          <input
            type="date"
            name="UPDATED DATE"
            value={form['UPDATED DATE']}
            onChange={handleChange}
            className="border p-2 rounded text-base"
            required
            placeholder="Select Date"
            style={{ fontSize: '15.75px', fontFamily: 'poppins' }}
          />
  <button
  type="submit"
  disabled={loading}
  className={`
    flex items-center justify-center
    text-white font-bold font-[poppins] text-[16.41px]
    h-[31.5px] w-auto
    px-[14px] py-[21px]
    rounded-[8px] shadow-[0_2px_8px_rgba(0,0,0,0.10)]
    transition-opacity duration-200 ease-in-out
    ${loading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
    mx-auto
  `}
  style={{
    background: 'linear-gradient(90deg, #FF620A 0%, #993B06 100%)',
  }}
>
  {loading ? 'Submitting...' : 'Run Workflow'}
</button>
 
 
        </form>
        {error && <div style={{color: 'red', margin: '1em 0'}}>Error: {error}</div>}
        {result && <div style={{margin: '1em 0', padding: '1em', background: '#f0f0f0'}}>Result: {JSON.stringify(result)}</div>}
        {result && (
    <button onClick={handleDownload} className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">
      Download Result
    </button>
  )}
      </div>
    </PageRevealWrapper>
  );
};
 
export default AutomateCandidateAcceptance;