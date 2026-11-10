import React from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { 
  Video, 
  Store, 
  Smartphone, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  FastForward, 
  MapPin,
  CheckCircle2,
  X,
  LayoutGrid
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    role, 
    setRole, 
    bookings, 
    activeBookingId, 
    setActiveBookingId, 
    advanceBookingStatus,
    toasts,
    removeToast
  } = useApp();

  const activeBooking = bookings.find(b => b.id === activeBookingId) || bookings[0];

  const rolesConfig: { id: UserRole; label: string; hindiLabel: string; icon: React.ReactNode; color: string }[] = [
    {
      id: 'showcase',
      label: 'Awadhi 8-Screen UI',
      hindiLabel: 'फोटो जैसा UI ✨',
      icon: <Sparkles className="w-4 h-4 text-[#F9DF8D]" />,
      color: 'from-[#6B0F1A] to-[#45070E] border-2 border-[#D4AF37]'
    },
    {
      id: 'business',
      label: 'Business App',
      hindiLabel: 'दुकानदार / बिजनेस',
      icon: <Store className="w-4 h-4" />,
      color: 'from-[#6B0F1A] to-[#841320]'
    },
    {
      id: 'creator',
      label: 'Creator App',
      hindiLabel: 'लखनऊ क्रिएटर',
      icon: <Video className="w-4 h-4" />,
      color: 'from-[#520B13] to-[#38040E]'
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp Bridge',
      hindiLabel: 'व्हाट्सएप बुकिंग',
      icon: <Smartphone className="w-4 h-4" />,
      color: 'from-[#128C7E] to-[#075E54]'
    },
    {
      id: 'admin',
      label: 'Admin & Ops',
      hindiLabel: 'कंट्रोल रूम',
      icon: <ShieldCheck className="w-4 h-4" />,
      color: 'from-[#2A0409] to-[#1A0306]'
    }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#1A0306]/95 backdrop-blur-md border-b border-[#D4AF37]/30 shadow-2xl">
        {/* Top Mini Banner: Lucknow Heritage & SLA */}
        <div className="bg-gradient-to-r from-[#520B13] via-[#6B0F1A] to-[#520B13] border-b border-[#D4AF37]/20 px-4 py-1 text-xs text-[#FBF4EA] flex flex-wrap items-center justify-between font-serif">
          <div className="flex items-center gap-2">
            <span className="bg-[#D4AF37] text-[#45070E] px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-extrabold shadow-sm">
              Lakhnavi Tehzeeb
            </span>
            <span className="text-[#F9DF8D] font-bold">PEHLE AAP, PHIR REEL.</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline text-xs text-[#ECD3BA]">⚡ 30-Sec/Min Hyperlocal Matching</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline text-xs text-[#ECD3BA]">🎬 24–48h 9:16 Vertical Reel</span>
          </div>
          <div className="flex items-center gap-3 text-[#F9DF8D] text-[11px]">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#D4AF37]" /> Hazratganj • Gomti Nagar • Chowk • Alambagh
            </span>
          </div>
        </div>

        {/* Main Nav Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setRole('showcase')}>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#6B0F1A] to-[#841320] border-2 border-[#D4AF37] flex items-center justify-center shadow-lg shadow-[#D4AF37]/20 text-white font-bold text-xl">
              🙏
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span
                  className="font-bold text-xl tracking-wide text-[#F9DF8D]"
                  style={{ fontFamily: "'Rozha One', serif" }}
                >
                  Pehle Aap
                </span>
                <span className="text-[10px] font-serif font-bold bg-[#D4AF37]/20 text-[#F9DF8D] px-2 py-0.5 rounded-full border border-[#D4AF37]/40">
                  पहले आप
                </span>
              </div>
              <p className="text-[11px] text-[#ECD3BA]/70 font-serif">
                Pehle Aap — Pehle Aap, Phir Reel.
              </p>
            </div>
          </div>

          {/* Role Switcher Tabs */}
          <div className="flex items-center bg-[#2A0409]/90 p-1.5 rounded-2xl border border-[#D4AF37]/40 shadow-inner overflow-x-auto max-w-full">
            {rolesConfig.map((r) => {
              const isActive = role === r.id;
              return (
                <button
                  key={r.id}
                  onClick={() => setRole(r.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? `bg-gradient-to-r ${r.color} text-[#FFF] shadow-md shadow-[#D4AF37]/20 scale-100 ring-1 ring-[#D4AF37]`
                      : 'text-[#ECD3BA]/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {r.icon}
                  <div className="text-left leading-tight">
                    <div className="font-serif">{r.label}</div>
                    <div className="text-[9px] opacity-80 font-normal">{r.hindiLabel}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Live Order Simulation Controls */}
          <div className="hidden lg:flex items-center gap-2 bg-[#2A0409] border border-[#D4AF37]/30 rounded-xl px-3 py-1.5">
            <div className="text-left">
              <div className="text-[10px] uppercase font-bold text-[#F9DF8D] flex items-center gap-1 font-serif">
                <Clock className="w-3 h-3 text-[#D4AF37]" />
                Order:
              </div>
              <select
                value={activeBookingId}
                onChange={(e) => setActiveBookingId(e.target.value)}
                className="bg-transparent text-xs font-semibold text-white focus:outline-none cursor-pointer"
              >
                {bookings.map(b => (
                  <option key={b.id} value={b.id} className="bg-[#2A0409] text-white">
                    {b.id} ({b.businessName.slice(0, 14)})
                  </option>
                ))}
              </select>
            </div>

            {/* Quick Demo Fast Forward Button */}
            {activeBooking && activeBooking.status !== 'APPROVED' && activeBooking.status !== 'CANCELLED' && (
              <button
                onClick={() => advanceBookingStatus(activeBooking.id)}
                title="Simulate Next Workflow Step"
                className="ml-2 flex items-center gap-1 bg-[#D4AF37] hover:bg-[#F3C951] text-[#45070E] text-[11px] font-black px-2.5 py-1.5 rounded-lg shadow transition-all active:scale-95 font-serif"
              >
                <FastForward className="w-3 h-3" />
                <span>Next Step</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Floating Toast Notification Deck */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`pointer-events-auto p-3.5 rounded-xl border shadow-2xl backdrop-blur-md transition-all duration-300 flex items-start justify-between gap-3 ${
              toast.type === 'success'
                ? 'bg-[#1A3320]/95 border-emerald-500/50 text-emerald-100'
                : toast.type === 'whatsapp'
                ? 'bg-[#0E2E21]/95 border-[#25D366]/50 text-green-100'
                : toast.type === 'warning'
                ? 'bg-[#422006]/95 border-amber-500/50 text-amber-100'
                : 'bg-[#38040E]/95 border-[#D4AF37]/50 text-[#FBF4EA]'
            }`}
          >
            <div className="space-y-0.5">
              <div className="text-xs font-bold flex items-center gap-1.5 font-serif">
                {toast.type === 'whatsapp' ? (
                  <Smartphone className="w-3.5 h-3.5 text-[#25D366]" />
                ) : toast.type === 'success' ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                )}
                {toast.title}
                <span className="text-[10px] opacity-60 ml-auto font-sans">{toast.timestamp}</span>
              </div>
              <p className="text-xs leading-relaxed opacity-90 font-sans">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#ECD3BA]/60 hover:text-white p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </>
  );
};
