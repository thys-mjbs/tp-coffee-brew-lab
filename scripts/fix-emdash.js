const fs = require('fs');
const { execSync } = require('child_process');

// Exact UTF-8 bytes for the mojibake sequence: â (C3 A2) + € (E2 82 AC) + " U+201D (E2 80 9D)
const mojibake = Buffer.from([0xc3, 0xa2, 0xe2, 0x82, 0xac, 0xe2, 0x80, 0x9d]).toString('utf8');
const emdash = '—';  // — em dash
const endash = '–';  // – en dash

const files = execSync('git ls-files', { cwd: process.cwd() })
  .toString().split('\n').filter(Boolean)
  .filter(f =>
    (f.startsWith('app/') || f.startsWith('lib/') || f.startsWith('content/')) &&
    (f.endsWith('.tsx') || f.endsWith('.ts') || f.endsWith('.md') || f.endsWith('.mdx'))
  );

let changed = 0;

for (const f of files) {
  try {
    let content = fs.readFileSync(f, 'utf8');
    const before = content;

    const mb = (content.split(mojibake).length - 1);
    const em = (content.split(emdash).length - 1);

    content = content.split(mojibake).join(endash);
    content = content.split(emdash).join(endash);

    if (content !== before) {
      fs.writeFileSync(f, content, 'utf8');
      console.log('fixed:', f.padEnd(55), `(mojibake: ${mb}, em-dash: ${em})`);
      changed++;
    }
  } catch (e) {
    console.error('ERROR:', f, e.message);
  }
}

console.log('\nFiles changed:', changed);
