"use client";

import { useAppSelector } from "@/hooks/useRedux";
import Image from "next/image";
import { useState } from "react";
import CheckInModal from "./CheckInModal";
import CheckinCountDown from "./CheckinCountDown";
import { Check } from "lucide-react";

export default function CheckInInput() {
  const { theme, selectedDayData } = useAppSelector((state) => state.global);
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
      {!selectedDayData?.completed ? (
        <CheckinCountDown />
      ) : (
        <div className="text-center text-green-500 flex items-center justify-center">
          <p> Congratulations You Already Checked In </p>{" "}
          <Check className="ml-2" />
        </div>
      )}

      <div
        className={`flex items-center gap-4 px-4 py-3 rounded-full border transition ${
          isDark
            ? "bg-[#1c1c22] border-yellow-500"
            : "bg-white border-yellow-500"
        }`}
        onClick={() => setShowCheckInModal(true)}
        style={{
          display: selectedDayData?.completed ? "none" : "flex",
        }}
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
