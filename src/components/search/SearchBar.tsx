import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onClear?: () => void;
  totalResults?: number;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search AI tools, software, features, or use cases...',
  onClear,
  totalResults,
  className = ''
}) => {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        display: 'flex',
        alignItems: 'center'
      }}
      className={className}
    >
      <div
        style={{
          position: 'absolute',
          left: '14px',
          color: 'var(--text-muted)',
          display: 'flex',
          alignItems: 'center',
          pointerEvents: 'none'
        }}
      >
        <Search size={18} />
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '0.75rem 3.5rem 0.75rem 2.75rem',
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          fontSize: '0.9375rem',
          color: 'var(--text-primary)',
          boxShadow: 'var(--shadow-xs)',
          outline: 'none',
          transition: 'all var(--transition-fast)'
        }}
        onFocus={(e) => {
          e.target.style.borderColor = 'var(--accent-primary)';
          e.target.style.boxShadow = 'var(--shadow-sm)';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = 'var(--border-subtle)';
          e.target.style.boxShadow = 'var(--shadow-xs)';
        }}
      />

      <div
        style={{
          position: 'absolute',
          right: '14px',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}
      >
        {totalResults !== undefined && (
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              backgroundColor: 'var(--bg-surface-subtle)',
              padding: '0.15rem 0.45rem',
              borderRadius: 'var(--radius-xs)',
              border: '1px solid var(--border-subtle)'
            }}
          >
            {totalResults} results
          </span>
        )}

        {value && (
          <button
            onClick={() => {
              onChange('');
              onClear?.();
            }}
            style={{
              color: 'var(--text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '2px'
            }}
            title="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
};
