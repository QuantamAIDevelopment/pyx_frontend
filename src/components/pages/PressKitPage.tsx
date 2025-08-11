// 'use client'

// import { useState } from 'react'
// import { Button } from '../common/ui/button'
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../common/ui/card'
// import { Badge } from '../common/ui/badge'
// // import { Input } from '../common/ui/input'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '../common/ui/tabs'
// import { Avatar, AvatarFallback, AvatarImage } from '../common/ui/avatar'
// import { Separator } from '../common/ui/separator'
// import { 
//   Download,

//   Image as ImageIcon,
  
//   Calendar,
//   Mail,
//   Phone,
//   ExternalLink,
//   Copy,
//   CheckCircle,
//   Users,
//   // Building,
//   // Globe,
//   Newspaper,
//   Camera,
//   Trophy,
//   // Target,
//   TrendingUp,
//   DollarSign,
//   // Briefcase,
//   Clock,
//   // Star,
//   // Rocket,
//   // Zap,
//   // Eye,
//   // Share2,
//   // BookOpen,
//   Mic,
//   // Monitor,
//   // Smartphone,
//   // Palette,
//   // Package,
//   // BarChart,
//   // Shield,
//   // Heart,
//   // Lightbulb,
//   // Crown,
//   // Gem,
//   // Sparkles
// } from 'lucide-react'

// interface PressKitPageProps {
//   onViewChange: (view: string) => void
//   isLoggedIn: boolean
//   onShowAuth: (mode: 'login' | 'signup') => void
// }

// export function PressKitPage({ onViewChange }: PressKitPageProps) {
//   const [copiedText, setCopiedText] = useState<string | null>(null)

//   const companyFacts = {
//     founded: '2022',
//     headquarters: 'San Francisco, CA',
//     employees: '120+',
//     funding: '$50M Series B',
//     customers: '10,000+',
//     workflows: '1M+',
//     integrations: '50+',
//     uptime: '99.9%'
//   }

//   const executiveTeam = [
//     {
//       name: 'Sarah Chen',
//       title: 'CEO & Co-Founder',
//       bio: 'Former VP of Engineering at Google, Sarah leads PYX with a vision to democratize AI automation. She holds a PhD in Computer Science from Stanford and has 15+ years of experience in AI and machine learning.',
//       avatar: '/api/placeholder/150/150',
//       linkedin: 'https://linkedin.com/in/sarahchen',
//       twitter: '@sarahchen',
//       email: 'sarah@PYX.ai'
//     },
//     {
//       name: 'Marcus Rodriguez',
//       title: 'CTO & Co-Founder',
//       bio: 'Previously Principal Engineer at Meta, Marcus architected PYX\'s core platform. He specializes in distributed systems and has led engineering teams at scale for over 12 years.',
//       avatar: '/api/placeholder/150/150',
//       linkedin: 'https://linkedin.com/in/marcusrodriguez',
//       twitter: '@marcusrtech',
//       email: 'marcus@PYX.ai'
//     },
//     {
//       name: 'Emma Thompson',
//       title: 'VP of Product',
//       bio: 'Former Product Director at Stripe, Emma drives product strategy at PYX. She has a proven track record of building developer-first products that scale to millions of users.',
//       avatar: '/api/placeholder/150/150',
//       linkedin: 'https://linkedin.com/in/emmathompson',
//       twitter: '@emmathompson',
//       email: 'emma@PYX.ai'
//     },
//     {
//       name: 'David Kim',
//       title: 'VP of Business Development',
//       bio: 'Previously at Salesforce Ventures, David leads partnerships and business development. He has extensive experience in enterprise software and strategic alliances.',
//       avatar: '/api/placeholder/150/150',
//       linkedin: 'https://linkedin.com/in/davidkim',
//       twitter: '@davidkim',
//       email: 'david@PYX.ai'
//     }
//   ]

