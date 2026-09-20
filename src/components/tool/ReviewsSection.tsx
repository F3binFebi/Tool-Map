import React from 'react';
import { Link } from 'react-router-dom';
import { Star, CheckCircle, ThumbsUp, BookOpen, ArrowRight, ShieldCheck } from 'lucide-react';
import type { ToolReviewItem } from '../../types/models';
import { RESEARCH_ARTICLES } from '../../data/research';

interface ReviewsSectionProps {
  reviews?: ToolReviewItem[];
  rating: number;
  reviewCount: number;
  toolId: string;
  relatedResearchSlugs?: string[];
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  reviews = [],
  rating,
  reviewCount,
  toolId,
  relatedResearchSlugs = []
}) => {
  // Find related articles
  const matchedArticles = RESEARCH_ARTICLES.filter(
    (a) =>
      relatedResearchSlugs.includes(a.slug) ||
      relatedResearchSlugs.includes(a.id) ||
      a.relatedToolIds.includes(toolId)
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Reviews Summary Card */}
      <div className="td-card-box">
        <div className="card-top-header">
          <h3 className="td-card-heading">
            <Star size={18} fill="#F59E0B" color="#F59E0B" />
            <span>Community &amp; Verified Enterprise Reviews</span>
          </h3>
          <span
            style={{
              fontSize: '0.8125rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            ★ {rating.toFixed(1)} / 5.0 ({reviewCount.toLocaleString()} evaluations)
          </span>
        </div>

        {reviews.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            No community reviews submitted yet. Be the first to evaluate this tool.
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {reviews.map((rev) => (
              <div
                key={rev.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '0.5rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--text-primary)' }}>
                      {rev.author}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      • {rev.role} {rev.company ? `@ ${rev.company}` : ''}
                    </span>
                    {rev.verifiedUser && (
                      <span
                        title="Verified Enterprise User"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.2rem',
                          fontSize: '0.6875rem',
                          color: 'var(--green)',
                          background: 'var(--green-light)',
                          padding: '0.1rem 0.4rem',
                          borderRadius: 'var(--radius-full)'
                        }}
                      >
                        <ShieldCheck size={11} />
                        Verified
                      </span>
                    )}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', gap: '2px' }}>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          fill={i < rev.rating ? '#F59E0B' : 'rgba(255,255,255,0.15)'}
                          color={i < rev.rating ? '#F59E0B' : 'rgba(255,255,255,0.15)'}
                        />
                      ))}
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{rev.date}</span>
                  </div>
                </div>

                <h5 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {rev.title}
                </h5>

                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {rev.comment}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.25rem' }}>
                  <button
                    type="button"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      fontSize: '0.6875rem',
                      color: 'var(--text-muted)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <ThumbsUp size={11} />
                    <span>Helpful ({rev.helpfulCount})</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Related Lab Research Articles */}
      {matchedArticles.length > 0 && (
        <div className="td-card-box">
          <div className="card-top-header">
            <h3 className="td-card-heading">
              <BookOpen size={18} style={{ color: 'var(--primary)' }} />
              <span>Related Editorial &amp; Lab Research</span>
            </h3>
            <Link
              to="/research"
              style={{
                fontSize: '0.8125rem',
                fontWeight: 600,
                color: 'var(--primary)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}
            >
              <span>View All Research</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '1rem'
            }}
          >
            {matchedArticles.map((art) => (
              <Link
                key={art.id}
                to={`/research?slug=${art.slug}`}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  textDecoration: 'none',
                  transition: 'all var(--transition-fast)'
                }}
                className="hover-card-border"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span
                    style={{
                      fontSize: '0.6875rem',
                      fontWeight: 700,
                      color: 'var(--primary)',
                      background: 'rgba(99, 102, 241, 0.15)',
                      padding: '0.15rem 0.5rem',
                      borderRadius: 'var(--radius-full)'
                    }}
                  >
                    {art.category}
                  </span>
                  <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                    {art.readingTime}
                  </span>
                </div>
                <h5 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.35 }}>
                  {art.title}
                </h5>
                <p
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.4,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {art.description}
                </p>
                <div
                  style={{
                    marginTop: 'auto',
                    paddingTop: '0.5rem',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: 'var(--primary)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}
                >
                  <span>Read Full Evaluation</span>
                  <ArrowRight size={12} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
