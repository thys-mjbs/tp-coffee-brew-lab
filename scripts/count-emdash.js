const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Get all public-facing files
const files = execSync('git ls-files', { cwd: process.cwd() }).toString().split('\n').filter(Boolean);

const emdash = '—'; // — em dash
const mojibake = 'â€”'; // â€" mojibake sequence (Windows-1252 decode of em dash UTF-8)

let totalMojibake = 0;
let totalEmDash = 0;

const relevant = files.filter(f =>
  (f.startsWith('app/') || f.startsWith('lib/') || f.startsWith('content/')) &&
  (f.endsWith('.tsx') || f.endsWith('.ts') || f.endsWith('.md') || f.endsWith('.mdx'))
);

for (const f of relevant) {
  try {
    const content = fs.readFileSync(f, 'utf8');
    const mb = (content.split(mojibake).length - 1);
    const em = (content.split(emdash).length - 1);
    if (mb > 0 || em > 0) {
      console.log(f.padEnd(55), 'mojibake:', mb, '  em-dash:', em);
    }
    totalMojibake += mb;
    totalEmDash += em;
  } catch(e) {}
}

console.log('\nTOTAL  mojibake:', totalMojibake, '  em-dash:', totalEmDash);
