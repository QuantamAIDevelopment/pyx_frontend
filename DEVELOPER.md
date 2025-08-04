# QAID - AI Agents Marketplace - Developer Guide

## 🏗️ Project Overview

QAID is a comprehensive AI agents marketplace built with React, TypeScript, and Vite. The platform features an embedded smart assistant (PyX) that provides context-aware help across the entire application. The project combines a modern web application with advanced AI capabilities, offering both marketplace functionality and intelligent user assistance.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd "PyX Main"

# Install dependencies
npm install

# Copy environment configuration
cp .env.example .env

# Start development server
npm run dev
```

### Available Scripts
```bash
npm run dev      # Start development server (Vite)
npm run build    # Build for production (TypeScript + Vite)
npm run preview  # Preview production build
npm run lint     # Run ESLint
npm start        # Serve production build
```

## 🏛️ Architecture Overview

### Tech Stack
- **Frontend**: React 18.3.1 + TypeScript
- **Build Tool**: Vite 4.5.0
- **Styling**: Tailwind CSS + Radix UI Components
- **Routing**: React Router DOM 6.20.1
- **State Management**: React Context API
- **Icons**: Lucide React + React Icons
- **Animations**: Framer Motion
- **Charts**: Recharts
- **HTTP Client**: Axios

### Project Structure
```
src/
├── components/
│   ├── agents/           # AI agent components
│   ├── apiservices/      # API integration layer
│   ├── common/           # Shared UI components
│   ├── figma/            # Figma integration components
│   ├── layout/           # Layout and navigation
│   ├── pages/            # Page components
│   ├── services/         # Core services (AI, Voice, I18n)
│   ├── styles/           # Global styles
│   └── utils/            # Utility functions
├── workflows/            # Pre-built AI workflow components
├── utils/                # Shared utilities
├── assets/               # Static assets
└── main.tsx             # Application entry point
```

## 🤖 PyX AI Assistant Architecture

### Core Components

#### 1. PyXContextProvider (`src/components/layout/PyXContextProvider.tsx`)
The central state management system for the PyX assistant:

```typescript
interface PyXContextType {
  // Chat Management
  isOpen: boolean
  messages: PyXMessage[]
  addMessage: (message: Omit<PyXMessage, 'id' | 'timestamp'>) => void
  clearChat: () => void
  
  // Context Awareness
  currentPage: string
  setCurrentPage: (page: string) => void
  getContextualGreeting: () => PyXMessage
  getContextualSuggestions: () => string[]
  
  // Conversation History
  conversationHistory: ConversationHistory[]
  saveConversation: () => void
  loadConversation: (sessionId: string) => void
  searchConversations: (query: string) => ConversationHistory[]
  
  // User Preferences
  preferences: {
    theme: 'light' | 'dark' | 'auto'
    language: string
    responseStyle: 'concise' | 'detailed' | 'technical'
    showCodeExamples: boolean
    enableTutorials: boolean
  }
  
