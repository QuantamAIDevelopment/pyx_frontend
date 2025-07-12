'use client'

import { useState } from 'react'
import { Button } from '../common/ui/button'
import { Textarea } from '../common/ui/textarea'
import { Card, CardContent } from '../common/ui/card'
// import { Badge } from '../common/ui/badge'
import { Lightbulb, ArrowRight, Sparkles, Bot, Target, Zap } from 'lucide-react'

interface PromptEntryPageProps {
  onNext: (prompt: string) => void
  onBack: () => void
}

export function PromptEntryPage({ onNext }: PromptEntryPageProps) {
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const examplePrompts = [
    "Summarize customer reviews and send a Slack alert",
    "Monitor inventory levels and update Google Sheets",
    "Generate weekly sales reports and email them",
    "Track support tickets and create dashboard summaries"
  ]

  const handleSubmit = async () => {
    if (!prompt.trim()) return
    
    setIsGenerating(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsGenerating(false)
    onNext(prompt)
  }

  const useExamplePrompt = (example: string) => {
    setPrompt(example)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full">
                <Bot className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              What do you want your AI agent to do?
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Describe your automation goal in plain English. Our AI will help you build the perfect agent.
            </p>
          </div>

          {/* Main Input Card */}
          <Card className="mb-8 border-2 border-dashed border-muted-foreground/20 hover:border-purple-500/50 transition-all duration-300">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Lightbulb className="h-5 w-5 text-amber-500" />
                  <span className="text-sm">Tip: Be specific about what data you want to process and where you want the results to go</span>
                </div>

                <div className="relative">
                  <Textarea
                    placeholder="e.g., Summarize customer reviews and send a Slack alert when sentiment drops below 3 stars"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="min-h-[120px] text-lg p-4 border-2 focus:border-purple-500 transition-colors"
                    maxLength={500}
                  />
                  <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
                    {prompt.length}/500
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button
                    onClick={handleSubmit}
                    disabled={!prompt.trim() || isGenerating}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg"
                  >
                    {isGenerating ? (
                      <>
                        <Sparkles className="h-5 w-5 mr-2 animate-spin" />
                        Generating Examples...
                      </>
                    ) : (
                      <>
                        Generate Example Inputs
                        <ArrowRight className="h-5 w-5 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Example Prompts */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Target className="h-5 w-5" />
              <span className="font-medium">Popular automations to get you started:</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {examplePrompts.map((example, index) => (
                <Card 
                  key={index}
                  className="cursor-pointer hover:shadow-lg hover:border-purple-500/50 transition-all duration-300 group"
                  onClick={() => useExamplePrompt(example)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-2 rounded-lg group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-colors">
                        <Zap className="h-4 w-4 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium group-hover:text-purple-600 transition-colors">
                          {example}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Click to use this example
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Features Preview */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 p-3 rounded-full w-fit mx-auto">
                <Bot className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold">AI-Powered</h3>
              <p className="text-sm text-muted-foreground">
                Smart interpretation of your requirements
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-3 rounded-full w-fit mx-auto">
                <Target className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold">No-Code</h3>
              <p className="text-sm text-muted-foreground">
                Build powerful automations without coding
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-3 rounded-full w-fit mx-auto">
                <Sparkles className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold">Instant Deploy</h3>
              <p className="text-sm text-muted-foreground">
                Your agent goes live in minutes
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}