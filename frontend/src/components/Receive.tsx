import { Headphones, Volume2, RadioReceiver, DownloadCloud } from 'lucide-react';
import { useState, useEffect } from 'react';
import { api } from '../lib/api';

export default function Receive() {
  const [lastMessage, setLastMessage] = useState<any>(null);

  useEffect(() => {
    // Poll the backend for the latest transmission history
    const interval = setInterval(() => {
      api.getHistory().then(data => {
        if (data && data.length > 0) {
          setLastMessage(data[0]);
        }
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Receiver Node</h2>
          <p className="text-gray-400 mt-1">Live decoding and reconstruction of incoming neural transmissions.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full text-sm font-medium animate-pulse">
          <RadioReceiver className="w-4 h-4" /> Listening on Channel 42...
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="glass-panel p-8 min-h-[300px] flex flex-col relative overflow-hidden">
            <h3 className="font-semibold text-lg flex items-center gap-2 text-primary mb-6">
              <DownloadCloud className="w-5 h-5" /> Incoming Message
            </h3>
            
            {lastMessage ? (
              <div className="flex-1 flex flex-col justify-center animate-in fade-in zoom-in duration-500">
                <div className="bg-black/30 border border-border/50 rounded-xl p-6 relative">
                  <div className="absolute top-0 right-0 -mt-3 -mr-3 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    {lastMessage.language.toUpperCase()}
                  </div>
                  <p className="text-2xl text-white font-medium leading-relaxed mb-4">
                    {lastMessage.original_message}
                  </p>
                  <div className="flex items-center gap-4 border-t border-border/50 pt-4 mt-2">
                    <button 
                      onClick={() => {
                        const utterance = new SpeechSynthesisUtterance(lastMessage.original_message);
                        const langMap: Record<string, string> = {
                          'en': 'en-US', 'hi': 'hi-IN', 'ta': 'ta-IN', 'te': 'te-IN',
                          'kn': 'kn-IN', 'ml': 'ml-IN', 'bn': 'bn-IN', 'mr': 'mr-IN',
                          'gu': 'gu-IN', 'pa': 'pa-IN'
                        };
                        utterance.lang = langMap[lastMessage.language] || 'en-US';
                        window.speechSynthesis.speak(utterance);
                      }}
                      className="btn-primary rounded-full p-3 shadow-lg shadow-primary/30 hover:scale-110 active:scale-95 transition-transform"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                    <span className="text-sm text-gray-400">Play reconstructed speech (TTS)</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-500 gap-4">
                <Headphones className="w-12 h-12 opacity-50" />
                <p>Waiting for incoming transmission...</p>
              </div>
            )}
            
            {/* Ambient scanning line effect */}
            <div className="absolute top-0 left-0 w-full h-1 bg-primary/20 shadow-[0_0_20px_rgba(14,165,233,0.5)] animate-[pulse_3s_ease-in-out_infinite] opacity-50"></div>
          </div>
        </div>

        <div className="glass-panel p-6 space-y-6">
          <h3 className="font-semibold border-b border-border pb-2">Decoder Telemetry</h3>
          
          <div className="space-y-4">
            <TelemetryRow label="Signal Quality" value={lastMessage ? `${(lastMessage.quality_score * 100).toFixed(0)}%` : '--'} color="text-green-400" />
            <TelemetryRow label="Packets Received" value={lastMessage ? `${lastMessage.packet_count - lastMessage.lost_packets}/${lastMessage.packet_count}` : '--'} color="text-white" />
            <TelemetryRow label="Lost Packets" value={lastMessage ? `${lastMessage.lost_packets}` : '--'} color="text-red-400" />
            <TelemetryRow label="Latency" value={lastMessage ? `${lastMessage.latency} ms` : '--'} color="text-yellow-400" />
            <TelemetryRow label="Compression" value={lastMessage ? `${(lastMessage.encoded_size / lastMessage.compressed_size).toFixed(2)}x` : '--'} color="text-primary" />
          </div>

          <div className="mt-8 pt-4 border-t border-border/50">
            <h4 className="text-xs text-gray-500 uppercase font-bold mb-3">Reconstruction Status</h4>
            <div className="bg-black/40 h-2 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-1000" 
                style={{ width: lastMessage ? `${lastMessage.quality_score * 100}%` : '0%' }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TelemetryRow({ label, value, color }: { label: string, value: string, color: string }) {
  return (
    <div className="flex justify-between items-center font-mono text-sm">
      <span className="text-gray-400">{label}</span>
      <span className={`font-bold ${color}`}>{value}</span>
    </div>
  );
}
