import React from 'react';
import { useApp } from '../context/AppContext';
import { X, CheckCircle, FileText, ExternalLink, ShieldCheck, ArrowRight, Building2 } from 'lucide-react';

export const SchemeDetailModal: React.FC = () => {
  const { activeDetailScheme, setActiveDetailScheme, setActiveApplyScheme, user, t } = useApp();

  if (!activeDetailScheme) return null;

  const scheme = activeDetailScheme;

  return (
    <div className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FFFFFF] border border-[#C9D7D5] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl flex flex-col justify-between">
        
        {/* Header */}
        <div className="p-6 border-b border-[#C9D7D5] bg-[#F4F8F7] flex items-start justify-between gap-4 sticky top-0 z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-bold bg-[#3B7E76] text-white px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {scheme.state_or_central}
              </span>
              <span className="text-xs font-semibold text-[#797E89] bg-[#C9D7D5]/40 px-2.5 py-0.5 rounded-full border border-[#C9D7D5]">
                {scheme.category}
              </span>
            </div>
            <h2 className="text-lg font-bold text-[#1A2E2B] font-serif leading-snug">
              {scheme.title}
            </h2>
            <div className="flex items-center gap-1.5 text-xs text-[#797E89] mt-1">
              <Building2 className="w-3.5 h-3.5 text-[#3B7E76]" />
              <span>{scheme.department}</span>
            </div>
          </div>

          <button
            onClick={() => setActiveDetailScheme(null)}
            className="text-[#797E89] hover:text-[#1A2E2B] p-1.5 rounded-xl hover:bg-[#C9D7D5]/40 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 text-sm text-[#1A2E2B]">
          
          {/* Simplified Overview */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#3B7E76] mb-2">
              Simplified Overview
            </h3>
            <p className="bg-[#F4F8F7] p-3.5 rounded-xl border border-[#C9D7D5]/80 text-xs leading-relaxed">
              {scheme.summary_simplified}
            </p>
          </div>

          {/* Key Benefits */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#3B7E76] mb-2">
              Key Benefits & Grants
            </h3>
            <div className="bg-[#83C0AD]/15 border-l-4 border-[#3B7E76] p-3.5 rounded-r-xl font-medium text-xs text-[#1A2E2B]">
              {scheme.benefits}
            </div>
          </div>

          {/* Eligibility Criteria */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#3B7E76] mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#3B7E76]" />
              <span>Eligibility Criteria</span>
            </h3>
            <ul className="space-y-2">
              {scheme.eligibility_criteria.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs bg-[#F4F8F7] p-2.5 rounded-xl border border-[#C9D7D5]/50">
                  <CheckCircle className="w-4 h-4 text-[#83C0AD] shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            {scheme.annual_income_limit && (
              <div className="mt-3 text-xs text-[#797E89] bg-[#C9D7D5]/20 p-2.5 rounded-xl border border-[#C9D7D5]/40">
                <strong className="text-[#1A2E2B]">Annual Family Income Limit:</strong> Up to ₹{scheme.annual_income_limit.toLocaleString('en-IN')} / year.
                {user && (
                  <span className={`ml-2 font-bold ${user.income <= scheme.annual_income_limit ? 'text-[#3B7E76]' : 'text-amber-700'}`}>
                    (Your profile: ₹{user.income.toLocaleString('en-IN')})
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Required Documents Checklist */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#3B7E76] mb-2 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-[#3B7E76]" />
              <span>Required Documents</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {scheme.required_documents.map((doc, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-[#F4F8F7] p-2.5 rounded-xl border border-[#C9D7D5]/60 text-xs">
                  <div className="w-2 h-2 rounded-full bg-[#3B7E76]" />
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#C9D7D5] bg-[#F4F8F7] flex flex-wrap items-center justify-between gap-3 sticky bottom-0">
          <a
            href={scheme.official_link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-[#3B7E76] hover:underline flex items-center gap-1"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open Official Portal Website</span>
          </a>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveDetailScheme(null)}
              className="text-xs font-semibold px-4 py-2 text-[#797E89] hover:text-[#1A2E2B]"
            >
              Close
            </button>
            <button
              onClick={() => {
                const s = activeDetailScheme;
                setActiveDetailScheme(null);
                setActiveApplyScheme(s);
              }}
              className="text-xs font-bold bg-[#3B7E76] hover:bg-[#2F6861] text-white px-5 py-2 rounded-xl shadow-xs flex items-center gap-1.5"
            >
              <span>Get Details to Apply</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
