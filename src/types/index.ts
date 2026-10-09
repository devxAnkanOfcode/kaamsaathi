export type ServiceCategory = 
  | 'electrician'
  | 'plumber'
  | 'carpenter'
  | 'mechanic'
  | 'ac-repair'
  | 'painter'
  | 'cleaner'
  | 'driver'
  | 'welder'
  | 'mason'
  | 'appliance-repair'
  | 'tailor';

export interface SkillEndorsement {
  skill: string;
  count: number;
  certifiedBy?: string;
}

export interface Review {
  id: string;
  customerName: string;
  customerAvatar?: string;
  rating: number;
  date: string;
  comment: string;
  serviceProvided: string;
  locality: string;
  photos?: string[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  beforePhoto?: string;
  afterPhoto: string;
  completedAt: string;
}

export interface Worker {
  id: string;
  name: string;
  avatar: string;
  tradeTitle: string;
  category: ServiceCategory;
  rating: number;
  totalReviews: number;
  jobsCompleted: number;
  experienceYears: number;
  hourlyRate: number;
  minVisitingCharge: number;
  isAvailableNow: boolean;
  distanceKm: number;
  etaMinutes: number;
  locality: string;
  city: string;
  badges: {
    isGovtCertified: boolean;
    certificationName?: string;
    isPoliceVerified: boolean;
    isAadhaarVerified: boolean;
    isTopRated: boolean;
    isSuperWorker: boolean;
  };
  languages: string[];
  skills: SkillEndorsement[];
  bio: string;
  portfolio: PortfolioItem[];
  reviews: Review[];
  vehicle?: string;
  phone: string;
  toolSetReady: boolean;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface ServiceItem {
  id: string;
  category: ServiceCategory;
  title: string;
  hindiTitle: string;
  iconName: string;
  shortDesc: string;
  benchmarkPriceRange: string;
  popularSubServices: string[];
  avgTimeMinutes: number;
}

export interface BookingRequest {
  id: string;
  serviceCategory: ServiceCategory;
  subService: string;
  problemDescription: string;
  urgency: 'immediate' | 'today' | 'scheduled';
  scheduledTime?: string;
  locality: string;
  customerName: string;
  customerPhone: string;
  workerId?: string;
  assignedWorker?: Worker;
  status: 'searching' | 'accepted' | 'en_route' | 'arrived' | 'in_progress' | 'completed' | 'cancelled';
  totalPrice: number;
  otp: string;
  createdAt: string;
}

export type PlatformRole = 'customer' | 'worker';

export type LanguageCode = 'en' | 'hi' | 'kn';
