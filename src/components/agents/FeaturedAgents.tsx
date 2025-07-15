'use client'

import { useEffect, useState } from 'react';
import { Button } from '../common/ui/button'
// import { Badge } from '../common/ui/badge'
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../common/ui/card'
import {
  // ShoppingCart,
  // DollarSign,
  // Package,
  // MessageCircle,
  // Star,
  ArrowRight,
  // Zap
} from 'lucide-react'
import { AgentCard } from './AgentCard'
import { fetchAgentCards } from '../apiservices/api';

interface Agent {
  id: string
  name: string
  description: string
  category: string
  icon: React.ComponentType<any>
  price: string
  rating: number
  reviews: number
  isPopular?: boolean
  sampleOutput: string
}

interface FeaturedAgentsProps {
  onAgentSelect: (agent: Agent) => void
  onExploreAgents: () => void
}

export function FeaturedAgents({ onAgentSelect, onExploreAgents }: FeaturedAgentsProps) {
  const [agents, setAgents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAgentCards()
      .then(cards => {
        setAgents(cards.slice(0, 4));
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-10">Loading featured agents...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <section className="py-20 sm:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Featured AI Agents
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover our most popular AI agents that are transforming businesses worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 px-20">
          {agents.map((agent) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              onClick={() => onAgentSelect(agent)}
            />
          ))}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            variant="outline"
            className="px-10 py-6 text-lg font-medium rounded-xl border-2 hover:bg-muted/50 transition-all duration-300 shadow-md hover:shadow-lg"
            onClick={onExploreAgents}
          >
            View All Agents
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}