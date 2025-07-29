import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from './components/ui/toaster'
import Layout from './components/Layout'
import LoginScreen from './components/LoginScreen'
import Dashboard from './pages/Dashboard'
import PortfolioBuilder from './pages/portfolio/PortfolioBuilder'
import PortfolioEvaluator from './pages/portfolio/PortfolioEvaluator'
import PortfolioManager from './pages/portfolio/PortfolioManager'
import MarketAnalytics from './pages/market/MarketAnalytics'
import StockDetail from './pages/StockDetail'
import NewsSearch from './pages/NewsSearch'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />
  }

  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* Portfolio Management Routes */}
            <Route path="/portfolio/builder" element={<PortfolioBuilder />} />
            <Route path="/portfolio/evaluator" element={<PortfolioEvaluator />} />
            <Route path="/portfolio/manager" element={<PortfolioManager />} />
            
            {/* Market Analytics Routes */}
            <Route path="/market" element={<MarketAnalytics />} />
            <Route path="/stock/:symbol" element={<StockDetail />} />
            <Route path="/news" element={<NewsSearch />} />
          </Routes>
        </Layout>
        <Toaster />
      </div>
    </Router>
  )
}

export default App