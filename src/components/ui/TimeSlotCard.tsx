import React from 'react';
import { Clock, Users, Star } from 'lucide-react';
import { motion } from 'motion/react';

interface TimeSlotCardProps {
  startTime: string;
  endTime: string;
  expectedCrowd: number;
  crowdPercentage: number;
  suitability: 'excellent' | 'good' | 'fair' | 'poor';
  onSelect?: () => void;
  isSelected?: boolean;
}

export const TimeSlotCard: React.FC<TimeSlotCardProps> = ({
  startTime,
  endTime,
  expectedCrowd,
  crowdPercentage,
  suitability,
  onSelect,
  isSelected = false,
}) => {
  const getSuitabilityStyle = (suit: string) => {
    switch (suit) {
      case 'excellent':
        return {
          bg: 'bg-emerald-500/15 border-emerald-500/30 hover:border-emerald-500/50',
          text: 'text-emerald-400',
          badge: 'bg-emerald-500/30 text-emerald-300',
          icon: '★★★★★',
        };
      case 'good':
        return {
          bg: 'bg-blue-500/15 border-blue-500/30 hover:border-blue-500/50',
          text: 'text-blue-400',
          badge: 'bg-blue-500/30 text-blue-300',
          icon: '★★★★☆',
        };
      case 'fair':
        return {
          bg: 'bg-amber-500/15 border-amber-500/30 hover:border-amber-500/50',
          text: 'text-amber-400',
          badge: 'bg-amber-500/30 text-amber-300',
          icon: '★★★☆☆',
        };
      case 'poor':
        return {
          bg: 'bg-red-500/15 border-red-500/30 hover:border-red-500/50',
          text: 'text-red-400',
          badge: 'bg-red-500/30 text-red-300',
          icon: '★★☆☆☆',
        };
      default:
        return {
          bg: 'bg-white/5 border-white/10',
          text: 'text-white',
          badge: 'bg-white/10 text-white',
          icon: '★☆☆☆☆',
        };
    }
  };

  const style = getSuitabilityStyle(suitability);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      onClick={onSelect}
      className={`glass-card p-5 border-2 transition-all cursor-pointer ${style.bg} ${
        isSelected ? 'ring-2 ring-white/30' : ''
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-white/60" />
          <span className="text-sm font-bold text-white">
            {startTime} - {endTime}
          </span>
        </div>
        <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${style.badge}`}>
          {suitability}
        </span>
      </div>

      <div className="space-y-3">
        {/* Crowd info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-white/60">
            <Users className="w-4 h-4" />
            <span className="text-sm">Expected Crowd</span>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-white">{expectedCrowd}</p>
            <p className={`text-xs font-bold ${style.text}`}>
              {crowdPercentage}% capacity
            </p>
          </div>
        </div>

        {/* Crowd level bar */}
        <div className="flex items-center gap-2">
          <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${crowdPercentage}%` }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className={`h-full rounded-full ${
                crowdPercentage < 30
                  ? 'bg-emerald-500'
                  : crowdPercentage < 60
                    ? 'bg-amber-500'
                    : 'bg-red-500'
              }`}
            />
          </div>
          <span className="text-xs text-white/40 whitespace-nowrap">{crowdPercentage}%</span>
        </div>

        {/* Rating */}
        <div className="flex items-center justify-between pt-2 border-t border-white/5">
          <span className="text-xs text-white/40">Suitability Rating</span>
          <span className={`text-lg font-bold ${style.text}`}>{style.icon}</span>
        </div>
      </div>

      {/* Select indicator */}
      {isSelected && (
        <div className="absolute top-2 right-2">
          <div className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500">
            <span className="text-xs text-black font-bold">✓</span>
          </div>
        </div>
      )}
    </motion.div>
  );
};
