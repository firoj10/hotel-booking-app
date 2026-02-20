"use client";

import Hero from "@/components/hero/Hero";
import HotelCard from "@/components/card/HotelCard";

import FilterSidebar from "@/components/sidebar/FilterSidebar";

export default function Home() {
  return (
    <main>
      <Hero />
      <section className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <FilterSidebar />

        {/* Hotels Grid */}
        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <HotelCard name="Hotel Sunshine" location="New York" image="/images/hotel1.jpg" />
          <HotelCard name="Beach Resort" location="Maldives" image="/images/hotel2.jpg" />
          <HotelCard name="Mountain View" location="Switzerland" image="/images/hotel3.jpg" />
          <HotelCard name="City Lights Hotel" location="Paris" image="/images/hotel1.jpg" />
          <HotelCard name="Ocean Paradise" location="Thailand" image="/images/hotel2.jpg" />
          <HotelCard name="Alpine Retreat" location="Switzerland" image="/images/hotel3.jpg" />
        </div>
      </section>
    </main>
  );
}