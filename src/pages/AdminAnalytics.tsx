import React from 'react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, Cell
} from 'recharts';
import { GlassPanel } from '../components/ui/GlassPanel';
import { 
  TrendingUp, 
  Users, 
  AlertTriangle, 
  Clock, 
  Building2, 
  Map as MapIcon,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { motion } from 'motion/react';

const peakHoursData = [
  { hour: '08:00', count: 1200 },
  { hour: '10:00', count: 4500 },
  { hour: '12:00', count: 5800 },
  { hour: '14:00', count: 4200 },
  { hour: '16:00', count: 3800 },
  { hour: '18:00', count: 2100 },
  { hour: '20:00', count: 800 },
];

const buildingCongestionData = [
  { name: 'Main Library', occupancy: 92, status: 'critical' },
  { name: 'Mess D', occupancy: 85, status: 'warning' },
  { name: 'Mess E', occupancy: 72, status: 'warning' },
  { name: 'Mess G', occupancy: 88, status: 'critical' },
  { name: 'Mess H', occupancy: 80, status: 'warning' },
  { name: 'Mess S', occupancy: 68, status: 'optimal' },
  { name: 'Mess T', occupancy: 82, status: 'warning' },
  { name: 'Mess P', occupancy: 75, status: 'warning' },
  { name: 'Mess M', occupancy: 79, status: 'warning' },
  { name: 'SMV Block', occupancy: 78, status: 'warning' },
  { name: 'TT Block', occupancy: 65, status: 'optimal' },
  { name: 'Foodys', occupancy: 45, status: 'optimal' },
];

const dailyTrendData = [
  { day: 'Mon', count: 4200 },
  { day: 'Tue', count: 4800 },
  { day: 'Wed', count: 5100 },
  { day: 'Thu', count: 4600 },
  { day: 'Fri', count: 3900 },
  { day: 'Sat', count: 1200 },
  { day: 'Sun', count: 800 },
];

const underutilizedSpaces = [
  { name: 'Shuttle Stop Main Gate', occupancy: 12, capacity: 150 },
  { name: 'Cafeteria SJT Nescafe', occupancy: 8, capacity: 80 },
  { name: 'PRP Block', occupancy: 15, capacity: 120 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/80 backdrop-blur-md border border-white/10 p-3 rounded-lg shadow-xl">
        <p className="text-xs font-bold text-white/50 mb-1">{label}</p>
        <p className="text-sm font-display font-bold text-emerald-400">
          {payload[0].value} {payload[0].name === 'occupancy' ? '%' : 'Students'}
        </p>
      </div>
    );
  }
  return null;
};

export const AdminAnalytics: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-8 pb-12"
    >
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Campus Load', value: '5,842', icon: Users, trend: '+12%', color: 'text-emerald-500' },
          { label: 'Peak Occupancy', value: '92%', icon: TrendingUp, trend: '+5%', color: 'text-blue-500' },
          { label: 'Congestion Alerts', value: '3', icon: AlertTriangle, trend: '-2', color: 'text-amber-500' },
          { label: 'Avg. Stay Time', value: '2.4h', icon: Clock, trend: '+0.2h', color: 'text-purple-500' },
        ].map((stat, i) => (
          <GlassPanel key={i} className="relative overflow-hidden group">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg bg-white/5 ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-500">
                {stat.trend.startsWith('+') ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.trend}
              </div>
            </div>
            <div>
              <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">{stat.label}</p>
              <p className="text-2xl font-display font-bold mt-1">{stat.value}</p>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <stat.icon className="w-24 h-24" />
            </div>
          </GlassPanel>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Peak Hours Chart */}
        <GlassPanel title="Peak Crowd Hours" className="lg:col-span-2">
          <div className="h-[300px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={peakHoursData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis 
                  dataKey="hour" 
                  stroke="rgba(255,255,255,0.3)" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.3)" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#10b981" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#000' }}
                  activeDot={{ r: 6, fill: '#fff', stroke: '#10b981', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassPanel>

        {/* Congested Buildings */}
        <GlassPanel title="Congestion Leaderboard">
          <div className="flex flex-col gap-6 mt-4">
            {buildingCongestionData.map((building, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-white/80">{building.name}</span>
                  <span className={`text-xs font-bold ${
                    building.status === 'critical' ? 'text-red-400' : 
                    building.status === 'warning' ? 'text-amber-400' : 'text-emerald-400'
                  }`}>
                    {building.occupancy}%
                  </span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${building.occupancy}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className={`h-full rounded-full ${
                      building.status === 'critical' ? 'bg-red-500' : 
                      building.status === 'warning' ? 'bg-amber-500' : 'bg-emerald-500'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Daily Trend Area Chart */}
        <GlassPanel title="Weekly Crowd Volume">
          <div className="h-[300px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailyTrendData}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis 
                  dataKey="day" 
                  stroke="rgba(255,255,255,0.3)" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.3)" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#3b82f6" 
                  fillOpacity={1} 
                  fill="url(#colorCount)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassPanel>

        {/* Underutilized Spaces */}
        <GlassPanel title="Underutilized Assets">
          <div className="grid grid-cols-1 gap-4 mt-4">
            {underutilizedSpaces.map((space, i) => (
              <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between group hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white/90">{space.name}</h4>
                    <p className="text-xs text-white/40">Capacity: {space.capacity} students</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-display font-bold text-blue-400">{space.occupancy}</p>
                  <p className="text-[10px] text-white/30 uppercase font-bold tracking-tighter">Current Load</p>
                </div>
              </div>
            ))}
            <button className="mt-2 w-full py-3 rounded-xl border border-dashed border-white/10 text-xs font-bold text-white/40 hover:text-white hover:border-white/30 transition-all">
              VIEW ALL ASSETS
            </button>
          </div>
        </GlassPanel>
      </div>

      {/* Crowd Distribution Heatmap (Simulated) */}
      <GlassPanel title="Campus Distribution Heatmap">
        <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-2 mt-4">
          {Array.from({ length: 48 }).map((_, i) => {
            const intensity = Math.random();
            return (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.01 }}
                className="aspect-square rounded-sm relative group"
                style={{
                  backgroundColor: intensity > 0.8 ? 'rgba(239, 68, 68, 0.6)' :
                                   intensity > 0.5 ? 'rgba(245, 158, 11, 0.6)' :
                                   intensity > 0.2 ? 'rgba(16, 185, 129, 0.6)' : 'rgba(59, 130, 246, 0.4)'
                }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-white/20 flex items-center justify-center text-[8px] font-bold pointer-events-none">
                  {Math.floor(intensity * 100)}%
                </div>
              </motion.div>
            );
          })}
        </div>
        <div className="flex items-center justify-end gap-4 mt-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-blue-500/40" />
            <span className="text-[10px] text-white/40 font-bold uppercase">Low</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-emerald-500/60" />
            <span className="text-[10px] text-white/40 font-bold uppercase">Optimal</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-amber-500/60" />
            <span className="text-[10px] text-white/40 font-bold uppercase">High</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-red-500/60" />
            <span className="text-[10px] text-white/40 font-bold uppercase">Peak</span>
          </div>
        </div>
      </GlassPanel>
    </motion.div>
  );
};
