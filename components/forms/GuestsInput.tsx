"use client";

import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { FaCalendarAlt } from "react-icons/fa";

export default function GuestsInput() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(0);

  // Temporary state inside dropdown before clicking Done
  const [tempAdults, setTempAdults] = useState(adults);
  const [tempChildren, setTempChildren] = useState(children);
  const [tempRooms, setTempRooms] = useState(rooms);

  const [inputValue, setInputValue] = useState("0 Adults, 0 Children, 0 Rooms");

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

  const saveSelection = () => {
    setAdults(tempAdults);
    setChildren(tempChildren);
    setRooms(tempRooms);
    setInputValue(`${tempAdults} Adults, ${tempChildren} Children, ${tempRooms} Rooms`);
    setShowDropdown(false);
  };

  return (
    <div className="relative flex-1 min-w-[200px]" ref={containerRef}>
       <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-black text-lg" />
     
      <Input
        value={inputValue}
        readOnly
        placeholder="Guests & Rooms"
    className="pl-10 pr-10  h-14 rounded-xl shadow-sm border border-gray-300 text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        onClick={() => setShowDropdown(!showDropdown)}
      />

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute z-50 w-full bg-white shadow-lg rounded-xl mt-1 p-4 border border-gray-300 text-black">
          {/* Adults */}
          <div className="flex justify-between items-center py-2">
            <div>
              <p className="font-medium text-black">Adults</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="w-8 h-8 bg-gray-200 text-black rounded-full flex justify-center items-center hover:bg-gray-300"
                onClick={() => setTempAdults(Math.max(0, tempAdults - 1))}
              >-</button>
              <span>{tempAdults}</span>
              <button
                type="button"
                className="w-8 h-8 bg-gray-200 text-black rounded-full flex justify-center items-center hover:bg-gray-300"
                onClick={() => setTempAdults(tempAdults + 1)}
              >+</button>
            </div>
          </div>

          {/* Children */}
          <div className="flex justify-between items-center py-2">
            <div>
              <p className="font-medium text-black">Children</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="w-8 h-8 bg-gray-200 text-black rounded-full flex justify-center items-center hover:bg-gray-300"
                onClick={() => setTempChildren(Math.max(0, tempChildren - 1))}
              >-</button>
              <span>{tempChildren}</span>
              <button
                type="button"
                className="w-8 h-8 bg-gray-200 text-black rounded-full flex justify-center items-center hover:bg-gray-300"
                onClick={() => setTempChildren(tempChildren + 1)}
              >+</button>
            </div>
          </div>

          {/* Rooms */}
          <div className="flex justify-between items-center py-2">
            <div>
              <p className="font-medium text-black">Rooms</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="w-8 h-8 bg-gray-200 text-black rounded-full flex justify-center items-center hover:bg-gray-300"
                onClick={() => setTempRooms(Math.max(0, tempRooms - 1))}
              >-</button>
              <span>{tempRooms}</span>
              <button
                type="button"
                className="w-8 h-8 bg-gray-200 text-black rounded-full flex justify-center items-center hover:bg-gray-300"
                onClick={() => setTempRooms(tempRooms + 1)}
              >+</button>
            </div>
          </div>

          {/* Done Button */}
          <div className="flex justify-end mt-4">
            <button
              type="button"
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              onClick={saveSelection}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}