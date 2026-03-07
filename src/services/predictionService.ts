import {
  CongestionPrediction,
  CrowdForecast,
  BestTimeSlot,
  CrowdHistoricalPattern,
  BlockInsight,
  RouteInsight,
} from '../types';
import { Building } from '../types';

/**
 * Crowd Prediction Service
 * Provides AI-powered predictions for crowd congestion, optimal routes, and best visit times
 */

// Historical pattern data (mock - in production would come from ML model)
const PEAK_HOURS = [10, 11, 12, 13, 14, 15]; // 10 AM - 3 PM
const QUIET_HOURS = [7, 8, 22, 23]; // Early morning and late evening

/**
 * Calculate crowd forecast for next N hours
 */
export function generateCrowdForecast(
  building: Building,
  hoursAhead: number = 6
): CrowdForecast[] {
  const now = new Date();
  const forecasts: CrowdForecast[] = [];

  for (let i = 1; i <= hoursAhead; i++) {
    const forecastTime = new Date(now.getTime() + i * 60 * 60 * 1000);
    const hour = forecastTime.getHours();

    // Calculate predicted crowd based on historical patterns
    const baseCrowd = 300 + Math.random() * 200;
    const peakMultiplier = PEAK_HOURS.includes(hour) ? 1.8 : 1.2;
    const quietMultiplier = QUIET_HOURS.includes(hour) ? 0.4 : 1;

    const predictedCount = Math.min(
      building.capacity,
      Math.floor(baseCrowd * peakMultiplier * quietMultiplier)
    );

    const crowdPercentage = (predictedCount / building.capacity) * 100;
    const confidence = 75 + Math.random() * 15; // 75-90% confidence

    // Determine trend
    let trend: 'increasing' | 'decreasing' | 'stable' = 'stable';
    if (i > 1) {
      const prevForecast = forecasts[i - 2];
      if (predictedCount > prevForecast.predictedCount)
        trend = 'increasing';
      else if (predictedCount < prevForecast.predictedCount)
        trend = 'decreasing';
    }

    // Determine risk level
    let riskLevel: 'low' | 'medium' | 'high' = 'low';
    if (crowdPercentage > 80) riskLevel = 'high';
    else if (crowdPercentage > 60) riskLevel = 'medium';

    forecasts.push({
      timestamp: forecastTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      predictedCount,
      confidence: Math.round(confidence),
      trend,
      riskLevel,
    });
  }

  return forecasts;
}

/**
 * Predict congestion for all buildings
 */
export function predictCongestionForAll(
  buildings: Building[]
): CongestionPrediction[] {
  return buildings.map((building) => {
    const forecasts = generateCrowdForecast(building);

    // Find peak time in next 6 hours
    const peakForecast = forecasts.reduce((max, current) =>
      current.predictedCount > max.predictedCount ? current : max
    );

    let recommendation = '';
    const crowdPercentage = (building.occupancy / building.capacity) * 100;

    if (crowdPercentage > 80) {
      recommendation = `${building.name} is currently overcrowded. Consider visiting after ${peakForecast.timestamp}.`;
    } else if (crowdPercentage > 60) {
      recommendation = `${building.name} is moderately crowded. Peak expected around ${peakForecast.timestamp}.`;
    } else {
      recommendation = `${building.name} is uncrowded. Good time to visit now.`;
    }

    return {
      locationId: building.id,
      locationName: building.name,
      currentCrowd: building.occupancy,
      forecasts,
      peakTime: peakForecast.timestamp,
      recommendation,
    };
  });
}

/**
 * Generate best time slots for a location
 */
