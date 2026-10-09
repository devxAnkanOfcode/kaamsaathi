import React, { useState, useEffect } from 'react';
import { 
  X, 
  MapPin, 
  ArrowRight, 
  ArrowLeft, 
  Star, 
  Clock, 
  ShieldCheck, 
  Zap, 
  Mic, 
  Camera, 
  Calendar, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SERVICES_LIST } from '../data/services';
import { WORKERS_DATA } from '../data/workers';
import { ServiceCategory, Worker } from '../types';
import { formatINR, formatETA } from '../utils/formatters';
import { sound } from '../utils/audio';

export const BookingFlowModal: React.FC = () => {
  const { 
    bookingModalOpen, 
    closeBookingModal, 
    selectedCategory, 
    preselectedWorker,
    createBooking,
    locality,
    city
  } = useApp();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [currentCat, setCurrentCat] = useState<ServiceCategory>(selectedCategory || 'electrician');
  const [selectedSubService, setSelectedSubService] = useState<string>('');
  const [problemDescription, setProblemDescription] = useState<string>('');
  const [isVoiceRecording, setIsVoiceRecording] = useState<boolean>(false);
  const [urgency, setUrgency] = useState<'immediate' | 'today' | 'scheduled'>('immediate');
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(preselectedWorker || null);

  useEffect(() => {
    if (selectedCategory) setCurrentCat(selectedCategory);
    if (preselectedWorker) {
      setSelectedWorker(preselectedWorker);
      setCurrentCat(preselectedWorker.category);
    }
  }, [selectedCategory, preselectedWorker, bookingModalOpen]);

  // Set default subservice when category changes
  useEffect(() => {
    const srv = SERVICES_LIST.find(s => s.category === currentCat);
    if (srv && srv.popularSubServices.length > 0) {
      setSelectedSubService(srv.popularSubServices[0]);
    }
  }, [currentCat]);

  if (!bookingModalOpen) return null;

  const currentServiceMeta = SERVICES_LIST.find(s => s.category === currentCat) || SERVICES_LIST[0];

  // Eligible workers for this category
  const matchingWorkers = WORKERS_DATA.filter(w => w.category === currentCat);

  const handleVoiceSim = () => {
    sound.playClick();
    setIsVoiceRecording(true);
    setTimeout(() => {
      setIsVoiceRecording(false);
      setProblemDescription('Main switchboard making continuous buzzing noise and tripping the inverter.');
    }, 2500);
  };

  const handleNextStep = () => {
    sound.playClick();
    if (step < 4) {
      setStep((step + 1) as any);
    } else {
      // Finalize booking!
      createBooking({
        category: currentCat,
        subService: selectedSubService || currentServiceMeta.popularSubServices[0],
        description: problemDescription || 'General diagnostic inspection needed.',
        urgency,
        worker: selectedWorker || matchingWorkers[0],
      });
    }
  };

  const handlePrevStep = () => {
    sound.playClick();
    if (step > 1) {
      setStep((step - 1) as any);
    }
  };

  const activeWorkerForSummary = selectedWorker || matchingWorkers[0] || WORKERS_DATA[0];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      
      {/* Modal Dialog Container */}
      <div 
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden text-left relative animate-in zoom-in-95 duration-200 my-6"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header Strip */}
        <div className="px-6 py-4 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-orange-600 text-white font-extrabold text-sm flex items-center justify-center shadow-sm">
              {step}/4
            </span>
            <div>
              <h3 className="font-extrabold text-charcoal-900 text-base">
                {step === 1 && 'Step 1: Choose Issue & Service'}
                {step === 2 && 'Step 2: Describe the Problem'}
                {step === 3 && 'Step 3: Select or Match Worker'}
                {step === 4 && 'Step 4: Confirm & Dispatch'}
              </h3>
              <p className="text-[11px] text-stone-500 font-medium">
                Fair price guaranteed • Direct verified technician
              </p>
            </div>
          </div>

          <button
            onClick={closeBookingModal}
            className="w-8 h-8 rounded-full bg-stone-200/60 hover:bg-stone-300 text-stone-600 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress bar line */}
        <div className="w-full bg-stone-100 h-1">
          <div 
            className="bg-orange-600 h-1 transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        {/* Modal Step Content */}
        <div className="p-6 max-h-[65vh] overflow-y-auto space-y-5">
          
          {/* STEP 1: Choose Service & Subcategory */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-2">
                  Select Trade Category
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {SERVICES_LIST.slice(0, 6).map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => { sound.playClick(); setCurrentCat(s.category); }}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        currentCat === s.category
                          ? 'border-orange-500 bg-orange-50/70 ring-2 ring-orange-200 font-bold'
                          : 'border-stone-200 bg-white hover:bg-stone-50 text-stone-700'
                      }`}
                    >
                      <div className="text-xs font-bold text-charcoal-900">{s.title}</div>
                      <div className="text-[10px] text-stone-500 mt-0.5">{s.benchmarkPriceRange}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-2">
                  What exact work is needed?
                </label>
                <div className="space-y-2">
                  {currentServiceMeta.popularSubServices.map((sub, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => { sound.playClick(); setSelectedSubService(sub); }}
                      className={`w-full p-3 rounded-xl border text-left text-xs font-semibold flex items-center justify-between transition-colors ${
                        selectedSubService === sub
                          ? 'bg-charcoal-900 text-white border-charcoal-900 shadow-soft-sm'
                          : 'bg-stone-50 border-stone-200 text-stone-800 hover:bg-stone-100'
                      }`}
                    >
                      <span>{sub}</span>
                      {selectedSubService === sub && (
                        <Check className="w-4 h-4 text-amber-400" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Service Address confirmation */}
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-orange-600" />
                  <div>
                    <span className="font-bold text-charcoal-900">Service Location:</span>{' '}
                    <span className="text-stone-600">{locality}, {city}</span>
                  </div>
                </div>
                <span className="text-emerald-700 font-bold text-[11px] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Verified Pin
                </span>
              </div>
            </div>
          )}

          {/* STEP 2: Describe Problem & Urgency */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-1">
                  Describe what went wrong (Optional details help worker bring correct tools)
                </label>
                <textarea
                  rows={3}
                  value={problemDescription}
                  onChange={(e) => setProblemDescription(e.target.value)}
                  placeholder="e.g. Havells MCB tripped 3 times, burning smell near master bedroom switchboard..."
                  className="w-full p-3 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                />
              </div>

              {/* Voice Note Simulation & Photo Attach */}
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handleVoiceSim}
                  className={`px-3 py-2 rounded-xl text-xs font-bold border flex items-center gap-2 transition-all ${
                    isVoiceRecording
                      ? 'bg-rose-50 border-rose-400 text-rose-700 animate-pulse'
                      : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <Mic className={`w-3.5 h-3.5 ${isVoiceRecording ? 'text-rose-600' : 'text-stone-400'}`} />
                  <span>{isVoiceRecording ? 'Listening in Hindi/English...' : 'Add Voice Note'}</span>
                </button>

                <label className="px-3 py-2 rounded-xl text-xs font-bold border border-stone-200 bg-white text-stone-700 hover:bg-stone-50 cursor-pointer flex items-center gap-2">
                  <Camera className="w-3.5 h-3.5 text-stone-400" />
                  <span>Attach Photo</span>
                  <input type="file" accept="image/*" className="hidden" onChange={() => sound.playClick()} />
                </label>
              </div>

              {/* Urgency selector */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-2">
                  When do you need the service?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  
                  <button
                    type="button"
                    onClick={() => { sound.playClick(); setUrgency('immediate'); }}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      urgency === 'immediate'
                        ? 'border-orange-500 bg-orange-50 ring-2 ring-orange-200'
                        : 'border-stone-200 bg-white hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-xs font-extrabold text-orange-600">
                      <Zap className="w-3.5 h-3.5" />
                      <span>Immediate Dispatch</span>
                    </div>
                    <p className="text-[10px] text-stone-500 mt-1">Technician reaches in 15-20 mins</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => { sound.playClick(); setUrgency('today'); }}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      urgency === 'today'
                        ? 'border-orange-500 bg-orange-50 ring-2 ring-orange-200'
                        : 'border-stone-200 bg-white hover:bg-stone-50'
                    }`}
                  >
                    <div className="text-xs font-extrabold text-charcoal-900">Today Evening</div>
                    <p className="text-[10px] text-stone-500 mt-1">Slot: 5:00 PM - 7:00 PM</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => { sound.playClick(); setUrgency('scheduled'); }}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      urgency === 'scheduled'
                        ? 'border-orange-500 bg-orange-50 ring-2 ring-orange-200'
                        : 'border-stone-200 bg-white hover:bg-stone-50'
                    }`}
                  >
                    <div className="text-xs font-extrabold text-charcoal-900">Schedule Later</div>
                    <p className="text-[10px] text-stone-500 mt-1">Choose date & morning slot</p>
                  </button>

                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Worker Selection / Comparison */}
          {step === 3 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-400">
                  Choose Your Preferred Technician
                </label>
                <span className="text-[11px] text-emerald-700 font-bold">
                  {matchingWorkers.length} available near you
                </span>
              </div>

              <div className="space-y-2.5">
                {matchingWorkers.map((w) => {
                  const isSelected = selectedWorker?.id === w.id;

                  return (
                    <div
                      key={w.id}
                      onClick={() => { sound.playClick(); setSelectedWorker(w); }}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'border-orange-500 bg-orange-50/60 ring-2 ring-orange-200 shadow-soft-sm'
                          : 'border-stone-200 bg-white hover:bg-stone-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img src={w.avatar} alt={w.name} className="w-12 h-12 rounded-xl object-cover ring-1 ring-stone-200" />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h4 className="text-xs font-bold text-charcoal-900">{w.name}</h4>
                            {w.badges.isGovtCertified && (
                              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                            )}
                          </div>
                          <p className="text-[11px] text-stone-500 font-medium">{w.tradeTitle} • {w.experienceYears} yrs exp</p>
                          <div className="flex items-center gap-2 text-[10px] mt-0.5">
                            <span className="text-amber-500 font-bold flex items-center gap-0.5">
                              <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                              {w.rating.toFixed(1)}
                            </span>
                            <span className="text-stone-300">•</span>
                            <span className="text-emerald-700 font-bold">{w.etaMinutes}m ETA</span>
                            <span className="text-stone-300">•</span>
                            <span className="text-stone-500">{w.jobsCompleted}+ jobs</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] font-bold text-stone-400 uppercase block">Visit Fee</span>
                        <span className="text-xs font-extrabold text-charcoal-900">{formatINR(w.minVisitingCharge)}</span>
                        <div className="mt-1">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            isSelected ? 'bg-orange-600 text-white' : 'bg-stone-100 text-stone-700'
                          }`}>
                            {isSelected ? 'Selected' : 'Select'}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: Upfront Fair Pricing & Confirm */}
          {step === 4 && (
            <div className="space-y-4">
              
              {/* Technician Highlight banner */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img 
                    src={activeWorkerForSummary.avatar} 
                    alt={activeWorkerForSummary.name} 
                    className="w-12 h-12 rounded-xl object-cover ring-2 ring-white shadow-soft-sm" 
                  />
                  <div>
                    <h4 className="text-xs font-bold text-charcoal-900">{activeWorkerForSummary.name}</h4>
                    <p className="text-[11px] text-stone-500">{activeWorkerForSummary.tradeTitle}</p>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      Ready on {activeWorkerForSummary.vehicle?.split(' ')[0] || 'Scooter'}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-700 block">{activeWorkerForSummary.etaMinutes} mins ETA</span>
                  <span className="text-[10px] text-stone-400">Direct to {locality}</span>
                </div>
              </div>

              {/* Itemized Transparent Bill Breakdown */}
              <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-2 text-xs">
                <div className="font-bold text-charcoal-900 pb-2 border-b border-stone-100 flex items-center justify-between">
                  <span>Transparent Price Breakdown</span>
                  <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                    Zero Hidden Fee Guarantee
                  </span>
                </div>

                <div className="flex justify-between py-1 text-stone-600">
                  <span>Visiting & Inspection Fee</span>
                  <span className="font-bold text-charcoal-900">{formatINR(activeWorkerForSummary.minVisitingCharge)}</span>
                </div>

                <div className="flex justify-between py-1 text-stone-600">
                  <span>Estimated Labor for {selectedSubService}</span>
                  <span className="font-bold text-charcoal-900">{formatINR(150)}</span>
                </div>

                <div className="flex justify-between py-1 text-stone-600">
                  <span>Platform Fee & Trust Insurance</span>
                  <span className="font-semibold text-emerald-600">FREE (₹0)</span>
                </div>

                <div className="pt-2 border-t border-stone-100 flex justify-between items-center text-sm">
                  <span className="font-bold text-charcoal-900">Total Upfront Estimate</span>
                  <span className="font-extrabold text-orange-600 text-base">
                    {formatINR(activeWorkerForSummary.minVisitingCharge + 150)}
                  </span>
                </div>
              </div>

              {/* Safety notice */}
              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 text-[11px] text-amber-900 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <p>
                  <strong>Dignity & Transparency Rule:</strong> You only pay upon job completion. A 4-digit security PIN will be issued. Share it with the technician only when they arrive at your doorstep.
                </p>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer Step Navigation */}
        <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={handlePrevStep}
              className="px-4 py-2 rounded-xl bg-white hover:bg-stone-100 border border-stone-200 text-xs font-bold text-stone-700 transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <button
              onClick={closeBookingModal}
              className="px-4 py-2 rounded-xl bg-white hover:bg-stone-100 border border-stone-200 text-xs font-bold text-stone-700 transition-colors"
            >
              Cancel
            </button>
          )}

          <button
            onClick={handleNextStep}
            className="px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs sm:text-sm font-bold shadow-soft transition-all active:scale-95 flex items-center gap-2"
          >
            <span>{step === 4 ? 'Confirm & Dispatch Worker' : 'Continue'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
