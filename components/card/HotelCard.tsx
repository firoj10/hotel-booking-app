"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function HotelCard({
  name,
  location,
  image,
}: {
  name: string;
  location: string;
  image: string;
}) {
  return (
    <Card className="rounded-xl shadow-sm overflow-hidden w-full max-w-sm hover:shadow-md transition">
      <Image src={image} alt={name} width={400} height={200} className="object-cover" />
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg">{name}</h3>
        <p className="text-sm text-muted">{location}</p>
        <Button className="mt-4 w-full bg-primary text-white">Book Now</Button>
      </CardContent>
    </Card>
  );
}