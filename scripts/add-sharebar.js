const fs = require('fs');
const path = require('path');

const tools = [
  { slug: 'coffee-ratio-calculator', title: 'Coffee-to-Water Ratio Calculator' },
  { slug: 'french-press-ratio-calculator', title: 'French Press Ratio Calculator' },
  { slug: 'instant-coffee-calculator', title: 'Instant Coffee Calculator' },
  { slug: 'coffee-beans-per-cup', title: 'Coffee Beans per Cup Calculator' },
  { slug: 'coffee-measurement-converter', title: 'Coffee Measurement Converter' },
  { slug: 'pour-over-calculator', title: 'Pour Over and V60 Recipe Calculator' },
  { slug: 'aeropress-recipe', title: 'AeroPress Recipe Guide' },
  { slug: 'cold-brew-ratio-calculator', title: 'Cold Brew Ratio Calculator' },
  { slug: 'caffeine-calculator', title: 'Coffee Caffeine Calculator' },
  { slug: 'espresso-ratio-calculator', title: 'Espresso Ratio Calculator' },
  { slug: 'milk-coffee-ratio-calculator', title: 'Milk Coffee Ratio Calculator' },
  { slug: 'iced-pour-over-calculator', title: 'Iced Coffee Pour Over Calculator' },
  { slug: 'french-press-timer', title: 'French Press Brew Timer and Guide' },
  { slug: 'coffee-troubleshooter', title: 'Coffee Troubleshooter' },
  { slug: 'grind-size-guide', title: 'Coffee Grind Size Guide' },
  { slug: 'hario-switch-recipe', title: 'Hario Switch Recipe Calculator' },
  { slug: 'cold-foam-recipe', title: 'Cold Foam Recipe Guide' },
  { slug: 'aeropress-timer', title: 'AeroPress Brew Timer' },
  { slug: 'cold-brew-recipe', title: 'Cold Brew Recipe Guide' },
  { slug: 'iced-coffee-at-home', title: 'Iced Coffee at Home Guide' },
  { slug: 'moka-pot-calculator', title: 'Moka Pot Brew Calculator' },
  { slug: 'coffee-bloom-timer', title: 'Coffee Bloom Timer' },
  { slug: 'espresso-dial-in', title: 'Espresso Dial-In Calculator' },
  { slug: 'coffee-cost-calculator', title: 'Coffee Cost Calculator' },
  { slug: 'pour-over-timer', title: 'Pour Over Brew Timer' },
];

const appUrl = 'https://brewlab.coffee';

for (const tool of tools) {
  const filePath = path.join('app', tool.slug, 'page.tsx');
  let content = fs.readFileSync(filePath, 'utf8');

  if (content.includes('ShareBar')) {
    console.log('SKIP (already has ShareBar):', filePath);
    continue;
  }

  // Add ShareBar import after last import line
  const lines = content.split('\n');
  let lastImportIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('import ')) lastImportIdx = i;
  }
  lines.splice(lastImportIdx + 1, 0, 'import { ShareBar } from "@/components/ShareBar"');
  content = lines.join('\n');

  // Insert ShareBar before the affiliate <div className="mt-8">
  const shareBarLine = '        <ShareBar title="' + tool.title + ' — Coffee Brew Lab" url={`${process.env.NEXT_PUBLIC_APP_URL ?? "' + appUrl + '"}/' + tool.slug + '`} />\n\n';
  content = content.replace('        <div className="mt-8">', shareBarLine + '        <div className="mt-8">');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('DONE:', filePath);
}