  // AI Capabilities
  generateResponse: (input: string, context?: any) => Promise<AIResponse>
  analyzeUserIntent: (message: string) => { intent: string; confidence: number }
}
```

#### 2. AIService (`src/components/services/AIService.tsx`)
Handles AI provider integration with fallback mechanisms:

```typescript
interface AIServiceConfig {
  openaiApiKey?: string
  anthropicApiKey?: string
  preferredProvider: 'openai' | 'anthropic' | 'local'
  temperature: number
  maxTokens: number
  timeout: number
}
```

**Features:**
- Multi-provider support (OpenAI, Anthropic, Local fallback)
- Intelligent provider switching
- Response caching and optimization
- Error handling and retry logic

#### 3. VoiceService (`src/components/services/VoiceService.tsx`)
Speech recognition and synthesis capabilities:
- Web Speech API integration
- Continuous listening mode
- Audio level monitoring
- Multi-language voice support

#### 4. I18nService (`src/components/services/I18nService.tsx`)
Internationalization and localization:
- 15+ supported languages
- RTL text support
- Browser language detection
- Real-time interface translation

#### 5. RecommendationEngine (`src/components/services/RecommendationEngine.tsx`)
ML-based recommendation system:
- User behavior analysis
- Content-based filtering
- Collaborative filtering
- Real-time recommendation explanations

## 🎯 Key Features Implementation

### 1. Context-Aware Responses
PyX adapts its responses based on the current page:

```typescript
const getContextualGreeting = (): PyXMessage => {
  const greetings: Record<string, string> = {
    home: "Welcome to PyX! I'm your AI workflow guide...",
    marketplace: "Hi! Looking for the perfect AI agent?...",
    'agent-detail': "Need help understanding this agent?...",
    'create-agent': "Hello! Ready to create amazing AI agents?...",
    // ... more context-specific greetings
  }
  return greetings[currentPage] || greetings.default
}
```

### 2. Smart Intent Analysis
```typescript
const analyzeUserIntent = (message: string) => {
  const intents = [
    { name: 'question', keywords: ['how', 'what', 'why'], weight: 1 },
    { name: 'request_help', keywords: ['help', 'assist', 'support'], weight: 1.2 },
    { name: 'create_agent', keywords: ['create', 'build', 'make'], weight: 1.1 },
    { name: 'technical_support', keywords: ['error', 'bug', 'debug'], weight: 1.3 }
  ]
  // Intent classification logic...
}
```

### 3. Conversation Persistence
- Automatic conversation saving to localStorage
- Session management with metadata
- Conversation search and retrieval
- Analytics and insights tracking

## 🔧 Component Architecture

### Page Components (`src/components/pages/`)
Each page component follows a consistent pattern:

```typescript
export function PageComponent() {
  const { setCurrentPage } = usePyX()
  
  useEffect(() => {
    setCurrentPage('page-identifier')
  }, [setCurrentPage])
  
  // Component logic...
}
```

### Agent Workflows (`src/workflows/`)
Pre-built AI workflow components that integrate with external APIs:

```typescript
// Example: AICustomerSupport.tsx
const handleSend = async () => {
  const response = await fetch('webhook-endpoint', {
    method: 'POST',
    body: formData,
  })
  // Handle response...
}
```

### UI Components (`src/components/common/ui/`)
Radix UI-based component library with Tailwind CSS styling:
- Consistent design system
- Accessibility-first approach
- Dark/light theme support
- Responsive design patterns

## 🌐 API Integration

### External Webhooks
The platform integrates with external AI services via webhooks:

```typescript
// Example webhook integration
const WEBHOOK_BASE = 'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/'

const callWorkflow = async (workflowName: string, data: FormData) => {
  const response = await fetch(`${WEBHOOK_BASE}${workflowName}`, {
    method: 'POST',
    body: data,
  })
  return response.json()
}
```

### AI Provider Integration
```typescript
// OpenAI Integration
const generateOpenAIResponse = async (prompt: string) => {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: config.temperature,
      max_tokens: config.maxTokens,
    }),
  })
}
```

## 🎨 Styling System

### Tailwind Configuration
```javascript
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Custom color palette
      },
      animation: {
        // Custom animations
      }
    }
  },
  plugins: [
    // Radix UI plugin
    // Custom plugins
  ]
}
```

### Global Styles (`src/components/styles/globals.css`)
- CSS custom properties for theming
- Responsive design utilities
- Animation definitions
- Component-specific styles

## 🔒 Security & Environment

### Environment Variables
```bash
# AI Service Configuration
VITE_OPENAI_API_KEY=your_openai_api_key
VITE_ANTHROPIC_API_KEY=your_anthropic_api_key
VITE_DEFAULT_AI_PROVIDER=local

