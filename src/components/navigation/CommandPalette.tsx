import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Sparkles, Code2, Layout, BookOpen, Layers } from 'lucide-react';
import { toolsService } from '../../services/toolsService';
import { Tool } from '../../types';
import { Badge } from '../common/Badge';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Tool[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      toolsService.getTools({ query }).then((tools) => {
        setResults(tools.slice(0, 7));
      });
    } else {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    toolsService.getTools({ query }).then((tools) => {
      setResults(tools.slice(0, 7));
      setSelectedIndex(0);
    });
  }, [query]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1 < results.length ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 >= 0 ? prev - 1 : results.length - 1));
      } else if (e.key === 'Enter' && results[selectedIndex]) {
        e.preventDefault();
        navigate(`/tools/${results[selectedIndex].id}`);
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, navigate, onClose]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.45)',
        backdropFilter: 'blur(4px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '12vh',
        paddingLeft: '1rem',
        paddingRight: '1rem'
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '640px',
          backgroundColor: 'var(--bg-surface)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-elevated)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
        className="animate-slide-down"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '1rem 1.25rem',
            borderBottom: '1px solid var(--border-subtle)',
            gap: '0.75rem'
          }}
        >
          <Search size={18} color="var(--text-muted)" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search AI tools, software, features, or use cases..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: '1rem',
              color: 'var(--text-primary)',
              backgroundColor: 'transparent'
            }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              style={{ color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              <X size={16} />
            </button>
          )}
          <kbd
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6875rem',
              backgroundColor: 'var(--bg-surface-subtle)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-xs)',
              padding: '0.15rem 0.4rem',
              color: 'var(--text-muted)'
            }}
          >
            ESC
          </kbd>
        </div>

        {/* Quick Suggestion Tags */}
        {!query && (
          <div
            style={{
              padding: '0.75rem 1.25rem',
              backgroundColor: 'var(--bg-surface-subtle)',
              borderBottom: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              flexWrap: 'wrap'
            }}
          >
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>
              Quick filters:
            </span>
            {['Coding', 'Reasoning', 'Design', 'Free', 'Video'].map((tag) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                style={{
                  fontSize: '0.75rem',
                  padding: '0.2rem 0.5rem',
                  borderRadius: 'var(--radius-xs)',
                  border: '1px solid var(--border-subtle)',
                  backgroundColor: 'var(--bg-surface)',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer'
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {/* Results List */}
        <div style={{ maxHeight: '380px', overflowY: 'auto', padding: '0.5rem' }}>
          {results.length > 0 ? (
            results.map((tool, idx) => (
              <div
                key={tool.id}
                onClick={() => {
                  navigate(`/tools/${tool.id}`);
                  onClose();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor:
                    idx === selectedIndex ? 'var(--bg-surface-subtle)' : 'transparent',
                  border:
                    idx === selectedIndex
                      ? '1px solid var(--border-subtle)'
                      : '1px solid transparent',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
                onMouseEnter={() => setSelectedIndex(idx)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                  <div
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--bg-primary)',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '0.875rem',
                      fontFamily: 'var(--font-mono)'
                    }}
                  >
                    {tool.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{tool.name}</span>
                      <Badge variant={tool.type === 'AI' ? 'ai' : 'software'}>{tool.type}</Badge>
                      <Badge variant={tool.pricing === 'Free' ? 'free' : 'freemium'}>
                        {tool.pricing}
                      </Badge>
                    </div>
                    <div
                      style={{
                        fontSize: '0.8125rem',
                        color: 'var(--text-muted)',
                        marginTop: '2px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        maxWidth: '400px'
                      }}
                    >
                      {tool.tagline}
                    </div>
                  </div>
                </div>
                <ArrowRight
                  size={15}
                  color={idx === selectedIndex ? 'var(--text-primary)' : 'var(--text-tertiary)'}
                />
              </div>
            ))
          ) : (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              No tools found for "{query}". Try checking categories or browse the Explore directory.
            </div>
          )}
        </div>

        {/* Footer info */}
        <div
          style={{
            padding: '0.625rem 1.25rem',
            borderTop: '1px solid var(--border-subtle)',
            backgroundColor: 'var(--bg-primary)',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <span>Use ↑ ↓ to navigate, Enter to view, Esc to exit</span>
          <button
            onClick={() => {
              navigate('/explore');
              onClose();
            }}
            style={{
              color: 'var(--accent-primary)',
              fontWeight: 500,
              fontSize: '0.75rem',
              cursor: 'pointer'
            }}
          >
            Browse all 18 tools →
          </button>
        </div>
      </div>
    </div>
  );
};
