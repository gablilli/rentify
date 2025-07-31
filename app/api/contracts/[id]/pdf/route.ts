import { type NextRequest, NextResponse } from "next/server"
import PDFDocument from "pdfkit"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const contractId = params.id

    // In un'applicazione reale, recupereresti i dati del contratto dal database
    const contractData = {
      id: contractId,
      tenant: {
        firstName: "Mario",
        lastName: "Rossi",
        fiscalCode: "RSSMRA80A01H501Z",
        email: "mario.rossi@email.com",
        phone: "+39 123 456 7890",
        address: "Via Verdi 456, Milano",
      },
      property: {
        address: "Via Roma 123",
        city: "Milano",
        province: "MI",
        postalCode: "20100",
        propertyType: "Appartamento",
        area: "85",
      },
      contractType: "Libero",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      monthlyRent: 850,
      depositAmount: 1700,
      monthlyExpenses: 150,
    }

    // Crea un nuovo documento PDF
    const doc = new PDFDocument({ margin: 50 })
    const chunks: Buffer[] = []

    doc.on("data", (chunk) => chunks.push(chunk))

    const pdfPromise = new Promise<Buffer>((resolve) => {
      doc.on("end", () => resolve(Buffer.concat(chunks)))
    })

    // Header del contratto
    doc.fontSize(20).text("CONTRATTO DI LOCAZIONE", { align: "center" })
    doc.moveDown(2)

    // Informazioni proprietà
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

    // Informazioni inquilino
    doc.fontSize(14).text("DATI CONDUTTORE", { underline: true })
    doc.moveDown(0.5)
    doc
      .fontSize(12)
      .text(`Nome: ${contractData.tenant.firstName} ${contractData.tenant.lastName}`)
      .text(`Codice Fiscale: ${contractData.tenant.fiscalCode}`)
      .text(`Email: ${contractData.tenant.email}`)
      .text(`Telefono: ${contractData.tenant.phone}`)
      .text(`Indirizzo: ${contractData.tenant.address}`)

    doc.moveDown(1)

    // Condizioni contrattuali
    doc.fontSize(14).text("CONDIZIONI CONTRATTUALI", { underline: true })
    doc.moveDown(0.5)
    doc
      .fontSize(12)
      .text(`Tipo Contratto: ${contractData.contractType}`)
      .text(`Data Inizio: ${new Date(contractData.startDate).toLocaleDateString("it-IT")}`)
      .text(`Data Fine: ${new Date(contractData.endDate).toLocaleDateString("it-IT")}`)
      .text(`Canone Mensile: €${contractData.monthlyRent}`)
      .text(`Deposito Cauzionale: €${contractData.depositAmount}`)
      .text(`Spese Condominiali: €${contractData.monthlyExpenses}`)

    doc.moveDown(2)

    // Clausole generali
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
      .text("6. Eventuali modifiche al presente contratto dovranno essere concordate per iscritto.")
      .text("7. Per controversie è competente il Foro di Milano.")

    doc.moveDown(3)

    // Firme
    doc
      .fontSize(12)
      .text(`Data: ${new Date().toLocaleDateString("it-IT")}`, 50, doc.y)
      .text("Firma Locatore: _______________", 50, doc.y + 40)
      .text("Firma Conduttore: _______________", 300, doc.y - 40)

    // Finalizza il documento
    doc.end()

    const pdfBuffer = await pdfPromise

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="contratto_${contractId}.pdf"`,
      },
    })
  } catch (error) {
    console.error("Errore nella generazione del PDF:", error)
    return NextResponse.json({ error: "Errore nella generazione del PDF" }, { status: 500 })
  }
}
