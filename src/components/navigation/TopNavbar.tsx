import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, User, ChevronDown, Menu, X, Sparkles } from 'lucide-react';
import './TopNavbar.css';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Explore', to: '/explore' },
  {
    label: 'AI Tools',
    to: '/explore?type=ai',
    submenu: [
      { label: 'All AI Tools',         to: '/explore?type=ai' },
      { label: 'Chatbots & Reasoning', to: '/explore?type=ai&category=chatbots' },
      { label: 'Image Generation',     to: '/explore?type=ai&category=image-generation' },
      { label: 'Writing & Content',    to: '/explore?type=ai&category=writing' },
      { label: 'Code & Dev',           to: '/explore?type=ai&category=code-dev' },
      { label: 'Video',                to: '/explore?type=ai&category=video' },
      { label: 'Audio & Voice',        to: '/explore?type=ai&category=audio' },
      { label: 'Design',               to: '/explore?type=ai&category=design' },
      { label: 'Productivity',         to: '/explore?type=ai&category=productivity' },
      { label: 'Marketing',            to: '/explore?type=ai&category=marketing' },
    ],
  },
  {
    label: 'Software',
    to: '/explore?type=software',
    submenu: [
      { label: 'All Software',                 to: '/explore?type=software' },
      { label: 'Design & Prototyping',         to: '/explore?type=software&category=design' },
      { label: 'Development',                  to: '/explore?type=software&category=development' },
      { label: 'Productivity & Workspaces',     to: '/explore?type=software&category=productivity' },
      { label: 'Collaboration',                to: '/explore?type=software&category=collaboration' },
      { label: '3D & Animation',               to: '/explore?type=software&category=3d' },
      { label: 'Web & Visual Development',     to: '/explore?type=software&category=web-building' },
    ],
  },
  { label: 'Research', to: '/research' },
];

export default function TopNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen]   = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isActive = (to: string) => {
    if (to === '/') return location.pathname === '/' && !location.search;
    if (to.includes('?')) {
      const [path, search] = to.split('?');
      if (location.pathname !== path) return false;
      const targetParams = new URLSearchParams(search);
      const currentParams = new URLSearchParams(location.search);
      if (targetParams.has('type')) {
        return currentParams.get('type')?.toLowerCase() === targetParams.get('type')?.toLowerCase();
      }
      return false;
    }
    if (to === '/explore' && location.pathname === '/explore' && !location.search.includes('type=')) {
      return true;
    }
    return location.pathname.startsWith(to) && to !== '/explore';
  };

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [location]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  }

  return (
    <header className="top-navbar">
      <div className="navbar-inner container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <div className="logo-icon">
            <Sparkles size={18} />
          </div>
          <span className="logo-text">ToolWise</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="navbar-nav desktop-only" ref={dropdownRef}>
          {NAV_LINKS.map((link) => (
            <div
              key={link.label}
              className="nav-item-wrapper"
              onMouseEnter={() => link.submenu && setOpenDropdown(link.label)}
              onMouseLeave={() => link.submenu && setOpenDropdown(null)}
            >
              <Link
                to={link.to}
                className={`nav-link ${isActive(link.to) ? 'active' : ''} ${link.submenu ? 'has-dropdown' : ''}`}
              >
                {link.label}
                {link.submenu && <ChevronDown size={13} className="dropdown-chevron" />}
              </Link>

              {link.submenu && openDropdown === link.label && (
                <div className="nav-dropdown animate-scale-in">
                  {link.submenu.map((sub) => (
                    <Link key={sub.label} to={sub.to} className="nav-dropdown-item">
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="navbar-actions">
          {/* Inline search */}
          {searchOpen ? (
            <form className="navbar-search-form" onSubmit={handleSearch}>
              <Search size={15} className="search-form-icon" />
              <input
                ref={searchRef}
                className="navbar-search-input"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onBlur={() => { if (!searchQuery) setSearchOpen(false); }}
              />
              <button type="button" className="icon-btn" onClick={() => { setSearchOpen(false); setSearchQuery(''); }}>
                <X size={15} />
              </button>
            </form>
          ) : (
            <button
              className="icon-btn desktop-only"
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
            >
              <Search size={18} />
            </button>
          )}

          <button className="icon-btn desktop-only" aria-label="Profile">
            <User size={18} />
          </button>

          <Link to="/profile" className="btn-sign-in desktop-only">
            Sign In
          </Link>

          {/* Mobile hamburger */}
          <button
            className="icon-btn mobile-only"
            aria-label="Menu"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="mobile-menu animate-fade-in">
          <form className="mobile-search" onSubmit={handleSearch}>
            <Search size={15} />
            <input
              placeholder="Search tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          <nav className="mobile-nav">
            {NAV_LINKS.map((link) => (
              <div key={link.label}>
                <Link to={link.to} className={`mobile-nav-link ${isActive(link.to) ? 'active' : ''}`}>
                  {link.label}
                </Link>
                {link.submenu && (
                  <div className="mobile-subnav">
                    {link.submenu.map((sub) => (
                      <Link key={sub.label} to={sub.to} className="mobile-subnav-link">
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="mobile-actions">
            <Link to="/profile" className="btn-sign-in" style={{ width: '100%', textAlign: 'center' }}>
              Sign In
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
