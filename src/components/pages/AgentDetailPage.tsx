'use client'

import { useEffect, useState } from 'react'
import { Button } from '../common/ui/button'
import { Badge } from '../common/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../common/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../common/ui/tabs'
import { Separator } from '../common/ui/separator'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../common/ui/dialog'
import { Input } from '../common/ui/input'
import { Textarea } from '../common/ui/textarea'
import { Label } from '../common/ui/label'
import { ScrollArea } from '../common/ui/scroll-area'
import { toast } from 'sonner'
import { 
  Star, 
  Zap, 
  CheckCircle, 
  ArrowRight, 
  Clock, 
  Users, 
  Shield,
  ArrowLeft,
  Play,
  Download,
  Share,
  Heart,
  // ExternalLink,
  Copy,
  Twitter,
  Linkedin,
  Facebook,
  Mail,
  // Send,
  // Settings,
  // BarChart3,
  RefreshCw,
  // Eye,
  // Terminal,
  // FileText,
  // Upload,
  // Database,
  // Sparkles,
  // Activity,
  // CheckSquare,
  // AlertCircle,
  // Info,
  TestTube,
  // Link2,
  // Bookmark,
  // Bot,
  ShoppingCart
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../common/ui/avatar'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { fetchAgentDetailById } from '../apiservices/api';
import { Skeleton } from '../common/ui/skeleton';

interface Agent {
  id: string
  name: string
  description: string
  category: string
  icon: React.ComponentType<any> | string
  price: string
  rating: number
  reviews: number
  tags?: string[]
  isActive?: boolean
  features?: string[]
  sampleOutput?: string
  integrations?: string[]
  setupTime?: string
  activeUsers?: number
  security?: string
  triggerTypes?: string[]
  howitWorks?: { id: number; title: string; description: string }[]
  
}

interface AgentDetailPageProps {
  agent: Agent | null
  onBack: () => void
  onActivate: () => void
  isLoggedIn: boolean
  onShowAuth: (mode: 'login' | 'signup') => void
}

const sampleReviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b1e1?w=40&h=40&fit=crop&crop=face",
    rating: 5,
    date: "2 days ago",
    content: "Absolutely game-changing! This agent has transformed how we handle our product descriptions. The quality is consistently excellent."
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    rating: 5,
    date: "1 week ago",
    content: "Easy to set up and integrate. The results speak for themselves - our conversion rates have improved significantly."
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
    rating: 4,
    date: "2 weeks ago",
    content: "Great AI agent with impressive capabilities. Would love to see more customization options in future updates."
  }
]

const integrations = [
  { name: 'Shopify', logo: '🛍️', status: 'Available' },
  { name: 'WooCommerce', logo: '🛒', status: 'Available' },
  { name: 'Magento', logo: '🏪', status: 'Available' },
  { name: 'BigCommerce', logo: '🏬', status: 'Coming Soon' },
  { name: 'Salesforce', logo: '☁️', status: 'Available' },
  { name: 'HubSpot', logo: '🎯', status: 'Available' }
]

