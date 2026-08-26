import fs from 'fs';
import path from 'path';

const artifactsDir = 'C:\\Users\\DK\\.gemini\\antigravity-ide\\brain\\2f0a6c24-73e5-4f61-9fe8-d6a7969f6b20';
const targetDir = 'C:\\Users\\DK\\Desktop\\Business Website\\techcentera\\public\\images';

if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

const files = fs.readdirSync(artifactsDir);

const mappings = [
  { prefix: 'hero_preview_', target: 'hero-preview.jpg' },
  { prefix: 'ai_receptionist_ui_', target: 'ai-receptionist.jpg' },
  { prefix: 'ai_support_ui_', target: 'ai-support.jpg' },
  { prefix: 'ai_workflow_ui_', target: 'ai-workflow.jpg' },
  { prefix: 'custom_crm_erp_ui_', target: 'custom-crm-erp.jpg' },
];

for (const m of mappings) {
  const match = files.find(f => f.startsWith(m.prefix) && f.endsWith('.jpg'));
  if (match) {
    const src = path.join(artifactsDir, match);
    const dest = path.join(targetDir, m.target);
    fs.copyFileSync(src, dest);
    console.log(`Copied ${match} -> ${m.target}`);
  } else {
    console.log(`No match for ${m.prefix}`);
  }
}
