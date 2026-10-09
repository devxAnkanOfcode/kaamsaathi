import React, { useState } from 'react';
import { 
  Calculator, 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  TrendingDown, 
  Info,
  DollarSign
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatINR } from '../utils/formatters';
import { sound } from '../utils/audio';

interface ScamComparison {
  serviceName: string;
  category: 'electrician' | 'plumber' | 'ac-repair' | 'mechanic';
  fairPriceMin: number;
  fairPriceMax: number;
  scamPrice: number;
  commonScamTactic: string;
  kaamsaathiAdvantage: string;
}

const COMPARISONS: ScamComparison[] = [
  {
    serviceName: 'AC Gas Refill & Leak Inspection',
    category: 'ac-repair',
    fairPriceMin: 850,
    fairPriceMax: 1450,
    scamPrice: 3800,
    commonScamTactic: 'Technicians claim gas is completely empty without using a pressure gauge; charge for full bottle and fake copper soldering.',
    kaamsaathiAdvantage: 'Technicians carry calibrated digital manifold gauges and ammeters. You verify live pressure before paying.'
  },
  {
    serviceName: 'Water Motor Pump Starter / Capacitor Fix',
    category: 'electrician',
    fairPriceMin: 350,
    fairPriceMax: 650,
    scamPrice: 2400,
    commonScamTactic: 'Claiming the entire 1HP motor is burned and needs winding, when only a ₹120 capacitor or thermal relay tripped.',
    kaamsaathiAdvantage: 'Capacitor and winding resistance tested in front of you. Defective components returned with GST parts bill.'
  },
  {
    serviceName: 'Concealed Bathroom Pipe Leakage Repair',
    category: 'plumber',
    fairPriceMin: 450,
    fairPriceMax: 850,
    scamPrice: 4500,
    commonScamTactic: 'Insisting on breaking multiple tiles and demolishing the wall shaft without identifying the exact source.',
    kaamsaathiAdvantage: 'Acoustic listening probes and thermal imaging locate the exact joint before touching any plaster.'
  },
  {
    serviceName: 'Two-Wheeler Battery Jumpstart & Diagnostic',
    category: 'mechanic',
    fairPriceMin: 249,
    fairPriceMax: 399,
    scamPrice: 1200,
    commonScamTactic: 'Roadside extortion when stranded, demanding battery replacement at double MRP.',
    kaamsaathiAdvantage: 'Fixed ₹249 emergency dispatch fee. 12V multimeter load testing with transparent battery buyback warranty.'
  }
];

export const PriceEstimator: React.FC = () => {
  const { openBookingModal } = useApp();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selected = COMPARISONS[selectedIndex];

  return (
    <section id="estimator" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div className="bg-gradient-to-br from-[#1C2024] to-[#111418] rounded-3xl p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden border border-stone-800 text-left">
        
        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-orange-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider mb-3 border border-orange-500/30">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Anti-Scam Transparency Tool</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            The KaamSaathi Fair Price Benchmark
          </h2>
          <p className="text-stone-400 text-xs sm:text-sm mt-2">
            Local informal markets are rife with overcharging, fake replacement claims, and hidden commissions. See how our pre-calibrated rate cards protect both you and the skilled worker.
          </p>
        </div>

        {/* Interactive Selector Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {COMPARISONS.map((comp, idx) => (
            <button
              key={idx}
              onClick={() => { sound.playClick(); setSelectedIndex(idx); }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                selectedIndex === idx
                  ? 'bg-orange-600 text-white shadow-soft'
                  : 'bg-stone-800/80 hover:bg-stone-700 text-stone-300 border border-stone-700/60'
              }`}
            >
              {comp.serviceName.split(' ')[0]} {comp.serviceName.split(' ')[1]}
            </button>
          ))}
        </div>

        {/* Comparison Display Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left: Rogue / Unverified Market Pricing */}
          <div className="lg:col-span-5 bg-stone-900/90 rounded-2xl p-6 border border-rose-900/40 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-rose-400 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Unverified Local Market</span>
                <XCircle className="w-5 h-5 text-rose-500" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-rose-300">
                {formatINR(selected.scamPrice)} <span className="text-xs text-rose-400 font-normal">avg scam quote</span>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-800 space-y-2">
                <span className="text-[11px] font-bold uppercase text-stone-400 block">
                  Common Trap:
                </span>
                <p className="text-xs text-stone-300 leading-relaxed">
                  "{selected.commonScamTactic}"
                </p>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-stone-800/80 text-[11px] text-rose-400/80 flex items-center gap-1.5">
              <span>⚠️ No warranty • Cash-only • Inflated parts markup</span>
            </div>
          </div>

          {/* Right: KaamSaathi Verified Fair Benchmark */}
          <div className="lg:col-span-7 bg-gradient-to-br from-stone-800 to-stone-900 rounded-2xl p-6 border border-emerald-500/40 shadow-soft-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-emerald-400 mb-2">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span className="text-xs font-bold uppercase tracking-wider">KaamSaathi Verified Price</span>
                </div>
                <span className="text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                  Save ~60%
                </span>
              </div>

              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-300">
                {formatINR(selected.fairPriceMin)} – {formatINR(selected.fairPriceMax)}
              </div>

              <div className="mt-4 pt-3 border-t border-stone-700 space-y-2">
                <span className="text-[11px] font-bold uppercase text-amber-300 block">
                  How KaamSaathi Protects You:
                </span>
                <p className="text-xs text-stone-200 leading-relaxed">
                  {selected.kaamsaathiAdvantage}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="text-xs text-stone-400">
                ✓ 30-day rework warranty • 100% money-back guarantee
              </div>

              <button
                onClick={() => openBookingModal(selected.category)}
                className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-soft transition-all active:scale-95 flex items-center justify-center gap-1.5"
              >
                <span>Book at Fair Price</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};
