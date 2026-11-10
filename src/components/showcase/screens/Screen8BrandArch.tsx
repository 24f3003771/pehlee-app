import React from 'react';
import { Smartphone } from 'lucide-react';

interface Screen8Props {
  onRestart?: () => void;
}

export const Screen8BrandArch: React.FC<Screen8Props> = ({ onRestart }) => {
  return (
    <div className="w-full h-full bg-[#38040E] text-[#FBF4EA] flex flex-col justify-between p-3.5 pt-7 relative overflow-hidden">
      {/* Top Sliding WhatsApp Push Notification Banner */}
      <div 
        onClick={onRestart}
        className="relative z-30 p-2.5 rounded-2xl bg-[#1F2C34]/95 text-white border border-[#2A3942] shadow-2xl backdrop-blur-md flex items-center justify-between cursor-pointer transition-transform hover:scale-[1.02]"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-sm flex-shrink-0">
            <Smartphone className="w-4 h-4 fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-white">WhatsApp</span>
              <span className="text-[9px] text-[#8696A0]">1m ago</span>
            </div>
            <p className="text-[10px] text-[#D1D7DB] truncate">
              WhatsApp push notification: Reel delivered!
            </p>
          </div>
        </div>
      </div>

      {/* Royal Lakhnavi Arch (Rumi Darwaza / Awadhi Jharokha Carved Arch) */}
      <div className="relative flex-1 my-3 flex flex-col items-center justify-center">
        {/* Carved Stone Archway Graphic Container */}
        <div className="relative w-full max-w-[235px] aspect-[4/5] rounded-t-full border-4 border-[#D4AF37] p-3 flex flex-col items-center justify-center text-center shadow-[0_0_35px_rgba(212,175,55,0.3)] bg-gradient-to-b from-[#520B13] via-[#38040E] to-[#200207] overflow-hidden">
          {/* Subtle floral arch rays */}
          <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px] opacity-15" />
          
          {/* Inner Decorative Arch Border */}
          <div className="absolute inset-2 rounded-t-full border border-dashed border-[#F9DF8D]/40 pointer-events-none" />

          {/* Golden Radiating Sun Rays behind Namaste */}
          <div className="relative z-10 flex flex-col items-center space-y-2">
            <div className="relative flex items-center justify-center">
              <div className="absolute w-16 h-16 bg-[#D4AF37]/25 rounded-full blur-lg animate-pulse" />
              <span className="text-4xl drop-shadow-[0_2px_10px_rgba(212,175,55,0.8)]">
                🙏
              </span>
            </div>

            {/* Pehle Aap Script Typography */}
            <h1
              className="text-3xl font-bold text-[#F9DF8D] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-none mt-1"
              style={{ fontFamily: "'Rozha One', 'Great Vibes', serif" }}
            >
              Pehle Aap
            </h1>

            {/* Floral Rosette Divider */}
            <div className="flex items-center justify-center gap-2 text-[#D4AF37] opacity-80 py-1">
              <span className="h-[1px] w-6 bg-[#D4AF37]" />
              <span className="text-xs">🌸</span>
              <span className="h-[1px] w-6 bg-[#D4AF37]" />
            </div>

            {/* Slogan */}
            <div className="space-y-0.5 font-serif font-black tracking-widest text-[#F9DF8D]">
              <div className="text-[11px] uppercase opacity-90">PEHLE AAP —</div>
              <div className="text-xs sm:text-[13px] text-white font-extrabold uppercase drop-shadow-sm">
                PEHLE AAP, PHIR REEL.
              </div>
              <div className="text-[10px] text-[#F9DF8D]/80 font-hindi font-normal tracking-normal pt-1">
                (पहले आप, फिर रील)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Restart Walkthrough Button */}
      <button
        onClick={onRestart}
        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F9DF8D] to-[#D4AF37] text-[#45070E] font-serif text-xs font-black shadow-lg flex items-center justify-center gap-1.5 active:scale-98 transition-all"
      >
        <span>🔄 Restart Demo (Screen 1)</span>
      </button>
    </div>
  );
};

