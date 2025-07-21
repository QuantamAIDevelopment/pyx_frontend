import React, { useState } from 'react';


interface ContractRedFlagDetectorCardProps {
  compact?: boolean;
}

const ContractRedFlagDetectorCard: React.FC<ContractRedFlagDetectorCardProps> = () => {
  const [documentName, setDocumentName] = useState('');
  const [email, setEmail] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [notes, setNotes] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset states
    setResult(null);
    setError(null);
    setIsLoading(true);

    if (!file) {
      setError("Please upload a file.");
      setIsLoading(false);
      return;
    }

    // Validate file type
    const allowedTypes = ['application/pdf', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      setError("Please upload a PDF, DOC, DOCX, or TXT file.");
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('doc', documentName); // Document Name (should be the document title)
    formData.append('document', file);    // File upload
    formData.append('mail', email);       // Email address
    formData.append('document ends', notes || 'pdf'); // Document type/extension

    console.log('Sending request with:', {
      documentName,
      email,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      notes
    });

    try {
      const response = await fetch('https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/contract', {
        method: 'POST',
        body: formData,
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', errorText);
        throw new Error(`Server error: ${response.status} - ${errorText}`);
      }

      const contentType = response.headers.get('content-type');
      console.log('Content-Type:', contentType);

      let result;
      const responseText = await response.text();
      if (contentType && contentType.includes('application/json') && responseText) {
        try {
          result = JSON.parse(responseText);
          console.log('JSON Response:', result);
        } catch (e) {
          result = { message: responseText };
          console.log('Non-JSON but text response:', responseText);
        }
      } else if (responseText) {
        result = { message: responseText };
        console.log('Text Response:', responseText);
      } else {
        result = { message: 'No response body received from server.' };
        console.log('Empty response');
      }

      setResult(JSON.stringify(result, null, 2));
    } catch (error: any) {
      console.error('Fetch error:', error);
      setError(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to render the result in a formatted way
  function renderResult(resultString: string) {
    let data: any;
    try {
      data = JSON.parse(resultString);
    } catch {
      return <pre className="whitespace-pre-wrap text-[16.41px] text-sm mt-2 text-black font-poppins">{resultString}</pre>;
    }
    // If the API wraps the result in a 'message' property, try to parse that too
    if (typeof data === 'object' && data.message) {
      try {
        const inner = JSON.parse(data.message);
        data = inner;
      } catch {
        // not JSON, just show as text
        return <pre className="whitespace-pre-wrap text-[16.41px] text-sm mt-2 text-black font-poppins">{data.message}</pre>;
      }
    }
    // Render nicely if expected fields exist
    if (data) {
      return (
        <div className="text-black text-[16.41px] font-poppins">
          {data["Upload time"] && <div><b>Upload time:</b> {data["Upload time"]}</div>}
          {data["User"] && <div><b>User:</b> {data["User"]}</div>}
          {data["Document Name"] && <div><b>Document Name:</b> {data["Document Name"]}</div>}
          {data["Number of redflags"] && <div><b>Number of redflags:</b> {data["Number of redflags"]}</div>}
          {data["Overall risk"] && <div><b>Overall risk:</b> {data["Overall risk"]}</div>}
          {data["Suggestion to fix"] && Array.isArray(data["Suggestion to fix"]) && (
            <div className="mt-2 font-poppins text-[16.41px]">
              <b>Suggestion to fix:</b>
              <ul className="list-disc ml-6 mt-1">
                {data["Suggestion to fix"].map((s: string, i: number) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          )}
        </div>
      );
    }
    // fallback
    return <pre className="whitespace-pre-wrap text-sm mt-2 text-black font-poppins">{resultString}</pre>;
  }

  return (
    <div className="bg-gray-50 shadow-md max-w-4xl mx-auto mt-8 rounded-2xl p-8">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
  <div>
    <label className="block text-sm font-medium mb-1 text-black">Document Title</label>
    <input
      type="text"
      placeholder="e.g., Professional Services Agreement"
      value={documentName}
      onChange={e => setDocumentName(e.target.value)}
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400"
      required
    />
  </div>
  <div>
    <label className="block text-sm font-medium mb-1 text-black">Your Email</label>
    <input
      type="email"
      placeholder="e.g., your@email.com"
      value={email}
      onChange={e => setEmail(e.target.value)}
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400"
      required
    />
  </div>
  <div>
    <label className="block text-sm font-medium mb-1 text-black">Upload File</label>
    <input
      type="file"
      accept=".pdf,.doc,.docx,.txt"
      onChange={e => setFile(e.target.files ? e.target.files[0] : null)}
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400"
      required
    />
  </div>
  <div>
    <label className="block text-sm font-medium mb-1 text-black">Document Type</label>
    <input
      type="text"
      placeholder="e.g., pdf, doc"
      value={notes}
      onChange={e => setNotes(e.target.value)}
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400"
    />
  </div>
  <div className="md:col-span-2 flex justify-end">
    <button
      type="submit"
      disabled={isLoading}
      className="w-full md:w-[200px] h-[44px] text-white font-bold rounded-lg bg-[#FF620A] shadow hover:shadow-md transition-all"
    >
      {isLoading ? 'Analyzing...' : 'Analyze Contract'}
    </button>
  </div>
</form>

      {result && (
        <div>
          <h2 className="text-xl font-bold text-black mb-6">Analysis Result</h2>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-2xl mb-8">
            {renderResult(result)}
          </div>
        </div>
      )}
      {!result && !isLoading && (
        <p className="text-center text-gray-700">No analysis result to display.</p>
      )}
      {error && (
        <div className="mt-4 text-red-600 text-center font-medium">{error}</div>
      )}
    </div>
  );
};

export default ContractRedFlagDetectorCard; 