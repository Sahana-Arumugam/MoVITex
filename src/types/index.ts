export type LocationCategory = 
  | 'academic_room'
  | 'library'
  | 'shuttle_stop'
  | 'outing_gate'
  | 'mess'
  | 'food_spot';

export interface Building {
  id: string;
  name: string;
  occupancy: number;
  capacity: number;
  energyUsage: number; // in kWh
  efficiency: number; // 0-100
  coordinates: [number, number];
  status: 'optimal' | 'warning' | 'critical';
  category?: LocationCategory;
  block?: string; // e.g., "SMV", "TT", "GDN", "MB", "SJT", "PRP", "MGB"
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

// Prediction and Forecast Types
export interface CrowdForecast {
  timestamp: string;
  predictedCount: number;
  confidence: number; // 0-100
  trend: 'increasing' | 'decreasing' | 'stable';
  riskLevel: 'low' | 'medium' | 'high';
}

export interface CongestionPrediction {
  locationId: string;
  locationName: string;
  currentCrowd: number;
  forecasts: CrowdForecast[];
  peakTime?: string;
  recommendation?: string;
}

export interface BestTimeSlot {
  locationId: string;
  locationName: string;
  timeSlots: Array<{
    startTime: string;
    endTime: string;
    expectedCrowd: number;
    crowdPercentage: number;
    suitability: 'excellent' | 'good' | 'fair' | 'poor';
  }>;
}

export interface CrowdHistoricalPattern {
  hour: number;
  avgCrowd: number;
  maxCrowd: number;
  minCrowd: number;
  crowdLevel: 'low' | 'moderate' | 'high';
}

export interface BlockInsight {
  blockName: string;
  peakHours: number[];
  quietHours: number[];
  recommendation: string;
  averageCrowd: number;
}

export interface RouteInsight {
  fromLocation: string;
  toLocation: string;
  fastestRoute: {
    duration: number;
    distance: number;
    crowdDensity: 'low' | 'moderate' | 'high';
  };
  quietestRoute: {
    duration: number;
    distance: number;
    crowdDensity: 'low' | 'moderate' | 'high';
  };
  recommendation: string;
}

export type PageType = 'map' | 'crowd' | 'analytics' | 'energy' | 'quality' | 'intelligence' | 'admin-analytics';
