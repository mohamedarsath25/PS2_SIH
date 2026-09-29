import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { BarChart2, TrendingUp, Activity } from 'lucide-react';

const mockLatencyData = [
  { bitrate: '300', latency: 450, quality: 65 },
  { bitrate: '600', latency: 320, quality: 75 },
  { bitrate: '1200', latency: 200, quality: 85 },
  { bitrate: '2400', latency: 120, quality: 95 },
  { bitrate: '4800', latency: 80, quality: 98 },
  { bitrate: '9600', latency: 50, quality: 99 },
];

const mockLanguageData = [
  { lang: 'English', requests: 120 },
  { lang: 'Hindi', requests: 98 },
  { lang: 'Tamil', requests: 86 },
  { lang: 'Telugu', requests: 65 },
  { lang: 'Bengali', requests: 45 },
];

export default function Analytics() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">System Analytics</h2>
          <p className="text-gray-400 mt-1">Performance metrics for compression and radio link simulation.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel p-6 h-96 flex flex-col">
          <h3 className="font-semibold text-lg flex items-center gap-2 mb-6">
            <Activity className="w-5 h-5 text-primary" /> Bitrate vs Latency
          </h3>
          <div className="flex-1 w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockLatencyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="bitrate" stroke="#64748b" />
                <YAxis yAxisId="left" stroke="#0ea5e9" name="Latency (ms)" />
                <YAxis yAxisId="right" orientation="right" stroke="#10b981" name="Quality (%)" />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b' }} />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="latency" name="Latency (ms)" stroke="#0ea5e9" strokeWidth={3} />
                <Line yAxisId="right" type="monotone" dataKey="quality" name="Reconstruction Quality %" stroke="#10b981" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel p-6 h-96 flex flex-col">
          <h3 className="font-semibold text-lg flex items-center gap-2 mb-6">
            <BarChart2 className="w-5 h-5 text-secondary" /> Language Usage
          </h3>
          <div className="flex-1 w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockLanguageData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                <XAxis type="number" stroke="#64748b" />
                <YAxis dataKey="lang" type="category" stroke="#64748b" />
                <Tooltip cursor={{ fill: '#1e293b' }} contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b' }} />
                <Bar dataKey="requests" name="Transmissions" fill="#0ea5e9" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
