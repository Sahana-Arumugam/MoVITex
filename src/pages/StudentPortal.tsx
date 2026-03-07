import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import {
  Navigation,
  Brain,
  Bell,
  TrendingUp,
  Clock,
} from 'lucide-react';
import { PortalLayout, NavItem } from '../components/layout/PortalLayout';
import { SmartRouteFinder } from './SmartRouteFinder';
import { StudentIntelligence } from './StudentIntelligence';
import { NotificationsPanel } from './NotificationsPanel';
import { PredictCongestion } from './PredictCongestion';
import { BestTimeToVisit } from './BestTimeToVisit';

const studentNavItems: NavItem[] = [
  { id: 'predict', icon: TrendingUp, label: 'Predict Congestion', path: '/student/predict' },
  { id: 'insights', icon: Brain, label: 'Block & Time Insights', path: '/student/insights' },
  { id: 'route', icon: Navigation, label: 'Smart Route Finder', path: '/student/route' },
  { id: 'best-time', icon: Clock, label: 'Best Time to Visit', path: '/student/best-time' },
  { id: 'alerts', icon: Bell, label: 'Smart Alerts', path: '/student/alerts' },
];

export const StudentPortal: React.FC = () => {
  return (
    <PortalLayout
      navItems={studentNavItems}
      role="student"
      userName="Alex Student"
      userRole="Undergraduate"
    >
      <Routes>
        <Route path="predict" element={<PredictCongestion />} />
        <Route path="insights" element={<StudentIntelligence />} />
        <Route path="route" element={<SmartRouteFinder />} />
        <Route path="best-time" element={<BestTimeToVisit />} />
        <Route path="alerts" element={<NotificationsPanel />} />
        <Route path="*" element={<Navigate to="insights" replace />} />
      </Routes>
    </PortalLayout>
  );
};
