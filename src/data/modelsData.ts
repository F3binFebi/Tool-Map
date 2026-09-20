import { AIModelFamily } from '../types/models';

export const TOOL_MODEL_FAMILIES: Record<string, AIModelFamily[]> = {
  chatgpt: [
    {
      id: 'gpt-4o-series',
      name: 'GPT-4o & Omni Series',
      developer: 'OpenAI',
      generation: 'Frontier Multimodal & Real-time Interaction',
      description: 'OpenAI’s flagship omni-modal architecture that natively ingests and generates text, vision, and real-time conversational audio.',
      models: [
        {
          id: 'gpt-4o',
          name: 'GPT-4o',
          version: '2024-11-20 (Omni)',
          releaseDate: 'May 2024 (Updated Nov 2024)',
          contextWindow: '128,000 tokens (~300 pages)',
          maxOutputTokens: '16,384 tokens',
          knowledgeCutoff: 'October 2023',
          architecture: 'Dense Multimodal Transformer',
          modalities: ['Text', 'Vision', 'Audio', 'Code'],
          description: 'Flagship model delivering GPT-4 Turbo-level intelligence with 2x faster response times, native audio understanding, and Canvas workspace collaboration.',
          capabilities: [
            'Native multimodal ingestion without separate speech-to-text transcribers',
            'Full Canvas interactive text & code editing with line-by-line diffs',
            'Advanced Voice Mode with inflection, emotional tone, and interruption support',
            'Complex diagram and UI mock-up understanding to code conversion',
            'Function calling and structured JSON output guarantee'
          ],
          bestUseCases: [
            'Interactive pair programming and script debugging',
            'Multimodal research and diagram interpretation',
            'Real-time voice conversational coaching and translation',
            'Long document summarization and cross-reference extraction'
          ],
          benchmarks: [
            { metric: 'MMLU', score: '88.7%', comparison: 'Frontier benchmark' },
            { metric: 'HumanEval (Coding)', score: '90.2%', comparison: '+3.8% vs GPT-4 Turbo' },
            { metric: 'MathVista', score: '63.8%', comparison: 'State-of-the-art vision math' }
          ],
          availability: ['Free Tier', 'Plus/Pro Subscription', 'API', 'Enterprise'],
          pricing: {
            inputPricePerMillion: '$2.50 / 1M tokens',
            outputPricePerMillion: '$10.00 / 1M tokens',
            subscriptionTier: 'Included in ChatGPT Plus ($20/mo) with higher rate limits'
          },
          strengths: [
            'Extremely fast response latency for frontier-class performance',
            'Unmatched conversational fluidness in voice mode',
            'Extensive Custom GPT and API ecosystem support'
          ],
          limitations: [
            'Knowledge cutoff requires SearchGPT tool use for events after 2023',
            'Occasionally introduces verbose conversational pleasantries'
          ],
          recommendedFor: 'Developers, researchers, knowledge workers, and teams seeking the most versatile general-purpose AI assistant.'
        },
        {
          id: 'gpt-4o-mini',
          name: 'GPT-4o mini',
          version: '2024-07-18',
          releaseDate: 'July 2024',
          contextWindow: '128,000 tokens',
          maxOutputTokens: '16,384 tokens',
          knowledgeCutoff: 'October 2023',
          architecture: 'Optimized Efficient Transformer',
          modalities: ['Text', 'Vision', 'Code'],
          description: 'Cost-effective small model designed to replace GPT-3.5 Turbo with significantly higher intelligence at 60% lower cost than previous small models.',
          capabilities: [
            'Fast text generation and lightweight vision analysis',
            'High throughput and sub-second time-to-first-token',
            'Function calling, structured output, and multi-turn chat memory'
          ],
          bestUseCases: [
            'High-volume customer support automation',
            'Real-time text classification and extraction',
            'Everyday conversational queries on the free tier'
          ],
          benchmarks: [
            { metric: 'MMLU', score: '82.0%', comparison: 'Surpasses GPT-3.5 Turbo & Claude 3 Haiku' },
            { metric: 'HumanEval', score: '87.2%' }
          ],
          availability: ['Free Tier', 'Plus/Pro Subscription', 'API'],
          pricing: {
            inputPricePerMillion: '$0.15 / 1M tokens',
            outputPricePerMillion: '$0.60 / 1M tokens',
            subscriptionTier: 'Free for all logged-in ChatGPT users'
          },
          strengths: [
            'Incredible cost efficiency ($0.15 / 1M tokens)',
            'Low latency perfect for streaming consumer apps'
          ],
          limitations: [
            'Limited deep mathematical or competitive coding reasoning compared to o-series'
          ],
          recommendedFor: 'Cost-sensitive API developers and general queries.'
        }
      ]
    },
    {
      id: 'o-series-reasoning',
      name: 'o-Series Chain-of-Thought Reasoning',
      developer: 'OpenAI',
      generation: 'Test-Time Compute & Deliberative Reasoning',
      description: 'Breakthrough reasoning models trained with reinforcement learning to generate silent internal chains of thought before answering.',
      models: [
        {
          id: 'o1',
          name: 'OpenAI o1',
          version: '2024-12-17 (o1 Full)',
          releaseDate: 'December 2024',
          contextWindow: '200,000 tokens',
          maxOutputTokens: '100,000 reasoning & completion tokens',
          knowledgeCutoff: 'October 2023',
          architecture: 'RL-Trained Deliberation Transformer',
          modalities: ['Text', 'Vision', 'Code'],
          description: 'OpenAI’s premier reasoning model that thinks before responding, excelling in competitive programming, PhD-level science, and complex multi-step logic.',
          capabilities: [
            'Autonomous error correction in mathematical proofs',
            'Deep refactoring across complex multi-file software architectures',
            'Visual reasoning over scientific diagrams and circuit schematics',
            'Configurable test-time compute scaling'
          ],
          bestUseCases: [
            'PhD-level biology, physics, and chemistry hypothesis testing',
            'Competitive coding and algorithmic optimization',
            'Complex legal document synthesis and multi-variable logic'
          ],
          benchmarks: [
            { metric: 'AIME 2024 (Math Olympiad)', score: '83.3%', comparison: 'Top 500 US students level' },
            { metric: 'Codeforces', score: '1807 Elo', comparison: '89th percentile human competitors' },
            { metric: 'GPQA Diamond (PhD Science)', score: '78.0%', comparison: 'Surpasses human experts' }
          ],
          availability: ['Plus/Pro Subscription', 'API', 'Enterprise'],
          pricing: {
            inputPricePerMillion: '$15.00 / 1M tokens',
            outputPricePerMillion: '$60.00 / 1M tokens',
            subscriptionTier: 'ChatGPT Plus & Pro (Tiered quotas)'
          },
          strengths: [
            'Highest accuracy on hard math and logic in the industry',
            'Substantially lower hallucination rate on verifiable facts'
          ],
          limitations: [
            'Deliberation time takes 5–30 seconds before response begins',
            'Higher token cost due to internal hidden reasoning tokens'
          ],
          recommendedFor: 'Software architects, quantitative analysts, researchers, and engineers solving high-stakes mathematical or architectural problems.'
        },
        {
          id: 'o3-mini',
          name: 'OpenAI o3-mini',
          version: '2025-01-31',
          releaseDate: 'January 2025',
          contextWindow: '200,000 tokens',
          maxOutputTokens: '100,000 tokens',
          knowledgeCutoff: 'October 2023',
          architecture: 'RL Reasoning Compact Engine',
          modalities: ['Text', 'Code'],
          description: 'High-speed reasoning model tailored for science, math, and coding with configurable reasoning effort (low, medium, high).',
          capabilities: [
            'Configurable reasoning effort for latency vs depth trade-offs',
            'Rapid algorithmic problem solving',
            'Function calling and developer tools integration'
          ],
          bestUseCases: [
            'STEM tutoring and step-by-step problem breakdown',
            'Fast code review and test generation',
            'API backend logic evaluation'
          ],
          benchmarks: [
            { metric: 'SWE-bench Verified', score: '49.3%', comparison: 'High-speed coding leader' },
            { metric: 'AIME 2024', score: '87.3% (High effort)' }
          ],
          availability: ['Free Tier', 'Plus/Pro Subscription', 'API'],
          pricing: {
            inputPricePerMillion: '$1.10 / 1M tokens',
            outputPricePerMillion: '$4.40 / 1M tokens'
          },
          strengths: [
            'Unbeatable price-to-reasoning ratio',
            'Low deliberation latency compared to o1'
          ],
          limitations: [
            'Does not support visual inputs (pure text and code)'
          ],
          recommendedFor: 'Developers seeking fast reasoning at low token cost.'
        }
      ]
    }
  ],

  gemini: [
    {
      id: 'gemini-1-5-series',
      name: 'Gemini 1.5 Multimodal Frontier Series',
      developer: 'Google DeepMind',
      generation: 'Vast-Context Multimodal Architecture',
      description: 'Google’s groundbreaking architecture featuring up to a 2,000,000 token context window with native multimodal understanding across text, code, audio, and video.',
      models: [
        {
          id: 'gemini-1-5-pro',
          name: 'Gemini 1.5 Pro',
          version: '002 (Sept 2024)',
          releaseDate: 'February 2024 (Updated Sept 2024)',
          contextWindow: '2,000,000 tokens (~1.5M words or 1 hr video)',
          maxOutputTokens: '8,192 tokens',
          knowledgeCutoff: 'March 2024',
          architecture: 'Sparse Mixture of Experts (MoE) Transformer',
          modalities: ['Text', 'Vision', 'Audio', 'Video', 'Code'],
          description: 'The industry context-window champion, able to process up to 1 hour of video, 11 hours of audio, or entire 30,000+ line software codebases in a single prompt with 99%+ needle-in-a-haystack retrieval accuracy.',
          capabilities: [
            'Unprecedented 2M-token context window with near-perfect retrieval',
            'Native multimodal video and audio ingestion without transcription middleware',
            'Deep integration with Google Workspace (Drive, Docs, Gmail, YouTube, Maps)',
            'Cross-repository codebase understanding and architectural mapping',
            'Real-time grounding with Google Search live web index'
          ],
          bestUseCases: [
            'Auditing large legacy codebases across dozens of files at once',
            'Analyzing full hour-long corporate earnings calls or lecture videos',
            'Synthesizing dozens of scientific research PDFs simultaneously',
            'Automating enterprise workflows within Google Workspace'
          ],
          benchmarks: [
            { metric: 'Needle-In-A-Haystack (2M tokens)', score: '99.7%', comparison: 'Industry record' },
            { metric: 'Video-MME (Video Understanding)', score: '82.5%', comparison: 'Top multimodal score' },
            { metric: 'MMLU-Pro', score: '78.2%' }
          ],
          availability: ['Plus/Pro Subscription', 'API', 'Enterprise'],
          pricing: {
            inputPricePerMillion: '$1.25 / 1M tokens (<128k) / $2.50 (>128k)',
            outputPricePerMillion: '$5.00 / 1M tokens (<128k) / $10.00 (>128k)',
            subscriptionTier: 'Gemini Advanced ($19.99/mo) with 2TB Google One storage'
          },
          strengths: [
            'Massive 2M token context window completely changes information ingestion',
            'Native video comprehension is unmatched by any competitor',
            'Seamless integration with Google Drive and YouTube'
          ],
          limitations: [
            'Very large context calls have higher processing latency',
            'Safety filters can occasionally be overly strict on creative prompts'
          ],
          recommendedFor: 'Enterprise teams, media analysts, legal researchers, and developers needing to query enormous documents and video archives.'
        },
        {
          id: 'gemini-1-5-flash',
          name: 'Gemini 1.5 Flash',
          version: '002 (Sept 2024)',
          releaseDate: 'May 2024',
          contextWindow: '1,000,000 tokens',
          maxOutputTokens: '8,192 tokens',
          knowledgeCutoff: 'March 2024',
          architecture: 'Distilled MoE Transformer',
          modalities: ['Text', 'Vision', 'Audio', 'Video', 'Code'],
          description: 'A lightning-fast, highly cost-efficient workhorse model engineered by Google DeepMind for high-frequency multimodal tasks.',
          capabilities: [
            '1M-token context window at budget pricing',
            'Rapid audio transcription and multimodal video summary',
            'Sub-second latency on standard prompts'
          ],
          bestUseCases: [
            'High-throughput document scanning and customer service',
            'Real-time meeting audio transcription & action item extraction',
            'Mobile app and agentic tool-use loops'
          ],
          benchmarks: [
            { metric: 'MMLU', score: '82.5%' },
            { metric: 'Time to First Token', score: '<400ms', comparison: 'Ultra-fast' }
          ],
          availability: ['Free Tier', 'Plus/Pro Subscription', 'API'],
          pricing: {
            inputPricePerMillion: '$0.075 / 1M tokens (<128k)',
            outputPricePerMillion: '$0.30 / 1M tokens',
            freeTierQuota: 'Free tier includes 15 requests per minute in Google AI Studio'
          },
          strengths: [
            'Extremely low price ($0.075/M) with a 1M token context window',
            'High speed and low latency across all modalities'
          ],
          limitations: [
            'Slightly lower complex reasoning depth compared to 1.5 Pro'
          ],
          recommendedFor: 'Developers building high-volume production applications on a budget.'
        },
        {
          id: 'gemini-2-0-flash',
          name: 'Gemini 2.0 Flash (Next-Gen)',
          version: 'Experimental Preview',
          releaseDate: 'December 2024',
          contextWindow: '1,000,000 tokens',
          maxOutputTokens: '8,192 tokens',
          modalities: ['Text', 'Vision', 'Audio', 'Video', 'Code'],
          description: 'Google’s next-generation model built from the ground up for agentic execution and real-time bidirectional multimodal streaming.',
          capabilities: [
            'Native multimodal live audio-to-audio streaming with under 200ms latency',
            'Autonomous tool execution (code execution, search, third-party APIs)',
            'Visual spatial reasoning and direct screen interaction'
          ],
          bestUseCases: [
            'Autonomous desktop and browser agents',
            'Hands-free real-time voice and camera interactive assistants'
          ],
          benchmarks: [
            { metric: 'Multimodal Live Latency', score: '180ms', comparison: 'Industry leading' }
          ],
          availability: ['API', 'Free Tier'],
          pricing: {
            inputPricePerMillion: '$0.10 / 1M tokens',
            outputPricePerMillion: '$0.40 / 1M tokens',
            freeTierQuota: 'Free in Google AI Studio Preview'
          },
          strengths: [
            'Incredible speed and native tool usage',
            'Next-generation multimodal live experience'
          ],
          limitations: [
            'Preview release subject to evolving API quotas'
          ],
          recommendedFor: 'Pioneering developers building autonomous agents and real-time voice applications.'
        }
      ]
    }
  ],

  claude: [
    {
      id: 'claude-3-5-series',
      name: 'Claude 3.5 & 3.7 Frontier Series',
      developer: 'Anthropic',
      generation: 'Steerable Nuance & Autonomous Agentic Coding',
      description: 'Anthropic’s industry-standard AI models celebrated for unrivaled software engineering accuracy, natural cadence prose, and live interactive Artifacts.',
      models: [
        {
          id: 'claude-3-5-sonnet',
          name: 'Claude 3.5 Sonnet',
          version: 'v2 (Oct 2024)',
          releaseDate: 'June 2024 (Updated Oct 2024)',
          contextWindow: '200,000 tokens (~500 pages)',
          maxOutputTokens: '8,192 tokens',
          knowledgeCutoff: 'April 2024',
          architecture: 'Dense Constitutional Transformer',
          modalities: ['Text', 'Vision', 'Code'],
          description: 'Anthropic’s flagship model and the global benchmark leader in coding, reasoning, and visual interpretation. Sets the gold standard for software engineering with Artifacts live component previews.',
          capabilities: [
            'Industry-leading SWE-bench Verified coding benchmark performance',
            'Artifacts visual interactive workspace for React, SVG, HTML, and markdown',
            'Computer Use API (experimental preview) for keyboard/mouse automation',
            'Steerable, nuanced writing devoid of corporate AI cliches',
            'Prompt Caching allowing 90% cost reduction on repeated context'
          ],
          bestUseCases: [
            'Full-stack software engineering and refactoring',
            'Interactive React and Tailwind component prototyping in Artifacts',
            'Complex legal, financial, and analytical report synthesis',
            'Diagram, screenshot, and architectural chart extraction'
          ],
          benchmarks: [
            { metric: 'SWE-bench Verified', score: '70.3%', comparison: 'Industry #1 software benchmark' },
            { metric: 'HumanEval (0-shot)', score: '93.7%', comparison: 'Near-perfect code generation' },
            { metric: 'MMLU (Undergrad Level)', score: '88.3%' }
          ],
          availability: ['Free Tier', 'Plus/Pro Subscription', 'API', 'Enterprise'],
          pricing: {
            inputPricePerMillion: '$3.00 / 1M tokens (Cache write: $3.75, read: $0.30)',
            outputPricePerMillion: '$15.00 / 1M tokens',
            subscriptionTier: 'Included in Claude Pro ($20/mo) with 5x usage limits'
          },
          strengths: [
            'Best code generation and codebase refactoring on earth',
            'Most natural, thoughtful human-like prose without repetitive fillers',
            'Artifacts UI is the best prototype iteration experience in AI'
          ],
          limitations: [
            'Does not have native audio generation (pure text and vision)',
            'Strict safety guardrails on sensitive security research topics'
          ],
          recommendedFor: 'Professional developers, writers, product designers, and researchers requiring utmost fidelity in code and analysis.'
        },
        {
          id: 'claude-3-5-haiku',
          name: 'Claude 3.5 Haiku',
          version: 'Nov 2024',
          releaseDate: 'November 2024',
          contextWindow: '200,000 tokens',
          maxOutputTokens: '8,192 tokens',
          knowledgeCutoff: 'July 2024',
          architecture: 'Optimized Lightweight Transformer',
          modalities: ['Text', 'Vision', 'Code'],
          description: 'Anthropic’s fastest model, outperforming Claude 3 Opus on coding benchmarks at a fraction of the latency and cost.',
          capabilities: [
            'Instantaneous response times for fast interactive coding',
            '200k context window with prompt caching support',
            'Strong vision and chart reading capabilities'
          ],
          bestUseCases: [
            'Inline code completion and fast linter feedback',
            'High-velocity consumer chat applications',
            'Fast document parsing and data extraction'
          ],
          benchmarks: [
            { metric: 'HumanEval', score: '75.9%', comparison: 'Beats previous-gen Claude 3 Opus' }
          ],
          availability: ['Plus/Pro Subscription', 'API'],
          pricing: {
            inputPricePerMillion: '$0.80 / 1M tokens',
            outputPricePerMillion: '$4.00 / 1M tokens'
          },
          strengths: [
            'Blazing fast response speed',
            'Higher coding accuracy than previous flagship models'
          ],
          limitations: [
            'Not available on the free tier directly'
          ],
          recommendedFor: 'Developers building real-time applications and agent sub-processes.'
        },
        {
          id: 'claude-3-7-sonnet',
          name: 'Claude 3.7 Sonnet (Hybrid Reasoning)',
          version: 'March 2025',
          releaseDate: 'March 2025',
          contextWindow: '200,000 tokens',
          maxOutputTokens: '64,000 tokens',
          knowledgeCutoff: 'November 2024',
          architecture: 'Dual-Engine Hybrid Reasoning',
          modalities: ['Text', 'Vision', 'Code'],
          description: 'The first hybrid model enabling seamless switching between instantaneous response and extended test-time thinking, allowing users to dial in the exact reasoning budget needed.',
          capabilities: [
            'Configurable test-time thinking budget up to 64k tokens',
            'Surgical code refactoring with zero repetitive padding',
            'Deep multi-step algorithmic proof generation'
          ],
          bestUseCases: [
            'Autonomous repository-level bug fixing',
            'Full enterprise system architecture evaluation',
            'Intricate mathematical proofs and smart contract verification'
          ],
          benchmarks: [
            { metric: 'SWE-bench Verified', score: '70.3%+', comparison: 'State of the art' }
          ],
          availability: ['Plus/Pro Subscription', 'API', 'Enterprise'],
          pricing: {
            inputPricePerMillion: '$3.00 / 1M tokens',
            outputPricePerMillion: '$15.00 / 1M tokens',
            subscriptionTier: 'Claude Pro & Enterprise'
          },
          strengths: [
            'Combines instant response with optional deep thinking in one unified model',
            'Massive 64k token output limit'
          ],
          limitations: [
            'Extended thinking consumes output quota more quickly'
          ],
          recommendedFor: 'Engineers tackling the most intricate algorithmic and architectural software tasks.'
        }
      ]
    }
  ],

  deepseek: [
    {
      id: 'deepseek-r1-v3',
      name: 'DeepSeek R1 & V3 Open Weights Series',
      developer: 'DeepSeek AI',
      generation: 'Open-Weights Reinforcement Learning',
      description: 'High-efficiency open-weights models trained with novel Multi-Head Latent Attention (MLA) and pure RL reasoning algorithms.',
      models: [
        {
          id: 'deepseek-r1',
          name: 'DeepSeek-R1',
          version: 'Jan 2025',
          releaseDate: 'January 2025',
          contextWindow: '128,000 tokens',
          maxOutputTokens: '8,192 tokens',
          modalities: ['Text', 'Code'],
          description: 'Open-weights reasoning model that rivals OpenAI o1 on math and code, released under an unrestrictive MIT license.',
          capabilities: [
            'Transparent chain-of-thought visible to users in real time',
            'Mathematical proof solving and competitive coding',
            'Available for local deployment (quantized 1.5B to 671B)'
          ],
          bestUseCases: ['Self-hosted mathematical reasoning', 'Private enterprise coding pipelines'],
          benchmarks: [
            { metric: 'AIME 2024', score: '79.8%', comparison: 'Rivals OpenAI o1' },
            { metric: 'MATH-500', score: '97.3%' }
          ],
          availability: ['Free Tier', 'API', 'Open Weights'],
          pricing: {
            inputPricePerMillion: '$0.55 / 1M tokens',
            outputPricePerMillion: '$2.19 / 1M tokens'
          },
          strengths: ['MIT license allows commercial self-hosting', 'Extremely cheap API pricing'],
          limitations: ['Can generate extensive Chinese thoughts when prompted in English', 'No native image understanding'],
          recommendedFor: 'Open-source advocates, researchers, and privacy-conscious enterprises running on-premise inference.'
        },
        {
          id: 'deepseek-v3',
          name: 'DeepSeek-V3',
          version: 'Dec 2024',
          releaseDate: 'December 2024',
          contextWindow: '128,000 tokens',
          modalities: ['Text', 'Code'],
          description: '671B parameter Mixture of Experts model activating only 37B parameters per token for extraordinary training and inference efficiency.',
          capabilities: ['Fast general knowledge', 'Multi-lingual translation', 'High-throughput code generation'],
          bestUseCases: ['Cost-sensitive production API deployments', 'General text synthesis'],
          benchmarks: [{ metric: 'MMLU', score: '88.5%' }],
          availability: ['Free Tier', 'API', 'Open Weights'],
          pricing: {
            inputPricePerMillion: '$0.14 / 1M tokens',
            outputPricePerMillion: '$0.28 / 1M tokens'
          },
          strengths: ['Disruptively inexpensive pricing', 'High throughput'],
          limitations: ['High memory requirements for full unquantized self-hosting'],
          recommendedFor: 'Developers seeking maximum performance per dollar.'
        }
      ]
    }
  ],

  midjourney: [
    {
      id: 'midjourney-models',
      name: 'Midjourney Generative Diffusion Architecture',
      developer: 'Midjourney Inc.',
      generation: 'Artistic Latent Diffusion',
      description: 'The premier aesthetic image generation engine renowned for photorealistic lighting, cinematic texture, and high prompt coherence.',
      models: [
        {
          id: 'midjourney-v6-1',
          name: 'Midjourney v6.1',
          version: '6.1 (August 2024)',
          releaseDate: 'August 2024',
          contextWindow: 'Text Prompt + Image References',
          architecture: 'High-Resolution Latent Diffusion Model',
          modalities: ['Vision'],
          description: 'State-of-the-art image generation engine with enhanced coherence for human skin, photorealistic textures, and accurate short-text rendering.',
          capabilities: [
            'Cinematic camera lighting, bokeh, and subsurface scattering',
            'Accurate human anatomy (hands, eyes, hair textures)',
            'Prompt-guided inpainting (Vary Region) and outpainting (Pan/Zoom)',
            'Style Reference (--sref) and Character Reference (--cref) consistency'
          ],
          bestUseCases: [
            'Concept art and film mood boarding',
            'Photorealistic editorial fashion and product photography',
            'Marketing visual assets and social media graphics'
          ],
          availability: ['Plus/Pro Subscription'],
          pricing: {
            subscriptionTier: 'Standard Plan ($30/mo) for unlimited relaxed generations'
          },
          strengths: [
            'Best aesthetic and artistic default output in the industry',
            'Outstanding character and style consistency flags'
          ],
          limitations: [
            'No public API (accessed through Discord and official web portal)',
            'Requires commercial subscription for business usage'
          ],
          recommendedFor: 'Designers, art directors, digital artists, and creative agencies.'
        }
      ]
    }
  ],

  cursor: [
    {
      id: 'cursor-ai-engine',
      name: 'Cursor Agentic Multi-Model Engineering Engine',
      developer: 'Anysphere Inc.',
      generation: 'Full-Codebase Context & Agentic Editing',
      description: 'Specialized editor architecture orchestrating frontier models (Claude 3.5 Sonnet, GPT-4o, Cursor-Small) with custom codebase embeddings.',
      models: [
        {
          id: 'cursor-composer',
          name: 'Cursor Composer (Multi-File Agent)',
          version: 'v0.45+',
          releaseDate: 'Late 2024',
          contextWindow: 'Codebase Vector Index + 200k Model Window',
          architecture: 'Agentic Orchestration over Frontier LLMs',
          modalities: ['Code', 'Text'],
          description: 'An agentic multi-file code synthesis engine that reads repository context and simultaneously creates, modifies, and lints multiple files across your workspace.',
          capabilities: [
            'Full repository vector indexing with semantic file lookup (@codebase)',
            'Multi-file generation and atomic diff reviews',
            'Terminal command suggestion and auto-healing compiler errors'
          ],
          bestUseCases: [
            'Scaffolding entire full-stack features from a single prompt',
            'Mass refactoring APIs across dozens of interrelated files',
            'Accelerated debugging with direct terminal log inspection'
          ],
          availability: ['Free Tier', 'Plus/Pro Subscription', 'Enterprise'],
          pricing: {
            subscriptionTier: '$20/mo Pro plan (500 fast frontier requests + unlimited slow)'
          },
          strengths: [
            'Huge productivity boost over traditional inline completion',
            'Flawless VS Code extension compatibility and keybindings'
          ],
          limitations: [
            'Requires developer to review large diffs carefully before accepting'
          ],
          recommendedFor: 'Professional software developers and engineering teams.'
        }
      ]
    }
  ]
};

export function getModelFamiliesForTool(toolId: string): AIModelFamily[] | undefined {
  return TOOL_MODEL_FAMILIES[toolId.toLowerCase()];
}
