import React, { useState } from 'react';
import { 
  BriefData, 
  BusinessCategory, 
  LucknowArea, 
  PackagePlan 
} from '../../types';
import { 
  LUCKNOW_AREAS, 
  CATEGORY_TEMPLATES 
} from '../../data/mockData';
import { 
  Sparkles, 
  MapPin, 
  Clock, 
  Zap, 
  Building2, 
  Instagram, 
  Phone, 
  Music, 
  FileText, 
  CheckCircle2,
  ArrowLeft
} from 'lucide-react';

interface BriefBuilderProps {
  selectedPackage: PackagePlan;
  selectedAddOns: string[];
  onBack: () => void;
  onSubmitBrief: (brief: BriefData, slot: string, isASAP: boolean, paymentMethod: 'UPI (GPay/PhonePe)' | 'Razorpay' | 'Credit Card') => void;
}

export const BriefBuilder: React.FC<BriefBuilderProps> = ({
  selectedPackage,
  selectedAddOns,
  onBack,
  onSubmitBrief
}) => {
  const [category, setCategory] = useState<BusinessCategory>('Awadhi Food & Cafe');
  const [businessName, setBusinessName] = useState('Royal Awadh Kitchen');
  const [businessPhone, setBusinessPhone] = useState('+91 94150 12345');
  const [instagramHandle, setInstagramHandle] = useState('@royalawadh_lko');
  const [area, setArea] = useState<LucknowArea>('Hazratganj');
  const [address, setAddress] = useState('Shop 12, Janpath Market, Hazratganj, Lucknow');
  
  const template = CATEGORY_TEMPLATES[category];
  const [keyOffer, setKeyOffer] = useState(template.defaultOffer);
  const [selectedPoints, setSelectedPoints] = useState<string[]>(template.suggestedPoints);
  const [audioPref, setAudioPref] = useState<'Trending Hindi/Bhojpuri' | 'Aesthetic Lo-Fi' | 'High Energy Pop' | 'Voiceover Dialogue'>('Trending Hindi/Bhojpuri');
  const [specialNotes, setSpecialNotes] = useState('Capture the authentic Dum Biryani steam opening with close-up macro lighting.');
  
  const [isASAP, setIsASAP] = useState(true);
  const [slot, setSlot] = useState('Today, 4:00 PM – 5:30 PM');
  const [paymentMethod, setPaymentMethod] = useState<'UPI (GPay/PhonePe)' | 'Razorpay' | 'Credit Card'>('UPI (GPay/PhonePe)');

  const handleCategoryChange = (newCat: BusinessCategory) => {
    setCategory(newCat);
    const newTpl = CATEGORY_TEMPLATES[newCat];
    setKeyOffer(newTpl.defaultOffer);
    setSelectedPoints(newTpl.suggestedPoints);
  };

  const togglePoint = (pt: string) => {
    setSelectedPoints(prev => 
      prev.includes(pt) ? prev.filter(p => p !== pt) : [...prev, pt]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const brief: BriefData = {
      category,
      businessName,
      businessPhone,
      instagramHandle,
      address,
      area,
      keyOfferOrUSP: keyOffer,
      talkingPoints: selectedPoints,
      audioPreference: audioPref,
      specialInstructions: specialNotes
    };

    onSubmitBrief(brief, isASAP ? 'ASAP (Immediate 30-min Confirmation)' : slot, isASAP, paymentMethod);
  };

  const categories: BusinessCategory[] = [
    'Awadhi Food & Cafe',
    'Chikan & Fashion Boutique',
    'Clinic & Dental',
    'Coaching & Education',
    'Jewellery & Wedding',
    'Salon & Wellness'
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto">
      {/* Header with Back button */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Packages
        </button>
        <div className="text-right">
          <span className="text-xs text-orange-400 font-bold bg-orange-500/10 px-2.5 py-1 rounded-full border border-orange-500/20">
            Selected: {selectedPackage.name} (₹{selectedPackage.price})
          </span>
        </div>
      </div>

      {/* Step 1: Business Profile & Lucknow Location */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-5">
        <div className="flex items-center gap-2 text-white font-bold text-base">
          <Building2 className="w-5 h-5 text-orange-400" />
          <span>1. Lucknow Business Details</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Business Name</label>
            <input
              type="text"
              value={businessName}
              onChange={e => setBusinessName(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-orange-500"
              placeholder="e.g. Royal Cafe / Ada Chikan"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Owner Phone Number (OTP Verified)
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={businessPhone}
                onChange={e => setBusinessPhone(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-3.5 py-2 text-sm text-white focus:outline-none focus:border-orange-500"
                placeholder="+91 94150 XXXXX"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Instagram Handle</label>
            <div className="relative">
              <Instagram className="w-4 h-4 text-pink-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={instagramHandle}
                onChange={e => setInstagramHandle(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-3.5 py-2 text-sm text-white focus:outline-none focus:border-orange-500"
                placeholder="@yourbusiness_lko"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Lucknow Locality / Area</label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-orange-400 absolute left-3 top-2.5" />
              <select
                value={area}
                onChange={e => setArea(e.target.value as LucknowArea)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-3.5 py-2 text-sm text-white focus:outline-none focus:border-orange-500 cursor-pointer"
              >
                {LUCKNOW_AREAS.map(a => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Full Shop / Shoot Address</label>
          <input
            type="text"
            value={address}
            onChange={e => setAddress(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-orange-500"
            placeholder="Shop / Floor / Landmark, Lucknow"
            required
          />
        </div>
      </div>

      {/* Step 2: Category & Smart Brief Builder */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-white font-bold text-base">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>2. Smart Lucknow Brief Builder</span>
          </div>
          <span className="text-[11px] text-slate-400">Pre-built high-converting templates</span>
        </div>

        {/* Category Pills */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-2">Select Business Category:</label>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                type="button"
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  category === cat
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Key Offer / Hook */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Main Hook / Customer Offer to Highlight in Reel
          </label>
          <input
            type="text"
            value={keyOffer}
            onChange={e => setKeyOffer(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-orange-500"
            placeholder="e.g. Flat 20% off on first visit, or Signature Dum Biryani reveal"
            required
          />
        </div>

        {/* Suggested Talking Points Checkboxes */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2">
            Select Key Shots & Talking Points for Creator:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {template.suggestedPoints.map((point, idx) => {
              const isChecked = selectedPoints.includes(point);
              return (
                <div
                  key={idx}
                  onClick={() => togglePoint(point)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-start gap-2.5 ${
                    isChecked
                      ? 'bg-amber-500/10 border-amber-500/60 text-amber-100'
                      : 'bg-slate-800/40 border-slate-800 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                    isChecked ? 'bg-amber-500 border-amber-500 text-white' : 'border-slate-600'
                  }`}>
                    {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                  <span className="leading-relaxed">{point}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Music & Language */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Music / Audio Vibe
            </label>
            <div className="relative">
              <Music className="w-4 h-4 text-purple-400 absolute left-3 top-2.5" />
              <select
                value={audioPref}
                onChange={e => setAudioPref(e.target.value as any)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-3.5 py-2 text-sm text-white focus:outline-none focus:border-orange-500 cursor-pointer"
              >
                <option value="Trending Hindi/Bhojpuri">Trending Hindi / Awadhi Viral Beat</option>
                <option value="Aesthetic Lo-Fi">Aesthetic Royal Lo-Fi Instrumental</option>
                <option value="High Energy Pop">High Energy Commercial Pop</option>
                <option value="Voiceover Dialogue">Voiceover Dialogue & Direct Speech</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Special Instructions for Creator
            </label>
            <input
              type="text"
              value={specialNotes}
              onChange={e => setSpecialNotes(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-orange-500"
              placeholder="e.g. Don't show messy counters, bring warm lights"
            />
          </div>
        </div>
      </div>

      {/* Step 3: Shoot Timing & Slot Selection */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2 text-white font-bold text-base">
          <Clock className="w-5 h-5 text-emerald-400" />
          <span>3. When should the creator arrive?</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            onClick={() => setIsASAP(true)}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              isASAP
                ? 'bg-emerald-500/10 border-emerald-500 text-white shadow-lg shadow-emerald-500/10'
                : 'bg-slate-800/40 border-slate-700 text-slate-400 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-sm flex items-center gap-1.5 text-emerald-400">
                <Zap className="w-4 h-4" /> ASAP Mode (30-min Confirmation)
              </span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold">
                Instant Dispatch
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Creator will be matched and dispatched immediately. Will arrive at your Lucknow location today.
            </p>
          </div>

          <div
            onClick={() => setIsASAP(false)}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              !isASAP
                ? 'bg-orange-500/10 border-orange-500 text-white shadow-lg shadow-orange-500/10'
                : 'bg-slate-800/40 border-slate-700 text-slate-400 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-sm flex items-center gap-1.5 text-orange-400">
                <Clock className="w-4 h-4" /> Schedule Specific Slot
              </span>
            </div>
            <select
              value={slot}
              onChange={e => {
                setIsASAP(false);
                setSlot(e.target.value);
              }}
              className="mt-2 w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
            >
              <option value="Today, 4:00 PM – 5:30 PM">Today, 4:00 PM – 5:30 PM (Evening Rush)</option>
              <option value="Tomorrow, 11:30 AM – 1:00 PM">Tomorrow, 11:30 AM – 1:00 PM (Lunch Prep)</option>
              <option value="Tomorrow, 5:00 PM – 7:00 PM">Tomorrow, 5:00 PM – 7:00 PM (Prime Time)</option>
              <option value="This Saturday, 3:00 PM – 5:00 PM">This Saturday, 3:00 PM – 5:00 PM (Weekend)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Step 4: Payment Simulation */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-white font-bold text-base">
            <span className="text-xl">💳</span>
            <span>4. Secure Payment Method (Escrow Protected)</span>
          </div>
          <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            Funds held safe until you approve the reel
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { id: 'UPI (GPay/PhonePe)', label: 'UPI (GPay / PhonePe / Paytm)', icon: '📱' },
            { id: 'Razorpay', label: 'NetBanking / Debit Cards', icon: '🏦' },
            { id: 'Credit Card', label: 'Credit Card / EMI', icon: '💳' }
          ].map(pm => (
            <div
              key={pm.id}
              onClick={() => setPaymentMethod(pm.id as any)}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${
                paymentMethod === pm.id
                  ? 'bg-orange-500/10 border-orange-500 text-white'
                  : 'bg-slate-800/40 border-slate-700 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <span className="text-xl">{pm.icon}</span>
              <div>
                <p className="text-xs font-bold">{pm.label}</p>
                <p className="text-[10px] text-slate-400">Zero Convenience Fee</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white font-black text-base shadow-2xl shadow-orange-500/30 flex items-center justify-center gap-3 transition-all transform active:scale-98"
        >
          <span>Pay ₹{selectedPackage.price.toLocaleString()} & Broadcast to Lucknow Creators</span>
          <span className="bg-white/20 px-2 py-0.5 rounded text-xs">30-min SLA Guaranteed ⚡</span>
        </button>
        <p className="text-center text-[11px] text-slate-400 mt-2.5">
          If no verified creator confirms within 30 minutes, 100% full refund is issued instantly.
        </p>
      </div>
    </form>
  );
};

