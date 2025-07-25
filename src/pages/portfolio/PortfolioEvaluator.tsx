import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'
import { Badge } from '../../components/ui/badge'
import { Progress } from '../../components/ui/progress'
import { 
  Target, 
  TrendingUp, 
  TrendingDown,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Brain,
  Calculator,
  Lightbulb,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'

const PortfolioEvaluator = () => {
  const [selectedPortfolio, setSelectedPortfolio] = useState('portfolio-1')
  const [selectedBenchmark, setSelectedBenchmark] = useState('BIST100')

  const portfolios = [
    { id: 'portfolio-1', name: 'Growth Portfolio', value: '₺2,450,000', return: '+15.2%' },
    { id: 'portfolio-2', name: 'Balanced Portfolio', value: '₺1,850,000', return: '+8.7%' },
    { id: 'portfolio-3', name: 'Conservative Portfolio', value: '₺950,000', return: '+5.3%' },
  ]

  const benchmarks = [
    { id: 'BIST100', name: 'BIST 100', return: '+12.4%' },
    { id: 'BIST30', name: 'BIST 30', return: '+14.1%' },
    { id: 'USD', name: 'USD/TRY', return: '+18.5%' },
    { id: 'GOLD', name: 'Gold', return: '+7.2%' },
  ]

  const evaluationMetrics = [
    { name: 'Potential Gain', value: '₺320,450', percentage: '+15.2%', trend: 'up', color: 'text-green-600' },
    { name: 'Risk Score', value: '6.8/10', percentage: 'Moderate', trend: 'neutral', color: 'text-yellow-600' },
    { name: 'Sharpe Ratio', value: '1.42', percentage: 'Excellent', trend: 'up', color: 'text-green-600' },
    { name: 'Max Drawdown', value: '-8.5%', percentage: 'Low Risk', trend: 'up', color: 'text-green-600' },
  ]

  const whatIfScenarios = [
    {
      scenario: 'If you bought THYAO on Jan 1st',
      impact: '+₺45,000',
      percentage: '+18.4%',
      trend: 'up'
    },
    {
      scenario: 'If you avoided AKBNK in March',
      impact: '+₺12,500',
      percentage: '+5.1%',
      trend: 'up'
    },
    {
      scenario: 'If you increased tech allocation',
      impact: '+₺28,750',
      percentage: '+11.7%',
      trend: 'up'
    }
  ]

  const aiRecommendations = [
    {
      type: 'rebalance',
      title: 'Rebalance Banking Exposure',
      description: 'Reduce banking sector allocation from 35% to 25%',
      impact: 'Potential +3.2% return improvement',
      priority: 'high'
    },
    {
      type: 'add',
      title: 'Add Technology Stocks',
      description: 'Consider adding ASELS or LOGO to portfolio',
      impact: 'Diversification benefit +2.1%',
      priority: 'medium'
    },
    {
      type: 'timing',
      title: 'Market Timing Opportunity',
      description: 'Current market conditions favor defensive stocks',
      impact: 'Risk reduction -15%',
      priority: 'low'
    }
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center">
            <Target className="h-8 w-8 mr-3 text-primary" />
            Portfolio Evaluator
          </h1>
          <p className="text-muted-foreground">Analyze and optimize your portfolio performance</p>
        </div>
        <Badge variant="outline" className="text-green-600 border-green-200">
          <CheckCircle className="h-3 w-3 mr-1" />
          Analysis Complete
        </Badge>
      </div>

      {/* Portfolio Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Select Portfolio</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedPortfolio} onValueChange={setSelectedPortfolio}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {portfolios.map((portfolio) => (
                  <SelectItem key={portfolio.id} value={portfolio.id}>
                    <div className="flex items-center justify-between w-full">
                      <span>{portfolio.name}</span>
                      <span className="text-green-600 ml-4">{portfolio.return}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Benchmark Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedBenchmark} onValueChange={setSelectedBenchmark}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {benchmarks.map((benchmark) => (
                  <SelectItem key={benchmark.id} value={benchmark.id}>
                    <div className="flex items-center justify-between w-full">
                      <span>{benchmark.name}</span>
                      <span className="text-blue-600 ml-4">{benchmark.return}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>

      {/* Evaluation Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {evaluationMetrics.map((metric) => (
          <Card key={metric.name} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.name}
              </CardTitle>
              {metric.trend === 'up' ? (
                <TrendingUp className="h-4 w-4 text-green-600" />
              ) : metric.trend === 'down' ? (
                <TrendingDown className="h-4 w-4 text-red-600" />
              ) : (
                <BarChart3 className="h-4 w-4 text-yellow-600" />
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className={`text-xs ${metric.color}`}>
                {metric.percentage}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Analysis */}
        <div className="lg:col-span-2 space-y-6">
          {/* Performance Comparison */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Performance vs Benchmark
              </CardTitle>
              <CardDescription>
                How your portfolio performs against selected benchmark
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Your Portfolio</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={75} className="w-32" />
                    <span className="text-sm font-semibold text-green-600">+15.2%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{selectedBenchmark}</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={62} className="w-32" />
                    <span className="text-sm font-semibold text-blue-600">+12.4%</span>
                  </div>
                </div>
                
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-2">
                    <ArrowUpRight className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-900">
                      Outperforming benchmark by +2.8%
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI vs Your Portfolio */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="h-5 w-5 mr-2" />
                AI Portfolio Comparison
              </CardTitle>
              <CardDescription>
                What our AI would have done with the same constraints
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="comparison">
                <TabsList>
                  <TabsTrigger value="comparison">Comparison</TabsTrigger>
                  <TabsTrigger value="differences">Key Differences</TabsTrigger>
                </TabsList>
                
                <TabsContent value="comparison" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold text-sm mb-2">Your Portfolio</h4>
                      <div className="text-2xl font-bold text-green-600">+15.2%</div>
                      <p className="text-xs text-muted-foreground">Actual return</p>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold text-sm mb-2">AI Portfolio</h4>
                      <div className="text-2xl font-bold text-blue-600">+18.7%</div>
                      <p className="text-xs text-muted-foreground">Projected return</p>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-900">
                      AI portfolio would have generated <span className="font-semibold">+3.5% additional return</span> 
                      through better sector allocation and timing.
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="differences" className="space-y-3">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="text-sm">Banking Sector</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">You: 35%</span>
                        <ArrowDownRight className="h-3 w-3 text-red-500" />
                        <span className="text-sm text-blue-600">AI: 25%</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="text-sm">Technology Sector</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">You: 10%</span>
                        <ArrowUpRight className="h-3 w-3 text-green-500" />
                        <span className="text-sm text-blue-600">AI: 20%</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="text-sm">Energy Sector</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">You: 15%</span>
                        <ArrowUpRight className="h-3 w-3 text-green-500" />
                        <span className="text-sm text-blue-600">AI: 25%</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* What-If Scenarios */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calculator className="h-5 w-5 mr-2" />
                What-If Scenarios
              </CardTitle>
              <CardDescription>
                Explore alternative investment decisions and their impact
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {whatIfScenarios.map((scenario, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{scenario.scenario}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-semibold text-green-600">{scenario.impact}</span>
                      <Badge variant="outline" className="text-green-600 border-green-200">
                        {scenario.percentage}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Risk Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Risk Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Volatility</span>
                  <span className="text-sm font-semibold">Medium</span>
                </div>
                <Progress value={60} />
                
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Concentration Risk</span>
                  <span className="text-sm font-semibold">Low</span>
                </div>
                <Progress value={30} />
                
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Market Risk</span>
                  <span className="text-sm font-semibold">High</span>
                </div>
                <Progress value={75} />
              </div>
              
              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-xs text-amber-800">
                  <strong>Risk Score: 6.8/10</strong><br />
                  Your portfolio has moderate risk with good diversification.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* AI Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lightbulb className="h-5 w-5 mr-2" />
                AI Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {aiRecommendations.map((rec, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-sm font-semibold">{rec.title}</h4>
                    <Badge 
                      variant={rec.priority === 'high' ? 'destructive' : rec.priority === 'medium' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {rec.priority}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{rec.description}</p>
                  <p className="text-xs font-medium text-green-600">{rec.impact}</p>
                </div>
              ))}
              
              <Button className="w-full mt-4">
                Apply Recommendations
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default PortfolioEvaluator