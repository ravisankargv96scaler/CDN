import React, { useState, useEffect } from 'react';
import { User, Globe, Server, Database, ArrowRight, CheckCircle, Search } from 'lucide-react';

type Step = 0 | 1 | 2 | 3 | 4;
type Scenario = 'hit' | 'miss';

const RequestFlow: React.FC = () => {
  const [step, setStep] = useState<Step>(0);
  const [scenario, setScenario] = useState<Scenario>('hit');
  const [isAnimating, setIsAnimating] = useState(false);

  const startAnimation = (selectedScenario: Scenario) => {
    if (isAnimating) return;
    setScenario(selectedScenario);
    setIsAnimating(true);
    setStep(0);
  };

  useEffect(() => {
    if (!isAnimating) return;

    const timings = scenario === 'hit' ? [0, 1000, 2000, 3000, 4000] : [0, 1000, 2000, 3000, 5000];
    
    // Step 1: User -> DNS
    setTimeout(() => setStep(1), timings[0]);
    // Step 2: DNS -> Edge
    setTimeout(() => setStep(2), timings[1]);
    
    // Step 3: Edge Processing
    if (scenario === 'hit') {
        // Immediate return
        setTimeout(() => setStep(4), timings[2]);
        setTimeout(() => {
            setIsAnimating(false);
            setStep(0);
        }, timings[3]);
    } else {
        // Fetch from Origin
        setTimeout(() => setStep(3), timings[2]); // To Origin
        setTimeout(() => setStep(4), timings[3]); // Back to User
        setTimeout(() => {
            setIsAnimating(false);
            setStep(0);
        }, timings[4]);
    }

  }, [isAnimating, scenario]);

  const Node = ({ icon: Icon, label, active, color }: any) => (
    <div className={`flex flex-col items-center transition-all duration-500 ${active ? 'scale-110 opacity-100' : 'opacity-50 scale-100'}`}>
      <div className={`p-4 rounded-full border-2 ${active ? `border-${color}-500 bg-${color}-500/20 shadow-[0_0_15px_rgba(0,0,0,0.5)]` : 'border-slate-700 bg-slate-800'}`}>
        <Icon size={32} className={active ? `text-${color}-400` : 'text-slate-400'} />
      </div>
      <span className={`mt-2 font-mono text-sm ${active ? `text-${color}-400 font-bold` : 'text-slate-500'}`}>{label}</span>
    </div>
  );

  return (
    <div className="flex flex-col items-center w-full h-full p-6">
      <div className="flex gap-4 mb-8">
        <button 
          onClick={() => startAnimation('hit')}
          disabled={isAnimating}
          className={`px-6 py-2 rounded-lg font-bold transition-all ${isAnimating ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'} bg-emerald-600 text-white hover:bg-emerald-500`}
        >
          Trace: Cache Hit
        </button>
        <button 
           onClick={() => startAnimation('miss')}
           disabled={isAnimating}
           className={`px-6 py-2 rounded-lg font-bold transition-all ${isAnimating ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'} bg-amber-600 text-white hover:bg-amber-500`}
        >
          Trace: Cache Miss
        </button>
      </div>

      <div className="relative flex items-center justify-between w-full max-w-4xl p-10 bg-network-panel rounded-2xl border border-slate-700">
        
        {/* Connection Lines - Absolute to be behind nodes */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-700 -z-0"></div>
        
        {/* Node 1: User */}
        <div className="relative z-10 bg-network-panel px-2">
            <Node icon={User} label="User" active={step >= 1} color="blue" />
        </div>

        {/* Arrow 1 */}
        <div className="relative z-10 bg-network-panel px-2">
           <ArrowRight className={`transition-colors duration-300 ${step >= 1 ? 'text-blue-500' : 'text-slate-700'}`} />
        </div>

        {/* Node 2: DNS */}
        <div className="relative z-10 bg-network-panel px-2">
            <Node icon={Globe} label="DNS Resolver" active={step >= 2} color="purple" />
        </div>

        {/* Arrow 2 */}
        <div className="relative z-10 bg-network-panel px-2">
           <ArrowRight className={`transition-colors duration-300 ${step >= 2 ? 'text-purple-500' : 'text-slate-700'}`} />
        </div>

        {/* Node 3: Edge */}
        <div className="relative z-10 bg-network-panel px-2">
            <Node icon={Server} label="Edge Server" active={step >= 2} color="emerald" />
            {/* Status Indicator Bubble */}
            {step >= 2 && (
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900 border border-slate-600 px-3 py-1 rounded text-xs animate-bounce">
                    {step === 2 && "Checking Cache..."}
                    {step > 2 && scenario === 'hit' && <span className="text-emerald-400 flex items-center gap-1"><CheckCircle size={12}/> HIT</span>}
                    {step > 2 && scenario === 'miss' && step < 4 && <span className="text-amber-400 flex items-center gap-1"><Search size={12}/> MISS</span>}
                </div>
            )}
        </div>

        {/* Conditional Path for Miss */}
        {scenario === 'miss' && (
            <>
                 <div className="relative z-10 bg-network-panel px-2">
                    <ArrowRight className={`transition-colors duration-300 ${step === 3 ? 'text-amber-500 animate-pulse' : 'text-slate-700'}`} />
                </div>
                <div className="relative z-10 bg-network-panel px-2">
                    <Node icon={Database} label="Origin" active={step === 3} color="amber" />
                </div>
            </>
        )}
      </div>
      
      <div className="mt-8 text-center text-slate-300 h-12">
          {step === 0 && "Click a button to start the request trace."}
          {step === 1 && "User sends a request for 'image.jpg'..."}
          {step === 2 && "DNS routes the user to the nearest Edge Server IP."}
          {step === 3 && scenario === 'miss' && "Content not in Edge Cache. Fetching from Origin..."}
          {step === 4 && "Content delivered to User! (Cached for next time)"}
      </div>
    </div>
  );
};

export default RequestFlow;