'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { usePyX } from '../layout/PyXContextProvider'
import { useAIService } from './AIService'

interface Agent {
  id: string
  name: string
  description: string
  category: string
  tags: string[]
  rating: number
  downloads: number
  price: number
  features: string[]
  compatibility: string[]
  author: string
  lastUpdated: Date
  complexity: 'beginner' | 'intermediate' | 'advanced'
  useCase: string[]
  performance: {
    speed: number
    accuracy: number
    reliability: number
  }
}

interface UserProfile {
  userId: string
  role: string
  experience: string
  interests: string[]
  goals: string[]
  usageHistory: {
    agentId: string
    usage: number
    rating?: number
    feedback?: string
    lastUsed: Date
  }[]
  preferences: {
    complexity: 'beginner' | 'intermediate' | 'advanced'
    priceRange: [number, number]
    categories: string[]
    features: string[]
  }
}

interface RecommendationContext {
  currentPage: string
  searchQuery?: string
  filters: {
    category?: string
    priceRange?: [number, number]
    rating?: number
    complexity?: string
  }
  sessionData: {
    viewedAgents: string[]
    searchHistory: string[]
    interactions: any[]
  }
}

interface Recommendation {
  agent: Agent
  score: number
  reasons: string[]
  confidence: number
  type: 'personalized' | 'trending' | 'similar' | 'collaborative' | 'content-based'
  metadata: {
    userMatch: number
    popularityScore: number
    qualityScore: number
    recencyScore: number
  }
}

interface RecommendationEngineType {
  getRecommendations: (context?: RecommendationContext) => Promise<Recommendation[]>
  getPersonalizedRecommendations: (userId: string, limit?: number) => Promise<Recommendation[]>
  getSimilarAgents: (agentId: string, limit?: number) => Promise<Recommendation[]>
  getTrendingAgents: (category?: string, limit?: number) => Promise<Recommendation[]>
  getRecommendationsForQuery: (query: string, limit?: number) => Promise<Recommendation[]>
  recordInteraction: (userId: string, agentId: string, interaction: any) => void
  updateUserProfile: (userId: string, updates: Partial<UserProfile>) => void
  explainRecommendation: (recommendation: Recommendation) => string
  trainModel: (feedbackData: any[]) => Promise<void>
  getRecommendationInsights: () => Promise<any>
}

const RecommendationEngineContext = createContext<RecommendationEngineType | undefined>(undefined)

export function useRecommendationEngine() {
  const context = useContext(RecommendationEngineContext)
  if (!context) {
    throw new Error('useRecommendationEngine must be used within a RecommendationEngineProvider')
  }
  return context
}

interface RecommendationEngineProviderProps {
  children: React.ReactNode
}

