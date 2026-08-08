import { DISTRICTS_BY_STATE } from '../data/mockSchemes';

export interface DistrictOffice {
  id: string;
  name: string;
  department: string;
  address: string;
  district: string;
  state: string;
  phone: string;
  email: string;
  hours: string;
  nodalOfficer: string;
  mapQuery: string;
  distanceKm: number;
}

// Known specific landmark administrative addresses for key districts
const SPECIFIC_DISTRICT_ADDRESSES: Record<string, { address: string; phone: string; officer: string }> = {
  'Bengaluru Urban': {
    address: 'District Collectorate Complex, KG Road, Near Majestic, Ward 24, Bengaluru, Karnataka - 560009',
    phone: '+91 80 2221 1100',
    officer: 'Shri K. V. Sharma (IAS, District Magistrate)'
  },
  'Bengaluru Rural': {
    address: 'DC Office Complex, Visvesvaraya Tower Podia, Devanahalli Main Road, Bengaluru Rural, Karnataka - 562110',
    phone: '+91 80 2768 4411',
    officer: 'Smt. R. Archana (IAS, Deputy Commissioner)'
  },
  'Mysuru': {
    address: 'Deputy Commissioner Office, Krishnaraja Boulevard, Near Crawford Hall, Mysuru, Karnataka - 570005',
    phone: '+91 821 242 2100',
    officer: 'Shri Dr. K. V. Rajendra (IAS, DC)'
  },
  'Mumbai City': {
    address: 'Old Custom House, Shahid Bhagat Singh Road, Fort, Mumbai, Maharashtra - 400001',
    phone: '+91 22 2266 2440',
    officer: 'Shri Rajiv Nivatkar (IAS, Collector Mumbai City)'
  },
  'Mumbai Suburban': {
    address: 'Administrative Building, 10th Floor, Government Colony, Bandra East, Mumbai, Maharashtra - 400051',
    phone: '+91 22 2655 8312',
    officer: 'Shri Rajendra Kshirsagar (IAS, Collector Suburban)'
  },
  'Pune': {
    address: 'District Collectorate, Bund Garden Road, Opposite Residency Club, Camp, Pune, Maharashtra - 411001',
    phone: '+91 20 2612 3370',
    officer: 'Shri Dr. Suhas Diwase (IAS, Collector)'
  },
  'Thane': {
    address: 'District Collectorate Building, Court Naka, Near Kalwa Bridge, Thane West, Maharashtra - 400601',
    phone: '+91 22 2534 4001',
    officer: 'Shri Ashok Shingare (IAS, Collector)'
  },
  'New Delhi': {
    address: '12/1, Jam Nagar House, Shahjahan Road, Near India Gate, New Delhi - 110011',
    phone: '+91 11 2338 6922',
    officer: 'Shri Santosh Kumar (IAS, District Magistrate)'
  },
  'Central Delhi': {
    address: '14, Daryaganj, Near Golcha Cinema, New Delhi - 110002',
    phone: '+91 11 2327 5000',
    officer: 'Smt. Vandana Rao (IAS, District Magistrate)'
  },
  'South Delhi': {
    address: 'MB Road, Saket, Opposite District Court, New Delhi - 110017',
    phone: '+91 11 2953 5000',
    officer: 'Shri Ankita Anand (IAS, DM South Delhi)'
  },
  'Gautam Buddha Nagar (Noida)': {
    address: 'District Magistrate Office, Surajpur Collectorate, Greater Noida, Uttar Pradesh - 201306',
    phone: '+91 120 235 0100',
    officer: 'Shri Manish Kumar Verma (IAS, DM Noida)'
  },
  'Lucknow': {
    address: 'District Collectorate Compound, Hazratganj, Near KD Singh Babu Stadium, Lucknow, Uttar Pradesh - 226001',
    phone: '+91 522 223 9001',
    officer: 'Shri Surya Pal Gangwar (IAS, DM Lucknow)'
  },
  'Kanpur Nagar': {
    address: 'Collectorate Building, VIP Road, Civil Lines, Kanpur, Uttar Pradesh - 208001',
    phone: '+91 512 230 4001',
    officer: 'Shri Rakesh Kumar Singh (IAS, DM Kanpur)'
  },
  'Varanasi': {
    address: 'District Magistrate Office, Kacheri Compound, Chowka Ghat, Varanasi, Uttar Pradesh - 221002',
    phone: '+91 542 250 2001',
    officer: 'Shri S. Rajalingam (IAS, DM Varanasi)'
  },
  'Hyderabad': {
    address: 'District Collectorate Office, Nampally Station Road, Abids, Hyderabad, Telangana - 500001',
    phone: '+91 40 2320 2833',
    officer: 'Shri Anudeep Durishetty (IAS, Collector)'
  },
  'Rangareddy': {
    address: 'Integrated District Offices Complex (IDOC), Kongara Kalan, Ibrahimpatnam, Rangareddy, Telangana - 501510',
    phone: '+91 8414 200 100',
    officer: 'Shri K. Shashanka (IAS, Collector)'
  },
  'Chennai': {
    address: 'District Collectorate, Singaravelar Maaligai, 62 Rajaji Salai, George Town, Chennai, Tamil Nadu - 600001',
    phone: '+91 44 2526 8320',
    officer: 'Shri Rashmi Siddharth Zagade (IAS, Collector)'
  },
  'Coimbatore': {
    address: 'District Collectorate, State Bank Road, Opposite Railway Station, Coimbatore, Tamil Nadu - 641018',
    phone: '+91 422 230 1114',
    officer: 'Shri Kranti Kumar Pati (IAS, Collector)'
  },
  'Ahmedabad': {
    address: 'District Collector Office, Near Subhash Bridge, Ashram Road, Ahmedabad, Gujarat - 380027',
    phone: '+91 79 2755 1681',
    officer: 'Shri Pravina D. K. (IAS, District Collector)'
  },
  'Surat': {
    address: 'District Collectorate, Bahumali Building, Nanpura, Surat, Gujarat - 395001',
    phone: '+91 261 246 3200',
    officer: 'Shri Sourabh Pardhi (IAS, Collector)'
  },
  'Jaipur': {
    address: 'District Collectorate Campus, Bani Park, Near Railway Station, Jaipur, Rajasthan - 302016',
    phone: '+91 141 220 2200',
    officer: 'Shri Prakash Rajpurohit (IAS, Collector Jaipur)'
  },
  'Patna': {
    address: 'District Collectorate Office, Bank Road, Near Gandhi Maidan, Patna, Bihar - 800001',
    phone: '+91 612 221 9200',
    officer: 'Shri Dr. Chandrashekhar Singh (IAS, DM Patna)'
  },
  'Kolkata': {
    address: 'Office of the District Magistrate & Collector, 11A, Mirza Ghalib Street, Kolkata, West Bengal - 700087',
    phone: '+91 33 2252 0200',
    officer: 'Shri A. K. Basu (IAS, Collector Kolkata)'
  },
  'Bhubaneswar': {
    address: 'District Collectorate Khurda, BJB Nagar, Bhubaneswar, Odisha - 751014',
    phone: '+91 674 243 0100',
    officer: 'Shri Chanchal Rana (IAS, Collector Khurda)'
  },
  'Khurda (Bhubaneswar)': {
    address: 'District Collectorate Khurda, BJB Nagar, Bhubaneswar, Odisha - 751014',
    phone: '+91 674 243 0100',
    officer: 'Shri Chanchal Rana (IAS, Collector Khurda)'
  },
  'Kamrup Metropolitan (Guwahati)': {
    address: 'District Collectorate Office, Hengrabari, Guwahati, Assam - 781036',
    phone: '+91 361 223 7000',
    officer: 'Shri Sumit Sattawan (IAS, DC Kamrup Metro)'
  },
  'Raipur': {
    address: 'District Collectorate, Ghadi Chowk, Raipur, Chhattisgarh - 492001',
    phone: '+91 771 242 4000',
    officer: 'Shri Gaurav Kumar Singh (IAS, Collector Raipur)'
  },
  'Bhopal': {
    address: 'Collectorate Campus, VIP Road, Near Kohefiza, Bhopal, Madhya Pradesh - 462001',
    phone: '+91 755 270 1100',
    officer: 'Shri Kaushalendra Vikram Singh (IAS, Collector Bhopal)'
  },
  'Gurugram': {
    address: 'Mini Secretariat, Rajiv Chowk, Sector 12, Gurugram, Haryana - 122001',
    phone: '+91 124 232 5500',
    officer: 'Shri Nishant Kumar Yadav (IAS, DC Gurugram)'
  },
  'Chandigarh Urban': {
    address: 'Deputy Commissioner Office, Sector 17E, Chandigarh - 160017',
    phone: '+91 172 270 0101',
    officer: 'Shri Vinay Pratap Singh (IAS, DC Chandigarh)'
  },
  'Ranchi': {
    address: 'District Collectorate, Block A, Kutchery Chowk, Ranchi, Jharkhand - 834001',
    phone: '+91 651 221 4001',
    officer: 'Shri Rahul Kumar Sinha (IAS, DC Ranchi)'
  },
  'Thiruvananthapuram': {
    address: 'District Collectorate, Civil Station, Kudappanakkunnu, Thiruvananthapuram, Kerala - 695043',
    phone: '+91 471 273 1200',
    officer: 'Shri Geromic George (IAS, Collector)'
  },
  'Ernakulam (Kochi)': {
    address: 'District Collectorate, Civil Station, Kakkanad, Kochi, Kerala - 682030',
    phone: '+91 484 242 3001',
    officer: 'Shri N. S. K. Umesh (IAS, Collector Ernakulam)'
  },
  'Shimla': {
    address: 'District Collectorate, The Mall Road, Below District Court, Shimla, Himachal Pradesh - 171001',
    phone: '+91 177 265 5001',
    officer: 'Shri Anupam Kashyap (IAS, DC Shimla)'
  },
  'Dehradun': {
    address: 'District Magistrate Office, Collectorate Compound, Rajpur Road, Dehradun, Uttarakhand - 248001',
    phone: '+91 135 262 2000',
    officer: 'Smt. Sonika (IAS, DM Dehradun)'
  },
  'Srinagar': {
    address: 'District Development Commissioner Office, Tankipora, Civil Lines, Srinagar, J&K - 190001',
    phone: '+91 194 245 2182',
    officer: 'Shri Bilal Mohi-ud-Din Bhat (IAS, DC Srinagar)'
  },
  'Jammu': {
    address: 'District Magistrate Office, Wazarat Road, Near DC Complex, Jammu - 180001',
    phone: '+91 191 254 2000',
    officer: 'Shri Sachin Kumar Vaishya (IAS, DC Jammu)'
  }
};

