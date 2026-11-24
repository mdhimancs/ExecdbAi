import { CareerMilestone, BlogPost, ArchiveItem, SkillCategory, ExecutiveCaseStudy } from '../types';

export const CYBERSECURITY_PERSONAL_INFO = {
  name: "Munish Dhiman",
  title: "CISO / dyCISO Track | Principal Cybersecurity & IAM Architect - IAM, Digital Security, Directory Entitlements | Former SVP, Goldman Sachs",
  tagline: "Transforming enterprise security posture through Zero Trust Architecture, Scalable IAM Governance & AI-Driven Risk Resilience. 21+ years securing Fortune 100 multi-cloud perimeters, modernizing identity fabrics, and aligning digital defense with enterprise risk governance.",
  bioShort: "Cybersecurity Executive & Enterprise Architect with 21+ years protecting Fortune 100 infrastructures across Goldman Sachs and global tech leaders. Trusted to direct Zero Trust IAM, lead high-performing global teams, and deliver an unblemished 100% clean regulatory audit record.",
  location: "Bengaluru, India",
  email: "munish.world@gmail.com",
  github: "https://github.com/mdhimancs",
  linkedin: "https://www.linkedin.com/in/munishd",
  twitter: "https://twitter.com",
  substack: "https://substack.com",
  stats: [
    { label: "Executive Track Record", value: "21+ Yrs", sublabel: "Defense & IAM Leadership" },
    { label: "Identities Protected", value: "5M+", sublabel: "Workforce, Cloud & Non-Human Identities" },
    { label: "Audit Deficiencies", value: "0 Findings", sublabel: "SOX 404 & GRC (3+ Yrs)" },
    { label: "Privileged Exposure", value: "-98.4%", sublabel: "Zero Standing Privilege" },
    { label: "Global Enterprise Scale", value: "Fortune 100", sublabel: "Financial & Tech Tier-1" }
  ]
};

export const CYBERSECURITY_SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Executive Strategy & Board Governance",
    iconName: "Cpu",
    description: "C-suite cyber governance, $18.5M modernization, and enterprise risk economics.",
    skills: [
      { name: "Target Operating Model & Cyber Strategy", level: 98 },
      { name: "Architecture Review Board (ARB) Governance", level: 96 },
      { name: "Board & Audit Committee Reporting", level: 95 },
      { name: "Global Engineering Leadership", level: 94 },
      { name: "Institutional Incident Command", level: 93 }
    ]
  },
  {
    title: "Identity Fabric & Access Architecture",
    iconName: "Shield",
    description: "Unified identity lifecycle, automated governance, and federated trust.",
    skills: [
      { name: "OAuth 2.0, OIDC & SAML Federation", level: 98 },
      { name: "Hybrid Directory & Tier-0 Hardening", level: 96 },
      { name: "Enterprise IdP (Entra ID & Okta)", level: 95 },
      { name: "Identity Governance (SailPoint IGA)", level: 92 },
      { name: "API Security & Identity Gateways", level: 90 }
    ]
  },
  {
    title: "Zero Trust Architecture & PAM",
    iconName: "Lock",
    description: "Zero standing privilege, continuous verification, and hardware-backed auth.",
    skills: [
      { name: "Zero Trust Architecture (NIST 800-207)", level: 96 },
      { name: "Privileged Access (CyberArk PAM)", level: 95 },
      { name: "Phishing-Resistant MFA (FIDO2)", level: 94 },
      { name: "Zero Standing Privilege (ZSP / JIT)", level: 92 },
      { name: "CIEM & Cloud Entitlements", level: 89 }
    ]
  },
  {
    title: "Hybrid Multi-Cloud & Enclave Defense",
    iconName: "Network",
    description: "Multi-cloud posture, micro-segmentation, and low-latency trading enclaves.",
    skills: [
      { name: "Cloud Posture & CSPM (AWS & Azure)", level: 95 },
      { name: "Enterprise PKI, HSM & Cryptography", level: 95 },
      { name: "Micro-segmentation & Trading Enclaves", level: 94 },
      { name: "Edge Defense & SASE Architecture", level: 93 },
      { name: "Low-Latency Transit & Isolation", level: 92 }
    ]
  },
  {
    title: "AI Governance & Data Security (DSPM)",
    iconName: "Brain",
    description: "Enterprise LLM guardrails, data tokenization, and sovereign AI compliance.",
    skills: [
      { name: "Data Security Posture (DSPM)", level: 95 },
      { name: "AI Risk Posture (NIST AI RMF)", level: 94 },
      { name: "GenAI Guardrails (OWASP LLM Top 10)", level: 93 },
      { name: "Behavioral Threat Analytics (UEBA)", level: 92 },
      { name: "Sovereign AI & Data Privacy (GDPR)", level: 92 }
    ]
  },
  {
    title: "Regulatory Assurance & Cyber Risk",
    iconName: "FileCheck",
    description: "Supervisory examination defense, quantitative risk analysis, and compliance.",
    skills: [
      { name: "Tier-1 Audits (ISO 27001 & SOC 2)", level: 96 },
      { name: "NIST CSF 2.0 & CIS Benchmarks", level: 95 },
      { name: "Quantitative Risk (FAIR™) & STRIDE", level: 95 },
      { name: "Supervisory Defense (SOX 404 & Fed)", level: 94 },
      { name: "Continuous Compliance Automation", level: 93 }
    ]
  }
];

