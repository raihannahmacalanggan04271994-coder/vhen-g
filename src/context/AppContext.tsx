import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  UserProfile,
  HeroPlan,
  UserHeroInvestment,
  SkinUpgrade,
  Transaction,
  AdminSettings,
  GiftCode,
} from '../types';
import {
  INITIAL_HERO_PLANS,
  INITIAL_SKIN_UPGRADES,
  DEFAULT_USER,
  INITIAL_ADMIN_SETTINGS,
  INITIAL_GIFT_CODES,
  INITIAL_TRANSACTIONS,
} from '../data/mockData';
import { sound } from '../utils/sound';

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: number;
}

export type AppTab = 'dashboard' | 'store' | 'enhance' | 'wallet' | 'invite';

export interface DailyRewardTier {
  day: number;
  amount: number;
  bonusTitle: string;
  icon: string;
}

export const DAILY_REWARD_TIERS: DailyRewardTier[] = [
  { day: 1, amount: 25, bonusTitle: 'Novice Bonus', icon: 'coin' },
  { day: 2, amount: 40, bonusTitle: 'Apprentice Boost', icon: 'shard' },
  { day: 3, amount: 60, bonusTitle: 'Warrior Rune', icon: 'rune' },
  { day: 4, amount: 85, bonusTitle: 'Mastery Gem', icon: 'gem' },
  { day: 5, amount: 120, bonusTitle: 'Grandmaster Orb', icon: 'orb' },
  { day: 6, amount: 180, bonusTitle: 'Epic Relic', icon: 'relic' },
  { day: 7, amount: 350, bonusTitle: 'Mythic Jackpot! (+5 Mastery)', icon: 'jackpot' },
];

interface AppContextType {
  currentUser: UserProfile;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  
  heroPlans: HeroPlan[];
  setHeroPlans: React.Dispatch<React.SetStateAction<HeroPlan[]>>;
  
  userInvestments: UserHeroInvestment[];
  activeHourlyRate: number;
  totalUnclaimed: number;
  claimAllRewards: () => void;
  claimSingleHero: (investmentId: string) => void;
  
  skinUpgrades: SkinUpgrade[];
  purchaseSkinUpgrade: (skinId: string) => boolean;
  
  transactions: Transaction[];
  adminSettings: AdminSettings;
  
  giftCodes: GiftCode[];
  redeemGiftCode: (code: string) => { success: boolean; message: string; amount?: number };
  
  buyHeroPlan: (hero: HeroPlan) => { success: boolean; message: string };
  requestWithdrawal: (data: {
    amount: number;
    method: 'GCash' | 'Maya' | 'BDO' | 'BPI' | 'UnionBank';
    accountNumber: string;
    accountName: string;
  }) => { success: boolean; message: string };
  
  topUpBalance: (data: {
    amount: number;
    method: 'GCash' | 'Maya' | 'BDO' | 'BPI' | 'UnionBank';
    referenceNumber: string;
  }) => { success: boolean; message: string };
  
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  
  isPhoneFrame: boolean;
  setIsPhoneFrame: React.Dispatch<React.SetStateAction<boolean>>;
  
  soundEnabled: boolean;
  setSoundEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  
  toasts: ToastMessage[];
  addToast: (type: 'success' | 'info' | 'warning' | 'error', title: string, message: string) => void;
  removeToast: (id: string) => void;

  activeModal: 'topup' | 'withdraw' | 'invite' | 'giftcode' | 'enhance' | 'auth' | 'heroDetail' | 'receipt' | 'dailyLogin' | null;
  setActiveModal: (modal: 'topup' | 'withdraw' | 'invite' | 'giftcode' | 'enhance' | 'auth' | 'heroDetail' | 'receipt' | 'dailyLogin' | null) => void;
  selectedHero: HeroPlan | null;
  setSelectedHero: (hero: HeroPlan | null) => void;
  selectedReceiptTx: Transaction | null;
  setSelectedReceiptTx: (tx: Transaction | null) => void;