//   const pressReleases = [
//     {
//       date: '2024-01-15',
//       title: 'PYX Announces Major Platform Update with Advanced AI Capabilities',
//       summary: 'New features include custom node development, enterprise security suite, and enhanced workflow templates.',
//       link: '#',
//       category: 'Product Update'
//     },
//     {
//       date: '2023-12-01',
//       title: 'PYX Raises $50M Series B to Accelerate AI Automation Platform',
//       summary: 'Funding round led by Sequoia Capital with participation from existing investors to expand global operations.',
//       link: '#',
//       category: 'Funding'
//     },
//     {
//       date: '2023-10-20',
//       title: 'PYX Surpasses 10,000 Active Users Milestone',
//       summary: 'Platform growth driven by enterprise adoption and developer community engagement.',
//       link: '#',
//       category: 'Milestone'
//     },
//     {
//       date: '2023-09-15',
//       title: 'PYX Launches Integration Marketplace with 50+ Supported Platforms',
//       summary: 'New marketplace enables seamless connections with popular business tools and e-commerce platforms.',
//       link: '#',
//       category: 'Product Launch'
//     },
//     {
//       date: '2023-08-01',
//       title: 'PYX Wins "Best AI Platform" at TechCrunch Disrupt 2023',
//       summary: 'Recognition for innovation in democratizing AI automation for businesses of all sizes.',
//       link: '#',
//       category: 'Award'
//     }
//   ]

//   const mediaCoverage = [
//     {
//       date: '2024-01-20',
//       publication: 'TechCrunch',
//       title: 'How PYX is Making AI Automation Accessible to Every Business',
//       author: 'Sarah Perez',
//       link: '#',
//       logo: '/api/placeholder/60/30'
//     },
//     {
//       date: '2024-01-10',
//       publication: 'Forbes',
//       title: 'The Future of Work: AI Automation Platforms Leading the Change',
//       author: 'John Smith',
//       link: '#',
//       logo: '/api/placeholder/60/30'
//     },
//     {
//       date: '2023-12-15',
//       publication: 'Wired',
//       title: 'Inside PYX: Building the Operating System for AI Workflows',
//       author: 'Jane Doe',
//       link: '#',
//       logo: '/api/placeholder/60/30'
//     },
//     {
//       date: '2023-11-30',
//       publication: 'VentureBeat',
//       title: 'PYX\'s No-Code Approach to AI is Transforming Business Operations',
//       author: 'Mike Johnson',
//       link: '#',
//       logo: '/api/placeholder/60/30'
//     },
//     {
//       date: '2023-11-15',
//       publication: 'The Information',
//       title: 'PYX Emerges as Leader in Enterprise AI Automation Space',
//       author: 'Lisa Wang',
//       link: '#',
//       logo: '/api/placeholder/60/30'
//     }
//   ]

//   const brandAssets = [
//     {
//       category: 'Logos',
//       description: 'PYX logos in various formats and configurations',
//       assets: [
//         { name: 'PYX Logo - Primary (PNG)', size: '2.1 MB', format: 'PNG', dimensions: '2000x600px' },
//         { name: 'PYX Logo - Primary (SVG)', size: '45 KB', format: 'SVG', dimensions: 'Vector' },
//         { name: 'PYX Logo - White (PNG)', size: '1.8 MB', format: 'PNG', dimensions: '2000x600px' },
//         { name: 'PYX Logo - Icon Only (PNG)', size: '890 KB', format: 'PNG', dimensions: '512x512px' },
//         { name: 'PYX Logo - Horizontal (PNG)', size: '1.5 MB', format: 'PNG', dimensions: '1200x400px' }
//       ]
//     },
//     {
//       category: 'Product Screenshots',
//       description: 'High-resolution screenshots of PYX platform',
//       assets: [
//         { name: 'Dashboard Overview', size: '3.2 MB', format: 'PNG', dimensions: '1920x1080px' },
//         { name: 'Workflow Builder Interface', size: '2.8 MB', format: 'PNG', dimensions: '1920x1080px' },
//         { name: 'Agent Marketplace', size: '2.5 MB', format: 'PNG', dimensions: '1920x1080px' },
//         { name: 'Developer Mode', size: '3.1 MB', format: 'PNG', dimensions: '1920x1080px' },
//         { name: 'Mobile Application', size: '1.8 MB', format: 'PNG', dimensions: '1080x1920px' }
//       ]
//     },
//     {
//       category: 'Executive Photos',
//       description: 'Professional headshots of PYX leadership team',
//       assets: [
//         { name: 'Sarah Chen - CEO (High-res)', size: '2.4 MB', format: 'JPG', dimensions: '2000x2000px' },
//         { name: 'Marcus Rodriguez - CTO (High-res)', size: '2.2 MB', format: 'JPG', dimensions: '2000x2000px' },
//         { name: 'Emma Thompson - VP Product (High-res)', size: '2.3 MB', format: 'JPG', dimensions: '2000x2000px' },
//         { name: 'Leadership Team Group Photo', size: '4.1 MB', format: 'JPG', dimensions: '3000x2000px' }
//       ]
//     },
//     {
//       category: 'Brand Guidelines',
//       description: 'Complete brand guidelines and style guide',
//       assets: [
//         { name: 'PYX Brand Guidelines (PDF)', size: '8.5 MB', format: 'PDF', dimensions: 'Document' },
//         { name: 'Color Palette Guide', size: '1.2 MB', format: 'PDF', dimensions: 'Document' },
//         { name: 'Typography Guidelines', size: '950 KB', format: 'PDF', dimensions: 'Document' }
//       ]
//     }
//   ]

