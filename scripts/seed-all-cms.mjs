import { getPayload } from 'payload';
import config from '../payload.config.ts';

async function seedAll() {
  console.log('Connecting to Payload CMS...');
  const payload = await getPayload({ config });

  // 1. Ensure Admin User exists
  const existingUsers = await payload.find({ collection: 'users' });
  if (existingUsers.totalDocs === 0) {
    console.log('Creating Admin User: admin@techcentera.com ...');
    await payload.create({
      collection: 'users',
      data: {
        email: 'admin@techcentera.com',
        password: 'TechCentera2026!',
        name: 'TechCentera Admin',
      },
    });
    console.log('✅ Admin user created.');
  }

  // 2. Seed ALL Pages
  console.log('Seeding all Pages (Home, About, Contact, Privacy, Terms)...');
  const pagesData = [
    {
      title: 'Homepage',
      slug: 'home',
      metaDescription: 'Governed AI Automation & Custom Enterprise Software engineering for mid-market operations.',
      hero: {
        badge: 'ENTERPRISE GOVERNED AI & CUSTOM SOFTWARE',
        headline: 'Governed AI Automation & Custom Enterprise Software.',
        description: 'We engineer bespoke conversational AI receptionists, autonomous workflow pipelines, and custom ERP systems for mid-market operations. Zero vendor lock-in. Full IP ownership.',
        primaryButton: { label: 'Book a Consultation', url: '/contact' },
        secondaryButton: { label: 'Explore Live Systems', url: '/services' },
        trustPoints: [{ text: 'Zero Vendor Lock-In' }, { text: '100% Code Ownership' }, { text: 'Sub-500ms Execution' }],
      },
      stats: [
        { value: '< 500ms', label: 'Voice Latency', description: 'Deterministic sub-second voice synthesis.' },
        { value: '99.4%', label: 'Extraction Accuracy', context: 'Zero hallucinated booking or data slots.' },
        { value: '65%+', label: 'Tier-1 Ticket Deflection', description: 'Immediate resolution without human touch.' },
        { value: '$180k+', label: 'Average Annual Savings', description: 'Eliminating recurring SaaS seat taxes.' },
      ],
      differentiators: [
        {
          title: 'Deterministic Guardrails',
          description: 'We reject unconstrained prompt wrappers. Our systems validate inputs against strict business rules before execution.',
          icon: 'shield',
        },
        {
          title: '100% Sovereign IP Ownership',
          description: 'You own all schemas, models, and application repositories. Zero proprietary license lock-in or recurring seat taxes.',
          icon: 'database',
        },
        {
          title: 'Sub-Second Edge Latency',
          description: 'Engineered on high-throughput microservices for voice synthesis and multi-system synchronization without delay.',
          icon: 'cpu',
        },
      ],
      processSteps: [
        { stepNumber: '01', title: 'Architecture Audit', description: 'Map data flows, bottlenecks, and security parameters across operations.' },
        { stepNumber: '02', title: 'Bespoke Engineering', description: 'Build deterministic pipelines, telephony bridges, and relational schemas.' },
        { stepNumber: '03', title: 'Rigorous Verification', description: 'Test thousands of edge cases against real-world operational scenarios.' },
        { stepNumber: '04', title: 'Production Handover', description: 'Deploy into your cloud infrastructure with full documentation and monitoring.' },
      ],
      faqs: [
        { question: 'How is TechCentera different from off-the-shelf AI tools?', answer: 'Off-the-shelf tools force your workflows into rigid templates and charge per-seat fees. TechCentera builds sovereign, custom software that you own 100% with no recurring licensing fees.' },
        { question: 'Do we own the intellectual property and code?', answer: 'Yes. 100% of all repository code, database schemas, and documentation are transferred directly to your organization upon project completion.' },
        { question: 'What security standards do you adhere to?', answer: 'All architectures adhere to strict SOC-2 data sanitization parameters, encrypted transit (TLS 1.3), and zero-retention API policies.' },
      ],
      ctaBand: {
        badge: 'Enterprise Consultation',
        title: 'Ready to Eliminate Operational Debt with Governed AI?',
        description: 'Schedule a confidential architecture review with our principal systems engineers.',
        buttonLabel: 'Schedule Architecture Call',
        buttonUrl: '/contact',
      },
    },
    {
      title: 'About Us',
      slug: 'about',
      metaDescription: 'TechCentera builds bespoke AI automation and custom software for mid-market leaders who value code ownership, data privacy, and deterministic reliability.',
      hero: {
        badge: 'About TechCentera',
        headline: 'Engineering Autonomous Systems You Actually Own.',
        description: 'We help operations and technology leaders eliminate manual work through bespoke AI automation pipelines and custom enterprise software without recurring licensing extortion.',
        primaryButton: { label: 'Book a Consultation', url: '/contact' },
        secondaryButton: { label: 'Explore Live Systems', url: '/services' },
      },
      ctaBand: {
        badge: 'Direct Engineering Consultation',
        title: 'Ready to Own Your Enterprise Software and AI Infrastructure?',
        description: 'Speak directly with our systems engineers to evaluate your workflows, schemas, and automation targets.',
        buttonLabel: 'Schedule Technical Review',
        buttonUrl: '/contact',
      },
    },
    {
      title: 'Contact Us',
      slug: 'contact',
      metaDescription: 'Schedule a technical consultation with TechCentera. Direct engineering response within 24 hours.',
      hero: {
        badge: 'Technical Consultations',
        headline: 'Talk Directly with Our Engineering Team.',
        description: 'Review your legacy architecture, automation targets, and data models with our systems architects.',
      },
      faqs: [
        { question: 'How quickly will your team respond?', answer: 'Our principal architects review and respond to every verified inquiry within 24 business hours.' },
        { question: 'Do you execute non-disclosure agreements before review?', answer: 'Yes. We provide standard mutual NDAs prior to analyzing any proprietary database schemas or workflows.' },
        { question: 'Can we schedule a live technical discovery call directly?', answer: 'Yes. After receiving your initial project overview, our team shares a direct engineering calendar booking link.' },
      ],
    },
    {
      title: 'Privacy Policy',
      slug: 'privacy',
      metaDescription: 'TechCentera data privacy policy and SOC-2 data governance commitments.',
      hero: {
        badge: 'Legal & Governance',
        headline: 'Enterprise Data Privacy & Security Commitments.',
        description: 'TechCentera enforces zero data retention, strict SOC-2 compliance, and 100% private tenant boundaries for all client systems.',
      },
    },
    {
      title: 'Terms of Service',
      slug: 'terms',
      metaDescription: 'Terms of service and software intellectual property ownership terms for TechCentera clients.',
      hero: {
        badge: 'Legal Agreement',
        headline: 'Terms of Engineering Service & IP Ownership.',
        description: 'Review the contractual terms governing bespoke software development, IP assignment, and service levels.',
      },
    },
  ];

  for (const pageData of pagesData) {
    const existing = await payload.find({
      collection: 'pages',
      where: { slug: { equals: pageData.slug } },
    });
    if (existing.totalDocs === 0) {
      await payload.create({
        collection: 'pages',
        data: pageData,
      });
      console.log(`✅ Seeded page: ${pageData.title} (${pageData.slug})`);
    } else {
      console.log(`ℹ️ Page already exists: ${pageData.title}`);
    }
  }

  // 3. Seed ALL 4 Services
  console.log('Seeding Services...');
  const services = [
    {
      title: 'AI Receptionist',
      slug: 'ai-receptionist',
      order: 1,
      tagline: '24/7 Autonomous Voice & Text Front-Office Infrastructure',
      shortDescription: 'Replace missed calls, slow intake, and manual calendar booking with a low-latency, deterministic AI voice receptionist built into your telephony and CRM.',
      heroImage: '/images/ai-receptionist.jpg',
      includedFeatures: [
        { item: 'Sub-500ms voice synthesis and latency' },
        { item: 'Real-time two-way calendar conflict booking' },
        { item: 'Deterministic guardrails for compliance' },
        { item: 'Direct CRM qualification and tagging' },
        { item: 'Seamless live agent transfer fallback' },
      ],
      outcomes: [
        { metric: '< 500ms', label: 'Response Latency', context: 'Ultra-low latency speech recognition and voice synthesis.' },
        { metric: '99.4%', label: 'Appointment Accuracy', context: 'Zero double-bookings or lost caller slots.' },
        { metric: '100%', label: 'After-Hours Coverage', context: 'Never lose another qualified inbound lead.' },
      ],
      stages: [
        { step: '01', title: 'Telephony & Trunk Audit', description: 'Review SIP trunks, call flows, and booking calendar schemas.' },
        { step: '02', title: 'Voice Pipeline Build', description: 'Engineer ultra-low-latency deterministic voice flows and CRM hooks.' },
        { step: '03', title: 'Stress & Evaluation Testing', description: 'Simulate concurrent calls, edge questions, and accent variations.' },
        { step: '04', title: 'Live Cutover & Monitoring', description: 'Deploy with real-time call telemetry and dashboard observability.' },
      ],
      faqs: [
        { question: 'Can the AI receptionist handle accented callers?', answer: 'Yes. Our neural speech recognition engine supports diverse regional accents with over 99% accuracy.' },
        { question: 'What happens if a caller has an emergency or wants a human?', answer: 'The receptionist immediately recognizes urgency and warm-transfers the call to designated on-call human staff.' },
      ],
    },
    {
      title: 'AI Customer Support',
      slug: 'ai-customer-support',
      order: 2,
      tagline: 'Governed Tier-1 Support Resolution with Zero Hallucination Risk',
      shortDescription: 'Resolve 65%+ of repetitive tier-1 customer inquiries instantly with grounded retrieval-augmented generation and automatic human handoff.',
      heroImage: '/images/ai-support.jpg',
      includedFeatures: [
        { item: 'Grounded RAG retrieval against proprietary documentation' },
        { item: 'Automated human agent escalation' },
        { item: 'Omnichannel: Web chat, WhatsApp, SMS, Email' },
        { item: 'SOC-2 compliant data sanitization' },
        { item: 'Real-time customer sentiment tracking' },
      ],
      outcomes: [
        { metric: '65%+', label: 'Tier-1 Deflection', context: 'Immediate resolution of repetitive support queries.' },
        { metric: '12s', label: 'Average First Response', context: '24/7 instant resolution across all communication channels.' },
        { metric: '4.8/5', label: 'CSAT Rating', context: 'Consistently higher satisfaction compared to ticket queues.' },
      ],
      stages: [
        { step: '01', title: 'Knowledge Base Curation', description: 'Ingest and sanitize proprietary documentation, manuals, and ticket history.' },
        { step: '02', title: 'Guardrail & Schema Engine', description: 'Implement confidence thresholds and human handoff escalation rules.' },
        { step: '03', title: 'Channel Integration', description: 'Connect directly to Zendesk, Intercom, Salesforce, email, and live chat.' },
        { step: '04', title: 'Production Rollout', description: 'Phased rollout with continuous evaluation benchmarks.' },
      ],
      faqs: [
        { question: 'How do you prevent the AI from answering with false information?', answer: 'We constrain the model strictly to verified documentation using semantic search boundaries and schema checks.' },
      ],
    },
    {
      title: 'AI Workflow Automation',
      slug: 'ai-workflow-automation',
      order: 3,
      tagline: 'Autonomous Cross-System Pipelines for Enterprise Operations',
      shortDescription: 'Eliminate manual data re-entry and fragmented SaaS glue code with custom event-driven automation pipelines engineered for 99.99% uptime.',
      heroImage: '/images/ai-workflow.jpg',
      includedFeatures: [
        { item: 'Bi-directional ERP & CRM live synchronization' },
        { item: 'Intelligent invoice & unstructured document parsing' },
        { item: 'Event-driven webhooks with dead-letter queue resilience' },
        { item: 'Audit logging and SOC-2 data lineage' },
        { item: 'Self-healing retry logic on third-party API downtime' },
      ],
      outcomes: [
        { metric: '70%', label: 'Manual Work Reduction', context: 'Eliminates repetitive data re-entry across systems.' },
        { metric: '99.99%', label: 'Pipeline Uptime', context: 'Event queues guarantee zero lost events or dropped webhooks.' },
        { metric: '10x', label: 'Processing Speed', context: 'Real-time sync replaces batch hourly reconciliation.' },
      ],
      stages: [
        { step: '01', title: 'Data Flow Mapping', description: 'Analyze schemas, triggers, endpoints, and error frequencies.' },
        { step: '02', title: 'Pipeline Architecture', description: 'Build dedicated queuing workers with idempotency and retry logic.' },
        { step: '03', title: 'Integration Testing', description: 'Simulate high concurrency loads and simulate API outages.' },
        { step: '04', title: 'Handover & Monitoring', description: 'Provide full Grafana/Datadog monitoring and complete runbooks.' },
      ],
      faqs: [
        { question: 'Can this connect to custom on-premise SQL databases?', answer: 'Yes. We build secure VPN tunnels or private agents that safely query and update local SQL databases.' },
      ],
    },
    {
      title: 'Custom CRM & ERP',
      slug: 'custom-crm-erp',
      order: 4,
      tagline: 'Bespoke Operational Software Tailored to Your Exact Business Logic',
      shortDescription: 'Replace bloated, multi-seat SaaS tools with tailored internal software that matches your proprietary operational workflows exactly.',
      heroImage: '/images/custom-crm-erp.jpg',
      includedFeatures: [
        { item: '100% tailored relational schema and business rules' },
        { item: 'Role-based access control (RBAC) & SSO' },
        { item: 'Real-time operational dashboards & telemetry' },
        { item: 'High-throughput SQL database indexing' },
        { item: 'Zero per-seat licensing fees forever' },
      ],
      outcomes: [
        { metric: '$180k+', label: 'Annual SaaS Savings', context: 'Eliminate monthly per-seat licensing fees forever.' },
        { metric: '100%', label: 'Workflow Alignment', context: 'Built around your exact terminology and logic.' },
        { metric: '100%', label: 'IP Ownership', context: 'Your organization owns all source code and databases.' },
      ],
      stages: [
        { step: '01', title: 'Domain Modeling', description: 'Design clean normalized relational schemas and role permissions.' },
        { step: '02', title: 'Full-Stack Build', description: 'Develop fast Next.js frontends, resilient Node/Go APIs, and PostgreSQL.' },
        { step: '03', title: 'Data Migration', description: 'Safely transfer existing customer records and transaction logs.' },
        { step: '04', title: 'Cloud Handover', description: 'Deploy into your AWS/GCP account with complete documentation.' },
      ],
      faqs: [
        { question: 'Do we own the software code?', answer: 'Yes. 100% of all repository code, schemas, and design files are transferred directly to your organization.' },
      ],
    },
  ];

  for (const s of services) {
    const existing = await payload.find({
      collection: 'services',
      where: { slug: { equals: s.slug } },
    });
    if (existing.totalDocs === 0) {
      await payload.create({
        collection: 'services',
        data: s,
      });
      console.log(`✅ Seeded service: ${s.title}`);
    } else {
      console.log(`ℹ️ Service exists: ${s.title}`);
    }
  }

  // 4. Seed Blog Posts
  console.log('Seeding Blog Posts...');
  const blogPosts = [
    {
      title: 'Why Governed AI Automation Outperforms Black-Box LLM Prompts in Enterprise Operations',
      slug: 'governed-ai-vs-black-box',
      category: 'Enterprise AI',
      readTime: '6 min read',
      author: 'TechCentera Engineering Team',
      date: new Date().toISOString(),
      coverImage: '/images/ai-workflow.jpg',
      excerpt: 'Unconstrained prompt wrappers introduce compliance vulnerabilities and unpredictable operational costs. Learn how deterministic schema guardrails deliver enterprise-grade accuracy.',
    },
    {
      title: 'Integrating Autonomous AI Agents with Legacy ERP and Telephony Infrastructure',
      slug: 'legacy-erp-integration-architecture',
      category: 'System Integration',
      readTime: '7 min read',
      author: 'TechCentera Engineering Team',
      date: new Date().toISOString(),
      coverImage: '/images/custom-crm-erp.jpg',
      excerpt: 'A technical deep-dive into connecting sub-500ms voice agents and real-time event pipelines to on-premise relational databases and legacy accounting software.',
    },
    {
      title: 'Build vs. Rent: Why Mid-Market Leaders Are Replacing Multi-Seat SaaS with Sovereign Software',
      slug: 'build-vs-rent-ai-systems',
      category: 'Technology Strategy',
      readTime: '5 min read',
      author: 'TechCentera Engineering Team',
      date: new Date().toISOString(),
      coverImage: '/images/hero-preview.jpg',
      excerpt: 'Recurring per-seat software taxes create compounding financial drag. Discover how custom software and full IP ownership yield positive ROI in less than 6 months.',
    },
  ];

  for (const b of blogPosts) {
    const existing = await payload.find({
      collection: 'blog-posts',
      where: { slug: { equals: b.slug } },
    });
    if (existing.totalDocs === 0) {
      await payload.create({
        collection: 'blog-posts',
        data: b,
      });
      console.log(`✅ Seeded blog post: ${b.title}`);
    } else {
      console.log(`ℹ️ Blog post exists: ${b.title}`);
    }
  }

  // 5. Seed Testimonials
  console.log('Seeding Testimonials...');
  const testimonials = [
    {
      quote: 'TechCentera replaced our fragile patchwork of third-party automation tools with a custom, governed pipeline. We cut repetitive intake time by 70% while retaining total control over our customer data.',
      author: 'Robert Keller',
      role: 'VP of Operations',
      company: 'Logistics & Supply Network',
      initials: 'RK',
      rating: 5,
      verifiedTag: 'Verified Enterprise Deployment',
    },
    {
      quote: 'Their deterministic guardrails were the only AI architecture that satisfied our strict compliance officers. Zero hallucination risk, sub-second execution, and 100% intellectual property ownership.',
      author: 'Elena Rostova',
      role: 'Chief Technology Officer',
      company: 'FinServe Global',
      initials: 'ER',
      rating: 5,
      verifiedTag: 'Financial Services Deployment',
    },
    {
      quote: 'The custom AI voice receptionist handles over 1,400 inbound intake calls daily without a single drop or routing misclassification. It has transformed our front-office capacity completely.',
      author: 'Marcus Vance',
      role: 'Head of Digital Transformation',
      company: 'Apex HealthTech',
      initials: 'MV',
      rating: 5,
      verifiedTag: 'HealthTech Voice Intake',
    },
    {
      quote: 'We saved over $180,000 in annual recurring SaaS seat licenses by migrating to TechCentera’s custom ERP workflows. The ROI was fully realized within the first 4 months of deployment.',
      author: 'David Sterling',
      role: 'Director of Systems Architecture',
      company: 'Omnia Commerce Group',
      initials: 'DS',
      rating: 5,
      verifiedTag: 'Custom ERP & Data Sync',
    },
  ];

  for (const t of testimonials) {
    const existing = await payload.find({
      collection: 'testimonials',
      where: { author: { equals: t.author } },
    });
    if (existing.totalDocs === 0) {
      await payload.create({
        collection: 'testimonials',
        data: t,
      });
      console.log(`✅ Seeded testimonial: ${t.author}`);
    } else {
      console.log(`ℹ️ Testimonial exists: ${t.author}`);
    }
  }

  // 6. Update Site Settings with Header Menu & Footer
  console.log('Updating Site Settings...');
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      branding: {
        brandName: 'TechCentera',
        logoIconText: 'TC',
        tagline: 'Governed AI Automation & Custom Enterprise Software',
      },
      navItems: [
        { label: 'Home', url: '/' },
        {
          label: 'Services',
          url: '/services',
          hasDropdown: true,
          dropdownItems: [
            { title: 'All Services Hub', url: '/services', description: 'Explore the full AI & custom engineering platform', badge: 'Hub' },
            { title: 'AI Receptionist', url: '/services/ai-receptionist', description: '24/7 autonomous intake, scheduling & routing' },
            { title: 'AI Customer Support', url: '/services/ai-customer-support', description: 'Tier-1 resolution with governed human escalation' },
            { title: 'AI Workflow Automation', url: '/services/ai-workflow-automation', description: 'ERP/CRM bi-directional sync & event pipelines' },
            { title: 'Custom CRM & ERP', url: '/services/custom-crm-erp', description: 'Bespoke systems built to your exact data model' },
          ],
        },
        { label: 'About', url: '/about' },
        { label: 'Blog', url: '/blog' },
        { label: 'Contact', url: '/contact' },
      ],
      headerCta: {
        label: 'Book a Consultation',
        url: '/contact',
      },
      contactInfo: {
        phone: '+1 (786) 827-3650',
        email: 'contact@techcentera.com',
        address: '625 Orange Street, Suite 231B, Wilmington DE 19801',
      },
      footer: {
        description: 'Governed AI automation and custom software engineering for mid-market and enterprise operations. Zero vendor lock-in. Full IP ownership.',
        copyright: '© 2026 TechCentera Inc. All rights reserved.',
      },
    },
  });
  console.log('✅ Site Settings updated with full Navigation & Branding.');

  console.log('\n🎉 ALL CMS COLLECTIONS, PAGES, SERVICES, POSTS, REVIEWS & SETTINGS FULLY POPULATED!');
  process.exit(0);
}

seedAll().catch(err => {
  console.error('Seeding error:', err);
  process.exit(1);
});
