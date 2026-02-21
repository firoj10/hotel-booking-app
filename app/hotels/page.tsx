"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import HotelCard from "./components/HotelCard";
import SearchForm from "@/components/forms/SearchForm";

interface Hotel {
  id: number;
  name: string;
  address: string;
  city: string;
  country: string;
  rooms: {
    id: number;
    roomNumber: string;
    floor: number;
    roomType: {
      name: string;
      capacityAdults: number;
      capacityChildren: number;
      basePrice: number;
    };
  }[];
}

export default function HotelsPage() {
  const searchParams = useSearchParams();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(false);

  const city = searchParams.get("city") || "";
  const checkIn = searchParams.get("checkIn") || "";
  const checkOut = searchParams.get("checkOut") || "";
  const adults = parseInt(searchParams.get("adults") || "1");
  const children = parseInt(searchParams.get("children") || "0");
  const rooms = parseInt(searchParams.get("rooms") || "1");

  useEffect(() => {
    async function fetchHotels() {
      if (!city) {
        setHotels([]);
        return;
      }

      setLoading(true);
      try {
        const params = new URLSearchParams();
        params.append("city", city);
        if (checkIn) params.append("checkIn", checkIn);
        if (checkOut) params.append("checkOut", checkOut);
        params.append("adults", String(adults));
        params.append("children", String(children));
        params.append("rooms", String(rooms));

        const res = await fetch(`/api/hotels?${params.toString()}`);
        const data = await res.json();
        if (data.success) setHotels(data.data);
      } catch (err) {
        console.error("Failed to fetch hotels", err);
      } finally {
        setLoading(false);
      }
    }

    fetchHotels();
  }, [city, checkIn, checkOut, adults, children, rooms]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* 🔹 Add SearchForm here */}
      <SearchForm />

      {loading ? (
        <p className="mt-6">Loading hotels...</p>
      ) : hotels.length === 0 ? (
        <p className="mt-6">No hotels found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {hotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      )}
    </div>
  );
}