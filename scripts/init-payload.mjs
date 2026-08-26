import { getPayload } from 'payload';
import config from '../payload.config.ts';

async function init() {
  console.log('Initializing Payload...');
  const payload = await getPayload({ config });

  console.log('Creating Admin User: admin@techcentera.com ...');
  try {
    const user = await payload.create({
      collection: 'users',
      data: {
        email: 'admin@techcentera.com',
        password: 'TechCentera2026!',
        name: 'TechCentera Admin',
      },
    });
    console.log('✅ Admin user created:', user.email);
  } catch (e) {
    console.log('User creation message:', e?.message || e);
  }

  // Seed Homepage
  console.log('Checking Pages...');
  const pages = await payload.find({ collection: 'pages' });
  if (pages.totalDocs === 0) {
    await payload.create({
      collection: 'pages',
      data: {
        title: 'Homepage',
        slug: 'home',
        hero: {
          badge: 'ENTERPRISE GOVERNED AI & CUSTOM SOFTWARE',
          headline: 'Governed AI Automation & Custom Enterprise Software.',
          description: 'We engineer bespoke conversational AI receptionists, autonomous workflow pipelines, and custom ERP systems for mid-market operations. Zero vendor lock-in. Full IP ownership.',
          primaryButton: { label: 'Book a Consultation', url: '/contact' },
          secondaryButton: { label: 'Explore Live Systems', url: '/services' },
          trustPoints: [{ text: 'Zero Vendor Lock-In' }, { text: '100% Code Ownership' }, { text: 'Sub-500ms Execution' }],
        },
        faqs: [
          { question: 'How is TechCentera different from off-the-shelf AI wrappers and SaaS tools?', answer: 'TechCentera builds sovereign, custom software that you own 100% with no recurring licensing fees and deterministic data security.' },
        ],
      },
    });
    console.log('✅ Homepage seeded.');
  }

  // Seed Site Settings
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
            { title: 'All Services Hub', url: '/services', description: 'Explore the full AI platform', badge: 'Hub' },
            { title: 'AI Receptionist', url: '/services/ai-receptionist', description: '24/7 autonomous voice intake' },
            { title: 'AI Customer Support', url: '/services/ai-customer-support', description: 'Tier-1 resolution' },
            { title: 'AI Workflow Automation', url: '/services/ai-workflow-automation', description: 'ERP/CRM bi-directional sync' },
            { title: 'Custom CRM & ERP', url: '/services/custom-crm-erp', description: 'Bespoke systems' },
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
    },
  });
  console.log('✅ Site Settings updated with full Menu and Navigation!');

  process.exit(0);
}

init().catch(console.error);