export function AgentDetailPage({ agent: initialAgent, onBack, onActivate, isLoggedIn, onShowAuth }: AgentDetailPageProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [agent, setAgent] = useState(initialAgent);
  const [loading, setLoading] = useState(!initialAgent);
  const [isSaved, setIsSaved] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [showDemoModal, setShowDemoModal] = useState(false)
  const [demoInput, setDemoInput] = useState('')
  const [demoOutput, setDemoOutput] = useState('')
  const [isRunningDemo, setIsRunningDemo] = useState(false)

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetchAgentDetailById(id)
        .then(data => {
          setAgent(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [id]);

  const handleSaveAgent = () => {
    if (!isLoggedIn) {
      onShowAuth('login')
      return
    }

    setIsSaved(!isSaved)
    if (!isSaved) {
      toast.success('Agent saved to your favorites! ⭐')
    } else {
      toast.success('Agent removed from favorites')
    }
  }

  const handleTryDemo = () => {
    if (!isLoggedIn) {
      onShowAuth('signup')
      return
    }
    setShowDemoModal(true)
  }

  const handleRunDemo = async () => {
    if (!demoInput.trim()) {
      toast.error('Please enter some input to run the demo')
      return
    }

    setIsRunningDemo(true)
    try {
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Generate sample output based on agent type
      let output = ''
      if (agent?.name?.includes('Smart') || agent?.category === 'Content Generation') {
        output = `Generated optimized content: "${demoInput}" has been transformed into compelling, SEO-friendly copy with improved readability and conversion potential. Key improvements: enhanced descriptive language, strategic keyword placement, and emotional engagement triggers.`
      } else if (agent?.name?.includes('Price') || agent?.category === 'Sales Optimization') {
        output = `Price analysis complete: Based on current market conditions and competitor analysis, the optimal price point is recommended at 15% below current market average while maintaining healthy profit margins. Expected conversion increase: 23%.`
      } else {
        output = `AI analysis complete: Your input "${demoInput}" has been processed successfully. The agent has identified key optimization opportunities and generated actionable insights to improve performance by an estimated 34%.`
      }
      
      setDemoOutput(output)
      toast.success('Demo completed successfully!')
    } catch (error) {
      toast.error('Demo failed to run. Please try again.')
    } finally {
      setIsRunningDemo(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard!')
  }

  const shareOnSocial = (platform: string) => {
    if (!agent) return
    
    const url = `${window.location.origin}/agents/${agent.id}`
    const text = `Check out ${agent.name} - ${agent.description.substring(0, 100)}...`
    
    let shareUrl = ''
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
        break
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        break
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        break
      case 'email':
        shareUrl = `mailto:?subject=${encodeURIComponent(`Check out ${agent.name}`)}&body=${encodeURIComponent(`${text}\n\n${url}`)}`
        break
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400')
      toast.success('Share dialog opened!')
    }
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-4xl mx-auto">
        <div className="flex items-start space-x-6 mb-8">
          <Skeleton className="h-20 w-20 rounded-xl" />
          <div className="flex-1 space-y-4">
            <Skeleton className="h-8 w-1/2 rounded" />
            <Skeleton className="h-5 w-1/3 rounded" />
            <Skeleton className="h-4 w-3/4 rounded" />
            <div className="flex gap-2 mt-2">
              <Skeleton className="h-6 w-16 rounded" />
              <Skeleton className="h-6 w-16 rounded" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Skeleton className="h-32 w-full rounded-xl mb-4" />
            <Skeleton className="h-32 w-full rounded-xl mb-4" />
            <Skeleton className="h-32 w-full rounded-xl mb-4" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-32 w-full rounded-xl mb-4" />
            <Skeleton className="h-32 w-full rounded-xl mb-4" />
            <Skeleton className="h-32 w-full rounded-xl mb-4" />
          </div>
        </div>
      </div>
    </div>
  );
  if (!agent) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Agent not found</h2>
        <Button onClick={onBack}>Go Back</Button>
      </div>
    </div>
  );

  const IconComponent = typeof agent.icon === 'function' ? agent.icon : ShoppingCart;

  return (
    <div className="min-h-screen py-8 !px-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-6 hover:bg-muted/50 "
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Agents
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 ">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Agent Header */}
            <div className="flex items-start space-x-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-gradient-to-r from-[#FF620A] to-[#993B06] flex-shrink-0">
                <IconComponent className="h-10 w-10 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-3xl font-bold">{agent.name}</h1>
                  {/* <Badge variant={agent.price === 'Free' ? 'secondary' : 'default'}>
                    {agent.price}
                  </Badge> */}
                </div>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{agent.rating}</span>
                    <span className="text-muted-foreground">({agent.reviews} reviews)</span>
                  </div>
                  <Badge variant="outline">{agent.category}</Badge>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {agent.description}
                </p>
                {agent.tags && agent.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {agent.tags.map((tag, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button 
                onClick={() => navigate(`/agents/${agent?.id}/run`)}
                size="lg" 
                className="px-8 bg-gradient-to-r from-[#FF620A] to-[#993B06] hover:from-[#993B06] hover:to-[#FF620A] border-none"
              >
                <Play className="h-4 w-4 mr-2" />
                Run Agent
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Button variant="outline" size="lg" onClick={handleTryDemo}>
                <TestTube className="h-4 w-4 mr-2" />
                Try Demo
              </Button>
              <Button variant="outline" size="lg" onClick={() => setShowShareModal(true)}>
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={handleSaveAgent}
                className={isSaved ? 'border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20' : ''}
              >
                <Heart className={`h-4 w-4 mr-2 ${isSaved ? 'fill-current' : ''}`} />
                {isSaved ? 'Saved' : 'Save'}
              </Button>
            </div>



            {/* Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="demo">Demo</TabsTrigger>
                <TabsTrigger value="integrations">Integrations</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Sample Output */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Zap className="h-5 w-5 mr-2 text-blue-600" />
                      Sample Output
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted/50 rounded-lg p-4 border-l-4 border-blue-500">
                      <p className="italic text-foreground">
                        {agent?.sampleOutput || "These sleek Wireless Earbuds ZX100 deliver crystal-clear 8 hours of immersive, noise-canceling audio with premium comfort design, perfect for both workouts and daily commutes."}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* How it Works */}
                <Card>
                  <CardHeader>
                    <CardTitle>How it Works</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {agent?.howitWorks?.map((step) => (
                        <div key={step.id} className="flex items-start space-x-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium">{step.id}</div>
                          <div>
                            <h4 className="font-medium">{step.title}</h4>
                            <p className="text-sm text-muted-foreground">{step.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Features */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                      Key Features
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(agent?.features || [
                        // 'SEO Optimization',
                        // 'Multi-language Support',
                        // 'Bulk Processing',
                        // 'Real-time Updates',
                        // 'Custom Templates',
                        // 'Performance Analytics'
                      ]).map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="demo" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Interactive Demo</CardTitle>
                    <CardDescription>
                      Try the agent with sample data to see how it works
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted/30 rounded-lg p-8 text-center">
                      <Play className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-medium mb-2">Interactive Demo Available</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Test this agent with your own data
                      </p>
                      <Button onClick={handleTryDemo} className='!bg-black text-white border-none hover:bg-gray-700'>
                        <TestTube className="h-4 w-4 mr-2" />
                        Launch Demo
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="integrations" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Supported Integrations</CardTitle>
                    <CardDescription>
                      Connect with your favorite tools and platforms
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {integrations.map((integration, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{integration.logo}</span>
                            <span className="font-medium">{integration.name}</span>
                          </div>
                          <Badge variant={integration.status === 'Available' ? 'default' : 'secondary'}>
                            {integration.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                <div className="space-y-4">
                  {sampleReviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={review.avatar} alt={review.name} />
                            <AvatarFallback>{review.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="font-medium">{review.name}</span>
                              <div className="flex items-center space-x-1">
                                {[...Array(review.rating)].map((_, i) => (
                                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                              <span className="text-sm text-muted-foreground">{review.date}</span>
                            </div>
                            <p className="text-muted-foreground">{review.content}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Setup Time</span>
                  </div>
                  <span className="text-sm font-medium">{agent?.setupTime || '5 minutes'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Active Users</span>
                  </div>
                  <span className="text-sm font-medium">{(agent?.activeUsers || agent?.reviews || 0).toLocaleString()}+</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Security</span>
                  </div>
                  <span className="text-sm font-medium">{agent?.security || 'Enterprise'}</span>
                </div>
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card>
              <CardHeader>
                <CardTitle>Pricing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center p-4 bg-gradient-to-r from-[#FF620A] to-[#993B06] dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg border">
                  <p className="text-sm text-black mb-1">Starting at</p>
                  <p className="text-3xl font-bold">{agent.price}</p>
                  {agent.price !== 'Free' && (
                    <p className="text-xs text-black">7-day free trial included</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Documentation
                </Button>
                <Button variant="outline" className="w-full">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      <Dialog open={showShareModal} onOpenChange={setShowShareModal}>
        <DialogContent className="w-[95vw] max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center ">
              <Share className="h-5 w-5 mr-2" />
              Share Agent
            </DialogTitle>
            <DialogDescription>
              Share {agent?.name} with others
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Input
                readOnly
                value={agent ? `${window.location.origin}/agents/${agent.id}` : ''}
                className="flex-1 text-sm"
              />
              <Button
                size="sm"
                onClick={() => copyToClipboard(agent ? `${window.location.origin}/agents/${agent.id}` : '')}
                className="flex-shrink-0 !bg-black border-none"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => shareOnSocial('twitter')}
                className="flex-1"
              >
                <Twitter className="h-4 w-4 mr-2" />
                Twitter
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => shareOnSocial('linkedin')}
                className="flex-1"
              >
                <Linkedin className="h-4 w-4 mr-2" />
                LinkedIn
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => shareOnSocial('facebook')}
                className="flex-1"
              >
                <Facebook className="h-4 w-4 mr-2" />
                Facebook
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => shareOnSocial('email')}
                className="flex-1"
              >
                <Mail className="h-4 w-4 mr-2" />
                Email
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Demo Modal */}
      <Dialog open={showDemoModal} onOpenChange={setShowDemoModal}>
        <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <TestTube className="h-5 w-5 mr-2" />
              Try {agent?.name} Demo
            </DialogTitle>
            <DialogDescription>
              Experience the agent's capabilities with this interactive demo
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[70vh] pr-4">
            <div className="space-y-6">
              {/* Demo Input */}
              <div>
                <Label htmlFor="demo-input" className="text-sm font-medium">
                  Input Data
                </Label>
                <Textarea
                  id="demo-input"
                  placeholder={
                    agent?.name?.includes('Smart') || agent?.category === 'Content Generation'
                      ? 'Enter product details to generate optimized description...'
                      : agent?.name?.includes('Price') || agent?.category === 'Sales Optimization'
                      ? 'Enter product price and competitor prices...'
                      : 'Enter your test data here...'
                  }
                  value={demoInput}
                  onChange={(e) => setDemoInput(e.target.value)}
                  className="mt-2"
                  rows={4}
                />
              </div>

              {/* Demo Controls */}
              <div className="flex items-center space-x-3">
                <Button 
                  onClick={handleRunDemo} 
                  disabled={isRunningDemo || !demoInput.trim()}
                  className="flex-1 !bg-gray-600 hover:bg-gray-700 text-white"
                >
                  {isRunningDemo ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Run Demo
                    </>
                  )}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setDemoInput('')
                    setDemoOutput('')
                  }}
                >
                  Clear
                </Button>
              </div>

              {/* Demo Output */}
              {demoOutput && (
                <div>
                  <Label className="text-sm font-medium">Output</Label>
                  <div className="mt-2 p-4 bg-muted/50 rounded-lg border">
                    <p className="text-sm leading-relaxed">{demoOutput}</p>
                  </div>
                  <div className="flex space-x-2 mt-3">
                    <Button variant="outline" size="sm" onClick={() => copyToClipboard(demoOutput)}>
                      <Copy className="h-3 w-3 mr-1" />
                      Copy
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-3 w-3 mr-1" />
                      Export
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  )
}