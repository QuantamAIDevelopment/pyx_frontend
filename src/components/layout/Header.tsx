'use client'

import { Link, useLocation } from 'react-router-dom'
import {  Menu, X, LayoutDashboard, Store, BookOpen, Phone, Plus, Bell, Wallet, TestTube, User, Code2, Info } from 'lucide-react'
import { Button } from '../common/ui/button'
import { Badge } from '../common/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '../common/ui/avatar'
import { Switch } from '../common/ui/switch'
import { Label } from '../common/ui/label'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../common/ui/dropdown-menu'
import { useState } from 'react'


export type ViewType = 'landing' | 'home' | 'agents' | 'agent-detail' | 'active-agents' | '' | 'agent-api-access' | 'dashboard' | 'blog' | 'blog-post' | 'contact' | 'about' | 'create-agent' | 'workflow-builder' | 'upload-agent' | 'profile' | 'testing-lab' | 'developer-mode' | 'pricing' | 'integrations' | 'api-docs' | 'documentation' | 'community-forum' | 'github-issues' | 'premium-support' | 'changelog' | 'careers' | 'apply' | 'press' | 'help' | 'community' | 'tutorials' | 'case-studies' | 'webinars' | 'privacy' | 'terms' | 'cookies' | 'gdpr' | 'security'

export type Mode = 'user' | 'developer'

interface HeaderProps {
  // currentView: ViewType
  // onViewChange: (view: ViewType) => void
  currentMode: Mode
  onModeToggle: (mode: Mode) => void
  isLoggedIn: boolean
  onLogin: () => void
  onLogout: () => void
  userWallet?: {
    balance: number
    currency: string
  }
}

