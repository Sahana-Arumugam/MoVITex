# Predict Congestion Page - VIT Campus Integration

## Overview

The **Predict Congestion Page** has been completely redesigned to work with VIT campus locations and categories. It now provides intelligent forecasting, category-based filtering, and alternative location recommendations.

---

## 🎯 Key Features

### 1. **AI-Powered Forecasting**
- 6-hour crowd predictions for each campus location
- Confidence levels (75-90%) for each forecast
- Trend indicators (rising ↑, stable →, declining ↓)
- Risk levels: Low 🟢, Medium 🟡, High 🔴

### 2. **Smart Filtering**
Filter locations by:
- **Category**: Academic Rooms, Library, Shuttle Stops, Gates, Mess, Food Spots
- **Block**: SMV, TT, GDN, MB, SJT, PRP, MGB (for academic rooms)
- **Risk Level**: High, Medium, Low, All

### 3. **Real-Time Alerts**
- High-risk location alerts with recommendations
- "Will become crowded in X minutes" predictions
- "Lower crowd levels after X PM" suggestions

### 4. **Alternative Recommendations**
- Suggests quiet alternatives in the same category
- Shows capacity percentages
- One-click switching between locations

### 5. **Visual Analytics**
- 6-hour forecast chart per location
- Current vs. capacity comparison
- Fill percentage indicators
- Peak time identification

---

## 📍 VIT Campus Locations

### Academic Rooms (70 total)
```
SMV Block:  SMV_Room1 - SMV_Room10
TT Block:   TT_Room1 - TT_Room10
GDN Block:  GDN_Room1 - GDN_Room10
MB Block:   MB_Room1 - MB_Room10
SJT Block:  SJT_Room1 - SJT_Room10
PRP Block:  PRP_Room1 - PRP_Room10
MGB Block:  MGB_Room1 - MGB_Room10
```

### Libraries (1 location)
```
Main Library
```

### Shuttle Stops (2 locations)
```
Shuttle Stop Main Gate
Shuttle Stop SJT
```

### Entry/Exit Gates (1 location)
```
Outing Gate 1
```

### Mess/Dining (8 locations)
```
Mess D, Mess E, Mess G, Mess H
Mess S, Mess T, Mess P, Mess M
```

### Food/Hangout Spots (5 locations)
```
Cafeteria Library Nescafe
Cafeteria SJT Nescafe
Foodys
KC Food Court
FC Food Court
```

**Total: 87 VIT Campus Locations**

---

## 📊 UI Layout

```
┌─────────────────────────────────────────────────────┐
│           Predict Congestion UI Layout             │
├───────────────────┬─────────────────────────────────┤
│  LEFT PANEL       │     RIGHT PANEL                 │
│                   │                                 │
│ 📍 Category       │ 📊 Selected Location Details    │
│ ├─ All Locations  │ ├─ Location Header              │
│ ├─ 📚 Academic    │ ├─ Stats (Current/Capacity)     │
│ ├─ 📖 Library     │ ├─ 6-Hour Forecast Chart       │
│ ├─ 🚍 Shuttle     │ ├─ AI Prediction               │
│ ├─ 🚪 Gates       │ └─ Alternative Locations       │
│ ├─ 🍴 Mess        │                                 │
│ └─ 🍕 Food        │                                 │
│                   │                                 │
│ 🏢 Block (SMV...)│                                 │
│ ├─ All Blocks     │                                 │
│ ├─ SMV Block      │                                 │
│ ├─ TT Block       │                                 │
│ └─ ...            │                                 │
│                   │                                 │
│ 🔴 Risk Level     │                                 │
│ ├─ All Risks      │                                 │
│ ├─ High Risk      │                                 │
│ ├─ Medium Risk    │                                 │
│ └─ Low Risk       │                                 │
│                   │                                 │
│ 📍 Locations      │                                 │
│ ├─ Location 1     │                                 │
│ ├─ Location 2     │                                 │
│ └─ ...            │                                 │
└───────────────────┴─────────────────────────────────┘
```

---

## 🚀 How to Use

### Scenario 1: Finding a Quiet Study Space

1. Click **📚 Academic Rooms** category
2. Choose your **Block** (e.g., TT Block)
3. Click on a room with **Low Risk**
4. View 6-hour forecast to pick the quietest time
5. Check **Alternative Locations** for other quiet options

### Scenario 2: Finding Food During Non-Peak Hours

