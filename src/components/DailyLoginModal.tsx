import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Calendar,
  Gift,
  X,
  CheckCircle2,
  Clock,
  Sparkles,
  Zap,
  Lock,
  Flame,
  Coins,
  Gem,
  Award,
} from 'lucide-react';

export const DailyLoginModal: React.FC = () => {
  const {
    activeModal,
    setActiveModal,
    currentUser,
    dailyRewardTiers,
    isDailyRewardReady,
    dailyRemainingMs,
    claimDailyLoginReward,
  } = useApp();

  if (activeModal !== 'dailyLogin') return null;

  const currentStreak = currentUser.dailyStreak || 1;
  const currentTier = dailyRewardTiers.find((t) => t.day === currentStreak) || dailyRewardTiers[0];

  // Format countdown
  const hours = Math.floor(dailyRemainingMs / (3600 * 1000));
  const minutes = Math.floor((dailyRemainingMs % (3600 * 1000)) / (60 * 1000));
  const seconds = Math.floor((dailyRemainingMs % (60 * 1000)) / 1000);

  const formatTimer = (h: number, m: number, s: number) => {
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleClaim = () => {
    claimDailyLoginReward();
  };

  const renderTierIcon = (icon: string, day: number) => {
    switch (icon) {
      case 'coin':
        return <Coins className="w-5 h-5 text-amber-300" />;
      case 'shard':
        return <Zap className="w-5 h-5 text-cyan-300" />;
      case 'rune':
        return <Sparkles className="w-5 h-5 text-blue-300" />;
      case 'gem':
        return <Gem className="w-5 h-5 text-emerald-300" />;
      case 'orb':
        return <Flame className="w-5 h-5 text-fuchsia-300" />;
      case 'relic':
        return <Award className="w-5 h-5 text-amber-400" />;
      case 'jackpot':
        return <Sparkles className="w-7 h-7 text-amber-300 animate-spin" />;
      default:
        return <Coins className="w-5 h-5 text-amber-300" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-lg rounded-3xl p-5 sm:p-6 hero-glass-card border border-cyan-400/50 shadow-2xl relative max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={() => setActiveModal(null)}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-5">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-amber-500/30 to-cyan-500/30 border border-amber-400/50 flex items-center justify-center text-amber-300 mb-2.5 shadow-lg shadow-amber-500/20">
            <Gift className="w-7 h-7 text-amber-300 animate-pulse" />
          </div>
          <h3 className="font-cinzel text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-cyan-100 to-amber-300 hero-glow-gold tracking-wide">
            Daily Login Rewards
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
            Log in every 24 hours to claim free investment credits for your heroes!
          </p>
        </div>

        {/* Streak status pill */}
        <div className="mb-4 p-3 rounded-2xl bg-[#071322] border border-cyan-900/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center">
              <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Login Streak</div>
              <div className="text-[10px] text-slate-400">
                Day {currentStreak} of 7 • {isDailyRewardReady ? 'Ready to Claim' : 'In Cooldown'}
              </div>
            </div>
          </div>

          <div className="text-right">
            {isDailyRewardReady ? (
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40 uppercase tracking-wider flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>Ready</span>
              </span>
            ) : (
              <span className="text-[10px] font-bold font-mono px-2.5 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/40 flex items-center gap-1">
                <Clock className="w-3 h-3 text-cyan-400" />
                <span>{formatTimer(hours, minutes, seconds)}</span>
              </span>
            )}
          </div>
        </div>

        {/* 7-Day Rewards Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 mb-5">
          {dailyRewardTiers.map((tier) => {
            const isDayClaimed =
              tier.day < currentStreak || (!isDailyRewardReady && tier.day === currentStreak);
            const isDayActive = isDailyRewardReady && tier.day === currentStreak;
            const isDayLocked = tier.day > currentStreak;
            const isJackpot = tier.day === 7;

            return (
              <div
                key={tier.day}
                className={`relative rounded-2xl p-2.5 flex flex-col items-center justify-between text-center transition-all ${
                  isJackpot ? 'col-span-3 sm:col-span-2' : ''
                } ${
                  isDayActive
                    ? 'bg-gradient-to-b from-cyan-950/90 to-blue-950/90 border-2 border-cyan-400 shadow-xl shadow-cyan-500/30 scale-102'
                    : isDayClaimed
                    ? 'bg-emerald-950/40 border border-emerald-500/30 opacity-75'
                    : isJackpot
                    ? 'bg-gradient-to-b from-amber-950/80 to-slate-900 border border-amber-500/50 shadow-lg'
                    : 'bg-[#071322] border border-cyan-950/80 text-slate-400'
                }`}
              >
                {/* Day Header badge */}
                <div className="w-full flex items-center justify-between text-[10px] font-bold mb-1">
                  <span
                    className={
                      isDayActive
                        ? 'text-cyan-300 font-bold'
                        : isDayClaimed
                        ? 'text-emerald-400'
                        : isJackpot
                        ? 'text-amber-300'
                        : 'text-slate-400'
                    }
                  >
                    Day {tier.day}
                  </span>
                  {isDayClaimed ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  ) : isDayLocked ? (
                    <Lock className="w-3 h-3 text-slate-500" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  )}
                </div>

                {/* Icon */}
                <div className="my-1.5">{renderTierIcon(tier.icon, tier.day)}</div>

                {/* Reward Amount */}
                <div
                  className={`font-rajdhani font-black ${
                    isJackpot ? 'text-xl text-amber-300 hero-glow-gold' : 'text-base text-white'
                  }`}
                >
                  ₱{tier.amount}
                </div>

                {/* Subtitle / Bonus */}
                <div
                  className={`text-[9px] font-semibold truncate max-w-full ${
                    isJackpot
                      ? 'text-amber-200'
                      : isDayActive
                      ? 'text-cyan-300'
                      : 'text-slate-400'
                  }`}
                >
                  {isDayClaimed ? 'Claimed' : tier.bonusTitle}
                </div>
              </div>
            );
          })}
        </div>

        {/* Claim Action Button or Cooldown Notice */}
        <div className="space-y-2">
          {isDailyRewardReady ? (
            <button
              onClick={handleClaim}
              className="w-full py-3.5 rounded-2xl hero-btn-gold text-xs sm:text-sm font-black text-white uppercase tracking-wider shadow-xl flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
            >
              <Gift className="w-5 h-5 text-amber-200 animate-bounce" />
              <span>Claim Day {currentStreak} Bonus (+₱{currentTier.amount})</span>
            </button>
          ) : (
            <div className="w-full py-3 px-4 rounded-2xl bg-[#071322] border border-cyan-900/60 text-center">
              <div className="text-[11px] text-slate-400 mb-0.5 flex items-center justify-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>Next 24h Daily Login Bonus Unlocks In:</span>
              </div>
              <div className="font-mono font-bold text-lg text-cyan-300 tracking-widest">
                {formatTimer(hours, minutes, seconds)}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                Next: Day {currentStreak} (₱{currentTier.amount})
              </div>
            </div>
          )}

          <div className="text-center text-[10px] text-slate-500 pt-1">
            ⚡ Rewards distribute once every 24 hours. Keep your streak alive to unlock the Day 7 Mythic Bonus!
          </div>
        </div>
      </div>
    </div>
  );
};
