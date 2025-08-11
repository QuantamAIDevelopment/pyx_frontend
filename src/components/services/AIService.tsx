'use client'

import React, { createContext, useContext } from 'react'

interface AIServiceConfig {
  openaiApiKey?: string
  anthropicApiKey?: string
  preferredProvider: 'openai' | 'anthropic' | 'local'
  temperature: number
  maxTokens: number
  timeout: number
}

interface AIResponse {
  content: string
  suggestions?: string[]
  metadata?: {
    model: string
    tokensUsed: number
    responseTime: number
    confidence: number
  }
}

interface AIServiceType {
  generateResponse: (prompt: string, context?: any) => Promise<AIResponse>
  analyzeIntent: (message: string) => Promise<{ intent: string; confidence: number; entities: any[] }>
  generateSuggestions: (context: string) => Promise<string[]>
  translateText: (text: string, targetLanguage: string) => Promise<string>
  summarizeConversation: (messages: any[]) => Promise<string>
  config: AIServiceConfig
  updateConfig: (newConfig: Partial<AIServiceConfig>) => void
  isConfigured: () => boolean
  getConfigurationStatus: () => { openai: boolean; anthropic: boolean; hasAnyProvider: boolean; mode: string }
}

const AIServiceContext = createContext<AIServiceType | undefined>(undefined)

export function useAIService() {
  const context = useContext(AIServiceContext)
  if (!context) {
    throw new Error('useAIService must be used within an AIServiceProvider')
  }
  return context
}

interface AIServiceProviderProps {
  children: React.ReactNode
}

