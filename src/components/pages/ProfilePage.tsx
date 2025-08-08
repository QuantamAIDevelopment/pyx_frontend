'use client'

import { useState } from 'react'
import { Button } from '../common/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../common/ui/card'
import { Input } from '../common/ui/input'
import { Label } from '../common/ui/label'
import { Textarea } from '../common/ui/textarea'
import { Switch } from '../common/ui/switch'
import { Badge } from '../common/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../common/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '../common/ui/avatar'
import { Separator } from '../common/ui/separator'
import { 
  ArrowLeft, 
  Key, 
  Bell, 
  CreditCard, 
  User, 
  Settings,
  Copy,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  CheckCircle,
  AlertCircle,
  Info,
  Wallet,
  X
} from 'lucide-react'

// Types
interface APIKey {
  id: string
  name: string
  key: string
  created: string
  lastUsed: string
  permissions: string[]
  isVisible: boolean
}

interface Notification {
  id: string
  type: 'info' | 'warning' | 'success' | 'error'
  title: string
  message: string
  date: string
  read: boolean
}

interface ProfilePageProps {
  onBack: () => void
  userWallet: {
    balance: number
    currency: string
  }
  onWalletUpdate: (wallet: any) => void
}

// Mock Data
const mockAPIKeys: APIKey[] = [
  {
    id: '1',
    name: 'Production API',
    key: 'pyx_live_1234567890abcdef',
    created: '2024-01-15',
    lastUsed: '2 hours ago',
    permissions: ['read', 'write', 'admin'],
    isVisible: false
  },
  {
    id: '2',
    name: 'Development API',
    key: 'pyx_test_abcdef1234567890',
    created: '2024-01-10',
    lastUsed: '1 day ago',
    permissions: ['read', 'write'],
    isVisible: false
  }
]

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'success',
    title: 'Agent Approved',
    message: 'Your agent "EmailCraft Pro" has been approved and is now live in the marketplace.',
    date: '2 hours ago',
    read: false
  },
  {
    id: '2',
    type: 'warning',
    title: 'Low Wallet Balance',
    message: 'Your wallet balance is running low (₹ 1250 remaining). Consider adding funds.',
    date: '1 day ago',
    read: false
  },
  {
    id: '3',
    type: 'info',
    title: 'Agent Under Review',
    message: 'Your agent "DataParser AI" is currently under review. Expected completion in 2-3 days.',
    date: '3 days ago',
    read: true
  },
  {
    id: '4',
    type: 'error',
    title: 'Agent Rejected',
    message: 'Your agent "ChatBot Plus" was rejected. Please review the feedback and resubmit.',
    date: '5 days ago',
    read: true
  }
]

// Constants
const NOTIFICATION_ICONS = {
  success: <CheckCircle className="h-4 w-4 text-green-600" />,
  warning: <AlertCircle className="h-4 w-4 text-yellow-600" />,
  error: <AlertCircle className="h-4 w-4 text-red-600" />,
  info: <Info className="h-4 w-4 text-blue-600" />
} as const

const ACCOUNT_STATS = [
  { label: 'Member Since', value: 'Jan 2024' },
  { label: 'Active Agents', value: '3' },
  { label: 'Uploaded Agents', value: '4' },
  { label: 'API Calls', value: '12,847' }
] as const

// Reusable Components
const PasswordInput = ({ 
  id, 
  label, 
  placeholder, 
  value, 
  onChange, 
  showPassword, 
  onToggleVisibility 
}: {
  id: string
  label: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  showPassword: boolean
  onToggleVisibility: () => void
}) => (
  <div className="space-y-2">
    <Label htmlFor={id} className="text-sm">{label}</Label>
    <div className="relative">
      <Input
        id={id}
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        className="pr-10 h-9"
      />
      <button
        type="button"
        onClick={onToggleVisibility}
        className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-md border border-gray-200 bg-white hover:bg-accent shadow-md"
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
)

const NotificationSetting = ({ 
  title, 
  description, 
  checked, 
  onToggle 
}: {
  title: string
  description: string
  checked: boolean
  onToggle: (checked: boolean) => void
}) => (
  <div className="flex items-center justify-between">
    <div>
      <p className="font-medium">{title}</p>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
    <Switch
      className="bg-gray-300"
      checked={checked}
      onCheckedChange={onToggle}
    />
  </div>
)

