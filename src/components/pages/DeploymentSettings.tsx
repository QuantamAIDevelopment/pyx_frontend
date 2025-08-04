'use client'

import { useState } from 'react'
import { Button } from '../common/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../common/ui/card'
import { Input } from '../common/ui/input'
import { Label } from '../common/ui/label'
import { Textarea } from '../common/ui/textarea'
import { Badge } from '../common/ui/badge'
import { Switch } from '../common/ui/switch'
import { Slider } from '../common/ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../common/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../common/ui/tabs'
import { Separator } from '../common/ui/separator'
import { ScrollArea } from '../common/ui/scroll-area'
import { 
  Rocket, 
  Settings, 
  // Key, 
  Shield, 
  Globe, 
  Users, 
  Code, 
  Copy,
  Eye,
  EyeOff,
  // CheckCircle,
  AlertTriangle,
  ExternalLink,
  Download
} from 'lucide-react'

interface Agent {
  id: string
  name: string
  description: string
  version: string
  status: 'draft' | 'deployed' | 'error'
  endpoint?: string
  deployedAt?: string
}

const mockAgents: Agent[] = [
  {
    id: '1',
    name: 'Sentiment Analyzer',
    description: 'Advanced sentiment analysis workflow',
    version: '1.2.0',
    status: 'deployed',
    endpoint: 'https://api.qaid.ai/agents/sentiment-analyzer',
    deployedAt: '2 hours ago'
  },
  {
    id: '2',
    name: 'Email Classifier',
    description: 'Smart email classification system',
    version: '1.0.0',
    status: 'draft'
  },
  {
    id: '3',
    name: 'Product Recommender',
    description: 'AI-powered product recommendations',
    version: '2.1.0',
    status: 'error'
  }
]

