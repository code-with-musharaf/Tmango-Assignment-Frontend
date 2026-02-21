"use client";

import { useAppDispatch } from "@/hooks/useRedux";
import ChallengeModal from "./ChallengeModal";
import { useEffect, useState } from "react";
import { setTheme } from "@/redux/slices/global.slice";
import CheckInSection from "./checkin/CheckinSection";
import { useRouter } from "next/navigation";

const LandingPage = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);

  const dispatch = useAppDispatch();
  const token = localStorage.getItem("token") ?? null;

  useEffect(() => {
    const theme = localStorage.getItem("theme") ?? null;
    if (!!theme) dispatch(setTheme(theme as "light" | "dark"));
  }, []);

  useEffect(() => {
    if (!token) {
      router.push("/auth");
    }
  }, [token]);
  return (
    <>
      <ChallengeModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <CheckInSection />
    </>
  );
};

export default LandingPage;
