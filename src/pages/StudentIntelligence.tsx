import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { GlassPanel } from '../components/ui/GlassPanel';
import { StableChart } from '../components/ui/StableChart';
import { useCrowdSimulation } from '../hooks/useCrowdSimulation';
import { 
  Users, 
  MapPin, 
  Navigation, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight,
  Clock,
  Zap
} from 'lucide-react';

export const StudentIntelligence: React.FC = () => {
  const { buildings, stats } = useCrowdSimulation(5000);

  // Sort buildings by occupancy percentage
  const sortedBuildings = useMemo(() => {
    return [...buildings].sort((a, b) => (b.occupancy / b.capacity) - (a.occupancy / a.capacity));
  }, [buildings]);

  // Recommendations logic
  const recommendations = useMemo(() => {
    const crowded = sortedBuildings.filter(b => (b.occupancy / b.capacity) > 0.7);
    const quiet = sortedBuildings.filter(b => (b.occupancy / b.capacity) < 0.4);

    return crowded.slice(0, 2).map((b, i) => ({
      id: `rec-${i}`,
      crowdedBuilding: b.name,
      alternative: quiet[i]?.name || quiet[0]?.name || 'Student Center',
      reason: 'High occupancy detected'
    }));
  }, [sortedBuildings]);

  // Navigation suggestions
  const navSuggestions = [
    { from: 'Library', to: 'Cafeteria', time: '4 min', type: 'Fastest' },
    { from: 'Science Block', to: 'Main Gate', time: '6 min', type: 'Low Crowd' },
    { from: 'Engineering', to: 'Gym', time: '3 min', type: 'Fastest' }
  ];

  const chartData = {
    labels: ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'],
    datasets: [{
      label: 'Campus Crowd Trend',
      data: [1200, 2800, 4500, 5200, 3800, 2100, 1500],
      borderColor: '#10b981',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      fill: true,
      tension: 0.4,
      borderWidth: 3,
      pointRadius: 4,
      pointBackgroundColor: '#10b981',
    }]
  };

  const chartOptions = {
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        cornerRadius: 8,
      }
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: 'rgba(255, 255, 255, 0.3)' } },
      y: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: 'rgba(255, 255, 255, 0.3)' } }
    }
  };

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Header Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-display font-bold text-white">Crowd Intelligence</h1>
        <p className="text-white/60">Real-time campus insights for a smarter student experience.</p>
      </div>

      {/* Top Stats & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recommendations */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-emerald-400">
            <Zap className="w-5 h-5" /> Smart Recommendations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendations.map((rec, idx) => (
              <motion.div
                key={rec.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <GlassPanel className="h-full border-l-4 border-l-amber-500/50">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-start justify-between">
                      <div className="p-2 bg-amber-500/10 rounded-lg">
                        <AlertCircle className="text-amber-500 w-5 h-5" />
                      </div>
                      <span className="text-[10px] uppercase tracking-widest font-bold text-amber-500/60">Avoid Crowd</span>
                    </div>
                    <div>
                      <p className="text-sm text-white/60">
                        <span className="text-white font-semibold">{rec.crowdedBuilding}</span> is currently crowded.
                      </p>
                      <div className="mt-4 flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
                        <div className="p-2 bg-emerald-500/20 rounded-lg">
                          <CheckCircle2 className="text-emerald-500 w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-[10px] text-white/40 uppercase font-bold">Recommended Alternative</p>
                          <p className="text-sm font-semibold text-emerald-400">{rec.alternative}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </GlassPanel>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Navigation Suggestions */}
        <div className="flex flex-col gap-6">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-blue-400">
            <Navigation className="w-5 h-5" /> Quick Navigation
          </h2>
          <GlassPanel className="flex-1">
            <div className="flex flex-col gap-4">
              {navSuggestions.map((nav, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-white/80">{nav.from}</span>
                        <ArrowRight className="w-3 h-3 text-white/20 group-hover:text-white/40 transition-colors" />
                        <span className="text-xs font-medium text-white/80">{nav.to}</span>
                      </div>
                      <p className="text-[10px] text-white/40 uppercase font-bold mt-0.5">{nav.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-display font-bold text-white">{nav.time}</p>
                  </div>
                </div>
              ))}
              <button className="w-full py-3 mt-2 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest transition-all border border-blue-500/20">
                Plan Custom Route
              </button>
            </div>
          </GlassPanel>
        </div>
      </div>

      {/* Building Status Grid */}
      <div className="flex flex-col gap-6">
        <h2 className="text-lg font-semibold flex items-center gap-2 text-white/80">
          <MapPin className="w-5 h-5 text-emerald-500" /> Building Status
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {sortedBuildings.slice(0, 8).map((building, idx) => {
            const occupancyRate = (building.occupancy / building.capacity) * 100;
            const isCrowded = occupancyRate > 70;
            const isOptimal = occupancyRate < 40;
            
            return (
              <motion.div
                key={building.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <GlassPanel className="relative overflow-hidden group">
                  {/* Glowing background indicator */}
                  <div className={`absolute -top-12 -right-12 w-24 h-24 rounded-full blur-[40px] opacity-20 transition-colors duration-500 ${
                    isCrowded ? 'bg-red-500' : isOptimal ? 'bg-emerald-500' : 'bg-amber-500'
                  }`} />
                  
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-white/90 truncate pr-2">{building.name}</p>
                      <div className={`w-2 h-2 rounded-full animate-pulse ${
                        isCrowded ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]' : 
                        isOptimal ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]' : 
                        'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]'
                      }`} />
                    </div>

                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-2xl font-display font-bold text-white">
                          {Math.round(occupancyRate)}%
                        </p>
                        <p className="text-[10px] text-white/40 uppercase font-bold">Occupancy</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-white/60">{building.occupancy} / {building.capacity}</p>
                        <p className="text-[10px] text-white/40 uppercase font-bold">Students</p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${occupancyRate}%` }}
                        className={`h-full rounded-full ${
                          isCrowded ? 'bg-red-500' : isOptimal ? 'bg-emerald-500' : 'bg-amber-500'
                        }`}
                      />
                    </div>
                  </div>
                </GlassPanel>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Live Trend Graph */}
      <div className="grid grid-cols-1 gap-8">
        <GlassPanel title="Live Crowd Trend">
          <div className="mt-6">
            <StableChart type="line" data={chartData} options={chartOptions} />
          </div>
        </GlassPanel>
      </div>
    </div>
  );
};
