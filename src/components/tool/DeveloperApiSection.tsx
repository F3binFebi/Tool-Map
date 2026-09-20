import React, { useState } from 'react';
import { Terminal, Copy, Check, ExternalLink, Code2, ShieldAlert, Cpu } from 'lucide-react';
import type { DeveloperApiInfo } from '../../types/models';

interface DeveloperApiSectionProps {
  apiInfo?: DeveloperApiInfo;
  toolName: string;
}

export const DeveloperApiSection: React.FC<DeveloperApiSectionProps> = ({ apiInfo, toolName }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    if (apiInfo?.codeSample?.code) {
      navigator.clipboard.writeText(apiInfo.codeSample.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // State when API info is completely not available
  if (!apiInfo) {
    return (
      <div className="td-card-box">
        <div className="card-top-header" style={{ marginBottom: '0.25rem' }}>
          <h3 className="td-card-heading">
            <Terminal size={18} style={{ color: 'var(--primary)' }} />
            <span>API &amp; Developer Integration Specifications</span>
          </h3>
          <span
            style={{
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '0.15rem 0.55rem',
              borderRadius: 'var(--radius-full)',
              fontWeight: 600
            }}
          >
            Not Available
          </span>
        </div>
        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
          <Cpu size={32} style={{ opacity: 0.5, marginBottom: '0.75rem' }} />
          <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            API Information Not Available
          </h4>
          <p style={{ fontSize: '0.875rem', maxWidth: '460px', margin: '0 auto', color: 'var(--text-secondary)' }}>
            Official programmatic API specifications and endpoints for <strong>{toolName}</strong> have not yet been published or are currently not indexed in the repository.
          </p>
        </div>
      </div>
    );
  }

  // State when tool explicitly does not offer a public programmatic API
  if (!apiInfo.hasApi) {
    return (
      <div className="td-card-box">
        <div className="card-top-header" style={{ marginBottom: '0.25rem' }}>
          <h3 className="td-card-heading">
            <Terminal size={18} style={{ color: 'var(--primary)' }} />
            <span>API &amp; Developer Integration Specifications</span>
          </h3>
          <span
            style={{
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '0.15rem 0.55rem',
              borderRadius: 'var(--radius-full)',
              fontWeight: 600
            }}
          >
            No Public API
          </span>
        </div>
        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
          <Cpu size={32} style={{ opacity: 0.5, marginBottom: '0.75rem' }} />
          <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            No Public API Currently Offered
          </h4>
          <p style={{ fontSize: '0.875rem', maxWidth: '460px', margin: '0 auto', color: 'var(--text-secondary)' }}>
            {toolName} is currently delivered exclusively through client applications and web portals without direct public programmatic API endpoints.
          </p>
          {apiInfo.documentationUrl && (
            <a
              href={apiInfo.documentationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="td-btn-outline"
              style={{ marginTop: '1rem', display: 'inline-flex' }}
            >
              <span>View Product Documentation</span>
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="td-card-box">
      <div className="card-top-header">
        <h3 className="td-card-heading">
          <Terminal size={18} style={{ color: 'var(--primary)' }} />
          <span>API &amp; Developer Integration Specifications</span>
        </h3>
        <span
          style={{
            fontSize: '0.75rem',
            color: 'var(--primary)',
            background: 'rgba(99, 102, 241, 0.15)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            padding: '0.2rem 0.6rem',
            borderRadius: 'var(--radius-full)',
            fontWeight: 600
          }}
        >
          REST &amp; SDKs
        </span>
      </div>

      <div className="td-specs-meta-grid" style={{ paddingTop: '0.5rem', borderTop: 'none' }}>
        {apiInfo.endpointUrl && (
          <div className="spec-meta-item" style={{ gridColumn: '1 / -1' }}>
            <span className="spec-label">Base API Endpoint</span>
            <code
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '0.4rem 0.75rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.8125rem',
                color: '#60A5FA',
                fontFamily: 'var(--font-mono)'
              }}
            >
              {apiInfo.endpointUrl}
            </code>
          </div>
        )}

        {apiInfo.sdkLanguages && apiInfo.sdkLanguages.length > 0 && (
          <div className="spec-meta-item" style={{ gridColumn: '1 / -1' }}>
            <span className="spec-label">Official SDK Support</span>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
              {apiInfo.sdkLanguages.map((lang) => (
                <span
                  key={lang}
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    padding: '0.2rem 0.6rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: 'var(--text-secondary)'
                  }}
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        )}

        {apiInfo.rateLimits && (
          <div className="spec-meta-item">
            <span className="spec-label">Rate Limits &amp; Concurrency</span>
            <span className="spec-value">{apiInfo.rateLimits}</span>
          </div>
        )}

        {apiInfo.pricingSummary && (
          <div className="spec-meta-item">
            <span className="spec-label">API Pricing Model</span>
            <span className="spec-value">{apiInfo.pricingSummary}</span>
          </div>
        )}
      </div>

      {/* Code Sample */}
      {apiInfo.codeSample && (
        <div style={{ marginTop: '1rem' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '0.4rem'
            }}
          >
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              Quickstart Code Example ({apiInfo.codeSample.language})
            </span>
            <button
              type="button"
              onClick={handleCopyCode}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                fontSize: '0.6875rem',
                color: copied ? 'var(--green)' : 'var(--text-secondary)',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '0.25rem 0.6rem',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer'
              }}
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
              <span>{copied ? 'Copied!' : 'Copy snippet'}</span>
            </button>
          </div>
          <pre
            style={{
              background: '#070A12',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem',
              overflowX: 'auto',
              fontSize: '0.8125rem',
              color: '#E2E8F0',
              fontFamily: 'var(--font-mono)',
              lineHeight: 1.5
            }}
          >
            <code>{apiInfo.codeSample.code}</code>
          </pre>
        </div>
      )}

      {apiInfo.documentationUrl && (
        <div style={{ marginTop: '0.75rem', display: 'flex', justifyContent: 'flex-end' }}>
          <a
            href={apiInfo.documentationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="spec-link"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8125rem' }}
          >
            <span>Open Official Developer Docs</span>
            <ExternalLink size={13} />
          </a>
        </div>
      )}
    </div>
  );
};
