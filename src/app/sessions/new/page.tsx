"use client";
import Sidebar from "@/components/layout/Sidebar";
import { useState } from "react";
import { useRouter } from "next/navigation";
type Result = "clean"|"faults"|"eliminated"|"dnf";
const OPTS = [{value:"clean",label:"Limpia",color:"#00C896",emoji:"✅"},{value:"faults",label:"Con faltas",color:"#FF6B35",emoji:"⚠️"},{value:"eliminated",label:"Eliminada",color:"#FF6B35",emoji:"<div>❌</div>"},{value:"dnf",label:"No terminó",color:"#8892A4",emoji:"移️"}];
export default function NewSession() {
  const router = useRouter();
  const [f,setF] = useState({date:new Date().toISOString().split("T")[0],dog_name:"",result:"clean" as Result,time_seconds:"",faults:"0",notes:""});
  const set = (k: string, v: string) => setF(p => ({...p,[k]:v}));
  const submit = async (e: React.FormEvent) => { e.preventDefault(); console.log(f); router.push("/sessions"); };
  return (
    <div className="flex min-h-screen" style={{background:"#1A1A2E"}}>
      <Sidebar />
      <main className="flex-1 p-8 max-w-2xl">
        <div className="mb-8"><h1 className="text-2xl font-bold text-white">Registrar sesión</h1><p className="text-sm mt-1" style={{color:"#8892A4"}}>Guarda tiempo, faltas y notas</p></div>
        <form onSubmit={submit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium mb-2" style={{color:"#8892A4"}}>Fecha</label><input type="date" value={f.date} onChange={e=>set("date",e.target.value)} className="w-full px-4 py-3 rounded-xl text-white text-sm" style={{background:"#16213E",border:"1px solid #0F3460"}} /></div>
            <div><label className="block text-sm font-medium mb-2" style={{color:"#8892A4"}}>Nombre del perro</label><input type="text" value={f.dog_name} onChange={e=>set("dog_name",e.target.value)} placeholder="Luna" required className="w-full px-4 py-3 rounded-xl text-white text-sm" style={{background:"#16213E",border:"1px solid #0F3460"}} /></div>
          </div>
          <div><label className="block text-sm font-medium mb-3" style={{color:"#8892A4"}}>Resultado</label><div className="grid grid-cols-4 gap-3">{OPTS.map(opt=>(<button key={opt.value} type="button" onClick={()=>set("result",opt.value)} className="p-3 rounded-xl text-center transition-all" style={{background:f.result===opt.value?opt.color+"30":"#16213E",border:`2px solid ${f.result===opt.value?opt.color:"#0F3460"}`}}><div className="text-xl mb-1">{opt.emoje}</div><div className="text-xs font-medium" style={{color:f.result===opt.value?opt.color:"#8892A4"}}>{opt.label}</div></button>))}</div></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium mb-2" style={{color:"#8892A4"}}>Tiempo (segundos)</label><input type="number" step="0.01" value={f.time_seconds} onChange={e=>set("time_seconds",e.target.value)} placeholder="42.30" className="w-full px-4 py-3 rounded-xl text-white text-sm" style={{background:"#16213E",border:"1px solid #0F3460"}} /></div>
            <div><label className="block text-sm font-medium mb-2" style={{color:"#8892A4"}}>Faltas</label><div className="flex items-center gap-3"><button type="button" onClick={()=>set("faults",String(Math.max(0,parseInt(f.faults)-5)))} className="w-12 h-12 rounded-xl text-white font-bold text-lg" style={{background:"#16213E",border:"1px solid #0F3460"}}>−</button><div className="flex-1 px-4 py-3 rounded-xl text-white text-sm text-center font-bold text-xl" style={{background:"#16213E",border:"1px solid #0F3460",color:parseInt(f.faults)>0?"#FF6B35":"#00C896"}}>{f.faults}</div><button type="button" onClick={()=>set("faults",String(parseInt(f.faults)+5))} className="w-12 h-12 rounded-xl text-white font-bold text-lg" style={{background:"#16213E",border:"1px solid #0F3460"}}>+</button></div></div>
          </div>
          <div><label className="block text-sm font-medium mb-2" style={{color:"#8892A4"}}>Notas</label><textarea value={f.notes} onChange={e=>set("notes",e.target.value)} rows={3} placeholder="Trabajamos el slalom..." className="w-full px-4 py-3 rounded-xl text-white text-sm resize-none" style={{background:"#16213E",border:"1px solid #0F3460"}} /></div>
          <div className="flex gap-4 pt-2"><button type="button" onClick={()=>router.back()} className="flex-1 py-3 rounded-xl font-medium text-sm" style={{background:"#16213E",color:"#8892A4",border:"1px solid #0F3460"}}>Cancelar</button><button type="submit" className="flex-1 py-3 rounded-xl font-bold text-black text-sm" style={{background:"#E8FF47"}}>Guardar sesión</button></div>
        </form>
      </main>
    </div>
  );
}
