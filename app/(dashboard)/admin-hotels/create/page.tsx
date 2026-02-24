"use client";

import { HotelForm } from "../components/HotelForm";



export default function CreateHotelPage() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add New Hotel</h1>
      <HotelForm />
    </div>
  );
}