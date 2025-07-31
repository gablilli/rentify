"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building2, FileText, Download, Eye, Plus, Search } from "lucide-react"
import Link from "next/link"

export default function ContractsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const contracts = [
    {
      id: 1,
      tenant: "Mario Rossi",
      property: "Via Roma 123",
      type: "Libero",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      monthlyRent: 850,
      status: "Attivo",
      signed: true,
    },
    {
      id: 2,
      tenant: "Anna Verdi",
      property: "Via Milano 45",
      type: "Concordato",
      startDate: "2024-02-01",
      endDate: "2028-01-31",
      monthlyRent: 720,
      status: "Attivo",
      signed: true,
    },
    {
      id: 3,
      tenant: "Luca Bianchi",
      property: "Via Napoli 12",
      type: "Transitorio",
      startDate: "2024-03-01",
      endDate: "2025-02-28",
      monthlyRent: 950,
      status: "In Scadenza",
      signed: false,
    },
  ]

  const generatePDF = async (contractId: number) => {
    try {
      const response = await fetch(`/api/contracts/${contractId}/pdf`, {
        method: "POST",
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `contratto_${contractId}.pdf`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      } else {
        alert("Errore nella generazione del PDF")
      }
    } catch (error) {
      alert("Errore di connessione")
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Attivo":
        return "bg-green-100 text-green-800"
      case "In Scadenza":
        return "bg-yellow-100 text-yellow-800"
      case "Scaduto":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="flex items-center space-x-2">
                <Building2 className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">Rentify</span>
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-600">Contratti</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Cerca contratti..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Link href="/dashboard/contracts/new">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Nuovo Contratto
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestione Contratti</h1>
          <p className="text-gray-600">Gestisci tutti i contratti di locazione e genera PDF automaticamente</p>
        </div>

        <Tabs defaultValue="active" className="space-y-6">
          <TabsList>
            <TabsTrigger value="active">Contratti Attivi</TabsTrigger>
            <TabsTrigger value="expiring">In Scadenza</TabsTrigger>
            <TabsTrigger value="expired">Scaduti</TabsTrigger>
            <TabsTrigger value="templates">Template</TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            <div className="grid gap-6">
              {contracts.map((contract) => (
                <Card key={contract.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          <FileText className="h-5 w-5" />
                          <span>Contratto #{contract.id}</span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(contract.status)}`}
                          >
                            {contract.status}
                          </span>
                        </CardTitle>
                        <CardDescription>
                          {contract.tenant} - {contract.property}
                        </CardDescription>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          Visualizza
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => generatePDF(contract.id)}>
                          <Download className="h-4 w-4 mr-2" />
                          Scarica PDF
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Tipo Contratto</Label>
                        <p className="font-medium">{contract.type}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Data Inizio</Label>
                        <p className="font-medium">{new Date(contract.startDate).toLocaleDateString("it-IT")}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Data Fine</Label>
                        <p className="font-medium">{new Date(contract.endDate).toLocaleDateString("it-IT")}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Canone Mensile</Label>
                        <p className="font-medium">€{contract.monthlyRent}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">Firmato:</span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            contract.signed ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          {contract.signed ? "Sì" : "No"}
                        </span>
                      </div>
                      {!contract.signed && <Button size="sm">Invia per Firma</Button>}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="expiring">
            <Card>
              <CardHeader>
                <CardTitle>Contratti in Scadenza</CardTitle>
                <CardDescription>Contratti che scadranno nei prossimi 60 giorni</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">1 contratto in scadenza</p>
                  <p className="text-sm text-gray-500 mt-2">Controlla i contratti che necessitano di rinnovo</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="expired">
            <Card>
              <CardHeader>
                <CardTitle>Contratti Scaduti</CardTitle>
                <CardDescription>Contratti che sono già scaduti</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Nessun contratto scaduto</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates">
            <Card>
              <CardHeader>
                <CardTitle>Template Contratti</CardTitle>
                <CardDescription>Gestisci i template per la generazione automatica dei contratti</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-center">
                        <FileText className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                        <h3 className="font-semibold mb-2">Contratto Libero</h3>
                        <p className="text-sm text-gray-600 mb-4">Template per contratti a canone libero</p>
                        <Button variant="outline" size="sm">
                          Modifica Template
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="text-center">
                        <FileText className="h-12 w-12 text-green-600 mx-auto mb-4" />
                        <h3 className="font-semibold mb-2">Contratto Concordato</h3>
                        <p className="text-sm text-gray-600 mb-4">Template per contratti a canone concordato</p>
                        <Button variant="outline" size="sm">
                          Modifica Template
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="text-center">
                        <FileText className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                        <h3 className="font-semibold mb-2">Contratto Transitorio</h3>
                        <p className="text-sm text-gray-600 mb-4">Template per contratti transitori</p>
                        <Button variant="outline" size="sm">
                          Modifica Template
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
