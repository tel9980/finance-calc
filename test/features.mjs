/* 交互回归：搜索（拼音/英文/中文/别名/回车）、最近分类、快照备注与改名、深链参数、分享链接、下载。
   用法：node test/features.mjs [url] */
import { chromium } from 'playwright';

const BASE = process.argv.find(a => a.startsWith('http')) || 'http://127.0.0.1:8099/';
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: { width: 1280, height: 1000 } });
const errs = [];
page.on('pageerror', e => errs.push('PE:' + e.message));
page.on('console', m => { if (m.type() === 'error') errs.push('CE:' + m.text().slice(0, 120)); });
const bad = [];
const ok = (cond, msg) => { if (!cond) bad.push(msg); };

await page.goto(BASE, { waitUntil: 'load' });
await page.waitForTimeout(600);

const hits = async q => {
  await page.fill('#q', q); await page.waitForTimeout(180);
  return page.evaluate(() => [...document.querySelectorAll('.tab:not([hidden])')].map(t => t.dataset.tab));
};
ok((await hits('vat')).includes('vat'), '英文 id 搜索没命中 vat');
ok((await hits('提成')).includes('commission'), '中文搜索没命中「提成」');
ok((await hits('gjjd')).length >= 1, '拼音首字母搜索没命中');
ok((await hits('zzzzzz')).length === 0, '乱串竟然有命中');
await page.fill('#q', 'gjjd'); await page.press('#q', 'Enter'); await page.waitForTimeout(600);
ok(await page.evaluate(() => !!document.querySelector('.panel.is-on')), '回车直达后没有激活面板');
await page.fill('#q', ''); await page.waitForTimeout(200);

/* 最近分类 */
await page.click('.cat[data-cat="acct"]');
await page.click('.tab[data-tab="vat"]'); await page.waitForTimeout(500);
await page.click('.cat[data-cat="recent"]'); await page.waitForTimeout(300);
ok((await page.evaluate(() => [...document.querySelectorAll('.tab:not([hidden])')].map(t => t.dataset.tab))).includes('vat'), '「最近」里没有刚用过的模块');

/* 快照：名称｜备注 + 改名 */
await page.click('.cat[data-cat="save"]'); await page.click('.tab[data-tab="deposit"]'); await page.waitForTimeout(400);
page.on('dialog', async d => d.accept(d.message().includes('名称') ? 'A 客户｜保守版' : ''));
await page.click('#btn-snap'); await page.waitForTimeout(500);
await page.click('.cat[data-cat="util"]'); await page.click('.tab[data-tab="snaps"]'); await page.waitForTimeout(500);
const row1 = await page.evaluate(() => (document.querySelector('#snap-body tr') || {}).innerText || '');
ok(row1.includes('A 客户') && row1.includes('保守版'), '快照名称/备注没写进去');
page.removeAllListeners('dialog');
page.on('dialog', async d => d.accept(d.message().includes('备注') ? '改后备注' : 'B 客户'));
const ren = await page.$('.snap-ren');
if (ren) { await ren.click(); await page.waitForTimeout(500); }
const row2 = await page.evaluate(() => (document.querySelector('#snap-body tr') || {}).innerText || '');
ok(row2.includes('B 客户') && row2.includes('改后备注'), '快照改名/改备注没生效');
await page.evaluate(() => localStorage.removeItem('finance-calc-snaps'));

/* 深链参数：面板还没下载时也要能落上 */
await page.goto(BASE + '#housecash?hcx-price=3000000', { waitUntil: 'load' });
await page.waitForTimeout(1200);
const deep = await page.evaluate(() => {
  const pn = document.getElementById('panel-housecash');
  const inp = document.getElementById('hcx-price');
  const bb = pn && pn.querySelector('.big strong');
  return { val: inp && inp.value, big: bb && bb.textContent.trim() };
});
ok(String(deep.val) === '3000000', '深链参数没填进去（' + deep.val + '）');
ok(!!deep.big && deep.big !== '—', '深链参数没触发计算');


/* 无障碍与体验：跳转链接、结果区读屏播报、焦点框 */
await page.goto(BASE, { waitUntil: 'load' }); await page.waitForTimeout(500);
ok(await page.evaluate(() => !!document.querySelector('a.skip[href="#panels"]')), '缺少跳到计算区的链接');
ok(await page.evaluate(() => { const b = document.querySelector('.panel.is-on .big'); return !!b && b.getAttribute('aria-live') === 'polite'; }), '结果区没有 aria-live 播报');
await page.evaluate(() => { if (document.activeElement && document.activeElement.blur) document.activeElement.blur(); window.scrollTo(0, 0); });
await page.keyboard.press('Tab'); await page.waitForTimeout(150);
const focusInfo = await page.evaluate(() => ({ tag: document.activeElement && document.activeElement.className, outline: getComputedStyle(document.activeElement).outlineWidth }));
ok(String(focusInfo.tag).includes('skip'), '第一次 Tab 没有落在跳转链接上（实际：' + focusInfo.tag + '）');
ok(parseFloat(focusInfo.outline) > 0, '焦点没有可见的外框');

/* 新功能：目标反推、72 格逐月、年报图表 */
await page.click('.cat[data-cat="family"]'); await page.click('.tab[data-tab="yearcmp"]');
let goalTxt = '';
for (let i = 0; i < 40; i++) {                       // 线上 family chunk 129 KB，冷启动可能要几秒
  goalTxt = await page.evaluate(() => (document.getElementById('yc-goal') || {}).textContent || '');
  if (/每年|每月/.test(goalTxt)) break;
  await page.waitForTimeout(250);
}
ok(/每年|每月/.test(goalTxt), '目标反推没有给出每年/每月金额');
await page.click('.tab[data-tab="monthly"]'); await page.waitForTimeout(600);
let cells = 0;
for (let i = 0; i < 24; i++) { cells = await page.evaluate(() => document.querySelectorAll('#panel-monthly input[id^="mtg-"]').length); if (cells === 72) break; await page.waitForTimeout(250); }
ok(cells === 72, '逐月分类不是 72 格（实际 ' + cells + '）');
await page.click('.tab[data-tab="yearreport"]'); await page.waitForTimeout(1200);
const charts = await page.evaluate(() => ['yrp-chart1', 'yrp-chart2'].map(id => { const c = document.getElementById(id); if (!c) return -1; const g = c.getContext('2d'); const d = g.getImageData(0, 0, c.width, c.height).data; let k = 0; for (let i = 3; i < d.length; i += 4) if (d[i]) k++; return k; }));
ok(charts.every(n => n > 500), '年报里的图没有画出来（' + charts.join(',') + '）');

ok(errs.length === 0, '控制台报错：' + errs.join(' | '));
console.log(bad.length ? '❌ 失败：\n- ' + bad.join('\n- ') : '✅ 交互项全部通过');
await browser.close();
process.exit(bad.length ? 1 : 0);
