import React from 'react';
import { useApp } from '../context/AppContext';
import { X, FileText, CheckCircle2, Clock, Users } from 'lucide-react';

export const ApplicationsTrackerModal: React.FC = () => {
  const { isApplicationsModalOpen, setIsApplicationsModalOpen, applications } = useApp();

  if (!isApplicationsModalOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FFFFFF] border border-[#C9D7D5] rounded-2xl w-full max-w-xl max-h-[85vh] overflow-y-auto shadow-xl flex flex-col justify-between">
        
        {/* Header */}
        <div className="p-5 border-b border-[#C9D7D5] bg-[#F4F8F7] flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#3B7E76]" />
            <h2 className="text-base font-bold text-[#1A2E2B] font-serif">
              Submitted Scheme Applications ({applications.length})
            </h2>
          </div>

          <button
            onClick={() => setIsApplicationsModalOpen(false)}
            className="text-[#797E89] hover:text-[#1A2E2B] p-1.5 rounded-xl hover:bg-[#C9D7D5]/40 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-3 text-xs text-[#1A2E2B]">
          {applications.length > 0 ? (
            applications.map((app) => (
              <div key={app.id} className="bg-[#F4F8F7] border border-[#C9D7D5] p-4 rounded-xl space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-[#1A2E2B] text-sm font-serif">{app.schemeTitle}</h3>
                    <div className="text-[#797E89] text-[11px] mt-0.5">
                      Primary Applicant: <strong className="text-[#1A2E2B]">{app.primaryApplicantName}</strong>
                    </div>
                  </div>

                  <span className="bg-amber-100 text-amber-800 font-bold px-2.5 py-0.5 rounded-full text-[10px] shrink-0 border border-amber-200">
                    {app.status}
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] pt-2 border-t border-[#C9D7D5]/60 text-[#797E89]">
                  <div>
                    Ref ID: <strong className="font-mono text-[#3B7E76]">{app.referenceNumber}</strong>
                  </div>

                  <div>
                    Applied: {new Date(app.appliedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                </div>

                {app.selectedFamilyMembers.length > 0 && (
                  <div className="pt-1 text-[11px]">
                    <span className="text-[#797E89] font-medium block mb-1">Group Beneficiaries:</span>
                    <div className="flex flex-wrap gap-1">
                      {app.selectedFamilyMembers.map((m, idx) => (
                        <span key={idx} className="bg-[#83C0AD]/20 text-[#3B7E76] px-2 py-0.5 rounded-md font-semibold">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-[#797E89] space-y-2">
              <Clock className="w-8 h-8 text-[#C9D7D5] mx-auto" />
              <p>No applications submitted yet. Browse schemes and click "Get Details to Apply".</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#C9D7D5] bg-[#F4F8F7] flex justify-end sticky bottom-0">
          <button
            onClick={() => setIsApplicationsModalOpen(false)}
            className="text-xs font-bold bg-[#3B7E76] text-white px-5 py-2 rounded-xl"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
