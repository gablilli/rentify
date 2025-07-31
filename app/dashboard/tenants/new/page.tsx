"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Users, ArrowLeft, Plus, X, Upload } from "lucide-react"
import Link from "next/link"

interface Roommate {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  fiscalCode: string
}

export default function NewTenantPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    fiscalCode: "",
    birthDate: "",
    birthPlace: "",
    idDocument: "",
    idNumber: "",
    idExpiry: "",
    address: "",
    city: "",
    postalCode: "",
    province: "",
    emergencyContact: "",
    emergencyPhone: "",
    employer: "",
    monthlyIncome: "",
    propertyId: "",
    moveInDate: "",
    contractType: "",
    hasRoommates: false,
  })

  const [roommates, setRoommates] = useState<Roommate[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addRoommate = () => {
    const newRoommate: Roommate = {
      id: Date.now().toString(),
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      fiscalCode: "",
    }
    setRoommates((prev) => [...prev, newRoommate])
  }

  const removeRoommate = (id: string) => {
    setRoommates((prev) => prev.filter((r) => r.id !== id))
  }

  const updateRoommate = (id: string, field: string, value: string) => {
    setRoommates((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // Redirect to tenants list
      window.location.href = "/dashboard"
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="px-6 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Torna alla Dashboard
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <Users className="h-6 w-6 text-blue-600" />
              <h1 className="text-xl font-semibold">Aggiungi Nuovo Inquilino</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle>Informazioni Personali</CardTitle>
                <CardDescription>Inserisci i dati anagrafici dell'inquilino principale</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Nome *</Label>
                    <Input
                      id="firstName"
                      placeholder="Mario"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Cognome *</Label>
                    <Input
                      id="lastName"
                      placeholder="Rossi"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="mario.rossi@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefono *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+39 123 456 7890"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fiscalCode">Codice Fiscale *</Label>
                    <Input
                      id="fiscalCode"
                      placeholder="RSSMRA80A01H501Z"
                      value={formData.fiscalCode}
                      onChange={(e) => handleInputChange("fiscalCode", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="birthDate">Data di Nascita *</Label>
                    <Input
                      id="birthDate"
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) => handleInputChange("birthDate", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="birthPlace">Luogo di Nascita *</Label>
                  <Input
                    id="birthPlace"
                    placeholder="Milano (MI)"
                    value={formData.birthPlace}
                    onChange={(e) => handleInputChange("birthPlace", e.target.value)}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Document Information */}
            <Card>
              <CardHeader>
                <CardTitle>Documento di Identità</CardTitle>
                <CardDescription>Informazioni del documento di riconoscimento</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="idDocument">Tipo Documento *</Label>
                    <Select onValueChange={(value) => handleInputChange("idDocument", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleziona documento" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="carta_identita">Carta d'Identità</SelectItem>
                        <SelectItem value="patente">Patente di Guida</SelectItem>
                        <SelectItem value="passaporto">Passaporto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="idNumber">Numero Documento *</Label>
                    <Input
                      id="idNumber"
                      placeholder="AB1234567"
                      value={formData.idNumber}
                      onChange={(e) => handleInputChange("idNumber", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="idExpiry">Scadenza *</Label>
                    <Input
                      id="idExpiry"
                      type="date"
                      value={formData.idExpiry}
                      onChange={(e) => handleInputChange("idExpiry", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Carica Documento</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Carica fronte e retro del documento</p>
                    <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                      Seleziona File
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Address Information */}
            <Card>
              <CardHeader>
                <CardTitle>Indirizzo di Residenza</CardTitle>
                <CardDescription>Indirizzo di residenza attuale dell'inquilino</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Indirizzo *</Label>
                  <Input
                    id="address"
                    placeholder="Via Roma 123"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">Città *</Label>
                    <Input
                      id="city"
                      placeholder="Milano"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">CAP *</Label>
                    <Input
                      id="postalCode"
                      placeholder="20100"
                      value={formData.postalCode}
                      onChange={(e) => handleInputChange("postalCode", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="province">Provincia *</Label>
                    <Input
                      id="province"
                      placeholder="MI"
                      value={formData.province}
                      onChange={(e) => handleInputChange("province", e.target.value)}
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card>
              <CardHeader>
                <CardTitle>Contatto di Emergenza</CardTitle>
                <CardDescription>Persona da contattare in caso di emergenza</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="emergencyContact">Nome Contatto</Label>
                    <Input
                      id="emergencyContact"
                      placeholder="Nome e cognome"
                      value={formData.emergencyContact}
                      onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergencyPhone">Telefono</Label>
                    <Input
                      id="emergencyPhone"
                      type="tel"
                      placeholder="+39 123 456 7890"
                      value={formData.emergencyPhone}
                      onChange={(e) => handleInputChange("emergencyPhone", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Employment Information */}
            <Card>
              <CardHeader>
                <CardTitle>Informazioni Lavorative</CardTitle>
                <CardDescription>Dati relativi all'occupazione e al reddito</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="employer">Datore di Lavoro</Label>
                    <Input
                      id="employer"
                      placeholder="Nome azienda"
                      value={formData.employer}
                      onChange={(e) => handleInputChange("employer", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="monthlyIncome">Reddito Mensile (€)</Label>
                    <Input
                      id="monthlyIncome"
                      type="number"
                      placeholder="2500"
                      value={formData.monthlyIncome}
                      onChange={(e) => handleInputChange("monthlyIncome", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rental Information */}
            <Card>
              <CardHeader>
                <CardTitle>Informazioni Locazione</CardTitle>
                <CardDescription>Dettagli del contratto di locazione</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="propertyId">Proprietà *</Label>
                    <Select onValueChange={(value) => handleInputChange("propertyId", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleziona proprietà" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="prop1">Via Roma 123 - Appartamento</SelectItem>
                        <SelectItem value="prop2">Corso Italia 45 - Monolocale</SelectItem>
                        <SelectItem value="prop3">Via Milano 78 - Casa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="moveInDate">Data Ingresso *</Label>
                    <Input
                      id="moveInDate"
                      type="date"
                      value={formData.moveInDate}
                      onChange={(e) => handleInputChange("moveInDate", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contractType">Tipo Contratto *</Label>
                  <Select onValueChange={(value) => handleInputChange("contractType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleziona tipo contratto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="libero">Contratto Libero (4+4)</SelectItem>
                      <SelectItem value="concordato">Contratto Concordato (3+2)</SelectItem>
                      <SelectItem value="transitorio">Contratto Transitorio</SelectItem>
                      <SelectItem value="studenti">Contratto Studenti</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasRoommates"
                    checked={formData.hasRoommates}
                    onCheckedChange={(checked) => handleInputChange("hasRoommates", checked as boolean)}
                  />
                  <Label htmlFor="hasRoommates">Ci sono coinquilini</Label>
                </div>
              </CardContent>
            </Card>

            {/* Roommates Section */}
            {formData.hasRoommates && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Coinquilini</CardTitle>
                      <CardDescription>Aggiungi i dati dei coinquilini</CardDescription>
                    </div>
                    <Button type="button" onClick={addRoommate} variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Aggiungi Coinquilino
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {roommates.map((roommate, index) => (
                    <div key={roommate.id} className="border rounded-lg p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Coinquilino {index + 1}</h4>
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeRoommate(roommate.id)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Nome</Label>
                          <Input
                            placeholder="Nome"
                            value={roommate.firstName}
                            onChange={(e) => updateRoommate(roommate.id, "firstName", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Cognome</Label>
                          <Input
                            placeholder="Cognome"
                            value={roommate.lastName}
                            onChange={(e) => updateRoommate(roommate.id, "lastName", e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Email</Label>
                          <Input
                            type="email"
                            placeholder="email@esempio.com"
                            value={roommate.email}
                            onChange={(e) => updateRoommate(roommate.id, "email", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Telefono</Label>
                          <Input
                            type="tel"
                            placeholder="+39 123 456 7890"
                            value={roommate.phone}
                            onChange={(e) => updateRoommate(roommate.id, "phone", e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Codice Fiscale</Label>
                        <Input
                          placeholder="RSSMRA80A01H501Z"
                          value={roommate.fiscalCode}
                          onChange={(e) => updateRoommate(roommate.id, "fiscalCode", e.target.value)}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Submit Buttons */}
            <div className="flex justify-end space-x-4">
              <Link href="/dashboard">
                <Button variant="outline">Annulla</Button>
              </Link>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Salvataggio..." : "Salva Inquilino"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
