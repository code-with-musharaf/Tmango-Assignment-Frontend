"use client";

import { useAppSelector } from "@/hooks/useRedux";
import clsx from "clsx";
import { Play, X } from "lucide-react";
import Image from "next/image";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChallengeModal({ isOpen, onClose }: Props) {
  const theme = useAppSelector((state) => state.global.theme);
  const isDark = theme === "dark";

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* 🔹 Backdrop */}
      <div
        onClick={onClose}
        className={clsx(
          "absolute inset-0 backdrop-blur-md transition-all duration-300",
          isDark ? "bg-black/70" : "bg-black/30",
        )}
      />

      {/* 🔹 Modal Container */}
      <div
        className={clsx(
          "relative w-full max-w-3xl rounded-3xl shadow-2xl transition-all duration-300 overflow-hidden",
          isDark
            ? "bg-gradient-to-b from-[#1a1a1f] to-[#111111] text-white shadow-black/50"
            : "bg-gradient-to-b from-white to-gray-100 text-gray-900",
        )}
      >
        {/* 🔹 Close Button */}
        <button
          onClick={onClose}
          className={clsx(
            "absolute top-5 right-5 p-3 rounded-full transition z-10",
            isDark
              ? "bg-white/10 hover:bg-white/20"
              : "bg-gray-200 hover:bg-gray-300",
          )}
        >
          <X
            className={clsx(
              "w-5 h-5",
              isDark ? "text-white" : "text-gray-700",
              "cursor-pointer",
            )}
            onClick={onClose}
          />
        </button>

        {/* 🔹 Image Section */}
        <div className="relative w-full h-56 sm:h-72 rounded-t-3xl overflow-hidden">
          <Image
            src="/assets/challenge_image.png"
            alt="Fitness"
            fill
            className="object-cover"
          />
        </div>

        {/* 🔹 Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Title */}
          <h2 className="text-2xl sm:text-3xl font-bold">
            9-Day Fitness Challenge
          </h2>

          {/* Stats Row */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Checkins */}
            <div className="flex items-center gap-2">
              <div
                className={clsx(
                  "w-10 h-10 rounded-full flex items-center justify-center border",
                  isDark ? "border-yellow-500" : "border-yellow-600",
                )}
              >
                <Play className="w-4 h-4 text-yellow-500" />
              </div>
              <span className="font-medium opacity-80">9 checkins</span>
            </div>

            {/* Divider */}
            <div
              className={clsx(
                "hidden sm:block w-px h-6",
                isDark ? "bg-white/20" : "bg-gray-300",
              )}
            />

            {/* Participants */}
            <div className="flex items-center gap-2">
              <div className="flex -space-x-3">
                <Image
                  src="/assets/profiles.png"
                  alt="participants"
                  width={104}
                  height={40}
                  className="rounded-full"
                />
              </div>
              <span className="font-medium opacity-80">
                +75 participants joined
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Description</h3>
            <p
              className={clsx(
                "leading-relaxed text-sm sm:text-base",
                isDark ? "text-gray-300" : "text-gray-600",
              )}
            >
              This 9-day fitness challenge is designed to help you build
              consistency, boost energy, and feel stronger—one day at a time.
              Each day comes with a simple, achievable fitness task that fits
              easily into your routine, no matter your current fitness level.
            </p>
          </div>

          {/* CTA */}
          <div className="pt-4">
            <p
              className={clsx(
                "text-center mb-4",
                isDark ? "text-gray-300" : "text-gray-700",
              )}
            >
              Join the challenge and start your journey
            </p>

            <button
              className={clsx(
                "w-full py-3 rounded-full font-semibold transition",
                isDark
                  ? "bg-yellow-600 hover:bg-yellow-500 text-white"
                  : "bg-yellow-600 hover:bg-yellow-700 text-white",
              )}
            >
              Join Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
