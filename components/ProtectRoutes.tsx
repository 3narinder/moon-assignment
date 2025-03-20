"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import Navbar from "./Navbar";

export const ProtectRoute = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const isAuthPage =
    pathname === "/auth/login" || pathname === "/auth/register";

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Ensure this runs only on the client side
      const storedUser = localStorage.getItem("user");
      const loggedIn = localStorage.getItem("loggedIn");

      if (!storedUser || loggedIn !== "true") {
        if (!isAuthPage) {
          router.push("/auth/login");
        }
      } else {
        setIsAuthenticated(true);
      }
    }
  }, [pathname, router]);

  if (isAuthenticated === null) return null;

  return (
    <>
      {!isAuthPage && <Navbar />}
      <main className={`flex-1 ${!isAuthPage ? "pt-[75px]" : ""}`}>
        {children}
      </main>
      {!isAuthPage && <Footer />}
    </>
  );
};
