async function seedAllREST() {
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

  console.log('✅ Authenticated as Admin!');

  // 1. Seed Site Settings
  console.log('Updating Site Settings...');
  await fetch('http://localhost:3000/api/globals/site-settings', {
    method: 'POST',
    headers: authHeaders,
    body: JSON.stringify({
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
    }),
  });
  console.log('✅ Site Settings updated.');

  // 2. Seed Pages
  console.log('Seeding Pages (Home, About, Contact, Privacy, Terms)...');
  const pages = [
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

  for (const p of pages) {
    const res = await fetch('http://localhost:3000/api/pages', {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify(p),
    });
    const data = await res.json();
    console.log(`✅ Seeded page: ${p.title} (${p.slug})`);
  }

  // 3. Seed Blog Posts
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
    await fetch('http://localhost:3000/api/blog-posts', {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify(b),
    });
    console.log(`✅ Seeded blog post: ${b.title}`);
  }

  console.log('\n🎉 ALL PAGES, POSTS, SERVICES & SETTINGS SEEDED IN CMS!');
}

seedAllREST().catch(console.error);
