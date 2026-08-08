import { Scheme } from '../types';

export const INITIAL_SCHEMES: Scheme[] = [
  {
    id: 'pm-kisan-01',
    title: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
    department: 'Ministry of Agriculture and Farmers Welfare',
    state_or_central: 'Central',
    category: 'Agriculture',
    summary_simplified: 'Direct income support of ₹6,000 per year paid in three equal installments of ₹2,000 directly into bank accounts of land-holding farmer families.',
    benefits: '₹6,000 annual direct benefit transfer in 3 installments (₹2,000 every 4 months).',
    eligibility_criteria: [
      'Small and marginal farmer families with cultivable land ownership',
      'Valid Aadhaar linked with active bank account',
      'Annual agricultural income under eligible ceiling',
      'Institutional landholders and high-income tax payers excluded'
    ],
    required_documents: [
      'Aadhaar Card',
      'Land Ownership Documents / Khasra-Khatauni',
      'Bank Account Passbook (Aadhaar Seeded)',
      'Active Mobile Number'
    ],
    official_link: 'https://pmkisan.gov.in',
    annual_income_limit: 300000,
    target_gender: 'All',
    target_occupation: 'Farmer',
    last_updated: '2026-08-05T10:00:00Z',
    isNew: false
  },
  {
    id: 'ayushman-bharat-02',
    title: 'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (PM-JAY)',
    department: 'National Health Authority & Ministry of Health',
    state_or_central: 'Central',
    category: 'Healthcare',
    summary_simplified: 'Health coverage up to ₹5 Lakh per family per year for secondary and tertiary care hospitalization in empanelled public and private hospitals.',
    benefits: 'Cashless and paperless hospitalization treatment coverage up to ₹5,000,000 per family annually.',
    eligibility_criteria: [
      'Low-income households categorized under SECC 2011 criteria',
      'Senior citizens aged 70+ (expanded universal coverage)',
      'Ration card holders belonging to BPL / Antyodaya category'
    ],
    required_documents: [
      'Aadhaar Card',
      'Ration Card / Ayushman Household Slip',
      'Income Certificate',
      'Mobile Number'
    ],
    official_link: 'https://pmjay.gov.in',
    annual_income_limit: 250000,
    target_gender: 'All',
    last_updated: '2026-08-06T08:30:00Z',
    isNew: false
  },
  {
    id: 'pm-awas-03',
    title: 'Pradhan Mantri Awas Yojana - Urban & Gramin (PMAY)',
    department: 'Ministry of Housing and Urban Affairs',
    state_or_central: 'Central',
    category: 'Housing & Urban',
    summary_simplified: 'Financial assistance and interest subsidies for constructing or purchasing pucca houses with basic amenities like water, sanitation, and electricity.',
    benefits: 'Direct subsidy up to ₹1.20 Lakh to ₹2.67 Lakh depending on income category (EWS/LIG).',
    eligibility_criteria: [
      'Family must not own a pucca house anywhere in India',
      'EWS annual household income up to ₹3 Lakh; LIG up to ₹6 Lakh',
      'Female ownership or co-ownership of house preferred'
    ],
    required_documents: [
      'Aadhaar Card',
      'Proof of Residence / Property Land Records',
      'Income Certificate from competent authority',
      'Bank Account Details',
      'Self-declaration of not owning a pucca house'
    ],
    official_link: 'https://pmaymis.gov.in',
    annual_income_limit: 600000,
    target_gender: 'All',
    last_updated: '2026-08-04T12:00:00Z'
  },
  {
    id: 'gruha-lakshmi-kn-04',
    title: 'Gruha Lakshmi Scheme (Karnataka State)',
    department: 'Department of Women and Child Development, Karnataka',
    state_or_central: 'Karnataka',
    category: 'Women & Child',
    summary_simplified: 'Financial assistance of ₹2,000 per month provided directly to the woman head of every eligible family in Karnataka.',
    benefits: '₹2,000 monthly direct bank transfer to the female head of household.',
    eligibility_criteria: [
      'Resident of Karnataka State',
      'Woman listed as Head of Household on BPL / APL / Antyodaya Ration Card',
      'Woman or spouse must not be an income tax payer or GST filer'
    ],
    required_documents: [
      'Karnataka Ration Card (BPL/APL)',
      'Aadhaar Card of Female Head',
      'Bank Account Passbook linked with Aadhaar',
      'Aadhaar Card of Husband'
    ],
    official_link: 'https://sevasindhugs.karnataka.gov.in',
    annual_income_limit: 400000,
    target_gender: 'Female',
    last_updated: '2026-08-06T11:15:00Z',
    isNew: true
  },
  {
    id: 'ladli-behna-mp-05',
    title: 'Mukhyamantri Ladli Behna Yojana (Madhya Pradesh)',
    department: 'Women and Child Development Department, MP',
    state_or_central: 'Madhya Pradesh',
    category: 'Women & Child',
    summary_simplified: 'Monthly financial assistance of ₹1,250 to women aged 21 to 60 years to foster economic independence and family health.',
    benefits: 'Direct financial transfer of ₹1,250 per month into beneficiary bank accounts.',
    eligibility_criteria: [
      'Permanent resident woman of Madhya Pradesh',
      'Married, widowed, divorced, or abandoned women aged 21 to 60 years',
      'Annual family income less than ₹2.5 Lakhs'
    ],
    required_documents: [
      'Samagra Family ID and Member ID',
      'Aadhaar Card',
      'Aadhaar Seeded DBT Active Bank Account',
      'Mobile Number'
    ],
    official_link: 'https://cmladlibehna.mp.gov.in',
    annual_income_limit: 250000,
    target_gender: 'Female',
    last_updated: '2026-08-05T14:20:00Z'
  },
  {
    id: 'pm-vishwakarma-06',
    title: 'PM Vishwakarma Scheme',
    department: 'Ministry of Micro, Small and Medium Enterprises',
    state_or_central: 'Central',
    category: 'Employment & Skilling',
    summary_simplified: 'Comprehensive support including toolkit incentive of ₹15,000, skill verification, basic & advanced training, and collateral-free credit support up to ₹3 Lakh at 5% interest for traditional artisans and craftspeople.',
    benefits: '₹15,000 e-voucher for tools, ₹500/day training stipend, low-interest collateral-free loan up to ₹3 Lakh.',
    eligibility_criteria: [
      'Artisan working with hands and tools in 18 specified traditional trades (Carpenter, Blacksmith, Sculptor, Goldsmith, Potter, Cobbler, Tailor, Weaver, etc.)',
      'Minimum age 18 years on date of registration',
      'One member per family eligible'
    ],
    required_documents: [
      'Aadhaar Card',
      'Bank Account Passbook',
      'Skill / Trade Certificate (if available)',
      'Ration Card / Family Proof'
    ],
    official_link: 'https://pmvishwakarma.gov.in',
    annual_income_limit: 350000,
    target_gender: 'All',
    target_occupation: 'Artisan / Skilled Craftsperson',
    last_updated: '2026-08-06T09:00:00Z',
    isNew: true
  },
  {
    id: 'kanya-sumangala-up-07',
    title: 'Mukhya Mantri Kanya Sumangala Yojana (Uttar Pradesh)',
    department: 'Women and Child Development, UP',
    state_or_central: 'Uttar Pradesh',
    category: 'Women & Child',
    summary_simplified: 'Financial grant up to ₹25,000 in six installments provided for girl children from birth through graduation to promote education and welfare.',
    benefits: 'Cumulative cash grant up to ₹25,000 across birth, vaccination, Grade 1, Grade 6, Grade 9, and Degree/Diploma entry.',
    eligibility_criteria: [
      'Resident of Uttar Pradesh',
      'Annual family income maximum ₹3.00 Lakh',
      'Maximum two girl children per family eligible'
    ],
    required_documents: [
      'Birth Certificate of Girl Child',
      'Aadhaar Card of Parents & Girl',
      'UP Domicile Certificate',
      'Income Certificate',
      'School Admission Certificate / Marksheet'
    ],
    official_link: 'https://mksy.up.gov.in',
    annual_income_limit: 300000,
    target_gender: 'Female',
    last_updated: '2026-08-03T16:45:00Z'
  },
  {
    id: 'magalir-urimai-tn-08',
    title: 'Kalaignar Magalir Urimai Thogai Scheme (Tamil Nadu)',
    department: 'Special Programme Implementation Department, Tamil Nadu',
    state_or_central: 'Tamil Nadu',
    category: 'Women & Child',
    summary_simplified: 'Rights grant of ₹1,000 per month to eligible women heads of households in Tamil Nadu.',
    benefits: '₹1,000 monthly entitlement transferred directly to woman head of family.',
    eligibility_criteria: [
      'Resident of Tamil Nadu state',
      'Female head of household aged 21 years and above',
      'Annual family income below ₹2.5 Lakh, annual power consumption below 3,600 units'
    ],
    required_documents: [
      'Tamil Nadu Smart Ration Card',
      'Aadhaar Card',
      'Electricity Bill copy',
      'Bank Account Passbook'
    ],
    official_link: 'https://kmut.tn.gov.in',
    annual_income_limit: 250000,
    target_gender: 'Female',
    last_updated: '2026-08-06T07:10:00Z'
  },
  {
    id: 'mukhya-mantri-yuva-swavalamban-09',
    title: 'Mukhya Mantri Yuva Swavalamban Yojana (MMYSY - Gujarat)',
    department: 'Education Department, Government of Gujarat',
    state_or_central: 'Gujarat',
    category: 'Education',
    summary_simplified: 'Tuition fee scholarship and hostel allowance for meritorious students pursuing higher professional diploma and degree courses.',
    benefits: '50% tuition fee reimbursement up to ₹2 Lakh/year + ₹1,200/month hostel stipend.',
    eligibility_criteria: [
      'Resident student of Gujarat',
      'Scored 80% or above in 10th or 12th board exams',
      'Annual family income less than ₹6 Lakh'
    ],
    required_documents: [
      'Class 10th / 12th Marksheet',
      'Income Certificate from Mamlatdar/Tahsildar',
      'Admission Letter & Fee Receipts',
      'Aadhaar Card & Bank Passbook'
    ],
    official_link: 'https://mysy.guj.nic.in',
    annual_income_limit: 600000,
    target_gender: 'All',
    target_occupation: 'Student',
    last_updated: '2026-08-05T15:00:00Z'
  },
  {
    id: 'pm-svanidhi-10',
    title: 'PM Street Vendor\'s AtmaNirbhar Nidhi (PM SVANidhi)',
    department: 'Ministry of Housing and Urban Affairs',
    state_or_central: 'Central',
    category: 'Financial Inclusion',
    summary_simplified: 'Collateral-free working capital loan up to ₹10,000 to ₹50,000 with 7% interest subsidy for urban and peri-urban street vendors.',
    benefits: 'Step-up working capital loan (₹10k -> ₹20k -> ₹50k) with 7% annual interest subsidy and digital cashback rewards.',
    eligibility_criteria: [
      'Street vendors possessing Vending Certificate / ID Card or listed in Urban Local Body survey',
      'Active digital transaction user gets additional cashback rewards'
    ],
    required_documents: [
      'Aadhaar Card',
      'Vending Certificate / Letter of Recommendation from ULB',
      'Bank Account Number & IFSC'
    ],
    official_link: 'https://pmsvanidhi.mohua.gov.in',
    annual_income_limit: 300000,
    target_gender: 'All',
    target_occupation: 'Street Vendor / Self-Employed',
    last_updated: '2026-08-06T12:00:00Z',
    isNew: true
  },
  {
    id: 'subhadra-odisha-11',
    title: 'Subhadra Yojana (Odisha)',
    department: 'Department of Women and Child Development, Odisha',
    state_or_central: 'Odisha',
    category: 'Women & Child',
    summary_simplified: 'Financial assistance of ₹10,000 annually (₹5,000 on Rakhi Purnima & ₹5,000 on International Women\'s Day) for 5 years to eligible women aged 21 to 60.',
    benefits: 'Total grant of ₹50,000 over 5 years (₹10,000 per year in 2 equal installments).',
    eligibility_criteria: [
      'Woman resident of Odisha state aged between 21 and 60 years',
      'Covered under NFSA / SFSS ration cards',
      'Family must not hold government employment or pay income tax'
    ],
    required_documents: [
      'Aadhaar Card with e-KYC',
      'Odisha Ration Card',
      'Single Bank Account linked with Aadhaar & Mobile'
    ],
    official_link: 'https://subhadra.odisha.gov.in',
    annual_income_limit: 250000,
    target_gender: 'Female',
    last_updated: '2026-08-06T10:45:00Z',
    isNew: true
  },
  {
    id: 'atal-pension-12',
    title: 'Atal Pension Yojana (APY)',
    department: 'Pension Fund Regulatory and Development Authority (PFRDA)',
    state_or_central: 'Central',
    category: 'Social Security',
    summary_simplified: 'Guaranteed pension scheme for unorganized sector workers offering guaranteed minimum pension of ₹1,000 to ₹5,000 per month after age 60.',
    benefits: 'Fixed monthly pension ranging from ₹1,000 to ₹5,000 based on age and contribution.',
    eligibility_criteria: [
      'Indian citizen aged between 18 and 40 years',
      'Must possess savings bank account',
      'Must not be an income taxpayer'
    ],
    required_documents: [
      'Aadhaar Card',
      'Savings Bank Account Passbook',
      'Active Mobile Number'
    ],
    official_link: 'https://npslite-nsdl.com',
    annual_income_limit: 500000,
    target_gender: 'All',
    last_updated: '2026-08-02T11:00:00Z'
  }
];

