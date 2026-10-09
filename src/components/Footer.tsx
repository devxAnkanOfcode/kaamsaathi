import React from 'react';
import { 
  Heart, 
  ShieldCheck, 
  Phone, 
  Mail, 
  MapPin, 
  Globe, 
  Award, 
  ArrowUp,
  Briefcase
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { sound } from '../utils/audio';

export const Footer: React.FC = () => {
  const { setRole } = useApp();

  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-charcoal-900 text-stone-300 pt-16 pb-12 border-t border-stone-800 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          
          {/* Brand Col (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center text-white font-extrabold text-xl shadow-md">
                KS
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-tight text-white font-display">
                  KAAM<span className="text-orange-500">SAATHI</span>
                </span>
                <span className="text-[11px] text-amber-300/90 font-medium">
                  The professional network for every worker.
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-400 max-w-sm leading-relaxed">
              Bringing professional identity, verified trust, ratings, and real opportunity to India's skilled trade and informal workforce. Every skill deserves an opportunity.
            </p>

            {/* Trust badge */}
            <div className="pt-2 flex flex-wrap gap-2 text-[11px]">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-800 text-emerald-400 border border-stone-700">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Govt PMKVY & Police Verified</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-800 text-amber-400 border border-stone-700">
                <span>₹2L Worker Insurance</span>
              </span>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Popular Services
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><a href="#services" className="hover:text-white transition-colors">Electrician Services</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Plumbing & Leaks</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">AC & Refrigerator Repair</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Carpentry & Door Locks</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Home Deep Cleaning</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Motorcycle / Car Mechanic</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Wall Waterproofing & Painting</a></li>
            </ul>
          </div>

          {/* Col 3: For Workers */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              For Skilled Workers
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button 
                  onClick={() => {
                    sound.playClick();
                    setRole('worker');
                    const target = document.getElementById('worker-dashboard');
                    target?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white text-left text-orange-400 font-bold transition-colors flex items-center gap-1"
                >
                  <Briefcase className="w-3 h-3" />
                  <span>Join as a Worker Pro</span>
                </button>
              </li>
              <li><a href="#dignity" className="hover:text-white transition-colors">Dignity of Work Charter</a></li>
              <li><a href="#worker-dashboard" className="hover:text-white transition-colors">Skill India Certification Link</a></li>
              <li><a href="#estimator" className="hover:text-white transition-colors">Fair Price Rate Cards</a></li>
              <li><a href="#worker-dashboard" className="hover:text-white transition-colors">Commercial AMC Contracts</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Accident Insurance Policy</a></li>
            </ul>
          </div>

          {/* Col 4: Trust & Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Help & Safety
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li className="flex items-center gap-2 text-white font-bold">
                <Phone className="w-3.5 h-3.5 text-orange-500" />
                <span>1800-KAAM-SAATHI (Toll Free)</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-stone-500" />
                <span>support@kaamsaathi.in</span>
              </li>
              <li className="pt-2 text-stone-400 text-[11px] leading-relaxed">
                Active in Bengaluru, Mumbai, Delhi-NCR, Pune, Hyderabad, and expanding across India.
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <div className="flex items-center gap-2">
            <span>© 2026 KaamSaathi Technologies Pvt. Ltd.</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-stone-400">
              Crafted with dignity for Indian workers <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline" />
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-stone-300">Privacy Policy</a>
            <a href="#" className="hover:text-stone-300">Terms of Service</a>
            <a href="#" className="hover:text-stone-300">Worker Safety Code</a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors"
              title="Scroll to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
