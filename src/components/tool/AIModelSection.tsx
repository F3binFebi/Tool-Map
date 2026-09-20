import React, { useState } from 'react';
import {
  Sparkles,
  Cpu,
  Layers,
  CheckCircle2,
  DollarSign,
  Zap,
  Clock,
  Database,
  BarChart3,
  ThumbsUp,
  AlertCircle,
  Eye,
  Mic,
  Video,
  FileCode2,
  FileText
} from 'lucide-react';
import type { AIModelFamily, AIModel, ModelModality } from '../../types/models';
import './AIModelSection.css';

interface AIModelSectionProps {
  families: AIModelFamily[];
  toolName: string;
}

const MODALITY_ICONS: Record<ModelModality, React.ReactNode> = {
  Text: <FileText size={12} />,
  Vision: <Eye size={12} />,
  Audio: <Mic size={12} />,
  Video: <Video size={12} />,
  Code: <FileCode2 size={12} />
};

export const AIModelSection: React.FC<AIModelSectionProps> = ({ families, toolName }) => {
  const [selectedFamilyId, setSelectedFamilyId] = useState<string>(families[0]?.id || '');
  const activeFamily = families.find((f) => f.id === selectedFamilyId) || families[0];

  const [selectedModelId, setSelectedModelId] = useState<string>(
    activeFamily?.models[0]?.id || ''
  );

  // Update selected model when family changes
  const handleFamilyChange = (famId: string) => {
    setSelectedFamilyId(famId);
    const fam = families.find((f) => f.id === famId);
    if (fam && fam.models[0]) {
      setSelectedModelId(fam.models[0].id);
    }
  };

  const activeModel: AIModel | undefined =
    activeFamily?.models.find((m) => m.id === selectedModelId) || activeFamily?.models[0];

  if (!families || families.length === 0) {
    return (
      <div className="aim-empty-card">
        <Cpu size={32} className="aim-empty-icon" />
        <h4>No Model Breakdown Available</h4>
        <p>This tool does not expose proprietary individual model families.</p>
      </div>
    );
  }

  return (
    <div className="aim-container">
      {/* Header Info */}
      <div className="aim-header-banner">
        <div className="aim-header-left">
          <div className="aim-header-badge">
            <Sparkles size={13} />
            <span>AI Model Intelligence &amp; Architecture</span>
          </div>
          <h3 className="aim-header-title">{toolName} Neural Model Ecosystem</h3>
          <p className="aim-header-sub">
            Explore model families, individual checkpoints, context windows, benchmark scores, and token economics.
          </p>
        </div>
      </div>

      {/* Model Family Tabs */}
      {families.length > 1 && (
        <div className="aim-family-tabs">
          <span className="aim-family-label">Model Family:</span>
          <div className="aim-family-pills">
            {families.map((family) => {
              const isActive = family.id === activeFamily.id;
              return (
                <button
                  key={family.id}
                  type="button"
                  className={`aim-family-pill ${isActive ? 'active-family' : ''}`}
                  onClick={() => handleFamilyChange(family.id)}
                >
                  <Cpu size={14} />
                  <span>{family.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Active Family Summary Card */}
      <div className="aim-family-overview-card">
        <div className="aim-fo-top">
          <div>
            <span className="aim-fo-gen">{activeFamily.generation}</span>
            <h4 className="aim-fo-name">{activeFamily.name}</h4>
          </div>
          <span className="aim-fo-dev">Developer: {activeFamily.developer}</span>
        </div>
        <p className="aim-fo-desc">{activeFamily.description}</p>
      </div>

      {/* Model Selection Selector Row */}
      <div className="aim-models-grid">
        {activeFamily.models.map((model) => {
          const isSelected = model.id === activeModel?.id;
          return (
            <div
              key={model.id}
              className={`aim-model-card ${isSelected ? 'aim-model-card-selected' : ''}`}
              onClick={() => setSelectedModelId(model.id)}
            >
              <div className="aim-mc-top">
                <div>
                  <h5 className="aim-mc-name">{model.name}</h5>
                  <span className="aim-mc-ver">{model.version}</span>
                </div>
                {isSelected && (
                  <span className="aim-active-chip">Active</span>
                )}
              </div>

              <p className="aim-mc-desc">{model.description}</p>

              <div className="aim-mc-specs">
                <span className="aim-spec-pill">
                  <Database size={11} />
                  {model.contextWindow}
                </span>
                <div className="aim-modalities-row">
                  {model.modalities.map((mod) => (
                    <span key={mod} className="aim-mod-badge" title={`${mod} input supported`}>
                      {MODALITY_ICONS[mod]}
                      <span>{mod}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Model Deep Dive Detail */}
      {activeModel && (
        <div className="aim-detail-box">
          <div className="aim-detail-header">
            <div>
              <div className="aim-dh-row">
                <h4 className="aim-dh-title">{activeModel.name}</h4>
                <span className="aim-dh-ver-tag">{activeModel.version}</span>
                {activeModel.architecture && (
                  <span className="aim-dh-arch-tag">{activeModel.architecture}</span>
                )}
              </div>
              <p className="aim-dh-sub">
                Released {activeModel.releaseDate} • Context: <strong>{activeModel.contextWindow}</strong>
                {activeModel.knowledgeCutoff ? ` • Cutoff: ${activeModel.knowledgeCutoff}` : ''}
              </p>
            </div>

            {activeModel.pricing.subscriptionTier && (
              <div className="aim-pricing-badge-box">
                <span className="aim-pb-label">Access Tier</span>
                <span className="aim-pb-val">{activeModel.pricing.subscriptionTier}</span>
              </div>
            )}
          </div>

          {/* Key Specifications Strip */}
          <div className="aim-specs-strip">
            <div className="aim-spec-item">
              <span className="spec-title">Context Window</span>
              <span className="spec-data highlight">{activeModel.contextWindow}</span>
            </div>
            {activeModel.maxOutputTokens && (
              <div className="aim-spec-item">
                <span className="spec-title">Max Output</span>
                <span className="spec-data">{activeModel.maxOutputTokens}</span>
              </div>
            )}
            <div className="aim-spec-item">
              <span className="spec-title">API Input Price</span>
              <span className="spec-data">
                {activeModel.pricing.inputPricePerMillion || 'Subscription Only'}
              </span>
            </div>
            <div className="aim-spec-item">
              <span className="spec-title">API Output Price</span>
              <span className="spec-data">
                {activeModel.pricing.outputPricePerMillion || 'Included in Plan'}
              </span>
            </div>
          </div>

          {/* Benchmarks Section (if available) */}
          {activeModel.benchmarks && activeModel.benchmarks.length > 0 && (
            <div className="aim-benchmarks-card">
              <h5 className="aim-sub-heading">
                <BarChart3 size={15} />
                <span>Empirical Benchmarks &amp; Evaluations</span>
              </h5>
              <div className="aim-benchmarks-grid">
                {activeModel.benchmarks.map((bench, idx) => (
                  <div key={idx} className="aim-bench-pill">
                    <span className="bench-metric">{bench.metric}</span>
                    <span className="bench-score">{bench.score}</span>
                    {bench.comparison && (
                      <span className="bench-comp">{bench.comparison}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Capabilities & Best Use Cases Dual Grid */}
          <div className="aim-dual-grid">
            {/* Capabilities */}
            <div className="aim-capabilities-card">
              <h5 className="aim-sub-heading">
                <Zap size={15} />
                <span>Model Capabilities</span>
              </h5>
              <ul className="aim-caps-list">
                {activeModel.capabilities.map((cap, idx) => (
                  <li key={idx}>
                    <CheckCircle2 size={14} className="cap-check" />
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Best Use Cases */}
            <div className="aim-usecases-card">
              <h5 className="aim-sub-heading">
                <Layers size={15} />
                <span>Best Applied Use Cases</span>
              </h5>
              <ul className="aim-usecases-list">
                {activeModel.bestUseCases.map((uc, idx) => (
                  <li key={idx}>
                    <span className="uc-idx">{idx + 1}</span>
                    <span>{uc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Strengths & Limitations */}
          <div className="aim-dual-grid">
            <div className="aim-procon-box pro-box">
              <h5 className="aim-sub-heading pro-title">
                <ThumbsUp size={14} />
                <span>Architectural Strengths</span>
              </h5>
              <ul className="aim-bullets">
                {activeModel.strengths.map((str, idx) => (
                  <li key={idx}>{str}</li>
                ))}
              </ul>
            </div>

            <div className="aim-procon-box con-box">
              <h5 className="aim-sub-heading con-title">
                <AlertCircle size={14} />
                <span>Known Limitations</span>
              </h5>
              <ul className="aim-bullets">
                {activeModel.limitations.map((lim, idx) => (
                  <li key={idx}>{lim}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Recommended Summary Banner */}
          {activeModel.recommendedFor && (
            <div className="aim-recommendation-bar">
              <span className="rec-label">Recommended For:</span>
              <span className="rec-text">{activeModel.recommendedFor}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
