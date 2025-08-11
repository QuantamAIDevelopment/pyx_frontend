'use client'

import { useState } from 'react'
import { Button } from '../common/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../common/ui/card'
import { Badge } from '../common/ui/badge'
import { Input } from '../common/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../common/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '../common/ui/avatar'
import { 
  Github,
  Search,
  Bug,
  Lightbulb,
  AlertCircle,
  CheckCircle,
  Clock,
  MessageSquare,
  ThumbsUp,
  ArrowRight,
  Plus,
  // Filter,
  ExternalLink,
  Eye,
  GitBranch,
  // Calendar,
  // User,
  // Code,
  FileText,
  Shield,
  // Zap,
  Star,
  // BookOpen,
  // Settings,
  // Database,
  // Globe,
  // Terminal,
  // Workflow,
  Users,
  // Heart,
  Download,
  // Tag,
  GitCommit,
  // GitMerge,
  Milestone
} from 'lucide-react'

interface GitHubIssuesPageProps {
  onViewChange: (view: string) => void
  isLoggedIn: boolean
  onShowAuth: (mode: 'login' | 'signup') => void
}

export function GitHubIssuesPage({ onViewChange }: GitHubIssuesPageProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTab, setSelectedTab] = useState('issues')

  const issues = [
    {
      id: '#1247',
      title: 'Webhook integration intermittently fails with Shopify',
      description: 'Webhook events from Shopify are not being received consistently. About 30% of events are missing, causing order processing delays.',
      type: 'bug',
      status: 'open',
      priority: 'high',
      author: {
        name: 'david-park',
        avatar: '/api/placeholder/32/32'
      },
      assignee: {
        name: 'PYX-bot',
        avatar: '/api/placeholder/32/32'
      },
      labels: ['bug', 'webhook', 'shopify', 'high-priority'],
      comments: 8,
      reactions: 12,
      createdAt: '2 days ago',
      updatedAt: '4 hours ago',
      milestone: 'v1.2.0'
    },
    {
      id: '#1246',
      title: 'Feature: Add batch processing for large datasets',
      description: 'It would be beneficial to have native batch processing capabilities for handling large CSV files and bulk operations.',
      type: 'feature',
      status: 'open',
      priority: 'medium',
      author: {
        name: 'alex-kumar',
        avatar: '/api/placeholder/32/32'
      },
      assignee: null,
      labels: ['feature', 'enhancement', 'batch-processing'],
      comments: 15,
      reactions: 23,
      createdAt: '1 week ago',
      updatedAt: '2 days ago',
      milestone: 'Backlog'
    },
    {
      id: '#1245',
      title: 'Documentation: Add examples for custom node development',
      description: 'The current documentation lacks practical examples for creating custom nodes. Adding code examples would help developers.',
      type: 'documentation',
      status: 'open',
      priority: 'low',
      author: {
        name: 'sarah-chen',
        avatar: '/api/placeholder/32/32'
      },
      assignee: {
        name: 'PYX-docs',
        avatar: '/api/placeholder/32/32'
      },
      labels: ['documentation', 'examples', 'custom-nodes'],
      comments: 5,
      reactions: 8,
      createdAt: '3 days ago',
      updatedAt: '1 day ago',
      milestone: 'v1.1.5'
    },
    {
      id: '#1244',
      title: 'API rate limiting returns incorrect error codes',
      description: 'When hitting rate limits, the API returns 500 instead of 429. This makes it difficult to implement proper retry logic.',
      type: 'bug',
      status: 'closed',
      priority: 'medium',
      author: {
        name: 'emma-thompson',
        avatar: '/api/placeholder/32/32'
      },
      assignee: {
        name: 'PYX-api',
        avatar: '/api/placeholder/32/32'
      },
      labels: ['bug', 'api', 'rate-limiting', 'fixed'],
      comments: 12,
      reactions: 7,
      createdAt: '2 weeks ago',
      updatedAt: '1 week ago',
      milestone: 'v1.1.4'
    },
    {
      id: '#1243',
      title: 'Security: Implement OAuth 2.0 PKCE flow',
      description: 'For better security in public clients, we should implement OAuth 2.0 with PKCE (Proof Key for Code Exchange).',
      type: 'security',
      status: 'in-progress',
      priority: 'high',
      author: {
        name: 'marcus-rodriguez',
        avatar: '/api/placeholder/32/32'
      },
      assignee: {
        name: 'PYX-security',
        avatar: '/api/placeholder/32/32'
      },
      labels: ['security', 'oauth', 'authentication', 'pkce'],
      comments: 18,
      reactions: 15,
      createdAt: '1 month ago',
      updatedAt: '3 days ago',
      milestone: 'v1.2.0'
    }
  ]

  const pullRequests = [
    {
      id: '#156',
      title: 'Fix webhook retry mechanism for failed deliveries',
      description: 'Implements exponential backoff for webhook retries and improves error handling',
      status: 'open',
      author: {
        name: 'PYX-bot',
        avatar: '/api/placeholder/32/32'
      },
      reviewers: ['PYX-api', 'PYX-security'],
      labels: ['bug-fix', 'webhook', 'retry-logic'],
      comments: 4,
      commits: 8,
      additions: 127,
      deletions: 43,
      createdAt: '1 day ago',
      updatedAt: '6 hours ago',
      checks: {
        passed: 12,
        failed: 0,
        pending: 1
      }
    },
    {
      id: '#155',
      title: 'Add batch processing endpoints to API',
      description: 'Implements new endpoints for handling batch operations on large datasets',
      status: 'draft',
      author: {
        name: 'alex-kumar',
        avatar: '/api/placeholder/32/32'
      },
      reviewers: ['PYX-api'],
      labels: ['feature', 'api', 'batch-processing'],
      comments: 2,
      commits: 15,
      additions: 423,
      deletions: 12,
      createdAt: '3 days ago',
      updatedAt: '2 days ago',
      checks: {
        passed: 8,
        failed: 2,
        pending: 3
      }
    },
    {
      id: '#154',
      title: 'Update custom node documentation with examples',
      description: 'Adds comprehensive examples and tutorials for custom node development',
      status: 'merged',
      author: {
        name: 'PYX-docs',
        avatar: '/api/placeholder/32/32'
      },
      reviewers: ['sarah-chen', 'PYX-team'],
      labels: ['documentation', 'examples'],
      comments: 6,
      commits: 5,
      additions: 234,
      deletions: 18,
      createdAt: '1 week ago',
      updatedAt: '4 days ago',
      checks: {
        passed: 15,
        failed: 0,
        pending: 0
      }
    }
  ]

  const repositories = [
    {
      name: 'PYX-api',
      description: 'Official PYX REST API and backend services',
      language: 'TypeScript',
      stars: 1234,
      forks: 89,
      issues: 23,
      prs: 8,
      isPublic: true
    },
    {
      name: 'PYX-sdk-js',
      description: 'JavaScript/TypeScript SDK for PYX API',
      language: 'TypeScript',
      stars: 567,
      forks: 45,
      issues: 12,
      prs: 3,
      isPublic: true
    },
    {
      name: 'PYX-sdk-python',
      description: 'Python SDK for PYX API',
      language: 'Python',
      stars: 432,
      forks: 34,
      issues: 8,
      prs: 2,
      isPublic: true
    },
    {
      name: 'PYX-examples',
      description: 'Code examples and sample applications',
      language: 'JavaScript',
      stars: 789,
      forks: 156,
      issues: 5,
      prs: 12,
      isPublic: true
    },
    {
      name: 'PYX-docs',
      description: 'Official documentation and guides',
      language: 'MDX',
      stars: 234,
      forks: 67,
      issues: 15,
      prs: 4,
      isPublic: true
    }
  ]

  const filteredIssues = issues.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.labels.some(label => label.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesSearch
  })

  const filteredPRs = pullRequests.filter(pr => {
    const matchesSearch = pr.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pr.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pr.labels.some(label => label.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesSearch
  })

  // const handleGetStarted = () => {
  //   if (isLoggedIn) {
  //     onViewChange('dashboard')
  //   } else {
  //     onShowAuth('signup')
  //   }
  // }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'closed': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
      case 'in-progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'draft': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
      case 'merged': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'bug': return <Bug className="h-4 w-4" />
      case 'feature': return <Lightbulb className="h-4 w-4" />
      case 'documentation': return <FileText className="h-4 w-4" />
      case 'security': return <Shield className="h-4 w-4" />
      default: return <AlertCircle className="h-4 w-4" />
    }
  }

  const getLanguageColor = (language: string) => {
    switch (language) {
      case 'TypeScript': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'Python': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'JavaScript': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'MDX': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-[#FFE8DC] via-[#FFD4BD] to-[#FCD2BD]

 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-pink-950/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-gradient-to-r from-[#FF620A] to-[#993B06] text-white">
              <Github className="h-3 w-3 mr-1" />
              GitHub Issues & PRs
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Contribute to{' '}
              <span className="bg-gradient-to-r from-[#FF620A] to-[#993B06] bg-clip-text text-transparent">
                PYX Development
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Report bugs, request features, and contribute to the PYX platform. 
              Join our open-source community and help shape the future of AI automation.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="Search issues and pull requests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 text-base md:text-lg border-2 w-full"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-lg mx-auto">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-[#FF620A] to-[#993B06] w-full sm:w-auto"
                onClick={() => window.open('https://github.com/PYX-ai/PYX/issues/new', '_blank')}
              >
                <Plus className="h-4 w-4 mr-2" />
                Report Issue
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="w-full sm:w-auto"
                onClick={() => window.open('https://github.com/PYX-ai/PYX', '_blank')}
              >
                <Github className="h-4 w-4 mr-2" />
                View on GitHub
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
                <AlertCircle className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl md:text-3xl font-bold mb-2">47</div>
              <div className="font-medium text-foreground mb-1 text-sm md:text-base">Open Issues</div>
              <div className="text-xs md:text-sm text-muted-foreground">Active reports</div>
            </div>
            <div className="text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-blue-600 mx-auto mb-4">
                <GitBranch className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl md:text-3xl font-bold mb-2">23</div>
              <div className="font-medium text-foreground mb-1 text-sm md:text-base">Pull Requests</div>
              <div className="text-xs md:text-sm text-muted-foreground">Under review</div>
            </div>
            <div className="text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 mx-auto mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl md:text-3xl font-bold mb-2">156</div>
              <div className="font-medium text-foreground mb-1 text-sm md:text-base">Contributors</div>
              <div className="text-xs md:text-sm text-muted-foreground">Community members</div>
            </div>
            <div className="text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-red-600 mx-auto mb-4">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl md:text-3xl font-bold mb-2">4.2h</div>
              <div className="font-medium text-foreground mb-1 text-sm md:text-base">Avg Response</div>
              <div className="text-xs md:text-sm text-muted-foreground">Time to first response</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="issues">Issues</TabsTrigger>
              <TabsTrigger value="pulls">Pull Requests</TabsTrigger>
              <TabsTrigger value="repos">Repositories</TabsTrigger>
            </TabsList>

            {/* Issues Tab */}
            <TabsContent value="issues" className="mt-8">
              <div className="space-y-4">
                {filteredIssues.map((issue) => (
                  <Card key={issue.id} className="hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 mt-1">
                          {getTypeIcon(issue.type)}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-semibold text-lg hover:text-primary transition-colors cursor-pointer">
                                  {issue.title}
                                </h3>
                                <span className="text-sm text-muted-foreground">{issue.id}</span>
                              </div>
                              
                              <p className="text-muted-foreground mb-3 line-clamp-2">
                                {issue.description}
                              </p>
                              
                              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                                <div className="flex items-center gap-1">
                                  <Avatar className="h-4 w-4">
                                    <AvatarImage src={issue.author.avatar} alt={issue.author.name} />
                                    <AvatarFallback>{issue.author.name[0]}</AvatarFallback>
                                  </Avatar>
                                  <span>{issue.author.name}</span>
                                </div>
                                <span>opened {issue.createdAt}</span>
                                <div className="flex items-center gap-1">
                                  <MessageSquare className="h-3 w-3" />
                                  <span>{issue.comments}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <ThumbsUp className="h-3 w-3" />
                                  <span>{issue.reactions}</span>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-2 mb-3">
                                <Badge className={getStatusColor(issue.status)}>
                                  {issue.status}
                                </Badge>
                                <Badge className={getPriorityColor(issue.priority)}>
                                  {issue.priority}
                                </Badge>
                                {issue.milestone && (
                                  <Badge variant="outline" className="text-xs">
                                    <Milestone className="h-3 w-3 mr-1" />
                                    {issue.milestone}
                                  </Badge>
                                )}
                              </div>
                              
                              <div className="flex flex-wrap gap-1">
                                {issue.labels.map((label) => (
                                  <Badge key={label} variant="secondary" className="text-xs">
                                    {label}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              {issue.assignee && (
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={issue.assignee.avatar} alt={issue.assignee.name} />
                                  <AvatarFallback>{issue.assignee.name[0]}</AvatarFallback>
                                </Avatar>
                              )}
                              <Button size="sm" variant="outline">
                                <ExternalLink className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Pull Requests Tab */}
            <TabsContent value="pulls" className="mt-8">
              <div className="space-y-4">
                {filteredPRs.map((pr) => (
                  <Card key={pr.id} className="hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 mt-1">
                          <GitBranch className="h-4 w-4" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-semibold text-lg hover:text-primary transition-colors cursor-pointer">
                                  {pr.title}
                                </h3>
                                <span className="text-sm text-muted-foreground">{pr.id}</span>
                              </div>
                              
                              <p className="text-muted-foreground mb-3 line-clamp-2">
                                {pr.description}
                              </p>
                              
                              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                                <div className="flex items-center gap-1">
                                  <Avatar className="h-4 w-4">
                                    <AvatarImage src={pr.author.avatar} alt={pr.author.name} />
                                    <AvatarFallback>{pr.author.name[0]}</AvatarFallback>
                                  </Avatar>
                                  <span>{pr.author.name}</span>
                                </div>
                                <span>opened {pr.createdAt}</span>
                                <div className="flex items-center gap-1">
                                  <GitCommit className="h-3 w-3" />
                                  <span>{pr.commits} commits</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <MessageSquare className="h-3 w-3" />
                                  <span>{pr.comments}</span>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                                <div className="flex items-center gap-1">
                                  <span className="text-green-600">+{pr.additions}</span>
                                  <span className="text-red-600">-{pr.deletions}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="flex items-center gap-1">
                                    <CheckCircle className="h-3 w-3 text-green-500" />
                                    <span>{pr.checks.passed}</span>
                                  </div>
                                  {pr.checks.failed > 0 && (
                                    <div className="flex items-center gap-1">
                                      <AlertCircle className="h-3 w-3 text-red-500" />
                                      <span>{pr.checks.failed}</span>
                                    </div>
                                  )}
                                  {pr.checks.pending > 0 && (
                                    <div className="flex items-center gap-1">
                                      <Clock className="h-3 w-3 text-yellow-500" />
                                      <span>{pr.checks.pending}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-2 mb-3">
                                <Badge className={getStatusColor(pr.status)}>
                                  {pr.status}
                                </Badge>
                                <div className="flex items-center gap-1">
                                  <Eye className="h-3 w-3" />
                                  <span className="text-sm text-muted-foreground">
                                    {pr.reviewers.length} reviewer{pr.reviewers.length !== 1 ? 's' : ''}
                                  </span>
                                </div>
                              </div>
                              
                              <div className="flex flex-wrap gap-1">
                                {pr.labels.map((label) => (
                                  <Badge key={label} variant="secondary" className="text-xs">
                                    {label}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <div className="flex -space-x-2">
                                {pr.reviewers.slice(0, 3).map((reviewer) => (
                                  <Avatar key={reviewer} className="h-6 w-6 border-2 border-background">
                                    <AvatarImage src={`/api/placeholder/24/24`} alt={reviewer} />
                                    <AvatarFallback>{reviewer[0]}</AvatarFallback>
                                  </Avatar>
                                ))}
                              </div>
                              <Button size="sm" variant="outline">
                                <ExternalLink className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Repositories Tab */}
            <TabsContent value="repos" className="mt-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {repositories.map((repo) => (
                  <Card key={repo.name} className="hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <Github className="h-5 w-5" />
                        <CardTitle className="text-lg">{repo.name}</CardTitle>
                        {repo.isPublic && (
                          <Badge variant="outline" className="text-xs">
                            Public
                          </Badge>
                        )}
                      </div>
                      <CardDescription className="text-sm">
                        {repo.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <div className={`h-3 w-3 rounded-full ${getLanguageColor(repo.language).replace('text-', 'bg-').replace('dark:bg-', 'dark:text-')}`} />
                            <span>{repo.language}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3" />
                            <span>{repo.stars}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <GitBranch className="h-3 w-3" />
                            <span>{repo.forks}</span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            <span>{repo.issues} issues</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <GitBranch className="h-3 w-3" />
                            <span>{repo.prs} PRs</span>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            <Download className="h-3 w-3 mr-1" />
                            Clone
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#FF620A] to-[#993B06]
 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Contribute?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join our open-source community and help build the future of AI automation. 
              Every contribution makes a difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-lg mx-auto">
              <Button 
                size="lg" 
                variant="secondary"
                className="w-full sm:w-auto"
                onClick={() => window.open('https://github.com/PYX-ai/PYX/blob/main/CONTRIBUTING.md', '_blank')}
              >
                <Github className="h-4 w-4 mr-2" />
                Contributing Guide
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-primary w-full sm:w-auto"
                onClick={() => onViewChange('community-forum')}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Join Discussion
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}