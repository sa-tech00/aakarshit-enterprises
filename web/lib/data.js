// ---------- Company details: edit here and the whole site updates ----------
export const COMPANY = {
  name: 'Akarshit Enterprises',
  tagline: 'Your Complete Office Repair, Cleaning & Interior Solution',
  owner: 'Omprakash Sharma',
  phones: [
    { display: '98216 26533', tel: '+919821626533' },
    { display: '79770 63303', tel: '+917977063303' },
  ],
  whatsapp: '919821626533', // country code + number, no "+"
  email: 'akarshitenterprises123@gmail.com',
  address: 'Swami Samarth Suvarna Colony, Plot No. 6, Lokmanya Nagar, Thane (W) – 400 606',
  speciality:
    'Specialist in all types of office repairs & maintenance work, interior, carpentry, painting, civil contracting and more.',
};

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '');

export const whatsappLink = (text = 'Hello Akarshit Enterprises, I would like to enquire about your services.') =>
  `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(text)}`;

// Service categories used on the Services page
export const GROUPS = [
  { id: 'interior', title: 'Interior, civil & fabrication', text: 'Build, partition, paint and finish your workspace.' },
  { id: 'furnishing', title: 'Furniture & furnishings', text: 'Chairs, sofas, carpets, blinds and door hardware, supplied and serviced.' },
  { id: 'upkeep', title: 'Cleaning & upkeep', text: 'Keep what you already have clean, working and looking right.' },
  { id: 'technical', title: 'IT cabling & HVAC', text: 'The technical services behind a comfortable, connected office.' },
];

// The six services shown first on the home page
export const CORE_SLUGS = ['interior-turnkey', 'glass-partitions', 'chairs-sofas', 'cleaning', 'blinds-curtains', 'painting-civil'];

