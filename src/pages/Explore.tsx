import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Search,
  SlidersHorizontal,
  Star,
  X,
  ChevronDown,
  Sparkles,
  Laptop,
  Check,
  Bookmark,
  GitCompare,
  ArrowRight,
  Filter,
  RotateCcw,
} from 'lucide-react';
import { toolsService } from '../services/toolsService';
import type { FilterOptions } from '../services/toolsService';
import type { Tool, Platform, PricingType } from '../types';
import {
  AI_CATEGORY_LIST,
  SOFTWARE_CATEGORY_LIST,
  ALL_CATEGORY_LIST,
  normalizeCategorySlug,
  matchesCategory,
  getCategoryLabel,
} from '../data/categories';
import { useSaved } from '../context/SavedContext';
import { useCompare } from '../context/CompareContext';
import { ToolLogo } from '../components/common/ToolLogo';
import './Explore.css';

/* ─── Differentiated Tool List Item ─── */
function ToolListItem({ tool }: { tool: Tool }) {
  const { isToolSaved, toggleSaveTool } = useSaved();
  const { isInCompare, addToCompare, removeFromCompare } = useCompare();

  const saved = isToolSaved(tool.id);
  const inCompare = isInCompare(tool.id);
  const isAI = tool.type === 'AI';

  const handleSaveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSaveTool(tool.id);
  };

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inCompare) {
      removeFromCompare(tool.id);
    } else {
      addToCompare(tool.id);
    }
  };

  return (
    <div className={`explore-tool-card ${isAI ? 'card-type-ai' : 'card-type-software'}`}>
      <div className="etc-main-row">
        {/* Tool Logo square */}
        <Link to={`/tools/${tool.id}`} className="etc-logo-link">
          <ToolLogo id={tool.id} name={tool.name} size={48} />
        </Link>

        {/* Content Body */}
        <div className="etc-body">
          {/* Top Info Row */}
          <div className="etc-header-row">
            <div className="etc-identity">
              <Link to={`/tools/${tool.id}`} className="etc-name-link">
                <h3 className="etc-name">{tool.name}</h3>
              </Link>

              {/* Differentiated Category Badge */}
              <span className={`etc-category-badge ${isAI ? 'cat-ai' : 'cat-software'}`}>
                {isAI ? <Sparkles size={11} /> : <Laptop size={11} />}
                {tool.type} &gt; {tool.category}
              </span>

              {/* Star Rating */}
              <div className="etc-rating">
                <Star size={13} fill="#F59E0B" color="#F59E0B" />
                <span className="etc-rating-val">{tool.rating.toFixed(1)}</span>
                <span className="etc-rating-count">
                  ({tool.reviewCount >= 1000 ? `${(tool.reviewCount / 1000).toFixed(1)}k` : tool.reviewCount})
                </span>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="etc-actions">
              <span className={`etc-pricing-badge badge-${tool.pricing.toLowerCase()}`}>
                {tool.pricing}
              </span>

              <button
                onClick={handleCompareClick}
                className={`etc-action-btn ${inCompare ? 'btn-active-compare' : ''}`}
                title={inCompare ? 'Remove from compare' : 'Add to compare'}
              >
                <GitCompare size={15} />
              </button>

              <button
                onClick={handleSaveClick}
                className={`etc-action-btn ${saved ? 'btn-active-saved' : ''}`}
                title={saved ? 'Remove from saved' : 'Save tool'}
              >
                <Bookmark size={15} fill={saved ? 'var(--primary)' : 'none'} />
              </button>
            </div>
          </div>

          {/* Tagline / Summary */}
          <p className="etc-description">{tool.description || tool.tagline}</p>

          {/* Differentiated Metadata Callout: AI vs Software */}
          <div className="etc-focus-area">
            {isAI ? (
              <div className="etc-focus-pill ai-focus">
                <span className="focus-label">AI Capability:</span>
                <span className="focus-text">
                  {tool.primaryCapability || tool.aiCapabilities[0] || 'Autonomous Reasoning'}
                </span>
              </div>
            ) : (
              <div className="etc-focus-pill software-focus">
                <span className="focus-label">Key Workflow:</span>
                <span className="focus-text">
                  {tool.keyWorkflow || tool.features[0] || 'Professional Production'}
                </span>
              </div>
            )}

            {tool.bestFor && (
              <div className="etc-best-for">
                <span className="bestfor-label">Best for:</span>
                <span className="bestfor-text">{tool.bestFor}</span>
              </div>
            )}
          </div>

          {/* Footer: Platforms & View link */}
          <div className="etc-footer-row">
            <div className="etc-platforms">
              {tool.platforms.map((p) => (
                <span key={p} className="etc-platform-pill">
                  {p}
                </span>
              ))}
            </div>

            <Link to={`/tools/${tool.id}`} className="etc-view-link">
              <span>View specs</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Filter Section Accordion ─── */
function FilterGroup({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="filter-group-block">
      <button
        type="button"
        className="filter-group-title"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        <ChevronDown
          size={14}
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'none',
            transition: 'transform 150ms ease',
          }}
        />
      </button>
      {isOpen && <div className="filter-group-content">{children}</div>}
    </div>
  );
}

