import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Home,
  Compass,
  Sparkles,
  Laptop,
  LayoutGrid,
  GitCompare,
  Wand2,
  BookOpen,
  User,
  Bookmark,
  FolderHeart,
  X,
  ArrowRight,
} from 'lucide-react';
import { ToolWiseLogo } from '../common/ToolWiseLogo';
import { useCompare } from '../../context/CompareContext';
import { useSaved } from '../../context/SavedContext';
import './Sidebar.css';

interface SidebarProps {
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpenMobile = false, onCloseMobile }) => {
  const location = useLocation();
  const { compareToolIds } = useCompare();
  const { savedToolIds, collections } = useSaved();

  const isRouteActive = (to: string) => {
    if (to === '/') {
      return location.pathname === '/' && !location.search;
    }
    if (to.includes('?')) {
      const [targetPath, targetQuery] = to.split('?');
      if (location.pathname !== targetPath) return false;
      const targetParams = new URLSearchParams(targetQuery);
      const currentParams = new URLSearchParams(location.search);

      for (const [key, val] of targetParams.entries()) {
        if (currentParams.get(key)?.toLowerCase() !== val.toLowerCase()) {
          return false;
        }
      }
      return true;
    }
    if (to === '/explore') {
      return location.pathname === '/explore' && !location.search.includes('type=') && !location.search.includes('view=');
    }
    return location.pathname.startsWith(to);
  };

  const primaryNavItems = [
    { label: 'Home', to: '/', icon: Home },
    { label: 'Explore', to: '/explore', icon: Compass },
    { label: 'AI Tools', to: '/explore?type=ai', icon: Sparkles, accent: 'ai' },
    { label: 'Software', to: '/explore?type=software', icon: Laptop, accent: 'software' },
    { label: 'Categories', to: '/explore?view=categories', icon: LayoutGrid },
    {
      label: 'Compare',
      to: '/compare',
      icon: GitCompare,
      badge: compareToolIds.length > 0 ? compareToolIds.length : undefined,
    },
    { label: 'Recommendations', to: '/recommendations', icon: Wand2 },
    { label: 'Research', to: '/research', icon: BookOpen },
    { label: 'Profile', to: '/profile', icon: User },
  ];

  return (
    <>
      {/* Backdrop on mobile drawer */}
      {isOpenMobile && <div className="sidebar-backdrop" onClick={onCloseMobile} />}

      <aside className={`app-sidebar ${isOpenMobile ? 'sidebar-open' : ''}`}>
        {/* Top Branding Area */}
        <div className="sidebar-header">
          <NavLink to="/" onClick={onCloseMobile} className="sidebar-brand-link">
            <ToolWiseLogo size="md" showSubtitle={true} />
          </NavLink>
          {onCloseMobile && (
            <button
              className="sidebar-close-btn"
              onClick={onCloseMobile}
              aria-label="Close navigation"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Scrollable Navigation Body */}
        <div className="sidebar-scrollable">
          {/* Main Navigation Links */}
          <nav className="sidebar-nav">
            {primaryNavItems.map((item) => {
              const Icon = item.icon;
              const active = isRouteActive(item.to);

              return (
                <NavLink
                  key={item.label}
                  to={item.to}
                  onClick={onCloseMobile}
                  className={`sidebar-nav-item ${active ? 'active' : ''} ${item.accent ? `accent-${item.accent}` : ''}`}
                >
                  <span className="sidebar-nav-icon">
                    <Icon size={18} strokeWidth={active ? 2.2 : 1.8} />
                  </span>
                  <span className="sidebar-nav-label">{item.label}</span>
                  {item.badge !== undefined && (
                    <span className="sidebar-badge">{item.badge}</span>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Quick Access Section */}
          <div className="sidebar-section">
            <div className="sidebar-section-title">Quick Access</div>
            <div className="sidebar-sub-nav">
              <NavLink
                to="/profile?tab=saved"
                onClick={onCloseMobile}
                className="sidebar-sub-item"
              >
                <div className="sidebar-sub-left">
                  <Bookmark size={15} />
                  <span>Saved Tools</span>
                </div>
                <span className="sidebar-sub-count">{savedToolIds.length}</span>
              </NavLink>

              <NavLink
                to="/compare"
                onClick={onCloseMobile}
                className="sidebar-sub-item"
              >
                <div className="sidebar-sub-left">
                  <GitCompare size={15} />
                  <span>Saved Comparisons</span>
                </div>
                <span className="sidebar-sub-count">{compareToolIds.length > 0 ? compareToolIds.length : 3}</span>
              </NavLink>

              <NavLink
                to="/profile?tab=collections"
                onClick={onCloseMobile}
                className="sidebar-sub-item"
              >
                <div className="sidebar-sub-left">
                  <FolderHeart size={15} />
                  <span>Collections</span>
                </div>
                <span className="sidebar-sub-count">{collections.length > 0 ? collections.length : 2}</span>
              </NavLink>
            </div>
          </div>
        </div>

        {/* Sidebar Footer Promo Card */}
        <div className="sidebar-footer">
          <div className="sidebar-promo-card">
            <h4 className="promo-title">Smarter Decisions. Better Tools.</h4>
            <p className="promo-desc">
              Research, compare and find the right AI tools and software before you make your next choice.
            </p>
            <NavLink
              to="/recommendations"
              onClick={onCloseMobile}
              className="promo-btn"
            >
              <span>Get Started</span>
              <ArrowRight size={13} />
            </NavLink>
          </div>
        </div>
      </aside>
    </>
  );
};
