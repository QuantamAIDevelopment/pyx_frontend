'use client'

import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../common/ui/button'
import { Card } from '../common/ui/card'
import { Badge } from '../common/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../common/ui/tabs'
import { 
  Code2, Download, Play, RotateCcw, CheckCircle, 
  FileText, Settings, Database, Globe, ArrowRight,
  Copy, ExternalLink, Bot, Lightbulb
} from 'lucide-react'
import { usePyX } from '../layout/PyXContextProvider'

type CodeFileKey = 'app.js' | 'routes.js' | 'index.html' | 'package.json'

export function CodePreviewPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<CodeFileKey>('app.js')
  const navigate = useNavigate()
  const { setCurrentPage } = usePyX()

  useEffect(() => {
    setCurrentPage('code-preview')
    // Simulate loading
    setTimeout(() => setIsLoading(false), 2000)
  }, [setCurrentPage])

  const codeFiles = {
    'app.js': {
      language: 'javascript',
      icon: Code2,
      description: 'Main React application component with routing and state management',
      content: `import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChatInterface } from './components/ChatInterface';
import { DatabaseConnector } from './utils/DatabaseConnector';
import { NotionAPI } from './integrations/NotionAPI';

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [knowledgeBase, setKnowledgeBase] = useState([]);

  useEffect(() => {
    // Initialize Notion connection
    const initializeApp = async () => {
      try {
        const connector = new NotionAPI({
          token: process.env.REACT_APP_NOTION_TOKEN,
          databaseId: process.env.REACT_APP_NOTION_DATABASE_ID
        });
        
        const data = await connector.fetchKnowledgeBase();
        setKnowledgeBase(data);
        setIsConnected(true);
      } catch (error) {
        console.error('Failed to connect to Notion:', error);
      }
    };

    initializeApp();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <h1 className="text-2xl font-bold text-gray-900">
              AI Customer Support Chatbot
            </h1>
            <div className="flex items-center mt-2">
              <div className={\`w-2 h-2 rounded-full mr-2 \${isConnected ? 'bg-green-500' : 'bg-red-500'}\`}></div>
              <span className="text-sm text-gray-600">
                {isConnected ? 'Connected to Notion' : 'Connecting...'}
              </span>
            </div>
          </div>
        </header>
        
        <main className="max-w-4xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={
              <ChatInterface 
                knowledgeBase={knowledgeBase}
                isConnected={isConnected}
              />
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;`
    },
    'routes.js': {
      language: 'javascript',
      icon: Globe,
      description: 'API routes for handling chat requests and Notion integration',
      content: `const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
const { Client } = require('@notionhq/client');
const router = express.Router();

// Initialize OpenAI
const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
}));

// Initialize Notion client
const notion = new Client({ auth: process.env.NOTION_TOKEN });

// Chat endpoint
router.post('/api/chat', async (req, res) => {
  try {
    const { message, conversationHistory } = req.body;
    
    // Search knowledge base
    const relevantContext = await searchKnowledgeBase(message);
    
    // Generate response using OpenAI
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: \`You are a helpful customer support assistant. Use the following context to answer questions: \${relevantContext}\`
        },
        ...conversationHistory,
        { role: 'user', content: message }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    res.json({
      response: completion.data.choices[0].message.content,
      sources: extractSources(relevantContext)
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Failed to process chat request' });
  }
});

// Search knowledge base function
async function searchKnowledgeBase(query) {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
      filter: {
        or: [
          {
            property: 'Title',
            title: { contains: query }
          },
          {
            property: 'Content',
            rich_text: { contains: query }
          }
        ]
      }
    });

    return response.results.map(page => ({
      title: page.properties.Title.title[0]?.plain_text,
      content: page.properties.Content.rich_text[0]?.plain_text,
      url: page.url
    }));
  } catch (error) {
    console.error('Knowledge base search error:', error);
    return [];
  }
}

module.exports = router;`
    },
    'index.html': {
      language: 'html',
      icon: FileText,
      description: 'Main HTML template with responsive design and SEO optimization',
      content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#000000" />
  <meta name="description" content="AI-powered customer support chatbot connected to your Notion knowledge base" />
  <meta name="keywords" content="AI, chatbot, customer support, Notion, automation" />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://your-chatbot-app.com/" />
  <meta property="og:title" content="AI Customer Support Chatbot" />
  <meta property="og:description" content="Intelligent customer support powered by your Notion knowledge base" />
  
  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content="https://your-chatbot-app.com/" />
  <meta property="twitter:title" content="AI Customer Support Chatbot" />
  <meta property="twitter:description" content="Intelligent customer support powered by your Notion knowledge base" />
  
  <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
  <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
  
  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>
  
  <!-- Custom styles -->
  <style>
    .chat-container {
      max-height: 600px;
      overflow-y: auto;
    }
    
    .message-bubble {
      animation: slideIn 0.3s ease-out;
    }
    
    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .typing-indicator {
      animation: pulse 1.5s infinite;
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 0.4; }
      50% { opacity: 1; }
    }
  </style>
  
  <title>AI Customer Support Chatbot</title>
</head>
<body>
  <noscript>You need to enable JavaScript to run this app.</noscript>
  <div id="root"></div>
  
  <!-- Analytics -->
  <script>
    // Google Analytics or other tracking code would go here
    console.log('App initialized');
  </script>
</body>
</html>`
    },
    'package.json': {
      language: 'json',
      icon: Settings,
      description: 'Project dependencies and build configuration',
      content: `{
  "name": "ai-customer-support-chatbot",
  "version": "1.0.0",
  "description": "AI-powered customer support chatbot connected to Notion knowledge base",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.0",
    "react-scripts": "5.0.1",
    "@notionhq/client": "^2.2.3",
    "openai": "^3.2.1",
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "axios": "^1.3.4",
    "uuid": "^9.0.0",
    "date-fns": "^2.29.3"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "jest": "^27.5.1",
    "nodemon": "^2.0.20",
    "concurrently": "^7.6.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "server": "nodemon server.js",
    "dev": "concurrently \\"npm run server\\" \\"npm start\\"",
    "deploy": "npm run build && npm run deploy:vercel"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "engines": {
    "node": ">=16.0.0"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/ai-customer-support-chatbot.git"
  },
  "keywords": [
    "ai",
    "chatbot",
    "customer-support",
    "notion",
    "react",
    "openai"
  ],
  "author": "Your Name",
  "license": "MIT"
}`
    }
  }

  const handleApprove = () => {
    navigate('/testing-lab')
  }

  const handleRegenerate = () => {
    navigate('/generate-app')
  }

  const copyToClipboard = async (content: string) => {
    await navigator.clipboard.writeText(content)
    // You could add a toast notification here
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            Generating Your Code...
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            PyX is creating your custom application
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-green-500 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Here's the Code Generated for Your App
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Review your generated application code. PyX has created a complete, production-ready application based on your requirements.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {/* Main Code Editor */}
          <div className="lg:col-span-3">
            <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl">
              <div className="p-6 border-b border-gray-200 dark:border-gray-600">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      Generated Successfully
                    </Badge>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      4 files • React + Node.js
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(codeFiles[activeTab]?.content || '')}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
              
              <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as CodeFileKey)} className="w-full">
                <TabsList className="w-full justify-start rounded-none bg-gray-50 dark:bg-gray-700 p-0">
                  {Object.entries(codeFiles).map(([filename, file]) => {
                    const IconComponent = file.icon
                    return (
                      <TabsTrigger
                        key={filename}
                        value={filename}
                        className="flex items-center space-x-2 px-4 py-3 rounded-none data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800"
                      >
                        <IconComponent className="h-4 w-4" />
                        <span>{filename}</span>
                      </TabsTrigger>
                    )
                  })}
                </TabsList>
                
                {Object.entries(codeFiles).map(([filename, file]) => (
                  <TabsContent key={filename} value={filename} className="p-0">
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 border-b">
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {file.description}
                      </p>
                    </div>
                    <div className="relative">
                      <pre className="bg-gray-900 text-gray-100 p-6 overflow-x-auto text-sm leading-relaxed min-h-[500px]">
                        <code>{file.content}</code>
                      </pre>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
              
              {/* Action Buttons */}
              <div className="p-6 border-t border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50">
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    onClick={handleRegenerate}
                    className="flex items-center space-x-2"
                  >
                    <RotateCcw className="h-4 w-4" />
                    <span>Regenerate Code</span>
                  </Button>
                  
                  <div className="flex items-center space-x-3">
                    <Button variant="outline" className="flex items-center space-x-2">
                      <Play className="h-4 w-4" />
                      <span>Preview App</span>
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                    <Button
                      onClick={handleApprove}
                      className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white flex items-center space-x-2 px-6"
                    >
                      <CheckCircle className="h-4 w-4" />
                      <span>Approve Code</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* PyX Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl sticky top-6">
              <div className="flex items-center mb-4">
                <Bot className="h-6 w-6 text-blue-500 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  PyX Code Assistant
                </h3>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                  <div className="flex items-center mb-2">
                    <Lightbulb className="h-4 w-4 text-blue-600 mr-2" />
                    <span className="font-semibold text-blue-800 dark:text-blue-300 text-sm">
                      Code Explanation
                    </span>
                  </div>
                  <p className="text-xs text-blue-700 dark:text-blue-300">
                    {activeTab === 'app.js' && "This is your main React component that handles the chat interface and Notion integration. It manages state and routing for your application."}
                    {activeTab === 'routes.js' && "These are your API endpoints that handle chat requests, search your Notion database, and integrate with OpenAI for intelligent responses."}
                    {activeTab === 'index.html' && "Your main HTML template with responsive design, SEO optimization, and custom styling for the chat interface."}
                    {activeTab === 'package.json' && "Your project configuration file with all necessary dependencies for React, Notion API, OpenAI integration, and deployment tools."}
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                    Ask PyX about this code:
                  </h4>
                  <div className="space-y-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-xs h-auto p-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      "What does this function do?"
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-xs h-auto p-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      "How do I customize the UI?"
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-xs h-auto p-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      "Explain the API integration"
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-xs h-auto p-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      "Add error handling"
                    </Button>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
                  <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                    <div className="flex items-center justify-between">
                      <span>Lines of code:</span>
                      <span className="font-mono">247</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Dependencies:</span>
                      <span className="font-mono">12</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Est. build time:</span>
                      <span className="font-mono">2-3 min</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}