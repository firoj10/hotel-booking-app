// app/hotels/[id]/page.tsx
import { prisma } from "@/lib/prisma"; // path adjust করো
import Image from "next/image";
import { FaStar } from "react-icons/fa";

interface SingleCoursePageProps {
  params: Promise<{ id: string }>;
}
// export default async function HotelDetailsPage({ params }: { params: { id: string } }) {
   const HotelDetailsPage = async (props: SingleCoursePageProps) => {

   const { id } = await props.params;

  const hotelId = parseInt(id);
  console.log("params.id:", id, "hotelId:", hotelId);

  if (isNaN(hotelId)) return <p className="p-6">Invalid hotel ID</p>;

  const hotel = await prisma.hotel.findUnique({
    where: { id: hotelId },
    include: { rooms: { include: { roomType: true } } },
  });

  if (!hotel) return <p className="p-6">Hotel not found</p>;



  console.log(hotel,"hotelhotelhotelhotel")
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8 font-sans">
      {/* Hotel Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{hotel.name}</h1>
          <p className="text-gray-600">{hotel.address}</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-green-100 text-green-800 px-3 py-1 rounded-md font-semibold">
            {hotel.ratingAvg.toFixed(1)} Very Good
          </div>
          <div className="text-gray-500">{hotel.rooms.length} rooms</div>
        </div>
      </div>

      {/* Rooms & Pricing */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Rooms & Pricing</h2>
        <div className="space-y-4">
          {hotel.rooms.map((room) => (
            <div
              key={room.id}
              className="flex flex-col md:flex-row items-center justify-between p-4 border rounded-lg shadow hover:shadow-lg transition"
            >
              <div className="flex items-center space-x-4">
                <Image
                  src="/hotel-placeholder.jpg"
                  alt={room.roomType.name}
                  width={150}
                  height={100}
                  className="w-32 h-20 object-cover rounded-md"
                />
                <div>
                  <h3 className="text-lg font-semibold">{room.roomType.name}</h3>
                  <p className="text-gray-600 text-sm">
                    {room.roomType.capacityAdults} adults · {room.roomType.capacityChildren} children
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-green-600">
                  BDT {room.roomType.basePrice.toLocaleString()}
                </p>
                <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Select Room
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default HotelDetailsPage;