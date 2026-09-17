import React, { useEffect } from 'react';
import { useSaved } from '../../context/SavedContext';
import { Check, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { notificationMessage, clearNotification } = useSaved();

  useEffect(() => {
    if (notificationMessage) {
      const timer = setTimeout(() => {
        clearNotification();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [notificationMessage, clearNotification]);

  if (!notificationMessage) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '84px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        backgroundColor: 'var(--accent-primary)',
        color: 'var(--text-inverted)',
        padding: '0.625rem 1rem',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-lg)',
        fontSize: '0.875rem',
        fontWeight: 500,
        maxWidth: '380px'
      }}
      className="animate-slide-up"
    >
      <div
        style={{
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Check size={12} color="#FFFFFF" />
      </div>
      <span style={{ flex: 1 }}>{notificationMessage}</span>
      <button
        onClick={clearNotification}
        style={{
          color: 'rgba(255, 255, 255, 0.7)',
          cursor: 'pointer',
          padding: '2px',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <X size={14} />
      </button>
    </div>
  );
};
