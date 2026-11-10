import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Booking, BookingStatus } from '../../types';
import { 
  Clock, 
  MapPin, 
  AlertTriangle, 
  CheckCircle2, 
  UserCheck, 
  RotateCcw, 
  Filter, 
  Search,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';

export const LiveOrderBoard: React.FC = () => {
  const { 
    bookings, 
    creators, 
    adminManualAssign, 
    adminIssueRefund, 
    setActiveBookingId, 
    setRole 
  } = useApp();

  const [filter, setFilter] = useState<string>('ALL');
  const [assigningBookingId, setAssigningBookingId] = useState<string | null>(null);

  const filteredBookings = bookings.filter(b => {
    if (filter === 'SEARCHING') return b.status === 'SEARCHING';
    if (filter === 'ACTIVE') return ['CONFIRMED', 'ON_THE_WAY', 'ARRIVED', 'SHOOTING', 'UPLOADED', 'EDITING'].includes(b.status);
    if (filter === 'DELIVERED') return ['DELIVERED', 'REVISION_REQUESTED'].includes(b.status);
    if (filter === 'APPROVED') return b.status === 'APPROVED';
    return true;
  });

  const verifiedCreators = creators.filter(c => c.verified);

  return (
    <div className="space-y-6">
      {/* Top Filter and SLA Stats Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-orange-400" />
          <span className="text-xs font-bold text-white">Status Filter:</span>
          <div className="flex flex-wrap gap-1.5">
            {['ALL', 'SEARCHING', 'ACTIVE', 'DELIVERED', 'APPROVED'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  filter === f
                    ? 'bg-orange-500 text-white shadow-sm'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400">Total Orders: <strong className="text-white">{bookings.length}</strong></span>
          <span className="text-slate-600">•</span>
          <span className="text-orange-400 font-bold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-ping" />
            {bookings.filter(b => b.status === 'SEARCHING').length} Unmatched SLA Alerts
          </span>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Order ID & Date</th>
                <th className="py-3 px-4">Business & Category</th>
                <th className="py-3 px-4">Locality</th>
                <th className="py-3 px-4">Package & Value</th>
                <th className="py-3 px-4">Assigned Creator</th>
                <th className="py-3 px-4">Status & SLA</th>
                <th className="py-3 px-4 text-right">Operations Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-200">
              {filteredBookings.map(b => {
                const isSearching = b.status === 'SEARCHING';
                return (
                  <tr key={b.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-mono font-bold text-white">{b.bookingNumber}</div>
                      <div className="text-[10px] text-slate-400">{b.createdAt}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white">{b.businessName}</div>
                      <div className="text-[10px] text-orange-400">{b.category}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 text-slate-300">
                        <MapPin className="w-3 h-3 text-orange-400" />
                        {b.area}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white">₹{b.price}</div>
                      <div className="text-[10px] text-slate-400">{b.packageName}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      {b.assignedCreator ? (
                        <div className="flex items-center gap-2">
                          <img
                            src={b.assignedCreator.avatar}
                            alt=""
                            className="w-6 h-6 rounded-full object-cover"
                          />
                          <div>
                            <div className="font-bold text-white">{b.assignedCreator.name}</div>
                            <div className="text-[10px] text-amber-400">{b.assignedCreator.tier}</div>
                          </div>
                        </div>
                      ) : (
                        <span className="text-[11px] text-amber-400 italic">Unassigned Pool</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          b.status === 'APPROVED' ? 'bg-emerald-500/20 text-emerald-300' :
                          b.status === 'DELIVERED' ? 'bg-purple-500/20 text-purple-300' :
                          b.status === 'SEARCHING' ? 'bg-orange-500/20 text-orange-300 animate-pulse' :
                          'bg-blue-500/20 text-blue-300'
                        }`}>
                          {b.status}
                        </span>

                        {isSearching && (
                          <span className="text-[10px] font-mono text-orange-400 font-bold">
                            (30m SLA)
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {isSearching && (
                          <button
                            onClick={() => setAssigningBookingId(b.id)}
                            className="px-2.5 py-1 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg text-[10px] shadow transition-all flex items-center gap-1"
                          >
                            <UserCheck className="w-3 h-3" />
                            <span>Manual Assign</span>
                          </button>
                        )}

                        <button
                          onClick={() => {
                            setActiveBookingId(b.id);
                            setRole('business');
                          }}
                          className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-lg"
                          title="Inspect in Business View"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>

                        {b.status !== 'APPROVED' && b.status !== 'CANCELLED' && (
                          <button
                            onClick={() => adminIssueRefund(b.id, 'Admin manual override refund')}
                            className="p-1.5 text-rose-400 hover:text-rose-300 bg-rose-500/10 rounded-lg"
                            title="Issue Immediate Refund"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manual Assignment Modal (PRD Section 6.3 MATCH-3 Admin Override) */}
      {assigningBookingId && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="font-extrabold text-sm text-white flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-orange-400" />
                <span>Admin Override: Assign Verified Creator</span>
              </h4>
              <button
                onClick={() => setAssigningBookingId(null)}
                className="text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Select a verified Lucknow creator to manually confirm booking #{assigningBookingId} and satisfy the 30-minute SLA:
            </p>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {verifiedCreators.map(c => (
                <div
                  key={c.id}
                  onClick={() => {
                    adminManualAssign(assigningBookingId, c.id);
                    setAssigningBookingId(null);
                  }}
                  className="p-3 rounded-xl bg-slate-800/80 hover:bg-orange-500 hover:text-white border border-slate-700 cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <img src={c.avatar} alt="" className="w-9 h-9 rounded-full object-cover" />
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-white">{c.name}</div>
                      <div className="text-[10px] text-slate-400 group-hover:text-orange-100">{c.tier} • {c.rating}⭐</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-orange-400 group-hover:text-white">
                    Assign Now →
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