export function RecommendationEngineProvider({ children }: RecommendationEngineProviderProps) {
  usePyX()
  useAIService()
  
  const [userProfiles, setUserProfiles] = useState<Map<string, UserProfile>>(new Map())
  const [agentDatabase, setAgentDatabase] = useState<Agent[]>([])
  const [modelWeights, setModelWeights] = useState({
    userSimilarity: 0.3,
    contentSimilarity: 0.25,
    popularity: 0.2,
    quality: 0.15,
    recency: 0.1
  })

  // Initialize with mock agent data
  useEffect(() => {
    initializeAgentDatabase()
  }, [])

  const initializeAgentDatabase = () => {
    const mockAgents: Agent[] = [
      {
        id: 'text-summarizer-pro',
        name: 'Text Summarizer Pro',
        description: 'Advanced AI-powered text summarization with customizable length and style',
        category: 'Text Processing',
        tags: ['summarization', 'nlp', 'text-analysis', 'content'],
        rating: 4.8,
        downloads: 15420,
        price: 29.99,
        features: ['Multi-language support', 'Custom length', 'Style options', 'Batch processing'],
        compatibility: ['API', 'Web', 'Mobile'],
        author: 'TextAI Labs',
        lastUpdated: new Date('2024-01-15'),
        complexity: 'intermediate',
        useCase: ['content-creation', 'research', 'documentation'],
        performance: { speed: 0.9, accuracy: 0.95, reliability: 0.92 }
      },
      {
        id: 'data-analyzer-ultimate',
        name: 'Data Analyzer Ultimate',
        description: 'Comprehensive data analysis and visualization platform',
        category: 'Data Analysis',
        tags: ['analytics', 'visualization', 'statistics', 'insights'],
        rating: 4.9,
        downloads: 8934,
        price: 49.99,
        features: ['Real-time analytics', 'Custom dashboards', 'ML insights', 'Export options'],
        compatibility: ['API', 'Web', 'Desktop'],
        author: 'DataViz Inc',
        lastUpdated: new Date('2024-01-10'),
        complexity: 'advanced',
        useCase: ['business-intelligence', 'research', 'reporting'],
        performance: { speed: 0.85, accuracy: 0.93, reliability: 0.96 }
      },
      {
        id: 'content-generator-ai',
        name: 'AI Content Generator',
        description: 'Create high-quality content for blogs, social media, and marketing',
        category: 'Content Creation',
        tags: ['content', 'writing', 'marketing', 'social-media'],
        rating: 4.6,
        downloads: 23567,
        price: 0,
        features: ['Multiple formats', 'SEO optimization', 'Tone adjustment', 'Template library'],
        compatibility: ['API', 'Web', 'Mobile', 'Chrome Extension'],
        author: 'ContentAI',
        lastUpdated: new Date('2024-01-12'),
        complexity: 'beginner',
        useCase: ['marketing', 'content-creation', 'social-media'],
        performance: { speed: 0.88, accuracy: 0.87, reliability: 0.91 }
      }
    ]

    setAgentDatabase(mockAgents)
  }

  // Helper functions inside component
  const calculatePersonalizedScore = useCallback((agent: Agent, profile: UserProfile): number => {
    let score = 0
    
    // Category preference
    if (profile.preferences.categories.includes(agent.category)) {
      score += 0.3
    }
    
    // Interest alignment
    const interestMatch = agent.tags.filter(tag => profile.interests.includes(tag)).length / agent.tags.length
    score += interestMatch * 0.25
    
    // Complexity match
    const complexityMatch = agent.complexity === profile.preferences.complexity ? 0.2 : 0
    score += complexityMatch
    
    // Price preference
    const [minPrice, maxPrice] = profile.preferences.priceRange
    if (agent.price >= minPrice && agent.price <= maxPrice) {
      score += 0.15
    }
    
    // Quality score
    score += calculateQualityScore(agent) * 0.1
    
    return Math.min(score, 1.0)
  }, [])

  const calculateUserMatch = useCallback((agent: Agent, profile: UserProfile): number => {
    let match = 0
    
    // Role alignment
    if (profile.role === 'developer' && agent.category === 'Development') {
      match += 0.3
    } else if (profile.role === 'analyst' && agent.category === 'Data Analysis') {
      match += 0.3
    } else if (profile.role === 'marketer' && agent.category === 'Content Creation') {
      match += 0.3
    }
    
    // Experience level
    const experienceMap = { beginner: 1, intermediate: 2, advanced: 3 }
    const userExp = experienceMap[profile.experience as keyof typeof experienceMap] || 2
    const agentExp = experienceMap[agent.complexity]
    
    if (Math.abs(userExp - agentExp) <= 1) {
      match += 0.2
    }
    
    // Usage history
    const hasUsedSimilar = profile.usageHistory.some(usage => {
      const usedAgent = agentDatabase.find(a => a.id === usage.agentId)
      return usedAgent && usedAgent.category === agent.category
    })
    
    if (hasUsedSimilar) {
      match += 0.2
    }
    
    // Goals alignment
    const goalMatch = profile.goals.some(goal => agent.useCase.includes(goal))
    if (goalMatch) {
      match += 0.3
    }
    
    return Math.min(match, 1.0)
  }, [agentDatabase])

  const generateReasons = useCallback((agent: Agent, profile: UserProfile): string[] => {
    const reasons = []
    
    if (profile.preferences.categories.includes(agent.category)) {
      reasons.push(`Matches your interest in ${agent.category}`)
    }
    
    if (agent.complexity === profile.preferences.complexity) {
      reasons.push(`Perfect for your ${profile.preferences.complexity} skill level`)
    }
    
    if (agent.rating >= 4.5) {
      reasons.push(`Highly rated (${agent.rating}/5)`)
    }
    
    if (agent.downloads > 10000) {
      reasons.push(`Popular choice (${agent.downloads.toLocaleString()} downloads)`)
    }
    
    if (agent.price === 0) {
      reasons.push('Free to use')
    }
    
    const interestMatch = agent.tags.filter(tag => profile.interests.includes(tag))
    if (interestMatch.length > 0) {
      reasons.push(`Aligns with your interests: ${interestMatch.join(', ')}`)
    }
    
    return reasons.slice(0, 3)
  }, [])

  const getPopularCategories = useCallback((): Array<{ category: string; count: number }> => {
    const categoryCount = new Map<string, number>()
    
    agentDatabase.forEach(agent => {
      categoryCount.set(agent.category, (categoryCount.get(agent.category) || 0) + 1)
    })
    
    return Array.from(categoryCount.entries())
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count)
  }, [agentDatabase])

  const getRecommendations = useCallback(async (context?: RecommendationContext): Promise<Recommendation[]> => {
    try {
      const recommendations = []
      
      const personalizedRecs = await getPersonalizedRecommendations('current-user', 3)
      recommendations.push(...personalizedRecs)
      
      const trendingRecs = await getTrendingAgents(context?.filters.category, 2)
      recommendations.push(...trendingRecs)
      
      if (context?.searchQuery) {
        const queryRecs = await getRecommendationsForQuery(context.searchQuery, 3)
        recommendations.push(...queryRecs)
      }
      
      const uniqueRecs = Array.from(
        new Map(recommendations.map(rec => [rec.agent.id, rec])).values()
      ).sort((a, b) => b.score - a.score)
      
      return uniqueRecs.slice(0, 10)
    } catch (error) {
      console.error('Error getting recommendations:', error)
      return []
    }
  }, [])

  const getPersonalizedRecommendations = useCallback(async (userId: string, limit = 5): Promise<Recommendation[]> => {
    const profile = userProfiles.get(userId)
    if (!profile) {
      return []
    }

    const recommendations: Recommendation[] = []
    
    for (const agent of agentDatabase) {
      const score = calculatePersonalizedScore(agent, profile)
      const reasons = generateReasons(agent, profile)
      
      if (score > 0.3) {
        recommendations.push({
          agent,
          score,
          reasons,
          confidence: Math.min(score * 1.2, 1.0),
          type: 'personalized',
          metadata: {
            userMatch: calculateUserMatch(agent, profile),
            popularityScore: calculatePopularityScore(agent),
            qualityScore: calculateQualityScore(agent),
            recencyScore: calculateRecencyScore(agent)
          }
        })
      }
    }
    
    return recommendations
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
  }, [userProfiles, agentDatabase, calculatePersonalizedScore, generateReasons, calculateUserMatch])

  const getSimilarAgents = useCallback(async (agentId: string, limit = 5): Promise<Recommendation[]> => {
    const targetAgent = agentDatabase.find(agent => agent.id === agentId)
    if (!targetAgent) return []

    const recommendations: Recommendation[] = []
    
    for (const agent of agentDatabase) {
      if (agent.id === agentId) continue
      
      const similarity = calculateContentSimilarity(targetAgent, agent)
      const score = similarity * 0.8 + calculateQualityScore(agent) * 0.2
      
      if (similarity > 0.3) {
        recommendations.push({
          agent,
          score,
          reasons: [`Similar to ${targetAgent.name}`, `Same category: ${agent.category}`],
          confidence: similarity,
          type: 'similar',
          metadata: {
            userMatch: 0,
            popularityScore: calculatePopularityScore(agent),
            qualityScore: calculateQualityScore(agent),
            recencyScore: calculateRecencyScore(agent)
          }
        })
      }
    }
    
    return recommendations
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
  }, [agentDatabase])

  const getTrendingAgents = useCallback(async (category?: string, limit = 5): Promise<Recommendation[]> => {
    let filteredAgents = agentDatabase
    
    if (category) {
      filteredAgents = agentDatabase.filter(agent => agent.category === category)
    }
    
    const recommendations: Recommendation[] = filteredAgents.map(agent => {
      const trendScore = calculateTrendScore(agent)
      
      return {
        agent,
        score: trendScore,
        reasons: ['Trending now', `${agent.downloads} downloads`, `${agent.rating} rating`],
        confidence: 0.8,
        type: 'trending',
        metadata: {
          userMatch: 0,
          popularityScore: calculatePopularityScore(agent),
          qualityScore: calculateQualityScore(agent),
          recencyScore: calculateRecencyScore(agent)
        }
      }
    })
    
    return recommendations
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
  }, [agentDatabase])

  const getRecommendationsForQuery = useCallback(async (query: string, limit = 5): Promise<Recommendation[]> => {
    const lowerQuery = query.toLowerCase()
    const recommendations: Recommendation[] = []
    
    for (const agent of agentDatabase) {
      const relevance = calculateQueryRelevance(agent, lowerQuery)
      const score = relevance * 0.7 + calculateQualityScore(agent) * 0.3
      
      if (relevance > 0.2) {
        recommendations.push({
          agent,
          score,
          reasons: [`Matches "${query}"`, `Relevant to your search`],
          confidence: relevance,
          type: 'content-based',
          metadata: {
            userMatch: 0,
            popularityScore: calculatePopularityScore(agent),
            qualityScore: calculateQualityScore(agent),
            recencyScore: calculateRecencyScore(agent)
          }
        })
      }
    }
    
    return recommendations
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
  }, [agentDatabase])

  const recordInteraction = useCallback((userId: string, agentId: string) => {
    setUserProfiles(prev => {
      const newProfiles = new Map(prev)
      const profile = newProfiles.get(userId) || createDefaultProfile(userId)
      
      const existingUsage = profile.usageHistory.find(usage => usage.agentId === agentId)
      if (existingUsage) {
        existingUsage.usage += 1
        existingUsage.lastUsed = new Date()
      } else {
        profile.usageHistory.push({
          agentId,
          usage: 1,
          lastUsed: new Date()
        })
      }
      
      const agent = agentDatabase.find(a => a.id === agentId)
      if (agent) {
        if (!profile.preferences.categories.includes(agent.category)) {
          profile.preferences.categories.push(agent.category)
        }
        
        agent.tags.forEach(tag => {
          if (!profile.interests.includes(tag)) {
            profile.interests.push(tag)
          }
        })
      }
      
      newProfiles.set(userId, profile)
      return newProfiles
    })
  }, [agentDatabase])

  const updateUserProfile = useCallback((userId: string, updates: Partial<UserProfile>) => {
    setUserProfiles(prev => {
      const newProfiles = new Map(prev)
      const profile = newProfiles.get(userId) || createDefaultProfile(userId)
      
      newProfiles.set(userId, { ...profile, ...updates })
      return newProfiles
    })
  }, [])

  const explainRecommendation = useCallback((recommendation: Recommendation): string => {
    const { agent, reasons, type, metadata } = recommendation
    
    let explanation = `I recommend "${agent.name}" because:\n\n`
    
    reasons.forEach((reason, index) => {
      explanation += `${index + 1}. ${reason}\n`
    })
    
    explanation += `\nThis recommendation is based on ${type} filtering with a confidence score of ${(recommendation.confidence * 100).toFixed(1)}%.`
    
    if (metadata.userMatch > 0.7) {
      explanation += '\n\nThis agent is highly compatible with your profile and usage patterns.'
    }
    
    return explanation
  }, [])

  const trainModel = useCallback(async (feedbackData: any[]): Promise<void> => {
    let positiveInteractions = 0
    let negativeInteractions = 0
    
    feedbackData.forEach(feedback => {
      if (feedback.rating >= 4) {
        positiveInteractions++
      } else if (feedback.rating <= 2) {
        negativeInteractions++
      }
    })
    
    const totalFeedback = feedbackData.length
    if (totalFeedback > 0) {
      const satisfactionRate = positiveInteractions / totalFeedback
      
      setModelWeights(prev => ({
        ...prev,
        userSimilarity: satisfactionRate > 0.8 ? prev.userSimilarity * 1.1 : prev.userSimilarity * 0.9,
        contentSimilarity: satisfactionRate > 0.7 ? prev.contentSimilarity * 1.05 : prev.contentSimilarity * 0.95,
        popularity: satisfactionRate < 0.6 ? prev.popularity * 1.1 : prev.popularity * 0.9
      }))
    }
  }, [])

  const getRecommendationInsights = useCallback(async () => {
    return {
      totalRecommendations: agentDatabase.length,
      categoryCoverage: [...new Set(agentDatabase.map(a => a.category))].length,
      averageRating: agentDatabase.reduce((sum, agent) => sum + agent.rating, 0) / agentDatabase.length,
      popularCategories: getPopularCategories(),
      modelWeights,
      userProfiles: userProfiles.size
    }
  }, [agentDatabase, modelWeights, userProfiles, getPopularCategories])

  return (
    <RecommendationEngineContext.Provider value={{
      getRecommendations,
      getPersonalizedRecommendations,
      getSimilarAgents,
      getTrendingAgents,
      getRecommendationsForQuery,
      recordInteraction,
      updateUserProfile,
      explainRecommendation,
      trainModel,
      getRecommendationInsights
    }}>
      {children}
    </RecommendationEngineContext.Provider>
  )
}

