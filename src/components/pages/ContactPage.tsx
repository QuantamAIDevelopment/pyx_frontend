'use client'

import { useState } from 'react'
import { Button } from '../common/ui/button'
import { Input } from '../common/ui/input'
import { Textarea } from '../common/ui/textarea'
import { Label } from '../common/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../common/ui/card'
import { Badge } from '../common/ui/badge'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../common/ui/accordion'

import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  MessageCircle, 
  HelpCircle,
  CheckCircle,
  Users,
  Zap,
  Twitter,
  Linkedin,
  Github,
  Globe
} from 'lucide-react'

interface ContactForm {
  name: string
  email: string
  company: string
  subject: string
  message: string
  type: 'general' | 'support' | 'sales' | 'partnership'
}

const contactInfo = {
  email: 'admin@pyxnetwork.com',
  phone: '+91-9866669541',
  address: 'Flat no-601, Plot no 3, Survey no 74 & 75, Dwellings, Jaihind Enclave, Madhapur, Hyderabad, Telangana, 500081',
  hours: 'Monday - Friday: 9:00 AM - 6:00 PM IST'
}

const supportOptions = [
  {
    title: 'General Inquiries',
    description: 'Questions about PYX, pricing, or general information',
    icon: Mail,
    responseTime: '24 hours',
    contact: 'admin@pyxnetwork.com'
  },
  {
    title: 'Technical Support',
    description: 'Help with AI agents, integrations, or technical issues',
    icon: HelpCircle,
    responseTime: '4 hours',
    contact: 'admin@pyxnetwork.com'
  },
  {
    title: 'Sales & Partnerships',
    description: 'Enterprise solutions, custom integrations, or partnerships',
    icon: Users,
    responseTime: '2 hours',
    contact: 'admin@pyxnetwork.com'
  },
  {
    title: 'Live Chat',
    description: 'Instant support for urgent issues during business hours',
    icon: MessageCircle,
    responseTime: 'Instant',
    contact: 'Available 9 AM - 6 PM IST'
  }
]

const faqData = [
  {
    question: 'How do I get started with PYX AI agents?',
    answer: 'Getting started is simple! Sign up for a free account, browse our marketplace of AI agents, and activate the ones that match your business needs. Most agents can be set up in under 5 minutes with no technical expertise required.'
  },
  {
    question: 'What integrations do you support?',
    answer: 'We support major e-commerce platforms including Shopify, WooCommerce, Magento, BigCommerce, and many more. We also integrate with CRMs like Salesforce and HubSpot, and can connect via API to custom systems.'
  },
  {
    question: 'Is there a free trial available?',
    answer: 'Yes! We offer a 7-day free trial for all premium agents, and several agents are completely free to use. No credit card required to start your trial.'
  },
  {
    question: 'How secure is my data with PYX?',
    answer: 'Security is our top priority. We use enterprise-grade encryption, comply with SOC 2 Type II standards, and are GDPR compliant. Your data is never shared with third parties and is processed securely in isolated environments.'
  },
  {
    question: 'Can I customize AI agents for my specific needs?',
    answer: 'Most of our agents offer customization options through their settings panels. For advanced customizations or enterprise solutions, our team can work with you to create tailored AI agents that perfectly fit your workflow.'
  },
  {
    question: 'What kind of support do you provide?',
    answer: 'We offer multiple support channels including email support, live chat during business hours, comprehensive documentation, video tutorials, and dedicated account managers for enterprise customers.'
  },
  {
    question: 'How does pricing work?',
    answer: 'We offer flexible pricing with free agents, monthly subscriptions starting at Rs14000/month, and custom enterprise packages. You only pay for the agents you use, and you can upgrade, downgrade, or cancel anytime.'
  },
  {
    question: 'Do you offer refunds?',
    answer: 'Yes, we offer a 30-day money-back guarantee for all paid subscriptions. If you\'re not satisfied with our service, contact our support team for a full refund.'
  }
]

