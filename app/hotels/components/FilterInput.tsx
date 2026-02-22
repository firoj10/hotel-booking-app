"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const categories = ["Hotel", "Apartment", "Resort"];

export default function FilterInput() {
  const [selected, setSelected] = useState<string[]>([]);

  const handleCheckedChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelected((prev) => [...prev, category]);
    } else {
      setSelected((prev) => prev.filter((item) => item !== category));
    }
  };

  return (
    <div className="gap-10 p-6">
        <div>
        <h2 className="text-lg font-semibold mb-4">Selected Filters:</h2>
        <div className="flex gap-2 flex-wrap">
          {selected.map((item) => (
            <span
              key={item}
              className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
      {/* Filter Card */}
      <div className="w-64 mt-4 p-4 border rounded-xl shadow-sm bg-white">
        <h2 className="text-lg font-semibold mb-4">Filter by Category</h2>

        <div className="space-y-3">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                className="w-4 h-4 border border-default-medium  rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft"
                checked={selected.includes(category)}
                onCheckedChange={(checked) =>
                  handleCheckedChange(category, checked as boolean)
                }
              />
              <Label htmlFor={category} className="cursor-pointer">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Result Section */}
    

    </div>
  );
}