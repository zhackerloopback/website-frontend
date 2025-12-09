import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
};

export const isLoggedIn = () => !!getToken();

// YE HOOK har protected page ke liye use karenge
export const useRequireAuth = () => {
  const router = useRouter();
  const [authReady, setAuthReady] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const logged = isLoggedIn();
    setLoggedIn(logged);

    if (!logged) {
      router.push("/login");
    }

    setAuthReady(true);
  }, [router]);

  return { authReady, loggedIn };
};
