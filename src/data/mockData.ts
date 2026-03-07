import { Building, EnergyStats } from '../types';

export const buildings: Building[] = [
  {
    id: 'lib_main',
    name: 'Main Library',
    occupancy: 450,
    capacity: 600,
    energyUsage: 124.5,
    efficiency: 88,
    coordinates: [-122.4194, 37.7749],
    status: 'optimal',
  },
  {
    id: 'mess_d',
    name: 'Mess D',
    occupancy: 820,
    capacity: 1000,
    energyUsage: 245.8,
    efficiency: 72,
    coordinates: [-122.4214, 37.7769],
    status: 'warning',
  },
  {
    id: 'mess_e',
    name: 'Mess E',
    occupancy: 750,
    capacity: 900,
    energyUsage: 225.4,
    efficiency: 75,
    coordinates: [-122.4204, 37.7759],
    status: 'warning',
  },
  {
    id: 'mess_g',
    name: 'Mess G',
    occupancy: 880,
    capacity: 950,
    energyUsage: 265.2,
    efficiency: 70,
    coordinates: [-122.4224, 37.7779],
    status: 'critical',
  },
  {
    id: 'mess_h',
    name: 'Mess H',
    occupancy: 790,
    capacity: 900,
    energyUsage: 237.6,
    efficiency: 73,
    coordinates: [-122.4234, 37.7769],
    status: 'warning',
  },
  {
    id: 'smv_block',
    name: 'SMV Block',
    occupancy: 310,
    capacity: 500,
    energyUsage: 189.2,
    efficiency: 91,
    coordinates: [-122.4174, 37.7729],
    status: 'optimal',
  },
  {
    id: 'tt_block',
    name: 'TT Block',
    occupancy: 950,
    capacity: 1000,
    energyUsage: 312.4,
    efficiency: 45,
    coordinates: [-122.4234, 37.7789],
    status: 'critical',
  },
  {
    id: 'foodys',
    name: 'Foodys',
    occupancy: 210,
    capacity: 800,
    energyUsage: 156.2,
    efficiency: 85,
    coordinates: [-122.4154, 37.7769],
    status: 'optimal',
  },
  {
    id: 'shuttle_main_gate',
    name: 'Shuttle Stop Main Gate',
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
  { id: 'w1', from: 'lib_main', to: 'mess_d', distance: 300 },
  { id: 'w2', from: 'lib_main', to: 'mess_e', distance: 310 },
  { id: 'w3', from: 'lib_main', to: 'mess_g', distance: 320 },
  { id: 'w4', from: 'lib_main', to: 'mess_h', distance: 330 },
  { id: 'w5', from: 'lib_main', to: 'smv_block', distance: 250 },
  { id: 'w6', from: 'lib_main', to: 'shuttle_main_gate', distance: 200 },
  { id: 'w7', from: 'mess_d', to: 'tt_block', distance: 250 },
  { id: 'w8', from: 'mess_e', to: 'tt_block', distance: 260 },
  { id: 'w9', from: 'mess_g', to: 'smv_block', distance: 280 },
  { id: 'w10', from: 'mess_h', to: 'smv_block', distance: 290 },
  { id: 'w11', from: 'mess_d', to: 'foodys', distance: 400 },
  { id: 'w12', from: 'smv_block', to: 'foodys', distance: 350 },
  { id: 'w13', from: 'smv_block', to: 'shuttle_main_gate', distance: 150 },
  { id: 'w14', from: 'tt_block', to: 'shuttle_main_gate', distance: 450 },
  { id: 'w15', from: 'foodys', to: 'tt_block', distance: 500 },
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
