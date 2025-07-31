"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Building2, ArrowLeft, Upload, X } from "lucide-react"
import Link from "next/link"

export default function NewPropertyPage() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    postalCode: "",
    province: "",
    propertyType: "",
    rooms: "",
    bathrooms: "",
    area: "",
    floor: "",
    elevator: false,
    parking: false,
    garden: false,
    balcony: false,
    furnished: false,
    monthlyRent: "",
    deposit: "",
    expenses: "",
    description: "",
    notes: "",
  })

  const [amenities, setAmenities] = useState<string[]>([])
  const [images, setImages] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const availableAmenities = [
    "WiFi",
    "Aria Condizionata",
    "Riscaldamento",
    "Lavatrice",
    "Lavastoviglie",
    "TV",
    "Cucina Attrezzata",
    "Terrazza",
    "Cantina",
    "Soffitta",
  ]

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleAmenity = (amenity: string) => {
    setAmenities((prev) => (prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // Redirect to properties list
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
              <Building2 className="h-6 w-6 text-blue-600" />
              <h1 className="text-xl font-semibold">Aggiungi Nuova Proprietà</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Informazioni di Base</CardTitle>
                <CardDescription>Inserisci le informazioni principali della proprietà</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Proprietà *</Label>
                    <Input
                      id="name"
                      placeholder="es. Appartamento Via Roma"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="propertyType">Tipo Proprietà *</Label>
                    <Select onValueChange={(value) => handleInputChange("propertyType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleziona tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apartment">Appartamento</SelectItem>
                        <SelectItem value="house">Casa</SelectItem>
                        <SelectItem value="studio">Monolocale</SelectItem>
                        <SelectItem value="room">Stanza</SelectItem>
                        <SelectItem value="office">Ufficio</SelectItem>
                        <SelectItem value="commercial">Commerciale</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

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

            {/* Property Details */}
            <Card>
              <CardHeader>
                <CardTitle>Dettagli Proprietà</CardTitle>
                <CardDescription>Specifica le caratteristiche della proprietà</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="rooms">Numero Stanze</Label>
                    <Input
                      id="rooms"
                      type="number"
                      placeholder="3"
                      value={formData.rooms}
                      onChange={(e) => handleInputChange("rooms", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bathrooms">Bagni</Label>
                    <Input
                      id="bathrooms"
                      type="number"
                      placeholder="2"
                      value={formData.bathrooms}
                      onChange={(e) => handleInputChange("bathrooms", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="area">Superficie (m²)</Label>
                    <Input
                      id="area"
                      type="number"
                      placeholder="85"
                      value={formData.area}
                      onChange={(e) => handleInputChange("area", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="floor">Piano</Label>
                    <Input
                      id="floor"
                      placeholder="2"
                      value={formData.floor}
                      onChange={(e) => handleInputChange("floor", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Caratteristiche</Label>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="elevator"
                        checked={formData.elevator}
                        onCheckedChange={(checked) => handleInputChange("elevator", checked as boolean)}
                      />
                      <Label htmlFor="elevator">Ascensore</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="parking"
                        checked={formData.parking}
                        onCheckedChange={(checked) => handleInputChange("parking", checked as boolean)}
                      />
                      <Label htmlFor="parking">Posto Auto</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="garden"
                        checked={formData.garden}
                        onCheckedChange={(checked) => handleInputChange("garden", checked as boolean)}
                      />
                      <Label htmlFor="garden">Giardino</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="balcony"
                        checked={formData.balcony}
                        onCheckedChange={(checked) => handleInputChange("balcony", checked as boolean)}
                      />
                      <Label htmlFor="balcony">Balcone</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="furnished"
                        checked={formData.furnished}
                        onCheckedChange={(checked) => handleInputChange("furnished", checked as boolean)}
                      />
                      <Label htmlFor="furnished">Arredato</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Servizi Aggiuntivi</Label>
                  <div className="flex flex-wrap gap-2">
                    {availableAmenities.map((amenity) => (
                      <Badge
                        key={amenity}
                        variant={amenities.includes(amenity) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => toggleAmenity(amenity)}
                      >
                        {amenity}
                        {amenities.includes(amenity) && <X className="h-3 w-3 ml-1" />}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Financial Information */}
            <Card>
              <CardHeader>
                <CardTitle>Informazioni Economiche</CardTitle>
                <CardDescription>Imposta canone, deposito e spese</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="monthlyRent">Canone Mensile (€) *</Label>
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
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expenses">Spese Condominiali (€)</Label>
                    <Input
                      id="expenses"
                      type="number"
                      placeholder="100"
                      value={formData.expenses}
                      onChange={(e) => handleInputChange("expenses", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description and Images */}
            <Card>
              <CardHeader>
                <CardTitle>Descrizione e Immagini</CardTitle>
                <CardDescription>Aggiungi una descrizione dettagliata e le foto della proprietà</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="description">Descrizione</Label>
                  <Textarea
                    id="description"
                    placeholder="Descrivi la proprietà, i suoi punti di forza e le caratteristiche principali..."
                    rows={4}
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Note Private</Label>
                  <Textarea
                    id="notes"
                    placeholder="Note private visibili solo a te..."
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Immagini Proprietà</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Trascina le immagini qui o clicca per selezionare</p>
                    <p className="text-sm text-gray-500">Supporta JPG, PNG fino a 10MB ciascuna</p>
                    <Button variant="outline" className="mt-4 bg-transparent">
                      Seleziona Immagini
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit Buttons */}
            <div className="flex justify-end space-x-4">
              <Link href="/dashboard">
                <Button variant="outline">Annulla</Button>
              </Link>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Salvataggio..." : "Salva Proprietà"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
