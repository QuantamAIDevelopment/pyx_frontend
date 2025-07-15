'use client'

import { useState } from 'react'
import { Button } from '../common/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../common/ui/card'
import { Badge } from '../common/ui/badge'
import { Progress } from '../common/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../common/ui/tabs'
import { Avatar, AvatarFallback } from '../common/ui/avatar'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { 
  Plus, 
  Zap, 
  DollarSign, 
  TrendingUp, 
  
  Activity,
  Upload,
  Settings,
  
  Wallet,
  CreditCard,
  Eye,
  GitBranch,
  Bot,
  Play,
  MoreHorizontal,
  TestTube,
  // Shield,
  Globe,
  Copy,
  ExternalLink
} from 'lucide-react'

interface DashboardProps {
  userWallet: {
    balance: number
    currency: string
  }
  onCreateAgent: () => void
  onAgentBuilder: () => void
  onViewWorkflows: () => void
  onUploadAgent: () => void
  onViewProfile: () => void
  onTestingLab: () => void
  onManageAPI: (apiData: any) => void
  onAnalytics: (apiData: any) => void
  onViewAgentDetail: (agentData: any) => void
}

const usageData = [
  { name: 'Mon', agents: 45, cost: 12.5 },
  { name: 'Tue', agents: 52, cost: 18.2 },
  { name: 'Wed', agents: 38, cost: 9.8 },
  { name: 'Thu', agents: 61, cost: 22.1 },
  { name: 'Fri', agents: 55, cost: 19.5 },
  { name: 'Sat', agents: 43, cost: 11.2 },
  { name: 'Sun', agents: 39, cost: 10.8 }
]

const agentDistribution = [
  { name: 'Content', value: 35, color: '#8b5cf6' },
  { name: 'Support', value: 25, color: '#3b82f6' },
  { name: 'Analytics', value: 20, color: '#10b981' },
  { name: 'Sales', value: 20, color: '#f59e0b' }
]

const myAgents = [
  {
    id: '1',
    name: 'SmartSummarizer',
    status: 'active',
    usage: 89,
    cost: 'Rs1250',
    category: 'Content',
    lastUsed: '2 hours ago',
    performance: 94
  },
  {
    id: '2',
    name: 'SupportGenie',
    status: 'active',
    usage: 67,
    cost: 'Rs830',
    category: 'Support',
    lastUsed: '1 hour ago',
    performance: 91
  },
  {
    id: '3',
    name: 'PriceOptimizer',
    status: 'paused',
    usage: 0,
    cost: 'Rs0.00',
    category: 'Sales',
    lastUsed: '3 days ago',
    performance: 87
  },
  {
    id: '4',
    name: 'StockSense',
    status: 'active',
    usage: 45,
    cost: 'Rs520',
    category: 'Inventory',
    lastUsed: '30 minutes ago',
    performance: 96
  }
]

const recentTransactions = [
  {
    id: '1',
    type: 'usage',
    description: 'SmartSummarizer API calls',
    amount: -450,
    date: '2 hours ago'
  },
  {
    id: '2',
    type: 'topup',
    description: 'Wallet top-up',
    amount: 500,
    date: '1 day ago'
  },
  {
    id: '3',
    type: 'usage',
    description: 'SupportGenie interactions',
    amount: -220,
    date: '1 day ago'
  },
  {
    id: '4',
    type: 'usage',
    description: 'StockSense forecasting',
    amount: -180,
    date: '2 days ago'
  }
]

const myAPIs = [
  {
    id: 'api_1',
    agentName: 'SmartSummarizer',
    endpoint: 'https://pyx.ai/api/agents/smart-summarizer',
    status: 'live',
    lastUsed: '2 hours ago',
    requests: 234,
    category: 'Content'
  },
  {
    id: 'api_2',
    agentName: 'SupportGenie',
    endpoint: 'https://pyx.ai/api/agents/support-genie',
    status: 'live',
    lastUsed: '1 hour ago',
    requests: 567,
    category: 'Support'
  },
  {
    id: 'api_3',
    agentName: 'PriceOptimizer',
    endpoint: 'https://pyx.ai/api/agents/price-optimizer',
    status: 'expired',
    lastUsed: '3 days ago',
    requests: 89,
    category: 'Sales'
  },
  {
    id: 'api_4',
    agentName: 'StockSense',
    endpoint: 'https://pyx.ai/api/agents/stock-sense',
    status: 'private',
    lastUsed: '30 minutes ago',
    requests: 156,
    category: 'Inventory'
  }
]

