import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { GitCompare, X, ArrowRight, Trash2 } from 'lucide-react';
import { useCompare } from '../../context/CompareContext';
import { Button } from '../common/Button';

export const CompareTray: React.FC = () => {
  const { compareTools, removeFromCompare, clearCompare } = useCompare();
  const navigate = useNavigate();
  const location = useLocation();

  // If on the compare page or no tools selected, don't show floating tray
  if (compareTools.length === 0 || location.pathname === '/compare') {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 95,
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        backgroundColor: 'var(--accent-primary)',
        color: 'var(--text-inverted)',
        padding: '0.625rem 1.25rem',
        borderRadius: 'var(--radius-full)',
        boxShadow: 'var(--shadow-elevated)',
        maxWidth: '90vw'
      }}
      className="animate-slide-up compare-tray"
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
        <div
          style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <GitCompare size={14} color="#FFFFFF" />
        </div>
        <span style={{ fontSize: '0.8125rem', fontWeight: 600 }}>
          Compare ({compareTools.length}/4)
        </span>
      </div>

      <div
        style={{
          width: '1px',
          height: '20px',
          backgroundColor: 'rgba(255, 255, 255, 0.2)'
        }}
      />

      {/* Tool avatars with quick remove */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {compareTools.map((tool) => (
          <div
            key={tool.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              padding: '0.2rem 0.5rem 0.2rem 0.4rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.75rem',
              fontWeight: 500
            }}
          >
            <span>{tool.name}</span>
            <button
              onClick={() => removeFromCompare(tool.id)}
              style={{
                color: 'rgba(255, 255, 255, 0.6)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '1px'
              }}
              title={`Remove ${tool.name}`}
            >
              <X size={12} />
            </button>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <button
          onClick={() => navigate('/compare')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            backgroundColor: '#FFFFFF',
            color: 'var(--accent-primary)',
            fontSize: '0.75rem',
            fontWeight: 600,
            padding: '0.35rem 0.85rem',
            borderRadius: 'var(--radius-full)',
            cursor: 'pointer',
            transition: 'all var(--transition-fast)'
          }}
        >
          <span>Compare Now</span>
          <ArrowRight size={13} />
        </button>

        <button
          onClick={clearCompare}
          style={{
            color: 'rgba(255, 255, 255, 0.6)',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center'
          }}
          title="Clear all"
        >
          <Trash2 size={15} />
        </button>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .compare-tray {
            bottom: 72px !important;
            padding: 0.5rem 1rem !important;
          }
        }
      `}</style>
    </div>
  );
};
