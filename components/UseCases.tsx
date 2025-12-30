import React, { useState, useEffect } from 'react';
import { Film, Gamepad2, Download, Play, Wifi } from 'lucide-react';

const UseCases: React.FC = () => {
  const [activeCase, setActiveCase] = useState<'streaming' | 'gaming' | 'updates'>('streaming');
  const [progress, setProgress] = useState(0);
  const [buffering, setBuffering] = useState(false);

  // Simulation Logic
  useEffect(() => {
    setProgress(0);
    setBuffering(true);

    let interval: any;
    
    // Simulate initial buffering/connection
    const startTimeout = setTimeout(() => {
        setBuffering(false);
        interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                // Different speeds for different cases
                const speed = activeCase === 'gaming' ? 10 : activeCase === 'streaming' ? 2 : 5;
                return prev + speed;
            });
        }, 100);
    }, 1500); // 1.5s initial delay

    return () => {
        clearTimeout(startTimeout);
        clearInterval(interval);
    };
  }, [activeCase]);

  return (
    <div className="flex flex-col h-full">
      {/* Navigation Buttons */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { id: 'streaming', label: 'Streaming', icon: Film, color: 'red' },
          { id: 'gaming', label: 'Gaming', icon: Gamepad2, color: 'purple' },
          { id: 'updates', label: 'Software', icon: Download, color: 'blue' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveCase(item.id as any)}
            className={`
                flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all
                ${activeCase === item.id 
                    ? `bg-slate-800 border-${item.color}-500 shadow-lg scale-105` 
                    : 'bg-slate-900 border-slate-700 opacity-60 hover:opacity-100'}
            `}
          >
            <item.icon size={32} className={`mb-2 text-${item.color}-400`} />
            <span className="font-bold">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Main Display Area */}
      <div className="flex-1 bg-black rounded-2xl border border-slate-700 relative overflow-hidden flex items-center justify-center p-8">
        
        {/* Scenario: Streaming */}
        {activeCase === 'streaming' && (
          <div className="w-full max-w-lg aspect-video bg-slate-900 rounded-lg relative overflow-hidden border border-slate-800 group">
             {buffering ? (
                 <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-black/50">
                     <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin mb-2"></div>
                     <span className="text-xs text-white">Buffering (Pre-CDN Simulation)...</span>
                 </div>
             ) : (
                 <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl animate-pulse">🍿</span>
                 </div>
             )}
             
             {/* Progress Bar */}
             <div className="absolute bottom-0 left-0 h-1 bg-red-600 transition-all duration-300" style={{ width: `${progress}%` }}></div>
             
             {/* Controls Mockup */}
             <div className="absolute bottom-4 left-4 right-4 flex justify-between text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Play size={20} fill="white" />
                <div className="w-full mx-4 h-1 bg-gray-600 mt-2 rounded"></div>
             </div>
          </div>
        )}

        {/* Scenario: Gaming */}
        {activeCase === 'gaming' && (
             <div className="w-full text-center">
                 <Gamepad2 size={64} className="mx-auto text-purple-500 mb-6" />
                 <div className="bg-slate-900 inline-block px-8 py-4 rounded-lg border border-slate-700">
                    <div className="flex items-center gap-4 text-2xl font-mono">
                        <Wifi className={buffering ? "text-red-500" : "text-green-500"} />
                        <span className={buffering ? "text-red-400" : "text-green-400"}>
                            Ping: {buffering ? "154ms" : "24ms"}
                        </span>
                    </div>
                    <p className="text-sm text-slate-500 mt-2">
                        {buffering ? "Routing to Origin (High Latency)" : "Connected to Edge Node (Low Latency)"}
                    </p>
                 </div>
             </div>
        )}

        {/* Scenario: Software Updates */}
        {activeCase === 'updates' && (
            <div className="w-full max-w-md">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <Download className="text-blue-400" />
                    </div>
                    <div>
                        <h4 className="font-bold text-lg">System Update v2.0</h4>
                        <p className="text-sm text-slate-400">Downloading from closest PoP...</p>
                    </div>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-4 overflow-hidden border border-slate-700">
                    <div 
                        className="bg-blue-500 h-full transition-all duration-300 relative overflow-hidden" 
                        style={{ width: `${progress}%` }}
                    >
                        <div className="absolute inset-0 bg-white/20 animate-[shimmer_1s_infinite] skew-x-12"></div>
                    </div>
                </div>
                <div className="flex justify-between mt-2 text-sm font-mono text-slate-400">
                    <span>{progress.toFixed(0)}%</span>
                    <span>{buffering ? "Estimating..." : "12MB/s"}</span>
                </div>
            </div>
        )}
      </div>
      
      <div className="mt-4 text-center text-slate-400 text-sm">
        {activeCase === 'streaming' && "CDNs cache video segments near users to prevent buffering interruptions."}
        {activeCase === 'gaming' && "Multiplayer servers rely on CDNs to route traffic via the fastest path to reduce lag."}
        {activeCase === 'updates' && "Global software releases are distributed to thousands of servers so downloads don't crash the main site."}
      </div>
    </div>
  );
};

export default UseCases;