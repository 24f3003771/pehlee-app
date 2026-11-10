import { PackagePlan, Creator, Booking, LucknowArea, BusinessCategory } from '../types';

export const LUCKNOW_AREAS: LucknowArea[] = [
  'Hazratganj',
  'Gomti Nagar',
  'Alambagh',
  'Indira Nagar',
  'Mahanagar',
  'Chowk',
  'Aminabad',
  'Ashiyana',
  'Jankipuram',
  'Charbagh'
];

export const PACKAGES: PackagePlan[] = [
  {
    id: 'pack-single',
    name: 'Single Reel Quick-Drop',
    hindiName: 'एक रील धमाका',
    reelsCount: 1,
    price: 999,
    originalPrice: 1499,
    durationHours: 1,
    turnaroundHours: 24,
    features: [
      '1 Verified Creator on-site (60 mins shoot)',
      '1 Postable 9:16 HD Reel with color grading',
      'Trending Lakhnavi / Bollywood Audio sync',
      'AI Optimized Caption & Hashtags included',
      '1 Free Revision guaranteed',
      'Delivered in 24 Hours'
    ],
    recommendedFor: 'Event launch, signature dish spotlight, weekend flash sale'
  },
  {
    id: 'pack-growth',
    name: '4-Reel Growth Pack',
    hindiName: '4 रील ग्रोथ पैक (सर्वाधिक लोकप्रिय)',
    reelsCount: 4,
    price: 3499,
    originalPrice: 4999,
    durationHours: 2,
    turnaroundHours: 48,
    popular: true,
    features: [
      '2-Hour Dedicated Pro Creator shoot session',
      '4 Strategic 9:16 Reels for the entire month',
      'Hook, Problem & CTA script template provided',
      'Brand logo watermark & text overlays',
      '1 Free Revision per reel',
      'Priority 30-min matching guarantee'
    ],
    recommendedFor: 'Cafes, Boutiques, Dental Clinics, Coaching Centers wanting steady Instagram reach'
  },
  {
    id: 'pack-partner',
    name: '8-Reel Monthly Content Partner',
    hindiName: '8 रील मंथली पार्टनर पैक',
    reelsCount: 8,
    price: 6499,
    originalPrice: 8999,
    durationHours: 4,
    turnaroundHours: 48,
    features: [
      '2 Split Shoots (2 hours each, scheduled 15 days apart)',
      '8 High-converting Reels with dedicated post-editor',
      'B-roll cinematic shots + Customer testimonials',
      'Custom Voiceover & Audio master included',
      'Direct WhatsApp SMM coordination',
      'Free Raw Footage archive access'
    ],
    recommendedFor: 'Established restaurants, bridal stores, multi-branch clinics'
  }
];

