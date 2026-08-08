import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, FamilyMember, Scheme, GrievanceReport, SchemeApplication, SyncStatus, Language, UserDocument } from '../types';
import { TRANSLATIONS } from '../translations';
import { INITIAL_SCHEMES } from '../data/mockSchemes';

interface AppContextType {
  user: UserProfile | null;
  familyMembers: FamilyMember[];
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authMode: 'login' | 'register';
  setAuthMode: (mode: 'login' | 'register') => void;
  isProfileDrawerOpen: boolean;
  setIsProfileDrawerOpen: (open: boolean) => void;
  selectedLanguage: Language;
  setSelectedLanguage: (lang: Language) => void;
  t: (key: string) => string;
  selectedState: string;
  setSelectedState: (state: string) => void;
  selectedDistrict: string;
  setSelectedDistrict: (district: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  schemes: Scheme[];
  syncStatus: SyncStatus;
  triggerSchemeSync: () => Promise<void>;
  
  // Auth & Profile methods
  login: (username: string, password: string) => boolean;
  register: (profile: UserProfile) => void;
  logout: () => void;
  updateProfile: (updated: Partial<UserProfile>) => void;
  uploadPhoto: (photoUrl: string) => void;
  deletePhoto: () => void;
  addDocument: (doc: Omit<UserDocument, 'id' | 'uploadedAt' | 'status'>) => void;
  deleteDocument: (id: string) => void;
  
  // Family methods
  addFamilyMember: (member: Omit<FamilyMember, 'id'>) => void;
  deleteFamilyMember: (id: string) => void;
  linkRationCard: (cardNumber: string) => void;
  
  // Grievance & Application methods
  submitGrievance: (schemeId: string, schemeTitle: string, issueType: string, description: string) => Promise<string>;
  submitApplication: (schemeId: string, schemeTitle: string, selectedFamilyMemberIds: string[], isGroupApp: boolean) => Promise<SchemeApplication>;
  applications: SchemeApplication[];
  
  // Modals state
  activeDetailScheme: Scheme | null;
  setActiveDetailScheme: (scheme: Scheme | null) => void;
  activeApplyScheme: Scheme | null;
  setActiveApplyScheme: (scheme: Scheme | null) => void;
  activeReportScheme: Scheme | null;
  setActiveReportScheme: (scheme: Scheme | null) => void;
  isApplicationsModalOpen: boolean;
  setIsApplicationsModalOpen: (open: boolean) => void;
  activeTab: 'schemes' | 'offices' | 'applications';
  setActiveTab: (tab: 'schemes' | 'offices' | 'applications') => void;
  themeMode: 'default' | 'negative' | 'blueWhite';
  setThemeMode: (mode: 'default' | 'negative' | 'blueWhite') => void;
  fontScale: 'normal' | 'medium' | 'large';
  setFontScale: (scale: 'normal' | 'medium' | 'large') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEMO_USER: UserProfile = {
  username: 'ramesh_k',
  fullName: 'Ramesh Kumar',
  dob: '1988-05-14',
  income: 220000,
  aadhaarMasked: 'XXXX-XXXX-8421',
  occupation: 'Farmer / Small Tradesman',
  maritalStatus: 'Married',
  state: 'Karnataka',
  district: 'Bengaluru Urban',
  rationCardNumber: 'KA-BPL-2024-99881',
  photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
  documents: [
    {
      id: 'doc-01',
      docType: 'Aadhaar Card',
      docNumber: 'XXXX-XXXX-8421',
      fileUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=400',
      uploadedAt: '2026-08-01T10:00:00Z',
      status: 'Verified',
      requiredReason: 'Required for Direct Benefit Transfer (DBT) and Universal Identification'
    },
    {
      id: 'doc-02',
      docType: 'Income Certificate',
      docNumber: 'INC-KA-2024-8871',
      fileUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=400',
      uploadedAt: '2026-08-03T14:30:00Z',
      status: 'Verified',
      requiredReason: 'Required for Income Limit & BPL Welfare Subsidy eligibility'
    }
  ]
};

const DEMO_FAMILY: FamilyMember[] = [
  {
    id: 'fam-01',
    name: 'Sunita Kumar',
    relation: 'Spouse',
    age: 34,
    aadhaarMasked: 'XXXX-XXXX-1123',
    income: 0,
    occupation: 'Homemaker'
  },
  {
    id: 'fam-02',
    name: 'Aarav Kumar',
    relation: 'Child',
    age: 10,
    aadhaarMasked: 'XXXX-XXXX-4432',
    income: 0,
    occupation: 'Student'
  }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(DEMO_USER);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>(DEMO_FAMILY);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('en');
  
  const [selectedState, setSelectedState] = useState<string>('All States');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All Districts');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const [schemes, setSchemes] = useState<Scheme[]>(INITIAL_SCHEMES);
  const [applications, setApplications] = useState<SchemeApplication[]>([]);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    lastSynced: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    totalSchemes: INITIAL_SCHEMES.length,
    newInLast24h: 3,
    isSyncing: false,
    statusMessage: 'Database Sync: Active — Updated 24h automatically from State & Central Portals'
  });

