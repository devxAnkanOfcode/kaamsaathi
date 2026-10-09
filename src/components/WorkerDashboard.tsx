import React, { useState } from 'react';
import { 
  Briefcase, 
  Power, 
  Bell, 
  Wallet, 
  TrendingUp, 
  Star, 
  MapPin, 
  Sliders, 
  ShieldCheck, 
  BadgeCheck, 
  CheckCircle, 
  XCircle, 
  Share2, 
  QrCode, 
  Clock, 
  AlertCircle,
  Building,
  ArrowRight,
  Sparkles,
  Zap,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatINR } from '../utils/formatters';
import { sound } from '../utils/audio';

export const WorkerDashboard: React.FC = () => {
  const { 
    workerIsOnline, 
    toggleWorkerOnline, 
    incomingJobAlert, 
    acceptIncomingJob, 
    dismissIncomingJob, 
    triggerSimulatedJobRequest,
    workerStats,
    withdrawWalletFunds,
    locality,
    city
  } = useApp();

  const [serviceRadiusKm, setServiceRadiusKm] = useState(6);
  const [visitingFee, setVisitingFee] = useState(249);
  const [hourlyRate, setHourlyRate] = useState(350);
  const [payoutSuccess, setPayoutSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'hub' | 'jobs' | 'profile'>('hub');

  const handleWithdraw = () => {
    sound.playSuccess();
    withdrawWalletFunds();
    setPayoutSuccess(true);
    setTimeout(() => setPayoutSuccess(false), 3000);
  };

  return (
    <section id="worker-dashboard" className="py-12 bg-[#F8F7F4] border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Worker Header Row */}
        <div className="bg-white rounded-3xl p-6 shadow-soft border border-stone-200 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 text-left">
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80" 
                alt="Worker Profile" 
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-orange-200"
              />
              <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                workerIsOnline ? 'bg-emerald-500' : 'bg-stone-400'
              }`} />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-charcoal-900 font-display">
                  Rameshwar Kumar
                </h2>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Pro Verified
                </span>
              </div>
              <p className="text-xs font-semibold text-stone-500">
                Master Electrician & Wireman • PMKVY Govt Grade-A
              </p>
              <div className="flex items-center gap-2 text-xs text-stone-600 mt-1">
                <MapPin className="w-3.5 h-3.5 text-orange-600" />
                <span>Base: {locality}, {city}</span>
              </div>
            </div>
          </div>

          {/* Online / Offline Availability Switch & Demo Trigger */}
          <div className="flex flex-wrap items-center gap-3">
            
            <button
              onClick={triggerSimulatedJobRequest}
              className="px-3.5 py-2.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-700 text-xs font-bold border border-orange-200 flex items-center gap-1.5 transition-colors"
              title="Test the incoming job dispatch radar"
            >
              <Zap className="w-3.5 h-3.5 text-orange-600" />
              <span>Simulate Job Ping</span>
            </button>

            <button
              onClick={toggleWorkerOnline}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-soft transition-all active:scale-95 ${
                workerIsOnline 
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                  : 'bg-stone-300 text-stone-700 hover:bg-stone-400'
              }`}
            >
              <Power className="w-4 h-4" />
              <span>{workerIsOnline ? 'You Are ONLINE' : 'You Are OFFLINE'}</span>
            </button>

          </div>

        </div>

        {/* INCOMING JOB RADAR POPUP (When customer places order) */}
        {incomingJobAlert && (
          <div className="mb-8 p-6 rounded-3xl bg-charcoal-900 text-white shadow-2xl border-2 border-orange-500 animate-in slide-in-from-top-4 text-left">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 text-xs font-bold border border-orange-500/40">
                  <span className="w-2 h-2 rounded-full bg-orange-400 animate-ping" />
                  <span>NEW NEARBY JOB REQUEST ({incomingJobAlert.createdAt})</span>
                </div>
                <h3 className="text-xl font-extrabold text-white">
                  {incomingJobAlert.subService}
                </h3>
                <p className="text-xs text-stone-300">
                  {incomingJobAlert.problemDescription}
                </p>
                <div className="flex items-center gap-3 text-xs text-stone-400 pt-1">
                  <span className="flex items-center gap-1 text-amber-300 font-semibold">
                    <MapPin className="w-3.5 h-3.5" />
                    {incomingJobAlert.locality}
                  </span>
                  <span>•</span>
                  <span>Customer: {incomingJobAlert.customerName}</span>
                </div>
              </div>

              {/* Earnings & Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="bg-stone-800 px-4 py-2.5 rounded-2xl border border-stone-700 text-center sm:text-right">
                  <span className="text-[10px] text-stone-400 uppercase font-bold block">Estimated Earning</span>
                  <span className="text-xl font-extrabold text-amber-400">{formatINR(incomingJobAlert.totalPrice)}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={dismissIncomingJob}
                    className="flex-1 sm:flex-none px-4 py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-bold text-xs transition-colors"
                  >
                    Pass
                  </button>
                  <button
                    onClick={acceptIncomingJob}
                    className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs sm:text-sm shadow-premium transition-all flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>ACCEPT JOB</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Dashboard 4-Metric Analytics Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 text-left">
          
          <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-soft-sm">
            <div className="flex items-center justify-between text-stone-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Today's Earnings</span>
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-extrabold text-charcoal-900">
              {formatINR(workerStats.todayEarnings)}
            </div>
            <span className="text-[11px] text-emerald-700 font-bold mt-1 block">
              +18% from yesterday
            </span>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-soft-sm">
            <div className="flex items-center justify-between text-stone-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Jobs Done Today</span>
              <CheckCircle className="w-4 h-4 text-orange-600" />
            </div>
            <div className="text-2xl font-extrabold text-charcoal-900">
              {workerStats.jobsDone} Jobs
            </div>
            <span className="text-[11px] text-stone-500 font-medium mt-1 block">
              Avg rating: 5.0★
            </span>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-soft-sm">
            <div className="flex items-center justify-between text-stone-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Reputation Score</span>
              <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
            </div>
            <div className="text-2xl font-extrabold text-charcoal-900 flex items-baseline gap-1">
              <span>{workerStats.rating}</span>
              <span className="text-xs text-stone-400">/ 5.0</span>
            </div>
            <span className="text-[11px] text-stone-500 font-medium mt-1 block">
              384 Verified Reviews
            </span>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-soft-sm">
            <div className="flex items-center justify-between text-stone-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Withdrawable Wallet</span>
              <Wallet className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-extrabold text-charcoal-900">
              {formatINR(workerStats.walletBalance)}
            </div>
            <div className="mt-1">
              {workerStats.walletBalance > 0 ? (
                <button
                  onClick={handleWithdraw}
                  className="text-[11px] text-orange-600 font-bold hover:underline"
                >
                  Instant Payout to UPI →
                </button>
              ) : (
                <span className="text-[11px] text-stone-400 font-medium">All funds paid out</span>
              )}
            </div>
          </div>

        </div>

        {/* Payout Success Toast */}
        {payoutSuccess && (
          <div className="mb-6 p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold text-center animate-in fade-in">
            ✓ Instant payout of funds successfully transferred to Rameshwar's UPI (ramesh@okhdfcbank).
          </div>
        )}

        {/* Main 2-Column Worker Management Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
          
          {/* Left Column (8 cols): Service Area, Pricing Controls & Contract Opportunities */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Setting: Service Radius & Pricing */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-soft-sm space-y-5">
              <h3 className="font-extrabold text-base text-charcoal-900 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-orange-600" />
                <span>My Service Radius & Fair Pricing Controls</span>
              </h3>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-bold text-charcoal-900 mb-1">
                    <span>Dispatch Coverage Radius</span>
                    <span className="text-orange-600">{serviceRadiusKm} km around {locality}</span>
                  </div>
                  <input 
                    type="range" 
                    min="2" 
                    max="15" 
                    value={serviceRadiusKm}
                    onChange={(e) => setServiceRadiusKm(Number(e.target.value))}
                    className="w-full accent-orange-600" 
                  />
                  <div className="flex justify-between text-[10px] text-stone-400">
                    <span>2 km (Local Walkable)</span>
                    <span>15 km (Wide City Zone)</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="text-[11px] font-bold text-stone-500 uppercase block mb-1">
                      My Inspection / Visiting Charge
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-stone-400 text-xs">₹</span>
                      <input 
                        type="number"
                        value={visitingFee}
                        onChange={(e) => setVisitingFee(Number(e.target.value))}
                        className="w-full pl-7 pr-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs font-bold text-charcoal-900 focus:outline-none focus:ring-1 focus:ring-orange-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-stone-500 uppercase block mb-1">
                      Standard Hourly Labor Rate
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-stone-400 text-xs">₹</span>
                      <input 
                        type="number"
                        value={hourlyRate}
                        onChange={(e) => setHourlyRate(Number(e.target.value))}
                        className="w-full pl-7 pr-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs font-bold text-charcoal-900 focus:outline-none focus:ring-1 focus:ring-orange-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-stone-500 bg-stone-50 p-3 rounded-xl border border-stone-100">
                  💡 <strong>Tip for Workers:</strong> Your rate is within the Bengaluru market average of ₹200–₹350. You retain 100% of your labor charges. Zero commissions deducted on visiting fees.
                </div>
              </div>
            </div>

            {/* Opportunities Feed: Higher Value Commercial & Site Contracts */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-soft-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-base text-charcoal-900 flex items-center gap-2">
                  <Building className="w-4 h-4 text-orange-600" />
                  <span>Commercial & Long-term Opportunities</span>
                </h3>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  3 Open Contracts
                </span>
              </div>

              <div className="space-y-3">
                
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-charcoal-900">Prestige Palms Apartment AMC</h4>
                      <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-1.5 py-0.2 rounded">Annual Contract</span>
                    </div>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      120-flat society in Indiranagar needs on-call electrician for common pump & lighting backup.
                    </p>
                    <span className="text-[11px] font-bold text-emerald-700 mt-1 block">
                      ₹22,000 / month retainer + parts
                    </span>
                  </div>
                  <button 
                    onClick={() => sound.playClick()}
                    className="px-3.5 py-2 rounded-xl bg-charcoal-900 hover:bg-black text-white text-xs font-bold whitespace-nowrap"
                  >
                    Apply with Profile
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-charcoal-900">Tech Park Office Fitout (Whitefield)</h4>
                      <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.2 rounded">Project Based</span>
                    </div>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      3-week wiring & networking cable crimping for 4,000 sqft startup workspace.
                    </p>
                    <span className="text-[11px] font-bold text-emerald-700 mt-1 block">
                      ₹55,000 total payout (Milestone based)
                    </span>
                  </div>
                  <button 
                    onClick={() => sound.playClick()}
                    className="px-3.5 py-2 rounded-xl bg-charcoal-900 hover:bg-black text-white text-xs font-bold whitespace-nowrap"
                  >
                    Apply with Profile
                  </button>
                </div>

              </div>
            </div>

          </div>

          {/* Right Column (4 cols): Portable Digital Identity Card & Shareable Profile */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Portable Identity Card */}
            <div className="bg-gradient-to-br from-charcoal-900 to-stone-900 text-white rounded-3xl p-6 shadow-soft-lg space-y-5">
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-orange-600 flex items-center justify-center font-bold text-xs">
                    KS
                  </div>
                  <span className="font-bold text-xs tracking-wider">KAAMSAATHI PRO CARD</span>
                </div>
                <BadgeCheck className="w-5 h-5 text-emerald-400" />
              </div>

              <div className="space-y-1">
                <div className="text-lg font-extrabold text-white">Rameshwar Kumar</div>
                <div className="text-xs text-amber-300 font-semibold">Reg ID: KS-IND-2024-9982</div>
                <div className="text-xs text-stone-300">Govt PMKVY Level 4 Certified Wireman</div>
              </div>

              {/* QR Code Graphic */}
              <div className="bg-white p-3 rounded-2xl w-32 h-32 mx-auto flex items-center justify-center shadow-inner">
                <QrCode className="w-24 h-24 text-charcoal-900" />
              </div>

              <div className="text-center text-[11px] text-stone-400">
                Scan to view verified trade history, ratings & police verification certificate
              </div>

              <button
                onClick={() => {
                  sound.playClick();
                  navigator.clipboard?.writeText('https://kaamsaathi.in/@ramesh.electrician');
                  alert('Profile URL copied to clipboard: https://kaamsaathi.in/@ramesh.electrician');
                }}
                className="w-full py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share My Digital Card</span>
              </button>
            </div>

            {/* Dignity & Legal Protection */}
            <div className="bg-white rounded-3xl p-5 border border-stone-200 text-xs space-y-2">
              <h4 className="font-bold text-charcoal-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Worker Protection Guarantee</span>
              </h4>
              <p className="text-stone-500 text-[11px] leading-relaxed">
                You are covered by ₹2,00,000 accidental insurance during active dispatches. Customers agree to respectful treatment under the KaamSaathi Fair Conduct Charter.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
