'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '../common/ui/dialog'
import { Button } from '../common/ui/button'
import { Input } from '../common/ui/input'
import { Label } from '../common/ui/label'
import { Separator } from '../common/ui/separator'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '../common/ui/tabs'
import { Github, Mail, Eye, EyeOff, Zap } from 'lucide-react'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  mode: 'login' | 'signup'
  onModeChange: (mode: 'login' | 'signup') => void
  onLogin: () => void
}

export function AuthModal({
  isOpen,
  onClose,
  mode,
  onModeChange,
  onLogin
}: AuthModalProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onLogin()
  }

  const handleSocialLogin = (provider: string) => {
  console.log(`Logging in with ${provider}...`);
  onLogin()
}

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: ''
    })
    setShowPassword(false)
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            {/* <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-[#FF620A] to-[#993B06]">
              <Zap className="h-5 w-5 text-white" />
            </div> */}
            {/* <span className="text-xl font-bold bg-gradient-to-r from-[#FF620A] to-[#993B06] bg-clip-text text-transparent">
              PYX
            </span> */}
             <img src='./assets/logo.png' width={70} height={50} alt='' className='ml-0 ' />
          </div>
          <DialogTitle>
            {mode === 'login' ? 'Welcome Back' : 'Create Your Account'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'login'
              ? 'Sign in to access your AI agent dashboard'
              : 'Start your journey with AI automation today'}
          </DialogDescription>
        </DialogHeader>

        <Tabs
          value={mode}
          onValueChange={(value) => onModeChange(value as 'login' | 'signup')}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          {/* --- LOGIN FORM --- */}
          <TabsContent value="login" className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-md border border-gary-200 bg-white hover:bg-accent shadow-md "
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Button variant="link" className="px-0 text-sm">
                  Forgot password?
                </Button>
              </div>

              <Button type="submit" className="w-full !bg-black text-white border-none">
                Sign In
              </Button>
            </form>
          </TabsContent>

          {/* --- SIGNUP FORM --- */}
          <TabsContent value="signup" className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <div className="relative">
                  <Input
                    id="signup-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-md  border border-gary-200 bg-white hover:bg-accent shadow-md"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value
                    })
                  }
                  required
                />
              </div>

              <Button type="submit" className="w-full !bg-black text-white border-none">
                Create Account
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            onClick={() => handleSocialLogin('google')}
            className="w-full"
          >
            <Mail className="h-4 w-4 mr-2" />
            Google
          </Button>
          <Button
            variant="outline"
            onClick={() => handleSocialLogin('github')}
            className="w-full"
          >
            <Github className="h-4 w-4 mr-2" />
            GitHub
          </Button>
        </div>

        <div className="text-center text-xs text-muted-foreground">
          By continuing, you agree to our{' '}
          <Button variant="link" className="px-0 text-xs">
            Terms of Service
          </Button>{' '}
          and{' '}
          <Button variant="link" className="px-0 text-xs">
            Privacy Policy
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
