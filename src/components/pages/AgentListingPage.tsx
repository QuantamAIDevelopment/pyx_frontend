'use client'

import { useState } from 'react'
import { Button } from '../common/ui/button'
import { Badge } from '../common/ui/badge'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../common/ui/card'
import { Input } from '../common/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../common/ui/select'

import {
  ShoppingCart,
  DollarSign,
  Package,
  Search,
  MessageCircle,
  Star,
  TrendingUp,
  Tag,
  Filter,
  SortAsc,
  Bot,
  Activity,
  Eye,
  BarChart3,
  Lock
} from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../common/ui/tooltip'

interface Agent {
  id: string
  name: string
  description: string
  category: string
  industry: string
  icon: React.ComponentType<any>
  price: string
  rating: number
  reviews: number
  isNew?: boolean
  isPremium?: boolean
  tags: string[]
  features?: string[]
  sampleOutput?: string
  integrations?: string[]
  isActive?: boolean
  setupTime?: string
  activeUsers?: number
  security?: string
}

const allAgents: Agent[] = [
  {
    id: '1',
    name: 'SmartSummarizer',
    description: 'AI-powered product descriptions that convert browsers into buyers with compelling, SEO-optimized content.',
    category: 'Content Generation',
    industry: 'E-commerce',
    icon: ShoppingCart,
    price: 'Free',
    rating: 4.8,
    reviews: 1247,
    isNew: false,
    tags: ['SEO', 'Content', 'Product Descriptions'],
    features: ['SEO Optimization', 'Multi-language Support', 'Bulk Processing', 'A/B Testing'],
    sampleOutput: 'Transform your ordinary product into an irresistible must-have with our premium wireless headphones. Featuring crystal-clear sound quality and 30-hour battery life, these headphones deliver an unmatched audio experience.',
    integrations: ['Shopify', 'WooCommerce', 'BigCommerce', 'Magento'],
    isActive: false,
    setupTime: '5 minutes',
    activeUsers: 1247,
    security: 'Enterprise'
  },
  {
    id: '2',
    name: 'PriceOptimizerAI',
    description: 'Smart pricing optimization that adjusts rates in real-time based on market conditions and competitor analysis.',
    category: 'Sales Optimization',
    industry: 'Retail',
    icon: DollarSign,
    price: '$29/mo',
    rating: 4.9,
    reviews: 892,
    isPremium: true,
    tags: ['Pricing', 'Dynamic', 'Competitive Analysis'],
    features: ['Real-time Pricing', 'Competitor Analysis', 'Demand Forecasting', 'ROI Tracking'],
    sampleOutput: 'Based on current market conditions, competitor pricing at $89.99, and your inventory levels, the optimal price for this product is $79.99 - projected to increase sales by 23% while maintaining healthy margins.',
    integrations: ['Shopify', 'Amazon', 'eBay', 'Walmart'],
    isActive: true,
    setupTime: '10 minutes',
    activeUsers: 892,
    security: 'Enterprise'
  },
  {
    id: '3',
    name: 'StockSense',
    description: 'Predictive inventory control that prevents stockouts and reduces overstock with intelligent demand forecasting.',
    category: 'Inventory Management',
    industry: 'E-commerce',
    icon: Package,
    price: '$39/mo',
    rating: 4.7,
    reviews: 654,
    tags: ['Inventory', 'Forecasting', 'Supply Chain'],
    features: ['Demand Forecasting', 'Auto-Reordering', 'Stock Alerts', 'Supplier Integration'],
    sampleOutput: 'Alert: Product SKU-12345 is projected to stock out in 4 days. Recommended reorder quantity: 150 units. Optimal reorder timing: Tomorrow to avoid stockouts during peak season.',
    integrations: ['Shopify', 'QuickBooks', 'SAP', 'Oracle'],
    isActive: false,
    setupTime: '15 minutes',
    activeUsers: 654,
    security: 'Enterprise'
  },
  {
    id: '4',
    name: 'VisionCartBot',
    description: 'Revolutionary image-based product discovery that lets customers find items using photos instead of keywords.',
    category: 'Customer Experience',
    industry: 'Fashion',
    icon: Search,
    price: '$49/mo',
    rating: 4.6,
    reviews: 423,
    isNew: true,
    tags: ['Visual Search', 'Image Recognition', 'Mobile'],
    features: ['Image Recognition', 'Visual Search', 'Mobile Optimization', 'Style Matching'],
    sampleOutput: 'Found 12 similar items based on your uploaded image. Top match: "Blue Denim Jacket" - 94% similarity. Also showing: similar styles, colors, and price ranges.',
    integrations: ['Shopify', 'Magento', 'Custom API', 'Mobile Apps'],
    isActive: false,
    setupTime: '8 minutes',
    activeUsers: 423,
    security: 'Standard'
  },
  {
    id: '5',
    name: 'SupportGenie',
    description: '24/7 intelligent customer service that handles inquiries, processes returns, and escalates complex issues.',
    category: 'Customer Support',
    industry: 'General',
    icon: MessageCircle,
    price: '$19/mo',
    rating: 4.8,
    reviews: 1156,
    tags: ['Chat', '24/7', 'Support Automation'],
    features: ['24/7 Support', 'Multi-language', 'Escalation Logic', 'Knowledge Base'],
    sampleOutput: 'Hi! I can help you with your order #12345. I see it was shipped yesterday and should arrive by Thursday. Would you like tracking information or help with anything else?',
    integrations: ['Zendesk', 'Intercom', 'Slack', 'Email'],
    isActive: true,
    setupTime: '3 minutes',
    activeUsers: 1156,
    security: 'Enterprise'
  },
  {
    id: '6',
    name: 'ReviewSentinel',
    description: 'Advanced sentiment analysis that monitors customer feedback and provides actionable insights.',
    category: 'Analytics',
    industry: 'E-commerce',
    icon: Star,
    price: '$24/mo',
    rating: 4.5,
    reviews: 338,
    tags: ['Sentiment Analysis', 'Reviews', 'Insights'],
    features: ['Sentiment Analysis', 'Review Monitoring', 'Alert System', 'Competitive Analysis'],
    sampleOutput: 'Weekly Sentiment Report: 78% positive reviews this week (+5% from last week). Key themes: "excellent quality" (+12%), "fast shipping" (+8%). Action needed: Address sizing issues mentioned in 3 reviews.',
    integrations: ['Google Reviews', 'Amazon', 'Yelp', 'Trustpilot'],
    isActive: false,
    setupTime: '5 minutes',
    activeUsers: 338,
    security: 'Standard'
  },
  {
    id: '7',
    name: 'SalesOracle',
    description: 'Predictive analytics that accurately forecasts sales trends, seasonal patterns, and revenue projections.',
    category: 'Sales Optimization',
    industry: 'Retail',
    icon: TrendingUp,
    price: '$59/mo',
    rating: 4.9,
    reviews: 267,
    isPremium: true,
    tags: ['Forecasting', 'Analytics', 'Revenue'],
    features: ['Sales Forecasting', 'Trend Analysis', 'Seasonal Planning', 'Revenue Optimization'],
    sampleOutput: 'Q4 Forecast: Projected 34% increase in sales during Black Friday week. Recommend increasing inventory for top 10 products by 45%. Expected revenue impact: +$125K based on historical data.',
    integrations: ['Salesforce', 'HubSpot', 'Google Analytics', 'Tableau'],
    isActive: true,
    setupTime: '20 minutes',
    activeUsers: 267,
    security: 'Enterprise'
  },
  {
    id: '8',
    name: 'TagMaster',
    description: 'Automated product categorization and tagging system that improves searchability and organization.',
    category: 'Content Generation',
    industry: 'E-commerce',
    icon: Tag,
    price: '$14/mo',
    rating: 4.4,
    reviews: 512,
    tags: ['Tagging', 'Categorization', 'Organization'],
    features: ['Auto-tagging', 'Category Detection', 'Bulk Processing', 'Custom Rules'],
    sampleOutput: 'Product successfully categorized: "Electronics > Audio > Headphones > Wireless". Generated tags: bluetooth, noise-canceling, premium, portable. SEO score: 92/100.',
    integrations: ['Shopify', 'WooCommerce', 'PrestaShop', 'Custom API'],
    isActive: false,
    setupTime: '7 minutes',
    activeUsers: 512,
    security: 'Standard'
  }
]

