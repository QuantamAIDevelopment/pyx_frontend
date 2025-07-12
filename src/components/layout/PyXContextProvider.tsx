'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

interface PyXMessage {
  id: string
  type: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  suggestions?: string[]
  metadata?: {
    files?: string[]
    codeBlocks?: { language: string; code: string }[]
    quickActions?: string[]
    conversationMode?: 'chat' | 'tutorial' | 'debug'
    stepNumber?: number
  }
}

interface ConversationHistory {
  sessionId: string
  messages: PyXMessage[]
  startTime: Date
  endTime?: Date
  context: string
  tags: string[]
}

interface PyXContextType {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  messages: PyXMessage[]
  addMessage: (message: Omit<PyXMessage, 'id' | 'timestamp'>) => void
  currentPage: string
  setCurrentPage: (page: string) => void
  isTyping: boolean
  setIsTyping: (typing: boolean) => void
  clearChat: () => void
  getContextualGreeting: () => PyXMessage
  getContextualSuggestions: () => string[]
  
  // Enhanced features
  conversationHistory: ConversationHistory[]
  saveConversation: () => void
  loadConversation: (sessionId: string) => void
  searchConversations: (query: string) => ConversationHistory[]
  
  // User preferences
  preferences: {
    theme: 'light' | 'dark' | 'auto'
    language: string
    responseStyle: 'concise' | 'detailed' | 'technical'
    showCodeExamples: boolean
    enableTutorials: boolean
  }
  updatePreferences: (prefs: Partial<PyXContextType['preferences']>) => void
  
  // Advanced context
  userProfile: {
    role?: string
    experience?: string
    interests?: string[]
    goals?: string[]
  }
  updateUserProfile: (profile: Partial<PyXContextType['userProfile']>) => void
  
  // Analytics
  sessionStats: {
    messagesCount: number
    sessionDuration: number
    topicsDiscussed: string[]
    satisfaction?: number
  }
  
  // AI capabilities
  generateResponse: (input: string, context?: any) => Promise<{ content: string; suggestions?: string[] }>
  analyzeUserIntent: (message: string) => { intent: string; confidence: number; entities: any[] }
}

const PyXContext = createContext<PyXContextType | undefined>(undefined)

export function usePyX() {
  const context = useContext(PyXContext)
  if (!context) {
    throw new Error('usePyX must be used within a PyXContextProvider')
  }
  return context
}

interface PyXContextProviderProps {
  children: React.ReactNode
}

