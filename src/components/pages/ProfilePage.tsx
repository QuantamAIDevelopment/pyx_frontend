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
  Wallet
} from 'lucide-react'

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
    message: 'Your wallet balance is running low (Rs1250 remaining). Consider adding funds.',
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

export function ProfilePage({ onBack, userWallet }: ProfilePageProps) {
  const [apiKeys, setApiKeys] = useState<APIKey[]>(mockAPIKeys)
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [profile, setProfile] = useState({
    name: 'PYX',
    email: 'pyx@pyxnetwork.com',
    company: 'AI Automation .',
    bio: 'AI enthusiast and developer building the future of automation.'
  })
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: true,
    agentUpdates: true,
    walletAlerts: true,
    marketingEmails: false
  })

  const toggleKeyVisibility = (keyId: string) => {
    setApiKeys(keys => keys.map(key => 
      key.id === keyId ? { ...key, isVisible: !key.isVisible } : key
    ))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // Add toast notification here
  }

  const deleteAPIKey = (keyId: string) => {
    setApiKeys(keys => keys.filter(key => key.id !== keyId))
  }

  const markAsRead = (notificationId: string) => {
    setNotifications(notifs => notifs.map(notif =>
      notif.id === notificationId ? { ...notif, read: true } : notif
    ))
  }

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-600" />
      case 'info':
        return <Info className="h-4 w-4 text-blue-600" />
    }
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="min-h-screen py-8 px-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mr-4"
          >
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
                      <Button
                      className="mb-0 !bg-black border-none hover:bg-transparent">Change Photo</Button>
                      <p className="text-sm text-muted-foreground mt-1">
                        JPG, PNG or GIF. Max size 2MB.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2 ">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        className='shadow-md '
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={profile.company}
                      onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      rows={3}
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    />
                  </div>

                  <Button
                  className='!bg-black border-none hover:bg-transparent'>Save Changes</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Account Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm">Member Since</span>
                    <span className="text-sm font-medium">Jan 2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Active Agents</span>
                    <span className="text-sm font-medium">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Uploaded Agents</span>
                    <span className="text-sm font-medium">4</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">API Calls</span>
                    <span className="text-sm font-medium">12,847</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

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
                  <Button className='text-black'>
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
                        {getNotificationIcon(notification.type)}
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
                    <div className="text-3xl font-bold">Rs{userWallet.balance}</div>
                    <p className="text-sm text-muted-foreground">Available balance</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button className="flex-1 bg-white text-black ">Add Funds</Button>
                    <Button variant="outline" className="flex-1">Auto-reload</Button>
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

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Choose how you want to receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch
                   className='bg-gray-300'
                    checked={notificationSettings.email}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({ ...notificationSettings, email: checked })
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Agent Status Updates</p>
                    <p className="text-sm text-muted-foreground">Get notified when agents are approved or rejected</p>
                  </div>
                  <Switch
                  className='bg-gray-300'
                    checked={notificationSettings.agentUpdates}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({ ...notificationSettings, agentUpdates: checked })
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Wallet Alerts</p>
                    <p className="text-sm text-muted-foreground">Receive low balance warnings</p>
                  </div>
                  <Switch
                  className='bg-gray-300'
                    checked={notificationSettings.walletAlerts}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({ ...notificationSettings, walletAlerts: checked })
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between ">
                  <div>
                    <p className="font-medium">Marketing Emails</p>
                    <p className="text-sm text-muted-foreground">Receive product updates and tips</p>
                  </div>
                  <Switch
                  className='bg-gray-300'
                    checked={notificationSettings.marketingEmails}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({ ...notificationSettings, marketingEmails: checked })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}