export function getBestTimeSlots(
  building: Building
): BestTimeSlot {
  const timeSlots = [];

  for (let hour = 7; hour <= 23; hour++) {
    // Estimate crowd for this hour
    const baseCrowd = 300 + Math.random() * 200;
    const peakMultiplier = PEAK_HOURS.includes(hour) ? 1.8 : 1.2;
    const quietMultiplier = QUIET_HOURS.includes(hour) ? 0.4 : 1;

    const expectedCrowd = Math.min(
      building.capacity,
      Math.floor(baseCrowd * peakMultiplier * quietMultiplier)
    );
    const crowdPercentage = (expectedCrowd / building.capacity) * 100;

    let suitability: 'excellent' | 'good' | 'fair' | 'poor' = 'fair';
    if (crowdPercentage < 30) suitability = 'excellent';
    else if (crowdPercentage < 50) suitability = 'good';
    else if (crowdPercentage < 70) suitability = 'fair';
    else suitability = 'poor';

    timeSlots.push({
      startTime: `${hour}:00`,
      endTime: `${hour + 1}:00`,
      expectedCrowd,
      crowdPercentage: Math.round(crowdPercentage),
      suitability,
    });
  }

  return {
    locationId: building.id,
    locationName: building.name,
    timeSlots,
  };
}

/**
 * Get historical crowd patterns for a location
 */
export function getHistoricalPatterns(
  _building: Building
): CrowdHistoricalPattern[] {
  const patterns: CrowdHistoricalPattern[] = [];

  for (let hour = 0; hour < 24; hour++) {
    const baseCrowd = 300;
    const peakFactor = PEAK_HOURS.includes(hour) ? 1.8 : 1.2;
    const quietFactor = QUIET_HOURS.includes(hour) ? 0.4 : 1;

    const avgCrowd = Math.floor(baseCrowd * peakFactor * quietFactor);
    const maxCrowd = Math.floor(avgCrowd * 1.3);
    const minCrowd = Math.floor(avgCrowd * 0.7);

    let crowdLevel: 'low' | 'moderate' | 'high' = 'moderate';
    if (avgCrowd < 400) crowdLevel = 'low';
    else if (avgCrowd > 600) crowdLevel = 'high';

    patterns.push({
      hour,
      avgCrowd,
      maxCrowd,
      minCrowd,
      crowdLevel,
    });
  }

  return patterns;
}

/**
 * Get insights for academic blocks
 */
export function getBlockInsights(): BlockInsight[] {
  return [
    {
      blockName: 'SMV Block',
      peakHours: [10, 11, 14, 15],
      quietHours: [8, 9, 16, 17],
      recommendation:
        'Morning and afternoon are busy. Best time: Early morning (before 10 AM) or late afternoon (after 4 PM).',
      averageCrowd: 450,
    },
    {
      blockName: 'TT Block',
      peakHours: [11, 12, 14, 15],
      quietHours: [7, 8, 17, 18],
      recommendation:
        'Peak hours are late morning to mid-afternoon. Visit early morning or after 5 PM.',
      averageCrowd: 480,
    },
    {
      blockName: 'GDN Block',
      peakHours: [10, 11, 13, 14],
      quietHours: [8, 9, 15, 16],
      recommendation:
        'Mid-morning and early afternoon are busy. Quietest early morning and late afternoon.',
      averageCrowd: 420,
    },
    {
      blockName: 'MB Block',
      peakHours: [12, 13, 15, 16],
      quietHours: [8, 9, 17, 18],
      recommendation:
        'Lunch hours and mid-afternoon are peak times. Early morning and evening are quieter.',
      averageCrowd: 500,
    },
    {
      blockName: 'SJT Block',
      peakHours: [11, 12, 14, 15],
      quietHours: [7, 8, 16, 17],
      recommendation:
        'Late morning and afternoon are busy. Visit early morning or after 4 PM for fewer crowds.',
      averageCrowd: 460,
    },
    {
      blockName: 'PRP Block',
      peakHours: [10, 11, 13, 14],
      quietHours: [8, 9, 15, 16],
      recommendation:
        'Mid-morning and early afternoon peak times. Best to visit early morning or late afternoon.',
      averageCrowd: 440,
    },
    {
      blockName: 'MGB Block',
      peakHours: [12, 13, 15, 16],
      quietHours: [9, 10, 17, 18],
      recommendation:
        'Lunch and mid-afternoon are busiest. Quieter during morning and early evening.',
      averageCrowd: 470,
    },
    {
      blockName: 'Main Library',
      peakHours: [14, 15, 16, 17],
      quietHours: [10, 11, 20, 21],
      recommendation:
        'Afternoon rush from 2 PM onwards. Best time: early morning (10-11 AM) or late night.',
      averageCrowd: 520,
    },
    {
      blockName: 'Mess Halls',
      peakHours: [12, 13, 18, 19],
      quietHours: [10, 11, 15, 16],
      recommendation:
        'Lunch (12-2 PM) and dinner (6-8 PM) are extremely busy. Visit outside meal times.',
      averageCrowd: 680,
    },
    {
      blockName: 'Food & Hangout',
      peakHours: [13, 14, 18, 19],
      quietHours: [11, 12, 15, 16],
      recommendation:
        'Post-lunch and evening snack times are busy. Morning and mid-afternoon are quieter.',
      averageCrowd: 420,
    },
  ];
}

