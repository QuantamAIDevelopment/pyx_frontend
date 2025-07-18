import React from "react";
 
const API_URL = "https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/ResumeAnalyzer";
 
export default function ResumeAnalyzer() {
  const [resumeFile, setResumeFile] = React.useState<File | null>(null);
  const [jd, setJd] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [result, setResult] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string>("");
 
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const formData = new FormData();
      if (resumeFile) {
        formData.append("resume", resumeFile);
      }
      formData.append("JD", jd);
      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("API error");
      const text = await response.text();
      setResult(text);
    } catch (err) {
      setError("Failed to analyze resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };
 
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    } else {
      setResumeFile(null);
    }
  };
 
  return (
    <div className="bg-gray-50 rounded-lg shadow-lg p-12 max-w-[900px] mx-auto pt-10">
      <h2 className="text-[42px] font-sans text-black font-extrabold m-0 text-center mb-4">
        Resume Analyzer
      </h2>
 
      <p className="mb-6 text-gray-600 text-center text-[22px] font-sans">
        Upload a resume PDF and enter a job description to get an AI-based screening and score.
      </p>
 
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 items-center justify-center mb-8">
        {/* Resume Upload */}
        <div className="w-full">
          <label className="block font-medium mb-2 text-[20px] font-sans">
            Resume (PDF)
          </label>
          <input
            type="file"
            accept="application/pdf"
            className="border rounded px-4 py-3 w-full text-[22px] font-sans"
            onChange={handleFileChange}
            required
          />
        </div>
 
        {/* Job Description */}
        <div className="w-full">
          <label className="block font-medium mb-2 text-[20px] font-sans">
            Job Description
          </label>
          <input
            type="text"
            className="border rounded px-4 py-3 w-full text-[22px] font-sans"
            value={jd}
            onChange={e => setJd(e.target.value)}
            placeholder="e.g. Java Developer"
            required
          />
        </div>
 
        {/* Submit Button */}
        <button
          type="submit"
          className={`text-white font-sans text-[22px] font-bold rounded-lg min-w-[180px] px-10 py-4 transition-transform ${
            loading ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'
          }`}
          style={{
            background: 'linear-gradient(90deg, rgb(21,93,252) 0%, rgb(152,16,250) 100%)',
          }}
          disabled={loading}
        >
          {loading ? 'Analyzing...' : 'Analyze Resume'}
        </button>
      </form>
 
      {/* Error Display */}
      {error && (
        <div className="text-red-600 mb-4 text-center text-[20px]">
          {error}
        </div>
      )}
 
      {/* Result Display */}
      {result && (
        <div className="bg-gray-50 rounded-xl shadow-md border border-gray-200 p-6 font-sans mt-6 whitespace-pre-line text-[20px]">
          {result}
        </div>
      )}
    </div>
  );
}
 