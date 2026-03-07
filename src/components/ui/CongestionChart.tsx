import React from 'react';
import { CrowdForecast } from '../../types';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface CongestionChartProps {
  data: CrowdForecast[];
  height?: number;
}

export const CongestionChart: React.FC<CongestionChartProps> = ({
  data,
  height = 250,
}) => {
  if (!data || data.length === 0) {
    return <div className="text-white/40 text-center py-8">No forecast data available</div>;
  }

  // Normalize data for chart
  const maxValue = Math.max(...data.map((d) => d.predictedCount));
  const minValue = Math.min(...data.map((d) => d.predictedCount));
  const range = maxValue - minValue || 1;

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2">
        {data.map((forecast, idx) => {
          const normalized =
            ((forecast.predictedCount - minValue) / range) * 100;
          const barColor =
            forecast.riskLevel === 'high'
              ? 'bg-red-500'
              : forecast.riskLevel === 'medium'
                ? 'bg-amber-500'
                : 'bg-emerald-500';

          return (
            <div
              key={idx}
              className="flex flex-col items-center gap-2"
              title={`${forecast.predictedCount} people - ${forecast.confidence}% confidence`}
            >
              <div className="relative w-full h-32 bg-white/5 rounded-lg overflow-hidden flex items-end justify-center pb-2">
                <div
                  className={`${barColor} rounded-t w-3/4 transition-all opacity-80 hover:opacity-100`}
                  style={{ height: `${Math.max(normalized, 5)}%` }}
                />
              </div>
              <div className="text-center">
                <p className="text-[10px] font-bold text-white/60">
                  {forecast.timestamp}
                </p>
                <div className="flex items-center justify-center gap-1 mt-1">
                  {forecast.trend === 'increasing' && (
                    <TrendingUp className="w-3 h-3 text-red-400" />
                  )}
                  {forecast.trend === 'decreasing' && (
                    <TrendingDown className="w-3 h-3 text-emerald-400" />
                  )}
                  {forecast.trend === 'stable' && (
                    <Minus className="w-3 h-3 text-amber-400" />
                  )}
                  <span className="text-[10px] text-white/40">
                    {forecast.confidence}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-red-500/40 border border-red-500" />
          <span className="text-xs text-white/60">High Risk</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-amber-500/40 border border-amber-500" />
          <span className="text-xs text-white/60">Medium Risk</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-emerald-500/40 border border-emerald-500" />
          <span className="text-xs text-white/60">Low Risk</span>
        </div>
      </div>
    </div>
  );
};
