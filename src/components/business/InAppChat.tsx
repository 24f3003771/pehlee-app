import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Booking } from '../../types';
import { 
  X, 
  Send, 
  ShieldCheck, 
  Phone, 
  Info, 
  Sparkles,
  User
} from 'lucide-react';

interface InAppChatProps {
  booking: Booking;
  currentRole: 'business' | 'creator';
  onClose: () => void;
}

export const InAppChat: React.FC<InAppChatProps> = ({
  booking,
  currentRole,
  onClose
}) => {
  const { chatMessages, sendChatMessage } = useApp();
  const [inputText, setInputText] = useState('');

  const messages = chatMessages[booking.id] || [];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendChatMessage(booking.id, currentRole, inputText.trim());
    setInputText('');
  };

  const quickPrompts = currentRole === 'business' ? [
    'We are ready at table 4!',
    'Chef is plating the signature dish now.',
    'Where have you reached in Hazratganj?'
  ] : [
    'Just arrived outside the store!',
    'Setting up the gimbal and wireless mic.',
    'Need 15 mins to record the macro shots.'
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div className="relative bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full h-[600px] max-h-[90vh] shadow-2xl flex flex-col overflow-hidden">
        {/* Chat Header */}
        <div className="p-4 bg-slate-850 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-orange-500/20 text-orange-400 font-bold flex items-center justify-center">
                {currentRole === 'business' ? '📸' : '🏪'}
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-slate-900" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-white">
                  {currentRole === 'business' 
                    ? (booking.assignedCreator?.name || 'Assigned Creator') 
                    : booking.businessName}
                </h3>
                <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/20 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Masked
                </span>
              </div>
              <p className="text-[10px] text-slate-400 flex items-center gap-1">
                <Phone className="w-3 h-3 text-slate-400" />
                Phone Protected (+91 98XXX XXXXX)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Security Privacy Notice */}
        <div className="bg-slate-950/80 px-4 py-2 border-b border-slate-800/80 text-[11px] text-slate-400 flex items-center gap-2">
          <Info className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
          <span>Shoot coordination bridge. Contact numbers stay private.</span>
        </div>

        {/* Messages Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {messages.map(msg => {
            const isMe = msg.senderRole === currentRole;
            const isSystem = msg.senderRole === 'system';

            if (isSystem) {
              return (
                <div key={msg.id} className="text-center my-2">
                  <span className="text-[10px] bg-slate-800/80 text-orange-300 font-medium px-3 py-1 rounded-full border border-orange-500/20 inline-block">
                    {msg.text}
                  </span>
                </div>
              );
            }

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-xs shadow-md ${
                    isMe
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-br-xs'
                      : 'bg-slate-800 text-slate-100 rounded-bl-xs border border-slate-700/60'
                  }`}
                >
                  <div className="text-[10px] font-bold opacity-75 mb-0.5">
                    {msg.senderName}
                  </div>
                  <p className="leading-relaxed">{msg.text}</p>
                </div>
                <span className="text-[9px] text-slate-500 mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            );
          })}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-3 py-1.5 bg-slate-950/90 border-t border-slate-800 flex items-center gap-1.5 overflow-x-auto">
          {quickPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => {
                sendChatMessage(booking.id, currentRole, prompt);
              }}
              className="text-[10px] font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded-full whitespace-nowrap transition-colors"
            >
              + {prompt}
            </button>
          ))}
        </div>

        {/* Message Input Footer */}
        <form onSubmit={handleSend} className="p-3 bg-slate-850 border-t border-slate-800 flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            placeholder={`Message ${currentRole === 'business' ? 'creator' : 'business'}...`}
            className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
          />
          <button
            type="submit"
            className="p-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white transition-all shadow-md active:scale-95"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

