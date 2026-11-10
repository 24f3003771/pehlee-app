import React from 'react';
import { Check, Camera, Film, CheckCircle2, ChevronRight } from 'lucide-react';

interface Screen5Props {
  onNext?: () => void;
}

export const Screen5StepTracker: React.FC<Screen5Props> = ({ onNext }) => {
  return (
    <div className="w-full h-full bg-[#FBF4EA] text-[#2A0409] flex flex-col justify-between p-3.5 pt-7">
      {/* Top Gradient Header */}
      <div className="rounded-2xl p-3 bg-gradient-to-r from-[#6B0F1A] via-[#841320] to-[#6B0F1A] text-[#FBF4EA] shadow-md border border-[#D4AF37]/40 mb-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-serif uppercase tracking-widest text-[#F9DF8D]">
            Order #PA-LK-8821
          </span>
          <span className="text-[10px] font-bold bg-[#D4AF37] text-[#45070E] px-2 py-0.5 rounded-full">
            Live
          </span>
        </div>
        <h3 className="font-serif font-extrabold text-sm text-white mt-1">
          Royal Cafe Hazratganj
        </h3>
        <p className="text-[10px] text-[#ECD3BA]/80">Creator: Rohan Mehta</p>
      </div>

      {/* Step Tracker Timeline */}
      <div className="flex-1 my-2 flex flex-col justify-center px-2">
        <div className="relative pl-6 space-y-4 before:absolute before:left-[11px] before:top-3 before:bottom-3 before:w-[2px] before:bg-[#D4AF37]/30">
          {/* Step 1: Booking Confirmed */}
          <div className="relative flex items-center gap-3">
            <div className="absolute -left-6 w-5 h-5 rounded-full bg-[#6B0F1A] text-white flex items-center justify-center shadow-sm">
              <Check className="w-3 h-3 stroke-[3]" />
            </div>
            <span className="font-serif font-bold text-xs text-[#2A0409]">
              Booking confirmed
            </span>
          </div>

          {/* Step 2: Creator Assigned */}
          <div className="relative flex items-center gap-3">
            <div className="absolute -left-6 w-5 h-5 rounded-full bg-[#6B0F1A] text-white flex items-center justify-center shadow-sm">
              <Check className="w-3 h-3 stroke-[3]" />
            </div>
            <span className="font-serif font-bold text-xs text-[#2A0409]">
              Creator assigned
            </span>
          </div>

          {/* Step 3: Shoot In Progress (Glowing Amber/Gold Capsule Pill) */}
          <div 
            onClick={onNext}
            className="relative -ml-3 p-2 rounded-2xl bg-gradient-to-r from-[#F9DF8D] via-[#FDF0C5] to-[#F9DF8D] border-2 border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.7)] flex items-center gap-2 cursor-pointer transition-transform hover:scale-[1.02] active:scale-98 animate-step-glow"
          >
            <div className="w-5 h-5 rounded-full bg-[#6B0F1A] text-[#F9DF8D] flex items-center justify-center font-bold text-[10px]">
              3
            </div>
            <div className="flex-1">
              <span className="font-serif font-black text-xs text-[#520B13] tracking-wide block">
                Shoot in progress
              </span>
              <span className="text-[9px] text-[#6B0F1A] font-sans font-semibold">
                On-site at Royal Cafe
              </span>
            </div>
            <Camera className="w-4 h-4 text-[#6B0F1A] animate-pulse mr-1" />
          </div>

          {/* Step 4: Editing */}
          <div className="relative flex items-center gap-3 opacity-60">
            <div className="absolute -left-6 w-5 h-5 rounded-full bg-[#ECD3BA] text-[#8C6C16] border border-[#D4AF37]/50 flex items-center justify-center font-bold text-[10px]">
              4
            </div>
            <span className="font-serif font-semibold text-xs text-[#555]">
              Editing
            </span>
          </div>

          {/* Step 5: Completed */}
          <div className="relative flex items-center gap-3 opacity-40">
            <div className="absolute -left-6 w-5 h-5 rounded-full bg-[#ECD3BA] text-[#8C6C16] border border-[#D4AF37]/50 flex items-center justify-center font-bold text-[10px]">
              5
            </div>
            <span className="font-serif font-semibold text-xs text-[#555]">
              Completed
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Button */}
      <button
        onClick={onNext}
        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#6B0F1A] to-[#841320] text-[#F9DF8D] border border-[#D4AF37] font-serif text-xs font-bold shadow-md flex items-center justify-center gap-2 active:scale-98 transition-all"
      >
        <span>View Reel Ready</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

