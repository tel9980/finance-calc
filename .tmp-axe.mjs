import fs from 'node:fs';
import { chromium } from 'playwright';
const AXE = fs.readFileSync('node_modules/axe-core/axe.min.js', 'utf8');
const b = await chromium.launch({ executablePath: process.env.CHROME_PATH, args: ['--no-sandbox'] });
const p = await b.newPage({ viewport: { width: 1280, height: 1000 } });
const BASE = 'http://127.0.0.1:8099/';
for (const tab of ['hot', 'loan', 'workflow', 'snaps', 'monthly']) {
  await p.goto(BASE + '#' + tab, { waitUntil: 'load' });
  await p.waitForTimeout(1200);
  await p.addScriptTag({ content: AXE });
  const res = await p.evaluate(async () => {
    const r = await window.axe.run(document, { resultTypes: ['violations'], runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] } });
    return r.violations.map(v => ({ id: v.id, impact: v.impact, n: v.nodes.length, sample: v.nodes.slice(0, 2).map(x => (x.target || []).join(' ')) }));
  });
  console.log('## ' + tab);
  for (const v of res) console.log(`  ${v.impact} ${v.id} x${v.n} :: ${v.sample.join(' | ')}`);
  if (!res.length) console.log('  none');
}
await b.close();
