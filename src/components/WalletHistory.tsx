import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Transaction } from '../types';
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  Sparkles,
  Zap,
  CheckCircle2,
  AlertCircle,
  FileText,
  Search,
  Filter,
  X,
  Copy,
} from 'lucide-react';

export const WalletHistory: React.FC = () => {
  const {
    currentUser,
    transactions,
    setActiveModal,
    addToast,
    selectedReceiptTx,
    setSelectedReceiptTx,
  } = useApp();

  const [filterType, setFilterType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const userTransactions = transactions.filter((t) => t.userId === currentUser.id);

  const filteredTransactions = userTransactions.filter((tx) => {
    if (filterType !== 'all' && tx.type !== filterType) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        tx.referenceNumber.toLowerCase().includes(q) ||
        (tx.note && tx.note.toLowerCase().includes(q)) ||
        (tx.method && tx.method.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const activeProcessingPayouts = userTransactions.filter(
    (t) => t.type === 'withdrawal' && t.status === 'processing'
  );

  return (
    <div className="space-y-4 max-w-xl mx-auto w-full pb-8">
      {/* Balance Summary Header */}
      <div className="rounded-3xl p-5 hero-glass-card border border-cyan-500/30 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-medium">Available Wallet Balance</span>
            <div className="text-3xl font-black text-white font-rajdhani mt-0.5 flex items-baseline gap-1">
              <span className="text-cyan-400">₱</span>
              <span>{currentUser.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveModal('topup')}
              className="py-2 px-3.5 rounded-xl hero-btn-primary text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5"
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>Top up</span>
            </button>
            <button
              onClick={() => setActiveModal('withdraw')}
              className="py-2 px-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5"
            >
              <ArrowDownLeft className="w-3.5 h-3.5" />
              <span>Withdraw</span>
            </button>
          </div>
        </div>

        {/* 3-metric mini card */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-cyan-900/40 text-center">
          <div className="bg-[#071322] p-2.5 rounded-xl border border-cyan-900/40">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Total Deposits</span>
            <span className="text-sm font-bold font-rajdhani text-slate-200">
              ₱{currentUser.totalDeposited.toLocaleString()}
            </span>
          </div>
          <div className="bg-[#071322] p-2.5 rounded-xl border border-cyan-900/40">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Total Paid Out</span>
            <span className="text-sm font-bold font-rajdhani text-emerald-400">
              ₱{currentUser.totalWithdrawn.toLocaleString()}
            </span>
          </div>
          <div className="bg-[#071322] p-2.5 rounded-xl border border-cyan-900/40">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Total Earnings</span>
            <span className="text-sm font-bold font-rajdhani text-amber-300">
              ₱{currentUser.totalEarnedAllTime.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Active Automated Payout Queue if any */}
      {activeProcessingPayouts.length > 0 && (
        <div className="rounded-2xl p-4 bg-gradient-to-r from-blue-950 via-cyan-950 to-blue-950 border border-cyan-400/50 shadow-lg animate-pulse-subtle">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
              <span className="font-bold text-xs text-cyan-200 uppercase tracking-wider">
                ⚡ Automated Payout Dispatched via Instapay
              </span>
            </div>
            <span className="text-[11px] font-bold text-cyan-300 font-mono">
              Processing...
            </span>
          </div>
          {activeProcessingPayouts.map((tx) => (
            <div key={tx.id} className="text-xs text-slate-300 bg-[#061224]/80 p-3 rounded-xl border border-cyan-800/40 space-y-1.5">
              <div className="flex justify-between font-bold">
                <span>{tx.method} ({tx.accountNumber}):</span>
                <span className="text-amber-300 font-rajdhani text-sm">₱{tx.amount.toLocaleString()}</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-400 animate-[pulse_1s_ease-in-out_infinite]" style={{ width: '85%' }} />
              </div>
              <p className="text-[10px] text-slate-400">
                Automated API gateway handshake underway. Funds will reflect in your {tx.method} wallet within seconds.
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Transaction Logs / History */}
      <div className="rounded-2xl p-4 hero-glass-card border border-cyan-500/25 shadow-lg space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-cyan-400" />
            <h3 className="font-cinzel text-xs font-bold text-slate-200 uppercase tracking-wider">
              Transaction Logs ({userTransactions.length})
            </h3>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {[
            { id: 'all', label: 'All Logs' },
            { id: 'withdrawal', label: 'Payouts' },
            { id: 'deposit', label: 'Deposits' },
            { id: 'hourly_claim', label: 'Hourly Claims' },
            { id: 'plan_purchase', label: 'Heroes' },
            { id: 'gift_code', label: 'Codes' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilterType(f.id)}
              className={`px-3 py-1 rounded-lg font-semibold shrink-0 transition-all ${
                filterType === f.id
                  ? 'bg-cyan-500/20 border border-cyan-400 text-cyan-200'
                  : 'bg-slate-900 border border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Transaction Items */}
        {filteredTransactions.length > 0 ? (
          <div className="space-y-2">
            {filteredTransactions.map((tx) => {
              const isPositive = tx.type === 'deposit' || tx.type === 'hourly_claim' || tx.type === 'gift_code' || tx.type === 'referral_bonus';
              return (
                <div
                  key={tx.id}
                  onClick={() => setSelectedReceiptTx(tx)}
                  className="p-3 rounded-xl bg-[#09172c]/70 border border-cyan-900/40 hover:border-cyan-500/40 transition-colors cursor-pointer flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                        tx.type === 'withdrawal'
                          ? 'bg-rose-950/60 text-rose-400 border border-rose-500/30'
                          : tx.type === 'deposit'
                          ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30'
                          : tx.type === 'hourly_claim'
                          ? 'bg-cyan-950/60 text-cyan-400 border border-cyan-500/30'
                          : 'bg-amber-950/60 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {tx.type === 'withdrawal' ? (
                        <ArrowDownLeft className="w-4 h-4" />
                      ) : tx.type === 'deposit' ? (
                        <ArrowUpRight className="w-4 h-4" />
                      ) : tx.type === 'hourly_claim' ? (
                        <Sparkles className="w-4 h-4" />
                      ) : (
                        <Zap className="w-4 h-4" />
                      )}
                    </div>

                    <div>
                      <div className="text-xs font-bold text-white capitalize flex items-center gap-1.5">
                        <span>{tx.type.replace('_', ' ')}</span>
                        {tx.isAutomatedPayout && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-mono">
                            ⚡ AUTO
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate max-w-[180px]">
                        {tx.note || tx.referenceNumber}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div
                      className={`text-sm font-bold font-rajdhani ${
                        isPositive ? 'text-emerald-400' : 'text-slate-100'
                      }`}
                    >
                      {isPositive ? '+' : '-'}₱{tx.amount.toFixed(2)}
                    </div>
                    <span
                      className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                        tx.status === 'completed'
                          ? 'text-emerald-300 bg-emerald-950/80 border border-emerald-500/40'
                          : tx.status === 'processing'
                          ? 'text-cyan-300 bg-cyan-950/80 border border-cyan-500/40'
                          : tx.status === 'pending'
                          ? 'text-amber-300 bg-amber-950/80 border border-amber-500/40'
                          : 'text-rose-300 bg-rose-950/80 border border-rose-500/40'
                      }`}
                    >
                      {tx.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-6 text-xs text-slate-400">
            No transactions found for this filter.
          </div>
        )}
      </div>

      {/* Full Transaction Receipt Modal */}
      {selectedReceiptTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm rounded-3xl p-5 hero-glass-card border border-cyan-400/50 shadow-2xl relative">
            <button
              onClick={() => setSelectedReceiptTx(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center pb-3 border-b border-cyan-900/60">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-cyan-950 border border-cyan-400/50 flex items-center justify-center text-cyan-300 mb-2">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="font-cinzel text-base font-bold text-white">
                Official Transaction Slip
              </h3>
              <p className="text-[11px] text-slate-400">
                Avatar Legends Platform Gateway
              </p>
            </div>

            <div className="py-4 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Transaction ID:</span>
                <span className="font-mono text-slate-200">{selectedReceiptTx.id}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Reference No:</span>
                <span className="font-mono text-cyan-300 font-bold">{selectedReceiptTx.referenceNumber}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Category:</span>
                <span className="capitalize font-bold text-white">{selectedReceiptTx.type.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Amount:</span>
                <span className="font-bold font-rajdhani text-base text-amber-300">₱{selectedReceiptTx.amount.toFixed(2)}</span>
              </div>
              {selectedReceiptTx.method && (
                <div className="flex justify-between text-slate-400">
                  <span>Channel:</span>
                  <span className="font-semibold text-slate-200">{selectedReceiptTx.method}</span>
                </div>
              )}
              {selectedReceiptTx.accountNumber && (
                <div className="flex justify-between text-slate-400">
                  <span>Target Account:</span>
                  <span className="font-mono text-slate-200">{selectedReceiptTx.accountNumber}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-400">
                <span>Status:</span>
                <span className="font-bold uppercase text-emerald-400">{selectedReceiptTx.status}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Date & Time:</span>
                <span className="text-slate-300">{new Date(selectedReceiptTx.timestamp).toLocaleString()}</span>
              </div>
              {selectedReceiptTx.note && (
                <div className="pt-2 border-t border-cyan-900/40 text-[11px] text-slate-300">
                  <span className="text-slate-400 block mb-0.5">Note:</span>
                  {selectedReceiptTx.note}
                </div>
              )}
            </div>

            <button
              onClick={() => setSelectedReceiptTx(null)}
              className="w-full py-2.5 rounded-xl hero-btn-primary text-xs font-bold text-white uppercase tracking-wider"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
