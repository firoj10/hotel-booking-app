"use client";

import { useState, useRef, useEffect, forwardRef } from "react";
import { Input } from "@/components/ui/input";
import { HiOutlineLocationMarker } from "react-icons/hi";

interface LocationInputProps {
  value: string;
  onChange: (value: string) => void;
}

const locations = [
  { country: "Bangladesh", city: "Dhaka" },
  { country: "Bangladesh", city: "Cox's Bazar" },
  { country: "Thailand", city: "Bangkok" },
  { country: "Malaysia", city: "Kuala Lumpur" },
  { country: "Singapore", city: "Singapore" },
];

export default function LocationInput({ value, onChange }: LocationInputProps) {
  const [selected, setSelected] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = locations.filter(
    (item) =>
      item.country.toLowerCase().includes(value.toLowerCase()) ||
      item.city.toLowerCase().includes(value.toLowerCase())
  );

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

  return (
    <div className="relative w-full" ref={containerRef}>
      <HiOutlineLocationMarker className="absolute left-3 top-1/2 -translate-y-1/2 text-black text-lg" />
      <Input
        placeholder="Country or city"
        value={value}
        readOnly={selected}
        onChange={(e) => {
          if (!selected) {
            onChange(e.target.value);
            setShowDropdown(true);
          }
        }}
        onFocus={() => !selected && setShowDropdown(true)}
        className="pl-10 pr-10 h-14 rounded-xl shadow-sm border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {/* Clear button */}
      {selected && (
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-black hover:text-gray-600"
          onClick={() => {
            onChange("");
            setSelected(false);
          }}
        >
          ✕
        </button>
      )}

      {/* Dropdown */}
      {showDropdown && !selected && filtered.length > 0 && (
        <ul className="absolute z-50 w-full bg-white shadow-lg rounded-md mt-1 max-h-60 overflow-y-auto text-black">
          {filtered.map((item, idx) => (
            <li
              key={idx}
              className="flex items-center px-3 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => {
                onChange(`${item.country}, ${item.city}`);
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
  );
}