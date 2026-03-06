import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Users, ShieldCheck, Zap, Activity, ArrowRight } from 'lucide-react';
import { GlassPanel } from '../components/ui/GlassPanel';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handlePortalSelect = (role: 'student' | 'admin') => {
    navigate('/login', { state: { role } });
  };

  const handleKeyDown = (e: React.KeyboardEvent, role: 'student' | 'admin') => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handlePortalSelect(role);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Skip to content for accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-emerald-500 text-black px-4 py-2 rounded-lg font-bold">
        Skip to content
      </a>

      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px]" aria-hidden="true" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" aria-hidden="true" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16 relative z-10"
        id="main-content"
      >
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/30">
            <Zap className="w-8 h-8 text-emerald-500" />
          </div>
          <h1 className="text-5xl font-display font-bold text-white tracking-tight">
            Mo<span className="text-emerald-500">VIT</span>ex
          </h1>
        </div>
        <p className="text-white/40 max-w-md mx-auto text-lg leading-relaxed">
          AI-powered campus intelligence for crowd optimization and energy efficiency.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl relative z-10" role="list">
        {/* Student Portal Option */}
        <motion.div
          whileHover={{ scale: 1.02, translateY: -5 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handlePortalSelect('student')}
          onKeyDown={(e) => handleKeyDown(e, 'student')}
          tabIndex={0}
          role="button"
          aria-label="Enter Student Portal"
          className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/50 rounded-3xl"
        >
          <GlassPanel className="h-full p-8 flex flex-col items-center text-center group hover:border-emerald-500/50 transition-all duration-500">
            <div className="w-20 h-20 rounded-3xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:bg-emerald-500/20 transition-colors">
              <Users className="w-10 h-10 text-emerald-500" />
            </div>
            <h2 className="text-2xl font-display font-bold text-white mb-3">Student Portal</h2>
            <p className="text-white/40 text-sm leading-relaxed mb-8">
              Navigate campus efficiently, find quiet study spots, and get real-time crowd alerts.
            </p>
            <div className="mt-auto flex items-center gap-2 px-6 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-bold uppercase tracking-widest group-hover:bg-emerald-500 group-hover:text-white transition-all">
              <span>Enter Portal</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </GlassPanel>
        </motion.div>

        {/* Admin Portal Option */}
        <motion.div
          whileHover={{ scale: 1.02, translateY: -5 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handlePortalSelect('admin')}
          onKeyDown={(e) => handleKeyDown(e, 'admin')}
          tabIndex={0}
          role="button"
          aria-label="Enter Admin Portal"
          className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/50 rounded-3xl"
        >
          <GlassPanel className="h-full p-8 flex flex-col items-center text-center group hover:border-blue-500/50 transition-all duration-500">
            <div className="w-20 h-20 rounded-3xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-colors">
              <ShieldCheck className="w-10 h-10 text-blue-500" />
            </div>
            <h2 className="text-2xl font-display font-bold text-white mb-3">Admin Portal</h2>
            <p className="text-white/40 text-sm leading-relaxed mb-8">
              Monitor campus-wide analytics, optimize energy usage, and manage infrastructure.
            </p>
            <div className="mt-auto flex items-center gap-2 px-6 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-xs font-bold uppercase tracking-widest group-hover:bg-blue-500 group-hover:text-white transition-all">
              <span>Enter Portal</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </GlassPanel>
        </motion.div>
      </div>

      {/* Footer Info */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-20 flex items-center gap-8 text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]"
      >
        <div className="flex items-center gap-2">
          <Activity className="w-3 h-3" />
          <span>Real-time Sync</span>
        </div>
        <div className="w-1 h-1 rounded-full bg-white/10" aria-hidden="true" />
        <span>End-to-End Encryption</span>
        <div className="w-1 h-1 rounded-full bg-white/10" aria-hidden="true" />
        <span>AI Optimized</span>
      </motion.div>
    </div>
  );
};
