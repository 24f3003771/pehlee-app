export type UserRole = 'showcase' | 'business' | 'creator' | 'whatsapp' | 'admin';

export type LucknowArea = 
  | 'Hazratganj' 
  | 'Gomti Nagar' 
  | 'Alambagh' 
  | 'Indira Nagar' 
  | 'Mahanagar' 
  | 'Chowk' 
  | 'Aminabad' 
  | 'Ashiyana' 
  | 'Jankipuram' 
  | 'Charbagh';

export type BusinessCategory = 
  | 'Awadhi Food & Cafe'
  | 'Chikan & Fashion Boutique'
  | 'Clinic & Dental'
  | 'Coaching & Education'
  | 'Jewellery & Wedding'
  | 'Salon & Wellness';

export type BookingStatus = 
  | 'SEARCHING'          // Within 30-min SLA
  | 'CONFIRMED'          // Creator matched
  | 'ON_THE_WAY'        // Creator traveling
  | 'ARRIVED'           // Creator checked-in with GPS
  | 'SHOOTING'          // On-site recording
  | 'UPLOADED'          // Raw footage uploaded
  | 'EDITING'           // Post-production 9:16
  | 'DELIVERED'         // Reel ready for approval
  | 'REVISION_REQUESTED'// Customer requested 1 free edit
  | 'APPROVED'          // Final approved, payout released
  | 'CANCELLED'         // Cancelled / Refunded
  | 'FALLBACK_REFUND';  // Unmatched in 30m, refunded

export interface PackagePlan {
  id: string;
  name: string;
  hindiName: string;
  reelsCount: number;
  price: number;
  originalPrice: number;
  durationHours: number;
  turnaroundHours: number;
  popular?: boolean;
  features: string[];
  recommendedFor: string;
}

export interface Creator {
  id: string;
  name: string;
  phone: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  onTimeRate: number;
  tier: 'New' | 'Trusted' | 'Pro Lakhnavi';
  equipment: string[];
  skills: string[];
  serviceAreas: LucknowArea[];
  verified: boolean;
  verificationStatus: 'VERIFIED' | 'PENDING' | 'REJECTED';
  idProofUrl?: string;
  selfieUrl?: string;
  sampleReels: { title: string; views: string; url: string; thumbnail: string }[];
  totalEarnings: number;
  pendingPayout: number;
  upiId: string;
  completedShoots: number;
}

export interface BriefData {
  category: BusinessCategory;
  businessName: string;
  instagramHandle: string;
  address: string;
  area: LucknowArea;
  keyOfferOrUSP: string;
  talkingPoints: string[];
  audioPreference: 'Trending Hindi/Bhojpuri' | 'Aesthetic Lo-Fi' | 'High Energy Pop' | 'Voiceover Dialogue';
  specialInstructions?: string;
}

export interface DeliverableData {
  videoUrl: string;
  thumbnailUrl: string;
  caption: string;
  suggestedHashtags: string[];
  resolution: string;
  durationSec: number;
  version: number;
  uploadedAt: string;
  revisionNotes?: string;
}

export interface Booking {
  id: string;
  bookingNumber: string;
  businessName: string;
  businessPhone: string;
  instagramHandle: string;
  area: LucknowArea;
  address: string;
  category: BusinessCategory;
  packageId: string;
  packageName: string;
  price: number;
  platformFee: number;
  creatorPayout: number;
  slot: string;
  isASAP: boolean;
  brief: BriefData;
  status: BookingStatus;
  createdAt: string;
  confirmationDeadline: string; // 30 minutes from creation
  deliveryDeadline: string;     // 24-48 hours from shoot completion
  matchedCreatorId?: string;
  assignedCreator?: Creator;
  checkInTime?: string;
  rawClipsCount?: number;
  deliverable?: DeliverableData;
  rating?: number;
  reviewComment?: string;
  customerReviewTags?: string[];
  escalationLevel: 'NORMAL' | 'EXPANDED_RADIUS' | 'ADMIN_ALERT' | 'FALLBACK';
  paymentMethod: 'UPI (GPay/PhonePe)' | 'Razorpay' | 'Credit Card';
  paymentStatus: 'PAID_ESCROW' | 'RELEASED_TO_CREATOR' | 'REFUNDED';
}

export interface ChatMessage {
  id: string;
  senderRole: 'business' | 'creator' | 'system';
  senderName: string;
  text: string;
  timestamp: string;
}

export interface WhatsAppMessage {
  id: string;
  from: 'bot' | 'user';
  text: string;
  timestamp: string;
  buttons?: { id: string; label: string; payload: string }[];
  bookingCard?: Partial<Booking>;
}

