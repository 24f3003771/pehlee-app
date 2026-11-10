import React, { useState } from 'react';
import { Star, CheckCircle2, ChevronLeft } from 'lucide-react';

interface Screen7Props {
  onBack?: () => void;
  onSubmitRating?: (rating: number) => void;
}

export const Screen7Feedback: React.FC<Screen7Props> = ({ onBack, onSubmitRating }) => {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      if (onSubmitRating) onSubmitRating(rating);
    }, 800);
  };

  return (
    <div className="w-full h-full bg-[#1F0307] text-[#FBF4EA] flex flex-col justify-between p-3.5 pt-7 relative overflow-hidden">
      {/* Blurred Video Background */}
      <img
        src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=400&q=80"
        alt=""
        className="absolute inset-0 w-full h-full object-cover filter blur-sm opacity-30"
      />
      <div className="absolute inset-0 bg-black/60" />

      {/* Top Header */}
      <div className="flex items-center justify-between px-1 relative z-10">
        <button onClick={onBack} className="p-1 hover:opacity-80">
          <ChevronLeft className="w-5 h-5 text-[#F9DF8D]" />
        </button>
        <span className="font-serif text-xs font-bold text-[#F9DF8D] tracking-wide">
          Feedback
        </span>
        <div className="w-5" />
      </div>

      {/* Center Floating Rating Modal Card */}
      <div className="my-auto relative z-10 bg-[#FFF9F2] text-[#2A0409] rounded-3xl p-5 shadow-2xl border-2 border-[#D4AF37] text-center space-y-4">
        {/* Namaste Logo Icon */}
        <div className="flex flex-col items-center">
          <span className="text-3xl">🙏</span>
          <span
            className="text-sm font-bold text-[#6B0F1A] mt-0.5"
            style={{ fontFamily: "'Rozha One', serif" }}
          >
            Pehle Aap
          </span>
        </div>

        {/* 5 Golden 3D Stars Row */}
        <div className="flex items-center justify-center gap-1.5 py-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="transition-transform hover:scale-125 focus:outline-none"
            >
              <Star
                className={`w-7 h-7 drop-shadow-md ${
                  (hoverRating || rating) >= star
                    ? 'text-[#F3C951] fill-[#D4AF37]'
                    : 'text-[#ECD3BA]'
                }`}
              />
            </button>
          ))}
        </div>

        {/* Question Title */}
        <h3 className="font-serif font-bold text-sm text-[#2A0409]">
          How was your experience with Rohan?
        </h3>

        {/* Deep Maroon Submit Rating Pill Button */}
        <button
          onClick={handleSubmit}
          className="w-full py-2.5 rounded-full bg-[#6B0F1A] hover:bg-[#841320] text-[#FBF4EA] font-serif text-xs font-bold tracking-wider shadow-lg shadow-[#6B0F1A]/30 flex items-center justify-center gap-1.5 transition-all active:scale-98"
        >
          {submitted ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
              <span>Thank You! (5⭐ Saved)</span>
            </>
          ) : (
            <span>Submit Rating</span>
          )}
        </button>
      </div>

      {/* Bottom Hint */}
      <div className="relative z-10 text-center text-[10px] text-[#ECD3BA]/70 font-serif">
        ✨ Verified reviews build trust in Lucknow
      </div>
    </div>
  );
};

