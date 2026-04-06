import React from 'react';
import { 
  Calendar, 
  Clock, 
  Users, 
  Package, 
  CheckCircle2, 
  AlertCircle,
  MoreVertical,
  Plus,
  Sparkles
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

const scheduleData = [
  { id: 1, task: 'Foundation Work', company: 'Betonbau AG', start: 'Oct 01', end: 'Oct 15', status: 'completed', progress: 100 },
  { id: 2, task: 'Steel Frame Construction', company: 'Stahlbau GmbH', start: 'Oct 16', end: 'Nov 05', status: 'in-progress', progress: 65 },
  { id: 3, task: 'Electrical Installations', company: 'Elektro-Expert', start: 'Nov 06', end: 'Nov 20', status: 'pending', progress: 0 },
  { id: 4, task: 'Roofing & Insulation', company: 'Dach & Fach', start: 'Nov 21', end: 'Dec 10', status: 'pending', progress: 0 },
  { id: 5, task: 'Interior Finishing', company: 'Innenausbau KG', start: 'Dec 11', end: 'Jan 20', status: 'pending', progress: 0 },
];

export function Scheduler() {
  return (
    <div className="p-8 space-y-8 bg-[#F5F5F5] min-h-screen">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-sans font-bold tracking-tight text-[#141414]">Construction Scheduler</h1>
          <p className="text-[#141414]/60 mt-2 font-sans">AI-driven site coordination and firm management.</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#141414]/10 rounded-lg text-sm font-medium hover:bg-[#141414]/5 transition-colors">
            <Calendar className="w-4 h-4" /> View Timeline
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#141414] text-white rounded-lg text-sm font-medium hover:bg-[#141414]/90 transition-colors">
            <Plus className="w-4 h-4" /> New Task
          </button>
        </div>
      </header>

      {/* Timeline View */}
      <div className="p-8 bg-white rounded-3xl shadow-sm border border-[#141414]/5">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-bold text-[#141414]">Project Timeline</h3>
          <div className="flex gap-4 text-sm font-medium text-[#141414]/40">
            <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-500" /> Completed</span>
            <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#F27D26]" /> In Progress</span>
            <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-gray-200" /> Pending</span>
          </div>
        </div>

        <div className="space-y-4">
          {scheduleData.map((item) => (
            <div key={item.id} className="group relative p-6 bg-[#F5F5F5]/50 rounded-2xl border border-transparent hover:border-[#F27D26]/20 hover:bg-white hover:shadow-xl transition-all duration-300">
              <div className="flex flex-wrap items-center gap-6">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm text-[#141414]">
                  {item.status === 'completed' ? <CheckCircle2 className="w-6 h-6 text-green-500" /> : 
                   item.status === 'in-progress' ? <Clock className="w-6 h-6 text-[#F27D26]" /> : 
                   <AlertCircle className="w-6 h-6 text-gray-300" />}
                </div>
                
                <div className="flex-1 min-w-[200px]">
                  <h4 className="font-bold text-lg text-[#141414]">{item.task}</h4>
                  <div className="flex items-center gap-4 mt-1 text-sm text-[#141414]/40 font-medium">
                    <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {item.company}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {item.start} - {item.end}</span>
                  </div>
                </div>

                <div className="w-48">
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className="text-[#141414]/40 uppercase tracking-wider">Progress</span>
                    <span className="text-[#F27D26]">{item.progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={cn(
                        "h-full transition-all duration-1000",
                        item.status === 'completed' ? "bg-green-500" : "bg-[#F27D26]"
                      )}
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>

                <button className="p-2 hover:bg-[#141414]/5 rounded-lg transition-colors text-[#141414]/40 hover:text-[#141414]">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
              
              {/* AI Suggestion Tooltip (Mock) */}
              {item.status === 'in-progress' && (
                <div className="mt-4 p-3 bg-[#F27D26]/5 rounded-xl border border-[#F27D26]/10 flex items-center gap-3 animate-pulse">
                  <Sparkles className="w-4 h-4 text-[#F27D26]" />
                  <p className="text-xs font-medium text-[#F27D26]">
                    AI Suggestion: Accelerate steel frame by 2 days to avoid upcoming rain forecast.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Site Coordination Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-8 bg-[#141414] rounded-3xl text-white">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Package className="w-6 h-6 text-[#F27D26]" /> Material Procurement
          </h3>
          <div className="space-y-4">
            {[
              { name: 'Structural Steel', status: 'In Transit', date: 'Oct 18', progress: 80 },
              { name: 'Cement (500 Bags)', status: 'Delivered', date: 'Oct 12', progress: 100 },
              { name: 'Electrical Cables', status: 'Ordered', date: 'Oct 25', progress: 20 },
            ].map((material, i) => (
              <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/10">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-bold">{material.name}</span>
                  <span className="text-xs px-2 py-1 bg-white/10 rounded-full text-white/60">{material.status}</span>
                </div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[#F27D26]" style={{ width: `${material.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 bg-white rounded-3xl border border-[#141414]/5">
          <h3 className="text-xl font-bold text-[#141414] mb-6 flex items-center gap-2">
            <Users className="w-6 h-6 text-[#F27D26]" /> Active Firms
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { name: 'Betonbau AG', workers: 12, rating: 4.8 },
              { name: 'Stahlbau GmbH', workers: 8, rating: 4.9 },
              { name: 'Elektro-Expert', workers: 0, rating: 4.5 },
              { name: 'Dach & Fach', workers: 0, rating: 4.7 },
            ].map((firm, i) => (
              <div key={i} className="p-4 bg-[#F5F5F5] rounded-2xl border border-transparent hover:border-[#F27D26]/20 transition-all">
                <p className="font-bold text-[#141414]">{firm.name}</p>
                <div className="flex justify-between items-center mt-2 text-xs font-medium text-[#141414]/40">
                  <span>{firm.workers} Workers</span>
                  <span className="text-[#F27D26]">★ {firm.rating}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 bg-[#F5F5F5] text-[#141414] rounded-xl font-bold hover:bg-[#141414]/5 transition-colors">
            Manage All Firms
          </button>
        </div>
      </div>
    </div>
  );
}
