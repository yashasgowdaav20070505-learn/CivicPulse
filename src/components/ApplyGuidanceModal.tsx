import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, CheckCircle2, Users, FileCheck, ArrowRight, ShieldCheck, Sparkles, ExternalLink } from 'lucide-react';
import { SchemeApplication } from '../types';

export const ApplyGuidanceModal: React.FC = () => {
  const {
    activeApplyScheme,
    setActiveApplyScheme,
    user,
    familyMembers,
    submitApplication,
    t
  } = useApp();

  const [selectedFamilyIds, setSelectedFamilyIds] = useState<string[]>([]);
  const [applyAllAtOnce, setApplyAllAtOnce] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedApp, setSubmittedApp] = useState<SchemeApplication | null>(null);

  if (!activeApplyScheme) return null;

  const scheme = activeApplyScheme;

  const handleToggleFamily = (id: string) => {
    if (selectedFamilyIds.includes(id)) {
      setSelectedFamilyIds(selectedFamilyIds.filter(f => f !== id));
      setApplyAllAtOnce(false);
    } else {
      const updated = [...selectedFamilyIds, id];
      setSelectedFamilyIds(updated);
      if (updated.length === familyMembers.length) {
        setApplyAllAtOnce(true);
      }
    }
  };

  const handleToggleApplyAll = (checked: boolean) => {
    setApplyAllAtOnce(checked);
    if (checked) {
      setSelectedFamilyIds(familyMembers.map(m => m.id));
    } else {
      setSelectedFamilyIds([]);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const app = await submitApplication(
      scheme.id,
      scheme.title,
      selectedFamilyIds,
      applyAllAtOnce
    );
    setIsSubmitting(false);
    setSubmittedApp(app);
  };

  const handleClose = () => {
    setActiveApplyScheme(null);
    setSubmittedApp(null);
    setSelectedFamilyIds([]);
    setApplyAllAtOnce(false);
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FFFFFF] border border-[#C9D7D5] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl flex flex-col justify-between">
        
        {/* Header */}
        <div className="p-6 border-b border-[#C9D7D5] bg-[#F4F8F7] flex items-start justify-between gap-4 sticky top-0 z-10">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-[#3B7E76] text-white px-2.5 py-0.5 rounded-full">
              Application Guide & Group Registration
            </span>
            <h2 className="text-lg font-bold text-[#1A2E2B] font-serif leading-snug mt-1">
              Apply for {scheme.title}
            </h2>
          </div>

          <button
            onClick={handleClose}
            className="text-[#797E89] hover:text-[#1A2E2B] p-1.5 rounded-xl hover:bg-[#C9D7D5]/40 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {submittedApp ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#83C0AD]/20 border border-[#83C0AD] text-[#3B7E76] flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-10 h-10 text-[#3B7E76]" />
            </div>

            <h3 className="text-xl font-bold text-[#1A2E2B] font-serif">
              Application Submitted Successfully!
            </h3>

            <p className="text-xs text-[#797E89] max-w-md mx-auto">
              Your scheme application request has been generated and logged with the government dispatch portal.
            </p>

            <div className="bg-[#F4F8F7] p-4 rounded-2xl border border-[#C9D7D5] max-w-sm mx-auto text-left text-xs space-y-2">
              <div className="flex justify-between border-b border-[#C9D7D5]/60 pb-1.5">
                <span className="text-[#797E89]">Tracking Reference:</span>
                <span className="font-mono font-bold text-[#3B7E76]">{submittedApp.referenceNumber}</span>
              </div>
              <div className="flex justify-between border-b border-[#C9D7D5]/60 pb-1.5">
                <span className="text-[#797E89]">Primary Applicant:</span>
                <span className="font-semibold text-[#1A2E2B]">{submittedApp.primaryApplicantName}</span>
              </div>
              {submittedApp.selectedFamilyMembers.length > 0 && (
                <div>
                  <span className="text-[#797E89] block mb-1">Group Beneficiaries:</span>
                  <div className="flex flex-wrap gap-1">
                    {submittedApp.selectedFamilyMembers.map((m, i) => (
                      <span key={i} className="bg-[#83C0AD]/20 text-[#3B7E76] px-2 py-0.5 rounded-md text-[11px] font-medium">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex justify-between pt-1">
                <span className="text-[#797E89]">Status:</span>
                <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  {submittedApp.status}
                </span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={scheme.official_link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto text-xs font-bold bg-[#3B7E76] text-white px-5 py-2.5 rounded-xl flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>Proceed to Official Government Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={handleClose}
                className="w-full sm:w-auto text-xs font-semibold bg-[#F4F8F7] hover:bg-[#C9D7D5]/40 text-[#1A2E2B] border border-[#C9D7D5] px-5 py-2.5 rounded-xl"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 space-y-6 text-sm text-[#1A2E2B]">
            
            {/* Step-by-Step Guidance */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#3B7E76] mb-2">
                Application Steps Guidance
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2.5 bg-[#F4F8F7] p-3 rounded-xl border border-[#C9D7D5]/60">
                  <div className="w-5 h-5 rounded-full bg-[#3B7E76] text-white font-bold flex items-center justify-center text-[10px] shrink-0">1</div>
                  <div>
                    <strong className="text-[#1A2E2B]">Verify Aadhaar & Bank Linkage:</strong> Ensure your Aadhaar is linked with your primary savings account for Direct Benefit Transfer (DBT).
                  </div>
                </div>

                <div className="flex items-start gap-2.5 bg-[#F4F8F7] p-3 rounded-xl border border-[#C9D7D5]/60">
                  <div className="w-5 h-5 rounded-full bg-[#3B7E76] text-white font-bold flex items-center justify-center text-[10px] shrink-0">2</div>
                  <div>
                    <strong className="text-[#1A2E2B]">Prepare Mandatory Documents:</strong> Have soft copies or hard copies of {scheme.required_documents.slice(0, 3).join(', ')}.
                  </div>
                </div>

                <div className="flex items-start gap-2.5 bg-[#F4F8F7] p-3 rounded-xl border border-[#C9D7D5]/60">
                  <div className="w-5 h-5 rounded-full bg-[#3B7E76] text-white font-bold flex items-center justify-center text-[10px] shrink-0">3</div>
                  <div>
                    <strong className="text-[#1A2E2B]">Submit Application Request:</strong> Confirm group beneficiaries below to issue tracking ID, then complete form on the official portal.
                  </div>
                </div>
              </div>
            </div>

            {/* Mandatory Documents & Attached Photocopies Checklist */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#3B7E76] flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4 text-[#3B7E76]" />
                  <span>Mandatory Documents & Verified Photocopies</span>
                </h3>
              </div>

              <div className="bg-[#F4F8F7] p-3 rounded-2xl border border-[#C9D7D5] space-y-2">
                <div className="text-[11px] text-[#797E89]">
                  Required documents for this scheme: <strong className="text-[#1A2E2B]">{scheme.required_documents.join(', ')}</strong>
                </div>

                {/* Uploaded Documents List */}
                {(user?.documents || []).length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {(user?.documents || []).map((doc) => (
                      <div key={doc.id} className="bg-white p-2 rounded-xl border border-[#C9D7D5] flex items-center gap-2">
                        <img src={doc.fileUrl} alt={doc.docType} className="w-8 h-8 rounded-lg object-cover border shrink-0" />
                        <div className="min-w-0 flex-1 text-[11px]">
                          <div className="font-bold text-[#1A2E2B] truncate">{doc.docType}</div>
                          <div className="text-[9px] text-[#3B7E76] font-semibold">✓ Verified Photocopy</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-[11px] text-[#797E89] bg-white p-2.5 rounded-xl border border-dashed border-[#C9D7D5] text-center">
                    No documents uploaded in profile yet.
                  </div>
                )}
              </div>
            </div>

            {/* Group Application Section (Select Family Members) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#3B7E76] flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-[#3B7E76]" />
                  <span>Group Beneficiary Selection</span>
                </h3>

                {familyMembers.length > 0 && (
                  <label className="flex items-center gap-2 text-xs font-medium text-[#3B7E76] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={applyAllAtOnce}
                      onChange={(e) => handleToggleApplyAll(e.target.checked)}
                      className="rounded text-[#3B7E76] focus:ring-[#3B7E76]"
                    />
                    <span>Apply for All at Once</span>
                  </label>
                )}
              </div>

              {/* Primary Citizen */}
              <div className="bg-[#F4F8F7] border border-[#C9D7D5] p-3 rounded-xl text-xs mb-2 flex items-center justify-between">
                <div>
                  <span className="font-bold text-[#1A2E2B]">{user?.fullName || 'Primary Citizen'} (Self)</span>
                  <div className="text-[11px] text-[#797E89]">{user?.aadhaarMasked} • {user?.state}</div>
                </div>
                <span className="text-[10px] font-bold bg-[#3B7E76] text-white px-2 py-0.5 rounded-md">
                  Primary Applicant
                </span>
              </div>

              {/* Family Members list */}
              {familyMembers.length > 0 ? (
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {familyMembers.map((member) => {
                    const isSelected = selectedFamilyIds.includes(member.id);
                    return (
                      <label
                        key={member.id}
                        className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-[#83C0AD]/15 border-[#3B7E76]'
                            : 'bg-[#FFFFFF] border-[#C9D7D5] hover:bg-[#F4F8F7]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleToggleFamily(member.id)}
                            className="rounded text-[#3B7E76] focus:ring-[#3B7E76]"
                          />
                          <div>
                            <span className="font-bold text-[#1A2E2B]">{member.name}</span>
                            <span className="text-[#797E89] ml-1.5">({member.relation}, {member.age} yrs)</span>
                          </div>
                        </div>
                        <span className="text-[11px] text-[#797E89] font-mono">{member.aadhaarMasked}</span>
                      </label>
                    );
                  })}
                </div>
              ) : (
                <div className="p-3 bg-[#F4F8F7] rounded-xl border border-dashed border-[#C9D7D5] text-center text-xs text-[#797E89]">
                  No linked family members. You can link family members in your Profile Drawer.
                </div>
              )}
            </div>

          </div>
        )}

        {/* Footer */}
        {!submittedApp && (
          <div className="p-4 border-t border-[#C9D7D5] bg-[#F4F8F7] flex items-center justify-between gap-3 sticky bottom-0">
            <button
              onClick={handleClose}
              className="text-xs font-semibold px-4 py-2 text-[#797E89] hover:text-[#1A2E2B]"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="text-xs font-bold bg-[#3B7E76] hover:bg-[#2F6861] text-white px-6 py-2.5 rounded-xl shadow-xs flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            >
              <FileCheck className="w-4 h-4" />
              <span>{isSubmitting ? 'Processing Request...' : 'Submit Official Application Request'}</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
