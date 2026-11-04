import React from 'react';
import { useApp } from '../context/AppContext';
import { Users, X, Copy, Share2, Award, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export const InviteModal: React.FC = () => {
  const { currentUser, activeModal, setActiveModal, addToast } = useApp();

  if (activeModal !== 'invite') return null;

  const referralUrl = `https://avatar-legends.invest/join?ref=${currentUser.referralCode}`;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    addToast('success', 'Copied!', `${label} copied to clipboard.`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-md rounded-3xl p-5 hero-glass-card border border-cyan-400/50 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => setActiveModal(null)}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-4">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-cyan-950/80 border border-cyan-400/50 flex items-center justify-center text-cyan-300 mb-2 shadow-lg shadow-cyan-500/20">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="font-cinzel text-xl font-bold text-white tracking-wide">
            Summoner Affiliate Guild
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Earn instant multi-tier commissions from your team's hero summons
          </p>
        </div>

        {/* Stats card */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="rounded-2xl p-3 bg-[#071322] border border-cyan-900/60 text-center">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Total Recruits</span>
            <span className="text-2xl font-bold font-rajdhani text-cyan-300">
              {currentUser.referralCount} Summoners
            </span>
          </div>

          <div className="rounded-2xl p-3 bg-[#071322] border border-cyan-900/60 text-center">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Commission Earned</span>
            <span className="text-2xl font-bold font-rajdhani text-amber-300">
              ₱{currentUser.referralEarnings.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Code & Link Box */}
        <div className="space-y-3 mb-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Your Exclusive Referral Code:
            </label>
            <div className="flex items-center gap-2">
              <div className="flex-1 py-2.5 px-3.5 rounded-xl bg-slate-900 border border-cyan-800/60 font-mono font-bold text-amber-300 text-base tracking-widest text-center">
                {currentUser.referralCode}
              </div>
              <button
                onClick={() => copyToClipboard(currentUser.referralCode, 'Referral Code')}
                className="px-4 py-2.5 rounded-xl hero-btn-primary text-xs font-bold text-white flex items-center gap-1.5"
              >
                <Copy className="w-4 h-4" />
                <span>Copy</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Direct Referral Link:
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={referralUrl}
                className="flex-1 py-2 px-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-400 font-mono truncate"
              />
              <button
                onClick={() => copyToClipboard(referralUrl, 'Referral Link')}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 3-Tier Commission Structure */}
        <div className="bg-[#071322] rounded-2xl p-3.5 border border-cyan-900/60 space-y-2">
          <div className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-400" />
            <span>3-Tier Guild Commission Rewards</span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
            <div className="p-2 rounded-xl bg-cyan-950/40 border border-cyan-500/30">
              <span className="text-[10px] text-slate-400 block">Tier 1 Direct</span>
              <span className="text-sm font-bold text-cyan-300 font-rajdhani">10% Instant</span>
            </div>
            <div className="p-2 rounded-xl bg-blue-950/40 border border-blue-500/30">
              <span className="text-[10px] text-slate-400 block">Tier 2 Sub</span>
              <span className="text-sm font-bold text-blue-300 font-rajdhani">5% Bonus</span>
            </div>
            <div className="p-2 rounded-xl bg-indigo-950/40 border border-indigo-500/30">
              <span className="text-[10px] text-slate-400 block">Tier 3 Guild</span>
              <span className="text-sm font-bold text-indigo-300 font-rajdhani">2% Passive</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
