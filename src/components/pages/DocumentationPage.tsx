'use client'

import { useState } from 'react'
import { Button } from '../common/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../common/ui/card'
import { Badge } from '../common/ui/badge'
import { Input } from '../common/ui/input'
import { Tabs, TabsList, TabsTrigger } from '../common/ui/tabs'
// import { Separator } from '../common/ui/separator'
import { 
  BookOpen,
  Search,
  Code,
  Zap,
  Shield,
  // Globe,
  Copy,
  CheckCircle,
  ArrowRight,
  // FileText,
  // Download,
  // Github,
  PlayCircle,
  Clock,
  Users,
  MessageSquare,
  // Star,
  Video,
  Lightbulb,
  // Settings,
  // Workflow,
  // Terminal,
  // Database,
  Webhook,
  // Key,
  // AlertCircle,
  // ChevronRight,
  ExternalLink,
  Bookmark,
  Heart,
  Eye
} from 'lucide-react'

interface DocumentationPageProps {
  onViewChange: (view: string) => void
  isLoggedIn: boolean
  onShowAuth: (mode: 'login' | 'signup') => void
}

export function DocumentationPage({ onViewChange, isLoggedIn, onShowAuth }: DocumentationPageProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const categories = [
    { id: 'all', name: 'All Docs', icon: BookOpen, count: 45 },
    { id: 'quickstart', name: 'Quick Start', icon: Zap, count: 8 },
    { id: 'guides', name: 'Guides', icon: Lightbulb, count: 12 },
    { id: 'api', name: 'API Reference', icon: Code, count: 15 },
    { id: 'integrations', name: 'Integrations', icon: Webhook, count: 6 },
    { id: 'security', name: 'Security', icon: Shield, count: 4 }
  ]

  const documentationItems = [
    // Quick Start
    {
      id: 'getting-started',
      title: 'Getting Started with PYX',
      description: 'Learn the basics of PYX and create your first AI agent in under 5 minutes.',
      category: 'quickstart',
      duration: '5 min',
      difficulty: 'Beginner',
      popular: true,
      updated: '2 days ago',
      tags: ['setup', 'basics', 'first-steps']
    },
    {
      id: 'api-keys',
      title: 'API Keys & Authentication',
      description: 'How to generate and manage your API keys for secure authentication.',
      category: 'quickstart',
      duration: '3 min',
      difficulty: 'Beginner',
      popular: true,
      updated: '1 week ago',
      tags: ['authentication', 'security', 'keys']
    },
    {
      id: 'first-agent',
      title: 'Creating Your First Agent',
      description: 'Step-by-step guide to building and deploying your first AI agent.',
      category: 'quickstart',
      duration: '10 min',
      difficulty: 'Beginner',
      popular: true,
      updated: '3 days ago',
      tags: ['agents', 'creation', 'deployment']
    },

    // Guides
    {
      id: 'agent-types',
      title: 'Understanding Agent Types',
      description: 'Comprehensive guide to different AI agent types and their use cases.',
      category: 'guides',
      duration: '15 min',
      difficulty: 'Intermediate',
      popular: true,
      updated: '1 week ago',
      tags: ['agents', 'types', 'use-cases']
    },
    {
      id: 'workflow-automation',
      title: 'Workflow Automation Best Practices',
      description: 'Learn how to design efficient workflows and automate complex processes.',
      category: 'guides',
      duration: '20 min',
      difficulty: 'Intermediate',
      popular: false,
      updated: '4 days ago',
      tags: ['workflows', 'automation', 'best-practices']
    },
    {
      id: 'integration-patterns',
      title: 'Integration Patterns & Strategies',
      description: 'Common patterns for integrating PYX with your existing systems.',
      category: 'guides',
      duration: '25 min',
      difficulty: 'Advanced',
      popular: false,
      updated: '1 week ago',
      tags: ['integrations', 'patterns', 'architecture']
    },

    // API Reference
    {
      id: 'api-overview',
      title: 'API Overview',
      description: 'Complete overview of the PYX REST API with examples and best practices.',
      category: 'api',
      duration: '12 min',
      difficulty: 'Intermediate',
      popular: true,
      updated: '2 days ago',
      tags: ['api', 'rest', 'overview']
    },
    {
      id: 'agents-api',
      title: 'Agents API Reference',
      description: 'Detailed reference for all agent-related API endpoints and operations.',
      category: 'api',
      duration: '18 min',
      difficulty: 'Intermediate',
      popular: true,
      updated: '1 week ago',
      tags: ['api', 'agents', 'reference']
    },
    {
      id: 'workflows-api',
      title: 'Workflows API Reference',
      description: 'Complete reference for workflow management and execution APIs.',
      category: 'api',
      duration: '22 min',
      difficulty: 'Advanced',
      popular: false,
      updated: '3 days ago',
      tags: ['api', 'workflows', 'reference']
    },

    // Integrations
    {
      id: 'shopify-integration',
      title: 'Shopify Integration Guide',
      description: 'Connect PYX with Shopify for automated e-commerce workflows.',
      category: 'integrations',
      duration: '15 min',
      difficulty: 'Intermediate',
      popular: true,
      updated: '2 days ago',
      tags: ['shopify', 'e-commerce', 'integration']
    },
    {
      id: 'slack-integration',
      title: 'Slack Integration Setup',
      description: 'Integrate PYX with Slack for team notifications and collaboration.',
      category: 'integrations',
      duration: '8 min',
      difficulty: 'Beginner',
      popular: true,
      updated: '1 week ago',
      tags: ['slack', 'notifications', 'team']
    },

    // Security
    {
      id: 'security-overview',
      title: 'Security Best Practices',
      description: 'Essential security practices for protecting your PYX implementation.',
      category: 'security',
      duration: '20 min',
      difficulty: 'Intermediate',
      popular: false,
      updated: '1 week ago',
      tags: ['security', 'best-practices', 'protection']
    },
    {
      id: 'data-privacy',
      title: 'Data Privacy & Compliance',
      description: 'Understanding data handling, privacy, and compliance requirements.',
      category: 'security',
      duration: '25 min',
      difficulty: 'Advanced',
      popular: false,
      updated: '2 weeks ago',
      tags: ['privacy', 'compliance', 'data']
    }
  ]

  const filteredDocs = documentationItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleGetStarted = () => {
    if (isLoggedIn) {
      onViewChange('dashboard')
    } else {
      onShowAuth('signup')
    }
  }

  const quickActions = [
    {
      title: 'API Reference',
      description: 'Complete API documentation',
      icon: Code,
      action: () => onViewChange('api-docs')
    },
    {
      title: 'Tutorials',
      description: 'Step-by-step tutorials',
      icon: Video,
      action: () => onViewChange('tutorials')
    },
    {
      title: 'Community',
      description: 'Join our community',
      icon: Users,
      action: () => onViewChange('community-forum')
    },
    {
      title: 'Support',
      description: 'Get help from experts',
      icon: MessageSquare,
      action: () => onViewChange('premium-support')
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-[#FFE8DC] via-[#FFD4BD] to-[#FCD2BD]

 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-pink-950/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-gradient-to-r from-[#FF620A] to-[#993B06] text-white">
              <BookOpen className="h-3 w-3 mr-1" />
              Developer Documentation
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Everything You Need to{' '}
              <span className="bg-gradient-to-r from-[#FF620A] to-[#993B06] bg-clip-text text-transparent">
                Build with PYX
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Comprehensive guides, tutorials, and references to help you integrate 
              AI agents into your applications and workflows.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="Search documentation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 text-base md:text-lg border-2 w-full"
              />
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {quickActions.map((action) => {
                const IconComponent = action.icon
                return (
                  <Button
                    key={action.title}
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-primary/5"
                    onClick={action.action}
                  >
                    <IconComponent className="h-6 w-6" />
                    <div className="text-center">
                      <div className="font-medium text-sm">{action.title}</div>
                      <div className="text-xs text-muted-foreground">{action.description}</div>
                    </div>
                  </Button>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Documentation Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            {/* Category Tabs */}
            <TabsList className="flex flex-wrap justify-center gap-2 h-auto bg-transparent p-2 mb-12 md:grid md:grid-cols-3 lg:grid-cols-6 lg:gap-0">
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

            {/* Documentation Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
              {filteredDocs.map((doc) => (
                <Card key={doc.id} className="hover:shadow-lg transition-all duration-300 group flex flex-col h-full">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {doc.title}
                      </CardTitle>
                      {doc.popular && (
                        <Badge className="bg-gradient-to-r from-[#FF620A] to-[#993B06] text-white text-xs flex-shrink-0">
                          Popular
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="text-sm leading-relaxed line-clamp-2">
                      {doc.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="flex-1 flex flex-col">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{doc.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Badge variant="outline" className="text-xs">
                          {doc.difficulty}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {doc.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                      <span>Updated {doc.updated}</span>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                          <Bookmark className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                          <Heart className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-auto">
                      <Button 
                        className="flex-1 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all"
                        onClick={() => {/* Navigate to specific doc */}}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Read Doc
                      </Button>
                      <Button variant="outline" size="icon" className="flex-shrink-0">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredDocs.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-xl font-semibold mb-2">No documentation found</h3>
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
          </Tabs>
        </div>
      </section>

      {/* Featured Tutorials */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Tutorials</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              In-depth video tutorials to help you master PYX and build amazing AI-powered applications.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Building Your First E-commerce Agent',
                description: 'Complete walkthrough of creating an AI agent for automated customer support.',
                duration: '45 min',
                difficulty: 'Beginner',
                views: '12.5K',
                thumbnail: '🛒'
              },
              {
                title: 'Advanced Workflow Automation',
                description: 'Learn to create complex multi-step workflows with conditional logic.',
                duration: '32 min',
                difficulty: 'Advanced',
                views: '8.2K',
                thumbnail: '⚙️'
              },
              {
                title: 'API Integration Masterclass',
                description: 'Deep dive into API integrations and custom connector development.',
                duration: '28 min',
                difficulty: 'Intermediate',
                views: '15.7K',
                thumbnail: '🔗'
              }
            ].map((tutorial, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 group">
                <CardHeader>
                  <div className="text-6xl mb-4 text-center">{tutorial.thumbnail}</div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {tutorial.title}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {tutorial.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{tutorial.duration}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {tutorial.difficulty}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      <span>{tutorial.views}</span>
                    </div>
                  </div>
                  <Button className="w-full group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all">
                    <PlayCircle className="h-4 w-4 mr-2" />
                    Watch Tutorial
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Code Examples</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ready-to-use code snippets and examples to accelerate your development.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Create Agent - JavaScript</span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(`// Create a new agent
const agent = await PYX.agents.create({
  name: 'Customer Support Agent',
  type: 'customer_support',
  configuration: {
    model: 'gpt-4',
    temperature: 0.7
  }
});`, 'js-agent')}
                  >
                    {copiedCode === 'js-agent' ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-lg">
                  <pre className="text-sm overflow-x-auto">
                    <code>{`// Create a new agent
const agent = await PYX.agents.create({
  name: 'Customer Support Agent',
  type: 'customer_support',
  configuration: {
    model: 'gpt-4',
    temperature: 0.7
  }
});`}</code>
                  </pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Execute Workflow - Python</span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(`# Execute a workflow
result = client.workflows.execute(
    workflow_id="wf_123",
    inputs={
        "customer_email": "user@example.com",
        "product_id": "prod_456"
    }
)`, 'py-workflow')}
                  >
                    {copiedCode === 'py-workflow' ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-lg">
                  <pre className="text-sm overflow-x-auto">
                    <code>{`# Execute a workflow
result = client.workflows.execute(
    workflow_id="wf_123",
    inputs={
        "customer_email": "user@example.com",
        "product_id": "prod_456"
    }
)`}</code>
                  </pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#FF620A] to-[#993B06]
 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Start Building?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of developers using PYX to create intelligent automation solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-lg mx-auto">
              <Button 
                size="lg" 
                variant="secondary"
                className="w-full sm:w-auto"
                onClick={handleGetStarted}
              >
                <Zap className="h-4 w-4 mr-2" />
                Get Started Free
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-primary w-full sm:w-auto"
                onClick={() => onViewChange('api-docs')}
              >
                <Code className="h-4 w-4 mr-2" />
                View API Docs
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}