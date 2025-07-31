"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Users, ArrowLeft, Plus, Trash2 } from "lucide-react"
import Link from "next/link"

interface Roommate {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
}

export default function NewTenantPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    taxCode: "",
    idNumber: "",
    emergencyContact: "",
    emergencyPhone: "",
    property: "",
    startDate: "",
    monthlyRent: "",
    deposit: "",
    hasRoommates: false,
  })

  const [roommates, setRoommates] = useState<Roommate[]>([])

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
    }
    setRoommates([...roommates, newRoommate])
  }

  const removeRoommate = (id: string) => {
    setRoommates(roommates.filter((roommate) => roommate.id !== id))
  }

  const updateRoommate = (id: string, field: string, value: string) => {
    setRoommates(roommates.map((roommate) => (roommate.id === id ? { ...roommate, [field]: value } : roommate)))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Tenant data:", { ...formData, roommates })
    // Here you would typically send the data to your API
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <Users className="h-6 w-6 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">Nuovo Inquilino</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Aggiungi Nuovo Inquilino</CardTitle>
            <CardDescription>Inserisci i dettagli dell'inquilino e dei coinquilini se presenti</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Informazioni Personali</h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Nome</Label>
                    <Input
                      id="firstName"
                      placeholder="Mario"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">Cognome</Label>
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
                    <Label htmlFor="email">Email</Label>
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
                    <Label htmlFor="phone">Telefono</Label>
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

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Data di Nascita</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="taxCode">Codice Fiscale</Label>
                    <Input
                      id="taxCode"
                      placeholder="RSSMRA80A01H501Z"
                      value={formData.taxCode}
                      onChange={(e) => handleInputChange("taxCode", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="idNumber">Numero Documento</Label>
                    <Input
                      id="idNumber"
                      placeholder="AB1234567"
                      value={formData.idNumber}
                      onChange={(e) => handleInputChange("idNumber", e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Contatto di Emergenza</h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="emergencyContact">Nome Contatto</Label>
                    <Input
                      id="emergencyContact"
                      placeholder="Anna Rossi"
                      value={formData.emergencyContact}
                      onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emergencyPhone">Telefono Emergenza</Label>
                    <Input
                      id="emergencyPhone"
                      type="tel"
                      placeholder="+39 987 654 3210"
                      value={formData.emergencyPhone}
                      onChange={(e) => handleInputChange("emergencyPhone", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Rental Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Informazioni Affitto</h3>

                <div className="space-y-2">
                  <Label htmlFor="property">Proprietà</Label>
                  <Select onValueChange={(value) => handleInputChange("property", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleziona proprietà" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="property1">Via Roma 123 - Appartamento</SelectItem>
                      <SelectItem value="property2">Via Milano 45 - Casa</SelectItem>
                      <SelectItem value="property3">Via Torino 67 - Monolocale</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Data Inizio</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => handleInputChange("startDate", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="monthlyRent">Affitto Mensile (€)</Label>
                    <Input
                      id="monthlyRent"
                      type="number"
                      placeholder="850"
                      value={formData.monthlyRent}
                      onChange={(e) => handleInputChange("monthlyRent", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="deposit">Deposito (€)</Label>
                    <Input
                      id="deposit"
                      type="number"
                      placeholder="1700"
                      value={formData.deposit}
                      onChange={(e) => handleInputChange("deposit", e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Roommates Section */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasRoommates"
                    checked={formData.hasRoommates}
                    onCheckedChange={(checked) => handleInputChange("hasRoommates", checked as boolean)}
                  />
                  <Label htmlFor="hasRoommates">Ci sono coinquilini</Label>
                </div>

                {formData.hasRoommates && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-md font-medium">Coinquilini</h4>
                      <Button type="button" onClick={addRoommate} size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Aggiungi Coinquilino
                      </Button>
                    </div>

                    {roommates.map((roommate, index) => (
                      <Card key={roommate.id} className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h5 className="font-medium">Coinquilino {index + 1}</h5>
                          <Button type="button" variant="outline" size="sm" onClick={() => removeRoommate(roommate.id)}>
                            <Trash2 className="h-4 w-4" />
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
                      </Card>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end space-x-4">
                <Link href="/dashboard">
                  <Button variant="outline">Annulla</Button>
                </Link>
                <Button type="submit">Salva Inquilino</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
