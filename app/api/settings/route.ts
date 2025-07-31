import { type NextRequest, NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"

export async function GET() {
  try {
    const configPath = path.join(process.cwd(), "config", "settings.json")

    try {
      const data = await fs.readFile(configPath, "utf8")
      const settings = JSON.parse(data)
      return NextResponse.json(settings)
    } catch (error) {
      // Se il file non esiste, restituisci le impostazioni di default
      const defaultSettings = {
        companyName: "Rentify",
        companyEmail: "admin@rentify.com",
        companyPhone: "+39 123 456 7890",
        companyAddress: "Via Roma 123, Milano",
        smtpHost: "smtp.gmail.com",
        smtpPort: "587",
        smtpUser: "",
        smtpPassword: "",
        smtpSecure: true,
        emailNotifications: true,
        rentReminders: true,
        contractExpiry: true,
        maintenanceAlerts: true,
        currency: "EUR",
        dateFormat: "DD/MM/YYYY",
        timezone: "Europe/Rome",
        language: "it",
        autoBackup: true,
        backupFrequency: "daily",
        backupRetention: "30",
      }
      return NextResponse.json(defaultSettings)
    }
  } catch (error) {
    return NextResponse.json({ error: "Errore nel caricamento delle impostazioni" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const settings = await request.json()

    // Crea la directory config se non esiste
    const configDir = path.join(process.cwd(), "config")
    try {
      await fs.access(configDir)
    } catch {
      await fs.mkdir(configDir, { recursive: true })
    }

    // Salva le impostazioni
    const configPath = path.join(configDir, "settings.json")
    await fs.writeFile(configPath, JSON.stringify(settings, null, 2))

    return NextResponse.json({ success: true, message: "Impostazioni salvate con successo" })
  } catch (error) {
    return NextResponse.json({ error: "Errore nel salvataggio delle impostazioni" }, { status: 500 })
  }
}
