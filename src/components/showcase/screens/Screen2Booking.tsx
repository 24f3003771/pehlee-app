import React, { useState } from 'react';
import { ChevronLeft, Calendar as CalendarIcon, Sparkles } from 'lucide-react';

interface Screen2Props {
  onBack?: () => void;
  onProceed?: (slot: string) => void;
}

export const Screen2Booking: React.FC<Screen2Props> = ({ onBack, onProceed }) => {
  const [selectedDay, setSelectedDay] = useState(20);
  const [selectedSlot, setSelectedSlot] = useState('02:30 PM');

  const days = [
    { day: 'M', date: 17 },
    { day: 'T', date: 18 },
    { day: 'W', date: 19 },
    { day: 'T', date: 20 },
    { day: 'F', date: 21 },
    { day: 'S', date: 22 },
    { day: 'S', date: 23 },
  ];

  const slots = [
    '02:30 PM',
    '03:00 PM',
    '03:10 PM',
    '01:30 PM',
    '03:50 PM',
    '05:00 PM'
  ];

  return (
    <div className="w-full h-full bg-gradient-to-b from-[#6B0F1A] via-[#520B13] to-[#38040E] text-[#FBF4EA] flex flex-col justify-between p-3.5 pt-7">
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between px-1 mb-3">
          <button onClick={onBack} className="p-1 hover:opacity-80">
            <ChevronLeft className="w-5 h-5 text-[#F9DF8D]" />
          </button>
          <h2 className="font-serif font-bold text-base text-[#F9DF8D]">Booking</h2>
          <CalendarIcon className="w-4 h-4 text-[#F9DF8D]" />
        </div>

        {/* Days of Week Selector */}
        <div className="grid grid-cols-7 gap-1 text-center py-2 border-b border-[#D4AF37]/20">
          {days.map((item, i) => {
            const isSelected = item.date === selectedDay;
            return (
              <div
                key={i}
                onClick={() => setSelectedDay(item.date)}
                className="flex flex-col items-center cursor-pointer"
              >
                <span className="text-[10px] text-[#ECD3BA]/70 font-sans">{item.day}</span>
                <div
                  className={`mt-1 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-all ${
                    isSelected
                      ? 'bg-[#FFF] text-[#6B0F1A] shadow-md ring-2 ring-[#D4AF37]'
                      : 'text-[#FBF4EA] hover:bg-white/10'
                  }`}
                >
                  {item.date}
                </div>
              </div>
            );
          })}
        </div>

        {/* Golden "TODAY" Badge */}
        <div className="mt-3.5 p-2 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F9DF8D] to-[#D4AF37] text-[#45070E] text-center shadow-md border border-[#F3C951]">
          <div className="font-serif font-black text-xs tracking-wider flex items-center justify-center gap-1">
            <Sparkles className="w-3 h-3 text-[#45070E]" />
            <span>TODAY</span>
            <Sparkles className="w-3 h-3 text-[#45070E]" />
          </div>
          <div className="text-[10px] font-sans font-semibold opacity-90">Nov. 20, 2026</div>
        </div>
      </div>

      {/* Time Slot Container (Cream Rounded Card) */}
      <div className="bg-[#FBF4EA] text-[#2A0409] rounded-2xl p-3.5 my-2 shadow-xl border border-[#ECD3BA]">
        <h3 className="font-serif font-bold text-xs text-[#6B0F1A] mb-2.5">Time slot</h3>

        <div className="grid grid-cols-2 gap-2">
          {slots.map((slot, i) => {
            const isSelected = selectedSlot === slot;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setSelectedSlot(slot)}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                  isSelected
                    ? 'bg-[#6B0F1A] text-[#FBF4EA] border-[#6B0F1A] shadow-md'
                    : 'bg-[#FFF9F2] text-[#2A0409] border-[#ECD3BA] hover:border-[#6B0F1A]/40'
                }`}
              >
                {slot}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Action Button (Ornate Maroon with Gold Border) */}
      <button
        onClick={() => onProceed && onProceed(selectedSlot)}
        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#520B13] to-[#6B0F1A] border border-[#D4AF37] text-[#F9DF8D] font-serif text-xs font-bold tracking-wider hover:opacity-95 shadow-lg flex items-center justify-center gap-2 active:scale-98 transition-all"
      >
        <span>Elegant Confirmation</span>
        <span>→</span>
      </button>
    </div>
  );
};

