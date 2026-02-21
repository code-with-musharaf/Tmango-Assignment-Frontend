"use client";

import { useRouter } from "next/navigation";

const AuthChecker = () => {
  const router = useRouter();
  const token = localStorage.getItem("token");
  if (!token) {
    router.push("/auth");
  } else {
    router.push("/home");
  }
  return <></>;
};

export default AuthChecker;
