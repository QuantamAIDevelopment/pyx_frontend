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
import { ScrollArea } from '../common/ui/scroll-area'
// import { Separator } from '../common/ui/separator'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '../common/ui/resizable'
import { 
  Play, 
  // Square, 
  RefreshCw, 
  Download, 
  Upload,
  Bug,
  Clock,
  CheckCircle,
  XCircle,
  // AlertCircle,
  Activity,
  FileText,
  Code,
  // Zap,
  Eye,
  Filter
} from 'lucide-react'

interface TestExecution {
  id: string
  timestamp: string
  input: any
  output: any
  duration: number
  status: 'success' | 'error' | 'timeout'
  logs: LogEntry[]
  error?: string
}

interface LogEntry {
  id: string
  timestamp: string
  level: 'info' | 'debug' | 'warn' | 'error'
  message: string
  nodeId?: string
  data?: any
}

const mockExecutions: TestExecution[] = [
  {
    id: '1',
    timestamp: '2024-01-20T10:30:00Z',
    input: { text: 'I love this product! It works great.' },
    output: { sentiment: 0.8, confidence: 0.95, classification: 'positive' },
    duration: 245,
    status: 'success',
    logs: [
      { id: '1', timestamp: '2024-01-20T10:30:00.001Z', level: 'info', message: 'Starting workflow execution', nodeId: 'trigger-1' },
      { id: '2', timestamp: '2024-01-20T10:30:00.050Z', level: 'debug', message: 'Processing text input', nodeId: 'process-1', data: { length: 35 } },
      { id: '3', timestamp: '2024-01-20T10:30:00.200Z', level: 'info', message: 'Sentiment analysis complete', nodeId: 'sentiment-1' },
      { id: '4', timestamp: '2024-01-20T10:30:00.245Z', level: 'info', message: 'Workflow execution completed', nodeId: 'output-1' }
    ]
  },
  {
    id: '2',
    timestamp: '2024-01-20T10:25:00Z',
    input: { text: '' },
    output: null,
    duration: 100,
    status: 'error',
    error: 'ValidationError: Input text cannot be empty',
    logs: [
      { id: '5', timestamp: '2024-01-20T10:25:00.001Z', level: 'info', message: 'Starting workflow execution', nodeId: 'trigger-1' },
      { id: '6', timestamp: '2024-01-20T10:25:00.050Z', level: 'error', message: 'Input validation failed', nodeId: 'process-1' },
      { id: '7', timestamp: '2024-01-20T10:25:00.100Z', level: 'error', message: 'Workflow execution failed', nodeId: 'error-handler' }
    ]
  }
]

