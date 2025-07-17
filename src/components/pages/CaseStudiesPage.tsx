'use client'

import { useState } from 'react'
import { Button } from '../common/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../common/ui/card'
import { Badge } from '../common/ui/badge'
import { Input } from '../common/ui/input'
import { Tabs,  TabsList, TabsTrigger } from '../common/ui/tabs'
// import { Progress } from '../common/ui/progress'
// import { Separator } from '../common/ui/separator'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../common/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../common/ui/select'
import { ScrollArea } from '../common/ui/scroll-area'
import { 
  TrendingUp,
  TrendingDown,
  DollarSign,
  Clock,
  Users,
  // Star,
  Search,
  // Filter,
  ArrowRight,
  // ExternalLink,
  // Download,
  Eye,
  // ThumbsUp,
  // Share2,
  // BookOpen,
  BarChart3,
  ShoppingCart,
  Truck,
  Building2,
  // Heart,
  GraduationCap,
  Banknote,
  // Zap,
  Target,
  // Award,
  // CheckCircle,
  // Calendar,
  // MapPin,
  Phone,
   Trophy,
  // Mail,
  // Globe,
  Lightbulb,
  Rocket,
  // PieChart,
  // LineChart,
  // Activity,
  // Briefcase,
  // Factory,
  Stethoscope,
  // Plane,
  // Home,
  // Wrench,
  // Cpu,
  // Database,
  // Shield,
  // Wifi,
  // Smartphone,
  // Monitor,
  // TabletSmartphone,
  // FileText,
  Quote,
  // ChevronRight,
  // PlayCircle,
  // Maximize,
  // X,
  // Plus,
  // Minus,
  // ArrowUp,
  // ArrowDown,
  // RefreshCw,
  // Timer,
  // Gauge,
  // Percent,
  // Calculator,
  // CreditCard,
  // Package,
  // Scale,
  // Megaphone,
  // MessageSquare,
  // Handshake,
 
  // Crown,
  // Sparkles,
  // Flame,
  // Layers,
  // Network,
  // Code,
  // Settings,
  // Lock,
  // Unlock,
  // Key,
  // Link,
  // Cloud,
  // Server,
  // HardDrive
} from 'lucide-react'

interface CaseStudiesPageProps {
  onViewChange: (view: string) => void
  isLoggedIn: boolean
  onShowAuth: (mode: 'login' | 'signup') => void
}

