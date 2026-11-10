import React, { useState, useEffect } from 'react';
import { ChevronLeft, MapPin, Check, Sparkles } from 'lucide-react';

interface Screen3Props {
  onBack?: () => void;
  onMatched?: () => void;
}

export const Screen3FindingCreator: React.FC<Screen3Props> = ({ onBack, onMatched }) => {
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          if (onMatched) onMatched();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [onMatched]);

  return (
    <div className="w-full h-full bg-gradient-to-b from-[#600711] via-[#4A050D] to-[#240307] text-[#FBF4EA] flex flex-col justify-between p-3.5 pt-7 relative overflow-hidden">
      {/* Top Header */}
      <div className="flex items-center justify-between px-1 relative z-20">
        <button onClick={onBack} className="p-1 hover:opacity-80">
          <ChevronLeft className="w-5 h-5 text-[#F9DF8D]" />
        </button>
        <span className="font-serif text-xs font-bold text-[#F9DF8D] tracking-wide">
          Lucknow Hyperlocal Radar
        </span>
        <div className="w-5" />
      </div>

      {/* Radar Center Animation */}
      <div className="relative flex-1 flex flex-col items-center justify-center my-4">
        {/* Radar concentric pulse rings */}
        <div className="absolute w-56 h-56 rounded-full border border-[#D4AF37]/20 animate-ping" />
        <div className="absolute w-44 h-44 rounded-full border border-[#D4AF37]/30" />
        <div className="absolute w-32 h-32 rounded-full border border-[#D4AF37]/40 border-dashed animate-spin duration-1000" />

        {/* Scattered Lucknow Location Pins with Gold Checkmark Seals */}
        <div className="absolute top-8 right-6 flex items-center justify-center w-7 h-7 rounded-full bg-[#D4AF37] text-[#45070E] shadow-lg animate-bounce">
          <Check className="w-4 h-4 stroke-[3]" />
        </div>

        <div className="absolute bottom-12 left-5 flex items-center justify-center w-7 h-7 rounded-full bg-[#D4AF37] text-[#45070E] shadow-lg">
          <Check className="w-4 h-4 stroke-[3]" />
        </div>

        <div className="absolute top-16 left-8 flex items-center justify-center w-6 h-6 rounded-full bg-[#B89225] text-white shadow-md">
          <MapPin className="w-3.5 h-3.5" />
        </div>

        <div className="absolute bottom-16 right-8 flex items-center justify-center w-6 h-6 rounded-full bg-[#B89225] text-white shadow-md">
          <MapPin className="w-3.5 h-3.5" />
        </div>

        {/* Center Golden SLA Countdown Circle */}
        <div 
          onClick={onMatched}
          title="Click to Instant Match"
          className="relative z-20 w-24 h-24 rounded-full bg-gradient-to-tr from-[#6B0F1A] via-[#841320] to-[#520B13] border-4 border-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.6)] flex flex-col items-center justify-center cursor-pointer transition-transform hover:scale-105 active:scale-95"
        >
          <span className="font-serif font-black text-2xl text-[#FFF] tracking-tight">
            {countdown > 0 ? `${countdown}s` : 'Match!'}
          </span>
          <span className="text-[9px] text-[#F9DF8D] font-sans font-bold">Lucknow SLA</span>
        </div>

        {/* Searching Status Text */}
        <div className="mt-8 text-center space-y-1 relative z-20">
          <div className="font-serif font-bold text-sm text-[#F9DF8D] tracking-wide flex items-center justify-center gap-1.5">
            <span>Searching...</span>
            <span className="w-2 h-2 rounded-full bg-[#F9DF8D] animate-ping" />
          </div>
          <p className="text-[10px] text-[#ECD3BA]/70 font-sans max-w-[200px]">
            Checking nearby verified creators in Hazratganj & Gomti Nagar
          </p>
        </div>
      </div>

      {/* Bottom Match Trigger Pill */}
      <button
        onClick={onMatched}
        className="w-full py-2 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#F9DF8D] font-serif text-xs font-bold hover:bg-[#D4AF37]/30 transition-all text-center"
      >
        Tap to Confirm Creator →
      </button>
    </div>
  );
};

