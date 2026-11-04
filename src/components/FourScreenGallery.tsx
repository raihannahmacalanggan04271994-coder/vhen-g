import React from 'react';
import { useApp } from '../context/AppContext';
import { HeroDashboard } from './HeroDashboard';
import { HeroStore } from './HeroStore';
import { SkinUpgradeModal } from './SkinUpgradeModal';
import { Eye, EyeOff } from 'lucide-react';

export const FourScreenGallery: React.FC = () => {
  const { setActiveTab } = useApp();
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="w-full py-6 space-y-6">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="font-cinzel text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-amber-200 to-cyan-300 hero-glow-cyan">
          Avatar Legends 4-Screen Mockup View
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Exact side-by-side interactive reproduction matching your reference design concept
        </p>
      </div>

      {/* 4 Phones Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-start justify-items-center">
        {/* PHONE 1: LOGIN / SIGN UP */}
        <div className="flex flex-col items-center w-full max-w-[320px]">
          <div className="text-center font-bold text-xs uppercase tracking-widest text-slate-300 mb-2">
            1. LOGIN / SIGN UP
          </div>
          <div className="relative w-full h-[620px] rounded-[44px] p-3 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-950 shadow-2xl border-2 border-slate-700/60 flex flex-col justify-between overflow-hidden">
            {/* Notch */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full z-40" />

            <div className="relative flex-1 bg-[#071324] rounded-[34px] p-4 flex flex-col justify-center overflow-y-auto">
              <div className="text-center mb-6">
                <div className="font-cinzel text-xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-blue-100 to-amber-200 hero-glow-cyan">
                  Avatar
                </div>
                <div className="font-cinzel text-xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-blue-100 to-amber-200 hero-glow-cyan -mt-1">
                  Legends
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Phone number
                  </label>
                  <div className="flex items-center rounded-xl bg-slate-900 border border-slate-700 overflow-hidden text-xs">
                    <span className="px-2.5 py-2 text-slate-400 font-mono border-r border-slate-700 bg-slate-950/40">
                      +63
                    </span>
                    <input
                      type="text"
                      readOnly
                      value="917 888 9999"
                      className="w-full px-2.5 py-2 bg-transparent text-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Password
                  </label>
                  <div className="relative flex items-center rounded-xl bg-slate-900 border border-slate-700 text-xs">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      readOnly
                      value="password123"
                      className="w-full px-3 py-2 bg-transparent text-white pr-8"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2.5 text-slate-400"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-300">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-3 h-3 rounded" />
                    <span>Remember me</span>
                  </label>
                  <span className="text-cyan-400 cursor-pointer">Forgot?</span>
                </div>

                <button
                  onClick={() => {
                    setActiveTab('dashboard');
                  }}
                  className="w-full py-2.5 rounded-xl hero-btn-primary text-xs font-bold text-white uppercase tracking-wider mt-2"
                >
                  Log in
                </button>
              </div>

              <div className="text-center mt-6 text-[10px] text-slate-400">
                Don't have an account? <span className="text-cyan-400 font-bold">Sign up</span>
              </div>
            </div>

            <div className="py-0.5 flex justify-center">
              <div className="w-24 h-1 bg-slate-600 rounded-full" />
            </div>
          </div>
        </div>

        {/* PHONE 2: HERO DASHBOARD */}
        <div className="flex flex-col items-center w-full max-w-[320px]">
          <div className="text-center font-bold text-xs uppercase tracking-widest text-slate-300 mb-2">
            2. HERO DASHBOARD
          </div>
          <div className="relative w-full h-[620px] rounded-[44px] p-3 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-950 shadow-2xl border-2 border-slate-700/60 flex flex-col justify-between overflow-hidden">
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full z-40" />

            <div className="relative flex-1 bg-[#071324] rounded-[34px] p-3 pt-6 overflow-y-auto">
              <HeroDashboard />
            </div>

            <div className="py-0.5 flex justify-center">
              <div className="w-24 h-1 bg-slate-600 rounded-full" />
            </div>
          </div>
        </div>

        {/* PHONE 3: HERO STORE */}
        <div className="flex flex-col items-center w-full max-w-[320px]">
          <div className="text-center font-bold text-xs uppercase tracking-widest text-slate-300 mb-2">
            3. HERO STORE
          </div>
          <div className="relative w-full h-[620px] rounded-[44px] p-3 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-950 shadow-2xl border-2 border-slate-700/60 flex flex-col justify-between overflow-hidden">
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full z-40" />

            <div className="relative flex-1 bg-[#071324] rounded-[34px] p-3 pt-6 overflow-y-auto">
              <HeroStore />
            </div>

            <div className="py-0.5 flex justify-center">
              <div className="w-24 h-1 bg-slate-600 rounded-full" />
            </div>
          </div>
        </div>

        {/* PHONE 4: SKIN UPGRADE MODAL */}
        <div className="flex flex-col items-center w-full max-w-[320px]">
          <div className="text-center font-bold text-xs uppercase tracking-widest text-slate-300 mb-2">
            4. SKIN UPGRADE MODAL
          </div>
          <div className="relative w-full h-[620px] rounded-[44px] p-3 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-950 shadow-2xl border-2 border-slate-700/60 flex flex-col justify-between overflow-hidden">
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full z-40" />

            <div className="relative flex-1 bg-[#071324] rounded-[34px] p-3 pt-6 overflow-y-auto">
              <SkinUpgradeModal />
            </div>

            <div className="py-0.5 flex justify-center">
              <div className="w-24 h-1 bg-slate-600 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
