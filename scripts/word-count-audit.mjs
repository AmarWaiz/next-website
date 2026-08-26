import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

function countWords(str) {
  if (!str) return 0;
  return str.trim().split(/\s+/).filter(Boolean).length;
}

console.log('=== WORD COUNT AUDIT AGAINST SECTION 5 BUDGETS ===\n');

// 1. Home Page Audit
const homeText = `
Governed AI Automation & Custom Enterprise Software.
We engineer bespoke AI voice receptionists, autonomous workflow pipelines, and custom ERP systems for mid-market leaders. Zero vendor lock-in. Full IP ownership.
Book a Consultation
Explore Services
Platform Reliability: Continuous enterprise pipeline execution and uptime.
Daily Automations: Autonomous transactions and customer interactions resolved.
Median Latency: Zero-lag event processing across voice and API pipelines.
Purpose-Built Engineering Across Your Core Operations
Replace disjointed SaaS subscriptions with integrated agentic infrastructure tailored to your exact operational workflows.
Engineered for Autonomy, Precision, and Permanent Ownership
We reject disposable prompt wrappers. We build resilient software infrastructure that scales your operational capacity without recurring software debt.
Governed AI Guardrails: Deterministic verification rules guarantee error-free transactions and zero unconstrained model outputs.
100% Code & IP Ownership: No recurring per-seat software licensing fees or closed-ecosystem lock-in. You own every line of code.
Legacy System Interoperability: Connect modern artificial intelligence agents to existing SQL, ERP, and CRM databases without rip-and-replace.
A Disciplined Four-Stage Engineering Lifecycle
From initial schema audit to sovereign cloud deployment, our process ensures zero downtime and rapid return on investment.
System & Workflow Audit: Map operational bottlenecks, existing data models, and high-impact automation targets.
Bespoke Architecture Engineering: Build validated schemas, deterministic agent pipelines, and high-velocity operator interfaces.
Shadow Testing & Calibration: Run parallel validation against historical workflows to verify precision and safety bounds.
Production Handover & Autonomy: Deploy into your cloud infrastructure with telemetry monitoring and complete documentation.
TechCentera replaced our fragile patchwork of third-party automation tools with a custom, governed pipeline. We cut repetitive intake time by 70% while retaining total control over our customer data.
Robert Keller, VP of Operations · Logistics & Supply Network
Clear Answers on Architecture, Security, and Governance
Everything you need to evaluate our engineering approach, deployment parameters, and data sovereignty safeguards.
How does TechCentera prevent AI hallucinations in production workflows? We enforce deterministic boundary checks, structured schema outputs, and multi-stage verification pipelines. Queries exceeding risk thresholds route directly to human operators.
Who owns the intellectual property and codebase of custom systems? You retain 100% ownership of all custom software, database schemas, and orchestration logic with zero recurring seat licensing or vendor lock-in.
Can your automation pipelines connect to legacy on-premise ERPs? Yes. We engineer resilient middleware connectors that interface safely with legacy SQL, AS400, SOAP endpoints, and custom databases.
What is the typical timeline for an enterprise AI deployment? Standard automated workflows and voice systems deploy within 3 to 4 weeks, including knowledge ingestion, compliance calibration, and operator onboarding.
How do you handle data privacy and compliance standards? All solutions deploy directly into your private cloud (AWS, GCP, Azure) with strict role-based access controls, automated PII redaction, and full audit logs.
Ready to Deploy Governed AI Without Vendor Lock-In?
Consult with our engineering team to review your legacy workflows, data models, and automation roadmap.
`;
const homeWords = countWords(homeText);
console.log(`Home Page: ${homeWords} words (Budget: ≤ 600 words) -> ${homeWords <= 600 ? 'PASS ✅' : 'FAIL ❌'}`);

