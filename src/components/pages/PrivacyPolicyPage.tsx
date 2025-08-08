'use client'

import { useState } from 'react'
import { Button } from '../common/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../common/ui/card'
import { Badge } from '../common/ui/badge'

import { 
  Shield,
  Lock,
  Eye,
  Users,
  Globe,
  Calendar,
  Mail,
  Phone,
  ArrowRight,
  AlertCircle,
  CheckCircle,
  Info,
  Download,
  Share2,
  Settings,
  Database,
  Cookie,
  UserCheck,
  Trash2,
  Edit,
  RefreshCw,
  MapPin,
  Building2,
  Scale,
  Gavel,
  BookOpen,
  HelpCircle,
  MessageSquare,
  Clock,
  Target,
  Zap,
  Award,
} from 'lucide-react'

interface PrivacyPolicyPageProps {
  onViewChange: (view: string) => void
  isLoggedIn: boolean
  onShowAuth: (mode: 'login' | 'signup') => void
}

export function PrivacyPolicyPage({ onViewChange }: PrivacyPolicyPageProps) {
  const [activeSection, setActiveSection] = useState('introduction')

  const lastUpdated = 'December 15, 2024'
  const effectiveDate = 'January 1, 2024'

  const tableOfContents = [
    { id: 'introduction', title: 'Introduction', icon: Info },
    { id: 'information-collection', title: 'Information We Collect', icon: Database },
    { id: 'information-use', title: 'How We Use Information', icon: Target },
    { id: 'information-sharing', title: 'Information Sharing', icon: Share2 },
    { id: 'data-security', title: 'Data Security', icon: Shield },
    { id: 'cookies', title: 'Cookies and Tracking', icon: Cookie },
    { id: 'user-rights', title: 'Your Rights', icon: UserCheck },
    { id: 'data-retention', title: 'Data Retention', icon: Clock },
    { id: 'international-transfers', title: 'International Transfers', icon: Globe },
    { id: 'children-privacy', title: 'Children\'s Privacy', icon: Users },
    { id: 'policy-changes', title: 'Policy Changes', icon: RefreshCw },
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
      <section className="py-20 bg-bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-brand-primary text-white">
              <Shield className="h-3 w-3 mr-1" />
              Legal Document
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Privacy{' '}
              <span className="bg-brand-primary bg-clip-text text-transparent">
                Policy
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Your privacy is important to us. This policy explains how QAID collects, 
              uses, and protects your personal information.
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
                      QAID Technologies, Inc. ("QAID," "we," "us," or "our") is committed to protecting your privacy. 
                      This Privacy Policy explains how we collect, use, disclose, and safeguard your information when 
                      you visit our website, use our AI agent marketplace platform, or engage with our services.
                    </p>
                  </div>
                  <p>
                    By using our services, you agree to the collection and use of information in accordance with this policy. 
                    We will not use or share your information with anyone except as described in this Privacy Policy.
                  </p>
                  <div className="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-amber-800 dark:text-amber-200 m-0 mb-1">Important Notice</h4>
                        <p className="text-sm text-amber-700 dark:text-amber-300 m-0">
                          This policy applies to all QAID services, including our AI agent marketplace, 
                          developer tools, and related platforms.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Information We Collect */}
                <section id="information-collection" className="mb-12">
                  <div className="flex items-center space-x-2 mb-4">
                    <Database className="h-6 w-6 text-purple-600" />
                    <h2 className="text-2xl font-bold m-0">Information We Collect</h2>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3">Personal Information You Provide</h3>
                  <p>We collect information you voluntarily provide when you:</p>
                  <ul>
                    <li>Create an account or register for our services</li>
                    <li>Use our AI agent marketplace or development tools</li>
                    <li>Contact us for support or inquiries</li>
                    <li>Subscribe to our newsletters or marketing communications</li>
                    <li>Participate in surveys, contests, or promotions</li>
                  </ul>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center space-x-2">
                          <UserCheck className="h-4 w-4" />
                          <span>Account Information</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <ul className="text-sm space-y-1">
                          <li>• Name and email address</li>
                          <li>• Username and password</li>
                          <li>• Profile information</li>
                          <li>• Payment information</li>
                        </ul>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center space-x-2">
                          <Settings className="h-4 w-4" />
                          <span>Usage Information</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <ul className="text-sm space-y-1">
                          <li>• AI agent configurations</li>
                          <li>• Platform interactions</li>
                          <li>• Feature usage patterns</li>
                          <li>• Support communications</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <h3 className="text-xl font-semibold mb-3">Information Automatically Collected</h3>
                  <p>We automatically collect certain information when you use our services:</p>
                  <ul>
                    <li><strong>Device Information:</strong> IP address, browser type, operating system, device identifiers</li>
                    <li><strong>Usage Data:</strong> Pages visited, time spent, click patterns, feature usage</li>
                    <li><strong>Performance Data:</strong> Load times, errors, system performance metrics</li>
                    <li><strong>Location Data:</strong> Approximate geographic location based on IP address</li>
                  </ul>
                </section>

                {/* How We Use Information */}
                <section id="information-use" className="mb-12">
                  <div className="flex items-center space-x-2 mb-4">
                    <Target className="h-6 w-6 text-green-600" />
                    <h2 className="text-2xl font-bold m-0">How We Use Information</h2>
                  </div>
                  <p>We use the collected information for various purposes, including:</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                    <Card className="border-green-200 dark:border-green-800">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center space-x-2">
                          <Zap className="h-4 w-4 text-green-600" />
                          <span>Service Provision</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <ul className="text-sm space-y-1">
                          <li>• Provide and maintain services</li>
                          <li>• Process transactions</li>
                          <li>• Customize user experience</li>
                          <li>• Enable platform features</li>
                        </ul>
                      </CardContent>
                    </Card>
                    <Card className="border-blue-200 dark:border-blue-800">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center space-x-2">
                          <MessageSquare className="h-4 w-4 text-blue-600" />
                          <span>Communication</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <ul className="text-sm space-y-1">
                          <li>• Send service notifications</li>
                          <li>• Provide customer support</li>
                          <li>• Share product updates</li>
                          <li>• Marketing communications</li>
                        </ul>
                      </CardContent>
                    </Card>
                    <Card className="border-purple-200 dark:border-purple-800">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center space-x-2">
                          <Award className="h-4 w-4 text-purple-600" />
                          <span>Improvement</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <ul className="text-sm space-y-1">
                          <li>• Analyze usage patterns</li>
                          <li>• Improve platform performance</li>
                          <li>• Develop new features</li>
                          <li>• Conduct research</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </section>

                {/* Information Sharing */}
                <section id="information-sharing" className="mb-12">
                  <div className="flex items-center space-x-2 mb-4">
                    <Share2 className="h-6 w-6 text-orange-600" />
                    <h2 className="text-2xl font-bold m-0">Information Sharing</h2>
                  </div>
                  <p>We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:</p>
                  
                  <div className="space-y-4 my-6">
                    <Card className="border-l-4 border-blue-600">
                      <CardContent className="pt-4">
                        <h4 className="font-semibold mb-2">Service Providers</h4>
                        <p className="text-sm">
                          We may share information with trusted third-party service providers who assist in operating 
                          our platform, conducting business, or serving users, provided they agree to keep information confidential.
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="border-l-4 border-green-600">
                      <CardContent className="pt-4">
                        <h4 className="font-semibold mb-2">Legal Requirements</h4>
                        <p className="text-sm">
                          We may disclose information when required by law, court order, or legal process, 
                          or to protect our rights, property, or safety, or that of others.
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="border-l-4 border-purple-600">
                      <CardContent className="pt-4">
                        <h4 className="font-semibold mb-2">Business Transfers</h4>
                        <p className="text-sm">
                          In connection with any merger, acquisition, or sale of assets, 
                          user information may be transferred as part of the business transaction.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </section>

                {/* Data Security */}
                <section id="data-security" className="mb-12">
                  <div className="flex items-center space-x-2 mb-4">
                    <Shield className="h-6 w-6 text-red-600" />
                    <h2 className="text-2xl font-bold m-0">Data Security</h2>
                  </div>
                  <p>
                    We implement appropriate technical and organizational security measures to protect your 
                    personal information against unauthorized access, alteration, disclosure, or destruction.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center space-x-2">
                          <Lock className="h-4 w-4" />
                          <span>Technical Safeguards</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <ul className="text-sm space-y-1">
                          <li>• SSL/TLS encryption</li>
                          <li>• Secure data centers</li>
                          <li>• Regular security audits</li>
                          <li>• Access controls</li>
                          <li>• Data backup systems</li>
                        </ul>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center space-x-2">
                          <Users className="h-4 w-4" />
                          <span>Administrative Safeguards</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <ul className="text-sm space-y-1">
                          <li>• Employee training</li>
                          <li>• Privacy policies</li>
                          <li>• Incident response plans</li>
                          <li>• Regular compliance reviews</li>
                          <li>• Vendor assessments</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-red-800 dark:text-red-200 m-0 mb-1">Security Disclaimer</h4>
                        <p className="text-sm text-red-700 dark:text-red-300 m-0">
                          While we implement strong security measures, no method of transmission over the internet 
                          or electronic storage is 100% secure. We cannot guarantee absolute security.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Cookies and Tracking */}
                <section id="cookies" className="mb-12">
                  <div className="flex items-center space-x-2 mb-4">
                    <Cookie className="h-6 w-6 text-amber-600" />
                    <h2 className="text-2xl font-bold m-0">Cookies and Tracking Technologies</h2>
                  </div>
                  <p>
                    We use cookies and similar tracking technologies to track activity on our service and 
                    store certain information to improve user experience and analyze usage patterns.
                  </p>
                  
                  <h3 className="text-xl font-semibold mb-3">Types of Cookies We Use</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium">Essential Cookies</h4>
                        <p className="text-sm text-muted-foreground">Required for basic site functionality and security</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
                      <Eye className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium">Analytics Cookies</h4>
                        <p className="text-sm text-muted-foreground">Help us understand how visitors interact with our website</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
                      <Settings className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium">Functional Cookies</h4>
                        <p className="text-sm text-muted-foreground">Enable enhanced functionality and personalization</p>
                      </div>
                    </div>
                  </div>
                  
                  <p className="mt-4">
                    You can control cookies through your browser settings. However, disabling certain cookies 
                    may affect the functionality of our services.
                  </p>
                </section>

                {/* Your Rights */}
                <section id="user-rights" className="mb-12">
                  <div className="flex items-center space-x-2 mb-4">
                    <UserCheck className="h-6 w-6 text-indigo-600" />
                    <h2 className="text-2xl font-bold m-0">Your Privacy Rights</h2>
                  </div>
                  <p>
                    Depending on your location, you may have certain rights regarding your personal information. 
                    These rights may include:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                    <Card>
                      <CardContent className="pt-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Eye className="h-4 w-4 text-blue-600" />
                          <h4 className="font-semibold">Access</h4>
                        </div>
                        <p className="text-sm">Request access to your personal information we hold</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Edit className="h-4 w-4 text-green-600" />
                          <h4 className="font-semibold">Correction</h4>
                        </div>
                        <p className="text-sm">Request correction of inaccurate information</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Trash2 className="h-4 w-4 text-red-600" />
                          <h4 className="font-semibold">Deletion</h4>
                        </div>
                        <p className="text-sm">Request deletion of your personal information</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Download className="h-4 w-4 text-purple-600" />
                          <h4 className="font-semibold">Portability</h4>
                        </div>
                        <p className="text-sm">Request a copy of your data in a portable format</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <p>
                    To exercise these rights, please contact us using the information provided in the 
                    "Contact Information" section below. We will respond to your request within the 
                    timeframe required by applicable law.
                  </p>
                </section>

                {/* Data Retention */}
                <section id="data-retention" className="mb-12">
                  <div className="flex items-center space-x-2 mb-4">
                    <Clock className="h-6 w-6 text-cyan-600" />
                    <h2 className="text-2xl font-bold m-0">Data Retention</h2>
                  </div>
                  <p>
                    We retain personal information only for as long as necessary to fulfill the purposes 
                    outlined in this Privacy Policy, unless a longer retention period is required or 
                    permitted by law.
                  </p>
                  
                  <div className="my-6 p-4 bg-cyan-50 dark:bg-cyan-950/20 rounded-lg border border-cyan-200 dark:border-cyan-800">
                    <h4 className="font-semibold mb-3">Retention Periods</h4>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Account Information:</strong> While your account is active, plus 3 years after closure</li>
                      <li>• <strong>Transaction Records:</strong> 7 years for financial and tax compliance</li>
                      <li>• <strong>Usage Data:</strong> 2 years for analytics and improvement purposes</li>
                      <li>• <strong>Marketing Data:</strong> Until you unsubscribe or withdraw consent</li>
                    </ul>
                  </div>
                </section>

                {/* International Transfers */}
                <section id="international-transfers" className="mb-12">
                  <div className="flex items-center space-x-2 mb-4">
                    <Globe className="h-6 w-6 text-teal-600" />
                    <h2 className="text-2xl font-bold m-0">International Data Transfers</h2>
                  </div>
                  <p>
                    Your information may be transferred to and maintained on computers located outside of your 
                    state, province, country, or other governmental jurisdiction where data protection laws 
                    may differ from those in your jurisdiction.
                  </p>
                  <p>
                    When we transfer your information internationally, we ensure appropriate safeguards are 
                    in place, including:
                  </p>
                  <ul>
                    <li>Adequacy decisions by relevant authorities</li>
                    <li>Standard contractual clauses approved by regulatory bodies</li>
                    <li>Binding corporate rules and certification schemes</li>
                    <li>Other legally recognized transfer mechanisms</li>
                  </ul>
                </section>

                {/* Children's Privacy */}
                <section id="children-privacy" className="mb-12">
                  <div className="flex items-center space-x-2 mb-4">
                    <Users className="h-6 w-6 text-pink-600" />
                    <h2 className="text-2xl font-bold m-0">Children's Privacy</h2>
                  </div>
                  <div className="bg-pink-50 dark:bg-pink-950/20 p-4 rounded-lg border border-pink-200 dark:border-pink-800">
                    <p className="m-0">
                      Our services are not intended for children under the age of 13. We do not knowingly 
                      collect personally identifiable information from children under 13. If you are a parent 
                      or guardian and believe your child has provided us with personal information, please 
                      contact us immediately.
                    </p>
                  </div>
                </section>

                {/* Policy Changes */}
                <section id="policy-changes" className="mb-12">
                  <div className="flex items-center space-x-2 mb-4">
                    <RefreshCw className="h-6 w-6 text-emerald-600" />
                    <h2 className="text-2xl font-bold m-0">Changes to This Privacy Policy</h2>
                  </div>
                  <p>
                    We may update our Privacy Policy from time to time. We will notify you of any changes by:
                  </p>
                  <ul>
                    <li>Posting the new Privacy Policy on this page</li>
                    <li>Updating the "Last Updated" date at the top of this policy</li>
                    <li>Sending email notifications for significant changes</li>
                    <li>Providing in-app notifications when you next use our services</li>
                  </ul>
                  <p>
                    We encourage you to review this Privacy Policy periodically for any changes. 
                    Changes to this Privacy Policy are effective when they are posted on this page.
                  </p>
                </section>

                {/* Contact Information */}
                <section id="contact" className="mb-12">
                  <div className="flex items-center space-x-2 mb-4">
                    <MessageSquare className="h-6 w-6 text-violet-600" />
                    <h2 className="text-2xl font-bold m-0">Contact Information</h2>
                  </div>
                  <p>
                    If you have any questions about this Privacy Policy, please contact us:
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
                          <span>privacy@qaid.ai</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>+91 9866669542-QAID</span>
                        </div>
                        <div className="flex items-start space-x-2 text-sm">
                          <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                          <span>123 AI Street, Hyderabad, India - 500001</span>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center space-x-2">
                          <Scale className="h-4 w-4" />
                          <span>Data Protection Officer</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0 space-y-2">
                        <div className="flex items-center space-x-2 text-sm">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span>dpo@qaid.ai</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          For specific data protection and privacy concerns, 
                          contact our dedicated Data Protection Officer.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </section>

                {/* Quick Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12 pt-8 border-t">
                  <Button onClick={() => onViewChange('terms')} className='text-black'>
                    <Gavel className="h-4 w-4 mr-2" />
                    Terms of Service
                  </Button>
                  <Button variant="outline" onClick={() => onViewChange('cookies')}>
                    <Cookie className="h-4 w-4 mr-2" />
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