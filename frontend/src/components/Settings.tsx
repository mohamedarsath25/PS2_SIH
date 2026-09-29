import { useState } from 'react';
import { Save, ShieldAlert, Cpu, Network, Palette, Settings2 } from 'lucide-react';

export default function Settings() {
  const [config, setConfig] = useState({
    theme: 'dark',
    aiMode: 'real',
    sttProvider: 'browser_native',
    ttsProvider: 'browser_native',
    defaultLanguage: 'en',
    defaultBitrate: 1200,
    packetSize: 256,
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">System Settings</h2>
          <p className="text-gray-400 mt-1">Configure prototype parameters and AI integration.</p>
        </div>
        <button 
          onClick={handleSave}
          className="btn-primary flex items-center gap-2"
        >
          <Save className="w-4 h-4" /> {saved ? 'Saved!' : 'Save Configuration'}
        </button>
      </div>

      {config.aiMode === 'demo' && (
        <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4 flex items-start gap-4">
          <ShieldAlert className="w-6 h-6 text-orange-400 shrink-0" />
          <div>
            <h4 className="text-orange-400 font-semibold">Demo Mode Active</h4>
            <p className="text-sm text-gray-300 mt-1">
              The system is currently running in deterministic simulation mode for hackathon presentation purposes. 
              External AI APIs for STT and NLP are mocked locally to ensure a reliable demonstration without network dependencies.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Core Settings */}
        <div className="glass-panel p-6 space-y-6">
          <h3 className="text-lg font-semibold flex items-center gap-2 border-b border-border pb-2 text-primary">
            <Cpu className="w-5 h-5" /> AI & Models
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Operating Mode</label>
              <select 
                value={config.aiMode}
                onChange={e => setConfig({...config, aiMode: e.target.value})}
                className="w-full bg-black/30 border border-border rounded-lg p-2.5 text-white outline-none focus:border-primary"
              >
                <option value="demo">Demo / Simulation Mode (Local)</option>
                <option value="real">Real AI Integration (Requires API Keys)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">STT Provider</label>
              <select 
                value={config.sttProvider}
                onChange={e => setConfig({...config, sttProvider: e.target.value})}
                className="w-full bg-black/30 border border-border rounded-lg p-2.5 text-white outline-none focus:border-primary"
              >
                <option value="internal_sim">Internal Simulator</option>
                <option value="whisper" disabled>OpenAI Whisper (Pending Config)</option>
                <option value="bhashini" disabled>Bhashini STT (Pending Config)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">TTS Provider</label>
              <select 
                value={config.ttsProvider}
                onChange={e => setConfig({...config, ttsProvider: e.target.value})}
                className="w-full bg-black/30 border border-border rounded-lg p-2.5 text-white outline-none focus:border-primary"
              >
                <option value="browser_native">Browser Native Synthesis</option>
                <option value="elevenlabs" disabled>ElevenLabs (Pending Config)</option>
                <option value="bhashini" disabled>Bhashini TTS (Pending Config)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Network Settings */}
        <div className="glass-panel p-6 space-y-6">
          <h3 className="text-lg font-semibold flex items-center gap-2 border-b border-border pb-2 text-secondary">
            <Network className="w-5 h-5" /> Default Network Params
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Default Target Bitrate</label>
              <select 
                value={config.defaultBitrate}
                onChange={e => setConfig({...config, defaultBitrate: parseInt(e.target.value)})}
                className="w-full bg-black/30 border border-border rounded-lg p-2.5 text-white outline-none focus:border-primary"
              >
                <option value="300">300 bps (Extreme HF/VHF)</option>
                <option value="600">600 bps</option>
                <option value="1200">1200 bps (Standard Low-Bandwidth)</option>
                <option value="2400">2400 bps</option>
                <option value="9600">9600 bps</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Default Packet Size (Bytes)</label>
              <select 
                value={config.packetSize}
                onChange={e => setConfig({...config, packetSize: parseInt(e.target.value)})}
                className="w-full bg-black/30 border border-border rounded-lg p-2.5 text-white outline-none focus:border-primary"
              >
                <option value="64">64 Bytes</option>
                <option value="128">128 Bytes</option>
                <option value="256">256 Bytes</option>
                <option value="512">512 Bytes</option>
              </select>
            </div>
          </div>
        </div>

        {/* UI Settings */}
        <div className="glass-panel p-6 space-y-6 md:col-span-2">
          <h3 className="text-lg font-semibold flex items-center gap-2 border-b border-border pb-2 text-purple-400">
            <Palette className="w-5 h-5" /> Interface & Display
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Theme</label>
              <select 
                value={config.theme}
                onChange={e => setConfig({...config, theme: e.target.value})}
                className="w-full bg-black/30 border border-border rounded-lg p-2.5 text-white outline-none focus:border-primary"
              >
                <option value="dark">Dark Mode (Tactical)</option>
                <option value="light" disabled>Light Mode (Unavailable)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-2">Default Boot Language</label>
              <select 
                value={config.defaultLanguage}
                onChange={e => setConfig({...config, defaultLanguage: e.target.value})}
                className="w-full bg-black/30 border border-border rounded-lg p-2.5 text-white outline-none focus:border-primary"
              >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="ta">Tamil</option>
              </select>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
