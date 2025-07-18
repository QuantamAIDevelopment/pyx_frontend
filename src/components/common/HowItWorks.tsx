'use client'

import { Search, Zap, BarChart3 } from 'lucide-react'

export function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: "Browse Agents",
      description: "Explore our marketplace of specialized AI agents designed for different business needs and workflows.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Zap,
      title: "Activate",
      description: "Choose the perfect agents for your business and activate them with just a few clicks. No technical setup required.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: BarChart3,
      title: "Monitor Results",
      description: "Track performance, view analytics, and watch your business metrics improve with real-time AI automation.",
      color: "from-indigo-500 to-indigo-600"
    }
  ]

  return (
    <section className="py-20 sm:py-32 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            How It Works
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Get started with AI automation in three simple steps. No technical expertise required.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => {
            const IconComponent = step.icon
            return (
              <div key={index} className="relative text-center group">
                {/* Connection line */}
                {index < steps.length - 1 && (
                 <div className="hidden md:block absolute top-16 left-[100%] -translate-x-1/2 w-full h-0.5 bg-gradient-to-r from-black via-gray/30 to-transparent z-0"/>
                )}
                {/* "hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-gradient-to-r from-[#FF620A] to-[#993B06] from-current to-transparent text-muted-foreground/20 z-0 " */}
                
                <div className="relative z-10">
                  {/* Step number */}
                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-medium mb-6">
                    {index + 1}
                  </div>
                  
                  {/* Icon */}
                  <div className={`flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${step.color} rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-10 w-10 text-white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}