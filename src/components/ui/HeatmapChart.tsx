import React from 'react';
import { CrowdHistoricalPattern } from '../../types';

interface HeatmapChartProps {
  data: CrowdHistoricalPattern[];
  title?: string;
}

export const HeatmapChart: React.FC<HeatmapChartProps> = ({
  data,
  title = 'Historical Crowd Patterns (24-hour)',
}) => {
  if (!data || data.length === 0) {
    return <div className="text-white/40 text-center py-8">No data available</div>;
  }

  const getColorByLevel = (level: 'low' | 'moderate' | 'high'): string => {
    switch (level) {
      case 'low':
        return 'bg-emerald-500/60 hover:bg-emerald-500/80';
      case 'moderate':
        return 'bg-amber-500/60 hover:bg-amber-500/80';
      case 'high':
        return 'bg-red-500/60 hover:bg-red-500/80';
    }
  };

  const getTextColor = (level: 'low' | 'moderate' | 'high'): string => {
    switch (level) {
      case 'low':
        return 'text-emerald-400';
      case 'moderate':
        return 'text-amber-400';
      case 'high':
        return 'text-red-400';
    }
  };

  return (
    <div className="w-full">
      <h4 className="text-sm font-bold text-white mb-4">{title}</h4>

      {/* Heatmap Grid */}
      <div className="grid grid-cols-24 gap-1 mb-6 bg-white/5 p-4 rounded-xl">
        {data.map((pattern, idx) => (
          <div
            key={idx}
            className={`${getColorByLevel(pattern.crowdLevel)} rounded transition-all cursor-pointer group relative`}
            style={{ aspectRatio: '1/1', minHeight: '40px' }}
            title={`${pattern.hour}:00 - ${pattern.avgCrowd} avg, ${pattern.maxCrowd} peak`}
          >
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold text-white bg-black/80 rounded">
              {pattern.hour}
            </div>
            <div className="flex items-center justify-center h-full text-[10px] font-bold text-white/70 group-hover:hidden">
              {pattern.hour % 3 === 0 ? pattern.hour + ':00' : ''}
            </div>
          </div>
        ))}
      </div>

      {/* Legend and Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded bg-emerald-500" />
            <span className="text-xs font-bold text-white/60 uppercase tracking-wider">
              Low (under 30%)
            </span>
          </div>
          <p className="text-[10px] text-white/40">Least crowded times</p>
        </div>
        <div className="glass-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded bg-amber-500" />
            <span className="text-xs font-bold text-white/60 uppercase tracking-wider">
              Moderate (30-70%)
            </span>
          </div>
          <p className="text-[10px] text-white/40">Moderate crowd levels</p>
        </div>
        <div className="glass-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded bg-red-500" />
            <span className="text-xs font-bold text-white/60 uppercase tracking-wider">
              High (over 70%)
            </span>
          </div>
          <p className="text-[10px] text-white/40">Peak congestion hours</p>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        {[
          {
            label: 'Quietest Hour',
            hour: data.reduce((a, b) => (a.avgCrowd < b.avgCrowd ? a : b)).hour,
            icon: '🟢',
          },
          {
            label: 'Peak Hour',
            hour: data.reduce((a, b) => (a.avgCrowd > b.avgCrowd ? a : b)).hour,
            icon: '🔴',
          },
          {
            label: 'Average Crowd',
            value: Math.round(
              data.reduce((sum, p) => sum + p.avgCrowd, 0) / data.length
            ),
            icon: '📊',
          },
        ].map((stat, idx) => (
          <div key={idx} className="glass-card p-4 text-center">
            <p className="text-xs text-white/60 mb-2">{stat.label}</p>
            <p className="text-2xl font-bold text-white">
              {stat.icon}{' '}
              {('hour' in stat ? stat.hour + ':00' : stat.value) as string}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
