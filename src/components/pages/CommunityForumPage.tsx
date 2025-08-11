'use client'

import { useState } from 'react'
import { Button } from '../common/ui/button'
import { Card, CardContent,  CardHeader, CardTitle } from '../common/ui/card'
import { Badge } from '../common/ui/badge'
import { Input } from '../common/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '../common/ui/avatar'
import { 
  MessageSquare,
  Search,
  Users,
  Eye,
  MessageCircle,
  ThumbsUp,
  Clock,
  Star,
  Trophy,
  TrendingUp,
  HelpCircle,
  Lightbulb,
  Code,
  Bug,
  Pin,
  ArrowRight,
  Plus,
  Filter,
  BookOpen,
  Crown,
  CheckCircle,
  Calendar,
  MapPin,
} from 'lucide-react'

interface CommunityForumPageProps {
  onViewChange: (view: string) => void
  isLoggedIn: boolean
  onShowAuth: (mode: 'login' | 'signup') => void
}

export function CommunityForumPage({ onViewChange, isLoggedIn, onShowAuth }: CommunityForumPageProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'All Posts', icon: MessageSquare, count: 1247, color: 'bg-blue-500' },
    { id: 'general', name: 'General', icon: MessageCircle, count: 324, color: 'bg-green-500' },
    { id: 'help', name: 'Help & Support', icon: HelpCircle, count: 189, color: 'bg-orange-500' },
    { id: 'showcase', name: 'Showcase', icon: Star, count: 156, color: 'bg-purple-500' },
    { id: 'ideas', name: 'Ideas & Feedback', icon: Lightbulb, count: 98, color: 'bg-yellow-500' },
    { id: 'development', name: 'Development', icon: Code, count: 203, color: 'bg-indigo-500' },
    { id: 'bugs', name: 'Bug Reports', icon: Bug, count: 67, color: 'bg-red-500' }
  ]

  const forumPosts = [
    {
      id: '1',
      title: 'How to implement custom authentication with PYX agents?',
      category: 'help',
      author: {
        name: 'Sarah Chen',
        avatar: '/api/placeholder/32/32',
        reputation: 1250,
        badge: 'Expert'
      },
      content: 'I\'m trying to implement custom authentication for my PYX agents but running into issues with the OAuth flow. Has anyone successfully integrated custom auth providers?',
      replies: 12,
      views: 234,
      likes: 8,
      isPinned: false,
      isResolved: true,
      tags: ['authentication', 'oauth', 'custom'],
      createdAt: '2 hours ago',
      lastActivity: '1 hour ago'
    },
    {
      id: '2',
      title: 'Showcase: E-commerce automation that increased sales by 40%',
      category: 'showcase',
      author: {
        name: 'Marcus Rodriguez',
        avatar: '/api/placeholder/32/32',
        reputation: 2100,
        badge: 'Pro'
      },
      content: 'Just wanted to share our success story with PYX. We built an automated customer support system that handles 80% of inquiries and increased our conversion rate by 40%.',
      replies: 28,
      views: 1542,
      likes: 45,
      isPinned: true,
      isResolved: false,
      tags: ['e-commerce', 'automation', 'success-story'],
      createdAt: '1 day ago',
      lastActivity: '3 hours ago'
    },
    {
      id: '3',
      title: 'Feature Request: Batch processing for large datasets',
      category: 'ideas',
      author: {
        name: 'Alex Kumar',
        avatar: '/api/placeholder/32/32',
        reputation: 890,
        badge: 'Member'
      },
      content: 'It would be great to have native batch processing capabilities for handling large datasets. Currently, I have to split my data manually which is time-consuming.',
      replies: 15,
      views: 456,
      likes: 23,
      isPinned: false,
      isResolved: false,
      tags: ['feature-request', 'batch-processing', 'datasets'],
      createdAt: '3 days ago',
      lastActivity: '2 days ago'
    },
    {
      id: '4',
      title: 'Best practices for error handling in workflows',
      category: 'development',
      author: {
        name: 'Emma Thompson',
        avatar: '/api/placeholder/32/32',
        reputation: 1680,
        badge: 'Expert'
      },
      content: 'What are the recommended patterns for handling errors in complex workflows? I want to ensure my automations are robust and can recover from failures gracefully.',
      replies: 19,
      views: 678,
      likes: 31,
      isPinned: false,
      isResolved: true,
      tags: ['error-handling', 'workflows', 'best-practices'],
      createdAt: '1 week ago',
      lastActivity: '4 days ago'
    },
    {
      id: '5',
      title: 'Bug: Webhook integration not firing consistently',
      category: 'bugs',
      author: {
        name: 'David Park',
        avatar: '/api/placeholder/32/32',
        reputation: 420,
        badge: 'Member'
      },
      content: 'I\'ve set up webhook integrations with Shopify, but they only fire about 70% of the time. The logs show no errors. Anyone else experiencing this?',
      replies: 8,
      views: 189,
      likes: 5,
      isPinned: false,
      isResolved: false,
      tags: ['bug', 'webhooks', 'shopify'],
      createdAt: '2 days ago',
      lastActivity: '6 hours ago'
    }
  ]

  const topContributors = [
    {
      name: 'Sarah Chen',
      avatar: '/api/placeholder/40/40',
      reputation: 2450,
      badge: 'Expert',
      posts: 89,
      helpfulAnswers: 156
    },
    {
      name: 'Marcus Rodriguez',
      avatar: '/api/placeholder/40/40',
      reputation: 2100,
      badge: 'Pro',
      posts: 67,
      helpfulAnswers: 134
    },
    {
      name: 'Emma Thompson',
      avatar: '/api/placeholder/40/40',
      reputation: 1680,
      badge: 'Expert',
      posts: 45,
      helpfulAnswers: 98
    },
    {
      name: 'Alex Kumar',
      avatar: '/api/placeholder/40/40',
      reputation: 890,
      badge: 'Member',
      posts: 23,
      helpfulAnswers: 45
    }
  ]

  const recentEvents = [
    {
      title: 'Developer Meetup - San Francisco',
      date: 'Jan 15, 2024',
      time: '6:00 PM PST',
      location: 'San Francisco, CA',
      type: 'In-person',
      attendees: 45
    },
    {
      title: 'Virtual Workshop: Advanced Workflows',
      date: 'Jan 20, 2024',
      time: '2:00 PM EST',
      location: 'Online',
      type: 'Virtual',
      attendees: 234
    },
    {
      title: 'Community AMA with PYX Team',
      date: 'Jan 25, 2024',
      time: '11:00 AM PST',
      location: 'Discord',
      type: 'AMA',
      attendees: 156
    }
  ]

  const filteredPosts = forumPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleGetStarted = () => {
    if (isLoggedIn) {
      onViewChange('dashboard')
    } else {
      onShowAuth('signup')
    }
  }

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Expert': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
      case 'Pro': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'Member': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId)
    return category?.color || 'bg-gray-500'
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-[#FFE8DC] via-[#FFD4BD] to-[#FCD2BD]

 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-pink-950/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-gradient-to-r from-[#FF620A] to-[#993B06] text-white">
              <Users className="h-3 w-3 mr-1" />
              Community Forum
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Connect with the{' '}
              <span className="bg-gradient-to-r from-[#FF620A] to-[#993B06] bg-clip-text text-transparent">
                PYX Community
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Join thousands of developers sharing knowledge, solving problems, and building 
              amazing AI-powered applications together.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="Search discussions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 text-base md:text-lg border-2 w-full"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-lg mx-auto">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-[#FF620A] to-[#993B06] w-full sm:w-auto"
                onClick={handleGetStarted}
              >
                <Plus className="h-4 w-4 mr-2" />
                New Discussion
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="w-full sm:w-auto"
                onClick={() => onViewChange('documentation')}
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Documentation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-[#FF620A] to-[#993B06] mx-auto mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl md:text-3xl font-bold mb-2">12.5K</div>
              <div className="font-medium text-foreground mb-1 text-sm md:text-base">Members</div>
              <div className="text-xs md:text-sm text-muted-foreground">Active developers</div>
            </div>
            <div className="text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-blue-600 mx-auto mb-4">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl md:text-3xl font-bold mb-2">1.2K</div>
              <div className="font-medium text-foreground mb-1 text-sm md:text-base">Discussions</div>
              <div className="text-xs md:text-sm text-muted-foreground">This month</div>
            </div>
            <div className="text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 mx-auto mb-4">
                <HelpCircle className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl md:text-3xl font-bold mb-2">95%</div>
              <div className="font-medium text-foreground mb-1 text-sm md:text-base">Resolved</div>
              <div className="text-xs md:text-sm text-muted-foreground">Help requests</div>
            </div>
            <div className="text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-red-600 mx-auto mb-4">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl md:text-3xl font-bold mb-2">2.5h</div>
              <div className="font-medium text-foreground mb-1 text-sm md:text-base">Avg Response</div>
              <div className="text-xs md:text-sm text-muted-foreground">Time to help</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Categories */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {categories.map((category) => {
                      const IconComponent = category.icon
                      return (
                        <Button
                          key={category.id}
                          variant={selectedCategory === category.id ? "default" : "ghost"}
                          className="w-full justify-start"
                          onClick={() => setSelectedCategory(category.id)}
                        >
                          <div className={`h-3 w-3 rounded-full ${category.color} mr-2`} />
                          <IconComponent className="h-4 w-4 mr-2" />
                          <span className="flex-1 text-left">{category.name}</span>
                          <Badge variant="secondary" className="text-xs">
                            {category.count}
                          </Badge>
                        </Button>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Top Contributors */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Trophy className="h-5 w-5" />
                    Top Contributors
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {topContributors.map((contributor, index) => (
                      <div key={contributor.name} className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={contributor.avatar} alt={contributor.name} />
                            <AvatarFallback>{contributor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          {index < 3 && (
                            <div className="absolute -top-1 -right-1 h-4 w-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                              <Crown className="h-2 w-2 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm truncate">{contributor.name}</span>
                            <Badge className={`text-xs ${getBadgeColor(contributor.badge)}`}>
                              {contributor.badge}
                            </Badge>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {contributor.reputation} rep
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Events */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Upcoming Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentEvents.map((event, index) => (
                      <div key={index} className="border-l-2 border-primary pl-3">
                        <div className="font-medium text-sm">{event.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {event.date} • {event.time}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                          <MapPin className="h-3 w-3" />
                          <span>{event.location}</span>
                          <Badge variant="outline" className="text-xs">
                            {event.attendees} going
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Filter Bar */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {filteredPosts.length} discussions found
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    Trending
                  </Button>
                  <Button variant="outline" size="sm">
                    <Clock className="h-4 w-4 mr-1" />
                    Recent
                  </Button>
                </div>
              </div>

              {/* Forum Posts */}
              <div className="space-y-4">
                {filteredPosts.map((post) => (
                  <Card key={post.id} className="hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-10 w-10 flex-shrink-0">
                          <AvatarImage src={post.author.avatar} alt={post.author.name} />
                          <AvatarFallback>{post.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                {post.isPinned && (
                                  <Pin className="h-4 w-4 text-primary" />
                                )}
                                <h3 className="font-semibold text-lg hover:text-primary transition-colors cursor-pointer">
                                  {post.title}
                                </h3>
                                {post.isResolved && (
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                )}
                              </div>
                              
                              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                <span className="font-medium">{post.author.name}</span>
                                <Badge className={`text-xs ${getBadgeColor(post.author.badge)}`}>
                                  {post.author.badge}
                                </Badge>
                                <span>•</span>
                                <span>{post.createdAt}</span>
                                <span>•</span>
                                <div className={`h-2 w-2 rounded-full ${getCategoryColor(post.category)}`} />
                                <span className="capitalize">{post.category}</span>
                              </div>
                              
                              <p className="text-muted-foreground mb-3 line-clamp-2">
                                {post.content}
                              </p>
                              
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <MessageCircle className="h-4 w-4" />
                                  <span>{post.replies}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Eye className="h-4 w-4" />
                                  <span>{post.views}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <ThumbsUp className="h-4 w-4" />
                                  <span>{post.likes}</span>
                                </div>
                                <span>Last activity: {post.lastActivity}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 mt-3">
                            {post.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredPosts.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">💬</div>
                  <h3 className="text-xl font-semibold mb-2">No discussions found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your search or browse a different category.
                  </p>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setSearchTerm('')
                      setSelectedCategory('all')
                    }}
                  >
                    Clear filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#FF620A] to-[#993B06]
 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Join Our Growing Community
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Connect with developers, share your knowledge, and get help building amazing AI applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-lg mx-auto">
              <Button 
                size="lg" 
                variant="secondary"
                className="w-full sm:w-auto"
                onClick={handleGetStarted}
              >
                <Users className="h-4 w-4 mr-2" />
                Join Community
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-primary w-full sm:w-auto"
                onClick={() => onViewChange('documentation')}
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Read Docs
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}