import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Shield,
  ShoppingBag,
  Sparkles,
  Wallet,
  Users,
} from 'lucide-react';

interface PhoneContainerProps {
  children: React.ReactNode;
}

export const PhoneContainer: React.FC<PhoneContainerProps> = ({ children }) => {
  const { isPhoneFrame, activeTab, setActiveTab } = useApp();

  const bottomNavItems = [
    { id: 'dashboard', label: 'Hero', icon: Shield },
    { id: 'store', label: 'Store', icon: ShoppingBag, badge: 'HOT' },
    { id: 'enhance', label: 'Enhance', icon: Sparkles },
    { id: 'wallet', label: 'Payout', icon: Wallet },
    { id: 'invite', label: 'Invite', icon: Users },
  ];

  if (!isPhoneFrame) {
    return (
      <div className="min-h-[calc(100vh-64px)] w-full flex flex-col justify-between">
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-5">
          {children}
        </main>

        {/* Mobile sticky bottom bar on real phones (hidden on desktop) */}
        <div className="md:hidden sticky bottom-0 z-40 bg-[#081220]/95 backdrop-blur-lg border-t border-cyan-900/60 py-2 px-3 flex items-center justify-around shadow-2xl">
          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`flex flex-col items-center gap-1 transition-all ${
                  isActive ? 'text-cyan-400 scale-105' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="relative">
                  <Icon className="w-5 h-5" />
                  {item.badge && (
                    <span className="absolute -top-1 -right-2 text-[8px] px-1 bg-amber-500 text-black font-extrabold rounded-full">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-bold tracking-tight">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Authentic Mobile Device Mockup Frame (matching the uploaded screenshot style)
  return (
    <div className="min-h-[calc(100vh-64px)] w-full flex items-center justify-center p-3 sm:p-6 bg-gradient-to-b from-[#03070f] via-[#050c18] to-[#02050a]">
      <div className="relative w-full max-w-[420px] rounded-[52px] p-3.5 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-950 shadow-[0_25px_70px_rgba(0,0,0,0.8),0_0_40px_rgba(6,182,212,0.15)] border-4 border-slate-700/60">
        {/* Dynamic Island / Notch */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-50 flex items-center justify-between px-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#111] border border-slate-800" />
          <div className="w-2 h-2 rounded-full bg-cyan-950 border border-cyan-500/40" />
        </div>

        {/* Screen Bezel & Inner display */}
        <div className="relative w-full h-[760px] rounded-[42px] overflow-hidden bg-[#071324] border border-cyan-900/40 flex flex-col justify-between">
          {/* Subtle fantasy background wallpaper */}
          <div
            className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-20"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80')`,
            }}
          />

          {/* Screen Content Scrollable area */}
          <div className="relative flex-1 overflow-y-auto px-3.5 pt-12 pb-4">
            {children}
          </div>

          {/* Phone Bottom Navigation Bar */}
          <div className="relative z-40 bg-[#081220]/95 backdrop-blur-md border-t border-cyan-900/60 py-2.5 px-3 flex items-center justify-around shadow-2xl">
            {bottomNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`flex flex-col items-center gap-1 transition-all ${
                    isActive ? 'text-cyan-400 scale-105' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="relative">
                    <Icon className="w-5 h-5" />
                    {item.badge && (
                      <span className="absolute -top-1 -right-2 text-[8px] px-1 bg-amber-500 text-black font-extrabold rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-bold tracking-tight">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* iPhone Home Indicator bar */}
          <div className="relative py-1 bg-[#081220] flex items-center justify-center">
            <div className="w-32 h-1 bg-slate-600 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
