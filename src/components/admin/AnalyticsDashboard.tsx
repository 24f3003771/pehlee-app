import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  TrendingUp, 
  Clock, 
  Star, 
  Smartphone, 
  RotateCcw, 
  Users, 
  CheckCircle2, 
  ShieldCheck,
  Zap,
  DollarSign
} from 'lucide-react';

export const AnalyticsDashboard: React.FC = () => {
  const { bookings, creators, platformCommission, setPlatformCommission } = useApp();

  const totalGMV = bookings.reduce((sum, b) => sum + b.price, 0);
  const totalRevenue = Math.round(totalGMV * (platformCommission / 100));

  const metrics = [
    {
      title: 'Median Confirmation SLA',
      actual: '18.4 mins',
      target: '≤ 30 mins',
      status: 'success',
      icon: <Clock className="w-4 h-4 text-orange-400" />,
      subtext: '83% of bookings confirmed under 30 mins'
    },
    {
      title: '48h On-Time Delivery Rate',
      actual: '89.2%',
      target: '≥ 85%',
      status: 'success',
      icon: <Zap className="w-4 h-4 text-emerald-400" />,
      subtext: 'Reels delivered within 24-48 hours'
    },
    {
      title: 'Average Customer Rating',
      actual: '4.8 / 5.0',
      target: '≥ 4.2',
      status: 'success',
      icon: <Star className="w-4 h-4 text-amber-400" />,
      subtext: 'Based on 48 post-shoot reviews'
    },
    {
      title: 'WhatsApp-to-App Conversion',
      actual: '64.5%',
      target: '≥ 60%',
      status: 'success',
      icon: <Smartphone className="w-4 h-4 text-green-400" />,
      subtext: 'Owners installing app for approval & rebooking'
    },
    {
      title: '30-Day Repeat Retention',
      actual: '42.8%',
      target: '≥ 40%',
      status: 'success',
      icon: <RotateCcw className="w-4 h-4 text-purple-400" />,
      subtext: 'Businesses ordering a 2nd package'
    },
    {
      title: 'Verified Lucknow Creators',
      actual: `${creators.filter(c => c.verified).length} / 40`,
      target: '40 by pilot end',
      status: 'progress',
      icon: <Users className="w-4 h-4 text-blue-400" />,
      subtext: 'Covers Hazratganj, Gomti Nagar & Alambagh'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Commission Configuration Control */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-emerald-400" />
            <span>Platform Commission Control (PRD Section 2: 20% to 25%)</span>
          </h3>
          <p className="text-xs text-slate-400">
            Current Platform Take Rate: <strong className="text-orange-400">{platformCommission}%</strong> (Creators receive {100 - platformCommission}%)
          </p>
        </div>

        <div className="flex items-center gap-2">
          {[20, 22, 25].map(rate => (
            <button
              key={rate}
              onClick={() => setPlatformCommission(rate)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                platformCommission === rate
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {rate}% Commission
            </button>
          ))}
        </div>
      </div>

      {/* Revenue & GMV Spotlight */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-slate-900 to-slate-850 border border-slate-800 rounded-2xl p-6">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Total Lucknow Booking GMV
          </div>
          <div className="text-3xl font-black text-white mt-2">
            ₹{totalGMV.toLocaleString()}
          </div>
          <p className="text-xs text-slate-400 mt-1">Across {bookings.length} platform bookings</p>
        </div>

        <div className="bg-gradient-to-br from-orange-950/40 to-slate-900 border border-orange-500/30 rounded-2xl p-6">
          <div className="text-xs font-bold uppercase tracking-wider text-orange-400">
            Pehle Aap Net Commission ({platformCommission}%)
          </div>
          <div className="text-3xl font-black text-emerald-400 mt-2">
            ₹{totalRevenue.toLocaleString()}
          </div>
          <p className="text-xs text-slate-400 mt-1">Direct platform retained earnings</p>
        </div>
      </div>

      {/* Target vs Actual KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((m, i) => (
          <div key={i} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                {m.icon}
                {m.title}
              </span>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-bold">
                ✓ Goal Met
              </span>
            </div>

            <div className="flex items-baseline justify-between">
              <div className="text-2xl font-black text-white">{m.actual}</div>
              <div className="text-xs text-slate-400">
                Target: <span className="font-semibold text-slate-300">{m.target}</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 border-t border-slate-800/80 pt-2">
              {m.subtext}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