export function PyXContextProvider({ children }: PyXContextProviderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<PyXMessage[]>([])
  const [currentPage, setCurrentPage] = useState('home')
  const [isTyping, setIsTyping] = useState(false)
  const [conversationHistory, setConversationHistory] = useState<ConversationHistory[]>([])
  const [sessionStartTime] = useState(new Date())
  
  // User preferences with localStorage persistence
  const [preferences, setPreferences] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pyx-preferences')
      return saved ? JSON.parse(saved) : {
        theme: 'auto',
        language: 'en',
        responseStyle: 'detailed',
        showCodeExamples: true,
        enableTutorials: true
      }
    }
    return {
      theme: 'auto' as const,
      language: 'en',
      responseStyle: 'detailed' as const,
      showCodeExamples: true,
      enableTutorials: true
    }
  })

  // User profile with localStorage persistence
  const [userProfile, setUserProfile] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pyx-user-profile')
      return saved ? JSON.parse(saved) : {}
    }
    return {}
  })

  // Session statistics
  const [sessionStats, setSessionStats] = useState({
    messagesCount: 0,
    sessionDuration: 0,
    topicsDiscussed: [] as string[],
    satisfaction: undefined as number | undefined
  })

  // Persist preferences to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('pyx-preferences', JSON.stringify(preferences))
    }
  }, [preferences])

  // Persist user profile to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('pyx-user-profile', JSON.stringify(userProfile))
    }
  }, [userProfile])

  // Load conversation history from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pyx-conversation-history')
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          setConversationHistory(parsed.map((conv: any) => ({
            ...conv,
            startTime: new Date(conv.startTime),
            endTime: conv.endTime ? new Date(conv.endTime) : undefined,
            messages: conv.messages.map((msg: any) => ({
              ...msg,
              timestamp: new Date(msg.timestamp)
            }))
          })))
        } catch (error) {
          console.error('Failed to load conversation history:', error)
        }
      }
    }
  }, [])

  // Update session stats
  useEffect(() => {
    setSessionStats(prev => ({
      ...prev,
      messagesCount: messages.length,
      sessionDuration: Date.now() - sessionStartTime.getTime()
    }))
  }, [messages, sessionStartTime])

  const addMessage = useCallback((message: Omit<PyXMessage, 'id' | 'timestamp'>) => {
    const newMessage: PyXMessage = {
      ...message,
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, newMessage])

    // Extract topics for analytics
    if (message.type === 'user') {
      const topics = extractTopics(message.content)
      setSessionStats(prev => ({
        ...prev,
        topicsDiscussed: [...new Set([...prev.topicsDiscussed, ...topics])]
      }))
    }
  }, [])

  const clearChat = useCallback(() => {
    if (messages.length > 0) {
      saveConversation()
    }
    setMessages([])
  }, [messages])

  const saveConversation = useCallback(() => {
    if (messages.length === 0) return

    const conversation: ConversationHistory = {
      sessionId: `session-${Date.now()}`,
      messages: [...messages],
      startTime: sessionStartTime,
      endTime: new Date(),
      context: currentPage,
      tags: sessionStats.topicsDiscussed
    }

    const newHistory = [conversation, ...conversationHistory.slice(0, 49)] // Keep last 50 conversations
    setConversationHistory(newHistory)

    // Persist to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('pyx-conversation-history', JSON.stringify(newHistory))
    }
  }, [messages, sessionStartTime, currentPage, sessionStats.topicsDiscussed, conversationHistory])

  const loadConversation = useCallback((sessionId: string) => {
    const conversation = conversationHistory.find(conv => conv.sessionId === sessionId)
    if (conversation) {
      setMessages(conversation.messages)
    }
  }, [conversationHistory])

  const searchConversations = useCallback((query: string): ConversationHistory[] => {
    const lowerQuery = query.toLowerCase()
    return conversationHistory.filter(conv => 
      conv.messages.some(msg => 
        msg.content.toLowerCase().includes(lowerQuery)
      ) || 
      conv.tags.some(tag => 
        tag.toLowerCase().includes(lowerQuery)
      )
    )
  }, [conversationHistory])

  const updatePreferences = useCallback((prefs: Partial<PyXContextType['preferences']>) => {
    setPreferences((prev: typeof preferences) => ({ ...prev, ...prefs }))
  }, [])

  const updateUserProfile = useCallback((profile: Partial<PyXContextType['userProfile']>) => {
    setUserProfile((prev: typeof userProfile) => ({ ...prev, ...profile }))
  }, [])

  // Advanced AI response generation
  const generateResponse = useCallback(async (input: string, context?: any): Promise<{ content: string; suggestions?: string[] }> => {
    // This would integrate with actual AI service in production
    // For now, return enhanced mock responses based on context
    
    const userIntent = analyzeUserIntent(input)
    // const responseStyle = preferences.responseStyle
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1500))
    
    return generateContextualResponse(input, {
      intent: userIntent,
      currentPage,
      userProfile,
      preferences,
      sessionStats,
       responseStyle: preferences.responseStyle ,
      ...context
    })
  }, [currentPage, userProfile, preferences, sessionStats])

  // Intent analysis
  const analyzeUserIntent = useCallback((message: string) => {
    const lowerMessage = message.toLowerCase()
    
    // Simple intent classification (would use ML model in production)
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
    
    // Extract entities (simplified)
    const entities = extractEntities(message)
    
    return { ...bestMatch, entities }
  }, [])

  const getContextualGreeting = useCallback((): PyXMessage => {
    const greetings: Record<string, string> = {
      home: `Welcome to PyX! I'm your AI workflow guide. ${userProfile.role ? `I see you're ${userProfile.role.includes('develop') ? 'a developer' : userProfile.role.includes('market') ? 'in marketing' : 'working'} ` : ''}I can help you discover agents, understand how they work, and build your own. How can I assist you today?`,
      marketplace: `Hi! I'm PyX. Looking for the perfect AI agent? ${userProfile.experience ? `Based on your ${userProfile.experience} experience level, ` : ''}I can recommend agents based on your specific tasks or help you understand what each agent does.`,
      'agent-detail': `Hey there! I'm PyX. Need help understanding this agent? I can explain how it works, show you examples, or guide you through using it${preferences.showCodeExamples ? ' with code samples' : ''}.`,
      'create-agent': `Hello! I'm PyX, here to help you create amazing AI agents. ${preferences.enableTutorials ? 'I can start with a tutorial, ' : ''}I can suggest prompts, help with configuration, or show you similar existing agents.`,
      'agent-builder': `Hi! I'm PyX. Building an agent? I can help with node connections, trigger setup, conditional logic, or any workflow questions you have.`,
      api: `Welcome! I'm PyX. Need help with our API? I can explain endpoints, show request/response formats${preferences.showCodeExamples ? ', provide code examples,' : ''} or help you test API calls.`,
      dashboard: `Hi there! I'm PyX. I can help you understand your agent usage stats, explain any alerts, or suggest performance improvements based on your current metrics.`,
      'flow-builder': `Hello! I'm PyX. Creating workflows? I can help you connect agents logically, suggest sample workflows, or troubleshoot connections.`,
      upload: `Hi! I'm PyX. Uploading an agent? I can guide you through the upload process, explain required fields, or help with packaging.`,
      'developer-mode': `Hey! I'm PyX. Working in developer mode? I can provide code snippets, explain configurations, or help with API schemas${userProfile.experience === 'advanced' ? ' with advanced examples' : ''}.`,
      default: `Hi, I'm PyX, your AI workflow guide! ${conversationHistory.length > 0 ? "Welcome back! " : ""}I'm here to help you navigate PyX, understand agents, and build amazing workflows. What can I help you with?`
    }

    return {
      id: 'greeting',
      type: 'assistant',
      content: greetings[currentPage] || greetings.default,
      timestamp: new Date(),
      suggestions: getContextualSuggestions(),
      metadata: {
        conversationMode: 'chat',
        quickActions: ['tutorial', 'examples', 'help']
      }
    }
  }, [currentPage, userProfile, preferences, conversationHistory.length])

  const getContextualSuggestions = useCallback((): string[] => {
    const baseSuggestions: Record<string, string[]> = {
      home: [
        "Show me popular agents",
        "How do I get started?",
        "What can AI agents do?",
        "Explain PyX marketplace"
      ],
      marketplace: [
        "Recommend an agent for my task",
        "What's trending?",
        "Filter by category",
        "Compare similar agents"
      ],
      'agent-detail': [
        "How does this agent work?",
        "Show me examples",
        "How do I use this?",
        "Find similar agents"
      ],
      'create-agent': [
        "Help me write a prompt",
        "Show agent templates",
        "Best practices for agents",
        "Test my agent idea"
      ],
      'agent-builder': [
        "Connect these nodes",
        "Explain triggers",
        "Help with conditions",
        "Debug my workflow"
      ],
      api: [
        "Show API examples",
        "Test an endpoint",
        "Explain authentication",
        "Rate limiting info"
      ],
      dashboard: [
        "Explain my stats",
        "Why is performance low?",
        "Optimize my agents",
        "View usage trends"
      ],
      'flow-builder': [
        "Create a workflow",
        "Connect multiple agents",
        "Sample workflows",
        "Fix broken connections"
      ],
      upload: [
        "Upload requirements",
        "Package my agent",
        "Required metadata",
        "Publishing guidelines"
      ],
      'developer-mode': [
        "Node configuration help",
        "Code examples",
        "API schema docs",
        "Version management"
      ],
      default: [
        "How does PyX work?",
        "Find an agent",
        "Create my first agent",
        "Get API access"
      ]
    }

    // Personalize suggestions based on user profile
    let suggestions = baseSuggestions[currentPage] || baseSuggestions.default

    if (userProfile.role === 'developer') {
      suggestions = suggestions.map(s => 
        s.includes('example') ? 'Show code examples' : s
      )
    }

    if (preferences.enableTutorials && !suggestions.includes('Start tutorial')) {
      suggestions = ['Start tutorial', ...suggestions.slice(0, 3)]
    }

    return suggestions
  }, [currentPage, userProfile, preferences])

  // Initialize with greeting when chat opens for the first time
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting = getContextualGreeting()
      setMessages([greeting])
    }
  }, [isOpen, currentPage, getContextualGreeting])

  // Update greeting when page changes (if chat is open and only has greeting)
  useEffect(() => {
    if (isOpen && messages.length === 1 && messages[0].id === 'greeting') {
      const newGreeting = getContextualGreeting()
      setMessages([newGreeting])
    }
  }, [currentPage, getContextualGreeting])

  return (
    <PyXContext.Provider value={{
      isOpen,
      setIsOpen,
      messages,
      addMessage,
      currentPage,
      setCurrentPage,
      isTyping,
      setIsTyping,
      clearChat,
      getContextualGreeting,
      getContextualSuggestions,
      conversationHistory,
      saveConversation,
      loadConversation,
      searchConversations,
      preferences,
      updatePreferences,
      userProfile,
      updateUserProfile,
      sessionStats,
      generateResponse,
      analyzeUserIntent

    }}>
      {children}
    </PyXContext.Provider>
  )
}

