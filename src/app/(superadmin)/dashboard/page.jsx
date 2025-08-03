"use client"
import Link from "next/link"
import { useState, useEffect } from "react"
import {
  Menu,
  X,
  Home,
  Plus,
  Eye,
  Users,
  User,
  Settings,
  ChevronRight,
  BarChart3,
  CreditCard,
  UserPlus,
  IdCard,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const navigationItems = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: Home,
    description: "Overview and analytics",
  },
  {
    href: "/dashboard/create-scheme",
    label: "Create Scheme",
    icon: Plus,
    description: "Add new schemes",
  },
  {
    href: "/dashboard/view-schemes",
    label: "View Schemes",
    icon: Eye,
    description: "Manage existing schemes",
  },
  {
    href: "/dashboard/create-customer",
    label: "Create Customer",
    icon: UserPlus,
    description: "Add new customers",
  },
  {
    href: "/dashboard/view-customers",
    label: "View Customers",
    icon: Users,
    description: "Manage customer database",
  },
  {
    href: "/dashboard/profile",
    label: "Profile",
    icon: User,
    description: "Account settings",
  },
      {href: "/dashboard/card-availability",
    label: "Card Availability",
    icon: User,
    description: "Card Availability",
  },
]

const dashboardCards = [
  {
    href: "/dashboard/create-scheme",
    title: "Create Scheme",
    description: "Design and launch new investment schemes",
    icon: Plus,
    color: "from-blue-500 to-blue-600",
    hoverColor: "hover:from-blue-600 hover:to-blue-700",
    stats: "Quick Setup",
  },
  {
    href: "/dashboard/view-schemes",
    title: "View Schemes",
    description: "Monitor and manage active schemes",
    icon: BarChart3,
    color: "from-green-500 to-green-600",
    hoverColor: "hover:from-green-600 hover:to-green-700",
    stats: "12 Active",
  },
  {
    href: "/dashboard/create-customer",
    title: "Create Customer",
    description: "Add new customers to your database",
    icon: UserPlus,
    color: "from-purple-500 to-purple-600",
    hoverColor: "hover:from-purple-600 hover:to-purple-700",
    stats: "Easy Onboarding",
  },
  {
    href: "/dashboard/view-customers",
    title: "View Customers",
    description: "Manage customer information and history",
    icon: Users,
    color: "from-orange-500 to-orange-600",
    hoverColor: "hover:from-orange-600 hover:to-orange-700",
    stats: "248 Total",
  },
{
  href: "/dashboard/card-availability",
  title: "Card Availability",
  description: "Check available and booked cards for each scheme",
  icon: IdCard,
  color: "from-indigo-600 to-blue-600",
  hoverColor: "hover:from-indigo-700 hover:to-blue-700",
  stats: "Track Cards",
},

  {
    href: "/dashboard/profile",
    title: "Profile Settings",
    description: "Update your account and preferences",
    icon: Settings,
    color: "from-gray-600 to-gray-700",
    hoverColor: "hover:from-gray-700 hover:to-gray-800",
    stats: "Personalize",
  },
]

const Sidebar = ({ isOpen, onClose, user, onLogout }) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(".sidebar") && !event.target.closest(".sidebar-toggle")) {
        onClose()
      }
    }
    if (isOpen) {
      document.addEventListener("click", handleClickOutside)
    }
    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [isOpen, onClose])

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      <div
        className={`sidebar fixed top-0 left-0 h-full bg-white border-r border-gray-200 w-72 z-40 transform transition-all duration-300 ease-in-out ${
          isOpen ? "translate-x-0 shadow-xl" : "-translate-x-full"
        } md:translate-x-0 md:shadow-none`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-indigo-600 to-purple-600">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">SK Enterprises</h2>
              <p className="text-xs text-indigo-100">Dashboard</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="md:hidden text-white hover:bg-white/20 p-1 h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col p-4 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => window.innerWidth < 768 && onClose()}
                className="group flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 hover:shadow-sm border border-transparent hover:border-gray-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">
                      {item.label}
                    </p>
                    <p className="text-xs text-gray-500">{item.description}</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all duration-200" />
              </Link>
            )
          })}
        </nav>

        {/* Footer with User Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate">{user?.name || "Guest User"}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="mt-3 w-full"
            onClick={onLogout}
          >
            Logout
          </Button>
        </div>
      </div>
    </>
  )
}


const Page = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
   const [user, setUser] = useState(null);

    // Fetch user session
  useEffect(() => {
    fetch("/api/session")
      .then((res) => res.json())
      .then((data) => setUser(data.user))
      .catch(() => setUser(null));
  }, []);

    const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Sidebar */}
       <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} user={user} onLogout={handleLogout} />

      {/* Mobile Toggle Button */}
      <Button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="sidebar-toggle md:hidden fixed top-4 left-4 z-50 bg-white shadow-lg hover:shadow-xl border border-gray-200 text-gray-700 hover:text-indigo-600 transition-all duration-200"
        size="sm"
      >
        <Menu className="h-4 w-4" />
      </Button>

      {/* Main Content */}
      <div className="flex-1 ml-0 md:ml-72 transition-all duration-300">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Welcome to Your Dashboard</h1>
              <p className="text-gray-600">Manage your schemes, customers, and business operations efficiently</p>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center space-x-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                System Online
              </Badge>
              <Badge variant="outline">{new Date().toLocaleDateString()}</Badge>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Total Schemes</p>
                    <p className="text-2xl font-bold">12</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-blue-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">Active Customers</p>
                    <p className="text-2xl font-bold">248</p>
                  </div>
                  <Users className="h-8 w-8 text-green-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm">This Month</p>
                    <p className="text-2xl font-bold">₹2.4L</p>
                  </div>
                  <CreditCard className="h-8 w-8 text-purple-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm">Dues</p>
                    <p className="text-2xl font-bold">18 K</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-orange-200" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Cards */}
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {dashboardCards.map((card) => {
              const Icon = card.icon
              return (
                <Link key={card.href} href={card.href} className="group">
                  <Card className="h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-0 bg-white overflow-hidden">
                    <CardHeader
                      className={`bg-gradient-to-r ${card.color} ${card.hoverColor} text-white transition-all duration-300 relative overflow-hidden`}
                    >
                      {/* Background decoration */}
                      <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                      <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-8 -translate-x-8"></div>

                      <div className="flex items-center justify-between relative z-10">
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                          {card.stats}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl font-bold text-white relative z-10">{card.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <CardDescription className="text-gray-600 text-base mb-4">{card.description}</CardDescription>
                      <div className="flex items-center text-sm font-medium text-indigo-600 group-hover:text-indigo-700 transition-colors">
                        Get Started
                        <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
