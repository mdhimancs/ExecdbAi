import React, { useRef, useState, useEffect, useCallback } from 'react';
import { 
  Pencil, 
  Minus, 
  ArrowRight, 
  Square, 
  Circle as CircleIcon, 
  Eraser, 
  Type, 
  Grid, 
  RotateCcw, 
  Trash2, 
  Download, 
  Sparkles, 
  Users, 
  X, 
  Maximize2, 
  Minimize2, 
  Shield, 
  Database, 
  Cloud, 
  Cpu, 
  Server, 
  Key, 
  Check, 
  Layers,
  Share2
} from 'lucide-react';

interface ArchitecturalWhiteboardProps {
  theme?: string;
  onClose?: () => void;
  isModal?: boolean;
}

type ToolType = 'pen' | 'line' | 'arrow' | 'rectangle' | 'circle' | 'eraser' | 'text' | 'stamp';
type StampType = 'cloud' | 'database' | 'shield' | 'server' | 'cpu' | 'key';
type GridType = 'blueprint' | 'dots' | 'clean';

const COLOR_SWATCHES = [
  { label: 'Cyber Blue', value: '#3b82f6' },
  { label: 'Cyan Glow', value: '#06b6d4' },
  { label: 'Emerald Green', value: '#10b981' },
  { label: 'Amber Alert', value: '#f59e0b' },
  { label: 'Rose Critical', value: '#ef4444' },
  { label: 'Purple AI', value: '#a855f7' },
  { label: 'Pure White', value: '#ffffff' },
  { label: 'Dark Slate', value: '#0f172a' },
];

