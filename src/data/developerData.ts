import {
  CompanyDeveloperInfo,
  DeveloperApiInfo,
  CompetitorComparison,
  ToolReviewItem
} from '../types/models';

export interface ToolExtendedResearch {
  developerInfo: CompanyDeveloperInfo;
  apiInfo: DeveloperApiInfo;
  strengths: string[];
  limitations: string[];
  competitorComparisons: CompetitorComparison[];
  userReviews: ToolReviewItem[];
  relatedResearchSlugs: string[];
}

export const EXTENDED_TOOL_RESEARCH: Record<string, ToolExtendedResearch> = {
  chatgpt: {
    developerInfo: {
      name: 'OpenAI, Inc. & OpenAI Global LLC',
      headquarters: 'San Francisco, California, USA',
      foundedYear: 2015,
      founders: ['Sam Altman', 'Greg Brockman', 'Ilya Sutskever', 'Wojciech Zaremba', 'John Schulman', 'Elon Musk'],
      ceo: 'Sam Altman',
      backingOrParent: 'Microsoft ($13B Strategic Partnership), Thrive Capital, Khosla Ventures',
      website: 'https://openai.com',
      employeeCount: '~1,700 employees',
      description: 'An AI research and deployment company dedicated to ensuring artificial general intelligence benefits all of humanity. Creators of GPT-4, o1, DALL-E, Sora, and Whisper.'
    },
    apiInfo: {
      hasApi: true,
      endpointUrl: 'https://api.openai.com/v1/chat/completions',
      sdkLanguages: ['Python', 'TypeScript/Node.js', 'Go', 'Java', 'cURL'],
      rateLimits: 'Tier 1 to 5 (Up to 10,000 requests per minute & 2M TPM for verified enterprise)',
      documentationUrl: 'https://platform.openai.com/docs',
      pricingSummary: 'Pay-as-you-go per million tokens (GPT-4o: $2.50 in / $10.00 out; o3-mini: $1.10 in / $4.40 out)',
      keyFeatures: ['Streaming responses', 'Structured JSON schema outputs', 'Function calling / Tools', 'Vision & Audio endpoints', 'Assistants API with Code Interpreter'],
      codeSample: {
        language: 'typescript',
        code: `import OpenAI from 'openai';\n\nconst client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });\n\nconst response = await client.chat.completions.create({\n  model: 'gpt-4o',\n  messages: [\n    { role: 'system', content: 'You are an elite research scientist.' },\n    { role: 'user', content: 'Summarize quantum entanglement applications.' }\n  ],\n  temperature: 0.7\n});\nconsole.log(response.choices[0].message.content);`
      }
    },
    strengths: [
      'Unmatched multi-modal versatility (Text, Vision, Real-time Voice, Code, Canvas)',
      'Largest global developer and Custom GPT community ecosystem',
      'Extensive integration with third-party tools (Zapier, Apple Intelligence, Notion)',
      'Superb chain-of-thought mathematical reasoning with the o-series models'
    ],
    limitations: [
      'Training data cutoff requires active web tool execution for current events',
      'Context window (128k/200k) is smaller than Gemini’s 2M-token capacity',
      'Free tier encounters rate limiting and concurrency throttles during peak loads'
    ],
    competitorComparisons: [
      {
        toolId: 'claude',
        name: 'Claude by Anthropic',
        advantage: 'ChatGPT offers superior voice mode and Custom GPT store ecosystem.',
        disadvantage: 'Claude 3.5 Sonnet exhibits higher code quality on SWE-bench and more nuanced writing.',
        migrationEase: 'Simple'
      },
      {
        toolId: 'gemini',
        name: 'Google Gemini',
        advantage: 'ChatGPT has tighter desktop Canvas workflows and voice fluidity.',
        disadvantage: 'Gemini has a 10x larger context window (2M tokens) and native Google Drive/YouTube sync.',
        migrationEase: 'Simple'
      }
    ],
    userReviews: [
      {
        id: 'rev-c1',
        author: 'Sarah Jenkins',
        role: 'VP of Product Engineering',
        company: 'Veloce Labs',
        rating: 5,
        date: 'March 2025',
        title: 'Canvas and o3-mini have doubled our development throughput',
        comment: 'We use ChatGPT Plus across our entire 40-person engineering team. The Canvas interface allows our junior engineers to visually review diffs without opening terminal conflicts, and o3-mini is scary accurate on distributed systems debugging.',
        verifiedUser: true,
        helpfulCount: 84
      },
      {
        id: 'rev-c2',
        author: 'Alexandre Roy',
        role: 'Principal Data Scientist',
        company: 'Apex Quant',
        rating: 5,
        date: 'February 2025',
        title: 'o1 changed quantitative modeling research for us',
        comment: 'When testing complex stochastic calculus equations, normal LLMs fail quickly. OpenAI o1 spends 20 seconds pondering and generates mathematically rigorous answers with step-by-step proofs. Worth every penny of the Pro subscription.',
        verifiedUser: true,
        helpfulCount: 62
      }
    ],
    relatedResearchSlugs: [
      'claude-3-7-vs-chatgpt-reasoning',
      'frontier-models-march-2025-benchmark',
      'the-2m-token-context-frontier'
    ]
  },

  gemini: {
    developerInfo: {
      name: 'Google LLC (Google DeepMind)',
      headquarters: 'Mountain View, California & London, UK',
      foundedYear: 2010,
      founders: ['Demis Hassabis', 'Shane Legg', 'Mustafa Suleyman (DeepMind); Larry Page, Sergey Brin (Google)'],
      ceo: 'Sundar Pichai (Alphabet) / Demis Hassabis (Google DeepMind)',
      backingOrParent: 'Alphabet Inc. (NASDAQ: GOOGL)',
      website: 'https://deepmind.google/technologies/gemini/',
      employeeCount: '~180,000 (Alphabet)',
      description: 'The premier AI research laboratory formed by merging Google Brain and DeepMind. Creators of AlphaFold, AlphaGo, Transformer architecture, and the Gemini multimodal model family.'
    },
    apiInfo: {
      hasApi: true,
      endpointUrl: 'https://generativelanguage.googleapis.com/v1beta/models',
      sdkLanguages: ['Python', 'TypeScript/JavaScript', 'Go', 'Swift', 'REST'],
      rateLimits: 'Generous Free Tier: 15 Requests Per Minute (RPM); Pay-As-You-Go with high concurrency in Vertex AI',
      documentationUrl: 'https://ai.google.dev/docs',
      pricingSummary: 'Gemini 1.5 Flash: $0.075/1M input; Gemini 1.5 Pro: $1.25/1M input (<128k) or $2.50 (>128k)',
      keyFeatures: ['2,000,000 token context window', 'Native video/audio processing', 'Google Search grounding', 'Code execution', 'System instructions & JSON mode'],
      codeSample: {
        language: 'typescript',
        code: `import { GoogleGenerativeAI } from '@google/generative-ai';\n\nconst genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);\nconst model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });\n\nconst result = await model.generateContent([\n  'Analyze this 1-hour video and extract key customer complaints',\n  videoFilePart\n]);\nconsole.log(result.response.text());`
      }
    },
    strengths: [
      'Unprecedented 2,000,000 token context window (can read whole codebases or 1 hr video)',
      'Native video and audio processing without transcription loss or conversion delay',
      'Deep Google Workspace integration (Docs, Gmail, Drive, YouTube, Google Maps)',
      'Extremely generous free tier in Google AI Studio (15 RPM for free)'
    ],
    limitations: [
      'Safety alignment filters can sometimes be overly cautious on creative edge cases',
      'Reasoning on niche programming languages trails Claude 3.5 Sonnet slightly'
    ],
    competitorComparisons: [
      {
        toolId: 'chatgpt',
        name: 'ChatGPT by OpenAI',
        advantage: 'Gemini has a 10x larger context window (2M tokens vs 200k) and native video processing.',
        disadvantage: 'ChatGPT has a more mature desktop Canvas workspace and third-party Custom GPT store.',
        migrationEase: 'Simple'
      },
      {
        toolId: 'claude',
        name: 'Claude by Anthropic',
        advantage: 'Gemini can process full audio and video files natively; much cheaper token pricing.',
        disadvantage: 'Claude 3.5 Sonnet maintains a lead on pure software engineering SWE-bench benchmarks.',
        migrationEase: 'Simple'
      }
    ],
    userReviews: [
      {
        id: 'rev-g1',
        author: 'David Zhang',
        role: 'Chief Architect',
        company: 'FinStream Global',
        rating: 5,
        date: 'March 2025',
        title: 'Analyzing 40 quarterly earnings calls in 5 minutes',
        comment: 'Gemini 1.5 Pro’s 2 million token context window is an absolute superpower for financial analysts. We upload dozens of audio files and PDFs simultaneously, and its retrieval accuracy is essentially 100%. Nothing else in the market comes close.',
        verifiedUser: true,
        helpfulCount: 91
      },
      {
        id: 'rev-g2',
        author: 'Maria Morales',
        role: 'Full-Stack Lead',
        company: 'OmniFlow',
        rating: 5,
        date: 'February 2025',
        title: 'Gemini 1.5 Flash is the best value in the entire AI ecosystem',
        comment: 'At $0.075 per million tokens with a 1 million token context window, Gemini 1.5 Flash replaced all our legacy classification models. It is fast, reliable, and costs us virtually nothing on high-volume production endpoints.',
        verifiedUser: true,
        helpfulCount: 77
      }
    ],
    relatedResearchSlugs: [
      'the-2m-token-context-frontier',
      'frontier-models-march-2025-benchmark',
      'claude-3-7-vs-chatgpt-reasoning'
    ]
  },

  claude: {
    developerInfo: {
      name: 'Anthropic PBC',
      headquarters: 'San Francisco, California, USA',
      foundedYear: 2021,
      founders: ['Dario Amodei', 'Daniela Amodei', 'Jack Clark', 'Sam McCandlish', 'Tom Brown'],
      ceo: 'Dario Amodei',
      backingOrParent: 'Amazon ($4B investment), Google ($2B investment), Public Benefit Corporation (PBC)',
      website: 'https://anthropic.com',
      employeeCount: '~800 employees',
      description: 'An AI safety and research company that builds reliable, interpretable, and steerable AI systems. Pioneers of Constitutional AI, Artifacts visual collaboration, and the Claude model series.'
    },
    apiInfo: {
      hasApi: true,
      endpointUrl: 'https://api.anthropic.com/v1/messages',
      sdkLanguages: ['Python', 'TypeScript/JavaScript', 'Go', 'cURL', 'AWS Bedrock', 'GCP Vertex AI'],
      rateLimits: 'Tier 1 to 4 (Up to 4,000 RPM and 400k TPM with prompt caching support)',
      documentationUrl: 'https://docs.anthropic.com',
      pricingSummary: 'Claude 3.5 Sonnet: $3.00/1M in, $15.00/1M out; Prompt Caching provides 90% discount on cached reads ($0.30/1M)',
      keyFeatures: ['Prompt Caching (up to 5 min TTL)', 'Artifacts UI preview', 'Computer Use API', 'Vision analysis', 'Batch Processing API (50% discount)'],
      codeSample: {
        language: 'typescript',
        code: `import Anthropic from '@anthropic-ai/sdk';\n\nconst anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });\n\nconst msg = await anthropic.messages.create({\n  model: 'claude-3-5-sonnet-20241022',\n  max_tokens: 4096,\n  messages: [{ role: 'user', content: 'Refactor this React hook into an optimized Zustand store.' }]\n});\nconsole.log(msg.content[0].text);`
      }
    },
    strengths: [
      'Industry-leading coding accuracy and SWE-bench benchmark champion (70.3%)',
      'Artifacts interface is the finest visual prototyping experience in modern AI',
      'Prose quality is rich, natural, and free from repetitive robotic AI formulas',
      'Prompt Caching cuts developer costs by up to 90% on large systemic prompts'
    ],
    limitations: [
      'No native speech audio output (voice generation requires third-party API)',
      'Strict safety refusal boundary occasionally trips on white-hat vulnerability research'
    ],
    competitorComparisons: [
      {
        toolId: 'chatgpt',
        name: 'ChatGPT by OpenAI',
        advantage: 'Claude produces noticeably cleaner code and higher quality long-form technical prose.',
        disadvantage: 'ChatGPT has native voice conversation and Custom GPT store.',
        migrationEase: 'Simple'
      },
      {
        toolId: 'cursor',
        name: 'Cursor AI Editor',
        advantage: 'Claude is a standalone conversational research assistant with general knowledge.',
        disadvantage: 'Cursor has direct IDE multi-file terminal integration (though Cursor uses Claude under the hood!).',
        migrationEase: 'Simple'
      }
    ],
    userReviews: [
      {
        id: 'rev-cl1',
        author: 'Dr. Emily Watson',
        role: 'Staff Frontend Architect',
        company: 'HyperScale UI',
        rating: 5,
        date: 'March 2025',
        title: 'Artifacts has transformed how our product team iterates',
        comment: 'We prototype complete React components with Tailwind directly inside Claude Artifacts. The model understands state management, accessibility, and clean component decomposition better than any other AI on the market.',
        verifiedUser: true,
        helpfulCount: 110
      },
      {
        id: 'rev-cl2',
        author: 'Kevin Thorne',
        role: 'Security Engineer',
        company: 'Sentient Cloud',
        rating: 5,
        date: 'February 2025',
        title: 'Prompt caching makes our repository analysis affordable',
        comment: 'With Claude’s prompt caching, we keep our 150k token API documentation and codebase cached, paying only $0.30 per million read tokens. The cost savings are colossal, and response time dropped to 1.2 seconds.',
        verifiedUser: true,
        helpfulCount: 88
      }
    ],
    relatedResearchSlugs: [
      'claude-3-7-vs-chatgpt-reasoning',
      'ai-coding-assistants-cursor-vs-copilot-vs-v0',
      'frontier-models-march-2025-benchmark'
    ]
  },

  figma: {
    developerInfo: {
      name: 'Figma, Inc.',
      headquarters: 'San Francisco, California, USA',
      foundedYear: 2012,
      founders: ['Dylan Field', 'Evan Wallace'],
      ceo: 'Dylan Field',
      backingOrParent: 'Independent (Previously proposed Adobe acquisition terminated Dec 2023)',
      website: 'https://figma.com',
      employeeCount: '~1,500 employees',
      description: 'The world’s leading collaborative web-based interface design tool, powering UI/UX workflows, design systems, FigJam whiteboarding, and Dev Mode handoffs.'
    },
    apiInfo: {
      hasApi: true,
      endpointUrl: 'https://api.figma.com/v1',
      sdkLanguages: ['REST API', 'Figma Plugin API (JavaScript/TypeScript)', 'Widget API'],
      rateLimits: 'Standard REST endpoints up to 20 requests per second',
      documentationUrl: 'https://www.figma.com/developers',
      pricingSummary: 'Included free with all Figma plans; Webhooks and Dev Mode integrations included in Professional & Organization tiers',
      keyFeatures: ['REST access to design document node trees', 'Live variables and design tokens extraction', 'Interactive plugin execution inside canvas', 'Webhooks for file updates and comments'],
      codeSample: {
        language: 'typescript',
        code: `const response = await fetch('https://api.figma.com/v1/files/FILE_KEY',\n  { headers: { 'X-Figma-Token': process.env.FIGMA_ACCESS_TOKEN! } }\n);\nconst fileData = await response.json();\nconsole.log(fileData.document.children);`
      }
    },
    strengths: [
      'Unrivaled real-time multiplayer multiplayer collaboration without syncing delays',
      'Massive global design system and community plugin ecosystem',
      'Dev Mode streamlines design-to-code translation for frontend developers',
      'Web-first architecture runs fluidly on any operating system'
    ],
    limitations: [
      'Pricing model for Dev Mode seats can be expensive for large engineering orgs',
      'Requires active internet connection for real-time collaboration'
    ],
    competitorComparisons: [
      {
        toolId: 'sketch',
        name: 'Sketch',
        advantage: 'Figma is 100% cloud-based with real-time multiplayer across all operating systems.',
        disadvantage: 'Sketch has native offline macOS speed for users working in air-gapped environments.',
        migrationEase: 'Moderate'
      },
      {
        toolId: 'canva',
        name: 'Canva',
        advantage: 'Figma is engineered for professional UI/UX, responsive components, and design systems.',
        disadvantage: 'Canva has thousands more ready-to-print marketing templates for non-designers.',
        migrationEase: 'Simple'
      }
    ],
    userReviews: [
      {
        id: 'rev-f1',
        author: 'Liam Vance',
        role: 'Lead Product Designer',
        company: 'AeroSync',
        rating: 5,
        date: 'March 2025',
        title: 'Variables and Dev Mode have unified our design system',
        comment: 'Figma variables allow our design team to toggle light/dark modes and spacing tokens instantly, while our React developers inspect CSS properties directly in Dev Mode. It has cut our handoff cycle in half.',
        verifiedUser: true,
        helpfulCount: 73
      }
    ],
    relatedResearchSlugs: [
      'figma-vs-canva-product-design'
    ]
  },

  canva: {
    developerInfo: {
      name: 'Canva Pty Ltd',
      headquarters: 'Sydney, New South Wales, Australia',
      foundedYear: 2013,
      founders: ['Melanie Perkins', 'Cliff Obrecht', 'Cameron Adams'],
      ceo: 'Melanie Perkins',
      backingOrParent: 'Independent Private Company (Valued at $26B+)',
      website: 'https://canva.com',
      employeeCount: '~4,500 employees',
      description: 'An online visual communication and design platform empowering everyone to create presentations, social media assets, video edits, and marketing materials with intuitive drag-and-drop tools.'
    },
    apiInfo: {
      hasApi: true,
      endpointUrl: 'https://api.canva.com/rest/v1',
      sdkLanguages: ['REST API', 'Canva Connect API', 'Canva Apps SDK'],
      rateLimits: 'Tier-based access through Canva Developers portal',
      documentationUrl: 'https://www.canva.dev',
      pricingSummary: 'Free for registered Canva Developer portal members',
      keyFeatures: ['Export designs directly to social platforms', 'Custom app integrations inside the Canva editor', 'Asset library synchronization']
    },
    strengths: [
      'Accessible to anyone with zero prior graphic design experience',
      'Massive library of millions of customizable templates and stock media',
      'Magic Studio AI suite for instant background removal, photo expansion, and copy generation'
    ],
    limitations: [
      'Not suitable for precision UI/UX interface design or responsive component architecture',
      'Vector editing controls are simplified compared to Adobe Illustrator or Figma'
    ],
    competitorComparisons: [
      {
        toolId: 'figma',
        name: 'Figma',
        advantage: 'Canva is vastly simpler for marketing collateral, social posts, and quick slide decks.',
        disadvantage: 'Figma is necessary for real UI/UX app design and developer code handoffs.',
        migrationEase: 'Simple'
      }
    ],
    userReviews: [
      {
        id: 'rev-ca1',
        author: 'Rachel Adams',
        role: 'Head of Growth Marketing',
        company: 'Pulse Brands',
        rating: 5,
        date: 'February 2025',
        title: 'Our marketing team produces 10x more content',
        comment: 'Magic Studio and brand kits mean our social media managers can spin up 20 branded visual variants across Instagram, LinkedIn, and YouTube in 30 minutes without waiting on the design department.',
        verifiedUser: true,
        helpfulCount: 65
      }
    ],
    relatedResearchSlugs: [
      'figma-vs-canva-product-design'
    ]
  },

  midjourney: {
    developerInfo: {
      name: 'Midjourney, Inc.',
      headquarters: 'San Francisco, California, USA',
      foundedYear: 2021,
      founders: ['David Holz'],
      ceo: 'David Holz',
      backingOrParent: 'Self-funded Independent Research Lab',
      website: 'https://midjourney.com',
      employeeCount: '~100 employees',
      description: 'An independent research lab exploring new mediums of thought and expanding the imaginative powers of the human species through generative AI image synthesis.'
    },
    apiInfo: {
      hasApi: false,
      endpointUrl: 'Discord bot interface & Web creation portal',
      documentationUrl: 'https://docs.midjourney.com',
      pricingSummary: 'Monthly subscriptions from $10 to $120/mo',
      keyFeatures: ['Prompt commands (/imagine)', 'Style reference (--sref)', 'Character reference (--cref)', 'Inpainting & Pan/Zoom']
    },
    strengths: [
      'Supreme cinematic photorealism and lighting aesthetics',
      'Best-in-class character and style consistency commands'
    ],
    limitations: [
      'No public developer API for automated pipeline integration',
      'Requires paid subscription (no perpetual free tier)'
    ],
    competitorComparisons: [
      {
        toolId: 'flux-1',
        name: 'Flux.1 by Black Forest Labs',
        advantage: 'Midjourney has a more polished default artistic aesthetic and rich web gallery.',
        disadvantage: 'Flux.1 offers open weights that can be self-hosted locally on consumer GPUs.',
        migrationEase: 'Simple'
      }
    ],
    userReviews: [
      {
        id: 'rev-mj1',
        author: 'Christian Bauer',
        role: 'Creative Director',
        company: 'Vanguard Studios',
        rating: 5,
        date: 'March 2025',
        title: 'Unrivaled aesthetic texture and human skin rendering in v6.1',
        comment: 'For film concept art and editorial mockups, Midjourney v6.1 remains the benchmark. The lighting, depth of field, and character reference flags save us dozens of hours in early visual pre-production.',
        verifiedUser: true,
        helpfulCount: 81
      }
    ],
    relatedResearchSlugs: [
      'ai-image-generation-midjourney-vs-flux'
    ]
  },

  cursor: {
    developerInfo: {
      name: 'Anysphere, Inc.',
      headquarters: 'San Francisco, California, USA',
      foundedYear: 2022,
      founders: ['Michael Truell', 'Sualeh Asif', 'Arvid Lunnemark', 'Aman Sanger'],
      ceo: 'Michael Truell',
      backingOrParent: 'OpenAI Startup Fund, Andreessen Horowitz (a16z)',
      website: 'https://cursor.com',
      employeeCount: '~40 employees',
      description: 'The AI-first code editor fork of VS Code engineered for hyper-accelerated software development, codebase indexing, and multi-file agentic code generation.'
    },
    apiInfo: {
      hasApi: false,
      documentationUrl: 'https://docs.cursor.com',
      pricingSummary: 'Free tier with 2,000 completions; $20/mo Pro plan with 500 fast requests & unlimited slow requests',
      keyFeatures: ['Composer multi-file generation', '@codebase semantic indexing', 'Inline Tab autocompletion', 'Terminal bug fixer']
    },
    strengths: [
      'Whole-repository vector indexing provides remarkable contextual awareness',
      'Composer generates and edits multiple files simultaneously with atomic git diffs',
      'Zero learning curve for existing VS Code users'
    ],
    limitations: [
      'Requires developers to review multi-file changes diligently before accepting',
      'Resource intensive vector indexing on very large monorepos'
    ],
    competitorComparisons: [
      {
        toolId: 'github-copilot',
        name: 'GitHub Copilot',
        advantage: 'Cursor has Composer multi-file agentic synthesis and deeper codebase indexing.',
        disadvantage: 'GitHub Copilot has native JetBrains support and enterprise compliance certifications.',
        migrationEase: 'Simple'
      }
    ],
    userReviews: [
      {
        id: 'rev-cur1',
        author: 'Danielle Miller',
        role: 'Staff Infrastructure Engineer',
        company: 'Datasync',
        rating: 5,
        date: 'March 2025',
        title: 'Composer feels like pair programming with an experienced senior dev',
        comment: 'I scaffolded a complete authentication flow and PostgreSQL migration in 15 minutes using Cursor Composer. The semantic codebase indexing means I never have to manually copy-paste file context.',
        verifiedUser: true,
        helpfulCount: 95
      }
    ],
    relatedResearchSlugs: [
      'ai-coding-assistants-cursor-vs-copilot-vs-v0'
    ]
  }
};

export function getExtendedResearchForTool(toolId: string): ToolExtendedResearch | undefined {
  return EXTENDED_TOOL_RESEARCH[toolId.toLowerCase()];
}
