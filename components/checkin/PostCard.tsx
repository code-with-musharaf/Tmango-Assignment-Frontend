"use client";

import { useAppSelector } from "@/hooks/useRedux";

import Image from "next/image";
import { MoreHorizontal, Pin } from "lucide-react";
import ReactionBar from "./ReactionBar";

interface Props {
  pinned?: boolean;
}

export default function PostCard({ pinned }: Props) {
  const theme = useAppSelector((state) => state.global.theme);
  const isDark = theme === "dark";

  return (
    <div
      className={`rounded-2xl border p-5 transition ${
        isDark ? "bg-[#1c1c22] border-white/10" : "bg-gray-50 border-gray-200"
      }`}
    >
      {pinned && (
        <div className="flex items-center gap-2 text-sm mb-4 opacity-70">
          <Pin size={14} />
          <span>This is a pinned post</span>
        </div>
      )}

      <div className="flex justify-between items-start">
        <div className="flex gap-3">
          <Image
            src="/assets/profile.png"
            alt="user"
            width={45}
            height={45}
            className="rounded-full"
          />
          <div>
            <h4 className="font-semibold">Russell Brunson</h4>
            <p className="text-xs opacity-60">3 hrs ago</p>
          </div>
        </div>

        <MoreHorizontal size={20} className="opacity-50" />
      </div>

      <p className="mt-4 text-sm leading-relaxed opacity-90">
        This 9-day fitness challenge is designed to help you build consistency
        and feel stronger—one day at a time.
      </p>

      <ul className="mt-4 space-y-2 text-sm">
        <li>1️⃣ Minimum 20 minutes of sit-up</li>
        <li>2️⃣ Mention Intensity</li>
        <li>3️⃣ Upload Media (Optional)</li>
      </ul>

      <ReactionBar />
    </div>
  );
}
