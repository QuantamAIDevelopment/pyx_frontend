'use client'

import { useState } from 'react'
import { Button } from '../common/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../common/ui/card'
import { Badge } from '../common/ui/badge'
import { Input } from '../common/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../common/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../common/ui/select'
// import { Avatar, AvatarFallback, AvatarImage } from '../common/ui/avatar'
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Play, 
  // Trash2, 
  Copy,
  // Eye,
  // Settings,
  GitBranch,
  Code2,
  Activity,
  // Clock,
  // Users,
  TrendingUp,
  // Zap
} from 'lucide-react'

interface Agent {
  id: string
  name: string
  description: string
  status: 'live' | 'draft' | 'error' | 'testing'
  version: string
  lastModified: string
  usage: number
  category: string
  nodes: number
  author: string
  isPublic: boolean
}

interface DeveloperDashboardProps {
  onSelectWorkflow: (workflow: any) => void
  onNewAgent?: () => void
}

const mockAgents: Agent[] = [
  {
    id: '1',
    name: 'Advanced Sentiment Analyzer',
    description: 'Multi-model sentiment analysis with custom training pipeline',
    status: 'live',
    version: '2.1.0',
    lastModified: '2 hours ago',
    usage: 1247,
    category: 'NLP',
    nodes: 8,
    author: 'You',
    isPublic: true
  },
  {
    id: '2',
    name: 'Smart Email Router',
    description: 'Intelligent email classification and routing system',
    status: 'draft',
    version: '1.0.0-beta',
    lastModified: '1 day ago',
    usage: 0,
    category: 'Automation',
    nodes: 12,
    author: 'You',
    isPublic: false
  },
  {
    id: '3',
    name: 'Product Recommendation Engine',
    description: 'AI-powered product recommendations with collaborative filtering',
    status: 'testing',
    version: '1.5.2',
    lastModified: '3 days ago',
    usage: 89,
    category: 'E-commerce',
    nodes: 15,
    author: 'You',
    isPublic: false
  },
  {
    id: '4',
    name: 'Content Moderation Bot',
    description: 'Automated content moderation with custom rules engine',
    status: 'error',
    version: '1.2.1',
    lastModified: '5 days ago',
    usage: 523,
    category: 'Moderation',
    nodes: 6,
    author: 'You',
    isPublic: true
  }
]

export function DeveloperDashboard({ onSelectWorkflow, onNewAgent }: DeveloperDashboardProps) {
  const [agents, setAgents] = useState<Agent[]>(mockAgents)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  // const [sortBy, setSortBy] = useState<string>('lastModified')

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         agent.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || agent.status === statusFilter
    const matchesCategory = categoryFilter === 'all' || agent.category === categoryFilter
    return matchesSearch && matchesStatus && matchesCategory
  })

  const getStatusIcon = (status: Agent['status']) => {
    switch (status) {
      case 'live':
        return <div className="w-2 h-2 bg-green-500 rounded-full" />
      case 'draft':
        return <div className="w-2 h-2 bg-gray-500 rounded-full" />
      case 'error':
        return <div className="w-2 h-2 bg-red-500 rounded-full" />
      case 'testing':
        return <div className="w-2 h-2 bg-yellow-500 rounded-full" />
    }
  }

  const getStatusColor = (status: Agent['status']) => {
    switch (status) {
      case 'live':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'draft':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
      case 'error':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
      case 'testing':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
    }
  }

  const handleAgentAction = (action: string, agent: Agent) => {
    switch (action) {
      case 'edit':
        onSelectWorkflow(agent)
        break
      case 'test':
        console.log('Testing agent:', agent.id)
        break
      case 'duplicate':
        console.log('Duplicating agent:', agent.id)
        break
      case 'delete':
        setAgents(prev => prev.filter(a => a.id !== agent.id))
        break
    }
  }

  const renderStatsCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 ">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Agents</CardTitle>
          <Code2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{agents.length}</div>
          <p className="text-xs text-muted-foreground">
            +2 from last month
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Live Agents</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {agents.filter(a => a.status === 'live').length}
          </div>
          <p className="text-xs text-muted-foreground">
            {Math.round((agents.filter(a => a.status === 'live').length / agents.length) * 100)}% deployment rate
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Usage</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {agents.reduce((sum, a) => sum + a.usage, 0).toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">
            +12% from last week
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg Nodes</CardTitle>
          <GitBranch className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {Math.round(agents.reduce((sum, a) => sum + a.nodes, 0) / agents.length)}
          </div>
          <p className="text-xs text-muted-foreground">
            Per workflow
          </p>
        </CardContent>
      </Card>
    </div>
  )

  const renderAgentGrid = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {filteredAgents.map((agent) => (
        <Card key={agent.id} className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-2">
                {getStatusIcon(agent.status)}
                <Badge className={getStatusColor(agent.status)}>
                  {agent.status}
                </Badge>
                {agent.isPublic && (
                  <Badge variant="outline" className="text-xs">
                    Public
                  </Badge>
                )}
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
            <div>
              <CardTitle className="text-lg">{agent.name}</CardTitle>
              <CardDescription className="mt-1">
                {agent.description}
              </CardDescription>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Version</span>
              <span className="font-medium">{agent.version}</span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Category</span>
              <Badge variant="secondary">{agent.category}</Badge>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Nodes</span>
              <span className="font-medium">{agent.nodes}</span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Usage</span>
              <span className="font-medium">{agent.usage.toLocaleString()}</span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Modified</span>
              <span className="font-medium">{agent.lastModified}</span>
            </div>
            
            <div className="flex space-x-2 pt-2 ">
              <Button 
                size="sm" 
                onClick={() => handleAgentAction('edit', agent)}
                className="flex-1 !bg-black border-none"
              >
                <Edit className="h-3 w-3 mr-1" />
                Edit
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleAgentAction('test', agent)}
              >
                <Play className="h-3 w-3 mr-1" />
                Test
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleAgentAction('duplicate', agent)}
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  const renderAgentList = () => (
    <Card>
      <CardHeader>
        <CardTitle>Agents</CardTitle>
        <CardDescription>Manage your AI agent workflows</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {filteredAgents.map((agent) => (
            <div key={agent.id} className="p-4 hover:bg-accent/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(agent.status)}
                    <div>
                      <h4 className="font-medium">{agent.name}</h4>
                      <p className="text-sm text-muted-foreground">{agent.description}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <Badge className={getStatusColor(agent.status)}>
                      {agent.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      v{agent.version} • {agent.lastModified}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleAgentAction('edit', agent)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleAgentAction('test', agent)}
                    >
                      <Play className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-semibold">Developer Dashboard</h2>
            <p className="text-muted-foreground">Manage and monitor your AI agent workflows</p>
          </div>
          <Button 
            className="!bg-brand-primary border-none"
            onClick={onNewAgent}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Agent
          </Button>
        </div>
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search agents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="live">Live</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="testing">Testing</SelectItem>
              <SelectItem value="error">Error</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="NLP">NLP</SelectItem>
              <SelectItem value="Automation">Automation</SelectItem>
              <SelectItem value="E-commerce">E-commerce</SelectItem>
              <SelectItem value="Moderation">Moderation</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        {renderStatsCards()}
        
        <Tabs defaultValue="grid" className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>{filteredAgents.length} agents</span>
            </div>
          </div>
          
          <TabsContent value="grid">
            {renderAgentGrid()}
          </TabsContent>
          
          <TabsContent value="list">
            {renderAgentList()}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}