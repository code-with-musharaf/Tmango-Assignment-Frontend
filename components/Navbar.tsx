"use client";

import { useAppSelector } from "@/hooks/useRedux";
import { clsx } from "clsx";
import { Flame, Bell, ChevronLeft, Info, Moon, Sun } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/hooks/useRedux";
import { setTheme as globalSetTheme } from "@/redux/slices/global.slice";

export default function Navbar() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const defaultTheme = useAppSelector((state) => state.global.theme);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (defaultTheme) {
      setTheme(defaultTheme);
      document.documentElement.classList.toggle(
        "dark",
        defaultTheme === "dark",
      );
    }
  }, [defaultTheme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    dispatch(globalSetTheme(newTheme as "light" | "dark"));
  };

  return (
    <div className="w-full border-b bg-white dark:bg-gray-900 dark:border-gray-800 transition-colors duration-300">
      <div className="flex items-center justify-between px-4 sm:px-6 py-3">
        <div className="flex items-center gap-2">
          <div className="text-yellow-500 text-xl sm:text-2xl">(( ))</div>
          <span
            className={clsx(
              "text-lg sm:text-xl font-semibold text-gray-800 dark:text-white",
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
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {theme === "light" ? (
              <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-gray-200" />
            ) : (
              <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
            )}
          </button>

          {/* Streak */}
          <div className="hidden sm:flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full">
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="font-medium text-gray-700 dark:text-gray-200 text-sm">
              30
            </span>
          </div>

          {/* Bell */}
          <div className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
            <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-gray-200" />
          </div>

          {/* Avatar */}
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border dark:border-gray-700">
            <Image
              src="https://lh3.googleusercontent.com/a/ACg8ocJkLXKPRpa5r1NzyzBnDHjekr145IF2g2e8_GcJmao9MQqmky-N=s576-c-no"
              alt="Profile"
              width={36}
              height={36}
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* 🔹 Bottom Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 sm:px-6 py-3 bg-gray-50 dark:bg-gray-800 transition-colors duration-300 gap-3 sm:gap-0">
        {/* Left Section */}
        <div className="flex items-center justify-between sm:justify-start gap-4">
          <div className="flex items-center gap-2 cursor-pointer text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white">
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-medium text-sm sm:text-base">Back</span>
          </div>

          <div className="text-sm sm:text-lg font-semibold text-gray-800 dark:text-white">
            Day 1 of 9
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 text-gray-800 dark:text-white font-semibold text-sm sm:text-base">
          <span className="truncate max-w-[200px] sm:max-w-none">
            9-Day Fitness Challenge
          </span>
          <Info className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 dark:text-gray-400" />
        </div>
      </div>
    </div>
  );
}
