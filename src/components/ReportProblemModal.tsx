import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, AlertTriangle, CheckCircle2, Send, ShieldAlert } from 'lucide-react';

export const ReportProblemModal: React.FC = () => {
  const { activeReportScheme, setActiveReportScheme, submitGrievance, user } = useApp();

  const [issueType, setIssueType] = useState<string>('Eligibility Rejection');
  const [description, setDescription] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  if (!activeReportScheme) return null;

  const scheme = activeReportScheme;

  const ISSUE_TYPES = [
    'Eligibility Rejection',
    'Delayed Processing',
    'Portal Technical Defect',
    'Document Rejection Issue',
    'Corrupt Practice / Extortion / Fraud',
    'Other Service Grievance'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setIsSubmitting(true);
    const trackingId = await submitGrievance(
      scheme.id,
      scheme.title,
      issueType,
      description
    );
    setIsSubmitting(false);
    setSubmittedId(trackingId);
  };

  const handleClose = () => {
    setActiveReportScheme(null);
    setSubmittedId(null);
    setDescription('');
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FFFFFF] border border-[#C9D7D5] rounded-2xl w-full max-w-lg shadow-xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b border-[#C9D7D5] bg-[#F4F8F7] flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-red-100 text-red-700 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#1A2E2B] font-serif leading-tight">
                Report Problem for Scheme
              </h2>
              <p className="text-xs text-[#797E89] truncate max-w-xs">{scheme.title}</p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="text-[#797E89] hover:text-[#1A2E2B] p-1.5 rounded-xl hover:bg-[#C9D7D5]/40 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {submittedId ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-lg font-bold text-[#1A2E2B] font-serif">
              Grievance Registered Successfully
            </h3>

            <p className="text-xs text-[#797E89] max-w-xs mx-auto">
              Your report regarding <strong className="text-[#1A2E2B]">{scheme.title}</strong> has been escalated to the public grievance officer.
            </p>

            <div className="bg-[#F4F8F7] border border-[#C9D7D5] p-3 rounded-xl text-xs font-mono font-bold text-[#3B7E76] max-w-xs mx-auto">
              Tracking Ticket ID: {submittedId}
            </div>

            <button
              onClick={handleClose}
              className="text-xs font-bold bg-[#3B7E76] hover:bg-[#2F6861] text-white px-6 py-2.5 rounded-xl transition-all"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs text-[#1A2E2B]">
            
            {/* Issue Category */}
            <div>
              <label className="block font-bold text-[#1A2E2B] mb-1">Select Issue Category:</label>
              <select
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
                className="w-full bg-[#F4F8F7] border border-[#C9D7D5] rounded-xl p-2.5 font-medium text-[#1A2E2B] focus:outline-none focus:border-[#3B7E76]"
              >
                {ISSUE_TYPES.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Problem Description */}
            <div>
              <label className="block font-bold text-[#1A2E2B] mb-1">
                Describe the problem or grievance in detail:
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Explain what happened (e.g. application rejected without reason, portal server down, bribe demand, wrong eligibility status)..."
                rows={4}
                required
                className="w-full bg-[#F4F8F7] border border-[#C9D7D5] rounded-xl p-3 font-normal text-[#1A2E2B] focus:outline-none focus:border-[#3B7E76] placeholder-[#797E89]"
              />
            </div>

            {/* Reporter Profile Info */}
            <div className="p-3 bg-[#F4F8F7] rounded-xl border border-[#C9D7D5]/60 text-[11px] text-[#797E89]">
              Submitted by: <strong className="text-[#1A2E2B]">{user?.fullName || 'Citizen'}</strong> ({user?.state || 'State Resident'})
            </div>

            {/* Footer Buttons */}
            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={handleClose}
                className="font-semibold px-4 py-2 text-[#797E89] hover:text-[#1A2E2B]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !description.trim()}
                className="font-bold bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl shadow-xs flex items-center gap-1.5 transition-all disabled:opacity-50 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Submitting...' : 'Lodge Grievance'}</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
