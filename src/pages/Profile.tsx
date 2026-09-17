import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Bookmark,
  GitCompare,
  FolderHeart,
  History,
  Settings,
  Plus,
  Trash2,
  ArrowRight,
  Sparkles,
  ExternalLink,
  Bell,
  Globe,
  Check,
  Star,
  X,
} from 'lucide-react';
import { useSaved } from '../context/SavedContext';
import { useCompare } from '../context/CompareContext';
import { ToolLogo } from '../components/common/ToolLogo';
import './Profile.css';

type ProfileTab = 'overview' | 'saved' | 'comparisons' | 'collections' | 'settings';

export const Profile: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = (searchParams.get('tab') as ProfileTab) || 'overview';

  const {
    savedTools,
    savedToolIds,
    recentlyViewedTools,
    collections,
    createCollection,
    toggleSaveTool,
  } = useSaved();

  const { compareTools, removeFromCompare } = useCompare();

  const [activeTab, setActiveTab] = useState<ProfileTab>(initialTab);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [newCollectionDesc, setNewCollectionDesc] = useState('');
  const [isCreatingCollection, setIsCreatingCollection] = useState(false);
  const [emailNotifs, setEmailNotifs] = useState(true);

  const handleTabChange = (tab: ProfileTab) => {
    setActiveTab(tab);
    setSearchParams({ tab }, { replace: true });
  };

  const handleCreateCol = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCollectionName.trim()) {
      createCollection(newCollectionName.trim(), newCollectionDesc.trim());
      setNewCollectionName('');
      setNewCollectionDesc('');
      setIsCreatingCollection(false);
    }
  };

  // Fallback default recently viewed if none yet
  const displayRecentlyViewed =
    recentlyViewedTools.length > 0
      ? recentlyViewedTools
      : savedTools.length > 0
      ? savedTools.slice(0, 4)
      : [];

  return (
    <div className="profile-canvas">
      {/* ── User Profile Header Banner (Screen 7) ── */}
      <section className="profile-hero-banner">
        <div className="profile-user-left">
          <div className="profile-avatar-circle">
            <span>A</span>
          </div>

          <div className="profile-user-info">
            <h1 className="profile-welcome-heading">Welcome back, Alex 👋</h1>
            <p className="profile-welcome-sub">Here's your activity and saved items.</p>
          </div>
        </div>

        {/* Right Stats Pills */}
        <div className="profile-stats-row">
          <div className="profile-stat-pill">
            <span className="stat-pill-num">{savedToolIds.length || 12}</span>
            <span className="stat-pill-label">Saved Tools</span>
          </div>

          <div className="profile-stat-pill">
            <span className="stat-pill-num">{compareTools.length || 3}</span>
            <span className="stat-pill-label">Saved Comparisons</span>
          </div>

          <div className="profile-stat-pill">
            <span className="stat-pill-num">{collections.length || 2}</span>
            <span className="stat-pill-label">Collections</span>
          </div>
        </div>
      </section>

      {/* ── Tabs Navigation Bar ── */}
      <div className="profile-tabs-bar">
        {[
          { id: 'overview' as const, label: 'Overview' },
          { id: 'saved' as const, label: `Saved Tools (${savedToolIds.length || 12})` },
          { id: 'comparisons' as const, label: 'Saved Comparisons' },
          { id: 'collections' as const, label: `Collections (${collections.length || 2})` },
          { id: 'settings' as const, label: 'Settings' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`profile-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => handleTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Two-Column Dashboard (Screen 7) ── */}
      {activeTab === 'overview' && (
        <div className="profile-overview-columns">
          {/* Left Column: Recently Viewed Tools */}
          <div className="profile-main-col">
            <div className="profile-section-card">
              <div className="card-top-header">
                <div className="card-title-group">
                  <History size={16} />
                  <h3 className="card-main-title">Recently Viewed</h3>
                </div>
                <Link to="/explore" className="card-header-link">
                  Browse tools <ArrowRight size={13} />
                </Link>
              </div>

              <div className="profile-recent-list">
                {displayRecentlyViewed.map((tool) => (
                  <div key={tool.id} className="recent-tool-row">
                    <div className="recent-left">
                      <ToolLogo id={tool.id} name={tool.name} size={38} />
                      <div className="recent-details">
                        <Link to={`/tools/${tool.id}`} className="recent-name">
                          {tool.name}
                        </Link>
                        <span className="recent-cat">{tool.type} · {tool.category}</span>
                      </div>
                    </div>

                    <div className="recent-right">
                      <div className="recent-rating">
                        <Star size={12} fill="#F59E0B" color="#F59E0B" />
                        <span>{tool.rating.toFixed(1)}</span>
                      </div>
                      <Link to={`/tools/${tool.id}`} className="recent-view-action">
                        View
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Collections Preview */}
            <div className="profile-section-card">
              <div className="card-top-header">
                <div className="card-title-group">
                  <FolderHeart size={16} />
                  <h3 className="card-main-title">Active Collections</h3>
                </div>
                <button
                  className="card-header-btn"
                  onClick={() => setIsCreatingCollection(true)}
                >
                  <Plus size={13} /> New Collection
                </button>
              </div>

              <div className="profile-collections-grid">
                {collections.map((col) => (
                  <div key={col.id} className="col-preview-card">
                    <h4 className="col-card-title">{col.name}</h4>
                    <p className="col-card-desc">{col.description}</p>
                    <span className="col-card-count">{col.toolIds.length} tools</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Preferences & Upgrade to Pro */}
          <div className="profile-side-col">
            {/* Preferences Panel */}
            <div className="profile-section-card">
              <h3 className="card-main-title">Preferences</h3>
              <div className="preferences-list">
                <div className="pref-item">
                  <div className="pref-label-group">
                    <Bell size={15} />
                    <span>Email Notifications</span>
                  </div>
                  <button
                    className={`pref-toggle-btn ${emailNotifs ? 'on' : 'off'}`}
                    onClick={() => setEmailNotifs(!emailNotifs)}
                  >
                    {emailNotifs ? 'Enabled' : 'Disabled'}
                  </button>
                </div>

                <div className="pref-item">
                  <div className="pref-label-group">
                    <Globe size={15} />
                    <span>Language</span>
                  </div>
                  <span className="pref-value">English</span>
                </div>

                <div className="pref-item">
                  <div className="pref-label-group">
                    <Globe size={15} />
                    <span>Region</span>
                  </div>
                  <span className="pref-value">Global</span>
                </div>
              </div>
            </div>

            {/* Upgrade to Pro Card (Screen 7) */}
            <div className="upgrade-pro-card">
              <div className="pro-sparkle-bg">
                <Sparkles size={24} color="#2563EB" />
              </div>
              <h4 className="pro-title">Upgrade to Pro</h4>
              <p className="pro-desc">
                Get advanced features, live benchmarking alerts, and save unlimited tools.
              </p>
              <button className="pro-learn-more-btn" onClick={() => alert('ToolWise Pro tier coming in Stage 2!')}>
                Learn More
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB: SAVED TOOLS */}
      {activeTab === 'saved' && (
        <div className="profile-tab-pane animate-fade-in">
          <div className="profile-section-card">
            <h3 className="card-main-title">Saved Bookmarks</h3>
            {savedTools.length === 0 ? (
              <div className="profile-empty">
                <Bookmark size={36} />
                <p>No tools saved yet. Explore tools and click the bookmark button to save them here.</p>
                <Link to="/explore" className="btn-browse">Browse Directory</Link>
              </div>
            ) : (
              <div className="saved-tools-flow">
                {savedTools.map((tool) => (
                  <div key={tool.id} className="saved-tool-item">
                    <ToolLogo id={tool.id} name={tool.name} size={42} />
                    <div className="sti-body">
                      <Link to={`/tools/${tool.id}`} className="sti-name">
                        {tool.name}
                      </Link>
                      <span className="sti-category">{tool.category}</span>
                    </div>
                    <button
                      className="sti-remove-btn"
                      onClick={() => toggleSaveTool(tool.id)}
                      title="Remove"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB: SAVED COMPARISONS */}
      {activeTab === 'comparisons' && (
        <div className="profile-tab-pane animate-fade-in">
          <div className="profile-section-card">
            <h3 className="card-main-title">Active Comparisons</h3>
            {compareTools.length === 0 ? (
              <div className="profile-empty">
                <GitCompare size={36} />
                <p>No comparisons currently active.</p>
                <Link to="/compare" className="btn-browse">Open Comparison Matrix</Link>
              </div>
            ) : (
              <div className="active-compare-list">
                <p className="text-secondary" style={{ fontSize: '0.875rem' }}>
                  Currently comparing {compareTools.length} tools:
                </p>
                <div className="compare-items-row">
                  {compareTools.map((t) => (
                    <div key={t.id} className="cmp-quick-pill">
                      <ToolLogo id={t.id} name={t.name} size={24} />
                      <span>{t.name}</span>
                      <button onClick={() => removeFromCompare(t.id)}>
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
                <Link to="/compare" className="btn-browse" style={{ marginTop: '1rem', display: 'inline-block' }}>
                  Launch Comparison Matrix
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB: COLLECTIONS */}
      {activeTab === 'collections' && (
        <div className="profile-tab-pane animate-fade-in">
          <div className="profile-section-card">
            <div className="card-top-header">
              <h3 className="card-main-title">Custom Collections</h3>
              <button
                className="card-header-btn"
                onClick={() => setIsCreatingCollection(!isCreatingCollection)}
              >
                <Plus size={13} /> Add Collection
              </button>
            </div>

            {isCreatingCollection && (
              <form className="new-collection-form" onSubmit={handleCreateCol}>
                <input
                  type="text"
                  placeholder="Collection Name (e.g. Daily AI Dev Stack)"
                  value={newCollectionName}
                  onChange={(e) => setNewCollectionName(e.target.value)}
                  className="col-input"
                  required
                />
                <input
                  type="text"
                  placeholder="Description (optional)"
                  value={newCollectionDesc}
                  onChange={(e) => setNewCollectionDesc(e.target.value)}
                  className="col-input"
                />
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button type="submit" className="col-submit-btn">Create</button>
                  <button type="button" className="col-cancel-btn" onClick={() => setIsCreatingCollection(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="profile-collections-grid" style={{ marginTop: '1rem' }}>
              {collections.map((col) => (
                <div key={col.id} className="col-preview-card">
                  <h4 className="col-card-title">{col.name}</h4>
                  <p className="col-card-desc">{col.description}</p>
                  <span className="col-card-count">{col.toolIds.length} tools included</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB: SETTINGS */}
      {activeTab === 'settings' && (
        <div className="profile-tab-pane animate-fade-in">
          <div className="profile-section-card">
            <h3 className="card-main-title">Account &amp; Platform Settings</h3>
            <div className="preferences-list" style={{ marginTop: '1rem' }}>
              <div className="pref-item">
                <span>Account Name</span>
                <span className="pref-value">Alex</span>
              </div>
              <div className="pref-item">
                <span>Account Email</span>
                <span className="pref-value">alex@example.com</span>
              </div>
              <div className="pref-item">
                <span>Data Storage</span>
                <span className="pref-value">Local Browser Storage (Stage 1)</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
