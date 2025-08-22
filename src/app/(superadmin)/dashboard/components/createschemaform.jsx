"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "../../../../components/ui/input"
import { Button } from "../../../../components/ui/button"
import { Textarea } from "../../../../components/ui/textarea"
import { Label } from "../../../../components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../../components/ui/card"
import { Alert, AlertDescription } from "../../../../components/ui/alert"
import { toast } from "react-toastify"
import {
  FileText,
  DollarSign,
  Calendar,
  Sparkles,
  Loader2,
  PlusCircle,
  TrendingUp,
  Calculator,
  CheckCircle2,
  Wallet,
  Target,
  ArrowLeft,
  Home,
  PartyPopper,
} from "lucide-react"

export default function CreateSchemeForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    monthlyAmount: "",
    totalMonths: "",
    totalMembers: "",
    cardPrefix: "",
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [createdScheme, setCreatedScheme] = useState(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    // Clear success state when user starts editing again
    if (success) {
      setSuccess(false)
      setCreatedScheme(null)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)

    try {
      const response = await fetch("/api/schema/create-scheme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          monthlyAmount: Number.parseFloat(formData.monthlyAmount),
          totalMonths: Number.parseInt(formData.totalMonths),
          totalMembers: Number.parseInt(formData.totalMembers),
          cardPrefix: formData.cardPrefix,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Set success state
        setSuccess(true)
        setCreatedScheme(data)

        // Show toast notification
        toast.success(`${data.name || formData.name} scheme created successfully!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })

        // Reset form
        setFormData({
          name: "",
          description: "",
          monthlyAmount: "",
          totalMonths: "",
        })
      } else {
        toast.error(data.message || "Something went wrong", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
      }
    } catch (error) {
      toast.error("Network error. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    } finally {
      setLoading(false)
    }
  }

  const calculateTotal = () => {
    if (formData.monthlyAmount && formData.totalMonths) {
      return Number.parseFloat(formData.monthlyAmount) * Number.parseInt(formData.totalMonths)
    }
    return 0
  }

  const calculateYearsMonths = () => {
    if (formData.totalMonths) {
      const months = Number.parseInt(formData.totalMonths)
      const years = Math.floor(months / 12)
      const remainingMonths = months % 12
      return { years, months: remainingMonths }
    }
    return { years: 0, months: 0 }
  }

  const handleBackToDashboard = () => {
    router.push("/dashboard")
  }

  const handleCreateAnother = () => {
    setSuccess(false)
    setCreatedScheme(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-emerald-200/30 to-green-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-teal-200/30 to-cyan-200/30 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-green-200/20 to-emerald-200/20 rounded-full blur-2xl animate-pulse delay-500" />
      </div>

      <Card className="w-full max-w-2xl shadow-2xl border-0 bg-white/95 backdrop-blur-xl relative z-10 overflow-hidden">
        {/* Enhanced Header */}
        <CardHeader className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 text-white relative overflow-hidden p-8">
          {/* Back Button */}
          <Button
            onClick={handleBackToDashboard}
            variant="ghost"
            size="sm"
            className="absolute top-4 left-4 text-white hover:bg-white/20 transition-all duration-200 z-20"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>

          {/* Animated background elements */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 animate-pulse delay-300" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12 animate-pulse delay-700" />

          <div className="relative z-10 text-center space-y-4 mt-8">
            <div className="flex justify-center">
              <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30 shadow-2xl">
                <Wallet className="h-8 w-8 text-white" />
              </div>
            </div>
            <div className="space-y-2">
              <CardTitle className="text-3xl font-bold text-white flex items-center justify-center gap-3">
                <Sparkles className="h-6 w-6 animate-pulse" />
                Create Investment Scheme
                <Sparkles className="h-6 w-6 animate-pulse" />
              </CardTitle>
              <CardDescription className="text-emerald-100 text-lg">
                Build your personalized investment strategy
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-8 bg-gradient-to-br from-white/98 to-gray-50/95 backdrop-blur-sm">
          {/* Success Alert */}
          {success && (
            <Alert className="mb-8 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 animate-in slide-in-from-top-4 duration-500">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500 rounded-full">
                  <CheckCircle2 className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <AlertDescription className="text-green-800">
                    <div className="flex items-center gap-2 mb-2">
                      <PartyPopper className="h-5 w-5 text-green-600" />
                      <span className="font-bold text-lg">Scheme Created Successfully!</span>
                    </div>
                    <p className="text-green-700 mb-4">
                      Your investment scheme "{createdScheme?.name || formData.name}" has been created and is ready to
                      use.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        onClick={handleBackToDashboard}
                        className="bg-green-600 hover:bg-green-700 text-white shadow-lg transition-all duration-200"
                      >
                        <Home className="h-4 w-4 mr-2" />
                        Go to Dashboard
                      </Button>
                      <Button
                        onClick={handleCreateAnother}
                        variant="outline"
                        className="border-green-300 text-green-700 hover:bg-green-50 transition-all duration-200 bg-transparent"
                      >
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Create Another Scheme
                      </Button>
                    </div>
                  </AlertDescription>
                </div>
              </div>
            </Alert>
          )}

          {/* Form - Hide when success is shown */}
          {!success && (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Scheme Name */}
              <div className="space-y-3">
                <Label htmlFor="name" className="text-gray-800 font-semibold flex items-center gap-2 text-base">
                  <div className="p-1.5 bg-emerald-100 rounded-lg">
                    <FileText className="h-4 w-4 text-emerald-600" />
                  </div>
                  Scheme Name
                </Label>
                <div className="relative group">
                  <FileText className="absolute left-4 top-4 h-5 w-5 text-emerald-500 z-10 transition-colors group-focus-within:text-emerald-600" />
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="My Investment Plan"
                    required
                    className="pl-12 pr-4 py-4 text-base border-2 border-gray-200 rounded-xl transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white/90 focus:bg-white focus:border-emerald-500 focus:ring-emerald-200"
                    disabled={loading}
                  />
                  {formData.name && <CheckCircle2 className="absolute right-4 top-4 h-5 w-5 text-green-500" />}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-3">
                <Label htmlFor="description" className="text-gray-800 font-semibold flex items-center gap-2 text-base">
                  <div className="p-1.5 bg-emerald-100 rounded-lg">
                    <FileText className="h-4 w-4 text-emerald-600" />
                  </div>
                  Description
                </Label>
                <div className="relative group">
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your investment goals and strategy..."
                    rows={4}
                    className="p-4 text-base border-2 border-gray-200 rounded-xl resize-none transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white/90 focus:bg-white focus:border-emerald-500 focus:ring-emerald-200"
                    disabled={loading}
                  />
                  {formData.description && <CheckCircle2 className="absolute right-4 top-4 h-5 w-5 text-green-500" />}
                </div>
              </div>

              {/* Investment Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Monthly Amount */}
                <div className="space-y-3">
                  <Label
                    htmlFor="monthlyAmount"
                    className="text-gray-800 font-semibold flex items-center gap-2 text-base"
                  >
                    <div className="p-1.5 bg-emerald-100 rounded-lg">
                      <DollarSign className="h-4 w-4 text-emerald-600" />
                    </div>
                    Monthly Amount (₹)
                  </Label>
                  <div className="relative group">
                    <DollarSign className="absolute left-4 top-4 h-5 w-5 text-emerald-500 z-10 transition-colors group-focus-within:text-emerald-600" />
                    <Input
                      id="monthlyAmount"
                      name="monthlyAmount"
                      type="number"
                      value={formData.monthlyAmount}
                      onChange={handleChange}
                      placeholder="10,000"
                      required
                      min="1"
                      className="pl-12 pr-4 py-4 text-base border-2 border-gray-200 rounded-xl transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white/90 focus:bg-white focus:border-emerald-500 focus:ring-emerald-200"
                      disabled={loading}
                    />
                    {formData.monthlyAmount && (
                      <CheckCircle2 className="absolute right-4 top-4 h-5 w-5 text-green-500" />
                    )}
                  </div>
                  <div>
                    <label>Total Members</label>
                    <Input
                      id="totalMembers"
                      name="totalMembers"
                      type="number"
                      value={formData.totalMembers}
                      onChange={handleChange}
                      placeholder="100"
                      required
                    />
                  </div>
                </div>

                {/* Total Months */}
                <div className="space-y-3">
                  <Label
                    htmlFor="totalMonths"
                    className="text-gray-800 font-semibold flex items-center gap-2 text-base"
                  >
                    <div className="p-1.5 bg-emerald-100 rounded-lg">
                      <Calendar className="h-4 w-4 text-emerald-600" />
                    </div>
                    Total Months
                  </Label>
                  <div className="relative group">
                    <Calendar className="absolute left-4 top-4 h-5 w-5 text-emerald-500 z-10 transition-colors group-focus-within:text-emerald-600" />
                    <Input
                      id="totalMonths"
                      name="totalMonths"
                      type="number"
                      value={formData.totalMonths}
                      onChange={handleChange}
                      placeholder="24"
                      required
                      min="1"
                      className="pl-12 pr-4 py-4 text-base border-2 border-gray-200 rounded-xl transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white/90 focus:bg-white focus:border-emerald-500 focus:ring-emerald-200"
                      disabled={loading}
                    />
                    {formData.totalMonths && <CheckCircle2 className="absolute right-4 top-4 h-5 w-5 text-green-500" />}
                  </div>
                  <div>
  <label className="text-gray-800 font-semibold">Card Prefix</label>
  <Input
    id="cardPrefix"
    name="cardPrefix"
    type="text"
    value={formData.cardPrefix}
    onChange={handleChange}
    placeholder="LP"
    required
    maxLength={5}
    className="mt-1"
  />
</div>

                </div>
              </div>

              {/* Investment Summary */}
              {formData.monthlyAmount && formData.totalMonths && (
                <div className="bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 p-6 rounded-2xl border-2 border-emerald-200 shadow-lg relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-100/50 to-teal-100/50 opacity-50" />
                  <div className="relative z-10">
                    <div className="flex items-center justify-center gap-3 mb-6">
                      <div className="p-3 bg-emerald-500 rounded-2xl shadow-lg">
                        <Calculator className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-bold text-emerald-800 text-xl">Investment Summary</h3>
                      <TrendingUp className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                      <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-emerald-100 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                        <div className="flex justify-center mb-3">
                          <div className="p-3 bg-emerald-500 rounded-xl shadow-md">
                            <DollarSign className="h-5 w-5 text-white" />
                          </div>
                        </div>
                        <p className="text-gray-600 mb-2 text-sm font-medium">Monthly Amount</p>
                        <p className="font-bold text-emerald-700 text-lg">
                          ₹{Number.parseFloat(formData.monthlyAmount || 0).toLocaleString()}
                        </p>
                      </div>
                      <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-emerald-100 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                        <div className="flex justify-center mb-3">
                          <div className="p-3 bg-blue-500 rounded-xl shadow-md">
                            <Calendar className="h-5 w-5 text-white" />
                          </div>
                        </div>
                        <p className="text-gray-600 mb-2 text-sm font-medium">Duration</p>
                        <p className="font-bold text-blue-700 text-lg">
                          {formData.totalMonths} month{formData.totalMonths > 1 ? "s" : ""}
                        </p>
                      </div>
                      <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-emerald-100 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                        <div className="flex justify-center mb-3">
                          <div className="p-3 bg-green-500 rounded-xl shadow-md">
                            <Target className="h-5 w-5 text-white" />
                          </div>
                        </div>
                        <p className="text-gray-600 mb-2 text-sm font-medium">Total Investment</p>
                        <p className="font-bold text-green-600 text-lg">₹{calculateTotal().toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="p-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl shadow-2xl text-white text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Sparkles className="h-5 w-5 text-yellow-300" />
                        <span className="font-bold text-lg">Total Investment Amount</span>
                        <Sparkles className="h-5 w-5 text-yellow-300" />
                      </div>
                      <p className="font-bold text-3xl">₹{calculateTotal().toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Enhanced Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 hover:from-emerald-700 hover:via-green-700 hover:to-teal-700 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-[1.02] py-6 text-lg font-semibold rounded-2xl border-0 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                {loading ? (
                  <>
                    <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                    Creating Scheme...
                  </>
                ) : (
                  <>
                    <PlusCircle className="mr-3 h-5 w-5" />
                    Create Investment Scheme
                  </>
                )}
              </Button>
            </form>
          )}

          {/* Security Footer - Show only when not in success state */}
          {!success && (
            <div className="mt-8 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <CheckCircle2 className="h-4 w-4 text-gray-600" />
                </div>
                <p className="text-sm text-gray-600 font-medium">Secure & Encrypted</p>
              </div>
              <p className="text-xs text-gray-500 max-w-md mx-auto">
                Your investment data is protected with bank-level security and encryption.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
