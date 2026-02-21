"use client";

import { useAppSelector } from "@/hooks/useRedux";
import Image from "next/image";
import { useState } from "react";
import CheckInModal from "./CheckInModal";
import CheckinCountDown from "./CheckinCountDown";

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
      <CheckinCountDown />

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
        <p
          onClick={() => setShowCheckInModal(true)}
          className={`
    w-full cursor-pointer select-none
    ${isDark ? "text-gray-400" : "text-gray-600"}
  `}
        >
          Share what you completed today?
        </p>
      </div>
    </div>
  );
}
