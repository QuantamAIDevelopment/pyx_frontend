'use client'

import { useState, useEffect } from 'react'
import { Button } from '../common/ui/button'
import { ArrowRight, Sparkles, Zap, TrendingUp, Play } from 'lucide-react'

interface HeroProps {
  onExploreAgents: () => void
  onGetStarted: () => void
}

// Hero stats data
const HERO_STATS = [
  {
    icon: Zap,
    value: "100+",
    label: "Specialized AI Agents",
    animationDelay: "0s"
  },
  {
    icon: TrendingUp,
    value: "40%",
    label: "Average Efficiency Boost",
    animationDelay: "500ms"
  },
  {
    icon: Sparkles,
    value: "24/7",
    label: "Automated Operations",
    animationDelay: "1000ms"
  }
] as const

export function Hero({ onExploreAgents, onGetStarted }: HeroProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = document.getElementById('hero-section')?.getBoundingClientRect()
      if (rect) {
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        })
      }
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    const heroSection = document.getElementById('hero-section')
    if (heroSection) {
      heroSection.addEventListener('mousemove', handleMouseMove)
      heroSection.addEventListener('mouseenter', handleMouseEnter)
      heroSection.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      if (heroSection) {
        heroSection.removeEventListener('mousemove', handleMouseMove)
        heroSection.removeEventListener('mouseenter', handleMouseEnter)
        heroSection.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [])

  return (
    <section 
      id="hero-section"
      className="relative min-h-screen flex items-center py-20 sm:py-32 lg:py-40 overflow-hidden"
    >
      {/* Cosmic Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full overflow-hidden">
          <video autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-full object-cover z-[-1]">
            <source src="/assets/herovid.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Premium vignette effect with enhanced focus for vibrant background */}
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(ellipse at center, transparent 25%, rgba(0,0,0,0.08) 55%, rgba(0,0,0,0.15) 80%, rgba(0,0,0,0.25) 100%)'
          }} />
        </div>
      </div>

      {/* Interactive Hover Highlight - Adaptive colors */}
      <div 
        className={`absolute pointer-events-none transition-all duration-300 ease-out ${
          isHovering ? 'opacity-60' : 'opacity-0'
        }`}
        style={{
          left: mousePosition.x - 200,
          top: mousePosition.y - 200,
          width: 400,
          height: 400,
          background: 'radial-gradient(circle, var(--brand-secondary-alpha-0-79) 0%, var(--brand-accent-alpha-0-25) 30%, var(--brand-accent-alpha-0-15) 50%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          transform: isHovering ? 'scale(1.2)' : 'scale(1)',
        }}
      />     

      {/* Foreground Content */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 w-full z-20">
        <div className="text-center max-w-5xl mx-auto">
          {/* Enhanced Badge with cosmic styling - Light/Dark Mode */}
          <div className="inline-flex items-center space-x-2 bg-brand-primary dark:from-blue-600/30 dark:to-purple-600/30 backdrop-blur-md px-6 py-3 rounded-full mb-8 border border-ui-info/80 dark:border-ui-info/40 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <Sparkles className="h-4 w-4 text-text-white dark:text-blue-400 animate-spin" style={{ animationDuration: '3s' }} />
            <span className="text-sm font-semibold text-text-white dark:text-blue-100 tracking-wide">
              Next-Generation AI Automation Platform
            </span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-ping opacity-75"></div>
          </div>

          {/* Enhanced headline with cosmic styling - Light/Dark Mode */}
          <h1 className="text-12xl sm:text-5xl lg:text-6xl xl:text-7xl font-quncry font-bold tracking-tight mb-8 leading-tight">
            <span className="block mb-3 text-text-white dark:text-text-white drop-shadow-lg">SHAPE YOUR</span>
            <span className="block !bg-white bg-clip-text text-brand-primary dark:text-brand-accent mb-3 drop-shadow-2xl" style={{ backgroundSize: '200% 100%' }}>
              AI ECOSYSTEM
            </span>
            <span className="block text-text-white dark:text-text-white drop-shadow-lg">FOR THE FUTURE</span>
          </h1>

          {/* Enhanced subtitle with superior contrast against vibrant background - Light/Dark Mode */}
          <p className="text-xl sm:text-2xl text-text-white dark:text-gray-50 max-w-3xl mx-auto mb-12 leading-relaxed drop-shadow-lg font-medium">
            Build and deploy intelligent agents effortlessly. Transform your business operations with AI that adapts, learns, and scales with your needs.
          </p>

          {/* Premium Enhanced CTA Buttons - Light/Dark Mode */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
            <Button 
              onClick={onExploreAgents}
              size="lg" 
              className="!bg-brand-primary text-text-white px-12 py-7 text-lg font-semibold rounded-2xl transition-all duration-500 shadow-2xl hover:shadow-3xl transform hover:scale-110 border-0 relative overflow-hidden border-none"
            >
              <span className="relative flex items-center">
                <Sparkles className="mr-2 h-5 w-5 animate-spin" style={{ animationDuration: '2s' }} />
                Explore Agents
                <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Button>
            <Button 
              onClick={onGetStarted}
              variant="outline" 
              size="lg" 
              className="px-12 py-7 text-lg font-semibold rounded-2xl border-2 border-border-medium/70 hover:border-ui-info/70 dark:border-text-white/30 dark:hover:border-text-white/50 bg-white/90 hover:bg-white dark:bg-white/15 dark:hover:bg-white/25 text-text-primary hover:text-ui-info dark:text-text-white dark:hover:text-text-white backdrop-blur-md transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:scale-105 relative overflow-hidden"
            >
              {/* Glass morphism background */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10 dark:from-white/5 dark:via-white/10 dark:to-white/5"></div>
              <span className="relative flex items-center">
                <Play className="mr-2 h-5 w-5" />
                Get Started Free
                <div className="ml-2 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </span>
            </Button>
          </div>

          {/* Premium Enhanced Stats with cosmic styling - Light/Dark Mode */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto">
            {HERO_STATS.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <div key={index} className="text-center group cursor-pointer">
                  <div className="relative flex items-center justify-center w-24 h-24 mx-auto mb-8 bg-transparent border-2 border-brand-accent rounded-3xl shadow-2xl group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 group-hover:shadow-transparent backdrop-blur-sm overflow-hidden">
                    {/* Animated background */}
                    <div className="absolute inset-0 bg-transparent via-orange-300 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Floating particles inside */}
                    <div className="absolute top-2 right-2 w-1 h-1 bg-white rounded-full animate-ping opacity-60"></div>
                    <div className="absolute bottom-3 left-3 w-0.5 h-0.5 bg-cyan-200 rounded-full animate-pulse opacity-80"></div>
                    
                    <IconComponent className="relative h-12 w-12 text-text-white group-hover:animate-bounce" />
                  </div>
                  <div className="text-5xl font-bold text-text-primary dark:text-text-white mb-3 drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="bg-white bg-clip-text text-transparent">{stat.value}</span>
                  </div>
                  <div className="text-lg text-text-white dark:text-text-muted font-semibold drop-shadow-sm group-hover:text-brand-accent dark:group-hover:text-ui-info transition-colors duration-300">
                    {stat.label}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}