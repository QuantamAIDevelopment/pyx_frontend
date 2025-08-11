import { Button } from '../common/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../common/ui/card'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { 
  Zap, 
  TrendingUp,
  Activity,
  Upload,
  Code2,
  Wallet,
  CreditCard,
  Eye,
  GitBranch,
  Bot,
  TestTube
} from 'lucide-react'

interface OverviewTabProps {
  userWallet: {
    balance: number
    currency: string
  }
  onAgentBuilder: () => void
  onViewWorkflows: () => void
  onUploadAgent: () => void
  onViewProfile: () => void
  onTestingLab: () => void
  onGenerateApp: () => void
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

export function OverviewTab({ 
  userWallet, 
  onAgentBuilder, 
  onViewWorkflows, 
  onUploadAgent, 
  onViewProfile, 
  onTestingLab, 
  onGenerateApp 
}: OverviewTabProps) {
  return (
    <div className="space-y-6">
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
            <span className="h-4 w-4 text-muted-foreground">₹   </span> 
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹ {userWallet.balance.toFixed(2)}</div>
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
      <Card className="bg-gradient-to-r from-orange-50 to-white  ">
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
              className="h-auto flex-col space-y-2 p-4 !bg-brand-primary text-white"
            >
              <Zap className="h-6 w-6" />
              <span>Build Agent</span>
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
             <Button 
              variant="outline" 
              onClick={onGenerateApp}
              className="h-auto flex-col space-y-2 p-4"
            >
              <Code2 className="h-6 w-6" />
              <span>Generate App</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Wallet Widget */}
      <Card className="bg-gradient-to-r from-orange-50 to-white ">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Wallet className="h-5 w-5 mr-2 text-blue-600" />
            Wallet Balance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold">₹ {userWallet.balance}</div>
              <p className="text-sm text-muted-foreground">Available balance</p>
            </div>
            <div className="flex space-x-2">
              <Button size="sm" className='!bg-black text-white hover:bg-gray-800 border-none'>
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
    </div>
  )
}