// Helper functions (outside component - regular functions)
function calculateContentSimilarity(agent1: Agent, agent2: Agent): number {
  let similarity = 0
  
  if (agent1.category === agent2.category) {
    similarity += 0.4
  }
  
  const commonTags = agent1.tags.filter(tag => agent2.tags.includes(tag))
  const tagSimilarity = commonTags.length / Math.max(agent1.tags.length, agent2.tags.length)
  similarity += tagSimilarity * 0.3
  
  const commonUseCases = agent1.useCase.filter(useCase => agent2.useCase.includes(useCase))
  const useCaseSimilarity = commonUseCases.length / Math.max(agent1.useCase.length, agent2.useCase.length)
  similarity += useCaseSimilarity * 0.2
  
  const complexityMap = { beginner: 1, intermediate: 2, advanced: 3 }
  const complexityDiff = Math.abs(complexityMap[agent1.complexity] - complexityMap[agent2.complexity])
  similarity += (3 - complexityDiff) / 3 * 0.1
  
  return similarity
}

function calculatePopularityScore(agent: Agent): number {
  const downloadScore = Math.min(agent.downloads / 50000, 1.0)
  return downloadScore * 0.7 + (agent.rating / 5) * 0.3
}

function calculateQualityScore(agent: Agent): number {
  const { speed, accuracy, reliability } = agent.performance
  const performanceScore = (speed + accuracy + reliability) / 3
  const ratingScore = agent.rating / 5
  
  return performanceScore * 0.6 + ratingScore * 0.4
}

