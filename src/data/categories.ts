import { CategoryInfo, PurposeInfo } from '../types';

export const PURPOSES: PurposeInfo[] = [
  {
    id: 'write',
    name: 'Write',
    tagline: 'Create content',
    description: 'Generative writing, long-form editorial, grammar analysis, and copy generation tools.',
    iconName: 'PenTool',
    toolCount: 12
  },
  {
    id: 'design',
    name: 'Design',
    tagline: 'Make it beautiful',
    description: 'Vector editors, prototyping platforms, marketing graphics, and responsive web design.',
    iconName: 'Layout',
    toolCount: 14
  },
  {
    id: 'code',
    name: 'Code',
    tagline: 'Build & develop',
    description: 'Code intelligence, agentic editors, scaffolding, and full-stack software development tools.',
    iconName: 'Code2',
    toolCount: 15
  },
  {
    id: 'research',
    name: 'Research',
    tagline: 'Find answers',
    description: 'Source-backed search engines, technical paper comprehension, and fact-checking workflows.',
    iconName: 'Search',
    toolCount: 10
  },
  {
    id: 'create',
    name: 'Create',
    tagline: 'Generate new media',
    description: 'Diffusion models, neural speech synthesis, high-fidelity video generation, and 3D assets.',
    iconName: 'Sparkles',
    toolCount: 16
  },
  {
    id: 'automate',
    name: 'Automate',
    tagline: 'Save time',
    description: 'Autonomous workflows, background task execution, and programmatic integrations.',
    iconName: 'Cpu',
    toolCount: 9
  },
  {
    id: 'learn',
    name: 'Learn',
    tagline: 'Build knowledge',
    description: 'Concept breakdown, interactive tutoring, and technical documentation comprehension.',
    iconName: 'GraduationCap',
    toolCount: 8
  }
];

export interface CategoryFilterItem {
  id: string; // stable slug
  label: string; // display name
  type: 'AI' | 'Software' | 'Both';
  aliases: string[];
  iconName: string;
  description: string;
}

