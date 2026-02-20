// app/hotel/[id]/page.jsx (Next.js 13 App Router example)

import Image from "next/image";

const hotelData = {
  name: "Hotel Shuktara Dhaka",
  address: "20/A Indira Road, beside Tejgaon College, Sher-e-Bangla Nagar, 1215 Dhaka, Bangladesh",
  rating: 8.1,
  reviewsCount: 1114,
  images: [
    "/images/room1.jpg",
    "/images/lobby.jpg",
    "/images/bathroom.jpg",
    "/images/dining.jpg",
  ],
  amenities: [
    { icon: "wifi", name: "Free Wifi" },
    { icon: "shuttle", name: "Airport Shuttle" },
    { icon: "nosmoke", name: "Non-smoking rooms" },
    { icon: "family", name: "Family rooms" },
  ],
  rooms: [
    {
      name: "Superior Twin Room",
      beds: "2 twin beds",
      size: "19 m²",
      priceOriginal: 8935,
      priceCurrent: 4021,
      image: "/images/superior-twin.jpg",
      features: "Air conditioning · Free Wifi · Attached bathroom",
    },
    {
      name: "Superior King Room",
      beds: "1 king bed",
      size: "19 m²",
      priceOriginal: 8935,
      priceCurrent: 4021,
      image: "/images/superior-king.jpg",
      features: "Air conditioning · Free Wifi · Attached bathroom",
    },
  ],
  reviews: [
    {
      name: "Abdirahman, Malaysia",
      text: "The staff, the room service, free breakfast, and the bed was unbelievable.",
    },
    {
      name: "Rev, Myanmar",
      text: "Breakfast was superb. Location is also great. I'd love to stay again.",
    },
  ],
};

export default function HotelPage() {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8 font-sans">

      {/* Hotel Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{hotelData.name}</h1>
          <p className="text-gray-600">{hotelData.address}</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-green-100 text-green-800 px-3 py-1 rounded-md font-semibold">
            {hotelData.rating} Very Good
          </div>
          <div className="text-gray-500">{hotelData.reviewsCount} reviews</div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {hotelData.images.map((img, i) => (
          <Image
            key={i}
            src={img}
            alt={`Hotel Image ${i + 1}`}
            width={400}
            height={300}
            className="w-full h-48 object-cover rounded-lg shadow-md"
          />
        ))}
      </div>

      {/* Description */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">About this property</h2>
        <p className="text-gray-700">
          Hotel Shuktara Dhaka offers family rooms with air-conditioning, private bathrooms, and modern amenities. Enjoy a restaurant serving Chinese, Indian, American, and local cuisines, as well as facilities like a fitness center, terrace, and free parking.
        </p>

        {/* Amenities */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-700 mt-4">
          {hotelData.amenities.map((item, i) => (
            <div key={i} className="flex items-center space-x-2">
              {/* Simple placeholder icon */}
              <span className="w-5 h-5 bg-blue-500 rounded-full"></span>
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Rooms & Pricing */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Rooms & Pricing</h2>
        <div className="space-y-4">
          {hotelData.rooms.map((room, i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row items-center justify-between p-4 border rounded-lg shadow hover:shadow-lg transition"
            >
              <div className="flex items-center space-x-4">
                <Image
                  src={room.image}
                  alt={room.name}
                  width={150}
                  height={100}
                  className="w-32 h-20 object-cover rounded-md"
                />
                <div>
                  <h3 className="text-lg font-semibold">{room.name}</h3>
                  <p className="text-gray-600">{room.beds} · {room.size} · {room.features}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-gray-500 line-through">BDT {room.priceOriginal}</p>
                <p className="text-xl font-bold text-green-600">BDT {room.priceCurrent}</p>
                <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Select Room
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Guest Reviews */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Guest Reviews</h2>
        <div className="space-y-4">
          {hotelData.reviews.map((rev, i) => (
            <div key={i} className="border p-4 rounded shadow-sm">
              <p className="text-gray-700 italic">“{rev.text}”</p>
              <p className="text-gray-900 font-semibold mt-2">— {rev.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Map Section */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Location</h2>
        <iframe
          src="https://www.google.com/maps?q=Hotel+Shuktara+Dhaka&output=embed"
          className="w-full h-64 rounded-lg shadow-md"
          loading="lazy"
        ></iframe>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-8">
        <button className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition">
          Reserve Now
        </button>
      </div>
    </div>
  );
}