//   const awards = [
//     {
//       year: '2023',
//       award: 'Best AI Platform',
//       organization: 'TechCrunch Disrupt',
//       description: 'Recognized for innovation in democratizing AI automation'
//     },
//     {
//       year: '2023',
//       award: 'Developer Choice Award',
//       organization: 'Product Hunt',
//       description: 'Top-rated developer tool with 4.8/5 stars'
//     },
//     {
//       year: '2023',
//       award: 'Rising Star in AI',
//       organization: 'AI Excellence Awards',
//       description: 'Outstanding contribution to AI accessibility'
//     },
//     {
//       year: '2022',
//       award: 'Best Startup',
//       organization: 'Y Combinator Demo Day',
//       description: 'Most promising startup in AI/ML category'
//     }
//   ]

//   const milestones = [
//     { date: '2024-01', milestone: 'Launched Advanced Workflow Automation', description: '1M+ workflows executed monthly' },
//     { date: '2023-12', milestone: 'Series B Funding - $50M', description: 'Led by Sequoia Capital' },
//     { date: '2023-10', milestone: '10,000+ Active Users', description: 'Reached enterprise scale' },
//     { date: '2023-06', milestone: 'Integration Marketplace Launch', description: '50+ platform integrations' },
//     { date: '2023-03', milestone: 'Series A Funding - $15M', description: 'Led by Andreessen Horowitz' },
//     { date: '2022-12', milestone: 'Developer Mode Beta Launch', description: 'Advanced workflow builder' },
//     { date: '2022-08', milestone: 'Seed Funding - $3M', description: 'Initial funding round' },
//     { date: '2022-06', milestone: 'Company Founded', description: 'PYX AI Agents Marketplace established' }
//   ]

//   const copyToClipboard = (text: string, type: string) => {
//     navigator.clipboard.writeText(text)
//     setCopiedText(type)
//     setTimeout(() => setCopiedText(null), 2000)
//   }

//   const downloadAsset = (assetName: string) => {
//     // In a real implementation, this would trigger the actual download
//     console.log(`Downloading: ${assetName}`)
//   }

//   const downloadAllAssets = () => {
//     // In a real implementation, this would create and download a ZIP file
//     console.log('Downloading complete press kit')
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Hero Section */}
//       <section className="py-20 bg-gradient-to-br from-[#FFE8DC] via-[#FFD4BD] to-[#FCD2BD]

//  dark:from-blue-950/20 dark:via-purple-950/20 dark:to-pink-950/20">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center max-w-4xl mx-auto">
//             <Badge className="mb-6 bg-gradient-to-r from-[#FF620A] to-[#993B06] text-white">
//               <Newspaper className="h-3 w-3 mr-1" />
//               Press Kit
//             </Badge>
//             <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
//               PYX{' '}
//               <span className="bg-gradient-to-r from-[#FF620A] to-[#993B06] bg-clip-text text-transparent">
//                 Press Kit
//               </span>
//             </h1>
//             <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
//               Download high-resolution assets, company information, and media resources. 
//               Everything you need to cover the future of AI automation.
//             </p>
            