export function ProfilePage({ onBack, userWallet }: ProfilePageProps) {
  // State Management
  const [apiKeys, setApiKeys] = useState<APIKey[]>(mockAPIKeys)
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [profile, setProfile] = useState({
    name: 'PYX',
    email: 'pyx@pyxnetwork.com',
    company: 'AI Automation .',
    bio: 'AI enthusiast and developer building the future of automation.',
    password: '**********'
  })
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: true,
    agentUpdates: true,
    walletAlerts: true,
    marketingEmails: false
  })

  // Password Change Modal State
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false)
  const [showOtpStep, setShowOtpStep] = useState(false)
  const [passwordVisibility, setPasswordVisibility] = useState({
    newPassword: false,
    confirmPassword: false
  })
  const [changePasswordData, setChangePasswordData] = useState({
    newPassword: '',
    confirmPassword: ''
  })
  const [otp, setOtp] = useState('')

  // Computed Values
  const unreadCount = notifications.filter(n => !n.read).length

  // Event Handlers
  const toggleKeyVisibility = (keyId: string) => {
    setApiKeys(keys => keys.map(key => 
      key.id === keyId ? { ...key, isVisible: !key.isVisible } : key
    ))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const deleteAPIKey = (keyId: string) => {
    setApiKeys(keys => keys.filter(key => key.id !== keyId))
  }

  const markAsRead = (notificationId: string) => {
    setNotifications(notifs => notifs.map(notif =>
      notif.id === notificationId ? { ...notif, read: true } : notif
    ))
  }

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!showOtpStep) {
      setShowOtpStep(true)
      console.log('Password validation passed, showing OTP step')
    } else {
      console.log('OTP submitted:', otp)
      console.log('Changing password:', changePasswordData)
      
      // Reset form and close modal
      resetChangePasswordForm()
      setShowChangePasswordModal(false)
    }
  }

  const resetChangePasswordForm = () => {
    setChangePasswordData({ newPassword: '', confirmPassword: '' })
    setPasswordVisibility({ newPassword: false, confirmPassword: false })
    setShowOtpStep(false)
    setOtp('')
  }

  const updateNotificationSetting = (key: keyof typeof notificationSettings, value: boolean) => {
    setNotificationSettings(prev => ({ ...prev, [key]: value }))
  }

  const updateProfile = (key: keyof typeof profile, value: string) => {
    setProfile(prev => ({ ...prev, [key]: value }))
  }

  const [passwordErrors, setPasswordErrors] = useState({
  newPassword: '',
  confirmPassword: ''
})
const validatePassword = (password: string) => {
  const errors = []
  if (password.length < 8) errors.push("at least 8 characters")
  if (!/[A-Z]/.test(password)) errors.push("one uppercase letter")
  if (!/[a-z]/.test(password)) errors.push("one lowercase letter")
  if (!/[0-9]/.test(password)) errors.push("one number")
  if (!/[!@#$%^&*()_+\-=[\]{};':\"\\|,.<>/?]+/.test(password)) errors.push("one special character")

  return errors.length > 0 ? `Password must contain ${errors.join(", ")}` : ''
}


  return (
    <div className="min-h-screen py-8 px-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button variant="ghost" onClick={onBack} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Profile & Settings</h1>
            <p className="text-muted-foreground">Manage your account, API keys, and preferences</p>
          </div>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile">
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="api-keys">
              <Key className="h-4 w-4 mr-2" />
              API Keys
            </TabsTrigger>
            <TabsTrigger value="notifications" className="relative">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
              {unreadCount > 0 && (
                <Badge className="ml-2 h-5 w-5 p-0 text-xs bg-red-500">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="billing">
              <CreditCard className="h-4 w-4 mr-2" />
              Billing
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your personal and company information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-6">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face" alt={profile.name} />
                      <AvatarFallback>{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <Button className="mb-0 !bg-black border-none hover:bg-transparent">
                        Change Photo
                      </Button>
                      <p className="text-sm text-muted-foreground mt-1">
                        JPG, PNG or GIF. Max size 2MB.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={(e) => updateProfile('name', e.target.value)}
                        className="shadow-md"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => updateProfile('email', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type="password"
                        value={profile.password}
                        readOnly
                        className="pr-20"
                      />
                      <button
                        type="button"
                        onClick={() => setShowChangePasswordModal(true)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Change Password
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={profile.company}
                      onChange={(e) => updateProfile('company', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      rows={3}
                      value={profile.bio}
                      onChange={(e) => updateProfile('bio', e.target.value)}
                    />
                  </div>

                  <Button className="!bg-black border-none hover:bg-transparent">
                    Save Changes
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Account Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {ACCOUNT_STATS.map(({ label, value }) => (
                    <div key={label} className="flex justify-between">
                      <span className="text-sm">{label}</span>
                      <span className="text-sm font-medium">{value}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* API Keys Tab */}
          <TabsContent value="api-keys" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>API Keys</CardTitle>
                    <CardDescription>
                      Manage your API keys for programmatic access
                    </CardDescription>
                  </div>
                  <Button className="text-black">
                    <Plus className="h-4 w-4 mr-2" />
                    Generate New Key
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {apiKeys.map(apiKey => (
                    <div key={apiKey.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-medium">{apiKey.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Created: {new Date(apiKey.created).toLocaleDateString()} • 
                            Last used: {apiKey.lastUsed}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => toggleKeyVisibility(apiKey.id)}
                          >
                            {apiKey.isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => copyToClipboard(apiKey.key)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => deleteAPIKey(apiKey.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="font-mono text-sm bg-muted p-2 rounded">
                        {apiKey.isVisible ? apiKey.key : '•'.repeat(apiKey.key.length)}
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mt-3">
                        {apiKey.permissions.map(permission => (
                          <Badge key={permission} variant="outline" className="text-xs">
                            {permission}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>
                  Stay updated with agent status and system alerts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notifications.map(notification => (
                    <div
                      key={notification.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        !notification.read ? 'bg-muted/30' : ''
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start space-x-3">
                        {NOTIFICATION_ICONS[notification.type]}
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className={`font-medium ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                              {notification.title}
                            </h3>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-muted-foreground">{notification.date}</span>
                              {!notification.read && <div className="w-2 h-2 bg-blue-600 rounded-full" />}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Wallet className="h-5 w-5 mr-2 text-blue-600" />
                    Wallet Balance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold">₹ {userWallet.balance}</div>
                    <p className="text-sm text-muted-foreground">Available balance</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button className="flex-1 bg-white text-black">Add Funds</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 border rounded-lg">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">•••• •••• •••• 4242</p>
                      <p className="text-sm text-muted-foreground">Expires 12/27</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    Update Payment Method
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Choose how you want to receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <NotificationSetting
                  title="Email Notifications"
                  description="Receive notifications via email"
                  checked={notificationSettings.email}
                  onToggle={(checked) => updateNotificationSetting('email', checked)}
                />
                <Separator />
                <NotificationSetting
                  title="Agent Status Updates"
                  description="Get notified when agents are approved or rejected"
                  checked={notificationSettings.agentUpdates}
                  onToggle={(checked) => updateNotificationSetting('agentUpdates', checked)}
                />
                <Separator />
                <NotificationSetting
                  title="Wallet Alerts"
                  description="Receive low balance warnings"
                  checked={notificationSettings.walletAlerts}
                  onToggle={(checked) => updateNotificationSetting('walletAlerts', checked)}
                />
                <Separator />
                <NotificationSetting
                  title="Marketing Emails"
                  description="Receive product updates and tips"
                  checked={notificationSettings.marketingEmails}
                  onToggle={(checked) => updateNotificationSetting('marketingEmails', checked)}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Change Password Modal */}
      {showChangePasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Change Password</h2>
              <button
                onClick={() => {
                  setShowChangePasswordModal(false)
                  resetChangePasswordForm()
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-4">
              {!showOtpStep ? (
              <>
  <PasswordInput
    id="new-password"
    label="New Password"
    placeholder="Enter new password"
    value={changePasswordData.newPassword}
    onChange={(value) => {
      setChangePasswordData(prev => ({ ...prev, newPassword: value }))
      const error = validatePassword(value)
      setPasswordErrors(prev => ({ ...prev, newPassword: error }))
    }}
    showPassword={passwordVisibility.newPassword}
    onToggleVisibility={() =>
      setPasswordVisibility(prev => ({ ...prev, newPassword: !prev.newPassword }))
    }
  />
  {passwordErrors.newPassword && (
    <p className="text-xs text-red-500 mt-1">{passwordErrors.newPassword}</p>
  )}

  <PasswordInput
    id="confirm-new-password"
    label="Confirm New Password"
    placeholder="Confirm new password"
    value={changePasswordData.confirmPassword}
    onChange={(value) => {
      setChangePasswordData(prev => ({ ...prev, confirmPassword: value }))
      const error =
        value && value !== changePasswordData.newPassword ? 'Passwords do not match.' : ''
      setPasswordErrors(prev => ({ ...prev, confirmPassword: error }))
    }}
    showPassword={passwordVisibility.confirmPassword}
    onToggleVisibility={() =>
      setPasswordVisibility(prev => ({ ...prev, confirmPassword: !prev.confirmPassword }))
    }
  />
  {passwordErrors.confirmPassword && changePasswordData.confirmPassword && (
    <p className="text-xs text-red-500 mt-1">{passwordErrors.confirmPassword}</p>
  )}

  <div className="flex gap-3 pt-2">
    <Button
      type="button"
      variant="outline"
      onClick={() => {
        setShowChangePasswordModal(false)
        resetChangePasswordForm()
      }}
      className="flex-1 h-9"
    >
      Cancel
    </Button>
    <Button
      type="submit"
      className="flex-1 !bg-black text-white border-none h-9"
      disabled={
        !!passwordErrors.newPassword ||
        !!passwordErrors.confirmPassword ||
        !changePasswordData.newPassword ||
        !changePasswordData.confirmPassword
      }
    >
      Update Password
    </Button>
  </div>
</>

              ) : (
                <>
                  <div className="text-center mb-4">
                    <p className="text-sm text-muted-foreground">
                      We've sent a verification code to <span className="font-medium">{profile.email}</span>
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="otp" className="text-sm">Enter OTP</Label>
                    <Input
                      id="otp"
                      type="text"
                      placeholder="Enter 6-digit code"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      maxLength={6}
                      className="text-center text-lg tracking-widest h-9"
                      required
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowOtpStep(false)}
                      className="flex-1 h-9"
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 !bg-black text-white border-none h-9"
                    >
                      Verify & Update
                    </Button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  )
}