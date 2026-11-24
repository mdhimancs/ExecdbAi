import React, { useState } from 'react';
import { 
  Layers, 
  Cpu, 
  Server, 
  ShieldCheck, 
  HardDrive, 
  Database, 
  Network, 
  Lock, 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  Activity, 
  Sparkles, 
  Eye, 
  Fingerprint, 
  Sliders, 
  Play, 
  RotateCcw,
  BookOpen,
  Info,
  CreditCard,
  Building2,
  ShieldAlert,
  Scale
} from 'lucide-react';
import { BlogPost } from '../types';

interface WhiteboardSessionViewProps {
  post: BlogPost;
  onSwitchToManuscript?: () => void;
}

type LayerFilter = 'all' | 'geo' | 'banking' | 'gov' | 'fraud' | 'ingress' | 'k8s' | 'biometric' | 'storage' | 'security';

interface SequenceStep {
  step: number;
  title: string;
  component: string;
  latency: string;
  detail: string;
  zone: string;
}

const SEQUENCE_STEPS: SequenceStep[] = [
  {
    step: 1,
    title: "Global Geo-DNS & BGP Anycast Routing",
    component: "Border Routers & Anycast PoPs",
    latency: "8 - 14 ms",
    detail: "Citizen request hits nearest regional PoP via BGP Anycast. Equal-Cost Multi-Path (ECMP) directs packet to active regional data center.",
    zone: "Zone 0 (Edge)"
  },
  {
    step: 2,
    title: "eBPF XDP Hardware DDoS Scrubbing & TLS 1.3",
    component: "Edge Scrubbing & Varnish/Envoy Reverse Proxy",
    latency: "2.8 ms",
    detail: "NIC-level eBPF XDP drops volumetric SYN floods. Hardware QAT accelerates TLS 1.3 handshake; public trust anchors cached locally in RAM.",
    zone: "Zone 1 (CDN Tier)"
  },
  {
    step: 3,
    title: "Cilium eBPF Ambient Mesh & SPIFFE mTLS",
    component: "App Ingress Gateway & SPIRE Attestation",
    latency: "0.22 ms",
    detail: "Kernel-level kTLS establishes mutual authentication without userspace sidecar hops. Pod identity verified against hardware TPM 2.0 PCRs.",
    zone: "Zone 2 (App K8s)"
  },
  {
    step: 4,
    title: "Fraud-Proof Liveness PAD Check (ISO 30107-3 Level 3)",
    component: "Multi-Spectral Hardware Sensor & Anti-Deepfake Filter",
    latency: "14.2 ms",
    detail: "Validates pulse oximetry on fingerprints, pupil dynamic dilation on irises, 3D laser depth mesh on face, and eliminates AI deepfake diffusion artifacts.",
    zone: "Zone 3 (GPU Cluster)"
  },
  {
    step: 5,
    title: "WSQ & JPEG 2000 Image Decompression",
    component: "Biometric Preprocessing Ingest Pods",
    latency: "12.5 ms",
    detail: "FBI-certified WSQ decompressor unrolls 10 fingerprint slaps at 500 DPI. Lossless JP2 decompressor reconstructs 2 iris NIR rasters and 4K face.",
    zone: "Zone 3 (GPU Cluster)"
  },
  {
    step: 6,
    title: "13-Nodal Feature Extraction & Quality Gating",
    component: "NVIDIA H100 Triton Inference Server",
    latency: "38.6 ms",
    detail: "NIST NFIQ 2.0 validates fingerprint quality. Daugman 2D Gabor extracts 2048-bit IrisCodes; RetinaFace + ArcFace yields 512-dim unit vector.",
    zone: "Zone 3 (GPU Cluster)"
  },
  {
    step: 7,
    title: "GPU HNSW Vector Search & Multi-Modal Fusion",
    component: "Milvus/FAISS GPU Vector Index Engine",
    latency: "62.4 ms",
    detail: "IVF-PQ64 coarse search narrows 39 Billion vectors to top-50 candidates. Dynamic quality-weighted fusion S_fused computes final match.",
    zone: "Zone 3 (GPU Cluster)"
  },
  {
    step: 8,
    title: "Banking Token Binding & Non-Repudiation Signature",
    component: "Financial Identity Gateway & HSM Proxy",
    latency: "4.2 ms",
    detail: "Cryptographically binds biometric proof to transaction context (Sign_HSM(CitizenID + Amount + IBAN + Nonce)), generating zero-knowledge assertion.",
    zone: "Zone 2 & Zone 5 (Vault)"
  },
  {
    step: 9,
    title: "Local NoSQL NVMe Commit & Multi-Region Sync",
    component: "ScyllaDB NoSQL + Patroni PostgreSQL",
    latency: "0.48 ms",
    detail: "Digital envelope-encrypted template committed to ScyllaDB with LOCAL_QUORUM. Asynchronous vector CRDT log streamed to other 4 regions.",
    zone: "Zone 4 (Persistence)"
  }
];

