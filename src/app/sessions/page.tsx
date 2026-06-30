import Sidebar from "@/components/layout/Sidebar";
import Link from "next/link";
const SESSIONS = [{ id:"1", date:"28 jun 2026", dog:"Luna", result:"clean", time:"42.3s", faults:0, notes:"Excelente slalom" },{ id:"2", date:"25 jun 2026", dog:"Luna", result:"faults", time:"38.1s", faults:5, notes:"Tiró la valla #7" },{ id:"3", date:"22 jun 2026", dog:"Luna", result:"clean", time:"45.0s", faults:0, notes:"" },{ id:"4", date:"18 jun 2026", dog:"Luna", result:"eliminated", time:"--", faults:0, notes:"Pasó obstáculo en orden incorrecto" }];
const LABELS: Record<string,{label:string;color:string}> = { clean:{label:"Limpia ✅",color:"#00C896"}, faults:{label:"Faltas ⚠️",color:"#FF6B35"}, eliminated:{label:"Eliminada ❌",color:"#FF6B35"}, dnf:{label:"No terminó",color:"#8892A4"} };
export default function Sessions() {
  return (
    <div className="flex min-h-screen" style={{background:"#1A1A2E"}}>
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div><h1 className="text-2xl font-bold text-white">Sesiones de entrenamiento</h1><p className="text-sm mt-1" style={{color:"#8892A4"}}>{SESSIONS.length} sesiones registradas</p></div>
          <Link href="/sessions/new" className="px-5 py-2.5 rounded-xl font-bold text-black text-sm" style={{background:"#E8FF47"}}>+ Nueva sesión</Link>
        </div>
        <div className="rounded-xl overflow-hidden" style={{background:"#16213E"}}>
          <table className="w-full">
            <thead><tr style={{borderBottom:"1px solid #0F3460"}}>{["Fecha","Perro","Resultado","Tiempo","Faltas","Notas"].map(h => (<th key={h} className="px-6 py-4 text-left text-xs font-medium" style={{color:"#8892A4"}}>{h</th>))}</tr></thead>
            <tbody>{SESSIONS.map(s => { const r=LABELS[s.result]; return(<tr key={s.id} style={{borderBottom:"1px solid #0F346040"}}><td className="px-6 py-4 text-sm text-white">{s.date}</td><td className="px-6 py-4 text-sm font-medium text-white">{s.dog}</td><td className="px-6 py-4"><span className="px-2.5 py-1 rounded-full text-xs font-medium" style={{background:r.color+"20",color:r.color}}>{r.label}</span></td><td className="px-6 py-4 text-sm" style={{color:"#8892A4"}}>{s.time}</td><td className="px-6 py-4 text-sm font-bold" style={{color:s.faults>0?"#FF6B35":"#00C896"}}>{s.faults}</td><td className="px-6 py-4 text-sm" style={{color:"#8892A4"}}>{s.notes||"\u2014"}</td></tr>);})}</tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
