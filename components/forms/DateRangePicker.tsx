"use client";

import { forwardRef } from "react";
import { Input } from "@/components/ui/input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";

interface DateRangePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
}

const CalendarInput = forwardRef(({ value, onClick, placeholder }: any, ref) => (
  <div className="relative w-full">
    <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-black text-lg" />
    <Input
      placeholder={placeholder}
      value={value}
      readOnly
      onClick={onClick}
      ref={ref}
      className="pl-10 pr-10 h-14 rounded-xl shadow-sm border text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>
));

export default function DateRangePicker({ startDate, endDate, setStartDate, setEndDate }: DateRangePickerProps) {
  return (
    <div className="flex gap-4 flex-1 min-w-[250px]">
      <DatePicker
        selected={startDate}
        onChange={(date: Date | null) => setStartDate(date)}
        placeholderText="Start Date"
        customInput={<CalendarInput placeholder="Start Date" />}
      />
      <DatePicker
        selected={endDate}
        onChange={(date: Date | null) => setEndDate(date)}
        placeholderText="End Date"
        customInput={<CalendarInput placeholder="End Date" />}
      />
    </div>
  );
}