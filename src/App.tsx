import React from 'react'
import { Router } from './components/layout/Router'
import { PyXContextProvider } from './components/layout/PyXContextProvider'
import { PyXChatbot } from './components/agents/PyXChatbot'
import { PyXPageDetector } from './components/common/PyXPageDetector'
import { AIServiceProvider } from './components/services/AIService'
import { VoiceServiceProvider } from './components/services/VoiceService'
import { I18nProvider } from './components/services/I18nService'
import { RecommendationEngineProvider } from './components/services/RecommendationEngine'
// import { GenerateAppPage } from './components/pages/GenerateAppPage'
import './components/styles/globals.css'

function App() {
  const [currentPath, setCurrentPath] = React.useState(window.location.pathname)

  React.useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname)
    }

    window.addEventListener('popstate', handleLocationChange)
    
    // Listen for programmatic navigation
    const originalPushState = window.history.pushState
    const originalReplaceState = window.history.replaceState

    window.history.pushState = function(...args) {
      originalPushState.apply(window.history, args)
      handleLocationChange()
    }

    window.history.replaceState = function(...args) {
      originalReplaceState.apply(window.history, args)
      handleLocationChange()
    }

    return () => {
      window.removeEventListener('popstate', handleLocationChange)
      window.history.pushState = originalPushState
      window.history.replaceState = originalReplaceState
    }
  }, [])

  return (
    <I18nProvider defaultLanguage="en">
      <AIServiceProvider>
        <VoiceServiceProvider>
          <PyXContextProvider>
            {/* <GenerateAppPage /> removed, now only rendered via router */}
            <RecommendationEngineProvider>
              <div className="min-h-screen bg-background text-foreground">
                <Router />
                <PyXPageDetector currentPath={currentPath} />
                <PyXChatbot />
              </div>
            </RecommendationEngineProvider>
            
          </PyXContextProvider>
        </VoiceServiceProvider>
      </AIServiceProvider>
    </I18nProvider>
  )
}

export default App