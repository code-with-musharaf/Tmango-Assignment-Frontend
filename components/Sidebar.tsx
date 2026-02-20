"use client";

import { Lock, Clock, X, Menu } from "lucide-react";
import { use, useEffect, useState } from "react";
import clsx from "clsx";
import { useAppSelector } from "@/hooks/useRedux";

interface DayItem {
  day: number;
  locked: boolean;
  selected: boolean;
}

const days: DayItem[] = [
  { day: 1, locked: false, selected: true },
  { day: 2, locked: false, selected: false },
  { day: 3, locked: true, selected: false },
  { day: 4, locked: true, selected: false },
  { day: 5, locked: true, selected: false },
  { day: 6, locked: true, selected: false },
  { day: 7, locked: true, selected: false },
  { day: 8, locked: true, selected: false },
  { day: 9, locked: true, selected: false },
];

export default function ChallengeSidebar() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [activeDay, setActiveDay] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const defaultTheme = useAppSelector((state) => state.global.theme);

  useEffect(() => {
    if (defaultTheme) {
      setTheme(defaultTheme);
    }
  }, [defaultTheme]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="sm:hidden fixed top-30 left-0 z-50 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md"
      >
        <Menu
          className="w-5 h-5"
          color={theme === "light" ? "white" : "white"}
        />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 sm:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={clsx(
          "fixed sm:static top-0 left-0 h-screen w-72   backdrop-blur-xl p-4 border-r border-gray-300 dark:border-gray-700 transition-transform duration-300 z-50",
          isOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0",
          "bg-gradient-to-b",
          theme === "dark"
            ? "from-gray-900 to-gray-800"
            : "from-gray-200 to-gray-300",
        )}
      >
        {/* Close button (Mobile) */}
        <div className="flex justify-between items-center mb-6 sm:hidden">
          <h2 className="font-semibold text-gray-800 dark:text-white">
            Challenge Days
          </h2>
          <button onClick={() => setIsOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          {days.map((item) => {
            return (
              <div
                key={item.day}
                onClick={() => {
                  if (!item.locked) {
                    setActiveDay(item.day);
                    setIsOpen(false);
                  }
                }}
                className={clsx(
                  "flex items-center justify-between px-5 py-3 rounded-full cursor-pointer transition-all duration-300",
                  item.selected
                    ? "bg-white dark:bg-gray-700 shadow-md"
                    : "hover:bg-white/40 dark:hover:bg-gray-700/40",
                )}
              >
                <div className="flex items-center gap-3">
                  {item.selected && (
                    <Clock className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                  )}
                  <span
                    className={clsx(
                      " font-medium",
                      theme === "light" ? "text-gray-700" : "text-gray-200",
                    )}
                  >
                    Day - {item.day}
                  </span>
                </div>

                {item.locked && (
                  <Lock className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
