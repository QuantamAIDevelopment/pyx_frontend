'use client'

import { useState } from 'react'
import { Button } from '../common/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../common/ui/card'
import { Badge } from '../common/ui/badge'
import { Input } from '../common/ui/input'
import { Tabs, TabsList, TabsTrigger } from '../common/ui/tabs'
// import { Progress } from '../common/ui/progress'
// import { Separator } from '../common/ui/separator'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../common/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../common/ui/select'
import { ScrollArea } from '../common/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '../common/ui/avatar'
import {
  Calendar,
  Clock,
  Users,
  Star,
  Search,
  // Filter,
  ArrowRight,
  Play,
  // Eye,
  // ThumbsUp,
  // Share2,
  // BookOpen,
  // BarChart3,
  Video,
  // Mic,
  Phone,
  // Mail,
  Globe,
  Lightbulb,
  Rocket,
  Trophy,
  // Award,
  CheckCircle,
  // MapPin,
  Building2,
  GraduationCap,
  // Briefcase,
  // Stethoscope,
  // ShoppingCart,
  // Banknote,
  // Truck,
  // Target,
  // Sparkles,
  // Flame,
  // TrendingUp,
  // Heart,
  // MessageSquare,
  // Bell,
  // BellRing,
  // Volume2,
  // VolumeX,
  // Maximize,
  // Minimize,
  PlayCircle,
  // PauseCircle,
  // SkipForward,
  // SkipBack,
  // RotateCcw,
  // Settings,
  // Info,
  // AlertCircle,
  // CheckSquare,
  // X,
  // Plus,
  // Minus,
  // ChevronRight,
  // ChevronLeft,
  // ChevronDown,
  // ChevronUp,
  // ExternalLink,
  // Copy,
  // Facebook,
  // Twitter,
  // Linkedin,
  // Youtube,
  // Instagram,
  // Github,
  // Twitch,
  // Figma,
  // Dribbble,
  // Behance, // Not available in lucide-react
  // Medium,
  // Slack,
  // Discord,
  // Telegram,
  // WhatsApp,
  Zap,
  Code,
  // Database,
  // Cloud,
  // Server,
  // Monitor,
  // Smartphone,
  // Tablet,
  // Laptop,
  // Headphones,
  // Camera,
  // Webcam,
  // Microphone
} from 'lucide-react'

interface WebinarsPageProps {
  onViewChange: (view: string) => void
  isLoggedIn: boolean
  onShowAuth: (mode: 'login' | 'signup') => void
}