export const CYBERSECURITY_CASE_STUDIES: ExecutiveCaseStudy[] = [
  {
    id: 'cs-enterprise-iam-modernization',
    title: 'Enterprise IAM & Zero Trust Privilege Modernization',
    subtitle: 'Consolidating 5M+ hybrid identities into an automated IGA and ephemeral PAM fabric.',
    category: 'Enterprise IAM & Zero Trust',
    businessScale: '5M+ Identities • 18K Servers • 350+ Apps',
    executiveImpact: 'Eliminated 98.4% of standing privileged credentials; achieved 3 consecutive years of zero SOX 404 material audit findings.',
    impactMetrics: [
      { label: 'Standing Privileges', value: '-98.4%', desc: 'Transitioned to Just-In-Time (JIT) ephemeral credential elevation' },
      { label: 'Audit Findings', value: '0', desc: 'Zero material weaknesses across SOX, SOC 2 Type II, and ISO 27001' },
      { label: 'Provisioning SLA', value: '4 mins', desc: 'Reduced joiner-mover-leaver (JML) lifecycle SLA from 7 days' },
      { label: 'Cost Savings', value: '$3.4M', desc: 'Annualized cost reduction via vendor consolidation' }
    ],
    challenge: 'A legacy enterprise environment suffered from severe identity sprawl: 14 disconnected Active Directory forests, unmanaged local administrator accounts on 18,000+ servers, manual access certification cycles taking 90+ days, and repeated SOX 404 access control audit deficiencies.',
    strategy: [
      'Engineered an enterprise Identity Mesh integrating SailPoint IdentityIQ for automated Joiner-Mover-Leaver (JML) lifecycle and CyberArk Privilege Cloud for vaulting and session isolation.',
      'Enforced Zero Standing Privileges (ZSP) across AWS, Azure, and on-premises Tier-0 assets with time-bound, step-up MFA approvals.',
      'Implemented automated role-mining and dynamic birthright entitlement assignments using SCIM 2.0 connectors.'
    ],
    architectureHighlights: [
      'Multi-Cloud IGA orchestration leveraging SCIM 2.0 and event-driven webhooks.',
      'FIDO2 Phishing-Resistant Passwordless Authentication enforced via Entra ID Conditional Access.',
      'Automated micro-certification campaigns reducing manager review fatigue by 70% with AI-driven risk scoring.'
    ],
    businessOutcome: 'Transformed the identity organization from an audit vulnerability into a strategic business enabler, reducing onboarding friction for 50,000+ annual contractors and delivering complete regulatory audit compliance.',
    financialAndAuditRoi: 'Saved $3.4M annually in operational overhead and legacy software licensing while completely eliminating audit penalty exposure.',
    tags: ['Zero Trust', 'IGA', 'PAM', 'SailPoint', 'CyberArk', 'Entra ID', 'SOX 404'],
    status: 'Enterprise Standard',
    leadershipRole: 'Executive Security Architect & Program Lead (governing 32 cross-functional engineers, identity specialists, and GRC auditors).',
    imageUrl: './images/zero_trust_iam.jpg',
    imageAlt: 'Modernized Enterprise Zero Trust IAM & Cryptographic Privilege Command Center'
  },
  {
    id: 'cs-ai-security-governance',
    title: 'Enterprise AI Security Gateway & Data Protection',
    subtitle: 'Contextual DLP, prompt injection defense, and governance across 140+ GenAI models.',
    category: 'AI Security & Governance',
    businessScale: '65K Enterprise Users • 140+ LLMs • 12M Daily Queries',
    executiveImpact: 'Enabled safe enterprise GenAI adoption with zero proprietary data leakage; achieved 100% alignment with NIST AI RMF 1.0.',
    impactMetrics: [
      { label: 'Data Leakage', value: '0 Incidents', desc: 'Cryptographic tokenization of all PII/PHI and source code' },
      { label: 'Injections Blocked', value: '99.9%', desc: 'Real-time semantic filtering and adversarial guardrails' },
      { label: 'Gateway Latency', value: '<18ms', desc: 'Zero noticeable latency added to enterprise agent workflows' },
      { label: 'Shadow AI Visibility', value: '100%', desc: 'Redirected unvetted consumer AI traffic to secure enterprise tenant' }
    ],
    challenge: 'Business units rapidly adopted public and shadow AI tools, risking massive intellectual property exfiltration, customer PII leakage into third-party training corpuses, and adversarial prompt injection into internal autonomous agents.',
    strategy: [
      'Architected a centralized Enterprise AI Security Gateway acting as an intelligent reverse proxy for all external LLMs (OpenAI, Anthropic, Google Gemini) and internal vector models.',
      'Implemented real-time contextual Data Loss Prevention (DLP) that dynamically redacts or tokenizes sensitive customer records, trade secrets, and API keys prior to prompt egress.'
    ],
    architectureHighlights: [
      'Multi-model reverse proxy inspecting token streams with sub-20ms latency overhead.',
      'Semantic prompt injection classifier detecting jailbreak patterns and indirect payload injections.',
      'Granular Retrieval-Augmented Generation (RAG) access control lists (ACLs) mapped to user clearance levels.'
    ],
    businessOutcome: 'Empowered 65,000 employees to safely leverage generative AI tools while safeguarding corporate intellectual property and client confidentiality.',
    financialAndAuditRoi: 'Mitigated estimated tens of millions in potential intellectual property liability and regulatory fines.',
    tags: ['GenAI', 'DSPM', 'NIST AI RMF', 'DLP', 'LLM Security', 'Guardrails'],
    status: 'Active',
    leadershipRole: 'CISO / Enterprise Security Director (collaborating with AI Research and Legal teams).',
    imageUrl: './images/zero_trust_iam.jpg',
    imageAlt: 'Enterprise AI Security Gateway and Data Protection Command Center'
  },
  {
    id: 'cs-cloud-enclave-defense',
    title: 'Hybrid Multi-Cloud Posture (CSPM) & Low-Latency Trading Enclaves',
    subtitle: 'Automated drift remediation and microsegmented cryptographic trading perimeters across AWS & Azure.',
    category: 'Multi-Cloud & Enclave Defense',
    businessScale: '120+ Cloud Accounts • 40K Assets • Sub-0.5ms Trading Enclaves',
    executiveImpact: 'Achieved sub-120 second automated cloud misconfiguration remediation; protected institutional trading fabrics with zero lateral traversal.',
    impactMetrics: [
      { label: 'Drift Remediation', value: '<120s', desc: 'Automated policy-as-code correction of S3/IAM misconfigurations' },
      { label: 'Policy Coverage', value: '100%', desc: 'Terraform Sentinel & OPA guardrails embedded into CI/CD' },
      { label: 'Lateral Movement', value: '0 Breaches', desc: 'Kernel-level eBPF mTLS segmentation across trading nodes' },
      { label: 'Cloud Waste Eliminated', value: '$4.2M', desc: 'Identified and decommissioned unattached insecure resources' }
    ],
    challenge: 'A massive multi-cloud footprint spanning 120+ AWS and Azure subscriptions suffered from cloud security posture management (CSPM) alert fatigue, open S3 buckets, permissive cross-account IAM roles, and vulnerability to lateral movement in high-frequency trading zones.',
    strategy: [
      'Engineered a centralized Policy-as-Code pipeline using Terraform Sentinel and Open Policy Agent (OPA), preventing non-compliant infrastructure from ever provisioning.',
      'Deployed Cilium eBPF microsegmentation across Kubernetes and bare-metal nodes, providing wire-speed Kernel TLS (kTLS) encryption without proxy sidecar performance penalties.',
      'Automated event-driven cloud security response using AWS EventBridge, Azure Event Grid, and serverless remediation functions.'
    ],
    architectureHighlights: [
      'Sub-millisecond latency mTLS communication between algorithmic trading containers using Cilium eBPF.',
      'Continuous Cloud Security Posture Management (CSPM) integration with automated JIRA ticketing and developer auto-fix PRs.',
      'Cryptographically isolated hardware enclaves (AWS Nitro Enclaves & Azure Confidential Computing) for secret key storage.'
    ],
    businessOutcome: 'Elevated cloud compliance score from 64% to 99.2% across global infrastructure, enabling rapid regulatory audit clearance under Fed and FINRA examinations.',
    financialAndAuditRoi: 'Saved $4.2M in legacy vendor overlap and prevented multi-million dollar regulatory non-compliance fines.',
    tags: ['CSPM', 'Multi-Cloud', 'Cilium eBPF', 'AWS Security', 'Azure Enclaves', 'Terraform Sentinel', 'Zero Trust'],
    status: 'Enterprise Standard',
    leadershipRole: 'Principal Cloud & Security Architect (leading 20 cloud engineers and DevOps leads).',
    imageUrl: './images/zero_trust_iam.jpg',
    imageAlt: 'Hybrid Multi-Cloud Posture and Low-Latency Trading Enclaves Architecture'
  },
  {
    id: 'cs-phishing-resistant-fido2',
    title: 'Enterprise Phishing-Resistant MFA & Passwordless Identity Federation',
    subtitle: 'Eliminating credential theft and AiTM attacks across 65,000 workforce identities via FIDO2 WebAuthn.',
    category: 'Identity Federation & Auth',
    businessScale: '65K Global Workforce • 1,200+ Apps • 5 Global Hubs',
    executiveImpact: 'Completely eliminated adversary-in-the-middle (AiTM) credential phishing; reduced employee authentication friction by 75%.',
    impactMetrics: [
      { label: 'Phishing Success', value: '0%', desc: 'Hardware-bound origin validation defeats all AiTM reverse proxies' },
      { label: 'Login Speed', value: '3.2s', desc: 'Seamless biometric passkey sign-in replacing typing complex passwords' },
      { label: 'Helpdesk Tickets', value: '-82%', desc: 'Drastic reduction in locked account and password reset requests' },
      { label: 'Annual Savings', value: '$2.1M', desc: 'Direct support desk call reduction and employee time saved' }
    ],
    challenge: 'Employees were targeted by sophisticated reverse-proxy phishing kits (Evilginx) that easily intercepted session tokens and bypassed traditional SMS/push-notification MFA, resulting in high account takeover risk and annual password fatigue.',
    strategy: [
      'Architected a global passwordless migration strategy deploying FIDO2 / WebAuthn passkeys and YubiKey 5 FIPS hardware keys across 65,000 corporate devices.',
      'Configured Entra ID and PingFederate Conditional Access policies enforcing FIDO2 cryptographic origin binding as the mandatory authentication strength.',
      'Built a self-service biometric device onboarding portal integrated with automated HR vetting and supervisor video attestation.'
    ],
    architectureHighlights: [
      'Hardware-bound cryptographic keys stored inside device Secure Enclaves (Apple SE, Android StrongBox, TPM 2.0).',
      'Continuous Session Evaluation Protocol (CAEP) immediately revoking active sessions upon risk anomaly detection.',
      'Full compliance with federal Zero Trust Executive Order OMB M-22-09 mandates for phishing-resistant authenticators.'
    ],
    businessOutcome: 'Zero employee accounts compromised across 24 consecutive months of hostile red-team and real-world adversary phishing campaigns.',
    financialAndAuditRoi: 'Delivered $2.1M in direct annual helpdesk savings and lowered corporate cyber insurance premiums by 14%.',
    tags: ['FIDO2', 'WebAuthn', 'Passwordless', 'PingFederate', 'Entra ID', 'YubiKey', 'OMB M-22-09'],
    status: 'Enterprise Standard',
    leadershipRole: 'CISO / Enterprise Identity Architect (partnering with End User Computing and Risk teams).',
    imageUrl: './images/zero_trust_iam.jpg',
    imageAlt: 'Enterprise Phishing-Resistant MFA & Passwordless Identity Federation'
  },
  {
    id: 'cs-pqc-cryptographic-modernization',
    title: 'Post-Quantum Cryptography (PQC) & Hardware Root of Trust Migration',
    subtitle: 'Securing financial clearing rails and PKI infrastructures against Shor\'s algorithm via NIST FIPS 203/204.',
    category: 'PQC & Cryptographic Agility',
    businessScale: 'Tier-1 Clearing Rails • 250M Daily Txns • 85K Internal Certificates',
    executiveImpact: 'Engineered hybrid lattice-classical cryptographic transit layer; guaranteed immunity against Store-Now-Decrypt-Later (SNDL) espionage.',
    impactMetrics: [
      { label: 'SNDL Immunity', value: '100%', desc: 'Hybrid ML-KEM-768 key encapsulation across high-value data links' },
      { label: 'FIPS Alignment', value: 'FIPS 203', desc: 'Early adoption of ratified NIST post-quantum cryptographic standards' },
      { label: 'Latency Overhead', value: '<1.2ms', desc: 'Optimized lattice handshake performance on high-speed TLS 1.3' },
      { label: 'Legacy Outages', value: '0', desc: 'Zero downtime during dual-signature hybrid certificate deployment' }
    ],
    challenge: 'Nation-state adversaries execute Store-Now-Decrypt-Later (SNDL) interception against financial communications. Inevitable quantum computers running Shor\'s algorithm will break RSA and ECC, compromising 30-year sovereign financial records and PKI roots.',
    strategy: [
      'Created an Enterprise Cryptographic Inventory using automated network scanning and eBPF kernel inspection, identifying all vulnerable RSA/ECC ciphers.',
      'Deployed hybrid TLS 1.3 handshakes combining X25519 with ML-KEM-768 (Kyber) across internal core banking APIs and inter-region data replication links.',
      'Upgraded Thales Luna FIPS 140-3 HSM clusters with firmware supporting quantum-resistant lattice-based key wrapping and ML-DSA signatures.'
    ],
    architectureHighlights: [
      'Dual-key hybrid X.509 certificate hierarchy ensuring backwards compatibility with legacy client libraries.',
      'Automated certificate lifecycle management (ACME) with crypto-agility hooks to swap algorithms without code rebuilds.',
      'Lattice-based token encapsulation protecting financial clearing messages across SWIFT and FedNow rails.'
    ],
    businessOutcome: 'Established institutional cryptographic sovereignty, satisfying NSA CNSA 2.0 quantum migration guidelines years ahead of federal mandates.',
    financialAndAuditRoi: 'Shielded multi-billion dollar long-term financial contract portfolios from existential post-quantum cryptographic obsolescence.',
    tags: ['PQC', 'NIST FIPS 203', 'ML-KEM', 'ML-DSA', 'Thales Luna HSM', 'Cryptographic Agility', 'CNSA 2.0'],
    status: 'Active',
    leadershipRole: 'Principal Cryptographic Architect & Senior Director (collaborating with Quantum Research and Treasury).',
    imageUrl: './images/zero_trust_iam.jpg',
    imageAlt: 'Post-Quantum Cryptography & Hardware Root of Trust Migration'
  },
  {
    id: 'cs-sovereign-biometric-datacenter',
    title: 'Planetary Sovereign Biometric Data Center & 13-Nodal Zero-Trust Defense',
    subtitle: 'Architecting active-active multi-region failover and fraud-proof biometric processing for 300 Crore citizens.',
    category: 'Sovereign Infrastructure & Defense',
    businessScale: '300 Crore Citizens (3B) • 39B Vectors • 5 Sovereign Regions',
    executiveImpact: 'Engineered planetary HLD/LLD sovereign data center architecture; achieved sub-148ms p99 multimodal matching and ISO 30107-3 Level 3 anti-deepfake defense.',
    impactMetrics: [
      { label: 'Failover SLA', value: 'RPO=0/RTO<30s', desc: '5-region active-active mesh with autonomous regional survival' },
      { label: 'p99 Match Latency', value: '148ms', desc: '13-nodal decision fusion (10 fingerprints, 2 irises, 1 face)' },
      { label: 'Anti-Spoofing (PAD)', value: 'Level 3', desc: 'Pulse oximetry, pupil constriction & 3D laser depth mesh' },
      { label: 'Synthetic Fraud', value: '0 Escapes', desc: '1:N global GPU deduplication eliminating ghost identities' }
    ],
    challenge: 'National civil public infrastructure and banking systems require identity verification for 300 Crore people. Legacy biometric systems were vulnerable to generative AI deepfakes, 3D silicone mold spoofing, and catastrophic single-region fiber cuts.',
    strategy: [
      'Engineered an on-premises sovereign data center fabric across 5 autonomous regions with bare-metal Kubernetes and 640x NVIDIA H100 GPUs.',
      'Architected a 13-nodal multimodal biometric pipeline (10 fingerprints, 2 irises, 1 face) with dynamic quality-weighted score fusion.',
      'Implemented ISO/IEC 30107-3 Level 3 Presentation Attack Detection (PAD), real-time Fourier frequency deepfake neural scrubbing, and hardware-attested capture terminal signing.'
    ],
    architectureHighlights: [
      '180 PB sharded on-premises ScyllaDB NoSQL storage with sub-500us p99 read/write across direct PCIe Gen5 NVMe.',
      'Autonomous Regional Islanding guaranteeing uninterrupted 1:1 local authentication during continental fiber severance.',
      'Zero raw biometric exposure to commercial banks via HSM-signed Zero-Knowledge validation assertions.'
    ],
    businessOutcome: 'Delivered the world\'s most resilient, fraud-proof sovereign digital public infrastructure powering national banking rails (UPI/FedNow), e-KYC, and welfare disbursals.',
    financialAndAuditRoi: 'Eliminated billions in duplicate ghost beneficiary fraud and fortified national payment clearing rails against adversarial nation-state attack.',
    tags: ['Sovereign Cloud', '13-Nodal Biometrics', 'Kubernetes', 'Multi-Region Failover', 'ISO 30107-3 Level 3', 'Anti-Deepfake', 'Core Banking Systems'],
    status: 'Enterprise Standard',
    leadershipRole: 'Chief Systems & Security Architect (directing sovereign infrastructure and biometric engineering teams).',
    imageUrl: './images/zero_trust_iam.jpg',
    imageAlt: 'Planetary-Scale Sovereign Biometric Data Center & 13-Nodal Zero-Trust Defense Command Center'
  }
];

