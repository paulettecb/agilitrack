import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AgiliTrack by KYN",
  description: "Plan, build, and track your dog agility training",
};

export default function RootLayout({ children }: {children: React.ReactNode}) {
  return (
    <html lang="es"><body>{children}</body></html>
  );
}