/**
 * Get route insights with efficiency recommendations
 */
export function getRouteInsight(
  fromLocationName: string,
  toLocationName: string
): RouteInsight {
  const now = new Date();
  const hour = now.getHours();

  // Simulate route analysis
  const isPeakHour = PEAK_HOURS.includes(hour);

  return {
    fromLocation: fromLocationName,
    toLocation: toLocationName,
    fastestRoute: {
      duration: 5 + Math.random() * 3, // 5-8 mins
      distance: 350 + Math.random() * 150, // 350-500m
      crowdDensity: isPeakHour ? 'high' : 'moderate',
    },
    quietestRoute: {
      duration: 8 + Math.random() * 3, // 8-11 mins
      distance: 500 + Math.random() * 200, // 500-700m
      crowdDensity: 'low',
    },
    recommendation:
      isPeakHour
        ? 'Peak hours detected. Quietest route recommended to avoid congestion.'
        : 'Fastest route is suitable. Current crowd levels are manageable.',
  };
}

/**
 * Get real-time alerts based on crowd spikes
 */
export function getRealTimeAlerts(buildings: Building[]): string[] {
  const alerts: string[] = [];

  buildings.forEach((building) => {
    const crowdPercentage = (building.occupancy / building.capacity) * 100;

    if (building.status === 'critical') {
      alerts.push(`⚠️ ${building.name} is currently overcrowded!`);
    } else if (
      crowdPercentage > 75 &&
      building.occupancy > building.capacity * 0.8
    ) {
      alerts.push(
        `🔴 ${building.name} will become congested soon. ${Math.round(crowdPercentage)}% capacity.`
      );
    }
  });

  return alerts;
}

/**
 * Get AI suggestions based on current state
 */
export function getAISuggestions(buildings: Building[]): string[] {
  const suggestions: string[] = [];
  const now = new Date();
  const hour = now.getHours();

  const topCrowded = [...buildings]
    .sort((a, b) => b.occupancy - a.occupancy)
    .slice(0, 2);
  const leastCrowded = [...buildings]
    .sort((a, b) => a.occupancy - b.occupancy)
    .slice(0, 2);

  suggestions.push(
    `Redirect traffic from ${topCrowded[0].name} to ${leastCrowded[0].name} for optimal campus flow.`
  );

  if (PEAK_HOURS.includes(hour)) {
    suggestions.push(
      'Peak hours detected. Consider deferring non-urgent visits to after 4 PM.'
    );
  }

  if (leastCrowded[0]) {
    suggestions.push(
      `${leastCrowded[0].name} is the quietest right now - ideal for focused work or study.`
    );
  }

  return suggestions;
}
