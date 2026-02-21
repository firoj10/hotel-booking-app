"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import LocationInput from "./LocationInput";
import DateRangePicker from "./DateRangePicker";
import GuestsInput from "./GuestsInput";

export default function SearchForm() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [guests, setGuests] = useState({ adults: 1, children: 0, rooms: 1 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams();

    if (location) {
      const city = location.split(",")[1]?.trim() || location;
      query.append("city", city);
    }
    if (startDate) query.append("checkIn", startDate.toISOString());
    if (endDate) query.append("checkOut", endDate.toISOString());

    query.append("adults", guests.adults.toString());
    query.append("children", guests.children.toString());
    query.append("rooms", guests.rooms.toString());

    router.push(`/hotels?${query.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-md p-4 flex flex-wrap gap-4 items-center w-full max-w-5xl mx-auto"
    >
      <LocationInput value={location} onChange={setLocation} />
      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
      <GuestsInput value={guests} onChange={setGuests} />
      <Button type="submit" className="bg-primary text-white px-6 h-14">
        Search
      </Button>
    </form>
  );
}