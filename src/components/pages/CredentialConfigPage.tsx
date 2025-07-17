// CredentialConfigPage.tsx
'use client'

import { useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Globe,
  HelpCircle,
  Eye,
  EyeOff,
  Key,
  Shield,
  AlertTriangle
} from 'lucide-react'

import { Badge } from '../common/ui/badge'
import { Button } from '../common/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../common/ui/card'
import { Input } from '../common/ui/input'
import { Label } from '../common/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../common/ui/select'
import { Separator } from '../common/ui/separator'
import { Textarea } from '../common/ui/textarea'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../common/ui/tooltip'

interface CredentialConfigPageProps {
  inputOption: any
  outputOption: any
  onNext: (credentials: any) => void
  onBack: () => void
}

type Credentials = {
  [key: string]: string
}

type ShowPasswordMap = {
  [key: string]: boolean
}

export function CredentialConfigPage({ inputOption, outputOption, onNext, onBack }: CredentialConfigPageProps) {
  const [credentials, setCredentials] = useState<Credentials>({})
  const [showPassword, setShowPassword] = useState<ShowPasswordMap>({})
  const [validationErrors, setValidationErrors] = useState<Credentials>({})

  const handleInputChange = (field: string, value: string) => {
    setCredentials((prev) => ({ ...prev, [field]: value }))
    if (validationErrors[field]) {
      setValidationErrors((prev) => ({ ...prev, [field]: '' }))
    }
  }

  const togglePasswordVisibility = (field: string) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }))
  }

  const validateForm = () => {
    const errors: Credentials = {}

    if (inputOption.id === 'shopify-reviews' && !credentials.shopifyUrl) {
      errors.shopifyUrl = 'Shopify URL is required'
    }
    if (outputOption.id === 'slack-message' && !credentials.slackWebhook) {
      errors.slackWebhook = 'Slack webhook URL is required'
    }
    if (outputOption.id === 'google-sheet' && !credentials.googleSheetId) {
      errors.googleSheetId = 'Google Sheet ID is required'
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleNext = () => {
    if (validateForm()) onNext(credentials)
  }

  const inputFields = []
  if (inputOption.id === 'shopify-reviews') {
    inputFields.push(
      <div key="shopify" className="space-y-4">
        <h3 className="font-semibold text-lg flex items-center space-x-2">
          <Globe className="h-5 w-5 text-green-600" />
          <span>Shopify Configuration</span>
        </h3>

        <div className="space-y-2">
          <Label htmlFor="shopifyUrl">Store URL</Label>
          <Input
            id="shopifyUrl"
            placeholder="https://your-store.myshopify.com"
            value={credentials.shopifyUrl || ''}
            onChange={(e) => handleInputChange('shopifyUrl', e.target.value)}
            className={validationErrors.shopifyUrl ? 'border-red-500' : ''}
          />
          {validationErrors.shopifyUrl && (
            <p className="text-sm text-red-600 flex items-center space-x-1">
              <AlertTriangle className="h-4 w-4" />
              <span>{validationErrors.shopifyUrl}</span>
            </p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Label htmlFor="shopifyApiKey">API Key</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger><HelpCircle className="h-4 w-4 text-muted-foreground" /></TooltipTrigger>
                <TooltipContent>Found in your Shopify admin under Apps → Private Apps</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="relative">
            <Input
              id="shopifyApiKey"
              type={showPassword.shopifyApiKey ? 'text' : 'password'}
              placeholder="Enter your Shopify API key"
              value={credentials.shopifyApiKey || ''}
              onChange={(e) => handleInputChange('shopifyApiKey', e.target.value)}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('shopifyApiKey')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword.shopifyApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>
    )
  }

  const outputFields = []
  if (outputOption.id === 'slack-message') {
    outputFields.push(
      <div key="slack" className="space-y-4">
        <h3 className="font-semibold text-lg flex items-center space-x-2">
          <Badge className="bg-green-100 text-green-800">Output</Badge>
          <span>Slack Configuration</span>
        </h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Label htmlFor="slackWebhook">Webhook URL</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger><HelpCircle className="h-4 w-4 text-muted-foreground" /></TooltipTrigger>
                <TooltipContent>Create a webhook in your Slack workspace settings</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="relative">
            <Input
              id="slackWebhook"
              type={showPassword.slackWebhook ? 'text' : 'password'}
              placeholder="https://hooks.slack.com/services/..."
              value={credentials.slackWebhook || ''}
              onChange={(e) => handleInputChange('slackWebhook', e.target.value)}
              className={`pr-10 ${validationErrors.slackWebhook ? 'border-red-500' : ''}`}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('slackWebhook')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword.slackWebhook ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {validationErrors.slackWebhook && (
            <p className="text-sm text-red-600 flex items-center space-x-1">
              <AlertTriangle className="h-4 w-4" />
              <span>{validationErrors.slackWebhook}</span>
            </p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r 
bg-gradient-to-r from-[#FF620A] via-[#D94B05] to-[#993B06]

 bg-clip-text text-transparent">
              Connect Your Tools
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Configure the connections your AI agent needs to access your data and deliver results
            </p>
          </div>

          <Card className="mb-8 border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-900/10">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Shield className="h-6 w-6 text-green-600" />
                <div>
                  <h3 className="font-semibold text-green-800 dark:text-green-200">Your credentials are secure</h3>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    All credentials are encrypted and stored securely. They're only used to power your agents and are never shared.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Key className="h-5 w-5" />
                <span>Agent Configuration</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {inputFields}
              {inputFields.length > 0 && outputFields.length > 0 && <Separator />}
              {outputFields}

              <Separator />
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">General Settings</h3>
                <div className="space-y-2">
                  <Label htmlFor="agentName">Agent Name</Label>
                  <Input
                    id="agentName"
                    placeholder="My Customer Sentiment Monitor"
                    value={credentials.agentName || ''}
                    onChange={(e) => handleInputChange('agentName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="updateFrequency">Update Frequency</Label>
                  <Select
                    value={credentials.updateFrequency || 'daily'}
                    onValueChange={(value) => handleInputChange('updateFrequency', value)}
                  >
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realtime">Real-time</SelectItem>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description (optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="What does this agent do?"
                    rows={3}
                    value={credentials.description || ''}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Output Format
            </Button>
            <Button
              onClick={handleNext}
              className="bg-gradient-to-r 
bg-gradient-to-r from-[#FF620A] via-[#D94B05] to-[#993B06]

 hover:from-[#D94B05] hover:to-[#FF620A] text-white"
            >
              Continue to Generate Agent
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
