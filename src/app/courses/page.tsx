import Sidebar from "@/components/layout/Sidebar";
import Link from "next/link";

const COURSES = [
  { id: "1", name: "Recorrido Domingo #3", category: "L", obstacles: 18, valid: true, updated: "28 jun" },
  { id: "2", name: "Jumping rápido", category: "M", obstacles: 15, valid: true, updated: "20 jun" },
  { id: "3", name: "Pista entrenamiento slalom", category: "L", obstacles: 12, valid: false, updated: "10 jun" },
];
export default function Courses() {
  return (
    <div className="flex min-h-screen" style={{ background: "#1A1A2E" }}>
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Constructor de pistas</h1>
            <p className="text-sm mt-1" style={{ color: "#8892A4" }}>Diseña recorridos con validación FCI 2023</p>
          </div>
          <Link href="/courses/new" className="px-5 py-2.5 rounded-xl font-bold text-black text-sm" style={{ background: "#E8FF47" }}>+ Nueva pista</Link>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {COURSES.map((c) => (
            <Link key={c.id} href={`/courses/${c.id}`} className="rounded-xl p-5 block transition-opacity hover:opacity-80" style={{ background: "#16213E" }}>
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl" style={{ background: "#0F3460" }}>📐</div>
                <div className="flex gap-2">
                  <span className="px-2 py-0.5 rounded text-xs font-bold" style={{ background: "#0F3460", color: "#E8FF47" }}>{c.category}</span>
                  <span className="px-2 py-0.5 rounded text-xs font-bold" style={{ background: c.valid ? "#00C89620" : "#FF6B3520", color: c.valid ? "#00C896" : "#FF6B35" }}>{c.valid ? "✓ Válido" : "⚠ Errores"}</span>
                </div>
              </div>
              <div className="font-medium text-white mb-1">{c.name}</div>
              <div className="text-sm" style={{ color: "#8892A4" }}>{c.obstacles} obstáculos · Editado {c.updated}</div>
            </Link>
          ))}
          <Link href="/courses/new" className="rounded-xl p-5 flex flex-col items-center justify-center border-2 border-dashed transition-colors" style={{ background: "transparent", borderColor: "#0F3460", minHeight: "140px" }}>
            <div className="text-3xl mb-2">+</div>
            <div className="text-sm font-medium" style={{ color: "#8892A4" }}>Nueva pista</div>
          </Link>
        </div>
      </main>
    </div>
  );
}
