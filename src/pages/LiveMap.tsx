import React, { useMemo, useState } from 'react';
import { MapComponent } from '../components/ui/MapComponent';
import { GlassPanel } from '../components/ui/GlassPanel';
import { RoutingPanel } from '../components/ui/RoutingPanel';
import { useCrowdSimulation } from '../hooks/useCrowdSimulation';
import { RouteResult } from '../services/routingService';
import { Users, Zap, Thermometer, TrendingUp, TrendingDown, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

export const LiveMap: React.FC = () => {
  const { buildings } = useCrowdSimulation(5000);
  const [activeRoute, setActiveRoute] = useState<RouteResult | null>(null);

  // Sort buildings by occupancy for the floating panel
  const sortedBuildings = useMemo(() => {
    return [...buildings].sort((a, b) => b.occupancy - a.occupancy);
  }, [buildings]);

  const topCrowded = sortedBuildings.slice(0, 2);
  const leastCrowded = sortedBuildings.slice(-2).reverse();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full relative">
      <div className="lg:col-span-3 h-[600px] lg:h-full relative group">
        <MapComponent activeRoute={activeRoute} />
        
        {/* Floating AI Insights Panel */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute top-6 right-6 w-72 hidden xl:block pointer-events-none"
        >
          <div className="glass-panel p-5 pointer-events-auto border-emerald-500/10">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 rounded-lg bg-emerald-500/20">
                <MapPin className="w-4 h-4 text-emerald-500" />
              </div>
              <h3 className="text-xs font-black uppercase tracking-widest">Zone Insights</h3>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-3 h-3 text-red-400" />
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider">High Density</span>
                </div>
                <div className="space-y-2">
                  {topCrowded.map(b => (
                    <div key={b.id} className="glass-card p-3 flex items-center justify-between">
                      <span className="text-xs font-medium">{b.name}</span>
                      <span className="text-xs font-bold text-red-400">{Math.round((b.occupancy/b.capacity)*100)}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <TrendingDown className="w-3 h-3 text-emerald-400" />
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider">Low Density</span>
                </div>
                <div className="space-y-2">
                  {leastCrowded.map(b => (
                    <div key={b.id} className="glass-card p-3 flex items-center justify-between">
                      <span className="text-xs font-medium">{b.name}</span>
                      <span className="text-xs font-bold text-emerald-400">{Math.round((b.occupancy/b.capacity)*100)}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/5">
              <p className="text-[10px] text-white/30 italic">AI Suggestion: Redirect traffic from Mess D to SMV Block for optimal flow.</p>
            </div>
          </div>
        </motion.div>
      </div>
      
      <div className="flex flex-col gap-6">
        <RoutingPanel currentBuildings={buildings} onRouteSelect={setActiveRoute} />

        <GlassPanel title="Building Status" className="flex-1">
          <div className="flex flex-col gap-4 mt-2">
            {buildings.map((building) => (
              <div key={building.id} className="glass-card p-4 flex flex-col gap-3 group hover:bg-white/10 transition-all cursor-pointer">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm group-hover:text-emerald-400 transition-colors">{building.name}</h4>
                  <span className={`w-2 h-2 rounded-full ${
                    building.status === 'optimal' ? 'bg-emerald-500' : 
                    building.status === 'warning' ? 'bg-amber-500' : 'bg-red-500'
                  }`} />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-3 h-3 text-white/30" />
                    <span className="text-xs text-white/60">{building.occupancy}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-3 h-3 text-white/30" />
                    <span className="text-xs text-white/60">{building.energyUsage}kW</span>
                  </div>
                </div>

                <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(building.occupancy / building.capacity) * 100}%` }}
                    className={`h-full rounded-full ${
                      building.status === 'optimal' ? 'bg-emerald-500' : 
                      building.status === 'warning' ? 'bg-amber-500' : 'bg-red-500'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>

        <GlassPanel title="Environmental" className="h-48">
          <div className="flex flex-col gap-4 mt-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-emerald-500" />
                <span className="text-sm text-white/60">Avg. Temp</span>
              </div>
              <span className="text-lg font-display font-bold">22.4°C</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-500" />
                <span className="text-sm text-white/60">Grid Load</span>
              </div>
              <span className="text-lg font-display font-bold">84%</span>
            </div>
          </div>
        </GlassPanel>
      </div>
    </div>
  );
};
