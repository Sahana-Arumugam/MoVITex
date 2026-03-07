# MoVITex Student Dashboard Design

## Overview

The **MoVITex Student Dashboard** is a comprehensive AI-powered campus mobility platform designed to help students optimize their movement across campus by analyzing real-time crowd patterns, predicting congestion, and suggesting optimal routes.

## Core Design Principles

- **Modern & Minimal**: Clean glass-morphism UI with smooth animations
- **Data-Driven**: All recommendations backed by real crowd data and AI predictions
- **Mobile-First**: Responsive design optimized for both mobile and desktop
- **Real-Time Updates**: Live crowd data with 30-minute granularity
- **Contextual Intelligence**: AI-powered suggestions tailored to current conditions

## Dashboard Pages (6 Features)

---

### 1. 🗺️ Campus Crowd Heatmap Page

**Purpose**: Provide real-time visual overview of crowd density across campus.

**Key Features**:

| Feature | Description |
|---------|-------------|
| **Interactive Map** | Color-coded campus map showing all locations |
| **Crowd Density Legend** | Green (low) → Yellow (moderate) → Red (high) |
| **Location Tooltips** | Shows crowd count, capacity, crowd percentage |
| **Time Slider** | View historical crowd levels at different times |
| **Smart Filters** | Filter by: Academic Blocks, Library, Mess, Food Spots, Shuttle Stops |
| **Zone Insights** | Floating AI panel showing high/low density zones |

**UI Components**:
- `MapComponent` - Interactive map visualization
- `GlassPanel` - Information panels
- `Tooltip` - Location details on hover

**Dataset Usage**:
- **Location Crowd Data**: `people_count`, `capacity`, `timestamp`
- **Real-time Updates**: Every 30 minutes
- **Status Indicators**: Crowd level (optimal/warning/critical)

**File**: `src/pages/LiveMap.tsx`

---

### 2. 📈 Predict Congestion Page

**Purpose**: Use AI models to predict future crowd levels and provide risk assessments.

**Key Features**:

| Feature | Description |
|---------|-------------|
| **6-Hour Forecast** | Crowd predictions for next 6 hours |
| **Confidence Levels** | 75-90% prediction confidence |
| **Risk Assessment** | Low/Medium/High congestion risk classification |
| **Trend Indicators** | Rising ↑ / Stable → / Declining ↓ trends |
| **Real-Time Alerts** | Instant notifications of congestion spikes |
| **AI Recommendations** | Location-specific suggestions and alerts |
| **Predictive Charts** | Bar charts showing forecast data by hour |

**UI Components**:
- `CongestionChart` - Forecast visualization with trend indicators
- `InsightCard` - AI suggestions and alerts
- `GlassPanel` - Information panels

**Dataset Usage**:
- **Historical Patterns**: Crowd data by hour for prediction models
- **Temporal Data**: Timestamps for time-based analysis
- **Real-time Data**: Current occupancy levels
- **Event Flags**: Scheduled events affecting predictions

**Predictions Include**:
```
{
  locationId: string,
  locationName: string,
  currentCrowd: number,
  forecasts: [
    {
      timestamp: string,      // "14:00"
      predictedCount: number, // 450
      confidence: number,     // 85%
      trend: "increasing" | "decreasing" | "stable",
      riskLevel: "low" | "medium" | "high"
    }
  ],
  peakTime: string,          // "15:00"
  recommendation: string     // AI suggestion
}
```

**File**: `src/pages/PredictCongestion.tsx`

---

### 3. 🧭 Optimal Path Navigation Page

**Purpose**: Help students travel between locations using the least crowded route.

**Key Features**:

| Feature | Description |
|---------|-------------|
| **Route Selection** | Choose source and destination locations |
| **Fastest Route** | Shortest time, may have higher crowd |
| **Quietest Route** | Lowest crowd density, may take longer |
| **Route Map** | Visual display of both route options |
| **Travel Time** | Duration for each route |
| **Crowd Analysis** | Density analysis along each path |
| **AI Suggestions** | "Fastest route currently congested. Quietest route recommended." |