export function DeploymentSettings() {
  const [selectedAgent, setSelectedAgent] = useState<Agent>(mockAgents[0])
  const [deploymentConfig, setDeploymentConfig] = useState({
    name: 'sentiment-analyzer-v2',
    description: 'Advanced sentiment analysis with custom training',
    tags: ['nlp', 'sentiment', 'analysis'],
    version: '1.3.0',
    visibility: 'private',
    rateLimits: {
      requestsPerMinute: 100,
      requestsPerHour: 5000,
      requestsPerDay: 50000
    },
    auth: {
      type: 'api-key',
      required: true
    },
    environment: 'production',
    autoScale: true,
    monitoring: true
  })
  const [apiKey, setApiKey] = useState('qaid_live_sk_1234567890abcdef')
  const [showApiKey, setShowApiKey] = useState(false)
  const [isDeploying, setIsDeploying] = useState(false)

  const handleDeploy = async () => {
    setIsDeploying(true)
    // Simulate deployment
    await new Promise(resolve => setTimeout(resolve, 3000))
    setIsDeploying(false)
    
    // Update agent status
    setSelectedAgent(prev => ({
      ...prev,
      status: 'deployed',
      endpoint: `https://api.qaid.ai/agents/${deploymentConfig.name}`,
      deployedAt: 'just now'
    }))
      setApiKey('new_api_key_value');
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const renderAgentSelector = () => (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Select Agent</CardTitle>
        <CardDescription>Choose an agent to configure for deployment</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {mockAgents.map((agent) => (
            <div
              key={agent.id}
              className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                selectedAgent.id === agent.id ? 'border-primary bg-primary/5' : 'hover:bg-accent'
              }`}
              onClick={() => setSelectedAgent(agent)}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-sm">{agent.name}</h4>
                <Badge 
                  variant={agent.status === 'deployed' ? 'default' : agent.status === 'error' ? 'destructive' : 'secondary'}
                >
                  {agent.status}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mb-2">{agent.description}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>v{agent.version}</span>
                {agent.deployedAt && <span>Deployed {agent.deployedAt}</span>}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )

  const renderBasicSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="agent-name">Agent Name</Label>
          <Input
            id="agent-name"
            value={deploymentConfig.name}
            onChange={(e) => setDeploymentConfig({ ...deploymentConfig, name: e.target.value })}
            placeholder="agent-name"
          />
          <p className="text-xs text-muted-foreground">Used in API endpoint URL</p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="version">Version</Label>
          <Input
            id="version"
            value={deploymentConfig.version}
            onChange={(e) => setDeploymentConfig({ ...deploymentConfig, version: e.target.value })}
            placeholder="1.0.0"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={deploymentConfig.description}
          onChange={(e) => setDeploymentConfig({ ...deploymentConfig, description: e.target.value })}
          placeholder="Describe what your agent does..."
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label>Tags</Label>
        <div className="flex flex-wrap gap-2">
          {deploymentConfig.tags.map((tag, index) => (
            <Badge key={index} variant="secondary">
              {tag}
            </Badge>
          ))}
          <Button variant="outline" size="sm" className="h-6 px-2 text-xs">
            + Add Tag
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        <Label>Visibility</Label>
        <Select 
          value={deploymentConfig.visibility} 
          onValueChange={(value) => setDeploymentConfig({ ...deploymentConfig, visibility: value })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="public">
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4" />
                <span>Public - Available in marketplace</span>
              </div>
            </SelectItem>
            <SelectItem value="private">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>Private - Only you can access</span>
              </div>
            </SelectItem>
            <SelectItem value="team">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Team - Team members only</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <Label>Environment</Label>
        <Select 
          value={deploymentConfig.environment} 
          onValueChange={(value) => setDeploymentConfig({ ...deploymentConfig, environment: value })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="development">Development</SelectItem>
            <SelectItem value="staging">Staging</SelectItem>
            <SelectItem value="production">Production</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )

  const renderApiSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-base">Authentication Required</Label>
            <p className="text-sm text-muted-foreground">Require API key for access</p>
          </div>
          <Switch
            checked={deploymentConfig.auth.required}
            onCheckedChange={(checked) => 
              setDeploymentConfig({ 
                ...deploymentConfig, 
                auth: { ...deploymentConfig.auth, required: checked }
              })
            }
          />
        </div>

        {deploymentConfig.auth.required && (
          <div className="space-y-3">
            <Label>Authentication Type</Label>
            <Select 
              value={deploymentConfig.auth.type} 
              onValueChange={(value) => 
                setDeploymentConfig({ 
                  ...deploymentConfig, 
                  auth: { ...deploymentConfig.auth, type: value }
                })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="api-key">API Key</SelectItem>
                <SelectItem value="oauth">OAuth 2.0</SelectItem>
                <SelectItem value="jwt">JWT Token</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <Separator />

      <div className="space-y-4">
        <Label className="text-base">Rate Limits</Label>
        
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="text-sm">Requests per minute</Label>
              <span className="text-sm font-medium">{deploymentConfig.rateLimits.requestsPerMinute}</span>
            </div>
            <Slider
              value={[deploymentConfig.rateLimits.requestsPerMinute]}
              onValueChange={([value]) => 
                setDeploymentConfig({
                  ...deploymentConfig,
                  rateLimits: { ...deploymentConfig.rateLimits, requestsPerMinute: value }
                })
              }
              max={1000}
              step={10}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="text-sm">Requests per hour</Label>
              <span className="text-sm font-medium">{deploymentConfig.rateLimits.requestsPerHour}</span>
            </div>
            <Slider
              value={[deploymentConfig.rateLimits.requestsPerHour]}
              onValueChange={([value]) => 
                setDeploymentConfig({
                  ...deploymentConfig,
                  rateLimits: { ...deploymentConfig.rateLimits, requestsPerHour: value }
                })
              }
              max={50000}
              step={100}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="text-sm">Requests per day</Label>
              <span className="text-sm font-medium">{deploymentConfig.rateLimits.requestsPerDay}</span>
            </div>
            <Slider
              value={[deploymentConfig.rateLimits.requestsPerDay]}
              onValueChange={([value]) => 
                setDeploymentConfig({
                  ...deploymentConfig,
                  rateLimits: { ...deploymentConfig.rateLimits, requestsPerDay: value }
                })
              }
              max={1000000}
              step={1000}
            />
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-base">Auto-scaling</Label>
            <p className="text-sm text-muted-foreground">Automatically scale based on demand</p>
          </div>
          <Switch
            checked={deploymentConfig.autoScale}
            onCheckedChange={(checked) => setDeploymentConfig({ ...deploymentConfig, autoScale: checked })}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label className="text-base">Monitoring</Label>
            <p className="text-sm text-muted-foreground">Enable detailed monitoring and logging</p>
          </div>
          <Switch
            checked={deploymentConfig.monitoring}
            onCheckedChange={(checked) => setDeploymentConfig({ ...deploymentConfig, monitoring: checked })}
          />
        </div>
      </div>
    </div>
  )

  const renderOutputSchema = () => (
    <div className="space-y-4">
      <div>
        <Label className="text-base">Output Schema</Label>
        <p className="text-sm text-muted-foreground">JSON schema for API response</p>
      </div>
      
      <Card>
        <CardContent className="p-4">
          <pre className="text-sm bg-muted p-4 rounded-lg overflow-x-auto">
{`{
  "type": "object",
  "properties": {
    "sentiment": {
      "type": "number",
      "description": "Sentiment score (-1 to 1)"
    },
    "confidence": {
      "type": "number",
      "description": "Confidence score (0 to 1)"
    },
    "classification": {
      "type": "string",
      "enum": ["positive", "negative", "neutral"],
      "description": "Sentiment classification"
    }
  },
  "required": ["sentiment", "confidence", "classification"]
}`}
          </pre>
        </CardContent>
      </Card>

      <div className="flex space-x-2">
        <Button variant="outline" size="sm">
          <Code className="h-4 w-4 mr-2" />
          Edit Schema
        </Button>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
      </div>
    </div>
  )

  const renderEndpointInfo = () => (
    <div className="space-y-4">
      {selectedAgent.status === 'deployed' && selectedAgent.endpoint ? (
        <>
          <div>
            <Label className="text-base">API Endpoint</Label>
            <div className="mt-2 flex items-center space-x-2">
              <Input
                value={selectedAgent.endpoint}
                readOnly
                className="font-mono text-sm"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => copyToClipboard(selectedAgent.endpoint!)}
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <Label className="text-base">API Key</Label>
            <div className="mt-2 flex items-center space-x-2">
              <Input
                value={showApiKey ? apiKey : '•'.repeat(apiKey.length)}
                readOnly
                className="font-mono text-sm"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowApiKey(!showApiKey)}
              >
                {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => copyToClipboard(apiKey)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Usage Example</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
{`curl -X POST "${selectedAgent.endpoint}" \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "text": "I love this product!"
  }'`}
              </pre>
            </CardContent>
          </Card>
        </>
      ) : (
        <div className="text-center py-8">
          <AlertTriangle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">Agent not deployed yet</p>
          <p className="text-xs text-muted-foreground">Deploy your agent to get API endpoint</p>
        </div>
      )}
    </div>
  )

  return (
    <div className="h-full flex flex-col min-h-0">
      {/* Header */}
      <div className="border-b p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold">Deployment Settings</h2>
            <p className="text-sm text-muted-foreground">Configure and deploy your AI agents</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Advanced
            </Button>
            <Button 
              onClick={handleDeploy}
              disabled={isDeploying}
              className="bg-gradient-to-r from-orange-600 to-orange-500 text-white hover:from-orange-700 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isDeploying ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Deploying...
                </>
              ) : (
                <>
                  <Rocket className="h-4 w-4 mr-2" />
                  Deploy
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-h-0">
        <div className="grid grid-cols-1 lg:grid-cols-4 h-full">
          {/* Agent Selector */}
          <div className="border-r p-4">
            {renderAgentSelector()}
          </div>

          {/* Main Settings */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="basic" className="h-full flex flex-col">
              <div className="border-b px-4">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="basic">Basic</TabsTrigger>
                  <TabsTrigger value="api">API & Auth</TabsTrigger>
                  <TabsTrigger value="schema">Schema</TabsTrigger>
                  <TabsTrigger value="endpoint">Endpoint</TabsTrigger>
                </TabsList>
              </div>
              
              <div className="flex-1 overflow-hidden">
                <ScrollArea className="h-full">
                  <div className="p-6">
                    <TabsContent value="basic" className="m-0">
                      {renderBasicSettings()}
                    </TabsContent>
                    
                    <TabsContent value="api" className="m-0">
                      {renderApiSettings()}
                    </TabsContent>
                    
                    <TabsContent value="schema" className="m-0">
                      {renderOutputSchema()}
                    </TabsContent>
                    
                    <TabsContent value="endpoint" className="m-0">
                      {renderEndpointInfo()}
                    </TabsContent>
                  </div>
                </ScrollArea>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}