'use client'

import { useState } from 'react'
import { Button } from '../common/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../common/ui/card'
import { Badge } from '../common/ui/badge'
// import { Separator } from '../common/ui/separator'
// import { ScrollArea } from '../common/ui/scroll-area'
import { 
  Scale,
  Gavel,
  // FileText,
  Shield,
  // Users,
  // Globe,
  Calendar,
  Mail,
  Phone,
  ArrowRight,
  // ChevronRight,
  AlertCircle,
  CheckCircle,
  Info,
  // ExternalLink,
  Download,
  // Share2,
  Settings,
  // Database,
  // Cloud,
  // Server,
  Lock,
  // Key,
  // Trash2,
  // Edit,
  RefreshCw,
  // Bell,
  MapPin,
  Building2,
  BookOpen,
  HelpCircle,
  MessageSquare,
  // Clock,
  // Target,
  // Zap,
  // Award,
  // Star,
  DollarSign,
  CreditCard,
  ShoppingCart,
  // Package,
  // Truck,
  RotateCcw,
  XCircle,
  AlertTriangle,
  Ban,
  UserX,
  // Eye,
  // EyeOff,
  Copyright,
  // Briefcase,
  // Home,
  // Smartphone,
  // Monitor,
  // Tablet,
  // Laptop,
  Code,
  // Cpu,
  // Network,
  // Wifi,
  // Router,
  // HardDrive,
  // Upload,
  // CloudUpload,
  // Link,
  // Unlink,
  // Share,
  // Forward,
  // Reply,
  // Send,
  // Inbox,
  // Archive,
  // Flag,
  // Tag,
  // Bookmark,
  // Heart,
  // ThumbsUp,
  // ThumbsDown,
  // Plus,
  // Minus,
  // X,
  // Check,
  // Search,
  // Filter,
  // Sort,
  // List,
  // Grid,
  // Map,
  // Calendar as CalendarIcon,
  User,
  UserPlus,
  // UserMinus,
  // UserCheck,
  Crown,
  // Sparkles
} from 'lucide-react'

interface TermsOfServicePageProps {
  onViewChange: (view: string) => void
}

