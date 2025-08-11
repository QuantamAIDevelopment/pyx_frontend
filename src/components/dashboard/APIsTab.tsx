import { Button } from '../common/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../common/ui/card'
import { Badge } from '../common/ui/badge'
import {
  Settings,
  Activity,
  Globe,
  Copy,
  ExternalLink,
  Zap
} from 'lucide-react'

interface APIsTabProps {
  onManageAPI: (apiData: any) => void
  onAnalytics: (apiData: any) => void
  onAgentBuilder: () => void
}

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

export function APIsTab({ onManageAPI, onAnalytics, onAgentBuilder }: APIsTabProps) {
  const getAPIStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'expired': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'private': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  return (
    <div className="space-y-6">
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
                  <div className="bg-brand-primary p-2 rounded-lg text-white">
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
    </div>
  )
}