//             <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-lg mx-auto">
//               <Button 
//                 size="lg" 
//                 className="bg-gradient-to-r from-[#FF620A] to-[#993B06] w-full sm:w-auto"
//                 onClick={downloadAllAssets}
//               >
//                 <Download className="h-4 w-4 mr-2" />
//                 Download Complete Kit
//               </Button>
//               <Button 
//                 variant="outline" 
//                 size="lg"
//                 className="w-full sm:w-auto"
//                 onClick={() => onViewChange('contact')}
//               >
//                 <Mail className="h-4 w-4 mr-2" />
//                 Media Contact
//               </Button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Quick Facts */}
//       <section className="py-16 bg-background">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold mb-4">Company at a Glance</h2>
//             <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//               Key facts and figures about PYX AI Agents Marketplace
//             </p>
//           </div>

//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 px-20">
//             <div className="text-center">
//               <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-[#FF620A] to-[#993B06] mx-auto mb-4">
//                 <Calendar className="h-6 w-6 text-white" />
//               </div>
//               <div className="text-2xl md:text-3xl font-bold mb-2">{companyFacts.founded}</div>
//               <div className="font-medium text-foreground mb-1 text-sm md:text-base">Founded</div>
//               <div className="text-xs md:text-sm text-muted-foreground">San Francisco</div>
//             </div>
//             <div className="text-center">
//               <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-blue-600 mx-auto mb-4">
//                 <Users className="h-6 w-6 text-white" />
//               </div>
//               <div className="text-2xl md:text-3xl font-bold mb-2">{companyFacts.employees}</div>
//               <div className="font-medium text-foreground mb-1 text-sm md:text-base">Employees</div>
//               <div className="text-xs md:text-sm text-muted-foreground">Global team</div>
//             </div>
//             <div className="text-center">
//               <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 mx-auto mb-4">
//                 <DollarSign className="h-6 w-6 text-white" />
//               </div>
//               <div className="text-2xl md:text-3xl font-bold mb-2">{companyFacts.funding}</div>
//               <div className="font-medium text-foreground mb-1 text-sm md:text-base">Total Funding</div>
//               <div className="text-xs md:text-sm text-muted-foreground">Series B</div>
//             </div>
//             <div className="text-center">
//               <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-red-600 mx-auto mb-4">
//                 <TrendingUp className="h-6 w-6 text-white" />
//               </div>
//               <div className="text-2xl md:text-3xl font-bold mb-2">{companyFacts.customers}</div>
//               <div className="font-medium text-foreground mb-1 text-sm md:text-base">Active Users</div>
//               <div className="text-xs md:text-sm text-muted-foreground">Growing daily</div>
//             </div>
//           </div>

//           {/* Additional Stats */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-8 px-20">
//             <div className="text-center">
//               <div className="text-lg font-bold text-blue-600">{companyFacts.workflows}</div>
//               <div className="text-sm text-muted-foreground">Workflows Executed</div>
//             </div>
//             <div className="text-center">
//               <div className="text-lg font-bold text-green-600">{companyFacts.integrations}</div>
//               <div className="text-sm text-muted-foreground">Platform Integrations</div>
//             </div>
//             <div className="text-center">
//               <div className="text-lg font-bold text-purple-600">{companyFacts.uptime}</div>
//               <div className="text-sm text-muted-foreground">Platform Uptime</div>
//             </div>
//             <div className="text-center">
//               <div className="text-lg font-bold text-orange-600">24/7</div>
//               <div className="text-sm text-muted-foreground">Customer Support</div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Main Content */}
//       <section className="py-20 bg-gray-50 dark:bg-gray-800">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <Tabs defaultValue="assets" className="w-full">
//             <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-6 mb-12">
//               <TabsTrigger value="assets" className="text-xs sm:text-sm">Assets</TabsTrigger>
//               <TabsTrigger value="company" className="text-xs sm:text-sm">Company</TabsTrigger>
//               <TabsTrigger value="executives" className="text-xs sm:text-sm">Leadership</TabsTrigger>
//               <TabsTrigger value="press" className="text-xs sm:text-sm">Press</TabsTrigger>
//               <TabsTrigger value="awards" className="text-xs sm:text-sm">Awards</TabsTrigger>
//               <TabsTrigger value="timeline" className="text-xs sm:text-sm">Timeline</TabsTrigger>
//             </TabsList>