**UI Components**:
- `MapComponent` - Route visualization
- `RoutingPanel` - Route selection and display
- `InsightCard` - AI recommendations

**Dataset Usage**:
- **Route Crowd Data**: `path_people_count`, `distance` between locations
- **Building Occupancy**: Current crowd levels
- **Pathways**: Connectivity between campus locations
- **Real-time Density**: Living crowd patterns on routes

**Route Result Format**:
```
{
  fastest: {
    time: "5 mins",
    crowd: "High",
    distance: "350m"
  },
  quietest: {
    time: "7 mins",
    crowd: "Low",
    distance: "520m"
  }
}
```

**File**: `src/pages/SmartRouteFinder.tsx`

---

### 4. 📊 Block & Time Crowd Insights Page

**Purpose**: Show historical crowd patterns for different locations.

**Key Features**:

| Feature | Description |
|---------|-------------|
| **24-Hour Heatmap** | Color-coded grid showing crowd by hour |
| **Block Analytics** | Deep dive into specific academic blocks |
| **Time-Based Trends** | Historical patterns across hours |
| **Peak/Quiet Hours** | Identified busiest and quietest times |
| **Average Metrics** | Min/Max/Average crowd calculations |
| **Block Insights** | Recommendations for each major building |

**UI Components**:
- `HeatmapChart` - 24-hour heatmap visualization
- `GlassPanel` - Information panels
- `InsightCard` - Pattern insights

**Dataset Usage**:
- **Historical Crowd Data**: Grouped by location and hour
- **Timestamps**: 24-hour historical patterns
- **Occupancy Records**: Time-series data for trend analysis

**Block Insights Provided**:
```
{
  blockName: "Technology Tower (TT)",
  peakHours: [10, 11, 13, 14],
  quietHours: [8, 9, 16, 17],
  recommendation: "Usually crowded between 10 AM - 2 PM. Best time to visit: 3 PM onwards.",
  averageCrowd: 620
}
```

**Example Insights**:
- "Technology Tower is usually crowded between 10 AM and 12 PM."
- "Science Block peaks mid-afternoon; best visited early morning."
- "Student Union busiest during lunch (12-1 PM) and evening (5-7 PM)."

**File**: `src/pages/StudentIntelligence.tsx`

---

### 5. ⏰ Best Time to Visit Page

**Purpose**: Help students decide when to visit a location for quiet, productive time.

**Key Features**:

| Feature | Description |
|---------|-------------|
| **Location Selector** | Choose any campus location |
| **Time Slot Cards** | Hourly breakdown with suitability ratings |
| **Suitability Ratings** | Excellent ⭐⭐⭐⭐⭐ to Poor ⭐ |
| **Expected Crowd** | Number and percentage of capacity |
| **Recommended Times** | Top quiet hours highlighted |
| **Historical Heatmap** | 24-hour pattern visualization |
| **Best Time Summary** | Peak recommendation with details |
| **Calendar Integration** | Set reminders for best times |

**UI Components**:
- `TimeSlotCard` - Individual time slot recommendation
- `HeatmapChart` - Historical patterns heatmap
- `InsightCard` - Recommendations
- `GlassPanel` - Summary panels

**Dataset Usage**:
- **Historical Crowd Data**: For each location by hour
- **Predicted Data**: AI predictions for today and future
- **Capacity Data**: For percentage calculations

**Time Slot Data**:
```
{
  startTime: "14:00",
  endTime: "15:00",
  expectedCrowd: 250,
  crowdPercentage: 35,
  suitability: "excellent" | "good" | "fair" | "poor"
}
```

**Example Recommendations**:
- "Best time to visit Main Library today: 3 PM – 4 PM (only 35% capacity)"
- "Morning (8-10 AM) is quietest for study sessions"
- "Avoid Student Union between 12-2 PM (92% capacity)"

