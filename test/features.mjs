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

/* 页脚反馈邮箱：脚本拼出来，测试保证人能看到、点得到 */
const foot = await page.evaluate(() => { const a = document.getElementById('foot-mail'); return a ? { href: a.getAttribute('href'), text: a.textContent } : null; });
ok(foot && foot.href.indexOf('mailto:') === 0 && foot.href.indexOf('@qq.com') > 0, '页脚反馈邮箱没拼出 mailto：' + JSON.stringify(foot));
ok(foot && foot.text.indexOf('@qq.com') > 0, '页脚没显示出邮箱地址：' + JSON.stringify(foot));

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

/* 财务工作流：三态打勾、备注弹层、逐步走完、归档、深链导入 */
await page.evaluate(() => {
  ['wfdone', 'wfman', 'wfskip', 'wfnotes', 'wfmeta', 'wfcust', 'wfarch', 'wfrole'].forEach(k => localStorage.removeItem('finance-calc-' + k));
});
await page.evaluate(() => { location.hash = '#workflow'; });
await page.selectOption('#wf-role', '1'); await page.waitForTimeout(500);
const wfState = () => page.evaluate(() => ({
  man: document.getElementById('wf-mankv').textContent.trim(),
  skip: document.getElementById('wf-skipkv').textContent.trim(),
  bar: (() => { const b = document.getElementById('wf-stepbar'); return !!b && !b.hidden; })()
}));
ok((await page.$$('[data-path="cash"] .wf-tick')).length === 4, '出纳路径不是 4 步');
await page.locator('[data-path="cash"] .wf-tick').nth(0).click(); await page.waitForTimeout(400);
ok((await wfState()).man === '1 步', '打勾后本月完成没 +1');
await page.locator('[data-path="cash"] .wf-tick').nth(0).click(); await page.waitForTimeout(400);
ok((await wfState()).skip === '1 步', '第二次点击没进「跳过」态');
await page.locator('[data-path="cash"] .wf-tick').nth(0).click(); await page.waitForTimeout(400);
const wfBack = await wfState();
ok(wfBack.man === '0 步' && wfBack.skip === '0 步', '第三次点击没回到未做态');

await page.locator('[data-path="cash"] .wf-tick').nth(1).click(); await page.waitForTimeout(350);
await page.locator('[data-path="cash"] .wf-note').nth(1).click(); await page.waitForTimeout(350);
await page.fill('#wf-inline-ta', '回归备注'); await page.fill('#wf-inline-est', '10');
await page.fill('#wf-inline-due', new Date(Date.now() + 3 * 86400000).toISOString().slice(0, 10));
await page.click('#wf-inline-save'); await page.waitForTimeout(450);
const wfMeta = (await page.evaluate(() => (localStorage.getItem('finance-calc-wfnotes') || '') + '|' + (localStorage.getItem('finance-calc-wfmeta') || ''))) || '';
ok(wfMeta.indexOf('回归备注') >= 0 && wfMeta.indexOf('"est":10') >= 0, '备注/时长没写进 wfnotes/wfmeta（' + wfMeta + '）');
ok((await page.textContent('#wf-duekv')).indexOf('1 步') >= 0, '7 天内到期没统计到');

await page.selectOption('#wf-speed', 'step'); await page.click('#wf-auto'); await page.waitForTimeout(700);
ok((await wfState()).bar, '逐步走完没出现浮动步骤条');
ok((await page.textContent('#wf-stepbar .wf-stepbar-lab')).indexOf('1/4') >= 0, '步骤条计数不对');
await page.click('#wf-step-skip'); await page.waitForTimeout(450);
ok((await page.textContent('#wf-stepbar .wf-stepbar-lab')).indexOf('2/4') >= 0, '跳过本步没有前进');
await page.click('#wf-step-stop'); await page.waitForTimeout(350);
ok(!(await wfState()).bar, '结束后浮动步骤条没收起');

await page.goto(BASE + '#workflow?wfimport=' + encodeURIComponent(JSON.stringify({ n: '回归路径', p: ['vatdue', 'citprep'] })), { waitUntil: 'load' });
await page.waitForTimeout(1000);
const wfImp = await page.evaluate(() => ({
  role: document.getElementById('wf-role').value,
  name: (document.getElementById('wf-cust-name') || {}).value || '',
  chips: document.querySelectorAll('#wf-cust-links .wf-chip a').length
}));
ok(wfImp.role === '9' && wfImp.name === '回归路径' && wfImp.chips === 2, '深链导入路径没生效（' + JSON.stringify(wfImp) + '）');

await page.click('#wf-clear'); await page.waitForTimeout(600);
ok(/20\d\d-\d\d/.test(await page.textContent('#wf-histkv')), '清空本月没有写归档历史');

