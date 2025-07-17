'use client'

import { useState } from 'react'
import { Button } from '../common/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../common/ui/card'
import { Badge } from '../common/ui/badge'
import { Switch } from '../common/ui/switch'
import { Input } from '../common/ui/input'
import { Label } from '../common/ui/label'
import { Textarea } from '../common/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../common/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../common/ui/tabs'
import { Separator } from '../common/ui/separator'
import { 
  ArrowLeft, 
  Copy, 
  RefreshCw, 
  Shield, 
  Globe, 
  Key, 
  Clock, 
  // Users, 
  AlertTriangle,
  CheckCircle,
  Settings,
  Webhook,
  Database,
  Lock,
  Unlock,
  Trash2,
  Edit3,
  Eye,
  EyeOff
} from 'lucide-react'
import { toast } from 'sonner'

interface APIManagementPageProps {
  apiData: {
    id: string
    name: string
    description: string
    category: string
  }
  onBack: () => void
}

export function APIManagementPage({ apiData, onBack }: APIManagementPageProps) {
  const [isPublic, setIsPublic] = useState(true)
  const [rateLimit, setRateLimit] = useState('1000')
  const [rateLimitPeriod, setRateLimitPeriod] = useState('hour')
  const [apiKeyVisible, setApiKeyVisible] = useState(false)
  const [webhookUrl, setWebhookUrl] = useState('')
  const [allowedOrigins, setAllowedOrigins] = useState('*')
  const [apiDescription, setApiDescription] = useState(apiData.description)
  const [isEditing, setIsEditing] = useState(false)

  // Mock data
  const apiKey = 'qaid_sk_test_4f7c8b9e2d1a3f6c9b8e2d1a3f6c9b8e'
  const apiEndpoint = `https://qaid.ai/api/agents/${apiData.id}`
  const webhookSecret = 'whsec_8f3e4d2c9b7a6e5f4d3c2b1a0e9f8d7c'

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast.success(`${label} copied to clipboard!`)
  }

  const regenerateApiKey = () => {
    toast.success('API key regenerated successfully!')
  }

  const regenerateWebhookSecret = () => {
    toast.success('Webhook secret regenerated successfully!')
  }

  const saveChanges = () => {
    toast.success('API configuration saved successfully!')
    setIsEditing(false)
  }

  const deleteAPI = () => {
    if (confirm('Are you sure you want to delete this API? This action cannot be undone.')) {
      toast.success('API deleted successfully!')
      onBack()
    }
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-3xl font-bold flex items-center space-x-3">
                <div className="bg-gradient-to-r from-[#FF620A] to-[#993B06]p-2 rounded-lg text-white">
                  <Settings className="h-6 w-6" />
                </div>
                <span>API Management</span>
              </h1>
              <p className="text-muted-foreground mt-1">Configure and manage your API settings</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <CheckCircle className="h-3 w-3 mr-1" />
              Active
            </Badge>
          </div>
        </div>

        {/* API Info Card */}
        <Card className="mb-6 bg-gradient-to-r from-[#FF620A] to-[#993B06] dark:from-blue-950/20 dark:to-purple-950/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div>
                  <CardTitle className="text-xl">{apiData.name}</CardTitle>
                  <CardDescription className="flex items-center space-x-2 mt-1">
                    <Badge variant="secondary">{apiData.category}</Badge>
                    <span>•</span>
                    <span>Agent ID: {apiData.id}</span>
                  </CardDescription>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
              >
                <Edit3 className="h-4 w-4 mr-2" />
                {isEditing ? 'Cancel' : 'Edit'}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={apiDescription}
                    onChange={(e) => setApiDescription(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div className="flex space-x-2">
                  <Button onClick={saveChanges}>Save Changes</Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">{apiDescription}</p>
            )}
          </CardContent>
        </Card>

        <Tabs defaultValue="authentication" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="authentication">Authentication</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
            <TabsTrigger value="danger">Danger Zone</TabsTrigger>
          </TabsList>

          <TabsContent value="authentication" className="space-y-6">
            {/* API Endpoint */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="h-5 w-5 mr-2" />
                  API Endpoint
                </CardTitle>
                <CardDescription>
                  Your agent's REST API endpoint
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <code className="text-sm font-mono break-all">{apiEndpoint}</code>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => copyToClipboard(apiEndpoint, 'API Endpoint')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* API Key Management */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Key className="h-5 w-5 mr-2" />
                  API Key
                </CardTitle>
                <CardDescription>
                  Authenticate requests with your secret API key
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted/30 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <code className="text-sm font-mono">
                      {apiKeyVisible ? apiKey : `${apiKey.substring(0, 16)}...`}
                    </code>
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setApiKeyVisible(!apiKeyVisible)}
                      >
                        {apiKeyVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => copyToClipboard(apiKey, 'API Key')}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" onClick={regenerateApiKey}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Regenerate Key
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    Warning: Regenerating will invalidate the current key
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            {/* Access Control */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Access Controls
                </CardTitle>
                <CardDescription>
                  Configure who can access your API
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Public API Access</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow public access to this API endpoint
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {isPublic ? <Unlock className="h-4 w-4 text-green-600" /> : <Lock className="h-4 w-4 text-red-600" />}
                    <Switch 
                      checked={isPublic} 
                      onCheckedChange={setIsPublic}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Label htmlFor="origins">Allowed Origins (CORS)</Label>
                  <Input
                    id="origins"
                    value={allowedOrigins}
                    onChange={(e) => setAllowedOrigins(e.target.value)}
                    placeholder="https://example.com, https://app.example.com"
                  />
                  <p className="text-sm text-muted-foreground">
                    Comma-separated list of domains. Use * for all origins.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Rate Limiting */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Rate Limiting
                </CardTitle>
                <CardDescription>
                  Control request frequency to protect your resources
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="rateLimit">Request Limit</Label>
                    <Input
                      id="rateLimit"
                      type="number"
                      value={rateLimit}
                      onChange={(e) => setRateLimit(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ratePeriod">Per</Label>
                    <Select value={rateLimitPeriod} onValueChange={setRateLimitPeriod}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="minute">Minute</SelectItem>
                        <SelectItem value="hour">Hour</SelectItem>
                        <SelectItem value="day">Day</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-900 dark:text-blue-100">
                        Current limit: {rateLimit} requests per {rateLimitPeriod}
                      </p>
                      <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                        Exceeding this limit will return HTTP 429 responses
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="webhooks" className="space-y-6">
            {/* Webhook Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Webhook className="h-5 w-5 mr-2" />
                  Webhook Configuration
                </CardTitle>
                <CardDescription>
                  Receive real-time notifications about API events
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="webhook">Webhook URL</Label>
                  <Input
                    id="webhook"
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    placeholder="https://your-app.com/webhooks/qaid"
                  />
                  <p className="text-sm text-muted-foreground">
                    We'll send POST requests to this URL when events occur
                  </p>
                </div>

                <Separator />

                <div className="space-y-4">
                  <Label>Webhook Secret</Label>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <code className="text-sm font-mono">{webhookSecret}</code>
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => copyToClipboard(webhookSecret, 'Webhook Secret')}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={regenerateWebhookSecret}>
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Use this secret to verify webhook authenticity
                  </p>
                </div>

                <div className="space-y-3">
                  <Label>Event Types</Label>
                  <div className="space-y-2">
                    {[
                      { id: 'request.success', label: 'Successful Requests', enabled: true },
                      { id: 'request.error', label: 'Failed Requests', enabled: true },
                      { id: 'rate_limit.exceeded', label: 'Rate Limit Exceeded', enabled: false },
                      { id: 'api.updated', label: 'API Configuration Updated', enabled: true }
                    ].map((event) => (
                      <div key={event.id} className="flex items-center justify-between">
                        <Label htmlFor={event.id} className="cursor-pointer">
                          {event.label}
                        </Label>
                        <Switch id={event.id} defaultChecked={event.enabled} className='bg-gray-300'/>
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full !bg-black text-white border-none">
                  Test Webhook
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="danger" className="space-y-6">
            <Card className="border-red-200 dark:border-red-800">
              <CardHeader>
                <CardTitle className="flex items-center text-red-600 dark:text-red-400">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Danger Zone
                </CardTitle>
                <CardDescription>
                  Irreversible and destructive actions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border border-red-200 dark:border-red-800 p-4 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium">Delete API</h4>
                      <p className="text-sm text-muted-foreground">
                        Once you delete this API, there is no going back. This will permanently delete the API endpoint and all associated data.
                      </p>
                    </div>
                    <Button 
                      variant="destructive" 
                      onClick={deleteAPI}
                      className="ml-4 !bg-red-500 text-white border-none rounded"
                    >
                      <Trash2 className="h-4 w-4 mr-2 " />
                      Delete API
                    </Button>
                  </div>
                </div>

                <div className="border border-yellow-200 dark:border-yellow-800 p-4 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium">Reset Usage Statistics</h4>
                      <p className="text-sm text-muted-foreground">
                        This will permanently delete all usage analytics and request logs for this API.
                      </p>
                    </div>
                    <Button variant="outline" className="ml-4 border-yellow-300 text-yellow-700 hover:bg-yellow-50">
                      <Database className="h-4 w-4 mr-2" />
                      Reset Stats
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}