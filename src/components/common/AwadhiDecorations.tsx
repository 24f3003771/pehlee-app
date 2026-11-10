import React from 'react';

export const HangingBell: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 28 }) => {
  return (
    <div className={`flex flex-col items-center animate-bell ${className}`}>
      {/* Decorative chain links */}
      <div className="w-[1.5px] h-6 bg-gradient-to-b from-[#D4AF37]/20 via-[#D4AF37] to-[#B89225]" />
      <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] my-0.5 shadow-sm shadow-[#D4AF37]/50" />
      <div className="w-[1.5px] h-4 bg-[#D4AF37]" />
      {/* Brass Bell Body */}
      <svg
        width={size}
        height={size * 1.15}
        viewBox="0 0 40 46"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
      >
        <path
          d="M20 2C15 2 13 6 13 11V16C13 22 8 28 8 32C8 34 10 36 20 36C30 36 32 34 32 32C32 28 27 22 27 16V11C27 6 25 2 20 2Z"
          fill="url(#bell_grad)"
          stroke="#F3C951"
          strokeWidth="1.5"
        />
        {/* Bell bottom lip */}
        <ellipse cx="20" cy="35" rx="13" ry="3" fill="#B89225" stroke="#F3C951" strokeWidth="1" />
        {/* Bell Clapper */}
        <circle cx="20" cy="39" r="3" fill="#D4AF37" stroke="#8C6C16" strokeWidth="1" />
        {/* Highlight sheen */}
        <path
          d="M16 10C16 10 18 6 20 6"
          stroke="#FFF4D0"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="bell_grad" x1="8" y1="2" x2="32" y2="36" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F9DF8D" />
            <stop offset="0.4" stopColor="#D4AF37" />
            <stop offset="0.8" stopColor="#B89225" />
            <stop offset="1" stopColor="#8C6C16" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export const CornerMandala: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`opacity-60 text-[#D4AF37] pointer-events-none ${className}`}
    >
      <path
        d="M0 0C25 0 45 20 45 45L40 45C40 23 22 5 0 5V0Z"
        fill="currentColor"
      />
      <circle cx="15" cy="15" r="3" fill="currentColor" />
      <circle cx="30" cy="12" r="2" fill="currentColor" />
      <circle cx="12" cy="30" r="2" fill="currentColor" />
      <path
        d="M5 5C18 5 28 15 28 28"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="2 2"
      />
    </svg>
  );
};

export const PehleAapLogo: React.FC<{ size?: 'sm' | 'md' | 'lg'; light?: boolean }> = ({ size = 'md', light = false }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      {/* Folded Hands Namaste Icon with Golden Aura */}
      <div className="relative flex items-center justify-center mb-0.5">
        <div className="absolute inset-0 bg-[#D4AF37]/20 rounded-full blur-md" />
        <span className={`relative ${size === 'lg' ? 'text-4xl' : size === 'sm' ? 'text-xl' : 'text-2xl'}`}>
          🙏
        </span>
      </div>

      {/* Elegant Brand Title */}
      <h1
        className={`font-hindi font-bold tracking-normal ${
          size === 'lg'
            ? 'text-4xl sm:text-5xl text-[#F9DF8D]'
            : size === 'sm'
            ? 'text-lg text-[#F9DF8D]'
            : 'text-2xl text-[#F9DF8D]'
        } ${light ? 'text-[#F9DF8D]' : 'text-[#520B13] drop-shadow-sm'}`}
        style={{
          fontFamily: "'Rozha One', 'Marcellus', serif",
        }}
      >
        Pehle Aap
      </h1>
    </div>
  );
};

