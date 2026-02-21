"use client";

import { useAppSelector } from "@/hooks/useRedux";
import clsx from "clsx";

interface Props {
  count?: number;
}

export default function PostCardSkeleton({ count = 1 }: Props) {
  const theme = useAppSelector((state) => state.global.theme);
  const isDark = theme === "dark";

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={clsx(
            "rounded-2xl border p-5 animate-pulse transition",
            isDark
              ? "bg-[#1c1c22] border-white/10"
              : "bg-gray-50 border-gray-200",
          )}
        >
          {/* Header */}
          <div className="flex items-center gap-4">
            <div
              className={clsx(
                "w-12 h-12 rounded-full",
                isDark ? "bg-white/10" : "bg-gray-300",
              )}
            />

            <div className="flex-1 space-y-2">
              <div
                className={clsx(
                  "h-4 w-32 rounded",
                  isDark ? "bg-white/10" : "bg-gray-300",
                )}
              />
              <div
                className={clsx(
                  "h-3 w-20 rounded",
                  isDark ? "bg-white/10" : "bg-gray-200",
                )}
              />
            </div>
          </div>

          {/* Content Lines */}
          <div className="mt-5 space-y-3">
            <div
              className={clsx(
                "h-3 rounded w-full",
                isDark ? "bg-white/10" : "bg-gray-300",
              )}
            />
            <div
              className={clsx(
                "h-3 rounded w-5/6",
                isDark ? "bg-white/10" : "bg-gray-300",
              )}
            />
            <div
              className={clsx(
                "h-3 rounded w-4/6",
                isDark ? "bg-white/10" : "bg-gray-300",
              )}
            />
          </div>

          {/* List Items */}
          <div className="mt-4 space-y-2">
            <div
              className={clsx(
                "h-3 rounded w-3/4",
                isDark ? "bg-white/10" : "bg-gray-200",
              )}
            />
            <div
              className={clsx(
                "h-3 rounded w-2/3",
                isDark ? "bg-white/10" : "bg-gray-200",
              )}
            />
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center mt-6">
            <div className="flex gap-3">
              <div
                className={clsx(
                  "h-8 w-20 rounded-full",
                  isDark ? "bg-white/10" : "bg-gray-300",
                )}
              />
              <div
                className={clsx(
                  "h-8 w-8 rounded-full",
                  isDark ? "bg-white/10" : "bg-gray-300",
                )}
              />
              <div
                className={clsx(
                  "h-8 w-8 rounded-full",
                  isDark ? "bg-white/10" : "bg-gray-300",
                )}
              />
            </div>

            <div
              className={clsx(
                "h-3 w-20 rounded",
                isDark ? "bg-white/10" : "bg-gray-300",
              )}
            />
          </div>
        </div>
      ))}
    </>
  );
}
