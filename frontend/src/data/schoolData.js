/**
 * All school content data.
 * Edit here to update text across the entire site.
 */

/* ─── SCHOOL META ───────────────────────────── */
export const SCHOOL = {
  name: "Holy Cross School",
  shortName: "HCS",
  location: "Pandua, West Bengal",
  tagline: "Est. 1951 · ICSE Affiliated · Pandua, West Bengal",
  motto: '"Unity and Discipline"',
  eyebrow: "Faith · Knowledge · Service",
  founded: 1951,
  foundedBy: "Sisters of Chavanoid",
  affiliation: "Icse Aff. No: 2710045 · NIC Code: 8520",
  boardCode: "2710045",
};

/* ─── NAV LINKS ─────────────────────────────── */
export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Academics", href: "/academics" },
  { label: "Admissions", href: "/admissions" },
  { label: "Campus Life", href: "/campus" },
  { label: "Events", href: "/events" },
  { label: "Contact", href: "/contact" },
];

/* ─── BOARD BANNER ──────────────────────────── */
export const BOARD_ITEMS = [
  { icon: "📋", text: "CBSE Affiliated — Board Code: 2710045" },
  { icon: "⭐", text: "NAAC Accredited — Grade A+" },
  { icon: "⛪", text: "Diocese of Delhi — Catholic Institution" },
  { icon: "🏆", text: "India's Top 100 Schools — Education World 2024" },
];

/* ─── HERO ──────────────────────────────────── */
export const HERO = {
  heading: { line1: "Nurturing Minds,", emphasis: "Inspiring", line2: "Souls" },
  description:
    "Holy Cross School has been shaping the future of India's youth since 1952 — with a tradition of academic excellence, moral values, and compassionate leadership grounded in the Christian ethos.",
  cta: { primary: "Admissions 2025–26", secondary: "Explore Our School" },
  stats: [
    { number: "1,200+", label: "Students Enrolled" },
    { number: "98.6%", label: "Board Pass Rate" },
    { number: "70+", label: "Years of Legacy" },
  ],
  cards: [
    {
      label: "Academic Session",
      value: "2025 – 2026",
      sub: "Admissions open · Classes Nursery to XII",
    },
    {
      label: "Next Open House",
      value: "Saturday, 15 February 2025",
      sub: "10:00 AM · School Auditorium · Open to Parents",
    },
    {
      label: "Latest Honour",
      value: "National Science Olympiad — 1st Place",
      sub: "District Level · Grade X · Ananya Sharma",
    },
  ],
};

/* ─── GALLERY ───────────────────────────────── */
export const GALLERY = [
  {
    src: "/images/campus.png",
    alt: "Beautiful School Campus",
    caption: "A stunning modern school campus building on a bright sunny day",
  },
  {
    src: "/images/classroom.png",
    alt: "Modern Classroom Learning",
    caption: "High-end modern classroom with diverse students learning",
  },
  {
    src: "/images/sports.png",
    alt: "Dynamic Sports Field",
    caption: "Students playing soccer at our premium sports field",
  },
];

/* ─── ABOUT ─────────────────────────────────── */
export const ABOUT = {
  title: { line1: "A Legacy of Learning", line2: "& Faith Since 1952" },
  description:
    "Founded by the Brothers of St. Gabriel, Holy Cross School was established with a vision to provide quality education rooted in Christian values to students across faiths. We are a minority institution serving all communities with equal dignity and care.",
  values: [
    { icon: "✝", name: "Faith & Values", desc: "Grounded in Christian ethics, welcoming children of all religions and communities." },
    { icon: "📚", name: "Academic Rigour", desc: "Consistently among the top-performing schools in CBSE board results across India." },
    { icon: "🤝", name: "Service & Outreach", desc: "Our NSS and community wings actively serve underprivileged communities." },
    { icon: "🌟", name: "Holistic Growth", desc: "Sports, arts, music, and leadership programs that shape the whole child." },
  ],
  images: [
    { bg: "#2A2555", icon: "🏛", label: "Main Building · Heritage Block" },
    { bg: "#1A3020", icon: "⛪", label: "School Chapel · St. Thomas" },
  ],
};

