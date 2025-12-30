import React, { useState, useEffect } from 'react';
import { Server, Users, Zap, Clock, AlertTriangle } from 'lucide-react';

interface SimulationMapProps {
  hasCDN: boolean;
  isSimulating: boolean;
}

const SimulationMap: React.FC<SimulationMapProps> = ({ hasCDN, isSimulating }) => {
  const [latency, setLatency] = useState<number>(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isSimulating) {
      setFinished(false);
      setLatency(0);
      const targetLatency = hasCDN ? 200 : 2500;
      const step = hasCDN ? 10 : 50;
      
      interval = setInterval(() => {
        setLatency((prev) => {
          if (prev >= targetLatency) {
            clearInterval(interval);
            setFinished(true);
            return targetLatency;
          }
          return prev + step;
        });
      }, 50);
    } else {
      setLatency(0);
      setFinished(false);
    }
    return () => clearInterval(interval);
  }, [isSimulating, hasCDN]);

  // Coordinates for the abstract map elements
  // Using a cleaner grid layout to prevent overlaps
  const pos = {
    origin: { top: '50%', left: '15%' },     // Centered Left
    edgeEU: { top: '25%', left: '50%' },     // Top Middle
    userEU: { top: '25%', left: '85%' },     // Top Right
    edgeAsia: { top: '75%', left: '50%' },   // Bottom Middle
    userAsia: { top: '75%', left: '85%' }    // Bottom Right
  };

  const getLatencyStatus = () => {
    if (latency === 0) return { label: 'Idle', color: 'text-slate-500' };
    if (hasCDN) return { label: 'Excellent', color: 'text-network-success' };
    if (latency < 1000) return { label: 'Good', color: 'text-network-warning' };
    return { label: 'Critical', color: 'text-network-danger' };
  };

  const status = getLatencyStatus();

  return (
    <div className="relative bg-network-panel border border-slate-700 rounded-2xl p-6 h-[32rem] overflow-hidden flex flex-col shadow-2xl">
      
      {/* Title Section */}
      <div className="text-center font-bold mb-4 flex items-center justify-center gap-3 shrink-0">
        <div className={`p-2 rounded-lg ${hasCDN ? 'bg-network-success/10' : 'bg-network-danger/10'}`}>
          {hasCDN ? <Zap className="text-network-success" size={20} /> : <AlertTriangle className="text-network-danger" size={20} />}
        </div>
        <span className="text-lg tracking-tight">
          {hasCDN ? "Edge-Optimized Network" : "Legacy Single-Origin Architecture"}
        </span>
      </div>

      {/* Abstract Map Area */}
      <div className="relative flex-1 w-full bg-slate-800/30 rounded-xl border border-slate-700/40 overflow-hidden mb-4">
        
        {/* Origin Server (USA) */}
        <div className="absolute flex flex-col items-center z-20 transition-all -translate-x-1/2 -translate-y-1/2" style={pos.origin}>
          <div className="p-2 bg-blue-500/20 rounded-lg border border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            <Server className="text-blue-400" size={28} />
          </div>
          <span className="text-[10px] font-bold text-blue-400 mt-2 uppercase tracking-tighter">Origin (US)</span>
        </div>

        {/* Edge Servers */}
        {hasCDN && (
          <>
            <div className="absolute flex flex-col items-center z-20 animate-in zoom-in duration-500 -translate-x-1/2 -translate-y-1/2" style={pos.edgeEU}>
              <div className="p-2 bg-emerald-500/20 rounded-lg border border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                <Server className="text-emerald-400" size={22} />
              </div>
              <span className="text-[10px] font-bold text-emerald-400 mt-2 uppercase tracking-tighter">Edge (EU)</span>
            </div>
            <div className="absolute flex flex-col items-center z-20 animate-in zoom-in duration-500 -translate-x-1/2 -translate-y-1/2" style={pos.edgeAsia}>
              <div className="p-2 bg-emerald-500/20 rounded-lg border border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                <Server className="text-emerald-400" size={22} />
              </div>
              <span className="text-[10px] font-bold text-emerald-400 mt-2 uppercase tracking-tighter">Edge (AS)</span>
            </div>
          </>
        )}

        {/* User Nodes */}
        <div className="absolute flex flex-col items-center z-20 -translate-x-1/2 -translate-y-1/2" style={pos.userEU}>
          <Users className="text-slate-300 bg-slate-800 p-1.5 rounded-full border border-slate-600" size={24} />
          <span className="text-[10px] font-medium text-slate-500 mt-1 uppercase">User (EU)</span>
        </div>
        <div className="absolute flex flex-col items-center z-20 -translate-x-1/2 -translate-y-1/2" style={pos.userAsia}>
          <Users className="text-slate-300 bg-slate-800 p-1.5 rounded-full border border-slate-600" size={24} />
          <span className="text-[10px] font-medium text-slate-500 mt-1 uppercase">User (ASIA)</span>
        </div>

        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-40">
          {isSimulating && (
            <>
              {/* Line to User EU */}
              <line
                x1={hasCDN ? pos.edgeEU.left : pos.origin.left}
                y1={hasCDN ? pos.edgeEU.top : pos.origin.top}
                x2={pos.userEU.left}
                y2={pos.userEU.top}
                stroke={hasCDN ? "#10b981" : "#ef4444"}
                strokeWidth="2"
                strokeDasharray="4 4"
                className={finished ? "" : "animate-dash"}
              />
              {/* Line to User Asia */}
              <line
                x1={hasCDN ? pos.edgeAsia.left : pos.origin.left}
                y1={hasCDN ? pos.edgeAsia.top : pos.origin.top}
                x2={pos.userAsia.left}
                y2={pos.userAsia.top}
                stroke={hasCDN ? "#10b981" : "#ef4444"}
                strokeWidth="2"
                strokeDasharray="4 4"
                className={finished ? "" : "animate-dash"}
              />
            </>
          )}
        </svg>

        {/* Moving Packets */}
        {isSimulating && !finished && (
          <>
            <div 
              className={`absolute w-3 h-3 rounded-full blur-[2px] shadow-[0_0_10px_currentColor] z-30 ${hasCDN ? 'text-network-success bg-network-success' : 'text-network-danger bg-network-danger'}`}
              style={{
                animation: hasCDN 
                  ? 'packetEU_CDN 0.6s ease-in-out infinite' 
                  : 'packetEU_NoCDN 2.5s ease-in-out infinite'
              }}
            />
             <div 
              className={`absolute w-3 h-3 rounded-full blur-[2px] shadow-[0_0_10px_currentColor] z-30 ${hasCDN ? 'text-network-success bg-network-success' : 'text-network-danger bg-network-danger'}`}
              style={{
                animation: hasCDN 
                  ? 'packetAsia_CDN 0.6s ease-in-out infinite' 
                  : 'packetAsia_NoCDN 2.5s ease-in-out infinite'
              }}
            />
          </>
        )}
      </div>

      {/* Latency UI - Positioned OUTSIDE map area (Footer) */}
      <div className="flex items-center justify-between bg-slate-900/50 border border-slate-700/50 px-5 py-3 rounded-xl shrink-0 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${hasCDN ? 'bg-emerald-500/10' : 'bg-red-500/10'}`}>
               <Clock size={18} className={hasCDN ? "text-network-success" : "text-network-danger"} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Latency</span>
              <span className={`font-mono text-xl font-bold leading-none ${hasCDN ? "text-emerald-100" : "text-red-100"}`}>
                {latency}<span className="text-xs ml-0.5 text-slate-500">ms</span>
              </span>
            </div>
          </div>
          
          <div className="h-8 w-px bg-slate-700/50"></div>

          <div className="flex flex-col items-end">
              <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Status</span>
              <span className={`text-sm font-bold leading-none ${status.color}`}>
                {status.label}
              </span>
          </div>
      </div>

      <style>{`
        @keyframes packetEU_CDN {
          0% { top: 25%; left: 85%; opacity: 0; transform: scale(0.5); }
          50% { opacity: 1; transform: scale(1); }
          100% { top: 25%; left: 50%; opacity: 0; transform: scale(0.5); }
        }
        @keyframes packetEU_NoCDN {
          0% { top: 25%; left: 85%; opacity: 0; transform: scale(0.5); }
          50% { opacity: 1; transform: scale(1); }
          100% { top: 50%; left: 15%; opacity: 0; transform: scale(0.5); }
        }
        @keyframes packetAsia_CDN {
          0% { top: 75%; left: 85%; opacity: 0; transform: scale(0.5); }
          50% { opacity: 1; transform: scale(1); }
          100% { top: 75%; left: 50%; opacity: 0; transform: scale(0.5); }
        }
        @keyframes packetAsia_NoCDN {
          0% { top: 75%; left: 85%; opacity: 0; transform: scale(0.5); }
          50% { opacity: 1; transform: scale(1); }
          100% { top: 50%; left: 15%; opacity: 0; transform: scale(0.5); }
        }
        @keyframes dash {
          to {
            stroke-dashoffset: -20;
          }
        }
      `}</style>
    </div>
  );
};

export default SimulationMap;