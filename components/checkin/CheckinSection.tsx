"use client";

import { useAppSelector } from "@/hooks/useRedux";
import CheckInInput from "./CheckInInput";

import PostCard, { IChallengePost } from "./PostCard";
import SharedHeader from "./SharedHeader";
import PostCardSkeleton from "./PostCardSkeleton";
import { useApi } from "@/hooks/useApi";
import { useEffect, useState } from "react";

export default function CheckInSection() {
  const { theme, loading, selectedDay } = useAppSelector(
    (state) => state.global,
  );
  const isDark = theme === "dark";
  const { getSubmisionOfTheDay } = useApi();
  const [submissionData, setSubmissionData] = useState<IChallengePost[]>([]);
  const [localLoading, setLocalLoading] = useState(false);

  const fetchSubmissions = async () => {
    try {
      setLocalLoading(true);
      const res = await getSubmisionOfTheDay(selectedDay);
      if (res.success) {
        setSubmissionData(res.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLocalLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, [selectedDay]);

  return (
    <div
      className={`w-full h-[100vh] overflow-auto px-4 sm:px-8 py-8 transition-colors duration-300 ${
        isDark ? "bg-black text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="max-w-3xl mx-auto space-y-8">
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

          {loading || localLoading ? (
            <PostCardSkeleton count={2} />
          ) : (
            <div className="mt-6 space-y-6">
              {submissionData.length > 0 &&
                submissionData.map((item) => {
                  return <PostCard key={item._id} data={item} />;
                })}
              <PostCard />
              <PostCard pinned />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
