export interface Building {
  id: string;
  name: string;
  occupancy: number;
  capacity: number;
  energyUsage: number; // in kWh
  efficiency: number; // 0-100
  coordinates: [number, number];
  status: 'optimal' | 'warning' | 'critical';
}

export interface CrowdData {
  timestamp: string;
  count: number;
  location: string;
}

export interface EnergyStats {
  totalUsage: number;
  savings: number;
  renewables: number;
}

export interface Walkway {
  id: string;
  from: string;
  to: string;
  distance: number;
}

export type PageType = 'map' | 'crowd' | 'analytics' | 'energy' | 'quality' | 'intelligence' | 'admin-analytics';
