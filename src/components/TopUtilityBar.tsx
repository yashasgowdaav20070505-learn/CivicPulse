import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Phone, Eye, Sun, Moon, Type, Activity, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const TopUtilityBar: React.FC = () => {
  const { themeMode, setThemeMode, fontScale, setFontScale, syncStatus } = useApp();
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);

  return (
    <div className="bg-[#1A1D20] text-white px-4 lg:px-8 py-2 text-xs font-sans border-b border-[#2A2E33] shadow-xs relative z-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5">
        
        {/* Left Section: Live Data Synchronized Badge & Emergency Helpline */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-[11px]">
          
          {/* Live Data Badge */}
          <div className="inline-flex items-center gap-2 bg-[#25292E] border border-[#3A3F47] px-2.5 py-1 rounded-full text-[#E2E8F0]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-medium tracking-wide">Portal Live Data Synchronized</span>
          </div>

          {/* Emergency Citizen Helpline */}
          <div className="flex items-center gap-1.5 text-amber-300 font-semibold">
            <Phone className="w-3.5 h-3.5 shrink-0 text-amber-400" />
            <span>24x7 Citizen Helpline:</span>
            <a href="tel:1800110001" className="hover:underline hover:text-white transition-colors">
              1800-11-0001
            </a>
            <span className="text-[#64748B]">/</span>
            <a href="tel:1915" className="hover:underline hover:text-white transition-colors">
              1915
            </a>
          </div>

        </div>

        {/* Right Section: Accessibility Controls (High Contrast & Font Resizer) */}
        <div className="flex items-center gap-3 shrink-0 text-[11px]">
          
          {/* High Contrast / Theme Selector */}
          <div className="relative">
            <button
              onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
              className="inline-flex items-center gap-1.5 bg-[#2A2E33] hover:bg-[#3A3F47] border border-[#3A3F47] text-amber-300 font-bold px-2.5 py-1 rounded-lg transition-all cursor-pointer"
              title="Toggle Accessibility High Contrast Mode"
            >
              <Eye className="w-3.5 h-3.5 text-amber-300" />
              <span>👁 High Contrast</span>
            </button>

            {isThemeMenuOpen && (
              <div className="absolute right-0 mt-1 w-52 bg-[#1A1D20] border border-[#3A3F47] rounded-xl shadow-xl py-1.5 z-50 text-xs">
                <div className="px-3 py-1 text-[10px] uppercase font-bold text-gray-400 border-b border-[#2A2E33]">
                  Select Contrast Palette
                </div>
                
                <button
                  onClick={() => {
                    setThemeMode('default');
                    setIsThemeMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-[#2A2E33] transition-colors cursor-pointer ${
                    themeMode === 'default' ? 'text-emerald-400 font-bold' : 'text-gray-200'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Sun className="w-3.5 h-3.5 text-emerald-400" />
                    Standard Sage (Mint)
                  </span>
                  {themeMode === 'default' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                </button>

                <button
                  onClick={() => {
                    setThemeMode('negative');
                    setIsThemeMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-[#2A2E33] transition-colors cursor-pointer ${
                    themeMode === 'negative' ? 'text-amber-300 font-bold' : 'text-gray-200'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Moon className="w-3.5 h-3.5 text-amber-300" />
                    Negative High Contrast
                  </span>
                  {themeMode === 'negative' && <CheckCircle2 className="w-3.5 h-3.5 text-amber-300" />}
                </button>

                <button
                  onClick={() => {
                    setThemeMode('blueWhite');
                    setIsThemeMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-[#2A2E33] transition-colors cursor-pointer ${
                    themeMode === 'blueWhite' ? 'text-sky-400 font-bold' : 'text-gray-200'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Eye className="w-3.5 h-3.5 text-sky-400" />
                    High-Visibility Blue & White
                  </span>
                  {themeMode === 'blueWhite' && <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />}
                </button>
              </div>
            )}
          </div>

          {/* Font Resizer Controls (A- | A | A+) */}
          <div className="inline-flex items-center bg-[#25292E] border border-[#3A3F47] rounded-lg p-0.5">
            <span className="px-1.5 text-[10px] text-gray-400 font-semibold flex items-center gap-1">
              <Type className="w-3 h-3 text-gray-400" />
              Font:
            </span>

            <button
              onClick={() => setFontScale('normal')}
              className={`px-2 py-0.5 text-xs font-bold rounded transition-colors cursor-pointer ${
                fontScale === 'normal'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-gray-300 hover:text-white hover:bg-[#3A3F47]'
              }`}
              title="Standard Font Size (100%)"
            >
              A-
            </button>

            <button
              onClick={() => setFontScale('medium')}
              className={`px-2 py-0.5 text-xs font-bold rounded transition-colors cursor-pointer ${
                fontScale === 'medium'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-gray-300 hover:text-white hover:bg-[#3A3F47]'
              }`}
              title="Medium Scaled Font Size (115%)"
            >
              A
            </button>

            <button
              onClick={() => setFontScale('large')}
              className={`px-2 py-0.5 text-xs font-bold rounded transition-colors cursor-pointer ${
                fontScale === 'large'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-gray-300 hover:text-white hover:bg-[#3A3F47]'
              }`}
              title="Large Scaled Font Size (130%)"
            >
              A+
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
