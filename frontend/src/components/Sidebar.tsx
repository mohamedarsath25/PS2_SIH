import { NavLink } from 'react-router-dom';
import { 
  Activity, 
  Radio, 
  Mic, 
  Headphones, 
  BarChart2, 
  Clock, 
  Cpu, 
  Settings 
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { path: '/', label: 'Dashboard', icon: Activity },
  { path: '/transmit', label: 'Transmit', icon: Mic },
  { path: '/receive', label: 'Receive', icon: Headphones },
  { path: '/simulator', label: 'Radio Simulator', icon: Radio },
  { path: '/analytics', label: 'Analytics', icon: BarChart2 },
  { path: '/history', label: 'History', icon: Clock },
  { path: '/architecture', label: 'Architecture', icon: Cpu },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="w-64 border-r border-border bg-card/30 backdrop-blur flex flex-col h-full">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/50 relative overflow-hidden">
             <div className="absolute inset-0 bg-primary/30 animate-ping-slow"></div>
             <Radio className="w-5 h-5 text-primary relative z-10" />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-wide text-white">iTantra</h1>
            <p className="text-[10px] text-gray-400 font-mono">NEURAL TRANSCEIVER</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-medium",
              isActive 
                ? "bg-primary/10 text-primary border border-primary/20 shadow-[inset_0_0_15px_rgba(14,165,233,0.1)]" 
                : "text-gray-400 hover:text-white hover:bg-card/50"
            )}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </NavLink>
        ))}
      </nav>
      
      <div className="p-4 border-t border-border">
        <div className="bg-card/50 rounded-lg p-3 border border-border/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-400">System Status</span>
            <span className="flex h-2 w-2 rounded-full bg-secondary"></span>
          </div>
          <div className="text-sm font-mono text-secondary">ONLINE / SIM</div>
        </div>
      </div>
    </aside>
  );
}
