import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  ArrowDownLeft,
  Zap,
  ShieldCheck,
  Clock,
  AlertCircle,
  Coins,
  CheckCircle2,
} from 'lucide-react';

export const WithdrawModal: React.FC = () => {
  const {
    currentUser,
    requestWithdrawal,
    activeModal,
    setActiveModal,
    adminSettings,
    addToast,
  } = useApp();

  const [method, setMethod] = useState<'GCash' | 'Maya' | 'BDO' | 'BPI' | 'UnionBank'>('GCash');
  const [accountNumber, setAccountNumber] = useState(currentUser.phone || '09178889999');
  const [accountName, setAccountName] = useState(currentUser.name || 'Summoner Juan');
  const [amount, setAmount] = useState<string>('100');

  if (activeModal !== 'withdraw') return null;

  const quickAmounts = [100, 300, 500, 1000, 2500, 5000];

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseFloat(amount);
    if (isNaN(num) || num <= 0) {
      addToast('error', 'Invalid Amount', 'Please enter a valid withdrawal amount.');
      return;
    }

    if (!accountNumber.trim() || !accountName.trim()) {
      addToast('error', 'Missing Information', 'Please complete your account number and name.');
      return;
    }

    const res = requestWithdrawal({
      amount: num,
      method,
      accountNumber,
      accountName,
    });

    if (res.success) {
      setActiveModal(null);
    }
  };

  const handleSetMax = () => {
    setAmount(currentUser.balance.toFixed(2));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-md rounded-3xl p-5 hero-glass-card border border-cyan-400/50 shadow-2xl relative max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={() => setActiveModal(null)}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="text-center mb-4">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-cyan-950/80 border border-cyan-400/50 flex items-center justify-center text-cyan-300 mb-2 shadow-lg shadow-cyan-500/20">
            <ArrowDownLeft className="w-6 h-6" />
          </div>
          <h3 className="font-cinzel text-xl font-bold text-white tracking-wide">
            Automated Payout System
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Instant automated disbursement via GCash & Maya Instapay
          </p>
        </div>

        {/* Automated System Status Banner */}
        <div className="mb-4 rounded-2xl p-3 bg-gradient-to-r from-cyan-950/90 to-blue-950/90 border border-cyan-500/40 text-xs">
          <div className="flex items-center justify-between font-semibold text-cyan-200">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>⚡ Automated Payout Engine:</span>
            </div>
            <span className="text-emerald-400 font-bold uppercase text-[10px] tracking-wider px-2 py-0.5 rounded-md bg-emerald-950 border border-emerald-500/40">
              Active (24/7)
            </span>
          </div>
          <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
            Requests under ₱{adminSettings.autoPayoutMaxAmount.toLocaleString()} are automatically verified and dispatched directly to your account in ~{adminSettings.autoPayoutDelaySeconds} seconds.
          </p>
        </div>

        {/* Available Balance Preview */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-[#071322] border border-cyan-900/60 mb-4">
          <div className="flex items-center gap-2">
            <Coins className="w-4 h-4 text-amber-400" />
            <span className="text-xs text-slate-400">Available to Withdraw:</span>
          </div>
          <div className="text-right">
            <span className="font-rajdhani font-bold text-base text-amber-300">
              ₱{currentUser.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        {/* Channel Selection */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {(['GCash', 'Maya', 'BDO'] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMethod(m)}
              className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                method === m
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900/60 border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleWithdraw} className="space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              {method} Registered Mobile / Account No.
            </label>
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="e.g. 09171234567"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm font-mono text-white focus:border-cyan-400 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Account Holder Full Name
            </label>
            <input
              type="text"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              placeholder="e.g. Juan Dela Cruz"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:border-cyan-400 focus:outline-none"
              required
            />
          </div>

          {/* Quick Amounts */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Amount to Cashout (PHP ₱)
              </label>
              <button
                type="button"
                onClick={handleSetMax}
                className="text-[11px] font-bold text-cyan-400 hover:text-cyan-300"
              >
                Max Balance
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-2">
              {quickAmounts.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => setAmount(q.toString())}
                  className={`py-1.5 rounded-lg text-xs font-bold font-rajdhani border transition-all ${
                    amount === q.toString()
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                      : 'bg-slate-900/60 border-slate-700 text-slate-300 hover:border-slate-500'
                  }`}
                >
                  ₱{q.toLocaleString()}
                </button>
              ))}
            </div>

            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₱</span>
              <input
                type="number"
                min={adminSettings.minWithdrawal}
                max={adminSettings.maxWithdrawal}
                step="any"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-rajdhani font-bold text-base focus:border-cyan-400 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Fee & Summary */}
          <div className="bg-[#071322] rounded-xl p-3 border border-cyan-900/40 text-xs space-y-1">
            <div className="flex justify-between text-slate-400">
              <span>Transfer Fee:</span>
              <span className="text-emerald-400 font-bold">FREE (₱0.00)</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Min / Max Payout:</span>
              <span>₱{adminSettings.minWithdrawal} - ₱{adminSettings.maxWithdrawal.toLocaleString()}</span>
            </div>
            <div className="pt-1.5 border-t border-cyan-900/40 flex justify-between font-bold text-white text-sm">
              <span>Net Payout to Receive:</span>
              <span className="text-cyan-300 font-rajdhani">
                ₱{parseFloat(amount || '0').toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl hero-btn-primary text-xs font-bold text-white uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition-all"
          >
            <Zap className="w-4 h-4 text-amber-300" />
            <span>Dispatch Automated Payout</span>
          </button>
        </form>
      </div>
    </div>
  );
};
