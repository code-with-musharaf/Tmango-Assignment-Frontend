"use client";

import { useAppDispatch } from "@/hooks/useRedux";
import ChallengeModal from "./ChallengeModal";
import { useEffect, useState } from "react";
import { setTheme } from "@/redux/slices/global.slice";

const LandingPage = () => {
  const [isOpen, setIsOpen] = useState(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const theme = localStorage.getItem("theme") ?? null;
    if (!!theme) dispatch(setTheme(theme as "light" | "dark"));
  }, []);

  return (
    <>
      <ChallengeModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default LandingPage;
