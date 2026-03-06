import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Mail, Lock, ArrowRight, AlertCircle, Eye, EyeOff, ChevronLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { GlassPanel } from '../components/ui/GlassPanel';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { login, user, isAuthenticating } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const roleHint = location.state?.role as 'student' | 'admin' | undefined;

  // Redirect if already logged in
  React.useEffect(() => {
    if (user) {
      if (user.role === 'student') navigate('/student', { replace: true });
      else if (user.role === 'admin') navigate('/admin', { replace: true });
    }
  }, [user, navigate]);
  
  // Determine where to redirect after login
  const getRedirectPath = () => {
    if (location.state?.from?.pathname) return location.state.from.pathname;
    if (roleHint === 'student') return '/student';
    if (roleHint === 'admin') return '/admin';
    return '/';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedEmail = email.trim();

    try {
      // Basic validation
      if (roleHint === 'student' && !trimmedEmail.endsWith('@vitstudent.ac.in')) {
        throw new Error('Please use your @vitstudent.ac.in email');
      }
      if (roleHint === 'admin' && !trimmedEmail.endsWith('@vit.ac.in')) {
        throw new Error('Please use your @vit.ac.in email');
      }

      const success = await login(trimmedEmail, password);
      if (success) {
        navigate(getRedirectPath(), { replace: true });
      } else {
        setError('Invalid credentials or unauthorized email domain.');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during login.');
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px]" aria-hidden="true" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" aria-hidden="true" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-white/40 hover:text-white mb-8 transition-colors group"
          aria-label="Go back to home page"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-bold uppercase tracking-widest">Back to Home</span>
        </button>

        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="p-2 rounded-xl bg-emerald-500/20 border border-emerald-500/30">
            <Zap className="w-6 h-6 text-emerald-500" />
          </div>
          <h1 className="text-3xl font-display font-bold text-white tracking-tight">
            Mo<span className="text-emerald-500">VIT</span>ex
          </h1>
        </div>

        <GlassPanel className="p-8">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-display font-bold text-white">
                {roleHint === 'admin' ? 'Admin Login' : roleHint === 'student' ? 'Student Login' : 'Welcome Back'}
              </h2>
              <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${roleHint === 'admin' ? 'bg-blue-500/20 text-blue-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                {roleHint || 'User'}
              </div>
            </div>
            <p className="text-white/40 text-sm">
              {roleHint === 'admin' 
                ? 'Use your @vit.ac.in email to access the admin portal.' 
                : 'Use your @vitstudent.ac.in email to access the student portal.'}
            </p>
          </div>

          <form 
            onSubmit={handleSubmit} 
            className="space-y-6"
            aria-busy={isAuthenticating}
          >
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                  role="alert"
                  aria-live="assertive"
                >
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3 mb-4">
                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <p className="text-red-500 text-sm">{error}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <label htmlFor="email" className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" aria-hidden="true" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={roleHint === 'admin' ? 'name@vit.ac.in' : 'name@vitstudent.ac.in'}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/10 focus:outline-none focus:border-emerald-500/50 transition-all"
                  required
                  aria-required="true"
                  autoComplete="email"
                  disabled={isAuthenticating}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <label htmlFor="password" className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
                  Password
                </label>
                <button 
                  type="button"
                  className="text-[10px] font-bold text-emerald-500/60 hover:text-emerald-500 uppercase tracking-widest transition-colors"
                >
                  Forgot?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" aria-hidden="true" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-12 text-white placeholder:text-white/10 focus:outline-none focus:border-emerald-500/50 transition-all"
                  required
                  aria-required="true"
                  autoComplete="current-password"
                  disabled={isAuthenticating}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/60 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  disabled={isAuthenticating}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isAuthenticating}
              aria-disabled={isAuthenticating}
              className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-500/50 text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all group shadow-lg shadow-emerald-500/20"
            >
              {isAuthenticating ? (
                <div className="flex items-center gap-2" role="status">
                  <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" aria-hidden="true" />
                  <span>Authenticating...</span>
                </div>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/5 text-center">
            <p className="text-white/40 text-xs mb-4">Not a {roleHint || 'user'}?</p>
            <button 
              onClick={() => navigate('/', { state: { role: roleHint === 'admin' ? 'student' : 'admin' } })}
              className="text-xs font-bold text-white hover:text-emerald-500 transition-colors uppercase tracking-widest"
            >
              Switch to {roleHint === 'admin' ? 'Student' : 'Admin'} Portal
            </button>
          </div>
        </GlassPanel>

        <p className="mt-8 text-center text-white/20 text-[10px] uppercase tracking-[0.2em]">
          Secure Mo<span className="text-emerald-500/50">VIT</span>ex Intelligence System
        </p>
      </motion.div>
    </div>
  );
};
