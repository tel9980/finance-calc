import fs from 'node:fs';
import { chromium } from 'playwright';
const AXE = fs.readFileSync('node_modules/axe-core/axe.min.js','utf8');
const BASE = 'http://127.0.0.1:8099/';
const b = await chromium.launch({ executablePath: process.env.CHROME_PATH, args:['--no-sandbox'] });
const p = await b.newPage({ viewport:{width:1280,height:1000} });
await p.goto(BASE, { waitUntil:'load' });
const tabs = await p.evaluate(() => [...document.querySelectorAll('#tabs .tab')].map(t=>t.dataset.tab));
const agg = {};
for (const tab of tabs) {
  await p.goto(BASE + '#' + tab, { waitUntil:'load' });
  await p.waitForTimeout(500);
  await p.addScriptTag({ content: AXE });
  const res = await p.evaluate(async () => {
    const r = await window.axe.run(document, { resultTypes:['violations'], runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']} });
    return r.violations.map(v => ({ id:v.id, impact:v.impact, n:v.nodes.length, t:(v.nodes[0] && (v.nodes[0].target||[]).join(' '))||'' }));
  });
  for (const v of res) {
    const k = v.id;
    agg[k] = agg[k] || { impact:v.impact, tabs:[], sample:v.t };
    agg[k].tabs.push(tab + 'x' + v.n);
  }
}
for (const [k,v] of Object.entries(agg)) console.log(`${v.impact} ${k} :: ${v.tabs.length} tabs :: ${v.sample} :: ${v.tabs.slice(0,6).join(',')}`);
if (!Object.keys(agg).length) console.log('ALL CLEAN');
await b.close();
