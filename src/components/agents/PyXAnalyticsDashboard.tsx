'use client'

import { useState,  useMemo } from 'react'
import { Card } from '../common/ui/card'
import { Button } from '../common/ui/button'
import { Badge } from '../common/ui/badge'
import { ScrollArea } from '../common/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../common/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../common/ui/select'
import { usePyX } from '../layout/PyXContextProvider'
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
  Cell,
  Area,
  AreaChart
} from 'recharts'
import {
  TrendingUp,
  MessageSquare,
  Clock,
  Target,
  CheckCircle,
  Download,
  X
} from 'lucide-react'

interface AnalyticsData {
  conversationMetrics: {
    totalConversations: number
    totalMessages: number
    averageSessionLength: number
    userSatisfaction: number
    responseTime: number
    resolutionRate: number
  }
  
  userBehavior: {
    topIntents: { name: string; count: number; percentage: number }[]
    pageDistribution: { page: string; sessions: number; percentage: number }[]
    timeDistribution: { hour: number; conversations: number }[]
    userTypes: { type: string; count: number; percentage: number }[]
  }
  
  contentAnalysis: {
    topTopics: { topic: string; mentions: number; sentiment: number }[]
    languageDistribution: { language: string; usage: number }[]
    messageLength: { range: string; count: number }[]
    codeExampleRequests: number
  }
  
  performanceMetrics: {
    aiModelUsage: { model: string; requests: number; avgResponseTime: number; cost: number }[]
    errorRates: { date: string; errorRate: number }[]
    systemUptime: number
    apiLatency: number
  }
  
  trends: {
    conversationTrends: { date: string; conversations: number; messages: number }[]
    satisfactionTrends: { date: string; satisfaction: number }[]
    popularFeatures: { feature: string; usage: number; growth: number }[]
  }
}

interface PyXAnalyticsDashboardProps {
  isOpen: boolean
  onClose: () => void
}