interface AgentListingPageProps {
  onAgentSelect: (agent: Agent) => void
  isLoggedIn: boolean
  onCreateWorkflow: () => void
  onViewActiveAgents: () => void
  onShowAuth: (mode: 'login' | 'signup') => void
}

export function AgentListingPage({ onAgentSelect, isLoggedIn, onCreateWorkflow, onViewActiveAgents, onShowAuth }: AgentListingPageProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all')
  const [priceFilter, setPriceFilter] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('rating')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const categories = ['all', ...new Set(allAgents.map(agent => agent.category))]
  const industries = ['all', ...new Set(allAgents.map(agent => agent.industry))]

  const activeAgentsCount = allAgents.filter(agent => agent.isActive).length

  const filteredAgents = allAgents
    .filter(agent => {
      const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesCategory = selectedCategory === 'all' || agent.category === selectedCategory
      const matchesIndustry = selectedIndustry === 'all' || agent.industry === selectedIndustry
      const matchesPrice = priceFilter === 'all' ||
        (priceFilter === 'free' && agent.price === 'Free') ||
        (priceFilter === 'premium' && agent.price !== 'Free')

      return matchesSearch && matchesCategory && matchesIndustry && matchesPrice
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating
        case 'reviews':
          return b.reviews - a.reviews
        case 'name':
          return a.name.localeCompare(b.name)
        case 'newest':
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)
        default:
          return 0
      }
    })

  return (
    <div className="min-h-screen">
      <div className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 px-4">
              AI Agent Marketplace
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
              Discover and deploy specialized AI agents to automate your business workflows.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 px-4 max-w-4xl mx-auto">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="w-full sm:w-auto relative">
                      <Button
                        onClick={isLoggedIn ? onViewActiveAgents : () => onShowAuth('login')}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 w-full sm:w-auto min-w-0 border-none"
                        size="default"
                      >
                        <Activity className="h-4 w-4 mr-2 flex-shrink-0 " />
                        <span className="truncate">
                          <span className="hidden sm:inline">Active Agents</span>
                          <span className="sm:hidden">Active</span> ({activeAgentsCount})
                        </span>
                        {!isLoggedIn && <Lock className="h-3 w-3 ml-2 opacity-60" />}
                      </Button>
                    </div>
                  </TooltipTrigger>
                  {!isLoggedIn && (
                    <TooltipContent>
                      <p>Log in to view your active agents</p>
                    </TooltipContent>
                  )}
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="w-full sm:w-auto relative">
                      <Button
                        variant="outline"
                        onClick={isLoggedIn ? onCreateWorkflow : () => onShowAuth('login')}
                        className="w-full sm:w-auto min-w-0"
                        disabled={!isLoggedIn}
                      >
                        <Bot className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span className="truncate">
                          <span className="hidden sm:inline">Create Custom Agent</span>
                          <span className="sm:hidden">Create Agent</span>
                        </span>
                        {!isLoggedIn && <Lock className="h-3 w-3 ml-2 opacity-60" />}
                      </Button>
                    </div>
                  </TooltipTrigger>
                  {!isLoggedIn && (
                    <TooltipContent>
                      <p>Log in to create custom agents</p>
                    </TooltipContent>
                  )}
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="w-full sm:w-auto relative">
                      <Button
                        variant="outline"
                        className="w-full sm:w-auto min-w-0"
                        disabled={!isLoggedIn}
                        onClick={isLoggedIn ? () => { } : () => onShowAuth('login')}
                      >
                        <BarChart3 className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span className="truncate">
                          <span className="hidden sm:inline">Analytics Dashboard</span>
                          <span className="sm:hidden">Analytics</span>
                        </span>
                        {!isLoggedIn && <Lock className="h-3 w-3 ml-2 opacity-60" />}
                      </Button>
                    </div>
                  </TooltipTrigger>
                  {!isLoggedIn && (
                    <TooltipContent>
                      <p>Log in to access analytics dashboard</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          {/* Filters */}
          <div className='px-20'>
            <div className="bg-card rounded-lg p-4 sm:p-6 mb-6 sm:mb-8 border border-border">
              <div className="space-y-4 ">
                {/* Search - Full width on all screens */}
                <div className="w-full ">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search agents..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-full"
                    />
                  </div>
                </div>

                {/* Filter Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 ">
                  {/* Category Filter */}
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full bg-gray-100">
                      <Filter className="h-4 w-4 mr-2 flex-shrink-0 " />
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

                  {/* Industry Filter */}
                  <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                    <SelectTrigger className="w-full bg-gray-100">
                      <SelectValue placeholder="Industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map(industry => (
                        <SelectItem key={industry} value={industry}>
                          {industry === 'all' ? 'All Industries' : industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Price Filter */}
                  <Select value={priceFilter} onValueChange={setPriceFilter}>
                    <SelectTrigger className="w-full bg-gray-100">
                      <SelectValue placeholder="Price" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Prices</SelectItem>
                      <SelectItem value="free">Free</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Sort */}
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full bg-gray-100">
                      <SortAsc className="h-4 w-4 mr-2 flex-shrink-0" />
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="reviews">Most Reviews</SelectItem>
                      <SelectItem value="name">Name A-Z</SelectItem>
                      <SelectItem value="newest">Newest First</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
          {/* Results count */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3 px-20">
            <p className="text-sm sm:text-base text-muted-foreground px-1">
              Showing {filteredAgents.length} of {allAgents.length} agents
            </p>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground hidden sm:inline">View:</span>

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

          {/* Agent Grid/List */}
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 !px-20' : 'space-y-4'}>
            {filteredAgents.map((agent) => {
              const IconComponent = agent.icon

              if (viewMode === 'list') {
                
                return (
                  <div className="px-20">
                  <Card
                    key={agent.id}
                    className="group hover:shadow-lg transition-all duration-300 cursor-pointer "
                    onClick={() => onAgentSelect(agent)}
                  >
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4">
                        <div className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex-shrink-0 mx-auto sm:mx-0">
                          <IconComponent className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                        </div>

                        <div className="flex-1 min-w-0 w-full">
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-2 space-y-2 sm:space-y-0">
                            <div className="text-center sm:text-left">
                              <h3 className="font-semibold text-base sm:text-lg mb-1">{agent.name}</h3>
                              <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 text-sm text-muted-foreground mb-2">
                                <div className="flex items-center">
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                                  <span>{agent.rating}</span>
                                </div>
                                <span className="hidden sm:inline">•</span>
                                <span>{agent.reviews} reviews</span>
                                <Badge variant={agent.price === 'Free' ? 'secondary' : 'default'} className="text-xs">
                                  {agent.price}
                                </Badge>
                                {agent.isActive && (
                                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs">
                                    Active
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center justify-center sm:justify-start space-x-2">
                              {agent.isNew && (
                                <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0 text-xs">
                                  New
                                </Badge>
                              )}
                              {agent.isPremium && (
                                <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 text-xs">
                                  Premium
                                </Badge>
                              )}
                            </div>
                          </div>

                          <p className="text-muted-foreground mb-4 line-clamp-2 text-sm sm:text-base text-center sm:text-left">{agent.description}</p>

                          <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
                            <div className="flex flex-wrap justify-center sm:justify-start gap-1">
                              {agent.tags.slice(0, 3).map((tag, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>

                            {/* Explore Button */}
                            <Button
                              variant="default"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                onAgentSelect(agent)
                              }}
                              className="text-xs px-4 py-2 !bg-black border-none"
                            >
                              <Eye className="h-3 w-3 mr-1 " />
                              Explore Agent
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  </div>
                )
              }

              return (
                <Card
                  key={agent.id}
                  className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-border hover:border-primary/20 bg-card relative h-full flex flex-col "
                  onClick={() => onAgentSelect(agent)}
                >
                  {/* Status Badges */}
                  <div className="absolute top-2 right-2 flex flex-col gap-1 z-10 max-w-[100px]">
                    {agent.isActive && (
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs text-center">
                        Active
                      </Badge>
                    )}
                    {agent.isNew && (
                      <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0 text-xs text-center">
                        New
                      </Badge>
                    )}
                    {agent.isPremium && (
                      <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 text-xs text-center">
                        Premium
                      </Badge>
                    )}
                  </div>

                  <CardHeader className="pb-3 sm:pb-4 flex-shrink-0 pt-12 sm:pt-4">
                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                      <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                      </div>
                      <Badge variant={agent.price === 'Free' ? 'secondary' : 'default'} className="text-xs sm:text-sm">
                        {agent.price}
                      </Badge>
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors text-base sm:text-lg line-clamp-2">
                      {agent.name}
                    </CardTitle>
                    <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span>{agent.rating}</span>
                      </div>
                      <span className="hidden sm:inline">•</span>
                      <span className="text-xs">{agent.reviews} reviews</span>
                    </div>
                  </CardHeader>

                  <CardContent className="pb-3 sm:pb-4 flex-grow">
                    <CardDescription className="mb-3 sm:mb-4 line-clamp-3 text-sm">
                      {agent.description}
                    </CardDescription>

                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-1">
                        {agent.tags.slice(0, 2).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {agent.tags.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{agent.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {agent.category} • {agent.industry}
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="pt-2 pb-4 flex-shrink-0 ">
                    <Button
                      className="w-full text-sm py-2  !bg-black border-none"
                      onClick={(e) => {
                        e.stopPropagation()
                        onAgentSelect(agent)
                      }}
                      size="sm"
                    >
                      <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                      <span className="hidden sm:inline ">Explore Agent</span>
                      <span className="sm:hidden">Explore</span>
                    </Button>
                  </CardFooter>
                </Card>
              )
            })}
          </div>

          {/* Empty state */}
          {filteredAgents.length === 0 && (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No agents found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search terms or filters
              </p>
              <Button onClick={() => {
                setSearchTerm('')
                setSelectedCategory('all')
                setSelectedIndustry('all')
                setPriceFilter('all')
              }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}