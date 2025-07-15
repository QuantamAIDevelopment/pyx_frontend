'use client'

import { useState } from 'react'
import { Button } from '../common/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../common/ui/card'
import { Input } from '../common/ui/input'
import { Label } from '../common/ui/label'
import { Textarea } from '../common/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../common/ui/select'
import { Badge } from '../common/ui/badge'
import { Progress } from '../common/ui/progress'
import { Separator } from '../common/ui/separator'
import { 
  ArrowLeft, 
  Upload, 
  FileText, 
  Check, 
  Clock, 
  X,
  AlertCircle,
  Download,
  Eye,
  MessageSquare
} from 'lucide-react'

interface UploadedAgent {
  id: string
  name: string
  description: string
  category: string
  status: 'pending' | 'under_review' | 'approved' | 'rejected'
  uploadDate: string
  reviewDate?: string
  feedback?: string
}

interface UploadAgentPageProps {
  onBack: () => void
  onUploadComplete: () => void
}

const categories = [
  'Content Generation',
  'Customer Support', 
  'Sales Optimization',
  'Inventory Management',
  'Analytics',
  'Marketing',
  'General Purpose'
]

const mockUploadedAgents: UploadedAgent[] = [
  {
    id: '1',
    name: 'EmailCraft Pro',
    description: 'Advanced email marketing automation with personalization',
    category: 'Marketing',
    status: 'approved',
    uploadDate: '2024-01-10',
    reviewDate: '2024-01-12',
    feedback: 'Excellent implementation. Approved for marketplace.'
  },
  {
    id: '2',
    name: 'DataParser AI',
    description: 'Intelligent data extraction and parsing for various formats',
    category: 'General Purpose',
    status: 'under_review',
    uploadDate: '2024-01-15',
    feedback: 'Currently reviewing documentation and testing functionality.'
  },
  {
    id: '3',
    name: 'ChatBot Plus',
    description: 'Enhanced chatbot with multi-language support',
    category: 'Customer Support',
    status: 'rejected',
    uploadDate: '2024-01-08',
    reviewDate: '2024-01-11',
    feedback: 'Security concerns with API implementation. Please address and resubmit.'
  },
  {
    id: '4',
    name: 'TrendAnalyzer',
    description: 'Real-time trend analysis for social media platforms',
    category: 'Analytics',
    status: 'pending',
    uploadDate: '2024-01-18'
  }
]

