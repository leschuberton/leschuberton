import React from 'react';
import { 
  TrendingUp, 
  Users, 
  Package, 
  Activity, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  MessageSquareCode
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { cn } from '@/src/lib/utils';

const projectData = [
  { name: 'Mon', progress: 40, health: 85 },
  { name: 'Tue', progress: 45, health: 82 },
  { name: 'Wed', progress: 52, health: 88 },
  { name: 'Thu', progress: 58, health: 90 },
  { name: 'Fri', progress: 65, health: 84 },
  { name: 'Sat', progress: 70, health: 80 },
  { name: 'Sun', progress: 75, health: 85 },
];

const stats = [
  { label: 'Total Projects', value: '12', change: '+2', trend: 'up', icon: TrendingUp },
  { label: 'Active Workers', value: '48', change: '+5', trend: 'up', icon: Users },
  { label: 'Material Stock', value: '84%', change: '-2%', trend: 'down', icon: Package },
  { label: 'Site Safety', value: '98.2%', change: '+0.4%', trend: 'up', icon: Activity },
];

export function Dashboard() {
  return (
    <div className="p-8 space-y-8 bg-[#F5F5F5] min-h-screen">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-sans font-bold tracking-tight text-[#141414]">Project Overview</h1>
          <p className="text-[#141414]/60 mt-2 font-sans">Central hub for site coordination and health monitoring.</p>
        </div>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-white border border-[#141414]/10 rounded-lg text-sm font-medium hover:bg-[#141414]/5 transition-colors">
            Export Report
          </button>
          <button className="px-4 py-2 bg-[#141414] text-white rounded-lg text-sm font-medium hover:bg-[#141414]/90 transition-colors">
            Add Project
          </button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="p-6 bg-white rounded-2xl shadow-sm border border-[#141414]/5 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div className="p-2 bg-[#F27D26]/10 rounded-xl text-[#F27D26]">
                  <Icon className="w-6 h-6" />
                </div>
                <div className={cn(
                  "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full",
                  stat.trend === 'up' ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                )}>
                  {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {stat.change}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium text-[#141414]/40 uppercase tracking-wider">{stat.label}</p>
                <p className="text-3xl font-bold text-[#141414] mt-1">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-8 bg-white rounded-3xl shadow-sm border border-[#141414]/5">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-[#141414]">Project Progress</h3>
            <div className="flex gap-2">
              <span className="flex items-center gap-2 text-xs font-medium text-[#141414]/40">
                <div className="w-3 h-3 rounded-full bg-[#F27D26]" /> Progress (%)
              </span>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={projectData}>
                <defs>
                  <linearGradient id="colorProgress" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F27D26" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#F27D26" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#141414/5" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#141414/40', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#141414/40', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{backgroundColor: '#141414', border: 'none', borderRadius: '12px', color: '#fff'}}
                  itemStyle={{color: '#fff'}}
                />
                <Area type="monotone" dataKey="progress" stroke="#F27D26" strokeWidth={3} fillOpacity={1} fill="url(#colorProgress)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-8 bg-[#141414] rounded-3xl shadow-sm text-white">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold">Worker Health Index</h3>
            <div className="flex gap-2">
              <span className="flex items-center gap-2 text-xs font-medium text-white/40">
                <div className="w-3 h-3 rounded-full bg-green-400" /> Avg. Performance
              </span>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={projectData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.4)', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.4)', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{backgroundColor: '#fff', border: 'none', borderRadius: '12px', color: '#141414'}}
                  itemStyle={{color: '#141414'}}
                />
                <Line type="monotone" dataKey="health" stroke="#4ADE80" strokeWidth={3} dot={{fill: '#4ADE80', strokeWidth: 2, r: 4}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity & AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 p-8 bg-white rounded-3xl shadow-sm border border-[#141414]/5">
          <h3 className="text-xl font-bold text-[#141414] mb-6">Site Activity</h3>
          <div className="space-y-6">
            {[
              { icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-50', title: 'Foundation Completed', time: '2 hours ago', desc: 'Project Alpha foundation work has been verified by AI.' },
              { icon: Clock, color: 'text-blue-500', bg: 'bg-blue-50', title: 'Steel Delivery Pending', time: '4 hours ago', desc: 'Expected delivery from Stahlbau GmbH at 14:00.' },
              { icon: AlertCircle, color: 'text-orange-500', bg: 'bg-orange-50', title: 'Worker Fatigue Alert', time: '5 hours ago', desc: 'Team B shows high physical exertion. AI suggests mandatory break.' },
            ].map((activity, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-2xl hover:bg-[#F5F5F5] transition-colors group">
                <div className={cn("p-3 rounded-xl h-fit", activity.bg, activity.color)}>
                  <activity.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-[#141414]">{activity.title}</h4>
                    <span className="text-xs text-[#141414]/40 font-medium">{activity.time}</span>
                  </div>
                  <p className="text-sm text-[#141414]/60 mt-1">{activity.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 bg-[#F27D26] rounded-3xl shadow-sm text-white relative overflow-hidden">
          <div className="relative z-10">
            <div className="p-3 bg-white/20 rounded-2xl w-fit mb-6">
              <MessageSquareCode className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-4">AI Insights</h3>
            <p className="text-white/80 text-sm leading-relaxed mb-6">
              "Based on current material prices and worker fatigue levels, I recommend rescheduling the roofing phase to next Tuesday to optimize costs and safety."
            </p>
            <button className="w-full py-3 bg-white text-[#F27D26] rounded-xl font-bold hover:bg-white/90 transition-colors">
              View Recommendations
            </button>
          </div>
          {/* Abstract background element */}
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        </div>
      </div>
    </div>
  );
}
