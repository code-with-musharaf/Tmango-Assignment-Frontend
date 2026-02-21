"use client";

import Image from "next/image";
import { useAppSelector } from "@/hooks/useRedux";

export default function SharedHeader() {
  const theme = useAppSelector((state) => state.global.theme);
  const isDark = theme === "dark";

  return (
    <div className="text-center space-y-3">
      <h3 className="text-xl sm:text-2xl font-semibold">
        See what others{" "}
        <span className="inline-flex -space-x-3 align-middle">
          <Image
            src="/assets/profiles.png"
            alt="users"
            width={70}
            height={30}
          />
        </span>{" "}
        shared
      </h3>

      <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
        <strong>85+</strong> participants already completed
      </p>
    </div>
  );
}
