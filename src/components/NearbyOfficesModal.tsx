import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { INDIAN_STATES, DISTRICTS_BY_STATE } from '../data/mockSchemes';
import { MapPin, Phone, Clock, User, ExternalLink, Navigation, Building2, Search, X } from 'lucide-react';

interface Office {
  id: string;
  name: string;
  department: string;
  address: string;
  district: string;
  state: string;
  phone: string;
  email: string;
  hours: string;
  nodalOfficer: string;
  mapQuery: string;
  distanceKm: number;
}

const MOCK_OFFICES: Office[] = [
  {
    id: 'off-01',
    name: 'District Collectorate & Jan Seva Kendra',
    department: 'Revenue & Public Grievances',
    address: 'KG Road, Near Majestic, Ward 24, Bengaluru',
    district: 'Bengaluru Urban',
    state: 'Karnataka',
    phone: '+91 80 2221 1100',
    email: 'dc.bengaluru@karnataka.gov.in',
    hours: '09:30 AM - 05:30 PM (Mon-Sat)',
    nodalOfficer: 'Shri K. V. Sharma (IAS)',
    mapQuery: 'District Collectorate Bengaluru Urban',
    distanceKm: 1.8
  },
  {
    id: 'off-02',
    name: 'Tehsildar & Raiyat Seva Center',
    department: 'Revenue & Land Records',
    address: 'Main Taluk Office Building, Yelahanka',
    district: 'Bengaluru Urban',
    state: 'Karnataka',
    phone: '+91 80 2856 2200',
    email: 'tehsildar.yelahanka@karnataka.gov.in',
    hours: '10:00 AM - 05:00 PM (Mon-Sat)',
    nodalOfficer: 'Smt. Lakshmi Devi (KAS)',
    mapQuery: 'Tehsildar Office Yelahanka Bengaluru',
    distanceKm: 4.2
  },
  {
    id: 'off-03',
    name: 'Gram Panchayat & Rural Development Office',
    department: 'Panchayati Raj & Rural Welfare',
    address: 'Gram Panchayat Campus, Devanahalli Main Road',
    district: 'Bengaluru Rural',
    state: 'Karnataka',
    phone: '+91 80 2768 4411',
    email: 'gp.devanahalli@karnataka.gov.in',
    hours: '09:00 AM - 04:30 PM (Mon-Fri)',
    nodalOfficer: 'Shri Ramesh Gowda (PDO)',
    mapQuery: 'Gram Panchayat Devanahalli',
    distanceKm: 8.5
  },
  {
    id: 'off-04',
    name: 'Department of Agriculture & Farmers Service Portal',
    department: 'Agriculture & PM-KISAN Nodal Office',
    address: 'Krishi Bhavan, Hudson Circle, Bengaluru',
    district: 'Bengaluru Urban',
    state: 'Karnataka',
    phone: '+91 80 2221 4455',
    email: 'dir-agri.kar@nic.in',
    hours: '09:30 AM - 05:30 PM (Mon-Sat)',
    nodalOfficer: 'Dr. M. N. Viswanath (Joint Director)',
    mapQuery: 'Krishi Bhavan Hudson Circle Bengaluru',
    distanceKm: 2.4
  },
  {
    id: 'off-05',
    name: 'District Social Welfare & Scholarship Cell',
    department: 'Social Justice & Empowerment',
    address: 'Multi-Storeyed Building, Dr. Ambedkar Veedhi, Bengaluru',
    district: 'Bengaluru Urban',
    state: 'Karnataka',
    phone: '+91 80 2235 3300',
    email: 'dsw.bengaluru@karnataka.gov.in',
    hours: '10:00 AM - 05:30 PM (Mon-Fri)',
    nodalOfficer: 'Smt. Anitha Rao (District Officer)',
    mapQuery: 'District Social Welfare Office MS Building Bengaluru',
    distanceKm: 3.1
  },
  {
    id: 'off-06',
    name: 'District Industries Centre (MSME & Subsidies)',
    department: 'Commerce & Industry',
    address: 'Industrial Suburb, Rajajinagar 1st Block, Bengaluru',
    district: 'Bengaluru Urban',
    state: 'Karnataka',
    phone: '+91 80 2332 1990',
    email: 'dic.bengaluru@karnataka.gov.in',
    hours: '09:30 AM - 05:30 PM (Mon-Sat)',
    nodalOfficer: 'Shri B. S. Patil (General Manager)',
    mapQuery: 'District Industries Centre Rajajinagar Bengaluru',
    distanceKm: 5.0
  }
];

interface NearbyOfficesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NearbyOfficesModal: React.FC<NearbyOfficesModalProps> = ({ isOpen, onClose }) => {
  const { user } = useApp();
  const [selectedState, setSelectedState] = useState<string>(user?.state || 'Karnataka');
  const [selectedDistrict, setSelectedDistrict] = useState<string>(user?.district || 'Bengaluru Urban');
  const [searchQuery, setSearchQuery] = useState<string>('');

  if (!isOpen) return null;

  const districts = DISTRICTS_BY_STATE[selectedState] || ['All Districts'];

