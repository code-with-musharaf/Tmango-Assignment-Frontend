"use client";

import { useAppSelector, useAppDispatch } from "@/hooks/useRedux";
import { setTheme as globalSetTheme } from "@/redux/slices/global.slice";
import { Flame, Bell, ChevronLeft, Info, Moon, Sun } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import clsx from "clsx";
import ChallengeDrawer from "./ChallengeDrawer";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { theme, selectedDay } = useAppSelector((state) => state.global);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [showChallengeSideDrawer, setShowChallengeSideDrawer] =
    useState<boolean>(false);

  const [showProfileMenu, setShowProfileMenu] = useState<boolean>(false);

  const isDark = theme === "dark";

  useEffect(() => {
    const handleClickOutside = () => {
      setShowProfileMenu(false);
    };

    if (showProfileMenu) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showProfileMenu]);

  const toggleTheme = () => {
    dispatch(globalSetTheme(isDark ? "light" : "dark"));
  };

  const handleLogout = () => {
    setShowProfileMenu(false);
    localStorage.removeItem("token");
    localStorage.clear();
    router.push("/auth");
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

      {/* Top Row */}
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

          {/* Avatar + Logout */}
          <div className="relative">
            <div
              onClick={(e) => {
                e.stopPropagation();
                setShowProfileMenu((prev) => !prev);
              }}
              className={clsx(
                "w-9 h-9 rounded-full overflow-hidden border cursor-pointer",
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

            {showProfileMenu && (
              <div
                onClick={(e) => e.stopPropagation()}
                className={clsx(
                  "absolute right-0 mt-3 w-40 rounded-xl shadow-lg border z-50 transition",
                  isDark
                    ? "bg-[#1c1c22] border-white/10 text-white"
                    : "bg-white border-gray-200 text-gray-900",
                )}
              >
                <button
                  onClick={handleLogout}
                  className={clsx(
                    "w-full text-left px-4 py-3 rounded-xl transition cursor-pointer hover:bg-gray-100 text-red-600",
                    isDark ? "hover:bg-white/10" : "hover:bg-gray-100",
                  )}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div
        className={clsx(
          "flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 sm:px-6 py-4 transition-colors duration-300",
          isDark ? "bg-[#121217]" : "bg-gray-50",
        )}
      >
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
            Day {selectedDay ?? 1} of 30
          </div>
        </div>

        <div
          className={clsx(
            "flex items-center gap-2 font-semibold justify-end md:justify-start",
            isDark ? "text-white" : "text-gray-900",
          )}
        >
          <span>30-Days Fitness Challenge</span>
          <Info
            className={clsx(
              "w-5 h-5 cursor-pointer",
              isDark ? "text-gray-400" : "text-gray-500",
            )}
            onClick={() => setShowChallengeSideDrawer(true)}
          />
        </div>
      </div>
    </div>
  );
}
