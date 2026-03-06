import React, { useState, useEffect } from 'react';
import { GlassPanel } from './GlassPanel';
import { buildings } from '../../data/mockData';
import { routingService, RouteResult } from '../../services/routingService';
import { Building } from '../../types';
import { Navigation, Zap, Users, ArrowRight, Info } from 'lucide-react';
import { motion } from 'motion/react';

interface RoutingPanelProps {
  currentBuildings: Building[];
  onRouteSelect: (route: RouteResult | null) => void;
}

export const RoutingPanel: React.FC<RoutingPanelProps> = ({ currentBuildings, onRouteSelect }) => {
  const [startId, setStartId] = useState<string>('');
  const [endId, setEndId] = useState<string>('');
  const [fastestRoute, setFastestRoute] = useState<RouteResult | null>(null);
  const [lowCrowdRoute, setLowCrowdRoute] = useState<RouteResult | null>(null);
  const [selectedType, setSelectedType] = useState<'fastest' | 'low-crowd' | null>(null);

  useEffect(() => {
    if (startId && endId && startId !== endId) {
      const fastest = routingService.findPath(startId, endId, false, currentBuildings);
      const lowCrowd = routingService.findPath(startId, endId, true, currentBuildings);
      setFastestRoute(fastest);
      setLowCrowdRoute(lowCrowd);
    } else {
      setFastestRoute(null);
      setLowCrowdRoute(null);
      setSelectedType(null);
      onRouteSelect(null);
    }
  }, [startId, endId, currentBuildings]);

  const handleSelectRoute = (type: 'fastest' | 'low-crowd') => {
    setSelectedType(type);
    onRouteSelect(type === 'fastest' ? fastestRoute : lowCrowdRoute);
  };

  const getBuildingName = (id: string) => buildings.find(b => b.id === id)?.name || id;

  return (
    <GlassPanel title="Smart Routing" className="w-full">
      <div className="flex flex-col gap-4 mt-2">
        <div className="grid grid-cols-1 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-white/40 uppercase font-bold">Start Location</label>
            <select 
              value={startId}
              onChange={(e) => setStartId(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500/50"
            >
              <option value="" className="bg-[#050505]">Select Building</option>
              {buildings.map(b => (
                <option key={b.id} value={b.id} className="bg-[#050505]">{b.name}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-white/40 uppercase font-bold">Destination</label>
            <select 
              value={endId}
              onChange={(e) => setEndId(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500/50"
            >
              <option value="" className="bg-[#050505]">Select Building</option>
              {buildings.map(b => (
                <option key={b.id} value={b.id} className="bg-[#050505]">{b.name}</option>
              ))}
            </select>
          </div>
        </div>

        {fastestRoute && lowCrowdRoute && (
          <div className="flex flex-col gap-3 mt-2">
            <button 
              onClick={() => handleSelectRoute('fastest')}
              className={`glass-card p-4 text-left transition-all border-l-4 ${
                selectedType === 'fastest' ? 'border-l-blue-500 bg-blue-500/5' : 'border-l-transparent'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-blue-500" />
                  <span className="text-xs font-bold uppercase tracking-wider">Fastest Path</span>
                </div>
                <span className="text-xs font-bold text-blue-500">{fastestRoute.totalDistance}m</span>
              </div>
              <div className="flex flex-wrap items-center gap-1 text-[10px] text-white/60">
                {fastestRoute.path.map((id, i) => (
                  <React.Fragment key={id}>
                    <span>{getBuildingName(id)}</span>
                    {i < fastestRoute.path.length - 1 && <ArrowRight className="w-2 h-2" />}
                  </React.Fragment>
                ))}
              </div>
            </button>

            <button 
              onClick={() => handleSelectRoute('low-crowd')}
              className={`glass-card p-4 text-left transition-all border-l-4 ${
                selectedType === 'low-crowd' ? 'border-l-emerald-500 bg-emerald-500/5' : 'border-l-transparent'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs font-bold uppercase tracking-wider">Low Crowd Path</span>
                </div>
                <span className="text-xs font-bold text-emerald-500">
                  {Math.round(lowCrowdRoute.totalCrowdFactor * 100)}% density
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-1 text-[10px] text-white/60">
                {lowCrowdRoute.path.map((id, i) => (
                  <React.Fragment key={id}>
                    <span>{getBuildingName(id)}</span>
                    {i < lowCrowdRoute.path.length - 1 && <ArrowRight className="w-2 h-2" />}
                  </React.Fragment>
                ))}
              </div>
            </button>
          </div>
        )}

        {!fastestRoute && startId && endId && startId !== endId && (
          <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
            <Info className="w-4 h-4 text-red-500" />
            <span className="text-xs text-red-500">No direct path found between these buildings.</span>
          </div>
        )}
      </div>
    </GlassPanel>
  );
};
