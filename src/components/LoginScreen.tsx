import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Separator } from './ui/separator'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog'
import { Checkbox } from './ui/checkbox'
import { 
  Eye,
  EyeOff,
  Loader2
} from 'lucide-react'

interface LoginScreenProps {
  onLogin: () => void
}

const LoginScreen = ({ onLogin }: LoginScreenProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showDisclaimer, setShowDisclaimer] = useState(false)
  const [acceptDisclaimer, setAcceptDisclaimer] = useState(false)
  const [dontShowAgain, setDontShowAgain] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [registerData, setRegisterData] = useState({
    name: '',
    surname: '',
    tcId: '',
    birthdate: '',
    email: '',
    password: ''
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false)
      
      // Always show disclaimer on every login
      setShowDisclaimer(true)
    }, 1500)
  }

  const handleDisclaimerAccept = () => {
    if (dontShowAgain) {
      localStorage.setItem('disclaimerSeen', 'true')
    }
    setShowDisclaimer(false)
    onLogin()
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Centered Login Card */}
          <Card className="shadow-xl border-0 bg-slate-800 border-slate-700">
            <CardHeader className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center">
                  <img src="/finsent-logo.png" alt="FinSent Logo" className="w-12 h-12 object-contain" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">FinSent</h1>
                </div>
              </div>
              <p className="text-sm text-slate-400">A Sentiment Driven Portfolio Management Platform</p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-11 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-11 pr-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-slate-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-slate-400" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-11 text-base font-semibold bg-blue-600 hover:bg-blue-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </form>

              <Button 
                variant="outline"
                className="w-full h-11 text-base font-semibold bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                onClick={() => setShowRegister(true)}
              >
                Register
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full bg-slate-600" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-slate-800 px-2 text-slate-400">Demo Access</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full h-11 bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                  onClick={() => {
                    setEmail('demo@finsent.com')
                    setPassword('demo123')
                  }}
                >
                  Use Demo Credentials
                </Button>
                
                <div className="text-center">
                  <Button variant="link" className="text-sm text-slate-400 hover:text-slate-300">
                    Forgot your password?
                  </Button>
                </div>
              </div>

              <div className="text-center text-xs text-slate-400">
                <p>
                  By signing in, you agree to our{' '}
                  <Button variant="link" className="text-xs p-0 h-auto text-blue-400 hover:text-blue-300">
                    Terms of Service
                  </Button>{' '}
                  and{' '}
                  <Button variant="link" className="text-xs p-0 h-auto text-blue-400 hover:text-blue-300">
                    Privacy Policy
                  </Button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Disclaimer Dialog */}
      <Dialog open={showDisclaimer} onOpenChange={() => {}}>
        <DialogContent className="max-w-2xl bg-slate-800 border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-white">Investment Disclaimer & Risk Warning</DialogTitle>
            <DialogDescription className="text-slate-400">
              Please read and accept the following terms before proceeding
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 max-h-96 overflow-y-auto text-sm text-slate-300">
            <div className="space-y-3">
              <h4 className="font-semibold text-white">Investment Risk Warning</h4>
              <p>
                All investments carry risk and may lose value. Past performance does not guarantee future results. 
                The value of investments and the income from them can go down as well as up, and you may not recover 
                the amount of your original investment.
              </p>
              
              <h4 className="font-semibold text-white">AI Recommendations</h4>
              <p>
                Our AI-powered recommendations are based on algorithmic analysis and should not be considered as 
                personal financial advice. Always conduct your own research and consider consulting with a qualified 
                financial advisor before making investment decisions.
              </p>
              
              <h4 className="font-semibold text-white">Market Data</h4>
              <p>
                Market data and analysis provided on this platform are for informational purposes only. While we 
                strive for accuracy, we cannot guarantee the completeness or timeliness of all information.
              </p>
              
              <h4 className="font-semibold text-white">Platform Usage</h4>
              <p>
                By using FinSent, you acknowledge that you understand the risks involved in trading and investing. 
                You are solely responsible for your investment decisions and their outcomes.
              </p>
              
              <h4 className="font-semibold text-white">Regulatory Compliance</h4>
              <p>
                This platform is designed for informational and educational purposes. Ensure that your use of this 
                platform complies with all applicable laws and regulations in your jurisdiction.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="accept-disclaimer" 
                checked={acceptDisclaimer}
                onCheckedChange={(checked) => setAcceptDisclaimer(checked as boolean)}
              />
              <Label htmlFor="accept-disclaimer" className="text-sm text-white">
                I have read and accept the investment disclaimer and risk warnings
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="dont-show-again" 
                checked={dontShowAgain}
                onCheckedChange={(checked) => setDontShowAgain(checked as boolean)}
              />
              <Label htmlFor="dont-show-again" className="text-sm text-slate-400">
                Don't show this disclaimer again
              </Label>
            </div>
          </div>

          <DialogFooter>
            <Button 
              onClick={handleDisclaimerAccept}
              disabled={!acceptDisclaimer}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Accept & Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Registration Dialog */}
      <Dialog open={showRegister} onOpenChange={setShowRegister}>
        <DialogContent className="max-w-md bg-slate-800 border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-white">Create Account</DialogTitle>
            <DialogDescription className="text-slate-400">
              Register for a new FinSent account
            </DialogDescription>
          </DialogHeader>
          
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={registerData.name}
                  onChange={(e) => setRegisterData(prev => ({ ...prev, name: e.target.value }))}
                  required
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="surname" className="text-white">Surname</Label>
                <Input
                  id="surname"
                  type="text"
                  placeholder="Enter your surname"
                  value={registerData.surname}
                  onChange={(e) => setRegisterData(prev => ({ ...prev, surname: e.target.value }))}
                  required
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tcId" className="text-white">TC ID Number</Label>
              <Input
                id="tcId"
                type="text"
                placeholder="Enter your TC ID number"
                value={registerData.tcId}
                onChange={(e) => setRegisterData(prev => ({ ...prev, tcId: e.target.value }))}
                required
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="birthdate" className="text-white">Birth Date</Label>
              <Input
                id="birthdate"
                type="date"
                value={registerData.birthdate}
                onChange={(e) => setRegisterData(prev => ({ ...prev, birthdate: e.target.value }))}
                required
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="register-email" className="text-white">Email Address</Label>
              <Input
                id="register-email"
                type="email"
                placeholder="Enter your email"
                value={registerData.email}
                onChange={(e) => setRegisterData(prev => ({ ...prev, email: e.target.value }))}
                required
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="register-password" className="text-white">Password</Label>
              <Input
                id="register-password"
                type="password"
                placeholder="Create a password"
                value={registerData.password}
                onChange={(e) => setRegisterData(prev => ({ ...prev, password: e.target.value }))}
                required
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
              />
            </div>
          </form>

          <DialogFooter className="flex-col space-y-2">
            <Button 
              onClick={() => {
                // Handle registration logic here
                setShowRegister(false)
                // Show success message or redirect to login
              }}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Create Account
            </Button>
            <Button 
              variant="outline"
              onClick={() => setShowRegister(false)}
              className="w-full bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default LoginScreen