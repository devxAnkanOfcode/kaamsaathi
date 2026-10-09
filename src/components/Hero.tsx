import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  ArrowRight, 
  ShieldCheck, 
  Star, 
  Zap, 
  Droplets, 
  Hammer, 
  Wind, 
  Wrench, 
  Paintbrush, 
  Sparkles, 
  Car,
  Briefcase,
  CheckCircle,
  HelpCircle,
  Clock
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SERVICES_LIST } from '../data/services';
import { HeroVisual } from './HeroVisual';
import { sound } from '../utils/audio';

export const Hero: React.FC = () => {
  const { 
    setRole, 
    locality, 
    city, 
    selectedCategory, 
    setSelectedCategory, 
    openBookingModal,
    searchQuery,
    setSearchQuery 
  } = useApp();

  const [inputQuery, setInputQuery] = useState('');
  const [selectedServiceId, setSelectedServiceId] = useState('electrician');

  const popularServices = [
    { id: 'plumber', label: 'Plumber', icon: Droplets, color: 'text-blue-600 bg-blue-50' },
    { id: 'electrician', label: 'Electrician', icon: Zap, color: 'text-amber-600 bg-amber-50' },
    { id: 'mechanic', label: 'Mechanic', icon: Wrench, color: 'text-rose-600 bg-rose-50' },
    { id: 'carpenter', label: 'Carpenter', icon: Hammer, color: 'text-orange-700 bg-orange-50' },
    { id: 'ac-repair', label: 'AC Repair', icon: Wind, color: 'text-cyan-600 bg-cyan-50' },
    { id: 'cleaner', label: 'Deep Cleaner', icon: Sparkles, color: 'text-emerald-600 bg-emerald-50' },
    { id: 'painter', label: 'Painter', icon: Paintbrush, color: 'text-purple-600 bg-purple-50' },
    { id: 'driver', label: 'Driver', icon: Car, color: 'text-slate-700 bg-slate-100' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();
    const matchedService = SERVICES_LIST.find(s => s.id === selectedServiceId);
    if (matchedService) {
      setSelectedCategory(matchedService.category);
    }
    const workerSection = document.getElementById('workers');
    workerSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleTagClick = (serviceId: string) => {
    sound.playClick();
    setSelectedServiceId(serviceId);
    setSelectedCategory(serviceId as any);
    const workerSection = document.getElementById('workers');
    workerSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-6 pb-16 lg:pt-12 lg:pb-24 overflow-hidden">
      
      {/* Background warm aesthetic ambient glow */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-orange-200/25 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Trust Banner Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-stone-200/90 shadow-soft-sm text-xs font-semibold text-charcoal-700">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-orange-600 font-bold">Bharat's Skilled Network:</span>
            <span>Over 12,000+ Verified Independent Tradespeople</span>
          </div>
        </div>

        {/* Main 2-Column Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines, CTAs & Interactive Search Box */}
          <div className="lg:col-span-6 xl:col-span-5 text-center lg:text-left space-y-6">
            
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold text-charcoal-900 tracking-tight leading-[1.12] font-display">
              Great Work <br />
              <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 bg-clip-text text-transparent">
                Deserves to Be Found.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-stone-600 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Find trusted local professionals, compare prices, book services and build a reputation that follows you wherever you work.
            </p>

            {/* Primary & Secondary Dual CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-1">
              <a
                href="#workers"
                onClick={() => sound.playClick()}
                className="px-6 py-3.5 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm shadow-soft hover:shadow-premium transition-all active:scale-95 flex items-center gap-2 group"
              >
                <span>Find a Worker</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={() => {
                  sound.playClick();
                  setRole('worker');
                  const dash = document.getElementById('worker-dashboard');
                  dash?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3.5 rounded-2xl bg-white hover:bg-stone-50 text-charcoal-900 font-bold text-sm border border-stone-200/90 shadow-soft-sm hover:shadow transition-all active:scale-95 flex items-center gap-2"
              >
                <Briefcase className="w-4 h-4 text-orange-600" />
                <span>Find Work</span>
              </button>
            </div>

            {/* Large Interactive Service-Search Component */}
            <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-soft-lg border border-stone-200/80 text-left mt-6">
              <form onSubmit={handleSearchSubmit} className="space-y-3">
                
                {/* Field 1: What do you need help with? */}
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                    What do you need help with?
                  </label>
                  <div className="relative">
                    <select
                      value={selectedServiceId}
                      onChange={(e) => setSelectedServiceId(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-3 text-sm font-semibold text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 appearance-none cursor-pointer"
                    >
                      {SERVICES_LIST.map((srv) => (
                        <option key={srv.id} value={srv.id}>
                          {srv.title} ({srv.hindiTitle}) — {srv.benchmarkPriceRange}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-xs">
                      ▼
                    </div>
                  </div>
                </div>

                {/* Field 2: Where? */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                  <div className="sm:col-span-7">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                      Where?
                    </label>
                    <div className="flex items-center gap-2 bg-stone-50 border border-stone-200 rounded-xl px-3 py-3 text-sm">
                      <MapPin className="w-4 h-4 text-orange-600 flex-shrink-0" />
                      <input 
                        type="text" 
                        value={`${locality}, ${city}`}
                        readOnly
                        className="bg-transparent font-medium text-charcoal-800 focus:outline-none w-full text-xs sm:text-sm truncate cursor-pointer"
                        title="Change location in the top bar"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="sm:col-span-5 flex items-end">
                    <button
                      type="submit"
                      className="w-full py-3 px-4 rounded-xl bg-charcoal-900 hover:bg-black text-white font-bold text-xs sm:text-sm shadow-soft transition-all active:scale-95 flex items-center justify-center gap-1.5 h-[46px]"
                    >
                      <Search className="w-4 h-4 text-amber-400" />
                      <span>Find Professionals</span>
                    </button>
                  </div>
                </div>

              </form>

              {/* Popular Service Pills */}
              <div className="mt-4 pt-3.5 border-t border-stone-100">
                <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block mb-2">
                  Popular Services:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {popularServices.map((item) => {
                    const Icon = item.icon;
                    const isSelected = selectedCategory === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleTagClick(item.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                          isSelected
                            ? 'bg-orange-600 text-white shadow-soft-sm'
                            : 'bg-stone-100 hover:bg-stone-200/80 text-stone-700'
                        }`}
                      >
                        <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : ''}`} />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Quick Guarantees under search */}
            <div className="grid grid-cols-3 gap-2 pt-2 text-left">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="text-xs font-medium text-stone-600">Police & ID Checked</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="text-xs font-medium text-stone-600">Fixed Rate Cards</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="text-xs font-medium text-stone-600">Direct Worker Hire</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Composition */}
          <div className="lg:col-span-6 xl:col-span-7">
            <HeroVisual />
          </div>

        </div>

      </div>
    </section>
  );
};