export const Explore: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Parse type from URL
  const rawType = searchParams.get('type') || 'All';
  const parsedType: 'All' | 'AI' | 'Software' =
    rawType.toLowerCase() === 'ai'
      ? 'AI'
      : rawType.toLowerCase() === 'software'
      ? 'Software'
      : 'All';

  // Parse category from URL
  const rawCat = searchParams.get('category') || 'All';
  const parsedCategory = rawCat === 'All' ? 'All' : normalizeCategorySlug(rawCat);

  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [filters, setFilters] = useState<FilterOptions>({
    query: searchParams.get('q') || '',
    type: parsedType,
    category: parsedCategory,
    pricing: (searchParams.get('pricing') as any) || 'All',
    platform: (searchParams.get('platform') as any) || 'All',
    sortBy: (searchParams.get('sort') as any) || 'trending',
  });

  const [allTools, setAllTools] = useState<Tool[]>([]);
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Load all tools for computing live counts
  useEffect(() => {
    toolsService.getTools().then(setAllTools);
  }, []);

  // Sync URL params to state whenever URL changes
  useEffect(() => {
    const q = searchParams.get('q') || '';
    const tRaw = searchParams.get('type') || 'All';
    const tNorm: 'All' | 'AI' | 'Software' =
      tRaw.toLowerCase() === 'ai'
        ? 'AI'
        : tRaw.toLowerCase() === 'software'
        ? 'Software'
        : 'All';
    const cRaw = searchParams.get('category') || 'All';
    const cNorm = cRaw === 'All' ? 'All' : normalizeCategorySlug(cRaw);

    setQuery(q);
    setFilters((prev) => ({
      ...prev,
      query: q,
      type: tNorm,
      category: cNorm,
      pricing: (searchParams.get('pricing') as any) || 'All',
      platform: (searchParams.get('platform') as any) || 'All',
      sortBy: (searchParams.get('sort') as any) || 'trending',
    }));
  }, [searchParams]);

  // Fetch filtered tools
  useEffect(() => {
    setLoading(true);
    toolsService.getTools({ ...filters, query }).then((data) => {
      setTools(data);
      setLoading(false);
    });
  }, [filters, query]);

  function updateFilters(patch: Partial<FilterOptions>) {
    setFilters((prev) => {
      const next = { ...prev, ...patch };
      const p = new URLSearchParams();
      if (query.trim()) p.set('q', query.trim());
      if (next.type && next.type !== 'All') p.set('type', next.type.toLowerCase());
      if (next.category && next.category !== 'All') p.set('category', normalizeCategorySlug(next.category));
      if (next.pricing && next.pricing !== 'All') p.set('pricing', next.pricing as string);
      if (next.platform && next.platform !== 'All') p.set('platform', next.platform as string);
      if (next.sortBy && next.sortBy !== 'trending') p.set('sort', next.sortBy);
      setSearchParams(p, { replace: true });
      return next;
    });
  }

  function clearAllFilters() {
    setQuery('');
    setFilters({
      query: '',
      type: 'All',
      category: 'All',
      pricing: 'All',
      platform: 'All',
      sortBy: 'trending',
    });
    setSearchParams(new URLSearchParams(), { replace: true });
  }

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    const p = new URLSearchParams(searchParams);
    if (query.trim()) p.set('q', query.trim());
    else p.delete('q');
    setSearchParams(p, { replace: true });
  }

  const hasActiveFilters =
    filters.type !== 'All' ||
    filters.category !== 'All' ||
    filters.pricing !== 'All' ||
    filters.platform !== 'All' ||
    !!query.trim();

  // Dynamic category list based on currently selected Type
  const currentCategoryList = useMemo(() => {
    if (filters.type === 'AI') return AI_CATEGORY_LIST;
    if (filters.type === 'Software') return SOFTWARE_CATEGORY_LIST;
    return ALL_CATEGORY_LIST;
  }, [filters.type]);

  // Calculate live counts for categories based on active tool pool
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    const pool =
      filters.type === 'All'
        ? allTools
        : allTools.filter((t) => t.type.toLowerCase() === filters.type!.toLowerCase());

    counts['All'] = pool.length;
    currentCategoryList.forEach((cat) => {
      if (cat === 'All') return;
      counts[cat] = pool.filter((t) =>
        matchesCategory(t.category, t.categorySlug, cat)
      ).length;
    });
    return counts;
  }, [allTools, filters.type, currentCategoryList]);

  // Dynamic Page Title & Subtitle matching Screen 2
  const getPageHeader = () => {
    if (filters.type === 'AI') {
      return {
        title: 'Explore AI Tools',
        subtitle: 'Discover the best AI tools and neural models for your workflow.',
      };
    }
    if (filters.type === 'Software') {
      return {
        title: 'Explore Software',
        subtitle: 'Discover professional software, developer platforms, and productivity suites.',
      };
    }
    return {
      title: 'Explore AI Tools & Software',
      subtitle: 'Discover the best AI tools and software for your needs.',
    };
  };

  const headerInfo = getPageHeader();

  const pricingOptions: PricingType[] = ['Free', 'Freemium', 'Paid', 'Enterprise'];
  const platformOptions: Platform[] = ['Web', 'macOS', 'Windows', 'Linux', 'iOS', 'Android'];

  return (
    <div className="explore-page-canvas">
      {/* ── Page Header ── */}
      <div className="explore-header-area">
        <h1 className="explore-page-title">{headerInfo.title}</h1>
        <p className="explore-page-subtitle">{headerInfo.subtitle}</p>
      </div>

      {/* ── Top Search & Quick Bar ── */}
      <div className="explore-top-bar">
        <form className="explore-inline-search" onSubmit={handleSearchSubmit}>
          <Search size={17} className="inline-search-icon" />
          <input
            type="text"
            className="inline-search-input"
            placeholder={
              filters.type === 'AI'
                ? 'Search AI tools...'
                : filters.type === 'Software'
                ? 'Search software...'
                : 'Search all tools...'
            }
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              type="button"
              className="inline-clear-btn"
              onClick={() => {
                setQuery('');
                updateFilters({ query: '' });
              }}
            >
              <X size={14} />
            </button>
          )}
        </form>

        <div className="explore-quick-filters">
          {/* Type Quick Selector */}
          <div className="quick-select-pill">
            <span className="quick-label">Type:</span>
            <select
              value={filters.type}
              onChange={(e) => updateFilters({ type: e.target.value as any, category: 'All' })}
              className="quick-dropdown"
            >
              <option value="All">All Types</option>
              <option value="AI">AI Tools</option>
              <option value="Software">Software</option>
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div className="quick-select-pill">
            <span className="quick-label">Sort by:</span>
            <select
              value={filters.sortBy}
              onChange={(e) => updateFilters({ sortBy: e.target.value as any })}
              className="quick-dropdown"
            >
              <option value="trending">Trending</option>
              <option value="rating">Highest Rated</option>
              <option value="name">Name (A-Z)</option>
              <option value="newest">Newest Release</option>
            </select>
          </div>

          {/* Mobile Filter Toggle Button */}
          <button
            className="mobile-filter-trigger"
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
          >
            <SlidersHorizontal size={15} />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* ── Main Two-Column Layout ── */}
      <div className="explore-columns-layout">
        {/* Left Filter Sidebar */}
        <aside className={`explore-filter-sidebar ${mobileFilterOpen ? 'mobile-open' : ''}`}>
          <div className="sidebar-filter-header">
            <div className="filter-title-wrap">
              <Filter size={16} />
              <span className="filter-heading">Filters</span>
            </div>
            {hasActiveFilters && (
              <button className="filter-reset-btn" onClick={clearAllFilters}>
                <RotateCcw size={12} />
                <span>Reset</span>
              </button>
            )}
            {mobileFilterOpen && (
              <button
                className="filter-close-btn"
                onClick={() => setMobileFilterOpen(false)}
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="filter-groups-list">
            {/* 1. Type Filter */}
            <FilterGroup title="Type">
              <div className="filter-options-column">
                {(['All', 'AI', 'Software'] as const).map((t) => (
                  <label key={t} className="filter-checkbox-item">
                    <input
                      type="radio"
                      name="tool-type"
                      checked={filters.type === t}
                      onChange={() => updateFilters({ type: t, category: 'All' })}
                      className="filter-radio-input"
                    />
                    <span className="filter-item-label">
                      {t === 'All' ? 'All Types' : t === 'AI' ? 'AI Tools' : 'Software'}
                    </span>
                  </label>
                ))}
              </div>
            </FilterGroup>

            {/* 2. Category Filter */}
            <FilterGroup title="Category">
              <div className="filter-options-column">
                {currentCategoryList.map((cat) => {
                  const slug = normalizeCategorySlug(cat);
                  const isChecked = filters.category === slug || (cat === 'All' && filters.category === 'All');
                  const count = categoryCounts[cat] ?? 0;

                  return (
                    <label key={cat} className="filter-checkbox-item">
                      <input
                        type="radio"
                        name="tool-category"
                        checked={isChecked}
                        onChange={() => updateFilters({ category: slug })}
                        className="filter-radio-input"
                      />
                      <span className="filter-item-label">{cat}</span>
                      <span className="filter-item-count">{count}</span>
                    </label>
                  );
                })}
              </div>
            </FilterGroup>

            {/* 3. Pricing Filter */}
            <FilterGroup title="Pricing">
              <div className="filter-options-column">
                <label className="filter-checkbox-item">
                  <input
                    type="radio"
                    name="pricing-filter"
                    checked={filters.pricing === 'All'}
                    onChange={() => updateFilters({ pricing: 'All' })}
                    className="filter-radio-input"
                  />
                  <span className="filter-item-label">All Pricing</span>
                </label>
                {pricingOptions.map((price) => (
                  <label key={price} className="filter-checkbox-item">
                    <input
                      type="radio"
                      name="pricing-filter"
                      checked={filters.pricing === price}
                      onChange={() => updateFilters({ pricing: price })}
                      className="filter-radio-input"
                    />
                    <span className="filter-item-label">{price}</span>
                  </label>
                ))}
              </div>
            </FilterGroup>

            {/* 4. Platform Filter */}
            <FilterGroup title="Platform">
              <div className="filter-options-column">
                <label className="filter-checkbox-item">
                  <input
                    type="radio"
                    name="platform-filter"
                    checked={filters.platform === 'All'}
                    onChange={() => updateFilters({ platform: 'All' })}
                    className="filter-radio-input"
                  />
                  <span className="filter-item-label">All Platforms</span>
                </label>
                {platformOptions.map((platform) => (
                  <label key={platform} className="filter-checkbox-item">
                    <input
                      type="radio"
                      name="platform-filter"
                      checked={filters.platform === platform}
                      onChange={() => updateFilters({ platform: platform })}
                      className="filter-radio-input"
                    />
                    <span className="filter-item-label">{platform}</span>
                  </label>
                ))}
              </div>
            </FilterGroup>
          </div>
        </aside>

        {/* Right Results Column */}
        <section className="explore-results-section">
          <div className="results-top-meta">
            <span className="results-count-badge">
              <strong>{tools.length}</strong> results
            </span>

            {hasActiveFilters && (
              <button className="clear-filters-link" onClick={clearAllFilters}>
                Clear filters
              </button>
            )}
          </div>

          {/* Loading Skeleton or Tool List */}
          {loading ? (
            <div className="explore-loading-list">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="skeleton-card" />
              ))}
            </div>
          ) : tools.length === 0 ? (
            <div className="explore-empty-state">
              <div className="empty-icon-box">
                <Search size={32} />
              </div>
              <h3 className="empty-title">No tools found</h3>
              <p className="empty-desc">
                No tools matched your current filters. Try changing category, type, or search term.
              </p>
              <button className="empty-reset-btn" onClick={clearAllFilters}>
                Reset all filters
              </button>
            </div>
          ) : (
            <div className="explore-tools-list">
              {tools.map((tool) => (
                <ToolListItem key={tool.id} tool={tool} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
