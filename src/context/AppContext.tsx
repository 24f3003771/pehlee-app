import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserRole, 
  Booking, 
  Creator, 
  PackagePlan, 
  ChatMessage, 
  BookingStatus,
  DeliverableData
} from '../types';
import { 
  INITIAL_BOOKINGS, 
  INITIAL_CREATORS, 
  PACKAGES 
} from '../data/mockData';

export interface ToastNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'whatsapp';
  timestamp: string;
}

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  activeBookingId: string;
  setActiveBookingId: (id: string) => void;
  bookings: Booking[];
  creators: Creator[];
  packages: PackagePlan[];
  platformCommission: number; // percentage, e.g. 20
  setPlatformCommission: (rate: number) => void;
  toasts: ToastNotification[];
  removeToast: (id: string) => void;
  addToast: (title: string, message: string, type?: ToastNotification['type']) => void;
  
  // Business Actions
  createNewBooking: (newBooking: Partial<Booking>) => string;
  requestRevision: (bookingId: string, notes: string) => void;
  approveDeliverable: (bookingId: string, rating: number, comment: string, tags?: string[]) => void;
  cancelBooking: (bookingId: string, reason: string) => void;
  
  // Creator Actions
  acceptGig: (bookingId: string, creatorId: string) => void;
  creatorCheckIn: (bookingId: string) => void;
  creatorUploadRaw: (bookingId: string, clipsCount: number) => void;
  creatorDeliverReel: (bookingId: string, deliverable: DeliverableData) => void;
  creatorWithdrawPayout: (creatorId: string) => void;
  
  // Admin Actions
  verifyCreator: (creatorId: string, approved: boolean) => void;
  adminManualAssign: (bookingId: string, creatorId: string) => void;
  adminIssueRefund: (bookingId: string, reason: string) => void;
  
  // Chat
  chatMessages: Record<string, ChatMessage[]>;
  sendChatMessage: (bookingId: string, role: 'business' | 'creator', text: string) => void;

  // Simulator Fast-Forward helper
  advanceBookingStatus: (bookingId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('showcase');
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [creators, setCreators] = useState<Creator[]>(INITIAL_CREATORS);
  const [packages] = useState<PackagePlan[]>(PACKAGES);
  const [activeBookingId, setActiveBookingId] = useState<string>('PA-LK-8821');
  const [platformCommission, setPlatformCommission] = useState<number>(20);
  const [toasts, setToasts] = useState<ToastNotification[]>([
    {
      id: 'init-1',
      title: 'Pehle Aap Platform Active',
      message: 'Hyperlocal matching operational across 10 Lucknow zones.',
      type: 'info',
      timestamp: 'Just now'
    }
  ]);

  const [chatMessages, setChatMessages] = useState<Record<string, ChatMessage[]>>({
    'PA-LK-8821': [
      {
        id: 'c1',
        senderRole: 'system',
        senderName: 'Pehle Aap Bot',
        text: 'Aman Verma (+91 98XXX XXXXX - Masked) confirmed your shoot. Arriving at Royal Cafe, Hazratganj.',
        timestamp: '03:45 PM'
      },
      {
        id: 'c2',
        senderRole: 'creator',
        senderName: 'Aman (Creator)',
        text: 'Namaste sir! I have arrived outside Royal Cafe. Setting up the wireless mic and gimbal.',
        timestamp: '03:52 PM'
      },
      {
        id: 'c3',
        senderRole: 'business',
        senderName: 'Royal Cafe Owner',
        text: 'Welcome Aman. Ask for table 4 near the glass window. Chef is preparing the Basket Chaat for the shot.',
        timestamp: '03:54 PM'
      }
    ]
  });

  const addToast = (title: string, message: string, type: ToastNotification['type'] = 'info') => {
    const newToast: ToastNotification = {
      id: Date.now().toString(),
      title,
      message,
      type,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setToasts(prev => [newToast, ...prev.slice(0, 4)]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const createNewBooking = (partialBooking: Partial<Booking>): string => {
    const bookingNum = `PA-LK-${Math.floor(1000 + Math.random() * 9000)}`;
    const price = partialBooking.price || 999;
    const fee = Math.round(price * (platformCommission / 100));
    const payout = price - fee;

    const newBooking: Booking = {
      id: bookingNum,
      bookingNumber: bookingNum,
      businessName: partialBooking.businessName || 'Hazratganj Boutique',
      businessPhone: partialBooking.businessPhone || '+91 98390 00000',
      instagramHandle: partialBooking.instagramHandle || '@lucknow_spot',
      area: partialBooking.area || 'Hazratganj',
      address: partialBooking.address || 'Hazratganj Market, Lucknow',
      category: partialBooking.category || 'Awadhi Food & Cafe',
      packageId: partialBooking.packageId || 'pack-single',
      packageName: partialBooking.packageName || 'Single Reel Quick-Drop',
      price,
      platformFee: fee,
      creatorPayout: payout,
      slot: partialBooking.slot || 'Today, ASAP',
      isASAP: partialBooking.isASAP || false,
      status: 'SEARCHING',
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      confirmationDeadline: 'Within 30 mins',
      deliveryDeadline: 'Within 24-48 hrs of shoot',
      escalationLevel: 'NORMAL',
      paymentMethod: partialBooking.paymentMethod || 'UPI (GPay/PhonePe)',
      paymentStatus: 'PAID_ESCROW',
      brief: partialBooking.brief!
    };

    setBookings(prev => [newBooking, ...prev]);
    setActiveBookingId(newBooking.id);

    addToast(
      '🎯 Booking Broadcasted!',
      `Searching nearby verified creators in ${newBooking.area}. 30-min SLA timer active!`,
      'info'
    );

    // Auto trigger WhatsApp simulation alert
    setTimeout(() => {
      addToast(
        '💬 WhatsApp Update Sent',
        `Pehle Aap Bot sent booking confirmation #${bookingNum} to ${newBooking.businessPhone}`,
        'whatsapp'
      );
    }, 1500);

    return newBooking.id;
  };

  const acceptGig = (bookingId: string, creatorId: string) => {
    const creator = creators.find(c => c.id === creatorId);
    if (!creator) return;

    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        return {
          ...b,
          status: 'CONFIRMED' as BookingStatus,
          matchedCreatorId: creator.id,
          assignedCreator: creator
        };
      }
      return b;
    }));

    addToast(
      '⚡ Creator Confirmed (30-min SLA Met!)',
      `${creator.name} (${creator.tier}) accepted shoot #${bookingId}. Confirmation SLA satisfied!`,
      'success'
    );

    // Add system message
    setChatMessages(prev => ({
      ...prev,
      [bookingId]: [
        ...(prev[bookingId] || []),
        {
          id: Date.now().toString(),
          senderRole: 'system',
          senderName: 'Pehle Aap Dispatch',
          text: `${creator.name} has accepted the booking! Masked in-app chat is now live.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]
    }));
  };

  const creatorCheckIn = (bookingId: string) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        return {
          ...b,
          status: 'SHOOTING' as BookingStatus,
          checkInTime: timeStr
        };
      }
      return b;
    }));

    addToast(
      '📍 Creator GPS Check-in Verified',
      `Creator checked in at business location. Shoot has officially begun!`,
      'info'
    );
  };

  const creatorUploadRaw = (bookingId: string, clipsCount: number) => {
    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        return {
          ...b,
          status: 'EDITING' as BookingStatus,
          rawClipsCount: clipsCount
        };
      }
      return b;
    }));

    addToast(
      '☁️ Raw Footage Uploaded',
      `${clipsCount} HD clips synced to cloud. Post-production countdown started (24-48h SLA).`,
      'info'
    );
  };

  const creatorDeliverReel = (bookingId: string, deliverable: DeliverableData) => {
    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        return {
          ...b,
          status: 'DELIVERED' as BookingStatus,
          deliverable
        };
      }
      return b;
    }));

    addToast(
      '🎬 9:16 Reel Delivered!',
      `Creator uploaded the final edit. Ready for business review & approval!`,
      'success'
    );
  };

  const requestRevision = (bookingId: string, notes: string) => {
    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        return {
          ...b,
          status: 'REVISION_REQUESTED' as BookingStatus,
          deliverable: b.deliverable ? {
            ...b.deliverable,
            revisionNotes: notes,
            version: (b.deliverable.version || 1) + 1
          } : undefined
        };
      }
      return b;
    }));

    addToast(
      '🔄 Free Revision Requested',
      `Feedback notes sent to creator: "${notes.slice(0, 40)}..."`,
      'warning'
    );
  };

  const approveDeliverable = (bookingId: string, rating: number, comment: string, tags?: string[]) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return;

    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        return {
          ...b,
          status: 'APPROVED' as BookingStatus,
          rating,
          reviewComment: comment,
          customerReviewTags: tags,
          paymentStatus: 'RELEASED_TO_CREATOR'
        };
      }
      return b;
    }));

    // Credit creator earnings
    if (booking.matchedCreatorId) {
      setCreators(prev => prev.map(c => {
        if (c.id === booking.matchedCreatorId) {
          return {
            ...c,
            totalEarnings: c.totalEarnings + booking.creatorPayout,
            pendingPayout: c.pendingPayout + booking.creatorPayout,
            completedShoots: c.completedShoots + 1,
            rating: Number(((c.rating * c.reviewCount + rating) / (c.reviewCount + 1)).toFixed(1)),
            reviewCount: c.reviewCount + 1
          };
        }
        return c;
      }));
    }

    addToast(
      '🎉 Reel Approved & Payment Released!',
      `₹${booking.creatorPayout} transferred from escrow to creator's UPI wallet. Thank you!`,
      'success'
    );
  };

  const cancelBooking = (bookingId: string, reason: string) => {
    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        return {
          ...b,
          status: 'CANCELLED' as BookingStatus,
          paymentStatus: 'REFUNDED'
        };
      }
      return b;
    }));

    addToast(
      '🚫 Booking Cancelled & Refunded',
      `Booking #${bookingId} cancelled. Full refund issued: ${reason}`,
      'warning'
    );
  };

  const creatorWithdrawPayout = (creatorId: string) => {
    const creator = creators.find(c => c.id === creatorId);
    if (!creator || creator.pendingPayout <= 0) return;

    const amount = creator.pendingPayout;
    setCreators(prev => prev.map(c => {
      if (c.id === creatorId) {
        return { ...c, pendingPayout: 0 };
      }
      return c;
    }));

    addToast(
      '💸 Instant UPI Payout Initiated',
      `₹${amount} dispatched to ${creator.upiId}. Bank confirmation in 120s!`,
      'success'
    );
  };

  const verifyCreator = (creatorId: string, approved: boolean) => {
    setCreators(prev => prev.map(c => {
      if (c.id === creatorId) {
        return {
          ...c,
          verified: approved,
          verificationStatus: approved ? 'VERIFIED' : 'REJECTED'
        };
      }
      return c;
    }));

    addToast(
      approved ? '✅ Creator Verified' : '❌ Creator Application Rejected',
      approved ? 'Creator can now receive high-priority Lucknow gigs.' : 'Notice sent with rejection criteria.',
      approved ? 'success' : 'warning'
    );
  };

  const adminManualAssign = (bookingId: string, creatorId: string) => {
    acceptGig(bookingId, creatorId);
    addToast(
      '🛡️ Admin Override: Manual Dispatch',
      `Admin manually assigned booking #${bookingId} to resolve escalation.`,
      'info'
    );
  };

  const adminIssueRefund = (bookingId: string, reason: string) => {
    cancelBooking(bookingId, `Admin Refund: ${reason}`);
  };

  const sendChatMessage = (bookingId: string, senderRole: 'business' | 'creator', text: string) => {
    const senderName = senderRole === 'business' ? 'Business Owner' : 'Creator';
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      senderRole,
      senderName,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => ({
      ...prev,
      [bookingId]: [...(prev[bookingId] || []), newMsg]
    }));
  };

  // Helper to advance booking through stages for quick demonstration
  const advanceBookingStatus = (bookingId: string) => {
    const b = bookings.find(item => item.id === bookingId);
    if (!b) return;

    switch (b.status) {
      case 'SEARCHING':
        acceptGig(bookingId, creators[0].id);
        break;
      case 'CONFIRMED':
        setBookings(prev => prev.map(x => x.id === bookingId ? { ...x, status: 'ON_THE_WAY' } : x));
        addToast('🛵 Creator En Route', 'Aman is on his way to Royal Cafe, Hazratganj.', 'info');
        break;
      case 'ON_THE_WAY':
        creatorCheckIn(bookingId);
        break;
      case 'ARRIVED':
      case 'SHOOTING':
        creatorUploadRaw(bookingId, 14);
        break;
      case 'UPLOADED':
      case 'EDITING':
        creatorDeliverReel(bookingId, {
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
          thumbnailUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80',
          caption: '🔥 Sizzling Awadhi Flavors now in Hazratganj! Check out the secret recipe.',
          suggestedHashtags: ['#LucknowFood', '#Hazratganj', '#PehleAap'],
          resolution: '1080x1920 (9:16 HD)',
          durationSec: 30,
          version: 1,
          uploadedAt: 'Just now'
        });
        break;
      case 'DELIVERED':
        approveDeliverable(bookingId, 5, 'Lakhnavi tehzeeb aur zabardast lighting! Super on-time delivery.', ['Punctual', 'Creative Angles', 'Lakhnavi Tehzeeb']);
        break;
      default:
        break;
    }
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        activeBookingId,
        setActiveBookingId,
        bookings,
        creators,
        packages,
        platformCommission,
        setPlatformCommission,
        toasts,
        removeToast,
        addToast,
        createNewBooking,
        requestRevision,
        approveDeliverable,
        cancelBooking,
        acceptGig,
        creatorCheckIn,
        creatorUploadRaw,
        creatorDeliverReel,
        creatorWithdrawPayout,
        verifyCreator,
        adminManualAssign,
        adminIssueRefund,
        chatMessages,
        sendChatMessage,
        advanceBookingStatus
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

