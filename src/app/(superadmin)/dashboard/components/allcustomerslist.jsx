"use client"

import { useMemo, useState } from "react"
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../../components/ui/table"
import { Input } from "../../../../components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../components/ui/select"
import { Button } from "../../../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../../components/ui/card"
import { Badge } from "../../../../components/ui/badge"
import {
  Search,
  Users,
  Phone,
  MapPin,
  User,
  CreditCard,
  CheckCircle2,
  XCircle,
  Clock,
  ChevronLeft,
  ChevronRight,
  Filter,
  UserCheck,
  Wallet,
  AlertCircle,
  TrendingUp,
  Calendar,
  Eye,
  CreditCardIcon as CardIcon,
  ArrowLeft,
  Menu,
  X,
} from "lucide-react"

export default function CustomerTable({ customers }) {
  const [globalFilter, setGlobalFilter] = useState("")
  const [schemeFilter, setSchemeFilter] = useState("all")
  const [userFilter, setUserFilter] = useState("all")
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("all")
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  // Transform and filter data
  const [data, setData] = useState(() =>
    customers.map((c) => ({
      ...c,
      name: c.name || "No Name",
      phone: c.phone || "No Phone",
      address: c.address || "No Address",
      cardNo: c.cardNo || "No Card",
      user: {
        ...c.user,
        name: c.user?.name || "Unassigned",
      },
    })),
  )

  // Extract unique schemes and users for filter options
  const schemes = useMemo(() => {
    const uniqueSchemes = new Map()
    customers.forEach((customer) => {
      if (customer.scheme && !uniqueSchemes.has(customer.scheme.id)) {
        uniqueSchemes.set(customer.scheme.id, customer.scheme)
      }
    })
    return Array.from(uniqueSchemes.values())
  }, [customers])

  const users = useMemo(() => {
    const uniqueUsers = new Map()
    customers.forEach((customer) => {
      if (customer.user && !uniqueUsers.has(customer.user.id)) {
        uniqueUsers.set(customer.user.id, customer.user)
      }
    })
    return Array.from(uniqueUsers.values())
  }, [customers])

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Customer",
        cell: (info) => (
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="p-1.5 sm:p-2 bg-blue-100 rounded-full flex-shrink-0">
              <User className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">{info.getValue()}</p>
              <p className="text-xs sm:text-sm text-gray-500 flex items-center gap-1 truncate">
                <Phone className="h-3 w-3 flex-shrink-0" />
                <span className="truncate">{info.row.original.phone}</span>
              </p>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "cardNo",
        header: "Card No",
        cell: (info) => (
          <div className="flex items-center gap-2 min-w-0">
            <CardIcon className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500 flex-shrink-0" />
            <span className="text-gray-700 font-mono text-xs sm:text-sm truncate">{info.getValue()}</span>
          </div>
        ),
      },
      {
        accessorKey: "address",
        header: "Address",
        cell: (info) => (
          <div className="flex items-center gap-2 min-w-0 max-w-[200px]">
            <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500 flex-shrink-0" />
            <span className="text-gray-700 text-xs sm:text-sm truncate">{info.getValue()}</span>
          </div>
        ),
      },
      {
        accessorFn: (row) => row.user?.name || "Unassigned",
        id: "user",
        header: "Added By",
        cell: (info) => (
          <div className="flex items-center gap-2 min-w-0">
            <div className="p-1 sm:p-1.5 bg-green-100 rounded-full flex-shrink-0">
              <UserCheck className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-green-600" />
            </div>
            <span className="text-gray-700 font-medium text-xs sm:text-sm truncate">{info.getValue()}</span>
          </div>
        ),
      },
      {
        accessorFn: (row) => row.scheme?.name || "No Scheme",
        id: "scheme",
        header: "Investment Scheme",
        cell: (info) => (
          <div className="flex items-center gap-2 min-w-0">
            <div className="p-1 sm:p-1.5 bg-purple-100 rounded-full flex-shrink-0">
              <CreditCard className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-purple-600" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-gray-900 text-xs sm:text-sm truncate">{info.getValue()}</p>
              {info.row.original.scheme && (
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <Wallet className="h-2.5 w-2.5 flex-shrink-0" />
                  <span className="truncate">₹{info.row.original.scheme.monthlyAmount}/mo</span>
                </p>
              )}
            </div>
          </div>
        ),
      },
      {
        accessorFn: (row) => {
          if (!row.payments || row.payments.length === 0) return "NONE"
          return row.payments.every((p) => p.status === "PAID") ? "PAID" : "DUE"
        },
        id: "paymentStatus",
        header: "Payment Status",
        cell: (info) => {
          const status = info.getValue()
          const statusConfig = {
            PAID: {
              icon: CheckCircle2,
              color: "bg-green-100 text-green-800 border-green-200",
              iconColor: "text-green-600",
            },
            DUE: {
              icon: XCircle,
              color: "bg-red-100 text-red-800 border-red-200",
              iconColor: "text-red-600",
            },
            NONE: {
              icon: Clock,
              color: "bg-gray-100 text-gray-800 border-gray-200",
              iconColor: "text-gray-600",
            },
          }
          const config = statusConfig[status]
          const IconComponent = config.icon
          return (
            <Badge className={`${config.color} flex items-center gap-1 font-semibold text-xs px-2 py-1`}>
              <IconComponent className={`h-2.5 w-2.5 sm:h-3 sm:w-3 ${config.iconColor}`} />
              <span className="hidden sm:inline">{status === "NONE" ? "No Payments" : status}</span>
              <span className="sm:hidden">{status === "NONE" ? "None" : status}</span>
            </Badge>
          )
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: (info) => (
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1 sm:gap-2 bg-transparent text-xs sm:text-sm px-2 sm:px-3"
          >
            <Eye className="h-3 w-3" />
            <span className="hidden sm:inline">View</span>
          </Button>
        ),
      },
    ],
    [],
  )

  // Filter data before passing to table
  const filteredData = useMemo(() => {
    return data.filter((customer) => {
      // Scheme filter
      const schemeMatch = schemeFilter === "all" || customer.scheme?.name === schemeFilter

      // User filter
      const userMatch = userFilter === "all" || customer.user?.name === userFilter

      // Payment status filter
      let paymentStatus = "NONE"
      if (customer.payments && customer.payments.length > 0) {
        paymentStatus = customer.payments.every((p) => p.status === "PAID") ? "PAID" : "DUE"
      }
      const paymentMatch = paymentStatusFilter === "all" || paymentStatus === paymentStatusFilter

      return schemeMatch && userMatch && paymentMatch
    })
  }, [data, schemeFilter, userFilter, paymentStatusFilter])

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      globalFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  })

  // Calculate stats based on filtered data
  const totalCustomers = filteredData.length
  const paidCustomers = filteredData.filter(
    (d) => d.payments && d.payments.length > 0 && d.payments.every((p) => p.status === "PAID"),
  ).length
  const dueCustomers = filteredData.filter(
    (d) => d.payments && d.payments.length > 0 && d.payments.some((p) => p.status === "DUE"),
  ).length

  const handleBack = () => {
    // Add your back navigation logic here
    window.history.back()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-r from-blue-200/20 to-indigo-200/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-80 sm:h-80 bg-gradient-to-r from-purple-200/20 to-pink-200/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 p-3 sm:p-4 lg:p-6 xl:p-8">
        <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
          {/* Header */}
          <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-xl">
            <CardHeader className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-t-lg p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleBack}
                    className="text-white hover:bg-white/20 p-2 rounded-xl flex-shrink-0"
                  >
                    <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" /><h4>Back to Dashboard</h4>
                  </Button>
                  <div className="p-2 sm:p-3 bg-white/20 rounded-xl backdrop-blur-sm flex-shrink-0">
                    <Users className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-lg sm:text-2xl font-bold truncate">Customer Management</CardTitle>
                    <CardDescription className="text-blue-100 text-sm sm:text-base hidden sm:block">
                      Manage and track all your customers and their investments
                    </CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-xl hover:shadow-xl transition-all duration-300">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="p-2 sm:p-3 bg-blue-100 rounded-xl flex-shrink-0">
                    <Users className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Total Customers</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900">{totalCustomers}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-xl hover:shadow-xl transition-all duration-300">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="p-2 sm:p-3 bg-green-100 rounded-xl flex-shrink-0">
                    <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Payments Up to Date</p>
                    <p className="text-xl sm:text-2xl font-bold text-green-600">{paidCustomers}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-xl hover:shadow-xl transition-all duration-300">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="p-2 sm:p-3 bg-red-100 rounded-xl flex-shrink-0">
                    <AlertCircle className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Pending Payments</p>
                    <p className="text-xl sm:text-2xl font-bold text-red-600">{dueCustomers}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-xl">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Filter className="h-4 w-4 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Filters & Search</h3>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowMobileFilters(!showMobileFilters)}
                  className="lg:hidden"
                >
                  {showMobileFilters ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                </Button>
              </div>

              {/* Mobile Search - Always visible */}
              <div className="mb-4 lg:hidden">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search customers..."
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    className="pl-10 border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                  />
                </div>
              </div>

              {/* Desktop Filters */}
              <div className="hidden lg:grid lg:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search customers..."
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    className="pl-10 border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                  />
                </div>
                <Select onValueChange={setSchemeFilter} defaultValue="all">
                  <SelectTrigger className="border-2 border-gray-200 focus:border-blue-500 rounded-xl">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-gray-500" />
                      <SelectValue placeholder="Filter by scheme" />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-md">
                    <SelectItem value="all">All Schemes</SelectItem>
                    {schemes.map((scheme) => (
                      <SelectItem key={scheme.id} value={scheme.name}>
                        {scheme.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select onValueChange={setUserFilter} defaultValue="all">
                  <SelectTrigger className="border-2 border-gray-200 focus:border-blue-500 rounded-xl">
                    <div className="flex items-center gap-2">
                      <UserCheck className="h-4 w-4 text-gray-500" />
                      <SelectValue placeholder="Filter by user" />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-md">
                    <SelectItem value="all">All Users</SelectItem>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.name}>
                        {user.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select onValueChange={setPaymentStatusFilter} defaultValue="all">
                  <SelectTrigger className="border-2 border-gray-200 focus:border-blue-500 rounded-xl">
                    <div className="flex items-center gap-2">
                      <Wallet className="h-4 w-4 text-gray-500" />
                      <SelectValue placeholder="Payment status" />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-md">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="PAID">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-3 w-3 text-green-600" />
                        Paid
                      </div>
                    </SelectItem>
                    <SelectItem value="DUE">
                      <div className="flex items-center gap-2">
                        <XCircle className="h-3 w-3 text-red-600" />
                        Due
                      </div>
                    </SelectItem>
                    <SelectItem value="NONE">
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3 text-gray-600" />
                        No Payments
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Mobile Filters - Collapsible */}
              {showMobileFilters && (
                <div className="lg:hidden space-y-3">
                  <Select onValueChange={setSchemeFilter} defaultValue="all">
                    <SelectTrigger className="border-2 border-gray-200 focus:border-blue-500 rounded-xl">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-gray-500" />
                        <SelectValue placeholder="Filter by scheme" />
                      </div>
                    </SelectTrigger>
                    <SelectContent className="bg-white/95 backdrop-blur-md">
                      <SelectItem value="all">All Schemes</SelectItem>
                      {schemes.map((scheme) => (
                        <SelectItem key={scheme.id} value={scheme.name}>
                          {scheme.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select onValueChange={setUserFilter} defaultValue="all">
                    <SelectTrigger className="border-2 border-gray-200 focus:border-blue-500 rounded-xl">
                      <div className="flex items-center gap-2">
                        <UserCheck className="h-4 w-4 text-gray-500" />
                        <SelectValue placeholder="Filter by user" />
                      </div>
                    </SelectTrigger>
                    <SelectContent className="bg-white/95 backdrop-blur-md">
                      <SelectItem value="all">All Users</SelectItem>
                      {users.map((user) => (
                        <SelectItem key={user.id} value={user.name}>
                          {user.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select onValueChange={setPaymentStatusFilter} defaultValue="all">
                    <SelectTrigger className="border-2 border-gray-200 focus:border-blue-500 rounded-xl">
                      <div className="flex items-center gap-2">
                        <Wallet className="h-4 w-4 text-gray-500" />
                        <SelectValue placeholder="Payment status" />
                      </div>
                    </SelectTrigger>
                    <SelectContent className="bg-white/95 backdrop-blur-md">
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="PAID">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-3 w-3 text-green-600" />
                          Paid
                        </div>
                      </SelectItem>
                      <SelectItem value="DUE">
                        <div className="flex items-center gap-2">
                          <XCircle className="h-3 w-3 text-red-600" />
                          Due
                        </div>
                      </SelectItem>
                      <SelectItem value="NONE">
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3 text-gray-600" />
                          No Payments
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Table */}
          <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-xl">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id} className="bg-gray-50/80 hover:bg-gray-50">
                        {headerGroup.headers.map((header) => (
                          <TableHead
                            key={header.id}
                            className="font-semibold text-gray-700 py-3 sm:py-4 text-xs sm:text-sm whitespace-nowrap"
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                          </TableHead>
                        ))}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {table.getRowModel().rows.length ? (
                      table.getRowModel().rows.map((row, index) => (
                        <TableRow
                          key={row.id}
                          className={`hover:bg-blue-50/50 transition-colors ${
                            index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                          }`}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id} className="py-3 sm:py-4 px-2 sm:px-4">
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={columns.length} className="text-center py-8 sm:py-12">
                          <div className="flex flex-col items-center gap-3">
                            <div className="p-3 sm:p-4 bg-gray-100 rounded-full">
                              <Users className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400" />
                            </div>
                            <div>
                              <p className="text-base sm:text-lg font-medium text-gray-600">No customers found</p>
                              <p className="text-xs sm:text-sm text-gray-500">Try adjusting your search or filters</p>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Pagination */}
          <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-xl">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                  <TrendingUp className="h-4 w-4" />
                  <span>
                    Showing {table.getRowModel().rows.length} of {filteredData.length} customers
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>
                      Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => table.previousPage()}
                      disabled={!table.getCanPreviousPage()}
                      className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3"
                    >
                      <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="hidden sm:inline">Previous</span>
                      <span className="sm:hidden">Prev</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => table.nextPage()}
                      disabled={!table.getCanNextPage()}
                      className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3"
                    >
                      <span className="hidden sm:inline">Next</span>
                      <span className="sm:hidden">Next</span>
                      <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
