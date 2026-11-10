import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Booking, DeliverableData } from '../../types';
import { 
  X, 
  UploadCloud, 
  Film, 
  Sparkles, 
  Hash, 
  CheckCircle2, 
  Video 
} from 'lucide-react';

interface DeliverableUploadModalProps {
  booking: Booking;
  onClose: () => void;
}

export const DeliverableUploadModal: React.FC<DeliverableUploadModalProps> = ({
  booking,
  onClose
}) => {
  const { creatorDeliverReel } = useApp();

  const [caption, setCaption] = useState(
    `✨ Experience the authentic royal taste of Lucknow at ${booking.businessName}! From savory sizzlers to iconic recipes, taste the legacy. 📍 ${booking.area}, Lucknow.`
  );
  const [hashtags, setHashtags] = useState(
    `#LucknowDiaries #${booking.area.replace(/\s+/g, '')} #PehleAapReels #LucknowFoodies #AwadhiCuisine`
  );
  const [durationSec, setDurationSec] = useState(30);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const deliverable: DeliverableData = {
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80',
      caption: caption.trim(),
      suggestedHashtags: hashtags.split(' ').filter(h => h.startsWith('#')),
      resolution: '1080x1920 (9:16 Vertical HD)',
      durationSec,
      version: (booking.deliverable?.version || 0) + 1,
      uploadedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setTimeout(() => {
      creatorDeliverReel(booking.id, deliverable);
      setIsSubmitting(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-white bg-slate-800"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center space-y-1">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center mx-auto text-xl">
            🎬
          </div>
          <h2 className="text-xl font-extrabold text-white">
            Deliver Final 9:16 Reel
          </h2>
          <p className="text-xs text-slate-400">
            Order #{booking.bookingNumber} • {booking.businessName}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* File Upload Simulator Box */}
          <div className="border-2 border-dashed border-slate-700 hover:border-purple-500 rounded-2xl p-6 text-center cursor-pointer transition-colors bg-slate-950/50">
            <Video className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <p className="text-xs font-bold text-white">pehle_aap_final_reel_1080p.mp4 (48.2 MB)</p>
            <p className="text-[10px] text-emerald-400 mt-1">✓ 9:16 Vertical 60fps Formatted</p>
          </div>

          {/* Reel Duration */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Reel Duration (Seconds)
            </label>
            <input
              type="number"
              value={durationSec}
              onChange={e => setDurationSec(Number(e.target.value))}
              min={15}
              max={90}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Caption */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Instagram Caption for Business:
            </label>
            <textarea
              rows={3}
              value={caption}
              onChange={e => setCaption(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-purple-500"
              required
            />
          </div>

          {/* Suggested Hashtags */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Trending Lucknow Hashtags:
            </label>
            <input
              type="text"
              value={hashtags}
              onChange={e => setHashtags(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs shadow-xl shadow-purple-500/25 flex items-center justify-center gap-2 transition-all"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isSubmitting ? 'Delivering...' : 'Submit Reel for Customer Approval'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

