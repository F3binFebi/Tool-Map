import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ExternalLink,
  GitCompare,
  Bookmark,
  ArrowLeft,
  Star,
  Check,
  X,
  ChevronRight,
  ShieldCheck,
  Calendar,
  Globe,
  DollarSign,
  Layers,
  Sparkles,
  Laptop,
  CheckCircle2,
  Share2,
} from 'lucide-react';
import { toolsService } from '../services/toolsService';
import type { Tool } from '../types';
import { useCompare } from '../context/CompareContext';
import { useSaved } from '../context/SavedContext';
import { ToolLogo } from '../components/common/ToolLogo';
import './ToolDetails.css';

const TABS = [
  'Overview',
  'Features',
  'AI Capabilities',
  'Pricing',
  'Platforms',
  'Use Cases',
  'Pros & Cons',
  'Alternatives',
] as const;

type Tab = typeof TABS[number];

export const ToolDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tool, setTool] = useState<Tool | null>(null);
  const [alternatives, setAlternatives] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('Overview');

  const { addToCompare, removeFromCompare, isInCompare } = useCompare();
  const { isToolSaved, toggleSaveTool, addRecentlyViewed } = useSaved();

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    toolsService.getToolById(id).then((found) => {
      setTool(found);
      if (found) {
        addRecentlyViewed(found.id);
        if (found.alternatives?.length) {
          toolsService.compareTools(found.alternatives).then(setAlternatives);
        }
      }
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="td-canvas td-loading-canvas">
        <div className="td-skeleton-banner" />
        <div className="td-skeleton-tabs" />
        <div className="td-skeleton-content" />
      </div>
    );
  }

  if (!tool) {
    return (
      <div className="td-canvas td-not-found-canvas">
        <div className="td-not-found-card">
          <h2>Tool not found</h2>
          <p>We couldn't locate the requested tool dossier.</p>
          <button onClick={() => navigate('/explore')} className="td-back-explore-btn">
            <ArrowLeft size={16} /> Back to Explore
          </button>
        </div>
      </div>
    );
  }

  const inCompare = isInCompare(tool.id);
  const saved = isToolSaved(tool.id);
  const isAI = tool.type === 'AI';

  const handleCompareClick = () => {
    if (inCompare) {
      removeFromCompare(tool.id);
    } else {
      addToCompare(tool.id);
    }
  };

  const handleSaveClick = () => {
    toggleSaveTool(tool.id);
  };

  return (
    <div className="td-canvas">
      {/* ── Breadcrumb Navigation ── */}
      <nav className="td-breadcrumbs" aria-label="Breadcrumb">
        <Link to="/" className="crumb-link">Home</Link>
        <ChevronRight size={13} className="crumb-sep" />
        <Link
          to={`/explore?type=${tool.type.toLowerCase()}`}
          className="crumb-link"
        >
          {tool.type === 'AI' ? 'AI Tools' : 'Software'}
        </Link>
        <ChevronRight size={13} className="crumb-sep" />
        <Link
          to={`/explore?type=${tool.type.toLowerCase()}&category=${encodeURIComponent(tool.category)}`}
          className="crumb-link"
        >
          {tool.category}
        </Link>
        <ChevronRight size={13} className="crumb-sep" />
        <span className="crumb-current">{tool.name}</span>
      </nav>

      {/* ── Tool Identity Area (Header Banner) ── */}
      <section className="td-identity-banner">
        <div className="td-identity-left">
          <div className="td-identity-top">
            <ToolLogo id={tool.id} name={tool.name} size={64} />

            <div className="td-identity-headings">
              <div className="td-title-row">
                <h1 className="td-tool-name">{tool.name}</h1>
                {tool.verified && (
                  <span className="td-verified-badge" title="Verified Publisher">
                    <ShieldCheck size={14} />
                    <span>Verified</span>
                  </span>
                )}
              </div>

              <div className="td-meta-row">
                <span className={`td-cat-tag ${isAI ? 'tag-ai' : 'tag-soft'}`}>
                  {isAI ? <Sparkles size={11} /> : <Laptop size={11} />}
                  {tool.type} &gt; {tool.category}
                </span>

                <div className="td-star-rating">
                  <Star size={14} fill="#F59E0B" color="#F59E0B" />
                  <span className="td-rating-val">{tool.rating.toFixed(1)}</span>
                  <span className="td-reviews-count">
                    ({tool.reviewCount.toLocaleString()} reviews)
                  </span>
                </div>
              </div>
            </div>
          </div>

          <p className="td-main-description">{tool.description}</p>

          {/* Action Buttons Row */}
          <div className="td-actions-bar">
            <a
              href={tool.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="td-btn-primary"
            >
              <span>Visit Website</span>
              <ExternalLink size={14} />
            </a>

            <button
              type="button"
              onClick={handleCompareClick}
              className={`td-btn-outline ${inCompare ? 'btn-active-state' : ''}`}
            >
              <GitCompare size={15} />
              <span>{inCompare ? 'In Compare' : 'Compare'}</span>
            </button>

            <button
              type="button"
              onClick={handleSaveClick}
              className={`td-btn-outline ${saved ? 'btn-active-state' : ''}`}
            >
              <Bookmark size={15} fill={saved ? 'currentColor' : 'none'} />
              <span>{saved ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </div>

        {/* Right Dark Feature / Visual Preview Card */}
        <div className="td-identity-right">
          <div className="td-dark-preview-card">
            <div className="dark-card-glow" />
            <div className="dark-card-content">
              <span className="dark-card-badge">
                {isAI ? 'Frontier AI Model' : 'Production Software'}
              </span>
              <h3 className="dark-card-heading">
                {tool.id === 'chatgpt'
                  ? 'Get answers. Find inspiration. Be more productive.'
                  : tool.id === 'figma'
                  ? 'The collaborative interface design tool.'
                  : tool.tagline}
              </h3>
              <p className="dark-card-snippet">
                {tool.primaryCapability || tool.keyWorkflow || tool.tagline}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sticky Tab Navigation ── */}
      <div className="td-tab-navigation-bar">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            className={`td-tab-btn ${activeTab === tab ? 'tab-active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ── Tab Content Canvas ── */}
      <div className="td-tab-content-container">
        {/* TAB 1: OVERVIEW */}
        {(activeTab === 'Overview' || activeTab === 'Features') && (
          <section className="td-tab-pane">
            <div className="td-split-overview-grid">
              {/* Left Column: Summary & Spec Meta */}
              <div className="td-overview-left">
                <div className="td-card-box">
                  <h3 className="td-card-heading">About {tool.name}</h3>
                  <p className="td-body-paragraph">{tool.description}</p>

                  <div className="td-specs-meta-grid">
                    <div className="spec-meta-item">
                      <span className="spec-label">Released</span>
                      <span className="spec-value">{tool.releaseYear}</span>
                    </div>
                    <div className="spec-meta-item">
                      <span className="spec-label">Pricing Model</span>
                      <span className="spec-value">{tool.pricing} ({tool.pricingStartingPrice})</span>
                    </div>
                    <div className="spec-meta-item">
                      <span className="spec-label">Category</span>
                      <span className="spec-value">{tool.category}</span>
                    </div>
                    <div className="spec-meta-item">
                      <span className="spec-label">Official Website</span>
                      <a
                        href={tool.websiteUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="spec-link"
                      >
                        {new URL(tool.websiteUrl).hostname}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Key Features List */}
                <div className="td-card-box">
                  <h3 className="td-card-heading">Key Features</h3>
                  <div className="td-features-checklist">
                    {tool.features.map((feature, i) => (
                      <div key={i} className="td-feature-check-item">
                        <CheckCircle2 size={16} className="feature-check-icon" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Key Pricing Snapshot */}
              <div className="td-overview-right">
                <div className="td-card-box">
                  <h3 className="td-card-heading">Pricing Plans</h3>
                  <div className="td-pricing-cards-stack">
                    {tool.pricingTiers.slice(0, 2).map((tier) => (
                      <div key={tier.name} className="td-pricing-tier-card">
                        <div className="tier-header">
                          <span className="tier-name">{tier.name}</span>
                          <span className="tier-price">
                            {tier.price}
                            <span className="tier-period">/month</span>
                          </span>
                        </div>
                        <p className="tier-desc">{tier.description}</p>
                        <ul className="tier-features-list">
                          {tier.features.slice(0, 3).map((f, i) => (
                            <li key={i}>
                              <Check size={13} />
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                        <a
                          href={tool.websiteUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="tier-btn"
                        >
                          Get Started
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* TAB: AI CAPABILITIES */}
        {activeTab === 'AI Capabilities' && (
          <section className="td-tab-pane">
            <div className="td-card-box">
              <h3 className="td-card-heading">
                <Sparkles size={18} className="icon-ai-inline" />
                {isAI ? 'Neural AI Capabilities & Architecture' : 'Intelligent Automations'}
              </h3>
              <p className="td-body-paragraph">
                Detailed technical breakdown of model parameters, reasoning abilities, and multimodal features.
              </p>
              <div className="td-capabilities-grid">
                {tool.aiCapabilities.map((cap, i) => (
                  <div key={i} className="td-capability-item">
                    <div className="cap-bullet" />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* TAB: PRICING */}
        {activeTab === 'Pricing' && (
          <section className="td-tab-pane">
            <div className="td-pricing-grid-full">
              {tool.pricingTiers.map((tier) => (
                <div
                  key={tier.name}
                  className={`td-pricing-tier-full ${tier.isPopular ? 'popular-tier' : ''}`}
                >
                  {tier.isPopular && <div className="popular-badge">Most Popular</div>}
                  <div className="tier-top">
                    <h4 className="tier-title">{tier.name}</h4>
                    <div className="tier-amount-row">
                      <span className="tier-big-price">{tier.price}</span>
                      <span className="tier-per">/month</span>
                    </div>
                    <p className="tier-full-desc">{tier.description}</p>
                  </div>

                  <div className="tier-divider" />

                  <ul className="tier-full-features">
                    {tier.features.map((feat, i) => (
                      <li key={i}>
                        <Check size={14} className="tier-check-icon" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={tool.websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="tier-action-btn"
                  >
                    Get Started with {tier.name}
                  </a>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* TAB: PLATFORMS */}
        {activeTab === 'Platforms' && (
          <section className="td-tab-pane">
            <div className="td-card-box">
              <h3 className="td-card-heading">Supported Platforms & Environments</h3>
              <div className="td-platforms-grid">
                {tool.platforms.map((platform) => (
                  <div key={platform} className="platform-card">
                    <CheckCircle2 size={16} className="platform-check" />
                    <span className="platform-name">{platform}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* TAB: USE CASES */}
        {activeTab === 'Use Cases' && (
          <section className="td-tab-pane">
            <div className="td-card-box">
              <h3 className="td-card-heading">Common Use Cases & Workflows</h3>
              <div className="td-usecases-list">
                {tool.useCases.map((uc, i) => (
                  <div key={i} className="usecase-item">
                    <div className="usecase-num">{i + 1}</div>
                    <span>{uc}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* TAB: PROS & CONS */}
        {activeTab === 'Pros & Cons' && (
          <section className="td-tab-pane">
            <div className="td-pros-cons-grid">
              <div className="td-pros-card">
                <h4 className="pros-title">Pros</h4>
                <ul className="pros-list">
                  {tool.pros.map((pro, i) => (
                    <li key={i}>
                      <Check size={15} className="pro-icon" />
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="td-cons-card">
                <h4 className="cons-title">Cons</h4>
                <ul className="cons-list">
                  {tool.cons.map((con, i) => (
                    <li key={i}>
                      <X size={15} className="con-icon" />
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* TAB: ALTERNATIVES */}
        {activeTab === 'Alternatives' && (
          <section className="td-tab-pane">
            <div className="td-alternatives-grid">
              {alternatives.map((alt) => (
                <div key={alt.id} className="alternative-card">
                  <div className="alt-top">
                    <ToolLogo id={alt.id} name={alt.name} size={42} />
                    <div className="alt-info">
                      <Link to={`/tools/${alt.id}`} className="alt-name">
                        {alt.name}
                      </Link>
                      <span className="alt-cat">{alt.category}</span>
                    </div>
                  </div>
                  <p className="alt-desc">{alt.tagline}</p>
                  <div className="alt-footer">
                    <span className="alt-rating">★ {alt.rating.toFixed(1)}</span>
                    <Link to={`/tools/${alt.id}`} className="alt-view-btn">
                      View Dossier
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
