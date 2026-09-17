import React from 'react';
import { ThumbsUp, ThumbsDown, Check, X } from 'lucide-react';

interface ProsConsProps {
  pros: string[];
  cons: string[];
}

export const ProsCons: React.FC<ProsConsProps> = ({ pros, cons }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.25rem',
        marginTop: '1rem'
      }}
    >
      {/* Pros Block */}
      <div
        style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1rem',
            color: 'var(--color-success)'
          }}
        >
          <ThumbsUp size={16} />
          <h4 style={{ fontSize: '0.9375rem', color: 'var(--text-primary)' }}>
            Key Strengths & Advantages
          </h4>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {pros.map((pro, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.625rem',
                fontSize: '0.875rem',
                color: 'var(--text-secondary)'
              }}
            >
              <div
                style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-success-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '2px',
                  flexShrink: 0
                }}
              >
                <Check size={11} color="var(--color-success)" />
              </div>
              <span>{pro}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Cons Block */}
      <div
        style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1rem',
            color: 'var(--color-danger)'
          }}
        >
          <ThumbsDown size={16} />
          <h4 style={{ fontSize: '0.9375rem', color: 'var(--text-primary)' }}>
            Limitations & Trade-offs
          </h4>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {cons.map((con, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.625rem',
                fontSize: '0.875rem',
                color: 'var(--text-secondary)'
              }}
            >
              <div
                style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-danger-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '2px',
                  flexShrink: 0
                }}
              >
                <X size={11} color="var(--color-danger)" />
              </div>
              <span>{con}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
