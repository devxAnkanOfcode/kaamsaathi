export interface CityLocation {
  city: string;
  state: string;
  localities: string[];
}

export const POPULAR_LOCATIONS: CityLocation[] = [
  {
    city: 'Bengaluru',
    state: 'Karnataka',
    localities: [
      'Indiranagar 100ft Rd',
      'Koramangala 4th Block',
      'HSR Layout Sector 2',
      'Whitefield (ITPL Road)',
      'Jayanagar 4th T Block',
      'BTM Layout 2nd Stage',
      'Marathahalli Bridge',
      'Hebbal Kempapura',
      'Electronic City Phase 1'
    ]
  },
  {
    city: 'Mumbai',
    state: 'Maharashtra',
    localities: [
      'Andheri West (Lokhandwala)',
      'Bandra West (Pali Hill)',
      'Powai (Hiranandani)',
      'Goregaon East',
      'Thane West (Ghodbunder Rd)',
      'Dadar TT Circle',
      'Borivali West'
    ]
  },
  {
    city: 'Delhi-NCR',
    state: 'Delhi / Haryana / UP',
    localities: [
      'Gurugram Sector 43 / Golf Course',
      'Noida Sector 62',
      'South Extension II',
      'Lajpat Nagar IV',
      'Dwarka Sector 12',
      'Rohini Sector 9',
      'Saket District Centre'
    ]
  },
  {
    city: 'Pune',
    state: 'Maharashtra',
    localities: [
      'Baner High Street',
      'Kothrud Stand',
      'Viman Nagar',
      'Wakad (Datta Mandir)',
      'Koregaon Park (Lane 5)',
      'Hadapsar Magarpatta'
    ]
  },
  {
    city: 'Hyderabad',
    state: 'Telangana',
    localities: [
      'HITEC City / Madhapur',
      'Gachibowli Financial Dist',
      'Jubilee Hills Checkpost',
      'Banjara Hills Rd No. 12',
      'Kondapur RTA',
      'Kukatpally Housing Board'
    ]
  }
];
