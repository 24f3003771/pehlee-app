import React from 'react';
import { useApp } from '../../context/AppContext';
import { Creator } from '../../types';
import { 
  ShieldCheck, 
  Check, 
  X, 
  Camera, 
  MapPin, 
  Sparkles, 
  Video, 
  FileText,
  Star
} from 'lucide-react';

export const CreatorVerificationQueue: React.FC = () => {
  const { creators, verifyCreator } = useApp();

  const pendingCreators = creators.filter(c => c.verificationStatus === 'PENDING');
  const verifiedCreators = creators.filter(c => c.verificationStatus === 'VERIFIED');

  return (
    <div className="space-y-6">
      {/* Pending Applications Section */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
            <h3 className="text-base font-bold text-white">Pending Creator Verifications</h3>
          </div>
          <span className="text-xs text-amber-400 font-bold bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/30">
            {pendingCreators.length} Waiting for Review
          </span>
        </div>

        {pendingCreators.length > 0 ? (
          <div className="space-y-4">
            {pendingCreators.map(creator => (
              <div
                key={creator.id}
                className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={creator.avatar}
                    alt={creator.name}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-amber-500/50"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-extrabold text-white">{creator.name}</h4>
                      <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
                        {creator.phone}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-orange-400" />
                      Zones: {creator.serviceAreas.join(', ')}
                    </p>

                    <div className="text-[11px] text-slate-300 mt-2 flex flex-wrap gap-x-3 gap-y-1">
                      <span>📸 Gear: <strong>{creator.equipment.join(', ')}</strong></span>
                      <span>💡 Skills: <strong>{creator.skills.join(', ')}</strong></span>
                    </div>

                    <div className="mt-2 flex items-center gap-2 text-[10px] text-blue-400">
                      <Video className="w-3.5 h-3.5" />
                      <span>Submitted Sample Reel: "{creator.sampleReels[0]?.title}" (Awadhi Food)</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-center">
                  <button
                    onClick={() => verifyCreator(creator.id, false)}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-400 text-xs font-bold border border-rose-500/20 flex items-center gap-1.5 transition-all"
                  >
                    <X className="w-3.5 h-3.5" /> Reject
                  </button>
                  <button
                    onClick={() => verifyCreator(creator.id, true)}
                    className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-extrabold shadow-lg shadow-emerald-500/20 flex items-center gap-1.5 transition-all"
                  >
                    <Check className="w-4 h-4" /> Approve & Activate
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-xs text-slate-400">
            No pending creator applications. All Lucknow creators are verified!
          </div>
        )}
      </div>

      {/* Verified Creator Roster */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Active Lucknow Creator Pool ({verifiedCreators.length} Active)</span>
          </h3>
          <span className="text-xs text-slate-400">Target for Pilot: 40 Creators</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {verifiedCreators.map(c => (
            <div
              key={c.id}
              className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <img src={c.avatar} alt="" className="w-10 h-10 rounded-xl object-cover" />
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1">
                    <span>{c.name}</span>
                    <span className="text-[10px] text-amber-400">★ {c.rating}</span>
                  </div>
                  <div className="text-[10px] text-slate-400">{c.tier} • {c.completedShoots} shoots</div>
                  <div className="text-[10px] text-emerald-400 mt-0.5">UPI: {c.upiId}</div>
                </div>
              </div>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-bold">
                Active
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

