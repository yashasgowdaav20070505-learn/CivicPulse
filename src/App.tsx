import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { TopUtilityBar } from './components/TopUtilityBar';
import { Navbar } from './components/Navbar';
import { FilterBar } from './components/FilterBar';
import { SchemeCard } from './components/SchemeCard';
import { NearbyOfficesSection } from './components/NearbyOfficesSection';
import { SchemeDetailModal } from './components/SchemeDetailModal';
import { ApplyGuidanceModal } from './components/ApplyGuidanceModal';
import { ReportProblemModal } from './components/ReportProblemModal';
import { AuthModal } from './components/AuthModal';
import { ProfileDrawer } from './components/ProfileDrawer';
import { AIAssistantWidget } from './components/AIAssistantWidget';
import { ApplicationsTrackerModal } from './components/ApplicationsTrackerModal';
import { Sparkles, Shield, AlertCircle, Building2, Layers, FileText, CheckCircle } from 'lucide-react';

const MainDashboard: React.FC = () => {
  const {
    schemes,
    user,
    t,
    activeTab,
    setActiveTab,
    applications,
    setIsApplicationsModalOpen
  } = useApp();

  return (
    <div className="min-h-screen bg-[#F4F8F7] flex flex-col font-sans text-[#1A2E2B]">
      
      {/* Top Utility & Accessibility Bar */}
      <TopUtilityBar />

      {/* Top Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6 space-y-6">
        
        {/* Banner / Welcome Row */}
        <div className="bg-gradient-to-r from-[#3B7E76] to-[#2F6861] text-white rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-1.5 bg-[#83C0AD]/25 text-[#F4F8F7] px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-xs border border-[#83C0AD]/30">
              <Sparkles className="w-3.5 h-3.5 text-[#83C0AD]" />
              <span>AI-Powered Citizen Scheme & Office Discovery</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold font-serif leading-tight">
              Discover Government Schemes & Nearby Offices for You & Your Family
            </h2>

            <p className="text-xs sm:text-sm text-[#C9D7D5] leading-relaxed">
              Explore 100+ active Central and State government welfare initiatives, locate nearby Tehsildar & Gram Panchayat offices, check eligibility, or speak with our AI Voice Guide.
            </p>

            {user && (
              <div className="pt-2 text-xs flex flex-wrap items-center gap-3 text-white/90">
                <span className="bg-white/10 px-3 py-1 rounded-lg border border-white/20">
                  📍 {user.state} ({user.district})
                </span>
                <span className="bg-white/10 px-3 py-1 rounded-lg border border-white/20">
                  💰 Income: ₹{user.income.toLocaleString('en-IN')}
                </span>
                <span className="bg-white/10 px-3 py-1 rounded-lg border border-white/20">
                  👨‍👩‍👧 Family: {user.maritalStatus}
                </span>
              </div>
            )}
          </div>

          {/* Decorative Background Circles */}
          <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-white/5 rounded-l-full pointer-events-none transform translate-x-12" />
        </div>

        {/* Dashboard Main View Tabs */}
        <div className="bg-white border border-[#C9D7D5] rounded-2xl p-2 flex flex-wrap items-center justify-between gap-2 shadow-xs">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
            
            {/* Tab 1: Schemes Discovery */}
            <button
              onClick={() => setActiveTab('schemes')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'schemes'
                  ? 'bg-[#3B7E76] text-white shadow-xs'
                  : 'bg-[#F4F8F7] hover:bg-[#C9D7D5]/40 text-[#797E89] hover:text-[#1A2E2B]'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>{t('allSchemes')}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                activeTab === 'schemes' ? 'bg-white/20 text-white' : 'bg-[#C9D7D5]/40 text-[#3B7E76]'
              }`}>
                {schemes.length}
              </span>
            </button>

            {/* Tab 2: Nearby Government Offices */}
            <button
              onClick={() => setActiveTab('offices')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'offices'
                  ? 'bg-[#3B7E76] text-white shadow-xs'
                  : 'bg-[#F4F8F7] hover:bg-[#C9D7D5]/40 text-[#797E89] hover:text-[#1A2E2B]'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Nearby Government Offices</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                activeTab === 'offices' ? 'bg-white/20 text-white' : 'bg-[#C9D7D5]/40 text-[#3B7E76]'
              }`}>
                Collectorate • Tehsildar • Panchayat
              </span>
            </button>

            {/* Tab 3: Applications Tracker */}
            {user && (
              <button
                onClick={() => {
                  setActiveTab('applications');
                  setIsApplicationsModalOpen(true);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'applications'
                    ? 'bg-[#3B7E76] text-white shadow-xs'
                    : 'bg-[#F4F8F7] hover:bg-[#C9D7D5]/40 text-[#797E89] hover:text-[#1A2E2B]'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Track Applications</span>
                {applications.length > 0 && (
                  <span className="text-[10px] bg-[#83C0AD] text-[#1A2E2B] px-2 py-0.5 rounded-full font-bold">
                    {applications.length}
                  </span>
                )}
              </button>
            )}

          </div>

          <div className="text-xs text-[#797E89] px-2 hidden lg:block">
            📍 Active Region: <strong className="text-[#3B7E76]">{user?.state || 'Karnataka'}</strong>
          </div>
        </div>

        {/* View 1: Schemes Discovery */}
        {activeTab === 'schemes' && (
          <div className="space-y-6">
            {/* Filter & Location Bar */}
            <FilterBar />

            {/* Schemes Grid Header */}
            <div className="flex items-center justify-between border-b border-[#C9D7D5] pb-3">
              <div>
                <h3 className="text-lg font-bold text-[#1A2E2B] font-serif flex items-center gap-2">
                  <span>Government Schemes Grid</span>
                  <span className="text-xs font-sans font-normal text-[#797E89]">
                    ({schemes.length} matching found)
                  </span>
                </h3>
                <p className="text-xs text-[#797E89]">
                  Showing Central and State government schemes based on active location and category filters
                </p>
              </div>
            </div>

            {/* Schemes Cards Grid */}
            {schemes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {schemes.map((scheme) => (
                  <SchemeCard key={scheme.id} scheme={scheme} />
                ))}
              </div>
            ) : (
              <div className="bg-white border border-[#C9D7D5] rounded-3xl p-12 text-center space-y-3 max-w-md mx-auto my-8 shadow-xs">
                <AlertCircle className="w-10 h-10 text-[#797E89] mx-auto" />
                <h4 className="text-base font-bold text-[#1A2E2B] font-serif">No Schemes Found</h4>
                <p className="text-xs text-[#797E89]">
                  No government schemes matched your selected location or search keywords. Try changing the state/district or category filter.
                </p>
              </div>
            )}
          </div>
        )}

        {/* View 2: Embedded Nearby Government Offices Section */}
        {activeTab === 'offices' && (
          <NearbyOfficesSection />
        )}

        {/* View 3: Applications Tracker View */}
        {activeTab === 'applications' && (
          <div className="bg-white border border-[#C9D7D5] rounded-3xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#F4F8F7] pb-3">
              <div>
                <h3 className="text-lg font-bold text-[#1A2E2B] font-serif flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#3B7E76]" />
                  <span>My Submitted Scheme Applications</span>
                </h3>
                <p className="text-xs text-[#797E89]">
                  Track application reference numbers, status updates, and nodal officer reviews
                </p>
              </div>
            </div>

            {applications.length > 0 ? (
              <div className="space-y-3">
                {applications.map((app) => (
                  <div key={app.id} className="bg-[#F4F8F7] border border-[#C9D7D5] rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#3B7E76]">{app.applicationRef}</span>
                        <span className="text-[10px] bg-[#83C0AD]/20 text-[#3B7E76] px-2 py-0.5 rounded-md font-semibold">
                          {app.status}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-[#1A2E2B] font-serif mt-1">{app.schemeTitle}</h4>
                      <p className="text-xs text-[#797E89]">{app.notes}</p>
                    </div>
                    <div className="text-xs text-[#797E89] text-right">
                      Applied on: {new Date(app.appliedAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-xs text-[#797E89] space-y-2">
                <CheckCircle className="w-8 h-8 text-[#83C0AD] mx-auto" />
                <p>No applications submitted yet. Browse schemes and click "Apply" to begin.</p>
              </div>
            )}
          </div>
        )}

      </main>

      {/* Modals & Slide-over Drawers */}
      <SchemeDetailModal />
      <ApplyGuidanceModal />
      <ReportProblemModal />
      <AuthModal />
      <ProfileDrawer />
      <ApplicationsTrackerModal />

      {/* Floating Bottom-Right Dual Mode AI Assistant */}
      <AIAssistantWidget />

      {/* Footer */}
      <footer className="bg-[#FFFFFF] border-t border-[#C9D7D5] py-6 px-4 text-center text-xs text-[#797E89] mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#3B7E76]" />
            <span className="font-bold text-[#3B7E76] font-serif">CivicPulse</span>
            <span>— Intelligent Citizen Services & Scheme Discovery Platform</span>
          </div>
          <div>
            24h Grounded Search Sync • Central & State Government Portals • Multilingual Assistance
          </div>
        </div>
      </footer>

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainDashboard />
    </AppProvider>
  );
}
