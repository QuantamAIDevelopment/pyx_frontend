'use client'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from '../common/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../common/ui/card'
import { Badge } from '../common/ui/badge'
import { Progress } from '../common/ui/progress'
import { Avatar, AvatarFallback } from '../common/ui/avatar'
import { Input } from '../common/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../common/ui/select'
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts'
import { 
  Play,
  Pause,
  Settings,
  TestTube,
  Activity,
  Zap,
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Bot,
  Search,
  RefreshCw,
  Eye,
  Download,
  Bell,
  ArrowUpRight,
  ArrowLeft
} from 'lucide-react'

interface ActiveAgent {
  id: string
  name: string
  category: string
  status: 'running' | 'idle' | 'error' | 'warning'
  uptime: string
  lastActivity: string
  usage: number
  performance: number
  cost: string
  dailyCost: number
  executions: number
  successRate: number
  avgResponseTime: number
  description: string
  version: string
  deploiredAt: string
  healthStatus: 'healthy' | 'warning' | 'critical'
  metrics: {
    timestamp: string
    executions: number
    errors: number
    responseTime: number
    cost: number
  }[]
}

const activeAgents: ActiveAgent[] = [
  {
    id: '1',
    name: 'SmartSummarizer',
    category: 'Content Generation',
    status: 'running',
    uptime: '7d 14h 23m',
    lastActivity: '2 minutes ago',
    usage: 89,
    performance: 94,
    cost: '₹ 12.50',
    dailyCost: 4.25,
    executions: 1247,
    successRate: 98.5,
    avgResponseTime: 1.2,
    description: 'AI-powered product descriptions generator',
    version: 'v2.1.3',
    deploiredAt: '2024-06-15',
    healthStatus: 'healthy',
    metrics: [
      { timestamp: '00:00', executions: 45, errors: 1, responseTime: 1.1, cost: 0.8 },
      { timestamp: '04:00', executions: 52, errors: 0, responseTime: 1.3, cost: 1.2 },
      { timestamp: '08:00', executions: 78, errors: 2, responseTime: 1.0, cost: 1.8 },
      { timestamp: '12:00', executions: 89, errors: 1, responseTime: 1.4, cost: 2.1 },
      { timestamp: '16:00', executions: 95, errors: 0, responseTime: 1.2, cost: 2.3 },
      { timestamp: '20:00', executions: 67, errors: 1, responseTime: 1.1, cost: 1.6 }
    ]
  },
  {
    id: '2',
    name: 'SupportGenie',
    category: 'Customer Support',
    status: 'running',
    uptime: '12d 8h 45m',
    lastActivity: '1 minute ago',
    usage: 67,
    performance: 91,
    cost: '₹ 8.30',
    dailyCost: 2.85,
    executions: 2156,
    successRate: 96.2,
    avgResponseTime: 0.8,
    description: '24/7 intelligent customer service bot',
    version: 'v1.8.2',
    deploiredAt: '2024-06-10',
    healthStatus: 'healthy',
    metrics: [
      { timestamp: '00:00', executions: 34, errors: 2, responseTime: 0.9, cost: 0.6 },
      { timestamp: '04:00', executions: 28, errors: 1, responseTime: 0.7, cost: 0.5 },
      { timestamp: '08:00', executions: 156, errors: 3, responseTime: 0.8, cost: 2.1 },
      { timestamp: '12:00', executions: 189, errors: 2, responseTime: 0.9, cost: 2.8 },
      { timestamp: '16:00', executions: 203, errors: 4, responseTime: 0.7, cost: 3.2 },
      { timestamp: '20:00', executions: 145, errors: 2, responseTime: 0.8, cost: 2.4 }
    ]
  },
  {
    id: '3',
    name: 'StockSense',
    category: 'Inventory Management',
    status: 'idle',
    uptime: '3d 2h 15m',
    lastActivity: '30 minutes ago',
    usage: 45,
    performance: 96,
    cost: '₹5.20',
    dailyCost: 1.75,
    executions: 456,
    successRate: 99.1,
    avgResponseTime: 2.1,
    description: 'Predictive inventory control system',
    version: 'v3.0.1',
    deploiredAt: '2024-06-20',
    healthStatus: 'healthy',
    metrics: [
      { timestamp: '00:00', executions: 12, errors: 0, responseTime: 2.0, cost: 0.3 },
      { timestamp: '04:00', executions: 8, errors: 0, responseTime: 2.2, cost: 0.2 },
      { timestamp: '08:00', executions: 23, errors: 0, responseTime: 1.9, cost: 0.6 },
      { timestamp: '12:00', executions: 34, errors: 1, responseTime: 2.3, cost: 0.9 },
      { timestamp: '16:00', executions: 28, errors: 0, responseTime: 2.0, cost: 0.7 },
      { timestamp: '20:00', executions: 15, errors: 0, responseTime: 2.1, cost: 0.4 }
    ]
  },
  {
    id: '4',
    name: 'PriceOptimizer',
    category: 'Sales Optimization',
    status: 'warning',
    uptime: '1d 16h 30m',
    lastActivity: '5 minutes ago',
    usage: 78,
    performance: 87,
    cost: '₹ 9.80',
    dailyCost: 3.45,
    executions: 892,
    successRate: 94.8,
    avgResponseTime: 1.8,
    description: 'Dynamic pricing optimization engine',
    version: 'v2.3.0',
    deploiredAt: '2024-06-22',
    healthStatus: 'warning',
    metrics: [
      { timestamp: '00:00', executions: 28, errors: 3, responseTime: 1.9, cost: 0.7 },
      { timestamp: '04:00', executions: 31, errors: 2, responseTime: 1.7, cost: 0.8 },
      { timestamp: '08:00', executions: 67, errors: 5, responseTime: 1.8, cost: 1.6 },
      { timestamp: '12:00', executions: 89, errors: 4, responseTime: 2.0, cost: 2.1 },
      { timestamp: '16:00', executions: 78, errors: 3, responseTime: 1.9, cost: 1.9 },
      { timestamp: '20:00', executions: 45, errors: 2, responseTime: 1.7, cost: 1.1 }
    ]
  }
]