  const [activeDetailScheme, setActiveDetailScheme] = useState<Scheme | null>(null);
  const [activeApplyScheme, setActiveApplyScheme] = useState<Scheme | null>(null);
  const [activeReportScheme, setActiveReportScheme] = useState<Scheme | null>(null);
  const [isApplicationsModalOpen, setIsApplicationsModalOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'schemes' | 'offices' | 'applications'>('schemes');
  const [themeMode, setThemeMode] = useState<'default' | 'negative' | 'blueWhite'>('default');
  const [fontScale, setFontScale] = useState<'normal' | 'medium' | 'large'>('normal');

  // Accessibility theme effect
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('theme-negative', 'theme-blue-white');
    if (themeMode === 'negative') {
      root.classList.add('theme-negative');
    } else if (themeMode === 'blueWhite') {
      root.classList.add('theme-blue-white');
    }
  }, [themeMode]);

  // Accessibility font scale effect
  useEffect(() => {
    const root = document.documentElement;
    if (fontScale === 'normal') {
      root.style.fontSize = '16px';
    } else if (fontScale === 'medium') {
      root.style.fontSize = '18.4px';
    } else if (fontScale === 'large') {
      root.style.fontSize = '20.8px';
    }
  }, [fontScale]);

  // Translation helper
  const t = (key: string): string => {
    return TRANSLATIONS[selectedLanguage]?.[key] || TRANSLATIONS['en']?.[key] || key;
  };

  // Fetch schemes from backend API on mount
  useEffect(() => {
    fetchSchemes();
  }, [selectedState, selectedDistrict, selectedCategory, searchQuery]);

  const fetchSchemes = async () => {
    try {
      const params = new URLSearchParams();
      if (selectedState !== 'All States') params.append('state', selectedState);
      if (selectedDistrict !== 'All Districts') params.append('district', selectedDistrict);
      if (selectedCategory !== 'All') params.append('category', selectedCategory);
      if (searchQuery) params.append('search', searchQuery);

      const res = await fetch(`/api/schemes?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setSchemes(data.schemes || []);
        if (data.syncStatus) {
          setSyncStatus(data.syncStatus);
        }
      }
    } catch (err) {
      console.error('Error fetching schemes from server:', err);
    }
  };

  const triggerSchemeSync = async () => {
    try {
      setSyncStatus(prev => ({ ...prev, isSyncing: true }));
      const res = await fetch('/api/schemes/sync', { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        if (data.schemes) {
          setSchemes(data.schemes);
        }
        if (data.syncStatus) {
          setSyncStatus(data.syncStatus);
        }
      }
    } catch (err) {
      console.error('Sync failed:', err);
      setSyncStatus(prev => ({ ...prev, isSyncing: false }));
    }
  };

  // Auth Functions
  const login = (username: string, _password: string): boolean => {
    // Demo login accepts any password or demo user
    if (username.trim()) {
      setUser({
        ...DEMO_USER,
        username,
        fullName: username === 'ramesh_k' ? 'Ramesh Kumar' : username
      });
      setIsAuthModalOpen(false);
      return true;
    }
    return false;
  };

  const register = (profile: UserProfile) => {
    setUser(profile);
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setUser(null);
    setIsProfileDrawerOpen(false);
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    if (user) {
      setUser({ ...user, ...updated });
    }
  };

  const uploadPhoto = (photoUrl: string) => {
    if (user) {
      setUser({ ...user, photoUrl });
    }
  };

  const deletePhoto = () => {
    if (user) {
      setUser({ ...user, photoUrl: null });
    }
  };

  const addDocument = (doc: Omit<UserDocument, 'id' | 'uploadedAt' | 'status'>) => {
    if (user) {
      const newDoc: UserDocument = {
        ...doc,
        id: `doc-${Date.now()}`,
        uploadedAt: new Date().toISOString(),
        status: 'Verified'
      };
      const existingDocs = user.documents || [];
      setUser({
        ...user,
        documents: [newDoc, ...existingDocs]
      });
    }
  };

  const deleteDocument = (id: string) => {
    if (user && user.documents) {
      setUser({
        ...user,
        documents: user.documents.filter(d => d.id !== id)
      });
    }
  };

  const addFamilyMember = (member: Omit<FamilyMember, 'id'>) => {
    const newMem: FamilyMember = {
      ...member,
      id: `fam-${Date.now()}`
    };
    setFamilyMembers(prev => [...prev, newMem]);
  };

  const deleteFamilyMember = (id: string) => {
    setFamilyMembers(prev => prev.filter(m => m.id !== id));
  };

  const linkRationCard = (cardNumber: string) => {
    if (user) {
      setUser({ ...user, rationCardNumber: cardNumber });
    }
  };

  const submitGrievance = async (schemeId: string, schemeTitle: string, issueType: string, description: string): Promise<string> => {
    try {
      const res = await fetch('/api/grievances', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          schemeId,
          schemeTitle,
          citizenName: user?.fullName || 'Citizen',
          issueType,
          description
        })
      });
      const data = await res.json();
      return data.report?.id || 'GRV-RECORDED';
    } catch (e) {
      return `GRV-${Date.now().toString().slice(-6)}`;
    }
  };

  const submitApplication = async (
    schemeId: string,
    schemeTitle: string,
    selectedFamilyMemberIds: string[],
    isGroupApp: boolean
  ): Promise<SchemeApplication> => {
    const memberNames = familyMembers
      .filter(m => selectedFamilyMemberIds.includes(m.id))
      .map(m => `${m.name} (${m.relation})`);

    const payload = {
      schemeId,
      schemeTitle,
      username: user?.username || 'guest',
      primaryApplicantName: user?.fullName || 'Citizen',
      selectedFamilyMembers: memberNames,
      isGroupApplication: isGroupApp
    };

    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      const app = data.application;
      setApplications(prev => [app, ...prev]);
      return app;
    } catch (e) {
      const fallbackApp: SchemeApplication = {
        id: `APP-${Date.now().toString().slice(-6)}`,
        schemeId,
        schemeTitle,
        appliedByUsername: user?.username || 'guest',
        primaryApplicantName: user?.fullName || 'Citizen',
        selectedFamilyMembers: memberNames,
        isGroupApplication: isGroupApp,
        appliedAt: new Date().toISOString(),
        status: 'Pending Verification',
        referenceNumber: `IND-GOV-${Math.floor(10000000 + Math.random() * 90000000)}`
      };
      setApplications(prev => [fallbackApp, ...prev]);
      return fallbackApp;
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        familyMembers,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authMode,
        setAuthMode,
        isProfileDrawerOpen,
        setIsProfileDrawerOpen,
        selectedLanguage,
        setSelectedLanguage,
        t,
        selectedState,
        setSelectedState,
        selectedDistrict,
        setSelectedDistrict,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        schemes,
        syncStatus,
        triggerSchemeSync,
        login,
        register,
        logout,
        updateProfile,
        uploadPhoto,
        deletePhoto,
        addDocument,
        deleteDocument,
        addFamilyMember,
        deleteFamilyMember,
        linkRationCard,
        submitGrievance,
        submitApplication,
        applications,
        activeDetailScheme,
        setActiveDetailScheme,
        activeApplyScheme,
        setActiveApplyScheme,
        activeReportScheme,
        setActiveReportScheme,
        isApplicationsModalOpen,
        setIsApplicationsModalOpen,
        activeTab,
        setActiveTab,
        themeMode,
        setThemeMode,
        fontScale,
        setFontScale
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
