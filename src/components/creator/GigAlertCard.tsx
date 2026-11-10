import React, { useState, useEffect } from 'react';
import { Booking, Creator } from '../../types';
import { 
  Clock, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  DollarSign, 
  Zap, 
  Store, 
  Building2 
} from 'lucide-react';

interface GigAlertCardProps {
  booking: Booking;
  creator: Creator;
  onAccept: (bookingId: string) => void;
  onDecline: (bookingId: string) => void;
}

export const GigAlertCard: React.FC<GigAlertCardProps> = ({
  booking,
  creator,
  onAccept,
  onDecline
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState(600); // 10-minute acceptance window

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const mins = Math.floor(secondsRemaining / 60);
  const secs = secondsRemaining % 60;
  const timeFormatted = `${mins}:${secs.toString().padStart(2, '0')}`;

  return (
    <div className="relative bg-gradient-to-br from-slate-900 to-slate-850 border-2 border-orange-500/60 rounded-3xl p-6 shadow-2xl space-y-5 overflow-hidden">
      {/* Top Banner Alert */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">
            ⚡ New Lucknow Gig Alert
          </span>
          <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
            {booking.bookingNumber}
          </span>
        </div>

        {/* 10-min Acceptance Timer */}
        <div className="flex items-center gap-1.5 bg-orange-500/10 border border-orange-500/30 px-3 py-1 rounded-full text-orange-400 text-xs font-bold font-mono">
          <Clock className="w-3.5 h-3.5 animate-spin" />
          <span>{timeFormatted} left</span>
        </div>
      </div>

      {/* Gig Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold px-2 py-0.5 rounded bg-orange-500/20 text-orange-300">
            {booking.category}
          </span>
          <h3 className="text-xl font-black text-white mt-1">{booking.businessName}</h3>
          <p className="text-xs text-slate-300 flex items-center gap-1 mt-0.5">
            <MapPin className="w-3.5 h-3.5 text-orange-400" />
            {booking.address} ({booking.area})
          </p>
        </div>

        {/* Payout Callout */}
        <div className="bg-slate-950/80 border border-emerald-500/40 rounded-2xl p-3 text-right">
          <div className="text-[10px] uppercase font-bold text-slate-400">Your Guaranteed Payout</div>
          <div className="text-2xl font-black text-emerald-400 flex items-baseline justify-end gap-1">
            ₹{booking.creatorPayout}
            <span className="text-[10px] text-slate-400 font-normal">UPI Escrow</span>
          </div>
          <div className="text-[10px] text-slate-400">80% of ₹{booking.price} booking</div>
        </div>
      </div>

      {/* Brief Summary */}
      <div className="bg-slate-950/60 rounded-2xl p-4 border border-slate-800 space-y-2 text-xs">
        <div className="font-bold text-slate-200 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          Shoot Hook & Angle:
        </div>
        <p className="text-slate-300 font-medium italic">
          "{booking.brief.keyOfferOrUSP}"
        </p>

        <div className="pt-2 text-[11px] text-slate-400 flex flex-wrap gap-x-4 gap-y-1">
          <span>📅 Slot: <strong className="text-white">{booking.slot}</strong></span>
          <span>🎵 Audio: <strong className="text-white">{booking.brief.audioPreference}</strong></span>
          <span>🎬 Deliverable: <strong className="text-white">{booking.packageName}</strong></span>
        </div>
      </div>

      {/* Acceptance Action Buttons */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        <button
          onClick={() => onDecline(booking.id)}
          className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs border border-slate-700 flex items-center justify-center gap-2 transition-all"
        >
          <XCircle className="w-4 h-4 text-slate-400" />
          <span>Pass Gig</span>
        </button>

        <button
          onClick={() => onAccept(booking.id)}
          className="py-3 px-4 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-xs shadow-xl shadow-orange-500/25 flex items-center justify-center gap-2 transition-all transform active:scale-95"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Accept Gig (Earn ₹{booking.creatorPayout})</span>
        </button>
      </div>
    </div>
  );
};

