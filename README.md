# QAID - AI Agents Marketplace

A comprehensive AI agents marketplace with an embedded smart assistant (PyX) that provides context-aware help across the platform.

## Features

### 🤖 PyX AI Assistant
- **Real AI/ML Integration**: OpenAI and Anthropic API support with intelligent fallbacks
- **Voice Interaction**: Speech recognition and text-to-speech capabilities
- **Multi-language Support**: 15+ languages with RTL text support
- **Advanced Analytics**: Real-time conversation insights and user behavior analysis
- **Smart Recommendations**: ML-based agent suggestions and personalized recommendations
- **Context Awareness**: Adapts responses based on current page and user behavior

### 🏪 Marketplace Features
- Browse and discover AI agents
- Agent creation and management
- Visual workflow builder
- API integration and documentation
- User dashboard and analytics

## Getting Started

### Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Configure environment variables (see below)
4. Start development server: `npm run dev`

### PyX AI Assistant Configuration

The PyX assistant supports multiple AI providers and can work in local mode without API keys.

#### Environment Setup

1. Copy `.env.example` to `.env`
2. Add your API keys (optional):

```bash
# OpenAI Configuration
VITE_OPENAI_API_KEY=your_openai_api_key_here

# Anthropic Configuration  
VITE_ANTHROPIC_API_KEY=your_anthropic_api_key_here

# Default provider (openai, anthropic, or local)
VITE_DEFAULT_AI_PROVIDER=local
```

#### API Key Setup

**OpenAI API Key:**
1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create an account and generate an API key
3. Add to your `.env` file as `VITE_OPENAI_API_KEY`

**Anthropic API Key:**
1. Visit [Anthropic Console](https://console.anthropic.com/)
2. Create an account and generate an API key
3. Add to your `.env` file as `VITE_ANTHROPIC_API_KEY`

#### Local Mode

PyX will automatically fall back to local mode if no API keys are configured. In local mode, it provides:
- Contextual responses based on keyword matching
- Platform guidance and documentation
- Basic conversation management
- All UI features except advanced AI generation

## PyX Assistant Features

### 🎤 Voice Interaction
- Click the microphone icon to start voice commands
- Supports continuous listening mode
- Auto-speak responses (configurable)
- Noise reduction and audio level monitoring

### 🌍 Multi-language Support
- 15+ supported languages including RTL languages
- Automatic browser language detection
- Real-time interface translation
- Localized date, time, and number formatting

### 📊 Analytics Dashboard
- Conversation metrics and trends
- User behavior analysis
- Performance monitoring
- Exportable insights and reports

### 🎯 Smart Recommendations
- ML-based agent suggestions
- Personalized recommendations based on usage patterns
- Content-based and collaborative filtering
- Real-time recommendation explanations

### 🔧 Customization
- Response style preferences (concise, detailed, technical)
- Theme and language selection
- Voice settings and controls
- Conversation mode switching (chat, tutorial, debug)

## Development

### Project Structure

```
├── components/
│   ├── services/           # AI services and providers
│   │   ├── AIService.tsx           # AI/ML integration
│   │   ├── VoiceService.tsx        # Speech recognition/synthesis
│   │   ├── I18nService.tsx         # Multi-language support
│   │   └── RecommendationEngine.tsx # ML recommendations
│   ├── PyXChatbot.tsx             # Main chatbot component
│   ├── PyXContextProvider.tsx     # State management
│   ├── PyXAnalyticsDashboard.tsx  # Analytics interface
│   └── ...
├── styles/
│   └── globals.css         # Global styles and animations
└── ...
```

### Key Components

- **AIService**: Handles OpenAI/Anthropic integration with fallbacks
- **VoiceService**: Speech recognition and synthesis
- **I18nService**: Internationalization and localization
- **RecommendationEngine**: ML-based suggestions and user profiling
- **PyXChatbot**: Main chat interface with advanced features
- **PyXAnalyticsDashboard**: Real-time analytics and insights

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test the PyX assistant functionality
5. Submit a pull request

## Security

- Never commit API keys to version control
- Use environment variables for sensitive configuration
- API keys are stored securely in localStorage (encrypted)
- All external API calls include proper error handling

## License

[Your license information here]

---

**Note**: The PyX AI Assistant is designed to work both with and without API keys. Users can enjoy full functionality in local mode, with enhanced capabilities when AI services are configured.