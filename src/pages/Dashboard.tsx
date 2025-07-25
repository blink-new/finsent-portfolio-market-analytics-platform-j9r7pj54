import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Link } from 'react-router-dom'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PieChart, 
  BarChart3, 
  Target,
  Building2,
  FileText,
  Search,
  ArrowRight,
  Activity
} from 'lucide-react'

const Dashboard = () => {
  const portfolioStats = [
    { name: 'Total Portfolio Value', value: '₺2,450,000', change: '+12.5%', trend: 'up' },
    { name: 'Daily P&L', value: '₺45,230', change: '+2.1%', trend: 'up' },
    { name: 'Total Return', value: '₺320,450', change: '+15.2%', trend: 'up' },
    { name: 'Active Positions', value: '23', change: '+3', trend: 'up' },
  ]

  const topStocks = [
    { symbol: 'THYAO', name: 'Türk Hava Yolları', price: '₺185.50', change: '+3.2%', trend: 'up' },
    { symbol: 'BIMAS', name: 'BİM Birleşik Mağazalar', price: '₺142.30', change: '+1.8%', trend: 'up' },
    { symbol: 'AKBNK', name: 'Akbank', price: '₺58.75', change: '-0.5%', trend: 'down' },
    { symbol: 'EREGL', name: 'Ereğli Demir Çelik', price: '₺42.15', change: '+2.7%', trend: 'up' },
  ]

  const quickActions = [
    {
      title: 'Build New Portfolio',
      description: 'Create a new portfolio with AI assistance',
      icon: Building2,
      href: '/portfolio/builder',
      color: 'bg-blue-500'
    },
    {
      title: 'Evaluate Portfolio',
      description: 'Analyze your portfolio performance',
      icon: Target,
      href: '/portfolio/evaluator',
      color: 'bg-green-500'
    },
    {
      title: 'Market Analytics',
      description: 'Explore market trends and data',
      icon: BarChart3,
      href: '/market',
      color: 'bg-purple-500'
    },
    {
      title: 'Search News',
      description: 'Find news affecting your stocks',
      icon: Search,
      href: '/news',
      color: 'bg-orange-500'
    }
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your portfolio overview.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-green-600 border-green-200">
            <Activity className="h-3 w-3 mr-1" />
            Live Data
          </Badge>
        </div>
      </div>

      {/* Portfolio Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {portfolioStats.map((stat) => (
          <Card key={stat.name} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.name}
              </CardTitle>
              {stat.trend === 'up' ? (
                <TrendingUp className="h-4 w-4 text-green-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600" />
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change} from yesterday
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Get started with portfolio management and market analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickActions.map((action) => {
                  const Icon = action.icon
                  return (
                    <Link key={action.href} to={action.href}>
                      <Card className="hover:shadow-md transition-all duration-200 hover:scale-105 cursor-pointer">
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-3">
                            <div className={`p-2 rounded-lg ${action.color}`}>
                              <Icon className="h-5 w-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-sm">{action.title}</h3>
                              <p className="text-xs text-muted-foreground mt-1">
                                {action.description}
                              </p>
                            </div>
                            <ArrowRight className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Performing Stocks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
              Top Stocks Today
            </CardTitle>
            <CardDescription>
              Best performing stocks in your watchlist
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topStocks.map((stock) => (
                <Link 
                  key={stock.symbol} 
                  to={`/stock/${stock.symbol}`}
                  className="block hover:bg-muted/50 p-2 rounded-lg transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-sm">{stock.symbol}</div>
                      <div className="text-xs text-muted-foreground truncate">
                        {stock.name}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-sm">{stock.price}</div>
                      <div className={`text-xs ${
                        stock.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stock.change}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4" asChild>
              <Link to="/market">
                View All Stocks
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Your latest portfolio actions and market updates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
              <div className="p-2 bg-green-100 rounded-full">
                <TrendingUp className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Portfolio evaluation completed</p>
                <p className="text-xs text-muted-foreground">Your portfolio shows 15.2% growth potential</p>
              </div>
              <span className="text-xs text-muted-foreground">2 hours ago</span>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
              <div className="p-2 bg-blue-100 rounded-full">
                <FileText className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Monthly report generated</p>
                <p className="text-xs text-muted-foreground">Performance analysis for November 2024</p>
              </div>
              <span className="text-xs text-muted-foreground">1 day ago</span>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
              <div className="p-2 bg-purple-100 rounded-full">
                <BarChart3 className="h-4 w-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Market analysis updated</p>
                <p className="text-xs text-muted-foreground">New insights available for BIST100</p>
              </div>
              <span className="text-xs text-muted-foreground">2 days ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard