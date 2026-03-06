import React, { useMemo } from 'react';
import { GlassPanel } from '../components/ui/GlassPanel';
import { 
  Zap, 
  Leaf, 
  Battery, 
  ArrowUpRight, 
  ArrowDownRight, 
  AlertCircle, 
  MoveRight, 
  Activity,
  BarChart3,
  Lightbulb
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  Cell, PieChart, Pie, Sector
} from 'recharts';
import { motion } from 'motion/react';

// Logic: energyUsage = baseEnergy + (crowdLevel × energyMultiplier)
const buildings = [
  { id: 'lib', name: 'Library Central', baseEnergy: 450, crowdLevel: 92, multiplier: 4.2, capacity: 1000 },
  { id: 'stu', name: 'Student Union', baseEnergy: 300, crowdLevel: 85, multiplier: 3.8, capacity: 800 },
  { id: 'sci', name: 'Science Block A', baseEnergy: 600, crowdLevel: 45, multiplier: 5.5, capacity: 1200 },
  { id: 'eng', name: 'Engineering Hall', baseEnergy: 550, crowdLevel: 65, multiplier: 4.8, capacity: 1500 },
  { id: 'art', name: 'Arts Pavilion', baseEnergy: 200, crowdLevel: 30, multiplier: 2.5, capacity: 500 },
  { id: 'gym', name: 'Campus Gym', baseEnergy: 400, crowdLevel: 78, multiplier: 4.0, capacity: 600 },
];

const buildingData = buildings.map(b => {
  const energyUsage = b.baseEnergy + (b.crowdLevel * b.multiplier);
  const maxEnergy = b.baseEnergy + (100 * b.multiplier);
  const efficiency = 100 - ((energyUsage / maxEnergy) * 20); // Simulated efficiency
  return { ...b, energyUsage, efficiency, maxEnergy };
});

const totalEnergy = buildingData.reduce((acc, b) => acc + b.energyUsage, 0);
const avgEfficiency = buildingData.reduce((acc, b) => acc + b.efficiency, 0) / buildingData.length;

const suggestions = buildingData
  .filter(b => b.crowdLevel > 80)
  .map(highLoad => {
    const lowLoad = buildingData.find(b => b.crowdLevel < 50 && b.id !== highLoad.id);
    if (lowLoad) {
      return {
        from: highLoad.name,
        to: lowLoad.name,
        reason: `${highLoad.name} energy load critical.`,
        action: `Redirect students to ${lowLoad.name}.`
      };
    }
    return null;
  })
  .filter(Boolean);

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/80 backdrop-blur-md border border-white/10 p-3 rounded-lg shadow-xl">
        <p className="text-xs font-bold text-white/50 mb-1">{label}</p>
        <p className="text-sm font-display font-bold text-yellow-400">
          {payload[0].value.toFixed(1)} kW
        </p>
      </div>
    );
  }
  return null;
};