export function AIServiceProvider({ children }: AIServiceProviderProps) {
  const [config, setConfig] = React.useState<AIServiceConfig>(() => {
    // Helper function to safely access environment variables
    const getEnvVar = (key: string): string => {
      // For browser environments, environment variables are usually injected at build time
      // We'll check for common patterns used by different bundlers
      
      // Common environment variable patterns to check
      const envKeys = [
        `VITE_${key}`,           // Vite
        `REACT_APP_${key}`,      // Create React App
        `NEXT_PUBLIC_${key}`,    // Next.js
        key                      // Direct key
      ]
      
      // Check global environment object (if injected by bundler)
      if (typeof window !== 'undefined') {
        // Check window.env (custom injection)
        if ((window as any).env) {
          for (const envKey of envKeys) {
            if ((window as any).env[envKey]) {
              return (window as any).env[envKey]
            }
          }
        }
        
        // Check direct window properties (some bundlers inject this way)
        for (const envKey of envKeys) {
          if ((window as any)[envKey]) {
            return (window as any)[envKey]
          }
        }
      }
      
      return ''
    }

    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pyx-ai-config')
      return saved ? JSON.parse(saved) : {
        openaiApiKey: getEnvVar('OPENAI_API_KEY') || '',
        anthropicApiKey: getEnvVar('ANTHROPIC_API_KEY') || '',
        preferredProvider: 'local', // Default to local to avoid API errors
        temperature: 0.7,
        maxTokens: 1000,
        timeout: 30000
      }
    }
    return {
      openaiApiKey: '',
      anthropicApiKey: '',
      preferredProvider: 'local' as const,
      temperature: 0.7,
      maxTokens: 1000,
      timeout: 30000
    }
  })

  const [hasShownConfigWarning, setHasShownConfigWarning] = React.useState(false)

  const updateConfig = React.useCallback((newConfig: Partial<AIServiceConfig>) => {
    setConfig(prev => {
      const updated = { ...prev, ...newConfig }
      if (typeof window !== 'undefined') {
        localStorage.setItem('pyx-ai-config', JSON.stringify(updated))
      }
      return updated
    })
  }, [])

  const callOpenAI = async (prompt: string, context?: any): Promise<AIResponse> => {
    const startTime = Date.now()
    
    // Check if API key is available
    if (!config.openaiApiKey || config.openaiApiKey.trim() === '') {
      // Only show warning once per session to avoid spam
      if (!hasShownConfigWarning) {
        console.info('💡 PyX AI Service: Running in local mode. Configure API keys in settings for full AI capabilities.')
        setHasShownConfigWarning(true)
      }
      return fallbackResponse(prompt)
    }
    
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.openaiApiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: `You are PyX, an AI assistant for the PYX platform. You help users with AI agents, workflows, and automation. 
              
              Current context: ${context?.currentPage || 'general'}
              User profile: ${JSON.stringify(context?.userProfile || {})}
              Preferences: ${JSON.stringify(context?.preferences || {})}
              
              Provide helpful, accurate responses about:
              - AI agent creation and management
              - Workflow automation
              - API integration
              - Platform features
              - Technical support
              
              Keep responses concise but informative. Include relevant suggestions when appropriate.`
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: config.temperature,
          max_tokens: config.maxTokens,
          stream: false
        })
      })

      if (!response.ok) {
        if (response.status === 401) {
          console.warn('OpenAI API: Invalid API key')
        } else if (response.status === 429) {
          console.warn('OpenAI API: Rate limit exceeded')
        } else {
          console.warn(`OpenAI API error: ${response.status} ${response.statusText}`)
        }
        return fallbackResponse(prompt)
      }

      const data = await response.json()
      const responseTime = Date.now() - startTime

      return {
        content: data.choices[0].message.content,
        suggestions: extractSuggestions(data.choices[0].message.content),
        metadata: {
          model: data.model,
          tokensUsed: data.usage.total_tokens,
          responseTime,
          confidence: 0.9
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        console.debug('OpenAI API error:', error.message)
      } else {
        console.debug('OpenAI API error:', error)
      }
      return fallbackResponse(prompt)
    }
  }

  const callAnthropic = async (prompt: string, context?: any): Promise<AIResponse> => {
    const startTime = Date.now()
    
    // Check if API key is available
    if (!config.anthropicApiKey || config.anthropicApiKey.trim() === '') {
      if (!hasShownConfigWarning) {
        console.info('💡 PyX AI Service: Running in local mode. Configure API keys in settings for full AI capabilities.')
        setHasShownConfigWarning(true)
      }
      return fallbackResponse(prompt)
    }
    
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': config.anthropicApiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-sonnet-20240229',
          max_tokens: config.maxTokens,
          temperature: config.temperature,
          system: `You are PyX, an AI assistant for the PYX platform. You help users with AI agents, workflows, and automation. 
          
          Current context: ${context?.currentPage || 'general'}
          User profile: ${JSON.stringify(context?.userProfile || {})}
          Preferences: ${JSON.stringify(context?.preferences || {})}
          
          Provide helpful, accurate responses about AI agent creation, workflow automation, API integration, and platform features.`,
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ]
        })
      })

      if (!response.ok) {
        if (response.status === 401) {
          console.warn('Anthropic API: Invalid API key')
        } else if (response.status === 429) {
          console.warn('Anthropic API: Rate limit exceeded')
        } else {
          console.warn(`Anthropic API error: ${response.status} ${response.statusText}`)
        }
        return fallbackResponse(prompt)
      }

      const data = await response.json()
      const responseTime = Date.now() - startTime

      return {
        content: data.content[0].text,
        suggestions: extractSuggestions(data.content[0].text),
        metadata: {
          model: data.model,
          tokensUsed: data.usage.input_tokens + data.usage.output_tokens,
          responseTime,
          confidence: 0.9
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        console.debug('Anthropic API error:', error.message)
      } else {
        console.debug('Anthropic API error:', error)
      }
      return fallbackResponse(prompt)
    }
  }

  const generateResponse = async (prompt: string, context?: any): Promise<AIResponse> => {
    // Add conversation history to context for better responses
    const enhancedPrompt = context?.conversationHistory ? 
      `Previous conversation context: ${context.conversationHistory.slice(-3).map((msg: any) => `${msg.type}: ${msg.content}`).join('\n')}\n\nCurrent message: ${prompt}` : 
      prompt

    switch (config.preferredProvider) {
      case 'openai':
        return callOpenAI(enhancedPrompt, context)
      case 'anthropic':
        return callAnthropic(enhancedPrompt, context)
      case 'local':
        return localResponse(enhancedPrompt, context)
      default:
        return fallbackResponse(enhancedPrompt)
    }
  }

  const analyzeIntent = async (message: string): Promise<{ intent: string; confidence: number; entities: any[] }> => {
    // Simple local intent analysis to avoid API calls for this
    const lowerMessage = message.toLowerCase()
    
    const intents = [
      { name: 'question', keywords: ['how', 'what', 'why', 'when', 'where', 'explain'], weight: 1 },
      { name: 'request_help', keywords: ['help', 'assist', 'support', 'guide'], weight: 1.2 },
      { name: 'create_agent', keywords: ['create', 'build', 'make', 'new agent'], weight: 1.1 },
      { name: 'find_agent', keywords: ['find', 'search', 'recommend', 'suggest'], weight: 1.1 },
      { name: 'technical_support', keywords: ['error', 'bug', 'problem', 'debug', 'fix'], weight: 1.3 },
      { name: 'tutorial_request', keywords: ['tutorial', 'learn', 'teach', 'show me'], weight: 1.2 },
      { name: 'api_help', keywords: ['api', 'endpoint', 'integrate', 'code'], weight: 1.1 }
    ]
    
    let bestMatch = { intent: 'general', confidence: 0.5 }
    
    for (const intent of intents) {
      let score = 0
      for (const keyword of intent.keywords) {
        if (lowerMessage.includes(keyword)) {
          score += intent.weight
        }
      }
      const confidence = Math.min(score / intent.keywords.length, 1)
      if (confidence > bestMatch.confidence) {
        bestMatch = { intent: intent.name, confidence }
      }
    }
    
    return { ...bestMatch, entities: [] }
  }

  const generateSuggestions = async (context: string): Promise<string[]> => {
    // Generate contextual suggestions based on the current page and conversation
    const baseSuggestions: Record<string, string[]> = {
      home: [
        "Show me popular agents",
        "How do I get started?",
        "What can AI agents do?",
        "Explain PYX marketplace"
      ],
      marketplace: [
        "Recommend an agent for my task",
        "What's trending?",
        "Filter by category",
        "Compare similar agents"
      ],
      'create-agent': [
        "Help me write a prompt",
        "Show agent templates",
        "Best practices for agents",
        "Test my agent idea"
      ],
      api: [
        "Show API examples",
        "Test an endpoint",
        "Explain authentication",
        "Rate limiting info"
      ]
    }

    return baseSuggestions[context] || [
      "Tell me more",
      "Show examples",
      "Get help",
      "Try something else"
    ]
  }

  const translateText = async (text: string, targetLanguage: string): Promise<string> => {
    // For translation, we'll use a simple approach or fallback
    // In a real implementation, you might use a translation service
    if (config.preferredProvider !== 'local' && isConfigured()) {
      try {
        const response = await generateResponse(
          `Translate this text to ${targetLanguage}. Only return the translated text, nothing else:\n\n${text}`,
          { analysisMode: true }
        )
        return response.content
      } catch (error) {
        console.debug('Translation error:', error)
      }
    }
    
    // Fallback: return original text with a note
    return `[Translation to ${targetLanguage} not available in local mode] ${text}`
  }

  const summarizeConversation = async (messages: any[]): Promise<string> => {
    if (messages.length === 0) {
      return 'No conversation to summarize'
    }

    // Simple local summarization
    const messageCount = messages.length
    const topics = new Set<string>()
    
    messages.forEach(msg => {
      const content = msg.content.toLowerCase()
      if (content.includes('agent')) topics.add('agents')
      if (content.includes('api')) topics.add('API')
      if (content.includes('workflow')) topics.add('workflows')
      if (content.includes('help')) topics.add('assistance')
    })

    const topicList = Array.from(topics).join(', ')
    return `Conversation with ${messageCount} messages covering: ${topicList || 'general discussion'}`
  }

  const isConfigured = (): boolean => {
    return !!(config.openaiApiKey?.trim() || config.anthropicApiKey?.trim())
  }

  const getConfigurationStatus = () => {
    const openai = !!(config.openaiApiKey?.trim())
    const anthropic = !!(config.anthropicApiKey?.trim())
    const hasAnyProvider = openai || anthropic
    
    let mode = 'Local Mode'
    if (hasAnyProvider) {
      if (config.preferredProvider === 'openai' && openai) {
        mode = 'OpenAI'
      } else if (config.preferredProvider === 'anthropic' && anthropic) {
        mode = 'Anthropic'
      } else {
        mode = 'Local Mode (API key configured but not selected)'
      }
    }
    
    return {
      openai,
      anthropic,
      hasAnyProvider,
      mode
    }
  }

  return (
    <AIServiceContext.Provider value={{
      generateResponse,
      analyzeIntent,
      generateSuggestions,
      translateText,
      summarizeConversation,
      config,
      updateConfig,
      isConfigured,
      getConfigurationStatus
    }}>
      {children}
    </AIServiceContext.Provider>
  )
}

