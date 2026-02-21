import Navbar from "@/components/Navbar";
import ChallengeSidebar from "@/components/Sidebar";
import Providers from "@/redux/Providers";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <Navbar />
      <div className="flex">
        <ChallengeSidebar />
        {children}
      </div>
    </Providers>
  );
}
