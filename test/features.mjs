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
let deep = { val: null, big: null };
for (let i = 0; i < 40; i++) {           // 线上 house chunk 冷启动可能要几秒
  deep = await page.evaluate(() => {
    const pn = document.getElementById('panel-housecash');
    const inp = document.getElementById('hcx-price');
    const bb = pn && pn.querySelector('.big strong');
    return { val: inp && inp.value, big: bb && bb.textContent.trim() };
  });
  if (String(deep.val) === '3000000' && deep.big && deep.big !== '—' && deep.big !== '载入中…') break;
  await page.waitForTimeout(300);
}
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


/* 模块间带参跳转：体检 → 应急金，金额要跟着走 */
await page.click('.cat[data-cat="family"]'); await page.click('.tab[data-tab="report"]');
let jumpHref = '';
for (let i = 0; i < 24; i++) { jumpHref = await page.evaluate(() => { const a = document.querySelector('#rp-links a'); return a ? a.getAttribute('href') : ''; }); if (jumpHref) break; await page.waitForTimeout(250); }
ok(/^#emergency\?em-exp=\d/.test(jumpHref), '体检页没有带参跳转链接（' + jumpHref + '）');
await page.click('#rp-links a'); await page.waitForTimeout(1200);
const jumped = await page.evaluate(() => ({ on: (document.querySelector('.panel.is-on') || {}).id, exp: (document.getElementById('em-exp') || {}).value, big: (document.querySelector('#panel-emergency .big strong') || {}).textContent }));
ok(jumped.on === 'panel-emergency' && Number(jumped.exp) > 0, '带参跳转没落到应急金并带回金额');
ok(!!jumped.big && jumped.big !== '—', '带参跳转后目标模块没重算');

/* 12 个月小结 → 支出结构：全年分类要折成月均 */
await page.click('.cat[data-cat="family"]'); await page.click('.tab[data-tab="monthly"]'); await page.waitForTimeout(800);
let mtHref = '';
for (let i = 0; i < 24; i++) { mtHref = await page.evaluate(() => { const a = document.querySelector('#mt-links a'); return a ? a.getAttribute('href') : ''; }); if (mtHref) break; await page.waitForTimeout(250); }
ok(/#bundle\?bxsp-inc=/.test(mtHref), '12 个月小结没有跳到支出结构的链接');
ok(await page.evaluate(() => { const p = document.getElementById('mt-links'); return !!p && p.offsetParent !== null; }), '小结页的跳转链接被折叠藏起来了');

/* 数字输入增强：1.5万 简写 / 千分位 / 上下键步进 */
await page.click('.cat[data-cat="save"]'); await page.click('.tab[data-tab="deposit"]');
let numReady = false;
for (let i = 0; i < 24; i++) { numReady = await page.evaluate(() => { const e = document.getElementById('dp-principal'); return !!e && e.classList.contains('num'); }); if (numReady) break; await page.waitForTimeout(250); }
ok(numReady, '存款面板的数字输入没有增强');
await page.fill('#dp-principal', '15万'); await page.waitForTimeout(300);
ok((await page.textContent('#panel-deposit .big strong')) === '3,150.00', '「15万」简写没换算成 150,000');
await page.locator('#dp-principal').blur(); await page.waitForTimeout(250);
ok((await page.inputValue('#dp-principal')) === '150,000', '失焦后没有千分位显示');
await page.focus('#dp-principal'); await page.keyboard.press('ArrowUp'); await page.waitForTimeout(300);
ok((await page.inputValue('#dp-principal')).replace(/,/g, '') === '151000', '上下键没有按 step 步进');

/* 一页报告：目标反推段 */
await page.click('.cat[data-cat="family"]'); await page.click('.tab[data-tab="report"]');
let gText = '';
for (let i = 0; i < 24; i++) { gText = await page.evaluate(() => { const e = document.getElementById('rp-goaltext'); return e ? e.textContent : ''; }); if (gText) break; await page.waitForTimeout(250); }
ok(gText.indexOf('每月要存') >= 0 || gText.indexOf('已经达标') >= 0, '目标反推文案没生成（' + gText.slice(0, 40) + '）');
await page.fill('#rp-goal', '4000000'); await page.waitForTimeout(400);
const gText2 = await page.textContent('#rp-goaltext');
ok(/每月要存/.test(gText2), '目标调高后没有反推每月存款额');

/* 贷款 → 提前还款：带参跳转回填 */
await page.click('.cat[data-cat="loan"]'); await page.click('.tab[data-tab="loan"]');
let lnHref = '';
for (let i = 0; i < 24; i++) { lnHref = await page.evaluate(() => { const a = document.querySelector('#ln-links a'); return a ? a.getAttribute('href') : ''; }); if (lnHref) break; await page.waitForTimeout(250); }
ok(/#prepay\?pp-principal=/.test(lnHref), '贷款面板没有跳到提前还款的链接（' + lnHref + '）');
await page.evaluate(() => { location.hash = '#prepay?pp-principal=800000&pp-rate=3.9&pp-months=240'; });
let ppOk = false;
for (let i = 0; i < 24; i++) { ppOk = await page.evaluate(() => { const e = document.getElementById('pp-principal'); return !!e && e.value.replace(/,/g, '') === '800000' && (document.querySelector('.panel.is-on') || {}).id === 'panel-prepay'; }); if (ppOk) break; await page.waitForTimeout(250); }
ok(ppOk, '跨模块带参跳转没回填参数或没切面板');

/* 错误自检浮层 */
await page.evaluate(() => { setTimeout(() => { throw new Error('自检测试'); }, 0); });
let hasBox = false;
for (let i = 0; i < 20; i++) { hasBox = await page.evaluate(() => { const e = document.querySelector('.errbox'); return !!e && !e.hidden; }); if (hasBox) break; await page.waitForTimeout(150); }
ok(hasBox, '出错时没有弹出诊断卡');
ok((await page.textContent('.errbox')).indexOf('复制诊断信息') >= 0, '诊断卡没有「复制诊断信息」按钮');
await page.evaluate(() => { const e = document.querySelector('.errbox'); if (e) e.hidden = true; });

const realErrs = errs.filter(x => x.indexOf('自检测试') < 0); /* 错误浮层那条是我们自己抛的 */
ok(realErrs.length === 0, '控制台报错：' + realErrs.join(' | '));
console.log(bad.length ? '❌ 失败：\n- ' + bad.join('\n- ') : '✅ 交互项全部通过');
await browser.close();
process.exit(bad.length ? 1 : 0);
