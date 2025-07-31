import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // Mock data - in a real app, fetch from database
    const properties = [
      {
        id: "660e8400-e29b-41d4-a716-446655440001",
        name: "Appartamento Via Roma",
        address: "Via Roma 123, Milano",
        propertyType: "apartment",
        rooms: 3,
        bathrooms: 2,
        area: 85,
        monthlyRent: 1200,
        status: "occupied",
        tenant: "Laura Inquilina",
      },
      {
        id: "660e8400-e29b-41d4-a716-446655440002",
        name: "Monolocale Corso Italia",
        address: "Corso Italia 45, Milano",
        propertyType: "studio",
        rooms: 1,
        bathrooms: 1,
        area: 45,
        monthlyRent: 800,
        status: "occupied",
        tenant: "Giuseppe Rossi",
      },
    ]

    return NextResponse.json({ success: true, data: properties })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Errore nel recupero delle proprietà" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const propertyData = await request.json()

    // In a real app, validate and save to database
    const newProperty = {
      id: crypto.randomUUID(),
      ...propertyData,
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      data: newProperty,
      message: "Proprietà creata con successo",
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Errore nella creazione della proprietà" }, { status: 500 })
  }
}
