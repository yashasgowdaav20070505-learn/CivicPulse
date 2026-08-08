import React from 'react';
import { useApp } from '../context/AppContext';
import { INDIAN_STATES, DISTRICTS_BY_STATE } from '../data/mockSchemes';
import { Filter, RefreshCw, CheckCircle2, Building2, MapPin, Layers } from 'lucide-react';

export const FilterBar: React.FC = () => {
  const {
    selectedState,
    setSelectedState,
    selectedDistrict,
    setSelectedDistrict,
    selectedCategory,
    setSelectedCategory,
    syncStatus,
    triggerSchemeSync,
    t,
    schemes
  } = useApp();

  const CATEGORIES = [
    'All',
    'Agriculture',
    'Healthcare',
    'Women & Child',
    'Education',
    'Housing & Urban',
    'Financial Inclusion',
    'Employment & Skilling',
    'Social Security'
  ];

  const districts = selectedState !== 'All States' && DISTRICTS_BY_STATE[selectedState]
    ? DISTRICTS_BY_STATE[selectedState]
    : ['All Districts'];

  const centralCount = schemes.filter(s => s.state_or_central === 'Central').length;
  const stateCount = schemes.filter(s => s.state_or_central !== 'Central').length;

  return (
    <section className="frosted-glass border-b border-[#C9D7D5] py-4 px-4 lg:px-8 shadow-xs">
      <div className="max-w-7xl mx-auto space-y-3">
        
        {/* Top Sync & Filter Header Row */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          
          {/* Location Filters */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* State Selector */}
            <div className="flex items-center gap-1.5 bg-[#F4F8F7] border border-[#C9D7D5] rounded-xl px-3 py-1.5 text-xs text-[#1A2E2B]">
              <Building2 className="w-4 h-4 text-[#3B7E76]" />
              <span className="font-medium text-[#797E89]">{t('stateFilterLabel')}</span>
              <select
                value={selectedState}
                onChange={(e) => {
                  setSelectedState(e.target.value);
                  setSelectedDistrict('All Districts');
                }}
                className="bg-transparent font-semibold text-[#3B7E76] focus:outline-none cursor-pointer"
              >
                {INDIAN_STATES.map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

            {/* District Selector */}
            {selectedState !== 'All States' && (
              <div className="flex items-center gap-1.5 bg-[#F4F8F7] border border-[#C9D7D5] rounded-xl px-3 py-1.5 text-xs text-[#1A2E2B]">
                <MapPin className="w-4 h-4 text-[#83C0AD]" />
                <span className="font-medium text-[#797E89]">{t('districtFilterLabel')}</span>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="bg-transparent font-semibold text-[#3B7E76] focus:outline-none cursor-pointer"
                >
                  {districts.map((dst) => (
                    <option key={dst} value={dst}>{dst}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Scope Stats */}
            <div className="flex items-center gap-2 text-xs text-[#797E89] bg-[#C9D7D5]/20 px-3 py-1.5 rounded-xl border border-[#C9D7D5]/40">
              <span className="font-semibold text-[#1A2E2B]">{schemes.length} Schemes</span>
              <span>({centralCount} Central • {stateCount} State)</span>
            </div>

          </div>

          {/* 24-Hour Automated Scheme Sync Badge */}
          <div className="flex items-center gap-2.5 bg-[#83C0AD]/15 border border-[#83C0AD]/40 text-[#3B7E76] px-3.5 py-1.5 rounded-xl text-xs">
            <CheckCircle2 className="w-4 h-4 text-[#3B7E76] shrink-0" />
            <div className="flex-1 text-[11px] font-medium leading-tight">
              <span className="font-bold text-[#3B7E76]">24h Auto-Sync Engine:</span> Active
              <span className="hidden sm:inline text-[#797E89]"> — Updated automatically from Central & State Portals</span>
            </div>
            <button
              onClick={triggerSchemeSync}
              disabled={syncStatus.isSyncing}
              className="flex items-center gap-1 bg-[#3B7E76] hover:bg-[#2F6861] text-white px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all disabled:opacity-50 shrink-0 cursor-pointer"
              title="Fetch new schemes with Gemini Grounded Search"
            >
              <RefreshCw className={`w-3 h-3 ${syncStatus.isSyncing ? 'animate-spin' : ''}`} />
              <span>{syncStatus.isSyncing ? t('syncing') : t('syncNow')}</span>
            </button>
          </div>

        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
          <div className="flex items-center gap-1 text-xs text-[#797E89] pr-1 border-r border-[#C9D7D5] shrink-0">
            <Layers className="w-3.5 h-3.5 text-[#3B7E76]" />
            <span className="font-medium">Category:</span>
          </div>

          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#3B7E76] text-white shadow-xs'
                    : 'bg-[#F4F8F7] text-[#797E89] hover:bg-[#C9D7D5]/40 hover:text-[#1A2E2B] border border-[#C9D7D5]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
