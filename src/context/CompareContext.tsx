import React, { createContext, useContext, useState, useEffect } from 'react';
import { Tool } from '../types';
import { toolsService } from '../services/toolsService';

interface CompareContextType {
  compareToolIds: string[];
  compareTools: Tool[];
  addToCompare: (toolId: string) => boolean;
  removeFromCompare: (toolId: string) => void;
  isInCompare: (toolId: string) => boolean;
  clearCompare: () => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export const CompareProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [compareToolIds, setCompareToolIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('toolwise_compare_ids');
      return saved ? JSON.parse(saved) : ['canva', 'figma'];
    } catch {
      return ['canva', 'figma'];
    }
  });

  const [compareTools, setCompareTools] = useState<Tool[]>([]);

  useEffect(() => {
    try {
      localStorage.setItem('toolwise_compare_ids', JSON.stringify(compareToolIds));
    } catch (e) {
      console.error('Failed to save compare state:', e);
    }

    if (compareToolIds.length > 0) {
      toolsService.compareTools(compareToolIds).then((tools) => {
        setCompareTools(tools);
      });
    } else {
      setCompareTools([]);
    }
  }, [compareToolIds]);

  const addToCompare = (toolId: string): boolean => {
    if (compareToolIds.includes(toolId)) {
      return true;
    }
    if (compareToolIds.length >= 4) {
      alert('You can compare a maximum of 4 tools simultaneously.');
      return false;
    }
    setCompareToolIds((prev) => [...prev, toolId]);
    return true;
  };

  const removeFromCompare = (toolId: string) => {
    setCompareToolIds((prev) => prev.filter((id) => id !== toolId));
  };

  const isInCompare = (toolId: string): boolean => {
    return compareToolIds.includes(toolId);
  };

  const clearCompare = () => {
    setCompareToolIds([]);
  };

  return (
    <CompareContext.Provider
      value={{
        compareToolIds,
        compareTools,
        addToCompare,
        removeFromCompare,
        isInCompare,
        clearCompare
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
};
