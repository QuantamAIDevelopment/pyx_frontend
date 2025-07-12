'use client'

import { Card, CardContent } from './ui/card'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "E-commerce Director",
    company: "TechGear Pro",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b1e1?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    content: "SmartSummarizer transformed our product descriptions. We saw a 35% increase in conversion rates within the first month. The AI-generated content is incredibly engaging and SEO-optimized.",
    results: "35% increase in conversions",
    agent: "SmartSummarizer"
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    role: "Operations Manager",
    company: "Fashion Forward",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    content: "StockSense has been a game-changer for our inventory management. We reduced overstock by 40% and eliminated stockouts completely. The predictive analytics are spot-on.",
    results: "40% reduction in overstock",
    agent: "StockSense"
  },
  {
    id: 3,
    name: "Emily Watson",
    role: "Customer Success Lead",
    company: "Home Essentials",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    content: "SupportGenie handles 80% of our customer inquiries automatically. Our response time dropped from hours to seconds, and customer satisfaction scores increased by 25%.",
    results: "80% automated support",
    agent: "SupportGenie"
  },
  {
    id: 4,
    name: "David Kim",
    role: "Pricing Analyst",
    company: "ElectroMart",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    content: "PriceOptimizerAI increased our revenue by 22% through intelligent dynamic pricing. It constantly monitors competitors and adjusts prices in real-time. Absolutely revolutionary.",
    results: "22% revenue increase",
    agent: "PriceOptimizerAI"
  },
  {
    id: 5,
    name: "Lisa Thompson",
    role: "Marketing Director",
    company: "Beauty Boost",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    content: "The content generation capabilities are phenomenal. We've automated our entire product cataloging process and improved our SEO rankings significantly.",
    results: "60% faster cataloging",
    agent: "SmartSummarizer"
  },
  {
    id: 6,
    name: "James Wilson",
    role: "CEO",
    company: "Gadget Galaxy",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    content: "QAID's AI agents have transformed our entire operation. We've reduced operational costs by 30% while improving customer satisfaction. It's like having a team of experts working 24/7.",
    results: "30% cost reduction",
    agent: "Multiple Agents"
  }
]

export function Testimonials() {
  return (
    <section className="py-20 sm:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Trusted by Leading Businesses
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            See how companies are transforming their operations with QAID AI agents.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 px-20">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-card border-border hover:shadow-lg transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="h-12 w-12 text-primary" />
              </div>
              
              <CardContent className="p-6">
                {/* Rating */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                {/* Content */}
                <blockquote className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </blockquote>
                
                {/* Results Badge */}
                <div className="mb-4">
                  <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
                    {testimonial.results}
                  </Badge>
                </div>
                
                {/* Author */}
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.company}</p>
                  </div>
                </div>
                
                {/* Agent Used */}
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    Using: <span className="text-primary font-medium">{testimonial.agent}</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-primary mb-2">500+</div>
            <div className="text-sm text-muted-foreground">Happy Customers</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">$2M+</div>
            <div className="text-sm text-muted-foreground">Revenue Generated</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
            <div className="text-sm text-muted-foreground">Uptime</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">24/7</div>
            <div className="text-sm text-muted-foreground">Support</div>
          </div>
        </div>
      </div>
    </section>
  )
}