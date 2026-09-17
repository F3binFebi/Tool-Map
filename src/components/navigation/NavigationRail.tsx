import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Compass,
  Layers,
  GitCompare,
  Sparkles,
  BookOpen,
  Bookmark,
  Search,
  SlidersHorizontal
} from 'lucide-react';
import { useCompare } from '../../context/CompareContext';
import { useSaved } from '../../context/SavedContext';

interface NavigationRailProps {
  onOpenCommandPalette: () => void;
}

export const NavigationRail: React.FC<NavigationRailProps> = ({ onOpenCommandPalette }) => {
  const location = useLocation();
  const { compareToolIds } = useCompare();
  const { savedToolIds } = useSaved();

  const navLinks = [
    { to: '/', label: 'Home', icon: Compass },
    { to: '/explore', label: 'Explore', icon: Layers },
    {
      to: '/compare',
      label: 'Compare',
      icon: GitCompare,
      badge: compareToolIds.length > 0 ? compareToolIds.length : undefined
    },
    { to: '/recommend', label: 'Match', icon: Sparkles },
    { to: '/research', label: 'Research', icon: BookOpen },
    {
      to: '/profile',
      label: 'Saved',
      icon: Bookmark,
      badge: savedToolIds.length > 0 ? savedToolIds.length : undefined
    }
  ];

  return (
    <>
      {/* Desktop Navigation Rail */}
      <aside
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          width: 'var(--rail-width)',
          backgroundColor: 'var(--bg-surface)',
          borderRight: '1px solid var(--border-subtle)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '1.25rem 0',
          zIndex: 100
        }}
        className="desktop-rail"
      >
        {/* Brand Logo / Mark */}
        <NavLink
          to="/"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.25rem',
            marginBottom: '2rem',
            textDecoration: 'none'
          }}
          title="ToolWise Home"
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              backgroundColor: 'var(--accent-primary)',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-inverted)',
              fontWeight: 700,
              fontSize: '1.125rem',
              letterSpacing: '-0.03em',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            TW
          </div>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.625rem',
              fontWeight: 600,
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            v1.0
          </span>
        </NavLink>

        {/* Primary Navigation Icons */}
        <nav
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.625rem',
            width: '100%',
            flex: 1
          }}
        >
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.to === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(item.to);

            return (
              <NavLink
                key={item.to}
                to={item.to}
                style={{
                  position: 'relative',
                  width: '48px',
                  height: '48px',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '2px',
                  color: isActive ? 'var(--accent-primary)' : 'var(--text-muted)',
                  backgroundColor: isActive ? 'var(--bg-surface-subtle)' : 'transparent',
                  border: isActive ? '1px solid var(--border-subtle)' : '1px solid transparent',
                  transition: 'all var(--transition-fast)'
                }}
                title={item.label}
              >
                <Icon size={19} strokeWidth={isActive ? 2.2 : 1.8} />
                <span
                  style={{
                    fontSize: '0.625rem',
                    fontWeight: isActive ? 600 : 500,
                    letterSpacing: '-0.01em'
                  }}
                >
                  {item.label}
                </span>

                {/* Badge Indicator */}
                {item.badge !== undefined && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '4px',
                      right: '4px',
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--accent-primary)',
                      color: 'var(--text-inverted)',
                      fontSize: '0.625rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      lineHeight: 1
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Actions: Search / Command Trigger */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.75rem'
          }}
        >
          <button
            onClick={onOpenCommandPalette}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'var(--bg-surface-subtle)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
            title="Search & Commands (Ctrl+K)"
          >
            <Search size={18} />
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Navigation Bar */}
      <nav
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: '60px',
          backgroundColor: 'var(--bg-surface)',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          zIndex: 999,
          padding: '0 0.5rem'
        }}
        className="mobile-nav"
      >
        {navLinks.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.to === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(item.to);

          return (
            <NavLink
              key={item.to}
              to={item.to}
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2px',
                color: isActive ? 'var(--accent-primary)' : 'var(--text-muted)',
                padding: '4px 8px',
                fontSize: '0.6875rem',
                fontWeight: isActive ? 600 : 500
              }}
            >
              <Icon size={19} strokeWidth={isActive ? 2.2 : 1.7} />
              <span>{item.label}</span>
              {item.badge !== undefined && (
                <span
                  style={{
                    position: 'absolute',
                    top: '2px',
                    right: '8px',
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--accent-primary)',
                    color: 'var(--text-inverted)',
                    fontSize: '0.5625rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      <style>{`
        @media (min-width: 769px) {
          .mobile-nav {
            display: none !important;
          }
        }
        @media (max-width: 768px) {
          .desktop-rail {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};
