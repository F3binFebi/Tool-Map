import React from 'react';
import { Clock, Calendar, ArrowRight, User } from 'lucide-react';
import { ResearchArticle } from '../../types';
import { Badge } from '../common/Badge';

interface ResearchCardProps {
  article: ResearchArticle;
  featured?: boolean;
  onReadArticle?: (article: ResearchArticle) => void;
}

export const ResearchCard: React.FC<ResearchCardProps> = ({
  article,
  featured = false,
  onReadArticle
}) => {
  return (
    <article
      className="research-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        padding: featured ? '1.75rem' : '1.25rem',
        backgroundColor: 'var(--bg-surface)',
        cursor: 'pointer',
        transition: 'all var(--transition-fast)'
      }}
      onClick={() => onReadArticle?.(article)}
    >
      <div>
        {/* Meta Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '0.75rem'
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.04em'
            }}
          >
            {article.category}
          </span>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontSize: '0.75rem',
              color: 'var(--text-muted)'
            }}
          >
            <Clock size={12} />
            <span>{article.readingTime}</span>
          </div>
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: featured ? '1.375rem' : '1.125rem',
            lineHeight: 1.35,
            marginBottom: '0.625rem',
            color: 'var(--text-primary)'
          }}
        >
          {article.title}
        </h3>

        {/* Short Description */}
        <p
          style={{
            fontSize: '0.875rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            marginBottom: '1rem'
          }}
        >
          {article.description}
        </p>

        {/* Key Takeaways list preview if featured */}
        {featured && article.keyTakeaways && (
          <div
            style={{
              backgroundColor: 'var(--bg-surface-subtle)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '0.875rem 1rem',
              marginBottom: '1rem'
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6875rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                display: 'block',
                marginBottom: '0.35rem'
              }}
            >
              Key Research Findings
            </span>
            <ul style={{ paddingLeft: '1.25rem', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
              {article.keyTakeaways.slice(0, 2).map((takeaway, idx) => (
                <li key={idx} style={{ marginBottom: '0.25rem' }}>
                  {takeaway}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Footer: Author & Related Tools */}
      <div
        style={{
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '0.75rem',
          marginTop: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.75rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: 'var(--bg-surface-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <User size={12} color="var(--text-secondary)" />
          </div>
          <div>
            <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
              {article.author.name}
            </span>
            <span style={{ color: 'var(--text-muted)', marginLeft: '0.35rem' }}>
              · {article.publishedDate}
            </span>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            color: 'var(--accent-primary)',
            fontWeight: 600
          }}
        >
          <span>Read Analysis</span>
          <ArrowRight size={13} />
        </div>
      </div>
    </article>
  );
};
