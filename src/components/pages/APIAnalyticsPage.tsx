'use client'

import { useState } from 'react'
import { Button } from '../common/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../common/ui/card'
import { Badge } from '../common/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../common/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../common/ui/tabs'
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
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts'
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  // Globe,
  Zap,
  // Users,
  Eye,
  Download,
  // Calendar,
  BarChart3,
  MapPin,
  Smartphone,
  Monitor,
  Tablet
} from 'lucide-react'

interface APIAnalyticsPageProps {
  apiData: {
    id: string
    name: string
    description: string
    category: string
  }
  onBack: () => void
}

export function APIAnalyticsPage({ apiData, onBack }: APIAnalyticsPageProps) {
  const [timeRange, setTimeRange] = useState('7d')
  const [metricType, setMetricType] = useState('requests')

  // Mock analytics data
  const requestsOverTime = [
    { date: '2024-01-01', requests: 234, successful: 220, failed: 14, avgResponseTime: 145 },
    { date: '2024-01-02', requests: 567, successful: 545, failed: 22, avgResponseTime: 132 },
    { date: '2024-01-03', requests: 445, successful: 428, failed: 17, avgResponseTime: 156 },
    { date: '2024-01-04', requests: 623, successful: 601, failed: 22, avgResponseTime: 143 },
    { date: '2024-01-05', requests: 534, successful: 512, failed: 22, avgResponseTime: 167 },
    { date: '2024-01-06', requests: 789, successful: 765, failed: 24, avgResponseTime: 134 },
    { date: '2024-01-07', requests: 656, successful: 634, failed: 22, avgResponseTime: 149 }
  ]

  const responseStatusCodes = [
    { code: '200', count: 3247, percentage: 87.4, color: '#10b981' },
    { code: '400', count: 234, percentage: 6.3, color: '#f59e0b' },
    { code: '401', count: 156, percentage: 4.2, color: '#ef4444' },
    { code: '500', count: 78, percentage: 2.1, color: '#dc2626' }
  ]

  const topEndpoints = [
    { endpoint: '/api/agents/summarize', requests: 1234, avgResponseTime: 145, successRate: 98.2 },
    { endpoint: '/api/agents/analyze', requests: 856, avgResponseTime: 167, successRate: 96.8 },
    { endpoint: '/api/agents/generate', requests: 534, avgResponseTime: 234, successRate: 94.1 },
    { endpoint: '/api/agents/classify', requests: 423, avgResponseTime: 112, successRate: 99.1 }
  ]

  const geographicData = [
    { country: 'United States', requests: 1456, percentage: 39.2 },
    { country: 'United Kingdom', requests: 823, percentage: 22.1 },
    { country: 'Germany', requests: 567, percentage: 15.3 },
    { country: 'Canada', requests: 423, percentage: 11.4 },
    { country: 'Australia', requests: 289, percentage: 7.8 },
    { country: 'Others', requests: 157, percentage: 4.2 }
  ]

  const deviceTypes = [
    { type: 'Desktop', count: 2145, percentage: 57.8, color: '#3b82f6' },
    { type: 'Mobile', count: 1234, percentage: 33.2, color: '#8b5cf6' },
    { type: 'Tablet', count: 334, percentage: 9.0, color: '#10b981' }
  ]

  const currentStats = {
    totalRequests: 4848,
    successRate: 96.2,
    avgResponseTime: 147,
    errorRate: 3.8,
    requestsChange: 12.4,
    responseTimeChange: -8.2,
    successRateChange: 2.1,
    errorRateChange: -1.3
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num)
  }

  const getChangeIcon = (change: number) => {
    return change > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />
  }

  const getChangeColor = (change: number, inverse = false) => {
    const isPositive = inverse ? change < 0 : change > 0
    return isPositive ? 'text-green-600' : 'text-red-600'
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-3xl font-bold flex items-center space-x-3">
                <div className="bg-gradient-to-r from-green-500 to-blue-500 p-2 rounded-lg text-white">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <span>API Analytics</span>
              </h1>
              <p className="text-muted-foreground mt-1">Monitor performance and usage patterns</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
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
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* API Info */}
        <Card className="mb-6 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">{apiData.name}</CardTitle>
                <CardDescription className="flex items-center space-x-2 mt-1">
                  <Badge variant="secondary">{apiData.category}</Badge>
                  <span>•</span>
                  <span>API ID: {apiData.id}</span>
                </CardDescription>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <CheckCircle className="h-3 w-3 mr-1" />
                Active
              </Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(currentStats.totalRequests)}</div>
              <div className={`flex items-center text-xs ${getChangeColor(currentStats.requestsChange)}`}>
                {getChangeIcon(currentStats.requestsChange)}
                <span className="ml-1">
                  {Math.abs(currentStats.requestsChange)}% vs last period
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentStats.successRate}%</div>
              <div className={`flex items-center text-xs ${getChangeColor(currentStats.successRateChange)}`}>
                {getChangeIcon(currentStats.successRateChange)}
                <span className="ml-1">
                  {Math.abs(currentStats.successRateChange)}% vs last period
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentStats.avgResponseTime}ms</div>
              <div className={`flex items-center text-xs ${getChangeColor(currentStats.responseTimeChange, true)}`}>
                {getChangeIcon(currentStats.responseTimeChange)}
                <span className="ml-1">
                  {Math.abs(currentStats.responseTimeChange)}% vs last period
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentStats.errorRate}%</div>
              <div className={`flex items-center text-xs ${getChangeColor(currentStats.errorRateChange, true)}`}>
                {getChangeIcon(currentStats.errorRateChange)}
                <span className="ml-1">
                  {Math.abs(currentStats.errorRateChange)}% vs last period
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="performance" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="usage">Usage</TabsTrigger>
            <TabsTrigger value="errors">Errors</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-6">
            {/* Request Volume Over Time */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Request Volume</CardTitle>
                    <CardDescription>API requests over time</CardDescription>
                  </div>
                  <Select value={metricType} onValueChange={setMetricType}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="requests">Total Requests</SelectItem>
                      <SelectItem value="successful">Successful</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={requestsOverTime}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey={metricType} 
                      stroke="hsl(var(--primary))" 
                      fill="hsl(var(--primary))"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Response Time Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Response Time Trends</CardTitle>
                <CardDescription>Average response time over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={requestsOverTime}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="avgResponseTime" 
                      stroke="#f59e0b" 
                      strokeWidth={2}
                      dot={{ fill: '#f59e0b' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="usage" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Endpoints */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Endpoints</CardTitle>
                  <CardDescription>Most frequently accessed endpoints</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topEndpoints.map((endpoint, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1 min-w-0">
                          <p className="font-mono text-sm truncate">{endpoint.endpoint}</p>
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                            <span>{formatNumber(endpoint.requests)} requests</span>
                            <span>{endpoint.avgResponseTime}ms avg</span>
                            <span className="text-green-600">{endpoint.successRate}% success</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Geographic Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Geographic Distribution</CardTitle>
                  <CardDescription>Requests by country</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {geographicData.map((country, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">{country.country}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{formatNumber(country.requests)}</div>
                          <div className="text-xs text-muted-foreground">{country.percentage}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Device Types */}
            <Card>
              <CardHeader>
                <CardTitle>Device Types</CardTitle>
                <CardDescription>Requests by device category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    {deviceTypes.map((device, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          {device.type === 'Desktop' && <Monitor className="h-5 w-5 text-blue-600" />}
                          {device.type === 'Mobile' && <Smartphone className="h-5 w-5 text-purple-600" />}
                          {device.type === 'Tablet' && <Tablet className="h-5 w-5 text-green-600" />}
                          <div>
                            <p className="font-medium">{device.type}</p>
                            <p className="text-sm text-muted-foreground">{device.percentage}%</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{formatNumber(device.count)}</p>
                          <p className="text-sm text-muted-foreground">requests</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={deviceTypes}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="count"
                          label={({ type, percentage }) => `${type}: ${percentage}%`}
                        >
                          {deviceTypes.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="errors" className="space-y-6">
            {/* Response Status Codes */}
            <Card>
              <CardHeader>
                <CardTitle>Response Status Codes</CardTitle>
                <CardDescription>Distribution of HTTP response codes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    {responseStatusCodes.map((status, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: status.color }}
                          />
                          <div>
                            <p className="font-mono font-medium">{status.code}</p>
                            <p className="text-sm text-muted-foreground">{status.percentage}%</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{formatNumber(status.count)}</p>
                          <p className="text-sm text-muted-foreground">responses</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={responseStatusCodes}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="count"
                          label={({ code, percentage }) => `${code}: ${percentage}%`}
                        >
                          {responseStatusCodes.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Error Rate Over Time */}
            <Card>
              <CardHeader>
                <CardTitle>Error Rate Trends</CardTitle>
                <CardDescription>Failed requests over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={requestsOverTime}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="failed" 
                      stroke="#ef4444" 
                      fill="#ef4444"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            {/* Insights Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
                <CardHeader>
                  <CardTitle className="flex items-center text-green-700 dark:text-green-300">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Performance Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Response time improved by 8.2% compared to last period</li>
                    <li>• Success rate consistently above 95% for the past week</li>
                    <li>• Peak usage occurs between 2-4 PM EST</li>
                    <li>• Mobile traffic increased by 15% this month</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                <CardHeader>
                  <CardTitle className="flex items-center text-blue-700 dark:text-blue-300">
                    <Eye className="h-5 w-5 mr-2" />
                    Usage Patterns
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• 57% of requests come from desktop clients</li>
                    <li>• US accounts for 39% of total traffic</li>
                    <li>• /summarize endpoint is the most popular (35% of requests)</li>
                    <li>• Weekend traffic is 25% lower than weekdays</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800">
                <CardHeader>
                  <CardTitle className="flex items-center text-yellow-700 dark:text-yellow-300">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Consider implementing caching for the /analyze endpoint</li>
                    <li>• Monitor 400 errors - they've increased by 12% this week</li>
                    <li>• Scale up resources during peak hours (2-4 PM EST)</li>
                    <li>• Add rate limiting for mobile clients to prevent abuse</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800">
                <CardHeader>
                  <CardTitle className="flex items-center text-purple-700 dark:text-purple-300">
                    <Zap className="h-5 w-5 mr-2" />
                    Opportunities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Expand to European market (only 15% of current traffic)</li>
                    <li>• Optimize for mobile - usage is growing rapidly</li>
                    <li>• Consider premium tier for high-volume users</li>
                    <li>• Add webhook notifications for better integration</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}