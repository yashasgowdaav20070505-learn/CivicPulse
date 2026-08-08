import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { INDIAN_STATES, DISTRICTS_BY_STATE } from '../data/mockSchemes';
import { getOfficesForDistrict, DistrictOffice } from '../utils/officeDirectory';
import { MapPin, Phone, Clock, User, ExternalLink, Navigation, Building2, Search, ListFilter, Map, Filter, CheckCircle2 } from 'lucide-react';

export const NearbyOfficesSection: React.FC = () => {
  const { user, selectedState, setSelectedState, selectedDistrict, setSelectedDistrict } = useApp();
  const [localState, setLocalState] = useState<string>(selectedState || user?.state || 'Karnataka');
  const [localDistrict, setLocalDistrict] = useState<string>(selectedDistrict || user?.district || 'Bengaluru Urban');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLetter, setSelectedLetter] = useState<string>('ALL');
  const [viewMode, setViewMode] = useState<'cards' | 'districtTable'>('cards');

  const rawDistricts = DISTRICTS_BY_STATE[localState] || ['All Districts'];
  // Sorted list excluding 'All Districts'
  const actualDistrictsOnly = rawDistricts
    .filter(d => d !== 'All Districts')
    .sort((a, b) => a.localeCompare(b));

  const totalDistrictsCount = actualDistrictsOnly.length;

  // Available letters in actual districts list
  const availableLetters = Array.from(
    new Set(actualDistrictsOnly.map(d => d.charAt(0).toUpperCase()))
  ).sort();

  // Dynamically fetch offices for selected state & district
  const allOfficesForSelection = getOfficesForDistrict(localState, localDistrict);

  const filteredOffices = allOfficesForSelection.filter((off) => {
    const distMatchesLetter = selectedLetter === 'ALL' || off.district.toUpperCase().startsWith(selectedLetter);
    const matchesSearch = !searchQuery || 
      off.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      off.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      off.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      off.address.toLowerCase().includes(searchQuery.toLowerCase());
    
    return distMatchesLetter && matchesSearch;
  });

  // Group offices by district for the directory list view
  const officesByDistrict = filteredOffices.reduce<Record<string, DistrictOffice[]>>((acc, off) => {
    if (!acc[off.district]) {
      acc[off.district] = [];
    }
    acc[off.district].push(off);
    return acc;
  }, {});

  const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div className="space-y-6">
      
      {/* Title & Filter Header Card */}
      <div className="bg-white border border-[#C9D7D5] rounded-3xl p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F4F8F7] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#3B7E76]/10 flex items-center justify-center text-[#3B7E76] shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-serif text-[#1A2E2B] flex items-center gap-2">
                <span>District Government Offices & Administrative Directory</span>
                <span className="text-xs bg-[#3B7E76] text-white px-2.5 py-0.5 rounded-full font-sans font-semibold">
                  {totalDistrictsCount} Districts Listed
                </span>
              </h3>
              <p className="text-xs text-[#797E89]">
                Locate District Collectorates, Magistrates, Tehsildars, Jan Seva Kendras & Krishi Bhavans across all Indian districts
              </p>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setViewMode('cards')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold cursor-pointer border transition-all ${
                viewMode === 'cards'
                  ? 'bg-[#3B7E76] text-white border-[#3B7E76] shadow-xs'
                  : 'bg-[#F4F8F7] text-[#797E89] border-[#C9D7D5] hover:text-[#1A2E2B]'
              }`}
            >
              <Map className="w-3.5 h-3.5" />
              <span>Cards View</span>
            </button>
            <button
              onClick={() => setViewMode('districtTable')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold cursor-pointer border transition-all ${
                viewMode === 'districtTable'
                  ? 'bg-[#3B7E76] text-white border-[#3B7E76] shadow-xs'
                  : 'bg-[#F4F8F7] text-[#797E89] border-[#C9D7D5] hover:text-[#1A2E2B]'
              }`}
            >
              <ListFilter className="w-3.5 h-3.5" />
              <span>All Districts List ({totalDistrictsCount})</span>
            </button>
          </div>
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          {/* State Selector */}
          <div>
            <label className="text-[11px] font-bold text-[#797E89] uppercase tracking-wider block mb-1">State / Union Territory</label>
            <select
              value={localState}
              onChange={(e) => {
                setLocalState(e.target.value);
                setLocalDistrict('All Districts');
                setSelectedState(e.target.value);
                setSelectedLetter('ALL');
              }}
              className="w-full bg-[#F4F8F7] border border-[#C9D7D5] rounded-xl px-3 py-2.5 text-xs font-semibold text-[#1A2E2B] focus:outline-none focus:border-[#3B7E76]"
            >
              {INDIAN_STATES.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          {/* District Selector */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-bold text-[#797E89] uppercase tracking-wider block">District / City</label>
              <span className="text-[10px] text-[#3B7E76] font-bold">{totalDistrictsCount} Available</span>
            </div>
            <select
              value={localDistrict}
              onChange={(e) => {
                setLocalDistrict(e.target.value);
                setSelectedDistrict(e.target.value);
              }}
              className="w-full bg-[#F4F8F7] border border-[#C9D7D5] rounded-xl px-3 py-2.5 text-xs font-semibold text-[#1A2E2B] focus:outline-none focus:border-[#3B7E76]"
            >
              <option value="All Districts">All Districts in {localState} ({totalDistrictsCount})</option>
              {actualDistrictsOnly.map((dst) => (
                <option key={dst} value={dst}>{dst}</option>
              ))}
            </select>
          </div>

          {/* Search Keyword */}
          <div>
            <label className="text-[11px] font-bold text-[#797E89] uppercase tracking-wider block mb-1">Search District or Office Name</label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#797E89] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g. Pune, Mysuru, Patna, Collectorate, Tehsildar..."
                className="w-full bg-[#F4F8F7] border border-[#C9D7D5] rounded-xl pl-8 pr-3 py-2.5 text-xs text-[#1A2E2B] focus:outline-none focus:border-[#3B7E76]"
              />
            </div>
          </div>

        </div>

        {/* A-Z Alphabetical Quick Jumper */}
        <div className="pt-2 border-t border-[#F4F8F7]">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[11px] font-bold text-[#797E89] uppercase tracking-wider flex items-center gap-1">
              <Filter className="w-3 h-3 text-[#3B7E76]" />
              Alphabetical Jumper (Filter Districts by Initial):
            </span>
            {selectedLetter !== 'ALL' && (
              <button
                onClick={() => setSelectedLetter('ALL')}
                className="text-[11px] text-[#3B7E76] font-bold hover:underline cursor-pointer"
              >
                Clear Letter Filter
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-1">
            <button
              onClick={() => setSelectedLetter('ALL')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedLetter === 'ALL'
                  ? 'bg-[#3B7E76] text-white shadow-xs'
                  : 'bg-[#F4F8F7] text-[#797E89] hover:bg-[#C9D7D5]/40 hover:text-[#1A2E2B]'
              }`}
            >
              ALL ({totalDistrictsCount})
            </button>

            {ALPHABET.map((char) => {
              const hasDistricts = availableLetters.includes(char);
              return (
                <button
                  key={char}
                  disabled={!hasDistricts}
                  onClick={() => setSelectedLetter(char)}
                  className={`w-7 h-7 rounded-lg text-xs font-bold transition-all flex items-center justify-center cursor-pointer ${
                    selectedLetter === char
                      ? 'bg-[#3B7E76] text-white shadow-xs'
                      : hasDistricts
                      ? 'bg-[#F4F8F7] text-[#1A2E2B] hover:bg-[#C9D7D5]/60'
                      : 'bg-[#F4F8F7]/50 text-gray-300 cursor-not-allowed'
                  }`}
                >
                  {char}
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Summary Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#797E89] px-1">
        <span>
          Showing <strong>{filteredOffices.length}</strong> official centers across <strong>{localDistrict === 'All Districts' ? `all ${totalDistrictsCount} districts of ${localState}` : `${localDistrict}, ${localState}`}</strong>
          {selectedLetter !== 'ALL' && <span> (Filtered by Letter <strong>'{selectedLetter}'</strong>)</span>}
        </span>
        <span className="text-[#3B7E76] font-semibold flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#3B7E76]" />
          Official Central & State Administrative Directory
        </span>
      </div>

      {viewMode === 'cards' ? (
        /* Card View Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredOffices.map((office) => (
            <div
              key={office.id}
              className="bg-white border border-[#C9D7D5] rounded-3xl p-5 shadow-xs hover:border-[#83C0AD] transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold text-[#3B7E76] uppercase tracking-wider bg-[#83C0AD]/20 px-2.5 py-1 rounded-lg inline-block mb-1.5">
                      {office.district} • {office.department}
                    </span>
                    <h4 className="font-bold text-base text-[#1A2E2B] font-serif leading-tight">
                      {office.name}
                    </h4>
                  </div>
                </div>

                <div className="text-xs text-[#797E89] space-y-2 pt-1 border-t border-[#F4F8F7]">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#3B7E76] shrink-0 mt-0.5" />
                    <span className="leading-snug text-[#1A2E2B] font-medium">{office.address}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#3B7E76] shrink-0" />
                    <span>{office.hours}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[#3B7E76] shrink-0" />
                    <span>Nodal Officer: <strong className="text-[#1A2E2B]">{office.nodalOfficer}</strong></span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#3B7E76] shrink-0" />
                    <a href={`tel:${office.phone}`} className="hover:underline font-semibold text-[#3B7E76]">
                      {office.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Direct Directions Action Button */}
              <div className="pt-3 border-t border-[#F4F8F7] flex items-center justify-between">
                <span className="text-[10px] text-[#797E89] truncate max-w-[150px]">{office.email}</span>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.mapQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-[#3B7E76] hover:bg-[#2F6861] text-white px-3.5 py-2 rounded-xl text-xs font-semibold shadow-xs transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Directions</span>
                  <ExternalLink className="w-3 h-3 text-[#C9D7D5]" />
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Comprehensive District Directory List View */
        <div className="space-y-6">
          {Object.entries(officesByDistrict).map(([distName, officesList]) => (
            <div key={distName} className="bg-white border border-[#C9D7D5] rounded-3xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#F4F8F7] pb-3">
                <div>
                  <h4 className="text-lg font-bold text-[#1A2E2B] font-serif flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#3B7E76]" />
                    <span>District: {distName} ({localState})</span>
                  </h4>
                  <p className="text-xs text-[#797E89]">
                    Official Headquarters, Tehsil Administrative Center & Agriculture Nodal Services
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#3B7E76] bg-[#83C0AD]/20 px-3 py-1 rounded-full font-bold">
                    {officesList.length} Official Centers
                  </span>
                  <button
                    onClick={() => {
                      setLocalDistrict(distName);
                      setSelectedDistrict(distName);
                      setViewMode('cards');
                    }}
                    className="text-xs bg-[#F4F8F7] hover:bg-[#C9D7D5]/40 text-[#1A2E2B] font-semibold px-3 py-1 rounded-xl border border-[#C9D7D5] transition-all cursor-pointer"
                  >
                    Focus Cards
                  </button>
                </div>
              </div>

              <div className="divide-y divide-[#F4F8F7]">
                {officesList.map((office) => (
                  <div key={office.id} className="py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="space-y-1.5 max-w-2xl">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-[#3B7E76] bg-[#F4F8F7] px-2 py-0.5 rounded border border-[#C9D7D5]">
                          {office.department}
                        </span>
                        <h5 className="text-sm font-bold text-[#1A2E2B] font-serif">{office.name}</h5>
                      </div>
                      
                      <p className="text-xs text-[#1A2E2B] font-medium flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#3B7E76] shrink-0" />
                        <span>{office.address}</span>
                      </p>

                      <div className="text-[11px] text-[#797E89] flex flex-wrap items-center gap-4 pt-0.5">
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3 text-[#3B7E76]" />
                          Contact: <strong className="text-[#1A2E2B]">{office.phone}</strong>
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3 text-[#3B7E76]" />
                          Officer: <strong className="text-[#1A2E2B]">{office.nodalOfficer}</strong>
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#3B7E76]" />
                          Hours: {office.hours}
                        </span>
                      </div>
                    </div>

                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.mapQuery)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-[#3B7E76] hover:bg-[#2F6861] text-white px-3.5 py-2 rounded-xl text-xs font-semibold shrink-0 self-start md:self-center transition-colors"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Google Maps</span>
                      <ExternalLink className="w-3 h-3 text-[#C9D7D5]" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredOffices.length === 0 && (
        <div className="bg-white border border-[#C9D7D5] rounded-3xl p-12 text-center space-y-3 max-w-md mx-auto shadow-xs">
          <Building2 className="w-10 h-10 text-[#797E89] mx-auto" />
          <h4 className="text-base font-bold text-[#1A2E2B] font-serif">No Offices Found</h4>
          <p className="text-xs text-[#797E89]">
            No government department offices match your current search query or letter filter.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedLetter('ALL');
              setLocalDistrict('All Districts');
            }}
            className="mt-2 bg-[#3B7E76] text-white text-xs font-bold px-4 py-2 rounded-xl cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}

    </div>
  );
};

