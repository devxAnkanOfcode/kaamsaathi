import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesGrid } from './components/ServicesGrid';
import { WorkerDirectory } from './components/WorkerDirectory';
import { WorkerProfileModal } from './components/WorkerProfileModal';
import { BookingFlowModal } from './components/BookingFlowModal';
import { LiveTrackingModal } from './components/LiveTrackingModal';
import { WorkerDashboard } from './components/WorkerDashboard';
import { PriceEstimator } from './components/PriceEstimator';
import { DignitySection } from './components/DignitySection';
import { HowItWorks } from './components/HowItWorks';
import { Footer } from './components/Footer';
import { Briefcase, Compass, Sparkles } from 'lucide-react';

const MainContent: React.FC = () => {
  const { role, setRole } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#14171A]">
      <Navbar />

      {/* Role State Banner */}
      <div className="bg-stone-100/80 border-b border-stone-200/60 py-2 px-4 text-center text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          {role === 'customer' ? (
            <>
              <Compass className="w-3.5 h-3.5 text-orange-600" />
              <span className="text-stone-600 font-medium">
                Viewing as <strong>Customer</strong>: Browse, compare, and book verified local workers.
              </span>
              <button 
                onClick={() => setRole('worker')}
                className="text-orange-600 font-bold hover:underline ml-1"
              >
                Switch to Worker Pro →
              </button>
            </>
          ) : (
            <>
              <Briefcase className="w-3.5 h-3.5 text-amber-600" />
              <span className="text-stone-800 font-medium">
                Viewing as <strong>Worker Pro</strong> (Rameshwar Kumar): Manage availability, accept incoming jobs, and view earnings.
              </span>
              <button 
                onClick={() => setRole('customer')}
                className="text-orange-600 font-bold hover:underline ml-1"
              >
                Switch to Customer Mode →
              </button>
            </>
          )}
        </div>
      </div>

      <main className="flex-1">
        {role === 'customer' ? (
          <>
            <Hero />
            <ServicesGrid />
            <WorkerDirectory />
            <PriceEstimator />
            <DignitySection />
            <HowItWorks />
          </>
        ) : (
          <>
            <WorkerDashboard />
            <ServicesGrid />
            <DignitySection />
            <HowItWorks />
          </>
        )}
      </main>

      {/* Global Interactive Modals */}
      <WorkerProfileModal />
      <BookingFlowModal />
      <LiveTrackingModal />

      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