/* ─── ACADEMICS ─────────────────────────────── */
export const ACADEMICS = {
  title: { line1: "Excellence from", line2: "Nursery to Grade XII" },
  description:
    "Our rigorous CBSE curriculum is paired with enrichment programs, Olympiad preparation, and co-scholastic activities that ensure all-round development.",
  classes: [
    { name: "Pre-Nursery", type: "nursery" },
    { name: "Nursery", type: "nursery" },
    { name: "LKG", type: "nursery" },
    { name: "UKG", type: "nursery" },
    { name: "Class I", type: "primary" },
    { name: "Class II", type: "primary" },
    { name: "Class III", type: "primary" },
    { name: "Class IV", type: "primary" },
    { name: "Class V", type: "primary" },
    { name: "Class VI", type: "middle" },
    { name: "Class VII", type: "middle" },
    { name: "Class VIII", type: "middle" },
    { name: "Class IX", type: "senior" },
    { name: "Class X", type: "senior" },
    { name: "Class XI", type: "higher" },
    { name: "Class XII", type: "higher" },
  ],
  results: [
    { value: "98.6%", label: "Class X Pass Rate" },
    { value: "96.4%", label: "Class XII Pass Rate" },
    { value: "42", label: "Distinctions 2024" },
    { value: "180+", label: "Qualified Teachers" },
  ],
  streams: [
    {
      icon: "🔬", name: "Science Stream", accent: "primary",
      desc: "Physics, Chemistry, Biology & Mathematics with dedicated labs and Olympiad training.",
      subjects: ["Physics", "Chemistry", "Biology", "Mathematics", "Computer Science"],
    },
    {
      icon: "📊", name: "Commerce Stream", accent: "secondary",
      desc: "Accountancy, Business Studies, and Economics with real-world case study methodology.",
      subjects: ["Accountancy", "Business Studies", "Economics", "Mathematics", "Entrepreneurship"],
    },
    {
      icon: "🎨", name: "Humanities Stream", accent: "teal",
      desc: "History, Political Science, Psychology and Fine Arts — a foundation for critical thought.",
      subjects: ["History", "Political Science", "Psychology", "Sociology", "Fine Arts"],
    },
  ],
};

/* ─── ADMISSIONS ────────────────────────────── */
export const ADMISSIONS = {
  title: { line1: "Join Our School", line2: "Community" },
  description:
    "Admissions for the 2025–26 academic session are now open. We welcome students across all faiths and backgrounds.",
  steps: [
    {
      title: "Submit Enquiry Form",
      desc: "Fill the online registration form or visit the school office with relevant documents (birth certificate, Aadhaar, previous marksheets).",
    },
    {
      title: "Entrance Assessment",
      desc: "A written test and interaction session for Classes I–VIII. Direct admission to Nursery / LKG based on age eligibility.",
    },
    {
      title: "Document Verification",
      desc: "Original documents verified by the Admission Office. SC/ST/OBC certificates accepted for reservation benefits.",
    },
    {
      title: "Fee Payment & Enrolment",
      desc: "Fee payment via online transfer or demand draft. Confirmation of seat and issue of school diary and ID card.",
    },
  ],
  dates: [
    "Form Availability: 1st December 2024",
    "Last Date to Submit: 31st January 2025",
    "Entrance Test: 15th February 2025",
    "Result Declaration: 22nd February 2025",
  ],
  classOptions: [
    "Pre-Nursery", "Nursery", "LKG", "UKG",
    "Class I", "Class II", "Class III", "Class IV", "Class V",
    "Class VI", "Class VII", "Class VIII",
    "Class IX", "Class X",
    "Class XI – Science", "Class XI – Commerce", "Class XI – Humanities",
  ],
  communityOptions: [
    "Catholic Christian", "Christian (Other)", "Hindu", "Muslim", "Sikh", "Other",
  ],
};

