import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  BookOpen,
  Clock,
  Calendar,
  ArrowRight,
  User,
  X,
  CheckCircle2,
  Share2,
  Search,
  Sparkles,
} from 'lucide-react';
import { toolsService } from '../services/toolsService';
import type { ResearchArticle, Tool } from '../types';
import { ToolLogo } from '../components/common/ToolLogo';
import './Research.css';

const CATEGORIES = [
  'All',
  'Guides',
  'Comparisons',
  'AI Explained',
  'Software',
  'Trends',
];

export const Research: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const slugParam = searchParams.get('slug');

  const [articles, setArticles] = useState<ResearchArticle[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticle, setActiveArticle] = useState<ResearchArticle | null>(null);
  const [relatedTools, setRelatedTools] = useState<Tool[]>([]);

  useEffect(() => {
    toolsService.getArticles().then(setArticles);
  }, []);

  useEffect(() => {
    if (slugParam) {
      toolsService.getArticleBySlug(slugParam).then((art) => {
        setActiveArticle(art);
        if (art && art.relatedToolIds.length > 0) {
          toolsService.compareTools(art.relatedToolIds).then(setRelatedTools);
        } else {
          setRelatedTools([]);
        }
      });
    } else {
      setActiveArticle(null);
      setRelatedTools([]);
    }
  }, [slugParam]);

  const handleOpenArticle = (art: ResearchArticle) => {
    setActiveArticle(art);
    setSearchParams({ slug: art.slug }, { replace: true });
  };

  const handleCloseArticle = () => {
    setActiveArticle(null);
    setSearchParams({}, { replace: true });
  };

  const filteredArticles = articles.filter((art) => {
    // Category match
    const catMatch =
      selectedCategory === 'All' ||
      art.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      (selectedCategory === 'AI Explained' && art.category.toLowerCase().includes('explanation')) ||
      (selectedCategory === 'Trends' && art.category.toLowerCase().includes('trends')) ||
      (selectedCategory === 'Software' && art.category.toLowerCase().includes('software'));

    // Search query match
    const qMatch =
      !searchQuery.trim() ||
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.description.toLowerCase().includes(searchQuery.toLowerCase());

    return catMatch && qMatch;
  });

  return (
    <div className="research-canvas">
      {/* ── Page Header (Screen 6) ── */}
      <div className="research-header-block">
        <h1 className="research-page-title">Research &amp; Insights</h1>
        <p className="research-page-subtitle">
          Stay informed with the latest articles, guides, comparisons and trends.
        </p>

        {/* Category Filter Pills */}
        <div className="research-tabs-row">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                className={`research-tab-pill ${isSelected ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="research-search-bar">
          <Search size={16} className="res-search-icon" />
          <input
            type="text"
            className="res-search-input"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* ── Active Deep Article Reader ── */}
      {activeArticle ? (
        <article className="research-reader-card animate-fade-in">
          <button className="reader-close-btn" onClick={handleCloseArticle}>
            <X size={16} />
            <span>Close Article</span>
          </button>

          <div className="reader-meta-row">
            <span className="reader-cat-tag">{activeArticle.category}</span>
            <span className="reader-time">
              <Clock size={13} /> {activeArticle.readingTime}
            </span>
            <span className="reader-date">
              <Calendar size={13} /> {activeArticle.publishedDate}
            </span>
          </div>

          <h2 className="reader-title">{activeArticle.title}</h2>
          <p className="reader-lead">{activeArticle.description}</p>

          <div className="reader-author-bar">
            <div className="author-avatar">{activeArticle.author.name.charAt(0)}</div>
            <div>
              <div className="author-name">{activeArticle.author.name}</div>
              <div className="author-role">{activeArticle.author.role}</div>
            </div>
          </div>

          {/* Key Takeaways */}
          {activeArticle.keyTakeaways.length > 0 && (
            <div className="reader-takeaways-box">
              <h4 className="takeaways-title">Key Insights &amp; Findings</h4>
              <ul className="takeaways-list">
                {activeArticle.keyTakeaways.map((item, i) => (
                  <li key={i}>
                    <CheckCircle2 size={15} className="takeaway-icon" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Content Sections */}
          <div className="reader-content-body">
            {activeArticle.contentSections.map((sec, i) => (
              <div key={i} className="reader-section-block">
                <h3 className="section-heading">{sec.heading}</h3>
                <p className="section-p">{sec.body}</p>
              </div>
            ))}
          </div>

          {/* Related Tools */}
          {relatedTools.length > 0 && (
            <div className="reader-related-tools">
              <h4 className="related-title">Tools Evaluated in This Dossier</h4>
              <div className="related-tools-grid">
                {relatedTools.map((t) => (
                  <div key={t.id} className="related-tool-item">
                    <ToolLogo id={t.id} name={t.name} size={36} />
                    <div className="related-info">
                      <Link to={`/tools/${t.id}`} className="related-name">
                        {t.name}
                      </Link>
                      <span className="related-cat">{t.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </article>
      ) : (
        /* ── Horizontal Editorial Cards List (Screen 6) ── */
        <div className="research-articles-stack">
          {filteredArticles.map((article, idx) => {
            const gradients = [
              'linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)',
              'linear-gradient(135deg, #022C22 0%, #064E3B 100%)',
              'linear-gradient(135deg, #450A0A 0%, #7F1D1D 100%)',
              'linear-gradient(135deg, #0C4A6E 0%, #075985 100%)',
              'linear-gradient(135deg, #3B0764 0%, #581C87 100%)',
              'linear-gradient(135deg, #18181B 0%, #27272A 100%)',
            ];

            return (
              <div
                key={article.id}
                className="editorial-horizontal-card"
                onClick={() => handleOpenArticle(article)}
              >
                {/* Left Thumbnail Graphic */}
                <div
                  className="editorial-thumb"
                  style={{ background: gradients[idx % gradients.length] }}
                >
                  <div className="thumb-glow" />
                  <BookOpen size={28} className="thumb-icon" />
                  <span className="thumb-caption">{article.category}</span>
                </div>

                {/* Right Body Content */}
                <div className="editorial-body">
                  <div className="editorial-top-row">
                    <span className="editorial-tag">{article.category}</span>
                    <span className="editorial-read-time">
                      <Clock size={12} />
                      {article.readingTime}
                    </span>
                  </div>

                  <h3 className="editorial-title">{article.title}</h3>
                  <p className="editorial-desc">{article.description}</p>

                  <div className="editorial-footer">
                    <span className="editorial-date">{article.publishedDate}</span>
                    <span className="editorial-read-link">
                      <span>Read article</span>
                      <ArrowRight size={13} />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}

          {filteredArticles.length === 0 && (
            <div className="research-empty-box">
              <BookOpen size={36} />
              <p>No research articles match your search or filter.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