export function CaseStudiesPage({ onViewChange, isLoggedIn, onShowAuth }: CaseStudiesPageProps) {
  const [selectedIndustry, setSelectedIndustry] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<any>(null)
  const [showCaseStudyModal, setShowCaseStudyModal] = useState(false)
  const [sortBy, setSortBy] = useState('featured')

  const industries = [
    { id: 'all', name: 'All Industries', icon: Building2, count: 24 },
    { id: 'ecommerce', name: 'E-commerce', icon: ShoppingCart, count: 8 },
    { id: 'healthcare', name: 'Healthcare', icon: Stethoscope, count: 5 },
    { id: 'finance', name: 'Finance', icon: Banknote, count: 6 },
    { id: 'education', name: 'Education', icon: GraduationCap, count: 3 },
    { id: 'logistics', name: 'Logistics', icon: Truck, count: 2 }
  ]

  const caseStudies = [
    {
      id: '1',
      title: 'TechMart: 300% Revenue Growth with AI-Powered Customer Service',
      company: 'TechMart',
      industry: 'ecommerce',
      logo: '/api/placeholder/60/60',
      image: '/api/placeholder/600/400',
      summary: 'How TechMart automated their customer service and increased revenue by 300% in 6 months',
      description: 'TechMart, a leading electronics retailer, implemented QAID AI agents to handle customer inquiries, process returns, and provide product recommendations. The results exceeded all expectations.',
      challenge: 'TechMart was struggling with high customer service costs and slow response times, leading to poor customer satisfaction and lost sales.',
      solution: 'Implemented QAID AI agents for 24/7 customer support, automated order processing, and personalized product recommendations.',
      results: {
        revenue: { value: 300, change: 'increase', label: 'Revenue Growth' },
        responseTime: { value: 85, change: 'decrease', label: 'Response Time Reduction' },
        satisfaction: { value: 4.8, change: 'increase', label: 'Customer Satisfaction' },
        cost: { value: 60, change: 'decrease', label: 'Support Cost Reduction' }
      },
      metrics: [
        { label: 'Monthly Revenue', before: 'Rs2.1M', after: '$8.4M', change: 300 },
        { label: 'Average Response Time', before: '4.2 hours', after: '12 seconds', change: -85 },
        { label: 'Customer Satisfaction', before: '3.2/5', after: '4.8/5', change: 50 },
        { label: 'Support Team Size', before: '45 agents', after: '12 agents', change: -73 }
      ],
      testimonial: {
        quote: "QAID transformed our entire customer experience. We've never seen growth like this before.",
        author: 'Sarah Martinez',
        role: 'CEO, TechMart',
        avatar: '/api/placeholder/50/50'
      },
      tags: ['Customer Service', 'E-commerce', 'Automation', 'ROI'],
      timeline: '6 months',
      roi: '450%',
      featured: true,
      publishedDate: '2024-01-15'
    },
    {
      id: '2',
      title: 'HealthPlus: Revolutionizing Patient Care with AI Diagnostics',
      company: 'HealthPlus Medical Center',
      industry: 'healthcare',
      logo: '/api/placeholder/60/60',
      image: '/api/placeholder/600/400',
      summary: 'HealthPlus reduced diagnosis time by 70% and improved patient outcomes with AI-powered diagnostic agents',
      description: 'HealthPlus Medical Center deployed QAID AI agents to assist with patient diagnosis, treatment planning, and medical record management.',
      challenge: 'Long wait times for specialist consultations and potential for human error in diagnosis were affecting patient care quality.',
      solution: 'Implemented AI diagnostic agents for preliminary assessments, automated medical record analysis, and treatment recommendation systems.',
      results: {
        diagnosisTime: { value: 70, change: 'decrease', label: 'Diagnosis Time Reduction' },
        accuracy: { value: 95, change: 'increase', label: 'Diagnostic Accuracy' },
        patientFlow: { value: 40, change: 'increase', label: 'Patient Throughput' },
        satisfaction: { value: 4.9, change: 'increase', label: 'Patient Satisfaction' }
      },
      metrics: [
        { label: 'Average Diagnosis Time', before: '3.5 hours', after: '1.1 hours', change: -70 },
        { label: 'Diagnostic Accuracy', before: '87%', after: '95%', change: 8 },
        { label: 'Daily Patient Capacity', before: '120 patients', after: '168 patients', change: 40 },
        { label: 'Patient Satisfaction', before: '4.1/5', after: '4.9/5', change: 20 }
      ],
      testimonial: {
        quote: "The AI diagnostic agents have revolutionized our patient care. We're saving lives with faster, more accurate diagnoses.",
        author: 'Dr. Michael Chen',
        role: 'Chief Medical Officer, HealthPlus',
        avatar: '/api/placeholder/50/50'
      },
      tags: ['Healthcare', 'Diagnostics', 'AI', 'Patient Care'],
      timeline: '8 months',
      roi: '280%',
      featured: true,
      publishedDate: '2024-02-10'
    },
    {
      id: '3',
      title: 'FinanceFlow: Fraud Detection That Saved Rs12M Annually',
      company: 'FinanceFlow Bank',
      industry: 'finance',
      logo: '/api/placeholder/60/60',
      image: '/api/placeholder/600/400',
      summary: 'FinanceFlow prevented Rs12M in fraud losses while improving customer experience with AI-powered fraud detection',
      description: 'FinanceFlow Bank implemented QAID AI agents for real-time fraud detection, risk assessment, and automated compliance monitoring.',
      challenge: 'Rising fraud losses and false positives in fraud detection were costing millions and frustrating legitimate customers.',
      solution: 'Deployed AI agents for real-time transaction monitoring, behavioral analysis, and automated risk scoring.',
      results: {
        fraudPrevention: { value: 12000000, change: 'savings', label: 'Fraud Losses Prevented' },
        falsePositives: { value: 75, change: 'decrease', label: 'False Positive Reduction' },
        detectionTime: { value: 90, change: 'decrease', label: 'Detection Time Improvement' },
        compliance: { value: 99.8, change: 'increase', label: 'Compliance Accuracy' }
      },
      metrics: [
        { label: 'Annual Fraud Losses', before: 'Rs18.5M', after: '$6.2M', change: -67 },
        { label: 'False Positive Rate', before: '12%', after: '3%', change: -75 },
        { label: 'Detection Time', before: '4.8 hours', after: '0.3 seconds', change: -90 },
        { label: 'Compliance Score', before: '94.2%', after: '99.8%', change: 6 }
      ],
      testimonial: {
        quote: "QAID's fraud detection capabilities have saved us millions while keeping our customers happy.",
        author: 'Jennifer Walsh',
        role: 'Risk Management Director, FinanceFlow',
        avatar: '/api/placeholder/50/50'
      },
      tags: ['Finance', 'Fraud Detection', 'Risk Management', 'Compliance'],
      timeline: '4 months',
      roi: '380%',
      featured: true,
      publishedDate: '2024-03-05'
    },
    {
      id: '4',
      title: 'EduTech: Personalized Learning for 50,000 Students',
      company: 'EduTech University',
      industry: 'education',
      logo: '/api/placeholder/60/60',
      image: '/api/placeholder/600/400',
      summary: 'EduTech improved student outcomes by 45% with AI-powered personalized learning and automated grading',
      description: 'EduTech University deployed QAID AI agents to create personalized learning paths, automate grading, and provide 24/7 student support.',
      challenge: 'Large class sizes and diverse learning needs made it impossible to provide personalized education at scale.',
      solution: 'Implemented AI tutoring agents, automated assessment systems, and personalized curriculum recommendations.',
      results: {
        performance: { value: 45, change: 'increase', label: 'Student Performance' },
        engagement: { value: 60, change: 'increase', label: 'Student Engagement' },
        completion: { value: 35, change: 'increase', label: 'Course Completion Rate' },
        workload: { value: 50, change: 'decrease', label: 'Faculty Workload' }
      },
      metrics: [
        { label: 'Average Grade Point', before: '2.8/4.0', after: '3.2/4.0', change: 14 },
        { label: 'Student Engagement', before: '65%', after: '85%', change: 31 },
        { label: 'Course Completion', before: '78%', after: '89%', change: 14 },
        { label: 'Faculty Hours/Week', before: '55 hours', after: '38 hours', change: -31 }
      ],
      testimonial: {
        quote: "Our students are achieving better outcomes than ever before. The personalized AI tutoring is game-changing.",
        author: 'Prof. David Kim',
        role: 'Dean of Academic Affairs, EduTech University',
        avatar: '/api/placeholder/50/50'
      },
      tags: ['Education', 'Personalization', 'AI Tutoring', 'Student Success'],
      timeline: '12 months',
      roi: '220%',
      featured: false,
      publishedDate: '2024-01-20'
    },
    {
      id: '5',
      title: 'LogiFlow: 40% Faster Deliveries with AI Route Optimization',
      company: 'LogiFlow Logistics',
      industry: 'logistics',
      logo: '/api/placeholder/60/60',
      image: '/api/placeholder/600/400',
      summary: 'LogiFlow cut delivery times by 40% and reduced fuel costs by 25% using AI-powered route optimization',
      description: 'LogiFlow Logistics implemented QAID AI agents for intelligent route planning, real-time traffic analysis, and automated dispatch optimization.',
      challenge: 'Inefficient routing and manual dispatch processes were leading to delayed deliveries and high fuel costs.',
      solution: 'Deployed AI agents for dynamic route optimization, predictive traffic analysis, and automated load balancing.',
      results: {
        deliveryTime: { value: 40, change: 'decrease', label: 'Delivery Time Reduction' },
        fuelCost: { value: 25, change: 'decrease', label: 'Fuel Cost Savings' },
        onTime: { value: 95, change: 'increase', label: 'On-Time Delivery Rate' },
        efficiency: { value: 35, change: 'increase', label: 'Fleet Efficiency' }
      },
      metrics: [
        { label: 'Average Delivery Time', before: '2.8 hours', after: '1.7 hours', change: -39 },
        { label: 'Fuel Cost per Mile', before: 'Rs0.85', after: '$0.64', change: -25 },
        { label: 'On-Time Delivery Rate', before: '82%', after: '95%', change: 16 },
        { label: 'Fleet Utilization', before: '68%', after: '87%', change: 28 }
      ],
      testimonial: {
        quote: "The AI route optimization has transformed our operations. We're delivering faster and spending less on fuel.",
        author: 'Maria Rodriguez',
        role: 'Operations Manager, LogiFlow',
        avatar: '/api/placeholder/50/50'
      },
      tags: ['Logistics', 'Route Optimization', 'AI', 'Efficiency'],
      timeline: '5 months',
      roi: '310%',
      featured: false,
      publishedDate: '2024-02-28'
    },
    {
      id: '6',
      title: 'RetailMax: Inventory Management That Increased Profit by 200%',
      company: 'RetailMax',
      industry: 'ecommerce',
      logo: '/api/placeholder/60/60',
      image: '/api/placeholder/600/400',
      summary: 'RetailMax optimized inventory management with AI, reducing stockouts by 80% and increasing profit margins by 200%',
      description: 'RetailMax implemented QAID AI agents for demand forecasting, automated reordering, and dynamic pricing optimization.',
      challenge: 'Frequent stockouts and overstock situations were hurting profitability and customer satisfaction.',
      solution: 'Implemented AI-powered demand forecasting, automated inventory management, and dynamic pricing strategies.',
      results: {
        stockouts: { value: 80, change: 'decrease', label: 'Stockout Reduction' },
        profit: { value: 200, change: 'increase', label: 'Profit Margin Increase' },
        turnover: { value: 65, change: 'increase', label: 'Inventory Turnover' },
        waste: { value: 70, change: 'decrease', label: 'Inventory Waste Reduction' }
      },
      metrics: [
        { label: 'Stockout Incidents', before: '150/month', after: '30/month', change: -80 },
        { label: 'Profit Margin', before: '12%', after: '36%', change: 200 },
        { label: 'Inventory Turnover', before: '4.2x/year', after: '6.9x/year', change: 64 },
        { label: 'Excess Inventory', before: '28%', after: '8%', change: -71 }
      ],
      testimonial: {
        quote: "Our inventory management has never been more efficient. The AI predictions are incredibly accurate.",
        author: 'James Thompson',
        role: 'COO, RetailMax',
        avatar: '/api/placeholder/50/50'
      },
      tags: ['Retail', 'Inventory Management', 'Demand Forecasting', 'Profit Optimization'],
      timeline: '7 months',
      roi: '340%',
      featured: false,
      publishedDate: '2024-03-15'
    }
  ]

  const filteredCaseStudies = caseStudies.filter(study => {
    const matchesSearch = study.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         study.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         study.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesIndustry = selectedIndustry === 'all' || study.industry === selectedIndustry
    return matchesSearch && matchesIndustry
  }).sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
      case 'roi':
        return parseInt(b.roi) - parseInt(a.roi)
      case 'featured':
      default:
        return b.featured ? 1 : -1
    }
  })

  const handleCaseStudyClick = (caseStudy: any) => {
    setSelectedCaseStudy(caseStudy)
    setShowCaseStudyModal(true)
  }

  const handleGetStarted = () => {
    if (isLoggedIn) {
      onViewChange('agents')
    } else {
      onShowAuth('signup')
    }
  }

  const formatNumber = (value: number) => {
    if (value >= 1000000) {
      return `Rs${(value / 1000000).toFixed(1)}M`
    } else if (value >= 1000) {
      return `Rs${(value / 1000).toFixed(1)}K`
    } else {
      return `Rs${value}`
    }
  }

  const getIndustryIcon = (industry: string) => {
    switch (industry) {
      case 'ecommerce': return ShoppingCart
      case 'healthcare': return Stethoscope
      case 'finance': return Banknote
      case 'education': return GraduationCap
      case 'logistics': return Truck
      default: return Building2
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
              <Trophy className="h-3 w-3 mr-1" />
              Success Stories
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Real Results from{' '}
              <span className="bg-gradient-to-r from-[#FF620A] to-[#993B06] bg-clip-text text-transparent">
                Real Businesses
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Discover how companies across industries are transforming their operations 
              and achieving extraordinary results with QAID AI agents.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-lg mx-auto mb-12">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-[#FF620A] to-[#993B06] w-full sm:w-auto"
                onClick={handleGetStarted}
              >
                <Rocket className="h-4 w-4 mr-2" />
                Get Started
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="w-full sm:w-auto !bg-white"
                onClick={() => onViewChange('contact')}
              >
                <Phone className="h-4 w-4 mr-2 " />
                Talk to Sales
              </Button>
            </div>

            {/* Success Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-2xl font-bold text-blue-600">300%</div>
                <div className="text-sm text-muted-foreground">Avg Revenue Growth</div>
              </div>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-2xl font-bold text-purple-600">85%</div>
                <div className="text-sm text-muted-foreground">Cost Reduction</div>
              </div>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-2xl font-bold text-pink-600">24</div>
                <div className="text-sm text-muted-foreground">Case Studies</div>
              </div>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-2xl font-bold text-orange-600">Rs50M+</div>
                <div className="text-sm text-muted-foreground">Total Savings</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Case Studies */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Success Stories</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These companies achieved remarkable results with QAID AI agents
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-20 ">
            {caseStudies.filter(study => study.featured).map((study) => {
              const IndustryIcon = getIndustryIcon(study.industry)
              return (
                <Card key={study.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group" onClick={() => handleCaseStudyClick(study)}>
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                      <IndustryIcon className="h-16 w-16 text-white opacity-80" />
                    </div>
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/90 text-gray-800">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {study.roi} ROI
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <Badge variant="secondary">
                        <Clock className="h-3 w-3 mr-1" />
                        {study.timeline}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="h-10 w-10 bg-gradient-to-r from-[#FF620A] to-[#993B06] rounded-full flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold">{study.company}</div>
                        <div className="text-sm text-muted-foreground capitalize">{study.industry}</div>
                      </div>
                    </div>
                    <CardTitle className="text-lg group-hover:text-blue-600 transition-colors line-clamp-2">
                      {study.title}
                    </CardTitle>
                    <CardDescription className="text-sm line-clamp-2">
                      {study.summary}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      {Object.entries(study.results).slice(0, 2).map(([key, result]: [string, any]) => (
                        <div key={key} className="text-center p-3 bg-muted rounded-lg">
                          <div className="flex items-center justify-center mb-1">
                            {result.change === 'increase' ? (
                              <TrendingUp className="h-4 w-4 text-green-600" />
                            ) : result.change === 'decrease' ? (
                              <TrendingDown className="h-4 w-4 text-red-600" />
                            ) : (
                              <DollarSign className="h-4 w-4 text-blue-600" />
                            )}
                          </div>
                          <div className="text-lg font-bold">
                            {result.change === 'savings' ? formatNumber(result.value) : `${result.value}${result.change === 'increase' ? '%' : '%'}`}
                          </div>
                          <div className="text-xs text-muted-foreground">{result.label}</div>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {study.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button size="sm" variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground">
                        Read More
                        <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* All Case Studies */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 px-20">
            <div>
              <h2 className="text-3xl font-bold mb-2">All Case Studies</h2>
              <p className="text-muted-foreground">Explore success stories from various industries</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 ">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search case studies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-80"
                />
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="roi">Highest ROI</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Industry Filters */}
          <Tabs value={selectedIndustry} onValueChange={setSelectedIndustry} className="w-full px-20">
            <TabsList className="flex flex-wrap justify-center gap-2 h-auto bg-transparent p-2 mb-12 md:grid md:grid-cols-3 lg:grid-cols-6 lg:gap-0">
              {industries.map((industry) => {
                const IconComponent = industry.icon
                return (
                  <TabsTrigger 
                    key={industry.id} 
                    value={industry.id}
                    className="flex flex-col items-center justify-center gap-1 p-3 h-auto min-h-[80px] min-w-[120px] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border border-border rounded-lg"
                  >
                    <IconComponent className="h-4 w-4 flex-shrink-0" />
                    <span className="text-xs text-center leading-tight">{industry.name}</span>
                    <Badge variant="secondary" className="text-xs mt-1">
                      {industry.count}
                    </Badge>
                  </TabsTrigger>
                )
              })}
            </TabsList>

            {/* Case Studies Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCaseStudies.map((study) => {
                const IndustryIcon = getIndustryIcon(study.industry)
                return (
                  <Card key={study.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group" onClick={() => handleCaseStudyClick(study)}>
                    <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                        <IndustryIcon className="h-12 w-12 text-white opacity-80" />
                      </div>
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-white/90 text-gray-800">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          {study.roi} ROI
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 right-4">
                        <Badge variant="secondary">
                          {study.timeline}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader className="pb-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="h-8 w-8 bg-gradient-to-r from-[#FF620A] to-[#993B06] rounded-full flex items-center justify-center">
                          <Building2 className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">{study.company}</div>
                          <div className="text-xs text-muted-foreground capitalize">{study.industry}</div>
                        </div>
                      </div>
                      <CardTitle className="text-base group-hover:text-blue-600 transition-colors line-clamp-2">
                        {study.title}
                      </CardTitle>
                      <CardDescription className="text-sm line-clamp-2">
                        {study.summary}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {Object.entries(study.results).slice(0, 2).map(([key, result]: [string, any]) => (
                          <div key={key} className="text-center p-2 bg-muted rounded-lg">
                            <div className="text-sm font-bold">
                              {result.change === 'savings' ? formatNumber(result.value) : `${result.value}${result.change === 'increase' ? '%' : '%'}`}
                            </div>
                            <div className="text-xs text-muted-foreground line-clamp-1">{result.label}</div>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {study.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <Button size="sm" variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground">
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#FF620A] to-[#993B06]
 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Join These Success Stories?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              See how QAID AI agents can transform your business operations 
              and deliver exceptional results like these companies.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-lg mx-auto">
              <Button 
                size="lg" 
                variant="secondary"
                className="w-full sm:w-auto"
                onClick={handleGetStarted}
              >
                <Rocket className="h-4 w-4 mr-2" />
                Start Your Journey
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white bg-white text-black hover:bg-white hover:text-primary w-full sm:w-auto"
                onClick={() => onViewChange('contact')}
              >
                <Phone className="h-4 w-4 mr-2" />
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Detail Modal */}
      <Dialog open={showCaseStudyModal} onOpenChange={setShowCaseStudyModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Trophy className="h-5 w-5" />
              <span>{selectedCaseStudy?.title}</span>
            </DialogTitle>
            <DialogDescription>
              {selectedCaseStudy?.company} • {selectedCaseStudy?.industry}
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[70vh]">
            <div className="space-y-6">
              {/* Company Info */}
              <div className="flex items-center space-x-4 p-4 bg-muted rounded-lg">
                <div className="h-12 w-12 bg-gradient-to-r from-[#FF620A] to-[#993B06]rounded-full flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-lg">{selectedCaseStudy?.company}</div>
                  <div className="text-sm text-muted-foreground capitalize">{selectedCaseStudy?.industry}</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">{selectedCaseStudy?.roi} ROI</div>
                  <div className="text-sm text-muted-foreground">{selectedCaseStudy?.timeline}</div>
                </div>
              </div>

              {/* Challenge */}
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <Target className="h-5 w-5 mr-2 text-red-500" />
                  The Challenge
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {selectedCaseStudy?.challenge}
                </p>
              </div>

              {/* Solution */}
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <Lightbulb className="h-5 w-5 mr-2 text-yellow-500" />
                  The Solution
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {selectedCaseStudy?.solution}
                </p>
              </div>

              {/* Results */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-blue-500" />
                  Key Results
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedCaseStudy?.metrics?.map((metric: any, index: number) => (
                    <div key={index} className="p-4 bg-muted rounded-lg">
                      <div className="text-sm font-medium mb-2">{metric.label}</div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs text-muted-foreground">Before</div>
                          <div className="font-semibold">{metric.before}</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {metric.change > 0 ? (
                            <TrendingUp className="h-4 w-4 text-green-600" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-600" />
                          )}
                          <span className={`text-sm font-bold ${metric.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {metric.change > 0 ? '+' : ''}{metric.change}%
                          </span>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">After</div>
                          <div className="font-semibold">{metric.after}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Testimonial */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Quote className="h-5 w-5 mr-2 text-purple-500" />
                  Client Testimonial
                </h3>
                <div className="bg-muted p-6 rounded-lg">
                  <blockquote className="text-lg italic mb-4">
                    "{selectedCaseStudy?.testimonial?.quote}"
                  </blockquote>
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-gradient-to-r from-[#FF620A] to-[#993B06] rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold">{selectedCaseStudy?.testimonial?.author}</div>
                      <div className="text-sm text-muted-foreground">{selectedCaseStudy?.testimonial?.role}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCaseStudy?.tags?.map((tag: string) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  )
}