/* ─── CAMPUS LIFE ───────────────────────────── */
export const CAMPUS = {
  title: { line1: "Beyond the", line2: "Classroom" },
  description:
    "Sports, arts, music, drama, debate, and spirituality — our campus buzzes with life and purpose every day.",
  cards: [
    { icon: "⚽", cat: "Sports", name: "Football, Cricket,\nBasketball & Athletics", bg: "#2A3D5C", image: "/images/sports.png" },
    { icon: "🎭", cat: "Performing Arts", name: "Theatre, Classical\nDance & Music", bg: "#2D3B2D", image: "/images/campus_arts.png" },
    { icon: "🔬", cat: "Clubs & Societies", name: "Science, Robotics,\nDebate & Eco Club", bg: "#3B2D1B", image: "/images/campus_clubs.png" },
    { icon: "🙏", cat: "Spiritual Life", name: "Daily Chapel, Moral\nScience & NSS Wing", bg: "#2B1B3B", image: "/images/campus_spiritual.png" },
  ],
};

/* ─── FACILITIES ────────────────────────────── */
export const FACILITIES = [
  { icon: "🔬", name: "Science Laboratories", desc: "Fully equipped Physics, Chemistry and Biology labs with latest instruments for hands-on learning." },
  { icon: "💻", name: "Computer Lab", desc: "3 air-conditioned computer labs with 250 workstations, high-speed internet, and coding curriculum." },
  { icon: "📚", name: "Central Library", desc: "Over 30,000 volumes, e-library access, newspapers, and a dedicated reading room for students." },
  { icon: "🏊", name: "Swimming Pool", desc: "Olympic-size pool with trained coaches. Open to students from Class III onwards." },
  { icon: "🎨", name: "Art & Craft Studio", desc: "A vibrant creative studio for fine arts, sculpture, pottery, and textile design." },
  { icon: "🎵", name: "Music & Choir Room", desc: "Dedicated rooms for western and Indian classical music, with an acclaimed school choir." },
  { icon: "🏟", name: "Sports Complex", desc: "Multi-purpose ground, basketball court, tennis court, and indoor badminton hall." },
  { icon: "🎭", name: "School Auditorium", desc: "850-seat air-conditioned auditorium with professional AV systems for annual day and cultural events." },
  { icon: "⛪", name: "School Chapel", desc: "A peaceful chapel dedicated to St. Thomas, open for prayer, reflection, and weekly mass." },
];

/* ─── EVENTS ────────────────────────────────── */
export const EVENTS = [
  { day: "25", month: "Dec", name: "Christmas Celebration & Midnight Mass", meta: "School Chapel & Grounds · 6:00 PM onwards", tag: "Spiritual" },
  { day: "15", month: "Jan", name: 'Annual Sports Day — "Virtus et Vigor"', meta: "Main Grounds · 8:00 AM · Parents Welcome", tag: "Sports" },
  { day: "10", month: "Feb", name: "Science & Technology Fair 2025", meta: "School Auditorium · Open to Public · 9 AM – 4 PM", tag: "Academic" },
  { day: "22", month: "Feb", name: "Inter-School Debate Competition", meta: "Seminar Hall · Participation from 14 Delhi Schools", tag: "Cultural" },
  { day: "14", month: "Mar", name: 'Annual Day — "Confluence 2025"', meta: "School Auditorium · 5:00 PM · Chief Guest TBA", tag: "Cultural" },
];

export const NOTICES = [
  { text: "Class X & XII Pre-Board Examination begins 20th January 2025. Students must carry admit cards.", date: "10 Dec 2024" },
  { text: "Admission forms for 2025–26 session now available at the school office and online portal.", date: "1 Dec 2024" },
  { text: "PTM for Classes VI–X scheduled for 14th December 2024 from 9 AM to 1 PM.", date: "28 Nov 2024" },
  { text: "Scholarship application portal is now open. SC/ST/Minority scholarships available. Apply by 31st Dec.", date: "25 Nov 2024" },
  { text: "Winter uniform to be worn from 1st November. No exceptions will be made.", date: "20 Nov 2024" },
];

/* ─── FACULTY ───────────────────────────────── */
export const FACULTY = [
  { initials: "BR", name: "Br. Raphael D'Souza", role: "Principal", qual: "M.Ed., St. Joseph's College · 28 years in education · Former Rector, Xavier's Mumbai", photoBg: "#1E1A3A" },
  { initials: "SC", name: "Sr. Clara Mathew", role: "Vice Principal — Academics", qual: "M.Sc. Mathematics · Ph.D. Education · 22 years experience", photoBg: "#1E3A2F" },
  { initials: "RV", name: "Mr. Rohan Varghese", role: "Head of Science Dept.", qual: "M.Sc. Physics · IIT Delhi · CBSE Resource Person · 16 years", photoBg: "#2D1C40" },
  { initials: "PK", name: "Ms. Priya Krishnamurthy", role: "Head of English Dept.", qual: "M.A. English Literature · University of Delhi · Published author", photoBg: "#2D2010" },
];

