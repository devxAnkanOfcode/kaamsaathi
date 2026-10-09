import React from 'react';
import { 
  HeartHandshake, 
  Sparkles, 
  ShieldCheck, 
  Award, 
  TrendingUp, 
  Quote, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { sound } from '../utils/audio';

export const DignitySection: React.FC = () => {
  const { setRole } = useApp();

  return (
    <section id="dignity" className="py-20 bg-white border-y border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-orange-700 text-xs font-bold uppercase tracking-wider mb-3 border border-orange-200">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The KaamSaathi Philosophy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal-900 tracking-tight font-display">
            Restoring the Dignity of Skilled Trade
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-3 leading-relaxed">
            Corporate professionals have LinkedIn to showcase their accomplishments. For the 450+ million skilled technicians and artisans powering India, KaamSaathi builds a permanent, portable digital identity that commands respect.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 text-left">
          
          <div className="p-6 rounded-3xl bg-stone-50 border border-stone-200/80 hover:border-orange-300 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-orange-100/80 text-orange-600 flex items-center justify-center mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-charcoal-900 mb-1.5">
              Portable Reputation
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Reviews and certifications belong to the worker. If they move cities, their hard-earned 4.9★ rating travels with them.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-stone-50 border border-stone-200/80 hover:border-orange-300 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100/80 text-emerald-600 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-charcoal-900 mb-1.5">
              Government Accreditations
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Integration with Skill India, PMKVY, and ITI diplomas verifies genuine trade mastery, eliminating fake workers.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-stone-50 border border-stone-200/80 hover:border-orange-300 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-blue-100/80 text-blue-600 flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-charcoal-900 mb-1.5">
              Zero Extortion Fees
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Aggregators take 30-35% cut from worker payouts. On KaamSaathi, workers keep 100% of their labor charges.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-stone-50 border border-stone-200/80 hover:border-orange-300 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-purple-100/80 text-purple-600 flex items-center justify-center mb-4">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-charcoal-900 mb-1.5">
              Bilateral Respect
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Technicians rate customers too. Mutual accountability ensures polite, dignified interactions in every household.
            </p>
          </div>

        </div>

        {/* 3 Real Worker Voices Spotlight */}
        <div className="bg-[#FAF9F5] rounded-3xl p-8 border border-stone-200 text-left">
          <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-6 text-center">
            Voices from Bharat's Skilled Workforce
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Story 1 */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-soft-sm flex flex-col justify-between">
              <div className="space-y-3">
                <Quote className="w-6 h-6 text-orange-400" />
                <p className="text-xs text-stone-700 italic leading-relaxed">
                  "In 14 years of electrical wiring, I never had a CV. With KaamSaathi, my 384 customer reviews helped me win annual maintenance contracts directly with societies."
                </p>
              </div>
              <div className="flex items-center gap-3 mt-4 pt-3 border-t border-stone-100">
                <img 
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80" 
                  alt="Rameshwar" 
                  className="w-10 h-10 rounded-xl object-cover" 
                />
                <div>
                  <h4 className="font-bold text-xs text-charcoal-900">Rameshwar Kumar</h4>
                  <span className="text-[10px] text-stone-500">Master Electrician, Indiranagar</span>
                </div>
              </div>
            </div>

            {/* Story 2 */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-soft-sm flex flex-col justify-between">
              <div className="space-y-3">
                <Quote className="w-6 h-6 text-orange-400" />
                <p className="text-xs text-stone-700 italic leading-relaxed">
                  "Customers no longer bargain blindly or treat us like disposable help. They see our Kärcher machine certifications and treat our team like cleaning engineers."
                </p>
              </div>
              <div className="flex items-center gap-3 mt-4 pt-3 border-t border-stone-100">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80" 
                  alt="Anita Devi" 
                  className="w-10 h-10 rounded-xl object-cover" 
                />
                <div>
                  <h4 className="font-bold text-xs text-charcoal-900">Anita Devi</h4>
                  <span className="text-[10px] text-stone-500">Deep Cleaning Lead, HSR Layout</span>
                </div>
              </div>
            </div>

            {/* Story 3 */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-soft-sm flex flex-col justify-between">
              <div className="space-y-3">
                <Quote className="w-6 h-6 text-orange-400" />
                <p className="text-xs text-stone-700 italic leading-relaxed">
                  "People used to think all AC technicians lie about gas leaks. My digital pressure gauge photos proved my honesty, and now I'm booked 2 weeks in advance."
                </p>
              </div>
              <div className="flex items-center gap-3 mt-4 pt-3 border-t border-stone-100">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80" 
                  alt="Imran Khan" 
                  className="w-10 h-10 rounded-xl object-cover" 
                />
                <div>
                  <h4 className="font-bold text-xs text-charcoal-900">Imran Khan</h4>
                  <span className="text-[10px] text-stone-500">BEE HVAC Tech, Whitefield</span>
                </div>
              </div>
            </div>

          </div>

          {/* Join as Worker CTA */}
          <div className="mt-8 pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-sm text-charcoal-900">Are you a skilled technician or craftsman?</h4>
              <p className="text-xs text-stone-500">Build your verified professional identity in under 5 minutes.</p>
            </div>
            <button
              onClick={() => {
                sound.playClick();
                setRole('worker');
                const target = document.getElementById('worker-dashboard');
                target?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-5 py-2.5 rounded-xl bg-charcoal-900 hover:bg-black text-white text-xs font-bold transition-all shadow-sm flex items-center gap-2"
            >
              <span>Switch to Worker Pro</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
