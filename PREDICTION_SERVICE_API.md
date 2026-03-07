# Prediction Service API Reference

## Quick Reference Guide for `predictionService.ts`

### All Functions at a Glance

```typescript
// 📊 Generate Forecasts
generateCrowdForecast(building: Building, hoursAhead?: number): CrowdForecast[]

// 🏢 Predict All Buildings
predictCongestionForAll(buildings: Building[]): CongestionPrediction[]

// ⏰ Get Best Times
getBestTimeSlots(building: Building): BestTimeSlot

// 📈 Get History
getHistoricalPatterns(building: Building): CrowdHistoricalPattern[]

// 🏭 Block Analytics
getBlockInsights(): BlockInsight[]

// 🧭 Route Analysis
getRouteInsight(fromLocation: string, toLocation: string): RouteInsight

// 🚨 Alerts
getRealTimeAlerts(buildings: Building[]): string[]

// 💡 Smart Suggestions
getAISuggestions(buildings: Building[]): string[]
```

---

## Detailed API Documentation

### 1. `generateCrowdForecast()`

**Purpose**: Generate crowd predictions for next N hours

**Signature**:
```typescript
function generateCrowdForecast(
  building: Building,
  hoursAhead: number = 6
): CrowdForecast[]
```

**Parameters**:
- `building`: Building object to forecast for
- `hoursAhead`: Number of hours to forecast (default: 6)

**Returns**: Array of CrowdForecast objects

**Example**:
```typescript
const library = buildings[0];
const forecast = generateCrowdForecast(library, 6);
console.log(forecast);
// [
//   {
//     timestamp: "14:00",
//     predictedCount: 450,
//     confidence: 85,
//     trend: "increasing",
//     riskLevel: "medium"
//   },
//   ...
// ]
```

**Use Cases**:
- Display in "Predict Congestion" page
- Show in detail view when building selected
- Use for real-time alert calculations

---

### 2. `predictCongestionForAll()`

**Purpose**: Get predictions for all buildings at once

**Signature**:
```typescript
function predictCongestionForAll(
  buildings: Building[]
): CongestionPrediction[]
```

**Parameters**:
- `buildings`: Array of all campus buildings

**Returns**: Array of CongestionPrediction objects

**Example**:
```typescript
const allPredictions = predictCongestionForAll(buildings);
console.log(allPredictions[0]);
// {
//   locationId: "b1",
//   locationName: "Main Library",
//   currentCrowd: 450,
//   forecasts: [...],
//   peakTime: "15:00",
//   recommendation: "Library will become crowded in 30 minutes."
// }
```

**Use Cases**:
- Get all location predictions at once
- Filter by risk level
- Display in location list
- Sort by congestion

---

### 3. `getBestTimeSlots()`

**Purpose**: Get hourly time slot recommendations for a location

**Signature**:
```typescript
function getBestTimeSlots(
  building: Building
): BestTimeSlot
```

**Parameters**:
- `building`: Building to get recommendations for

**Returns**: BestTimeSlot object with hourly slots

**Example**:
```typescript
const slots = getBestTimeSlots(mainLibrary);
console.log(slots);
// {
//   locationId: "b1",
//   locationName: "Main Library",
//   timeSlots: [
//     {
//       startTime: "07:00",
//       endTime: "08:00",
//       expectedCrowd: 150,
//       crowdPercentage: 25,
//       suitability: "excellent"
//     },
//     ...
//   ]
// }
```

**Use Cases**:
- Display in "Best Time to Visit" page
- Show time slot cards
- Highlight best times
- Filter by suitability

---

### 4. `getHistoricalPatterns()`

**Purpose**: Get historical crowd patterns for 24-hour period

**Signature**:
```typescript
function getHistoricalPatterns(
  building: Building
): CrowdHistoricalPattern[]
```

**Parameters**:
- `building`: Building to analyze

**Returns**: Array of hourly patterns (24 elements)

