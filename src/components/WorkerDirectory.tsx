import React, { useState, useMemo } from 'react';
import { 
  Star, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  Filter, 
  SlidersHorizontal, 
  Search, 
  Map as MapIcon, 
  Grid3X3, 
  BadgeCheck, 
  Phone, 
  Car, 
  ArrowRight,
  UserCheck,
  Check,
  Sparkles,
  Zap
} from 'lucide-react';
import { WORKERS_DATA } from '../data/workers';
import { SERVICES_LIST } from '../data/services';
import { useApp } from '../context/AppContext';
import { Worker, ServiceCategory } from '../types';
import { formatINR, formatDistance, formatETA } from '../utils/formatters';
import { sound } from '../utils/audio';

export const WorkerDirectory: React.FC = () => {
  const { 
    selectedCategory, 
    setSelectedCategory, 
    openWorkerProfile, 
    openBookingModal,
    locality,
    city
  } = useApp();

  const [searchFilter, setSearchFilter] = useState('');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [availableOnly, setAvailableOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'distance' | 'rating' | 'experience' | 'price'>('distance');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [selectedMapWorkerId, setSelectedMapWorkerId] = useState<string | null>(null);

  // Filter workers based on criteria
  const filteredWorkers = useMemo(() => {
    return WORKERS_DATA.filter(w => {
      // Category filter
      if (selectedCategory && w.category !== selectedCategory) {
        return false;
      }
      // Search term filter
      if (searchFilter) {
        const query = searchFilter.toLowerCase();
        const matchesName = w.name.toLowerCase().includes(query);
        const matchesTrade = w.tradeTitle.toLowerCase().includes(query);
        const matchesSkill = w.skills.some(s => s.skill.toLowerCase().includes(query));
        const matchesLocality = w.locality.toLowerCase().includes(query);
        if (!matchesName && !matchesTrade && !matchesSkill && !matchesLocality) return false;
      }
      // Verified filter
      if (verifiedOnly && !(w.badges.isGovtCertified && w.badges.isPoliceVerified)) {
        return false;
      }
      // Available now filter
      if (availableOnly && !w.isAvailableNow) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'distance') return a.distanceKm - b.distanceKm;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'experience') return b.experienceYears - a.experienceYears;
      if (sortBy === 'price') return a.minVisitingCharge - b.minVisitingCharge;
      return 0;
    });
  }, [selectedCategory, searchFilter, verifiedOnly, availableOnly, sortBy]);

  const activeWorkerOnMap = useMemo(() => {
    if (!selectedMapWorkerId) return filteredWorkers[0] || null;
    return filteredWorkers.find(w => w.id === selectedMapWorkerId) || filteredWorkers[0] || null;
  }, [selectedMapWorkerId, filteredWorkers]);

  return (
    <section id="workers" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header & Mission Statement */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold uppercase tracking-wider mb-2">
            <span>Verified Artisan & Technician Directory</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal-900 tracking-tight font-display">
            Nearby Available Professionals
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-1">
            Compare verified experience, credentials, customer reviews, and live arrival times in <span className="font-bold text-charcoal-900">{locality}, {city}</span>.
          </p>
        </div>

        {/* View Mode Toggle (Grid vs Map) */}
        <div className="mt-4 md:mt-0 flex items-center gap-2">
          <div className="bg-stone-100 p-1 rounded-xl flex items-center border border-stone-200">
            <button
              onClick={() => { sound.playClick(); setViewMode('grid'); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'grid'
                  ? 'bg-white text-charcoal-900 shadow-soft-sm'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <Grid3X3 className="w-3.5 h-3.5" />
              <span>Grid View</span>
            </button>
            <button
              onClick={() => { sound.playClick(); setViewMode('map'); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'map'
                  ? 'bg-white text-charcoal-900 shadow-soft-sm'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <MapIcon className="w-3.5 h-3.5 text-orange-600" />
              <span>Interactive Map</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-soft-sm border border-stone-200/90 mb-8 space-y-4">
        
        {/* Row 1: Search and Category Pills */}
        <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center">
          
          {/* Keyword Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Search by name, skill (e.g. MCB, leak, smart lock), or locality..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            />
            {searchFilter && (
              <button 
                onClick={() => setSearchFilter('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Category Selector */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            <button
              onClick={() => { sound.playClick(); setSelectedCategory(null); }}
              className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                selectedCategory === null
                  ? 'bg-charcoal-900 text-white'
                  : 'bg-stone-100 hover:bg-stone-200/70 text-stone-700'
              }`}
            >
              All Trades
            </button>

            {SERVICES_LIST.slice(0, 6).map(s => (
              <button
                key={s.id}
                onClick={() => { sound.playClick(); setSelectedCategory(s.category); }}
                className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === s.category
                    ? 'bg-orange-600 text-white'
                    : 'bg-stone-100 hover:bg-stone-200/70 text-stone-700'
                }`}
              >
                {s.title}
              </button>
            ))}
          </div>

        </div>

        {/* Row 2: Checkbox Toggles & Sorting */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-100 text-xs">
          
          {/* Toggles */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => { sound.playClick(); setVerifiedOnly(!verifiedOnly); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-colors ${
                verifiedOnly 
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-bold' 
                  : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
              }`}
            >
              <ShieldCheck className={`w-3.5 h-3.5 ${verifiedOnly ? 'text-emerald-600' : 'text-stone-400'}`} />
              <span>Govt & Police Verified Only</span>
            </button>

            <button
              onClick={() => { sound.playClick(); setAvailableOnly(!availableOnly); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-colors ${
                availableOnly 
                  ? 'bg-orange-50 border-orange-300 text-orange-800 font-bold' 
                  : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
              }`}
            >
              <Zap className={`w-3.5 h-3.5 ${availableOnly ? 'text-orange-600' : 'text-stone-400'}`} />
              <span>Available Right Now</span>
            </button>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-stone-500 font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => { sound.playClick(); setSortBy(e.target.value as any); }}
              className="bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1.5 font-bold text-charcoal-900 focus:outline-none focus:ring-1 focus:ring-orange-500 cursor-pointer"
            >
              <option value="distance">Nearest Distance (Proximity)</option>
              <option value="rating">Highest Rating (★)</option>
              <option value="experience">Years of Experience</option>
              <option value="price">Lowest Visiting Fee</option>
            </select>
          </div>

        </div>

      </div>

      {/* Empty State */}
      {filteredWorkers.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8">
          <SlidersHorizontal className="w-12 h-12 text-stone-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-charcoal-900">No matching workers found</h3>
          <p className="text-sm text-stone-500 mt-1 max-w-md mx-auto">
            Try adjusting your search filters or clearing the category filter to see more professionals.
          </p>
          <button
            onClick={() => {
              setSelectedCategory(null);
              setSearchFilter('');
              setVerifiedOnly(false);
              setAvailableOnly(false);
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-orange-600 text-white text-xs font-bold"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* VIEW MODE 1: GRID VIEW */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkers.map((worker) => (
            <div 
              key={worker.id}
              className="bg-white rounded-3xl p-5 border border-stone-200/90 shadow-soft-sm hover:shadow-soft hover:border-orange-300 card-hover flex flex-col justify-between group text-left"
            >
              <div>
                {/* Header row: Avatar, Online Status, Name, Trade */}
                <div className="flex items-start gap-3.5">
                  <div className="relative">
                    <img 
                      src={worker.avatar} 
                      alt={worker.name} 
                      className="w-16 h-16 rounded-2xl object-cover ring-2 ring-stone-100 group-hover:ring-orange-200 transition-all"
                    />
                    {worker.isAvailableNow ? (
                      <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white" title="Available for immediate booking">
                        <Check className="w-2.5 h-2.5" />
                      </span>
                    ) : (
                      <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-stone-400 border-2 border-white" title="Busy on job" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 
                        onClick={() => openWorkerProfile(worker)}
                        className="font-extrabold text-base text-charcoal-900 hover:text-orange-600 transition-colors cursor-pointer truncate"
                      >
                        {worker.name}
                      </h3>
                      {worker.badges.isGovtCertified && (
                        <span title="Govt Skill Certified">
                          <BadgeCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        </span>
                      )}
                    </div>
                    
                    <p className="text-xs font-semibold text-stone-500 truncate">
                      {worker.tradeTitle}
                    </p>

                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1 text-amber-500 font-extrabold text-xs">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{worker.rating.toFixed(2)}</span>
                      </div>
                      <span className="text-stone-300 text-xs">•</span>
                      <span className="text-xs font-medium text-stone-600">
                        {worker.jobsCompleted}+ jobs completed
                      </span>
                    </div>
                  </div>
                </div>

                {/* Trust Badges Strip */}
                <div className="mt-3.5 flex flex-wrap gap-1.5">
                  {worker.badges.isGovtCertified && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      <span>Govt PMKVY</span>
                    </span>
                  )}
                  {worker.badges.isPoliceVerified && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                      <CheckCircle2 className="w-3 h-3 text-blue-600" />
                      <span>Police Verified</span>
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-100 text-stone-700">
                    <span>{worker.experienceYears} Yrs Exp</span>
                  </span>
                </div>

                {/* Location & ETA metrics */}
                <div className="mt-3.5 p-2.5 rounded-xl bg-stone-50 border border-stone-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-stone-700">
                    <MapPin className="w-3.5 h-3.5 text-orange-600 flex-shrink-0" />
                    <span className="font-semibold truncate max-w-[130px]">{worker.locality}</span>
                    <span className="text-stone-400">({formatDistance(worker.distanceKm)})</span>
                  </div>
                  <div className="flex items-center gap-1 font-bold text-emerald-700">
                    <Clock className="w-3 h-3 text-emerald-600" />
                    <span>{formatETA(worker.etaMinutes)} ETA</span>
                  </div>
                </div>

                {/* Top Skills Endorsements */}
                <div className="mt-3.5 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                    Verified Competencies:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {worker.skills.slice(0, 3).map((sk, idx) => (
                      <span 
                        key={idx}
                        className="text-[11px] font-medium bg-stone-100 text-charcoal-700 px-2 py-0.5 rounded-md flex items-center gap-1"
                      >
                        <span>{sk.skill}</span>
                        <span className="text-[9px] font-bold text-orange-600 bg-orange-50 px-1 rounded">
                          +{sk.count}
                        </span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Short Bio */}
                <p className="mt-3 text-xs text-stone-500 line-clamp-2 leading-relaxed">
                  "{worker.bio}"
                </p>

              </div>

              {/* Bottom Price & Booking Actions */}
              <div className="mt-5 pt-3.5 border-t border-stone-100">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-stone-400 block">Inspection Fee</span>
                    <span className="text-base font-extrabold text-charcoal-900">
                      {formatINR(worker.minVisitingCharge)}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-stone-400 block">Standard Rate</span>
                    <span className="text-xs font-semibold text-stone-600">
                      {formatINR(worker.hourlyRate)}/hr
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => openWorkerProfile(worker)}
                    className="py-2.5 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-charcoal-900 text-xs font-bold transition-colors text-center"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => openBookingModal(worker.category, worker)}
                    className="py-2.5 px-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition-all shadow-sm active:scale-95 text-center flex items-center justify-center gap-1"
                  >
                    <span>Book Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* VIEW MODE 2: INTERACTIVE LIVE MAP VIEW */}
      {viewMode === 'map' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white rounded-3xl p-5 border border-stone-200/90 shadow-soft">
          
          {/* Left interactive map graphic */}
          <div className="lg:col-span-7 xl:col-span-8 h-[480px] sm:h-[540px] rounded-2xl bg-[#F4F3ED] border border-stone-200 relative overflow-hidden flex items-center justify-center">
            
            {/* Map styling grid & streets */}
            <svg className="absolute inset-0 w-full h-full stroke-stone-300/70" strokeWidth="1.5">
              {/* Simulated road networks */}
              <line x1="10%" y1="0%" x2="10%" y2="100%" />
              <line x1="35%" y1="0%" x2="35%" y2="100%" strokeWidth="2.5" className="stroke-stone-300" />
              <line x1="70%" y1="0%" x2="70%" y2="100%" strokeWidth="3" className="stroke-stone-300" />
              <line x1="90%" y1="0%" x2="90%" y2="100%" />

              <line x1="0%" y1="20%" x2="100%" y2="20%" strokeWidth="2" />
              <line x1="0%" y1="50%" x2="100%" y2="50%" strokeWidth="4" className="stroke-stone-300" />
              <line x1="0%" y1="75%" x2="100%" y2="75%" strokeWidth="2" />

              {/* Diagonal ring road */}
              <line x1="15%" y1="10%" x2="85%" y2="90%" strokeDasharray="6 4" strokeWidth="2" className="stroke-orange-300" />
            </svg>

            {/* Central Customer Pin (You Are Here) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center pointer-events-none">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 animate-ping absolute" />
              <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg border-2 border-white font-bold text-xs">
                You
              </div>
              <span className="mt-1 bg-white/95 text-charcoal-900 px-2 py-0.5 rounded shadow text-[10px] font-bold">
                {locality}
              </span>
            </div>

            {/* Worker Map Pins */}
            {filteredWorkers.map((w, idx) => {
              // Calculate stylized map coordinates
              const positions = [
                { top: '25%', left: '30%' },
                { top: '35%', left: '72%' },
                { top: '68%', left: '25%' },
                { top: '78%', left: '68%' },
                { top: '22%', left: '80%' },
                { top: '75%', left: '42%' },
                { top: '15%', left: '45%' },
                { top: '60%', left: '82%' },
              ];
              const pos = positions[idx % positions.length];
              const isSelected = activeWorkerOnMap?.id === w.id;

              return (
                <div
                  key={w.id}
                  style={{ top: pos.top, left: pos.left }}
                  onClick={() => { sound.playClick(); setSelectedMapWorkerId(w.id); }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer transition-transform ${
                    isSelected ? 'scale-125 z-40' : 'hover:scale-110'
                  }`}
                >
                  <div className={`p-1 rounded-2xl shadow-soft flex items-center gap-1.5 border transition-all ${
                    isSelected 
                      ? 'bg-orange-600 text-white border-orange-700 ring-4 ring-orange-200' 
                      : 'bg-white text-charcoal-900 border-stone-300 hover:border-orange-400'
                  }`}>
                    <img src={w.avatar} alt={w.name} className="w-6 h-6 rounded-full object-cover" />
                    <span className="text-[11px] font-bold pr-1">{w.name.split(' ')[0]}</span>
                    <span className={`text-[10px] font-extrabold px-1 py-0.5 rounded ${
                      isSelected ? 'bg-orange-700 text-amber-200' : 'bg-stone-100 text-orange-600'
                    }`}>
                      {w.etaMinutes}m
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Map Legend Banner */}
            <div className="absolute bottom-4 left-4 z-20 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-stone-200 text-[11px] font-semibold text-stone-600 shadow-soft-sm">
              Tap any worker pin to preview profile and book
            </div>

          </div>

          {/* Right Selected Worker Highlight Card */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col justify-between">
            {activeWorkerOnMap ? (
              <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200/90 h-full flex flex-col justify-between text-left">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                    <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
                      Selected on Map
                    </span>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      {activeWorkerOnMap.etaMinutes} mins away
                    </span>
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    <img 
                      src={activeWorkerOnMap.avatar} 
                      alt={activeWorkerOnMap.name} 
                      className="w-16 h-16 rounded-2xl object-cover ring-2 ring-stone-200" 
                    />
                    <div>
                      <h4 className="font-bold text-base text-charcoal-900">{activeWorkerOnMap.name}</h4>
                      <p className="text-xs font-semibold text-stone-500">{activeWorkerOnMap.tradeTitle}</p>
                      <div className="flex items-center gap-1 text-amber-500 font-bold text-xs mt-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{activeWorkerOnMap.rating.toFixed(2)}</span>
                        <span className="text-stone-400 font-normal">({activeWorkerOnMap.totalReviews} reviews)</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2 text-xs">
                    <div className="flex items-center justify-between py-1 border-b border-stone-200/60">
                      <span className="text-stone-500 font-medium">Location</span>
                      <span className="font-bold text-charcoal-900">{activeWorkerOnMap.locality}</span>
                    </div>
                    <div className="flex items-center justify-between py-1 border-b border-stone-200/60">
                      <span className="text-stone-500 font-medium">Distance</span>
                      <span className="font-bold text-charcoal-900">{formatDistance(activeWorkerOnMap.distanceKm)}</span>
                    </div>
                    <div className="flex items-center justify-between py-1 border-b border-stone-200/60">
                      <span className="text-stone-500 font-medium">Visiting Inspection Fee</span>
                      <span className="font-extrabold text-charcoal-900">{formatINR(activeWorkerOnMap.minVisitingCharge)}</span>
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <span className="text-stone-500 font-medium">Vehicle / Gear</span>
                      <span className="font-semibold text-stone-700 truncate max-w-[170px]">{activeWorkerOnMap.vehicle || 'Equipped with Toolbag'}</span>
                    </div>
                  </div>

                  <p className="mt-4 text-xs text-stone-600 line-clamp-3 italic">
                    "{activeWorkerOnMap.bio}"
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-200 space-y-2">
                  <button
                    onClick={() => openBookingModal(activeWorkerOnMap.category, activeWorkerOnMap)}
                    className="w-full py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all"
                  >
                    Book {activeWorkerOnMap.name.split(' ')[0]} Now
                  </button>
                  <button
                    onClick={() => openWorkerProfile(activeWorkerOnMap)}
                    className="w-full py-2.5 rounded-xl bg-white hover:bg-stone-100 text-charcoal-900 font-bold text-xs border border-stone-200 transition-colors"
                  >
                    View Full LinkedIn-style Profile
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-stone-400 text-xs">
                Select a worker on the map
              </div>
            )}
          </div>

        </div>
      )}

    </section>
  );
};
