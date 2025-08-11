'use client'

import { useState } from 'react'
import { Button } from '../common/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../common/ui/card'
import { Badge } from '../common/ui/badge'
import { Input } from '../common/ui/input'
import { Tabs,  TabsList, TabsTrigger } from '../common/ui/tabs'
import { Progress } from '../common/ui/progress'
// import { Separator } from '../common/ui/separator'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../common/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../common/ui/select'
import { ScrollArea } from '../common/ui/scroll-area'
import { 
  Play,
  BookOpen,
  Clock,
  User,
  Star,
  Search,
  Filter,
  CheckCircle,
  Circle,
  Video,
  FileText,
  Code,
  ArrowRight,
  Eye,
  Share2,
  Bookmark,
  PlayCircle,
  ChevronRight,
  Rocket,
  Globe,
  ShoppingCart,
  Workflow,
  Bot,
  GraduationCap,
  Library
} from 'lucide-react'

interface TutorialsPageProps {
  onViewChange: (view: string) => void
  isLoggedIn: boolean
  onShowAuth: (mode: 'login' | 'signup') => void
}

export function TutorialsPage({ onViewChange, isLoggedIn, onShowAuth }: TutorialsPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTutorial, setSelectedTutorial] = useState<any>(null)
  const [selectedSeries, setSelectedSeries] = useState<any>(null)
  const [selectedLearningPath, setSelectedLearningPath] = useState<any>(null)
  const [showTutorialViewer, setShowTutorialViewer] = useState(false)
  const [showSeriesViewer, setShowSeriesViewer] = useState(false)
  const [showLearningPathViewer, setShowLearningPathViewer] = useState(false)
  const [showFilterDialog, setShowFilterDialog] = useState(false)
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [sortBy, setSortBy] = useState('popular')
  // const [ tutorialProgress,setTutorialProgress] = useState<{[key: string]: number}>({
  //   '1': 0,
  //   '2': 35,
  //   '3': 100
  // })
  // const [ seriesProgress,setSeriesProgress] = useState<{[key: string]: number}>({
  //   'series-1': 62,
  //   'series-2': 25
  // })

  const categories = [
    { id: 'all', name: 'All Tutorials', icon: Library, count: 47 },
    { id: 'getting-started', name: 'Getting Started', icon: Rocket, count: 12 },
    { id: 'workflows', name: 'Workflows', icon: Workflow, count: 8 },
    { id: 'integrations', name: 'Integrations', icon: Globe, count: 10 },
    { id: 'ecommerce', name: 'E-commerce', icon: ShoppingCart, count: 6 },
    { id: 'advanced', name: 'Advanced', icon: Code, count: 7 },
    { id: 'api', name: 'API & Development', icon: Bot, count: 4 }
  ]

  const featuredTutorials = [
    {
      id: '1',
      title: 'Complete PYX Setup Guide',
      description: 'Learn how to set up your first AI agent from scratch in under 10 minutes',
      type: 'video',
      duration: '9:45',
      difficulty: 'Beginner',
      category: 'getting-started',
      instructor: 'Sarah Johnson',
      instructorAvatar: '/api/placeholder/40/40',
      views: '15.2K',
      likes: '1.2K',
      rating: 4.9,
      thumbnail: '/api/placeholder/320/180',
      completed: false,
      progress: 0,
      tags: ['setup', 'beginner', 'quickstart']
    },
    {
      id: '2',
      title: 'Building Your First E-commerce Workflow',
      description: 'Step-by-step guide to creating an automated order processing workflow',
      type: 'interactive',
      duration: '25:30',
      difficulty: 'Intermediate',
      category: 'ecommerce',
      instructor: 'Mike Chen',
      instructorAvatar: '/api/placeholder/40/40',
      views: '8.7K',
      likes: '892',
      rating: 4.8,
      thumbnail: '/api/placeholder/320/180',
      completed: false,
      progress: 35,
      tags: ['ecommerce', 'workflow', 'automation']
    },
    {
      id: '3',
      title: 'Advanced API Integration Techniques',
      description: 'Master complex API integrations with error handling and rate limiting',
      type: 'video',
      duration: '42:15',
      difficulty: 'Advanced',
      category: 'api',
      instructor: 'Dr. Alex Rodriguez',
      instructorAvatar: '/api/placeholder/40/40',
      views: '4.3K',
      likes: '567',
      rating: 4.7,
      thumbnail: '/api/placeholder/320/180',
      completed: true,
      progress: 100,
      tags: ['api', 'integration', 'advanced']
    }
  ]

  const tutorialSeries = [
    {
      id: 'series-1',
      title: 'PYX Fundamentals',
      description: 'Complete foundation course covering all basics of PYX',
      totalLessons: 8,
      totalDuration: '2h 15m',
      difficulty: 'Beginner',
      progress: 62,
      instructor: 'Jennifer Liu',
      lessons: [
        { id: 1, title: 'Introduction to PYX', duration: '12:30', completed: true },
        { id: 2, title: 'Creating Your First Agent', duration: '18:45', completed: true },
        { id: 3, title: 'Understanding Workflows', duration: '15:20', completed: true },
        { id: 4, title: 'Data Connections', duration: '22:10', completed: true },
        { id: 5, title: 'Testing and Debugging', duration: '19:35', completed: true },
        { id: 6, title: 'Deployment Best Practices', duration: '16:40', completed: false },
        { id: 7, title: 'Performance Optimization', duration: '14:25', completed: false },
        { id: 8, title: 'Monitoring and Analytics', duration: '17:50', completed: false }
      ]
    },
    {
      id: 'series-2',
      title: 'E-commerce Automation Mastery',
      description: 'Comprehensive guide to automating your online store',
      totalLessons: 12,
      totalDuration: '4h 30m',
      difficulty: 'Intermediate',
      progress: 25,
      instructor: 'Maria Garcia',
      lessons: [
        { id: 1, title: 'E-commerce Basics', duration: '20:15', completed: true },
        { id: 2, title: 'Inventory Management', duration: '25:30', completed: true },
        { id: 3, title: 'Order Processing', duration: '18:45', completed: true },
        { id: 4, title: 'Customer Service Automation', duration: '22:20', completed: false },
        { id: 5, title: 'Marketing Automation', duration: '28:10', completed: false }
      ]
    }
  ]

  const quickGuides = [
    {
      id: 'guide-1',
      title: 'How to Connect Shopify',
      description: 'Quick setup guide for Shopify integration',
      duration: '5 min read',
      type: 'article',
      category: 'integrations',
      difficulty: 'Beginner'
    },
    {
      id: 'guide-2',
      title: 'Debugging Workflow Errors',
      description: 'Common issues and how to fix them',
      duration: '8 min read',
      type: 'article',
      category: 'workflows',
      difficulty: 'Intermediate'
    },
    {
      id: 'guide-3',
      title: 'API Rate Limiting Best Practices',
      description: 'Optimize your API usage for better performance',
      duration: '12 min read',
      type: 'article',
      category: 'api',
      difficulty: 'Advanced'
    },
    {
      id: 'guide-4',
      title: 'Setting Up Email Notifications',
      description: 'Configure automated email alerts and notifications',
      duration: '6 min read',
      type: 'article',
      category: 'workflows',
      difficulty: 'Beginner'
    }
  ]

  const learningPaths = [
    {
      id: 'path-1',
      title: 'Complete Beginner',
      description: 'Start from zero and become proficient with PYX',
      duration: '6-8 hours',
      modules: 4,
      difficulty: 'Beginner',
      icon: GraduationCap,
      color: 'bg-brand-primary'
    },
    {
      id: 'path-2',
      title: 'E-commerce Specialist',
      description: 'Master e-commerce automation and optimization',
      duration: '12-15 hours',
      modules: 6,
      difficulty: 'Intermediate',
      icon: ShoppingCart,
      color: 'bg-brand-primary'
    },
    {
      id: 'path-3',
      title: 'Developer Expert',
      description: 'Advanced development and custom integrations',
      duration: '20-25 hours',
      modules: 8,
      difficulty: 'Advanced',
      icon: Code,
      color: 'bg-brand-primary'
    }
  ]

  const filteredTutorials = featuredTutorials.filter(tutorial => {
    const matchesSearch = tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tutorial.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || tutorial.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === 'all' || tutorial.difficulty === selectedDifficulty
    const matchesType = selectedType === 'all' || tutorial.type === selectedType
    return matchesSearch && matchesCategory && matchesDifficulty && matchesType
  }).sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return b.id.localeCompare(a.id) // Assuming higher ID means newer
      case 'rating':
        return b.rating - a.rating
      case 'duration':
        return a.duration.localeCompare(b.duration)
      case 'popular':
      default:
        return parseInt(b.views.replace('K', '000').replace('.', '')) - parseInt(a.views.replace('K', '000').replace('.', ''))
    }
  })

  const filteredSeries = tutorialSeries.filter(series => {
    const matchesSearch = series.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         series.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDifficulty = selectedDifficulty === 'all' || series.difficulty === selectedDifficulty
    return matchesSearch && matchesDifficulty
  })
  {filteredSeries.map((series) => (
  <div key={series.id}>{series.title}</div>
))}

  const filteredGuides = quickGuides.filter(guide => {
    const matchesSearch = guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guide.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || guide.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === 'all' || guide.difficulty === selectedDifficulty
    return matchesSearch && matchesCategory && matchesDifficulty
  })
  {filteredGuides.map((guide) => (
  <div key={guide.id}>{guide.title}</div>
))}

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      case 'Advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return Video
      case 'interactive': return PlayCircle
      case 'article': return FileText
      default: return BookOpen
    }
  }

  const handleStartLearning = () => {
    if (isLoggedIn) {
      // Start with first tutorial
      setSelectedTutorial(featuredTutorials[0])
      setShowTutorialViewer(true)
    } else {
      onShowAuth('signup')
    }
  }

  const handleTutorialClick = (tutorial: any) => {
    if (isLoggedIn) {
      setSelectedTutorial(tutorial)
      setShowTutorialViewer(true)
    } else {
      onShowAuth('signup')
    }
  }

  const handleSeriesClick = (series: any) => {
    if (isLoggedIn) {
      setSelectedSeries(series)
      setShowSeriesViewer(true)
    } else {
      onShowAuth('signup')
    }
  }

  const handleLearningPathClick = (path: any) => {
    if (isLoggedIn) {
      setSelectedLearningPath(path)
      setShowLearningPathViewer(true)
    } else {
      onShowAuth('signup')
    }
  }

  const handleQuickGuideClick = (guide: any) => {
    // Create a tutorial-like object for the guide
    const guideTutorial = {
      ...guide,
      instructor: 'PYX Team',
      views: '2.5K',
      rating: 4.6,
      progress: 0
    }
    setSelectedTutorial(guideTutorial)
    setShowTutorialViewer(true)
  }


  const handleFilterApply = () => {
    setShowFilterDialog(false)
    // Filter logic is handled in the filteredTutorials function
  }

  const handleClearFilters = () => {
    setSelectedDifficulty('all')
    setSelectedType('all')
    setSortBy('popular')
    setSearchTerm('')
    setSelectedCategory('all')
  }

  const navigateToAllTutorials = () => {
    setSelectedCategory('all')
    setSearchTerm('')
  }

  const navigateToAllSeries = () => {
    // Could navigate to a dedicated series page or show all series
    setSelectedCategory('all')
  }

  const navigateToAllGuides = () => {
    // Could navigate to a dedicated guides page or filter by article type
    setSelectedType('article')
  }

  const handleBookmarkTutorial = (tutorial: any) => {
    // Add to bookmarks logic
    console.log('Bookmarked tutorial:', tutorial.title)
  }

  const handleShareTutorial = (tutorial: any) => {
    // Share tutorial logic
    if (navigator.share) {
      navigator.share({
        title: tutorial.title,
        text: tutorial.description,
        url: window.location.href
      })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-brand-primary text-white">
              <GraduationCap className="h-3 w-3 mr-1" />
              Tutorials
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Learn{' '}
              <span className="bg-brand-primary bg-clip-text text-transparent">
                PYX
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Master AI automation with our comprehensive tutorials, guides, and interactive lessons. 
              From beginner basics to advanced techniques, we've got you covered.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-lg mx-auto mb-12">
              <Button 
                size="lg" 
                className="!bg-brand-primary border-none  w-full sm:w-auto"
                onClick={handleStartLearning}
              >
                <Play className="h-4 w-4 mr-2" />
                Start Learning
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

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-2xl font-bold text-blue-600">47</div>
                <div className="text-sm text-muted-foreground">Tutorials</div>
              </div>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-2xl font-bold text-purple-600">12h</div>
                <div className="text-sm text-muted-foreground">Total Content</div>
              </div>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-2xl font-bold text-pink-600">3</div>
                <div className="text-sm text-muted-foreground">Learning Paths</div>
              </div>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-2xl font-bold text-orange-600">15K+</div>
                <div className="text-sm text-muted-foreground">Students</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Learning Paths</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Structured learning journeys tailored to your goals and skill level
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-20">
            {learningPaths.map((path) => {
              const IconComponent = path.icon
              return (
                <Card key={path.id} className="hover:shadow-lg transition-all duration-300 overflow-hidden group">
                  <div className={`h-2 bg-gradient-to-r ${path.color}`} />
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r ${path.color}`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <Badge className={getDifficultyColor(path.difficulty)}>
                        {path.difficulty}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl group-hover:text-brand-primary transition-colors">
                      {path.title}
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed">
                      {path.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{path.duration}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <BookOpen className="h-4 w-4" />
                            <span>{path.modules} modules</span>
                          </div>
                        </div>
                      </div>
                      <Button 
                        className="w-full group-hover:!bg-brand-primary  transition-all !bg-black border-none text-white"
                        onClick={() => handleLearningPathClick(path)}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Start Path
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full px-20">
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search tutorials..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" size="sm" onClick={() => setShowFilterDialog(true)}>
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>

            {/* Category Tabs */}
            <TabsList className="flex flex-wrap justify-center gap-2 h-auto bg-transparent p-2 mb-12 md:grid md:grid-cols-4 lg:grid-cols-7 lg:gap-0">
              {categories.map((category) => {
                const IconComponent = category.icon
                return (
                  <TabsTrigger 
                    key={category.id} 
                    value={category.id}
                    className="flex flex-col items-center justify-center gap-1 p-3 h-auto min-h-[80px] min-w-[120px] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border border-border rounded-lg"
                  >
                    <IconComponent className="h-4 w-4 flex-shrink-0" />
                    <span className="text-xs text-center leading-tight">{category.name}</span>
                    <Badge variant="secondary" className="text-xs mt-1">
                      {category.count}
                    </Badge>
                  </TabsTrigger>
                )
              })}
            </TabsList>

            {/* Featured Tutorials */}
            <div className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">Featured Tutorials</h2>
                <Button variant="outline" onClick={navigateToAllTutorials}>
                  <Video className="h-4 w-4 mr-2" />
                  View All
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTutorials.map((tutorial) => {
                  const TypeIcon = getTypeIcon(tutorial.type)
                  return (
                    <Card key={tutorial.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer" onClick={() => handleTutorialClick(tutorial)}>
                      <div className="aspect-video bg-bg-secondary relative overflow-hidden">
                        <div className="absolute inset-0  flex items-center justify-center">
                          <Play className="h-16 w-16 text-black opacity-80 group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="absolute top-4 left-4 flex items-center space-x-2">
                          <Badge variant="secondary" className="text-xs">
                            <TypeIcon className="h-3 w-3 mr-1" />
                            {tutorial.type}
                          </Badge>
                          <Badge className={getDifficultyColor(tutorial.difficulty)}>
                            {tutorial.difficulty}
                          </Badge>
                        </div>
                        <div className="absolute bottom-4 right-4">
                          <Badge variant="secondary" className="text-xs">
                            <Clock className="h-3 w-3 mr-1" />
                            {tutorial.duration}
                          </Badge>
                        </div>
                      </div>
                      <CardHeader className="pb-4">
                        <CardTitle className="text-lg group-hover:text-brand-primary transition-colors line-clamp-2">
                          {tutorial.title}
                        </CardTitle>
                        <CardDescription className="text-sm line-clamp-2">
                          {tutorial.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            <div className="h-6 w-6 bg-brand-primary rounded-full flex items-center justify-center">
                              <User className="h-3 w-3 text-white" />
                            </div>
                            <span className="text-sm font-medium">{tutorial.instructor}</span>
                          </div>
                          <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Eye className="h-3 w-3" />
                              <span>{tutorial.views}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span>{tutorial.rating}</span>
                            </div>
                          </div>
                        </div>
                        {tutorial.progress > 0 && (
                          <div className="mb-4">
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span className="text-muted-foreground">Progress</span>
                              <span className="text-primary">{tutorial.progress}%</span>
                            </div>
                            <Progress value={tutorial.progress} className="h-2" />
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-1">
                            {tutorial.tags.slice(0, 2).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleTutorialClick(tutorial)
                            }}
                          >
                            {tutorial.completed ? (
                              <>
                                <CheckCircle className="h-4 w-4 mr-1 text-green-600" />
                                Completed
                              </>
                            ) : (
                              <>
                                <Play className="h-4 w-4 mr-1" />
                                {tutorial.progress > 0 ? 'Continue' : 'Start'}
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

            {/* Tutorial Series */}
            <div className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">Tutorial Series</h2>
                <Button variant="outline" onClick={navigateToAllSeries}>
                  <BookOpen className="h-4 w-4 mr-2" />
                  View All Series
                </Button>
              </div>

              <div className="space-y-6">
                {tutorialSeries.map((series) => (
                  <Card key={series.id} className="hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => handleSeriesClick(series)}>
                    <CardHeader className="pb-4">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge className={getDifficultyColor(series.difficulty)}>
                              {series.difficulty}
                            </Badge>
                            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                              <BookOpen className="h-4 w-4" />
                              <span>{series.totalLessons} lessons</span>
                            </div>
                            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              <span>{series.totalDuration}</span>
                            </div>
                          </div>
                          <CardTitle className="text-xl mb-2">{series.title}</CardTitle>
                          <CardDescription className="text-sm leading-relaxed mb-4">
                            {series.description}
                          </CardDescription>
                          <div className="flex items-center space-x-4 text-sm">
                            <div className="flex items-center space-x-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <span>{series.instructor}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <div className="text-sm text-muted-foreground">
                            Progress: {series.progress}%
                          </div>
                          <div className="w-32 bg-muted rounded-full h-2">
                            <div 
                              className="bg-brand-primary h-2 rounded-full transition-all duration-300"
                              style={{ width: `${series.progress}%` }}
                            />
                          </div>
                          <Button 
                            size="sm" 
                            className="!bg-brand-primary border-none text-white "
                            onClick={(e) => {
                              e.stopPropagation()
                              handleSeriesClick(series)
                            }}
                          >
                            <Play className="h-4 w-4 mr-2" />
                            {series.progress > 0 ? 'Continue' : 'Start'}
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {series.lessons.slice(0, 4).map((lesson) => (
                          <div key={lesson.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                            <div className="flex-shrink-0">
                              {lesson.completed ? (
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              ) : (
                                <Circle className="h-4 w-4 text-muted-foreground" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium truncate">{lesson.title}</div>
                              <div className="text-xs text-muted-foreground">{lesson.duration}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                      {series.lessons.length > 4 && (
                        <div className="mt-4 text-center">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleSeriesClick(series)
                            }}
                          >
                            View all {series.totalLessons} lessons
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Quick Guides */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">Quick Guides</h2>
                <Button variant="outline" onClick={navigateToAllGuides}>
                  <FileText className="h-4 w-4 mr-2" />
                  View All Guides
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {quickGuides.map((guide) => (
                  <Card key={guide.id} className="hover:shadow-lg transition-all duration-300 cursor-pointer group" onClick={() => handleQuickGuideClick(guide)}>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-primary group-hover:scale-110 transition-transform">
                          <FileText className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge className={getDifficultyColor(guide.difficulty)}>
                              {guide.difficulty}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {guide.duration}
                            </Badge>
                          </div>
                          <h3 className="font-medium mb-2 group-hover:text-blue-600 transition-colors">
                            {guide.title}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {guide.description}
                          </p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-blue-600 transition-colors" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-bg-secondary text-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Master PYX?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of learners who are already automating their workflows 
              and boosting productivity with PYX.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-lg mx-auto">
              <Button 
                size="lg" 
                variant="secondary"
                className="w-full sm:w-auto !bg-brand-primary border-none text-white hover:bg-brand-primary/90"
                onClick={handleStartLearning}
              >
                <Play className="h-4 w-4 mr-2" />
                Start Learning
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-black hover:bg-white hover:text-primary w-full sm:w-auto"
                onClick={() => onViewChange('help')}
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Get Help
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Tutorial Viewer Modal */}
      <Dialog open={showTutorialViewer} onOpenChange={setShowTutorialViewer}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Play className="h-5 w-5" />
              <span>{selectedTutorial?.title}</span>
            </DialogTitle>
            <DialogDescription>
              {selectedTutorial?.description}
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[70vh]">
            <div className="space-y-6">
              {/* Video Player Area */}
              <div className="aspect-video bg-bg-secondary rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Play className="h-16 w-16 mx-auto mb-4 text-black" />
                  <p className="text-sm text-muted-foreground">Video player would be embedded here</p>
                  <p className="text-xs text-muted-foreground mt-2">Duration: {selectedTutorial?.duration}</p>
                </div>
              </div>
              
              {/* Tutorial Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span className="text-sm">{selectedTutorial?.instructor}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{selectedTutorial?.rating}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Eye className="h-4 w-4" />
                    <span className="text-sm">{selectedTutorial?.views}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleBookmarkTutorial(selectedTutorial)}
                  >
                    <Bookmark className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleShareTutorial(selectedTutorial)}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Progress */}
              {selectedTutorial?.progress > 0 && (
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span>Progress</span>
                    <span>{selectedTutorial.progress}%</span>
                  </div>
                  <Progress value={selectedTutorial.progress} className="h-2" />
                </div>
              )}

              {/* Tutorial Content */}
              <div className="prose dark:prose-invert max-w-none">
                <h3>Tutorial Overview</h3>
                <p>{selectedTutorial?.description}</p>
                <h4>What you'll learn:</h4>
                <ul>
                  <li>Core concepts and fundamentals</li>
                  <li>Hands-on practical examples</li>
                  <li>Best practices and tips</li>
                  <li>Common pitfalls to avoid</li>
                </ul>
                <h4>Prerequisites:</h4>
                <p>Basic understanding of PYX platform recommended but not required.</p>
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Series Viewer Modal */}
      <Dialog open={showSeriesViewer} onOpenChange={setShowSeriesViewer}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5" />
              <span>{selectedSeries?.title}</span>
            </DialogTitle>
            <DialogDescription>
              {selectedSeries?.description}
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[70vh]">
            <div className="space-y-6">
              {/* Series Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{selectedSeries?.totalLessons}</div>
                  <div className="text-sm text-muted-foreground">Lessons</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{selectedSeries?.totalDuration}</div>
                  <div className="text-sm text-muted-foreground">Duration</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{selectedSeries?.progress}%</div>
                  <div className="text-sm text-muted-foreground">Complete</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{selectedSeries?.instructor}</div>
                  <div className="text-sm text-muted-foreground">Instructor</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span>Course Progress</span>
                  <span>{selectedSeries?.progress}%</span>
                </div>
                <Progress value={selectedSeries?.progress} className="h-3" />
              </div>

              {/* Lessons List */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Course Lessons</h3>
                {selectedSeries?.lessons?.map((lesson: any) => (
                  <Card key={lesson.id} className="p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        {lesson.completed ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <Circle className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{lesson.title}</div>
                        <div className="text-sm text-muted-foreground">{lesson.duration}</div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Play className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Learning Path Viewer Modal */}
      <Dialog open={showLearningPathViewer} onOpenChange={setShowLearningPathViewer}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <GraduationCap className="h-5 w-5" />
              <span>{selectedLearningPath?.title}</span>
            </DialogTitle>
            <DialogDescription>
              {selectedLearningPath?.description}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            {/* Path Info */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{selectedLearningPath?.modules}</div>
                <div className="text-sm text-muted-foreground">Modules</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{selectedLearningPath?.duration}</div>
                <div className="text-sm text-muted-foreground">Duration</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <Badge className={getDifficultyColor(selectedLearningPath?.difficulty || '')}>
                  {selectedLearningPath?.difficulty}
                </Badge>
                <div className="text-sm text-muted-foreground mt-1">Level</div>
              </div>
            </div>

            {/* Path Description */}
            <div className="prose dark:prose-invert max-w-none">
              <p>This learning path will guide you through:</p>
              <ul>
                <li>Foundational concepts and theory</li>
                <li>Hands-on practical exercises</li>
                <li>Real-world project examples</li>
                <li>Advanced techniques and optimization</li>
              </ul>
            </div>

            {/* CTA */}
            <div className="flex space-x-3">
              <Button className="flex-1 bg-gradient-to-r from-[#FF620A] to-[#993B06]">
                <Play className="h-4 w-4 mr-2" />
                Start Learning Path
              </Button>
              <Button variant="outline">
                <Bookmark className="h-4 w-4 mr-2" />
                Save for Later
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Filter Dialog */}
      <Dialog open={showFilterDialog} onOpenChange={setShowFilterDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Filter Tutorials</DialogTitle>
            <DialogDescription>
              Customize your learning experience
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {/* Difficulty Filter */}
            <div>
              <label className="text-sm font-medium mb-2 block">Difficulty Level</label>
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Type Filter */}
            <div>
              <label className="text-sm font-medium mb-2 block">Content Type</label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="interactive">Interactive</SelectItem>
                  <SelectItem value="article">Article</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Sort Filter */}
            <div>
              <label className="text-sm font-medium mb-2 block">Sort By</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="duration">Duration</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex space-x-3 pt-4">
              <Button onClick={handleFilterApply} className="flex-1">
                Apply Filters
              </Button>
              <Button variant="outline" onClick={handleClearFilters}>
                Clear All
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}