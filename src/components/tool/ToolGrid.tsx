import React from 'react';
import { Tool } from '../../types';
import { ToolCard } from './ToolCard';

interface ToolGridProps {
  tools: Tool[];
  compact?: boolean;
  columns?: 2 | 3 | 4;
}

export const ToolGrid: React.FC<ToolGridProps> = ({
  tools,
  compact = false,
  columns = 3
}) => {
  const getGridTemplateColumns = () => {
    if (columns === 2) return 'repeat(auto-fill, minmax(360px, 1fr))';
    if (columns === 4) return 'repeat(auto-fill, minmax(260px, 1fr))';
    return 'repeat(auto-fill, minmax(320px, 1fr))';
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: getGridTemplateColumns(),
        gap: '1.25rem',
        width: '100%'
      }}
      className="tool-grid"
    >
      {tools.map((tool) => (
        <ToolCard key={tool.id} tool={tool} compact={compact} />
      ))}
      <style>{`
        @media (max-width: 640px) {
          .tool-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
