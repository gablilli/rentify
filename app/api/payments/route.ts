import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const month = searchParams.get("month")

    // Mock payment data
    let payments = [
      {
        id: "1",
        tenant: "Laura Inquilina",
        property: "Via Roma 123",
        amount: 1200,
        dueDate: "2024-01-01",
        paidDate: "2024-01-01",
        status: "paid",
        type: "rent",
      },
      {
        id: "2",
        tenant: "Giuseppe Rossi",
        property: "Corso Italia 45",
        amount: 800,
        dueDate: "2024-01-01",
        paidDate: null,
        status: "overdue",
        type: "rent",
      },
      {
        id: "3",
        tenant: "Anna Bianchi",
        property: "Via Milano 78",
        amount: 1500,
        dueDate: "2024-01-15",
        paidDate: null,
        status: "pending",
        type: "rent",
      },
    ]

    // Filter by status if provided
    if (status) {
      payments = payments.filter((p) => p.status === status)
    }

    return NextResponse.json({ success: true, data: payments })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Errore nel recupero dei pagamenti" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const paymentData = await request.json()

    // In a real app, process payment and update database
    const newPayment = {
      id: crypto.randomUUID(),
      ...paymentData,
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      data: newPayment,
      message: "Pagamento registrato con successo",
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Errore nella registrazione del pagamento" }, { status: 500 })
  }
}
