import React from 'react';
import { Lightbulb, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';

interface InsightCardProps {
  title?: string;
  insight: string;
  type?: 'suggestion' | 'warning' | 'alert' | 'positive';
  icon?: React.ReactNode;
  details?: string[];
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const InsightCard: React.FC<InsightCardProps> = ({
  title = 'AI Insight',
  insight,
  type = 'suggestion',
  icon,
  details,
  action,
}) => {
  const bgColor =
    type === 'warning'
      ? 'bg-amber-500/10 border-amber-500/20'
      : type === 'alert'
        ? 'bg-red-500/10 border-red-500/20'
        : type === 'positive'
          ? 'bg-emerald-500/10 border-emerald-500/20'
          : 'bg-blue-500/10 border-blue-500/20';

  const iconColor =
    type === 'warning'
      ? 'text-amber-400'
      : type === 'alert'
        ? 'text-red-400'
        : type === 'positive'
          ? 'text-emerald-400'
          : 'text-blue-400';

  const defaultIcon =
    type === 'warning' ? (
      <AlertCircle className={`w-5 h-5 ${iconColor}`} />
    ) : type === 'alert' ? (
      <AlertCircle className={`w-5 h-5 ${iconColor}`} />
    ) : type === 'positive' ? (
      <CheckCircle2 className={`w-5 h-5 ${iconColor}`} />
    ) : (
      <Lightbulb className={`w-5 h-5 ${iconColor}`} />
    );

  return (
    <div className={`glass-card p-5 border ${bgColor} group hover:border-opacity-100 transition-all`}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-1">{icon || defaultIcon}</div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-white/60 uppercase tracking-widest mb-1">
            {title}
          </p>
          <p className="text-sm text-white leading-relaxed">{insight}</p>

          {details && details.length > 0 && (
            <ul className="mt-3 space-y-1">
              {details.map((detail, idx) => (
                <li key={idx} className="text-xs text-white/50 flex items-center gap-2">
                  <span className="inline-block w-1 h-1 rounded-full bg-white/30" />
                  {detail}
                </li>
              ))}
            </ul>
          )}

          {action && (
            <button
              onClick={action.onClick}
              className="mt-4 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-bold text-white uppercase tracking-wider transition-all"
            >
              {action.label}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
