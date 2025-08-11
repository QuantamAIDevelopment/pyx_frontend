'use client'

import { Button } from '../common/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../common/ui/card'
import { Badge } from '../common/ui/badge'

type ViewType = 'dashboard' | 'contact' | 'agents'
import { 
  Zap, 
  Users, 
  Globe, 
  // Award, 
  TrendingUp, 
  Brain, 
  Rocket, 
  Heart,
  Target,
  Lightbulb,
  Shield,
  Sparkles,
  ArrowRight,
  Store
} from 'lucide-react'

const stats = [
  { icon: Users, label: 'Active Users', value: '50,000+', description: 'Businesses worldwide' },
  { icon: Zap, label: 'AI Agents Deployed', value: '2.5M+', description: 'Automating workflows' },
  { icon: Globe, label: 'Countries', value: '120+', description: 'Global reach' },
  { icon: TrendingUp, label: 'Cost Savings', value: 'Rs1.2B+', description: 'For our customers' }
]

const values = [
  {
    icon: Brain,
    title: 'Innovation First',
    description: 'We push the boundaries of AI technology to create solutions that were previously impossible.'
  },
  {
    icon: Heart,
    title: 'Human-Centered',
    description: 'Our AI agents are designed to augment human capabilities, not replace them.'
  },
  {
    icon: Shield,
    title: 'Trust & Security',
    description: 'We prioritize data security and ethical AI practices in everything we build.'
  },
  {
    icon: Rocket,
    title: 'Speed & Efficiency',
    description: 'We help businesses move faster by automating repetitive tasks and workflows.'
  }
]

const timeline = [
  {
    year: '2021',
    title: 'Company Founded',
    description: 'PYX was founded with a vision to democratize AI automation for businesses of all sizes.'
  },
  {
    year: '2022',
    title: 'First AI Agents',
    description: 'Launched our first suite of 8 specialized AI agents for e-commerce automation.'
  },
  {
    year: '2023',
    title: 'Series A Funding',
    description: 'Raised Rs25M Series A to accelerate product development and global expansion.'
  },
  {
    year: '2024',
    title: 'Developer Platform',
    description: 'Launched comprehensive developer tools and marketplace for custom AI agents.'
  }
]

interface AboutPageProps {
  onViewChange: (view: ViewType) => void
  isLoggedIn: boolean
  onShowAuth: (mode: 'login' | 'signup') => void
}

export function AboutPage({ onViewChange, isLoggedIn, onShowAuth }: AboutPageProps) {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleGetStarted = () => {
    if (isLoggedIn) {
      onViewChange('dashboard')
    } else {
      onShowAuth('signup')
    }
  }

  const handleViewCareers = () => {
    onViewChange('contact')
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-bg-secondary dark:from-blue-950/20 dark:via-purple-950/20 dark:to-pink-950/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-brand-primary text-white">
              <Sparkles className="h-3 w-3 mr-1" />
              About PYX
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Empowering Businesses with{' '}
              <span className="bg-brand-primary bg-clip-text text-transparent">
                Intelligent AI
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              We're on a mission to make AI automation accessible to every business, 
              helping teams work smarter, move faster, and achieve more than ever before.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="!bg-brand-primary border-none"
                onClick={() => scrollToSection('mission')}
              >
                <Target className="h-4 w-4 mr-2" />
                Our Mission
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => scrollToSection('values')}
              >
                <Heart className="h-4 w-4 mr-2" />
                Our Values
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-20">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <div key={index} className="text-center ">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-primary mx-auto mb-4">
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="font-medium text-foreground mb-1">{stat.label}</div>
                  <div className="text-sm text-muted-foreground">{stat.description}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section id="mission" className="py-20 bg-bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-24">
            <div>
              <Badge className="mb-4 !bg-brand-primary text-white">
                Our Story
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Born from a Vision to Democratize AI
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  PYX was founded in 2021 by a team of AI researchers and engineers who witnessed 
                  firsthand how complex and expensive it was for businesses to implement AI solutions. 
                  We saw small and medium businesses struggling to compete with tech giants who had 
                  unlimited resources for AI development.
                </p>
                <p>
                  Our founders, coming from backgrounds at Google, Microsoft, and Stanford's AI Lab, 
                  decided to change this. We believed that every business, regardless of size, 
                  should have access to powerful AI automation tools.
                </p>
                <p>
                  Today, PYX serves over 50,000 businesses worldwide, from small startups to 
                  Fortune 500 companies, helping them automate workflows, reduce costs, and 
                  focus on what matters most: growing their business.
                </p>
              </div>
              <div className="mt-8">
                <Button 
                  onClick={() => onViewChange('agents')}
                  className="!bg-brand-primary"
                >
                  <Store className="h-4 w-4 mr-2" />
                  Explore Our Agents
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl !bg-brand-primary p-8 text-white">
                <div className="h-full flex flex-col justify-center items-center text-center">
                  <Lightbulb className="h-16 w-16 mb-6" />
                  <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                  <p className="text-lg opacity-90">
                    A world where AI amplifies human potential and every business 
                    can harness the power of intelligent automation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section id="values" className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-brand-primary text-white">
              Our Values
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              What Drives Us Forward
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our core values shape every decision we make and every product we build.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-20">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-primary mx-auto mb-4">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {value.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-brand-primary text-white">
              Our Journey
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Key Milestones
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From a small startup to a global AI automation platform.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-brand-primary"></div>
              
              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <div key={index} className="relative flex items-start">
                    {/* Timeline dot */}
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-primary text-white font-bold text-lg">
                      {item.year.slice(-2)}
                    </div>
                    
                    {/* Content */}
                    <div className="ml-8 flex-1">
                      <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-xl">{item.title}</CardTitle>
                            <Badge variant="outline">{item.year}</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="text-base leading-relaxed">
                            {item.description}
                          </CardDescription>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="py-20 !bg-bg-secondary text-text-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 ">
              Ready to Join the AI Revolution?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Whether you're looking to automate your business or explore career opportunities, 
              we'd love to hear from you..!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                onClick={handleGetStarted}
                className='!bg-brand-primary text-white'
              >
                <Rocket className="h-4 w-4 mr-2" />
                Get Started
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-none text-text-primary hover:bg-white hover:text-primary"
                onClick={handleViewCareers}
              >
                <Users className="h-4 w-4 mr-2 text-text-primary" />
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}