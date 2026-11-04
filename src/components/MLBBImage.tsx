import React, { useState } from 'react';

interface MLBBImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  heroName: string;
  fallbackSrc?: string;
}

// Fallback high-res character renders matching each Mobile Legends hero
const HERO_FALLBACKS: Record<string, string> = {
  gusion: '/assets/aistudio/gusion-from-mobile-legends-standing-in-his-hero-select-page_8d9a24f9.jpg',
  fanny: 'https://images2.alphacoders.com/100/1008272.jpg',
  layla: '/assets/aistudio/8a146ebb4e9e6c9e0553f7e14f66a7ca_31f78804.jpg',
  chou: 'https://images.alphacoders.com/109/1097223.jpg',
  alice: 'https://images5.alphacoders.com/109/1097217.jpg',
  tigreal: 'https://images4.alphacoders.com/109/1097228.jpg',
  lesley: 'https://images6.alphacoders.com/109/1097224.jpg',
  miya: 'https://images7.alphacoders.com/109/1097225.jpg',
};

// SVG illustrated stylized badges matching each hero's role and look if network image is blocked
const HERO_GRADIENTS: Record<string, { bg: string; text: string; icon: string }> = {
  gusion: { bg: 'from-indigo-600 via-blue-500 to-cyan-400', text: '🗡️', icon: 'Assassin • Holy Blade' },
  fanny: { bg: 'from-amber-500 via-yellow-400 to-orange-500', text: '⚔️', icon: 'Assassin • Blade Dancer' },
  layla: { bg: 'from-pink-500 via-rose-400 to-amber-300', text: '🚀', icon: 'Marksman • Malefic Gunner' },
  chou: { bg: 'from-amber-600 via-yellow-500 to-orange-600', text: '🥋', icon: 'Fighter • Kung Fu Boy' },
  alice: { bg: 'from-purple-800 via-fuchsia-700 to-rose-900', text: '🦇', icon: 'Mage • Queen of Blood' },
  tigreal: { bg: 'from-blue-700 via-cyan-600 to-amber-400', text: '🛡️', icon: 'Tank • Warrior of Dawn' },
};

export const MLBBImage: React.FC<MLBBImageProps> = ({
  src,
  alt,
  heroName,
  fallbackSrc,
  className = '',
  ...props
}) => {
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(src);
  const [hasError, setHasError] = useState(false);
  const [tryCount, setTryCount] = useState(0);

  const heroKey = heroName.toLowerCase();

  const handleError = () => {
    if (tryCount === 0) {
      // First fallback: High-res wallpaper/portrait CDN
      const fallback = fallbackSrc || HERO_FALLBACKS[heroKey];
      if (fallback && fallback !== currentSrc) {
        setTryCount(1);
        setCurrentSrc(fallback);
        return;
      }
    }
    // Final fallback: Stylized SVG graphic
    setHasError(true);
  };

  if (hasError) {
    const styling = HERO_GRADIENTS[heroKey] || {
      bg: 'from-cyan-700 to-blue-900',
      text: '⚔️',
      icon: 'Mobile Legends Hero',
    };
    return (
      <div
        className={`w-full h-full flex flex-col items-center justify-center p-2 bg-gradient-to-br ${styling.bg} text-white select-none ${className}`}
      >
        <span className="text-3xl mb-1 filter drop-shadow-md">{styling.text}</span>
        <span className="font-cinzel text-xs font-black tracking-wider uppercase text-center drop-shadow">
          {heroName}
        </span>
        <span className="text-[9px] font-bold text-white/90 text-center tracking-tight">
          {styling.icon}
        </span>
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt || `${heroName} - Mobile Legends`}
      onError={handleError}
      className={className}
      loading="lazy"
      {...props}
    />
  );
};