export function ContactPage() {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    type: 'general'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Reset form after success message
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: '',
        type: 'general'
      })
    }, 3000)
  }

  const handleInputChange = (field: keyof ContactForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen">
      <div className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              Get in Touch
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions about PYX AI agents? Need help getting started? 
              Our team is here to help you transform your business with AI automation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 !px-20">
            {/* Contact Form */}
            <div className="lg:col-span-2 ">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Send className="h-5 w-5 mr-2 text-blue-600" />
                    Send us a Message
                  </CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isSubmitted ? (
                    <div className="text-center py-8">
                      <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                      <h3 className="font-medium mb-2">Message Sent Successfully!</h3>
                      <p className="text-sm text-muted-foreground">
                        Thank you for contacting us. We'll get back to you within 24 hours.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Contact Type */}
                      <div className="space-y-2">
                        <Label>What can we help you with?</Label>
                        <div className="flex flex-wrap gap-2">
                          {[
                            { value: 'general', label: 'General Inquiry' },
                            { value: 'support', label: 'Technical Support' },
                            { value: 'sales', label: 'Sales & Pricing' },
                            { value: 'partnership', label: 'Partnerships' }
                          ].map(type => (
                            <Badge
                              key={type.value}
                              variant={formData.type === type.value ? 'default' : 'outline'}
                              className="cursor-pointer"
                              onClick={() => handleInputChange('type', type.value)}
                            >
                              {type.label}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Name and Email */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                        <div className="space-y-2 ">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            type="text"
                            placeholder="Your full name"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            required
                            className='!shadow-md rounded '
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            required
                            className='!shadow-md rounded '
                          />
                        </div>
                      </div>

                      {/* Company and Subject */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="company">Company</Label>
                          <Input
                            id="company"
                            type="text"
                            placeholder="Your company name"
                            value={formData.company}
                            onChange={(e) => handleInputChange('company', e.target.value)}
                            className='!shadow-md rounded '
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="subject">Subject *</Label>
                          <Input
                            id="subject"
                            type="text"
                            placeholder="Brief subject line"
                            value={formData.subject}
                            onChange={(e) => handleInputChange('subject', e.target.value)}
                            required
                            className='!shadow-md rounded '
                          />
                        </div>
                      </div>

                      {/* Message */}
                      <div className="space-y-2">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          placeholder="Tell us more about your inquiry..."
                          rows={2}
                          value={formData.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          required
                          className='!shadow-md rounded bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                        />
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full shadow-md rounded !bg-black border-none hover:!bg-black/90 text-white" 
                        size="lg"
                        disabled={isSubmitting}
                       
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Sending...
                          </>
                        ) : (
                          <div className='flex items-center justify-center'>
                            <Send className="h-4 w-4 mr-2 " />
                            Send Message
                          </div>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Quick Contact */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">{contactInfo.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">{contactInfo.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-red-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-sm text-muted-foreground">{contactInfo.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-purple-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Business Hours</p>
                      <p className="text-sm text-muted-foreground">{contactInfo.hours}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card>
                <CardHeader>
                  <CardTitle>Follow Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-3 ">
                    <Button variant="outline" size="icon" className='hover:!bg-gray-100 !shadow-md '>
                      <Twitter className="h-4 w-4 " />
                    </Button>
                    <Button variant="outline" size="icon" className='hover:!bg-gray-100 !shadow-md'>
                      <Linkedin className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className='hover:!bg-gray-100 !shadow-md'>
                      <Github className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className='hover:!bg-gray-100 !shadow-md'>
                      <Globe className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Support Options */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">
                How We Can Help
              </h2>
              <p className="text-muted-foreground">
                Choose the best way to get in touch based on your needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-20">
              {supportOptions.map((option, index) => {
                const IconComponent = option.icon
                return (
                  <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                    <CardHeader className="pb-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-[#FF620A] to-[#993B06] mx-auto mb-4">
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-lg">{option.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="mb-4">
                        {option.description}
                      </CardDescription>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-center space-x-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>Response: {option.responseTime}</span>
                        </div>
                        <p className="font-medium">{option.contact}</p>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground">
                Quick answers to common questions about PYX
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqData.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg p-10 text-center mb-16 ">
            <div className="flex items-center justify-center space-x-2 mb-4 ">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-[#FF620A] to-[#993B06]">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-[#FF620A] to-[#993B06] bg-clip-text text-transparent">
                PYX
              </span>
            </div>
            <h3 className="text-xl font-bold mb-2">Ready to Get Started?</h3>
            <p className="text-muted-foreground mb-6">
              Join thousands of businesses already using PYX AI agents to automate their operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="!bg-black !border-0 text-white shadow-md rounded-lg hover:!bg-black/90">
                Start Free Trial
              </Button>
              <Button variant="outline" size="lg">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}