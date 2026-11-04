import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Shield,
  ShoppingBag,
  Sparkles,
  Wallet,
  Users,
  Volume2,
  VolumeX,
  Smartphone,
  Monitor,
  Plus,
  Coins,
  Gift,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentUser,
    activeTab,
    setActiveTab,
    activeHourlyRate,
    isPhoneFrame,
    setIsPhoneFrame,
    soundEnabled,
    setSoundEnabled,
    setActiveModal,
    adminSettings,
    isDailyRewardReady,
  } = useApp();

  return (
    <header className="sticky top-0 z-40 bg-[#081220]/90 backdrop-blur-md border-b border-cyan-900/40">
      {/* Top System Broadcast ticker */}
      {adminSettings.systemNotification && (
        <div className="bg-gradient-to-r from-blue-950 via-cyan-950 to-blue-950 px-4 py-1.5 text-center text-[11px] font-medium text-cyan-300 border-b border-cyan-800/30 flex items-center justify-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>{adminSettings.systemNotification}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2">
        {/* Logo / Brand */}
        <div
          onClick={() => setActiveTab('dashboard')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-600 to-indigo-800 p-[1px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-400/40 transition-all">
            <div className="w-full h-full bg-[#071322] rounded-[11px] flex items-center justify-center">
              <Shield className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div>
            <div className="font-cinzel text-lg font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-blue-100 to-amber-200 hero-glow-cyan leading-none">
              AVATAR LEGENDS
            </div>
            <div className="text-[10px] tracking-widest text-cyan-400/70 font-semibold uppercase mt-0.5">
              MLBB Hourly Yield Vault
            </div>
          </div>
        </div>

        {/* Center Nav for tablet/desktop (Admin removed as requested) */}
        <nav className="hidden md:flex items-center gap-1 bg-[#0b1b30]/80 p-1 rounded-xl border border-cyan-900/50">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'dashboard'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-600/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('store')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'store'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-600/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Hero Store</span>
            <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-500/30 text-amber-300 font-bold border border-amber-400/40">HOT</span>
          </button>

          <button
            onClick={() => setActiveTab('enhance')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'enhance'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-600/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Enhance</span>
          </button>

          <button
            onClick={() => setActiveTab('wallet')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'wallet'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-600/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Wallet className="w-3.5 h-3.5" />
            <span>Payouts</span>
          </button>

          <button
            onClick={() => setActiveTab('invite')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'invite'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-600/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Affiliate</span>
          </button>
        </nav>

        {/* Right Section: Hourly Rate Pill, Balance, Phone Frame Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Hourly Rate Live Pill */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-rajdhani font-bold">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>₱{activeHourlyRate.toFixed(2)}/hr</span>
          </div>

          {/* Daily Login Rewards Button */}
          <button
            onClick={() => setActiveModal('dailyLogin')}
            className="relative p-2 rounded-xl bg-[#0e213b] border border-amber-500/40 text-amber-300 hover:text-white transition-all shadow-md group hover:bg-amber-950/40"
            title="Daily Login Rewards (Claim every 24h)"
          >
            <Gift className="w-4 h-4 text-amber-300 group-hover:scale-110 transition-transform" />
            {isDailyRewardReady && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-[#081220] animate-ping" />
            )}
          </button>

          {/* Balance Widget */}
          <div className="flex items-center gap-1.5 bg-[#0e213b] border border-cyan-700/50 rounded-xl px-2.5 sm:px-3 py-1 shadow-inner">
            <Coins className="w-4 h-4 text-amber-400" />
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block -mb-1 font-medium hidden sm:block">Balance</span>
              <span className="font-rajdhani font-bold text-sm sm:text-base text-amber-300">
                ₱{currentUser.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <button
              onClick={() => setActiveModal('topup')}
              className="ml-1 w-6 h-6 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/40 border border-cyan-400/40 flex items-center justify-center text-cyan-300 hover:text-white transition-colors"
              title="Top Up Wallet"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Phone Frame Toggle */}
          <button
            onClick={() => setIsPhoneFrame(!isPhoneFrame)}
            className={`p-2 rounded-xl border transition-all ${
              isPhoneFrame
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/20'
                : 'bg-slate-900/60 border-slate-700/60 text-slate-400 hover:text-slate-200'
            }`}
            title={isPhoneFrame ? 'Switch to Full Screen View' : 'Switch to Mobile Frame Preview'}
          >
            {isPhoneFrame ? <Smartphone className="w-4 h-4 text-cyan-400" /> : <Monitor className="w-4 h-4" />}
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-xl bg-slate-900/60 border border-slate-700/60 text-slate-400 hover:text-slate-200 transition-colors"
            title={soundEnabled ? 'Mute Sounds' : 'Enable Sounds'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
