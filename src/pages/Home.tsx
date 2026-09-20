import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  ArrowRight,
  Star,
  Bookmark,
  Sparkles,
  PenTool,
  Layout,
  Code2,
  Cpu,
  GraduationCap,
  Laptop,
  Clock,
  ChevronRight,
  GitCompare,
  BookOpen,
} from 'lucide-react';
import { toolsService } from '../services/toolsService';
import type { Tool, ResearchArticle } from '../types';
import { ToolLogo } from '../components/common/ToolLogo';
import { useSaved } from '../context/SavedContext';
import { resolveSearchIntent, getSearchSuggestions, type SearchSuggestionItem } from '../services/searchIntelligence';
import './Home.css';

const QUICK_SEARCH_TAGS = ['ChatGPT', 'Figma', 'VS Code', 'Canva', 'Notion'];

const PURPOSE_ITEMS = [
  { id: 'write',    label: 'Write',    desc: 'Create content',    icon: PenTool,       color: '#a78bfa', bg: 'rgba(167,139,250,0.15)' },
  { id: 'design',   label: 'Design',   desc: 'Make it beautiful', icon: Layout,        color: '#38bdf8', bg: 'rgba(56,189,248,0.15)' },
  { id: 'code',     label: 'Code',     desc: 'Build & develop',   icon: Code2,         color: '#818cf8', bg: 'rgba(129,140,248,0.15)' },
  { id: 'research', label: 'Research', desc: 'Find answers',      icon: Search,        color: '#fbbf24', bg: 'rgba(251,191,36,0.15)' },
  { id: 'create',   label: 'Create',   desc: 'Generate media',    icon: Sparkles,      color: '#f472b6', bg: 'rgba(244,114,182,0.15)' },
  { id: 'automate', label: 'Automate', desc: 'Save time',         icon: Cpu,           color: '#34d399', bg: 'rgba(52,211,153,0.15)' },
  { id: 'learn',    label: 'Learn',    desc: 'Build knowledge',   icon: GraduationCap, color: '#fb923c', bg: 'rgba(251,146,60,0.15)' },
];

const AI_CATEGORIES = [
  { label: 'Chatbots',     slug: 'chatbots-reasoning' },
  { label: 'Coding',       slug: 'code-dev' },
  { label: 'Image Gen',    slug: 'image-generation' },
  { label: 'Video',        slug: 'video' },
  { label: 'Audio',        slug: 'audio' },
  { label: 'Writing',      slug: 'writing' },
  { label: 'Research',     slug: 'research' },
  { label: 'Education',    slug: 'education' },
  { label: 'Productivity', slug: 'productivity' },
  { label: 'Automation',   slug: 'automation' },
];

const SOFTWARE_CATEGORIES = [
  { label: 'Design',       slug: 'design' },
  { label: 'Development',  slug: 'development' },
  { label: 'Video Editing',slug: 'video-editing' },
  { label: 'Productivity', slug: 'productivity' },
  { label: '3D',           slug: '3d' },
  { label: 'Collaboration',slug: 'collaboration' },
  { label: 'Education',    slug: 'education' },
  { label: 'Business',     slug: 'business' },
];

const FEATURE_CARDS = [
  {
    id: 'ai',
    to: '/explore?type=ai',
    className: 'feature-card-ai',
    icon: Sparkles,
    title: 'AI Tools',
    desc: 'Chatbots, Image, Video, Writing & more',
  },
  {
    id: 'software',
    to: '/explore?type=software',
    className: 'feature-card-software',
    icon: Laptop,
    title: 'Software',
    desc: 'Design, Dev, Productivity, Video Editing & more',
  },
  {
    id: 'compare',
    to: '/compare',
    className: 'feature-card-compare',
    icon: GitCompare,
    title: 'Compare',
    desc: 'Side by side comparison of top tools',
  },
  {
    id: 'reviews',
    to: '/research',
    className: 'feature-card-reviews',
    icon: BookOpen,
    title: 'Reviews',
    desc: 'Real user reviews & ratings',
  },
];

