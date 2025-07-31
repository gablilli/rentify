const fs = require("fs").promises
const path = require("path")
const bcrypt = require("bcryptjs")
const database = require("../lib/database")

async function setup() {
  console.log("🚀 Setting up Rentify Self-Hosted...")

  try {
    // Connect to database
    await database.connect()

    // Create admin user
    const adminEmail = process.env.ADMIN_EMAIL || "admin@rental-manager.local"
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123"
    const hashedPassword = await bcrypt.hash(adminPassword, 10)

    // Check if admin already exists
    const existingAdmin = await database.query("SELECT id FROM users WHERE email = ?", [adminEmail])

    if (existingAdmin.length === 0) {
      await database.run(
        `
        INSERT INTO users (id, email, password_hash, first_name, last_name, user_type)
        VALUES (?, ?, ?, ?, ?, ?)
      `,
        [`admin_${Date.now()}`, adminEmail, hashedPassword, "Admin", "User", "admin"],
      )
      console.log("✅ Admin user created")
      console.log(`   Email: ${adminEmail}`)
      console.log(`   Password: ${adminPassword}`)
    } else {
      console.log("ℹ️  Admin user already exists")
    }

    // Create default settings
    const defaultSettings = [
      { key: "app_name", value: "Rentify", description: "Application name" },
      { key: "currency", value: "EUR", description: "Default currency" },
      { key: "date_format", value: "DD/MM/YYYY", description: "Date format" },
      { key: "rent_due_day", value: "1", description: "Default rent due day of month" },
      { key: "late_fee_days", value: "5", description: "Days before late fee applies" },
      { key: "late_fee_amount", value: "50", description: "Late fee amount" },
      { key: "backup_enabled", value: "true", description: "Enable automatic backups" },
      { key: "email_notifications", value: "true", description: "Enable email notifications" },
    ]

    for (const setting of defaultSettings) {
      const existing = await database.query("SELECT key FROM settings WHERE key = ?", [setting.key])
      if (existing.length === 0) {
        await database.run("INSERT INTO settings (key, value, description) VALUES (?, ?, ?)", [
          setting.key,
          setting.value,
          setting.description,
        ])
      }
    }
    console.log("✅ Default settings created")

    // Create email templates directory
    const templatesDir = path.join(process.cwd(), "templates", "email")
    await fs.mkdir(templatesDir, { recursive: true })

    // Create default email templates
    const rentReminderTemplate = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Promemoria Pagamento Affitto</title>
</head>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <div style="background-color: #f8f9fa; padding: 20px; text-align: center;">
        <h1 style="color: #2563eb; margin: 0;">Rentify</h1>
    </div>
    
    <div style="padding: 30px 20px;">
        <h2 style="color: #1f2937;">Gentile {{tenantName}},</h2>
        
        <p style="font-size: 16px; line-height: 1.6; color: #4b5563;">
            Le ricordiamo che il pagamento dell'affitto per la proprietà situata in 
            <strong>{{propertyAddress}}</strong> è in scadenza.
        </p>
        
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin: 0 0 10px 0; color: #1f2937;">Dettagli Pagamento</h3>
            <p style="margin: 5px 0; color: #4b5563;"><strong>Importo:</strong> €{{amount}}</p>
            <p style="margin: 5px 0; color: #4b5563;"><strong>Scadenza:</strong> {{dueDate}}</p>
            <p style="margin: 5px 0; color: #4b5563;"><strong>Proprietà:</strong> {{propertyAddress}}</p>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
            <a href="{{paymentLink}}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
                Effettua il Pagamento
            </a>
        </div>
        
        <p style="font-size: 14px; color: #6b7280;">
            Se ha già effettuato il pagamento, può ignorare questo messaggio.
        </p>
        
        <p style="font-size: 14px; color: #6b7280;">
            Cordiali saluti,<br>
            Il Team di Rentify
        </p>
    </div>
    
    <div style="background-color: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #6b7280;">
        <p>Questa è una comunicazione automatica. Si prega di non rispondere a questa email.</p>
    </div>
</body>
</html>
    `

    await fs.writeFile(path.join(templatesDir, "rent-reminder.html"), rentReminderTemplate)
    console.log("✅ Email templates created")

    console.log("\n🎉 Setup completed successfully!")
    console.log("\n📋 Next steps:")
    console.log("1. Start the application: npm start")
    console.log("2. Open http://localhost:3000 in your browser")
    console.log(`3. Login with: ${adminEmail} / ${adminPassword}`)
    console.log("4. Configure SMTP settings for email notifications")
    console.log("5. Add your first property and tenant")
  } catch (error) {
    console.error("❌ Setup failed:", error)
    process.exit(1)
  } finally {
    await database.close()
  }
}

setup()
