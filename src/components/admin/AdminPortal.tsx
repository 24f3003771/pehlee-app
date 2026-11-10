import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LiveOrderBoard } from './LiveOrderBoard';
import { CreatorVerificationQueue } from './CreatorVerificationQueue';
import { AnalyticsDashboard } from './AnalyticsDashboard';
import { 
  ShieldCheck, 
  ListOrdered, 
  UserCheck, 
  BarChart3, 
  MapPin, 
  AlertTriangle 
} from 'lucide-react';

export const AdminPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'orders' | 'verification' | 'analytics'>('orders');
  const { bookings, creators } = useApp();

  const pendingVerificationsCount = creators.filter(c => c.verificationStatus === 'PENDING').length;
  const searchingCount = bookings.filter(b => b.status === 'SEARCHING').length;

  return (
    <div className="space-y-6">
      {/* Admin Top Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
        <div>
          <h1 className="text-xl font-black text-white flex items-center gap-2">
            <span>Operations & Dispatch Control</span>
            <span className="text-xs bg-blue-500/10 text-blue-400 font-bold px-2 py-0.5 rounded border border-blue-500/20">
              Lucknow Ops Central
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Monitor 30-min matching SLAs, dispatch escalations, and verify creator portfolios.
          </p>
        </div>

        {/* Admin Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'orders'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ListOrdered className="w-3.5 h-3.5" />
            <span>Live Order Board</span>
            {searchingCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-ping ml-1" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('verification')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'verification'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Verification Queue</span>
            {pendingVerificationsCount > 0 && (
              <span className="text-[10px] bg-amber-500 text-slate-950 font-bold px-1.5 py-0.2 rounded-full">
                {pendingVerificationsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'analytics'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>KPIs & Analytics</span>
          </button>
        </div>
      </div>

      {/* Main Tab Render */}
      {activeTab === 'orders' && <LiveOrderBoard />}
      {activeTab === 'verification' && <CreatorVerificationQueue />}
      {activeTab === 'analytics' && <AnalyticsDashboard />}
    </div>
  );
};