// Helper functions
function extractSuggestions(content: string): string[] {
  // Extract suggestions from AI response or generate contextual ones
  const suggestions = []
  
  if (content.includes('create') || content.includes('build')) {
    suggestions.push('Help me create an agent')
  }
  if (content.includes('API') || content.includes('endpoint')) {
    suggestions.push('Show API examples')
  }
  if (content.includes('example') || content.includes('demo')) {
    suggestions.push('See more examples')
  }
  if (content.includes('tutorial') || content.includes('learn')) {
    suggestions.push('Start tutorial')
  }
  
  // Add default suggestions if none found
  if (suggestions.length === 0) {
    suggestions.push('Tell me more', 'Show examples', 'Get help', 'Try something else')
  }
  
  return suggestions.slice(0, 4)
}

function fallbackResponse(prompt: string): AIResponse {
  const lowerPrompt = prompt.toLowerCase()
  
  // Provide contextual responses even without AI services
  let content = "I'm currently running in local mode to ensure privacy and reliability. I can still provide helpful information about the PYX platform based on your questions."
  let suggestions = ['Platform overview', 'Agent creation', 'API docs', 'Get support']

  // Basic keyword matching for better fallback responses
  if (lowerPrompt.includes('create') || lowerPrompt.includes('build')) {
    content = "🤖 **Creating AI Agents on PYX**\n\n**Quick Start Guide:**\n1. **Define Purpose** - What should your agent do?\n2. **Write Clear Prompts** - Give specific instructions\n3. **Configure I/O** - Set up inputs and outputs\n4. **Test Thoroughly** - Validate before deployment\n5. **Deploy & Monitor** - Track performance\n\n💡 *Tip: Start with simple tasks and gradually add complexity.*"
    suggestions = ['Agent templates', 'Prompt writing guide', 'Testing checklist', 'Deployment tips']
  } else if (lowerPrompt.includes('api') || lowerPrompt.includes('integrate')) {
    content = "🔗 **PYX API Integration**\n\n**Authentication:**\n```\nAuthorization: Bearer YOUR_API_KEY\n```\n\n**Base URL:** `https://api.PYX.com/v1`\n\n**Key Endpoints:**\n• `/agents` - List and manage agents\n• `/execute` - Run agent workflows\n• `/status` - Check execution status\n\n**Rate Limits:** Varies by subscription plan"
    suggestions = ['Authentication guide', 'Endpoint examples', 'Rate limits', 'SDK options']
  } else if (lowerPrompt.includes('help') || lowerPrompt.includes('how')) {
    content = "🚀 **How Can I Help You?**\n\n**Popular Topics:**\n🤖 **Agent Development** - Create, test, and optimize\n🔗 **API Integration** - Connect with your apps\n📊 **Platform Features** - Marketplace, workflows, analytics\n🛠️ **Troubleshooting** - Solve common issues\n📚 **Learning** - Tutorials and best practices\n\nWhat would you like to explore?"
    suggestions = ['Create my first agent', 'API integration', 'Browse marketplace', 'View tutorials']
  } else if (lowerPrompt.includes('error') || lowerPrompt.includes('problem')) {
    content = "🔧 **Troubleshooting Help**\n\n**Common Issues:**\n• **Agent not responding** - Check prompt clarity\n• **API errors** - Verify authentication\n• **Performance issues** - Review rate limits\n• **Integration problems** - Check endpoints\n\n**Need specific help?** Describe your issue and I'll provide targeted guidance."
    suggestions = ['Check agent status', 'API troubleshooting', 'Performance tips', 'Contact support']
  }

  return {
    content,
    suggestions,
    metadata: {
      model: 'local-fallback',
      tokensUsed: 0,
      responseTime: 50,
      confidence: 0.8
    }
  }
}