function calculateRecencyScore(agent: Agent): number {
  const now = new Date()
  const daysSinceUpdate = (now.getTime() - agent.lastUpdated.getTime()) / (1000 * 60 * 60 * 24)
  
  return Math.max(0, 1 - daysSinceUpdate / 30)
}

function calculateTrendScore(agent: Agent): number {
  const popularityScore = calculatePopularityScore(agent)
  const qualityScore = calculateQualityScore(agent)
  const recencyScore = calculateRecencyScore(agent)
  
  return popularityScore * 0.5 + qualityScore * 0.3 + recencyScore * 0.2
}

function calculateQueryRelevance(agent: Agent, query: string): number {
  let relevance = 0
  
  if (agent.name.toLowerCase().includes(query)) {
    relevance += 0.4
  }
  
  if (agent.description.toLowerCase().includes(query)) {
    relevance += 0.3
  }
  
  const tagMatch = agent.tags.some(tag => tag.toLowerCase().includes(query))
  if (tagMatch) {
    relevance += 0.2
  }
  
  if (agent.category.toLowerCase().includes(query)) {
    relevance += 0.1
  }
  
  return relevance
}

function createDefaultProfile(userId: string): UserProfile {
  return {
    userId,
    role: 'general',
    experience: 'intermediate',
    interests: [],
    goals: [],
    usageHistory: [],
    preferences: {
      complexity: 'intermediate',
      priceRange: [0, 100],
      categories: [],
      features: []
    }
  }
}