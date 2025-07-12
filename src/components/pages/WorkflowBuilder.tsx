'use client'

import { useState } from 'react'
import { Button } from '../common/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../common/ui/card'
import { Input } from '../common/ui/input'
import { Label } from '../common/ui/label'
import { Badge } from '../common/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../common/ui/select'
import { Textarea } from '../common/ui/textarea'
import { 
  ArrowLeft, 
  Plus, 
  Play, 
  Save, 
  Share2, 
  Zap, 
  ArrowRight,
  Settings,
  Trash2,
  Copy,
  GitBranch
} from 'lucide-react'

interface WorkflowNode {
  id: string
  type: 'agent' | 'condition' | 'trigger'
  name: string
  position: { x: number; y: number }
  data: any
  connections: string[]
}

interface WorkflowBuilderProps {
  onBack: () => void
  selectedAgent?: any
}

const availableAgents = [
  { id: '1', name: 'SmartSummarizer', category: 'Content', icon: '📝' },
  { id: '2', name: 'PriceOptimizerAI', category: 'Sales', icon: '💰' },
  { id: '3', name: 'StockSense', category: 'Inventory', icon: '📦' },
  { id: '4', name: 'SupportGenie', category: 'Support', icon: '💬' },
  { id: '5', name: 'ReviewSentinel', category: 'Analytics', icon: '⭐' },
  { id: '6', name: 'VisionCartBot', category: 'Search', icon: '👁️' }
]

const triggerTypes = [
  { value: 'webhook', label: 'Webhook Trigger' },
  { value: 'schedule', label: 'Schedule' },
  { value: 'product_update', label: 'Product Update' },
  { value: 'order_received', label: 'Order Received' },
  { value: 'customer_inquiry', label: 'Customer Inquiry' }
]