//             {/* Brand Assets */}
//             <TabsContent value="assets">
//               <div className="space-y-8 px-20">
//                 <div className="text-center mb-8">
//                   <h2 className="text-3xl font-bold mb-4">Brand Assets</h2>
//                   <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//                     Download high-quality logos, screenshots, and brand materials
//                   </p>
//                 </div>
             
//                 {brandAssets.map((category, index) => (
//                   <Card key={index}>
//                     <CardHeader>
//                       <CardTitle className="flex items-center gap-2 ">
//                         <ImageIcon className="h-5 w-5" />
//                         {category.category}
//                       </CardTitle>
//                       <CardDescription>{category.description}</CardDescription>
//                     </CardHeader>
//                     <CardContent>
//                       <div className="grid gap-4">
//                         {category.assets.map((asset, assetIndex) => (
//                           <div key={assetIndex} className="flex items-center justify-between p-4 border rounded-lg">
//                             <div className="flex-1">
//                               <h4 className="font-medium">{asset.name}</h4>
//                               <p className="text-sm text-muted-foreground">
//                                 {asset.format} • {asset.size} • {asset.dimensions}
//                               </p>
//                             </div>
//                             <Button
//                               variant="outline"
//                               size="sm"
//                               onClick={() => downloadAsset(asset.name)}
//                             >
//                               <Download className="h-4 w-4 mr-1" />
//                               Download
//                             </Button>
//                           </div>
//                         ))}
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             </TabsContent>

//             {/* Company Information */}
//             <TabsContent value="company">
//               <div className="space-y-8">
//                 <div className="text-center mb-8">
//                   <h2 className="text-3xl font-bold mb-4">Company Information</h2>
//                   <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//                     Key information and messaging about PYX
//                   </p>
//                 </div>

//                 <div className="grid md:grid-cols-2 gap-8">
//                   <Card>
//                     <CardHeader>
//                       <CardTitle>Company Overview</CardTitle>
//                     </CardHeader>
//                     <CardContent className="space-y-4">
//                       <div>
//                         <h4 className="font-medium mb-2">Mission Statement</h4>
//                         <p className="text-sm text-muted-foreground">
//                           To democratize AI automation and empower every business to build intelligent workflows that drive growth and efficiency.
//                         </p>
//                       </div>
//                       <div>
//                         <h4 className="font-medium mb-2">Company Description</h4>
//                         <p className="text-sm text-muted-foreground">
//                           PYX is the leading AI agents marketplace that enables businesses to create, deploy, and manage intelligent automation workflows without requiring technical expertise. Our platform combines the power of artificial intelligence with an intuitive no-code interface, making advanced automation accessible to organizations of all sizes.
//                         </p>
//                       </div>
//                       <div>
//                         <h4 className="font-medium mb-2">Value Proposition</h4>
//                         <p className="text-sm text-muted-foreground">
//                           Reduce operational costs by up to 60%, increase productivity by 3x, and scale your business operations with AI-powered automation that works 24/7.
//                         </p>
//                       </div>
//                     </CardContent>
//                   </Card>

//                   <Card>
//                     <CardHeader>
//                       <CardTitle>Quick Copy</CardTitle>
//                       <CardDescription>Ready-to-use descriptions for media</CardDescription>
//                     </CardHeader>
//                     <CardContent className="space-y-4">
//                       <div>
//                         <div className="flex items-center justify-between mb-2">
//                           <h4 className="font-medium">Short Description (50 words)</h4>
//                           <Button
//                             variant="ghost"
//                             size="sm"
//                             onClick={() => copyToClipboard("PYX is the leading AI agents marketplace that democratizes automation for businesses. Our no-code platform enables companies to create intelligent workflows using pre-built AI agents, reducing costs by 60% and increasing productivity 3x.", "short")}
//                           >
//                             {copiedText === "short" ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
//                           </Button>
//                         </div>
//                         <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded">
//                           PYX is the leading AI agents marketplace that democratizes automation for businesses. Our no-code platform enables companies to create intelligent workflows using pre-built AI agents, reducing costs by 60% and increasing productivity 3x.
//                         </p>
//                       </div>

