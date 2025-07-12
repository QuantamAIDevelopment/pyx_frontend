'use client'

import { Link } from 'react-router-dom'
import { Zap, Github, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react'
import { Button } from '../common/ui/button'
import { Separator } from '../common/ui/separator'

export function Footer() {
  const footerLinks = {
    product: [
      { label: 'AI Agents', path: '/agents' },
      { label: 'Pricing', path: '/pricing' },
      { label: 'Integrations', path: '/integrations' },
      { label: 'API Documentation', path: '/api/docs' },
      { label: 'Changelog', path: '/changelog' }
    ],
    company: [
      { label: 'About Us', path: '/about' },
      { label: 'Careers', path: '/careers' },
      { label: 'Blog', path: '/blog' },
      { label: 'Press Kit', path: '/press-kit' },
      { label: 'Contact', path: '/contact' }
    ],
    resources: [
      { label: 'Help Center', path: '/help' },
      { label: 'Community', path: '/community' },
      { label: 'Tutorials', path: '/tutorials' },
      { label: 'Case Studies', path: '/case-studies' },
      { label: 'Webinars', path: '/webinars' }
    ],
    legal: [
      { label: 'Privacy Policy', path: '/privacy' },
      { label: 'Terms of Service', path: '/terms' },
      { label: 'Cookie Policy', path: '/cookies' },
      { label: 'GDPR', path: '/gdpr' },
      { label: 'Security', path: '/security' }
    ]
  }

  const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com/pyx_ai', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com/company/pyx-ai', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com/pyx-ai', label: 'GitHub' }
  ]

  return (
    <footer className="bg-background border-t border-border px-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Brand section */}
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center space-x-2 mb-4 w-fit">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  PYX
                </span>
              </Link>
              <p className="text-muted-foreground mb-6 max-w-md">
                Empowering businesses with intelligent AI agents that automate workflows, 
                boost productivity, and drive growth. Transform your operations today.
              </p>
              
              {/* Contact info */}
              <div className="space-y-2 text-sm text-muted-foreground mb-6">
                <Link to="/contact" className="flex items-center space-x-2 hover:text-foreground transition-colors w-fit">
                  <Mail className="h-4 w-4" />
                  <span>admin@pyxnetwork.com</span>
                </Link>
                <Link to="/contact" className="flex items-center space-x-2 hover:text-foreground transition-colors w-fit">
                  <Phone className="h-4 w-4" />
                  <span>+91-9866669541</span>
                </Link>
                <Link to="/contact" className="flex items-center space-x-2 hover:text-foreground transition-colors w-fit">
                  <MapPin className="h-4 w-4" />
                  <span>Hyderabad, Telangana</span>
                </Link>
              </div>

              {/* Social links */}
              <div className="flex space-x-3">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon
                  return (
                    <Button
                      key={social.label}
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 hover:bg-gray-200 hover:text-primary transition-colors"
                      asChild
                    >
                      <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                        <IconComponent className="h-4 w-4" />
                      </a>
                    </Button>
                  )
                })}
              </div>
            </div>

            {/* Links sections */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-3 gap-8 lg:col-span-3">
              <div>
                <h3 className="font-medium mb-4">Product</h3>
                <ul className="space-y-2">
                  {footerLinks.product.map((link) => (
                    <li key={link.label}>
                      <Link 
                        to={link.path}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-4">Company</h3>
                <ul className="space-y-2">
                  {footerLinks.company.map((link) => (
                    <li key={link.label}>
                      <Link 
                        to={link.path}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-4">Resources</h3>
                <ul className="space-y-2">
                  {footerLinks.resources.map((link) => (
                    <li key={link.label}>
                      <Link 
                        to={link.path}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="md:col-span-4 lg:col-span-3">
                <h3 className="font-medium mb-4">Legal</h3>
                <ul className="flex flex-wrap gap-x-6 gap-y-2">
                  {footerLinks.legal.map((link) => (
                    <li key={link.label}>
                      <Link 
                        to={link.path}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Bottom footer */}
        <div className="py-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground">
            © 2024 PYX. All rights reserved.
          </div>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>Built by QAID Software Pvt Ltd</span>
          </div>
        </div>
      </div>
    </footer>
  )
}