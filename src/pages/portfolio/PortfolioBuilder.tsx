import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'
import { Badge } from '../../components/ui/badge'
import { Separator } from '../../components/ui/separator'
import { Switch } from '../../components/ui/switch'
import { Slider } from '../../components/ui/slider'
import { 
  Building2, 
  Target, 
  Calendar, 
  TrendingUp, 
  AlertTriangle,
  Plus,
  Minus,
  Settings,
  Zap,
  Brain,
  BarChart3,
  Info,
  CheckCircle
} from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../components/ui/tooltip'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '../../components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table'

const PortfolioBuilder = () => {
  const location = useLocation()
  const [portfolioMode, setPortfolioMode] = useState<'auto' | 'assisted'>('assisted')
  const [portfolioName, setPortfolioName] = useState('')
  const [fundType, setFundType] = useState('')
  const [minStockPercentage, setMinStockPercentage] = useState(80)
  const [showPortfolioPreview, setShowPortfolioPreview] = useState(false)
  const [createdPortfolio, setCreatedPortfolio] = useState<any>(null)
  const [selectedStocks, setSelectedStocks] = useState([
    { 
      symbol: 'THYAO', 
      allocation: 15, 
      recommendation: 'BUY',
      companyInfo: {
        ceo: 'Bilal Ekşi',
        employees: '28,500',
        marketCap: '₺45.2B',
        peRatio: '9.8',
        sector: 'Ulaştırma'
      }
    },
    { 
      symbol: 'BIMAS', 
      allocation: 12, 
      recommendation: 'HOLD',
      companyInfo: {
        ceo: 'Mustafa Latif Topbaş',
        employees: '65,000',
        marketCap: '₺92.1B',
        peRatio: '15.2',
        sector: 'Perakende'
      }
    },
    { 
      symbol: 'AKBNK', 
      allocation: 20, 
      recommendation: 'BUY',
      companyInfo: {
        ceo: 'Hakan Binbaşgil',
        employees: '15,800',
        marketCap: '₺155.4B',
        peRatio: '3.9',
        sector: 'Bankacılık'
      }
    },
  ])

  const automationSettings = {
    frequency: 'weekly',
    events: ['earnings', 'dividend', 'news'],
    benchmarks: ['BIST100', 'BIST30']
  }

  const availableStocks = [
    { 
      symbol: 'EREGL', 
      name: 'Ereğli Demir Çelik', 
      sector: 'Metal', 
      price: '₺42.15',
      monthlyPerformance: '+18.5%',
      dailyPerformance: '+2.3%',
      dailyLow: '₺41.20',
      dailyHigh: '₺43.80',
      value: '₺2,845,000',
      companyInfo: {
        ceo: 'Süleyman Ege',
        employees: '8,500',
        marketCap: '₺48.5B',
        peRatio: '8.2',
        sector: 'Demir-Çelik'
      }
    },
    { 
      symbol: 'GARAN', 
      name: 'Garanti BBVA', 
      sector: 'Banking', 
      price: '₺89.50',
      monthlyPerformance: '+12.1%',
      dailyPerformance: '+0.8%',
      dailyLow: '₺88.20',
      dailyHigh: '₺90.40',
      value: '₺3,750,000',
      companyInfo: {
        ceo: 'Ebru Dildar Edin',
        employees: '19,500',
        marketCap: '₺375.8B',
        peRatio: '4.6',
        sector: 'Bankacılık'
      }
    },
    { 
      symbol: 'SISE', 
      name: 'Şişe Cam', 
      sector: 'Glass', 
      price: '₺28.75',
      monthlyPerformance: '+9.7%',
      dailyPerformance: '+1.2%',
      dailyLow: '₺28.10',
      dailyHigh: '₺29.20',
      value: '₺1,435,000',
      companyInfo: {
        ceo: 'Görkem Elverici',
        employees: '22,000',
        marketCap: '₺143.5B',
        peRatio: '12.4',
        sector: 'Cam-Seramik'
      }
    },
    { 
      symbol: 'TUPRS', 
      name: 'Tüpraş', 
      sector: 'Energy', 
      price: '₺156.20',
      monthlyPerformance: '+15.3%',
      dailyPerformance: '+2.8%',
      dailyLow: '₺154.20',
      dailyHigh: '₺159.80',
      value: '₺1,875,000',
      companyInfo: {
        ceo: 'İbrahim Yelmenoğlu',
        employees: '5,200',
        marketCap: '₺187.4B',
        peRatio: '6.8',
        sector: 'Petrol-Kimya'
      }
    },
  ]

  const addStock = (stock: typeof availableStocks[0]) => {
    setSelectedStocks([...selectedStocks, { 
      symbol: stock.symbol, 
      allocation: 5, 
      recommendation: 'HOLD',
      companyInfo: stock.companyInfo
    }])
  }

  const removeStock = (symbol: string) => {
    setSelectedStocks(selectedStocks.filter(s => s.symbol !== symbol))
  }

  const updateAllocation = (symbol: string, allocation: number) => {
    setSelectedStocks(selectedStocks.map(s => 
      s.symbol === symbol ? { ...s, allocation } : s
    ))
  }

  const totalAllocation = selectedStocks.reduce((sum, stock) => sum + stock.allocation, 0)

  const fundTypes = [
    { value: 'equity-intensive', label: 'Hisse Senedi Yoğun Fon', minStock: 80, maxStock: 100 },
    { value: 'fund-basket', label: 'Fon Sepeti Hisse Fonları', minStock: 80, maxStock: 100 },
    { value: 'equity', label: 'Hisse Senedi Fonu', minStock: 51, maxStock: 100 },
    { value: 'index', label: 'Endeks Fonu', minStock: 51, maxStock: 100 },
    { value: 'free-equity', label: 'Serbest Hisse Senedi Fonu', minStock: 51, maxStock: 100 },
    { value: 'thematic', label: 'Tematik Hisse Fonu', minStock: 51, maxStock: 100 },
    { value: 'foreign-equity', label: 'Yabancı Hisse Senedi Fonu', minStock: 51, maxStock: 100 },
    { value: 'participation-equity', label: 'Katılım Hisse Senedi Fonu', minStock: 51, maxStock: 100 },
  ]

  const selectedFundType = fundTypes.find(f => f.value === fundType)

  const canCreatePortfolio = portfolioMode === 'auto' ? (portfolioName && fundType) : (portfolioName && fundType && totalAllocation === 100)

  const [showPortfolioSummary, setShowPortfolioSummary] = useState(false)

  // Set default minStockPercentage when fund type changes, but allow user to adjust
  useEffect(() => {
    if (selectedFundType && minStockPercentage < selectedFundType.minStock) {
      setMinStockPercentage(selectedFundType.minStock)
    }
  }, [fundType, selectedFundType, minStockPercentage])

  const handleCreatePortfolio = () => {
    setShowPortfolioPreview(true)
  }

  const confirmCreatePortfolio = () => {
    // Create the actual portfolio
    const newPortfolio = {
      id: Date.now().toString(),
      name: portfolioName,
      fundType: selectedFundType?.label,
      mode: portfolioMode,
      minStockPercentage,
      stocks: portfolioMode === 'assisted' ? selectedStocks : [],
      createdAt: new Date().toISOString(),
      totalAllocation: portfolioMode === 'assisted' ? totalAllocation : 100,
      expectedReturn: '12-15%',
      riskLevel: 'Moderate'
    }
    
    setCreatedPortfolio(newPortfolio)
    setShowPortfolioPreview(false)
    setShowPortfolioSummary(true)
    
    // Reset form
    setPortfolioName('')
    setFundType('')
    setMinStockPercentage(80)
    setSelectedStocks([
      { 
        symbol: 'THYAO', 
        allocation: 15, 
        recommendation: 'BUY',
        companyInfo: {
          ceo: 'Bilal Ekşi',
          employees: '28,500',
          marketCap: '₺45.2B',
          peRatio: '9.8',
          sector: 'Ulaştırma'
        }
      }
    ])
  }

  return (
    <TooltipProvider>
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center">
            <Building2 className="h-8 w-8 mr-3 text-primary" />
            Portfolio Builder
          </h1>
          <p className="text-muted-foreground">Create and customize your investment portfolio</p>
        </div>
        <Badge variant="outline" className="text-blue-600 border-blue-200">
          <Brain className="h-3 w-3 mr-1" />
          AI Assisted
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Builder */}
        <div className="lg:col-span-2 space-y-6">
          {/* Portfolio Mode Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Configuration</CardTitle>
              <CardDescription>
                Choose mode and configure your portfolio settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="portfolio-name">Portfolio Name</Label>
                <Input
                  id="portfolio-name"
                  placeholder="My Investment Portfolio"
                  value={portfolioName}
                  onChange={(e) => setPortfolioName(e.target.value)}
                  className="mt-1"
                />
              </div>

              <Separator />

              <div>
                <Label htmlFor="fund-type">Fund Type</Label>
                <Select value={fundType} onValueChange={setFundType}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select fund type" />
                  </SelectTrigger>
                  <SelectContent>
                    {fundTypes.map(fund => (
                      <SelectItem key={fund.value} value={fund.value}>
                        {fund.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedFundType && (
                <div>
                  <Label htmlFor="stock-percentage" className="flex items-center">
                    Minimum Stock Percentage
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 ml-1 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Adjust the minimum stock allocation percentage for your fund type</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {selectedFundType.label} typically requires {selectedFundType.minStock}%-{selectedFundType.maxStock}%
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </Label>
                  <div className="mt-2 space-y-2">
                    <Slider
                      value={[minStockPercentage]}
                      onValueChange={([value]) => setMinStockPercentage(value)}
                      min={selectedFundType.minStock}
                      max={selectedFundType.maxStock}
                      step={1}
                      className="mt-2"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Min: {selectedFundType.minStock}%</span>
                      <span className="font-semibold text-primary bg-primary/10 px-2 py-1 rounded">
                        {minStockPercentage}%
                      </span>
                      <span>Max: {selectedFundType.maxStock}%</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      This percentage of your portfolio will be allocated to stocks
                    </div>
                  </div>
                </div>
              )}

              <Separator />

              <Tabs value={portfolioMode} onValueChange={(value) => setPortfolioMode(value as 'auto' | 'assisted')}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="auto" className="flex items-center">
                    <Zap className="h-4 w-4 mr-2" />
                    Full Auto
                  </TabsTrigger>
                  <TabsTrigger value="assisted" className="flex items-center">
                    <Brain className="h-4 w-4 mr-2" />
                    Assisted
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="auto" className="mt-4 space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-2">Fully Automated Portfolio</h4>
                    <p className="text-sm text-blue-700">
                      AI will automatically select stocks, allocations, and manage rebalancing based on your risk profile and goals.
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="assisted" className="mt-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-900 mb-2">AI-Assisted Building</h4>
                    <p className="text-sm text-green-700">
                      You select stocks with AI recommendations and detailed analysis for each position.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Automation Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Automation Settings
              </CardTitle>
              <CardDescription>
                Configure when and how your portfolio should be rebalanced
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="frequency">Rebalancing Frequency</Label>
                  <Select defaultValue="weekly">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="benchmark">Primary Benchmark</Label>
                  <Select defaultValue="BIST100">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BIST100">BIST 100</SelectItem>
                      <SelectItem value="BIST30">BIST 30</SelectItem>
                      <SelectItem value="USD">USD/TRY</SelectItem>
                      <SelectItem value="GOLD">Gold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="risk">Risk Level</Label>
                  <Select defaultValue="moderate">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="conservative">Conservative</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="aggressive">Aggressive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div>
                <Label className="text-base font-semibold">Event Triggers</Label>
                <p className="text-sm text-muted-foreground mb-3">
                  Automatically rebalance when these events occur
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['Earnings Reports', 'Dividend Announcements', 'Major News', 'Technical Signals'].map((event) => (
                    <div key={event} className="flex items-center space-x-2">
                      <Switch id={event} defaultChecked />
                      <Label htmlFor={event} className="text-sm">{event}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stock Selection */}
          {portfolioMode === 'assisted' && (
            <Card>
              <CardHeader>
                <CardTitle>Stock Selection</CardTitle>
                <CardDescription>
                  Add stocks to your portfolio with AI recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Current Stocks */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <Label className="text-base font-semibold">Selected Stocks</Label>
                      <Badge variant={totalAllocation === 100 ? "default" : "destructive"}>
                        {totalAllocation}% Allocated
                      </Badge>
                    </div>
                    
                    <div className="space-y-3">
                      {selectedStocks.map((stock) => (
                        <div key={stock.symbol} className="flex items-center justify-between p-3 border rounded-lg">
                          <Link 
                            to={`/stock/${stock.symbol}`} 
                            state={{ from: location.pathname }}
                            className="flex items-center space-x-3 hover:text-primary transition-colors"
                          >
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div>
                                  <div className="font-semibold">{stock.symbol}</div>
                                  <Badge variant={
                                    stock.recommendation === 'BUY' ? 'default' : 
                                    stock.recommendation === 'HOLD' ? 'secondary' : 'destructive'
                                  } className="text-xs">
                                    {stock.recommendation}
                                  </Badge>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent className="bg-card border p-4 max-w-sm">
                                <div className="space-y-3">
                                  <div>
                                    <div className="font-semibold text-lg">{stock.symbol}</div>
                                    <Badge variant={
                                      stock.recommendation === 'BUY' ? 'default' : 
                                      stock.recommendation === 'HOLD' ? 'secondary' : 'destructive'
                                    } className="text-xs mt-1">
                                      {stock.recommendation}
                                    </Badge>
                                  </div>
                                  <Separator />
                                  <div className="space-y-2">
                                    <h4 className="font-semibold text-sm">Company Information</h4>
                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">CEO:</span>
                                        <span className="font-medium">{stock.companyInfo.ceo}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">Employees:</span>
                                        <span className="font-medium">{stock.companyInfo.employees}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">Market Cap:</span>
                                        <span className="font-medium">{stock.companyInfo.marketCap}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">P/E Ratio:</span>
                                        <span className="font-medium">{stock.companyInfo.peRatio}</span>
                                      </div>
                                      <div className="flex justify-between col-span-2">
                                        <span className="text-muted-foreground">Sector:</span>
                                        <span className="font-medium">{stock.companyInfo.sector}</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="text-xs text-muted-foreground pt-1 border-t">
                                    Click to view detailed analysis
                                  </div>
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          </Link>
                          
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateAllocation(stock.symbol, Math.max(0, stock.allocation - 1))}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-12 text-center font-semibold">{stock.allocation}%</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateAllocation(stock.symbol, Math.min(100, stock.allocation + 1))}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeStock(stock.symbol)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Available Stocks */}
                  <div>
                    <Label className="text-base font-semibold">Add Stocks</Label>
                    <div className="mt-3 border rounded-lg">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Symbol</TableHead>
                            <TableHead>Allocation</TableHead>
                            <TableHead>Value</TableHead>
                            <TableHead>Monthly Performance</TableHead>
                            <TableHead>Daily Performance</TableHead>
                            <TableHead>Daily Low</TableHead>
                            <TableHead>Daily High</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {availableStocks.map((stock) => (
                            <TableRow key={stock.symbol}>
                              <TableCell>
                                <Link 
                                  to={`/stock/${stock.symbol}`} 
                                  state={{ from: location.pathname }}
                                  className="hover:text-primary transition-colors"
                                >
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <div className="font-semibold cursor-pointer">{stock.symbol}</div>
                                    </TooltipTrigger>
                                    <TooltipContent className="bg-card border p-4 max-w-sm">
                                      <div className="space-y-3">
                                        <div>
                                          <div className="font-semibold text-lg">{stock.symbol}</div>
                                          <div className="text-sm text-muted-foreground">{stock.name}</div>
                                        </div>
                                        <Separator />
                                        <div className="space-y-2">
                                          <h4 className="font-semibold text-sm">Company Information</h4>
                                          <div className="grid grid-cols-2 gap-2 text-xs">
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">CEO:</span>
                                              <span className="font-medium">{stock.companyInfo.ceo}</span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">Employees:</span>
                                              <span className="font-medium">{stock.companyInfo.employees}</span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">Market Cap:</span>
                                              <span className="font-medium">{stock.companyInfo.marketCap}</span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">P/E Ratio:</span>
                                              <span className="font-medium">{stock.companyInfo.peRatio}</span>
                                            </div>
                                            <div className="flex justify-between col-span-2">
                                              <span className="text-muted-foreground">Sector:</span>
                                              <span className="font-medium">{stock.companyInfo.sector}</span>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="text-xs text-muted-foreground pt-1 border-t">
                                          Click to view detailed analysis
                                        </div>
                                      </div>
                                    </TooltipContent>
                                  </Tooltip>
                                </Link>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center space-x-2">
                                  <span>-</span>
                                  <div className="w-20 bg-gray-200 rounded-full h-2 opacity-50">
                                    <div className="bg-gray-400 h-2 rounded-full w-0" />
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell className="font-semibold">{stock.value}</TableCell>
                              <TableCell>
                                <Badge variant={stock.monthlyPerformance.startsWith('+') ? 'default' : 'destructive'}>
                                  {stock.monthlyPerformance}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Badge variant={stock.dailyPerformance.startsWith('+') ? 'default' : 'destructive'}>
                                  {stock.dailyPerformance}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-red-600 font-medium">{stock.dailyLow}</TableCell>
                              <TableCell className="text-green-600 font-medium">{stock.dailyHigh}</TableCell>
                              <TableCell>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addStock(stock)}
                                  disabled={selectedStocks.some(s => s.symbol === stock.symbol)}
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Portfolio Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2" />
                Portfolio Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Stocks</span>
                <span className="font-semibold">{selectedStocks.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Allocation</span>
                <span className="font-semibold">{totalAllocation}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Risk Level</span>
                <Badge variant="secondary">Moderate</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Expected Return</span>
                <span className="font-semibold text-green-600">12-15%</span>
              </div>
              
              <Separator />
              
              <Button 
                className="w-full" 
                disabled={!canCreatePortfolio}
                onClick={handleCreatePortfolio}
              >
                <Building2 className="h-4 w-4 mr-2" />
                Create Portfolio
              </Button>
              
              {!canCreatePortfolio && (
                <div className="flex items-center space-x-2 text-sm text-amber-600">
                  <AlertTriangle className="h-4 w-4" />
                  <span>
                    {!portfolioName && 'Portfolio name required. '}
                    {!fundType && 'Fund type required. '}
                    {portfolioMode === 'assisted' && totalAllocation !== 100 && 'Allocation must equal 100%'}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* AI Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="h-5 w-5 mr-2" />
                AI Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start space-x-2">
                  <TrendingUp className="h-4 w-4 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">Strong Banking Exposure</p>
                    <p className="text-xs text-blue-700">Consider diversifying into technology sector</p>
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-start space-x-2">
                  <BarChart3 className="h-4 w-4 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-green-900">Good Risk Balance</p>
                    <p className="text-xs text-green-700">Portfolio shows balanced risk-return profile</p>
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-amber-900">Market Timing</p>
                    <p className="text-xs text-amber-700">Current market conditions favor defensive stocks</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Portfolio Preview Dialog */}
      <Dialog open={showPortfolioPreview} onOpenChange={setShowPortfolioPreview}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Building2 className="h-5 w-5 mr-2 text-primary" />
              Portfolio Preview
            </DialogTitle>
            <DialogDescription>
              Review your portfolio configuration before creating
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-muted rounded-lg">
                <div className="text-sm text-muted-foreground">Portfolio Name</div>
                <div className="font-semibold">{portfolioName}</div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="text-sm text-muted-foreground">Fund Type</div>
                <div className="font-semibold">{selectedFundType?.label}</div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="text-sm text-muted-foreground">Mode</div>
                <div className="font-semibold capitalize">{portfolioMode === 'auto' ? 'Full Auto' : 'AI Assisted'}</div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="text-sm text-muted-foreground">Min Stock Percentage</div>
                <div className="font-semibold">{minStockPercentage}%</div>
              </div>
            </div>

            {portfolioMode === 'assisted' && (
              <div>
                <h4 className="font-semibold mb-3 flex items-center">
                  Portfolio Holdings
                  <Badge variant={totalAllocation === 100 ? "default" : "destructive"} className="ml-2">
                    {totalAllocation}% Allocated
                  </Badge>
                </h4>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {selectedStocks.map((stock) => (
                    <div key={stock.symbol} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div>
                          <div className="font-semibold">{stock.symbol}</div>
                          <Badge variant={
                            stock.recommendation === 'BUY' ? 'default' : 
                            stock.recommendation === 'HOLD' ? 'secondary' : 'destructive'
                          } className="text-xs mt-1">
                            {stock.recommendation}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{stock.allocation}%</div>
                        <div className="text-sm text-muted-foreground">Allocation</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {portfolioMode === 'auto' && (
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">AI Will Select Your Holdings</h4>
                <p className="text-sm text-blue-700">
                  Our AI will automatically select stocks and allocations based on your fund type ({selectedFundType?.label}) 
                  with a minimum {minStockPercentage}% stock allocation. The portfolio will be optimized for your risk profile.
                </p>
              </div>
            )}

            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-900 mb-2">Expected Performance</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-green-700">Expected Return:</span>
                  <span className="font-semibold text-green-900 ml-2">12-15%</span>
                </div>
                <div>
                  <span className="text-green-700">Risk Level:</span>
                  <span className="font-semibold text-green-900 ml-2">Moderate</span>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPortfolioPreview(false)}>
              Cancel
            </Button>
            <Button onClick={confirmCreatePortfolio} className="bg-primary hover:bg-primary/90">
              <CheckCircle className="h-4 w-4 mr-2" />
              Confirm & Create Portfolio
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Portfolio Success Dialog */}
      <Dialog open={showPortfolioSummary} onOpenChange={setShowPortfolioSummary}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
              Portfolio Created Successfully
            </DialogTitle>
            <DialogDescription>
              {createdPortfolio?.name} has been created and saved to your account
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {createdPortfolio && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="text-sm text-muted-foreground">Portfolio Name</div>
                    <div className="font-semibold">{createdPortfolio.name}</div>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="text-sm text-muted-foreground">Fund Type</div>
                    <div className="font-semibold">{createdPortfolio.fundType}</div>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="text-sm text-muted-foreground">Mode</div>
                    <div className="font-semibold capitalize">{createdPortfolio.mode === 'auto' ? 'Full Auto' : 'AI Assisted'}</div>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="text-sm text-muted-foreground">Min Stock Percentage</div>
                    <div className="font-semibold">{createdPortfolio.minStockPercentage}%</div>
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-2">Portfolio Successfully Created!</h4>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-green-700">Portfolio ID:</span>
                      <div className="font-mono text-xs text-green-800">{createdPortfolio.id}</div>
                    </div>
                    <div>
                      <span className="text-green-700">Expected Return:</span>
                      <div className="font-semibold text-green-900">{createdPortfolio.expectedReturn}</div>
                    </div>
                    <div>
                      <span className="text-green-700">Risk Level:</span>
                      <div className="font-semibold text-green-900">{createdPortfolio.riskLevel}</div>
                    </div>
                  </div>
                </div>

                {createdPortfolio.mode === 'assisted' && createdPortfolio.stocks.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3">Portfolio Holdings</h4>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {createdPortfolio.stocks.map((stock: any) => (
                        <div key={stock.symbol} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div>
                              <div className="font-semibold">{stock.symbol}</div>
                              <Badge variant={
                                stock.recommendation === 'BUY' ? 'default' : 
                                stock.recommendation === 'HOLD' ? 'secondary' : 'destructive'
                              } className="text-xs mt-1">
                                {stock.recommendation}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">{stock.allocation}%</div>
                            <div className="text-sm text-muted-foreground">Allocation</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {createdPortfolio.mode === 'auto' && (
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-2">AI-Managed Portfolio</h4>
                    <p className="text-sm text-blue-700">
                      Your portfolio is being managed by our AI system. Stock selection and rebalancing will happen automatically 
                      based on market conditions and your risk profile.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPortfolioSummary(false)}>
              Close
            </Button>
            <Button asChild>
              <Link to="/portfolio/manager">
                View in Portfolio Manager
              </Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
    </TooltipProvider>
  )
}

export default PortfolioBuilder