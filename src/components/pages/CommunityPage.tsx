'use client'

import { useState } from 'react'
import { Button } from '../common/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../common/ui/card'
import { Badge } from '../common/ui/badge'
import { Input } from '../common/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../common/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '../common/ui/avatar'
// import { Separator } from '../common/ui/separator'
import { 
  Users,
  MessageCircle,
  Calendar,
  Star,
  ArrowRight,
  Trophy,
  // Heart,
  Share2,
  Bookmark,
  // MapPin,
  Clock,
  User,
  Zap,
  Code,
  // Rocket,
  Lightbulb, 
  ExternalLink,
  MessageSquare,
  ThumbsUp,
  Eye,
  Search,
  Filter,
  Plus,
  UserPlus,
  BookOpen,
  Sparkles
} from 'lucide-react'

interface CommunityPageProps {
  onViewChange: (view: string) => void
  isLoggedIn: boolean
  onShowAuth: (mode: 'login' | 'signup') => void
}

export function CommunityPage({ onViewChange, isLoggedIn, onShowAuth }: CommunityPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('discussions')
  const [searchTerm, setSearchTerm] = useState('')

  const communityStats = [
    { label: 'Active Members', value: '12,847', icon: Users, trend: '+23%' },
    { label: 'Monthly Posts', value: '2,156', icon: MessageCircle, trend: '+18%' },
    { label: 'AI Agents Shared', value: '1,394', icon: Zap, trend: '+41%' },
    { label: 'Success Stories', value: '289', icon: Trophy, trend: '+12%' }
  ]

  const featuredDiscussions = [
    {
      id: '1',
      title: 'Best practices for e-commerce automation workflows',
      author: 'Sarah Chen',
      avatar: '/api/placeholder/40/40',
      role: 'AI Strategist',
      category: 'Workflows',
      replies: 47,
      likes: 156,
      views: '2.3K',
      timeAgo: '2 hours ago',
      tags: ['ecommerce', 'automation', 'best-practices'],
      excerpt: 'After implementing QAID for 6 months, here are the key strategies that increased our conversion rate by 340%...'
    },
    {
      id: '2',
      title: 'Custom AI agent for customer sentiment analysis',
      author: 'Marcus Rodriguez',
      avatar: '/api/placeholder/40/40',
      role: 'Senior Developer',
      category: 'Development',
      replies: 32,
      likes: 89,
      views: '1.8K',
      timeAgo: '4 hours ago',
      tags: ['sentiment-analysis', 'custom-agent', 'nlp'],
      excerpt: 'Built a custom sentiment analysis agent that processes 10K+ customer reviews daily. Open sourcing the code...'
    },
    {
      id: '3',
      title: 'Scaling QAID for enterprise: Lessons learned',
      author: 'Emily Watson',
      avatar: '/api/placeholder/40/40',
      role: 'Enterprise Architect',
      category: 'Enterprise',
      replies: 73,
      likes: 234,
      views: '4.1K',
      timeAgo: '1 day ago',
      tags: ['enterprise', 'scaling', 'architecture'],
      excerpt: 'How we successfully deployed QAID across 50+ departments and 5,000+ users. Key challenges and solutions...'
    }
  ]

  const showcaseProjects = [
    {
      id: '1',
      title: 'AI-Powered Social Media Manager',
      description: 'Automated content creation and scheduling for 50+ social media accounts',
      author: 'Alex Thompson',
      avatar: '/api/placeholder/40/40',
      image: '/api/placeholder/300/200',
      tags: ['social-media', 'automation', 'content-creation'],
      stars: 342,
      downloads: '12.5K',
      category: 'Marketing'
    },
    {
      id: '2',
      title: 'Inventory Optimization Agent',
      description: 'Predictive inventory management that reduced stockouts by 85%',
      author: 'Maria Garcia',
      avatar: '/api/placeholder/40/40',
      image: '/api/placeholder/300/200',
      tags: ['inventory', 'prediction', 'optimization'],
      stars: 278,
      downloads: '8.7K',
      category: 'Operations'
    },
    {
      id: '3',
      title: 'Customer Support Chatbot',
      description: 'AI chatbot that handles 90% of customer inquiries automatically',
      author: 'David Kim',
      avatar: '/api/placeholder/40/40',
      image: '/api/placeholder/300/200',
      tags: ['chatbot', 'customer-support', 'nlp'],
      stars: 456,
      downloads: '18.3K',
      category: 'Support'
    }
  ]

  const upcomingEvents = [
    {
      id: '1',
      title: 'QAID Developer Workshop: Advanced Workflows',
      date: '2024-07-15',
      time: '10:00 AM PST',
      type: 'Workshop',
      attendees: 245,
      maxAttendees: 500,
      speaker: 'Dr. Jennifer Liu',
      speakerTitle: 'AI Research Director',
      description: 'Deep dive into creating complex multi-agent workflows with advanced debugging techniques.',
      tags: ['workshop', 'workflows', 'development']
    },
    {
      id: '2',
      title: 'Community Showcase: July Edition',
      date: '2024-07-20',
      time: '2:00 PM PST',
      type: 'Showcase',
      attendees: 892,
      maxAttendees: 1000,
      speaker: 'Community Team',
      speakerTitle: 'QAID Team',
      description: 'Monthly showcase of the most innovative AI agents and workflows created by our community.',
      tags: ['showcase', 'community', 'innovation']
    },
    {
      id: '3',
      title: 'AI Ethics & Responsible Automation',
      date: '2024-07-25',
      time: '11:00 AM PST',
      type: 'Panel',
      attendees: 156,
      maxAttendees: 300,
      speaker: 'Multiple Experts',
      speakerTitle: 'Industry Panel',
      description: 'Panel discussion on ethical AI implementation and responsible automation practices.',
      tags: ['ethics', 'panel', 'responsibility']
    }
  ]

  const topContributors = [
    {
      name: 'Sarah Chen',
      avatar: '/api/placeholder/50/50',
      role: 'AI Strategist',
      points: 8450,
      badges: ['Top Contributor', 'Workflow Expert', 'Community Leader'],
      contributions: 156,
      specialties: ['E-commerce', 'Automation', 'Strategy']
    },
    {
      name: 'Marcus Rodriguez',
      avatar: '/api/placeholder/50/50',
      role: 'Senior Developer',
      points: 7230,
      badges: ['Code Master', 'Integration Expert', 'Mentor'],
      contributions: 132,
      specialties: ['Development', 'APIs', 'Custom Agents']
    },
    {
      name: 'Emily Watson',
      avatar: '/api/placeholder/50/50',
      role: 'Enterprise Architect',
      points: 6890,
      badges: ['Enterprise Expert', 'Scaling Specialist', 'Thought Leader'],
      contributions: 89,
      specialties: ['Enterprise', 'Architecture', 'Scaling']
    }
  ]

  const resources = [
    {
      title: 'Community Guidelines',
      description: 'Learn how to be a positive member of our community',
      icon: BookOpen,
      action: () => onViewChange('community-guidelines')
    },
    {
      title: 'Developer Resources',
      description: 'Tools and resources for QAID developers',
      icon: Code,
      action: () => onViewChange('developer-resources')
    },
    {
      title: 'Success Stories',
      description: 'Real-world case studies from our community',
      icon: Trophy,
      action: () => onViewChange('success-stories')
    },
    {
      title: 'Feature Requests',
      description: 'Suggest and vote on new features',
      icon: Lightbulb,
      action: () => onViewChange('feature-requests')
    }
  ]

  const handleJoinCommunity = () => {
    if (isLoggedIn) {
      // Redirect to community forum or dashboard
      onViewChange('community-forum')
    } else {
      onShowAuth('signup')
    }
  }

  const handleStartDiscussion = () => {
    if (isLoggedIn) {
      onViewChange('community-forum')
    } else {
      onShowAuth('signup')
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-brand-primary text-white">
              <Users className="h-3 w-3 mr-1" />
              Community
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Join the{' '}
              <span className="bg-brand-primary bg-clip-text text-transparent">
                QAID Community
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Connect with thousands of AI automation enthusiasts, share your projects, 
              learn from experts, and shape the future of intelligent workflows together.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-lg mx-auto mb-12">
              <Button 
                size="lg" 
                className="!bg-brand-primary border-none text-white w-full sm:w-auto"
                onClick={handleJoinCommunity}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Join Community
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="w-full sm:w-auto"
                onClick={handleStartDiscussion}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Start Discussion
              </Button>
            </div>

            {/* Community Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {communityStats.map((stat, index) => {
                const IconComponent = stat.icon
                return (
                  <div key={index} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <div className="flex items-center justify-center mb-2">
                      <IconComponent className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                    <div className="text-xs text-green-600 mt-1">{stat.trend}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full px-20">
            {/* Category Tabs */}
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-5 mb-12 ">
              <TabsTrigger value="discussions">Discussions</TabsTrigger>
              <TabsTrigger value="showcase">Showcase</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="contributors">Contributors</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>

            {/* Discussions Tab */}
            <TabsContent value="discussions" className="space-y-8">
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search discussions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button 
                    size="sm" 
                    className="!bg-brand-primary border-none text-white"
                    onClick={handleStartDiscussion}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    New Discussion
                  </Button>
                </div>
              </div>

              <div className="space-y-6">
                {featuredDiscussions.map((discussion) => (
                  <Card key={discussion.id} className="hover:shadow-lg transition-all duration-300 cursor-pointer">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={discussion.avatar} alt={discussion.author} />
                            <AvatarFallback>{discussion.author.slice(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">{discussion.author}</span>
                              <Badge variant="outline" className="text-xs">
                                {discussion.role}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <span>{discussion.timeAgo}</span>
                              <span>•</span>
                              <Badge variant="secondary" className="text-xs">
                                {discussion.category}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Bookmark className="h-4 w-4" />
                        </Button>
                      </div>
                      <CardTitle className="text-lg hover:text-blue-600 transition-colors">
                        {discussion.title}
                      </CardTitle>
                      <CardDescription className="text-sm leading-relaxed">
                        {discussion.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <MessageSquare className="h-4 w-4" />
                            <span>{discussion.replies}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <ThumbsUp className="h-4 w-4" />
                            <span>{discussion.likes}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye className="h-4 w-4" />
                            <span>{discussion.views}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {discussion.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center">
                <Button variant="outline" size="lg" onClick={() => onViewChange('community-forum')}>
                  <MessageCircle className="h-4 w-4 mr-2" />
                  View All Discussions
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </TabsContent>

            {/* Showcase Tab */}
            <TabsContent value="showcase" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Community Showcase</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Discover amazing AI agents and workflows created by our talented community members
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {showcaseProjects.map((project) => (
                  <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                    <div className="aspect-video bg-bg-secondary relative overflow-hidden">
                      <div className="absolute inset-0  flex items-center justify-center">
                        <Zap className="h-16 w-16 text-brand-primary opacity-50" />
                      </div>
                      <div className="absolute top-4 left-4">
                        <Badge variant="secondary">{project.category}</Badge>
                      </div>
                    </div>
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg group-hover:text-brand-primary transition-colors">
                          {project.title}
                        </CardTitle>
                        <Button variant="ghost" size="sm">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <CardDescription className="text-sm leading-relaxed">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={project.avatar} alt={project.author} />
                            <AvatarFallback className="text-xs">{project.author.slice(0, 2)}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">{project.author}</span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span>{project.stars}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <ArrowRight className="h-4 w-4" />
                            <span>{project.downloads}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {project.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <Button size="sm" variant="outline">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center">
                <Button variant="outline" size="lg">
                  <Sparkles className="h-4 w-4 mr-2" />
                  View All Projects
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </TabsContent>

            {/* Events Tab */}
            <TabsContent value="events" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Upcoming Events</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Join our workshops, showcases, and networking events to connect with the community
                </p>
              </div>

              <div className="space-y-6">
                {upcomingEvents.map((event) => (
                  <Card key={event.id} className="hover:shadow-lg transition-all duration-300">
                    <CardHeader className="pb-4">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge variant="outline" className="text-xs">
                              {event.type}
                            </Badge>
                            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              <span>{event.date}</span>
                            </div>
                            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              <span>{event.time}</span>
                            </div>
                          </div>
                          <CardTitle className="text-xl mb-2">{event.title}</CardTitle>
                          <CardDescription className="text-sm leading-relaxed mb-4">
                            {event.description}
                          </CardDescription>
                          <div className="flex items-center space-x-4 text-sm">
                            <div className="flex items-center space-x-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <span>{event.speaker}</span>
                              <Badge variant="secondary" className="text-xs">
                                {event.speakerTitle}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <div className="text-sm text-muted-foreground">
                            {event.attendees} / {event.maxAttendees} attending
                          </div>
                          <div className="w-32 bg-muted rounded-full h-2">
                            <div 
                              className="bg-brand-primary h-2 rounded-full"
                              style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                            />
                          </div>
                          <Button size="sm" className="!bg-brand-primary text-white w-full">
                            <Calendar className="h-4 w-4 mr-2" />
                            Register
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {event.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Contributors Tab */}
            <TabsContent value="contributors" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Top Contributors</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Meet the amazing people who make our community thrive
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {topContributors.map((contributor, index) => (
                  <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                    <CardHeader className="pb-4">
                      <div className="relative">
                        <Avatar className="h-20 w-20 mx-auto mb-4">
                          <AvatarImage src={contributor.avatar} alt={contributor.name} />
                          <AvatarFallback className="text-lg">{contributor.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        {index === 0 && (
                          <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full p-1">
                            <Trophy className="h-4 w-4" />
                          </div>
                        )}
                      </div>
                      <CardTitle className="text-lg">{contributor.name}</CardTitle>
                      <CardDescription className="text-sm">{contributor.role}</CardDescription>
                      <div className="flex justify-center items-center space-x-4 text-sm text-muted-foreground mt-2">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span>{contributor.points.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="h-4 w-4" />
                          <span>{contributor.contributions}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-1 justify-center">
                          {contributor.badges.map((badge) => (
                            <Badge key={badge} variant="outline" className="text-xs">
                              {badge}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-1 justify-center">
                          {contributor.specialties.map((specialty) => (
                            <Badge key={specialty} variant="secondary" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                        <Button size="sm" variant="outline" className="w-full">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Message
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Resources Tab */}
            <TabsContent value="resources" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Community Resources</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Everything you need to get started and contribute to our community
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {resources.map((resource, index) => {
                  const IconComponent = resource.icon
                  return (
                    <Card key={index} className="hover:shadow-lg transition-all duration-300 cursor-pointer group" onClick={resource.action}>
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-primary group-hover:scale-110 transition-transform">
                            <IconComponent className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium mb-2 group-hover:text-blue-600 transition-colors">
                              {resource.title}
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {resource.description}
                            </p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-blue-600 transition-colors" />
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-bg-secondary text-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Join the Community?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Connect with thousands of AI enthusiasts, share your innovations, 
              and accelerate your automation journey with QAID.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-lg mx-auto">
              <Button 
                size="lg" 
                variant="secondary"
                className="w-full sm:w-auto !bg-brand-primary text-white hover:bg-brand-primary/90"
                onClick={handleJoinCommunity}
              >
                <Users className="h-4 w-4 mr-2" />
                Join Now
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-black hover:bg-white hover:text-primary w-full sm:w-auto"
                onClick={() => onViewChange('community-forum')}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Browse Forum
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}