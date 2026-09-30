import { useState, useRef } from 'react';
import { Mic, Send, AlertTriangle, Square, Trash2, Radio } from 'lucide-react';
import { api, TransmissionResult } from '../lib/api';

const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "Hindi" },
  { code: "ta", name: "Tamil" },
  { code: "te", name: "Telugu" },
  { code: "kn", name: "Kannada" },
  { code: "ml", name: "Malayalam" },
  { code: "bn", name: "Bengali" },
  { code: "mr", name: "Marathi" },
  { code: "gu", name: "Gujarati" },
  { code: "pa", name: "Punjabi" }
];

export default function Transmit() {
  const [isRecording, setIsRecording] = useState(false);
  const [text, setText] = useState('');
  const [language, setLanguage] = useState('hi');
  const [emergency, setEmergency] = useState(false);
  const [status, setStatus] = useState('Idle');
  const [result, setResult] = useState<TransmissionResult | null>(null);
  
  const handleRecord = () => {
    if (isRecording) {
      setIsRecording(false);
      setStatus('Ready to transmit');
      // We don't have direct access to stop the recognition instance here without a ref,
      // but it will timeout automatically.
    } else {
      setIsRecording(true);
      setStatus('Listening (Speak now)...');
      
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        const langMap: Record<string, string> = {
          'en': 'en-IN', 'hi': 'hi-IN', 'ta': 'ta-IN', 'te': 'te-IN',
          'kn': 'kn-IN', 'ml': 'ml-IN', 'bn': 'bn-IN', 'mr': 'mr-IN',
          'gu': 'gu-IN', 'pa': 'pa-IN'
        };
        recognition.lang = langMap[language] || 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setText(prev => prev ? prev + ' ' + transcript : transcript);
          setStatus('Ready to transmit');
        };

        recognition.onerror = (event: any) => {
          console.error("Speech recognition error", event.error);
          setStatus('Mic error. Try typing.');
        };
        
        recognition.onend = () => {
          setIsRecording(false);
        };

        recognition.start();
      } else {
        setStatus('Speech API not supported in browser. Simulation fallback...');
        setTimeout(() => {
          setText("Emergency. There is a medical issue at the base station.");
          setStatus('Ready to transmit');
          setIsRecording(false);
        }, 1000);
      }
    }
  };

  const handleSend = async () => {
    if (!text) return;
    setStatus('Encoding and Transmitting...');
    setResult(null);
    try {
      // Simulate API call for prototype
      const res = await api.transmit(text, language, emergency);
      setResult(res);
      setStatus('Transmission Complete');
    } catch (error) {
      console.error(error);
      setStatus('Transmission Failed');
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Voice Transmitter</h2>
          <p className="text-gray-400 mt-1">Encode and send multilingual messages over low-bitrate links.</p>
        </div>
        <div className="flex items-center gap-4">
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-card border border-border text-white text-sm rounded-lg focus:ring-primary focus:border-primary block p-2.5"
          >
            {languages.map(l => (
              <option key={l.code} value={l.code}>{l.name}</option>
            ))}
          </select>
          <button 
            onClick={() => setEmergency(!emergency)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              emergency 
                ? 'bg-destructive/20 text-destructive border border-destructive shadow-[0_0_15px_rgba(239,68,68,0.3)]' 
                : 'bg-card border border-border text-gray-400 hover:text-white'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            {emergency ? 'EMERGENCY MODE ACTIVE' : 'Emergency Mode'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-6 space-y-4 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Mic className="w-5 h-5 text-primary" /> Input Message
            </h3>
            <span className="text-xs font-mono text-gray-500 bg-black/30 px-2 py-1 rounded">{status}</span>
          </div>
          
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Record speech or type message here..."
            className="w-full flex-1 min-h-[150px] bg-black/20 border border-border rounded-lg p-4 text-white focus:outline-none focus:border-primary/50 resize-none font-mono text-sm"
          />
          
          <div className="flex items-center justify-between pt-2">
            <div className="flex gap-2">
              <button 
                onClick={handleRecord}
                className={`btn-primary rounded-full p-4 flex items-center justify-center ${isRecording ? 'bg-destructive hover:bg-destructive shadow-[0_0_15px_rgba(239,68,68,0.5)] animate-pulse' : ''}`}
              >
                {isRecording ? <Square className="w-5 h-5 fill-current" /> : <Mic className="w-5 h-5" />}
              </button>
              <button 
                onClick={() => setText('')}
                className="btn-secondary rounded-full p-4 flex items-center justify-center"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
            <button 
              onClick={handleSend}
              disabled={!text || isRecording || status === 'Encoding and Transmitting...'}
              className="btn-primary flex items-center gap-2 px-8 py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" /> Transmit
            </button>
          </div>
        </div>

        {/* Pipeline Visualization */}
        <div className="glass-panel p-6 overflow-hidden relative">
          <h3 className="font-semibold text-lg mb-6 flex items-center gap-2">
            <Radio className="w-5 h-5 text-secondary" /> Transmission Pipeline
          </h3>
          
          <div className="space-y-4 relative z-10 font-mono text-sm">
            <PipelineStep active={status.includes('Transmitting')} label="Semantic Encoding" data={result ? `Extracted ${result.compressed_size} bytes` : '...'} />
            <div className="h-4 border-l-2 border-dashed border-border ml-4"></div>
            <PipelineStep active={status.includes('Transmitting')} label="Neural Compression" data={result ? `Ratio: ${result.compression_ratio}x` : '...'} />
            <div className="h-4 border-l-2 border-dashed border-border ml-4"></div>
            <PipelineStep active={status.includes('Transmitting')} label="Low-Bitrate Radio Link" data={result ? `${result.packet_count} pkts sent, ${result.lost_packets} lost` : '...'} isRadio />
            <div className="h-4 border-l-2 border-dashed border-border ml-4"></div>
            <PipelineStep active={!!result} label="Packet Recovery & Decoding" data={result ? `Quality: ${(result.quality_score * 100).toFixed(0)}%` : '...'} />
            <div className="h-4 border-l-2 border-dashed border-border ml-4"></div>
            <PipelineStep active={!!result} label="Receiver Output" data={result ? 'Reconstructed' : '...'} isFinal />
          </div>
        </div>
      </div>

      {result && (
        <div className="glass-panel p-6 animate-in slide-in-from-bottom-4 fade-in duration-500">
          <h3 className="font-semibold text-lg mb-4 text-green-400">Transmission Results</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <ResultMetric label="Original Size" value={`${result.original_size} B`} />
            <ResultMetric label="Compressed Size" value={`${result.compressed_size} B`} />
            <ResultMetric label="Compression Ratio" value={`${result.compression_ratio}x`} />
            <ResultMetric label="Latency" value={`${result.latency.toFixed(1)} ms`} />
          </div>
          <div className="bg-black/40 border border-border rounded-lg p-4">
            <h4 className="text-xs text-gray-500 mb-2 uppercase tracking-wider">Reconstructed Message at Receiver</h4>
            <p className="text-lg text-white font-medium">{result.reconstructed_text}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function PipelineStep({ active, label, data, isRadio = false, isFinal = false }: { active: boolean, label: string, data: string, isRadio?: boolean, isFinal?: boolean }) {
  return (
    <div className={`flex items-center gap-4 p-3 rounded-lg border transition-all ${
      active 
        ? isRadio 
          ? 'bg-blue-900/20 border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.2)]' 
          : 'bg-primary/10 border-primary/30' 
        : 'bg-card/50 border-border opacity-50'
    }`}>
      <div className={`w-3 h-3 rounded-full ${active ? 'bg-primary shadow-[0_0_10px_rgba(14,165,233,0.8)]' : 'bg-gray-600'}`}></div>
      <div className="flex-1">
        <div className={`font-semibold ${active ? 'text-white' : 'text-gray-400'}`}>{label}</div>
      </div>
      <div className={`text-xs ${active ? 'text-primary' : 'text-gray-500'}`}>{data}</div>
    </div>
  );
}

function ResultMetric({ label, value }: { label: string, value: string }) {
  return (
    <div className="bg-black/20 border border-border/50 rounded-lg p-3">
      <div className="text-xs text-gray-400 mb-1">{label}</div>
      <div className="text-xl font-bold">{value}</div>
    </div>
  );
}