export const WhiteboardSessionView: React.FC<WhiteboardSessionViewProps> = ({
  post,
  onSwitchToManuscript
}) => {
  const [activeLayer, setActiveLayer] = useState<LayerFilter>('all');
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const handleNextStep = () => {
    setActiveStep(prev => {
      if (prev === null || prev >= SEQUENCE_STEPS.length) return 1;
      return prev + 1;
    });
  };

  const handleResetSequence = () => {
    setActiveStep(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Session Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-950 via-slate-900 to-blue-950 border border-blue-500/30 p-6 sm:p-8 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-blue-500/20 text-blue-300 border border-blue-500/40">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>LIVE ARCHITECTURE REVIEW BOARD (ARB) • INTERACTIVE WHITEBOARD SESSION</span>
            </div>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-white">
              Sovereign Data Center Whiteboard: 300 Crore Citizens Scale
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Enterprise architecture blueprint powering <strong>Tier-1 Core Banking Systems (CBS)</strong>, <strong>Instant Payment Rails (UPI / FedNow / RTGS)</strong>, and <strong>Sovereign Government Portals (DBT / e-KYC)</strong> with an impenetrable <strong>ISO/IEC 30107-3 Level 3 Fraud-Proof Defense Matrix</strong>.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/15 text-slate-200 font-mono">
                Scale: 3,000,000,000 (3B)
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-mono font-bold">
                RPO = 0 (Sync) • RTO &lt; 30s
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 font-mono">
                p99 Latency: 148.2 ms
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-rose-500/20 border border-rose-500/30 text-rose-300 font-mono font-bold">
                Anti-Spoof: ISO 30107-3 Level 3
              </span>
            </div>
          </div>

          {onSwitchToManuscript && (
            <button
              onClick={onSwitchToManuscript}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all shadow-md shrink-0 self-start lg:self-center"
            >
              <BookOpen className="w-4 h-4" />
              <span>Read Full Manuscript</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Layer Filters & Step Walkthrough Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="font-bold text-zinc-700 mr-1 flex items-center gap-1">
            <Sliders className="w-3.5 h-3.5 text-blue-600" />
            <span>Layer Focus:</span>
          </span>
          {[
            { id: 'all', label: 'All Layers (Unified)' },
            { id: 'geo', label: '5-Region Geo Fabric' },
            { id: 'banking', label: 'Core Banking & Payments' },
            { id: 'gov', label: 'Government & DBT Rails' },
            { id: 'fraud', label: 'Fraud-Proof Anti-Deepfake' },
            { id: 'ingress', label: 'Edge & Ingress CDN' },
            { id: 'k8s', label: 'Bare-Metal K8s & GPUs' },
            { id: 'biometric', label: '13-Nodal Pipeline' },
            { id: 'storage', label: '180 PB Polyglot DB' },
            { id: 'security', label: 'Zero Trust & HSM' }
          ].map(layer => (
            <button
              key={layer.id}
              onClick={() => setActiveLayer(layer.id as LayerFilter)}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                activeLayer === layer.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-100'
              }`}
            >
              {layer.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[11px] font-mono text-zinc-500">Execution Sequence:</span>
          <button
            onClick={handleNextStep}
            className="flex items-center gap-1 px-3 py-1 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition-colors shadow-xs"
          >
            <Play className="w-3 h-3 fill-white" />
            <span>{activeStep === null ? 'Play Step 1' : `Next Step (${activeStep}/${SEQUENCE_STEPS.length})`}</span>
          </button>
          {activeStep !== null && (
            <button
              onClick={handleResetSequence}
              className="p-1 rounded-lg text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200"
              title="Reset Trace"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Active Step Highlight Card (when stepping through) */}
      {activeStep !== null && (
        <div className="p-4 rounded-2xl bg-indigo-50/90 border border-indigo-200 text-indigo-950 text-xs space-y-1.5 animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between font-bold">
            <span className="flex items-center gap-1.5 text-indigo-700">
              <Activity className="w-4 h-4 text-indigo-600 animate-pulse" />
              <span>Step {activeStep} of {SEQUENCE_STEPS.length}: {SEQUENCE_STEPS[activeStep - 1].title}</span>
            </span>
            <span className="px-2 py-0.5 rounded-full bg-indigo-200/80 text-indigo-800 font-mono text-[11px]">
              Budget: {SEQUENCE_STEPS[activeStep - 1].latency}
            </span>
          </div>
          <p className="text-indigo-900 leading-relaxed font-sans">
            {SEQUENCE_STEPS[activeStep - 1].detail}
          </p>
          <div className="flex items-center gap-3 text-[11px] font-mono text-indigo-600 pt-0.5">
            <span>Target: <strong>{SEQUENCE_STEPS[activeStep - 1].component}</strong></span>
            <span>·</span>
            <span>Zone: <strong>{SEQUENCE_STEPS[activeStep - 1].zone}</strong></span>
          </div>
        </div>
      )}

      {/* Whiteboard Canvas Main Grid */}
      <div className="relative rounded-3xl border border-zinc-200 bg-[#fbfbfe] p-4 sm:p-7 shadow-inner overflow-hidden font-sans">
        {/* Engineering dot grid pattern */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-40" 
          style={{ 
            backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', 
            backgroundSize: '24px 24px' 
          }} 
        />

        {/* Whiteboard Top Bar Notation */}
        <div className="relative z-10 flex flex-wrap items-center justify-between pb-4 mb-5 border-b border-zinc-200/80 text-[11px] font-mono text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold text-zinc-700">ARB WHITEBOARD SESSION #0492-DC</span>
            <span>•</span>
            <span>Target: 300 Crore Citizens Sovereign Grid</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-zinc-200 text-zinc-700 font-semibold">Tier-IV Multi-Region</span>
            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">ISO 30107-3 L3 PAD</span>
            <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-semibold">PCI-DSS v4.0 Scope</span>
          </div>
        </div>

        {/* The Whiteboard Blocks Container */}
        <div className="relative z-10 space-y-6">

          {/* BLOCK 1: Continental Multi-Region Geo Routing (Layer: geo / all) */}
          {(activeLayer === 'all' || activeLayer === 'geo') && (
            <div className={`p-4 rounded-2xl border transition-all ${
              activeStep === 1 
                ? 'bg-amber-50/90 border-amber-400 ring-2 ring-amber-300' 
                : 'bg-white border-zinc-200 shadow-xs'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                    1
                  </span>
                  <h4 className="font-bold text-zinc-900 text-sm">
                    Continental Multi-Region Geo-Fabric (5 Sovereign Regions • 300 Crore Citizens)
                  </h4>
                </div>
                <span className="text-[11px] font-mono text-zinc-500">Anycast BGP + DWDM Dark Fiber</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-center text-xs">
                {[
                  { region: 'Region 1 (North)', dc: 'DC-N1 & DC-N2', pop: '600M Citizens', status: 'Active-Active' },
                  { region: 'Region 2 (South)', dc: 'DC-S1 & DC-S2', pop: '600M Citizens', status: 'Active-Active' },
                  { region: 'Region 3 (West)', dc: 'DC-W1 & DC-W2', pop: '600M Citizens', status: 'Active-Active' },
                  { region: 'Region 4 (East)', dc: 'DC-E1 & DC-E2', pop: '600M Citizens', status: 'Active-Active' },
                  { region: 'Region 5 (Central)', dc: 'DC-C1 & DC-C2', pop: 'Global Arbiter', status: 'Consensus Vault' }
                ].map((item, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl border border-zinc-200 bg-zinc-50/80 hover:bg-white transition-all text-left space-y-1">
                    <div className="font-bold text-zinc-900 text-[11px] flex items-center justify-between">
                      <span>{item.region}</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    </div>
                    <div className="text-[10px] font-mono text-blue-700 font-semibold">{item.dc}</div>
                    <div className="text-[10px] text-zinc-500">{item.pop}</div>
                    <div className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-bold inline-block">
                      {item.status}
                    </div>
                  </div>
                ))}
              </div>

              {/* Whiteboard annotation callout */}
              <div className="mt-2.5 pt-2 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-500">
                <span className="italic text-zinc-600">
                  ⚡ <strong>Whiteboard Note:</strong> Dedicated multi-terabit dark fiber DWDM ring connects all 5 regions. Inter-region log-shipping RPO &lt; 250ms with autonomous regional survival if fiber is severed.
                </span>
                <span className="font-mono text-emerald-700 font-bold">RPO = 0 (Intra-DC)</span>
              </div>
            </div>
          )}

          {/* BLOCK: Tier-1 Banking Systems & Payment Rails Integration (Layer: banking / all) */}
          {(activeLayer === 'all' || activeLayer === 'banking') && (
            <div className={`p-4 rounded-2xl border transition-all ${
              activeStep === 8 
                ? 'bg-amber-50/90 border-amber-400 ring-2 ring-amber-300' 
                : 'bg-white border-zinc-200 shadow-xs'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                    <CreditCard className="w-3.5 h-3.5 text-emerald-700" />
                  </span>
                  <h4 className="font-bold text-zinc-900 text-sm">
                    Tier-1 Core Banking Systems (CBS) & Real-Time Payment Switches (UPI / FedNow / RTGS)
                  </h4>
                </div>
                <span className="text-[11px] font-mono text-emerald-700 font-semibold">PCI-DSS v4.0 Scope Boundary</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-1.5">
                  <div className="font-bold text-zinc-900 flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4 text-emerald-700" />
                    <span>Instant Payment Clearing</span>
                  </div>
                  <p className="text-[11px] text-zinc-600 leading-snug">
                    Sub-second biometric authorization for UPI, FedNow, and high-value wire transfers ($&gt; \$50,000$) with dynamic transaction payload binding.
                  </p>
                  <div className="text-[10px] font-mono text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded inline-block font-semibold">
                    Payload = Sign_HSM(CitizenID + Amount + IBAN + Nonce)
                  </div>
                </div>

                <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-1.5">
                  <div className="font-bold text-zinc-900 flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-blue-700" />
                    <span>e-KYC & Mule Account Shield</span>
                  </div>
                  <p className="text-[11px] text-zinc-600 leading-snug">
                    Instant paperless bank account opening. Eliminates money laundering mule accounts and synthetic identities across all participating banks.
                  </p>
                  <div className="text-[10px] font-mono text-blue-800 bg-blue-100/80 px-2 py-0.5 rounded inline-block font-semibold">
                    1:N Cross-Bank Deduplication
                  </div>
                </div>

                <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-1.5">
                  <div className="font-bold text-zinc-900 flex items-center gap-1.5">
                    <Lock className="w-4 h-4 text-purple-700" />
                    <span>Zero Biometric Leakage</span>
                  </div>
                  <p className="text-[11px] text-zinc-600 leading-snug">
                    Banks receive ONLY an HSM-signed cryptographic JSON Web Signature (JWS) assertion. Raw fingerprints and iris templates NEVER leave the sovereign DC.
                  </p>
                  <div className="text-[10px] font-mono text-purple-800 bg-purple-100/80 px-2 py-0.5 rounded inline-block font-semibold">
                    Zero-Knowledge Assertion Token
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* BLOCK: Sovereign Government Portals & Public Digital Infrastructure (Layer: gov / all) */}
          {(activeLayer === 'all' || activeLayer === 'gov') && (
            <div className="p-4 rounded-2xl border border-zinc-200 bg-white shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xs">
                    <Building2 className="w-3.5 h-3.5 text-blue-700" />
                  </span>
                  <h4 className="font-bold text-zinc-900 text-sm">
                    Sovereign Government Portals, Welfare (DBT) & Border Security E-Gates
                  </h4>
                </div>
                <span className="text-[11px] font-mono text-blue-700 font-semibold">National DPI Gateway</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl border border-blue-200 bg-blue-50/40 space-y-1.5">
                  <div className="font-bold text-zinc-900 flex items-center gap-1.5">
                    <Scale className="w-4 h-4 text-blue-700" />
                    <span>Direct Benefit Transfer (DBT)</span>
                  </div>
                  <p className="text-[11px] text-zinc-600 leading-snug">
                    Social welfare, farmer subsidies, and pension payouts disbursed directly to authenticated citizens. Completely eliminates "Ghost Beneficiaries" and skimming.
                  </p>
                </div>

                <div className="p-3 rounded-xl border border-blue-200 bg-blue-50/40 space-y-1.5">
                  <div className="font-bold text-zinc-900 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <span>ICAO 9303 Border E-Gates</span>
                  </div>
                  <p className="text-[11px] text-zinc-600 leading-snug">
                    Sub-1.2s facial and iris traveler verification at international border checkpoints. Automated real-time interdiction against Interpol watchlists.
                  </p>
                </div>

                <div className="p-3 rounded-xl border border-blue-200 bg-blue-50/40 space-y-1.5">
                  <div className="font-bold text-zinc-900 flex items-center gap-1.5">
                    <Lock className="w-4 h-4 text-indigo-700" />
                    <span>Zero Cross-Agency Profiling</span>
                  </div>
                  <p className="text-[11px] text-zinc-600 leading-snug">
                    OPA-enforced Attribute-Based Access Control (ABAC): Welfare systems cannot inspect tax files; healthcare systems cannot view bank account details.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* BLOCK: The 4-Pillar Fraud-Proof Defense Matrix (Layer: fraud / all) */}
          {(activeLayer === 'all' || activeLayer === 'fraud') && (
            <div className={`p-4 rounded-2xl border transition-all ${
              activeStep === 4 
                ? 'bg-amber-50/90 border-amber-400 ring-2 ring-amber-300' 
                : 'bg-white border-zinc-200 shadow-xs'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-800 flex items-center justify-center font-bold text-xs">
                    <ShieldAlert className="w-3.5 h-3.5 text-rose-700" />
                  </span>
                  <h4 className="font-bold text-zinc-900 text-sm">
                    The Fraud-Proof Zero-Trust Matrix: ISO/IEC 30107-3 Level 3 Anti-Spoofing & Anti-Deepfake
                  </h4>
                </div>
                <span className="text-[11px] font-mono text-rose-700 font-bold">100% Replay & Deepfake Immune</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 text-xs">
                <div className="p-2.5 rounded-xl border border-rose-200 bg-rose-50/50 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-rose-800">Pillar 1: Multi-Spectral Liveness</span>
                  <div className="font-bold text-zinc-900">Subdermal Pulse & Pupil Dilation</div>
                  <p className="text-[10px] text-zinc-600">
                    Fingerprint pulse oximetry + dynamic pupil light constriction defeats silicone molds and dead tissue.
                  </p>
                </div>

                <div className="p-2.5 rounded-xl border border-purple-200 bg-purple-50/50 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-purple-800">Pillar 2: Anti-Deepfake AI</span>
                  <div className="font-bold text-zinc-900">Fourier Residual Scrubber</div>
                  <p className="text-[10px] text-zinc-600">
                    High-frequency spectral transformer detects GAN/Diffusion synthetic face video replays and morphs.
                  </p>
                </div>

                <div className="p-2.5 rounded-xl border border-amber-200 bg-amber-50/50 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-amber-800">Pillar 3: Device Signing</span>
                  <div className="font-bold text-zinc-900">Cryptographic Nonce Proof</div>
                  <p className="text-[10px] text-zinc-600">
                    Scanner hardware cryptochip signs capture: Sign_Device(WSQ + Timestamp + Nonce). Replays impossible.
                  </p>
                </div>

                <div className="p-2.5 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-emerald-800">Pillar 4: 1:N Global Deduplication</span>
                  <div className="font-bold text-zinc-900">39B Vector Matching</div>
                  <p className="text-[10px] text-zinc-600">
                    Instant 1.14s deduplication scan prevents duplicate IDs across banks, welfare, or civil databases.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* BLOCK 2: Zone 0 & 1 - Edge Ingress, DDoS Scrubbing & Reverse Proxy (Layer: ingress / all) */}
          {(activeLayer === 'all' || activeLayer === 'ingress') && (
            <div className={`p-4 rounded-2xl border transition-all ${
              activeStep === 2 
                ? 'bg-amber-50/90 border-amber-400 ring-2 ring-amber-300' 
                : 'bg-white border-zinc-200 shadow-xs'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                    2
                  </span>
                  <h4 className="font-bold text-zinc-900 text-sm">
                    Zone 0 & 1: Edge Ingress, eBPF XDP DDoS Shield & On-Premises CDN
                  </h4>
                </div>
                <span className="text-[11px] font-mono text-indigo-600 font-semibold">Latency: ~2.8 ms</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl border border-zinc-200 bg-slate-50 space-y-1">
                  <div className="font-bold text-zinc-900 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>eBPF XDP SYN Flood Shield</span>
                  </div>
                  <p className="text-[11px] text-zinc-600 leading-snug">
                    NIC driver layer packet filter dropping 40M+ malicious packets/sec before kernel CPU allocation.
                  </p>
                </div>

                <div className="p-3 rounded-xl border border-zinc-200 bg-slate-50 space-y-1">
                  <div className="font-bold text-zinc-900 flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-amber-500" />
                    <span>Hardware TLS 1.3 Offload</span>
                  </div>
                  <p className="text-[11px] text-zinc-600 leading-snug">
                    Intel QAT crypto accelerators terminating TLS 1.3 with Post-Quantum Hybrid (ML-KEM-768). Zero CPU overhead.
                  </p>
                </div>

                <div className="p-3 rounded-xl border border-zinc-200 bg-slate-50 space-y-1">
                  <div className="font-bold text-zinc-900 flex items-center gap-1.5">
                    <HardDrive className="w-4 h-4 text-blue-600" />
                    <span>Varnish NVMe Edge Cache</span>
                  </div>
                  <p className="text-[11px] text-zinc-600 leading-snug">
                    512 GB RAM edge nodes caching client enrollment SDKs, UI assets, and public trust anchors with zero origin load.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* BLOCK 3: Zone 2 - Bare-Metal Kubernetes App Fabric & Cilium Service Mesh (Layer: k8s / all) */}
          {(activeLayer === 'all' || activeLayer === 'k8s') && (
            <div className={`p-4 rounded-2xl border transition-all ${
              activeStep === 3 
                ? 'bg-amber-50/90 border-amber-400 ring-2 ring-amber-300' 
                : 'bg-white border-zinc-200 shadow-xs'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-cyan-100 text-cyan-800 flex items-center justify-center font-bold text-xs">
                    3
                  </span>
                  <h4 className="font-bold text-zinc-900 text-sm">
                    Zone 2: Bare-Metal Kubernetes App Fabric (K8s-App) & Cilium eBPF Mesh
                  </h4>
                </div>
                <span className="text-[11px] font-mono text-cyan-700 font-semibold">Pod Hop: 0.22 ms</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 text-xs">
                <div className="p-2.5 rounded-xl border border-cyan-200 bg-cyan-50/50 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-cyan-800">Control Plane</span>
                  <div className="font-bold text-zinc-900">5-Node etcd Quorum</div>
                  <p className="text-[10px] text-zinc-600">NVMe-backed write path, fsync &lt; 1.2ms across racks.</p>
                </div>

                <div className="p-2.5 rounded-xl border border-blue-200 bg-blue-50/50 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-blue-800">Cilium eBPF CNI</span>
                  <div className="font-bold text-zinc-900">Socket-Level kTLS</div>
                  <p className="text-[10px] text-zinc-600">Replaces sidecars; bypasses iptables for zero packet jitter.</p>
                </div>

                <div className="p-2.5 rounded-xl border border-purple-200 bg-purple-50/50 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-purple-800">Identity Attestation</span>
                  <div className="font-bold text-zinc-900">SPIFFE/SPIRE Roots</div>
                  <p className="text-[10px] text-zinc-600">Hardware TPM 2.0 PCR attestation with 60-min auto-rotation.</p>
                </div>

                <div className="p-2.5 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-emerald-800">Buffer Queue</span>
                  <div className="font-bold text-zinc-900">Kafka High-TPS Bus</div>
                  <p className="text-[10px] text-zinc-600">Buffers 100k req/s during peak enrollment rushes.</p>
                </div>
              </div>
            </div>
          )}

          {/* BLOCK 4: Zone 3 - 13-Nodal Biometric Multimodal GPU Grid (Layer: biometric / all) */}
          {(activeLayer === 'all' || activeLayer === 'biometric') && (
            <div className={`p-4 rounded-2xl border transition-all ${
              (activeStep === 5 || activeStep === 6 || activeStep === 7)
                ? 'bg-amber-50/90 border-amber-400 ring-2 ring-amber-300' 
                : 'bg-white border-zinc-200 shadow-xs'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                    4
                  </span>
                  <h4 className="font-bold text-zinc-900 text-sm">
                    Zone 3: 13-Nodal Biometric Multimodal GPU Grid (640x NVIDIA H100 SXM5)
                  </h4>
                </div>
                <span className="text-[11px] font-mono text-emerald-700 font-semibold">Inference p99: 114 ms</span>
              </div>

              {/* 13 Modalities Decomposition Flow */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs mb-3">
                <div className="p-3 rounded-xl border border-zinc-200 bg-zinc-50 space-y-1.5">
                  <div className="flex items-center justify-between font-bold text-zinc-900">
                    <span className="flex items-center gap-1.5">
                      <Fingerprint className="w-4 h-4 text-blue-600" />
                      <span>10 Fingerprints</span>
                    </span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-100 text-blue-800 font-mono">
                      Weight: 30%
                    </span>
                  </div>
                  <ul className="text-[10.5px] text-zinc-600 space-y-0.5 list-disc list-inside">
                    <li>Digits 1-5 Right + 6-10 Left</li>
                    <li>NIST NFIQ 2.0 Quality Gate (&gt; 60)</li>
                    <li>WSQ 15:1 FBI-certified Compression</li>
                    <li>ISO/IEC 19794-2 Minutiae Vector</li>
                  </ul>
                </div>

                <div className="p-3 rounded-xl border border-zinc-200 bg-zinc-50 space-y-1.5">
                  <div className="flex items-center justify-between font-bold text-zinc-900">
                    <span className="flex items-center gap-1.5">
                      <Eye className="w-4 h-4 text-emerald-600" />
                      <span>2 Dual Irises</span>
                    </span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-mono">
                      Weight: 50%
                    </span>
                  </div>
                  <ul className="text-[10.5px] text-zinc-600 space-y-0.5 list-disc list-inside">
                    <li>Left & Right Eye NIR (750-850nm)</li>
                    <li>Daugman Integro-Differential Boundary</li>
                    <li>2048-bit Polar Gabor IrisCode</li>
                    <li>Hamming Distance HD &le; 0.32 (ISO 19794-6)</li>
                  </ul>
                </div>

                <div className="p-3 rounded-xl border border-zinc-200 bg-zinc-50 space-y-1.5">
                  <div className="flex items-center justify-between font-bold text-zinc-900">
                    <span className="flex items-center gap-1.5">
                      <Cpu className="w-4 h-4 text-purple-600" />
                      <span>1 Face (3D Landmarking)</span>
                    </span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-100 text-purple-800 font-mono">
                      Weight: 20%
                    </span>
                  </div>
                  <ul className="text-[10.5px] text-zinc-600 space-y-0.5 list-disc list-inside">
                    <li>RetinaFace 106 3D Landmark Grid</li>
                    <li>Vision Transformer (ViT) + ArcFace</li>
                    <li>512-dim Unit Hypersphere Vector</li>
                    <li>ISO 30107-3 Liveness & Anti-Spoof (PAD)</li>
                  </ul>
                </div>
              </div>

              {/* Decision Fusion Equation callout */}
              <div className="p-3 rounded-xl bg-emerald-950 text-emerald-200 font-mono text-[11px] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span>
                  <strong>Fusion Math:</strong> S_fused = (0.20·S_face·Q_face + 0.50·S_iris·Q_iris + 0.30·S_fp·Q_fp) / Total_Weight
                </span>
                <span className="text-emerald-400 font-bold shrink-0">
                  Target Match: S_fused &ge; 0.88
                </span>
              </div>
            </div>
          )}

          {/* BLOCK 5: Zone 4 - Polyglot Persistence Tier (180 PB NoSQL + ACID) (Layer: storage / all) */}
          {(activeLayer === 'all' || activeLayer === 'storage') && (
            <div className={`p-4 rounded-2xl border transition-all ${
              activeStep === 9 
                ? 'bg-amber-50/90 border-amber-400 ring-2 ring-amber-300' 
                : 'bg-white border-zinc-200 shadow-xs'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
                    5
                  </span>
                  <h4 className="font-bold text-zinc-900 text-sm">
                    Zone 4: Polyglot Persistence Tier (180 PB NoSQL + Synchronous ACID Ledger)
                  </h4>
                </div>
                <span className="text-[11px] font-mono text-amber-800 font-semibold">p99 Commit: &lt; 0.5 ms</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 text-xs">
                <div className="p-2.5 rounded-xl border border-zinc-200 bg-slate-50 space-y-1">
                  <div className="font-bold text-zinc-900 flex items-center gap-1">
                    <Database className="w-3.5 h-3.5 text-amber-600" />
                    <span>ScyllaDB / DynamoDB</span>
                  </div>
                  <div className="text-[11px] font-mono text-blue-700 font-bold">180 PB Sharded NVMe</div>
                  <p className="text-[10px] text-zinc-600">Sub-500us p99 reads for 39B biometric templates.</p>
                </div>

                <div className="p-2.5 rounded-xl border border-zinc-200 bg-slate-50 space-y-1">
                  <div className="font-bold text-zinc-900 flex items-center gap-1">
                    <Database className="w-3.5 h-3.5 text-blue-600" />
                    <span>PostgreSQL Patroni</span>
                  </div>
                  <div className="text-[11px] font-mono text-emerald-700 font-bold">Synchronous ACID Ledger</div>
                  <p className="text-[10px] text-zinc-600">Zero transaction loss (RPO=0) physical WAL stream.</p>
                </div>

                <div className="p-2.5 rounded-xl border border-zinc-200 bg-slate-50 space-y-1">
                  <div className="font-bold text-zinc-900 flex items-center gap-1">
                    <Activity className="w-3.5 h-3.5 text-red-500" />
                    <span>Redis Enterprise CRDT</span>
                  </div>
                  <div className="text-[11px] font-mono text-purple-700 font-bold">Active-Active Cache</div>
                  <p className="text-[10px] text-zinc-600">Bloom filters & rate tokens across regions.</p>
                </div>

                <div className="p-2.5 rounded-xl border border-zinc-200 bg-slate-50 space-y-1">
                  <div className="font-bold text-zinc-900 flex items-center gap-1">
                    <HardDrive className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Ceph NVMe S3</span>
                  </div>
                  <div className="text-[11px] font-mono text-indigo-700 font-bold">12 PB Encrypted Vault</div>
                  <p className="text-[10px] text-zinc-600">8+4 Erasure Coding for raw WSQ/JP2 images.</p>
                </div>
              </div>
            </div>
          )}

          {/* BLOCK 6: Zone 5 & Security - FIPS 140-3 HSM & Air-Gapped Zero Trust (Layer: security / all) */}
          {(activeLayer === 'all' || activeLayer === 'security') && (
            <div className="p-4 rounded-2xl border border-zinc-200 bg-white shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-800 flex items-center justify-center font-bold text-xs">
                    6
                  </span>
                  <h4 className="font-bold text-zinc-900 text-sm">
                    Zone 5: Cryptographic Vault & Air-Gapped Zero Trust Security Controls
                  </h4>
                </div>
                <span className="text-[11px] font-mono text-rose-700 font-semibold">FIPS 140-3 Level 3</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl border border-zinc-200 bg-rose-50/40 space-y-1">
                  <div className="font-bold text-zinc-900 flex items-center gap-1.5">
                    <Lock className="w-4 h-4 text-rose-600" />
                    <span>Thales Luna Network HSM</span>
                  </div>
                  <p className="text-[11px] text-zinc-600 leading-snug">
                    Envelope encryption: Master KEK in silicon wraps ephemeral AES-256-GCM DEKs. Zero raw vectors in plaintext.
                  </p>
                </div>

                <div className="p-3 rounded-xl border border-zinc-200 bg-slate-50 space-y-1">
                  <div className="font-bold text-zinc-900 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Mandatory FIDO2 YubiKeys</span>
                  </div>
                  <p className="text-[11px] text-zinc-600 leading-snug">
                    Workforce & Admin SSO enforced via YubiKey 5 FIPS hardware tokens. Zero Standing Privilege (ZSP) with 60-min JIT.
                  </p>
                </div>

                <div className="p-3 rounded-xl border border-zinc-200 bg-slate-50 space-y-1">
                  <div className="font-bold text-zinc-900 flex items-center gap-1.5">
                    <Network className="w-4 h-4 text-indigo-600" />
                    <span>Cilium Tetragon eBPF</span>
                  </div>
                  <p className="text-[11px] text-zinc-600 leading-snug">
                    Kernel-level syscall monitoring detecting process tampering and namespace escapes with instant SIGKILL.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Sticky Notes & Architect Notations (Classic Whiteboarding Element) */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-zinc-200/80 text-xs">
          <div className="p-3 rounded-xl bg-amber-100/80 border border-amber-300/80 text-amber-950 shadow-xs space-y-1 rotate-[-0.5deg]">
            <div className="font-bold text-[11px] flex items-center gap-1">
              <span>💡 Core Banking: Zero Biometric Exposure</span>
            </div>
            <p className="text-[10.5px] leading-snug text-amber-900">
              Commercial banks never see or store raw templates. They receive an HSM-signed Zero-Knowledge assertion token valid for 60 seconds.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-emerald-100/80 border border-emerald-300/80 text-emerald-950 shadow-xs space-y-1 rotate-[0.5deg]">
            <div className="font-bold text-[11px] flex items-center gap-1">
              <span>⚠️ Government DBT: Zero Ghost Beneficiaries</span>
            </div>
            <p className="text-[10.5px] leading-snug text-emerald-900">
              1:N global deduplication across 39 Billion vectors guarantees no person can register duplicate identities or fraudulently claim multiple welfare disbursements.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-rose-100/80 border border-rose-300/80 text-rose-950 shadow-xs space-y-1 rotate-[-0.5deg]">
            <div className="font-bold text-[11px] flex items-center gap-1">
              <span>🛡️ Anti-Deepfake: Level 3 Liveness PAD</span>
            </div>
            <p className="text-[10.5px] leading-snug text-rose-900">
              Multi-spectral sensors check living tissue pulse + pupil light reflex + 3D laser depth, defeating high-res silicone masks, screens, and AI video generators.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-blue-100/80 border border-blue-300/80 text-blue-950 shadow-xs space-y-1 rotate-[0.5deg]">
            <div className="font-bold text-[11px] flex items-center gap-1">
              <span>⚡ Anti-Replay: Hardware Device Signing</span>
            </div>
            <p className="text-[10.5px] leading-snug text-blue-900">
              Every capture terminal cryptographically signs each scan with an internal TPM 2.0 key and monotonic nonce. Replayed network packets fail verification.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
