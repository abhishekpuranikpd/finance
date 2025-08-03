"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, Sparkles, Wallet, Calendar, DollarSign, ListChecks, ArrowLeft, Users } from "lucide-react"

export default function ViewSchemesPage() {
  const router = useRouter()
  const [schemes, setSchemes] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchSchemes = async () => {
    try {
      const response = await fetch("/api/schema/scheme")
      const data = await response.json()
      setSchemes(data)
    } catch (error) {
      console.error("Failed to fetch schemes:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSchemes()
  }, [])

  const handleBackToDashboard = () => {
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header with Back Button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div className="flex items-center gap-4 mb-4 sm:mb-0">
            <Button
              onClick={handleBackToDashboard}
              variant="outline"
              size="sm"
              className="bg-white/80 backdrop-blur-sm border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-2xl sm:text-3xl font-bold text-emerald-800 flex items-center gap-2">
              <ListChecks className="h-6 w-6 sm:h-7 sm:w-7" />
              All Investment Schemes
            </h1>
          </div>

          {!loading && schemes.length > 0 && (
            <div className="flex items-center gap-2">
              <div className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                {schemes.length} Scheme{schemes.length !== 1 ? "s" : ""} Found
              </div>
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex flex-col justify-center items-center py-20">
            <div className="p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg mb-4">
              <Loader2 className="animate-spin h-10 w-10 text-emerald-600" />
            </div>
            <p className="text-emerald-700 font-medium">Loading schemes...</p>
          </div>
        ) : schemes.length === 0 ? (
          <div className="text-center py-20">
            <div className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg max-w-md mx-auto">
              <Wallet className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Schemes Found</h3>
              <p className="text-gray-500 mb-6">You haven't created any investment schemes yet.</p>
              <Button
                onClick={() => router.push("/dashboard/create-scheme")}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Create Your First Scheme
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {schemes.map((scheme) => (
              <Card
                key={scheme.id}
                className="bg-white/90 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm overflow-hidden"
              >
                <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-600 p-4 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-8 -translate-x-8"></div>

                  <CardTitle className="flex items-center justify-between text-lg font-semibold relative z-10">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                        <Wallet className="h-5 w-5" />
                      </div>
                      <span className="truncate">{scheme.name}</span>
                    </div>
                    <Sparkles className="h-5 w-5 animate-pulse text-yellow-300 flex-shrink-0" />
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4 p-5">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {scheme.description || "No description provided."}
                  </p>

                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                      <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                        <DollarSign className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500">Monthly</p>
                          <p className="font-semibold text-green-700">₹{scheme.monthlyAmount?.toLocaleString()}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
                        <Calendar className="h-4 w-4 text-blue-600 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500">Duration</p>
                          <p className="font-semibold text-blue-700">{scheme.totalMonths} months</p>
                        </div>
                      </div>

                      {/* ✅ Total Members */}
                      <div className="flex items-center gap-2 p-2 bg-purple-50 rounded-lg">
                        <Users className="h-4 w-4 text-purple-600 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500">Total Members</p>
                          <p className="font-semibold text-purple-700">{scheme.totalMembers}</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-100">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Total Investment:</span>
                        <span className="text-lg font-bold text-emerald-700">
                          ₹{(scheme.monthlyAmount * scheme.totalMonths).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