export function Dashboard({ userWallet, onCreateAgent, onAgentBuilder, onViewWorkflows, onUploadAgent, onViewProfile, onTestingLab, onManageAPI, onAnalytics, onViewAgentDetail }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('overview')



  const handleViewAgentDetail = (agent: any) => {
    // Convert dashboard agent format to detail page format
    const agentDetailData = {
      id: agent.id,
      name: agent.name,
      description: `${agent.category} agent - ${agent.name}`,
      category: agent.category,
      icon: Zap, // Default icon
      price: agent.cost,
      rating: agent.performance / 20, // Convert performance to rating out of 5
      reviews: Math.floor(agent.performance * 2), // Mock review count
      isActive: agent.status === 'active',
      features: [
        'AI-Powered Processing',
        'Real-time Analytics',
        'Custom Configuration',
        'API Integration',
        'Performance Monitoring',
        'Automated Workflows'
      ],
      sampleOutput: `Sample output from ${agent.name}: This agent processes your data and provides intelligent insights to optimize your ${agent.category.toLowerCase()} operations.`,
      setupTime: '5 minutes',
      activeUsers: Math.floor(agent.performance * 10),
      security: 'Enterprise'
    }
    onViewAgentDetail(agentDetailData)
  }

  const getAPIStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'expired': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'private': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Manage your AI agents and monitor performance</p>
          </div>
          
          <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
            <Button onClick={onAgentBuilder} className="bg-gradient-to-r from-purple-600 to-pink-600">
              <Zap className="h-4 w-4 mr-2" />
              Build Agent
            </Button>
            <Button onClick={onCreateAgent} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Create Agent
            </Button>
            <Button variant="outline" onClick={onViewWorkflows}>
              <GitBranch className="h-4 w-4 mr-2" />
              Link Agents
            </Button>
            <Button variant="outline" onClick={onTestingLab}>
              <TestTube className="h-4 w-4 mr-2" />
              Testing Lab
            </Button>
            <Button variant="outline" onClick={onUploadAgent}>
              <Upload className="h-4 w-4 mr-2" />
              Upload Agent
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="agents">My Agents</TabsTrigger>
            <TabsTrigger value="apis">My APIs</TabsTrigger>
            <TabsTrigger value="wallet">Wallet</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
                  <Bot className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">+1 from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Monthly Spend</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Rs{userWallet.balance.toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground">-12% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">API Calls</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2,847</div>
                  <p className="text-xs text-muted-foreground">+18% from last week</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Performance</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">92%</div>
                  <p className="text-xs text-muted-foreground">+2% from last week</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Streamline your agent development workflow
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  <Button 
                    onClick={onAgentBuilder}
                    className="h-auto flex-col space-y-2 p-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                  >
                    <Zap className="h-6 w-6" />
                    <span>Build Agent</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={onCreateAgent}
                    className="h-auto flex-col space-y-2 p-4"
                  >
                    <Plus className="h-6 w-6" />
                    <span>Create Agent</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={onTestingLab}
                    className="h-auto flex-col space-y-2 p-4"
                  >
                    <TestTube className="h-6 w-6" />
                    <span>Test Agent</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={onViewWorkflows}
                    className="h-auto flex-col space-y-2 p-4"
                  >
                    <GitBranch className="h-6 w-6" />
                    <span>Build Workflow</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={onUploadAgent}
                    className="h-auto flex-col space-y-2 p-4"
                  >
                    <Upload className="h-6 w-6" />
                    <span>Upload Agent</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Wallet Widget */}
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Wallet className="h-5 w-5 mr-2 text-blue-600" />
                  Wallet Balance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold">Rs {userWallet.balance}</div>
                    <p className="text-sm text-muted-foreground">Available balance</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" className='text-black'>
                      <CreditCard className="h-4 w-4 mr-2" />
                      Top Up
                    </Button>
                    <Button size="sm" variant="outline" onClick={onViewProfile}>
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Usage Overview</CardTitle>
                  <CardDescription>Agent usage and costs this week</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={usageData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="cost" fill="hsl(var(--primary))" radius={4} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Agent Distribution</CardTitle>
                  <CardDescription>Usage by agent category</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={agentDistribution}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {agentDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="agents" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">My Agents</h2>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">Filter</Button>
                <Button variant="outline" size="sm">Sort</Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {myAgents.map(agent => (
                <Card key={agent.id} className="cursor-pointer transition-all hover:shadow-md hover:border-primary/20 relative group" onClick={() => handleViewAgentDetail(agent)}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>{agent.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{agent.name}</CardTitle>
                          <CardDescription>{agent.category}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={agent.status === 'active' ? 'default' : 'secondary'}>
                          {agent.status}
                        </Badge>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Click to run indicator */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs px-2 py-1 rounded-full flex items-center">
                        <Play className="h-3 w-3 mr-1" />
                        Click to run
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span>Usage</span>
                        <span>{agent.usage}%</span>
                      </div>
                      <Progress value={agent.usage} className="h-2" />
                      
                      <div className="flex justify-between text-sm">
                        <span>Performance</span>
                        <span>{agent.performance}%</span>
                      </div>
                      <Progress value={agent.performance} className="h-2" />
                      
                      <div className="flex justify-between items-center pt-2 border-t">
                        <div>
                          <p className="text-sm font-medium">{agent.cost}</p>
                          <p className="text-xs text-muted-foreground">This month</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">Last used</p>
                          <p className="text-xs text-muted-foreground">{agent.lastUsed}</p>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 pt-2">
                        <Button 
                          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                          size="sm" 
                          onClick={(e) => {
                            e.stopPropagation()
                            handleViewAgentDetail(agent)
                          }}
                        >
                          <Play className="h-3 w-3 mr-1" />
                          Run Agent
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={(e) => {
                            e.stopPropagation()
                            onTestingLab()
                          }} 
                          className="flex-1"
                        >
                          <TestTube className="h-3 w-3 mr-1" />
                          Test
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Settings className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="wallet" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Transaction History</CardTitle>
                  <CardDescription>Recent wallet activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentTransactions.map(transaction => (
                      <div key={transaction.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                        <div className="flex items-center space-x-3">
                          <div className={`w-2 h-2 rounded-full ${
                            transaction.type === 'usage' ? 'bg-red-500' : 'bg-green-500'
                          }`} />
                          <div>
                            <p className="font-medium">{transaction.description}</p>
                            <p className="text-sm text-muted-foreground">{transaction.date}</p>
                          </div>
                        </div>
                        <div className={`font-medium ${
                          transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.amount > 0 ? '+' : ''}Rs {Math.abs(transaction.amount)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Billing Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Current Balance</span>
                    <span className="font-medium">Rs {userWallet.balance}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>This Month</span>
                    <span className="font-medium">Rs 2650</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Projected</span>
                    <span className="font-medium">Rs 3520</span>
                  </div>
                  <Button className="w-ful text-black">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Add Funds
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Settings className="h-4 w-4 mr-2" />
                    Billing Settings
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="apis" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">My APIs</h2>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">Filter</Button>
                <Button variant="outline" size="sm">Sort</Button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {myAPIs.map(api => (
                <Card key={api.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg text-white">
                          <Globe className="h-5 w-5" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{api.agentName}</CardTitle>
                          <CardDescription className="flex items-center space-x-2">
                            <span>{api.category}</span>
                            <span>•</span>
                            <span>{api.requests} requests this month</span>
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getAPIStatusColor(api.status)}>
                          {api.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-muted/30 p-3 rounded-lg">
                        <div className="flex items-center justify-between">
                          <code className="text-sm font-mono text-muted-foreground">
                            {api.endpoint}
                          </code>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => navigator.clipboard.writeText(api.endpoint)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center text-sm">
                        <div>
                          <p className="font-medium">{api.requests} calls</p>
                          <p className="text-muted-foreground">This month</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">Last used</p>
                          <p className="text-muted-foreground">{api.lastUsed}</p>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 pt-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => onManageAPI({
                            id: api.id,
                            name: api.agentName,
                            description: `${api.category} automation agent`,
                            category: api.category
                          })}
                        >
                          <Settings className="h-3 w-3 mr-1" />
                          Manage
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => onAnalytics({
                            id: api.id,
                            name: api.agentName,
                            description: `${api.category} automation agent`,
                            category: api.category
                          })}
                        >
                          <Activity className="h-3 w-3 mr-1" />
                          Analytics
                        </Button>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {myAPIs.length === 0 && (
              <div className="text-center py-12">
                <Globe className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No APIs created yet</h3>
                <p className="text-muted-foreground mb-4">
                  Build an agent and enable API access to get started
                </p>
                <Button onClick={onAgentBuilder}>
                  <Zap className="h-4 w-4 mr-2" />
                  Build Your First Agent
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Analytics</CardTitle>
                <CardDescription>Detailed insights into your AI agents' performance</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={usageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="agents" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      dot={{ fill: 'hsl(var(--primary))' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}