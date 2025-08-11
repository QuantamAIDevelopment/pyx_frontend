'use client'

import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '../common/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../common/ui/tabs'
import { 
  Zap, 
  Upload,
  Code2,
  GitBranch,
  TestTube,
  // Bot,
  // Activity,
  // TrendingUp,
  // Wallet,
  // CreditCard,
  // Eye,
  // Globe,
  // Copy,
  // MoreHorizontal,
  // Play,
  // Settings,
  // ExternalLink
} from 'lucide-react'
import { OverviewTab } from '../dashboard/OverviewTab'
import { AgentsTab } from '../dashboard/AgentsTab'
import { WalletTab } from '../dashboard/WalletTab'
import { APIsTab } from '../dashboard/APIsTab'
import { AnalyticsTab } from '../dashboard/AnalyticsTab'

interface DashboardProps {
  userWallet: {
    balance: number
    currency: string
  }
  onCreateAgent: () => void
  onAgentBuilder: () => void
  onViewWorkflows: () => void
  onUploadAgent: () => void
  onViewProfile: () => void
  onTestingLab: () => void
  onGenerateApp: () => void
  onManageAPI: (apiData: any) => void
  onAnalytics: (apiData: any) => void
  onViewAgentDetail: (agentData: any) => void
  onRunAgent: (agentData: any) => void
}



export function Dashboard({ userWallet, onAgentBuilder, onViewWorkflows, onUploadAgent, onViewProfile, onTestingLab, onManageAPI, onAnalytics, onViewAgentDetail, onRunAgent,onGenerateApp}: DashboardProps) {
  const { tab } = useParams<{ tab: string }>()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')

  // Valid tab values
  const validTabs = ['overview', 'agents', 'apis', 'wallet', 'analytics']

  useEffect(() => {
    if (tab && validTabs.includes(tab)) {
      setActiveTab(tab)
    } else if (tab && !validTabs.includes(tab)) {
      // Redirect to overview if invalid tab
      navigate('/dashboard/overview', { replace: true })
    }
  }, [tab, navigate])

  const handleTabChange = (newTab: string) => {
    navigate(`/dashboard/${newTab}`)
  }
  return (
    <div className="min-h-screen py-8 px-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Manage your AI agents and monitor performance</p>
          </div>
          
          <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
            <Button onClick={onAgentBuilder} className="!bg-brand-primary border-none">
              <Zap className="h-4 w-4 mr-2" />
              Build Agent
            </Button>
            {/* <Button onClick={onCreateAgent} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Create Agent
            </Button> */}
            <Button variant="outline" onClick={onViewWorkflows}>
              <GitBranch className="h-4 w-4 mr-2" />
              Link Agents
            </Button>
            <Button variant="outline" onClick={onTestingLab}>
              <TestTube className="h-4 w-4 mr-2" />
              Testing Lab
            </Button>
            <Button variant="outline" onClick={onUploadAgent}>
              <Upload className="h-4 w-4 mr-2" />
              Upload Agent
            </Button>
            <Button variant="outline" onClick={onGenerateApp}>
              <Code2 className="h-4 w-4 mr-2" />
              Generate App
            </Button>

            
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="agents">My Agents</TabsTrigger>
            <TabsTrigger value="apis">My APIs</TabsTrigger>
            <TabsTrigger value="wallet">Wallet</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <OverviewTab 
              userWallet={userWallet}
              onAgentBuilder={onAgentBuilder}
              onViewWorkflows={onViewWorkflows}
              onUploadAgent={onUploadAgent}
              onViewProfile={onViewProfile}
              onTestingLab={onTestingLab}
              onGenerateApp={onGenerateApp}
            />
          </TabsContent>

          <TabsContent value="agents" className="space-y-6">
            <AgentsTab 
              onViewAgentDetail={onViewAgentDetail}
              onRunAgent={onRunAgent}
              onTestingLab={onTestingLab}
            />
          </TabsContent>

          <TabsContent value="wallet" className="space-y-6">
            <WalletTab userWallet={userWallet} />
          </TabsContent>

          <TabsContent value="apis" className="space-y-6">
            <APIsTab 
              onManageAPI={onManageAPI}
              onAnalytics={onAnalytics}
              onAgentBuilder={onAgentBuilder}
            />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <AnalyticsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}