import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Map as MapIcon, Navigation, Brain, Bell } from 'lucide-react';
import { PortalLayout, NavItem } from '../components/layout/PortalLayout';
import { LiveMap } from './LiveMap';
import { SmartRouteFinder } from './SmartRouteFinder';
import { StudentIntelligence } from './StudentIntelligence';
import { NotificationsPanel } from './NotificationsPanel';

const studentNavItems: NavItem[] = [
  { id: 'map', icon: MapIcon, label: 'Live Campus Map', path: '/student/map' },
  { id: 'route', icon: Navigation, label: 'Smart Route Finder', path: '/student/route' },
  { id: 'insights', icon: Brain, label: 'Crowd Insights', path: '/student/insights' },
  { id: 'alerts', icon: Bell, label: 'Notifications', path: '/student/alerts' },
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
        <Route path="map" element={<LiveMap />} />
        <Route path="route" element={<SmartRouteFinder />} />
        <Route path="insights" element={<StudentIntelligence />} />
        <Route path="alerts" element={<NotificationsPanel />} />
        <Route path="*" element={<Navigate to="map" replace />} />
      </Routes>
    </PortalLayout>
  );
};
