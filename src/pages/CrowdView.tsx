import React from 'react';
import { GlassPanel } from '../components/ui/GlassPanel';
import { StableChart } from '../components/ui/StableChart';
import { generateCrowdHistory } from '../data/mockData';
import { Users, TrendingUp, Clock } from 'lucide-react';

const crowdHistory = generateCrowdHistory();

const chartOptions = {
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleFont: { family: 'Inter', size: 12 },
      bodyFont: { family: 'Inter', size: 12 },
      padding: 12,
      cornerRadius: 8,
    }
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: 'rgba(255, 255, 255, 0.3)', font: { size: 10 } }
    },
    y: {
      grid: { color: 'rgba(255, 255, 255, 0.05)' },
      ticks: { color: 'rgba(255, 255, 255, 0.3)', font: { size: 10 } }
    }
  }
};

export const CrowdView: React.FC = () => {
  const lineData = {
    labels: crowdHistory.map(d => d.timestamp),
    datasets: [{
      label: 'Crowd Density',
      data: crowdHistory.map(d => d.count),
      borderColor: '#10b981',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      fill: true,
      tension: 0.4,
      borderWidth: 2,
      pointRadius: 0,
    }]
  };

  const barData = {
    labels: ['Library', 'Science', 'Eng', 'Union', 'Gym', 'Cafe'],
    datasets: [{
      label: 'Current Occupancy',
      data: [450, 820, 310, 950, 210, 150],
      backgroundColor: 'rgba(16, 185, 129, 0.5)',
      borderRadius: 4,
    }]
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassPanel className="flex flex-row items-center gap-6">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
            <Users className="text-emerald-500 w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-white/40 uppercase tracking-widest font-bold">Total Campus Crowd</p>
            <p className="text-2xl font-display font-bold">4,281</p>
          </div>
        </GlassPanel>

        <GlassPanel className="flex flex-row items-center gap-6">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center">
            <TrendingUp className="text-blue-500 w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-white/40 uppercase tracking-widest font-bold">Peak Density</p>
            <p className="text-2xl font-display font-bold">5,120</p>
          </div>
        </GlassPanel>

        <GlassPanel className="flex flex-row items-center gap-6">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center">
            <Clock className="text-amber-500 w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-white/40 uppercase tracking-widest font-bold">Peak Hour</p>
            <p className="text-2xl font-display font-bold">14:00</p>
          </div>
        </GlassPanel>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <GlassPanel title="24h Crowd Movement">
          <div className="mt-4">
            <StableChart type="line" data={lineData} options={chartOptions} />
          </div>
        </GlassPanel>

        <GlassPanel title="Occupancy by Zone">
          <div className="mt-4">
            <StableChart type="bar" data={barData} options={chartOptions} />
          </div>
        </GlassPanel>
      </div>
    </div>
  );
};
