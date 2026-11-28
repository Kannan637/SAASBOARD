export interface BlogArticleSection {
  heading: string;
  paragraphs: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  category: string;
  title: string;
  description: string;
  publisherName: string;
  publisherRole: string;
  publishedDate: string;
  isoDate: string;
  readTime: string;
  imageSrc: string;
  imageAlt: string;
  keyTakeaways: string[];
  sections: BlogArticleSection[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "post-01",
    slug: "pure-ftth-optical-fibre-vs-copper-broadband",
    category: "Fibre Infrastructure",
    title: "Pure FTTH Optical Fibre vs Legacy Copper Broadband: What Changes at Home?",
    description:
      "Discover why running single-mode glass optical fibre directly into your living room eliminates monsoon dropouts, evening speed throttling, and high video-call latency.",
    publisherName: "SASH Network Engineering",
    publisherRole: "Optical Core Team",
    publishedDate: "Nov 24, 2026",
    isoDate: "2026-11-24",
    readTime: "5 min read",
    imageSrc: "/hero-broadband.jpg",
    imageAlt: "Pure FTTH optical fibre home broadband router and high-speed connection",
    keyTakeaways: [
      "100% single-mode glass fibre is immune to lightning, rain, and electromagnetic interference.",
      "Symmetrical upload and download speeds keep Zoom, Teams, and cloud backups smooth.",
      "Sub-5ms local latency outperforms hybrid coaxial-copper last-mile cables.",
    ],
    sections: [
      {
        heading: "Why Last-Mile Cabling Determines Your Real Speed",
        paragraphs: [
          "Many traditional broadband connections advertise fibre speeds but terminate optical lines at a street cabinet, completing the final 100 to 300 metres over legacy copper or coaxial cable. That copper bottleneck introduces signal attenuation, packet loss during heavy rain, and asymmetric upload limits.",
          "With true Fibre-to-the-Home (FTTH), SASH Broadband splices single-mode optical glass directly into the Optical Network Terminal (ONT) inside your home or office. Light pulses carry your data end-to-end without electrical interference.",
        ],
      },
      {
        heading: "Symmetrical Bandwidth for Modern Households",
        paragraphs: [
          "Today's households don't just download streams—they upload 4K video calls, push large design files to cloud drives, and stream live gameplay. Pure GPON FTTH delivers 1:1 symmetrical throughput so uploads never choke simultaneous 4K TV playback.",
        ],
      },
    ],
  },
  {
    id: "post-02",
    slug: "sme-broadband-vs-dedicated-internet-leased-line",
    category: "Enterprise & SME",
    title: "SME Business Broadband vs 1:1 Dedicated Leased Line: Which Does Your Office Need?",
    description:
      "A practical engineering breakdown comparing contention ratios, BGP routing, static IP blocks, and SLA uptime guarantees for growing Tamil Nadu businesses.",
    publisherName: "Karthik Sundaram",
    publisherRole: "Enterprise Solutions Architect",
    publishedDate: "Nov 21, 2026",
    isoDate: "2026-11-21",
    readTime: "6 min read",
    imageSrc: "/Business/enterprise-leased-line.png",
    imageAlt: "Enterprise 1:1 dedicated internet leased line optical connectivity",
    keyTakeaways: [
      "SME Broadband is ideal for retail counters, clinics, and 5–25 person offices.",
      "1:1 Dedicated Leased Lines guarantee uncontended bandwidth 24/7 with 99.99% SLA.",
      "Dedicated subnet static IPs simplify self-hosted ERP, VPNs, and firewall peering.",
    ],
    sections: [
      {
        heading: "Understanding Contention Ratios in Commercial Links",
        paragraphs: [
          "High-grade SME business broadband uses low-contention GPON rings with business QoS prioritization—giving small offices rapid burst speeds at an economical monthly tariff.",
          "However, factories, hospitals, financial branches, and software teams running real-time cloud ERPs require guaranteed throughput every second of the day. A 1:1 Internet Leased Line (ILL) reserves dedicated capacity exclusively for your premise from our core switch to Tier-1 upstream gateways.",
        ],
      },
      {
        heading: "When to Upgrade to a 1:1 Leased Line",
        paragraphs: [
          "If your operations host on-premise servers, connect 30+ concurrent VoIP/SIP channels, or transfer multi-gigabyte CAD and medical imaging datasets across branches, a dedicated 1:1 leased line pays for itself in zero-downtime productivity.",
        ],
      },
    ],
  },
  {
    id: "post-03",
    slug: "dual-band-wifi-router-placement-guide-tamil-nadu-homes",
    category: "Home Wi-Fi Tips",
    title: "Where to Place Your Dual-Band Wi-Fi Router for Full-Home Coverage Through Concrete Walls",
    description:
      "Reinforced concrete slabs and brick walls in Indian homes absorb 5 GHz signals rapidly. Use these 5 field-tested placement rules to eliminate dead zones.",
    publisherName: "Praveen Raj",
    publisherRole: "Lead Field Splicing Engineer",
    publishedDate: "Nov 18, 2026",
    isoDate: "2026-11-18",
    readTime: "4 min read",
    imageSrc: "/Service/lifestyle-bg.jpg",
    imageAlt: "Family enjoying seamless full-home dual-band Wi-Fi coverage",
    keyTakeaways: [
      "Mount your dual-band router centrally at 4 to 5 feet elevation—never inside closed wooden TV cabinets.",
      "Use 5 GHz for 4K TVs, laptops, and gaming in nearby rooms; use 2.4 GHz for distant bedrooms and smart plugs.",
      "For duplexes or G+2 houses, add a wired Ethernet access point rather than wireless repeaters.",
    ],
    sections: [
      {
        heading: "How RCC Walls Affect 2.4 GHz and 5 GHz Bands",
        paragraphs: [
          "Dual-band gigabit routers broadcast two distinct radio frequencies. The 5 GHz band delivers ultra-fast gigabit throughput with minimal neighbour interference, while the 2.4 GHz band bends more easily around thick masonry walls.",
          "Tucking an ONT router behind a television panel or inside a shoe rack can cut wireless signal strength by more than 60% before it even leaves the hall.",
        ],
      },
      {
        heading: "Wired Ethernet Backhaul for Multi-Floor Homes",
        paragraphs: [
          "In two-storey homes across Thiruvallur and Chennai suburbs, running a single concealed Cat6 cable from the ground-floor ONT to an upper-floor access point preserves 100% of your fibre plan's speed upstairs.",
        ],
      },
    ],
  },
  {
    id: "post-04",
    slug: "commercial-4k-ip-cctv-nvr-cloud-storage-guide",
    category: "CCTV & Security",
    title: "Planning Commercial 4K IP CCTV Surveillance: H.265+ NVR Storage & Mobile Alerts",
    description:
      "How to calculate 30-to-60 day NVR retention, configure static IP port forwarding safely, and monitor warehouses or gated communities live from your smartphone.",
    publisherName: "SASH Security Desk",
    publisherRole: "Premises Surveillance Division",
    publishedDate: "Nov 14, 2026",
    isoDate: "2026-11-14",
    readTime: "5 min read",
    imageSrc: "/Business/cctv-surveillance.png",
    imageAlt: "Commercial 4K IP CCTV surveillance console and NVR setup",
    keyTakeaways: [
      "H.265+ smart compression cuts hard-drive storage consumption by up to 50% without losing plate-reading clarity.",
      "PoE (Power over Ethernet) cabling carries both 48V power and gigabit video over a single Cat6 run.",
      "Dedicated upload bandwidth ensures zero lag when viewing 8 to 32 live camera feeds remotely.",
    ],
    sections: [
      {
        heading: "Sizing Your Surveillance Bandwidth & Storage",
        paragraphs: [
          "High-definition 4MP and 8MP (4K) IP cameras generate continuous video streams that rely on clean PoE switching and reliable NVR write speeds. Using H.265+ encoding dramatically extends retention from two weeks to over 60 days on surveillance-grade drives.",
          "Pairing your NVR with symmetrical SASH Fibre ensures instant push notifications and zero-buffer live playback on iOS and Android apps from anywhere.",
        ],
      },
    ],
  },
  {
    id: "post-05",
    slug: "multi-branch-private-optical-intranet-wan-tamil-nadu",
    category: "Private Intranet",
    title: "Connecting Factories, Warehouses & Head Offices Over Private Optical Intranet",
    description:
      "Why multi-site enterprises in industrial parks are replacing public VPN bottlenecks with Layer-2 optical VLANs and MPLS point-to-point circuits.",
    publisherName: "Vigneshwaran M.",
    publisherRole: "Core Routing & MPLS Lead",
    publishedDate: "Nov 10, 2026",
    isoDate: "2026-11-10",
    readTime: "6 min read",
    imageSrc: "/Business/private-intranet-wan.png",
    imageAlt: "Private multi-site optical intranet connecting branches securely",
    keyTakeaways: [
      "Traffic between your branches travels over isolated private VLAN rings—never touching the public internet.",
      "Sub-2ms inter-branch latency enables centralized Tally, SAP, and IP-PBX intercom dialing.",
      "Hardware-level isolation eliminates public DDoS exposure on internal file servers.",
    ],
    sections: [
      {
        heading: "Zero Public Internet Exposure for Internal Data",
        paragraphs: [
          "When warehouses in Sriperumbudur or Thiruvallur sync inventory databases with a corporate office over public internet VPNs, encryption overhead and public congestion slow down transactions.",
          "SASH Private Intranet provisions a dedicated Layer-2 / Layer-3 optical path directly between your locations—making remote branches behave as if they are plugged into the exact same local switch.",
        ],
      },
    ],
  },
  {
    id: "post-06",
    slug: "sub-5ms-latency-gaming-voip-cloud-erp",
    category: "Network Performance",
    title: "Mbps vs Milliseconds: Why Sub-5ms Ping Matters More Than Raw Bandwidth",
    description:
      "High download numbers mean little if packet jitter stalls your voice calls or competitive matches. Inside how direct Tier-1 peering keeps latency ultra-low.",
    publisherName: "SASH Network Engineering",
    publisherRole: "NOC Peering Team",
    publishedDate: "Nov 06, 2026",
    isoDate: "2026-11-06",
    readTime: "4 min read",
    imageSrc: "/hero-speed.jpg",
    imageAlt: "Ultra-low latency gigabit optical fibre speed performance",
    keyTakeaways: [
      "Latency (ping) measures round-trip response time; jitter measures consistency between packets.",
      "Direct domestic peering in Chennai cuts hops to AWS Mumbai, Google Cloud, and gaming servers.",
      "Optical GPON framing avoids the RF scheduling delays common on mobile 4G/5G hotspots.",
    ],
    sections: [
      {
        heading: "Bandwidth Is Highway Width; Latency Is Travel Speed",
        paragraphs: [
          "Once a connection exceeds 100 Mbps, opening web apps, executing stock trades, speaking on Microsoft Teams, or playing Valorant depends primarily on round-trip latency and zero packet loss.",
          "By peering directly with major content caches and Tier-1 transit providers in Tamil Nadu, SASH Broadband minimizes router hops so interactive applications respond instantaneously.",
        ],
      },
    ],
  },
  {
    id: "post-07",
    slug: "dual-ring-optical-redundancy-monsoon-uptime",
    category: "Reliability & NOC",
    title: "How Dual-Ring Optical Redundancy Keeps Your Internet Online During Monsoon Storms",
    description:
      "A behind-the-scenes look at how SASH Broadband engineers ring-protected fibre routes, battery-backed OLT nodes, and 2-hour local splicing dispatch.",
    publisherName: "Arun Prakash",
    publisherRole: "Head of Field Operations",
    publishedDate: "Nov 02, 2026",
    isoDate: "2026-11-02",
    readTime: "5 min read",
    imageSrc: "/Hero/leased-line-bg.jpg",
    imageAlt: "Resilient optical fibre ring infrastructure managed 24/7",
    keyTakeaways: [
      "Ring topology automatically reroutes light traffic in the opposite direction if a roadside cable cut occurs.",
      "Central OLT distribution nodes run on multi-hour UPS and generator backup during grid outages.",
      "Adding a ₹999 mini router UPS at home keeps your Wi-Fi running seamlessly during local power cuts.",
    ],
    sections: [
      {
        heading: "Self-Healing Ring Architecture vs Linear Daisy Chains",
        paragraphs: [
          "Smaller cable operators often string linear point-to-point cables where a single fallen tree branch disconnects hundreds of homes downstream.",
          "SASH Broadband builds closed optical rings across Thiruvallur corridors with automated BGP failover and continuous optical dBm monitoring from our 24/7 NOC.",
        ],
      },
    ],
  },
  {
    id: "post-08",
    slug: "scaling-sme-fibre-for-retail-clinics-offices",
    category: "SME Growth",
    title: "Future-Proofing Retail Stores, Clinics & Co-Working Spaces with Scalable SME Fibre",
    description:
      "From UPI POS terminals and cloud billing to guest Wi-Fi isolation, here is how modern SMEs set up resilient, zero-headache office internet.",
    publisherName: "Divya Narayanan",
    publisherRole: "SME Account Specialist",
    publishedDate: "Oct 28, 2026",
    isoDate: "2026-10-28",
    readTime: "5 min read",
    imageSrc: "/Business/sme-business-fibre.png",
    imageAlt: "Scalable SME business fibre connectivity for retail and clinics",
    keyTakeaways: [
      "Separate your billing POS and doctor/staff devices onto a private SSID away from guest Wi-Fi.",
      "Tariff price-lock protects your monthly operational budget for up to 2 full years.",
      "Instant bandwidth upgrades let you scale from 100 Mbps to 500 Mbps+ without changing hardware.",
    ],
    sections: [
      {
        heading: "Keeping Point-of-Sale & Cloud Billing Always Responsive",
        paragraphs: [
          "During weekend retail rushes or morning clinic hours, dozens of visitor phones connecting to open Wi-Fi can saturate a basic home router's NAT table.",
          "Our SME Fibre plans pair commercial-grade routing with priority traffic queuing so GST billing, card machines, and tele-consultations never stall.",
        ],
      },
    ],
  },
  {
    id: "post-09",
    slug: "static-ip-routing-guide-for-cctv-vpn-servers",
    category: "Network Engineering",
    title: "When Do You Need a Static Public IP Address? Practical Use Cases Explained",
    description:
      "Learn how static IPv4 addressing simplifies remote NVR camera access, site-to-site IPsec VPNs, biometric attendance sync, and whitelisted banking portals.",
    publisherName: "Karthik Sundaram",
    publisherRole: "Enterprise Solutions Architect",
    publishedDate: "Oct 24, 2026",
    isoDate: "2026-10-24",
    readTime: "4 min read",
    imageSrc: "/Business/Protected Intranet Network Laptop.png",
    imageAlt: "Static IP routing and secure remote office VPN access",
    keyTakeaways: [
      "Static IPs remain fixed permanently across router reboots—ideal for firewall whitelisting.",
      "Eliminates third-party DDNS delays when accessing on-premise NVRs or file servers.",
      "Available as single static IPs for SMEs or /29 and /30 subnets on Dedicated Leased Lines.",
    ],
    sections: [
      {
        heading: "Dynamic CGNAT vs Dedicated Static Public IPv4",
        paragraphs: [
          "Standard residential connections use dynamic addressing, which is great for everyday browsing and streaming. However, businesses connecting to IP-whitelisted corporate banks, government portals, or remote biometric servers require a permanent, verifiable public IP identity.",
        ],
      },
    ],
  },
  {
    id: "post-10",
    slug: "4k-ott-streaming-smart-tv-iptv-optimization",
    category: "Home Entertainment",
    title: "Getting Zero-Buffer 4K HDR Streaming on Smart TVs: OTT & IPTV Network Checklist",
    description:
      "Watching live cricket in 4K at 50fps alongside family devices? Follow these simple Smart TV networking tweaks for instant channel switching.",
    publisherName: "SASH Customer Tech Desk",
    publisherRole: "Residential Fibre Team",
    publishedDate: "Oct 19, 2026",
    isoDate: "2026-10-19",
    readTime: "4 min read",
    imageSrc: "/hero-sme.jpg",
    imageAlt: "Ultra-smooth 4K Smart TV OTT and IPTV streaming over SASH fibre",
    keyTakeaways: [
      "A single 4K Dolby Vision stream requires 25–40 Mbps of steady, unthrottled throughput.",
      "Connect wall-mounted Smart TVs via Ethernet or the 5 GHz Wi-Fi band for instant live sports.",
      "Truly unlimited data plans mean zero mid-month FUP speed drops to 2 Mbps.",
    ],
    sections: [
      {
        heading: "Why Live 4K Sports Demand Consistent Throughput",
        paragraphs: [
          "Unlike pre-recorded movies that buffer minutes ahead, live 4K cricket and football broadcasts stream in real-time chunks with minimal buffer margin. SASH Broadband's local CDN caches deliver crisp 4K frames with zero resolution drops.",
        ],
      },
    ],
  },
  {
    id: "post-11",
    slug: "wpa3-wifi-security-and-guest-network-isolation",
    category: "Cybersecurity",
    title: "Securing Your Home & Office Wi-Fi: WPA3 Encryption, DNS Filtering & IoT Isolation",
    description:
      "Smart TVs, CCTV cameras, and IoT appliances shouldn't share the same network trust zone as your work laptop. Five 10-minute steps to lock down your router.",
    publisherName: "SASH Security Desk",
    publisherRole: "Network Security Team",
    publishedDate: "Oct 15, 2026",
    isoDate: "2026-10-15",
    readTime: "5 min read",
    imageSrc: "/Business/Wi-Fi Network Security Shield.png",
    imageAlt: "Wi-Fi WPA3 network security shield protecting connected devices",
    keyTakeaways: [
      "Enable WPA2/WPA3 mixed or WPA3-Personal mode and disable legacy WPS PIN login immediately.",
      "Place smart bulbs, plugs, and visitor phones on an isolated Guest SSID.",
      "Change default router admin credentials during initial installation—our engineers do this free.",
    ],
    sections: [
      {
        heading: "Why WPS Should Always Be Turned Off",
        paragraphs: [
          "Wi-Fi Protected Setup (WPS) 8-digit PINs can be brute-forced in hours even if you have a strong Wi-Fi password. Disabling WPS and enabling WPA3 SAE handshake protection keeps unauthorized neighbours and scanners out of your LAN.",
        ],
      },
    ],
  },
  {
    id: "post-12",
    slug: "industrial-corridor-fibre-deployment-thiruvallur",
    category: "Regional Infrastructure",
    title: "Powering Thiruvallur & Perambakkam Industrial Corridors with Gigabit Optical Rings",
    description:
      "How SASH Broadband is expanding Class–B ISP underground and aerial optical infrastructure across manufacturing hubs, warehouses, and townships.",
    publisherName: "SASH Leadership Team",
    publisherRole: "Infrastructure Planning",
    publishedDate: "Oct 10, 2026",
    isoDate: "2026-10-10",
    readTime: "5 min read",
    imageSrc: "/About Us/about-hero-showcase.png",
    imageAlt: "SASH Broadband optical infrastructure expansion across Tamil Nadu",
    keyTakeaways: [
      "Licensed DoT Class–B ISP operating local NOC and splicing teams right in Thiruvallur.",
      "Rapid 24–48 hour feasibility & activation across Kadambattur, Perambakkam, and surrounding industrial estates.",
      "Direct local accountability without third-party franchise middlemen.",
    ],
    sections: [
      {
        heading: "Bridging the Enterprise Connectivity Gap Beyond Metro Cores",
        paragraphs: [
          "Manufacturing units and logistics parks outside central Chennai historically faced slow microwave links or weeks-long ticket queues from national telcos. Our locally stationed Thiruvallur fusion splicing fleet delivers metro-grade gigabit SLA right to industrial gates.",
        ],
      },
    ],
  },
  {
    id: "post-13",
    slug: "sla-99-99-uptime-mttr-explained-for-it-managers",
    category: "Enterprise SLA",
    title: "Decoding ISP SLAs: What 99.9% vs 99.99% Uptime and 4-Hour MTTR Actually Guarantee",
    description:
      "Before signing an enterprise connectivity contract, check these 4 technical SLA clauses: packet loss ceilings, latency commitments, and local dispatch times.",
    publisherName: "Vigneshwaran M.",
    publisherRole: "Core Routing & MPLS Lead",
    publishedDate: "Oct 05, 2026",
    isoDate: "2026-10-05",
    readTime: "6 min read",
    imageSrc: "/hero-leased-line.jpg",
    imageAlt: "Enterprise SLA network uptime monitoring and NOC operations",
    keyTakeaways: [
      "Mean Time to Repair (MTTR) matters just as much as annual uptime percentage.",
      "Proactive SNMP optical power monitoring catches fibre bends before link loss occurs.",
      "Direct NOC engineer escalation avoids multi-tier call-centre delays.",
    ],
    sections: [
      {
        heading: "Proactive Optical Monitoring vs Reactive Ticketing",
        paragraphs: [
          "Our NOC tracks optical receive power (dBm) across enterprise CPEs continuously. If roadwork bends a duct and attenuates light levels past -24 dBm, our field team is alerted before your office notices a single dropped packet.",
        ],
      },
    ],
  },
  {
    id: "post-14",
    slug: "ip67-outdoor-bullet-vs-dome-cctv-cameras",
    category: "CCTV & Security",
    title: "Outdoor Bullet vs Indoor Dome IP Cameras: Choosing the Right Lens & Night Vision",
    description:
      "ColorVu warm-light sensors vs infrared night vision, 2.8mm wide-angle vs 6mm gate lenses, and IP67 weatherproofing for Tamil Nadu's summer heat and monsoons.",
    publisherName: "SASH Security Desk",
    publisherRole: "Premises Surveillance Division",
    publishedDate: "Sep 29, 2026",
    isoDate: "2026-09-29",
    readTime: "5 min read",
    imageSrc: "/Business/High-Tech CCTV Building Monitor.png",
    imageAlt: "Outdoor IP67 bullet and dome CCTV surveillance monitoring",
    keyTakeaways: [
      "Use 2.8mm wide-angle dome cameras for lobbies, retail aisles, and living areas.",
      "Use 4mm or 6mm IP67 bullet cameras at compound gates to capture crisp vehicle number plates.",
      "Full-color night vision sensors retain vehicle and clothing colors in near-total darkness.",
    ],
    sections: [
      {
        heading: "Matching Focal Length to Perimeter Distance",
        paragraphs: [
          "Installing wide-angle 2.8mm cameras everywhere is the most common CCTV mistake—making faces and licence plates 15 metres away appear tiny. Combining wide overview domes with focused gate bullets gives complete forensic clarity.",
        ],
      },
    ],
  },
  {
    id: "post-15",
    slug: "tariff-price-lock-and-truly-unlimited-broadband",
    category: "Subscriber Guide",
    title: "Why Tariff Price-Lock & Zero FUP Throttling Save Families Thousands Each Year",
    description:
      "Many promotional broadband plans hike tariffs after 90 days or cap speeds at 3.3 TB. Here is how transparent price-locked plans work at SASH Broadband.",
    publisherName: "Divya Narayanan",
    publisherRole: "Customer Experience Lead",
    publishedDate: "Sep 24, 2026",
    isoDate: "2026-09-24",
    readTime: "4 min read",
    imageSrc: "/Business/Ascending Business Plan Cards.png",
    imageAlt: "Transparent broadband tariff plans with price-lock guarantee",
    keyTakeaways: [
      "Personal Pack (₹650/mo) and Family Pack (₹799/mo) include ₹0 installation and router setup.",
      "1-to-2 year tariff price lock shields subscribers from surprise mid-year bill hikes.",
      "Zero hidden modem rentals or installation security deposits.",
    ],
    sections: [
      {
        heading: "Predictable Monthly Bills Without Fine-Print Surprises",
        paragraphs: [
          "Internet connectivity is an essential household utility. Our straightforward monthly tariffs lock in your rate from day one, backed by free doorstep optical drop cabling and pre-configured router installation.",
        ],
      },
    ],
  },
  {
    id: "post-16",
    slug: "campus-wifi-and-fibre-for-schools-colleges",
    category: "Education & Institutions",
    title: "Designing High-Density Campus Fibre for Schools, Colleges & Online Exam Labs",
    description:
      "How educational institutions support 200+ simultaneous CBT exam terminals, smart classrooms, and hostel Wi-Fi without network bottlenecks.",
    publisherName: "Karthik Sundaram",
    publisherRole: "Institutional Networks Team",
    publishedDate: "Sep 18, 2026",
    isoDate: "2026-09-18",
    readTime: "5 min read",
    imageSrc: "/Hero/intranet-bg.jpg",
    imageAlt: "High-density campus optical fibre network for schools and colleges",
    keyTakeaways: [
      "Dedicated exam-lab VLANs reserve guaranteed bandwidth during university and competitive tests.",
      "Content-filtering DNS policies help institutions maintain safe student browsing automatically.",
      "Fibre backbone between academic blocks eliminates copper 100-metre distance limits.",
    ],
    sections: [
      {
        heading: "Zero-Drop Connectivity for Computer-Based Testing (CBT)",
        paragraphs: [
          "Standardized online assessments require rock-solid session persistence and synchronized uploads when hundreds of students submit exams simultaneously. Our institutional leased lines and campus optical rings are stress-tested for peak concurrency.",
        ],
      },
    ],
  },
  {
    id: "post-17",
    slug: "understanding-ont-lights-pon-los-router-guide",
    category: "Quick Troubleshooting",
    title: "Understanding Your Fibre ONT Lights: What Power, PON, LOS & LAN Indicators Mean",
    description:
      "A 2-minute homeowner guide to reading your fibre router's LED status lights—and simple checks before calling our 24/7 Thiruvallur support desk.",
    publisherName: "Praveen Raj",
    publisherRole: "Lead Field Splicing Engineer",
    publishedDate: "Sep 12, 2026",
    isoDate: "2026-09-12",
    readTime: "3 min read",
    imageSrc: "/Service/sme-comparison-bg.jpg",
    imageAlt: "Optical Network Terminal LED status guide and fibre troubleshooting",
    keyTakeaways: [
      "Solid green PON light means your optical laser link to the SASH OLT is healthy.",
      "Blinking red LOS (Loss of Signal) indicates a pinched yellow patch cord or outdoor line issue.",
      "Never bend the yellow optical patch cord at sharp 90-degree angles when cleaning behind furniture.",
    ],
    sections: [
      {
        heading: "Protecting the Yellow Optical Patch Cord",
        paragraphs: [
          "Inside the yellow patch cord entering your router is a hair-thin strand of glass. Keeping gentle loops rather than tight bends preserves optimal optical signal strength (-16 dBm to -22 dBm) for years of trouble-free gigabit speed.",
        ],
      },
    ],
  },
  {
    id: "post-18",
    slug: "pre-wiring-new-home-or-office-for-concealed-fibre",
    category: "Construction & Interiors",
    title: "Building a New Home or Office? Pre-Wire Concealed Fibre & Cat6 Conduits Before Painting",
    description:
      "Architects and homeowners can hide every cable invisibly by planning a central network box, ceiling AP drops, and PoE camera conduits during electrical work.",
    publisherName: "Arun Prakash",
    publisherRole: "Head of Field Operations",
    publishedDate: "Sep 05, 2026",
    isoDate: "2026-09-05",
    readTime: "5 min read",
    imageSrc: "/hero-intranet.jpg",
    imageAlt: "Clean concealed optical fibre and Cat6 network conduit planning",
    keyTakeaways: [
      "Run a dedicated 20mm smooth PVC conduit with sweeping bends from your gate/terrace box to a central DB.",
      "Pull Cat6 drops to every TV wall, study desk, ceiling AP point, and exterior corner camera spot.",
      "Contact SASH engineering during interior work for a complimentary pre-wiring site consultation.",
    ],
    sections: [
      {
        heading: "Sweeping Conduit Bends Make Fibre Pulling Effortless",
        paragraphs: [
          "Planning a ventilated utility cabinet with a 5A power socket and Cat6 star-wiring during construction means zero exposed wall clips, invisible ceiling Wi-Fi access points, and clean PoE CCTV cameras from day one.",
        ],
      },
    ],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
