import { TOOLS_DATA } from '../data/tools';
import { CATEGORIES, PURPOSES, matchesCategory } from '../data/categories';
import { RESEARCH_ARTICLES } from '../data/research';
import type {
  Tool,
  CategoryInfo,
  PurposeInfo,
  ResearchArticle,
  RecommendationCriteria,
  RecommendationResult,
  Platform,
  PricingType,
  ToolType
} from '../types';

export interface FilterOptions {
  query?: string;
  type?: ToolType | 'All';
  category?: string;
  purpose?: string;
  pricing?: PricingType | 'All';
  platform?: Platform | 'All';
  sortBy?: 'trending' | 'rating' | 'name' | 'newest';
}

/**
 * Service layer abstraction for ToolWise.
 * Currently backed by verified local mock data.
 * Ready to be swapped with fetch() / Axios REST API calls in Stage 2 without altering UI components.
 */
class ToolsService {
  private simulateLatency<T>(data: T, ms: number = 80): Promise<T> {
    return new Promise((resolve) => setTimeout(() => resolve(data), ms));
  }

  // Get all tools with optional filtering and sorting
  async getTools(options?: FilterOptions): Promise<Tool[]> {
    let result = [...TOOLS_DATA];

    if (!options) {
      return this.simulateLatency(result);
    }

    // Search query filter (matches name, tagline, description, features, useCases)
    if (options.query && options.query.trim()) {
      const q = options.query.toLowerCase().trim();
      result = result.filter((tool) => {
        return (
          tool.name.toLowerCase().includes(q) ||
          tool.tagline.toLowerCase().includes(q) ||
          tool.description.toLowerCase().includes(q) ||
          tool.category.toLowerCase().includes(q) ||
          tool.features.some((f) => f.toLowerCase().includes(q)) ||
          tool.useCases.some((u) => u.toLowerCase().includes(q)) ||
          tool.aiCapabilities.some((a) => a.toLowerCase().includes(q)) ||
          tool.purposes.some((p) => p.toLowerCase().includes(q)) ||
          (tool.tags && tool.tags.some((t) => t.toLowerCase().includes(q))) ||
          (tool.modelOrTech && tool.modelOrTech.toLowerCase().includes(q))
        );
      });
    }

    // Tool Type filter (AI vs Software) - case-insensitive
    if (options.type && options.type !== 'All') {
      const typeStr = String(options.type).toLowerCase();
      const targetType = typeStr === 'ai' ? 'AI' : typeStr === 'software' ? 'Software' : options.type;
      result = result.filter((t) => t.type.toLowerCase() === targetType.toLowerCase());
    }

    // Category filter using robust slug and alias matcher
    if (options.category && options.category !== 'All') {
      result = result.filter((t) =>
        matchesCategory(t.category, t.categorySlug, options.category!)
      );
    }

    // Purpose filter
    if (options.purpose && options.purpose !== 'All') {
      result = result.filter((t) =>
        t.purposes.some(
          (p) => p.toLowerCase() === options.purpose!.toLowerCase()
        )
      );
    }

    // Pricing filter
    if (options.pricing && options.pricing !== 'All') {
      result = result.filter((t) => t.pricing === options.pricing);
    }

    // Platform filter
    if (options.platform && options.platform !== 'All') {
      result = result.filter((t) =>
        t.platforms.includes(options.platform as Platform)
      );
    }

    // Sorting
    if (options.sortBy) {
      switch (options.sortBy) {
        case 'rating':
          result.sort((a, b) => b.rating - a.rating);
          break;
        case 'name':
          result.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'newest':
          result.sort((a, b) => b.releaseYear - a.releaseYear);
          break;
        case 'trending':
        default:
          result.sort((a, b) => {
            if (a.trending && !b.trending) return -1;
            if (!a.trending && b.trending) return 1;
            return b.rating - a.rating;
          });
          break;
      }
    }

    return this.simulateLatency(result);
  }

  // Get specific tool by ID
  async getToolById(id: string): Promise<Tool | null> {
    const tool = TOOLS_DATA.find((t) => t.id.toLowerCase() === id.toLowerCase());
    return this.simulateLatency(tool || null);
  }

