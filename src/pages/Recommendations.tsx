import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Check,
  Zap,
  Star,
  ExternalLink,
  Laptop,
  DollarSign,
  GraduationCap,
  PenTool,
  Code2,
  Cpu,
  Layers,
  Search,
  CheckCircle2,
  FolderPlus,
} from 'lucide-react';
import { toolsService } from '../services/toolsService';
import type { RecommendationCriteria, RecommendationResult, Platform } from '../types';
import { useCompare } from '../context/CompareContext';
import { useSaved } from '../context/SavedContext';
import { ToolLogo } from '../components/common/ToolLogo';
import './Recommendations.css';

interface GoalOption {
  id: string;
  title: string;
  desc: string;
  icon: React.ElementType;
  value: string;
}

const GOALS_LIST: GoalOption[] = [
  {
    id: 'content',
    title: 'Create content',
    desc: 'Write, design, audio, video',
    icon: PenTool,
    value: 'Long-Form Writing & Copy',
  },
  {
    id: 'productivity',
    title: 'Be more productive',
    desc: 'Organize, automate, manage',
    icon: Zap,
    value: 'Team Workspaces & Issues',
  },
  {
    id: 'code',
    title: 'Code & develop',
    desc: 'Build, debug, deploy',
    icon: Code2,
    value: 'Full-Stack Software Coding',
  },
  {
    id: 'research',
    title: 'Learn & research',
    desc: 'Study, find information',
    icon: Search,
    value: 'Academic & Market Research',
  },
  {
    id: 'design',
    title: 'Design',
    desc: 'UI/UX, web, assets',
    icon: Layers,
    value: 'UI Design & Prototyping',
  },
  {
    id: 'other',
    title: 'Other',
    desc: 'Generative media & workflows',
    icon: Sparkles,
    value: 'Generative Media & Video',
  },
];

const EXPERIENCE_OPTIONS = [
  {
    level: 'Beginner' as const,
    title: 'Beginner / Casual',
    desc: 'Intuitive interface, ready out-of-the-box with zero steep learning curve.',
  },
  {
    level: 'Intermediate' as const,
    title: 'Intermediate',
    desc: 'Comfortable with standard software abstractions, shortcuts, and workflows.',
  },
  {
    level: 'Advanced' as const,
    title: 'Advanced / Power User',
    desc: 'Deep granular control, code access, API hooks, and customizable architectures.',
  },
];

const BUDGET_OPTIONS = [
  {
    value: 'Free' as const,
    title: '100% Free Only',
    desc: 'Strictly zero cost tools with no unexpected paywalls.',
  },
  {
    value: 'Freemium' as const,
    title: 'Freemium / Under $20/mo',
    desc: 'Generous free tier with optional affordable upgrade when needed.',
  },
  {
    value: 'Any' as const,
    title: 'Any Budget / Enterprise',
    desc: 'Prioritizing best technical capability regardless of price.',
  },
];

const PLATFORM_OPTIONS: { id: Platform | 'Any'; label: string; desc: string }[] = [
  { id: 'Web', label: 'Web Browser', desc: 'Runs in Chrome, Safari, Edge, Firefox' },
  { id: 'macOS', label: 'macOS', desc: 'Optimized Apple Silicon / Intel Mac app' },
  { id: 'Windows', label: 'Windows', desc: 'Native Windows desktop performance' },
  { id: 'Linux', label: 'Linux', desc: 'Debian, Ubuntu, Arch, Fedora' },
  { id: 'Any', label: 'Any Platform', desc: 'Cross-platform or cloud-based' },
];

