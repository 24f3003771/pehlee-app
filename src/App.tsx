import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { PehleAapShowcase } from './components/showcase/PehleAapShowcase';
import { BusinessPortal } from './components/business/BusinessPortal';
import { CreatorPortal } from './components/creator/CreatorPortal';
import { WhatsAppBridge } from './components/whatsapp/WhatsAppBridge';
import { AdminPortal } from './components/admin/AdminPortal';
import { 
  Sparkles, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  Smartphone, 
  Heart,
  Video
} from 'lucide-react';

const MainContent: React.FC = () => {
  const { role } = useApp();

  return (
    <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8">
      {role === 'showcase' && <PehleAapShowcase />}
      {role === 'business' && <BusinessPortal />}
      {role === 'creator' && <CreatorPortal />}
      {role === 'whatsapp' && <WhatsAppBridge />}
      {role === 'admin' && <AdminPortal />}
    </main>
  );
};

export function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-[#150205] text-[#FBF4EA] flex flex-col font-sans selection:bg-[#D4AF37] selection:text-[#38040E]">
        <Header />
        
        <div className="flex-1">
          <MainContent />
        </div>

        {/* Awadhi Royal Heritage Footer */}
        <footer className="border-t border-[#D4AF37]/30 bg-[#200207] py-8 px-4 text-xs text-[#ECD3BA]/70 font-serif">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-[#520B13] border border-[#D4AF37] text-white flex items-center justify-center text-sm">
                🙏
              </span>
              <span className="font-bold text-[#F9DF8D] text-sm">Pehle Aap (पहले आप)</span>
              <span>— PEHLE AAP, PHIR REEL.</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-[#ECD3BA]/80">
              <span className="text-[#F9DF8D]">⚡ 30-Sec/Min Match SLA</span>
              <span>•</span>
              <span className="text-[#F9DF8D]">🎬 24-48h 9:16 Reel Turnaround</span>
              <span>•</span>
              <span className="text-[#F9DF8D]">🛡️ 100% Escrow Protection</span>
              <span>•</span>
              <span>📍 Hazratganj • Gomti Nagar • Chowk • Aminabad</span>
            </div>

            <div className="text-[11px] text-[#D4AF37]">
              Lakhnavi Tehzeeb & Culture • PRD v0.1 MVP
            </div>
          </div>
        </footer>
      </div>
    </AppProvider>
  );
}

export default App;