  // Get trending tools for Homepage hero/ticker
  async getTrendingTools(): Promise<Tool[]> {
    const trending = TOOLS_DATA.filter((t) => t.trending).slice(0, 6);
    return this.simulateLatency(trending);
  }

  // Get featured tools
  async getFeaturedTools(): Promise<Tool[]> {
    const featured = TOOLS_DATA.filter((t) => t.featured).slice(0, 6);
    return this.simulateLatency(featured);
  }

  // Get categories taxonomy
  async getCategories(): Promise<CategoryInfo[]> {
    return this.simulateLatency(CATEGORIES);
  }

  // Get purposes taxonomy
  async getPurposes(): Promise<PurposeInfo[]> {
    return this.simulateLatency(PURPOSES);
  }

  // Get editorial research articles
  async getArticles(category?: string): Promise<ResearchArticle[]> {
    let articles = [...RESEARCH_ARTICLES];
    if (category && category !== 'All') {
      articles = articles.filter(
        (a) => a.category.toLowerCase() === category.toLowerCase()
      );
    }
    return this.simulateLatency(articles);
  }

  // Get article by slug
  async getArticleBySlug(slug: string): Promise<ResearchArticle | null> {
    const article = RESEARCH_ARTICLES.find(
      (a) => a.slug === slug || a.id === slug
    );
    return this.simulateLatency(article || null);
  }

  // Compare 2 to 4 tools
  async compareTools(toolIds: string[]): Promise<Tool[]> {
    const tools = TOOLS_DATA.filter((t) => toolIds.includes(t.id));
    return this.simulateLatency(tools);
  }

  // Rule-based Recommendation engine matching user criteria
  async getRecommendations(
    criteria: RecommendationCriteria
  ): Promise<RecommendationResult[]> {
    const { goal, experienceLevel, budget, platform } = criteria;
    const scoredTools: RecommendationResult[] = [];

    for (const tool of TOOLS_DATA) {
      let score = 50; // baseline
      let reason = '';

      // Goal matching
      const goalLower = goal.toLowerCase();
      const matchesPurpose = tool.purposes.some((p) =>
        goalLower.includes(p.toLowerCase())
      );
      const matchesCategory = tool.category.toLowerCase().includes(goalLower);

      if (matchesPurpose || matchesCategory) {
        score += 30;
        reason = `Directly optimized for ${goal}.`;
      }

      // Budget matching
      if (budget === 'Free') {
        if (tool.pricing === 'Free') {
          score += 20;
          reason += ' Has a 100% free tier available.';
        } else if (tool.pricing === 'Freemium') {
          score += 15;
          reason += ' Provides a generous free plan.';
        } else {
          score -= 30;
        }
      } else if (budget === 'Freemium') {
        if (tool.pricing === 'Freemium' || tool.pricing === 'Free') {
          score += 15;
        }
      }

      // Platform matching
      if (platform !== 'Any') {
        if (tool.platforms.includes(platform as Platform)) {
          score += 10;
          reason += ` Runs natively on ${platform}.`;
        } else {
          score -= 25;
        }
      }

      // Experience Level heuristic
      if (experienceLevel === 'Beginner') {
        if (['canva', 'chatgpt', 'raycast', 'perplexity'].includes(tool.id)) {
          score += 15;
          reason += ' Exceptional beginner-friendly UX with zero friction.';
        } else if (['webflow', 'supabase'].includes(tool.id)) {
          score -= 10;
        }
      } else if (experienceLevel === 'Advanced') {
        if (['cursor', 'figma', 'claude', 'supabase', 'webflow'].includes(tool.id)) {
          score += 20;
          reason += ' Professional-grade depth with high architectural control.';
        }
      }

      // Add rating bonus
      score += Math.round(tool.rating * 4);

      // Clamp score
      const finalScore = Math.min(Math.max(score, 30), 99);

      scoredTools.push({
        tool,
        matchScore: finalScore,
        recommendationReason: reason || `Reliable option for ${tool.category} workflows.`
      });
    }

    // Sort by highest match score
    scoredTools.sort((a, b) => b.matchScore - a.matchScore);

    return this.simulateLatency(scoredTools.slice(0, 4));
  }
}

export const toolsService = new ToolsService();
