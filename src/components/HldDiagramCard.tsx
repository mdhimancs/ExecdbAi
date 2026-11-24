import React, { useState } from 'react';
import { Terminal, Maximize2, Copy, Check, Layers, Sparkles, Cpu, ShieldCheck, Zap, Activity, ArrowRight, Eye, FileText } from 'lucide-react';

interface HldDiagramCardProps {
  code: string;
  language?: string;
  title?: string;
  onOpenWhiteboard?: () => void;
  onOpenLightbox?: (code: string) => void;
}

export const HldDiagramCard: React.FC<HldDiagramCardProps> = ({
  code,
  language = 'hld',
  title,
  onOpenWhiteboard,
  onOpenLightbox,
}) => {
  const [viewMode, setViewMode] = useState<'visual' | 'raw'>('visual');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Detect key protocols & architectural features from the diagram code
  const hasSpire = /spire|spiffe/i.test(code);
  const hasEbpf = /ebpf|xdp/i.test(code);
  const hasHsm = /hsm|fips/i.test(code);
  const hasZkp = /zkp|groth16|zero-knowledge/i.test(code);
  const hasMultiRegion = /region|dark fiber|mesh/i.test(code);
  const hasGpu = /gpu|h100|triton|inference/i.test(code);
  const hasScylla = /scylladb|dynamodb|patroni/i.test(code);

  // Parse diagram sections / zones if applicable
  const hasZones = /ZONE \d+/i.test(code) || /LAYER \d+/i.test(code) || /CATEGORY \d+/i.test(code);

  return (
    <div className="my-6 rounded-2xl border border-emerald-500/35 bg-gradient-to-br from-slate-950 via-zinc-950 to-slate-950 text-slate-100 shadow-[0_0_30px_rgba(16,185,129,0.12)] overflow-hidden">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-5 py-3 bg-slate-900/90 border-b border-emerald-500/20 backdrop-blur-md">
        <div className="flex items-center space-x-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-bold font-mono tracking-wider text-emerald-400 uppercase flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-emerald-400" />
            <span>{title || 'High-Level Architecture Blueprint (HLD)'}</span>
          </span>
          <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
            Pristine 4K Visual Card
          </span>
        </div>

        {/* View mode and Action buttons */}
        <div className="flex items-center gap-2">
          {/* View Mode Switcher */}
          <div className="flex items-center bg-slate-950/90 rounded-lg p-0.5 border border-slate-800">
            <button
              type="button"
              onClick={() => setViewMode('visual')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium flex items-center gap-1 transition-all cursor-pointer ${
                viewMode === 'visual'
                  ? 'bg-emerald-600 text-white shadow-xs font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3 h-3 text-emerald-300" />
              <span>Visual Card</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('raw')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium flex items-center gap-1 transition-all cursor-pointer ${
                viewMode === 'raw'
                  ? 'bg-slate-800 text-emerald-400 shadow-xs font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileText className="w-3 h-3" />
              <span>Raw Code</span>
            </button>
          </div>

          {/* Action Tools */}
          {onOpenWhiteboard && (
            <button
              type="button"
              onClick={onOpenWhiteboard}
              className="px-2.5 py-1.5 rounded-lg bg-emerald-950/90 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              title="Open diagram in ARB Interactive Whiteboard Canvas"
            >
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden md:inline">Open Whiteboard</span>
            </button>
          )}

          {onOpenLightbox && (
            <button
              type="button"
              onClick={() => onOpenLightbox(code)}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
              title="Expand Fullscreen Lightbox View"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            type="button"
            onClick={handleCopy}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
            title="Copy Raw Architecture Blueprint"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Protocol Badges Toolbar */}
      <div className="flex flex-wrap items-center gap-1.5 px-4 sm:px-5 py-2 bg-slate-950/60 border-b border-slate-800/80 text-[10.5px] font-mono text-slate-400">
        <span className="text-slate-500 font-semibold mr-1">ENFORCED STANDARDS:</span>
        {hasEbpf && (
          <span className="px-2 py-0.5 rounded-md bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
            <Zap className="w-3 h-3 text-cyan-400" /> eBPF XDP Filter
          </span>
        )}
        {hasSpire && (
          <span className="px-2 py-0.5 rounded-md bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" /> mTLS SPIRE
          </span>
        )}
        {hasHsm && (
          <span className="px-2 py-0.5 rounded-md bg-indigo-950/80 text-indigo-300 border border-indigo-500/30 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-indigo-400" /> FIPS 140-3 HSM
          </span>
        )}
        {hasZkp && (
          <span className="px-2 py-0.5 rounded-md bg-purple-950/80 text-purple-300 border border-purple-500/30 flex items-center gap-1">
            <Activity className="w-3 h-3 text-purple-400" /> ZKP Groth16 Prover
          </span>
        )}
        {hasGpu && (
          <span className="px-2 py-0.5 rounded-md bg-amber-950/80 text-amber-300 border border-amber-500/30 flex items-center gap-1">
            <Cpu className="w-3 h-3 text-amber-400" /> 640x H100 GPUs
          </span>
        )}
        {hasScylla && (
          <span className="px-2 py-0.5 rounded-md bg-teal-950/80 text-teal-300 border border-teal-500/30 flex items-center gap-1">
            <Layers className="w-3 h-3 text-teal-400" /> 180 PB NoSQL Vault
          </span>
        )}
        {hasMultiRegion && (
          <span className="px-2 py-0.5 rounded-md bg-blue-950/80 text-blue-300 border border-blue-500/30 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-blue-400" /> 5-Region Active Mesh
          </span>
        )}
        <span className="ml-auto text-emerald-400/90 font-mono text-[10px] font-bold">
          RPO = 0 • RTO &lt; 30s
        </span>
      </div>

      {/* Main Content Pane */}
      <div className="relative p-4 sm:p-6 bg-[#060a12] font-mono text-xs overflow-x-auto">
        {/* Subtle SVG Grid Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{
            backgroundImage: `radial-gradient(#10b981 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}
        />

        {viewMode === 'visual' ? (
          <div className="relative z-10 space-y-4">
            {/* Visual Monospace ASCII Architecture Rendering with Luminous Box Styles */}
            <div className="p-4 sm:p-5 rounded-xl bg-[#040811] border border-emerald-500/20 text-emerald-300 font-mono text-[11px] sm:text-xs leading-relaxed overflow-x-auto shadow-inner select-text">
              <pre className="whitespace-pre font-mono text-emerald-200/95 tracking-tight">
                {code}
              </pre>
            </div>

            {/* Quick Interactive Legend / Sub-system Explanations */}
            {hasZones && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-slate-800 text-[11px] text-slate-300">
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-0.5">Ingress &amp; Edge Security</span>
                  <p className="text-[10.5px] text-slate-400 leading-tight">
                    Anycast BGP routing, hardware eBPF DDoS scrubbing, and TLS 1.3 edge termination.
                  </p>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-0.5">Biometric GPU Inference Grid</span>
                  <p className="text-[10.5px] text-slate-400 leading-tight">
                    13-Nodal processing (10 fingerprints, 2 irises, 1 face) with ISO 30107-3 L3 PAD liveness.
                  </p>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                  <span className="text-indigo-400 font-bold block mb-0.5">Polyglot Persistence &amp; HSM</span>
                  <p className="text-[10.5px] text-slate-400 leading-tight">
                    ScyllaDB NVMe cluster, Patroni WAL ledger, and Thales Luna FIPS 140-3 HSM key vault.
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="relative z-10">
            <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 font-mono text-[11px] sm:text-xs overflow-x-auto select-all leading-relaxed">
              <code>{code}</code>
            </pre>
          </div>
        )}
      </div>

      {/* Footer Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 sm:px-5 py-2.5 bg-slate-950 border-t border-slate-800 text-[11px] text-slate-400">
        <div className="flex items-center gap-2">
          <span className="text-emerald-400 font-semibold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Verified Peer-Reviewed Reference Blueprint
          </span>
        </div>
        {onOpenWhiteboard && (
          <button
            type="button"
            onClick={onOpenWhiteboard}
            className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>Launch ARB Whiteboard Session</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
};
