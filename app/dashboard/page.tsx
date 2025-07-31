"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, Users, CreditCard, FileText, Plus, TrendingUp, AlertCircle, Calendar } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Rentify</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                Impostazioni
              </Button>
              <Button variant="outline" size="sm">
                Esci
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Benvenuto nel tuo sistema di gestione affitti</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Proprietà Totali</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+2 dal mese scorso</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Inquilini Attivi</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">28</div>
              <p className="text-xs text-muted-foreground">+4 dal mese scorso</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Entrate Mensili</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€15,240</div>
              <p className="text-xs text-muted-foreground">+8% dal mese scorso</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Contratti Attivi</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">25</div>
              <p className="text-xs text-muted-foreground">3 in scadenza</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Azioni Rapide</CardTitle>
              <CardDescription>Gestisci le tue proprietà e inquilini</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/dashboard/properties/new">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Aggiungi Proprietà
                </Button>
              </Link>
              <Link href="/dashboard/tenants/new">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Users className="mr-2 h-4 w-4" />
                  Nuovo Inquilino
                </Button>
              </Link>
              <Link href="/dashboard/contracts/new">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Crea Contratto
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pagamenti in Sospeso</CardTitle>
              <CardDescription>Affitti da riscuotere questo mese</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Via Roma 123</p>
                    <p className="text-sm text-gray-500">Mario Rossi</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">€850</p>
                    <p className="text-sm text-red-500">Scaduto</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Via Milano 45</p>
                    <p className="text-sm text-gray-500">Anna Verdi</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">€720</p>
                    <p className="text-sm text-yellow-500">Tra 3 giorni</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Attività Recenti</CardTitle>
              <CardDescription>Ultime operazioni effettuate</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CreditCard className="h-4 w-4 text-green-500" />
                  <div>
                    <p className="text-sm font-medium">Pagamento ricevuto</p>
                    <p className="text-xs text-gray-500">Via Torino 67 - €900</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <FileText className="h-4 w-4 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium">Contratto firmato</p>
                    <p className="text-xs text-gray-500">Luca Bianchi - Via Napoli 12</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <AlertCircle className="h-4 w-4 text-orange-500" />
                  <div>
                    <p className="text-sm font-medium">Richiesta manutenzione</p>
                    <p className="text-xs text-gray-500">Via Roma 123 - Perdita rubinetto</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Andamento Entrate</CardTitle>
              <CardDescription>Entrate mensili degli ultimi 6 mesi</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                <div className="text-center">
                  <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Grafico entrate mensili</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Scadenze Imminenti</CardTitle>
              <CardDescription>Contratti e pagamenti in scadenza</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-4 w-4 text-red-500" />
                    <div>
                      <p className="font-medium">Contratto in scadenza</p>
                      <p className="text-sm text-gray-500">Via Roma 123 - 15 giorni</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Rinnova
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CreditCard className="h-4 w-4 text-yellow-500" />
                    <div>
                      <p className="font-medium">Pagamento in scadenza</p>
                      <p className="text-sm text-gray-500">Via Milano 45 - 3 giorni</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Sollecita
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
