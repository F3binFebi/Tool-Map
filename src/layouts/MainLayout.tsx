import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/navigation/Sidebar';
import { TopHeader } from '../components/navigation/TopHeader';
import { MobileBottomNav } from '../components/navigation/MobileBottomNav';
import { CompareTray } from '../components/compare/CompareTray';
import Footer from '../components/common/Footer';
import './MainLayout.css';

export default function MainLayout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="layout-shell">
      {/* Left Application Sidebar */}
      <Sidebar
        isOpenMobile={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Workspace Wrapper (offset by sidebar on desktop) */}
      <div className="layout-body">
        {/* Global Application Top Header */}
        <TopHeader
          onToggleSidebarMobile={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        />

        {/* Dynamic Page Content Outlet */}
        <main className="layout-content">
          <Outlet />
        </main>

        {/* Global Compact Application Footer */}
        <Footer />
      </div>

      {/* Compare Floating Tray */}
      <CompareTray />

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav />
    </div>
  );
}