// ---------- Services (icon names map to lucide-react in components/ServiceIcon.js) ----------
export const SERVICES = [
  {
    slug: 'interior-turnkey',
    group: 'interior',
    icon: 'Building2',
    title: 'Interior Turnkey & Project Management',
    short: 'Design, execution and handover of your complete office interior under one contractor.',
    items: ['Interior turnkey contractor', 'Designers & project management', 'Civil, electrical & finishing coordination'],
  },
  {
    slug: 'glass-partitions',
    group: 'interior',
    icon: 'PanelsTopLeft',
    title: 'Glass & Partition Cabins',
    short: 'Glass cabins and partitions in wood, gypsum and brick for every office layout.',
    items: ['Glass partition & cabin making', 'Wooden partitions', 'Gypsum partitions', 'Brick partitions', 'Access doors'],
  },
  {
    slug: 'modular-workstations',
    group: 'interior',
    icon: 'LayoutGrid',
    title: 'Modular Workstations',
    short: 'Space-smart workstations built for comfort, cabling and productivity.',
    items: ['Modular workstation making', 'Cabling-ready desks', 'Custom sizes & finishes'],
  },
  {
    slug: 'furniture-carpentry',
    group: 'interior',
    icon: 'Hammer',
    title: 'Furniture & Carpentry Work',
    short: 'All types of carpentry and furniture, including polishing and repainting.',
    items: ['Furniture work', 'Carpentry – all types', 'Furniture polishing & painting'],
  },
  {
    slug: 'chairs-sofas',
    group: 'furnishing',
    icon: 'Armchair',
    title: 'Chairs & Sofas – Supply, Repair & Service',
    short: 'New chairs and sofas, plus expert repair and servicing of what you already own.',
    items: ['New sofa & chair supply', 'Chair repair & servicing', 'Sofa repair & re-fixing'],
  },
  {
    slug: 'cleaning',
    group: 'upkeep',
    icon: 'Sparkles',
    title: 'Carpet, Sofa & Chair Cleaning',
    short: 'Deep cleaning that removes stains and odour and brings fabric back to life.',
    items: ['Carpet cleaning', 'Sofa cleaning', 'Chair cleaning'],
  },
  {
    slug: 'carpets',
    group: 'furnishing',
    icon: 'Layers',
    title: 'Carpet Supply, Fixing & Repair',
    short: 'New carpets supplied and fixed, with repair and cleaning to keep them looking new.',
    items: ['New carpet supply & fixing', 'Carpet repair', 'Carpet cleaning'],
  },
  {
    slug: 'painting-civil',
    group: 'interior',
    icon: 'PaintRoller',
    title: 'Painting, Civil & Plumbing Work',
    short: 'All types of painting, civil and plumbing work for a fresh, well-maintained office.',
    items: ['Painting – all types', 'Civil work', 'Plumbing work'],
  },
  {
    slug: 'plumbing-supply',
    group: 'interior',
    icon: 'Wrench',
    title: 'Plumbing Materials Supply',
    short: 'Quality plumbing materials supplied for your site as required.',
    items: ['Plumbing materials supply', 'Fittings & fixtures'],
  },
  {
    slug: 'fabrication',
    group: 'interior',
    icon: 'Cog',
    title: 'SS & MS Fabrication',
    short: 'Stainless steel and mild steel fabrication made to your design and site size.',
    items: ['SS fabrication', 'MS fabrication', 'Railings, frames & structures'],
  },
  {
    slug: 'films',
    group: 'interior',
    icon: 'Scan',
    title: 'Frosted Glass & Film Fixing',
    short: 'Frosted, decorative and privacy films fixed neatly on glass of any size.',
    items: ['Frosted glass film', 'All types of film fixing', 'Film work'],
  },
  {
    slug: 'blinds-curtains',
    group: 'furnishing',
    icon: 'Blinds',
    title: 'Blinds & Curtains',
    short: 'Roller blinds, vertical blinds and curtains to control light and add style.',
    items: ['Roller blinds', 'Vertical blinds', 'Curtain work'],
  },
  {
    slug: 'it-cabling',
    group: 'technical',
    icon: 'Cable',
    title: 'IT Work & LAN Cabling',
    short: 'Structured LAN and IT cabling done cleanly so your office stays connected.',
    items: ['IT work', 'IT / LAN cabling', 'Access door & IT cabling'],
  },
  {
    slug: 'hvac',
    group: 'technical',
    icon: 'Fan',
    title: 'HVAC & Services',
    short: 'Heating, ventilation and air-conditioning services for a comfortable workplace.',
    items: ['HVAC work', 'Related services & maintenance'],
  },
  {
    slug: 'door-hardware',
    group: 'furnishing',
    icon: 'DoorOpen',
    title: 'Door Closers, Floor Springs & Door Mates',
    short: 'Floor spring and door closer supply and fixing, and door mates of your choice.',
    items: ['Floor spring supply & fixing', 'Door closer supply & fixing', 'Door mates (Duro Soft & more) as required'],
  },
  {
    slug: 'vendor',
    group: 'upkeep',
    icon: 'Handshake',
    title: 'Multipurpose Vendor',
    short: 'One reliable vendor for whatever your office needs – just tell us the requirement.',
    items: ['Office repair & maintenance', 'Supply on customer requirement', 'Annual maintenance support'],
  },
];

export const WHY_US = [
  { icon: 'Layers', title: 'Everything under one roof', text: 'Interior, repair, cleaning, supply and IT cabling – one team, one point of contact.' },
  { icon: 'Clock', title: 'On-time execution', text: 'Clear scope, honest timelines and neat work that does not disturb your office hours.' },
  { icon: 'BadgeCheck', title: 'Quality you can see', text: 'Good materials and careful finishing, whether it is a small repair or a full fit-out.' },
  { icon: 'Phone', title: 'Quick response', text: 'Call or WhatsApp us directly and speak to the person who will do the work.' },
];

export const VALUES = [
  { title: 'Quality work', text: 'Good materials and careful finishing, from one repair to a full fit-out.' },
  { title: 'Professional service', text: 'Clear scope, honest timelines and neat work that respects office hours.' },
  { title: 'Complete solution', text: 'Repair, cleaning, supply, interior and IT cabling from one team.' },
];

export const STEPS = [
  { title: 'Enquiry', text: 'Call us, WhatsApp, or send an enquiry through the website.' },
  { title: 'Site visit', text: 'We visit your office, understand the need and take measurements.' },
  { title: 'Quote & plan', text: 'You receive a clear quotation and schedule before work begins.' },
  { title: 'Execution', text: 'Work is completed neatly, checked with you and handed over.' },
];
