async function seedLiveData() {
  console.log('Logging in to Payload REST API...');
  const loginRes = await fetch('http://localhost:3000/api/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'admin@techcentera.com',
      password: 'TechCentera2026!',
    }),
  });

  const loginData = await loginRes.json();
  if (!loginData.token) {
    console.error('Login failed:', loginData);
    return;
  }

  const token = loginData.token;
  const authHeaders = {
    'Content-Type': 'application/json',
    Authorization: `JWT ${token}`,
  };

  console.log('✅ Authenticated successfully as Admin!');

  // 1. Seed Site Settings
  console.log('Updating Site Settings...');
  await fetch('http://localhost:3000/api/globals/site-settings', {
    method: 'POST',
    headers: authHeaders,
    body: JSON.stringify({
      brandName: 'TechCentera',
      tagline: 'Governed AI Automation & Custom Enterprise Software',
      headerCta: {
        label: 'Book a Consultation',
        url: '/contact',
      },
      contactInfo: {
        phone: '+1 (786) 827-3650',
        email: 'contact@techcentera.com',
        address: '625 Orange Street, Suite 231B, Wilmington DE 19801',
      },
      footerDescription:
        'Governed AI automation and custom software engineering for mid-market and enterprise operations. Zero vendor lock-in. Full IP ownership.',
      copyrightText: '© 2026 TechCentera Inc. All rights reserved.',
    }),
  });
  console.log('✅ Site Settings updated.');

  // 2. Seed Pages: Homepage
  console.log('Seeding Homepage document in Pages collection...');
  await fetch('http://localhost:3000/api/pages', {
    method: 'POST',
    headers: authHeaders,
    body: JSON.stringify({
      title: 'Homepage',
      slug: 'home',
      metaDescription: 'Governed AI Automation & Custom Enterprise Software engineering for mid-market operations.',
      hero: {
        badge: 'ENTERPRISE GOVERNED AI & CUSTOM SOFTWARE',
        headline: 'Governed AI Automation & Custom Enterprise Software.',
        description:
          'We engineer bespoke conversational AI receptionists, autonomous workflow pipelines, and custom ERP systems for mid-market operations. Zero vendor lock-in. Full IP ownership.',
        primaryButton: {
          label: 'Book a Consultation',
          url: '/contact',
        },
        secondaryButton: {
          label: 'Explore Live Systems',
          url: '/services',
        },
        trustPoints: [
          { text: 'Zero Vendor Lock-In' },
          { text: '100% Code Ownership' },
          { text: 'Sub-500ms Execution' },
        ],
      },
      stats: [
        { value: '< 500ms', label: 'Voice Response Latency', description: 'Deterministic sub-second voice synthesis.' },
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
    }),
  });
  console.log('✅ Homepage seeded.');

  // 3. Seed Services
  const services = [
    {
      title: 'AI Receptionist',
      slug: 'ai-receptionist',
      order: 1,
      tagline: '24/7 Autonomous Voice & Text Front-Office Infrastructure',
      shortDescription:
        'Replace missed calls, slow intake, and manual calendar booking with a low-latency, deterministic AI voice receptionist built into your telephony and CRM.',
      heroImage: '/images/ai-receptionist.jpg',
      includedFeatures: [
        { item: 'Sub-500ms voice synthesis and latency' },
        { item: 'Real-time two-way calendar conflict booking' },
        { item: 'Deterministic guardrails for compliance' },
        { item: 'Direct CRM qualification and tagging' },
        { item: 'Seamless live agent transfer fallback' },
      ],
    },
    {
      title: 'AI Customer Support',
      slug: 'ai-customer-support',
      order: 2,
      tagline: 'Governed Tier-1 Support Resolution with Zero Hallucination Risk',
      shortDescription:
        'Resolve 65%+ of repetitive tier-1 customer inquiries instantly with grounded retrieval-augmented generation and automatic human handoff.',
      heroImage: '/images/ai-support.jpg',
      includedFeatures: [
        { item: 'Grounded RAG retrieval against proprietary documentation' },
        { item: 'Automated human agent escalation' },
        { item: 'Omnichannel: Web chat, WhatsApp, SMS, Email' },
        { item: 'SOC-2 compliant data sanitization' },
        { item: 'Real-time customer sentiment tracking' },
      ],
    },
    {
      title: 'AI Workflow Automation',
      slug: 'ai-workflow-automation',
      order: 3,
      tagline: 'Autonomous Cross-System Pipelines for Enterprise Operations',
      shortDescription:
        'Eliminate manual data re-entry and fragmented SaaS glue code with custom event-driven automation pipelines engineered for 99.99% uptime.',
      heroImage: '/images/ai-workflow.jpg',
      includedFeatures: [
        { item: 'Bi-directional ERP & CRM live synchronization' },
        { item: 'Intelligent invoice & unstructured document parsing' },
        { item: 'Event-driven webhooks with dead-letter queue resilience' },
        { item: 'Audit logging and SOC-2 data lineage' },
        { item: 'Self-healing retry logic on third-party API downtime' },
      ],
    },
    {
      title: 'Custom CRM & ERP',
      slug: 'custom-crm-erp',
      order: 4,
      tagline: 'Bespoke Operational Software Tailored to Your Exact Business Logic',
      shortDescription:
        'Replace bloated, multi-seat SaaS tools with tailored internal software that matches your proprietary operational workflows exactly.',
      heroImage: '/images/custom-crm-erp.jpg',
      includedFeatures: [
        { item: '100% tailored relational schema and business rules' },
        { item: 'Role-based access control (RBAC) & SSO' },
        { item: 'Real-time operational dashboards & telemetry' },
        { item: 'High-throughput SQL database indexing' },
        { item: 'Zero per-seat licensing fees forever' },
      ],
    },
  ];

  for (const s of services) {
    await fetch('http://localhost:3000/api/services', {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify(s),
    });
    console.log(`✅ Seeded service: ${s.title}`);
  }

  // 4. Seed Testimonials
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
    await fetch('http://localhost:3000/api/testimonials', {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify(t),
    });
    console.log(`✅ Seeded testimonial: ${t.author}`);
  }

  console.log('\n🎉 ALL DATA HAS BEEN POPULATED IN PAYLOAD CMS & POSTGRESQL DATABASE!');
}

seedLiveData().catch(console.error);
