import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../common/ui/card'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

const usageData = [
  { name: 'Mon', agents: 45, cost: 12.5 },
  { name: 'Tue', agents: 52, cost: 18.2 },
  { name: 'Wed', agents: 38, cost: 9.8 },
  { name: 'Thu', agents: 61, cost: 22.1 },
  { name: 'Fri', agents: 55, cost: 19.5 },
  { name: 'Sat', agents: 43, cost: 11.2 },
  { name: 'Sun', agents: 39, cost: 10.8 }
]

export function AnalyticsTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Performance Analytics</CardTitle>
          <CardDescription>Detailed insights into your AI agents' performance</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={usageData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="agents" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--primary))' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}