/**
 * Helper to retrieve or construct administrative office locations for ANY district in India.
 */
export function getOfficesForDistrict(state: string, district: string): DistrictOffice[] {
  // Normalize parameters
  const cleanState = state === 'All States' ? 'Karnataka' : state;
  const stateDistricts = DISTRICTS_BY_STATE[cleanState] || ['All Districts'];
  
  let targetDistricts: string[] = [];
  if (district === 'All Districts' || !district) {
    // Exclude 'All Districts' string itself
    targetDistricts = stateDistricts.filter(d => d !== 'All Districts');
  } else {
    targetDistricts = [district];
  }

  const results: DistrictOffice[] = [];

  targetDistricts.forEach((distName, index) => {
    // Check if we have specific custom landmark data
    const specific = SPECIFIC_DISTRICT_ADDRESSES[distName];
    
    // Deterministic phone generator
    const getHashNum = (seed: string) => {
      let hash = 0;
      for (let i = 0; i < seed.length; i++) {
        hash = (hash << 5) - hash + seed.charCodeAt(i);
        hash |= 0;
      }
      return Math.abs(hash);
    };

    const hashVal = getHashNum(distName);
    const defaultDcPhone = `+91 ${7000000000 + (hashVal % 2000000000)}`;
    const defaultTehsilPhone = `+91 ${8000000000 + ((hashVal + 100) % 1000000000)}`;
    const defaultAgriPhone = `+91 ${9000000000 + ((hashVal + 200) % 900000000)}`;

    // Office 1: District Collectorate / Magistrate Office
    const dcAddress = specific 
      ? specific.address 
      : `District Magistrate & Collectorate Complex, Civil Lines / Main Administrative Area, ${distName}, ${cleanState}`;
    
    const dcPhone = specific ? specific.phone : defaultDcPhone;
    const dcOfficer = specific ? specific.officer : `Shri/Smt. Administrative Nodal Officer (IAS, DM ${distName})`;

    results.push({
      id: `off-dc-${cleanState}-${distName}`.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      name: `${distName} District Magistrate & Collectorate Complex`,
      department: 'District Revenue & Public Grievances',
      address: dcAddress,
      district: distName,
      state: cleanState,
      phone: dcPhone,
      email: `dc.${distName.toLowerCase().replace(/[^a-z0-9]/g, '')}@${cleanState.toLowerCase().replace(/[^a-z0-9]/g, '')}.gov.in`,
      hours: '09:30 AM - 05:30 PM (Mon-Sat)',
      nodalOfficer: dcOfficer,
      mapQuery: `District Collectorate ${distName} ${cleanState}`,
      distanceKm: Number((1.2 + (index % 5) * 1.5).toFixed(1))
    });

    // Office 2: Tehsil / Sub-Divisional Magistrate (SDM) / Jan Seva Kendra
    results.push({
      id: `off-tehsil-${cleanState}-${distName}`.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      name: `${distName} Tehsil Administrative Center & Jan Seva Kendra`,
      department: 'Revenue, Caste/Income Certificates & Land Records',
      address: `Sub-Divisional Magistrate Office, Main Tehsil Campus, ${distName}, ${cleanState}`,
      district: distName,
      state: cleanState,
      phone: defaultTehsilPhone,
      email: `tehsildar.${distName.toLowerCase().replace(/[^a-z0-9]/g, '')}@${cleanState.toLowerCase().replace(/[^a-z0-9]/g, '')}.gov.in`,
      hours: '10:00 AM - 05:00 PM (Mon-Sat)',
      nodalOfficer: `Tehsildar & Sub-Divisional Officer (${distName})`,
      mapQuery: `Tehsildar Office ${distName} ${cleanState}`,
      distanceKm: Number((3.1 + (index % 4) * 2.1).toFixed(1))
    });

    // Office 3: Agriculture & Rural Nodal Office (Krishi Bhavan / Panchayat Raj)
    results.push({
      id: `off-agri-${cleanState}-${distName}`.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      name: `${distName} District Agriculture Office (Krishi Bhavan & PM-KISAN Nodal Cell)`,
      department: 'Agriculture & PM-KISAN Farmers Service Center',
      address: `Krishi Bhavan, APMC Market Yard Campus, ${distName}, ${cleanState}`,
      district: distName,
      state: cleanState,
      phone: defaultAgriPhone,
      email: `agri.${distName.toLowerCase().replace(/[^a-z0-9]/g, '')}@nic.in`,
      hours: '09:30 AM - 05:00 PM (Mon-Fri)',
      nodalOfficer: `Joint Director Agriculture (${distName})`,
      mapQuery: `Krishi Bhavan ${distName} ${cleanState}`,
      distanceKm: Number((4.5 + (index % 3) * 1.8).toFixed(1))
    });
  });

  return results;
}
