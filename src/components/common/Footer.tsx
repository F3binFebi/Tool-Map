import React from 'react';
import { Link } from 'react-router-dom';
import { ToolWiseLogo } from './ToolWiseLogo';
import './Footer.css';

const FOOTER_LINKS = {
  Discovery: [
    { label: 'Explore All Tools', to: '/explore' },
    { label: 'AI Tools Directory', to: '/explore?type=ai' },
    { label: 'Software Directory', to: '/explore?type=software' },
    { label: 'Explore by Category', to: '/explore?view=categories' },
  ],
  Platform: [
    { label: 'Comparison Matrix', to: '/compare' },
    { label: 'Tool Matcher', to: '/recommendations' },
    { label: 'Research & Insights', to: '/research' },
    { label: 'User Workspaces', to: '/profile' },
  ],
  Editorial: [
    { label: 'Reasoning Benchmarks', to: '/research' },
    { label: 'Coding Assistants', to: '/research' },
    { label: 'Design System Trends', to: '/research' },
    { label: 'Verified Ratings Policy', to: '/research' },
  ],
};

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <ToolWiseLogo size="md" showSubtitle={true} />
          </Link>
          <p className="footer-tagline">
            Discover, compare and choose the best AI tools and software with verified research and empirical specifications.
          </p>
        </div>

        {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
          <div key={heading} className="footer-col">
            <h4 className="footer-col-title">{heading}</h4>
            <ul className="footer-links-list">
              {links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="footer-link">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <span>© {new Date().getFullYear()} ToolWise. Discover. Compare. Choose.</span>
          <div className="footer-legal">
            <a href="#" className="footer-link">Privacy Policy</a>
            <a href="#" className="footer-link">Terms of Service</a>
            <a href="#" className="footer-link">Methodology</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
