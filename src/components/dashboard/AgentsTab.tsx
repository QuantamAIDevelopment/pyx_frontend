import { Button } from '../common/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../common/ui/card'
import { Badge } from '../common/ui/badge'
import { Progress } from '../common/ui/progress'
import { Avatar, AvatarFallback } from '../common/ui/avatar'
import {
  Settings,
  Play,
  MoreHorizontal,
  TestTube
} from 'lucide-react'

interface AgentsTabProps {
  onViewAgentDetail: (agent: any) => void
  onRunAgent: (agent: any) => void
  onTestingLab: () => void
}

const myAgents = [
  {
    id: '1',
    name: 'SmartSummarizer',
    status: 'active',
    usage: 89,
    cost: '₹1250',
    category: 'Content',
    lastUsed: '2 hours ago',
    performance: 94
  },
  {
    id: '2',
    name: 'SupportGenie',
    status: 'active',
    usage: 67,
    cost: '₹830',
    category: 'Support',
    lastUsed: '1 hour ago',
    performance: 91
  },
  {
    id: '3',
    name: 'PriceOptimizer',
    status: 'paused',
    usage: 0,
    cost: '₹0.00',
    category: 'Sales',
    lastUsed: '3 days ago',
    performance: 87
  },
  {
    id: '4',
    name: 'StockSense',
    status: 'active',
    usage: 45,
    cost: '₹520',
    category: 'Inventory',
    lastUsed: '30 minutes ago',
    performance: 96
  }
]

export function AgentsTab({ onViewAgentDetail, onRunAgent, onTestingLab }: AgentsTabProps) {
  const handleViewAgentDetail = (agent: any) => {
    // Convert dashboard agent format to detail page format
    const agentDetailData = {
      id: agent.id,
      name: agent.name,
      description: `${agent.category} agent - ${agent.name}`,
      category: agent.category,
      icon: Play, // Default icon
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

  return (
    <div className="space-y-6">
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
                    className="flex-1 !bg-brand-primary  border-none"
                    size="sm" 
                    onClick={(e) => {
                      e.stopPropagation()
                      onRunAgent(agent)
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
    </div>
  )
}