import React, { useState } from 'react';
import { Server, Database, Globe2, Zap, ArrowRight, ShieldCheck, Network } from 'lucide-react';

const ComponentExplorer: React.FC = () => {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const components = [
    {
      id: 'origin',
      title: 'Origin Server',
      icon: Database,
      color: 'blue',
      role: 'The Source of Truth',
      description: 'The master server where the original version of your application and files reside. Without a CDN, every user request hits this server directly.',
      details: [
        'Maintains the "master copy" of data',
        'Updates are pushed here first',
        'Can be easily overwhelmed by traffic spikes'
      ]
    },
    {
      id: 'pop',
      title: 'Point of Presence (PoP)',
      icon: Globe2,
      color: 'purple',
      role: 'Physical Locations',
      description: 'A strategic physical location (data center) where CDN servers are housed. CDNs have PoPs all over the world to be close to users.',
      details: [
        'Located at internet exchange points (IXPs)',
        'Reduces physical distance to users',
        'Contains clusters of Edge Servers'
      ]
    },
    {
      id: 'edge',
      title: 'Edge Server',
      icon: Server,
      color: 'emerald',
      role: 'The Delivery Agent',
      description: 'The server that actually communicates with the user. It caches content from the Origin and delivers it quickly.',
      details: [
        'Caches static files (images, css, js)',
        'Handles SSL/TLS termination',
        'Provides DDoS protection'
      ]
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full items-start">
      {components.map((comp) => {
        const isActive = activeCard === comp.id;
        const Icon = comp.icon;
        
        return (
          <div 
            key={comp.id}
            onClick={() => setActiveCard(isActive ? null : comp.id)}
            className={`
              relative cursor-pointer rounded-xl border transition-all duration-300 overflow-hidden group
              ${isActive 
                ? `bg-slate-800 border-${comp.color}-500 shadow-[0_0_20px_rgba(0,0,0,0.3)] col-span-1 md:col-span-1 md:row-span-2` 
                : 'bg-slate-800/50 border-slate-700 hover:border-slate-500 hover:bg-slate-700/50'}
            `}
          >
            <div className="p-6">
              <div className={`
                w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors
                ${isActive ? `bg-${comp.color}-500 text-white` : `bg-slate-700 text-${comp.color}-400 group-hover:bg-slate-600`}
              `}>
                <Icon size={24} />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-1">{comp.title}</h3>
              <p className={`text-sm font-mono uppercase tracking-wider mb-4 text-${comp.color}-400`}>{comp.role}</p>
              
              <div className={`transition-all duration-500 overflow-hidden ${isActive ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="text-slate-300 mb-4 leading-relaxed">
                  {comp.description}
                </p>
                <ul className="space-y-2">
                  {comp.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start text-sm text-slate-400">
                      <ArrowRight size={14} className={`mr-2 mt-1 text-${comp.color}-500`} />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>

              {!isActive && (
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs text-slate-500">Click to learn more</span>
                </div>
              )}
            </div>
            
            {/* Decorative background element */}
            <div className={`absolute -right-10 -bottom-10 w-32 h-32 rounded-full bg-${comp.color}-500/10 blur-2xl transition-all duration-500 group-hover:bg-${comp.color}-500/20`} />
          </div>
        );
      })}
    </div>
  );
};

export default ComponentExplorer;