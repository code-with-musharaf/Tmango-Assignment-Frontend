"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AuthChecker = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth");
    } else {
      router.push("/home");
    }
  }, []);
  return <></>;
};

export default AuthChecker;