1. Click **🍕 Food & Hangout** category
2. Filter by **Low Risk** to see quiet spots
3. Select a location to see when it's busiest (**Peak Time**)
4. Use suggestions to plan when to go

### Scenario 3: Predicting Congestion at Mess Hall

1. Click **🍴 Mess Halls** category
2. Select "Mess H" (or any mess)
3. View **6-Hour Forecast** to see upcoming peaks
4. Check **AI Prediction** for smart recommendations
5. Browse **Alternative Quiet Locations** in same category

---

## 📈 Data Structure

### Location Object
```typescript
{
  id: "smv_r1",
  name: "SMV_Room1",
  block: "SMV",
  category: "academic_room",
  occupancy: 35,
  capacity: 60,
  coordinates: [12.8394, 79.1323],
  status: "optimal",
  energyUsage: 15.4,
  efficiency: 82
}
```

### Prediction Object
```typescript
{
  locationId: "smv_r1",
  locationName: "SMV_Room1",
  currentCrowd: 35,
  forecasts: [
    {
      timestamp: "14:00",
      predictedCount: 42,
      confidence: 85,
      trend: "increasing",
      riskLevel: "low"
    },
    // ... 5 more hours
  ],
  peakTime: "15:00",
  recommendation: "SMV_Room1 will become moderately crowded at 3 PM..."
}
```

---

## 🔍 Filtering Logic

### Category Filter
```
All Locations
└─ Academic Rooms
   └─ Shows all 70 academic rooms across 7 blocks
└─ Library
   └─ Shows Main Library
└─ Shuttle Stops
   └─ Shows 2 shuttle stops
└─ Gates
   └─ Shows outing gates
└─ Mess Halls
   └─ Shows 8 mess locations
└─ Food & Hangout
   └─ Shows 5 food spots
```

### Block Filter (Only when Category = Academic Rooms)
```
All Blocks
└─ SMV Block (10 rooms)
└─ TT Block (10 rooms)
└─ GDN Block (10 rooms)
└─ MB Block (10 rooms)
└─ SJT Block (10 rooms)
└─ PRP Block (10 rooms)
└─ MGB Block (10 rooms)
```

### Risk Level Filter
```
All Risks
└─ High Risk (🔴 > 80% capacity)
└─ Medium Risk (🟡 50-80% capacity)
└─ Low Risk (🟢 < 50% capacity)
```

---

## 🎨 Visual Indicators

### Status Colors
```
🟢 Optimal (< 70%)  → Green UI elements
🟡 Warning (70-90%) → Amber/Yellow UI elements
🔴 Critical (> 90%) → Red UI elements
```

### Risk Badges
```
Low     → Green background: "bg-emerald-500/30"
Medium  → Amber background: "bg-amber-500/30"
High    → Red background:   "bg-red-500/30"
```

### Trend Indicators
```
↑ Increasing → Red trending line
→ Stable     → Amber horizontal line
↓ Decreasing → Green downward line
```

---

## 💡 AI Suggestions

The page displays contextual AI recommendations:

### Examples:
```
"Main Library will become crowded in 30 minutes."
"SJT Block will have lower crowd levels after 4 PM."
"Redirect traffic from Student Union to Engineering Block."
"Peak hours detected. Consider deferring non-urgent visits."
"Sports Complex is quietest right now - ideal for focused work."
```

---

## 📱 Responsive Design

### Desktop (1024px+)
- 3-column layout (filters, location list, details)
- Full location list visible
- All charts displayed

### Tablet (768px-1023px)
- 2-column layout (filters + list, details)
- Scrollable location list

### Mobile (< 768px)
- Single column layout
- Category pill buttons
- Collapsible panels

---

## 🔧 Technical Implementation

### Files Used
```
src/data/campusLocations.ts
├─ allCampusLocations[]        // 87 VIT campus locations
├─ getLocationsByCategory()     // Filter by category
├─ getLocationsByBlock()        // Filter by block
├─ getAcademicBlocks()          // Get all blocks
├─ CATEGORY_LABELS              // UI labels
└─ getCategoryIcon()            // Icons for categories

src/pages/PredictCongestion.tsx
├─ Category filtering
├─ Block filtering
├─ Risk level filtering
├─ Alternative recommendations
└─ 6-hour forecast display

src/services/predictionService.ts
├─ predictCongestionForAll()    // Generate predictions
├─ getAISuggestions()           // Smart recommendations
└─ getRealTimeAlerts()          // Alert system

src/components/ui/
├─ CongestionChart.tsx          // 6-hour forecast
├─ InsightCard.tsx              // AI recommendations
└─ GlassPanel.tsx               // Container
```

