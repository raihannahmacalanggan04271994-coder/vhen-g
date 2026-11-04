import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { HeroPlan } from '../types';
import { MLBBImage } from './MLBBImage';
import {
  Sparkles,
  Zap,
  Clock,
  TrendingUp,
  ShieldAlert,
  ArrowRight,
  Flame,
  CheckCircle,
  X,
  Coins,
} from 'lucide-react';

export const HeroStore: React.FC = () => {
  const { heroPlans, buyHeroPlan, currentUser, setActiveModal, setSelectedHero } = useApp();
  const [inspectHero, setInspectHero] = useState<HeroPlan | null>(null);

  const featuredHero = heroPlans.find((h) => h.isFeatured) || heroPlans[0];
  const otherHeroes = heroPlans.filter((h) => h.id !== featuredHero.id);

  const handleAcquire = (hero: HeroPlan) => {
    buyHeroPlan(hero);
    setInspectHero(null);
  };

  return (
    <div className="space-y-4 max-w-xl mx-auto w-full pb-8">
      {/* Header: Acquire your Hero (matching phone 3) */}
      <div className="text-center pt-1 pb-2">
        <h2 className="font-cinzel text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-cyan-100 to-amber-300 hero-glow-gold tracking-wider">
          Acquire your Hero
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Deploy high-yield champions for automatic hourly distributions
        </p>
      </div>

      {/* Featured Hero Banner (matching phone 3: Fanny Limited-time Offer) */}
      {featuredHero && (
        <div className="relative rounded-3xl overflow-hidden p-[1px] bg-gradient-to-r from-amber-500/60 via-rose-500/50 to-amber-500/60 shadow-2xl">
          <div className="relative bg-[#0d1c31] rounded-3xl p-5 overflow-hidden border border-amber-500/30">
            {/* Top Right Red Ribbon: Limited-Time Offer */}
            <div className="absolute top-4 right-[-34px] transform rotate-45 bg-gradient-to-r from-rose-600 to-red-600 text-white text-[10px] font-extrabold uppercase py-1 px-10 shadow-md border-y border-rose-300/40 text-center tracking-wider">
              {featuredHero.featuredBadge || 'Limited-Time Offer'}
            </div>

            <div className="flex items-center gap-4">
              {/* Featured Avatar */}
              <div className="relative w-28 h-36 rounded-2xl overflow-hidden border-2 border-amber-400/60 shadow-xl shadow-amber-500/20 bg-slate-900 shrink-0">
                <MLBBImage
                  src={featuredHero.avatar}
                  heroName={featuredHero.name}
                  alt={featuredHero.name}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 text-[9px] font-black px-2 py-0.5 rounded bg-amber-950/90 text-amber-300 border border-amber-400/40">
                  {featuredHero.class}
                </span>
              </div>

              {/* Info Column */}
              <div className="flex-1 min-w-0 pr-6">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-cinzel text-xl font-bold text-white tracking-wide truncate">
                    {featuredHero.name}
                  </h3>
                  <Flame className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0" />
                </div>
                <div className="text-[11px] text-cyan-300/90 font-medium">
                  {featuredHero.title} • High-yield 3D v3
                </div>

                {/* Strikethrough & Now Price (matching screenshot) */}
                <div className="mt-2">
                  {featuredHero.originalPrice && (
                    <div className="text-[11px] text-slate-400 line-through">
                      (original price ₱{featuredHero.originalPrice.toLocaleString()})
                    </div>
                  )}
                  <div className="text-xl sm:text-2xl font-black font-rajdhani text-amber-300 hero-glow-gold flex items-baseline gap-1">
                    <span className="text-sm font-semibold text-amber-400">now</span>
                    <span>₱{featuredHero.price.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-1 flex items-center gap-2 text-[11px] text-emerald-300 font-bold font-rajdhani">
                  <Zap className="w-3.5 h-3.5 text-emerald-400" />
                  <span>₱{featuredHero.hourlyIncome.toFixed(2)} / hour</span>
                  <span className="text-slate-400 font-normal">({featuredHero.durationDays} days)</span>
                </div>

                {/* Action buttons */}
                <div className="mt-3 flex items-center gap-2">
                  <button
                    onClick={() => handleAcquire(featuredHero)}
                    className="flex-1 py-2 px-3 rounded-xl hero-btn-gold text-xs font-bold text-white uppercase tracking-wider shadow-lg flex items-center justify-center gap-1"
                  >
                    <span>Summon</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setInspectHero(featuredHero)}
                    className="py-2 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-600 text-xs text-slate-200 font-semibold"
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2-Column Hero Grid (matching phone 3: Layla, Chou, Alice, etc.) */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {otherHeroes.map((hero) => (
          <div
            key={hero.id}
            className="rounded-2xl p-3.5 hero-glass-card border border-cyan-500/30 hover:border-cyan-400 transition-all duration-300 flex flex-col justify-between group shadow-lg"
          >
            <div>
              {/* Avatar Image & Floating Price Badge (centered character display) */}
              <div className="relative w-full h-44 sm:h-48 rounded-xl overflow-hidden bg-[#071324] border border-cyan-900/60">
                <MLBBImage
                  src={hero.avatar}
                  heroName={hero.name}
                  alt={hero.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060e1b] via-transparent to-transparent opacity-75" />

                {/* Price badge in upper-left (like ₱9,500 on cards in screenshot) */}
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-lg bg-black/80 backdrop-blur-md border border-amber-400/50 text-[11px] font-bold text-amber-300 font-rajdhani shadow-md">
                  ₱{hero.price.toLocaleString()}
                </div>

                {/* Class badge in bottom */}
                <div className="absolute bottom-1.5 left-2 text-[10px] font-bold text-cyan-300 uppercase tracking-wider">
                  {hero.class}
                </div>
              </div>

              {/* Hero Title & Info */}
              <div className="mt-2.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-cinzel text-sm font-bold text-white truncate">
                    {hero.name}
                  </h4>
                  <span className="text-[10px] text-slate-400">{hero.title}</span>
                </div>

                <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
                  <span>Class: <strong className="text-slate-200">{hero.class}</strong></span>
                </div>

                {/* Duration & Expected Return (matching "30 days • up to ₱XX") */}
                <div className="text-[11px] text-slate-300 mt-1">
                  <span>{hero.durationDays} days • up to </span>
                  <span className="text-emerald-300 font-bold font-rajdhani">
                    ₱{hero.totalReturn.toLocaleString()}
                  </span>
                </div>

                {/* Hourly yield: "₱XX / hour" (matching screenshot) */}
                <div className="mt-1 flex items-center gap-1 text-xs text-amber-300 font-bold font-rajdhani">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>₱{hero.hourlyIncome.toFixed(2)} / hour</span>
                </div>
              </div>
            </div>

            {/* Details -> button (matching screenshot) */}
            <div className="mt-3 pt-2 border-t border-cyan-900/40 flex items-center justify-between">
              <button
                onClick={() => setInspectHero(hero)}
                className="text-xs font-bold text-cyan-400 hover:text-cyan-200 flex items-center gap-1 transition-colors"
              >
                <span>Details</span>
                <ArrowRight className="w-3 h-3" />
              </button>

              <button
                onClick={() => handleAcquire(hero)}
                className="px-2.5 py-1 rounded-lg hero-btn-primary text-[11px] font-bold text-white uppercase tracking-wider"
              >
                Acquire
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Hero Detail / ROI Breakdown Modal */}
      {inspectHero && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md rounded-3xl p-5 hero-glass-card border border-cyan-400/50 shadow-2xl relative">
            <button
              onClick={() => setInspectHero(null)}
              className="absolute top-4 right-4 p-1 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-cyan-400/60 shadow-lg shrink-0">
                <MLBBImage
                  src={inspectHero.avatar}
                  heroName={inspectHero.name}
                  alt={inspectHero.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div>
                <h3 className="font-cinzel text-lg font-bold text-white">{inspectHero.name}</h3>
                <div className="text-xs text-cyan-300 font-semibold">{inspectHero.title} ({inspectHero.class})</div>
                <div className="text-xs text-slate-400 mt-0.5">{inspectHero.description}</div>
              </div>
            </div>

            {/* Yield Table */}
            <div className="bg-[#071322] rounded-2xl p-4 border border-cyan-900/60 space-y-2.5 text-xs">
              <div className="flex justify-between items-center text-slate-300">
                <span>Summon Cost:</span>
                <span className="font-bold font-rajdhani text-sm text-amber-300">
                  ₱{inspectHero.price.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>Hourly Automated Dividend:</span>
                <span className="font-bold font-rajdhani text-sm text-cyan-300">
                  ₱{inspectHero.hourlyIncome.toFixed(2)} / hr
                </span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>Estimated Daily Income (24h):</span>
                <span className="font-bold font-rajdhani text-sm text-emerald-300">
                  ₱{(inspectHero.hourlyIncome * 24).toFixed(2)} / day
                </span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>Duration Period:</span>
                <span className="font-bold text-slate-200">{inspectHero.durationDays} Days</span>
              </div>
              <div className="pt-2 border-t border-cyan-900/60 flex justify-between items-center">
                <span className="font-bold text-white">Total Expected Payout:</span>
                <span className="font-extrabold font-rajdhani text-base text-emerald-400">
                  ₱{inspectHero.totalReturn.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center text-[11px] text-slate-400">
                <span>Total Net Profit:</span>
                <span className="text-amber-300 font-bold">
                  +₱{(inspectHero.totalReturn - inspectHero.price).toLocaleString()} ({inspectHero.roiPercent}% ROI)
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-5 flex gap-3">
              <button
                onClick={() => setInspectHero(null)}
                className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 uppercase tracking-wider"
              >
                Back
              </button>
              <button
                onClick={() => handleAcquire(inspectHero)}
                className="flex-1 py-3 rounded-xl hero-btn-primary text-xs font-bold text-white uppercase tracking-wider shadow-lg flex items-center justify-center gap-1.5"
              >
                <Coins className="w-4 h-4 text-amber-300" />
                <span>Acquire Now</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