export const INDIAN_STATES = [
  'All States',
  'Andaman and Nicobar Islands',
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chandigarh',
  'Chhattisgarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jammu and Kashmir',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Ladakh',
  'Lakshadweep',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Puducherry',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal'
];

export const DISTRICTS_BY_STATE: Record<string, string[]> = {
  'Andaman and Nicobar Islands': ['All Districts', 'Nicobar', 'North and Middle Andaman', 'South Andaman'],
  'Andhra Pradesh': ['All Districts', 'Alluri Sitharama Raju', 'Anakapalli', 'Ananthapuramu', 'Annamayya', 'Bapatla', 'Chittoor', 'East Godavari', 'Eluru', 'Guntur', 'Kakinada', 'Konaseema', 'Kurnool', 'Nandyal', 'NTR (Vijayawada)', 'Palnadu', 'Parvathipuram Manyam', 'Prakasam', 'Sri Potti Sriramulu Nellore', 'Sri Sathya Sai', 'Srikakulam', 'Tirupati', 'Visakhapatnam', 'Vizianagaram', 'West Godavari', 'YSR Kadapa'],
  'Arunachal Pradesh': ['All Districts', 'Anjaw', 'Changlang', 'Dibang Valley', 'East Kameng', 'East Siang', 'Itanagar Capital Complex', 'Kamle', 'Kra Daadi', 'Kurung Kumey', 'Lepa Rada', 'Lhit', 'Longding', 'Lower Dibang Valley', 'Lower Subansiri', 'Namsai', 'Pakke Kessang', 'Papum Pare', 'Shi Yomi', 'Siang', 'Tawang', 'Tirap', 'Upper Siang', 'Upper Subansiri', 'West Kameng', 'West Siang'],
  'Assam': ['All Districts', 'Baksa', 'Barpeta', 'Biswanath', 'Bongaigaon', 'Cachar (Silchar)', 'Charaideo', 'Chirang', 'Darrang', 'Dhemaji', 'Dhubri', 'Dibrugarh', 'Dima Hasao', 'Goalpara', 'Golaghat', 'Hailakandi', 'Hojai', 'Jorhat', 'Kamrup Metropolitan (Guwahati)', 'Kamrup Rural', 'Karbi Anglong', 'Karimganj', 'Kokrajhar', 'Lakhimpur', 'Majuli', 'Morigaon', 'Nagaon', 'Nalbari', 'Sivasagar', 'Sonitpur', 'South Salmara-Mankachar', 'Tinsukia', 'Udalguri', 'West Karbi Anglong'],
  'Bihar': ['All Districts', 'Araria', 'Arwal', 'Aurangabad', 'Banka', 'Begusarai', 'Bhagalpur', 'Bhojpur', 'Buxar', 'Darbhanga', 'East Champaran (Motihari)', 'Gaya', 'Gopalganj', 'Jamui', 'Jehanabad', 'Kaimur (Bhabua)', 'Katihar', 'Khagaria', 'Kishanganj', 'Lakhisarai', 'Madhepura', 'Madhubani', 'Munger', 'Muzaffarpur', 'Nalanda (Bihar Sharif)', 'Nawada', 'Patna', 'Purnia', 'Rohtas (Sasaram)', 'Saharsa', 'Samastipur', 'Saran (Chhapra)', 'Sheikhpura', 'Sheohar', 'Sitamarhi', 'Siwan', 'Supaul', 'Vaishali (Hajipur)', 'West Champaran (Bettiah)'],
  'Chandigarh': ['All Districts', 'Chandigarh Urban', 'Chandigarh Rural'],
  'Chhattisgarh': ['All Districts', 'Balod', 'Baloda Bazar', 'Balrampur', 'Bastar (Jagdalpur)', 'Bemetara', 'Bijapur', 'Bilaspur', 'Dantewada', 'Dhamtari', 'Durg (Bhilai)', 'Gariaband', 'Gaurela-Pendra-Marwahi', 'Janjgir-Champa', 'Jashpur', 'Kabirdham (Kawardha)', 'Kanker', 'Khairagarh-Chhuikhadan-Gandai', 'Kondagaon', 'Korba', 'Koriya', 'Mahasamund', 'Manendragarh-Chirmiri-Bharatpur', 'Mohla-Manpur-Ambagarh Chowk', 'Mungeli', 'Narayanpur', 'Raigarh', 'Raipur', 'Rajnandgaon', 'Sarangarh-Bilaigarh', 'Sakti', 'Sukma', 'Surajpur', 'Surguja (Ambikapur)'],
  'Dadra and Nagar Haveli and Daman and Diu': ['All Districts', 'Dadra and Nagar Haveli (Silvassa)', 'Daman', 'Diu'],
  'Delhi': ['All Districts', 'Central Delhi', 'East Delhi', 'New Delhi', 'North Delhi', 'North East Delhi', 'North West Delhi', 'Shahdara', 'South Delhi', 'South East Delhi', 'South West Delhi', 'West Delhi'],
  'Goa': ['All Districts', 'North Goa (Panaji)', 'South Goa (Margao)'],
  'Gujarat': ['All Districts', 'Ahmedabad', 'Amreli', 'Anand', 'Aravalli', 'Banaskantha', 'Bharuch', 'Bhavnagar', 'Botad', 'Chhota Udaipur', 'Dahod', 'Dang', 'Devbhumi Dwarka', 'Gandhinagar', 'Gir Somnath', 'Jamnagar', 'Junagadh', 'Kheda', 'Kutch (Bhuj)', 'Mahisagar', 'Mehsana', 'Morbi', 'Narmada', 'Navsari', 'Panchmahal', 'Patan', 'Porbandar', 'Rajkot', 'Sabarkantha', 'Surat', 'Surendranagar', 'Tapi', 'Vadodara', 'Valsad'],
  'Haryana': ['All Districts', 'Ambala', 'Bhiwani', 'Charkhi Dadri', 'Faridabad', 'Fatehabad', 'Gurugram', 'Hisar', 'Jhajjar', 'Jind', 'Kaithal', 'Karnal', 'Kurukshetra', 'Mahendragarh', 'Nuh (Mewat)', 'Palwal', 'Panchkula', 'Panipat', 'Rewari', 'Rohtak', 'Sirsa', 'Sonipat', 'Yamunanagar'],
  'Himachal Pradesh': ['All Districts', 'Bilaspur', 'Chamba', 'Hamirpur', 'Kangra (Dharamshala)', 'Kinnaur', 'Kullu', 'Lahaul and Spiti', 'Mandi', 'Shimla', 'Sirmaur', 'Solan', 'Una'],
  'Jammu and Kashmir': ['All Districts', 'Anantnag', 'Bandipora', 'Baramulla', 'Budgam', 'Doda', 'Ganderbal', 'Jammu', 'Kathua', 'Kishtwar', 'Kulgam', 'Kupwara', 'Poonch', 'Pulwama', 'Rajouri', 'Ramban', 'Reasi', 'Samba', 'Shopian', 'Srinagar', 'Udhampur'],
  'Jharkhand': ['All Districts', 'Bokaro', 'Chatra', 'Deoghar', 'Dhanbad', 'Dumka', 'East Singhbhum (Jamshedpur)', 'Garhwa', 'Giridih', 'Godda', 'Gumla', 'Hazaribagh', 'Jamtara', 'Khunti', 'Koderma', 'Latehar', 'Lohardaga', 'Pakur', 'Palamu', 'Ramgarh', 'Ranchi', 'Sahibganj', 'Seraikela Kharsawan', 'Simdega', 'West Singhbhum (Chaibasa)'],
  'Karnataka': ['All Districts', 'Bagalkote', 'Ballari', 'Belagavi', 'Bengaluru Rural', 'Bengaluru Urban', 'Bidar', 'Chamarajanagara', 'Chikkaballapura', 'Chikkamagaluru', 'Chitradurga', 'Dakshina Kannada (Mangaluru)', 'Davanagere', 'Dharwad (Hubballi)', 'Gadag', 'Hassan', 'Haveri', 'Kalaburagi', 'Kodagu (Madikeri)', 'Kolar', 'Koppala', 'Mandya', 'Mysuru', 'Raichur', 'Ramanagara', 'Shivamogga', 'Tumakuru', 'Udupi', 'Uttara Kannada (Karwar)', 'Vijayanagara', 'Vijayapura', 'Yadgir'],
  'Kerala': ['All Districts', 'Alappuzha', 'Ernakulam (Kochi)', 'Idukki', 'Kannur', 'Kasaragod', 'Kollam', 'Kottayam', 'Kozhikode', 'Malappuram', 'Palakkad', 'Pathanamthitta', 'Thiruvananthapuram', 'Thrissur', 'Wayanad'],
  'Ladakh': ['All Districts', 'Kargil', 'Leh'],
  'Lakshadweep': ['All Districts', 'Agatti', 'Amini', 'Andrott', 'Kavaratti', 'Minicoy'],
  'Madhya Pradesh': ['All Districts', 'Agar Malwa', 'Alirajpur', 'Anuppur', 'Ashoknagar', 'Balaghat', 'Barwani', 'Betul', 'Bhind', 'Bhopal', 'Burhanpur', 'Chhatarpur', 'Chhindwara', 'Damoh', 'Datia', 'Dewas', 'Dhar', 'Dindori', 'Guna', 'Gwalior', 'Harda', 'Hoshangabad (Narmadapuram)', 'Indore', 'Jabalpur', 'Jhabua', 'Katni', 'Khandwa', 'Khargone', 'Mandla', 'Mandsaur', 'Morena', 'Narsinghpur', 'Neemuch', 'Niwari', 'Panna', 'Raisen', 'Rajgarh', 'Ratlam', 'Rewa', 'Sagar', 'Satna', 'Sehore', 'Seoni', 'Shahdol', 'Shajapur', 'Sheopur', 'Shivpuri', 'Sidhi', 'Singrauli', 'Tikamgarh', 'Ujjain', 'Umaria', 'Vidisha'],
  'Maharashtra': ['All Districts', 'Ahilyanagar (Ahmednagar)', 'Akola', 'Amravati', 'Beed', 'Bhandara', 'Buldhana', 'Chandrapur', 'Chhatrapati Sambhajinagar (Aurangabad)', 'Dharashiv (Osmanabad)', 'Dhule', 'Gadchiroli', 'Gondia', 'Hingoli', 'Jalgaon', 'Jalna', 'Kolhapur', 'Latur', 'Mumbai City', 'Mumbai Suburban', 'Nagpur', 'Nanded', 'Nandurbar', 'Nashik', 'Palghar', 'Parbhani', 'Pune', 'Raigad (Alibag)', 'Ratnagiri', 'Sangli', 'Satara', 'Sindhudurg', 'Solapur', 'Thane', 'Wardha', 'Washim', 'Yavatmal'],
  'Manipur': ['All Districts', 'Bishnupur', 'Chandel', 'Churachandpur', 'Imphal East', 'Imphal West', 'Jiribam', 'Kakching', 'Kamjong', 'Kangpokpi', 'Noney', 'Pherzawl', 'Senapati', 'Tamenglong', 'Tengnoupal', 'Thoubal', 'Ukhrul'],
  'Meghalaya': ['All Districts', 'East Garo Hills', 'East Jaintia Hills', 'East Khasi Hills (Shillong)', 'Eastern West Khasi Hills', 'North Garo Hills', 'Ri-Bhoi', 'South Garo Hills', 'South West Garo Hills', 'South West Khasi Hills', 'West Garo Hills (Tura)', 'West Jaintia Hills', 'West Khasi Hills'],
  'Mizoram': ['All Districts', 'Aizawl', 'Champhai', 'Hnahthial', 'Khawzawl', 'Kolasib', 'Lawngtlai', 'Lunglei', 'Mamit', 'Saitual', 'Seraichhip', 'Siaha'],
  'Nagaland': ['All Districts', 'Chümoukedima', 'Dimapur', 'Kiphire', 'Kohima', 'Longleng', 'Mokokchung', 'Mon', 'Niuland', 'Noklak', 'Peren', 'Phek', 'Shamator', 'Tseminyu', 'Tuensang', 'Wokha', 'Zunheboto'],
  'Odisha': ['All Districts', 'Angul', 'Balangir', 'Balasore', 'Bargarh', 'Bhadrak', 'Boudh', 'Cuttack', 'Deogarh', 'Dhenkanal', 'Gajapati', 'Ganjam (Berhampur)', 'Jagatsinghpur', 'Jajpur', 'Jharsuguda', 'Kalahandi', 'Kandhamal', 'Kendrapara', 'Keonjhar', 'Khordha (Bhubaneswar)', 'Koraput', 'Malkangiri', 'Mayurbhanj', 'Nabarangpur', 'Nayagarh', 'Nuapada', 'Puri', 'Rayagada', 'Sambalpur', 'Subarnapur', 'Sundargarh (Rourkela)'],
  'Puducherry': ['All Districts', 'Karaikal', 'Mahe', 'Puducherry', 'Yanam'],
  'Punjab': ['All Districts', 'Amritsar', 'Barnala', 'Bathinda', 'Faridkot', 'Fatehgarh Sahib', 'Fazilka', 'Firozpur', 'Gurdaspur', 'Hoshiarpur', 'Jalandhar', 'Kapurthala', 'Ludhiana', 'Malerkotla', 'Mansa', 'Moga', 'Pathankot', 'Patiala', 'Rupnagar (Ropar)', 'Sahibzada Ajit Singh Nagar (Mohali)', 'Sangrur', 'Shahid Bhagat Singh Nagar (Nawanshahr)', 'Sri Muktsar Sahib', 'Tarn Taran'],
  'Rajasthan': ['All Districts', 'Ajmer', 'Alwar', 'Banswara', 'Baran', 'Barmer', 'Bharatpur', 'Bhilwara', 'Bikaner', 'Bundi', 'Chittorgarh', 'Churu', 'Dausa', 'Dholpur', 'Dungarpur', 'Hanumangarh', 'Jaipur', 'Jaisalmer', 'Jalore', 'Jhalawar', 'Jhunjhunu', 'Jodhpur', 'Karauli', 'Kota', 'Nagaur', 'Pali', 'Pratapgarh', 'Rajsamand', 'Sawai Madhopur', 'Sikar', 'Sirohi', 'Sri Ganganagar', 'Tonk', 'Udaipur'],
  'Sikkim': ['All Districts', 'Gangtok (East Sikkim)', 'Gyalshing (West Sikkim)', 'Mangan (North Sikkim)', 'Namchi (South Sikkim)', 'Pakyong', 'Soreng'],
  'Tamil Nadu': ['All Districts', 'Ariyalur', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore', 'Dharmapuri', 'Dindigul', 'Erode', 'Kallakurichi', 'Kanchipuram', 'Kanyakumari (Nagercoil)', 'Karur', 'Krishnagiri', 'Madurai', 'Mayiladuthurai', 'Nagapattinam', 'Namakkal', 'Nilgiris (Ooty)', 'Perambalur', 'Pudukkottai', 'Ramanathapuram', 'Ranipet', 'Salem', 'Sivaganga', 'Tenkasi', 'Thanjavur', 'Theni', 'Thoothukudi', 'Tiruchirappalli (Trichy)', 'Tirunelveli', 'Tirupathur', 'Tiruppur', 'Tiruvallur', 'Tiruvannamalai', 'Tiruvarur', 'Vellore', 'Viluppuram', 'Virudhunagar'],
  'Telangana': ['All Districts', 'Adilabad', 'Bhadradri Kothagudem', 'Hanumakonda', 'Hyderabad', 'Jagtial', 'Jangaon', 'Jayashankar Bhupalpally', 'Jogulamba Gadwal', 'Kamareddy', 'Karimnagar', 'Khammam', 'Kumuram Bheem Asifabad', 'Mahabubabad', 'Mahabubnagar', 'Mancherial', 'Medak', 'Medchal-Malkajgiri', 'Mulugu', 'Nagarkurnool', 'Nalgonda', 'Narayanpet', 'Nirmal', 'Nizamabad', 'Peddapalli', 'Rajanna Sircilla', 'Rangareddy', 'Sangareddy', 'Siddipet', 'Suryapet', 'Vikarabad', 'Wanaparthy', 'Warangal', 'Yadadri Bhuvanagiri'],
  'Tripura': ['All Districts', 'Dhalai', 'Gomati', 'Khowai', 'North Tripura', 'Sepahijala', 'South Tripura', 'Unakoti', 'West Tripura (Agartala)'],
  'Uttar Pradesh': ['All Districts', 'Agra', 'Aligarh', 'Ambedkar Nagar', 'Amethi', 'Amroha', 'Auraiya', 'Ayodhya', 'Azamgarh', 'Baghpat', 'Bahraich', 'Ballia', 'Balrampur', 'Banda', 'Barabanki', 'Bareilly', 'Basti', 'Bhadohi', 'Bijnor', 'Budaun', 'Bulandshahr', 'Chandauli', 'Chitrakoot', 'Deoria', 'Etah', 'Etawah', 'Farrukhabad', 'Fatehpur', 'Firozabad', 'Gautam Buddha Nagar (Noida)', 'Ghaziabad', 'Ghazipur', 'Gonda', 'Gorakhpur', 'Hamirpur', 'Hapur', 'Hardoi', 'Hathras', 'Jalaun', 'Jaunpur', 'Jhansi', 'Kannauj', 'Kanpur Dehat', 'Kanpur Nagar', 'Kasganj', 'Kaushambi', 'Kheri (Lakhimpur)', 'Kushinagar', 'Lalitpur', 'Lucknow', 'Maharajganj', 'Mahoba', 'Mainpuri', 'Mathura', 'Mau', 'Meerut', 'Mirzapur', 'Moradabad', 'Muzaffarnagar', 'Pilibhit', 'Pratapgarh', 'Prayagraj (Allahabad)', 'Raebareli', 'Rampur', 'Saharanpur', 'Sambhal', 'Sant Kabir Nagar', 'Shahjahanpur', 'Shamli', 'Shravasti', 'Siddharthnagar', 'Sitapur', 'Sonbhadra', 'Sultanpur', 'Unnao', 'Varanasi'],
  'Uttarakhand': ['All Districts', 'Almora', 'Bageshwar', 'Chamoli', 'Champawat', 'Dehradun', 'Haridwar', 'Nainital', 'Pauri Garhwal', 'Pithoragarh', 'Rudraprayag', 'Tehri Garhwal', 'Udham Singh Nagar (Rudrapur)', 'Uttarkashi'],
  'West Bengal': ['All Districts', 'Alipurduar', 'Bankura', 'Birbhum', 'Cooch Behar', 'Dakshin Dinajpur', 'Darjeeling', 'Hooghly', 'Howrah', 'Jalpaiguri', 'Jhargram', 'Kalimpong', 'Kolkata', 'Malda', 'Murshidabad', 'Nadia', 'North 24 Parganas', 'Paschim Bardhaman', 'Paschim Medinipur', 'Purba Bardhaman', 'Purba Medinipur', 'Purulia', 'South 24 Parganas', 'Siliguri', 'Uttar Dinajpur']
};
