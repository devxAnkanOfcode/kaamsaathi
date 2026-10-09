import React, { useState, useEffect } from 'react';
import { 
  X, 
  Phone, 
  MessageSquare, 
  ShieldAlert, 
  Clock, 
  MapPin, 
  Navigation, 
  Star, 
  CheckCircle, 
  Car, 
  CreditCard, 
  ThumbsUp, 
  Check, 
  QrCode, 
  Award
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatINR } from '../utils/formatters';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';

export const LiveTrackingModal: React.FC = () => {
  const { 
    activeBooking, 
    liveTrackingOpen, 
    setLiveTrackingOpen, 
    cancelActiveBooking,
    completeActiveBooking 
  } = useApp();

  const [etaRemaining, setEtaRemaining] = useState<number>(14);
  const [jobStage, setJobStage] = useState<'en_route' | 'arrived' | 'in_progress' | 'completed'>('en_route');
  const [rating, setRating] = useState<number>(5);
  const [reviewComment, setReviewComment] = useState<string>('');
  const [paymentDone, setPaymentDone] = useState<boolean>(false);
  const [showEndorsementDone, setShowEndorsementDone] = useState<boolean>(false);
  const [progressPercent, setProgressPercent] = useState<number>(20);

  // Live simulation of technician travel progress
  useEffect(() => {
    if (!liveTrackingOpen || !activeBooking || jobStage === 'completed') return;

    const interval = setInterval(() => {
      setProgressPercent(prev => {
        if (prev >= 85) {
          return 90;
        }
        return prev + 5;
      });
      setEtaRemaining(prev => Math.max(1, prev - 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [liveTrackingOpen, activeBooking, jobStage]);

  if (!liveTrackingOpen || !activeBooking) return null;

  const worker = activeBooking.assignedWorker;
  if (!worker) return null;

  const handleSimulateArrival = () => {
    sound.playClick();
    setJobStage('arrived');
    setEtaRemaining(0);
    setProgressPercent(100);
  };

  const handleStartWork = () => {
    sound.playClick();
    setJobStage('in_progress');
  };

  const handleCompleteWork = () => {
    sound.playSuccess();
    setJobStage('completed');
    completeActiveBooking();
  };

  const handleSubmitReview = () => {
    sound.playSuccess();
    setShowEndorsementDone(true);
    try {
      confetti({ particleCount: 70, spread: 60 });
    } catch {}
    setTimeout(() => {
      setLiveTrackingOpen(false);
      cancelActiveBooking();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-in fade-in">
      
      {/* Tracking Card Container */}
      <div 
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden text-left relative animate-in zoom-in-95 duration-200 my-6"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header */}
        <div className="px-5 py-3.5 bg-stone-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-bold text-sm tracking-wide">Live Dispatch Tracker</span>
            <span className="text-[11px] text-stone-400 font-mono">({activeBooking.id})</span>
          </div>

          <button
            onClick={() => setLiveTrackingOpen(false)}
            className="w-7 h-7 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* STAGE: EN ROUTE OR ARRIVED OR IN PROGRESS */}
        {jobStage !== 'completed' ? (
          <div>
            
            {/* Live Animated Map Visual (Rapido / Uber / Google Maps style) */}
            <div className="h-64 sm:h-72 bg-[#ECE9DE] relative overflow-hidden flex items-center justify-center border-b border-stone-200">
              
              {/* Stylized road network */}
              <svg className="absolute inset-0 w-full h-full stroke-stone-300" strokeWidth="3">
                <line x1="0%" y1="30%" x2="100%" y2="30%" strokeWidth="6" />
                <line x1="0%" y1="70%" x2="100%" y2="70%" strokeWidth="4" />
                <line x1="30%" y1="0%" x2="30%" y2="100%" strokeWidth="5" />
                <line x1="75%" y1="0%" x2="75%" y2="100%" strokeWidth="4" />
                
                {/* Active navigation path (Orange line) */}
                <path 
                  d="M 120 70 Q 250 120 480 180" 
                  fill="none" 
                  stroke="#F97316" 
                  strokeWidth="5" 
                  strokeLinecap="round"
                  strokeDasharray="8 6"
                />
              </svg>

              {/* Start Point Pin (Worker dispatch hub) */}
              <div className="absolute top-[28%] left-[20%] z-10 flex flex-col items-center">
                <span className="text-[10px] font-bold bg-white/90 text-stone-600 px-2 py-0.5 rounded shadow">
                  Dispatched
                </span>
              </div>

              {/* Destination Pin (Customer address) */}
              <div className="absolute top-[65%] right-[22%] z-20 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg border-2 border-white font-bold text-xs">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-extrabold bg-white px-2 py-0.5 rounded shadow text-charcoal-900 mt-1">
                  Your Doorstep
                </span>
              </div>

              {/* Moving Technician Vehicle Marker */}
              <div 
                className="absolute z-30 transition-all duration-1000 ease-linear flex flex-col items-center"
                style={{
                  top: `${30 + (progressPercent / 100) * 35}%`,
                  left: `${20 + (progressPercent / 100) * 55}%`,
                }}
              >
                <div className="w-10 h-10 rounded-2xl bg-orange-600 text-white flex items-center justify-center shadow-premium border-2 border-white">
                  <Navigation className="w-5 h-5 -rotate-45" />
                </div>
                <span className="text-[10px] font-extrabold bg-stone-900 text-amber-300 px-2 py-0.5 rounded shadow mt-1 whitespace-nowrap">
                  {worker.name.split(' ')[0]} ({etaRemaining > 0 ? `${etaRemaining}m ETA` : 'Arrived'})
                </span>
              </div>

              {/* Top ETA Float Card */}
              <div className="absolute top-3 left-4 z-20 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-soft border border-stone-200 flex items-center gap-3">
                <Clock className="w-5 h-5 text-orange-600 animate-spin" />
                <div>
                  <div className="text-xs font-bold text-stone-400 uppercase">Estimated Arrival</div>
                  <div className="text-sm font-extrabold text-charcoal-900">
                    {etaRemaining > 0 ? `${etaRemaining} Minutes` : 'Technician has arrived!'}
                  </div>
                </div>
              </div>

              {/* Security OTP Float Card */}
              <div className="absolute top-3 right-4 z-20 bg-stone-900 text-white px-3.5 py-2 rounded-2xl shadow-soft border border-stone-800 text-right">
                <span className="text-[10px] text-stone-400 font-bold uppercase block">Share OTP upon arrival</span>
                <span className="text-base font-mono font-extrabold text-amber-400 tracking-wider">
                  {activeBooking.otp}
                </span>
              </div>

            </div>

            {/* Middle Section: Technician details & contact */}
            <div className="p-5 space-y-4">
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <img src={worker.avatar} alt={worker.name} className="w-14 h-14 rounded-2xl object-cover ring-2 ring-stone-200" />
                  <div>
                    <h4 className="font-extrabold text-base text-charcoal-900">{worker.name}</h4>
                    <p className="text-xs font-semibold text-stone-500">{worker.tradeTitle}</p>
                    <div className="flex items-center gap-2 text-xs mt-0.5">
                      <span className="text-amber-500 font-bold flex items-center gap-0.5">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        {worker.rating.toFixed(1)}
                      </span>
                      <span className="text-stone-300">•</span>
                      <span className="text-stone-600 font-medium">{worker.jobsCompleted}+ jobs</span>
                    </div>
                  </div>
                </div>

                {/* Call & Chat buttons */}
                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${worker.phone}`}
                    onClick={() => sound.playClick()}
                    className="w-10 h-10 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 flex items-center justify-center transition-colors"
                    title="Call Technician"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => sound.playClick()}
                    className="w-10 h-10 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200 flex items-center justify-center transition-colors"
                    title="Chat"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Vehicle & Equipment strip */}
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-orange-600" />
                  <span className="text-stone-700 font-medium truncate max-w-[280px]">
                    {worker.vehicle || 'Arriving on Two-Wheeler with Tools'}
                  </span>
                </div>
                <span className="text-stone-400 font-mono text-[11px]">Plate: KA-01-KS-4829</span>
              </div>

              {/* Job Progress Stepper Actions */}
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-3">
                <div className="text-xs font-bold text-charcoal-900 uppercase tracking-wider flex items-center justify-between">
                  <span>Job Lifecycle Simulation</span>
                  <span className="text-[10px] text-stone-400 font-normal">Click buttons to advance demo</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {jobStage === 'en_route' && (
                    <button
                      onClick={handleSimulateArrival}
                      className="py-2.5 px-3 rounded-xl bg-white hover:bg-emerald-50 border border-stone-300 text-emerald-800 text-xs font-bold transition-colors shadow-sm"
                    >
                      1. Simulate "Arrived"
                    </button>
                  )}

                  {jobStage === 'arrived' && (
                    <button
                      onClick={handleStartWork}
                      className="py-2.5 px-3 rounded-xl bg-charcoal-900 hover:bg-black text-white text-xs font-bold transition-colors shadow-sm"
                    >
                      2. Verify OTP & Start Work
                    </button>
                  )}

                  {(jobStage === 'in_progress' || jobStage === 'arrived') && (
                    <button
                      onClick={handleCompleteWork}
                      className="py-2.5 px-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition-colors shadow-sm flex items-center justify-center gap-1.5"
                    >
                      <Check className="w-4 h-4" />
                      <span>3. Job Complete & Pay</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Safety SOS */}
              <div className="flex items-center justify-between pt-2 text-xs text-stone-500">
                <button
                  onClick={cancelActiveBooking}
                  className="text-stone-400 hover:text-stone-600 underline"
                >
                  Cancel Booking
                </button>

                <div className="flex items-center gap-1 text-rose-600 font-semibold cursor-pointer">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>24x7 Safety Helpline</span>
                </div>
              </div>

            </div>

          </div>
        ) : (
          /* STAGE: JOB COMPLETED, PAYMENT & REPUTATION REVIEW */
          <div className="p-6 space-y-6">
            
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-extrabold text-charcoal-900 font-display">
                Job Completed Successfully!
              </h3>
              <p className="text-xs text-stone-500">
                {worker.name} has finished {activeBooking.subService}.
              </p>
            </div>

            {/* Payment Summary */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs space-y-2">
              <div className="flex justify-between text-stone-600">
                <span>Total Amount Due</span>
                <span className="text-base font-extrabold text-charcoal-900">{formatINR(activeBooking.totalPrice)}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-stone-200">
                <span className="text-stone-500">Payment Status:</span>
                {paymentDone ? (
                  <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                    <Check className="w-3 h-3" /> Paid via UPI
                  </span>
                ) : (
                  <button
                    onClick={() => { sound.playSuccess(); setPaymentDone(true); }}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>Pay with UPI / QR Code</span>
                  </button>
                )}
              </div>
            </div>

            {/* Rate & Review + LinkedIn-style Skill Endorsement */}
            <div className="space-y-3 pt-2 border-t border-stone-200">
              <div className="text-center">
                <h4 className="text-sm font-bold text-charcoal-900">
                  Rate {worker.name}'s Professionalism
                </h4>
                <p className="text-[11px] text-stone-500">
                  Your review builds their portable professional identity.
                </p>
              </div>

              {/* Star selector */}
              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((starNum) => (
                  <button
                    key={starNum}
                    onClick={() => { sound.playClick(); setRating(starNum); }}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <Star className={`w-7 h-7 ${starNum <= rating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'}`} />
                  </button>
                ))}
              </div>

              {/* Review Text */}
              <textarea
                rows={2}
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                placeholder="Write a few words about their punctuality, skill, and cleanliness..."
                className="w-full p-3 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-orange-500"
              />

              {/* Endorse a specific skill button */}
              <div className="p-3 rounded-xl bg-orange-50/60 border border-orange-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-orange-950 font-bold">
                  <Award className="w-4 h-4 text-orange-600" />
                  <span>Endorse skill: "{worker.skills[0]?.skill}"</span>
                </div>
                <span className="text-[10px] text-orange-700 font-bold bg-white px-2 py-0.5 rounded shadow-sm">
                  +1 Endorsement
                </span>
              </div>
            </div>

            {/* Submit button */}
            <button
              onClick={handleSubmitReview}
              className="w-full py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs sm:text-sm shadow-soft transition-all"
            >
              {showEndorsementDone ? 'Thank You! Review Recorded' : 'Submit Review & Close'}
            </button>

          </div>
        )}

      </div>

    </div>
  );
};
