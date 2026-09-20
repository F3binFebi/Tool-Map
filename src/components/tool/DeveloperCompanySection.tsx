import React from 'react';
import { Building2, MapPin, Calendar, Globe, Users, Shield, HelpCircle } from 'lucide-react';
import type { CompanyDeveloperInfo } from '../../types/models';

interface DeveloperCompanySectionProps {
  info?: CompanyDeveloperInfo;
  toolName: string;
}

function getSafeHostname(url?: string): string {
  if (!url) return 'Official Website';
  try {
    const parsed = new URL(url.startsWith('http') ? url : `https://${url}`);
    return parsed.hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

export const DeveloperCompanySection: React.FC<DeveloperCompanySectionProps> = ({
  info,
  toolName
}) => {
  // If no developer/company info is available, display a clean fallback state
  if (!info || (!info.name && !info.headquarters && !info.description)) {
    return (
      <div className="td-card-box">
        <div className="card-top-header" style={{ marginBottom: '0.25rem' }}>
          <h3 className="td-card-heading">
            <Building2 size={18} style={{ color: 'var(--primary)' }} />
            <span>Company &amp; Developer Organization</span>
          </h3>
          <span
            style={{
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '0.15rem 0.55rem',
              borderRadius: 'var(--radius-full)',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}
          >
            <HelpCircle size={12} />
            Information Not Available
          </span>
        </div>

        <p className="td-body-paragraph" style={{ color: 'var(--text-secondary)' }}>
          Detailed organizational and corporate registration records for <strong>{toolName}</strong> have not yet been indexed in the ToolWise research repository.
        </p>

        <div className="td-specs-meta-grid" style={{ marginTop: '0.5rem' }}>
          <div className="spec-meta-item">
            <span className="spec-label">Organization Name</span>
            <span className="spec-value">{toolName} Publisher</span>
          </div>
          <div className="spec-meta-item">
            <span className="spec-label">Verification Status</span>
            <span className="spec-value" style={{ color: 'var(--text-muted)' }}>Community Indexed</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="td-card-box">
      <div className="card-top-header" style={{ marginBottom: '0.25rem' }}>
        <h3 className="td-card-heading">
          <Building2 size={18} style={{ color: 'var(--primary)' }} />
          <span>Company &amp; Developer Organization</span>
        </h3>
        <span
          style={{
            fontSize: '0.75rem',
            color: 'var(--green)',
            background: 'var(--green-light)',
            border: '1px solid var(--green-border)',
            padding: '0.15rem 0.55rem',
            borderRadius: 'var(--radius-full)',
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.25rem'
          }}
        >
          <Shield size={12} />
          Verified Entity
        </span>
      </div>

      {info.description && (
        <p className="td-body-paragraph">{info.description}</p>
      )}

      <div className="td-specs-meta-grid" style={{ marginTop: '0.5rem' }}>
        <div className="spec-meta-item">
          <span className="spec-label">Organization Name</span>
          <span className="spec-value">{info.name || `${toolName} Team`}</span>
        </div>

        {info.headquarters && (
          <div className="spec-meta-item">
            <span className="spec-label">Headquarters</span>
            <span className="spec-value" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <MapPin size={13} style={{ color: 'var(--text-muted)' }} />
              {info.headquarters}
            </span>
          </div>
        )}

        {info.foundedYear && (
          <div className="spec-meta-item">
            <span className="spec-label">Founded</span>
            <span className="spec-value" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Calendar size={13} style={{ color: 'var(--text-muted)' }} />
              {info.foundedYear}
            </span>
          </div>
        )}

        {info.founders && info.founders.length > 0 && (
          <div className="spec-meta-item">
            <span className="spec-label">Key Founders</span>
            <span className="spec-value">{info.founders.slice(0, 3).join(', ')}</span>
          </div>
        )}

        {info.ceo && (
          <div className="spec-meta-item">
            <span className="spec-label">Leadership / CEO</span>
            <span className="spec-value">{info.ceo}</span>
          </div>
        )}

        {info.backingOrParent && (
          <div className="spec-meta-item">
            <span className="spec-label">Corporate Backing / Parent</span>
            <span className="spec-value">{info.backingOrParent}</span>
          </div>
        )}

        {info.employeeCount && (
          <div className="spec-meta-item">
            <span className="spec-label">Team Size</span>
            <span className="spec-value" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Users size={13} style={{ color: 'var(--text-muted)' }} />
              {info.employeeCount}
            </span>
          </div>
        )}

        {info.website && (
          <div className="spec-meta-item">
            <span className="spec-label">Official Website</span>
            <a
              href={info.website}
              target="_blank"
              rel="noopener noreferrer"
              className="spec-link"
              style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}
            >
              <Globe size={13} />
              <span>{getSafeHostname(info.website)}</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