**File**: `src/pages/BestTimeToVisit.tsx`

---

### 6. 🔔 Smart Alerts Page

**Purpose**: Notify students about sudden crowd spikes and provide real-time recommendations.

**Key Features**:

| Feature | Description |
|---------|-------------|
| **Real-Time Alerts** | Instant notifications of congestion changes |
| **Congestion Alerts** | "Location is currently overcrowded" |
| **Predictive Alerts** | "Location will become crowded in 20 minutes" |
| **Event-Based Alerts** | Special event notifications |
| **Smart Recommendations** | Alternative locations or times suggested |
| **Alert History** | View past alerts and patterns |
| **Custom Alert Preferences** | Set notification thresholds |

**UI Components**:
- `InsightCard` - Alert cards with action buttons
- `GlassPanel` - Alert grouping and organization
- Notification badges

**Dataset Usage**:
- **Real-time Crowd Data**: Current occupancy
- **Event Flags**: Special events or incidents
- **Historical Patterns**: For anomaly detection
- **Threshold Data**: For alert triggers

**Sample Alerts**:

| Alert | Type | Action |
|-------|------|--------|
| "Foodys is currently overcrowded." | Immediate | View alternatives |
| "SJT Nescafe will be crowded in 20 min." | Predictive | Set reminder |
| "Main Library reached 95% capacity." | Warning | Find quiet spot |
| "Campus-wide event: Auditorium at capacity" | Event-based | Check event details |

**File**: `src/pages/NotificationsPanel.tsx`

---

## Architecture & Data Flow

```
┌─────────────────────────────────────────┐
│     Real-Time Crowd Data                │
│  (Updated every 30 minutes)             │
└──────────────┬──────────────────────────┘
               │
               ▼
┌──────────────────────────────────────────────┐
│   CrowdSimulationEngine                      │
│   (Simulates campus crowd movement)          │
└──────────────┬───────────────────────────────┘
               │
       ┌───────┴───────┐
       ▼               ▼
┌──────────────┐  ┌──────────────────┐
│ Live Data    │  │ Historical Data  │
└──────┬───────┘  └────────┬─────────┘
       │                   │
       └───────┬───────────┘
               ▼
    ┌──────────────────────────┐
    │ Prediction Service       │
    │ - generateCrowdForecast()│
    │ - getBestTimeSlots()     │
    │ - getHistoricalPatterns()│
    └──────────────○────────────┘
               │
    ┌──────────┴──────────────────────┐
    │                                 │
    ▼                                 ▼
┌─────────────────────────┐  ┌──────────────────────┐
│  Student Pages          │  │  AI Insights         │
│  1. Heatmap             │  │  - Suggestions       │
│  2. Predict Congestion  │  │  - Alerts            │
│  3. Route Finder        │  │  - Recommendations   │
│  4. Block Insights      │  │                      │
│  5. Best Time to Visit  │  │                      │
│  6. Smart Alerts        │  │                      │
└─────────────────────────┘  └──────────────────────┘
```

## Key Services

### predictionService.ts

Provides AI-powered crowd predictions and recommendations:

**Main Functions**:

```typescript
// Generate 6-hour crowd forecast for a location
generateCrowdForecast(building: Building, hoursAhead: 6): CrowdForecast[]

// Predict congestion for all campus buildings
predictCongestionForAll(buildings: Building[]): CongestionPrediction[]

// Get best time slots to visit a location
getBestTimeSlots(building: Building): BestTimeSlot

// Get historical crowd patterns by hour
getHistoricalPatterns(building: Building): CrowdHistoricalPattern[]

// Get insights for academic blocks
getBlockInsights(): BlockInsight[]

// Get route efficiency analysis
getRouteInsight(from: string, to: string): RouteInsight

// Get real-time alerts
getRealTimeAlerts(buildings: Building[]): string[]

// Get AI suggestions based on current state
getAISuggestions(buildings: Building[]): string[]
```

