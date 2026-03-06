import { Building, Walkway } from '../types';
import { buildings, walkways } from '../data/mockData';

interface Node {
  id: string;
  distance: number;
  previous: string | null;
}

export interface RouteResult {
  path: string[]; // IDs of buildings
  totalDistance: number;
  totalCrowdFactor: number;
  type: 'fastest' | 'low-crowd';
}

export class RoutingService {
  /**
   * Dijkstra's Algorithm implementation
   * @param startId Starting building ID
   * @param endId Destination building ID
   * @param useCrowdWeight Whether to factor in crowd density
   * @param currentBuildings Current state of buildings (with occupancy)
   */
  public findPath(
    startId: string,
    endId: string,
    useCrowdWeight: boolean,
    currentBuildings: Building[]
  ): RouteResult | null {
    const nodes: { [key: string]: Node } = {};
    const unvisited: Set<string> = new Set();

    currentBuildings.forEach(b => {
      nodes[b.id] = {
        id: b.id,
        distance: b.id === startId ? 0 : Infinity,
        previous: null,
      };
      unvisited.add(b.id);
    });

    while (unvisited.size > 0) {
      // Find node with smallest distance
      let currentId: string | null = null;
      let minDistance = Infinity;

      unvisited.forEach(id => {
        if (nodes[id].distance < minDistance) {
          minDistance = nodes[id].distance;
          currentId = id;
        }
      });

      if (currentId === null || currentId === endId) break;

      unvisited.delete(currentId);

      // Get neighbors
      const neighbors = this.getNeighbors(currentId, walkways);
      
      for (const neighbor of neighbors) {
        if (!unvisited.has(neighbor.to)) continue;

        const weight = this.calculateWeight(
          currentId,
          neighbor.to,
          neighbor.distance,
          useCrowdWeight,
          currentBuildings
        );

        const alt = nodes[currentId].distance + weight;
        if (alt < nodes[neighbor.to].distance) {
          nodes[neighbor.to].distance = alt;
          nodes[neighbor.to].previous = currentId;
        }
      }
    }

    // Reconstruct path
    const path: string[] = [];
    let curr: string | null = endId;
    while (curr !== null) {
      path.unshift(curr);
      curr = nodes[curr].previous;
    }

    if (path[0] !== startId) return null;

    // Calculate totals
    let totalDist = 0;
    let totalCrowd = 0;
    for (let i = 0; i < path.length - 1; i++) {
      const edge = walkways.find(w => 
        (w.from === path[i] && w.to === path[i+1]) || 
        (w.to === path[i] && w.from === path[i+1])
      );
      if (edge) {
        totalDist += edge.distance;
        const b1 = currentBuildings.find(b => b.id === path[i]);
        const b2 = currentBuildings.find(b => b.id === path[i+1]);
        if (b1 && b2) {
          totalCrowd += (b1.occupancy / b1.capacity + b2.occupancy / b2.capacity) / 2;
        }
      }
    }

    return {
      path,
      totalDistance: totalDist,
      totalCrowdFactor: totalCrowd / (path.length - 1 || 1),
      type: useCrowdWeight ? 'low-crowd' : 'fastest'
    };
  }

  private getNeighbors(id: string, allWalkways: Walkway[]) {
    const neighbors: { to: string, distance: number }[] = [];
    allWalkways.forEach(w => {
      if (w.from === id) neighbors.push({ to: w.to, distance: w.distance });
      if (w.to === id) neighbors.push({ to: w.from, distance: w.distance });
    });
    return neighbors;
  }

  private calculateWeight(
    from: string,
    to: string,
    distance: number,
    useCrowd: boolean,
    buildings: Building[]
  ): number {
    if (!useCrowd) return distance;

    const b1 = buildings.find(b => b.id === from);
    const b2 = buildings.find(b => b.id === to);
    
    if (!b1 || !b2) return distance;

    // Crowd factor: average occupancy ratio of the two buildings
    const crowdFactor = (b1.occupancy / b1.capacity + b2.occupancy / b2.capacity) / 2;
    
    // Weight formula: distance * (1 + crowdFactor * multiplier)
    // We use a high multiplier (e.g., 5) to strongly prefer low-crowd paths
    return distance * (1 + crowdFactor * 5);
  }
}

export const routingService = new RoutingService();
