"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Mail, Lock, User, Phone, Shield, UserPlus, Sparkles } from "lucide-react"

const wallpapers = [
  {
    id: 1,
    url: "url('/placeholder.svg?height=1080&width=1920')",
    name: "Aurora Mountains",
  },
  {
    id: 2,
    url: "url('/placeholder.svg?height=1080&width=1920')",
    name: "Abstract Waves",
  },
  {
    id: 3,
    url: "url('/placeholder.svg?height=1080&width=1920')",
    name: "Cosmic Nebula",
  },
  {
    id: 4,
    url: "url('/placeholder.svg?height=1080&width=1920')",
    name: "Cherry Blossoms",
  },
]

const RegisterPage = () => {
  const router = useRouter()
  const [currentWallpaper, setCurrentWallpaper] = useState(0)
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "STAFF",
    name: "",
    phone: "",
  })

  const [errors, setErrors] = useState({})
  const [generalError, setGeneralError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Auto-change wallpaper every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWallpaper((prev) => (prev + 1) % wallpapers.length)
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  const validateForm = () => {
    const newErrors = {}

    if (!form.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!/^\+?[\d\s-()]+$/.test(form.phone)) {
      newErrors.phone = "Please enter a valid phone number"
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!form.password) {
      newErrors.password = "Password is required"
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  const handleRoleChange = (value) => {
    setForm((prev) => ({
      ...prev,
      role: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setGeneralError("")

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        const errData = await res.json()
        setGeneralError(errData.message || "Registration failed.")
        return
      }

      router.push("/login")
    } catch (err) {
      setGeneralError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      {/* Dynamic Wallpaper Background with smooth transition */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: wallpapers[currentWallpaper].url,
        }}
      ></div>

      {/* Elegant overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-purple-900/20 to-indigo-900/30 backdrop-blur-[1px]"></div>

      {/* Wallpaper selector */}
      <div className="absolute top-4 right-4 z-20 flex gap-2">
        {wallpapers.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentWallpaper(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentWallpaper === index ? "bg-white shadow-lg scale-125" : "bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Floating elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/90 backdrop-blur-xl relative z-10 overflow-hidden">
        <CardHeader className="space-y-1 text-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

          <div className="flex justify-center mb-4 relative z-10">
            <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm border border-white/30 shadow-lg">
              <UserPlus className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-white relative z-10 flex items-center justify-center gap-2">
            <Sparkles className="h-5 w-5" />
            Create Account
            <Sparkles className="h-5 w-5" />
          </CardTitle>
          <CardDescription className="text-indigo-100 relative z-10">Join our amazing community today</CardDescription>
        </CardHeader>

        <CardContent className="p-6 bg-white/95 backdrop-blur-sm">
          {generalError && (
            <Alert variant="destructive" className="mb-6 border-red-200 bg-red-50/90 backdrop-blur-sm">
              <AlertDescription className="text-red-800">{generalError}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700 font-medium">
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-indigo-500" />
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={handleChange}
                  className={`pl-10 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 bg-white/80 backdrop-blur-sm ${errors.name ? "border-red-500" : ""}`}
                  disabled={isLoading}
                />
              </div>
              {errors.name && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                  {errors.name}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-gray-700 font-medium">
                Phone Number
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-indigo-500" />
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={form.phone}
                  onChange={handleChange}
                  className={`pl-10 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 bg-white/80 backdrop-blur-sm ${errors.phone ? "border-red-500" : ""}`}
                  disabled={isLoading}
                />
              </div>
              {errors.phone && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                  {errors.phone}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-medium">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-indigo-500" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  className={`pl-10 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 bg-white/80 backdrop-blur-sm ${errors.email ? "border-red-500" : ""}`}
                  disabled={isLoading}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-indigo-500" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  className={`pl-10 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 bg-white/80 backdrop-blur-sm ${errors.password ? "border-red-500" : ""}`}
                  disabled={isLoading}
                />
              </div>
              {errors.password && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                  {errors.password}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="role" className="text-gray-700 font-medium">
                Role
              </Label>
              <div className="relative">
                <Shield className="absolute left-3 top-3 h-4 w-4 text-indigo-500 z-10" />
                <Select value={form.role} onValueChange={handleRoleChange} disabled={isLoading}>
                  <SelectTrigger className="pl-10 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 bg-white/80 backdrop-blur-sm">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-sm">
                    <SelectItem value="STAFF">Staff</SelectItem>
                    <SelectItem value="SUPERADMIN">Super Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Create Account
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Button
                variant="link"
                className="p-0 h-auto font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
                onClick={() => router.push("/login")}
                disabled={isLoading}
              >
                Sign in
              </Button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default RegisterPage