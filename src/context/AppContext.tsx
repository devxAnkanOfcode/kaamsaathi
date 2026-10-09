import React, { createContext, useContext, useState, useEffect } from 'react';
import { Worker, ServiceCategory, PlatformRole, LanguageCode, BookingRequest } from '../types';
import { WORKERS_DATA } from '../data/workers';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface AppContextType {
  role: PlatformRole;
  setRole: (role: PlatformRole) => void;
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  city: string;
  setCity: (city: string) => void;
  locality: string;
  setLocality: (loc: string) => void;
  selectedCategory: ServiceCategory | null;
  setSelectedCategory: (cat: ServiceCategory | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  // Modals & Flows
  selectedWorkerForProfile: Worker | null;
  openWorkerProfile: (worker: Worker) => void;
  closeWorkerProfile: () => void;
  
  bookingModalOpen: boolean;
  openBookingModal: (category?: ServiceCategory, worker?: Worker) => void;
  closeBookingModal: () => void;
  
  preselectedWorker: Worker | null;
  
  // Active Customer Booking & Live Tracking
  activeBooking: BookingRequest | null;
  liveTrackingOpen: boolean;
  setLiveTrackingOpen: (open: boolean) => void;
  createBooking: (data: {
    category: ServiceCategory;
    subService: string;
    description: string;
    urgency: 'immediate' | 'today' | 'scheduled';
    worker?: Worker;
  }) => void;
  cancelActiveBooking: () => void;
  completeActiveBooking: () => void;

  // Worker Mode State
  workerIsOnline: boolean;
  toggleWorkerOnline: () => void;
  incomingJobAlert: BookingRequest | null;
  acceptIncomingJob: () => void;
  dismissIncomingJob: () => void;
  triggerSimulatedJobRequest: () => void;
  workerStats: {
    todayEarnings: number;
    jobsDone: number;
    rating: number;
    acceptanceRate: number;
    walletBalance: number;
  };
  withdrawWalletFunds: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<PlatformRole>('customer');
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [city, setCity] = useState<string>('Bengaluru');
  const [locality, setLocality] = useState<string>('Indiranagar 100ft Rd');
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals
  const [selectedWorkerForProfile, setSelectedWorkerForProfile] = useState<Worker | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState<boolean>(false);
  const [preselectedWorker, setPreselectedWorker] = useState<Worker | null>(null);

  // Live Tracking
  const [activeBooking, setActiveBooking] = useState<BookingRequest | null>(null);
  const [liveTrackingOpen, setLiveTrackingOpen] = useState<boolean>(false);

  // Worker Portal State
  const [workerIsOnline, setWorkerIsOnline] = useState<boolean>(true);
  const [incomingJobAlert, setIncomingJobAlert] = useState<BookingRequest | null>(null);
  const [workerStats, setWorkerStats] = useState({
    todayEarnings: 1850,
    jobsDone: 3,
    rating: 4.94,
    acceptanceRate: 98,
    walletBalance: 4220,
  });

  const openWorkerProfile = (worker: Worker) => {
    sound.playClick();
    setSelectedWorkerForProfile(worker);
  };

  const closeWorkerProfile = () => {
    setSelectedWorkerForProfile(null);
  };

  const openBookingModal = (category?: ServiceCategory, worker?: Worker) => {
    sound.playClick();
    if (category) setSelectedCategory(category);
    if (worker) setPreselectedWorker(worker);
    else setPreselectedWorker(null);
    setBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setBookingModalOpen(false);
  };

  const createBooking = (data: {
    category: ServiceCategory;
    subService: string;
    description: string;
    urgency: 'immediate' | 'today' | 'scheduled';
    worker?: Worker;
  }) => {
    const assigned = data.worker || WORKERS_DATA.find(w => w.category === data.category && w.isAvailableNow) || WORKERS_DATA[0];
    const newBooking: BookingRequest = {
      id: `KS-${Math.floor(100000 + Math.random() * 900000)}`,
      serviceCategory: data.category,
      subService: data.subService,
      problemDescription: data.description,
      urgency: data.urgency,
      locality: locality,
      customerName: 'Aditi Sharma',
      customerPhone: '+91 98765 43210',
      workerId: assigned.id,
      assignedWorker: assigned,
      status: 'en_route',
      totalPrice: assigned.minVisitingCharge + 150,
      otp: `${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: 'Just now',
    };

    setActiveBooking(newBooking);
    setBookingModalOpen(false);
    setLiveTrackingOpen(true);
    sound.playSuccess();
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // Ignore if confetti unavailable
    }
  };

  const cancelActiveBooking = () => {
    sound.playClick();
    setActiveBooking(null);
    setLiveTrackingOpen(false);
  };

  const completeActiveBooking = () => {
    if (activeBooking) {
      sound.playSuccess();
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.5 }
        });
      } catch {
        // Ignore
      }
      setActiveBooking(prev => prev ? { ...prev, status: 'completed' } : null);
    }
  };

  // Worker controls
  const toggleWorkerOnline = () => {
    sound.playClick();
    setWorkerIsOnline(prev => !prev);
  };

  const triggerSimulatedJobRequest = () => {
    sound.playIncomingAlert();
    const demoJob: BookingRequest = {
      id: `KS-${Math.floor(100000 + Math.random() * 900000)}`,
      serviceCategory: 'electrician',
      subService: 'Water Motor Auto-Cutoff Short Circuit',
      problemDescription: 'Water tank overflow sensor sparks when turned on. Need urgent inspection.',
      urgency: 'immediate',
      locality: 'Indiranagar 12th Main (1.3 km away)',
      customerName: 'Rahul Verma',
      customerPhone: '+91 98111 22334',
      status: 'searching',
      totalPrice: 499,
      otp: '7842',
      createdAt: '15 seconds ago'
    };
    setIncomingJobAlert(demoJob);
  };

  const acceptIncomingJob = () => {
    sound.playSuccess();
    if (incomingJobAlert) {
      setWorkerStats(prev => ({
        ...prev,
        jobsDone: prev.jobsDone + 1,
        todayEarnings: prev.todayEarnings + incomingJobAlert.totalPrice,
        walletBalance: prev.walletBalance + incomingJobAlert.totalPrice,
      }));
      setIncomingJobAlert(null);
      try {
        confetti({
          particleCount: 90,
          spread: 65,
          origin: { y: 0.5 }
        });
      } catch {}
    }
  };

  const dismissIncomingJob = () => {
    sound.playClick();
    setIncomingJobAlert(null);
  };

  const withdrawWalletFunds = () => {
    sound.playSuccess();
    setWorkerStats(prev => ({
      ...prev,
      walletBalance: 0
    }));
    try {
      confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.7 }
      });
    } catch {}
  };

  // Auto-trigger a simulated job alert after 12 seconds in worker mode for demonstration
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (role === 'worker' && workerIsOnline && !incomingJobAlert) {
      timer = setTimeout(() => {
        triggerSimulatedJobRequest();
      }, 8000);
    }
    return () => clearTimeout(timer);
  }, [role, workerIsOnline]);

  return (
    <AppContext.Provider
      value={{
        role,
        setRole: (r) => {
          sound.playClick();
          setRole(r);
        },
        language,
        setLanguage: (l) => {
          sound.playClick();
          setLanguage(l);
        },
        city,
        setCity,
        locality,
        setLocality,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        selectedWorkerForProfile,
        openWorkerProfile,
        closeWorkerProfile,
        bookingModalOpen,
        openBookingModal,
        closeBookingModal,
        preselectedWorker,
        activeBooking,
        liveTrackingOpen,
        setLiveTrackingOpen,
        createBooking,
        cancelActiveBooking,
        completeActiveBooking,
        workerIsOnline,
        toggleWorkerOnline,
        incomingJobAlert,
        acceptIncomingJob,
        dismissIncomingJob,
        triggerSimulatedJobRequest,
        workerStats,
        withdrawWalletFunds,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