## UI Components

### Core Components

| Component | Purpose | Location |
|-----------|---------|----------|
| `CongestionChart` | Visualize forecast data with trends | `components/ui/CongestionChart.tsx` |
| `HeatmapChart` | Show 24-hour historical patterns | `components/ui/HeatmapChart.tsx` |
| `InsightCard` | Display AI insights and recommendations | `components/ui/InsightCard.tsx` |
| `TimeSlotCard` | Show individual time slot recommendations | `components/ui/TimeSlotCard.tsx` |
| `MapComponent` | Interactive campus map | `components/ui/MapComponent.tsx` |
| `GlassPanel` | Reusable glass-morphism container | `components/ui/GlassPanel.tsx` |

### Page Components

| Page | Feature | Location |
|------|---------|----------|
| `LiveMap` | Campus Crowd Heatmap | `pages/LiveMap.tsx` |
| `PredictCongestion` | Predict Congestion | `pages/PredictCongestion.tsx` |
| `SmartRouteFinder` | Optimal Path Navigation | `pages/SmartRouteFinder.tsx` |
| `StudentIntelligence` | Block & Time Insights | `pages/StudentIntelligence.tsx` |
| `BestTimeToVisit` | Best Time to Visit | `pages/BestTimeToVisit.tsx` |
| `NotificationsPanel` | Smart Alerts | `pages/NotificationsPanel.tsx` |

## Type System

### Core Types

```typescript
// Location crowd information
interface Building {
  id: string;
  name: string;
  occupancy: number;
  capacity: number;
  energyUsage: number;
  efficiency: number;
  coordinates: [number, number];
  status: 'optimal' | 'warning' | 'critical';
}

// Crowd data samples
interface CrowdData {
  timestamp: string;
  count: number;
  location: string;
}

// Crowd forecast prediction
interface CrowdForecast {
  timestamp: string;
  predictedCount: number;
  confidence: number;
  trend: 'increasing' | 'decreasing' | 'stable';
  riskLevel: 'low' | 'medium' | 'high';
}

// Congestion prediction for a location
interface CongestionPrediction {
  locationId: string;
  locationName: string;
  currentCrowd: number;
  forecasts: CrowdForecast[];
  peakTime?: string;
  recommendation?: string;
}

// Best time to visit recommendations
interface BestTimeSlot {
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

// Historical patterns by hour
interface CrowdHistoricalPattern {
  hour: number;
  avgCrowd: number;
  maxCrowd: number;
  minCrowd: number;
  crowdLevel: 'low' | 'moderate' | 'high';
}

// Insights for academic blocks
interface BlockInsight {
  blockName: string;
  peakHours: number[];
  quietHours: number[];
  recommendation: string;
  averageCrowd: number;
}

// Route analysis
interface RouteInsight {
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
```

## Design System

### Color Scheme

| State | Color | Usage |
|-------|-------|-------|
| **Optimal/Low** | Emerald 500 | Low crowd, ready to visit |
| **Moderate/Warning** | Amber 500 | Medium crowd, caution |
| **Critical/High** | Red 500 | High crowd, avoid |
| **Information** | Blue 500 | Suggestions, info |
| **Success** | Emerald 500 | Confirmations, completed |

### Glass Morphism Theme

- **Background**: `#050505` (Nearly black)
- **Glass Panels**: `rgba(255, 255, 255, 0.05)` with backdrop blur
- **Borders**: Subtle white with 10-20% opacity
- **Text**: White with varying opacity for hierarchy

### Typography

- **Display**: Large, bold headers (crowd numbers, times)
- **Body**: Regular text for descriptions
- **Label**: Uppercase, small, tracking-wide for UI labels
- **Mono**: Code/data display

### Animations

- **Page Transitions**: Fade + slide (300ms, easeOut)
- **Card Hovers**: Scale + opacity (200ms)
- **Chart Bars**: Staggered entrance (600ms)
- **List Items**: Slide in with delay

