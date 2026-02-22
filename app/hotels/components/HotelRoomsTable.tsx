"use client";
import { useState } from "react";
import Image from "next/image";

interface HotelCardProps {
  hotel: {
    id: number;
    name: string;
    address: string;
    city: string;
    country: string;
    ratingAvg: number; // make sure server converts Decimal → number
    rooms: {
      id: number;
      roomNumber: string;
      floor: number;
      roomType: {
        name: string;
        capacityAdults: number;
        capacityChildren: number;
        basePrice: number;
        images?: { url: string; alt?: string }[];
      };
    }[];
  };
}

export default function HotelBooking({ hotel }: HotelCardProps) {
  // Track selected quantities per room
  const [selectedRooms, setSelectedRooms] = useState(
    hotel.rooms.map((room) => ({ roomId: room.id, quantity: 0 }))
  );

  const handleQuantityChange = (roomId: number, value: number) => {
    setSelectedRooms((prev) =>
      prev.map((r) => (r.roomId === roomId ? { ...r, quantity: value } : r))
    );
  };

  const grandTotal = selectedRooms.reduce((total, sel) => {
    const room = hotel.rooms.find((r) => r.id === sel.roomId);
    return total + (room ? room.roomType.basePrice * sel.quantity : 0);
  }, 0);



  const handlePayment = async () => {
  const res = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount: grandTotal }),
  });

  const data = await res.json();
  window.location.href = data.url;
};
  return (
    <div className="border border-gray-200 rounded-lg shadow-sm bg-white p-4 flex gap-6">
      {/* Left - Room Table 70% */}
      <div className="w-7/10">
        <table className="min-w-full border border-gray-100 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Room type</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Guests</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Price/room</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Select</th>
            </tr>
          </thead>
          <tbody>
            {hotel.rooms.map((room) => {
              const sel = selectedRooms.find((r) => r.roomId === room.id);
              return (
                <tr key={room.id} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-2 flex items-center gap-2">
                    {room.roomType.images?.[0]?.url && (
                      <div className="w-12 h-12 relative flex-shrink-0">
                        <Image
                          src={room.roomType.images[0].url}
                          alt={room.roomType.images[0].alt || room.roomType.name}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                    )}
                    <span className="text-sm font-medium">{room.roomType.name}</span>
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600">
                    {room.roomType.capacityAdults} adults · {room.roomType.capacityChildren} children
                  </td>
                  <td className="px-4 py-2 text-sm text-red-600 font-bold">
                    BDT {room.roomType.basePrice.toLocaleString()}
                  </td>
                  <td className="px-4 py-2">
                    <select
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                      value={sel.quantity}
                      onChange={(e) => handleQuantityChange(room.id, Number(e.target.value))}
                    >
                      {[...Array(5).keys()].map((i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1} room{i + 1 > 1 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Right - Booking Card 30% */}
      <div className="w-3/10 bg-gray-50 rounded-lg p-4 flex flex-col gap-3">
        <h3 className="text-lg font-bold">Your Booking</h3>
        {selectedRooms.filter((r) => r.quantity > 0).length === 0 ? (
          <p className="text-sm text-gray-500">No rooms selected</p>
        ) : (
          <div className="flex flex-col gap-2 text-sm">
            {selectedRooms
              .filter((r) => r.quantity > 0)
              .map((r) => {
                const room = hotel.rooms.find((rm) => rm.id === r.roomId);
                return (
                  <div key={r.roomId} className="flex justify-between">
                    <span>
                      {room.roomType.name} x {r.quantity}
                    </span>
                    <span>BDT {(room.roomType.basePrice * r.quantity).toLocaleString()}</span>
                  </div>
                );
              })}
            <div className="border-t border-gray-300 pt-2 flex justify-between font-bold">
              <span>Total</span>
              <span>BDT {grandTotal.toLocaleString()}</span>
            </div>
          </div>
        )}
        <button
          disabled={grandTotal === 0}
          className={`mt-auto py-2 px-4 rounded font-bold text-white ${
            grandTotal === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          Proceed to Payment
        </button>
        <button
  onClick={handlePayment}
  disabled={grandTotal === 0}
  className="bg-blue-600 text-white px-4 py-2 rounded"
>
  Proceed to Payment
</button>
      </div>
    </div>
  );
}