export function PyXAnalyticsDashboard({ isOpen, onClose }: PyXAnalyticsDashboardProps) {
  const { conversationHistory } = usePyX()
  // const { config } = useAIService()
  
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d')
  // const [selectedMetric, setSelectedMetric] = useState('conversations')
  // const [isLoading, setIsLoading] = useState(false)
  // const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)

  // Process analytics data
  const processedData = useMemo<AnalyticsData | null>(() => {
    if (!conversationHistory.length) return null

    const now = new Date()
    const timeRanges = {
      '1d': new Date(now.getTime() - 24 * 60 * 60 * 1000),
      '7d': new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
      '30d': new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
      '90d': new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)
    }

    const startDate = timeRanges[selectedTimeRange as keyof typeof timeRanges]
    const filteredHistory = conversationHistory.filter(conv => conv.startTime >= startDate)

    // Calculate conversation metrics
    const totalConversations = filteredHistory.length
    const totalMessages = filteredHistory.reduce((sum, conv) => sum + conv.messages.length, 0)
    const averageSessionLength = filteredHistory.reduce((sum, conv) => {
      const duration = conv.endTime ? conv.endTime.getTime() - conv.startTime.getTime() : 0
      return sum + duration
    }, 0) / filteredHistory.length / 1000 / 60 // Convert to minutes

    // Process user behavior
    const intentCounts = new Map<string, number>()
    const pageCounts = new Map<string, number>()
    const hourCounts = new Map<number, number>()
    const topicCounts = new Map<string, number>()

    filteredHistory.forEach(conv => {
      pageCounts.set(conv.context, (pageCounts.get(conv.context) || 0) + 1)
      
      const hour = conv.startTime.getHours()
      hourCounts.set(hour, (hourCounts.get(hour) || 0) + 1)
      
      conv.tags.forEach(tag => {
        topicCounts.set(tag, (topicCounts.get(tag) || 0) + 1)
      })
      
      conv.messages.forEach(msg => {
        if (msg.type === 'user') {
          // Simple intent classification
          const intent = classifyIntent(msg.content)
          intentCounts.set(intent, (intentCounts.get(intent) || 0) + 1)
        }
      })
    })

    // Convert to arrays and calculate percentages
    const topIntents = Array.from(intentCounts.entries())
      .map(([name, count]) => ({ name, count, percentage: (count / totalMessages) * 100 }))
      .sort((a, b) => b.count - a.count)

    const pageDistribution = Array.from(pageCounts.entries())
      .map(([page, sessions]) => ({ page, sessions, percentage: (sessions / totalConversations) * 100 }))
      .sort((a, b) => b.sessions - a.sessions)

    const timeDistribution = Array.from(hourCounts.entries())
      .map(([hour, conversations]) => ({ hour, conversations }))
      .sort((a, b) => a.hour - b.hour)

    const topTopics = Array.from(topicCounts.entries())
      .map(([topic, mentions]) => ({ topic, mentions, sentiment: Math.random() * 2 - 1 }))
      .sort((a, b) => b.mentions - a.mentions)

    // Generate trend data
    const conversationTrends = generateTrendData(filteredHistory, selectedTimeRange)
    const satisfactionTrends = generateSatisfactionTrends(selectedTimeRange)

    return {
      conversationMetrics: {
        totalConversations,
        totalMessages,
        averageSessionLength,
        userSatisfaction: 4.2, // Mock data
        responseTime: 1.8, // Mock data
        resolutionRate: 0.87 // Mock data
      },
      userBehavior: {
        topIntents,
        pageDistribution,
        timeDistribution,
        userTypes: [
          { type: 'Developer', count: 45, percentage: 45 },
          { type: 'Business User', count: 30, percentage: 30 },
          { type: 'Analyst', count: 25, percentage: 25 }
        ]
      },
      contentAnalysis: {
        topTopics,
        languageDistribution: [
          { language: 'English', usage: 85 },
          { language: 'Spanish', usage: 10 },
          { language: 'French', usage: 5 }
        ],
        messageLength: [
          { range: '0-50', count: 120 },
          { range: '51-100', count: 89 },
          { range: '101-200', count: 45 },
          { range: '200+', count: 23 }
        ],
        codeExampleRequests: 67
      },
      performanceMetrics: {
        aiModelUsage: [
          { model: 'GPT-4', requests: 1250, avgResponseTime: 1.8, cost: 2.45 },
          { model: 'Claude-3', requests: 890, avgResponseTime: 2.1, cost: 1.89 },
          { model: 'Local', requests: 340, avgResponseTime: 0.5, cost: 0.00 }
        ],
        errorRates: generateErrorRates(selectedTimeRange),
        systemUptime: 99.8,
        apiLatency: 245
      },
      trends: {
        conversationTrends,
        satisfactionTrends,
        popularFeatures: [
          { feature: 'Agent Creation', usage: 234, growth: 15 },
          { feature: 'API Help', usage: 189, growth: 8 },
          { feature: 'Code Examples', usage: 156, growth: 22 },
          { feature: 'Tutorials', usage: 134, growth: 5 }
        ]
      }
    }
  }, [conversationHistory, selectedTimeRange])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-7xl h-[90vh] bg-white dark:bg-gray-900 overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold">PyX Analytics Dashboard</h2>
            <p className="text-gray-600 dark:text-gray-400">Conversation insights and performance metrics</p>
          </div>
          <div className="flex items-center space-x-4">
            <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1d">Last 24h</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <ScrollArea className="h-full p-6">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="conversations">Conversations</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Conversations</p>
                      <p className="text-2xl font-bold">{processedData?.conversationMetrics.totalConversations || 0}</p>
                    </div>
                    <MessageSquare className="h-8 w-8 text-blue-500" />
                  </div>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">+12% from last period</span>
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Avg Session Length</p>
                      <p className="text-2xl font-bold">{processedData?.conversationMetrics.averageSessionLength.toFixed(1) || 0}m</p>
                    </div>
                    <Clock className="h-8 w-8 text-purple-500" />
                  </div>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">+8% from last period</span>
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">User Satisfaction</p>
                      <p className="text-2xl font-bold">{processedData?.conversationMetrics.userSatisfaction.toFixed(1) || 0}/5</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">+3% from last period</span>
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Resolution Rate</p>
                      <p className="text-2xl font-bold">{((processedData?.conversationMetrics.resolutionRate || 0) * 100).toFixed(1)}%</p>
                    </div>
                    <Target className="h-8 w-8 text-orange-500" />
                  </div>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">+5% from last period</span>
                  </div>
                </Card>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Conversation Trends</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={processedData?.trends.conversationTrends || []}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="conversations" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} />
                    </AreaChart>
                  </ResponsiveContainer>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">User Intent Distribution</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={processedData?.userBehavior.topIntents || []}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percentage }) => `${name} ${percentage.toFixed(1)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                      >
                        {(processedData?.userBehavior.topIntents || []).map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </Card>
              </div>

              {/* Top Topics */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Top Discussion Topics</h3>
                <div className="space-y-3">
                  {processedData?.contentAnalysis.topTopics.slice(0, 5).map((topic, index) => (
                    <div key={topic.topic} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{topic.topic}</p>
                          <p className="text-sm text-gray-600">{topic.mentions} mentions</p>
                        </div>
                      </div>
                      <Badge variant={topic.sentiment > 0 ? 'default' : 'secondary'}>
                        {topic.sentiment > 0 ? 'Positive' : 'Neutral'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="conversations" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Hourly Distribution</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={processedData?.userBehavior.timeDistribution || []}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hour" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="conversations" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Page Distribution</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={processedData?.userBehavior.pageDistribution || []}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="page" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="sessions" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="users" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">User Types</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={processedData?.userBehavior.userTypes || []}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ type, percentage }) => `${type} ${percentage}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                      >
                        {(processedData?.userBehavior.userTypes || []).map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Message Length Distribution</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={processedData?.contentAnalysis.messageLength || []}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="range" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#f59e0b" />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="performance" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">AI Model Performance</h3>
                  <div className="space-y-4">
                    {processedData?.performanceMetrics.aiModelUsage.map((model, _) => (
                      <div key={model.model} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div>
                          <p className="font-medium">{model.model}</p>
                          <p className="text-sm text-gray-600">{model.requests} requests</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm">{model.avgResponseTime}s avg</p>
                          <p className="text-sm text-gray-600">${model.cost.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">System Metrics</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div>
                        <p className="font-medium">System Uptime</p>
                        <p className="text-sm text-gray-600">Last 30 days</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-green-600">{processedData?.performanceMetrics.systemUptime}%</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div>
                        <p className="font-medium">API Latency</p>
                        <p className="text-sm text-gray-600">Average response time</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold">{processedData?.performanceMetrics.apiLatency}ms</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="trends" className="space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Satisfaction Trends</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={processedData?.trends.satisfactionTrends || []}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="satisfaction" stroke="#10b981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </TabsContent>
          </Tabs>
        </ScrollArea>
      </Card>
    </div>
  )
}

// Helper functions
function classifyIntent(message: string): string {
  const lowerMessage = message.toLowerCase()
  
  if (lowerMessage.includes('how') || lowerMessage.includes('what') || lowerMessage.includes('why')) {
    return 'question'
  }
  if (lowerMessage.includes('help') || lowerMessage.includes('support')) {
    return 'help_request'
  }
  if (lowerMessage.includes('create') || lowerMessage.includes('build')) {
    return 'create_agent'
  }
  if (lowerMessage.includes('find') || lowerMessage.includes('recommend')) {
    return 'find_agent'
  }
  if (lowerMessage.includes('error') || lowerMessage.includes('bug')) {
    return 'technical_support'
  }
  if (lowerMessage.includes('tutorial') || lowerMessage.includes('learn')) {
    return 'tutorial'
  }
  return 'general'
}

function generateTrendData(conversations: any[], timeRange: string) {
  const days = timeRange === '1d' ? 1 : timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90
  const data = []
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const dayConversations = conversations.filter(conv => 
      conv.startTime.toDateString() === date.toDateString()
    )
    
    data.push({
      date: date.toLocaleDateString(),
      conversations: dayConversations.length,
      messages: dayConversations.reduce((sum, conv) => sum + conv.messages.length, 0)
    })
  }
  
  return data
}

function generateSatisfactionTrends( timeRange: string) {
  const days = timeRange === '1d' ? 1 : timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90
  const data = []
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    
    data.push({
      date: date.toLocaleDateString(),
      satisfaction: 4.0 + Math.random() * 0.8 // Mock satisfaction data
    })
  }
  
  return data
}

function generateErrorRates(timeRange: string) {
  const days = timeRange === '1d' ? 1 : timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90
  const data = []
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    
    data.push({
      date: date.toLocaleDateString(),
      errorRate: Math.random() * 0.05 // Mock error rate between 0-5%
    })
  }
  
  return data
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#84cc16', '#f97316']