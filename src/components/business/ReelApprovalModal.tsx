import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Booking } from '../../types';
import { 
  X, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  RotateCcw, 
  Download, 
  Share2, 
  Sparkles, 
  Copy, 
  Check, 
  Clock,
  Instagram
} from 'lucide-react';

interface ReelApprovalModalProps {
  booking: Booking;
  onClose: () => void;
  onOpenRating: () => void;
}

export const ReelApprovalModal: React.FC<ReelApprovalModalProps> = ({
  booking,
  onClose,
  onOpenRating
}) => {
  const { requestRevision, approveDeliverable } = useApp();
  const deliverable = booking.deliverable;

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [copiedCaption, setCopiedCaption] = useState(false);
  const [showRevisionForm, setShowRevisionForm] = useState(false);
  const [revisionNotes, setRevisionNotes] = useState('');
  const [revisionTimestamp, setRevisionTimestamp] = useState('0:14');

  if (!deliverable) return null;

  const handleCopyCaption = () => {
    const text = `${deliverable.caption}\n\n${deliverable.suggestedHashtags.join(' ')}`;
    navigator.clipboard?.writeText(text);
    setCopiedCaption(true);
    setTimeout(() => setCopiedCaption(false), 2000);
  };

  const handleSendRevision = (e: React.FormEvent) => {
    e.preventDefault();
    if (!revisionNotes.trim()) return;
    requestRevision(booking.id, `[Timestamp: ${revisionTimestamp}] ${revisionNotes}`);
    setShowRevisionForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="relative bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[92vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: 9:16 Vertical Reel Player Simulator */}
        <div className="w-full md:w-5/12 bg-black flex items-center justify-center p-4 relative group">
          <div className="relative w-full max-w-[280px] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl border-2 border-slate-800 bg-slate-950 flex flex-col justify-between">
            {/* Reel Video Background (simulated with poster or looping sample) */}
            <video
              src={deliverable.videoUrl}
              poster={deliverable.thumbnailUrl}
              className="absolute inset-0 w-full h-full object-cover"
              loop
              muted={isMuted}
              autoPlay={isPlaying}
              playsInline
              onClick={() => setIsPlaying(!isPlaying)}
            />

            {/* Top Reel Overlay */}
            <div className="relative z-10 p-3 flex items-center justify-between bg-gradient-to-b from-black/70 to-transparent">
              <span className="text-[10px] font-bold text-white bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-md">
                Pehle Aap 9:16 HD
              </span>
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-1 rounded-full bg-black/40 text-white"
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Center Play/Pause button */}
            {!isPlaying && (
              <button
                onClick={() => setIsPlaying(true)}
                className="relative z-10 self-center w-14 h-14 rounded-full bg-orange-500/90 text-white flex items-center justify-center shadow-xl transform transition-transform hover:scale-110"
              >
                <Play className="w-6 h-6 fill-white ml-1" />
              </button>
            )}

            {/* Bottom Reel Overlay: Instagram style */}
            <div className="relative z-10 p-3 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-white space-y-1">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xs">{booking.instagramHandle}</span>
                <span className="text-[10px] bg-orange-500 px-1.5 py-0.2 rounded font-semibold">Creator Edit</span>
              </div>
              <p className="text-[11px] line-clamp-2 text-slate-200">
                {deliverable.caption}
              </p>
              <div className="text-[10px] text-orange-300 font-medium flex items-center gap-1">
                <span>🎵 Trending Lakhnavi Audio</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Actions, Captions & Approval Flow */}
        <div className="w-full md:w-7/12 p-6 flex flex-col justify-between overflow-y-auto space-y-6">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                  Version {deliverable.version}.0 Delivered
                </span>
                <span className="text-xs text-slate-400">• 24-48h SLA Completed</span>
              </div>
              <h2 className="text-xl font-black text-white mt-1">
                Review & Approve Your Reel
              </h2>
              <p className="text-xs text-slate-400">
                Delivered on {deliverable.uploadedAt}. You get 1 free revision with timestamped notes.
              </p>
            </div>

            {/* Caption & Hashtag Box */}
            <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Instagram Caption & Tags
                </span>
                <button
                  onClick={handleCopyCaption}
                  className="flex items-center gap-1 text-[11px] text-orange-400 hover:text-orange-300 font-bold"
                >
                  {copiedCaption ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCaption ? 'Copied!' : 'Copy All'}</span>
                </button>
              </div>

              <p className="text-xs text-slate-200 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800 font-sans">
                {deliverable.caption}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {deliverable.suggestedHashtags.map((tag, i) => (
                  <span key={i} className="text-[10px] text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Revision Request Section */}
            {showRevisionForm ? (
              <form onSubmit={handleSendRevision} className="bg-slate-800/90 border border-amber-500/40 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-amber-300">
                  <span className="flex items-center gap-1">
                    <RotateCcw className="w-3.5 h-3.5" /> Request 1 Free Revision
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowRevisionForm(false)}
                    className="text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-1">
                    <label className="block text-[10px] text-slate-300 mb-1">Timestamp</label>
                    <input
                      type="text"
                      value={revisionTimestamp}
                      onChange={e => setRevisionTimestamp(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                      placeholder="e.g. 0:14"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[10px] text-slate-300 mb-1">What to adjust?</label>
                    <input
                      type="text"
                      value={revisionNotes}
                      onChange={e => setRevisionNotes(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                      placeholder="e.g. Lower music volume, trim 2s intro"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs rounded-xl transition-all"
                >
                  Submit Revision Request to Creator
                </button>
              </form>
            ) : null}
          </div>

          {/* Action Bar */}
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  onClose();
                  onOpenRating();
                }}
                className="py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-extrabold text-xs shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all transform active:scale-95"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Approve & Release ₹{booking.creatorPayout}</span>
              </button>

              {!showRevisionForm && (
                <button
                  onClick={() => setShowRevisionForm(true)}
                  className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 flex items-center justify-center gap-2 transition-all"
                >
                  <RotateCcw className="w-4 h-4 text-amber-400" />
                  <span>Request Revision</span>
                </button>
              )}
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <a
                href={deliverable.videoUrl}
                download="pehle-aap-reel.mp4"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Download className="w-3.5 h-3.5" /> Download 1080p HD
              </a>
              <span className="flex items-center gap-1.5 text-pink-400">
                <Instagram className="w-3.5 h-3.5" /> Share to Instagram
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

