'use client'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../common/ui/dialog'
import { Button } from '../common/ui/button'
import { Badge } from '../common/ui/badge'
// import { Separator } from '../common/ui/separator'
import { ScrollArea } from '../common/ui/scroll-area'
import { 
  Star, 
  Zap, 
  CheckCircle, 
  ArrowRight, 
  Clock, 
  Users, 
  Shield,
  X 
} from 'lucide-react'

interface Agent {
  id: string
  name: string
  description: string
  category: string
  icon: React.ComponentType<any>
  price: string
  rating: number
  reviews: number
  isActive: boolean
  features: string[]
  sampleOutput: string
  integrations: string[]
}

interface AgentDetailModalProps {
  agent: Agent | null
  onClose: () => void
  onActivate: () => void
}

export function AgentDetailModal({ agent, onClose, onActivate }: AgentDetailModalProps) {
  if (!agent) return null

  const IconComponent = agent.icon

  const handleActivate = () => {
    onActivate()
    onClose()
  }

  return (
    <Dialog open={!!agent} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <ScrollArea className="max-h-[90vh]">
          <div className="p-6">
            {/* Header */}
            <DialogHeader className="mb-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <DialogTitle className="text-2xl mb-2">{agent.name}</DialogTitle>
                    <div className="flex items-center space-x-4">
                      <Badge variant={agent.price === 'Free' ? 'secondary' : 'default'} className="text-sm">
                        {agent.price}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{agent.rating}</span>
                        <span className="text-muted-foreground">({agent.reviews} reviews)</span>
                      </div>
                      <Badge variant="outline">{agent.category}</Badge>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <DialogDescription className="text-base leading-relaxed">
                {agent.description}
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Sample Output */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center">
                    <Zap className="h-5 w-5 mr-2 text-blue-600" />
                    Sample Output
                  </h3>
                  <div className="bg-muted/50 rounded-lg p-4 border-l-4 border-blue-500">
                    <p className="italic text-foreground">{agent.sampleOutput}</p>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                    Key Features
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {agent.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* How it Works */}
                <div>
                  <h3 className="font-semibold mb-3">How it Works</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium">1</div>
                      <div>
                        <p className="font-medium">Connect Your Data</p>
                        <p className="text-sm text-muted-foreground">Integrate with your existing ecommerce platform</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium">2</div>
                      <div>
                        <p className="font-medium">AI Analysis</p>
                        <p className="text-sm text-muted-foreground">Our AI processes your data and generates insights</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium">3</div>
                      <div>
                        <p className="font-medium">Automated Actions</p>
                        <p className="text-sm text-muted-foreground">Watch as the agent automatically optimizes your workflow</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Stats */}
                <div className="bg-muted/30 rounded-lg p-4">
                  <h4 className="font-semibold mb-3">Quick Stats</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Setup Time</span>
                      </div>
                      <span className="text-sm font-medium">5 minutes</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Active Users</span>
                      </div>
                      <span className="text-sm font-medium">{agent.reviews.toLocaleString()}+</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Shield className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Security</span>
                      </div>
                      <span className="text-sm font-medium">Enterprise</span>
                    </div>
                  </div>
                </div>

                {/* Integrations */}
                <div>
                  <h4 className="font-semibold mb-3">Integrations</h4>
                  <div className="space-y-2">
                    {agent.integrations.map((integration, index) => (
                      <div key={index} className="flex items-center space-x-2 p-2 bg-muted/30 rounded">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">{integration}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="space-y-3">
                  <Button onClick={handleActivate} className="w-full" size="lg">
                    <Zap className="h-4 w-4 mr-2" />
                    Activate Agent
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                  <Button variant="outline" className="w-full">
                    Try Demo
                  </Button>
                </div>

                {/* Pricing Info */}
                {agent.price !== 'Free' && (
                  <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg border">
                    <p className="text-sm text-muted-foreground mb-1">Starting at</p>
                    <p className="text-2xl font-bold">{agent.price}</p>
                    <p className="text-xs text-muted-foreground">7-day free trial included</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}