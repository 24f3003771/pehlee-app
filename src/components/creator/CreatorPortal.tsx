import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Creator, Booking } from '../../types';
import { GigAlertCard } from './GigAlertCard';
import { ActiveShootWorkflow } from './ActiveShootWorkflow';
import { DeliverableUploadModal } from './DeliverableUploadModal';
import { CreatorEarnings } from './CreatorEarnings';
import { InAppChat } from '../business/InAppChat';
import { 
  Video, 
  MapPin, 
  Wallet, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  Camera, 
  User,
  Star
} from 'lucide-react';

export const CreatorPortal: React.FC = () => {
  const { 
    creators, 
    bookings, 
    acceptGig, 
    cancelBooking,
    activeBookingId, 
    setActiveBookingId 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'gigs' | 'active-shoot' | 'earnings' | 'profile'>('gigs');
  const [selectedCreatorId, setSelectedCreatorId] = useState<string>(creators[0].id);
  const [showDeliverModal, setShowDeliverModal] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const currentCreator = creators.find(c => c.id === selectedCreatorId) || creators[0];

  // Bookings searching for creators (Gigs available to accept)
  const availableGigs = bookings.filter(b => b.status === 'SEARCHING');

  // Bookings assigned to this creator
  const assignedGigs = bookings.filter(b => b.matchedCreatorId === currentCreator.id);
  const currentShoot = assignedGigs.find(b => b.id === activeBookingId) || assignedGigs[0];

  const handleAcceptGig = (bookingId: string) => {
    acceptGig(bookingId, currentCreator.id);
    setActiveBookingId(bookingId);
    setActiveTab('active-shoot');
  };

  const handleDeclineGig = (bookingId: string) => {
    // Passes to next creator in pool
  };

  return (
    <div className="space-y-6">
      {/* Creator Top Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={currentCreator.avatar}
              alt={currentCreator.name}
              className="w-12 h-12 rounded-xl object-cover border-2 border-purple-500 shadow-md"
            />
            {currentCreator.verified && (
              <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-0.5 rounded-full ring-2 ring-slate-900">
                <ShieldCheck className="w-3 h-3" />
              </span>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-extrabold text-white">{currentCreator.name}</h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                {currentCreator.tier}
              </span>
              <span className="text-xs text-amber-400 font-bold flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                {currentCreator.rating}
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-orange-400" />
              Lucknow Zones: {currentCreator.serviceAreas.join(', ')}
            </p>
          </div>
        </div>

        {/* Creator Identity Switcher (for testing different creator profiles) */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Simulate Creator:</div>
            <select
              value={selectedCreatorId}
              onChange={e => setSelectedCreatorId(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-xs font-semibold text-white px-2 py-1 rounded-lg focus:outline-none"
            >
              {creators.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.tier})
                </option>
              ))}
            </select>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('gigs')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'gigs'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Gigs</span>
              {availableGigs.length > 0 && (
                <span className="w-2 h-2 rounded-full bg-orange-400 animate-ping ml-1" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('active-shoot')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'active-shoot'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Active Shoot</span>
            </button>

            <button
              onClick={() => setActiveTab('earnings')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'earnings'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Wallet className="w-3.5 h-3.5" />
              <span>Earnings</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'profile'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Portfolio</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tab: Gigs Radar */}
      {activeTab === 'gigs' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-orange-400" />
              <span>Nearby Lucknow Gigs Matching Your Skills & Equipment</span>
            </h3>
            <span className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded">
              {availableGigs.length} Active Broadcast(s)
            </span>
          </div>

          {availableGigs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {availableGigs.map(b => (
                <GigAlertCard
                  key={b.id}
                  booking={b}
                  creator={currentCreator}
                  onAccept={handleAcceptGig}
                  onDecline={handleDeclineGig}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-slate-900/60 rounded-3xl border border-slate-800 space-y-3">
              <Clock className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-white">No New Gigs Pending Acceptance</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                You're in the priority dispatch pool for {currentCreator.serviceAreas.join(', ')}. Push notifications & WhatsApp alerts will ring when a business books!
              </p>
            </div>
          )}
        </div>
      )}

      {/* Tab: Active Shoot Workflow */}
      {activeTab === 'active-shoot' && (
        <div>
          {currentShoot ? (
            <ActiveShootWorkflow
              booking={currentShoot}
              onOpenChat={() => setShowChat(true)}
              onOpenDeliverModal={() => setShowDeliverModal(true)}
            />
          ) : (
            <div className="text-center py-16 bg-slate-900/60 rounded-3xl border border-slate-800 space-y-3">
              <Video className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-white">No Assigned Shoot In Progress</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Check the "Gigs" tab to accept an incoming shoot in your Lucknow service area.
              </p>
              <button
                onClick={() => setActiveTab('gigs')}
                className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl"
              >
                View Available Gigs
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tab: Earnings & UPI Payouts */}
      {activeTab === 'earnings' && (
        <CreatorEarnings creator={currentCreator} />
      )}

      {/* Tab: Creator Portfolio & Equipment */}
      {activeTab === 'profile' && (
        <div className="space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div>
              <h3 className="text-base font-bold text-white">Equipment & Creator Specs</h3>
              <p className="text-xs text-slate-400">Verified gear checked during onboarding</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-purple-400">🎥 Camera & Smartphone</span>
                <ul className="text-xs text-slate-300 space-y-1">
                  {currentCreator.equipment.map((eq, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{eq}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-orange-400">🌟 Creator Skills</span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {currentCreator.skills.map((sk, i) => (
                    <span key={i} className="text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded-lg">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sample Reels Grid */}
            <div>
              <h4 className="text-sm font-bold text-white mb-3">Lucknow Sample Portfolio Reels</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentCreator.sampleReels.map((sr, i) => (
                  <div key={i} className="bg-slate-950 rounded-xl overflow-hidden border border-slate-800 flex gap-3 p-3 items-center">
                    <img src={sr.thumbnail} alt={sr.title} className="w-16 h-20 rounded-lg object-cover" />
                    <div>
                      <h5 className="text-xs font-bold text-white">{sr.title}</h5>
                      <span className="text-[10px] text-orange-400 font-semibold">{sr.views} views</span>
                      <p className="text-[10px] text-emerald-400 mt-1">✓ Admin Verified Quality</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Deliverable Upload Modal */}
      {showDeliverModal && currentShoot && (
        <DeliverableUploadModal
          booking={currentShoot}
          onClose={() => setShowDeliverModal(false)}
        />
      )}

      {/* In-App Chat Modal */}
      {showChat && currentShoot && (
        <InAppChat
          booking={currentShoot}
          currentRole="creator"
          onClose={() => setShowChat(false)}
        />
      )}
    </div>
  );
};

