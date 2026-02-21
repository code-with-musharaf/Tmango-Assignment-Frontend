"use client";

import { useAppSelector } from "@/hooks/useRedux";
import CheckInInput from "./CheckInInput";

import PostCard from "./PostCard";
import SharedHeader from "./SharedHeader";
import PostCardSkeleton from "./PostCardSkeleton";

export default function CheckInSection() {
  const { theme, loading } = useAppSelector((state) => state.global);
  const isDark = theme === "dark";

  return (
    <div
      className={`w-full min-h-screen px-4 sm:px-8 py-8 transition-colors duration-300 ${
        isDark ? "bg-black text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Today's Checkin */}
        <CheckInInput />

        {/* Shared Section */}
        <div
          className={`rounded-3xl p-6 sm:p-8 border transition ${
            isDark
              ? "bg-gradient-to-b from-[#1b1b22] to-[#141414] border-white/10"
              : "bg-white border-gray-200"
          }`}
        >
          <SharedHeader />

          {loading ? (
            <PostCardSkeleton count={2} />
          ) : (
            <div className="mt-6 space-y-6">
              <PostCard />
              <PostCard pinned />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
