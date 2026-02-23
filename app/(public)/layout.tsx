"use client";

import Navbar from "@/components/navbar/Navbar";
import { AuthProvider } from "@/context/AuthContext";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
   
    <div>

 
      <AuthProvider>  
      <Navbar />                 {/* public navbar */}
       </AuthProvider>  
      <main className="flex-1 pt-20">{children}</main>
         </div>
   
  );
}