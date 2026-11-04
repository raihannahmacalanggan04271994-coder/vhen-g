export type Role = 'user' | 'admin';

export type HeroClass = 'Assassin' | 'Marksman' | 'Fighter' | 'Mage' | 'Tank' | 'Support';

export interface HeroPlan {
  id: string;
  name: string;
  title: string;
  avatar: string; // image or high-res visual
  class: HeroClass;
  price: number; // in PHP ₱
  originalPrice?: number;
  hourlyIncome: number; // in PHP ₱ / hour
  durationDays: number; // e.g. 30 days
  totalReturn: number; // price + profit
  roiPercent: number; // e.g. 180%
  isFeatured?: boolean;
  featuredBadge?: string;
  stockRemaining?: number;
  description: string;
}

export interface UserHeroInvestment {
  id: string;
  heroPlanId: string;
  heroName: string;
  heroAvatar: string;
  heroClass: HeroClass;
  purchasePrice: number;
  hourlyRate: number; // includes mastery multipliers
  purchasedAt: string; // ISO string
  expiresAt: string; // ISO string
  totalEarned: number;
  unclaimedEarnings: number; // live ticking
  lastClaimedAt: string;
  status: 'active' | 'expired';
}

export interface SkinUpgrade {
  id: string;
  name: string;
  masteryBonus: number; // e.g. +5 Mastery
  incomeMultiplierBonus: number; // e.g. +0.05 (+5%)
  price: number;
  icon: string;
  ownedCount: number;
  description: string;
  cooldownHours?: number;
}

export type TransactionType = 'deposit' | 'withdrawal' | 'hourly_claim' | 'plan_purchase' | 'skin_purchase' | 'referral_bonus' | 'gift_code' | 'daily_reward';
export type TransactionStatus = 'pending' | 'processing' | 'completed' | 'rejected' | 'failed';

export interface Transaction {
  id: string;
  userId: string;
  userPhone: string;
  userName: string;
  type: TransactionType;
  amount: number;
  method?: 'GCash' | 'Maya' | 'BDO' | 'BPI' | 'UnionBank' | 'Internal Balance';
  accountNumber?: string;
  accountName?: string;
  referenceNumber: string;
  status: TransactionStatus;
  timestamp: string;
  note?: string;
  isAutomatedPayout?: boolean;
}

export interface UserProfile {
  id: string;
  phone: string;
  name: string;
  role: Role;
  balance: number;
  totalWithdrawn: number;
  totalDeposited: number;
  totalEarnedAllTime: number;
  masteryPercent: number;
  masteryLevel: number;
  referralCode: string;
  referredBy?: string;
  referralEarnings: number;
  referralCount: number;
  registeredAt: string;
  status: 'active' | 'suspended';
  avatarUrl?: string;
  lastDailyClaimAt?: string; // ISO timestamp of last 24h claim
  dailyStreak?: number; // current streak day (1-7)
}

export interface GiftCode {
  code: string;
  rewardAmount: number;
  maxUses: number;
  usedCount: number;
  expiresAt: string;
  active: boolean;
  description: string;
}

export interface AdminSettings {
  autoPayoutEnabled: boolean; // if true, instant automatic dispatch for withdrawals
  autoPayoutMaxAmount: number; // e.g. up to 10,000 automated
  autoPayoutDelaySeconds: number; // simulated processing time (e.g. 5-15s)
  platformWithdrawalFeePercent: number; // e.g. 2% or 0%
  minWithdrawal: number;
  maxWithdrawal: number;
  minTopUp: number;
  maintenanceMode: boolean;
  systemNotification: string;
}