//                       <div>
//                         <div className="flex items-center justify-between mb-2">
//                           <h4 className="font-medium">Medium Description (100 words)</h4>
//                           <Button
//                             variant="ghost"
//                             size="sm"
//                             onClick={() => copyToClipboard("PYX AI Agents Marketplace is revolutionizing business automation by making artificial intelligence accessible to everyone. Founded in 2022 by former Google and Meta executives, PYX provides a comprehensive platform where businesses can discover, customize, and deploy AI agents for various operational needs. With over 10,000 active users and $50M in Series B funding, PYX has processed over 1 million workflows, helping companies reduce operational costs by up to 60% while increasing productivity threefold. The platform features 50+ integrations with popular business tools and supports both no-code and developer-friendly customization options.", "medium")}
//                           >
//                             {copiedText === "medium" ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
//                           </Button>
//                         </div>
//                         <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded">
//                           PYX AI Agents Marketplace is revolutionizing business automation by making artificial intelligence accessible to everyone. Founded in 2022 by former Google and Meta executives, PYX provides a comprehensive platform where businesses can discover, customize, and deploy AI agents for various operational needs. With over 10,000 active users and $50M in Series B funding, PYX has processed over 1 million workflows, helping companies reduce operational costs by up to 60% while increasing productivity threefold. The platform features 50+ integrations with popular business tools and supports both no-code and developer-friendly customization options.
//                         </p>
//                       </div>

//                       <div>
//                         <h4 className="font-medium mb-2">Key Statistics</h4>
//                         <div className="grid grid-cols-2 gap-2 text-sm">
//                           <div className="bg-muted/50 p-2 rounded">10,000+ Active Users</div>
//                           <div className="bg-muted/50 p-2 rounded">$50M Series B Funding</div>
//                           <div className="bg-muted/50 p-2 rounded">1M+ Workflows Executed</div>
//                           <div className="bg-muted/50 p-2 rounded">50+ Platform Integrations</div>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </div>
//               </div>
//             </TabsContent>

//             {/* Executive Team */}
//             <TabsContent value="executives">
//               <div className="space-y-8">
//                 <div className="text-center mb-8">
//                   <h2 className="text-3xl font-bold mb-4">Executive Team</h2>
//                   <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//                     Meet the leadership team driving PYX's mission
//                   </p>
//                 </div>

//                 <div className="grid md:grid-cols-2 gap-8">
//                   {executiveTeam.map((executive, index) => (
//                     <Card key={index}>
//                       <CardContent className="p-6">
//                         <div className="flex gap-4 mb-4">
//                           <Avatar className="h-20 w-20">
//                             <AvatarImage src={executive.avatar} alt={executive.name} />
//                             <AvatarFallback>{executive.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
//                           </Avatar>
//                           <div>
//                             <h3 className="font-bold text-lg">{executive.name}</h3>
//                             <p className="text-blue-600 font-medium">{executive.title}</p>
//                             <div className="flex gap-2 mt-2">
//                               <Button variant="outline" size="sm" asChild>
//                                 <a href={executive.linkedin} target="_blank" rel="noopener noreferrer">
//                                   <ExternalLink className="h-3 w-3" />
//                                 </a>
//                               </Button>
//                               <Button
//                                 variant="outline"
//                                 size="sm"
//                                 onClick={() => copyToClipboard(executive.email, `email-${index}`)}
//                               >
//                                 {copiedText === `email-${index}` ? <CheckCircle className="h-3 w-3" /> : <Mail className="h-3 w-3" />}
//                               </Button>
//                             </div>
//                           </div>
//                         </div>
//                         <p className="text-sm text-muted-foreground">{executive.bio}</p>
//                       </CardContent>
//                     </Card>
//                   ))}
//                 </div>
//               </div>
//             </TabsContent>

