'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '../common/ui/button'
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../common/ui/card'
import { Badge } from '../common/ui/badge'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '../common/ui/tabs'
import { Separator } from '../common/ui/separator'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '../common/ui/resizable'
import { VisualAgentBuilder } from '../agents/VisualAgentBuilder'
import { CustomNodeDevelopment } from '../agents/CustomNodeDevelopment'
import { DeploymentSettings } from '../pages/DeploymentSettings'
import { TestDebugInterface } from '../common/TestDebugInterface'
import { DeveloperDashboard } from '../layout/DeveloperDashboard'
import {
  Code2,
  Settings,
  TestTube,
  FileCode,
  GitBranch,
  // Zap,
  Wallet,
  Bell,
  // User,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard
} from 'lucide-react'

interface DeveloperModeLayoutProps {
  onBack: () => void
  userWallet: {
    balance: number
    currency: string
  }
}

type DeveloperView = 'builder' | 'custom-nodes' | 'deployment' | 'test-debug' | 'dashboard'

export function DeveloperModeLayout({ userWallet }: DeveloperModeLayoutProps) {
  const [currentView, setCurrentView] = useState<DeveloperView>('dashboard')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [selectedWorkflow, setSelectedWorkflow] = useState<any>(null)

  const sidebarItems = [
    {
      id: 'dashboard' as DeveloperView,
      label: 'Dashboard',
      icon: LayoutDashboard,
      description: 'Agent overview'
    },
    {
      id: 'builder' as DeveloperView,
      label: 'Visual Builder',
      icon: GitBranch,
      description: 'Workflow canvas'
    },
    {
      id: 'custom-nodes' as DeveloperView,
      label: 'Custom Nodes',
      icon: Code2,
      description: 'Node development'
    },
    {
      id: 'deployment' as DeveloperView,
      label: 'Deployment',
      icon: Settings,
      description: 'Configure & deploy'
    },
    {
      id: 'test-debug' as DeveloperView,
      label: 'Test & Debug',
      icon: TestTube,
      description: 'Testing tools'
    }
  ]

  const handleNewAgent = () => {
    setSelectedWorkflow(null) // Clear any existing workflow to start fresh
    setCurrentView('builder') // Navigate to the Visual Agent Builder
  }

  const renderMainContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <DeveloperDashboard onSelectWorkflow={setSelectedWorkflow} onNewAgent={handleNewAgent} />
      case 'builder':
        return <VisualAgentBuilder selectedWorkflow={selectedWorkflow} />
      case 'custom-nodes':
        return <CustomNodeDevelopment />
      case 'deployment':
        return <DeploymentSettings />
      case 'test-debug':
        return <TestDebugInterface />
      default:
        return <VisualAgentBuilder selectedWorkflow={selectedWorkflow} />
    }
  }

  const sidebarRef = useRef<any>(null)

  useEffect(() => {
    if (sidebarRef.current) {
      sidebarRef.current.resize(sidebarCollapsed ? 5 : 20)
    }
  }, [sidebarCollapsed])

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Developer Mode Header */}
      <div className="border-b bg-card/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* <Button variant="ghost" size="sm" onClick={onBack}>
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back
              </Button> */}
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-orange-gradient ">
                  <Code2 className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h1 className="font-semibold">Developer Mode</h1>
                  <p className="text-xs text-muted-foreground">Advanced AI Agent Development</p>
                </div>
              </div>
              <Badge className="bg-brand-orange-gradient text-white">
                Beta
              </Badge>
            </div>

            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <FileCode className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Wallet className="h-4 w-4 mr-2" />
                ₹ {userWallet.balance}
              </Button>
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex-1">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          {/* Sidebar */}
          <ResizablePanel
            ref={sidebarRef}
            defaultSize={20}
            minSize={5}
            maxSize={30}
            className="border-r bg-sidebar"
          >
            <div className="flex flex-col h-full">
              {/* Sidebar Header */}
              <div className="p-4 border-b border-sidebar-border">
                <div className="flex items-center justify-between">
                  {!sidebarCollapsed && (
                    <h2 className="font-medium text-sidebar-foreground">Tools</h2>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                    className="h-8 w-8 text-sidebar-foreground hover:bg-sidebar-accent"
                  >
                    {sidebarCollapsed ? (
                      <ChevronRight className="h-4 w-4" />
                    ) : (
                      <ChevronLeft className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Sidebar Navigation */}
              <div className="flex-1 overflow-y-auto p-2">
                <div className="space-y-1">
                  {sidebarItems.map((item) => {
                    const IconComponent = item.icon
                    return (
                      <Button
                        key={item.id}
                        variant={currentView === item.id ? 'default' : 'ghost'}
                        onClick={() => setCurrentView(item.id)}
                        className={`w-full justify-start h-auto p-3 ${currentView === item.id
                            ? '!bg-black text-white border-none'
                            : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                          }`}
                      >
                        <div className="flex items-center w-full">
                          <IconComponent className="h-4 w-4 flex-shrink-0" />
                          {!sidebarCollapsed && (
                            <div className="ml-3 text-left overflow-hidden">
                              <div className="font-medium truncate">{item.label}</div>
                              <div className="text-xs opacity-70 truncate">{item.description}</div>
                            </div>
                          )}
                        </div>
                      </Button>

                    )
                  })}
                </div>
              </div>

              {/* Sidebar Footer */}
              {!sidebarCollapsed && (
                <div className="p-4 border-t border-sidebar-border">
                  <div className="text-xs text-sidebar-foreground/70">
                    <p>Developer Mode v1.0</p>
                    <p>Built for power users</p>
                  </div>
                </div>
              )}
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Main Content Area */}
          <ResizablePanel defaultSize={80} minSize={50}>
            <div className="h-full">
              {renderMainContent()}
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  )
}