interface ActiveAgentsPageProps {
  onViewChange: (view: string) => void
  isLoggedIn: boolean
  onShowAuth: (mode: 'login' | 'signup') => void
}

export function ActiveAgentsPage({ onViewChange }: ActiveAgentsPageProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  
  // Remove the selectedAgent and setSelectedAgent state
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const navigate = useNavigate();

  const filteredAgents = activeAgents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || agent.status === statusFilter
    const matchesCategory = categoryFilter === 'all' || agent.category === categoryFilter
    
    return matchesSearch && matchesStatus && matchesCategory
  })

  const categories = ['all', ...new Set(activeAgents.map(agent => agent.category))]
  const statuses = ['all', 'running', 'idle', 'warning', 'error']

  const toggleAgentStatus = (agentId: string) => {
    console.log('Toggling agent status:', agentId)
  }

  // Remove the openAgentDetails function
  

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'idle': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'warning': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'error': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const getHealthStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'warning': return <AlertCircle className="h-4 w-4 text-yellow-600" />
      case 'critical': return <AlertCircle className="h-4 w-4 text-red-600" />
      default: return <CheckCircle className="h-4 w-4 text-gray-600" />
    }
  }

  const totalExecutions = activeAgents.reduce((sum, agent) => sum + agent.executions, 0)
  const totalCost = activeAgents.reduce((sum, agent) => sum + agent.dailyCost, 0)
  const avgSuccessRate = activeAgents.reduce((sum, agent) => sum + agent.successRate, 0) / activeAgents.length
  const runningAgents = activeAgents.filter(agent => agent.status === 'running').length

  return (
    <div className="min-h-screen bg-background px-20">
      <div className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/agents')}
                className="flex items-center"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Agents
              </Button>
              <div>
                <h1 className="text-3xl font-bold mb-2">Active Agents</h1>
                <p className="text-muted-foreground">Monitor and manage your deployed AI agents</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 mt-4 md:mt-0">
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Alerts
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Running Agents</CardTitle>
                <Bot className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{runningAgents}</div>
                <p className="text-xs text-muted-foreground">
                  {runningAgents > 0 ? (
                    <span className="text-green-600 flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      All systems operational
                    </span>
                  ) : (
                    <span className="text-red-600">No agents running</span>
                  )}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Executions</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalExecutions.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +12% from yesterday
                  </span>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Daily Cost</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Rs{totalCost.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-red-600 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +5% from yesterday
                  </span>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{avgSuccessRate.toFixed(1)}%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +2.1% from last week
                  </span>
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search active agents..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map(status => (
                      <SelectItem key={status} value={status}>
                        {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex items-center space-x-2 ">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                      className={`flex-1 sm:flex-none ${viewMode === 'grid' ? '!bg-black text-white border-none' : ''}`}
                    
                  >
                    Grid
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                       className={`flex-1 sm:flex-none ${viewMode === 'list' ? '!bg-black text-white border-none' : ''}`}
                  >
                    List
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Info */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              Showing {filteredAgents.length} of {activeAgents.length} active agents
            </p>
          </div>

          {/* Agent Grid */}
          <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-4'}`}>
            {filteredAgents.map((agent) => (
              <Card key={agent.id} className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{agent.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{agent.name}</CardTitle>
                        <CardDescription className="flex items-center space-x-2">
                          <span>{agent.category}</span>
                          <span>•</span>
                          <span>{agent.version}</span>
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(agent.status)}>
                        {agent.status}
                      </Badge>
                      {getHealthStatusIcon(agent.healthStatus)}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{agent.description}</p>
                  
                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-4 py-4 border-t border-b">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{agent.executions}</div>
                      <div className="text-xs text-muted-foreground">Executions</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{agent.successRate}%</div>
                      <div className="text-xs text-muted-foreground">Success Rate</div>
                    </div>
                  </div>

                  {/* Performance Bars */}
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>CPU Usage</span>
                        <span>{agent.usage}%</span>
                      </div>
                      <Progress value={agent.usage} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Performance</span>
                        <span>{agent.performance}%</span>
                      </div>
                      <Progress value={agent.performance} className="h-2" />
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="flex justify-between items-center text-sm">
                    <div>
                      <p className="font-medium">{agent.cost}</p>
                      <p className="text-muted-foreground">Daily cost</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{agent.uptime}</p>
                      <p className="text-muted-foreground">Uptime</p>
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground">
                    Last activity: {agent.lastActivity}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2 pt-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      // onClick={() => openAgentDetails(agent)} // This line is removed
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <TestTube className="h-3 w-3 mr-1" />
                      Test
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleAgentStatus(agent.id)}
                    >
                      {agent.status === 'running' ? (
                        <Pause className="h-3 w-3" />
                      ) : (
                        <Play className="h-3 w-3" />
                      )}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredAgents.length === 0 && (
            <div className="text-center py-12">
              <Bot className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No active agents found</h3>
              <p className="text-muted-foreground mb-4">
                {activeAgents.length === 0 
                  ? "You don't have any active agents yet. Deploy some agents to get started."
                  : "Try adjusting your search terms or filters"
                }
              </p>
              <div className="flex justify-center space-x-3">
                {activeAgents.length === 0 ? (
                  <Button onClick={() => onViewChange('agents')}>
                    <Zap className="h-4 w-4 mr-2" />
                    Browse Agents
                  </Button>
                ) : (
                  <Button onClick={() => {
                    setSearchTerm('')
                    setStatusFilter('all')
                    setCategoryFilter('all')
                  }}>
                    Clear Filters
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Real-time Metrics Chart */}
          {filteredAgents.length > 0 && (
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Real-time Metrics</CardTitle>
                <CardDescription>Agent performance over the last 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={activeAgents[0]?.metrics || []}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timestamp" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="executions" 
                      stroke="hsl(var(--primary))" 
                      fill="hsl(var(--primary))"
                      fillOpacity={0.3}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="cost" 
                      stroke="hsl(var(--destructive))" 
                      fill="hsl(var(--destructive))"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}