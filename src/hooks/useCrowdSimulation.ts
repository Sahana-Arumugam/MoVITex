import { useState, useEffect } from 'react';
import { simulationEngine } from '../services/crowdSimulation';
import { Building } from '../types';

export function useCrowdSimulation(intervalMs: number = 3000) {
  const [data, setData] = useState<{
    buildings: Building[];
    heatmap: any[];
    stats: { building: string; crowdLevel: number }[];
  }>({
    buildings: [],
    heatmap: [],
    stats: []
  });

  useEffect(() => {
    const runTick = () => {
      const result = simulationEngine.tick();
      setData({
        buildings: result.buildings,
        heatmap: result.heatmap,
        stats: simulationEngine.getBuildingStats()
      });
    };

    // Initial tick
    runTick();

    const interval = setInterval(runTick, intervalMs);
    return () => clearInterval(interval);
  }, [intervalMs]);

  return data;
}