**Example**:
```typescript
const patterns = getHistoricalPatterns(mainLibrary);
console.log(patterns);
// [
//   {
//     hour: 0,
//     avgCrowd: 80,
//     maxCrowd: 104,
//     minCrowd: 56,
//     crowdLevel: "low"
//   },
//   ...
//   {
//     hour: 14,
//     avgCrowd: 520,
//     maxCrowd: 676,
//     minCrowd: 364,
//     crowdLevel: "high"
//   },
// ]
```

**Use Cases**:
- Display 24-hour heatmap
- Show historical trends
- Identify peak hours
- Recommend quiet times

---

### 5. `getBlockInsights()`

**Purpose**: Get insights for major academic blocks

**Signature**:
```typescript
function getBlockInsights(): BlockInsight[]
```

**Parameters**: None

**Returns**: Array of BlockInsight objects

**Example**:
```typescript
const insights = getBlockInsights();
console.log(insights);
// [
//   {
//     blockName: "Technology Tower (TT)",
//     peakHours: [10, 11, 13, 14],
//     quietHours: [8, 9, 16, 17],
//     recommendation: "Usually crowded 10 AM-2 PM. Best: after 3 PM.",
//     averageCrowd: 620
//   },
//   ...
// ]
```

**Use Cases**:
- Display campus insights
- Show in sidebar of various pages
- Provide recommendations
- Analyze by time of day

---

### 6. `getRouteInsight()`

**Purpose**: Analyze efficiency of routes between two locations

**Signature**:
```typescript
function getRouteInsight(
  fromLocationName: string,
  toLocationName: string
): RouteInsight
```

**Parameters**:
- `fromLocationName`: Starting location name
- `toLocationName`: Destination location name

**Returns**: RouteInsight with fastest and quietest options

**Example**:
```typescript
const insight = getRouteInsight("Main Library", "Tech Tower");
console.log(insight);
// {
//   fromLocation: "Main Library",
//   toLocation: "Tech Tower",
//   fastestRoute: {
//     duration: 5,
//     distance: 350,
//     crowdDensity: "high"
//   },
//   quietestRoute: {
//     duration: 7,
//     distance: 520,
//     crowdDensity: "low"
//   },
//   recommendation: "Peak hours detected. Quietest route recommended."
// }
```

**Use Cases**:
- Smart route finder comparison
- Route selection logic
- Duration/crowd trade-offs
- AI recommendations

---

### 7. `getRealTimeAlerts()`

**Purpose**: Get current real-time congestion alerts

**Signature**:
```typescript
function getRealTimeAlerts(
  buildings: Building[]
): string[]
```

**Parameters**:
- `buildings`: Array of all campus buildings

**Returns**: Array of alert strings

**Example**:
```typescript
const alerts = getRealTimeAlerts(buildings);
console.log(alerts);
// [
//   "⚠️ Student Union is currently overcrowded!",
//   "🔴 Science Hub will become congested soon. 85% capacity.",
//   "⚠️ Main Library is currently overcrowded!"
// ]
```

**Use Cases**:
- Display alerts on dashboard
- Show in notifications panel
- Trigger push notifications
- Alert filtering and sorting

---

### 8. `getAISuggestions()`

**Purpose**: Get AI-powered suggestions based on current campus state

**Signature**:
```typescript
function getAISuggestions(
  buildings: Building[]
): string[]
```

**Parameters**:
- `buildings`: Array of all campus buildings

**Returns**: Array of suggestion strings

**Example**:
```typescript
const suggestions = getAISuggestions(buildings);
console.log(suggestions);
// [
//   "Redirect traffic from Student Union to Engineering Block for optimal flow.",
//   "Peak hours detected. Consider deferring visits to after 4 PM.",
//   "Sports Complex is quietest right now - ideal for focused work."
// ]
```

**Use Cases**:
- Display suggestions in various pages
- Real-time routing decisions
- Campus-wide optimization
- User notifications

