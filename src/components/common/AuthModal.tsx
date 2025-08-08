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
import { Mail, Eye, EyeOff, ArrowLeft } from 'lucide-react'

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
  const [showOtpModal, setShowOtpModal] = useState(false)
  const [otp, setOtp] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  })

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      return 'Password must be at least 8 characters long.'
    }
    if (!/[A-Z]/.test(password)) {
      return 'Must include at least one uppercase letter.'
    }
    if (!/[a-z]/.test(password)) {
      return 'Must include at least one lowercase letter.'
    }
    if (!/[0-9]/.test(password)) {
      return 'Must include at least one number.'
    }
    if (!/[!@#$%^&*]/.test(password)) {
      return 'Must include at least one special character (!@#$%^&*).'
    }
    return ''
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (mode === 'signup') {
      const error = validatePassword(formData.password)
      if (error) {
        setPasswordError(error)
        return
      } else {
        setPasswordError('')
      }
      if (formData.password !== formData.confirmPassword) {
        setConfirmPasswordError('Passwords do not match.')
        return
      } else {
        setConfirmPasswordError('')
      }
      setShowOtpModal(true)
    } else {
      onLogin()
    }
  }

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('OTP submitted:', otp)
    setShowOtpModal(false)
    setOtp('')
    onModeChange('login')
    resetForm()
  }

  const handleSocialLogin = (provider: string) => {
    console.log(`Logging in with ${provider}...`)
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
    setOtp('')
    setPasswordError('')
    setShowOtpModal(false)
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <img src="./assets/logo.png" width={70} height={50} alt="" />
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
            onValueChange={(value) =>
              onModeChange(value as 'login' | 'signup')
            }
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            {/* LOGIN */}
            <TabsContent value="login" className="space-y-2">
              <form onSubmit={handleSubmit} className="space-y-2">
                <div className="space-y-0.5">
                  <Label htmlFor="email" className="text-xs">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className="h-8 text-sm"
                  />
                </div>

                <div className="space-y-0.5">
                  <Label htmlFor="password" className="text-xs">
                    Password
                  </Label>
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
                      className="pr-10 h-8 text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-0 top-1/2 -translate-y-1/2 p-1 rounded-md border border-gray-200 bg-white hover:bg-accent shadow-md"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-5 w-4 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Button variant="link" className="px-0 text-xs">
                    Forgot password?
                  </Button>
                </div>

                <Button
                  type="submit"
                  className="w-full !bg-black text-white border-none h-8 text-sm"
                >
                  Sign In
                </Button>
              </form>
            </TabsContent>

            {/* SIGNUP */}
            <TabsContent
              value="signup"
              className="space-y-2 max-h-[300px] overflow-y-auto"
            >
              <form onSubmit={handleSubmit} className="space-y-2">
                <div className="space-y-0.5">
                  <Label htmlFor="name" className="text-xs">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="h-8 text-sm"
                  />
                </div>

                <div className="space-y-0.5">
                  <Label htmlFor="signup-email" className="text-xs">
                    Email
                  </Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className="h-8 text-sm"
                  />
                </div>

                <div className="space-y-0.5">
                  <Label htmlFor="signup-password" className="text-xs">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="signup-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={(e) => {
                        const value = e.target.value
                        setFormData({ ...formData, password: value })
                        const error = validatePassword(value)
                        setPasswordError(error)
                        // Also check confirm password live
                        if (formData.confirmPassword && value !== formData.confirmPassword) {
                          setConfirmPasswordError('Passwords do not match.')
                        } else {
                          setConfirmPasswordError('')
                        }
                      }}
                      required
                      className="pr-10 h-8 text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-0 top-1/2 -translate-y-1/2 p-1 rounded-md border border-gray-200 bg-white hover:bg-accent shadow-md"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-5 w-4 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                  {passwordError && (
                    <p className="text-xs text-red-500 mt-1">
                      {passwordError}
                    </p>
                  )}
                </div>

                <div className="space-y-0.5">
                  <Label htmlFor="confirm-password" className="text-xs">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value
                      })
                      if (mode === 'signup' && e.target.value && e.target.value !== formData.password) {
                        setConfirmPasswordError('Passwords do not match.')
                      } else {
                        setConfirmPasswordError('')
                      }
                    }}
                    required
                    className="h-8 text-sm"
                  />
                  {confirmPasswordError && formData.confirmPassword && (
                    <p className="text-xs text-red-500 mt-1">
                      {confirmPasswordError}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full !bg-black text-white border-none h-8 mt-1 text-sm"
                >
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

          <div className="grid grid-cols mr-8 ml-8">
            <Button
              variant="outline"
              onClick={() => handleSocialLogin('google')}
              className="w-full"
            >
              <Mail className="h-4 w-4 mr-2" />
              Google
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

      {/* OTP Modal */}
      <Dialog open={showOtpModal} onOpenChange={setShowOtpModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <img src="./assets/logo.png" width={70} height={50} alt="" />
            </div>
            <DialogTitle>Verify Your Email</DialogTitle>
            <DialogDescription>
              We've sent a verification code to{' '}
              <span className="font-medium">{formData.email}</span>
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleOtpSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp">Enter OTP</Label>
              <Input
                id="otp"
                type="text"
                placeholder="Enter 6-digit code"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                className="text-center text-lg tracking-widest"
                required
              />
            </div>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowOtpModal(false)}
                className="flex-1"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Button
                type="submit"
                className="flex-1 !bg-black text-white border-none"
              >
                Verify & Continue
              </Button>
            </div>
          </form>

          <div className="text-center text-xs text-muted-foreground">
            Didn't receive the code?{' '}
            <Button variant="link" className="px-0 text-xs">
              Resend
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
