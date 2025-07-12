'use client'

import { useState } from 'react'
import { Button } from '../common/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../common/ui/card'
import { Badge } from '../common/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../common/ui/tabs'
import { Separator } from '../common/ui/separator'
import {
  Code,
  BookOpen,
  Key,
  Zap,
  Shield,
  // Globe,
  Copy,
  // ExternalLink,
  Terminal,
  Settings,
  // Webhook,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  // FileText,
  Download,
  Github,
  PlayCircle,
  Clock,
  Users,
  MessageSquare,
  Star,
  // Search
} from 'lucide-react'

interface APIDocsPageProps {
  onViewChange: (view: string) => void
  isLoggedIn: boolean
  onShowAuth: (mode: 'login' | 'signup') => void
  agentId?: string
  agentName?: string
  onBack?: () => void
}

export function APIDocsPage({ onViewChange, isLoggedIn, onShowAuth, agentId, agentName, onBack }: APIDocsPageProps) {
  const [activeEndpoint, setActiveEndpoint] = useState('agents')
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const endpoints = [
    {
      id: 'agents',
      title: 'Agents',
      description: 'Manage AI agents and their configurations',
      methods: ['GET', 'POST', 'PUT', 'DELETE']
    },
    {
      id: 'workflows',
      title: 'Workflows',
      description: 'Create and manage automated workflows',
      methods: ['GET', 'POST', 'PUT', 'DELETE']
    },
    {
      id: 'integrations',
      title: 'Integrations',
      description: 'Connect with external services and platforms',
      methods: ['GET', 'POST', 'DELETE']
    },
    {
      id: 'executions',
      title: 'Executions',
      description: 'Monitor and control workflow executions',
      methods: ['GET', 'POST']
    },
    {
      id: 'analytics',
      title: 'Analytics',
      description: 'Access performance metrics and insights',
      methods: ['GET']
    }
  ]

  const getCodeExamples = () => {
    if (agentId && agentName) {
      // Agent-specific examples
      return {
        javascript: `// Initialize QAID API client
const qaid = new QAIDClient({
  apiKey: 'your-api-key',
  baseURL: 'https://api.qaid.ai/v1'
});

// Execute ${agentName}
const result = await qaid.agents.execute('${agentId}', {
  input: 'Your input data here',
  options: {
    format: 'json',
    include_confidence: true
  }
});

console.log('Agent result:', result);`,

        python: `# Initialize QAID API client
import qaid

client = qaid.Client(
    api_key="your-api-key",
    base_url="https://api.qaid.ai/v1"
)

# Execute ${agentName}
result = client.agents.execute(
    agent_id="${agentId}",
    input="Your input data here",
    options={
        "format": "json",
        "include_confidence": True
    }
)

print(f"Agent result: {result}")`,

        curl: `# Execute ${agentName}
curl -X POST "https://api.qaid.ai/v1/agents/${agentId}/execute" \\
  -H "Authorization: Bearer your-api-key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "input": "Your input data here",
    "options": {
      "format": "json",
      "include_confidence": true
    }
  }'`
      }
    } else {
      // General examples
      return {
        javascript: `// Initialize QAID API client
const qaid = new QAIDClient({
  apiKey: 'your-api-key',
  baseURL: 'https://api.qaid.ai/v1'
});

// Create a new agent
const agent = await qaid.agents.create({
  name: 'Customer Support Agent',
  type: 'customer_support',
  configuration: {
    model: 'gpt-4',
    temperature: 0.7,
    maxTokens: 1000
  }
});

console.log('Agent created:', agent.id);`,

        python: `# Initialize QAID API client
import qaid

client = qaid.Client(
    api_key="your-api-key",
    base_url="https://api.qaid.ai/v1"
)

# Create a new agent
agent = client.agents.create(
    name="Customer Support Agent",
    type="customer_support",
    configuration={
        "model": "gpt-4",
        "temperature": 0.7,
        "max_tokens": 1000
    }
)

print(f"Agent created: {agent.id}")`,

        curl: `# Create a new agent
curl -X POST "https://api.qaid.ai/v1/agents" \\
  -H "Authorization: Bearer your-api-key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Customer Support Agent",
    "type": "customer_support",
    "configuration": {
      "model": "gpt-4",
      "temperature": 0.7,
      "maxTokens": 1000
    }
  }'`
      }
    }
  }

  const codeExamples = getCodeExamples()

  const handleGetStarted = () => {
    if (isLoggedIn) {
      onViewChange('dashboard')
    } else {
      onShowAuth('signup')
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Back button for agent-specific docs */}
      {agentId && onBack && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="hover:bg-muted/50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to {agentName}
          </Button>
        </div>
      )}

      {/* Hero Section */}
      <section className={`${agentId ? 'py-12' : 'py-20'} bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-pink-950/20`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <Code className="h-3 w-3 mr-1" />
              {agentId ? `${agentName} API` : 'REST API v1.0'}
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              {agentId ? (
                <>
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {agentName}
                  </span>{' '}
                  API Documentation
                </>
              ) : (
                <>
                  Build with the{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    QAID API
                  </span>
                </>
              )}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {agentId ? (
                `Learn how to integrate ${agentName} into your applications with our comprehensive API documentation and code examples.`
              ) : (
                'Integrate AI agents into your applications with our powerful REST API. Create, deploy, and manage intelligent automation workflows programmatically.'
              )}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-lg mx-auto">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 w-full sm:w-auto"
                onClick={handleGetStarted}
              >
                <PlayCircle className="h-4 w-4 mr-2" />
                Get API Key
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
                onClick={() => window.open('https://github.com/qaid-ai/examples', '_blank')}
              >
                <Github className="h-4 w-4 mr-2" />
                View Examples
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-background ">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8  ">
            <div className="text-center ">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 mx-auto mb-4">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl md:text-3xl font-bold mb-2">99.9%</div>
              <div className="font-medium text-foreground mb-1 text-sm md:text-base">Uptime</div>
              <div className="text-xs md:text-sm text-muted-foreground">SLA guaranteed</div>
            </div>
            <div className="text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-blue-600 mx-auto mb-4">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl md:text-3xl font-bold mb-2">&lt; 100ms</div>
              <div className="font-medium text-foreground mb-1 text-sm md:text-base">Response Time</div>
              <div className="text-xs md:text-sm text-muted-foreground">Global average</div>
            </div>
            <div className="text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 mx-auto mb-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl md:text-3xl font-bold mb-2">Enterprise</div>
              <div className="font-medium text-foreground mb-1 text-sm md:text-base">Security</div>
              <div className="text-xs md:text-sm text-muted-foreground">SOC 2 Type II</div>
            </div>
            <div className="text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-red-600 mx-auto mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl md:text-3xl font-bold mb-2">10k+</div>
              <div className="font-medium text-foreground mb-1 text-sm md:text-base">Developers</div>
              <div className="text-xs md:text-sm text-muted-foreground">Active users</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Documentation */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="getting-started" className="w-full px-20">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-12">
              <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
              <TabsTrigger value="authentication">Authentication</TabsTrigger>
              <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
              <TabsTrigger value="examples">Examples</TabsTrigger>
              <TabsTrigger value="sdks">SDKs</TabsTrigger>
            </TabsList>

            {/* Getting Started */}
            <TabsContent value="getting-started" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Getting Started</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Get up and running with the QAID API in minutes. Follow these simple steps to make your first API call.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                        <span className="text-white font-bold">1</span>
                      </div>
                      <CardTitle>Create an Account</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Sign up for a free QAID account to get access to your API keys and dashboard.
                    </p>
                    <Button
                      className="w-full !bg-black border-none text-white hover:bg-gray-800"
                      onClick={handleGetStarted}
                    >
                      Sign Up Free
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-blue-600">
                        <span className="text-white font-bold">2</span>
                      </div>
                      <CardTitle>Get Your API Key</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Generate your API key from the dashboard to authenticate your requests.
                    </p>
                    <div className="bg-muted p-3 rounded-lg font-mono text-sm">
                      qaid_sk_1234567890abcdef...
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-600">
                        <span className="text-white font-bold">3</span>
                      </div>
                      <CardTitle>Make Your First Call</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Test your setup with a simple API call to list your agents.
                    </p>
                    <div className="bg-muted p-3 rounded-lg">
                      <code className="text-sm">GET /v1/agents</code>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-red-600">
                        <span className="text-white font-bold">4</span>
                      </div>
                      <CardTitle>Start Building</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Explore our endpoints and start integrating AI agents into your application.
                    </p>
                    <Button variant="outline" className="w-full shadow-md ">
                      <BookOpen className="h-4 w-4 mr-2" />
                      View Documentation
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Authentication */}
            <TabsContent value="authentication" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Authentication</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Secure your API requests with Bearer token authentication.
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="h-5 w-5" />
                    Bearer Token Authentication
                  </CardTitle>
                  <CardDescription>
                    Include your API key in the Authorization header of every request.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Header Format:</h4>
                      <div className="bg-muted p-4 rounded-lg relative">
                        <code className="text-sm">Authorization: Bearer your-api-key</code>
                        <Button
                          size="sm"
                          variant="outline"
                          className="absolute top-2 right-2"
                          onClick={() => copyToClipboard('Authorization: Bearer your-api-key', 'auth-header')}
                        >
                          {copiedCode === 'auth-header' ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Example Request:</h4>
                      <div className="bg-muted p-4 rounded-lg relative">
                        <pre className="text-sm overflow-x-auto">
                          {`curl -X GET "https://api.qaid.ai/v1/agents" \\
  -H "Authorization: Bearer qaid_sk_1234567890abcdef" \\
  -H "Content-Type: application/json"`}
                        </pre>
                        <Button
                          size="sm"
                          variant="outline"
                          className="absolute top-2 right-2"
                          onClick={() => copyToClipboard(`curl -X GET "https://api.qaid.ai/v1/agents" \\\n  -H "Authorization: Bearer qaid_sk_1234567890abcdef" \\\n  -H "Content-Type: application/json"`, 'auth-example')}
                        >
                          {copiedCode === 'auth-example' ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-1">Security Best Practices</h4>
                          <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                            <li>• Never expose your API keys in client-side code</li>
                            <li>• Store API keys as environment variables</li>
                            <li>• Rotate your keys regularly</li>
                            <li>• Use different keys for different environments</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* API Endpoints */}
            <TabsContent value="endpoints" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">API Endpoints</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Comprehensive reference for all available endpoints and their parameters.
                </p>
              </div>

              <div className={`grid ${agentId ? 'lg:grid-cols-1' : 'lg:grid-cols-4'} gap-8`}>
                {!agentId && (
                  <div className="space-y-2">
                    <h3 className="font-semibold mb-4">Endpoints</h3>
                    {endpoints.map((endpoint) => (
                      <Button
                        key={endpoint.id}
                        variant={activeEndpoint === endpoint.id ? "default" : "ghost"}
                        className={`w-full justify-start ${activeEndpoint === endpoint.id ? "!bg-black text-white hover:bg-black" : ""
                          }`}
                        onClick={() => setActiveEndpoint(endpoint.id)}
                      >
                        <Terminal className="h-4 w-4 mr-2" />
                        {endpoint.title}
                      </Button>

                    ))}
                  </div>
                )}

                <div className={agentId ? "lg:col-span-4" : "lg:col-span-3"}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between ">
                        {agentId ? `${agentName} Endpoints` : endpoints.find(e => e.id === activeEndpoint)?.title}
                        {!agentId && (
                          <div className="flex gap-1">
                            {endpoints.find(e => e.id === activeEndpoint)?.methods.map((method) => (
                              <Badge key={method} variant="outline" className="text-xs">
                                {method}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </CardTitle>
                      <CardDescription>
                        {agentId ? `API endpoints specifically for ${agentName}` : endpoints.find(e => e.id === activeEndpoint)?.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-medium mb-3">Available Methods</h4>
                          <div className="space-y-3">
                            {agentId ? (
                              // Agent-specific endpoints
                              <>
                                <div className="border rounded-lg p-4">
                                  <div className="flex items-center justify-between mb-2">
                                    <code className="text-sm font-mono">POST /v1/agents/{agentId}/execute</code>
                                    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">POST</Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground">
                                    Execute {agentName} with your input data
                                  </p>
                                </div>

                                <div className="border rounded-lg p-4">
                                  <div className="flex items-center justify-between mb-2">
                                    <code className="text-sm font-mono">GET /v1/agents/{agentId}</code>
                                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">GET</Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground">
                                    Get {agentName} configuration and details
                                  </p>
                                </div>

                                <div className="border rounded-lg p-4">
                                  <div className="flex items-center justify-between mb-2">
                                    <code className="text-sm font-mono">GET /v1/agents/{agentId}/status</code>
                                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">GET</Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground">
                                    Check {agentName} availability and health status
                                  </p>
                                </div>

                                <div className="border rounded-lg p-4">
                                  <div className="flex items-center justify-between mb-2">
                                    <code className="text-sm font-mono">GET /v1/agents/{agentId}/executions</code>
                                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">GET</Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground">
                                    Get execution history for {agentName}
                                  </p>
                                </div>
                              </>
                            ) : (
                              // General endpoints
                              <>
                                <div className="border rounded-lg p-4">
                                  <div className="flex items-center justify-between mb-2">
                                    <code className="text-sm font-mono">GET /v1/{activeEndpoint}</code>
                                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">GET</Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground">
                                    Retrieve a list of {activeEndpoint}
                                  </p>
                                </div>

                                <div className="border rounded-lg p-4">
                                  <div className="flex items-center justify-between mb-2">
                                    <code className="text-sm font-mono">POST /v1/{activeEndpoint}</code>
                                    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">POST</Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground">
                                    Create a new {activeEndpoint.slice(0, -1)}
                                  </p>
                                </div>

                                <div className="border rounded-lg p-4">
                                  <div className="flex items-center justify-between mb-2">
                                    <code className="text-sm font-mono">GET /v1/{activeEndpoint}/&#123;id&#125;</code>
                                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">GET</Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground">
                                    Retrieve a specific {activeEndpoint.slice(0, -1)} by ID
                                  </p>
                                </div>
                              </>
                            )}
                          </div>
                        </div>

                        <Separator />

                        <div>
                          <h4 className="font-medium mb-3">Response Format</h4>
                          <div className="bg-muted p-4 rounded-lg">
                            <pre className="text-sm overflow-x-auto">
                              {`{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "hasMore": true
  },
  "meta": {
    "requestId": "req_1234567890",
    "timestamp": "2024-01-01T00:00:00Z"
  }
}`}
                            </pre>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Code Examples */}
            <TabsContent value="examples" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Code Examples</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Ready-to-use code examples in popular programming languages.
                </p>
              </div>

              <Tabs defaultValue="javascript" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                  <TabsTrigger value="python">Python</TabsTrigger>
                  <TabsTrigger value="curl">cURL</TabsTrigger>
                </TabsList>

                {Object.entries(codeExamples).map(([lang, code]) => (
                  <TabsContent key={lang} value={lang}>
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span className="capitalize">{lang} Example</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => copyToClipboard(code, `example-${lang}`)}
                          >
                            {copiedCode === `example-${lang}` ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-muted p-4 rounded-lg">
                          <pre className="text-sm overflow-x-auto">
                            <code>{code}</code>
                          </pre>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>
            </TabsContent>

            {/* SDKs */}
            <TabsContent value="sdks" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">SDKs & Libraries</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Official SDKs and community libraries to accelerate your integration.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className="h-8 w-8 bg-yellow-400 rounded-lg flex items-center justify-center">
                        <span className="text-black font-bold text-sm">JS</span>
                      </div>
                      JavaScript SDK
                    </CardTitle>
                    <CardDescription>Official JavaScript/TypeScript SDK</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="bg-muted p-3 rounded-lg">
                        <code className="text-sm">npm install @qaid/sdk</code>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Download className="h-3 w-3 mr-1" />
                          Install
                        </Button>
                        <Button size="sm" variant="outline">
                          <Github className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className="h-8 w-8 bg-blue-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">PY</span>
                      </div>
                      Python SDK
                    </CardTitle>
                    <CardDescription>Official Python SDK</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="bg-muted p-3 rounded-lg">
                        <code className="text-sm">pip install qaid-python</code>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Download className="h-3 w-3 mr-1" />
                          Install
                        </Button>
                        <Button size="sm" variant="outline">
                          <Github className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className="h-8 w-8 bg-green-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">GO</span>
                      </div>
                      Go SDK
                    </CardTitle>
                    <CardDescription>Official Go SDK</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="bg-muted p-3 rounded-lg">
                        <code className="text-sm">go get github.com/qaid/go-sdk</code>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Download className="h-3 w-3 mr-1" />
                          Install
                        </Button>
                        <Button size="sm" variant="outline">
                          <Github className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Rate Limits & Support */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="grid md:grid-cols-2 gap-8 px-20">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Rate Limits
                </CardTitle>
                <CardDescription>
                  API usage limits and best practices for optimal performance.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-sm font-medium">Free Tier</span>
                    <span className="text-sm text-muted-foreground">1,000 requests/month</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-sm font-medium">Pro Tier</span>
                    <span className="text-sm text-muted-foreground">10,000 requests/month</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-sm font-medium">Enterprise</span>
                    <span className="text-sm text-muted-foreground">Custom limits</span>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      Rate limits are enforced per API key. Implement exponential backoff for retries.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Developer Support
                </CardTitle>
                <CardDescription>
                  Get help from our developer community and support team.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => onViewChange('documentation')}
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    Documentation
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => onViewChange('community-forum')}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Community Forum
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => onViewChange('github-issues')}
                  >
                    <Github className="h-4 w-4 mr-2" />
                    GitHub Issues
                  </Button>
                  <Button
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 border-none"
                    onClick={() => onViewChange('premium-support')}
                  >
                    <Star className="h-4 w-4 mr-2" />
                    Premium Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Start Building?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of developers using QAID API to power their AI applications.
              Get started with our free tier today.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-lg mx-auto">
              <Button
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto"
                onClick={handleGetStarted}
              >
                <Zap className="h-4 w-4 mr-2" />
                Get Started Free
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="!bg-white hover:text-primary w-full sm:w-auto"
                onClick={() => onViewChange('contact')}
              >
                <MessageSquare className="h-4 w-4 mr-2 " />
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}