import React from 'react';
import { useApp } from '../context/AppContext';
import { SkinUpgrade } from '../types';
import {
  Sparkles,
  ShieldCheck,
  Zap,
  Gem,
  Check,
  Clock,
  X,
  Coins,
} from 'lucide-react';

export const SkinUpgradeModal: React.FC = () => {
  const { skinUpgrades, purchaseSkinUpgrade, currentUser, setActiveModal } = useApp();

  const renderIcon = (iconType: string) => {
    switch (iconType) {
      case 'fragment':
        return (
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/30 to-blue-600/30 border border-cyan-400/50 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <div className="w-6 h-6 rotate-45 bg-cyan-400 rounded-sm shadow-md shadow-cyan-400/80" />
          </div>
        );
      case 'card':
        return (
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600/30 to-indigo-700/30 border border-blue-400/50 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <div className="w-5 h-7 bg-gradient-to-b from-blue-300 to-indigo-500 rounded border border-blue-200 shadow-md" />
          </div>
        );
      case 'diamond':
        return (
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-400/30 to-blue-700/30 border border-sky-400/50 flex items-center justify-center shadow-lg shadow-sky-500/20">
            <Gem className="w-7 h-7 text-cyan-300" />
          </div>
        );
      case 'diamond_gold':
        return (
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400/30 to-amber-500/30 border border-cyan-300/60 flex items-center justify-center shadow-lg shadow-cyan-400/30">
            <Gem className="w-7 h-7 text-cyan-200 fill-cyan-400/30" />
          </div>
        );
      case 'crystal':
        return (
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-fuchsia-500/30 to-purple-800/30 border border-fuchsia-400/60 flex items-center justify-center shadow-lg shadow-fuchsia-500/30">
            <Sparkles className="w-7 h-7 text-fuchsia-300" />
          </div>
        );
      case 'essence':
        return (
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500/30 to-orange-700/30 border border-amber-400/60 flex items-center justify-center shadow-lg shadow-amber-500/30">
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-200 shadow-lg shadow-amber-400/70 animate-pulse" />
          </div>
        );
      default:
        return <Gem className="w-7 h-7 text-cyan-300" />;
    }
  };

  return (
    <div className="space-y-4 max-w-xl mx-auto w-full pb-8">
      {/* Header: Enhance Avatar (matching phone 4) */}
      <div className="text-center pt-1 pb-2">
        <h2 className="font-cinzel text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-blue-100 to-amber-200 hero-glow-cyan tracking-wider">
          Enhance Avatar
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Upgrade skin mastery to amplify passive hourly dividends across all heroes
        </p>
      </div>

      {/* Current Mastery & Multiplier summary */}
      <div className="rounded-2xl p-4 hero-glass-card border border-cyan-500/30 shadow-lg flex items-center justify-between">
        <div>
          <span className="text-[11px] text-slate-400 block uppercase tracking-wider">Current Mastery</span>
          <div className="text-xl font-bold font-rajdhani text-cyan-300">
            {currentUser.masteryPercent}% <span className="text-xs text-slate-400 font-normal">(Rank {currentUser.masteryLevel})</span>
          </div>
        </div>

        <div className="h-8 w-[1px] bg-cyan-900/60" />

        <div className="text-right">
          <span className="text-[11px] text-slate-400 block uppercase tracking-wider">Yield Multiplier</span>
          <div className="text-xl font-bold font-rajdhani text-emerald-400">
            +{(currentUser.masteryPercent * 0.4).toFixed(1)}% Boost
          </div>
        </div>
      </div>

      {/* 2-Column Grid (matching phone 4: Basic Skin Fragment, Elite Skin Card, Epic Skin Diamond, etc.) */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {skinUpgrades.map((skin) => (
          <div
            key={skin.id}
            className="rounded-2xl p-4 hero-glass-card border border-cyan-500/25 hover:border-cyan-400/50 transition-all flex flex-col items-center justify-between text-center relative group shadow-lg"
          >
            {/* Icon */}
            <div className="my-2 group-hover:scale-110 transition-transform duration-300">
              {renderIcon(skin.icon)}
            </div>

            {/* Name */}
            <div className="w-full">
              <h4 className="font-cinzel text-xs font-bold text-slate-100 truncate">
                {skin.name}
              </h4>

              {/* Mastery bonus: +X Mastery */}
              <div className="text-[11px] font-bold text-cyan-300 mt-0.5">
                +{skin.masteryBonus} Mastery
              </div>

              {/* Owned count: Owned X */}
              <div className="text-[10px] text-slate-400 mt-0.5">
                Owned {skin.ownedCount}
              </div>
            </div>

            {/* Bottom action: Timer or Buy ₱XX button (matching screenshot) */}
            <div className="mt-3 w-full">
              {skin.price === 0 ? (
                <div className="py-2 px-3 rounded-xl bg-[#071322] border border-cyan-800/40 text-[11px] text-slate-400 font-mono font-medium flex items-center justify-center gap-1">
                  <Clock className="w-3 h-3 text-cyan-400" />
                  <span>23:59:36</span>
                </div>
              ) : (
                <button
                  onClick={() => purchaseSkinUpgrade(skin.id)}
                  className="w-full py-2 px-3 rounded-xl hero-btn-primary text-xs font-bold text-white uppercase tracking-wider shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-1"
                >
                  <span>Buy ₱{skin.price}</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
