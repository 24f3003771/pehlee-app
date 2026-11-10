import React, { useState } from 'react';
import { Menu, Bell, Film, Clapperboard, Video, Check } from 'lucide-react';
import { PehleAapLogo } from '../../common/AwadhiDecorations';

interface Screen1Props {
  onSelectPackage?: (pkgName: string, price: number) => void;
}

export const Screen1Packages: React.FC<Screen1Props> = ({ onSelectPackage }) => {
  const [selected, setSelected] = useState<'basic' | 'standard' | 'premium'>('standard');

  const packages = [
    {
      id: 'basic' as const,
      name: 'Basic Reel',
      icon: <Clapperboard className="w-5 h-5 text-[#6B0F1A]" />,
      bullets: ['1 short reel (up to 30s)', 'On-location shoot'],
      price: 999,
      isPopular: false
    },
    {
      id: 'standard' as const,
      name: 'Standard Reel',
      icon: <Film className="w-5 h-5 text-[#F9DF8D]" />,
      bullets: ['1 reel (up to 60s)', 'Shoot + Editing', '1 Revision'],
      price: 1999,
      isPopular: true
    },
    {
      id: 'premium' as const,
      name: 'Premium Reel',
      icon: <Video className="w-5 h-5 text-[#6B0F1A]" />,
      bullets: ['1 reel (up to 60s)', 'Advanced editing', '2 Revisions'],
      price: 3999,
      isPopular: false
    }
  ];

  const handleSelect = (pkg: typeof packages[0]) => {
    setSelected(pkg.id);
    if (onSelectPackage) {
      onSelectPackage(pkg.name, pkg.price);
    }
  };

  return (
    <div className="w-full h-full bg-[#FBF4EA] flex flex-col justify-between p-3.5 pt-7 text-[#2A0409]">
      {/* Top App Header */}
      <div className="flex items-center justify-between px-1">
        <button className="text-[#6B0F1A] hover:opacity-80 p-1">
          <Menu className="w-5 h-5" />
        </button>

        {/* Center Logo */}
        <div className="flex flex-col items-center">
          <span className="text-xl">🙏</span>
          <span
            className="text-base font-bold text-[#6B0F1A] leading-tight"
            style={{ fontFamily: "'Rozha One', serif" }}
          >
            Pehle Aap
          </span>
        </div>

        <button className="text-[#6B0F1A] hover:opacity-80 p-1 relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#D4AF37]" />
        </button>
      </div>

      {/* Package Cards Slider / Deck */}
      <div className="flex-1 my-3 flex flex-col justify-center space-y-2.5 overflow-y-auto px-0.5">
        {packages.map((pkg) => {
          const isSelected = selected === pkg.id;

          if (pkg.isPopular) {
            // Standard Reel - Regal Dark Maroon Card with Gold Border
            return (
              <div
                key={pkg.id}
                onClick={() => handleSelect(pkg)}
                className="relative rounded-2xl p-3 bg-gradient-to-b from-[#6B0F1A] to-[#45070E] text-[#FBF4EA] border-2 border-[#D4AF37] shadow-lg shadow-[#6B0F1A]/30 cursor-pointer transition-all transform hover:scale-[1.01]"
              >
                {/* Most Popular Gold Ribbon */}
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-[#45070E] font-serif text-[9px] font-extrabold uppercase tracking-wider px-3 py-0.5 rounded-full shadow border border-[#F3C951]">
                  Most Popular
                </div>

                <div className="flex items-center justify-between mt-1">
                  <div className="flex items-center gap-1.5">
                    {pkg.icon}
                    <h3 className="font-serif font-bold text-sm text-[#F9DF8D]">{pkg.name}</h3>
                  </div>
                  <span className="font-bold text-sm text-[#FFF] font-sans">₹{pkg.price.toLocaleString()}</span>
                </div>

                <div className="my-2 space-y-1 text-[10px] text-[#F5E8D6]/90 border-t border-[#D4AF37]/30 pt-1.5">
                  {pkg.bullets.map((b, i) => (
                    <div key={i} className="flex items-center gap-1">
                      <span className="text-[#D4AF37] font-bold">✓</span>
                      <span>{b}</span>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  className="w-full py-1.5 rounded-xl bg-[#FBF4EA] text-[#6B0F1A] font-serif text-xs font-bold hover:bg-[#FFF] transition-all shadow-sm"
                >
                  {isSelected ? '✓ Selected' : 'Select'}
                </button>
              </div>
            );
          }

          // Basic or Premium Card - Cream Card with Maroon Accent
          return (
            <div
              key={pkg.id}
              onClick={() => handleSelect(pkg)}
              className={`rounded-2xl p-2.5 bg-[#FFF9F2] border transition-all cursor-pointer ${
                isSelected
                  ? 'border-[#6B0F1A] ring-1 ring-[#6B0F1A] shadow-md'
                  : 'border-[#ECD3BA] hover:border-[#6B0F1A]/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  {pkg.icon}
                  <h3 className="font-serif font-bold text-xs text-[#6B0F1A]">{pkg.name}</h3>
                </div>
                <span className="font-bold text-xs text-[#2A0409]">₹{pkg.price.toLocaleString()}</span>
              </div>

              <div className="my-1.5 space-y-0.5 text-[10px] text-[#555] border-t border-[#ECD3BA]/60 pt-1">
                {pkg.bullets.map((b, i) => (
                  <div key={i} className="flex items-center gap-1">
                    <span className="text-[#6B0F1A] font-bold">✓</span>
                    <span>{b}</span>
                  </div>
                ))}
              </div>

              <button
                type="button"
                className={`w-full py-1 rounded-xl text-[11px] font-serif font-bold transition-all border ${
                  isSelected
                    ? 'bg-[#6B0F1A] text-[#FBF4EA] border-[#6B0F1A]'
                    : 'bg-[#FBF4EA] text-[#6B0F1A] border-[#ECD3BA] hover:bg-[#F5E8D6]'
                }`}
              >
                {isSelected ? '✓ Selected' : 'Select'}
              </button>
            </div>
          );
        })}
      </div>

      {/* Bottom Hint */}
      <div className="text-center text-[10px] text-[#6B0F1A]/70 font-serif">
        ✨ 30-min confirmation in Lucknow
      </div>
    </div>
  );
};

