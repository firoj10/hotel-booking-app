"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className=" bg-white shadow">
      <div className="flex justify-between p-4 m max-w-7xl mx-auto" >
        <Link href="/" className="font-bold text-xl">HotelBooking</Link>

      <div >
        {user ? (
          <>
            <span className="mr-4 font-medium">Hi, {user.name}</span>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="mr-4 text-blue-600 hover:underline">
              Login
            </Link>
            <Link href="/register" className="text-green-600 hover:underline">
              Register
            </Link>
          </>
        )}
      </div>
      </div>
    </nav>
  );
}