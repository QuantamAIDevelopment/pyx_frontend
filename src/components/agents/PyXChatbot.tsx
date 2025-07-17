'use client'

import  { useState, useRef, useEffect } from 'react'
import { Button } from '../common/ui/button'
import { Input } from '../common/ui/input'
import { Card } from '../common/ui/card'
import { ScrollArea } from '../common/ui/scroll-area'
import { 
  MessageCircle, X, Send, Bot, User, Minimize2, Compass
} from 'lucide-react'
import { usePyX } from '../layout/PyXContextProvider'
import { useAIService } from '../services/AIService'
// import { useI18n } from '../services/I18nService'
import { cn } from '../common/ui/utils'

export function PyXChatbot() {
  const {
    isOpen, setIsOpen, messages, addMessage, isTyping, setIsTyping,
    currentPage, preferences
  } = usePyX()

  const { generateResponse } = useAIService()
  // const { translate } = useI18n()

  const [inputValue, setInputValue] = useState('')
  const [isMobile, setIsMobile] = useState(false)
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    const messageContent = content.trim()

    addMessage({ type: 'user', content: messageContent })
    setInputValue('')
    setIsTyping(true)

    try {
      const response = await generateResponse(content, {
        currentPage,
        conversationHistory: messages.slice(-5),
        preferences
      })

      addMessage({
        type: 'assistant',
        content: response.content,
        suggestions: response.suggestions
      })
    } catch (error) {
      console.error('Failed to generate response:', error)
      addMessage({
        type: 'assistant',
        content: "I apologize, but I'm having trouble responding right now. Please try again.",
        suggestions: ['Try again', 'Ask a different question']
      })
    } finally {
      setIsTyping(false)
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative group">
          <Button
            onClick={() => setIsOpen(true)}
            className="h-14 w-14 rounded-full bg-gradient-to-r from-[#FF620A] to-[#993B06] hover:from-[#FF7C33] hover:to-[#B3470A] shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-110 relative overflow-hidden border-0"
          >
            {/* Background gradients */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF620A] to-[#993B06] hover:from-[#FF7C33] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
            <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-20" />
            
            {/* Icon with better visibility */}
            <div className="relative z-10 flex items-center justify-center">
              <MessageCircle 
                className="h-6 w-6 text-white drop-shadow-lg" 
                style={{ 
                  filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))'
                }}
              />
            </div>
          </Button>
          
          <div className="absolute bottom-16 right-0 bg-gray-900/95 text-white px-3 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap backdrop-blur-sm">
            <span>Ask me anything!</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {isMobile && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsOpen(false)} />
      )}

      <div className={cn(
        "fixed z-50 transition-all duration-300",
        isMobile ? "inset-4" : "bottom-6 right-6 w-96 max-w-[calc(100vw-2rem)]"
      )}>
        <Card className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-gray-200/50 shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#FF620A] to-[#993B06]  text-white">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Compass className="h-4 w-4 text-white drop-shadow-sm" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse" />
              </div>
              <div>
                <h3 className="font-semibold">PyX Assistant</h3>
                <p className="text-xs text-white/80">How can I help you today?</p>
              </div>
            </div>
            
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-black/80 hover:text-black hover:bg-white/20"
            >
              {isMobile ? <X className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </Button>
          </div>

          {/* Messages */}
          <ScrollArea className={cn("p-4", isMobile ? "h-96" : "h-96")}>
            <div className="space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                  <Bot className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-sm">Welcome to PyX!</p>
                  <p className="text-xs mt-1">I'm your AI assistant. Ask me anything and I'll help you!</p>
                </div>
              )}

              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex items-start space-x-3",
                    message.type === 'user' ? "justify-end" : "justify-start"
                  )}
                >
                  {message.type === 'assistant' && (
                    <div className="w-8 h-8 bg-gradient-to-r from-[#FF620A] to-[#993B06] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  )}
                  
                  <div className={cn(
                    "max-w-[80%] space-y-2",
                    message.type === 'user' ? "order-first" : ""
                  )}>
                    <div className={cn(
                      "rounded-2xl px-4 py-3 text-sm",
                      message.type === 'user'
                        ? "bg-gradient-to-r from-[#FF620A] to-[#993B06]  text-white ml-auto"
                        : "bg-gray-100 dark:bg-gray-800"
                    )}>
                      <div className="whitespace-pre-wrap">{message.content}</div>
                    </div>
                    
                    {message.suggestions && message.suggestions.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {message.suggestions.map((suggestion, index) => (
                          <Button
                            key={index}
                            onClick={() => handleSendMessage(suggestion)}
                            variant="outline"
                            size="sm"
                            className="h-7 text-xs hover:bg-blue-50"
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    )}
                    
                    <div className={cn(
                      "text-xs text-gray-500",
                      message.type === 'user' ? "text-right" : "text-left"
                    )}>
                      {formatTime(message.timestamp)}
                    </div>
                  </div>

                  {message.type === 'user' && (
                    <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#FF620A] to-[#993B06]  rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-3 max-w-[80%]">
                    <div className="flex items-center space-x-1">
                      <div className="text-sm text-gray-600 dark:text-gray-400">Thinking...</div>
                      <div className="flex space-x-1">
                        <div className="w-1 h-1 bg-gray-400 rounded-full animate-pulse" />
                        <div className="w-1 h-1 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                        <div className="w-1 h-1 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t bg-gray-50/50 dark:bg-gray-800/50">
            <div className="flex items-end space-x-2">
              <div className="flex-1">
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage(inputValue)
                    }
                  }}
                  placeholder="Type your message..."
                  disabled={isTyping}
                  className="border-0 bg-white dark:bg-gray-900 shadow-sm"
                />
              </div>
              
              <Button
                onClick={() => handleSendMessage(inputValue)}
                disabled={!inputValue.trim() || isTyping}
                className="h-9 w-9 p-0 bg-gradient-to-r from-[#FF620A] to-[#993B06] hover:from-blue-400 hover:to-purple-400 text-white"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </>
  )
}