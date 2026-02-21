"use client";

import { useAppSelector, useAppDispatch } from "@/hooks/useRedux";
import { setTheme as globalSetTheme } from "@/redux/slices/global.slice";
import { Flame, Bell, ChevronLeft, Info, Moon, Sun } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import clsx from "clsx";
import ChallengeDrawer from "./ChallengeDrawer";

export default function Navbar() {
  const theme = useAppSelector((state) => state.global.theme);
  const dispatch = useAppDispatch();

  const [showChallengeSideDrawer, setShowChallengeSideDrawer] =
    useState<boolean>(false);

  const isDark = theme === "dark";

  // 🔥 Apply dark class properly to html
  useEffect(() => {
    const root = document.documentElement;

    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDark]);

  const toggleTheme = () => {
    dispatch(globalSetTheme(isDark ? "light" : "dark"));
  };

  return (
    <div
      className={clsx(
        "w-full border-b transition-all duration-300",
        isDark
          ? "bg-gradient-to-b from-[#151518] to-[#0f0f12] border-white/10"
          : "bg-gradient-to-b from-gray-100 to-white border-gray-200",
      )}
    >
      <ChallengeDrawer
        isOpen={showChallengeSideDrawer}
        onClose={() => setShowChallengeSideDrawer(false)}
      />
      <div className="flex items-center justify-between px-4 sm:px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="text-yellow-500 text-xl sm:text-2xl">(( ))</div>
          <span
            className={clsx(
              "text-lg sm:text-xl font-semibold",
              isDark ? "text-white" : "text-gray-900",
            )}
          >
            Backstage
            <span className="text-yellow-500">Pass</span>
          </span>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={clsx(
              "p-2 rounded-full transition",
              isDark ? "hover:bg-white/10" : "hover:bg-gray-200",
            )}
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-700" />
            )}
          </button>

          {/* Streak */}
          <div
            className={clsx(
              "hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full",
              isDark ? "bg-white/10" : "bg-gray-200",
            )}
          >
            <Flame className="w-4 h-4 text-orange-500" />
            <span
              className={clsx(
                "text-sm font-medium",
                isDark ? "text-white" : "text-gray-800",
              )}
            >
              30
            </span>
          </div>

          {/* Bell */}
          <div
            className={clsx(
              "p-2 rounded-full cursor-pointer transition",
              isDark ? "hover:bg-white/10" : "hover:bg-gray-200",
            )}
          >
            <Bell
              className={clsx(
                "w-5 h-5",
                isDark ? "text-white" : "text-gray-700",
              )}
            />
          </div>

          {/* Avatar */}
          <div
            className={clsx(
              "w-9 h-9 rounded-full overflow-hidden border",
              isDark ? "border-white/20" : "border-gray-300",
            )}
          >
            <Image
              src="/assets/profile.jpg"
              alt="Profile"
              width={36}
              height={36}
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* 🔹 Bottom Row */}
      <div
        className={clsx(
          "flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 sm:px-6 py-4 transition-colors duration-300",
          isDark ? "bg-[#121217]" : "bg-gray-50",
        )}
      >
        {/* Left */}
        <div className="flex items-center gap-6 justify-end md:justify-start">
          <div
            className={clsx(
              "flex items-center gap-2 cursor-pointer transition",
              isDark
                ? "text-gray-300 hover:text-white"
                : "text-gray-700 hover:text-black",
            )}
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </div>

          <div
            className={clsx(
              "text-lg font-semibold",
              isDark ? "text-white" : "text-gray-900",
            )}
          >
            Day 1 of 30
          </div>
        </div>

        {/* Right */}
        <div
          className={clsx(
            "flex items-center gap-2 font-semibold justify-end md:justify-start",
            isDark ? "text-white" : "text-gray-900",
          )}
        >
          <span>30-Days Fitness Challenge</span>
          <Info
            className={clsx(
              "w-5 h-5",
              isDark ? "text-gray-400" : "text-gray-500",
              "cursor-pointer",
            )}
            onClick={() => setShowChallengeSideDrawer(true)}
          />
        </div>
      </div>
    </div>
  );
}