export const CATEGORY_DEFINITIONS: CategoryFilterItem[] = [
  // ─── AI Categories ───
  {
    id: 'chatbots-reasoning',
    label: 'Chatbots & Reasoning',
    type: 'AI',
    aliases: ['chatbots', 'chatbot', 'chatbots & reasoning', 'chatbots-reasoning', 'chat', 'reasoning', 'conversational ai', 'assistant'],
    iconName: 'Bot',
    description: 'Frontier LLMs, conversational assistants, multi-turn reasoning, and autonomous thinking models.'
  },
  {
    id: 'image-generation',
    label: 'Image Generation',
    type: 'AI',
    aliases: ['image-generation', 'image generation', 'image', 'image gen', 'images', 'image-gen', 'diffusion', 'dall-e', 'midjourney', 'flux'],
    iconName: 'Image',
    description: 'Text-to-image synthesis, photorealistic rendering, style transfer, and inpainting.'
  },
  {
    id: 'video-generation',
    label: 'Video Generation',
    type: 'AI',
    aliases: ['video', 'video & animation', 'video generation', 'video ai', 'video-generation', 'text-to-video', 'runway', 'sora', 'luma'],
    iconName: 'Video',
    description: 'Generative text-to-video, camera control, AI green-screen, and cinematic synthesis.'
  },
  {
    id: 'writing',
    label: 'Writing & Content',
    type: 'AI',
    aliases: ['writing', 'writing & content', 'writing-content', 'writing & copy', 'copy', 'content', 'content generation', 'copywriting'],
    iconName: 'PenTool',
    description: 'Long-form editorial drafting, marketing copywriting, tone adjustment, and content synthesis.'
  },
  {
    id: 'code-dev',
    label: 'Code & Development',
    type: 'AI',
    aliases: ['code-dev', 'code & development', 'code & dev', 'coding', 'ai coding & ides', 'code', 'development', 'developer', 'code-development', 'ai coding'],
    iconName: 'Code2',
    description: 'Agentic IDEs, inline code completion, repository-wide refactoring, and AI pair programming.'
  },
  {
    id: 'audio',
    label: 'Audio & Voice',
    type: 'AI',
    aliases: ['audio', 'audio & speech', 'audio & voice', 'voice', 'voice ai', 'sound', 'speech', 'tts', 'text-to-speech'],
    iconName: 'Mic',
    description: 'Voice cloning, multilingual text-to-speech, neural dubbing, and AI speech synthesis.'
  },
  {
    id: 'music',
    label: 'Music & Sound',
    type: 'AI',
    aliases: ['music', 'music & sound', 'ai music', 'song generation', 'music ai', 'suno', 'udio'],
    iconName: 'Music',
    description: 'Full-song generation, instrumental synthesis, lyric-to-audio production, and stems separation.'
  },
  {
    id: 'research',
    label: 'Research',
    type: 'AI',
    aliases: ['research', 'ai research & search', 'research-ai', 'search', 'answer engine', 'citations', 'scientific research', 'academic'],
    iconName: 'Compass',
    description: 'Source-grounded search, citation verification, paper analysis, and factual intelligence.'
  },
  {
    id: 'productivity',
    label: 'Productivity',
    type: 'Both',
    aliases: ['productivity', 'workspaces & project management', 'ai productivity', 'productivity-ai', 'workspaces', 'knowledge', 'notes'],
    iconName: 'Zap',
    description: 'Connected workspaces, AI knowledge search, automated meeting summaries, and task automation.'
  },
  {
    id: 'automation',
    label: 'Automation',
    type: 'AI',
    aliases: ['automation', 'ai automation', 'workflows', 'agents', 'workflow automation', 'agentic workflows'],
    iconName: 'Cpu',
    description: 'Autonomous multi-agent workflows, background task execution, and system integrations.'
  },
  {
    id: 'marketing',
    label: 'Marketing',
    type: 'Both',
    aliases: ['marketing', 'ai marketing', 'marketing & content', 'marketing & growth', 'ad copy', 'seo', 'marketing-software'],
    iconName: 'Sparkles',
    description: 'Enterprise brand voice, SEO campaign automation, ad copy generation, and conversion intelligence.'
  },
  {
    id: 'education',
    label: 'Education',
    type: 'Both',
    aliases: ['education', 'learning', 'study', 'teaching', 'academic', 'tutor', 'ai education'],
    iconName: 'GraduationCap',
    description: 'Educational platforms, knowledge retention, personalized tutoring, and comprehension engines.'
  },
  {
    id: '3d-ai',
    label: '3D AI',
    type: 'AI',
    aliases: ['3d-ai', '3d ai', '3d generation', 'mesh generation', 'text to 3d', 'nerf', 'gaussian splatting'],
    iconName: 'Layers',
    description: 'Text-to-3D mesh generation, AI texture synthesis, NeRFs, and spatial computing assets.'
  },

  // ─── Software Categories ───
  {
    id: 'design',
    label: 'Design / UI/UX',
    type: 'Both',
    aliases: ['design', 'design & prototyping', 'ui/ux', 'design-software', 'visual design', 'design / ui/ux', 'ui design', 'ux design'],
    iconName: 'Layout',
    description: 'Vector design systems, interactive prototyping, UI/UX tools, and digital canvas suites.'
  },
  {
    id: 'graphic-design',
    label: 'Graphic Design',
    type: 'Software',
    aliases: ['graphic-design', 'graphic design', 'graphics', 'vector graphics', 'illustration', 'canva', 'illustrator'],
    iconName: 'PenTool',
    description: 'Vector illustration, brand identity creation, typography, and marketing collateral design.'
  },
  {
    id: 'photo-editing',
    label: 'Photo Editing',
    type: 'Software',
    aliases: ['photo-editing', 'photo editing', 'photo', 'raster editing', 'image editing', 'photoshop', 'lightroom'],
    iconName: 'Image',
    description: 'Pixel-level retouching, color grading, RAW image development, and digital photo manipulation.'
  },
  {
    id: 'video-editing',
    label: 'Video Editing',
    type: 'Software',
    aliases: ['video-editing', 'video editing', 'video & animation', 'video software', 'post-production', 'premiere', 'davinci'],
    iconName: 'Film',
    description: 'Non-linear video editing, timeline multi-track cutting, color grading, and audio mastering.'
  },
  {
    id: 'audio-production',
    label: 'Audio Production',
    type: 'Software',
    aliases: ['audio-production', 'audio production', 'daw', 'music production', 'sound editing', 'audio software', 'ableton', 'logic'],
    iconName: 'Music',
    description: 'Digital audio workstations (DAWs), multi-track recording, mixing, mastering, and MIDI sequencing.'
  },
  {
    id: '3d',
    label: '3D & Animation',
    type: 'Software',
    aliases: ['3d', '3d & animation', '3d design', 'vfx', 'modeling', 'blender', 'cinema 4d', 'animation', 'cgi'],
    iconName: 'Layers',
    description: '3D creation suites, procedural modeling, character rigging, animation, physics simulation, and rendering.'
  },
  {
    id: 'development',
    label: 'Development',
    type: 'Software',
    aliases: ['development', 'developer platforms', 'backend', 'devtools', 'database', 'infrastructure', 'web & visual development', 'ide', 'code editor', 'git'],
    iconName: 'Terminal',
    description: 'Code editors, developer infrastructure, serverless databases, APIs, containerization, and DevOps.'
  },
  {
    id: 'project-management',
    label: 'Project Management',
    type: 'Software',
    aliases: ['project-management', 'project management', 'linear', 'issues', 'task tracking', 'workspaces & project management', 'agile', 'kanban'],
    iconName: 'CheckSquare',
    description: 'High-speed issue tracking, sprint roadmaps, team task management, and milestone tracking.'
  },
  {
    id: 'collaboration',
    label: 'Collaboration',
    type: 'Software',
    aliases: ['collaboration', 'team collaboration', 'communication', 'messaging', 'chat software', 'slack', 'teams', 'video meetings'],
    iconName: 'Users',
    description: 'Real-time team messaging, async video sharing, team channels, and enterprise collaboration suites.'
  },
  {
    id: 'business',
    label: 'Business',
    type: 'Software',
    aliases: ['business', 'enterprise', 'finance', 'operations', 'sales', 'crm', 'accounting'],
    iconName: 'Briefcase',
    description: 'Customer relationship management (CRM), financial accounting, payments, and enterprise operations.'
  },
  {
    id: 'analytics',
    label: 'Analytics',
    type: 'Software',
    aliases: ['analytics', 'metrics', 'bi', 'business intelligence', 'tracking', 'telemetry', 'product analytics'],
    iconName: 'BarChart2',
    description: 'Product metrics, user event tracking, cohort analysis, conversion funnels, and data intelligence.'
  },
  {
    id: 'web-building',
    label: 'Website Building',
    type: 'Software',
    aliases: ['web-building', 'web & visual development', 'web development', 'site builders', 'cms', 'framer', 'webflow', 'website building', 'no-code website'],
    iconName: 'Globe',
    description: 'Visual website builders, responsive canvas tools, CMS systems, e-commerce engines, and hosting.'
  }
];

