import { TOOLS_DATA } from '../data/tools';
import { RESEARCH_ARTICLES } from '../data/research';
import type { Tool } from '../types';

export interface SearchResolution {
  type: 'direct-tool' | 'comparison' | 'tool-tab' | 'explore-filter' | 'research' | 'fallback';
  targetUrl: string;
  title: string;
  subtitle: string;
  badge: string;
  matchedTool?: Tool;
  matchedTab?: string;
}

export interface SearchSuggestionItem {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  targetUrl: string;
  iconType: 'tool' | 'models' | 'compare' | 'category' | 'research';
  toolId?: string;
}

// Find tool by name or alias
export function findToolByNameOrAlias(raw: string): Tool | undefined {
  const q = raw.toLowerCase().trim();
  if (!q) return undefined;

  // Direct ID match
  const directId = TOOLS_DATA.find((t) => t.id.toLowerCase() === q);
  if (directId) return directId;

  // Direct exact Name match
  const exactName = TOOLS_DATA.find((t) => t.name.toLowerCase() === q);
  if (exactName) return exactName;

  // Common aliases
  const aliasMap: Record<string, string> = {
    gpt: 'chatgpt',
    'gpt-4': 'chatgpt',
    'gpt-4o': 'chatgpt',
    'chat gpt': 'chatgpt',
    openai: 'chatgpt',
    'google gemini': 'gemini',
    'bard': 'gemini',
    'deepmind': 'gemini',
    'claude 3': 'claude',
    'claude 3.5': 'claude',
    'claude 3.7': 'claude',
    'anthropic': 'claude',
    copilot: 'github-copilot',
    'gh copilot': 'github-copilot',
    'ms copilot': 'microsoft-copilot',
    'v0': 'v0-vercel',
    'flux': 'flux-1',
    'dalle': 'dall-e',
    'dall-e 3': 'dall-e',
    'photoshop ai': 'photoshop',
    'adobe premiere': 'premiere-pro',
    'davinci': 'davinci-resolve',
    'resolve': 'davinci-resolve',
    'vscode': 'vscode',
    'vs code': 'vscode',
    'visual studio code': 'vscode'
  };

  if (aliasMap[q]) {
    const found = TOOLS_DATA.find((t) => t.id === aliasMap[q]);
    if (found) return found;
  }

  // Prefix or start match
  const startMatch = TOOLS_DATA.find(
    (t) => t.name.toLowerCase().startsWith(q) || t.id.toLowerCase().startsWith(q)
  );
  if (startMatch) return startMatch;

  // In-word match (minimum 3 chars)
  if (q.length >= 3) {
    return TOOLS_DATA.find((t) => t.name.toLowerCase().includes(q));
  }

  return undefined;
}

/**
 * Intelligently analyzes user query intent:
 * - "ChatGPT", "Gemini", "Claude", "Figma", "Canva" -> direct tool research dossier
 * - "Gemini models", "ChatGPT models" -> direct to models section
 * - "ChatGPT vs Claude", "Figma vs Canva" -> direct to comparison matrix
 * - "best AI for coding" -> explore with code filter
 * - "video editing software" -> explore with video editing filter
 * - "AI image generation" -> explore with image gen filter
 */
