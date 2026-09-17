import React from 'react';

interface SectionHeaderProps {
  label?: string;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  count?: number;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  label,
  title,
  subtitle,
  action,
  count
}) => {
  return (
    <div className="section-header-container" style={{ marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
        <div>
          {label && (
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '0.25rem'
              }}
            >
              {label}
            </div>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <h2>{title}</h2>
            {count !== undefined && (
              <span
                style={{
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  background: 'var(--bg-surface-subtle)',
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border-subtle)',
                  padding: '0.125rem 0.5rem',
                  borderRadius: 'var(--radius-full)'
                }}
              >
                {count}
              </span>
            )}
          </div>
          {subtitle && (
            <p style={{ marginTop: '0.25rem', fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>
              {subtitle}
            </p>
          )}
        </div>
        {action && <div>{action}</div>}
      </div>
    </div>
  );
};
