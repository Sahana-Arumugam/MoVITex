import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { PageType } from '../../types';
import { motion, AnimatePresence } from 'motion/react';

interface LayoutProps {
  children: React.ReactNode;
  activePage: PageType;
  onPageChange: (page: PageType) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activePage, onPageChange }) => {
  return (
    <div className="flex h-screen overflow-hidden bg-[#050505]">
      <Sidebar activePage={activePage} onPageChange={onPageChange} />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-8 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
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
