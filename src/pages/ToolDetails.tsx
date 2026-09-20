import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom';
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
  Cpu,
  Terminal,
  ThumbsUp,
  AlertCircle,
  Building2,
  ArrowRight
} from 'lucide-react';
import { toolsService } from '../services/toolsService';
import type { Tool } from '../types';
import { useCompare } from '../context/CompareContext';
import { useSaved } from '../context/SavedContext';
import { ToolLogo } from '../components/common/ToolLogo';
import { AIModelSection } from '../components/tool/AIModelSection';
import { DeveloperCompanySection } from '../components/tool/DeveloperCompanySection';
import { DeveloperApiSection } from '../components/tool/DeveloperApiSection';
import { ReviewsSection } from '../components/tool/ReviewsSection';
import './ToolDetails.css';

const TAB_PARAM_MAP: Record<string, string> = {
  overview: 'Overview',
  models: 'Models & Architecture',
  features: 'Features & Capabilities',
  api: 'API & Developers',
  pricing: 'Pricing',
  platforms: 'Platforms',
  usecases: 'Use Cases',
  alternatives: 'Alternatives',
  reviews: 'Reviews & Research'
};

const REVERSE_TAB_MAP: Record<string, string> = {
  Overview: 'overview',
  'Models & Architecture': 'models',
  'Features & Capabilities': 'features',
  'API & Developers': 'api',
  Pricing: 'pricing',
  Platforms: 'platforms',
  'Use Cases': 'usecases',
  Alternatives: 'alternatives',
  'Reviews & Research': 'reviews'
};

