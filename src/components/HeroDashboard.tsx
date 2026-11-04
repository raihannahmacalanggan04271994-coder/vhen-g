import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MLBBImage } from './MLBBImage';
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  Users,
  Gift,
  Sparkles,
  Zap,
  TrendingUp,
  Clock,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle,
  Calendar,
  Flame,
} from 'lucide-react';

export const HeroDashboard: React.FC = () => {
  const {
    currentUser,
    userInvestments,
    activeHourlyRate,
    totalUnclaimed,
    claimAllRewards,
    claimSingleHero,
    setActiveModal,
    setActiveTab,
    adminSettings,
    isDailyRewardReady,
    dailyRemainingMs,
    dailyRewardTiers,
    claimDailyLoginReward,
  } = useApp();

  const [activeHeroIndex, setActiveHeroIndex] = useState(0);

  const activeInvestments = userInvestments.filter((i) => i.status === 'active');
  const currentHero = activeInvestments[activeHeroIndex] || activeInvestments[0];

  const handleNextHero = () => {
    if (activeInvestments.length > 1) {
      setActiveHeroIndex((prev) => (prev + 1) % activeInvestments.length);
    }
  };

  const handlePrevHero = () => {
    if (activeInvestments.length > 1) {
      setActiveHeroIndex((prev) => (prev - 1 + activeInvestments.length) % activeInvestments.length);
    }
  };

  return (
    <div className="space-y-4 max-w-xl mx-auto w-full pb-8">
      {/* Top Banner: Welcome Summoner (matching screenshot) */}
      <div className="relative overflow-hidden rounded-2xl p-[1px] bg-gradient-to-r from-amber-500/30 via-cyan-500/30 to-amber-500/30">
        <div className="bg-[#091526]/90 backdrop-blur-md rounded-2xl py-2.5 px-4 flex items-center justify-between border border-cyan-500/20">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-cyan-900/60 border border-cyan-400/40 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-cyan-300 animate-pulse" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-300 tracking-wide">
                Welcome, <span className="text-cyan-300 font-bold">{currentUser.name}</span>
              </div>
              <div className="text-[11px] text-cyan-400 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                <span>Your Hero is earning</span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Level {currentUser.masteryLevel}</span>
            <span className="text-xs font-bold text-amber-300 font-rajdhani">Summoner Rank</span>
          </div>
        </div>
      </div>

      {/* Hero Showcase Card (matching phone 2 in reference image) */}
      <div className="relative rounded-3xl p-5 hero-glass-card overflow-hidden border border-cyan-500/30 shadow-2xl">
        {/* Ambient glow behind hero */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-48 h-48 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-10 -right-10 w-44 h-44 bg-blue-600/15 rounded-full blur-2xl pointer-events-none" />

        {currentHero ? (
          <div className="space-y-3.5">
            {/* Top Stage Bar: Rate & Status */}
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="font-cinzel text-xs font-bold text-slate-300 tracking-wider">
                  Active Champion
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-950/90 border border-cyan-500/40 text-cyan-300 uppercase font-mono">
                  {currentHero.heroClass}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-amber-300 font-bold font-rajdhani">
                <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400 animate-pulse" />
                <span>₱{currentHero.hourlyRate.toFixed(2)} / hour</span>
              </div>
            </div>

            {/* Centered Hero Stage (Centered Gusion) */}
            <div className="relative w-full h-60 sm:h-72 rounded-2xl overflow-hidden border-2 border-cyan-400/50 shadow-2xl shadow-cyan-500/20 bg-[#06101f] group">
              <MLBBImage
                src={currentHero.heroAvatar}
                heroName={currentHero.heroName}
                alt={currentHero.heroName}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              {/* Subtle top & bottom vignette gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#060e1b] via-transparent to-[#060e1b]/40 opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#060e1b]/30 via-transparent to-[#060e1b]/30" />

              {/* Top Banner inside image: READY TO CLAIM */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 text-center pointer-events-none">
                <div className="font-cinzel text-lg sm:text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-white to-cyan-200 hero-glow-cyan uppercase tracking-widest drop-shadow-lg">
                  READY TO CLAIM
                </div>
                <div className="text-[11px] font-bold text-amber-300 font-rajdhani drop-shadow">
                  ₱{currentHero.hourlyRate.toFixed(2)} / hour
                </div>
              </div>

              {/* Bottom Centered Hero Tag */}
              <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 text-center w-full px-4">
                <div className="inline-block px-4 py-1.5 rounded-xl bg-[#061224]/90 backdrop-blur-md border border-cyan-400/50 shadow-xl">
                  <h3 className="font-cinzel text-base font-black text-white tracking-widest uppercase">
                    {currentHero.heroName}
                  </h3>
                  <div className="text-[10px] text-cyan-300 font-semibold tracking-wider -mt-0.5">
                    {currentHero.heroClass} • Holy Blade
                  </div>
                </div>
              </div>
            </div>

            {/* Real-time micro yield accumulator box */}
            <div className="w-full bg-[#081527]/90 rounded-2xl p-3 border border-cyan-800/50 shadow-inner flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Unclaimed Hourly Yield:</span>
                </div>
                <div className="text-xl sm:text-2xl font-bold font-rajdhani text-emerald-300 tracking-wider">
                  ₱{currentHero.unclaimedEarnings.toFixed(4)}
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-400 block">Total Harvested</span>
                <span className="text-xs font-bold text-slate-200 font-rajdhani">
                  ₱{currentHero.totalEarned.toFixed(2)}
                </span>
                {activeInvestments.length > 1 && (
                  <button
                    onClick={() => claimSingleHero(currentHero.id)}
                    className="mt-1 text-[11px] font-bold text-cyan-400 hover:text-cyan-200 flex items-center gap-1"
                  >
                    <span>Claim {currentHero.heroName}</span>
                    <ArrowDownLeft className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            {/* Pagination dots if more than 1 hero */}
            {activeInvestments.length > 1 && (
              <div className="flex items-center justify-center gap-3 mt-3 pt-2 border-t border-cyan-900/40">
                <button
                  onClick={handlePrevHero}
                  className="p-1 rounded-full text-slate-400 hover:text-cyan-300 hover:bg-cyan-950/40 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-1.5">
                  {activeInvestments.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveHeroIndex(idx)}
                      className={`h-2 rounded-full transition-all ${
                        idx === activeHeroIndex ? 'w-6 bg-cyan-400 shadow-sm shadow-cyan-400/50' : 'w-2 bg-slate-700'
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={handleNextHero}
                  className="p-1 rounded-full text-slate-400 hover:text-cyan-300 hover:bg-cyan-950/40 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-950/50 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-3">
              <Zap className="w-8 h-8 animate-pulse" />
            </div>
            <h3 className="font-cinzel text-lg font-bold text-white">No Active Hero Deployed</h3>
            <p className="text-xs text-slate-400 max-w-xs mx-auto mt-1 mb-4">
              Summon your first hero to start generating automatic hourly income 24/7!
            </p>
            <button
              onClick={() => setActiveTab('store')}
              className="px-5 py-2.5 rounded-xl hero-btn-primary text-xs font-bold text-white uppercase tracking-wider"
            >
              Browse Hero Store
            </button>
          </div>
        )}
      </div>

      {/* Available Balance & Claim Rewards Button (matching phone 2 in screenshot) */}
      <div className="rounded-3xl p-5 hero-glass-card border border-cyan-500/30 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-600/30 to-blue-900/40 border border-cyan-400/50 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Wallet className="w-6 h-6 text-cyan-300" />
            </div>
            <div>
              <div className="text-xs font-medium text-slate-400">Available balance:</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-rajdhani tracking-tight flex items-baseline gap-1">
                <span className="text-cyan-400">₱</span>
                <span>{currentUser.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-400 block font-medium">Hourly Output</span>
            <span className="text-sm font-bold text-cyan-300 font-rajdhani">
              +₱{activeHourlyRate.toFixed(2)}/hr
            </span>
          </div>
        </div>

        {/* Big Claim Rewards Button */}
        <button
          onClick={claimAllRewards}
          disabled={totalUnclaimed <= 0}
          className={`w-full py-3.5 rounded-2xl font-bold text-sm tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
            totalUnclaimed > 0
              ? 'hero-btn-primary text-white cursor-pointer hover:scale-[1.01] active:scale-[0.99]'
              : 'bg-slate-800/60 text-slate-500 border border-slate-700/50 cursor-not-allowed'
          }`}
        >
          <Sparkles className={`w-4 h-4 ${totalUnclaimed > 0 ? 'text-amber-300 animate-spin' : ''}`} />
          <span>Claim rewards</span>
          {totalUnclaimed > 0 && (
            <span className="ml-1 px-2 py-0.5 rounded-full bg-cyan-400/20 text-cyan-200 text-xs font-rajdhani font-bold border border-cyan-300/30">
              +₱{totalUnclaimed.toFixed(2)}
            </span>
          )}
        </button>
      </div>

      {/* Daily Login Rewards Widget Banner (Claim once every 24 hours) */}
      <div className="relative overflow-hidden rounded-2xl p-[1px] bg-gradient-to-r from-amber-500/50 via-cyan-500/40 to-amber-500/50 shadow-lg">
        <div className="bg-[#09172c]/95 rounded-2xl p-3.5 flex items-center justify-between gap-3 border border-amber-500/30">
          <div
            onClick={() => setActiveModal('dailyLogin')}
            className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
          >
            <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500/30 to-yellow-600/30 border border-amber-400/50 flex items-center justify-center text-amber-300 shadow-md shrink-0">
              <Gift className="w-5 h-5 text-amber-300" />
              {isDailyRewardReady && (
                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#09172c] animate-ping" />
              )}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-cinzel text-xs font-bold text-white tracking-wide truncate">
                  Daily Login Bonus
                </span>
                <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 font-bold uppercase font-mono">
                  Day {currentUser.dailyStreak || 1}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 truncate mt-0.5">
                {isDailyRewardReady
                  ? `Claim ₱${(dailyRewardTiers.find((t) => t.day === (currentUser.dailyStreak || 1)) || dailyRewardTiers[0]).amount} free investment credit now!`
                  : `Next 24h bonus unlocks in ${Math.floor(dailyRemainingMs / (3600 * 1000))}h ${Math.floor((dailyRemainingMs % (3600 * 1000)) / (60 * 1000))}m`}
              </p>
            </div>
          </div>

          <div className="shrink-0">
            {isDailyRewardReady ? (
              <button
                onClick={() => claimDailyLoginReward()}
                className="py-2 px-3.5 rounded-xl hero-btn-gold text-xs font-bold text-white uppercase tracking-wider shadow-lg flex items-center gap-1.5 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-200 animate-spin" />
                <span>Claim</span>
              </button>
            ) : (
              <button
                onClick={() => setActiveModal('dailyLogin')}
                className="py-1.5 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-cyan-800/50 text-[11px] font-bold text-cyan-300 flex items-center gap-1 transition-colors"
              >
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                <span>Calendar</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 4 Circular Action Buttons (matching phone 2 in screenshot) */}
      <div className="grid grid-cols-4 gap-3 pt-1">
        {/* Top up */}
        <button
          onClick={() => setActiveModal('topup')}
          className="flex flex-col items-center gap-2 group transition-transform active:scale-95"
        >
          <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-[#0c1c33] border border-cyan-500/40 group-hover:border-cyan-400 flex items-center justify-center text-cyan-300 group-hover:bg-cyan-950/60 transition-all shadow-lg shadow-black/40">
            <ArrowUpRight className="w-6 h-6 group-hover:scale-110 transition-transform text-cyan-400" />
          </div>
          <span className="text-xs font-semibold text-slate-300 group-hover:text-cyan-300 transition-colors">
            Top up
          </span>
        </button>

        {/* Withdraw */}
        <button
          onClick={() => setActiveModal('withdraw')}
          className="flex flex-col items-center gap-2 group transition-transform active:scale-95"
        >
          <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-[#0c1c33] border border-cyan-500/40 group-hover:border-cyan-400 flex items-center justify-center text-cyan-300 group-hover:bg-cyan-950/60 transition-all shadow-lg shadow-black/40">
            <ArrowDownLeft className="w-6 h-6 group-hover:scale-110 transition-transform text-cyan-400" />
          </div>
          <span className="text-xs font-semibold text-slate-300 group-hover:text-cyan-300 transition-colors">
            Withdraw
          </span>
        </button>

        {/* Invite */}
        <button
          onClick={() => setActiveModal('invite')}
          className="flex flex-col items-center gap-2 group transition-transform active:scale-95"
        >
          <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-[#0c1c33] border border-cyan-500/40 group-hover:border-cyan-400 flex items-center justify-center text-cyan-300 group-hover:bg-cyan-950/60 transition-all shadow-lg shadow-black/40">
            <Users className="w-6 h-6 group-hover:scale-110 transition-transform text-cyan-400" />
          </div>
          <span className="text-xs font-semibold text-slate-300 group-hover:text-cyan-300 transition-colors">
            Invite
          </span>
        </button>

        {/* Gift code */}
        <button
          onClick={() => setActiveModal('giftcode')}
          className="flex flex-col items-center gap-2 group transition-transform active:scale-95"
        >
          <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-[#0c1c33] border border-cyan-500/40 group-hover:border-cyan-400 flex items-center justify-center text-cyan-300 group-hover:bg-cyan-950/60 transition-all shadow-lg shadow-black/40">
            <Gift className="w-6 h-6 group-hover:scale-110 transition-transform text-cyan-400" />
          </div>
          <span className="text-xs font-semibold text-slate-300 group-hover:text-cyan-300 transition-colors">
            Gift code
          </span>
        </button>
      </div>

      {/* Mastery Progress Bar (matching phone 2 in screenshot) */}
      <div className="rounded-2xl p-4 hero-glass-card border border-cyan-500/25 shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="font-cinzel text-sm font-bold text-slate-200">Mastery</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-bold">
              Rank {currentUser.masteryLevel}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-rajdhani text-sm font-bold text-cyan-300">{currentUser.masteryPercent}%</span>
            <button
              onClick={() => setActiveModal('enhance')}
              className="text-[11px] font-semibold text-amber-300 hover:text-amber-200 flex items-center gap-0.5"
            >
              <span>Boost</span>
              <Sparkles className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Neon glowing progress bar */}
        <div className="w-full h-3 bg-[#071322] rounded-full overflow-hidden p-0.5 border border-cyan-900/60 shadow-inner">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-600 via-cyan-400 to-cyan-300 transition-all duration-700 shadow-md shadow-cyan-400/50"
            style={{ width: `${Math.min(100, currentUser.masteryPercent)}%` }}
          />
        </div>
      </div>

      {/* Active Heroes Summary / Quick Roster */}
      <div className="rounded-2xl p-4 hero-glass-card border border-cyan-500/20">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            <h3 className="font-cinzel text-xs font-bold text-slate-200 uppercase tracking-wider">
              Active Hourly Contracts ({activeInvestments.length})
            </h3>
          </div>
          <button
            onClick={() => setActiveTab('store')}
            className="text-[11px] font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
          >
            <span>+ Summon Hero</span>
          </button>
        </div>

        {activeInvestments.length > 0 ? (
          <div className="space-y-2">
            {activeInvestments.map((inv) => (
              <div
                key={inv.id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#0a182d]/70 border border-cyan-900/40 hover:border-cyan-500/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <MLBBImage
                    src={inv.heroAvatar}
                    heroName={inv.heroName}
                    alt={inv.heroName}
                    className="w-10 h-10 rounded-lg object-cover border border-cyan-500/30"
                  />
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>{inv.heroName}</span>
                      <span className="text-[10px] text-cyan-400/80 font-normal">({inv.heroClass})</span>
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Rate: <span className="text-amber-300 font-bold">₱{inv.hourlyRate.toFixed(2)}/hr</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-bold text-emerald-400 font-rajdhani">
                    ₱{inv.unclaimedEarnings.toFixed(2)} Ready
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Earned: ₱{inv.totalEarned.toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4 text-xs text-slate-400">
            No active contracts. Visit the Hero Store to start earning!
          </div>
        )}
      </div>
    </div>
  );
};
