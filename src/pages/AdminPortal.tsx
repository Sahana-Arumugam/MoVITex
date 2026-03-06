import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Users, BarChart3, Zap, Activity } from 'lucide-react';
import { PortalLayout, NavItem } from '../components/layout/PortalLayout';
import { CrowdView } from './CrowdView';
import { AdminAnalytics } from './AdminAnalytics';
import { EnergyPanel } from './EnergyPanel';
import { QualityScore } from './QualityScore';

const adminNavItems: NavItem[] = [
  { id: 'dashboard', icon: Users, label: 'Crowd Dashboard', path: '/admin/dashboard' },
  { id: 'analytics', icon: BarChart3, label: 'Building Analytics', path: '/admin/analytics' },
  { id: 'energy', icon: Zap, label: 'Energy Optimization', path: '/admin/energy' },
  { id: 'quality', icon: Activity, label: 'Quality Score', path: '/admin/quality' },
];

export const AdminPortal: React.FC = () => {
  return (
    <PortalLayout 
      navItems={adminNavItems} 
      role="admin"
      userName="Sarah Manager"
      userRole={<>Mo<span className="text-blue-500">VIT</span>ex Administrator</>}
    >
      <Routes>
        <Route path="dashboard" element={<CrowdView />} />
        <Route path="analytics" element={<AdminAnalytics />} />
        <Route path="energy" element={<EnergyPanel />} />
        <Route path="quality" element={<QualityScore />} />
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </PortalLayout>
  );
};
