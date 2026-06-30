import Sidebar from "@/components/layout/Sidebar";
import Link from "next/link";
const STATS = [{ label: "Sesiones este mes", value: "12", icon: "📊", color: "#00C896" },{ label: "Pistas diseñadas", value: "5", icon: "📐", color: "#E8FF47" },{ label: "Competencias", value: "3", icon: "🏆", color: "#FF6B35" },{ label: "Limpias", value: "67%", icon: "✅", color: "#00C896" }];
const RECENT = [{ date: "28 jun", dog: "Luna", result: "clean", time: "42.3s", faults: 0 },{ date: "25 jun", dog: "Luna", result: "faults", time: "38.1s", faults: 5 },{ date: "22 jun", dog: "Luna", result: "clean", time: "45.0s", faults: 0 }];
const COLORS: Record<string,string> = { clean: "#00C896", faults: "#FF6B35", eliminated: "#FF6B35", dnf: "#8892A4" };
export default function Dashboard() {
  return (
    <div className="flex min-h-screen" style={{background:"#1A1A2E"}}>
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div><h1 className="text-2xl font-bold text-white">Dashboard</h1><p className="text-sm mt-1" style={{color:"#8892A4"}}>Lunes 30 de junio 2026</p></div>
          <Link href="/sessions/new" className="px-5 py-2.5 rounded-xl font-bold text-black text-sm" style={{background:"#E8FF47"}}>+ Registrar sesión</Link>
        </div>
        <div className="grid grid-cols-4 gap-4 mb-8">
          {STATS.map((s) => (<div key={s.label} className="rounded-xl p-5" style={{background:"#16213E"}}><div className="text-2xl mb-3">{s.icon}</div><div className="text-3xl font-bold mb-1" style={{color:s.color}}>{s.value}</div><div className="text-xs" style={{color:"#8892A4"}}>{s.label}</div></div>))}
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="rounded-xl p-6" style={{background:"#16213E"}}>
            <div className="flex items-center justify-between mb-4"><h2 className="font-bold text-white">Sesiones recientes</h2><Link href="/sessions" className="text-xs" style={{color:"#E8FF47"}}>Ver todo →</Link></div>
            <div className="space-y-3">
              {RECENT.map((s,i) => (<div key={i} className="flex items-center justify-between py-2" style={{borderBottom:"1px solid #0F3460"}}><div className="flex items-center gap-3"><div className="text-xs" style={{color:"#8892A4"}}>{s.date}</div><div className="text-sm font-medium text-white">{s.dog}</div></div><div className="flex items-center gap-3"><div className="text-sm" style={{color:"#8892A4"}}>{s.time}</div><div className="px-2 py-0.5 rounded-full text-xs font-medium" style={{background:COLORS[s.result]+"20",color:COLORS[s.result]}}>{s.result==="clean"?"Limpia":`${s.faults} faltas`}</div></div></div>))}
            </div>
          </div>
          <div className="rounded-xl p-6" style={{background:"#16213E"}}>
            <h2 className="font-bold text-white mb-4">Acciones rápidas</h2>
            <div className="space-y-3">
              {[{ href:"/courses/new", icon:"📐", label:"Diseñar nueva pista", sub:"Constructor FCI"},{ href:"/sessions/new", icon:"📊", label:"Registrar sesión", sub:"Tiempo y faltas"},{ href:"/competitions/new", icon:"🏆", label:"Agregar competencia", sub:"Resultados oficiales"}].map((a) => (<Link key={a.href} href={a.href} className="flex items-center gap-4 p-3 rounded-lg transition-colors hover:opacity-80" style={{background:"#0F3460"}}><div className="text-2xl">{a.icon}</div><div><div className="text-sm font-medium text-white">{a.label}</div><div className="text-xs" style={{color:"#8892A4"}}>{a.sub}</div></div></Link>))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
