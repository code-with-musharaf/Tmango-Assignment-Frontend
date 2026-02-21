"use client";

import { useEffect, useState } from "react";
import { useAppSelector } from "@/hooks/useRedux";
import clsx from "clsx";

export default function CheckinCountDown() {
  const theme = useAppSelector((state) => state.global.theme);
  const isDark = theme === "dark";

  const [timeLeft, setTimeLeft] = useState("");

  const calculateTimeLeft = () => {
    const now = new Date();

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const diff = endOfDay.getTime() - now.getTime();

    if (diff <= 0) return "Ended";

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 py-6">
      <h2
        className={clsx(
          "text-xl sm:text-2xl font-semibold",
          isDark ? "text-white" : "text-gray-900",
        )}
      >
        Today's check-in
      </h2>

      <div
        className={clsx(
          "px-4 py-2 rounded-full text-sm font-medium transition",
          isDark ? "bg-red-500 text-white" : "bg-red-500 text-white",
        )}
      >
        Ends in {timeLeft}
      </div>
    </div>
  );
}
