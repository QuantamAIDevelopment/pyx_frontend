'use client'

import { Hero } from './Hero'
import { HowItWorks } from '../common/HowItWorks'
import { FeaturedAgents } from '../agents/FeaturedAgents'
import { Categories } from '../common/Categories'
import { Testimonials } from '../common/Testimonials'
import { CallToAction } from '../common/CallToAction'
import { PyXDemo } from '../common/PyXDemo'

interface LandingPageProps {
  onExploreAgents: () => void
  onGetStarted: () => void
  onAgentSelect: (agent: any) => void
  onCreateAgent: () => void
}

export function LandingPage({ onExploreAgents, onGetStarted, onAgentSelect }: LandingPageProps) {
  return (
    <div className="w-full overflow-hidden">
      {/* Hero Section - Full viewport with consistent spacing */}
      <Hero onExploreAgents={onExploreAgents} onGetStarted={onGetStarted} />
      
      {/* How It Works - Alternating background with proper spacing */}
      <HowItWorks />
      
      {/* Featured Agents - White background for contrast */}
      <FeaturedAgents onAgentSelect={onAgentSelect} onExploreAgents={onExploreAgents} />
      
      {/* Categories - Muted background for visual separation */}
      <Categories />
      
      {/* PyX Assistant Demo - Showcase the AI assistant */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <PyXDemo />
      </section>
      
      {/* Testimonials - White background for readability */}
      <Testimonials />
      
      {/* Call to Action - Gradient background for final conversion */}
      <CallToAction onGetStarted={onGetStarted} />
    </div>
  )
}