/* 依赖提示：上一步没算过的步骤要标出来，点进去要提示 */
await page.evaluate(() => ['wfdone','wfman','wfskip','wfnotes','wfmeta','wfcust','wfrole','wfarch','wfmonth','wfnotify','wfnotified','todayhide'].forEach(k => localStorage.removeItem('finance-calc-' + k)));
await page.goto(BASE + '#workflow', { waitUntil: 'load' }); await page.waitForTimeout(700);
await page.selectOption('#wf-role', '0'); await page.waitForTimeout(500);
ok((await page.$$('a.wf-miss')).length > 0, '上一步没算的步骤没被标出来');
await page.evaluate(() => [...document.querySelectorAll('#panel-workflow details[data-path]')].forEach(d => { d.open = true; }));
await page.waitForTimeout(250);
await page.locator('[data-path="report"] a.wf-miss').first().click(); await page.waitForTimeout(500);
const carryTx = await page.evaluate(() => { const b = document.getElementById('wf-carrybar'); return b && !b.hidden ? b.textContent : ''; });
ok(carryTx.indexOf('先去算') >= 0, '点进缺依赖的步骤没给提示条（' + carryTx.slice(0, 40) + '）');

/* 备注弹层：长页面上点按钮会带一次自动滚动，弹层不能因此秒关 */
await page.goto(BASE + '#workflow', { waitUntil: 'load' }); await page.waitForTimeout(600);
await page.evaluate(() => [...document.querySelectorAll('#panel-workflow details[data-path]')].forEach(d => { d.open = true; }));
await page.waitForTimeout(250);
await page.locator('[data-path="cash"] .wf-tick').first().click(); await page.waitForTimeout(300);
await page.locator('[data-path="cash"] .wf-note').nth(1).click(); await page.waitForTimeout(400);
ok(!(await page.isHidden('#wf-inline')), '备注弹层被自动滚动关掉了');
await page.fill('#wf-inline-ta', '今日条测试'); await page.fill('#wf-inline-est', '9');
await page.fill('#wf-inline-due', new Date(Date.now() + 86400000).toISOString().slice(0, 10));
await page.click('#wf-inline-save'); await page.waitForTimeout(450);

/* 首页「今天做什么」 */
await page.goto(BASE + '#deposit', { waitUntil: 'load' }); await page.waitForTimeout(650);
const todayTx = await page.evaluate(() => { const b = document.getElementById('todaybar'); return b && !b.hidden ? b.textContent.replace(/\s+/g, ' ') : ''; });
ok(todayTx.indexOf('今天：') >= 0, '首页没有「今天做什么」提示条（' + todayTx.slice(0, 40) + '）');
await page.click('#todaybar .todaybar-x'); await page.waitForTimeout(250);
ok(await page.evaluate(() => document.getElementById('todaybar').hidden), '今日条点 × 后没隐藏');

/* 本月明细 + 打印交接单 */
await page.goto(BASE + '#workflow', { waitUntil: 'load' }); await page.waitForTimeout(650);
const det = await page.evaluate(() => {
  const b = document.getElementById('wf-detaillist');
  return { h: b.querySelectorAll('.wf-detail-h').length, li: b.querySelectorAll('.wf-detail-ul li').length };
});
ok(det.h >= 1 && det.li >= 1, '本月明细没渲染（' + JSON.stringify(det) + '）');
await page.evaluate(() => {
  window.__pr = 0;
  window.print = () => {
    window.__pr++;
    window.__snap = document.querySelectorAll('#wf-printbox tbody tr').length;
    window.__sign = !!document.querySelector('.wf-print-sign');
    window.dispatchEvent(new Event('afterprint'));
  };
});
await page.click('#wf-handoff-print'); await page.waitForTimeout(400);
const pr = await page.evaluate(() => ({ n: window.__pr, rows: window.__snap, sign: window.__sign, hidden: document.getElementById('wf-printbox').hidden, cls: document.body.className }));
ok(pr.n === 1 && pr.rows > 10 && pr.sign, '打印交接单没出表（' + JSON.stringify(pr) + '）');
ok(pr.hidden && pr.cls.indexOf('wf-printing') < 0, '打印完没清理打印区（' + JSON.stringify(pr) + '）');

