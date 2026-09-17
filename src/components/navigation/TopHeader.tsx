import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, Bell, Bookmark, Menu, ChevronDown } from 'lucide-react';
import { useSaved } from '../../context/SavedContext';
import { ToolWiseLogo } from '../common/ToolWiseLogo';
import './TopHeader.css';

interface TopHeaderProps {
  onToggleSidebarMobile?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({ onToggleSidebarMobile }) => {
  const navigate = useNavigate();
  const { savedToolIds } = useSaved();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="app-top-header">
      <div className="header-left">
        {/* Mobile Hamburger toggle */}
        <button
          className="header-mobile-menu-btn"
          onClick={onToggleSidebarMobile}
          aria-label="Toggle Menu"
        >
          <Menu size={20} />
        </button>

        {/* Brand shown only on mobile when sidebar is hidden */}
        <div className="header-mobile-brand">
          <Link to="/">
            <ToolWiseLogo size="sm" showSubtitle={false} />
          </Link>
        </div>
      </div>

      {/* Center Search Bar */}
      <form className="header-search-form" onSubmit={handleSearchSubmit}>
        <div className="header-search-input-wrapper">
          <Search size={16} className="header-search-icon" />
          <input
            type="text"
            className="header-search-input"
            placeholder="Search AI tools, software, features, or use cases..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="header-search-shortcut">⌘K</span>
        </div>
      </form>

      {/* Right Controls */}
      <div className="header-right-actions">
        {/* Notification Bell */}
        <div className="header-action-item">
          <button
            className="header-icon-btn"
            title="Notifications"
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="View notifications"
          >
            <Bell size={18} />
            <span className="notification-dot" />
          </button>

          {showNotifications && (
            <div className="notifications-dropdown animate-scale-in">
              <div className="notif-header">
                <span className="notif-title">Notifications</span>
                <span className="notif-badge">2 new</span>
              </div>
              <div className="notif-list">
                <div className="notif-item unread">
                  <div className="notif-text">
                    <strong>Claude 3.7 Sonnet</strong> research benchmark report has been updated.
                  </div>
                  <span className="notif-time">2 hours ago</span>
                </div>
                <div className="notif-item">
                  <div className="notif-text">
                    <strong>Cursor</strong> added new agentic features to comparison matrix.
                  </div>
                  <span className="notif-time">Yesterday</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Saved/Bookmark Access */}
        <Link to="/profile?tab=saved" className="header-icon-btn" title="Saved Tools">
          <Bookmark size={18} />
          {savedToolIds.length > 0 && (
            <span className="saved-counter-badge">{savedToolIds.length}</span>
          )}
        </Link>

        {/* User Profile Pill */}
        <Link to="/profile" className="header-user-pill">
          <div className="user-avatar-circle">
            <span>A</span>
          </div>
          <span className="user-display-name">Alex</span>
          <ChevronDown size={14} className="user-chevron" />
        </Link>
      </div>
    </header>
  );
};
