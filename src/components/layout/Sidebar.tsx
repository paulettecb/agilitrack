"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/dashboard", label: "Dashboard", emoji: "🏠" },
  { href: "/courses", label: "Pistas", emoji: "📐" },
  { href: "/sessions", label: "Sesiones", emoji: "📊" },
  { href: "/competitions", label: "Competencias", emoji: "🏆" },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside
      className="w-64 min-h-screen flex flex-col"
      style={{ background: "#16213E", borderRight: "1px solid #0F3460" }}
    >
      <div className="p-6 flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center text-lg"
          style={{ background: "#E8FF47" }}
        >
          🐾
        </div>
        <div>
          <div className="font-bold text-white text-sm">AgiliTrack</div>
          <div className="text-xs" style={{ color: "#8892A4" }}>by KYN</div>
        </div>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {NAV.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
              style={{
                background: active ? "#0F3460" : "transparent",
                color: active ? "#E8FF47" : "#8892A4",
              }}
            >
              <span>{item.emoji}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 text-xs" style={{ color: "#8892A4" }}>
        AgiliTrack v0.1 · FCI 2023
      </div>
    </aside>
  );
}
