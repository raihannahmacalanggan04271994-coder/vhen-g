import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Gift, X, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

export const GiftCodeModal: React.FC = () => {
  const { redeemGiftCode, activeModal, setActiveModal, giftCodes } = useApp();
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (activeModal !== 'giftcode') return null;

  const handleRedeem = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!code.trim()) return;

    const res = redeemGiftCode(code);
    if (res.success) {
      setActiveModal(null);
    } else {
      setError(res.message);
    }
  };

  const handleQuickFill = (c: string) => {
    setCode(c);
    setError(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-md rounded-3xl p-5 hero-glass-card border border-cyan-400/50 shadow-2xl relative">
        <button
          onClick={() => setActiveModal(null)}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-4">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-cyan-950/80 border border-cyan-400/50 flex items-center justify-center text-cyan-300 mb-2 shadow-lg shadow-cyan-500/20">
            <Gift className="w-6 h-6 text-amber-300" />
          </div>
          <h3 className="font-cinzel text-xl font-bold text-white tracking-wide">
            Redeem Gift Code
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Enter official promotional vouchers for instant wallet credits
          </p>
        </div>

        {/* Quick Promo Codes available to try */}
        <div className="mb-4">
          <div className="text-[11px] font-semibold text-slate-300 mb-1.5">
            Active Community Codes:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {giftCodes.filter((g) => g.active).map((g) => (
              <button
                key={g.code}
                type="button"
                onClick={() => handleQuickFill(g.code)}
                className="px-2.5 py-1 rounded-lg bg-slate-900 border border-cyan-700/50 hover:border-cyan-400 text-cyan-300 text-xs font-mono font-bold transition-colors flex items-center gap-1"
              >
                <span>{g.code}</span>
                <span className="text-[10px] text-amber-400 font-rajdhani">(₱{g.rewardAmount})</span>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleRedeem} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Summoner Code
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setError(null);
              }}
              placeholder="e.g. AVATAR100"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm font-mono uppercase tracking-wider text-white focus:border-cyan-400 focus:outline-none"
              autoFocus
              required
            />
            {error && (
              <div className="flex items-center gap-1.5 text-rose-400 text-xs mt-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{error}</span>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl hero-btn-gold text-xs font-bold text-white uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition-all"
          >
            <Sparkles className="w-4 h-4 text-amber-200" />
            <span>Redeem Bonus Credit</span>
          </button>
        </form>
      </div>
    </div>
  );
};
