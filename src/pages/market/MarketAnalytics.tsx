import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'
import { Badge } from '../../components/ui/badge'
import { Input } from '../../components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table'
import { Link, useLocation } from 'react-router-dom'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../components/ui/tooltip'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Search,
  Star,
  Building2,
  Coins,
  Globe,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Filter,
  Eye
} from 'lucide-react'

const MarketAnalytics = () => {
  const location = useLocation()
  const [selectedSector, setSelectedSector] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const marketData = [
    { symbol: 'THYAO', name: 'Türk Hava Yolları', price: '₺185.50', change: '+3.2%', volume: '₺45.2M', sector: 'Transportation', trend: 'up' },
    { symbol: 'BIMAS', name: 'BİM Birleşik Mağazalar', price: '₺142.30', change: '+1.8%', volume: '₺32.1M', sector: 'Retail', trend: 'up' },
    { symbol: 'AKBNK', name: 'Akbank', price: '₺58.75', change: '-0.5%', volume: '₺89.3M', sector: 'Banking', trend: 'down' },
    { symbol: 'EREGL', name: 'Ereğli Demir Çelik', price: '₺42.15', change: '+2.7%', volume: '₺28.7M', sector: 'Metal', trend: 'up' },
    { symbol: 'GARAN', name: 'Garanti BBVA', price: '₺89.50', change: '+1.2%', volume: '₺67.8M', sector: 'Banking', trend: 'up' },
    { symbol: 'SISE', name: 'Şişe Cam', price: '₺28.75', change: '-1.1%', volume: '₺15.4M', sector: 'Glass', trend: 'down' },
  ]

  const brokeragePortfolios = [
    { name: 'Garanti Yatırım Model Portföy', return: '+18.5%', risk: 'Moderate', assets: 15, aum: '₺2.1B' },
    { name: 'İş Yatırım Büyüme Portföyü', return: '+16.2%', risk: 'High', assets: 12, aum: '₺1.8B' },
    { name: 'Yapı Kredi Dengeli Portföy', return: '+12.8%', risk: 'Low', assets: 20, aum: '₺3.2B' },
    { name: 'Akbank Teknoloji Portföyü', return: '+22.1%', risk: 'High', assets: 8, aum: '₺950M' },
  ]

  const currentStars = [
    { symbol: 'ASELS', name: 'Aselsan', reason: 'Defense contracts', change: '+5.8%', trend: 'up' },
    { symbol: 'LOGO', name: 'Logo Yazılım', reason: 'Tech growth', change: '+4.2%', trend: 'up' },
    { symbol: 'TUPRS', name: 'Tüpraş', reason: 'Oil prices', change: '+3.9%', trend: 'up' },
    { symbol: 'KCHOL', name: 'Koç Holding', reason: 'Diversification', change: '+2.1%', trend: 'up' },
  ]

  const commodities = {
    preciousMetals: [
      { name: 'Gold (TRY/Ounce)', price: '₺68,450', change: '+1.2%', trend: 'up' },
      { name: 'Silver (TRY/Ounce)', price: '₺2,180', change: '+0.8%', trend: 'up' },
      { name: 'Platinum (TRY/Ounce)', price: '₺32,150', change: '-0.3%', trend: 'down' },
      { name: 'Palladium (TRY/Ounce)', price: '₺35,890', change: '+2.1%', trend: 'up' },
    ],
    fossilFuels: [
      { name: 'Crude Oil (Brent)', price: '$82.45', change: '+2.3%', trend: 'up' },
      { name: 'Natural Gas', price: '$3.21', change: '-1.5%', trend: 'down' },
      { name: 'Coal', price: '$135.20', change: '+0.8%', trend: 'up' },
      { name: 'Heating Oil', price: '$2.89', change: '+1.9%', trend: 'up' },
    ],
    food: [
      { name: 'Wheat', price: '$195.50', change: '-0.7%', trend: 'down' },
      { name: 'Corn', price: '$142.25', change: '+1.1%', trend: 'up' },
      { name: 'Soybeans', price: '$385.75', change: '+0.5%', trend: 'up' },
      { name: 'Sugar', price: '$22.85', change: '-2.3%', trend: 'down' },
    ]
  }

  const sectorExpectations = [
    { sector: 'Banking', expectation: 'Positive', target_date: '2024-Q2', confidence: 'High', change: '+15%' },
    { sector: 'Technology', expectation: 'Very Positive', target_date: '2024-Q2', confidence: 'Medium', change: '+25%' },
    { sector: 'Energy', expectation: 'Neutral', target_date: '2024-Q1', confidence: 'High', change: '+5%' },
    { sector: 'Retail', expectation: 'Positive', target_date: '2024-Q2', confidence: 'Medium', change: '+12%' },
  ]

  const filteredMarketData = marketData.filter(stock => {
    const matchesSearch = stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         stock.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSector = selectedSector === 'all' || stock.sector === selectedSector
    return matchesSearch && matchesSector
  })

  return (
    <TooltipProvider>
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center">
            <BarChart3 className="h-8 w-8 mr-3 text-primary" />
            Market Analytics
          </h1>
          <p className="text-muted-foreground">Comprehensive market data and analysis tools</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-green-600 border-green-200">
            <Activity className="h-3 w-3 mr-1" />
            Live Data
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="stocks">Stocks</TabsTrigger>
          <TabsTrigger value="portfolios">Portfolios</TabsTrigger>
          <TabsTrigger value="commodities">Commodities</TabsTrigger>
          <TabsTrigger value="sectors">Sectors</TabsTrigger>
          <TabsTrigger value="countries">Countries</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Key Market Data */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Key Market Data</CardTitle>
                  <CardDescription>
                    Real-time market indices and key indicators
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-3 border rounded-lg">
                      <div className="text-sm text-muted-foreground">BIST 100</div>
                      <div className="text-xl font-bold">9,847.23</div>
                      <div className="text-sm text-green-600">+1.8%</div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="text-sm text-muted-foreground">BIST 30</div>
                      <div className="text-xl font-bold">10,234.56</div>
                      <div className="text-sm text-green-600">+2.1%</div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="text-sm text-muted-foreground">USD/TRY</div>
                      <div className="text-xl font-bold">32.45</div>
                      <div className="text-sm text-red-600">-0.3%</div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="text-sm text-muted-foreground">EUR/TRY</div>
                      <div className="text-xl font-bold">35.12</div>
                      <div className="text-sm text-red-600">-0.1%</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Current Stars */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="h-5 w-5 mr-2 text-yellow-500" />
                  Current Stars
                </CardTitle>
                <CardDescription>
                  Today's trending stocks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {currentStars.map((stock) => (
                    <Link 
                      key={stock.symbol} 
                      to={`/stock/${stock.symbol}`}
                      className="block hover:bg-muted/50 p-2 rounded-lg transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-sm">{stock.symbol}</div>
                          <div className="text-xs text-muted-foreground">{stock.reason}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-green-600">{stock.change}</div>
                          <TrendingUp className="h-3 w-3 text-green-600 ml-auto" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Evaluation */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Market Evaluation</CardTitle>
              <CardDescription>
                Simplified market analysis and insights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <span className="font-semibold text-green-900">Market Sentiment</span>
                  </div>
                  <p className="text-sm text-green-700">
                    <strong>Bullish</strong> - Strong buying pressure across major indices
                  </p>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                    <span className="font-semibold text-blue-900">Volume Analysis</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    <strong>Above Average</strong> - 15% higher than 30-day average
                  </p>
                </div>
                
                <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <Globe className="h-5 w-5 text-amber-600" />
                    <span className="font-semibold text-amber-900">Global Impact</span>
                  </div>
                  <p className="text-sm text-amber-700">
                    <strong>Moderate</strong> - Following global market trends
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Stocks Tab */}
        <TabsContent value="stocks" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Stock Market Data</CardTitle>
                  <CardDescription>
                    Real-time stock prices and market data
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search stocks..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Select value={selectedSector} onValueChange={setSelectedSector}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sectors</SelectItem>
                      <SelectItem value="Banking">Banking</SelectItem>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Energy">Energy</SelectItem>
                      <SelectItem value="Retail">Retail</SelectItem>
                      <SelectItem value="Transportation">Transportation</SelectItem>
                      <SelectItem value="Metal">Metal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Change</TableHead>
                    <TableHead>Volume</TableHead>
                    <TableHead>Sector</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMarketData.map((stock) => (
                    <TableRow key={stock.symbol}>
                      <TableCell className="font-semibold">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link 
                              to={`/stock/${stock.symbol}`}
                              state={{ from: location.pathname }}
                              className="hover:text-primary transition-colors cursor-pointer"
                            >
                              {stock.symbol}
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent className="bg-card border p-3 max-w-xs">
                            <div className="space-y-2">
                              <div className="font-semibold">{stock.symbol} - {stock.name}</div>
                              <div className="text-sm space-y-1">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Price:</span>
                                  <span className="font-medium">{stock.price}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Volume:</span>
                                  <span className="font-medium">{stock.volume}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Day High:</span>
                                  <span className="font-medium text-green-600">₺187.20</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Day Low:</span>
                                  <span className="font-medium text-red-600">₺182.30</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Market Cap:</span>
                                  <span className="font-medium">₺12.8B</span>
                                </div>
                              </div>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TableCell>
                      <TableCell>{stock.name}</TableCell>
                      <TableCell className="font-semibold">{stock.price}</TableCell>
                      <TableCell className={`font-semibold ${
                        stock.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        <div className="flex items-center space-x-1">
                          {stock.trend === 'up' ? (
                            <ArrowUpRight className="h-3 w-3" />
                          ) : (
                            <ArrowDownRight className="h-3 w-3" />
                          )}
                          <span>{stock.change}</span>
                        </div>
                      </TableCell>
                      <TableCell>{stock.volume}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{stock.sector}</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/stock/${stock.symbol}`} state={{ from: location.pathname }}>
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Portfolios Tab */}
        <TabsContent value="portfolios" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building2 className="h-5 w-5 mr-2" />
                Brokerage Model Portfolios
              </CardTitle>
              <CardDescription>
                Compare model portfolios from major brokerage firms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {brokeragePortfolios.map((portfolio, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold text-sm">{portfolio.name}</h3>
                        <Badge variant={
                          portfolio.risk === 'Low' ? 'secondary' : 
                          portfolio.risk === 'Moderate' ? 'default' : 'destructive'
                        }>
                          {portfolio.risk} Risk
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-muted-foreground">Return</span>
                          <div className="font-semibold text-green-600">{portfolio.return}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Assets</span>
                          <div className="font-semibold">{portfolio.assets}</div>
                        </div>
                        <div className="col-span-2">
                          <span className="text-muted-foreground">AUM</span>
                          <div className="font-semibold">{portfolio.aum}</div>
                        </div>
                      </div>
                      
                      <Button variant="outline" className="w-full mt-3" size="sm">
                        Compare Holdings
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Commodities Tab */}
        <TabsContent value="commodities" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Coins className="h-5 w-5 mr-2" />
                Commodities
              </CardTitle>
              <CardDescription>
                Global commodity prices across different categories
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Precious Metals */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Precious Metals</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {commodities.preciousMetals.map((metal, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-sm">{metal.name}</h4>
                          {metal.trend === 'up' ? (
                            <TrendingUp className="h-4 w-4 text-green-600" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-600" />
                          )}
                        </div>
                        <div className="text-xl font-bold mb-1">{metal.price}</div>
                        <div className={`text-sm font-semibold ${
                          metal.trend === 'up' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {metal.change}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Fossil Fuels */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Fossil Fuels</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {commodities.fossilFuels.map((fuel, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-sm">{fuel.name}</h4>
                          {fuel.trend === 'up' ? (
                            <TrendingUp className="h-4 w-4 text-green-600" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-600" />
                          )}
                        </div>
                        <div className="text-xl font-bold mb-1">{fuel.price}</div>
                        <div className={`text-sm font-semibold ${
                          fuel.trend === 'up' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {fuel.change}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Food */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Food</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {commodities.food.map((item, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-sm">{item.name}</h4>
                          {item.trend === 'up' ? (
                            <TrendingUp className="h-4 w-4 text-green-600" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-600" />
                          )}
                        </div>
                        <div className="text-xl font-bold mb-1">{item.price}</div>
                        <div className={`text-sm font-semibold ${
                          item.trend === 'up' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {item.change}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sectors Tab */}
        <TabsContent value="sectors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Sectoral Expectations
              </CardTitle>
              <CardDescription>
                Sector performance expectations with target dates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sector</TableHead>
                    <TableHead>Expectation</TableHead>
                    <TableHead>Target Date</TableHead>
                    <TableHead>Confidence</TableHead>
                    <TableHead>Expected Change</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sectorExpectations.map((sector, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-semibold">{sector.sector}</TableCell>
                      <TableCell>
                        <Badge variant={
                          sector.expectation === 'Very Positive' ? 'default' :
                          sector.expectation === 'Positive' ? 'secondary' : 'outline'
                        }>
                          {sector.expectation}
                        </Badge>
                      </TableCell>
                      <TableCell>{sector.target_date}</TableCell>
                      <TableCell>
                        <Badge variant={sector.confidence === 'High' ? 'default' : 'secondary'}>
                          {sector.confidence}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-semibold text-green-600">{sector.change}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Countries Tab */}
        <TabsContent value="countries" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-5 w-5 mr-2" />
                Country & Market Analysis
              </CardTitle>
              <CardDescription>
                Global market analysis and country-specific insights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="border-l-4 border-l-blue-500">
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">Turkey (BIST)</h3>
                    <div className="text-2xl font-bold text-green-600 mb-1">+12.4%</div>
                    <p className="text-sm text-muted-foreground">Strong domestic demand</p>
                  </CardContent>
                </Card>
                
                <Card className="border-l-4 border-l-green-500">
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">USA (S&P 500)</h3>
                    <div className="text-2xl font-bold text-green-600 mb-1">+8.7%</div>
                    <p className="text-sm text-muted-foreground">Tech sector growth</p>
                  </CardContent>
                </Card>
                
                <Card className="border-l-4 border-l-purple-500">
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">Europe (STOXX 600)</h3>
                    <div className="text-2xl font-bold text-green-600 mb-1">+6.2%</div>
                    <p className="text-sm text-muted-foreground">Recovery momentum</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
    </TooltipProvider>
  )
}

export default MarketAnalytics