import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Zap, 
  Settings,
  LogOut
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { NavItem } from './PortalLayout';

interface SidebarProps {
  navItems: NavItem[];
  activePath: string;
  role: 'student' | 'admin';
}

export const Sidebar: React.FC<SidebarProps> = ({ navItems, activePath, role }) => {
  const navigate = useNavigate();

  return (
    <aside className="w-20 lg:w-64 h-screen flex flex-col border-r border-white/10 bg-black/40 backdrop-blur-xl transition-all duration-300">
      <div className="p-6 flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
        <div className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center neon-glow",
          role === 'admin' ? "bg-blue-500" : "bg-emerald-500"
        )}>
          <Zap className="text-black w-6 h-6" />
        </div>
        <span className="hidden lg:block font-display font-bold text-xl tracking-tight">
          Mo<span className={role === 'admin' ? "text-blue-500" : "text-emerald-500"}>VIT</span>ex
        </span>
      </div>

      <nav className="flex-1 px-4 py-8 flex flex-col gap-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => navigate(item.path)}
            className={cn(
              "flex items-center gap-4 p-3 rounded-xl transition-all duration-200 group",
              activePath === item.path 
                ? (role === 'admin' ? "bg-blue-500/10 text-blue-500" : "bg-emerald-500/10 text-emerald-500")
                : "text-white/40 hover:text-white hover:bg-white/5"
            )}
          >
            <item.icon className={cn(
              "w-6 h-6",
              activePath === item.path 
                ? (role === 'admin' ? "text-blue-500" : "text-emerald-500")
                : "group-hover:text-white"
            )} />
            <span className="hidden lg:block font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 flex flex-col gap-2 border-t border-white/10">
        <button className="flex items-center gap-4 p-3 rounded-xl text-white/40 hover:text-white hover:bg-white/5 transition-all">
          <Settings className="w-6 h-6" />
          <span className="hidden lg:block font-medium">Settings</span>
        </button>
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-4 p-3 rounded-xl text-red-400/60 hover:text-red-400 hover:bg-red-400/5 transition-all"
        >
          <LogOut className="w-6 h-6" />
          <span className="hidden lg:block font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};
