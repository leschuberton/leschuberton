import React from 'react';
import { 
  Activity, 
  Heart, 
  Flame, 
  Footprints, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp,
  BrainCircuit,
  Zap
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { cn } from '@/src/lib/utils';

const healthData = [
  { time: '08:00', exertion: 20, heartRate: 72 },
  { time: '10:00', exertion: 45, heartRate: 95 },
  { time: '12:00', exertion: 60, heartRate: 110 },
  { time: '14:00', exertion: 85, heartRate: 135 },
  { time: '16:00', exertion: 70, heartRate: 120 },
  { time: '18:00', exertion: 30, heartRate: 85 },
];

const workerStatus = [
  { name: 'Hans Müller', role: 'Steel Worker', status: 'Optimal', exertion: 65, heartRate: 105, battery: 82 },
  { name: 'Petra Schmidt', role: 'Electrician', status: 'Fatigued', exertion: 88, heartRate: 142, battery: 15 },
  { name: 'Klaus Weber', role: 'Foreman', status: 'Optimal', exertion: 42, heartRate: 88, battery: 94 },
  { name: 'Sabine Koch', role: 'Architect', status: 'Resting', exertion: 12, heartRate: 72, battery: 100 },
];

const COLORS = ['#F27D26', '#E4E3E0', '#141414'];

export function HealthMonitor() {
  return (
    <div className="p-8 space-y-8 bg-[#F5F5F5] min-h-screen">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-sans font-bold tracking-tight text-[#141414]">Worker Health & Performance</h1>
          <p className="text-[#141414]/60 mt-2 font-sans">Real-time fitness tracking and AI-driven training planning.</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#141414]/10 rounded-lg text-sm font-medium hover:bg-[#141414]/5 transition-colors">
            <Activity className="w-4 h-4" /> Live Vitals
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#141414] text-white rounded-lg text-sm font-medium hover:bg-[#141414]/90 transition-colors">
            <BrainCircuit className="w-4 h-4" /> AI Training Plan
          </button>
        </div>
      </header>

      {/* Main Health Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 p-8 bg-white rounded-3xl shadow-sm border border-[#141414]/5">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-[#141414]">Team Exertion Index</h3>
            <div className="flex gap-4">
              <span className="flex items-center gap-2 text-xs font-medium text-[#141414]/40">
                <div className="w-3 h-3 rounded-full bg-[#F27D26]" /> Exertion (%)
              </span>
              <span className="flex items-center gap-2 text-xs font-medium text-[#141414]/40">
                <div className="w-3 h-3 rounded-full bg-red-400" /> Heart Rate (bpm)
              </span>
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={healthData}>
                <defs>
                  <linearGradient id="exertionGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F27D26" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#F27D26" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#141414/5" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#141414/40', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#141414/40', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{backgroundColor: '#141414', border: 'none', borderRadius: '12px', color: '#fff'}}
                  itemStyle={{color: '#fff'}}
                />
                <Area type="monotone" dataKey="exertion" stroke="#F27D26" strokeWidth={3} fillOpacity={1} fill="url(#exertionGradient)" />
                <Area type="monotone" dataKey="heartRate" stroke="#F87171" strokeWidth={2} fill="transparent" strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-8 bg-[#141414] rounded-3xl shadow-sm text-white flex flex-col">
          <h3 className="text-xl font-bold mb-8">Energy Distribution</h3>
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Productive', value: 65 },
                      { name: 'Resting', value: 25 },
                      { name: 'Over-exerted', value: 10 },
                    ]}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {COLORS.map((color, index) => (
                      <Cell key={`cell-${index}`} fill={color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-8 space-y-4 w-full">
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#F27D26]" /> Productive</span>
                <span className="font-bold">65%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#E4E3E0]" /> Resting</span>
                <span className="font-bold">25%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-white/20" /> Over-exerted</span>
                <span className="font-bold text-red-400">10%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Worker List & AI Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 p-8 bg-white rounded-3xl shadow-sm border border-[#141414]/5">
          <h3 className="text-xl font-bold text-[#141414] mb-6">Active Personnel</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-bold text-[#141414]/40 uppercase tracking-wider border-b border-[#141414]/5">
                  <th className="pb-4">Worker</th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4">Exertion</th>
                  <th className="pb-4">Heart Rate</th>
                  <th className="pb-4">Battery</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#141414]/5">
                {workerStatus.map((worker, i) => (
                  <tr key={i} className="group hover:bg-[#F5F5F5] transition-colors">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#F27D26]/10 flex items-center justify-center text-[#F27D26] font-bold">
                          {worker.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-bold text-[#141414]">{worker.name}</p>
                          <p className="text-xs text-[#141414]/40">{worker.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className={cn(
                        "px-3 py-1 rounded-full text-xs font-bold",
                        worker.status === 'Optimal' ? "bg-green-100 text-green-700" : 
                        worker.status === 'Fatigued' ? "bg-red-100 text-red-700 animate-pulse" : 
                        "bg-blue-100 text-blue-700"
                      )}>
                        {worker.status}
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <TrendingUp className={cn("w-4 h-4", worker.exertion > 80 ? "text-red-500" : "text-[#141414]/40")} />
                        <span className="font-medium">{worker.exertion}%</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <Heart className={cn("w-4 h-4", worker.heartRate > 130 ? "text-red-500" : "text-[#141414]/40")} />
                        <span className="font-medium">{worker.heartRate} bpm</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <Zap className={cn("w-4 h-4", worker.battery < 20 ? "text-red-500" : "text-green-500")} />
                        <span className="font-medium">{worker.battery}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="p-8 bg-[#F27D26] rounded-3xl shadow-sm text-white">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <BrainCircuit className="w-6 h-6" /> AI Training Hub
          </h3>
          <div className="space-y-6">
            <div className="p-4 bg-white/10 rounded-2xl border border-white/20">
              <h4 className="font-bold mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-300" /> Fatigue Risk
              </h4>
              <p className="text-sm text-white/80 leading-relaxed">
                Petra Schmidt has reached 88% exertion. AI recommends a 20-minute recovery session and hydration.
              </p>
            </div>
            <div className="p-4 bg-white/10 rounded-2xl border border-white/20">
              <h4 className="font-bold mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-300" /> Training Plan
              </h4>
              <p className="text-sm text-white/80 leading-relaxed">
                Based on today's physical load, the next training session for the Steel Team should focus on core stability and lower back relief.
              </p>
            </div>
            <button className="w-full py-3 bg-white text-[#F27D26] rounded-xl font-bold hover:bg-white/90 transition-colors">
              Generate Full Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
