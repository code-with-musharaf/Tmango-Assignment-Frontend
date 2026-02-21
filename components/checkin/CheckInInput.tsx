"use client";

import { useAppSelector } from "@/hooks/useRedux";
import Image from "next/image";
import { useState } from "react";
import CheckInModal from "./CheckInModal";

export default function CheckInInput() {
  const theme = useAppSelector((state) => state.global.theme);
  const isDark = theme === "dark";
  const [showCheckInModal, setShowCheckInModal] = useState(false);

  return (
    <div className="space-y-4">
      {showCheckInModal && (
        <CheckInModal
          isOpen={showCheckInModal}
          onClose={() => setShowCheckInModal(false)}
        />
      )}
      <div className="flex items-center justify-center gap-3">
        <h2 className="text-lg font-semibold">Today's check-in</h2>
        <span className="px-3 py-1 text-xs bg-red-500 text-white rounded-full">
          Ends in 20h 44m
        </span>
      </div>

      <div
        className={`flex items-center gap-4 px-4 py-3 rounded-full border transition ${
          isDark
            ? "bg-[#1c1c22] border-yellow-500"
            : "bg-white border-yellow-500"
        }`}
        onClick={() => setShowCheckInModal(true)}
      >
        <Image
          src="/assets/profile.jpg"
          alt="user"
          width={40}
          height={40}
          className="rounded-full"
        />
        <input
          placeholder="Share what you completed today?"
          className={`bg-transparent outline-none w-full ${
            isDark ? "text-white placeholder-gray-400" : "text-gray-700"
          }`}
          disabled
        />
      </div>
    </div>
  );
}
