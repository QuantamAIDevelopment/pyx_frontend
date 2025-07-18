'use client'

import { useState } from 'react'
import { Button } from '../common/ui/button'
import { Input } from '../common/ui/input'
import { ArrowRight, Mail, CheckCircle, Gift, Headphones, Shield, RotateCcw } from 'lucide-react'

interface CallToActionProps {
  onGetStarted: () => void
}

export function CallToAction({ onGetStarted }: CallToActionProps) {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setTimeout(() => {
        setIsSubscribed(false)
        setEmail('')
      }, 3000)
    }
  }

  return (
    <section className="py-20 sm:py-32 bg-[#fff6ed]
 dark:from-blue-950/20 dark:via-indigo-950/20 dark:to-purple-950/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-8">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl sm:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Join thousands of businesses already using QAID AI agents to automate their operations and boost productivity.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Button 
              onClick={onGetStarted}
              size="lg" 
              className="!bg-[#FF620A] border-none hover:bg-[#993B06] text-white px-12 py-6 text-xl font-medium rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Start Free Trial
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
          </div>

          <div className="max-w-md mx-auto">
            <p className="text-sm text-muted-foreground mb-4">
              Get updates on new AI agents and features
            </p>
            
            <form onSubmit={handleEmailSubmit} className="flex gap-2">
              <div className="flex-1 relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 py-6 rounded-lg"
                  required
                />
              </div>
              <Button 
                type="submit" 
                size="lg"
                className="px-6 py-6 rounded-lg !bg-black"
                disabled={isSubscribed}
              >
                {isSubscribed ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  'Subscribe'
                )}
              </Button>
            </form>
            
            {isSubscribed && (
              <p className="text-sm text-green-600 mt-2">
                ✓ Thanks for subscribing! Check your email for updates.
              </p>
            )}
          </div>

          {/* Trust indicators */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-sm text-muted-foreground">
              <div className="flex flex-col items-center space-y-3">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
                  <Gift className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <div className="font-medium text-foreground">Free Trial</div>
                  <div>No Credit Card Required</div>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-3">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl">
                  <Headphones className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="font-medium text-foreground">24/7 Support</div>
                  <div>Always Here to Help</div>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-3">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl">
                  <Shield className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <div className="font-medium text-foreground">Secure</div>
                  <div>Enterprise-Grade Security</div>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-3">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl">
                  <RotateCcw className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <div className="font-medium text-foreground">Cancel Anytime</div>
                  <div>No Long-term Contracts</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}