/* 内置路径编辑：隐藏/恢复/调顺序 */
await page.evaluate(() => ['wfedit','wftasks'].forEach(k => localStorage.removeItem('finance-calc-' + k)));
await page.goto(BASE + '#deposit', { waitUntil: 'load' }); await page.waitForTimeout(300);
await page.goto(BASE + '#workflow', { waitUntil: 'load' }); await page.waitForTimeout(650);
await page.selectOption('#wf-role', '0'); await page.waitForTimeout(450);
const big0 = (await page.textContent('#wf-big')).trim();
await page.click('#wf-edit'); await page.waitForTimeout(400);
ok(!(await page.isHidden('#wf-edit-reset')), '编辑模式下没有「恢复默认」按钮');
ok((await page.$$('[data-path="report"] .wf-hide')).length > 0, '编辑模式下没出现隐藏按钮');
await page.locator('[data-path="report"] .wf-hide[data-mod="bplan"]').click(); await page.waitForTimeout(450);
ok((await page.textContent('#wf-big')).trim() === big0.replace(/\/(\d+)/, (m, n) => '/' + (parseInt(n, 10) - 1)), '隐藏一步后总数没变（' + (await page.textContent('#wf-big')) + '）');
ok((await page.textContent('[data-path="report"] .wf-hidnote')).indexOf('已隐藏 1 步') >= 0, '没有显示「已隐藏」和恢复入口');
await page.locator('[data-path="report"] .wf-unhide[data-mod="bplan"]').click(); await page.waitForTimeout(450);
ok((await page.textContent('#wf-big')).trim() === big0, '恢复隐藏后总数没回到 ' + big0);
await page.locator('[data-path="report"] .wf-up[data-mod="ratios"]').click(); await page.waitForTimeout(450);
const order = await page.$$eval('[data-path="report"] .jump a', els => els.map(e => e.dataset.mod));
ok(order[0] === 'ratios', '上移没生效（' + JSON.stringify(order) + '）');
await page.click('#wf-edit-reset'); await page.waitForTimeout(450);
const order2 = await page.$$eval('[data-path="report"] .jump a', els => els.map(e => e.dataset.mod));
ok(order2[0] === 'finreport', '恢复默认没还原顺序（' + JSON.stringify(order2) + '）');

/* 步骤子清单 */
await page.locator('[data-path="report"] .wf-task').first().click(); await page.waitForTimeout(350);
ok(await page.isVisible('#wf-taskbox'), '子清单弹层没打开');
await page.fill('#wf-task-in', '收集上月报表'); await page.press('#wf-task-in', 'Enter'); await page.waitForTimeout(400);
await page.fill('#wf-task-in', '核对成本口径'); await page.click('#wf-task-add'); await page.waitForTimeout(400);
ok((await page.$$('.wf-trow')).length === 2, '子清单没加上两条');
await page.locator('.wf-trow .wf-tchk').first().click(); await page.waitForTimeout(400);
ok((await page.textContent('[data-path="report"] .wf-task')).indexOf('1/2') >= 0, '子清单勾选后角标没更新');
const tstore = await page.evaluate(() => JSON.parse(localStorage.getItem('finance-calc-wftasks') || '{}'));
const tfirst = Object.keys(tstore)[0] || '';
ok(tfirst && tstore[tfirst][0].d === 1, '子清单勾选没落盘（' + JSON.stringify(tstore) + '）');
await page.locator('.wf-trow .wf-tdel').nth(1).click(); await page.waitForTimeout(400);
ok((await page.$$('.wf-trow')).length === 1, '子清单删除没生效');
await page.evaluate(() => { const b = document.getElementById('wf-taskbox'); if (b) b.hidden = true; });

/* 换月：备注/预计跟着归档，过期截止清掉 */
await page.evaluate(() => {
  localStorage.setItem('finance-calc-wfman', JSON.stringify({ 'report:ratios': 1 }));
  localStorage.setItem('finance-calc-wfmonth', JSON.stringify({ m: '2026-10', total: 22, done: 5, man: 2, skip: 1 }));
  localStorage.setItem('finance-calc-wfmeta', JSON.stringify({ 'report:ratios': { est: 12, due: '2026-10-05' }, 'cash:expense': { est: 8, due: '2099-12-20' } }));
  localStorage.setItem('finance-calc-wfnotes', JSON.stringify({ 'cash:expense': '上月留下的备注' }));
  localStorage.removeItem('finance-calc-wfarch');
});
await page.goto(BASE + '#deposit', { waitUntil: 'load' }); await page.waitForTimeout(300);
await page.goto(BASE + '#workflow', { waitUntil: 'load' }); await page.waitForTimeout(800);
const roll = await page.evaluate(() => ({
  arch: JSON.parse(localStorage.getItem('finance-calc-wfarch') || '{}'),
  meta: JSON.parse(localStorage.getItem('finance-calc-wfmeta') || '{}'),
  man: localStorage.getItem('finance-calc-wfman')
}));
ok(roll.arch['2026-10'] && roll.arch['2026-10'].notes && roll.arch['2026-10'].notes['cash:expense'], '换月归档没带上备注（' + JSON.stringify(roll.arch) + '）');
ok(!roll.meta['report:ratios'].due && roll.meta['report:ratios'].est === 12, '过期截止没清掉 / 预计分钟没保留（' + JSON.stringify(roll.meta) + '）');
ok(roll.meta['cash:expense'] && roll.meta['cash:expense'].due === '2099-12-20', '未来的截止日期被误删（' + JSON.stringify(roll.meta) + '）');
ok(roll.man === '{}' || roll.man === null, '换月后本月勾选没清空（' + roll.man + '）');

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