// Helper functions
function extractTopics(message: string): string[] {
  const keywords = [
    'agent', 'api', 'workflow', 'automation', 'integration', 'data',
    'analytics', 'dashboard', 'marketplace', 'tutorial', 'help',
    'debug', 'error', 'performance', 'optimization'
  ]
  
  const lowerMessage = message.toLowerCase()
  return keywords.filter(keyword => lowerMessage.includes(keyword))
}

function extractEntities(message: string): any[] {
  // Simple entity extraction (would use NLP library in production)
  const entities = []
  
  // Extract file types
  const fileTypeRegex = /\.(json|csv|txt|xml|yaml|py|js|ts|md)/gi
  const fileTypes = message.match(fileTypeRegex)
  if (fileTypes) {
    entities.push({ type: 'file_type', values: fileTypes })
  }
  
  // Extract numbers
  const numberRegex = /\b\d+\b/g
  const numbers = message.match(numberRegex)
  if (numbers) {
    entities.push({ type: 'number', values: numbers })
  }
  
  // Extract URLs
  const urlRegex = /https?:\/\/[^\s]+/g
  const urls = message.match(urlRegex)
  if (urls) {
    entities.push({ type: 'url', values: urls })
  }
  
  return entities
}

function generateContextualResponse(
  _input: string, 
  context: any
): { content: string; suggestions?: string[] } {
  // This would be replaced with actual AI service integration
  // For now, return enhanced mock response based on context
  
  
  const { intent, currentPage, userProfile } = context
  
  if (intent.intent === 'tutorial_request') {
    return {
      content: `🎓 **Personalized Tutorial Starting...**\n\nBased on your ${userProfile.experience || 'current'} experience level, I'll guide you through ${currentPage === 'create-agent' ? 'creating your first agent' : 'using this feature'} step by step.\n\n**What we'll cover:**\n• Understanding the basics\n• Hands-on practice\n• Best practices\n• Common pitfalls to avoid\n\nReady to begin?`,
      suggestions: ['Start now', 'Show overview', 'Skip to advanced', 'Different topic']
    }
  }
  
  return {
    content: "I understand you're looking for help. Let me provide you with detailed assistance based on your needs.",
    suggestions: ['More details', 'Show examples', 'Get help', 'Try tutorial']
  }
}