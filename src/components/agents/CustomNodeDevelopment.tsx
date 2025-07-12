'use client'

import { useState } from 'react'
import { Button } from '../common/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../common/ui/card'
import { Input } from '../common/ui/input'
import { Label } from '../common/ui/label'
import { Textarea } from '../common/ui/textarea'
import { Badge } from '../common/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../common/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../common/ui/select'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '../common/ui/resizable'
import { ScrollArea } from '../common/ui/scroll-area'
import { 
  Code2, 
  Play, 
  Save, 
  Plus, 
  FileCode, 
  TestTube, 
  Upload, 
  // Download,
  // Trash2,
  // Copy,
  Settings,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react'

interface CustomNode {
  id: string
  name: string
  description: string
  category: 'trigger' | 'action' | 'condition' | 'utility'
  language: 'javascript' | 'python'
  code: string
  config: any
  tests: NodeTest[]
  status: 'draft' | 'testing' | 'published' | 'error'
  lastModified: string
}

interface NodeTest {
  id: string
  name: string
  input: any
  expectedOutput: any
  actualOutput?: any
  status: 'pending' | 'passed' | 'failed'
}

const mockCustomNodes: CustomNode[] = [
  {
    id: '1',
    name: 'Sentiment Analyzer',
    description: 'Advanced sentiment analysis with custom training',
    category: 'action',
    language: 'python',
    code: `def execute(input_data):
    """
    Custom sentiment analysis node
    """
    import textblob
    
    text = input_data.get('text', '')
    blob = TextBlob(text)
    
    return {
        'sentiment': blob.sentiment.polarity,
        'confidence': blob.sentiment.subjectivity,
        'classification': 'positive' if blob.sentiment.polarity > 0 else 'negative'
    }`,
    config: {
      inputs: ['text'],
      outputs: ['sentiment', 'confidence', 'classification'],
      parameters: ['threshold']
    },
    tests: [
      {
        id: '1',
        name: 'Positive text',
        input: { text: 'I love this product!' },
        expectedOutput: { classification: 'positive' },
        status: 'passed'
      }
    ],
    status: 'published',
    lastModified: '2 hours ago'
  },
  {
    id: '2',
    name: 'Custom Email Filter',
    description: 'Filter emails based on custom business rules',
    category: 'condition',
    language: 'javascript',
    code: `function execute(inputData) {
    const { email, rules } = inputData;
    
    // Custom filtering logic
    const isSpam = checkSpamRules(email, rules);
    const priority = calculatePriority(email);
    
    return {
        isSpam,
        priority,
        shouldProcess: !isSpam && priority > 0.5
    };
}`,
    config: {
      inputs: ['email', 'rules'],
      outputs: ['isSpam', 'priority', 'shouldProcess'],
      parameters: ['spamThreshold', 'priorityWeights']
    },
    tests: [],
    status: 'draft',
    lastModified: '1 day ago'
  }
]

export function CustomNodeDevelopment() {
  const [selectedNode, setSelectedNode] = useState<CustomNode | null>(mockCustomNodes[0])
  const [activeTab, setActiveTab] = useState('editor')
  const [newNodeName, setNewNodeName] = useState('')
  const [testResults, setTestResults] = useState<any>({})
  const [isRunningTest, setIsRunningTest] = useState(false)

  const createNewNode = () => {
    const newNode: CustomNode = {
      id: `node-${Date.now()}`,
      name: newNodeName || 'New Custom Node',
      description: 'Custom node description',
      category: 'action',
      language: 'javascript',
      code: `function execute(inputData) {
    // Your custom logic here
    const { input } = inputData;
    
    // Process the input
    const result = processInput(input);
    
    return {
        output: result,
        status: 'success'
    };
}

function processInput(input) {
    // Implement your custom processing logic
    return input;
}`,
      config: {
        inputs: ['input'],
        outputs: ['output', 'status'],
        parameters: []
      },
      tests: [],
      status: 'draft',
      lastModified: 'just now'
    }
    
    setSelectedNode(newNode)
    setNewNodeName('')
  }

  const runTests = async () => {
    if (!selectedNode) return
    
    setIsRunningTest(true)
    
    // Simulate test execution
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const results = selectedNode.tests.reduce((acc, test) => {
      acc[test.id] = {
        ...test,
        status: Math.random() > 0.3 ? 'passed' : 'failed',
        actualOutput: test.expectedOutput // Mock result
      }
      return acc
    }, {} as any)
    
    setTestResults(results)
    setIsRunningTest(false)
  }

  const saveNode = () => {
    if (selectedNode) {
      // Save node logic
      console.log('Saving node:', selectedNode)
    }
  }

  const renderNodeList = () => (
    <ScrollArea className="h-full">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium">Custom Nodes</h3>
          <Button size="sm" onClick={() => setActiveTab('new-node')}>
            <Plus className="h-4 w-4 mr-1" />
            New
          </Button>
        </div>
        
        <div className="space-y-2">
          {mockCustomNodes.map((node) => (
            <div
              key={node.id}
              className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                selectedNode?.id === node.id ? 'border-primary bg-primary/5' : 'hover:bg-accent'
              }`}
              onClick={() => setSelectedNode(node)}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-sm">{node.name}</h4>
                <Badge 
                  variant={node.status === 'published' ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {node.status}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mb-2">{node.description}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{node.language}</span>
                <span>{node.lastModified}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ScrollArea>
  )

  const renderCodeEditor = () => (
    <div className="h-full flex flex-col">
      <div className="border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Code2 className="h-4 w-4" />
            <span className="font-medium">{selectedNode?.name}</span>
            <Badge variant="outline">{selectedNode?.language}</Badge>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={saveNode}>
              <Save className="h-4 w-4 mr-1" />
              Save
            </Button>
            <Button size="sm">
              <Upload className="h-4 w-4 mr-1" />
              Publish
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-hidden">
        <Textarea
          value={selectedNode?.code || ''}
          onChange={(e) => {
            if (selectedNode) {
              setSelectedNode({ ...selectedNode, code: e.target.value })
            }
          }}
          className="h-full border-0 resize-none font-mono text-sm leading-relaxed"
          placeholder="Write your custom node code here..."
        />
      </div>
      
      <div className="border-t p-4 bg-muted/20">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Syntax: {selectedNode?.language === 'javascript' ? 'JavaScript ES6+' : 'Python 3.8+'}
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <FileCode className="h-4 w-4 mr-1" />
              Format
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-1" />
              Config
            </Button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderTestPanel = () => (
    <div className="h-full flex flex-col">
      <div className="border-b p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Node Tests</h3>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add Test
            </Button>
            <Button 
              size="sm" 
              onClick={runTests}
              disabled={isRunningTest || !selectedNode?.tests.length}
            >
              {isRunningTest ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-1"></div>
                  Running...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-1" />
                  Run Tests
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {selectedNode?.tests.length === 0 ? (
            <div className="text-center py-8">
              <TestTube className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No tests defined</p>
              <p className="text-xs text-muted-foreground">Add tests to validate your node behavior</p>
            </div>
          ) : (
            selectedNode?.tests.map((test) => {
              const result = testResults[test.id] || test
              return (
                <Card key={test.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm">{test.name}</CardTitle>
                      <div className="flex items-center space-x-2">
                        {result.status === 'passed' && <CheckCircle className="h-4 w-4 text-green-600" />}
                        {result.status === 'failed' && <XCircle className="h-4 w-4 text-red-600" />}
                        {result.status === 'pending' && <AlertCircle className="h-4 w-4 text-yellow-600" />}
                        <Badge 
                          variant={result.status === 'passed' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {result.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label className="text-xs">Input</Label>
                      <pre className="text-xs bg-muted p-2 rounded mt-1 overflow-x-auto">
                        {JSON.stringify(test.input, null, 2)}
                      </pre>
                    </div>
                    <div>
                      <Label className="text-xs">Expected Output</Label>
                      <pre className="text-xs bg-muted p-2 rounded mt-1 overflow-x-auto">
                        {JSON.stringify(test.expectedOutput, null, 2)}
                      </pre>
                    </div>
                    {result.actualOutput && (
                      <div>
                        <Label className="text-xs">Actual Output</Label>
                        <pre className="text-xs bg-muted p-2 rounded mt-1 overflow-x-auto">
                          {JSON.stringify(result.actualOutput, null, 2)}
                        </pre>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })
          )}
        </div>
      </ScrollArea>
    </div>
  )

  const renderNewNodeForm = () => (
    <div className="p-6 space-y-6">
      <div>
        <h3 className="font-medium mb-4">Create New Custom Node</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Build custom logic for your AI workflows with JavaScript or Python.
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Node Name</Label>
          <Input
            value={newNodeName}
            onChange={(e) => setNewNodeName(e.target.value)}
            placeholder="Enter node name"
          />
        </div>
        
        <div className="space-y-2">
          <Label>Category</Label>
          <Select defaultValue="action">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="trigger">Trigger</SelectItem>
              <SelectItem value="action">Action</SelectItem>
              <SelectItem value="condition">Condition</SelectItem>
              <SelectItem value="utility">Utility</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>Language</Label>
          <Select defaultValue="javascript">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="python">Python</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea
            placeholder="Describe what this node does..."
            rows={3}
          />
        </div>
      </div>
      
      <div className="flex space-x-3">
        <Button onClick={createNewNode} disabled={!newNodeName.trim()}>
          <Plus className="h-4 w-4 mr-2" />
          Create Node
        </Button>
        <Button variant="outline" onClick={() => setActiveTab('editor')}>
          Cancel
        </Button>
      </div>
    </div>
  )

  return (
    <div className="h-full">
      <ResizablePanelGroup direction="horizontal">
        {/* Node List Sidebar */}
        <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
          <Card className="h-full rounded-none border-r border-l-0 border-t-0 border-b-0">
            <CardContent className="p-0">
              {renderNodeList()}
            </CardContent>
          </Card>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Main Content */}
        <ResizablePanel defaultSize={80}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
            <div className="border-b px-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="editor">Code Editor</TabsTrigger>
                <TabsTrigger value="tests">Tests</TabsTrigger>
                <TabsTrigger value="new-node">New Node</TabsTrigger>
              </TabsList>
            </div>
            
            <div className="flex-1 overflow-hidden">
              <TabsContent value="editor" className="h-full m-0">
                {selectedNode ? renderCodeEditor() : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <Code2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-medium mb-2">No Node Selected</h3>
                      <p className="text-sm text-muted-foreground">
                        Select a node from the sidebar to start editing
                      </p>
                    </div>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="tests" className="h-full m-0">
                {selectedNode ? renderTestPanel() : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <TestTube className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-medium mb-2">No Node Selected</h3>
                      <p className="text-sm text-muted-foreground">
                        Select a node to view and run tests
                      </p>
                    </div>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="new-node" className="h-full m-0">
                {renderNewNodeForm()}
              </TabsContent>
            </div>
          </Tabs>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}