  const filteredOffices = MOCK_OFFICES.filter((off) => {
    const matchesState = selectedState === 'All States' || off.state.toLowerCase() === selectedState.toLowerCase();
    const matchesDistrict = selectedDistrict === 'All Districts' || off.district.toLowerCase() === selectedDistrict.toLowerCase();
    const matchesSearch = !searchQuery || 
      off.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      off.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      off.address.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesState && matchesDistrict && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-[60] bg-[#1A2E2B]/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#F4F8F7] border border-[#C9D7D5] rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] my-auto">
        
        {/* Header */}
        <div className="bg-[#3B7E76] text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-[#83C0AD]">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-serif leading-tight">Nearby Government Office Locator</h3>
              <p className="text-xs text-[#C9D7D5]">
                Locate District Collectorates, Tehsildar Offices, Gram Panchayats & Department Nodal Officers
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Bar */}
        <div className="p-4 bg-white border-b border-[#C9D7D5] space-y-3 shrink-0">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            
            {/* State */}
            <div>
              <label className="text-[11px] font-bold text-[#797E89] uppercase tracking-wider block mb-1">State</label>
              <select
                value={selectedState}
                onChange={(e) => {
                  setSelectedState(e.target.value);
                  setSelectedDistrict('All Districts');
                }}
                className="w-full bg-[#F4F8F7] border border-[#C9D7D5] rounded-xl px-3 py-2 text-xs font-semibold text-[#1A2E2B] focus:outline-none focus:border-[#3B7E76]"
              >
                {INDIAN_STATES.map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

            {/* District */}
            <div>
              <label className="text-[11px] font-bold text-[#797E89] uppercase tracking-wider block mb-1">District / City</label>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full bg-[#F4F8F7] border border-[#C9D7D5] rounded-xl px-3 py-2 text-xs font-semibold text-[#1A2E2B] focus:outline-none focus:border-[#3B7E76]"
              >
                {districts.map((dst) => (
                  <option key={dst} value={dst}>{dst}</option>
                ))}
              </select>
            </div>

            {/* Keyword */}
            <div>
              <label className="text-[11px] font-bold text-[#797E89] uppercase tracking-wider block mb-1">Search Office / Department</label>
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-[#797E89] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. Tehsildar, Agriculture..."
                  className="w-full bg-[#F4F8F7] border border-[#C9D7D5] rounded-xl pl-8 pr-3 py-2 text-xs text-[#1A2E2B] focus:outline-none focus:border-[#3B7E76]"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Office List & Embedded Map Preview */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
          <div className="flex items-center justify-between text-xs text-[#797E89]">
            <span>Showing <strong>{filteredOffices.length}</strong> government department offices nearby</span>
            <span className="text-[#3B7E76] font-semibold">📍 Location: {selectedDistrict}, {selectedState}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredOffices.map((office) => (
              <div
                key={office.id}
                className="bg-white border border-[#C9D7D5] rounded-2xl p-4 shadow-xs hover:border-[#83C0AD] transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold text-[#3B7E76] uppercase tracking-wider bg-[#83C0AD]/20 px-2 py-0.5 rounded-md inline-block mb-1">
                        {office.department}
                      </span>
                      <h4 className="font-bold text-sm text-[#1A2E2B] font-serif leading-tight">
                        {office.name}
                      </h4>
                    </div>
                    <span className="text-[11px] font-bold text-[#3B7E76] bg-[#F4F8F7] px-2 py-1 rounded-lg border border-[#C9D7D5] shrink-0">
                      {office.distanceKm} km
                    </span>
                  </div>

                  <div className="text-xs text-[#797E89] space-y-1.5 pt-1">
                    <div className="flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#3B7E76] shrink-0 mt-0.5" />
                      <span>{office.address}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#3B7E76] shrink-0" />
                      <span>{office.hours}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#3B7E76] shrink-0" />
                      <span>Nodal Officer: <strong className="text-[#1A2E2B]">{office.nodalOfficer}</strong></span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#3B7E76] shrink-0" />
                      <a href={`tel:${office.phone}`} className="hover:underline font-semibold text-[#3B7E76]">
                        {office.phone}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Direct Google Maps Directions Button */}
                <div className="pt-2 border-t border-[#F4F8F7] flex items-center justify-between">
                  <span className="text-[10px] text-[#797E89]">{office.email}</span>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.mapQuery)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 bg-[#3B7E76] hover:bg-[#2F6861] text-white px-3 py-1.5 rounded-xl text-xs font-semibold shadow-xs transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Get Directions</span>
                    <ExternalLink className="w-3 h-3 text-[#C9D7D5]" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {filteredOffices.length === 0 && (
            <div className="bg-white border border-[#C9D7D5] rounded-2xl p-8 text-center space-y-2">
              <Building2 className="w-8 h-8 text-[#797E89] mx-auto" />
              <p className="text-xs font-bold text-[#1A2E2B]">No offices matching your search</p>
              <p className="text-[11px] text-[#797E89]">Try clearing search keywords or selecting "All Districts".</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-white border-t border-[#C9D7D5] p-3 text-center text-xs text-[#797E89] shrink-0">
          Citizens can visit these official counters for physical document verification, Aadhaar seeding, or grievance submission.
        </div>

      </div>
    </div>
  );
};
