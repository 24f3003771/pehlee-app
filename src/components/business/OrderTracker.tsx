import React from 'react';
import { useApp } from '../../context/AppContext';
import { Booking, BookingStatus } from '../../types';
import { 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  MessageSquare, 
  Sparkles, 
  Camera, 
  UploadCloud, 
  Film, 
  Star,
  ExternalLink
} from 'lucide-react';

interface OrderTrackerProps {
  booking: Booking;
  onOpenChat: () => void;
  onOpenDeliverable: () => void;
}

export const OrderTracker: React.FC<OrderTrackerProps> = ({
  booking,
  onOpenChat,
  onOpenDeliverable
}) => {
  const { advanceBookingStatus } = useApp();
  const creator = booking.assignedCreator;

  const timelineSteps: { key: BookingStatus; label: string; icon: React.ReactNode; desc: string }[] = [
    {
      key: 'CONFIRMED',
      label: 'Creator Confirmed',
      icon: <CheckCircle2 className="w-4 h-4" />,
      desc: 'Assigned within 30-min SLA'
    },
    {
      key: 'ON_THE_WAY',
      label: 'On the Way',
      icon: <MapPin className="w-4 h-4" />,
      desc: `Navigating to ${booking.area}`
    },
    {
      key: 'ARRIVED',
      label: 'Arrived & Checked In',
      icon: <CheckCircle2 className="w-4 h-4" />,
      desc: booking.checkInTime ? `Checked in at ${booking.checkInTime}` : 'GPS verified on-site'
    },
    {
      key: 'SHOOTING',
      label: 'Shooting in Progress',
      icon: <Camera className="w-4 h-4" />,
      desc: 'Recording angles & hooks'
    },
    {
      key: 'UPLOADED',
      label: 'Footage Uploaded',
      icon: <UploadCloud className="w-4 h-4" />,
      desc: `${booking.rawClipsCount || 12} raw clips synced to cloud`
    },
    {
      key: 'EDITING',
      label: '9:16 Editing & Audio',
      icon: <Film className="w-4 h-4" />,
      desc: 'Color grading & caption sync'
    },
    {
      key: 'DELIVERED',
      label: 'Reel Delivered',
      icon: <Sparkles className="w-4 h-4" />,
      desc: 'Ready for preview & approval'
    }
  ];

  // Helper to determine step status
  const getStepStatus = (stepKey: BookingStatus) => {
    const order: BookingStatus[] = [
      'CONFIRMED',
      'ON_THE_WAY',
      'ARRIVED',
      'SHOOTING',
      'UPLOADED',
      'EDITING',
      'DELIVERED',
      'APPROVED'
    ];
    
    // Map current booking status to progression index
    let currentIdx = order.indexOf(booking.status);
    if (booking.status === 'REVISION_REQUESTED') currentIdx = order.indexOf('EDITING');
    const stepIdx = order.indexOf(stepKey);

    if (currentIdx > stepIdx) return 'completed';
    if (currentIdx === stepIdx) return 'current';
    return 'upcoming';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Overview Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-orange-400 bg-orange-500/10 px-2.5 py-0.5 rounded-full border border-orange-500/20">
              {booking.bookingNumber}
            </span>
            <span className="text-xs text-slate-400">• {booking.packageName}</span>
          </div>
          <h2 className="text-xl font-black text-white mt-1">
            {booking.businessName}
          </h2>
          <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
            <MapPin className="w-3.5 h-3.5 text-orange-400" />
            {booking.address}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenChat}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700 shadow transition-all"
          >
            <MessageSquare className="w-4 h-4 text-orange-400" />
            <span>Chat (Masked)</span>
          </button>

          {(booking.status === 'DELIVERED' || booking.status === 'APPROVED' || booking.status === 'REVISION_REQUESTED') && (
            <button
              onClick={onOpenDeliverable}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-xs font-extrabold shadow-lg shadow-orange-500/20 transition-all"
            >
              <Film className="w-4 h-4" />
              <span>Review 9:16 Reel</span>
            </button>
          )}

          {booking.status !== 'APPROVED' && booking.status !== 'CANCELLED' && (
            <button
              onClick={() => advanceBookingStatus(booking.id)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 text-orange-400 hover:text-orange-300 text-[11px] font-bold border border-orange-500/30"
              title="Fast Forward Simulation"
            >
              <span>Next Stage →</span>
            </button>
          )}
        </div>
      </div>

      {/* Creator Profile Spotlight */}
      {creator && (
        <div className="bg-gradient-to-r from-slate-900 to-slate-850 border border-slate-800 rounded-2xl p-6 shadow-lg">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={creator.avatar}
                  alt={creator.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-orange-500 shadow-md"
                />
                <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-0.5 rounded-full ring-2 ring-slate-900">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-extrabold text-white">{creator.name}</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
                    {creator.tier}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-300 mt-1">
                  <span className="flex items-center gap-1 text-amber-400 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    {creator.rating} ({creator.reviewCount} reviews)
                  </span>
                  <span>•</span>
                  <span className="text-emerald-400 font-medium">
                    {creator.onTimeRate}% on-time arrival
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  📸 Equipment: {creator.equipment.slice(0, 2).join(', ')}
                </div>
              </div>
            </div>

            <div className="text-right sm:border-l sm:border-slate-800 sm:pl-6 space-y-1">
              <div className="text-[10px] uppercase font-bold text-slate-400">Masked Phone Protection</div>
              <div className="text-xs font-mono font-bold text-white flex items-center gap-1.5 justify-end">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                +91 98XXX XXXXX
              </div>
              <p className="text-[10px] text-slate-400">Direct audio bridge enabled during shoot window</p>
            </div>
          </div>
        </div>
      )}

      {/* Progress Timeline */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg">
        <h3 className="text-sm font-bold text-white mb-6 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-orange-400" />
            Live Shoot & Delivery Progression
          </span>
          <span className="text-xs font-normal text-slate-400">
            SLA: Final 9:16 Reel within 24-48 Hours
          </span>
        </h3>

        <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
          {timelineSteps.map((step, idx) => {
            const status = getStepStatus(step.key);
            return (
              <div key={idx} className="relative flex items-start gap-4 group">
                {/* Node icon */}
                <div
                  className={`absolute -left-6 mt-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    status === 'completed'
                      ? 'bg-emerald-500 text-white ring-4 ring-emerald-500/20'
                      : status === 'current'
                      ? 'bg-orange-500 text-white ring-4 ring-orange-500/30 animate-pulse'
                      : 'bg-slate-800 text-slate-500 ring-4 ring-slate-900'
                  }`}
                >
                  {status === 'completed' ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4
                      className={`text-xs font-bold ${
                        status === 'current'
                          ? 'text-orange-400 text-sm font-black'
                          : status === 'completed'
                          ? 'text-white'
                          : 'text-slate-500'
                      }`}
                    >
                      {step.label}
                    </h4>
                    {status === 'current' && (
                      <span className="text-[10px] bg-orange-500/20 text-orange-300 font-bold px-2 py-0.5 rounded animate-pulse">
                        In Progress
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

