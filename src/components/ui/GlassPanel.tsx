import React from 'react';
import { cn } from '../../utils/cn';

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export const GlassPanel: React.FC<GlassPanelProps> = ({ children, className, title }) => {
  return (
    <div className={cn("glass-panel p-6 flex flex-col gap-4", className)}>
      {title && (
        <h3 className="text-sm font-medium text-white/50 uppercase tracking-wider">
          {title}
        </h3>
      )}
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
};
