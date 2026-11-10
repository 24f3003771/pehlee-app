import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Send, 
  CheckCheck, 
  Phone, 
  Video, 
  MoreVertical, 
  Sparkles, 
  MapPin, 
  ExternalLink, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Film
} from 'lucide-react';

interface WAMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
  buttons?: { label: string; action: () => void }[];
  bookingCard?: {
    id: string;
    package: string;
    price: number;
    area: string;
  };
}

export const WhatsAppBridge: React.FC = () => {
  const { createNewBooking, setRole, setActiveBookingId, bookings } = useApp();

  const [inputVal, setInputVal] = useState('');
  const [messages, setMessages] = useState<WAMessage[]>([
    {
      id: 'wa-1',
      sender: 'bot',
      text: '🙏 *आदाब लखनऊ! Welcome to Pehle Aap!* \n\nBook a verified local creator for your shop or cafe. We confirm your creator in *30 minutes* and deliver your final 9:16 postable reel in *24 to 48 hours*. \n\nHow can we help your business today?',
      time: '11:00 AM',
      buttons: [
        { label: '🎬 Book a Shoot', action: () => handleSelectFlow('book') },
        { label: '📍 Lucknow Packages & Prices', action: () => handleSelectFlow('packages') },
        { label: '⚡ Track Active Booking', action: () => handleSelectFlow('track') }
      ]
    }
  ]);

  const [showWebviewPayment, setShowWebviewPayment] = useState(false);
  const [pendingBookingData, setPendingBookingData] = useState<any>(null);

  const addBotMessage = (text: string, buttons?: { label: string; action: () => void }[], card?: any) => {
    const newMsg: WAMessage = {
      id: Date.now().toString(),
      sender: 'bot',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      buttons,
      bookingCard: card
    };
    setMessages(prev => [...prev, newMsg]);
  };

  const addUserMessage = (text: string) => {
    const newMsg: WAMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, newMsg]);
  };

  const handleSelectFlow = (flow: string) => {
    if (flow === 'book') {
      addUserMessage('I want to book a creator for my shop.');
      setTimeout(() => {
        addBotMessage(
          'Great! Which locality in Lucknow is your business located in?',
          [
            { label: '📍 Hazratganj', action: () => handleSelectArea('Hazratganj') },
            { label: '📍 Gomti Nagar', action: () => handleSelectArea('Gomti Nagar') },
            { label: '📍 Alambagh', action: () => handleSelectArea('Alambagh') },
            { label: '📍 Chowk / Aminabad', action: () => handleSelectArea('Chowk') }
          ]
        );
      }, 500);
    } else if (flow === 'packages') {
      addUserMessage('Tell me about packages and prices.');
      setTimeout(() => {
        addBotMessage(
          'Here are our fixed transparent Lucknow packages:\n\n1️⃣ *Single Reel Quick-Drop* — ₹999 (1 hr shoot, 1 9:16 reel, 24h delivery)\n2️⃣ *4-Reel Growth Pack* — ₹3,499 (2 hr shoot, 4 reels, monthly strategy) ⭐ *Most Popular*\n3️⃣ *8-Reel Monthly Partner* — ₹6,499 (Full social media content partner)',
          [
            { label: 'Choose 4-Reel Growth Pack (₹3,499)', action: () => handleSelectArea('Hazratganj') },
            { label: 'Choose Single Reel (₹999)', action: () => handleSelectArea('Gomti Nagar') }
          ]
        );
      }, 500);
    } else if (flow === 'track') {
      addUserMessage('Check my order status.');
      setTimeout(() => {
        const lastBooking = bookings[0];
        if (lastBooking) {
          addBotMessage(
            `📦 *Order Status for #${lastBooking.bookingNumber}*\n\nStatus: *${lastBooking.status}*\nCreator: ${lastBooking.assignedCreator ? lastBooking.assignedCreator.name : 'Searching nearby pool'}\nEstimated delivery: 24-48 hours`,
            [
              {
                label: '📲 Open in Pehle Aap App',
                action: () => {
                  setActiveBookingId(lastBooking.id);
                  setRole('business');
                }
              }
            ]
          );
        } else {
          addBotMessage('No active bookings found for your phone number. Tap below to book your first shoot!', [
            { label: '🎬 Book a Shoot', action: () => handleSelectFlow('book') }
          ]);
        }
      }, 500);
    }
  };

  const handleSelectArea = (area: string) => {
    addUserMessage(`My shop is in ${area}.`);
    setTimeout(() => {
      addBotMessage(
        `Awesome! We have *14 verified creators active in ${area}* right now. ⚡\n\nWhat type of business are you?`,
        [
          { label: '🍲 Awadhi Cafe / Restaurant', action: () => handleSelectCategory('Awadhi Food & Cafe', area) },
          { label: '👗 Chikan / Fashion Store', action: () => handleSelectCategory('Chikan & Fashion Boutique', area) },
          { label: '🩺 Clinic / Dental Care', action: () => handleSelectCategory('Clinic & Dental', area) }
        ]
      );
    }, 600);
  };

  const handleSelectCategory = (category: string, area: string) => {
    addUserMessage(`It is a ${category}.`);
    setTimeout(() => {
      const summaryCard = {
        id: `PA-LK-${Math.floor(1000 + Math.random() * 9000)}`,
        package: '4-Reel Growth Pack',
        price: 3499,
        area
      };
      setPendingBookingData({ category, area, ...summaryCard });

      addBotMessage(
        `Got it! Here is your quick shoot summary:\n\n📋 *Package:* 4-Reel Growth Pack\n📍 *Locality:* ${area}, Lucknow\n💰 *Fixed Price:* ₹3,499 (Taxes & 1 free revision included)\n⏱️ *Confirmation SLA:* Within 30 minutes\n\nTap the secure instant link below to pay and trigger creator broadcast:`,
        [
          {
            label: '💳 Open Secure Booking & Payment Link',
            action: () => setShowWebviewPayment(true)
          }
        ],
        summaryCard
      );
    }, 600);
  };

  const handleConfirmWhatsAppBooking = () => {
    if (!pendingBookingData) return;

    const newId = createNewBooking({
      businessName: `${pendingBookingData.area} Boutique Cafe`,
      businessPhone: '+91 94520 99887',
      instagramHandle: '@lucknow_wa_shopper',
      area: pendingBookingData.area,
      address: `Main Market, ${pendingBookingData.area}, Lucknow`,
      category: pendingBookingData.category,
      packageId: 'pack-growth',
      packageName: pendingBookingData.package,
      price: pendingBookingData.price,
      slot: 'Today, ASAP (30-min Confirmation)',
      isASAP: true,
      paymentMethod: 'UPI (GPay/PhonePe)',
      brief: {
        category: pendingBookingData.category,
        businessName: `${pendingBookingData.area} Boutique Cafe`,
        instagramHandle: '@lucknow_wa_shopper',
        address: `Main Market, ${pendingBookingData.area}, Lucknow`,
        area: pendingBookingData.area,
        keyOfferOrUSP: 'Signature Awadhi specialties & festive vibes',
        talkingPoints: ['Sizzling presentation', 'Ambience & seating', 'Customer smile'],
        audioPreference: 'Trending Hindi/Bhojpuri'
      }
    });

    setShowWebviewPayment(false);

    // Send WhatsApp confirmation message
    addBotMessage(
      `🎉 *Payment of ₹${pendingBookingData.price} Confirmed!* \n\nOrder *#${newId}* is now broadcasting to verified creators in ${pendingBookingData.area}. \n\n⏱️ *30-minute confirmation guarantee active.* We will send your creator details here as soon as they accept!`,
      [
        {
          label: '📲 Open Order in App (60% Conversion Funnel)',
          action: () => {
            setActiveBookingId(newId);
            setRole('business');
          }
        }
      ]
    );
  };

  const handleCustomSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    const userText = inputVal.trim();
    setInputVal('');
    addUserMessage(userText);

    setTimeout(() => {
      addBotMessage(
        'Ji bilkul! Pehle Aap concierge team is at your service. Would you like to proceed with a booking or speak with operations?',
        [
          { label: '🎬 Start Booking', action: () => handleSelectFlow('book') },
          { label: '📍 See Packages', action: () => handleSelectFlow('packages') }
        ]
      );
    }, 600);
  };

  return (
    <div className="max-w-xl mx-auto space-y-4">
      {/* Top PRD Context Header */}
      <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-4 flex items-center justify-between text-xs text-emerald-200">
        <div>
          <span className="font-extrabold text-white flex items-center gap-1.5">
            <span className="text-base">🟢</span> WhatsApp Booking Bridge (PRD Section 5.2)
          </span>
          <p className="text-[11px] text-emerald-300 mt-0.5">
            Target: 60%+ WhatsApp-started bookings convert to app accounts.
          </p>
        </div>
        <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono font-bold">
          Live Simulator
        </span>
      </div>

      {/* Realistic WhatsApp Mobile Mockup */}
      <div className="bg-[#0b141a] rounded-3xl border-4 border-slate-800 shadow-2xl overflow-hidden flex flex-col h-[650px] relative">
        {/* WhatsApp Top Bar */}
        <div className="bg-[#202c33] p-3.5 flex items-center justify-between text-white border-b border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center font-black text-white text-base">
                प
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#202c33]" />
            </div>

            <div>
              <div className="flex items-center gap-1.5 font-bold text-sm">
                <span>Pehle Aap Lucknow</span>
                <span className="text-[10px] text-emerald-400">✓ Official</span>
              </div>
              <p className="text-[10px] text-slate-400">Verified Business Account • Online</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            <Video className="w-4 h-4 cursor-pointer" />
            <Phone className="w-4 h-4 cursor-pointer" />
            <MoreVertical className="w-4 h-4 cursor-pointer" />
          </div>
        </div>

        {/* WhatsApp Chat Body with subtle wallpaper pattern */}
        <div 
          className="flex-1 p-4 overflow-y-auto space-y-3.5"
          style={{
            backgroundImage: 'radial-gradient(#1f2c34 1px, transparent 1px)',
            backgroundSize: '20px 20px',
            backgroundColor: '#0b141a'
          }}
        >
          {/* Security Notice */}
          <div className="text-center my-1">
            <span className="text-[10px] bg-[#182229] text-[#ffd279] px-3 py-1 rounded-lg inline-block shadow">
              🔒 Messages are end-to-end encrypted with Pehle Aap Verified Business API.
            </span>
          </div>

          {messages.map(msg => {
            const isBot = msg.sender === 'bot';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 text-xs shadow-md leading-relaxed ${
                    isBot
                      ? 'bg-[#202c33] text-slate-100 rounded-tl-none border border-slate-800'
                      : 'bg-[#005c4b] text-white rounded-tr-none'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  
                  {/* Embedded Booking Card */}
                  {msg.bookingCard && (
                    <div className="mt-2.5 p-2.5 rounded-xl bg-black/30 border border-slate-700/60 text-[11px] space-y-1">
                      <div className="font-bold text-orange-400">{msg.bookingCard.package}</div>
                      <div className="text-slate-300">📍 Locality: {msg.bookingCard.area}</div>
                      <div className="text-emerald-400 font-bold">Total: ₹{msg.bookingCard.price} (Escrow Protected)</div>
                    </div>
                  )}

                  <div className="flex items-center justify-end gap-1 text-[9px] text-slate-400 mt-1">
                    <span>{msg.time}</span>
                    {!isBot && <CheckCheck className="w-3 h-3 text-[#53bdeb]" />}
                  </div>
                </div>

                {/* Quick Reply Interactive Button Chips */}
                {msg.buttons && (
                  <div className="flex flex-col gap-1.5 mt-2 w-full max-w-[85%]">
                    {msg.buttons.map((btn, idx) => (
                      <button
                        key={idx}
                        onClick={btn.action}
                        className="w-full text-center py-2 px-3 rounded-xl bg-[#202c33] hover:bg-[#2a3942] text-[#00a884] font-bold text-xs border border-slate-700/80 shadow-md transition-all active:scale-98 flex items-center justify-center gap-1.5"
                      >
                        <span>{btn.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* WhatsApp Input Footer */}
        <form onSubmit={handleCustomSend} className="bg-[#202c33] p-2.5 flex items-center gap-2 border-t border-slate-800">
          <input
            type="text"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            placeholder="Type a message or select quick options above..."
            className="flex-1 bg-[#2a3942] text-white text-xs rounded-2xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#00a884]"
          />
          <button
            type="submit"
            className="w-9 h-9 rounded-full bg-[#00a884] text-white flex items-center justify-center hover:bg-[#02906f] transition-colors"
          >
            <Send className="w-4 h-4 ml-0.5" />
          </button>
        </form>

        {/* Lightweight Webview Payment Simulation Modal */}
        {showWebviewPayment && (
          <div className="absolute inset-x-2 inset-y-8 bg-slate-900 border-2 border-orange-500 rounded-3xl z-30 shadow-2xl p-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 font-bold flex items-center justify-center text-sm">
                    प
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-white">Pehle Aap Secure Web Checkout</h4>
                    <p className="text-[10px] text-slate-400">Lightweight WhatsApp Webview</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowWebviewPayment(false)}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  ✕ Close
                </button>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Package:</span>
                  <span className="font-bold text-white">{pendingBookingData?.package}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Lucknow Area:</span>
                  <span className="font-bold text-white">{pendingBookingData?.area}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Confirmation SLA:</span>
                  <span className="text-orange-400 font-bold">≤ 30 Minutes</span>
                </div>
                <div className="pt-2 border-t border-slate-800 flex justify-between text-sm font-black text-white">
                  <span>Total Payable:</span>
                  <span className="text-emerald-400">₹{pendingBookingData?.price}</span>
                </div>
              </div>

              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-[11px] text-emerald-200">
                🛡️ 100% Escrow Protection: Funds released to creator only when you approve the final 9:16 reel.
              </div>
            </div>

            <button
              onClick={handleConfirmWhatsAppBooking}
              className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-black text-xs rounded-xl shadow-lg transition-all"
            >
              Confirm UPI Payment (₹{pendingBookingData?.price}) & Broadcast Shoot
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

