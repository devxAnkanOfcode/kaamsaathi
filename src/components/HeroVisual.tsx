import React, { useState } from 'react';
import { 
  Star, 
  ShieldCheck, 
  MapPin, 
  Clock, 
  ArrowRight, 
  Zap, 
  Droplets, 
  Wind, 
  Hammer,
  BadgeCheck,
  CheckCircle2
} from 'lucide-react';
import { WORKERS_DATA } from '../data/workers';
import { useApp } from '../context/AppContext';
import { formatINR } from '../utils/formatters';
import { Worker } from '../types';

export const HeroVisual: React.FC = () => {
  const { openWorkerProfile, openBookingModal } = useApp();
  const [hoveredWorkerId, setHoveredWorkerId] = useState<string | null>(null);

  // Pick 4 featured showcase workers: Electrician, Plumber, AC Repair, Carpenter
  const electrician = WORKERS_DATA[0]; // Ramesh
  const plumber = WORKERS_DATA[1];     // Rajesh
  const acTech = WORKERS_DATA[3];      // Imran
  const carpenter = WORKERS_DATA[4];   // Vikram

  const renderWorkerCard = (worker: Worker, posClasses: string, delayClass: string) => {
    const isHovered = hoveredWorkerId === worker.id;

    return (
      <div 
        className={`absolute ${posClasses} z-20 transition-all duration-300 ${delayClass} ${
          isHovered ? 'scale-105 z-30' : 'hover:scale-102'
        }`}
        onMouseEnter={() => setHoveredWorkerId(worker.id)}
        onMouseLeave={() => setHoveredWorkerId(null)}
      >
        <div 
          onClick={() => openWorkerProfile(worker)}
          className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-soft-lg border border-stone-200/90 w-[270px] sm:w-[290px] cursor-pointer group hover:border-orange-300 transition-all text-left"
        >
          {/* Header row: Avatar, Name, Trade */}
          <div className="flex items-start gap-3">
            <div className="relative">
              <img 
                src={worker.avatar} 
                alt={worker.name} 
                className="w-12 h-12 rounded-xl object-cover ring-2 ring-stone-100 group-hover:ring-orange-200 transition-all"
              />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white" title="Verified Professional">
                <CheckCircle2 className="w-2.5 h-2.5" />
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <h4 className="font-bold text-sm text-charcoal-900 truncate group-hover:text-orange-600 transition-colors">
                  {worker.name}
                </h4>
                {worker.badges.isGovtCertified && (
                  <span title="Govt PMKVY Certified">
                    <BadgeCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  </span>
                )}
              </div>
              <p className="text-[11px] font-semibold text-stone-500 truncate">
                {worker.tradeTitle}
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="flex items-center gap-0.5 text-amber-500 font-bold text-xs">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{worker.rating.toFixed(1)}</span>
                </div>
                <span className="text-stone-300 text-[10px]">•</span>
                <span className="text-[11px] text-stone-600 font-medium">
                  {worker.jobsCompleted}+ jobs
                </span>
              </div>
            </div>
          </div>

          {/* Location & ETA */}
          <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-1 text-stone-600">
              <MapPin className="w-3 h-3 text-orange-600" />
              <span className="font-medium truncate max-w-[120px]">{worker.locality}</span>
            </div>
            <div className="flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/50">
              <Clock className="w-3 h-3 text-emerald-600" />
              <span>{worker.etaMinutes}m ETA</span>
            </div>
          </div>

          {/* Pricing & Quick Action */}
          <div className="mt-2.5 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-stone-400 block uppercase font-semibold">Visit Fee</span>
              <span className="text-xs font-bold text-charcoal-900">{formatINR(worker.minVisitingCharge)}</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                openBookingModal(worker.category, worker);
              }}
              className="px-2.5 py-1 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-[11px] font-bold transition-colors flex items-center gap-1"
            >
              <span>Book</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-full h-[540px] sm:h-[580px] lg:h-[600px] flex items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-b from-[#F5F3EC]/80 to-[#ECE9DE]/40 border border-stone-200/70 p-4 select-none">
      
      {/* Background Graphic: Simulated Radar & Map Grid */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        {/* Subtle grid pattern */}
        <div 
          className="w-full h-full" 
          style={{ 
            backgroundImage: `radial-gradient(#CBD5E1 1px, transparent 1px)`, 
            backgroundSize: '24px 24px' 
          }} 
        />
      </div>

      {/* Central Radar Ping Beacon */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="w-72 h-72 rounded-full border border-orange-300/40 animate-ping-slow" />
        <div className="absolute inset-0 w-96 h-96 -translate-x-12 -translate-y-12 rounded-full border border-stone-300/30" />
        <div className="absolute inset-0 w-48 h-48 translate-x-12 translate-y-12 rounded-full border border-amber-300/50" />
      </div>

      {/* Central Hub Emblem: "Live Workers Near You" */}
      <div className="relative z-10 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-full shadow-soft border border-orange-200/60 flex items-center gap-2.5 animate-float">
        <div className="relative flex items-center justify-center">
          <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping absolute" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 relative" />
        </div>
        <div className="text-xs">
          <span className="font-extrabold text-charcoal-900">42 Verified Workers</span>{' '}
          <span className="text-stone-500 font-medium hidden sm:inline">Active in 3 km Radius</span>
        </div>
      </div>

      {/* SVG Connecting lines between central hub and cards */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-orange-400/30 stroke-dasharray-[4,4] stroke-[1.5]">
        {/* Lines pointing to the 4 corners */}
        <line x1="50%" y1="50%" x2="25%" y2="20%" strokeDasharray="4 4" />
        <line x1="50%" y1="50%" x2="75%" y2="22%" strokeDasharray="4 4" />
        <line x1="50%" y1="50%" x2="22%" y2="78%" strokeDasharray="4 4" />
        <line x1="50%" y1="50%" x2="76%" y2="80%" strokeDasharray="4 4" />
      </svg>

      {/* 4 Corner Professional Cards */}
      {/* 1. Top Left: Electrician */}
      {renderWorkerCard(
        electrician, 
        'top-4 left-2 sm:top-8 sm:left-6 lg:left-8', 
        'animate-in fade-in slide-in-from-top-4'
      )}

      {/* 2. Top Right: Plumber */}
      {renderWorkerCard(
        plumber, 
        'top-8 right-2 sm:top-12 sm:right-6 lg:right-8', 
        'animate-in fade-in slide-in-from-right-4'
      )}

      {/* 3. Bottom Left: AC Specialist */}
      {renderWorkerCard(
        acTech, 
        'bottom-4 left-2 sm:bottom-8 sm:left-6 lg:left-8', 
        'animate-in fade-in slide-in-from-left-4'
      )}

      {/* 4. Bottom Right: Master Carpenter */}
      {renderWorkerCard(
        carpenter, 
        'bottom-8 right-2 sm:bottom-10 sm:right-6 lg:right-8', 
        'animate-in fade-in slide-in-from-bottom-4'
      )}

      {/* Floating Trust Pills */}
      <div className="absolute top-1/2 left-4 -translate-y-1/2 hidden xl:flex flex-col gap-2 z-20 pointer-events-none">
        <div className="bg-white/95 px-3 py-1.5 rounded-full shadow-soft-sm border border-stone-200 text-[11px] font-bold text-stone-700 flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Govt Skill Verified</span>
        </div>
        <div className="bg-white/95 px-3 py-1.5 rounded-full shadow-soft-sm border border-stone-200 text-[11px] font-bold text-stone-700 flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-amber-500" />
          <span>15-Min Express Arrival</span>
        </div>
      </div>

    </div>
  );
};
