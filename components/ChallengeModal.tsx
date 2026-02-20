"use client";

import { X, Play } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import clsx from "clsx";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChallengeModal({ isOpen, onClose }: Props) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div
        className={clsx(
          "relative w-full max-w-3xl rounded-3xl shadow-2xl",
          "bg-white dark:bg-gray-900",
          "transition-all duration-300",
        )}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:scale-105 transition"
        >
          <X className="w-5 h-5 text-gray-700 dark:text-gray-200" />
        </button>

        <div className="relative w-full h-56 sm:h-72 rounded-t-3xl overflow-hidden">
          <Image
            src="/fitness.jpg"
            alt="Fitness"
            fill
            className="object-cover"
          />
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            9-Day Fitness Challenge
          </h2>

          <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-300">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full border border-yellow-500 flex items-center justify-center">
                <Play className="w-4 h-4 text-yellow-600" />
              </div>
              <span className="font-medium">9 checkins</span>
            </div>

            <div className="hidden sm:block w-px h-6 bg-gray-300 dark:bg-gray-700" />

            <div className="flex items-center gap-2">
              <div className="flex -space-x-3">
                <Image
                  src="/avatar1.jpg"
                  alt="avatar"
                  width={32}
                  height={32}
                  className="rounded-full border-2 border-white dark:border-gray-900"
                />
                <Image
                  src="/avatar2.jpg"
                  alt="avatar"
                  width={32}
                  height={32}
                  className="rounded-full border-2 border-white dark:border-gray-900"
                />
                <Image
                  src="/avatar3.jpg"
                  alt="avatar"
                  width={32}
                  height={32}
                  className="rounded-full border-2 border-white dark:border-gray-900"
                />
              </div>
              <span className="font-medium">+75 participants joined</span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Description
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
              This 9-day fitness challenge is designed to help you build
              consistency, boost energy, and feel stronger—one day at a time.
              Each day comes with a simple, achievable fitness task that fits
              easily into your routine, no matter your current fitness level.
            </p>
          </div>

          {/* CTA */}
          <div className="pt-2">
            <p className="text-center text-gray-700 dark:text-gray-300 mb-4">
              Join the challenge and start your journey
            </p>

            <button className="w-full py-3 rounded-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold transition">
              Join Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