export const Recommendations: React.FC = () => {
  const navigate = useNavigate();
  const { addToCompare } = useCompare();
  const { toggleSaveTool, isToolSaved } = useSaved();

  const [step, setStep] = useState(1);
  const [selectedGoalId, setSelectedGoalId] = useState('content');
  const [criteria, setCriteria] = useState<RecommendationCriteria>({
    goal: 'Long-Form Writing & Copy',
    experienceLevel: 'Beginner',
    budget: 'Freemium',
    platform: 'Web',
  });

  const [results, setResults] = useState<RecommendationResult[]>([]);
  const [calculating, setCalculating] = useState(false);
  const [hasCalculated, setHasCalculated] = useState(false);

  const stepsList = [
    { num: 1, label: 'Goal' },
    { num: 2, label: 'Experience' },
    { num: 3, label: 'Budget' },
    { num: 4, label: 'Platform' },
    { num: 5, label: 'Results' },
  ];

  const handleSelectGoal = (item: GoalOption) => {
    setSelectedGoalId(item.id);
    setCriteria((prev) => ({ ...prev, goal: item.value }));
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else if (step === 4) {
      // Calculate results
      setCalculating(true);
      toolsService.getRecommendations(criteria).then((data) => {
        setResults(data);
        setCalculating(false);
        setHasCalculated(true);
        setStep(5);
      });
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleReset = () => {
    setStep(1);
    setSelectedGoalId('content');
    setHasCalculated(false);
    setResults([]);
  };

  return (
    <div className="recs-canvas">
      {/* ── Page Header ── */}
      <div className="recs-header-block">
        <h1 className="recs-title">Find Your Perfect Tool</h1>
        <p className="recs-subtitle">Select your needs and preferences.</p>
      </div>

      {/* ── Step Progress Indicator (Screen 5) ── */}
      <div className="recs-progress-bar">
        {stepsList.map((s, idx) => {
          const isDone = s.num < step || (step === 5 && s.num === 5);
          const isCurrent = s.num === step;
          return (
            <React.Fragment key={s.num}>
              <div className={`step-item ${isCurrent ? 'current' : ''} ${isDone ? 'done' : ''}`}>
                <div className="step-circle">
                  {isDone && s.num !== step ? <Check size={12} /> : s.num}
                </div>
                <span className="step-label">{s.label}</span>
              </div>
              {idx < stepsList.length - 1 && <div className="step-connector" />}
            </React.Fragment>
          );
        })}
      </div>

      {/* ── Step Content ── */}
      {step < 5 ? (
        <div className="recs-step-container">
          <div className="recs-step-layout">
            {/* Step Left Interactive Form */}
            <div className="recs-step-left">
              {/* STEP 1: GOAL */}
              {step === 1 && (
                <div className="step-panel animate-fade-in">
                  <div className="step-question-header">
                    <h2 className="step-main-q">What do you want to do?</h2>
                    <p className="step-sub-q">Select your main goal or use case.</p>
                  </div>

                  <div className="goals-options-grid">
                    {GOALS_LIST.map((goal) => {
                      const Icon = goal.icon;
                      const isSelected = selectedGoalId === goal.id;
                      return (
                        <div
                          key={goal.id}
                          className={`goal-selection-card ${isSelected ? 'selected' : ''}`}
                          onClick={() => handleSelectGoal(goal)}
                        >
                          <div className="goal-card-icon">
                            <Icon size={20} />
                          </div>
                          <div className="goal-card-text">
                            <h3 className="goal-card-title">{goal.title}</h3>
                            <span className="goal-card-desc">{goal.desc}</span>
                          </div>
                          {isSelected && (
                            <div className="goal-check-badge">
                              <Check size={12} />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 2: EXPERIENCE */}
              {step === 2 && (
                <div className="step-panel animate-fade-in">
                  <div className="step-question-header">
                    <h2 className="step-main-q">What is your technical experience?</h2>
                    <p className="step-sub-q">We will tune recommendations to your comfort level.</p>
                  </div>

                  <div className="vertical-options-list">
                    {EXPERIENCE_OPTIONS.map((opt) => {
                      const isSelected = criteria.experienceLevel === opt.level;
                      return (
                        <div
                          key={opt.level}
                          className={`vertical-option-card ${isSelected ? 'selected' : ''}`}
                          onClick={() =>
                            setCriteria((prev) => ({ ...prev, experienceLevel: opt.level }))
                          }
                        >
                          <div className="v-opt-info">
                            <h4 className="v-opt-title">{opt.title}</h4>
                            <p className="v-opt-desc">{opt.desc}</p>
                          </div>
                          {isSelected && (
                            <div className="v-opt-badge">
                              <Check size={14} />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 3: BUDGET */}
              {step === 3 && (
                <div className="step-panel animate-fade-in">
                  <div className="step-question-header">
                    <h2 className="step-main-q">What is your budget?</h2>
                    <p className="step-sub-q">Choose the pricing structure that fits your plan.</p>
                  </div>

                  <div className="vertical-options-list">
                    {BUDGET_OPTIONS.map((opt) => {
                      const isSelected = criteria.budget === opt.value;
                      return (
                        <div
                          key={opt.value}
                          className={`vertical-option-card ${isSelected ? 'selected' : ''}`}
                          onClick={() =>
                            setCriteria((prev) => ({ ...prev, budget: opt.value }))
                          }
                        >
                          <div className="v-opt-info">
                            <h4 className="v-opt-title">{opt.title}</h4>
                            <p className="v-opt-desc">{opt.desc}</p>
                          </div>
                          {isSelected && (
                            <div className="v-opt-badge">
                              <Check size={14} />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 4: PLATFORM */}
              {step === 4 && (
                <div className="step-panel animate-fade-in">
                  <div className="step-question-header">
                    <h2 className="step-main-q">Which platform do you use?</h2>
                    <p className="step-sub-q">Ensure the tools you choose run on your daily setup.</p>
                  </div>

                  <div className="vertical-options-list">
                    {PLATFORM_OPTIONS.map((opt) => {
                      const isSelected = criteria.platform === opt.id;
                      return (
                        <div
                          key={opt.id}
                          className={`vertical-option-card ${isSelected ? 'selected' : ''}`}
                          onClick={() =>
                            setCriteria((prev) => ({ ...prev, platform: opt.id }))
                          }
                        >
                          <div className="v-opt-info">
                            <h4 className="v-opt-title">{opt.label}</h4>
                            <p className="v-opt-desc">{opt.desc}</p>
                          </div>
                          {isSelected && (
                            <div className="v-opt-badge">
                              <Check size={14} />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step Navigation Bar */}
              <div className="recs-step-actions">
                <button
                  type="button"
                  className="recs-skip-btn"
                  onClick={() => navigate('/explore')}
                >
                  Skip for now
                </button>

                <div className="recs-forward-btns">
                  {step > 1 && (
                    <button
                      type="button"
                      className="recs-back-btn"
                      onClick={handleBack}
                    >
                      <ArrowLeft size={15} />
                      <span>Back</span>
                    </button>
                  )}

                  <button
                    type="button"
                    className="recs-next-btn"
                    onClick={handleNext}
                  >
                    <span>{step === 4 ? 'Find Matches' : 'Next'}</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Character / Technology Illustration */}
            <div className="recs-step-right">
              <div className="recs-illustration-card">
                <div className="illustration-glow" />
                <div className="illustration-icon-art">
                  <div className="art-device">
                    <Laptop size={72} color="var(--primary)" strokeWidth={1.5} />
                    <div className="art-sparkle s1">
                      <Sparkles size={18} color="#8B5CF6" />
                    </div>
                    <div className="art-sparkle s2">
                      <Zap size={16} color="#06B6D4" />
                    </div>
                  </div>
                </div>
                <h4 className="ill-title">Personalized Matcher</h4>
                <p className="ill-desc">
                  We analyze features, pricing tiers, and real user ratings to find the right tool for you.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* STEP 5: RESULTS SCREEN */
        <div className="recs-results-container animate-fade-in">
          <div className="recs-results-header">
            <div>
              <h2 className="recs-results-title">Recommended Tools for You</h2>
              <p className="recs-results-desc">
                Based on your preference: {criteria.goal} · {criteria.experienceLevel} · {criteria.budget} · {criteria.platform}
              </p>
            </div>
            <button className="recs-restart-btn" onClick={handleReset}>
              <RotateCcw size={14} />
              <span>Restart Matcher</span>
            </button>
          </div>

          <div className="recs-results-grid">
            {results.map((item, idx) => {
              const { tool, matchScore, recommendationReason } = item;
              const isSaved = isToolSaved(tool.id);

              return (
                <div key={tool.id} className="rec-result-card">
                  <div className="rec-top-row">
                    <div className="rec-badge-rank">#{idx + 1} Best Match</div>
                    <div className="rec-score-pill">
                      <span>{matchScore}% Match</span>
                    </div>
                  </div>

                  <div className="rec-identity-row">
                    <ToolLogo id={tool.id} name={tool.name} size={48} />
                    <div className="rec-info">
                      <h3 className="rec-name">{tool.name}</h3>
                      <span className="rec-cat">{tool.type} · {tool.category}</span>
                    </div>
                  </div>

                  <p className="rec-reason">{recommendationReason}</p>

                  <div className="rec-features-preview">
                    {tool.features.slice(0, 2).map((feat, i) => (
                      <div key={i} className="rec-feat-line">
                        <CheckCircle2 size={13} className="rec-feat-icon" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  <div className="rec-actions-footer">
                    <Link to={`/tools/${tool.id}`} className="rec-view-link">
                      View Specs
                    </Link>
                    <button
                      className="rec-compare-btn"
                      onClick={() => addToCompare(tool.id)}
                    >
                      Compare
                    </button>
                    <a
                      href={tool.websiteUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="rec-website-btn"
                    >
                      <span>Visit</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