---

## 🔄 Data Flow

```
User Selects Category
         ↓
getLocationsByCategory(category)
         ↓
Filter predictions for category
         ↓
Display filtered locations in list
         ↓
User Clicks Location
         ↓
Find matching prediction object
         ↓
Display location details
├─ Current occupancy
├─ Capacity
├─ Fill percentage
├─ Peak time
├─ 6-hour forecast chart
├─ AI recommendation
└─ Alternative quiet locations
```

---

## 📊 Example Workflows

### Workflow 1: Quick Check
1. Open Predict Congestion
2. See **Risk Overview** cards (35 High, 28 Medium, 24 Low)
3. Click **📚 Academic Rooms**
4. Select a room to check 6-hour forecast
5. Done! ~30 seconds

### Workflow 2: Detailed Planning
1. Navigate to **🍴 Mess Halls**
2. Filter by **Low Risk**
3. Select "Mess M"
4. View 6-hour forecast showing peaks at 12-1 PM
5. Note: Better after 1:30 PM
6. Click alternative "Mess T" to compare
7. Decide to visit Mess T at 2 PM
8. Done! ~2 minutes

### Workflow 3: Class Finding
1. Want to study near SMV Block
2. Choose **📚 Academic Rooms**
3. Select **SMV Block**
4. See 9 rooms with Low Risk
5. Check SMV_Room3 - peaks at 3 PM
6. Better between 9-11 AM
7. Schedule study session for 10 AM
8. Done! ~1.5 minutes

---

## ✨ Enhanced Features

### Real-Time Alerts Banner
- Shows locations currently at high risk
- Displays AI recommendation for each
- Updates every 30 seconds

### Alternative Locations
- Shows up to 3 quietest locations in same category
- One-click switching to compare
- Shows current capacity percentage

### Confidence Levels
- Each prediction shows 75-90% confidence
- Loss of confidence in off-peak hours

### Trend Indicators
- Visual arrows showing direction of crowd movement
- Helps plan timing of visits

---

## 🎓 Use Cases

### For Students
- "When is the quietest time to study?"
- "Which mess has shortest queue now?"
- "Any quiet spots near my next class?"

### For Facilities Management
- "Which areas are overcrowded?"
- "Plan maintenance during low-crowd times"
- "Optimize staff allocation"

### For Event Planning
- "Which location best for group meetings?"
- "When can we close facilities for maintenance?"
- "Predict impact of events on crowd flow"

---

## 🚀 Future Enhancements

1. **Historical Trends**: Show weekly/monthly patterns
2. **Event Integration**: Factor in exam schedules, special events
3. **Notifications**: Alert when location becomes quiet
4. **Personalization**: Save favorite locations
5. **Social Features**: See where friends are
6. **Calendar Sync**: Integration with academic calendar
7. **Weather Impact**: Adjust predictions for weather
8. **Accessibility**: Routes for wheelchair access

---

## 📞 Support

### Common Questions

**Q: Why is one location showing "No Prediction"?**
A: It may be closed or data not yet available. Check back in 30 seconds.

**Q: How accurate are the predictions?**
A: 75-90% confidence based on historical patterns. More accurate during peak hours.

**Q: Can I get notifications?**
A: Currently notifications are in-page. Mobile push notifications coming soon.

**Q: What if all locations are crowded?**
A: Alternatives section shows least crowded options. Check "Quiet Hours" in block insights.

---

## 📚 Data Sources

Crowd data comes from:
- ✅ IoT sensors at each location
- ✅ Entry/exit counters
- ✅ Historical records
- ✅ Real-time simulations
- ✅ Calendar events

Updated every **30 minutes** for accuracy.

---

## 🎯 Summary

The **Predict Congestion Page** is your smart guide to navigating VIT campus efficiently. With 87 campus locations, real-time predictions, and intelligent recommendations, you can always find the right place at the right time.

**Key Benefits:**
- ⏱️ Save time finding quiet spots
- 🚨 Avoid crowded areas
- 💡 Get AI-powered recommendations
- 📍 Filter by category or block
- 📊 See 6-hour forecasts
- 🔄 Find alternatives instantly

Happy navigating! 🚀
