/* 180 个模块的数值回归 + 结构体检。
   用法：node test/regress.mjs [url] [--update]
   与 test/baseline.json 对拍；随机类模块（dca 蒙特卡洛）在 IGNORE 里放行。 */
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const BASE = process.argv.find(a => a.startsWith('http')) || 'http://127.0.0.1:8099/';
const UPDATE = process.argv.includes('--update');
const IGNORE = new Set(['dca', 'calendar', 'freeperiod']);  // dca 蒙特卡洛每次不同；calendar/freeperiod 按今天日期算，跨天会变
const NO_BIG = new Set(['xlhelp']);        // 只有表格，没有 .big
const EMPTY_OK = new Set(['snaps']);       // 没有快照时主结果本来就空

const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || undefined,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});
const page = await browser.newPage({ viewport: { width: 1280, height: 1000 } });
const errs = [];
page.on('pageerror', e => errs.push('PE:' + e.message));
page.on('console', m => { if (m.type() === 'error') errs.push('CE:' + m.text().slice(0, 120)); });

await page.goto(BASE, { waitUntil: 'load' });

const cats = await page.evaluate(() => [...document.querySelectorAll('.cat')].map(c => c.dataset.cat));
const read = n => {
  const pn = document.getElementById('panel-' + n);
  if (!pn) return { big: '', kv: '' };
  const bb = pn.querySelector('.big strong');
  return { big: bb ? bb.textContent.trim() : '', kv: [...pn.querySelectorAll('.kv li b')].slice(0, 4).map(e => e.textContent.trim()).join('|') };
};

const res = {}, fail = [];
for (const c of cats) {
  await page.click(`.cat[data-cat="${c}"]`);
  const tabs = await page.evaluate(() => [...document.querySelectorAll('.tab:not([hidden])')].map(t => t.dataset.tab));
  for (const t of tabs) {
    if (res[t] !== undefined) continue;
    await page.click(`.tab[data-tab="${t}"]`);
    let r = { big: '', kv: '' };
    for (let i = 0; i < 60; i++) {
      r = await page.evaluate(read, t);
      if (r.big && r.big !== '—' && r.big.indexOf('载入中') < 0) break;
      await page.waitForTimeout(150);
    }
    res[t] = r.big + ' :: ' + r.kv;
    if (!r.big || r.big === '—' || r.big.indexOf('载入中') >= 0) fail.push(t);
  }
}

const ids = await page.evaluate(() => {
  const all = [...document.querySelectorAll('[id]')].map(e => e.id);
  const seen = new Set(), dup = [];
  all.forEach(i => { if (seen.has(i)) dup.push(i); seen.add(i); });
  return { total: all.length, dup: [...new Set(dup)] };
});

/* 首屏不该拉全量：只允许 html + style + core + 当前分类 chunk */
const mob = await browser.newPage({ viewport: { width: 390, height: 844 } });
await mob.goto(BASE, { waitUntil: 'load' });
await mob.waitForTimeout(500);
const overflow = await mob.evaluate(() => document.body.scrollWidth - innerWidth);
await mob.close();

const lines = [];
const bad = [];
const failBad = fail.filter(f => !NO_BIG.has(f) && !EMPTY_OK.has(f));
if (failBad.length) bad.push('这些模块没出结果：' + failBad.join(', '));
if (ids.dup.length) bad.push('重复 id：' + ids.dup.join(', '));
if (errs.length) bad.push('控制台报错：' + errs.join(' | '));
if (overflow > 0) bad.push('手机端横向溢出 ' + overflow + 'px');

const baselineFile = path.join(ROOT, 'test/baseline.json');
if (UPDATE) {
  fs.writeFileSync(baselineFile, JSON.stringify({ count: Object.keys(res).length, res }, null, 0));
  lines.push('已更新基线：' + Object.keys(res).length + ' 个模块');
} else if (fs.existsSync(baselineFile)) {
  const base = JSON.parse(fs.readFileSync(baselineFile, 'utf8')).res || {};
  const changed = Object.keys(base).filter(k => res[k] !== undefined && res[k] !== base[k] && !IGNORE.has(k));
  const missing = Object.keys(base).filter(k => res[k] === undefined);
  if (changed.length) bad.push('数值变了 ' + changed.length + ' 个：' + changed.slice(0, 8).join(', ') + (changed.length > 8 ? ' …' : ''));
  if (missing.length) bad.push('模块消失：' + missing.join(', '));
  lines.push('对拍基线 ' + Object.keys(base).length + ' 个模块');
}

lines.unshift('模块数 ' + Object.keys(res).length + '｜id ' + ids.total + ' 个（重复 ' + ids.dup.length + '）｜手机溢出 ' + overflow + 'px｜报错 ' + errs.length + ' 条');
console.log(lines.join('\n'));
if (bad.length) { console.error('\n❌ 失败：\n- ' + bad.join('\n- ')); await browser.close(); process.exit(1); }
console.log('✅ 全部通过');
await browser.close();
