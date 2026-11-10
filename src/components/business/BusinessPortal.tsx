import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PackagePlan, BriefData, Booking } from '../../types';
import { PackageSelector } from './PackageSelector';
import { BriefBuilder } from './BriefBuilder';
import { LiveMatchingScreen } from './LiveMatchingScreen';
import { OrderTracker } from './OrderTracker';
import { ReelApprovalModal } from './ReelApprovalModal';
import { RatingModal } from './RatingModal';
import { InAppChat } from './InAppChat';
import { 
  PlusCircle, 
  Clock, 
  Film, 
  Receipt, 
  MapPin, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  RotateCcw
} from 'lucide-react';

export const BusinessPortal: React.FC = () => {
  const { 
    bookings, 
    activeBookingId, 
    setActiveBookingId, 
    createNewBooking 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'track' | 'new-booking' | 'deliverable' | 'history'>('track');
  
  // Booking creation steps
  const [bookingStep, setBookingStep] = useState<'packages' | 'brief' | 'matching'>('packages');
  const [selectedPackage, setSelectedPackage] = useState<PackagePlan | null>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  
  // Modals
  const [showChat, setShowChat] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);

  const activeBooking = bookings.find(b => b.id === activeBookingId) || bookings[0];

  const handleSelectPackage = (pkg: PackagePlan, addOns: string[]) => {
    setSelectedPackage(pkg);
    setSelectedAddOns(addOns);
    setBookingStep('brief');
  };

  const handleSubmitBrief = (
    brief: BriefData, 
    slot: string, 
    isASAP: boolean, 
    paymentMethod: 'UPI (GPay/PhonePe)' | 'Razorpay' | 'Credit Card'
  ) => {
    if (!selectedPackage) return;
    const newId = createNewBooking({
      businessName: brief.businessName,
      businessPhone: brief.businessPhone,
      instagramHandle: brief.instagramHandle,
      area: brief.area,
      address: brief.address,
      category: brief.category,
      packageId: selectedPackage.id,
      packageName: selectedPackage.name,
      price: selectedPackage.price,
      slot,
      isASAP,
      paymentMethod,
      brief
    });

    setActiveBookingId(newId);
    setActiveTab('track');
    setBookingStep('packages');
  };

  return (
    <div className="space-y-6">
      {/* Business Sub-Header Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
        <div>
          <h1 className="text-xl font-black text-white flex items-center gap-2">
            <span>Business Hub</span>
            <span className="text-xs bg-orange-500/10 text-orange-400 font-bold px-2 py-0.5 rounded border border-orange-500/20">
              Lucknow Small Business Portal
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Book top-rated creators, track live shoot progression, approve reels with 100% escrow safety.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('track')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'track'
                ? 'bg-orange-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Active Shoot</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('new-booking');
              setBookingStep('packages');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'new-booking'
                ? 'bg-orange-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Book Creator</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'history'
                ? 'bg-orange-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Receipt className="w-3.5 h-3.5" />
            <span>Orders & Invoices</span>
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      {activeTab === 'track' && (
        <div className="space-y-6">
          {activeBooking?.status === 'SEARCHING' ? (
            <LiveMatchingScreen booking={activeBooking} />
          ) : activeBooking ? (
            <OrderTracker
              booking={activeBooking}
              onOpenChat={() => setShowChat(true)}
              onOpenDeliverable={() => setShowApprovalModal(true)}
            />
          ) : (
            <div className="text-center py-16 bg-slate-900/60 rounded-3xl border border-slate-800 space-y-4">
              <Film className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-white">No Active Shoots in Lucknow</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Ready to boost your cafe, boutique, clinic or coaching center? Book your first reel in 30 minutes.
              </p>
              <button
                onClick={() => {
                  setActiveTab('new-booking');
                  setBookingStep('packages');
                }}
                className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-xl shadow-lg transition-all"
              >
                Book a Verified Creator →
              </button>
            </div>
          )}
        </div>
      )}

      {activeTab === 'new-booking' && (
        <div>
          {bookingStep === 'packages' && (
            <PackageSelector onSelectPackage={handleSelectPackage} />
          )}

          {bookingStep === 'brief' && selectedPackage && (
            <BriefBuilder
              selectedPackage={selectedPackage}
              selectedAddOns={selectedAddOns}
              onBack={() => setBookingStep('packages')}
              onSubmitBrief={handleSubmitBrief}
            />
          )}
        </div>
      )}

      {activeTab === 'history' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Receipt className="w-4 h-4 text-orange-400" />
              <span>Past Orders & GST Receipts</span>
            </h3>
            <span className="text-xs text-slate-400">{bookings.length} Total Bookings</span>
          </div>

          <div className="space-y-3">
            {bookings.map(b => (
              <div
                key={b.id}
                onClick={() => {
                  setActiveBookingId(b.id);
                  setActiveTab('track');
                }}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                  activeBookingId === b.id
                    ? 'bg-slate-800/80 border-orange-500/50 shadow'
                    : 'bg-slate-850 border-slate-800 hover:bg-slate-800/60'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{b.bookingNumber}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-orange-400">
                      {b.category}
                    </span>
                    <span className="text-xs text-slate-400">• {b.area}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white mt-1">{b.businessName}</h4>
                  <p className="text-xs text-slate-400">
                    {b.packageName} • {b.slot}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-right">
                  <div>
                    <div className="text-sm font-black text-white">₹{b.price}</div>
                    <div className="text-[10px] text-emerald-400 font-semibold">{b.paymentStatus}</div>
                  </div>
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                    b.status === 'APPROVED' ? 'bg-emerald-500/20 text-emerald-300' :
                    b.status === 'DELIVERED' ? 'bg-purple-500/20 text-purple-300' :
                    b.status === 'SEARCHING' ? 'bg-orange-500/20 text-orange-300' :
                    'bg-blue-500/20 text-blue-300'
                  }`}>
                    {b.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Masked Chat Modal */}
      {showChat && activeBooking && (
        <InAppChat
          booking={activeBooking}
          currentRole="business"
          onClose={() => setShowChat(false)}
        />
      )}

      {/* Reel Approval Modal */}
      {showApprovalModal && activeBooking && (
        <ReelApprovalModal
          booking={activeBooking}
          onClose={() => setShowApprovalModal(false)}
          onOpenRating={() => setShowRatingModal(true)}
        />
      )}

      {/* Rating & Review Modal */}
      {showRatingModal && activeBooking && (
        <RatingModal
          booking={activeBooking}
          onClose={() => setShowRatingModal(false)}
        />
      )}
    </div>
  );
};

