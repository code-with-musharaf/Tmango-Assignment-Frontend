"use client";

import { MessageCircle, Smile } from "lucide-react";
import { useAppSelector } from "@/hooks/useRedux";

export default function ReactionBar() {
  const theme = useAppSelector((state) => state.global.theme);
  const isDark = theme === "dark";

  return (
    <div className="flex items-center justify-between mt-6">
      <div className="flex items-center gap-3">
        <button
          className={`px-3 py-1 rounded-full text-sm ${
            isDark ? "bg-white/10" : "bg-gray-200"
          }`}
        >
          🙏 😍 18
        </button>

        <button
          className={`p-2 rounded-full ${
            isDark ? "bg-white/10" : "bg-gray-200"
          }`}
        >
          <Smile size={16} />
        </button>

        <button
          className={`p-2 rounded-full ${
            isDark ? "bg-white/10" : "bg-gray-200"
          }`}
        >
          <MessageCircle size={16} />
        </button>
      </div>

      <span className="text-sm opacity-70">10 Comments</span>
    </div>
  );
}
