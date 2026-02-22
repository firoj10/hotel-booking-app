"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
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
  image?: string;
}

interface HotelCardProps {
  hotel: Hotel;
}

export default function HotelCard({ hotel }: HotelCardProps) {
  const room = hotel.rooms[0]; // first room for preview

  return (
    <div className="flex max-w-4xl border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm mb-4 font-sans">
      
      {/* Left: Hotel Image */}
      <div className="relative w-1/3 min-w-[240px]">
       <Image
  src={hotel.images[0]?.url || '/banner/hotel/placeholder.jpg'}
  alt={hotel.images[0]?.alt || hotel.name}
  width={300}
  height={200}
  className="h-full w-full object-cover"
/>
        <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
          </svg>
        </button>
      </div>

      {/* Middle: Hotel Info */}
      <div className="flex-grow p-4 border-r border-gray-100">
        <div className="flex items-center gap-2 mb-1">
          <h2 className="text-xl font-bold text-blue-600 hover:underline cursor-pointer">
            {hotel.name}
          </h2>
          <span className="text-yellow-400 text-sm">
            ★★★
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-2">
          {hotel.city}, {hotel.country} <span className="mx-1">•</span> {room ? `${room.capacityAdults} adults` : ""}
        </p>

        <span className="bg-green-800 text-white text-xs px-2 py-1 rounded font-semibold">
          Early 2026 Deal
        </span>

        {room && (
          <div className="mt-4">
            <p className="font-bold text-sm">{room.roomType.name}</p>
            <p className="text-sm text-gray-600">
              {room.roomType.capacityAdults} adults · {room.roomType.capacityChildren} children
            </p>
            <ul className="mt-2 space-y-1">
              <li className="text-green-700 text-sm flex items-center">✓ Free cancellation</li>
              <li className="text-green-700 text-sm flex items-center">✓ No prepayment needed – pay at the property</li>
            </ul>
            <p className="text-red-700 text-xs font-bold mt-2">We have {hotel.rooms.length} left at this price</p>
          </div>
        )}
      </div>

      {/* Right: Price & Button */}
      <div className="w-1/4 p-4 flex flex-col justify-between text-right">
        <div className="flex flex-col items-end">
          <span className="text-xs text-gray-500 mb-1">Review score</span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">{hotel.rooms.length} reviews</span>
            <div className="bg-blue-900 text-white font-bold p-1 rounded text-sm min-w-[32px] text-center">
              {hotel.ratingAvg.toLocaleString(1)}
            </div>
          </div>
        </div>

        {room && (
          <div className="mt-auto">
            <p className="text-xs text-gray-500">1 night, {room.roomType.capacityAdults} adults</p>
            <p className="text-red-600 line-through text-sm">
              BDT {room.roomType.basePrice.toLocaleString()}
            </p>
            <div className="flex items-center justify-end gap-1">
              <span className="text-xl font-bold">
                BDT {room.roomType.basePrice.toLocaleString()}
              </span>
            </div>
            <p className="text-xs text-gray-500 mb-3">+ taxes and fees</p>
            <Link key={hotel.id} href={`/hotels/${hotel.id}`}>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 flex items-center justify-center gap-2">
                See availability
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}