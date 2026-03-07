import React, { useMemo } from 'react';
import { GlassPanel } from '../components/ui/GlassPanel';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  Users, 
  Zap, 
  Layout, 
  CheckCircle2, 
  ArrowUpRight, 
  Info,
  Activity,
  Target
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';

// Mock data for trend chart
const trendData = [
  { time: '08:00', score: 72 },
  { time: '10:00', score: 78 },
  { time: '12:00', score: 84 },
  { time: '14:00', score: 81 },
  { time: '16:00', score: 86 },
  { time: '18:00', score: 89 },
  { time: '20:00', score: 87 },
];

const efficiencyMetrics = [
  { 
    id: 'congestion', 
    label: 'Congestion Reduction', 
    value: 94, 
    icon: Users, 
    color: 'text-emerald-400', 
    bg: 'bg-emerald-400/10',
    desc: 'Effectiveness of crowd redirection' 
  },
  { 
    id: 'balance', 
    label: 'Distribution Balance', 
    value: 82, 
    icon: Target, 
    color: 'text-blue-400', 
    bg: 'bg-blue-400/10',
    desc: 'Evenness of campus load' 
  },
  { 
    id: 'utilization', 
    label: 'Building Utilization', 
    value: 78, 
    icon: Layout, 
    color: 'text-purple-400', 
    bg: 'bg-purple-400/10',
    desc: 'Space usage optimization' 
  },
  { 
    id: 'energy', 
    label: 'Energy Efficiency', 
    value: 88, 
    icon: Zap, 
    color: 'text-yellow-400', 
    bg: 'bg-yellow-400/10',
    desc: 'Power usage vs occupancy' 
  },
];

const campusScore = Math.round(
  efficiencyMetrics.reduce((acc, m) => acc + m.value, 0) / efficiencyMetrics.length
);

export const QualityScore: React.FC = () => {
  const radarData = useMemo(() => efficiencyMetrics.map(m => ({
    subject: m.label.split(' ')[0],
    A: m.value,
    fullMark: 100,
  })), []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-8 pb-12"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Score Indicator */}
        <GlassPanel className="lg:col-span-1 flex flex-col items-center justify-center py-12 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500" />
          
          <div className="relative w-56 h-56 flex items-center justify-center">
            {/* Background Ring */}
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="112"
                cy="112"
                r="100"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-white/5"
              />
              {/* Animated Progress Ring */}
              <motion.circle
                cx="112"
                cy="112"
                r="100"
                stroke="currentColor"
                strokeWidth="10"
                fill="transparent"
                strokeDasharray={628.3}
                initial={{ strokeDashoffset: 628.3 }}
                animate={{ strokeDashoffset: 628.3 - (628.3 * campusScore / 100) }}
                transition={{ duration: 2, ease: "circOut" }}
                className="text-emerald-500"
                strokeLinecap="round"
              />
            </svg>
            
            {/* Score Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-6xl font-display font-bold text-white"
              >
                {campusScore}
              </motion.span>
              <span className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold mt-1">Efficiency Index</span>
            </div>

            {/* Decorative Pulse */}
            <motion.div 
              animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute inset-0 rounded-full bg-emerald-500/10 -z-10"
            />
          </div>

          <div className="mt-10 flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider">+12.4% vs Last Week</span>
            </div>
            <p className="text-xs text-white/40 mt-2 font-medium">Campus Quality Score: <span className="text-white">{campusScore}/100</span></p>
          </div>
        </GlassPanel>

        {/* Efficiency Trend Chart */}
        <GlassPanel title="Efficiency Performance Trend" className="lg:col-span-2">
          <div className="h-[350px] mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis 
                  dataKey="time" 
                  stroke="rgba(255,255,255,0.3)" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                  dy={10}
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.3)" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                  domain={[60, 100]}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: '#10b981', fontSize: '12px', fontWeight: 'bold' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#scoreGradient)" 
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassPanel>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Radar Chart Breakdown */}
        <GlassPanel title="Efficiency Breakdown" className="lg:col-span-1">
          <div className="h-[300px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="Efficiency"
                  dataKey="A"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </GlassPanel>

        {/* Key Metrics Summary - Adjusted to 2 columns */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {efficiencyMetrics.map((metric, i) => (
            <GlassPanel key={metric.id} className="group hover:bg-white/5 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-2.5 rounded-xl ${metric.bg} ${metric.color}`}>
                  <metric.icon className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-400">
                  <ArrowUpRight className="w-3 h-3" />
                  <span>{Math.floor(Math.random() * 5) + 2}%</span>
                </div>
              </div>
              <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-1">{metric.label}</h4>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-display font-bold text-white">{metric.value}%</span>
                <span className="text-[10px] text-white/20 font-bold">OPTIMAL</span>
              </div>
              <p className="text-[10px] text-white/30 mt-3 leading-relaxed">{metric.desc}</p>
              
              <div className="mt-4 w-full bg-white/5 h-1 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${metric.value}%` }}
                  transition={{ duration: 1.5, delay: 0.5 + (i * 0.1) }}
                  className={`h-full ${metric.color.replace('text', 'bg')}`}
                />
              </div>
            </GlassPanel>
          ))}
        </div>
      </div>

      {/* AI Strategy Insights */}
      <GlassPanel title="Efficiency Optimization Strategy">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {[
            { 
              title: 'Load Balancing', 
              impact: 'High', 
              action: 'Redistribute 150 students from Main Library to SMV Block.',
              icon: Activity
            },
            { 
              title: 'Energy Harvest', 
              impact: 'Medium', 
              action: 'Solar tracking optimized for 14:00 peak intensity.',
              icon: Zap
            },
            { 
              title: 'Space Recovery', 
              impact: 'High', 
              action: 'Unused lab space in TT Block converted to study zone.',
              icon: Layout
            },
          ].map((strategy, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.02 }}
              className="p-5 rounded-2xl bg-white/5 border border-white/5 flex flex-col gap-4"
            >
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-emerald-500/10">
                  <strategy.icon className="w-4 h-4 text-emerald-500" />
                </div>
                <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full uppercase tracking-widest">
                  {strategy.impact} Impact
                </span>
              </div>
              <div>
                <h5 className="text-sm font-bold text-white/90">{strategy.title}</h5>
                <p className="text-xs text-white/40 mt-2 leading-relaxed">{strategy.action}</p>
              </div>
              <button className="mt-auto flex items-center gap-2 text-[10px] font-bold text-emerald-500 uppercase tracking-widest hover:gap-3 transition-all">
                Implement Strategy <ArrowUpRight className="w-3 h-3" />
              </button>
            </motion.div>
          ))}
        </div>
      </GlassPanel>
    </motion.div>
  );
};
