'use client'

import { useState, useEffect } from 'react'
import { Button } from '../common/ui/button'
// import { Badge } from '../common/ui/badge'
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../common/ui/card'
import { Input } from '../common/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../common/ui/select'

import {
  // ShoppingCart,
  // DollarSign,
  // Package,
  Search,
  // MessageCircle,
  // Star,
  // TrendingUp,
  // Tag,
  Filter,
  SortAsc,
  Bot,
  Activity,
  // Eye,
  BarChart3,
  Lock
} from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../common/ui/tooltip'
import { AgentCard } from '../agents/AgentCard'
import { fetchAgentsPaginated } from '../apiservices/api';

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
  howitWorks?: { id: number; title: string; description: string }[]
}

interface AgentListingPageProps {
  onAgentSelect: (agent: Agent) => void
  isLoggedIn: boolean
  onCreateWorkflow: () => void
  onViewActiveAgents: () => void
  onShowAuth: (mode: 'login' | 'signup') => void
}

export function AgentListingPage({ onAgentSelect, isLoggedIn, onCreateWorkflow, onViewActiveAgents, onShowAuth }: AgentListingPageProps) {
  const [agents, setAgents] = useState<Agent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all')
  const [priceFilter, setPriceFilter] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('rating')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  useEffect(() => {
    setLoading(true);
    fetchAgentsPaginated({ page: 0, size: 60 })
      .then(data => {
        // Map API agent structure to frontend Agent type
        setAgents(
          (data.content || []).map((agent: any) => ({
            ...agent,
            tags: agent.tags ? agent.tags.map((t: any) => t.value) : [],
            features: agent.features ? agent.features.map((f: any) => f.value) : [],
            integrations: agent.integrations ? agent.integrations.map((i: any) => i.value) : [],
            isActive: agent.active,
            isNew: agent.new,
            isPremium: agent.premium,
          }))
        );
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const categories = ['all', ...new Set(agents.map(agent => agent.category))]
  const industries = ['all', ...new Set(agents.map(agent => agent.industry))]
  const activeAgentsCount = agents.filter(agent => agent.isActive).length

  const filteredAgents = agents
    .filter(agent => {
      const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (agent.tags && agent.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
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

  if (loading) return <div className="text-center py-10">Loading agents...</div>
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>

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
    <Filter className="h-4 w-4 mr-2 flex-shrink-0" />
    <SelectValue placeholder="Category" />
  </SelectTrigger>

  <SelectContent 
    className="max-h-[300px] overflow-y-auto z-50 mt-1 border border-gray-200 rounded-md shadow-lg bg-white"
    side="bottom" // ensure dropdown opens downward
    align="start" // aligns it to left instead of going behind anything
  >
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
              Showing {filteredAgents.length} of {agents.length} agents
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
              if (viewMode === 'list') {
                return (
                  <div className="px-20" key={agent.id}>
                    <AgentCard agent={agent} onClick={() => onAgentSelect(agent)} />
                  </div>
                )
              }
              return (
                <AgentCard key={agent.id} agent={agent} onClick={() => onAgentSelect(agent)} />
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