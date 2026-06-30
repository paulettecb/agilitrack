import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{ background: "#1A1A2E" }}>
      <div className="text-center max-w-lg">
        <div className="mb-8 flex items-center justify-center gap-3">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: "#E8FF47" }}>🐾</div>
          <div>
            <div className="text-2xl font-bold text-white">AgiliTrack</div>
            <div className="text-xs" style={{ color: "#8892A4" }}>by KYN Studio</div>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">Entrena. Diseña. Compite.</h1>
        <p className="text-lg mb-10" style={{ color: "#8892A4" }}>La app de agility canino que se ve tan bien como tu perro en pista.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/dashboard" className="px-8 py-3 rounded-xl font-bold text-black transition-opacity hover:opacity-90" style={{ background: "#E8FF47" }}>Empezar gratis</Link>
          <Link href="/courses" className="px-8 py-3 rounded-xl font-medium text-white border transition-colors hover:border-white" style={{ borderColor: "#0F3460" }}>Ver constructor de pistas</Link>
        </div>
        <div className="mt-16 grid grid-cols-3 gap-6 text-center">
          {[{ emoji: "📐", label: "Constructor de pistas FCI" },{ emoji: "📊", label: "Registro de sesiones" },{ emoji: "🏆", label: "Historial de competencias" }].map((f) => (
            <div key={f.label} className="p-4 rounded-xl" style={{ background: "#16213E" }}>
              <div className="text-2xl mb-2">{f.emoje}</div>
              <div className="text-xs font-medium" style={{ color: "#8892A4" }}>{f.label}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
