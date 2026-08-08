import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Language } from '../types';
import { Search, Globe, User, Shield, FileText, ChevronDown, Sparkles, RefreshCw, Bell, MapPin, Building2, Check, ExternalLink } from 'lucide-react';
import { NearbyOfficesModal } from './NearbyOfficesModal';

export const Navbar: React.FC = () => {
  const {
    user,
    setIsAuthModalOpen,
    setAuthMode,
    setIsProfileDrawerOpen,
    selectedLanguage,
    setSelectedLanguage,
    searchQuery,
    setSearchQuery,
    t,
    setIsApplicationsModalOpen,
    applications,
    syncStatus,
    schemes,
    setActiveDetailScheme,
    activeTab,
    setActiveTab
  } = useApp();

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(syncStatus?.newInLast24h || 3);
  const [isNearbyOfficesOpen, setIsNearbyOfficesOpen] = useState(false);

  // Newly released schemes in last 24-48 hours
  const newSchemes = schemes.slice(0, 4);

  const LANGUAGES: { code: Language; name: string; native: string }[] = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'hi', name: 'Hindi', native: 'हिंदी' },
    { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
    { code: 'mr', name: 'Marathi', native: 'मराठी' },
    { code: 'bn', name: 'Bengali', native: 'বাংলা' }
  ];

  return (
    <header className="sticky top-0 z-40 frosted-glass border-b border-[#C9D7D5] shadow-xs px-4 lg:px-8 py-3 transition-all relative">
      
      {/* Subtle Glowing Loading Bar when 24h Sync Service is Active */}
      {syncStatus?.isSyncing && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#83C0AD]/30 overflow-hidden">
          <div className="h-full bg-[#3B7E76] animate-pulse w-full bg-gradient-to-r from-[#3B7E76] via-[#83C0AD] to-[#3B7E76] shadow-[0_0_8px_#3B7E76]" />
        </div>
      )}

      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand Logo & Sync Processing Badge */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-[#3B7E76] text-white flex items-center justify-center shadow-md relative">
            <Shield className="w-6 h-6 text-[#F4F8F7]" />
            {syncStatus?.isSyncing && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#83C0AD] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#3B7E76] border border-white"></span>
              </span>
            )}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-xl font-bold tracking-tight text-[#3B7E76] font-serif">CivicPulse</h1>
              <span className="text-[10px] font-semibold uppercase tracking-wider bg-[#83C0AD]/20 text-[#3B7E76] px-2 py-0.5 rounded-full border border-[#83C0AD]/40 flex items-center gap-1">
                {syncStatus?.isSyncing ? (
                  <>
                    <RefreshCw className="w-2.5 h-2.5 animate-spin text-[#3B7E76]" />
                    <span>24h Syncing...</span>
                  </>
                ) : (
                  <span>Gov Services</span>
                )}
              </span>
            </div>
            <p className="text-xs text-[#797E89] hidden sm:block">Intelligent Citizen Scheme Discovery</p>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="flex-1 max-w-md mx-2 sm:mx-4">
          <div className="relative">
            <Search className="w-4 h-4 text-[#797E89] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full bg-[#F4F8F7] text-sm text-[#1A2E2B] placeholder-[#797E89] pl-9 pr-4 py-2 rounded-xl border border-[#C9D7D5] focus:outline-none focus:border-[#3B7E76] focus:ring-1 focus:ring-[#3B7E76] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#797E89] hover:text-[#3B7E76]"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Right Section: Nearby Offices, Notifications, Language Switcher & Profile/Auth */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Nearby Offices Button */}
          <button
            onClick={() => {
              setActiveTab('offices');
            }}
            className={`hidden sm:flex items-center gap-1.5 font-semibold text-xs px-3 py-2 rounded-xl transition-all cursor-pointer border ${
              activeTab === 'offices'
                ? 'bg-[#3B7E76] text-white border-[#3B7E76] shadow-xs'
                : 'bg-[#F4F8F7] hover:bg-[#C9D7D5]/40 border-[#C9D7D5] text-[#3B7E76]'
            }`}
            title="Locate nearby District Collectorates, Tehsildars, and Gram Panchayats"
          >
            <Building2 className="w-4 h-4" />
            <span>Offices</span>
          </button>

          {/* Applications Quick Link */}
          {user && applications.length > 0 && (
            <button
              onClick={() => setIsApplicationsModalOpen(true)}
              className="hidden lg:flex items-center gap-1.5 text-xs font-medium text-[#3B7E76] bg-[#C9D7D5]/40 hover:bg-[#C9D7D5] px-3 py-2 rounded-lg transition-colors border border-[#C9D7D5]"
              title="Track submitted scheme applications"
            >
              <FileText className="w-4 h-4" />
              <span>Applications</span>
              <span className="bg-[#3B7E76] text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                {applications.length}
              </span>
            </button>
          )}

          {/* Notification Bell Icon (Top Right) */}
          <div className="relative">
            <button
              onClick={() => {
                setIsNotificationsOpen(!isNotificationsOpen);
                if (unreadCount > 0) setUnreadCount(0);
              }}
              className="relative p-2 bg-[#F4F8F7] hover:bg-[#C9D7D5]/40 border border-[#C9D7D5] text-[#3B7E76] rounded-xl transition-all cursor-pointer"
              title="Newly Released Government Schemes Notifications"
            >
              <Bell className="w-4 h-4 text-[#3B7E76]" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#3B7E76] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white shadow-xs animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Bell Slide-Down Menu */}
            {isNotificationsOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white border border-[#C9D7D5] rounded-2xl shadow-xl z-50 overflow-hidden text-xs">
                <div className="bg-[#3B7E76] text-white p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#83C0AD]" />
                    <span className="font-bold font-serif">Newly Released Schemes (Last 24-48h)</span>
                  </div>
                  <button
                    onClick={() => setIsNotificationsOpen(false)}
                    className="text-white/80 hover:text-white text-[10px] font-semibold bg-white/10 px-2 py-0.5 rounded-md cursor-pointer"
                  >
                    Close
                  </button>
                </div>

                <div className="divide-y divide-[#F4F8F7] max-h-80 overflow-y-auto">
                  {newSchemes.map((scheme) => (
                    <div
                      key={scheme.id}
                      onClick={() => {
                        setActiveDetailScheme(scheme);
                        setIsNotificationsOpen(false);
                      }}
                      className="p-3 hover:bg-[#F4F8F7] cursor-pointer transition-colors space-y-1"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-bold text-[#3B7E76] bg-[#83C0AD]/20 px-2 py-0.5 rounded-md">
                          NEW • {scheme.state_or_central}
                        </span>
                        <span className="text-[10px] text-[#797E89]">24h Grounded Sync</span>
                      </div>
                      <h5 className="font-bold text-[#1A2E2B] font-serif leading-tight">
                        {scheme.title}
                      </h5>
                      <p className="text-[11px] text-[#797E89] line-clamp-2">
                        {scheme.description}
                      </p>
                      <div className="text-[10px] font-semibold text-[#3B7E76] flex items-center gap-1 pt-0.5">
                        <span>Click to view details & check eligibility</span>
                        <ExternalLink className="w-3 h-3" />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-[#F4F8F7] p-2.5 text-center text-[11px] text-[#797E89] border-t border-[#C9D7D5] flex items-center justify-between px-3">
                  <span>Automated 24h Portal Sync</span>
                  <button
                    onClick={() => {
                      setIsNotificationsOpen(false);
                    }}
                    className="font-bold text-[#3B7E76] hover:underline cursor-pointer"
                  >
                    Mark all read
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Language Switcher Dropdown (Top Right beside Profile) */}
          <div className="relative flex items-center">
            <div className="flex items-center gap-1.5 bg-[#F4F8F7] hover:bg-[#C9D7D5]/40 border border-[#C9D7D5] text-[#1A2E2B] text-xs font-medium px-3 py-2 rounded-xl transition-colors relative cursor-pointer">
              <Globe className="w-4 h-4 text-[#3B7E76] shrink-0" />
              <span className="font-bold text-[#3B7E76]">
                {LANGUAGES.find(l => l.code === selectedLanguage)?.native || 'English'}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-[#797E89] shrink-0" />

              {/* Native select overlay for 100% reliable tap/click on mobile and desktop */}
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value as Language)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer text-xs z-10"
                aria-label="Select Language"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.native} ({lang.name})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Profile Section or Login/Register */}
          {user ? (
            <button
              onClick={() => setIsProfileDrawerOpen(true)}
              className="flex items-center gap-2.5 bg-[#F4F8F7] hover:bg-[#C9D7D5]/40 border border-[#C9D7D5] p-1.5 sm:px-3 sm:py-1.5 rounded-xl transition-all cursor-pointer group"
              title="Open Profile & Family Management"
            >
              {user.photoUrl ? (
                <img
                  src={user.photoUrl}
                  alt={user.fullName}
                  className="w-8 h-8 rounded-full object-cover border border-[#83C0AD] shadow-sm"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-[#3B7E76] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                  {user.fullName.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="text-left hidden sm:block">
                <div className="text-xs font-semibold text-[#1A2E2B] group-hover:text-[#3B7E76] transition-colors leading-tight">
                  {user.fullName}
                </div>
                <div className="text-[10px] text-[#797E89] leading-tight">
                  {user.state} • Profile
                </div>
              </div>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => { setAuthMode('login'); setIsAuthModalOpen(true); }}
                className="text-xs font-semibold text-[#3B7E76] hover:text-[#1A2E2B] px-3 py-2 rounded-xl border border-transparent hover:border-[#C9D7D5] transition-all"
              >
                {t('login')}
              </button>
              <button
                onClick={() => { setAuthMode('register'); setIsAuthModalOpen(true); }}
                className="text-xs font-semibold bg-[#3B7E76] hover:bg-[#2F6861] text-white px-4 py-2 rounded-xl shadow-sm transition-all"
              >
                {t('register')}
              </button>
            </div>
          )}

        </div>

      </div>

      {/* Nearby Government Office Locator Modal */}
      <NearbyOfficesModal
        isOpen={isNearbyOfficesOpen}
        onClose={() => setIsNearbyOfficesOpen(false)}
      />
    </header>
  );
};
