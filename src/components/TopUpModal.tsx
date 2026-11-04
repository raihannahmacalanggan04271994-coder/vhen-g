import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  CreditCard,
  QrCode,
  CheckCircle2,
  Copy,
  Zap,
  ArrowRight,
} from 'lucide-react';

export const TopUpModal: React.FC = () => {
  const { topUpBalance, activeModal, setActiveModal, addToast } = useApp();
  const [selectedMethod, setSelectedMethod] = useState<'GCash' | 'Maya' | 'BDO' | 'BPI' | 'UnionBank'>('GCash');
  const [amount, setAmount] = useState<string>('300');
  const [refNumber, setRefNumber] = useState<string>('');

  if (activeModal !== 'topup') return null;

  const presets = [100, 300, 500, 800, 1500, 2500, 5000, 9500];

  const handleTopUp = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseFloat(amount);
    if (isNaN(num) || num <= 0) {
      addToast('error', 'Invalid Amount', 'Please enter a valid top-up amount.');
      return;
    }

    const generatedRef = refNumber.trim() || `MP-${selectedMethod.toUpperCase()}-${Math.floor(10000000 + Math.random() * 90000000)}`;
    const res = topUpBalance({
      amount: num,
      method: selectedMethod,
      referenceNumber: generatedRef,
    });

    if (res.success) {
      setActiveModal(null);
    }
  };

  const copyNumber = (text: string) => {
    navigator.clipboard.writeText(text);
    addToast('info', 'Copied to Clipboard', text);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-md rounded-3xl p-5 hero-glass-card border border-cyan-400/50 shadow-2xl relative max-h-[90vh] overflow-y-auto">
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
            <QrCode className="w-6 h-6" />
          </div>
          <h3 className="font-cinzel text-xl font-bold text-white tracking-wide">
            Top Up Wallet
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Instant deposit via Philippine E-Wallets & Instapay
          </p>
        </div>

        {/* Payment Channel Selection */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {(['GCash', 'Maya', 'BDO'] as const).map((method) => (
            <button
              key={method}
              type="button"
              onClick={() => setSelectedMethod(method)}
              className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                selectedMethod === method
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900/60 border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
            >
              {method}
            </button>
          ))}
        </div>

        {/* Merchant Info Box */}
        <div className="bg-[#071322] rounded-2xl p-3.5 border border-cyan-900/60 mb-4 text-xs space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span>Official Merchant:</span>
            <span className="font-bold text-slate-200">AVATAR LEGENDS PH INC.</span>
          </div>
          <div className="flex justify-between items-center text-slate-400">
            <span>{selectedMethod} Mobile / Acct:</span>
            <div className="flex items-center gap-1.5 font-mono text-cyan-300 font-bold">
              <span>0917-889-4455</span>
              <button
                type="button"
                onClick={() => copyNumber('09178894455')}
                className="text-slate-400 hover:text-white"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center text-slate-400">
            <span>Processing Speed:</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <Zap className="w-3 h-3" /> Instant Crediting
            </span>
          </div>
        </div>

        {/* Preset Amounts */}
        <div className="mb-4">
          <label className="block text-xs font-semibold text-slate-300 mb-2">
            Select Amount (PHP ₱)
          </label>
          <div className="grid grid-cols-4 gap-2">
            {presets.map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => setAmount(val.toString())}
                className={`py-2 rounded-xl text-xs font-bold font-rajdhani transition-all border ${
                  amount === val.toString()
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-md shadow-amber-500/20'
                    : 'bg-slate-900/70 border-slate-700/80 text-slate-300 hover:border-slate-500'
                }`}
              >
                ₱{val.toLocaleString()}
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleTopUp} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Custom Amount (₱)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₱</span>
              <input
                type="number"
                min="50"
                step="1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-rajdhani font-bold text-base focus:border-cyan-400 focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Reference / Ref No. (Optional for Demo)
            </label>
            <input
              type="text"
              value={refNumber}
              onChange={(e) => setRefNumber(e.target.value)}
              placeholder="e.g. 102938475"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
            />
          </div>

          {/* Instant Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl hero-btn-primary text-xs font-bold text-white uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition-all"
          >
            <Zap className="w-4 h-4 text-amber-300" />
            <span>Confirm & Deposit ₱{parseFloat(amount || '0').toLocaleString()}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
