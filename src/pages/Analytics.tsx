import React from 'react';
import { GlassPanel } from '../components/ui/GlassPanel';
import { StableChart } from '../components/ui/StableChart';
import { TrendingUp, Users, Zap, Activity, ArrowUpRight } from 'lucide-react';

export const Analytics: React.FC = () => {
  const doughnutData = {
    labels: ['Education', 'Research', 'Social', 'Admin'],
    datasets: [{
      data: [45, 25, 20, 10],
      backgroundColor: [
        'rgba(16, 185, 129, 0.6)',
        'rgba(59, 130, 246, 0.6)',
        'rgba(245, 158, 11, 0.6)',
        'rgba(139, 92, 246, 0.6)',
      ],
      borderWidth: 0,
      hoverOffset: 4
    }]
  };

  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Efficiency Index',
      data: [65, 72, 68, 84, 89, 92],
      borderColor: '#10b981',
      tension: 0.4,
      fill: true,
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
    }]
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <GlassPanel title="Efficiency Growth" className="lg:col-span-2">
          <div className="mt-4">
            <StableChart 
              type="line"
              data={lineData} 
              options={{
                plugins: { legend: { display: false } },
                scales: {
                  x: { grid: { display: false }, ticks: { color: 'rgba(255, 255, 255, 0.3)' } },
                  y: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: 'rgba(255, 255, 255, 0.3)' } }
                }
              }}
            />
          </div>
        </GlassPanel>

        <GlassPanel title="Space Allocation">
          <div className="mt-4">
            <StableChart 
              type="doughnut"
              data={doughnutData} 
              options={{
                plugins: { legend: { position: 'bottom', labels: { color: 'rgba(255, 255, 255, 0.5)', font: { size: 10 } } } }
              }}
            />
          </div>
        </GlassPanel>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Avg. Occupancy', value: '74%', icon: Users, color: 'text-emerald-500', trend: '+4.2%' },
          { label: 'Energy Saved', value: '12.4 MWh', icon: Zap, color: 'text-blue-500', trend: '+15.8%' },
          { label: 'System Health', value: '99.9%', icon: Activity, color: 'text-purple-500', trend: 'Stable' },
          { label: 'ROI Index', value: '1.42', icon: TrendingUp, color: 'text-amber-500', trend: '+0.12' },
        ].map((stat, i) => (
          <div key={i} className="glass-card p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className={`p-2 rounded-lg bg-white/5 ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-1">
                {stat.trend} <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
            <div>
              <p className="text-xs text-white/40 uppercase tracking-widest font-bold">{stat.label}</p>
              <p className="text-2xl font-display font-bold mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