---

## Type Definitions

### CrowdForecast
```typescript
interface CrowdForecast {
  timestamp: string;              // "14:00"
  predictedCount: number;         // 450
  confidence: number;             // 75-90
  trend: 'increasing' | 'decreasing' | 'stable';
  riskLevel: 'low' | 'medium' | 'high';
}
```

### CongestionPrediction
```typescript
interface CongestionPrediction {
  locationId: string;             // "b1"
  locationName: string;           // "Main Library"
  currentCrowd: number;           // 450
  forecasts: CrowdForecast[];     // Array of 6-hour forecast
  peakTime?: string;              // "15:00"
  recommendation?: string;        // AI suggestion
}
```

### BestTimeSlot
```typescript
interface BestTimeSlot {
  locationId: string;             // "b1"
  locationName: string;           // "Main Library"
  timeSlots: Array<{
    startTime: string;            // "14:00"
    endTime: string;              // "15:00"
    expectedCrowd: number;        // 250
    crowdPercentage: number;      // 35
    suitability: 'excellent' | 'good' | 'fair' | 'poor';
  }>;
}
```

### CrowdHistoricalPattern
```typescript
interface CrowdHistoricalPattern {
  hour: number;                   // 0-23
  avgCrowd: number;               // 450
  maxCrowd: number;               // 580
  minCrowd: number;               // 320
  crowdLevel: 'low' | 'moderate' | 'high';
}
```

### BlockInsight
```typescript
interface BlockInsight {
  blockName: string;              // "Technology Tower"
  peakHours: number[];            // [10, 11, 13, 14]
  quietHours: number[];           // [8, 9, 16, 17]
  recommendation: string;         // Human-readable advice
  averageCrowd: number;           // 620
}
```

### RouteInsight
```typescript
interface RouteInsight {
  fromLocation: string;           // "Main Library"
  toLocation: string;             // "Tech Tower"
  fastestRoute: {
    duration: number;             // 5 minutes
    distance: number;             // 350 meters
    crowdDensity: 'low' | 'moderate' | 'high';
  };
  quietestRoute: {
    duration: number;             // 7 minutes
    distance: number;             // 520 meters
    crowdDensity: 'low' | 'moderate' | 'high';
  };
  recommendation: string;         // AI suggestion
}
```

---

## Usage Examples

### Example 1: Dashboard Initialization

```typescript
import { useCrowdSimulation } from '../hooks/useCrowdSimulation';
import { predictCongestionForAll, getRealTimeAlerts } from '../services/predictionService';

export const MyDashboard = () => {
  const { buildings } = useCrowdSimulation(5000);
  
  const predictions = useMemo(
    () => predictCongestionForAll(buildings),
    [buildings]
  );
  
  const alerts = useMemo(
    () => getRealTimeAlerts(buildings),
    [buildings]
  );
  
  return (
    <div>
      <h1>{alerts.length} Active Alerts</h1>
      <p>{predictions.length} Predictions</p>
    </div>
  );
};
```

### Example 2: Time Slot Recommendation

```typescript
import { getBestTimeSlots } from '../services/predictionService';

export const BestTimePage = () => {
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  
  const slots = useMemo(() => {
    if (!selectedBuilding) return null;
    return getBestTimeSlots(selectedBuilding);
  }, [selectedBuilding]);
  
  const bestSlots = slots?.timeSlots.filter(s => s.suitability === 'excellent');
  
  return (
    <div>
      {bestSlots?.map(slot => (
        <TimeSlotCard key={slot.startTime} {...slot} />
      ))}
    </div>
  );
};
```

### Example 3: Historical Analysis

