const nodemailer = require("nodemailer")
const fs = require("fs").promises
const path = require("path")

class EmailService {
  constructor() {
    this.transporter = null
    this.init()
  }

  async init() {
    // Create SMTP transporter
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "localhost",
      port: Number.parseInt(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
      auth: process.env.SMTP_USER
        ? {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          }
        : undefined,
      // For development with MailHog
      ignoreTLS: process.env.NODE_ENV === "development",
      requireTLS: false,
    })

    // Verify connection
    try {
      await this.transporter.verify()
      console.log("SMTP server connection established")
    } catch (error) {
      console.warn("SMTP server connection failed:", error.message)
    }
  }

  async sendRentReminder(tenantEmail, data) {
    const template = await this.loadTemplate("rent-reminder", data)

    const mailOptions = {
      from: process.env.SMTP_FROM || "noreply@rental-manager.local",
      to: tenantEmail,
      subject: `Promemoria Pagamento Affitto - ${data.propertyAddress}`,
      html: template,
    }

    return this.sendEmail(mailOptions)
  }

  async sendContractNotification(tenantEmail, data) {
    const template = await this.loadTemplate("contract-notification", data)

    const mailOptions = {
      from: process.env.SMTP_FROM || "noreply@rental-manager.local",
      to: tenantEmail,
      subject: `Nuovo Contratto di Locazione - ${data.propertyAddress}`,
      html: template,
    }

    return this.sendEmail(mailOptions)
  }

  async sendMaintenanceNotification(email, data) {
    const template = await this.loadTemplate("maintenance-notification", data)

    const mailOptions = {
      from: process.env.SMTP_FROM || "noreply@rental-manager.local",
      to: email,
      subject: `Richiesta Manutenzione - ${data.propertyAddress}`,
      html: template,
    }

    return this.sendEmail(mailOptions)
  }

  async sendEmail(mailOptions) {
    try {
      const info = await this.transporter.sendMail(mailOptions)
      console.log("Email sent:", info.messageId)
      return { success: true, messageId: info.messageId }
    } catch (error) {
      console.error("Email sending failed:", error)
      return { success: false, error: error.message }
    }
  }

  async loadTemplate(templateName, data) {
    try {
      const templatePath = path.join(process.cwd(), "templates", "email", `${templateName}.html`)
      let template = await fs.readFile(templatePath, "utf8")

      // Simple template replacement
      Object.keys(data).forEach((key) => {
        const regex = new RegExp(`{{${key}}}`, "g")
        template = template.replace(regex, data[key])
      })

      return template
    } catch (error) {
      console.error("Template loading failed:", error)
      return this.getDefaultTemplate(templateName, data)
    }
  }

  getDefaultTemplate(templateName, data) {
    switch (templateName) {
      case "rent-reminder":
        return `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Promemoria Pagamento Affitto</h2>
            <p>Gentile ${data.tenantName},</p>
            <p>Le ricordiamo che il pagamento dell'affitto per la proprietà <strong>${data.propertyAddress}</strong> è in scadenza.</p>
            <div style="background: #f5f5f5; padding: 15px; margin: 20px 0;">
              <p><strong>Importo:</strong> €${data.amount}</p>
              <p><strong>Scadenza:</strong> ${data.dueDate}</p>
            </div>
            <p>Cordiali saluti,<br>Rentify</p>
          </div>
        `
      default:
        return `<p>Notifica da Rentify</p>`
    }
  }
}

module.exports = new EmailService()
