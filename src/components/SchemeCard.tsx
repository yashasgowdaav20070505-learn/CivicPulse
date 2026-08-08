import React from 'react';
import { Scheme } from '../types';
import { useApp } from '../context/AppContext';
import {
  Building2,
  CheckCircle,
  ExternalLink,
  FileCheck,
  AlertCircle,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Users
} from 'lucide-react';

interface SchemeCardProps {
  scheme: Scheme;
}

export const SchemeCard: React.FC<SchemeCardProps> = ({ scheme }) => {
  const {
    user,
    familyMembers,
    setActiveDetailScheme,
    setActiveApplyScheme,
    setActiveReportScheme,
    t
  } = useApp();

  // Evaluate eligibility match score based on user profile
  const isIncomeEligible = user ? user.income <= (scheme.annual_income_limit || 1000000) : true;
  const isGenderEligible = user
    ? !scheme.target_gender || scheme.target_gender === 'All' || (scheme.target_gender === 'Female' && user.fullName)
    : true;

  const isUserMatch = isIncomeEligible && isGenderEligible;

  // Check if any family member qualifies
  const qualifyingFamily = familyMembers.filter(f => {
    if (scheme.target_gender === 'Female' && f.relation === 'Spouse' && user?.maritalStatus === 'Married') return true;
    if (scheme.category === 'Education' && f.relation === 'Child') return true;
    if (scheme.category === 'Women & Child' && f.relation === 'Spouse') return true;
    return false;
  });

  return (
    <div className="frosted-glass-card rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group relative overflow-hidden">
      
      {/* Decorative subtle top line for new schemes */}
      {scheme.isNew && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#83C0AD]" />
      )}

      <div>
        {/* Badges row */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span
              className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                scheme.state_or_central === 'Central'
                  ? 'bg-[#3B7E76] text-white'
                  : 'bg-[#83C0AD]/20 text-[#3B7E76] border border-[#83C0AD]/50'
              }`}
            >
              {scheme.state_or_central}
            </span>

            <span className="text-[11px] font-medium bg-[#F4F8F7] text-[#797E89] px-2.5 py-0.5 rounded-full border border-[#C9D7D5]">
              {scheme.category}
            </span>
          </div>

          {/* Dynamic Eligibility Match Tag */}
          {user && (
            <div className="flex items-center gap-1">
              {isUserMatch ? (
                <span className="text-[11px] font-bold bg-[#83C0AD]/20 text-[#3B7E76] px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-[#83C0AD]/40">
                  <CheckCircle className="w-3 h-3 text-[#3B7E76]" />
                  <span>{t('matchingBadgeHigh')}</span>
                </span>
              ) : qualifyingFamily.length > 0 ? (
                <span className="text-[11px] font-bold bg-[#C9D7D5]/40 text-[#3B7E76] px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-[#C9D7D5]">
                  <Users className="w-3 h-3 text-[#3B7E76]" />
                  <span>{t('matchingBadgeFamily')} ({qualifyingFamily.length})</span>
                </span>
              ) : (
                <span className="text-[11px] font-medium bg-[#F4F8F7] text-[#797E89] px-2.5 py-0.5 rounded-full">
                  {t('matchingBadgeGeneral')}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Scheme Title */}
        <h3 className="text-base font-bold text-[#1A2E2B] group-hover:text-[#3B7E76] transition-colors leading-snug mb-1 font-serif">
          {scheme.title}
        </h3>

        {/* Ministry / Department */}
        <div className="flex items-center gap-1.5 text-xs text-[#797E89] mb-3">
          <Building2 className="w-3.5 h-3.5 text-[#3B7E76] shrink-0" />
          <span className="truncate">{scheme.department}</span>
        </div>

        {/* Simplified Jargon-Free Summary */}
        <p className="text-xs text-[#1A2E2B]/80 bg-[#F4F8F7] p-3 rounded-xl border border-[#C9D7D5]/60 mb-4 line-clamp-3 leading-relaxed">
          {scheme.summary_simplified}
        </p>

        {/* Key Benefits snippet */}
        <div className="mb-4 space-y-1.5 text-xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#3B7E76]">
            {t('benefits')}:
          </div>
          <div className="font-medium text-[#1A2E2B] bg-[#83C0AD]/10 border-l-2 border-[#83C0AD] pl-2.5 py-1 rounded-r-md">
            {scheme.benefits}
          </div>
        </div>
      </div>

      {/* Action Buttons Row (Mandatory 4 actions) */}
      <div className="pt-3 border-t border-[#F4F8F7] space-y-2">
        <div className="grid grid-cols-2 gap-2">
          
          {/* 1. View Matching Details */}
          <button
            onClick={() => setActiveDetailScheme(scheme)}
            className="w-full text-xs font-semibold text-[#3B7E76] bg-[#F4F8F7] hover:bg-[#C9D7D5]/50 border border-[#C9D7D5] py-2 px-2.5 rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer"
          >
            <FileCheck className="w-3.5 h-3.5 text-[#3B7E76]" />
            <span className="truncate">{t('viewMatchingDetails')}</span>
          </button>

          {/* 2. Get Details to Apply */}
          <button
            onClick={() => setActiveApplyScheme(scheme)}
            className="w-full text-xs font-semibold text-white bg-[#3B7E76] hover:bg-[#2F6861] py-2 px-2.5 rounded-xl transition-all flex items-center justify-center gap-1 shadow-xs cursor-pointer"
          >
            <ArrowRight className="w-3.5 h-3.5 text-white" />
            <span className="truncate">{t('getDetailsToApply')}</span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {/* 3. Visit Original Website */}
          <a
            href={scheme.official_link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-[11px] font-medium text-[#797E89] hover:text-[#3B7E76] bg-[#F4F8F7] hover:bg-[#C9D7D5]/30 border border-[#C9D7D5]/60 py-1.5 px-2 rounded-xl transition-all flex items-center justify-center gap-1"
          >
            <ExternalLink className="w-3 h-3 text-[#3B7E76]" />
            <span className="truncate">{t('visitOriginalWebsite')}</span>
          </a>

          {/* 4. Report Problem for this Scheme */}
          <button
            onClick={() => setActiveReportScheme(scheme)}
            className="w-full text-[11px] font-medium text-[#797E89] hover:text-red-700 bg-[#F4F8F7] hover:bg-red-50 border border-[#C9D7D5]/60 py-1.5 px-2 rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer"
          >
            <AlertCircle className="w-3 h-3 text-red-500" />
            <span className="truncate">{t('reportProblem')}</span>
          </button>
        </div>
      </div>

    </div>
  );
};
