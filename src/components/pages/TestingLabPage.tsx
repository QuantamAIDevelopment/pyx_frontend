'use client'

import { useState } from 'react'
import { Button } from '../common/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../common/ui/card'
// import { Input } from '../common/ui/input'
import { Label } from '../common/ui/label'
import { Textarea } from '../common/ui/textarea'
import { Badge } from '../common/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../common/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../common/ui/select'
import { Progress } from '../common/ui/progress'
import { Separator } from '../common/ui/separator'
import { ScrollArea } from '../common/ui/scroll-area'
import {
  // BarChart,
  // Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts'
import { 
  ArrowLeft, 
  Play, 
  // Square, 
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  Zap,
  Activity,
  TrendingUp,
  // Bug,
  Shield,
  Gauge,
  FileText,
  Download,
  Upload,
  Settings,
  AlertTriangle,
  Target,
  Timer,
  Database,
  Globe,
  Code
} from 'lucide-react'

interface TestResult {
  id: string
  name: string
  status: 'passed' | 'failed' | 'running' | 'pending'
  duration: number
  timestamp: string
  input: string
  expectedOutput: string
  actualOutput: string
  errorMessage?: string
}

interface TestSuite {
  id: string
  name: string
  description: string
  tests: TestResult[]
  lastRun: string
  status: 'passed' | 'failed' | 'partial'
}

interface PerformanceMetric {
  timestamp: string
  responseTime: number
  memoryUsage: number
  cpuUsage: number
  accuracy: number
}

interface TestingLabPageProps {
  onBack: () => void
  selectedAgent?: any
  onSelectAgent: (agent: any) => void
}

const mockAgents = [
  { id: '1', name: 'SmartSummarizer', category: 'Content' },
  { id: '2', name: 'SupportGenie', category: 'Support' },
  { id: '3', name: 'PriceOptimizer', category: 'Sales' },
  { id: '4', name: 'StockSense', category: 'Inventory' }
]

const mockTestSuites: TestSuite[] = [
  {
    id: '1',
    name: 'Basic Functionality',
    description: 'Core feature validation tests',
    lastRun: '2 hours ago',
    status: 'passed',
    tests: [
      {
        id: '1',
        name: 'Input Processing',
        status: 'passed',
        duration: 245,
        timestamp: '2 hours ago',
        input: 'Test product description',
        expectedOutput: 'Processed summary',
        actualOutput: 'Processed summary'
      },
      {
        id: '2',
        name: 'Output Format',
        status: 'passed',
        duration: 180,
        timestamp: '2 hours ago',
        input: 'Format validation',
        expectedOutput: '{"summary": "..."}',
        actualOutput: '{"summary": "..."}'
      }
    ]
  },
  {
    id: '2',
    name: 'Edge Cases',
    description: 'Boundary condition and error handling tests',
    lastRun: '1 day ago',
    status: 'failed',
    tests: [
      {
        id: '3',
        name: 'Empty Input',
        status: 'failed',
        duration: 100,
        timestamp: '1 day ago',
        input: '',
        expectedOutput: 'Error: Input required',
        actualOutput: 'Null response',
        errorMessage: 'Agent failed to handle empty input gracefully'
      },
      {
        id: '4',
        name: 'Large Input',
        status: 'passed',
        duration: 850,
        timestamp: '1 day ago',
        input: 'Very long text...',
        expectedOutput: 'Truncated summary',
        actualOutput: 'Truncated summary'
      }
    ]
  },
  {
    id: '3',
    name: 'Performance Tests',
    description: 'Load and performance validation',
    lastRun: '3 hours ago',
    status: 'partial',
    tests: [
      {
        id: '5',
        name: 'Response Time',
        status: 'passed',
        duration: 320,
        timestamp: '3 hours ago',
        input: 'Performance test input',
        expectedOutput: '< 500ms response',
        actualOutput: '320ms response'
      },
      {
        id: '6',
        name: 'Concurrent Requests',
        status: 'running',
        duration: 0,
        timestamp: 'Running...',
        input: '50 concurrent requests',
        expectedOutput: 'All requests handled',
        actualOutput: 'In progress...'
      }
    ]
  }
]

const performanceData: PerformanceMetric[] = [
  { timestamp: '00:00', responseTime: 280, memoryUsage: 45, cpuUsage: 23, accuracy: 94 },
  { timestamp: '00:05', responseTime: 320, memoryUsage: 52, cpuUsage: 31, accuracy: 92 },
  { timestamp: '00:10', responseTime: 245, memoryUsage: 48, cpuUsage: 28, accuracy: 96 },
  { timestamp: '00:15', responseTime: 410, memoryUsage: 61, cpuUsage: 45, accuracy: 89 },
  { timestamp: '00:20', responseTime: 298, memoryUsage: 49, cpuUsage: 26, accuracy: 95 },
  { timestamp: '00:25', responseTime: 365, memoryUsage: 55, cpuUsage: 38, accuracy: 91 },
  { timestamp: '00:30', responseTime: 275, memoryUsage: 44, cpuUsage: 24, accuracy: 97 }
]

export function TestingLabPage({ onBack, selectedAgent, onSelectAgent }: TestingLabPageProps) {
  const [currentAgent, setCurrentAgent] = useState(selectedAgent || mockAgents[0])
  const [isRunningTests, setIsRunningTests] = useState(false)
  const [testProgress, setTestProgress] = useState(0)
  const [activeTab, setActiveTab] = useState('test-runner')
  const [selectedTestSuite, setSelectedTestSuite] = useState<TestSuite | null>(null)
  const [testInput, setTestInput] = useState('')
  const [testOutput, setTestOutput] = useState('')
  const [isQuickTesting, setIsQuickTesting] = useState(false)

  const runTestSuite = async () => {
    setIsRunningTests(true)
    setTestProgress(0)

    // Simulate test execution
    const interval = setInterval(() => {
      setTestProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsRunningTests(false)
          return 100
        }
        return prev + 10
      })
    }, 500)
  }

  const runQuickTest = async () => {
    if (!testInput.trim()) return
    
    setIsQuickTesting(true)
    
    // Simulate agent processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Mock response based on current agent
    const mockResponse = currentAgent.category === 'Content' 
      ? `Summary: ${testInput.slice(0, 50)}...`
      : currentAgent.category === 'Support'
      ? `Response: I can help you with: ${testInput}`
      : `Analysis: ${testInput} processed successfully.`
    
    setTestOutput(mockResponse)
    setIsQuickTesting(false)
  }

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-600" />
      case 'running':
        return <Clock className="h-4 w-4 text-blue-600 animate-spin" />
      case 'pending':
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
      case 'partial':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
      case 'running':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
    }
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Agent Testing Lab</h1>
              <p className="text-muted-foreground">Test, validate, and optimize your AI agents before deployment</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Select value={currentAgent.id} onValueChange={(value) => {
              const agent = mockAgents.find(a => a.id === value)
              if (agent) {
                setCurrentAgent(agent)
                onSelectAgent(agent)
              }
            }}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {mockAgents.map(agent => (
                  <SelectItem key={agent.id} value={agent.id}>
                    {agent.name} ({agent.category})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="test-runner">
              <Play className="h-4 w-4 mr-2" />
              Test Runner
            </TabsTrigger>
            <TabsTrigger value="quick-test">
              <Zap className="h-4 w-4 mr-2" />
              Quick Test
            </TabsTrigger>
            <TabsTrigger value="performance">
              <Gauge className="h-4 w-4 mr-2" />
              Performance
            </TabsTrigger>
            <TabsTrigger value="security">
              <Shield className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger value="reports">
              <FileText className="h-4 w-4 mr-2" />
              Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="test-runner" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Test Suites */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle>Test Suites</CardTitle>
                  <CardDescription>
                    Select a test suite to run or view results
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockTestSuites.map(suite => (
                      <div
                        key={suite.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedTestSuite?.id === suite.id ? 'border-primary bg-primary/5' : 'hover:border-primary/50'
                        }`}
                        onClick={() => setSelectedTestSuite(suite)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">{suite.name}</h3>
                          <Badge className={getStatusColor(suite.status)}>
                            {suite.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{suite.description}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{suite.tests.length} tests</span>
                          <span>Last run: {suite.lastRun}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 space-y-2">
                    <Button 
                      className="w-full !text-white !bg-gray-700 border-none" 
                      onClick={() => selectedTestSuite && runTestSuite()}
                      disabled={!selectedTestSuite || isRunningTests}
                    >
                      {isRunningTests ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Running Tests...
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          Run Selected Suite
                        </>
                      )}
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Settings className="h-4 w-4 mr-2" />
                      Configure Tests
                    </Button>
                  </div>
                  
                  {isRunningTests && (
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{testProgress}%</span>
                      </div>
                      <Progress value={testProgress} />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Test Results */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>
                    {selectedTestSuite ? `${selectedTestSuite.name} - Results` : 'Test Results'}
                  </CardTitle>
                  <CardDescription>
                    Detailed test execution results and debugging information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedTestSuite ? (
                    <ScrollArea className="h-[500px]">
                      <div className="space-y-4">
                        {selectedTestSuite.tests.map(test => (
                          <div key={test.id} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center space-x-2">
                                {getStatusIcon(test.status)}
                                <h3 className="font-medium">{test.name}</h3>
                              </div>
                              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                <Timer className="h-3 w-3" />
                                <span>{test.duration}ms</span>
                                <span>•</span>
                                <span>{test.timestamp}</span>
                              </div>
                            </div>
                            
                            <div className="space-y-3 text-sm">
                              <div>
                                <Label className="text-xs font-medium text-muted-foreground">INPUT</Label>
                                <div className="mt-1 p-2 bg-muted/50 rounded font-mono text-xs">
                                  {test.input}
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div>
                                  <Label className="text-xs font-medium text-muted-foreground">EXPECTED</Label>
                                  <div className="mt-1 p-2 bg-green-50 dark:bg-green-950/20 rounded font-mono text-xs">
                                    {test.expectedOutput}
                                  </div>
                                </div>
                                <div>
                                  <Label className="text-xs font-medium text-muted-foreground">ACTUAL</Label>
                                  <div className={`mt-1 p-2 rounded font-mono text-xs ${
                                    test.status === 'passed' 
                                      ? 'bg-green-50 dark:bg-green-950/20' 
                                      : 'bg-red-50 dark:bg-red-950/20'
                                  }`}>
                                    {test.actualOutput}
                                  </div>
                                </div>
                              </div>
                              
                              {test.errorMessage && (
                                <div>
                                  <Label className="text-xs font-medium text-red-600">ERROR</Label>
                                  <div className="mt-1 p-2 bg-red-50 dark:bg-red-950/20 rounded text-xs text-red-700 dark:text-red-400">
                                    {test.errorMessage}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  ) : (
                    <div className="flex items-center justify-center h-64 text-center">
                      <div>
                        <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="font-medium">No Test Suite Selected</h3>
                        <p className="text-sm text-muted-foreground">
                          Choose a test suite from the left panel to view results
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="quick-test" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="h-5 w-5 mr-2 text-blue-600" />
                    Quick Test Environment
                  </CardTitle>
                  <CardDescription>
                    Test your agent with custom inputs instantly
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="test-input">Test Input</Label>
                    <Textarea
                      id="test-input"
                      placeholder="Enter your test input here..."
                      rows={8}
                      value={testInput}
                      onChange={(e) => setTestInput(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      onClick={runQuickTest}
                      disabled={!testInput.trim() || isQuickTesting}
                      className="flex-1 !bg-gray-700 text-white !hover:bg-gray-800 !border-none"
                    >
                      {isQuickTesting ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          Run Test
                        </>
                      )}
                    </Button>
                    <Button variant="outline" onClick={() => {
                      setTestInput('')
                      setTestOutput('')
                    }}>
                      Clear
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Test Output</CardTitle>
                  <CardDescription>
                    Agent response and execution details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {testOutput ? (
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">AGENT RESPONSE</Label>
                        <div className="mt-2 p-4 bg-muted/50 rounded-lg border">
                          <p className="font-mono text-sm">{testOutput}</p>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <Label className="text-xs font-medium text-muted-foreground">RESPONSE TIME</Label>
                          <p className="font-medium">1.2s</p>
                        </div>
                        <div>
                          <Label className="text-xs font-medium text-muted-foreground">STATUS</Label>
                          <Badge className="bg-green-100 text-green-800">Success</Badge>
                        </div>
                        <div>
                          <Label className="text-xs font-medium text-muted-foreground">TOKENS USED</Label>
                          <p className="font-medium">245</p>
                        </div>
                        <div>
                          <Label className="text-xs font-medium text-muted-foreground">COST</Label>
                          <p className="font-medium">$0.012</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-64 text-center">
                      <div>
                        <Code className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="font-medium">No Output Yet</h3>
                        <p className="text-sm text-muted-foreground">
                          Run a test to see the agent's response
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Response Time</CardTitle>
                  <CardDescription>Agent response time over the last 30 minutes</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="timestamp" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="responseTime" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Resource Usage</CardTitle>
                  <CardDescription>Memory and CPU utilization</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="timestamp" />
                      <YAxis />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="memoryUsage" 
                        stackId="1"
                        stroke="#8884d8" 
                        fill="#8884d8" 
                        fillOpacity={0.3}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="cpuUsage" 
                        stackId="1"
                        stroke="#82ca9d" 
                        fill="#82ca9d" 
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Key performance indicators and benchmarks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/20 mx-auto mb-2">
                      <Timer className="h-6 w-6 text-blue-600" />
                    </div>
                    <p className="text-2xl font-bold">298ms</p>
                    <p className="text-sm text-muted-foreground">Avg Response Time</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/20 mx-auto mb-2">
                      <TrendingUp className="h-6 w-6 text-green-600" />
                    </div>
                    <p className="text-2xl font-bold">94%</p>
                    <p className="text-sm text-muted-foreground">Accuracy Score</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-orange-100 dark:bg-orange-900/20 mx-auto mb-2">
                      <Database className="h-6 w-6 text-orange-600" />
                    </div>
                    <p className="text-2xl font-bold">52MB</p>
                    <p className="text-sm text-muted-foreground">Peak Memory</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/20 mx-auto mb-2">
                      <Activity className="h-6 w-6 text-purple-600" />
                    </div>
                    <p className="text-2xl font-bold">99.8%</p>
                    <p className="text-sm text-muted-foreground">Uptime</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-green-600" />
                  Security Assessment
                </CardTitle>
                <CardDescription>
                  Security checks and vulnerability assessments for your agent
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <p className="font-medium">Input Validation</p>
                      <p className="text-sm text-muted-foreground">Passed</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <p className="font-medium">Output Sanitization</p>
                      <p className="text-sm text-muted-foreground">Passed</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <AlertTriangle className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                      <p className="font-medium">Rate Limiting</p>
                      <p className="text-sm text-muted-foreground">Warning</p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium mb-4">Security Recommendations</h3>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3 p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                        <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-sm">Implement Rate Limiting</p>
                          <p className="text-sm text-muted-foreground">
                            Consider adding rate limiting to prevent abuse and ensure fair usage.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                        <Globe className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-sm">Enable HTTPS Only</p>
                          <p className="text-sm text-muted-foreground">
                            Ensure all API endpoints use HTTPS for secure communication.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Test Reports</CardTitle>
                    <CardDescription>
                      Generate and download detailed test reports
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Export PDF
                    </Button>
                    <Button variant="outline">
                      <Upload className="h-4 w-4 mr-2" />
                      Share Report
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Test Summary */}
                  <div>
                    <h3 className="font-medium mb-4">Test Execution Summary</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="p-4 border rounded-lg text-center">
                        <p className="text-2xl font-bold text-green-600">12</p>
                        <p className="text-sm text-muted-foreground">Tests Passed</p>
                      </div>
                      <div className="p-4 border rounded-lg text-center">
                        <p className="text-2xl font-bold text-red-600">2</p>
                        <p className="text-sm text-muted-foreground">Tests Failed</p>
                      </div>
                      <div className="p-4 border rounded-lg text-center">
                        <p className="text-2xl font-bold text-blue-600">1</p>
                        <p className="text-sm text-muted-foreground">Test Running</p>
                      </div>
                      <div className="p-4 border rounded-lg text-center">
                        <p className="text-2xl font-bold">85.7%</p>
                        <p className="text-sm text-muted-foreground">Success Rate</p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Recent Reports */}
                  <div>
                    <h3 className="font-medium mb-4">Recent Reports</h3>
                    <div className="space-y-3">
                      {[
                        { name: 'SmartSummarizer Full Test Report', date: '2 hours ago', status: 'completed' },
                        { name: 'Performance Benchmark Report', date: '1 day ago', status: 'completed' },
                        { name: 'Security Assessment Report', date: '2 days ago', status: 'completed' },
                        { name: 'Load Testing Report', date: '3 days ago', status: 'completed' }
                      ].map((report, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="font-medium">{report.name}</p>
                              <p className="text-sm text-muted-foreground">{report.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">PDF</Badge>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
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