export function resolveSearchIntent(rawQuery: string): SearchResolution {
  const query = rawQuery.trim();
  const lower = query.toLowerCase();

  if (!query) {
    return {
      type: 'fallback',
      targetUrl: '/explore',
      title: 'Explore All Tools',
      subtitle: 'Browse 90+ verified AI and software tools',
      badge: 'Explore'
    };
  }

  // 1. Check for "X vs Y" or "compare X and Y"
  const vsMatch = lower.match(/^(.+?)\s+(?:vs\.?|versus|and)\s+(.+?)$/i);
  if (vsMatch) {
    const tool1 = findToolByNameOrAlias(vsMatch[1]);
    const tool2 = findToolByNameOrAlias(vsMatch[2]);
    if (tool1 && tool2) {
      return {
        type: 'comparison',
        targetUrl: `/compare?tools=${tool1.id},${tool2.id}`,
        title: `Compare ${tool1.name} vs ${tool2.name}`,
        subtitle: `Side-by-side benchmark, feature matrix, and pricing comparison`,
        badge: 'Compare Matrix',
        matchedTool: tool1
      };
    }
  }

  // 2. Check for "{Tool} models" or "{Tool} model versions"
  const modelsMatch = lower.match(/^(.+?)\s+(?:models?|versions?|benchmarks?|architecture)$/i);
  if (modelsMatch) {
    const tool = findToolByNameOrAlias(modelsMatch[1]);
    if (tool) {
      return {
        type: 'tool-tab',
        targetUrl: `/tools/${tool.id}?tab=models`,
        title: `${tool.name} — AI Models & Architecture Research`,
        subtitle: `Inspect individual model versions, context limits, benchmarks, and token pricing`,
        badge: 'Model Research',
        matchedTool: tool,
        matchedTab: 'models'
      };
    }
  }

  // 3. Check for "{Tool} pricing" or "{Tool} cost"
  const pricingMatch = lower.match(/^(.+?)\s+(?:pricing|price|cost|plans?)$/i);
  if (pricingMatch) {
    const tool = findToolByNameOrAlias(pricingMatch[1]);
    if (tool) {
      return {
        type: 'tool-tab',
        targetUrl: `/tools/${tool.id}?tab=pricing`,
        title: `${tool.name} — Pricing & Licensing Plans`,
        subtitle: `Compare free tier limits, subscriptions, and enterprise pricing`,
        badge: 'Pricing Dossier',
        matchedTool: tool,
        matchedTab: 'pricing'
      };
    }
  }

  // 4. Check for "{Tool} api" or "{Tool} developers"
  const apiMatch = lower.match(/^(.+?)\s+(?:api|sdk|developers?|endpoints?)$/i);
  if (apiMatch) {
    const tool = findToolByNameOrAlias(apiMatch[1]);
    if (tool) {
      return {
        type: 'tool-tab',
        targetUrl: `/tools/${tool.id}?tab=api`,
        title: `${tool.name} — API & Developer Reference`,
        subtitle: `View API endpoints, rate limits, SDK languages, and token pricing`,
        badge: 'Developer API',
        matchedTool: tool,
        matchedTab: 'api'
      };
    }
  }

  // 5. Check for Direct Tool match (e.g. "ChatGPT", "Gemini", "Claude", "Midjourney", "Canva", "Figma")
  const directTool = findToolByNameOrAlias(query);
  if (directTool) {
    return {
      type: 'direct-tool',
      targetUrl: `/tools/${directTool.id}`,
      title: `${directTool.name} — Full Research Dossier`,
      subtitle: `${directTool.tagline} • ${directTool.type} • ${directTool.category}`,
      badge: directTool.type === 'AI' ? 'AI Frontier' : 'Software',
      matchedTool: directTool
    };
  }

  // 6. Check for Coding / Developer queries
  if (
    lower.includes('code') ||
    lower.includes('coding') ||
    lower.includes('developer') ||
    lower.includes('programming')
  ) {
    const isAiOnly = lower.includes('ai');
    return {
      type: 'explore-filter',
      targetUrl: `/explore?type=${isAiOnly ? 'ai' : 'all'}&purpose=Code`,
      title: 'Top AI & Software for Coding & Engineering',
      subtitle: 'Cursor, Claude, GitHub Copilot, VS Code, and modern developer tools',
      badge: 'Curated Category'
    };
  }

  // 7. Check for Image Generation
  if (
    lower.includes('image') ||
    lower.includes('art') ||
    lower.includes('generate image') ||
    lower.includes('drawing')
  ) {
    return {
      type: 'explore-filter',
      targetUrl: `/explore?type=ai&category=Image%20Generation`,
      title: 'AI Image Generation Tools',
      subtitle: 'Midjourney, Flux.1, DALL·E 3, Adobe Firefly, and Leonardo AI',
      badge: 'AI Category'
    };
  }

  // 8. Check for Video Editing / Generation
  if (lower.includes('video') || lower.includes('video editing')) {
    const isAi = lower.includes('ai') || lower.includes('generate');
    return {
      type: 'explore-filter',
      targetUrl: isAi
        ? `/explore?type=ai&category=Video%20Generation`
        : `/explore?type=software&category=Video%20Editing`,
      title: isAi ? 'AI Video Generation Tools' : 'Video Editing Software Suite',
      subtitle: isAi
        ? 'Runway, Luma, Kling AI, Pika, and HeyGen'
        : 'Premiere Pro, DaVinci Resolve, Final Cut Pro, and CapCut',
      badge: 'Category'
    };
  }

  // 9. Check for Research / Trends
  if (lower.includes('research') || lower.includes('benchmark') || lower.includes('trend')) {
    return {
      type: 'research',
      targetUrl: '/research',
      title: 'Technology Research & Benchmarks',
      subtitle: 'Empirical head-to-head comparisons, model analysis, and industry guides',
      badge: 'Research Lab'
    };
  }

  // 10. Fallback to Explore search
  return {
    type: 'fallback',
    targetUrl: `/explore?q=${encodeURIComponent(query)}`,
    title: `Search results for "${query}"`,
    subtitle: `Explore directory filter for matching features, tags, and tools`,
    badge: 'Search'
  };
}

