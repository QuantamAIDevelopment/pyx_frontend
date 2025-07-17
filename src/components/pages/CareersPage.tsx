'use client'

import { useState } from 'react'
import { Button } from '../common/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../common/ui/card'
import { Badge } from '../common/ui/badge'
import { Input } from '../common/ui/input'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '../common/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '../common/ui/avatar'
import { 
  Briefcase,
  Search,
  MapPin,
  Clock,
  Users,
  Heart,
  Star,
  Globe,
  Coffee,
 
  Target,
  TrendingUp,
  ArrowRight,
 
  Calendar,
  GraduationCap,
  Award,
  Rocket,
  
  Shield,
  DollarSign,
  Code,
  // Database,
  Palette,
  MessageSquare,
  // Settings,
  BarChart,
  // Headphones,
  // FileText,
  Send,
  // ExternalLink,
  CheckCircle,
  Lightbulb,
  // Sparkles,
  // Crown,
  Home,
  // Plane
} from 'lucide-react'

interface CareersPageProps {
  onViewChange: (view: string) => void
  isLoggedIn: boolean
  onShowAuth: (mode: 'login' | 'signup') => void
}

export function CareersPage({ onViewChange, isLoggedIn, onShowAuth }: CareersPageProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [selectedLocation, setSelectedLocation] = useState('all')

  const departments = [
    { id: 'all', name: 'All Departments', count: 23 },
    { id: 'engineering', name: 'Engineering', count: 12 },
    { id: 'product', name: 'Product', count: 4 },
    { id: 'design', name: 'Design', count: 3 },
    { id: 'marketing', name: 'Marketing', count: 2 },
    { id: 'sales', name: 'Sales', count: 2 }
  ]

  const locations = [
    { id: 'all', name: 'All Locations', count: 23 },
    { id: 'san-francisco', name: 'San Francisco, CA', count: 15 },
    { id: 'new-york', name: 'New York, NY', count: 5 },
    { id: 'remote', name: 'Remote', count: 18 },
    { id: 'london', name: 'London, UK', count: 3 }
  ]

  const jobListings = [
    {
      id: 'sr-ai-engineer',
      title: 'Senior AI Engineer',
      department: 'engineering',
      location: 'san-francisco',
      type: 'Full-time',
      experience: 'Senior',
      remote: true,
      salary: 'Rs15000 - Rs2200',
      description: 'Join our AI team to build cutting-edge machine learning models that power intelligent automation workflows.',
      requirements: [
        '5+ years of experience in machine learning and AI',
        'Strong background in Python, TensorFlow, or PyTorch',
        'Experience with NLP and computer vision',
        'PhD in Computer Science or related field preferred'
      ],
      responsibilities: [
        'Design and implement ML models for workflow automation',
        'Research and develop new AI capabilities',
        'Collaborate with product teams on AI feature development',
        'Mentor junior engineers and contribute to technical strategy'
      ],
      posted: '2 days ago',
      applications: 47,
      urgent: false
    },
    {
      id: 'fullstack-engineer',
      title: 'Full Stack Engineer',
      department: 'engineering',
      location: 'remote',
      type: 'Full-time',
      experience: 'Mid-level',
      remote: true,
      salary: 'Rs12000 - Rs16000',
      description: 'Build scalable web applications and APIs that serve millions of workflow executions daily.',
      requirements: [
        '3+ years of full-stack development experience',
        'Proficiency in React, Node.js, and TypeScript',
        'Experience with cloud platforms (AWS, GCP)',
        'Strong understanding of database design'
      ],
      responsibilities: [
        'Develop and maintain web applications and APIs',
        'Implement new features across the full stack',
        'Optimize application performance and scalability',
        'Participate in code reviews and technical discussions'
      ],
      posted: '5 days ago',
      applications: 89,
      urgent: false
    },
    {
      id: 'product-manager',
      title: 'Senior Product Manager',
      department: 'product',
      location: 'san-francisco',
      type: 'Full-time',
      experience: 'Senior',
      remote: false,
      salary: 'Rs14000 - Rs18000',
      description: 'Lead product strategy and development for our core automation platform, working closely with engineering and design teams.',
      requirements: [
        '5+ years of product management experience',
        'Experience in B2B SaaS or developer tools',
        'Strong analytical and strategic thinking skills',
        'Excellent communication and leadership abilities'
      ],
      responsibilities: [
        'Define product roadmap and strategy',
        'Collaborate with engineering and design teams',
        'Analyze user feedback and market trends',
        'Drive product launches and feature releases'
      ],
      posted: '1 week ago',
      applications: 34,
      urgent: true
    },
    {
      id: 'ux-designer',
      title: 'UX/UI Designer',
      department: 'design',
      location: 'new-york',
      type: 'Full-time',
      experience: 'Mid-level',
      remote: true,
      salary: 'Rs10000 - Rs14000',
      description: 'Create intuitive and beautiful user experiences for our workflow automation platform.',
      requirements: [
        '3+ years of UX/UI design experience',
        'Proficiency in Figma, Sketch, or similar tools',
        'Experience with design systems and component libraries',
        'Strong portfolio demonstrating B2B product design'
      ],
      responsibilities: [
        'Design user interfaces for web and mobile applications',
        'Conduct user research and usability testing',
        'Collaborate with product and engineering teams',
        'Maintain and evolve our design system'
      ],
      posted: '3 days ago',
      applications: 56,
      urgent: false
    },
    {
      id: 'devrel-engineer',
      title: 'Developer Relations Engineer',
      department: 'marketing',
      location: 'remote',
      type: 'Full-time',
      experience: 'Mid-level',
      remote: true,
      salary: 'Rs11000 - Rs15000',
      description: 'Build relationships with our developer community and create technical content to help developers succeed with QAID.',
      requirements: [
        '3+ years of software development experience',
        'Strong technical writing and communication skills',
        'Experience with APIs and developer tools',
        'Community building or developer advocacy experience'
      ],
      responsibilities: [
        'Create technical documentation and tutorials',
        'Engage with developer community',
        'Speak at conferences and events',
        'Provide feedback to product teams from developer perspective'
      ],
      posted: '4 days ago',
      applications: 23,
      urgent: false
    },
    {
      id: 'sales-engineer',
      title: 'Senior Sales Engineer',
      department: 'sales',
      location: 'san-francisco',
      type: 'Full-time',
      experience: 'Senior',
      remote: false,
      salary: 'Rs13000 - Rs17000 + Commission',
      description: 'Work with enterprise customers to understand their automation needs and demonstrate how QAID can solve their challenges.',
      requirements: [
        '5+ years of technical sales or solutions engineering',
        'Strong technical background in software development',
        'Experience selling to enterprise customers',
        'Excellent presentation and communication skills'
      ],
      responsibilities: [
        'Conduct technical demos and presentations',
        'Support sales team with technical expertise',
        'Understand customer requirements and provide solutions',
        'Collaborate with product team on customer feedback'
      ],
      posted: '6 days ago',
      applications: 19,
      urgent: true
    }
  ]

  const benefits = [
    {
      category: 'Health & Wellness',
      icon: Heart,
      items: [
        'Comprehensive health, dental, and vision insurance',
        'Mental health support and counseling',
        'On-site gym and fitness classes',
        'Wellness stipend for health activities'
      ]
    },
    {
      category: 'Work-Life Balance',
      icon: Clock,
      items: [
        'Flexible working hours and remote work options',
        'Unlimited PTO policy',
        '4-day work week during summer months',
        'Sabbatical program for long-term employees'
      ]
    },
    {
      category: 'Growth & Development',
      icon: TrendingUp,
      items: [
        'Rs5,00000 annual learning and development budget',
        'Conference attendance and speaking opportunities',
        'Internal mentorship and coaching programs',
        'Career advancement and promotion pathways'
      ]
    },
    {
      category: 'Compensation & Equity',
      icon: DollarSign,
      items: [
        'Competitive salaries benchmarked to market rates',
        'Equity participation for all employees',
        'Annual performance bonuses',
        'Stock option early exercise program'
      ]
    },
    {
      category: 'Office & Perks',
      icon: Coffee,
      items: [
        'Modern offices in prime locations',
        'Free meals, snacks, and premium coffee',
        'Top-tier equipment and technology',
        'Team events and company retreats'
      ]
    },
    {
      category: 'Family Support',
      icon: Home,
      items: [
        'Generous parental leave policies',
        'Childcare assistance and backup care',
        'Family health insurance coverage',
        'Adoption and fertility support'
      ]
    }
  ]

  const companyValues = [
    {
      title: 'Innovation First',
      description: 'We push the boundaries of what\'s possible with AI and automation, always seeking new ways to solve complex problems.',
      icon: Lightbulb,
      color: 'from-blue-500 to-purple-600'
    },
    {
      title: 'Customer Obsession',
      description: 'Our customers\' success is our success. We build products that truly solve real-world problems and create value.',
      icon: Target,
      color: 'from-green-500 to-blue-600'
    },
    {
      title: 'Transparency & Trust',
      description: 'We believe in open communication, honest feedback, and building trust through transparency in everything we do.',
      icon: Shield,
      color: 'from-purple-500 to-pink-600'
    },
    {
      title: 'Continuous Learning',
      description: 'We embrace curiosity and encourage everyone to learn, grow, and share knowledge to benefit the entire team.',
      icon: GraduationCap,
      color: 'from-orange-500 to-red-600'
    }
  ]

  const teamMembers = [
    {
      name: 'Sarah Chen',
      role: 'VP of Engineering',
      avatar: '/api/placeholder/80/80',
      bio: 'Former Senior Engineer at Google, leading our AI and automation efforts.',
      location: 'San Francisco, CA'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Head of Product',
      avatar: '/api/placeholder/80/80',
      bio: 'Product leader with 10+ years experience at Stripe and Slack.',
      location: 'New York, NY'
    },
    {
      name: 'Emma Thompson',
      role: 'Design Director',
      avatar: '/api/placeholder/80/80',
      bio: 'Award-winning designer previously at Airbnb and Figma.',
      location: 'Remote, UK'
    },
    {
      name: 'Alex Kumar',
      role: 'Head of Developer Relations',
      avatar: '/api/placeholder/80/80',
      bio: 'Developer advocate and community builder, former GitHub.',
      location: 'San Francisco, CA'
    }
  ]

  const testimonials = [
    {
      quote: "Working at QAID has been incredibly rewarding. The problems we're solving are complex and meaningful, and the team is brilliant.",
      author: "David Park",
      role: "Senior AI Engineer",
      avatar: "/api/placeholder/48/48"
    },
    {
      quote: "The culture here is amazing. Everyone is supportive, collaborative, and passionate about building something that truly makes a difference.",
      author: "Lisa Zhang",
      role: "Product Manager",
      avatar: "/api/placeholder/48/48"
    },
    {
      quote: "I love how much autonomy I have to explore new ideas and implement solutions. The learning opportunities are endless.",
      author: "Michael Brown",
      role: "Full Stack Engineer",
      avatar: "/api/placeholder/48/48"
    }
  ]

  const filteredJobs = jobListings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = selectedDepartment === 'all' || job.department === selectedDepartment
    const matchesLocation = selectedLocation === 'all' || job.location === selectedLocation
    return matchesSearch && matchesDepartment && matchesLocation
  })

  const handleGetStarted = () => {
    if (isLoggedIn) {
      onViewChange('dashboard')
    } else {
      onShowAuth('signup')
    }
  }

  const getExperienceColor = (experience: string) => {
    switch (experience) {
      case 'Senior': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
      case 'Mid-level': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'Junior': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const getDepartmentIcon = (department: string) => {
    switch (department) {
      case 'engineering': return <Code className="h-4 w-4" />
      case 'product': return <Target className="h-4 w-4" />
      case 'design': return <Palette className="h-4 w-4" />
      case 'marketing': return <MessageSquare className="h-4 w-4" />
      case 'sales': return <BarChart className="h-4 w-4" />
      default: return <Briefcase className="h-4 w-4" />
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
              <Briefcase className="h-3 w-3 mr-1" />
              Join Our Team
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Build the Future of{' '}
              <span className="bg-gradient-to-r from-[#FF620A] to-[#993B06] bg-clip-text text-transparent">
                AI Automation
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Join a team of passionate innovators building the next generation of intelligent 
              automation tools. Help us empower businesses worldwide with AI-driven workflows.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="Search for positions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 text-base md:text-lg border-2 w-full"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-lg mx-auto">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-[#FF620A] to-[#993B06] w-full sm:w-auto"
                onClick={handleGetStarted}
              >
                <Rocket className="h-4 w-4 mr-2" />
                View Open Roles
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="w-full sm:w-auto"
                onClick={() => onViewChange('about')}
              >
                <Users className="h-4 w-4 mr-2" />
                About QAID
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Company Stats */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-[#FF620A] to-[#993B06] mx-auto mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl md:text-3xl font-bold mb-2">120+</div>
              <div className="font-medium text-foreground mb-1 text-sm md:text-base">Team Members</div>
              <div className="text-xs md:text-sm text-muted-foreground">Across 3 continents</div>
            </div>
            <div className="text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-blue-600 mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl md:text-3xl font-bold mb-2">300%</div>
              <div className="font-medium text-foreground mb-1 text-sm md:text-base">Growth Rate</div>
              <div className="text-xs md:text-sm text-muted-foreground">Year over year</div>
            </div>
            <div className="text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 mx-auto mb-4">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl md:text-3xl font-bold mb-2">Rs50M</div>
              <div className="font-medium text-foreground mb-1 text-sm md:text-base">Series B</div>
              <div className="text-xs md:text-sm text-muted-foreground">Latest funding round</div>
            </div>
            <div className="text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-red-600 mx-auto mb-4">
                <Award className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl md:text-3xl font-bold mb-2">4.8/5</div>
              <div className="font-medium text-foreground mb-1 text-sm md:text-base">Glassdoor</div>
              <div className="text-xs md:text-sm text-muted-foreground">Employee rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Open Positions</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're looking for talented individuals to join our mission of democratizing AI automation.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 px-20">
            <div className="flex-1 ">
              <label className="block text-sm font-medium mb-2">Department</label>
              <select 
                value={selectedDepartment} 
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="w-full p-2 border border-border rounded-lg bg-background "
              >
                {departments.map(dept => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name} ({dept.count})
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">Location</label>
              <select 
                value={selectedLocation} 
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full p-2 border border-border rounded-lg bg-background"
              >
                {locations.map(loc => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name} ({loc.count})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Job Cards */}
          <div className="space-y-6 px-20">
            {filteredJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {getDepartmentIcon(job.department)}
                        <CardTitle className="text-xl">{job.title}</CardTitle>
                        {job.urgent && (
                          <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                            Urgent
                          </Badge>
                        )}
                      </div>
                      <CardDescription className="text-base">
                        {job.description}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold mb-1">{job.salary}</div>
                      <div className="text-sm text-muted-foreground">{job.type}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <Badge className={getExperienceColor(job.experience)}>
                        {job.experience}
                      </Badge>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {locations.find(l => l.id === job.location)?.name}
                      </Badge>
                      {job.remote && (
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Globe className="h-3 w-3" />
                          Remote OK
                        </Badge>
                      )}
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-2">Requirements</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          {job.requirements.slice(0, 3).map((req, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>{req}</span>
                            </li>
                          ))}
                          {job.requirements.length > 3 && (
                            <li className="text-xs text-muted-foreground">
                              +{job.requirements.length - 3} more requirements
                            </li>
                          )}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Responsibilities</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          {job.responsibilities.slice(0, 3).map((resp, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <Target className="h-3 w-3 text-blue-500 mt-0.5 flex-shrink-0" />
                              <span>{resp}</span>
                            </li>
                          ))}
                          {job.responsibilities.length > 3 && (
                            <li className="text-xs text-muted-foreground">
                              +{job.responsibilities.length - 3} more responsibilities
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>Posted {job.posted}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>{job.applications} applicants</span>
                        </div>
                      </div>
                      <Button 
                        className="bg-gradient-to-r from-[#FF620A] to-[#993B06]"
                        onClick={() => onViewChange('apply')}
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">💼</div>
              <h3 className="text-xl font-semibold mb-2">No positions found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search criteria or check back later for new openings.
              </p>
              <Button 
                variant="outline"
                onClick={() => {
                  setSearchTerm('')
                  setSelectedDepartment('all')
                  setSelectedLocation('all')
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Company Values */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do and shape our culture.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 px-20">
            {companyValues.map((value, index) => {
              const IconComponent = value.icon
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${value.color} mx-auto mb-4`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Benefits & Perks</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We believe in taking care of our team so they can do their best work.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-20">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <Card key={index} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-lg">
                      <IconComponent className="h-5 w-5" />
                      {benefit.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {benefit.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Showcase */}
      {/* <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet the Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get to know some of the amazing people you'll be working with.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 px-20">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <Avatar className="h-20 w-20 mx-auto mb-4">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription>{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    {member.bio}
                  </p>
                  <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>{member.location}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* Testimonials */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Team Says</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hear from our team members about their experience working at QAID.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 px-20">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
                      <AvatarFallback>{testimonial.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-sm">{testimonial.author}</div>
                      <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#FF620A] to-[#993B06]
 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Join Our Mission?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Help us build the future of AI automation and make a real impact on how 
              businesses operate worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-lg mx-auto">
              <Button 
                size="lg" 
                variant="secondary"
                className="w-full sm:w-auto"
                onClick={handleGetStarted}
              >
                <Briefcase className="h-4 w-4 mr-2" />
                Apply Now
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="!bg-white text-black hover:text-primary w-full sm:w-auto"
                onClick={() => onViewChange('contact')}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Have Questions?
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}