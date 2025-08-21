"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Alert, AlertDescription } from "../../../components/ui/alert"
import { Loader2, Lock, Eye, EyeOff, Phone, LogIn, Sparkles, CheckCircle, AlertCircle, CreditCard } from "lucide-react"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Link from "next/link"

const LoginClient = () => {
  const router = useRouter()
  const [form, setForm] = useState({ mobile: "", password: "" })
  const [errors, setErrors] = useState({})
  const [generalError, setGeneralError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>?]).{8,}$/
    return passwordRegex.test(password)
  }

  const validateForm = () => {
    const newErrors = {}
    if (!form.mobile.trim()) {
      newErrors.mobile = "Mobile number is required"
    } else if (form.mobile.length !== 10 || !/^[0-9]+$/.test(form.mobile)) {
      newErrors.mobile = "Please enter a valid 10-digit mobile number"
    }
    if (!form.password.trim()) newErrors.password = "Password is required"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === "mobile") {
      if (value.length <= 10 && /^[0-9]*$/.test(value)) {
        setForm((prev) => ({ ...prev, [name]: value }))
      }
    } else setForm((prev) => ({ ...prev, [name]: value }))

    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
    if (generalError) setGeneralError("")
    if (successMessage) setSuccessMessage("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setGeneralError("")
    setSuccessMessage("")

    if (!validateForm()) return

    setIsLoading(true)
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: form.password, mobile: form.mobile }),
      })

      if (!res.ok) throw new Error("Failed to login")

      setSuccessMessage("Login successful! Redirecting to dashboard...")
      toast.success("Login successful! Welcome back!", { position: "top-right", autoClose: 3000 })
      setTimeout(() => router.push("/dashboard"), 1500)
    } catch (error) {
      setGeneralError("Invalid credentials. Please check your mobile number and password.")
      toast.error("Login failed. Please try again.", { position: "top-right", autoClose: 5000 })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1200')] opacity-5"></div>
        <div className="absolute top-10 left-10 w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-20 blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-pink-400 to-indigo-400 rounded-full opacity-15 blur-lg animate-pulse delay-500"></div>
      </div>

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center p-3 sm:p-4 lg:p-6 relative z-10">
        <Card className="w-full max-w-sm sm:max-w-md lg:max-w-lg shadow-2xl border-0 bg-white/95 backdrop-blur-xl overflow-hidden rounded-2xl mx-auto">
          <CardHeader className="space-y-2 sm:space-y-3 text-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white relative overflow-hidden p-4 sm:p-6">
            <div className="flex justify-center mb-2 sm:mb-4 relative z-10">
              <div className="p-2 sm:p-3 bg-white/20 rounded-full backdrop-blur-sm border border-white/30 shadow-lg">
                <LogIn className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
            </div>

            <CardTitle className="text-lg sm:text-xl lg:text-2xl font-bold text-white relative z-10 flex items-center justify-center gap-1 sm:gap-2 flex-wrap">
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-center">Welcome To SK Enterprises</span>
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
            </CardTitle>

            <CardDescription className="text-indigo-100 relative z-10 text-sm sm:text-base px-2">
              Welcome back! Please sign in to continue
            </CardDescription>
          </CardHeader>

          <CardContent className="p-4 sm:p-6 bg-white/95 backdrop-blur-sm">
            {successMessage && (
              <Alert className="mb-4 sm:mb-6 border-green-200 bg-green-50/90 backdrop-blur-sm">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800 text-sm sm:text-base">{successMessage}</AlertDescription>
              </Alert>
            )}

            {generalError && (
              <Alert variant="destructive" className="mb-4 sm:mb-6 border-red-200 bg-red-50/90 backdrop-blur-sm">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-red-800 text-sm sm:text-base">{generalError}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div className="space-y-2">
                <Label htmlFor="mobile" className="text-gray-700 font-medium text-sm sm:text-base">Mobile Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-indigo-500" />
                  <Input
                    id="mobile"
                    name="mobile"
                    type="text"
                    placeholder="Enter 10-digit mobile number"
                    value={form.mobile}
                    onChange={handleChange}
                    maxLength="10"
                    className={`pl-10 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 bg-white/80 backdrop-blur-sm text-sm sm:text-base h-10 sm:h-11 ${errors.mobile ? "border-red-500" : ""}`}
                    disabled={isLoading}
                  />
                </div>
                {errors.mobile && <p className="text-xs sm:text-sm text-red-600 flex items-center gap-1">{errors.mobile}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-medium text-sm sm:text-base">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-indigo-500" />
                  <Input
                    id="password"
                    name="password"
                    type={isPasswordVisible ? "text" : "password"}
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={handleChange}
                    className={`pl-10 pr-10 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 bg-white/80 backdrop-blur-sm text-sm sm:text-base h-10 sm:h-11 ${errors.password ? "border-red-500" : ""}`}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 h-4 w-4 text-indigo-500 hover:text-indigo-700 transition-colors"
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    disabled={!form.password || isLoading}
                  >
                    {isPasswordVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-xs sm:text-sm text-red-600 flex items-center gap-1">{errors.password}</p>}
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:hover:scale-100 h-10 sm:h-11 text-sm sm:text-base font-medium"
                disabled={isLoading}
              >
                {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Signing in...</> : <><LogIn className="mr-2 h-4 w-4" />Sign In</>}
              </Button>
            </form>

            <div className="mt-4 sm:mt-6 text-center">
              <p className="text-xs sm:text-sm text-gray-600">
                {"Don't have an account? "}
                <Button variant="link" className="p-0 h-auto font-semibold text-indigo-600 hover:text-indigo-700" onClick={() => router.push("/register")} disabled={isLoading}>
                  Register here
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
<footer className="relative z-20 bg-gradient-to-r from-gray-800 to-gray-900 text-white mt-auto">
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold">SK Enterprises</h3>
                <p className="text-gray-400 text-sm">Business Management Solutions</p>
              </div>
            </div>

<div className="flex items-center space-x-6">
  <Link href="/privacyploicytermsofservices/privacy-policy" className="text-blue-600 hover:underline">
    Privacy Policy
  </Link>
  <div className="text-gray-500">|</div>
  <Link href="/privacyploicytermsofservices/terms-of-service" className="text-blue-600 hover:underline">
    Terms of Service
  </Link>
</div>

          </div>

          <div className="border-t border-gray-700 mt-6 pt-6 text-center">
            <p className="text-gray-400 text-sm">© {new Date().getFullYear()} SK Enterprises. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LoginClient
