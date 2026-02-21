"use client";

import { useAppSelector } from "@/hooks/useRedux";
import clsx from "clsx";

interface Props {
  count?: number;
}

export default function SidebarSkeleton({ count = 9 }: Props) {
  const theme = useAppSelector((state) => state.global.theme);
  const isDark = theme === "dark";

  return (
    <div
      className={clsx(
        "h-screen w-72 border-r backdrop-blur-xl px-4 py-6 space-y-5",
        isDark
          ? "bg-gradient-to-b from-[#0f0f0f] via-[#111] to-[#0d0d0d] border-gray-800"
          : "bg-gradient-to-b from-gray-200 via-gray-100 to-gray-200 border-gray-300",
      )}
    >
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={clsx(
            "flex items-center justify-between px-6 py-4 rounded-full animate-pulse transition",
            isDark ? "bg-white/5" : "bg-white/70",
          )}
        >
          {/* Day Text Skeleton */}
          <div
            className={clsx(
              "h-4 w-24 rounded",
              isDark ? "bg-white/10" : "bg-gray-300",
            )}
          />

          {/* Icon Placeholder */}
          <div
            className={clsx(
              "h-5 w-5 rounded-full",
              isDark ? "bg-white/10" : "bg-gray-300",
            )}
          />
        </div>
      ))}
    </div>
  );
}