/**
 * Generate rich live autocomplete suggestions for search bar dropdowns.
 */
export function getSearchSuggestions(query: string, max = 5): SearchSuggestionItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const suggestions: SearchSuggestionItem[] = [];

  // 1. Direct tool match
  const matchedTool = findToolByNameOrAlias(q);
  if (matchedTool) {
    suggestions.push({
      id: `tool-${matchedTool.id}`,
      title: matchedTool.name,
      subtitle: `Full Research Dossier • ${matchedTool.category}`,
      badge: matchedTool.type === 'AI' ? 'AI Tool' : 'Software',
      targetUrl: `/tools/${matchedTool.id}`,
      iconType: 'tool',
      toolId: matchedTool.id
    });

    // If AI tool, add Model Research suggestion
    if (matchedTool.type === 'AI') {
      suggestions.push({
        id: `models-${matchedTool.id}`,
        title: `${matchedTool.name} AI Models & Versions`,
        subtitle: `Inspect context windows, benchmarks, and token pricing`,
        badge: 'Model Research',
        targetUrl: `/tools/${matchedTool.id}?tab=models`,
        iconType: 'models',
        toolId: matchedTool.id
      });
    }

    // Add Comparison suggestion with primary alternative
    if (matchedTool.alternatives && matchedTool.alternatives[0]) {
      const altTool = TOOLS_DATA.find((t) => t.id === matchedTool.alternatives[0]);
      if (altTool) {
        suggestions.push({
          id: `compare-${matchedTool.id}-${altTool.id}`,
          title: `Compare ${matchedTool.name} vs ${altTool.name}`,
          subtitle: `Side-by-side feature matrix and pricing`,
          badge: 'Comparison',
          targetUrl: `/compare?tools=${matchedTool.id},${altTool.id}`,
          iconType: 'compare'
        });
      }
    }
  }

  // 2. Matching tools list
  const matchingTools = TOOLS_DATA.filter(
    (t) =>
      t.id !== matchedTool?.id &&
      (t.name.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.features.some((f) => f.toLowerCase().includes(q)))
  ).slice(0, 3);

  for (const tool of matchingTools) {
    if (suggestions.length >= max) break;
    suggestions.push({
      id: `tool-${tool.id}`,
      title: tool.name,
      subtitle: tool.tagline,
      badge: tool.type,
      targetUrl: `/tools/${tool.id}`,
      iconType: 'tool',
      toolId: tool.id
    });
  }

  // 3. Matching Research Article
  const matchedArticle = RESEARCH_ARTICLES.find(
    (a) =>
      a.title.toLowerCase().includes(q) ||
      a.description.toLowerCase().includes(q) ||
      a.tags.some((tag) => tag.toLowerCase().includes(q))
  );
  if (matchedArticle && suggestions.length < max) {
    suggestions.push({
      id: `art-${matchedArticle.id}`,
      title: matchedArticle.title,
      subtitle: `${matchedArticle.category} • ${matchedArticle.readingTime}`,
      badge: 'Research',
      targetUrl: `/research?slug=${matchedArticle.slug}`,
      iconType: 'research'
    });
  }

  return suggestions.slice(0, max);
}
