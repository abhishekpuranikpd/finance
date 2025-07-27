"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "react-toastify"
import {
  User,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  UserPlus,
  Loader2,
  CheckCircle2,
  Sparkles,
  Users,
  DollarSign,
  Calendar,
  AlertCircle,
} from "lucide-react"

export default function CreateCustomerForm({ userId, schemeList }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    schemeId: "",
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSelectChange = (value) => {
    setForm({ ...form, schemeId: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.name || !form.phone || !form.schemeId) {
      toast.error("Name, Phone and Scheme are required")
      return
    }

    setLoading(true)

    try {
      const res = await fetch("/api/customer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, userId }),
      })

      if (!res.ok) {
        const data = await res.json()
        toast.error(data.message || "Failed to create customer")
        return
      }

      toast.success("Customer created successfully")
      setForm({ name: "", phone: "", email: "", address: "", schemeId: "" })
      router.refresh()
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const selectedScheme = schemeList.find((scheme) => scheme.id === form.schemeId)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-200/30 to-indigo-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-200/30 to-pink-200/30 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-indigo-200/20 to-blue-200/20 rounded-full blur-2xl animate-pulse delay-500" />
      </div>

      <Card className="w-full max-w-2xl shadow-2xl border-0 bg-white/95 backdrop-blur-xl relative z-10 overflow-hidden">
        {/* Enhanced Header */}
        <CardHeader className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white relative overflow-hidden p-8">
          {/* Animated background elements */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 animate-pulse delay-300" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12 animate-pulse delay-700" />

          <div className="relative z-10 text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30 shadow-2xl">
                <Users className="h-8 w-8 text-white" />
              </div>
            </div>

            <div className="space-y-2">
              <CardTitle className="text-3xl font-bold text-white flex items-center justify-center gap-3">
                <Sparkles className="h-6 w-6 animate-pulse" />
                Create New Customer
                <Sparkles className="h-6 w-6 animate-pulse" />
              </CardTitle>

              <CardDescription className="text-blue-100 text-lg">
                Add a new customer to your investment platform
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-8 bg-gradient-to-br from-white/98 to-gray-50/95 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Personal Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-3">
                  <Label htmlFor="name" className="text-gray-800 font-semibold flex items-center gap-2 text-base">
                    <div className="p-1.5 bg-blue-100 rounded-lg">
                      <User className="h-4 w-4 text-blue-600" />
                    </div>
                    Full Name *
                  </Label>
                  <div className="relative group">
                    <User className="absolute left-4 top-4 h-5 w-5 text-blue-500 z-10 transition-colors group-focus-within:text-blue-600" />
                    <Input
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="pl-12 pr-4 py-4 text-base border-2 border-gray-200 rounded-xl transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white/90 focus:bg-white focus:border-blue-500 focus:ring-blue-200"
                      disabled={loading}
                    />
                    {form.name && <CheckCircle2 className="absolute right-4 top-4 h-5 w-5 text-green-500" />}
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-3">
                  <Label htmlFor="phone" className="text-gray-800 font-semibold flex items-center gap-2 text-base">
                    <div className="p-1.5 bg-blue-100 rounded-lg">
                      <Phone className="h-4 w-4 text-blue-600" />
                    </div>
                    Phone Number *
                  </Label>
                  <div className="relative group">
                    <Phone className="absolute left-4 top-4 h-5 w-5 text-blue-500 z-10 transition-colors group-focus-within:text-blue-600" />
                    <Input
                      id="phone"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      required
                      className="pl-12 pr-4 py-4 text-base border-2 border-gray-200 rounded-xl transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white/90 focus:bg-white focus:border-blue-500 focus:ring-blue-200"
                      disabled={loading}
                    />
                    {form.phone && <CheckCircle2 className="absolute right-4 top-4 h-5 w-5 text-green-500" />}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email */}
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-gray-800 font-semibold flex items-center gap-2 text-base">
                    <div className="p-1.5 bg-blue-100 rounded-lg">
                      <Mail className="h-4 w-4 text-blue-600" />
                    </div>
                    Email Address
                  </Label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-4 h-5 w-5 text-blue-500 z-10 transition-colors group-focus-within:text-blue-600" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="pl-12 pr-4 py-4 text-base border-2 border-gray-200 rounded-xl transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white/90 focus:bg-white focus:border-blue-500 focus:ring-blue-200"
                      disabled={loading}
                    />
                    {form.email && <CheckCircle2 className="absolute right-4 top-4 h-5 w-5 text-green-500" />}
                  </div>
                </div>

                {/* Address */}
                <div className="space-y-3">
                  <Label htmlFor="address" className="text-gray-800 font-semibold flex items-center gap-2 text-base">
                    <div className="p-1.5 bg-blue-100 rounded-lg">
                      <MapPin className="h-4 w-4 text-blue-600" />
                    </div>
                    Address
                  </Label>
                  <div className="relative group">
                    <MapPin className="absolute left-4 top-4 h-5 w-5 text-blue-500 z-10 transition-colors group-focus-within:text-blue-600" />
                    <Input
                      id="address"
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="123 Main Street, City"
                      className="pl-12 pr-4 py-4 text-base border-2 border-gray-200 rounded-xl transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white/90 focus:bg-white focus:border-blue-500 focus:ring-blue-200"
                      disabled={loading}
                    />
                    {form.address && <CheckCircle2 className="absolute right-4 top-4 h-5 w-5 text-green-500" />}
                  </div>
                </div>
              </div>
            </div>

            {/* Investment Scheme Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Investment Scheme</h3>
              </div>

              <div className="space-y-3">
                <Label htmlFor="schemeId" className="text-gray-800 font-semibold flex items-center gap-2 text-base">
                  <div className="p-1.5 bg-blue-100 rounded-lg">
                    <CreditCard className="h-4 w-4 text-blue-600" />
                  </div>
                  Select Scheme *
                </Label>
                <Select value={form.schemeId} onValueChange={handleSelectChange} disabled={loading}>
                  <SelectTrigger className="h-14 px-4 text-base border-2 border-gray-200 rounded-xl transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white/90 focus:border-blue-500">
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-5 w-5 text-blue-500" />
                      <SelectValue placeholder="Choose an investment scheme" />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-md border-0 shadow-2xl rounded-xl">
                    {schemeList.map((scheme) => (
                      <SelectItem key={scheme.id} value={scheme.id} className="py-3 px-4 rounded-lg">
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center gap-3">
                            <div className="p-1.5 bg-blue-100 rounded-lg">
                              <CreditCard className="h-4 w-4 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium">{scheme.name}</p>
                              <p className="text-sm text-gray-500">
                                ₹{scheme.monthlyAmount}/mo for {scheme.totalMonths} months
                              </p>
                            </div>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {!form.schemeId && (
                  <p className="text-sm text-amber-600 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    Please select an investment scheme
                  </p>
                )}
              </div>

              {/* Selected Scheme Preview */}
              {selectedScheme && (
                <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6 rounded-2xl border-2 border-blue-200 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-500 rounded-lg">
                      <CreditCard className="h-5 w-5 text-white" />
                    </div>
                    <h4 className="font-bold text-blue-800 text-lg">Selected Scheme Details</h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-blue-100 shadow-md">
                      <div className="flex justify-center mb-2">
                        <div className="p-2 bg-blue-500 rounded-lg">
                          <DollarSign className="h-4 w-4 text-white" />
                        </div>
                      </div>
                      <p className="text-gray-600 mb-1 text-sm font-medium">Monthly Amount</p>
                      <p className="font-bold text-blue-700 text-lg">
                        ₹{selectedScheme.monthlyAmount.toLocaleString()}
                      </p>
                    </div>

                    <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-blue-100 shadow-md">
                      <div className="flex justify-center mb-2">
                        <div className="p-2 bg-indigo-500 rounded-lg">
                          <Calendar className="h-4 w-4 text-white" />
                        </div>
                      </div>
                      <p className="text-gray-600 mb-1 text-sm font-medium">Duration</p>
                      <p className="font-bold text-indigo-700 text-lg">{selectedScheme.totalMonths} months</p>
                    </div>

                    <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-blue-100 shadow-md">
                      <div className="flex justify-center mb-2">
                        <div className="p-2 bg-purple-500 rounded-lg">
                          <CreditCard className="h-4 w-4 text-white" />
                        </div>
                      </div>
                      <p className="text-gray-600 mb-1 text-sm font-medium">Total Investment</p>
                      <p className="font-bold text-purple-700 text-lg">
                        ₹{(selectedScheme.monthlyAmount * selectedScheme.totalMonths).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced Submit Button */}
            <Button
              type="submit"
              disabled={loading || !form.name || !form.phone || !form.schemeId}
              className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-[1.02] py-6 text-lg font-semibold rounded-2xl border-0 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              {loading ? (
                <>
                  <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                  Creating Customer...
                </>
              ) : (
                <>
                  <UserPlus className="mr-3 h-5 w-5" />
                  Create Customer
                </>
              )}
            </Button>
          </form>

          {/* Security Footer */}
          <div className="mt-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="p-2 bg-gray-100 rounded-lg">
                <CheckCircle2 className="h-4 w-4 text-gray-600" />
              </div>
              <p className="text-sm text-gray-600 font-medium">Secure & Encrypted</p>
            </div>
            <p className="text-xs text-gray-500 max-w-md mx-auto">
              Customer data is protected with bank-level security and encryption.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}