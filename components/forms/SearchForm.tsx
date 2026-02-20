"use client";

import { useState, useRef, useEffect, forwardRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FaCalendarAlt } from "react-icons/fa";
import GuestsInput from "./GuestsInput";

// Country & City JSON
const locations = [
  { country: "Bangladesh", city: "Dhaka" },
  { country: "Bangladesh", city: "Cox's Bazar" },
  { country: "Thailand", city: "Bangkok" },
  { country: "Malaysia", city: "Kuala Lumpur" },
  { country: "Singapore", city: "Singapore" },
  { country: "India", city: "Delhi" },
  { country: "India", city: "Mumbai" },
  { country: "Japan", city: "Tokyo" },
  { country: "UAE", city: "Dubai" },
  { country: "Australia", city: "Sydney" }
];

export default function SearchForm() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter locations
  const filteredItems = locations.filter(
    (item) =>
      item.country.toLowerCase().includes(search.toLowerCase()) ||
      item.city.toLowerCase().includes(search.toLowerCase())
  );

  // ------------------- Calendar Input (Shadcn styled) -------------------
  const CalendarInput = forwardRef(({ value, onClick, placeholder }: any, ref) => (
    <div className="relative w-full">
      <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-black text-lg" />
      <Input
        placeholder={placeholder}
        value={value}
        readOnly
        onClick={onClick}
        ref={ref}
        className="pl-10 pr-10 h-14 rounded-xl shadow-sm border border-gray-300 text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  ));

  return (
    <form className="bg-white rounded-xl shadow-md p-4 flex flex-wrap gap-4 items-center w-full max-w-5xl mx-auto">

      {/* ------------------------- Search Input ------------------------- */}
      <div className="relative w-full" ref={containerRef}>
        <HiOutlineLocationMarker className="absolute left-3 h-7 w-6 top-1/2 -translate-y-1/2 text-black" />
        <Input
          placeholder="country or city"
          className="pl-10 pr-10 h-14 rounded-xl shadow-sm border border-gray-300 text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={search}
          readOnly={selected}
          onChange={(e) => { if (!selected) setSearch(e.target.value); }}
          onFocus={() => { if (!selected) setShowDropdown(true); }}
        />

        {/* Cross button */}
        {selected && (
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-black hover:text-gray-600"
            onClick={() => {
              setSearch("");
              setSelected(false);
              setShowDropdown(false);
            }}
          >
            ✕
          </button>
        )}

        {/* Dropdown */}
        {showDropdown && !selected && filteredItems.length > 0 && (
          <ul className="absolute z-50 w-full bg-white shadow-lg rounded-md mt-1 max-h-60 overflow-y-auto text-black">
            {filteredItems.map((item, idx) => (
              <li
                key={idx}
                className="flex items-center px-3 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  setSearch(`${item.country}, ${item.city}`);
                  setSelected(true);
                  setShowDropdown(false);
                }}
              >
                <HiOutlineLocationMarker className="text-black mr-2" />
                <div className="flex flex-col">
                  <span className="font-medium text-black">{item.country}</span>
                  <span className="text-black text-sm">{item.city}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ------------------------- Date Pickers ------------------------- */}
      <div className="flex gap-4 flex-1 min-w-[250px]">
        {/* Start Date */}
        <DatePicker
          selected={startDate}
          onChange={(date: Date | null) => setStartDate(date)}
          placeholderText="Start Date"
          customInput={<CalendarInput placeholder="Start Date" />}
        />

        {/* End Date */}
        <DatePicker
          selected={endDate}
          onChange={(date: Date | null) => setEndDate(date)}
          placeholderText="End Date"
          customInput={<CalendarInput placeholder="End Date" />}
        />
      </div>

      {/* ------------------------- Guests ------------------------- */}
      <GuestsInput />

      {/* ------------------------- Search Button ------------------------- */}
      <Button type="submit" className="bg-primary text-white px-6 h-14">
        Search
      </Button>
    </form>
  );
}