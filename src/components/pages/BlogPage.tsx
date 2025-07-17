'use client'

import { Badge } from '../common/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../common/ui/card'
import { Button } from '../common/ui/button'
import { Input } from '../common/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '../common/ui/avatar'
import { Calendar, Clock, Search, Tag } from 'lucide-react'


interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
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
  featured?: boolean
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of AI Agents in E-commerce: Trends and Predictions for 2024',
    excerpt: 'Discover how AI agents are revolutionizing online retail and what to expect in the coming year.',
    content: '',
    author: {
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1e1?w=40&h=40&fit=crop&crop=face',
      role: 'AI Research Lead'
    },
    publishedAt: '2024-01-15',
    readTime: '8 min read',
    category: 'Industry Insights',
    tags: ['AI', 'E-commerce', 'Trends', 'Future'],
    thumbnail: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop',
    featured: true
  },
  {
    id: '2',
    title: 'How SmartSummarizer Increased Conversion Rates by 40%: A Case Study',
    excerpt: 'Learn how TechGear Pro transformed their product descriptions with AI-powered content generation.',
    content: '',
    author: {
      name: 'Michael Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      role: 'Product Manager'
    },
    publishedAt: '2024-01-12',
    readTime: '6 min read',
    category: 'Case Study',
    tags: ['SmartSummarizer', 'Conversion', 'Case Study'],
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop'
  },
  {
    id: '3',
    title: 'Dynamic Pricing with AI: Best Practices and Implementation Guide',
    excerpt: 'A comprehensive guide to implementing AI-powered dynamic pricing strategies for maximum profitability.',
    content: '',
    author: {
      name: 'Emily Watson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      role: 'Business Analyst'
    },
    publishedAt: '2024-01-10',
    readTime: '12 min read',
    category: 'Tutorial',
    tags: ['Pricing', 'AI', 'Strategy', 'Implementation'],
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop'
  },
  {
    id: '4',
    title: 'Customer Support Automation: Balancing AI Efficiency with Human Touch',
    excerpt: 'Explore how to implement AI customer support while maintaining personalized customer experiences.',
    content: '',
    author: {
      name: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      role: 'Customer Success Lead'
    },
    publishedAt: '2024-01-08',
    readTime: '7 min read',
    category: 'Best Practices',
    tags: ['Customer Support', 'Automation', 'AI'],
    thumbnail: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=600&h=400&fit=crop'
  },
  {
    id: '5',
    title: 'Inventory Management Revolution: AI-Powered Demand Forecasting',
    excerpt: 'How StockSense is helping businesses optimize inventory levels and reduce costs through predictive analytics.',
    content: '',
    author: {
      name: 'Lisa Thompson',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face',
      role: 'Operations Director'
    },
    publishedAt: '2024-01-05',
    readTime: '9 min read',
    category: 'Technology',
    tags: ['Inventory', 'Forecasting', 'AI', 'Optimization'],
    thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop'
  },
  {
    id: '6',
    title: 'Getting Started with QAID: Your First AI Agent Implementation',
    excerpt: 'A step-by-step guide for businesses new to AI agents, from setup to seeing your first results.',
    content: '',
    author: {
      name: 'James Wilson',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&crop=face',
      role: 'Solutions Architect'
    },
    publishedAt: '2024-01-03',
    readTime: '5 min read',
    category: 'Getting Started',
    tags: ['Tutorial', 'Setup', 'Beginner'],
    thumbnail: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop'
  }
]

const categories = ['All', 'Industry Insights', 'Case Study', 'Tutorial', 'Best Practices', 'Technology', 'Getting Started']

interface BlogPageProps {
  onPostSelect: (post: BlogPost) => void
}

export function BlogPage({ onPostSelect }: BlogPageProps) {
  const featuredPost = blogPosts.find(post => post.featured)
  const regularPosts = blogPosts.filter(post => !post.featured)

  return (
    <div className="min-h-screen ">
      <div className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              QAID Blog
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Insights, tutorials, and case studies on AI automation and business transformation.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 px-20">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative shadow-md rounded ">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search articles..."
                  className="pl-10"
                />
              </div>
              <div className='shadow-md rounded'>
              <Button variant="outline">
                <Tag className="h-4 w-4 mr-2 " />
                All Categories
              </Button>
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge key={category} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          {/* Featured Post */}
          <div className='px-20'>
          {featuredPost && (
            
            <Card 
              className="mb-12 overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 "
              onClick={() => onPostSelect(featuredPost)}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 ">
                <div className="aspect-video lg:aspect-square">
                  <img 
                    src={featuredPost.thumbnail} 
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 lg:p-8 flex flex-col justify-center">
                  <Badge className="w-fit mb-4 bg-gradient-to-r from-[#FF620A] to-[#993B06] text-white">
                    Featured
                  </Badge>
                  <h2 className="text-2xl lg:text-3xl font-bold mb-4 hover:text-primary transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={featuredPost.author.avatar} alt={featuredPost.author.name} />
                        <AvatarFallback>{featuredPost.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <span>{featuredPost.author.name}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(featuredPost.publishedAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{featuredPost.readTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}
          </div>

          {/* Regular Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-20">
            {regularPosts.map((post) => (
              <Card 
                key={post.id} 
                className="overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 group"
                onClick={() => onPostSelect(post)}
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={post.thumbnail} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{post.category}</Badge>
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-4">
                  <CardDescription className="line-clamp-3 mb-4">
                    {post.excerpt}
                  </CardDescription>
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={post.author.avatar} alt={post.author.name} />
                      <AvatarFallback>{post.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="text-sm">
                      <p className="font-medium">{post.author.name}</p>
                      <p className="text-xs text-muted-foreground">{new Date(post.publishedAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Articles
            </Button>
          </div>
        </div>
      </div>

    </div>
  )
}