export const ToolDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [tool, setTool] = useState<Tool | null>(null);
  const [alternatives, setAlternatives] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);

  // Initialize active tab from query param if provided
  const tabParam = searchParams.get('tab')?.toLowerCase();
  const initialTab = tabParam && TAB_PARAM_MAP[tabParam] ? TAB_PARAM_MAP[tabParam] : 'Overview';
  const [activeTab, setActiveTab] = useState<string>(initialTab);

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

  useEffect(() => {
    if (tabParam && TAB_PARAM_MAP[tabParam]) {
      setActiveTab(TAB_PARAM_MAP[tabParam]);
    }
  }, [tabParam]);

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
    const paramKey = REVERSE_TAB_MAP[tabName] || 'overview';
    setSearchParams({ tab: paramKey }, { replace: true });
  };

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
          <p>We couldn't locate the requested tool research dossier.</p>
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
  const hasModels = isAI || (tool.modelFamilies && tool.modelFamilies.length > 0);

  // Available tabs for this tool
  const availableTabs = [
    'Overview',
    ...(hasModels ? ['Models & Architecture'] : []),
    'Features & Capabilities',
    'API & Developers',
    'Pricing',
    'Platforms',
    'Use Cases',
    'Alternatives',
    'Reviews & Research'
  ];

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
                  <span className="td-verified-badge" title="Verified Publisher by ToolWise Labs">
                    <ShieldCheck size={14} />
                    <span>Verified Dossier</span>
                  </span>
                )}
                {hasModels && (
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      fontSize: '0.6875rem',
                      fontWeight: 700,
                      color: 'var(--primary)',
                      background: 'rgba(99, 102, 241, 0.15)',
                      border: '1px solid rgba(99, 102, 241, 0.3)',
                      padding: '0.15rem 0.55rem',
                      borderRadius: 'var(--radius-full)'
                    }}
                  >
                    <Sparkles size={11} />
                    Model Research Active
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
              <span>Visit Official Site</span>
              <ExternalLink size={14} />
            </a>

            <button
              type="button"
              onClick={handleCompareClick}
              className={`td-btn-outline ${inCompare ? 'btn-active-state' : ''}`}
            >
              <GitCompare size={15} />
              <span>{inCompare ? 'In Compare Dock' : 'Compare Tool'}</span>
            </button>

            <button
              type="button"
              onClick={handleSaveClick}
              className={`td-btn-outline ${saved ? 'btn-active-state' : ''}`}
            >
              <Bookmark size={15} fill={saved ? 'currentColor' : 'none'} />
              <span>{saved ? 'Saved' : 'Save Dossier'}</span>
            </button>
          </div>
        </div>

        {/* Right Dark Feature / Visual Preview Card */}
        <div className="td-identity-right">
          <div className="td-dark-preview-card">
            <div className="dark-card-glow" />
            <div className="dark-card-content">
              <span className="dark-card-badge">
                {isAI ? 'Frontier AI Model System' : 'Production Software'}
              </span>
              <h3 className="dark-card-heading">
                {tool.id === 'chatgpt'
                  ? 'Get answers. Find inspiration. Be more productive.'
                  : tool.id === 'gemini'
                  ? 'The 2,000,000 token multimodal AI frontier.'
                  : tool.id === 'claude'
                  ? 'Frontier intelligence with gold-standard software engineering.'
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
        {availableTabs.map((tab) => (
          <button
            key={tab}
            type="button"
            className={`td-tab-btn ${activeTab === tab ? 'tab-active' : ''}`}
            onClick={() => handleTabChange(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ── Tab Content Canvas ── */}
      <div className="td-tab-content-container">
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'Overview' && (
          <section className="td-tab-pane">
            <div className="td-split-overview-grid">
              {/* Left Column */}
              <div className="td-overview-left">
                {/* Developer Company Info */}
                {tool.developerInfo && (
                  <DeveloperCompanySection info={tool.developerInfo} toolName={tool.name} />
                )}

                {/* About & Specs */}
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
                      <span className="spec-label">Primary Capability</span>
                      <span className="spec-value">{tool.primaryCapability || tool.tagline}</span>
                    </div>
                  </div>
                </div>

                {/* Key Features */}
                <div className="td-card-box">
                  <h3 className="td-card-heading">Key Features &amp; Tool Capabilities</h3>
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

              {/* Right Column: Key Pricing Snapshot & Quick Actions */}
              <div className="td-overview-right">
                <div className="td-card-box">
                  <h3 className="td-card-heading">Pricing Overview</h3>
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
                        <button
                          type="button"
                          onClick={() => handleTabChange('Pricing')}
                          className="tier-btn"
                        >
                          View Full Pricing
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Model quick card if AI */}
                {hasModels && (
                  <div
                    className="td-card-box"
                    style={{
                      background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.06) 100%)',
                      borderColor: 'rgba(99, 102, 241, 0.25)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Cpu size={16} style={{ color: 'var(--primary)' }} />
                      <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                        AI Model Breakdown Available
                      </h4>
                    </div>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                      Inspect individual model checkpoints, benchmarks, token pricing, and context limits in the Models tab.
                    </p>
                    <button
                      type="button"
                      onClick={() => handleTabChange('Models & Architecture')}
                      className="td-btn-primary"
                      style={{ alignSelf: 'flex-start', padding: '0.4rem 0.875rem', fontSize: '0.8125rem' }}
                    >
                      <span>Explore Models</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* TAB 2: MODELS & ARCHITECTURE */}
        {activeTab === 'Models & Architecture' && hasModels && (
          <section className="td-tab-pane">
            <AIModelSection families={tool.modelFamilies || []} toolName={tool.name} />
          </section>
        )}

        {/* TAB 3: FEATURES & CAPABILITIES */}
        {activeTab === 'Features & Capabilities' && (
          <section className="td-tab-pane">
            <div className="td-card-box">
              <h3 className="td-card-heading">
                <Sparkles size={18} className="icon-ai-inline" />
                <span>{isAI ? 'Neural AI Capabilities & Architecture' : 'Core Features & Capabilities'}</span>
              </h3>
              <p className="td-body-paragraph">
                Comprehensive technical overview of capabilities, reasoning architectures, and automated workflows.
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

            {/* Strengths & Limitations */}
            <div className="td-pros-cons-grid">
              <div className="td-pros-card">
                <h4 className="pros-title">
                  <ThumbsUp size={15} />
                  <span>Strengths &amp; Advantages</span>
                </h4>
                <ul className="pros-list">
                  {(tool.strengths || tool.pros).map((pro, i) => (
                    <li key={i}>
                      <Check size={15} className="pro-icon" />
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="td-cons-card">
                <h4 className="cons-title">
                  <AlertCircle size={15} />
                  <span>Limitations &amp; Trade-offs</span>
                </h4>
                <ul className="cons-list">
                  {(tool.limitations || tool.cons).map((con, i) => (
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

        {/* TAB 4: API & DEVELOPER INFO */}
        {activeTab === 'API & Developers' && (
          <section className="td-tab-pane">
            <DeveloperApiSection
              apiInfo={
                tool.apiInfo || {
                  hasApi: false,
                  documentationUrl: tool.websiteUrl
                }
              }
              toolName={tool.name}
            />
          </section>
        )}

        {/* TAB 5: PRICING */}
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

        {/* TAB 6: PLATFORMS */}
        {activeTab === 'Platforms' && (
          <section className="td-tab-pane">
            <div className="td-card-box">
              <h3 className="td-card-heading">Supported Platforms &amp; Environments</h3>
              <p className="td-body-paragraph">
                {tool.name} operates natively across the following client platforms, web operating systems, and ecosystems.
              </p>
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

        {/* TAB 7: USE CASES */}
        {activeTab === 'Use Cases' && (
          <section className="td-tab-pane">
            <div className="td-card-box">
              <h3 className="td-card-heading">Recommended Workflows &amp; Best Use Cases</h3>
              <p className="td-body-paragraph">
                Optimal applications where {tool.name} delivers peak velocity and proven return on investment.
              </p>
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

        {/* TAB 8: ALTERNATIVES & COMPETITORS */}
        {activeTab === 'Alternatives' && (
          <section className="td-tab-pane">
            {/* Direct Competitor Comparison Matrix */}
            {tool.competitorComparisons && tool.competitorComparisons.length > 0 && (
              <div className="td-card-box">
                <h3 className="td-card-heading">
                  <GitCompare size={18} style={{ color: 'var(--primary)' }} />
                  <span>Direct Market Competitors &amp; Differentiators</span>
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                  {tool.competitorComparisons.map((comp) => (
                    <div
                      key={comp.toolId}
                      style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                        borderRadius: 'var(--radius-lg)',
                        padding: '1.25rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '1rem'
                      }}
                    >
                      <div style={{ flex: 1, minWidth: '240px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                          <h5 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                            {comp.name}
                          </h5>
                          <span
                            style={{
                              fontSize: '0.6875rem',
                              color: 'var(--text-muted)',
                              background: 'rgba(255,255,255,0.06)',
                              padding: '0.15rem 0.5rem',
                              borderRadius: 'var(--radius-full)'
                            }}
                          >
                            Migration: {comp.migrationEase}
                          </span>
                        </div>
                        <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                          <strong style={{ color: 'var(--green)' }}>Advantage:</strong> {comp.advantage}
                        </p>
                        <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.45, marginTop: '0.2rem' }}>
                          <strong>Alternative Angle:</strong> {comp.disadvantage}
                        </p>
                      </div>

                      <Link
                        to={`/compare?tools=${tool.id},${comp.toolId}`}
                        className="td-btn-outline"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8125rem' }}
                      >
                        <GitCompare size={14} />
                        <span>Compare Side-by-Side</span>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Alternative Cards Grid */}
            <div className="td-card-box">
              <h3 className="td-card-heading">Similar Verified Tools</h3>
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
            </div>
          </section>
        )}

        {/* TAB 9: REVIEWS & RESEARCH */}
        {activeTab === 'Reviews & Research' && (
          <section className="td-tab-pane">
            <ReviewsSection
              reviews={tool.userReviews}
              rating={tool.rating}
              reviewCount={tool.reviewCount}
              toolId={tool.id}
              relatedResearchSlugs={tool.relatedResearchSlugs}
            />
          </section>
        )}
      </div>
    </div>
  );
};
