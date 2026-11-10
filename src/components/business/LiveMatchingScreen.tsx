import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Booking } from '../../types';
import { 
  Radar, 
  Clock, 
  MapPin, 
  ShieldAlert, 
  Sparkles, 
  CheckCircle2, 
  PhoneCall, 
  RotateCcw,
  AlertTriangle,
  UserCheck
} from 'lucide-react';

interface LiveMatchingScreenProps {
  booking: Booking;
}

export const LiveMatchingScreen: React.FC<LiveMatchingScreenProps> = ({ booking }) => {
  const { acceptGig, creators, cancelBooking } = useApp();
  const [secondsRemaining, setSecondsRemaining] = useState(1740); // 29 mins

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const mins = Math.floor(secondsRemaining / 60);
  const secs = secondsRemaining % 60;
  const formattedTime = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

  // Find eligible creators in Lucknow for manual simulation
  const eligibleCreators = creators.filter(c => c.verified);

  return (
    <div className="max-w-3xl mx-auto bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8 shadow-2xl relative overflow-hidden">
      {/* Background ambient radar glow */}
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <span className="text-xs font-bold text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20 inline-block mb-1">
            Order #{booking.bookingNumber} • Live Hyperlocal Dispatch
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Finding Your Verified Creator
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Broadcasting gig to top rated smartphone shooters in <span className="text-white font-semibold">{booking.area}, Lucknow</span>
          </p>
        </div>

        {/* SLA Countdown Timer */}
        <div className="text-center sm:text-right bg-slate-800/80 border border-slate-700/80 px-5 py-3 rounded-2xl shadow-inner">
          <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center justify-center sm:justify-end gap-1">
            <Clock className="w-3.5 h-3.5 text-orange-400 animate-spin" />
            30-Min SLA Timer
          </div>
          <div className="text-3xl font-black text-orange-400 font-mono tracking-tight">
            {formattedTime}
          </div>
          <div className="text-[10px] text-slate-400">Guaranteed confirmation window</div>
        </div>
      </div>

      {/* Center Radar & Hyperlocal Visualization */}
      <div className="flex flex-col items-center justify-center py-6 text-center">
        <div className="relative w-44 h-44 flex items-center justify-center">
          {/* Radar Circles */}
          <div className="absolute inset-0 rounded-full border border-orange-500/20 animate-ping" />
          <div className="absolute inset-4 rounded-full border border-orange-500/30 animate-pulse" />
          <div className="absolute inset-8 rounded-full border border-amber-500/40" />
          <div className="absolute inset-12 rounded-full border border-slate-700 bg-slate-950/80 flex items-center justify-center shadow-xl">
            <span className="text-3xl">📍</span>
          </div>

          {/* Floating nearby creator pins */}
          <div className="absolute top-2 right-4 bg-slate-800 text-[10px] text-orange-300 font-bold px-2 py-0.5 rounded-full border border-orange-500/40 flex items-center gap-1 shadow">
            <span>Aman (1.2 km)</span>
          </div>
          <div className="absolute bottom-3 left-2 bg-slate-800 text-[10px] text-amber-300 font-bold px-2 py-0.5 rounded-full border border-amber-500/40 flex items-center gap-1 shadow">
            <span>Ritika (2.4 km)</span>
          </div>
        </div>

        <div className="mt-5 space-y-1">
          <h3 className="text-base font-bold text-white flex items-center justify-center gap-2">
            <span>Broadcasting to Verified Creators</span>
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </h3>
          <p className="text-xs text-slate-400 max-w-md">
            Notification dispatched to 14 verified creators in {booking.area}. First qualified creator acceptance confirms your booking.
          </p>
        </div>
      </div>

      {/* Escalation Rules Progress Bar (PRD Section 6.3 MATCH-3) */}
      <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-300">
          <span>Escalation & SLA Stages</span>
          <span className="text-orange-400">Target SLA: ≤ 30 Mins</span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-2.5 rounded-xl bg-orange-500/10 border border-orange-500/30 text-[11px]">
            <div className="font-bold text-orange-400">0 - 10 Mins</div>
            <div className="text-slate-400 text-[10px] mt-0.5">Local {booking.area} Pool</div>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-[11px]">
            <div className="font-bold text-amber-400">10 - 20 Mins</div>
            <div className="text-slate-400 text-[10px] mt-0.5">Widen to Adjacent Zones</div>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-[11px]">
            <div className="font-bold text-blue-400">20 - 30 Mins</div>
            <div className="text-slate-400 text-[10px] mt-0.5">Admin Priority Dispatch</div>
          </div>
        </div>

        <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1">
          <span>At 30 mins: Fallback activated (Choice of next slot or instant 100% refund).</span>
        </div>
      </div>

      {/* Demo Quick-Action: Simulate Creator Acceptance */}
      <div className="bg-gradient-to-r from-orange-950/30 to-amber-950/30 border border-orange-500/30 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-xs font-bold text-orange-300">
            <Sparkles className="w-4 h-4 text-orange-400" />
            <span>Interactive Simulator: Simulate Creator Acceptance</span>
          </div>
          <span className="text-[10px] text-slate-400">First-acceptance wins</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
          {eligibleCreators.slice(0, 2).map(c => (
            <button
              key={c.id}
              onClick={() => acceptGig(booking.id, c.id)}
              className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/80 hover:bg-orange-500 hover:text-white border border-slate-700 transition-all text-left group"
            >
              <div className="flex items-center gap-2">
                <img src={c.avatar} alt={c.name} className="w-8 h-8 rounded-full object-cover" />
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-white">{c.name}</div>
                  <div className="text-[10px] text-slate-400 group-hover:text-orange-100">{c.tier} • {c.rating}⭐</div>
                </div>
              </div>
              <span className="text-[11px] font-bold text-orange-400 group-hover:text-white bg-slate-900/50 group-hover:bg-white/20 px-2 py-1 rounded">
                Accept Gig →
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Fallback & Cancel Policy */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={() => cancelBooking(booking.id, 'User opted for refund during matching')}
          className="text-xs font-semibold text-rose-400 hover:text-rose-300 transition-colors flex items-center gap-1"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Cancel Order & Instant Refund
        </button>
        <span className="text-xs text-slate-400">Escrow Protected ₹{booking.price}</span>
      </div>
    </div>
  );
};

