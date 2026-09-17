import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  GitCompare,
  Plus,
  Trash2,
  X,
  Check,
  Star,
  ExternalLink,
  Search,
  CheckCircle2,
  Award,
} from 'lucide-react';
import { toolsService } from '../services/toolsService';
import type { Tool } from '../types';
import { useCompare } from '../context/CompareContext';
import { ToolLogo } from '../components/common/ToolLogo';
import './Compare.css';

const PRESETS = [
  { label: 'Canva vs Figma', ids: ['canva', 'figma'] },
  { label: 'ChatGPT vs Claude vs Gemini', ids: ['chatgpt', 'claude', 'gemini'] },
  { label: 'Cursor vs GitHub Copilot', ids: ['cursor', 'github-copilot'] },
  { label: 'Midjourney vs Runway', ids: ['midjourney', 'runway'] },
];

interface FeatureRowDef {
  label: string;
  render: (t: Tool) => React.ReactNode;
}

const COMPARISON_ROWS: FeatureRowDef[] = [
  {
    label: 'Pricing',
    render: (t: Tool) => (
      <span className="matrix-pricing-cell">
        <strong>{t.pricingStartingPrice || t.pricing}</strong>
        <span className="matrix-pricing-type">({t.pricing})</span>
      </span>
    ),
  },
  {
    label: 'Ease of use',
    render: (t: Tool) => {
      const beginner = ['canva', 'chatgpt', 'perplexity', 'raycast'].includes(t.id);
      const advanced = ['cursor', 'blender', 'supabase', 'webflow'].includes(t.id);
      return beginner ? (
        <span className="matrix-pill pill-easy">Very Easy</span>
      ) : advanced ? (
        <span className="matrix-pill pill-moderate">Moderate / Advanced</span>
      ) : (
        <span className="matrix-pill pill-moderate">Intuitive</span>
      );
    },
  },
  {
    label: 'Features',
    render: (t: Tool) => (
      <div className="matrix-features-list">
        {t.features.slice(0, 3).map((f, i) => (
          <div key={i} className="matrix-feat-item">
            <span className="feat-dot" />
            <span>{f}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    label: 'AI capabilities',
    render: (t: Tool) => (
      <div className="matrix-capabilities-text">
        {t.aiCapabilities.length > 0 ? (
          t.aiCapabilities.slice(0, 2).join(', ')
        ) : (
          <span className="text-muted">Standard productivity algorithms</span>
        )}
      </div>
    ),
  },
  {
    label: 'Platforms',
    render: (t: Tool) => (
      <div className="matrix-platforms-row">
        {t.platforms.slice(0, 3).join(', ')}
        {t.platforms.length > 3 && ` +${t.platforms.length - 3}`}
      </div>
    ),
  },
  {
    label: 'Collaboration',
    render: (t: Tool) => {
      const col = ['figma', 'notion', 'slack', 'canva'].includes(t.id);
      return col ? (
        <span className="matrix-pill pill-excellent">Excellent</span>
      ) : (
        <span className="matrix-pill pill-good">Good</span>
      );
    },
  },
  {
    label: 'Rating',
    render: (t: Tool) => (
      <div className="matrix-rating-cell">
        <Star size={13} fill="#F59E0B" color="#F59E0B" />
        <strong>{t.rating.toFixed(1)}</strong>
        <span className="text-muted">
          ({t.reviewCount >= 1000 ? `${(t.reviewCount / 1000).toFixed(1)}k` : t.reviewCount})
        </span>
      </div>
    ),
  },
];

// Add Tool Selection Modal
function AddToolModal({
  isOpen,
  onClose,
  onSelect,
  excludeIds,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (id: string) => void;
  excludeIds: string[];
}) {
  const [allTools, setAllTools] = useState<Tool[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (isOpen) {
      toolsService.getTools().then(setAllTools);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const available = allTools.filter(
    (t) =>
      !excludeIds.includes(t.id) &&
      (t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.category.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="cmp-modal-backdrop" onClick={onClose}>
      <div className="cmp-modal-window" onClick={(e) => e.stopPropagation()}>
        <div className="cmp-modal-header">
          <h3 className="cmp-modal-title">Add Tool to Compare</h3>
          <button className="cmp-modal-close" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <div className="cmp-modal-search">
          <Search size={16} className="modal-search-icon" />
          <input
            type="text"
            className="modal-search-input"
            placeholder="Search tool by name or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
        </div>

        <div className="cmp-modal-tools-list">
          {available.map((tool) => (
            <button
              key={tool.id}
              className="cmp-modal-item"
              onClick={() => {
                onSelect(tool.id);
                onClose();
              }}
            >
              <ToolLogo id={tool.id} name={tool.name} size={36} />
              <div className="cmp-modal-item-info">
                <span className="cmp-modal-item-name">{tool.name}</span>
                <span className="cmp-modal-item-cat">{tool.category}</span>
              </div>
              <Plus size={16} className="cmp-modal-add-icon" />
            </button>
          ))}
          {available.length === 0 && (
            <div className="cmp-modal-empty">No matching tools available</div>
          )}
        </div>
      </div>
    </div>
  );
}

export const Compare: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { compareToolIds, addToCompare, removeFromCompare, clearCompare } = useCompare();
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const idsFromUrl = searchParams.get('tools');
    const ids = idsFromUrl
      ? idsFromUrl.split(',').filter(Boolean)
      : compareToolIds.length > 0
      ? compareToolIds
      : ['canva', 'figma'];

    setLoading(true);
    toolsService.compareTools(ids).then((loaded) => {
      setTools(loaded);
      setLoading(false);
    });
  }, [searchParams, compareToolIds]);

  const applyPreset = (ids: string[]) => {
    clearCompare();
    ids.forEach((id) => addToCompare(id));
    setSearchParams({ tools: ids.join(',') }, { replace: true });
  };

  const handleAddTool = (id: string) => {
    addToCompare(id);
    const next = [...tools.map((t) => t.id), id];
    setSearchParams({ tools: next.join(',') }, { replace: true });
  };

  const handleRemoveTool = (id: string) => {
    removeFromCompare(id);
    const next = tools.map((t) => t.id).filter((i) => i !== id);
    setSearchParams({ tools: next.join(',') }, { replace: true });
  };

  return (
    <div className="compare-canvas">
      {/* ── Page Header ── */}
      <div className="compare-header-block">
        <h1 className="compare-page-title">Compare Tools</h1>
        <p className="compare-page-subtitle">
          Find the best tool for your needs by comparing features, pricing and more.
        </p>

        {/* Quick presets */}
        <div className="compare-presets-row">
          <span className="presets-caption">Quick Presets:</span>
          {PRESETS.map((p) => (
            <button
              key={p.label}
              type="button"
              className="compare-preset-pill"
              onClick={() => applyPreset(p.ids)}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="compare-loading-state">
          <div className="cmp-skeleton-box" />
        </div>
      ) : tools.length === 0 ? (
        <div className="compare-empty-card">
          <GitCompare size={40} className="cmp-empty-icon" />
          <h3 className="cmp-empty-title">No tools selected for comparison</h3>
          <p className="cmp-empty-text">Select 2 to 4 tools to compare them side by side.</p>
          <button
            className="cmp-btn-select"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus size={16} />
            <span>Select Tools</span>
          </button>
        </div>
      ) : (
        <>
          {/* ── Top Tool Selection Cards Row (Screen 4) ── */}
          <div className="compare-selectors-grid">
            {tools.map((tool) => (
              <div key={tool.id} className="selected-tool-card">
                <div className="st-left">
                  <ToolLogo id={tool.id} name={tool.name} size={42} />
                  <div className="st-info">
                    <h3 className="st-name">{tool.name}</h3>
                    <span className="st-category">{tool.category}</span>
                  </div>
                </div>

                <button
                  className="st-remove-btn"
                  onClick={() => handleRemoveTool(tool.id)}
                  title={`Remove ${tool.name}`}
                >
                  <X size={15} />
                </button>
              </div>
            ))}

            {/* "+ Add tool" dashed card */}
            {tools.length < 4 && (
              <button
                type="button"
                className="add-tool-dashed-card"
                onClick={() => setIsModalOpen(true)}
              >
                <div className="add-tool-icon-wrap">
                  <Plus size={20} />
                </div>
                <span className="add-tool-text">Add tool</span>
              </button>
            )}
          </div>

          {/* ── Main Comparison Matrix Table (Screen 4) ── */}
          <div className="compare-matrix-card">
            <div className="matrix-table-wrap">
              <table className="matrix-table">
                <thead>
                  <tr>
                    <th className="th-feature-label">Feature</th>
                    {tools.map((tool) => (
                      <th key={tool.id} className="th-tool-col">
                        <div className="th-tool-header">
                          <ToolLogo id={tool.id} name={tool.name} size={28} />
                          <span>{tool.name}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_ROWS.map((row) => (
                    <tr key={row.label}>
                      <td className="td-feature-name">{row.label}</td>
                      {tools.map((tool) => (
                        <td key={tool.id} className="td-feature-value">
                          {row.render(tool)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── Side-by-side Pros & Cons (Screen 4) ── */}
          <div className="compare-section-heading-wrap">
            <h2 className="compare-section-heading">Pros &amp; Cons</h2>
          </div>

          <div
            className="compare-proscons-grid"
            style={{ gridTemplateColumns: `repeat(${tools.length}, 1fr)` }}
          >
            {tools.map((tool) => (
              <div key={tool.id} className="cmp-proscons-tool-box">
                <div className="tool-box-header">
                  <ToolLogo id={tool.id} name={tool.name} size={32} />
                  <span className="tool-box-name">{tool.name}</span>
                </div>

                <div className="tool-pros-section">
                  <span className="pros-badge">Pros</span>
                  <ul className="pros-list">
                    {tool.pros.slice(0, 3).map((p, i) => (
                      <li key={i}>
                        <Check size={14} className="pros-icon" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="tool-cons-section">
                  <span className="cons-badge">Cons</span>
                  <ul className="cons-list">
                    {tool.cons.slice(0, 3).map((c, i) => (
                      <li key={i}>
                        <X size={14} className="cons-icon" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* ── Final Verdict Section (Screen 4) ── */}
          <div className="compare-section-heading-wrap">
            <h2 className="compare-section-heading">Final Verdict</h2>
          </div>

          <div
            className="compare-verdicts-grid"
            style={{ gridTemplateColumns: `repeat(${tools.length}, 1fr)` }}
          >
            {tools.map((tool) => (
              <div key={tool.id} className="verdict-card">
                <div className="verdict-card-top">
                  <ToolLogo id={tool.id} name={tool.name} size={36} />
                  <div className="verdict-identity">
                    <span className="verdict-tag">Recommendation</span>
                    <h4 className="verdict-name">{tool.name}</h4>
                  </div>
                </div>

                <p className="verdict-body-text">
                  {tool.bestFor
                    ? `Best for: ${tool.bestFor}`
                    : `Ideal choice for teams and professionals prioritizing reliable ${tool.category} workflows.`}
                </p>

                <a
                  href={tool.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="verdict-visit-link"
                >
                  <span>Visit {tool.name}</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Add Tool Modal */}
      <AddToolModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleAddTool}
        excludeIds={tools.map((t) => t.id)}
      />
    </div>
  );
};
