import { getPayload } from 'payload';
import config from '../payload.config.ts';

async function seed() {
  console.log('Connecting to Payload and PostgreSQL database...');
  const payload = await getPayload({ config });

  // 1. Check/Create Admin User
  const existingUsers = await payload.find({
    collection: 'users',
    where: {
      email: {
        equals: 'admin@techcentera.com',
      },
    },
  });

  if (existingUsers.totalDocs === 0) {
    console.log('Creating initial Admin user: admin@techcentera.com');
    await payload.create({
      collection: 'users',
      data: {
        email: 'admin@techcentera.com',
        password: 'TechCentera2026!',
        name: 'TechCentera Admin',
      },
    });
    console.log('✅ Admin user created: admin@techcentera.com / TechCentera2026!');
  } else {
    console.log('Admin user already exists.');
  }

  // 2. Seed Services
  const existingServices = await payload.find({ collection: 'services' });
  if (existingServices.totalDocs === 0) {
    console.log('Seeding 4 core enterprise services...');

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
        outcomes: [
          { metric: '99.4%', label: 'Intake Accuracy', context: 'Zero hallucinated booking slots' },
          { metric: '< 500ms', label: 'Response Latency', context: 'Indistinguishable natural conversation' },
          { metric: '24/7', label: 'Operational Uptime', context: 'Never lose after-hours enterprise leads' },
        ],
        processSteps: [
          { step: '01', title: 'Telephony & SIP Audit', description: 'Map existing PBX trunk lines, call flows, and triage logic.' },
          { step: '02', title: 'Guardrail & Prompt Engineering', description: 'Build deterministic schema validation on top of fine-tuned voice models.' },
          { step: '03', title: 'CRM & Calendar Integration', description: 'Connect real-time bi-directional APIs for instantaneous booking.' },
          { step: '04', title: 'Live Deployment & Handover', description: 'Transfer 100% intellectual property, code repository, and cloud infrastructure.' },
        ],
        faqs: [
          { question: 'How does the AI receptionist handle complex callers?', answer: 'Deterministic confidence scoring monitors caller intent. If an edge case falls outside confidence bounds, the call instantly warm-transfers to a human agent with live transcript context.' },
          { question: 'Can it integrate with our existing VoIP phone system?', answer: 'Yes. We support SIP trunking, Twilio, Vonage, RingCentral, Asterisk, and standard WebRTC endpoints.' },
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
        outcomes: [
          { metric: '68%', label: 'Instant Deflection', context: 'Tier-1 tickets resolved without human intervention' },
          { metric: '1.2s', label: 'Mean Resolution Time', context: 'Immediate multi-turn support answers' },
          { metric: '4.9/5', label: 'CSAT Rating', context: 'Accurate, empathetic customer satisfaction' },
        ],
        processSteps: [
          { step: '01', title: 'Knowledge Base Ingestion', description: 'Vectorize manuals, policies, and ticket history with semantic chunking.' },
          { step: '02', title: 'Evaluation Benchmark Suite', description: 'Run thousands of deterministic regression tests to ensure zero hallucination.' },
          { step: '03', title: 'Helpdesk Integration', description: 'Embed with Zendesk, HubSpot, Salesforce, or custom internal dashboards.' },
          { step: '04', title: 'Continuous Telemetry', description: 'Deploy monitoring dashboards for latency, sentiment, and accuracy tracking.' },
        ],
        faqs: [
          { question: 'What prevents the AI from giving inaccurate answers?', answer: 'We enforce strict Retrieval-Augmented Generation (RAG) constraints with certainty thresholds. If an answer is not explicitly confirmed in your validated knowledge base, the system executes a graceful fallback.' },
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
        outcomes: [
          { metric: '70%', label: 'Time Reduction', context: 'Intake and document processing cycle time' },
          { metric: '99.99%', label: 'Pipeline Reliability', context: 'Dead-letter queues ensure zero dropped events' },
          { metric: '100%', label: 'Audit Trail', context: 'Complete immutable event logging for compliance' },
        ],
        processSteps: [
          { step: '01', title: 'Process Mapping', description: 'Identify bottleneck workflows, data schemas, and API rate limits.' },
          { step: '02', title: 'Event-Driven Architecture', description: 'Engineer robust message queues (Kafka / RabbitMQ / AWS SQS) with retry logic.' },
          { step: '03', title: 'Schema Validation', description: 'Implement strict Zod/TypeScript runtime validation across all ingestion points.' },
          { step: '04', title: 'Production Handover', description: 'Deliver fully containerized Docker/Kubernetes deployment scripts.' },
        ],
        faqs: [
          { question: 'Why not just use Zapier or Make?', answer: 'Off-the-shelf tools expose sensitive enterprise data to third-party servers, charge per-task licensing fees that escalate rapidly, and fail silently on API changes. Custom pipelines provide total ownership, deterministic performance, and zero per-run fees.' },
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
        outcomes: [
          { metric: '$180k+', label: 'Annual SaaS Savings', context: 'Eliminate recurring per-seat license taxes' },
          { metric: '100%', label: 'IP Ownership', context: 'You own all source code and database schemas' },
          { metric: '3.4x', label: 'Team Velocity', context: 'Zero bloated menus; streamlined for your workflow' },
        ],
        processSteps: [
          { step: '01', title: 'Domain Modeling', description: 'Architect optimal Postgres schemas matching your exact business entities.' },
          { step: '02', title: 'Full-Stack Development', description: 'Develop high-performance Next.js and Node.js microservices.' },
          { step: '03', title: 'Legacy Data Migration', description: 'Safely extract, transform, and load historical records with zero data loss.' },
          { step: '04', title: 'Cloud Provisioning', description: 'Deploy to your dedicated AWS, Azure, or GCP infrastructure.' },
        ],
        faqs: [
          { question: 'Do we own the source code?', answer: 'Yes. Upon completion, 100% of the repository, database schemas, and infrastructure code are transferred directly to your organization with full intellectual property rights.' },
        ],
      },
    ];

    for (const s of services) {
      await payload.create({
        collection: 'services',
        data: s,
      });
      console.log(`✅ Seeded service: ${s.title}`);
    }
  }

  // 3. Seed Testimonials
  const existingTestimonials = await payload.find({ collection: 'testimonials' });
  if (existingTestimonials.totalDocs === 0) {
    console.log('Seeding client testimonials...');
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
      await payload.create({
        collection: 'testimonials',
        data: t,
      });
      console.log(`✅ Seeded testimonial: ${t.author}`);
    }
  }

  console.log('\n🎉 Payload CMS database successfully seeded and ready!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Error seeding Payload database:', err);
  process.exit(1);
});
