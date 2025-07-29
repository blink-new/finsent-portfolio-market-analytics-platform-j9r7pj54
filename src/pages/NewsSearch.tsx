import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Badge } from '../components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { 
  Search, 
  Newspaper, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  Globe,
  Filter,
  Target,
  BarChart3,
  AlertTriangle
} from 'lucide-react'

const NewsSearch = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedImpact, setSelectedImpact] = useState('all')

  const newsArticles = [
    {
      id: 1,
      title: 'Central Bank announces new monetary policy measures',
      summary: 'Turkish Central Bank implements new policy tools to control inflation and support economic stability',
      category: 'Economic Policy',
      impact: 'High',
      date: '2024-01-15',
      source: 'Anadolu Agency',
      affectedStocks: ['AKBNK', 'GARAN', 'YKBNK', 'HALKB'],
      sentiment: 'Positive',
      readTime: '3 min'
    },
    {
      id: 2,
      title: 'Technology sector shows strong Q4 performance',
      summary: 'Turkish tech companies report record earnings with significant growth in software and services',
      category: 'Sector News',
      impact: 'Medium',
      date: '2024-01-14',
      source: 'Bloomberg HT',
      affectedStocks: ['LOGO', 'ASELS', 'NETAS', 'KAREL'],
      sentiment: 'Very Positive',
      readTime: '4 min'
    },
    {
      id: 3,
      title: 'Energy prices surge amid global supply concerns',
      summary: 'Rising energy costs expected to impact manufacturing and transportation sectors',
      category: 'Energy',
      impact: 'High',
      date: '2024-01-13',
      source: 'Hürriyet',
      affectedStocks: ['TUPRS', 'PETKM', 'THYAO', 'EREGL'],
      sentiment: 'Negative',
      readTime: '5 min'
    },
    {
      id: 4,
      title: 'Tourism sector outlook remains positive for 2024',
      summary: 'Government forecasts record tourist arrivals supporting hospitality and airline stocks',
      category: 'Tourism',
      impact: 'Medium',
      date: '2024-01-12',
      source: 'Milliyet',
      affectedStocks: ['THYAO', 'MAALT', 'UTPYA'],
      sentiment: 'Positive',
      readTime: '3 min'
    },
    {
      id: 5,
      title: 'Banking sector faces new regulatory requirements',
      summary: 'BDDK introduces additional capital requirements for major banks',
      category: 'Regulation',
      impact: 'Medium',
      date: '2024-01-11',
      source: 'Dünya',
      affectedStocks: ['AKBNK', 'GARAN', 'ISCTR', 'YKBNK'],
      sentiment: 'Neutral',
      readTime: '4 min'
    },
    {
      id: 6,
      title: 'Retail sales show unexpected growth in December',
      summary: 'Consumer spending remains resilient despite economic headwinds',
      category: 'Retail',
      impact: 'Low',
      date: '2024-01-10',
      source: 'Sabah',
      affectedStocks: ['BIMAS', 'MGROS', 'SOKM'],
      sentiment: 'Positive',
      readTime: '2 min'
    }
  ]

  const trendingTopics = [
    { topic: 'Central Bank Policy', articles: 12, trend: 'up' },
    { topic: 'Energy Crisis', articles: 8, trend: 'up' },
    { topic: 'Tech Earnings', articles: 15, trend: 'up' },
    { topic: 'Banking Regulations', articles: 6, trend: 'down' },
    { topic: 'Tourism Recovery', articles: 9, trend: 'up' },
  ]

  const impactAnalysis = {
    'High': { count: 2, color: 'bg-red-100 text-red-800' },
    'Medium': { count: 3, color: 'bg-yellow-100 text-yellow-800' },
    'Low': { count: 1, color: 'bg-green-100 text-green-800' }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200'
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Low': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'Very Positive': return 'text-green-700 bg-green-100'
      case 'Positive': return 'text-green-600 bg-green-50'
      case 'Neutral': return 'text-gray-600 bg-gray-50'
      case 'Negative': return 'text-red-600 bg-red-50'
      case 'Very Negative': return 'text-red-700 bg-red-100'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const filteredNews = newsArticles.filter(article => {
    const matchesSearch = searchQuery === '' || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.affectedStocks.some(stock => stock.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory
    const matchesImpact = selectedImpact === 'all' || article.impact === selectedImpact
    
    return matchesSearch && matchesCategory && matchesImpact
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center">
            <Search className="h-8 w-8 mr-3 text-primary" />
            News Search & Impact Analysis
          </h1>
          <p className="text-muted-foreground">Search news and analyze their impact on stocks and markets</p>
        </div>
        <Badge variant="outline" className="text-blue-600 border-blue-200">
          <Newspaper className="h-3 w-3 mr-1" />
          {filteredNews.length} Articles
        </Badge>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search news, stocks, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Economic Policy">Economic Policy</SelectItem>
                <SelectItem value="Sector News">Sector News</SelectItem>
                <SelectItem value="Energy">Energy</SelectItem>
                <SelectItem value="Tourism">Tourism</SelectItem>
                <SelectItem value="Regulation">Regulation</SelectItem>
                <SelectItem value="Retail">Retail</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={selectedImpact} onValueChange={setSelectedImpact}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Impact" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Impact</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="articles" className="space-y-6">
            <TabsList>
              <TabsTrigger value="articles">News Articles</TabsTrigger>
              <TabsTrigger value="impact">Impact Analysis</TabsTrigger>
            </TabsList>

            {/* Articles Tab */}
            <TabsContent value="articles" className="space-y-4">
              {filteredNews.map((article) => (
                <Card key={article.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{article.title}</h3>
                        <p className="text-muted-foreground text-sm mb-3">{article.summary}</p>
                      </div>
                      <div className="ml-4 flex flex-col items-end space-y-2">
                        <Badge className={getImpactColor(article.impact)}>
                          {article.impact} Impact
                        </Badge>
                        <Badge className={getSentimentColor(article.sentiment)}>
                          {article.sentiment}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{article.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Globe className="h-3 w-3" />
                          <span>{article.source}</span>
                        </div>
                        <span>{article.readTime} read</span>
                      </div>
                      
                      <Badge variant="outline">{article.category}</Badge>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm font-medium text-muted-foreground">Affected Stocks:</span>
                          <div className="flex items-center space-x-2 mt-1">
                            {article.affectedStocks.map((stock) => (
                              <Badge key={stock} variant="secondary" className="text-xs">
                                {stock}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <Button variant="outline" size="sm">
                          <Target className="h-3 w-3 mr-1" />
                          View Impact
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* Impact Analysis Tab */}
            <TabsContent value="impact" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Market Impact Analysis
                  </CardTitle>
                  <CardDescription>
                    How current news is affecting different stocks and sectors
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {Object.entries(impactAnalysis).map(([level, data]) => (
                      <div key={level} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold">{level} Impact</span>
                          <Badge className={data.color}>
                            {data.count}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {level === 'High' && 'Significant market movement expected'}
                          {level === 'Medium' && 'Moderate impact on related stocks'}
                          {level === 'Low' && 'Limited market effect anticipated'}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold">Most Affected Stocks</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold">AKBNK</span>
                          <div className="flex items-center space-x-1">
                            <AlertTriangle className="h-3 w-3 text-red-500" />
                            <span className="text-sm text-red-600">High Impact</span>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Affected by Central Bank policy and banking regulations
                        </p>
                      </div>
                      
                      <div className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold">THYAO</span>
                          <div className="flex items-center space-x-1">
                            <TrendingUp className="h-3 w-3 text-green-500" />
                            <span className="text-sm text-green-600">Positive</span>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Benefits from tourism outlook and energy concerns
                        </p>
                      </div>
                      
                      <div className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold">LOGO</span>
                          <div className="flex items-center space-x-1">
                            <TrendingUp className="h-3 w-3 text-green-500" />
                            <span className="text-sm text-green-600">Very Positive</span>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Strong tech sector performance drives sentiment
                        </p>
                      </div>
                      
                      <div className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold">TUPRS</span>
                          <div className="flex items-center space-x-1">
                            <TrendingDown className="h-3 w-3 text-red-500" />
                            <span className="text-sm text-red-600">Negative</span>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Energy price volatility creates uncertainty
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Trending Topics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Trending Topics</CardTitle>
              <CardDescription>
                Most discussed topics today
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {trendingTopics.map((topic, index) => (
                  <div key={index} className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-lg cursor-pointer">
                    <div>
                      <div className="font-semibold text-sm">{topic.topic}</div>
                      <div className="text-xs text-muted-foreground">{topic.articles} articles</div>
                    </div>
                    {topic.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">News Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total Articles</span>
                <span className="font-semibold">{newsArticles.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">High Impact</span>
                <span className="font-semibold text-red-600">{impactAnalysis.High.count}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Positive Sentiment</span>
                <span className="font-semibold text-green-600">4</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Stocks Affected</span>
                <span className="font-semibold">15</span>
              </div>
            </CardContent>
          </Card>

          {/* Market Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Market Alerts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center space-x-2 mb-1">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <span className="text-sm font-semibold text-red-900">High Impact</span>
                </div>
                <p className="text-xs text-red-700">
                  Central Bank policy changes affecting banking sector
                </p>
              </div>
              
              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center space-x-2 mb-1">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-semibold text-green-900">Opportunity</span>
                </div>
                <p className="text-xs text-green-700">
                  Tech sector showing strong momentum
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default NewsSearch