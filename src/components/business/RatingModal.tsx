import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Booking } from '../../types';
import { Star, X, Sparkles, CheckCircle2 } from 'lucide-react';

interface RatingModalProps {
  booking: Booking;
  onClose: () => void;
}

export const RatingModal: React.FC<RatingModalProps> = ({ booking, onClose }) => {
  const { approveDeliverable } = useApp();
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('शानदार काम! Aman arrived on time and captured our restaurant vibe perfectly.');
  const [selectedTags, setSelectedTags] = useState<string[]>([
    'Punctual',
    'Creative Angles',
    'Lakhnavi Tehzeeb'
  ]);

  const tagOptions = [
    'Punctual ⏱️',
    'Creative Angles 📸',
    'Lakhnavi Tehzeeb 🤝',
    'Great Lighting 💡',
    'Crisp Audio 🎙️',
    'Super Fast 48h Delivery ⚡'
  ];

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    approveDeliverable(booking.id, rating, comment, selectedTags);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-white bg-slate-800"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto text-xl">
            ⭐
          </div>
          <h2 className="text-xl font-extrabold text-white">
            Rate Your Creator Shoot Experience
          </h2>
          <p className="text-xs text-slate-400">
            Your review helps <span className="text-white font-semibold">{booking.assignedCreator?.name}</span> unlock higher Lucknow tier rewards & steady gigs.
          </p>
        </div>

        {/* 5 Star Interactive Selector */}
        <div className="flex items-center justify-center gap-2 py-2">
          {[1, 2, 3, 4, 5].map(star => (
            <button
              type="button"
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="p-1 transition-transform hover:scale-125"
            >
              <Star
                className={`w-8 h-8 ${
                  (hoverRating || rating) >= star
                    ? 'text-amber-400 fill-amber-400 drop-shadow'
                    : 'text-slate-700'
                }`}
              />
            </button>
          ))}
        </div>

        {/* Quick Review Tag Chips */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-2 text-center">
            What did you like the most?
          </label>
          <div className="flex flex-wrap gap-2 justify-center">
            {tagOptions.map(tag => {
              const cleanTag = tag.split(' ')[0];
              const isSelected = selectedTags.some(t => t.includes(cleanTag));
              return (
                <button
                  type="button"
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Comment Input */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Short Review for Creator's Lucknow Profile:
          </label>
          <textarea
            rows={3}
            value={comment}
            onChange={e => setComment(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-500"
            placeholder="Share feedback on lighting, communication, reel turnaround..."
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-xs shadow-xl shadow-orange-500/20 flex items-center justify-center gap-2 transition-all transform active:scale-95"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Submit Review & Release Creator Escrow Payout</span>
        </button>
      </div>
    </div>
  );
};

