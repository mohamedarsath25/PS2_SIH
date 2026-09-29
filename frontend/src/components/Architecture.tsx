import { Cpu, Mic, Network, HardDrive, Headphones } from 'lucide-react';

export default function Architecture() {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">System Architecture</h2>
        <p className="text-gray-400 mt-1">End-to-end data flow for the iTantra Neural Transceiver.</p>
      </div>

      <div className="glass-panel p-12">
        <div className="flex flex-col items-center max-w-3xl mx-auto relative">
          
          {/* Main Pipeline Line */}
          <div className="absolute top-8 bottom-8 left-1/2 w-1 bg-border -translate-x-1/2 z-0"></div>

          {/* Node 1: User Voice */}
          <ArchitectureNode 
            icon={<Mic />} 
            title="User Voice Input" 
            desc="Spoken Indian Language Audio" 
            color="border-primary text-primary" 
          />

          <FlowArrow />

          {/* Node 2: STT & NLP */}
          <ArchitectureNode 
            icon={<Cpu />} 
            title="STT & Semantic NLP" 
            desc="Speech-to-Text conversion and keyword extraction to remove redundancies." 
            color="border-purple-400 text-purple-400" 
          />

          <FlowArrow />

          {/* Node 3: Neural Encoder */}
          <ArchitectureNode 
            icon={<HardDrive />} 
            title="Neural Encoding & Compression" 
            desc="AI-assisted extreme compression representing sentences as highly dense vector representations." 
            color="border-secondary text-secondary" 
          />

          <FlowArrow />

          {/* Node 4: Radio Link */}
          <ArchitectureNode 
            icon={<Network />} 
            title="Low-Bitrate Radio Link" 
            desc="Simulated physical layer with packet loss, noise, and latency injection." 
            color="border-orange-400 text-orange-400" 
          />

          <FlowArrow />

          {/* Node 5: Decoder */}
          <ArchitectureNode 
            icon={<Cpu />} 
            title="Packet Recovery & Decoding" 
            desc="Reconstruction of semantics even from partial/corrupted packets." 
            color="border-purple-400 text-purple-400" 
          />

          <FlowArrow />

          {/* Node 6: Receiver output */}
          <ArchitectureNode 
            icon={<Headphones />} 
            title="TTS & Receiver Audio" 
            desc="Text-to-Speech playback of reconstructed language." 
            color="border-primary text-primary" 
          />
        </div>
      </div>
    </div>
  );
}

function ArchitectureNode({ icon, title, desc, color }: { icon: React.ReactNode, title: string, desc: string, color: string }) {
  return (
    <div className="relative z-10 w-full max-w-lg bg-card/90 border border-border p-6 rounded-xl shadow-lg flex items-start gap-4">
      <div className={`p-4 rounded-full border-2 bg-black/50 ${color} shadow-[0_0_15px_rgba(currentColor,0.2)]`}>
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function FlowArrow() {
  return (
    <div className="h-12 w-full flex justify-center items-center relative z-10 opacity-50">
      <div className="w-3 h-3 border-b-2 border-r-2 border-primary rotate-45"></div>
    </div>
  );
}
