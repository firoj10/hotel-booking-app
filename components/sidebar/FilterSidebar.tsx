"use client";

import { Button } from "@/components/ui/button";

export default function FilterSidebar() {
  return (
    <aside className="w-64 bg-white shadow-sm rounded-lg p-4 sticky top-20 h-fit space-y-4">
      <h2 className="font-semibold text-lg mb-2">Filters</h2>
      <Button className="w-full bg-primary text-white">Price</Button>
      <Button className="w-full bg-primary text-white">Rating</Button>
      <Button className="w-full bg-primary text-white">Type</Button>
    </aside>
  );
}