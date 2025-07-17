'use client'

import { Button } from '../common/ui/button'
import { Badge } from '../common/ui/badge'
import { Separator } from '../common/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '../common/ui/avatar'
import { ArrowLeft, Calendar, Clock, Bookmark, Twitter, Linkedin, Link } from 'lucide-react'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  author: {
    name: string
    avatar: string
    role: string
  }
  publishedAt: string
  readTime: string
  category: string
  tags: string[]
  thumbnail: string
}

interface BlogPostPageProps {
  post: BlogPost | null
  onBack: () => void
}

export function BlogPostPage({ post, onBack }: BlogPostPageProps) {
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Post not found</h2>
          <Button onClick={onBack}>Go Back</Button>
        </div>
      </div>
    )
  }

  const sampleContent = `
    <p>In the rapidly evolving world of e-commerce, artificial intelligence has emerged as a game-changing force that's reshaping how businesses operate, engage with customers, and drive growth. As we look toward 2024, AI agents are becoming increasingly sophisticated, offering unprecedented opportunities for automation and optimization.</p>

    <h2>The Current State of AI in E-commerce</h2>
    <p>Today's AI agents are no longer simple chatbots or basic recommendation engines. They've evolved into sophisticated systems capable of understanding context, learning from interactions, and making complex decisions autonomously. From the SmartSummarizer that crafts compelling product descriptions to PriceOptimizerAI that adjusts pricing in real-time, these agents are becoming integral to business operations.</p>

    <h2>Key Trends Shaping 2024</h2>
    <h3>1. Hyper-Personalization at Scale</h3>
    <p>AI agents are becoming increasingly adept at delivering personalized experiences to individual customers. By analyzing browsing patterns, purchase history, and real-time behavior, these systems can create unique shopping experiences for millions of users simultaneously.</p>

    <h3>2. Predictive Commerce</h3>
    <p>The future of e-commerce lies in anticipating customer needs before they're even expressed. Advanced AI agents like StockSense are already demonstrating how predictive analytics can optimize inventory management and reduce costs by up to 40%.</p>

    <h3>3. Conversational Commerce Evolution</h3>
    <p>Customer support agents like SupportGenie are evolving beyond simple Q&A to become sophisticated sales assistants capable of understanding context, emotion, and intent. They're not just answering questions—they're actively driving conversions.</p>

    <h2>Implementation Strategies for Success</h2>
    <p>For businesses looking to leverage AI agents effectively, the key is to start with clear objectives and gradually expand capabilities. Here are the essential steps:</p>

    <ul>
      <li><strong>Identify High-Impact Use Cases:</strong> Focus on areas where AI can deliver immediate value, such as customer support or inventory management.</li>
      <li><strong>Ensure Data Quality:</strong> AI agents are only as good as the data they're trained on. Invest in data cleaning and organization.</li>
      <li><strong>Plan for Integration:</strong> Consider how AI agents will work with your existing systems and workflows.</li>
      <li><strong>Monitor and Optimize:</strong> Continuously track performance and refine agent capabilities based on real-world results.</li>
    </ul>

    <h2>Looking Ahead: What to Expect</h2>
    <p>As we move through 2024, we can expect to see AI agents become even more sophisticated, with capabilities including:</p>

    <ul>
      <li>Advanced multi-modal understanding (text, images, voice)</li>
      <li>Real-time adaptation to market changes</li>
      <li>Seamless integration across all customer touchpoints</li>
      <li>Enhanced emotional intelligence and empathy</li>
    </ul>

    <h2>Conclusion</h2>
    <p>The future of e-commerce is being written by AI agents today. Businesses that embrace these technologies now will be best positioned to thrive in an increasingly competitive marketplace. The question isn't whether to adopt AI agents, but how quickly you can implement them effectively.</p>

    <p>At QAID, we're committed to making this transition as smooth as possible, providing the tools and support businesses need to harness the full potential of AI automation. The future is here—are you ready to embrace it?</p>
  `

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-6 hover:bg-muted/50"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Blog
        </Button>

        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Badge className="mb-4">{post.category}</Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Author and meta info */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={post.author.avatar} alt={post.author.name} />
                  <AvatarFallback>{post.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{post.author.name}</p>
                  <p className="text-sm text-muted-foreground">{post.author.role}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>

            {/* Share buttons */}
            <div className="flex items-center space-x-3 mb-8">
              <span className="text-sm text-muted-foreground">Share:</span>
              <Button variant="outline" size="sm">
                <Twitter className="h-4 w-4 mr-2" />
                Twitter
              </Button>
              <Button variant="outline" size="sm">
                <Linkedin className="h-4 w-4 mr-2" />
                LinkedIn
              </Button>
              <Button variant="outline" size="sm">
                <Link className="h-4 w-4 mr-2" />
                Copy Link
              </Button>
              <Button variant="outline" size="sm">
                <Bookmark className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
          </div>

          {/* Featured image */}
          <div className="aspect-video mb-8 rounded-lg overflow-hidden">
            <img 
              src={post.thumbnail} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article content */}
          <div className="prose prose-lg max-w-none mb-8">
            <div 
              dangerouslySetInnerHTML={{ __html: sampleContent }}
              className="space-y-6"
            />
          </div>

          {/* Tags */}
          <div className="mb-8">
            <h3 className="font-medium mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <Separator className="mb-8" />

          {/* Author bio */}
          <div className="bg-muted/30 rounded-lg p-6 mb-8">
            <div className="flex items-start space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                <AvatarFallback>{post.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h4 className="font-medium mb-1">{post.author.name}</h4>
                <p className="text-sm text-muted-foreground mb-3">{post.author.role}</p>
                <p className="text-sm leading-relaxed">
                  {post.author.name} is a leading expert in AI automation and e-commerce optimization. 
                  With over 8 years of experience in the field, they have helped hundreds of businesses 
                  transform their operations through intelligent automation.
                </p>
              </div>
            </div>
          </div>

          {/* Call to action */}
          <div className="bg-gradient-to-r from-[#FF620A] to-[#993B06]dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg p-6 text-center">
            <h3 className="font-medium mb-2">Ready to Transform Your Business?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Discover how QAID's AI agents can automate your workflows and boost productivity.
            </p>
            <Button>
              Get Started Free
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}