export const CYBERSECURITY_CAREER_MILESTONES = [
  {
    id: "gs-svp-cyber",
    role: "Principal Cybersecurity Architect - IAM, Digital Security, Directory | Senior Vice President",
    company: "Goldman Sachs",
    location: "Bengaluru, India",
    period: "Nov 2020 — Dec 2025",
    category: "Cybersecurity & IAM",
    summary: "Directed enterprise-wide Cybersecurity, Zero Trust IAM, and Data Security architecture across Goldman Sachs global financial perimeters and trading infrastructures.",
    achievements: [
      "Modernized Authentication and Authorization platforms adopting OAuth 2.0, OIDC, SAML, JWT, SSO and MFA, achieving 99.9% platform availability.",
      "Led 100% Zero Trust and Identity Security transformation spanning IAM, PAM, IGA, JML, and JIT access across hybrid multi-cloud environments.",
      "Reduced privileged exposure by 98.4% with zero material SOX 404 audit findings over 3 consecutive years."
    ],
    technologies: ["Zero Trust", "OAuth 2.0 / OIDC", "CyberArk PAM", "SailPoint IGA", "FIDO2", "AWS / Azure Security"]
  },
  {
    id: "gs-vp-cyber",
    role: "Lead Cybersecurity & IAM Architect - IAM, Cloud, Networks, DLP | Vice President",
    company: "Goldman Sachs",
    location: "Bengaluru, India",
    period: "Jan 2016 — Nov 2020",
    category: "Security Architecture",
    summary: "Architected scalable identity federation, privileged access infrastructure, and automated Identity Governance and Administration (IGA) platforms.",
    achievements: [
      "Designed and implemented high-throughput identity federation layers processing millions of daily authentication events.",
      "Engineered automated IGA pipelines for access certification, role mining, and automated lifecycle provisioning."
    ],
    technologies: ["Identity Federation", "PingFederate", "Active Directory", "CyberArk", "SAML 2.0"]
  }
];

export const CYBERSECURITY_BLOG_POSTS = [
  {
    id: "cs-bp-1",
    title: "Next-Gen IAM: Identity as the Enterprise Perimeter",
    slug: "next-gen-iam-identity-as-the-enterprise-perimeter",
    excerpt: "Architecting zero standing privilege and automated IGA for 5M+ hybrid enterprise identities.",
    content: `# Next-Gen IAM: Identity as the Enterprise Perimeter\n\nTransitioning from perimeter firewalls to identity-centric zero trust fabrics across Goldman Sachs scale infrastructures.`,
    date: "August 20, 2026",
    readTime: "8 min read",
    category: "IAM",
    tags: ["IAM", "Zero Trust", "Cybersecurity"],
    author: { name: "Munish Dhiman", role: "CISO / Principal Cybersecurity Architect", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" },
    featured: true,
    views: 5200,
    likes: 412
  }
];

