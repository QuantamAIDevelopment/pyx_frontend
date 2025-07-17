'use client'

import { BrowserRouter, Routes, Route, Navigate, useNavigate, useParams, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { PyXPageDetector } from '../common/PyXPageDetector'

// Import all page components
import { LandingPage } from '../pages/LandingPage'
import { AgentListingPage } from '../pages/AgentListingPage'
import { AgentDetailPage } from '../pages/AgentDetailPage'
import { ActiveAgentsPage } from '../pages/ActiveAgentsPage'
import { AgentBuilderFlow } from '../agents/AgentBuilderFlow'
import { AgentAPIAccessPage } from '../pages/AgentAPIAccessPage'
import { APIManagementPage } from '../pages/APIManagementPage'
import { APIAnalyticsPage } from '../pages/APIAnalyticsPage'
import { Dashboard } from '../pages/Dashboard'
import { BlogPage } from '../pages/BlogPage'
import { BlogPostPage } from '../pages/BlogPostPage'
import { ContactPage } from '../pages/ContactPage'
import { AboutPage } from '../pages/AboutPage'
import { PricingPage } from '../pages/PricingPage'
import { IntegrationsPage } from '../pages/IntegrationsPage'
import { APIDocsPage } from '../pages/APIDocsPage'
import { CommunityForumPage } from '../pages/CommunityForumPage'
import { GitHubIssuesPage } from '../pages/GitHubIssuesPage'
import { PremiumSupportPage } from '../pages/PremiumSupportPage'
import { ChangelogPage } from '../pages/ChangelogPage'
import { CareersPage } from '../pages/CareersPage'
import { JobApplicationPage } from '../pages/JobApplicationPage'
// import { PressKitPage } from '../pages/PressKitPage'
import { HelpCenterPage } from '../pages/HelpCenterPage'
import { CommunityPage } from '../pages/CommunityPage'
// import { TutorialsPage } from '../pages/TutorialsPage'
// import { CaseStudiesPage } from '../pages/CaseStudiesPage'
// import { WebinarsPage } from '../pages/WebinarsPage'
import { PrivacyPolicyPage } from '../pages/PrivacyPolicyPage'
import { TermsOfServicePage } from '../pages/TermsOfServicePage'
import { CookiePolicyPage } from '../pages/CookiePolicyPage'
import { GDPRPage } from '../pages/GDPRPage'
import { SecurityPage } from '../pages/SecurityPage'
import { CreateAgentPage } from '../pages/CreateAgentPage'
import { WorkflowBuilder } from '../pages/WorkflowBuilder'
import { UploadAgentPage } from '../pages/UploadAgentPage'
import { ProfilePage } from '../pages/ProfilePage'
import { TestingLabPage } from '../pages/TestingLabPage'
import { DeveloperModeLayout } from './DeveloperModeLayout'
import { Header } from './Header'
import { Footer } from './Footer'
import { AuthModal } from '../common/AuthModal'

// Import additional builder flow components
import { PromptEntryPage } from '../pages/PromptEntryPage'
import { InputExampleSelectionPage } from '../pages/InputExampleSelectionPage'
import { OutputExampleSelectionPage } from '../pages/OutputExampleSelectionPage'
import { CredentialConfigPage } from '../pages/CredentialConfigPage'
import { DeploymentSettings } from '../pages/DeploymentSettings'
import { AgentGenerationOutputPage } from '../pages/AgentGenerationOutputPage'
import { TestDebugInterface } from '../common/TestDebugInterface'
import { CustomNodeDevelopment } from '../agents/CustomNodeDevelopment'
import { VisualAgentBuilder } from '../agents/VisualAgentBuilder'
import { DeveloperDashboard } from '../layout/DeveloperDashboard'
import { RunAgentPage } from '../pages/RunAgentPage';

import { Suspense } from 'react';
import React from 'react';

// Dynamic imports for large pages
const DocumentationPage = React.lazy(() => import('../pages/DocumentationPage').then(m => ({ default: m.DocumentationPage })));
const TutorialsPage = React.lazy(() => import('../pages/TutorialsPage').then(m => ({ default: m.TutorialsPage })));
const CaseStudiesPage = React.lazy(() => import('../pages/CaseStudiesPage').then(m => ({ default: m.CaseStudiesPage })));
const WebinarsPage = React.lazy(() => import('../pages/WebinarsPage').then(m => ({ default: m.WebinarsPage })));

export type Mode = 'user' | 'developer'

// Router-aware wrapper component
function AppRoutes() {
  const navigate = useNavigate()
  const location = useLocation()
  
  // Global state
  const [currentMode, setCurrentMode] = useState<Mode>('user')
  const [selectedAgent, setSelectedAgent] = useState<any>(null)
  const [selectedAPIAgent, setSelectedAPIAgent] = useState<any>(null)
  const [selectedAnalyticsAgent, setSelectedAnalyticsAgent] = useState<any>(null)
  const [selectedAgentDetail, setSelectedAgentDetail] = useState<any>(null)
  const [selectedBlogPost, setSelectedBlogPost] = useState<any>(null)
  const [apiDocsAgent, setApiDocsAgent] = useState<{id: string, name: string} | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')
  const [userWallet, setUserWallet] = useState({
    balance: 15642,
    currency: 'INR'
  })

  useEffect(() => {
    // Check for saved mode preference
    const savedMode = localStorage.getItem('pyx-mode') as Mode
    if (savedMode && (savedMode === 'user' || savedMode === 'developer')) {
      setCurrentMode(savedMode)
    }
  }, [])

  const toggleMode = (mode: Mode) => {
    setCurrentMode(mode)
    localStorage.setItem('pyx-mode', mode)
    
    // Switch to appropriate view based on mode
    if (mode === 'developer' && isLoggedIn) {
      navigate('/developer-mode')
    } else if (mode === 'user' && location.pathname === '/developer-mode') {
      navigate('/dashboard')
    }
  }

  const handleLogin = () => {
    setIsLoggedIn(true)
    setShowAuthModal(false)
    
    // Navigate to appropriate view based on current mode
    if (currentMode === 'developer') {
      navigate('/developer-mode')
    } else {
      navigate('/dashboard')
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    navigate('/')
  }

  const handleAgentSelect = (agent: any) => {
    setSelectedAgent(agent)
    navigate(`/agents/${agent.id}`)
  }

  const handleBlogPostSelect = (post: any) => {
    setSelectedBlogPost(post)
    navigate(`/blog/${post.slug}`)
  }

  const handleUseAPI = (agentData: any) => {
    setSelectedAPIAgent(agentData)
    navigate(`/api/access/${agentData.id}`)
  }

  const handleManageAPI = (apiData: any) => {
    setSelectedAPIAgent(apiData)
    navigate('/api/manage')
  }

  const handleAnalytics = (apiData: any) => {
    setSelectedAnalyticsAgent(apiData)
    navigate('/api/analytics')
  }

  const handleViewAgentDetail = (agentData: any) => {
    setSelectedAgentDetail(agentData)
    navigate(`/agents/${agentData.id}`)
  }

  const handleRunAgent = (agentData: any) => {
    navigate(`/agents/${agentData.id}/run`)
  }

  const handleViewAPIDocs = (agentId: string, agentName: string) => {
    setApiDocsAgent({ id: agentId, name: agentName })
    navigate('/api/docs')
  }

  const showAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode)
    setShowAuthModal(true)
  }

  // Minimal handleViewChange to satisfy required prop types
  const handleViewChange = () => {}

  // Determine whether to show footer based on current route
  const shouldShowFooter = () => {
    const noFooterRoutes = [
      '/dashboard',
      '/agents/active',
      '/agent-builder',
      '/agents/create',
      '/workflows',
      '/agents/upload',
      '/profile',
      '/testing-lab',
      '/developer-mode',
      '/api/manage',
      '/api/analytics',
      '/api/docs',
      '/agents/:id/run' // Add this line to exclude RunAgentPage
    ]
    
    return !noFooterRoutes.some(route => 
      location.pathname === route || 
      location.pathname.startsWith(route + '/') ||
      (route === '/agents/:id/run' && /^\/agents\/[^/]+\/run$/.test(location.pathname)) ||
      location.pathname.startsWith('/api/access/')
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <PyXPageDetector currentPath={location.pathname} />
      <Header 
        currentMode={currentMode}
        onModeToggle={toggleMode}
        isLoggedIn={isLoggedIn}
        onLogin={() => showAuth('login')}
        onLogout={handleLogout}
        userWallet={userWallet}
      />
      
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={
          <LandingPage 
            onExploreAgents={() => navigate('/agents')}
            onGetStarted={() => isLoggedIn ? navigate('/dashboard') : showAuth('signup')}
            onAgentSelect={handleAgentSelect}
            onCreateAgent={() => isLoggedIn ? navigate('/agents/create') : showAuth('signup')}
          />
        } />

        {/* Agent Routes */}
        <Route path="/agents" element={
          <AgentListingPage 
            onAgentSelect={handleAgentSelect}
            isLoggedIn={isLoggedIn}
            onCreateWorkflow={() => navigate('/workflows')}
            onViewActiveAgents={() => navigate('/agents/active')}
            onShowAuth={showAuth}
          />
        } />
        
        {/* This must come FIRST */}
        <Route path="/agents/:id/run" element={
          isLoggedIn ? (
            <RunAgentPage />
          ) : (
            <Navigate to="/" replace />
          )
        } />

        {/* This must come AFTER */}
        <Route path="/agents/:id" element={
          <AgentDetailWrapper 
            onBack={() => navigate('/agents')}
            onActivate={() => {
              if (isLoggedIn) {
                navigate('/agents/active')
              } else {
                showAuth('signup')
              }
            }}
            isLoggedIn={isLoggedIn}
            onShowAuth={showAuth}
            onViewAPIDocs={handleViewAPIDocs}
            selectedAgent={selectedAgent}
            userWallet={userWallet}
            onWalletUpdate={setUserWallet}
            onLogin={handleLogin}
          />
        } />

        {/* Protected Agent Routes */}
        <Route path="/agents/active" element={
          isLoggedIn ? (
            <ActiveAgentsPage 
              onViewChange={handleViewChange}
              isLoggedIn={isLoggedIn}
              onShowAuth={showAuth}
            />
          ) : (
            <Navigate to="/" replace />
          )
        } />

        <Route path="/agents/create" element={
          isLoggedIn ? (
            <CreateAgentPage 
              onBack={() => navigate(-1)}
              onDeploy={(agent: any) => {
                  console.log(agent);
                navigate('/dashboard')
              }}
              onViewAPIDocs={() => navigate('/api/docs')}
              isLoggedIn={isLoggedIn}
              onShowAuth={showAuth}
            />
          ) : (
            <Navigate to="/" replace />
          )
        } />

        <Route path="/agents/upload" element={
          isLoggedIn ? (
            <UploadAgentPage 
              onBack={() => navigate(-1)}
              onUploadComplete={() => navigate('/profile')}
            />
          ) : (
            <Navigate to="/" replace />
          )
        } />

        {/* Agent Builder Flow */}
        <Route path="/agent-builder" element={
          isLoggedIn ? (
            <AgentBuilderFlow 
              onBack={() => navigate('/dashboard')}
              onComplete={(agentConfig) => {
                if (agentConfig.action === 'edit') {
                  navigate('/workflows')
                } else if (agentConfig.action === 'deploy') {
                  navigate('/agents/active')
                }
              }}
              onUseAPI={handleUseAPI}
            />
          ) : (
            <Navigate to="/" replace />
          )
        } />

        <Route path="/agent-builder/prompt" element={
          isLoggedIn ? (
            <PromptEntryPage 
              onBack={() => navigate(-1)} 
              onNext={() => { /* your logic */ }} 
            />
          ) : (
            <Navigate to="/" replace />
          )
        } />

        <Route path="/agent-builder/input-examples" element={
          isLoggedIn ? (
            <InputExampleSelectionPage 
            onBack={() => navigate(-1)} 
            prompt="Sample prompt"
            onNext={() => { /* your logic */ }}
            />
          ) : (
            <Navigate to="/" replace />
          )
        } />

        <Route path="/agent-builder/output-examples" element={
          isLoggedIn ? (
            <OutputExampleSelectionPage
             onBack={() => navigate(-1)} 
            //  prompt="Sample prompt"
             onNext={() => { /* your logic */ }}/>
          ) : (
            <Navigate to="/" replace />
          )
        } />

        <Route path="/agent-builder/credentials" element={
          isLoggedIn ? (
            <CredentialConfigPage
              onBack={() => navigate(-1)}
              inputOption="Sample input"
              outputOption="Sample output"
              onNext={() => { /* your logic */ }}
            />
          ) : (
            <Navigate to="/" replace />
          )
        } />

        <Route path="/agent-builder/deployment" element={
          isLoggedIn ? (
            <DeploymentSettings />
          ) : (
            <Navigate to="/" replace />
          )
        } />

        <Route path="/agent-builder/output" element={
          isLoggedIn ? (
            <AgentGenerationOutputPage 
              prompt="Sample prompt"
              inputOption="Sample input"
              outputOption="Sample output"
              credentials={{}} // your credentials object
              onEdit={() => { /* your logic */ }}
              onDeploy={() => { /* your logic */ }}
              onUseAPI={() => { /* your logic */ }}
              onBack={() => navigate(-1)}
            />
          ) : (
            <Navigate to="/" replace />
          )
        } />

        {/* Dashboard and User Routes */}
        <Route path="/dashboard" element={
          isLoggedIn ? (
            <Dashboard 
              userWallet={userWallet}
              onCreateAgent={() => navigate('/agents/create')}
              onAgentBuilder={() => navigate('/agent-builder')}
              onViewWorkflows={() => navigate('/workflows')}
              onUploadAgent={() => navigate('/agents/upload')}
              onViewProfile={() => navigate('/profile')}
              onTestingLab={() => navigate('/testing-lab')}
              onManageAPI={handleManageAPI}
              onAnalytics={handleAnalytics}
              onViewAgentDetail={handleViewAgentDetail}
              onRunAgent={handleRunAgent}
            />
          ) : (
            <Navigate to="/" replace />
          )
        } />

        <Route path="/profile" element={
          isLoggedIn ? (
            <ProfilePage 
              onBack={() => navigate(-1)}
              userWallet={userWallet}
              onWalletUpdate={setUserWallet}
            />
          ) : (
            <Navigate to="/" replace />
          )
        } />

        <Route path="/workflows" element={
          isLoggedIn ? (
            <WorkflowBuilder 
              onBack={() => navigate(-1)}
              selectedAgent={selectedAgent}
            />
          ) : (
            <Navigate to="/" replace />
          )
        } />

        <Route path="/testing-lab" element={
          isLoggedIn ? (
            <TestingLabPage 
              onBack={() => navigate(-1)}
              selectedAgent={selectedAgent}
              onSelectAgent={setSelectedAgent}
            />
          ) : (
            <Navigate to="/" replace />
          )
        } />

        <Route path="/developer-mode" element={
          isLoggedIn ? (
            <DeveloperModeLayout 
              onBack={() => navigate('/dashboard')}
              userWallet={userWallet}
            />
          ) : (
            <Navigate to="/" replace />
          )
        } />

        {/* Developer Tools */}
        <Route path="/test-debug" element={
          isLoggedIn ? (
            <TestDebugInterface />
          ) : (
            <Navigate to="/" replace />
          )
        } />

        <Route path="/custom-nodes" element={
          isLoggedIn ? (
            <CustomNodeDevelopment  />
          ) : (
            <Navigate to="/" replace />
          )
        } />

        <Route path="/visual-builder" element={
          isLoggedIn ? (
            <VisualAgentBuilder  />
          ) : (
            <Navigate to="/" replace />
          )
        } />

        <Route path="/developer-dashboard" element={
          isLoggedIn ? (
            <DeveloperDashboard onSelectWorkflow={() => { /* your logic here */ }} />
          ) : (
            <Navigate to="/" replace />
          )
        } />

        {/* API Routes */}
        <Route path="/api/access/:agentId" element={
          isLoggedIn ? (
            <AgentAPIAccessPage 
              agentData={selectedAPIAgent}
              onBack={() => navigate(-1)}
            />
          ) : (
            <Navigate to="/" replace />
          )
        } />

        <Route path="/api/manage" element={
          isLoggedIn ? (
            <APIManagementPage 
              apiData={selectedAPIAgent}
              onBack={() => navigate('/dashboard')}
            />
          ) : (
            <Navigate to="/" replace />
          )
        } />

        <Route path="/api/analytics" element={
          isLoggedIn ? (
            <APIAnalyticsPage 
              apiData={selectedAnalyticsAgent}
              onBack={() => navigate('/dashboard')}
            />
          ) : (
            <Navigate to="/" replace />
          )
        } />

        <Route path="/api/docs" element={
          <APIDocsPage 
            onViewChange={handleViewChange}
            isLoggedIn={isLoggedIn}
            onShowAuth={showAuth}
            agentId={apiDocsAgent?.id}
            agentName={apiDocsAgent?.name}
            onBack={() => {
              setApiDocsAgent(null)
              if (selectedAgent || selectedAgentDetail) {
                navigate(-1)
              } else {
                navigate('/dashboard')
              }
            }}
          />
        } />

        {/* Content Pages */}
        <Route path="/blog" element={
          <BlogPage onPostSelect={handleBlogPostSelect} />
        } />
        
        <Route path="/blog/:slug" element={
          <BlogPostWrapper 
            post={selectedBlogPost} 
            onBack={() => navigate('/blog')} 
          />
        } />

        {/* Marketing Pages */}
        <Route path="/about" element={
          <AboutPage 
            onViewChange={handleViewChange}
            isLoggedIn={isLoggedIn}
            onShowAuth={showAuth}
          />
        } />

        <Route path="/pricing" element={
          <PricingPage 
            onViewChange={handleViewChange}
            isLoggedIn={isLoggedIn}
            onShowAuth={showAuth}
          />
        } />

        <Route path="/contact" element={<ContactPage />} />

        <Route path="/integrations" element={
          <IntegrationsPage 
            onViewChange={handleViewChange}
            isLoggedIn={isLoggedIn}
            onShowAuth={showAuth}
          />
        } />

        {/* Documentation and Support */}
        <Route path="/docs" element={
          <Suspense fallback={<div>Loading Documentation...</div>}>
            <DocumentationPage 
              onViewChange={handleViewChange}
              isLoggedIn={isLoggedIn}
              onShowAuth={showAuth}
            />
          </Suspense>
        } />

        <Route path="/help" element={
          <HelpCenterPage 
            onViewChange={handleViewChange}
            isLoggedIn={isLoggedIn}
            onShowAuth={showAuth}
          />
        } />

        <Route path="/support" element={
          <PremiumSupportPage 
            onViewChange={handleViewChange}
            isLoggedIn={isLoggedIn}
            onShowAuth={showAuth}
          />
        } />

        {/* Community Pages */}
        <Route path="/community" element={
          <CommunityPage 
            onViewChange={handleViewChange}
            isLoggedIn={isLoggedIn}
            onShowAuth={showAuth}
          />
        } />

        <Route path="/forum" element={
          <CommunityForumPage 
            onViewChange={handleViewChange}
            isLoggedIn={isLoggedIn}
            onShowAuth={showAuth}
          />
        } />

        <Route path="/github-issues" element={
          <GitHubIssuesPage 
            onViewChange={handleViewChange}
            isLoggedIn={isLoggedIn}
            onShowAuth={showAuth}
          />
        } />

        {/* Content and Learning */}
        <Route path="/tutorials" element={
          <Suspense fallback={<div>Loading Tutorials...</div>}>
            <TutorialsPage 
              onViewChange={handleViewChange}
              isLoggedIn={isLoggedIn}
              onShowAuth={showAuth}
            />
          </Suspense>
        } />

        <Route path="/case-studies" element={
          <Suspense fallback={<div>Loading Case Studies...</div>}>
            <CaseStudiesPage 
              onViewChange={handleViewChange}
              isLoggedIn={isLoggedIn}
              onShowAuth={showAuth}
            />
          </Suspense>
        } />

        <Route path="/webinars" element={
          <Suspense fallback={<div>Loading Webinars...</div>}>
            <WebinarsPage 
              onViewChange={handleViewChange}
              isLoggedIn={isLoggedIn}
              onShowAuth={showAuth}
            />
          </Suspense>
        } />

        <Route path="/changelog" element={
          <ChangelogPage 
            onViewChange={handleViewChange}
            isLoggedIn={isLoggedIn}
            onShowAuth={showAuth}
          />
        } />

        {/* Company Pages */}
        <Route path="/careers" element={
          <CareersPage 
            onViewChange={handleViewChange}
            isLoggedIn={isLoggedIn}
            onShowAuth={showAuth}
          />
        } />

        <Route path="/apply/:jobId" element={
          <JobApplicationWrapper 
            isLoggedIn={isLoggedIn}
            onShowAuth={showAuth}
          />
        } />

        {/* <Route path="/press-kit" element={
          <PressKitPage 
            onViewChange={handleViewChange}
            isLoggedIn={isLoggedIn}
            onShowAuth={showAuth}
          />
        } /> */}

        {/* Legal Pages */}
        <Route path="/privacy" element={
          <PrivacyPolicyPage 
            onViewChange={handleViewChange}
            isLoggedIn={isLoggedIn}
            onShowAuth={showAuth}
          />
        } />

        <Route path="/terms" element={
          <TermsOfServicePage 
            onViewChange={handleViewChange}
          />
        } />

        <Route path="/cookies" element={
          <CookiePolicyPage 
            onViewChange={handleViewChange}
            isLoggedIn={isLoggedIn}
            onShowAuth={showAuth}
          />
        } />

        <Route path="/gdpr" element={
          <GDPRPage 
            onViewChange={handleViewChange}
            isLoggedIn={isLoggedIn}
            onShowAuth={showAuth}
          />
        } />

        <Route path="/security" element={
          <SecurityPage 
            onViewChange={handleViewChange}
            isLoggedIn={isLoggedIn}
            onShowAuth={showAuth}
          />
        } />

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Footer - conditionally rendered based on route */}
      {shouldShowFooter() && (
        <Footer />
      )}

      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        onModeChange={setAuthMode}
        onLogin={handleLogin}
      />
    </div>
  )
}

// Wrapper components for parameter-based routes
function AgentDetailWrapper(props: any) {
  const { id } = useParams()
  
  return (
    <AgentDetailPage 
      {...props}
      agent={props.selectedAgent || { id }}
    />
  )
}

function BlogPostWrapper(props: any) {
  const { slug } = useParams()
  
  return (
    <BlogPostPage 
      {...props}
      post={props.post || { slug }}
    />
  )
}

function JobApplicationWrapper(props: any) {
  const { jobId } = useParams()
  
  return (
    <JobApplicationPage 
      {...props}
      jobId={jobId}
    />
  )
}

// Main Router component
export function Router() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}