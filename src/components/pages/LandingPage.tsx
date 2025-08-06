'use client'

import { Hero } from './Hero'
import { HowItWorks } from '../common/HowItWorks'
import { FeaturedAgents } from '../agents/FeaturedAgents'
import { Categories } from '../common/Categories'
import { Testimonials } from '../common/Testimonials'
import { CallToAction } from '../common/CallToAction'

// Props for the landing page
interface LandingPageProps {
  onExploreAgents: () => void
  onGetStarted: () => void
  onAgentSelect: (agent: any) => void
}

export function LandingPage({ onExploreAgents, onGetStarted, onAgentSelect }: LandingPageProps) {
  return (
    <div className="w-full overflow-hidden">
      {/* Hero Section */}
      <Hero onExploreAgents={onExploreAgents} onGetStarted={onGetStarted} />
      {/* How It Works Section */}
      <HowItWorks />
      {/* Featured Agents Section */}
      <FeaturedAgents onAgentSelect={onAgentSelect} onExploreAgents={onExploreAgents} />
      {/* Categories Section */}
      <Categories />
      {/* Testimonials Section */}
      <Testimonials />
      {/* Call to Action Section */}
      <CallToAction onGetStarted={onGetStarted} />
    </div>
  )
}