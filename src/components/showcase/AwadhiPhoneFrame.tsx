import React from 'react';
import { HangingBell, CornerMandala } from '../common/AwadhiDecorations';

interface AwadhiPhoneFrameProps {
  screenNumber: number;
  caption: string;
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

export const AwadhiPhoneFrame: React.FC<AwadhiPhoneFrameProps> = ({
  screenNumber,
  caption,
  children,
  isActive = false,
  onClick
}) => {
  return (
    <div className="flex flex-col items-center">
      {/* Outer Awadhi Royal Arched Card */}
      <div 
        onClick={onClick}
        className={`relative w-[340px] h-[690px] rounded-[44px] p-4 flex flex-col items-center justify-between shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden border ${
          isActive 
            ? 'ring-4 ring-[#D4AF37] border-[#F3C951] shadow-[0_0_40px_rgba(212,175,55,0.4)] scale-[1.02]' 
            : 'border-[#841320]/60 hover:border-[#D4AF37]/60 hover:shadow-maroon-glow'
        }`}
        style={{
          background: 'radial-gradient(ellipse at top, #7E101C 0%, #520B13 50%, #2A0409 100%)'
        }}
      >
        {/* Ornate Arch Curve SVG at Top */}
        <div className="absolute top-0 inset-x-0 h-28 pointer-events-none opacity-40">
          <svg viewBox="0 0 340 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path
              d="M0 0H340V25C290 25 240 85 170 85C100 85 50 25 0 25V0Z"
              fill="#D4AF37"
              fillOpacity="0.15"
            />
            <path
              d="M0 25C50 25 100 85 170 85C240 85 290 25 340 25"
              stroke="#D4AF37"
              strokeWidth="1.5"
              strokeDasharray="4 3"
            />
          </svg>
        </div>

        {/* Corner Mandalas */}
        <CornerMandala className="absolute top-2 left-2" />
        <CornerMandala className="absolute top-2 right-2 -scale-x-100" />

        {/* Screen Number Badge */}
        <div className="relative z-10 self-start ml-2 mt-1">
          <span className="font-serif text-lg font-bold text-[#F9DF8D] drop-shadow-md">
            {screenNumber}
          </span>
        </div>

        {/* Left & Right Hanging Brass Bells */}
        <div className="absolute top-12 left-2 z-10 pointer-events-none">
          <HangingBell size={20} />
        </div>
        <div className="absolute top-12 right-2 z-10 pointer-events-none">
          <HangingBell size={20} />
        </div>

        {/* iPhone Mockup Shell */}
        <div className="relative z-20 w-[275px] h-[585px] bg-black rounded-[42px] p-[9px] shadow-phone border-2 border-[#333] flex flex-col overflow-hidden">
          {/* Dynamic Island / Speaker Pill */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full z-40 flex items-center justify-end px-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#111] ring-1 ring-[#222]" />
          </div>

          {/* Screen Glass Content */}
          <div className="w-full h-full rounded-[34px] overflow-hidden bg-[#FBF4EA] text-[#2A0409] flex flex-col relative select-none">
            {children}
          </div>

          {/* Bottom Home Indicator Bar */}
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/40 rounded-full z-40 pointer-events-none" />
        </div>

        {/* Subtle decorative bottom floral divider */}
        <div className="relative z-10 flex items-center gap-2 text-[#D4AF37] opacity-60 text-xs">
          <span>❖</span>
          <span className="h-[1px] w-12 bg-[#D4AF37]/50" />
          <span>❖</span>
        </div>
      </div>

      {/* Screen Caption */}
      <p className="mt-4 text-center font-serif text-base sm:text-lg font-bold text-[#F9DF8D] tracking-wide drop-shadow-sm max-w-[320px]">
        {caption}
      </p>
    </div>
  );
};

