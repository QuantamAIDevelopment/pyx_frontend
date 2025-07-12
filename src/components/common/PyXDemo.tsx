'use client'

// import React from 'react'
import { Button } from './ui/button'
import { Card } from '../common/ui/card'
import { Badge } from './ui/badge'
import { usePyX } from '../layout/PyXContextProvider'
import { 
  MessageCircle, 
  Sparkles, 
  Bot, 
  Zap, 
  Code, 
  Globe,
  ChevronRight
} from 'lucide-react'

export function PyXDemo() {
  const { setIsOpen, setCurrentPage } = usePyX()

  const demoScenarios = [
    {
      icon: Globe,
      title: "Marketplace Help",
      description: "Get recommendations for the perfect AI agent",
      page: "marketplace",
      action: () => {
        setCurrentPage('marketplace')
        setIsOpen(true)
      }
    },
    {
      icon: Zap,
      title: "Agent Building",
      description: "Learn how to create your own AI agents",
      page: "create-agent",
      action: () => {
        setCurrentPage('create-agent')
        setIsOpen(true)
      }
    },
    {
      icon: Code,
      title: "API Integration",
      description: "Get help with API endpoints and usage",
      page: "api",
      action: () => {
        setCurrentPage('api')
        setIsOpen(true)
      }
    },
    {
      icon: Bot,
      title: "Developer Mode",
      description: "Advanced development features and tools",
      page: "developer-mode",
      action: () => {
        setCurrentPage('developer-mode')
        setIsOpen(true)
      }
    }
  ]

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 px-4 py-2 rounded-full mb-4">
          <MessageCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <span className="text-sm font-semibold text-blue-800 dark:text-blue-200">
            PyX Assistant Demo
          </span>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Meet PyX: Your AI Workflow Guide
        </h1>
        
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          PyX is an intelligent assistant that adapts to each page of QAID, providing contextual help 
          for building, deploying, and managing AI agents. Try the scenarios below to see PyX in action!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {demoScenarios.map((scenario, index) => (
          <Card 
            key={index}
            className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border border-gray-200 dark:border-gray-700"
            onClick={scenario.action}
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <scenario.icon className="h-6 w-6 text-white" />
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {scenario.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  {scenario.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">
                    {scenario.page}
                  </Badge>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-700">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h3 className="font-semibold text-blue-800 dark:text-blue-200">
              Features Overview
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="font-medium text-gray-900 dark:text-white mb-1">
                Context-Aware
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                Adapts responses based on your current page
              </div>
            </div>
            
            <div className="text-center">
              <div className="font-medium text-gray-900 dark:text-white mb-1">
                Smart Suggestions
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                Provides relevant quick actions and tips
              </div>
            </div>
            
            <div className="text-center">
              <div className="font-medium text-gray-900 dark:text-white mb-1">
                Always Available
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                Persistent floating assistant across all pages
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-8 text-center">
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white px-8 py-3"
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          Start Chatting with PyX
        </Button>
      </div>
    </div>
  )
}