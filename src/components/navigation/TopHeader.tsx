import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Search,
  Bell,
  Bookmark,
  Menu,
  ChevronDown,
  Sparkles,
  Cpu,
  GitCompare,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { useSaved } from '../../context/SavedContext';
import { ToolWiseLogo } from '../common/ToolWiseLogo';
import { resolveSearchIntent, getSearchSuggestions, type SearchSuggestionItem } from '../../services/searchIntelligence';
import './TopHeader.css';

interface TopHeaderProps {
  onToggleSidebarMobile?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({ onToggleSidebarMobile }) => {
  const navigate = useNavigate();
  const { savedToolIds } = useSaved();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchSuggestionItem[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (val.trim()) {
      const suggs = getSearchSuggestions(val, 5);
      setSuggestions(suggs);
      setShowSuggestions(suggs.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // Intelligent Search Resolution
    const resolution = resolveSearchIntent(searchQuery.trim());
    navigate(resolution.targetUrl);
    setShowSuggestions(false);
  };

  const handleSelectSuggestion = (targetUrl: string) => {
    navigate(targetUrl);
    setShowSuggestions(false);
    setSearchQuery('');
  };

  const renderIcon = (type: SearchSuggestionItem['iconType']) => {
    switch (type) {
      case 'models':
        return <Cpu size={15} />;
      case 'compare':
        return <GitCompare size={15} />;
      case 'research':
        return <BookOpen size={15} />;
      default:
        return <Sparkles size={15} />;
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

      {/* Center Search Bar with Intelligence */}
      <form className="header-search-form" onSubmit={handleSearchSubmit}>
        <div className="header-search-input-wrapper" ref={wrapperRef}>
          <Search size={16} className="header-search-icon" />
          <input
            ref={inputRef}
            type="text"
            className="header-search-input"
            placeholder="Search ChatGPT, Gemini, Claude, Figma, Canva or 'X vs Y'..."
            value={searchQuery}
            onChange={handleInputChange}
            onFocus={() => {
              if (suggestions.length > 0) setShowSuggestions(true);
            }}
          />
          <span className="header-search-shortcut">⌘K</span>

          {/* Autocomplete suggestions dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="header-suggestions-dropdown animate-scale-in">
              {suggestions.map((item) => (
                <div
                  key={item.id}
                  className="header-suggestion-item"
                  onClick={() => handleSelectSuggestion(item.targetUrl)}
                >
                  <div className="sugg-left">
                    <div className="sugg-icon-box">{renderIcon(item.iconType)}</div>
                    <div className="sugg-text">
                      <span className="sugg-title">{item.title}</span>
                      <span className="sugg-sub">{item.subtitle}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="sugg-badge">{item.badge}</span>
                    <ArrowRight size={13} style={{ color: 'var(--text-muted)' }} />
                  </div>
                </div>
              ))}
            </div>
          )}
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
                    <strong>Gemini 1.5 Pro</strong> 2M-token context evaluation added to Lab Research.
                  </div>
                  <span className="notif-time">Today</span>
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
            <span>X</span>
          </div>
          <span className="user-display-name">xZariel</span>
          <ChevronDown size={14} className="user-chevron" />
        </Link>
      </div>
    </header>
  );
};
