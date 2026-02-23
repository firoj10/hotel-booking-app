"use client";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>; // Clean: no navbar, no footer
}