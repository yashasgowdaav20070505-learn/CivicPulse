import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { INDIAN_STATES, DISTRICTS_BY_STATE } from '../data/mockSchemes';
import { FamilyMember, UserDocument } from '../types';
import {
  X,
  User,
  Users,
  Upload,
  Trash2,
  Edit2,
  Check,
  CreditCard,
  Plus,
  LogOut,
  ShieldCheck,
  FileText,
  Camera,
  Video,
  FileCheck2,
  Info,
  ExternalLink,
  ShieldAlert,
  Globe,
  Image as ImageIcon
} from 'lucide-react';

export const ProfileDrawer: React.FC = () => {
  const {
    user,
    familyMembers,
    isProfileDrawerOpen,
    setIsProfileDrawerOpen,
    updateProfile,
    uploadPhoto,
    deletePhoto,
    addDocument,
    deleteDocument,
    addFamilyMember,
    deleteFamilyMember,
    linkRationCard,
    logout,
    setIsApplicationsModalOpen,
    selectedLanguage,
    setSelectedLanguage,
    t
  } = useApp();

  const [isEditingProfile, setIsEditingProfile] = useState<boolean>(false);
  const [editedIncome, setEditedIncome] = useState<number>(user?.income || 250000);
  const [editedOccupation, setEditedOccupation] = useState<string>(user?.occupation || '');
  const [editedMarital, setEditedMarital] = useState<'Single' | 'Married' | 'Widowed' | 'Divorced'>(user?.maritalStatus || 'Married');
  const [editedState, setEditedState] = useState<string>(user?.state || 'Karnataka');
  const [editedDistrict, setEditedDistrict] = useState<string>(user?.district || 'Bengaluru Urban');

  // Photo URL modal state
  const [newPhotoUrl, setNewPhotoUrl] = useState<string>('');
  const [showPhotoInput, setShowPhotoInput] = useState<boolean>(false);

  // Ration Card state
  const [rationInput, setRationInput] = useState<string>(user?.rationCardNumber || '');

  // Add Family Member Modal
  const [showAddFamily, setShowAddFamily] = useState<boolean>(false);
  const [famName, setFamName] = useState<string>('');
  const [famRelation, setFamRelation] = useState<'Spouse' | 'Child' | 'Parent' | 'Sibling' | 'Dependent' | 'Other'>('Spouse');
  const [famAge, setFamAge] = useState<number>(30);
  const [famAadhaar, setFamAadhaar] = useState<string>('XXXX-XXXX-1234');
  const [famIncome, setFamIncome] = useState<number>(0);
  const [famOccupation, setFamOccupation] = useState<string>('Homemaker / Dependent');

  // Document Upload & Camera State
  const [showDocModal, setShowDocModal] = useState<boolean>(false);
  const [docType, setDocType] = useState<UserDocument['docType']>('Aadhaar Card');
  const [docNumber, setDocNumber] = useState<string>('');
  const [docFileUrl, setDocFileUrl] = useState<string>('');
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  // Camera stream cleanup
  useEffect(() => {
    return () => {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      setIsCameraActive(true);
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      mediaStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      console.warn('Camera access error:', err);
      alert('Could not access device camera. Please upload an image file instead.');
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const takePhotoSnapshot = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setDocFileUrl(dataUrl);
        stopCamera();
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDocFileUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docFileUrl) {
      alert('Please select a photo file or snap a camera picture of your document.');
      return;
    }

    const reasonsMap: Record<UserDocument['docType'], string> = {
      'Aadhaar Card': 'Required for Direct Benefit Transfer (DBT) and biometric authentication',
      'PAN Card': 'Required for business grants, PM-SVANidhi loans, and tax-exempt subsidies',
      'Income Certificate': 'Verifies household income eligibility limit for BPL subsidies',
      'Ration Card': 'Links family members for subsidized food grain and state welfare',
      'Domicile Certificate': 'Proves state residency for state-sponsored welfare schemes',
      'Bank Passbook': 'Confirms bank account & IFSC code for direct cash transfer',
      'Land Document / Khasra': 'Required for PM-Kisan & agricultural equipment subsidies',
      'Other': 'Supporting government identification photocopy'
    };

    addDocument({
      docType,
      docNumber: docNumber.trim() || 'DOC-VERIFIED-2026',
      fileUrl: docFileUrl,
      requiredReason: reasonsMap[docType] || 'Required for scheme application verification'
    });

    setShowDocModal(false);
    setDocNumber('');
    setDocFileUrl('');
    stopCamera();
  };

  if (!isProfileDrawerOpen || !user) return null;

  const handleSaveProfile = () => {
    updateProfile({
      income: Number(editedIncome),
      occupation: editedOccupation,
      maritalStatus: editedMarital,
      state: editedState,
      district: editedDistrict
    });
    setIsEditingProfile(false);
  };

  const handleAddPhotoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPhotoUrl.trim()) {
      uploadPhoto(newPhotoUrl);
      setShowPhotoInput(false);
      setNewPhotoUrl('');
    }
  };

  const handleAddFamilySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (famName.trim()) {
      addFamilyMember({
        name: famName,
        relation: famRelation,
        age: Number(famAge),
        aadhaarMasked: famAadhaar.startsWith('XXXX') ? famAadhaar : `XXXX-XXXX-${famAadhaar.slice(-4)}`,
        income: Number(famIncome),
        occupation: famOccupation
      });
      setShowAddFamily(false);
      setFamName('');
    }
  };

  const handleRationSave = () => {
    linkRationCard(rationInput);
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-xs flex justify-end">
      <div className="bg-[#FFFFFF] border-l border-[#C9D7D5] w-full max-w-lg h-full overflow-y-auto shadow-2xl flex flex-col justify-between">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#C9D7D5] bg-[#F4F8F7] flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#3B7E76]" />
            <h2 className="text-base font-bold text-[#1A2E2B] font-serif">Citizen Profile & Family</h2>
          </div>

          <button
            onClick={() => setIsProfileDrawerOpen(false)}
            className="text-[#797E89] hover:text-[#1A2E2B] p-1.5 rounded-xl hover:bg-[#C9D7D5]/40 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="p-6 space-y-6 text-xs text-[#1A2E2B]">
          
          {/* User Photo & Monogram Section */}
          <div className="flex items-center gap-4 bg-[#F4F8F7] p-4 rounded-2xl border border-[#C9D7D5]">
            <div className="relative shrink-0">
              {user.photoUrl ? (
                <img
                  src={user.photoUrl}
                  alt={user.fullName}
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#83C0AD] shadow-xs"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-[#3B7E76] text-white font-bold text-2xl flex items-center justify-center shadow-xs">
                  {user.fullName.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-base font-bold text-[#1A2E2B] truncate">{user.fullName}</h3>
              <p className="text-[11px] text-[#797E89] truncate">Aadhaar: {user.aadhaarMasked}</p>

              {/* Photo Management Buttons */}
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => setShowPhotoInput(!showPhotoInput)}
                  className="text-[11px] font-semibold text-[#3B7E76] bg-[#83C0AD]/20 hover:bg-[#83C0AD]/40 px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors"
                >
                  <Upload className="w-3 h-3" />
                  <span>{user.photoUrl ? 'Change Photo' : 'Upload Photo'}</span>
                </button>

                {user.photoUrl && (
                  <button
                    onClick={deletePhoto}
                    className="text-[11px] font-semibold text-red-600 bg-red-50 hover:bg-red-100 px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Delete Photo</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Photo URL Input Modal Row */}
          {showPhotoInput && (
            <form onSubmit={handleAddPhotoSubmit} className="bg-[#F4F8F7] p-3 rounded-xl border border-[#C9D7D5] space-y-2">
              <label className="block font-bold text-[#1A2E2B]">Enter Custom Photo Image URL:</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newPhotoUrl}
                  onChange={(e) => setNewPhotoUrl(e.target.value)}
                  placeholder="https://..."
                  required
                  className="flex-1 bg-white border border-[#C9D7D5] rounded-xl px-3 py-1.5 text-xs text-[#1A2E2B]"
                />
                <button
                  type="submit"
                  className="bg-[#3B7E76] text-white px-3 py-1.5 rounded-xl font-bold"
                >
                  Save
                </button>
              </div>
            </form>
          )}

          {/* Website Preferred Language Selector */}
          <div className="bg-[#83C0AD]/15 border border-[#83C0AD]/40 rounded-2xl p-3.5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#3B7E76]" />
              <div>
                <span className="font-bold text-xs text-[#1A2E2B] block">Website Language</span>
                <span className="text-[10px] text-[#797E89]">Select your preferred regional bhasha</span>
              </div>
            </div>

            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value as any)}
              className="bg-white border border-[#3B7E76] font-bold text-xs text-[#3B7E76] rounded-xl px-3 py-1.5 focus:outline-none cursor-pointer shadow-xs"
            >
              <option value="en">English (English)</option>
              <option value="hi">हिंदी (Hindi)</option>
              <option value="kn">ಕನ್ನಡ (Kannada)</option>
              <option value="te">తెలుగు (Telugu)</option>
              <option value="ta">தமிழ் (Tamil)</option>
              <option value="mr">मराठी (Marathi)</option>
              <option value="bn">বাংলা (Bengali)</option>
            </select>
          </div>

          {/* Edit Profile Form or View */}
          <div className="bg-white border border-[#C9D7D5] rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-[#F4F8F7] pb-2">
              <h4 className="font-bold text-[#1A2E2B] text-xs uppercase tracking-wider text-[#3B7E76]">
                Personal Profile Details
              </h4>
              {!isEditingProfile ? (
                <button
                  onClick={() => {
                    setEditedIncome(user.income);
                    setEditedOccupation(user.occupation);
                    setEditedMarital(user.maritalStatus);
                    setEditedState(user.state);
                    setEditedDistrict(user.district);
                    setIsEditingProfile(true);
                  }}
                  className="text-[11px] font-bold text-[#3B7E76] hover:underline flex items-center gap-1"
                >
                  <Edit2 className="w-3 h-3" />
                  <span>Edit Profile</span>
                </button>
              ) : (
                <button
                  onClick={handleSaveProfile}
                  className="text-[11px] font-bold text-white bg-[#3B7E76] px-3 py-1 rounded-lg flex items-center gap-1"
                >
                  <Check className="w-3 h-3" />
                  <span>Save Changes</span>
                </button>
              )}
            </div>

            {isEditingProfile ? (
              <div className="space-y-2.5">
                <div>
                  <label className="block text-[11px] font-bold text-[#797E89] mb-0.5">Annual Income (₹):</label>
                  <input
                    type="number"
                    value={editedIncome}
                    onChange={(e) => setEditedIncome(Number(e.target.value))}
                    className="w-full bg-[#F4F8F7] border border-[#C9D7D5] rounded-xl p-2 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#797E89] mb-0.5">Occupation:</label>
                  <input
                    type="text"
                    value={editedOccupation}
                    onChange={(e) => setEditedOccupation(e.target.value)}
                    className="w-full bg-[#F4F8F7] border border-[#C9D7D5] rounded-xl p-2 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#797E89] mb-0.5">Marital Status:</label>
                  <select
                    value={editedMarital}
                    onChange={(e) => setEditedMarital(e.target.value as any)}
                    className="w-full bg-[#F4F8F7] border border-[#C9D7D5] rounded-xl p-2 text-xs"
                  >
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Widowed">Widowed</option>
                    <option value="Divorced">Divorced</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-[#797E89] mb-0.5">State:</label>
                    <select
                      value={editedState}
                      onChange={(e) => setEditedState(e.target.value)}
                      className="w-full bg-[#F4F8F7] border border-[#C9D7D5] rounded-xl p-2 text-xs"
                    >
                      {INDIAN_STATES.filter(s => s !== 'All States').map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#797E89] mb-0.5">District:</label>
                    <select
                      value={editedDistrict}
                      onChange={(e) => setEditedDistrict(e.target.value)}
                      className="w-full bg-[#F4F8F7] border border-[#C9D7D5] rounded-xl p-2 text-xs"
                    >
                      {(DISTRICTS_BY_STATE[editedState] || ['All Districts']).map(d => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-[#F4F8F7] p-2.5 rounded-xl">
                  <span className="text-[#797E89] block text-[10px]">Annual Income</span>
                  <strong className="text-[#1A2E2B]">₹{user.income.toLocaleString('en-IN')}</strong>
                </div>

                <div className="bg-[#F4F8F7] p-2.5 rounded-xl">
                  <span className="text-[#797E89] block text-[10px]">Occupation</span>
                  <strong className="text-[#1A2E2B] truncate block">{user.occupation}</strong>
                </div>

                <div className="bg-[#F4F8F7] p-2.5 rounded-xl">
                  <span className="text-[#797E89] block text-[10px]">Marital Status</span>
                  <strong className="text-[#1A2E2B]">{user.maritalStatus}</strong>
                </div>

                <div className="bg-[#F4F8F7] p-2.5 rounded-xl">
                  <span className="text-[#797E89] block text-[10px]">State & District</span>
                  <strong className="text-[#1A2E2B] truncate block">{user.state}, {user.district}</strong>
                </div>
              </div>
            )}
          </div>

          {/* Ration Card Linkage Section */}
          <div className="bg-white border border-[#C9D7D5] rounded-2xl p-4 space-y-2">
            <h4 className="font-bold text-[#1A2E2B] text-xs uppercase tracking-wider text-[#3B7E76] flex items-center gap-1.5">
              <CreditCard className="w-4 h-4 text-[#3B7E76]" />
              <span>Ration Card Linkage</span>
            </h4>

            <div className="flex gap-2">
              <input
                type="text"
                value={rationInput}
                onChange={(e) => setRationInput(e.target.value)}
                placeholder="Enter Household Ration Card No."
                className="flex-1 bg-[#F4F8F7] border border-[#C9D7D5] rounded-xl px-3 py-1.5 text-xs text-[#1A2E2B]"
              />
              <button
                onClick={handleRationSave}
                className="bg-[#3B7E76] hover:bg-[#2F6861] text-white px-3 py-1.5 rounded-xl font-bold text-xs cursor-pointer"
              >
                Link Card
              </button>
            </div>
            {user.rationCardNumber && (
              <p className="text-[11px] text-[#3B7E76] font-medium">
                ✓ Linked Card: <strong>{user.rationCardNumber}</strong>
              </p>
            )}
          </div>

          {/* Uploaded Government Photocopies & Documents Section */}
          <div className="bg-white border border-[#C9D7D5] rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-[#F4F8F7] pb-2">
              <h4 className="font-bold text-[#1A2E2B] text-xs uppercase tracking-wider text-[#3B7E76] flex items-center gap-1.5">
                <FileCheck2 className="w-4 h-4 text-[#3B7E76]" />
                <span>Uploaded Government Documents ({(user.documents || []).length})</span>
              </h4>

              <button
                onClick={() => setShowDocModal(true)}
                className="text-[11px] font-bold text-white bg-[#3B7E76] hover:bg-[#2F6861] px-2.5 py-1 rounded-lg flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3 h-3" />
                <span>Add / Capture Document</span>
              </button>
            </div>

            {/* Instruction Banner on Required Documents */}
            <div className="bg-[#83C0AD]/15 border border-[#83C0AD]/40 p-3 rounded-xl space-y-1 text-[11px]">
              <div className="font-bold text-[#1A2E2B] flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-[#3B7E76]" />
                <span>Why documents are required for application approval:</span>
              </div>
              <ul className="list-disc pl-4 space-y-0.5 text-[#797E89] text-[10.5px]">
                <li><strong>Aadhaar Card:</strong> Required for Direct Benefit Transfer (DBT) bank cash deposits.</li>
                <li><strong>Income Certificate:</strong> Proves annual household income eligibility (e.g., ≤ ₹{user.income.toLocaleString('en-IN')}).</li>
                <li><strong>PAN Card:</strong> Needed for MSME loans, PM-SVANidhi, and financial grants.</li>
                <li><strong>Ration Card / Domicile:</strong> Validates family member count and state residence.</li>
              </ul>
            </div>

            {/* List of Uploaded Documents */}
            {(user.documents || []).length > 0 ? (
              <div className="space-y-2">
                {(user.documents || []).map((doc) => (
                  <div key={doc.id} className="flex items-start justify-between bg-[#F4F8F7] p-3 rounded-xl border border-[#C9D7D5] gap-3">
                    <div className="flex gap-3">
                      <img
                        src={doc.fileUrl}
                        alt={doc.docType}
                        className="w-12 h-12 rounded-lg object-cover border border-[#C9D7D5] bg-white shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-[#1A2E2B] text-xs">{doc.docType}</span>
                          <span className="bg-[#83C0AD]/20 text-[#3B7E76] text-[9px] font-bold px-1.5 py-0.2 rounded-full border border-[#83C0AD]/40">
                            {doc.status}
                          </span>
                        </div>
                        <div className="text-[10px] text-[#797E89] font-mono mt-0.5">No: {doc.docNumber}</div>
                        <p className="text-[10px] text-[#3B7E76] mt-0.5">{doc.requiredReason}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => deleteDocument(doc.id)}
                      className="text-red-600 hover:text-red-800 p-1 rounded-lg hover:bg-red-50 transition-colors shrink-0"
                      title="Remove document photocopy"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-3 text-center text-[#797E89] text-xs bg-[#F4F8F7] rounded-xl">
                No documents uploaded yet. Click "Add / Capture Document" to snap or upload a copy.
              </div>
            )}
          </div>

          {/* Add / Capture Document Modal */}
          {showDocModal && (
            <form onSubmit={handleSaveDocument} className="bg-[#F4F8F7] p-4 rounded-2xl border border-[#C9D7D5] space-y-3">
              <div className="flex items-center justify-between border-b border-[#C9D7D5] pb-2">
                <h5 className="font-bold text-[#1A2E2B] text-xs flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-[#3B7E76]" />
                  <span>Upload or Snap Document Photocopy</span>
                </h5>
                <button
                  type="button"
                  onClick={() => {
                    setShowDocModal(false);
                    stopCamera();
                  }}
                  className="text-[#797E89] hover:text-[#1A2E2B]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2">
                <div>
                  <label className="block text-[10px] font-bold text-[#797E89] mb-0.5">Document Type *</label>
                  <select
                    value={docType}
                    onChange={(e) => setDocType(e.target.value as any)}
                    className="w-full bg-white border border-[#C9D7D5] rounded-xl p-2 text-xs text-[#1A2E2B]"
                  >
                    <option value="Aadhaar Card">Aadhaar Card</option>
                    <option value="PAN Card">PAN Card</option>
                    <option value="Income Certificate">Income Certificate</option>
                    <option value="Ration Card">Ration Card</option>
                    <option value="Domicile Certificate">Domicile Certificate</option>
                    <option value="Bank Passbook">Bank Passbook / Statement</option>
                    <option value="Land Document / Khasra">Land Document / Khasra</option>
                    <option value="Other">Other ID Proof</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#797E89] mb-0.5">Document ID / Number (Optional)</label>
                  <input
                    type="text"
                    value={docNumber}
                    onChange={(e) => setDocNumber(e.target.value)}
                    placeholder="e.g. XXXX-XXXX-8421 or Cert No."
                    className="w-full bg-white border border-[#C9D7D5] rounded-xl p-2 text-xs"
                  />
                </div>

                {/* Photo Source Options */}
                <div className="space-y-2 pt-1">
                  <label className="block text-[10px] font-bold text-[#797E89]">Document Image Photocopy *</label>
                  
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={startCamera}
                      className="flex-1 bg-[#3B7E76] hover:bg-[#2F6861] text-white py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Camera className="w-4 h-4" />
                      <span>Take Direct Photo</span>
                    </button>

                    <label className="flex-1 bg-white hover:bg-[#C9D7D5]/20 text-[#3B7E76] border border-[#C9D7D5] py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer text-center">
                      <Upload className="w-4 h-4" />
                      <span>Upload File</span>
                      <input
                        type="file"
                        accept="image/*,application/pdf"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Camera Live Feed Viewport */}
                  {isCameraActive && (
                    <div className="relative bg-black rounded-2xl overflow-hidden mt-2 p-1 border-2 border-[#83C0AD]">
                      <video ref={videoRef} className="w-full h-48 object-cover rounded-xl" autoPlay playsInline />
                      <canvas ref={canvasRef} className="hidden" />

                      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-3">
                        <button
                          type="button"
                          onClick={takePhotoSnapshot}
                          className="bg-[#3B7E76] text-white px-4 py-1.5 rounded-xl font-bold text-xs shadow-lg flex items-center gap-1 cursor-pointer"
                        >
                          <Camera className="w-4 h-4" />
                          <span>Snap Snapshot</span>
                        </button>
                        <button
                          type="button"
                          onClick={stopCamera}
                          className="bg-red-600 text-white px-3 py-1.5 rounded-xl font-bold text-xs shadow-lg cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Captured / Uploaded Image Preview */}
                  {docFileUrl && !isCameraActive && (
                    <div className="mt-2 bg-white p-2 rounded-xl border border-[#C9D7D5] flex items-center gap-3">
                      <img src={docFileUrl} alt="Document Preview" className="w-16 h-16 rounded-lg object-cover border" />
                      <div>
                        <span className="text-xs font-bold text-[#3B7E76] block">✓ Photocopy Attached</span>
                        <span className="text-[10px] text-[#797E89]">Ready for verification and submission</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowDocModal(false);
                    stopCamera();
                  }}
                  className="px-3 py-1.5 text-xs text-[#797E89]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#3B7E76] text-white px-4 py-1.5 rounded-xl font-bold text-xs cursor-pointer"
                >
                  Save Document
                </button>
              </div>
            </form>
          )}

          {/* Family Members Management */}
          <div className="bg-white border border-[#C9D7D5] rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-[#F4F8F7] pb-2">
              <h4 className="font-bold text-[#1A2E2B] text-xs uppercase tracking-wider text-[#3B7E76] flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#3B7E76]" />
                <span>Family Members ({familyMembers.length})</span>
              </h4>

              <button
                onClick={() => setShowAddFamily(true)}
                className="text-[11px] font-bold text-white bg-[#3B7E76] hover:bg-[#2F6861] px-2.5 py-1 rounded-lg flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3 h-3" />
                <span>Add Member</span>
              </button>
            </div>

            {/* List of family members */}
            {familyMembers.length > 0 ? (
              <div className="space-y-2">
                {familyMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between bg-[#F4F8F7] p-3 rounded-xl border border-[#C9D7D5]">
                    <div>
                      <div className="font-bold text-[#1A2E2B]">{member.name}</div>
                      <div className="text-[11px] text-[#797E89]">
                        {member.relation} • {member.age} yrs • {member.occupation}
                      </div>
                      <div className="text-[10px] text-[#797E89] font-mono">Aadhaar: {member.aadhaarMasked}</div>
                    </div>

                    <button
                      onClick={() => deleteFamilyMember(member.id)}
                      className="text-red-600 hover:text-red-800 p-1 rounded-lg hover:bg-red-50 transition-colors"
                      title="Delete family member"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-3 text-center text-[#797E89] text-xs">
                No family members linked yet. Click "Add Member" to link dependents.
              </div>
            )}
          </div>

          {/* Add Family Member Modal Form */}
          {showAddFamily && (
            <form onSubmit={handleAddFamilySubmit} className="bg-[#F4F8F7] p-4 rounded-2xl border border-[#C9D7D5] space-y-3">
              <h5 className="font-bold text-[#1A2E2B] text-xs">Add Family Dependent</h5>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-[#797E89]">Full Name *</label>
                  <input
                    type="text"
                    value={famName}
                    onChange={(e) => setFamName(e.target.value)}
                    required
                    placeholder="Member Name"
                    className="w-full bg-white border border-[#C9D7D5] rounded-xl p-1.5 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#797E89]">Relation *</label>
                  <select
                    value={famRelation}
                    onChange={(e) => setFamRelation(e.target.value as any)}
                    className="w-full bg-white border border-[#C9D7D5] rounded-xl p-1.5 text-xs"
                  >
                    <option value="Spouse">Spouse</option>
                    <option value="Child">Child</option>
                    <option value="Parent">Parent</option>
                    <option value="Sibling">Sibling</option>
                    <option value="Dependent">Dependent</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#797E89]">Age *</label>
                  <input
                    type="number"
                    value={famAge}
                    onChange={(e) => setFamAge(Number(e.target.value))}
                    required
                    className="w-full bg-white border border-[#C9D7D5] rounded-xl p-1.5 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#797E89]">Aadhaar (Masked) *</label>
                  <input
                    type="text"
                    value={famAadhaar}
                    onChange={(e) => setFamAadhaar(e.target.value)}
                    required
                    placeholder="XXXX-XXXX-1234"
                    className="w-full bg-white border border-[#C9D7D5] rounded-xl p-1.5 text-xs"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddFamily(false)}
                  className="px-3 py-1.5 text-xs text-[#797E89]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#3B7E76] text-white px-4 py-1.5 rounded-xl font-bold text-xs"
                >
                  Save Member
                </button>
              </div>
            </form>
          )}

        </div>

        {/* Drawer Footer Actions */}
        <div className="p-4 border-t border-[#C9D7D5] bg-[#F4F8F7] flex items-center justify-between sticky bottom-0">
          <button
            onClick={() => {
              setIsProfileDrawerOpen(false);
              setIsApplicationsModalOpen(true);
            }}
            className="text-xs font-bold text-[#3B7E76] bg-[#C9D7D5]/40 hover:bg-[#C9D7D5] px-3.5 py-2 rounded-xl flex items-center gap-1.5"
          >
            <FileText className="w-4 h-4" />
            <span>Track Applications</span>
          </button>

          <button
            onClick={logout}
            className="text-xs font-semibold text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>

      </div>
    </div>
  );
};
