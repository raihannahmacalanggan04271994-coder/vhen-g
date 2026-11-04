import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Eye, EyeOff, Shield, X, UserCheck, KeyRound, Sparkles } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { activeModal, setActiveModal, addToast } = useApp();
  const [isSignUp, setIsSignUp] = useState(false);
  const [phone, setPhone] = useState('9178889999');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  if (activeModal !== 'auth') return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !password) return;

    setActiveModal(null);
    addToast('success', isSignUp ? 'Account Registered!' : 'Welcome Back!', 'Logged in as Summoner Juan.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-sm rounded-3xl p-6 hero-glass-card border border-cyan-400/40 shadow-2xl relative">
        <button
          onClick={() => setActiveModal(null)}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header matching Phone 1 */}
        <div className="text-center pt-2 pb-5">
          <div className="font-cinzel text-2xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-blue-100 to-amber-200 hero-glow-cyan">
            Avatar
          </div>
          <div className="font-cinzel text-2xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-blue-100 to-amber-200 hero-glow-cyan -mt-1">
            Legends
          </div>
          <p className="text-[11px] text-cyan-400/80 mt-1 uppercase tracking-widest font-semibold">
            {isSignUp ? 'Create Summoner Account' : 'Summoner Gateway'}
          </p>
        </div>

        {/* Quick Demo Fill Button */}
        <div className="mb-4 p-2 rounded-xl bg-[#071322] border border-cyan-900/60 flex items-center justify-between text-xs">
          <span className="text-[11px] text-slate-400 pl-1">Demo Account:</span>
          <button
            type="button"
            onClick={() => {
              setPhone('9178889999');
              setPassword('password123');
              setActiveModal(null);
              addToast('info', 'Logged In', 'Welcome Summoner Juan! Your Gusion is earning ₱1.25/hr.');
            }}
            className="py-1 px-3 rounded-lg bg-cyan-950/80 border border-cyan-500/40 text-cyan-200 text-xs font-bold hover:bg-cyan-900/80 flex items-center gap-1"
          >
            <Sparkles className="w-3 h-3 text-cyan-300" />
            <span>Quick Login (Juan)</span>
          </button>
        </div>

        {/* Form matching Phone 1 */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Phone number
            </label>
            <div className="flex items-center rounded-xl bg-slate-900 border border-slate-700 focus-within:border-cyan-400 overflow-hidden">
              <span className="px-3 py-2.5 text-xs text-slate-400 font-mono border-r border-slate-700 bg-slate-950/50">
                +63
              </span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="9XX XXX XXXX"
                className="w-full px-3 py-2.5 bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none font-mono"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Password
            </label>
            <div className="relative flex items-center rounded-xl bg-slate-900 border border-slate-700 focus-within:border-cyan-400">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-3.5 py-2.5 bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-slate-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-slate-300 select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-slate-600 bg-slate-900 text-cyan-500 focus:ring-0 focus:ring-offset-0"
              />
              <span>Remember me</span>
            </label>
            <button
              type="button"
              onClick={() => addToast('info', 'Password Reset', 'A reset SMS code has been sent to your phone.')}
              className="text-cyan-400 hover:text-cyan-300"
            >
              Forgot password?
            </button>
          </div>

          {/* Log In Button matching phone 1 */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl hero-btn-primary text-xs font-bold text-white uppercase tracking-wider shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all"
          >
            {isSignUp ? 'Create Account' : 'Log in'}
          </button>
        </form>

        <div className="text-center mt-5 text-xs text-slate-400">
          <span>{isSignUp ? 'Already have an account? ' : "Don't have an account? "}</span>
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-cyan-400 hover:text-cyan-300 font-bold"
          >
            {isSignUp ? 'Log in' : 'Sign up'}
          </button>
        </div>
      </div>
    </div>
  );
};
