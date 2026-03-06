import { Building, CrowdData } from '../types';
import { buildings as initialBuildings } from '../data/mockData';

/**
 * Crowd Simulation Engine
 * 
 * Logic Overview:
 * 1. Graph Structure: Buildings are nodes, pathways are edges.
 * 2. State: Tracks current occupancy of each building and students "in transit" on pathways.
 * 3. Temporal Factors: 
 *    - Peak Hours (11:00 - 14:00): Higher movement and overall density.
 *    - Class Intervals: Every hour (e.g., 10:00, 11:00), a "surge" occurs as students switch buildings.
 *    - Random Noise: Small fluctuations to simulate natural behavior.
 * 4. Movement: A percentage of students leave a building based on its current "boredom" or "schedule" factor
 *    and move toward a connected building.
 */

interface Pathway {
  from: string;
  to: string;
  progress: number; // 0 to 1
  count: number;
}

export class CrowdSimulationEngine {
  private buildings: Building[];
  private pathways: Pathway[] = [];
  private lastTick: number = Date.now();

  constructor() {
    this.buildings = [...initialBuildings];
  }

  /**
   * Main simulation step
   * @param currentTime Virtual or real time to calculate temporal factors
   */
  public tick(currentTime: Date = new Date()): { buildings: Building[], heatmap: any[] } {
    const hour = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    
    // 1. Calculate Temporal Multipliers
    const isPeakHour = hour >= 11 && hour <= 14;
    const isClassSwitch = minutes >= 50 || minutes <= 5; // 10-minute window around the hour
    
    const baseMovementRate = isPeakHour ? 0.05 : 0.02;
    const switchMultiplier = isClassSwitch ? 4 : 1;
    const movementProbability = baseMovementRate * switchMultiplier;

    // 2. Process Building Exits (Students entering pathways)
    this.buildings.forEach(building => {
      if (building.occupancy > 10 && Math.random() < movementProbability) {
        const leavingCount = Math.floor(building.occupancy * (Math.random() * 0.1));
        if (leavingCount > 0) {
          // Pick a random destination building (not the same one)
          const destinations = this.buildings.filter(b => b.id !== building.id);
          const target = destinations[Math.floor(Math.random() * destinations.length)];
          
          building.occupancy -= leavingCount;
          this.pathways.push({
            from: building.id,
            to: target.id,
            progress: 0,
            count: leavingCount
          });
        }
      }

      // Random fluctuation (small groups entering/leaving campus)
      const noise = Math.floor((Math.random() - 0.5) * 10);
      building.occupancy = Math.max(0, Math.min(building.capacity, building.occupancy + noise));
      
      // Update status based on occupancy
      const ratio = building.occupancy / building.capacity;
      building.status = ratio > 0.9 ? 'critical' : ratio > 0.7 ? 'warning' : 'optimal';
    });

    // 3. Process Pathways (Movement between buildings)
    const completedPathways: number[] = [];
    this.pathways.forEach((pathway, index) => {
      pathway.progress += 0.1; // Move 10% closer each tick
      
      if (pathway.progress >= 1) {
        const targetBuilding = this.buildings.find(b => b.id === pathway.to);
        if (targetBuilding) {
          targetBuilding.occupancy = Math.min(targetBuilding.capacity, targetBuilding.occupancy + pathway.count);
        }
        completedPathways.push(index);
      }
    });

    // Remove finished pathways
    for (let i = completedPathways.length - 1; i >= 0; i--) {
      this.pathways.splice(completedPathways[i], 1);
    }

    // 4. Generate Heatmap Data
    // Heatmap consists of:
    // - Building centers (intensity based on occupancy)
    // - Pathway points (intensity based on transit count)
    const heatmapPoints: any[] = [];

    // Add building points
    this.buildings.forEach(b => {
      heatmapPoints.push({
        coords: b.coordinates,
        intensity: (b.occupancy / b.capacity) * 10
      });
    });

    // Add pathway points (interpolated between from and to)
    this.pathways.forEach(p => {
      const fromBuilding = this.buildings.find(b => b.id === p.from);
      const toBuilding = this.buildings.find(b => b.id === p.to);
      
      if (fromBuilding && toBuilding) {
        const currentCoords: [number, number] = [
          fromBuilding.coordinates[0] + (toBuilding.coordinates[0] - fromBuilding.coordinates[0]) * p.progress,
          fromBuilding.coordinates[1] + (toBuilding.coordinates[1] - fromBuilding.coordinates[1]) * p.progress,
        ];
        
        heatmapPoints.push({
          coords: currentCoords,
          intensity: Math.min(5, p.count / 10)
        });
      }
    });

    return {
      buildings: [...this.buildings],
      heatmap: heatmapPoints
    };
  }

  public getBuildingStats() {
    return this.buildings.map(b => ({
      building: b.name,
      crowdLevel: parseFloat((b.occupancy / b.capacity).toFixed(2))
    }));
  }
}

export const simulationEngine = new CrowdSimulationEngine();