/* ─── TESTIMONIALS ──────────────────────────── */
export const TESTIMONIALS = [
  {
    text: "St. Thomas Aquinas didn't just give me education — it gave me character. The teachers here genuinely cared about who we were becoming, not just our marks.",
    name: "Arjun Mehta", batch: "Batch of 2018 · IIT Bombay, B.Tech CSE", avatarBg: "#1E1A3A",
  },
  {
    text: "The discipline, the morning prayers, the annual day — everything about this school shaped my values. I'm proud to send my own daughter here now.",
    name: "Sunita Bose", batch: "Batch of 2003 · Senior Advocate, Delhi High Court", avatarBg: "#1E3A2F",
  },
  {
    text: "The school choir, the sports, the science lab — I thrived here because St. Thomas let me be curious, creative, and confident. Forever grateful.",
    name: "Roshan Almeida", batch: "Batch of 2015 · AIIMS Delhi, MBBS · Doctor", avatarBg: "#2D1C40",
  },
];

/* ─── CONTACT ───────────────────────────────── */
export const CONTACT = {
  address: [
    "Holy Cross School",
    "12, Cathedral Road, New Delhi – 110 001",
    "Near India Gate, Central Delhi",
  ],
  phone: ["+91 11 2345 6789 (General)", "+91 11 2345 6790 (Admissions)"],
  email: ["info@staqschool.edu.in", "admissions@staqschool.edu.in"],
  timing: ["Monday – Friday: 7:30 AM – 2:30 PM", "Saturday: 7:30 AM – 12:30 PM"],
  social: [
    { label: "Facebook", icon: "f", href: "#" },
    { label: "Instagram", icon: "in", href: "#" },
    { label: "YouTube", icon: "▶", href: "#" },
    { label: "Twitter", icon: "𝕏", href: "#" },
  ],
  map: {
    metro: { label: "Nearest Metro", value: "Central Secretariat Station\n(Yellow Line · 0.8 km)" },
    bus: { label: "Nearest Bus Stop", value: "Cathedral Road Stop\nRoutes: 505, 520, 611" },
    landmark: { label: "Landmark", value: "Adjacent to Sacred\nHeart Cathedral, Delhi" },
    parking: { label: "Parking", value: "Available on campus\nfor visitors and parents" },
  },
};

/* ─── FOOTER ────────────────────────────────── */
export const FOOTER = {
  about:
    "A premier Catholic minority institution, nurturing future leaders through faith, knowledge, and service since 1952. Affiliated to the Central Board of Secondary Education.",
  columns: [
    {
      title: "Quick Links",
      links: [
        { label: "About the School", href: "/about" },
        { label: "Academics & Curriculum", href: "/academics" },
        { label: "Admissions 2025–26", href: "/admissions" },
        { label: "Campus Life", href: "/campus" },
        { label: "Facilities", href: "/campus" },
        { label: "Events & Calendar", href: "/events" },
      ],
    },
    {
      title: "School Info",
      links: [
        { label: "School Fees Structure", href: "#" },
        { label: "School Rules & Uniform", href: "#" },
        { label: "Scholarships & RTE", href: "#" },
        { label: "School Transport", href: "#" },
        { label: "Parent Portal Login", href: "#" },
        { label: "Alumni Network", href: "#" },
      ],
    },
    {
      title: "Legal & Docs",
      links: [
        { label: "Mandatory CBSE Disclosures", href: "#" },
        { label: "School Management Committee", href: "#" },
        { label: "Annual Report 2023–24", href: "#" },
        { label: "POSH Policy", href: "#" },
        { label: "RTI Information", href: "#" },
        { label: "Privacy Policy", href: "#" },
      ],
    },
  ],
  bottomLinks: [
    { label: "Sitemap", href: "#" },
    { label: "Terms of Use", href: "#" },
    { label: "Grievance Cell", href: "#" },
  ],
};
