'use client'

import { useState, useEffect } from 'react'
import { Button } from '../common/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../common/ui/card'
import { Badge } from '../common/ui/badge'
import { Progress } from '../common/ui/progress'
import { Separator } from '../common/ui/separator'
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle, 
  Bot, 
  Play,
  Edit3,
  Download,
  Sparkles,
  Settings,
  Zap,
  Target,
  GitBranch,
  Globe
} from 'lucide-react'

interface AgentGenerationOutputPageProps {
  prompt: string
  inputOption: any
  outputOption: any
  credentials: any
  onEdit: () => void
  onDeploy: () => void
  onUseAPI: () => void
  onBack: () => void
}

// Generation steps data
const GENERATION_STEPS = [
  'Analyzing your requirements...',
  'Configuring data sources...',
  'Setting up processing pipeline...',
  'Connecting output channels...',
  'Optimizing performance...',
  'Testing connections...',
  'Finalizing agent configuration...'
] as const

// Flow steps data
const FLOW_STEPS = [
  {
    title: 'Data Collection',
    description: 'Collects data from configured sources',
    icon: <Target className="h-5 w-5" />,
    status: 'configured'
  },
  {
    title: 'AI Processing',
    description: 'Sentiment analysis and pattern recognition',
    icon: <Bot className="h-5 w-5" />,
    status: 'configured'
  },
  {
    title: 'Output Delivery',
    description: 'Delivers processed results to configured outputs',
    icon: <Zap className="h-5 w-5" />,
    status: 'configured'
  }
] as const

export function AgentGenerationOutputPage({ 
  inputOption, 
  outputOption, 
  credentials, 
  onEdit, 
  onDeploy, 
  onUseAPI,
  onBack 
}: AgentGenerationOutputPageProps) {
  const [isGenerating, setIsGenerating] = useState(true)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState('')

  const agentSummary = {
    name: credentials.agentName || 'Customer Sentiment Monitor',
    description: 'AI agent that monitors customer feedback and delivers insights',
    input: inputOption.title,
    output: outputOption.title,
    frequency: credentials.updateFrequency || 'daily',
    estimatedCost: '₹ 1250/month',
    expectedAccuracy: '94%'
  }

  useEffect(() => {
    const generateAgent = async () => {
      for (let i = 0; i < GENERATION_STEPS.length; i++) {
        setCurrentStep(GENERATION_STEPS[i])
        setGenerationProgress(((i + 1) / GENERATION_STEPS.length) * 100)
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
      setIsGenerating(false)
    }

    generateAgent()
  }, [])

  if (isGenerating) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="max-w-lg mx-auto text-center space-y-6">
          <div className="relative">
            <div className="bg-brand-primary p-6 rounded-full w-24 h-24 mx-auto flex items-center justify-center">
              <Sparkles className="h-12 w-12 text-white animate-pulse" />
            </div>
            <div className="absolute inset-0 bg-brand-secondary opacity-25 rounded-full animate-ping"></div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-brand-primary">Generating Your AI Agent</h2>
            <p className="text-muted-foreground">{currentStep}</p>
            
            <div className="space-y-2">
              <Progress value={generationProgress} className="h-3 bg-gray-200" />
              <p className="text-sm text-muted-foreground">{Math.round(generationProgress)}% complete</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-brand-primary p-4 rounded-full">
                <CheckCircle className="h-8 w-8 text-text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-brand-primary bg-clip-text text-brand-primary text-transparent">
              Your Agent is Ready
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Your AI agent has been successfully generated and is ready to deploy
            </p>
          </div>

          {/* Agent Summary */}
          <Card className="mb-8 border-2 border-ui-success/50 bg-ui-success/10 dark:border-ui-success/70 dark:bg-ui-success/10">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bot className="h-6 w-6 text-ui-success" />
                <span>{agentSummary.name}</span>
                <Badge className="bg-ui-success/20 text-ui-success dark:bg-ui-success/30 dark:text-green-200">
                  Ready
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-ui-success">{agentSummary.expectedAccuracy}</div>
                  <div className="text-sm text-muted-foreground">Expected Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-ui-info">{agentSummary.estimatedCost}</div>
                  <div className="text-sm text-muted-foreground">Monthly Cost</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-ui-purple capitalize">{agentSummary.frequency}</div>
                  <div className="text-sm text-muted-foreground">Update Frequency</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-ui-orange">&lt;5s</div>
                  <div className="text-sm text-muted-foreground">Avg Response Time</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Flow Visualization */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <GitBranch className="h-5 w-5" />
                <span>Agent Workflow</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
                {FLOW_STEPS.map((step, index) => (
                  <div key={index} className="flex flex-col items-center text-center space-y-2 flex-1">
                    <div className="bg-brand-gradient p-3 rounded-full text-text-white">
                      {step.icon}
                    </div>
                    <h3 className="font-semibold">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                    <Badge className="bg-ui-success/20 text-ui-success dark:bg-ui-success/30 dark:text-green-200">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Configured
                    </Badge>
                    
                    {index < FLOW_STEPS.length - 1 && (
                      <div className="hidden md:block absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2">
                        <ArrowRight className="h-6 w-6 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Configuration Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Input Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="bg-ui-info/10 p-2 rounded-lg dark:bg-ui-info/20">
                    {inputOption.icon}
                  </div>
                  <div>
                    <p className="font-medium">{inputOption.title}</p>
                    <p className="text-sm text-muted-foreground">{inputOption.description}</p>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Source:</span>
                    <span>{inputOption.badge}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Frequency:</span>
                    <span className="capitalize">{credentials.updateFrequency || 'Daily'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Output Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="bg-ui-purple/10 p-2 rounded-lg dark:bg-ui-purple/20">
                    {outputOption.icon}
                  </div>
                  <div>
                    <p className="font-medium">{outputOption.title}</p>
                    <p className="text-sm text-muted-foreground">{outputOption.description}</p>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type:</span>
                    <span>{outputOption.badge}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery:</span>
                    <span>Real-time</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Actions */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Configuration
            </Button>
            
            <div className="flex flex-wrap gap-3">
              <Button 
                variant="outline" 
                onClick={onEdit}
                className="flex items-center space-x-2"
              >
                <Edit3 className="h-4 w-4" />
                <span>Edit in Builder</span>
              </Button>
              
              <Button 
                variant="outline"
                onClick={onUseAPI}
                className="flex items-center space-x-2 border-ui-info text-ui-info hover:bg-ui-info/10 dark:hover:bg-ui-info/20"
              >
                <Globe className="h-4 w-4" />
                <span>Use via API</span>
              </Button>
              
              <Button 
                variant="outline"
                className="flex items-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Download Config</span>
              </Button>
              
              <Button 
                onClick={onDeploy}
                className="bg-brand-primary text-text-white flex items-center space-x-2"
              >
                <Play className="h-4 w-4" />
                <span>Deploy Now</span>
              </Button>
            </div>
          </div>

          {/* Additional Options */}
          <Card className="mt-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold mb-2">Save as Preset</h3>
                  <p className="text-sm text-muted-foreground">
                    Save this configuration to quickly create similar agents in the future
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Save Preset
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}