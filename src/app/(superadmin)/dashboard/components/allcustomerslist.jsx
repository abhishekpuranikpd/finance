"use client";

import { useEffect, useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
} from "lucide-react";

export default function CustomerTable({ customers }) {
  const [data, setData] = useState(customers);
  const [globalFilter, setGlobalFilter] = useState("");
  const [schemeFilter, setSchemeFilter] = useState("all");
  const [userFilter, setUserFilter] = useState("all");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("all");

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Customer",
        cell: (info) => (
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-full">
              <User className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">
                {info.getValue() || (
                  <span className="text-gray-400 italic">No Name</span>
                )}
              </p>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <Phone className="h-3 w-3" />
                {info.row.original.phone || "No Phone"}
              </p>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "address",
        header: "Address",
        cell: (info) => (
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gray-500" />
            <span className="text-gray-700">
              {info.getValue() || (
                <span className="text-gray-400 italic">No Address</span>
              )}
            </span>
          </div>
        ),
      },
      {
        accessorFn: (row) => row.user?.name || "Unassigned",
        id: "user",
        header: "Added By",
        cell: (info) => (
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-green-100 rounded-full">
              <UserCheck className="h-3 w-3 text-green-600" />
            </div>
            <span className="text-gray-700 font-medium">{info.getValue()}</span>
          </div>
        ),
      },
      {
        accessorFn: (row) => row.scheme?.name || "No Scheme",
        id: "scheme",
        header: "Investment Scheme",
        cell: (info) => (
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-purple-100 rounded-full">
              <CreditCard className="h-3 w-3 text-purple-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">{info.getValue()}</p>
              {info.row.original.scheme && (
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <Wallet className="h-3 w-3" />₹
                  {info.row.original.scheme.monthlyAmount}/mo
                </p>
              )}
            </div>
          </div>
        ),
      },
      {
        accessorFn: (row) => {
          if (!row.payments || row.payments.length === 0) return "NONE";
          return row.payments.every((p) => p.status === "PAID")
            ? "PAID"
            : "DUE";
        },
        id: "paymentStatus",
        header: "Payment Status",
        cell: (info) => {
          const status = info.getValue();
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
          };

          const config = statusConfig[status];
          const IconComponent = config.icon;

          return (
            <Badge
              className={`${config.color} flex items-center gap-1 font-semibold`}
            >
              <IconComponent className={`h-3 w-3 ${config.iconColor}`} />
              {status === "NONE" ? "No Payments" : status}
            </Badge>
          );
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: (info) => (
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 bg-transparent"
          >
            <Eye className="h-3 w-3" />
            View
          </Button>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  useEffect(() => {
    table
      .getColumn("scheme")
      ?.setFilterValue(schemeFilter === "all" ? undefined : schemeFilter);
    table
      .getColumn("user")
      ?.setFilterValue(userFilter === "all" ? undefined : userFilter);
    table
      .getColumn("paymentStatus")
      ?.setFilterValue(
        paymentStatusFilter === "all" ? undefined : paymentStatusFilter
      );
  }, [schemeFilter, userFilter, paymentStatusFilter, table]);

  // Get unique values for filters
  const uniqueSchemes = [
    ...new Set(data.map((d) => d.scheme?.name || "No Scheme")),
  ];
  const uniqueUsers = [
    ...new Set(data.map((d) => d.user?.name || "Unassigned")),
  ];

  // Calculate stats
  const totalCustomers = data.length;
  const paidCustomers = data.filter(
    (d) =>
      d.payments &&
      d.payments.length > 0 &&
      d.payments.every((p) => p.status === "PAID")
  ).length;
  const dueCustomers = data.filter(
    (d) =>
      d.payments &&
      d.payments.length > 0 &&
      d.payments.some((p) => p.status === "DUE")
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 sm:p-6 lg:p-8">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-200/20 to-indigo-200/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-200/20 to-pink-200/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-xl">
          <CardHeader className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold">
                    Customer Management
                  </CardTitle>
                  <CardDescription className="text-blue-100">
                    Manage and track all your customers and their investments
                  </CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-xl hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Customers
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {totalCustomers}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-xl hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-xl">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Payments Up to Date
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {paidCustomers}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-xl hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-100 rounded-xl">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Pending Payments
                  </p>
                  <p className="text-2xl font-bold text-red-600">
                    {dueCustomers}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Filter className="h-4 w-4 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Filters & Search</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                  {uniqueSchemes.map((name) => (
                    <SelectItem key={name} value={name}>
                      {name}
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
                  {uniqueUsers.map((name) => (
                    <SelectItem key={name} value={name}>
                      {name}
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
          </CardContent>
        </Card>

        {/* Table */}
        <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-xl">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow
                      key={headerGroup.id}
                      className="bg-gray-50/80 hover:bg-gray-50"
                    >
                      {headerGroup.headers.map((header) => (
                        <TableHead
                          key={header.id}
                          className="font-semibold text-gray-700 py-4"
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
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
                          <TableCell key={cell.id} className="py-4">
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="text-center py-12"
                      >
                        <div className="flex flex-col items-center gap-3">
                          <div className="p-4 bg-gray-100 rounded-full">
                            <Users className="h-8 w-8 text-gray-400" />
                          </div>
                          <div>
                            <p className="text-lg font-medium text-gray-600">
                              No customers found
                            </p>
                            <p className="text-sm text-gray-500">
                              Try adjusting your search or filters
                            </p>
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
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <TrendingUp className="h-4 w-4" />
                Showing {table.getRowModel().rows.length} of {data.length}{" "}
                customers
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  Page {table.getState().pagination.pageIndex + 1} of{" "}
                  {table.getPageCount()}
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    className="flex items-center gap-2"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className="flex items-center gap-2"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
