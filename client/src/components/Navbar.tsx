import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, Home, Tv, Calendar, Trophy, BarChart3, Info, ChevronDown, Play, Shield, HelpCircle, Mail, FileText, Users, Globe, VideoIcon } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
  const [isEngageDropdownOpen, setIsEngageDropdownOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [location] = useLocation();
  const { language, setLanguage, t } = useLanguage();
  
  const isActive = (path: string) => location === path;
  
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  ];
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  return (
    <nav className="bg-sport-card border-b border-sport-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:flex md:justify-between mobile-header">
          {/* Mobile menu button - Left side */}
          <div className="md:hidden mobile-menu-left">
            <button onClick={toggleMobileMenu} className="text-sport-text-light hover:text-sport-text focus:outline-none focus:text-sport-primary" title="Open Menu">
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Desktop Navigation - All in one row: Logo → Menu → Language */}
          <div className="hidden md:flex md:items-center md:w-full">
            {/* Logo - First */}
            <div className="flex-shrink-0 mr-8">
              <Link to="/" className="flex items-center" title="KikaSports - Live Football Streaming">
                <img 
                  src="/logo.png" 
                  alt="KikaSports Logo" 
                  className="h-8 w-auto sm:h-9 md:h-10 lg:h-12 xl:h-14 object-contain transition-all duration-200"
                  style={{ 
                    maxWidth: '130px',
                    minHeight: '32px'
                  }}
                  onError={(e) => {
                    // Fallback to text if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const textFallback = target.nextElementSibling as HTMLElement;
                    if (textFallback) textFallback.style.display = 'block';
                  }}
                />
                {/* Text fallback (hidden by default, shown if image fails) */}
                <span 
                  className="text-xl font-bold text-sport-text hidden"
                  style={{ display: 'none' }}
                >
                  KikaSports
                </span>
              </Link>
            </div>

            {/* Menu Items - Second */}
            <div className="flex items-center space-x-4 flex-1">
              <Link to="/" className={`nav-link flex items-center gap-2 ${isActive("/") ? "active" : ""}`} title={t('liveFootball')}>
                <Home className="w-4 h-4" />
                {t('home')}
              </Link>
              
              <Link to="/live" className={`nav-link flex items-center gap-2 ${isActive("/live") ? "active" : ""}`} title="Live Football Matches">
                <Tv className="w-4 h-4" />
                {t('liveMatches')}
              </Link>
              
              <Link to="/live-score" className={`nav-link flex items-center gap-2 ${isActive("/live-score") ? "active" : ""}`} title="Live Football Scores">
                <BarChart3 className="w-4 h-4" />
                {t('liveScores')}
              </Link>
              
              <Link to="/schedule" className={`nav-link flex items-center gap-2 ${isActive("/schedule") ? "active" : ""}`} title="Football Match Schedule">
                <Calendar className="w-4 h-4" />
                {t('schedule')}
              </Link>
              
              <Link to="#" className={`nav-link flex items-center gap-2 ${isActive("#") ? "active" : ""}`} title="">
                <VideoIcon className="w-4 h-4" />
                {t('Highlights')}
              </Link>

              {/* More Dropdown */}
              <div className="relative">
                <button onClick={() => setIsMoreDropdownOpen(!isMoreDropdownOpen)} className="nav-link flex items-center gap-1" title="More Streaming Options">
                  <Play className="w-4 h-4" />
                  {t('moreStreams')}
                  <ChevronDown className="w-3 h-3" />
                </button>


               
                
                {isMoreDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-sport-card border border-sport-border rounded-lg shadow-lg py-1 z-50">
                    <Link to="/totalsportek" className="block px-4 py-2 text-sm text-sport-text hover:bg-sport-surface" onClick={() => setIsMoreDropdownOpen(false)} title="TotalSportek">
                      <div className="flex items-center gap-2">
                        <Tv className="w-4 h-4" />
                        TotalSportek
                      </div>
                    </Link>
                    <Link to="/hesgoal" className="block px-4 py-2 text-sm text-sport-text hover:bg-sport-surface" onClick={() => setIsMoreDropdownOpen(false)} title="Hesgoal">
                      <div className="flex items-center gap-2">
                        <Play className="w-4 h-4" />
                        Hesgoal
                      </div>
                    </Link>
                    <Link to="/streameast" className="block px-4 py-2 text-sm text-sport-text hover:bg-sport-surface" onClick={() => setIsMoreDropdownOpen(false)} title="StreamEast">
                      <div className="flex items-center gap-2">
                        <Tv className="w-4 h-4" />
                        StreamEast
                      </div>
                    </Link>
                    <Link to="/kora-live" className="block px-4 py-2 text-sm text-sport-text hover:bg-sport-surface" onClick={() => setIsMoreDropdownOpen(false)} title="Kora Live">
                      <div className="flex items-center gap-2">
                        <Play className="w-4 h-4" />
                        Kora Live
                      </div>
                    </Link>
                    <Link to="/yalla-shoot" className="block px-4 py-2 text-sm text-sport-text hover:bg-sport-surface" onClick={() => setIsMoreDropdownOpen(false)} title="Yalla Shoot">
                      <div className="flex items-center gap-2">
                        <Tv className="w-4 h-4" />
                        Yalla Shoot
                      </div>
                    </Link>
                    <Link to="/score808" className="block px-4 py-2 text-sm text-sport-text hover:bg-sport-surface" onClick={() => setIsMoreDropdownOpen(false)} title="Score808">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="w-4 h-4" />
                        Score808
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              {/* Engage Dropdown */}
              <div className="relative">
                <button onClick={() => setIsEngageDropdownOpen(!isEngageDropdownOpen)} className="nav-link flex items-center gap-1" title="More Information">
                  <Users className="w-4 h-4" />
                  {t('moreInfo')}
                  <ChevronDown className="w-3 h-3" />
                </button>
                
                {isEngageDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-sport-card border border-sport-border rounded-lg shadow-lg py-1 z-50">
                    <Link to="/about" className="block px-4 py-2 text-sm text-sport-text hover:bg-sport-surface" onClick={() => setIsEngageDropdownOpen(false)} title={t('aboutUs')}>
                      <div className="flex items-center gap-2">
                        <Info className="w-4 h-4" />
                        {t('aboutUs')}
                      </div>
                    </Link>
                    <Link to="/privacy-policy" className="block px-4 py-2 text-sm text-sport-text hover:bg-sport-surface" onClick={() => setIsEngageDropdownOpen(false)} title={t('privacyPolicy')}>
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        {t('privacyPolicy')}
                      </div>
                    </Link>
                    <Link to="/disclaimer" className="block px-4 py-2 text-sm text-sport-text hover:bg-sport-surface" onClick={() => setIsEngageDropdownOpen(false)} title={t('disclaimer')}>
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        {t('disclaimer')}
                      </div>
                    </Link>
                    <Link to="/faq" className="block px-4 py-2 text-sm text-sport-text hover:bg-sport-surface" onClick={() => setIsEngageDropdownOpen(false)} title={t('faq')}>
                      <div className="flex items-center gap-2">
                        <HelpCircle className="w-4 h-4" />
                        {t('faq')}
                      </div>
                    </Link>
                    <Link to="/contact-us" className="block px-4 py-2 text-sm text-sport-text hover:bg-sport-surface" onClick={() => setIsEngageDropdownOpen(false)} title={t('contactUs')}>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        {t('contactUs')}
                      </div>
                    </Link>
                    <Link to="/terms-of-service" className="block px-4 py-2 text-sm text-sport-text hover:bg-sport-surface" onClick={() => setIsEngageDropdownOpen(false)} title={t('termsOfService')}>
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        {t('termsOfService')}
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Language Dropdown - Third */}
            <div className="flex-shrink-0 ml-4">
              <div className="relative">
                <button onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)} className="nav-link flex items-center gap-1" title="Change Language">
                  <Globe className="w-4 h-4" />
                  {languages.find(lang => lang.code === language)?.flag}
                  <ChevronDown className="w-3 h-3" />
                </button>
                
                {isLanguageDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-sport-card border border-sport-border rounded-lg shadow-lg py-1 z-50">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setIsLanguageDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-sport-surface flex items-center gap-2 ${
                          language === lang.code ? 'bg-sport-surface text-sport-primary' : 'text-sport-text'
                        }`}
                      >
                        <span className="text-lg">{lang.flag}</span>
                        {lang.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Logo - Center on mobile only */}
          <div className="md:hidden logo-center">
            <Link to="/" className="flex items-center" title="KikaSports - Live Football Streaming">
              <img 
                src="/logo.png" 
                alt="KikaSports Logo" 
                className="h-8 w-auto sm:h-9 object-contain transition-all duration-200"
                style={{ 
                  maxWidth: '130px',
                  minHeight: '32px'
                }}
                onError={(e) => {
                  // Fallback to text if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const textFallback = target.nextElementSibling as HTMLElement;
                  if (textFallback) textFallback.style.display = 'block';
                }}
              />
              {/* Text fallback (hidden by default, shown if image fails) */}
              <span 
                className="text-xl font-bold text-sport-text hidden"
                style={{ display: 'none' }}
              >
                KikaSports
              </span>
            </Link>
          </div>

          {/* Mobile language selector - Right side */}
          <div className="md:hidden mobile-lang-right">
            <div className="relative">
              <button onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)} className="nav-link flex items-center gap-1 p-2" title="Change Language">
                <Globe className="w-5 h-5" />
                <span className="text-lg">{languages.find(lang => lang.code === language)?.flag}</span>
              </button>
              
              {isLanguageDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-sport-card border border-sport-border rounded-lg shadow-lg py-1 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsLanguageDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-sport-surface flex items-center gap-2 ${
                        language === lang.code ? 'bg-sport-surface text-sport-primary' : 'text-sport-text'
                      }`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-sport-card border-t border-sport-border">
            <Link to="/" className={`mobile-nav-link flex items-center gap-2 ${isActive("/") ? "active" : ""}`} onClick={() => setIsMobileMenuOpen(false)} title={t('liveFootball')}>
              <Home className="w-4 h-4" />
              {t('home')}
            </Link>
            
            <Link to="/live" className={`mobile-nav-link flex items-center gap-2 ${isActive("/live") ? "active" : ""}`} onClick={() => setIsMobileMenuOpen(false)} title="Live Football Matches">
              <Tv className="w-4 h-4" />
              {t('liveMatches')}
            </Link>
            
            <Link to="/live-score" className={`mobile-nav-link flex items-center gap-2 ${isActive("/live-score") ? "active" : ""}`} onClick={() => setIsMobileMenuOpen(false)} title="Live Football Scores">
              <BarChart3 className="w-4 h-4" />
              {t('liveScores')}
            </Link>
            
            <Link to="/schedule" className={`mobile-nav-link flex items-center gap-2 ${isActive("/schedule") ? "active" : ""}`} onClick={() => setIsMobileMenuOpen(false)} title="Football Match Schedule">
              <Calendar className="w-4 h-4" />
              {t('schedule')}
            </Link>
            
            <Link to="/competitions" className={`mobile-nav-link flex items-center gap-2 ${isActive("/competitions") ? "active" : ""}`} onClick={() => setIsMobileMenuOpen(false)} title="Football Competitions">
              <Trophy className="w-4 h-4" />
              {t('competitions')}
            </Link>
            
            <Link to="/about" className={`mobile-nav-link flex items-center gap-2 ${isActive("/about") ? "active" : ""}`} onClick={() => setIsMobileMenuOpen(false)} title={t('aboutUs')}>
              <Info className="w-4 h-4" />
              {t('aboutUs')}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;