//             {/* Press Releases */}
//             <TabsContent value="press">
//               <div className="space-y-8">
//                 <div className="text-center mb-8">
//                   <h2 className="text-3xl font-bold mb-4">Press Releases & Coverage</h2>
//                   <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//                     Latest news and media coverage about PYX
//                   </p>
//                 </div>

//                 <div className="grid gap-8">
//                   <Card>
//                     <CardHeader>
//                       <CardTitle>Recent Press Releases</CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                       <div className="space-y-4">
//                         {pressReleases.map((release, index) => (
//                           <div key={index} className="border-b last:border-b-0 pb-4 last:pb-0">
//                             <div className="flex items-start justify-between gap-4">
//                               <div className="flex-1">
//                                 <div className="flex items-center gap-2 mb-2">
//                                   <Badge variant="outline">{release.category}</Badge>
//                                   <span className="text-sm text-muted-foreground">
//                                     {new Date(release.date).toLocaleDateString('en-US', {
//                                       year: 'numeric',
//                                       month: 'long',
//                                       day: 'numeric'
//                                     })}
//                                   </span>
//                                 </div>
//                                 <h4 className="font-semibold mb-2">{release.title}</h4>
//                                 <p className="text-sm text-muted-foreground">{release.summary}</p>
//                               </div>
//                               <Button variant="outline" size="sm">
//                                 <ExternalLink className="h-4 w-4 mr-1" />
//                                 Read More
//                               </Button>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </CardContent>
//                   </Card>

//                   <Card>
//                     <CardHeader>
//                       <CardTitle>Media Coverage</CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                       <div className="space-y-4">
//                         {mediaCoverage.map((coverage, index) => (
//                           <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
//                             <div className="flex items-center gap-4">
//                               <div className="w-16 h-8 bg-muted rounded flex items-center justify-center">
//                                 <span className="text-xs font-medium">{coverage.publication}</span>
//                               </div>
//                               <div>
//                                 <h4 className="font-medium">{coverage.title}</h4>
//                                 <p className="text-sm text-muted-foreground">
//                                   By {coverage.author} • {new Date(coverage.date).toLocaleDateString()}
//                                 </p>
//                               </div>
//                             </div>
//                             <Button variant="outline" size="sm">
//                               <ExternalLink className="h-4 w-4" />
//                             </Button>
//                           </div>
//                         ))}
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </div>
//               </div>
//             </TabsContent>

//             {/* Awards */}
//             <TabsContent value="awards">
//               <div className="space-y-8">
//                 <div className="text-center mb-8">
//                   <h2 className="text-3xl font-bold mb-4">Awards & Recognition</h2>
//                   <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//                     Industry recognition and achievements
//                   </p>
//                 </div>

//                 <div className="grid md:grid-cols-2 gap-6">
//                   {awards.map((award, index) => (
//                     <Card key={index} className="hover:shadow-lg transition-all duration-300">
//                       <CardContent className="p-6">
//                         <div className="flex items-start gap-4">
//                           <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-yellow-500 to-orange-600">
//                             <Trophy className="h-6 w-6 text-white" />
//                           </div>
//                           <div className="flex-1">
//                             <div className="flex items-center gap-2 mb-2">
//                               <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
//                                 {award.year}
//                               </Badge>
//                             </div>
//                             <h3 className="font-bold text-lg mb-1">{award.award}</h3>
//                             <p className="font-medium text-blue-600 mb-2">{award.organization}</p>
//                             <p className="text-sm text-muted-foreground">{award.description}</p>
//                           </div>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   ))}
//                 </div>
//               </div>
//             </TabsContent>

//             {/* Company Timeline */}
//             <TabsContent value="timeline">
//               <div className="space-y-8">
//                 <div className="text-center mb-8">
//                   <h2 className="text-3xl font-bold mb-4">Company Timeline</h2>
//                   <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//                     Key milestones in PYX's journey
//                   </p>
//                 </div>

