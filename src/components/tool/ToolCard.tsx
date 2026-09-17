import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, GitCompare, ExternalLink, Star, Check } from 'lucide-react';
import { Tool } from '../../types';
import { Badge } from '../common/Badge';
import { useCompare } from '../../context/CompareContext';
import { useSaved } from '../../context/SavedContext';

interface ToolCardProps {
  tool: Tool;
  compact?: boolean;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool, compact = false }) => {
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();
  const { isToolSaved, toggleSaveTool } = useSaved();

  const inCompare = isInCompare(tool.id);
  const isSaved = isToolSaved(tool.id);

  const handleCompareToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inCompare) {
      removeFromCompare(tool.id);
    } else {
      addToCompare(tool.id);
    }
  };

  const handleSaveToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSaveTool(tool.id);
  };

  return (
    <div
      className="research-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        position: 'relative',
        padding: compact ? '1rem' : '1.25rem'
      }}
    >
      <div>
        {/* Header: Logo, Name, Badges & Actions */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '0.75rem',
            marginBottom: '0.75rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.875rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-primary)',
                flexShrink: 0
              }}
            >
              {tool.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Link
                  to={`/tools/${tool.id}`}
                  style={{
                    fontWeight: 600,
                    fontSize: '1rem',
                    color: 'var(--text-primary)',
                    textDecoration: 'none'
                  }}
                  className="hover-underline"
                >
                  {tool.name}
                </Link>
                {tool.verified && (
                  <span title="Verified by ToolWise Research Labs">
                    <Badge variant="verified" icon>
                      Verified
                    </Badge>
                  </span>
                )}
              </div>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-muted)'
                }}
              >
                {tool.category}
              </span>
            </div>
          </div>

          {/* Quick Action Icons: Save & Compare */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <button
              onClick={handleCompareToggle}
              style={{
                padding: '0.35rem',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: inCompare ? 'var(--accent-primary)' : 'transparent',
                color: inCompare ? 'var(--text-inverted)' : 'var(--text-muted)',
                border: inCompare ? '1px solid var(--accent-primary)' : '1px solid transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all var(--transition-fast)'
              }}
              title={inCompare ? 'Remove from compare' : 'Add to compare'}
            >
              <GitCompare size={15} />
            </button>

            <button
              onClick={handleSaveToggle}
              style={{
                padding: '0.35rem',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: isSaved ? 'var(--bg-surface-subtle)' : 'transparent',
                color: isSaved ? 'var(--accent-primary)' : 'var(--text-muted)',
                border: isSaved ? '1px solid var(--border-medium)' : '1px solid transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all var(--transition-fast)'
              }}
              title={isSaved ? 'Remove from saved' : 'Save tool'}
            >
              <Bookmark size={15} fill={isSaved ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>

        {/* Tagline / Description */}
        <p
          style={{
            fontSize: '0.875rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.5,
            marginBottom: '0.875rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {tool.tagline}
        </p>

        {/* Best For Callout */}
        <div
          style={{
            fontSize: '0.75rem',
            backgroundColor: 'var(--bg-surface-subtle)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-sm)',
            padding: '0.4rem 0.625rem',
            marginBottom: '0.875rem',
            color: 'var(--text-secondary)'
          }}
        >
          <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Best for: </strong>
          {tool.bestFor}
        </div>
      </div>

      {/* Footer Meta: Pricing, Platforms, and Details Link */}
      <div
        style={{
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '0.75rem',
          marginTop: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.75rem',
          flexWrap: 'wrap',
          gap: '0.5rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Badge
            variant={
              tool.pricing === 'Free'
                ? 'free'
                : tool.pricing === 'Freemium'
                ? 'freemium'
                : 'paid'
            }
          >
            {tool.pricing}
          </Badge>
          <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
            {tool.pricingStartingPrice}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6875rem',
              color: 'var(--text-muted)'
            }}
          >
            {tool.platforms.slice(0, 3).join(' · ')}
            {tool.platforms.length > 3 ? ` +${tool.platforms.length - 3}` : ''}
          </span>
          <Link
            to={`/tools/${tool.id}`}
            style={{
              fontWeight: 500,
              color: 'var(--accent-primary)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '2px'
            }}
          >
            Research →
          </Link>
        </div>
      </div>
    </div>
  );
};
