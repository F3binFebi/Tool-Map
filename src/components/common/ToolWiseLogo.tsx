import React from 'react';

interface ToolWiseLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
}

export const ToolWiseLogo: React.FC<ToolWiseLogoProps> = ({
  size = 'md',
  showSubtitle = true,
  className = '',
}) => {
  const iconSizes = {
    sm: 24,
    md: 32,
    lg: 40,
  };

  const textSizes = {
    sm: '1rem',
    md: '1.25rem',
    lg: '1.625rem',
  };

  const iconDim = iconSizes[size];

  return (
    <div
      className={`toolwise-logo-root ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.625rem',
        textDecoration: 'none',
        userSelect: 'none',
      }}
    >
      <div
        style={{
          width: iconDim,
          height: iconDim,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <svg
          width={iconDim}
          height={iconDim}
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="tw-grad-1" x1="4" y1="4" x2="36" y2="36" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3B82F6" />
              <stop offset="1" stopColor="#1D4ED8" />
            </linearGradient>
            <linearGradient id="tw-grad-2" x1="8" y1="8" x2="32" y2="32" gradientUnits="userSpaceOnUse">
              <stop stopColor="#60A5FA" stopOpacity="0.9" />
              <stop offset="1" stopColor="#2563EB" stopOpacity="0.4" />
            </linearGradient>
            <filter id="tw-glow" x="0" y="0" width="40" height="40" filterUnits="userSpaceOnUse">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#2563EB" floodOpacity="0.25" />
            </filter>
          </defs>
          {/* Main rounded diamond emblem */}
          <rect
            x="20"
            y="4"
            width="22.6"
            height="22.6"
            rx="6"
            transform="rotate(45 20 4)"
            fill="url(#tw-grad-1)"
            filter="url(#tw-glow)"
          />
          {/* Inner translucent highlight diamond */}
          <rect
            x="20"
            y="9"
            width="15.5"
            height="15.5"
            rx="4.5"
            transform="rotate(45 20 9)"
            fill="url(#tw-grad-2)"
          />
          {/* Center sparkle core */}
          <circle cx="20" cy="20" r="2.5" fill="#FFFFFF" />
        </svg>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
        <span
          style={{
            fontWeight: 800,
            fontSize: textSizes[size],
            letterSpacing: '-0.03em',
            color: 'var(--text-primary)',
          }}
        >
          ToolWise
        </span>
        {showSubtitle && (
          <span
            style={{
              fontSize: '0.6875rem',
              fontWeight: 500,
              color: 'var(--text-muted)',
              letterSpacing: '-0.01em',
              marginTop: '2px',
            }}
          >
            Discover. Compare. Choose.
          </span>
        )}
      </div>
    </div>
  );
};
