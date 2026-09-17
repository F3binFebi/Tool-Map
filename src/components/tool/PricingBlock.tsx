import React from 'react';
import { PricingTier } from '../../types';
import { Check } from 'lucide-react';
import { Badge } from '../common/Badge';

interface PricingBlockProps {
  tiers: PricingTier[];
}

export const PricingBlock: React.FC<PricingBlockProps> = ({ tiers }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fit, minmax(260px, 1fr))`,
        gap: '1.25rem',
        marginTop: '1rem'
      }}
      className="pricing-grid"
    >
      {tiers.map((tier, idx) => (
        <div
          key={idx}
          style={{
            backgroundColor: 'var(--bg-surface)',
            border: tier.isPopular
              ? '2px solid var(--accent-primary)'
              : '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative'
          }}
        >
          {tier.isPopular && (
            <div
              style={{
                position: 'absolute',
                top: '-10px',
                right: '16px',
                backgroundColor: 'var(--accent-primary)',
                color: 'var(--text-inverted)',
                fontSize: '0.6875rem',
                fontWeight: 600,
                padding: '0.15rem 0.55rem',
                borderRadius: 'var(--radius-full)',
                fontFamily: 'var(--font-mono)',
                textTransform: 'uppercase',
                letterSpacing: '0.04em'
              }}
            >
              Most Popular
            </div>
          )}

          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '0.5rem'
              }}
            >
              <h4 style={{ fontSize: '1.125rem' }}>{tier.name}</h4>
              <Badge variant={tier.price === '$0' ? 'free' : 'paid'}>
                {tier.price === '$0' ? 'Free Tier' : 'Commercial'}
              </Badge>
            </div>

            <div style={{ margin: '1rem 0 0.5rem' }}>
              <span
                style={{
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '-0.03em'
                }}
              >
                {tier.price}
              </span>
              {tier.billingPeriod && (
                <span
                  style={{
                    fontSize: '0.8125rem',
                    color: 'var(--text-muted)',
                    marginLeft: '0.35rem'
                  }}
                >
                  {tier.billingPeriod}
                </span>
              )}
            </div>

            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              {tier.description}
            </p>

            <div
              style={{
                borderTop: '1px solid var(--border-subtle)',
                paddingTop: '1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.625rem'
              }}
            >
              <span
                style={{
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  fontWeight: 600
                }}
              >
                Included Capabilities
              </span>
              {tier.features.map((feature, fIdx) => (
                <div
                  key={fIdx}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.5rem',
                    fontSize: '0.8125rem',
                    color: 'var(--text-secondary)'
                  }}
                >
                  <Check
                    size={15}
                    color="var(--color-success)"
                    style={{ marginTop: '3px', flexShrink: 0 }}
                  />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
