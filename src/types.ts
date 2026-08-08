export type Language = 'en' | 'hi' | 'kn' | 'te' | 'ta' | 'mr' | 'bn';

export interface UserDocument {
  id: string;
  docType: 'Aadhaar Card' | 'PAN Card' | 'Income Certificate' | 'Ration Card' | 'Domicile Certificate' | 'Bank Passbook' | 'Land Document / Khasra' | 'Other';
  docNumber: string;
  fileUrl: string; // base64 or photo URL
  uploadedAt: string;
  status: 'Verified' | 'Uploaded';
  requiredReason: string;
}

export interface UserProfile {
  username: string;
  fullName: string;
  dob: string;
  income: number;
  aadhaarMasked: string; // XXXX-XXXX-1234
  occupation: string;
  maritalStatus: 'Single' | 'Married' | 'Widowed' | 'Divorced';
  state: string;
  district: string;
  photoUrl?: string | null;
  rationCardNumber?: string;
  documents?: UserDocument[];
}

export interface FamilyMember {
  id: string;
  name: string;
  relation: 'Spouse' | 'Child' | 'Parent' | 'Sibling' | 'Dependent' | 'Other';
  age: number;
  aadhaarMasked: string;
  income: number;
  occupation: string;
}

export interface Scheme {
  id: string;
  title: string;
  department: string;
  state_or_central: 'Central' | string; // Central or State Name (e.g. Karnataka)
  district?: string;
  category: 'Agriculture' | 'Healthcare' | 'Education' | 'Women & Child' | 'Housing & Urban' | 'Financial Inclusion' | 'Employment & Skilling' | 'Social Security';
  summary_simplified: string;
  benefits: string;
  eligibility_criteria: string[];
  required_documents: string[];
  official_link: string;
  annual_income_limit?: number;
  target_gender?: 'All' | 'Female' | 'Male';
  target_occupation?: string;
  last_updated: string;
  isNew?: boolean;
}

export interface GrievanceReport {
  id: string;
  schemeId: string;
  schemeTitle: string;
  citizenName: string;
  issueType: 'Eligibility Rejection' | 'Delayed Processing' | 'Portal Defect' | 'Document Rejection' | 'Corrupt Practice / Fraud' | 'Other';
  description: string;
  status: 'Submitted' | 'In Review' | 'Resolved';
  createdAt: string;
}

export interface SchemeApplication {
  id: string;
  schemeId: string;
  schemeTitle: string;
  appliedByUsername: string;
  primaryApplicantName: string;
  selectedFamilyMembers: string[]; // Names or relations
  isGroupApplication: boolean;
  appliedAt: string;
  status: 'Pending Verification' | 'Document Verification' | 'Approved' | 'Disbursed';
  referenceNumber: string;
}

export interface SyncStatus {
  lastSynced: string;
  totalSchemes: number;
  newInLast24h: number;
  isSyncing: boolean;
  statusMessage: string;
}
