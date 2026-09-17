export type ToolType = 'AI' | 'Software';

export type PricingType = 'Free' | 'Freemium' | 'Paid' | 'Enterprise';

export type Platform = 'Web' | 'macOS' | 'Windows' | 'Linux' | 'iOS' | 'Android';

export interface PricingTier {
  name: string;
  price: string;
  billingPeriod?: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

export interface Benchmark {
  metric: string;
  score: string;
  context: string;
}

export interface Tool {
  id: string;
  name: string;
  tagline: string;
  description: string;
  type: ToolType;
  category: string;
  purposes: string[]; // Write, Design, Code, Research, Create, Automate, Learn, Manage
  pricing: PricingType;
  pricingStartingPrice: string;
  pricingTiers: PricingTier[];
  platforms: Platform[];
  features: string[];
  aiCapabilities: string[];
  useCases: string[];
  pros: string[];
  cons: string[];
  bestFor: string;
  alternatives: string[]; // Tool IDs
  rating: number; // 0 - 5.0
  reviewCount: number;
  websiteUrl: string;
  releaseYear: number;
  verified: boolean;
  trending: boolean;
  featured: boolean;
  benchmarks?: Benchmark[];
  categorySlug?: string;
  modelOrTech?: string;
  primaryCapability?: string;
  keyWorkflow?: string;
  tags?: string[];
  logo?: string;
}

export interface CategoryInfo {
  id: string;
  name: string;
  type: ToolType;
  description: string;
  toolCount: number;
  iconName: string;
}

export interface PurposeInfo {
  id: string;
  name: string;
  tagline: string;
  description: string;
  iconName: string;
  toolCount: number;
}

export interface ResearchArticle {
  id: string;
  title: string;
  slug: string;
  category: string; // Guides, Comparisons, AI Explanations, Software Guides, Technology Trends, Tool Reviews
  description: string;
  readingTime: string;
  publishedDate: string;
  author: {
    name: string;
    role: string;
  };
  keyTakeaways: string[];
  contentSections: {
    heading: string;
    body: string;
  }[];
  relatedToolIds: string[];
  tags: string[];
}

export interface RecommendationCriteria {
  goal: string;
  experienceLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  budget: 'Free' | 'Freemium' | 'Any';
  platform: Platform | 'Any';
}

export interface RecommendationResult {
  tool: Tool;
  matchScore: number;
  recommendationReason: string;
}

export interface UserPreferences {
  theme: 'light' | 'system';
  showBenchmarks: boolean;
  compactCards: boolean;
}

export interface SavedCollection {
  id: string;
  name: string;
  description: string;
  toolIds: string[];
  createdAt: string;
}
