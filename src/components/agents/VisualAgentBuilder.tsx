'use client'

import { useState, useCallback } from 'react'
import { Button } from '../common/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../common/ui/card'
import { Input } from '../common/ui/input'
import { Label } from '../common/ui/label'
import { Badge } from '../common/ui/badge'
// import { Separator } from '../common/ui/separator'
import { ScrollArea } from '../common/ui/scroll-area'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '../common/ui/resizable'
import { 
  Play, 
  Save, 
  Download, 
  // Upload, 
  // Plus, 
  Settings, 
  Trash2,
  // Copy,
  Zap,
  Database,
  Clock,
  Mail,
  // MessageSquare,
  Filter,
  Split,
  Merge,
  GitBranch,
  FileText,
  Bot,
  Globe,
  // Shield,
  Workflow
} from 'lucide-react'

interface WorkflowNode {
  id: string
  type: 'trigger' | 'action' | 'condition' | 'utility'
  category: string
  name: string
  icon: any
  position: { x: number; y: number }
  data: any
  inputs: string[]
  outputs: string[]
  color: string
}

interface WorkflowConnection {
  id: string
  source: string
  target: string
  sourceHandle: string
  targetHandle: string
}

interface VisualAgentBuilderProps {
  selectedWorkflow?: any
}

const nodeTypes = {
  triggers: [
    { id: 'webhook', name: 'Webhook', icon: Globe, color: 'from-green-500 to-green-600', description: 'HTTP webhook trigger' },
    { id: 'cron', name: 'Schedule', icon: Clock, color: 'from-blue-500 to-blue-600', description: 'Time-based trigger' },
    { id: 'api', name: 'API Call', icon: Database, color: 'from-purple-500 to-purple-600', description: 'External API trigger' }
  ],
  actions: [
    { id: 'summarize', name: 'Summarize', icon: FileText, color: 'from-orange-500 to-orange-600', description: 'Text summarization' },
    { id: 'classify', name: 'Classify', icon: Bot, color: 'from-indigo-500 to-indigo-600', description: 'Content classification' },
    { id: 'email', name: 'Send Email', icon: Mail, color: 'from-red-500 to-red-600', description: 'Email notification' },
    { id: 'embed', name: 'Generate Embeddings', icon: Zap, color: 'from-yellow-500 to-yellow-600', description: 'Vector embeddings' },
    { id: 'query', name: 'Database Query', icon: Database, color: 'from-cyan-500 to-cyan-600', description: 'Database operations' }
  ],
  conditions: [
    { id: 'if-else', name: 'If/Else', icon: GitBranch, color: 'from-pink-500 to-pink-600', description: 'Conditional logic' },
    { id: 'switch', name: 'Switch', icon: Filter, color: 'from-teal-500 to-teal-600', description: 'Multi-way branching' }
  ],
  utilities: [
    { id: 'delay', name: 'Delay', icon: Clock, color: 'from-gray-500 to-gray-600', description: 'Wait/delay execution' },
    { id: 'split', name: 'Split', icon: Split, color: 'from-emerald-500 to-emerald-600', description: 'Split data streams' },
    { id: 'merge', name: 'Merge', icon: Merge, color: 'from-violet-500 to-violet-600', description: 'Merge data streams' },
    { id: 'filter', name: 'Filter', icon: Filter, color: 'from-rose-500 to-rose-600', description: 'Filter data' }
  ]
}

