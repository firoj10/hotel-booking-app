"use client";

import { Button } from "@/components/ui/button";

export default function Navbar() {
    return (
        <nav className="  bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto  px-6 flex justify-between items-center p-6">
                <div className="text-primary font-bold text-xl">BookingClone</div>
                <div className="flex gap-4">
                    <Button className="bg-primary text-white">Sign in</Button>
                    <Button className="bg-accent text-black">Register</Button>
                </div>
            </div>
        </nav>
    );
}