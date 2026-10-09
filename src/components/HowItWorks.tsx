import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Briefcase, 
  Power, 
  Wallet, 
  Award,
  ArrowRight,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { sound } from '../utils/audio';

export const HowItWorks: React.FC = () => {
  const { setRole, openBookingModal } = useApp();
  const [tab, setTab] = useState<'customer' | 'worker'>('customer');

  return (
    <section id="how-it-works" className="py-20 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-bold uppercase tracking-wider mb-2">
            <span>Simple & Transparent</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal-900 tracking-tight font-display">
            How KaamSaathi Works
          </h2>
          <p className="text-stone-600 text-sm mt-2">
            Connecting real people in the real world with the speed of a ride-hailing app and the trust of a professional network.
          </p>

          {/* Toggle pill */}
          <div className="mt-6 inline-flex bg-white p-1 rounded-2xl border border-stone-200 shadow-soft-sm">
            <button
              onClick={() => { sound.playClick(); setTab('customer'); }}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                tab === 'customer'
                  ? 'bg-orange-600 text-white shadow-soft'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              For Customers
            </button>
            <button
              onClick={() => { sound.playClick(); setTab('worker'); }}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                tab === 'worker'
                  ? 'bg-charcoal-900 text-white shadow-soft'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              For Skilled Workers
            </button>
          </div>
        </div>

        {/* Tab 1: Customer Workflow */}
        {tab === 'customer' ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-soft-sm relative">
              <span className="w-8 h-8 rounded-full bg-orange-100 text-orange-700 font-extrabold text-sm flex items-center justify-center mb-4">
                1
              </span>
              <h3 className="font-bold text-base text-charcoal-900 mb-1">
                Choose Service
              </h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Select from 12 trade categories and describe what went wrong. Add an optional voice note or photo.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-soft-sm relative">
              <span className="w-8 h-8 rounded-full bg-orange-100 text-orange-700 font-extrabold text-sm flex items-center justify-center mb-4">
                2
              </span>
              <h3 className="font-bold text-base text-charcoal-900 mb-1">
                Compare Nearby Pros
              </h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                View distance, live ETA, verified Skill India badges, past work photos, and upfront visiting fees.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-soft-sm relative">
              <span className="w-8 h-8 rounded-full bg-orange-100 text-orange-700 font-extrabold text-sm flex items-center justify-center mb-4">
                3
              </span>
              <h3 className="font-bold text-base text-charcoal-900 mb-1">
                Live Track Arrival
              </h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Track your technician in real-time as they ride to your doorstep with equipment. Share secure 4-digit OTP.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-soft-sm relative">
              <span className="w-8 h-8 rounded-full bg-orange-100 text-orange-700 font-extrabold text-sm flex items-center justify-center mb-4">
                4
              </span>
              <h3 className="font-bold text-base text-charcoal-900 mb-1">
                Fair Pay & Review
              </h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Pay directly via UPI upon complete satisfaction. Leave a review that boosts the worker's career reputation.
              </p>
            </div>

          </div>
        ) : (
          /* Tab 2: Worker Workflow */
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-soft-sm relative">
              <span className="w-8 h-8 rounded-full bg-charcoal-900 text-amber-300 font-extrabold text-sm flex items-center justify-center mb-4">
                1
              </span>
              <h3 className="font-bold text-base text-charcoal-900 mb-1">
                Build Digital Profile
              </h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Add trade skills, past work photos, and verify your Aadhaar / PMKVY diploma for a verified blue badge.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-soft-sm relative">
              <span className="w-8 h-8 rounded-full bg-charcoal-900 text-amber-300 font-extrabold text-sm flex items-center justify-center mb-4">
                2
              </span>
              <h3 className="font-bold text-base text-charcoal-900 mb-1">
                Toggle "Available"
              </h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Work on your own terms. Turn the online switch on when ready, and set your own operating radius & visit fees.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-soft-sm relative">
              <span className="w-8 h-8 rounded-full bg-charcoal-900 text-amber-300 font-extrabold text-sm flex items-center justify-center mb-4">
                3
              </span>
              <h3 className="font-bold text-base text-charcoal-900 mb-1">
                Receive Instant Jobs
              </h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Get real-time job requests with estimated earnings and customer location. Accept with 1 click or pass.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-soft-sm relative">
              <span className="w-8 h-8 rounded-full bg-charcoal-900 text-amber-300 font-extrabold text-sm flex items-center justify-center mb-4">
                4
              </span>
              <h3 className="font-bold text-base text-charcoal-900 mb-1">
                100% Direct Payouts
              </h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Get paid straight to your bank account or UPI wallet. Build a verifiable resume that unlocks commercial tenders.
              </p>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
