import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Compass, Sparkles, GitCompare, User } from 'lucide-react';
import { useCompare } from '../../context/CompareContext';
import './MobileBottomNav.css';

export const MobileBottomNav: React.FC = () => {
  const location = useLocation();
  const { compareToolIds } = useCompare();

  const isRouteActive = (to: string) => {
    if (to === '/') return location.pathname === '/' && !location.search;
    if (to.includes('?')) {
      const [path, query] = to.split('?');
      if (location.pathname !== path) return false;
      const targetParams = new URLSearchParams(query);
      const currentParams = new URLSearchParams(location.search);
      for (const [k, v] of targetParams.entries()) {
        if (currentParams.get(k)?.toLowerCase() !== v.toLowerCase()) return false;
      }
      return true;
    }
    return location.pathname.startsWith(to);
  };

  const navItems = [
    { label: 'Home', to: '/', icon: Home },
    { label: 'Explore', to: '/explore', icon: Compass },
    { label: 'AI Tools', to: '/explore?type=ai', icon: Sparkles },
    {
      label: 'Compare',
      to: '/compare',
      icon: GitCompare,
      badge: compareToolIds.length > 0 ? compareToolIds.length : undefined,
    },
    { label: 'Profile', to: '/profile', icon: User },
  ];

  return (
    <nav className="mobile-bottom-nav">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = isRouteActive(item.to);

        return (
          <NavLink
            key={item.label}
            to={item.to}
            className={`mobile-nav-btn ${active ? 'active' : ''}`}
          >
            <div className="mobile-nav-icon-wrap">
              <Icon size={20} strokeWidth={active ? 2.3 : 1.8} />
              {item.badge !== undefined && (
                <span className="mobile-badge">{item.badge}</span>
              )}
            </div>
            <span className="mobile-nav-title">{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
};
