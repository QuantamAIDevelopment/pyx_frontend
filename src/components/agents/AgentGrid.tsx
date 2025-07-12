'use client'

import { useState } from 'react'
import { Button } from '../common/ui/button'
import { Badge } from '../common/ui/badge'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../common/ui/card'
import { Tabs, TabsList, TabsTrigger } from '../common/ui/tabs'
import { 
  ShoppingCart, 
  DollarSign, 
  Package, 
  Search, 
  MessageCircle, 
  Star, 
  TrendingUp, 
  Tag,
  Zap,
  // Clock,
  // CheckCircle
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

const agents: Agent[] = [
  {
    id: '1',
    name: 'Product Summarization',
    description: 'AI-powered product descriptions that convert browsers into buyers with compelling, SEO-optimized content.',
    category: 'Content',
    icon: ShoppingCart,
    price: 'Free',
    rating: 4.8,
    reviews: 1247,
    isActive: false,
    features: ['SEO Optimization', 'Multi-language Support', 'Bulk Processing'],
    sampleOutput: 'These sleek Wireless Earbuds ZX100 deliver crystal-clear 8 hours of noise-canceling audio with premium comfort design.',
    integrations: ['Shopify', 'WooCommerce', 'Magento']
  },
  {
    id: '2',
    name: 'Dynamic Pricing',
    description: 'Smart pricing optimization that adjusts rates in real-time based on market conditions, demand, and competitor analysis.',
    category: 'Sales Boost',
    icon: DollarSign,
    price: '$29/mo',
    rating: 4.9,
    reviews: 892,
    isActive: false,
    features: ['Real-time Monitoring', 'Competitor Analysis', 'Profit Optimization'],
    sampleOutput: 'Wireless Earbuds ZX100: $89.99 → $79.99 (12% demand increase predicted)',
    integrations: ['Shopify', 'Amazon', 'eBay']
  },
  {
    id: '3',
    name: 'Inventory Management',
    description: 'Predictive inventory control that prevents stockouts and reduces overstock with intelligent demand forecasting.',
    category: 'Inventory Optimization',
    icon: Package,
    price: '$39/mo',
    rating: 4.7,
    reviews: 654,
    isActive: false,
    features: ['Demand Forecasting', 'Auto-reordering', 'Stock Alerts'],
    sampleOutput: 'Wireless Earbuds ZX100: Reorder 150 units by Dec 15 (predicted stockout Dec 22)',
    integrations: ['SAP', 'NetSuite', 'QuickBooks']
  },
  {
    id: '4',
    name: 'Visual Search',
    description: 'Revolutionary image-based product discovery that lets customers find items using photos instead of keywords.',
    category: 'Customer Experience',
    icon: Search,
    price: '$49/mo',
    rating: 4.6,
    reviews: 423,
    isActive: false,
    features: ['Image Recognition', 'Similar Product Matching', 'Mobile Optimized'],
    sampleOutput: 'Found 12 similar products to uploaded image: Wireless Earbuds ZX100 (94% match)',
    integrations: ['React Native', 'iOS SDK', 'Android SDK']
  },
  {
    id: '5',
    name: 'Customer Support Chatbot',
    description: '24/7 intelligent customer service that handles inquiries, processes returns, and escalates complex issues seamlessly.',
    category: 'Customer Support',
    icon: MessageCircle,
    price: '$19/mo',
    rating: 4.8,
    reviews: 1156,
    isActive: false,
    features: ['24/7 Availability', 'Multi-language', 'Human Handoff'],
    sampleOutput: 'Customer: "Are the ZX100 earbuds waterproof?" Bot: "Yes! They feature IPX7 rating for sweat and rain resistance."',
    integrations: ['Zendesk', 'Intercom', 'Freshdesk']
  },
  {
    id: '6',
    name: 'Review Sentiment Analysis',
    description: 'Advanced sentiment analysis that monitors customer feedback and provides actionable insights for product improvement.',
    category: 'Analytics',
    icon: Star,
    price: '$24/mo',
    rating: 4.5,
    reviews: 338,
    isActive: false,
    features: ['Sentiment Scoring', 'Trend Analysis', 'Alert System'],
    sampleOutput: 'Wireless Earbuds ZX100: 87% positive sentiment (↑5% this month). Key praise: "amazing sound quality"',
    integrations: ['Google Reviews', 'Amazon Reviews', 'Trustpilot']
  },
  {
    id: '7',
    name: 'Sales Forecasting',
    description: 'Predictive analytics that accurately forecasts sales trends, seasonal patterns, and revenue projections.',
    category: 'Sales Boost',
    icon: TrendingUp,
    price: '$59/mo',
    rating: 4.9,
    reviews: 267,
    isActive: false,
    features: ['Trend Prediction', 'Seasonal Analysis', 'Revenue Modeling'],
    sampleOutput: 'Wireless Earbuds ZX100: Projected 340 units sold next month (+23% vs. current month)',
    integrations: ['Google Analytics', 'Salesforce', 'HubSpot']
  },
  {
    id: '8',
    name: 'Product Tagging',
    description: 'Automated product categorization and tagging system that improves searchability and organization.',
    category: 'Content',
    icon: Tag,
    price: '$14/mo',
    rating: 4.4,
    reviews: 512,
    isActive: false,
    features: ['Auto-categorization', 'Custom Tags', 'Bulk Processing'],
    sampleOutput: 'Wireless Earbuds ZX100: Tags added - "bluetooth", "noise-canceling", "sports", "premium-audio"',
    integrations: ['Shopify', 'WooCommerce', 'BigCommerce']
  }
]

const categories = [
  { id: 'all', name: 'All Agents', count: agents.length },
  { id: 'Customer Support', name: 'Customer Support', count: agents.filter(a => a.category === 'Customer Support').length },
  { id: 'Sales Boost', name: 'Sales Boost', count: agents.filter(a => a.category === 'Sales Boost').length },
  { id: 'Inventory Optimization', name: 'Inventory Optimization', count: agents.filter(a => a.category === 'Inventory Optimization').length },
  { id: 'Content', name: 'Content', count: agents.filter(a => a.category === 'Content').length },
  { id: 'Analytics', name: 'Analytics', count: agents.filter(a => a.category === 'Analytics').length },
  { id: 'Customer Experience', name: 'Customer Experience', count: agents.filter(a => a.category === 'Customer Experience').length }
]

interface AgentGridProps {
  onAgentSelect: (agent: Agent) => void
}

export function AgentGrid({ onAgentSelect }: AgentGridProps) {
  const [activeCategory, setActiveCategory] = useState('all')
  
  const filteredAgents = activeCategory === 'all' 
    ? agents 
    : agents.filter(agent => agent.category === activeCategory)

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            AI Agents for Every Workflow
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from our collection of specialized AI agents designed to automate and optimize your ecommerce operations.
          </p>
        </div>

        {/* Category Filters */}
        <div className="mb-8">
          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
            <div className="overflow-x-auto">
              <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7 min-w-fit">
                {categories.map((category) => (
                  <TabsTrigger 
                    key={category.id} 
                    value={category.id}
                    className="whitespace-nowrap"
                  >
                    {category.name}
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {category.count}
                    </Badge>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
          </Tabs>
        </div>

        {/* Agent Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAgents.map((agent) => {
            const IconComponent = agent.icon
            return (
              <Card 
                key={agent.id} 
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-border hover:border-primary/20 bg-card"
                onClick={() => onAgentSelect(agent)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <Badge variant={agent.price === 'Free' ? 'secondary' : 'default'}>
                      {agent.price}
                    </Badge>
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
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {agent.features.slice(0, 2).map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                    {agent.features.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{agent.features.length - 2} more
                      </Badge>
                    )}
                  </div>
                </CardContent>
                
                <CardFooter className="pt-0">
                  <Button 
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    variant="outline"
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    View Agent
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}