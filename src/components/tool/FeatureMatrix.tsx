import React from 'react';
import { Check, Sparkles, Layers } from 'lucide-react';

interface FeatureMatrixProps {
  features: string[];
  aiCapabilities: string[];
}

export const FeatureMatrix: React.FC<FeatureMatrixProps> = ({
  features,
  aiCapabilities
}) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '1.5rem',
        marginTop: '1rem'
      }}
    >
      {/* Core Platform Features */}
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
            marginBottom: '1rem'
          }}
        >
          <Layers size={18} color="var(--accent-primary)" />
          <h4 style={{ fontSize: '1rem' }}>Core Platform Architecture</h4>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {features.map((feature, idx) => (
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
                  backgroundColor: 'var(--bg-surface-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '2px',
                  flexShrink: 0
                }}
              >
                <Check size={12} color="var(--text-primary)" />
              </div>
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* AI Intelligence & Neural Features */}
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
            marginBottom: '1rem'
          }}
        >
          <Sparkles size={18} color="var(--color-ai)" />
          <h4 style={{ fontSize: '1rem' }}>AI & Multimodal Capabilities</h4>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {aiCapabilities.map((capability, idx) => (
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
                  backgroundColor: 'var(--color-ai-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '2px',
                  flexShrink: 0
                }}
              >
                <Sparkles size={11} color="var(--color-ai)" />
              </div>
              <span>{capability}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
