import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

interface Params {
  params: {
    id: string
  }
}

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const hotel = await prisma.hotel.findUnique({
      where: { id: Number(params.id) },
      include: {
        rooms: {
          include: {
            roomType: true,
          },
        },
      },
    })

    if (!hotel) {
      return NextResponse.json(
        { success: false, message: "Hotel not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: hotel,
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch hotel" },
      { status: 500 }
    )
  }
}

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const body = await req.json()

    const updated = await prisma.hotel.update({
      where: { id: Number(params.id) },
      data: body,
    })

    return NextResponse.json({
      success: true,
      message: "Hotel updated successfully",
      data: updated,
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Update failed" },
      { status: 500 }
    )
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    await prisma.hotel.delete({
      where: { id: Number(params.id) },
    })

    return NextResponse.json({
      success: true,
      message: "Hotel deleted successfully",
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Delete failed" },
      { status: 500 }
    )
  }
}