export function normalizeCategorySlug(raw: string | undefined | null): string {
  if (!raw || raw.trim() === '' || raw.toLowerCase() === 'all') return 'All';
  const clean = raw.trim().toLowerCase();

  // First direct exact match or alias match
  for (const def of CATEGORY_DEFINITIONS) {
    if (def.id === clean || def.label.toLowerCase() === clean || def.aliases.includes(clean)) {
      return def.id;
    }
  }

  // Handle special aliases
  if (clean === 'video' || clean === 'video & animation') return 'video-generation';
  if (clean === 'music') return 'music';
  if (clean === '3d') return '3d';
  if (clean === 'audio') return 'audio';
  if (clean === 'design') return 'design';
  if (clean === 'graphic design') return 'graphic-design';
  if (clean === 'photo editing') return 'photo-editing';
  if (clean === 'video editing') return 'video-editing';
  if (clean === 'audio production') return 'audio-production';
  if (clean === 'website building' || clean === 'web & visual development') return 'web-building';

  return clean.replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export function getCategoryLabel(slugOrName: string): string {
  const norm = normalizeCategorySlug(slugOrName);
  if (norm === 'All') return 'All';
  const match = CATEGORY_DEFINITIONS.find((c) => c.id === norm);
  return match ? match.label : slugOrName;
}

export function matchesCategory(
  toolCategory: string,
  toolCategorySlug: string | undefined,
  targetCategoryOrSlug: string
): boolean {
  if (!targetCategoryOrSlug || targetCategoryOrSlug === 'All' || targetCategoryOrSlug.toLowerCase() === 'all') {
    return true;
  }
  const targetNorm = normalizeCategorySlug(targetCategoryOrSlug);
  const toolNorm = normalizeCategorySlug(toolCategorySlug || toolCategory);

  if (toolNorm === targetNorm) return true;

  // Cross-match if target is video and tool is video-generation
  if (targetNorm === 'video-generation' && (toolNorm === 'video-generation' || toolNorm === 'video')) return true;
  if (targetNorm === '3d' && (toolNorm === '3d' || toolNorm === '3d-ai')) return true;
  if (targetNorm === 'design' && (toolNorm === 'design' || toolNorm === 'graphic-design')) return true;

  const targetDef = CATEGORY_DEFINITIONS.find((c) => c.id === targetNorm);
  if (targetDef) {
    const toolCatLower = (toolCategory || '').toLowerCase();
    const toolSlugLower = (toolCategorySlug || '').toLowerCase();
    if (
      targetDef.aliases.some(
        (alias) =>
          toolCatLower === alias ||
          toolSlugLower === alias ||
          toolCatLower.includes(alias) ||
          alias.includes(toolCatLower)
      )
    ) {
      return true;
    }
  }
  return false;
}

export const AI_CATEGORY_LIST = [
  'All',
  'Chatbots & Reasoning',
  'Image Generation',
  'Video Generation',
  'Writing & Content',
  'Code & Development',
  'Audio & Voice',
  'Music & Sound',
  'Research',
  'Productivity',
  'Automation',
  'Marketing',
  'Education',
  '3D AI'
];

export const SOFTWARE_CATEGORY_LIST = [
  'All',
  'Design / UI/UX',
  'Graphic Design',
  'Photo Editing',
  'Video Editing',
  'Audio Production',
  '3D & Animation',
  'Development',
  'Productivity',
  'Project Management',
  'Collaboration',
  'Business',
  'Marketing',
  'Analytics',
  'Education',
  'Website Building'
];

export const ALL_CATEGORY_LIST = [
  'All',
  'Chatbots & Reasoning',
  'Image Generation',
  'Video Generation',
  'Writing & Content',
  'Code & Development',
  'Audio & Voice',
  'Music & Sound',
  'Research',
  'Productivity',
  'Automation',
  'Marketing',
  'Education',
  '3D AI',
  'Design / UI/UX',
  'Graphic Design',
  'Photo Editing',
  'Video Editing',
  'Audio Production',
  '3D & Animation',
  'Development',
  'Project Management',
  'Collaboration',
  'Business',
  'Analytics',
  'Website Building'
];

export const CATEGORIES: CategoryInfo[] = CATEGORY_DEFINITIONS.map((def) => ({
  id: def.id,
  name: def.label,
  type: def.type === 'Software' ? 'Software' : 'AI',
  description: def.description,
  toolCount: 6,
  iconName: def.iconName,
}));