export function TestDebugInterface() {
  const [selectedAgent, setSelectedAgent] = useState('sentiment-analyzer')
  const [testInput, setTestInput] = useState('{"text": "I love this product!"}')
  const [isRunning, setIsRunning] = useState(false)
  const [executions, setExecutions] = useState<TestExecution[]>(mockExecutions)
  const [selectedExecution, setSelectedExecution] = useState<TestExecution | null>(mockExecutions[0])
  const [logFilter, setLogFilter] = useState<'all' | 'info' | 'debug' | 'warn' | 'error'>('all')

  const runTest = async () => {
    setIsRunning(true)
    
    try {
      const input = JSON.parse(testInput)
      
      // Simulate test execution
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const newExecution: TestExecution = {
        id: `exec-${Date.now()}`,
        timestamp: new Date().toISOString(),
        input,
        output: { sentiment: 0.7, confidence: 0.88, classification: 'positive' },
        duration: 1890,
        status: 'success',
        logs: [
          { id: `log-${Date.now()}-1`, timestamp: new Date().toISOString(), level: 'info', message: 'Test execution started' },
          { id: `log-${Date.now()}-2`, timestamp: new Date().toISOString(), level: 'debug', message: 'Processing input data' },
          { id: `log-${Date.now()}-3`, timestamp: new Date().toISOString(), level: 'info', message: 'Test execution completed' }
        ]
      }
      
      setExecutions(prev => [newExecution, ...prev])
      setSelectedExecution(newExecution)
    } catch (error) {
      console.error('Test execution failed:', error)
    }
    
    setIsRunning(false)
  }

  const exportLogs = () => {
    if (!selectedExecution) return
    
    const logsData = {
      executionId: selectedExecution.id,
      timestamp: selectedExecution.timestamp,
      status: selectedExecution.status,
      duration: selectedExecution.duration,
      logs: selectedExecution.logs
    }
    
    const blob = new Blob([JSON.stringify(logsData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `test-logs-${selectedExecution.id}.json`
    a.click()
  }

  const getStatusIcon = (status: TestExecution['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'error':
        return <XCircle className="h-4 w-4 text-red-600" />
      case 'timeout':
        return <Clock className="h-4 w-4 text-yellow-600" />
    }
  }

  const getLogLevelColor = (level: LogEntry['level']) => {
    switch (level) {
      case 'info':
        return 'text-blue-600'
      case 'debug':
        return 'text-gray-600'
      case 'warn':
        return 'text-yellow-600'
      case 'error':
        return 'text-red-600'
    }
  }

  const filteredLogs = selectedExecution?.logs.filter(log => 
    logFilter === 'all' || log.level === logFilter
  ) || []

  const renderTestInput = () => (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Test Input</CardTitle>
        <CardDescription>Enter JSON input for your agent</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Agent</Label>
          <Select value={selectedAgent} onValueChange={setSelectedAgent}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sentiment-analyzer">Sentiment Analyzer</SelectItem>
              <SelectItem value="email-classifier">Email Classifier</SelectItem>
              <SelectItem value="product-recommender">Product Recommender</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>Input Data (JSON)</Label>
          <Textarea
            value={testInput}
            onChange={(e) => setTestInput(e.target.value)}
            placeholder='{"text": "Your input here"}'
            rows={6}
            className="font-mono text-sm"
          />
        </div>
        
        <div className="flex space-x-2">
          <Button 
            onClick={runTest}
            disabled={isRunning}
            className="flex-1"
          >
            {isRunning ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Running...
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Run Test
              </>
            )}
          </Button>
          <Button variant="outline" disabled={isRunning}>
            <Upload className="h-4 w-4 mr-2" />
            Load
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  const renderExecutionHistory = () => (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Execution History</CardTitle>
        <CardDescription>Recent test executions</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-80">
          <div className="p-4 space-y-2">
            {executions.map((execution) => (
              <div
                key={execution.id}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedExecution?.id === execution.id ? 'border-primary bg-primary/5' : 'hover:bg-accent'
                }`}
                onClick={() => setSelectedExecution(execution)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(execution.status)}
                    <span className="text-sm font-medium">
                      {new Date(execution.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <Badge 
                    variant={execution.status === 'success' ? 'default' : 'destructive'}
                    className="text-xs"
                  >
                    {execution.duration}ms
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground truncate">
                  {JSON.stringify(execution.input)}
                </p>
                {execution.error && (
                  <p className="text-xs text-red-600 truncate mt-1">
                    {execution.error}
                  </p>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )

  const renderExecutionDetails = () => (
    <div className="space-y-4">
      {selectedExecution ? (
        <>
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Execution Details</h3>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={exportLogs}>
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
              <Badge variant={selectedExecution.status === 'success' ? 'default' : 'destructive'}>
                {selectedExecution.status}
              </Badge>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Duration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{selectedExecution.duration}ms</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(selectedExecution.status)}
                  <span className="font-medium capitalize">{selectedExecution.status}</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Timestamp</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Activity className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium text-sm">
                    {new Date(selectedExecution.timestamp).toLocaleString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="input-output">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="input-output">Input/Output</TabsTrigger>
              <TabsTrigger value="logs">Logs</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>
            
            <TabsContent value="input-output" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Input</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
                      {JSON.stringify(selectedExecution.input, null, 2)}
                    </pre>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Output</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedExecution.output ? (
                      <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
                        {JSON.stringify(selectedExecution.output, null, 2)}
                      </pre>
                    ) : selectedExecution.error ? (
                      <div className="text-xs bg-red-50 dark:bg-red-950/20 p-3 rounded text-red-700 dark:text-red-400">
                        {selectedExecution.error}
                      </div>
                    ) : (
                      <p className="text-xs text-muted-foreground">No output</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="logs" className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4" />
                  <Select value={logFilter} onValueChange={(value: any) => setLogFilter(value)}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="info">Info</SelectItem>
                      <SelectItem value="debug">Debug</SelectItem>
                      <SelectItem value="warn">Warn</SelectItem>
                      <SelectItem value="error">Error</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Badge variant="outline">{filteredLogs.length} entries</Badge>
              </div>
              
              <Card>
                <CardContent className="p-0">
                  <ScrollArea className="h-64">
                    <div className="p-4 space-y-2">
                      {filteredLogs.map((log) => (
                        <div key={log.id} className="flex items-start space-x-3 text-xs">
                          <span className="text-muted-foreground font-mono">
                            {new Date(log.timestamp).toLocaleTimeString()}
                          </span>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getLogLevelColor(log.level)}`}
                          >
                            {log.level.toUpperCase()}
                          </Badge>
                          {log.nodeId && (
                            <Badge variant="secondary" className="text-xs">
                              {log.nodeId}
                            </Badge>
                          )}
                          <span className="flex-1">{log.message}</span>
                          {log.data && (
                            <Button variant="ghost" size="sm" className="h-auto p-0">
                              <Eye className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="performance">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs">Execution Time</Label>
                        <p className="font-medium">{selectedExecution.duration}ms</p>
                      </div>
                      <div>
                        <Label className="text-xs">Memory Usage</Label>
                        <p className="font-medium">24.5MB</p>
                      </div>
                      <div>
                        <Label className="text-xs">CPU Usage</Label>
                        <p className="font-medium">15%</p>
                      </div>
                      <div>
                        <Label className="text-xs">Network Calls</Label>
                        <p className="font-medium">3</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      ) : (
        <div className="text-center py-8">
          <Bug className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">No execution selected</p>
          <p className="text-xs text-muted-foreground">Run a test or select from history</p>
        </div>
      )}
    </div>
  )

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold">Test & Debug</h2>
            <p className="text-sm text-muted-foreground">Test your agents and debug execution flows</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              Test Cases
            </Button>
            <Button variant="outline" size="sm">
              <Code className="h-4 w-4 mr-2" />
              Mock Data
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          {/* Left Panel - Test Input & History */}
          <ResizablePanel defaultSize={30} minSize={25}>
            <div className="h-full flex flex-col space-y-4 p-4">
              {renderTestInput()}
              {renderExecutionHistory()}
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Right Panel - Execution Details */}
          <ResizablePanel defaultSize={70}>
            <div className="h-full overflow-auto p-4">
              {renderExecutionDetails()}
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  )
}