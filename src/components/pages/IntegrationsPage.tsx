'use client'

import { useState } from 'react'
import { Button } from '../common/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../common/ui/card'
import { Badge } from '../common/ui/badge'
import { Input } from '../common/ui/input'
import { Tabs, TabsList, TabsTrigger } from '../common/ui/tabs'
import { 
  Search,
  ShoppingCart,
  MessageSquare,
  BarChart3,
  Users,
  Mail,
  // Calendar,
  FileText,
  // Cloud,
  Zap,
  Settings,
  CheckCircle,
  Star,
  ArrowRight,
  ExternalLink,
  Code,
  Webhook,
  Database,
  Globe,
  Lock,
  Timer
} from 'lucide-react'
import { useNavigate } from 'react-router-dom';

interface IntegrationsPageProps {
  onViewChange: (view: string) => void
  isLoggedIn: boolean
  onShowAuth: (mode: 'login' | 'signup') => void
}

export function IntegrationsPage({ onViewChange, isLoggedIn, onShowAuth }: IntegrationsPageProps) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'All Integrations', icon: Globe, count: 50 },
    { id: 'ecommerce', name: 'E-commerce', icon: ShoppingCart, count: 12 },
    { id: 'communication', name: 'Communication', icon: MessageSquare, count: 8 },
    { id: 'analytics', name: 'Analytics', icon: BarChart3, count: 6 },
    { id: 'crm', name: 'CRM & Sales', icon: Users, count: 9 },
    { id: 'productivity', name: 'Productivity', icon: FileText, count: 10 },
    { id: 'marketing', name: 'Marketing', icon: Mail, count: 5 }
  ]

  const integrations = [
    // E-commerce
    {
      id: 'shopify',
      name: 'Shopify',
      description: 'Connect your Shopify store to automate order processing, inventory management, and customer communications.',
      category: 'ecommerce',
      logo: '🛒',
      rating: 4.9,
      reviews: 1240,
      setupTime: '5 min',
      popular: true,
      features: ['Order Automation', 'Inventory Sync', 'Customer Support', 'Analytics'],
      pricing: 'Free'
    },
    {
      id: 'woocommerce',
      name: 'WooCommerce',
      description: 'Integrate with WooCommerce to streamline your WordPress e-commerce operations.',
      category: 'ecommerce',
      logo: '🏪',
      rating: 4.7,
      reviews: 890,
      setupTime: '10 min',
      popular: false,
      features: ['Product Management', 'Order Processing', 'Customer Data', 'Reports'],
      pricing: 'Free'
    },
    {
      id: 'magento',
      name: 'Magento',
      description: 'Advanced e-commerce automation for Magento stores with enterprise-grade features.',
      category: 'ecommerce',
      logo: '🛍️',
      rating: 4.6,
      reviews: 456,
      setupTime: '15 min',
      popular: false,
      features: ['Advanced Automation', 'Multi-store Support', 'B2B Features', 'Custom Fields'],
      pricing: 'Pro Plan'
    },
    
    // Communication
    {
      id: 'slack',
      name: 'Slack',
      description: 'Send notifications, create channels, and manage team communications automatically.',
      category: 'communication',
      logo: '💬',
      rating: 4.8,
      reviews: 2100,
      setupTime: '3 min',
      popular: true,
      features: ['Auto Notifications', 'Channel Management', 'File Sharing', 'Bot Integration'],
      pricing: 'Free'
    },
    {
      id: 'teams',
      name: 'Microsoft Teams',
      description: 'Integrate with Teams for seamless workplace communication and collaboration.',
      category: 'communication',
      logo: '👥',
      rating: 4.5,
      reviews: 1680,
      setupTime: '5 min',
      popular: false,
      features: ['Meeting Automation', 'Chat Integration', 'File Collaboration', 'Calendar Sync'],
      pricing: 'Free'
    },
    {
      id: 'discord',
      name: 'Discord',
      description: 'Automate Discord server management, moderation, and community engagement.',
      category: 'communication',
      logo: '🎮',
      rating: 4.4,
      reviews: 720,
      setupTime: '5 min',
      popular: false,
      features: ['Server Management', 'Auto Moderation', 'Role Assignment', 'Announcements'],
      pricing: 'Free'
    },

    // Analytics
    {
      id: 'google-analytics',
      name: 'Google Analytics',
      description: 'Connect Google Analytics to automatically generate reports and insights.',
      category: 'analytics',
      logo: '📊',
      rating: 4.7,
      reviews: 1550,
      setupTime: '5 min',
      popular: true,
      features: ['Auto Reports', 'Custom Dashboards', 'Goal Tracking', 'Real-time Data'],
      pricing: 'Free'
    },
    {
      id: 'mixpanel',
      name: 'Mixpanel',
      description: 'Advanced product analytics integration for detailed user behavior tracking.',
      category: 'analytics',
      logo: '📈',
      rating: 4.6,
      reviews: 680,
      setupTime: '10 min',
      popular: false,
      features: ['Event Tracking', 'Funnel Analysis', 'Cohort Reports', 'A/B Testing'],
      pricing: 'Pro Plan'
    },

    // CRM & Sales
    {
      id: 'salesforce',
      name: 'Salesforce',
      description: 'Comprehensive CRM integration for lead management, sales automation, and customer service.',
      category: 'crm',
      logo: '☁️',
      rating: 4.8,
      reviews: 1890,
      setupTime: '15 min',
      popular: true,
      features: ['Lead Automation', 'Opportunity Management', 'Custom Objects', 'Workflow Rules'],
      pricing: 'Pro Plan'
    },
    {
      id: 'hubspot',
      name: 'HubSpot',
      description: 'All-in-one marketing, sales, and service platform integration.',
      category: 'crm',
      logo: '🎯',
      rating: 4.7,
      reviews: 1420,
      setupTime: '10 min',
      popular: true,
      features: ['Contact Management', 'Deal Tracking', 'Email Sequences', 'Marketing Automation'],
      pricing: 'Free'
    },
    {
      id: 'pipedrive',
      name: 'Pipedrive',
      description: 'Simple and effective sales CRM integration for small to medium businesses.',
      category: 'crm',
      logo: '🔧',
      rating: 4.5,
      reviews: 890,
      setupTime: '8 min',
      popular: false,
      features: ['Pipeline Management', 'Activity Tracking', 'Sales Reports', 'Email Integration'],
      pricing: 'Free'
    },

    // Productivity
    {
      id: 'google-workspace',
      name: 'Google Workspace',
      description: 'Integrate with Gmail, Drive, Calendar, and other Google Workspace apps.',
      category: 'productivity',
      logo: '📧',
      rating: 4.8,
      reviews: 2340,
      setupTime: '5 min',
      popular: true,
      features: ['Email Automation', 'Calendar Management', 'Document Creation', 'Drive Integration'],
      pricing: 'Free'
    },
    {
      id: 'office365',
      name: 'Microsoft 365',
      description: 'Complete Office 365 integration for document management and collaboration.',
      category: 'productivity',
      logo: '📄',
      rating: 4.6,
      reviews: 1780,
      setupTime: '8 min',
      popular: false,
      features: ['Email Integration', 'Document Automation', 'Calendar Sync', 'SharePoint'],
      pricing: 'Free'
    },
    {
      id: 'notion',
      name: 'Notion',
      description: 'Automate Notion workflows, database updates, and content management.',
      category: 'productivity',
      logo: '📝',
      rating: 4.5,
      reviews: 920,
      setupTime: '10 min',
      popular: false,
      features: ['Database Automation', 'Page Creation', 'Template Management', 'API Integration'],
      pricing: 'Pro Plan'
    },

    // Marketing
    {
      id: 'mailchimp',
      name: 'Mailchimp',
      description: 'Email marketing automation with advanced segmentation and campaign management.',
      category: 'marketing',
      logo: '🐵',
      rating: 4.4,
      reviews: 1120,
      setupTime: '8 min',
      popular: true,
      features: ['Email Campaigns', 'List Management', 'Automation Workflows', 'Analytics'],
      pricing: 'Free'
    },
    {
      id: 'sendgrid',
      name: 'SendGrid',
      description: 'Reliable email delivery service integration for transactional and marketing emails.',
      category: 'marketing',
      logo: '📮',
      rating: 4.3,
      reviews: 760,
      setupTime: '5 min',
      popular: false,
      features: ['Email Delivery', 'Template Management', 'Analytics', 'API Integration'],
      pricing: 'Free'
    }
  ]

  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || integration.category === selectedCategory
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
      <section className="py-20 bg-gradient-to-br from-[#FFE8DC] via-[#FFD4BD] to-[#FCD2BD]

 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-pink-950/20 ">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="text-center max-w-4xl mx-auto ">
            <Badge className="mb-6 bg-gradient-to-r from-[#FF620A] to-[#993B06] text-white">
              <Zap className="h-3 w-3 mr-1" />
              50+ Integrations
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Connect Everything with{' '}
              <span className="bg-gradient-to-r from-[#FF620A] to-[#993B06] bg-clip-text text-transparent">
                Powerful Integrations
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Seamlessly connect your favorite tools and platforms to create automated workflows 
              that save time and boost productivity across your entire business.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="Search integrations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 text-base md:text-lg border-2 w-full"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-lg mx-auto ">
              <Button 
                size="lg" 
                className="bg-[#FF620A] hover:bg-[#993B06] w-full sm:w-auto border-none !text-black"
                onClick={handleGetStarted}
              >
                <Settings className="h-4 w-4 mr-2" />
                Start Integrating
                <ArrowRight className="h-4 w-4 ml-2 " />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="w-full sm:w-auto"
                onClick={() => navigate('/contact')}
              >
                <Code className="h-4 w-4 mr-2" />
                Request Integration
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 px-20">
            <div className="text-center ">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-[#FF620A] to-[#993B06] mx-auto mb-4">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl md:text-3xl font-bold mb-2">50+</div>
              <div className="font-medium text-foreground mb-1 text-sm md:text-base">Integrations</div>
              <div className="text-xs md:text-sm text-muted-foreground">And growing</div>
            </div>
            <div className="text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-blue-600 mx-auto mb-4">
                <Timer className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl md:text-3xl font-bold mb-2">&lt; 5 min</div>
              <div className="font-medium text-foreground mb-1 text-sm md:text-base">Setup Time</div>
              <div className="text-xs md:text-sm text-muted-foreground">Average setup</div>
            </div>
            <div className="text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 mx-auto mb-4">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl md:text-3xl font-bold mb-2">99.9%</div>
              <div className="font-medium text-foreground mb-1 text-sm md:text-base">Uptime</div>
              <div className="text-xs md:text-sm text-muted-foreground">Reliability</div>
            </div>
            <div className="text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-red-600 mx-auto mb-4">
                <Lock className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl md:text-3xl font-bold mb-2">Enterprise</div>
              <div className="font-medium text-foreground mb-1 text-sm md:text-base">Security</div>
              <div className="text-xs md:text-sm text-muted-foreground">SOC 2 compliant</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories and Integrations */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full px-20">
            {/* Category Tabs */}
            <TabsList className="flex flex-wrap justify-center gap-2 h-auto bg-transparent p-2 mb-12 md:grid md:grid-cols-4 lg:grid-cols-7 lg:gap-0 ">
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

            {/* Integration Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
              {filteredIntegrations.map((integration) => (
                <Card key={integration.id} className="hover:shadow-lg transition-all duration-300 group flex flex-col h-full">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 min-w-0 flex-1">
                        <div className="text-3xl flex-shrink-0">{integration.logo}</div>
                        <div className="min-w-0 flex-1">
                          <CardTitle className="flex items-center gap-2 flex-wrap text-base">
                            <span className="truncate">{integration.name}</span>
                            {integration.popular && (
                              <Badge className="bg-gradient-to-r from-[#FF620A] to-[#993B06] text-white text-xs flex-shrink-0">
                                Popular
                              </Badge>
                            )}
                          </CardTitle>
                          <div className="flex items-center gap-2 mt-2 text-sm">
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 text-yellow-500 fill-current flex-shrink-0" />
                              <span className="text-muted-foreground">
                                {integration.rating}
                              </span>
                            </div>
                            <span className="text-muted-foreground">
                              ({integration.reviews})
                            </span>
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline" className="flex-shrink-0 text-xs">
                        {integration.pricing}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="flex-1 flex flex-col">
                    <CardDescription className="text-sm mb-4 leading-relaxed line-clamp-3">
                      {integration.description}
                    </CardDescription>
                    
                    <div className="space-y-3 mb-6 flex-1">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Timer className="h-4 w-4 flex-shrink-0" />
                        <span>Setup time: {integration.setupTime}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {integration.features.slice(0, 3).map((feature, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                        {integration.features.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{integration.features.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-auto">
                      <Button 
                        className="flex-1 group-hover:bg-gradient-to-r group-hover:orange-600   transition-all !bg-black border-none text-white"
                        onClick={handleGetStarted}
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Connect
                      </Button>
                      <Button variant="outline" size="icon" className="flex-shrink-0">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredIntegrations.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">No integrations found</h3>
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

      {/* Custom Integration CTA */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-dashed border-muted-foreground/30 hover:border-orange-500/50 transition-colors">
              <CardContent className="p-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-r from-[#FF620A] to-[#993B06] mx-auto mb-6">
                  <Code className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Don't See Your Tool?</h3>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  We're constantly adding new integrations. Let us know what you need and we'll 
                  prioritize it for development.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-lg mx-auto">
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-[#FF620A] to-[#993B06] w-full sm:w-auto border-none"
                    onClick={() => navigate('/contact')}
                  >
                    <Code className="h-4 w-4 mr-2" />
                    Request Integration
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="w-full sm:w-auto"
                    onClick={() => navigate('/api/docs')}
                  >
                    <Database className="h-4 w-4 mr-2" />
                    View API Docs
                  </Button>
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
              Ready to Connect Your Tools?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Start building powerful automations with our extensive library of integrations. 
              Get started in minutes, not hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-lg mx-auto ">
              <Button 
                size="lg" 
                variant="secondary"
                className="w-full sm:w-auto"
                onClick={handleGetStarted}
              >
                <Zap className="h-4 w-4 mr-2" />
                Start Integrating
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-black hover:bg-white hover:text-primary w-full sm:w-auto border-none"
                onClick={() => navigate('/contact')}
              >
                <MessageSquare className="h-4 w-4 mr-2 " />
                Get Help
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}