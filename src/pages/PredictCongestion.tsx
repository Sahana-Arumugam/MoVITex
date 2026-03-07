import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  TrendingUp,
  AlertCircle,
  Zap,
  Filter,
  BarChart3,
  X,
} from 'lucide-react';
import { GlassPanel } from '../components/ui/GlassPanel';
import { CongestionChart } from '../components/ui/CongestionChart';
import { InsightCard } from '../components/ui/InsightCard';
import { useCrowdSimulation } from '../hooks/useCrowdSimulation';
import {
  predictCongestionForAll,
  getAISuggestions,
  getRealTimeAlerts,
} from '../services/predictionService';
import {
  allCampusLocations,
  getLocationsByCategory,
  getAcademicBlocks,
  CATEGORY_LABELS,
} from '../data/campusLocations';
import type { LocationCategory } from '../types';

export const PredictCongestion: React.FC = () => {
  // Use campus locations instead of general buildings
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null);
  const [filterRisk, setFilterRisk] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [selectedCategory, setSelectedCategory] = useState<LocationCategory | 'all'>('all');
  const [selectedBlock, setSelectedBlock] = useState<string | 'all'>('all');
  
  // Get academic blocks for filtering
  const academicBlocks = useMemo(() => {
    return getAcademicBlocks();
  }, []);

  // Generate predictions using campus locations
  const predictions = useMemo(() => {
    return predictCongestionForAll(allCampusLocations);
  }, []);

  // Filter by risk level and category
  const filteredPredictions = useMemo(() => {
    let filtered = predictions;

    // Filter by risk level
    if (filterRisk !== 'all') {
      filtered = filtered.filter((p) => {
        const forecast = p.forecasts[0];
        return forecast.riskLevel === filterRisk;
      });
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      const categoryLocations = getLocationsByCategory(selectedCategory);
      const categoryIds = new Set(categoryLocations.map((loc) => loc.id));
      filtered = filtered.filter((p) =>
        categoryIds.has(p.locationId)
      );
    }

    // Filter by block (for academic rooms)
    if (selectedBlock !== 'all') {
      const blockLocations = allCampusLocations.filter(
        (loc) => loc.block === selectedBlock
      );
      const blockIds = new Set(blockLocations.map((loc) => loc.id));
      filtered = filtered.filter((p) =>
        blockIds.has(p.locationId)
      );
    }

    return filtered;
  }, [predictions, filterRisk, selectedCategory, selectedBlock]);

  // Get selected location data
  const selectedPrediction = useMemo(() => {
    if (!selectedBuilding) return null;
    return predictions.find((p) => p.locationId === selectedBuilding);
  }, [selectedBuilding, predictions]);

  const selectedLocation = useMemo(() => {
    if (!selectedBuilding) return null;
    return allCampusLocations.find((loc) => loc.id === selectedBuilding);
  }, [selectedBuilding]);

  // Get AI suggestions and alerts
  const suggestions = useMemo(() => {
    return getAISuggestions(allCampusLocations);
  }, []);

  const alerts = useMemo(() => {
    return getRealTimeAlerts(allCampusLocations);
  }, []);

  // High risk locations with recommendations
  const highRiskLocations = useMemo(() => {
    return predictions
      .filter((p) => p.forecasts[0].riskLevel === 'high')
      .slice(0, 5);
  }, [predictions]);

  // Count predictions by risk level
  const riskStats = useMemo(() => {
    return {
      high: predictions.filter((p) => p.forecasts[0].riskLevel === 'high').length,
      medium: predictions.filter((p) => p.forecasts[0].riskLevel === 'medium').length,
      low: predictions.filter((p) => p.forecasts[0].riskLevel === 'low').length,
    };
  }, [predictions]);

  // Get alternatives - quiet locations when high risk
  const getAlternativeLocations = () => {
    if (!selectedLocation) return [];
    
    // Find locations in same category but with low risk
    const sameCategoryLocations = allCampusLocations.filter(
      (loc) => loc.category === selectedLocation.category && loc.id !== selectedLocation.id
    );

    return predictions
      .filter((p) =>
        sameCategoryLocations.some((loc) => loc.id === p.locationId) &&
        p.forecasts[0].riskLevel === 'low'
      )
      .slice(0, 3);
  };

  const alternatives = useMemo(
    () => getAlternativeLocations(),
    [selectedLocation, predictions]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-8"
    >
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-display font-bold text-white tracking-tight">
          Predict <span className="text-emerald-500">Congestion</span>
        </h1>
        <p className="text-white/40 text-sm">
          AI-powered forecast of campus crowd levels using real-time sensors and historical data.
        </p>
      </div>

      {/* High Risk Alert Banner */}
      {highRiskLocations.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-5 border-red-500/30 bg-red-500/5"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-bold text-white mb-2">
                ⚠️ {highRiskLocations.length} Location{highRiskLocations.length !== 1 ? 's' : ''} Currently at High Risk
              </h3>
              <div className="space-y-1">
                {highRiskLocations.map((loc) => (
                  <p key={loc.locationId} className="text-sm text-red-200">
                    • {loc.locationName} - {loc.recommendation}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Risk Overview Cards */}
      <div className="grid grid-cols-3 gap-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="glass-card p-6 border-red-500/20 bg-red-500/5 cursor-pointer hover:border-red-500/40 transition-all"
          onClick={() => setFilterRisk(filterRisk === 'high' ? 'all' : 'high')}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-white/60 uppercase tracking-wider">
              High Risk
            </span>
            <AlertCircle className="w-5 h-5 text-red-500" />
          </div>
          <p className="text-3xl font-display font-bold text-red-400">
            {riskStats.high}
          </p>
          <p className="text-xs text-white/40 mt-1">locations</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="glass-card p-6 border-amber-500/20 bg-amber-500/5 cursor-pointer hover:border-amber-500/40 transition-all"
          onClick={() => setFilterRisk(filterRisk === 'medium' ? 'all' : 'medium')}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-white/60 uppercase tracking-wider">
              Medium Risk
            </span>
            <TrendingUp className="w-5 h-5 text-amber-500" />
          </div>
          <p className="text-3xl font-display font-bold text-amber-400">
            {riskStats.medium}
          </p>
          <p className="text-xs text-white/40 mt-1">locations</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="glass-card p-6 border-emerald-500/20 bg-emerald-500/5 cursor-pointer hover:border-emerald-500/40 transition-all"
          onClick={() => setFilterRisk(filterRisk === 'low' ? 'all' : 'low')}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-white/60 uppercase tracking-wider">
              Low Risk
            </span>
            <Zap className="w-5 h-5 text-emerald-500" />
          </div>
          <p className="text-3xl font-display font-bold text-emerald-400">
            {riskStats.low}
          </p>
          <p className="text-xs text-white/40 mt-1">locations</p>
        </motion.div>
      </div>

      {/* AI Suggestions */}
      {suggestions.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-white/60 uppercase tracking-wider">
              🤖 AI Suggestions for Optimal Movement
            </span>
            <Zap className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {suggestions.map((suggestion, idx) => (
              <InsightCard
                key={idx}
                title="Smart Recommendation"
                insight={suggestion}
                type="suggestion"
              />
            ))}
          </div>
        </div>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Filters and Location List */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <GlassPanel
            title="Filters & Locations"
            className="flex flex-col h-full"
          >
            {/* Category Filter */}
            <div className="space-y-3 mb-4 pb-4 border-b border-white/5">
              <h4 className="text-xs font-bold text-white/60 uppercase tracking-wider">
                📍 Category
              </h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedBlock('all');
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                    selectedCategory === 'all'
                      ? 'bg-emerald-500/30 text-emerald-300'
                      : 'bg-white/5 text-white/40 hover:bg-white/10'
                  }`}
                >
                  All Locations
                </button>
                {Object.entries(CATEGORY_LABELS).map(([category, label]) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category as LocationCategory);
                      setSelectedBlock('all');
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                      selectedCategory === category
                        ? 'bg-emerald-500/30 text-emerald-300'
                        : 'bg-white/5 text-white/40 hover:bg-white/10'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Block Filter (only for academic rooms) */}
            {selectedCategory === 'academic_room' && (
              <div className="space-y-3 mb-4 pb-4 border-b border-white/5">
                <h4 className="text-xs font-bold text-white/60 uppercase tracking-wider">
                  🏢 Block
                </h4>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  <button
                    onClick={() => setSelectedBlock('all')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                      selectedBlock === 'all'
                        ? 'bg-blue-500/30 text-blue-300'
                        : 'bg-white/5 text-white/40 hover:bg-white/10'
                    }`}
                  >
                    All Blocks
                  </button>
                  {academicBlocks.map((block) => (
                    <button
                      key={block}
                      onClick={() => setSelectedBlock(block)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                        selectedBlock === block
                          ? 'bg-blue-500/30 text-blue-300'
                          : 'bg-white/5 text-white/40 hover:bg-white/10'
                      }`}
                    >
                      {block} Block
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Risk Filter */}
            <div className="space-y-3 mb-4">
              <h4 className="text-xs font-bold text-white/60 uppercase tracking-wider flex items-center gap-2">
                <Filter className="w-3 h-3" />
                Risk Level
              </h4>
              <div className="space-y-2">
                {(['all', 'high', 'medium', 'low'] as const).map((risk) => (
                  <button
                    key={risk}
                    onClick={() => setFilterRisk(risk)}
                    className={`w-full py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                      filterRisk === risk
                        ? 'bg-white/20 text-white'
                        : 'bg-white/5 text-white/40 hover:bg-white/10'
                    }`}
                  >
                    {risk === 'all' ? 'All Risks' : `${risk.charAt(0).toUpperCase() + risk.slice(1)} Risk`}
                  </button>
                ))}
              </div>
            </div>

            {/* Locations List */}
            <div className="mt-4 pt-4 border-t border-white/5">
              <h4 className="text-xs font-bold text-white/60 uppercase tracking-wider mb-3">
                Locations ({filteredPredictions.length})
              </h4>
              <div className="flex-1 overflow-y-auto max-h-64 space-y-2">
                {filteredPredictions.length > 0 ? (
                  filteredPredictions.map((prediction) => {
                    const isSelected =
                      selectedBuilding === prediction.locationId;
                    const forecast = prediction.forecasts[0];

                    return (
                      <motion.button
                        key={prediction.locationId}
                        whileHover={{ scale: 1.02, x: 5 }}
                        onClick={() =>
                          setSelectedBuilding(prediction.locationId)
                        }
                        className={`w-full glass-card p-3 flex items-center justify-between text-left transition-all ${
                          isSelected
                            ? 'border-emerald-500/50 bg-emerald-500/10'
                            : 'border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-white truncate">
                            {prediction.locationName}
                          </p>
                          <p className="text-[10px] text-white/40 truncate">
                            {prediction.currentCrowd} / {
                              allCampusLocations.find(
                                (b) => b.id === prediction.locationId
                              )?.capacity
                            }
                          </p>
                        </div>
                        <div
                          className={`px-2 py-1 rounded text-[10px] font-bold shrink-0 ${
                            forecast.riskLevel === 'high'
                              ? 'bg-red-500/30 text-red-300'
                              : forecast.riskLevel === 'medium'
                                ? 'bg-amber-500/30 text-amber-300'
                                : 'bg-emerald-500/30 text-emerald-300'
                          }`}
                        >
                          {forecast.riskLevel}
                        </div>
                      </motion.button>
                    );
                  })
                ) : (
                  <p className="text-xs text-white/40 text-center py-4">
                    No locations match your filters
                  </p>
                )}
              </div>
            </div>
          </GlassPanel>
        </motion.div>

        {/* Right Panel - Selected Location Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2"
        >
          <AnimatePresence mode="wait">
            {selectedPrediction && selectedLocation ? (
              <motion.div
                key={selectedBuilding}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <GlassPanel className="flex flex-col gap-6 h-full">
                  {/* Location Header */}
                  <div className="border-b border-white/5 pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h2 className="text-2xl font-bold text-white mb-1">
                          {selectedPrediction.locationName}
                        </h2>
                        {selectedLocation.block && (
                          <p className="text-xs text-white/50">
                            {selectedLocation.block} • {selectedLocation.category}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => setSelectedBuilding(null)}
                        className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-all"
                      >
                        <X className="w-4 h-4 text-white/60" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div>
                        <p className="text-xs text-white/60 mb-1">Current</p>
                        <p className="text-lg font-bold text-white">
                          {selectedPrediction.currentCrowd}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-white/60 mb-1">Capacity</p>
                        <p className="text-lg font-bold text-white">
                          {selectedLocation.capacity}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-white/60 mb-1">Fill %</p>
                        <p
                          className={`text-lg font-bold ${
                            (selectedPrediction.currentCrowd /
                              selectedLocation.capacity) *
                              100 >
                            80
                              ? 'text-red-400'
                              : (selectedPrediction.currentCrowd /
                                  selectedLocation.capacity) *
                                  100 >
                                50
                                ? 'text-amber-400'
                                : 'text-emerald-400'
                          }`}
                        >
                          {Math.round(
                            (selectedPrediction.currentCrowd /
                              selectedLocation.capacity) *
                              100
                          )}
                          %
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-white/60 mb-1">Peak Time</p>
                        <p className="text-lg font-bold text-emerald-500">
                          {selectedPrediction.peakTime}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 6-Hour Forecast Chart */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <BarChart3 className="w-4 h-4 text-emerald-500" />
                      <h3 className="text-sm font-bold text-white">
                        Next 6 Hours Forecast
                      </h3>
                    </div>
                    <CongestionChart data={selectedPrediction.forecasts} />
                  </div>

                  {/* Recommendation */}
                  <InsightCard
                    title="AI Prediction"
                    insight={selectedPrediction.recommendation || 'Loading recommendation...'}
                    type="suggestion"
                  />

                  {/* Alternative Quiet Locations */}
                  {alternatives.length > 0 && (
                    <div className="space-y-3 pt-4 border-t border-white/5">
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        💡 Alternative Quiet Locations
                      </h4>
                      <div className="space-y-2">
                        {alternatives.map((alt) => (
                          <motion.button
                            key={alt.locationId}
                            whileHover={{ x: 5 }}
                            onClick={() => setSelectedBuilding(alt.locationId)}
                            className="w-full text-left glass-card p-3 border-emerald-500/20 bg-emerald-500/5 hover:border-emerald-500/40 transition-all"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-bold text-emerald-300">
                                  {alt.locationName}
                                </p>
                                <p className="text-xs text-white/50">
                                  {Math.round(
                                    (alt.currentCrowd / 
                                      (allCampusLocations.find(
                                        (l) => l.id === alt.locationId
                                      )?.capacity || 1)) *
                                      100
                                  )}
                                  % capacity
                                </p>
                              </div>
                              <span className="text-xs font-bold px-2 py-1 rounded bg-emerald-500/30 text-emerald-300">
                                ✓ Low Risk
                              </span>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}
                </GlassPanel>
              </motion.div>
            ) : (
              <GlassPanel className="flex items-center justify-center min-h-96">
                <div className="text-center">
                  <p className="text-white/40 mb-2">
                    Select a location to view detailed predictions
                  </p>
                  <p className="text-xs text-white/30">
                    Or filter by category to get started
                  </p>
                </div>
              </GlassPanel>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};
