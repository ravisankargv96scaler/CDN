import React, { useState } from 'react';
import { 
  Globe2, 
  Settings, 
  Database, 
  Scale, 
  Briefcase, 
  Award,
  ChevronRight
} from 'lucide-react';
import { TabId, TabConfig } from './types';

// Tab Components
import SimulationMap from './components/SimulationMap';
import RequestFlow from './components/RequestFlow';
import ComponentExplorer from './components/ComponentExplorer';
import TradeOffs from './components/TradeOffs';
import UseCases from './components/UseCases';
import QuizSection from './components/QuizSection';

const tabs: TabConfig[] = [
  { id: TabId.CONCEPT, label: 'What is a CDN?', icon: Globe2 },
  { id: TabId.MECHANICS, label: 'How It Works', icon: Settings },
  { id: TabId.COMPONENTS, label: 'Components', icon: Database },
  { id: TabId.TRADE_OFFS, label: 'Pros & Cons', icon: Scale },
  { id: TabId.USE_CASES, label: 'Use Cases', icon: Briefcase },
  { id: TabId.PROVIDERS, label: 'Quiz', icon: Award },
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>(TabId.CONCEPT);
  const [isSimulating, setIsSimulating] = useState(false);

  // Simulation handler for Tab 1
  const runSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => setIsSimulating(false), 3000);
  };

  const renderContent = () => {
    switch (activeTab) {
      case TabId.CONCEPT:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-bold text-slate-300">Without CDN</h3>
              <p className="text-sm text-slate-400">Users connect directly to the origin server, often crossing oceans. High latency.</p>
              <SimulationMap hasCDN={false} isSimulating={isSimulating} />
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-bold text-slate-300">With CDN</h3>
              <p className="text-sm text-slate-400">Users connect to a nearby local server (Edge). Low latency.</p>
              <SimulationMap hasCDN={true} isSimulating={isSimulating} />
            </div>
            <div className="col-span-1 md:col-span-2 flex justify-center mt-4">
               <button 
                  onClick={runSimulation}
                  disabled={isSimulating}
                  className="bg-network-accent hover:bg-cyan-400 text-slate-900 font-bold py-3 px-8 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSimulating ? 'Simulating Traffic...' : 'Simulate Global Request'}
                </button>
            </div>
          </div>
        );
      case TabId.MECHANICS:
        return <RequestFlow />;
      case TabId.COMPONENTS:
        return <ComponentExplorer />;
      case TabId.TRADE_OFFS:
        return <TradeOffs />;
      case TabId.USE_CASES:
        return <UseCases />;
      case TabId.PROVIDERS:
        return <QuizSection />;
      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <div className="min-h-screen bg-network-dark text-slate-100 font-sans selection:bg-network-accent selection:text-black">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-network-accent p-2 rounded-lg">
                <Globe2 className="text-slate-900" size={24} />
            </div>
            <div>
                <h1 className="text-xl font-bold tracking-tight">CDN Explorer</h1>
                <p className="text-xs text-slate-500 font-mono">System Design Interactive</p>
            </div>
          </div>
          <div className="hidden md:flex text-xs text-slate-500 gap-4">
            <span>Latency Matters</span>
            <span>•</span>
            <span>Distributed Systems</span>
            <span>•</span>
            <span>Caching Strategy</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Navigation */}
          <nav className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-network-panel rounded-2xl p-2 border border-slate-800 sticky top-24">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center justify-between p-3 mb-1 rounded-xl transition-all duration-200 group ${
                      isActive 
                        ? 'bg-slate-800 text-network-accent shadow-inner' 
                        : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                        <Icon size={18} className={isActive ? 'text-network-accent' : 'text-slate-500 group-hover:text-slate-300'} />
                        <span className="font-medium text-sm">{tab.label}</span>
                    </div>
                    {isActive && <ChevronRight size={14} />}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Main Content Area */}
          <section className="flex-1 min-h-[600px] bg-slate-900/50 rounded-3xl border border-slate-800 p-6 md:p-8 relative">
            {/* Background decoration grid */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
            </div>
            
            <div className="relative z-10 h-full">
                {renderContent()}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
};

export default App;