export function Header({ 
  // currentView, 
  // onViewChange, 
  currentMode,
  onModeToggle,
  isLoggedIn, 
  onLogin, 
  onLogout,
  userWallet 
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    ...(isLoggedIn 
      ? [{ id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' }]
      : [{ id: 'landing', label: 'Home', icon: null, path: '/' }]
    ),
    { id: 'agents', label: 'Agents', icon: Store, path: '/agents' },
    { id: 'about', label: 'About', icon: Info, path: '/about' },
    { id: 'blog', label: 'Blog', icon: BookOpen, path: '/blog' },
    { id: 'contact', label: 'Contact', icon: Phone, path: '/contact' },
  ]

  const unreadNotifications = 3 // Mock unread count

  // Check if current path matches nav item
  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 ml-0 ">
            {/* <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-[#FF620A] to-[#993B06]">
              <Zap className="h-5 w-5 text-white" />
            </div> */}
            {/* <span className="text-xl font-bold bg-gradient-to-r from-[#FF620A] to-[#993B06] bg-clip-text text-transparent">
              PYX
            </span> */}
            <img src='./assets/logo.png' width={60} height={50} alt='' className='ml-0 ' />
          </Link>


          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
  {navItems.map((item) => {
    const IconComponent = item.icon
    const isItemActive = isActive(item.path)

    return (
      <Link key={item.id} to={item.path}>
        <Button
          variant={isItemActive ? 'ghost' : 'ghost'} 
          className={`flex items-center space-x-2 ${
            isItemActive ? '!bg-black !text-white hover:!bg-black border-none '  : ''
          } !focus:ring-0 !focus:ring-transparent !focus-visible:outline-none`}
        >
          {IconComponent && <IconComponent className="h-4 w-4" />}
          <span>{item.label}</span>
        </Button>
      </Link>
    )
  })}
</nav>


          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {isLoggedIn ? (
              <>
                {/* Mode Toggle */}
                <div className="flex items-center space-x-2 px-2 py-1.5 bg-gray-100 rounded-lg">
                  <div className="flex items-center space-x-1">
                    <User className="h-3 w-3 text-muted-foreground" />
                    <Label className="text-xs">User</Label>
                  </div>
                  <Switch
                    checked={currentMode === 'developer'}
                    onCheckedChange={(checked) => onModeToggle(checked ? 'developer' : 'user')}
                    className=" bg-gray-300"
                  />
                  <div className="flex items-center space-x-1 ">
                    <Code2 className="h-3 w-3 text-muted-foreground " />
                    <Label className="text-xs">Dev</Label>
                  </div>
                  {currentMode === 'developer' && (
                    <Badge className="
bg-gradient-to-r from-[#FF620A] to-[#993B06]
 text-white text-xs px-1 py-0">
                      BETA
                    </Badge>
                  )}
                </div>

                {/* Action Buttons Group */}
                <div className="flex items-center space-x-2">
                  {/* Create Agent Button */}
                  <Link to={currentMode === 'developer' ? '/developer-mode' : '/agents/create'}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-gradient-to-r from-[#FF620A] to-[#993B06] text-white border-0 hover:from-[#FF620A]-700 hover:to-[#993B06]-700 border-none"
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      <span className="hidden lg:inline ">
                        {currentMode === 'developer' ? 'Dev Mode' : 'Create'}
                      </span>
                    </Button>
                  </Link>

                  {/* Wallet Display */}
                  {userWallet && (
                    <Link to="/profile">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center space-x-1"
                      >
                        <Wallet className="h-3 w-3" />
                        <span className="text-xs">Rs{userWallet.balance.toFixed(2)}</span>
                      </Button>
                    </Link>
                  )}

                  {/* Notifications */}
                  <Link to="/profile">
                    <Button
                      variant="outline"
                      size="icon"
                      className="relative h-8 w-8"
                    >
                      <Bell className="h-3 w-3" />
                      {unreadNotifications > 0 && (
                        <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs bg-red-500 text-white">
                          {unreadNotifications}
                        </Badge>
                      )}
                    </Button>
                  </Link>

                  {/* User Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-8 w-8 rounded-full p-0">
                        <Avatar className="h-7 w-7">
                          <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" alt="User" />
                          <AvatarFallback className="text-xs">JD</AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">PYX</p>
                          <p className="text-xs leading-none text-muted-foreground">
                            pyx@pyxnetwork.com
                          </p>
                          <Badge className={`mt-1 w-fit text-xs  ${
                            currentMode === 'developer' 
                              ? 'bg-gradient-to-r from-[#FF620A] to-[#993B06]text-white'
                              : 'bg-gradient-to-r from-[#993B06] to-[#FF620A] text-white'
                          }`}>
                            {currentMode === 'developer' ? 'Developer Mode' : 'User Mode'}
                          </Badge>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/dashboard" className="flex items-center">
                          <LayoutDashboard className="mr-2 h-4 w-4" />
                          <span>Dashboard</span>
                        </Link>
                      </DropdownMenuItem>
                      {currentMode === 'developer' && (
                        <DropdownMenuItem asChild>
                          <Link to="/developer-mode" className="flex items-center">
                            <Code2 className="mr-2 h-4 w-4" />
                            <span>Developer Mode</span>
                          </Link>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem asChild>
                        <Link to="/testing-lab" className="flex items-center">
                          <TestTube className="mr-2 h-4 w-4" />
                          <span>Testing Lab</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/profile" className="flex items-center">
                          <span>Profile & Settings</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/agents/upload" className="flex items-center">
                          <span>Upload Agent</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/workflows" className="flex items-center">
                          <span>Workflow Builder</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={onLogout}>
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Theme Toggle */}
                {/* Removed theme toggle */}
              </>
            ) : (
              <>
                {/* Removed theme toggle for non-logged users */}
                
                {/* Sign In Button */}
                <Button onClick={onLogin} className='!bg-black border-none'>
                  Sign In
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t py-4">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => {
                const IconComponent = item.icon
                return (
                  <Link 
                    key={item.id}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button 
                      variant={isActive(item.path) ? 'default' : 'ghost'}
                      className="flex items-center justify-start space-x-2 w-full"
                    >
                      {IconComponent && <IconComponent className="h-4 w-4" />}
                      <span>{item.label}</span>
                    </Button>
                  </Link>
                )
              })}
              
              {isLoggedIn && (
                <>
                  {/* Mode Toggle Mobile */}
                  <div className="flex items-center justify-between px-2 py-2">
                    <span className="text-sm font-medium">Mode</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs">User</span>
                      <Switch
                        checked={currentMode === 'developer'}
                        onCheckedChange={(checked) => onModeToggle(checked ? 'developer' : 'user')}
                      />
                      <span className="text-xs">Developer</span>
                    </div>
                  </div>

                  <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                    <Button 
                      variant={isActive('/dashboard') ? 'default' : 'ghost'}
                      className="flex items-center justify-start space-x-2 w-full"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      <span>Dashboard</span>
                    </Button>
                  </Link>

                  {currentMode === 'developer' && (
                    <Link to="/developer-mode" onClick={() => setMobileMenuOpen(false)}>
                      <Button 
                        variant={isActive('/developer-mode') ? 'default' : 'ghost'}
                        className="flex items-center justify-start space-x-2 w-full"
                      >
                        <Code2 className="h-4 w-4" />
                        <span>Developer Mode</span>
                      </Button>
                    </Link>
                  )}

                  <Link to="/testing-lab" onClick={() => setMobileMenuOpen(false)}>
                    <Button 
                      variant={isActive('/testing-lab') ? 'default' : 'ghost'}
                      className="flex items-center justify-start space-x-2 w-full"
                    >
                      <TestTube className="h-4 w-4" />
                      <span>Testing Lab</span>
                    </Button>
                  </Link>

                  <Link 
                    to={currentMode === 'developer' ? '/developer-mode' : '/agents/create'}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button 
                      className="flex items-center justify-start space-x-2 w-full bg-gradient-to-r from-[#FF620A] to-[#993B06]"
                    >
                      <Plus className="h-4 w-4" />
                      <span>{currentMode === 'developer' ? 'Developer Mode' : 'Create Agent'}</span>
                    </Button>
                  </Link>

                  {userWallet && (
                    <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                      <Button 
                        variant="outline"
                        className="flex items-center justify-start space-x-2 w-full"
                      >
                        <Wallet className="h-4 w-4" />
                        <span>Wallet: ${userWallet.balance.toFixed(2)}</span>
                      </Button>
                    </Link>
                  )}
                </>
              )}
              
              <div className="flex items-center justify-between pt-4 border-t">
                {/* Removed theme toggle */}
                
                {isLoggedIn ? (
                  <Button variant="outline" onClick={() => {
                    onLogout()
                    setMobileMenuOpen(false)
                  }}>
                    Sign Out
                  </Button>
                ) : (
                  <Button onClick={() => {
                    onLogin()
                    setMobileMenuOpen(false)
                  }}>
                    Sign In
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}