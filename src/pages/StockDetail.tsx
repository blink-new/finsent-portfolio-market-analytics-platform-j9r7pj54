import { useState } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Badge } from '../components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Progress } from '../components/ui/progress'
import { LineChart as RechartsLine, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { 
  TrendingUp, 
  TrendingDown,
  BarChart3,
  Brain,
  Building,
  Calendar,
  ArrowLeft,
  Target,
  Activity,
  AlertTriangle,
  CheckCircle,
  Newspaper,
  LineChart,
  PieChart
} from 'lucide-react'

const StockDetail = () => {
  const { symbol } = useParams()
  const location = useLocation()
  const [selectedIndicator, setSelectedIndicator] = useState('RSI')
  const [activeIndicators, setActiveIndicators] = useState<string[]>(['RSI'])

  // Mock stock data - in real app this would come from API
  const stockData = {
    symbol: symbol || 'THYAO',
    name: 'Türk Hava Yolları A.O.',
    price: '₺185.50',
    change: '+3.2%',
    changeAmount: '+₺5.75',
    volume: '₺45.2M',
    marketCap: '₺12.8B',
    sector: 'Transportation',
    trend: 'up'
  }

  const recommendations = {
    finsent: { action: 'BUY', confidence: 85, target: '₺210.00' },
    brokerages: [
      { name: 'Garanti Yatırım', action: 'BUY', target: '₺205.00' },
      { name: 'İş Yatırım', action: 'HOLD', target: '₺190.00' },
      { name: 'Yapı Kredi Yatırım', action: 'BUY', target: '₺215.00' },
      { name: 'Akbank Yatırım', action: 'BUY', target: '₺200.00' },
    ]
  }

  const technicalIndicators = [
    { name: 'RSI', value: 68, signal: 'Neutral', description: 'Approaching overbought' },
    { name: 'MACD', value: 2.3, signal: 'Buy', description: 'Bullish crossover' },
    { name: 'Moving Average (20)', value: '₺178.50', signal: 'Buy', description: 'Price above MA' },
    { name: 'Bollinger Bands', value: 'Upper', signal: 'Caution', description: 'Near upper band' },
    { name: 'Volume', value: '125%', signal: 'Strong', description: 'Above average' },
  ]

  const fundamentalMetrics = [
    { name: 'P/E Ratio', value: '12.5', benchmark: '15.2', status: 'good' },
    { name: 'P/B Ratio', value: '1.8', benchmark: '2.1', status: 'good' },
    { name: 'ROE', value: '18.5%', benchmark: '15.0%', status: 'excellent' },
    { name: 'Debt/Equity', value: '0.45', benchmark: '0.60', status: 'good' },
    { name: 'Current Ratio', value: '1.85', benchmark: '1.50', status: 'excellent' },
    { name: 'Revenue Growth', value: '22.3%', benchmark: '12.0%', status: 'excellent' },
  ]

  const sentimentAnalysis = {
    overall: 'Positive',
    score: 78,
    factors: [
      { factor: 'Earnings Growth', impact: 'Positive', weight: 'High' },
      { factor: 'Market Conditions', impact: 'Positive', weight: 'Medium' },
      { factor: 'Sector Performance', impact: 'Positive', weight: 'High' },
      { factor: 'Global Travel Recovery', impact: 'Very Positive', weight: 'High' },
      { factor: 'Fuel Costs', impact: 'Negative', weight: 'Medium' },
    ]
  }

  const relatedNews = [
    {
      title: 'THYAO announces record Q4 earnings',
      summary: 'Turkish Airlines reports 25% increase in quarterly profits driven by strong passenger demand',
      impact: 'Very Positive',
      date: '2024-01-15',
      source: 'Anadolu Agency'
    },
    {
      title: 'New route expansion to African markets',
      summary: 'Company plans to add 5 new destinations in Africa, expanding its global network',
      impact: 'Positive',
      date: '2024-01-12',
      source: 'Hürriyet'
    },
    {
      title: 'Aviation fuel prices show volatility',
      summary: 'Rising fuel costs may impact airline profitability in coming quarters',
      impact: 'Negative',
      date: '2024-01-10',
      source: 'Bloomberg HT'
    },
    {
      title: 'Tourism sector outlook remains strong',
      summary: 'Government forecasts continued growth in tourism supporting airline demand',
      impact: 'Positive',
      date: '2024-01-08',
      source: 'Milliyet'
    },
  ]

  const getRecommendationColor = (action: string) => {
    switch (action) {
      case 'BUY': return 'text-green-600 bg-green-50 border-green-200'
      case 'HOLD': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'SELL': return 'text-red-600 bg-red-50 border-red-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'Very Positive': return 'text-green-700 bg-green-100'
      case 'Positive': return 'text-green-600 bg-green-50'
      case 'Negative': return 'text-red-600 bg-red-50'
      case 'Very Negative': return 'text-red-700 bg-red-100'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const toggleIndicator = (indicatorName: string) => {
    setActiveIndicators(prev => {
      if (prev.includes(indicatorName)) {
        return prev.filter(i => i !== indicatorName)
      } else {
        return [...prev, indicatorName]
      }
    })
  }

  // Mock chart data
  const chartData = [
    { date: '1 Jan', price: 175, RSI: 55, MACD: -1.2, MA20: 172 },
    { date: '5 Jan', price: 178, RSI: 58, MACD: -0.5, MA20: 174 },
    { date: '10 Jan', price: 180, RSI: 62, MACD: 0.8, MA20: 176 },
    { date: '15 Jan', price: 185, RSI: 68, MACD: 2.3, MA20: 178.5 },
    { date: '20 Jan', price: 183, RSI: 65, MACD: 1.8, MA20: 180 },
    { date: '25 Jan', price: 188, RSI: 70, MACD: 2.5, MA20: 182 },
    { date: 'Today', price: 185.5, RSI: 68, MACD: 2.3, MA20: 183 },
  ]

  const indicatorColors = {
    price: '#1E40AF',
    RSI: '#059669',
    MACD: '#F59E0B',
    'Moving Average (20)': '#8B5CF6',
    'Bollinger Bands': '#EF4444',
    'Volume': '#6366F1'
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" asChild>
            <Link to={location.state?.from || "/market"}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{stockData.symbol}</h1>
            <p className="text-muted-foreground">{stockData.name}</p>
          </div>
        </div>
        <Badge variant="outline" className="text-blue-600 border-blue-200">
          <Activity className="h-3 w-3 mr-1" />
          Live Data
        </Badge>
      </div>

      {/* Stock Price Header */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div>
              <div className="text-sm text-muted-foreground">Current Price</div>
              <div className="text-3xl font-bold">{stockData.price}</div>
              <div className={`text-sm font-semibold ${
                stockData.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stockData.change} ({stockData.changeAmount})
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Volume</div>
              <div className="text-xl font-semibold">{stockData.volume}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Market Cap</div>
              <div className="text-xl font-semibold">{stockData.marketCap}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Sector</div>
              <Badge variant="outline">{stockData.sector}</Badge>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Finsent Rating</div>
              <div className="flex items-center space-x-2">
                <Badge className={getRecommendationColor(recommendations.finsent.action)}>
                  {recommendations.finsent.action}
                </Badge>
                <span className="text-sm font-semibold">{recommendations.finsent.confidence}%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="recommendations" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="recommendations">Buy/Sell/Hold</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
          <TabsTrigger value="sentiment">Sentiment</TabsTrigger>
          <TabsTrigger value="news">News</TabsTrigger>
        </TabsList>

        {/* Recommendations Tab */}
        <TabsContent value="recommendations" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Finsent Recommendation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  Finsent Recommendation
                </CardTitle>
                <CardDescription>
                  Our AI-powered analysis and recommendation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className={`inline-flex items-center px-6 py-3 rounded-lg border-2 ${getRecommendationColor(recommendations.finsent.action)}`}>
                    <span className="text-2xl font-bold">{recommendations.finsent.action}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Confidence</span>
                      <span className="font-semibold">{recommendations.finsent.confidence}%</span>
                    </div>
                    <Progress value={recommendations.finsent.confidence} className="h-2" />
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Target Price</span>
                      <span className="font-semibold text-green-600">{recommendations.finsent.target}</span>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-900">
                      <strong>Rationale:</strong> Strong fundamentals, positive sector outlook, 
                      and technical indicators support upward momentum. Target represents 13% upside potential.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Brokerage Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building className="h-5 w-5 mr-2" />
                  Brokerage Recommendations
                </CardTitle>
                <CardDescription>
                  Recommendations from major brokerage firms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recommendations.brokerages.map((rec, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-semibold text-sm">{rec.name}</div>
                        <div className="text-xs text-muted-foreground">Target: {rec.target}</div>
                      </div>
                      <Badge className={getRecommendationColor(rec.action)}>
                        {rec.action}
                      </Badge>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm font-semibold mb-2">Consensus</div>
                  <div className="flex items-center space-x-4 text-sm">
                    <span>BUY: 3</span>
                    <span>HOLD: 1</span>
                    <span>SELL: 0</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Average Target: ₺202.50
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Analysis Tab */}
        <TabsContent value="analysis" className="space-y-6">
          <Tabs defaultValue="technical" className="space-y-4">
            <TabsList>
              <TabsTrigger value="technical">Technical Analysis</TabsTrigger>
              <TabsTrigger value="fundamental">Fundamental Analysis</TabsTrigger>
            </TabsList>

            {/* Technical Analysis */}
            <TabsContent value="technical" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center">
                          <LineChart className="h-5 w-5 mr-2" />
                          Technical Indicators
                        </CardTitle>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-muted-foreground">Click indicators to show on chart</span>
                        </div>
                      </div>
                      <CardDescription>
                        Key technical indicators and signals
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {/* Real Chart */}
                      <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200 h-96">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsLine data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="date" stroke="#6b7280" />
                            <YAxis yAxisId="left" stroke="#6b7280" />
                            <YAxis yAxisId="right" orientation="right" stroke="#6b7280" />
                            <Tooltip
                              contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                              labelStyle={{ color: '#111827', fontWeight: 'bold' }}
                            />
                            <Legend />
                            
                            {/* Always show price line */}
                            <Line 
                              yAxisId="left"
                              type="monotone" 
                              dataKey="price" 
                              stroke={indicatorColors.price} 
                              name="Price (₺)"
                              strokeWidth={2}
                              dot={{ r: 4 }}
                              activeDot={{ r: 6 }}
                            />
                            
                            {/* Show indicators based on selection */}
                            {activeIndicators.includes('RSI') && (
                              <Line 
                                yAxisId="right"
                                type="monotone" 
                                dataKey="RSI" 
                                stroke={indicatorColors.RSI}
                                name="RSI"
                                strokeWidth={2}
                                strokeDasharray="5 5"
                              />
                            )}
                            
                            {activeIndicators.includes('MACD') && (
                              <Line 
                                yAxisId="right"
                                type="monotone" 
                                dataKey="MACD" 
                                stroke={indicatorColors.MACD}
                                name="MACD"
                                strokeWidth={2}
                              />
                            )}
                            
                            {activeIndicators.includes('Moving Average (20)') && (
                              <Line 
                                yAxisId="left"
                                type="monotone" 
                                dataKey="MA20" 
                                stroke={indicatorColors['Moving Average (20)']}
                                name="MA(20)"
                                strokeWidth={2}
                                strokeDasharray="3 3"
                              />
                            )}
                          </RechartsLine>
                        </ResponsiveContainer>
                      </div>

                      <div className="space-y-4">
                        {technicalIndicators.map((indicator, index) => (
                          <div 
                            key={index} 
                            className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors hover:bg-muted/50 ${
                              activeIndicators.includes(indicator.name) ? 'bg-primary/5 border-primary' : ''
                            }`}
                            onClick={() => toggleIndicator(indicator.name)}
                          >
                            <div className="flex-1">
                              <div className="font-semibold text-sm">{indicator.name}</div>
                              <div className="text-xs text-muted-foreground">{indicator.description}</div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold">{indicator.value}</div>
                              <Badge variant={
                                indicator.signal === 'Buy' ? 'default' :
                                indicator.signal === 'Sell' ? 'destructive' : 'secondary'
                              } className="text-xs">
                                {indicator.signal}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Technical Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 mb-2">BULLISH</div>
                      <Progress value={75} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-2">75% Bullish Signals</p>
                    </div>
                    
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>Price above 20-day MA</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>MACD bullish crossover</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                        <span>RSI approaching overbought</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>Volume above average</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Fundamental Analysis */}
            <TabsContent value="fundamental" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChart className="h-5 w-5 mr-2" />
                    Fundamental Metrics
                  </CardTitle>
                  <CardDescription>
                    Key financial ratios and company fundamentals
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {fundamentalMetrics.map((metric, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-semibold">{metric.name}</span>
                          <Badge variant={
                            metric.status === 'excellent' ? 'default' :
                            metric.status === 'good' ? 'secondary' : 'destructive'
                          } className="text-xs">
                            {metric.status}
                          </Badge>
                        </div>
                        <div className="text-xl font-bold">{metric.value}</div>
                        <div className="text-xs text-muted-foreground">
                          Sector avg: {metric.benchmark}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-900 mb-2">Fundamental Outlook</h4>
                    <p className="text-sm text-green-700">
                      Strong financial position with excellent profitability metrics. 
                      Revenue growth significantly above sector average. 
                      Conservative debt levels provide financial flexibility.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </TabsContent>

        {/* Sentiment Analysis Tab */}
        <TabsContent value="sentiment" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="h-5 w-5 mr-2" />
                    AI Sentiment Analysis
                  </CardTitle>
                  <CardDescription>
                    Our AI model's analysis of market sentiment
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sentimentAnalysis.factors.map((factor, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="font-semibold text-sm">{factor.factor}</div>
                          <div className="text-xs text-muted-foreground">Weight: {factor.weight}</div>
                        </div>
                        <Badge className={getImpactColor(factor.impact)}>
                          {factor.impact}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Overall Sentiment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {sentimentAnalysis.overall}
                  </div>
                  <div className="text-lg font-semibold mb-3">{sentimentAnalysis.score}/100</div>
                  <Progress value={sentimentAnalysis.score} className="h-3" />
                </div>
                
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm text-green-900">
                    <strong>AI Summary:</strong> Market sentiment is strongly positive 
                    driven by excellent earnings growth and favorable sector conditions. 
                    Global travel recovery continues to support the outlook.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* News Tab */}
        <TabsContent value="news" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Newspaper className="h-5 w-5 mr-2" />
                Related News & Impact Analysis
              </CardTitle>
              <CardDescription>
                Latest news affecting {stockData.symbol} with impact assessment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {relatedNews.map((news, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-sm flex-1 mr-3">{news.title}</h3>
                        <Badge className={getImpactColor(news.impact)}>
                          {news.impact}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{news.summary}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-3 w-3" />
                          <span>{news.date}</span>
                        </div>
                        <span>{news.source}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default StockDetail