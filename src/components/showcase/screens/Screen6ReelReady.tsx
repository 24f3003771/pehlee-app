import React, { useState } from 'react';
import { Bell, Play, Pause, Download, Share2, Sparkles, ChevronLeft } from 'lucide-react';

interface Screen6Props {
  onBack?: () => void;
  onBookAgain?: () => void;
  onRate?: () => void;
}

export const Screen6ReelReady: React.FC<Screen6Props> = ({ onBack, onBookAgain, onRate }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="w-full h-full bg-gradient-to-b from-[#6B0F1A] via-[#520B13] to-[#38040E] text-[#FBF4EA] flex flex-col justify-between p-3.5 pt-7">
      {/* Top Header */}
      <div className="flex items-center justify-between px-1">
        <button onClick={onBack} className="p-1 hover:opacity-80">
          <ChevronLeft className="w-5 h-5 text-[#F9DF8D]" />
        </button>
        <span className="font-serif font-bold text-xs text-[#F9DF8D] tracking-wide">
          Delivered Reel
        </span>
        <button className="p-1 hover:opacity-80">
          <Bell className="w-4 h-4 text-[#F9DF8D]" />
        </button>
      </div>

      {/* Reel Video Frame (9:16 aspect ratio) */}
      <div 
        onClick={() => setIsPlaying(!isPlaying)}
        className="relative my-2 w-full aspect-[9/13] rounded-2xl overflow-hidden shadow-2xl border-2 border-[#D4AF37] bg-black cursor-pointer group flex flex-col justify-between p-3"
      >
        {/* Background Coffee Cafe Video / Image */}
        <img
          src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80"
          alt="9:16 Cafe shoot reel"
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

        {/* Top Badges */}
        <div className="relative z-10 flex items-center justify-between">
          <span className="bg-black/50 text-[#F9DF8D] text-[9px] font-bold px-2 py-0.5 rounded-full border border-[#D4AF37]/40 backdrop-blur-sm">
            Awadhi Cafe
          </span>
          <span className="bg-[#6B0F1A] text-white text-[9px] font-bold px-2 py-0.5 rounded-full border border-[#D4AF37]">
            9:16 HD
          </span>
        </div>

        {/* Play Icon Center */}
        <div className="relative z-10 self-center w-12 h-12 rounded-full bg-[#D4AF37]/90 text-[#45070E] flex items-center justify-center shadow-xl transform transition-transform group-hover:scale-110">
          {isPlaying ? <Pause className="w-5 h-5 fill-[#45070E]" /> : <Play className="w-5 h-5 fill-[#45070E] ml-0.5" />}
        </div>

        {/* Bottom Video Caption */}
        <div className="relative z-10 space-y-0.5">
          <div className="text-xs font-serif font-bold text-white drop-shadow">
            9:16 cafe shoot reel
          </div>
          <div className="text-[10px] text-[#F9DF8D] font-sans">
            Delivered in 28 hrs by Rohan
          </div>
        </div>
      </div>

      {/* Action Buttons Row (Download & Share) */}
      <div className="grid grid-cols-2 gap-2 my-1">
        <button
          onClick={() => alert('Downloading HD 1080p Reel...')}
          className="py-1.5 px-3 rounded-xl bg-[#FFF9F2] text-[#6B0F1A] font-serif text-xs font-bold shadow-md hover:bg-white flex items-center justify-center gap-1.5 transition-all"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download</span>
        </button>

        <button
          onClick={() => alert('Sharing to Instagram...')}
          className="py-1.5 px-3 rounded-xl bg-[#FFF9F2] text-[#6B0F1A] font-serif text-xs font-bold shadow-md hover:bg-white flex items-center justify-center gap-1.5 transition-all"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Share</span>
        </button>
      </div>

      {/* Bottom Button (Book Again / Review) */}
      <div className="space-y-1.5">
        <button
          onClick={onRate}
          className="w-full py-2 rounded-xl bg-[#D4AF37] hover:bg-[#F3C951] text-[#45070E] font-serif text-xs font-black shadow-lg flex items-center justify-center gap-1.5 active:scale-98 transition-all"
        >
          <span>Rate Creator Experience ⭐</span>
        </button>

        <button
          onClick={onBookAgain}
          className="w-full py-2 rounded-xl bg-gradient-to-r from-[#520B13] to-[#6B0F1A] border border-[#D4AF37] text-[#F9DF8D] font-serif text-xs font-bold shadow-md flex items-center justify-center gap-1.5 hover:opacity-95"
        >
          <span>Book Again</span>
        </button>
      </div>
    </div>
  );
};

