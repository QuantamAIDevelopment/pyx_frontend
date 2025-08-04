'use client'

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../common/ui/button'
import { Textarea } from '../common/ui/textarea'
import { Card } from '../common/ui/card'
import { Badge } from '../common/ui/badge'
import { 
  Zap, Lightbulb, MessageSquare, BarChart3, 
  ShoppingCart, Calendar, FileText, Database,
  ArrowRight, Sparkles, Bot, Users
} from 'lucide-react'
import { usePyX } from '../layout/PyXContextProvider'

export function GenerateAppPage() {
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const navigate = useNavigate()
  const { setCurrentPage } = usePyX()

  React.useEffect(() => {
    setCurrentPage('generate-app')
  }, [setCurrentPage])

  const handleGenerate = async () => {
    if (prompt.trim().length < 20) {
      alert('Please provide a more detailed description (minimum 20 characters)')
      return
    }

    setIsGenerating(true)
    
    // Simulate generation process
    setTimeout(() => {
      setIsGenerating(false)
      // Navigate to code preview
      navigate('/code-preview')
    }, 3000)
  }

  const promptSuggestions = [
    {
      icon: MessageSquare,
      title: "AI Chatbot",
      description: "A customer support chatbot that answers questions from my knowledge base",
      category: "Customer Service"
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "A real-time dashboard showing sales metrics and KPIs from my database",
      category: "Analytics"
    },
    {
      icon: ShoppingCart,
      title: "E-commerce Store",
      description: "An online store with product catalog, cart, and payment processing",
      category: "E-commerce"
    },
    {
      icon: Calendar,
      title: "Booking System",
      description: "A scheduling app for appointments with calendar integration",
      category: "Productivity"
    },
    {
      icon: FileText,
      title: "Blog Platform",
      description: "A content management system for publishing articles and blogs",
      category: "Content"
    },
    {
      icon: Database,
      title: "Inventory Manager",
      description: "A system to track products, stock levels, and generate reports",
      category: "Business Tools"
    }
  ]

  const handleSuggestionClick = (description: string) => {
    setPrompt(description)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                <Sparkles className="h-3 w-3 text-yellow-800" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Describe Your App in Natural Language
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Tell PyX what you want to build, and we'll generate a complete web application with all the code, tests, and deployment ready.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Main Input Section */}
          <div className="lg:col-span-2">
            <Card className="p-8 shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl">
              <div className="mb-6">
                <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  What do you want to build?
                </label>
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., I want a chatbot that answers product questions from my Notion database. It should have a modern interface, support for multiple languages, and integrate with my existing customer support workflow."
                  className="min-h-[200px] text-base leading-relaxed resize-none border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl bg-white dark:bg-gray-900"
                  maxLength={1000}
                />
                <div className="flex justify-between items-center mt-3">
                  <div className="flex items-center space-x-2">
                    <Badge variant={prompt.length >= 20 ? "default" : "secondary"}>
                      {prompt.length >= 20 ? "✓" : "!"} {prompt.length}/1000 characters
                    </Badge>
                    {prompt.length < 20 && (
                      <span className="text-sm text-orange-600 dark:text-orange-400">
                        Minimum 20 characters required
                      </span>
                    )}
                  </div>
                  <Button
                    onClick={handleGenerate}
                    disabled={prompt.length < 20 || isGenerating}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Generating App Code...
                      </>
                    ) : (
                      <>
                        Generate App Code
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Generation Progress */}
              {isGenerating && (
                <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl border border-blue-200 dark:border-blue-700">
                  <div className="flex items-center mb-4">
                    <Bot className="h-6 w-6 text-blue-500 mr-3" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      PyX is generating your application...
                    </h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 animate-pulse"></div>
                      Analyzing your requirements and generating architecture
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 animate-pulse"></div>
                      Creating React components and API endpoints
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <div className="w-2 h-2 bg-pink-500 rounded-full mr-3 animate-pulse"></div>
                      Setting up database schema and configurations
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* PyX Suggestions Panel */}
          <div className="lg:col-span-1">
            <Card className="p-6 shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl sticky top-6">
              <div className="flex items-center mb-6">
                <Lightbulb className="h-6 w-6 text-yellow-500 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Need inspiration?
                </h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
                Click on any suggestion below to use it as a starting point for your app description.
              </p>
              
              <div className="space-y-4">
                {promptSuggestions.map((suggestion, index) => {
                  const IconComponent = suggestion.icon
                  return (
                    <div
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion.description)}
                      className="p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 cursor-pointer transition-all duration-200 hover:shadow-md bg-white dark:bg-gray-700 group"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                          <IconComponent className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                              {suggestion.title}
                            </h4>
                            <Badge variant="outline" className="text-xs">
                              {suggestion.category}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                            {suggestion.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-8 p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg border border-green-200 dark:border-green-700">
                <div className="flex items-center mb-2">
                  <Users className="h-5 w-5 text-green-600 mr-2" />
                  <span className="font-semibold text-green-800 dark:text-green-300 text-sm">
                    Pro Tip
                  </span>
                </div>
                <p className="text-xs text-green-700 dark:text-green-300">
                  Be specific about your data sources, integrations, and user workflows. The more detail you provide, the better PyX can generate your perfect app!
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}