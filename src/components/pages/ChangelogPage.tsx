'use client'

import { useState } from 'react'
import { Button } from '../common/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../common/ui/card'
import { Badge } from '../common/ui/badge'
import { Input } from '../common/ui/input'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '../common/ui/tabs'
// import { Separator } from '../common/ui/separator'
import { 
  Calendar,
  Search,
  // Star,
  Bug,
  // Zap,
  Shield,
  // Settings,
  // Code,
  Sparkles,
  ArrowRight,
  // Plus,
  // Minus,
  AlertTriangle,
  CheckCircle,
  Clock,
  GitCommit,
  Tag,
  Rocket,
  // Wrench,
  // Eye,
  // Heart,
  Download,
  ExternalLink,
  BookOpen,
  // Users,
  TrendingUp,
  // Database,
  // Globe,
  // Terminal,
  // Workflow,
  // MessageSquare,
  Filter,
  ChevronDown,
  ChevronRight,
  Info,
  // Lightbulb,
  // Target,
  // Gem
} from 'lucide-react'

interface ChangelogPageProps {
  onViewChange: (view: string) => void
  isLoggedIn: boolean
  onShowAuth: (mode: 'login' | 'signup') => void
}

export function ChangelogPage({ onViewChange, isLoggedIn, onShowAuth }: ChangelogPageProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [expandedVersions, setExpandedVersions] = useState<string[]>(['v1.2.0'])

  const categories = [
    { id: 'all', name: 'All Updates', icon: Calendar, count: 47 },
    { id: 'features', name: 'New Features', icon: Sparkles, count: 18 },
    { id: 'improvements', name: 'Improvements', icon: TrendingUp, count: 15 },
    { id: 'fixes', name: 'Bug Fixes', icon: Bug, count: 12 },
    { id: 'security', name: 'Security', icon: Shield, count: 2 }
  ]

  const changelog = [
    {
      version: 'v1.2.0',
      title: 'Advanced Workflow Automation',
      date: '2024-01-15',
      type: 'major',
      status: 'latest',
      summary: 'Major update introducing advanced workflow capabilities, custom node development, and enterprise security features.',
      changes: [
        {
          category: 'features',
          title: 'Custom Node Development SDK',
          description: 'Developers can now create custom nodes using our comprehensive SDK with TypeScript support and hot reloading.',
          impact: 'high',
          items: [
            'Visual node editor with drag-and-drop interface',
            'TypeScript SDK with full type definitions',
            'Hot reloading for faster development',
            'Built-in testing framework for custom nodes',
            'Marketplace integration for sharing custom nodes'
          ]
        },
        {
          category: 'features',
          title: 'Advanced Workflow Templates',
          description: 'Pre-built workflow templates for common e-commerce scenarios including customer support, inventory management, and marketing automation.',
          impact: 'high',
          items: [
            '15+ new workflow templates',
            'Shopify, WooCommerce, and Magento integrations',
            'Advanced conditional logic support',
            'Multi-step approval workflows',
            'Automated testing for workflow reliability'
          ]
        },
        {
          category: 'features',
          title: 'Enterprise Security Suite',
          description: 'Comprehensive security features for enterprise deployments including SSO, audit logs, and data encryption.',
          impact: 'high',
          items: [
            'Single Sign-On (SSO) with SAML 2.0',
            'Comprehensive audit logging',
            'End-to-end data encryption',
            'Role-based access control (RBAC)',
            'Compliance dashboard for SOC 2 and GDPR'
          ]
        },
        {
          category: 'improvements',
          title: 'Performance Optimizations',
          description: 'Significant performance improvements across the platform reducing load times by 40% and increasing throughput by 60%.',
          impact: 'medium',
          items: [
            '40% faster page load times',
            '60% increase in API throughput',
            'Optimized database queries',
            'Improved caching mechanisms',
            'Reduced memory usage by 25%'
          ]
        },
        {
          category: 'improvements',
          title: 'Enhanced Developer Experience',
          description: 'Improved debugging tools, better error messages, and enhanced documentation for developers.',
          impact: 'medium',
          items: [
            'Interactive API explorer',
            'Real-time debugging console',
            'Improved error messages with suggestions',
            'Enhanced code examples in documentation',
            'VS Code extension for QAID development'
          ]
        },
        {
          category: 'fixes',
          title: 'Webhook Reliability Improvements',
          description: 'Fixed intermittent webhook delivery issues and improved retry mechanisms.',
          impact: 'high',
          items: [
            'Fixed webhook delivery failures',
            'Implemented exponential backoff for retries',
            'Added webhook delivery status monitoring',
            'Improved error handling for failed webhooks'
          ]
        }
      ],
      migration: {
        required: true,
        description: 'This update includes breaking changes to the API. Please review the migration guide.',
        steps: [
          'Update API client libraries to v1.2.0',
          'Review custom integrations for compatibility',
          'Test workflows in staging environment',
          'Update webhook endpoints if using custom handlers'
        ]
      }
    },
    {
      version: 'v1.1.8',
      title: 'Integration Enhancements',
      date: '2024-01-08',
      type: 'minor',
      status: 'stable',
      summary: 'Enhanced integrations with popular e-commerce platforms and improved API rate limiting.',
      changes: [
        {
          category: 'features',
          title: 'New Platform Integrations',
          description: 'Added support for BigCommerce, Square, and Stripe Connect with comprehensive webhook support.',
          impact: 'medium',
          items: [
            'BigCommerce API integration',
            'Square payment processing integration',
            'Stripe Connect marketplace support',
            'Enhanced webhook management'
          ]
        },
        {
          category: 'improvements',
          title: 'API Rate Limiting Improvements',
          description: 'Implemented intelligent rate limiting with burst capacity and improved error responses.',
          impact: 'medium',
          items: [
            'Intelligent rate limiting with burst capacity',
            'Better rate limit error responses',
            'Per-endpoint rate limit configuration',
            'Rate limit monitoring dashboard'
          ]
        },
        {
          category: 'fixes',
          title: 'Authentication Bug Fixes',
          description: 'Fixed OAuth token refresh issues and improved session management.',
          impact: 'high',
          items: [
            'Fixed OAuth token refresh mechanism',
            'Improved session timeout handling',
            'Fixed API key generation issues',
            'Enhanced security token validation'
          ]
        }
      ],
      migration: {
        required: false,
        description: 'No breaking changes in this release.',
        steps: []
      }
    },
    {
      version: 'v1.1.7',
      title: 'UI/UX Improvements',
      date: '2024-01-01',
      type: 'minor',
      status: 'stable',
      summary: 'Major user interface improvements, dark mode support, and enhanced mobile experience.',
      changes: [
        {
          category: 'features',
          title: 'Dark Mode Support',
          description: 'Complete dark mode implementation across all pages with automatic theme detection.',
          impact: 'medium',
          items: [
            'System-wide dark mode support',
            'Automatic theme detection',
            'Theme persistence across sessions',
            'High contrast mode for accessibility'
          ]
        },
        {
          category: 'improvements',
          title: 'Mobile Experience Enhancements',
          description: 'Improved mobile responsiveness and touch interactions across all components.',
          impact: 'medium',
          items: [
            'Enhanced mobile navigation',
            'Improved touch interactions',
            'Better responsive layouts',
            'Mobile-optimized workflow builder'
          ]
        },
        {
          category: 'improvements',
          title: 'Dashboard Redesign',
          description: 'Redesigned dashboard with better data visualization and improved navigation.',
          impact: 'medium',
          items: [
            'New dashboard layout with better data visualization',
            'Improved navigation and user flows',
            'Enhanced charts and analytics',
            'Customizable dashboard widgets'
          ]
        }
      ],
      migration: {
        required: false,
        description: 'No migration required for this release.',
        steps: []
      }
    },
    {
      version: 'v1.1.6',
      title: 'Security & Performance',
      date: '2023-12-22',
      type: 'patch',
      status: 'stable',
      summary: 'Critical security updates and performance optimizations.',
      changes: [
        {
          category: 'security',
          title: 'Security Vulnerability Patches',
          description: 'Fixed critical security vulnerabilities and enhanced data protection measures.',
          impact: 'critical',
          items: [
            'Fixed XSS vulnerability in workflow editor',
            'Enhanced input validation across all forms',
            'Improved session security',
            'Updated dependencies with security patches'
          ]
        },
        {
          category: 'improvements',
          title: 'Database Performance Optimizations',
          description: 'Optimized database queries and improved indexing for better performance.',
          impact: 'medium',
          items: [
            'Optimized database queries',
            'Improved indexing strategy',
            'Enhanced caching mechanisms',
            'Reduced database connection overhead'
          ]
        },
        {
          category: 'fixes',
          title: 'Workflow Execution Fixes',
          description: 'Fixed issues with workflow execution and improved error handling.',
          impact: 'high',
          items: [
            'Fixed workflow execution timeouts',
            'Improved error handling in workflows',
            'Fixed memory leaks in long-running workflows',
            'Enhanced workflow debugging capabilities'
          ]
        }
      ],
      migration: {
        required: true,
        description: 'Security update requires immediate action.',
        steps: [
          'Update all API clients to latest version',
          'Regenerate API keys if compromised',
          'Review and update webhook security'
        ]
      }
    },
    {
      version: 'v1.1.5',
      title: 'Developer Tools & API Enhancements',
      date: '2023-12-15',
      type: 'minor',
      status: 'stable',
      summary: 'Enhanced developer tools, improved API documentation, and new testing capabilities.',
      changes: [
        {
          category: 'features',
          title: 'Interactive API Documentation',
          description: 'New interactive API documentation with try-it-out functionality and code generation.',
          impact: 'medium',
          items: [
            'Interactive API explorer',
            'Automatic code generation in multiple languages',
            'Real-time API testing',
            'Enhanced examples and tutorials'
          ]
        },
        {
          category: 'features',
          title: 'Testing Lab Environment',
          description: 'Dedicated testing environment for workflows with mock data and simulation capabilities.',
          impact: 'medium',
          items: [
            'Dedicated testing environment',
            'Mock data generation',
            'Workflow simulation capabilities',
            'A/B testing support for workflows'
          ]
        },
        {
          category: 'improvements',
          title: 'Error Handling Improvements',
          description: 'Better error messages, improved logging, and enhanced debugging capabilities.',
          impact: 'medium',
          items: [
            'More descriptive error messages',
            'Enhanced logging and monitoring',
            'Improved debugging tools',
            'Better error recovery mechanisms'
          ]
        }
      ],
      migration: {
        required: false,
        description: 'Optional migration to take advantage of new features.',
        steps: [
          'Update SDK to access new testing features',
          'Review error handling in existing workflows'
        ]
      }
    }
  ]

  const filteredChangelog = changelog.filter(version => {
    const matchesSearch = version.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         version.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         version.changes.some(change => 
                           change.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           change.description.toLowerCase().includes(searchTerm.toLowerCase())
                         )
    
    const matchesCategory = selectedCategory === 'all' || 
                           version.changes.some(change => change.category === selectedCategory)
    
    return matchesSearch && matchesCategory
  })

  const toggleVersion = (version: string) => {
    setExpandedVersions(prev => 
      prev.includes(version) 
        ? prev.filter(v => v !== version)
        : [...prev, version]
    )
  }

  const handleGetStarted = () => {
    if (isLoggedIn) {
      onViewChange('dashboard')
    } else {
      onShowAuth('signup')
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'major': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'minor': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'patch': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'latest': return 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
      case 'stable': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'deprecated': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'features': return <Sparkles className="h-4 w-4" />
      case 'improvements': return <TrendingUp className="h-4 w-4" />
      case 'fixes': return <Bug className="h-4 w-4" />
      case 'security': return <Shield className="h-4 w-4" />
      default: return <Info className="h-4 w-4" />
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'critical': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-pink-950/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <GitCommit className="h-3 w-3 mr-1" />
              Platform Updates
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              What's New in{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                QAID
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Stay up to date with the latest features, improvements, and bug fixes. 
              We're constantly evolving to provide you with the best AI automation experience.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="Search changelog..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 text-base md:text-lg border-2 w-full"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-lg mx-auto">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 w-full sm:w-auto"
                onClick={handleGetStarted}
              >
                <Rocket className="h-4 w-4 mr-2" />
                Try Latest Features
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="w-full sm:w-auto"
                onClick={() => onViewChange('api-docs')}
              >
                <BookOpen className="h-4 w-4 mr-2" />
                API Documentation
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
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 mx-auto mb-4">
                <Tag className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl md:text-3xl font-bold mb-2">v1.2.0</div>
              <div className="font-medium text-foreground mb-1 text-sm md:text-base">Latest Version</div>
              <div className="text-xs md:text-sm text-muted-foreground">Released Jan 15</div>
            </div>
            <div className="text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-blue-600 mx-auto mb-4">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl md:text-3xl font-bold mb-2">47</div>
              <div className="font-medium text-foreground mb-1 text-sm md:text-base">Total Updates</div>
              <div className="text-xs md:text-sm text-muted-foreground">Last 6 months</div>
            </div>
            <div className="text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl md:text-3xl font-bold mb-2">85%</div>
              <div className="font-medium text-foreground mb-1 text-sm md:text-base">User Adoption</div>
              <div className="text-xs md:text-sm text-muted-foreground">Of latest features</div>
            </div>
            <div className="text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-red-600 mx-auto mb-4">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl md:text-3xl font-bold mb-2">2 weeks</div>
              <div className="font-medium text-foreground mb-1 text-sm md:text-base">Release Cycle</div>
              <div className="text-xs md:text-sm text-muted-foreground">Average frequency</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-6">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Filter Updates
                  </CardTitle>
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
            </div>

            {/* Changelog */}
            <div className="lg:col-span-3">
              <div className="space-y-8">
                {filteredChangelog.map((version) => {
                  const isExpanded = expandedVersions.includes(version.version)
                  
                  return (
                    <Card key={version.version} className="overflow-hidden">
                      <CardHeader 
                        className="cursor-pointer hover:bg-muted/50 transition-colors"
                        onClick={() => toggleVersion(version.version)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                              <Tag className="h-5 w-5" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <CardTitle className="text-xl">{version.version}</CardTitle>
                                <Badge className={getStatusColor(version.status)}>
                                  {version.status}
                                </Badge>
                                <Badge className={getTypeColor(version.type)}>
                                  {version.type}
                                </Badge>
                              </div>
                              <CardDescription className="text-lg font-medium">
                                {version.title}
                              </CardDescription>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-muted-foreground flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(version.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground mt-2">
                          {version.summary}
                        </p>
                      </CardHeader>

                      {isExpanded && (
                        <CardContent className="pt-0">
                          <div className="space-y-6">
                            {/* Migration Notice */}
                            {version.migration.required && (
                              <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                                <div className="flex items-start gap-3">
                                  <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                                      Migration Required
                                    </h4>
                                    <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-3">
                                      {version.migration.description}
                                    </p>
                                    {version.migration.steps.length > 0 && (
                                      <div>
                                        <div className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                                          Migration Steps:
                                        </div>
                                        <ol className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1 list-decimal list-inside">
                                          {version.migration.steps.map((step, index) => (
                                            <li key={index}>{step}</li>
                                          ))}
                                        </ol>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Changes */}
                            <div className="space-y-6">
                              {version.changes.map((change, changeIndex) => (
                                <div key={changeIndex} className="border-l-2 border-muted pl-6">
                                  <div className="flex items-start gap-3 mb-3">
                                    <div className="flex items-center gap-2">
                                      {getCategoryIcon(change.category)}
                                      <h4 className="font-semibold text-lg">{change.title}</h4>
                                    </div>
                                    <Badge className={getImpactColor(change.impact)} variant="outline">
                                      {change.impact} impact
                                    </Badge>
                                  </div>
                                  
                                  <p className="text-muted-foreground mb-3">
                                    {change.description}
                                  </p>
                                  
                                  <ul className="space-y-1">
                                    {change.items.map((item, itemIndex) => (
                                      <li key={itemIndex} className="flex items-start gap-2 text-sm">
                                        <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                                        <span>{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-4 border-t">
                              <Button variant="outline" size="sm">
                                <ExternalLink className="h-3 w-3 mr-1" />
                                Release Notes
                              </Button>
                              <Button variant="outline" size="sm">
                                <Download className="h-3 w-3 mr-1" />
                                Download
                              </Button>
                              {version.status === 'latest' && (
                                <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600">
                                  <Rocket className="h-3 w-3 mr-1" />
                                  Try Now
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      )}
                    </Card>
                  )
                })}
              </div>

              {filteredChangelog.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📋</div>
                  <h3 className="text-xl font-semibold mb-2">No updates found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your search or filter criteria.
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

      {/* Subscribe to Updates */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Get notified about new releases, features, and important updates.
            </p>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex gap-3">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-1"
                  />
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                    Subscribe
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-3">
                  We'll only send you important updates. No spam, unsubscribe anytime.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Experience the Latest?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Try the newest features and improvements in QAID. 
              Start building smarter automation workflows today.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-lg mx-auto">
              <Button 
                size="lg" 
                variant="secondary"
                className="w-full sm:w-auto"
                onClick={handleGetStarted}
              >
                <Rocket className="h-4 w-4 mr-2" />
                Get Started
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-primary w-full sm:w-auto"
                onClick={() => onViewChange('documentation')}
              >
                <BookOpen className="h-4 w-4 mr-2" />
                View Docs
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}