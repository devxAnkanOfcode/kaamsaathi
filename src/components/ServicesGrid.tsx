import React from 'react';
import { 
  Zap, 
  Droplets, 
  Wind, 
  Hammer, 
  Wrench, 
  Sparkles, 
  Paintbrush, 
  Cpu, 
  Flame, 
  Layers, 
  Car, 
  Scissors,
  ArrowRight,
  ShieldAlert,
  Clock,
  Check
} from 'lucide-react';
import { SERVICES_LIST } from '../data/services';
import { useApp } from '../context/AppContext';
import { ServiceCategory } from '../types';
import { sound } from '../utils/audio';

const iconMap: Record<string, React.ElementType> = {
  Zap,
  Droplets,
  Wind,
  Hammer,
  Wrench,
  Sparkles,
  Paintbrush,
  Cpu,
  Flame,
  Layers,
  Car,
  Scissors
};

export const ServicesGrid: React.FC = () => {
  const { setSelectedCategory, openBookingModal } = useApp();

  const handleSelectService = (cat: ServiceCategory) => {
    sound.playClick();
    setSelectedCategory(cat);
    const target = document.getElementById('workers');
    target?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="py-16 bg-[#F5F4F0]/60 border-y border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100/70 text-orange-800 text-xs font-bold uppercase tracking-wider mb-2.5">
              <span>Standardized Services</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal-900 tracking-tight font-display">
              Transparent Services. No Hidden Gouging.
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-2 max-w-2xl">
              Every job has pre-calibrated benchmark pricing. Inspect, hire directly, or schedule a verified specialist with transparent rate cards.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-100/80 px-3.5 py-2 rounded-xl border border-emerald-300/60">
            <Clock className="w-4 h-4 text-emerald-600" />
            <span>Average Dispatch: Under 20 Minutes in Major Hubs</span>
          </div>
        </div>

        {/* Services Grid (12 items) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {SERVICES_LIST.map((srv) => {
            const Icon = iconMap[srv.iconName] || Wrench;

            return (
              <div 
                key={srv.id}
                className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-soft-sm hover:shadow-soft hover:border-orange-300 card-hover flex flex-col justify-between group text-left"
              >
                <div>
                  {/* Top Bar with Icon & Benchmark Price */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-orange-50 group-hover:bg-orange-100 flex items-center justify-center text-orange-600 transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-stone-100 text-charcoal-800 border border-stone-200/80">
                      {srv.benchmarkPriceRange}
                    </span>
                  </div>

                  {/* Title & Hindi Subtitle */}
                  <h3 className="font-bold text-lg text-charcoal-900 group-hover:text-orange-600 transition-colors flex items-baseline gap-2">
                    <span>{srv.title}</span>
                    <span className="text-xs font-medium text-stone-400">({srv.hindiTitle})</span>
                  </h3>
                  
                  <p className="text-xs text-stone-500 mt-1 line-clamp-2">
                    {srv.shortDesc}
                  </p>

                  {/* Popular Sub-services Tags */}
                  <div className="mt-4 pt-3 border-t border-stone-100 space-y-1.5">
                    <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block">
                      Common Fixes:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {srv.popularSubServices.slice(0, 3).map((sub, idx) => (
                        <span 
                          key={idx}
                          className="text-[11px] font-medium bg-stone-50 hover:bg-stone-100 text-stone-600 px-2 py-0.5 rounded-md border border-stone-200/60"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Action Buttons */}
                <div className="mt-5 pt-3 border-t border-stone-100 flex items-center gap-2">
                  <button
                    onClick={() => handleSelectService(srv.category)}
                    className="flex-1 py-2 px-3 rounded-xl bg-stone-100 hover:bg-stone-200/80 text-charcoal-900 text-xs font-bold transition-colors flex items-center justify-center gap-1"
                  >
                    <span>View Workers</span>
                    <ArrowRight className="w-3 h-3 text-stone-400" />
                  </button>

                  <button
                    onClick={() => openBookingModal(srv.category)}
                    className="py-2 px-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition-colors shadow-sm"
                    title="Instant Express Request"
                  >
                    Book Now
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
