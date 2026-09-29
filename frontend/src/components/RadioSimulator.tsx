import { useState } from 'react';
import { Radio, Activity, Settings2, Sliders } from 'lucide-react';

export default function RadioSimulator() {
  const [config, setConfig] = useState({
    bitrate: 1200,
    packetLoss: 10,
    noise: 5,
    latency: 200,
  });

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Radio Link Simulator</h2>
          <p className="text-gray-400 mt-1">Configure and observe the simulated physical layer communication channel.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 space-y-6 col-span-1">
          <h3 className="font-semibold text-lg flex items-center gap-2 border-b border-border pb-2">
            <Settings2 className="w-5 h-5 text-primary" /> Channel Configuration
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="flex justify-between text-sm text-gray-400 mb-1">
                <span>Bitrate (bps)</span>
                <span className="text-white">{config.bitrate}</span>
              </label>
              <input type="range" min="300" max="9600" step="300" value={config.bitrate} onChange={e => setConfig({...config, bitrate: parseInt(e.target.value)})} className="w-full accent-primary" />
            </div>
            
            <div>
              <label className="flex justify-between text-sm text-gray-400 mb-1">
                <span>Packet Loss (%)</span>
                <span className="text-white">{config.packetLoss}%</span>
              </label>
              <input type="range" min="0" max="50" value={config.packetLoss} onChange={e => setConfig({...config, packetLoss: parseInt(e.target.value)})} className="w-full accent-primary" />
            </div>

            <div>
              <label className="flex justify-between text-sm text-gray-400 mb-1">
                <span>Noise Level (dB)</span>
                <span className="text-white">{config.noise}</span>
              </label>
              <input type="range" min="0" max="20" value={config.noise} onChange={e => setConfig({...config, noise: parseInt(e.target.value)})} className="w-full accent-primary" />
            </div>

            <div>
              <label className="flex justify-between text-sm text-gray-400 mb-1">
                <span>Latency (ms)</span>
                <span className="text-white">{config.latency}</span>
              </label>
              <input type="range" min="50" max="2000" step="50" value={config.latency} onChange={e => setConfig({...config, latency: parseInt(e.target.value)})} className="w-full accent-primary" />
            </div>
          </div>

          <div className="pt-4 space-y-2">
            <button 
              onClick={() => setConfig({ bitrate: 9600, packetLoss: 1, noise: 2, latency: 50 })}
              className="btn-secondary w-full text-sm"
            >
              Preset: Excellent (Urban)
            </button>
            <button 
              onClick={() => setConfig({ bitrate: 2400, packetLoss: 15, noise: 12, latency: 350 })}
              className="btn-secondary w-full text-sm"
            >
              Preset: Poor (Rural/Forest)
            </button>
            <button 
              onClick={() => setConfig({ bitrate: 600, packetLoss: 35, noise: 18, latency: 800 })}
              className="btn-destructive w-full text-sm"
            >
              Preset: Emergency Low-Bitrate
            </button>
          </div>
        </div>

        <div className="col-span-2 space-y-6">
          <div className="glass-panel p-6 h-64 flex flex-col">
            <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-secondary" /> Signal Waveform
            </h3>
            <div className="flex-1 border border-border/50 rounded bg-black/30 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(16,185,129,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.2)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
              <div className="w-full h-1/2 border-b border-secondary/50 relative">
                {/* Simulated sine wave via CSS for visual effect */}
                <svg className="absolute w-full h-full text-secondary stroke-current opacity-80" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <path d="M0,50 Q10,10 20,50 T40,50 T60,50 T80,50 T100,50" fill="none" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 h-64 flex flex-col">
            <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
              <Radio className="w-5 h-5 text-primary" /> Packet Transmission Animation
            </h3>
            <div className="flex-1 border border-border/50 rounded bg-black/30 flex items-center justify-between p-8 relative">
              <div className="text-center z-10">
                <div className="w-16 h-16 rounded bg-card border-2 border-primary flex items-center justify-center mb-2 shadow-[0_0_15px_rgba(14,165,233,0.3)]">TX</div>
                <span className="text-xs text-gray-400">Transmitter</span>
              </div>
              
              <div className="flex-1 mx-4 relative h-8">
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2"></div>
                {/* Packets */}
                <div className="absolute top-1/2 left-[20%] w-3 h-3 bg-primary rounded-full -translate-y-1/2 shadow-lg shadow-primary"></div>
                <div className="absolute top-1/2 left-[50%] w-3 h-3 bg-red-500 rounded-full -translate-y-1/2 opacity-50"></div> {/* Dropped packet */}
                <div className="absolute top-1/2 left-[80%] w-3 h-3 bg-secondary rounded-full -translate-y-1/2 shadow-lg shadow-secondary"></div>
              </div>

              <div className="text-center z-10">
                <div className="w-16 h-16 rounded bg-card border-2 border-secondary flex items-center justify-center mb-2 shadow-[0_0_15px_rgba(16,185,129,0.3)]">RX</div>
                <span className="text-xs text-gray-400">Receiver</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
