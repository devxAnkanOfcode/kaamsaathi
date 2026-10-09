import { Worker } from '../types';

export const WORKERS_DATA: Worker[] = [
  {
    id: 'w-1',
    name: 'Rameshwar "Ramesh" Kumar',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    tradeTitle: 'Master Electrician & Wireman',
    category: 'electrician',
    rating: 4.94,
    totalReviews: 384,
    jobsCompleted: 1420,
    experienceYears: 14,
    hourlyRate: 350,
    minVisitingCharge: 249,
    isAvailableNow: true,
    distanceKm: 1.2,
    etaMinutes: 12,
    locality: 'Indiranagar 100ft Rd',
    city: 'Bengaluru',
    vehicle: 'Honda Activa (Equipped with Fluke Digital Multimeter & Insulated Toolkit)',
    phone: '+91 98450 12890',
    toolSetReady: true,
    coordinates: { lat: 12.9716, lng: 77.6412 },
    badges: {
      isGovtCertified: true,
      certificationName: 'PMKVY Govt Electrical Wireman Grade-A',
      isPoliceVerified: true,
      isAadhaarVerified: true,
      isTopRated: true,
      isSuperWorker: true
    },
    languages: ['Hindi', 'Kannada', 'English'],
    skills: [
      { skill: 'Three-Phase DB Wiring', count: 94, certifiedBy: 'Skill India' },
      { skill: 'Short Circuit & Spark Diagnosis', count: 142 },
      { skill: 'Inverter & Solar UPS Sync', count: 68 },
      { skill: 'Concealed Conduit Routing', count: 53 },
      { skill: 'MCB Load Balancing', count: 87 }
    ],
    bio: '14 years of commercial and residential electrical expertise. Trained at Bangalore ITI with PMKVY Level 4 certification. Specializes in rapid fault finding, shock protection earth-leakage testing, and neat concealed wiring with zero damage to painted walls.',
    portfolio: [
      {
        id: 'p-1',
        title: 'Complete 3BHK Modular DB Box Upgrade',
        description: 'Replaced hazardous 20-year-old fuse board with Havells RCCB 40A shock prevention breakers and organized numbered tagging.',
        afterPhoto: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80',
        completedAt: 'Last week'
      },
      {
        id: 'p-2',
        title: 'Designer Chandelier & Smart Dimmer Setup',
        description: 'Installed 18kg crystal dining pendant chandelier with concealed anchor bolts and smart Wi-Fi dimmer switches.',
        afterPhoto: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
        completedAt: '2 weeks ago'
      }
    ],
    reviews: [
      {
        id: 'r-1',
        customerName: 'Priya Sundaram',
        rating: 5,
        date: '3 days ago',
        comment: 'Ramesh bhai reached Indiranagar in just 14 minutes when our main switch started sparking loudly at night. He had high-grade test meters, isolated the burned MCB immediately, and charged transparently according to standard rate card. Real professional dignity!',
        serviceProvided: 'Emergency Short Circuit Fix',
        locality: 'Indiranagar'
      },
      {
        id: 'r-2',
        customerName: 'Anand Rao',
        rating: 5,
        date: '1 week ago',
        comment: 'Very polite, wore rubber insulated safety gloves, cleaned up the copper wire clippings after work. Rare to see this level of respect for trade work.',
        serviceProvided: 'Inverter Backup Wiring',
        locality: 'Domlur'
      }
    ]
  },
  {
    id: 'w-2',
    name: 'Rajesh Patil',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    tradeTitle: 'Master Plumber & Sanitary Engineer',
    category: 'plumber',
    rating: 4.88,
    totalReviews: 290,
    jobsCompleted: 980,
    experienceYears: 11,
    hourlyRate: 320,
    minVisitingCharge: 249,
    isAvailableNow: true,
    distanceKm: 2.1,
    etaMinutes: 18,
    locality: 'Koramangala 4th Block',
    city: 'Bengaluru',
    vehicle: 'Hero Splendor (Pipe threading dyes & electric drain snake on board)',
    phone: '+91 98201 44512',
    toolSetReady: true,
    coordinates: { lat: 12.9352, lng: 77.6245 },
    badges: {
      isGovtCertified: true,
      certificationName: 'National Skill Development Corp (NSDC) Level 3',
      isPoliceVerified: true,
      isAadhaarVerified: true,
      isTopRated: true,
      isSuperWorker: false
    },
    languages: ['Kannada', 'Hindi', 'Marathi', 'English'],
    skills: [
      { skill: 'Concealed CPVC Pipe Welding', count: 112, certifiedBy: 'NSDC' },
      { skill: 'Motor Pressure Pump Calibration', count: 76 },
      { skill: 'Wall-Hung Commode Flush Tank Servicing', count: 64 },
      { skill: 'Non-Invasive Acoustic Leak Detection', count: 48 }
    ],
    bio: '11 years solving the toughest plumbing leaks in high-rise apartments and independent villas. Expert in Kohler, Jaquar and Grohe concealed flush fittings. Committed to transparent parts pricing with GST bills.',
    portfolio: [
      {
        id: 'p-3',
        title: 'Underground Sump Automatic Float & Sensor Fix',
        description: 'Installed heavy-duty stainless float sensor with automatic motor cutoff to stop water wastage.',
        afterPhoto: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=600&q=80',
        completedAt: 'Yesterday'
      }
    ],
    reviews: [
      {
        id: 'r-3',
        customerName: 'Karthik Subramanian',
        rating: 5,
        date: '4 days ago',
        comment: 'Two other plumbers told me they had to break 6 bathroom tiles. Rajesh came with an acoustic pipe probe, discovered the hairline crack in the brass connector, and replaced it from the inspection shaft without breaking any tiles! Saved me 15,000 rupees.',
        serviceProvided: 'Concealed Pipe Leak Fix',
        locality: 'Koramangala'
      }
    ]
  },
  {
    id: 'w-3',
    name: 'Anita Devi',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    tradeTitle: 'Deep Cleaning & Sanitization Specialist',
    category: 'cleaner',
    rating: 4.96,
    totalReviews: 410,
    jobsCompleted: 640,
    experienceYears: 7,
    hourlyRate: 400,
    minVisitingCharge: 499,
    isAvailableNow: true,
    distanceKm: 0.8,
    etaMinutes: 10,
    locality: 'HSR Layout Sector 2',
    city: 'Bengaluru',
    vehicle: 'Electric Two-Wheeler (Carrying Kärcher Steam Machine & Eco Chemical Kit)',
    phone: '+91 97412 88901',
    toolSetReady: true,
    coordinates: { lat: 12.9116, lng: 77.6389 },
    badges: {
      isGovtCertified: true,
      certificationName: 'PMKVY Domestic Services & Chemical Safety Certified',
      isPoliceVerified: true,
      isAadhaarVerified: true,
      isTopRated: true,
      isSuperWorker: true
    },
    languages: ['Hindi', 'English', 'Bengali'],
    skills: [
      { skill: 'Hard Water Tile Descaling', count: 180 },
      { skill: 'Kärcher High-Pressure Steam Degreasing', count: 125, certifiedBy: 'Kärcher Pro' },
      { skill: 'Upholstery & Fabric Extraction', count: 92 },
      { skill: 'Pet Hair & Odor Neutralization', count: 64 }
    ],
    bio: 'Lead cleaning professional running a verified 3-person team. We use medical-grade, non-toxic plant-based detergents safe for toddlers and pets. We do not just wipe surfaces — we restore tiles, glass partitions, and kitchen chimneys to showroom condition.',
    portfolio: [
      {
        id: 'p-4',
        title: 'Deep Kitchen Chimney & Tile Degreasing',
        description: 'Complete dismantling of greasy baffle filters, ultrasonic rotor degreasing, and 120°C steam wash.',
        afterPhoto: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80',
        completedAt: '3 days ago'
      }
    ],
    reviews: [
      {
        id: 'r-4',
        customerName: 'Shalini Nair',
        rating: 5,
        date: '5 days ago',
        comment: 'Anita and her colleague were so professional! They wore shoe covers, had professional uniforms and ID badges. Our bathroom glass looked brand new without a single water stain. Exceptional work ethic.',
        serviceProvided: 'Intense Bathroom Descaling',
        locality: 'HSR Layout'
      }
    ]
  },
  {
    id: 'w-4',
    name: 'Imran Khan',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    tradeTitle: 'AC & HVAC Refrigeration Specialist',
    category: 'ac-repair',
    rating: 4.91,
    totalReviews: 512,
    jobsCompleted: 1120,
    experienceYears: 9,
    hourlyRate: 450,
    minVisitingCharge: 399,
    isAvailableNow: true,
    distanceKm: 1.8,
    etaMinutes: 15,
    locality: 'Indiranagar',
    city: 'Bengaluru',
    vehicle: 'TVS King Cargo (High-pressure jet wash pump & R32/R410A manifold gauge)',
    phone: '+91 99011 23411',
    toolSetReady: true,
    coordinates: { lat: 12.9780, lng: 77.6400 },
    badges: {
      isGovtCertified: true,
      certificationName: 'Bureau of Energy Efficiency (BEE) HVAC Certified',
      isPoliceVerified: true,
      isAadhaarVerified: true,
      isTopRated: true,
      isSuperWorker: true
    },
    languages: ['Hindi', 'Urdu', 'English', 'Kannada'],
    skills: [
      { skill: 'Inverter PCB Diagnostic & Micro-soldering', count: 145 },
      { skill: 'R32 Gas Weight Charging (Zero Overfill)', count: 198, certifiedBy: 'BEE' },
      { skill: 'Jet Pump Foam Coil Deep Cleaning', count: 210 },
      { skill: 'Indoor Copper Flare Leak Soldering', count: 88 }
    ],
    bio: 'Specialist in Inverter Split ACs (Daikin, Mitsubishi, Voltas, LG). No unnecessary gas refills — I test micron pressure and current draw with an ammeter in front of you so you know exactly what is wrong.',
    portfolio: [
      {
        id: 'p-5',
        title: 'Mitsubishi Heavy Inverter Split PCB Restoration',
        description: 'Repaired outdoor unit capacitor surge fault, saving the owner a ₹8,500 new board replacement.',
        afterPhoto: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=600&q=80',
        completedAt: 'Yesterday'
      }
    ],
    reviews: [
      {
        id: 'r-5',
        customerName: 'Aditya Mathur',
        rating: 5,
        date: '2 days ago',
        comment: 'Other apps told me I needed ₹3,000 gas refill. Imran checked the pressure gauge in front of me, proved gas was 100% fine, and only cleaned the choked drain tray and outdoor condenser with jet spray. Honest, knowledgeable professional.',
        serviceProvided: 'AC Jet Servicing',
        locality: 'Indiranagar'
      }
    ]
  },
  {
    id: 'w-5',
    name: 'Vikram Patel',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80',
    tradeTitle: 'Master Carpenter & Modular Woodworker',
    category: 'carpenter',
    rating: 4.89,
    totalReviews: 245,
    jobsCompleted: 890,
    experienceYears: 16,
    hourlyRate: 380,
    minVisitingCharge: 299,
    isAvailableNow: true,
    distanceKm: 2.7,
    etaMinutes: 22,
    locality: 'Whitefield',
    city: 'Bengaluru',
    vehicle: 'Bajaj Pulsar (Bosch Circular saw, router and jig box)',
    phone: '+91 94481 99201',
    toolSetReady: true,
    coordinates: { lat: 12.9698, lng: 77.7499 },
    badges: {
      isGovtCertified: true,
      certificationName: 'Furniture & Fittings Guild Certified Master Craftsman',
      isPoliceVerified: true,
      isAadhaarVerified: true,
      isTopRated: true,
      isSuperWorker: false
    },
    languages: ['Hindi', 'Gujarati', 'Kannada', 'English'],
    skills: [
      { skill: 'Hydraulic Hinge & Soft-Close Alignment', count: 130 },
      { skill: 'Digital Smart Lock Door Mortising', count: 85 },
      { skill: 'Modular Bed & Wardrobe Disassembly', count: 110 },
      { skill: 'Teakwood Re-Varnish & Edge Banding', count: 65 }
    ],
    bio: '16 years of woodworking heritage. From installing digital smart locks on heavy solid teak main doors to leveling slanted modular kitchen shutters, I ensure millimeter-level precision without messy wood dust.',
    portfolio: [
      {
        id: 'p-6',
        title: 'Godrej Smart Lock Mortise Installation',
        description: 'Clean chisel & router cut on 45mm solid wood door with concealed wire harness.',
        afterPhoto: 'https://images.unsplash.com/photo-1558997519-83ea9252def8?auto=format&fit=crop&w=600&q=80',
        completedAt: 'Last Sunday'
      }
    ],
    reviews: [
      {
        id: 'r-6',
        customerName: 'Meera Chidambaram',
        rating: 5,
        date: '1 week ago',
        comment: 'Vikram fixed our sliding wardrobe doors that 2 previous handymen failed to solve. He adjusted the top suspension rollers with precision. Very polite and tidy.',
        serviceProvided: 'Wardrobe Slider Repair',
        locality: 'Whitefield'
      }
    ]
  },
  {
    id: 'w-6',
    name: 'Sunil Meena',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    tradeTitle: 'Automotive & Doorstep Bike Mechanic',
    category: 'mechanic',
    rating: 4.85,
    totalReviews: 310,
    jobsCompleted: 750,
    experienceYears: 8,
    hourlyRate: 300,
    minVisitingCharge: 249,
    isAvailableNow: true,
    distanceKm: 1.4,
    etaMinutes: 14,
    locality: 'Koramangala',
    city: 'Bengaluru',
    vehicle: 'Hero Passion Pro with emergency battery booster & mobile compressor',
    phone: '+91 96110 56781',
    toolSetReady: true,
    coordinates: { lat: 12.9340, lng: 77.6200 },
    badges: {
      isGovtCertified: true,
      certificationName: 'Automotive Skills Development Council (ASDC)',
      isPoliceVerified: true,
      isAadhaarVerified: true,
      isTopRated: false,
      isSuperWorker: false
    },
    languages: ['Hindi', 'Kannada', 'English'],
    skills: [
      { skill: '12V Battery Jumpstart & Load Test', count: 95 },
      { skill: 'Disc Brake Bleeding & Pad Replacement', count: 120 },
      { skill: 'Carburetor / Fuel Injector Tuning', count: 70 },
      { skill: 'Tubeless Tire Plug & Sealant Repair', count: 160 }
    ],
    bio: 'Mobile mechanic on two wheels. Stalled on the ring road or bike battery dead in your apartment basement? I reach within 15 minutes with jumpstart cables, engine oils (Motul/Castrol), and puncture repair tools.',
    portfolio: [
      {
        id: 'p-7',
        title: 'Royal Enfield Classic 350 Breakdown Revive',
        description: 'Replaced ruptured clutch cable and tuned spark plug on the roadside in 20 minutes.',
        afterPhoto: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=600&q=80',
        completedAt: '4 days ago'
      }
    ],
    reviews: [
      {
        id: 'r-7',
        customerName: 'Gaurav Sen',
        rating: 5,
        date: '3 days ago',
        comment: 'Lifesaver! My scooter battery died while leaving for office at 8:30 AM. Sunil reached my apartment in 12 minutes, boosted the battery, and tested the alternator output. Unmatched speed.',
        serviceProvided: 'Doorstep Battery Jumpstart',
        locality: 'Koramangala'
      }
    ]
  },
  {
    id: 'w-7',
    name: 'Manjeet Singh',
    avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=400&q=80',
    tradeTitle: 'Master Wall Painter & Waterproofing Tech',
    category: 'painter',
    rating: 4.92,
    totalReviews: 180,
    jobsCompleted: 520,
    experienceYears: 12,
    hourlyRate: 360,
    minVisitingCharge: 499,
    isAvailableNow: false,
    distanceKm: 3.4,
    etaMinutes: 28,
    locality: 'Jayanagar',
    city: 'Bengaluru',
    vehicle: 'Maruti Omni (Airless paint sprayer & moisture meter kit)',
    phone: '+91 97314 20045',
    toolSetReady: true,
    coordinates: { lat: 12.9250, lng: 77.5938 },
    badges: {
      isGovtCertified: true,
      certificationName: 'Paints and Coatings Skill Council (PCSC) Master Painter',
      isPoliceVerified: true,
      isAadhaarVerified: true,
      isTopRated: true,
      isSuperWorker: false
    },
    languages: ['Punjabi', 'Hindi', 'English'],
    skills: [
      { skill: 'Moisture Seepage Damp-Block Treatment', count: 98, certifiedBy: 'Dr. Fixit Pro' },
      { skill: 'Airless Spray Painting (Zero Roller Marks)', count: 82 },
      { skill: 'Royal Texture & Stencil Wall Finish', count: 64 },
      { skill: 'Masking & Floor Protection System', count: 110 }
    ],
    bio: 'Professional painter with 12 years of experience. We tape floors with heavy plastic shields, measure wall moisture with calibrated meters before applying Dr. Fixit primer, and leave zero paint drops on tiles.',
    portfolio: [
      {
        id: 'p-8',
        title: 'Balcony Water Damp Seepage Waterproofing & Apex Ultima Paint',
        description: 'Polymer modified mortar waterproofing followed by 2 coats of weatherproof exterior coat.',
        afterPhoto: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80',
        completedAt: 'Last month'
      }
    ],
    reviews: [
      {
        id: 'r-8',
        customerName: 'Deepa Hegde',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Cleanest painting experience ever. Manjeet and his team covered every single piece of furniture with protective film and finished an accent wall in 4 hours.',
        serviceProvided: 'Living Room Feature Wall',
        locality: 'Jayanagar'
      }
    ]
  },
  {
    id: 'w-8',
    name: 'Mohammad Arif',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    tradeTitle: 'Domestic Appliance & Geyser Specialist',
    category: 'appliance-repair',
    rating: 4.87,
    totalReviews: 320,
    jobsCompleted: 820,
    experienceYears: 6,
    hourlyRate: 340,
    minVisitingCharge: 299,
    isAvailableNow: true,
    distanceKm: 1.6,
    etaMinutes: 16,
    locality: 'BTM Layout',
    city: 'Bengaluru',
    vehicle: 'Honda Dio (Spare heating coils & washing machine inlet valves on hand)',
    phone: '+91 99801 88722',
    toolSetReady: true,
    coordinates: { lat: 12.9165, lng: 77.6101 },
    badges: {
      isGovtCertified: true,
      certificationName: 'Electronics Sector Skills Council of India (ESSCI)',
      isPoliceVerified: true,
      isAadhaarVerified: true,
      isTopRated: true,
      isSuperWorker: false
    },
    languages: ['Hindi', 'Kannada', 'English'],
    skills: [
      { skill: 'Front Load Washing Machine Drum Suspension', count: 88 },
      { skill: 'Instant & Storage Geyser Tank Descaling', count: 140 },
      { skill: 'Microwave Magnetron & High-Voltage Diode', count: 52 },
      { skill: 'Double Door Refrigerator Defrost Sensor', count: 74 }
    ],
    bio: 'Authorized service training across IFB, Bosch, Whirlpool and AO Smith. I carry genuine OEM heating elements and thermostat relays to solve 90% of issues on the first visit.',
    portfolio: [
      {
        id: 'p-9',
        title: 'AO Smith 25L Geyser Heating Element Replacement & Tank Flush',
        description: 'Replaced calcified heating rod with genuine titanium alloy element.',
        afterPhoto: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
        completedAt: '5 days ago'
      }
    ],
    reviews: [
      {
        id: 'r-9',
        customerName: 'Nitin Roy',
        rating: 5,
        date: '6 days ago',
        comment: 'Washing machine was making loud rattling noises during spin cycle. Arif quickly showed me the broken damper spring, replaced it from his stock, and test-ran it with a wet load. Super impressed!',
        serviceProvided: 'Washing Machine Drum Fix',
        locality: 'BTM Layout'
      }
    ]
  }
];
