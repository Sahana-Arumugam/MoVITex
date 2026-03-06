import { Building, EnergyStats } from '../types';

export const buildings: Building[] = [
  {
    id: 'b1',
    name: 'Main Library',
    occupancy: 450,
    capacity: 600,
    energyUsage: 124.5,
    efficiency: 88,
    coordinates: [-122.4194, 37.7749],
    status: 'optimal',
  },
  {
    id: 'b2',
    name: 'Science Hub',
    occupancy: 820,
    capacity: 1000,
    energyUsage: 245.8,
    efficiency: 72,
    coordinates: [-122.4214, 37.7769],
    status: 'warning',
  },
  {
    id: 'b3',
    name: 'Engineering Block',
    occupancy: 310,
    capacity: 500,
    energyUsage: 189.2,
    efficiency: 91,
    coordinates: [-122.4174, 37.7729],
    status: 'optimal',
  },
  {
    id: 'b4',
    name: 'Student Union',
    occupancy: 950,
    capacity: 1000,
    energyUsage: 312.4,
    efficiency: 45,
    coordinates: [-122.4234, 37.7789],
    status: 'critical',
  },
  {
    id: 'b5',
    name: 'Sports Complex',
    occupancy: 210,
    capacity: 800,
    energyUsage: 156.2,
    efficiency: 85,
    coordinates: [-122.4154, 37.7769],
    status: 'optimal',
  },
  {
    id: 'b6',
    name: 'Campus Cafe',
    occupancy: 150,
    capacity: 200,
    energyUsage: 89.4,
    efficiency: 78,
    coordinates: [-122.4214, 37.7729],
    status: 'warning',
  },
];

export interface Walkway {
  id: string;
  from: string;
  to: string;
  distance: number; // in meters approx
}

export const walkways: Walkway[] = [
  { id: 'w1', from: 'b1', to: 'b2', distance: 300 },
  { id: 'w2', from: 'b1', to: 'b3', distance: 250 },
  { id: 'w3', from: 'b1', to: 'b6', distance: 200 },
  { id: 'w4', from: 'b2', to: 'b4', distance: 250 },
  { id: 'w5', from: 'b2', to: 'b5', distance: 400 },
  { id: 'w6', from: 'b3', to: 'b5', distance: 350 },
  { id: 'w7', from: 'b3', to: 'b6', distance: 150 },
  { id: 'w8', from: 'b4', to: 'b6', distance: 450 },
  { id: 'w9', from: 'b5', to: 'b4', distance: 500 },
];

export const energyStats: EnergyStats = {
  totalUsage: 12450,
  savings: 15.4,
  renewables: 42,
};

export const generateCrowdHistory = () => {
  return Array.from({ length: 24 }, (_, i) => ({
    timestamp: `${i}:00`,
    count: Math.floor(Math.random() * 5000) + 1000,
    location: 'Campus Wide',
  }));
};

export const generateHeatmapData = (count: number = 50) => {
  const center: [number, number] = [-122.4200, 37.7750];
  return {
    type: 'FeatureCollection',
    features: Array.from({ length: count }, () => ({
      type: 'Feature',
      properties: {
        intensity: Math.random() * 10,
      },
      geometry: {
        type: 'Point',
        coordinates: [
          center[0] + (Math.random() - 0.5) * 0.01,
          center[1] + (Math.random() - 0.5) * 0.01,
        ],
      },
    })),
  };
};
