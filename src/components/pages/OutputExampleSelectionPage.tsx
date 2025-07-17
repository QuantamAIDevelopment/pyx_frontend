'use client'

import { useState } from 'react'
import { Button } from '../common/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../common/ui/card'
import { Badge } from '../common/ui/badge'
import { RadioGroup, RadioGroupItem } from '../common/ui/radio-group'
import { Label } from '../common/ui/label'
import { ArrowRight, ArrowLeft, CheckCircle, MessageSquare, FileSpreadsheet, BarChart3, Mail, TrendingUp } from 'lucide-react'

interface OutputOption {
  id: string
  title: string
  description: string
  preview: string
  icon: React.ReactNode
  badge: string
  color: string
}

interface OutputExampleSelectionPageProps {
  onNext: (selectedOutput: OutputOption) => void
  onBack: () => void
}

export function OutputExampleSelectionPage({ onNext, onBack }: OutputExampleSelectionPageProps) {
  const [selectedOutput, setSelectedOutput] = useState<string>('')

  const outputOptions: OutputOption[] = [
    {
      id: 'slack-message',
      title: 'Slack Message',
      description: 'Send formatted alerts to your team channel',
      preview: '🚨 Customer sentiment alert: 2.3/5 stars this week (down from 4.1). Top issues: shipping delays, product quality.',
      icon: <MessageSquare className="h-6 w-6" />,
      badge: 'Instant',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'google-sheet',
      title: 'Google Sheet Entry',
      description: 'Add structured data to your spreadsheet',
      preview: 'Week 42 | Avg Rating: 2.3 | Total Reviews: 47 | Sentiment: Negative | Action Required: Yes',
      icon: <FileSpreadsheet className="h-6 w-6" />,
      badge: 'Structured',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'dashboard-summary',
      title: 'Dashboard Summary',
      description: 'Create visual summaries for your analytics dashboard',
      preview: '📊 Weekly Summary: 47 reviews analyzed, 38% positive sentiment, trending down 15% from last week',
      icon: <BarChart3 className="h-6 w-6" />,
      badge: 'Visual',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'email-digest',
      title: 'Email Digest',
      description: 'Send comprehensive reports to stakeholders',
      preview: 'Weekly Customer Sentiment Report\n\nKey Metrics:\n• Average Rating: 2.3/5\n• Total Reviews: 47\n• Trend: ↓ 15%\n\nAction Items:\n• Address shipping concerns\n• Review product quality',
      icon: <Mail className="h-6 w-6" />,
      badge: 'Detailed',
      color: 'from-orange-500 to-red-500'
    }
  ]

  const handleNext = () => {
    const selected = outputOptions.find(option => option.id === selectedOutput)
    if (selected) {
      onNext(selected)
    }
  }

  const getBadgeColor = (badge: string) => {
    const colors = {
      'Instant': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'Structured': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'Visual': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      'Detailed': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
    }
    return colors[badge as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r 
bg-gradient-to-r from-[#FF620A] via-[#D94B05] to-[#993B06]

 bg-clip-text text-transparent">
              Choose the format you want the agent to output
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Select how you'd like to receive your processed data and insights
            </p>
          </div>

          {/* Output Options */}
          <div className="space-y-6 mb-8">
            <RadioGroup value={selectedOutput} onValueChange={setSelectedOutput}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {outputOptions.map((option) => (
                  <div key={option.id} className="relative h-full">
  <Label htmlFor={option.id} className="cursor-pointer block h-full">
    <Card
      className={`transition-all duration-300 hover:shadow-lg h-full w-full flex flex-col ${
        selectedOutput === option.id
          ? 'ring-2 ring-purple-500 border-purple-500 shadow-lg'
          : 'hover:border-purple-500/50'
      }`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-lg bg-gradient-to-r ${option.color} text-white`}>
              {option.icon}
            </div>
            <div>
              <CardTitle className="text-lg">{option.title}</CardTitle>
              <Badge className={getBadgeColor(option.badge)}>{option.badge}</Badge>
            </div>
          </div>
          <RadioGroupItem value={option.id} id={option.id} />
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-4 flex-grow">
        <p className="text-muted-foreground">
          {option.description}
        </p>

        <div className="bg-muted/30 p-4 rounded-lg border-l-4 border-purple-500">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span className="text-sm font-medium text-muted-foreground">Preview</span>
          </div>
          <pre className="text-sm text-foreground whitespace-pre-wrap font-mono">
            {option.preview}
          </pre>
        </div>
      </CardContent>

      {selectedOutput === option.id && (
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

          {/* Features Section */}
          <div className="bg-muted/30 rounded-lg p-6 mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              <h3 className="font-semibold">All output formats include:</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Smart formatting</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Customizable templates</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Real-time delivery</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Input Format
            </Button>
            
            <Button 
              onClick={handleNext}
              disabled={!selectedOutput}
              className="bg-gradient-to-r 
bg-gradient-to-r from-[#FF620A] via-[#D94B05] to-[#993B06]

 hover:from-purple-700 hover:to-pink-700 text-white"
            >
              Continue to Configuration
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}