  dailyRewardTiers: DailyRewardTier[];
  isDailyRewardReady: boolean;
  dailyRemainingMs: number;
  claimDailyLoginReward: () => { success: boolean; amount: number; streak: number; message: string };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USER: 'avatar_legends_user',
  HERO_PLANS: 'avatar_legends_hero_plans',
  INVESTMENTS: 'avatar_legends_investments',
  SKINS: 'avatar_legends_skins',
  TRANSACTIONS: 'avatar_legends_transactions',
  SETTINGS: 'avatar_legends_settings',
  GIFT_CODES: 'avatar_legends_gift_codes',
  PHONE_FRAME: 'avatar_legends_phone_frame',
  SOUND: 'avatar_legends_sound',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial state or local storage
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER);
      return saved ? JSON.parse(saved) : DEFAULT_USER;
    } catch {
      return DEFAULT_USER;
    }
  });

  const [heroPlans, setHeroPlans] = useState<HeroPlan[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.HERO_PLANS);
      if (saved) {
        const parsed: HeroPlan[] = JSON.parse(saved);
        return parsed.map((hp) => {
          const name = hp.name.toLowerCase();
          if (name === 'gusion') return { ...hp, avatar: '/assets/aistudio/gusion-from-mobile-legends-standing-in-his-hero-select-page_8d9a24f9.jpg' };
          if (name === 'layla') return { ...hp, avatar: '/assets/aistudio/8a146ebb4e9e6c9e0553f7e14f66a7ca_31f78804.jpg' };
          return hp;
        });
      }
      return INITIAL_HERO_PLANS;
    } catch {
      return INITIAL_HERO_PLANS;
    }
  });

  // User's active hero investments: default has Mobile Legends Gusion generating ₱1.25/hr
  const [userInvestments, setUserInvestments] = useState<UserHeroInvestment[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INVESTMENTS);
      if (saved) {
        const parsed: UserHeroInvestment[] = JSON.parse(saved);
        // Ensure Gusion & Layla get updated to the user's uploaded image assets
        return parsed.map((inv) => {
          const name = inv.heroName.toLowerCase();
          if (name === 'gusion') return { ...inv, heroAvatar: '/assets/aistudio/gusion-from-mobile-legends-standing-in-his-hero-select-page_8d9a24f9.jpg' };
          if (name === 'layla') return { ...inv, heroAvatar: '/assets/aistudio/8a146ebb4e9e6c9e0553f7e14f66a7ca_31f78804.jpg' };
          return inv;
        });
      }
      return [
        {
          id: 'inv-gusion-01',
          heroPlanId: 'hero-gusion',
          heroName: 'Gusion',
          heroAvatar: '/assets/aistudio/gusion-from-mobile-legends-standing-in-his-hero-select-page_8d9a24f9.jpg',
          heroClass: 'Assassin',
          purchasePrice: 300,
          hourlyRate: 1.25,
          purchasedAt: new Date(Date.now() - 3600 * 1000 * 4).toISOString(),
          expiresAt: new Date(Date.now() + 3600 * 1000 * 24 * 30).toISOString(),
          totalEarned: 18.75,
          unclaimedEarnings: 1.25, // Exactly ₱1.25 ready to claim as in screenshot
          lastClaimedAt: new Date(Date.now() - 3600 * 1000).toISOString(),
          status: 'active',
        },
      ];
    } catch {
      return [];
    }
  });

  const [skinUpgrades, setSkinUpgrades] = useState<SkinUpgrade[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SKINS);
      return saved ? JSON.parse(saved) : INITIAL_SKIN_UPGRADES;
    } catch {
      return INITIAL_SKIN_UPGRADES;
    }
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
      return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
    } catch {
      return INITIAL_TRANSACTIONS;
    }
  });

  const [adminSettings, setAdminSettings] = useState<AdminSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return saved ? JSON.parse(saved) : INITIAL_ADMIN_SETTINGS;
    } catch {
      return INITIAL_ADMIN_SETTINGS;
    }
  });

  const [giftCodes, setGiftCodes] = useState<GiftCode[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.GIFT_CODES);
      return saved ? JSON.parse(saved) : INITIAL_GIFT_CODES;
    } catch {
      return INITIAL_GIFT_CODES;
    }
  });

  const [activeTab, setActiveTab] = useState<AppTab>('dashboard');
  const [isPhoneFrame, setIsPhoneFrame] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PHONE_FRAME);
      return saved !== null ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SOUND);
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [activeModal, setActiveModal] = useState<'topup' | 'withdraw' | 'invite' | 'giftcode' | 'enhance' | 'auth' | 'heroDetail' | 'receipt' | 'dailyLogin' | null>(null);
  const [selectedHero, setSelectedHero] = useState<HeroPlan | null>(null);
  const [selectedReceiptTx, setSelectedReceiptTx] = useState<Transaction | null>(null);

  // 24-hour Daily Reward Timer Engine
  const [currentTime, setCurrentTime] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setCurrentTime(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const TWENTY_FOUR_HOURS = 24 * 3600 * 1000;
  const lastClaimTime = currentUser.lastDailyClaimAt ? new Date(currentUser.lastDailyClaimAt).getTime() : 0;
  const timeSinceLastClaim = lastClaimTime > 0 ? currentTime - lastClaimTime : Infinity;
  const isDailyRewardReady = timeSinceLastClaim >= TWENTY_FOUR_HOURS;
  const dailyRemainingMs = isDailyRewardReady ? 0 : Math.max(0, TWENTY_FOUR_HOURS - timeSinceLastClaim);

  // Sync sound class
  useEffect(() => {
    sound.enabled = soundEnabled;
    localStorage.setItem(STORAGE_KEYS.SOUND, JSON.stringify(soundEnabled));
  }, [soundEnabled]);

  // Sync storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.HERO_PLANS, JSON.stringify(heroPlans));
  }, [heroPlans]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.INVESTMENTS, JSON.stringify(userInvestments));
  }, [userInvestments]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SKINS, JSON.stringify(skinUpgrades));
  }, [skinUpgrades]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PHONE_FRAME, JSON.stringify(isPhoneFrame));
  }, [isPhoneFrame]);

  // Toast manager
  const addToast = (type: 'success' | 'info' | 'warning' | 'error', title: string, message: string) => {
    const id = 'toast_' + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, title, message, timestamp: Date.now() }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Calculate mastery multiplier bonus from owned skins
  const totalMasteryMultiplier = skinUpgrades.reduce((acc, skin) => {
    return acc + (skin.ownedCount * skin.incomeMultiplierBonus);
  }, 0);

  // Total active hourly earning rate
  const activeHourlyRate = userInvestments
    .filter((inv) => inv.status === 'active')
    .reduce((sum, inv) => sum + inv.hourlyRate * (1 + totalMasteryMultiplier), 0);

  // Total unclaimed
  const totalUnclaimed = userInvestments
    .filter((inv) => inv.status === 'active')
    .reduce((sum, inv) => sum + inv.unclaimedEarnings, 0);

  // 1-second real-time hourly yield accumulation engine
  useEffect(() => {
    const timer = setInterval(() => {
      setUserInvestments((prev) => {
        if (!prev.length) return prev;
        let hasChanges = false;
        const updated = prev.map((inv) => {
          if (inv.status !== 'active') return inv;
          // Per second = hourlyRate / 3600
          const increment = (inv.hourlyRate * (1 + totalMasteryMultiplier)) / 3600;
          hasChanges = true;
          return {
            ...inv,
            unclaimedEarnings: inv.unclaimedEarnings + increment,
          };
        });
        return hasChanges ? updated : prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [totalMasteryMultiplier]);

  // Automated Payout Engine: Automatically fulfills pending withdrawals
  const processingTxsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!adminSettings.autoPayoutEnabled) return;

    const processingWithdrawals = transactions.filter(
      (tx) => tx.type === 'withdrawal' && tx.status === 'processing' && tx.isAutomatedPayout
    );

    processingWithdrawals.forEach((tx) => {
      if (processingTxsRef.current.has(tx.id)) return;
      processingTxsRef.current.add(tx.id);

      const delayMs = (adminSettings.autoPayoutDelaySeconds || 8) * 1000;
      setTimeout(() => {
        setTransactions((prev) =>
          prev.map((item) => {
            if (item.id === tx.id && item.status === 'processing') {
              return {
                ...item,
                status: 'completed',
                note: `⚡ Automated Payout Dispatched via Instapay to ${item.method} (${item.accountNumber})`,
              };
            }
            return item;
          })
        );

        if (currentUser.id === tx.userId) {
          sound.playCashout();
          addToast(
            'success',
            '⚡ Automated Payout Completed!',
            `₱${tx.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })} has been sent to your ${tx.method} account!`
          );
        }
        processingTxsRef.current.delete(tx.id);
      }, delayMs);
    });
  }, [transactions, adminSettings, currentUser.id]);

  // Claim All Rewards
  const claimAllRewards = () => {
    if (totalUnclaimed <= 0) {
      addToast('info', 'No Rewards Available', 'Your heroes are currently generating rewards. Check back in a few seconds!');
      return;
    }

    const claimedAmount = Number(totalUnclaimed.toFixed(2));
    if (claimedAmount <= 0) return;

    sound.playClaim();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#38bdf8', '#fbbf24', '#34d399', '#ffffff'],
    });

    setUserInvestments((prev) =>
      prev.map((inv) => ({
        ...inv,
        totalEarned: inv.totalEarned + inv.unclaimedEarnings,
        unclaimedEarnings: 0,
        lastClaimedAt: new Date().toISOString(),
      }))
    );

    setCurrentUser((prev) => ({
      ...prev,
      balance: prev.balance + claimedAmount,
      totalEarnedAllTime: prev.totalEarnedAllTime + claimedAmount,
    }));

    const newTx: Transaction = {
      id: 'tx-claim-' + Date.now(),
      userId: currentUser.id,
      userPhone: currentUser.phone,
      userName: currentUser.name,
      type: 'hourly_claim',
      amount: claimedAmount,
      method: 'Internal Balance',
      referenceNumber: 'CLM-' + Math.floor(100000 + Math.random() * 900000),
      status: 'completed',
      timestamp: new Date().toISOString(),
      note: `Claimed ₱${claimedAmount.toFixed(2)} from active hero plans`,
    };

    setTransactions((prev) => [newTx, ...prev]);
    addToast('success', 'Rewards Claimed!', `₱${claimedAmount.toFixed(2)} added to your available balance.`);
  };

  // Claim single hero
  const claimSingleHero = (investmentId: string) => {
    const inv = userInvestments.find((i) => i.id === investmentId);
    if (!inv || inv.unclaimedEarnings <= 0) return;

    const amount = Number(inv.unclaimedEarnings.toFixed(2));
    if (amount <= 0) return;

    sound.playClaim();
    setUserInvestments((prev) =>
      prev.map((i) =>
        i.id === investmentId
          ? {
              ...i,
              totalEarned: i.totalEarned + i.unclaimedEarnings,
              unclaimedEarnings: 0,
              lastClaimedAt: new Date().toISOString(),
            }
          : i
      )
    );

    setCurrentUser((prev) => ({
      ...prev,
      balance: prev.balance + amount,
      totalEarnedAllTime: prev.totalEarnedAllTime + amount,
    }));

    const newTx: Transaction = {
      id: 'tx-claim-' + Date.now(),
      userId: currentUser.id,
      userPhone: currentUser.phone,
      userName: currentUser.name,
      type: 'hourly_claim',
      amount: amount,
      method: 'Internal Balance',
      referenceNumber: 'CLM-' + Math.floor(100000 + Math.random() * 900000),
      status: 'completed',
      timestamp: new Date().toISOString(),
      note: `Harvested ₱${amount.toFixed(2)} from ${inv.heroName}`,
    };
    setTransactions((prev) => [newTx, ...prev]);
    addToast('success', 'Hero Rewards Harvested', `₱${amount.toFixed(2)} from ${inv.heroName} credited!`);
  };

  // Buy Hero Plan
  const buyHeroPlan = (hero: HeroPlan) => {
    if (currentUser.balance < hero.price) {
      sound.playClick();
      setActiveModal('topup');
      addToast('warning', 'Insufficient Balance', `You need ₱${hero.price.toLocaleString()} to summon ${hero.name}. Please top up.`);
      return { success: false, message: 'Insufficient balance' };
    }

    sound.playSuccess();
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#0284c7', '#38bdf8', '#f59e0b'],
    });

    setCurrentUser((prev) => ({
      ...prev,
      balance: prev.balance - hero.price,
    }));

    const newInvestment: UserHeroInvestment = {
      id: `inv-${hero.id}-${Date.now()}`,
      heroPlanId: hero.id,
      heroName: hero.name,
      heroAvatar: hero.avatar,
      heroClass: hero.class,
      purchasePrice: hero.price,
      hourlyRate: hero.hourlyIncome,
      purchasedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + hero.durationDays * 24 * 3600 * 1000).toISOString(),
      totalEarned: 0,
      unclaimedEarnings: 0,
      lastClaimedAt: new Date().toISOString(),
      status: 'active',
    };

    setUserInvestments((prev) => [newInvestment, ...prev]);

    const newTx: Transaction = {
      id: 'tx-buy-' + Date.now(),
      userId: currentUser.id,
      userPhone: currentUser.phone,
      userName: currentUser.name,
      type: 'plan_purchase',
      amount: hero.price,
      method: 'Internal Balance',
      referenceNumber: `SUMMON-${hero.name.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'completed',
      timestamp: new Date().toISOString(),
      note: `Acquired Mobile Legends Hero ${hero.name} (₱${hero.hourlyIncome}/hr for ${hero.durationDays} days)`,
    };
    setTransactions((prev) => [newTx, ...prev]);

    addToast('success', 'Hero Acquired!', `Congratulations! ${hero.name} is now earning ₱${hero.hourlyIncome}/hour!`);
    return { success: true, message: 'Hero purchased successfully' };
  };

  // Enhance Skin
  const purchaseSkinUpgrade = (skinId: string) => {
    const skin = skinUpgrades.find((s) => s.id === skinId);
    if (!skin) return false;

    if (skin.price > 0 && currentUser.balance < skin.price) {
      sound.playClick();
      setActiveModal('topup');
      addToast('warning', 'Insufficient Balance', `You need ₱${skin.price} to purchase ${skin.name}.`);
      return false;
    }

    sound.playLevelUp();
    confetti({
      particleCount: 60,
      spread: 60,
      colors: ['#00f0ff', '#3b82f6', '#ec4899', '#fbbf24'],
    });

    if (skin.price > 0) {
      setCurrentUser((prev) => ({
        ...prev,
        balance: prev.balance - skin.price,
        masteryPercent: Math.min(100, prev.masteryPercent + skin.masteryBonus),
        masteryLevel: prev.masteryLevel + 1,
      }));

      const newTx: Transaction = {
        id: 'tx-skin-' + Date.now(),
        userId: currentUser.id,
        userPhone: currentUser.phone,
        userName: currentUser.name,
        type: 'skin_purchase',
        amount: skin.price,
        method: 'Internal Balance',
        referenceNumber: 'SKIN-' + Math.floor(10000 + Math.random() * 90000),
        status: 'completed',
        timestamp: new Date().toISOString(),
        note: `Upgraded Avatar with ${skin.name} (+${skin.masteryBonus} Mastery)`,
      };
      setTransactions((prev) => [newTx, ...prev]);
    } else {
      setCurrentUser((prev) => ({
        ...prev,
        masteryPercent: Math.min(100, prev.masteryPercent + skin.masteryBonus),
      }));
    }

    setSkinUpgrades((prev) =>
      prev.map((s) => (s.id === skinId ? { ...s, ownedCount: s.ownedCount + 1 } : s))
    );

    addToast('success', 'Avatar Enhanced!', `${skin.name} activated! +${skin.masteryBonus} Mastery boost applied!`);
    return true;
  };

  // Request Withdrawal (Automated Payout Engine)
  const requestWithdrawal = (data: {
    amount: number;
    method: 'GCash' | 'Maya' | 'BDO' | 'BPI' | 'UnionBank';
    accountNumber: string;
    accountName: string;
  }) => {
    if (data.amount < adminSettings.minWithdrawal) {
      addToast('error', 'Minimum Withdrawal Limit', `The minimum withdrawal is ₱${adminSettings.minWithdrawal}.`);
      return { success: false, message: `Minimum withdrawal is ₱${adminSettings.minWithdrawal}` };
    }
    if (data.amount > adminSettings.maxWithdrawal) {
      addToast('error', 'Maximum Withdrawal Limit', `The maximum withdrawal is ₱${adminSettings.maxWithdrawal.toLocaleString()}.`);
      return { success: false, message: `Maximum withdrawal is ₱${adminSettings.maxWithdrawal}` };
    }
    if (currentUser.balance < data.amount) {
      addToast('error', 'Insufficient Balance', `Your current available balance is ₱${currentUser.balance.toFixed(2)}.`);
      return { success: false, message: 'Insufficient balance' };
    }

    sound.playClick();

    setCurrentUser((prev) => ({
      ...prev,
      balance: prev.balance - data.amount,
      totalWithdrawn: prev.totalWithdrawn + data.amount,
    }));

    const refNum = 'AUTO-' + (data.method === 'GCash' ? 'GC' : 'MY') + '-' + Math.floor(1000000 + Math.random() * 9000000);

    const newTx: Transaction = {
      id: 'tx-wd-' + Date.now(),
      userId: currentUser.id,
      userPhone: currentUser.phone,
      userName: currentUser.name,
      type: 'withdrawal',
      amount: data.amount,
      method: data.method,
      accountNumber: data.accountNumber,
      accountName: data.accountName,
      referenceNumber: refNum,
      status: 'processing',
      timestamp: new Date().toISOString(),
      isAutomatedPayout: true,
      note: `⚡ Automated Instapay payout to ${data.method} (${data.accountNumber}) in progress`,
    };

    setTransactions((prev) => [newTx, ...prev]);

    addToast(
      'info',
      '⚡ Automated Payout Dispatched',
      `Processing ₱${data.amount.toLocaleString()} to ${data.accountName} (${data.method}). Instant transfer completing in ~${adminSettings.autoPayoutDelaySeconds}s!`
    );

    return { success: true, message: 'Withdrawal queued successfully' };
  };

  // Top Up Balance
  const topUpBalance = (data: {
    amount: number;
    method: 'GCash' | 'Maya' | 'BDO' | 'BPI' | 'UnionBank';
    referenceNumber: string;
  }) => {
    if (data.amount < adminSettings.minTopUp) {
      addToast('error', 'Minimum Top-up Limit', `Minimum top-up is ₱${adminSettings.minTopUp}.`);
      return { success: false, message: `Minimum top-up is ₱${adminSettings.minTopUp}` };
    }

    sound.playSuccess();
    confetti({
      particleCount: 70,
      spread: 60,
      colors: ['#06b6d4', '#10b981', '#3b82f6'],
    });

    setCurrentUser((prev) => ({
      ...prev,
      balance: prev.balance + data.amount,
      totalDeposited: prev.totalDeposited + data.amount,
    }));

    const newTx: Transaction = {
      id: 'tx-topup-' + Date.now(),
      userId: currentUser.id,
      userPhone: currentUser.phone,
      userName: currentUser.name,
      type: 'deposit',
      amount: data.amount,
      method: data.method,
      referenceNumber: data.referenceNumber || 'DEP-' + Math.floor(1000000 + Math.random() * 9000000),
      status: 'completed',
      timestamp: new Date().toISOString(),
      note: `Deposit via ${data.method} QR / Instapay verified`,
    };

    setTransactions((prev) => [newTx, ...prev]);
    addToast('success', 'Top-up Credited!', `₱${data.amount.toLocaleString()} successfully deposited to your wallet balance.`);
    return { success: true, message: 'Deposit completed' };
  };

  // Redeem Gift Code
  const redeemGiftCode = (codeStr: string) => {
    const cleanCode = codeStr.trim().toUpperCase();
    const found = giftCodes.find((g) => g.code.toUpperCase() === cleanCode);

    if (!found) {
      sound.playClick();
      return { success: false, message: 'Invalid gift code. Please verify and try again.' };
    }

    if (!found.active) {
      return { success: false, message: 'This gift code has expired or is inactive.' };
    }

    if (found.usedCount >= found.maxUses) {
      return { success: false, message: 'This gift code has reached its maximum redemption limit.' };
    }

    const existing = transactions.find(
      (t) => t.userId === currentUser.id && t.type === 'gift_code' && t.referenceNumber === `CODE-${cleanCode}`
    );
    if (existing) {
      return { success: false, message: 'You have already redeemed this gift code on this account.' };
    }

    sound.playSuccess();
    confetti({
      particleCount: 90,
      spread: 80,
      colors: ['#eab308', '#ec4899', '#06b6d4'],
    });

    setCurrentUser((prev) => ({
      ...prev,
      balance: prev.balance + found.rewardAmount,
      totalEarnedAllTime: prev.totalEarnedAllTime + found.rewardAmount,
    }));

    setGiftCodes((prev) =>
      prev.map((g) => (g.code.toUpperCase() === cleanCode ? { ...g, usedCount: g.usedCount + 1 } : g))
    );

    const newTx: Transaction = {
      id: 'tx-gift-' + Date.now(),
      userId: currentUser.id,
      userPhone: currentUser.phone,
      userName: currentUser.name,
      type: 'gift_code',
      amount: found.rewardAmount,
      method: 'Internal Balance',
      referenceNumber: `CODE-${cleanCode}`,
      status: 'completed',
      timestamp: new Date().toISOString(),
      note: `Gift code reward: ${found.description}`,
    };
    setTransactions((prev) => [newTx, ...prev]);

    addToast('success', 'Gift Code Redeemed!', `Bonus of ₱${found.rewardAmount.toFixed(2)} added to your wallet!`);
    return { success: true, message: `Successfully redeemed ₱${found.rewardAmount}!`, amount: found.rewardAmount };
  };

  // Claim 24-Hour Daily Login Reward
  const claimDailyLoginReward = () => {
    if (!isDailyRewardReady) {
      const hours = Math.floor(dailyRemainingMs / (3600 * 1000));
      const mins = Math.floor((dailyRemainingMs % (3600 * 1000)) / (60 * 1000));
      addToast('warning', 'Already Claimed Today', `Next reward unlocked in ${hours}h ${mins}m.`);
      return { success: false, amount: 0, streak: currentUser.dailyStreak || 1, message: 'Wait for 24-hour cooldown' };
    }

    let currentStreak = currentUser.dailyStreak || 1;
    // If missed more than 48 hours, reset to Day 1
    if (lastClaimTime > 0 && timeSinceLastClaim > 48 * 3600 * 1000) {
      currentStreak = 1;
    }

    const tier = DAILY_REWARD_TIERS.find((t) => t.day === currentStreak) || DAILY_REWARD_TIERS[0];
    const rewardAmount = tier.amount;
    const isJackpotDay = currentStreak === 7;

    sound.playSuccess();
    confetti({
      particleCount: isJackpotDay ? 140 : 80,
      spread: isJackpotDay ? 90 : 70,
      colors: ['#00f0ff', '#fbbf24', '#34d399', '#f43f5e', '#a855f7'],
    });

    const nextStreak = isJackpotDay ? 1 : currentStreak + 1;

    setCurrentUser((prev) => ({
      ...prev,
      balance: prev.balance + rewardAmount,
      totalEarnedAllTime: prev.totalEarnedAllTime + rewardAmount,
      lastDailyClaimAt: new Date().toISOString(),
      dailyStreak: nextStreak,
      masteryPercent: isJackpotDay ? Math.min(100, prev.masteryPercent + 5) : prev.masteryPercent,
    }));

    const newTx: Transaction = {
      id: 'tx-daily-' + Date.now(),
      userId: currentUser.id,
      userPhone: currentUser.phone,
      userName: currentUser.name,
      type: 'daily_reward',
      amount: rewardAmount,
      method: 'Internal Balance',
      referenceNumber: `DAILY-D${currentStreak}-${Math.floor(10000 + Math.random() * 90000)}`,
      status: 'completed',
      timestamp: new Date().toISOString(),
      note: `Day ${currentStreak} Daily Login Reward claimed (+₱${rewardAmount})${isJackpotDay ? ' • +5 Mastery Jackpot!' : ''}`,
    };
    setTransactions((prev) => [newTx, ...prev]);

    addToast(
      'success',
      `Day ${currentStreak} Daily Reward Claimed!`,
      `+₱${rewardAmount} added to your balance! ${isJackpotDay ? '🌟 +5 Mastery Bonus Unlocked!' : ''}`
    );

    return {
      success: true,
      amount: rewardAmount,
      streak: currentStreak,
      message: 'Reward claimed successfully!',
    };
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        heroPlans,
        setHeroPlans,
        userInvestments,
        activeHourlyRate,
        totalUnclaimed,
        claimAllRewards,
        claimSingleHero,
        skinUpgrades,
        purchaseSkinUpgrade,
        transactions,
        adminSettings,
        giftCodes,
        redeemGiftCode,
        buyHeroPlan,
        requestWithdrawal,
        topUpBalance,
        activeTab,
        setActiveTab,
        isPhoneFrame,
        setIsPhoneFrame,
        soundEnabled,
        setSoundEnabled,
        toasts,
        addToast,
        removeToast,
        activeModal,
        setActiveModal,
        selectedHero,
        setSelectedHero,
        selectedReceiptTx,
        setSelectedReceiptTx,
        dailyRewardTiers: DAILY_REWARD_TIERS,
        isDailyRewardReady,
        dailyRemainingMs,
        claimDailyLoginReward,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