---

## Navigation Structure

```
StudentPortal (/student)
├── 🗺️ Campus Crowd Heatmap (/student/map)
├── 📈 Predict Congestion (/student/predict)
├── 🧭 Smart Route Finder (/student/route)
├── 📊 Block & Time Insights (/student/insights)
├── ⏰ Best Time to Visit (/student/best-time)
└── 🔔 Smart Alerts (/student/alerts)
```

## Data Update Frequency

| Data Type | Update Frequency | Source |
|-----------|------------------|--------|
| Real-time Crowd | Every 30 minutes | IoT sensors, entry systems |
| Forecasts | Updated hourly | ML prediction model |
| Historical Data | Aggregated daily | Historical database |
| Alerts | Real-time | Event monitoring system |

## Use Cases

### Student Scenario 1: Planning Study Session
1. Open **Best Time to Visit**
2. Select Main Library
3. See recommendations: "3-4 PM is quietest - 35% capacity"
4. Set reminder for 2:50 PM
5. Head to library with confidence

### Student Scenario 2: Late Class Dash
1. Check **Predict Congestion**
2. See alert: "Student Union crowded until 4 PM"
3. View **Smart Route Finder**
4. Choose quietest route (7 mins via back path, low crowd)
5. Arrive without hassle

### Student Scenario 3: Campus Exploration
1. Open **Campus Crowd Heatmap**
2. See green zones (uncrowded, quiet)
3. Explore peaceful areas for lunch
4. Use time slider to check less busy hours

## Future Enhancements

- **Social Features**: Share crowdless times with friends
- **Calendar Integration**: Sync with academic calendar
- **Personal Preferences**: Learn individual habits
- **Event Predictions**: Model impact of campus events
- **Energy Awareness**: Optimize energy usage patterns
- **Accessibility Features**: Quiet routes for accessibility needs
- **Mobile App**: Native iOS/Android app
- **AR Navigation**: Augmented reality turn-by-turn routing
- **Crowd Heatmaps**: Share popular study spots anonymously

---

## Files Created/Modified

### New Files Created
- `src/services/predictionService.ts` - AI prediction engine
- `src/pages/PredictCongestion.tsx` - Congestion prediction page
- `src/pages/BestTimeToVisit.tsx` - Best time recommendations page
- `src/components/ui/CongestionChart.tsx` - Forecast visualization
- `src/components/ui/HeatmapChart.tsx` - Historical patterns heatmap
- `src/components/ui/InsightCard.tsx` - AI insight cards
- `src/components/ui/TimeSlotCard.tsx` - Time slot recommendations

### Files Modified
- `src/types/index.ts` - Extended with prediction types
- `src/pages/StudentPortal.tsx` - Updated navigation with 6 pages

### Existing Files (Integrated)
- `src/pages/LiveMap.tsx` - Campus Crowd Heatmap
- `src/pages/SmartRouteFinder.tsx` - Optimal Path Navigation
- `src/pages/StudentIntelligence.tsx` - Block & Time Insights
- `src/pages/NotificationsPanel.tsx` - Smart Alerts

---

## Getting Started

### Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Access Dashboard
```
http://localhost:5173/student/map
```

### Navigation
- Use sidebar to switch between 6 features
- Each page has distinct UI and functionality
- Real-time updates reflected across all pages

---

## Performance Considerations

- **Memoization**: UseMemo for heavy computations
- **Lazy Loading**: Pages loaded on-demand
- **Data Caching**: Predictions cached until next update cycle
- **Animations**: GPU-accelerated with motion/react
- **Responsive**: Mobile-first CSS Grid layout

---

## Accessibility

- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Color contrast WCAG AA compliant
- Focus indicators visible

---

This design provides a comprehensive, modern student dashboard that helps optimize campus mobility through data-driven insights and AI recommendations.
