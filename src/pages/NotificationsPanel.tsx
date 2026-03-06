import React from 'react';
import { motion } from 'motion/react';
import { Bell, AlertTriangle, Info, CheckCircle2, Clock, Users, Zap } from 'lucide-react';
import { GlassPanel } from '../components/ui/GlassPanel';

const notifications = [
  {
    id: '1',
    type: 'alert',
    title: 'High Congestion: Student Union',
    message: 'The Student Union is currently at 95% capacity. Expect delays in the cafeteria area.',
    time: '2 mins ago',
    icon: AlertTriangle,
    color: 'text-red-400',
    bg: 'bg-red-400/10',
    border: 'border-red-400/20',
  },
  {
    id: '2',
    type: 'info',
    title: 'Quiet Study Spot Found',
    message: 'Science Block A, Room 302 is currently empty. Perfect for focused study.',
    time: '15 mins ago',
    icon: Info,
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
    border: 'border-blue-400/20',
  },
  {
    id: '3',
    type: 'success',
    title: 'Route Optimization Active',
    message: 'New detour route via North Gardens is now 40% faster than the main corridor.',
    time: '1 hour ago',
    icon: Zap,
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
    border: 'border-emerald-400/20',
  },
  {
    id: '4',
    type: 'info',
    title: 'Campus Event: Career Fair',
    message: 'Career Fair starting at the Main Auditorium. Expect high crowd density in the area.',
    time: '3 hours ago',
    icon: Users,
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
    border: 'border-purple-400/20',
  },
];

export const NotificationsPanel: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-8 max-w-3xl mx-auto"
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-display font-bold text-white tracking-tight">
            MoVI<span className="text-emerald-500">Tex</span> Alerts
          </h1>
          <p className="text-white/40 text-sm">Stay updated with real-time campus movement and alerts.</p>
        </div>
        <div className="p-3 rounded-2xl bg-white/5 border border-white/10 relative">
          <Bell className="w-6 h-6 text-white/60" />
          <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-500 neon-glow" />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {notifications.map((notif, index) => (
          <motion.div
            key={notif.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <GlassPanel className={`p-6 border ${notif.border} hover:bg-white/5 transition-all group cursor-pointer`}>
              <div className="flex gap-6">
                <div className={`p-3 rounded-2xl h-fit ${notif.bg} ${notif.color}`}>
                  <notif.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {notif.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-white/20 uppercase tracking-widest">
                      <Clock className="w-3 h-3" />
                      <span>{notif.time}</span>
                    </div>
                  </div>
                  <p className="text-sm text-white/40 leading-relaxed">
                    {notif.message}
                  </p>
                  <div className="mt-4 flex items-center gap-4">
                    <button className="text-[10px] font-bold text-white/20 uppercase tracking-widest hover:text-white transition-colors">
                      Dismiss
                    </button>
                    <button className={`text-[10px] font-bold ${notif.color} uppercase tracking-widest hover:underline underline-offset-4`}>
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </GlassPanel>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button className="px-8 py-3 rounded-xl bg-white/5 border border-white/10 text-white/40 text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all">
          Load Previous Notifications
        </button>
      </div>
    </motion.div>
  );
};
