import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'
import { Badge } from '../../components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { 
  FileText, 
  Download, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  BarChart3,
  Users,
  Building,
  Calculator,
  Eye,
  Filter,
  GripVertical
} from 'lucide-react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable'
import {
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface SortableHeaderProps {
  id: string
  children: React.ReactNode
}

const SortableHeader: React.FC<SortableHeaderProps> = ({ id, children }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <TableHead
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="relative"
    >
      <div className="flex items-center">
        <button
          {...listeners}
          className="cursor-move mr-2 text-muted-foreground hover:text-foreground"
        >
          <GripVertical className="h-4 w-4" />
        </button>
        {children}
      </div>
    </TableHead>
  )
}

const PortfolioManager = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('3m')
  const [selectedReport, setSelectedReport] = useState('performance')
  const [selectedPortfolio, setSelectedPortfolio] = useState('portfolio-1')
  const [performanceDisplay, setPerformanceDisplay] = useState<'percentage' | 'currency'>('percentage')
  
  const [columnOrder, setColumnOrder] = useState([
    'symbol',
    'allocation',
    'value',
    'monthlyPerformance',
    'dailyPerformance',
    'dailyLow',
    'dailyHigh',
    'actions'
  ])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      setColumnOrder((items) => {
        const oldIndex = items.indexOf(active.id as string)
        const newIndex = items.indexOf(over?.id as string)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  const transactions = [
    { date: '2024-01-15', type: 'BUY', symbol: 'THYAO', quantity: 1000, price: '₺165.50', total: '₺165,500', status: 'completed' },
    { date: '2024-01-10', type: 'SELL', symbol: 'AKBNK', quantity: 500, price: '₺62.30', total: '₺31,150', status: 'completed' },
    { date: '2024-01-08', type: 'BUY', symbol: 'BIMAS', quantity: 750, price: '₺138.20', total: '₺103,650', status: 'completed' },
    { date: '2024-01-05', type: 'DIVIDEND', symbol: 'EREGL', quantity: 0, price: '₺2.50', total: '₺5,000', status: 'completed' },
    { date: '2024-01-03', type: 'BUY', symbol: 'GARAN', quantity: 300, price: '₺85.75', total: '₺25,725', status: 'pending' },
  ]

  const benchmarkAnalysis = [
    { benchmark: 'BIST 100', portfolio: '+15.2%', benchmark_return: '+12.4%', difference: '+2.8%', status: 'outperform' },
    { benchmark: 'BIST 30', portfolio: '+15.2%', benchmark_return: '+14.1%', difference: '+1.1%', status: 'outperform' },
    { benchmark: 'USD/TRY', portfolio: '+15.2%', benchmark_return: '+18.5%', difference: '-3.3%', status: 'underperform' },
    { benchmark: 'Gold', portfolio: '+15.2%', benchmark_return: '+7.2%', difference: '+8.0%', status: 'outperform' },
  ]

  const whatIfScenarios = [
    {
      scenario: 'Increase THYAO allocation to 25%',
      current_return: '+15.2%',
      projected_return: '+17.8%',
      risk_change: '+0.5',
      impact: 'positive'
    },
    {
      scenario: 'Add 10% technology sector exposure',
      current_return: '+15.2%',
      projected_return: '+16.9%',
      risk_change: '+0.3',
      impact: 'positive'
    },
    {
      scenario: 'Reduce banking exposure by 50%',
      current_return: '+15.2%',
      projected_return: '+13.7%',
      risk_change: '-0.8',
      impact: 'negative'
    },
  ]

  const reportTypes = [
    { id: 'performance', name: 'Performance Report', description: 'Detailed portfolio performance analysis' },
    { id: 'investor', name: 'Investor Report', description: 'Professional report for investors' },
    { id: 'management', name: 'Management Report', description: 'Internal management summary' },
    { id: 'tax', name: 'Tax Report', description: 'Tax-related transactions and gains' },
  ]

  const portfolios = [
    { id: 'portfolio-1', name: 'Growth Portfolio', value: '₺2,450,000', return: '+15.2%' },
    { id: 'portfolio-2', name: 'Conservative Portfolio', value: '₺1,850,000', return: '+8.7%' },
    { id: 'portfolio-3', name: 'Tech Focus Portfolio', value: '₺950,000', return: '+22.4%' },
  ]

  const portfolioStocks = {
    'portfolio-1': [
      { 
        symbol: 'THYAO', 
        allocation: 15, 
        value: '₺367,500', 
        monthlyPerformance: { percentage: '+12.3%', currency: '+₺40,250' }, 
        dailyPerformance: { percentage: '+2.1%', currency: '+₺7,720' }, 
        dailyLow: '₺165.20', 
        dailyHigh: '₺168.50' 
      },
      { 
        symbol: 'AKBNK', 
        allocation: 20, 
        value: '₺490,000', 
        monthlyPerformance: { percentage: '+8.5%', currency: '+₺38,460' }, 
        dailyPerformance: { percentage: '-0.8%', currency: '-₺3,920' }, 
        dailyLow: '₺61.80', 
        dailyHigh: '₺63.20' 
      },
      { 
        symbol: 'BIMAS', 
        allocation: 12, 
        value: '₺294,000', 
        monthlyPerformance: { percentage: '+15.7%', currency: '+₺39,870' }, 
        dailyPerformance: { percentage: '+1.5%', currency: '+₺4,410' }, 
        dailyLow: '₺137.40', 
        dailyHigh: '₺140.20' 
      },
      { 
        symbol: 'EREGL', 
        allocation: 18, 
        value: '₺441,000', 
        monthlyPerformance: { percentage: '+22.1%', currency: '+₺79,980' }, 
        dailyPerformance: { percentage: '+3.2%', currency: '+₺13,720' }, 
        dailyLow: '₺41.50', 
        dailyHigh: '₺43.80' 
      },
      { 
        symbol: 'GARAN', 
        allocation: 15, 
        value: '₺367,500', 
        monthlyPerformance: { percentage: '+10.2%', currency: '+₺34,020' }, 
        dailyPerformance: { percentage: '+0.5%', currency: '+₺1,840' }, 
        dailyLow: '₺84.90', 
        dailyHigh: '₺86.50' 
      },
    ],
    'portfolio-2': [
      { 
        symbol: 'AKBNK', 
        allocation: 30, 
        value: '₺555,000', 
        monthlyPerformance: { percentage: '+5.2%', currency: '+₺27,390' }, 
        dailyPerformance: { percentage: '-0.8%', currency: '-₺4,440' }, 
        dailyLow: '₺61.80', 
        dailyHigh: '₺63.20' 
      },
      { 
        symbol: 'ISCTR', 
        allocation: 25, 
        value: '₺462,500', 
        monthlyPerformance: { percentage: '+7.8%', currency: '+₺33,430' }, 
        dailyPerformance: { percentage: '+1.2%', currency: '+₺5,550' }, 
        dailyLow: '₺18.50', 
        dailyHigh: '₺19.10' 
      },
      { 
        symbol: 'TUPRS', 
        allocation: 20, 
        value: '₺370,000', 
        monthlyPerformance: { percentage: '+12.3%', currency: '+₺40,510' }, 
        dailyPerformance: { percentage: '+2.8%', currency: '+₺10,360' }, 
        dailyLow: '₺154.20', 
        dailyHigh: '₺159.80' 
      },
      { 
        symbol: 'TOASO', 
        allocation: 15, 
        value: '₺277,500', 
        monthlyPerformance: { percentage: '+9.1%', currency: '+₺23,080' }, 
        dailyPerformance: { percentage: '+1.8%', currency: '+₺4,995' }, 
        dailyLow: '₺126.40', 
        dailyHigh: '₺129.20' 
      },
    ],
    'portfolio-3': [
      { 
        symbol: 'NETAS', 
        allocation: 35, 
        value: '₺332,500', 
        monthlyPerformance: { percentage: '+28.5%', currency: '+₺74,430' }, 
        dailyPerformance: { percentage: '+4.2%', currency: '+₺13,965' }, 
        dailyLow: '₺95.20', 
        dailyHigh: '₺99.80' 
      },
      { 
        symbol: 'ASELS', 
        allocation: 30, 
        value: '₺285,000', 
        monthlyPerformance: { percentage: '+19.7%', currency: '+₺46,845' }, 
        dailyPerformance: { percentage: '+2.5%', currency: '+₺7,125' }, 
        dailyLow: '₺145.60', 
        dailyHigh: '₺149.20' 
      },
      { 
        symbol: 'KAREL', 
        allocation: 20, 
        value: '₺190,000', 
        monthlyPerformance: { percentage: '+22.3%', currency: '+₺34,570' }, 
        dailyPerformance: { percentage: '+3.1%', currency: '+₺5,890' }, 
        dailyLow: '₺78.40', 
        dailyHigh: '₺81.20' 
      },
      { 
        symbol: 'ARENA', 
        allocation: 15, 
        value: '₺142,500', 
        monthlyPerformance: { percentage: '+17.8%', currency: '+₺21,615' }, 
        dailyPerformance: { percentage: '+1.9%', currency: '+₺2,708' }, 
        dailyLow: '₺52.30', 
        dailyHigh: '₺54.10' 
      },
    ],
  }

  const currentPortfolioStocks = portfolioStocks[selectedPortfolio] || portfolioStocks['portfolio-1']

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center">
            <FileText className="h-8 w-8 mr-3 text-primary" />
            Portfolio Manager
          </h1>
          <p className="text-muted-foreground">Manage portfolios, generate reports, and track performance</p>
        </div>
        <div className="flex items-center space-x-3">
          <Select value={selectedPortfolio} onValueChange={setSelectedPortfolio}>
            <SelectTrigger className="w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {portfolios.map(portfolio => (
                <SelectItem key={portfolio.id} value={portfolio.id}>
                  <div className="flex items-center justify-between w-full">
                    <span>{portfolio.name}</span>
                    <span className={`text-sm ml-2 ${
                      portfolio.return.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {portfolio.return}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">1 Month</SelectItem>
              <SelectItem value="3m">3 Months</SelectItem>
              <SelectItem value="6m">6 Months</SelectItem>
              <SelectItem value="1y">1 Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      <Tabs defaultValue="holdings" className="space-y-6">
        <TabsList>
          <TabsTrigger value="holdings">Holdings</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="benchmarks">Benchmark Analysis</TabsTrigger>
          <TabsTrigger value="scenarios">What-If Scenarios</TabsTrigger>
        </TabsList>

        {/* Holdings Tab */}
        <TabsContent value="holdings" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Portfolio Holdings</CardTitle>
                  <CardDescription>
                    Current stocks in {portfolios.find(p => p.id === selectedPortfolio)?.name}
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
                  <Button
                    size="sm"
                    variant={performanceDisplay === 'percentage' ? 'default' : 'ghost'}
                    onClick={() => setPerformanceDisplay('percentage')}
                    className="text-xs"
                  >
                    %
                  </Button>
                  <Button
                    size="sm"
                    variant={performanceDisplay === 'currency' ? 'default' : 'ghost'}
                    onClick={() => setPerformanceDisplay('currency')}
                    className="text-xs"
                  >
                    ₺
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <Table>
                  <TableHeader>
                    <TableRow>
                      <SortableContext
                        items={columnOrder}
                        strategy={horizontalListSortingStrategy}
                      >
                        {columnOrder.map((columnId) => (
                          <SortableHeader key={columnId} id={columnId}>
                            {columnId === 'symbol' && 'Symbol'}
                            {columnId === 'allocation' && 'Allocation'}
                            {columnId === 'value' && 'Value'}
                            {columnId === 'monthlyPerformance' && 'Monthly Performance'}
                            {columnId === 'dailyPerformance' && 'Daily Performance'}
                            {columnId === 'dailyLow' && 'Daily Low'}
                            {columnId === 'dailyHigh' && 'Daily High'}
                            {columnId === 'actions' && 'Actions'}
                          </SortableHeader>
                        ))}
                      </SortableContext>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentPortfolioStocks.map((stock) => (
                      <TableRow key={stock.symbol}>
                        {columnOrder.map((columnId) => {
                          if (columnId === 'symbol') {
                            return <TableCell key={columnId} className="font-semibold">{stock.symbol}</TableCell>
                          }
                          if (columnId === 'allocation') {
                            return (
                              <TableCell key={columnId}>
                                <div className="flex items-center space-x-2">
                                  <span>{stock.allocation}%</span>
                                  <div className="w-20 bg-gray-200 rounded-full h-2">
                                    <div 
                                      className="bg-primary h-2 rounded-full" 
                                      style={{ width: `${stock.allocation}%` }}
                                    />
                                  </div>
                                </div>
                              </TableCell>
                            )
                          }
                          if (columnId === 'value') {
                            return <TableCell key={columnId} className="font-semibold">{stock.value}</TableCell>
                          }
                          if (columnId === 'monthlyPerformance') {
                            const displayValue = performanceDisplay === 'percentage' 
                              ? stock.monthlyPerformance.percentage 
                              : stock.monthlyPerformance.currency
                            return (
                              <TableCell key={columnId}>
                                <Badge variant={displayValue.startsWith('+') ? 'default' : 'destructive'}>
                                  {displayValue}
                                </Badge>
                              </TableCell>
                            )
                          }
                          if (columnId === 'dailyPerformance') {
                            const displayValue = performanceDisplay === 'percentage' 
                              ? stock.dailyPerformance.percentage 
                              : stock.dailyPerformance.currency
                            return (
                              <TableCell key={columnId}>
                                <Badge variant={displayValue.startsWith('+') ? 'default' : 'destructive'}>
                                  {displayValue}
                                </Badge>
                              </TableCell>
                            )
                          }
                          if (columnId === 'dailyLow') {
                            return <TableCell key={columnId} className="text-red-600 font-medium">{stock.dailyLow}</TableCell>
                          }
                          if (columnId === 'dailyHigh') {
                            return <TableCell key={columnId} className="text-green-600 font-medium">{stock.dailyHigh}</TableCell>
                          }
                          if (columnId === 'actions') {
                            return (
                              <TableCell key={columnId}>
                                <Button size="sm" variant="outline" asChild>
                                  <Link to={`/stock/${stock.symbol}`}>
                                    <Eye className="h-3 w-3 mr-1" />
                                    View
                                  </Link>
                                </Button>
                              </TableCell>
                            )
                          }
                          return null
                        })}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </DndContext>
              
              <div className="mt-4 flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  Total Allocation: {currentPortfolioStocks.reduce((sum, stock) => sum + stock.allocation, 0)}%
                </div>
                <div className="text-sm">
                  Portfolio Value: <span className="font-semibold">{portfolios.find(p => p.id === selectedPortfolio)?.value}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Report Generation */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Generate Reports</CardTitle>
                  <CardDescription>
                    Create professional reports for different audiences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {reportTypes.map((report) => (
                      <Card key={report.id} className="cursor-pointer hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-semibold text-sm mb-1">{report.name}</h3>
                              <p className="text-xs text-muted-foreground mb-3">{report.description}</p>
                              <div className="flex space-x-2">
                                <Button size="sm" variant="outline">
                                  <Eye className="h-3 w-3 mr-1" />
                                  Preview
                                </Button>
                                <Button size="sm">
                                  <Download className="h-3 w-3 mr-1" />
                                  Generate
                                </Button>
                              </div>
                            </div>
                            <div className="ml-3">
                              {report.id === 'performance' && <BarChart3 className="h-5 w-5 text-blue-500" />}
                              {report.id === 'investor' && <Users className="h-5 w-5 text-green-500" />}
                              {report.id === 'management' && <Building className="h-5 w-5 text-purple-500" />}
                              {report.id === 'tax' && <Calculator className="h-5 w-5 text-orange-500" />}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Stats */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Portfolio Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Value</span>
                    <span className="font-semibold">₺2,450,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Return</span>
                    <span className="font-semibold text-green-600">+15.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Active Positions</span>
                    <span className="font-semibold">23</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Last Updated</span>
                    <span className="text-sm">2 hours ago</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm">
                    <div className="flex items-center space-x-2 mb-1">
                      <TrendingUp className="h-3 w-3 text-green-600" />
                      <span className="font-medium">THYAO +3.2%</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Strong earnings report</p>
                  </div>
                  
                  <div className="text-sm">
                    <div className="flex items-center space-x-2 mb-1">
                      <TrendingDown className="h-3 w-3 text-red-600" />
                      <span className="font-medium">AKBNK -0.5%</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Market correction</p>
                  </div>
                  
                  <div className="text-sm">
                    <div className="flex items-center space-x-2 mb-1">
                      <Calendar className="h-3 w-3 text-blue-600" />
                      <span className="font-medium">Dividend received</span>
                    </div>
                    <p className="text-xs text-muted-foreground">EREGL ₺5,000</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Transactions Tab */}
        <TabsContent value="transactions" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Transaction History</CardTitle>
                  <CardDescription>
                    Complete history of all portfolio transactions
                  </CardDescription>
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{transaction.date}</TableCell>
                      <TableCell>
                        <Badge variant={
                          transaction.type === 'BUY' ? 'default' : 
                          transaction.type === 'SELL' ? 'destructive' : 'secondary'
                        }>
                          {transaction.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-semibold">{transaction.symbol}</TableCell>
                      <TableCell>{transaction.quantity.toLocaleString()}</TableCell>
                      <TableCell>{transaction.price}</TableCell>
                      <TableCell className="font-semibold">{transaction.total}</TableCell>
                      <TableCell>
                        <Badge variant={transaction.status === 'completed' ? 'default' : 'secondary'}>
                          {transaction.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Benchmark Analysis Tab */}
        <TabsContent value="benchmarks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Benchmark Performance Analysis</CardTitle>
              <CardDescription>
                Compare your portfolio performance against major benchmarks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Benchmark</TableHead>
                    <TableHead>Portfolio Return</TableHead>
                    <TableHead>Benchmark Return</TableHead>
                    <TableHead>Difference</TableHead>
                    <TableHead>Performance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {benchmarkAnalysis.map((analysis, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-semibold">{analysis.benchmark}</TableCell>
                      <TableCell className="text-green-600 font-semibold">{analysis.portfolio}</TableCell>
                      <TableCell className="text-blue-600 font-semibold">{analysis.benchmark_return}</TableCell>
                      <TableCell className={`font-semibold ${
                        analysis.status === 'outperform' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {analysis.difference}
                      </TableCell>
                      <TableCell>
                        <Badge variant={analysis.status === 'outperform' ? 'default' : 'destructive'}>
                          {analysis.status === 'outperform' ? 'Outperform' : 'Underperform'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* What-If Scenarios Tab */}
        <TabsContent value="scenarios" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>What-If Scenario Analysis</CardTitle>
              <CardDescription>
                Explore potential portfolio modifications and their impact
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {whatIfScenarios.map((scenario, index) => (
                  <Card key={index} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm mb-2">{scenario.scenario}</h3>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Current Return</span>
                              <div className="font-semibold text-green-600">{scenario.current_return}</div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Projected Return</span>
                              <div className={`font-semibold ${
                                scenario.impact === 'positive' ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {scenario.projected_return}
                              </div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Risk Change</span>
                              <div className={`font-semibold ${
                                parseFloat(scenario.risk_change) > 0 ? 'text-red-600' : 'text-green-600'
                              }`}>
                                {scenario.risk_change}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="ml-4">
                          {scenario.impact === 'positive' ? (
                            <TrendingUp className="h-5 w-5 text-green-600" />
                          ) : (
                            <TrendingDown className="h-5 w-5 text-red-600" />
                          )}
                        </div>
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

export default PortfolioManager