import React from 'react';
import { Sparkles, CheckCircle2, DollarSign, Laptop } from 'lucide-react';

interface BadgeProps {
  variant?: 'ai' | 'software' | 'free' | 'freemium' | 'paid' | 'verified' | 'platform' | 'default';
  children: React.ReactNode;
  icon?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  children,
  icon = false,
  className = '',
  style
}) => {
  const getIcon = () => {
    if (!icon) return null;
    switch (variant) {
      case 'ai':
        return <Sparkles size={11} className="badge-icon" />;
      case 'verified':
        return <CheckCircle2 size={11} className="badge-icon" />;
      case 'free':
      case 'freemium':
      case 'paid':
        return <DollarSign size={11} className="badge-icon" />;
      case 'platform':
        return <Laptop size={11} className="badge-icon" />;
      default:
        return null;
    }
  };

  return (
    <span className={`badge badge-${variant} ${className}`} style={style}>
      {getIcon()}
      {children}
    </span>
  );
};
