'use client'

import { useState } from 'react'
import { Button } from '../common/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../common/ui/card'
import { Badge } from '../common/ui/badge'
import { Input } from '../common/ui/input'
import { Textarea } from '../common/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../common/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from '../common/ui/avatar'
import { 
  Star,
  MessageSquare,
  // Phone,
  // Video,
  Clock,
  // Shield,
  Users,
  // Zap,
  CheckCircle,
  ArrowRight,
  // Calendar,
  // Mail,
  // Globe,
  // HeadphonesIcon,
  // Briefcase,
  // Award,
  // Target,
  // TrendingUp,
  // BookOpen,
  // FileText,
  // Settings,
  // Database,
  // Code,
  // Workflow,
  // AlertCircle,
  Crown,
  // Gem,
  // Heart,
  // ThumbsUp,
  // MessageCircle,
  Send,
  Plus,
  // Search,
  // Filter,
  // Download,
  // ExternalLink
} from 'lucide-react'

interface PremiumSupportPageProps {
  onViewChange: (view: string) => void
  isLoggedIn: boolean
  onShowAuth: (mode: 'login' | 'signup') => void
}

export function PremiumSupportPage({ onViewChange, isLoggedIn, onShowAuth }: PremiumSupportPageProps) {
  const [selectedPlan,setSelectedPlan] = useState<string | null>(null)
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    company: '',
    priority: '',
    subject: '',
    message: ''
  })

  const supportTiers = [
    {
      id: 'developer',
      name: 'Developer Support',
      price: 'Rs29000',
      period: 'per month',
      description: 'Enhanced support for individual developers and small teams',
      features: [
        'Email support (24h response)',
        'Priority community access',
        'Developer resources',
        'Integration assistance',
        'Best practices guidance'
      ],
      responseTime: '24 hours',
      availability: 'Business hours',
      channels: ['email', 'community'],
      popular: false
    },
    {
      id: 'business',
      name: 'Business Support',
      price: 'Rs99000',
      period: 'per month',
      description: 'Comprehensive support for growing businesses',
      features: [
        'Email & chat support (4h response)',
        'Phone support',
        'Priority bug fixes',
        'Implementation guidance',
        'Custom integration help',
        'Performance optimization'
      ],
      responseTime: '4 hours',
      availability: 'Business hours',
      channels: ['email', 'chat', 'phone'],
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise Support',
      price: 'Rs299000',
      period: 'per month',
      description: 'Premium support for mission-critical applications',
      features: [
        'Email, chat & phone (1h response)',
        'Dedicated support engineer',
        'Video calls & screen sharing',
        'Custom development support',
        'Architecture review',
        'SLA guarantees',
        'Emergency hotline'
      ],
      responseTime: '1 hour',
      availability: '24/7',
      channels: ['email', 'chat', 'phone', 'video'],
      popular: false
    }
  ]

  const supportTeam = [
    {
      name: 'Sarah Chen',
      role: 'Senior Support Engineer',
      avatar: '/api/placeholder/64/64',
      specialties: ['API Integration', 'Workflows', 'Custom Development'],
      experience: '5+ years',
      rating: 4.9,
      testimonials: 156
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Technical Solutions Architect',
      avatar: '/api/placeholder/64/64',
      specialties: ['Enterprise Architecture', 'Security', 'Performance'],
      experience: '8+ years',
      rating: 4.8,
      testimonials: 203
    },
    {
      name: 'Emma Thompson',
      role: 'Developer Success Manager',
      avatar: '/api/placeholder/64/64',
      specialties: ['Developer Experience', 'Training', 'Best Practices'],
      experience: '6+ years',
      rating: 4.9,
      testimonials: 178
    },
    {
      name: 'Alex Kumar',
      role: 'Integration Specialist',
      avatar: '/api/placeholder/64/64',
      specialties: ['Third-party Integrations', 'Data Migration', 'Automation'],
      experience: '4+ years',
      rating: 4.7,
      testimonials: 134
    }
  ]

  const testimonials = [
    {
      name: 'David Park',
      title: 'CTO, TechCorp',
      avatar: '/api/placeholder/48/48',
      content: 'The premium support team helped us implement a complex automation system in just 2 weeks. Their expertise saved us months of development time.',
      rating: 5,
      plan: 'Enterprise'
    },
    {
      name: 'Lisa Zhang',
      title: 'Lead Developer, StartupCo',
      avatar: '/api/placeholder/48/48',
      content: 'Amazing response time and deep technical knowledge. They not only solved our issues but also provided optimization recommendations.',
      rating: 5,
      plan: 'Business'
    },
    {
      name: 'Michael Brown',
      title: 'Founder, InnovateNow',
      avatar: '/api/placeholder/48/48',
      content: 'The dedicated support engineer feels like part of our team. They understand our business needs and provide proactive solutions.',
      rating: 5,
      plan: 'Enterprise'
    }
  ]

  const faqItems = [
    {
      question: 'What is included in premium support?',
      answer: 'Premium support includes faster response times, priority access to our engineering team, dedicated support channels, and proactive guidance on best practices and optimization.'
    },
    {
      question: 'How quickly will I get a response?',
      answer: 'Response times vary by plan: Developer (24h), Business (4h), Enterprise (1h). Emergency issues are handled immediately for Enterprise customers.'
    },
    {
      question: 'Can I upgrade or downgrade my support plan?',
      answer: 'Yes, you can change your support plan at any time. Changes take effect immediately, and billing is prorated for the current period.'
    },
    {
      question: 'Do you offer custom development services?',
      answer: 'Yes, our Enterprise support includes custom development assistance. We can help build custom integrations, nodes, and automation workflows.'
    },
    {
      question: 'Is there a long-term commitment required?',
      answer: 'No, all support plans are month-to-month with no long-term contracts. You can cancel at any time.'
    }
  ]

  const handleGetStarted = () => {
    if (isLoggedIn) {
      onViewChange('dashboard')
    } else {
      onShowAuth('signup')
    }
  }
