"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Hotel {
  id: number;
  name: string;
  city: string;
  country: string;
  ratingAvg: number;
}

export default function HotelsPage() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHotels() {
      const res = await fetch("/api/admin/hotels");
      const data = await res.json();
      setHotels(data.data);
      setLoading(false);
    }
    fetchHotels();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Hotels</h1>
        <Link href="/admin-hotels/create" className="bg-primary text-white px-4 py-2 rounded">
          + Add Hotel
        </Link>
      </div>

      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2">City</th>
            <th className="px-4 py-2">Country</th>
            <th className="px-4 py-2">Rating</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {hotels.map((hotel) => (
            <tr key={hotel.id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2">{hotel.name}</td>
              <td className="px-4 py-2">{hotel.city}</td>
              <td className="px-4 py-2">{hotel.country}</td>
              {/* <td className="px-4 py-2">{hotel.ratingAvg?.toFixed(1)}</td> */}
              <td className="px-4 py-2 flex gap-2">
                <Link href={`/admin/hotels/${hotel.id}`} className="text-blue-500">Edit</Link>
                <button className="text-red-500">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}