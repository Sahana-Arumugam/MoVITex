import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { motion, AnimatePresence } from 'motion/react';
import { LucideIcon } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export interface NavItem {
  id: string;
  icon: LucideIcon;
  label: string;
  path: string;
}

interface PortalLayoutProps {
  children: React.ReactNode;
  navItems: NavItem[];
  role: 'student' | 'admin';
  userName?: string;
  userRole?: string;
}

export const PortalLayout: React.FC<PortalLayoutProps> = ({ 
  children, 
  navItems, 
  role,
  userName: propUserName,
  userRole: propUserRole
}) => {
  const location = useLocation();
  const { user } = useAuth();
  const activePath = location.pathname;

  const displayUserName = user?.name || propUserName || 'User';
  const displayUserRole = user?.role === 'admin' ? (
    <>Mo<span className="text-blue-500">VIT</span>ex Administrator</>
  ) : 'VIT Student';

  return (
    <div className="flex h-screen overflow-hidden bg-[#050505]">
      <Sidebar 
        navItems={navItems} 
        activePath={activePath} 
        role={role}
      />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header 
          userName={displayUserName}
          userRole={displayUserRole}
        />
        
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-8 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>

          {/* Background decorative elements */}
          <div className="fixed top-1/4 -right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="fixed bottom-1/4 -left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
        </main>
      </div>
    </div>
  );
};
