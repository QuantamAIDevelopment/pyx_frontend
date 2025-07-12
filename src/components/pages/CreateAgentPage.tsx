'use client'

import { useState } from 'react'
import { Button } from '../common/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../common/ui/card'
import { Textarea } from '../common/ui/textarea'
// import { Input } from '../common/ui/input'
import { Label } from '../common/ui/label'
import { Badge } from '../common/ui/badge'
import { Separator } from '../common/ui/separator'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../common/ui/dialog'
import { ScrollArea } from '../common/ui/scroll-area'
import { Progress } from '../common/ui/progress'
import { toast } from 'sonner'
import { 
  ArrowLeft, 
  Send, 
  Wand2, 
  Play, 
  Rocket, 
  ShoppingBag,
  MessageCircle,
  Bot,
  Sparkles,
  Zap,
  RefreshCw,
  Copy,
  Download,
  Share,
  ExternalLink,
  CheckCircle,
  // AlertCircle,
  Info,
  // DollarSign,
  CreditCard,
  Globe,
  // Code2,
  // Settings,
  TestTube,
  // Clock,
  // Target
} from 'lucide-react'

interface AgentPreview {
  name: string
  description: string
  capabilities: string[]
  category: string
  estimatedCost: string
}

interface CreateAgentPageProps {
  onBack: () => void
  onDeploy: (agent: AgentPreview) => void
  onViewAPIDocs?: () => void
  isLoggedIn: boolean
  onShowAuth: (mode: 'login' | 'signup') => void
}

