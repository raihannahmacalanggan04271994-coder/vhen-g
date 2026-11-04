import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4">
      {toasts.map((toast) => {
        let bg = 'bg-slate-900/95 border-cyan-500/40 text-cyan-200';
        let Icon = Info;
        if (toast.type === 'success') {
          bg = 'bg-emerald-950/95 border-emerald-500/50 text-emerald-200';
          Icon = CheckCircle2;
        } else if (toast.type === 'warning') {
          bg = 'bg-amber-950/95 border-amber-500/50 text-amber-200';
          Icon = AlertTriangle;
        } else if (toast.type === 'error') {
          bg = 'bg-rose-950/95 border-rose-500/50 text-rose-200';
          Icon = AlertCircle;
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border shadow-xl backdrop-blur-md ${bg} transition-all duration-300 animate-in fade-in slide-in-from-bottom-2`}
          >
            <Icon className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold tracking-wide uppercase text-white/90">{toast.title}</h4>
              <p className="text-xs text-white/80 mt-0.5 leading-relaxed break-words">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-white/50 hover:text-white transition-colors p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
