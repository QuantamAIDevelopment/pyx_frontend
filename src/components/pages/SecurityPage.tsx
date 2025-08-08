'use client'

import { useState } from 'react'
import { Button } from '../common/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../common/ui/card'
import { Badge } from '../common/ui/badge'
import { Progress } from '../common/ui/progress'
import { 
  Shield,
  Lock,
  Key,
  Eye,
  Server,
  Database,
 
  Network,
  FileText,
  Mail,
  Phone,
  ArrowRight,
  AlertCircle,
  CheckCircle,
  ExternalLink,
  Download,
  RefreshCw,
  
  Building2,
  Scale,
  Gavel,
  BookOpen,
  HelpCircle,
  MessageSquare,
  Clock,
  Target,
  Award,
  Users,
  UserCheck,
  // Settings,
  Search,
  Cpu,
  Code,
  // BarChart3,
  Activity,
  CreditCard,
  GraduationCap,
  // AlertTriangle,
  // Building,
  // Globe,
  // Ban
} from 'lucide-react'

interface SecurityPageProps {
  onViewChange: (view: string) => void
  isLoggedIn: boolean
  onShowAuth: (mode: 'login' | 'signup') => void
}

export function SecurityPage({ onViewChange }: SecurityPageProps) {
  const [activeSection, setActiveSection] = useState('overview')

  // const lastUpdated = 'December 15, 2024'
  const lastAudit = 'November 2024'

  const tableOfContents = [
    { id: 'overview', title: 'Security Overview', icon: Shield },
    { id: 'data-security', title: 'Data Security', icon: Database },
    { id: 'infrastructure', title: 'Infrastructure Security', icon: Server },
    { id: 'access-controls', title: 'Access Controls', icon: Key },
    { id: 'encryption', title: 'Encryption', icon: Lock },
    { id: 'monitoring', title: 'Monitoring & Detection', icon: Eye },
    { id: 'incident-response', title: 'Incident Response', icon: AlertCircle },
    { id: 'compliance', title: 'Compliance & Certifications', icon: Award },
    { id: 'vulnerability', title: 'Vulnerability Management', icon: Search },
    { id: 'business-continuity', title: 'Business Continuity', icon: RefreshCw },
    { id: 'security-policies', title: 'Security Policies', icon: FileText },
    { id: 'training', title: 'Security Training', icon: GraduationCap },
    { id: 'third-party', title: 'Third-Party Security', icon: Users },
    { id: 'contact', title: 'Security Contact', icon: MessageSquare }
  ]

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const securityCertifications = [
    {
      name: 'SOC 2 Type II',
      description: 'System and Organization Controls certification',
      status: 'Certified',
      validUntil: '2025-06-30',
      icon: Award,
      color: 'green'
    },
    {
      name: 'ISO 27001',
      description: 'Information Security Management System',
      status: 'Certified',
      validUntil: '2025-12-15',
      icon: Shield,
      color: 'blue'
    },
    {
      name: 'GDPR Compliant',
      description: 'General Data Protection Regulation compliance',
      status: 'Compliant',
      validUntil: 'Ongoing',
      icon: Scale,
      color: 'purple'
    },
    {
      name: 'HIPAA Compliant',
      description: 'Health Insurance Portability and Accountability Act',
      status: 'Compliant',
      validUntil: 'Ongoing',
      icon: FileText,
      color: 'cyan'
    },
    {
      name: 'PCI DSS',
      description: 'Payment Card Industry Data Security Standard',
      status: 'Compliant',
      validUntil: '2025-03-31',
      icon: CreditCard,
      color: 'orange'
    }
  ]

  const securityMetrics = [
    { label: 'Security Incidents (2024)', value: '0', trend: 'down' },
    { label: 'Vulnerability Response Time', value: '< 24h', trend: 'up' },
    { label: 'System Uptime', value: '99.99%', trend: 'up' },
    { label: 'Security Training Completion', value: '100%', trend: 'up' }
  ]

  const securityLayers = [
    {
      layer: 'Physical Security',
      description: 'Secure data centers with biometric access controls',
      icon: Building2,
      measures: [
        '24/7 physical security personnel',
        'Biometric access controls',
        'CCTV surveillance',
        'Environmental monitoring'
      ]
    },
    {
      layer: 'Network Security',
      description: 'Multi-layered network protection and monitoring',
      icon: Network,
      measures: [
        'Next-generation firewalls',
        'Intrusion detection systems',
        'DDoS protection',
        'Network segmentation'
      ]
    },
    {
      layer: 'Application Security',
      description: 'Secure coding practices and regular testing',
      icon: Code,
      measures: [
        'Static code analysis',
        'Dynamic application testing',
        'Penetration testing',
        'Security code reviews'
      ]
    },
    {
      layer: 'Data Security',
      description: 'Encryption and data protection at all levels',
      icon: Database,
      measures: [
        'AES-256 encryption',
        'End-to-end encryption',
        'Data loss prevention',
        'Secure data disposal'
      ]
    }
  ]

  const incidentResponseSteps = [
    { step: 1, title: 'Detection & Analysis', description: 'Identify and assess security incidents' },
    { step: 2, title: 'Containment', description: 'Isolate and contain the threat' },
    { step: 3, title: 'Eradication', description: 'Remove the threat from systems' },
    { step: 4, title: 'Recovery', description: 'Restore systems and monitor for persistence' },
    { step: 5, title: 'Post-Incident', description: 'Document lessons learned and improve processes' }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-brand-primary text-white">
              <Shield className="h-3 w-3 mr-1" />
              Security & Trust
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Security{' '}
              <span className="bg-brand-primary bg-clip-text text-transparent">
                First
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Comprehensive security measures and data protection practices that keep your 
              information safe and secure. Learn about our multi-layered security approach.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-lg mx-auto mb-12">
              <Button 
                size="lg" 
                className="!bg-brand-primary w-full sm:w-auto border-none"
                onClick={() => onViewChange('contact')}
              >
                <Shield className="h-4 w-4 mr-2" />
                Security Contact
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="w-full sm:w-auto"
                onClick={() => window.print()}
              >
                <Download className="h-4 w-4 mr-2" />
                Security Report
              </Button>
            </div>

            {/* Security Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {securityMetrics.map((metric, index) => (
                <div key={index} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-2xl font-bold text-primary mb-1">{metric.value}</div>
                  <div className="text-sm text-muted-foreground">{metric.label}</div>
                </div>
              ))}
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
                      <span>Security Topics</span>
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

                {/* Security Status */}
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Security Status</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Overall Security</span>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                        Excellent
                      </Badge>
                    </div>
                    <Progress value={98} className="h-2" />
                    <div className="text-xs text-muted-foreground">
                      Last audit: {lastAudit}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Content */}
            <div className="lg:w-3/4">
              <div className="prose prose-lg max-w-none dark:prose-invert">
                
                {/* Overview */}
                <section id="overview" className="mb-12">
                  <div className="flex items-center space-x-2 mb-4">
                    <Shield className="h-6 w-6 text-blue-600" />
                    <h2 className="text-2xl font-bold m-0">Security Overview</h2>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-950/20 p-6 rounded-lg border-l-4 border-blue-600 mb-6">
                    <p className="m-0">
                      Security is at the core of everything we do at QAID. We implement a comprehensive, 
                      multi-layered security approach that protects your data, ensures system availability, 
                      and maintains the highest standards of information security.
                    </p>
                  </div>
                  <p>
                    Our security program is built on industry best practices and continuously evolves to 
                    address emerging threats and maintain compliance with international standards.
                  </p>
                  
                  <h3 className="text-xl font-semibold mb-3">Security Principles</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                    <Card>
                      <CardContent className="pt-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Lock className="h-4 w-4 text-blue-600" />
                          <h4 className="font-semibold">Confidentiality</h4>
                        </div>
                        <p className="text-sm">Protecting sensitive information from unauthorized access through encryption and access controls.</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <h4 className="font-semibold">Integrity</h4>
                        </div>
                        <p className="text-sm">Ensuring data accuracy and preventing unauthorized modification through validation and monitoring.</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Clock className="h-4 w-4 text-purple-600" />
                          <h4 className="font-semibold">Availability</h4>
                        </div>
                        <p className="text-sm">Maintaining system uptime and ensuring services are accessible when needed.</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <UserCheck className="h-4 w-4 text-orange-600" />
                          <h4 className="font-semibold">Accountability</h4>
                        </div>
                        <p className="text-sm">Maintaining comprehensive audit trails and ensuring actions can be traced to individuals.</p>
                      </CardContent>
                    </Card>
                  </div>
                </section>

                {/* Data Security */}
                <section id="data-security" className="mb-12">
                  <div className="flex items-center space-x-2 mb-4">
                    <Database className="h-6 w-6 text-green-600" />
                    <h2 className="text-2xl font-bold m-0">Data Security</h2>
                  </div>
                  <p>
                    We implement comprehensive data protection measures to ensure your information 
                    remains secure throughout its lifecycle:
                  </p>
                  
                  <div className="space-y-4 my-6">
                    <Card className="border-l-4 border-green-600">
                      <CardContent className="pt-4">
                        <h4 className="font-semibold mb-2 flex items-center space-x-2">
                          <Lock className="h-4 w-4 text-green-600" />
                          <span>Data at Rest</span>
                        </h4>
                        <ul className="text-sm space-y-1">
                          <li>• AES-256 encryption for all stored data</li>
                          <li>• Encrypted database storage with automated key rotation</li>
                          <li>• Secure file storage with access logging</li>
                          <li>• Regular backup encryption and testing</li>
                        </ul>
                      </CardContent>
                    </Card>
                    <Card className="border-l-4 border-blue-600">
                      <CardContent className="pt-4">
                        <h4 className="font-semibold mb-2 flex items-center space-x-2">
                          <Network className="h-4 w-4 text-blue-600" />
                          <span>Data in Transit</span>
                        </h4>
                        <ul className="text-sm space-y-1">
                          <li>• TLS 1.3 for all data transmission</li>
                          <li>• Perfect Forward Secrecy (PFS) implementation</li>
                          <li>• Certificate pinning for API communications</li>
                          <li>• End-to-end encryption for sensitive operations</li>
                        </ul>
                      </CardContent>
                    </Card>
                    <Card className="border-l-4 border-purple-600">
                      <CardContent className="pt-4">
                        <h4 className="font-semibold mb-2 flex items-center space-x-2">
                          <Cpu className="h-4 w-4 text-purple-600" />
                          <span>Data in Use</span>
                        </h4>
                        <ul className="text-sm space-y-1">
                          <li>• Memory encryption for sensitive operations</li>
                          <li>• Secure enclaves for critical processing</li>
                          <li>• Regular memory clearing and garbage collection</li>
                          <li>• Homomorphic encryption for analytics</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </section>

                {/* Infrastructure Security */}
                <section id="infrastructure" className="mb-12">
                  <div className="flex items-center space-x-2 mb-4">
                    <Server className="h-6 w-6 text-purple-600" />
                    <h2 className="text-2xl font-bold m-0">Infrastructure Security</h2>
                  </div>
                  <p>
                    Our infrastructure is built on security-first principles with multiple layers 
                    of protection:
                  </p>
                  
                  <div className="space-y-6 my-8">
                    {securityLayers.map((layer, index) => {
                      const IconComponent = layer.icon
                      return (
                        <Card key={index}>
                          <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                              <IconComponent className="h-5 w-5 text-purple-600" />
                              <span>{layer.layer}</span>
                            </CardTitle>
                            <CardDescription>{layer.description}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {layer.measures.map((measure, i) => (
                                <div key={i} className="flex items-center space-x-2 text-sm">
                                  <CheckCircle className="h-3 w-3 text-green-600 flex-shrink-0" />
                                  <span>{measure}</span>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </section>

                {/* Access Controls */}
                <section id="access-controls" className="mb-12">
                  <div className="flex items-center space-x-2 mb-4">
                    <Key className="h-6 w-6 text-amber-600" />
                    <h2 className="text-2xl font-bold m-0">Access Controls</h2>
                  </div>
                  <p>
                    We implement robust access control mechanisms to ensure only authorized 
                    individuals can access systems and data:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                    <Card>
                      <CardContent className="pt-4">
                        <h4 className="font-semibold mb-2 flex items-center space-x-2">
                          <UserCheck className="h-4 w-4 text-blue-600" />
                          <span>Identity & Authentication</span>
                        </h4>
                        <ul className="text-sm space-y-1">
                          <li>• Multi-factor authentication (MFA)</li>
                          <li>• Single sign-on (SSO) integration</li>
                          <li>• Biometric authentication options</li>
                          <li>• Password complexity requirements</li>
                        </ul>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-4">
                        <h4 className="font-semibold mb-2 flex items-center space-x-2">
                          <Shield className="h-4 w-4 text-green-600" />
                          <span>Authorization & Permissions</span>
                        </h4>
                        <ul className="text-sm space-y-1">
                          <li>• Role-based access control (RBAC)</li>
                          <li>• Principle of least privilege</li>
                          <li>• Attribute-based access control (ABAC)</li>
                          <li>• Dynamic permission management</li>
                        </ul>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-4">
                        <h4 className="font-semibold mb-2 flex items-center space-x-2">
                          <Eye className="h-4 w-4 text-purple-600" />
                          <span>Session Management</span>
                        </h4>
                        <ul className="text-sm space-y-1">
                          <li>• Secure session tokens</li>
                          <li>• Session timeout policies</li>
                          <li>• Concurrent session limits</li>
                          <li>• Session invalidation on logout</li>
                        </ul>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-4">
                        <h4 className="font-semibold mb-2 flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-orange-600" />
                          <span>Access Monitoring</span>
                        </h4>
                        <ul className="text-sm space-y-1">
                          <li>• Real-time access logging</li>
                          <li>• Anomaly detection</li>
                          <li>• Failed login attempt tracking</li>
                          <li>• Privileged access monitoring</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </section>

                {/* Encryption */}
                <section id="encryption" className="mb-12">
                  <div className="flex items-center space-x-2 mb-4">
                    <Lock className="h-6 w-6 text-red-600" />
                    <h2 className="text-2xl font-bold m-0">Encryption Standards</h2>
                  </div>
                  <p>
                    We use industry-leading encryption standards to protect your data at every level:
                  </p>
                  
                  <div className="bg-red-50 dark:bg-red-950/20 p-6 rounded-lg border-l-4 border-red-600 my-6">
                    <h4 className="font-semibold mb-3">Encryption Specifications</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <strong>Symmetric Encryption:</strong>
                        <ul className="mt-1 space-y-1">
                          <li>• AES-256-GCM</li>
                          <li>• ChaCha20-Poly1305</li>
                          <li>• Key rotation every 90 days</li>
                        </ul>
                      </div>
                      <div>
                        <strong>Asymmetric Encryption:</strong>
                        <ul className="mt-1 space-y-1">
                          <li>• RSA-4096</li>
                          <li>• ECDSA P-384</li>
                          <li>• Ed25519 signatures</li>
                        </ul>
                      </div>
                      <div>
                        <strong>Key Management:</strong>
                        <ul className="mt-1 space-y-1">
                          <li>• Hardware Security Modules (HSM)</li>
                          <li>• Key escrow and recovery</li>
                          <li>• Cryptographic key lifecycle</li>
                        </ul>
                      </div>
                      <div>
                        <strong>Hashing:</strong>
                        <ul className="mt-1 space-y-1">
                          <li>• SHA-256/SHA-3</li>
                          <li>• Argon2 for passwords</li>
                          <li>• HMAC for integrity</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Monitoring & Detection */}
                <section id="monitoring" className="mb-12">
                  <div className="flex items-center space-x-2 mb-4">
                    <Eye className="h-6 w-6 text-cyan-600" />
                    <h2 className="text-2xl font-bold m-0">Security Monitoring & Detection</h2>
                  </div>
                  <p>
                    Our 24/7 security operations center monitors for threats and anomalies:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                    <Card className="border-l-4 border-cyan-600">
                      <CardContent className="pt-4">
                        <h4 className="font-semibold mb-2 flex items-center space-x-2">
                          <Search className="h-4 w-4 text-cyan-600" />
                          <span>Threat Detection</span>
                        </h4>
                        <ul className="text-sm space-y-1">
                          <li>• AI-powered threat analysis</li>
                          <li>• Behavioral anomaly detection</li>
                          <li>• Signature-based detection</li>
                          <li>• Threat intelligence feeds</li>
                        </ul>
                      </CardContent>
                    </Card>
                    <Card className="border-l-4 border-blue-600">
                      <CardContent className="pt-4">
                        <h4 className="font-semibold mb-2 flex items-center space-x-2">
                          <Activity className="h-4 w-4 text-blue-600" />
                          <span>Log Management</span>
                        </h4>
                        <ul className="text-sm space-y-1">
                          <li>• Centralized log aggregation</li>
                          <li>• Real-time log analysis</li>
                          <li>• Long-term log retention</li>
                          <li>• Compliance reporting</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </section>

                {/* Incident Response */}
                <section id="incident-response" className="mb-12">
                  <div className="flex items-center space-x-2 mb-4">
                    <AlertCircle className="h-6 w-6 text-orange-600" />
                    <h2 className="text-2xl font-bold m-0">Incident Response</h2>
                  </div>
                  <p>
                    Our incident response team follows a structured process to handle security incidents:
                  </p>
                  
                  <div className="bg-orange-50 dark:bg-orange-950/20 p-6 rounded-lg border-l-4 border-orange-600 my-6">
                    <h4 className="font-semibold mb-4">Incident Response Process</h4>
                    <div className="space-y-4">
                      {incidentResponseSteps.map((step, index) => (
                        <div key={index} className="flex items-start space-x-4">
                          <div className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
                            {step.step}
                          </div>
                          <div className="flex-1">
                            <h5 className="font-medium text-orange-800 dark:text-orange-200">{step.title}</h5>
                            <p className="text-sm text-orange-700 dark:text-orange-300">{step.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Compliance & Certifications */}
                <section id="compliance" className="mb-12">
                  <div className="flex items-center space-x-2 mb-4">
                    <Award className="h-6 w-6 text-yellow-600" />
                    <h2 className="text-2xl font-bold m-0">Compliance & Certifications</h2>
                  </div>
                  <p>
                    We maintain compliance with industry standards and regulations:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
                    {securityCertifications.map((cert, index) => {
                      const IconComponent = cert.icon
                      const colorClasses = {
                        green: 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20',
                        blue: 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20',
                        purple: 'border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/20',
                        cyan: 'border-cyan-200 dark:border-cyan-800 bg-cyan-50 dark:bg-cyan-950/20',
                        orange: 'border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/20'
                      }
                      
                      return (
                        <Card key={index} className={`${colorClasses[cert.color as keyof typeof colorClasses]} border-l-4`}>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base flex items-center space-x-2">
                              <IconComponent className="h-5 w-5" />
                              <span>{cert.name}</span>
                            </CardTitle>
                            <CardDescription className="text-xs">{cert.description}</CardDescription>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <div className="flex items-center justify-between">
                              <Badge variant="outline" className="text-xs">
                                {cert.status}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                Valid until {cert.validUntil}
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </section>

                {/* Vulnerability Management */}
                <section id="vulnerability" className="mb-12">
                  <div className="flex items-center space-x-2 mb-4">
                    <Search className="h-6 w-6 text-indigo-600" />
                    <h2 className="text-2xl font-bold m-0">Vulnerability Management</h2>
                  </div>
                  <p>
                    We maintain a proactive approach to identifying and addressing security vulnerabilities:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                    <Card>
                      <CardContent className="pt-4">
                        <h4 className="font-semibold mb-2 flex items-center space-x-2">
                          <Search className="h-4 w-4 text-blue-600" />
                          <span>Vulnerability Scanning</span>
                        </h4>
                        <ul className="text-sm space-y-1">
                          <li>• Automated daily scans</li>
                          <li>• Network and application testing</li>
                          <li>• Container security scanning</li>
                          <li>• Infrastructure assessment</li>
                        </ul>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-4">
                        <h4 className="font-semibold mb-2 flex items-center space-x-2">
                          <Target className="h-4 w-4 text-green-600" />
                          <span>Penetration Testing</span>
                        </h4>
                        <ul className="text-sm space-y-1">
                          <li>• Quarterly external testing</li>
                          <li>• Annual internal assessments</li>
                          <li>• Third-party security audits</li>
                          <li>• Bug bounty program</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </section>

                {/* Business Continuity */}
                <section id="business-continuity" className="mb-12">
                  <div className="flex items-center space-x-2 mb-4">
                    <RefreshCw className="h-6 w-6 text-emerald-600" />
                    <h2 className="text-2xl font-bold m-0">Business Continuity</h2>
                  </div>
                  <p>
                    We ensure service availability and data protection through comprehensive 
                    business continuity planning:
                  </p>
                  
                  <div className="bg-emerald-50 dark:bg-emerald-950/20 p-6 rounded-lg border-l-4 border-emerald-600 my-6">
                    <h4 className="font-semibold mb-3">Recovery Objectives</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-2xl font-bold text-emerald-600 mb-1">RTO: 4 hours</div>
                        <div className="text-sm">Recovery Time Objective</div>
                        <p className="text-xs text-muted-foreground mt-1">Maximum time to restore services</p>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-emerald-600 mb-1">RPO: 1 hour</div>
                        <div className="text-sm">Recovery Point Objective</div>
                        <p className="text-xs text-muted-foreground mt-1">Maximum acceptable data loss</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Security Policies */}
                <section id="security-policies" className="mb-12">
                  <div className="flex items-center space-x-2 mb-4">
                    <FileText className="h-6 w-6 text-violet-600" />
                    <h2 className="text-2xl font-bold m-0">Security Policies</h2>
                  </div>
                  <p>
                    Our comprehensive security policies govern all aspects of information security:
                  </p>
                  
                  <div className="space-y-3 my-6">
                    <Card>
                      <CardContent className="pt-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold">Information Security Policy</h4>
                            <p className="text-sm text-muted-foreground">Overall security governance and objectives</p>
                          </div>
                          <Button size="sm" variant="outline">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            View
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold">Data Classification Policy</h4>
                            <p className="text-sm text-muted-foreground">Data handling and protection requirements</p>
                          </div>
                          <Button size="sm" variant="outline">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            View
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold">Incident Response Policy</h4>
                            <p className="text-sm text-muted-foreground">Security incident handling procedures</p>
                          </div>
                          <Button size="sm" variant="outline">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            View
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </section>

                {/* Security Training */}
                <section id="training" className="mb-12">
                  <div className="flex items-center space-x-2 mb-4">
                    <GraduationCap className="h-6 w-6 text-pink-600" />
                    <h2 className="text-2xl font-bold m-0">Security Training & Awareness</h2>
                  </div>
                  <p>
                    We invest in comprehensive security training to ensure all team members 
                    understand their role in maintaining security:
                  </p>
                  
                  <div className="bg-pink-50 dark:bg-pink-950/20 p-6 rounded-lg border-l-4 border-pink-600 my-6">
                    <h4 className="font-semibold mb-3">Training Program</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <strong>New Employee Training:</strong>
                        <ul className="mt-1 space-y-1">
                          <li>• Security awareness fundamentals</li>
                          <li>• Company security policies</li>
                          <li>• Role-specific security requirements</li>
                          <li>• Hands-on security tools training</li>
                        </ul>
                      </div>
                      <div>
                        <strong>Ongoing Training:</strong>
                        <ul className="mt-1 space-y-1">
                          <li>• Monthly security updates</li>
                          <li>• Quarterly simulated phishing</li>
                          <li>• Annual security certification</li>
                          <li>• Conference and workshop attendance</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Third-Party Security */}
                <section id="third-party" className="mb-12">
                  <div className="flex items-center space-x-2 mb-4">
                    <Users className="h-6 w-6 text-teal-600" />
                    <h2 className="text-2xl font-bold m-0">Third-Party Security</h2>
                  </div>
                  <p>
                    We carefully evaluate and monitor the security of all third-party services:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                    <Card>
                      <CardContent className="pt-4">
                        <h4 className="font-semibold mb-2 flex items-center space-x-2">
                          <Search className="h-4 w-4 text-blue-600" />
                          <span>Vendor Assessment</span>
                        </h4>
                        <ul className="text-sm space-y-1">
                          <li>• Security questionnaires</li>
                          <li>• Compliance verification</li>
                          <li>• Risk assessment</li>
                          <li>• Contract security terms</li>
                        </ul>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-4">
                        <h4 className="font-semibold mb-2 flex items-center space-x-2">
                          <Eye className="h-4 w-4 text-green-600" />
                          <span>Ongoing Monitoring</span>
                        </h4>
                        <ul className="text-sm space-y-1">
                          <li>• Regular security reviews</li>
                          <li>• Incident notification requirements</li>
                          <li>• Performance monitoring</li>
                          <li>• Audit rights and requirements</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </section>

                {/* Security Contact */}
                <section id="contact" className="mb-12">
                  <div className="flex items-center space-x-2 mb-4">
                    <MessageSquare className="h-6 w-6 text-indigo-600" />
                    <h2 className="text-2xl font-bold m-0">Security Contact</h2>
                  </div>
                  <p>
                    For security-related inquiries, vulnerability reports, or incident notifications:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center space-x-2">
                          <Shield className="h-4 w-4" />
                          <span>Security Team</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0 space-y-2">
                        <div className="flex items-center space-x-2 text-sm">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span>admin@qaid.co.in</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>+91-9866669541</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          24/7 security incident response hotline
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center space-x-2">
                          <Search className="h-4 w-4" />
                          <span>Vulnerability Disclosure</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0 space-y-2">
                        <div className="flex items-center space-x-2 text-sm">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span>admin@qaid.co.in</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Responsible disclosure program for security researchers
                        </p>
                        <Button size="sm" variant="outline">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Bug Bounty Program
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </section>

                {/* Quick Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12 pt-8 border-t">
                  <Button onClick={() => onViewChange('privacy')} className='text-black'>
                    <Shield className="h-4 w-4 mr-2" />
                    Privacy Policy
                  </Button>
                  <Button variant="outline" onClick={() => onViewChange('terms')}>
                    <Gavel className="h-4 w-4 mr-2" />
                    Terms of Service
                  </Button>
                  <Button variant="outline" onClick={() => onViewChange('gdpr')}>
                    <Scale className="h-4 w-4 mr-2" />
                    GDPR Compliance
                  </Button>
                  <Button variant="outline" onClick={() => onViewChange('contact')}>
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Contact Us
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