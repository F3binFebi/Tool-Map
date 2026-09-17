import React from 'react';
import { SlidersHorizontal, RotateCcw } from 'lucide-react';
import { FilterOptions } from '../../services/toolsService';
import { ToolType, PricingType, Platform } from '../../types';

interface FilterPanelProps {
  filters: FilterOptions;
  onFilterChange: (updated: Partial<FilterOptions>) => void;
  onReset: () => void;
  categories: { id: string; name: string }[];
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFilterChange,
  onReset,
  categories
}) => {
  const toolTypes: (ToolType | 'All')[] = ['All', 'AI', 'Software'];
  const pricingOptions: (PricingType | 'All')[] = ['All', 'Free', 'Freemium', 'Paid'];
  const platforms: (Platform | 'All')[] = ['All', 'Web', 'macOS', 'Windows', 'Linux', 'iOS', 'Android'];
  const sortOptions = [
    { value: 'trending', label: 'Curated Trending' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'name', label: 'Alphabetical (A-Z)' },
    { value: 'newest', label: 'Newest Release' }
  ];

  return (
    <aside
      style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        height: 'fit-content'
      }}
      className="filter-panel"
    >
      {/* Filter Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: '0.75rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <SlidersHorizontal size={16} color="var(--accent-primary)" />
          <h4 style={{ fontSize: '0.9375rem', fontWeight: 600 }}>Filter Research</h4>
        </div>
        <button
          onClick={onReset}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: '0.2rem 0.4rem',
            borderRadius: 'var(--radius-xs)'
          }}
          title="Reset all filters"
        >
          <RotateCcw size={12} />
          <span>Reset</span>
        </button>
      </div>

      {/* Sort By Selection */}
      <div>
        <label
          style={{
            display: 'block',
            fontSize: '0.75rem',
            fontFamily: 'var(--font-mono)',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            fontWeight: 600,
            marginBottom: '0.5rem'
          }}
        >
          Sort Order
        </label>
        <select
          value={filters.sortBy || 'trending'}
          onChange={(e) => onFilterChange({ sortBy: e.target.value as any })}
          style={{
            width: '100%',
            padding: '0.45rem 0.65rem',
            backgroundColor: 'var(--bg-primary)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.8125rem',
            color: 'var(--text-primary)',
            outline: 'none',
            cursor: 'pointer'
          }}
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Tool Classification: All / AI / Software */}
      <div>
        <label
          style={{
            display: 'block',
            fontSize: '0.75rem',
            fontFamily: 'var(--font-mono)',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            fontWeight: 600,
            marginBottom: '0.5rem'
          }}
        >
          Tool Classification
        </label>
        <div style={{ display: 'flex', gap: '0.35rem' }}>
          {toolTypes.map((type) => {
            const isSelected = (filters.type || 'All') === type;
            return (
              <button
                key={type}
                onClick={() => onFilterChange({ type })}
                style={{
                  flex: 1,
                  padding: '0.35rem 0.5rem',
                  fontSize: '0.75rem',
                  fontWeight: isSelected ? 600 : 500,
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: isSelected ? 'var(--accent-primary)' : 'var(--bg-primary)',
                  color: isSelected ? 'var(--text-inverted)' : 'var(--text-secondary)',
                  border: isSelected ? '1px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
              >
                {type}
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Dropdown/Selector */}
      <div>
        <label
          style={{
            display: 'block',
            fontSize: '0.75rem',
            fontFamily: 'var(--font-mono)',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            fontWeight: 600,
            marginBottom: '0.5rem'
          }}
        >
          Domain Category
        </label>
        <select
          value={filters.category || 'All'}
          onChange={(e) => onFilterChange({ category: e.target.value })}
          style={{
            width: '100%',
            padding: '0.45rem 0.65rem',
            backgroundColor: 'var(--bg-primary)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.8125rem',
            color: 'var(--text-primary)',
            outline: 'none',
            cursor: 'pointer'
          }}
        >
          <option value="All">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Pricing Tier Model */}
      <div>
        <label
          style={{
            display: 'block',
            fontSize: '0.75rem',
            fontFamily: 'var(--font-mono)',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            fontWeight: 600,
            marginBottom: '0.5rem'
          }}
        >
          Pricing Model
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.35rem' }}>
          {pricingOptions.map((price) => {
            const isSelected = (filters.pricing || 'All') === price;
            return (
              <button
                key={price}
                onClick={() => onFilterChange({ pricing: price })}
                style={{
                  padding: '0.35rem 0.5rem',
                  fontSize: '0.75rem',
                  fontWeight: isSelected ? 600 : 500,
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: isSelected ? 'var(--accent-primary)' : 'var(--bg-primary)',
                  color: isSelected ? 'var(--text-inverted)' : 'var(--text-secondary)',
                  border: isSelected ? '1px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all var(--transition-fast)'
                }}
              >
                {price}
              </button>
            );
          })}
        </div>
      </div>

      {/* Platform Support */}
      <div>
        <label
          style={{
            display: 'block',
            fontSize: '0.75rem',
            fontFamily: 'var(--font-mono)',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            fontWeight: 600,
            marginBottom: '0.5rem'
          }}
        >
          Target Platform
        </label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
          {platforms.map((plat) => {
            const isSelected = (filters.platform || 'All') === plat;
            return (
              <button
                key={plat}
                onClick={() => onFilterChange({ platform: plat })}
                style={{
                  padding: '0.3rem 0.55rem',
                  fontSize: '0.6875rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: isSelected ? 600 : 500,
                  borderRadius: 'var(--radius-xs)',
                  backgroundColor: isSelected ? 'var(--accent-primary)' : 'var(--bg-primary)',
                  color: isSelected ? 'var(--text-inverted)' : 'var(--text-secondary)',
                  border: isSelected ? '1px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
              >
                {plat}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
