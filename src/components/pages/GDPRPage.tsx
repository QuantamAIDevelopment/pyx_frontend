'use client'

import { useState } from 'react'
import { Button } from '../common/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../common/ui/card'
import { Badge } from '../common/ui/badge'
// import { Separator } from '../common/ui/separator'
// import { ScrollArea } from '../common/ui/scroll-area'
import { 
  Shield,
  Scale,
  Eye,
  Lock,
  // Key,
  Globe,
  FileText,
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
  Database,
  // Cloud,
  Server,
  Trash2,
  Edit,
  // RefreshCw,
  // Bell,
  MapPin,
  Building2,
  Gavel,
  BookOpen,
  HelpCircle,
  MessageSquare,
  Clock,
  Target,
  // Zap,
  Award,
  // Star,
  Users,
  UserCheck,
  // UserX,
  // UserPlus,
  Settings,
  // Sliders,
  // ToggleLeft,
  // ToggleRight,
  // Search,
  // Filter,
  // Copy,
  // Clipboard,
  // ClipboardCheck,
  // FileSearch,
  // FileX,
  // FilePlus,
  // FolderOpen,
  // Archive,
  // Package,
  // Inbox,
  // Send,
  // Upload,
  // Download as DownloadIcon,
  // Link,
  // Unlink,
  // Network,
  // Wifi,
  // Router,
  // HardDrive,
  // Cpu,
  // Code,
  // Terminal,
  // Command,
  // Play,
  // Pause,
  // Stop,
  // SkipForward,
  // SkipBack,
  // Home,
  // Building,
  // Store,
  // Briefcase,
  // GraduationCap,
  // Stethoscope,
  // Flag,
  // Navigation,
  // Compass,
  // Map,
  // Layers,
  // Grid,
  // List,
  // Table,
  // BarChart3,
  // TrendingUp,
  // Activity,
  // PieChart,
  // LineChart,
  // AreaChart,
  // Monitor,
  // Smartphone,
  // Tablet,
  // Laptop,
  // MousePointer,
  // Keyboard,
  // Mic,
  // Camera,
  // Video,
  // Image,
  // FileVideo,
  // FileImage,
  // Folder,
  // FolderPlus,
  // FolderMinus,
  // ShoppingCart,
  // CreditCard,
  // DollarSign,
  // Percent,
  // Calculator,
  // Plus,
  // Minus,
  X,
  // Check,
  // AlertTriangle,
  Ban,
  // XCircle,
  // CheckCircle2,
  // Crown,
  // Sparkles,
  // Flame,
  // Sun,
  // Moon,
  // Stars,
  // CloudRain,
  // Snowflake,
  // Wind,
  // Thermometer,
  // Rocket,
  // Plane,
  // Car,
  // Bus,
  // Bike,
  // Train,
  // Ship,
  // Truck
} from 'lucide-react'

interface GDPRPageProps {
  onViewChange: (view: string) => void
  isLoggedIn: boolean
  onShowAuth: (mode: 'login' | 'signup') => void
}

export function GDPRPage({ onViewChange }: GDPRPageProps) {
  const [activeSection, setActiveSection] = useState('introduction')
  // const [requestType, setRequestType] = useState('')

  const lastUpdated = 'December 15, 2024'
  const effectiveDate = 'May 25, 2018'

  const tableOfContents = [
    { id: 'introduction', title: 'GDPR Overview', icon: Info },
    { id: 'our-commitment', title: 'Our Commitment', icon: Shield },
    { id: 'lawful-basis', title: 'Lawful Basis', icon: Scale },
    { id: 'your-rights', title: 'Your Rights', icon: Users },
    { id: 'data-processing', title: 'Data Processing', icon: Database },
    { id: 'data-transfers', title: 'International Transfers', icon: Globe },
    { id: 'retention', title: 'Data Retention', icon: Clock },
    { id: 'security', title: 'Data Security', icon: Lock },
    { id: 'breach-notification', title: 'Breach Notification', icon: AlertCircle },
    { id: 'children', title: 'Children\'s Data', icon: Users },
    { id: 'exercising-rights', title: 'Exercising Your Rights', icon: CheckCircle },
    { id: 'complaints', title: 'Complaints & Appeals', icon: MessageSquare },
    { id: 'dpo', title: 'Data Protection Officer', icon: UserCheck },
    { id: 'contact', title: 'Contact Information', icon: Mail }
  ]

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const dataRights = [
    {
      id: 'access',
      title: 'Right of Access',
      icon: Eye,
      description: 'Request a copy of your personal data we hold',
      details: [
        'Confirmation of whether we process your data',
        'Access to your personal data',
        'Information about processing purposes',
        'Categories of data processed',
        'Recipients of your data',
        'Storage period or criteria',
        'Your rights regarding this data'
      ]
    },
    {
      id: 'rectification',
      title: 'Right to Rectification',
      icon: Edit,
      description: 'Request correction of inaccurate personal data',
      details: [
        'Correct incomplete or inaccurate data',
        'Update outdated information',
        'Complete incomplete data',
        'Immediate correction when possible'
      ]
    },
    {
      id: 'erasure',
      title: 'Right to Erasure',
      icon: Trash2,
      description: 'Request deletion of your personal data',
      details: [
        'Data no longer necessary for original purpose',
        'Withdrawal of consent',
        'Objection to processing',
        'Unlawful processing has occurred',
        'Legal obligation to erase'
      ]
    },
    {
      id: 'portability',
      title: 'Right to Data Portability',
      icon: Download,
      description: 'Receive your data in a structured, machine-readable format',
      details: [
        'Structured, commonly used format',
        'Machine-readable format',
        'Transmit data to another controller',
        'Applies to automated processing',
        'Based on consent or contract'
      ]
    },
    {
      id: 'restrict',
      title: 'Right to Restrict Processing',
      icon: Ban,
      description: 'Limit how we process your personal data',
      details: [
        'Contest accuracy of data',
        'Processing is unlawful',
        'Data no longer needed but required for legal claims',
        'Objection to processing pending verification'
      ]
    },
    {
      id: 'object',
      title: 'Right to Object',
      icon: X,
      description: 'Object to certain types of processing',
      details: [
        'Processing based on legitimate interests',
        'Direct marketing (absolute right)',
        'Research and statistics',
        'Automated decision-making'
      ]
    }
  ]

  const lawfulBases = [
    {
      basis: 'Consent',
      description: 'You have given clear consent for us to process your data',
      icon: CheckCircle,
      examples: [
        'Marketing communications',
        'Optional features',
        'Cookie preferences',
        'Newsletter subscriptions'
      ]
    },
    {
      basis: 'Contract',
      description: 'Processing is necessary for a contract with you',
      icon: FileText,
      examples: [
        'Account creation and management',
        'Service delivery',
        'Payment processing',
        'Customer support'
      ]
    },
    {
      basis: 'Legal Obligation',
      description: 'Processing is necessary to comply with the law',
      icon: Scale,
      examples: [
        'Tax records',
        'Regulatory compliance',
        'Anti-money laundering',
        'Data breach notifications'
      ]
    },
    {
      basis: 'Legitimate Interests',
      description: 'Processing is necessary for our legitimate interests',
      icon: Target,
      examples: [
        'Fraud prevention',
        'Network security',
        'Internal analytics',
        'Business operations'
      ]
    },
    {
      basis: 'Vital Interests',
      description: 'Processing is necessary to protect vital interests',
      icon: Shield,
      examples: [
        'Medical emergencies',
        'Safety incidents',
        'Risk prevention',
        'Crisis management'
      ]
    },
    {
      basis: 'Public Task',
      description: 'Processing is necessary for a task in the public interest',
      icon: Users,
      examples: [
        'Research purposes',
        'Public safety',
        'Statistical analysis',
        'Academic studies'
      ]
    }
  ]

  const dataCategories = [
    {
      category: 'Identity Data',
      description: 'Name, username, title, date of birth',
      retention: '7 years after account closure',
      purpose: 'Account management and verification'
    },
    {
      category: 'Contact Data',
      description: 'Email address, phone number, address',
      retention: '3 years after last contact',
      purpose: 'Communication and service delivery'
    },
    {
      category: 'Technical Data',
      description: 'IP address, browser type, device information',
      retention: '2 years from collection',
      purpose: 'Security and performance optimization'
    },
    {
      category: 'Usage Data',
      description: 'How you use our services and features',
      retention: '2 years from collection',
      purpose: 'Service improvement and analytics'
    },
    {
      category: 'Marketing Data',
      description: 'Preferences for marketing communications',
      retention: 'Until consent withdrawn',
      purpose: 'Direct marketing and communications'
    },
    {
      category: 'Financial Data',
      description: 'Payment information and transaction history',
      retention: '7 years for tax purposes',
      purpose: 'Payment processing and financial records'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-pink-950/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <Shield className="h-3 w-3 mr-1" />
              GDPR Compliance
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              GDPR{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Compliance
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Your privacy rights under the General Data Protection Regulation. 
              Learn how QAID protects your personal data and ensures compliance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-lg mx-auto mb-12">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 w-full sm:w-auto"
                onClick={() => onViewChange('contact')}
              >
                <UserCheck className="h-4 w-4 mr-2" />
                Contact DPO
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
                  <span className="font-medium">GDPR Effective</span>
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

                {/* Quick Rights Request */}
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="h-5 w-5" />
                      <span>Exercise Your Rights</span>
                    </CardTitle>
                    <CardDescription>
                      Quickly request access to your data or exercise other rights
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button size="sm" variant="outline" className="w-full justify-start">
                      <Eye className="h-4 w-4 mr-2" />
                      Request Data Access
                    </Button>
                    <Button size="sm" variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Download My Data
                    </Button>
                    <Button size="sm" variant="outline" className="w-full justify-start">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete My Account
                    </Button>
                    <Button size="sm" variant="outline" className="w-full justify-start">
                      <Edit className="h-4 w-4 mr-2" />
                      Correct My Data
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
                    <h2 className="text-2xl font-bold m-0">GDPR Overview</h2>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-950/20 p-6 rounded-lg border-l-4 border-blue-600 mb-6">
                    <p className="m-0">
                      The General Data Protection Regulation (GDPR) is the European Union's comprehensive 
                      data privacy regulation that came into effect on May 25, 2018. It strengthens and 
                      harmonizes data protection laws across the EU while giving individuals greater control 
                      over their personal data.
                    </p>
                  </div>
                  <p>
                    QAID is committed to full compliance with GDPR requirements and ensuring your privacy rights 
                    are protected. This page explains how we comply with GDPR, your rights under the regulation, 
                    and how you can exercise those rights.
                  </p>
                  <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-green-800 dark:text-green-200 m-0 mb-1">Our Commitment</h4>
                        <p className="text-sm text-green-700 dark:text-green-300 m-0">
                          QAID applies GDPR standards globally, ensuring consistent privacy protection 
                          for all users regardless of their location.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Our Commitment */}
                <section id="our-commitment" className="mb-12">
                  <div className="flex items-center space-x-2 mb-4">
                    <Shield className="h-6 w-6 text-green-600" />
                    <h2 className="text-2xl font-bold m-0">Our GDPR Commitment</h2>
                  </div>
                  <p>
                    QAID is dedicated to maintaining the highest standards of data protection and privacy. 
                    Our GDPR compliance framework includes:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                    <Card className="border-l-4 border-green-600">
                      <CardContent className="pt-4">
                        <h4 className="font-semibold mb-2 flex items-center space-x-2">
                          <Database className="h-4 w-4 text-green-600" />
                          <span>Data Protection by Design</span>
                        </h4>
                        <p className="text-sm">
                          Privacy considerations are built into every aspect of our platform 
                          from the ground up, ensuring data protection is embedded in our systems.
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="border-l-4 border-blue-600">
                      <CardContent className="pt-4">
                        <h4 className="font-semibold mb-2 flex items-center space-x-2">
                          <Lock className="h-4 w-4 text-blue-600" />
                          <span>Data Protection by Default</span>
                        </h4>
                        <p className="text-sm">
                          Only necessary personal data is processed by default, with privacy-friendly 
                          settings applied automatically to protect your information.
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="border-l-4 border-purple-600">
                      <CardContent className="pt-4">
                        <h4 className="font-semibold mb-2 flex items-center space-x-2">
                          <Eye className="h-4 w-4 text-purple-600" />
                          <span>Transparency & Accountability</span>
                        </h4>
                        <p className="text-sm">
                          We maintain clear records of all data processing activities and provide 
                          transparent information about how we collect, use, and protect your data.
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="border-l-4 border-orange-600">
                      <CardContent className="pt-4">
                        <h4 className="font-semibold mb-2 flex items-center space-x-2">
                          <Users className="h-4 w-4 text-orange-600" />
                          <span>Individual Rights</span>
                        </h4>
                        <p className="text-sm">
                          We have implemented comprehensive processes to ensure you can easily 
                          exercise your GDPR rights and maintain control over your personal data.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </section>

                {/* Lawful Basis */}
                <section id="lawful-basis" className="mb-12">
                  <div className="flex items-center space-x-2 mb-4">
                    <Scale className="h-6 w-6 text-purple-600" />
                    <h2 className="text-2xl font-bold m-0">Lawful Basis for Processing</h2>
                  </div>
                  <p>
                    Under GDPR, we must have a lawful basis for processing your personal data. 
                    Here are the lawful bases we rely on:
                  </p>
                  
                  <div className="space-y-4 my-6">
                    {lawfulBases.map((basis, index) => {
                      const IconComponent = basis.icon
                      return (
                        <Card key={index}>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base flex items-center space-x-2">
                              <IconComponent className="h-5 w-5" />
                              <span>{basis.basis}</span>
                            </CardTitle>
                            <CardDescription>{basis.description}</CardDescription>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <h5 className="font-medium mb-2">Examples:</h5>
                            <ul className="text-sm space-y-1">
                              {basis.examples.map((example, i) => (
                                <li key={i}>• {example}</li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </section>

                {/* Your Rights */}
                <section id="your-rights" className="mb-12">
                  <div className="flex items-center space-x-2 mb-4">
                    <Users className="h-6 w-6 text-indigo-600" />
                    <h2 className="text-2xl font-bold m-0">Your Rights Under GDPR</h2>
                  </div>
                  <p>
                    GDPR grants you specific rights regarding your personal data. Here's what you can do:
                  </p>
                  
                  <div className="space-y-6 my-8">
                    {dataRights.map((right) => {
                      const IconComponent = right.icon
                      return (
                        <Card key={right.id} className="border-l-4 border-indigo-600">
                          <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                              <IconComponent className="h-5 w-5 text-indigo-600" />
                              <span>{right.title}</span>
                            </CardTitle>
                            <CardDescription>{right.description}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              <h5 className="font-medium">This includes:</h5>
                              <ul className="text-sm space-y-1">
                                {right.details.map((detail, index) => (
                                  <li key={index} className="flex items-start space-x-2">
                                    <CheckCircle className="h-3 w-3 text-green-600 mt-1 flex-shrink-0" />
                                    <span>{detail}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </section>

                {/* Data Processing */}
                <section id="data-processing" className="mb-12">
                  <div className="flex items-center space-x-2 mb-4">
                    <Database className="h-6 w-6 text-cyan-600" />
                    <h2 className="text-2xl font-bold m-0">Data Processing Activities</h2>
                  </div>
                  <p>
                    We process different categories of personal data for various purposes. 
                    Here's a detailed breakdown:
                  </p>
                  
                  <div className="overflow-x-auto my-6">
                    <table className="w-full border-collapse border border-border rounded-lg">
                      <thead>
                        <tr className="bg-muted">
                          <th className="border border-border p-3 text-left">Data Category</th>
                          <th className="border border-border p-3 text-left">Description</th>
                          <th className="border border-border p-3 text-left">Retention Period</th>
                          <th className="border border-border p-3 text-left">Purpose</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dataCategories.map((category, index) => (
                          <tr key={index} className="hover:bg-muted/50">
                            <td className="border border-border p-3 font-medium">{category.category}</td>
                            <td className="border border-border p-3 text-sm">{category.description}</td>
                            <td className="border border-border p-3 text-sm">{category.retention}</td>
                            <td className="border border-border p-3 text-sm">{category.purpose}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* International Transfers */}
                <section id="data-transfers" className="mb-12">
                  <div className="flex items-center space-x-2 mb-4">
                    <Globe className="h-6 w-6 text-emerald-600" />
                    <h2 className="text-2xl font-bold m-0">International Data Transfers</h2>
                  </div>
                  <p>
                    Some of our service providers are located outside the European Economic Area (EEA). 
                    We ensure appropriate safeguards are in place for all international transfers:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                    <Card>
                      <CardContent className="pt-4">
                        <h4 className="font-semibold mb-2 flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>Adequacy Decisions</span>
                        </h4>
                        <p className="text-sm">
                          We prioritize transfers to countries with EU adequacy decisions, 
                          ensuring equivalent data protection standards.
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-4">
                        <h4 className="font-semibold mb-2 flex items-center space-x-2">
                          <FileText className="h-4 w-4 text-blue-600" />
                          <span>Standard Contractual Clauses</span>
                        </h4>
                        <p className="text-sm">
                          We use EU-approved Standard Contractual Clauses (SCCs) to ensure 
                          appropriate safeguards for data transfers.
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-4">
                        <h4 className="font-semibold mb-2 flex items-center space-x-2">
                          <Shield className="h-4 w-4 text-purple-600" />
                          <span>Binding Corporate Rules</span>
                        </h4>
                        <p className="text-sm">
                          Large service providers may have Binding Corporate Rules (BCRs) 
                          approved by EU data protection authorities.
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-4">
                        <h4 className="font-semibold mb-2 flex items-center space-x-2">
                          <Award className="h-4 w-4 text-orange-600" />
                          <span>Certification Programs</span>
                        </h4>
                        <p className="text-sm">
                          We work with providers who have relevant certifications 
                          demonstrating compliance with data protection standards.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </section>

                {/* Data Retention */}
                <section id="retention" className="mb-12">
                  <div className="flex items-center space-x-2 mb-4">
                    <Clock className="h-6 w-6 text-amber-600" />
                    <h2 className="text-2xl font-bold m-0">Data Retention</h2>
                  </div>
                  <p>
                    We retain personal data only for as long as necessary to fulfill the purposes 
                    for which it was collected or to comply with legal obligations:
                  </p>
                  
                  <div className="bg-amber-50 dark:bg-amber-950/20 p-6 rounded-lg border-l-4 border-amber-600 my-6">
                    <h4 className="font-semibold mb-3">Retention Principles</h4>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Purpose Limitation:</strong> Data is retained only as long as needed for the original purpose</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Legal Requirements:</strong> Some data must be retained to comply with legal obligations</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Secure Deletion:</strong> Data is securely deleted when no longer needed</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Regular Review:</strong> Retention periods are regularly reviewed and updated</span>
                      </li>
                    </ul>
                  </div>
                </section>

                {/* Data Security */}
                <section id="security" className="mb-12">
                  <div className="flex items-center space-x-2 mb-4">
                    <Lock className="h-6 w-6 text-red-600" />
                    <h2 className="text-2xl font-bold m-0">Data Security Measures</h2>
                  </div>
                  <p>
                    We implement appropriate technical and organizational measures to ensure 
                    the security of your personal data:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                    <Card className="border-l-4 border-red-600">
                      <CardContent className="pt-4">
                        <h4 className="font-semibold mb-2 flex items-center space-x-2">
                          <Server className="h-4 w-4 text-red-600" />
                          <span>Technical Safeguards</span>
                        </h4>
                        <ul className="text-sm space-y-1">
                          <li>• End-to-end encryption</li>
                          <li>• Access controls and authentication</li>
                          <li>• Regular security assessments</li>
                          <li>• Secure data transmission</li>
                        </ul>
                      </CardContent>
                    </Card>
                    <Card className="border-l-4 border-blue-600">
                      <CardContent className="pt-4">
                        <h4 className="font-semibold mb-2 flex items-center space-x-2">
                          <Users className="h-4 w-4 text-blue-600" />
                          <span>Organizational Measures</span>
                        </h4>
                        <ul className="text-sm space-y-1">
                          <li>• Staff training and awareness</li>
                          <li>• Data protection policies</li>
                          <li>• Incident response procedures</li>
                          <li>• Regular audits and reviews</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </section>

                {/* Breach Notification */}
                <section id="breach-notification" className="mb-12">
                  <div className="flex items-center space-x-2 mb-4">
                    <AlertCircle className="h-6 w-6 text-orange-600" />
                    <h2 className="text-2xl font-bold m-0">Data Breach Notification</h2>
                  </div>
                  <p>
                    In the unlikely event of a data breach, we have procedures in place 
                    to respond quickly and effectively:
                  </p>
                  
                  <div className="bg-orange-50 dark:bg-orange-950/20 p-6 rounded-lg border-l-4 border-orange-600 my-6">
                    <h4 className="font-semibold mb-3">Our Breach Response Process</h4>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="bg-orange-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</div>
                        <div>
                          <h5 className="font-medium">Immediate Response (within 1 hour)</h5>
                          <p className="text-sm text-muted-foreground">Contain the breach and assess the impact</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-orange-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</div>
                        <div>
                          <h5 className="font-medium">Authority Notification (within 72 hours)</h5>
                          <p className="text-sm text-muted-foreground">Report to relevant supervisory authorities</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-orange-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</div>
                        <div>
                          <h5 className="font-medium">Individual Notification (without delay)</h5>
                          <p className="text-sm text-muted-foreground">Inform affected individuals if high risk to their rights</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Children's Data */}
                <section id="children" className="mb-12">
                  <div className="flex items-center space-x-2 mb-4">
                    <Users className="h-6 w-6 text-pink-600" />
                    <h2 className="text-2xl font-bold m-0">Children's Data Protection</h2>
                  </div>
                  <div className="bg-pink-50 dark:bg-pink-950/20 p-6 rounded-lg border-l-4 border-pink-600">
                    <h4 className="font-semibold mb-3">Special Protection for Children</h4>
                    <p className="text-sm m-0">
                      GDPR provides enhanced protection for children's personal data. We do not 
                      knowingly collect personal data from children under 16 (or the relevant age 
                      in your country) without appropriate parental consent. If you believe a child 
                      has provided us with personal data, please contact us immediately.
                    </p>
                  </div>
                </section>

                {/* Exercising Rights */}
                <section id="exercising-rights" className="mb-12">
                  <div className="flex items-center space-x-2 mb-4">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    <h2 className="text-2xl font-bold m-0">How to Exercise Your Rights</h2>
                  </div>
                  <p>
                    You can exercise your GDPR rights by contacting us through various channels. 
                    We aim to respond to all requests within one month:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                    <Card>
                      <CardContent className="pt-4">
                        <h4 className="font-semibold mb-2 flex items-center space-x-2">
                          <Settings className="h-4 w-4 text-blue-600" />
                          <span>Self-Service Portal</span>
                        </h4>
                        <p className="text-sm mb-3">
                          Access your account settings to update information, download data, 
                          or delete your account.
                        </p>
                        <Button size="sm" className="w-full">
                          Access Portal
                        </Button>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-4">
                        <h4 className="font-semibold mb-2 flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-green-600" />
                          <span>Email Request</span>
                        </h4>
                        <p className="text-sm mb-3">
                          Send a detailed request to our Data Protection Officer with 
                          your specific requirements.
                        </p>
                        <Button size="sm" variant="outline" className="w-full">
                          Send Email
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                    <h4 className="font-semibold mb-2">What to Include in Your Request</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Your full name and contact information</li>
                      <li>• Proof of identity (for security purposes)</li>
                      <li>• Clear description of your request</li>
                      <li>• Specific data or processing activities involved</li>
                      <li>• Preferred response method</li>
                    </ul>
                  </div>
                </section>

                {/* Complaints */}
                <section id="complaints" className="mb-12">
                  <div className="flex items-center space-x-2 mb-4">
                    <MessageSquare className="h-6 w-6 text-violet-600" />
                    <h2 className="text-2xl font-bold m-0">Complaints and Appeals</h2>
                  </div>
                  <p>
                    If you're not satisfied with how we handle your personal data or respond 
                    to your requests, you have the right to complain:
                  </p>
                  
                  <div className="space-y-4 my-6">
                    <Card>
                      <CardContent className="pt-4">
                        <h4 className="font-semibold mb-2 flex items-center space-x-2">
                          <UserCheck className="h-4 w-4 text-blue-600" />
                          <span>Internal Complaint</span>
                        </h4>
                        <p className="text-sm">
                          Contact our Data Protection Officer first to resolve the issue directly. 
                          We take all complaints seriously and will investigate thoroughly.
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-4">
                        <h4 className="font-semibold mb-2 flex items-center space-x-2">
                          <Building2 className="h-4 w-4 text-green-600" />
                          <span>Supervisory Authority</span>
                        </h4>
                        <p className="text-sm">
                          You can lodge a complaint with your local data protection authority 
                          or the Irish Data Protection Commission (our lead supervisory authority).
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </section>

                {/* DPO */}
                <section id="dpo" className="mb-12">
                  <div className="flex items-center space-x-2 mb-4">
                    <UserCheck className="h-6 w-6 text-indigo-600" />
                    <h2 className="text-2xl font-bold m-0">Data Protection Officer</h2>
                  </div>
                  <p>
                    Our Data Protection Officer (DPO) is responsible for overseeing our 
                    data protection strategy and ensuring GDPR compliance:
                  </p>
                  
                  <Card className="my-6">
                    <CardContent className="pt-4">
                      <div className="flex items-start space-x-4">
                        <div className="bg-indigo-100 dark:bg-indigo-900 rounded-full p-3">
                          <UserCheck className="h-8 w-8 text-indigo-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-2">Sarah Johnson, CIPP/E</h4>
                          <p className="text-sm text-muted-foreground mb-3">
                            Certified Information Privacy Professional with over 10 years of experience 
                            in data protection and privacy compliance.
                          </p>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2 text-sm">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              <span>dpo@qaid.ai</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                              <span>+1 (555) 123-GDPR</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </section>

                {/* Contact Information */}
                <section id="contact" className="mb-12">
                  <div className="flex items-center space-x-2 mb-4">
                    <Mail className="h-6 w-6 text-cyan-600" />
                    <h2 className="text-2xl font-bold m-0">Contact Information</h2>
                  </div>
                  <p>
                    For any questions about our GDPR compliance or to exercise your rights, 
                    please contact us:
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
                          <UserCheck className="h-4 w-4" />
                          <span>Data Protection Officer</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0 space-y-2">
                        <div className="flex items-center space-x-2 text-sm">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span>dpo@qaid.ai</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          For GDPR-related inquiries, data subject requests, 
                          and privacy concerns.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </section>

                {/* Quick Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12 pt-8 border-t">
                  <Button onClick={() => onViewChange('privacy')}>
                    <Shield className="h-4 w-4 mr-2" />
                    Privacy Policy
                  </Button>
                  <Button variant="outline" onClick={() => onViewChange('terms')}>
                    <Gavel className="h-4 w-4 mr-2" />
                    Terms of Service
                  </Button>
                  <Button variant="outline" onClick={() => onViewChange('cookies')}>
                    <Shield className="h-4 w-4 mr-2" />
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