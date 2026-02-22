

// app/hotels/[id]/page.tsx
import { prisma } from "@/lib/prisma";
import { FaStar } from "react-icons/fa";

import Image from "next/image";
import HotelBooking from "../components/HotelRoomsTable";
interface Room {
  id: number;
  name: string;
  description?: string | null;
  capacityAdults: number;
  capacityChildren: number;
  basePrice: number;
  createdAt: string;
}
interface HotelImage {
  id: number;        // Prisma auto-increment ID
  hotelId: number;   // Foreign key to Hotel
  url: string;       // Image URL
  alt?: string;      // Optional caption / alt text
  order?: number;    // Optional display order
  createdAt: string; // Timestamp
}

interface Hotel {
  id: number;
  name: string;
  hotelDescription: string;

  address: string;
  city: string;
  country: string;
  ratingAvg: number;
  rooms: Room[];
  images: HotelImage[];
  image?: string;
}

interface Props {
  params: Promise<{ id: string }>;
}

const HotelDetailsPage = async ({ params }: Props) => {
  const { id } = await params;
  const hotelId = parseInt(id, 10);

  if (isNaN(hotelId)) return <p className="p-6">Invalid hotel ID</p>;

  const hotel = await prisma.hotel.findUnique({
    where: { id: hotelId },
    include: {
      rooms: {
        include: {
          roomType: {
            include: {
              images: true, // Room images
            }
          }
        }
      },
      images: true // Hotel images
    }
  });
const hotelForClient = {
  ...hotel,
  ratingAvg: Number(hotel.ratingAvg),
  rooms: hotel.rooms.map(r => ({
    ...r,
    roomType: {
      ...r.roomType,
      basePrice: Number(r.roomType.basePrice),
    }
  })),
};
  if (!hotel) return <p className="p-6">Hotel not found</p>;
  console.log(hotel, "hotelhotelhotel---------")
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8 font-sans">
      {/* Hotel Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{hotel.name}</h1>
          <p className="text-gray-600">{hotel.address}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-green-100 text-green-800 px-3 py-1 rounded-md font-semibold flex items-center gap-1">
            <FaStar className="text-yellow-500" /> {hotel.ratingAvg.toFixed(1)} Very Good
          </div>
          <div className="text-gray-500">{hotel.rooms.length} rooms</div>
        </div>
      </div>
      <div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {hotel.images?.length > 0 ? (
            hotel.images?.map((img, index) => (
              <div key={img.id} className="relative w-full h-48 rounded overflow-hidden">
                <Image
                  src={img.url || '/banner/hotel/placeholder.jpg'}
                  alt={img.alt || `${hotel?.name} image ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            ))
          ) : (
            <div className="relative w-full h-48 rounded overflow-hidden">
              <Image
                src="/banner/hotel/placeholder.jpg"
                alt="Placeholder"
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>
        <p className="text-gray-600 mt-4">{hotel.hotelDescription}</p>

      </div>
      {/* Rooms Cards */}
      <div className="space-y-6">
        <p className="text-3xl font-bold text-gray-900">        Availability Rooms
        </p>

    <div className="flex gap-4">
  {/* Table 80% */}
  <div className="w-4/5">
<HotelBooking hotel={hotelForClient} />
  </div>

  {/* Chat / Info 20% */}
 
</div>
      </div>
    </div>
  );
};

export default HotelDetailsPage;