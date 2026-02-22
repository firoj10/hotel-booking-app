"use client";

import Hero from "@/components/hero/Hero";
import HotelCard from "@/components/card/HotelCard";

import FilterSidebar from "@/components/sidebar/FilterSidebar";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Hero />
      <section className="max-w-7xl mx-auto">


        <section className="max-w-7xl mx-auto py-8 px-4">
          <h2 className="text-2xl font-bold mb-6">Why Booking.com?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-start gap-3 p-2">
              <div className="text-3xl text-blue-600">🛡️</div>
              <div>
                <p className="font-bold text-sm">Resilience, pay at the property</p>
                <p className="text-xs text-gray-600">Choose the flexibility you need with properties offering pay-at-stay.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-2">
              <div className="text-3xl text-orange-500">👍</div>
              <div>
                <p className="font-bold text-sm">Millions of reviews from guests</p>
                <p className="text-xs text-gray-600">Read what other travelers are saying about their stay.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-2">
              <div className="text-3xl text-blue-400">💡</div>
              <div>
                <p className="font-bold text-sm">Smallest properties everywhere</p>
                <p className="text-xs text-gray-600">Hotels, homes, and everything in between.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-2">
              <div className="text-3xl text-blue-800">👩‍💼</div>
              <div>
                <p className="font-bold text-sm">Customer service at your service</p>
                <p className="text-xs text-gray-600">We're here 24/7 to help with any questions.</p>
              </div>
            </div>
          </div>
        </section>




        <section className="max-w-7xl mx-auto py-8 px-4">
          <h2 className="text-2xl font-bold mb-4">Trips similar to Dhaka</h2>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            <div className="min-w-[200px] flex-shrink-0 group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg aspect-[4/3]">
                <Image
                  src="/banner/688201.jpg"
                  alt='abc'
                  width={300}
                  height={200}
                  className="h-full w-full object-cover"
                />              </div>
              <p className="mt-2 font-bold flex items-center gap-1">Singapore 🇸🇬</p>
            </div>
          </div>
        </section>


        <section className="max-w-7xl mx-auto py-8 px-4">
          <h2 className="text-2xl font-bold mb-6">Browse by property type in Cox's Bazar</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="cursor-pointer">
              <Image
                src="/banner/a.jpg"
                alt='abc'
                width={300}
                height={200}
                className="h-full w-full object-cover"
              />
              <p className="font-bold text-sm">Hotels</p>
              <p className="text-xs text-gray-500">120 properties</p>
            </div>
            <div className="cursor-pointer">
              <Image
                src="/banner/b.jpg"
                alt='abc'
                width={300}
                height={200}
                className="h-full w-full object-cover"
              />                <p className="font-bold text-sm">Apartments</p>
              <p className="text-xs text-gray-500">45 properties</p>
            </div>
            <div className="cursor-pointer">
              <Image
                src="/banner/c.jpg"
                alt='abc'
                width={300}
                height={200}
                className="h-full w-full object-cover"
              />                <p className="font-bold text-sm">Apartments</p>
              <p className="text-xs text-gray-500">45 properties</p>
            </div>
            <div className="cursor-pointer">
              <Image
                src="/banner/d.jpg"
                alt='abc'
                width={300}
                height={200}
                className="h-full w-full object-cover"
              />                <p className="font-bold text-sm">Apartments</p>
              <p className="text-xs text-gray-500">45 properties</p>
            </div>
          </div>
        </section>


        <section className="max-w-7xl mx-auto py-8 px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Deals for the weekend</h2>
            <a href="#" className="text-blue-600 text-sm font-bold hover:underline">See all deals</a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative">
                <Image
                  src="/banner/hotel/1.jpg"
                  alt='abc'
                  width={300}
                  height={200}
                  className="h-full w-full object-cover"
                />                  <button className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow">❤️</button>
              </div>
              <div className="p-3">
                <h3 className="font-bold text-blue-600 truncate">Hotel Sea World</h3>
                <p className="text-xs text-gray-500 mb-2">Dhaka, Bangladesh</p>
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-blue-900 text-white text-[10px] font-bold py-0.5 px-1 rounded">8.2</span>
                  <span className="text-xs font-bold">Very Good</span>
                  <span className="text-xs text-gray-500">• 1,200 reviews</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-red-600 line-through">BDT 6,500</span>
                  <p className="text-lg font-bold">BDT 4,800</p>
                </div>
              </div>
            </div>
            <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative">
                <Image
                  src="/banner/hotel/2.jpg"
                  alt='abc'
                  width={300}
                  height={200}
                  className="h-full w-full object-cover"
                />                  <button className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow">❤️</button>
              </div>
              <div className="p-3">
                <h3 className="font-bold text-blue-600 truncate">Hotel Sea World</h3>
                <p className="text-xs text-gray-500 mb-2">Dhaka, Bangladesh</p>
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-blue-900 text-white text-[10px] font-bold py-0.5 px-1 rounded">8.2</span>
                  <span className="text-xs font-bold">Very Good</span>
                  <span className="text-xs text-gray-500">• 1,200 reviews</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-red-600 line-through">BDT 6,500</span>
                  <p className="text-lg font-bold">BDT 4,800</p>
                </div>
              </div>
            </div>
            <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative">
                <Image
                  src="/banner/hotel/7.jpg"
                  alt='abc'
                  width={300}
                  height={200}
                  className="h-full w-full object-cover"
                />                  <button className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow">❤️</button>
              </div>
              <div className="p-3">
                <h3 className="font-bold text-blue-600 truncate">Hotel Sea World</h3>
                <p className="text-xs text-gray-500 mb-2">Dhaka, Bangladesh</p>
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-blue-900 text-white text-[10px] font-bold py-0.5 px-1 rounded">8.2</span>
                  <span className="text-xs font-bold">Very Good</span>
                  <span className="text-xs text-gray-500">• 1,200 reviews</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-red-600 line-through">BDT 6,500</span>
                  <p className="text-lg font-bold">BDT 4,800</p>
                </div>
              </div>
            </div>
            <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative">
                <Image
                  src="/banner/hotel/6.jpg"
                  alt='abc'
                  width={300}
                  height={200}
                  className="h-full w-full object-cover"
                />                  <button className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow">❤️</button>
              </div>
              <div className="p-3">
                <h3 className="font-bold text-blue-600 truncate">Hotel Sea World</h3>
                <p className="text-xs text-gray-500 mb-2">Dhaka, Bangladesh</p>
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-blue-900 text-white text-[10px] font-bold py-0.5 px-1 rounded">8.2</span>
                  <span className="text-xs font-bold">Very Good</span>
                  <span className="text-xs text-gray-500">• 1,200 reviews</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-red-600 line-through">BDT 6,500</span>
                  <p className="text-lg font-bold">BDT 4,800</p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </section>
    </main>
  );
}