export function WebinarsPage({ onViewChange, isLoggedIn, onShowAuth }: WebinarsPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedWebinar, setSelectedWebinar] = useState<any>(null)
  const [showWebinarModal, setShowWebinarModal] = useState(false)
  const [showRegistrationModal, setShowRegistrationModal] = useState(false)
  const [sortBy, setSortBy] = useState('upcoming')
  const [currentTab, setCurrentTab] = useState('upcoming')

  const categories = [
    { id: 'all', name: 'All Topics', icon: Globe, count: 24 },
    { id: 'ai-fundamentals', name: 'AI Fundamentals', icon: Lightbulb, count: 8 },
    { id: 'agent-development', name: 'Agent Development', icon: Code, count: 6 },
    { id: 'business-automation', name: 'Business Automation', icon: Zap, count: 5 },
    { id: 'case-studies', name: 'Case Studies', icon: Trophy, count: 3 },
    { id: 'industry-specific', name: 'Industry Specific', icon: Building2, count: 2 }
  ]

  const webinars = [
    {
      id: '1',
      title: 'Building Your First AI Agent: A Complete Guide',
      description: 'Learn how to create, deploy, and manage your first AI agent from scratch using QAID\'s powerful platform.',
      host: {
        name: 'Dr. Sarah Chen',
        role: 'Lead AI Researcher',
        avatar: '/api/placeholder/50/50',
        bio: 'AI researcher with 10+ years of experience in machine learning and automation.',
        company: 'QAID Technologies'
      },
      category: 'ai-fundamentals',
      date: '2024-12-20',
      time: '2:00 PM EST',
      duration: '60 minutes',
      attendees: 1247,
      maxAttendees: 2000,
      level: 'Beginner',
      price: 'Free',
      status: 'upcoming',
      thumbnail: '/api/placeholder/400/250',
      agenda: [
        'Introduction to AI Agents',
        'Setting up your QAID workspace',
        'Creating your first agent',
        'Testing and debugging',
        'Deployment strategies',
        'Q&A Session'
      ],
      learningOutcomes: [
        'Understand AI agent fundamentals',
        'Build and deploy your first agent',
        'Master QAID development tools',
        'Implement best practices'
      ],
      tags: ['AI', 'Beginner', 'Tutorial', 'Free'],
      rating: 4.8,
      reviews: 156,
      featured: true,
      recordingAvailable: false
    },
    {
      id: '2',
      title: 'Advanced Agent Orchestration: Multi-Agent Systems',
      description: 'Explore advanced techniques for building complex multi-agent systems that can collaborate and coordinate tasks.',
      host: {
        name: 'Michael Rodriguez',
        role: 'Senior Solutions Architect',
        avatar: '/api/placeholder/50/50',
        bio: 'Expert in distributed systems and multi-agent architectures.',
        company: 'QAID Technologies'
      },
      category: 'agent-development',
      date: '2024-12-22',
      time: '3:00 PM EST',
      duration: '90 minutes',
      attendees: 856,
      maxAttendees: 1500,
      level: 'Advanced',
      price: 'Premium',
      status: 'upcoming',
      thumbnail: '/api/placeholder/400/250',
      agenda: [
        'Multi-agent architecture patterns',
        'Agent communication protocols',
        'Coordination strategies',
        'Scalability considerations',
        'Real-world examples',
        'Hands-on workshop'
      ],
      learningOutcomes: [
        'Design multi-agent systems',
        'Implement agent coordination',
        'Optimize system performance',
        'Handle complex workflows'
      ],
      tags: ['Advanced', 'Multi-Agent', 'Architecture', 'Premium'],
      rating: 4.9,
      reviews: 89,
      featured: true,
      recordingAvailable: false
    },
    {
      id: '3',
      title: 'E-commerce Automation Success Stories',
      description: 'Learn from real businesses that achieved 300%+ growth using QAID AI agents for e-commerce automation.',
      host: {
        name: 'Jennifer Walsh',
        role: 'Business Development Director',
        avatar: '/api/placeholder/50/50',
        bio: 'Specializes in AI-driven business transformation and growth strategies.',
        company: 'QAID Technologies'
      },
      category: 'case-studies',
      date: '2024-12-25',
      time: '1:00 PM EST',
      duration: '45 minutes',
      attendees: 2156,
      maxAttendees: 3000,
      level: 'Intermediate',
      price: 'Free',
      status: 'upcoming',
      thumbnail: '/api/placeholder/400/250',
      agenda: [
        'TechMart case study overview',
        'Implementation strategies',
        'ROI analysis and metrics',
        'Challenges and solutions',
        'Scaling considerations',
        'Q&A with successful users'
      ],
      learningOutcomes: [
        'Understand implementation strategies',
        'Learn from real success stories',
        'Identify growth opportunities',
        'Apply proven frameworks'
      ],
      tags: ['E-commerce', 'Case Study', 'ROI', 'Free'],
      rating: 4.7,
      reviews: 234,
      featured: true,
      recordingAvailable: false
    },
    {
      id: '4',
      title: 'Healthcare AI: Transforming Patient Care',
      description: 'Discover how AI agents are revolutionizing healthcare delivery and improving patient outcomes.',
      host: {
        name: 'Dr. Emily Johnson',
        role: 'Healthcare AI Specialist',
        avatar: '/api/placeholder/50/50',
        bio: 'Medical doctor and AI researcher focused on healthcare applications.',
        company: 'QAID Technologies'
      },
      category: 'industry-specific',
      date: '2024-12-18',
      time: '11:00 AM EST',
      duration: '75 minutes',
      attendees: 1450,
      maxAttendees: 2000,
      level: 'Intermediate',
      price: 'Free',
      status: 'completed',
      thumbnail: '/api/placeholder/400/250',
      agenda: [
        'Healthcare AI landscape',
        'Patient diagnosis assistance',
        'Treatment optimization',
        'Administrative automation',
        'Compliance and security',
        'Future trends'
      ],
      learningOutcomes: [
        'Understand healthcare AI applications',
        'Implement patient care solutions',
        'Ensure regulatory compliance',
        'Improve operational efficiency'
      ],
      tags: ['Healthcare', 'AI', 'Patient Care', 'Free'],
      rating: 4.8,
      reviews: 167,
      featured: false,
      recordingAvailable: true,
      recording: {
        url: '/api/placeholder/video',
        duration: '75 minutes',
        views: 3420,
        downloadUrl: '/api/placeholder/download'
      }
    },
    {
      id: '5',
      title: 'Financial Services Automation Masterclass',
      description: 'Master the art of implementing AI agents in financial services for fraud detection and risk management.',
      host: {
        name: 'David Kim',
        role: 'Financial Technology Expert',
        avatar: '/api/placeholder/50/50',
        bio: 'Former banking executive specializing in AI and fintech innovations.',
        company: 'QAID Technologies'
      },
      category: 'industry-specific',
      date: '2024-12-15',
      time: '2:30 PM EST',
      duration: '90 minutes',
      attendees: 1876,
      maxAttendees: 2500,
      level: 'Advanced',
      price: 'Premium',
      status: 'completed',
      thumbnail: '/api/placeholder/400/250',
      agenda: [
        'Fintech AI overview',
        'Fraud detection systems',
        'Risk assessment automation',
        'Compliance automation',
        'Customer service AI',
        'Implementation roadmap'
      ],
      learningOutcomes: [
        'Build fraud detection systems',
        'Automate risk assessment',
        'Ensure regulatory compliance',
        'Improve customer experience'
      ],
      tags: ['Finance', 'Fraud Detection', 'Risk Management', 'Premium'],
      rating: 4.9,
      reviews: 134,
      featured: false,
      recordingAvailable: true,
      recording: {
        url: '/api/placeholder/video',
        duration: '90 minutes',
        views: 2145,
        downloadUrl: '/api/placeholder/download'
      }
    },
    {
      id: '6',
      title: 'Business Process Automation Workshop',
      description: 'Hands-on workshop on identifying and automating key business processes using AI agents.',
      host: {
        name: 'Lisa Thompson',
        role: 'Process Automation Consultant',
        avatar: '/api/placeholder/50/50',
        bio: 'Business process expert with 15+ years in operational excellence.',
        company: 'QAID Technologies'
      },
      category: 'business-automation',
      date: '2024-12-12',
      time: '10:00 AM EST',
      duration: '120 minutes',
      attendees: 1234,
      maxAttendees: 1800,
      level: 'Intermediate',
      price: 'Free',
      status: 'completed',
      thumbnail: '/api/placeholder/400/250',
      agenda: [
        'Process identification techniques',
        'Automation readiness assessment',
        'Agent design workshop',
        'Implementation planning',
        'ROI calculation',
        'Next steps and resources'
      ],
      learningOutcomes: [
        'Identify automation opportunities',
        'Design effective workflows',
        'Calculate business impact',
        'Plan implementation strategy'
      ],
      tags: ['Business Process', 'Automation', 'Workshop', 'Free'],
      rating: 4.6,
      reviews: 198,
      featured: false,
      recordingAvailable: true,
      recording: {
        url: '/api/placeholder/video',
        duration: '120 minutes',
        views: 2890,
        downloadUrl: '/api/placeholder/download'
      }
    }
  ]

  const filteredWebinars = webinars.filter(webinar => {
    const matchesSearch = webinar.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      webinar.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      webinar.host.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || webinar.category === selectedCategory
    const matchesTab = currentTab === 'all' ||
      (currentTab === 'upcoming' && webinar.status === 'upcoming') ||
      (currentTab === 'past' && webinar.status === 'completed')
    return matchesSearch && matchesCategory && matchesTab
  }).sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      case 'popular':
        return b.attendees - a.attendees
      case 'rating':
        return b.rating - a.rating
      case 'upcoming':
      default:
        return a.status === 'upcoming' ? -1 : 1
    }
  })

  const handleWebinarClick = (webinar: any) => {
    setSelectedWebinar(webinar)
    setShowWebinarModal(true)
  }

  const handleRegister = (webinar: any) => {
    if (isLoggedIn) {
      setSelectedWebinar(webinar)
      setShowRegistrationModal(true)
    } else {
      onShowAuth('signup')
    }
  }

  const handleGetStarted = () => {
    if (isLoggedIn) {
      onViewChange('agents')
    } else {
      onShowAuth('signup')
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'ai-fundamentals': return Lightbulb
      case 'agent-development': return Code
      case 'business-automation': return Zap
      case 'case-studies': return Trophy
      case 'industry-specific': return Building2
      default: return Globe
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
      case 'Intermediate': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
      case 'Advanced': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300'
      case 'completed': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const upcomingWebinars = webinars.filter(w => w.status === 'upcoming')
  const completedWebinars = webinars.filter(w => w.status === 'completed')

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-pink-950/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <Video className="h-3 w-3 mr-1" />
              Live Learning
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Expert-Led{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Webinars
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Join live sessions with AI experts, learn from real-world case studies,
              and master the art of building intelligent agents.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-lg mx-auto mb-12">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 w-full sm:w-auto"
                onClick={handleGetStarted}
              >
                <Rocket className="h-4 w-4 mr-2" />
                Get Started
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
                onClick={() => onViewChange('contact')}
              >
                <Phone className="h-4 w-4 mr-2" />
                Contact Sales
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-2xl font-bold text-blue-600">{upcomingWebinars.length}</div>
                <div className="text-sm text-muted-foreground">Upcoming Sessions</div>
              </div>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-2xl font-bold text-purple-600">{completedWebinars.length}</div>
                <div className="text-sm text-muted-foreground">Available Recordings</div>
              </div>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-2xl font-bold text-pink-600">10K+</div>
                <div className="text-sm text-muted-foreground">Total Attendees</div>
              </div>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-2xl font-bold text-orange-600">4.8</div>
                <div className="text-sm text-muted-foreground">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Webinars */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 ">
            <h2 className="text-3xl font-bold mb-4">Featured Sessions</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Don't miss these expert-led sessions on AI fundamentals and advanced techniques
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-20">
            {webinars.filter(webinar => webinar.featured).map((webinar) => {
              const CategoryIcon = getCategoryIcon(webinar.category)
              return (
                <Card key={webinar.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group" onClick={() => handleWebinarClick(webinar)}>
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                      <CategoryIcon className="h-16 w-16 text-white opacity-80" />
                    </div>
                    <div className="absolute top-4 left-4">
                      <Badge className={getStatusColor(webinar.status)}>
                        {webinar.status === 'upcoming' ? (
                          <>
                            <Calendar className="h-3 w-3 mr-1" />
                            Upcoming
                          </>
                        ) : (
                          <>
                            <PlayCircle className="h-3 w-3 mr-1" />
                            Available
                          </>
                        )}
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <Badge className={getLevelColor(webinar.level)}>
                        {webinar.level}
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <Badge variant="secondary" className="bg-black/60 text-white">
                        <Clock className="h-3 w-3 mr-1" />
                        {webinar.duration}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={webinar.host.avatar} alt={webinar.host.name} />
                        <AvatarFallback>{webinar.host.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold text-sm">{webinar.host.name}</div>
                        <div className="text-xs text-muted-foreground">{webinar.host.role}</div>
                      </div>
                      <div className="ml-auto flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{webinar.rating}</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg group-hover:text-blue-600 transition-colors line-clamp-2">
                      {webinar.title}
                    </CardTitle>
                    <CardDescription className="text-sm line-clamp-2">
                      {webinar.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(webinar.date)}
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {webinar.attendees.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {webinar.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button
                        size="sm"
                        className="group-hover:bg-primary group-hover:text-primary-foreground"
                        onClick={(e) => {
                          e.stopPropagation()
                          if (webinar.status === 'upcoming') {
                            handleRegister(webinar)
                          } else {
                            handleWebinarClick(webinar)
                          }
                        }}
                      >
                        {webinar.status === 'upcoming' ? (
                          <>
                            <Calendar className="h-3 w-3 mr-1" />
                            Register
                          </>
                        ) : (
                          <>
                            <Play className="h-3 w-3 mr-1" />
                            Watch
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* All Webinars */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 px-20">
            <div>
              <h2 className="text-3xl font-bold mb-2">All Sessions</h2>
              <p className="text-muted-foreground">Browse upcoming webinars and past recordings</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search webinars..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-80"
                />
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-40 ">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="upcoming">Upcoming First</SelectItem>
                  <SelectItem value="date">By Date</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tabs and Filters */}
          <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full px-20">
            <div className="flex flex-col lg:flex-row gap-4 mb-8">
              <TabsList className="grid w-full lg:w-auto grid-cols-3">
                <TabsTrigger value="upcoming">Upcoming ({upcomingWebinars.length})</TabsTrigger>
                <TabsTrigger value="past">Past ({completedWebinars.length})</TabsTrigger>
                <TabsTrigger value="all">All ({webinars.length})</TabsTrigger>
              </TabsList>

              <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                  const IconComponent = category.icon
                  return (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex items-center gap-1 ${selectedCategory === category.id ? '!bg-black text-white hover:bg-black border-none' : ''
                        }`}
                    >
                      <IconComponent className="h-3 w-3" />
                      {category.name}
                      <Badge variant="secondary" className="ml-1 text-xs">
                        {category.count}
                      </Badge>
                    </Button>

                  )
                })}
              </div>
            </div>

            {/* Webinars Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWebinars.map((webinar) => {
                const CategoryIcon = getCategoryIcon(webinar.category)
                return (
                  <Card key={webinar.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group" onClick={() => handleWebinarClick(webinar)}>
                    <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                        <CategoryIcon className="h-12 w-12 text-white opacity-80" />
                      </div>
                      <div className="absolute top-4 left-4">
                        <Badge className={getStatusColor(webinar.status)}>
                          {webinar.status === 'upcoming' ? 'Upcoming' : 'Available'}
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 right-4">
                        <Badge className={getLevelColor(webinar.level)}>
                          {webinar.level}
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <Badge variant="secondary" className="bg-black/60 text-white">
                          {webinar.duration}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader className="pb-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={webinar.host.avatar} alt={webinar.host.name} />
                          <AvatarFallback>{webinar.host.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-sm">{webinar.host.name}</div>
                          <div className="text-xs text-muted-foreground">{webinar.host.role}</div>
                        </div>
                        <div className="ml-auto flex items-center space-x-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs font-medium">{webinar.rating}</span>
                        </div>
                      </div>
                      <CardTitle className="text-base group-hover:text-blue-600 transition-colors line-clamp-2">
                        {webinar.title}
                      </CardTitle>
                      <CardDescription className="text-sm line-clamp-2">
                        {webinar.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(webinar.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <Users className="h-3 w-3 mr-1" />
                          {webinar.attendees.toLocaleString()}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {webinar.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="group-hover:bg-primary group-hover:text-primary-foreground"
                          onClick={(e) => {
                            e.stopPropagation()
                            if (webinar.status === 'upcoming') {
                              handleRegister(webinar)
                            } else {
                              handleWebinarClick(webinar)
                            }
                          }}
                        >
                          {webinar.status === 'upcoming' ? (
                            <>
                              <Calendar className="h-3 w-3 mr-1" />
                              Register
                            </>
                          ) : (
                            <>
                              <Play className="h-3 w-3 mr-1" />
                              Watch
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Learn from the Experts?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of developers and business leaders who are mastering
              AI agent development through our expert-led webinars.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-lg mx-auto">
              <Button
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto"
                onClick={handleGetStarted}
              >
                <Rocket className="h-4 w-4 mr-2" />
                Start Building
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-black bg-white hover:bg-white hover:text-primary w-full sm:w-auto"
                onClick={() => onViewChange('contact')}
              >
                <Phone className="h-4 w-4 mr-2" />
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Webinar Detail Modal */}
      <Dialog open={showWebinarModal} onOpenChange={setShowWebinarModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Video className="h-5 w-5" />
              <span>{selectedWebinar?.title}</span>
            </DialogTitle>
            <DialogDescription>
              {selectedWebinar?.host?.name} • {selectedWebinar?.duration} • {selectedWebinar?.level}
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[70vh]">
            <div className="space-y-6">
              {/* Host Info */}
              <div className="flex items-center space-x-4 p-4 bg-muted rounded-lg">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedWebinar?.host?.avatar} alt={selectedWebinar?.host?.name} />
                  <AvatarFallback>{selectedWebinar?.host?.name?.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="font-semibold text-lg">{selectedWebinar?.host?.name}</div>
                  <div className="text-sm text-muted-foreground">{selectedWebinar?.host?.role}</div>
                  <div className="text-sm text-muted-foreground">{selectedWebinar?.host?.company}</div>
                  <p className="text-sm mt-2">{selectedWebinar?.host?.bio}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1 mb-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold">{selectedWebinar?.rating}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">{selectedWebinar?.reviews} reviews</div>
                </div>
              </div>

              {/* Session Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Session Details</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{formatDate(selectedWebinar?.date || '')}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{selectedWebinar?.time} ({selectedWebinar?.duration})</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{selectedWebinar?.attendees?.toLocaleString()} registered</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <GraduationCap className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{selectedWebinar?.level} level</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">What You'll Learn</h3>
                  <ul className="space-y-2">
                    {selectedWebinar?.learningOutcomes?.map((outcome: string, index: number) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Agenda */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Agenda</h3>
                <div className="space-y-2">
                  {selectedWebinar?.agenda?.map((item: string, index: number) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </div>
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedWebinar?.tags?.map((tag: string) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Registration/Watch Button */}
              <div className="flex justify-center pt-4">
                <Button
                  size="lg"
                  className="w-full sm:w-auto"
                  onClick={() => {
                    if (selectedWebinar?.status === 'upcoming') {
                      handleRegister(selectedWebinar)
                    } else {
                      // Handle watch recording
                    }
                  }}
                >
                  {selectedWebinar?.status === 'upcoming' ? (
                    <>
                      <Calendar className="h-4 w-4 mr-2" />
                      Register for Free
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Watch Recording
                    </>
                  )}
                </Button>
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Registration Modal */}
      <Dialog open={showRegistrationModal} onOpenChange={setShowRegistrationModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Register for Webinar</span>
            </DialogTitle>
            <DialogDescription>
              You're registering for: {selectedWebinar?.title}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-sm font-medium mb-2">Session Details</div>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div>{formatDate(selectedWebinar?.date || '')}</div>
                <div>{selectedWebinar?.time} ({selectedWebinar?.duration})</div>
                <div>Host: {selectedWebinar?.host?.name}</div>
              </div>
            </div>

            <div className="flex items-center space-x-2 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <div className="font-medium text-green-800 dark:text-green-200">Registration Confirmed!</div>
                <div className="text-sm text-green-600 dark:text-green-400">
                  You'll receive a calendar invite and reminder email.
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowRegistrationModal(false)}>
                Close
              </Button>
              <Button onClick={() => setShowRegistrationModal(false)}>
                <Calendar className="h-4 w-4 mr-2" />
                Add to Calendar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}