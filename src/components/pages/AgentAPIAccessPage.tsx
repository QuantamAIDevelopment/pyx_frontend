'use client'

import { useState } from 'react'
import { Button } from '../common/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../common/ui/card'
import { Input } from '../common/ui/input'
import { Textarea } from '../common/ui/textarea'
import { Badge } from '../common/ui/badge'
import { Separator } from '../common/ui/separator'
import { Progress } from '../common/ui/progress'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../common/ui/select'
import { Switch } from '../common/ui/switch'
import { Label } from '../common/ui/label'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '../common/ui/tabs'
import { 
  ArrowLeft,
  Copy,
  RefreshCw,
  Play,
  Key,
  // Globe,
  Shield,
  Zap,
  CheckCircle,
  AlertTriangle,
  Eye,
  EyeOff,
  Link,
  Package,
  // Settings,
  Activity,
  Clock,
  Lock
} from 'lucide-react'
import { toast } from 'sonner'

interface AgentAPIAccessPageProps {
  agentData: {
    id: string
    name: string
    description: string
    category: string
  }
  onBack: () => void
}

export function AgentAPIAccessPage({ agentData, onBack }: AgentAPIAccessPageProps) {
  // Fallback data if no agent data is provided
  const defaultAgentData = {
    id: 'demo-agent',
    name: 'Demo Agent',
    description: 'A sample AI agent for demonstration purposes',
    category: 'Demo'
  }
  
  const currentAgent = agentData || defaultAgentData
  const [apiKey, setApiKey] = useState('sk-4xx8a9f2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0xyz')
  const [showFullKey, setShowFullKey] = useState(false)
  const [isPublic, setIsPublic] = useState(false)
  const [requestMethod, setRequestMethod] = useState('POST')
  const [testInput, setTestInput] = useState(`{
  "product_id": "ZX100",
  "source": "shopify_reviews"
}`)
  const [testOutput, setTestOutput] = useState('')
  const [isTestingAPI, setIsTestingAPI] = useState(false)
  const [lastTestTime, setLastTestTime] = useState<Date | null>(null)
  const [webhookUrl, setWebhookUrl] = useState('')

  const apiEndpoint = `https://qaid.ai/api/agents/${currentAgent.id}`
  const usageThisMonth = 234
  const usageLimit = 1000
  const usagePercentage = (usageThisMonth / usageLimit) * 100

  const exampleResponse = `{
  "summary": {
    "positives": ["Battery life", "Fit", "Sound quality"],
    "negatives": ["Mic quality", "Price point"]
  },
  "sentiment": {
    "positive": 72,
    "neutral": 18,
    "negative": 10
  },
  "metadata": {
    "processed_at": "2024-12-28T10:30:00Z",
    "processing_time_ms": 245,
    "confidence_score": 0.94
  }
}`

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast.success(`${label} copied to clipboard!`)
  }

  const regenerateKey = () => {
    const newKey = 'sk-' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + 'xyz'
    setApiKey(newKey)
    toast.success('API key regenerated successfully!')
  }

  const runAPITest = async () => {
    setIsTestingAPI(true)
    setTestOutput('')
    
    try {
      // Validate JSON input
      JSON.parse(testInput)
      
      // Simulate API call with realistic delay
      await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000))
      
      setTestOutput(exampleResponse)
      setLastTestTime(new Date())
      toast.success('API test completed successfully!')
    } catch (error) {
      const errorResponse = `{
  "error": {
    "code": "INVALID_INPUT", 
    "message": "Invalid JSON format in request body",
    "details": "Please check your JSON syntax and try again"
  },
  "timestamp": "${new Date().toISOString()}"
}`
      setTestOutput(errorResponse)
      setLastTestTime(new Date())
      toast.error('API test failed. Check your input format.')
    }
    setIsTestingAPI(false)
  }

  const displayKey = showFullKey 
    ? apiKey 
    : apiKey.substring(0, 8) + '...' + apiKey.substring(apiKey.length - 4)

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Agent
              </Button>
              <div>
                <h1 className="text-3xl font-bold mb-2">Use This Agent via API</h1>
                <p className="text-muted-foreground">Integrate your AI agent into any application</p>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              <Zap className="h-3 w-3 mr-1" />
              Live
            </Badge>
          </div>

          {/* Agent Info */}
          <Card className="mb-8 border-2 border-purple-200 bg-purple-50/50 dark:border-purple-800 dark:bg-purple-900/10">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg text-white">
                  <Package className="h-5 w-5" />
                </div>
                <span>{currentAgent.name}</span>
                <Badge>{currentAgent.category}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{currentAgent.description}</p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main API Configuration */}
            <div className="lg:col-span-2 space-y-6">
              {/* API Endpoint */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Link className="h-5 w-5" />
                    <span>API Endpoint</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Endpoint URL</Label>
                    <div className="flex items-center space-x-2">
                      <Input 
                        value={apiEndpoint} 
                        readOnly 
                        className="font-mono text-sm bg-muted/50"
                      />
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => copyToClipboard(apiEndpoint, 'API Endpoint')}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Request Method</Label>
                    <Select value={requestMethod} onValueChange={setRequestMethod}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="POST">POST</SelectItem>
                        <SelectItem value="GET">GET</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* API Key */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Key className="h-5 w-5" />
                    <span>API Authentication</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Your API Key</Label>
                    <div className="flex items-center space-x-2">
                      <Input 
                        value={displayKey}
                        readOnly 
                        className="font-mono text-sm bg-muted/50"
                        type="password"
                      />
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setShowFullKey(!showFullKey)}
                      >
                        {showFullKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => copyToClipboard(apiKey, 'API Key')}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={regenerateKey}
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Include this key in the Authorization header: Bearer {displayKey}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Request/Response Examples */}
              <Card>
                <CardHeader>
                  <CardTitle>Request & Response Examples</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label className="flex items-center space-x-2">
                      <Package className="h-4 w-4" />
                      <span>Input Example (JSON)</span>
                    </Label>
                    <div className="relative">
                      <Textarea
                        value={testInput}
                        onChange={(e) => setTestInput(e.target.value)}
                        className="font-mono text-sm bg-slate-900 text-green-400 border-slate-700 min-h-[120px]"
                        placeholder="Enter your JSON request body..."
                      />
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => copyToClipboard(testInput, 'Request Example')}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Response Example (JSON)</Label>
                    <div className="relative">
                      <Textarea
                        value={exampleResponse}
                        readOnly
                        className="font-mono text-sm bg-slate-900 text-blue-400 border-slate-700 min-h-[200px]"
                      />
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => copyToClipboard(exampleResponse, 'Response Example')}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Live API Tester */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Play className="h-5 w-5" />
                    <span>Test Your API Live</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Button 
                      onClick={runAPITest}
                      disabled={isTestingAPI}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    >
                      {isTestingAPI ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Testing...
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          Run Test
                        </>
                      )}
                    </Button>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <span>Test with the input above</span>
                      {lastTestTime && (
                        <span>• Last tested: {lastTestTime.toLocaleTimeString()}</span>
                      )}
                    </div>
                  </div>

                  {(testOutput || isTestingAPI) && (
                    <div className="space-y-2">
                      <Label>API Response</Label>
                      <div className="relative">
                        {isTestingAPI ? (
                          <div className="bg-slate-900 border-slate-700 border rounded-md p-4 min-h-[200px] flex items-center justify-center">
                            <div className="flex items-center space-x-3 text-blue-400">
                              <RefreshCw className="h-5 w-5 animate-spin" />
                              <span className="font-mono text-sm">Processing API request...</span>
                            </div>
                          </div>
                        ) : (
                          <Textarea
                            value={testOutput}
                            readOnly
                            className="font-mono text-sm bg-slate-900 text-yellow-400 border-slate-700 min-h-[200px]"
                          />
                        )}
                        {testOutput && !isTestingAPI && (
                          <div className="absolute top-2 right-2 flex items-center space-x-2">
                            {testOutput.includes('error') ? (
                              <AlertTriangle className="h-4 w-4 text-red-500" />
                            ) : (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            )}
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => copyToClipboard(testOutput, 'API Response')}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Rate Limits */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="h-5 w-5" />
                    <span>Rate Limits</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Monthly Usage</span>
                      <span>{usageThisMonth} / {usageLimit}</span>
                    </div>
                    <Progress value={usagePercentage} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      {Math.round(usagePercentage)}% of monthly limit used
                    </p>
                  </div>

                  <Separator />

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Requests per minute:</span>
                      <span>60</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Concurrent requests:</span>
                      <span>5</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Max payload size:</span>
                      <span>10MB</span>
                    </div>
                  </div>

                  <Button variant="outline" size="sm" className="w-full">
                    <Zap className="h-4 w-4 mr-2" />
                    Upgrade Limits
                  </Button>
                </CardContent>
              </Card>

              {/* Security Controls */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5" />
                    <span>Security Controls</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="public-api">Public API</Label>
                      <p className="text-xs text-muted-foreground">
                        Allow access without authentication
                      </p>
                    </div>
                    <Switch 
                      id="public-api"
                      checked={isPublic} 
                      onCheckedChange={setIsPublic}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label>Webhook URL (Optional)</Label>
                    <Input
                      placeholder="https://your-app.com/webhook"
                      value={webhookUrl}
                      onChange={(e) => setWebhookUrl(e.target.value)}
                      className="text-sm"
                    />
                    <p className="text-xs text-muted-foreground">
                      Receive responses at this URL
                    </p>
                  </div>

                  <div className="bg-muted/30 p-3 rounded-lg">
                    <div className="flex items-center space-x-2 text-sm">
                      <Lock className="h-4 w-4 text-green-600" />
                      <span className="font-medium">Secure</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      All keys and endpoints are encrypted and monitored
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-5 w-5" />
                    <span>Recent Activity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span>Last API call</span>
                      <span className="text-muted-foreground">2 min ago</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Success rate (24h)</span>
                      <span className="text-green-600">99.2%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Avg response time</span>
                      <span className="text-muted-foreground">245ms</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Total requests</span>
                      <span className="text-muted-foreground">1,247</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}