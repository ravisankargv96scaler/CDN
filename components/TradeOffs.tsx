import React, { useState } from 'react';
import { TrendingUp, Shield, Activity, Users, DollarSign, RefreshCw, Layers } from 'lucide-react';

const TradeOffs: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null);

  const benefits = [
    { id: 'speed', label: 'Latency Reduction', icon: TrendingUp, text: "Serving content from the edge drastically reduces the physical distance data must travel." },
    { id: 'load', label: 'Reduced Server Load', icon: Activity, text: "Offloading static assets to the CDN frees up the Origin server to handle dynamic processing." },
    { id: 'avail', label: 'High Availability', icon: Users, text: "If one PoP goes down, traffic is automatically routed to the next nearest operational PoP." },
    { id: 'ddos', label: 'Security / DDoS', icon: Shield, text: "CDNs can absorb massive traffic spikes and attacks, acting as a shield for your Origin." },
  ];

  const challenges = [
    { id: 'complex', label: 'Complexity', icon: Layers, text: "Setting up DNS records, SSL certificates, and debugging distributed systems adds overhead." },
    { id: 'cost', label: 'Cost', icon: DollarSign, text: "While it saves bandwidth on the Origin, high-volume CDN usage costs can accumulate (charged per GB)." },
    { id: 'cache', label: 'Cache Invalidation', icon: RefreshCw, text: "Purging old content from thousands of servers globally can be tricky and takes time to propagate." },
  ];

  return (
    <div className="flex flex-col md:flex-row h-full gap-8">
      
      {/* Benefits Side */}
      <div className="flex-1 bg-slate-900/50 rounded-2xl border border-emerald-900/30 p-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500/50"></div>
        <h3 className="text-2xl font-bold text-emerald-400 mb-6 flex items-center gap-2">
          <TrendingUp /> Benefits
        </h3>
        <div className="grid gap-4">
          {benefits.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelected(item.id)}
              className={`text-left p-4 rounded-xl border transition-all ${
                selected === item.id 
                  ? 'bg-emerald-900/40 border-emerald-500 translate-x-2' 
                  : 'bg-slate-800 border-slate-700 hover:border-emerald-500/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className="text-emerald-400" size={20} />
                <span className="font-semibold text-slate-200">{item.label}</span>
              </div>
              {selected === item.id && (
                <p className="mt-2 text-sm text-emerald-100/80 animate-in fade-in slide-in-from-left-2">
                  {item.text}
                </p>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Challenges Side */}
      <div className="flex-1 bg-slate-900/50 rounded-2xl border border-rose-900/30 p-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-rose-500/50"></div>
        <h3 className="text-2xl font-bold text-rose-400 mb-6 flex items-center gap-2">
          <Layers /> Challenges
        </h3>
        <div className="grid gap-4">
          {challenges.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelected(item.id)}
              className={`text-left p-4 rounded-xl border transition-all ${
                selected === item.id 
                  ? 'bg-rose-900/40 border-rose-500 translate-x-2' 
                  : 'bg-slate-800 border-slate-700 hover:border-rose-500/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className="text-rose-400" size={20} />
                <span className="font-semibold text-slate-200">{item.label}</span>
              </div>
              {selected === item.id && (
                <p className="mt-2 text-sm text-rose-100/80 animate-in fade-in slide-in-from-left-2">
                  {item.text}
                </p>
              )}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};

export default TradeOffs;