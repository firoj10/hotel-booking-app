"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

export default function HotelCard() {
  return (
    <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-xl overflow-hidden max-w-4xl mx-auto">
      
      {/* Left: Hotel Image */}
      <div className="relative w-full md:w-1/3 h-64 md:h-auto">
        <Image
          src="/hotel-omni.jpg" // Replace with actual image path
          alt="Hotel Omni Residency Dhaka"
          fill
          className="object-cover"
        />
      </div>

      {/* Right: Info Section */}
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          {/* Title */}
          <h2 className="text-2xl font-bold text-primary mb-1">
            Hotel Omni Residency Dhaka
          </h2>

          {/* Location & Tags */}
          <p className="text-gray-700 mb-2">
            Gulshan, Dhaka (Banani) • 7.7 km from downtown • Adults only
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-2">
            <span className="flex items-center text-yellow-500">
              <FaStar className="mr-1" /> 8.0
            </span>
            <span className="text-gray-600 text-sm">Very Good</span>
            <span className="text-gray-500 text-sm">(294 reviews)</span>
          </div>

          {/* Room Info */}
          <p className="text-gray-700 mb-2 font-medium">Deluxe Room</p>
          <p className="text-gray-600 text-sm mb-1">1 queen bed</p>
          <p className="text-gray-600 text-sm mb-1">Breakfast included</p>
          <p className="text-gray-600 text-sm mb-1">Free cancellation</p>
          <p className="text-gray-600 text-sm mb-1">No prepayment needed – pay at the property</p>
          <p className="text-red-600 font-medium mb-2">We have 3 left at this price</p>

          {/* Stay Info */}
          <p className="text-gray-700 mb-1">1 night, 2 adults</p>
        </div>

        {/* Pricing & Button */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-4">
          <div className="flex flex-col">
            <span className="text-gray-500 line-through mb-1">
              BDT 12,558
            </span>
            <span className="text-xl font-bold text-black mb-1">
              BDT 6,907
            </span>
            <span className="text-gray-500 text-sm">
              +BDT 1,830 taxes and fees
            </span>
          </div>
          <Button className="bg-primary text-white mt-3 md:mt-0 px-6 h-12">
            See availability
          </Button>
        </div>
      </div>
    </div>
  );
}