export function UploadAgentPage({ onBack }: UploadAgentPageProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [currentView, setCurrentView] = useState<'upload' | 'status'>('upload')
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    useCase: '',
    file: null as File | null
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, file })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          setCurrentView('status')
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  const getStatusIcon = (status: UploadedAgent['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />
      case 'under_review':
        return <Eye className="h-4 w-4 text-blue-600" />
      case 'approved':
        return <Check className="h-4 w-4 text-green-600" />
      case 'rejected':
        return <X className="h-4 w-4 text-red-600" />
    }
  }

  const getStatusColor = (status: UploadedAgent['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
      case 'under_review':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
      case 'approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
    }
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Upload Your Agent</h1>
            <p className="text-muted-foreground">Submit your AI agent to the QAID marketplace</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-muted p-1 rounded-lg w-fit">
          <Button
          className='text-black'
            variant={currentView === 'upload' ? 'default' : 'ghost'}
            onClick={() => setCurrentView('upload')}
            size="sm"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload New
          </Button>
          <Button
            variant={currentView === 'status' ? 'default' : 'ghost'}
            onClick={() => setCurrentView('status')}
            size="sm"
          >
            <FileText className="h-4 w-4 mr-2" />
            Status Tracker
          </Button>
        </div>

        {currentView === 'upload' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Upload Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Agent Details</CardTitle>
                  <CardDescription>
                    Provide information about your AI agent
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isUploading ? (
                    <div className="space-y-6">
                      <div className="text-center">
                        <Upload className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                        <h3 className="font-medium mb-2">Uploading Agent...</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Please don't close this page while uploading
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Upload Progress</span>
                          <span>{uploadProgress}%</span>
                        </div>
                        <Progress value={uploadProgress} className="h-2" />
                      </div>
                      {uploadProgress === 100 && (
                        <div className="text-center">
                          <Check className="h-8 w-8 text-green-600 mx-auto mb-2" />
                          <p className="text-sm text-green-600">Upload completed successfully!</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Agent Name *</Label>
                          <Input
                            id="name"
                            placeholder="e.g., ReviewCraft Pro"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="category">Category *</Label>
                          <Select 
                            value={formData.category} 
                            onValueChange={(value) => setFormData({ ...formData, category: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map(category => (
                                <SelectItem key={category} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Description *</Label>
                        <Textarea
                          id="description"
                          placeholder="Describe what your agent does and its key features..."
                          rows={4}
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="useCase">Use Case *</Label>
                        <Textarea
                          id="useCase"
                          placeholder="Explain the specific business problems your agent solves..."
                          rows={3}
                          value={formData.useCase}
                          onChange={(e) => setFormData({ ...formData, useCase: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="file">Agent File *</Label>
                        <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-6">
                          <div className="text-center">
                            <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                            <p className="text-sm text-muted-foreground mb-2">
                              Drop your agent file here or click to browse
                            </p>
                            <Input
                              type="file"
                              accept=".zip,.tar,.py,.js,.json"
                              onChange={handleFileChange}
                              className="hidden"
                              id="file-upload"
                            />
                            <Label htmlFor="file-upload">
                              <Button type="button" variant="outline" asChild>
                                <span>Choose File</span>
                              </Button>
                            </Label>
                            {formData.file && (
                              <p className="text-sm mt-2">Selected: {formData.file.name}</p>
                            )}
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Accepted formats: .zip, .tar, .py, .js, .json (Max 50MB)
                        </p>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full text-black bg-white" 
                        disabled={!formData.name || !formData.description || !formData.category || !formData.file}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Submit Agent for Review
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Guidelines Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2 text-blue-600" />
                    Submission Guidelines
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div>
                    <h4 className="font-medium mb-2">Technical Requirements</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Well-documented code</li>
                      <li>• Clear API endpoints</li>
                      <li>• Error handling</li>
                      <li>• Security best practices</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Review Process</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Initial screening (24-48 hours)</li>
                      <li>• Technical review (3-5 days)</li>
                      <li>• Security audit (2-3 days)</li>
                      <li>• Final approval</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Marketplace Benefits</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• 70% revenue share</li>
                      <li>• Global distribution</li>
                      <li>• Marketing support</li>
                      <li>• Analytics dashboard</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Need Help?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download Template
                  </Button>
                  <Button variant="outline" className="w-full">
                    <FileText className="h-4 w-4 mr-2" />
                    View Documentation
                  </Button>
                  <Button variant="outline" className="w-full">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Contact Support
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          /* Status Tracker */
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Uploaded Agents Status</CardTitle>
                <CardDescription>
                  Track the review status of your submitted agents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockUploadedAgents.map((agent, index) => (
                    <div key={agent.id}>
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          {getStatusIcon(agent.status)}
                          <div>
                            <h3 className="font-medium">{agent.name}</h3>
                            <p className="text-sm text-muted-foreground">{agent.description}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Uploaded: {new Date(agent.uploadDate).toLocaleDateString()}
                              {agent.reviewDate && ` • Reviewed: ${new Date(agent.reviewDate).toLocaleDateString()}`}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge className={getStatusColor(agent.status)}>
                            {agent.status.replace('_', ' ')}
                          </Badge>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                      
                      {agent.feedback && (
                        <div className="mt-2 ml-8 p-3 bg-muted/50 rounded-lg">
                          <p className="text-sm font-medium mb-1">Review Feedback:</p>
                          <p className="text-sm text-muted-foreground">{agent.feedback}</p>
                        </div>
                      )}
                      
                      {index < mockUploadedAgents.length - 1 && <Separator className="mt-4" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}