export function CreateAgentPage({ onBack, onDeploy, onViewAPIDocs, isLoggedIn, onShowAuth }: CreateAgentPageProps) {
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [agentPreview, setAgentPreview] = useState<AgentPreview | null>(null)

  // Modal states
  const [showRefinementModal, setShowRefinementModal] = useState(false)
  const [showDemoModal, setShowDemoModal] = useState(false)
  const [showDeployModal, setShowDeployModal] = useState(false)
  const [showAPIModal, setShowAPIModal] = useState(false)

  // Demo states
  const [demoInput, setDemoInput] = useState('')
  const [demoOutput, setDemoOutput] = useState('')
  const [isRunningDemo, setIsRunningDemo] = useState(false)

  // Deployment states
  const [deploymentProgress, setDeploymentProgress] = useState(0)
  const [isDeploying, setIsDeploying] = useState(false)
  const [deploymentStep, setDeploymentStep] = useState('')

  // Refinement state
  const [refinementPrompt, setRefinementPrompt] = useState('')
  const [isRefining, setIsRefining] = useState(false)
  const [chatHistory, setChatHistory] = useState<Array<{
    type: 'user' | 'assistant'
    content: string
    timestamp: Date
  }>>([
    {
      type: 'assistant',
      content: "Hi! I'm here to help you create your custom AI agent. Describe what you want your agent to do, and I'll generate it for you. For example:\n\n• \"Create an agent that writes product reviews for electronics\"\n• \"I need an agent that manages customer support tickets\"\n• \"Build an agent that analyzes social media sentiment\"",
      timestamp: new Date()
    }
  ])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim()) return

    // Add user message to chat
    const userMessage = {
      type: 'user' as const,
      content: prompt,
      timestamp: new Date()
    }
    setChatHistory(prev => [...prev, userMessage])
    setPrompt('')
    setIsGenerating(true)

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Generate agent preview based on prompt
    const preview = generateAgentPreview(userMessage.content)
    setAgentPreview(preview)

    // Add assistant response
    const assistantMessage = {
      type: 'assistant' as const,
      content: `Great! I've created "${preview.name}" based on your requirements. This agent will ${preview.description.toLowerCase()}. You can refine the agent, try a demo, or deploy it to your workspace.`,
      timestamp: new Date()
    }
    setChatHistory(prev => [...prev, assistantMessage])
    setIsGenerating(false)
  }

  const generateAgentPreview = (userPrompt: string): AgentPreview => {
    // Simple keyword-based agent generation for demo
    const lowercasePrompt = userPrompt.toLowerCase()
    
    if (lowercasePrompt.includes('review') || lowercasePrompt.includes('product')) {
      return {
        name: 'ReviewCraft Pro',
        description: 'Generates detailed, authentic product reviews with SEO optimization and sentiment analysis',
        capabilities: ['Product Analysis', 'Review Generation', 'SEO Optimization', 'Sentiment Analysis'],
        category: 'Content Generation',
        estimatedCost: '$0.02/review'
      }
    } else if (lowercasePrompt.includes('support') || lowercasePrompt.includes('customer')) {
      return {
        name: 'SupportMaster AI',
        description: 'Handles customer inquiries, ticket routing, and provides intelligent responses 24/7',
        capabilities: ['Ticket Management', 'Auto-Response', 'Sentiment Detection', 'Escalation Logic'],
        category: 'Customer Support',
        estimatedCost: '$0.05/interaction'
      }
    } else if (lowercasePrompt.includes('social') || lowercasePrompt.includes('sentiment')) {
      return {
        name: 'SocialSense Analytics',
        description: 'Monitors social media mentions and analyzes sentiment across multiple platforms',
        capabilities: ['Social Monitoring', 'Sentiment Analysis', 'Trend Detection', 'Report Generation'],
        category: 'Analytics',
        estimatedCost: '$0.01/mention'
      }
    } else {
      return {
        name: 'CustomFlow Agent',
        description: 'A versatile AI agent tailored to your specific workflow requirements',
        capabilities: ['Custom Logic', 'Data Processing', 'API Integration', 'Workflow Automation'],
        category: 'General Purpose',
        estimatedCost: '$0.03/operation'
      }
    }
  }

  // Button Handlers
  const handleRefine = () => {
    if (!isLoggedIn) {
      onShowAuth('login')
      return
    }
    setRefinementPrompt(`Please refine the agent "${agentPreview?.name}" to:`)
    setShowRefinementModal(true)
  }

  const handleTryDemo = () => {
    if (!isLoggedIn) {
      onShowAuth('signup')
      return
    }
    setDemoInput('')
    setDemoOutput('')
    setShowDemoModal(true)
  }

  const handleDeploy = () => {
    if (!isLoggedIn) {
      onShowAuth('signup')
      return
    }
    setShowDeployModal(true)
  }

  const handleBuyAPIAccess = () => {
    if (!isLoggedIn) {
      onShowAuth('signup')
      return
    }
    setShowAPIModal(true)
  }

  // Refinement functionality
  const handleSubmitRefinement = async () => {
    if (!refinementPrompt.trim()) return
    
    setIsRefining(true)
    setShowRefinementModal(false)

    // Add refinement message to chat
    const refinementMessage = {
      type: 'user' as const,
      content: refinementPrompt,
      timestamp: new Date()
    }
    setChatHistory(prev => [...prev, refinementMessage])

    // Simulate AI processing for refinement
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Generate refined agent
    const refinedAgent = generateRefinedAgent(refinementPrompt, agentPreview!)
    setAgentPreview(refinedAgent)

    // Add assistant response
    const assistantMessage = {
      type: 'assistant' as const,
      content: `Perfect! I've refined "${refinedAgent.name}" based on your feedback. The agent now has enhanced capabilities and improved functionality.`,
      timestamp: new Date()
    }
    setChatHistory(prev => [...prev, assistantMessage])
    setIsRefining(false)
    toast.success('Agent refined successfully! 🎯')
  }

  const generateRefinedAgent = (refinementPrompt: string, originalAgent: AgentPreview): AgentPreview => {
    // Simple refinement logic - in a real app this would use actual AI
    const lowercasePrompt = refinementPrompt.toLowerCase()
    
    if (lowercasePrompt.includes('faster') || lowercasePrompt.includes('speed')) {
      return {
        ...originalAgent,
        name: originalAgent.name + ' Turbo',
        capabilities: [...originalAgent.capabilities, 'High-Speed Processing', 'Real-time Analysis'],
        estimatedCost: originalAgent.estimatedCost.replace(/\d+/, (match) => String(Math.floor(parseInt(match) * 1.3)))
      }
    } else if (lowercasePrompt.includes('accurate') || lowercasePrompt.includes('precision')) {
      return {
        ...originalAgent,
        name: originalAgent.name + ' Precision',
        capabilities: [...originalAgent.capabilities, 'Advanced Accuracy', 'Precision Analysis'],
        estimatedCost: originalAgent.estimatedCost.replace(/\d+/, (match) => String(Math.floor(parseInt(match) * 1.2)))
      }
    } else {
      return {
        ...originalAgent,
        name: originalAgent.name + ' Enhanced',
        capabilities: [...originalAgent.capabilities, 'Enhanced Features', 'Improved Performance']
      }
    }
  }

  // Demo functionality
  const handleRunDemo = async () => {
    if (!demoInput.trim()) {
      toast.error('Please enter some input to run the demo')
      return
    }

    setIsRunningDemo(true)
    try {
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Generate sample output based on agent type
      let output = ''
      if (agentPreview?.category === 'Content Generation') {
        output = `Generated content for "${demoInput}": This premium product delivers exceptional value with innovative features designed for modern users. Key benefits include enhanced performance, user-friendly design, and reliable functionality that exceeds expectations.`
      } else if (agentPreview?.category === 'Customer Support') {
        output = `Thank you for your inquiry about "${demoInput}". I've analyzed your request and here's what I can help you with: [Automated response with relevant solutions and next steps based on your input]`
      } else if (agentPreview?.category === 'Analytics') {
        output = `Analysis complete for "${demoInput}": Positive sentiment: 87%, Key themes: quality, value, performance. Recommended actions: highlight key benefits, address minor concerns, optimize for conversion.`
      } else {
        output = `Processed "${demoInput}" successfully. Analysis complete with actionable insights and recommendations for optimization.`
      }
      
      setDemoOutput(output)
      toast.success('Demo completed successfully! 🎉')
    } catch (error) {
      toast.error('Demo failed to run. Please try again.')
    } finally {
      setIsRunningDemo(false)
    }
  }

  // Deployment functionality
  const handleStartDeployment = async () => {
    setIsDeploying(true)
    setDeploymentProgress(0)
    
    const deploySteps = [
      'Initializing deployment...',
      'Setting up infrastructure...',
      'Configuring AI models...',
      'Establishing connections...',
      'Running tests...',
      'Finalizing deployment...'
    ]

    for (let i = 0; i < deploySteps.length; i++) {
      setDeploymentStep(deploySteps[i])
      setDeploymentProgress(((i + 1) / deploySteps.length) * 100)
      await new Promise(resolve => setTimeout(resolve, 1500))
    }

    setIsDeploying(false)
    setShowDeployModal(false)
    toast.success('Agent deployed successfully! 🚀')
    
    if (agentPreview) {
      onDeploy(agentPreview)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard!')
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Create AI Agent</h1>
            <p className="text-muted-foreground">Describe your agent in natural language and watch it come to life</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Chat Interface */}
          <div className="space-y-6">
            <Card className="h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2 text-blue-600" />
                  Agent Creation Assistant
                </CardTitle>
                <CardDescription>
                  Describe what you want your AI agent to do
                </CardDescription>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col">
                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                  {chatHistory.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.type === 'user'
                            ? 'bg-primary text-primary-foreground ml-4'
                            : 'bg-muted mr-4'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {isGenerating && (
                    <div className="flex justify-start">
                      <div className="bg-muted p-3 rounded-lg mr-4">
                        <div className="flex items-center space-x-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                          <span className="text-sm">Generating your agent...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input Form */}
                <form onSubmit={handleSubmit} className="flex space-x-2">
                  <Textarea
                    placeholder="Describe your AI agent..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="flex-1 min-h-[60px] resize-none"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        handleSubmit(e)
                      }
                    }}
                  />
                  <Button 
                    type="submit" 
                    size="lg" 
                    disabled={!prompt.trim() || isGenerating}
                    className="px-6"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Agent Preview */}
          <div className="space-y-6">
            {agentPreview ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bot className="h-5 w-5 mr-2 text-purple-600" />
                    Agent Preview
                  </CardTitle>
                  <CardDescription>
                    Review your generated agent before deployment
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Agent Details */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-bold text-lg">{agentPreview.name}</h3>
                      <p className="text-muted-foreground">{agentPreview.description}</p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Badge>{agentPreview.category}</Badge>
                      <Badge variant="outline">{agentPreview.estimatedCost}</Badge>
                    </div>
                  </div>

                  <Separator />

                  {/* Capabilities */}
                  <div>
                    <h4 className="font-medium mb-3">Capabilities</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {agentPreview.capabilities.map((capability, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm">
                          <Sparkles className="h-3 w-3 text-blue-500" />
                          <span>{capability}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Sample Output */}
                  <div>
                    <h4 className="font-medium mb-3">Sample Output</h4>
                    <div className="bg-muted/50 rounded-lg p-4 border-l-4 border-blue-500">
                      <p className="text-sm italic">
                        {agentPreview.category === 'Content Generation' 
                          ? `"The Wireless Earbuds ZX100 deliver exceptional audio quality with active noise cancellation and 8-hour battery life. Perfect for commuters and fitness enthusiasts seeking premium sound in a compact design."`
                          : agentPreview.category === 'Customer Support'
                          ? `"Thank you for contacting us about the ZX100 earbuds. I can help you with setup, troubleshooting, or any questions about features. What specific assistance do you need today?"`
                          : `"Positive sentiment detected: 85% satisfaction rate. Key mentions: 'great sound quality', 'comfortable fit', 'excellent battery life'. Trending hashtags: #ZX100 #WirelessAudio"`
                        }
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col space-y-3">
                    <Button 
                      onClick={handleRefine} 
                      variant="outline" 
                      className="w-full"
                      disabled={isRefining}
                    >
                      {isRefining ? (
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Wand2 className="h-4 w-4 mr-2" />
                      )}
                      {isRefining ? 'Refining...' : 'Refine Agent'}
                    </Button>
                    <Button 
                      onClick={handleTryDemo}
                      variant="outline" 
                      className="w-full"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Try Demo
                    </Button>
                    <Button 
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" 
                      onClick={handleDeploy}
                    >
                      <Rocket className="h-4 w-4 mr-2" />
                      Deploy Agent
                    </Button>
                    <Button 
                      onClick={handleBuyAPIAccess}
                      variant="outline" 
                      className="w-full border-green-500 text-green-600 hover:bg-green-50 dark:hover:bg-green-950/20"
                    >
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      Buy API Access
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="h-[600px] flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mx-auto">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium">No Agent Generated Yet</h3>
                    <p className="text-sm text-muted-foreground">
                      Start describing your agent in the chat to see a preview here
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Refinement Modal */}
      <Dialog open={showRefinementModal} onOpenChange={setShowRefinementModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Wand2 className="h-5 w-5 mr-2 text-purple-600" />
              Refine Your Agent
            </DialogTitle>
            <DialogDescription>
              Describe how you'd like to improve or modify "{agentPreview?.name}"
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="refinement-prompt">Refinement Instructions</Label>
              <Textarea
                id="refinement-prompt"
                placeholder="e.g., Make it faster, add accuracy features, optimize for mobile..."
                value={refinementPrompt}
                onChange={(e) => setRefinementPrompt(e.target.value)}
                className="mt-2"
                rows={4}
              />
            </div>
            <div className="flex space-x-3">
              <Button
                onClick={handleSubmitRefinement}
                disabled={!refinementPrompt.trim()}
                className="flex-1"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Apply Refinements
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowRefinementModal(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Demo Modal */}
      <Dialog open={showDemoModal} onOpenChange={setShowDemoModal}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <TestTube className="h-5 w-5 mr-2 text-blue-600" />
              Try {agentPreview?.name} Demo
            </DialogTitle>
            <DialogDescription>
              Test your agent with sample data to see how it performs
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[70vh] pr-4">
            <div className="space-y-6">
              {/* Demo Input */}
              <div>
                <Label htmlFor="demo-input">Test Input</Label>
                <Textarea
                  id="demo-input"
                  placeholder={
                    agentPreview?.category === 'Content Generation'
                      ? 'Enter product details to generate content...'
                      : agentPreview?.category === 'Customer Support'
                      ? 'Enter a customer inquiry...'
                      : agentPreview?.category === 'Analytics'
                      ? 'Enter text to analyze...'
                      : 'Enter your test data...'
                  }
                  value={demoInput}
                  onChange={(e) => setDemoInput(e.target.value)}
                  className="mt-2"
                  rows={4}
                />
              </div>

              {/* Demo Controls */}
              <div className="flex items-center space-x-3">
                <Button 
                  onClick={handleRunDemo} 
                  disabled={isRunningDemo || !demoInput.trim()}
                  className="flex-1"
                >
                  {isRunningDemo ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Run Demo
                    </>
                  )}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setDemoInput('')
                    setDemoOutput('')
                  }}
                >
                  Clear
                </Button>
              </div>

              {/* Demo Output */}
              {demoOutput && (
                <div>
                  <Label>Demo Output</Label>
                  <div className="mt-2 p-4 bg-muted/50 rounded-lg border border-green-200 dark:border-green-800">
                    <p className="text-sm leading-relaxed">{demoOutput}</p>
                  </div>
                  <div className="flex space-x-2 mt-3">
                    <Button variant="outline" size="sm" onClick={() => copyToClipboard(demoOutput)}>
                      <Copy className="h-3 w-3 mr-1" />
                      Copy
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-3 w-3 mr-1" />
                      Export
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share className="h-3 w-3 mr-1" />
                      Share
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Deploy Modal */}
      <Dialog open={showDeployModal} onOpenChange={setShowDeployModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Rocket className="h-5 w-5 mr-2 text-blue-600" />
              Deploy {agentPreview?.name}
            </DialogTitle>
            <DialogDescription>
              Deploy your agent to make it available for use
            </DialogDescription>
          </DialogHeader>
          
          {isDeploying ? (
            <div className="space-y-6 py-6">
              <div className="text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mx-auto mb-4">
                  <Rocket className="h-8 w-8 text-white animate-pulse" />
                </div>
                <h3 className="font-medium mb-2">Deploying Your Agent</h3>
                <p className="text-sm text-muted-foreground">{deploymentStep}</p>
              </div>
              
              <div className="space-y-2">
                <Progress value={deploymentProgress} className="h-3" />
                <p className="text-sm text-muted-foreground text-center">
                  {Math.round(deploymentProgress)}% complete
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                <div className="flex items-start space-x-3">
                  <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-800 dark:text-blue-200">Deployment Information</h4>
                    <ul className="text-sm text-blue-700 dark:text-blue-300 mt-2 space-y-1">
                      <li>• Your agent will be deployed to the cloud</li>
                      <li>• It will be available via API and dashboard</li>
                      <li>• Deployment typically takes 2-3 minutes</li>
                      <li>• You can monitor usage and performance after deployment</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estimated Cost:</span>
                  <span className="font-medium">{agentPreview?.estimatedCost}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Deployment Time:</span>
                  <span className="font-medium">~3 minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Availability:</span>
                  <span className="font-medium">Immediate</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Scaling:</span>
                  <span className="font-medium">Auto</span>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button
                  onClick={handleStartDeployment}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Rocket className="h-4 w-4 mr-2" />
                  Start Deployment
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowDeployModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* API Access Modal */}
      <Dialog open={showAPIModal} onOpenChange={setShowAPIModal}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <ShoppingBag className="h-5 w-5 mr-2 text-green-600" />
              API Access Plans
            </DialogTitle>
            <DialogDescription>
              Choose the right plan for your {agentPreview?.name} usage
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Starter Plan */}
            <Card className="border-2 border-muted">
              <CardHeader>
                <CardTitle className="text-lg">Starter</CardTitle>
                <div className="text-3xl font-bold">$9<span className="text-lg font-normal">/month</span></div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />1,000 API calls/month</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Basic support</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />99.5% uptime SLA</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />API documentation</li>
                </ul>
                <Button variant="outline" className="w-full">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Choose Starter
                </Button>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="border-2 border-blue-500 relative">
              <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-500">
                Popular
              </Badge>
              <CardHeader>
                <CardTitle className="text-lg">Pro</CardTitle>
                <div className="text-3xl font-bold">$49<span className="text-lg font-normal">/month</span></div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />10,000 API calls/month</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Priority support</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />99.9% uptime SLA</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Advanced analytics</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Custom integrations</li>
                </ul>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Choose Pro
                </Button>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="border-2 border-purple-500">
              <CardHeader>
                <CardTitle className="text-lg">Enterprise</CardTitle>
                <div className="text-3xl font-bold">Custom</div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Unlimited API calls</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Dedicated support</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />99.99% uptime SLA</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />On-premise deployment</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Custom features</li>
                </ul>
                <Button variant="outline" className="w-full border-purple-500 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950/20">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-between items-center pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => onViewAPIDocs?.()}
              className="flex items-center"
            >
              <Globe className="h-4 w-4 mr-2" />
              View API Documentation
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowAPIModal(false)}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}