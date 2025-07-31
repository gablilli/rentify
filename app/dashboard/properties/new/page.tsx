"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building2, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewPropertyPage() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    postalCode: "",
    propertyType: "",
    rooms: "",
    bathrooms: "",
    size: "",
    monthlyRent: "",
    deposit: "",
    description: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Property data:", formData)
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
                <Building2 className="h-6 w-6 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">Nuova Proprietà</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Aggiungi Nuova Proprietà</CardTitle>
            <CardDescription>Inserisci i dettagli della proprietà che vuoi aggiungere al tuo portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Informazioni Base</h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Proprietà</Label>
                    <Input
                      id="name"
                      placeholder="es. Appartamento Via Roma"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="propertyType">Tipo Proprietà</Label>
                    <Select onValueChange={(value) => handleInputChange("propertyType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleziona tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apartment">Appartamento</SelectItem>
                        <SelectItem value="house">Casa</SelectItem>
                        <SelectItem value="studio">Monolocale</SelectItem>
                        <SelectItem value="villa">Villa</SelectItem>
                        <SelectItem value="commercial">Commerciale</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Indirizzo</Label>
                  <Input
                    id="address"
                    placeholder="Via Roma 123"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">Città</Label>
                    <Input
                      id="city"
                      placeholder="Milano"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="postalCode">CAP</Label>
                    <Input
                      id="postalCode"
                      placeholder="20100"
                      value={formData.postalCode}
                      onChange={(e) => handleInputChange("postalCode", e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Property Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Dettagli Proprietà</h3>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="rooms">Numero Stanze</Label>
                    <Input
                      id="rooms"
                      type="number"
                      placeholder="3"
                      value={formData.rooms}
                      onChange={(e) => handleInputChange("rooms", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bathrooms">Numero Bagni</Label>
                    <Input
                      id="bathrooms"
                      type="number"
                      placeholder="2"
                      value={formData.bathrooms}
                      onChange={(e) => handleInputChange("bathrooms", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="size">Superficie (mq)</Label>
                    <Input
                      id="size"
                      type="number"
                      placeholder="85"
                      value={formData.size}
                      onChange={(e) => handleInputChange("size", e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Financial Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Informazioni Finanziarie</h3>

                <div className="grid md:grid-cols-2 gap-4">
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
                    <Label htmlFor="deposit">Deposito Cauzionale (€)</Label>
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

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Descrizione</Label>
                <textarea
                  id="description"
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Descrizione dettagliata della proprietà..."
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end space-x-4">
                <Link href="/dashboard">
                  <Button variant="outline">Annulla</Button>
                </Link>
                <Button type="submit">Salva Proprietà</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
