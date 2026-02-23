"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";


export default function LoginPage() {
    const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Login failed");
        return;
      }

      // ✅ Update AuthContext
      login(data.user, data.token);

      setMessage("Login successful!");
      window.location.href = "/"; // redirect after login
    } catch (err: any) {
      console.error(err);
      setMessage("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] flex items-center justify-center px-4">
      <div className="max-w-5xl w-full flex flex-col md:flex-row items-center justify-between">

        {/* Left Section */}
        <div className="mb-10 md:mb-0 md:w-1/2">
          <h1 className="text-blue-600 text-5xl font-bold mb-4">facebook</h1>
          <p className="text-2xl text-gray-800">Connect and book your perfect stay.</p>
        </div>

        {/* Right Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-[400px]">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition"
            >
              Log In
            </button>

            {message && <p className="text-red-500 text-sm text-center">{message}</p>}

            <Link href="/forgot-password" className="text-blue-600 text-sm text-center hover:underline">
              Forgotten password?
            </Link>

            <hr />

            {/* Social Login */}
            <button
              type="button"
              onClick={() => signIn("google")}
              className="flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-md hover:bg-gray-100 transition font-medium"
            >
              <FcGoogle size={20} />
              Continue with Google
            </button>

            <button
              type="button"
              onClick={() => signIn("facebook")}
              className="flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-md hover:bg-gray-100 transition font-medium"
            >
              <FaFacebook size={20} className="text-blue-600" />
              Continue with Facebook
            </button>

            <hr />

            <Link href="/register" className="text-blue-600 text-sm mt-6">
              Create New Account
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}