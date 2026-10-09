import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  ChevronDown, 
  Briefcase, 
  UserCheck, 
  Volume2, 
  VolumeX, 
  Compass, 
  Sparkles, 
  Navigation,
  Globe,
  Menu,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { POPULAR_LOCATIONS } from '../data/locations';
import { sound } from '../utils/audio';

export const Navbar: React.FC = () => {
  const { 
    role, 
    setRole, 
    language, 
    setLanguage, 
    city, 
    setCity, 
    locality, 
    setLocality,
    openBookingModal,
    activeBooking,
    setLiveTrackingOpen
  } = useApp();

  const [isScrolled, setIsScrolled] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const next = !isMuted;
    setIsMuted(next);
    sound.setMuted(next);
    if (!next) sound.playClick();
  };

  const handleCitySelect = (cName: string, locName: string) => {
    sound.playClick();
    setCity(cName);
    setLocality(locName);
    setShowLocationDropdown(false);
  };

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/90 backdrop-blur-md shadow-soft border-b border-stone-200/70 py-3' 
        : 'bg-[#FAF9F6]/95 backdrop-blur-sm border-b border-stone-200/40 py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Left: Brand Identity & Location */}
          <div className="flex items-center gap-6">
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); sound.playClick(); setRole('customer'); }}
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
                <span className="font-extrabold text-xl tracking-tight">K</span>
                <span className="text-amber-200 font-bold text-sm -ml-0.5">S</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xl tracking-tight text-charcoal-900 font-display">
                    KAAM<span className="text-orange-600">SAATHI</span>
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 uppercase tracking-wider">
                    Bharat
                  </span>
                </div>
                <span className="text-[11px] font-medium text-stone-500 tracking-normal hidden sm:block">
                  {language === 'hi' ? 'हर हुनर को अवसर' : 'Every Skill Deserves an Opportunity'}
                </span>
              </div>
            </a>

            {/* City & Neighborhood Selector */}
            <div className="relative hidden md:block">
              <button
                onClick={() => { sound.playClick(); setShowLocationDropdown(!showLocationDropdown); }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-100 hover:bg-stone-200/70 border border-stone-200/80 text-xs font-semibold text-charcoal-800 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-orange-600" />
                <span className="max-w-[170px] truncate">{locality}, {city}</span>
                <ChevronDown className={`w-3 h-3 text-stone-500 transition-transform ${showLocationDropdown ? 'rotate-180' : ''}`} />
              </button>

              {showLocationDropdown && (
                <div className="absolute left-0 mt-2 w-72 bg-white rounded-2xl shadow-soft-lg border border-stone-200 p-3 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider px-2 pb-2 border-b border-stone-100">
                    Select Your Area in India
                  </div>
                  <div className="max-h-72 overflow-y-auto pt-2 space-y-3">
                    {POPULAR_LOCATIONS.map(c => (
                      <div key={c.city}>
                        <div className="px-2 text-xs font-bold text-stone-800 flex items-center justify-between">
                          <span>{c.city}</span>
                          <span className="text-[10px] font-normal text-stone-400">{c.state}</span>
                        </div>
                        <div className="mt-1 space-y-0.5">
                          {c.localities.map(loc => (
                            <button
                              key={loc}
                              onClick={() => handleCitySelect(c.city, loc)}
                              className={`w-full text-left px-2 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                                locality === loc && city === c.city
                                  ? 'bg-orange-50 text-orange-700 font-semibold'
                                  : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                              }`}
                            >
                              <span>{loc}</span>
                              {locality === loc && city === c.city && (
                                <span className="w-1.5 h-1.5 rounded-full bg-orange-600"></span>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 font-medium text-sm text-stone-600">
            <a 
              href="#services" 
              onClick={() => sound.playClick()}
              className="px-3 py-2 rounded-lg hover:text-stone-900 hover:bg-stone-100/60 transition-colors"
            >
              Services
            </a>
            <a 
              href="#workers" 
              onClick={() => sound.playClick()}
              className="px-3 py-2 rounded-lg hover:text-stone-900 hover:bg-stone-100/60 transition-colors"
            >
              Find a Worker
            </a>
            <a 
              href="#estimator" 
              onClick={() => sound.playClick()}
              className="px-3 py-2 rounded-lg hover:text-stone-900 hover:bg-stone-100/60 transition-colors"
            >
              Fair Price Calculator
            </a>
            <a 
              href="#how-it-works" 
              onClick={() => sound.playClick()}
              className="px-3 py-2 rounded-lg hover:text-stone-900 hover:bg-stone-100/60 transition-colors"
            >
              How It Works
            </a>
            <a 
              href="#dignity" 
              onClick={() => sound.playClick()}
              className="px-3 py-2 rounded-lg hover:text-stone-900 hover:bg-stone-100/60 transition-colors flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Dignity of Work</span>
            </a>
          </nav>

          {/* Right Controls: Role Switcher, Language, Active Ride Badge, Primary CTA */}
          <div className="flex items-center gap-3">
            
            {/* Active Live Booking Pill (if customer has ongoing booking) */}
            {activeBooking && activeBooking.status !== 'completed' && (
              <button
                onClick={() => { sound.playClick(); setLiveTrackingOpen(true); }}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-300 font-semibold text-xs animate-pulse hover:bg-emerald-100 transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
                <span>Live Job: {activeBooking.assignedWorker?.name.split(' ')[0]} en route</span>
              </button>
            )}

            {/* Role Switcher Pill: Customer vs Worker Mode */}
            <div className="bg-stone-100 p-1 rounded-xl flex items-center border border-stone-200/80">
              <button
                onClick={() => setRole('customer')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  role === 'customer'
                    ? 'bg-white text-charcoal-900 shadow-soft-sm'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                <Compass className="w-3.5 h-3.5 text-orange-500" />
                <span>Customer</span>
              </button>

              <button
                onClick={() => setRole('worker')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  role === 'worker'
                    ? 'bg-charcoal-900 text-white shadow-soft-sm'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5 text-amber-400" />
                <span>Worker Pro</span>
              </button>
            </div>

            {/* Language Toggle Dropdown */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => { sound.playClick(); setShowLangDropdown(!showLangDropdown); }}
                className="p-2 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-100 border border-transparent hover:border-stone-200 transition-colors"
                title="Change Language"
              >
                <Globe className="w-4 h-4" />
              </button>

              {showLangDropdown && (
                <div className="absolute right-0 mt-2 w-36 bg-white rounded-xl shadow-soft-lg border border-stone-200 p-1.5 z-50">
                  <button
                    onClick={() => { setLanguage('en'); setShowLangDropdown(false); }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between ${
                      language === 'en' ? 'bg-orange-50 text-orange-700 font-semibold' : 'text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <span>English</span>
                    {language === 'en' && <span className="text-[10px]">✓</span>}
                  </button>
                  <button
                    onClick={() => { setLanguage('hi'); setShowLangDropdown(false); }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between ${
                      language === 'hi' ? 'bg-orange-50 text-orange-700 font-semibold' : 'text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <span>हिंदी (Hindi)</span>
                    {language === 'hi' && <span className="text-[10px]">✓</span>}
                  </button>
                  <button
                    onClick={() => { setLanguage('kn'); setShowLangDropdown(false); }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between ${
                      language === 'kn' ? 'bg-orange-50 text-orange-700 font-semibold' : 'text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <span>ಕನ್ನಡ (Kannada)</span>
                    {language === 'kn' && <span className="text-[10px]">✓</span>}
                  </button>
                </div>
              )}
            </div>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              className="p-2 rounded-xl text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition-colors hidden sm:block"
              title={isMuted ? 'Unmute tactile sound' : 'Mute sound'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Primary Action Button */}
            {role === 'customer' ? (
              <button
                onClick={() => openBookingModal()}
                className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs sm:text-sm font-bold shadow-soft-sm hover:shadow-md transition-all active:scale-95 flex items-center gap-2"
              >
                <span>Book a Worker</span>
                <Navigation className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={() => {
                  sound.playClick();
                  const target = document.getElementById('worker-dashboard');
                  target?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-4 py-2 rounded-xl bg-charcoal-900 hover:bg-black text-white text-xs sm:text-sm font-bold shadow-soft-sm hover:shadow-md transition-all active:scale-95 flex items-center gap-2"
              >
                <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>My Work Hub</span>
              </button>
            )}

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-700 hover:text-black lg:hidden rounded-lg hover:bg-stone-100"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-stone-200 space-y-2 pb-2 animate-in fade-in">
            <div className="flex items-center justify-between py-1 text-xs text-stone-600">
              <span className="font-semibold">Current Location:</span>
              <span className="font-bold text-orange-600">{locality}, {city}</span>
            </div>
            <a 
              href="#services" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-stone-800 hover:bg-stone-100"
            >
              All Services
            </a>
            <a 
              href="#workers" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-stone-800 hover:bg-stone-100"
            >
              Find Nearby Workers
            </a>
            <a 
              href="#estimator" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-stone-800 hover:bg-stone-100"
            >
              Fair Price Calculator
            </a>
            <a 
              href="#dignity" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-stone-800 hover:bg-stone-100"
            >
              Dignity of Work Mission
            </a>
          </div>
        )}

      </div>
    </header>
  );
};
