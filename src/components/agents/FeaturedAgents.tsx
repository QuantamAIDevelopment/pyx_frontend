'use client'

import { Button } from '../common/ui/button'
import { Badge } from '../common/ui/badge'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../common/ui/card'
import { 
  ShoppingCart, 
  DollarSign, 
  Package, 
  MessageCircle, 
  Star, 
  ArrowRight,
  Zap
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
  isPopular?: boolean
  sampleOutput: string
}

const featuredAgents: Agent[] = [
  {
    id: '1',
    name: 'SmartSummarizer',
    description: 'AI-powered product descriptions that convert browsers into buyers with compelling, SEO-optimized content.',
    category: 'Content Generation',
    icon: ShoppingCart,
    price: 'Free',
    rating: 4.8,
    reviews: 1247,
    isPopular: true,
    sampleOutput: 'These sleek Wireless Earbuds ZX100 deliver crystal-clear 8 hours of immersive, noise-canceling audio with premium comfort design.'
  },
  {
    id: '2',
    name: 'PriceOptimizerAI',
    description: 'Smart pricing optimization that adjusts rates in real-time based on market conditions and competitor analysis.',
    category: 'Sales Optimization',
    icon: DollarSign,
    price: 'Rs29/mo',
    rating: 4.9,
    reviews: 892,
    isPopular: true,
    sampleOutput: 'Wireless Earbuds ZX100: Rs89.99 → Rs79.99 (12% demand increase predicted)'
  },
  {
    id: '3',
    name: 'StockSense',
    description: 'Predictive inventory control that prevents stockouts and reduces overstock with intelligent demand forecasting.',
    category: 'Inventory Management',
    icon: Package,
    price: 'Rs39/mo',
    rating: 4.7,
    reviews: 654,
    sampleOutput: 'Wireless Earbuds ZX100: Reorder 150 units by Dec 15 (predicted stockout Dec 22)'
  },
  {
    id: '4',
    name: 'SupportGenie',
    description: '24/7 intelligent customer service that handles inquiries, processes returns, and escalates complex issues.',
    category: 'Customer Support',
    icon: MessageCircle,
    price: 'Rs19/mo',
    rating: 4.8,
    reviews: 1156,
    isPopular: true,
    sampleOutput: 'Customer: "Are the ZX100 earbuds waterproof?" Bot: "Yes! They feature IPX7 rating for sweat and rain resistance."'
  }
]

interface FeaturedAgentsProps {
  onAgentSelect: (agent: Agent) => void
  onExploreAgents: () => void
}

export function FeaturedAgents({ onAgentSelect, onExploreAgents }: FeaturedAgentsProps) {
  return (
    <section className="py-20 sm:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Featured AI Agents
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover our most popular AI agents that are transforming businesses worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 px-20">
          {featuredAgents.map((agent) => {
            const IconComponent = agent.icon
            return (
              <Card 
                key={agent.id} 
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-border hover:border-primary/20 bg-card relative overflow-hidden "
                onClick={() => onAgentSelect(agent)}
              >
                {agent.isPopular && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0">
                      Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    {/* <Badge variant={agent.price === 'Free' ? 'secondary' : 'default'}>
                      {agent.price}
                    </Badge> */}
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {agent.name}
                  </CardTitle>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span>{agent.rating}</span>
                    </div>
                    <span>•</span>
                    <span>{agent.reviews} reviews</span>
                  </div>
                </CardHeader>
                
                <CardContent className="pb-4">
                  <CardDescription className="mb-4 line-clamp-3">
                    {agent.description}
                  </CardDescription>
                  
                  <Badge variant="outline" className="text-xs mb-3">
                    {agent.category}
                  </Badge>
                </CardContent>
                
                <CardFooter className="pt-0">
                  <Button 
                     className="w-full transition-colors group-hover:bg-gray-200 group-hover:text-black hover:bg-gray-200 hover:text-black !focus:ring-0 !focus:ring-transparent !focus-visible:outline-none !outline-none"
                    variant="outline"
                  >
                    <Zap className="h-4 w-4 mr-2 " />
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            variant="outline" 
            className="px-10 py-6 text-lg font-medium rounded-xl border-2 hover:bg-muted/50 transition-all duration-300 shadow-md hover:shadow-lg"
            onClick={onExploreAgents}
          >
            View All Agents
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}