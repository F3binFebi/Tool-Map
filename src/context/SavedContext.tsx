import React, { createContext, useContext, useState, useEffect } from 'react';
import { Tool, SavedCollection } from '../types';
import { toolsService } from '../services/toolsService';

interface SavedContextType {
  savedToolIds: string[];
  savedTools: Tool[];
  toggleSaveTool: (toolId: string) => void;
  isToolSaved: (toolId: string) => boolean;
  recentlyViewedIds: string[];
  recentlyViewedTools: Tool[];
  addRecentlyViewed: (toolId: string) => void;
  collections: SavedCollection[];
  createCollection: (name: string, description: string) => void;
  addToCollection: (collectionId: string, toolId: string) => void;
  notificationMessage: string | null;
  clearNotification: () => void;
}

const DEFAULT_COLLECTIONS: SavedCollection[] = [
  {
    id: 'core-stack',
    name: 'Frontend & UI Stack',
    description: 'Tools used for daily interface prototyping, styling, and design system work.',
    toolIds: ['figma', 'v0-vercel', 'canva'],
    createdAt: '2025-03-01'
  },
  {
    id: 'ai-reasoning-tier',
    name: 'Research & Reasoning Suite',
    description: 'Frontier AI models for literature review, code refactoring, and citation checking.',
    toolIds: ['claude', 'perplexity', 'chatgpt'],
    createdAt: '2025-03-05'
  }
];

const SavedContext = createContext<SavedContextType | undefined>(undefined);

export const SavedProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [savedToolIds, setSavedToolIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('toolwise_saved_tools');
      return stored ? JSON.parse(stored) : ['cursor', 'claude', 'figma'];
    } catch {
      return ['cursor', 'claude', 'figma'];
    }
  });

  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('toolwise_recent_views');
      return stored ? JSON.parse(stored) : ['chatgpt', 'figma', 'cursor', 'perplexity'];
    } catch {
      return ['chatgpt', 'figma', 'cursor', 'perplexity'];
    }
  });

  const [collections, setCollections] = useState<SavedCollection[]>(() => {
    try {
      const stored = localStorage.getItem('toolwise_collections');
      return stored ? JSON.parse(stored) : DEFAULT_COLLECTIONS;
    } catch {
      return DEFAULT_COLLECTIONS;
    }
  });

  const [savedTools, setSavedTools] = useState<Tool[]>([]);
  const [recentlyViewedTools, setRecentlyViewedTools] = useState<Tool[]>([]);
  const [notificationMessage, setNotificationMessage] = useState<string | null>(null);

  // Sync saved tools with toolsService
  useEffect(() => {
    try {
      localStorage.setItem('toolwise_saved_tools', JSON.stringify(savedToolIds));
    } catch (e) {
      console.error(e);
    }

    if (savedToolIds.length > 0) {
      toolsService.compareTools(savedToolIds).then(setSavedTools);
    } else {
      setSavedTools([]);
    }
  }, [savedToolIds]);

  // Sync recent views
  useEffect(() => {
    try {
      localStorage.setItem('toolwise_recent_views', JSON.stringify(recentlyViewedIds));
    } catch (e) {
      console.error(e);
    }

    if (recentlyViewedIds.length > 0) {
      toolsService.compareTools(recentlyViewedIds).then(setRecentlyViewedTools);
    } else {
      setRecentlyViewedTools([]);
    }
  }, [recentlyViewedIds]);

  // Sync collections
  useEffect(() => {
    try {
      localStorage.setItem('toolwise_collections', JSON.stringify(collections));
    } catch (e) {
      console.error(e);
    }
  }, [collections]);

  const toggleSaveTool = (toolId: string) => {
    if (savedToolIds.includes(toolId)) {
      setSavedToolIds((prev) => prev.filter((id) => id !== toolId));
      setNotificationMessage(`Removed tool from your saved list`);
    } else {
      setSavedToolIds((prev) => [...prev, toolId]);
      setNotificationMessage(`Saved tool to your research bookmarks`);
    }
  };

  const isToolSaved = (toolId: string) => {
    return savedToolIds.includes(toolId);
  };

  const addRecentlyViewed = (toolId: string) => {
    setRecentlyViewedIds((prev) => {
      const filtered = prev.filter((id) => id !== toolId);
      return [toolId, ...filtered].slice(0, 10);
    });
  };

  const createCollection = (name: string, description: string) => {
    const newCol: SavedCollection = {
      id: `col-${Date.now()}`,
      name,
      description,
      toolIds: [],
      createdAt: new Date().toISOString().split('T')[0]
    };
    setCollections((prev) => [newCol, ...prev]);
    setNotificationMessage(`Created collection "${name}"`);
  };

  const addToCollection = (collectionId: string, toolId: string) => {
    setCollections((prev) =>
      prev.map((col) => {
        if (col.id === collectionId && !col.toolIds.includes(toolId)) {
          return { ...col, toolIds: [...col.toolIds, toolId] };
        }
        return col;
      })
    );
    setNotificationMessage('Added tool to collection');
  };

  const clearNotification = () => {
    setNotificationMessage(null);
  };

  return (
    <SavedContext.Provider
      value={{
        savedToolIds,
        savedTools,
        toggleSaveTool,
        isToolSaved,
        recentlyViewedIds,
        recentlyViewedTools,
        addRecentlyViewed,
        collections,
        createCollection,
        addToCollection,
        notificationMessage,
        clearNotification
      }}
    >
      {children}
    </SavedContext.Provider>
  );
};

export const useSaved = () => {
  const context = useContext(SavedContext);
  if (!context) {
    throw new Error('useSaved must be used within a SavedProvider');
  }
  return context;
};