export const CATEGORY_TEMPLATES: Record<BusinessCategory, {
  title: string;
  defaultOffer: string;
  suggestedPoints: string[];
  suggestedAudio: string;
}> = {
  'Awadhi Food & Cafe': {
    title: 'Food & Cafe Showcase',
    defaultOffer: 'Flat 20% off on First Dine-in or Free Dessert with Basket Chaat',
    suggestedPoints: [
      'Sizzling food plating & cheese pull / kebab smoke',
      'Cozy cafe ambience, neon signs & seating aesthetic',
      'Chef plating secret specialty & hygiene in kitchen',
      'Customer first-bite genuine reaction'
    ],
    suggestedAudio: 'Trending Lakhnavi Lo-Fi / Instrumental Sitar + HipHop'
  },
  'Chikan & Fashion Boutique': {
    title: 'Lucknowi Chikan & Couture',
    defaultOffer: 'Festive Chikankari collection starting at ₹1,199',
    suggestedPoints: [
      'Macro closeup of authentic handmade shadow-work & bakhiya embroidery',
      'Styling 1 Kurta in 3 different modern looks',
      'Store aesthetic & mirror try-on transition',
      'Pure Georgette & Mulmul fabric breathability test'
    ],
    suggestedAudio: 'Aesthetic Royal Classical Fusion'
  },
  'Clinic & Dental': {
    title: 'Clinic & Doctor Trust Reel',
    defaultOffer: 'Free Initial Dental Consultation & Scan this week',
    suggestedPoints: [
      'Doctor explaining common smile misconception in 15 seconds',
      'State-of-the-art painless German dental chair & sterilization',
      'Happy patient before-and-after smile transformation',
      'Friendly staff welcoming clinic tour'
    ],
    suggestedAudio: 'Calm, authoritative modern corporate acoustic'
  },
  'Coaching & Education': {
    title: 'Coaching & Student Success',
    defaultOffer: 'New Batch Admissions Open + Free Scholarship Diagnostic Test',
    suggestedPoints: [
      'Faculty solving complex trick in 20 seconds on smart interactive board',
      'Air-conditioned library, study cabins & doubt-clearing cell',
      'Recent UP Board / NEET / CUET ranker heartfelt review',
      'Limited seats CTA with contact number on screen'
    ],
    suggestedAudio: 'High Energy Motivational Beat'
  },
  'Jewellery & Wedding': {
    title: 'Bridal & Gold Jewellery',
    defaultOffer: '0% Making Charges on First Gold Purchase + Free Bridal Styling',
    suggestedPoints: [
      'Macro sparkle light reflections on Kundan & Polki choker set',
      'Bride wearing necklace with royal slow-motion portrait',
      'Hallmark 916 purity stamp demonstration',
      'Exquisite wedding gift packaging'
    ],
    suggestedAudio: 'Royal Shehnai + Modern Bass Wedding Anthem'
  },
  'Salon & Wellness': {
    title: 'Salon Transformation & Glow',
    defaultOffer: 'Hydra-Facial + Keratin Spa combo at ₹1,999 only',
    suggestedPoints: [
      'Satisfying ASMR hair wash and scalp steam therapy',
      'Dramatic Before vs After hair color/glow reveal',
      'Certified aesthetician hygienic tool setup',
      'Client relaxing with herbal tea in salon lounge'
    ],
    suggestedAudio: 'Upbeat Aesthetic Pop / Clean Transition Beat'
  }
};