if (selectedPlan) {
  console.log('Selected plan:', selectedPlan);
  // or render some UI component based on the selected plan
}
  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId)
    if (isLoggedIn) {
      // Handle plan subscription
      console.log('Subscribing to plan:', planId)
    } else {
      onShowAuth('signup')
    }
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle contact form submission
    console.log('Contact form submitted:', contactForm)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-[#FFE8DC] via-[#FFD4BD] to-[#FCD2BD]

 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-pink-950/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-gradient-to-r from-[#FF620A] to-[#993B06] text-white">
              <Crown className="h-3 w-3 mr-1" />
              Premium Support
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Get Expert Help When{' '}
              <span className="bg-gradient-to-r from-[#FF620A] to-[#993B06] bg-clip-text text-transparent">
                You Need It Most
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Fast, reliable, and expert support from our team of QAID specialists. 
              Get personalized assistance to maximize your AI automation success.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-lg mx-auto">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-[#FF620A] to-[#993B06] w-full sm:w-auto"
                onClick={handleGetStarted}
              >
                <Star className="h-4 w-4 mr-2" />
                Get Premium Support
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="w-full sm:w-auto"
                onClick={() => onViewChange('contact')}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-[#FF620A] to-[#993B06] mx-auto mb-4">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl md:text-3xl font-bold mb-2">1.2h</div>
              <div className="font-medium text-foreground mb-1 text-sm md:text-base">Avg Response</div>
              <div className="text-xs md:text-sm text-muted-foreground">Faster than industry standard</div>
            </div>
            <div className="text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-blue-600 mx-auto mb-4">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl md:text-3xl font-bold mb-2">98%</div>
              <div className="font-medium text-foreground mb-1 text-sm md:text-base">Resolution Rate</div>
              <div className="text-xs md:text-sm text-muted-foreground">First contact resolution</div>
            </div>
            <div className="text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 mx-auto mb-4">
                <Star className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl md:text-3xl font-bold mb-2">4.9/5</div>
              <div className="font-medium text-foreground mb-1 text-sm md:text-base">Satisfaction</div>
              <div className="text-xs md:text-sm text-muted-foreground">Customer rating</div>
            </div>
            <div className="text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-red-600 mx-auto mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl md:text-3xl font-bold mb-2">500+</div>
              <div className="font-medium text-foreground mb-1 text-sm md:text-base">Enterprise</div>
              <div className="text-xs md:text-sm text-muted-foreground">Customers supported</div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Plans */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Choose Your Support Level</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From individual developers to enterprise teams, we have the right support plan for your needs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {supportTiers.map((tier) => (
              <Card key={tier.id} className={`relative hover:shadow-lg transition-all duration-300 ${tier.popular ? 'border-2 border-primary' : ''}`}>
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-[#FF620A] to-[#993B06] text-white">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{tier.name}</CardTitle>
                  <CardDescription className="text-sm">{tier.description}</CardDescription>
                  <div className="mt-4">
                    <div className="text-4xl font-bold">{tier.price}</div>
                    <div className="text-sm text-muted-foreground">{tier.period}</div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Response Time</span>
                        <span className="font-medium">{tier.responseTime}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Availability</span>
                        <span className="font-medium">{tier.availability}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="font-medium text-sm">Support Channels</div>
                      <div className="flex flex-wrap gap-2">
                        {tier.channels.map((channel) => (
                          <Badge key={channel} variant="secondary" className="text-xs">
                            {channel}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="font-medium text-sm">Features</div>
                      <ul className="space-y-1">
                        {tier.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Button 
                      className={`w-full ${tier.popular ? 'bg-gradient-to-r from-[#FF620A] to-[#993B06]' : ''}`}
                      variant={tier.popular ? 'default' : 'outline'}
                      onClick={() => handlePlanSelect(tier.id)}
                    >
                      {tier.popular ? (
                        <>
                          <Star className="h-4 w-4 mr-2" />
                          Get Started
                        </>
                      ) : (
                        <>
                          <Plus className="h-4 w-4 mr-2" />
                          Select Plan
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Support Team */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Expert Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our support engineers are QAID experts with years of experience in AI automation, 
              system integration, and enterprise software development.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportTeam.map((member) => (
              <Card key={member.name} className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="text-center">
                  <Avatar className="h-16 w-16 mx-auto mb-4">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription className="text-sm">{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{member.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">{member.testimonials} reviews</span>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-sm font-medium mb-1">Experience</div>
                      <div className="text-sm text-muted-foreground">{member.experience}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium mb-2">Specialties</div>
                      <div className="flex flex-wrap gap-1">
                        {member.specialties.map((specialty) => (
                          <Badge key={specialty} variant="secondary" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See how our premium support has helped businesses succeed with QAID.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.title}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      "{testimonial.content}"
                    </p>
                    <Badge variant="outline" className="text-xs">
                      {testimonial.plan} Support
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Need Help Now?</h2>
              <p className="text-lg text-muted-foreground">
                Contact our support team directly for immediate assistance with your QAID implementation.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Get Premium Support</CardTitle>
                <CardDescription>
                  Fill out the form below and our team will get back to you within 1 hour.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Name</label>
                      <Input
                        type="text"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <Input
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Company</label>
                      <Input
                        type="text"
                        value={contactForm.company}
                        onChange={(e) => setContactForm({...contactForm, company: e.target.value})}
                        placeholder="Company name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Priority</label>
                      <Select value={contactForm.priority} onValueChange={(value) => setContactForm({...contactForm, priority: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Subject</label>
                    <Input
                      type="text"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                      placeholder="Brief description of your issue"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <Textarea
                      value={contactForm.message}
                      onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                      placeholder="Detailed description of your issue or question"
                      rows={4}
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-gradient-to-r from-[#FF620A] to-[#993B06]">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Common questions about our premium support services.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqItems.map((item, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{item.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.answer}</p>
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
              Ready for Premium Support?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join hundreds of businesses that rely on our expert support team to maximize 
              their QAID implementation success.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-lg mx-auto">
              <Button 
                size="lg" 
                variant="secondary"
                className="w-full sm:w-auto"
                onClick={handleGetStarted}
              >
                <Crown className="h-4 w-4 mr-2" />
                Get Premium Support
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-primary w-full sm:w-auto"
                onClick={() => onViewChange('contact')}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}