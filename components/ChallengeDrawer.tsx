"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import { useAppSelector } from "@/hooks/useRedux";
import clsx from "clsx";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChallengeDrawer({ isOpen, onClose }: Props) {
  const theme = useAppSelector((state) => state.global.theme);
  const isDark = theme === "dark";

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={clsx(
          "fixed inset-0 z-40 transition-opacity duration-300",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible",
          isDark
            ? "bg-black/70 backdrop-blur-md"
            : "bg-black/30 backdrop-blur-sm",
        )}
      />

      {/* Drawer */}
      <div
        className={clsx(
          "fixed top-0 right-0 h-full z-50 transition-transform duration-300 ease-in-out",
          "w-full sm:w-[500px] lg:w-[600px]",
          isOpen ? "translate-x-0" : "translate-x-full",
          isDark
            ? "bg-gradient-to-b from-[#1c1c22] to-[#121214] text-white"
            : "bg-gradient-to-b from-white to-gray-100 text-gray-900",
          "shadow-2xl flex flex-col",
        )}
      >
        {/* Header */}
        <div className="flex items-center gap-4 px-6 py-5 border-b border-white/10">
          <button
            onClick={onClose}
            className={clsx(
              "p-3 rounded-full",
              isDark ? "bg-white/10" : "bg-gray-200",
            )}
          >
            <X className="cursor-pointer" />
          </button>

          <h2 className="text-xl font-semibold">Challenge Description</h2>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* Image */}
          <div className="relative w-full h-52 sm:h-64 rounded-2xl overflow-hidden">
            <Image
              src="/assets/challenge_image.png"
              alt="challenge"
              fill
              className="object-cover"
            />
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold">9-Day Fitness Challenge</h3>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div
              className={clsx(
                "rounded-2xl p-4",
                isDark ? "bg-white/5" : "bg-gray-200",
              )}
            >
              <p className="text-sm opacity-70">Total Checkins</p>
              <p className="text-2xl font-semibold mt-2">9</p>
            </div>

            <div
              className={clsx(
                "rounded-2xl p-4",
                isDark ? "bg-white/5" : "bg-gray-200",
              )}
            >
              <p className="text-sm opacity-70">Participants Joined</p>
              <p className="text-2xl font-semibold mt-2">75</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="font-semibold mb-3">Description</h4>
            <p className="opacity-80 leading-relaxed text-sm sm:text-base">
              This 9-day challenge is designed to help you build the habit of
              showing up every day. You’ll complete one small, focused action
              daily—without overwhelm—to build clarity and confidence, and to
              prove that consistency, not motivation, is what drives real and
              lasting progress.
            </p>
          </div>
        </div>

        {/* Sticky Bottom Button */}
        <div
          className={clsx(
            "p-6 border-t",
            isDark ? "border-white/10" : "border-gray-200",
          )}
        >
          <button
            onClick={onClose}
            className={clsx(
              "w-full py-4 rounded-full font-semibold transition",
              isDark
                ? "bg-white text-black hover:bg-gray-200"
                : "bg-black text-white hover:bg-gray-800",
            )}
          >
            Got it
          </button>
        </div>
      </div>
    </>
  );
}
