import React, { useState } from 'react';
import { AwadhiPhoneFrame } from './AwadhiPhoneFrame';
import { Screen1Packages } from './screens/Screen1Packages';
import { Screen2Booking } from './screens/Screen2Booking';
import { Screen3FindingCreator } from './screens/Screen3FindingCreator';
import { Screen4CreatorConfirmed } from './screens/Screen4CreatorConfirmed';
import { Screen5StepTracker } from './screens/Screen5StepTracker';
import { Screen6ReelReady } from './screens/Screen6ReelReady';
import { Screen7Feedback } from './screens/Screen7Feedback';
import { Screen8BrandArch } from './screens/Screen8BrandArch';
import { 
  Sparkles, 
  Smartphone, 
  LayoutGrid, 
  ArrowRight, 
  RotateCcw,
  Sliders,
  CheckCircle2
} from 'lucide-react';

export const PehleAapShowcase: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'interactive'>('grid');
  const [activeStep, setActiveStep] = useState<number>(1);

  // Shared state between interactive steps
  const [bookingData, setBookingData] = useState({
    package: 'Standard Reel',
    price: 1999,
    slot: '02:30 PM',
    creator: 'Rohan Mehta',
    rating: 5
  });

  const screensInfo = [
    { num: 1, title: 'Your content. Your choice.', desc: 'Transparent Lucknow packages from ₹999' },
    { num: 2, title: 'Pick your preferred time.', desc: 'Instant ASAP or scheduled Lucknow time slots' },
    { num: 3, title: 'Finding your creator...', desc: '30-second hyperlocal radar matching' },
    { num: 4, title: 'Your creator is confirmed!', desc: 'Gold verified creator matched with confetti' },
    { num: 5, title: 'Track every step.', desc: 'Live shoot progression & GPS check-in' },
    { num: 6, title: 'Your reel is ready!', desc: '24-48h 9:16 vertical cafe reel delivery' },
    { num: 7, title: 'Your feedback builds trust.', desc: '5-star creator review modal' },
    { num: 8, title: 'PEHLE AAP — PEHLE AAP, PHIR REEL.', desc: 'WhatsApp push alert & Awadhi heritage arch' }
  ];

  return (
    <div className="space-y-10">
      {/* Top Heritage Showcase Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#520B13]/90 border border-[#D4AF37]/40 shadow-gold-glow">
          <span className="text-lg">🙏</span>
          <span className="font-serif text-xs font-bold text-[#F9DF8D] tracking-wider uppercase">
            Lucknow Awadhi Heritage Design System
          </span>
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
        </div>

        <h1 
          className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#F9DF8D] via-[#FFF] to-[#D4AF37] tracking-tight drop-shadow-md"
          style={{ fontFamily: "'Rozha One', 'Playfair Display', serif" }}
        >
          पहले आप, फिर रील.
        </h1>

        <p className="text-sm sm:text-base text-[#ECD3BA]/90 font-serif max-w-2xl mx-auto leading-relaxed">
          The exact 8-screen mobile booking and delivery experience designed for Lucknow's small businesses and local smartphone creators.
        </p>

        {/* View Mode Switcher Toggle */}
        <div className="pt-2 flex items-center justify-center gap-3">
          <div className="bg-[#2A0409]/90 p-1.5 rounded-2xl border border-[#D4AF37]/30 shadow-inner flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'grid'
                  ? 'bg-gradient-to-r from-[#6B0F1A] to-[#841320] text-[#F9DF8D] border border-[#D4AF37] shadow-md'
                  : 'text-[#ECD3BA]/70 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>8-Screen Board (Like Your Image)</span>
            </button>

            <button
              onClick={() => setViewMode('interactive')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'interactive'
                  ? 'bg-gradient-to-r from-[#6B0F1A] to-[#841320] text-[#F9DF8D] border border-[#D4AF37] shadow-md'
                  : 'text-[#ECD3BA]/70 hover:text-white'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>Step-by-Step Simulator</span>
            </button>
          </div>
        </div>
      </div>

      {/* VIEW MODE 1: THE 8-SCREEN GALLERY (1:1 Match to the uploaded image) */}
      {viewMode === 'grid' && (
        <div className="space-y-12">
          {/* Top Row: Screens 1, 2, 3, 4 */}
          <div>
            <div className="flex items-center justify-between mb-6 px-2">
              <span className="text-xs font-serif font-bold uppercase tracking-widest text-[#D4AF37]">
                Phase A: Booking & Creator Match (Screens 1 to 4)
              </span>
              <span className="text-[11px] text-[#ECD3BA]/60">Click any phone to test interaction</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
              {/* Screen 1: Your content. Your choice. */}
              <AwadhiPhoneFrame
                screenNumber={1}
                caption="Your content. Your choice."
                isActive={activeStep === 1}
                onClick={() => setActiveStep(1)}
              >
                <Screen1Packages
                  onSelectPackage={(pkgName, price) => {
                    setBookingData(prev => ({ ...prev, package: pkgName, price }));
                    setActiveStep(2);
                  }}
                />
              </AwadhiPhoneFrame>

              {/* Screen 2: Pick your preferred time. */}
              <AwadhiPhoneFrame
                screenNumber={2}
                caption="Pick your preferred time."
                isActive={activeStep === 2}
                onClick={() => setActiveStep(2)}
              >
                <Screen2Booking
                  onBack={() => setActiveStep(1)}
                  onProceed={(slot) => {
                    setBookingData(prev => ({ ...prev, slot }));
                    setActiveStep(3);
                  }}
                />
              </AwadhiPhoneFrame>

              {/* Screen 3: Finding your creator... */}
              <AwadhiPhoneFrame
                screenNumber={3}
                caption="Finding your creator..."
                isActive={activeStep === 3}
                onClick={() => setActiveStep(3)}
              >
                <Screen3FindingCreator
                  onBack={() => setActiveStep(2)}
                  onMatched={() => setActiveStep(4)}
                />
              </AwadhiPhoneFrame>

              {/* Screen 4: Your creator is confirmed! */}
              <AwadhiPhoneFrame
                screenNumber={4}
                caption="Your creator is confirmed!"
                isActive={activeStep === 4}
                onClick={() => setActiveStep(4)}
              >
                <Screen4CreatorConfirmed
                  onBack={() => setActiveStep(3)}
                  onTrack={() => setActiveStep(5)}
                />
              </AwadhiPhoneFrame>
            </div>
          </div>

          {/* Bottom Row: Screens 5, 6, 7, 8 */}
          <div>
            <div className="flex items-center justify-between mb-6 px-2">
              <span className="text-xs font-serif font-bold uppercase tracking-widest text-[#D4AF37]">
                Phase B: Shoot, Delivery & Heritage (Screens 5 to 8)
              </span>
              <span className="text-[11px] text-[#ECD3BA]/60">SLA: 24-48h Reel Delivery</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
              {/* Screen 5: Track every step. */}
              <AwadhiPhoneFrame
                screenNumber={5}
                caption="Track every step."
                isActive={activeStep === 5}
                onClick={() => setActiveStep(5)}
              >
                <Screen5StepTracker
                  onNext={() => setActiveStep(6)}
                />
              </AwadhiPhoneFrame>

              {/* Screen 6: Your reel is ready! */}
              <AwadhiPhoneFrame
                screenNumber={6}
                caption="Your reel is ready!"
                isActive={activeStep === 6}
                onClick={() => setActiveStep(6)}
              >
                <Screen6ReelReady
                  onBack={() => setActiveStep(5)}
                  onRate={() => setActiveStep(7)}
                  onBookAgain={() => setActiveStep(1)}
                />
              </AwadhiPhoneFrame>

              {/* Screen 7: Your feedback builds trust. */}
              <AwadhiPhoneFrame
                screenNumber={7}
                caption="Your feedback builds trust."
                isActive={activeStep === 7}
                onClick={() => setActiveStep(7)}
              >
                <Screen7Feedback
                  onBack={() => setActiveStep(6)}
                  onSubmitRating={(r) => {
                    setBookingData(prev => ({ ...prev, rating: r }));
                    setActiveStep(8);
                  }}
                />
              </AwadhiPhoneFrame>

              {/* Screen 8: PEHLE AAP — PEHLE AAP, PHIR REEL. */}
              <AwadhiPhoneFrame
                screenNumber={8}
                caption="PEHLE AAP — PEHLE AAP, PHIR REEL."
                isActive={activeStep === 8}
                onClick={() => setActiveStep(8)}
              >
                <Screen8BrandArch
                  onRestart={() => setActiveStep(1)}
                />
              </AwadhiPhoneFrame>
            </div>
          </div>
        </div>
      )}

      {/* VIEW MODE 2: SINGLE INTERACTIVE PHONE SIMULATOR */}
      {viewMode === 'interactive' && (
        <div className="flex flex-col items-center justify-center space-y-6">
          {/* Step Selector Pills Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl p-2 bg-[#2A0409]/90 rounded-2xl border border-[#D4AF37]/30">
            {screensInfo.map((s) => (
              <button
                key={s.num}
                onClick={() => setActiveStep(s.num)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeStep === s.num
                    ? 'bg-[#D4AF37] text-[#45070E] font-black shadow-md'
                    : 'text-[#ECD3BA]/70 hover:text-white bg-[#520B13]/40'
                }`}
              >
                <span>{s.num}.</span>
                <span className="hidden sm:inline">{s.title.slice(0, 15)}...</span>
              </button>
            ))}
          </div>

          {/* Centered Large Phone Frame */}
          <div className="transform scale-105">
            <AwadhiPhoneFrame
              screenNumber={activeStep}
              caption={screensInfo[activeStep - 1]?.title || ''}
              isActive={true}
            >
              {activeStep === 1 && (
                <Screen1Packages
                  onSelectPackage={(pkg, price) => {
                    setBookingData(prev => ({ ...prev, package: pkg, price }));
                    setActiveStep(2);
                  }}
                />
              )}
              {activeStep === 2 && (
                <Screen2Booking
                  onBack={() => setActiveStep(1)}
                  onProceed={(slot) => {
                    setBookingData(prev => ({ ...prev, slot }));
                    setActiveStep(3);
                  }}
                />
              )}
              {activeStep === 3 && (
                <Screen3FindingCreator
                  onBack={() => setActiveStep(2)}
                  onMatched={() => setActiveStep(4)}
                />
              )}
              {activeStep === 4 && (
                <Screen4CreatorConfirmed
                  onBack={() => setActiveStep(3)}
                  onTrack={() => setActiveStep(5)}
                />
              )}
              {activeStep === 5 && (
                <Screen5StepTracker
                  onNext={() => setActiveStep(6)}
                />
              )}
              {activeStep === 6 && (
                <Screen6ReelReady
                  onBack={() => setActiveStep(5)}
                  onRate={() => setActiveStep(7)}
                  onBookAgain={() => setActiveStep(1)}
                />
              )}
              {activeStep === 7 && (
                <Screen7Feedback
                  onBack={() => setActiveStep(6)}
                  onSubmitRating={() => setActiveStep(8)}
                />
              )}
              {activeStep === 8 && (
                <Screen8BrandArch
                  onRestart={() => setActiveStep(1)}
                />
              )}
            </AwadhiPhoneFrame>
          </div>

          {/* Stepper Navigation Buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveStep(prev => (prev > 1 ? prev - 1 : 8))}
              className="px-4 py-2 rounded-xl bg-[#520B13] hover:bg-[#6B0F1A] border border-[#D4AF37]/50 text-[#F9DF8D] font-serif text-xs font-bold"
            >
              ← Previous Screen
            </button>

            <button
              onClick={() => setActiveStep(1)}
              className="p-2 rounded-xl bg-[#2A0409] text-[#D4AF37] hover:text-white border border-[#D4AF37]/30"
              title="Restart from Screen 1"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveStep(prev => (prev < 8 ? prev + 1 : 1))}
              className="px-5 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#F3C951] text-[#45070E] font-serif text-xs font-black shadow-lg"
            >
              Next Screen →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