export function WorkflowBuilder({ onBack}: WorkflowBuilderProps) {
  const [workflowName, setWorkflowName] = useState('My Workflow')
  const [nodes, setNodes] = useState<WorkflowNode[]>([
    {
      id: 'trigger-1',
      type: 'trigger',
      name: 'Product Update',
      position: { x: 100, y: 200 },
      data: { triggerType: 'product_update' },
      connections: []
    }
  ])
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [isRunning, setIsRunning] = useState(false)

  const addAgent = (agentId: string) => {
    const agent = availableAgents.find(a => a.id === agentId)
    if (!agent) return

    const newNode: WorkflowNode = {
      id: `agent-${Date.now()}`,
      type: 'agent',
      name: agent.name,
      position: { x: 300 + nodes.length * 200, y: 200 },
      data: { agentId: agent.id, category: agent.category, icon: agent.icon },
      connections: []
    }

    setNodes([...nodes, newNode])
  }

  const addCondition = () => {
    const newNode: WorkflowNode = {
      id: `condition-${Date.now()}`,
      type: 'condition',
      name: 'If/Then Condition',
      position: { x: 300 + nodes.length * 200, y: 200 },
      data: { condition: '', trueAction: '', falseAction: '' },
      connections: []
    }

    setNodes([...nodes, newNode])
  }


  const removeNode = (nodeId: string) => {
    setNodes(nodes.filter(node => node.id !== nodeId))
    // Remove connections to this node
    setNodes(prev => prev.map(node => ({
      ...node,
      connections: node.connections.filter(id => id !== nodeId)
    })))
  }

  const runWorkflow = async () => {
    setIsRunning(true)
    // Simulate workflow execution
    await new Promise(resolve => setTimeout(resolve, 3000))
    setIsRunning(false)
  }

  const saveWorkflow = () => {
    // Save workflow logic
    console.log('Saving workflow:', { name: workflowName, nodes })
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
              <h1 className="text-3xl font-bold">Workflow Builder</h1>
              <p className="text-muted-foreground">Connect AI agents to create powerful automation workflows</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={saveWorkflow}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button variant="outline">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button onClick={runWorkflow} disabled={isRunning}>
              {isRunning ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Running...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Test Run
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Agent Library */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Workflow Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="workflow-name">Workflow Name</Label>
                  <Input
                    id="workflow-name"
                    value={workflowName}
                    onChange={(e) => setWorkflowName(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Trigger Type</Label>
                  <Select defaultValue="product_update">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {triggerTypes.map(trigger => (
                        <SelectItem key={trigger.value} value={trigger.value}>
                          {trigger.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Available Agents</CardTitle>
                <CardDescription>
                  Drag or click to add agents to your workflow
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {availableAgents.map(agent => (
                  <div
                    key={agent.id}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                    onClick={() => addAgent(agent.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{agent.icon}</span>
                      <div>
                        <p className="font-medium text-sm">{agent.name}</p>
                        <p className="text-xs text-muted-foreground">{agent.category}</p>
                      </div>
                    </div>
                    <Plus className="h-4 w-4 text-muted-foreground" />
                  </div>
                ))}
                
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={addCondition}
                >
                  <GitBranch className="h-4 w-4 mr-2" />
                  Add Condition
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Canvas */}
          <div className="lg:col-span-3">
            <Card className="h-[700px]">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-blue-600" />
                  Workflow Canvas
                </CardTitle>
                <CardDescription>
                  Build your automation by connecting agents and conditions
                </CardDescription>
              </CardHeader>
              <CardContent className="h-full relative overflow-hidden">
                {/* Workflow Canvas */}
                <div className="relative w-full h-full bg-muted/20 rounded-lg border-2 border-dashed border-muted-foreground/20">
                  {nodes.map((node, index) => (
                    <div
                      key={node.id}
                      className={`absolute p-4 bg-card border-2 rounded-lg shadow-sm cursor-pointer transition-all ${
                        selectedNode === node.id ? 'border-primary' : 'border-border'
                      }`}
                      style={{
                        left: node.position.x,
                        top: node.position.y,
                        width: '180px'
                      }}
                      onClick={() => setSelectedNode(node.id)}
                    >
                      {/* Node Header */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {node.type === 'agent' && <span>{node.data.icon}</span>}
                          {node.type === 'trigger' && <Zap className="h-4 w-4 text-green-600" />}
                          {node.type === 'condition' && <GitBranch className="h-4 w-4 text-orange-600" />}
                          <Badge variant="outline" className="text-xs">
                            {node.type}
                          </Badge>
                        </div>
                        <div className="flex space-x-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={(e) => {
                              e.stopPropagation()
                              // Settings logic
                            }}
                          >
                            <Settings className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 text-destructive"
                            onClick={(e) => {
                              e.stopPropagation()
                              removeNode(node.id)
                            }}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      
                      {/* Node Content */}
                      <div>
                        <p className="font-medium text-sm truncate">{node.name}</p>
                        {node.type === 'agent' && (
                          <p className="text-xs text-muted-foreground">{node.data.category}</p>
                        )}
                      </div>

                      {/* Connection Points */}
                      <div className="absolute -right-2 top-1/2 transform -translate-y-1/2">
                        <div className="w-4 h-4 bg-primary rounded-full border-2 border-background"></div>
                      </div>
                      {index > 0 && (
                        <div className="absolute -left-2 top-1/2 transform -translate-y-1/2">
                          <div className="w-4 h-4 bg-muted-foreground rounded-full border-2 border-background"></div>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Connection Lines */}
                  {nodes.map((node, index) => 
                    index < nodes.length - 1 ? (
                      <div
                        key={`connection-${index}`}
                        className="absolute"
                        style={{
                          left: node.position.x + 180,
                          top: node.position.y + 40,
                          width: '20px',
                          height: '2px',
                          backgroundColor: 'hsl(var(--primary))'
                        }}
                      >
                        <ArrowRight className="h-4 w-4 absolute -right-2 -top-1 text-primary" />
                      </div>
                    ) : null
                  )}

                  {/* Empty State */}
                  {nodes.length === 1 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-muted-foreground mb-4">
                          Add agents from the sidebar to build your workflow
                        </p>
                        <Button variant="outline" onClick={() => addAgent('1')}>
                          <Plus className="h-4 w-4 mr-2" />
                          Add First Agent
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Workflow Configuration Panel */}
        {selectedNode && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Node Configuration</CardTitle>
              <CardDescription>
                Configure the selected node settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Input Condition</Label>
                  <Textarea placeholder="Define when this node should execute..." />
                </div>
                <div>
                  <Label>Output Action</Label>
                  <Textarea placeholder="Define what this node should output..." />
                </div>
              </div>
              <div className="flex space-x-3">
                <Button variant="outline">
                  <Copy className="h-4 w-4 mr-2" />
                  Duplicate Node
                </Button>
                <Button variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Advanced Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}