import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Clock, Star, MapPin, TrendingDown } from 'lucide-react';
import { GlassPanel } from '../components/ui/GlassPanel';
import { TimeSlotCard } from '../components/ui/TimeSlotCard';
import { InsightCard } from '../components/ui/InsightCard';
import { useCrowdSimulation } from '../hooks/useCrowdSimulation';
import {
  getBestTimeSlots,
  getHistoricalPatterns,
  getBlockInsights,
} from '../services/predictionService';

export const BestTimeToVisit: React.FC = () => {
  const { buildings } = useCrowdSimulation(5000);
  const [selectedLocationId, setSelectedLocationId] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  // Initialize with first building
  React.useEffect(() => {
    if (buildings.length > 0 && !selectedLocationId) {
      setSelectedLocationId(buildings[0].id);
    }
  }, [buildings, selectedLocationId]);

  // Get time slots for selected location
  const timeSlots = useMemo(() => {
    if (!selectedLocationId) return null;
    const location = buildings.find((b) => b.id === selectedLocationId);
    if (!location) return null;
    return getBestTimeSlots(location);
  }, [selectedLocationId, buildings]);

  // Get historical patterns
  const patterns = useMemo(() => {
    if (!selectedLocationId) return [];
    const location = buildings.find((b) => b.id === selectedLocationId);
    if (!location) return [];
    return getHistoricalPatterns(location);
  }, [selectedLocationId, buildings]);

  // Get block insights
  const blockInsights = useMemo(() => {
    return getBlockInsights();
  }, []);

  // Find best time slot
  const bestTimeSlot = useMemo(() => {
    if (!timeSlots) return null;
    return timeSlots.timeSlots.reduce((best, current) =>
      current.suitability === 'excellent' ||
      (best.suitability !== 'excellent' && current.expectedCrowd < best.expectedCrowd)
        ? current
        : best
    );
  }, [timeSlots]);

  // Excellent and good time slots
  const excellentSlots = useMemo(() => {
    if (!timeSlots) return [];
    return timeSlots.timeSlots.filter((s) => s.suitability === 'excellent');
  }, [timeSlots]);

  const goodSlots = useMemo(() => {
    if (!timeSlots) return [];
    return timeSlots.timeSlots.filter((s) => s.suitability === 'good');
  }, [timeSlots]);

  const selectedLocation = buildings.find((b) => b.id === selectedLocationId);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-8"
    >
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-display font-bold text-white tracking-tight">
          Best Time to <span className="text-emerald-500">Visit</span>
        </h1>
        <p className="text-white/40 text-sm">
          Discover the least crowded times to visit any campus location.
        </p>
      </div>

      {/* Location Selector */}
      <GlassPanel title="Select Location">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {buildings.map((building) => (
            <motion.button
              key={building.id}
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                setSelectedLocationId(building.id);
                setSelectedTime('');
              }}
              className={`p-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                selectedLocationId === building.id
                  ? 'bg-emerald-500 text-black'
                  : 'bg-white/10 text-white hover:bg-white/15'
              }`}
            >
              {building.name.split(' ').slice(0, 2).join(' ')}
            </motion.button>
          ))}
        </div>
      </GlassPanel>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Sidebar - Summary and Insights */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1 flex flex-col gap-6"
        >
          {/* Best Time Summary */}
          {bestTimeSlot && selectedLocation && (
            <GlassPanel className="border-emerald-500/30 bg-emerald-500/5">
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-5 h-5 text-emerald-500" />
                <span className="text-xs font-bold text-white/60 uppercase tracking-wider">
                  Recommended Time
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-bold text-white mb-1">
                    {selectedLocation.name}
                  </p>
                  <p className="text-2xl font-display font-bold text-emerald-500">
                    {bestTimeSlot.startTime} - {bestTimeSlot.endTime}
                  </p>
                </div>

                <div className="space-y-2 pt-4 border-t border-white/10">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-white/60">Expected Crowd</span>
                    <span className="text-sm font-bold text-white">
                      {bestTimeSlot.expectedCrowd} people
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-white/60">Capacity</span>
                    <span className="text-sm font-bold text-emerald-400">
                      {bestTimeSlot.crowdPercentage}%
                    </span>
                  </div>
                </div>

                <button className="w-full mt-4 py-2 px-4 rounded-lg bg-emerald-500 text-black font-bold uppercase tracking-wider text-xs hover:bg-emerald-400 transition-all">
                  Set Reminder
                </button>
              </div>
            </GlassPanel>
          )}

          {/* Statistics */}
          <GlassPanel title="Today's Summary">
            <div className="space-y-3">
              <div>
                <p className="text-xs text-white/60 mb-2">Excellent Slots</p>
                <p className="text-2xl font-display font-bold text-emerald-500">
                  {excellentSlots.length}
                </p>
              </div>
              <div>
                <p className="text-xs text-white/60 mb-2">Good Slots</p>
                <p className="text-2xl font-display font-bold text-blue-500">
                  {goodSlots.length}
                </p>
              </div>
              {selectedLocation && (
                <div className="pt-3 border-t border-white/10">
                  <p className="text-xs text-white/60 mb-2">Current Status</p>
                  <p className="text-sm font-bold text-white flex items-center gap-2">
                    <span
                      className={`inline-block w-2 h-2 rounded-full ${
                        selectedLocation.status === 'optimal'
                          ? 'bg-emerald-500'
                          : selectedLocation.status === 'warning'
                            ? 'bg-amber-500'
                            : 'bg-red-500'
                      }`}
                    />
                    {selectedLocation.status.charAt(0).toUpperCase() +
                      selectedLocation.status.slice(1)}
                  </p>
                </div>
              )}
            </div>
          </GlassPanel>

          {/* Block Insights */}
          <GlassPanel title="Campus Insights">
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {blockInsights.slice(0, 3).map((insight, idx) => (
                <div key={idx} className="glass-card p-3">
                  <p className="text-xs font-bold text-white mb-1">
                    {insight.blockName}
                  </p>
                  <p className="text-[10px] text-white/50 leading-relaxed">
                    {insight.recommendation}
                  </p>
                </div>
              ))}
            </div>
          </GlassPanel>
        </motion.div>

        {/* Right Content - Time Slots and Patterns */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 flex flex-col gap-6"
        >
          {/* Time Slots */}
          {timeSlots && (
            <div className="space-y-4">
              <div fluid-direction="col" className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-emerald-500" />
                <h2 className="text-lg font-bold text-white">Available Time Slots</h2>
              </div>

              {/* Filter by suitability */}
              <div className="space-y-4">
                {excellentSlots.length > 0 && (
                  <div className="space-y-3">
                    <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                      ⭐ Excellent - Least Crowded
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {excellentSlots.slice(0, 6).map((slot, idx) => (
                        <TimeSlotCard
                          key={idx}
                          {...slot}
                          isSelected={selectedTime === slot.startTime}
                          onSelect={() => setSelectedTime(slot.startTime)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {goodSlots.length > 0 && (
                  <div className="space-y-3">
                    <p className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                      🌟 Good - Moderately Quiet
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {goodSlots.slice(0, 4).map((slot, idx) => (
                        <TimeSlotCard
                          key={idx}
                          {...slot}
                          isSelected={selectedTime === slot.startTime}
                          onSelect={() => setSelectedTime(slot.startTime)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {excellentSlots.length === 0 && goodSlots.length === 0 && (
                  <InsightCard
                    title="No Ideal Times"
                    insight="Expected to be crowded throughout the day. Consider visiting tomorrow in the early morning."
                    type="warning"
                  />
                )}
              </div>
            </div>
          )}

          {/* Historical Heatmap */}
          {patterns.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-blue-500" />
                <h2 className="text-lg font-bold text-white">Historical Patterns</h2>
              </div>

              <GlassPanel>
                <div className="grid grid-cols-12 gap-1 mb-4">
                  {patterns.map((pattern, idx) => {
                    const bgColor =
                      pattern.crowdLevel === 'low'
                        ? 'bg-emerald-500/60'
                        : pattern.crowdLevel === 'moderate'
                          ? 'bg-amber-500/60'
                          : 'bg-red-500/60';

                    return (
                      <div
                        key={idx}
                        className={`${bgColor} rounded h-8 flex items-center justify-center text-[9px] font-bold text-white/70 hover:text-white transition-all cursor-pointer group relative`}
                        title={`${pattern.hour}:00 - ${pattern.crowdLevel} (avg: ${pattern.avgCrowd})`}
                      >
                        {pattern.hour % 4 === 0 ? pattern.hour : ''}
                        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black/90 px-2 py-1 rounded text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                          {pattern.hour}:00 - {pattern.avgCrowd} avg
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex flex-wrap gap-4 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-emerald-500" />
                    <span className="text-white/60">Low Crowd</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-amber-500" />
                    <span className="text-white/60">Moderate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-red-500" />
                    <span className="text-white/60">High Crowd</span>
                  </div>
                </div>
              </GlassPanel>
            </div>
          )}

          {/* Selected Time Details */}
          {selectedTime && bestTimeSlot && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <InsightCard
                title="Visit Details"
                insight={`Perfect time to visit ${selectedLocation?.name}! With only ${bestTimeSlot.expectedCrowd} people expected, you'll have a peaceful experience.`}
                type="positive"
                details={[
                  `Travel time will be unimpeded`,
                  `Library and study areas will be quiet`,
                  `Less waiting time at services`,
                ]}
                action={{
                  label: 'Add to Calendar',
                  onClick: () => alert('Reminder set!'),
                }}
              />
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};
