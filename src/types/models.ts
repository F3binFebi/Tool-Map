export type ModelModality = 'Text' | 'Vision' | 'Audio' | 'Video' | 'Code';

export type ModelAvailability = 'Free Tier' | 'Plus/Pro Subscription' | 'API' | 'Enterprise' | 'Open Weights';

export interface ModelBenchmarkScore {
  metric: string; // e.g. "MMLU", "SWE-bench Verified", "HumanEval", "MATH"
  score: string; // e.g. "88.7%", "70.3%", "92.4%"
  comparison?: string; // e.g. "+5.2% vs GPT-4o"
}

export interface AIModel {
  id: string;
  name: string;
  version: string;
  releaseDate: string;
  contextWindow: string; // e.g. "128k tokens", "2,000,000 tokens", "200k tokens"
  maxOutputTokens?: string; // e.g. "16k tokens", "8k tokens"
  knowledgeCutoff?: string; // e.g. "October 2024", "April 2024"
  architecture?: string; // e.g. "Mixture of Experts (MoE)", "Dense Transformer", "Diffusion"
  modalities: ModelModality[];
  description: string;
  capabilities: string[];
  bestUseCases: string[];
  benchmarks?: ModelBenchmarkScore[];
  availability: ModelAvailability[];
  pricing: {
    inputPricePerMillion?: string; // e.g. "$2.50 / 1M tokens"
    outputPricePerMillion?: string; // e.g. "$10.00 / 1M tokens"
    subscriptionTier?: string; // e.g. "Included in ChatGPT Plus ($20/mo)"
    freeTierQuota?: string; // e.g. "15 requests/min"
  };
  strengths: string[];
  limitations: string[];
  recommendedFor: string;
}

export interface AIModelFamily {
  id: string;
  name: string; // e.g. "GPT-4o & Omni Series", "o-Series Reasoning", "Gemini 1.5 Multimodal Series"
  description: string;
  developer: string; // e.g. "OpenAI", "Google DeepMind", "Anthropic"
  generation: string; // e.g. "Frontier Multi-modal", "Chain-of-Thought Reasoning", "Long-Context"
  models: AIModel[];
}

export interface CompanyDeveloperInfo {
  name: string;
  headquarters: string;
  foundedYear: number;
  founders?: string[];
  ceo?: string;
  backingOrParent?: string; // e.g. "Microsoft ($13B partnership)", "Alphabet Inc. (Google DeepMind)"
  website: string;
  description: string;
  employeeCount?: string;
}

export interface DeveloperApiInfo {
  hasApi: boolean;
  endpointUrl?: string;
  sdkLanguages?: string[];
  rateLimits?: string;
  documentationUrl?: string;
  pricingSummary?: string;
  keyFeatures?: string[];
  codeSample?: {
    language: string;
    code: string;
  };
}

export interface CompetitorComparison {
  toolId: string;
  name: string;
  advantage: string;
  disadvantage: string;
  migrationEase: 'Simple' | 'Moderate' | 'Complex';
}

export interface ToolReviewItem {
  id: string;
  author: string;
  role: string;
  company?: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedUser: boolean;
  helpfulCount: number;
}
