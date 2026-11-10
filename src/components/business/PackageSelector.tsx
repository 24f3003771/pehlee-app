import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PackagePlan } from '../../types';
import { Check, Zap, Sparkles, Clock, Film, ShieldCheck } from 'lucide-react';

interface PackageSelectorProps {
  onSelectPackage: (pkg: PackagePlan, addOns: string[]) => void;
}

export const PackageSelector: React.FC<PackageSelectorProps> = ({ onSelectPackage }) => {
  const { packages } = useApp();
  const [selectedId, setSelectedId] = useState<string>(packages[1]?.id || packages[0].id);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  const addOnOptions = [
    { id: 'addon-vo', name: 'Professional Lakhnavi/Hindi Voiceover', price: 299, icon: '🎙️' },
    { id: 'addon-audio', name: 'Trending Audio Commercial Clearance', price: 199, icon: '🎵' },
    { id: 'addon-rush', name: 'Express 24-Hour Guaranteed Rush', price: 499, icon: '⚡' },
    { id: 'addon-raw', name: 'Full Uncut 4K Raw Footage Archive', price: 349, icon: '📦' }
  ];

  const toggleAddOn = (id: string) => {
    setSelectedAddOns(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const currentPkg = packages.find(p => p.id === selectedId) || packages[0];
  const addOnsTotal = selectedAddOns.reduce((sum, id) => {
    const item = addOnOptions.find(o => o.id === id);
    return sum + (item ? item.price : 0);
  }, 0);

  const totalPrice = currentPkg.price + addOnsTotal;

  return (
    <div className="space-y-8">
      {/* Title & Value Prop */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          Transparent Lucknow Hyperlocal Pricing
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Choose Your Content Package
        </h2>
        <p className="text-sm text-slate-400">
          Book a verified local creator in 30 minutes. Fixed rates, no hidden travel charges, 100% escrow protection.
        </p>
      </div>

      {/* Package Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((pkg) => {
          const isSelected = selectedId === pkg.id;
          return (
            <div
              key={pkg.id}
              onClick={() => setSelectedId(pkg.id)}
              className={`relative rounded-2xl p-6 transition-all duration-200 cursor-pointer flex flex-col justify-between border ${
                isSelected
                  ? 'bg-gradient-to-b from-slate-800 to-slate-900 border-orange-500 shadow-xl shadow-orange-500/10 ring-2 ring-orange-500/50'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[11px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full shadow-md">
                  Most Popular in Lucknow
                </div>
              )}

              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-lg text-white">{pkg.name}</h3>
                    <p className="text-xs text-orange-400/90 font-medium">{pkg.hindiName}</p>
                  </div>
                  <div className="p-2 rounded-xl bg-orange-500/10 text-orange-400">
                    <Film className="w-5 h-5" />
                  </div>
                </div>

                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-3xl font-black text-white">₹{pkg.price.toLocaleString()}</span>
                  <span className="text-xs text-slate-400 line-through">₹{pkg.originalPrice.toLocaleString()}</span>
                  <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                    Save ₹{(pkg.originalPrice - pkg.price).toLocaleString()}
                  </span>
                </div>

                <div className="mt-3 flex items-center gap-3 text-xs text-slate-300">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-orange-400" />
                    {pkg.durationHours} hr shoot
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    {pkg.turnaroundHours}h delivery SLA
                  </span>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-800/80 space-y-2.5">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">What's Included:</p>
                  {pkg.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <div className="mt-0.5 p-0.5 rounded-full bg-emerald-500/20 text-emerald-400 flex-shrink-0">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4">
                <button
                  type="button"
                  className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all ${
                    isSelected
                      ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {isSelected ? '✓ Selected' : 'Select Plan'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add-ons Section */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
        <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-orange-400" />
          Recommended Add-ons for Lucknow Businesses:
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {addOnOptions.map((addon) => {
            const isChecked = selectedAddOns.includes(addon.id);
            return (
              <div
                key={addon.id}
                onClick={() => toggleAddOn(addon.id)}
                className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-2 ${
                  isChecked
                    ? 'bg-orange-500/10 border-orange-500 text-white'
                    : 'bg-slate-800/40 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{addon.icon}</span>
                  <div>
                    <p className="text-xs font-semibold leading-tight">{addon.name}</p>
                    <p className="text-[11px] text-orange-400 font-bold">+₹{addon.price}</p>
                  </div>
                </div>
                <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                  isChecked ? 'bg-orange-500 border-orange-500 text-white' : 'border-slate-600'
                }`}>
                  {isChecked && <Check className="w-3 h-3" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sticky Bottom Next Step Trigger */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-slate-900 to-slate-800 p-4 rounded-2xl border border-slate-700/70 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-black">
            ₹
          </div>
          <div>
            <div className="text-xs text-slate-400">Total Booking Amount:</div>
            <div className="text-2xl font-black text-white flex items-baseline gap-2">
              ₹{totalPrice.toLocaleString()}
              <span className="text-xs text-emerald-400 font-normal">Escrow Protected</span>
            </div>
            <div className="text-[11px] text-slate-400">
              Selected: <span className="font-semibold text-white">{currentPkg.name}</span>
              {selectedAddOns.length > 0 && ` + ${selectedAddOns.length} Add-on(s)`}
            </div>
          </div>
        </div>

        <button
          onClick={() => onSelectPackage(currentPkg, selectedAddOns)}
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-sm shadow-xl shadow-orange-500/30 flex items-center justify-center gap-2 transition-all transform active:scale-95"
        >
          <span>Continue to Lucknow Brief & Slot</span>
          <span className="text-lg">→</span>
        </button>
      </div>
    </div>
  );
};