```typescript
import { getHistoricalPatterns } from '../services/predictionService';

export const PatternAnalysis = () => {
  const patterns = getHistoricalPatterns(selectedBuilding);
  
  const quietestHour = patterns.reduce((min, p) =>
    p.avgCrowd < min.avgCrowd ? p : min
  );
  
  const peakHour = patterns.reduce((max, p) =>
    p.avgCrowd > max.avgCrowd ? p : max
  );
  
  return (
    <div>
      <p>Quietest: {quietestHour.hour}:00</p>
      <p>Busiest: {peakHour.hour}:00</p>
    </div>
  );
};
```

---

## Integration Checklist

When integrating prediction service into components:

- [ ] Import service functions
- [ ] Wrap in `useMemo()` for performance
- [ ] Handle null/empty states
- [ ] Memoize building selections
- [ ] Use type definitions properly
- [ ] Handle errors gracefully
- [ ] Test with real building data
- [ ] Verify confidence levels
- [ ] Check alert triggers

---

## Performance Tips

1. **Memoize Heavy Calculations**
   ```typescript
   const predictions = useMemo(
     () => predictCongestionForAll(buildings),
     [buildings]
   );
   ```

2. **Filter Before Processing**
   ```typescript
   const highRisk = predictions.filter(p => p.forecasts[0].riskLevel === 'high');
   ```

3. **Cache Block Insights**
   ```typescript
   const blockInsights = useMemo(() => getBlockInsights(), []);
   // Only needs to run once (doesn't depend on real-time data)
   ```

4. **Debounce Updates**
   ```typescript
   const [alerts, setAlerts] = useState<string[]>([]);
   useEffect(() => {
     const timer = setTimeout(() => {
       setAlerts(getRealTimeAlerts(buildings));
     }, 1000);
     return () => clearTimeout(timer);
   }, [buildings]);
   ```

---

## Migration Guide (Mock to Real)

To replace mock predictions with real ML models:

### Before (Mock)
```typescript
export function generateCrowdForecast(building, hoursAhead = 6) {
  const forecasts = [];
  for (let i = 1; i <= hoursAhead; i++) {
    // ... mock logic ...
  }
  return forecasts;
}
```

### After (Real ML)
```typescript
export async function generateCrowdForecast(building, hoursAhead = 6) {
  const response = await fetch('/api/predict', {
    method: 'POST',
    body: JSON.stringify({
      buildingId: building.id,
      hours: hoursAhead,
      currentCrowd: building.occupancy
    })
  });
  const data = await response.json();
  return data.forecasts as CrowdForecast[];
}
```

---

## Troubleshooting

**Problem**: Predictions always show same values
- Check: Is `useCrowdSimulation()` updating building data?
- Solution: Verify mock data ranges are realistic

**Problem**: Best time slots all show "poor"
- Check: Building capacity values reasonable?
- Solution: Check capacity vs expected crowd numbers

**Problem**: Alerts not triggering
- Check: Are buildings reaching critical status?
- Solution: Monitor `building.status` values

**Problem**: Performance issues
- Check: Are predictions memoized?
- Solution: Add or fix useMemo() calls

---

## Constants Used

**Peak Hours** (higher crowd):
```typescript
const PEAK_HOURS = [10, 11, 12, 13, 14, 15]; // 10 AM - 3 PM
```

**Quiet Hours** (lower crowd):
```typescript
const QUIET_HOURS = [7, 8, 22, 23]; // Early morning & late evening
```

**Status Thresholds**:
- Optimal: < 70% capacity
- Warning: 70-90% capacity
- Critical: > 90% capacity

---

## Future Enhancement Points

1. **ML Model Predictions**: Replace mock with TensorFlow/PyTorch
2. **Anomaly Detection**: Identify unusual crowd patterns
3. **Event Integration**: Factor in academic calendar events
4. **Weather Impact**: Include weather data in predictions
5. **Seasonal Patterns**: Adjust for semester phases
6. **Social Features**: Aggregate user preferences
7. **Realtime Websockets**: Push updates vs polling

---

Done! Use this as your quick reference when integrating the prediction service into pages and components. 🚀