export const EnergyPanel: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-8 pb-12"
    >
      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <GlassPanel className="relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <Zap className="text-yellow-400 w-5 h-5" />
            <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
              <ArrowDownRight className="w-3 h-3" /> 4.2%
            </span>
          </div>
          <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Total Load</p>
          <p className="text-2xl font-display font-bold">{(totalEnergy / 1000).toFixed(2)} MW</p>
          <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-yellow-400 w-[65%]" />
          </div>
        </GlassPanel>

        <GlassPanel className="relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <Activity className="text-emerald-400 w-5 h-5" />
            <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" /> 12%
            </span>
          </div>
          <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Efficiency</p>
          <p className="text-2xl font-display font-bold">{avgEfficiency.toFixed(1)}%</p>
          <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-400" style={{ width: `${avgEfficiency}%` }} />
          </div>
        </GlassPanel>

        <GlassPanel className="relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <Leaf className="text-blue-400 w-5 h-5" />
          </div>
          <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Renewable Mix</p>
          <p className="text-2xl font-display font-bold">38.5%</p>
          <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-blue-400 w-[38.5%]" />
          </div>
        </GlassPanel>

        <GlassPanel className="relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <Battery className="text-purple-400 w-5 h-5" />
          </div>
          <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Grid Stability</p>
          <p className="text-2xl font-display font-bold">99.9%</p>
          <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-purple-400 w-[99.9%]" />
          </div>
        </GlassPanel>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Building Energy Load Visualization */}
        <GlassPanel title="Building Energy Load" className="lg:col-span-2">
          <div className="h-[350px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={buildingData} layout="vertical" margin={{ left: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={true} vertical={false} />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  stroke="rgba(255,255,255,0.3)" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                  width={100}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                <Bar dataKey="energyUsage" radius={[0, 4, 4, 0]} barSize={20}>
                  {buildingData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.crowdLevel > 80 ? '#ef4444' : entry.crowdLevel > 60 ? '#f59e0b' : '#10b981'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassPanel>

        {/* Efficiency Gauge & Status */}
        <div className="flex flex-col gap-6">
          <GlassPanel title="Sustainability Status">
            <div className="flex flex-col items-center justify-center py-6">
              <div className="relative w-40 h-40">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle 
                    cx="50" cy="50" r="45" 
                    fill="none" 
                    stroke="rgba(255,255,255,0.05)" 
                    strokeWidth="8" 
                  />
                  <motion.circle 
                    cx="50" cy="50" r="45" 
                    fill="none" 
                    stroke="#10b981" 
                    strokeWidth="8" 
                    strokeDasharray="283"
                    initial={{ strokeDashoffset: 283 }}
                    animate={{ strokeDashoffset: 283 - (283 * avgEfficiency / 100) }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-display font-bold text-white">{avgEfficiency.toFixed(0)}%</span>
                  <span className="text-[10px] text-white/40 font-bold uppercase tracking-tighter">Optimal</span>
                </div>
              </div>
              <p className="text-xs text-center text-white/60 mt-4 px-4">
                Campus is operating at <span className="text-emerald-400 font-bold">High Efficiency</span>. 
                Crowd distribution is balanced across 4/6 zones.
              </p>
            </div>
          </GlassPanel>

          <GlassPanel title="Energy vs Crowd Logic">
            <div className="space-y-4 mt-2">
              <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="w-4 h-4 text-blue-400" />
                  <span className="text-xs font-bold text-white/80 uppercase tracking-wider">Formula</span>
                </div>
                <code className="text-[10px] text-blue-300 block bg-black/30 p-2 rounded">
                  E = Base + (Crowd × Multiplier)
                </code>
              </div>
              <div className="flex items-center justify-between text-[10px] font-bold text-white/40 uppercase">
                <span>Base Load</span>
                <span className="text-white">2.5 MW</span>
              </div>
              <div className="flex items-center justify-between text-[10px] font-bold text-white/40 uppercase">
                <span>Crowd Impact</span>
                <span className="text-yellow-400">+1.2 MW</span>
              </div>
            </div>
          </GlassPanel>
        </div>
      </div>

      {/* Suggested Crowd Redistribution */}
      <GlassPanel title="Smart Redistribution Suggestions">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {suggestions.length > 0 ? (
            suggestions.map((s, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-5 rounded-2xl bg-red-500/5 border border-red-500/10 flex flex-col gap-4 group hover:bg-red-500/10 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="p-2 rounded-lg bg-red-500/20">
                    <AlertCircle className="w-5 h-5 text-red-400" />
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest">High Load</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white/90">{s?.reason}</h4>
                  <p className="text-xs text-white/50 mt-1">{s?.action}</p>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <div className="px-2 py-1 rounded bg-white/5 text-[10px] font-bold text-white/60">{s?.from}</div>
                  <MoveRight className="w-4 h-4 text-white/20" />
                  <div className="px-2 py-1 rounded bg-emerald-500/10 text-[10px] font-bold text-emerald-400">{s?.to}</div>
                </div>
                <button className="mt-2 py-2 rounded-xl bg-red-500 text-white text-xs font-bold hover:bg-red-600 transition-colors">
                  EXECUTE REDIRECT
                </button>
              </motion.div>
            ))
          ) : (
            <div className="lg:col-span-3 py-12 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4">
                <Leaf className="w-8 h-8 text-emerald-500" />
              </div>
              <h3 className="text-lg font-bold text-white/90">Energy Load Balanced</h3>
              <p className="text-sm text-white/40 max-w-md mt-2">
                No critical energy loads detected. Crowd distribution is currently optimal across all campus buildings.
              </p>
            </div>
          )}
          
          {/* General Optimization Tips */}
          <div className="p-5 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/20">
                <Lightbulb className="w-5 h-5 text-blue-400" />
              </div>
              <h4 className="text-sm font-bold text-white/90">Eco-Tip</h4>
            </div>
            <p className="text-xs text-white/50">
              Science Block A is at 45% capacity. Activating "Zone Sleep Mode" for unoccupied labs could save <span className="text-blue-400 font-bold">12kW/h</span>.
            </p>
            <button className="mt-auto py-2 rounded-xl border border-blue-500/30 text-blue-400 text-xs font-bold hover:bg-blue-500/10 transition-colors">
              ACTIVATE ECO MODE
            </button>
          </div>
        </div>
      </GlassPanel>
    </motion.div>
  );
};
