"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building2, Mail, Database, FileText, Shield, Save } from "lucide-react"
import Link from "next/link"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    // General Settings
    companyName: "Rentify",
    companyEmail: "admin@rentify.com",
    companyPhone: "+39 123 456 7890",
    companyAddress: "Via Roma 123, Milano",

    // Email Settings
    smtpHost: "smtp.gmail.com",
    smtpPort: "587",
    smtpUser: "",
    smtpPassword: "",
    smtpSecure: true,

    // Notification Settings
    emailNotifications: true,
    rentReminders: true,
    contractExpiry: true,
    maintenanceAlerts: true,

    // System Settings
    currency: "EUR",
    dateFormat: "DD/MM/YYYY",
    timezone: "Europe/Rome",
    language: "it",

    // Backup Settings
    autoBackup: true,
    backupFrequency: "daily",
    backupRetention: "30",
  })

  const handleSave = async () => {
    try {
      const response = await fetch("/api/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      })

      if (response.ok) {
        alert("Impostazioni salvate con successo!")
      } else {
        alert("Errore nel salvataggio delle impostazioni")
      }
    } catch (error) {
      alert("Errore di connessione")
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
              <span className="text-gray-600">Impostazioni</span>
            </div>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Salva Impostazioni
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Impostazioni</h1>
          <p className="text-gray-600">Configura il tuo sistema di gestione affitti</p>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="general">Generali</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="notifications">Notifiche</TabsTrigger>
            <TabsTrigger value="system">Sistema</TabsTrigger>
            <TabsTrigger value="backup">Backup</TabsTrigger>
            <TabsTrigger value="security">Sicurezza</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>Impostazioni Generali</CardTitle>
                <CardDescription>Configura le informazioni base della tua azienda</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="companyName">Nome Azienda</Label>
                    <Input
                      id="companyName"
                      value={settings.companyName}
                      onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="companyEmail">Email Azienda</Label>
                    <Input
                      id="companyEmail"
                      type="email"
                      value={settings.companyEmail}
                      onChange={(e) => setSettings({ ...settings, companyEmail: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="companyPhone">Telefono</Label>
                    <Input
                      id="companyPhone"
                      value={settings.companyPhone}
                      onChange={(e) => setSettings({ ...settings, companyPhone: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="currency">Valuta</Label>
                    <Select
                      value={settings.currency}
                      onValueChange={(value) => setSettings({ ...settings, currency: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="EUR">Euro (€)</SelectItem>
                        <SelectItem value="USD">Dollaro ($)</SelectItem>
                        <SelectItem value="GBP">Sterlina (£)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="companyAddress">Indirizzo Azienda</Label>
                  <Input
                    id="companyAddress"
                    value={settings.companyAddress}
                    onChange={(e) => setSettings({ ...settings, companyAddress: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="email">
            <Card>
              <CardHeader>
                <CardTitle>Configurazione Email</CardTitle>
                <CardDescription>Configura il server SMTP per l'invio automatico delle email</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="smtpHost">Server SMTP</Label>
                    <Input
                      id="smtpHost"
                      value={settings.smtpHost}
                      onChange={(e) => setSettings({ ...settings, smtpHost: e.target.value })}
                      placeholder="smtp.gmail.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="smtpPort">Porta</Label>
                    <Input
                      id="smtpPort"
                      value={settings.smtpPort}
                      onChange={(e) => setSettings({ ...settings, smtpPort: e.target.value })}
                      placeholder="587"
                    />
                  </div>
                  <div>
                    <Label htmlFor="smtpUser">Username</Label>
                    <Input
                      id="smtpUser"
                      value={settings.smtpUser}
                      onChange={(e) => setSettings({ ...settings, smtpUser: e.target.value })}
                      placeholder="your-email@gmail.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="smtpPassword">Password</Label>
                    <Input
                      id="smtpPassword"
                      type="password"
                      value={settings.smtpPassword}
                      onChange={(e) => setSettings({ ...settings, smtpPassword: e.target.value })}
                      placeholder="App Password"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="smtpSecure"
                    checked={settings.smtpSecure}
                    onCheckedChange={(checked) => setSettings({ ...settings, smtpSecure: checked as boolean })}
                  />
                  <Label htmlFor="smtpSecure">Usa connessione sicura (TLS)</Label>
                </div>
                <Button variant="outline">
                  <Mail className="h-4 w-4 mr-2" />
                  Testa Configurazione Email
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notifiche</CardTitle>
                <CardDescription>Configura quando ricevere notifiche automatiche</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="emailNotifications"
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) =>
                        setSettings({ ...settings, emailNotifications: checked as boolean })
                      }
                    />
                    <Label htmlFor="emailNotifications">Abilita notifiche email</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="rentReminders"
                      checked={settings.rentReminders}
                      onCheckedChange={(checked) => setSettings({ ...settings, rentReminders: checked as boolean })}
                    />
                    <Label htmlFor="rentReminders">Promemoria pagamenti affitto</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="contractExpiry"
                      checked={settings.contractExpiry}
                      onCheckedChange={(checked) => setSettings({ ...settings, contractExpiry: checked as boolean })}
                    />
                    <Label htmlFor="contractExpiry">Scadenza contratti</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="maintenanceAlerts"
                      checked={settings.maintenanceAlerts}
                      onCheckedChange={(checked) => setSettings({ ...settings, maintenanceAlerts: checked as boolean })}
                    />
                    <Label htmlFor="maintenanceAlerts">Richieste di manutenzione</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system">
            <Card>
              <CardHeader>
                <CardTitle>Impostazioni Sistema</CardTitle>
                <CardDescription>Configura formato data, fuso orario e lingua</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dateFormat">Formato Data</Label>
                    <Select
                      value={settings.dateFormat}
                      onValueChange={(value) => setSettings({ ...settings, dateFormat: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="timezone">Fuso Orario</Label>
                    <Select
                      value={settings.timezone}
                      onValueChange={(value) => setSettings({ ...settings, timezone: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Europe/Rome">Europa/Roma</SelectItem>
                        <SelectItem value="Europe/London">Europa/Londra</SelectItem>
                        <SelectItem value="America/New_York">America/New York</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="language">Lingua</Label>
                    <Select
                      value={settings.language}
                      onValueChange={(value) => setSettings({ ...settings, language: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="it">Italiano</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="backup">
            <Card>
              <CardHeader>
                <CardTitle>Backup Automatico</CardTitle>
                <CardDescription>Configura i backup automatici del database</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="autoBackup"
                    checked={settings.autoBackup}
                    onCheckedChange={(checked) => setSettings({ ...settings, autoBackup: checked as boolean })}
                  />
                  <Label htmlFor="autoBackup">Abilita backup automatico</Label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="backupFrequency">Frequenza Backup</Label>
                    <Select
                      value={settings.backupFrequency}
                      onValueChange={(value) => setSettings({ ...settings, backupFrequency: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Giornaliero</SelectItem>
                        <SelectItem value="weekly">Settimanale</SelectItem>
                        <SelectItem value="monthly">Mensile</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="backupRetention">Conserva per (giorni)</Label>
                    <Input
                      id="backupRetention"
                      type="number"
                      value={settings.backupRetention}
                      onChange={(e) => setSettings({ ...settings, backupRetention: e.target.value })}
                    />
                  </div>
                </div>
                <Button variant="outline">
                  <Database className="h-4 w-4 mr-2" />
                  Esegui Backup Manuale
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Sicurezza</CardTitle>
                <CardDescription>Gestisci le impostazioni di sicurezza del sistema</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Shield className="h-4 w-4 mr-2" />
                    Cambia Password Amministratore
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <FileText className="h-4 w-4 mr-2" />
                    Visualizza Log di Accesso
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Database className="h-4 w-4 mr-2" />
                    Esporta Dati Sistema
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
