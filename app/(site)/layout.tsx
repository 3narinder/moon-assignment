"use client";

import { ProtectRoute } from "@/components/ProtectRoutes";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectRoute>{children}</ProtectRoute>;
}
