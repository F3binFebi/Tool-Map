import React from 'react';

interface ToolLogoProps {
  id: string;
  name: string;
  size?: number;
  className?: string;
}

export const ToolLogo: React.FC<ToolLogoProps> = ({ id, name, size = 38, className = '' }) => {
  const normId = id.toLowerCase().replace(/[^a-z0-9-]/g, '');
  const radius = Math.round(size * 0.26);

  const renderContent = () => {
    switch (normId) {
      // ══════════════════════════════════════════════════════════════════════════
      // AI TOOLS LOGOS
      // ══════════════════════════════════════════════════════════════════════════

      // 1. ChatGPT (OpenAI)
      case 'chatgpt':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: '#10A37F',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(16, 163, 127, 0.28)',
            }}
          >
            {/* OpenAI official spiral rosette */}
            <svg width={size * 0.62} height={size * 0.62} viewBox="0 0 24 24" fill="none">
              <path
                d="M20.5 10.3a5.2 5.2 0 0 0-.4-4.2 5.3 5.3 0 0 0-5.1-2.7 5.2 5.2 0 0 0-4.1-1.9 5.3 5.3 0 0 0-5 3.7 5.2 5.2 0 0 0-3.6 2.6 5.3 5.3 0 0 0 .7 5.7 5.2 5.2 0 0 0 .4 4.2 5.3 5.3 0 0 0 5.1 2.7 5.2 5.2 0 0 0 4.1 1.9 5.3 5.3 0 0 0 5-3.7 5.2 5.2 0 0 0 3.6-2.6 5.3 5.3 0 0 0-.7-5.7z"
                stroke="#FFFFFF"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 8.5v7m-3-4.5 6 2m-6 0 6-2"
                stroke="#FFFFFF"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </div>
        );

      // 2. Claude (Anthropic)
      case 'claude':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: '#CC785C',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(204, 120, 92, 0.3)',
            }}
          >
            {/* Anthropic / Claude sunburst spark */}
            <svg width={size * 0.62} height={size * 0.62} viewBox="0 0 24 24" fill="#FFFFFF">
              <polygon points="12,2 14.5,8.5 21,9 16,13.5 17.5,20 12,16.5 6.5,20 8,13.5 3,9 9.5,8.5" />
            </svg>
          </div>
        );

      // 3. Gemini (Google)
      case 'gemini':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              background: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 40%, #9333EA 75%, #F43F5E 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)',
            }}
          >
            {/* Google Gemini 4-point astroid star */}
            <svg width={size * 0.62} height={size * 0.62} viewBox="0 0 24 24" fill="#FFFFFF">
              <path d="M12 0C12 6.627 6.627 12 0 12c6.627 0 12 5.373 12 12 0-6.627 5.373-12 12-12-6.627 0-12-5.373-12-12z" />
            </svg>
          </div>
        );

      // 4. Perplexity AI
      case 'perplexity':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: '#20808D',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(32, 128, 141, 0.3)',
            }}
          >
            {/* Perplexity knot mark */}
            <svg width={size * 0.58} height={size * 0.58} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2">
              <rect x="4" y="4" width="16" height="16" rx="3" strokeDasharray="3 3" />
              <circle cx="12" cy="12" r="4" fill="#FFFFFF" />
            </svg>
          </div>
        );

      // 5. DeepSeek
      case 'deepseek':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: '#0066FF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0, 102, 255, 0.3)',
            }}
          >
            {/* DeepSeek dolphin / wave emblem */}
            <svg width={size * 0.65} height={size * 0.65} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round">
              <path d="M4 14c4-7 11-8 16-3-4 1-8 5-11 5-2 0-3.5-.7-5-2z" fill="#FFFFFF" />
              <circle cx="16" cy="10" r="1" fill="#0066FF" />
            </svg>
          </div>
        );

      // 6. Mistral AI / Le Chat
      case 'mistral':
      case 'mistral-ai':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: '#FA520F',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(250, 82, 15, 0.3)',
            }}
          >
            {/* Mistral pixel stairs mark */}
            <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="#FFFFFF">
              <rect x="4" y="16" width="4" height="4" />
              <rect x="8" y="12" width="4" height="4" />
              <rect x="12" y="8" width="4" height="4" />
              <rect x="16" y="4" width="4" height="4" />
              <rect x="8" y="16" width="4" height="4" opacity="0.6" />
              <rect x="12" y="12" width="4" height="4" opacity="0.6" />
              <rect x="16" y="8" width="4" height="4" opacity="0.6" />
            </svg>
          </div>
        );

      // 7. Grok / xAI
      case 'grok':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: '#000000',
              border: '1px solid #334155',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontFamily: 'var(--font-sans)',
              fontWeight: 900,
              fontSize: size * 0.48,
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.25)',
            }}
          >
            /
          </div>
        );

      // 8. Microsoft Copilot
      case 'copilot':
      case 'microsoft-copilot':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              background: 'linear-gradient(135deg, #0078D4 0%, #22C55E 50%, #F59E0B 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0, 120, 212, 0.28)',
            }}
          >
            <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round">
              <path d="M12 3a9 9 0 0 0-9 9c0 4.5 3.5 8 8 9h2a8 8 0 0 0 8-8c0-5-4.5-10-9-10z" />
              <circle cx="9" cy="12" r="1.5" fill="#FFFFFF" />
              <circle cx="15" cy="12" r="1.5" fill="#FFFFFF" />
            </svg>
          </div>
        );

      // 9. Midjourney
      case 'midjourney':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: '#0F172A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(15, 23, 42, 0.35)',
            }}
          >
            {/* Midjourney sailboat origami */}
            <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinejoin="round">
              <polygon points="12 3 19 14 12 18 5 14" />
              <line x1="12" y1="3" x2="12" y2="18" />
              <line x1="5" y1="18" x2="19" y2="18" strokeWidth="2.2" />
            </svg>
          </div>
        );

      // 10. DALL-E 3
      case 'dall-e':
      case 'dalle':
      case 'dall-e-3':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              background: 'linear-gradient(135deg, #FF6B6B 0%, #FFE66D 50%, #4ECDC4 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(255, 107, 107, 0.25)',
            }}
          >
            <svg width={size * 0.58} height={size * 0.58} viewBox="0 0 24 24" fill="#FFFFFF">
              <circle cx="7" cy="12" r="4" opacity="0.9" />
              <circle cx="14" cy="9" r="4" opacity="0.9" />
              <circle cx="15" cy="15" r="4" opacity="0.9" />
            </svg>
          </div>
        );

      // 11. Stable Diffusion / Stability AI
      case 'stable-diffusion':
      case 'stability-ai':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: '#1E1E2E',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(30, 30, 46, 0.3)',
            }}
          >
            {/* Stability AI geometric circles */}
            <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="#38BDF8">
              <circle cx="12" cy="12" r="3" fill="#FFFFFF" />
              <circle cx="12" cy="5" r="2" />
              <circle cx="18" cy="8.5" r="2" />
              <circle cx="18" cy="15.5" r="2" />
              <circle cx="12" cy="19" r="2" />
              <circle cx="6" cy="15.5" r="2" />
              <circle cx="6" cy="8.5" r="2" />
            </svg>
          </div>
        );

      // 12. FLUX.1 (Black Forest Labs)
      case 'flux-1':
      case 'flux':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: '#000000',
              border: '1px solid #F59E0B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(245, 158, 11, 0.25)',
            }}
          >
            <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2.5">
              <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5" />
              <polygon points="12 6 18 10 18 14 12 18 6 14 6 10" fill="#F59E0B" opacity="0.4" />
            </svg>
          </div>
        );

      // 13. Adobe Firefly
      case 'adobe-firefly':
      case 'firefly':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              background: 'linear-gradient(135deg, #FF1361 0%, #FFF800 50%, #17ADEE 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(255, 19, 97, 0.3)',
            }}
          >
            <svg width={size * 0.58} height={size * 0.58} viewBox="0 0 24 24" fill="#FFFFFF">
              <path d="M12 2l2.4 6.9L21 12l-6.6 3.1L12 22l-2.4-6.9L3 12l6.6-3.1z" />
            </svg>
          </div>
        );

      // 14. Leonardo.ai
      case 'leonardo-ai':
      case 'leonardo':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              background: 'linear-gradient(135deg, #6B21A8 0%, #EC4899 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(107, 33, 168, 0.3)',
            }}
          >
            <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2">
              <circle cx="12" cy="12" r="9" />
              <polygon points="12 7 15 15 8 11 16 11 9 15" fill="#FFFFFF" stroke="none" />
            </svg>
          </div>
        );

      // 15. Ideogram
      case 'ideogram':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: '#0F172A',
              border: '1px solid #38BDF8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#38BDF8',
              fontWeight: 900,
              fontSize: size * 0.44,
            }}
          >
            iO
          </div>
        );

      // 16. Runway (Gen-3 Alpha)
      case 'runway':
      case 'runway-gen-3':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: '#000000',
              border: '1px solid #27272A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#22C55E',
              fontWeight: 900,
              fontSize: size * 0.46,
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
              fontFamily: 'monospace',
            }}
          >
            R:
          </div>
        );

      // 17. Luma Dream Machine
      case 'luma-dream-machine':
      case 'luma':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              background: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(245, 158, 11, 0.3)',
            }}
          >
            <svg width={size * 0.58} height={size * 0.58} viewBox="0 0 24 24" fill="#FFFFFF">
              <circle cx="12" cy="12" r="8" opacity="0.4" />
              <circle cx="12" cy="12" r="4" />
            </svg>
          </div>
        );

      // 18. Kling AI
      case 'kling-ai':
      case 'kling':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontWeight: 900,
              fontSize: size * 0.45,
            }}
          >
            K
          </div>
        );

      // 19. Pika
      case 'pika':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: '#FFE600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(255, 230, 0, 0.3)',
            }}
          >
            <svg width={size * 0.58} height={size * 0.58} viewBox="0 0 24 24" fill="#000000">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10" />
            </svg>
          </div>
        );

      // 20. HeyGen
      case 'heygen':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: '#5B51D8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: size * 0.46,
            }}
          >
            H
          </div>
        );

      // 21. Synthesia
      case 'synthesia':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: '#00F5A0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0D0E15',
              fontWeight: 900,
              fontSize: size * 0.44,
            }}
          >
            Sy
          </div>
        );

      // 22. Cursor
      case 'cursor':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: '#000000',
              border: '1px solid #334155',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.35)',
            }}
          >
            {/* Cursor 3D Isometric cube */}
            <svg width={size * 0.58} height={size * 0.58} viewBox="0 0 24 24" fill="none">
              <polygon points="12 3 21 8 12 13 3 8" fill="#38BDF8" opacity="0.9" />
              <polygon points="12 13 21 8 21 18 12 23" fill="#0284C7" />
              <polygon points="3 8 12 13 12 23 3 18" fill="#0369A1" />
            </svg>
          </div>
        );

      // 23. GitHub Copilot
      case 'github-copilot':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: '#181717',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
            }}
          >
            {/* Copilot visor robot mark */}
            <svg width={size * 0.62} height={size * 0.62} viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="#6E7681" strokeWidth="1.8" />
              <rect x="7" y="10" width="10" height="4" rx="2" fill="#7C3AED" />
              <circle cx="9.5" cy="12" r="1" fill="#FFFFFF" />
              <circle cx="14.5" cy="12" r="1" fill="#FFFFFF" />
            </svg>
          </div>
        );

      // 24. v0 by Vercel
      case 'v0-vercel':
      case 'v0':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: '#000000',
              border: '1px solid #334155',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontFamily: 'monospace',
              fontWeight: 800,
              fontSize: size * 0.44,
            }}
          >
            v0
          </div>
        );

      // 25. Windsurf / Codeium
      case 'windsurf':
      case 'codeium':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: '#09BE8B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(9, 190, 139, 0.3)',
            }}
          >
            <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round">
              <path d="M4 14c3-5 8-5 11-1s5 4 5 4" />
              <path d="M4 18c3-4 7-4 10-1" opacity="0.6" />
            </svg>
          </div>
        );

      // 26. Replit Agent
      case 'replit':
      case 'replit-agent':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: '#F26207',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(242, 98, 7, 0.3)',
            }}
          >
            <svg width={size * 0.58} height={size * 0.58} viewBox="0 0 24 24" fill="#FFFFFF">
              <rect x="4" y="5" width="7" height="4" rx="1" />
              <rect x="13" y="10" width="7" height="4" rx="1" />
              <rect x="4" y="15" width="7" height="4" rx="1" />
            </svg>
          </div>
        );

      // 27. ElevenLabs
      case 'elevenlabs':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: '#000000',
              border: '1px solid #334155',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
            }}
          >
            {/* ElevenLabs double vertical bars */}
            <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="#FFFFFF">
              <rect x="7" y="5" width="3" height="14" rx="1.5" />
              <rect x="14" y="5" width="3" height="14" rx="1.5" />
            </svg>
          </div>
        );

      // 28. Suno
      case 'suno':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: '#0E0E10',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
            }}
          >
            {/* Suno sound circle */}
            <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="#EAB308" strokeWidth="2.5" />
              <circle cx="12" cy="12" r="4" fill="#EAB308" />
            </svg>
          </div>
        );

      // 29. Udio
      case 'udio':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              background: 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(236, 72, 153, 0.3)',
            }}
          >
            <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.4">
              <circle cx="12" cy="12" r="8" />
              <path d="M12 8v8" />
            </svg>
          </div>
        );

      // 30. Descript
      case 'descript':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: '#2563EB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontWeight: 900,
              fontSize: size * 0.44,
            }}
          >
            D
          </div>
        );

      // 31. Jasper
      case 'jasper':
      case 'jasper-ai':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              background: 'linear-gradient(135deg, #7C3AED 0%, #F59E0B 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(124, 58, 237, 0.3)',
            }}
          >
            <svg width={size * 0.58} height={size * 0.58} viewBox="0 0 24 24" fill="#FFFFFF">
              <polygon points="12 2 15 9 22 12 15 15 12 22 9 15 2 12 9 9" />
            </svg>
          </div>
        );

      // 32. Copy.ai
      case 'copy-ai':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: '#10B981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontWeight: 900,
              fontSize: size * 0.42,
            }}
          >
            C.ai
          </div>
        );

      // 33. Grammarly
      case 'grammarly':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: '#15C39A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(21, 195, 154, 0.3)',
            }}
          >
            <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.6" strokeLinecap="round">
              <circle cx="12" cy="12" r="9" />
              <path d="M8 12c0-2.2 1.8-4 4-4s4 1.8 4 4v3c0 1.1-.9 2-2 2h-2" />
            </svg>
          </div>
        );

      // 34. NotebookLM (Google)
      case 'notebooklm':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: '#F8FAFC',
              border: '1.5px solid #CBD5E1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.06)',
            }}
          >
            <svg width={size * 0.58} height={size * 0.58} viewBox="0 0 24 24" fill="none">
              <rect x="5" y="3" width="14" height="18" rx="2" fill="#3B82F6" opacity="0.2" stroke="#2563EB" strokeWidth="1.8" />
              <line x1="8" y1="8" x2="16" y2="8" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" />
              <line x1="8" y1="12" x2="16" y2="12" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" />
              <line x1="8" y1="16" x2="12" y2="16" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        );

      // 35. Elicit
      case 'elicit':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: '#4338CA',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontWeight: 900,
              fontSize: size * 0.44,
            }}
          >
            E
          </div>
        );

      // 36. Consensus
      case 'consensus':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: '#0F172A',
              border: '1px solid #38BDF8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#38BDF8',
              fontWeight: 800,
              fontSize: size * 0.44,
            }}
          >
            C
          </div>
        );

      // 37. Make (Integromat)
      case 'make':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: '#6E3FF3',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(110, 63, 243, 0.3)',
            }}
          >
            <svg width={size * 0.58} height={size * 0.58} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.4">
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="6" r="3" />
              <circle cx="18" cy="18" r="3" />
              <line x1="9" y1="12" x2="15" y2="8" />
              <line x1="9" y1="12" x2="15" y2="16" />
            </svg>
          </div>
        );

      // 38. Zapier
      case 'zapier':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: '#FF4A00',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(255, 74, 0, 0.3)',
            }}
          >
            {/* Zapier orange star mark */}
            <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="#FFFFFF">
              <polygon points="12 2 14.5 9.5 22 12 14.5 14.5 12 22 9.5 14.5 2 12 9.5 9.5" />
            </svg>
          </div>
        );

      // 39. n8n
      case 'n8n':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: '#EA4B71',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontWeight: 900,
              fontSize: size * 0.4,
            }}
          >
            n8n
          </div>
        );

      // 40. Gamma
      case 'gamma':
      case 'gamma-app':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              background: 'linear-gradient(135deg, #EC4899 0%, #F59E0B 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontWeight: 900,
              fontSize: size * 0.46,
            }}
          >
            γ
          </div>
        );

      // 41. Meshy / Tripo3D / Spline AI
      case 'meshy':
      case 'tripo3d':
      case 'spline':
      case 'spline-ai':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: '#0F172A',
              border: '1px solid #8B5CF6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(139, 92, 246, 0.25)',
            }}
          >
            <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
        );

      // ══════════════════════════════════════════════════════════════════════════
      // SOFTWARE TOOLS LOGOS
      // ══════════════════════════════════════════════════════════════════════════

      // 42. Figma
      case 'figma':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: '#1E1E1E',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25)',
            }}
          >
            {/* Official Figma 5-piece multicolored icon */}
            <svg width={size * 0.54} height={size * 0.54} viewBox="0 0 24 24" fill="none">
              <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" fill="#F24E1E" />
              <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" fill="#FF7262" />
              <path d="M12 9h3.5a3.5 3.5 0 1 1 0 7H12V9z" fill="#1ABCFE" />
              <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" fill="#0ACF83" />
              <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" fill="#A259FF" />
            </svg>
          </div>
        );

      // 43. Canva
      case 'canva':
      case 'canva-ai':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              background: 'linear-gradient(135deg, #00C4CC 0%, #7D2AE8 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0, 196, 204, 0.3)',
              color: '#FFFFFF',
              fontWeight: 900,
              fontSize: size * 0.48,
              fontFamily: 'cursive, var(--font-sans)',
            }}
          >
            C
          </div>
        );

      // 44. Notion
      case 'notion':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: '#FFFFFF',
              border: '1.5px solid #CBD5E1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#000000',
              fontWeight: 900,
              fontSize: size * 0.52,
              fontFamily: 'serif',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.08)',
            }}
          >
            N
          </div>
        );

      // 45. Adobe Photoshop
      case 'photoshop':
      case 'adobe-photoshop':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: '#001E36',
              border: '1.5px solid #31A8FF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#31A8FF',
              fontWeight: 900,
              fontSize: size * 0.44,
              fontFamily: 'var(--font-sans)',
              boxShadow: '0 2px 8px rgba(49, 168, 255, 0.25)',
            }}
          >
            Ps
          </div>
        );

      // 46. Adobe Premiere Pro
      case 'premiere-pro':
      case 'premiere':
      case 'adobe-premiere-pro':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: '#2A0033',
              border: '1.5px solid #EA38FC',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#EA38FC',
              fontWeight: 900,
              fontSize: size * 0.44,
              fontFamily: 'var(--font-sans)',
              boxShadow: '0 2px 8px rgba(234, 56, 252, 0.25)',
            }}
          >
            Pr
          </div>
        );

      // 47. Adobe Illustrator
      case 'illustrator':
      case 'adobe-illustrator':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: '#330000',
              border: '1.5px solid #FF9A00',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FF9A00',
              fontWeight: 900,
              fontSize: size * 0.44,
              boxShadow: '0 2px 8px rgba(255, 154, 0, 0.25)',
            }}
          >
            Ai
          </div>
        );

      // 48. Adobe After Effects
      case 'after-effects':
      case 'adobe-after-effects':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: '#00005B',
              border: '1.5px solid #9999FF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#9999FF',
              fontWeight: 900,
              fontSize: size * 0.44,
              boxShadow: '0 2px 8px rgba(153, 153, 255, 0.25)',
            }}
          >
            Ae
          </div>
        );

      // 49. Adobe Lightroom
      case 'lightroom':
      case 'adobe-lightroom':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: '#001A24',
              border: '1.5px solid #31A8FF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#31A8FF',
              fontWeight: 900,
              fontSize: size * 0.44,
            }}
          >
            Lr
          </div>
        );

      // 50. DaVinci Resolve
      case 'davinci-resolve':
      case 'davinci':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: '#18181B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
            }}
          >
            {/* DaVinci Resolve 3-color petal wheel */}
            <svg width={size * 0.64} height={size * 0.64} viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="7" r="4" fill="#EF4444" opacity="0.9" />
              <circle cx="8" cy="15" r="4" fill="#3B82F6" opacity="0.9" />
              <circle cx="16" cy="15" r="4" fill="#10B981" opacity="0.9" />
            </svg>
          </div>
        );

      // 51. Blender
      case 'blender':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: '#E87D0D',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(232, 125, 13, 0.35)',
            }}
          >
            {/* Blender orange wheel & blue center */}
            <svg width={size * 0.62} height={size * 0.62} viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="13" r="5" fill="#2563EB" />
              <circle cx="12" cy="13" r="2.5" fill="#FFFFFF" />
              <path d="M12 4v4m7 1l-3.5 2M5 9l3.5 2" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </div>
        );

      // 52. VS Code (Visual Studio Code)
      case 'vscode':
      case 'vs-code':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: '#007ACC',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0, 122, 204, 0.35)',
            }}
          >
            {/* VS Code ribbon */}
            <svg width={size * 0.62} height={size * 0.62} viewBox="0 0 24 24" fill="#FFFFFF">
              <path d="M17.5 2.5l4.5 2v15l-4.5 2-10-8.5 10-10.5zm-5 9.5l-4.5-3.5-5 4 5 4 4.5-4.5z" />
            </svg>
          </div>
        );

      // 53. Linear
      case 'linear':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: '#5E6AD2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(94, 106, 210, 0.3)',
            }}
          >
            {/* Linear triangle mark */}
            <svg width={size * 0.58} height={size * 0.58} viewBox="0 0 24 24" fill="none">
              <path d="M4 19L19 4M8 20l12-12M4 15L15 4" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" />
            </svg>
          </div>
        );

      // 54. Slack
      case 'slack':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: '#4A154B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(74, 21, 75, 0.3)',
            }}
          >
            {/* Slack 4-color overlapping hashtag */}
            <svg width={size * 0.58} height={size * 0.58} viewBox="0 0 24 24" fill="none">
              <rect x="5" y="9.5" width="5" height="2" rx="1" fill="#36C5F0" />
              <rect x="8" y="5" width="2" height="5" rx="1" fill="#2EB67D" />
              <rect x="14" y="9.5" width="5" height="2" rx="1" fill="#E01E5A" />
              <rect x="14" y="14" width="2" height="5" rx="1" fill="#ECB22E" />
            </svg>
          </div>
        );

      // 55. Framer
      case 'framer':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: '#0055FF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0, 85, 255, 0.35)',
            }}
          >
            {/* Framer layered geometric mark */}
            <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="#FFFFFF">
              <path d="M4 2h16v7h-8zM4 9h8l8 7H4zM4 16h8v7z" />
            </svg>
          </div>
        );

      // 56. Webflow
      case 'webflow':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: '#146EF5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(20, 110, 245, 0.35)',
            }}
          >
            <svg width={size * 0.58} height={size * 0.58} viewBox="0 0 24 24" fill="#FFFFFF">
              <path d="M22 6.5l-5.5 11-4-8-4 8L3 6.5h4l2.5 5.5 2.5-5.5h3l2.5 5.5 2.5-5.5z" />
            </svg>
          </div>
        );

      // 57. Supabase
      case 'supabase':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: '#1C1C1C',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
            }}
          >
            {/* Supabase emerald lightning bolt */}
            <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="none">
              <path
                d="M13.5 2L3 14.5h8.5L9.5 22l11.5-12.5h-8.5L13.5 2z"
                fill="url(#sb-gradient)"
              />
              <defs>
                <linearGradient id="sb-gradient" x1="3" y1="2" x2="21" y2="22" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#3ECF8E" />
                  <stop offset="1" stopColor="#1E8E5A" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        );

      // 58. Raycast
      case 'raycast':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: '#FF6363',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(255, 99, 99, 0.3)',
            }}
          >
            <svg width={size * 0.58} height={size * 0.58} viewBox="0 0 24 24" fill="#FFFFFF">
              <path d="M4 12l8-8v6h8l-8 8v-6H4z" />
            </svg>
          </div>
        );

      // 59. Ableton Live
      case 'ableton-live':
      case 'ableton':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: '#000000',
              border: '1px solid #334155',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
            }}
          >
            {/* Ableton Live 4-vertical & 4-horizontal bars */}
            <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="#FFFFFF">
              <rect x="4" y="6" width="1.8" height="12" />
              <rect x="7.5" y="6" width="1.8" height="12" />
              <rect x="11" y="6" width="1.8" height="12" />
              <rect x="14.5" y="6" width="1.8" height="12" />
              <rect x="18" y="6" width="2" height="2" />
              <rect x="18" y="9.5" width="2" height="2" />
              <rect x="18" y="13" width="2" height="2" />
              <rect x="18" y="16.5" width="2" height="2" />
            </svg>
          </div>
        );

      // 60. FL Studio
      case 'fl-studio':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: '#1E1E1E',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
            }}
          >
            {/* FL Studio pepper fruit icon */}
            <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="none">
              <path d="M12 4c-3 0-5 2-5 5 0 4 5 11 5 11s5-7 5-11c0-3-2-5-5-5z" fill="#F97316" />
              <path d="M12 4c1-2 3-3 5-2" stroke="#22C55E" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </div>
        );

      // 61. Logic Pro
      case 'logic-pro':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: '#27272A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
            }}
          >
            <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="none" stroke="#E2E8F0" strokeWidth="2">
              <circle cx="12" cy="12" r="8" />
              <circle cx="12" cy="12" r="3" fill="#E2E8F0" />
              <line x1="12" y1="4" x2="12" y2="7" stroke="#3B82F6" strokeWidth="2.5" />
            </svg>
          </div>
        );

      // 62. Audacity
      case 'audacity':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: '#002B49',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0, 43, 73, 0.3)',
            }}
          >
            <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2">
              <path d="M4 15s2-7 8-7 8 7 8 7" stroke="#38BDF8" strokeWidth="2.4" />
              <path d="M6 13l3 4 3-8 3 7 3-3" strokeLinecap="round" />
            </svg>
          </div>
        );

      // 63. Cinema 4D
      case 'cinema-4d':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: '#002554',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontWeight: 900,
              fontSize: size * 0.42,
            }}
          >
            C4D
          </div>
        );

      // 64. Final Cut Pro
      case 'final-cut-pro':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: '#1E1E1E',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
            }}
          >
            <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="none">
              <rect x="4" y="6" width="16" height="12" rx="2" fill="#3B82F6" />
              <path d="M4 9h16M9 6v3M15 6v3" stroke="#FFFFFF" strokeWidth="1.5" />
            </svg>
          </div>
        );

      // 65. CapCut
      case 'capcut':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: '#000000',
              border: '1px solid #334155',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
            }}
          >
            <svg width={size * 0.58} height={size * 0.58} viewBox="0 0 24 24" fill="none">
              <path d="M6 6l6 6-6 6M18 6l-6 6 6 6" stroke="#06B6D4" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        );

      // 66. Docker
      case 'docker':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: '#2496ED',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(36, 150, 237, 0.3)',
            }}
          >
            <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="#FFFFFF">
              <rect x="4" y="11" width="2" height="2" />
              <rect x="7" y="11" width="2" height="2" />
              <rect x="10" y="11" width="2" height="2" />
              <rect x="7" y="8" width="2" height="2" />
              <rect x="10" y="8" width="2" height="2" />
              <path d="M21 13c-.5-2-2-3-4-3-1 0-2 .5-2 1-3 0-6 2-7 5 3 2 8 2 13-3z" />
            </svg>
          </div>
        );

      // 67. Postman
      case 'postman':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: '#FF6C37',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(255, 108, 55, 0.3)',
            }}
          >
            <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="#FFFFFF">
              <circle cx="12" cy="8" r="4" />
              <path d="M12 13c-4 0-7 2-7 5v2h14v-2c0-3-3-5-7-5z" />
            </svg>
          </div>
        );

      // 68. Jira
      case 'jira':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: '#0052CC',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0, 82, 204, 0.3)',
            }}
          >
            <svg width={size * 0.58} height={size * 0.58} viewBox="0 0 24 24" fill="#FFFFFF">
              <path d="M11.5 3L6 8.5l5.5 5.5L17 8.5 11.5 3zm0 7.5l-3 3 3 3 3-3-3-3z" />
            </svg>
          </div>
        );

      // 69. Asana
      case 'asana':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: '#FFFFFF',
              border: '1.5px solid #F06A6A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 6px rgba(240, 106, 106, 0.2)',
            }}
          >
            <svg width={size * 0.58} height={size * 0.58} viewBox="0 0 24 24" fill="#F06A6A">
              <circle cx="12" cy="7" r="3.5" />
              <circle cx="6.5" cy="16" r="3.5" />
              <circle cx="17.5" cy="16" r="3.5" />
            </svg>
          </div>
        );

      // 70. ClickUp
      case 'clickup':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              background: 'linear-gradient(135deg, #7B68EE 0%, #FF007F 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(123, 104, 238, 0.3)',
            }}
          >
            <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round">
              <path d="M6 13l6-6 6 6" />
              <circle cx="12" cy="17" r="1.5" fill="#FFFFFF" />
            </svg>
          </div>
        );

      // 71. Miro
      case 'miro':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: '#FFD02F',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(255, 208, 47, 0.35)',
            }}
          >
            <svg width={size * 0.58} height={size * 0.58} viewBox="0 0 24 24" fill="#050038">
              <polygon points="5 18 10 6 7 6 4 18" />
              <polygon points="10 18 15 6 12 6 9 18" />
              <polygon points="15 18 20 6 17 6 14 18" />
            </svg>
          </div>
        );

      // 72. Loom
      case 'loom':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: '#625DF5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(98, 93, 245, 0.3)',
            }}
          >
            <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="#FFFFFF">
              <circle cx="12" cy="12" r="5" />
              <circle cx="12" cy="4" r="2" />
              <circle cx="20" cy="12" r="2" />
              <circle cx="12" cy="20" r="2" />
              <circle cx="4" cy="12" r="2" />
            </svg>
          </div>
        );

      // 73. Zoom
      case 'zoom':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: '#2D8CFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(45, 140, 255, 0.3)',
            }}
          >
            <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="#FFFFFF">
              <rect x="4" y="8" width="10" height="8" rx="2" />
              <polygon points="15 10 20 7 20 17 15 14" />
            </svg>
          </div>
        );

      // 74. Obsidian
      case 'obsidian':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: '#7C3AED',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(124, 58, 237, 0.35)',
            }}
          >
            {/* Obsidian purple crystal */}
            <svg width={size * 0.58} height={size * 0.58} viewBox="0 0 24 24" fill="#FFFFFF">
              <polygon points="12 2 19 8 16 21 8 21 5 8" opacity="0.9" />
              <polygon points="12 6 16 10 14 18 10 18 8 10" fill="#DDD6FE" />
            </svg>
          </div>
        );

      // 75. Stripe
      case 'stripe':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: '#635BFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontWeight: 900,
              fontSize: size * 0.54,
              boxShadow: '0 2px 8px rgba(99, 91, 255, 0.35)',
            }}
          >
            S
          </div>
        );

      // 76. HubSpot
      case 'hubspot':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: '#FF7A59',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(255, 122, 89, 0.35)',
            }}
          >
            <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="#FFFFFF">
              <circle cx="12" cy="12" r="5" />
              <circle cx="12" cy="4" r="2" />
              <line x1="12" y1="6" x2="12" y2="7" stroke="#FFFFFF" strokeWidth="2" />
              <circle cx="19" cy="9" r="2" />
              <line x1="16" y1="10" x2="17" y2="9.5" stroke="#FFFFFF" strokeWidth="2" />
            </svg>
          </div>
        );

      // 77. Airtable
      case 'airtable':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: '#FCB400',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(252, 180, 0, 0.35)',
            }}
          >
            <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="#FFFFFF">
              <polygon points="12 4 4 9 12 14 20 9" />
              <polygon points="4 11 12 16 12 21 4 16" opacity="0.8" />
              <polygon points="12 16 20 11 20 16 12 21" opacity="0.6" />
            </svg>
          </div>
        );

      // 78. PostHog
      case 'posthog':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: '#FEE440',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(254, 228, 64, 0.35)',
            }}
          >
            <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="#1D1F27">
              <circle cx="12" cy="13" r="7" />
              <polygon points="7 7 10 9 6 12" />
              <polygon points="17 7 14 9 18 12" />
            </svg>
          </div>
        );

      // 79. Mixpanel
      case 'mixpanel':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: '#7856FF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(120, 86, 255, 0.35)',
            }}
          >
            <svg width={size * 0.58} height={size * 0.58} viewBox="0 0 24 24" fill="#FFFFFF">
              <rect x="5" y="14" width="3.5" height="6" rx="1" />
              <rect x="10.25" y="9" width="3.5" height="11" rx="1" />
              <rect x="15.5" y="4" width="3.5" height="16" rx="1" />
            </svg>
          </div>
        );

      // 80. WordPress
      case 'wordpress':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: '#21759B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(33, 117, 155, 0.35)',
            }}
          >
            <svg width={size * 0.62} height={size * 0.62} viewBox="0 0 24 24" fill="#FFFFFF">
              <circle cx="12" cy="12" r="9" stroke="#FFFFFF" strokeWidth="1.8" fill="none" />
              <path d="M7 8.5l3.5 9 2-5-2-4h3l2 5 2.5-5h2L16 17.5" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </div>
        );

      // 81. Shopify
      case 'shopify':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: '#95BF47',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(149, 191, 71, 0.35)',
            }}
          >
            <svg width={size * 0.58} height={size * 0.58} viewBox="0 0 24 24" fill="#FFFFFF">
              <path d="M19 8l-2-4H7L5 8H3v12h18V8h-2zM9 8V6h6v2H9z" />
            </svg>
          </div>
        );

      // 82. Duolingo
      case 'duolingo':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: '#58CC02',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(88, 204, 2, 0.35)',
            }}
          >
            <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="#FFFFFF">
              <circle cx="9" cy="11" r="3" />
              <circle cx="15" cy="11" r="3" />
              <polygon points="12 13 10 16 14 16" fill="#F59E0B" />
            </svg>
          </div>
        );

      // 83. Sketch
      case 'sketch':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: '#FDB300',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(253, 179, 0, 0.35)',
            }}
          >
            <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="#FFFFFF">
              <polygon points="12 3 21 9 12 21 3 9" />
            </svg>
          </div>
        );

      // 84. GIMP
      case 'gimp':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: '#5C5543',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontWeight: 900,
              fontSize: size * 0.44,
            }}
          >
            G
          </div>
        );

      // 85. GitHub
      case 'github':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: '#24292E',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(36, 41, 46, 0.35)',
            }}
          >
            <svg width={size * 0.62} height={size * 0.62} viewBox="0 0 24 24" fill="#FFFFFF">
              <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
            </svg>
          </div>
        );

      // 86. Vercel
      case 'vercel':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: '#000000',
              border: '1px solid #334155',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.35)',
            }}
          >
            <svg width={size * 0.58} height={size * 0.58} viewBox="0 0 24 24" fill="#FFFFFF">
              <polygon points="12 3 22 20 2 20" />
            </svg>
          </div>
        );

      // 87. Mailchimp
      case 'mailchimp':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: '#FFE01B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#000000',
              fontWeight: 900,
              fontSize: size * 0.45,
            }}
          >
            MC
          </div>
        );

      // 88. Surfer SEO
      case 'surfer-seo':
      case 'surfer':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              background: 'linear-gradient(135deg, #FF5B24 0%, #FF8F00 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontWeight: 900,
              fontSize: size * 0.44,
              boxShadow: '0 2px 8px rgba(255, 91, 36, 0.35)',
            }}
          >
            S
          </div>
        );

      // ══════════════════════════════════════════════════════════════════════════
      // DEFAULT FALLBACK: Stylized crisp brand initials
      // ══════════════════════════════════════════════════════════════════════════
      default: {
        // Deterministic vibrant hue from name
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
          hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        const hue = Math.abs(hash % 360);

        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              background: `linear-gradient(135deg, hsl(${hue}, 80%, 48%) 0%, hsl(${(hue + 40) % 360}, 85%, 40%) 100%)`,
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: size * 0.44,
              boxShadow: `0 2px 6px hsla(${hue}, 70%, 45%, 0.28)`,
              textTransform: 'uppercase',
              letterSpacing: '-0.5px',
            }}
          >
            {name.slice(0, 2)}
          </div>
        );
      }
    }
  };

  return <div className={`tool-logo-box ${className}`}>{renderContent()}</div>;
};