export const INITIAL_CREATORS: Creator[] = [
  {
    id: 'creator-1',
    name: 'Aman Verma',
    phone: '+91 98390 11223',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    rating: 4.9,
    reviewCount: 48,
    onTimeRate: 98,
    tier: 'Pro Lakhnavi',
    equipment: ['iPhone 15 Pro Max', 'DJI Osmo Mobile 6 Gimbal', 'Rode Wireless ME Mic', 'Godox LED Panel'],
    skills: ['Cinematic Food Shots', 'Reel Hook Pacing', 'Color Grading', 'Fluent Hindi/Urdu'],
    serviceAreas: ['Hazratganj', 'Gomti Nagar', 'Mahanagar', 'Indira Nagar'],
    verified: true,
    verificationStatus: 'VERIFIED',
    sampleReels: [
      {
        title: 'Awadhi Biryani Smoke Pour',
        views: '124K',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=400&q=80'
      },
      {
        title: 'Chikan Kurta Shadow Work Macro',
        views: '89K',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=400&q=80'
      }
    ],
    totalEarnings: 38400,
    pendingPayout: 2800,
    upiId: 'aman.verma@okhdfcbank',
    completedShoots: 42
  },
  {
    id: 'creator-2',
    name: 'Ritika Srivastava',
    phone: '+91 94501 88344',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
    rating: 4.8,
    reviewCount: 32,
    onTimeRate: 96,
    tier: 'Trusted',
    equipment: ['iPhone 14 Pro', 'Hohem iSteady M6', 'Boya Wireless Mic'],
    skills: ['Fashion Modeling Reels', 'Aesthetic Transitions', 'Voiceover Editing'],
    serviceAreas: ['Hazratganj', 'Chowk', 'Aminabad', 'Alambagh'],
    verified: true,
    verificationStatus: 'VERIFIED',
    sampleReels: [
      {
        title: 'Hazratganj Boutique Walkthrough',
        views: '67K',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=400&q=80'
      }
    ],
    totalEarnings: 24500,
    pendingPayout: 1750,
    upiId: 'ritika.srivastava@oksbi',
    completedShoots: 27
  },
  {
    id: 'creator-3',
    name: 'Mohd. Zeeshan',
    phone: '+91 97920 44556',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    rating: 4.7,
    reviewCount: 19,
    onTimeRate: 94,
    tier: 'Trusted',
    equipment: ['Sony A6700', 'Sigma 16mm f/1.4', 'DJI Mic 2'],
    skills: ['Doctor Clinic Tours', 'Educational Classrooms', 'Crisp Audio'],
    serviceAreas: ['Gomti Nagar', 'Indira Nagar', 'Jankipuram', 'Mahanagar'],
    verified: true,
    verificationStatus: 'VERIFIED',
    sampleReels: [
      {
        title: 'Modern Dental Clinic Before/After',
        views: '45K',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=400&q=80'
      }
    ],
    totalEarnings: 16200,
    pendingPayout: 0,
    upiId: 'zeeshan.lucknow@paytm',
    completedShoots: 18
  },
  {
    id: 'creator-4',
    name: 'Ananya Bajpai',
    phone: '+91 91200 99881',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    rating: 5.0,
    reviewCount: 4,
    onTimeRate: 100,
    tier: 'New',
    equipment: ['iPhone 15', 'Gimbal Stabilizer'],
    skills: ['Cafe Reels', 'Trending Sounds'],
    serviceAreas: ['Alambagh', 'Ashiyana', 'Charbagh'],
    verified: true,
    verificationStatus: 'VERIFIED',
    sampleReels: [
      {
        title: 'Ashiyana Dessert Cafe Reel',
        views: '12K',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=400&q=80'
      }
    ],
    totalEarnings: 3200,
    pendingPayout: 800,
    upiId: 'ananya.bajpai@ybl',
    completedShoots: 4
  },
  {
    id: 'creator-5',
    name: 'Farhan Siddiqui',
    phone: '+91 96210 33211',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    rating: 0,
    reviewCount: 0,
    onTimeRate: 100,
    tier: 'New',
    equipment: ['OnePlus 12', 'Boya M1'],
    skills: ['Street Food Reels', 'Bhojpuri & Hindi Dialogue'],
    serviceAreas: ['Chowk', 'Aminabad'],
    verified: false,
    verificationStatus: 'PENDING',
    sampleReels: [
      {
        title: 'Tundey Kabab Heritage Galawat',
        views: '35K',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80'
      }
    ],
    totalEarnings: 0,
    pendingPayout: 0,
    upiId: 'farhan.siddiqui@icici',
    completedShoots: 0
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'PA-LK-8821',
    bookingNumber: 'PA-LK-8821',
    businessName: 'Royal Cafe & Lounge',
    businessPhone: '+91 94150 23411',
    instagramHandle: '@royalcafe_hazratganj',
    area: 'Hazratganj',
    address: '9/4 Shahnajaf Road, Opp. Sahu Cinema, Hazratganj, Lucknow',
    category: 'Awadhi Food & Cafe',
    packageId: 'pack-growth',
    packageName: '4-Reel Growth Pack',
    price: 3499,
    platformFee: 699, // 20%
    creatorPayout: 2800, // 80%
    slot: 'Today, 4:00 PM – 6:00 PM',
    isASAP: false,
    status: 'DELIVERED',
    createdAt: '2026-11-04 11:30 AM',
    confirmationDeadline: '2026-11-04 12:00 PM',
    deliveryDeadline: '2026-11-05 06:00 PM',
    matchedCreatorId: 'creator-1',
    assignedCreator: INITIAL_CREATORS[0],
    checkInTime: '2026-11-04 03:52 PM',
    rawClipsCount: 18,
    deliverable: {
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80',
      caption: '✨ Taste the royal legacy of Lucknow at Royal Cafe! From our legendary Basket Chaat to sizzling Awadhi treats, your evening plans are sorted. Tag your foodie squad! 📍 Shahnajaf Rd, Hazratganj.',
      suggestedHashtags: ['#LucknowFoodies', '#Hazratganj', '#RoyalCafeLucknow', '#BasketChaat', '#PehleAapReels', '#LucknowCafes'],
      resolution: '1080x1920 (9:16 Vertical HD)',
      durationSec: 32,
      version: 1,
      uploadedAt: '2026-11-05 09:15 AM'
    },
    escalationLevel: 'NORMAL',
    paymentMethod: 'UPI (GPay/PhonePe)',
    paymentStatus: 'PAID_ESCROW',
    brief: {
      category: 'Awadhi Food & Cafe',
      businessName: 'Royal Cafe & Lounge',
      instagramHandle: '@royalcafe_hazratganj',
      address: '9/4 Shahnajaf Road, Hazratganj, Lucknow',
      area: 'Hazratganj',
      keyOfferOrUSP: 'Original inventor of Lucknow Basket Chaat',
      talkingPoints: [
        'Crispy fried basket creation & potato mash filling',
        'Generous pour of sweet tamarind chutney & curd drizzle',
        'Customer taking the legendary giant crunch bite'
      ],
      audioPreference: 'Trending Hindi/Bhojpuri',
      specialInstructions: 'Ensure golden evening warm tones. Show the kitchen hygiene certificate.'
    }
  },
  {
    id: 'PA-LK-8822',
    bookingNumber: 'PA-LK-8822',
    businessName: 'Ada Chikan Studio',
    businessPhone: '+91 98391 77652',
    instagramHandle: '@adachikan_official',
    area: 'Aminabad',
    address: 'Shop 14, Chikan Market, Aminabad, Lucknow',
    category: 'Chikan & Fashion Boutique',
    packageId: 'pack-single',
    packageName: 'Single Reel Quick-Drop',
    price: 999,
    platformFee: 200,
    creatorPayout: 799,
    slot: 'Tomorrow, 11:30 AM – 12:30 PM',
    isASAP: true,
    status: 'SEARCHING',
    createdAt: '2026-11-05 11:40 AM',
    confirmationDeadline: '2026-11-05 12:10 PM',
    deliveryDeadline: '2026-11-06 01:00 PM',
    escalationLevel: 'EXPANDED_RADIUS', // 10 mins elapsed, widened to adjacent Chowk/Hazratganj
    paymentMethod: 'Razorpay',
    paymentStatus: 'PAID_ESCROW',
    brief: {
      category: 'Chikan & Fashion Boutique',
      businessName: 'Ada Chikan Studio',
      instagramHandle: '@adachikan_official',
      address: 'Shop 14, Chikan Market, Aminabad, Lucknow',
      area: 'Aminabad',
      keyOfferOrUSP: 'Pure Georgette festive hand-embroidered Anarkali suits',
      talkingPoints: [
        'Close-up of Bakhiya and Phanda stitches',
        'Model spinning in pastel peach Anarkali',
        'Special festive price badge ₹1,499'
      ],
      audioPreference: 'Aesthetic Lo-Fi',
      specialInstructions: 'Natural soft light. Keep it classy and elegant.'
    }
  },
  {
    id: 'PA-LK-8823',
    bookingNumber: 'PA-LK-8823',
    businessName: 'Awadh Dental Clinic',
    businessPhone: '+91 91400 33441',
    instagramHandle: '@awadhdental_gomtinagar',
    area: 'Gomti Nagar',
    address: 'B-1/44, Vibhuti Khand, Gomti Nagar, Lucknow',
    category: 'Clinic & Dental',
    packageId: 'pack-growth',
    packageName: '4-Reel Growth Pack',
    price: 3499,
    platformFee: 699,
    creatorPayout: 2800,
    slot: 'Today, 2:00 PM – 4:00 PM',
    isASAP: false,
    status: 'SHOOTING',
    createdAt: '2026-11-05 09:00 AM',
    confirmationDeadline: '2026-11-05 09:30 AM',
    deliveryDeadline: '2026-11-06 05:00 PM',
    matchedCreatorId: 'creator-3',
    assignedCreator: INITIAL_CREATORS[2],
    checkInTime: '2026-11-05 01:50 PM',
    rawClipsCount: 9,
    escalationLevel: 'NORMAL',
    paymentMethod: 'UPI (GPay/PhonePe)',
    paymentStatus: 'PAID_ESCROW',
    brief: {
      category: 'Clinic & Dental',
      businessName: 'Awadh Dental Clinic',
      instagramHandle: '@awadhdental_gomtinagar',
      address: 'B-1/44, Vibhuti Khand, Gomti Nagar, Lucknow',
      area: 'Gomti Nagar',
      keyOfferOrUSP: 'Painless Single-Sitting Root Canal & Invisible Aligners',
      talkingPoints: [
        'Dr. Shrivastava bust myths on root canal pain',
        'Show sterile equipment unpackaging',
        '3D scanner demo on patient'
      ],
      audioPreference: 'Voiceover Dialogue',
      specialInstructions: 'Professional tone, no blood shots.'
    }
  }
];

