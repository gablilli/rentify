"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Building2,
  Users,
  Euro,
  Calendar,
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
  Plus,
  Settings,
  Bell,
  Search,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // Mock data
  const stats = {
    totalProperties: 12,
    totalTenants: 28,
    monthlyRevenue: 15420,
    pendingPayments: 3,
    maintenanceRequests: 2,
    expiringContracts: 1,
  }

  const recentPayments = [
    { id: 1, tenant: "Marco Bianchi", property: "Via Roma 123", amount: 850, status: "paid", date: "2024-01-15" },
    { id: 2, tenant: "Laura Verdi", property: "Corso Italia 45", amount: 1200, status: "pending", date: "2024-01-10" },
    { id: 3, tenant: "Giuseppe Neri", property: "Via Milano 78", amount: 950, status: "overdue", date: "2024-01-05" },
  ]

  const upcomingTasks = [
    { id: 1, type: "maintenance", title: "Riparazione caldaia", property: "Via Roma 123", date: "2024-01-20" },
    { id: 2, type: "contract", title: "Rinnovo contratto", tenant: "Marco Bianchi", date: "2024-01-25" },
    { id: 3, type: "inspection", title: "Ispezione annuale", property: "Corso Italia 45", date: "2024-01-30" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "paid":
        return "Pagato"
      case "pending":
        return "In attesa"
      case "overdue":
        return "In ritardo"
      default:
        return status
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Building2 className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold">Rentify</h1>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Cerca proprietà, inquilini..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifiche
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Impostazioni
              </Button>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                MR
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Proprietà</p>
                  <p className="text-2xl font-bold">{stats.totalProperties}</p>
                </div>
                <Building2 className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Inquilini</p>
                  <p className="text-2xl font-bold">{stats.totalTenants}</p>
                </div>
                <Users className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Entrate Mensili</p>
                  <p className="text-2xl font-bold">€{stats.monthlyRevenue.toLocaleString()}</p>
                </div>
                <Euro className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pagamenti in Sospeso</p>
                  <p className="text-2xl font-bold text-orange-600">{stats.pendingPayments}</p>
                </div>
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Manutenzioni</p>
                  <p className="text-2xl font-bold text-red-600">{stats.maintenanceRequests}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Contratti in Scadenza</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.expiringContracts}</p>
                </div>
                <FileText className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Panoramica</TabsTrigger>
            <TabsTrigger value="properties">Proprietà</TabsTrigger>
            <TabsTrigger value="tenants">Inquilini</TabsTrigger>
            <TabsTrigger value="payments">Pagamenti</TabsTrigger>
            <TabsTrigger value="maintenance">Manutenzioni</TabsTrigger>
            <TabsTrigger value="contracts">Contratti</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Payments */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Pagamenti Recenti</CardTitle>
                    <Link href="/dashboard/payments">
                      <Button variant="outline" size="sm">
                        Vedi tutti
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentPayments.map((payment) => (
                      <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">{payment.tenant}</p>
                          <p className="text-sm text-gray-600">{payment.property}</p>
                          <p className="text-sm text-gray-500">{payment.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">€{payment.amount}</p>
                          <Badge className={getStatusColor(payment.status)}>{getStatusText(payment.status)}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Tasks */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Attività in Programma</CardTitle>
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Aggiungi
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingTasks.map((task) => (
                      <div key={task.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                        <div className="flex-shrink-0">
                          {task.type === "maintenance" && <AlertTriangle className="h-5 w-5 text-red-500" />}
                          {task.type === "contract" && <FileText className="h-5 w-5 text-blue-500" />}
                          {task.type === "inspection" && <CheckCircle className="h-5 w-5 text-green-500" />}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{task.title}</p>
                          <p className="text-sm text-gray-600">{task.property || task.tenant}</p>
                        </div>
                        <div className="text-sm text-gray-500">{task.date}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Azioni Rapide</CardTitle>
                <CardDescription>Accedi rapidamente alle funzioni più utilizzate</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Link href="/dashboard/properties/new">
                    <Button variant="outline" className="h-20 flex flex-col space-y-2 bg-transparent">
                      <Building2 className="h-6 w-6" />
                      <span>Nuova Proprietà</span>
                    </Button>
                  </Link>
                  <Link href="/dashboard/tenants/new">
                    <Button variant="outline" className="h-20 flex flex-col space-y-2 bg-transparent">
                      <Users className="h-6 w-6" />
                      <span>Nuovo Inquilino</span>
                    </Button>
                  </Link>
                  <Link href="/dashboard/contracts/new">
                    <Button variant="outline" className="h-20 flex flex-col space-y-2 bg-transparent">
                      <FileText className="h-6 w-6" />
                      <span>Nuovo Contratto</span>
                    </Button>
                  </Link>
                  <Link href="/dashboard/maintenance/new">
                    <Button variant="outline" className="h-20 flex flex-col space-y-2 bg-transparent">
                      <Calendar className="h-6 w-6" />
                      <span>Manutenzione</span>
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="properties">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Le Tue Proprietà</CardTitle>
                  <Link href="/dashboard/properties/new">
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Aggiungi Proprietà
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Gestisci le tue proprietà da qui</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Aggiungi, modifica e monitora tutte le tue proprietà in affitto
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tenants">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Gestione Inquilini</CardTitle>
                  <Link href="/dashboard/tenants/new">
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Aggiungi Inquilino
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Gestisci i tuoi inquilini</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Aggiungi inquilini, gestisci coinquilini e monitora i contratti
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle>Gestione Pagamenti</CardTitle>
                <CardDescription>Monitora pagamenti, depositi cauzionali e genera ricevute automatiche</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentPayments.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{payment.tenant}</p>
                        <p className="text-sm text-gray-600">{payment.property}</p>
                        <p className="text-sm text-gray-500">{payment.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">€{payment.amount}</p>
                        <Badge className={getStatusColor(payment.status)}>{getStatusText(payment.status)}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="maintenance">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Manutenzioni e Lavori</CardTitle>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Nuova Manutenzione
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Gestisci manutenzioni e interventi</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Programma, traccia e gestisci tutti gli interventi di manutenzione
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contracts">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Contratti di Locazione</CardTitle>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Nuovo Contratto
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Gestisci contratti e firme digitali</p>
                  <p className="text-sm text-gray-500 mt-2">Crea, firma e gestisci tutti i contratti di locazione</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
