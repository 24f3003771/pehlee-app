import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Booking } from '../../types';
import { 
  CheckCircle2, 
  MapPin, 
  Camera, 
  UploadCloud, 
  Film, 
  RotateCcw, 
  Clock, 
  MessageSquare, 
  Sparkles, 
  AlertCircle,
  FileCheck
} from 'lucide-react';

interface ActiveShootWorkflowProps {
  booking: Booking;
  onOpenChat: () => void;
  onOpenDeliverModal: () => void;
}

export const ActiveShootWorkflow: React.FC<ActiveShootWorkflowProps> = ({
  booking,
  onOpenChat,
  onOpenDeliverModal
}) => {
  const { creatorCheckIn, creatorUploadRaw } = useApp();
  
  const [checklist, setChecklist] = useState({
    micCheck: false,
    lightingCheck: false,
    hookVariants: false,
    bRollAtmosphere: false,
    clientSignoff: false
  });

  const [isUploadingRaw, setIsUploadingRaw] = useState(false);
  const [rawUploadProgress, setRawUploadProgress] = useState(0);

  const toggleCheck = (key: keyof typeof checklist) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSimulateRawUpload = () => {
    setIsUploadingRaw(true);
    setRawUploadProgress(15);
    
    const interval = setInterval(() => {
      setRawUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploadingRaw(false);
          creatorUploadRaw(booking.id, 16);
          return 100;
        }
        return prev + 25;
      });
    }, 400);
  };

  const isCheckedIn = booking.status !== 'CONFIRMED' && booking.status !== 'ON_THE_WAY';

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Revision Alert Header (if requested) */}
      {booking.status === 'REVISION_REQUESTED' && booking.deliverable?.revisionNotes && (
        <div className="bg-amber-950/80 border-2 border-amber-500 rounded-2xl p-5 shadow-xl flex items-start gap-3 text-amber-200">
          <AlertCircle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-extrabold text-sm text-white">
              Customer Requested 1 Free Revision (SLA: Submit within 24h)
            </h4>
            <p className="text-xs text-amber-200 leading-relaxed font-mono bg-slate-950/50 p-2.5 rounded-xl border border-amber-500/30">
              {booking.deliverable.revisionNotes}
            </p>
            <button
              onClick={onOpenDeliverModal}
              className="mt-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs rounded-xl transition-all"
            >
              Upload Revised 9:16 Reel (v{booking.deliverable.version}) →
            </button>
          </div>
        </div>
      )}

      {/* Main Gig Details Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-orange-400 bg-orange-500/10 px-2.5 py-0.5 rounded-full border border-orange-500/20">
              {booking.bookingNumber}
            </span>
            <span className="text-xs text-slate-400">• {booking.category}</span>
          </div>
          <h2 className="text-xl font-black text-white mt-1">{booking.businessName}</h2>
          <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
            <MapPin className="w-3.5 h-3.5 text-orange-400" />
            {booking.address} ({booking.area})
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenChat}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700 shadow"
          >
            <MessageSquare className="w-4 h-4 text-orange-400" />
            <span>Chat with Owner</span>
          </button>

          <div className="bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 text-right">
            <div className="text-[10px] uppercase font-bold text-slate-400">Your Payout</div>
            <div className="text-base font-black text-emerald-400">₹{booking.creatorPayout}</div>
          </div>
        </div>
      </div>

      {/* Action Step 1: GPS Check-in */}
      {!isCheckedIn && (
        <div className="bg-gradient-to-r from-orange-950/40 via-amber-950/30 to-slate-900 border border-orange-500/40 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <MapPin className="w-5 h-5 text-orange-400" />
              <span>Step 1: Arrive & GPS Check-In</span>
            </div>
            <span className="text-xs text-orange-300 font-mono">Location Match Required</span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            When you reach <strong className="text-white">{booking.address}</strong>, tap the button below to verify your GPS location and notify the business owner.
          </p>

          <button
            onClick={() => creatorCheckIn(booking.id)}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-xs shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 transition-all transform active:scale-98"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>I Have Arrived at Location (Verify Check-In)</span>
          </button>
        </div>
      )}

      {/* Action Step 2: Shoot Checklist */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <Camera className="w-4 h-4 text-orange-400" />
            <span>Shoot Checklist & Lakhnavi Quality Rules</span>
          </div>
          <span className="text-[11px] text-slate-400">Pehle Aap Standard Operating Procedure</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { key: 'lightingCheck', label: '1. Soft Warm Lighting setup & white balance adjusted' },
            { key: 'micCheck', label: '2. Wireless Mic clipped to speaker & sound test verified' },
            { key: 'hookVariants', label: '3. Captured 3 high-energy hook variations in first 5 mins' },
            { key: 'bRollAtmosphere', label: '4. Captured slow-motion B-roll of Awadhi food / product' },
            { key: 'clientSignoff', label: '5. Showed best clips on screen to business owner' }
          ].map(item => {
            const checked = checklist[item.key as keyof typeof checklist];
            return (
              <div
                key={item.key}
                onClick={() => toggleCheck(item.key as keyof typeof checklist)}
                className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-start gap-2.5 ${
                  checked
                    ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-100'
                    : 'bg-slate-800/40 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                  checked ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-600'
                }`}>
                  {checked && <CheckCircle2 className="w-3.5 h-3.5" />}
                </div>
                <span>{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Step 3: Raw Footage Upload Simulator */}
      {isCheckedIn && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <UploadCloud className="w-4 h-4 text-blue-400" />
              <span>Step 2: Sync Raw Clips to Cloud</span>
            </div>
            <span className="text-xs text-slate-400">
              {booking.rawClipsCount ? `${booking.rawClipsCount} clips synced` : 'Pending Upload'}
            </span>
          </div>

          <p className="text-xs text-slate-300">
            Resumable background upload. Ensures footage is safely backed up before post-production editing starts.
          </p>

          {isUploadingRaw ? (
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-300">
                <span>Uploading 16 4K clips...</span>
                <span>{rawUploadProgress}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-blue-500 h-full transition-all duration-300"
                  style={{ width: `${rawUploadProgress}%` }}
                />
              </div>
            </div>
          ) : (
            <button
              onClick={handleSimulateRawUpload}
              className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 flex items-center gap-2 transition-all"
            >
              <UploadCloud className="w-4 h-4 text-blue-400" />
              <span>{booking.rawClipsCount ? 'Re-upload / Add More Raw Clips' : 'Upload 16 Raw Footage Clips'}</span>
            </button>
          )}
        </div>
      )}

      {/* Action Step 4: Final 9:16 Reel Submission */}
      {isCheckedIn && (
        <div className="bg-gradient-to-r from-purple-950/40 via-slate-900 to-slate-900 border border-purple-500/40 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <Film className="w-5 h-5 text-purple-400" />
              <span>Step 3: Deliver Final 9:16 Postable Reel</span>
            </div>
            <span className="text-xs text-purple-300 font-bold bg-purple-500/20 px-2.5 py-0.5 rounded-full">
              SLA: 24–48 Hours
            </span>
          </div>

          <p className="text-xs text-slate-300">
            Submit your edited vertical 9:16 reel with color grading, music sync, suggested caption, and trending Lucknow hashtags.
          </p>

          <button
            onClick={onOpenDeliverModal}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs shadow-xl shadow-purple-500/20 flex items-center justify-center gap-2 transition-all transform active:scale-98"
          >
            <Sparkles className="w-4 h-4" />
            <span>Open Delivery Studio (Upload Final Reel)</span>
          </button>
        </div>
      )}
    </div>
  );
};