function localResponse(prompt: string, context?: any): AIResponse {
  // Enhanced local response with better context awareness
  const lowerPrompt = prompt.toLowerCase()
  const currentPage = context?.currentPage || 'general'
  
  if (lowerPrompt.includes('create') || lowerPrompt.includes('build')) {
    return {
      content: `🚀 **Ready to Create an AI Agent?**\n\nI'll help you build an effective agent step by step:\n\n**1. Agent Purpose**\nWhat specific task should your agent handle?\n\n**2. Smart Prompts**\nClear, specific instructions work best\n\n**3. Input/Output Setup**\nDefine what goes in and what comes out\n\n**4. Testing Phase**\nValidate with real examples\n\nShall we start with defining your agent's purpose?`,
      suggestions: ['Define agent purpose', 'Browse templates', 'Prompt writing tips', 'See examples'],
      metadata: {
        model: 'local-enhanced',
        tokensUsed: 0,
        responseTime: 100,
        confidence: 0.85
      }
    }
  }
  
  if (currentPage === 'marketplace') {
    return {
      content: `🛍️ **Exploring the PYX Marketplace**\n\nDiscover powerful AI agents created by our community:\n\n• **Text Processing** - Summarization, translation, analysis\n• **Data Analysis** - Insights, visualization, reporting\n• **Content Creation** - Writing, design, multimedia\n• **Automation** - Workflows, integrations, tasks\n\nWhat type of agent are you looking for?`,
      suggestions: ['Browse by category', 'View trending agents', 'Filter by rating', 'See new releases'],
      metadata: {
        model: 'local-contextual',
        tokensUsed: 0,
        responseTime: 75,
        confidence: 0.8
      }
    }
  }
  
  return {
    content: `👋 **Hi! I'm PyX, your AI assistant for PYX.**\n\nI'm here to help you navigate our platform and make the most of AI agents. Whether you want to create, discover, or integrate agents, I've got you covered!\n\n✨ *Currently running in local mode for optimal privacy and performance.*`,
    suggestions: ['Create an agent', 'Browse marketplace', 'API documentation', 'Platform tour'],
    metadata: {
      model: 'local-general',
      tokensUsed: 0,
      responseTime: 50,
      confidence: 0.75
    }
  }
}