//                 <div className="relative">
//                   <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 to-purple-600"></div>
//                   <div className="space-y-8">
//                     {milestones.map((milestone, index) => (
//                       <div key={index} className="relative flex items-start gap-6">
//                         <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-[#FF620A] to-[#993B06]
//  text-white text-sm font-bold z-10">
//                           {index + 1}
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <div className="flex items-center gap-3 mb-2">
//                             <Badge variant="outline">{milestone.date}</Badge>
//                           </div>
//                           <h3 className="font-bold text-lg mb-1">{milestone.milestone}</h3>
//                           <p className="text-sm text-muted-foreground">{milestone.description}</p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </TabsContent>
//           </Tabs>
//         </div>
//       </section>

//       {/* Media Contact */}
//       <section className="py-20 bg-background">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <Card className="max-w-4xl mx-auto">
//             <CardHeader className="text-center">
//               <CardTitle className="text-2xl">Media Contact</CardTitle>
//               <CardDescription>
//                 For press inquiries, interviews, or additional information
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="grid md:grid-cols-2 gap-8">
//                 <div className="space-y-4">
//                   <h3 className="font-semibold">Press & Media Inquiries</h3>
//                   <div className="space-y-3">
//                     <div className="flex items-center gap-3">
//                       <Mail className="h-5 w-5 text-muted-foreground" />
//                       <div>
//                         <p className="font-medium">press@PYX.ai</p>
//                         <p className="text-sm text-muted-foreground">General press inquiries</p>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <Phone className="h-5 w-5 text-muted-foreground" />
//                       <div>
//                         <p className="font-medium">+1 (415) 555-0123</p>
//                         <p className="text-sm text-muted-foreground">Media hotline</p>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <Clock className="h-5 w-5 text-muted-foreground" />
//                       <div>
//                         <p className="font-medium">9 AM - 6 PM PST</p>
//                         <p className="text-sm text-muted-foreground">Response time: 24 hours</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="space-y-4">
//                   <h3 className="font-semibold">Executive Interviews</h3>
//                   <div className="space-y-3">
//                     <div className="flex items-center gap-3">
//                       <Users className="h-5 w-5 text-muted-foreground" />
//                       <div>
//                         <p className="font-medium">executives@PYX.ai</p>
//                         <p className="text-sm text-muted-foreground">Leadership interviews</p>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <Mic className="h-5 w-5 text-muted-foreground" />
//                       <div>
//                         <p className="font-medium">Available for:</p>
//                         <p className="text-sm text-muted-foreground">Podcasts, conferences, panels</p>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <Camera className="h-5 w-5 text-muted-foreground" />
//                       <div>
//                         <p className="font-medium">Video/Photo shoots</p>
//                         <p className="text-sm text-muted-foreground">On-site or remote</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <Separator className="my-6" />

//               <div className="text-center">
//                 <h3 className="font-semibold mb-4">Social Media</h3>
//                 <div className="flex justify-center gap-4">
//                   <Button variant="outline" size="sm">
//                     <ExternalLink className="h-4 w-4 mr-1" />
//                     Twitter
//                   </Button>
//                   <Button variant="outline" size="sm">
//                     <ExternalLink className="h-4 w-4 mr-1" />
//                     LinkedIn
//                   </Button>
//                   <Button variant="outline" size="sm">
//                     <ExternalLink className="h-4 w-4 mr-1" />
//                     YouTube
//                   </Button>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 bg-gradient-to-r from-[#FF620A] to-[#993B06]
//  text-white">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center max-w-3xl mx-auto">
//             <h2 className="text-3xl sm:text-4xl font-bold mb-6">
//               Ready to Cover Our Story?
//             </h2>
//             <p className="text-xl mb-8 opacity-90">
//               Download our complete press kit or reach out for custom assets and exclusive interviews.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-lg mx-auto">
//               <Button 
//                 size="lg" 
//                 variant="secondary"
//                 className="w-full sm:w-auto"
//                 onClick={downloadAllAssets}
//               >
//                 <Download className="h-4 w-4 mr-2" />
//                 Download Press Kit
//               </Button>
//               <Button 
//                 size="lg" 
//                 variant="outline" 
//                 className="border-white text-black hover:bg-white hover:text-primary w-full sm:w-auto"
//                 onClick={() => onViewChange('contact')}
//               >
//                 <Mail className="h-4 w-4 mr-2" />
//                 Contact Media Team
//               </Button>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   )
// }