import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: List all hotels
export async function GET() {
  try {
    const hotels = await prisma.hotel.findMany({
      include: {
        roomTypes: {
          include: { rooms: true, images: true },
        },
        images: true,
      },
    });

    return NextResponse.json({ success: true, data: hotels });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to fetch hotels" }, { status: 500 });
  }
}

// POST: Create hotel with nested room types and rooms
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const hotel = await prisma.hotel.create({
      data: {
        name: body.name,
        hotelDescription: body.hotelDescription,
        address: body.address,
        city: body.city,
        country: body.country,
        ratingAvg: 0,
        images: {
          create: body.images?.map((img: any) => ({ url: img.url, alt: img.alt })) || [],
        },
        roomTypes: {
          create: body.roomTypes?.map((rt: any) => ({
            name: rt.name,
            description: rt.description,
            capacityAdults: rt.capacityAdults,
            capacityChildren: rt.capacityChildren,
            basePrice: rt.basePrice,
            images: {
              create: rt.images?.map((img: any) => ({ url: img.url, alt: img.alt })) || [],
            },
            rooms: {
              create: rt.rooms?.map((room: any) => ({
                roomNumber: room.roomNumber,
                floor: room.floor,
                status: "available",
              })),
            },
          })) || [],
        },
      },
    });

    return NextResponse.json({ success: true, data: hotel }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Failed to create hotel" }, { status: 500 });
  }
}