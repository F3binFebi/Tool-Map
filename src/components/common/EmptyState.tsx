import React from 'react';
import { SearchX } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
  title?: string;
  description?: string;
  onReset?: () => void;
  resetText?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No tools found matching your criteria',
  description = 'Try broadening your search query, clearing filters, or exploring related categories.',
  onReset,
  resetText = 'Clear all filters'
}) => {
  return (
    <div
      style={{
        padding: '4rem 2rem',
        textAlign: 'center',
        background: 'var(--bg-surface)',
        border: '1px dashed var(--border-medium)',
        borderRadius: 'var(--radius-lg)',
        maxWidth: '540px',
        margin: '2rem auto'
      }}
    >
      <div
        style={{
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          backgroundColor: 'var(--bg-surface-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.25rem',
          color: 'var(--text-muted)'
        }}
      >
        <SearchX size={26} />
      </div>
      <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>{title}</h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
        {description}
      </p>
      {onReset && (
        <Button variant="secondary" onClick={onReset} size="sm">
          {resetText}
        </Button>
      )}
    </div>
  );
};
