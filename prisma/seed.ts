import { PrismaClient } from "@prisma/client";
import { addDays } from "date-fns";

const prisma = new PrismaClient();

async function main() {
  const hotelsData = [
    {
      name: "Hotel Shuktara Dhaka",
      address: "20/A Indira Road, Sher-e-Bangla Nagar, Dhaka",
      city: "Dhaka",
      country: "Bangladesh",
      ratingAvg: 8.1,
      rooms: [
        { number: "101", floor: 1, typeName: "Superior Twin Room", adults: 2, children: 0, basePrice: 4021 },
        { number: "102", floor: 1, typeName: "Superior King Room", adults: 2, children: 0, basePrice: 4021 },
        { number: "201", floor: 2, typeName: "Deluxe King Room", adults: 2, children: 0, basePrice: 4682 },
      ],
    },
    {
      name: "Hotel Sunrise Gulshan",
      address: "45 Gulshan Avenue, Dhaka",
      city: "Dhaka",
      country: "Bangladesh",
      ratingAvg: 8.5,
      rooms: [
        { number: "101", floor: 1, typeName: "Standard Single Room", adults: 1, children: 0, basePrice: 3140 },
        { number: "102", floor: 1, typeName: "Executive Double Room", adults: 2, children: 0, basePrice: 4820 },
        { number: "201", floor: 2, typeName: "Deluxe Suite", adults: 3, children: 1, basePrice: 6610 },
      ],
    },
    {
      name: "Hotel Riverside Dhaka",
      address: "River Road, Dhaka",
      city: "Dhaka",
      country: "Bangladesh",
      ratingAvg: 8.3,
      rooms: [
        { number: "101", floor: 1, typeName: "Superior King Room", adults: 2, children: 0, basePrice: 4021 },
        { number: "102", floor: 1, typeName: "Deluxe Twin Room", adults: 2, children: 0, basePrice: 4682 },
        { number: "201", floor: 2, typeName: "Executive Triple Room", adults: 3, children: 1, basePrice: 6610 },
        { number: "202", floor: 2, typeName: "Standard Single Room", adults: 1, children: 0, basePrice: 3140 },
      ],
    },
  ];

  for (const hotelData of hotelsData) {
    // 1️⃣ Create Hotel
    const hotel = await prisma.hotel.create({
      data: {
        name: hotelData.name,
        address: hotelData.address,
        city: hotelData.city,
        country: hotelData.country,
        ratingAvg: hotelData.ratingAvg,
      },
    });

    // 2️⃣ Create RoomTypes first (unique per hotel)
    const roomTypesMap: Record<string, any> = {};
    for (const room of hotelData.rooms) {
      if (!roomTypesMap[room.typeName]) {
        const roomType = await prisma.roomType.create({
          data: {
            hotelId: hotel.id,
            name: room.typeName,
            capacityAdults: room.adults,
            capacityChildren: room.children,
            basePrice: room.basePrice,
          },
        });
        roomTypesMap[room.typeName] = roomType;
      }
    }

    // 3️⃣ Create Rooms + RoomAvailability (30 days)
    for (const room of hotelData.rooms) {
      const createdRoom = await prisma.room.create({
        data: {
          hotelId: hotel.id,
          roomTypeId: roomTypesMap[room.typeName].id,
          roomNumber: room.number,
          floor: room.floor,
          status: "available",
        },
      });

      const availabilities = Array.from({ length: 30 }).map((_, i) => ({
        roomId: createdRoom.id,
        date: addDays(new Date(), i),
        isAvailable: true,
      }));

      await prisma.roomAvailability.createMany({ data: availabilities });
    }

    console.log(`✅ Hotel seeded: ${hotel.name}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });