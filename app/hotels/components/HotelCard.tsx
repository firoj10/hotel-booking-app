"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface RoomType {
  name: string;
  capacityAdults: number;
  capacityChildren: number;
  basePrice: number;
}

interface Room {
  id: number;
  roomNumber: string;
  floor: number;
  roomType: RoomType;
}

interface Hotel {
  id: number;
  name: string;
  address: string;
  city: string;
  country: string;
  ratingAvg: number;
  rooms: Room[];
  image?: string; // optional
}

interface HotelCardProps {
  hotel: Hotel;
}

export default function HotelCard({ hotel }: HotelCardProps) {
  const router = useRouter();
  const room = hotel.rooms[0];

  return (
    <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-xl overflow-hidden max-w-4xl mx-auto">
      {/* Left: Image */}
      <div className="relative w-full md:w-1/3 h-64 md:h-auto">
        <Image
          src={hotel.image || "/hotel-placeholder.jpg"}
          alt={hotel.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Right: Info */}
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold text-primary mb-1">{hotel.name}</h2>
          <p className="text-gray-700 mb-2">{hotel.city}, {hotel.country}</p>

          <div className="flex items-center gap-2 mb-2">
            <span className="flex items-center text-yellow-500">
              <FaStar className="mr-1" /> {Number(hotel.ratingAvg).toFixed(1)}
            </span>
            <span className="text-gray-600 text-sm">
              {Number(hotel.ratingAvg) >= 8 ? "Very Good" : "Good"}
            </span>
          </div>

          {room && (
            <>
              <p className="text-gray-700 mb-2 font-medium">{room.roomType.name}</p>
              <p className="text-gray-600 text-sm mb-1">
                {room.roomType.capacityAdults} adults, {room.roomType.capacityChildren} children
              </p>
              <p className="text-gray-600 text-sm mb-1">Free cancellation</p>
            </>
          )}
        </div>

        {/* Pricing & Button */}
        {room && (
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-4">
            <div className="flex flex-col">
              <span className="text-xl font-bold text-black mb-1">
                BDT {room.roomType.basePrice.toLocaleString()}
              </span>
            </div>
       <Link key={hotel.id} href={`/hotels/${hotel.id}`}>

              <Button
                className="bg-primary text-white mt-3 md:mt-0 px-6 h-12"

              >
                See availability
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}