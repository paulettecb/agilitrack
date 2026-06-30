import Sidebar from "@/components/layout/Sidebar";
import Link from "next/link";

const COMPS = [
  { id: "1", date: "15 jun 2026", event: "Open FMCA Guadalajara", category: "L", type: "Agility", result: "clean", time: "39.8s", placement: 2 },
  { id: "2", date: "01 jun 2026", event: "Club Canino Monterrey", category: "L", type: "Jumping", result: "faults", time: "36.1s", placement: 5 },
  { id: "3", date: "12 may 2026", event: "Open FMCA CDMX", category: "L", type: "Agility", result: "clean", time: "41.2s", placement: 1 },
];

const LABELS: Record<string, { label: string; color: string }> = {
  clean: { label: "Limpia", color: "#00C896" },
  faults: { label: "Faltas", color: "#FF6B35" },
  eliminated: { label: "Eliminada", color: "#FF6B35" },
};

export default function Competitions() {
  return (
    <div className="flex min-h-screen" style={{ background: "#1A1A2E" }}>
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Competencias</h1>
            <p className="text-sm mt-1" style={{ color: "#8892A4" }}>{COMPS.length} resultados registrados</p>
          </div>
          <Link href="/competitions/new"
            className="px-5 py-2.5 rounded-xl font-bold text-black text-sm"
            style={{ background: "#E8FF47" }}>
            + Agregar resultado
          </Link>
        </div>

        <div className="rounded-xl overflow-hidden" style={{ background: "#16213E" }}>
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid #0F3460" }}>
                {["Fecha", "Evento", "Cat.", "Tipo", "Resultado", "Tiempo", "Lugar"].map((h) => (
                  <th key={h} className="px-6 py-4 text-left text-xs font-medium" style={{ color: "#8892A4" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPS.map((c) => {
                const res = LABELS[c.result];
                return (
                  <tr key={c.id} style={{ borderBottom: "1px solid #0F346040" }}>
                    <td className="px-6 py-4 text-sm text-white">{c.date}</td>
                    <td className="px-6 py-4 text-sm font-medium text-white">{c.event}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 rounded text-xs font-bold" style={{ background: "#0F3460", color: "#E8FF47" }}>{c.category}</span>
                    </td>
                    <td className="px-6 py-4 text-sm" style={{ color: "#8892A4" }}>{c.type}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: res.color + "20", color: res.color }}>{res.label}</span>
                    </td>
                    <td className="px-6 py-4 text-sm" style={{ color: "#8892A4" }}>{c.time}</td>
                    <td className="px-6 py-4 text-sm font-bold" style={{ color: c.placement === 1 ? "#E8FF47" : "white" }}>
                      {c.placement === 1 ? "1 deg" : c.placement === 2 ? "2 deg" : `${c.placement} deg`}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
