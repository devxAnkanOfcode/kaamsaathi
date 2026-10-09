import React, { useState } from 'react';
import { 
  X, 
  Star, 
  ShieldCheck, 
  BadgeCheck, 
  MapPin, 
  Clock, 
  Calendar, 
  Share2, 
  ThumbsUp, 
  CheckCircle2, 
  Phone, 
  Car, 
  FileCheck, 
  Award, 
  ArrowRight,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatINR, formatDistance, formatETA } from '../utils/formatters';
import { sound } from '../utils/audio';

export const WorkerProfileModal: React.FC = () => {
  const { 
    selectedWorkerForProfile, 
    closeWorkerProfile, 
    openBookingModal 
  } = useApp();

  const [endorsedSkills, setEndorsedSkills] = useState<Record<string, number>>({});
  const [copiedLink, setCopiedLink] = useState(false);

  if (!selectedWorkerForProfile) return null;
  const worker = selectedWorkerForProfile;

  const handleEndorse = (skillName: string) => {
    sound.playClick();
    setEndorsedSkills(prev => ({
      ...prev,
      [skillName]: (prev[skillName] || 0) + 1
    }));
  };

  const handleShare = () => {
    sound.playClick();
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-in fade-in">
      
      {/* Modal Dialog Card */}
      <div 
        className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden relative animate-in zoom-in-95 duration-200 text-left my-8"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button
          onClick={closeWorkerProfile}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-stone-700 hover:text-black flex items-center justify-center shadow-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Cover Banner (Warm Trade Workshop Graphic) */}
        <div className="h-36 sm:h-44 bg-gradient-to-r from-stone-800 via-stone-900 to-orange-950 relative overflow-hidden">
          <div className="absolute inset-0 opacity-15" style={{ 
            backgroundImage: `radial-gradient(#FFFFFF 1px, transparent 1px)`, 
            backgroundSize: '16px 16px' 
          }} />
          <div className="absolute bottom-3 left-4 sm:left-6 flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-amber-300 text-[11px] font-bold border border-amber-500/30">
              Verified Professional ID: KS-{worker.id.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Profile Header Info */}
        <div className="px-5 sm:px-8 pt-0 pb-6 border-b border-stone-100">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-16 sm:-mt-20 gap-4 mb-4">
            
            {/* Avatar & Badges */}
            <div className="relative inline-block">
              <img 
                src={worker.avatar} 
                alt={worker.name} 
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl object-cover ring-4 ring-white shadow-soft-lg"
              />
              <span className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white" title="Verified Professional">
                <CheckCircle2 className="w-4 h-4" />
              </span>
            </div>

            {/* Share & Book Buttons */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={handleShare}
                className="px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200/80 text-stone-700 text-xs font-bold transition-colors flex items-center gap-1.5"
                title="Share Professional Profile"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copiedLink ? 'Link Copied!' : 'Share Profile'}</span>
              </button>

              <button
                onClick={() => {
                  closeWorkerProfile();
                  openBookingModal(worker.category, worker);
                }}
                className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs sm:text-sm font-bold shadow-soft transition-all flex items-center gap-2"
              >
                <span>Hire {worker.name.split(' ')[0]}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Name & Headline */}
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-2xl font-extrabold text-charcoal-900 font-display">
                {worker.name}
              </h2>
              {worker.badges.isGovtCertified && (
                <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <BadgeCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>PMKVY Certified</span>
                </span>
              )}
              {worker.badges.isPoliceVerified && (
                <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  <span>Police Verified</span>
                </span>
              )}
            </div>

            <p className="text-sm font-semibold text-stone-600 mt-1">
              {worker.tradeTitle} • {worker.experienceYears} Years Trade Experience
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 mt-2.5">
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{worker.rating.toFixed(2)}</span>
                <span className="text-stone-400 font-normal">({worker.totalReviews} reviews)</span>
              </div>
              <span>•</span>
              <div className="font-semibold text-charcoal-800">
                {worker.jobsCompleted}+ Jobs Completed on KaamSaathi
              </div>
              <span>•</span>
              <div className="flex items-center gap-1 text-stone-600">
                <MapPin className="w-3.5 h-3.5 text-orange-600" />
                <span>{worker.locality}, {worker.city}</span>
              </div>
            </div>

          </div>

        </div>

        {/* Modal Scrollable Body */}
        <div className="px-5 sm:px-8 py-6 space-y-7 max-h-[60vh] overflow-y-auto">
          
          {/* About / Professional Bio */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">
              About the Professional
            </h3>
            <p className="text-sm text-stone-700 leading-relaxed bg-stone-50 p-4 rounded-2xl border border-stone-100">
              {worker.bio}
            </p>
          </div>

          {/* Credentials & Trust Grid */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">
              Verified Government & Safety Credentials
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 flex items-start gap-3">
                <BadgeCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-emerald-950">Skill India Certified</h4>
                  <p className="text-[11px] text-emerald-800 mt-0.5">
                    {worker.badges.certificationName || 'NSDC / PMKVY Trade Tested'}
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-blue-50/60 border border-blue-200/80 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-blue-950">Police Background Check</h4>
                  <p className="text-[11px] text-blue-800 mt-0.5">
                    Clear civil & criminal background verified
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/80 flex items-start gap-3">
                <FileCheck className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-amber-950">Govt Aadhaar KYC</h4>
                  <p className="text-[11px] text-amber-800 mt-0.5">
                    Biometric & bank linked identity
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Skills & Community Endorsements (LinkedIn-style) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400">
                Skills & Endorsements
              </h3>
              <span className="text-[11px] text-stone-500 font-medium">
                Tap + to endorse this skill
              </span>
            </div>

            <div className="space-y-2">
              {worker.skills.map((skillItem, idx) => {
                const addedCount = endorsedSkills[skillItem.skill] || 0;
                const total = skillItem.count + addedCount;

                return (
                  <div 
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-xl bg-stone-50 hover:bg-stone-100/70 border border-stone-200/60 transition-colors"
                  >
                    <div>
                      <div className="text-xs font-bold text-charcoal-900 flex items-center gap-2">
                        <span>{skillItem.skill}</span>
                        {skillItem.certifiedBy && (
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-1.5 py-0.2 rounded">
                            Certified by {skillItem.certifiedBy}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-stone-500">
                        {total} customers endorsed this competency
                      </span>
                    </div>

                    <button
                      onClick={() => handleEndorse(skillItem.skill)}
                      className="px-2.5 py-1 rounded-lg bg-white hover:bg-orange-50 border border-stone-200 hover:border-orange-300 text-xs font-bold text-charcoal-800 hover:text-orange-600 transition-colors flex items-center gap-1"
                    >
                      <ThumbsUp className="w-3 h-3 text-orange-600" />
                      <span>+{total}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Work Portfolio (Before & After Showcase) */}
          {worker.portfolio && worker.portfolio.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">
                Past Work Gallery (Verified Jobs)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {worker.portfolio.map((item) => (
                  <div 
                    key={item.id}
                    className="rounded-2xl border border-stone-200 overflow-hidden bg-white shadow-soft-sm"
                  >
                    <div className="h-44 overflow-hidden relative">
                      <img 
                        src={item.afterPhoto} 
                        alt={item.title} 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
                      />
                      <span className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {item.completedAt}
                      </span>
                    </div>
                    <div className="p-3.5">
                      <h4 className="text-xs font-bold text-charcoal-900">{item.title}</h4>
                      <p className="text-[11px] text-stone-500 mt-1 leading-normal">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Customer Reviews */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400">
                Recent Customer Reviews ({worker.reviews.length})
              </h3>
            </div>

            <div className="space-y-3">
              {worker.reviews.map((rev) => (
                <div key={rev.id} className="p-4 rounded-2xl bg-stone-50 border border-stone-200/70">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-stone-200 flex items-center justify-center font-bold text-xs text-stone-700">
                        {rev.customerName[0]}
                      </div>
                      <span className="text-xs font-bold text-charcoal-900">{rev.customerName}</span>
                      <span className="text-[10px] text-stone-400">({rev.locality})</span>
                    </div>
                    <div className="flex items-center gap-0.5 text-amber-500 font-bold text-xs">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{rev.rating}.0</span>
                    </div>
                  </div>
                  <p className="text-xs text-stone-700 leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                  <div className="mt-2 text-[10px] font-semibold text-stone-400 flex items-center gap-2">
                    <span>Service: {rev.serviceProvided}</span>
                    <span>•</span>
                    <span>{rev.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rate Card Transparency */}
          <div className="p-4 rounded-2xl bg-orange-50/50 border border-orange-200/80">
            <h4 className="text-xs font-bold text-orange-950 uppercase tracking-wider mb-2">
              Standard Rate Card Guarantee
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-stone-500 block">Visiting & Inspection Charge</span>
                <span className="font-extrabold text-charcoal-900">{formatINR(worker.minVisitingCharge)} (Adjusted in final bill)</span>
              </div>
              <div>
                <span className="text-stone-500 block">Standard Hourly Labor Rate</span>
                <span className="font-extrabold text-charcoal-900">{formatINR(worker.hourlyRate)} / hour</span>
              </div>
            </div>
            <p className="text-[11px] text-stone-600 mt-2">
              ✓ All parts billed with original GST receipt. Zero hidden commissions. 30-day rework warranty.
            </p>
          </div>

        </div>

        {/* Modal Footer CTAs */}
        <div className="px-5 sm:px-8 py-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-stone-400 uppercase block">Starting Inspection</span>
            <span className="text-base font-extrabold text-charcoal-900">{formatINR(worker.minVisitingCharge)}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={closeWorkerProfile}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-stone-100 border border-stone-200 text-xs font-bold text-stone-700 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                closeWorkerProfile();
                openBookingModal(worker.category, worker);
              }}
              className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs sm:text-sm font-bold shadow-soft transition-all flex items-center gap-2"
            >
              <span>Instant Book</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