# Debug Configuration
VITE_DEBUG_MODE=false
```

### Security Best Practices
- API keys stored in environment variables
- Client-side encryption for sensitive data
- CORS configuration for API endpoints
- Input validation and sanitization
- Error boundary implementation

## 📊 Analytics & Monitoring

### Session Analytics
```typescript
interface SessionStats {
  messagesCount: number
  sessionDuration: number
  topicsDiscussed: string[]
  satisfaction?: number
}
```

### User Behavior Tracking
- Conversation flow analysis
- Feature usage metrics
- Performance monitoring
- Error tracking and reporting

## 🧪 Testing Strategy

### Component Testing
```typescript
// Example test structure
describe('PyXChatbot', () => {
  test('renders chat interface', () => {
    render(<PyXChatbot />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })
  
  test('handles message sending', async () => {
    // Test message handling logic
  })
})
```

### Integration Testing
- API endpoint testing
- Context provider testing
- Workflow integration testing
- Cross-browser compatibility

## 🚀 Deployment

### Build Configuration
```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          radix: ['@radix-ui/react-*'],
          lucide: ['lucide-react'],
          framer: ['framer-motion'],
        },
      },
    },
  },
})
```

### Production Deployment
1. Build the application: `npm run build`
2. Deploy the `dist` folder to your hosting provider
3. Configure environment variables on the server
4. Set up HTTPS and domain configuration
5. Configure CDN for static assets

## 🔧 Development Workflow

### Code Organization
- Feature-based component organization
- Consistent naming conventions
- TypeScript strict mode enabled
- ESLint configuration for code quality

### Git Workflow
```bash
# Feature development
git checkout -b feature/new-feature
git commit -m "feat: add new feature"
git push origin feature/new-feature

# Create pull request
# Code review process
# Merge to main branch
```

### Performance Optimization
- Code splitting with dynamic imports
- Lazy loading for route components
- Image optimization and lazy loading
- Bundle size monitoring
- Caching strategies

## 🐛 Debugging & Troubleshooting

### Common Issues

#### 1. PyX Context Provider Error
```
Error: usePyX must be used within a PyXContextProvider
```
**Solution**: Ensure components using `usePyX()` are wrapped in `PyXContextProvider`

#### 2. API Key Configuration
```
Error: AI service not configured
```
**Solution**: Add API keys to `.env` file or use local mode

#### 3. Build Errors
```
Error: Module not found
```
**Solution**: Check import paths and TypeScript configuration

### Debug Mode
Enable debug mode in `.env`:
```bash
VITE_DEBUG_MODE=true
```

This enables:
- Console logging for AI responses
- Performance metrics
- Context state debugging
- API call monitoring

## 📚 API Reference

### PyX Context API
```typescript
const { 
  isOpen, 
  setIsOpen,
  messages,
  addMessage,
  currentPage,
  setCurrentPage,
  generateResponse,
  preferences,
  updatePreferences 
} = usePyX()
```

### AI Service API
```typescript
const {
  generateResponse,
  analyzeIntent,
  generateSuggestions,
  translateText,
  config,
  updateConfig
} = useAIService()
```

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Run linting and tests
6. Submit a pull request

### Code Style Guidelines
- Use TypeScript for all new code
- Follow React best practices
- Implement proper error handling
- Add JSDoc comments for complex functions
- Use semantic commit messages

### Testing Requirements
- Unit tests for utility functions
- Component tests for UI components
- Integration tests for API interactions
- E2E tests for critical user flows

## 📈 Roadmap

### Upcoming Features
- [ ] Advanced ML recommendation algorithms
- [ ] Real-time collaboration features
- [ ] Enhanced voice interaction capabilities
- [ ] Mobile app development
- [ ] Advanced analytics dashboard
- [ ] Plugin system for custom agents

### Performance Improvements
- [ ] Service worker implementation
- [ ] Advanced caching strategies
- [ ] Bundle size optimization
- [ ] Server-side rendering support

## 📞 Support

### Documentation
- [API Documentation](./docs/api.md)
- [Component Library](./docs/components.md)
- [Deployment Guide](./docs/deployment.md)

### Community
- GitHub Issues for bug reports
- Discussions for feature requests
- Discord community for real-time help

---

**Note**: This is a living document that should be updated as the project evolves. Keep it synchronized with code changes and new features.