export function TermsOfServicePage({ onViewChange }: TermsOfServicePageProps) {
  const [activeSection, setActiveSection] = useState('introduction')

  const lastUpdated = 'December 15, 2024'
  const effectiveDate = 'January 1, 2024'

  const tableOfContents = [
    { id: 'introduction', title: 'Introduction', icon: Info },
    { id: 'acceptance', title: 'Acceptance of Terms', icon: CheckCircle },
    { id: 'description', title: 'Description of Service', icon: Settings },
    { id: 'user-accounts', title: 'User Accounts', icon: User },
    { id: 'acceptable-use', title: 'Acceptable Use Policy', icon: Shield },
    { id: 'intellectual-property', title: 'Intellectual Property', icon: Copyright },
    { id: 'payment-terms', title: 'Payment and Billing', icon: CreditCard },
    { id: 'privacy', title: 'Privacy and Data', icon: Lock },
    { id: 'disclaimers', title: 'Disclaimers', icon: AlertTriangle },
    { id: 'limitations', title: 'Limitation of Liability', icon: Scale },
    { id: 'indemnification', title: 'Indemnification', icon: Shield },
    { id: 'termination', title: 'Termination', icon: XCircle },
    { id: 'governing-law', title: 'Governing Law', icon: Gavel },
    { id: 'changes', title: 'Changes to Terms', icon: RefreshCw },
    { id: 'contact', title: 'Contact Information', icon: MessageSquare }
  ]

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
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
              <Gavel className="h-3 w-3 mr-1" />
              Legal Agreement
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Terms of{' '}
              <span className="bg-gradient-to-r from-[#FF620A] to-[#993B06] bg-clip-text text-transparent">
                Service
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Please read these terms carefully before using QAID's AI agent marketplace 
              and related services. By using our platform, you agree to these terms.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-lg mx-auto mb-12">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-[#FF620A] to-[#993B06] w-full sm:w-auto"
                onClick={() => onViewChange('contact')}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Contact Legal
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
              </div>
            </div>

            {/* Content */}
            <div className="lg:w-3/4">
              <div className="prose prose-lg max-w-none dark:prose-invert">
                
                {/* Introduction */}
                <section id="introduction" className="mb-12">
                  <div className="flex items-center space-x-2 mb-4">
                    <Info className="h-6 w-6 text-blue-600" />
                    <h2 className="text-2xl font-bold m-0">Introduction</h2>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-950/20 p-6 rounded-lg border-l-4 border-blue-600 mb-6">
                    <p className="m-0">
                      Welcome to QAID Technologies, Inc. ("QAID," "we," "us," or "our"). These Terms of Service 
                      ("Terms") govern your use of our AI agent marketplace platform, development tools, and related 
                      services (collectively, the "Service").
                    </p>
                  </div>
                  <p>
                    These Terms constitute a legally binding agreement between you ("User," "you," or "your") and QAID. 
                    By accessing or using our Service, you agree to be bound by these Terms and our Privacy Policy.
                  </p>
                  <div className="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-amber-800 dark:text-amber-200 m-0 mb-1">Important Notice</h4>
                        <p className="text-sm text-amber-700 dark:text-amber-300 m-0">
                          If you do not agree to these Terms, you may not access or use our Service.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Acceptance of Terms */}
                <section id="acceptance" className="mb-12">
                  <div className="flex items-center space-x-2 mb-4">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    <h2 className="text-2xl font-bold m-0">Acceptance of Terms</h2>
                  </div>
                  <p>By using our Service, you represent and warrant that:</p>
                  <ul>
                    <li>You are at least 18 years old or have reached the age of majority in your jurisdiction</li>
                    <li>You have the legal capacity to enter into these Terms</li>
                    <li>You will comply with all applicable laws and regulations</li>
                    <li>All information you provide is accurate and complete</li>
                    <li>You will not use the Service for any unlawful or prohibited purpose</li>
                  </ul>
                  <p>
                    If you are using the Service on behalf of an organization, you represent that you have 
                    the authority to bind that organization to these Terms.
                  </p>
                </section>

                {/* Description of Service */}
                <section id="description" className="mb-12">
                  <div className="flex items-center space-x-2 mb-4">
                    <Settings className="h-6 w-6 text-purple-600" />
                    <h2 className="text-2xl font-bold m-0">Description of Service</h2>
                  </div>
                  <p>
                    QAID provides an AI agent marketplace platform that enables users to create, deploy, 
                    and manage artificial intelligence agents for various business applications.
                  </p>
                  
                  <h3 className="text-xl font-semibold mb-3">Our Services Include:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center space-x-2">
                          <Code className="h-4 w-4" />
                          <span>Development Tools</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <ul className="text-sm space-y-1">
                          <li>• Visual agent builder</li>
                          <li>• Code editor and debugging</li>
                          <li>• Testing environments</li>
                          <li>• Deployment pipelines</li>
                        </ul>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center space-x-2">
                          <ShoppingCart className="h-4 w-4" />
                          <span>Marketplace</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <ul className="text-sm space-y-1">
                          <li>• Pre-built AI agents</li>
                          <li>• Agent discovery and search</li>
                          <li>• User reviews and ratings</li>
                          <li>• Licensing and distribution</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                    <p className="text-sm m-0">
                      We reserve the right to modify, suspend, or discontinue any part of our Service 
                      at any time with or without notice. We are not liable for any such modifications, 
                      suspensions, or discontinuations.
                    </p>
                  </div>
                </section>

                {/* User Accounts */}
                <section id="user-accounts" className="mb-12">
                  <div className="flex items-center space-x-2 mb-4">
                    <User className="h-6 w-6 text-indigo-600" />
                    <h2 className="text-2xl font-bold m-0">User Accounts</h2>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3">Account Registration</h3>
                  <p>To use certain features of our Service, you must create an account. You agree to:</p>
                  <ul>
                    <li>Provide accurate, current, and complete information</li>
                    <li>Maintain and update your account information</li>
                    <li>Keep your password secure and confidential</li>
                    <li>Accept responsibility for all activities under your account</li>
                    <li>Notify us immediately of any unauthorized use</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold mb-3">Account Types</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                    <Card className="border-green-200 dark:border-green-800">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center space-x-2">
                          <User className="h-4 w-4 text-green-600" />
                          <span>Free Account</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <ul className="text-sm space-y-1">
                          <li>• Basic agent development</li>
                          <li>• Limited deployments</li>
                          <li>• Community support</li>
                          <li>• Standard features</li>
                        </ul>
                      </CardContent>
                    </Card>
                    <Card className="border-blue-200 dark:border-blue-800">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center space-x-2">
                          <UserPlus className="h-4 w-4 text-blue-600" />
                          <span>Pro Account</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <ul className="text-sm space-y-1">
                          <li>• Advanced features</li>
                          <li>• Unlimited deployments</li>
                          <li>• Priority support</li>
                          <li>• Analytics dashboard</li>
                        </ul>
                      </CardContent>
                    </Card>
                    <Card className="border-purple-200 dark:border-purple-800">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center space-x-2">
                          <Crown className="h-4 w-4 text-purple-600" />
                          <span>Enterprise</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <ul className="text-sm space-y-1">
                          <li>• Custom solutions</li>
                          <li>• Dedicated support</li>
                          <li>• SLA guarantees</li>
                          <li>• White-label options</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </section>

                {/* Acceptable Use Policy */}
                <section id="acceptable-use" className="mb-12">
                  <div className="flex items-center space-x-2 mb-4">
                    <Shield className="h-6 w-6 text-red-600" />
                    <h2 className="text-2xl font-bold m-0">Acceptable Use Policy</h2>
                  </div>
                  <p>You agree to use our Service only for lawful purposes and in accordance with these Terms. You may not:</p>
                  
                  <h3 className="text-xl font-semibold mb-3">Prohibited Activities</h3>
                  <div className="space-y-4 my-6">
                    <Card className="border-l-4 border-red-600">
                      <CardContent className="pt-4">
                        <h4 className="font-semibold mb-2 flex items-center space-x-2">
                          <Ban className="h-4 w-4 text-red-600" />
                          <span>Illegal Activities</span>
                        </h4>
                        <ul className="text-sm space-y-1">
                          <li>• Violate any applicable laws or regulations</li>
                          <li>• Engage in fraudulent or deceptive practices</li>
                          <li>• Infringe on intellectual property rights</li>
                          <li>• Distribute malware or harmful code</li>
                        </ul>
                      </CardContent>
                    </Card>
                    <Card className="border-l-4 border-orange-600">
                      <CardContent className="pt-4">
                        <h4 className="font-semibold mb-2 flex items-center space-x-2">
                          <AlertTriangle className="h-4 w-4 text-orange-600" />
                          <span>Platform Abuse</span>
                        </h4>
                        <ul className="text-sm space-y-1">
                          <li>• Attempt to gain unauthorized access</li>
                          <li>• Interfere with platform security</li>
                          <li>• Overload or disrupt our systems</li>
                          <li>• Reverse engineer our software</li>
                        </ul>
                      </CardContent>
                    </Card>
                    <Card className="border-l-4 border-yellow-600">
                      <CardContent className="pt-4">
                        <h4 className="font-semibold mb-2 flex items-center space-x-2">
                          <UserX className="h-4 w-4 text-yellow-600" />
                          <span>Harmful Content</span>
                        </h4>
                        <ul className="text-sm space-y-1">
                          <li>• Create agents for harassment or abuse</li>
                          <li>• Generate spam or unsolicited content</li>
                          <li>• Spread misinformation or false content</li>
                          <li>• Violate privacy rights of others</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </section>

                {/* Intellectual Property */}
                <section id="intellectual-property" className="mb-12">
                  <div className="flex items-center space-x-2 mb-4">
                    <Copyright className="h-6 w-6 text-cyan-600" />
                    <h2 className="text-2xl font-bold m-0">Intellectual Property Rights</h2>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3">QAID's Rights</h3>
                  <p>
                    The Service and all content, features, and functionality are owned by QAID and are 
                    protected by copyright, trademark, and other intellectual property laws.
                  </p>
                  
                  <h3 className="text-xl font-semibold mb-3">User Content</h3>
                  <p>You retain ownership of content you create using our Service, but you grant us:</p>
                  <ul>
                    <li>A license to host, store, and display your content</li>
                    <li>Rights to provide technical support and maintenance</li>
                    <li>Permission to improve our Service based on usage patterns</li>
                    <li>Rights to showcase your work in marketing materials (with permission)</li>
                  </ul>
                  
                  <div className="bg-cyan-50 dark:bg-cyan-950/20 p-4 rounded-lg border border-cyan-200 dark:border-cyan-800">
                    <h4 className="font-semibold mb-2">Marketplace Content</h4>
                    <p className="text-sm m-0">
                      When you publish agents to our marketplace, you grant other users licenses 
                      as specified in your listing terms. You remain responsible for ensuring 
                      you have the right to grant such licenses.
                    </p>
                  </div>
                </section>

                {/* Payment Terms */}
                <section id="payment-terms" className="mb-12">
                  <div className="flex items-center space-x-2 mb-4">
                    <CreditCard className="h-6 w-6 text-green-600" />
                    <h2 className="text-2xl font-bold m-0">Payment and Billing Terms</h2>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3">Subscription Fees</h3>
                  <p>Certain features of our Service require payment of subscription fees:</p>
                  <ul>
                    <li>Fees are billed in advance on a recurring basis</li>
                    <li>All fees are non-refundable unless otherwise stated</li>
                    <li>We may change fees with 30 days' notice</li>
                    <li>Taxes are your responsibility unless otherwise required by law</li>
                  </ul>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center space-x-2">
                          <DollarSign className="h-4 w-4" />
                          <span>Payment Processing</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <ul className="text-sm space-y-1">
                          <li>• Secure payment processing</li>
                          <li>• Multiple payment methods</li>
                          <li>• Automatic billing and receipts</li>
                          <li>• PCI DSS compliance</li>
                        </ul>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center space-x-2">
                          <RotateCcw className="h-4 w-4" />
                          <span>Refund Policy</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <ul className="text-sm space-y-1">
                          <li>• 30-day money-back guarantee</li>
                          <li>• Prorated refunds for downgrades</li>
                          <li>• No refunds for marketplace purchases</li>
                          <li>• Case-by-case exception review</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </section>

                {/* Privacy and Data */}
                <section id="privacy" className="mb-12">
                  <div className="flex items-center space-x-2 mb-4">
                    <Lock className="h-6 w-6 text-blue-600" />
                    <h2 className="text-2xl font-bold m-0">Privacy and Data Protection</h2>
                  </div>
                  <p>
                    Your privacy is important to us. Our collection, use, and protection of your 
                    personal information is governed by our Privacy Policy, which is incorporated 
                    into these Terms by reference.
                  </p>
                  
                  <h3 className="text-xl font-semibold mb-3">Data Processing</h3>
                  <p>By using our Service, you acknowledge that we may:</p>
                  <ul>
                    <li>Process your personal data as described in our Privacy Policy</li>
                    <li>Use aggregated, anonymized data to improve our Service</li>
                    <li>Store your data in secure data centers worldwide</li>
                    <li>Share data with trusted service providers under strict agreements</li>
                  </ul>
                  
                  <div className="flex justify-center mt-6">
                    <Button onClick={() => onViewChange('privacy')}>
                      <Lock className="h-4 w-4 mr-2" />
                      View Privacy Policy
                    </Button>
                  </div>
                </section>

                {/* Disclaimers */}
                <section id="disclaimers" className="mb-12">
                  <div className="flex items-center space-x-2 mb-4">
                    <AlertTriangle className="h-6 w-6 text-orange-600" />
                    <h2 className="text-2xl font-bold m-0">Disclaimers</h2>
                  </div>
                  
                  <div className="bg-orange-50 dark:bg-orange-950/20 p-6 rounded-lg border-l-4 border-orange-600 mb-6">
                    <h3 className="font-semibold mb-3 text-orange-800 dark:text-orange-200">
                      THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE"
                    </h3>
                    <p className="text-sm text-orange-700 dark:text-orange-300 m-0">
                      We make no warranties, express or implied, regarding the Service, including but not limited to 
                      warranties of merchantability, fitness for a particular purpose, or non-infringement.
                    </p>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3">Specific Disclaimers</h3>
                  <ul>
                    <li><strong>Availability:</strong> We do not guarantee uninterrupted or error-free operation</li>
                    <li><strong>Accuracy:</strong> Information provided may not always be accurate or complete</li>
                    <li><strong>Third-Party Content:</strong> We are not responsible for third-party content or services</li>
                    <li><strong>AI Results:</strong> AI-generated content may not be accurate, appropriate, or suitable for your needs</li>
                    <li><strong>Security:</strong> No system is completely secure; we cannot guarantee absolute security</li>
                  </ul>
                </section>

                {/* Limitation of Liability */}
                <section id="limitations" className="mb-12">
                  <div className="flex items-center space-x-2 mb-4">
                    <Scale className="h-6 w-6 text-purple-600" />
                    <h2 className="text-2xl font-bold m-0">Limitation of Liability</h2>
                  </div>
                  
                  <div className="bg-purple-50 dark:bg-purple-950/20 p-6 rounded-lg border-l-4 border-purple-600 mb-6">
                    <p className="font-semibold mb-2 text-purple-800 dark:text-purple-200">
                      TO THE MAXIMUM EXTENT PERMITTED BY LAW:
                    </p>
                    <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1 m-0">
                      <li>• We shall not be liable for any indirect, incidental, special, or consequential damages</li>
                      <li>• Our total liability shall not exceed the amount paid by you in the 12 months preceding the claim</li>
                      <li>• These limitations apply regardless of the theory of liability</li>
                    </ul>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3">Exceptions</h3>
                  <p>These limitations do not apply to:</p>
                  <ul>
                    <li>Our gross negligence or willful misconduct</li>
                    <li>Death or personal injury caused by our negligence</li>
                    <li>Fraud or fraudulent misrepresentation</li>
                    <li>Any liability that cannot be excluded by law</li>
                  </ul>
                </section>

                {/* Indemnification */}
                <section id="indemnification" className="mb-12">
                  <div className="flex items-center space-x-2 mb-4">
                    <Shield className="h-6 w-6 text-emerald-600" />
                    <h2 className="text-2xl font-bold m-0">Indemnification</h2>
                  </div>
                  <p>
                    You agree to indemnify, defend, and hold harmless QAID, its officers, directors, 
                    employees, and agents from and against any claims, damages, losses, costs, and 
                    expenses arising from:
                  </p>
                  <ul>
                    <li>Your use of the Service</li>
                    <li>Your violation of these Terms</li>
                    <li>Your violation of any rights of others</li>
                    <li>Content you create or share through the Service</li>
                    <li>Any AI agents you develop or deploy</li>
                  </ul>
                </section>

                {/* Termination */}
                <section id="termination" className="mb-12">
                  <div className="flex items-center space-x-2 mb-4">
                    <XCircle className="h-6 w-6 text-red-600" />
                    <h2 className="text-2xl font-bold m-0">Termination</h2>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3">Termination by You</h3>
                  <p>You may terminate your account at any time by:</p>
                  <ul>
                    <li>Using the account deletion feature in your settings</li>
                    <li>Contacting our support team</li>
                    <li>Ceasing to use the Service</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold mb-3">Termination by Us</h3>
                  <p>We may terminate or suspend your account immediately if you:</p>
                  <ul>
                    <li>Violate these Terms</li>
                    <li>Engage in fraudulent or illegal activities</li>
                    <li>Abuse the Service or harm other users</li>
                    <li>Fail to pay applicable fees</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold mb-3">Effect of Termination</h3>
                  <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
                    <p className="text-sm m-0">
                      Upon termination, your right to use the Service ceases immediately. 
                      We may delete your account and data, though some information may be 
                      retained as required by law or our data retention policies.
                    </p>
                  </div>
                </section>

                {/* Governing Law */}
                <section id="governing-law" className="mb-12">
                  <div className="flex items-center space-x-2 mb-4">
                    <Gavel className="h-6 w-6 text-indigo-600" />
                    <h2 className="text-2xl font-bold m-0">Governing Law and Dispute Resolution</h2>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3">Governing Law</h3>
                  <p>
                    These Terms are governed by and construed in accordance with the laws of the 
                    State of California, United States, without regard to conflict of law principles.
                  </p>
                  
                  <h3 className="text-xl font-semibold mb-3">Dispute Resolution</h3>
                  <p>Any disputes arising from these Terms or your use of the Service will be resolved through:</p>
                  <ol>
                    <li><strong>Informal Resolution:</strong> Good faith negotiations between the parties</li>
                    <li><strong>Mediation:</strong> Non-binding mediation if informal resolution fails</li>
                    <li><strong>Arbitration:</strong> Binding arbitration under AAA Commercial Arbitration Rules</li>
                  </ol>
                  
                  <div className="bg-indigo-50 dark:bg-indigo-950/20 p-4 rounded-lg border border-indigo-200 dark:border-indigo-800">
                    <h4 className="font-semibold mb-2">Class Action Waiver</h4>
                    <p className="text-sm m-0">
                      You agree that any dispute resolution proceedings will be conducted only on an 
                      individual basis and not in a class, consolidated, or representative action.
                    </p>
                  </div>
                </section>

                {/* Changes to Terms */}
                <section id="changes" className="mb-12">
                  <div className="flex items-center space-x-2 mb-4">
                    <RefreshCw className="h-6 w-6 text-cyan-600" />
                    <h2 className="text-2xl font-bold m-0">Changes to These Terms</h2>
                  </div>
                  <p>
                    We reserve the right to modify these Terms at any time. We will notify you of changes by:
                  </p>
                  <ul>
                    <li>Posting updated Terms on our website</li>
                    <li>Updating the "Last Updated" date</li>
                    <li>Sending email notifications for material changes</li>
                    <li>Providing in-app notifications</li>
                  </ul>
                  <p>
                    Your continued use of the Service after changes become effective constitutes 
                    acceptance of the revised Terms.
                  </p>
                </section>

                {/* Contact Information */}
                <section id="contact" className="mb-12">
                  <div className="flex items-center space-x-2 mb-4">
                    <MessageSquare className="h-6 w-6 text-violet-600" />
                    <h2 className="text-2xl font-bold m-0">Contact Information</h2>
                  </div>
                  <p>
                    If you have any questions about these Terms of Service, please contact us:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center space-x-2">
                          <Building2 className="h-4 w-4" />
                          <span>QAID Technologies, Inc.</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0 space-y-2">
                        <div className="flex items-center space-x-2 text-sm">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span>legal@qaid.ai</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>+1 (555) 123-QAID</span>
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
                          <Gavel className="h-4 w-4" />
                          <span>Legal Department</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0 space-y-2">
                        <div className="flex items-center space-x-2 text-sm">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span>terms@qaid.ai</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          For legal inquiries, contract questions, 
                          and terms of service clarifications.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </section>

                {/* Quick Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12 pt-8 border-t">
                  <Button onClick={() => onViewChange('privacy')}>
                    <Lock className="h-4 w-4 mr-2" />
                    Privacy Policy
                  </Button>
                  <Button variant="outline" onClick={() => onViewChange('cookies')}>
                    <Settings className="h-4 w-4 mr-2" />
                    Cookie Policy
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