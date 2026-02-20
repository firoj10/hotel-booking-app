import Link from "next/link";
import HotelCard from "./components/HotelCard";

const hotels = [
  {
    id: 1,
    name: "Grand Palace Hotel",
    location: "Dhaka, Bangladesh",
    image: "/images/hotel1.jpg",
    pricePerNight: 120,
    rating: 4.5,
  },
  {
    id: 2,
    name: "Sea Breeze Resort",
    location: "Cox's Bazar, Bangladesh",
    image: "/images/hotel2.jpg",
    pricePerNight: 90,
    rating: 4.2,
  },
  {
    id: 3,
    name: "Skyline Hotel",
    location: "Bangkok, Thailand",
    image: "/images/hotel3.jpg",
    pricePerNight: 150,
    rating: 4.8,
  },
];

export default function HotelsPage() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <HotelCard></HotelCard>
    </div>
  );
}


