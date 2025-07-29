import { useState } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Badge } from '../components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Progress } from '../components/ui/progress'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog'
import { Checkbox } from '../components/ui/checkbox'
import { LineChart as RechartsLine, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, ComposedChart, Bar } from 'recharts'
import CandlestickChart from '../components/CandlestickChart'

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
  const [chartType, setChartType] = useState<'line' | 'candlestick' | 'area'>('line')
  const [selectedFundamentalMetric, setSelectedFundamentalMetric] = useState('revenue')
  const [selectedTimeframe, setSelectedTimeframe] = useState('quarterly')
  const [showPriceOverlay, setShowPriceOverlay] = useState(false)
  const [thumbnailDialog, setThumbnailDialog] = useState<{ open: boolean; indicator: string }>({ open: false, indicator: '' })
  const [currencyMode, setCurrencyMode] = useState<'TRY' | 'USD'>('TRY')

  // Mock stock data - in real app this would come from API
  const stockData = {
    symbol: symbol || 'THYAO',
    name: 'Türk Hava Yolları A.O.',
    price: '₺290.25',
    change: '+3.2%',
    changeAmount: '+₺5.75',
    volume: '18.00M',
    marketCap: '₺398.9B',
    sector: 'Aviation/Transportation',
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
    { name: 'On-Balance Volume', value: '2.8M', signal: 'Buy', description: 'Volume accumulation trend' },
    { name: 'RSI', value: 68, signal: 'Neutral', description: 'Approaching overbought' },
    { name: 'MACD', value: 2.3, signal: 'Buy', description: 'Bullish crossover' },
    { name: 'Bollinger Bands', value: 'Upper', signal: 'Possible trend change', description: 'Near upper band' },
    { name: 'EMA (12)', value: '₺182.30', signal: 'Buy', description: 'Short-term uptrend' },
    { name: 'EMA (26)', value: '₺179.80', signal: 'Buy', description: 'Medium-term uptrend' },
    { name: 'Stochastic', value: 72, signal: 'Neutral', description: 'Momentum slowing' },
    { name: 'Volume', value: '125%', signal: 'Strong', description: 'Above average' },
  ]

  const fundamentalMetrics = [
    { name: 'P/E Ratio', value: '12.5', benchmark: '15.2', status: 'good' },
    { name: 'P/B Ratio', value: '1.8', benchmark: '2.1', status: 'good' },
    { name: 'Current Ratio', value: '1.85', benchmark: '1.50', status: 'excellent' },
    { name: 'Debt/Equity', value: '0.45', benchmark: '0.60', status: 'good' },
    { name: 'Revenue Growth', value: '22.3%', benchmark: '12.0%', status: 'excellent' },
    { name: 'EBITDA Margin', value: '24.0%', benchmark: '18.5%', status: 'excellent' },
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

  // Mock chart data with more data points and additional indicators
  const chartData = [
    { date: '1 Jan', price: 175, open: 172, high: 178, low: 170, close: 175, volume: 1200000, RSI: 55, MACD: -1.2, MA20: 172, BollingerUpper: 180, BollingerLower: 168, EMA12: 173, EMA26: 171, StochasticK: 52, StochasticD: 48 },
    { date: '2 Jan', price: 176, open: 175, high: 179, low: 173, close: 176, volume: 1350000, RSI: 56, MACD: -1.0, MA20: 172.5, BollingerUpper: 181, BollingerLower: 169, EMA12: 174, EMA26: 171.5, StochasticK: 54, StochasticD: 50 },
    { date: '3 Jan', price: 177, open: 176, high: 180, low: 174, close: 177, volume: 1400000, RSI: 57, MACD: -0.8, MA20: 173, BollingerUpper: 182, BollingerLower: 170, EMA12: 175, EMA26: 172, StochasticK: 56, StochasticD: 52 },
    { date: '4 Jan', price: 178, open: 177, high: 181, low: 175, close: 178, volume: 1450000, RSI: 58, MACD: -0.6, MA20: 173.5, BollingerUpper: 183, BollingerLower: 171, EMA12: 176, EMA26: 172.5, StochasticK: 58, StochasticD: 54 },
    { date: '5 Jan', price: 178, open: 178, high: 182, low: 176, close: 178, volume: 1500000, RSI: 58, MACD: -0.5, MA20: 174, BollingerUpper: 184, BollingerLower: 172, EMA12: 177, EMA26: 173, StochasticK: 60, StochasticD: 56 },
    { date: '8 Jan', price: 179, open: 178, high: 183, low: 177, close: 179, volume: 1600000, RSI: 60, MACD: -0.2, MA20: 174.5, BollingerUpper: 185, BollingerLower: 173, EMA12: 178, EMA26: 173.5, StochasticK: 62, StochasticD: 58 },
    { date: '9 Jan', price: 180, open: 179, high: 184, low: 178, close: 180, volume: 1700000, RSI: 61, MACD: 0.2, MA20: 175, BollingerUpper: 186, BollingerLower: 174, EMA12: 179, EMA26: 174, StochasticK: 64, StochasticD: 60 },
    { date: '10 Jan', price: 180, open: 180, high: 185, low: 179, close: 180, volume: 1800000, RSI: 62, MACD: 0.8, MA20: 176, BollingerUpper: 187, BollingerLower: 175, EMA12: 179.5, EMA26: 174.5, StochasticK: 66, StochasticD: 62 },
    { date: '11 Jan', price: 182, open: 180, high: 186, low: 179, close: 182, volume: 1900000, RSI: 64, MACD: 1.2, MA20: 176.5, BollingerUpper: 188, BollingerLower: 176, EMA12: 180.5, EMA26: 175, StochasticK: 68, StochasticD: 64 },
    { date: '12 Jan', price: 183, open: 182, high: 187, low: 180, close: 183, volume: 2000000, RSI: 65, MACD: 1.5, MA20: 177, BollingerUpper: 189, BollingerLower: 177, EMA12: 181.5, EMA26: 175.5, StochasticK: 70, StochasticD: 66 },
    { date: '15 Jan', price: 185, open: 183, high: 188, low: 181, close: 185, volume: 2100000, RSI: 68, MACD: 2.3, MA20: 178.5, BollingerUpper: 190, BollingerLower: 178, EMA12: 182.5, EMA26: 176, StochasticK: 72, StochasticD: 68 },
    { date: '16 Jan', price: 184, open: 185, high: 187, low: 182, close: 184, volume: 1800000, RSI: 66, MACD: 2.0, MA20: 179, BollingerUpper: 191, BollingerLower: 179, EMA12: 183, EMA26: 176.5, StochasticK: 70, StochasticD: 70 },
    { date: '17 Jan', price: 183, open: 184, high: 186, low: 181, close: 183, volume: 1700000, RSI: 65, MACD: 1.8, MA20: 179.5, BollingerUpper: 192, BollingerLower: 180, EMA12: 183, EMA26: 177, StochasticK: 68, StochasticD: 70 },
    { date: '18 Jan', price: 186, open: 183, high: 189, low: 182, close: 186, volume: 2000000, RSI: 67, MACD: 2.1, MA20: 180, BollingerUpper: 193, BollingerLower: 181, EMA12: 184, EMA26: 177.5, StochasticK: 74, StochasticD: 70 },
    { date: '19 Jan', price: 187, open: 186, high: 190, low: 184, close: 187, volume: 2200000, RSI: 69, MACD: 2.4, MA20: 181, BollingerUpper: 194, BollingerLower: 182, EMA12: 185, EMA26: 178, StochasticK: 76, StochasticD: 72 },
    { date: '22 Jan', price: 188, open: 187, high: 191, low: 185, close: 188, volume: 2300000, RSI: 70, MACD: 2.5, MA20: 182, BollingerUpper: 195, BollingerLower: 183, EMA12: 186, EMA26: 178.5, StochasticK: 78, StochasticD: 74 },
    { date: '23 Jan', price: 186, open: 188, high: 189, low: 184, close: 186, volume: 1900000, RSI: 68, MACD: 2.2, MA20: 182.5, BollingerUpper: 196, BollingerLower: 184, EMA12: 186, EMA26: 179, StochasticK: 74, StochasticD: 76 },
    { date: '24 Jan', price: 185, open: 186, high: 188, low: 183, close: 185, volume: 1800000, RSI: 67, MACD: 2.0, MA20: 183, BollingerUpper: 197, BollingerLower: 185, EMA12: 185.5, EMA26: 179.5, StochasticK: 72, StochasticD: 74 },
    { date: 'Today', price: 185.5, open: 185, high: 189, low: 184, close: 185.5, volume: 1900000, RSI: 68, MACD: 2.3, MA20: 183, BollingerUpper: 198, BollingerLower: 186, EMA12: 185.5, EMA26: 180, StochasticK: 73, StochasticD: 73 },
  ]

  const indicatorColors = {
    price: '#1E40AF',
    RSI: '#059669',
    MACD: '#F59E0B',
    'On-Balance Volume': '#8B5CF6',
    'Bollinger Bands': '#EF4444',
    'EMA (12)': '#F59E0B',
    'EMA (26)': '#06B6D4',
    'Stochastic': '#10B981',
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
              <div className="text-sm text-muted-foreground">FinSent Rating</div>
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

      {/* Three Vertical Analysis Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Technical Analysis Section */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Technical Analysis
            </CardTitle>
            <CardDescription>
              Chart analysis and technical indicators
            </CardDescription>
            {/* Technical Analysis Signal */}
            <div className="p-3 bg-green-50 rounded-lg border border-green-200 text-center">
              <Badge className="bg-green-600 text-white mb-2">BUY</Badge>
              <p className="text-xs text-green-700">
                Technical indicators show bullish momentum with price above moving averages and positive MACD crossover.
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Chart Type Selector */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Chart Type:</span>
              <Select value={chartType} onValueChange={(value: 'line' | 'candlestick' | 'area') => setChartType(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="line">Line Chart</SelectItem>
                  <SelectItem value="candlestick">Candlestick</SelectItem>
                  <SelectItem value="area">Area Chart</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Chart */}
            <div className="p-4 bg-muted rounded-lg border h-64">
              <ResponsiveContainer width="100%" height="100%">
                {chartType === 'line' && (
                  <RechartsLine data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="date" stroke="#6b7280" fontSize={10} />
                    <YAxis yAxisId="left" stroke="#6b7280" fontSize={10} />
                    <Tooltip
                      contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }}
                      labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: 'bold' }}
                    />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="price" 
                      stroke={indicatorColors.price} 
                      name="Price (₺)"
                      strokeWidth={2}
                      dot={false}
                    />
                    {activeIndicators.includes('Moving Average (20)') && (
                      <Line 
                        yAxisId="left"
                        type="monotone" 
                        dataKey="MA20" 
                        stroke={indicatorColors['Moving Average (20)']}
                        name="MA(20)"
                        strokeWidth={1}
                        strokeDasharray="3 3"
                        dot={false}
                      />
                    )}
                  </RechartsLine>
                )}

                {chartType === 'area' && (
                  <AreaChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="date" stroke="#6b7280" fontSize={10} />
                    <YAxis yAxisId="left" stroke="#6b7280" fontSize={10} />
                    <Tooltip
                      contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }}
                      labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: 'bold' }}
                    />
                    <Area 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="price" 
                      stroke={indicatorColors.price} 
                      fill={`${indicatorColors.price}20`}
                      name="Price (₺)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                )}

                {chartType === 'candlestick' && (
                  <CandlestickChart 
                    data={chartData}
                    activeIndicators={activeIndicators}
                    indicatorColors={indicatorColors}
                  />
                )}
              </ResponsiveContainer>
            </div>

            {/* Technical Indicators with Thumbnail Plots */}
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Key Indicators</h4>
              {technicalIndicators.slice(0, 4).map((indicator, index) => (
                <div 
                  key={index} 
                  className={`flex items-center justify-between p-2 border rounded cursor-pointer transition-colors hover:bg-muted/50 ${
                    activeIndicators.includes(indicator.name) ? 'bg-primary/5 border-primary' : ''
                  }`}
                  onClick={() => toggleIndicator(indicator.name)}
                >
                  <div className="flex-1">
                    <div className="font-semibold text-xs">{indicator.name}</div>
                    <div className="text-xs text-muted-foreground">{indicator.value}</div>
                    {/* Thumbnail Plot */}
                    <div 
                      className="w-16 h-8 bg-muted rounded mt-1 cursor-pointer hover:bg-muted/80"
                      onClick={(e) => {
                        e.stopPropagation()
                        setThumbnailDialog({ open: true, indicator: indicator.name })
                      }}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsLine data={chartData.slice(-7)}>
                          <Line 
                            type="monotone" 
                            dataKey={
                              indicator.name === 'RSI' ? 'RSI' :
                              indicator.name === 'MACD' ? 'MACD' :
                              indicator.name === 'On-Balance Volume' ? 'volume' :
                              indicator.name === 'Bollinger Bands' ? 'BollingerUpper' :
                              'price'
                            }
                            stroke={indicatorColors[indicator.name] || '#059669'} 
                            strokeWidth={1}
                            dot={false}
                          />
                        </RechartsLine>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <Badge variant={
                    indicator.signal === 'Buy' ? 'default' :
                    indicator.signal === 'Sell' ? 'destructive' : 'secondary'
                  } className="text-xs">
                    {indicator.signal}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Fundamental Analysis Section */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChart className="h-5 w-5 mr-2" />
              Fundamental Analysis
            </CardTitle>
            <CardDescription>
              Financial metrics and quarterly data
            </CardDescription>
            {/* Fundamental Analysis Signal */}
            <div className="p-3 bg-green-50 rounded-lg border border-green-200 text-center">
              <Badge className="bg-green-600 text-white mb-2">BUY</Badge>
              <p className="text-xs text-green-700">
                Strong fundamentals with consistent revenue growth and excellent profitability metrics above sector averages.
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Quarterly Metrics Table */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-sm">Quarterly Metrics</h4>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrencyMode(currencyMode === 'TRY' ? 'USD' : 'TRY')}
                  className="h-6 text-xs"
                >
                  {currencyMode === 'TRY' ? 'TRY' : 'USD'}
                </Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-1">Metric</th>
                      <th className="text-right p-1">Q2 '25</th>
                      <th className="text-right p-1">Q1 '25</th>
                      <th className="text-right p-1">Q4 '24</th>
                      <th className="text-right p-1">Q3 '24</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-1">Revenue</td>
                      <td className="text-right p-1">{currencyMode === 'TRY' ? '3,250' : '108.3'}</td>
                      <td className="text-right p-1">{currencyMode === 'TRY' ? '2,980' : '99.3'}</td>
                      <td className="text-right p-1">{currencyMode === 'TRY' ? '2,750' : '91.7'}</td>
                      <td className="text-right p-1">{currencyMode === 'TRY' ? '2,450' : '81.7'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-1">Net Income</td>
                      <td className="text-right p-1">{currencyMode === 'TRY' ? '520' : '17.3'}</td>
                      <td className="text-right p-1">{currencyMode === 'TRY' ? '465' : '15.5'}</td>
                      <td className="text-right p-1">{currencyMode === 'TRY' ? '425' : '14.2'}</td>
                      <td className="text-right p-1">{currencyMode === 'TRY' ? '385' : '12.8'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-1">EPS</td>
                      <td className="text-right p-1">{currencyMode === 'TRY' ? '7.15' : '0.24'}</td>
                      <td className="text-right p-1">{currencyMode === 'TRY' ? '6.38' : '0.21'}</td>
                      <td className="text-right p-1">{currencyMode === 'TRY' ? '5.82' : '0.19'}</td>
                      <td className="text-right p-1">{currencyMode === 'TRY' ? '5.25' : '0.18'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-1">EBITDA</td>
                      <td className="text-right p-1">{currencyMode === 'TRY' ? '780' : '26.0'}</td>
                      <td className="text-right p-1">{currencyMode === 'TRY' ? '715' : '23.8'}</td>
                      <td className="text-right p-1">{currencyMode === 'TRY' ? '650' : '21.7'}</td>
                      <td className="text-right p-1">{currencyMode === 'TRY' ? '585' : '19.5'}</td>
                    </tr>
                    <tr>
                      <td className="p-1">Total Debt</td>
                      <td className="text-right p-1">{currencyMode === 'TRY' ? '1,850' : '61.7'}</td>
                      <td className="text-right p-1">{currencyMode === 'TRY' ? '1,920' : '64.0'}</td>
                      <td className="text-right p-1">{currencyMode === 'TRY' ? '1,980' : '66.0'}</td>
                      <td className="text-right p-1">{currencyMode === 'TRY' ? '2,050' : '68.3'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quarterly Chart */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-sm">Quarterly Trends</h4>
                <div className="flex items-center space-x-2">
                  <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                    <SelectTrigger className="w-20 h-6 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedFundamentalMetric} onValueChange={setSelectedFundamentalMetric}>
                    <SelectTrigger className="w-24 h-6 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="revenue">Revenue</SelectItem>
                      <SelectItem value="income">Net Income</SelectItem>
                      <SelectItem value="eps">EPS</SelectItem>
                      <SelectItem value="ebitda">EBITDA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center space-x-2 mb-2">
                <Checkbox 
                  id="price-overlay" 
                  checked={showPriceOverlay} 
                  onCheckedChange={setShowPriceOverlay}
                />
                <label htmlFor="price-overlay" className="text-xs">Show Price Overlay</label>
              </div>
              <div className="h-32 p-2 bg-muted rounded border">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={
                    selectedFundamentalMetric === 'revenue' ? [
                      { quarter: "Q3 '24", value: currencyMode === 'TRY' ? 2450 : 81.7, price: currencyMode === 'TRY' ? 185 : 6.2 },
                      { quarter: "Q4 '24", value: currencyMode === 'TRY' ? 2750 : 91.7, price: currencyMode === 'TRY' ? 210 : 7.0 },
                      { quarter: "Q1 '25", value: currencyMode === 'TRY' ? 2980 : 99.3, price: currencyMode === 'TRY' ? 245 : 8.2 },
                      { quarter: "Q2 '25", value: currencyMode === 'TRY' ? 3250 : 108.3, price: currencyMode === 'TRY' ? 290 : 9.7 }
                    ] : selectedFundamentalMetric === 'income' ? [
                      { quarter: "Q3 '24", value: currencyMode === 'TRY' ? 385 : 12.8, price: currencyMode === 'TRY' ? 185 : 6.2 },
                      { quarter: "Q4 '24", value: currencyMode === 'TRY' ? 425 : 14.2, price: currencyMode === 'TRY' ? 210 : 7.0 },
                      { quarter: "Q1 '25", value: currencyMode === 'TRY' ? 465 : 15.5, price: currencyMode === 'TRY' ? 245 : 8.2 },
                      { quarter: "Q2 '25", value: currencyMode === 'TRY' ? 520 : 17.3, price: currencyMode === 'TRY' ? 290 : 9.7 }
                    ] : selectedFundamentalMetric === 'eps' ? [
                      { quarter: "Q3 '24", value: currencyMode === 'TRY' ? 5.25 : 0.18, price: currencyMode === 'TRY' ? 185 : 6.2 },
                      { quarter: "Q4 '24", value: currencyMode === 'TRY' ? 5.82 : 0.19, price: currencyMode === 'TRY' ? 210 : 7.0 },
                      { quarter: "Q1 '25", value: currencyMode === 'TRY' ? 6.38 : 0.21, price: currencyMode === 'TRY' ? 245 : 8.2 },
                      { quarter: "Q2 '25", value: currencyMode === 'TRY' ? 7.15 : 0.24, price: currencyMode === 'TRY' ? 290 : 9.7 }
                    ] : [
                      { quarter: "Q3 '24", value: currencyMode === 'TRY' ? 585 : 19.5, price: currencyMode === 'TRY' ? 185 : 6.2 },
                      { quarter: "Q4 '24", value: currencyMode === 'TRY' ? 650 : 21.7, price: currencyMode === 'TRY' ? 210 : 7.0 },
                      { quarter: "Q1 '25", value: currencyMode === 'TRY' ? 715 : 23.8, price: currencyMode === 'TRY' ? 245 : 8.2 },
                      { quarter: "Q2 '25", value: currencyMode === 'TRY' ? 780 : 26.0, price: currencyMode === 'TRY' ? 290 : 9.7 }
                    ]
                  }>
                    <XAxis dataKey="quarter" fontSize={10} />
                    <YAxis yAxisId="left" fontSize={10} />
                    {showPriceOverlay && <YAxis yAxisId="right" orientation="right" fontSize={10} />}
                    <Line yAxisId="left" type="monotone" dataKey="value" stroke="#059669" strokeWidth={2} dot={{ r: 3 }} />
                    {showPriceOverlay && (
                      <Line yAxisId="right" type="monotone" dataKey="price" stroke="#1E40AF" strokeWidth={2} dot={{ r: 3 }} strokeDasharray="3 3" />
                    )}
                    <Tooltip />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Key Ratios */}
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Key Ratios</h4>
              <div className="grid grid-cols-2 gap-2">
                {fundamentalMetrics.slice(0, 4).map((metric, index) => (
                  <div key={index} className="p-2 border rounded">
                    <div className="text-xs font-semibold">{metric.name}</div>
                    <div className="text-sm font-bold">{metric.value}</div>
                    <Badge variant={
                      metric.status === 'excellent' ? 'default' :
                      metric.status === 'good' ? 'secondary' : 'destructive'
                    } className="text-xs">
                      {metric.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

          </CardContent>
        </Card>

        {/* Sentiment Analysis Section */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="h-5 w-5 mr-2" />
              Sentiment Analysis
            </CardTitle>
            <CardDescription>
              Market sentiment and news impact
            </CardDescription>
            {/* Sentiment Analysis Signal */}
            <div className="p-3 bg-green-50 rounded-lg border border-green-200 text-center">
              <Badge className="bg-green-600 text-white mb-2">BUY</Badge>
              <p className="text-xs text-green-700">
                Positive market sentiment driven by strong earnings, favorable regulations, and analyst upgrades.
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Events & News */}
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Events & News</h4>
              <div className="space-y-2">
                {relatedNews.slice(0, 3).map((news, index) => (
                  <div key={index} className="p-2 border rounded">
                    <div className="flex items-start justify-between mb-1">
                      <h5 className="font-semibold text-xs flex-1 mr-2">{news.title}</h5>
                      <Badge className={getImpactColor(news.impact)} size="sm">
                        {news.impact}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{news.summary.substring(0, 80)}...</p>
                    <div className="text-xs text-muted-foreground mt-1">{news.date}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Expected Legislations */}
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Expected Legislations</h4>
              <div className="space-y-2">
                <div className="p-2 border rounded">
                  <div className="font-semibold text-xs">Aviation Tax Reform</div>
                  <p className="text-xs text-muted-foreground">Expected reduction in aviation taxes may boost profitability</p>
                  <Badge className="text-xs bg-green-100 text-green-700">Positive Impact</Badge>
                </div>
                <div className="p-2 border rounded">
                  <div className="font-semibold text-xs">Tourism Incentives</div>
                  <p className="text-xs text-muted-foreground">New tourism promotion policies to increase passenger demand</p>
                  <Badge className="text-xs bg-green-100 text-green-700">Positive Impact</Badge>
                </div>
              </div>
            </div>

            {/* Key Player Forecasts - Split into two sections */}
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Key Player Forecasts</h4>
              
              {/* Credibility Order */}
              <div className="space-y-2">
                <h5 className="font-medium text-xs text-muted-foreground">Credibility Order</h5>
                <div className="space-y-1">
                  {[
                    { name: 'İş Yatırım', action: 'HOLD', target: '₺190.00' },
                    { name: 'Garanti Yatırım', action: 'BUY', target: '₺205.00' },
                    { name: 'Yapı Kredi Yatırım', action: 'BUY', target: '₺215.00' },
                  ].map((rec, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                      <div>
                        <div className="font-semibold text-xs">{rec.name}</div>
                        <div className="text-xs text-muted-foreground">Target: {rec.target}</div>
                      </div>
                      <Badge className={getRecommendationColor(rec.action)}>
                        {rec.action}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Exchange Analysis Order */}
              <div className="space-y-2">
                <h5 className="font-medium text-xs text-muted-foreground">Exchange Analysis Order</h5>
                <div className="space-y-1">
                  {[
                    { name: 'Akbank Yatırım', action: 'BUY', target: '₺200.00' },
                    { name: 'Yapı Kredi Yatırım', action: 'BUY', target: '₺215.00' },
                    { name: 'Garanti Yatırım', action: 'BUY', target: '₺205.00' },
                  ].map((rec, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                      <div>
                        <div className="font-semibold text-xs">{rec.name}</div>
                        <div className="text-xs text-muted-foreground">Target: {rec.target}</div>
                      </div>
                      <Badge className={getRecommendationColor(rec.action)}>
                        {rec.action}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Overall Sentiment */}
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Overall Sentiment</h4>
              <div className="text-center">
                <div className="text-lg font-bold text-green-600 mb-1">{sentimentAnalysis.overall}</div>
                <div className="text-sm font-semibold mb-2">{sentimentAnalysis.score}/100</div>
                <Progress value={sentimentAnalysis.score} className="h-2" />
              </div>
            </div>

          </CardContent>
        </Card>
      </div>

      {/* Thumbnail Dialog */}
      <Dialog open={thumbnailDialog.open} onOpenChange={(open) => setThumbnailDialog({ open, indicator: '' })}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{thumbnailDialog.indicator} - Time Series Analysis</DialogTitle>
          </DialogHeader>
          <div className="h-64 p-4 bg-muted rounded-lg">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLine data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }}
                  labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: 'bold' }}
                />
                <Line 
                  type="monotone" 
                  dataKey={
                    thumbnailDialog.indicator === 'RSI' ? 'RSI' :
                    thumbnailDialog.indicator === 'MACD' ? 'MACD' :
                    thumbnailDialog.indicator === 'On-Balance Volume' ? 'volume' :
                    thumbnailDialog.indicator === 'Bollinger Bands' ? 'BollingerUpper' :
                    'price'
                  }
                  stroke={indicatorColors[thumbnailDialog.indicator] || '#059669'} 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </RechartsLine>
            </ResponsiveContainer>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default StockDetail