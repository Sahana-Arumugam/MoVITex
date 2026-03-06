import React, { useEffect, useRef } from 'react';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

Chart.register(...registerables);

interface StableChartProps {
  type: ChartConfiguration['type'];
  data: ChartConfiguration['data'];
  options?: ChartConfiguration['options'];
  height?: string;
}

export const StableChart: React.FC<StableChartProps> = ({ 
  type, 
  data, 
  options = {}, 
  height = '350px' 
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Destroy existing instance before creating a new one
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    chartInstance.current = new Chart(ctx, {
      type,
      data,
      options: {
        ...options,
        responsive: true,
        maintainAspectRatio: false,
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, [type, data, options]);

  return (
    <div className="chart-card">
      <div className="chart-container" style={{ height }}>
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};
