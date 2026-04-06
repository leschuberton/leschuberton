import React from 'react';
import { 
  LayoutDashboard, 
  MessageSquareCode, 
  CalendarRange, 
  Package, 
  Activity, 
  Settings,
  Building2,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

export type ViewType = 'dashboard' | 'ai-assistant' | 'scheduler' | 'materials' | 'health' | 'settings';

interface SidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'ai-assistant', label: 'AI Architect & Broker', icon: MessageSquareCode },
  { id: 'scheduler', label: 'Construction Scheduler', icon: CalendarRange },
  { id: 'materials', label: 'Material Hub', icon: Package },
  { id: 'health', label: 'Worker Health', icon: Activity },
  { id: 'settings', label: 'Settings', icon: Settings },
] as const;

export function Sidebar({ currentView, onViewChange }: SidebarProps) {
  return (
    <aside className="w-64 bg-[#141414] text-[#E4E3E0] flex flex-col h-screen border-r border-[#141414]/20">
      <div className="p-6 flex items-center gap-3 border-bottom border-[#E4E3E0]/10">
        <Building2 className="w-8 h-8 text-[#F27D26]" />
        <span className="font-sans font-bold text-xl tracking-tight">BuildSync AI</span>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group",
                isActive 
                  ? "bg-[#F27D26] text-white shadow-lg shadow-[#F27D26]/20" 
                  : "hover:bg-[#E4E3E0]/10 text-[#E4E3E0]/60 hover:text-[#E4E3E0]"
              )}
            >
              <Icon className={cn("w-5 h-5", isActive ? "text-white" : "text-[#E4E3E0]/40 group-hover:text-[#E4E3E0]")} />
              <span className="font-sans font-medium text-sm">{item.label}</span>
              {isActive && <ChevronRight className="ml-auto w-4 h-4" />}
            </button>
          );
        })}
      </nav>
      
      <div className="p-6 border-t border-[#E4E3E0]/10">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-[#E4E3E0]/5">
          <div className="w-10 h-10 rounded-full bg-[#F27D26]/20 flex items-center justify-center text-[#F27D26] font-bold">
            LS
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Leon Schulle</p>
            <p className="text-xs text-[#E4E3E0]/40 truncate">Project Lead</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
