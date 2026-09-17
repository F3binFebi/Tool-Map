import React, { useState, useEffect } from 'react';
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
  CheckCircle2,
  Clock,
  ChevronRight,
} from 'lucide-react';
import { toolsService } from '../services/toolsService';
import type { Tool, ResearchArticle } from '../types';
import { ToolLogo } from '../components/common/ToolLogo';
import { ToolWiseLogo } from '../components/common/ToolWiseLogo';
import { useSaved } from '../context/SavedContext';
import './Home.css';

const QUICK_SEARCH_TAGS = ['ChatGPT', 'Figma', 'Canva', 'Cursor', 'Notion', 'Midjourney'];

const PURPOSE_ITEMS = [
  { id: 'write', label: 'Write', desc: 'Create content', icon: PenTool, color: '#8B5CF6', bg: '#F5F3FF' },
  { id: 'design', label: 'Design', desc: 'Make it beautiful', icon: Layout, color: '#0284C7', bg: '#F0F9FF' },
  { id: 'code', label: 'Code', desc: 'Build & develop', icon: Code2, color: '#2563EB', bg: '#EFF6FF' },
  { id: 'research', label: 'Research', desc: 'Find answers', icon: Search, color: '#D97706', bg: '#FFFBEB' },
  { id: 'create', label: 'Create', desc: 'Generate new media', icon: Sparkles, color: '#EC4899', bg: '#FDF2F8' },
  { id: 'automate', label: 'Automate', desc: 'Save time', icon: Cpu, color: '#10B981', bg: '#ECFDF5' },
  { id: 'learn', label: 'Learn', desc: 'Build knowledge', icon: GraduationCap, color: '#6366F1', bg: '#EEF2FF' },
];

const AI_CATEGORIES = [
  { label: 'Chatbots', slug: 'chatbots-reasoning' },
  { label: 'Coding', slug: 'code-dev' },
  { label: 'Image', slug: 'image-generation' },
  { label: 'Video', slug: 'video' },
  { label: 'Audio', slug: 'audio' },
  { label: 'Writing', slug: 'writing' },
  { label: 'Research', slug: 'research' },
  { label: 'Education', slug: 'education' },
  { label: 'Productivity', slug: 'productivity' },
  { label: 'Automation', slug: 'automation' },
];

const SOFTWARE_CATEGORIES = [
  { label: 'Design', slug: 'design' },
  { label: 'Development', slug: 'development' },
  { label: 'Video Editing', slug: 'video-editing' },
  { label: 'Productivity', slug: 'productivity' },
  { label: '3D', slug: '3d' },
  { label: 'Collaboration', slug: 'collaboration' },
  { label: 'Education', slug: 'education' },
  { label: 'Business', slug: 'business' },
];

export default function Home() {
  const navigate = useNavigate();
  const { isToolSaved, toggleSaveTool } = useSaved();
  const [searchQuery, setSearchQuery] = useState('');
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

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleTagClick = (tag: string) => {
    navigate(`/explore?q=${encodeURIComponent(tag)}`);
  };

  return (
    <div className="home-canvas">
      {/* ── 1. Hero Section ── */}
      <section className="home-hero-section">
        <div className="home-hero-container">
          {/* Left Hero Content */}
          <div className="home-hero-left">
            <div className="home-hero-badge">
              <ToolWiseLogo size="sm" showSubtitle={false} />
            </div>

            <h1 className="home-hero-title">
              Discover. Compare. Choose.
            </h1>

            <p className="home-hero-subtitle">
              Research AI tools and software before you choose them.
            </p>

            {/* Main Interactive Search Input */}
            <form className="home-search-box" onSubmit={handleSearchSubmit}>
              <Search size={20} className="home-search-icon" />
              <input
                type="text"
                className="home-search-input"
                placeholder="Search AI tools, software, features, or use cases..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="home-search-submit-btn" aria-label="Search">
                <ArrowRight size={18} />
              </button>
            </form>

            {/* Quick Search Tag Pills */}
            <div className="home-quick-tags">
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

          {/* Right Hero Visual Card */}
          <div className="home-hero-right">
            <div className="hero-glass-card">
              <div className="hero-glass-header">
                <span className="hero-floating-pill">
                  <Sparkles size={12} />
                  Better tools. Better decisions.
                </span>
              </div>

              {/* Grid of floating tool icons */}
              <div className="hero-logos-cluster">
                <div className="cluster-logo l-1" title="ChatGPT">
                  <ToolLogo id="chatgpt" name="ChatGPT" size={48} />
                </div>
                <div className="cluster-logo l-2" title="Figma">
                  <ToolLogo id="figma" name="Figma" size={44} />
                </div>
                <div className="cluster-logo l-3" title="Canva">
                  <ToolLogo id="canva" name="Canva" size={44} />
                </div>
                <div className="cluster-logo l-4" title="Notion">
                  <ToolLogo id="notion" name="Notion" size={44} />
                </div>
                <div className="cluster-logo l-5" title="Cursor">
                  <ToolLogo id="cursor" name="Cursor" size={42} />
                </div>
                <div className="cluster-logo l-6" title="Claude">
                  <ToolLogo id="claude" name="Claude" size={42} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Trending Tools Section ── */}
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
                    onClick={(e) => {
                      e.preventDefault();
                      toggleSaveTool(tool.id);
                    }}
                    title={saved ? 'Remove from saved' : 'Save tool'}
                  >
                    <Bookmark size={15} fill={saved ? 'var(--primary)' : 'none'} />
                  </button>
                </div>

                <Link to={`/tools/${tool.id}`} className="trending-card-info">
                  <h3 className="card-tool-name">{tool.name}</h3>
                  <span className="card-tool-category">
                    {tool.type === 'AI' ? 'AI > ' : ''}{tool.category}
                  </span>

                  <div className="card-meta-row">
                    <div className="card-rating">
                      <Star size={13} fill="#F59E0B" color="#F59E0B" />
                      <span className="rating-val">{tool.rating.toFixed(1)}</span>
                      <span className="reviews-count">({(tool.reviewCount >= 1000 ? `${(tool.reviewCount/1000).toFixed(1)}k` : tool.reviewCount)})</span>
                    </div>

                    <span className="card-pricing-pill">
                      {tool.pricing === 'Free' ? 'Free' : 'Free • Pro'}
                    </span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 3. Explore by Purpose Section ── */}
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
                <div
                  className="purpose-icon-box"
                  style={{ backgroundColor: item.bg, color: item.color }}
                >
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

      {/* ── 4. Popular Categories (AI Tools & Software Split) ── */}
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

      {/* ── 5. Latest Research & Insights ── */}
      <section className="home-section" style={{ paddingBottom: '3.5rem' }}>
        <div className="home-section-header">
          <div className="section-title-wrap">
            <h2 className="section-title">Latest Research & Insights</h2>
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
