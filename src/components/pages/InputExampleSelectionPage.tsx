'use client'

import { useState } from 'react'
import { Button } from '../common/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../common/ui/card'
import { Badge } from '../common/ui/badge'
import { RadioGroup, RadioGroupItem } from '../common/ui/radio-group'
import { Label } from '../common/ui/label'
import { ArrowRight, ArrowLeft, RefreshCw, CheckCircle, Database, Calendar, FileText, Globe } from 'lucide-react'

interface InputOption {
  id: string
  title: string
  description: string
  details: string
  icon: React.ReactNode
  badge: string
}

interface InputExampleSelectionPageProps {
  prompt: string
  onNext: (selectedInput: InputOption) => void
  onBack: () => void
}

export function InputExampleSelectionPage({ prompt, onNext, onBack }: InputExampleSelectionPageProps) {
  const [selectedInput, setSelectedInput] = useState<string>('')
  const [isRegenerating, setIsRegenerating] = useState(false)

  // Generate input options based on the prompt
  const inputOptions: InputOption[] = [
    {
      id: 'shopify-reviews',
      title: 'Fetch reviews weekly from Shopify',
      description: 'Automatically collect customer reviews from your Shopify store',
      details: 'Reviews will be fetched every week and processed for sentiment analysis',
      icon: <Database className="h-6 w-6" />,
      badge: 'E-commerce'
    },
    {
      id: 'google-forms',
      title: 'Monitor Google Forms responses',
      description: 'Watch for new form submissions and process them in real-time',
      details: 'Instant processing when new responses are submitted',
      icon: <FileText className="h-6 w-6" />,
      badge: 'Forms'
    },
    {
      id: 'scheduled-check',
      title: 'Daily sentiment monitoring',
      description: 'Check customer feedback across multiple platforms daily',
      details: 'Comprehensive daily analysis of customer sentiment trends',
      icon: <Calendar className="h-6 w-6" />,
      badge: 'Scheduled'
    },
    {
      id: 'webhook-trigger',
      title: 'Real-time webhook monitoring',
      description: 'Instant processing when new customer data is received',
      details: 'Immediate response to incoming customer feedback via webhooks',
      icon: <Globe className="h-6 w-6" />,
      badge: 'Real-time'
    }
  ]

  const handleRegenerate = async () => {
    setIsRegenerating(true)
    // Simulate API call to regenerate suggestions
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsRegenerating(false)
  }

  const handleNext = () => {
    const selected = inputOptions.find(option => option.id === selectedInput)
    if (selected) {
      onNext(selected)
    }
  }

  const getIconColor = (id: string) => {
    const colors = {
      'shopify-reviews': 'text-green-600',
      'google-forms': 'text-blue-600',
      'scheduled-check': 'text-purple-600',
      'webhook-trigger': 'text-orange-600'
    }
    return colors[id as keyof typeof colors] || 'text-gray-600'
  }

  const getBadgeColor = (badge: string) => {
    const colors = {
      'E-commerce': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'Forms': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'Scheduled': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      'Real-time': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
    }
    return colors[badge as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Choose the input that matches your intent
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Based on your description: "<span className="font-medium italic">{prompt}</span>"
            </p>
          </div>

          {/* Input Options */}
          <div className="space-y-6 mb-8">
            <RadioGroup value={selectedInput} onValueChange={setSelectedInput}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {inputOptions.map((option) => (
                  <div key={option.id} className="relative">
                    <Label htmlFor={option.id} className="cursor-pointer">
                      <Card 
                        className={`transition-all duration-300 hover:shadow-lg ${
                          selectedInput === option.id 
                            ? 'ring-2 ring-purple-500 border-purple-500 shadow-lg' 
                            : 'hover:border-purple-500/50'
                        }`}
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className={`p-2 rounded-lg bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 ${getIconColor(option.id)}`}>
                                {option.icon}
                              </div>
                              <div>
                                <CardTitle className="text-lg">{option.title}</CardTitle>
                                <Badge className={getBadgeColor(option.badge)}>
                                  {option.badge}
                                </Badge>
                              </div>
                            </div>
                            <RadioGroupItem value={option.id} id={option.id} />
                          </div>
                        </CardHeader>
                        
                        <CardContent className="pt-0">
                          <p className="text-muted-foreground mb-3">
                            {option.description}
                          </p>
                          <div className="text-sm bg-muted/30 p-3 rounded-lg">
                            <span className="font-medium">Details: </span>
                            {option.details}
                          </div>
                        </CardContent>

                        {selectedInput === option.id && (
                          <div className="absolute -top-2 -right-2 bg-purple-500 text-white rounded-full p-1">
                            <CheckCircle className="h-4 w-4" />
                          </div>
                        )}
                      </Card>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* None of these button */}
          <div className="text-center mb-8">
            <Button 
              variant="outline" 
              onClick={handleRegenerate}
              disabled={isRegenerating}
              className="border-dashed border-2 hover:border-purple-500 hover:text-purple-600"
            >
              {isRegenerating ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Generating new options...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  None of these - generate different options
                </>
              )}
            </Button>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Prompt
            </Button>
            
            <Button 
              onClick={handleNext}
              disabled={!selectedInput}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            >
              Continue to Output Format
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}