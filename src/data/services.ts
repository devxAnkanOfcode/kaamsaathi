import { ServiceItem } from '../types';

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'electrician',
    category: 'electrician',
    title: 'Electrician',
    hindiTitle: 'इलेक्ट्रीशियन',
    iconName: 'Zap',
    shortDesc: 'Wiring, short-circuit fixing, switches, fans & sub-meter setup',
    benchmarkPriceRange: '₹199 - ₹499',
    popularSubServices: ['Switchboard & Socket Repair', 'Fan / Light Installation', 'MCB Tripping & Short Circuit', 'Inverter & Battery Setup', 'Full House Rewiring'],
    avgTimeMinutes: 35
  },
  {
    id: 'plumber',
    category: 'plumber',
    title: 'Plumber',
    hindiTitle: 'प्लंबर',
    iconName: 'Droplets',
    shortDesc: 'Pipe leaks, taps, motor pumps, toilet repairs & drain unblocking',
    benchmarkPriceRange: '₹249 - ₹599',
    popularSubServices: ['Tap & Faucet Leakage', 'Water Motor Pump Repair', 'Drainage / Clogged Pipes', 'Geyser / Shower Fitting', 'Water Tank Cleaning'],
    avgTimeMinutes: 45
  },
  {
    id: 'ac-repair',
    category: 'ac-repair',
    title: 'AC & Cooling',
    hindiTitle: 'एसी रिपेयर',
    iconName: 'Wind',
    shortDesc: 'Split/window AC servicing, gas refill, cooling issues & installation',
    benchmarkPriceRange: '₹399 - ₹899',
    popularSubServices: ['Deep Jet AC Cleaning', 'Gas Leakage & Refill', 'Compressor / PCB Repair', 'AC Uninstallation & Fitting', 'Water Leakage from Indoor Unit'],
    avgTimeMinutes: 50
  },
  {
    id: 'carpenter',
    category: 'carpenter',
    title: 'Carpenter',
    hindiTitle: 'बढ़ई (कारपेंटर)',
    iconName: 'Hammer',
    shortDesc: 'Door lock repair, modular furniture assembly & wood restoration',
    benchmarkPriceRange: '₹299 - ₹699',
    popularSubServices: ['Door Lock & Handle Fitting', 'Cupboard & Drawer Hinges', 'Bed & Furniture Assembly', 'Wooden Door Planing', 'Custom Shelving'],
    avgTimeMinutes: 60
  },
  {
    id: 'mechanic',
    category: 'mechanic',
    title: 'Mechanic',
    hindiTitle: 'मैकेनिक (बाइक/कार)',
    iconName: 'Wrench',
    shortDesc: 'Bike & scooter breakdown assistance, puncture, oil change & battery jumpstart',
    benchmarkPriceRange: '₹249 - ₹549',
    popularSubServices: ['Doorstep Bike Servicing', 'Battery Jumpstart / Replacement', 'Brake & Clutch Adjustment', 'Tubeless Puncture & Air', 'Car Emergency Diagnostics'],
    avgTimeMinutes: 40
  },
  {
    id: 'cleaner',
    category: 'cleaner',
    title: 'Deep Cleaner',
    hindiTitle: 'क्लीनिंग सर्विस',
    iconName: 'Sparkles',
    shortDesc: 'Kitchen degreasing, bathroom scrubbing, sofa shampooing & post-renovation cleanup',
    benchmarkPriceRange: '₹499 - ₹1,499',
    popularSubServices: ['Intense Bathroom Descaling', 'Kitchen Chimney & Deep Clean', 'Sofa & Mattress Shampoo', 'Full Home Deep Sanitization', 'Balcony & Tile Scrubbing'],
    avgTimeMinutes: 90
  },
  {
    id: 'painter',
    category: 'painter',
    title: 'Painter',
    hindiTitle: 'पेंटर',
    iconName: 'Paintbrush',
    shortDesc: 'Single wall dampness fix, room repainting, waterproofing & texture finish',
    benchmarkPriceRange: '₹499 - ₹2,499',
    popularSubServices: ['Wall Water Seepage Fix', 'Single Accent Wall Painting', 'Full Room Emulsion Repaint', 'Door & Window Enamel Polish', 'POP Crack Filling'],
    avgTimeMinutes: 120
  },
  {
    id: 'appliance-repair',
    category: 'appliance-repair',
    title: 'Appliances',
    hindiTitle: 'घरेलू उपकरण',
    iconName: 'Cpu',
    shortDesc: 'Washing machines, microwave, geyser, refrigerator & RO water purifiers',
    benchmarkPriceRange: '₹299 - ₹699',
    popularSubServices: ['Washing Machine Drum / Spin Fix', 'Refrigerator Not Cooling', 'Microwave Heating Issue', 'Geyser Element Replacement', 'RO Filter Membrane Service'],
    avgTimeMinutes: 45
  },
  {
    id: 'welder',
    category: 'welder',
    title: 'Welder',
    hindiTitle: 'वेल्डर',
    iconName: 'Flame',
    shortDesc: 'Main gate welding, iron grill reinforcement & railing fabrication',
    benchmarkPriceRange: '₹399 - ₹899',
    popularSubServices: ['Gate Hinge Welding', 'Safety Window Grill Fix', 'Staircase Railing Reinforcement', 'Shed / Tin Sheet Fabrication', 'Lock Latch Metal Welding'],
    avgTimeMinutes: 60
  },
  {
    id: 'mason',
    category: 'mason',
    title: 'Mason (Mistri)',
    hindiTitle: 'राजमिस्त्री',
    iconName: 'Layers',
    shortDesc: 'Floor tile replacement, brickwork plastering & civil repairs',
    benchmarkPriceRange: '₹450 - ₹950',
    popularSubServices: ['Broken Tile Replacement', 'Cement Plaster & Skirting', 'Wall Chipping & Patchwork', 'Bathroom Slope Rectification', 'Boundary Wall Repair'],
    avgTimeMinutes: 120
  },
  {
    id: 'driver',
    category: 'driver',
    title: 'Private Driver',
    hindiTitle: 'ड्राइवर',
    iconName: 'Car',
    shortDesc: 'Hourly private chauffeur for manual/automatic cars & outstation runs',
    benchmarkPriceRange: '₹149/hr',
    popularSubServices: ['City Hourly Chauffeur', 'Late Night Safe Return Drive', 'Airport Drop & Pickup', 'Outstation Weekend Trip', 'Commercial Vehicle Driver'],
    avgTimeMinutes: 180
  },
  {
    id: 'tailor',
    category: 'tailor',
    title: 'Tailor',
    hindiTitle: 'दर्जी (टेलर)',
    iconName: 'Scissors',
    shortDesc: 'Doorstep measurement, suit/blouse alteration, zip replacement & fitting',
    benchmarkPriceRange: '₹149 - ₹499',
    popularSubServices: ['Pant / Shirt Alteration', 'Blouse Stitching & Neck Cut', 'Curtain Hemming', 'Zip / Hook Replacement', 'Traditional Dress Fitting'],
    avgTimeMinutes: 30
  }
];
