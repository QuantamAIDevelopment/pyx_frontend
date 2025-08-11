'use client'

import { useState } from 'react'
import { Button } from '../common/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../common/ui/card'
import { Badge } from '../common/ui/badge'
import { Separator } from '../common/ui/separator'
import { Switch } from '../common/ui/switch'
import { 
  Cookie,
  Shield,
  Eye,
  Settings,
  Calendar,
  Mail,
  Phone,
  ArrowRight,
  AlertCircle,
  CheckCircle,
  Info,
  ExternalLink,
  Download,
  Share2,
  Database,
  RefreshCw,
  MapPin,
  Building2,
  Gavel,
  BookOpen,
  HelpCircle,
  MessageSquare,
  Clock,
  Target,
  Users,
  BarChart3,
  Monitor,
  Share,
  Home,
 
} from 'lucide-react'

interface CookiePolicyPageProps {
  onViewChange: (view: string) => void
  isLoggedIn: boolean
  onShowAuth: (mode: 'login' | 'signup') => void
}

export function CookiePolicyPage({ onViewChange }: CookiePolicyPageProps) {
  const [activeSection, setActiveSection] = useState('introduction')
  const [cookiePreferences, setCookiePreferences] = useState({
    essential: true, // Always enabled
    analytics: true,
    functional: true,
    advertising: false,
    social: false
  })

  const lastUpdated = 'December 15, 2024'
  const effectiveDate = 'January 1, 2024'

  const tableOfContents = [
    { id: 'introduction', title: 'What Are Cookies?', icon: Info },
    { id: 'cookie-types', title: 'Types of Cookies', icon: Cookie },
    { id: 'our-cookies', title: 'Cookies We Use', icon: Database },
    { id: 'third-party', title: 'Third-Party Cookies', icon: Share2 },
    { id: 'purposes', title: 'Why We Use Cookies', icon: Target },
    { id: 'consent', title: 'Cookie Consent', icon: CheckCircle },
    { id: 'management', title: 'Managing Cookies', icon: Settings },
    { id: 'browser-controls', title: 'Browser Controls', icon: Monitor },
    { id: 'tracking', title: 'Do Not Track', icon: Eye },
    { id: 'children', title: 'Children\'s Privacy', icon: Users },
    { id: 'updates', title: 'Policy Updates', icon: RefreshCw },
    { id: 'contact', title: 'Contact Us', icon: MessageSquare }
  ]

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleCookiePreferenceChange = (type: string, enabled: boolean) => {
    if (type === 'essential') return // Essential cookies cannot be disabled
    
    setCookiePreferences(prev => ({
      ...prev,
      [type]: enabled
    }))
  }

  const cookieCategories = [
    {
      id: 'essential',
      name: 'Essential Cookies',
      description: 'Required for basic site functionality and security',
      icon: Shield,
      color: 'green',
      required: true,
      examples: [
        'Authentication tokens',
        'Security preferences',
        'Shopping cart contents',
        'Form submission data'
      ]
    },
    {
      id: 'analytics',
      name: 'Analytics Cookies',
      description: 'Help us understand how visitors interact with our website',
      icon: BarChart3,
      color: 'blue',
      required: false,
      examples: [
        'Page view tracking',
        'User behavior analysis',
        'Performance monitoring',
        'A/B testing data'
      ]
    },
    {
      id: 'functional',
      name: 'Functional Cookies',
      description: 'Enable enhanced functionality and personalization',
      icon: Settings,
      color: 'purple',
      required: false,
      examples: [
        'Language preferences',
        'Theme settings',
        'Recent searches',
        'Customization options'
      ]
    },
    {
      id: 'advertising',
      name: 'Advertising Cookies',
      description: 'Used to deliver relevant advertisements',
      icon: Target,
      color: 'orange',
      required: false,
      examples: [
        'Ad targeting data',
        'Conversion tracking',
        'Retargeting pixels',
        'Campaign effectiveness'
      ]
    },
    {
      id: 'social',
      name: 'Social Media Cookies',
      description: 'Enable social sharing and integration features',
      icon: Share,
      color: 'pink',
      required: false,
      examples: [
        'Social login tokens',
        'Share button functionality',
        'Social media plugins',
        'Cross-platform tracking'
      ]
    }
  ]

  const thirdPartyCookies = [
    {
      name: 'Google Analytics',
      purpose: 'Website analytics and performance tracking',
      duration: '2 years',
      type: 'Analytics',
      privacy: 'https://policies.google.com/privacy'
    },
    {
      name: 'Stripe',
      purpose: 'Payment processing and fraud prevention',
      duration: '1 year',
      type: 'Essential',
      privacy: 'https://stripe.com/privacy'
    },
    {
      name: 'Intercom',
      purpose: 'Customer support and live chat',
      duration: '1 year',
      type: 'Functional',
      privacy: 'https://www.intercom.com/legal/privacy'
    },
    {
      name: 'HubSpot',
      purpose: 'Marketing automation and lead tracking',
      duration: '2 years',
      type: 'Analytics',
      privacy: 'https://legal.hubspot.com/privacy-policy'
    },
    {
      name: 'YouTube',
      purpose: 'Video content and embedded players',
      duration: 'Session',
      type: 'Functional',
      privacy: 'https://policies.google.com/privacy'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-brand-primary text-white">
              <Cookie className="h-3 w-3 mr-1" />
              Cookie Information
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Cookie{' '}
              <span className="bg-brand-primary bg-clip-text text-transparent">
                Policy
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Learn how PYX uses cookies and similar technologies to enhance your 
              experience and understand your preferences.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-lg mx-auto mb-12">
              <Button 
                size="lg" 
                className="!bg-brand-primary border-none w-full sm:w-auto"
                onClick={() => onViewChange('contact')}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Contact Us
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="w-full sm:w-auto"
                onClick={() => window.print()}
              >
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>

            {/* Document Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="flex items-center space-x-2 mb-2">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  <span className="font-medium">Last Updated</span>
                </div>
                <div className="text-sm text-muted-foreground">{lastUpdated}</div>
              </div>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="font-medium">Effective Date</span>
                </div>
                <div className="text-sm text-muted-foreground">{effectiveDate}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Table of Contents */}
            <div className="lg:w-1/4">
              <div className="sticky top-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BookOpen className="h-5 w-5" />
                      <span>Table of Contents</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <nav className="space-y-1">
                      {tableOfContents.map((item) => {
                        const IconComponent = item.icon
                        return (
                          <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-left transition-colors ${
                              activeSection === item.id
                                ? 'bg-primary text-primary-foreground'
                                : 'hover:bg-muted'
                            }`}
                          >
                            <IconComponent className="h-4 w-4 flex-shrink-0" />
                            <span className="text-sm">{item.title}</span>
                          </button>
                        )
                      })}
                    </nav>
                  </CardContent>
                </Card>

                {/* Cookie Preferences Panel */}
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Settings className="h-5 w-5" />
                      <span>Cookie Preferences</span>
                    </CardTitle>
                    <CardDescription>
                      Manage your cookie consent preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {cookieCategories.map((category) => (
                      <div key={category.id} className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="font-medium text-sm">{category.name}</div>
                          <div className="text-xs text-muted-foreground">{category.description}</div>
                        </div>
                        <Switch
                          checked={cookiePreferences[category.id as keyof typeof cookiePreferences]}
                          onCheckedChange={(checked) => handleCookiePreferenceChange(category.id, checked)}
                          disabled={category.required}
                        />
                      </div>
                    ))}
                    <Separator />
                    <Button size="sm" className="w-full text-black">
                      Save Preferences
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Content */}
            <div className="lg:w-3/4">
              <div className="prose prose-lg max-w-none dark:prose-invert">
                
                {/* Introduction */}
                <section id="introduction" className="mb-12">
                  <div className="flex items-center space-x-2 mb-4">
                    <Info className="h-6 w-6 text-blue-600" />
                    <h2 className="text-2xl font-bold m-0">What Are Cookies?</h2>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-950/20 p-6 rounded-lg border-l-4 border-blue-600 mb-6">
                    <p className="m-0">
                      Cookies are small text files that are placed on your computer or mobile device when you 
                      visit a website. They are widely used to make websites work more efficiently and provide 
                      information to website owners.
                    </p>
                  </div>
                  <p>
                    PYX uses cookies and similar technologies (such as web beacons, pixels, and local storage) 
                    to enhance your experience on our platform, understand your preferences, and improve our services.
                  </p>
                  <div className="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-amber-800 dark:text-amber-200 m-0 mb-1">Your Choice</h4>
                        <p className="text-sm text-amber-700 dark:text-amber-300 m-0">
                          You can control and manage cookies in various ways. Please note that removing or 
                          blocking cookies can impact your user experience.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Cookie Types */}
                <section id="cookie-types" className="mb-12">
                  <div className="flex items-center space-x-2 mb-4">
                    <Cookie className="h-6 w-6 text-purple-600" />
                    <h2 className="text-2xl font-bold m-0">Types of Cookies</h2>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3">By Duration</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span>Session Cookies</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-sm">
                          Temporary cookies that are deleted when you close your browser. 
                          They help maintain your session while navigating the site.
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center space-x-2">
                          <Database className="h-4 w-4" />
                          <span>Persistent Cookies</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-sm">
                          Remain on your device for a set period or until you delete them. 
                          They remember your preferences across sessions.
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <h3 className="text-xl font-semibold mb-3">By Origin</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center space-x-2">
                          <Home className="h-4 w-4" />
                          <span>First-Party Cookies</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-sm">
                          Set directly by our website and can only be read by our site. 
                          These are under our direct control.
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center space-x-2">
                          <Share2 className="h-4 w-4" />
                          <span>Third-Party Cookies</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-sm">
                          Set by external services we use, such as analytics providers 
                          or advertising networks.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </section>

                {/* Our Cookies */}
                <section id="our-cookies" className="mb-12">
                  <div className="flex items-center space-x-2 mb-4">
                    <Database className="h-6 w-6 text-green-600" />
                    <h2 className="text-2xl font-bold m-0">Cookies We Use</h2>
                  </div>
                  <p>
                    PYX uses different categories of cookies for various purposes. 
                    Here's a detailed breakdown of each category:
                  </p>
                  
                  <div className="space-y-6 my-8">
                    {cookieCategories.map((category) => {
                      const IconComponent = category.icon
                      const colorClasses = {
                        green: 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20',
                        blue: 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20',
                        purple: 'border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/20',
                        orange: 'border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/20',
                        pink: 'border-pink-200 dark:border-pink-800 bg-pink-50 dark:bg-pink-950/20'
                      }
                      
                      return (
                        <Card key={category.id} className={`${colorClasses[category.color as keyof typeof colorClasses]} border-l-4`}>
                          <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <IconComponent className="h-5 w-5" />
                                <span>{category.name}</span>
                              </div>
                              {category.required && (
                                <Badge variant="secondary">Required</Badge>
                              )}
                            </CardTitle>
                            <CardDescription>{category.description}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <h4 className="font-medium mb-2">Examples:</h4>
                            <ul className="text-sm space-y-1">
                              {category.examples.map((example, index) => (
                                <li key={index}>• {example}</li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </section>

                {/* Third-Party Cookies */}
                <section id="third-party" className="mb-12">
                  <div className="flex items-center space-x-2 mb-4">
                    <Share2 className="h-6 w-6 text-orange-600" />
                    <h2 className="text-2xl font-bold m-0">Third-Party Cookies</h2>
                  </div>
                  <p>
                    We work with trusted third-party services that may set their own cookies. 
                    Here are the main third-party cookies you may encounter:
                  </p>
                  
                  <div className="overflow-x-auto my-6">
                    <table className="w-full border-collapse border border-border rounded-lg">
                      <thead>
                        <tr className="bg-muted">
                          <th className="border border-border p-3 text-left">Service</th>
                          <th className="border border-border p-3 text-left">Purpose</th>
                          <th className="border border-border p-3 text-left">Duration</th>
                          <th className="border border-border p-3 text-left">Type</th>
                          <th className="border border-border p-3 text-left">Privacy Policy</th>
                        </tr>
                      </thead>
                      <tbody>
                        {thirdPartyCookies.map((service, index) => (
                          <tr key={index} className="hover:bg-muted/50">
                            <td className="border border-border p-3 font-medium">{service.name}</td>
                            <td className="border border-border p-3 text-sm">{service.purpose}</td>
                            <td className="border border-border p-3 text-sm">{service.duration}</td>
                            <td className="border border-border p-3">
                              <Badge variant="outline" className="text-xs">{service.type}</Badge>
                            </td>
                            <td className="border border-border p-3">
                              <Button size="sm" variant="ghost" className="h-6 px-2">
                                <ExternalLink className="h-3 w-3" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* Purposes */}
                <section id="purposes" className="mb-12">
                  <div className="flex items-center space-x-2 mb-4">
                    <Target className="h-6 w-6 text-red-600" />
                    <h2 className="text-2xl font-bold m-0">Why We Use Cookies</h2>
                  </div>
                  <p>We use cookies for several important purposes:</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                    <Card>
                      <CardContent className="pt-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Shield className="h-4 w-4 text-blue-600" />
                          <h4 className="font-semibold">Security & Authentication</h4>
                        </div>
                        <p className="text-sm">Keep your account secure and maintain your login session across pages.</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Settings className="h-4 w-4 text-green-600" />
                          <h4 className="font-semibold">Preferences & Personalization</h4>
                        </div>
                        <p className="text-sm">Remember your language, theme, and other customization choices.</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <BarChart3 className="h-4 w-4 text-purple-600" />
                          <h4 className="font-semibold">Analytics & Performance</h4>
                        </div>
                        <p className="text-sm">Understand how you use our platform to improve performance and features.</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Target className="h-4 w-4 text-orange-600" />
                          <h4 className="font-semibold">Marketing & Advertising</h4>
                        </div>
                        <p className="text-sm">Show you relevant content and measure the effectiveness of our campaigns.</p>
                      </CardContent>
                    </Card>
                  </div>
                </section>

                {/* Cookie Consent */}
                <section id="consent" className="mb-12">
                  <div className="flex items-center space-x-2 mb-4">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    <h2 className="text-2xl font-bold m-0">Cookie Consent</h2>
                  </div>
                  <p>
                    When you first visit our website, we'll ask for your consent to use non-essential cookies. 
                    You can choose which categories to allow and change your preferences at any time.
                  </p>
                  
                  <div className="bg-green-50 dark:bg-green-950/20 p-6 rounded-lg border-l-4 border-green-600 my-6">
                    <h4 className="font-semibold mb-3">Your Consent Rights</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Choose which cookie categories to accept</li>
                      <li>• Change your preferences at any time</li>
                      <li>• Withdraw consent for non-essential cookies</li>
                      <li>• Access our cookie preference center</li>
                    </ul>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3">Legal Basis</h3>
                  <p>Our legal basis for processing cookies:</p>
                  <ul>
                    <li><strong>Essential Cookies:</strong> Legitimate interest (necessary for service provision)</li>
                    <li><strong>Analytics Cookies:</strong> Your consent</li>
                    <li><strong>Functional Cookies:</strong> Your consent</li>
                    <li><strong>Advertising Cookies:</strong> Your explicit consent</li>
                  </ul>
                </section>

                {/* Managing Cookies */}
                <section id="management" className="mb-12">
                  <div className="flex items-center space-x-2 mb-4">
                    <Settings className="h-6 w-6 text-indigo-600" />
                    <h2 className="text-2xl font-bold m-0">Managing Your Cookie Preferences</h2>
                  </div>
                  <p>You have several options for managing cookies:</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                    <Card className="border-indigo-200 dark:border-indigo-800">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center space-x-2">
                          <Settings className="h-4 w-4 text-indigo-600" />
                          <span>PYX Settings</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-sm mb-3">
                          Use our cookie preference center to control which cookies we set.
                        </p>
                        <Button size="sm" className="w-full text-black">
                          Manage Preferences
                        </Button>
                      </CardContent>
                    </Card>
                    <Card className="border-blue-200 dark:border-blue-800">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center space-x-2">
                          <Monitor className="h-4 w-4 text-blue-600" />
                          <span>Browser Settings</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-sm mb-3">
                          Configure your browser to block or delete cookies automatically.
                        </p>
                        <Button size="sm" variant="outline" className="w-full">
                          Learn How
                        </Button>
                      </CardContent>
                    </Card>
                    <Card className="border-purple-200 dark:border-purple-800">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center space-x-2">
                          <Eye className="h-4 w-4 text-purple-600" />
                          <span>Opt-Out Tools</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-sm mb-3">
                          Use industry opt-out tools for advertising and analytics cookies.
                        </p>
                        <Button size="sm" variant="outline" className="w-full">
                          View Tools
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </section>

                {/* Browser Controls */}
                <section id="browser-controls" className="mb-12">
                  <div className="flex items-center space-x-2 mb-4">
                    <Monitor className="h-6 w-6 text-cyan-600" />
                    <h2 className="text-2xl font-bold m-0">Browser-Specific Instructions</h2>
                  </div>
                  <p>Here's how to manage cookies in popular browsers:</p>
                  
                  <div className="space-y-4 my-6">
                    <Card className="border-l-4 border-blue-600">
                      <CardContent className="pt-4">
                        <h4 className="font-semibold mb-2">Google Chrome</h4>
                        <p className="text-sm">
                          Settings → Privacy and security → Cookies and other site data → 
                          See all cookies and site data
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="border-l-4 border-orange-600">
                      <CardContent className="pt-4">
                        <h4 className="font-semibold mb-2">Mozilla Firefox</h4>
                        <p className="text-sm">
                          Options → Privacy & Security → Cookies and Site Data → 
                          Manage Data
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="border-l-4 border-purple-600">
                      <CardContent className="pt-4">
                        <h4 className="font-semibold mb-2">Safari</h4>
                        <p className="text-sm">
                          Preferences → Privacy → Manage Website Data → 
                          Remove or Remove All
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="border-l-4 border-green-600">
                      <CardContent className="pt-4">
                        <h4 className="font-semibold mb-2">Microsoft Edge</h4>
                        <p className="text-sm">
                          Settings → Cookies and site permissions → 
                          Manage and delete cookies and site data
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </section>

                {/* Do Not Track */}
                <section id="tracking" className="mb-12">
                  <div className="flex items-center space-x-2 mb-4">
                    <Eye className="h-6 w-6 text-red-600" />
                    <h2 className="text-2xl font-bold m-0">Do Not Track Signals</h2>
                  </div>
                  <p>
                    Some browsers include a "Do Not Track" feature that sends a signal to websites 
                    you visit indicating you don't want to be tracked.
                  </p>
                  
                  <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-lg border border-red-200 dark:border-red-800 my-6">
                    <div className="flex items-start space-x-2">
                      <Info className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-red-800 dark:text-red-200 m-0 mb-1">Current Status</h4>
                        <p className="text-sm text-red-700 dark:text-red-300 m-0">
                          Currently, there is no universal standard for recognizing and implementing 
                          Do Not Track signals, so we do not respond to them automatically.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Children's Privacy */}
                <section id="children" className="mb-12">
                  <div className="flex items-center space-x-2 mb-4">
                    <Users className="h-6 w-6 text-pink-600" />
                    <h2 className="text-2xl font-bold m-0">Children's Privacy</h2>
                  </div>
                  <div className="bg-pink-50 dark:bg-pink-950/20 p-4 rounded-lg border border-pink-200 dark:border-pink-800">
                    <p className="m-0">
                      Our services are not intended for children under 13. We do not knowingly 
                      collect personal information from children under 13 through cookies or any 
                      other means. If you believe a child has provided us with personal information, 
                      please contact us immediately.
                    </p>
                  </div>
                </section>

                {/* Policy Updates */}
                <section id="updates" className="mb-12">
                  <div className="flex items-center space-x-2 mb-4">
                    <RefreshCw className="h-6 w-6 text-emerald-600" />
                    <h2 className="text-2xl font-bold m-0">Updates to This Policy</h2>
                  </div>
                  <p>
                    We may update this Cookie Policy from time to time to reflect changes in our 
                    practices or legal requirements. We will notify you of any material changes by:
                  </p>
                  <ul>
                    <li>Posting the updated policy on our website</li>
                    <li>Updating the "Last Updated" date</li>
                    <li>Sending email notifications for significant changes</li>
                    <li>Requesting renewed consent when required</li>
                  </ul>
                </section>

                {/* Contact Information */}
                <section id="contact" className="mb-12">
                  <div className="flex items-center space-x-2 mb-4">
                    <MessageSquare className="h-6 w-6 text-violet-600" />
                    <h2 className="text-2xl font-bold m-0">Contact Us</h2>
                  </div>
                  <p>
                    If you have any questions about our use of cookies or this Cookie Policy, 
                    please contact us:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center space-x-2">
                          <Building2 className="h-4 w-4" />
                          <span>PYX Technologies, Inc.</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0 space-y-2">
                        <div className="flex items-center space-x-2 text-sm">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span>cookies@PYX.ai</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>+1 (555) 123-PYX</span>
                        </div>
                        <div className="flex items-start space-x-2 text-sm">
                          <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                          <span>123 AI Innovation Drive<br />San Francisco, CA 94105</span>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center space-x-2">
                          <Shield className="h-4 w-4" />
                          <span>Data Protection Officer</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0 space-y-2">
                        <div className="flex items-center space-x-2 text-sm">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span>dpo@PYX.ai</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          For cookie-related privacy concerns and 
                          data protection inquiries.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </section>

                {/* Quick Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12 pt-8 border-t ">
                  <Button onClick={() => onViewChange('privacy')} className='text-black'>
                    <Shield className="h-4 w-4 mr-2" />
                    Privacy Policy
                  </Button>
                  <Button variant="outline" onClick={() => onViewChange('terms')}>
                    <Gavel className="h-4 w-4 mr-2" />
                    Terms of Service
                  </Button>
                  <Button variant="outline" onClick={() => onViewChange('contact')}>
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Get Help
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}