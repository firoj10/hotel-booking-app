import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"



export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const city = searchParams.get("city")?.trim().toLowerCase();
    const adults = searchParams.get("adults") ? parseInt(searchParams.get("adults")!) : null;
    const children = searchParams.get("children") ? parseInt(searchParams.get("children")!) : null;
    const roomsRequested = searchParams.get("rooms") ? parseInt(searchParams.get("rooms")!) : null;

    // City missing → empty
    if (!city) return NextResponse.json({ success: true, data: [] });

    // Fetch hotels by city only first
    // let hotels = await prisma.hotel.findMany({
    //   where: { city: { equals: city, mode: "insensitive" } },
    //   include: { rooms: { include: { roomType: true } } },
    // });
    let hotels = await prisma.hotel.findMany({
      where: { city: { equals: city, mode: "insensitive" } },
      include: {
        rooms: { include: { roomType: true } },
        images: true, // ✅ add this line
      },
    });

    // Optional filter: adults, children, rooms
    if (adults !== null || children !== null || roomsRequested !== null) {
      hotels = hotels.filter((hotel) => {
        let suitableRooms = hotel.rooms;

        if (adults !== null) {
          suitableRooms = suitableRooms.filter((r) => r.roomType.capacityAdults >= adults);
        }
        if (children !== null) {
          suitableRooms = suitableRooms.filter((r) => r.roomType.capacityChildren >= children);
        }

        if (roomsRequested !== null) {
          return suitableRooms.length >= roomsRequested;
        }

        return suitableRooms.length > 0;
      });
    }

    return NextResponse.json({ success: true, data: hotels });
  } catch (err) {
    console.error("Error fetching hotels:", err);
    return NextResponse.json(
      { success: false, message: "Failed to fetch hotels" },
      { status: 500 }
    );
  }
}
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const hotel = await prisma.hotel.create({
      data: {
        name: body.name,
        address: body.address,
        city: body.city,
        country: body.country,
      },
    })

    return NextResponse.json(
      {
        success: true,
        message: "Hotel created successfully",
        data: hotel,
      },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to create hotel" },
      { status: 500 }
    )
  }
}