import { useState, useEffect } from 'react';
import { Activity, Signal, Wifi, Zap, Cpu, HardDrive, AlertTriangle } from 'lucide-react';

export default function Dashboard() {
  const [stats, setStats] = useState({
    avg_latency: 0,
    avg_quality: 0,
    total_messages: 0
  });

  useEffect(() => {
    // In a real app we would fetch from API
    // api.getAnalytics().then(setStats);
    setStats({
      avg_latency: 185.5,
      avg_quality: 0.94,
      total_messages: 128
    });
  }, []);

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">System Dashboard</h2>
          <p className="text-gray-400 mt-1">Real-time overview of the iTantra transceiver network.</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Zap className="w-4 h-4" /> Start Live Demo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={<Activity className="text-primary" />} 
          label="System Status" 
          value="Optimal" 
          subtext="All nodes online" 
        />
        <StatCard 
          icon={<Signal className="text-secondary" />} 
          label="Current Bitrate" 
          value="1200 bps" 
          subtext="Low bandwidth mode" 
        />
        <StatCard 
          icon={<Wifi className="text-orange-400" />} 
          label="Avg Latency" 
          value={`${stats.avg_latency} ms`} 
          subtext="End-to-end delay" 
        />
        <StatCard 
          icon={<Cpu className="text-purple-400" />} 
          label="Reconstruction" 
          value={`${(stats.avg_quality * 100).toFixed(1)}%`} 
          subtext="Average accuracy" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel p-6">
          <h3 className="text-lg font-semibold mb-4 border-b border-border pb-2">Network Activity</h3>
          <div className="h-64 flex items-center justify-center border border-border/50 rounded-lg bg-black/20">
            {/* Placeholder for chart */}
            <p className="text-gray-500 font-mono">Chart: Bandwidth vs Latency over time</p>
          </div>
        </div>
        
        <div className="glass-panel p-6 flex flex-col">
          <h3 className="text-lg font-semibold mb-4 border-b border-border pb-2">Emergency Monitoring</h3>
          <div className="flex-1 flex flex-col items-center justify-center space-y-4">
            <div className="w-24 h-24 rounded-full border-4 border-secondary flex items-center justify-center relative shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              <span className="text-2xl font-bold text-secondary">0</span>
            </div>
            <p className="text-gray-400 text-center text-sm">Active Emergency<br/>Transmissions</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, subtext }: { icon: React.ReactNode, label: string, value: string, subtext: string }) {
  return (
    <div className="glass-panel p-5 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        {icon}
      </div>
      <div className="flex items-center gap-4 mb-3">
        <div className="p-2 bg-card rounded-lg border border-border">
          {icon}
        </div>
        <h3 className="text-sm font-medium text-gray-400">{label}</h3>
      </div>
      <div className="text-2xl font-bold mb-1">{value}</div>
      <p className="text-xs text-gray-500">{subtext}</p>
    </div>
  );
}
