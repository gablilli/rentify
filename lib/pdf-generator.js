const PDFDocument = require("pdfkit")
const fs = require("fs")
const path = require("path")

class PDFGenerator {
  constructor() {
    this.contractsPath = process.env.CONTRACTS_PATH || path.join(process.cwd(), "data", "contracts")
  }

  async generateContract(contractData) {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({ margin: 50 })
      const filename = `contract_${contractData.id}_${Date.now()}.pdf`
      const filePath = path.join(this.contractsPath, filename)

      doc.pipe(fs.createWriteStream(filePath))

      // Header
      doc.fontSize(20).text("CONTRATTO DI LOCAZIONE", { align: "center" })
      doc.moveDown(2)

      // Property details
      doc.fontSize(14).text("DATI IMMOBILE", { underline: true })
      doc.moveDown(0.5)
      doc
        .fontSize(12)
        .text(`Indirizzo: ${contractData.property.address}`)
        .text(`Città: ${contractData.property.city} (${contractData.property.province})`)
        .text(`CAP: ${contractData.property.postalCode}`)
        .text(`Tipologia: ${contractData.property.propertyType}`)
        .text(`Superficie: ${contractData.property.area} mq`)

      doc.moveDown(1)

      // Tenant details
      doc.fontSize(14).text("DATI CONDUTTORE", { underline: true })
      doc.moveDown(0.5)
      doc
        .fontSize(12)
        .text(`Nome: ${contractData.tenant.firstName} ${contractData.tenant.lastName}`)
        .text(`Codice Fiscale: ${contractData.tenant.fiscalCode}`)
        .text(`Email: ${contractData.tenant.email}`)
        .text(`Telefono: ${contractData.tenant.phone}`)

      doc.moveDown(1)

      // Contract terms
      doc.fontSize(14).text("CONDIZIONI CONTRATTUALI", { underline: true })
      doc.moveDown(0.5)
      doc
        .fontSize(12)
        .text(`Tipo Contratto: ${contractData.contractType}`)
        .text(`Data Inizio: ${new Date(contractData.startDate).toLocaleDateString("it-IT")}`)
        .text(`Data Fine: ${new Date(contractData.endDate).toLocaleDateString("it-IT")}`)
        .text(`Canone Mensile: €${contractData.monthlyRent}`)
        .text(`Deposito Cauzionale: €${contractData.depositAmount}`)
        .text(`Spese Condominiali: €${contractData.monthlyExpenses || 0}`)

      doc.moveDown(2)

      // Terms and conditions
      doc.fontSize(14).text("CLAUSOLE GENERALI", { underline: true })
      doc.moveDown(0.5)
      doc
        .fontSize(10)
        .text("1. Il presente contratto è regolato dalle disposizioni della Legge 9 dicembre 1998, n. 431.")
        .text("2. Il conduttore si impegna a utilizzare l'immobile con la diligenza del buon padre di famiglia.")
        .text("3. È vietato subaffittare l'immobile senza il consenso scritto del locatore.")
        .text("4. Il canone dovrà essere corrisposto entro il giorno 5 di ogni mese.")
        .text(
          "5. Il deposito cauzionale verrà restituito al termine del contratto, previa verifica dello stato dell'immobile.",
        )

      doc.moveDown(3)

      // Signatures
      doc
        .fontSize(12)
        .text("Data: _______________", 50, doc.y)
        .text("Firma Locatore: _______________", 50, doc.y + 40)
        .text("Firma Conduttore: _______________", 300, doc.y - 40)

      doc.end()

      doc.on("end", () => {
        resolve({ filePath, filename })
      })

      doc.on("error", (error) => {
        reject(error)
      })
    })
  }

  async generateReceipt(paymentData) {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({ margin: 50 })
      const filename = `receipt_${paymentData.id}_${Date.now()}.pdf`
      const filePath = path.join(this.contractsPath, filename)

      doc.pipe(fs.createWriteStream(filePath))

      // Header
      doc.fontSize(18).text("RICEVUTA DI PAGAMENTO", { align: "center" })
      doc.moveDown(2)

      // Receipt details
      doc
        .fontSize(12)
        .text(`Numero Ricevuta: ${paymentData.id}`)
        .text(`Data: ${new Date().toLocaleDateString("it-IT")}`)
        .text(`Importo: €${paymentData.amount}`)
        .text(`Causale: ${paymentData.paymentType === "rent" ? "Canone di locazione" : "Altro"}`)
        .text(`Periodo: ${paymentData.period || "N/A"}`)
        .text(`Metodo di Pagamento: ${paymentData.paymentMethod || "N/A"}`)

      doc.moveDown(2)

      // Property and tenant info
      doc
        .text(`Immobile: ${paymentData.property?.address || "N/A"}`)
        .text(`Inquilino: ${paymentData.tenant?.firstName} ${paymentData.tenant?.lastName}`)

      doc.moveDown(3)
      doc.text("Firma: _______________", { align: "right" })

      doc.end()

      doc.on("end", () => {
        resolve({ filePath, filename })
      })

      doc.on("error", (error) => {
        reject(error)
      })
    })
  }
}

module.exports = new PDFGenerator()
