import React from 'react';
import { ChevronLeft, Bell, Star, ShieldCheck, Check } from 'lucide-react';

interface Screen4Props {
  onBack?: () => void;
  onTrack?: () => void;
}

export const Screen4CreatorConfirmed: React.FC<Screen4Props> = ({ onBack, onTrack }) => {
  return (
    <div className="w-full h-full bg-gradient-to-b from-[#600711] via-[#4A050D] to-[#240307] text-[#FBF4EA] flex flex-col justify-between p-3.5 pt-7 relative overflow-hidden">
      {/* Floating Confetti Graphics */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <span className="absolute top-8 left-6 w-2.5 h-2.5 bg-[#F9DF8D] rounded-sm rotate-12 animate-confetti" />
        <span className="absolute top-14 right-10 w-2 h-3 bg-[#E5B842] rounded-full -rotate-45" />
        <span className="absolute top-20 left-16 w-3 h-1.5 bg-[#4ADE80] rotate-45" />
        <span className="absolute top-12 left-1/2 w-2 h-2 bg-[#F43F5E] rounded-full" />
        <span className="absolute bottom-24 right-8 w-2.5 h-2.5 bg-[#38BDF8] rotate-12" />
        <span className="absolute bottom-32 left-10 w-2 h-3 bg-[#A855F7] -rotate-12" />
        <span className="absolute top-36 right-4 w-3 h-1.5 bg-[#F9DF8D] rotate-90" />
      </div>

      {/* Top Header */}
      <div className="flex items-center justify-between px-1 relative z-10">
        <button onClick={onBack} className="p-1 hover:opacity-80">
          <ChevronLeft className="w-5 h-5 text-[#F9DF8D]" />
        </button>
        <h2 className="font-serif font-bold text-base text-[#F9DF8D]">Confirm!</h2>
        <Bell className="w-4 h-4 text-[#F9DF8D]" />
      </div>

      {/* Center Floating Ivory Creator Card */}
      <div className="my-auto relative z-10 bg-[#FFF9F2] text-[#2A0409] rounded-2xl p-4 shadow-2xl border-2 border-[#D4AF37] space-y-3">
        {/* Creator Avatar & Info Row */}
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <h3 className="font-serif font-extrabold text-base text-[#2A0409]">
              Rohan Mehta
            </h3>

            {/* Stars & Rating */}
            <div className="flex items-center gap-1 text-[11px] font-bold text-[#B89225]">
              <span>★ 4.9</span>
              <div className="flex text-[#D4AF37]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-2.5 h-2.5 fill-[#D4AF37]" />
                ))}
              </div>
            </div>

            {/* Gold Verified Badge */}
            <div className="inline-flex items-center gap-1 bg-[#FDF0C5] text-[#8C6C16] border border-[#F3C951] px-2 py-0.5 rounded-full text-[10px] font-bold">
              <ShieldCheck className="w-3 h-3 text-[#B89225]" />
              <span>Gold Verified</span>
            </div>
          </div>

          {/* Creator Profile Image */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80"
              alt="Rohan Mehta"
              className="w-16 h-16 rounded-xl object-cover border-2 border-[#D4AF37] shadow-md"
            />
          </div>
        </div>

        {/* Large Green Confirmed Pill Button */}
        <button
          onClick={onTrack}
          className="w-full py-2.5 rounded-full bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-xs shadow-md shadow-green-600/30 flex items-center justify-center gap-1.5 transition-all active:scale-98"
        >
          <div className="w-4 h-4 rounded-full bg-white text-[#16A34A] flex items-center justify-center">
            <Check className="w-3 h-3 stroke-[3]" />
          </div>
          <span>Confirmed!</span>
        </button>
      </div>

      {/* Bottom Button (Ornate Maroon Confirmed Bar) */}
      <button
        onClick={onTrack}
        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#520B13] to-[#6B0F1A] border border-[#D4AF37] text-[#F9DF8D] font-serif text-xs font-bold tracking-wider hover:opacity-95 shadow-lg flex items-center justify-center gap-2 active:scale-98 transition-all relative z-10"
      >
        <span>Confirmed</span>
        <span>→</span>
      </button>
    </div>
  );
};

