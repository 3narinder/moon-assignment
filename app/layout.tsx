import type { Metadata } from "next";
import "../styles/globals.css";
import Providers from "@/components/Provider";

export const metadata: Metadata = {
  title: "Moon",
  description: "Shop the best ceramics",
  icons: "/favicon.png",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased flex flex-col min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