export const ArchitecturalWhiteboard: React.FC<ArchitecturalWhiteboardProps> = ({ 
  theme = 'apple-light', 
  onClose,
  isModal = false 
}) => {
  const isLight = theme === 'apple-light';
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Drawing State
  const [tool, setTool] = useState<ToolType>('pen');
  const [color, setColor] = useState<string>('#3b82f6');
  const [lineWidth, setLineWidth] = useState<number>(3);
  const [stamp, setStamp] = useState<StampType>('cloud');
  const [grid, setGrid] = useState<GridType>('blueprint');
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);

  // History State for Undo/Redo
  const [history, setHistory] = useState<ImageData[]>([]);
  const [historyStep, setHistoryStep] = useState<number>(-1);

  // Text Tool State
  const [textInput, setTextInput] = useState<string>('');
  const [textPos, setTextPos] = useState<{ x: number; y: number } | null>(null);
  const [isPlacingText, setIsPlacingText] = useState<boolean>(false);

  // UI Fullscreen / Consultation State
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [consultationConnected, setConsultationConnected] = useState<boolean>(true);
  const [peerCursor, setPeerCursor] = useState<{ x: number; y: number; name: string } | null>({
    x: 240,
    y: 180,
    name: 'Principal Architect (Munish)'
  });
  const [activeTemplateToast, setActiveTemplateToast] = useState<string | null>(null);

  // Save Canvas State to History Stack
  const saveState = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      setHistory(prev => {
        const newHistory = prev.slice(0, historyStep + 1);
        return [...newHistory, imageData];
      });
      setHistoryStep(prev => prev + 1);
    } catch (e) {
      console.warn('Canvas state save failed:', e);
    }
  }, [historyStep]);

  // Initialize Canvas Resolution & Draw Background
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.scale(dpr, dpr);

    // Draw initial grid/background
    drawGridBackground(ctx, rect.width, rect.height, grid, isLight);

    // Reset history
    const initialData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory([initialData]);
    setHistoryStep(0);
  }, [grid, isLight]);

  useEffect(() => {
    initCanvas();
    const handleResize = () => {
      // Re-init canvas on window resize
      initCanvas();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initCanvas]);

  // Helper: Draw Background Grid Mesh
  const drawGridBackground = (
    ctx: CanvasRenderingContext2D, 
    width: number, 
    height: number, 
    gridType: GridType, 
    lightMode: boolean
  ) => {
    // Fill background color
    if (gridType === 'blueprint') {
      ctx.fillStyle = '#090d16'; // Executive Dark Blueprint Mesh
    } else {
      ctx.fillStyle = lightMode ? '#ffffff' : '#0a0d14';
    }
    ctx.fillRect(0, 0, width, height);

    if (gridType === 'clean') return;

    if (gridType === 'blueprint') {
      // Draw Blueprint Grid Lines
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.12)';
      ctx.lineWidth = 1;

      const gridSize = 24;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    } else if (gridType === 'dots') {
      // Draw Dot Grid
      ctx.fillStyle = lightMode ? 'rgba(0, 0, 0, 0.15)' : 'rgba(255, 255, 255, 0.15)';
      const dotSpacing = 20;
      for (let x = 10; x < width; x += dotSpacing) {
        for (let y = 10; y < height; y += dotSpacing) {
          ctx.beginPath();
          ctx.arc(x, y, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  };

  // Undo Functionality
  const handleUndo = () => {
    if (historyStep <= 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const previousStep = historyStep - 1;
    ctx.putImageData(history[previousStep], 0, 0);
    setHistoryStep(previousStep);
  };

  // Redo Functionality
  const handleRedo = () => {
    if (historyStep >= history.length - 1) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const nextStep = historyStep + 1;
    ctx.putImageData(history[nextStep], 0, 0);
    setHistoryStep(nextStep);
  };

  // Clear Canvas
  const handleClear = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Save state after clear & re-render background
    ctx.save();
    ctx.scale(dpr, dpr);
    drawGridBackground(ctx, rect.width, rect.height, grid, isLight);
    ctx.restore();

    saveState();
  };

  // Download Diagram Image
  const handleExportPNG = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `Architectural_Whiteboard_${new Date().toISOString().slice(0,10)}.png`;
    link.href = image;
    link.click();
  };

  // Load Architectural Template Presets
  const loadArchitecturalTemplate = (type: 'biometric-datacenter' | 'zero-trust-iam' | 'genai-gateway') => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    // Reset background
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.scale(dpr, dpr);
    drawGridBackground(ctx, rect.width, rect.height, 'blueprint', isLight);

    ctx.lineWidth = 2;
    ctx.font = 'bold 12px monospace';

    if (type === 'biometric-datacenter') {
      // Draw 300 Crore Biometric Data Center Multi-Region Mesh Diagram
      setActiveTemplateToast('Loaded: 300 Crore Biometric Data Center (5-Region Active-Active Mesh)');

      // Title Box
      ctx.fillStyle = '#3b82f6';
      ctx.fillRect(30, 25, 340, 28);
      ctx.fillStyle = '#ffffff';
      ctx.fillText('300 CRORE SOVEREIGN BIOMETRIC DATA CENTER MESH', 40, 44);

      // Zone 1: Anycast Ingress Edge
      ctx.strokeStyle = '#06b6d4';
      ctx.fillStyle = 'rgba(6, 182, 212, 0.1)';
      ctx.strokeRect(30, 70, 220, 110);
      ctx.fillRect(30, 70, 220, 110);
      ctx.fillStyle = '#38bdf8';
      ctx.fillText('ZONE 1: BGP ANYCAST & eBPF XDP', 45, 90);
      ctx.fillText('• 500 Gbps DDoS Scrubbing', 45, 110);
      ctx.fillText('• XDP SYN-Flood Filtering', 45, 128);
      ctx.fillText('• mTLS 1.3 Termination', 45, 146);

      // Arrow 1 -> Zone 2
      drawArrowOnCanvas(ctx, 250, 125, 310, 125, '#3b82f6');

      // Zone 2: Liveness PAD & AI Extraction
      ctx.strokeStyle = '#10b981';
      ctx.fillStyle = 'rgba(16, 185, 129, 0.1)';
      ctx.strokeRect(310, 70, 260, 110);
      ctx.fillRect(310, 70, 260, 110);
      ctx.fillStyle = '#34d399';
      ctx.fillText('ZONE 2: MULTI-MODAL PIPELINE', 320, 90);
      ctx.fillText('• ISO/IEC 30107-3 Liveness PAD', 320, 110);
      ctx.fillText('• 13 Nodal Extractor (10FP/2Iris/1Face)', 320, 128);
      ctx.fillText('• NVIDIA H100 TensorRT Execution', 320, 146);

      // Arrow 2 -> Zone 3
      drawArrowOnCanvas(ctx, 570, 125, 630, 125, '#10b981');

      // Zone 3: Milvus HNSW Vector Engine
      ctx.strokeStyle = '#a855f7';
      ctx.fillStyle = 'rgba(168, 85, 247, 0.1)';
      ctx.strokeRect(630, 70, 240, 110);
      ctx.fillRect(630, 70, 240, 110);
      ctx.fillStyle = '#c084fc';
      ctx.fillText('ZONE 3: MILVUS VECTOR HNSW', 640, 90);
      ctx.fillText('• 39 Billion Vector Index', 640, 110);
      ctx.fillText('• GPU IVF-PQ64 Quantization', 640, 128);
      ctx.fillText('• Sub-65ms p99 1:N Match', 640, 146);

      // ScyllaDB & Multi-Region Mesh Box
      ctx.strokeStyle = '#f59e0b';
      ctx.fillStyle = 'rgba(245, 158, 11, 0.1)';
      ctx.strokeRect(180, 210, 520, 85);
      ctx.fillRect(180, 210, 520, 85);
      ctx.fillStyle = '#fbbf24';
      ctx.fillText('CONTINENTAL 5-REGION SCYLLADB / KAFKA CDC MESH', 195, 232);
      ctx.fillText('• 180 PB Sharded NVMe Storage • LOCAL_QUORUM Synchronous Commit', 195, 252);
      ctx.fillText('• RPO < 250ms Multi-Region Async Replication over DWDM Dark Fiber', 195, 272);

    } else if (type === 'zero-trust-iam') {
      setActiveTemplateToast('Loaded: Tier-0 Zero Trust IAM & FIDO2 WebAuthn Architecture');

      ctx.fillStyle = '#10b981';
      ctx.fillRect(30, 25, 360, 28);
      ctx.fillStyle = '#ffffff';
      ctx.fillText('TIER-0 ZERO TRUST IAM & FIDO2 WEBAUTHN VAULT', 40, 44);

      // Identity Broker
      ctx.strokeStyle = '#3b82f6';
      ctx.fillStyle = 'rgba(59, 130, 246, 0.1)';
      ctx.strokeRect(40, 80, 220, 120);
      ctx.fillRect(40, 80, 220, 120);
      ctx.fillStyle = '#60a5fa';
      ctx.fillText('IDENTITY & ACCESS BROKER', 55, 100);
      ctx.fillText('• FIDO2 Hardware Key MFA', 55, 122);
      ctx.fillText('• CAEP Dynamic Token Evaluation', 55, 142);
      ctx.fillText('• OAuth 2.0 / OIDC PKCE Flow', 55, 162);

      // Arrow -> PAM
      drawArrowOnCanvas(ctx, 260, 140, 330, 140, '#10b981');

      // Privilege Access Vault
      ctx.strokeStyle = '#f59e0b';
      ctx.fillStyle = 'rgba(245, 158, 11, 0.1)';
      ctx.strokeRect(330, 80, 250, 120);
      ctx.fillRect(330, 80, 250, 120);
      ctx.fillStyle = '#fbbf24';
      ctx.fillText('CYBERARK PAM & EPHEMERAL JIT', 345, 100);
      ctx.fillText('• Zero Standing Privileges (-98.4%)', 345, 122);
      ctx.fillText('• 60-Minute Just-in-Time Access', 345, 142);
      ctx.fillText('• Keystroke & Video Session Audit', 345, 162);

      // Arrow -> Enclaves
      drawArrowOnCanvas(ctx, 580, 140, 650, 140, '#f59e0b');

      // Secured Cloud Enclave
      ctx.strokeStyle = '#a855f7';
      ctx.fillStyle = 'rgba(168, 85, 247, 0.1)';
      ctx.strokeRect(650, 80, 230, 120);
      ctx.fillRect(650, 80, 230, 120);
      ctx.fillStyle = '#c084fc';
      ctx.fillText('HIGH-FREQUENCY ENCLAVE', 665, 100);
      ctx.fillText('• Micro-Segmented Cilium Mesh', 665, 122);
      ctx.fillText('• FIPS 140-3 Level 3 HSM Keys', 665, 142);
      ctx.fillText('• Kernel eBPF Non-Repudiation', 665, 162);

    } else if (type === 'genai-gateway') {
      setActiveTemplateToast('Loaded: Sub-15ms GenAI Gateway & Tokenization Proxy');

      ctx.fillStyle = '#a855f7';
      ctx.fillRect(30, 25, 350, 28);
      ctx.fillStyle = '#ffffff';
      ctx.fillText('ENTERPRISE GENAI GATEWAY & DLP PROXY', 40, 44);

      // Ingress Gateway
      ctx.strokeStyle = '#06b6d4';
      ctx.fillStyle = 'rgba(6, 182, 212, 0.1)';
      ctx.strokeRect(50, 80, 230, 110);
      ctx.fillRect(50, 80, 230, 110);
      ctx.fillStyle = '#38bdf8';
      ctx.fillText('INLINE SECURITY GATEWAY', 65, 100);
      ctx.fillText('• Prompt Injection Defense', 65, 122);
      ctx.fillText('• Real-Time PII Masking (<18ms)', 65, 142);
      ctx.fillText('• Tokenization & Entropy Check', 65, 162);

      // Arrow -> vLLM Cluster
      drawArrowOnCanvas(ctx, 280, 135, 360, 135, '#a855f7');

      // GPU Cluster
      ctx.strokeStyle = '#3b82f6';
      ctx.fillStyle = 'rgba(59, 130, 246, 0.1)';
      ctx.strokeRect(360, 80, 270, 110);
      ctx.fillRect(360, 80, 270, 110);
      ctx.fillStyle = '#60a5fa';
      ctx.fillText('TRITON / vLLM SERVING MESH', 375, 100);
      ctx.fillText('• TensorRT-LLM Paged KV-Cache', 375, 122);
      ctx.fillText('• Speculative Target Decoding', 375, 142);
      ctx.fillText('• 512x H100 Cluster Orchestration', 375, 162);
    }

    ctx.restore();
    saveState();

    setTimeout(() => setActiveTemplateToast(null), 4000);
  };

  // Helper Arrow Drawer for Canvas
  const drawArrowOnCanvas = (
    ctx: CanvasRenderingContext2D, 
    fromX: number, 
    fromY: number, 
    toX: number, 
    toY: number, 
    colorHex: string
  ) => {
    const headlen = 10;
    const dx = toX - fromX;
    const dy = toY - fromY;
    const angle = Math.atan2(dy, dx);

    ctx.beginPath();
    ctx.strokeStyle = colorHex;
    ctx.fillStyle = colorHex;
    ctx.lineWidth = 2.5;
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - headlen * Math.cos(angle - Math.PI / 6), toY - headlen * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(toX - headlen * Math.cos(angle + Math.PI / 6), toY - headlen * Math.sin(angle + Math.PI / 6));
    ctx.closePath();
    ctx.fill();
  };

  // Mouse & Touch Event Handlers
  const getCanvasCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    let clientX = 0;
    let clientY = 0;

    if ('touches' in e) {
      if (e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      }
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const pos = getCanvasCoordinates(e);
    setIsDrawing(true);
    setStartPos(pos);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (tool === 'pen' || tool === 'eraser') {
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
      ctx.strokeStyle = tool === 'eraser' ? (grid === 'blueprint' ? '#090d16' : isLight ? '#ffffff' : '#0a0d14') : color;
      ctx.lineWidth = tool === 'eraser' ? lineWidth * 3 : lineWidth;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    } else if (tool === 'stamp') {
      drawStampOnCanvas(ctx, pos.x, pos.y, stamp, color);
      setIsDrawing(false);
      saveState();
    } else if (tool === 'text') {
      setTextPos(pos);
      setIsPlacingText(true);
      setIsDrawing(false);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const pos = getCanvasCoordinates(e);

    // Simulate remote peer cursor tracking
    if (Math.random() < 0.15) {
      setPeerCursor(prev => ({
        x: pos.x + Math.sin(Date.now() / 500) * 45,
        y: pos.y + Math.cos(Date.now() / 500) * 35,
        name: 'Principal Architect (Munish Dhiman)'
      }));
    }

    if (!isDrawing || !startPos) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (tool === 'pen' || tool === 'eraser') {
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    } else if (tool === 'line' || tool === 'arrow' || tool === 'rectangle' || tool === 'circle') {
      // Re-render last saved state for live shape preview
      if (historyStep >= 0 && history[historyStep]) {
        ctx.putImageData(history[historyStep], 0, 0);
      }

      ctx.strokeStyle = color;
      ctx.fillStyle = color + '22'; // 12% opacity fill
      ctx.lineWidth = lineWidth;

      if (tool === 'line') {
        ctx.beginPath();
        ctx.moveTo(startPos.x, startPos.y);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
      } else if (tool === 'arrow') {
        drawArrowOnCanvas(ctx, startPos.x, startPos.y, pos.x, pos.y, color);
      } else if (tool === 'rectangle') {
        const w = pos.x - startPos.x;
        const h = pos.y - startPos.y;
        ctx.beginPath();
        ctx.rect(startPos.x, startPos.y, w, h);
        ctx.fillRect(startPos.x, startPos.y, w, h);
        ctx.stroke();
      } else if (tool === 'circle') {
        const radius = Math.sqrt(Math.pow(pos.x - startPos.x, 2) + Math.pow(pos.y - startPos.y, 2));
        ctx.beginPath();
        ctx.arc(startPos.x, startPos.y, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }
    }
  };

  const handleMouseUp = () => {
    if (isDrawing) {
      setIsDrawing(false);
      setStartPos(null);
      saveState();
    }
  };

  // Stamp Drawer
  const drawStampOnCanvas = (
    ctx: CanvasRenderingContext2D, 
    x: number, 
    y: number, 
    stampType: StampType, 
    colorHex: string
  ) => {
    ctx.save();
    ctx.strokeStyle = colorHex;
    ctx.fillStyle = colorHex + '22';
    ctx.lineWidth = 2;

    const size = 32;

    if (stampType === 'cloud') {
      ctx.beginPath();
      ctx.arc(x - 10, y, 12, Math.PI * 0.5, Math.PI * 1.5);
      ctx.arc(x, y - 10, 14, Math.PI * 1.0, Math.PI * 2.0);
      ctx.arc(x + 12, y, 10, Math.PI * 1.5, Math.PI * 0.5);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    } else if (stampType === 'database') {
      ctx.beginPath();
      ctx.ellipse(x, y - 12, 18, 8, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(x - 18, y - 12);
      ctx.lineTo(x - 18, y + 12);
      ctx.ellipse(x, y + 12, 18, 8, 0, 0, Math.PI);
      ctx.lineTo(x + 18, y - 12);
      ctx.stroke();
    } else if (stampType === 'shield') {
      ctx.beginPath();
      ctx.moveTo(x, y - 16);
      ctx.lineTo(x + 16, y - 10);
      ctx.lineTo(x + 16, y + 4);
      ctx.quadraticCurveTo(x + 16, y + 18, x, y + 22);
      ctx.quadraticCurveTo(x - 16, y + 18, x - 16, y + 4);
      ctx.lineTo(x - 16, y - 10);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    } else if (stampType === 'server') {
      ctx.strokeRect(x - 20, y - 16, 40, 32);
      ctx.fillRect(x - 20, y - 16, 40, 32);
      ctx.beginPath();
      ctx.arc(x - 12, y - 6, 2.5, 0, Math.PI * 2);
      ctx.arc(x - 12, y + 6, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = colorHex;
      ctx.fill();
    }

    ctx.restore();
  };

  // Place Text on Canvas
  const handleConfirmText = () => {
    if (!textInput || !textPos) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.save();
    ctx.fillStyle = color;
    ctx.font = `bold ${lineWidth * 4 + 10}px Inter, sans-serif`;
    ctx.fillText(textInput, textPos.x, textPos.y);
    ctx.restore();

    setTextInput('');
    setTextPos(null);
    setIsPlacingText(false);
    saveState();
  };

  return (
    <div 
      className={`relative w-full flex flex-col rounded-2xl border overflow-hidden shadow-2xl transition-all ${
        isFullscreen ? 'fixed inset-0 z-[999] rounded-none' : 'h-[620px] max-h-[85vh]'
      } ${
        isLight 
          ? 'bg-zinc-900 border-zinc-700 text-white' 
          : 'bg-[#060911] border-blue-500/25 text-white'
      }`}
    >
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-gradient-to-r from-zinc-900 via-[#0a101f] to-zinc-900 border-b border-white/10 shrink-0 select-none">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.3)]">
            <Layers className="w-4 h-4 text-cyan-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs sm:text-sm font-black tracking-tight text-white uppercase">
                Interactive Architectural Whiteboard
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                Remote Consultation Engine
              </span>
            </div>
            <p className="text-[10px] text-zinc-400">
              Live Diagramming & Threat Modeling Canvas for CISO & Principal Architect Sessions
            </p>
          </div>
        </div>

        {/* Status Indicators & Control Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>SESSION CONNECTED • #ARCH-DES-8821</span>
          </div>

          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-zinc-300 hover:text-white cursor-pointer transition-all"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Canvas'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {isModal && onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg bg-red-500/20 border border-red-400/30 hover:bg-red-500/30 text-red-300 cursor-pointer transition-all"
              title="Close Whiteboard"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Preset Architectural Templates Bar */}
      <div className="flex items-center justify-between gap-2 px-3 py-1.5 bg-zinc-950/80 border-b border-white/10 overflow-x-auto scrollbar-none text-[11px] shrink-0">
        <div className="flex items-center gap-1.5 shrink-0 text-zinc-400 font-mono text-[10px]">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Load Architecture Templates:</span>
        </div>

        <div className="flex items-center gap-1.5 whitespace-nowrap overflow-x-auto">
          <button
            type="button"
            onClick={() => loadArchitecturalTemplate('biometric-datacenter')}
            className="px-2.5 py-1 rounded-md bg-blue-500/15 border border-blue-400/30 text-blue-300 hover:bg-blue-500/25 hover:border-blue-400 text-[10.5px] font-mono cursor-pointer transition-all"
          >
            🏛️ 300 Cr Biometric Data Center
          </button>
          <button
            type="button"
            onClick={() => loadArchitecturalTemplate('zero-trust-iam')}
            className="px-2.5 py-1 rounded-md bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 hover:bg-emerald-500/25 hover:border-emerald-400 text-[10.5px] font-mono cursor-pointer transition-all"
          >
            🔐 Tier-0 Zero Trust IAM
          </button>
          <button
            type="button"
            onClick={() => loadArchitecturalTemplate('genai-gateway')}
            className="px-2.5 py-1 rounded-md bg-purple-500/15 border border-purple-400/30 text-purple-300 hover:bg-purple-500/25 hover:border-purple-400 text-[10.5px] font-mono cursor-pointer transition-all"
          >
            ⚡ Sub-15ms AI Security Mesh
          </button>
        </div>
      </div>

      {/* Main Canvas + Floating Toolbar Area */}
      <div ref={containerRef} className="relative flex-1 w-full h-full overflow-hidden cursor-crosshair">
        
        {/* Floating Tool Controls Panel */}
        <div className="absolute top-3 left-3 z-30 flex flex-col gap-2 p-2 rounded-2xl bg-zinc-950/90 border border-white/15 shadow-2xl backdrop-blur-md">
          
          {/* Primary Drawing Tools */}
          <div className="flex flex-col gap-1">
            <button
              type="button"
              onClick={() => setTool('pen')}
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                tool === 'pen' ? 'bg-blue-600 text-white shadow-[0_0_12px_rgba(59,130,246,0.5)]' : 'hover:bg-white/10 text-zinc-400 hover:text-white'
              }`}
              title="Freehand Pencil (Pen)"
            >
              <Pencil className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setTool('line')}
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                tool === 'line' ? 'bg-blue-600 text-white shadow-[0_0_12px_rgba(59,130,246,0.5)]' : 'hover:bg-white/10 text-zinc-400 hover:text-white'
              }`}
              title="Straight Line"
            >
              <Minus className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setTool('arrow')}
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                tool === 'arrow' ? 'bg-blue-600 text-white shadow-[0_0_12px_rgba(59,130,246,0.5)]' : 'hover:bg-white/10 text-zinc-400 hover:text-white'
              }`}
              title="Dataflow Arrow"
            >
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setTool('rectangle')}
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                tool === 'rectangle' ? 'bg-blue-600 text-white shadow-[0_0_12px_rgba(59,130,246,0.5)]' : 'hover:bg-white/10 text-zinc-400 hover:text-white'
              }`}
              title="Enclave / Container Box"
            >
              <Square className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setTool('circle')}
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                tool === 'circle' ? 'bg-blue-600 text-white shadow-[0_0_12px_rgba(59,130,246,0.5)]' : 'hover:bg-white/10 text-zinc-400 hover:text-white'
              }`}
              title="Node Circle"
            >
              <CircleIcon className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setTool('stamp')}
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                tool === 'stamp' ? 'bg-blue-600 text-white shadow-[0_0_12px_rgba(59,130,246,0.5)]' : 'hover:bg-white/10 text-zinc-400 hover:text-white'
              }`}
              title="Architectural Stamp (Cloud / DB / HSM)"
            >
              <Cloud className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setTool('text')}
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                tool === 'text' ? 'bg-blue-600 text-white shadow-[0_0_12px_rgba(59,130,246,0.5)]' : 'hover:bg-white/10 text-zinc-400 hover:text-white'
              }`}
              title="Text Annotation"
            >
              <Type className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setTool('eraser')}
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                tool === 'eraser' ? 'bg-red-600 text-white shadow-[0_0_12px_rgba(239,68,68,0.5)]' : 'hover:bg-white/10 text-zinc-400 hover:text-white'
              }`}
              title="Eraser"
            >
              <Eraser className="w-4 h-4" />
            </button>
          </div>

          <div className="w-full h-px bg-white/15 my-0.5" />

          {/* Stamp Type Selector Popup if Tool === Stamp */}
          {tool === 'stamp' && (
            <div className="flex flex-col gap-1 p-1.5 rounded-xl bg-zinc-900 border border-white/20">
              <span className="text-[8px] font-mono text-zinc-400 uppercase text-center">Stamp</span>
              <button
                type="button"
                onClick={() => setStamp('cloud')}
                className={`p-1.5 rounded ${stamp === 'cloud' ? 'bg-blue-500 text-white' : 'text-zinc-400 hover:text-white'}`}
                title="Cloud Enclave"
              >
                <Cloud className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setStamp('database')}
                className={`p-1.5 rounded ${stamp === 'database' ? 'bg-blue-500 text-white' : 'text-zinc-400 hover:text-white'}`}
                title="Database / ScyllaDB"
              >
                <Database className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setStamp('shield')}
                className={`p-1.5 rounded ${stamp === 'shield' ? 'bg-blue-500 text-white' : 'text-zinc-400 hover:text-white'}`}
                title="HSM / Vault Shield"
              >
                <Shield className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setStamp('server')}
                className={`p-1.5 rounded ${stamp === 'server' ? 'bg-blue-500 text-white' : 'text-zinc-400 hover:text-white'}`}
                title="K8s Pod / Server"
              >
                <Server className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Grid Style Toggle */}
          <button
            type="button"
            onClick={() => setGrid(g => g === 'blueprint' ? 'dots' : g === 'dots' ? 'clean' : 'blueprint')}
            className="p-2 rounded-xl hover:bg-white/10 text-zinc-400 hover:text-white cursor-pointer transition-all"
            title={`Grid: ${grid.toUpperCase()}`}
          >
            <Grid className="w-4 h-4 text-cyan-400" />
          </button>
        </div>

        {/* Top Right Floating Action Bar (Color Swatches, Stroke, Undo, Clear, Export) */}
        <div className="absolute top-3 right-3 z-30 flex items-center gap-2 p-2 rounded-2xl bg-zinc-950/90 border border-white/15 shadow-2xl backdrop-blur-md">
          
          {/* Color Palette */}
          <div className="flex items-center gap-1.5 px-2 border-r border-white/15">
            {COLOR_SWATCHES.map(s => (
              <button
                key={s.value}
                type="button"
                onClick={() => setColor(s.value)}
                style={{ backgroundColor: s.value }}
                className={`w-5 h-5 rounded-full border transition-all cursor-pointer ${
                  color === s.value ? 'scale-125 border-white ring-2 ring-blue-400/60' : 'border-white/20 opacity-80 hover:opacity-100'
                }`}
                title={s.label}
              />
            ))}
          </div>

          {/* Stroke Width Selector */}
          <div className="flex items-center gap-2 px-2 border-r border-white/15">
            <span className="text-[10px] font-mono text-zinc-400">Size: {lineWidth}px</span>
            <input
              type="range"
              min="1"
              max="16"
              value={lineWidth}
              onChange={(e) => setLineWidth(Number(e.target.value))}
              className="w-16 accent-blue-500 cursor-pointer"
            />
          </div>

          {/* Undo / Redo */}
          <button
            type="button"
            onClick={handleUndo}
            disabled={historyStep <= 0}
            className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-zinc-300 disabled:opacity-30 cursor-pointer transition-all"
            title="Undo (Ctrl+Z)"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Clear Canvas */}
          <button
            type="button"
            onClick={handleClear}
            className="p-1.5 rounded-lg bg-red-500/20 border border-red-400/30 hover:bg-red-500/30 text-red-300 cursor-pointer transition-all"
            title="Clear Canvas"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>

          {/* Export PNG */}
          <button
            type="button"
            onClick={handleExportPNG}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold cursor-pointer transition-all shadow-[0_0_12px_rgba(59,130,246,0.4)]"
            title="Export PNG Diagram"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export PNG</span>
          </button>
        </div>

        {/* Peer Cursor Overlay Simulation */}
        {peerCursor && (
          <div 
            className="absolute z-20 pointer-events-none transition-all duration-300 ease-out flex items-center gap-1.5"
            style={{ top: `${peerCursor.y}px`, left: `${peerCursor.x}px` }}
          >
            <div className="w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-zinc-900 shadow-[0_0_12px_rgba(16,185,129,0.8)] animate-bounce" />
            <span className="px-2 py-0.5 rounded bg-emerald-950/90 border border-emerald-500/40 text-[9px] font-mono font-bold text-emerald-300 whitespace-nowrap shadow-lg">
              {peerCursor.name}
            </span>
          </div>
        )}

        {/* Canvas Element */}
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
          className="w-full h-full block"
        />

        {/* Text Input Modal Overlay when Placing Text */}
        {isPlacingText && textPos && (
          <div 
            className="absolute z-40 p-3 rounded-2xl bg-zinc-950 border border-blue-500/40 shadow-2xl flex items-center gap-2"
            style={{ top: `${Math.min(textPos.y, 450)}px`, left: `${Math.min(textPos.x, 600)}px` }}
          >
            <input
              type="text"
              autoFocus
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Type node label..."
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleConfirmText();
                if (e.key === 'Escape') setIsPlacingText(false);
              }}
              className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-white/20 text-white text-xs outline-none focus:border-blue-400 w-52"
            />
            <button
              type="button"
              onClick={handleConfirmText}
              className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold cursor-pointer"
            >
              Add
            </button>
          </div>
        )}

        {/* Toast Notification when Loading Template */}
        {activeTemplateToast && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 px-4 py-2 rounded-2xl bg-zinc-950/95 border border-cyan-400/40 text-cyan-300 text-xs font-mono font-bold shadow-2xl flex items-center gap-2 animate-pulse">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>{activeTemplateToast}</span>
          </div>
        )}
      </div>

      {/* Bottom Status & Help Footer */}
      <div className="flex items-center justify-between px-4 py-1.5 bg-zinc-950 border-t border-white/10 text-[10px] font-mono text-zinc-400 shrink-0">
        <div className="flex items-center gap-3">
          <span>Active Tool: <strong className="text-cyan-400 uppercase">{tool}</strong></span>
          <span>•</span>
          <span>Grid Mesh: <strong className="text-blue-400 uppercase">{grid}</strong></span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-zinc-500">
          <span>Live 2D Canvas Engine • Vector HNSW & Security Architecture Sandbox</span>
        </div>
      </div>
    </div>
  );
};
