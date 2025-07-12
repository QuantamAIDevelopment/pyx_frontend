'use client'

import { useState } from 'react'
import { Button } from '../common/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../common/ui/card'
import { Badge } from '../common/ui/badge'
import { Switch } from '../common/ui/switch'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../common/ui/accordion'
import { 
  Check, 
  X, 
  Zap, 
  Users, 
  
  Rocket, 
 
  Crown,
  Building,
  ArrowRight,
 
  Phone
} from 'lucide-react'

interface PricingPageProps {
  onViewChange: (view: string) => void
  isLoggedIn: boolean
  onShowAuth: (mode: 'login' | 'signup') => void
}

export function PricingPage({ onViewChange, isLoggedIn, onShowAuth }: PricingPageProps) {
  const [isYearly, setIsYearly] = useState(false)

 const handleGetStarted = (plan: string) => {
  console.log(`Selected plan: ${plan}`);
  if (isLoggedIn) {
    onViewChange('dashboard')
  } else {
    onShowAuth('signup')
  }
}

  const pricingPlans = [
    {
      name: 'Starter',
      description: 'Perfect for small businesses getting started with AI automation',
      icon: Zap,
      price: {
        monthly: 0,
        yearly: 0
      },
      badge: 'Free Forever',
      badgeColor: 'bg-green-500',
      features: [
        { name: '3 AI Agents', included: true },
        { name: '1,000 monthly executions', included: true },
        { name: 'Basic integrations', included: true },
        { name: 'Email support', included: true },
        { name: 'Community access', included: true },
        { name: 'Advanced analytics', included: false },
        { name: 'Custom AI agents', included: false },
        { name: 'Priority support', included: false },
        { name: 'API access', included: false },
        { name: 'White-label solution', included: false }
      ],
      popular: false
    },
    {
      name: 'Professional',
      description: 'Ideal for growing businesses that need more power and flexibility',
      icon: Users,
      price: {
        monthly: 49,
        yearly: 39
      },
      badge: 'Most Popular',
      badgeColor: 'bg-gradient-to-r from-blue-600 to-purple-600',
      features: [
        { name: 'Unlimited AI Agents', included: true },
        { name: '25,000 monthly executions', included: true },
        { name: 'All integrations', included: true },
        { name: 'Priority email support', included: true },
        { name: 'Community access', included: true },
        { name: 'Advanced analytics', included: true },
        { name: 'Custom AI agents', included: true },
        { name: 'Priority support', included: false },
        { name: 'API access', included: true },
        { name: 'White-label solution', included: false }
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      description: 'For large organizations requiring advanced features and support',
      icon: Building,
      price: {
        monthly: 199,
        yearly: 159
      },
      badge: 'Advanced',
      badgeColor: 'bg-gradient-to-r from-purple-600 to-pink-600',
      features: [
        { name: 'Unlimited AI Agents', included: true },
        { name: 'Unlimited executions', included: true },
        { name: 'All integrations', included: true },
        { name: '24/7 phone & email support', included: true },
        { name: 'Private community', included: true },
        { name: 'Advanced analytics', included: true },
        { name: 'Custom AI agents', included: true },
        { name: 'Priority support', included: true },
        { name: 'Full API access', included: true },
        { name: 'White-label solution', included: true }
      ],
      popular: false
    }
  ]

  const comparisonFeatures = [
    { 
      category: 'Core Features',
      features: [
        { name: 'AI Agents', starter: '3 agents', pro: 'Unlimited', enterprise: 'Unlimited' },
        { name: 'Monthly Executions', starter: '1,000', pro: '25,000', enterprise: 'Unlimited' },
        { name: 'Integrations', starter: 'Basic (10+)', pro: 'All (50+)', enterprise: 'All + Custom' },
        { name: 'Team Members', starter: '1 user', pro: '5 users', enterprise: 'Unlimited' }
      ]
    },
    {
      category: 'Analytics & Monitoring',
      features: [
        { name: 'Basic Dashboard', starter: true, pro: true, enterprise: true },
        { name: 'Advanced Analytics', starter: false, pro: true, enterprise: true },
        { name: 'Custom Reports', starter: false, pro: false, enterprise: true },
        { name: 'Real-time Monitoring', starter: false, pro: true, enterprise: true }
      ]
    },
    {
      category: 'Support & Training',
      features: [
        { name: 'Email Support', starter: 'Standard', pro: 'Priority', enterprise: '24/7' },
        { name: 'Phone Support', starter: false, pro: false, enterprise: true },
        { name: 'Onboarding', starter: 'Self-service', pro: 'Guided', enterprise: 'Dedicated' },
        { name: 'Training Resources', starter: 'Basic', pro: 'Advanced', enterprise: 'Custom' }
      ]
    }
  ]

  const faqItems = [
    {
      question: 'What are AI Agents?',
      answer: 'AI Agents are intelligent automation tools that can perform complex tasks like customer service, data analysis, content creation, and workflow management. They learn from your business processes and can handle tasks 24/7 without human intervention.'
    },
    {
      question: 'How do executions work?',
      answer: 'An execution is counted each time an AI agent performs a task or action. For example, processing a customer inquiry, sending an email, or analyzing data counts as one execution. Our plans include generous execution limits to support your automation needs.'
    },
    {
      question: 'Can I upgrade or downgrade my plan?',
      answer: 'Yes, you can change your plan at any time. When upgrading, you\'ll have immediate access to new features. When downgrading, changes take effect at your next billing cycle, and you\'ll retain access to premium features until then.'
    },
    {
      question: 'Is there a free trial for paid plans?',
      answer: 'Yes! All paid plans come with a 14-day free trial. You can explore all premium features without any commitment. No credit card required for the trial period.'
    },
    {
      question: 'What integrations are available?',
      answer: 'We support 50+ integrations including popular tools like Shopify, WooCommerce, Slack, Microsoft Teams, Google Workspace, Salesforce, HubSpot, and many more. Enterprise plans include custom integration development.'
    },
    {
      question: 'How secure is my data?',
      answer: 'We take security seriously with enterprise-grade encryption, SOC 2 compliance, GDPR compliance, and regular security audits. Your data is encrypted in transit and at rest, and we never share it with third parties.'
    },
    {
      question: 'Do you offer custom AI agent development?',
      answer: 'Yes! Professional and Enterprise plans include access to our visual agent builder for creating custom AI agents. Enterprise customers also get dedicated support for complex custom development projects.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for Enterprise customers. All payments are processed securely through Stripe.'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-pink-950/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <Crown className="h-3 w-3 mr-1" />
              Pricing Plans
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Choose Your{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Automation
              </span>{' '}
              Plan
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Start free and scale as you grow. All plans include our core AI agents 
              and integrations to automate your business workflows.
            </p>
            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-12">
              <span className={`text-sm ${!isYearly ? 'font-medium' : 'text-muted-foreground'}`}>
                Monthly
              </span>
              <Switch 
                checked={isYearly} 
                onCheckedChange={setIsYearly}
                className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-600 data-[state=checked]:to-purple-600"
              />
              <span className={`text-sm ${isYearly ? 'font-medium' : 'text-muted-foreground'}`}>
                Yearly
              </span>
              {isYearly && (
                <Badge className="bg-green-500 text-white ml-2">
                  Save 20%
                </Badge>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {pricingPlans.map((plan, index) => {
              const IconComponent = plan.icon
              const currentPrice = isYearly ? plan.price.yearly : plan.price.monthly
              
              return (
                <Card 
                  key={index} 
                  className={`relative overflow-hidden ${
                    plan.popular 
                      ? 'border-2 border-blue-500 shadow-xl scale-105' 
                      : 'hover:shadow-lg'
                  } transition-all duration-300`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-2 text-sm font-medium">
                      {plan.badge}
                    </div>
                  )}
                  
                  <CardHeader className={`text-center ${plan.popular ? 'pt-14' : 'pt-6'}`}>
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 mx-auto mb-4">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    
                    {!plan.popular && (
                      <Badge className={`${plan.badgeColor} text-white mb-4 mx-auto w-fit`}>
                        {plan.badge}
                      </Badge>
                    )}
                    
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <CardDescription className="text-base mb-6">
                      {plan.description}
                    </CardDescription>
                    
                    <div className="mb-6">
                      <div className="flex items-baseline justify-center">
                        <span className="text-4xl font-bold">
                          ${currentPrice}
                        </span>
                        <span className="text-muted-foreground ml-1">
                          {currentPrice > 0 ? (isYearly ? '/month' : '/month') : ''}
                        </span>
                      </div>
                      {currentPrice > 0 && isYearly && (
                        <p className="text-sm text-muted-foreground mt-1">
                          Billed annually (${plan.price.yearly * 12}/year)
                        </p>
                      )}
                    </div>
                    
                    <Button 
                      onClick={() => handleGetStarted(plan.name)}
                      className={
                        plan.popular 
                          ? 'w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg' 
                          : 'w-full'
                      }
                      variant={plan.popular ? 'default' : 'outline'}
                    >
                      {currentPrice === 0 ? 'Get Started Free' : 'Start Free Trial'}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardHeader>
                  
                  <CardContent>
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          {feature.included ? (
                            <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                          ) : (
                            <X className="h-4 w-4 text-muted-foreground mr-3 flex-shrink-0" />
                          )}
                          <span className={feature.included ? '' : 'text-muted-foreground'}>
                            {feature.name}
                          </span>
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

      {/* Feature Comparison */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              Detailed Comparison
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Compare All Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get a detailed breakdown of what's included in each plan.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            {comparisonFeatures.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-12">
                <h3 className="text-xl font-bold mb-6 text-center">{category.category}</h3>
                <Card>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-4 font-medium">Feature</th>
                            <th className="text-center p-4 font-medium">Starter</th>
                            <th className="text-center p-4 font-medium">Professional</th>
                            <th className="text-center p-4 font-medium">Enterprise</th>
                          </tr>
                        </thead>
                        <tbody>
                          {category.features.map((feature, featureIndex) => (
                            <tr key={featureIndex} className="border-b last:border-b-0">
                              <td className="p-4 font-medium">{feature.name}</td>
                              <td className="p-4 text-center">
                                {typeof feature.starter === 'boolean' ? (
                                  feature.starter ? (
                                    <Check className="h-4 w-4 text-green-500 mx-auto" />
                                  ) : (
                                    <X className="h-4 w-4 text-muted-foreground mx-auto" />
                                  )
                                ) : (
                                  <span className="text-sm">{feature.starter}</span>
                                )}
                              </td>
                              <td className="p-4 text-center">
                                {typeof feature.pro === 'boolean' ? (
                                  feature.pro ? (
                                    <Check className="h-4 w-4 text-green-500 mx-auto" />
                                  ) : (
                                    <X className="h-4 w-4 text-muted-foreground mx-auto" />
                                  )
                                ) : (
                                  <span className="text-sm">{feature.pro}</span>
                                )}
                              </td>
                              <td className="p-4 text-center">
                                {typeof feature.enterprise === 'boolean' ? (
                                  feature.enterprise ? (
                                    <Check className="h-4 w-4 text-green-500 mx-auto" />
                                  ) : (
                                    <X className="h-4 w-4 text-muted-foreground mx-auto" />
                                  )
                                ) : (
                                  <span className="text-sm">{feature.enterprise}</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              FAQ
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Got questions? We've got answers. If you can't find what you're looking for, 
              feel free to contact our support team.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible>
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Automate Your Business?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of businesses already using QAID to streamline their operations 
              and boost productivity with AI automation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => handleGetStarted('free')}
              >
                <Rocket className="h-4 w-4 mr-2" />
                Start Free Today
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-primary"
                onClick={() => onViewChange('contact')}
              >
                <Phone className="h-4 w-4 mr-2" />
                Talk to Sales
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}