export function VisualAgentBuilder({ selectedWorkflow }: VisualAgentBuilderProps) {
  const [nodes, setNodes] = useState<WorkflowNode[]>([])
  const [connections, setConnections] = useState<WorkflowConnection[]>([])
  const [selectedNode, setSelectedNode] = useState<WorkflowNode | null>(null)
  const [workflowName, setWorkflowName] = useState('New Workflow')
  const [isRunning, setIsRunning] = useState(false)
  const [draggedNodeType, setDraggedNodeType] = useState<string | null>(null)

  const addNode = useCallback((nodeType: any, position: { x: number; y: number }) => {
    const newNode: WorkflowNode = {
      id: `node-${Date.now()}`,
      type: nodeType.id.includes('webhook') || nodeType.id.includes('cron') || nodeType.id.includes('api') ? 'trigger' : 
            nodeType.id.includes('if') || nodeType.id.includes('switch') ? 'condition' : 
            nodeType.id.includes('delay') || nodeType.id.includes('split') || nodeType.id.includes('merge') || nodeType.id.includes('filter') ? 'utility' : 'action',
      category: nodeType.id,
      name: nodeType.name,
      icon: nodeType.icon,
      position,
      data: {},
      inputs: nodeType.type === 'trigger' ? [] : ['input'],
      outputs: ['output'],
      color: nodeType.color
    }
    
    setNodes(prev => [...prev, newNode])
  }, [])

  const deleteNode = useCallback((nodeId: string) => {
    setNodes(prev => prev.filter(node => node.id !== nodeId))
    setConnections(prev => prev.filter(conn => conn.source !== nodeId && conn.target !== nodeId))
    if (selectedNode?.id === nodeId) {
      setSelectedNode(null)
    }
  }, [selectedNode])

  const handleCanvasDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    if (!draggedNodeType) return

    const canvas = e.currentTarget as HTMLElement
    const rect = canvas.getBoundingClientRect()
    const position = {
      x: e.clientX - rect.left - 100, // Center the node
      y: e.clientY - rect.top - 50
    }

    // Find the node type
    const allNodeTypes = [...nodeTypes.triggers, ...nodeTypes.actions, ...nodeTypes.conditions, ...nodeTypes.utilities]
    const nodeType = allNodeTypes.find(type => type.id === draggedNodeType)
    
    if (nodeType) {
      addNode(nodeType, position)
    }
    
    setDraggedNodeType(null)
  }, [draggedNodeType, addNode])

  const runWorkflow = async () => {
    setIsRunning(true)
    // Simulate workflow execution
    await new Promise(resolve => setTimeout(resolve, 3000))
    setIsRunning(false)
  }

  const renderNodePalette = () => (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-6">
        {Object.entries(nodeTypes).map(([category, nodes]) => (
          <div key={category}>
            <h3 className="font-medium mb-3 capitalize text-sm text-muted-foreground">
              {category}
            </h3>
            <div className="space-y-2">
              {nodes.map((node) => {
                const IconComponent = node.icon
                return (
                  <div
                    key={node.id}
                    draggable
                    onDragStart={() => setDraggedNodeType(node.id)}
                    className="flex items-center space-x-3 p-3 rounded-lg border bg-card hover:bg-accent cursor-grab active:cursor-grabbing transition-colors"
                    
                  >
                    <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r ${node.color}`}>
                      <IconComponent className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{node.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{node.description}</p>
                            <h1>Selected Workflow: {selectedWorkflow}</h1>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )

  const renderNodeProperties = () => (
    <div className="p-4 space-y-4">
      {selectedNode ? (
        <>
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Node Properties</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => deleteNode(selectedNode.id)}
              className="h-8 w-8 text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-3">
            <div className="space-y-2">
              <Label>Node Name</Label>
              <Input
                value={selectedNode.name}
                onChange={(e) => {
                  setSelectedNode({ ...selectedNode, name: e.target.value })
                  setNodes(prev => prev.map(node => 
                    node.id === selectedNode.id ? { ...node, name: e.target.value } : node
                  ))
                }}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Type</Label>
              <Badge variant="outline">{selectedNode.type}</Badge>
            </div>
            
            <div className="space-y-2">
              <Label>Category</Label>
              <Badge variant="secondary">{selectedNode.category}</Badge>
            </div>

            {selectedNode.type === 'action' && (
              <div className="space-y-2">
                <Label>Configuration</Label>
                <Card>
                  <CardContent className="p-3">
                    <p className="text-sm text-muted-foreground">
                      Node-specific configuration options would appear here based on the selected node type.
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="text-center py-8">
          <Settings className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">Select a node to edit properties</p>
        </div>
      )}
    </div>
  )

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="border-b bg-card/50 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Workflow className="h-5 w-5 text-primary" />
              <Input
                value={workflowName}
                onChange={(e) => setWorkflowName(e.target.value)}
                className="font-medium border-none bg-transparent px-0 focus-visible:ring-0 w-48"
              />
            </div>
            <Badge variant="outline">Draft</Badge>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button 
              size="sm" 
              onClick={runWorkflow}
              disabled={isRunning || nodes.length === 0}
            >
              {isRunning ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Running...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Run
                </>
              )}
            </Button>
            {/* Demo: Add connection between first two nodes */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (nodes.length >= 2) {
                  setConnections(prev => [
                    ...prev,
                    {
                      id: `conn-${Date.now()}`,
                      source: nodes[0].id,
                      target: nodes[1].id,
                      sourceHandle: 'output',
                      targetHandle: 'input',
                    },
                  ])
                }
              }}
              disabled={nodes.length < 2}
            >
              Connect 1→2
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          {/* Node Palette */}
          <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
            <Card className="h-full rounded-none border-r border-l-0 border-t-0 border-b-0">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Node Library</CardTitle>
                <CardDescription className="text-sm">
                  Drag nodes to the canvas to build your workflow
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                {renderNodePalette()}
              </CardContent>
            </Card>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Canvas */}
          <ResizablePanel defaultSize={60} minSize={40}>
            <div 
              className="relative h-full bg-muted/20"
              onDrop={handleCanvasDrop}
              onDragOver={(e) => e.preventDefault()}
              style={{
                backgroundImage: 'radial-gradient(circle, #d1d5db 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }}
            >
              {/* SVG Connections */}
              <div className="absolute inset-0 pointer-events-none z-0">
                <svg className="w-full h-full" style={{ position: 'absolute', top: 0, left: 0 }}>
                  {connections.map((conn) => {
                    const sourceNode = nodes.find(n => n.id === conn.source)
                    const targetNode = nodes.find(n => n.id === conn.target)
                    if (!sourceNode || !targetNode) return null
                    // Calculate positions (center of node, adjust as needed)
                    const x1 = sourceNode.position.x + 100 // node width/2
                    const y1 = sourceNode.position.y + 50  // node height/2
                    const x2 = targetNode.position.x + 100
                    const y2 = targetNode.position.y + 50
                    return (
                      <line
                        key={conn.id}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="#6366f1"
                        strokeWidth={2}
                        markerEnd="url(#arrowhead)"
                      />
                    )
                  })}
                  <defs>
                    <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto" markerUnits="strokeWidth">
                      <path d="M0,0 L0,6 L6,3 z" fill="#6366f1" />
                    </marker>
                  </defs>
                </svg>
              </div>
              {/* Canvas Content */}
              <div className="absolute inset-0 overflow-auto">
                {nodes.length === 0 ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <Workflow className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-medium mb-2">Start Building Your Workflow</h3>
                      <p className="text-sm text-muted-foreground max-w-sm">
                        Drag nodes from the library to create your AI agent workflow. Connect them to define the execution flow.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    {nodes.map((node) => {
                      const IconComponent = node.icon
                      return (
                        <div
                          key={node.id}
                          className={`absolute bg-card border rounded-lg p-4 cursor-pointer shadow-sm hover:shadow-md transition-shadow ${
                            selectedNode?.id === node.id ? 'border-primary ring-2 ring-primary/20' : ''
                          }`}
                          style={{
                            left: node.position.x,
                            top: node.position.y,
                            width: '200px'
                          }}
                          onClick={() => setSelectedNode(node)}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r ${node.color}`}>
                              <IconComponent className="h-4 w-4 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm truncate">{node.name}</p>
                              <Badge variant="outline" className="text-xs">{node.type}</Badge>
                            </div>
                          </div>
                          {/* Connection Points */}
                          {node.inputs.length > 0 && (
                            <div className="absolute -left-2 top-1/2 transform -translate-y-1/2">
                              <div className="w-4 h-4 bg-primary rounded-full border-2 border-background"></div>
                            </div>
                          )}
                          <div className="absolute -right-2 top-1/2 transform -translate-y-1/2">
                            <div className="w-4 h-4 bg-primary rounded-full border-2 border-background"></div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Properties Panel */}
          <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
            <Card className="h-full rounded-none border-l border-r-0 border-t-0 border-b-0">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Properties</CardTitle>
                <CardDescription className="text-sm">
                  Configure selected node
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                {renderNodeProperties()}
              </CardContent>
            </Card>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  )
}