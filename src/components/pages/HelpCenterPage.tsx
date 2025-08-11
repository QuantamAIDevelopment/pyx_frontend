'use client'

import { useState } from 'react'
import { Button } from '../common/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../common/ui/card'
import { Badge } from '../common/ui/badge'
import { Input } from '../common/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../common/ui/tabs'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../common/ui/accordion'
// import { Separator } from '../common/ui/separator'
import { 
  Search,
  HelpCircle,
  BookOpen,
  MessageCircle,
  Phone,
  Mail,
  Video,
  FileText,
  Users,
  CreditCard,
  Code,
  Zap,
  Clock,
  ArrowRight,
  Star,
  Lightbulb,
  Rocket,
  Globe,
  Workflow,
  Award,
  Activity
} from 'lucide-react'

interface HelpCenterPageProps {
  onViewChange: (view: string) => void
  isLoggedIn: boolean
  onShowAuth: (mode: 'login' | 'signup') => void
}

export function HelpCenterPage({ onViewChange, isLoggedIn, onShowAuth }: HelpCenterPageProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'All Topics', icon: HelpCircle, count: 48 },
    { id: 'getting-started', name: 'Getting Started', icon: Rocket, count: 12 },
    { id: 'agents', name: 'AI Agents', icon: Zap, count: 8 },
    { id: 'workflows', name: 'Workflows', icon: Workflow, count: 10 },
    { id: 'integrations', name: 'Integrations', icon: Globe, count: 6 },
    { id: 'billing', name: 'Billing & Plans', icon: CreditCard, count: 5 },
    { id: 'api', name: 'API & Development', icon: Code, count: 7 }
  ]

  const popularArticles = [
    {
      id: '1',
      title: 'How to create your first AI agent',
      description: 'Step-by-step guide to building and deploying your first AI agent in under 10 minutes.',
      category: 'getting-started',
      readTime: '8 min',
      views: '15.2K',
      rating: 4.9,
      updated: '2 days ago'
    },
    {
      id: '2',
      title: 'Understanding AI agent types and capabilities',
      description: 'Learn about different agent types and choose the right one for your business needs.',
      category: 'agents',
      readTime: '12 min',
      views: '8.7K',
      rating: 4.8,
      updated: '1 week ago'
    },
    {
      id: '3',
      title: 'Setting up Shopify integration',
      description: 'Connect your Shopify store with PYX for automated e-commerce workflows.',
      category: 'integrations',
      readTime: '6 min',
      views: '12.1K',
      rating: 4.7,
      updated: '3 days ago'
    },
    {
      id: '4',
      title: 'API authentication and rate limits',
      description: 'Complete guide to API keys, authentication, and managing rate limits.',
      category: 'api',
      readTime: '10 min',
      views: '6.3K',
      rating: 4.6,
      updated: '5 days ago'
    },
    {
      id: '5',
      title: 'Troubleshooting workflow failures',
      description: 'Common workflow issues and how to debug and resolve them effectively.',
      category: 'workflows',
      readTime: '15 min',
      views: '9.8K',
      rating: 4.8,
      updated: '1 week ago'
    },
    {
      id: '6',
      title: 'Upgrading and managing your subscription',
      description: 'How to upgrade, downgrade, and manage your PYX subscription plan.',
      category: 'billing',
      readTime: '5 min',
      views: '4.2K',
      rating: 4.5,
      updated: '4 days ago'
    }
  ]

  const faqCategories = [
    {
      category: 'General',
      faqs: [
        {
          question: 'What is PYX and how does it work?',
          answer: 'PYX is an AI agents marketplace that enables businesses to create, deploy, and manage intelligent automation workflows. Our platform provides pre-built AI agents for various tasks like customer support, inventory management, and sales optimization. You can also create custom agents using our visual builder or API.'
        },
        {
          question: 'Do I need technical knowledge to use PYX?',
          answer: 'No! PYX is designed for both technical and non-technical users. Our visual workflow builder allows you to create complex automations through drag-and-drop interface. However, we also provide powerful APIs and developer tools for technical users who want more control.'
        },
        {
          question: 'How secure is my data with PYX?',
          answer: 'Security is our top priority. We use enterprise-grade encryption, comply with SOC 2 Type II standards, and are GDPR compliant. Your data is encrypted in transit and at rest, and we never share it with third parties. We also provide detailed audit logs and access controls.'
        }
      ]
    },
    {
      category: 'Getting Started',
      faqs: [
        {
          question: 'How do I create my first AI agent?',
          answer: 'After signing up, go to your dashboard and click "Create Agent". Choose from our pre-built templates or start from scratch. Configure your agent\'s behavior, connect it to your data sources, and deploy it. Our getting started guide provides detailed step-by-step instructions.'
        },
        {
          question: 'What integrations are available?',
          answer: 'We support 50+ integrations including Shopify, WooCommerce, Slack, Microsoft Teams, Google Workspace, Salesforce, HubSpot, and many more. You can also create custom integrations using our API or request new integrations through our support team.'
        },
        {
          question: 'Is there a free trial or free plan?',
          answer: 'Yes! We offer a free plan that includes 3 AI agents and 1,000 monthly executions. All paid plans also come with a 14-day free trial with full access to premium features. No credit card required to start.'
        }
      ]
    },
    {
      category: 'Billing & Pricing',
      faqs: [
        {
          question: 'How does pricing work?',
          answer: 'Our pricing is based on the number of AI agents and monthly executions. We offer a free plan, Professional plan at Rs49/month, and Enterprise plan at $199/month. You can also pay annually for a 20% discount. Custom enterprise pricing is available for large organizations.'
        },
        {
          question: 'What happens if I exceed my plan limits?',
          answer: 'If you exceed your monthly execution limit, your workflows will be paused until the next billing cycle or you can upgrade your plan. We\'ll send you notifications as you approach your limits, and you can set up automatic overage billing if needed.'
        },
        {
          question: 'Can I cancel my subscription anytime?',
          answer: 'Yes, you can cancel your subscription at any time from your account settings. If you cancel, you\'ll retain access to premium features until the end of your current billing period. We also offer a 30-day money-back guarantee for all paid plans.'
        }
      ]
    }
  ]

  const supportOptions = [
    {
      title: 'Live Chat',
      description: 'Get instant help from our support team during business hours',
      icon: MessageCircle,
      availability: '9 AM - 6 PM PST',
      responseTime: 'Instant',
      action: () => {/* Open chat widget */}
    },
    {
      title: 'Email Support',
      description: 'Send us a detailed message and we\'ll get back to you soon',
      icon: Mail,
      availability: '24/7',
      responseTime: '< 4 hours',
      action: () => onViewChange('contact')
    },
    {
      title: 'Phone Support',
      description: 'Speak directly with our technical support team',
      icon: Phone,
      availability: 'Enterprise only',
      responseTime: 'Immediate',
      action: () => onViewChange('contact')
    },
    {
      title: 'Community Forum',
      description: 'Connect with other users and share experiences',
      icon: Users,
      availability: '24/7',
      responseTime: 'Community-driven',
      action: () => onViewChange('community-forum')
    }
  ]

  const quickLinks = [
    {
      title: 'API Documentation',
      description: 'Complete API reference and guides',
      icon: Code,
      action: () => onViewChange('api-docs')
    },
    {
      title: 'Video Tutorials',
      description: 'Watch step-by-step video guides',
      icon: Video,
      action: () => onViewChange('tutorials')
    },
    {
      title: 'System Status',
      description: 'Check platform status and uptime',
      icon: Activity,
      action: () => window.open('https://status.PYX.ai', '_blank')
    },
    {
      title: 'Feature Requests',
      description: 'Submit ideas for new features',
      icon: Lightbulb,
      action: () => onViewChange('github-issues')
    }
  ]

  const filteredArticles = popularArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleGetStarted = () => {
    if (isLoggedIn) {
      onViewChange('dashboard')
    } else {
      onShowAuth('signup')
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-bg-secondary text-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-brand-primary text-white">
              <HelpCircle className="h-3 w-3 mr-1" />
              Help Center
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              How can we{' '}
              <span className="bg-brand-primary bg-clip-text text-transparent">
                help you?
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Find answers to your questions, learn how to use PYX effectively, 
              and get the support you need to succeed with AI automation.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="Search for help articles, guides, and FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 text-base md:text-lg border-2 w-full"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-lg mx-auto">
              <Button 
                size="lg" 
                className="!bg-brand-primary text-white w-full sm:w-auto border-none"
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
                <MessageCircle className="h-4 w-4 mr-2" />
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Support Options */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Get Support</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the best way to get help based on your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-20">
            {supportOptions.map((option, index) => {
              const IconComponent = option.icon
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={option.action}>
                  <CardHeader className="pb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-primary mx-auto mb-4">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{option.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">
                      {option.description}
                    </CardDescription>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{option.availability}</span>
                      </div>
                      <p className="font-medium">Response: {option.responseTime}</p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full px-20">
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

            {/* Popular Articles */}
            <div className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">Popular Articles</h2>
                <Button variant="outline" onClick={() => onViewChange('documentation')}>
                  <BookOpen className="h-4 w-4 mr-2" />
                  View All Docs
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((article) => (
                  <Card key={article.id} className="hover:shadow-lg transition-all duration-300 group cursor-pointer">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-xs">
                          {categories.find(c => c.id === article.category)?.name}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>{article.rating}</span>
                        </div>
                      </div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                        {article.title}
                      </CardTitle>
                      <CardDescription className="text-sm line-clamp-2">
                        {article.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{article.readTime}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            <span>{article.views}</span>
                          </div>
                        </div>
                        <span>Updated {article.updated}</span>
                      </div>
                      <Button className="w-full group-hover:!bg-brand-primary transition-all !bg-black border-none text-white">
                        <FileText className="h-4 w-4 mr-2" />
                        Read Article
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredArticles.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold mb-2">No articles found</h3>
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

            {/* FAQ Section */}
            <div className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Quick answers to the most common questions about PYX
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <Tabs defaultValue="General" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-8">
                    {faqCategories.map((category) => (
                      <TabsTrigger key={category.category} value={category.category}>
                        {category.category}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {faqCategories.map((category) => (
                    <TabsContent key={category.category} value={category.category}>
                      <Accordion type="single" collapsible className="space-y-4">
                        {category.faqs.map((faq, index) => (
                          <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                            <AccordionTrigger className="text-left">
                              {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground leading-relaxed">
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Quick Links</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Fast access to important resources and tools
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {quickLinks.map((link, index) => {
                  const IconComponent = link.icon
                  return (
                    <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 cursor-pointer group" onClick={link.action}>
                      <CardContent className="p-6">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-primary mx-auto mb-4 group-hover:scale-110 transition-transform">
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="font-medium mb-2 group-hover:text-primary transition-colors">
                          {link.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {link.description}
                        </p>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          </Tabs>
        </div>
      </section>

      {/* Still Need Help CTA */}
      <section className="py-20 bg-bg-secondary text-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Still Need Help?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Our support team is here to help you succeed. Get personalized assistance 
              from AI automation experts who know PYX inside and out.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-lg mx-auto">
              <Button 
                size="lg" 
                variant="secondary"
                className="w-full sm:w-auto !bg-brand-primary text-white border-none"
                onClick={() => onViewChange('contact')}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Contact Support
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white bg-white text-black hover:bg-white hover:text-primary w-full sm:w-auto"
                onClick={() => onViewChange('premium-support')}
              >
                <Award className="h-4 w-4 mr-2" />
                Premium Support
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}