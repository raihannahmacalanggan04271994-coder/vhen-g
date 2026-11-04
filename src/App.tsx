import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HeroDashboard } from './components/HeroDashboard';
import { HeroStore } from './components/HeroStore';
import { SkinUpgradeModal } from './components/SkinUpgradeModal';
import { WalletHistory } from './components/WalletHistory';
import { PhoneContainer } from './components/PhoneContainer';
import { FourScreenGallery } from './components/FourScreenGallery';
import { TopUpModal } from './components/TopUpModal';
import { WithdrawModal } from './components/WithdrawModal';
import { GiftCodeModal } from './components/GiftCodeModal';
import { InviteModal } from './components/InviteModal';
import { AuthModal } from './components/AuthModal';
import { DailyLoginModal } from './components/DailyLoginModal';
import { ToastContainer } from './components/ToastContainer';
import {
  Smartphone,
  LayoutGrid,
  Monitor,
  LogIn,
  Users,
} from 'lucide-react';

const AppContent: React.FC = () => {
  const {
    activeTab,
    isPhoneFrame,
    setIsPhoneFrame,
    setActiveModal,
  } = useApp();

  const [galleryMode, setGalleryMode] = useState(false);

  return (
    <div className="min-h-screen bg-[#040912] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-black">
      {/* Top Main Navigation Bar */}
      <Navbar />

      {/* View Mode Switcher Header Toolbar */}
      <div className="bg-[#060e1b] border-b border-cyan-950/60 py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium hidden sm:inline">Display Layout:</span>
            <div className="flex items-center gap-1 bg-[#09172c] p-1 rounded-xl border border-cyan-900/60">
              <button
                onClick={() => {
                  setGalleryMode(false);
                  setIsPhoneFrame(false);
                }}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-semibold transition-all ${
                  !galleryMode && !isPhoneFrame
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Responsive Web</span>
              </button>

              <button
                onClick={() => {
                  setGalleryMode(false);
                  setIsPhoneFrame(true);
                }}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-semibold transition-all ${
                  !galleryMode && isPhoneFrame
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile Frame</span>
              </button>

              <button
                onClick={() => setGalleryMode(true)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-semibold transition-all ${
                  galleryMode
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>4-Phone Concept</span>
                <span className="text-[9px] px-1 bg-amber-500/30 text-amber-300 rounded font-bold">Mockup</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveModal('auth')}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 border border-cyan-800/50 text-cyan-300 hover:text-white transition-colors"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Login</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Display Body */}
      {galleryMode ? (
        <div className="flex-1 max-w-7xl mx-auto px-4 w-full">
          <FourScreenGallery />
        </div>
      ) : (
        <PhoneContainer>
          {activeTab === 'dashboard' && <HeroDashboard />}
          {activeTab === 'store' && <HeroStore />}
          {activeTab === 'enhance' && <SkinUpgradeModal />}
          {activeTab === 'wallet' && <WalletHistory />}
          {activeTab === 'invite' && (
            <div className="max-w-xl mx-auto">
              <div className="p-5 hero-glass-card rounded-3xl border border-cyan-500/30 text-center mb-4">
                <Users className="w-10 h-10 text-cyan-300 mx-auto mb-2" />
                <h2 className="font-cinzel text-xl font-bold text-white">Guild Affiliate Headquarters</h2>
                <p className="text-xs text-slate-400 mt-1 mb-4">
                  Invite your friends to Avatar Legends and earn 10% direct commissions on every hero summoned!
                </p>
                <button
                  onClick={() => setActiveModal('invite')}
                  className="px-6 py-2.5 rounded-xl hero-btn-primary text-xs font-bold text-white uppercase tracking-wider"
                >
                  Open Invite Center
                </button>
              </div>
            </div>
          )}
        </PhoneContainer>
      )}

      {/* Interactive Modal Overlays */}
      <TopUpModal />
      <WithdrawModal />
      <GiftCodeModal />
      <DailyLoginModal />
      <InviteModal />
      <AuthModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
