import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { INDIAN_STATES, DISTRICTS_BY_STATE } from '../data/mockSchemes';
import { UserProfile } from '../types';
import { X, Eye, EyeOff, ShieldCheck, UserPlus, LogIn, Lock, User, Upload } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, authMode, setAuthMode, login, register, t } = useApp();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // Register state
  const [fullName, setFullName] = useState<string>('');
  const [dob, setDob] = useState<string>('1990-01-01');
  const [income, setIncome] = useState<number>(250000);
  const [aadhaarMasked, setAadhaarMasked] = useState<string>('XXXX-XXXX-1234');
  const [occupation, setOccupation] = useState<string>('Agricultural Worker');
  const [maritalStatus, setMaritalStatus] = useState<'Single' | 'Married' | 'Widowed' | 'Divorced'>('Married');
  const [state, setState] = useState<string>('Karnataka');
  const [district, setDistrict] = useState<string>('Bengaluru Urban');
  const [photoUrl, setPhotoUrl] = useState<string>('');

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(username || 'ramesh_k', password);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProfile: UserProfile = {
      username: username || fullName.toLowerCase().replace(/\s+/g, '_'),
      fullName: fullName || 'New Citizen',
      dob,
      income: Number(income),
      aadhaarMasked: aadhaarMasked.startsWith('XXXX') ? aadhaarMasked : `XXXX-XXXX-${aadhaarMasked.slice(-4)}`,
      occupation,
      maritalStatus,
      state,
      district,
      photoUrl: photoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'
    };
    register(newProfile);
  };

  const districtsList = DISTRICTS_BY_STATE[state] || ['All Districts'];

  return (
    <div className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FFFFFF] border border-[#C9D7D5] rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl flex flex-col justify-between">
        
        {/* Header Tabs */}
        <div className="p-4 border-b border-[#C9D7D5] bg-[#F4F8F7] flex items-center justify-between sticky top-0 z-10">
          <div className="flex gap-2">
            <button
              onClick={() => setAuthMode('login')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                authMode === 'login'
                  ? 'bg-[#3B7E76] text-white shadow-xs'
                  : 'text-[#797E89] hover:text-[#1A2E2B]'
              }`}
            >
              {t('login')}
            </button>
            <button
              onClick={() => setAuthMode('register')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                authMode === 'register'
                  ? 'bg-[#3B7E76] text-white shadow-xs'
                  : 'text-[#797E89] hover:text-[#1A2E2B]'
              }`}
            >
              {t('register')}
            </button>
          </div>

          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="text-[#797E89] hover:text-[#1A2E2B] p-1.5 rounded-xl hover:bg-[#C9D7D5]/40 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {authMode === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="p-6 space-y-4 text-xs text-[#1A2E2B]">
            <div className="text-center mb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#3B7E76] text-white flex items-center justify-center mx-auto mb-2 shadow-xs">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#1A2E2B] font-serif">Citizen Portal Login</h3>
              <p className="text-xs text-[#797E89]">Access personalized government scheme matching</p>
            </div>

            <div>
              <label className="block font-bold text-[#1A2E2B] mb-1">Username / Citizen ID</label>
              <div className="relative">
                <User className="w-4 h-4 text-[#797E89] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. ramesh_k"
                  required
                  className="w-full bg-[#F4F8F7] border border-[#C9D7D5] rounded-xl pl-9 pr-3 py-2.5 font-medium text-[#1A2E2B] focus:outline-none focus:border-[#3B7E76]"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-[#1A2E2B] mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#797E89] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-[#F4F8F7] border border-[#C9D7D5] rounded-xl pl-9 pr-10 py-2.5 font-medium text-[#1A2E2B] focus:outline-none focus:border-[#3B7E76]"
                />
                
                {/* Eye Icon Password Toggle */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#797E89] hover:text-[#3B7E76]"
                  title={showPassword ? 'Hide password' : 'View password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#3B7E76] hover:bg-[#2F6861] text-white font-bold py-2.5 rounded-xl shadow-xs transition-all mt-4 flex items-center justify-center gap-2 cursor-pointer"
            >
              <LogIn className="w-4 h-4" />
              <span>Login to CivicPulse</span>
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit} className="p-6 space-y-3.5 text-xs text-[#1A2E2B]">
            <div className="text-center mb-2">
              <h3 className="text-base font-bold text-[#1A2E2B] font-serif">Citizen Registration</h3>
              <p className="text-xs text-[#797E89]">Fill in details for personalized scheme discovery</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-[#1A2E2B] mb-1">Full Name *</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Full Legal Name"
                  required
                  className="w-full bg-[#F4F8F7] border border-[#C9D7D5] rounded-xl p-2 font-medium text-[#1A2E2B] focus:outline-none focus:border-[#3B7E76]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#1A2E2B] mb-1">Date of Birth *</label>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  required
                  className="w-full bg-[#F4F8F7] border border-[#C9D7D5] rounded-xl p-2 font-medium text-[#1A2E2B] focus:outline-none focus:border-[#3B7E76]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#1A2E2B] mb-1">Annual Household Income (₹) *</label>
                <input
                  type="number"
                  value={income}
                  onChange={(e) => setIncome(Number(e.target.value))}
                  placeholder="250000"
                  required
                  className="w-full bg-[#F4F8F7] border border-[#C9D7D5] rounded-xl p-2 font-medium text-[#1A2E2B] focus:outline-none focus:border-[#3B7E76]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#1A2E2B] mb-1">Aadhaar Number (Masked) *</label>
                <input
                  type="text"
                  value={aadhaarMasked}
                  onChange={(e) => setAadhaarMasked(e.target.value)}
                  placeholder="XXXX-XXXX-1234"
                  required
                  className="w-full bg-[#F4F8F7] border border-[#C9D7D5] rounded-xl p-2 font-medium text-[#1A2E2B] focus:outline-none focus:border-[#3B7E76]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#1A2E2B] mb-1">Occupation *</label>
                <input
                  type="text"
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  placeholder="e.g. Farmer / Tradesman / Student"
                  required
                  className="w-full bg-[#F4F8F7] border border-[#C9D7D5] rounded-xl p-2 font-medium text-[#1A2E2B] focus:outline-none focus:border-[#3B7E76]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#1A2E2B] mb-1">Marital Status *</label>
                <select
                  value={maritalStatus}
                  onChange={(e) => setMaritalStatus(e.target.value as any)}
                  className="w-full bg-[#F4F8F7] border border-[#C9D7D5] rounded-xl p-2 font-medium text-[#1A2E2B] focus:outline-none focus:border-[#3B7E76]"
                >
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Widowed">Widowed</option>
                  <option value="Divorced">Divorced</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#1A2E2B] mb-1">State *</label>
                <select
                  value={state}
                  onChange={(e) => {
                    setState(e.target.value);
                    setDistrict('All Districts');
                  }}
                  className="w-full bg-[#F4F8F7] border border-[#C9D7D5] rounded-xl p-2 font-medium text-[#1A2E2B] focus:outline-none focus:border-[#3B7E76]"
                >
                  {INDIAN_STATES.filter(s => s !== 'All States').map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#1A2E2B] mb-1">District *</label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full bg-[#F4F8F7] border border-[#C9D7D5] rounded-xl p-2 font-medium text-[#1A2E2B] focus:outline-none focus:border-[#3B7E76]"
                >
                  {districtsList.map((dst) => (
                    <option key={dst} value={dst}>{dst}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#1A2E2B] mb-1">Username *</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="ramesh_123"
                  required
                  className="w-full bg-[#F4F8F7] border border-[#C9D7D5] rounded-xl p-2 font-medium text-[#1A2E2B] focus:outline-none focus:border-[#3B7E76]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#1A2E2B] mb-1">Password *</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full bg-[#F4F8F7] border border-[#C9D7D5] rounded-xl p-2 font-medium text-[#1A2E2B] focus:outline-none focus:border-[#3B7E76] pr-8"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-[#797E89]"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="block font-bold text-[#1A2E2B] mb-1">Profile Photo URL (Optional)</label>
              <input
                type="text"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                placeholder="https://... (Leave empty for default monogram avatar)"
                className="w-full bg-[#F4F8F7] border border-[#C9D7D5] rounded-xl p-2 font-medium text-[#1A2E2B] focus:outline-none focus:border-[#3B7E76]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#3B7E76] hover:bg-[#2F6861] text-white font-bold py-2.5 rounded-xl shadow-xs transition-all mt-3 flex items-center justify-center gap-2 cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>Complete Citizen Registration</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