export default function Home() {
  const navigate = useNavigate();
  const { isToolSaved, toggleSaveTool } = useSaved();
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchSuggestionItem[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchWrapperRef = useRef<HTMLDivElement>(null);
  const [trendingTools, setTrendingTools] = useState<Tool[]>([]);
  const [researchArticles, setResearchArticles] = useState<ResearchArticle[]>([]);

  useEffect(() => {
    toolsService.getTrendingTools().then((tools) => {
      if (tools.length >= 6) {
        setTrendingTools(tools.slice(0, 6));
      } else {
        toolsService.getTools({ sortBy: 'trending' }).then((all) => setTrendingTools(all.slice(0, 6)));
      }
    });
    toolsService.getArticles().then((articles) => {
      setResearchArticles(articles.slice(0, 3));
    });
  }, []);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchWrapperRef.current && !searchWrapperRef.current.contains(e.target as Node)) {
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
    const resolution = resolveSearchIntent(searchQuery.trim());
    navigate(resolution.targetUrl);
    setShowSuggestions(false);
  };

  const handleSelectSuggestion = (targetUrl: string) => {
    navigate(targetUrl);
    setShowSuggestions(false);
    setSearchQuery('');
  };

  const handleTagClick = (tag: string) => {
    const resolution = resolveSearchIntent(tag);
    navigate(resolution.targetUrl);
  };

  const renderSuggIcon = (type: SearchSuggestionItem['iconType']) => {
    switch (type) {
      case 'models':
        return <Cpu size={18} />;
      case 'compare':
        return <GitCompare size={18} />;
      case 'research':
        return <BookOpen size={18} />;
      default:
        return <Sparkles size={18} />;
    }
  };

  return (
    <div className="home-canvas animate-fade-in-up">

      {/* ── 1. Hero Section ── */}
      <section className="home-hero-section">
        <div className="home-hero-container">

          {/* Left Hero Content */}
          <div className="home-hero-left">
            <p className="home-hero-greeting">Hello, xZariel 👋</p>

            <h1 className="home-hero-title">
              Discover the best<br />
              <span className="word-ai">AI tools</span> &amp; <span className="word-software">software</span><br />
              for your ideas
            </h1>

            <p className="home-hero-subtitle">
              Find, compare and explore the perfect tools to boost your productivity, creativity and development.
            </p>

            {/* Search Bar with Intelligence */}
            <div className="home-search-wrapper" ref={searchWrapperRef}>
              <form className="home-search-box" onSubmit={handleSearchSubmit}>
                <Search size={20} className="home-search-icon" />
                <input
                  type="text"
                  className="home-search-input"
                  placeholder="Search ChatGPT, Gemini, Claude, Figma, Canva or 'X vs Y'..."
                  value={searchQuery}
                  onChange={handleInputChange}
                  onFocus={() => {
                    if (suggestions.length > 0) setShowSuggestions(true);
                  }}
                />
                <button type="submit" className="home-search-submit-btn" aria-label="Search">
                  <ArrowRight size={18} />
                </button>
              </form>

              {/* Live autocomplete dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="home-suggestions-dropdown animate-scale-in">
                  {suggestions.map((item) => (
                    <div
                      key={item.id}
                      className="home-suggestion-item"
                      onClick={() => handleSelectSuggestion(item.targetUrl)}
                    >
                      <div className="sugg-left">
                        <div className="sugg-icon-box">{renderSuggIcon(item.iconType)}</div>
                        <div className="sugg-text">
                          <span className="sugg-title">{item.title}</span>
                          <span className="sugg-sub">{item.subtitle}</span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span className="sugg-badge">{item.badge}</span>
                        <ArrowRight size={14} style={{ color: 'var(--text-muted)' }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Tags */}
            <div className="home-quick-tags">
              <span className="home-quick-tags-label">Popular searches:</span>
              {QUICK_SEARCH_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  className="quick-tag-pill"
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Right Hero Visual */}
          <div className="home-hero-right">
            <div className="hero-visual-card">
              <div className="hero-floating-pill">
                <Sparkles size={12} />
                Better tools · Better you
              </div>

              <div className="hero-logos-cluster">
                {[
                  { id: 'chatgpt',    name: 'ChatGPT',    size: 46 },
                  { id: 'figma',      name: 'Figma',      size: 42 },
                  { id: 'claude',     name: 'Claude',     size: 42 },
                  { id: 'notion',     name: 'Notion',     size: 42 },
                  { id: 'midjourney', name: 'Midjourney', size: 40 },
                  { id: 'canva',      name: 'Canva',      size: 42 },
                ].map((tool, i) => (
                  <Link
                    key={tool.id}
                    to={`/tools/${tool.id}`}
                    className={`cluster-logo l-${i + 1}`}
                    title={tool.name}
                  >
                    <ToolLogo id={tool.id} name={tool.name} size={tool.size} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Feature Category Cards ── */}
      <div className="home-feature-cards-grid">
        {FEATURE_CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.id}
              to={card.to}
              className={`feature-card ${card.className}`}
            >
              <div className="feature-card-icon">
                <Icon size={22} color="white" strokeWidth={1.8} />
              </div>
              <div className="feature-card-title">{card.title}</div>
              <div className="feature-card-desc">{card.desc}</div>
              <div className="feature-card-arrow">
                <ArrowRight size={14} />
              </div>
            </Link>
          );
        })}
      </div>

      {/* ── 3. Trending Tools ── */}
      <section className="home-section">
        <div className="home-section-header">
          <div className="section-title-wrap">
            <h2 className="section-title">
              <span className="section-icon">🔥</span> Trending Tools
            </h2>
          </div>
          <Link to="/explore?sort=trending" className="section-view-all">
            <span>View all</span>
            <ChevronRight size={16} />
          </Link>
        </div>

        <div className="trending-cards-grid">
          {trendingTools.map((tool) => {
            const saved = isToolSaved(tool.id);
            return (
              <div key={tool.id} className="trending-card">
                <div className="trending-card-top">
                  <Link to={`/tools/${tool.id}`} className="trending-logo-link">
                    <ToolLogo id={tool.id} name={tool.name} size={42} />
                  </Link>
                  <button
                    className={`card-bookmark-btn ${saved ? 'saved' : ''}`}
                    onClick={(e) => { e.preventDefault(); toggleSaveTool(tool.id); }}
                    title={saved ? 'Remove from saved' : 'Save tool'}
                  >
                    <Bookmark size={15} fill={saved ? 'var(--primary)' : 'none'} />
                  </button>
                </div>

                <Link to={`/tools/${tool.id}`} className="trending-card-info">
                  <h3 className="card-tool-name">{tool.name}</h3>
                  <span className="card-tool-category">
                    {tool.type === 'AI' ? 'AI › ' : ''}{tool.category}
                  </span>

                  <div className="card-meta-row">
                    <div className="card-rating">
                      <Star size={13} fill="#fbbf24" color="#fbbf24" />
                      <span className="rating-val">{tool.rating.toFixed(1)}</span>
                      <span className="reviews-count">
                        ({tool.reviewCount >= 1000 ? `${(tool.reviewCount / 1000).toFixed(1)}k` : tool.reviewCount})
                      </span>
                    </div>
                    <span className="card-pricing-pill">
                      {tool.pricing === 'Free' ? 'Free' : 'Free · Pro'}
                    </span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 4. Explore by Purpose ── */}
      <section className="home-section">
        <div className="home-section-header">
          <div className="section-title-wrap">
            <h2 className="section-title">Explore by Purpose</h2>
          </div>
        </div>

        <div className="purpose-cards-row">
          {PURPOSE_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                to={`/explore?purpose=${item.id}`}
                className="purpose-item-card"
              >
                <div className="purpose-icon-box" style={{ backgroundColor: item.bg, color: item.color }}>
                  <Icon size={20} />
                </div>
                <div className="purpose-text-box">
                  <span className="purpose-title">{item.label}</span>
                  <span className="purpose-desc">{item.desc}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── 5. Popular Categories ── */}
      <section className="home-section">
        <div className="home-section-header">
          <div className="section-title-wrap">
            <h2 className="section-title">Popular Categories</h2>
          </div>
        </div>

        <div className="categories-split-container">
          {/* AI Tools Column */}
          <div className="category-column">
            <div className="column-header">
              <Sparkles size={16} className="col-ai-icon" />
              <h3 className="column-title">AI Tools</h3>
            </div>
            <div className="chips-flow">
              {AI_CATEGORIES.map((cat) => (
                <Link
                  key={cat.label}
                  to={`/explore?type=ai&category=${cat.slug}`}
                  className="category-pill-chip ai-chip"
                >
                  {cat.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Software Column */}
          <div className="category-column">
            <div className="column-header">
              <Laptop size={16} className="col-soft-icon" />
              <h3 className="column-title">Software</h3>
            </div>
            <div className="chips-flow">
              {SOFTWARE_CATEGORIES.map((cat) => (
                <Link
                  key={cat.label}
                  to={`/explore?type=software&category=${cat.slug}`}
                  className="category-pill-chip soft-chip"
                >
                  {cat.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Latest Research & Insights ── */}
      <section className="home-section" style={{ paddingBottom: '2rem' }}>
        <div className="home-section-header">
          <div className="section-title-wrap">
            <h2 className="section-title">Latest Research &amp; Insights</h2>
          </div>
          <Link to="/research" className="section-view-all">
            <span>View all articles</span>
            <ChevronRight size={16} />
          </Link>
        </div>

        <div className="research-preview-grid">
          {researchArticles.map((article) => (
            <Link
              key={article.id}
              to={`/research?slug=${article.slug}`}
              className="research-preview-card"
            >
              <div className="research-preview-content">
                <div className="research-tag-row">
                  <span className="research-badge">{article.category}</span>
                  <span className="research-read-time">
                    <Clock size={12} />
                    {article.readingTime}
                  </span>
                </div>
                <h3 className="research-article-title">{article.title}</h3>
                <p className="research-article-desc">{article.description}</p>
                <div className="research-date-row">
                  <span>{article.publishedDate}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