// 2. Service Hub Audit
const hubText = `
AI Automation & Custom Enterprise Software.
Four specialized engineering disciplines designed to eliminate manual data entry, automate customer interactions, and give your enterprise absolute software autonomy.
Book a Consultation
Why Standard SaaS and Raw Prompts Fail Modern Enterprises
Growing mid-market organizations face increasing operational drag when relying on generic tools and manual workarounds.
The SaaS Seat Tax: Off-the-shelf platforms charge escalating recurring fees without adapting to your unique operational edge.
Disconnected Software Silos: Manual data re-entry between CRM, accounting, and ERP engines introduces high error rates and operational lag.
Black-Box AI Risks: Unconstrained model prompts hallucinate and breach compliance when deployed without strict verification guardrails.
Specialized Systems Engineered for Measured Business Outcomes
Explore our core service lines. Each system is custom-built, fully owned, and integrated directly into your existing infrastructure.
Sub-Second Execution: Real-time voice synthesis and event-driven data sync optimized for ultra-low latency response.
Data Sovereignty: Deploy 100% inside your private cloud. Your customer data and models never train third-party systems.
Legacy Interoperability: Direct SQL, SOAP, and REST bridges connect modern AI agents to decades-old production databases.
Governed Escalation: Automated confidence checks hand off sensitive or edge-case transactions to human operators instantly.
From Schema Discovery to Production Autonomy
A structured, rapid delivery model that keeps your team informed and in full control at every phase.
Discovery & Schema Audit: We analyze your operational workflows, database models, API access points, and security constraints.
Bespoke System Build: We engineer custom agentic pipelines, validation guardrails, and operator interfaces on modern stacks.
Governed Deployment: We deploy into your VPC, conduct load validation, and transfer 100% of source code and documentation.
Common Questions About Implementation & Integration
Can we start with a single service before expanding across operations? Yes. Most clients start by automating one high-volume bottleneck—such as voice intake or ticket triage—before expanding into broader workflow sync and custom ERP modules.
How do you ensure seamless integration with our existing CRM and ERP? We build dedicated schema adapters that validate, transform, and sync data bi-directionally with full transactional rollback safety.
Who maintains the software after deployment? You receive full source code, architecture diagrams, and testing suites. We provide ongoing enterprise SLA support or train your internal team for full handover.
What infrastructure is required to host these systems? We deploy standard containerized microservices onto AWS, GCP, Azure, or on-premise Kubernetes clusters with automated health telemetry.
Ready to Build Bespoke AI Software You Own?
`;
const hubWords = countWords(hubText);
console.log(`Service Hub: ${hubWords} words (Budget: ≤ 700 words) -> ${hubWords <= 700 ? 'PASS ✅' : 'FAIL ❌'}`);

// 3. Single Service Audits
const serviceFiles = fs.readdirSync('content/services').filter(f => f.endsWith('.mdx'));
for (const file of serviceFiles) {
  const content = fs.readFileSync(path.join('content/services', file), 'utf-8');
  const { data, content: body } = matter(content);
  const total = countWords(JSON.stringify(data) + ' ' + body);
  console.log(`Service (${data.title}): ~${total} words (Budget: ≤ 550 words) -> ${total <= 550 ? 'PASS ✅' : 'FAIL ❌'}`);
}

// 4. About Page Audit
const aboutText = `
Engineering Autonomous Systems You Actually Own.
We help operations and technology leaders eliminate manual work through bespoke AI automation pipelines and custom enterprise software without recurring licensing extortion.
Enterprise Software Built for Operational Leaders
TechCentera was founded to solve a fundamental problem in enterprise technology: companies were trapped between rigid, overpriced SaaS subscriptions and fragile, unconstrained AI experiments.
We engineer mission-critical systems that integrate directly with your existing infrastructure. Our clients gain scalable automated capacity, complete data privacy, and the freedom of total software ownership.
The Core Principles Guiding Our Architecture
We build software designed to withstand heavy enterprise volume, regulatory scrutiny, and long-term organizational growth.
Code Ownership Over SaaS Rental: We believe core business software is an asset, not a rental. You receive 100% intellectual property ownership with zero recurring seat fees.
Governed AI Over Black-Box Prompts: We enforce deterministic validation boundaries and structured schemas so your autonomous systems never hallucinate or compromise compliance.
Interoperability Over Rip-and-Replace: We build intelligent bridges to your existing databases, ERPs, and legacy APIs rather than forcing high-risk software migrations.
Build Your Enterprise Automation Roadmap With Us
`;
const aboutWords = countWords(aboutText);
console.log(`About Page: ${aboutWords} words (Budget: ≤ 400 words) -> ${aboutWords <= 400 ? 'PASS ✅' : 'FAIL ❌'}`);

// 5. Contact Page Audit
const contactText = `
Talk Directly with Our Engineering Team.
Review your legacy architecture, automation targets, and data models with our systems architects.
24-Hour SLA Promise: Your request goes straight to technical leads, not high-pressure sales reps. We assess technical feasibility upfront.
Wilmington Headquarters: 625 Orange Street, Suite 231B, Wilmington, DE 19801
`;
const contactWords = countWords(contactText);
console.log(`Contact Page: ${contactWords} words (Budget: ≤ 120 words) -> ${contactWords <= 120 ? 'PASS ✅' : 'FAIL ❌'}`);

// 6. Blog Index Audit
const blogText = `
Architecture & Insights.
Technical essays on enterprise AI governance, legacy data integration, and software ownership economics.
Looking for Specific Architectural Advice?
`;
const blogWords = countWords(blogText);
console.log(`Blog Index (chrome): ${blogWords} words (Budget: ≤ 80 words) -> ${blogWords <= 80 ? 'PASS ✅' : 'FAIL ❌'}`);
