'use client'

import { useState, useEffect } from 'react'
import { Button } from '../common/ui/button'
import { ArrowRight, Sparkles, Zap, TrendingUp, Play } from 'lucide-react'

interface HeroProps {
  onExploreAgents: () => void
  onGetStarted: () => void
}

export function Hero({ onExploreAgents, onGetStarted }: HeroProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  // Debug: Log the image path to verify it's correct
  useEffect(() => {
    console.log('Hero component mounted, image path:', '/assets/nebula.png');
  }, []);

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
          {/* Custom cosmic nebula background - optimized for both light and dark modes */}
          <img
            src="/assets/nebula.png"
            alt="Spectacular cosmic nebula with vibrant red, orange, and blue stellar formations representing the infinite possibilities of AI automation"
            className="w-full h-full object-cover "
         
          />
          
          {/* Enhanced multi-layered overlays for superior text readability with vibrant background */}
          {/* <div className="absolute inset-0 bg-gradient-to-t from-white/50 via-white/30 to-white/20 dark:from-slate-900/50 dark:via-slate-900/30 dark:to-slate-900/20" /> */}
          {/* <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-indigo-50/15 to-purple-50/20 dark:from-blue-900/15 dark:via-indigo-900/10 dark:to-purple-900/15" /> */}
          {/* <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/15 to-white/10 dark:from-slate-900/10 dark:via-slate-900/15 dark:to-slate-900/10" /> */}
          
          {/* Premium vignette effect with enhanced focus for vibrant background */}
          {/* <div className="absolute inset-0" style={{
            background: 'radial-gradient(ellipse at center, transparent 25%, rgba(0,0,0,0.08) 55%, rgba(0,0,0,0.15) 80%, rgba(0,0,0,0.25) 100%)'
          }} /> */}
          
          {/* Cosmic color harmony overlay to blend with the vibrant nebula */}
          {/* <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/20 via-blue-50/25 to-purple-50/20 dark:from-cyan-900/10 dark:via-blue-900/12 dark:to-purple-900/10" /> */}
          
          {/* Additional contrast overlay for text clarity */}
          {/* <div className="absolute inset-0 bg-gradient-to-t from-white/15 via-transparent to-white/10 dark:from-slate-900/15 dark:via-transparent dark:to-slate-900/10" /> */}
        </div>
      </div>

      {/* Enhanced Background Layer - Light/Dark Mode */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-indigo-50/40 to-purple-50/40 dark:from-slate-900/40 dark:via-purple-900/40 dark:to-indigo-900/40 z-1" />
      
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-15 dark:opacity-10 z-2">
        <div 
          className="absolute inset-0 animate-pulse"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.05' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
      </div>
      
      {/* Interactive Hover Highlight - Adaptive colors */}
      <div 
        className={`absolute pointer-events-none transition-all duration-300 ease-out ${
          isHovering ? 'opacity-40 dark:opacity-60' : 'opacity-0'
        }`}
        style={{
          left: mousePosition.x - 200,
          top: mousePosition.y - 200,
          width: 400,
          height: 400,
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, rgba(168, 85, 247, 0.25) 30%, rgba(236, 72, 153, 0.15) 50%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          transform: isHovering ? 'scale(1.2)' : 'scale(1)',
        }}
      />
      
      {/* Secondary ripple effect - Adaptive colors */}
      <div 
        className={`absolute pointer-events-none transition-all duration-500 ease-out ${
          isHovering ? 'opacity-20 dark:opacity-30' : 'opacity-0'
        }`}
        style={{
          left: mousePosition.x - 300,
          top: mousePosition.y - 300,
          width: 600,
          height: 600,
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, rgba(147, 51, 234, 0.15) 40%, transparent 60%)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          transform: isHovering ? 'scale(1.1)' : 'scale(0.9)',
        }}
      />
      
      {/* Enhanced cosmic decorative elements complementing the nebula - Adaptive opacity */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-cyan-400/12 via-blue-400/16 to-purple-400/12 dark:from-cyan-400/6 dark:via-blue-400/10 dark:to-purple-400/6 rounded-full blur-3xl animate-pulse z-3" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/12 via-pink-400/16 to-rose-400/12 dark:from-purple-400/6 dark:via-pink-400/10 dark:to-rose-400/6 rounded-full blur-3xl animate-pulse delay-1000 z-3" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-indigo-400/6 via-violet-400/10 to-purple-400/6 dark:from-indigo-400/3 dark:via-violet-400/5 dark:to-purple-400/3 rounded-full blur-3xl animate-pulse delay-2000 z-3" />
      
      {/* Enhanced floating particles and stellar elements - Adaptive colors */}
      <div className="absolute inset-0 overflow-hidden z-4">
        {/* Primary cosmic particles harmonizing with nebula colors */}
        <div className="absolute top-1/3 left-1/5 w-2 h-2 bg-cyan-400 dark:bg-cyan-300 rounded-full animate-ping opacity-35 dark:opacity-20 shadow-lg shadow-cyan-400/50"></div>
        <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-orange-400 dark:bg-orange-300 rounded-full animate-ping opacity-45 dark:opacity-30 animation-delay-1000 shadow-md shadow-orange-400/40"></div>
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-blue-400 dark:bg-blue-300 rounded-full animate-ping opacity-40 dark:opacity-25 animation-delay-2000 shadow-md shadow-blue-400/40"></div>
        
        {/* Additional stellar particles complementing the nebula */}
        <div className="absolute top-1/4 right-1/3 w-1 h-1 bg-red-400 dark:bg-red-300 rounded-full animate-pulse opacity-50 dark:opacity-30 shadow-sm shadow-red-400/30"></div>
        <div className="absolute bottom-1/3 left-1/6 w-0.5 h-0.5 bg-teal-400 dark:bg-teal-300 rounded-full animate-pulse opacity-45 dark:opacity-25 animation-delay-1500"></div>
        <div className="absolute top-3/4 right-1/5 w-2 h-2 bg-purple-400 dark:bg-purple-300 rounded-full animate-ping opacity-30 dark:opacity-18 animation-delay-3000 shadow-lg shadow-purple-400/40"></div>
        
        {/* Enhanced star field to complement the vibrant nebula */}
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white dark:bg-cyan-200 rounded-full opacity-25 dark:opacity-15 animate-pulse"
            style={{
              width: `${Math.random() * 1.5 + 0.5}px`,
              height: `${Math.random() * 1.5 + 0.5}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
              boxShadow: '0 0 3px rgba(255, 255, 255, 0.5)',
            }}
          />
        ))}
      </div>
      
      {/* Foreground Content */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 w-full z-20">
        <div className="text-center max-w-5xl mx-auto">
      
          {/* Enhanced Badge with cosmic styling - Light/Dark Mode */}
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100/90 to-purple-100/90 dark:from-blue-600/30 dark:to-purple-600/30 backdrop-blur-md px-6 py-3 rounded-full mb-8 border border-blue-200/80 dark:border-blue-400/40 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400 animate-spin" style={{ animationDuration: '3s' }} />
            <span className="text-sm font-semibold text-blue-800 dark:text-blue-100 tracking-wide">
              Next-Generation AI Automation Platform
            </span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-ping opacity-75"></div>
          </div>

          {/* Enhanced headline with cosmic styling - Light/Dark Mode */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-8 leading-tight">
            <span className="block mb-3 text-gray-900 dark:text-white drop-shadow-lg">Shape Your</span>
            <span className="block bg-gradient-to-r from-cyan-500 via-blue-600 via-purple-600 to-pink-500 dark:from-cyan-400 dark:via-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-3 drop-shadow-2xl" style={{ backgroundSize: '200% 100%' }}>
              AI Ecosystem
            </span>
            <span className="block text-gray-900 dark:text-white drop-shadow-lg">for the Future</span>
          </h1>

          {/* Enhanced subtitle with superior contrast against vibrant background - Light/Dark Mode */}
          <p className="text-xl sm:text-2xl text-gray-800 dark:text-gray-50 max-w-3xl mx-auto mb-12 leading-relaxed drop-shadow-lg font-medium backdrop-blur-sm">
            Build and deploy intelligent agents effortlessly. Transform your business operations with AI that adapts, learns, and scales with your needs.
          </p>

          {/* Premium Enhanced CTA Buttons - Light/Dark Mode */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20 ">
            <Button 
              onClick={onExploreAgents}
              size="lg" 
              className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:via-blue-500 hover:to-purple-500 text-white px-12 py-7 text-lg font-semibold rounded-2xl transition-all duration-500 shadow-2xl hover:shadow-3xl transform hover:scale-110 border-0 relative overflow-hidden border-none"
            >
              {/* Animated background shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1000"></div>
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
              className="px-12 py-7 text-lg font-semibold rounded-2xl border-2 border-gray-300/70 hover:border-blue-500/70 dark:border-white/30 dark:hover:border-white/50 bg-white/90 hover:bg-white dark:bg-white/15 dark:hover:bg-white/25 text-gray-800 hover:text-blue-700 dark:text-white dark:hover:text-white backdrop-blur-md transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:scale-105 relative overflow-hidden"
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
            <div className="text-center group cursor-pointer">
              <div className="relative flex items-center justify-center w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-cyan-400 via-blue-500 to-blue-600 rounded-3xl shadow-2xl group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 group-hover:shadow-blue-500/50 backdrop-blur-sm overflow-hidden">
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-300 via-blue-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Floating particles inside */}
                <div className="absolute top-2 right-2 w-1 h-1 bg-white rounded-full animate-ping opacity-60"></div>
                <div className="absolute bottom-3 left-3 w-0.5 h-0.5 bg-cyan-200 rounded-full animate-pulse opacity-80"></div>
                
                <Zap className="relative h-12 w-12 text-white group-hover:animate-bounce" />
                
                {/* Glow effect */}
                <div className="absolute -inset-2 bg-gradient-to-br from-cyan-400 via-blue-500 to-blue-600 rounded-3xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300 -z-10"></div>
              </div>
              <div className="text-5xl font-bold text-gray-900 dark:text-white mb-3 drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">8+</span>
              </div>
              <div className="text-lg text-gray-700 dark:text-gray-300 font-semibold drop-shadow-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                Specialized AI Agents
              </div>
            </div>
            
            <div className="text-center group cursor-pointer">
              <div className="relative flex items-center justify-center w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-purple-400 via-violet-500 to-purple-600 rounded-3xl shadow-2xl group-hover:scale-125 group-hover:-rotate-6 transition-all duration-500 group-hover:shadow-purple-500/50 backdrop-blur-sm overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-300 via-violet-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="absolute top-2 left-2 w-1 h-1 bg-white rounded-full animate-ping opacity-60 animation-delay-500"></div>
                <div className="absolute bottom-2 right-3 w-0.5 h-0.5 bg-purple-200 rounded-full animate-pulse opacity-80"></div>
                
                <TrendingUp className="relative h-12 w-12 text-white group-hover:animate-bounce" />
                
                <div className="absolute -inset-2 bg-gradient-to-br from-purple-400 via-violet-500 to-purple-600 rounded-3xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300 -z-10"></div>
              </div>
              <div className="text-5xl font-bold text-gray-900 dark:text-white mb-3 drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="bg-gradient-to-r from-purple-400 to-violet-500 bg-clip-text text-transparent">40%</span>
              </div>
              <div className="text-lg text-gray-700 dark:text-gray-300 font-semibold drop-shadow-sm group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                Average Efficiency Boost
              </div>
            </div>
            
            <div className="text-center group cursor-pointer">
              <div className="relative flex items-center justify-center w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-pink-400 via-rose-500 to-pink-600 rounded-3xl shadow-2xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 group-hover:shadow-pink-500/50 backdrop-blur-sm overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-300 via-rose-400 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="absolute top-3 right-2 w-1 h-1 bg-white rounded-full animate-ping opacity-60 animation-delay-1000"></div>
                <div className="absolute bottom-3 left-2 w-0.5 h-0.5 bg-pink-200 rounded-full animate-pulse opacity-80"></div>
                
                <Sparkles className="relative h-12 w-12 text-white group-hover:animate-spin" style={{ animationDuration: '2s' }} />
                
                <div className="absolute -inset-2 bg-gradient-to-br from-pink-400 via-rose-500 to-pink-600 rounded-3xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300 -z-10"></div>
              </div>
              <div className="text-5xl font-bold text-gray-900 dark:text-white mb-3 drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="bg-gradient-to-r from-pink-400 to-rose-500 bg-clip-text text-transparent">24/7</span>
              </div>
              <div className="text-lg text-gray-700 dark:text-gray-300 font-semibold drop-shadow-sm group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors duration-300">
                Automated Operations
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}