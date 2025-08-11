import { Button } from '../common/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../common/ui/card'
import {
  CreditCard,
  Settings
} from 'lucide-react'

interface WalletTabProps {
  userWallet: {
    balance: number
    currency: string
  }
}

const recentTransactions = [
  {
    id: '1',
    type: 'usage',
    description: 'SmartSummarizer API calls',
    amount: -450,
    date: '2 hours ago'
  },
  {
    id: '2',
    type: 'topup',
    description: 'Wallet top-up',
    amount: 500,
    date: '1 day ago'
  },
  {
    id: '3',
    type: 'usage',
    description: 'SupportGenie interactions',
    amount: -220,
    date: '1 day ago'
  },
  {
    id: '4',
    type: 'usage',
    description: 'StockSense forecasting',
    amount: -180,
    date: '2 days ago'
  }
]

export function WalletTab({ userWallet }: WalletTabProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>Recent wallet activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map(transaction => (
                <div key={transaction.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      transaction.type === 'usage' ? 'bg-red-500' : 'bg-green-500'
                    }`} />
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-sm text-muted-foreground">{transaction.date}</p>
                    </div>
                  </div>
                  <div className={`font-medium ${
                    transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}₹ {Math.abs(transaction.amount)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Billing Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>Current Balance</span>
              <span className="font-medium">₹ {userWallet.balance}</span>
            </div>
            <div className="flex justify-between">
              <span>This Month</span>
              <span className="font-medium">₹ 2650</span>
            </div>
            <div className="flex justify-between">
              <span>Projected</span>
              <span className="font-medium">₹ 3520</span>
            </div>
            <Button className="w-ful text-black">
              <CreditCard className="h-4 w-4 mr-2" />
              Add Funds
            </Button>
            <Button variant="outline" className="w-full">
              <Settings className="h-4 w-4 mr-2" />
              Billing Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}