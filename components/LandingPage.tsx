"use client";

import { useAppDispatch } from "@/hooks/useRedux";
import ChallengeModal from "./ChallengeModal";
import { useEffect, useState } from "react";
import { setTheme } from "@/redux/slices/global.slice";
import CheckInSection from "./checkin/CheckinSection";
import { useRouter } from "next/navigation";
import ChallengeSidebar from "./Sidebar";

const LandingPage = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const theme = localStorage.getItem("theme") ?? null;
    if (!!theme) dispatch(setTheme(theme as "light" | "dark"));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token") ?? null;
    if (!token) {
      router.push("/auth");
    }
  }, []);
  return (
    <>
      <ChallengeModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <div className="flex">
        <ChallengeSidebar />
        <CheckInSection />
      </div>
    </>
  );
};

export default LandingPage;
