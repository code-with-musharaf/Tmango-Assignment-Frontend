"use client";

import { Lock, Clock } from "lucide-react";
import clsx from "clsx";
import { useState } from "react";

interface Props {
  theme?: "light" | "dark";
}

export default function NewChallengeSidebar({ theme = "dark" }: Props) {
  const [activeDay, setActiveDay] = useState(1);

  const isDark = theme === "dark";

  const days = Array.from({ length: 7 }, (_, i) => i + 1);

  return (
    <div
      className={clsx(
        "w-72 min-h-screen p-6 transition-all duration-300",
        isDark
          ? "bg-gradient-to-b from-[#1a1a1f] via-[#141419] to-[#0d0d10]"
          : "bg-gradient-to-b from-[#e9eef4] via-[#dde5ee] to-[#f4f6fa]",
      )}
    >
      <div className="space-y-6">
        {days.map((day) => {
          const isActive = activeDay === day;
          const isLocked = day !== 1;

          return (
            <div
              key={day}
              onClick={() => !isLocked && setActiveDay(day)}
              className={clsx(
                "flex items-center justify-between px-6 py-5 rounded-[40px] cursor-pointer transition-all duration-300",
                isActive
                  ? isDark
                    ? "bg-black text-white"
                    : "bg-white text-gray-900 shadow-sm"
                  : isDark
                    ? "text-gray-300 hover:bg-white/5"
                    : "text-gray-600 hover:bg-white/60",
              )}
            >
              {/* Left Section */}
              <div className="flex items-center gap-4">
                {isActive && (
                  <Clock
                    className={clsx(
                      "w-6 h-6",
                      isDark ? "text-white" : "text-gray-900",
                    )}
                  />
                )}
                <span
                  className={clsx(
                    "text-xl font-medium tracking-wide",
                    isActive && "font-semibold",
                  )}
                >
                  Day - {day}
                </span>
              </div>

              {/* Lock */}
              {!isActive && isLocked && (
                <Lock
                  className={clsx(
                    "w-6 h-6",
                    isDark ? "text-gray-400" : "text-gray-500",
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
