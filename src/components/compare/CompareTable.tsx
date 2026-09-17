import React from 'react';
import { Link } from 'react-router-dom';
import { X, Check, Star, ExternalLink, Plus, Layers, Zap, DollarSign, Laptop, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Tool } from '../../types';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

interface CompareTableProps {
  tools: Tool[];
  onRemoveTool: (toolId: string) => void;
  onOpenAddModal: () => void;
}

export const CompareTable: React.FC<CompareTableProps> = ({
  tools,
  onRemoveTool,
  onOpenAddModal
}) => {
  if (tools.length === 0) {
    return null;
  }

  const gridColumns = `220px repeat(${tools.length}, minmax(280px, 1fr)) ${
    tools.length < 4 ? '120px' : ''
  }`;

  return (
    <div style={{ overflowX: 'auto', width: '100%', paddingBottom: '1.5rem' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: gridColumns,
          minWidth: `${220 + tools.length * 280 + (tools.length < 4 ? 120 : 0)}px`,
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          backgroundColor: 'var(--bg-surface)',
          overflow: 'hidden'
        }}
        className="compare-matrix"
      >
        {/* ROW 1: HEADER & TOOL IDENTITY */}
        <div
          style={{
            padding: '1.5rem 1.25rem',
            backgroundColor: 'var(--bg-surface-subtle)',
            borderRight: '1px solid var(--border-subtle)',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end'
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: 'var(--text-muted)',
              textTransform: 'uppercase'
            }}
          >
            Tool Specifications
          </span>
          <h3 style={{ fontSize: '1.125rem', marginTop: '0.25rem' }}>Overview</h3>
        </div>

        {tools.map((tool) => (
          <div
            key={tool.id}
            style={{
              padding: '1.5rem 1.25rem',
              borderRight: '1px solid var(--border-subtle)',
              borderBottom: '1px solid var(--border-subtle)',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  marginBottom: '0.75rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-primary)',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.875rem'
                    }}
                  >
                    {tool.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.125rem' }}>{tool.name}</h3>
                    <Badge variant={tool.type === 'AI' ? 'ai' : 'software'}>{tool.type}</Badge>
                  </div>
                </div>

                <button
                  onClick={() => onRemoveTool(tool.id)}
                  style={{
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    padding: '4px',
                    borderRadius: 'var(--radius-xs)',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                  title="Remove from comparison"
                >
                  <X size={16} />
                </button>
              </div>

              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                {tool.tagline}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              <Link to={`/tools/${tool.id}`} style={{ flex: 1 }}>
                <Button variant="secondary" size="sm" style={{ width: '100%' }}>
                  Full Dossier
                </Button>
              </Link>
              <a
                href={tool.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ flexShrink: 0 }}
              >
                <Button variant="outline" size="sm" icon={<ExternalLink size={13} />} />
              </a>
            </div>
          </div>
        ))}

        {tools.length < 4 && (
          <div
            style={{
              padding: '1.5rem 1rem',
              borderBottom: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'var(--bg-primary)'
            }}
          >
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenAddModal}
              icon={<Plus size={14} />}
              style={{ width: '100%' }}
            >
              Add Tool
            </Button>
          </div>
        )}

        {/* ROW 2: BEST FOR VERDICT */}
        <div
          style={{
            padding: '1.25rem',
            backgroundColor: 'var(--bg-surface-subtle)',
            borderRight: '1px solid var(--border-subtle)',
            borderBottom: '1px solid var(--border-subtle)',
            fontWeight: 600,
            fontSize: '0.875rem'
          }}
        >
          Research Verdict (Best For)
        </div>
        {tools.map((tool) => (
          <div
            key={tool.id}
            style={{
              padding: '1.25rem',
              borderRight: '1px solid var(--border-subtle)',
              borderBottom: '1px solid var(--border-subtle)',
              fontSize: '0.875rem',
              backgroundColor: 'var(--bg-hover)',
              fontWeight: 500,
              color: 'var(--text-primary)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
              <Zap size={16} color="var(--accent-primary)" style={{ marginTop: '2px', flexShrink: 0 }} />
              <span>{tool.bestFor}</span>
            </div>
          </div>
        ))}
        {tools.length < 4 && <div style={{ borderBottom: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-primary)' }} />}

        {/* ROW 3: PRICING & TIERS */}
        <div
          style={{
            padding: '1.25rem',
            backgroundColor: 'var(--bg-surface-subtle)',
            borderRight: '1px solid var(--border-subtle)',
            borderBottom: '1px solid var(--border-subtle)',
            fontWeight: 600,
            fontSize: '0.875rem'
          }}
        >
          Pricing Structure
        </div>
        {tools.map((tool) => (
          <div
            key={tool.id}
            style={{
              padding: '1.25rem',
              borderRight: '1px solid var(--border-subtle)',
              borderBottom: '1px solid var(--border-subtle)',
              fontSize: '0.875rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Badge variant={tool.pricing === 'Free' ? 'free' : 'freemium'}>
                {tool.pricing}
              </Badge>
              <span style={{ fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
                {tool.pricingStartingPrice}
              </span>
            </div>
            <ul style={{ paddingLeft: '1rem', color: 'var(--text-secondary)', fontSize: '0.8125rem' }}>
              {tool.pricingTiers.map((t, idx) => (
                <li key={idx} style={{ marginBottom: '0.25rem' }}>
                  <strong>{t.name}:</strong> {t.price} {t.billingPeriod ? `(${t.billingPeriod})` : ''}
                </li>
              ))}
            </ul>
          </div>
        ))}
        {tools.length < 4 && <div style={{ borderBottom: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-primary)' }} />}

        {/* ROW 4: AI CAPABILITIES */}
        <div
          style={{
            padding: '1.25rem',
            backgroundColor: 'var(--bg-surface-subtle)',
            borderRight: '1px solid var(--border-subtle)',
            borderBottom: '1px solid var(--border-subtle)',
            fontWeight: 600,
            fontSize: '0.875rem'
          }}
        >
          AI Capabilities
        </div>
        {tools.map((tool) => (
          <div
            key={tool.id}
            style={{
              padding: '1.25rem',
              borderRight: '1px solid var(--border-subtle)',
              borderBottom: '1px solid var(--border-subtle)',
              fontSize: '0.8125rem',
              color: 'var(--text-secondary)'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              {tool.aiCapabilities.map((cap, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
                  <Check size={13} color="var(--color-ai)" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>{cap}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
        {tools.length < 4 && <div style={{ borderBottom: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-primary)' }} />}

        {/* ROW 5: CORE FEATURES */}
        <div
          style={{
            padding: '1.25rem',
            backgroundColor: 'var(--bg-surface-subtle)',
            borderRight: '1px solid var(--border-subtle)',
            borderBottom: '1px solid var(--border-subtle)',
            fontWeight: 600,
            fontSize: '0.875rem'
          }}
        >
          Core Platform Features
        </div>
        {tools.map((tool) => (
          <div
            key={tool.id}
            style={{
              padding: '1.25rem',
              borderRight: '1px solid var(--border-subtle)',
              borderBottom: '1px solid var(--border-subtle)',
              fontSize: '0.8125rem',
              color: 'var(--text-secondary)'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              {tool.features.slice(0, 5).map((f, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
                  <Check size={13} color="var(--accent-primary)" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
        {tools.length < 4 && <div style={{ borderBottom: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-primary)' }} />}

        {/* ROW 6: PLATFORM SUPPORT */}
        <div
          style={{
            padding: '1.25rem',
            backgroundColor: 'var(--bg-surface-subtle)',
            borderRight: '1px solid var(--border-subtle)',
            borderBottom: '1px solid var(--border-subtle)',
            fontWeight: 600,
            fontSize: '0.875rem'
          }}
        >
          Supported Platforms
        </div>
        {tools.map((tool) => (
          <div
            key={tool.id}
            style={{
              padding: '1.25rem',
              borderRight: '1px solid var(--border-subtle)',
              borderBottom: '1px solid var(--border-subtle)',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.35rem'
            }}
          >
            {tool.platforms.map((plat) => (
              <span
                key={plat}
                style={{
                  fontSize: '0.6875rem',
                  fontFamily: 'var(--font-mono)',
                  padding: '0.15rem 0.45rem',
                  borderRadius: 'var(--radius-xs)',
                  backgroundColor: 'var(--bg-surface-subtle)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-secondary)'
                }}
              >
                {plat}
              </span>
            ))}
          </div>
        ))}
        {tools.length < 4 && <div style={{ borderBottom: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-primary)' }} />}

        {/* ROW 7: PROS */}
        <div
          style={{
            padding: '1.25rem',
            backgroundColor: 'var(--bg-surface-subtle)',
            borderRight: '1px solid var(--border-subtle)',
            borderBottom: '1px solid var(--border-subtle)',
            fontWeight: 600,
            fontSize: '0.875rem'
          }}
        >
          Key Pros
        </div>
        {tools.map((tool) => (
          <div
            key={tool.id}
            style={{
              padding: '1.25rem',
              borderRight: '1px solid var(--border-subtle)',
              borderBottom: '1px solid var(--border-subtle)',
              fontSize: '0.8125rem',
              color: 'var(--text-secondary)'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              {tool.pros.map((pro, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
                  <ThumbsUp size={13} color="var(--color-success)" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>{pro}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
        {tools.length < 4 && <div style={{ borderBottom: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-primary)' }} />}

        {/* ROW 8: CONS */}
        <div
          style={{
            padding: '1.25rem',
            backgroundColor: 'var(--bg-surface-subtle)',
            borderRight: '1px solid var(--border-subtle)',
            borderBottom: '1px solid var(--border-subtle)',
            fontWeight: 600,
            fontSize: '0.875rem'
          }}
        >
          Key Cons
        </div>
        {tools.map((tool) => (
          <div
            key={tool.id}
            style={{
              padding: '1.25rem',
              borderRight: '1px solid var(--border-subtle)',
              borderBottom: '1px solid var(--border-subtle)',
              fontSize: '0.8125rem',
              color: 'var(--text-secondary)'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              {tool.cons.map((con, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
                  <ThumbsDown size={13} color="var(--color-danger)" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>{con}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
        {tools.length < 4 && <div style={{ borderBottom: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-primary)' }} />}

        {/* ROW 9: BENCHMARKS & METRICS */}
        <div
          style={{
            padding: '1.25rem',
            backgroundColor: 'var(--bg-surface-subtle)',
            borderRight: '1px solid var(--border-subtle)',
            fontWeight: 600,
            fontSize: '0.875rem'
          }}
        >
          Benchmarks & Evaluation
        </div>
        {tools.map((tool) => (
          <div
            key={tool.id}
            style={{
              padding: '1.25rem',
              borderRight: '1px solid var(--border-subtle)',
              fontSize: '0.8125rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.75rem' }}>
              <Star size={14} fill="#F59E0B" color="#F59E0B" />
              <span style={{ fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{tool.rating}</span>
              <span style={{ color: 'var(--text-muted)' }}>({tool.reviewCount} reviews)</span>
            </div>
            {tool.benchmarks?.map((b, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--bg-surface-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '0.4rem 0.6rem',
                  marginBottom: '0.35rem',
                  fontSize: '0.75rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
                  <span>{b.metric}</span>
                  <span style={{ fontFamily: 'var(--font-mono)' }}>{b.score}</span>
                </div>
                <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  {b.context}
                </div>
              </div>
            ))}
          </div>
        ))}
        {tools.length < 4 && <div style={{ backgroundColor: 'var(--bg-primary)' }} />}
      </div>
    </div>
  );
};
