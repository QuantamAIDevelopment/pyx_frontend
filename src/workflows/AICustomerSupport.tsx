import React, { useState } from 'react';
// import { FaRobot } from 'react-icons/fa';

const AICustomerSupport: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Start chatting with your AI support agent...' }
  ]);
  const [loading, setLoading] = useState(false);

  // Replace handleSend with async API call
  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('chat', input);

      const response = await fetch('https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/chat', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setMessages(prev => [
        ...prev,
        { sender: 'ai', text: data.output || data.reply || JSON.stringify(data) }
      ]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        { sender: 'ai', text: "Sorry, there was an error contacting the support agent." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="bg-gray-50 shadow-md max-w-4xl mx-auto mt-8 rounded-2xl p-8">
      {/* Info Section */}
      <div className="mb-6">
        <div className="bg-gradient-to-r from-[#FF620A] to-[#993B06] text-white font-poppins text-center rounded-lg py-2 px-4 font-semibold text-sm">
          Launch your own AI support agent & elevate your support for audiences any size, any time.
        </div>
      </div>
      {/* Chat Section */}
      <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center justify-center min-h-[180px] mb-8">
        <div className="w-full max-h-48 overflow-y-auto mb-4 flex flex-col gap-2">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={msg.sender === 'user' ? 'text-right' : 'text-left'}
            >
              <span
                className={
                  msg.sender === 'user'
                    ? 'inline-block bg-gray-100 text-black rounded-xl px-4 py-2 shadow text-base font-poppins font-medium'
                    : 'inline-block bg-blue-50 text-black rounded-xl px-4 py-2 shadow text-base font-poppins font-medium'
                }
              >
                {msg.text}
              </span>
            </div>
          ))}
          {loading && (
            <div className="text-left">
              <span className="inline-block bg-gray-50 text-base font-poppins rounded-xl px-4 py-2 shadow font-medium opacity-70 animate-pulse">
                AI is typing...
              </span>
            </div>
          )}
        </div>
        <div className="flex w-full gap-2">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 text-base font-poppins px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white shadow-sm"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleInputKeyDown}
            disabled={loading}
          />
          <button
            className="w-full md:w-[160px] h-[42px] text-white font-bold rounded-lg bg-[#FF620A] shadow hover:shadow-md transition-all"
            onClick={handleSend}
            disabled={loading || !input.trim()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default AICustomerSupport; 