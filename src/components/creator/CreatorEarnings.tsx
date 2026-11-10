import React from 'react';
import { useApp } from '../../context/AppContext';
import { Creator } from '../../types';
import { 
  Wallet, 
  ArrowUpRight, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  TrendingUp, 
  Award,
  Zap
} from 'lucide-react';

interface CreatorEarningsProps {
  creator: Creator;
}

export const CreatorEarnings: React.FC<CreatorEarningsProps> = ({ creator }) => {
  const { creatorWithdrawPayout } = useApp();

  return (
    <div className="space-y-6">
      {/* Earnings Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Pending Payout */}
        <div className="bg-gradient-to-br from-emerald-950/40 to-slate-900 border border-emerald-500/40 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-emerald-400">
              <span className="flex items-center gap-1.5">
                <Wallet className="w-4 h-4" /> Available for UPI Payout
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <div className="text-3xl font-black text-white mt-2">
              ₹{creator.pendingPayout.toLocaleString()}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Transferred to: <span className="font-mono text-emerald-300">{creator.upiId}</span>
            </p>
          </div>

          <button
            onClick={() => creatorWithdrawPayout(creator.id)}
            disabled={creator.pendingPayout <= 0}
            className={`mt-4 w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
              creator.pendingPayout > 0
                ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 active:scale-95'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            <span>Withdraw to UPI Instantly</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Lifetime Earnings */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-slate-400">
              <span className="flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-orange-400" /> Lifetime Earned
              </span>
              <span className="text-[10px] bg-orange-500/10 text-orange-400 px-2 py-0.5 rounded">
                80% Payout Cut
              </span>
            </div>
            <div className="text-3xl font-black text-white mt-2">
              ₹{creator.totalEarnings.toLocaleString()}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              From {creator.completedShoots} completed shoots in Lucknow
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Average shoot payout:</span>
            <span className="font-bold text-white">₹{creator.completedShoots ? Math.round(creator.totalEarnings / creator.completedShoots) : 0}</span>
          </div>
        </div>

        {/* Tier & Performance */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-slate-400">
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-purple-400" /> Creator Tier
              </span>
              <span className="text-[10px] bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded font-bold">
                {creator.tier}
              </span>
            </div>
            <div className="text-2xl font-black text-white mt-2 flex items-center gap-2">
              <span>{creator.rating} ⭐</span>
              <span className="text-xs text-slate-400 font-normal">({creator.reviewCount} ratings)</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              On-time arrival rate: <strong className="text-emerald-400">{creator.onTimeRate}%</strong>
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-purple-300 font-semibold flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Eligible for High-Priority Hazratganj Gigs</span>
          </div>
        </div>
      </div>

      {/* Tier Benefits Roadmap */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Pehle Aap Creator Tier Ladder
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-800 space-y-1">
            <div className="text-xs font-bold text-white">1. New Creator</div>
            <p className="text-[11px] text-slate-400">First 3 shoots audited by admin. 75% payout cut.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-800 space-y-1">
            <div className="text-xs font-bold text-white">2. Trusted Creator (10+ Shoots)</div>
            <p className="text-[11px] text-slate-400">80% payout cut, priority gig broadcast in selected zones.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-orange-500/10 border border-orange-500/30 space-y-1">
            <div className="text-xs font-bold text-orange-400">3. Pro Lakhnavi (30+ Shoots, 4.8+⭐)</div>
            <p className="text-[11px] text-orange-200">Instant UPI withdrawals, 8-reel partner accounts assigned.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

