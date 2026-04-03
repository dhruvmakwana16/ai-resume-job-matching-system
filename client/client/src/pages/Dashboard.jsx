// export default function Dashboard() {
//   return (
//     <div className="p-8 bg-gradient-to-br from-indigo-50 via-gray-100 to-gray-200 min-h-screen">
//       {/* Header */}
//       <h2 className="text-4xl font-extrabold mb-6 text-center text-indigo-700 drop-shadow-lg">
//         Dashboard
//       </h2>

//       {/* Card */}
//       <div className="bg-white shadow-lg p-6 rounded-2xl max-w-xl mx-auto border border-gray-200">
//         <p className="text-lg text-gray-700 font-medium text-center">
//           Welcome to <span className="text-indigo-600 font-bold">AI Resume Analyzer 🚀</span>
//         </p>
//       </div>
//     </div>
//   );
// }


import React from 'react';
import { 
  LayoutDashboard, FileText, Briefcase, TrendingUp, 
  Upload, BrainCircuit, Search, CheckCircle2, AlertCircle 
} from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-[#F1F5F9]">
      {/* 1. Glassmorphism Sidebar */}
      <aside className="w-72 bg-slate-900 text-white hidden lg:flex flex-col shadow-2xl">
        <div className="p-8">
          <h1 className="text-2xl font-black tracking-tighter flex items-center gap-2">
            <span className="bg-indigo-500 p-1.5 rounded-lg text-white"><BrainCircuit size={24}/></span>
            RESUME.AI
          </h1>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <NavItem icon={<LayoutDashboard size={20}/>} label="Neural Overview" active />
          <NavItem icon={<FileText size={20}/>} label="Resume Vault" />
          <NavItem icon={<Search size={20}/>} label="Job Match Engine" />
          <NavItem icon={<TrendingUp size={20}/>} label="Career Pathing" />
        </nav>

        <div className="p-6 m-4 bg-slate-800 rounded-2xl border border-slate-700">
          <p className="text-xs text-slate-400 uppercase font-bold mb-2">AI Credits</p>
          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
            <div className="w-[85%] h-full bg-indigo-500 shadow-[0_0_10px_#6366f1]"></div>
          </div>
          <p className="text-[10px] mt-2 text-slate-400">85/100 Analysis remaining</p>
        </div>
      </aside>

      {/* 2. Main Workspace */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-end mb-10">
          <div>
            <span className="text-indigo-600 font-bold text-sm tracking-widest uppercase">System Online</span>
            <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Intelligence Hub</h2>
          </div>
          <button className="group bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-3 transition-all transform hover:-translate-y-1 shadow-lg shadow-indigo-200">
            <Upload size={20} className="group-hover:animate-bounce" />
            Scan New Resume
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* 3. The "ATS Score" Ring */}
          <div className="lg:col-span-1 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10"><BrainCircuit size={80}/></div>
            <h3 className="text-slate-500 font-bold uppercase text-xs tracking-widest mb-6">Average ATS Match</h3>
            <div className="relative flex items-center justify-center">
              <svg className="w-40 h-40">
                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100" />
                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray="440" strokeDashoffset="88" className="text-indigo-600 drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
              </svg>
              <span className="absolute text-4xl font-black text-slate-800">82%</span>
            </div>
            <p className="mt-6 text-sm text-slate-500 text-center font-medium leading-relaxed">
              Your resume is performing <span className="text-emerald-500 font-bold">top 15%</span> among current applicants.
            </p>
          </div>

          {/* 4. AI Insight Feed */}
          <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-xl text-slate-800">NLP Extractions</h3>
              <span className="bg-emerald-50 text-emerald-600 text-xs px-3 py-1 rounded-full font-bold border border-emerald-100 tracking-wide uppercase">Live Processing</span>
            </div>
            
            <div className="space-y-4">
              <ExtractionItem label="Core Skillset" value="React, Node.js, Express, MongoDB" status="success" />
              <ExtractionItem label="Missing Keywords" value="AWS Lambda, Docker, Kubernetes" status="warning" />
              <ExtractionItem label="Experience" value="2+ Years Web Dev" status="success" />
            </div>

            <div className="mt-8 pt-6 border-t border-slate-50 flex gap-4">
                <div className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-xs font-bold border border-indigo-100">#MERN</div>
                <div className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-xs font-bold border border-indigo-100">#FullStack</div>
                <div className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-xs font-bold border border-indigo-100">#Backend_Heavy</div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

// Helper Components
function NavItem({ icon, label, active = false }) {
  return (
    <div className={`flex items-center gap-4 px-6 py-4 rounded-2xl cursor-pointer transition-all ${active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50 translate-x-2' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
      {icon}
      <span className="font-semibold">{label}</span>
    </div>
  );
}

function ExtractionItem({ label, value, status }) {
  return (
    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-indigo-200 transition-colors">
      <div className="flex items-center gap-4">
        {status === 'success' ? <CheckCircle2 className="text-emerald-500" size={20}/> : <AlertCircle className="text-amber-500" size={20}/>}
        <div>
          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">{label}</p>
          <p className="text-slate-700 font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
}